/**
 * Tryngo Full Curriculum Generator
 * 
 * Generates comprehensive bootcamp-style curriculum for all 27 tracks
 * From absolute beginner to professional (16 weeks per track)
 * 
 * Run: node scripts/generate-full-curriculum.mjs
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public', 'data', 'course');

// ============================================================================
// TRACK CONFIGURATION
// ============================================================================

const TRACKS = [
  { id: 'html5', name: 'HTML5 & Web Fundamentals', category: 'Markup & DOM Standard' },
  { id: 'css3', name: 'CSS3 & Tailwind UI Design', category: 'Styling & Layouts' },
  { id: 'javascript', name: 'JavaScript ES6+ & Web Engine', category: 'Web Scripting Core' },
  { id: 'typescript', name: 'TypeScript Type-Safe Architecture', category: 'Typed JavaScript' },
  { id: 'golang', name: 'Golang Concurrent Microservices', category: 'Backend & Systems' },
  { id: 'nextjs', name: 'Next.js 14 App Router Fullstack', category: 'Fullstack Framework' },
  { id: 'python', name: 'Python & Gemini AI Integration', category: 'Data Science & AI' },
  { id: 'react', name: 'React 19 & Component Engineering', category: 'Frontend Library' },
  { id: 'vue', name: 'Vue 3 Composition API & Pinia', category: 'Progressive Framework' },
  { id: 'rust', name: 'Rust High-Performance Systems', category: 'Systems Programming' },
  { id: 'docker', name: 'Docker Containers & Cloud DevOps', category: 'Cloud Infrastructure' },
  { id: 'nodejs', name: 'Node.js & Express REST API', category: 'Server Runtime' },
  { id: 'angular', name: 'Angular 17+ Enterprise Apps', category: 'Enterprise Frontend' },
  { id: 'svelte', name: 'Svelte 5 & SvelteKit Fullstack', category: 'Compile-Time Framework' },
  { id: 'php', name: 'PHP 8.3 & Modern Backend', category: 'Web Scripting Standard' },
  { id: 'laravel', name: 'Laravel 11 Fullstack Framework', category: 'PHP Framework' },
  { id: 'rails', name: 'Ruby on Rails 7 Convention Web', category: 'Agile Web Framework' },
  { id: 'postgresql', name: 'PostgreSQL & Relational DB Arch', category: 'Database Systems' },
  { id: 'graphql', name: 'GraphQL & Modern API Gateway', category: 'API Specification' },
  { id: 'csharp', name: 'C# & .NET 8 Web API Services', category: 'Enterprise Backend' },
  { id: 'spring', name: 'Java Spring Boot 3 Enterprise API', category: 'Enterprise Backend' },
  { id: 'codeigniter', name: 'CodeIgniter 4 PHP Web Framework', category: 'PHP Framework' },
  { id: 'mysql', name: 'MySQL 8 Relational Database', category: 'Database Systems' },
  { id: 'mongodb', name: 'MongoDB NoSQL & Aggregation', category: 'NoSQL Database' },
  { id: 'redis', name: 'Redis In-Memory Cache & PubSub', category: 'NoSQL Cache' },
  { id: 'django', name: 'Django 5 Python Fullstack & ORM', category: 'Python Framework' },
  { id: 'nestjs', name: 'NestJS Enterprise Node.js API', category: 'Node.js Framework' },
];

// ============================================================================
// CURRICULUM DEFINITIONS
// ============================================================================

const LEVELS = [
  {
    id: 'beginer',
    name: { id: 'Pemula', en: 'Beginner' },
    desc: { id: 'Tidak perlu pengalaman coding. Mulai dari nol.', en: 'No coding experience needed. Start from zero.' },
    weeks: [
      { num: 1, topic: { id: 'pengenalan', en: 'introduction' }, 
        title: { id: 'Pengenalan & Persiapan Lingkungan', en: 'Introduction & Environment Setup' } },
      { num: 2, topic: { id: 'dasar-pemrograman', en: 'programming-basics' },
        title: { id: 'Dasar-dasar Pemrograman', en: 'Programming Fundamentals' } },
      { num: 3, topic: { id: 'struktur-data', en: 'data-structures' },
        title: { id: 'Struktur Data & Algoritma Dasar', en: 'Data Structures & Basic Algorithms' } },
      { num: 4, topic: { id: 'proyek-mini', en: 'mini-project' },
        title: { id: 'Proyek Mini: Aplikasi Pertama', en: 'Mini Project: First Application' } },
    ]
  },
  {
    id: 'intermediate',
    name: { id: 'Menengah', en: 'Intermediate' },
    desc: { id: 'Sudah bisa coding dasar. Saatnya naik level.', en: 'Already know basics. Time to level up.' },
    weeks: [
      { num: 5, topic: { id: 'konsep-lanjutan', en: 'advanced-concepts' },
        title: { id: 'Konsep Lanjutan', en: 'Advanced Concepts' } },
      { num: 6, topic: { id: 'api-integrasi', en: 'api-integration' },
        title: { id: 'API & Integrasi', en: 'API & Integration' } },
      { num: 7, topic: { id: 'database', en: 'database' },
        title: { id: 'Database & Penyimpanan', en: 'Database & Storage' } },
      { num: 8, topic: { id: 'testing', en: 'testing' },
        title: { id: 'Testing & Debugging', en: 'Testing & Debugging' } },
    ]
  },
  {
    id: 'advanced',
    name: { id: 'Lanjutan', en: 'Advanced' },
    desc: { id: 'Konsep kompleks dan arsitektur enterprise.', en: 'Complex concepts and enterprise architecture.' },
    weeks: [
      { num: 9, topic: { id: 'arsitektur', en: 'architecture' },
        title: { id: 'Arsitektur & Pattern', en: 'Architecture & Patterns' } },
      { num: 10, topic: { id: 'performansi', en: 'performance' },
        title: { id: 'Optimasi Performansi', en: 'Performance Optimization' } },
      { num: 11, topic: { id: 'keamanan', en: 'security' },
        title: { id: 'Keamanan Aplikasi', en: 'Application Security' } },
      { num: 12, topic: { id: 'deployment', en: 'deployment' },
        title: { id: 'Deployment & CI/CD', en: 'Deployment & CI/CD' } },
    ]
  },
  {
    id: 'pro',
    name: { id: 'Profesional', en: 'Professional' },
    desc: { id: 'Siap kerja di industri teknologi.', en: 'Ready for the tech industry.' },
    weeks: [
      { num: 13, topic: { id: 'microservices', en: 'microservices' },
        title: { id: 'Microservices & Skalabilitas', en: 'Microservices & Scalability' } },
      { num: 14, topic: { id: 'system-design', en: 'system-design' },
        title: { id: 'System Design & Architecture', en: 'System Design & Architecture' } },
      { num: 15, topic: { id: 'devops', en: 'devops' },
        title: { id: 'DevOps & Monitoring', en: 'DevOps & Monitoring' } },
      { num: 16, topic: { id: 'final-project', en: 'final-project' },
        title: { id: 'Proyek Akhir: Production App', en: 'Final Project: Production App' } },
    ]
  },
];

// ============================================================================
// CONTENT GENERATORS
// ============================================================================

function generateWeekContent(track, level, week, lang) {
  const isId = lang === 'id';
  const lvlName = LEVELS.find(l => l.id === level.id)?.name?.[lang] || level.id;
  const weekTitle = week.title[lang];
  const trackName = track.name;

  if (isId) {
    return generateIdContent(track, level, week, lvlName, weekTitle);
  } else {
    return generateEnContent(track, level, week, lvlName, weekTitle);
  }
}

function generateIdContent(track, level, week, lvlName, weekTitle) {
  return `# ${track.name}

> **Kategori:** ${track.category}  
> **Level:** ${lvlName}  
> **Minggu ${week.num}:** ${weekTitle}

---

## 📋 Tujuan Pembelajaran

Setelah menyelesaikan modul ini, Anda akan mampu:

1. Memahami dan menerapkan konsep **${weekTitle.toLowerCase()}** dalam ${track.name}
2. Menulis kode ${track.name} yang bersih dan terstruktur
3. Mendebug error dan menyelesaikan masalah secara mandiri
4. Membangun komponen/aplikasi sesuai praktik terbaik industri

---

## 📚 Materi yang Akan Dipelajari

### 1. Pengantar ${weekTitle}

Konsep fundamental ${weekTitle.toLowerCase()} sangat penting untuk dikuasai. Pada sesi ini, kita akan membahas:

- **Apa itu ${weekTitle.toLowerCase()}** — Definisi dan pentingnya dalam ${track.name}
- **Kapan menggunakannya** — Skenario nyata di industri
- **Bagaimana implementasinya** — Pendekatan step-by-step

### 2. Implementasi Dasar

\`\`\`
// ${track.name} — ${weekTitle}
// Contoh implementasi dasar
// (Sesuaikan sintaks sesuai bahasa/framework)

function contohImplementasi() {
  const pesan = "Halo, Tryngo!";
  console.log(pesan);
  return pesan;
}
\`\`\`

**Penjelasan:**
- Baris 1-3: Komentar dokumentasi
- Baris 5: Deklarasi fungsi
- Baris 6: Inisialisasi variabel
- Baris 7: Output ke konsol
- Baris 8: Return value

### 3. Praktik Terbaik

- **Gunakan naming convention yang konsisten** — camelCase, PascalCase, atau snake_case sesuai standar bahasa
- **Tulis kode yang self-documenting** — Nama variabel dan fungsi yang jelas
- **Pisahkan tanggung jawab** — Satu fungsi melakukan satu hal
- **Handle edge cases** — Selalu pikirkan kondisi batas

### 4. Error yang Sering Terjadi

| Error | Penyebab | Solusi |
|-------|----------|--------|
| Syntax Error | Salah penulisan sintaks | Periksa tanda kurung, titik koma |
| Reference Error | Variabel tidak didefinisikan | Pastikan variabel sudah dideklarasikan |
| Type Error | Tipe data tidak sesuai | Gunakan type checking |

---

## 💻 Latihan Praktik

### Latihan 1: Implementasi Sederhana
Buat fungsi yang menerima input dan mengembalikan output sesuai spesifikasi.

\`\`\'
// TODO: Tulis kode Anda di sini
// 1. Buat fungsi dengan parameter input
// 2. Proses input tersebut
// 3. Kembalikan hasilnya
\`\`\'

### Latihan 2: Debugging
Perbaiki kode berikut yang memiliki error:

\`\`\'
// Kode bermasalah — temukan dan perbaiki errornya
function hitungLuas(panjang, lebar) {
  return panjang * lebar
}

console.log(hitungLuas(5, "10")) // Hasil tidak sesuai
\`\`\'

### Latihan 3: Refactoring
Refactor kode berikut agar lebih bersih dan efisien:

\`\`\'
// Kode yang perlu di-refactor
function a(x) {
  if(x > 0) { return "positif"; }
  else if(x < 0) { return "negatif"; }
  else { return "nol"; }
}
\`\`\`

---

## 🏗️ Tugas Proyek

Buat aplikasi sederhana yang mengimplementasikan semua konsep yang dipelajari minggu ini:

### Spesifikasi:
1. Gunakan struktur kode yang bersih dan terorganisir
2. Implementasikan minimal 3 fungsi dengan tanggung jawab berbeda
3. Tambahkan error handling untuk input yang tidak valid
4. Berikan komentar pada bagian-bagian penting

### Kriteria Penilaian:
- ✅ Kode berjalan tanpa error
- ✅ Menggunakan konsep yang dipelajari
- ✅ Struktur kode rapi dan konsisten
- ✅ Dokumentasi minimal

---

## 📖 Ringkasan

Minggu ini kita telah mempelajari **${weekTitle.toLowerCase()}** dalam ${track.name}.

### Poin Penting:
1. ${weekTitle} adalah fondasi penting dalam ${track.name}
2. Praktik terbaik membantu menulis kode yang maintainable
3. Debugging adalah skill yang harus terus dilatih
4. Proyek mini mengkonsolidasikan pemahaman

### 🔗 Sumber Belajar Tambahan:
- Dokumentasi resmi ${track.name}
- Tryngo Playground — coba kode secara langsung
- Forum diskusi untuk tanya jawab

> **💡 Tips:** Jangan hanya membaca — **PRAKTIKKAN LANGSUNG**! Setiap konsep harus dicoba dengan menulis kode sendiri. Gunakan Tryngo Playground untuk bereksperimen tanpa takut error.

---

**Selamat belajar!** Lanjutkan ke Minggu ${week.num + 1} setelah menguasai materi ini. 🚀
`;
}

function generateEnContent(track, level, week, lvlName, weekTitle) {
  return `# ${track.name}

> **Category:** ${track.category}  
> **Level:** ${lvlName}  
> **Week ${week.num}:** ${weekTitle}

---

## 📋 Learning Objectives

By the end of this module, you will be able to:

1. Understand and apply **${weekTitle.toLowerCase()}** concepts in ${track.name}
2. Write clean and well-structured ${track.name} code
3. Debug errors and solve problems independently
4. Build components/applications following industry best practices

---

## 📚 Materials

### 1. Introduction to ${weekTitle}

The fundamental concepts of ${weekTitle.toLowerCase()} are essential to master. In this session, we will cover:

- **What is ${weekTitle.toLowerCase()}** — Definition and importance in ${track.name}
- **When to use it** — Real-world industry scenarios
- **How to implement it** — Step-by-step approach

### 2. Basic Implementation

\`\`\`
// ${track.name} — ${weekTitle}
// Basic implementation example
// (Adjust syntax to your language/framework)

function exampleImplementation() {
  const message = "Hello, Tryngo!";
  console.log(message);
  return message;
}
\`\`\`

**Explanation:**
- Lines 1-3: Documentation comments
- Line 5: Function declaration
- Line 6: Variable initialization
- Line 7: Console output
- Line 8: Return value

### 3. Best Practices

- **Use consistent naming conventions** — camelCase, PascalCase, or snake_case per language standards
- **Write self-documenting code** — Clear variable and function names
- **Separate responsibilities** — One function does one thing
- **Handle edge cases** — Always think about boundary conditions

### 4. Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| Syntax Error | Incorrect syntax | Check brackets, semicolons |
| Reference Error | Variable not defined | Ensure variable is declared |
| Type Error | Incorrect data type | Use type checking |

---

## 💻 Practice Exercises

### Exercise 1: Simple Implementation
Create a function that accepts input and returns output per specifications.

\`\`\'
// TODO: Write your code here
// 1. Create a function with input parameters
// 2. Process the input
// 3. Return the result
\`\`\`

### Exercise 2: Debugging
Fix the following code that contains errors:

\`\`\'
// Buggy code — find and fix the errors
function calculateArea(length, width) {
  return length * width
}

console.log(calculateArea(5, "10")) // Unexpected result
\`\`\`

### Exercise 3: Refactoring
Refactor the following code to be cleaner and more efficient:

\`\`\'
// Code that needs refactoring
function a(x) {
  if(x > 0) { return "positive"; }
  else if(x < 0) { return "negative"; }
  else { return "zero"; }
}
\`\`\`

---

## 🏗️ Project Task

Build a simple application that implements all concepts learned this week:

### Specifications:
1. Use clean, organized code structure
2. Implement at least 3 functions with different responsibilities
3. Add error handling for invalid input
4. Comment important sections

### Evaluation Criteria:
- ✅ Code runs without errors
- ✅ Uses concepts learned
- ✅ Clean and consistent code structure
- ✅ Basic documentation

---

## 📖 Summary

This week we learned about **${weekTitle.toLowerCase()}** in ${track.name}.

### Key Points:
1. ${weekTitle} is an important foundation in ${track.name}
2. Best practices help write maintainable code
3. Debugging is a skill that must be continuously practiced
4. Mini projects consolidate understanding

### 🔗 Additional Resources:
- ${track.name} official documentation
- Tryngo Playground — try code directly
- Discussion forum for Q&A

> **💡 Tip:** Don't just read — **PRACTICE DIRECTLY**! Every concept should be tried by writing your own code. Use the Tryngo Playground to experiment without fear of errors.

---

**Happy learning!** Continue to Week ${week.num + 1} after mastering this material. 🚀
`;
}

// ============================================================================
// CUSTOM CONTENT FOR HTML5 & GOLANG (featured tracks)
// ============================================================================

const FEATURED_HTML5 = {
  beginer: {
    1: {
      id: `# HTML5 & Web Fundamentals

> **Kategori:** Markup & DOM Standard  
> **Level:** Pemula  
> **Minggu 1:** Pengenalan HTML5 & Alat yang Dibutuhkan

---

## 📋 Tujuan Pembelajaran

Setelah menyelesaikan modul ini, Anda akan mampu:

1. **Memahami apa itu HTML5 dan cara kerja web** — dari nol!
2. **Menginstal dan mengkonfigurasi alat pengembangan** (code editor, browser)
3. **Menulis halaman HTML5 pertama** dengan struktur yang benar
4. **Menggunakan semantic elements** untuk halaman yang bermakna
5. **Membuat form** dengan validasi HTML5 bawaan

---

## 🖥️ Sebelum Mulai: Alat yang Dibutuhkan

### 1. Web Browser (Sudah punya! ✅)
Anda sudah punya browser untuk melihat hasilnya. Rekomendasi:
- **Google Chrome** (disarankan) — Download di [google.com/chrome](https://google.com/chrome)
- **Mozilla Firefox** — Alternatif gratis

### 2. Code Editor (Yang ini perlu diinstal)
Code editor adalah aplikasi untuk menulis kode. Seperti Microsoft Word, tapi untuk kode.

**Rekomendasi: Visual Studio Code (VS Code)**
- Download gratis di [code.visualstudio.com](https://code.visualstudio.com)
- Install seperti aplikasi biasa (Next > Next > Finish)
- **WAJIB install ekstensi ini:**
  1. Buka VS Code
  2. Klik ikon kotak-kotak di kiri (Extensions) atau tekan \`Ctrl+Shift+X\`
  3. Cari dan install "Live Server" oleh Ritwick Dey
  4. Cari dan install "HTML CSS Support"

### 3. Git (Opsional untuk sekarang)
Git adalah alat untuk menyimpan riwayat kode. Kita akan pelajari nanti.

### 4. Tryngo Playground
Bisa langsung dicoba di browser tanpa install apapun! Klik tombol "Coba Sendiri" di setiap materi.

---

## 🌐 Bagaimana Web Bekerja? (Penjelasan Sederhana)

Bayangkan web seperti restoran:
- **Browser** = Anda (pelanggan)
- **Server** = Koki di dapur
- **HTML** = Struktur meja, kursi, piring (kerangka)
- **CSS** = Dekorasi, warna taplak, pencahayaan (tampilan)
- **JavaScript** = Pelayan yang membawa pesanan (interaksi)

HTML adalah **kerangka** dari setiap halaman web. Tanpa HTML, web tidak punya struktur.

---

## 📝 Dokumen HTML5 Pertama Anda

Buka VS Code, buat file baru bernama \`index.html\`, dan ketik:

\`\`\`html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Halaman Pertamaku</title>
</head>
<body>
  <h1>Halo, Dunia! 🌍</h1>
  <p>Ini adalah halaman HTML pertama saya.</p>
</body>
</html>
\`\`\`

### Cara Melihat Hasilnya

**Cara 1: Buka Langsung di Browser**
- Klik kanan file \`index.html\` > Open with > Chrome

**Cara 2: Live Server (Lebih baik, otomatis reload)**
- Klik kanan di dalam file > "Open with Live Server"
- Halaman akan otomatis terbuka di browser
- Setiap kali Anda simpan (\`Ctrl+S\`), browser otomatis refresh!

### Penjelasan Kode:

| Kode | Artinya |
|------|---------|
| \`<!DOCTYPE html>\` | Memberi tahu browser: "Ini dokumen HTML5" |
| \`<html>\` | Pembungkus semua konten |
| \`<head>\` | Informasi tentang halaman (metadata) |
| \`<meta charset="UTF-8">\` | Agar bisa pakai huruf Indonesia (é, ñ, dll) |
| \`<title>\` | Judul di tab browser |
| \`<body>\` | Semua yang terlihat di halaman |
| \`<h1>\` | Heading/judul utama (paling besar) |
| \`<p>\` | Paragraf |

---

## 🏗️ Semantic Elements HTML5

HTML5 memperkenalkan elemen yang **memberi makna** pada struktur halaman:

\`\`\`html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Website Saya</title>
</head>
<body>
  <!-- Header: Bagian atas halaman -->
  <header>
    <h1>Website Saya</h1>
    <nav>
      <a href="#">Beranda</a>
      <a href="#">Tentang</a>
      <a href="#">Kontak</a>
    </nav>
  </header>

  <!-- Main: Konten utama -->
  <main>
    <section>
      <h2>Tentang Saya</h2>
      <p>Saya sedang belajar HTML5 di Tryngo!</p>
    </section>

    <article>
      <h3>Artikel Pertama</h3>
      <p>Ini adalah artikel. Bisa untuk blog, berita, dll.</p>
    </article>
  </main>

  <!-- Footer: Bagian bawah -->
  <footer>
    <p>&copy; 2026 Belajar HTML5 di Tryngo</p>
  </footer>
</body>
</html>
\`\`\`

### Fungsi Masing-masing Elemen:

| Elemen | Fungsi |
|--------|--------|
| \`<header>\` | Bagian atas (logo, navigasi) |
| \`<nav>\` | Menu navigasi |
| \`<main>\` | Konten utama halaman |
| \`<section>\` | Bagian/segmen dalam halaman |
| \`<article>\` | Konten independen (artikel, post) |
| \`<aside>\` | Konten sampingan (sidebar) |
| \`<footer>\` | Bagian bawah (copyright, kontak) |

> **💡 Kenapa penting?** Semantic elements membantu:
> - **SEO**: Google lebih mudah memahami halaman Anda
> - **Accessibility**: Pembaca layar untuk tuna netra bisa navigasi
> - **Maintainability**: Kode lebih mudah dibaca

---

## 📝 Form dengan Validasi HTML5

Form digunakan untuk mengumpulkan input dari pengguna:

\`\`\`html
<form>
  <div>
    <label for="nama">Nama Lengkap:</label>
    <input type="text" id="nama" name="nama" required
           placeholder="Masukkan nama Anda">
  </div>

  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required
           placeholder="contoh@email.com">
  </div>

  <div>
    <label for="usia">Usia (18-99):</label>
    <input type="number" id="usia" name="usia"
           min="18" max="99" required>
  </div>

  <div>
    <label for="pesan">Pesan:</label>
    <textarea id="pesan" name="pesan" rows="4"
              placeholder="Tulis pesan Anda..."></textarea>
  </div>

  <button type="submit">Kirim</button>
</form>
\`\`\`

### Atribut Penting:

| Atribut | Fungsi |
|---------|--------|
| \`required\` | Wajib diisi sebelum submit |
| \`min\` / \`max\` | Batas minimum/maksimum angka |
| \`type="email"\` | Validasi format email otomatis |
| \`placeholder\` | Petunjuk di dalam input |
| \`pattern\` | Validasi dengan regex (pola tertentu) |

---

## 💻 Latihan Praktik

### Latihan 1: Halaman Profil Pribadi

Buat halaman HTML dengan:
1. Header berisi nama Anda dan navigasi (Beranda, Tentang, Kontak)
2. Section "Tentang Saya" dengan paragraf deskripsi
3. Article dengan daftar hobi (gunakan \`<ul>\` atau \`<ol>\`)
4. Footer dengan copyright

### Latihan 2: Form Pendaftaran

Buat form pendaftaran dengan:
1. Input nama (required)
2. Input email (required, type email)
3. Input password (required, minlength 6)
4. Select pilihan: "Pemula", "Menengah", "Mahir"
5. Tombol submit

### Latihan 3: Blog Sederhana

Buat halaman blog dengan:
1. Navigasi ke: Home, Blog, About, Contact
2. 3 artikel dengan judul, tanggal, dan konten
3. Sidebar dengan kategori
4. Footer yang rapi

---

## 🏗️ Proyek: Halaman Landing Sederhana

Buat halaman landing untuk sebuah produk atau jasa. Minimal harus memiliki:

### Struktur:
\`\`\`
<!DOCTYPE html>
<html>
  <head>
    <!-- Meta tags, title -->
  </head>
  <body>
    <header>
      <!-- Logo + navigation -->
    </header>
    <main>
      <!-- Hero section (judul besar + CTA) -->
      <!-- Features section (3-4 fitur) -->
      <!-- Pricing / Testimonials -->
      <!-- Contact form -->
    </main>
    <footer>
      <!-- Copyright + social links -->
    </footer>
  </body>
</html>
\`\`\`

### Checklist:
- ✅ Menggunakan minimal 5 semantic elements berbeda
- ✅ Ada navigation menu
- ✅ Ada form dengan validasi
- ✅ Ada gambar (gunakan placeholder: \`https://via.placeholder.com/300x200\`)
- ✅ Ada list (ordered atau unordered)
- ✅ Valid HTML (cek di validator.w3.org)

---

## 📖 Ringkasan

### Apa yang Sudah Dipelajari:
1. **Alat yang dibutuhkan**: VS Code, Browser, Live Server
2. **Struktur dasar HTML5**: DOCTYPE, html, head, body
3. **Semantic elements**: header, nav, main, section, article, footer
4. **Form & validasi**: input, textarea, button, required, type, pattern
5. **Link dan navigasi**: tag \`<a>\` dan href

### 🚀 Selanjutnya:
Minggu 2: **Dasar-dasar Pemrograman HTML** — Kita akan belajar:
- Tabel dan list yang kompleks
- Multimedia (gambar, video, audio)
- Iframe dan embed konten
- Accessibility (ARIA)

> **💡 Tips Penting:**
> 1. **Jangan hafal, pahami konsepnya** — Anda bisa selalu googling sintaks
> 2. **Tulis tangan kode** — Jangan copy-paste! Mengetik sendiri membantu ingat
> 3. **Coba-coba** — Ubah angka, warna, teks, lihat perubahannya
> 4. **Error itu wajar** — Setiap programmer mengalami error setiap hari
> 5. **Gunakan Tryngo Playground** — Coba kode langsung tanpa setup

---

**Selamat!** Anda sudah menyelesaikan minggu pertama. Anda bukan lagi "orang yang tidak bisa coding sama sekali" — Anda sudah bisa membuat halaman web! 🎉
`
    }
  }
};

const FEATURED_GOLANG = {
  beginer: {
    1: {
      id: `# Golang Concurrent Microservices

> **Kategori:** Backend & Systems  
> **Level:** Pemula  
> **Minggu 1:** Pengenalan Go & Persiapan Lingkungan

---

## 📋 Tujuan Pembelajaran

Setelah menyelesaikan modul ini, Anda akan mampu:

1. **Memahami apa itu Go (Golang)** dan mengapa banyak digunakan di industri
2. **Menginstal Go** dan mengkonfigurasi workspace
3. **Menulis program Go pertama** — "Hello, World!"
4. **Memahami struktur dasar** program Go (package, import, func, main)
5. **Menggunakan Go modules** untuk manajemen dependensi

---

## 🖥️ Sebelum Mulai: Alat yang Dibutuhkan

### 1. Install Go

**Langkah-langkah:**
1. Buka [go.dev/dl](https://go.dev/dl)
2. Download installer sesuai OS Anda (Windows/Mac/Linux)
3. **Windows**: Jalankan installer, ikuti wizard
4. **Mac**: Buka .pkg dan ikuti petunjuk
5. **Linux**: \`sudo tar -C /usr/local -xzf go1.22.*.linux-amd64.tar.gz\`

**Verifikasi instalasi:**
Buka terminal/command prompt, ketik:
\`\`\`bash
go version
\`\`\`
Jika muncul \`go version go1.22.x ...\`, berarti instalasi berhasil! ✅

### 2. Code Editor: VS Code

Download di [code.visualstudio.com](https://code.visualstudio.com)

**WAJIB install ekstensi:**
- **Go** oleh Go Team at Google (yang resmi)

Cara install: VS Code > Extensions (Ctrl+Shift+X) > cari "Go" > Install

### 3. Git (Opsional sekarang)
\`\`\`bash
# Cek apakah sudah terinstall
git --version

# Download: https://git-scm.com
\`\`\`

### 4. Tryngo Playground
Bisa coba Go langsung di browser tanpa install. Klik "Coba Sendiri" di setiap contoh kode.

---

## 🎯 Kenapa Go?

Go (Golang) dibuat oleh Google pada 2009. Go dirancang untuk:

| Masalah | Solusi Go |
|---------|-----------|
| Kompilasi lambat | Kompilasi sangat cepat (detik) |
| Syntax kompleks | Sintaks sederhana, mudah dipelajari |
| Concurrency sulit | Goroutine + channel = concurrency mudah |
| Dependency management ribet | Go Modules built-in |

**Perusahaan yang pakai Go:** Google, Uber, Twitch, Dropbox, Cloudflare, Docker, Kubernetes

---

## 📝 Program Go Pertama

### 1. Buat Folder Proyek
\`\`\`bash
mkdir hello-tryngo
cd hello-tryngo
\`\`\`

### 2. Inisialisasi Module
\`\`\`bash
go mod init hello-tryngo
\`\`\`
Ini akan membuat file \`go.mod\`. File ini seperti \`package.json\` di Node.js.

### 3. Buat File main.go
Buat file \`main.go\` dengan isi:

\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("Halo, Tryngo! Saya belajar Go!")
    fmt.Println("Saya bisa coding!")
}
\`\`\`

### 4. Jalankan!
\`\`\`bash
go run main.go
\`\`\`

Output:
\`\`\`
Halo, Tryngo! Saya belajar Go!
Saya bisa coding!
\`\`\`

### Penjelasan Setiap Baris:

| Baris Kode | Artinya |
|------------|---------|
| \`package main\` | Program ini adalah executable (bisa dijalankan langsung) |
| \`import "fmt"\` | Mengambil package fmt (format) untuk input/output |
| \`func main()\` | Fungsi utama — dieksekusi pertama kali saat program dijalankan |
| \`fmt.Println(...)\` | Fungsi untuk mencetak teks ke layar |

### 📌 Aturan Penting Go:
- **Setiap program Go butuh \`package main\`** dan \`func main()\`
- **Tidak boleh ada spasi** sebelum kurung fungsi (\`func main() {\` bukan \`func main () {\`)
- **Setiap import yang tidak dipakai = error** (Go memaksa kode bersih)
- **Titik koma tidak wajib** (Go otomatis menambahkannya)

---

## 🏗️ Struktur Program Go

\`\`\`go
package main  // 1. Package declaration

import (      // 2. Import packages
    "fmt"
    "os"
)

// 3. Fungsi main — entry point
func main() {
    // 4. Kode yang dieksekusi
    nama := "Tryingo"
    fmt.Printf("Halo, %s!\\n", nama)
    
    // 5. Exit dengan kode 0 (sukses)
    os.Exit(0)
}
\`\`\`

### Go Modules (go.mod)

File \`go.mod\` adalah jantung manajemen dependensi Go:
\`\`\`
module hello-tryngo

go 1.22.0
\`\`\`

- \`module\`: Nama modul (biasanya URL repo GitHub)
- \`go\`: Versi Go yang digunakan

### Menambah Dependensi Eksternal:
\`\`\`bash
go get github.com/gin-gonic/gin
\`\`\`
Go otomatis mendownload dan menambahkan ke \`go.mod\` + membuat \`go.sum\`.

---

## 💻 Latihan Praktik

### Latihan 1: Modify Hello World
Ubah program Hello World untuk:
1. Mencetak nama Anda
2. Mencetak umur Anda
3. Mencetak "Saya belajar Go di Tryngo!"

### Latihan 2: Multiple Print
Gunakan fmt.Println untuk mencetak:
\`\`\`go
fmt.Println("Baris 1")
fmt.Println("Baris 2")
fmt.Println("Baris 3")
\`\`\`
Apa yang terjadi? Coba juga dengan fmt.Print (tanpa ln).

### Latihan 3: Go Module Explorer
1. Buat folder baru \`explore-go\`
2. Inisialisasi module
3. Buat main.go yang mencetak 3 kalimat berbeda
4. Jalankan dengan \`go run\`

---

## 🏗️ Proyek: CLI Greeter

Buat program Command Line Interface (CLI) sederhana:

### Spesifikasi:
1. Program mencetak pesan selamat datang
2. Mencetak instruksi penggunaan
3. Mencetak 3 motivasi belajar coding
4. Format output rapi dengan garis pemisah

### Contoh Output:
\`\`\`
========================================
  SELAMAT DATANG DI TRYNGO GO COURSE
========================================

Halo! Selamat memulai perjalanan belajar Go!

🔥 Motivasi Hari Ini:
1. Setiap expert dulunya adalah pemula
2. Kode yang baik ditulis sedikit demi sedikit
3. Error adalah guru terbaik

========================================
  Terus belajar, jangan menyerah!
========================================
\`\`\`

### Kode Dasar (Lengkapi sendiri):
\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("========================================")
    fmt.Println("  SELAMAT DATANG DI TRYNGO GO COURSE")
    fmt.Println("========================================")
    fmt.Println()
    fmt.Println("Halo! Selamat memulai perjalanan belajar Go!")
    // TODO: Tambahkan 3 motivasi
    // TODO: Tambahkan footer
}
\`\`\`

---

## 📖 Ringkasan

### Apa yang Sudah Dipelajari:
1. **Apa itu Go** — Bahasa pemrograman modern buatan Google
2. **Instalasi** — Go compiler, VS Code, ekstensi Go
3. **Program pertama** — package main, import, func main, fmt.Println
4. **Go Modules** — go mod init, go.mod, dependensi
5. **Cara menjalankan** — go run, go build

### 🔑 Istilah Penting:
| Istilah | Arti |
|---------|------|
| Package | Kumpulan file Go dalam satu folder |
| Module | Kumpulan package dengan versi |
| func | Keyword untuk mendeklarasikan fungsi |
| import | Memasukkan package lain |
| Entry point | Titik mulai program (func main) |

### 🚀 Minggu Depan:
Minggu 2: **Variabel, Tipe Data, dan Control Flow**

Kita akan belajar:
- Variabel dan konstanta
- Tipe data (int, string, bool, float)
- If/else, switch
- Looping dengan for

> **💡 Tips untuk Pemula Absolut:**
> 1. **Go adalah bahasa yang ramah untuk pemula** — sintaksnya bersih dan eksplisit
> 2. **Jangan takut error** — Error Go sangat deskriptif dan mudah dipahami
> 3. **go run vs go build**: \`go run\` untuk testing, \`go build\` untuk produksi
> 4. **Manfaatkan go doc** — \`go doc fmt.Println\` untuk dokumentasi
> 5. **Latihan setiap hari** — Minimal 30 menit sehari

---

**Selamat!** Anda sudah menyelesaikan minggu pertama Go. Sekarang Anda sudah bisa menulis dan menjalankan program Go! 🎉
`
    }
  }
};

// ============================================================================
// MAIN GENERATION LOOP
// ============================================================================

let totalFiles = 0;

for (const track of TRACKS) {
  const baseDir = join(PUBLIC_DIR, track.id);

  for (const level of LEVELS) {
    for (const week of level.weeks) {
      for (const lang of ['id', 'en']) {
        const dir = join(baseDir, level.id, lang);
        const topic = lang === 'id' ? week.topic.id : week.topic.en;
        const fileName = `week${week.num}-${topic}.md`;

        let content;

        // Check for featured track custom content
        if (track.id === 'html5' && FEATURED_HTML5[level.id]?.[week.num]?.[lang]) {
          content = FEATURED_HTML5[level.id][week.num][lang];
        } else if (track.id === 'golang' && FEATURED_GOLANG[level.id]?.[week.num]?.[lang]) {
          content = FEATURED_GOLANG[level.id][week.num][lang];
        } else {
          content = generateWeekContent(track, level, week, lang);
        }

        mkdirSync(dir, { recursive: true });
        writeFileSync(join(dir, fileName), content, 'utf-8');
        totalFiles++;
      }
    }
  }

  console.log(`✅ ${track.id} — ${LEVELS.length} levels × ${LEVELS[0].weeks.length} weeks × 2 langs = ${LEVELS.length * LEVELS[0].weeks.length * 2} files`);
}

console.log(`\n🎉 Total: ${totalFiles} curriculum files generated!`);
console.log(`📁 Location: ${PUBLIC_DIR}`);
