import { Link } from "react-router-dom";
import type { Module } from "../types";

const levelLabel: Record<Module["level"], string> = {
  beginner: "入门",
  intermediate: "进阶",
  advanced: "高阶",
};

const levelColor: Record<Module["level"], string> = {
  beginner: "bg-emerald-500/15 text-emerald-200",
  intermediate: "bg-amber-500/15 text-amber-200",
  advanced: "bg-rose-500/15 text-rose-200",
};

const statusLabel: Record<Module["status"], string> = {
  stable: "稳定",
  beta: "Beta",
  draft: "草稿",
};

export default function ModuleCard({ module }: { module: Module }) {
  return (
    <div className="card block p-5 hover:border-galaxy-500/40 hover:bg-white/10 transition">
      <Link to={`/modules/${module.slug}`} className="block">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-white">{module.title}</h3>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${levelColor[module.level]}`}
          >
            {levelLabel[module.level]}
          </span>
        </div>
        <p className="mt-2 text-sm text-white/70 line-clamp-3">{module.summary}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {module.tags.slice(0, 3).map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
          <span className="ml-auto text-xs text-white/50">
            {statusLabel[module.status]} · 约 {module.estimatedHours}h
          </span>
        </div>
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/10 pt-3">
        {module.url && (
          <a
            href={module.url}
            target="_blank"
            rel="noreferrer"
            className="btn-primary text-xs"
          >
            进入模块 →
          </a>
        )}
        {module.repoUrl && (
          <a
            href={module.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost text-xs"
          >
            GitHub 仓库
          </a>
        )}
        <Link
          to={`/modules/${module.slug}`}
          className="ml-auto text-xs text-galaxy-100 hover:text-white"
        >
          查看详情 →
        </Link>
      </div>
    </div>
  );
}
