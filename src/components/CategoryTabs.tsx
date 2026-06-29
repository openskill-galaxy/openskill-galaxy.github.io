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
            className={`rounded-full px-3 py-1.5 text-sm transition ${
              isActive
                ? "bg-galaxy-600 text-white"
                : "border border-white/10 text-white/70 hover:bg-white/5"
            }`}
          >
            {t.name}
            {typeof c === "number" ? <span className="ml-1 text-xs opacity-70">{c}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
