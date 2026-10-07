import gsap from 'gsap';
import { reducedMotion } from './motion.js';
export function initNavigation() {
  const toggle = document.querySelector('.menu-toggle');
  const dialog = document.querySelector('#mobile-menu');
  const close = document.querySelector('.menu-close');
  const header = document.querySelector('.header');
  const closeMenu = () => { dialog.close(); };
  toggle.addEventListener('click', () => {
    dialog.showModal(); document.body.classList.add('menu-open'); toggle.setAttribute('aria-expanded', 'true');
    if (!reducedMotion()) gsap.fromTo(dialog.querySelectorAll('nav a,.button,.mobile-contact'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: .07, duration: .5, clearProps: 'all' });
  });
  close.addEventListener('click', closeMenu);
  dialog.addEventListener('close', () => { document.body.classList.remove('menu-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); });
  dialog.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const onResize = () => { if (window.innerWidth > 767 && dialog.open) closeMenu(); };
  window.addEventListener('resize', onResize);
  return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); };
}
