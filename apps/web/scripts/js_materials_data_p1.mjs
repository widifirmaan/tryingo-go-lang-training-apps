export const JS_WEEKS_P1 = [
  // ── MINGGU 1: Pengenalan JavaScript, Console, dan Lingkungan Eksekusi ───────────
  {
    week: 1,
    topicId: 'pengenalan-dan-lingkungan-eksekusi',
    levelId: 'beginer',
    levelNameId: 'Dasar JavaScript & Logika',
    levelNameEn: 'JavaScript Basics & Logic',
    category: 'JavaScript',
    titleId: 'Pengenalan JavaScript, Console, dan Lingkungan Eksekusi',
    titleEn: 'JavaScript Introduction, Console, and Execution Environments',
    objectivesId: [
      'Memahami peran JavaScript sebagai bahasa pemrograman dinamis pada trio web (HTML, CSS, JS)',
      'Mengetahui perbedaan eksekusi di lingkungan browser (DOM) vs terminal server (Node.js)',
      'Menguasai penulisan perintah output: console.log(), console.warn(), dan console.error()',
      'Mengenal 2 metode penyisipan script: tag inline <script> dan file eksternal (main.js)',
      'Membangun struktur scaffolding proyek JavaScript standar (index.html dan main.js)'
    ],
    objectivesEn: [
      'Understand JavaScript as the dynamic behavior layer within the core web triad (HTML, CSS, JS)',
      'Distinguish client-side browser execution (DOM) from server terminal runtime (Node.js)',
      'Master diagnostic console output: console.log(), console.warn(), and console.error()',
      'Learn 2 script inclusion techniques: inline <script> tags and external files (main.js)',
      'Scaffold standard baseline project architecture (index.html and main.js)'
    ],
    contentId: `## 1. Apa Itu JavaScript dan Perannya dalam Web?

JavaScript adalah bahasa pemrograman bertipe dinamis yang memberikan kemampuan komputasi, pengambilan keputusan, dan interaktivitas pada halaman web.

Dalam trio teknologi web:
1. **HTML**: Menyusun struktur konten semantik (tulang).
2. **CSS**: Memberi gaya visual dan tata letak (kulit & pakaian).
3. **JavaScript**: Mengatur logika, interaksi pengguna, dan pemrosesan data (otot & saraf).

---

## 2. Di Mana JavaScript Berjalan? (Browser vs Node.js)

- **Browser (Client-side)**: Engine JavaScript di browser (seperti V8 di Chrome/Edge, SpiderMonkey di Firefox) menjalankan kode yang dapat berinteraksi langsung dengan antarmuka pengguna melalui Document Object Model (DOM).
- **Node.js (Server-side)**: Runtime V8 di luar browser yang memungkinkan eksekusi JavaScript langsung di terminal untuk server backend, otomatisasi file, dan manipulasi database.

---

## 3. Menghubungkan JavaScript ke Dokumen HTML

Dalam pengembangan proyek nyata, struktur direktori standar memisahkan kode logika ke file mandiri:

\`\`\`text
my-js-app/
├── index.html       # Kerangka antarmuka
├── main.js          # Seluruh logika JavaScript
└── styles.css       # Aturan tampilan visual
\`\`\`

File JavaScript eksternal dihubungkan menggunakan tag \`<script>\` dengan atribut \`src\`:

\`\`\`html
<!-- Disarankan diletakkan sebelum penutup </body> atau di <head> dengan atribut defer -->
<script src="main.js"></script>
\`\`\`

---

## 4. Perintah Console dan Komentar Kode

Console adalah alat diagnosa utama pengembang untuk memantau data runtime:

\`\`\`javascript
// 1. Komentar satu baris
/* 
   2. Komentar multi-baris 
*/

console.log("Pesan informasi umum");
console.warn("Pesan peringatan sistem");
console.error("Pesan galat/kesalahan");
\`\`\``,
    contentEn: `## 1. What is JavaScript and its Role in Web Architecture?

JavaScript is a dynamically typed programming language providing computational power, algorithmic logic, and responsive interactivity to web applications.

Within the foundational web triad:
1. **HTML**: Defines structural semantic content (skeleton).
2. **CSS**: Delivers visual presentation and styling (appearance).
3. **JavaScript**: Directs business logic, user events, and dynamic mutation (behavior).

---

## 2. Where Does JavaScript Execute? (Browser vs Node.js)

- **Browser (Client-side)**: Engines like Chrome's V8 or Firefox's SpiderMonkey parse scripts and expose the Document Object Model (DOM) for live browser manipulation.
- **Node.js (Server-side)**: Standalone V8 runtime enabling JavaScript execution inside terminal environments for APIs, servers, and filesystem operations.

---

## 3. Connecting JavaScript into HTML

Production applications cleanly isolate business logic into dedicated files:

\`\`\`text
my-js-app/
├── index.html       # Document markup
├── main.js          # JavaScript logic
└── styles.css       # Visual presentation
\`\`\`

Link external scripts using the \`<script>\` tag:

\`\`\`html
<!-- Placed before closing </body> or in <head> with defer -->
<script src="main.js"></script>
\`\`\`

---

## 4. Console Logging & Syntax Comments

The developer console is the primary telemetry instrument for runtime inspection:

\`\`\`javascript
// Single-line comment
/* Multi-line comment */

console.log("General informational message");
console.warn("System warning notification");
console.error("Critical error message");
\`\`\``,
    programTitleId: 'Program Logger Konsol dan Antarmuka Runtime Interaktif',
    programTitleEn: 'Interactive Console Logger and Runtime Interface',
    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Langkah Pertama JavaScript</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF9;
      color: #2D3748;
      padding: 32px;
      line-height: 1.5;
    }

    .container {
      max-width: 540px;
      margin: 0 auto;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.04);
    }

    h2 {
      color: #2E5B44;
      font-size: 20px;
      margin-bottom: 8px;
    }

    p {
      color: #718096;
      font-size: 14px;
      margin-bottom: 20px;
    }

    .console-display {
      background-color: #1A202C;
      color: #EDF2F7;
      font-family: "Courier New", Courier, monospace;
      padding: 16px;
      border-radius: 8px;
      font-size: 13px;
      min-height: 140px;
      white-space: pre-line;
      border-left: 4px solid #2E5B44;
    }

    .btn-run {
      background-color: #2E5B44;
      color: #FFFFFF;
      border: none;
      padding: 10px 18px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      margin-top: 16px;
      transition: background-color 0.15s ease;
    }

    .btn-run:hover {
      background-color: #234634;
    }
  </style>
