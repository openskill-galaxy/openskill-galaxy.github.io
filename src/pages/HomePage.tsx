import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadAll, type PortalData } from "../data/loaders";
import ModuleCard from "../components/ModuleCard";

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

  if (error) {
    return <p className="text-rose-600 dark:text-rose-300">数据加载失败：{error}</p>;
  }
  if (!data) {
    return (
      <div className="space-y-16 animate-pulse py-8">
        <section className="text-center space-y-6 max-w-2xl mx-auto">
          <div className="h-12 bg-slate-200 dark:bg-white/5 rounded-2xl w-3/4 mx-auto" />
          <div className="h-6 bg-slate-200 dark:bg-white/5 rounded-xl w-5/6 mx-auto" />
          <div className="h-10 bg-slate-200 dark:bg-white/5 rounded-xl w-40 mx-auto" />
          <div className="h-20 bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-2xl grid grid-cols-3 p-2.5 mt-8">
            <div className="h-full border-r border-slate-200 dark:border-white/5" />
            <div className="h-full border-r border-slate-200 dark:border-white/5" />
            <div className="h-full" />
          </div>
        </section>
        <section className="space-y-6">
          <div className="h-6 bg-slate-200 dark:bg-white/5 rounded-xl w-32" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-white/[0.01]" />
            ))}
          </div>
        </section>
      </div>
    );
  }

  const featured = data.modules.slice(0, 6);
  const latestUpdates = [...data.updates]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 4);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 relative">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
          OpenSkill <span className="text-transparent bg-clip-text bg-gradient-to-r from-galaxy-600 via-indigo-600 to-cyan-600 dark:from-galaxy-400 dark:via-indigo-200 dark:to-cyan-400">Galaxy</span>
        </h1>
        <p className="mt-6 text-base md:text-lg text-slate-600 dark:text-white/60 max-w-2xl mx-auto font-medium leading-relaxed">
          开放技能星河 —— 由社区共建的模块化静态技能学习与自测平台。
          探索各类技能主题、规划专属学习路径、掌握全面前沿知识。
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link className="btn-primary" to="/modules">浏览技能模块</Link>
          <Link className="btn-ghost" to="/paths">查看推荐路径</Link>
        </div>
        <div className="mt-12 max-w-xl mx-auto grid grid-cols-3 gap-4 p-2.5 rounded-2xl border border-slate-200 dark:border-white/[0.04] bg-slate-100/50 dark:bg-white/[0.01] backdrop-blur-sm">
          <div className="py-2.5">
            <span className="block text-xl font-extrabold text-slate-900 dark:text-white tracking-wide">{data.modules.length}</span>
            <span className="text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest mt-1 block">技能模块</span>
          </div>
          <div className="py-2.5 border-x border-slate-200 dark:border-white/[0.05]">
            <span className="block text-xl font-extrabold text-slate-900 dark:text-white tracking-wide">{data.categories.length}</span>
            <span className="text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest mt-1 block">学科分类</span>
          </div>
          <div className="py-2.5">
            <span className="block text-xl font-extrabold text-slate-900 dark:text-white tracking-wide">{data.paths.length}</span>
            <span className="text-[10px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-widest mt-1 block">学习路线</span>
          </div>
        </div>
      </section>

      {/* Featured Modules */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-extrabold tracking-wide text-slate-900 dark:text-white">✨ 精选推荐模块</h2>
            <p className="text-xs text-slate-500 dark:text-white/40 mt-1">社区高人气精品学习自测方案</p>
          </div>
          <Link className="text-xs font-bold text-galaxy-600 dark:text-galaxy-400 hover:text-galaxy-700 dark:hover:text-galaxy-300 transition duration-200" to="/modules">
            查看全部模块 →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((m, idx) => (
            <ModuleCard key={m.id} module={m} className={`animate-slide-up stagger-${(idx % 6) + 1}`} />
          ))}
        </div>
      </section>

      {/* Learning Paths */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-extrabold tracking-wide text-slate-900 dark:text-white">🛣️ 技能通关路径</h2>
          <p className="text-xs text-slate-500 dark:text-white/40 mt-1">系统化技能进阶导航推荐</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {data.paths.slice(0, 4).map((p) => (
            <Link
              key={p.id}
              to="/paths"
              className="card-hover p-6 block flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-wide">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-white/60 leading-relaxed line-clamp-2">{p.summary}</p>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-200 dark:border-white/[0.04] pt-4 text-xs text-slate-500 dark:text-white/40 font-medium">
                <span>{p.modules.length} 个知识模块</span>
                <span>约 {p.estimatedHours} 小时总长</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Updates */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-extrabold tracking-wide text-slate-900 dark:text-white">📢 平台动态简报</h2>
          <p className="text-xs text-slate-500 dark:text-white/40 mt-1">获取技能星河最新功能与模块发布快讯</p>
        </div>
        <div className="card divide-y divide-slate-200 dark:divide-white/[0.04] overflow-hidden">
          {latestUpdates.map((u) => {
            const icon = u.type === "release" ? "🚀" : u.type === "event" ? "🎉" : "📰";
            return (
              <div key={u.id} className="p-5 flex gap-4 items-start hover:bg-slate-100 dark:hover:bg-white/[0.01] transition-all">
                <span className="text-xl filter drop-shadow mt-0.5">{icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">{u.title}</span>
                    <time className="text-[10px] font-semibold text-slate-400 dark:text-white/40 uppercase tracking-wider">{u.date}</time>
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-white/60 leading-relaxed">{u.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
