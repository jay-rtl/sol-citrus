import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { experiences, menu, business } from '../src/data.js';
import { home, menuPage, contactPage } from '../src/pages.js';
test('All authored image files and responsive variants exist', () => {
  const content = [home(), menuPage(), contactPage()].join('');
  const assets = [...content.matchAll(/(?:src="|srcset="|, )(\/assets\/[^" ,]+)/g)].map(m=>m[1]);
  for (const path of assets) assert.ok(existsSync(`public${path}`), path);
});
test('Live business content and booking form are preserved', () => {
  assert.equal(experiences.length,4);
  assert.equal(menu.map(x=>x.items.length).reduce((a,b)=>a+b),10);
  assert.match(contactPage(), /\$150/);
  assert.match(contactPage(), /3 hours/);
  assert.match(contactPage(), /Hallandale Beach/);
  assert.match(contactPage(), /approximately 40 miles/);
  assert.match(contactPage(), new RegExp(business.email.replaceAll('.', '\\.')));
  assert.ok(contactPage().includes(business.inquiry));
});
test('Production pages include crawlable content and page-specific metadata', () => {
  for (const path of ['', 'menu/', 'contact/']) {
    const html = readFileSync(`dist/${path}index.html`, 'utf8');
    assert.match(html, /<main id="main">/);
    assert.match(html, /<h1 /);
    assert.ok(html.includes(`href="https://www.sol-and-citrus.com/${path.replace(/\/$/,'')}"`));
    assert.match(html, /privacy-policy/);
    assert.match(html, /terms-of-service/);
    assert.match(html, /accessibility-statement/);
  }
});
