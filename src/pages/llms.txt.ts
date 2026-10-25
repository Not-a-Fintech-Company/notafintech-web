// src/pages/llms.txt.ts
// AI-search manifest (https://llmstxt.org), built from the `pages` collection so it
// lists exactly the pages that are published and can't drift from the sitemap.
import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

type Page = CollectionEntry<'pages'>;

const groups: { heading: string; match: (page: Page) => boolean }[] = [
  { heading: 'Guides', match: (p) => p.data.section === 'guides' },
  { heading: 'Financial Models', match: (p) => p.data.section === 'models' },
  { heading: 'Interactive Tools', match: (p) => p.data.section === 'tools' },
  { heading: 'Compliance Documents', match: (p) => p.data.section === 'docs' },
  { heading: 'Reference', match: () => true },
];

const slugOf = (page: Page) => page.id.replace(/\.(md|mdx)$/, '').replace(/(^|\/)index$/, '');
const isIndex = (page: Page) => page.data.template === 'section-index';

export const GET: APIRoute = async ({ site }) => {
  const pages = await getCollection('pages', ({ data }) => !data.draft);
  const remaining = new Set(pages);

  const sections = groups.map(({ heading, match }) => {
    const members = [...remaining]
      .filter(match)
      .sort((a, b) => Number(isIndex(b)) - Number(isIndex(a)) || a.data.title.localeCompare(b.data.title));
    members.forEach((p) => remaining.delete(p));
    const lines = members.map((p) => {
      const url = new URL(`/${slugOf(p)}/`.replace(/\/+$/, '/'), site);
      return `- [${p.data.title}](${url}): ${p.data.description}`;
    });
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

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
