import { Link } from "react-router-dom";
import type { Module } from "../types";
import { colorFromId, monogram, IconArrowRight, IconClock } from "./icons";

const levelLabel: Record<Module["level"], string> = {
  beginner: "入门",
  intermediate: "进阶",
  advanced: "高阶",
};

const levelColor: Record<Module["level"], string> = {
  beginner: "text-emerald-600 dark:text-emerald-300 bg-emerald-500/10",
  intermediate: "text-amber-600 dark:text-amber-300 bg-amber-500/10",
  advanced: "text-rose-600 dark:text-rose-300 bg-rose-500/10",
};

const statusLabel: Record<Module["status"], string> = {
  stable: "稳定",
  beta: "Beta",
  draft: "草稿",
};

export default function ModuleCard({ module, className = "" }: { module: Module; className?: string }) {
  const c = colorFromId(module.category);
  return (
    <div className={`card-hover group flex flex-col p-5 ${className}`}>
      <Link to={`/modules/${module.slug}`} className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-base font-bold"
              style={{ background: c.soft, color: c.fg }}
            >
              {monogram(module.title)}
            </span>
            <h3 className="text-[15px] font-semibold text-body leading-tight truncate">
              {module.title}
            </h3>
          </div>
          <span
            className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold ${levelColor[module.level]}`}
          >
            {levelLabel[module.level]}
          </span>
        </div>

        <p className="mt-3.5 text-sm text-muted line-clamp-2 leading-relaxed">{module.summary}</p>

        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {module.tags.slice(0, 3).map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </Link>

      <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <span className="inline-flex items-center gap-1.5 text-xs text-subtle font-medium">
          <IconClock size={14} /> {module.estimatedHours}h
        </span>
        <span className="text-xs text-subtle">·</span>
        <span className="text-xs text-subtle font-medium">{statusLabel[module.status]}</span>
        {module.url && (
          <a
            href={module.url}
            target="_blank"
            rel="noreferrer"
            className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-brand hover:gap-1.5 transition-all"
          >
            进入模块 <IconArrowRight size={15} />
          </a>
        )}
      </div>
    </div>
  );
}
