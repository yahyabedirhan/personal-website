// Inline markup in data.js text, as HTML: [label](https://…) becomes a link that opens in a new tab,
// and `code` becomes <code>. Everything else is escaped.
import { esc } from './icons.js';

export const code = html => html.replace(/`([^`]+)`/g, '<code>$1</code>');
export const linked = t => esc(t).replace(/\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g, '<a data-section="inline" href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