</head>
<body>

  <div class="container">
    <h2>Lingkungan Eksekusi JavaScript</h2>
    <p>Skrip berikut mengeksekusi pemeriksaan status sistem dan mencatat hasilnya ke konsol dan tampilan di bawah.</p>

    <div id="output" class="console-display">Menunggu eksekusi skrip...</div>

    <button class="btn-run" onclick="jalankanSkrip()">Jalankan Skrip</button>
  </div>

  <script>
    // 1. Fungsi Titik Masuk Utama
    function jalankanSkrip() {
      const outputElem = document.getElementById("output");
      outputElem.textContent = "";

      // 2. Logging Diagnostik ke Developer Console
      console.log("Memulai inisialisasi runtime...");
      console.warn("Peringatan: Berjalan di mode sandbox browser.");

      // 3. Menghasilkan Teks Status ke Layar
      const waktu = new Date().toLocaleTimeString("id-ID");
      const infoRuntime = [
        "[INFO] Status Engine: Aktif dan Siap",
        "[INFO] Waktu Eksekusi: " + waktu,
        "[LOG] Pesan: Selamat datang di pembelajaran JavaScript mandiri!",
        "[SELESAI] Seluruh modul dasar siap dipelajari."
      ].join("\\n");

      outputElem.textContent = infoRuntime;
      console.log("Inisialisasi selesai tanpa galat.");
    }

    // Jalankan otomatis saat halaman pertama kali dimuat
    jalankanSkrip();
  </script>

</body>
</html>`,
    breakdownId: [
      '`<script> ... </script>`: Tag HTML tempat kode logika JavaScript disematkan dan dieksekusi secara otomatis oleh browser.',
      '`console.log()` & `console.warn()`: Mengirimkan catatan diagnostik ke panel Developer Tools (tekan tombol F12 di browser untuk melihat).',
      '`document.getElementById("output")`: Menghubungkan skrip JavaScript ke elemen HTML spesifik berdasarkan atribut id.',
      '`outputElem.textContent`: Mengubah isi teks elemen secara aman tanpa risiko keamanan XSS.',
      '`onclick="jalankanSkrip()"`: Mengikat fungsi JavaScript ke event klik tombol pengguna.'
    ],
    breakdownEn: [
      '`<script> ... </script>`: HTML container where JavaScript logic is embedded and parsed by the engine.',
      '`console.log()` & `console.warn()`: Emits telemetry diagnostics to browser Developer Tools (F12).',
      '`document.getElementById("output")`: Establishes reference link between JavaScript runtime and the targeted HTML DOM element.',
      '`outputElem.textContent`: Safely assigns text strings avoiding unsafe HTML injection vectors.',
      '`onclick="jalankanSkrip()"`: Binds interactive click events directly to the declared JavaScript function.'
    ],
    pitfallsId: [
      'Menulis skrip sebelum elemen HTML dirender: Menempatkan skrip di <head> tanpa atribut defer dapat menyebabkan error karena elemen HTML belum selesai dibuat saat skrip dijalankan.',
      'Lupa membuka Developer Tools Console: Banyak pemula bingung mengapa tidak melihat output console.log karena belum membuka tab Console di inspect element.',
      'Sensitivitas huruf besar-kecil (Case-Sensitive): JavaScript membedakan console.log() dan Console.Log(). Menulis huruf kapital akan memicu error ReferenceError.',
      'Mencampuradukkan tanda kutip: Membuka string dengan kutip ganda (") lalu menutup dengan kutip tunggal (\') menyebabkan SyntaxError.'
    ],
    pitfallsEn: [
      'Executing scripts before DOM hydration: Linking scripts inside <head> without defer causes null references because DOM elements do not exist yet.',
      'Unopened Developer Console: Beginners frequently miss console.log outputs by not inspecting the browser developer console.',
      'Case sensitivity: JavaScript is strictly case-sensitive; console.log() works, but Console.Log() throws a ReferenceError.',
      'Mismatched quotes: Opening strings with double quotes (") and closing with single quotes (\') triggers an immediate SyntaxError.'
    ]
  },

  // ── MINGGU 2: Variabel, Tipe Data, dan Operator ──────────────────────────────
  {
    week: 2,
    topicId: 'variabel-tipe-data-operator',
    levelId: 'beginer',
    levelNameId: 'Dasar JavaScript & Logika',
    levelNameEn: 'JavaScript Basics & Logic',
    category: 'JavaScript',
    titleId: 'Variabel, Tipe Data, dan Operator',
    titleEn: 'Variables, Data Types, and Operators',
    objectivesId: [
      'Menguasai perbedaan deklarasi variabel: const (tetap), let (dapat diubah), dan alasan menghindari var',
      'Memahami 7 tipe data primitif: string, number, boolean, null, undefined, symbol, dan bigint',
      'Menggunakan operator aritmatika (+, -, *, /, %, **) dan operator penugasan (+=, -=)',
      'Membedakan operator kesetaraan ketat (===) dengan kesetaraan longgar (==) untuk mencegah type coercion',
      'Menerapkan template literals (${}) untuk penggabungan string yang bersih dan ekspresif'
    ],
    objectivesEn: [
      'Distinguish variable keywords: const (immutable binding), let (reassignable), and obsolete var',
      'Master 7 primitive data types: string, number, boolean, null, undefined, symbol, bigint',
      'Deploy arithmetic (+, -, *, /, %, **) and assignment operators (+=, -=)',
      'Differentiate strict equality (===) from loose equality (==) to prevent coercion bugs',
      'Format expressive string interpolation using Template Literals (${})'
    ],
    contentId: `## 1. Aturan Emas Deklarasi: \`const\` vs \`let\` vs \`var\`

