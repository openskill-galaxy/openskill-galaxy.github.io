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
            aria-pressed={isActive}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-accent text-white shadow-[var(--shadow-accent)]"
                : "text-muted bg-surface border border-line hover:border-line-strong hover:text-body"
            }`}
          >
            {t.name}
            {typeof c === "number" && (
              <span
                className={`rounded px-1.5 text-[11px] tabular-nums ${
                  isActive ? "bg-white/20 text-white" : "bg-surface-2 text-subtle"
                }`}
              >
                {c}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
