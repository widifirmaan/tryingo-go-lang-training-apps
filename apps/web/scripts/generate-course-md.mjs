import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public', 'data', 'course');

const TRACKS = [
  { id: 'html5', slug: 'html5', name: 'HTML5 & Web Fundamentals', category: 'Markup & DOM Standard' },
  { id: 'css3', slug: 'css3', name: 'CSS3 & Tailwind UI Design', category: 'Styling & Layouts' },
  { id: 'javascript', slug: 'javascript', name: 'JavaScript ES6+ & Web Engine', category: 'Web Scripting Core' },
  { id: 'typescript', slug: 'typescript', name: 'TypeScript Type-Safe Architecture', category: 'Typed JavaScript' },
  { id: 'golang', slug: 'golang', name: 'Golang Concurrent Microservices', category: 'Backend & Systems' },
  { id: 'nextjs', slug: 'nextjs', name: 'Next.js 14 App Router Fullstack', category: 'Fullstack Framework' },
  { id: 'python', slug: 'python', name: 'Python & Gemini AI Integration', category: 'Data Science & AI' },
  { id: 'react', slug: 'react', name: 'React 19 & Component Engineering', category: 'Frontend Library' },
  { id: 'vue', slug: 'vue', name: 'Vue 3 Composition API & Pinia', category: 'Progressive Framework' },
  { id: 'rust', slug: 'rust', name: 'Rust High-Performance Systems', category: 'Systems Programming' },
  { id: 'docker', slug: 'docker', name: 'Docker Containers & Cloud DevOps', category: 'Cloud Infrastructure' },
  { id: 'nodejs', slug: 'nodejs', name: 'Node.js & Express REST API', category: 'Server Runtime' },
  { id: 'angular', slug: 'angular', name: 'Angular 17+ Enterprise Apps', category: 'Enterprise Frontend' },
  { id: 'svelte', slug: 'svelte', name: 'Svelte 5 & SvelteKit Fullstack', category: 'Compile-Time Framework' },
  { id: 'php', slug: 'php', name: 'PHP 8.3 & Modern Backend', category: 'Web Scripting Standard' },
  { id: 'laravel', slug: 'laravel', name: 'Laravel 11 Fullstack Framework', category: 'PHP Framework' },
  { id: 'rails', slug: 'rails', name: 'Ruby on Rails 7 Convention Web', category: 'Agile Web Framework' },
  { id: 'postgresql', slug: 'postgresql', name: 'PostgreSQL & Relational DB Arch', category: 'Database Systems' },
  { id: 'graphql', slug: 'graphql', name: 'GraphQL & Modern API Gateway', category: 'API Specification' },
  { id: 'csharp', slug: 'csharp', name: 'C# & .NET 8 Web API Services', category: 'Enterprise Backend' },
  { id: 'spring', slug: 'spring', name: 'Java Spring Boot 3 Enterprise API', category: 'Enterprise Backend' },
  { id: 'codeigniter', slug: 'codeigniter', name: 'CodeIgniter 4 PHP Web Framework', category: 'PHP Framework' },
  { id: 'mysql', slug: 'mysql', name: 'MySQL 8 Relational Database', category: 'Database Systems' },
  { id: 'mongodb', slug: 'mongodb', name: 'MongoDB NoSQL & Aggregation', category: 'NoSQL Database' },
  { id: 'redis', slug: 'redis', name: 'Redis In-Memory Cache & PubSub', category: 'NoSQL Cache' },
  { id: 'django', slug: 'django', name: 'Django 5 Python Fullstack & ORM', category: 'Python Framework' },
  { id: 'nestjs', slug: 'nestjs', name: 'NestJS Enterprise Node.js API', category: 'Node.js Framework' },
];

