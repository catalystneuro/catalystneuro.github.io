import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const conversionsDir = path.join(__dirname, '../src/content/nwb-conversions');
const files = fs.readdirSync(conversionsDir);

async function getRepoCreationDate(owner, repo) {
    try {
        const curlCmd = `curl -s -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/${owner}/${repo}`;
        const output = execSync(curlCmd);
        const repoData = JSON.parse(output);
        if (repoData.message === "Not Found") {
            throw new Error("Repository not found");
        }
        return repoData.created_at ? repoData.created_at.substring(0, 7) : null;
    } catch (error) {
        throw new Error(`Could not fetch repository data: ${error.message}`);
    }
}

for (const file of files) {
    if (!file.endsWith('.md')) continue;
    
    const filePath = path.join(conversionsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const githubMatch = content.match(/github: "([^"]+)"/);
    const dateMatch = content.match(/date: "([^"]+)"/);
    
    if (!githubMatch || !dateMatch) {
        console.log(`Skipping ${file}: No GitHub URL or date found`);
        continue;
    }
    
    const githubUrl = githubMatch[1];
    const currentDate = dateMatch[1];
    const urlParts = githubUrl.replace('https://github.com/', '').split('/');
    
    if (urlParts.length !== 2) {
        console.log(`Skipping ${file}: Invalid GitHub URL format`);
        continue;
    }
    
    const [owner, repo] = urlParts;
    
    try {
        const repoCreationDate = await getRepoCreationDate(owner, repo);
        if (repoCreationDate) {
            console.log(`Updating ${file}: ${currentDate} -> ${repoCreationDate}`);
            const updatedContent = content.replace(
                /date: "[^"]+"/,
                `date: "${repoCreationDate}"`
            );
            fs.writeFileSync(filePath, updatedContent);
        } else {
            console.log(`Skipping ${file}: Could not determine repository creation date`);
        }
    } catch (error) {
        console.log(`Skipping ${file}: ${error.message}`);
    }
}
