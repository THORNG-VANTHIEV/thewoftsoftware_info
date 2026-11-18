import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const defaultOrigin = 'https://thorng-vanthiev.github.io/thewoftsoftware_info';
const origin = (process.env.SITE_ORIGIN || defaultOrigin).replace(/\/$/, '');
const output = new URL('../dist/', import.meta.url).pathname;
const homeHtml = (await readFile(join(output, 'index.html'), 'utf8')).replaceAll(defaultOrigin, origin);
await writeFile(join(output, 'index.html'), homeHtml);
const routes = [
  {
    slug: 'snaca-cafe',
    title: 'SNACA CAFE — THE WOFT',
    description: 'មើលគំរូម៉ឺនុយឌីជីថល SNACA CAFE ដែលមានភាសាខ្មែរ និងអង់គ្លេស និងតម្លៃជា USD និង KHR។',
    thumbnail: 'snaca-preview.png',
    thumbnailAlt: 'THE WOFT preview of the SNACA CAFE digital menu',
  },
  {
    slug: 'lotcha-siemreap',
    title: 'LOTCHA SIEMREAP 1991 — THE WOFT',
    description: 'មើលគំរូម៉ឺនុយឌីជីថល LOTCHA SIEMREAP 1991 មានការស្វែងរក ចំណូលចិត្ត និងសេចក្តីសង្ខេបការកម្ម៉ង់។',
    thumbnail: 'lotcha-preview.png',
    thumbnailAlt: 'THE WOFT preview of the LOTCHA SIEMREAP 1991 digital menu',
  },
];
const escapeHtml = (s) => s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
for (const route of routes) {
  const url = `${origin}/work/${route.slug}`;
  const html = homeHtml
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeHtml(route.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeHtml(route.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeHtml(route.description)}" />`)
    .replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${origin}/${route.thumbnail}" />`)
    .replace(/<meta property="og:image:secure_url" content="[^"]*" \/>/, `<meta property="og:image:secure_url" content="${origin}/${route.thumbnail}" />`)
    .replace(/<meta property="og:image:alt" content="[^"]*" \/>/, `<meta property="og:image:alt" content="${escapeHtml(route.thumbnailAlt)}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`)
    .replace(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${origin}/${route.thumbnail}" />`)
    .replace(/<meta name="twitter:image:alt" content="[^"]*" \/>/, `<meta name="twitter:image:alt" content="${escapeHtml(route.thumbnailAlt)}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);
  const directory = join(output, 'work', route.slug);
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, 'index.html'), html);
}
const urls = [`${origin}/`, ...routes.map(route => `${origin}/work/${route.slug}`)];
await writeFile(join(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`);
await writeFile(join(output, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