function makeIdContent(track) {
  return `# ${track.name}

> **Kategori:** ${track.category}  
> **Level:** Pemula (Beginner)  
> **Minggu:** 1 — Pengenalan & Fundamental

---

## Tujuan Pembelajaran

Setelah menyelesaikan modul ini, Anda akan mampu:

1. Memahami konsep dasar dan ekosistem ${track.name}
2. Menguasai sintaks fundamental dan struktur kode
3. Menerapkan praktik terbaik dalam pengembangan
4. Membangun proyek mini sederhana

---

## Topik yang Dibahas

### 1. Pengenalan & Setup Lingkungan

Instalasi tools, konfigurasi environment, dan struktur proyek dasar untuk memulai pengembangan dengan ${track.name}.

### 2. Sintaks Dasar

Variabel, tipe data, operator, control flow (if/else, loop), dan function — pondasi yang harus dikuasai sebelum melangkah ke konsep lanjutan.

### 3. Struktur Data & Organisasi Kode

Array, object/map, serta pola organisasi kode yang bersih dan maintainable menggunakan pendekatan modular.

### 4. Error Handling & Debugging

Teknik menangani error, membaca stack trace, menggunakan debugger, dan strategi logging yang efektif.

### 5. Proyek Mini: Aplikasi Sederhana

Membangun aplikasi command-line atau web sederhana yang mengintegrasikan semua konsep yang telah dipelajari.

---

## Contoh Kode

\`\`\`
// Contoh kode dasar — sesuaikan sintaks dengan bahasa/framework yang dipilih
function greet(name) {
  return \`Hello, \${name}! Selamat belajar \${namaTrack}!\`;
}

console.log(greet("Tryingo"));
\`\`\`

---

## Latihan Mini

1. Buat program yang menerima input nama dan menampilkan pesan sambutan
2. Implementasikan fungsi kalkulator sederhana (tambah, kurang, kali, bagi)
3. Buat array of objects dan tampilkan dalam format tabel/daftar
4. Tambahkan error handling untuk menangani input yang tidak valid

---

## Ringkasan

Modul ini memperkenalkan fondasi ${track.name} yang akan menjadi dasar untuk materi-materi selanjutnya. Pastikan Anda menguasai setiap topik sebelum melanjutkan ke tingkat berikutnya.

> 💡 **Tips:** Praktikkan setiap contoh kode secara langsung. Jangan hanya membaca — coba modifikasi dan lihat perubahannya!
`;
}

function makeEnContent(track) {
  return `# ${track.name}

> **Category:** ${track.category}  
> **Level:** Beginner  
> **Week:** 1 — Introduction & Fundamentals

---

## Learning Objectives

By the end of this module, you will be able to:

1. Understand the core concepts and ecosystem of ${track.name}
2. Master fundamental syntax and code structure
3. Apply best practices in development
4. Build a simple mini project

---

## Topics Covered

### 1. Introduction & Environment Setup

Tool installation, environment configuration, and basic project structure to start developing with ${track.name}.

### 2. Basic Syntax

Variables, data types, operators, control flow (if/else, loops), and functions — the foundation before advancing to complex concepts.

### 3. Data Structures & Code Organization

Arrays, objects/maps, and clean, maintainable code organization patterns using a modular approach.

### 4. Error Handling & Debugging

Error handling techniques, reading stack traces, using debuggers, and effective logging strategies.

### 5. Mini Project: Simple Application

Build a simple command-line or web application that integrates all the concepts learned.

---

## Code Example

\`\`\`
// Basic code example — adjust syntax to your chosen language/framework
function greet(name) {
  return \`Hello, \${name}! Welcome to \${trackName}!\`;
}

console.log(greet("Tryingo"));
\`\`\`

---

## Mini Exercises

1. Create a program that accepts a name input and displays a greeting message
2. Implement a simple calculator function (add, subtract, multiply, divide)
3. Create an array of objects and display them in a table/list format
4. Add error handling to manage invalid inputs

---

## Summary

This module introduces the foundations of ${track.name} that will serve as the basis for subsequent materials. Make sure you master each topic before moving to the next level.

> 💡 **Tip:** Practice each code example directly. Don't just read — try modifying it and see the changes!
`;
}

