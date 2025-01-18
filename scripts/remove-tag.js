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
    
    // Find the tags line
    const match = content.match(/tags: \[(.*?)\]/);
    if (!match) continue;
    
    // Get the tags and remove "neural computation"
    const tags = match[1].split(',').map(tag => tag.trim().replace(/"/g, ''));
    const updatedTags = tags.filter(tag => tag !== 'neural computation');
    
    // Create the new tags line
    const newTagsLine = `tags: ["${updatedTags.join('", "')}"]`;
    
    // Replace the old tags line with the new one
    const updatedContent = content.replace(/tags: \[.*?\]/, newTagsLine);
    
    if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent);
        console.log(`Removed "neural computation" tag from ${file}`);
    }
}
