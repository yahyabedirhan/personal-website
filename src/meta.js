// Each page's head: its title, description, canonical address and share image, from the content in data.js.
// src/layouts/Base.astro writes them, and src/pages/sitemap.xml.js lists the same paths.
import { me, projects, kudos } from './data.js';

export const SITE = 'https://yahyapak.dev';
export const absolute = path => new URL(path, SITE).href;

const LOGO = { image: '/og-icon.png', card: 'summary' };

export const home = {
  path: '/', title: me.name, ...LOGO,
  description: 'Yahya Bedirhan Pak, software engineer. Projects and previous work.',
  ogDescription: 'Software engineer. Projects and previous work.',
};
export const about = {
  path: '/about', title: `About · ${me.name}`, ...LOGO,
  description: 'About yahyapak.dev: the anonymous, cookieless stats it keeps, where they go and how to opt out.',
};
export const kudosPage = { path: '/kudos', title: `Kudos · ${me.name}`, ...LOGO, description: kudos.intro };
export const notFound = { path: null, title: `Not found · ${me.name}`, ...LOGO, description: 'There is no page at this address.' };

// a project shares its hero image, or else its logo
export const project = p => ({
  path: `/projects/${p.id}`, title: `${p.name} · ${me.name}`, description: p.about || p.line,
  image: p.hero?.src || p.icon || LOGO.image, card: p.hero ? 'summary_large_image' : 'summary',
});

// every page a search engine may list, for the sitemap
export const listed = [home, ...projects.map(project), about, kudosPage];
