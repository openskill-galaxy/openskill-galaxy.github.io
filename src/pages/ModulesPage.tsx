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
  if (!data) {
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <p className="text-white/40 animate-pulse text-sm">加载中星河数据…</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-extrabold tracking-wide text-white">📦 技能模块图谱</h1>
        <p className="text-xs text-white/40">
          共收录 {data.modules.length} 个独立技能模块，分布于 {data.categories.length} 个专业学科分类。
        </p>
      </header>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-white/[0.04] pb-4">
          <CategoryTabs
            categories={data.categories}
            active={active}
            counts={counts}
            onSelect={handleSelect}
          />
          <div className="w-full md:w-80 relative flex items-center">
            <input
              type="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="快捷过滤模块、标签…"
              className="w-full rounded-xl border border-white/10 bg-white/[0.02] pl-9 pr-4 py-2 text-xs text-white placeholder-white/30 focus:border-galaxy-500 focus:outline-none focus:ring-1 focus:ring-galaxy-500 transition"
            />
            <span className="absolute left-3 text-white/30 text-[10px]">🔍</span>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-sm text-white/40">没有找到匹配的技能模块。</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <ModuleCard key={m.id} module={m} />
          ))}
        </div>
      )}
    </div>
  );
}
