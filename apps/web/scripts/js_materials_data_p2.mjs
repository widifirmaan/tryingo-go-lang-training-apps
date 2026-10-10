export const JS_WEEKS_P2 = [
  // ── MINGGU 6: Array dan Metode Manipulasi Data ───────────────────────────────
  {
    week: 6,
    topicId: 'array-dan-metode-manipulasi',
    levelId: 'intermediate',
    levelNameId: 'Struktur Data & Interaksi DOM',
    levelNameEn: 'Data Structures & DOM Interaction',
    category: 'JavaScript',
    titleId: 'Array dan Metode Manipulasi Data',
    titleEn: 'Arrays and Data Manipulation Methods',
    objectivesId: [
      'Memahami struktur data Array, sistem indeks berbasis 0, dan panjang array (length)',
      'Membedakan metode mutasi (push, pop, shift, unshift, splice) dari metode tanpa mutasi (slice, concat)',
      'Menguasai metode transformasi fungsional modern: map() untuk memetakan data baru',
      'Menggunakan filter() untuk menyaring data dan find() untuk mencari elemen spesifik',
      'Menerapkan reduce() untuk menghitung agregasi total nilai kumpulan data secara deklaratif'
    ],
    objectivesEn: [
      'Master Array zero-indexed sequences and dynamic length properties',
      'Differentiate mutating methods (push, pop, splice) from immutable operations (slice, concat)',
      'Transform data pipelines functionally using map()',
      'Filter collections using filter() and locate single items with find()',
      'Aggregate dataset values declaratively using reduce()'
    ],
    contentId: `## 1. Anatomi Array dan Sistem Indeks

Array adalah struktur data berurutan yang menyimpan kumpulan nilai dalam satu variabel:

\`\`\`javascript
const buah = ["Apel", "Jeruk", "Mangga", "Pisang"];
console.log(buah[0]);        // "Apel" (Indeks ke-0 adalah elemen pertama)
console.log(buah.length);   // 4 (Total jumlah elemen)
console.log(buah[buah.length - 1]); // "Pisang" (Elemen terakhir)
\`\`\`

---

## 2. Metode Mutasi vs Tanpa Mutasi

- **Metode Mutasi (Mengubah Array Asli)**:
  - \`push(item)\`: Menambahkan elemen di akhir array.
  - \`pop()\`: Menghapus elemen terakhir array.
  - \`unshift(item)\`: Menambahkan elemen di awal array.
  - \`shift()\`: Menghapus elemen pertama array.
- **Metode Tanpa Mutasi (Menghasilkan Array Baru)**:
  - \`slice(awal, akhir)\`: Mengambil sebagian elemen tanpa mengubah array asli.
  - \`concat(arrayLain)\`: Menggabungkan dua array menjadi satu.

---

## 3. Tiga Serangkai Metode Fungsional: \`map\`, \`filter\`, \`reduce\`

Dalam standar JavaScript profesional, pengolahan data array menggunakan metode deklaratif:

### A. \`map()\` (Transformasi 1:1)
Mengubah setiap elemen menjadi format baru dengan panjang array yang tetap sama:
\`\`\`javascript
const harga = [10000, 20000, 50000];
const hargaPajak = harga.map(h => h * 1.11); // [11100, 22200, 55500]
\`\`\`

### B. \`filter()\` (Penyaringan Data)
Mengambil hanya elemen yang memenuhi kondisi logika bernilai \`true\`:
\`\`\`javascript
const produk = [
  { nama: "Kemeja", stok: 12 },
  { nama: "Celana", stok: 0 },
  { nama: "Jaket", stok: 5 }
];
const produkTersedia = produk.filter(p => p.stok > 0);
\`\`\`

### C. \`reduce()\` (Akumulasi Nilai Tunggal)
Menggabungkan seluruh elemen menjadi satu nilai akhir (misal: total harga):
\`\`\`javascript
const totalStok = produk.reduce((total, p) => total + p.stok, 0);
\`\`\``,
    contentEn: `## 1. Array Sequence Anatomy

Arrays are zero-indexed ordered data structures:

\`\`\`javascript
const fruits = ["Apple", "Orange", "Mango"];
console.log(fruits[0]); // "Apple" (First item)
console.log(fruits.length); // 3 (Item count)
\`\`\`

---

## 2. Mutating vs Non-Mutating Methods

- **Mutating (Modifies original array in-place)**:
  - \`push()\`: Appends to the tail.
  - \`pop()\`: Removes trailing element.
  - \`shift()\`: Extracts leading element.
- **Non-Mutating (Returns new immutable instances)**:
  - \`slice()\`: Slices subsets without mutating the origin.
  - \`concat()\`: Merges distinct collections.

---

## 3. The Functional Triad: \`map\`, \`filter\`, \`reduce\`

### A. \`map()\`
Transforms each element one-to-one into a new array:
\`\`\`javascript
const prices = [10000, 20000];
const withTax = prices.map(p => p * 1.11);
\`\`\`

### B. \`filter()\`
Extracts items matching boolean predicates:
\`\`\`javascript
const available = products.filter(p => p.stock > 0);
\`\`\`

### C. \`reduce()\`
Condenses arrays down into single accumulated values:
\`\`\`javascript
const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
\`\`\``,
    programTitleId: 'Pengolah Data Inventaris Toko dengan Filter dan Agregasi',
    programTitleEn: 'Inventory Dataset Pipeline with Filters and Aggregations',
    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Array dan Metode Manipulasi</title>
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
      max-width: 560px;
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

    .toolbar {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
    }

    select, button {
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 13px;
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

    .item-list {
      list-style: none;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 16px;
    }

    .item-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 14px;
      border-bottom: 1px solid #EDF2F7;
      font-size: 13px;
    }

    .item-row:last-child {
      border-bottom: none;
    }

    .item-row:nth-child(even) {
      background-color: #F7FAFC;
    }

    .badge-qty {
      background-color: #E2F2E9;
      color: #2E5B44;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 4px;
    }

    .metric-panel {
      background-color: #2E5B44;
      color: #FFFFFF;
      padding: 14px 18px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 600;
    }
  </style>
</head>
<body>

  <div class="container">
    <h3>Pengolahan Data Inventaris (Array Pipeline)</h3>

    <div class="toolbar">
      <select id="kategori-filter" onchange="renderInventaris()">
        <option value="SEMUA">Semua Kategori</option>
        <option value="Elektronik">Elektronik</option>
        <option value="Pakaian">Pakaian</option>
        <option value="Buku">Buku</option>
      </select>
    </div>

    <ul id="list-container" class="item-list"></ul>

    <div class="metric-panel">
      <span>Total Nilai Inventaris:</span>
      <span id="total-val">Rp 0</span>
    </div>
  </div>

  <script>
    // 1. Kumpulan Data Mentah (Array of Objects)
    const inventaris = [
      { id: 1, nama: "Keyboard Mekanikal", kategori: "Elektronik", harga: 450000, stok: 8 },
      { id: 2, nama: "Mouse Ergonomis", kategori: "Elektronik", harga: 220000, stok: 15 },
      { id: 3, nama: "Kaos Polos Katun", kategori: "Pakaian", harga: 75000, stok: 30 },
      { id: 4, nama: "Jaket Parka Anti Air", kategori: "Pakaian", harga: 320000, stok: 5 },
      { id: 5, nama: "Buku Panduan JavaScript", kategori: "Buku", harga: 95000, stok: 20 },
      { id: 6, nama: "Buku Desain Web Modern", kategori: "Buku", harga: 110000, stok: 12 }
    ];

    function renderInventaris() {
      const filterKat = document.getElementById("kategori-filter").value;
      const listContainer = document.getElementById("list-container");

      // 2. Operasi FILTER: Menyaring berdasarkan kategori
      const dataTerfilter = filterKat === "SEMUA" 
        ? inventaris 
        : inventaris.filter(item => item.kategori === filterKat);

      // 3. Operasi MAP: Mengonversi data objek menjadi string HTML baris
      listContainer.innerHTML = dataTerfilter.map(item => \`
        <li class="item-row">
          <div>
            <strong>\${item.nama}</strong>
            <span style="color: #718096; font-size: 12px; margin-left: 6px;">(\${item.kategori})</span>
          </div>
          <div>
            <span style="margin-right: 12px;">Rp \${item.harga.toLocaleString("id-ID")}</span>
            <span class="badge-qty">\${item.stok} unit</span>
          </div>
        </li>
      \`).join("");

      // 4. Operasi REDUCE: Menghitung total nilai seluruh barang terpilih
      const totalNilai = dataTerfilter.reduce((akumulator, item) => {
        return akumulator + (item.harga * item.stok);
      }, 0);

      document.getElementById("total-val").textContent = "Rp " + totalNilai.toLocaleString("id-ID");
    }

    renderInventaris();
  </script>

</body>
</html>`,
    breakdownId: [
      '`inventaris.filter(...)`: Menguji setiap elemen inventaris apakah memenuhi kriteria kategori yang dipilih di dropdown.',
      '`dataTerfilter.map(...)`: Mengubah setiap objek inventaris menjadi baris elemen HTML `<li>` secara deklaratif.',
      '`dataTerfilter.reduce((acc, item) => ..., 0)`: Akumulator yang mengalikan harga dengan stok setiap barang lalu menjumlahkannya ke nilai awal 0.',
      '`Number.toLocaleString("id-ID")`: Memformat angka rupiah dengan pemisah titik ribuan standar Indonesia.',
      'Immutabilitas: Array asli `inventaris` tidak pernah diubah oleh fungsi filter atau map, sehingga data tetap utuh saat filter diubah-ubah.'
    ],
    breakdownEn: [
      '`inventaris.filter(...)`: Evaluates categories against selected dropdown filters non-destructively.',
      '`dataTerfilter.map(...)`: Transforms underlying data objects into HTML markup fragments.',
      '`reduce((acc, item) => ..., 0)`: Accumulator aggregating inventory valuation (price * quantity) starting from 0.',
      '`toLocaleString("id-ID")`: Formats numbers with locale-accurate Indonesian currency separators.',
      'Data immutability: The source array remains unmutated throughout filtering interactions.'
    ],
    pitfallsId: [
      'Lupa nilai awal pada reduce: Jika nilai awal 0 tidak diberikan pada reduce((acc, val) => ...), elemen pertama array akan dijadikan nilai awal akumulator, memicu bug jika elemen berupa objek.',
      'Mengharapkan filter memutasi array asli: filter mengembalikan array baru; jika Anda tidak menampung hasilnya ke variabel baru, hasil filter akan hilang.',
      'Memodifikasi array saat di-loop dengan forEach: Mengubah elemen yang sedang diiterasi dapat menyebabkan loncatan indeks yang tidak terduga.',
      'Menggunakan find saat mengharapkan banyak hasil: find hanya mengembalikan 1 elemen pertama yang cocok; gunakan filter jika ingin semua elemen.'
    ],
    pitfallsEn: [
      'Omitting the initial value in reduce: Forgetting the initial 0 causes the first object to become the accumulator, leading to [object Object] concatenation bugs.',
      'Expecting filter to mutate in-place: filter generates a brand new array; failing to capture return values discards filtered results.',
      'Mutating arrays during forEach loops: Splicing items during active traversal causes erratic index shifts.',
      'Using find() when expecting multiple results: find returns strictly the single first match; use filter for collections.'
    ]
  },

  // ── MINGGU 7: Objek, Destrukturisasi, dan JSON ────────────────────────────────
  {
    week: 7,
    topicId: 'objek-destrukturisasi-dan-json',
    levelId: 'intermediate',
    levelNameId: 'Struktur Data & Interaksi DOM',
    levelNameEn: 'Data Structures & DOM Interaction',
    category: 'JavaScript',
    titleId: 'Objek, Destrukturisasi, dan JSON',
    titleEn: 'Objects, Destructuring, and JSON',
    objectivesId: [
      'Memahami struktur Objek Literal (key-value pairs) dan akses dot notation vs bracket notation',
      'Menguasai metode inspeksi objek: Object.keys(), Object.values(), dan Object.entries()',
      'Menerapkan Destructuring Assignment pada objek dan array untuk kode yang bersih',
      'Menggunakan Spread Operator (...) untuk kloning objek dan menggabungkan data tanpa mutasi',
      'Memahami format standar data JSON serta metode JSON.stringify() dan JSON.parse()'
    ],
    objectivesEn: [
      'Master Object Literals (key-value pairs) and dot vs bracket access notation',
      'Inspect object properties using Object.keys(), Object.values(), and Object.entries()',
      'Deploy Object and Array Destructuring syntax for clean, concise binding',
      'Deploy the Spread Operator (...) for shallow copying and immutability',
      'Parse and serialize JSON payloads via JSON.stringify() and JSON.parse()'
    ],
    contentId: `## 1. Anatomi Objek Literal

Objek menyimpan data dalam bentuk pasangan kunci dan nilai (**key-value pairs**):

\`\`\`javascript
const profilPengguna = {
  id: 1042,
  nama: "Alex Pratama",
  email: "alex@example.com",
  peran: "Developer",
  aktif: true
};

// Akses Properti:
console.log(profilPengguna.nama);       // Dot notation (Standar)
console.log(profilPengguna["email"]);   // Bracket notation (Jika key berupa variabel dinamis)
\`\`\`

---

## 2. Destructuring Assignment (Membongkar Properti)

Destructuring mengekstrak properti objek langsung ke dalam variabel individual:

\`\`\`javascript
// Tanpa Destructuring:
const nama = profilPengguna.nama;
const email = profilPengguna.email;

// Dengan Destructuring Bersih:
const { nama, email, peran = "Pengguna" } = profilPengguna;
console.log(nama, email, peran);
\`\`\`

---

## 3. Spread Operator (\`...\`) untuk Immutabilitas

Spread operator membuat salinan (*shallow copy*) objek baru tanpa mengubah objek asli:

\`\`\`javascript
const updateProfil = {
  ...profilPengguna,      // Salin semua properti lama
  peran: "Lead Engineer", // Timpa properti peran
  lokasi: "Jakarta"       // Tambah properti baru
};
\`\`\`

---

## 4. Bekerja dengan Data JSON (JavaScript Object Notation)

JSON adalah format teks universal untuk pertukaran data antara browser dan server:

- **\`JSON.stringify(objek)\`**: Mengubah objek JavaScript menjadi teks string JSON.
- **\`JSON.parse(teksJSON)\`**: Mengubah teks string JSON kembali menjadi objek JavaScript:

\`\`\`javascript
const payloadString = JSON.stringify(updateProfil);
// '{"id":1042,"nama":"Alex Pratama",...}'

const objekKembali = JSON.parse(payloadString);
\`\`\``,
    contentEn: `## 1. Object Literal Anatomy

Objects organize structured datasets as **key-value pairs**:

\`\`\`javascript
const user = {
  id: 1042,
  name: "Alex Pratama",
  role: "Developer",
  active: true
};

console.log(user.name);     // Dot notation
console.log(user["role"]);  // Bracket notation
\`\`\`

---

## 2. Destructuring Assignment

Unpack properties directly into discrete local variables:

\`\`\`javascript
const { name, role, status = "Active" } = user;
console.log(name, role, status);
\`\`\`

---

## 3. The Spread Operator (\`...\`) for Immutability

Clone and extend properties without mutating the source reference:

\`\`\`javascript
const updatedUser = {
  ...user,
  role: "Lead Engineer",
  location: "Jakarta"
};
\`\`\`

---

## 4. Working with JSON

JSON is the universal serialization protocol between clients and backends:

- **\`JSON.stringify(object)\`**: Serializes object into JSON text string.
- **\`JSON.parse(string)\`**: Deserializes JSON text back into a live JavaScript object.

\`\`\`javascript
const jsonString = JSON.stringify(updatedUser);
const parsedObj = JSON.parse(jsonString);
\`\`\``,
    programTitleId: 'Pengelola Profil Pengguna dengan Destrukturisasi dan JSON Serializer',
    programTitleEn: 'User Profile Manager with Destructuring and JSON Serializer',
    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Objek dan JSON</title>
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

    h3 {
      color: #2E5B44;
      font-size: 20px;
      margin-bottom: 16px;
    }

    .profile-card {
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
      background-color: #F7FAFC;
    }

    .profile-card h4 {
      color: #1A202C;
      margin-bottom: 8px;
    }

    .profile-meta {
      font-size: 13px;
      color: #4A5568;
      line-height: 1.6;
    }

    .btn-update {
      background-color: #2E5B44;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      margin-right: 8px;
    }

    .json-preview {
      background-color: #1A202C;
      color: #A0AEC0;
      font-family: "Courier New", Courier, monospace;
      font-size: 12px;
      padding: 14px;
      border-radius: 8px;
      margin-top: 16px;
      white-space: pre;
      overflow-x: auto;
    }
  </style>
</head>
<body>

  <div class="container">
    <h3>Manajemen Data Objek & JSON</h3>

    <div class="profile-card">
      <h4 id="user-name">Memuat nama...</h4>
      <div id="user-meta" class="profile-meta"></div>
    </div>

    <div>
      <button class="btn-update" onclick="naikkanJabatan()">Promosikan Jabatan (Spread)</button>
      <button class="btn-update" style="background-color: #4A5568;" onclick="resetProfil()">Reset Data</button>
    </div>

    <div style="margin-top: 20px; font-size: 13px; font-weight: 600; color: #4A5568;">
      Serialisasi JSON Payload (String):
    </div>
    <div id="json-box" class="json-preview"></div>
  </div>

  <script>
    // 1. Objek Awal
    const profilAsal = {
      id: 204,
      nama: "Nadia Safitri",
      email: "nadia@tryngo.id",
      departemen: "Teknologi",
      jabatan: "Junior Engineer",
      keahlian: ["HTML5", "CSS3", "JavaScript"],
      aktif: true
    };

    let profilAktif = { ...profilAsal };

    function tampilkanProfil() {
      // 2. Destructuring Assignment: Ekstrak properti ke variabel
      const { nama, email, departemen, jabatan, keahlian, aktif } = profilAktif;

      document.getElementById("user-name").textContent = nama;
      document.getElementById("user-meta").innerHTML = \`
        <strong>Email:</strong> \${email}<br>
        <strong>Departemen:</strong> \${departemen}<br>
        <strong>Jabatan:</strong> \${jabatan}<br>
        <strong>Keahlian:</strong> \${keahlian.join(", ")}<br>
        <strong>Status:</strong> \${aktif ? "Aktif Bekerja" : "Nonaktif"}
      \`;

      // 3. Serialisasi JSON dengan indentasi 2 spasi
      const jsonString = JSON.stringify(profilAktif, null, 2);
      document.getElementById("json-box").textContent = jsonString;
    }

    function naikkanJabatan() {
      // 4. Spread Operator: Update tanpa mengubah objek lama secara langsung
      profilAktif = {
        ...profilAktif,
        jabatan: "Senior Fullstack Engineer",
        keahlian: [...profilAktif.keahlian, "Node.js"]
      };
      tampilkanProfil();
    }

    function resetProfil() {
      profilAktif = { ...profilAsal };
      tampilkanProfil();
    }

    tampilkanProfil();
  </script>

</body>
</html>`,
    breakdownId: [
      '`const { nama, email, ... } = profilAktif`: Destructuring assignment yang membongkar properti objek langsung ke nama-nama variabel yang mudah dibaca.',
      '`{ ...profilAktif, jabatan: "Senior..." }`: Menggunakan spread operator (`...`) untuk membuat salinan data baru dan menimpa properti jabatan secara aman.',
      '`[...profilAktif.keahlian, "Node.js"]`: Menambahkan item baru ke array keahlian secara non-mutatif menggunakan spread array.',
      '`JSON.stringify(profilAktif, null, 2)`: Mengonversi objek JavaScript menjadi string JSON yang rapi dengan indentasi 2 spasi untuk kemudahan dibaca.',
      '`JSON.parse()`: Kebalikan dari stringify, digunakan untuk mengubah kembali teks dari API server menjadi objek yang dapat dimanipulasi.'
    ],
    breakdownEn: [
      '`const { nama, ... } = profilAktif`: Destructuring assigns properties directly to readable local identifiers.',
      '`{ ...profilAktif, jabatan: ... }`: Spread operators produce immutable clones overriding targeted fields safely.',
      '`[...keahlian, "Node.js"]`: Appends new skill elements non-destructively through array spread mechanics.',
      '`JSON.stringify(profilAktif, null, 2)`: Serializes runtime objects into formatted JSON strings indented by 2 spaces.',
      '`JSON.parse()`: Converts incoming JSON text from network APIs back into live mutable JavaScript objects.'
    ],
    pitfallsId: [
      'Menyalin objek dengan penugasan sama dengan (objB = objA): Ini TIDAK menduplikasi objek, melainkan menyalin referensi memori yang sama. Mengubah objB akan ikut mengubah objA!',
      'Gagal melakukan deep clone dengan spread: Spread operator hanya melakukan shallow copy (salinan 1 tingkat). Objek atau array bersarang di dalamnya tetap merujuk ke referensi yang sama.',
      'Sintaks JSON yang tidak valid: JSON WAJIB menggunakan tanda petik ganda ("nama": "Alex"), bukan tanda petik tunggal (\'nama\').',
      'Lupa menangani error pada JSON.parse: Jika string JSON rusak atau tidak valid, JSON.parse akan memicu SyntaxError fatal. Selalu gunakan try-catch saat parsing data dari API.'
    ],
    pitfallsEn: [
      'Copying objects via assignment (b = a): Copies memory references rather than cloning; mutating b alters a directly.',
      'Shallow spread limitations: Spread clones only the top-level surface; nested arrays or objects retain shared memory references.',
      'Malformed JSON syntax: JSON specifications require double quotes ("key": "val"); single quotes throw SyntaxErrors.',
      'Uncaught JSON.parse exceptions: Malformed JSON strings crash applications; wrap external network parsing inside try-catch blocks.'
    ]
  },

  // ── MINGGU 8: Manipulasi DOM dan Seleksi Elemen ───────────────────────────────
  {
    week: 8,
    topicId: 'manipulasi-dom-dan-seleksi',
    levelId: 'intermediate',
    levelNameId: 'Struktur Data & Interaksi DOM',
    levelNameEn: 'Data Structures & DOM Interaction',
    category: 'JavaScript',
    titleId: 'Manipulasi DOM dan Seleksi Elemen',
    titleEn: 'DOM Manipulation and Element Selection',
    objectivesId: [
      'Memahami arsitektur Document Object Model (DOM) sebagai representasi pohon elemen HTML',
      'Menguasai metode seleksi elemen: document.getElementById() dan document.querySelector() / querySelectorAll()',
      'Membaca dan memodifikasi isi teks dengan aman menggunakan textContent alih-alih innerHTML',
      'Mengelola kelas CSS secara dinamis dengan classList (add, remove, toggle, contains)',
      'Membuat dan menyisipkan elemen baru secara terprogram dengan document.createElement() dan appendChild()'
    ],
    objectivesEn: [
      'Understand the Document Object Model (DOM) as an in-memory node tree representing HTML',
      'Select elements accurately using document.getElementById() and querySelector() / querySelectorAll()',
      'Safely mutate text nodes using textContent rather than innerHTML',
      'Manage dynamic class states cleanly with classList (add, remove, toggle, contains)',
      'Instantiate and mount programmatic DOM nodes with document.createElement() and appendChild()'
    ],
    contentId: `## 1. Apa Itu DOM (Document Object Model)?

DOM adalah antarmuka pemrograman berorientasi objek yang merepresentasikan halaman web sebagai sebuah **pohon simpul (node tree)**.

\`\`\`text
                  document
                     │
                   <html>
                 ┌───┴───┐
              <head>   <body>
                         │
                      <header>
                     ┌───┴───┐
                    <h1>    <p>
\`\`\`

Melalui DOM, JavaScript dapat membaca, menambah, mengubah, dan menghapus elemen maupun atribut HTML secara langsung pada layar pengguna.

---

## 2. Metode Seleksi Elemen Modern

- **\`document.getElementById("id")\`**: Mengambil 1 elemen unik berdasarkan ID (paling cepat).
- **\`document.querySelector("selektor")\`**: Mengambil 1 elemen pertama yang cocok dengan selektor CSS apa pun (misal: \`.btn-primer\`, \`header > nav a\`).
- **\`document.querySelectorAll("selektor")\`**: Mengambil seluruh elemen yang cocok dalam bentuk NodeList (dapat di-loop dengan \`forEach\`).

---

## 3. Keamanan: \`textContent\` vs \`innerHTML\`

- **\`textContent\` (Direkomendasikan)**: Membaca atau menyisipkan teks polos. Sangat aman dari serangan Cross-Site Scripting (XSS).
- **\`innerHTML\`**: Membaca atau menyisipkan kode HTML mentah. **Bahaya:** Jangan pernah memasukkan input dari pengguna ke dalam \`innerHTML\` tanpa sanitasi, karena penyerang dapat menyuntikkan skrip jahat (\`<script>\`).

---

## 4. Manipulasi Kelas CSS dengan \`classList\`

Hindari mengubah style satu per satu dengan \`elem.style.color\`. Gunakan \`classList\` untuk menambah atau mencabut kelas CSS:

\`\`\`javascript
const kartu = document.querySelector(".card");

kartu.classList.add("aktif");       // Menambahkan class .aktif
kartu.classList.remove("tersembunyi"); // Menghapus class
kartu.classList.toggle("gelap");    // Otomatis tambah jika belum ada, hapus jika sudah ada
\`\`\``,
    contentEn: `## 1. What is the DOM Tree?

The Document Object Model (DOM) is an object-oriented programmatic representation of the HTML document structured as an in-memory tree:

\`\`\`text
                  document
                     │
                   <html>
                 ┌───┴───┐
              <head>   <body>
                         │
                      <header>
                     ┌───┴───┐
                    <h1>    <p>
\`\`\`

---

## 2. Modern Selection APIs

- **\`document.getElementById("id")\`**: Queries an individual unique element by ID.
- **\`document.querySelector("selector")\`**: Retrieves the first matching element using standard CSS selectors (\`.card\`, \`nav > a\`).
- **\`document.querySelectorAll("selector")\`**: Returns a NodeList matching all instances.

---

## 3. Security: \`textContent\` vs \`innerHTML\`

- **\`textContent\` (Safe Standard)**: Parses and injects plain text strictly. Neutralizes Cross-Site Scripting (XSS) attacks.
- **\`innerHTML\`**: Injects raw HTML markup. Hazardous when handling user inputs without sanitization.

---

## 4. Class Manipulation via \`classList\`

Avoid verbose inline styles (\`elem.style.background\`). Manage state using \`classList\`:

\`\`\`javascript
const card = document.querySelector(".card");

card.classList.add("active");
card.classList.remove("hidden");
card.classList.toggle("selected");
\`\`\``,
    programTitleId: 'Generator Kartu Dinamis dan Pengendali Tampilan DOM',
    programTitleEn: 'Dynamic Card Generator and DOM Mutation Controller',
    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Manipulasi DOM</title>
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

    h3 {
      color: #2E5B44;
      font-size: 20px;
      margin-bottom: 16px;
    }

    .input-bar {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    input {
      flex: 1;
      padding: 10px;
      border: 1px solid #CBD5E0;
      border-radius: 6px;
      font-size: 14px;
    }

    .btn-add {
      background-color: #2E5B44;
      color: white;
      border: none;
      padding: 10px 18px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
    }

    .card-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .item-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-left: 4px solid #2E5B44;
      border-radius: 8px;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background-color 0.15s ease;
    }

    .item-card.highlight {
      background-color: #E2F2E9;
    }

    .card-actions button {
      background: none;
      border: 1px solid #CBD5E0;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
      margin-left: 6px;
    }
  </style>
</head>
<body>

  <div class="container">
    <h3>Pembangun Kartu Dinamis (DOM Mutation)</h3>

    <div class="input-bar">
      <input type="text" id="judul-input" placeholder="Ketik nama tugas / catatan baru..." value="Mempelajari Seleksi Elemen DOM">
      <button class="btn-add" onclick="tambahKartu()">+ Tambah</button>
    </div>

    <div id="grid-kartu" class="card-grid"></div>
  </div>

  <script>
    function tambahKartu() {
      const inputElem = document.getElementById("judul-input");
      const teks = inputElem.value.trim();

      if (!teks) {
        alert("Harap masukkan teks judul terlebih dahulu!");
        return;
      }

      const gridContainer = document.getElementById("grid-kartu");

      // 1. Membuat Elemen Baru Secara Terprogram (createElement)
      const kartu = document.createElement("div");
      kartu.className = "item-card";

      // 2. Membuat Elemen Teks Judul
      const judulSpan = document.createElement("span");
      judulSpan.textContent = teks; // Aman dari XSS!

      // 3. Membuat Kontainer Tombol Aksi
      const aksiDiv = document.createElement("div");
      aksiDiv.className = "card-actions";

      // Tombol Sorot (classList.toggle)
      const btnSorot = document.createElement("button");
      btnSorot.textContent = "Sorot";
      btnSorot.onclick = function() {
        kartu.classList.toggle("highlight");
      };

      // Tombol Hapus (remove)
      const btnHapus = document.createElement("button");
      btnHapus.textContent = "Hapus";
      btnHapus.onclick = function() {
        kartu.remove(); // Menghapus elemen langsung dari pohon DOM
      };

      // 4. Menyusun Struktur Anak ke Induk
      aksiDiv.appendChild(btnSorot);
      aksiDiv.appendChild(btnHapus);

      kartu.appendChild(judulSpan);
      kartu.appendChild(aksiDiv);

      // 5. Menyisipkan Kartu ke Pohon DOM Utama (prepend/appendChild)
      gridContainer.prepend(kartu);

      // Bersihkan input dan kembalikan fokus
      inputElem.value = "";
      inputElem.focus();
    }

    // Buat kartu pertama otomatis
    tambahKartu();
  </script>

</body>
</html>`,
    breakdownId: [
      '`document.createElement("div")`: Menciptakan node elemen HTML baru di memori browser sebelum disisipkan ke layar.',
      '`judulSpan.textContent = teks`: Menyisipkan teks masukan pengguna secara aman tanpa risiko injeksi kode jahat.',
      '`kartu.classList.toggle("highlight")`: Menambahkan atau menghapus kelas CSS highlight secara dinamis saat tombol diklik.',
      '`kartu.remove()`: Menghapus simpul kartu langsung dari struktur pohon DOM secara bersih.',
      '`gridContainer.prepend(kartu)`: Menyisipkan elemen baru di posisi paling atas kontainer agar tugas terbaru langsung terlihat.'
    ],
    breakdownEn: [
      '`document.createElement("div")`: Instantiates a fresh HTML element node in memory.',
      '`judulSpan.textContent = teks`: Injects user-provided string content safely without HTML parsing vulnerabilities.',
      '`kartu.classList.toggle("highlight")`: Toggles CSS class presence dynamically on button interaction.',
      '`kartu.remove()`: Unmounts and tears down the DOM node directly from the parent tree.',
      '`gridContainer.prepend(kartu)`: Mounts new elements at the top of the collection immediately.'
    ],
    pitfallsId: [
      'Menyisipkan input pengguna via innerHTML: Ini adalah celah keamanan paling umum di web (XSS); penyerang dapat memasukkan <img src=x onerror=alert(1)> untuk mencuri data sesi.',
      'Lupa appendChild atau prepend: Membuat elemen dengan createElement tetapi lupa menyisipkannya ke kontainer induk akan membuat elemen tersebut tidak pernah tampil di layar.',
      'Menghapus elemen yang belum ada di DOM: Memanggil elem.remove() pada variabel yang bernilai null akan memicu TypeError.',
      'QuerySelector salah penulisan: Menulis querySelector("btn") alih-alih querySelector(".btn") untuk class akan menghasilkan null.'
    ],
    pitfallsEn: [
      'Injecting raw user input via innerHTML: Causes Cross-Site Scripting (XSS) vulnerabilities where malicious script payloads compromise applications.',
      'Forgetting appendChild or prepend: Creating nodes via createElement without appending leaves nodes detached in memory.',
      'Invoking methods on null selectors: Querying non-existent classes returns null; calling .remove() immediately throws a fatal TypeError.',
      'Selector syntax errors: Passing "btn" instead of ".btn" for class lookups queries non-existent HTML tags and returns null.'
    ]
  },

  // ── MINGGU 9: Event Handling dan Formulir Interaktif ─────────────────────────
  {
    week: 9,
    topicId: 'event-handling-dan-formulir',
    levelId: 'intermediate',
    levelNameId: 'Struktur Data & Interaksi DOM',
    levelNameEn: 'Data Structures & DOM Interaction',
    category: 'JavaScript',
    titleId: 'Event Handling dan Formulir Interaktif',
    titleEn: 'Event Handling and Interactive Forms',
    objectivesId: [
      'Menguasai mekanisme penanganan event modern menggunakan addEventListener()',
      'Memahami Event Object (e) dan metode e.preventDefault() untuk mencegah reload halaman',
      'Menguasai tipe-tipe event penting: click, submit, input, change, dan keydown',
      'Memahami konsep Event Propagation: Event Bubbling dan Event Delegation',
      'Membangun aplikasi Task Manager interaktif dengan validasi form (Level 2 Capstone)'
    ],
    objectivesEn: [
      'Master event listeners using addEventListener()',
      'Leverage the Event Object (e) and e.preventDefault() to suppress page reload',
      'Manage core user events: click, submit, input, change, keydown',
      'Understand Event Propagation: Event Bubbling and Event Delegation patterns',
      'Construct an interactive Task Manager application with form validation (Level 2 Capstone)'
    ],
    contentId: `## 1. Mekanisme \`addEventListener()\`

\`addEventListener\` adalah standar resmi untuk mengikat fungsi pendengar (*listener*) ke aksi pengguna:

\`\`\`javascript
const tombol = document.querySelector("#btn-simpan");

tombol.addEventListener("click", function(event) {
  console.log("Tombol diklik!");
});
\`\`\`

Kelebihan dibanding \`onclick\`:
1. Dapat mendaftarkan lebih dari satu pendengar pada elemen yang sama.
2. Memisahkan logika JavaScript sepenuhnya dari file HTML.

---

## 2. Event Object (\`e\`) dan \`e.preventDefault()\`

Ketika suatu event terjadi, browser secara otomatis menyertakan objek informasi event ke dalam fungsi listener:

\`\`\`javascript
const formulir = document.querySelector("#form-daftar");

formulir.addEventListener("submit", function(e) {
  e.preventDefault(); // Mencegah perilaku bawaan browser (reload halaman)
  
  const emailInput = document.querySelector("#email").value;
  console.log("Mengirim data email:", emailInput);
});
\`\`\`

- **\`e.preventDefault()\`**: Wajib digunakan pada event form \`submit\` agar aplikasi Single Page / JS tidak ter-refresh.
- **\`e.target\`**: Elemen spesifik tempat event itu pertama kali dipicu.

---

## 3. Event Bubbling & Delegation

Ketika sebuah tombol di dalam kartu diklik, event tersebut naik ke atas menelusuri elemen induknya seperti gelembung udara:

\`\`\`text
  Button clicked ──► Card parent ──► Grid container ──► Document
\`\`\`

**Event Delegation**: Alih-alih memasang 100 listener pada 100 item daftar, pasang **1 listener saja** pada kontainer induknya:

\`\`\`javascript
daftarUl.addEventListener("click", function(e) {
  if (e.target.tagName === "BUTTON") {
    console.log("Tombol daftar diklik:", e.target.textContent);
  }
});
\`\`\``,
    contentEn: `## 1. \`addEventListener()\` Mechanics

\`addEventListener\` binds discrete event listener callbacks to user interactions:

\`\`\`javascript
const button = document.querySelector("#btn-save");

button.addEventListener("click", (event) => {
  console.log("Button clicked!");
});
\`\`\`

Advantages over inline attributes:
1. Supports multiple discrete listeners on the same element.
2. Maintains pure separation between JavaScript logic and markup.

---

## 2. The Event Object (\`e\`) and \`e.preventDefault()\`

Browsers inject comprehensive metadata objects into every triggered callback:

\`\`\`javascript
const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Suppresses default browser page reload
  console.log("Processing payload client-side");
});
\`\`\`

- **\`e.preventDefault()\`**: Critical for form \`submit\` handlers to prevent full page reloads.
- **\`e.target\`**: The exact target element initiating the event dispatch.

---

## 3. Event Bubbling & Delegation

Events trigger on child elements then propagate upward through parent ancestor nodes:

\`\`\`text
  Button click ──► Card parent ──► Grid container ──► Document
\`\`\`

**Event Delegation**: Attach **a single listener** to the parent container rather than binding hundreds of redundant listeners to child items:

\`\`\`javascript
listContainer.addEventListener("click", (e) => {
  if (e.target.matches(".btn-delete")) {
    e.target.closest("li").remove();
  }
});
\`\`\``,
    programTitleId: 'Aplikasi Manajemen Tugas dengan Event Delegation dan Form PreventDefault',
    programTitleEn: 'Task Management App with Event Delegation and Form PreventDefault',
    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Event Handling dan Formulir</title>
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
      margin-bottom: 16px;
    }

    .task-form {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    input[type="text"] {
      flex: 1;
      padding: 10px 12px;
      border: 1px solid #CBD5E0;
      border-radius: 6px;
      font-size: 14px;
    }

    button[type="submit"] {
      background-color: #2E5B44;
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
    }

    .task-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .task-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 14px;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      background-color: #FFFFFF;
      transition: background-color 0.15s ease;
    }

    .task-item.completed {
      background-color: #F7FAFC;
      text-decoration: line-through;
      color: #A0AEC0;
      border-color: #EDF2F7;
    }

    .task-label {
      cursor: pointer;
      flex: 1;
      margin-left: 10px;
      font-size: 14px;
    }

    .btn-del {
      background: none;
      border: none;
      color: #E53E3E;
      cursor: pointer;
      font-size: 16px;
      padding: 4px 8px;
      border-radius: 4px;
    }

    .btn-del:hover {
      background-color: #FFF5F5;
    }

    .stats-footer {
      margin-top: 16px;
      font-size: 13px;
      color: #718096;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>

  <div class="container">
    <h3>Aplikasi Tugas Interaktif</h3>

    <!-- 1. Formulir Tugas dengan Event Submit -->
    <form id="task-form" class="task-form">
      <input type="text" id="task-input" placeholder="Tulis tugas baru..." required>
      <button type="submit">Tambah</button>
    </form>

    <!-- 2. Daftar Tugas dengan Event Delegation -->
    <ul id="task-list" class="task-list"></ul>

    <div class="stats-footer">
      <span id="task-counter">0 tugas tersimpan</span>
      <span>Klik teks untuk menandai selesai</span>
    </div>
  </div>

  <script>
    const form = document.getElementById("task-form");
    const input = document.getElementById("task-input");
    const list = document.getElementById("task-list");
    const counter = document.getElementById("task-counter");

    function updateCounter() {
      const total = list.children.length;
      counter.textContent = \`\${total} tugas aktif\`;
    }

    // 1. EVENT SUBMIT FORM (Mencegah reload browser)
    form.addEventListener("submit", function(e) {
      e.preventDefault(); // Wajib! Mencegah halaman refresh
      
      const judulTugas = input.value.trim();
      if (!judulTugas) return;

      // Membuat elemen task item
      const li = document.createElement("li");
      li.className = "task-item";
      li.innerHTML = \`
        <input type="checkbox" class="task-checkbox">
        <span class="task-label">\${judulTugas}</span>
        <button type="button" class="btn-del" title="Hapus Tugas">&times;</button>
      \`;

      list.appendChild(li);
      input.value = "";
      input.focus();
      updateCounter();
    });

    // 2. EVENT DELEGATION PADA ELEMEN INDUK (ul#task-list)
    list.addEventListener("click", function(e) {
      const target = e.target;
      const li = target.closest(".task-item");
      if (!li) return;

      // Aksi A: Tombol Hapus diklik
      if (target.classList.contains("btn-del")) {
        li.remove();
        updateCounter();
        return;
      }

      // Aksi B: Checkbox atau label diklik (Tandai selesai)
      if (target.classList.contains("task-checkbox") || target.classList.contains("task-label")) {
        li.classList.toggle("completed");
        const checkbox = li.querySelector(".task-checkbox");
        if (target !== checkbox) {
          checkbox.checked = !checkbox.checked;
        }
      }
    });
  </script>

</body>
</html>`,
    breakdownId: [
      '`e.preventDefault()`: Mencegah browser mengirim data ke server dan me-refresh halaman secara otomatis saat tombol submit ditekan.',
      '`list.addEventListener("click", ...)`: Pola Event Delegation yang menangani klik tombol hapus atau centang tugas melalui satu listener terpusat di kontainer `<ul>`.',
      '`e.target.closest(".task-item")`: Menemukan elemen pembungkus `<li>` terdekat dari elemen anak mana pun yang diklik pengguna.',
      '`li.classList.toggle("completed")`: Mengaktifkan efek coret teks dan warna abu-abu pada tugas yang telah diselesaikan.',
      '`input.focus()`: Mengembalikan kursor ketik ke input teks form secara otomatis untuk mempercepat pengisian tugas berikutnya.'
    ],
    breakdownEn: [
      '`e.preventDefault()`: Suppresses default browser HTML form submission reload behavior.',
      '`list.addEventListener("click", ...)`: Implements Event Delegation routing child events through a single parent listener.',
      '`e.target.closest(".task-item")`: Climbs ancestors up to the matching parent `<li>` container.',
      '`li.classList.toggle("completed")`: Applies strikethrough typography and muted color states dynamically.',
      '`input.focus()`: Programmatically returns text focus to the input box streamlining rapid data entry.'
    ],
    pitfallsId: [
      'Lupa e.preventDefault() pada submit form: Menyebabkan form langsung me-reload seluruh halaman browser dan semua data yang baru diketik langsung hilang.',
      'Memasang listener individual pada setiap item baru: Menambah ratusan listener di dalam loop dapat membebani penggunaan memori browser (kebocoran memori).',
      'Menggunakan button tanpa type="button" di dalam form: Elemen <button> di dalam <form> berstatus submit secara default; jika tidak diberi type="button", tombol hapus akan memicu submit form!',
      'Salah target pada e.target saat elemen bersarang: e.target menunjuk elemen terdalam (misal ikon di dalam tombol); gunakan e.target.closest() untuk mencari tombol pembungkusnya.'
    ],
    pitfallsEn: [
      'Omitting e.preventDefault() on submit: Form triggers full browser navigation immediately flushing runtime memory state.',
      'Attaching separate listeners per item: Binding separate listeners to dynamic nodes exhausts memory allocations.',
      'Unspecified button type in forms: Buttons inside forms default to type="submit"; deletion triggers unwanted form submissions.',
      'Nested e.target ambiguity: e.target points to internal icons; use e.target.closest() to resolve targeted parent elements.'
    ]
  }
];
