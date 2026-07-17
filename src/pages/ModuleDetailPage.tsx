import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { loadAll, type PortalData } from "../data/loaders";

const levelLabel = { beginner: "入门", intermediate: "进阶", advanced: "高阶" };
const levelColor = {
  beginner: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  intermediate: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  advanced: "bg-rose-500/10 text-rose-300 border-rose-500/20",
};
const statusLabel = { stable: "稳定", beta: "Beta", draft: "草稿" };

export default function ModuleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
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

  const module = data?.modules.find((m) => m.slug === slug);

  useEffect(() => {
    if (module) {
      document.title = `${module.title} | OpenSkill Galaxy`;
    }
  }, [module]);

  if (error) return <p className="text-rose-300">数据加载失败：{error}</p>;
  if (!data) {
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <p className="text-white/40 animate-pulse text-sm">加载中星河数据…</p>
      </div>
    );
  }
  if (!module) {
    return (
      <div className="space-y-4">
        <p className="text-white/70">未找到模块：{slug}</p>
        <Link className="btn-ghost" to="/modules">返回模块列表</Link>
      </div>
    );
  }

  const category = data.categories.find((c) => c.id === module.category);
  const relatedPaths = data.paths.filter((p) => p.modules.includes(module.id));

  return (
    <article className="space-y-10">
      <nav className="text-xs text-white/40 font-semibold tracking-wide uppercase">
        <Link to="/" className="hover:text-white transition">首页</Link>
        <span className="mx-2 text-white/20">/</span>
        <Link to="/modules" className="hover:text-white transition">模块</Link>
        <span className="mx-2 text-white/20">/</span>
        <span className="text-white/80">{module.title}</span>
      </nav>

      <header className="space-y-4 border-b border-white/[0.04] pb-6">
        <div className="flex flex-wrap items-center gap-2">
          {category && (
            <span className="rounded-full border border-galaxy-500/20 bg-galaxy-500/10 px-2.5 py-0.5 text-[10px] font-bold text-galaxy-300">
              {category.name}
            </span>
          )}
          <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${levelColor[module.level]}`}>
            {levelLabel[module.level]}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold text-white/60">
            {statusLabel[module.status]}
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white leading-none">{module.title}</h1>
        <p className="text-sm md:text-base text-white/60 max-w-3xl leading-relaxed">{module.summary}</p>
        
        {/* Meta Stats Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 max-w-2xl">
          <div className="card px-4 py-3 text-left">
            <span className="block text-[10px] font-semibold text-white/30 uppercase tracking-wider">估计学时</span>
            <span className="block text-sm font-bold text-white mt-0.5">约 {module.estimatedHours} 小时</span>
          </div>
          <div className="card px-4 py-3 text-left">
            <span className="block text-[10px] font-semibold text-white/30 uppercase tracking-wider">内容维护者</span>
            <span className="block text-sm font-bold text-white mt-0.5 truncate">{module.authors.join(", ") || "社区贡献"}</span>
          </div>
          <div className="card px-4 py-3 text-left">
            <span className="block text-[10px] font-semibold text-white/30 uppercase tracking-wider">最近更新</span>
            <span className="block text-sm font-bold text-white mt-0.5">{module.updatedAt}</span>
          </div>
        </div>
      </header>

      {/* Topics */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-wide">📌 核心学习主题</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {module.topics.map((t) => (
            <li key={t} className="card px-5 py-4 text-xs font-semibold text-white/80 border-l-2 border-l-galaxy-500 shadow-sm">
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* Tags */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white tracking-wide">🏷️ 相关检索标签</h2>
        <div className="flex flex-wrap gap-2">
          {module.tags.map((t) => (
            <span key={t} className="tag text-xs">{t}</span>
          ))}
        </div>
      </section>

      {/* Related Paths */}
      {relatedPaths.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white tracking-wide">🛣️ 关联通关路径</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {relatedPaths.map((p) => (
              <Link
                key={p.id}
                to="/paths"
                className="card-hover p-5 block space-y-2"
              >
                <h3 className="text-sm font-bold text-white tracking-wide">{p.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed line-clamp-2">{p.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Actions */}
      <section className="flex flex-wrap items-center gap-3 border-t border-white/[0.04] pt-8">
        {module.url && (
          <a
            className="btn-primary"
            href={module.url}
            target="_blank"
            rel="noreferrer"
          >
            直接进入模块网页端学习 →
          </a>
        )}
        {module.repoUrl && (
          <a
            className="btn-ghost"
            href={module.repoUrl}
            target="_blank"
            rel="noreferrer"
          >
            查看 GitHub 仓库
          </a>
        )}
      </section>
    </article>
  );
}
