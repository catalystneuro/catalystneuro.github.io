import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const routes = [
  'about',
  'team',
  'blog',
  'software',
  'openings',
  'funded-projects',
  'nwb-conversions'
];

// Read the template
const distDir = path.join(rootDir, 'dist');
const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// Fix asset paths to be absolute
const fixedTemplate = template
  .replace(/src="\.\//g, 'src="/')
  .replace(/href="\.\//g, 'href="/')
  .replace(/src="\.\.\//g, 'src="/')
  .replace(/href="\.\.\//g, 'href="/');

// Create directories and HTML files for each route
routes.forEach(route => {
  const dir = path.join(distDir, route);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(path.join(dir, 'index.html'), fixedTemplate);
});

// Update the root index.html as well
fs.writeFileSync(path.join(distDir, 'index.html'), fixedTemplate);
