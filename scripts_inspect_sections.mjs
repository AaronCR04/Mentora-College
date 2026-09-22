import fs from 'node:fs';

const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

lines.forEach((line, i) => {
  if (line.includes('<section')) {
    console.log(`Line ${i+1}: ${line.trim()}`);
  }
  if (line.includes('grid-template-columns') || line.includes('class="grid') || line.includes('-grid')) {
    console.log(`  Grid at Line ${i+1}: ${line.trim()}`);
  }
});
