import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { loadAll, type PortalData } from "../data/loaders";

const levelLabel = { beginner: "入门", intermediate: "进阶", advanced: "高阶" };
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

  if (error) return <p className="text-rose-300">数据加载失败：{error}</p>;
  if (!data) return <p className="text-white/60">加载中…</p>;

  const module = data.modules.find((m) => m.slug === slug);
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
    <article className="space-y-8">
      <nav className="text-sm text-white/50">
        <Link to="/" className="hover:text-white">首页</Link>
        <span className="mx-2">/</span>
        <Link to="/modules" className="hover:text-white">模块</Link>
        <span className="mx-2">/</span>
        <span className="text-white/80">{module.title}</span>
      </nav>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {category && <span className="tag">{category.name}</span>}
          <span className="tag">{levelLabel[module.level]}</span>
          <span className="tag">{statusLabel[module.status]}</span>
        </div>
        <h1 className="text-3xl font-bold text-white">{module.title}</h1>
        <p className="text-white/70 max-w-3xl">{module.summary}</p>
        <div className="flex flex-wrap gap-4 text-sm text-white/60">
          <span>预计 {module.estimatedHours} 小时</span>
          <span>作者：{module.authors.join(", ") || "社区"}</span>
          <span>更新于 {module.updatedAt}</span>
        </div>
      </header>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">技能主题</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {module.topics.map((t) => (
            <li key={t} className="card px-4 py-3 text-sm text-white/80">
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-3">标签</h2>
        <div className="flex flex-wrap gap-2">
          {module.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </section>

      {relatedPaths.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">关联学习路径</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedPaths.map((p) => (
              <Link
                key={p.id}
                to="/paths"
                className="card p-4 hover:border-galaxy-500/40 hover:bg-white/10 transition"
              >
                <h3 className="text-white font-medium">{p.title}</h3>
                <p className="mt-1 text-sm text-white/60 line-clamp-2">{p.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {module.repoUrl && (
        <section>
          <a
            className="btn-primary"
            href={module.repoUrl}
            target="_blank"
            rel="noreferrer"
          >
            查看模块仓库 →
          </a>
        </section>
      )}
    </article>
  );
}
