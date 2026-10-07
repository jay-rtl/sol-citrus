import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { header, footer } from '../src/components.js';
import { home, menuPage, contactPage } from '../src/pages.js';
import { withSiteBase } from '../src/paths.js';
const template = await readFile('dist/index.html', 'utf8');
const pages = [
  ['home', '', home, 'Sol & Citrus | Premium Mobile Beverage Experiences in Miami', 'Handcrafted lemonades, specialty coffee, and signature beverages for weddings, private celebrations, and events across Miami & South Florida.'],
  ['menu', 'menu', menuPage, 'Event Beverage Menu for Miami Events | Sol & Citrus', 'Discover signature handcrafted lemonades, Lavazza specialty coffee, and Art of Tea ceremonial matcha. Personalized beverage menus for Miami & South Florida events.'],
  ['contact', 'contact', contactPage, 'Contact & Pricing | Sol & Citrus Beverage Catering South Florida', 'Book a personalized mobile beverage experience for your Miami & South Florida event. Starting at $150 per hour, with a three-hour minimum booking.']
];
for (const [page, path, render, title, description] of pages) {
  const url = `https://www.sol-and-citrus.com/${path}`;
  let html = template.replace('<div id="app"></div>', `<div id="app" data-page="${page}">${withSiteBase(`${header(page)}<main id="main">${render()}</main>${footer()}`)}</div>`)
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${description}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${title}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${description}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`);
  if (page !== 'home') html = html.replace(/<link rel="preload"[^>]+>/, '');
  await mkdir(`dist/${path}`, { recursive: true });
  await writeFile(`dist/${path ? `${path}/` : ''}index.html`, html);
  console.log(`Prerendered /${path}`);
}
