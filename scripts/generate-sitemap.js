import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Generates dist/sitemap.xml after the build by walking the prerendered
// dist/**/index.html files, so the sitemap always matches the routes
// vite-react-ssg actually emitted. URLs use the trailing-slash form to match
// Netlify's pretty-URL redirects (and the canonicals set by Seo.tsx).

const SITE_URL = 'https://catalystneuro.com';

// Pages that exist but shouldn't be crawled (also disallowed in robots.txt).
const EXCLUDED_PATHS = ['/success/'];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '..', 'dist');

const findPages = (dir) => {
  const pages = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      pages.push(...findPages(full));
    } else if (entry.name === 'index.html') {
      const rel = path.relative(distDir, dir).split(path.sep).join('/');
      pages.push(rel === '' ? '/' : `/${rel}/`);
    }
  }
  return pages;
};

const pages = findPages(distDir)
  .filter((p) => !EXCLUDED_PATHS.includes(p))
  .sort();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
console.log(`Generated dist/sitemap.xml with ${pages.length} URLs`);
