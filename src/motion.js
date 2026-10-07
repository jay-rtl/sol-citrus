import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sitePath } from './paths.js';
gsap.registerPlugin(ScrollTrigger);
export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export function initMotion(root) {
  const media = gsap.matchMedia();
  let intro;
  media.add('(prefers-reduced-motion: no-preference)', () => {
    const ctx = gsap.context(() => {
      let showIntro = false;
      try { showIntro = !sessionStorage.getItem('sol-intro'); sessionStorage.setItem('sol-intro', 'seen'); } catch { /* Storage is optional. */ }
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      if (showIntro) {
        intro = document.createElement('div');
        intro.className = 'intro-overlay'; intro.setAttribute('aria-hidden', 'true');
        intro.innerHTML = `<img src="${sitePath('/assets/logo.webp')}" alt="" /><p>MIAMI & SOUTH FLORIDA</p>`;
        document.body.append(intro);
        timeline.from(intro.children, { opacity: 0, y: 12, scale: .97, stagger: .12, duration: .6 })
          .to(intro, { yPercent: -100, duration: .8, ease: 'power3.inOut', onComplete: () => intro?.remove() }, .75);
      }
      const start = showIntro ? 1 : 0;
      timeline.from('.header', { opacity: 0, y: -12, duration: .7 }, start)
        .from(root.querySelectorAll('h1 .line>span'), { yPercent: 110, stagger: .13, duration: .9 }, start + .12)
        .from(root.querySelectorAll('.hero .eyebrow,.hero-description,.hero-actions,.hero-bottom,.page-intro>p,.page-intro>.button'), { opacity: 0, y: 15, stagger: .09, duration: .7 }, start + .2);
      const heroImage = root.querySelector('.hero-media img');
      if (heroImage && window.matchMedia('(min-width: 1024px)').matches) timeline.from(heroImage, { scale: 1.045, duration: 1.7 }, start);
      root.querySelectorAll('[data-reveal]').forEach((el, index) => {
        if (el.closest('.hero') || el.tagName === 'H1') return;
        const trigger = { trigger: el, start: 'top 92%', once: true };
        if (el.dataset.reveal === 'lines') gsap.from(el.querySelectorAll('.line>span'), { yPercent: 110, duration: .85, stagger: .12, ease: 'power3.out', scrollTrigger: trigger });
        else if (el.dataset.reveal === 'image') {
          gsap.from(el, { clipPath: index % 2 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)', duration: 1.05, ease: 'power3.inOut', scrollTrigger: trigger });
          gsap.from(el.querySelector('img'), { scale: 1.04, duration: 1.4, ease: 'power2.out', scrollTrigger: trigger });
        } else gsap.from(el, { opacity: 0, y: 18, duration: .75, scrollTrigger: trigger });
      });
    }, root);
    return () => { ctx.revert(); intro?.remove(); };
  });
  media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
    const image = root.querySelector('.hero-media img');
    if (image) gsap.to(image, { yPercent: 3, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
  });
  document.fonts.ready.then(() => ScrollTrigger.refresh());
  return () => media.revert();
}
