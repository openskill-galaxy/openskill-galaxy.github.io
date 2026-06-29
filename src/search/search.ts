import type {
  Module,
  LearningPath,
  Category,
  SearchResult,
} from "../types";

export interface SearchInput {
  modules: Module[];
  paths: LearningPath[];
  categories: Category[];
}

export function buildSearchIndex(input: SearchInput): SearchResult[] {
  const moduleResults: SearchResult[] = input.modules.map((m) => ({
    type: "module",
    id: m.id,
    title: m.title,
    summary: m.summary,
    url: `/modules/${m.slug}`,
  }));

  const pathResults: SearchResult[] = input.paths.map((p) => ({
    type: "path",
    id: p.id,
    title: p.title,
    summary: p.summary,
    url: `/paths/${p.slug}`,
  }));

  const categoryResults: SearchResult[] = input.categories.map((c) => ({
    type: "category",
    id: c.id,
    title: c.name,
    summary: c.description,
    url: `/modules?category=${c.id}`,
  }));

  return [...moduleResults, ...pathResults, ...categoryResults];
}

export function search(
  index: SearchResult[],
  query: string,
  limit = 20
): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);

  const scored = index.map((item) => {
    const haystack = `${item.title} ${item.summary}`.toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (item.title.toLowerCase().includes(t)) score += 3;
      if (haystack.includes(t)) score += 1;
    }
    return { item, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.item);
}
