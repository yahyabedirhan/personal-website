// /sitemap.xml: every page of the site, built from src/meta.js.
import { absolute, listed } from '../meta.js';

export function GET() {
  const urls = listed.map(p => `  <url><loc>${absolute(p.path)}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
}