- **\`const\` (Default Utama)**: Gunakan untuk nilai yang tidak akan pernah di-assign ulang. Mencegah bug perubahan data yang tidak disengaja.
- **\`let\`**: Gunakan hanya jika nilai variabel memang perlu diubah di kemudian alur (misal: variabel penghitung counter atau perulangan).
- **\`var\` (Usang / Hindari)**: Jangan gunakan \`var\` dalam kode modern karena memiliki masalah *function scope* dan *hoisting* yang membingungkan.

\`\`\`javascript
const namaToko = "Toko Nusa";
let totalItem = 3;
totalItem = totalItem + 1; // Valid dengan let!
\`\`\`

---

## 2. 7 Tipe Data Primitif JavaScript

\`\`\`text
┌───────────┬───────────────────────────────┬────────────────────────────┐
│ Tipe Data │ Penjelasan                    │ Contoh                     │
├───────────┼───────────────────────────────┼────────────────────────────┤
│ string    │ Teks karakter                 │ "Halo", 'Dunia', \`Web\`    │
│ number    │ Angka bulat & desimal         │ 42, 3.14, -10              │
│ boolean   │ Nilai kebenaran logika        │ true, false                │
│ null      │ Nilai kosong yang disengaja   │ null                       │
│ undefined │ Variabel belum diberi nilai   │ let x; (bernilai undefined)│
│ bigint    │ Bilangan bulat ekstra besar   │ 9007199254740991n          │
│ symbol    │ Pengenal unik absolut         │ Symbol("id")               │
└───────────┴───────────────────────────────┴────────────────────────────┘
\`\`\`

Gunakan operator \`typeof\` untuk memeriksa tipe data suatu variabel secara runtime:
\`\`\`javascript
console.log(typeof "Halo"); // "string"
console.log(typeof 100);    // "number"
\`\`\`

---

## 3. Operator Perbandingan: Mengapa Wajib \`===\`?

JavaScript memiliki fitur *Type Coercion* (konversi tipe otomatis) yang berbahaya jika menggunakan \`==\` (loose equality):

\`\`\`javascript
// BERBAHAYA (Loose Equality):
"5" == 5;  // true! (String "5" dipaksa diubah menjadi angka 5)
0 == false; // true!
"" == 0;    // true!

// STANDAR AMAN (Strict Equality):
"5" === 5;  // false! (Tipe data berbeda: string vs number)
0 === false; // false!
\`\`\`

**Aturan Mutlak:** Selalu gunakan operator \`===\` (sama persis) dan \`!==\` (tidak sama persis).`,
    contentEn: `## 1. Golden Declaration Rule: \`const\` vs \`let\` vs \`var\`

- **\`const\` (Default Standard)**: Assign to bindings that will never be reassigned. Eliminates accidental mutation bugs.
- **\`let\`**: Reserve strictly for bindings requiring mutable reassignment (counters, loop iterators).
- **\`var\` (Obsolete)**: Deprecated in modern engineering due to function-scoping leaks and unpredictable hoisting.

\`\`\`javascript
const storeName = "Nusa Store";
let itemCount = 3;
itemCount = itemCount + 1; // Valid under let!
\`\`\`

---

## 2. The 7 Primitive Types

\`\`\`text
┌───────────┬───────────────────────────────┬────────────────────────────┐
│ Type      │ Description                   │ Example                    │
├───────────┼───────────────────────────────┼────────────────────────────┤
│ string    │ Textual sequences             │ "Hello", 'World', \`Web\`    │
│ number    │ Floats and integers           │ 42, 3.14, -10              │
│ boolean   │ Logical truth flags           │ true, false                │
│ null      │ Intentional absence of value  │ null                       │
│ undefined │ Uninitialized binding         │ let x; (evaluates undefined│
│ bigint    │ Arbitrary precision integers  │ 9007199254740991n          │
│ symbol    │ Unique immutable identifier   │ Symbol("id")               │
└───────────┴───────────────────────────────┴────────────────────────────┘
\`\`\`

Inspect runtime types with \`typeof\`:
\`\`\`javascript
console.log(typeof "Hello"); // "string"
console.log(typeof 100);     // "number"
\`\`\`

---

## 3. Strict Equality: Why \`===\` is Mandatory

JavaScript performs implicit *Type Coercion* under loose equality (\`==\`):

\`\`\`javascript
// HAZARDOUS (Loose Equality):
"5" == 5;   // true! (Implicit coercion string to number)
0 == false;  // true!

// STRICT (Safe Standard):
"5" === 5;   // false! (Types differ: string vs number)
0 === false;  // false!
\`\`\`

**Inviolable Rule:** Always enforce strict equality (\`===\` and \`!==\`).`,
    programTitleId: 'Kalkulator Kasir Belanja dengan Verifikasi Tipe Data',
    programTitleEn: 'Retail Cashier Calculator with Runtime Type Verification',
    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Variabel dan Operator</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF9;
      color: #2D3748;
      padding: 32px;
      line-height: 1.5;
    }

    .card {
      max-width: 500px;
      margin: 0 auto;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.04);
    }

    h3 {
      color: #2E5B44;
      font-size: 20px;
      margin-bottom: 12px;
    }

    .bill-receipt {
      background-color: #F7FAFC;
      border: 1px solid #EDF2F7;
      border-radius: 8px;
      padding: 16px;
      font-family: "Courier New", Courier, monospace;
      font-size: 13px;
      white-space: pre-line;
      line-height: 1.7;
      margin-bottom: 16px;
    }

    .type-check-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      margin-top: 12px;
    }

    .type-check-table th, .type-check-table td {
      border: 1px solid #E2E8F0;
      padding: 6px 10px;
      text-align: left;
    }

    .type-check-table th {
      background-color: #EDF2F7;
      color: #4A5568;
    }
  </style>
