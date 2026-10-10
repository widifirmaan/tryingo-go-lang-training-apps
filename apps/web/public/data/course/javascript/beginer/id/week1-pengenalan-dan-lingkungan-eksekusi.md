# Pengenalan JavaScript, Console, dan Lingkungan Eksekusi

> **Kategori:** JavaScript | **Level:** Dasar JavaScript & Logika | **Minggu 1:** Pengenalan JavaScript, Console, dan Lingkungan Eksekusi
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami peran JavaScript sebagai bahasa pemrograman dinamis pada trio web (HTML, CSS, JS)
- Mengetahui perbedaan eksekusi di lingkungan browser (DOM) vs terminal server (Node.js)
- Menguasai penulisan perintah output: console.log(), console.warn(), dan console.error()
- Mengenal 2 metode penyisipan script: tag inline <script> dan file eksternal (main.js)
- Membangun struktur scaffolding proyek JavaScript standar (index.html dan main.js)

---

## 1. Apa Itu JavaScript dan Perannya dalam Web?

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

```text
my-js-app/
├── index.html       # Kerangka antarmuka
├── main.js          # Seluruh logika JavaScript
└── styles.css       # Aturan tampilan visual
```

File JavaScript eksternal dihubungkan menggunakan tag `<script>` dengan atribut `src`:

```html
<!-- Disarankan diletakkan sebelum penutup </body> atau di <head> dengan atribut defer -->
<script src="main.js"></script>
```

---

## 4. Perintah Console dan Komentar Kode

Console adalah alat diagnosa utama pengembang untuk memantau data runtime:

```javascript
// 1. Komentar satu baris
/* 
   2. Komentar multi-baris 
*/

console.log("Pesan informasi umum");
console.warn("Pesan peringatan sistem");
console.error("Pesan galat/kesalahan");
```

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **Live Server** (`ritwickdey.liveserver`): Local dev server dengan reload otomatis untuk file HTML/JS
- **Prettier** (`esbenp.prettier-vscode`): Code formatting otomatis

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension ritwickdey.liveserver --install-extension esbenp.prettier-vscode
```

---

### 2. Instalasi Runtime & Dependency (Node.js LTS (Untuk eksekusi terminal))
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
winget install OpenJS.NodeJS.LTS
```

**macOS (Terminal / Homebrew):**
```bash
brew install node
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install nodejs npm
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
node -v
```

Output yang diharapkan:
```output
v20.x.x
```

> 💡 **Tips Prasyarat:** JavaScript dapat dijalankan langsung di browser mana pun tanpa instalasi runtime tambahan.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
mkdir my-js-app && cd my-js-app
npm init -y
node -e "const p=JSON.parse(fs.readFileSync('package.json')); p.type='module'; fs.writeFileSync('package.json', JSON.stringify(p, null, 2))"
```
- **Keterangan:** Menyiapkan package.json dengan dukungan `"type": "module"` untuk sintaks import/export.
- **Pindah ke direktori project:**
```bash
cd my-js-app
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
node main.js
```
Akses di browser atau terminal: `Terminal / Browser Console`

> ℹ️ Jalankan skrip di terminal atau hubungkan ke file index.html menggunakan Live Server.

**File Titik Masuk Utama (`main.js`):**
```js
// main.js - Titik Masuk JavaScript
const namaAplikasi = "Portal Belajar Tryngo";
const versi = 1;

function sapaPengguna(nama) {
  return `Selamat datang di ${namaAplikasi} (v${versi}), ${nama}!`;
}

console.log(sapaPengguna("Pengembang"));
```
Sintaks fungsi dan variabel dasar untuk titik masuk aplikasi.

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-js-app/
├── main.js          # Skrip utama JavaScript
├── utils.js         # Fungsi helper modular
└── package.json     # Konfigurasi module
```
Struktur modular bersih menggunakan ES Modules.

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan `const` secara default, dan gunakan `let` hanya jika nilai variabel perlu diubah ulang.
- Gunakan `console.log()` untuk memeriksa nilai data dan alur logika di browser console.

---

## Program: Program Logger Konsol dan Antarmuka Runtime Interaktif

```html
<!DOCTYPE html>
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
      ].join("\n");

      outputElem.textContent = infoRuntime;
      console.log("Inisialisasi selesai tanpa galat.");
    }

    // Jalankan otomatis saat halaman pertama kali dimuat
    jalankanSkrip();
  </script>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `<script> ... </script>`: Tag HTML tempat kode logika JavaScript disematkan dan dieksekusi secara otomatis oleh browser.
- `console.log()` & `console.warn()`: Mengirimkan catatan diagnostik ke panel Developer Tools (tekan tombol F12 di browser untuk melihat).
- `document.getElementById("output")`: Menghubungkan skrip JavaScript ke elemen HTML spesifik berdasarkan atribut id.
- `outputElem.textContent`: Mengubah isi teks elemen secara aman tanpa risiko keamanan XSS.
- `onclick="jalankanSkrip()"`: Mengikat fungsi JavaScript ke event klik tombol pengguna.

---

## Eksperimen di Playground

1. Ubah nilai variabel, parameter, atau teks pada kode program di Playground dan amati perubahan hasil outputnya secara langsung.
2. Coba tambahkan kondisi logika atau fungsi baru sesuai skenario kebutuhan Anda.
3. Periksa Developer Console di browser (tekan F12) untuk melihat alur eksekusi console.log runtime.

---

## Tantangan Praktik

Terapkan konsep Minggu 1 ini pada file main.js proyek Anda. Pastikan penggunaan const dan let tepat, tangani kemungkinan nilai null/undefined, dan gunakan penamaan variabel yang deskriptif.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Menulis skrip sebelum elemen HTML dirender: Menempatkan skrip di <head> tanpa atribut defer dapat menyebabkan error karena elemen HTML belum selesai dibuat saat skrip dijalankan.
- Lupa membuka Developer Tools Console: Banyak pemula bingung mengapa tidak melihat output console.log karena belum membuka tab Console di inspect element.
- Sensitivitas huruf besar-kecil (Case-Sensitive): JavaScript membedakan console.log() dan Console.Log(). Menulis huruf kapital akan memicu error ReferenceError.
- Mencampuradukkan tanda kutip: Membuka string dengan kutip ganda (") lalu menutup dengan kutip tunggal (') menyebabkan SyntaxError.

---

## Ringkasan

- Modul Minggu 1 (Pengenalan JavaScript, Console, dan Lingkungan Eksekusi) melatih pemahaman logika pemrograman dan komputasi JavaScript secara praktis.
- Seluruh kode program mematuhi standar ECMAScript murni dan dapat langsung dijalankan serta diuji di browser maupun CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan kemampuan logika hingga aplikasi web interaktif utuh terselesaikan.
