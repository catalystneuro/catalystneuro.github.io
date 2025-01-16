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
const template = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');

// Create directories and HTML files for each route
routes.forEach(route => {
  const dir = path.join(rootDir, route);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(path.join(dir, 'index.html'), template);
});
