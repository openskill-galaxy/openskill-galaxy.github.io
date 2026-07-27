import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SearchResult } from "../types";
import { buildSearchIndex, search } from "../search/search";
import { loadAll } from "../data/loaders";
import { IconSearch } from "./icons";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [index, setIndex] = useState<SearchResult[]>([]);
  const navigate = useNavigate();
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      loadAll(),
      fetch("/data/global-search-index.json")
        .then((res) => res.json())
        .catch(() => [] as any[])
    ])
      .then(([data, globalItems]) => {
        if (!cancelled) {
          const metaIndex = buildSearchIndex({
            modules: data.modules,
            paths: data.paths,
            categories: data.categories,
          });

          const formattedGlobal = (globalItems || []).flatMap((item: any) => {
            // 索引里的 moduleSlug 与 modules.json 的 slug 不一致，用条目 id 前缀匹配模块 id
            const mod =
              data.modules
                .filter((m) => typeof item.id === "string" && item.id.startsWith(m.id + "-"))
                .sort((a, b) => b.id.length - a.id.length)[0] ||
              data.modules.find((m) => m.slug === item.moduleSlug);
            if (!mod || !mod.url) return [];
            const cleanUrl = mod.url.endsWith("/") ? mod.url : mod.url + "/";
            const pagePath = item.type === "question" ? `/questions/${item.slug}` : `/lessons/${item.slug}`;
            return [{
              type: item.type as any,
              id: item.id,
              title: item.title,
              summary: item.summary,
              url: `${cleanUrl}?page=${encodeURIComponent(pagePath)}`,
              moduleTitle: item.moduleTitle,
            }];
          });

          setIndex([...metaIndex, ...formattedGlobal]);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setResults(search(index, query, 8));
    setOpen(query.trim().length > 0);
    setActiveIndex(-1);
  }, [query, index]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function go(r: SearchResult) {
    setQuery("");
    setOpen(false);
    if (r.url.startsWith("/")) {
      navigate(r.url);
    } else {
      window.location.href = r.url;
    }
  }

  const typeLabel: Record<SearchResult["type"], string> = {
    module: "模块",
    path: "路径",
    category: "分类",
    lesson: "课时",
    question: "测试",
  };

  const typeColor: Record<SearchResult["type"], string> = {
    module: "bg-accent-soft text-brand",
    path: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-300",
    category: "bg-violet-500/10 text-violet-600 dark:text-violet-300",
    lesson: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
    question: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
  };

  return (
    <div ref={boxRef} className="relative">
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (!open || results.length === 0) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((i) => (i + 1) % results.length);
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((i) => (i <= 0 ? results.length - 1 : i - 1));
            } else if (e.key === "Enter" && activeIndex >= 0 && activeIndex < results.length) {
              e.preventDefault();
              go(results[activeIndex]);
            }
          }}
          placeholder="搜索模块、课时…"
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-controls="portal-search-results"
          aria-activedescendant={activeIndex >= 0 ? `portal-search-option-${activeIndex}` : undefined}
          aria-autocomplete="list"
          aria-label="全站搜索"
          className="input pl-9 pr-14 py-2"
        />
        <span className="absolute left-3 text-subtle pointer-events-none">
          <IconSearch size={16} />
        </span>
        <span className="hidden lg:inline absolute right-2.5 text-[10px] font-medium text-subtle border border-line rounded px-1.5 py-0.5 pointer-events-none select-none">
          Ctrl+K
        </span>
      </div>
      {open && results.length > 0 && (
        <ul
          id="portal-search-results"
          role="listbox"
          className="absolute right-0 z-40 mt-2 w-[min(320px,calc(100vw-2rem))] sm:w-[440px] rounded-2xl border border-line bg-surface backdrop-blur-xl shadow-[var(--shadow-lg)] overflow-hidden p-1.5 space-y-0.5"
        >
          {results.map((r, i) => (
            <li key={`${r.type}-${r.id}`} id={`portal-search-option-${i}`} role="option" aria-selected={i === activeIndex}>
              <button
                type="button"
                onClick={() => go(r)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-surface-2 active:scale-[0.99] transition-all duration-150 ${i === activeIndex ? "bg-surface-2" : ""}`}
              >
                <span className={`mt-0.5 shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${typeColor[r.type]}`}>
                  {typeLabel[r.type]}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="block text-sm text-body font-medium truncate">{r.title}</span>
                    {r.moduleTitle && (
                      <span className="shrink-0 text-[10px] text-brand font-medium px-1.5 py-0.5 rounded bg-accent-soft">
                        {r.moduleTitle}
                      </span>
                    )}
                  </span>
                  <span className="block text-xs text-muted truncate mt-0.5">{r.summary}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {open && results.length === 0 && (
        <div className="absolute right-0 z-40 mt-2 w-[min(320px,calc(100vw-2rem))] rounded-2xl border border-line bg-surface p-4 text-xs text-muted shadow-[var(--shadow-lg)]">
          未找到匹配结果
        </div>
      )}
    </div>
  );
}
