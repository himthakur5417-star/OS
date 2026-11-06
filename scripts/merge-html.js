const fs = require('fs');

const src = fs.readFileSync('src/shaders/glass-ai-button/sources/glass-ai-button.html', 'utf8').split('\n');

// Lines 1-49 contain <!DOCTYPE html> ... <script>three.js r170 bundle</script> <script type="module">
let head = src.slice(0, 49).join('\n');

// Replace metadata and styling
head = head.replace('<title>GPT 6 Sol — Glass Galaxy</title>', '<title>Officium Supremum — Optical Glass CTA</title>');
head = head.replace('aria-label="GPT 6 Sol — activate the galaxy"', 'aria-label="Explore Programs — View mentorship curriculum"');
head = head.replace('background:#a8b0bd', 'background:transparent');

const snippet = fs.readFileSync('scripts/app-officium.snippet', 'utf8');

const fullHtml = head + '\n' + snippet;

fs.writeFileSync('src/shaders/officium-glass-button/sources/officium-glass-button.html', fullHtml, 'utf8');
console.log('Successfully generated officium-glass-button.html. Size:', fullHtml.length, 'bytes');
