/// <reference types="vite/client" />

import type { Category, Module, LearningPath, UpdateItem } from "../types";

const BASE = import.meta.env.BASE_URL || "/";

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    throw new Error(`Failed to load ${path}: ${res.status}`);
  }
  return (await res.json()) as T;
}

export async function loadModules(): Promise<Module[]> {
  return fetchJson<Module[]>("data/modules.json");
}

export async function loadCategories(): Promise<Category[]> {
  return fetchJson<Category[]>("data/categories.json");
}

export async function loadLearningPaths(): Promise<LearningPath[]> {
  return fetchJson<LearningPath[]>("data/learning-paths.json");
}

export async function loadUpdates(): Promise<UpdateItem[]> {
  return fetchJson<UpdateItem[]>("data/updates.json");
}

export interface PortalData {
  modules: Module[];
  categories: Category[];
  paths: LearningPath[];
  updates: UpdateItem[];
}

export async function loadAll(): Promise<PortalData> {
  const [modules, categories, paths, updates] = await Promise.all([
    loadModules(),
    loadCategories(),
    loadLearningPaths(),
    loadUpdates(),
  ]);

  // Normalize the learning-path JSON so pages never crash:
  // - `modules` entries may reference a module by id OR slug → canonical ids
  // - `tags` defaults to []
  // - `estimatedHours` falls back to the sum of referenced modules' hours
  const idByRef = new Map<string, string>();
  for (const m of modules) {
    idByRef.set(m.id, m.id);
    idByRef.set(m.slug, m.id);
  }
  const hoursById = new Map(modules.map((m) => [m.id, m.estimatedHours || 0]));
  const normalizedPaths = paths.map((p) => {
    const ids = p.modules
      .map((ref) => idByRef.get(ref))
      .filter((id): id is string => Boolean(id));
    return {
      ...p,
      modules: ids,
      tags: p.tags ?? [],
      estimatedHours:
        p.estimatedHours ??
        ids.reduce((sum, id) => sum + (hoursById.get(id) || 0), 0),
    };
  });

  return { modules, categories, paths: normalizedPaths, updates };
}
