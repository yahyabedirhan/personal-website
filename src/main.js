import './style.css';
import { createBackground } from './bg.js';
import { me, projects, previously, press, links, kudos } from './data.js';
import { icons, esc } from './icons.js';
import { initZoom } from './zoom.js';

const app = document.getElementById('app');
const bg = createBackground(document.getElementById('bg'));
initZoom();
const root = document.documentElement;
const isLight = () => root.dataset.theme === 'light';
bg.setDark(!isLight(), true);

const touch = () => matchMedia('(pointer: coarse), (max-width: 599px)').matches;
let dispose = () => {};

// ---- routing: /, /projects/:id, /kudos ----
function go(path) { if (location.pathname === '/' ) sessionStorage.setItem('home-y', scrollY); history.pushState(null, '', path); render(); }
addEventListener('popstate', render);
document.addEventListener('click', e => {
  const a = e.target.closest('a[data-nav]'); if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
  e.preventDefault(); go(a.getAttribute('href'));
});

const themeIcon = () => (isLight() ? icons.moon : icons.sun);
const themeAria = () => (isLight() ? 'Switch to dark mode' : 'Switch to light mode');
const socials = () => `<nav class="socials" aria-label="Elsewhere">${links.map(l => `<a class="glass" href="${l.href}" target="_blank" rel="noopener noreferrer" aria-label="${l.label}">${icons[l.id]}</a>`).join('')}</nav>`;
const footer = () => `<footer class="foot"><a class="foot-link" href="/kudos" data-nav>Kudos</a>
  <button class="theme" aria-label="${themeAria()}">${themeIcon()}</button></footer>`;

