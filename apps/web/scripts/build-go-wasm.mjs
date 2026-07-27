import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_MD = join(__dirname, '..', 'public', 'data', 'course', 'golang');
const OUTPUT_DIR = join(__dirname, '..', 'public', 'wasm');
const TMP_DIR = join(__dirname, '..', 'wasm-exec', 'weeks');

const TINYGO = process.env.TINYGO || 'tinygo';
const WASMOPT = process.env.WASMOPT || '';

const weeks = [
  { w: 1, f: 'pengenalan-go' },
  { w: 2, f: 'tipe-data-kontrol' },
  { w: 3, f: 'fungsi-error' },
  { w: 4, f: 'array-slice-map' },
  { w: 5, f: 'struct-pointer' },
  { w: 6, f: 'interface-package' },
  { w: 7, f: 'defer-file-io' },
  { w: 8, f: 'goroutine-waitgroup' },
  { w: 9, f: 'channel-context' },
  { w: 10, f: 'testing-stdlib' },
  { w: 11, f: 'cli-http-server' },
  { w: 12, f: 'rest-api-middleware' },
  { w: 13, f: 'database-deploy' },
  { w: 14, f: 'advanced-final' },
];

// Helper to extract code blocks from markdown
function extractCodeBlocks(mdPath) {
  if (!existsSync(mdPath)) return [];
  const content = readFileSync(mdPath, 'utf8');
  const regex = /```(?:go)?\n([\s\S]*?)```/g;
  const blocks = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    const code = match[1].trim();
    if (code.length > 0) blocks.push(code);
  }
  return blocks;
}

function wrapAsProgram(code) {
  // Check if already complete
  if (code.includes('package main') && code.includes('func main()')) {
    return code;
  }
  if (code.startsWith('package')) return code;

  // Extract imports from the code
  const importMatch = code.match(/import\s+\(?([\s\S]*?)\)?/);
  const hasFmt = code.includes('fmt.') || code.includes('"fmt"');
  const hasTime = code.includes('time.') || code.includes('"time"');
  const hasJson = code.includes('json.') || code.includes('"encoding/json"');
  const hasLog = code.includes('log.') || code.includes('"log"');

  let imports = [];
  if (hasFmt) imports.push('"fmt"');
  if (hasTime) imports.push('"time"');
  if (hasJson) imports.push('"encoding/json"');
  if (hasLog) imports.push('"log"');

  const importBlock = imports.length > 0
    ? 'import (\n\t' + imports.join('\n\t') + '\n)'
    : '';

  return `package main

${importBlock}

func main() {
${code.split('\n').map(l => '\t' + l).join('\n')}
}`;
}

if (!existsSync(TMP_DIR)) mkdirSync(TMP_DIR, { recursive: true });
if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

let built = 0;
let skipped = 0;

for (const { w, f } of weeks) {
  const idMd = join(BASE_MD, 'beginer', 'id', `week${w}-${f}.md`);
  const enMd = join(BASE_MD, 'beginer', 'en', `week${w}-${f}.md`);

  // Try both files based on level
  const levels = ['beginer', 'intermediate', 'advanced'];
  let mdFile = idMd;
  for (const lv of levels) {
    const p = join(BASE_MD, lv, 'id', `week${w}-${f}.md`);
    if (existsSync(p)) { mdFile = p; break; }
  }

  const blocks = extractCodeBlocks(mdFile);
  if (blocks.length === 0) {
    console.log(`Week ${w}: No code blocks found, skipping TinyGo`);
    skipped++;
    continue;
  }

  // Combine all blocks into one program
  const combined = blocks.join('\n\n');
  const program = wrapAsProgram(combined);

  const tmpFile = join(TMP_DIR, `week${w}.go`);
  writeFileSync(tmpFile, program, 'utf8');

  // Check for TinyGo-unsupported packages
  if (program.includes('"net/http"') || program.includes('"database/sql"') ||
      program.includes('"flag"') || program.includes('"pprof"') ||
      program.includes('os.') && program.includes('os.ReadFile') ||
      program.includes('os.') && program.includes('os.Create') ||
      program.includes('os.') && program.includes('os.OpenFile')) {
    console.log(`Week ${w}: Uses unsupported packages (net/http/database/os), skipping TinyGo`);
    skipped++;
    continue;
  }

  try {
    const outFile = join(OUTPUT_DIR, `tiny-week${w}.wasm`);
    const env = { ...process.env, TINYGOROOT: process.env.TINYGOROOT || '' };
    if (WASMOPT) env.WASMOPT = WASMOPT;

    execSync(`${TINYGO} build -o "${outFile}" -target wasm "${tmpFile}"`, {
      env,
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 120000,
    });

    const size = existsSync(outFile) ? (readFileSync(outFile).length / 1024).toFixed(1) + 'KB' : 'unknown';
    console.log(`Week ${w}: Built TinyGo WASM (${size})`);
    built++;
  } catch (err) {
    console.log(`Week ${w}: TinyGo build failed: ${err.message ? err.message.substring(0, 80) : 'unknown error'}. Skipping.`);
    skipped++;
  }
}

console.log(`\nDone. Built: ${built}, Skipped: ${skipped}`);
