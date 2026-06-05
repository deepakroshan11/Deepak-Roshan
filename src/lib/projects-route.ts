import { DATA } from "@/data/resume";

export type ProjectEntry = (typeof DATA.projects)[number];

/** URL-safe slug from project title (matches file paths in `/works/[slug]`). */
export function projectSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[''"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Same order as `DATA.projects` (homepage order). */
export function getProjectsList(): ProjectEntry[] {
  return [...DATA.projects];
}

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
  return DATA.projects.find((p) => projectSlug(p.title) === slug);
}

export function getProjectNeighbors(slug: string): {
  project: ProjectEntry;
  previous: ProjectEntry | null;
  next: ProjectEntry | null;
} | null {
  const list = getProjectsList();
  const index = list.findIndex((p) => projectSlug(p.title) === slug);
  if (index === -1) return null;
  return {
    project: list[index]!,
    previous: index > 0 ? list[index - 1]! : null,
    next: index < list.length - 1 ? list[index + 1]! : null,
  };
}
