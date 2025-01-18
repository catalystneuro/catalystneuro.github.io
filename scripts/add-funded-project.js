import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const conversionsDir = path.join(__dirname, '../src/content/nwb-conversions');
const files = fs.readdirSync(conversionsDir);

for (const file of files) {
    if (!file.endsWith('.md')) continue;
    
    const filePath = path.join(conversionsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if funded_project field already exists
    if (content.includes('funded_project:')) {
        console.log(`Skipping ${file}: funded_project field already exists`);
        continue;
    }
    
    // Find the position of the closing --- of the frontmatter
    const frontmatterEnd = content.indexOf('---', 3);
    if (frontmatterEnd === -1) {
        console.log(`Skipping ${file}: Invalid frontmatter format`);
        continue;
    }
    
    // Insert the funded_project field before the closing ---
    const updatedContent = content.slice(0, frontmatterEnd) + 
        'funded_project: ""\n' + 
        content.slice(frontmatterEnd);
    
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Updated ${file}: Added funded_project field`);
}
