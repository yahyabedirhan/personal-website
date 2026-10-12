// Topography's architecture, redrawn from docs/low-level-design.md in the site's own style.
// Colours come from the theme variables, so it follows the theme switch.
const box = (x, y, w, h, title, sub, strong) => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" class="${strong ? 'td-box is-strong' : 'td-box'}"/>
  <text x="${x + 14}" y="${y + 24}" class="td-title">${title}</text>
  <text x="${x + 14}" y="${y + 42}" class="td-sub">${sub}</text>`;
const arrow = (x1, y1, x2, y2) => `<path d="M${x1} ${y1} L${x2} ${y2}" class="td-line" marker-end="url(#td-head)"/>`;
const step = (x, label) => `<rect x="${x}" y="72" width="104" height="30" rx="7" class="td-step"/><text x="${x + 52}" y="91" class="td-step-t">${label}</text>`;

export const topoDiagram = `<svg viewBox="0 0 512 352" xmlns="http://www.w3.org/2000/svg" class="td">
  <defs><marker id="td-head" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L8 4 L0 8 z" class="td-head"/></marker></defs>
  ${box(0, 0, 512, 120, 'core', '@yahyapak/topography · no framework', true)}
  ${step(14, 'settings')}${arrow(118, 87, 136, 87)}
  ${step(138, 'renderer')}${arrow(242, 87, 260, 87)}
  ${step(262, 'shader')}${arrow(366, 87, 384, 87)}
  ${step(386, 'frame')}
  ${arrow(128, 120, 128, 150)}${arrow(384, 120, 384, 150)}
  ${box(0, 152, 248, 64, '&lt;topography-bg&gt;', 'web component, attributes')}
  ${box(264, 152, 248, 64, '&lt;Topography&gt;', 'React wrapper, props')}
  ${arrow(384, 216, 384, 246)}
  ${box(0, 248, 512, 64, 'generator', 'tune, then export HTML, JSX, config or PNG')}
  <text x="0" y="340" class="td-sub">people use the panel; agents use WebMCP and llms.txt</text>
</svg>`;
