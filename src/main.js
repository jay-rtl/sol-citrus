import './fonts.css';
import './styles.css';
import { header, footer } from './components.js';
import { home, menuPage, contactPage } from './pages.js';
import { initMotion } from './motion.js';
import { initNavigation } from './navigation.js';
import { siteBase, withSiteBase } from './paths.js';
import { initBooking } from './booking.js';
import { legalPages, legalPage } from './legal.js';
const localPath = window.location.pathname.startsWith(siteBase) ? `/${window.location.pathname.slice(siteBase.length)}` : window.location.pathname;
const path = localPath.replace(/\/$/, '') || '/';
const legal = legalPages[path.slice(1)];
const page = legal ? path.slice(1) : path === '/menu' ? 'menu' : path === '/contact' ? 'contact' : 'home';
const content = { home, menu: menuPage, contact: contactPage, ...(legal?{[page]:()=>legalPage(page)}:{}) };
const app = document.querySelector('#app');
if (app.dataset.page !== page) {
  app.innerHTML = withSiteBase(`${header(page)}<main id="main">${content[page]()}</main>${footer()}`);
  app.dataset.page = page;
}
const metadata = {
  home: ['Sol & Citrus | Premium Mobile Beverage Experiences in Miami', 'Handcrafted lemonades, specialty coffee, and signature beverages for weddings, private celebrations, and events across Miami & South Florida.'],
  menu: ['Event Beverage Menu for Miami Events | Sol & Citrus', 'Discover signature handcrafted lemonades, Lavazza specialty coffee, and Art of Tea ceremonial matcha. Personalized beverage menus for Miami & South Florida events.'],
  contact: ['Contact & Pricing | Sol & Citrus Beverage Catering South Florida', 'Book a personalized mobile beverage experience for your Miami & South Florida event. Starting at $150 per hour, with a three-hour minimum booking.']
};
if(legal) metadata[page] = [`${legal.title} | Sol & Citrus`, `${legal.title} for Sol & Citrus, operated by SC HOSPITALITY LLC.`];
document.title = metadata[page][0];
document.querySelector('meta[name="description"]').content = metadata[page][1];
document.querySelector('meta[property="og:title"]').content = metadata[page][0];
document.querySelector('meta[property="og:description"]').content = metadata[page][1];
const canonical = `https://www.sol-and-citrus.com${page === 'home' ? '/' : `/${page}`}`;
document.querySelector('link[rel="canonical"]').href = canonical;
document.querySelector('meta[property="og:url"]').content = canonical;
const cleanupNavigation = initNavigation();
const cleanupMotion = initMotion(document.querySelector('#app'));
const cleanupBooking = initBooking();
if (import.meta.hot) import.meta.hot.dispose(() => { cleanupNavigation(); cleanupMotion(); cleanupBooking(); });
