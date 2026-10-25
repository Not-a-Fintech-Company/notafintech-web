// Article JSON-LD shared by the article and model layouts. Pages without named
// authors credit the site Organization, so every dated page carries an author.

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
  publishedAt: Date;
  updatedAt?: Date;
  authors?: Author[];
}

export function articleSchema(input: ArticleSchemaInput) {
  const { title, description, site, pathname, ogImage = '/og-image.png', publishedAt, updatedAt, authors } = input;
  const siteUrl = site.toString().replace(/\/$/, '');
  const canonicalUrl = new URL(pathname, site).toString();
  const author = authors && authors.length > 0
    ? authors.map((a) => ({ '@type': 'Person', name: a.name, ...(a.url ? { url: a.url } : {}) }))
    : { '@id': `${siteUrl}/#organization` };

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
    publisher: { '@id': `${siteUrl}/#organization` },
    isPartOf: { '@id': `${siteUrl}/#website` },
    mainEntityOfPage: canonicalUrl,
    inLanguage: 'en-US',
    license: 'https://creativecommons.org/publicdomain/zero/1.0/',
  };
}
