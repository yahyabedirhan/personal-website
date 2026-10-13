// Image zoom for project pages: click, Enter or Space on a .zoom button enlarges its
// visible image from its on-page rect to fit the viewport (FLIP), and back again.
// On touch, the enlarged image pinches and pans, a double tap zooms in and out, a tap
// closes it when not zoomed in, and a swipe down closes it.
const EASE = 'cubic-bezier(.32,.72,0,1)';
const MS = 380, PAD = 24, CLOSE_AT = 96;
const TAP_MS = 300, SLOP = 8, DOUBLE_TAP_ZOOM = 2.5;
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

let open = null;

function fitRect(img) {
  const vw = innerWidth - PAD * 2, vh = innerHeight - PAD * 2;
  const s = Math.min(vw / img.naturalWidth, vh / img.naturalHeight, 1);
  const w = img.naturalWidth * s, h = img.naturalHeight * s;
  return { left: (innerWidth - w) / 2, top: (innerHeight - h) / 2, width: w, height: h };
}

// transform that maps the zoomed rect back onto the image's on-page rect
const toRect = (from, to) =>
  `translate(${from.left - to.left}px,${from.top - to.top}px) scale(${from.width / to.width},${from.height / to.height})`;

// zoom past the fitted size up to the image's full resolution, and at least 3x on small screens
const maxScale = () => Math.max(3, open.img.naturalWidth / open.end.width);

function place(img, end) {
  Object.assign(img.style, { left: end.left + 'px', top: end.top + 'px', width: end.width + 'px', height: end.height + 'px' });
}

// keep a zoomed image on screen: centred on an axis where it is smaller than the screen, edge to edge where larger
function clampView({ s, x, y }) {
  const { end } = open;
  const axis = (t, size, start, room) => size <= room ? (room - size) / 2 - start
    : Math.min(-start, Math.max(room - start - size, t));
  s = Math.min(Math.max(s, 1), maxScale());
  return { s, x: axis(x, end.width * s, end.left, innerWidth), y: axis(y, end.height * s, end.top, innerHeight) };
}

function show(view, animate) {
  open.view = view;
  open.img.style.transition = animate && !reduced() ? `transform ${MS}ms ${EASE}` : 'none';
  open.img.style.transform = `translate(${view.x}px,${view.y}px) scale(${view.s})`;
}

// scale to s around the screen point (px, py), moving that image point to (mx, my)
function zoomAt(base, s, px, py, mx = px, my = py) {
  const { end } = open;
  const qx = (px - end.left - base.x) / base.s, qy = (py - end.top - base.y) / base.s;
  return { s, x: mx - end.left - s * qx, y: my - end.top - s * qy };
}

function enlarge(button) {
  if (open) return;
  const src = [...button.querySelectorAll('img')].find(i => i.offsetParent);
  if (!src || !src.naturalWidth) return;
  const end = fitRect(src), start = src.getBoundingClientRect(), still = reduced();

  const layer = document.createElement('div');
  layer.className = 'zoom-layer';
  layer.setAttribute('role', 'dialog');
  layer.setAttribute('aria-modal', 'true');
  layer.setAttribute('aria-label', src.alt || 'Enlarged image');
  layer.tabIndex = -1;
  const img = new Image();
  img.src = src.currentSrc || src.src;
  img.alt = src.alt;
  img.className = 'zoom-img';
  img.draggable = false;
  place(img, end);
  if (!still) img.style.transform = toRect(start, end);
  const shut = document.createElement('button');
  shut.type = 'button';
  shut.className = 'zoom-close';
  shut.setAttribute('aria-label', 'Close');
  shut.textContent = '×';
  layer.append(img, shut);
  document.body.append(layer);
  document.documentElement.classList.add('is-zoomed');
  src.style.visibility = 'hidden';
  layer.getBoundingClientRect();
  layer.classList.add('is-open');
  if (!still) { img.style.transition = `transform ${MS}ms ${EASE}`; img.style.transform = 'none'; }
  layer.focus({ preventScroll: true });
  open = { button, src, layer, img, end, vw: innerWidth, view: { s: 1, x: 0, y: 0 }, pts: new Map(), lastType: '' };
  shut.addEventListener('click', e => { e.stopPropagation(); close(); });
  // a mouse click closes; a touch tap goes through the gesture handlers, which tell a tap from a double tap
  layer.addEventListener('click', () => { if (open && open.lastType !== 'touch') close(); });
  layer.addEventListener('pointerdown', down);
  layer.addEventListener('pointermove', move);
  layer.addEventListener('pointerup', up);
  layer.addEventListener('pointercancel', up);
  layer.addEventListener('gesturestart', e => e.preventDefault()); // Safari's own page pinch
}

