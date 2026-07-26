import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { loadAll, type PortalData } from "../data/loaders";
import {
  colorFromId,
  monogram,
  IconArrowRight,
  IconGithub,
  IconExternal,
  IconLayers,
  IconRoute,
} from "../components/icons";

const levelLabel = { beginner: "入门", intermediate: "进阶", advanced: "高阶" } as const;
const levelColor = {
  beginner: "text-emerald-600 dark:text-emerald-300 bg-emerald-500/10",
  intermediate: "text-amber-600 dark:text-amber-300 bg-amber-500/10",
  advanced: "text-rose-600 dark:text-rose-300 bg-rose-500/10",
} as const;
const statusLabel = { stable: "稳定", beta: "Beta", draft: "草稿" } as const;

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
    if (module) document.title = `${module.title} | OpenSkill Galaxy`;
  }, [module]);

  if (error) return <p className="text-rose-500">数据加载失败：{error}</p>;
  if (!data) {
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <p className="text-subtle animate-pulse text-sm">加载中…</p>
      </div>
    );
  }
  if (!module) {
    return (
      <div className="space-y-4">
        <p className="text-muted">未找到模块：{slug}</p>
        <Link className="btn-ghost" to="/modules">返回模块列表</Link>
      </div>
    );
  }

  const category = data.categories.find((c) => c.id === module.category);
  const relatedPaths = data.paths.filter((p) => p.modules.includes(module.id));
  const c = colorFromId(module.category);

  const meta = [
    { label: "估计学时", value: `约 ${module.estimatedHours} 小时` },
    { label: "内容维护者", value: module.authors.join(", ") || "社区贡献" },
    { label: "最近更新", value: module.updatedAt },
  ];

  return (
    <article className="space-y-12 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-subtle font-medium">
        <Link to="/" className="hover:text-body transition">首页</Link>
        <span>/</span>
        <Link to="/modules" className="hover:text-body transition">模块</Link>
        <span>/</span>
        <span className="text-muted">{module.title}</span>
      </nav>

      {/* Header */}
      <header className="space-y-5">
        <div className="flex items-start gap-4">
          <span
            className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold"
            style={{ background: c.soft, color: c.fg }}
          >
            {monogram(module.title)}
          </span>
          <div className="space-y-3 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {category && (
                <span className="rounded-md px-2 py-0.5 text-[11px] font-semibold" style={{ background: c.soft, color: c.fg }}>
                  {category.name}
                </span>
              )}
              <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${levelColor[module.level]}`}>
                {levelLabel[module.level]}
              </span>
              <span className="tag">{statusLabel[module.status]}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-body leading-tight">
              {module.title}
            </h1>
          </div>
        </div>
        <p className="text-base text-muted max-w-3xl leading-relaxed">{module.summary}</p>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {module.url && (
            <a className="btn-primary" href={module.url} target="_blank" rel="noreferrer">
              进入模块学习 <IconArrowRight size={16} />
            </a>
          )}
          {module.repoUrl && (
            <a className="btn-ghost" href={module.repoUrl} target="_blank" rel="noreferrer">
              <IconGithub size={16} /> GitHub 仓库
            </a>
          )}
        </div>

        {/* Meta stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {meta.map((m) => (
            <div key={m.label} className="card px-4 py-3">
              <div className="text-[11px] font-medium text-subtle uppercase tracking-wider">{m.label}</div>
              <div className="text-sm font-semibold text-body mt-1 truncate">{m.value}</div>
            </div>
          ))}
        </div>
      </header>

      {/* Topics */}
      {module.topics.length > 0 && (
        <section className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-body">
            <IconLayers size={18} className="text-brand" /> 核心学习主题
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {module.topics.map((t) => (
              <li key={t} className="card flex items-center gap-3 px-4 py-3 text-sm font-medium text-body">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Tags */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-body">相关检索标签</h2>
        <div className="flex flex-wrap gap-2">
          {module.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </section>

      {/* Related paths */}
      {relatedPaths.length > 0 && (
        <section className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-body">
            <IconRoute size={18} className="text-brand" /> 关联通关路径
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {relatedPaths.map((p) => (
              <Link key={p.id} to="/paths" className="card-hover p-5 space-y-2 block">
                <h3 className="text-sm font-semibold text-body">{p.title}</h3>
                <p className="text-xs text-muted leading-relaxed line-clamp-2">{p.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {module.url && (
        <section className="card flex flex-col sm:flex-row sm:items-center gap-4 justify-between p-6">
          <div>
            <h3 className="text-base font-semibold text-body">准备好开始学习了吗？</h3>
            <p className="text-sm text-muted mt-1">进入独立模块站，开启课程、题库与模拟考试。</p>
          </div>
          <a className="btn-primary shrink-0" href={module.url} target="_blank" rel="noreferrer">
            <IconExternal size={16} /> 打开模块站
          </a>
        </section>
      )}
    </article>
  );
}