</head>
<body>

  <div class="card">
    <h3>Struk Kasir: Kalkulasi Nilai Data</h3>
    <div id="receipt" class="bill-receipt">Memuat struk transaksi...</div>

    <table class="type-check-table">
      <thead>
        <tr>
          <th>Variabel</th>
          <th>Nilai</th>
          <th>typeof</th>
        </tr>
      </thead>
      <tbody id="type-tbody"></tbody>
    </table>
  </div>

  <script>
    // 1. Deklarasi Data Transaksi
    const namaProduk = "Buku Panduan Web";
    const hargaSatuan = 85000;
    let kuantitas = 2;
    const persentaseDiskon = 0.10; // Diskon 10%
    const statusMember = true;

    // 2. Operasi Aritmatika
    const subtotal = hargaSatuan * kuantitas;
    const nominalDiskon = subtotal * persentaseDiskon;
    const totalBayar = subtotal - nominalDiskon;

    // 3. Format Struk dengan Template Literals
    const struk = [
      "========================================",
      "             TOKO BUKU NUSA             ",
      "========================================",
      \`Item        : \${namaProduk}\`,
      \`Harga       : Rp \${hargaSatuan.toLocaleString("id-ID")}\`,
      \`Jumlah      : \${kuantitas} pcs\`,
      \`Subtotal    : Rp \${subtotal.toLocaleString("id-ID")}\`,
      \`Diskon (10%): -Rp \${nominalDiskon.toLocaleString("id-ID")}\`,
      "----------------------------------------",
      \`TOTAL BAYAR : Rp \${totalBayar.toLocaleString("id-ID")}\`,
      \`Member VIP  : \${statusMember === true ? "YA (Aktif)" : "TIDAK"}\`,
      "========================================"
    ].join("\\n");

    document.getElementById("receipt").textContent = struk;

    // 4. Verifikasi Tipe Data Runtime (typeof)
    const inspeksiData = [
      { nama: "namaProduk", nilai: namaProduk, tipe: typeof namaProduk },
      { nama: "hargaSatuan", nilai: hargaSatuan, tipe: typeof hargaSatuan },
      { nama: "kuantitas", nilai: kuantitas, tipe: typeof kuantitas },
      { nama: "persentaseDiskon", nilai: persentaseDiskon, tipe: typeof persentaseDiskon },
      { nama: "statusMember", nilai: String(statusMember), tipe: typeof statusMember }
    ];

    const tbody = document.getElementById("type-tbody");
    inspeksiData.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = \`
        <td><code>\${item.nama}</code></td>
        <td>\${item.nilai}</td>
        <td><strong>\${item.tipe}</strong></td>
      \`;
      tbody.appendChild(tr);
    });
  </script>

</body>
</html>`,
    breakdownId: [
      '`const hargaSatuan = 85000`: Mengunci harga satuan dengan `const` agar nilainya tidak bisa diubah secara tidak sengaja oleh proses lain.',
      '`let kuantitas = 2`: Menggunakan `let` untuk jumlah barang yang dapat berubah saat pembeli menambah pesanan.',
      '`subtotal * persentaseDiskon`: Operasi perkalian aritmatika untuk menghitung nominal potongan harga secara akurat.',
      '`\`Item: \${namaProduk}\``: Template literals dengan tanda backtick (\\`) yang memudahkan penyisipan variabel langsung ke dalam teks string.',
      '`typeof`: Memeriksa tipe data variabel secara runtime untuk memastikan nilai numerik tidak salah dikenali sebagai string.'
    ],
    breakdownEn: [
      '`const hargaSatuan = 85000`: Secures unit pricing immutably with `const` preventing accidental overwrite.',
      '`let kuantitas = 2`: Deploys mutable `let` for inventory quantities subject to alteration.',
      '`subtotal * persentaseDiskon`: Standard arithmetic multiplication computing percentage discounts.',
      '`\`Item: \${namaProduk}\``: Template literals streamlining inline expression interpolation inside backticks.',
      '`typeof`: Inspects runtime typing ensuring numeric values are not misclassified as strings.'
    ],
    pitfallsId: [
      'Menghitung angka yang tersimpan sebagai string: Jika "10" + 5 dieksekusi, hasilnya bukan 15 melainkan "105" karena operator + melakukan penggabungan string (concatenation).',
      'Menggunakan == alih-alih ===: Menyebabkan bug terselubung saat membandingkan 0 == "" atau false == 0.',
      'Mencoba me-reassign variabel const: Menulis const x = 1; x = 2; akan memicu TypeError: Assignment to constant variable.',
      'Lupa tanda kurung kurawal pada template literals: Menulis $namaProduk alih-alih ${namaProduk} akan mencetak teks biasa tanpa mengganti nilainya.'
    ],
    pitfallsEn: [
      'String arithmetic pitfalls: Adding "10" + 5 results in "105" instead of 15 due to implicit string concatenation.',
      'Using loose == equality: Introduces subtle bugs when evaluating falsy equivalents like 0 == "" or false == 0.',
      'Reassigning const variables: Attempting to assign new values to const triggers a fatal TypeError.',
      'Omitting braces in template literals: Writing $namaProduk instead of ${namaProduk} prints literal text.'
    ]
  },

  // ── MINGGU 3: Percabangan dan Pengambilan Keputusan ──────────────────────────
  {
    week: 3,
    topicId: 'percabangan-dan-kondisi',
    levelId: 'beginer',
    levelNameId: 'Dasar JavaScript & Logika',
    levelNameEn: 'JavaScript Basics & Logic',
    category: 'JavaScript',
    titleId: 'Percabangan dan Pengambilan Keputusan',
    titleEn: 'Conditionals and Decision Making',
    objectivesId: [
      'Menguasai struktur percabangan logika if, else if, dan else',
      'Menerapkan ternary operator (kondisi ? nilaiA : nilaiB) untuk ekspresi ringkas',
      'Menggunakan struktur switch-case dan klausa break untuk evaluasi banyak opsi',
      'Memahami konsep nilai Truthy dan Falsy dalam evaluasi boolean',
      'Menggunakan nullish coalescing operator (??) untuk nilai default yang aman'
    ],
    objectivesEn: [
      'Master conditional branching structures: if, else if, and else',
      'Deploy ternary operators (condition ? valA : valB) for concise inline logic',
      'Structure multi-way branching via switch-case with mandatory break statements',
      'Understand Truthy and Falsy evaluations across all JavaScript data types',
      'Deploy the Nullish Coalescing operator (??) for bulletproof default fallbacks'
    ],
    contentId: `## 1. Struktur Percabangan \`if...else if...else\`

Percabangan memungkinkan program mengambil keputusan berbeda berdasarkan kondisi logika boolean:

\`\`\`javascript
const nilai = 82;

if (nilai >= 85) {
  console.log("Grade: A");
} else if (nilai >= 70) {
  console.log("Grade: B");
} else if (nilai >= 55) {
  console.log("Grade: C");
} else {
  console.log("Grade: D (Perlu Perbaikan)");
}
\`\`\`

---

## 2. Ternary Operator (Kondisi Ringkas)

Gunakan ternary operator untuk menetapkan nilai variabel dalam satu baris ekspresi:

\`\`\`javascript
// Format: kondisi ? nilaiJikaTrue : nilaiJikaFalse
const statusAkses = usia >= 18 ? "Diizinkan Masuk" : "Dilarang Masuk";
\`\`\`

---

## 3. Truthy vs Falsy Values

Dalam JavaScript, setiap nilai secara inheren dievaluasi sebagai \`true\` (Truthy) atau \`false\` (Falsy) saat berada di dalam kondisi \`if\`:

### 8 Nilai Falsy (Selalu Menghasilkan \`false\`):
1. \`false\`
2. \`0\` dan \`-0\`
3. \`0n\` (BigInt nol)
4. \`""\` (String kosong)
5. \`null\`
6. \`undefined\`
7. \`NaN\` (Not-a-Number)

*Seluruh nilai selain kedelapan nilai di atas adalah **Truthy** (termasuk array kosong \`[]\` dan objek kosong \`{}\`!)*

---

## 4. Nullish Coalescing (\`??\`) vs Logical OR (\`||\`)

- **\`||\` (Logical OR)**: Mengambil fallback jika nilai di sebelah kiri adalah **Falsy** (termasuk \`0\` atau \`""\`).
- **\`??\` (Nullish Coalescing)**: Mengambil fallback **hanya jika** nilai di sebelah kiri adalah \`null\` atau \`undefined\`:

\`\`\`javascript
const skorPemain = 0;

const hasilOR = skorPemain || 10;  // 10! (Karena 0 dianggap falsy, padahal 0 skor valid!)
const hasilNullish = skorPemain ?? 10; // 0! (Benar, 0 bukan null atau undefined)
\`\`\``,
    contentEn: `## 1. Branching with \`if...else if...else\`

Conditionals direct programmatic execution branches according to boolean logic:

\`\`\`javascript
const score = 82;

if (score >= 85) {
  console.log("Grade: A");
} else if (score >= 70) {
  console.log("Grade: B");
} else {
  console.log("Grade: Needs Improvement");
}
\`\`\`

---

## 2. Ternary Operator

Concise inline conditional assignment:

\`\`\`javascript
// Format: condition ? valueIfTrue : valueIfFalse
const access = age >= 18 ? "Granted" : "Restricted";
\`\`\`

---

## 3. Truthy vs Falsy

Every JavaScript value evaluates implicitly to a boolean posture inside conditions:

### The 8 Falsy Values:
1. \`false\`
2. \`0\` & \`-0\`
3. \`0n\`
4. \`""\` (Empty string)
5. \`null\`
6. \`undefined\`
7. \`NaN\`

*Every single other value evaluates to **Truthy** (including empty arrays \`[]\` and empty objects \`{}\`!)*

---

## 4. Nullish Coalescing (\`??\`) vs Logical OR (\`||\`)

- **\`||\`**: Fallbacks whenever the left operand is **Falsy** (including valid \`0\` or \`""\`).
- **\`??\`**: Fallbacks **strictly** when the left operand is \`null\` or \`undefined\`:

\`\`\`javascript
const score = 0;

const orResult = score || 10;       // 10 (Faulty: 0 was treated as invalid!)
const nullishResult = score ?? 10;  // 0 (Accurate: 0 is preserved)
\`\`\``,
    programTitleId: 'Sistem Penilaian Kelulusan dan Evaluasi Hak Akses',
    programTitleEn: 'Academic Grading and Access Privilege Evaluator',
    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Percabangan Logika</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF9;
      color: #2D3748;
      padding: 32px;
      line-height: 1.5;
    }

    .card {
      max-width: 480px;
      margin: 0 auto;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.04);
    }

    h3 {
      color: #2E5B44;
      font-size: 20px;
      margin-bottom: 16px;
    }

    .form-group {
      margin-bottom: 16px;
    }

    label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 6px;
    }

    input, select {
      width: 100%;
      padding: 10px;
      border: 1px solid #CBD5E0;
      border-radius: 6px;
      font-size: 14px;
    }

    .btn-eval {
      width: 100%;
      background-color: #2E5B44;
      color: white;
      border: none;
      padding: 10px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 8px;
    }

    .result-box {
      margin-top: 20px;
      padding: 16px;
      border-radius: 8px;
      font-size: 14px;
      line-height: 1.6;
      display: none;
    }

    .result-pass {
      background-color: #E2F2E9;
      color: #2E5B44;
      border: 1px solid #C6E6D5;
    }

    .result-fail {
      background-color: #FED7D7;
      color: #9B2C2C;
      border: 1px solid #FEB2B2;
    }
  </style>
