export type SkillLevel = "beginner" | "intermediate" | "advanced";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string; // category id
  level: SkillLevel;
  tags: string[];
  estimatedHours: number;
  authors: string[];
  status: "stable" | "beta" | "draft";
  updatedAt: string; // ISO date
  repoUrl?: string;
  url?: string; // 模块站外链（如 https://openskill-galaxy.github.io/module-digital-logic/）
  topics: string[];
}

export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  summary: string;
  level: SkillLevel;
  modules: string[]; // module ids in order
  estimatedHours: number;
  tags: string[];
}

export interface UpdateItem {
  id: string;
  date: string; // ISO date
  type: "release" | "news" | "event";
  title: string;
  description: string;
  url?: string;
}

export interface SearchResult {
  type: "module" | "path" | "category" | "lesson" | "question";
  id: string;
  title: string;
  summary: string;
  url: string;
  moduleTitle?: string;
}
