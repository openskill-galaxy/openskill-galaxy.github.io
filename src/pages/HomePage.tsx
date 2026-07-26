import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadAll, type PortalData } from "../data/loaders";
import ModuleCard from "../components/ModuleCard";
import {
  IconArrowRight,
  IconSparkles,
  IconRoute,
  IconMegaphone,
  IconLayers,
  colorFromId,
} from "../components/icons";

export default function HomePage() {
  const [data, setData] = useState<PortalData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "OpenSkill Galaxy | 开放技能星河";
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
      <div className="space-y-16 animate-pulse py-8">
        <div className="space-y-5 max-w-2xl">
          <div className="h-14 bg-surface-2 rounded-2xl w-3/4" />
          <div className="h-6 bg-surface-2 rounded-xl w-5/6" />
          <div className="h-10 bg-surface-2 rounded-xl w-52" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-52 rounded-2xl border border-line bg-surface-2" />
          ))}
        </div>
      </div>
    );
  }

  const featured = data.modules.slice(0, 6);
  const latestUpdates = [...data.updates].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 4);
  const stats = [
    { label: "技能模块", value: data.modules.length },
    { label: "学科分类", value: data.categories.length },
    { label: "学习路线", value: data.paths.length },
  ];

  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="relative pt-6 sm:pt-10">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {data.modules.length} 个模块 · 100% 静态 · 开箱即用
          </span>
          <h1 className="mt-6 text-4xl sm:text-6xl font-bold tracking-tight text-body leading-[1.05]">
            系统化掌握技能，
            <br className="hidden sm:block" />
            从入门到<span className="text-gradient">工程实战</span>。
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
            OpenSkill Galaxy 是社区共建的模块化学习与自测平台。
            覆盖前端、后端、算法、AI 与系统等方向，课程、题库、模拟考试与学习路径一体化。
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link className="btn-primary" to="/modules">
              浏览技能模块 <IconArrowRight size={16} />
            </Link>
            <Link className="btn-ghost" to="/paths">
              查看推荐路径
            </Link>
          </div>

          {/* Inline stats */}
          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-body tabular-nums tracking-tight">{s.value}</div>
                <div className="text-xs font-medium text-subtle uppercase tracking-wider mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories quick-nav */}
      <section className="space-y-5">
        <SectionHeader icon={<IconLayers size={16} />} title="按方向探索" sub="从你感兴趣的领域开始" />
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {data.categories.slice(0, 10).map((cat) => {
            const c = colorFromId(cat.id);
            return (
              <Link
                key={cat.id}
                to={`/modules?category=${cat.id}`}
                className="card-hover flex items-center gap-2.5 px-3.5 py-3"
              >
                <span
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                  style={{ background: c.soft, color: c.fg }}
                >
                  {cat.name.slice(0, 1)}
                </span>
                <span className="text-sm font-medium text-body truncate">{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured modules */}
      <section className="space-y-5">
        <SectionHeader
          icon={<IconSparkles size={16} />}
          title="精选推荐模块"
          sub="社区高人气精品学习方案"
          action={{ to: "/modules", label: "查看全部" }}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((m, idx) => (
            <ModuleCard key={m.id} module={m} className={`animate-slide-up stagger-${(idx % 6) + 1}`} />
          ))}
        </div>
      </section>

      {/* Learning paths */}
      <section className="space-y-5">
        <SectionHeader
          icon={<IconRoute size={16} />}
          title="技能通关路径"
          sub="系统化进阶导航推荐"
          action={{ to: "/paths", label: "全部路径" }}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {data.paths.slice(0, 4).map((p) => (
            <Link key={p.id} to="/paths" className="card-hover group flex flex-col justify-between p-6">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-brand">
                    <IconRoute size={17} />
                  </span>
                  <h3 className="text-[15px] font-semibold text-body">{p.title}</h3>
                </div>
                <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-2">{p.summary}</p>
              </div>
              <div className="mt-5 flex items-center gap-4 border-t border-line pt-4 text-xs text-subtle font-medium">
                <span>{p.modules.length} 个模块</span>
                {p.estimatedHours ? <span>约 {p.estimatedHours} 小时</span> : null}
                <IconArrowRight
                  size={15}
                  className="ml-auto text-brand transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest updates */}
      <section className="space-y-5">
        <SectionHeader icon={<IconMegaphone size={16} />} title="平台动态简报" sub="最新功能与模块发布快讯" />
        <div className="card divide-y divide-line overflow-hidden">
          {latestUpdates.map((u) => {
            const tone =
              u.type === "release"
                ? "text-emerald-600 dark:text-emerald-300 bg-emerald-500/10"
                : u.type === "event"
                ? "text-violet-600 dark:text-violet-300 bg-violet-500/10"
                : "text-sky-600 dark:text-sky-300 bg-sky-500/10";
            const label = u.type === "release" ? "发布" : u.type === "event" ? "活动" : "资讯";
            return (
              <div key={u.id} className="flex gap-4 items-start p-5 hover:bg-surface-2 transition-colors">
                <span className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold mt-0.5 ${tone}`}>
                  {label}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-body">{u.title}</span>
                    <time className="text-xs text-subtle tabular-nums shrink-0">{u.date}</time>
                  </div>
                  <p className="mt-1 text-sm text-muted leading-relaxed">{u.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  sub,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  action?: { to: string; label: string };
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-brand">
          {icon}
        </span>
        <div>
          <h2 className="text-lg font-semibold text-body tracking-tight">{title}</h2>
          <p className="text-xs text-subtle mt-0.5">{sub}</p>
        </div>
      </div>
      {action && (
        <Link
          className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:gap-1.5 transition-all shrink-0"
          to={action.to}
        >
          {action.label} <IconArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}
