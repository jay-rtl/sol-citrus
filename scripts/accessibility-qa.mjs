import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { writeFile } from 'node:fs/promises';
const browser = await chromium.launch({ channel:'chrome', headless:true, args:['--no-proxy-server'] });
const context = await browser.newContext({ reducedMotion:'reduce' });
const page = await context.newPage();
const report = [];
const base = process.env.QA_URL || 'http://127.0.0.1:5173';
for (const width of [390,1440]) {
  await page.setViewportSize({width,height:900});
  for (const path of ['/', '/menu', '/contact']) {
    await page.goto(`${base}${path}`, {waitUntil:'networkidle'});
    const results = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    report.push({width,path,violations:results.violations});
    console.log(width,path,JSON.stringify(results.violations.map(x=>({id:x.id,impact:x.impact,nodes:x.nodes.map(n=>n.target)}))));
  }
}
await page.setViewportSize({width:390,height:844});
await page.goto(base);
await page.getByRole('button',{name:'Open navigation'}).click();
const menu = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
report.push({width:390,path:'mobile-menu',violations:menu.violations});
console.log('mobile menu',JSON.stringify(menu.violations.map(x=>({id:x.id,impact:x.impact,nodes:x.nodes.map(n=>n.target)}))));
await writeFile('qa/accessibility.json',JSON.stringify(report,null,2));
await browser.close();
if(report.some(x=>x.violations.length))process.exitCode=1;
