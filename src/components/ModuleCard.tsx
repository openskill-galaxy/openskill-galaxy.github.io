import { Link } from "react-router-dom";
import type { Module } from "../types";

const levelLabel: Record<Module["level"], string> = {
  beginner: "入门",
  intermediate: "进阶",
  advanced: "高阶",
};

const levelColor: Record<Module["level"], string> = {
  beginner: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  intermediate: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  advanced: "bg-rose-500/10 text-rose-300 border-rose-500/20",
};

const statusLabel: Record<Module["status"], string> = {
  stable: "稳定",
  beta: "Beta",
  draft: "草稿",
};

function getModuleEmoji(slug: string): string {
  const s = slug.toLowerCase();
  if (s.includes("python")) return "🐍";
  if (s.includes("go-")) return "🐹";
  if (s.includes("java")) return "☕";
  if (s.includes("rust")) return "🦀";
  if (s.includes("react")) return "⚛️";
  if (s.includes("vue")) return "💚";
  if (s.includes("typescript")) return "🟦";
  if (s.includes("git")) return "🐙";
  if (s.includes("docker")) return "🐳";
  if (s.includes("kubernetes")) return "☸️";
  if (s.includes("linux")) return "🐧";
  if (s.includes("database") || s.includes("sql")) return "💾";
  if (s.includes("ai") || s.includes("llm") || s.includes("machine")) return "🤖";
  if (s.includes("algorithm")) return "🧮";
  if (s.includes("network")) return "🌐";
  if (s.includes("security")) return "🛡️";
  if (s.includes("web") || s.includes("frontend")) return "💻";
  return "✨";
}

export default function ModuleCard({ module, className = "" }: { module: Module; className?: string }) {
  const emoji = getModuleEmoji(module.slug);
  return (
    <div className={`card-hover block p-6 flex flex-col justify-between ${className}`}>
      <Link to={`/modules/${module.slug}`} className="block flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl filter drop-shadow">{emoji}</span>
            <h3 className="text-base font-bold text-white tracking-wide">{module.title}</h3>
          </div>
          <span
            className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${levelColor[module.level]}`}
          >
            {levelLabel[module.level]}
          </span>
        </div>
        <p className="mt-3 text-sm text-white/60 line-clamp-3 leading-relaxed">{module.summary}</p>
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {module.tags.slice(0, 3).map((t) => (
            <span key={t} className="tag text-[10px]">{t}</span>
          ))}
        </div>
      </Link>

      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/[0.04] pt-4">
        {module.url && (
          <a
            href={module.url}
            target="_blank"
            rel="noreferrer"
            className="btn-primary !px-3.5 !py-2 text-xs"
          >
            进入模块 →
          </a>
        )}
        {module.repoUrl && (
          <a
            href={module.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost !px-3.5 !py-2 text-xs"
          >
            GitHub
          </a>
        )}
        <span className="ml-auto text-xs text-white/30 font-medium">
          {statusLabel[module.status]} · 约 {module.estimatedHours}h
        </span>
      </div>
    </div>
  );
}
