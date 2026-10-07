import { mkdir, readdir, copyFile, unlink } from 'node:fs/promises';
await mkdir('source-assets', { recursive: true });
for (const name of await readdir('public/assets')) {
  if (!/\.(png|jpg)$/.test(name)) continue;
  await copyFile(`public/assets/${name}`, `source-assets/${name}`);
  await unlink(`public/assets/${name}`);
}
await import('./recompress-assets.mjs');
