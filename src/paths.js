export const siteBase = import.meta.env?.BASE_URL || (typeof process !== 'undefined' && process.env.SITE_BASE_PATH) || '/';
export const sitePath = path => `${siteBase.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export function withSiteBase(html) {
  return html.replace(/\b(href|src)="(\/[^"\s]*)"/g, (_,attribute,path) => `${attribute}="${sitePath(path)}"`)
    .replace(/srcset="([^"]*)"/g, (_,value) => `srcset="${value.split(',').map(candidate=>candidate.trim().replace(/^(\/\S+)/,path=>sitePath(path))).join(', ')}"`);
}
