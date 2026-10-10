import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { QUICK_START_GUIDES } from '../src/data/quickStartData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve(__dirname, '../public/data/course');

const LANG_FENCE_MAP = {
  nextjs: 'tsx',
  react: 'tsx',
  vue: 'vue',
  svelte: 'svelte',
  angular: 'ts',
  nestjs: 'ts',
  nodejs: 'js',
  typescript: 'ts',
  javascript: 'js',
  html5: 'html',
  css3: 'css',
  tailwind: 'html',
  golang: 'go',
  rust: 'rust',
  python: 'py',
  django: 'py',
  csharp: 'csharp',
  spring: 'java',
  docker: 'dockerfile',
  postgresql: 'sql',
  mysql: 'sql',
  mongodb: 'js',
  redis: 'text',
  graphql: 'graphql',
  php: 'php',
  laravel: 'php',
  codeigniter4: 'php',
  rails: 'ruby',
};

function buildMarkdownSection(guide, lang) {
  const isId = lang === 'id';
  const fence = LANG_FENCE_MAP[guide.slug] || 'text';

  if (isId) {
    const extList = guide.vscode.recommendedExtensions
      .map(ext => `- **${ext.name}** (\`${ext.id}\`): ${ext.descriptionId}`)
      .join('\n');
    const proTips = guide.proTipsId
      .map(tip => `- ${tip}`)
      .join('\n');

    return `## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
${extList}

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
\`\`\`bash
${guide.vscode.cliInstallCommand}
\`\`\`

---

### 2. Instalasi Runtime & Dependency (${guide.installRuntime.name})
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
\`\`\`powershell
${guide.installRuntime.command.windows}
\`\`\`

**macOS (Terminal / Homebrew):**
\`\`\`bash
${guide.installRuntime.command.macos}
\`\`\`

**Linux (Ubuntu/Debian / bash):**
\`\`\`bash
${guide.installRuntime.command.linux}
\`\`\`

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
\`\`\`bash
${guide.installRuntime.verifyCommand}
\`\`\`

Output yang diharapkan:
\`\`\`output
${guide.installRuntime.expectedOutput}
\`\`\`

> 💡 **Tips Prasyarat:** ${guide.installRuntime.tipsId}

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

\`\`\`bash
${guide.createProject.command}
\`\`\`
- **Keterangan:** ${guide.createProject.explanationId}
- **Pindah ke direktori project:**
\`\`\`bash
${guide.createProject.cdCommand}
\`\`\`

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

\`\`\`bash
${guide.runProject.command}
\`\`\`
Akses di browser atau terminal: \`${guide.runProject.localUrl}\`

> ℹ️ ${guide.runProject.outputNoteId}

**File Titik Masuk Utama (\`${guide.starterFile.filename}\`):**
\`\`\`${fence}
${guide.starterFile.code}
\`\`\`
${guide.starterFile.descriptionId}

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

\`\`\`text
${guide.projectStructure.tree}
\`\`\`
${guide.projectStructure.summaryId}

---

### 6. Tips & Best Practice untuk Pemula
${proTips}`;
  } else {
    const extList = guide.vscode.recommendedExtensions
      .map(ext => `- **${ext.name}** (\`${ext.id}\`): ${ext.descriptionEn}`)
      .join('\n');
    const proTips = guide.proTipsEn
      .map(tip => `- ${tip}`)
      .join('\n');

    return `## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
${extList}

Or install all recommended extensions at once via terminal:
\`\`\`bash
${guide.vscode.cliInstallCommand}
\`\`\`

---

### 2. Runtime & Dependency Installation (${guide.installRuntime.name})
Make sure the required runtime or SDK is installed on your machine:

**Windows (PowerShell):**
\`\`\`powershell
${guide.installRuntime.command.windows}
\`\`\`

**macOS (Terminal / Homebrew):**
\`\`\`bash
${guide.installRuntime.command.macos}
\`\`\`

**Linux (Ubuntu/Debian / bash):**
\`\`\`bash
${guide.installRuntime.command.linux}
\`\`\`

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
\`\`\`bash
${guide.installRuntime.verifyCommand}
\`\`\`

Expected output:
\`\`\`output
${guide.installRuntime.expectedOutput}
\`\`\`

> 💡 **Prerequisite Note:** ${guide.installRuntime.tipsEn}

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

\`\`\`bash
${guide.createProject.command}
\`\`\`
- **Details:** ${guide.createProject.explanationEn}
- **Navigate to the project directory:**
\`\`\`bash
${guide.createProject.cdCommand}
\`\`\`

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

\`\`\`bash
${guide.runProject.command}
\`\`\`
Open in browser or terminal: \`${guide.runProject.localUrl}\`

> ℹ️ ${guide.runProject.outputNoteEn}

**Initial Entry File (\`${guide.starterFile.filename}\`):**
\`\`\`${fence}
${guide.starterFile.code}
\`\`\`
${guide.starterFile.descriptionEn}

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

\`\`\`text
${guide.projectStructure.tree}
\`\`\`
${guide.projectStructure.summaryEn}

---

### 6. Beginner Tips & Best Practices
${proTips}`;
  }
}

