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
            className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition duration-200 ${
              isActive
                ? "bg-galaxy-600 text-white shadow-lg shadow-galaxy-600/15"
                : "border border-white/10 text-white/60 bg-white/[0.01] hover:bg-white/[0.04] hover:text-white"
            }`}
          >
            {t.name}
            {typeof c === "number" ? (
              <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[9px] ${
                isActive ? "bg-white/20 text-white" : "bg-white/10 text-white/50"
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
