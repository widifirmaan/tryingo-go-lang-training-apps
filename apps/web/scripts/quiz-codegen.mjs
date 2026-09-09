// ─────────────────────────────────────────────────────────────────────────────
// Code-verified quiz questions (v2): trace-output + find-the-bug for JS/Python.
// Every emitted question is VERIFIED BY EXECUTION at build time. Anything that
// fails verification is silently skipped — never emit an unverified question.
// Deterministic: shuffling uses the caller's seeded rng.
// ─────────────────────────────────────────────────────────────────────────────
import { execSync } from 'child_process';
import { mkdtempSync, writeFileSync, rmSync, existsSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

function tryRun(cmd, code, timeoutMs = 8000) {
  let dir = null;
  try {
    dir = mkdtempSync(join(tmpdir(), 'quizcode-'));
    const file = join(dir, cmd === 'node' ? 'q.mjs' : 'q.py');
    writeFileSync(file, code);
    // NOTE: .mjs forces module mode; materials use ESM import only in module
    // weeks (skipped by content filter below), so plain scripts are safe.
    const out = execSync(`${cmd} "${file}"`, { cwd: dir, timeout: timeoutMs, stdio: ['ignore', 'pipe', 'pipe'] });
    return { ok: true, stdout: out.toString(), stderr: '' };
  } catch (e) {
    const stdout = (e.stdout || '').toString();
    const stderr = (e.stderr || '').toString();
    // Non-zero exit with output (e.g. thrown errors) is still usable evidence.
    if (e.status !== undefined && e.status !== 0 && (stdout || stderr)) {
      return { ok: false, stdout, stderr, code: e.status };
    }
    return null; // timeout / missing interpreter → skip
  } finally {
    if (dir) { try { rmSync(dir, { recursive: true, force: true }); } catch {} }
  }
}

const UNSAFE_RE = /setInterval|setImmediate|process\.exit|require\(|import\s|export\s|from\s+['"]|fetch\(|XMLHttpRequest|document|window|localStorage|alert\(|prompt\(|confirm\(|input\(|listen\(|serve\(|argv|env\[|getenv|__dirname|performance\.|console\.time|requestAnimationFrame|console\.table|while\s*\(\s*true|for\s*\(\s*;\s*;|matplotlib|tkinter|flask|Flask|pandas|numpy|argparse/;
const COMMENT_RE = { js: /^\s*\/\//, py: /^\s*#/ };
function stripComments(code, kind) {
  const re = COMMENT_RE[kind];
  return code.split('\n').filter((l) => !re.test(l)).join('\n');
}
const NONDETERMINISTIC_RE = /new Date|Date\.now|Math\.random|random\.|0x[0-9a-f]+|0o[0-9]+|0b[01]+|\bat 0x|memory|object at|__TIME__|__DATE__/;

function extractBlocks(content, fence) {
  const re = new RegExp('^```' + fence + '\\n([\\s\\S]*?)^```', 'gm');
  const out = [];
  let m;
  while ((m = re.exec(content)) !== null) out.push(m[1]);
  return out;
}

function cleanLines(stdout) {
  return stdout.split('\n').map((l) => l.replace(/\s+$/, '')).filter((l, i, a) => !(l === '' && a[i - 1] === ''));
}

// ── Distractor builders (all verified distinct from the answer) ──
function numericVariants(ans) {
  const out = [];
  const m = ans.match(/^(.*?)(\d[\d.,]*)(\D*)$/);
  if (!m) return out;
  const [, pre, num, post] = m;
  const plain = num.replace(/[.,]/g, '');
  if (!/^\d+$/.test(plain)) return out;
  try {
    const n = BigInt(plain);
    const fmt = (v) => {
      let s = v.toString();
      // re-apply thousand separators in the answer's style
      const sep = num.includes('.') ? '.' : (num.includes(',') ? ',' : '');
      if (sep) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
      return pre + s + post;
    };
    for (const v of [n + 1n, n - 1n, n * 10n]) {
      const s = fmt(v);
      if (s !== ans) out.push(s);
    }
  } catch {}
  return out;
}

function genericDistractors(ans, otherLines) {
  const pool = [];
  for (const l of otherLines) {
    const s = l.trim();
    if (s && s !== ans && !pool.includes(s)) pool.push(s);
  }
  for (const g of ['undefined', 'None', 'null', '0', 'false', 'Error']) {
    if (g !== ans && !pool.includes(g)) pool.push(g);
  }
  return pool;
}

// ── Type A: trace-output ──
function buildTrace(lang, text, code, runner, qText) {
  const res = tryRun(runner, code);
  if (!res || !res.ok) return null;
  const lines = cleanLines(res.stdout).filter((l) => l.trim() !== '');
  if (!lines.length) return null;
  const answer = lines[lines.length - 1].trim();
  if (!answer || answer.length > 60) return null; // long dumps make indistinguishable options
  const others = lines.slice(0, -1);
  let distract = [...numericVariants(answer), ...genericDistractors(answer, others)]
    .filter((d, i, a) => d !== answer && d.length <= 80 && a.indexOf(d) === i)
    .slice(0, 3);
  if (distractorsShort(distract)) return null;
  return { answer, distract, code };
  function distractorsShort(d) { return d.length < 2; }
}

const TRACE_Q = {
  id: 'Apa output BARIS TERAKHIR program berikut?',
  en: 'What is the LAST-LINE output of the following program?',
};

// ── Type B: curated bug templates, answer VERIFIED by execution ──
const BUG_TEMPLATES = [
  {
    id: 'js-const-reassign', langs: ['javascript'], run: 'node',
    need: ['const '],
    code: 'const harga = 62000;\nharga = 5000;\nconsole.log(harga);',
    verify: (r) => !r.ok && /TypeError/i.test(r.stderr) && /constant/i.test(r.stderr),
    q: { id: 'Apa yang terjadi saat kode ini dijalankan?', en: 'What happens when this code runs?' },
    options: {
      id: ['Error: Assignment to constant variable', 'harga menjadi 5000', 'harga menjadi 67000', 'Tidak terjadi apa-apa'],
      en: ['Error: Assignment to constant variable', 'harga becomes 5000', 'harga becomes 67000', 'Nothing happens'],
    },
  },
  {
    id: 'js-loose-eq', langs: ['javascript'], run: 'node',
    need: ['=='],
    code: 'console.log("5" == 5);\nconsole.log("5" === 5);',
    verify: (r) => r.ok && r.stdout.trim().split('\n').map((s) => s.trim()).join('|') === 'true|false',
    q: { id: 'Apa output dua baris berikut?', en: 'What is the two-line output below?' },
    options: {
      id: ['true lalu false', 'false lalu true', 'true lalu true', 'false lalu false'],
      en: ['true then false', 'false then true', 'true then true', 'false then false'],
    },
  },
  {
    id: 'js-missing-await', langs: ['javascript'], run: 'node',
    need: ['await', 'async'],
    code: 'async function ambil() { return 62000; }\nconsole.log(ambil());',
    verify: (r) => r.ok && /Promise/.test(r.stdout),
    q: { id: 'Kenapa outputnya BUKAN 62000?', en: 'Why is the output NOT 62000?' },
    options: {
      id: ['Lupa await: yang dicetak objek Promise, bukan angka', 'Fungsi async selalu error', 'console.log rusak', '62000 memang tercetak'],
      en: ['Missing await: a Promise object is printed, not the number', 'Async functions always error', 'console.log is broken', '62000 is actually printed'],
    },
  },
  {
    id: 'js-index-oob', langs: ['javascript'], run: 'node',
    need: ['[', ']'],
    code: 'const buah = ["apel", "mangga"];\nconsole.log(buah[5]);',
    verify: (r) => r.ok && r.stdout.trim() === 'undefined',
    q: { id: 'Apa output baris terakhir?', en: 'What is the last-line output?' },
    options: {
      id: ['undefined', 'null', 'Error: index out of range', '"mangga"'],
      en: ['undefined', 'null', 'Error: index out of range', '"mangga"'],
    },
  },
  {
    id: 'js-typeof-null', langs: ['javascript'], run: 'node',
    need: ['typeof', 'null'],
    code: 'console.log(typeof null);',
    verify: (r) => r.ok && r.stdout.trim() === 'object',
    q: { id: 'Apa outputnya? (jebakan klasik!)', en: 'What is the output? (classic trap!)' },
    options: {
      id: ['object', 'null', 'undefined', 'Error'],
      en: ['object', 'null', 'undefined', 'Error'],
    },
  },
  {
    id: 'py-range', langs: ['python'], run: 'python3',
    need: ['range('],
    code: 'print(list(range(3)))',
    verify: (r) => r.ok && r.stdout.trim() === '[0, 1, 2]',
    q: { id: 'Apa outputnya? (perhatikan ujung range!)', en: 'What is the output? (watch the range end!)' },
    options: {
      id: ['[0, 1, 2]', '[1, 2, 3]', '[0, 1, 2, 3]', 'Error'],
      en: ['[0, 1, 2]', '[1, 2, 3]', '[0, 1, 2, 3]', 'Error'],
    },
  },
  {
    id: 'py-floordiv', langs: ['python'], run: 'python3',
    need: ['//'],
    code: 'print(7 // 2)',
    verify: (r) => r.ok && r.stdout.trim() === '3',
    q: { id: 'Apa outputnya? (`//` bukan `/`!)', en: 'What is the output? (`//`, not `/`!)' },
    options: {
      id: ['3', '3.5', '4', 'Error'],
      en: ['3', '3.5', '4', 'Error'],
    },
  },
  {
    id: 'py-alias', langs: ['python'], run: 'python3',
    need: ['.append('],
    code: 'a = [1, 2]\nb = a\nb.append(3)\nprint(a)',
    verify: (r) => r.ok && r.stdout.trim() === '[1, 2, 3]',
    q: { id: 'Apa isi `a`? (bukan b!)', en: 'What is in `a`? (not b!)' },
    options: {
      id: ['[1, 2, 3]', '[1, 2]', '[3]', 'Error'],
      en: ['[1, 2, 3]', '[1, 2]', '[3]', 'Error'],
    },
  },
  {
    id: 'py-strmul', langs: ['python'], run: 'python3',
    need: ['*'],
    code: 'print("ab" * 3)',
    verify: (r) => r.ok && r.stdout.trim() === 'ababab',
    q: { id: 'Apa outputnya?', en: 'What is the output?' },
    options: {
      id: ['ababab', 'ab3', 'Error: tidak bisa kali string', '["ab", "ab", "ab"]'],
      en: ['ababab', 'ab3', 'Error: cannot multiply string', '["ab", "ab", "ab"]'],
    },
  },
  {
    id: 'py-none-eq', langs: ['python'], run: 'python3',
    need: ['None'],
    code: 'print(None == False)',
    verify: (r) => r.ok && r.stdout.trim() === 'False',
    q: { id: 'Apa outputnya? (jebakan!)', en: 'What is the output? (trap!)' },
    options: {
      id: ['False', 'True', 'None', 'Error'],
      en: ['False', 'True', 'None', 'Error'],
    },
  },
];

function shuffle(arr, rng) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const usedBugTemplates = new Map(); // `${slug}::${lang}` -> Set(templateId)

export function buildCodeQuestions({ slug, lang, week, level, content, rng }) {
  const out = [];
  const usedKey = `${slug}::${lang}`;
  if (!usedBugTemplates.has(usedKey)) usedBugTemplates.set(usedKey, new Set());
  const used = usedBugTemplates.get(usedKey);
  const isJS = ['javascript', 'typescript'].includes(slug);
  const isPy = slug === 'python';
  if (!isJS && !isPy) return out;

  // ── Type A: trace from the week's own program blocks (max 1) ──
  const fences = isJS ? ['javascript', 'js'] : ['python'];
  const blocks = [];
  for (const fence of fences) {
    const re = new RegExp('^```' + fence + '\\n([\\s\\S]*?)^```', 'gm');
    let m;
    while ((m = re.exec(content)) !== null) blocks.push(m[1]);
  }
  const kind = isJS ? 'js' : 'py';
  for (const rawCode of blocks) {
    const code = stripComments(rawCode, kind);
    const lines = code.split('\n');
    if (lines.length > 40 || lines.length < 3) continue;
    if (UNSAFE_RE.test(code) || NONDETERMINISTIC_RE.test(code)) continue;
    // must contain at least one print/log producing output
    if (isJS && !/console\.log/.test(code)) continue;
    if (isPy && !/print\(/.test(code)) continue;
    const runner = isJS ? 'node' : 'python3';
    // python REPL prompts break runs
    const clean = isPy ? code.replace(/^>>> |^\.\.\. /gm, '') : code;
    const built = buildTrace(lang, content, clean, runner, TRACE_Q[lang]);
    if (built) {
      const opts = shuffle([built.answer, ...built.distract], rng);
      out.push({
        type: 'mcq',
        q: TRACE_Q[lang],
        context: clean.trim().split('\n').slice(-14).join('\n'),
        options: opts,
        answer: opts.indexOf(built.answer),
        source: `week${week.week}-trace`,
      });
      break; // max 1 trace per week
    }
  }

  // ── Type B: curated bug templates gated on week content (max 1) ──
  const langKey = isJS ? 'javascript' : 'python';
  for (const tpl of BUG_TEMPLATES) {
    if (!tpl.langs.includes(langKey)) continue;
    if (used.has(tpl.id)) continue;
    if (!tpl.need.every((k) => content.includes(k))) continue;
    const res = tryRun(tpl.run, tpl.code);
    if (!res || !tpl.verify(res)) continue;
    const opts = shuffle(tpl.options[lang].slice(), rng);
    const correct = tpl.options[lang][0];
    out.push({
      type: 'mcq',
      q: tpl.q[lang],
      context: tpl.code,
      options: opts,
      answer: opts.indexOf(correct),
      source: `week${week.week}-${tpl.id}`,
    });
    used.add(tpl.id);
    break; // max 1 bug question per week
  }

  return out;
}

// ─────────────────────────────────────────────────────────────────────────────
// v3: Go + Rust trace/bug questions. Toolchains resolved best-effort; anything
// unavailable or unverifiable is skipped. Double-run determinism gate.
// ─────────────────────────────────────────────────────────────────────────────

const HOME = process.env.HOME || process.env.USERPROFILE || '/tmp';
const GO_BIN = process.env.GO_BIN || (join(HOME, 'go-dist', 'go', 'bin', 'go'));
const RUSTC_BIN = process.env.RUSTC_BIN || (join(HOME, '.cargo', 'bin', 'rustc'));
const toolCache = {};
function hasTool(kind) {
  if (!(kind in toolCache)) {
    if (kind === 'go') toolCache.go = existsSync(GO_BIN);
    if (kind === 'rustc') toolCache.rustc = existsSync(RUSTC_BIN);
  }
  return !!toolCache[kind];
}

function tryRunFile(kind, filename, code, timeoutMs = 15000) {
  let dir = null;
  try {
    dir = mkdtempSync(join(tmpdir(), 'quizcode2-'));
    const file = join(dir, filename);
    writeFileSync(file, code);
    let cmd;
    if (kind === 'go') cmd = `"${GO_BIN}" run "${file}"`;
    else if (kind === 'rustc') {
      const bin = join(dir, 'prog');
      execSync(`"${RUSTC_BIN}" --edition 2021 -o "${bin}" "${file}"`, { cwd: dir, timeout: timeoutMs, stdio: ['ignore', 'pipe', 'pipe'] });
      cmd = `"${bin}"`;
    } else return null;
    const runOnce = () => execSync(cmd, { cwd: dir, timeout: timeoutMs, stdio: ['ignore', 'pipe', 'pipe'] }).toString();
    const a = runOnce();
    const b = runOnce(); // determinism gate
    if (a !== b) return null;
    return { ok: true, stdout: a, stderr: '' };
  } catch (e) {
    const stdout = (e.stdout || '').toString();
    const stderr = (e.stderr || '').toString();
    if (e.status !== undefined && e.status !== 0 && (stdout || stderr)) {
      return { ok: false, stdout, stderr, code: e.status };
    }
    return null;
  } finally {
    if (dir) { try { rmSync(dir, { recursive: true, force: true }); } catch {} }
  }
}

const GO_UNSAFE = /ListenAndServe|for\s*\{\s*\}|select\s*\{\s*\}|for\s*;\s*;|time\.Now|time\.Since|rand\.|os\.Exit|log\.Fatal|http\.Get|http\.Post|ioutil\.|os\.Open|os\.Create|net\.Dial|exec\.Command|plugin\.|cgo|unsafe\.|runtime\.Gosched/;
const RUST_UNSAFE = /loop\s*\{\s*\}|while\s*true|std::thread::sleep|thread::spawn|std::process::exit|panic!\s*\(\s*"test|include!|env::|fs::|net::|reqwest|tokio|async fn|await|extern crate/;

function buildTraceCompiled(kind, filename, lang, code) {
  const res = tryRunFile(kind, filename, code);
  if (!res || !res.ok) return null;
  const lines = cleanLines(res.stdout).filter((l) => l.trim() !== '');
  if (!lines.length) return null;
  const answer = lines[lines.length - 1].trim();
  if (!answer || answer.length > 60) return null;
  const others = lines.slice(0, -1);
  const distract = [...numericVariants(answer), ...genericDistractors(answer, others)]
    .filter((d, i, a) => d !== answer && d.length <= 80 && a.indexOf(d) === i)
    .slice(0, 3);
  if (distract.length < 2) return null;
  return { answer, distract };
}

const TRACE_Q2 = {
  id: 'Apa output BARIS TERAKHIR program berikut?',
  en: 'What is the LAST-LINE output of the following program?',
};

const GO_RUST_BUGS = [
  {
    id: 'go-intdiv', slugs: ['golang'], kind: 'go', file: 'q.go',
    need: ['/'],
    code: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println(7 / 2)\n}\n',
    verify: (r) => r.ok && r.stdout.trim() === '3',
    q: { id: 'Apa outputnya? (`/` bilangan bulat!)', en: 'What is the output? (integer `/`!)' },
    options: {
      id: ['3', '3.5', '4', 'Error'],
      en: ['3', '3.5', '4', 'Error'],
    },
  },
  {
    id: 'go-len-bytes', slugs: ['golang'], kind: 'go', file: 'q.go',
    need: ['len('],
    code: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println(len("hallo"))\n\tfmt.Println(len("halo"))\n}\n',
    verify: (r) => r.ok && r.stdout.trim().split('\n').map((s) => s.trim()).join('|') === '5|4',
    q: { id: 'Apa output dua barisnya? (`len` hitung apa?)', en: 'What is the two-line output? (what does `len` count?)' },
    options: {
      id: ['5 lalu 4', '5 lalu 5', '4 lalu 4', 'Error'],
      en: ['5 then 4', '5 then 5', '4 then 4', 'Error'],
    },
  },
  {
    id: 'go-slice-alias', slugs: ['golang'], kind: 'go', file: 'q.go',
    need: ['append(', '[', ']'],
    code: 'package main\n\nimport "fmt"\n\nfunc main() {\n\ts := []int{1, 2}\n\tt := s\n\tt[0] = 9\n\tfmt.Println(s)\n}\n',
    verify: (r) => r.ok && r.stdout.trim() === '[9 2]',
    q: { id: 'Apa isi `s`? (bukan t!)', en: 'What is in `s`? (not t!)' },
    options: {
      id: ['[9 2]', '[1 2]', '[9]', 'Error'],
      en: ['[9 2]', '[1 2]', '[9]', 'Error'],
    },
  },
  {
    id: 'rust-immut', slugs: ['rust'], kind: 'rustc', file: 'q.rs',
    need: ['let ', 'mut'],
    code: 'fn main() {\n    let x = 5;\n    x = 6;\n    println!("{}", x);\n}\n',
    verify: (r) => !r.ok && /cannot assign/i.test(r.stderr),
    q: { id: 'Apa yang terjadi saat dikompilasi?', en: 'What happens at compile time?' },
    options: {
      id: ['Error: cannot assign (tanpa mut!)', 'Mencetak 6', 'Mencetak 5', 'Tidak terjadi apa-apa'],
      en: ['Error: cannot assign (no mut!)', 'Prints 6', 'Prints 5', 'Nothing happens'],
    },
  },
  {
    id: 'rust-move', slugs: ['rust'], kind: 'rustc', file: 'q.rs',
    need: ['String::from', 'let '],
    code: 'fn main() {\n    let s1 = String::from("halo");\n    let s2 = s1;\n    println!("{}", s1);\n}\n',
    verify: (r) => !r.ok && /borrow|move/i.test(r.stderr),
    q: { id: 'Apa yang terjadi saat dikompilasi?', en: 'What happens at compile time?' },
    options: {
      id: ['Error: s1 sudah pindah milik (borrow after move)', 'Mencetak halo', 'Mencetak kosong', 'Warning saja, tetap jalan'],
      en: ['Error: s1 moved (borrow after move)', 'Prints halo', 'Prints empty', 'Just a warning, still runs'],
    },
  },
  {
    id: 'rust-shadow', slugs: ['rust'], kind: 'rustc', file: 'q.rs',
    need: ['let '],
    code: 'fn main() {\n    let x = 5;\n    let x = x + 1;\n    println!("{}", x);\n}\n',
    verify: (r) => r.ok && r.stdout.trim() === '6',
    q: { id: 'Apa outputnya? (shadowing, bukan ubah!)', en: 'What is the output? (shadowing, not mutation!)' },
    options: {
      id: ['6', '5', 'Error: cannot assign', '11'],
      en: ['6', '5', 'Error: cannot assign', '11'],
    },
  },
];

export function buildCompiledQuestions({ slug, lang, week, content, rng }) {
  const out = [];
  const kind = slug === 'golang' ? 'go' : slug === 'rust' ? 'rustc' : null;
  if (!kind || !hasTool(kind)) return out;
  const usedKey = `${slug}::${lang}`;
  if (!usedBugTemplates.has(usedKey)) usedBugTemplates.set(usedKey, new Set());
  const used = usedBugTemplates.get(usedKey);
  const fence = slug === 'golang' ? 'go' : 'rust';
  const unsafeRe = slug === 'golang' ? GO_UNSAFE : RUST_UNSAFE;

  // trace (max 1)
  {
    const blocks = [];
    const re = new RegExp('^```' + fence + '\\n([\\s\\S]*?)^```', 'gm');
    let m;
    while ((m = re.exec(content)) !== null) blocks.push(m[1]);
    for (const code of blocks) {
      const lines = code.split('\n');
      if (lines.length > 40 || lines.length < 3) continue;
      if (unsafeRe.test(code)) continue;
      if (NONDETERMINISTIC_RE.test(code)) continue;
      const filename = slug === 'golang' ? 'main.go' : 'main.rs';
      const built = buildTraceCompiled(kind, filename, lang, code);
      if (built) {
        const opts = shuffle([built.answer, ...built.distract], rng);
        out.push({
          type: 'mcq',
          q: TRACE_Q2[lang],
          context: code.trim().split('\n').slice(-14).join('\n'),
          options: opts,
          answer: opts.indexOf(built.answer),
          source: `week${week.week}-trace2`,
        });
        break;
      }
    }
  }

  // bugs (max 1, deduped per track+lang)
  for (const tpl of GO_RUST_BUGS) {
    if (!tpl.slugs.includes(slug)) continue;
    if (used.has(tpl.id)) continue;
    if (!tpl.need.every((k) => content.includes(k))) continue;
    const res = tryRunFile(tpl.kind, tpl.file, tpl.code);
    if (!res || !tpl.verify(res)) continue;
    const opts = shuffle(tpl.options[lang].slice(), rng);
    const correct = tpl.options[lang][0];
    out.push({
      type: 'mcq',
      q: tpl.q[lang],
      context: tpl.code.trim(),
      options: opts,
      answer: opts.indexOf(correct),
      source: `week${week.week}-${tpl.id}`,
    });
    used.add(tpl.id);
    break;
  }
  return out;
}
