import { mkdir, writeFile } from 'node:fs/promises';
const assets = {
  'logo.png': '25c559_8542f05ce8f145ec83fbe21f3e5b0359~mv2.png',
  'hero.jpg': '25c559_c0f9dd9fa8c6483abe32990d85e8d9f7~mv2.jpg',
  'banner.jpg': '25c559_58cc7b52df6a4d949a55102916d9f37c~mv2.jpg',
  'story.jpg': '25c559_6db3007636674ae6ab6a14d8edd1dcb5~mv2.png',
  'art.jpg': '25c559_0569d11a7ea54c389a322de151bfb3b6~mv2.jpg',
  'wellness.jpg': '25c559_d1cbd24d07f8489aa49023c4138c7530~mv2.jpg',
  'celebrations.jpg': '25c559_6334d78d099448a98a4d49a465b8aea9~mv2.jpg',
  'community.jpg': '25c559_48a5c1dd16a64069b34424f0794c2258~mv2.jpg',
  'hero-original.png': '25c559_6aa446668a724bdea5ec8f3385aad0a6~mv2.png',
  'lemonade.jpg': '25c559_421d393dc9354d988133d6bcc5329727~mv2.jpg',
  'coffee.jpg': '25c559_f8d54b9bb0f14a5eabb4e34444ecd2f0~mv2.jpg',
  'matcha.jpg': '25c559_9baa30eac96d4b829909678cc3586afd~mv2.jpg'
};
await mkdir('public/assets', { recursive: true });
await Promise.all(Object.entries(assets).map(async ([name, source]) => {
  const url = `https://static.wixstatic.com/media/${source}/v1/fit/w_1400,h_1600,q_85/${name}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${name}: ${res.status}`);
  await writeFile(`public/assets/${name}`, Buffer.from(await res.arrayBuffer()));
  console.log(`Downloaded ${name}`);
}));
