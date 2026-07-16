import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SearchResult } from "../types";
import { buildSearchIndex, search } from "../search/search";
import { loadAll } from "../data/loaders";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState<SearchResult[]>([]);
  const navigate = useNavigate();
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadAll()
      .then((data) => {
        if (!cancelled) {
          setIndex(
            buildSearchIndex({
              modules: data.modules,
              paths: data.paths,
              categories: data.categories,
            })
          );
        }
      })
      .catch(() => {
        /* 数据加载失败时静默，不影响页面渲染 */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setResults(search(index, query, 8));
    setOpen(query.trim().length > 0);
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
    navigate(r.url);
  }

  const typeLabel: Record<SearchResult["type"], string> = {
    module: "模块",
    path: "路径",
    category: "分类",
  };

  const typeColor: Record<SearchResult["type"], string> = {
    module: "bg-galaxy-500/10 text-galaxy-300 border-galaxy-500/20",
    path: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    category: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  };

  return (
    <div ref={boxRef} className="relative">
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索模块、路径、分类…"
          className="w-full rounded-xl border border-white/10 bg-white/[0.02] pl-10 pr-16 py-2 text-sm text-white placeholder-white/30 focus:border-galaxy-500 focus:outline-none focus:ring-1 focus:ring-galaxy-500 transition duration-200"
        />
        <span className="absolute left-3.5 text-white/30 text-xs">🔍</span>
        <span className="hidden sm:inline absolute right-3 text-[9px] font-bold text-white/20 border border-white/10 rounded px-1.5 py-0.5 pointer-events-none select-none bg-white/[0.01]">
          Ctrl+K
        </span>
      </div>
      {open && results.length > 0 && (
        <ul className="absolute right-0 z-30 mt-2 w-[320px] sm:w-[400px] rounded-2xl border border-white/[0.08] bg-slate-950/95 backdrop-blur-xl shadow-2xl overflow-hidden p-1.5 space-y-0.5">
          {results.map((r) => (
            <li key={`${r.type}-${r.id}`}>
              <button
                type="button"
                onClick={() => go(r)}
                className="flex w-full items-start gap-3 rounded-xl px-3.5 py-2.5 text-left hover:bg-white/[0.04] active:scale-[0.99] transition-all duration-150"
              >
                <span className={`mt-0.5 shrink-0 rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${typeColor[r.type]}`}>
                  {typeLabel[r.type]}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-white font-medium truncate">{r.title}</span>
                  <span className="block text-xs text-white/40 truncate mt-0.5">
                    {r.summary}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {open && results.length === 0 && (
        <div className="absolute right-0 z-30 mt-2 w-[320px] rounded-2xl border border-white/[0.08] bg-slate-950/95 p-4 text-xs text-white/40 shadow-2xl">
          未找到匹配结果
        </div>
      )}
    </div>
  );
}
