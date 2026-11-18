import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const defaultOrigin = 'https://the-woft-software-2026.ruddypaint3.chatgpt.site';
const origin = (process.env.SITE_ORIGIN || defaultOrigin).replace(/\/$/, '');
const output = new URL('../dist/', import.meta.url).pathname;
const homeHtml = (await readFile(join(output, 'index.html'), 'utf8')).replaceAll(defaultOrigin, origin);
await writeFile(join(output, 'index.html'), homeHtml);
const routes = [
  {
    slug: 'snaca-cafe',
    title: 'SNACA CAFE — THE WOFT',
    description: 'មើលគំរូម៉ឺនុយឌីជីថល SNACA CAFE ដែលមានភាសាខ្មែរ និងអង់គ្លេស និងតម្លៃជា USD និង KHR។',
  },
  {
    slug: 'lotcha-siemreap',
    title: 'LOTCHA SIEMREAP 1991 — THE WOFT',
    description: 'មើលគំរូម៉ឺនុយឌីជីថល LOTCHA SIEMREAP 1991 មានការស្វែងរក ចំណូលចិត្ត និងសេចក្តីសង្ខេបការកម្ម៉ង់។',
  },
];
const escapeHtml = (s) => s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
for (const route of routes) {
  const url = `${origin}/work/${route.slug}`;
  const html = homeHtml
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeHtml(route.description)}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeHtml(route.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeHtml(route.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);
  const directory = join(output, 'work', route.slug);
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, 'index.html'), html);
}
const urls = [`${origin}/`, ...routes.map(route => `${origin}/work/${route.slug}`)];
await writeFile(join(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`);
await writeFile(join(output, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
