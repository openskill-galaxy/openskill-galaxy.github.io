import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadAll, type PortalData } from "../data/loaders";

const levelLabel = { beginner: "入门", intermediate: "进阶", advanced: "高阶" };
const levelColor = {
  beginner: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 font-semibold",
  intermediate: "bg-amber-500/10 text-amber-600 dark:text-amber-300 font-semibold",
  advanced: "bg-rose-500/10 text-rose-600 dark:text-rose-300 font-semibold",
};

export default function LearningPathsPage() {
  const [data, setData] = useState<PortalData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "学习路径 | OpenSkill Galaxy";
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadAll()
      .then((d) => !cancelled && setData(d))
      .catch((e) => !cancelled && setError(String(e)));
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) return <p className="text-rose-500">数据加载失败：{error}</p>;
  if (!data) {
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <p className="text-subtle animate-pulse text-sm">加载中…</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-body">系统化学习路径</h1>
        <p className="text-sm text-muted">
          按照科学推荐顺序构建的技能路线图，助力从零基础到高级工程化进阶。
        </p>
      </header>

      <div className="space-y-6">
        {data.paths.map((p) => {
          const modules = p.modules
            .map((id) => data.modules.find((m) => m.id === id))
            .filter(Boolean);
          return (
            <section key={p.id} className="card p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-line pb-5">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-body tracking-tight">{p.title}</h2>
                  <p className="text-sm text-muted max-w-2xl leading-relaxed">{p.summary}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <span className={`rounded-md px-2 py-0.5 text-xs ${levelColor[p.level]}`}>
                    {levelLabel[p.level]}
                  </span>
                  <span className="tag">{modules.length} 个模块</span>
                  {p.estimatedHours ? <span className="tag">约 {p.estimatedHours}h</span> : null}
                </div>
              </div>

              {/* Timeline */}
              <div className="relative pl-7 border-l border-line ml-3 space-y-5">
                {modules.map((m, i) => (
                  <div key={m!.id} className="relative">
                    <span className="absolute -left-[38px] top-0 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-brand text-xs font-bold ring-4 ring-page">
                      {i + 1}
                    </span>
                    <Link
                      to={`/modules/${m!.slug}`}
                      className="text-sm font-semibold text-body hover:text-brand transition"
                    >
                      {m!.title}
                    </Link>
                    <p className="text-xs text-subtle leading-relaxed max-w-2xl line-clamp-1 mt-0.5">
                      {m!.summary} · 约 {m!.estimatedHours} 小时完成
                    </p>
                  </div>
                ))}
              </div>

              {p.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 border-t border-line pt-4">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
