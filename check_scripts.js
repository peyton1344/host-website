const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');

const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let scriptCount = 0;
let errors = 0;

while ((match = scriptRegex.exec(content)) !== null) {
    const scriptContent = match[1];
    if (scriptContent.trim().length === 0) continue;
    scriptCount++;
    
    try {
        new Function(scriptContent);
    } catch (e) {
        console.error(`Error in inline script #${scriptCount} at index ${match.index}:`);
        console.error(e.message);
        const lines = scriptContent.split('\n');
        // print first 5 lines to identify
        console.error(lines.slice(0, 5).join('\n'));
        console.error('---');
        errors++;
    }
}

console.log(`Found ${scriptCount} inline scripts.`);
console.log(`Found ${errors} syntax errors.`);
