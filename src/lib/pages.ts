// URL helpers for entries in the `pages` content collection. The router, nav, and
// llms.txt all derive routes here so they can't disagree. (astro.config.mjs keeps its
// own copy for sitemap lastmod, since config can't import TypeScript from src/.)

/** Route slug for a collection entry id: "guides/index.md" → "guides", "about.md" → "about". */
export function pageSlug(id: string): string {
  return id.replace(/\.(md|mdx)$/, '').replace(/(^|\/)index$/, '');
}

/** Root-relative URL with a trailing slash: "guides/foo.md" → "/guides/foo/". */
export function pageHref(id: string): string {
  const slug = pageSlug(id);
  return slug ? `/${slug}/` : '/';
}
