import { mkdir, writeFile } from 'node:fs/promises';
const response = await fetch('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@400;500;600&display=swap', { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36' } });
if (!response.ok) throw new Error(`Fonts CSS: ${response.status}`);
const source = await response.text();
const latin = [...source.matchAll(/\/\* latin \*\/\s*(@font-face\s*\{[^}]+\})/g)].map(m=>m[1]);
if (!latin.length) throw new Error('Latin font definitions were not found');
await mkdir('public/assets/fonts', { recursive:true });
const files = new Map();
let css = latin.join('\n');
for (const match of css.matchAll(/url\(([^)]+)\)/g)) {
  const url = match[1];
  if (files.has(url)) continue;
  const name = `font-${files.size+1}.woff2`;
  const res = await fetch(url);
  if(!res.ok) throw new Error(`Font ${res.status}`);
  await writeFile(`public/assets/fonts/${name}`, Buffer.from(await res.arrayBuffer()));
  files.set(url,name);
}
for (const [url,name] of files) css=css.replaceAll(url,`/assets/fonts/${name}`);
await writeFile('public/assets/fonts/fonts.css',css);
await writeFile('src/fonts.css',css);
console.log(`Self-hosted ${files.size} font files`);
for (const family of ['cormorantgaramond','dmsans']) {
  const license = await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${family}/OFL.txt`);
  if(!license.ok) throw new Error(`Font license ${license.status}`);
  await writeFile(`public/assets/fonts/${family}-OFL.txt`,await license.text());
}
