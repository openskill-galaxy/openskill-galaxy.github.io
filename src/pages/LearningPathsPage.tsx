import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadAll, type PortalData } from "../data/loaders";

const levelLabel = { beginner: "入门", intermediate: "进阶", advanced: "高阶" };

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
  if (!data) return <p className="text-white/60">加载中…</p>;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-white">学习路径</h1>
        <p className="mt-1 text-white/60 text-sm">
          按推荐顺序组合的技能模块，帮助你系统化进阶。
        </p>
      </header>

      <div className="space-y-6">
        {data.paths.map((p) => {
          const modules = p.modules
            .map((id) => data.modules.find((m) => m.id === id))
            .filter(Boolean);
          return (
            <section key={p.id} className="card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-white">{p.title}</h2>
                  <p className="mt-1 text-sm text-white/70 max-w-2xl">{p.summary}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
                  <span className="tag">{levelLabel[p.level]}</span>
                  <span>{modules.length} 个模块</span>
                  <span>约 {p.estimatedHours}h</span>
                </div>
              </div>

              <ol className="mt-4 space-y-2">
                {modules.map((m, i) => (
                  <li key={m!.id} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-galaxy-600 text-xs text-white">
                      {i + 1}
                    </span>
                    <Link
                      to={`/modules/${m!.slug}`}
                      className="text-sm text-white/80 hover:text-white"
                    >
                      {m!.title}
                      <span className="ml-2 text-xs text-white/40">
                        约 {m!.estimatedHours}h
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>

              {p.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {data.paths.length === 0 && (
        <p className="text-white/60">暂无学习路径。</p>
      )}
    </div>
  );
}
