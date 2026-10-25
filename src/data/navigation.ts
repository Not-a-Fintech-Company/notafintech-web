export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const repoUrl = 'https://github.com/Not-a-Fintech-Company/notafintech-web';

export const topNav: NavItem[] = [
  { label: 'Guides', href: '/guides/' },
  { label: 'Models', href: '/models/' },
  { label: 'Tools', href: '/tools/' },
  { label: 'Docs', href: '/docs/' },
  { label: 'Resources', href: '/resources/' },
  { label: 'About', href: '/about/' },
];

export const footerSections: NavItem[] = [...topNav];

export const footerCommunity: NavItem[] = [
  { label: 'GitHub', href: repoUrl, external: true },
  { label: 'Contribute', href: `${repoUrl}/blob/main/README.md`, external: true },
  { label: 'hello@notafintech.co', href: 'mailto:hello@notafintech.co' },
];