function processWeek1File(filePath, guide, lang) {
  let content = fs.readFileSync(filePath, 'utf8');
  const sectionMd = buildMarkdownSection(guide, lang);

  const idHeader = '## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project';
  const enHeader = '## Quick Start Guide: Setup & Project Initialization';
  const targetHeader = lang === 'id' ? idHeader : enHeader;

  const programIdx = content.indexOf('## Program:');
  if (programIdx === -1) {
    console.warn(`[WARN] No "## Program:" found in ${filePath}`);
    return 'skipped';
  }

  // Check if targetHeader is already present
  const existingHeaderIdx = content.indexOf(targetHeader);
  if (existingHeaderIdx !== -1 && existingHeaderIdx < programIdx) {
    const prefix = content.slice(0, existingHeaderIdx).trimEnd();
    const suffix = content.slice(programIdx).trimStart();
    content = `${prefix}\n\n${sectionMd}\n\n---\n\n${suffix}`;
    fs.writeFileSync(filePath, content, 'utf8');
    return 'updated';
  }

  // Not yet present: insert right before ## Program:
  const beforeProgram = content.slice(0, programIdx);
  const afterProgram = content.slice(programIdx);
  const lastDividerIdx = beforeProgram.lastIndexOf('---');

  if (lastDividerIdx !== -1) {
    const beforeDivider = beforeProgram.slice(0, lastDividerIdx).trimEnd();
    content = `${beforeDivider}\n\n---\n\n${sectionMd}\n\n---\n\n${afterProgram.trimStart()}`;
  } else {
    content = `${beforeProgram.trimEnd()}\n\n---\n\n${sectionMd}\n\n---\n\n${afterProgram.trimStart()}`;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  return 'injected';
}

function run() {
  let totalProcessed = 0;
  const slugs = Object.keys(QUICK_START_GUIDES);
  console.log(`Starting Quick Start injection across ${slugs.length} stacks...`);

  for (const slug of slugs) {
    const guide = QUICK_START_GUIDES[slug];
    for (const lang of ['id', 'en']) {
      const dirPath = path.join(baseDir, slug, 'beginer', lang);
      if (!fs.existsSync(dirPath)) {
        console.warn(`[MISSING DIR] ${dirPath}`);
        continue;
      }

      const files = fs.readdirSync(dirPath).filter(f => f.startsWith('week1-') && f.endsWith('.md'));
      if (files.length === 0) {
        console.warn(`[NO WEEK1 FILE] ${dirPath}`);
        continue;
      }

      const week1File = path.join(dirPath, files[0]);
      const status = processWeek1File(week1File, guide, lang);
      console.log(`[${status.toUpperCase()}] ${slug} (${lang}): ${files[0]}`);
      totalProcessed++;
    }
  }

  console.log(`\nDone! Successfully processed ${totalProcessed} Week 1 markdown files.`);
}

run();
