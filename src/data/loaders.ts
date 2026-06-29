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
  return { modules, categories, paths, updates };
}
