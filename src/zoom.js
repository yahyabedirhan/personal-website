// Image zoom for project pages: click, Enter or Space on a .zoom button enlarges its
// visible image from its on-page rect to fit the viewport (FLIP), and back again.
const EASE = 'cubic-bezier(.32,.72,0,1)';
const MS = 380, PAD = 24, CLOSE_AT = 96;
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
  Object.assign(img.style, { left: end.left + 'px', top: end.top + 'px', width: end.width + 'px', height: end.height + 'px' });
  if (!still) img.style.transform = toRect(start, end);
  layer.append(img);
  document.body.append(layer);
  document.documentElement.classList.add('is-zoomed');
  src.style.visibility = 'hidden';
  layer.getBoundingClientRect();
  layer.classList.add('is-open');
  if (!still) { img.style.transition = `transform ${MS}ms ${EASE}`; img.style.transform = 'none'; }
  layer.focus({ preventScroll: true });
  open = { button, src, layer, img, end };
  layer.addEventListener('click', close);
  layer.addEventListener('pointerdown', drag);
}

function close() {
  if (!open || open.closing) return;
  open.closing = true;
  const { button, src, layer, img, end } = open;
  layer.classList.remove('is-open');
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

// swipe down on touch: the image follows the finger, past CLOSE_AT it closes, else springs back
function drag(e) {
  if (e.pointerType !== 'touch' || !open) return;
  const { layer, img } = open, y0 = e.clientY;
  let dy = 0;
  img.style.transition = 'none';
  const move = ev => {
    dy = Math.max(0, ev.clientY - y0);
    img.style.transform = `translateY(${dy}px) scale(${1 - Math.min(dy / 2000, .15)})`;
    layer.style.setProperty('--fade', String(1 - Math.min(dy / 400, .6)));
  };
  const up = () => {
    removeEventListener('pointermove', move);
    removeEventListener('pointerup', up);
    removeEventListener('pointercancel', up);
    layer.style.removeProperty('--fade');
    if (dy > CLOSE_AT) return close();
    img.style.transition = `transform ${MS}ms ${EASE}`;
    img.style.transform = 'none';
  };
  addEventListener('pointermove', move);
  addEventListener('pointerup', up);
  addEventListener('pointercancel', up);
  // a drag is not a tap: keep the click from closing unless the finger barely moved
  layer.addEventListener('click', ev => { if (dy > 6) ev.stopImmediatePropagation(); }, { once: true, capture: true });
}

export function initZoom() {
  document.addEventListener('click', e => {
    const b = e.target.closest('button.zoom');
    if (b) enlarge(b);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  addEventListener('popstate', () => open && close());
}
