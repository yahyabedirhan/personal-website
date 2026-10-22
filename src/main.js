// The site's one script, from src/layouts/Base.astro. It runs once per full page load and keeps working
// across the client router's page changes: the background, image zoom, the theme button, the opt-out
// button, analytics and error reporting. Each page's HTML is built by Astro; this only adds behaviour.
import './privacy.js';
import './errors.js';
import { createTopography } from 'topographic';
import { bgScenes } from './data.js';
import { initZoom } from './zoom.js';
import { pageview, optOut, optIn } from './analytics.js';
import { getMode } from './privacy.js';
import { OPT_STATE, optLabel } from './opt.js';

const root = document.documentElement;
const isLight = () => root.dataset.theme === 'light';
// The background: one topographic renderer for the whole site, blending between bgScenes.
// #bg persists across page changes (transition:persist), so this one renderer and its one WebGL
// context serve every page. Phones draw at 1x and 30 fps, desktop at up to 1.5x; the line count and
// the centre fade follow the width. The library pauses in a hidden tab and holds a still frame under
// reduced motion. The library sends lines.width as 0.5 + 3.5 * width and motion.warp as 1.5 * warp to its
// shader, so these values give the line width of 1.4 and the warp of 0.7 the background was designed with.
// The faded centre column is half the page width (576 / 2 + 24 gutter) plus 20px of margin: 332px.
const coarse = matchMedia('(pointer: coarse)').matches;
const ratio = () => (innerWidth < 600 || coarse ? 1 : 1.5);
const sized = () => ({
  lines: { count: innerWidth < 600 ? 36 : innerWidth < 1024 ? 30 : 24 },
  layout: { fade: 0.7 * (innerWidth < 720 ? 0.4 : 1) },
});
const topography = createTopography(document.getElementById('bg'), {
  scenes: bgScenes, scene: 0, column: 332, quality: 'full', theme: { mode: isLight() ? 'light' : 'dark' },
  lines: { width: 0.9 / 3.5 }, motion: { warp: 0.7 / 1.5 }, ...sized(),
}, { maxPixelRatio: ratio(), maxPixels: Infinity, maxFps: coarse ? 30 : 0 });
addEventListener('resize', () => { topography.setOptions({ maxPixelRatio: ratio() }); topography.update(sized()); });
// a new scene fades in; a theme change fades between light and dark, or jumps with instant
const bg = {
  setState: i => topography.update({ scene: i }),
  setDark: (d, instant) => topography.update({ theme: { mode: d ? 'dark' : 'light' } }, { instant }),
};
initZoom();
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

const touch = () => matchMedia('(pointer: coarse), (max-width: 599px)').matches;
const themeAria = () => (isLight() ? 'Switch to dark mode' : 'Switch to light mode');

// home: hovering or focusing a project row shows its background state on desktop;
// on touch, the row crossing the middle band of the screen drives the background
function watchRows(rows) {
  if (!touch()) {
    rows.forEach(li => { const on = () => bg.setState(+li.dataset.state), off = () => bg.setState(0);
      li.addEventListener('pointerenter', on); li.addEventListener('pointerleave', off);
      li.addEventListener('focusin', on); li.addEventListener('focusout', off); });
    return () => {};
  }
  const seen = new Set();
  const io = new IntersectionObserver(es => {
    es.forEach(e => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
    const act = rows.find(r => seen.has(r));
    rows.forEach(r => r.classList.toggle('active', r === act));
    bg.setState(act ? +act.dataset.state : 0);
  }, { rootMargin: '-42% 0px -42% 0px' });
  rows.forEach(r => io.observe(r));
  return () => io.disconnect();
}

// back on the home page, scroll to where it was left
function restoreHome() {
  if (location.pathname !== '/') return;
  let y = null;
  try { y = sessionStorage.getItem('home-y'); sessionStorage.removeItem('home-y'); } catch {}
  if (y) scrollTo(0, +y);
}

// the opt-out box on /about shows this browser's level
function showOpt() {
  const btn = document.querySelector('.optout'), st = document.querySelector('.opt-state');
  if (btn) btn.textContent = optLabel(getMode());
  if (st) st.textContent = OPT_STATE[getMode()];
}

// the page now showing: its background state (data-bg on #app), its buttons' text, one pageview
let dispose = () => {};
function showPage() {
  const app = document.getElementById('app');
  bg.setState(+app.dataset.bg || 0);
  const rows = [...app.querySelectorAll('.proj')];
  dispose = rows.length ? watchRows(rows) : () => {};
  app.querySelector('.theme')?.setAttribute('aria-label', themeAria());
  showOpt();
  pageview();
}

document.addEventListener('astro:before-preparation', e => {
  if (e.from.pathname === '/') try { sessionStorage.setItem('home-y', String(scrollY)); } catch {}
});
document.addEventListener('astro:before-swap', e => {
  dispose(); dispose = () => {};
  // the new page's HTML says dark; keep the theme this page shows
  e.newDocument.documentElement.dataset.theme = root.dataset.theme;
});
document.addEventListener('astro:after-swap', () => { restoreHome(); showPage(); });
showPage();
restoreHome();

document.addEventListener('click', e => {
  const theme = e.target.closest?.('.theme');
  if (theme) {
    const light = !isLight(); root.dataset.theme = light ? 'light' : 'dark';
    try { light ? localStorage.setItem('theme', 'light') : localStorage.removeItem('theme'); } catch {}
    bg.setDark(!light); theme.setAttribute('aria-label', themeAria());
  }
  if (e.target.closest?.('.optout')) { getMode() === 'full' ? optOut() : optIn(); showOpt(); }
});