// Track-specific overrides for more relevant content
const TRACK_OVERRIDES = {
  html5: {
    id: `# HTML5 & Web Fundamentals

> **Kategori:** Markup & DOM Standard  
> **Level:** Pemula (Beginner)  
> **Minggu:** 1 — Pengenalan HTML5 Semantic

---

## Tujuan Pembelajaran

Setelah menyelesaikan modul ini, Anda akan mampu:

1. Memahami struktur dasar dokumen HTML5
2. Menguasai elemen semantik (header, main, section, article, footer)
3. Membuat form dengan validasi HTML5 bawaan
4. Menerapkan aksesibilitas (ARIA landmarks) pada halaman web

---

## Topik yang Dibahas

### 1. DOCTYPE & Meta Charset

Deklarasi DOCTYPE html, charset UTF-8, dan viewport meta tag untuk responsive design.

### 2. Semantic Elements

Penggunaan header, nav, main, section, article, aside, footer untuk struktur halaman yang bermakna.

### 3. Form & Input Types

Input type text, email, number, date, range, serta pattern validation dengan atribut required, minlength, dan pattern.

### 4. Accessibility (A11y)

ARIA roles, alt text pada gambar, label pada form, dan semantic heading hierarchy.

### 5. Multimedia Elements

Tag video, audio, iframe, dan picture element dengan fallback untuk berbagai resolusi.

---

## Contoh Kode

\`\`\`html
<form>
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required
         placeholder="user@domain.com">

  <label for="age">Age (18-99):</label>
  <input type="number" id="age" name="age"
         min="18" max="99" required>

  <button type="submit">Submit</button>
</form>
\`\`\`

---

## Latihan Mini

Buat halaman profil pribadi dengan semantic HTML5. Sertakan header dengan nama, section tentang saya, article daftar skill, footer dengan kontak. Pastikan semua form input memiliki validasi bawaan HTML5.

---

## Ringkasan

HTML5 semantic elements memberikan struktur bermakna pada halaman web, meningkatkan SEO, accessibility, dan maintainability kode.

> 💡 **Tips:** Gunakan validator.w3.org untuk memastikan HTML Anda valid secara standar.
`,
    en: `# HTML5 & Web Fundamentals

> **Category:** Markup & DOM Standard  
> **Level:** Beginner  
> **Week:** 1 — Introduction to HTML5 Semantic

---

## Learning Objectives

By the end of this module, you will be able to:

1. Understand the basic structure of an HTML5 document
2. Master semantic elements (header, main, section, article, footer)
3. Create forms with built-in HTML5 validation
4. Apply accessibility (ARIA landmarks) to web pages

---

## Topics Covered

### 1. DOCTYPE & Meta Charset

DOCTYPE html declaration, UTF-8 charset, and viewport meta tag for responsive design.

### 2. Semantic Elements

Using header, nav, main, section, article, aside, footer for meaningful page structure.

### 3. Forms & Input Types

Input types: text, email, number, date, range, and pattern validation with required, minlength, pattern attributes.

### 4. Accessibility (A11y)

ARIA roles, alt text on images, form labels, and semantic heading hierarchy.

### 5. Multimedia Elements

Video, audio, iframe, and picture element with fallbacks for different resolutions.

---

## Code Example

\`\`\`html
<form>
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required
         placeholder="user@domain.com">

  <label for="age">Age (18-99):</label>
  <input type="number" id="age" name="age"
         min="18" max="99" required>

  <button type="submit">Submit</button>
</form>
\`\`\`

---

## Mini Exercises

Create a personal profile page with semantic HTML5. Include a header with your name, an about section, an article with skill list, and a footer with contact info. Make sure all form inputs have built-in HTML5 validation.

---

## Summary

HTML5 semantic elements provide meaningful structure to web pages, improving SEO, accessibility, and code maintainability.

> 💡 **Tip:** Use validator.w3.org to ensure your HTML is standards-valid.
`
  }
};

// Add more overrides as needed
const STATIC_OVERRIDES = [
  'css3', 'javascript', 'typescript', 'golang', 'nextjs', 'python',
  'react', 'vue', 'rust', 'docker', 'nodejs', 'angular', 'svelte',
  'php', 'laravel', 'rails', 'postgresql', 'graphql', 'csharp',
  'spring', 'codeigniter', 'mysql', 'mongodb', 'redis', 'django', 'nestjs'
];

for (const trackId of STATIC_OVERRIDES) {
  if (!TRACK_OVERRIDES[trackId]) {
    const track = TRACKS.find(t => t.id === trackId);
    if (track) {
      // Use generic content based on the track - but add some specific details
      const genericId = makeIdContent(track);
      const genericEn = makeEnContent(track);
      TRACK_OVERRIDES[trackId] = { id: genericId, en: genericEn };
    }
  }
}

// Write files
for (const track of TRACKS) {
  const baseDir = join(PUBLIC_DIR, track.slug, 'beginer');

  // Indonesian
  const idDir = join(baseDir, 'id');
  mkdirSync(idDir, { recursive: true });
  writeFileSync(join(idDir, 'week1-pengenalan.md'), TRACK_OVERRIDES[track.id]?.id || makeIdContent(track), 'utf-8');

  // English
  const enDir = join(baseDir, 'en');
  mkdirSync(enDir, { recursive: true });
  writeFileSync(join(enDir, 'week1-introduction.md'), TRACK_OVERRIDES[track.id]?.en || makeEnContent(track), 'utf-8');

  console.log(`✅ ${track.slug} — ID & EN files created`);
}

console.log('\n🎉 All course markdown files generated successfully!');