function home() {
  app.innerHTML = `<main class="wrap">
    <header class="head"><h1>${esc(me.name)}</h1><p>${esc(me.title)}</p></header>
    ${socials()}
    <section><h2>Projects</h2><ul class="rows">${projects.map(p => `<li class="proj" data-state="${p.state}">
      <a class="row glass" href="/projects/${p.id}" data-nav><span class="pn">${esc(p.name)}</span><span class="pl">${esc(p.line)}</span><span class="pa" aria-hidden="true">→</span></a></li>`).join('')}</ul></section>
    <section><h2>Previously</h2><ul class="rows">${previously.map(e => `<li><a class="row glass" href="${e.href}" target="_blank" rel="noopener noreferrer"><span class="pn">${esc(e.name)}</span><span class="pl">${esc(e.role)}</span><span class="pa" aria-hidden="true">↗</span></a></li>`).join('')}</ul></section>
    <section><h2>Featured in</h2><ul class="rows press">${press.map(p => `<li><a class="row glass" href="${p.href}" target="_blank" rel="noopener noreferrer" title="${esc(p.title)}" aria-label="${esc(`${p.label}, in ${p.outlet}: ${p.title}`)}"><span class="pn">${esc(p.outlet)}</span><span class="pl">${esc(p.label)}</span><span class="pa" aria-hidden="true">↗</span></a></li>`).join('')}</ul></section>
    ${footer()}
  </main>`;
  const rows = [...app.querySelectorAll('.proj')];
  bg.setState(0);
  if (!touch()) {
    rows.forEach(li => { const on = () => bg.setState(+li.dataset.state), off = () => bg.setState(0);
      li.addEventListener('pointerenter', on); li.addEventListener('pointerleave', off);
      li.addEventListener('focusin', on); li.addEventListener('focusout', off); });
    return () => {};
  }
  // touch: the row crossing the middle band of the screen drives the background
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

function project(id) {
  const i = projects.findIndex(p => p.id === id);
  if (i < 0) return notFound();
  const p = projects[i], next = projects[(i + 1) % projects.length];
  document.title = `${p.name} · ${me.name}`;
  app.innerHTML = `<main class="wrap">
    <a class="back" href="/" data-nav>← Index</a>
    <header class="pj-head">${p.icon ? `<img class="pj-icon" src="${p.icon}"${p.icon2x ? ` srcset="${p.icon} 1x, ${p.icon2x} 2x"` : ''} alt="${esc(p.iconAlt || '')}" width="128" height="128">` : ''}<div class="pj-title"><h1>${esc(p.name)}</h1>
      <a class="pj-repo" href="${p.repo}" target="_blank" rel="noopener noreferrer">${icons.github}<span>${p.repo.replace('https://', '')}</span></a></div></header>
    ${p.about ? `<p class="pj-about">${esc(p.about).replace(/`([^`]+)`/g, '<code>$1</code>')}</p>` : `<p class="pj-about is-placeholder">Description coming soon. [Yahya to fill]</p>`}
    ${p.links ? `<nav class="pj-links" aria-label="Links">${p.links.map(l => `<a href="${l.href}" target="_blank" rel="noopener noreferrer">${esc(l.label)} ↗</a>`).join('')}</nav>` : ''}
    ${p.hero ? `<figure class="hero"><button class="zoom" type="button" aria-label="Enlarge image">${img(p.hero, 'eager')}</button></figure>` : ''}
    ${p.details ? p.details.split('\n\n').map(d => `<p class="pj-about pj-details">${linked(d).replace(/`([^`]+)`/g, '<code>$1</code>')}</p>`).join('') : ''}
    ${(p.viewsFirst ? [shots, figures] : [figures, shots]).map(f => f(p)).join('')}
    <a class="next" href="/projects/${next.id}" data-nav><span>Next</span>${esc(next.name)} →</a>
  </main>`;
  bg.setState(p.state); scrollTo(0, 0);
  return () => {};
}

function kudosPage() {
  document.title = `Kudos · ${me.name}`;
  const host = u => u.replace(/^https?:\/\//, '');
  app.innerHTML = `<main class="wrap">
    <a class="back" href="/" data-nav>← Index</a>
    <h1 class="title">Kudos</h1><p class="meta">${esc(kudos.intro)}</p>
    <ul class="kudos">${kudos.people.map(k => `<li><span>${esc(k.name)}</span><a href="${k.site}" target="_blank" rel="noreferrer">${host(k.site)}</a><a href="${k.x}" target="_blank" rel="noreferrer">@${k.x.split('/').pop()}</a></li>`).join('')}</ul>
  </main>`;
  bg.setState(5); scrollTo(0, 0); return () => {};
}

// a project's diagrams (or a placeholder) and its screenshot sections; viewsFirst puts screenshots before diagrams
const figures = p => p.diagrams ? p.diagrams.map(diagram).join('')
  : `<figure class="slot" style="aspect-ratio:16/10"><span>Screenshot placeholder</span></figure>`;
const shots = p => p.views ? views(p) : '';
// escaped text with [label](https://…) links
const linked = t => esc(t).replace(/\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

// each screenshot exists in dark and light; CSS shows the one matching [data-theme]
const diagram = d => `${d.title ? `<h3 class="diagram-title">${esc(d.title)}</h3>` : ''}<figure class="diagram${d.raw ? ' is-raw' : ''}"><button class="zoom" type="button" aria-label="Enlarge image"><img src="${d.src}" width="${d.width}" height="${d.height}" alt="${esc(d.alt)}" loading="lazy" decoding="async"></button><figcaption>${linked(d.caption)}</figcaption></figure>`;
const img = (s, load = 'lazy') => `<img src="${s.src}" width="${s.width}" height="${s.height}" alt="${esc(s.alt)}" loading="${load}" decoding="async">`;
// a shot is either one image (src) or a dark/light pair (name)
const shot = (s, id) => s.src ? img(s) : ['dark', 'light'].map(t => `<img class="shot-${t}" src="/${id}/${s.name}-${t}.png" width="${s.width}" height="${s.height}" alt="${esc(s.alt)}" loading="lazy" decoding="async">`).join('');
const views = (p) => `<section class="views"><h2>${esc(p.views.title)}</h2>${p.views.groups.map(g =>
  `${g.head ? `<h3>${linked(g.head)}</h3>` : ''}${g.text ? `<p>${linked(g.text)}</p>` : ''}<div class="shots n${g.shots.length}${g.wide ? ' is-wide' : ''}">${g.shots.map(s => `<figure class="shot"><button class="zoom" type="button" aria-label="Enlarge image">${shot(s, p.id)}</button></figure>`).join('')}</div>`).join('')}</section>`;

function notFound() {
  app.innerHTML = `<main class="wrap"><a class="back" href="/" data-nav>← Index</a><h1 class="title">Not found</h1></main>`;
  bg.setState(0); return () => {};
}

function render() {
  dispose();
  const path = location.pathname.replace(/\/+$/, '') || '/';
  const m = path.match(/^\/projects\/([\w-]+)$/);
  document.title = me.name;
  dispose = path === '/' ? home() : m ? project(m[1]) : path === '/kudos' ? kudosPage() : notFound();
  if (path === '/') { const y = sessionStorage.getItem('home-y'); if (y) { scrollTo(0, +y); sessionStorage.removeItem('home-y'); } else scrollTo(0, 0); }
  app.querySelector('.theme')?.addEventListener('click', e => {
    const light = !isLight(); root.dataset.theme = light ? 'light' : 'dark';
    try { light ? localStorage.setItem('theme', 'light') : localStorage.removeItem('theme'); } catch {}
    bg.setDark(!light); e.currentTarget.innerHTML = themeIcon(); e.currentTarget.setAttribute('aria-label', themeAria());
  });
}
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
render();
