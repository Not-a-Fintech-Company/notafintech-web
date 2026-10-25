// URL helpers for entries in the `pages` content collection. The router, nav, and
// llms.txt all derive routes here so they can't disagree. astro.config.mjs keeps an
// equivalent copy for sitemap lastmod, since config can't import TypeScript from src/;
// change both together.

/** Route slug for a collection entry id: "guides/index" → "guides", "about" → "about". */
export function pageSlug(id: string): string {
  return id.replace(/\.(md|mdx)$/, '').replace(/\/index$/, '');
}

/** Root-relative URL with a trailing slash: "guides/foo" → "/guides/foo/". */
export function pageHref(id: string): string {
  return `/${pageSlug(id)}/`;
}
