import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadAll, type PortalData } from "../data/loaders";

const levelLabel = { beginner: "入门", intermediate: "进阶", advanced: "高阶" };
const levelColor = {
  beginner: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  intermediate: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  advanced: "bg-rose-500/10 text-rose-300 border-rose-500/20",
};

export default function LearningPathsPage() {
  const [data, setData] = useState<PortalData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadAll()
      .then((d) => !cancelled && setData(d))
      .catch((e) => !cancelled && setError(String(e)));
    return () => {
      cancelled = true;
    };
  }, []);

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
        <h1 className="text-2xl font-extrabold tracking-wide text-white">🛣️ 系统化学习路径</h1>
        <p className="text-xs text-white/40">
          按照科学的推荐顺序组合的技能模块，帮助你从零开始系统化进阶。
        </p>
      </header>

      <div className="space-y-8">
        {data.paths.map((p) => {
          const modules = p.modules
            .map((id) => data.modules.find((m) => m.id === id))
            .filter(Boolean);
          return (
            <section key={p.id} className="card p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/[0.04] pb-5">
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-white tracking-wide">{p.title}</h2>
                  <p className="text-sm text-white/60 max-w-2xl leading-relaxed">{p.summary}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${levelColor[p.level]}`}>
                    {levelLabel[p.level]}
                  </span>
                  <span className="tag text-xs">{modules.length} 个模块</span>
                  <span className="tag text-xs">约 {p.estimatedHours}h</span>
                </div>
              </div>

              {/* Timeline layout */}
              <div className="relative pl-6 border-l-2 border-dashed border-white/10 ml-3 space-y-6">
                {modules.map((m, i) => (
                  <div key={m!.id} className="relative">
                    {/* Circle marker */}
                    <span className="absolute -left-[35px] top-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-galaxy-600 to-indigo-600 border border-white/20 text-xs font-bold text-white shadow shadow-black/30">
                      {i + 1}
                    </span>
                    <div className="space-y-1">
                      <Link
                        to={`/modules/${m!.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-galaxy-300 transition"
                      >
                        {m!.title}
                      </Link>
                      <p className="text-xs text-white/40 leading-relaxed max-w-2xl line-clamp-1">
                        {m!.summary} · 约 {m!.estimatedHours} 小时完成
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {p.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 border-t border-white/[0.04] pt-4">
                  {p.tags.map((t) => (
                    <span key={t} className="tag text-[10px]">{t}</span>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {data.paths.length === 0 && (
        <div className="card p-12 text-center">
          <p className="text-sm text-white/40">暂无学习路径。</p>
        </div>
      )}
    </div>
  );
}
