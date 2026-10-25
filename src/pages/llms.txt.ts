// src/pages/llms.txt.ts
// AI-search manifest (https://llmstxt.org), built from the `pages` collection so it
// lists exactly the pages that are published and can't drift from the sitemap.
import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { pageHref } from '../lib/pages';

type Page = CollectionEntry<'pages'>;
type Section = NonNullable<Page['data']['section']>;

// Typed against the schema's section enum, so a new section fails typecheck until it
// has a heading here. Headings print in the order they first appear.
const headings: Record<Section, string> = {
  guides: 'Guides',
  models: 'Financial Models',
  tools: 'Interactive Tools',
  docs: 'Compliance Documents',
  resources: 'Reference',
  about: 'Reference',
};
const headingOf = (p: Page) => (p.data.section ? headings[p.data.section] : 'Reference');

export const GET: APIRoute = async ({ site }) => {
  const pages = await getCollection('pages', ({ data }) => !data.draft);

  const sections = [...new Set(Object.values(headings))].map((heading) => {
    const lines = pages
      .filter((p) => headingOf(p) === heading)
      .sort((a, b) =>
        Number(b.data.template === 'section-index') - Number(a.data.template === 'section-index')
        || a.data.title.localeCompare(b.data.title))
      .map((p) => `- [${p.data.title}](${new URL(pageHref(p.id), site)}): ${p.data.description}`);
    return `## ${heading}\n\n${lines.join('\n')}`;
  });

  const body = `# Not a Fintech Company

> An open-source knowledge base for fintech founders. Tactical guides, financial models, compliance documents, and interactive calculators for launching card products, debit programs, lending businesses, and challenger banks. All content is CC0 1.0 (public domain); no attribution required.

${sections.join('\n\n')}

## License

CC0 1.0 Universal: https://creativecommons.org/publicdomain/zero/1.0/
No attribution required. Free to use, reproduce, and redistribute without restriction.

## Contact

hello@notafintech.co
`;

  // Static output keeps only the body; Cloudflare serves .txt as text/plain; charset=utf-8.
  return new Response(body);
};
