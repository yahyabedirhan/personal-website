import { copyFileSync } from 'node:fs';
// Static hosts without rewrites (e.g. GitHub Pages) serve 404.html for unknown paths; make it the app shell.
const spaFallback = { name: 'spa-fallback', closeBundle() { copyFileSync('dist/index.html', 'dist/404.html'); } };
export default { plugins: [spaFallback] };