</head>
<body>

  <div class="card">
    <h3>Evaluasi Kelulusan Siswa</h3>

    <div class="form-group">
      <label for="skor-input">Skor Ujian (0 - 100):</label>
      <input type="number" id="skor-input" value="78" min="0" max="100">
    </div>

    <div class="form-group">
      <label for="kehadiran-input">Persentase Kehadiran (%):</label>
      <input type="number" id="kehadiran-input" value="85" min="0" max="100">
    </div>

    <button class="btn-eval" onclick="evaluasi()">Evaluasi Status</button>

    <div id="result" class="result-box"></div>
  </div>

  <script>
    function evaluasi() {
      const skor = Number(document.getElementById("skor-input").value);
      const kehadiran = Number(document.getElementById("kehadiran-input").value);
      const resultBox = document.getElementById("result");

      // 1. Menentukan Huruf Mutu (if-else if-else)
      let grade = "E";
      let keterangan = "";

      if (skor >= 85) {
        grade = "A";
        keterangan = "Istimewa (Sangat Memuaskan)";
      } else if (skor >= 75) {
        grade = "B";
        keterangan = "Baik (Memuaskan)";
      } else if (skor >= 60) {
        grade = "C";
        keterangan = "Cukup (Lulus Standar)";
      } else {
        grade = "D";
        keterangan = "Kurang (Tidak Memenuhi Standar)";
      }

      // 2. Evaluasi Kelulusan Multi-Kondisi dengan Operator Logika (&&)
      const syaratLulus = (skor >= 60) && (kehadiran >= 75);

      // 3. Menentukan Pesan Akhir dengan Ternary Operator
      const statusTeks = syaratLulus ? "LULUS" : "TIDAK LULUS";

      // 4. Render Hasil ke DOM
      resultBox.style.display = "block";
      resultBox.className = "result-box " + (syaratLulus ? "result-pass" : "result-fail");

      resultBox.innerHTML = \`
        <strong>STATUS: \${statusTeks}</strong><br>
        Grade Nilai: <strong>\${grade}</strong> (\${keterangan})<br>
        Skor: \${skor} | Kehadiran: \${kehadiran}%<br>
        \${!syaratLulus && kehadiran < 75 ? "<em>Peringatan: Kehadiran di bawah batas minimum 75%!</em>" : ""}
      \`;
    }

    evaluasi();
  </script>

</body>
</html>`,
    breakdownId: [
      '`Number(document.getElementById("...").value)`: Mengonversi nilai input teks form menjadi tipe number agar perbandingan numerik akurat.',
      '`if (skor >= 85) ... else if ...`: Mengevaluasi rentang skor dari yang tertinggi ke terendah secara berurutan.',
      '`(skor >= 60) && (kehadiran >= 75)`: Menggunakan operator logika AND (`&&`) di mana kedua syarat wajib terpenuhi agar dinyatakan lulus.',
      '`syaratLulus ? "LULUS" : "TIDAK LULUS"`: Menggunakan ternary operator untuk menentukan string status secara ringkas.',
      '`resultBox.className = ...`: Mengubah kelas CSS secara dinamis untuk memberikan warna latar hijau (lulus) atau merah (tidak lulus).'
    ],
    breakdownEn: [
      '`Number(...)`: Explicitly casts string input values to numeric primitives preventing string comparison anomalies.',
      '`if (skor >= 85) ... else if ...`: Evaluates scoring bounds sequentially from highest to lowest thresholds.',
      '`(skor >= 60) && (kehadiran >= 75)`: Enforces strict conjunction where both sub-conditions must be true.',
      '`syaratLulus ? "LULUS" : "TIDAK LULUS"`: Inline ternary operator assigning concise conditional output.',
      '`resultBox.className = ...`: Dynamically shifts styling classes to render green (pass) or red (fail) feedback surfaces.'
    ],
    pitfallsId: [
      'Lupa mengonversi nilai input ke Number: Nilai dari <input> selalu bertipe string ("80"). Jika dibandingkan secara string, "9" > "80" adalah true!',
      'Urutan kondisi if-else terbalik: Menulis if (skor >= 60) di baris pertama akan membuat siswa dengan skor 90 langsung berhenti di kondisi pertama tanpa pernah mencapai grade A.',
      'Menggunakan = alih-alih ===: Menulis if (skor = 100) adalah operasi penugasan (assignment), bukan perbandingan, sehingga kondisi selalu bernilai truthy.',
      'Lupa klausa break pada switch-case: Tanpa break, eksekusi akan jatuh bebas (fall-through) ke case berikutnya hingga akhir switch.'
    ],
    pitfallsEn: [
      'Omitting Number() conversion on form inputs: Input values return strings ("80"). Under lexical string rules, "9" > "80" evaluates to true!',
      'Inverted condition ordering: Checking if (score >= 60) first intercepts score 90, preventing it from reaching the grade A branch.',
      'Accidental assignment with = instead of ===: Writing if (score = 100) reassigns the binding and evaluates truthy every time.',
      'Missing break in switch statements: Forgetting break triggers unintended case fall-through.'
    ]
  },

  // ── MINGGU 4: Perulangan dan Iterasi Data ─────────────────────────────────────
  {
    week: 4,
    topicId: 'perulangan-dan-iterasi',
    levelId: 'beginer',
    levelNameId: 'Dasar JavaScript & Logika',
    levelNameEn: 'JavaScript Basics & Logic',
    category: 'JavaScript',
    titleId: 'Perulangan dan Iterasi Data',
    titleEn: 'Loops and Data Iteration',
    objectivesId: [
      'Menguasai struktur perulangan klasik for (inisialisasi, kondisi, increment)',
      'Memahami perulangan while dan do-while serta perbedaannya',
      'Menggunakan perulangan for...of untuk membaca elemen array secara intuitif',
      'Mengontrol alur perulangan dengan kata kunci break (berhenti) dan continue (lewati)',
      'Menerapkan pola akumulator untuk menjumlahkan dan mengolah kumpulan data numerik'
    ],
    objectivesEn: [
      'Master standard for loops (initialization, condition, increment)',
      'Understand while and do-while loop mechanics and control distinctions',
      'Deploy modern for...of loops for clean array sequence traversal',
      'Direct loop interruption using break (terminate) and continue (skip)',
      'Implement accumulator patterns to compute aggregations across collections'
    ],
    contentId: `## 1. Perulangan Klasik \`for\`

Digunakan saat jumlah iterasi sudah diketahui secara pasti:

\`\`\`javascript
// for (inisialisasi; kondisi; perubahan)
for (let i = 1; i <= 5; i++) {
  console.log("Iterasi ke-" + i);
}
\`\`\`

1. **Inisialisasi (\`let i = 1\`)**: Dijalankan sekali saat loop dimulai.
2. **Kondisi (\`i <= 5\`)**: Diperiksa sebelum setiap putaran. Jika \`true\`, blok kode dijalankan.
3. **Perubahan (\`i++\`)**: Dijalankan di akhir setiap putaran untuk menambah nilai \`i\`.

---

## 2. Perulangan \`while\` vs \`do...while\`

- **\`while\`**: Kondisi diperiksa **di awal**. Jika kondisi langsung bernilai \`false\`, kode tidak akan pernah dijalankan sama sekali.
- **\`do...while\`**: Kondisi diperiksa **di akhir**. Kode dijamin berjalan **minimal satu kali** sebelum kondisi dicek.

\`\`\`javascript
let saldo = 100;
while (saldo > 0) {
  saldo -= 25;
}
\`\`\`

---

## 3. Perulangan Modern \`for...of\`

Cara paling bersih dan mudah dibaca untuk membaca seluruh elemen array:

\`\`\`javascript
const daftarKota = ["Jakarta", "Bandung", "Surabaya", "Yogyakarta"];

for (const kota of daftarKota) {
  console.log("Kota: " + kota);
}
\`\`\`

---

## 4. Mengontrol Alur: \`break\` dan \`continue\`

- **\`break\`**: Menghentikan perulangan sepenuhnya seketika itu juga dan keluar dari loop.
- **\`continue\`**: Menghentikan putaran saat ini dan langsung melompat ke putaran berikutnya:

\`\`\`javascript
for (let i = 1; i <= 10; i++) {
  if (i === 3) continue; // Lewati angka 3
  if (i === 8) break;    // Berhenti total di angka 8
  console.log(i); // Mencetak: 1, 2, 4, 5, 6, 7
}
\`\`\``,
    contentEn: `## 1. Standard \`for\` Loop

Utilized when iteration boundaries are known in advance:

\`\`\`javascript
// for (initialization; condition; increment)
for (let i = 1; i <= 5; i++) {
  console.log("Iteration " + i);
}
\`\`\`

---

## 2. \`while\` vs \`do...while\`

- **\`while\`**: Evaluates conditions **before** execution. Skips entirely if initial condition is false.
- **\`do...while\`**: Evaluates conditions **after** execution. Guaranteed to run **at least once**.

\`\`\`javascript
let balance = 100;
while (balance > 0) {
  balance -= 25;
}
\`\`\`

---

## 3. Clean Traversal with \`for...of\`

The modern standard for iterating array items:

\`\`\`javascript
const cities = ["Jakarta", "Bandung", "Surabaya"];

for (const city of cities) {
  console.log("City: " + city);
}
\`\`\`

---

## 4. Loop Flow: \`break\` and \`continue\`

- **\`break\`**: Halts and terminates loop execution instantly.
- **\`continue\`**: Aborts current iteration and advances immediately to the next cycle.

\`\`\`javascript
for (let i = 1; i <= 10; i++) {
  if (i === 3) continue; // Skips 3
  if (i === 8) break;    // Halts at 8
  console.log(i); // Outputs: 1, 2, 4, 5, 6, 7
}
\`\`\``,
    programTitleId: 'Generator Tabel Perkalian dan Analisis Deret Angka',
    programTitleEn: 'Multiplication Table Generator and Sequence Analyzer',
    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Perulangan dan Iterasi</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF9;
      color: #2D3748;
      padding: 32px;
      line-height: 1.5;
    }

    .container {
      max-width: 520px;
      margin: 0 auto;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.04);
    }

    h3 {
      color: #2E5B44;
      font-size: 20px;
      margin-bottom: 16px;
    }

    .controls {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
    }

    select, button {
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 14px;
    }

    select {
      border: 1px solid #CBD5E0;
      flex: 1;
    }

    button {
      background-color: #2E5B44;
      color: white;
      border: none;
      font-weight: 600;
      cursor: pointer;
    }

    .table-display {
      background-color: #F7FAFC;
      border: 1px solid #EDF2F7;
      border-radius: 8px;
      padding: 16px;
      font-family: "Courier New", Courier, monospace;
      font-size: 13px;
      line-height: 1.6;
      white-space: pre-line;
      max-height: 260px;
      overflow-y: auto;
    }

    .summary-bar {
      margin-top: 16px;
      padding: 12px;
      background-color: #E2F2E9;
      color: #2E5B44;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
    }
  </style>
