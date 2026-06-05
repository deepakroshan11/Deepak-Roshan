/** Plain-text excerpt for meta tags (strips common markdown patterns). */
export function markdownExcerpt(md: string, max = 160): string {
  const text = md
    .replace(/^#{1,6}\s+.*/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`{1,3}[^`]*`{1,3}/g, "")
    .replace(/\n+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}
