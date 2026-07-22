import type { Category } from "../types";

interface Props {
  categories: Category[];
  active: string; // category id or "all"
  counts?: Record<string, number>;
  onSelect: (id: string) => void;
}

export default function CategoryTabs({ categories, active, counts, onSelect }: Props) {
  const tabs = [{ id: "all", name: "全部" }, ...categories];
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t) => {
        const isActive = active === t.id;
        const c = counts?.[t.id];
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onSelect(t.id)}
            className={`rounded-full px-4 py-2 text-xs font-bold tracking-wide transition duration-200 ${
              isActive
                ? "bg-galaxy-600 text-white shadow-lg shadow-galaxy-600/15"
                : "border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white/60 bg-slate-100/60 dark:bg-white/[0.01] hover:bg-slate-200 dark:hover:bg-white/[0.04] hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {t.name}
            {typeof c === "number" ? (
              <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[9px] ${
                isActive ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-white/50"
              }`}>
                {c}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