</head>
<body>

  <div class="container">
    <h3>Generator Tabel Perkalian Matematika</h3>

    <div class="controls">
      <select id="angka-select">
        <option value="5">Perkalian 5</option>
        <option value="7">Perkalian 7</option>
        <option value="8">Perkalian 8</option>
        <option value="12">Perkalian 12</option>
      </select>
      <button onclick="buatTabel()">Generate</button>
    </div>

    <div id="output" class="table-display"></div>
    <div id="summary" class="summary-bar"></div>
  </div>

  <script>
    function buatTabel() {
      const pengali = Number(document.getElementById("angka-select").value);
      const outputElem = document.getElementById("output");
      const summaryElem = document.getElementById("summary");

      const barisTabel = [];
      let totalAkumulator = 0;

      // 1. Perulangan for Klasik (1 sampai 10)
      for (let i = 1; i <= 10; i++) {
        const hasil = pengali * i;
        totalAkumulator += hasil; // Pola Akumulator

        // Formatting baris tabel
        const paddingI = i < 10 ? " " + i : i;
        barisTabel.push(\`\${pengali} x \${paddingI} = \${hasil}\`);
      }

      outputElem.textContent = barisTabel.join("\\n");

      // 2. Ringkasan Hasil
      summaryElem.textContent = \`Total Akumulasi Seluruh Hasil (1 s/d 10): \${totalAkumulator.toLocaleString("id-ID")}\`;
    }

    // Eksekusi awal
    buatTabel();
  </script>

</body>
</html>`,
    breakdownId: [
      '`for (let i = 1; i <= 10; i++)`: Perulangan yang mengiterasi variabel pencacah `i` secara teratur dari angka 1 hingga 10.',
      '`totalAkumulator += hasil`: Operator penugasan penjumlahan (`+=`) yang mengakumulasikan nilai setiap perkalian ke dalam variabel total.',
      '`barisTabel.push(...)`: Menambahkan hasil kalkulasi setiap putaran loop ke dalam array sebagai deretan baris teks.',
      '`barisTabel.join("\\n")`: Menggabungkan seluruh elemen array menjadi satu string panjang yang dipisahkan oleh karakter baris baru.',
      'Performa efisien: Mengumpulkan data ke array lalu merender sekali jauh lebih cepat daripada memanipulasi DOM di dalam setiap putaran loop.'
    ],
    breakdownEn: [
      '`for (let i = 1; i <= 10; i++)`: Systematic iteration sequence marching index `i` from 1 through 10.',
      '`totalAkumulator += hasil`: Accumulator operator adding successive products into a persistent running total.',
      '`barisTabel.push(...)`: Appends each calculated calculation line into an array collection.',
      '`barisTabel.join("\\n")`: Concatenates array items with newline delimiters in a single operational step.',
      'DOM optimization: Buffering strings inside an array and rendering once prevents repetitive browser paint cycles.'
    ],
    pitfallsId: [
      'Infinite Loop (Perulangan Tanpa Henti): Lupa menulis increment i++ pada loop while akan membuat browser macet total (*freeze*) karena perulangan berjalan selamanya.',
      'Off-by-one Error: Menggunakan kondisi i < 10 alih-alih i <= 10 menyebabkan perulangan berhenti di angka 9 dan melewatkan angka 10.',
      'Memanipulasi DOM langsung di dalam perulangan besar: Menulis innerHTML += di dalam perulangan 1000 kali akan memperlambat performa browser secara drastis.',
      'Salah menggunakan for...in untuk array: for...in digunakan untuk kunci objek; untuk membaca item array selalu gunakan for...of.'
    ],
    pitfallsEn: [
      'Infinite loops: Forgetting iterator increments inside while loops freezes browser tabs permanently.',
      'Off-by-one boundaries: Using < 10 instead of <= 10 stops execution prematurely at 9.',
      'Mutating DOM inside loop bodies: Calling innerHTML += inside large loops degrades performance drastically.',
      'Using for...in on arrays: for...in iterates object keys; use for...of for sequential array item traversal.'
    ]
  },

  // ── MINGGU 5: Fungsi, Parameter, dan Scope ───────────────────────────────────
  {
    week: 5,
    topicId: 'fungsi-parameter-dan-scope',
    levelId: 'beginer',
    levelNameId: 'Dasar JavaScript & Logika',
    levelNameEn: 'JavaScript Basics & Logic',
    category: 'JavaScript',
    titleId: 'Fungsi, Parameter, dan Scope',
    titleEn: 'Functions, Parameters, and Scope',
    objectivesId: [
      'Memahami anatomi Deklarasi Fungsi (function) vs Ekspresi Fungsi vs Arrow Function (=>)',
      'Menguasai parameter fungsi, argumen, dan penetapan Default Parameters',
      'Memahami peran nilai kembalian (return) dalam menghasilkan data yang dapat digunakan kembali',
      'Memahami hierarki Scope: Global Scope vs Function Scope vs Block Scope (let/const)',
      'Membangun pustaka fungsi utilitas matematika dan pemformatan mata uang (Level 1 Capstone)'
    ],
    objectivesEn: [
      'Master Function Declarations vs Function Expressions vs Arrow Functions (=>)',
      'Manage input parameters, arguments, and Default Parameters',
      'Direct output data pipelines using the return statement',
      'Understand Scope boundaries: Global Scope vs Function Scope vs Block Scope',
      'Construct a utility function toolkit for geometry and currency formatting (Level 1 Capstone)'
    ],
    contentId: `## 1. Tiga Cara Menulis Fungsi dalam JavaScript

Fungsi adalah blok kode modular yang dirancang untuk melakukan tugas tertentu dan dapat dipanggil berulang kali:

### A. Function Declaration (Dapat Di-hoist)
\`\`\`javascript
function hitungLuas(panjang, lebar) {
  return panjang * lebar;
}
\`\`\`

### B. Function Expression
\`\`\`javascript
const hitungLuas = function(panjang, lebar) {
  return panjang * lebar;
};
\`\`\`

### C. Arrow Function (Sintaks Ringkas Modern)
\`\`\`javascript
const hitungLuas = (panjang, lebar) => panjang * lebar;
\`\`\`

---

## 2. Parameter Default & Nilai Kembalian (\`return\`)

Anda dapat memberikan nilai default pada parameter jika pengguna tidak menyertakan argumen saat memanggil fungsi:

\`\`\`javascript
function hitungDiskon(harga, diskon = 0.05) {
  return harga * (1 - diskon);
}

hitungDiskon(100000);       // Menggunakan diskon default 5% -> 95000
hitungDiskon(100000, 0.20); // Menggunakan diskon kustom 20% -> 80000
\`\`\`

- Kata kunci **\`return\`** menghentikan eksekusi fungsi dan mengirimkan nilai hasilnya kembali ke pemanggil. Tanpa \`return\`, fungsi akan mengembalikan \`undefined\`.

---

## 3. Aturan Scope: Di Mana Variabel Anda Hidup?

Scope menentukan area kode di mana suatu variabel dapat diakses:

\`\`\`text
┌────────────────────────────────────────────────────────┐
│ GLOBAL SCOPE (Dapat diakses di mana saja)              │
│ const pajak = 0.11;                                    │
│                                                        │
│   function prosesOrder() {                             │
│     // FUNCTION SCOPE                                  │
│     const orderId = 101;                               │
│                                                        │
│     if (orderId > 100) {                               │
│       // BLOCK SCOPE ({ ... } dengan let/const)        │
│       const bonus = 5000;                              │
│     }                                                  │
│     // bonus TIDAK BISA diakses di sini!               │
│   }                                                    │
│   // orderId TIDAK BISA diakses di sini!               │
└────────────────────────────────────────────────────────┘
\`\`\``,
    contentEn: `## 1. Three Function Syntaxes

Functions encapsulate reusable logic blocks:

### A. Function Declaration (Hoisted)
\`\`\`javascript
function calculateArea(length, width) {
  return length * width;
}
\`\`\`

### B. Function Expression
\`\`\`javascript
const calculateArea = function(length, width) {
  return length * width;
};
\`\`\`

### C. Arrow Function (Modern & Concise)
\`\`\`javascript
const calculateArea = (length, width) => length * width;
\`\`\`

---

## 2. Default Parameters & the \`return\` Pipeline

Assign baseline fallbacks to parameter signatures:

\`\`\`javascript
function applyDiscount(price, discount = 0.05) {
  return price * (1 - discount);
}

applyDiscount(100000);       // Uses default 5% -> 95000
applyDiscount(100000, 0.20); // Uses explicit 20% -> 80000
\`\`\`

- The **\`return\`** keyword halts execution and transmits output back to the caller. Without \`return\`, functions resolve to \`undefined\`.

---

## 3. Scope Boundaries: Where Do Variables Live?

\`\`\`text
┌────────────────────────────────────────────────────────┐
│ GLOBAL SCOPE (Accessible universally)                  │
│ const tax = 0.11;                                      │
│                                                        │
│   function processOrder() {                            │
│     // FUNCTION SCOPE                                  │
│     const orderId = 101;                               │
│                                                        │
│     if (orderId > 100) {                               │
│       // BLOCK SCOPE ({ ... } with let/const)          │
│       const discount = 5000;                           │
│     }                                                  │
│     // discount is UNREACHABLE here!                   │
│   }                                                    │
│   // orderId is UNREACHABLE here!                      │
└────────────────────────────────────────────────────────┘
\`\`\``,
    programTitleId: 'Pustaka Utilitas Matematika dan Pemformatan Mata Uang Rupiah',
    programTitleEn: 'Mathematical Toolkit and Currency Formatting Utility',
    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Fungsi dan Scope</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF9;
      color: #2D3748;
      padding: 32px;
      line-height: 1.5;
    }

    .container {
      max-width: 520px;
      margin: 0 auto;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.04);
    }

    h3 {
      color: #2E5B44;
      font-size: 20px;
      margin-bottom: 16px;
    }

    .grid-inputs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 16px;
    }

    label {
      font-size: 13px;
      font-weight: 600;
      display: block;
      margin-bottom: 4px;
    }

    input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #CBD5E0;
      border-radius: 6px;
      font-size: 14px;
    }

    .btn-calc {
      width: 100%;
      background-color: #2E5B44;
      color: white;
      border: none;
      padding: 10px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      margin-bottom: 16px;
    }

    .result-panel {
      background-color: #F7FAFC;
      border: 1px solid #EDF2F7;
      border-radius: 8px;
      padding: 16px;
      font-size: 14px;
      line-height: 1.8;
    }
  </style>
