import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const conversionsDir = path.join(__dirname, '../src/content/nwb-conversions');
const files = fs.readdirSync(conversionsDir);

// Map of lab names to their funded projects
const labMappings = {
    // SCGB NWB Adoption
    'washington-buffalo-lab.md': 'SCGB NWB Adoption',
    'international-brain-lab.md': 'SCGB NWB Adoption',
    'princeton-tank-lab.md': 'SCGB NWB Adoption',
    'nyu-movshon-lab.md': 'SCGB NWB Adoption',
    'stanford-shenoy-lab.md': 'SCGB NWB Adoption',
    'princeton-brody-lab.md': 'SCGB NWB Adoption',
    'mit-fee-lab.md': 'SCGB NWB Adoption',
    'princeton-murthy-lab.md': 'SCGB NWB Adoption',
    'northwestern-pinto-lab.md': 'SCGB NWB Adoption',
    'mit-jazayeri-lab.md': 'SCGB NWB Adoption',
    'janelia-ahrens-lab.md': 'SCGB NWB Adoption',
    'uc-davis-stavisky-lab.md': 'SCGB NWB Adoption',
    'harvard-datta-lab.md': 'SCGB NWB Adoption',
    'mit-dicarlo-lab.md': 'SCGB NWB Adoption',

    // Michael J. Fox ASAP
    'pitt-turner-lab.md': 'Michael J. Fox ASAP',
    'northwestern-lerner-lab.md': 'Michael J. Fox ASAP',
    'ucsf-nelson-lab.md': 'Michael J. Fox ASAP',
    'yale-higley-lab.md': 'Michael J. Fox ASAP',
    'baylor-reimer-lab.md': 'Michael J. Fox ASAP',
    'northwestern-dombeck-lab.md': 'Michael J. Fox ASAP',
    'bu-howe-lab.md': 'Michael J. Fox ASAP',
};

for (const file of files) {
    if (!file.endsWith('.md')) continue;
    
    const filePath = path.join(conversionsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    if (labMappings[file]) {
        // Update the funded_project field
        const updatedContent = content.replace(
            /funded_project: ".*"/,
            `funded_project: "${labMappings[file]}"`
        );
        
        fs.writeFileSync(filePath, updatedContent);
        console.log(`Updated ${file} with ${labMappings[file]}`);
    }
}
