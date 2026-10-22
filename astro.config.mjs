// Astro renders every page to its own HTML file at build time, from the content in src/data.js.
// The client router in src/layouts/Base.astro then moves between pages without a full load,
// so the background keeps running across page changes.
import { defineConfig } from 'astro/config';
import { SITE } from './src/meta.js';

export default defineConfig({
  site: SITE,
  output: 'static',
  // about.html and projects/<id>.html, which the Worker's assets serve at /about and /projects/<id>, the URLs the site always had
  build: { format: 'file' },
  trailingSlash: 'never',
  // a link to another page of the site loads its HTML when the pointer rests on it
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  devToolbar: { enabled: false },
  // the analytics keys keep their names, VITE_POSTHOG_KEY and VITE_SENTRY_DSN
  vite: { envPrefix: ['VITE_'] },
});
