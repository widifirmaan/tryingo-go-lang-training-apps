import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const courseDir = path.resolve(__dirname, '../public/data/course');

const tracks = fs.readdirSync(courseDir).filter(f => fs.statSync(path.join(courseDir, f)).isDirectory());

console.log('Auditing', tracks.length, 'tracks in', courseDir);

const contrastIssues = [];
const noPrintIssues = [];
let totalFiles = 0;
let totalHtmlBlocks = 0;
let totalCodeBlocks = 0;

function checkFile(filePath, track, relPath) {
  totalFiles++;
  const content = fs.readFileSync(filePath, 'utf8');

  // 1. Audit HTML code blocks for contrast issues
  const htmlBlocks = [...content.matchAll(/```html\r?\n([\s\S]*?)```/g)];
  totalHtmlBlocks += htmlBlocks.length;

  for (const match of htmlBlocks) {
    const code = match[1];

    // Check style tags
    const styleBlocks = [...code.matchAll(/<style[\s\S]*?>([\s\S]*?)<\/style>/gi)];
    for (const sb of styleBlocks) {
      const css = sb[1];
      const rules = [...css.matchAll(/([^{]+)\{([^}]+)\}/g)];
      
      let bodyHasBg = false;
      let bodyHasColor = false;

      for (const r of rules) {
        const selector = r[1].trim();
        const body = r[2].trim();

        if (selector === 'body' || selector.includes('body')) {
          if (/(background|background-color)\s*:/i.test(body)) bodyHasBg = true;
          if (/color\s*:/i.test(body)) bodyHasColor = true;
        }

        const isLightBg = /(background|background-color)\s*:\s*(#ffffff|#fff\b|white\b|#f8fafc|#f1f5f9|#f7fafc|#edf2f7|rgba\(\s*255\s*,\s*255\s*,\s*255)/i.test(body);
        const isDarkBg = /(background|background-color)\s*:\s*(#000000|#000\b|black\b|#0f172a|#1e293b|#111827|#18181b|#1e1e1e)/i.test(body);
        const hasColor = /(?<!-)color\s*:\s*(#[0-9a-f]{3,6}|black|white|rgb|hsl)/i.test(body);

        // Check for light card/box with no explicit text color
        if (isLightBg && !hasColor) {
          const targetContainers = ['.card', '.box', '.container', '.hero', '.modal', '.panel', '.sidebar', '.item', '.konten'];
          if (targetContainers.some(c => selector.includes(c))) {
            contrastIssues.push({
              track,
              file: relPath,
              selector,
              issue: 'Light background container without explicit text color (risk of white-on-white text inheritance)'
            });
          }
        }

        // Check for white text on light background in the same rule
        if (isLightBg && /(?<!-)color\s*:\s*(#fff\b|#ffffff\b|white\b|#f8fafc|#f1f5f9|#f9fafb)/i.test(body)) {
          contrastIssues.push({
            track,
            file: relPath,
            selector,
            issue: 'EXPLICIT white text on white/light background!'
          });
        }

        // Check for dark text on dark background in the same rule
        if (isDarkBg && /(?<!-)color\s*:\s*(#000\b|#000000\b|black\b|#0f172a|#1e293b|#111827)/i.test(body)) {
          contrastIssues.push({
            track,
            file: relPath,
            selector,
            issue: 'EXPLICIT dark text on dark background!'
          });
        }
      }

      // If document has custom CSS but body has no background set, it might inherit dark/light inconsistently
      if (!bodyHasBg && css.includes('.card')) {
        contrastIssues.push({
          track,
          file: relPath,
          selector: 'body',
          issue: 'Body has no explicit background-color, while .card has background'
        });
      }
    }
  }

  // 2. Audit runnable code blocks in pure language tracks
  const runnableTracks = ['javascript', 'typescript', 'python', 'golang', 'rust', 'nodejs'];
  if (runnableTracks.includes(track)) {
    const codeBlocks = [...content.matchAll(/```(javascript|js|typescript|ts|python|py|go|rust)\r?\n([\s\S]*?)```/g)];
    totalCodeBlocks += codeBlocks.length;

    for (const match of codeBlocks) {
      const lang = match[1];
      const code = match[2].trim();
      const nonCommentLines = code.split('\n')
        .map(l => l.trim())
        .filter(l => l && !l.startsWith('//') && !l.startsWith('#') && !l.startsWith('/*') && !l.startsWith('*'));

      if (nonCommentLines.length >= 2) {
        const hasLog = /console\.(log|info|warn|error)|print\(|fmt\.Print|println!|eprintln!/.test(code);
        const isOnlyDeclarations = /^(interface|type|enum|package|import)\b/.test(nonCommentLines[0]) && !code.includes('=');
        const isHtmlDom = /document\.|window\.|getElementById|querySelector/.test(code);

        // If code does calculations or expressions or branching or loops but has NO log
        const hasOperations = /(const|let|var|def|\+|-|\*|\/|==|===|if|for|while|return)\b/.test(code);
        if (!hasLog && !isOnlyDeclarations && !isHtmlDom && hasOperations) {
          noPrintIssues.push({
            track,
            file: relPath,
            lang,
            firstLine: nonCommentLines[0].slice(0, 60),
            lineCount: nonCommentLines.length
          });
        }
      }
    }
  }
}

for (const track of tracks) {
  const trackPath = path.join(courseDir, track);
  function walk(dir) {
    const entries = fs.readdirSync(dir);
    for (const e of entries) {
      const full = path.join(dir, e);
      if (fs.statSync(full).isDirectory()) {
        walk(full);
      } else if (e.endsWith('.md')) {
        checkFile(full, track, path.relative(courseDir, full));
      }
    }
  }
  walk(trackPath);
}

console.log('\n==============================================');
console.log('AUDIT RESULTS:');
console.log('Total files scanned:', totalFiles);
console.log('Total HTML blocks scanned:', totalHtmlBlocks);
console.log('Total runnable code blocks scanned:', totalCodeBlocks);
console.log('==============================================');

// Group contrast issues by track
const contrastByTrack = {};
for (const ci of contrastIssues) {
  contrastByTrack[ci.track] = contrastByTrack[ci.track] || [];
  contrastByTrack[ci.track].push(ci);
}

// Group no-print issues by track
const noPrintByTrack = {};
for (const np of noPrintIssues) {
  noPrintByTrack[np.track] = noPrintByTrack[np.track] || [];
  noPrintByTrack[np.track].push(np);
}

const report = {
  contrastIssues,
  noPrintIssues,
  contrastByTrackCount: Object.fromEntries(Object.entries(contrastByTrack).map(([k, v]) => [k, v.length])),
  noPrintByTrackCount: Object.fromEntries(Object.entries(noPrintByTrack).map(([k, v]) => [k, v.length]))
};

fs.writeFileSync(path.resolve(__dirname, 'audit_report.json'), JSON.stringify(report, null, 2));

console.log('\n--- CONTRAST ISSUES COUNT BY TRACK ---');
for (const [t, count] of Object.entries(report.contrastByTrackCount)) {
  console.log(`  ${t.padEnd(16)}: ${count} issues`);
}

console.log('\n--- NO-PRINT SNIPPETS COUNT BY TRACK ---');
for (const [t, count] of Object.entries(report.noPrintByTrackCount)) {
  console.log(`  ${t.padEnd(16)}: ${count} issues`);
}
console.log('\nFull detailed report saved to apps/web/scripts/audit_report.json');
