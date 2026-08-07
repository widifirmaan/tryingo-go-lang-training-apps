import fs from 'fs';
const files = [
  'scripts/generate-php-materials.mjs',
  'scripts/generate-laravel-materials.mjs',
  'scripts/generate-ci4-materials.mjs',
  'scripts/generate-rails-materials.mjs'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const result = [];
  let inTemplate = false;

  for (const line of lines) {
    if (/^\s*(code|explanationId|explanationEn|challengeId|challengeEn|summaryId|summaryEn):\s*`/.test(line)) {
      inTemplate = true;
      result.push(line);
      continue;
    }
    if (inTemplate && /^\s*`,\s*$/.test(line)) {
      inTemplate = false;
      result.push(line);
      continue;
    }
    if (inTemplate) {
      result.push(line.replace(/(?<!\\)`/g, '\\`'));
    } else {
      result.push(line);
    }
  }

  fs.writeFileSync(file, result.join('\n'));
  console.log('Fixed:', file);
});