function close() {
  if (!open || open.closing) return;
  open.closing = true;
  clearTimeout(open.tapTimer);
  const { button, src, layer, img, end } = open;
  layer.classList.remove('is-open');
  layer.style.removeProperty('--fade');
  const done = () => {
    src.style.visibility = '';
    layer.remove();
    document.documentElement.classList.remove('is-zoomed');
    if (button.isConnected) button.focus({ preventScroll: true });
    open = null;
  };
  if (!src.isConnected) return done();
  if (reduced()) return setTimeout(done, 200);
  img.style.transition = `transform ${MS}ms ${EASE}`;
  img.style.transform = toRect(src.getBoundingClientRect(), end);
  img.addEventListener('transitionend', done, { once: true });
  setTimeout(() => open && open.layer === layer && done(), MS + 80);
}

// ---- touch: one finger pans, or at 1x swipes down to close; two fingers pinch ----

// snapshot the view and the fingers, so each move is measured from the current set of fingers
function rebase() {
  const g = open, p = [...g.pts.values()];
  g.base = { ...g.view };
  g.p0 = p[0];
  if (p.length > 1) {
    g.m0 = { x: (p[0].x + p[1].x) / 2, y: (p[0].y + p[1].y) / 2 };
    g.d0 = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) || 1;
  }
}

function down(e) {
  if (!open || open.closing) return;
  open.lastType = e.pointerType;
  if (e.pointerType !== 'touch' || e.target.closest('.zoom-close')) return;
  const g = open;
  if (!g.pts.size) { g.moved = false; g.multi = false; g.swipe = 0; g.t0 = performance.now(); }
  g.pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
  try { g.layer.setPointerCapture(e.pointerId); } catch {}
  if (g.pts.size > 1) g.multi = true;
  g.img.style.transition = 'none';
  rebase();
}

function move(e) {
  const g = open;
  if (!g || g.closing || !g.pts.has(e.pointerId)) return;
  g.pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
  const p = [...g.pts.values()];
  if (Math.hypot(p[0].x - g.p0.x, p[0].y - g.p0.y) > SLOP) g.moved = true;
  if (p.length > 1) {
    const m = { x: (p[0].x + p[1].x) / 2, y: (p[0].y + p[1].y) / 2 };
    const d = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
    // a little past the limits while pinching; lifting the fingers springs back
    const s = Math.min(Math.max(g.base.s * d / g.d0, .8), maxScale() * 1.25);
    show(zoomAt(g.base, s, g.m0.x, g.m0.y, m.x, m.y));
  } else if (g.base.s > 1.01) {
    show({ s: g.base.s, x: g.base.x + p[0].x - g.p0.x, y: g.base.y + p[0].y - g.p0.y });
  } else if (!g.multi) {
    // the image follows the finger down and the backdrop fades
    g.swipe = Math.max(0, p[0].y - g.p0.y);
    g.img.style.transform = `translateY(${g.swipe}px) scale(${1 - Math.min(g.swipe / 2000, .15)})`;
    g.layer.style.setProperty('--fade', String(1 - Math.min(g.swipe / 400, .6)));
  }
}

function up(e) {
  const g = open;
  if (!g || g.closing || !g.pts.has(e.pointerId)) return;
  const last = g.pts.get(e.pointerId);
  g.pts.delete(e.pointerId);
  if (g.pts.size) return rebase();
  if (g.swipe) {
    g.layer.style.removeProperty('--fade');
    if (g.swipe > CLOSE_AT) return close();
    return show({ s: 1, x: 0, y: 0 }, true);
  }
  if (!g.moved && !g.multi && performance.now() - g.t0 < 500) return tap(last);
  show(clampView(g.view), true);
}

// a double tap zooms in on the spot, or back out; a single tap at 1x closes
function tap(pt) {
  const g = open, now = performance.now();
  if (g.lastTap && now - g.lastTap.t < TAP_MS && Math.hypot(pt.x - g.lastTap.x, pt.y - g.lastTap.y) < 40) {
    clearTimeout(g.tapTimer);
    g.lastTap = null;
    if (g.view.s > 1.01) return show({ s: 1, x: 0, y: 0 }, true);
    return show(clampView(zoomAt(g.view, Math.min(DOUBLE_TAP_ZOOM, maxScale()), pt.x, pt.y)), true);
  }
  g.lastTap = { ...pt, t: now };
  g.tapTimer = setTimeout(() => { if (open === g && g.view.s <= 1.01) close(); }, TAP_MS);
}

// turning the phone refits the image to the new screen; a height-only resize (the browser bar) keeps the view
function refit() {
  if (!open || open.closing || innerWidth === open.vw) return;
  open.vw = innerWidth;
  open.end = fitRect(open.img);
  place(open.img, open.end);
  show({ s: 1, x: 0, y: 0 });
}

export function initZoom() {
  document.addEventListener('click', e => {
    const b = e.target.closest('button.zoom');
    if (b) enlarge(b);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  addEventListener('popstate', () => open && close());
  addEventListener('resize', refit);
}
