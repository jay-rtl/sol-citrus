import sharp from 'sharp';
import { readdir, writeFile } from 'node:fs/promises';
const metadata = {};
for (const name of await readdir('source-assets')) {
  if (name === 'hero-original.png' || !/\.(png|jpg)$/.test(name)) continue;
  const output = name.replace(/\.(png|jpg)$/, '.webp');
  const info = await sharp(`source-assets/${name}`).resize({ width:name==='logo.png'?300:1200, withoutEnlargement:true }).webp({quality:name==='logo.png'?82:70}).toFile(`public/assets/${output}`);
  metadata[output] = {width:info.width,height:info.height};
  if(name!=='logo.png') {
    await sharp(`source-assets/${name}`).resize({width:640,withoutEnlargement:true}).webp({quality:68}).toFile(`public/assets/${output.replace('.webp','-640.webp')}`);
    await sharp(`source-assets/${name}`).resize({width:1200,withoutEnlargement:true}).avif({quality:45,effort:4}).toFile(`public/assets/${output.replace('.webp','.avif')}`);
    await sharp(`source-assets/${name}`).resize({width:640,withoutEnlargement:true}).avif({quality:45,effort:4}).toFile(`public/assets/${output.replace('.webp','-640.avif')}`);
  }
}
await writeFile('src/asset-metadata.js', `export const assetMetadata = ${JSON.stringify(metadata,null,2)};\n`);
