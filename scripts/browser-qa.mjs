import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-proxy-server'] });
const base = (process.env.QA_URL || 'http://127.0.0.1:5173').replace(/\/$/,'');
const context = await browser.newContext({ reducedMotion: 'reduce' });
const page = await context.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
await mkdir('qa', { recursive: true });
for (const path of ['/', '/menu', '/contact']) {
  for (const width of [320,375,390,430,768,1024,1280,1440,1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
    const expected = { '/':'Premium mobile', '/menu':'Every occasion.', '/contact':'Let’s create your' };
    assert.ok((await page.locator('h1').textContent()).includes(expected[path]), `Correct page content for ${path}`);
    if (base.includes('4173')) {
      const source = await (await context.request.get(`${base}${path}`)).text();
      assert.ok(source.includes(`data-page="${path === '/' ? 'home' : path.slice(1)}"`), `Correct served prerendered route ${path}`);
    }
    await page.evaluate(async () => {
      for (const img of document.images) { img.loading = 'eager'; }
      await Promise.all([...document.images].map(img => img.decode().catch(() => {})));
    });
    const findings = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      images: [...document.images].filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src),
      headings: document.querySelectorAll('h1').length,
      intro: !!document.querySelector('.intro-overlay')
    }));
    assert.equal(findings.overflow, false, `${path} overflow at ${width}px`);
    assert.deepEqual(findings.images, [], `${path} broken images at ${width}px`);
    assert.equal(findings.headings, 1);
    assert.equal(findings.intro, false, 'Reduced motion must skip the intro');
    if (width === 390 || width === 1440) await page.screenshot({ path: `qa/${path === '/' ? 'home' : path.slice(1)}-${width}.png`, fullPage: true });
  }
  console.log(`PASS ${path}: all nine requested widths, images, headings, reduced motion`);
}
await page.setViewportSize({ width:390,height:844 });
await page.goto(`${base}/`);
await page.getByRole('button', { name:'Open navigation' }).click();
assert.equal(await page.locator('#mobile-menu').evaluate(el => el.open), true);
assert.equal(await page.locator('body').evaluate(el => getComputedStyle(el).overflow), 'hidden');
await page.keyboard.press('Escape');
assert.equal(await page.locator('#mobile-menu').evaluate(el => el.open), false);
assert.equal(await page.locator('.menu-toggle').evaluate(el => document.activeElement === el), true);
await page.getByRole('button', { name:'Open navigation' }).click();
await page.getByRole('navigation', { name:'Mobile navigation', exact:true }).getByRole('link', { name:'Menu', exact:false }).click();
await page.waitForURL(url => /\/menu\/?$/.test(url.pathname));
await page.goBack();
assert.equal(new URL(page.url()).pathname, new URL(`${base.replace(/\/$/,'')}/`).pathname);
console.log('PASS mobile menu: open, scroll lock, Escape, focus restoration, navigation and browser back');
await page.goto(`${base}/contact`);
assert.equal(await page.locator('#booking-form').count(),1);
assert.equal(await page.locator('a[href^="https://www.sol-and-citrus.com"]').count(),0);
await page.getByLabel('Full name', {exact:false}).fill('Website QA');
await page.getByLabel('Email address', {exact:false}).fill('qa@example.com');
await page.getByLabel('Phone number', {exact:false}).fill('3054500711');
await page.getByLabel('Event date', {exact:false}).fill('2030-10-10');
await page.getByLabel('Event location', {exact:false}).fill('Miami');
await page.getByLabel('Event type', {exact:false}).selectOption('Wedding');
await page.getByLabel('Coffee', {exact:true}).check();
await page.getByRole('button',{name:'Prepare email inquiry'}).click();
const emailHref=await page.getByRole('link',{name:'Open email app'}).getAttribute('href');
assert.ok(emailHref.startsWith('mailto:sc.hospitality.usa@gmail.com?'));
assert.ok(decodeURIComponent(emailHref).includes('Event type: Wedding'));
assert.ok(decodeURIComponent(emailHref).includes('Beverage services: Coffee'));
assert.match(await page.locator('#booking-status').textContent(),/Nothing has been sent yet/);
await page.getByLabel('Full name', {exact:false}).fill('Changed details');
assert.equal(await page.locator('#inquiry-result').isVisible(),false);
console.log('PASS local booking form, email draft, unsent state, change invalidation, and no old-site navigation');
for(const path of ['privacy-policy','terms-of-service','accessibility-statement']) {
  await page.goto(`${base}/${path}/`);
  assert.equal(await page.locator('.legal-content').count(),1);
  assert.equal(await page.locator('a[href^="https://www.sol-and-citrus.com"]').count(),0);
}
console.log('PASS local legal pages');
assert.deepEqual(errors, [], 'No browser runtime errors');
await context.close();
const animated = await browser.newContext({ viewport: {width:1440,height:1000} });
const motionPage = await animated.newPage();
motionPage.on('pageerror', e => errors.push(e.message));
await motionPage.goto(`${base}/`);
await motionPage.locator('.intro-overlay').waitFor({ state:'detached', timeout:6000 });
await motionPage.waitForTimeout(1100);
await motionPage.screenshot({ path:'qa/home-motion-desktop.png',fullPage:false });
await motionPage.reload({ waitUntil:'networkidle' });
assert.equal(await motionPage.locator('.intro-overlay').count(),0, 'Intro only once per session');
await motionPage.evaluate(() => window.scrollTo(0,document.body.scrollHeight));
await motionPage.waitForTimeout(1600);
assert.deepEqual(errors, []);
console.log('PASS GSAP intro, session replay prevention, scroll animations and no runtime errors');
await browser.close();
