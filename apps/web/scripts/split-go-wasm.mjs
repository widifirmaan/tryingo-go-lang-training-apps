import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const wasmDir = path.join(root, 'public', 'wasm');
const source = path.join(wasmDir, 'go-exec.wasm');
const manifestPath = path.join(wasmDir, 'goexec-manifest.json');

// Cloudflare Pages rejects files larger than 25 MiB. 20 MiB leaves headroom.
const MAX_CHUNK_BYTES = 20 * 1024 * 1024;
const PART_PATTERN = /^goexec-part-/;

if (!fs.existsSync(source)) {
  if (fs.existsSync(manifestPath)) {
    console.log('go-exec.wasm not found; keeping existing split chunks.');
  } else {
    console.warn('go-exec.wasm not found and no split chunks exist; Yaegi will be unavailable.');
  }
  process.exit(0);
}

const buffer = fs.readFileSync(source);
const sha256 = crypto.createHash('sha256').update(buffer).digest('hex');

const existing = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  : null;

if (
  existing &&
  existing.sha256 === sha256 &&
  Array.isArray(existing.parts) &&
  existing.parts.every((part) => fs.existsSync(path.join(wasmDir, part)))
) {
  console.log(`Split Go WASM is up to date (${existing.parts.length} chunks).`);
  process.exit(0);
}

for (const file of fs.readdirSync(wasmDir)) {
  if (PART_PATTERN.test(file)) fs.unlinkSync(path.join(wasmDir, file));
}

const shortHash = sha256.slice(0, 12);
const parts = [];

for (let offset = 0, index = 0; offset < buffer.length; index++, offset += MAX_CHUNK_BYTES) {
  const chunk = buffer.subarray(offset, Math.min(offset + MAX_CHUNK_BYTES, buffer.length));
  const name = `goexec-part-${shortHash}-${index}`;
  fs.writeFileSync(path.join(wasmDir, name), chunk);
  parts.push(name);
  console.log(`Wrote ${name} (${chunk.length} bytes)`);
}

fs.writeFileSync(
  manifestPath,
  JSON.stringify({ sha256, totalSize: buffer.length, parts }, null, 2) + '\n'
);
console.log(`Wrote manifest: ${parts.length} chunks, ${buffer.length} bytes total.`);
