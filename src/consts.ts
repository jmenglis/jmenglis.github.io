// Centralized site metadata and social links.

export const SITE = {
  title: 'Josh English',
  tagline: 'Software engineer',
  description:
    'Josh English — full-stack software engineer at AWS. Writing about software, finance, and whatever else is on my mind.',
  author: 'Josh English',
  url: 'https://www.joshenglish.com',
  // Universal Analytics (UA-5317622-1) was retired in 2023. Re-add GA4 or a
  // privacy-friendly analytics snippet here if desired.
  // analyticsId: '',
} as const;

export type SocialLink = {
  name: string;
  href: string;
  /** Icon key matched in the Icon component. */
  icon: 'email' | 'twitter' | 'linkedin' | 'github' | 'rss';
};

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Email', href: 'mailto:josh@joshenglish.com', icon: 'email' },
  { name: 'GitHub', href: 'https://github.com/jmenglis', icon: 'github' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/joshenglish', icon: 'linkedin' },
  { name: 'Twitter', href: 'https://twitter.com/joshenglish', icon: 'twitter' },
  { name: 'RSS', href: '/feed.xml', icon: 'rss' },
];

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog/' },
  { name: 'About', href: '/about/' },
];
