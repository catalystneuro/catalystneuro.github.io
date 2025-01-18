import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const conversionsDir = path.join(__dirname, '../src/content/nwb-conversions');
const files = fs.readdirSync(conversionsDir);

// Map of lab names to their file names
const labMappings = {
    'washington-buffalo-lab.md': true,  // Beth Buffalo
    'international-brain-lab.md': true, // International Brain Laboratory
    'princeton-tank-lab.md': true,      // David Tank
    'nyu-movshon-lab.md': true,        // Tony Movshon
    'stanford-shenoy-lab.md': true,     // Krishna Shenoy
    'princeton-brody-lab.md': true,     // Carlos Brody
    'mit-fee-lab.md': true,            // Michael Fee
    'princeton-murthy-lab.md': true,    // Mala Murthy
    'northwestern-pinto-lab.md': true,  // Lucas Pinto
    'mit-jazayeri-lab.md': true,       // Mehrdad Jazayeri
    'janelia-ahrens-lab.md': true,     // Misha Ahrens
    'uc-davis-stavisky-lab.md': true,  // Sergey Stavisky
    'harvard-datta-lab.md': true,      // Bob Datta
    'mit-dicarlo-lab.md': true,        // James DiCarlo
};

for (const file of files) {
    if (!file.endsWith('.md')) continue;
    
    const filePath = path.join(conversionsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    if (labMappings[file]) {
        // Update the funded_project field
        const updatedContent = content.replace(
            /funded_project: ".*"/,
            'funded_project: "SCGB NWB Adoption"'
        );
        
        fs.writeFileSync(filePath, updatedContent);
        console.log(`Updated ${file} with SCGB NWB Adoption`);
    }
}