</head>
<body>

  <div class="container">
    <h3>Pustaka Utilitas Finansial & Geometri</h3>

    <div class="grid-inputs">
      <div>
        <label>Harga Barang (Rp):</label>
        <input type="number" id="input-harga" value="150000">
      </div>
      <div>
        <label>Diskon (%):</label>
        <input type="number" id="input-diskon" value="15">
      </div>
      <div>
        <label>Panjang Ruang (m):</label>
        <input type="number" id="input-panjang" value="8">
      </div>
      <div>
        <label>Lebar Ruang (m):</label>
        <input type="number" id="input-lebar" value="5">
      </div>
    </div>

    <button class="btn-calc" onclick="jalankanKalkulasi()">Hitung Semua Nilai</button>

    <div id="output" class="result-panel"></div>
  </div>

  <script>
    // ── PUSTAKA FUNGSI UTILITY (MODULAR & REUSABLE) ──

    // 1. Fungsi Arrow: Format Rupiah
    const formatRupiah = (angka) => {
      return "Rp " + Number(angka).toLocaleString("id-ID");
    };

    // 2. Fungsi Deklarasi: Hitung Diskon dengan Default Parameter
    function hitungTotalSetelahDiskon(harga, persenDiskon = 0) {
      const potongan = harga * (persenDiskon / 100);
      return harga - potongan;
    }

    // 3. Fungsi Arrow Satu Baris: Hitung Luas Ruang
    const hitungLuasRuang = (p, l) => p * l;

    // 4. Fungsi Arrow: Hitung Keliling
    const hitungKeliling = (p, l) => 2 * (p + l);

    // ── EKSEKUSI INTEGRASI ──
    function jalankanKalkulasi() {
      const harga = Number(document.getElementById("input-harga").value);
      const diskon = Number(document.getElementById("input-diskon").value);
      const p = Number(document.getElementById("input-panjang").value);
      const l = Number(document.getElementById("input-lebar").value);

      const hargaAkhir = hitungTotalSetelahDiskon(harga, diskon);
      const luas = hitungLuasRuang(p, l);
      const keliling = hitungKeliling(p, l);

      document.getElementById("output").innerHTML = \`
        <strong>Hasil Perhitungan Finansial:</strong><br>
        • Harga Awal: \${formatRupiah(harga)}<br>
        • Diskon (\${diskon}%): -\${formatRupiah(harga - hargaAkhir)}<br>
        • <strong>Total Bayar: \${formatRupiah(hargaAkhir)}</strong><br>
        <hr style="margin: 10px 0; border: 0; border-top: 1px solid #E2E8F0;">
        <strong>Hasil Perhitungan Geometri:</strong><br>
        • Luas Ruangan: <strong>\${luas} m²</strong><br>
        • Keliling: <strong>\${keliling} m</strong>
      \`;
    }

    jalankanKalkulasi();
  </script>

</body>
</html>`,
    breakdownId: [
      '`const formatRupiah = (angka) => ...`: Arrow function ringkas yang memformat angka biasa menjadi format mata uang Rupiah.',
      '`function hitungTotalSetelahDiskon(harga, persenDiskon = 0)`: Fungsi dengan nilai default `0` untuk persen diskon jika parameter tidak diberikan.',
      '`return harga - potongan`: Mengembalikan hasil kalkulasi bersih agar dapat digunakan kembali oleh kode lain.',
      '`const hitungLuasRuang = (p, l) => p * l`: Arrow function satu baris dengan implicit return (tanpa kurung kurawal dan tanpa kata kunci return manual).',
      'Pemisahan fungsi murni (Pure Functions): Seluruh fungsi kalkulator menerima input dan mengembalikan output tanpa mengubah variabel di luar dirinya.'
    ],
    breakdownEn: [
      '`formatRupiah`: Arrow function encapsulating locale-sensitive currency formatting.',
      '`persenDiskon = 0`: Safe default parameter assignment preventing NaN calculation bugs.',
      '`return harga - potongan`: Emits computed values back into the application data flow.',
      '`(p, l) => p * l`: Concise arrow function with implicit return semantics.',
      'Pure Function architecture: Calculators operate exclusively on arguments without mutating global state.'
    ],
    pitfallsId: [
      'Lupa menulis kata kunci return: Jika fungsi menghitung nilai tetapi lupa menulis return, fungsi tersebut akan menghasilkan undefined.',
      'Mengakses variabel di luar block scope: Mencoba membaca variabel let/const yang dideklarasikan di dalam blok if dari luar blok akan memicu ReferenceError.',
      'Menulis argumen dengan urutan terbalik: Jika fungsi menerima (harga, diskon) lalu Anda memanggilnya dengan hitung(10, 50000), perhitungan akan salah total.',
      'Kebingungan kurung kurawal pada arrow function: Jika menggunakan kurung kurawal { ... }, kata kunci return menjadi WAJIB ditulis manual.'
    ],
    pitfallsEn: [
      'Missing return statement: Functions without explicit return statements resolve to undefined.',
      'Accessing variables outside block scope: Reading let/const declared inside if/for blocks triggers a ReferenceError.',
      'Inverted argument ordering: Calling (price, discount) with (10, 50000) causes incorrect math.',
      'Brace confusion with arrow functions: Wrapping arrow bodies in curly braces { } requires an explicit return statement.'
    ]
  }
];
