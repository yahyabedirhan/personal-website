// Checks the build in dist/ after `astro build`: every page is its own HTML file with its content in it,
// so it reads with JavaScript off, and the files a static host needs beside the pages are there.
import { existsSync, readFileSync } from 'node:fs';
import { me, projects, kudos } from '../src/data.js';
import { OPT_STATE, optLabel } from '../src/opt.js';
import { absolute } from '../src/meta.js';

const dist = new URL('../dist/', import.meta.url);
// words each page's HTML must hold without running any script
const pages = {
  'index.html': [me.name, 'Projects', 'Previously', 'Featured in', ...projects.map(p => `href="/projects/${p.id}"`)],
  'about.html': ['What is collected', OPT_STATE.full, optLabel('full')],
  'kudos.html': [kudos.intro],
  '404.html': ['Not found'],
  ...Object.fromEntries(projects.map(p => [`projects/${p.id}.html`, [p.name, `<link rel="canonical" href="${absolute(`/projects/${p.id}`)}">`]])),
};
const problems = [];
for (const [page, words] of Object.entries(pages)) {
  const file = new URL(page, dist);
  if (!existsSync(file)) { problems.push(`dist has no ${page}`); continue; }
  const html = readFileSync(file, 'utf8');
  for (const w of words) if (!html.includes(w)) problems.push(`${page} has no "${w}" in its HTML`);
  if (!html.includes('data-astro-transition-persist="bg"')) problems.push(`${page} has no persistent background canvas`);
}
for (const need of ['robots.txt', 'sitemap.xml', '_redirects', 'favicon.png', 'og-icon.png']) {
  if (!existsSync(new URL(need, dist))) problems.push(`dist has no ${need}`);
}
if (problems.length) {
  console.error('the build is not as it must be:');
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log(`build checked: ${Object.keys(pages).length} pages`);
