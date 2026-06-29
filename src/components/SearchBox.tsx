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

  return (
    <div ref={boxRef} className="relative">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索模块、路径、分类…"
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-galaxy-500 focus:outline-none"
      />
      {open && results.length > 0 && (
        <ul className="absolute z-30 mt-1 w-full rounded-lg border border-white/10 bg-galaxy-900/95 backdrop-blur shadow-lg">
          {results.map((r) => (
            <li key={`${r.type}-${r.id}`}>
              <button
                type="button"
                onClick={() => go(r)}
                className="flex w-full items-start gap-2 px-3 py-2 text-left hover:bg-white/10"
              >
                <span className="mt-0.5 rounded bg-galaxy-500/20 px-1.5 py-0.5 text-xs text-galaxy-100">
                  {typeLabel[r.type]}
                </span>
                <span>
                  <span className="block text-sm text-white">{r.title}</span>
                  <span className="block text-xs text-white/50 line-clamp-1">
                    {r.summary}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {open && results.length === 0 && (
        <div className="absolute z-30 mt-1 w-full rounded-lg border border-white/10 bg-galaxy-900/95 px-3 py-2 text-xs text-white/50">
          未找到匹配结果
        </div>
      )}
    </div>
  );
}
