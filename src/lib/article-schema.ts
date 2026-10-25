// Article JSON-LD shared by the article and model layouts. Undated pages get none;
// pages without named authors credit the site Organization.

export interface Author {
  name: string;
  url?: string;
}

export interface ArticleSchemaInput {
  title: string;
  description: string;
  site: URL;
  pathname: string;
  ogImage?: string;
  publishedAt?: Date;
  updatedAt?: Date;
  authors?: Author[];
}

export function articleSchema(input: ArticleSchemaInput) {
  const { title, description, site, pathname, ogImage = '/og-image.png', publishedAt, updatedAt, authors } = input;
  if (!publishedAt) return undefined;
  const id = (fragment: string) => ({ '@id': new URL(`/#${fragment}`, site).toString() });
  const canonicalUrl = new URL(pathname, site).toString();
  // JSON.stringify drops an undefined url, so no conditional spread is needed.
  const author = authors && authors.length > 0
    ? authors.map((a) => ({ '@type': 'Person', name: a.name, url: a.url }))
    : id('organization');

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: canonicalUrl,
    image: ogImage.startsWith('http') ? ogImage : new URL(ogImage, site).toString(),
    datePublished: publishedAt.toISOString(),
    dateModified: (updatedAt ?? publishedAt).toISOString(),
    author,
    publisher: id('organization'),
    isPartOf: id('website'),
    mainEntityOfPage: canonicalUrl,
    inLanguage: 'en-US',
    license: 'https://creativecommons.org/publicdomain/zero/1.0/',
  };
}
