import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadAll, type PortalData } from "../data/loaders";
import ModuleCard from "../components/ModuleCard";

export default function HomePage() {
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

  if (error) {
    return <p className="text-rose-300">数据加载失败：{error}</p>;
  }
  if (!data) {
    return <p className="text-white/60">加载中…</p>;
  }

  const featured = data.modules.slice(0, 6);
  const latestUpdates = [...data.updates]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 4);

  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          OpenSkill Galaxy
        </h1>
        <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
          开放技能星河 —— 由社区共建的模块化技能学习平台。
          浏览技能模块、跟随学习路径、追踪最新动态。
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link className="btn-primary" to="/modules">浏览模块</Link>
          <Link className="btn-ghost" to="/paths">查看路径</Link>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
          <span>{data.modules.length} 个技能模块</span>
          <span>{data.categories.length} 个分类</span>
          <span>{data.paths.length} 条学习路径</span>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">精选模块</h2>
          <Link className="text-sm text-galaxy-100 hover:text-white" to="/modules">
            查看全部 →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((m) => (
            <ModuleCard key={m.id} module={m} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">学习路径</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {data.paths.slice(0, 4).map((p) => (
            <Link
              key={p.id}
              to="/paths"
              className="card p-5 hover:border-galaxy-500/40 hover:bg-white/10 transition"
            >
              <h3 className="text-base font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm text-white/70 line-clamp-2">{p.summary}</p>
              <p className="mt-3 text-xs text-white/50">
                {p.modules.length} 个模块 · 约 {p.estimatedHours}h
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">最新动态</h2>
        <ul className="card divide-y divide-white/10">
          {latestUpdates.map((u) => (
            <li key={u.id} className="p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-white font-medium">{u.title}</span>
                <time className="text-xs text-white/50">{u.date}</time>
              </div>
              <p className="mt-1 text-sm text-white/70">{u.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
