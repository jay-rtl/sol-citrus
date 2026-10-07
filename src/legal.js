import { legalPages } from './legal-content.js';
import { label, heading } from './components.js';
export { legalPages };
const escape = text => text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function legalPage(path) {
  const page=legalPages[path];
  return `<section class="legal-page section">${label('Sol & Citrus / SC Hospitality LLC')}${heading([page.title],'h1')}<div class="legal-content">${page.content.map(item=>item.heading?`<h2>${escape(item.text)}</h2>`:`<p>${escape(item.text)}</p>`).join('')}</div></section>`;
}
