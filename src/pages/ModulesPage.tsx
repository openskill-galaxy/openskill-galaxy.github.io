import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { loadAll, type PortalData } from "../data/loaders";
import CategoryTabs from "../components/CategoryTabs";
import ModuleCard from "../components/ModuleCard";
import type { SkillLevel } from "../types";

const levelOrder: Record<SkillLevel, number> = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
};

export default function ModulesPage() {
  const [data, setData] = useState<PortalData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const [active, setActive] = useState<string>(categoryParam);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    let cancelled = false;
    loadAll()
      .then((d) => !cancelled && setData(d))
      .catch((e) => !cancelled && setError(String(e)));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setActive(searchParams.get("category") || "all");
  }, [searchParams]);

  function handleSelect(id: string) {
    setActive(id);
    if (id === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", id);
    }
    setSearchParams(searchParams, { replace: true });
  }

  const counts = useMemo(() => {
    if (!data) return {};
    const c: Record<string, number> = { all: data.modules.length };
    for (const m of data.modules) {
      c[m.category] = (c[m.category] || 0) + 1;
    }
    return c;
  }, [data]);

  const filtered = useMemo(() => {
    if (!data) return [];
    const kw = keyword.trim().toLowerCase();
    return data.modules
      .filter((m) => (active === "all" ? true : m.category === active))
      .filter((m) =>
        kw
          ? `${m.title} ${m.summary} ${m.tags.join(" ")}`.toLowerCase().includes(kw)
          : true
      )
      .sort((a, b) => levelOrder[a.level] - levelOrder[b.level] || a.title.localeCompare(b.title));
  }, [data, active, keyword]);

  if (error) return <p className="text-rose-300">数据加载失败：{error}</p>;
  if (!data) return <p className="text-white/60">加载中…</p>;

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-white">技能模块</h1>
        <p className="text-white/60 text-sm">
          共 {data.modules.length} 个模块，覆盖 {data.categories.length} 个分类。
        </p>
      </header>

      <CategoryTabs
        categories={data.categories}
        active={active}
        counts={counts}
        onSelect={handleSelect}
      />

      <input
        type="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="在本页过滤模块标题、摘要、标签…"
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-galaxy-500 focus:outline-none"
      />

      {filtered.length === 0 ? (
        <p className="text-white/60">没有匹配的模块。</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <ModuleCard key={m.id} module={m} />
          ))}
        </div>
      )}
    </div>
  );
}
