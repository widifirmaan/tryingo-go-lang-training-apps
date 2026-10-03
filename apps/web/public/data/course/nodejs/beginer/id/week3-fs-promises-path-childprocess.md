# Operasi Sistem: node:fs/promises, Path & Child Process Management

> **Kategori:** Node.js Backend | **Level:** Pemula | **Minggu 3:** Operasi Sistem: node:fs/promises, Path & Child Process Management
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menggunakan `node:fs/promises` untuk operasi disk non-blocking (`mkdir`, `appendFile`, `stat`).
- Mengamankan manipulasi path dari serangan Path Traversal (`path.resolve`, `path.normalize`).
- Mengeksekusi perintah eksternal menggunakan `child_process.execFile` (bebas dari serangan shell injection).
- Mengonversi callback lawas menjadi Promise menggunakan `node:util.promisify`.

---

## Program: Rotator File Log Otomatis & Pemantau Diagnostik Subproses Sistem

```javascript
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

// 1. Path Normalization & File System Promises
async function logTelemetryAudit(logDir, fileName, entry) {
  // Cegah Path Traversal Attack dengan path.join & path.resolve
  const safeDirPath = path.resolve(logDir);
  const targetFilePath = path.join(safeDirPath, fileName);

  // Buat direktori secara rekursif jika belum ada
  await fs.mkdir(safeDirPath, { recursive: true });

  const logLine = `[${new Date().toISOString()}] ${JSON.stringify(entry)}\n`;
  await fs.appendFile(targetFilePath, logLine, 'utf8');
  console.log(`[FS WRITE SUCCESS] Audit tersimpan ke: ${targetFilePath}`);

  // Periksa Ukuran File untuk Rotasi Log
  const stats = await fs.stat(targetFilePath);
  console.log(`Ukuran file saat ini: ${stats.size} bytes`);
  return stats.size;
}

// 2. Child Process: Menjalankan Perintah OS Diagnostik secara Aman
async function runSystemDiagnostics() {
  console.log('\n=== MENJALANKAN DIAGNOSTIK OS (CHILD PROCESS) ===');
  try {
    // Menjalankan executable langsung tanpa shell untuk mencegah Command Injection
    const isWindows = process.platform === 'win32';
    const cmd = isWindows ? 'cmd.exe' : 'uname';
    const args = isWindows ? ['/c', 'echo Node.js 22 LTS Telemetry Engine Active'] : ['-a'];

    const { stdout, stderr } = await execFileAsync(cmd, args);
    if (stderr) console.error('[CHILD PROCESS WARN]:', stderr);
    console.log('[CHILD PROCESS OUTPUT]:', stdout.trim());
  } catch (err) {
    console.error('[CHILD PROCESS ERROR]: Gagal menjalankan diagnostik:', err.message);
  }
}

// Eksekusi
const sampleAudit = { event: 'DEVICE_PING', deviceId: 'SNS-1002', status: 'OK' };
await logTelemetryAudit('./storage/logs', 'telemetry.log', sampleAudit);
await runSystemDiagnostics();
```

---

## Konsep Kunci

Aplikasi backend server tidak hanya menerima request HTTP, tetapi juga mengelola file log, berinteraksi dengan sistem operasi host, dan menjalankan subproses utilitas.

### Keunggulan node:fs/promises
Di masa lalu, operasi file menggunakan method callback (`fs.readFile(file, (err, data) => ...)`) yang memicu callback hell, atau method synchronous (`fs.readFileSync()`) yang memblokir seluruh event loop server. Modul `node:fs/promises` menyediakan antarmuka async/await modern yang sepenuhnya non-blocking.

### Mencegah Path Traversal Vulnerability
Jika backend menerima nama file dari pengguna (misal: `../../etc/passwd`), peretas dapat membaca atau menimpa file rahasia sistem operasi. Selalu gunakan `path.resolve` dan `path.join`, serta pastikan path tujuan berada di dalam direktori dasar yang diizinkan sebelum melakukan operasi file.

### Keamanan Child Process: exec vs execFile
- `exec('echo ' + input)`: Menjalankan string melalui sub-shell sistem operasi (`/bin/sh` atau `cmd.exe`). Jika input memuat tanda `; rm -rf /`, sistem Anda dapat diretas (Command Injection).
- `execFile(binary, [args])`: Menjalankan binary executable langsung tanpa shell, memperlakukan seluruh argumen sebagai data murni, sehingga 100% kebal terhadap injeksi shell.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda petugas arsip gedung. Menggunakan fs/promises seperti mengirim nota permintaan berkas ke petugas gudang bawah tanah sambil Anda terus melayani antrean tamu lain. Dan execFile seperti menyuruh kurir mengantar paket ke alamat yang sudah tertulis di amplop tertutup, bukan membiarkan kurir sembarangan membuka pintu dan menjelajahi seluruh gedung Anda.

## Eksperimen

- Ubah ukuran rotasi log: jika ukuran file melebihi 10KB, ganti nama file menjadi `telemetry.log.bak` menggunakan `fs.rename`.
- Coba panggil `execFile` dengan argumen yang memuat karakter `; echo hacked` dan buktikan perintah tersebut tidak dieksekusi sebagai shell command.
- Gunakan `fs.watch` untuk memantau perubahan file log secara real-time.

---

## Tantangan

Buat utilitas pembersihan direktori log asinkron `cleanupOldLogs(dir, maxAgeDays)` yang membaca seluruh file di direktori, mengecek `stats.mtimeMs`, dan menghapus file yang lebih tua dari batas hari.

---

## Model Mental & Diagram Alur Visual

![Diagram Arsitektur V8 Engine & Libuv Event Loop Node.js](/diagrams/js-event-loop.svg)

```diagram
┌──────────────┐     Call Stack Kosong?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Pemeriksa)   │
└──────┬───────┘                             └───────▲────────┘
       │ Operasi Async (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Selesai ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `const / let variabel`
- **Fungsi Utama:** Deklarasi variabel modern lingkup blok (Block Scope).
- **Parameter / Atribut:** `Identifier, Initial Value`.
- **Perilaku & Efek Sistem:** `const` untuk referensi konstan yang tidak dapat di-reassign; `let` untuk variabel nilai dinamis.
- **Contoh Penggunaan Praktis:**
```javascript
const appName = 'Tryngo';
let counter = 0;
counter += 1;
console.log(appName, counter);
```
- **Hasil Output yang Diharapkan:**
```text
Tryngo 1
```

### 2. `() => { ... } (Arrow Function)`
- **Fungsi Utama:** Sintaks fungsi ringkas dengan lexical 'this'.
- **Parameter / Atribut:** `Parameters, Function Body`.
- **Perilaku & Efek Sistem:** Menyederhanakan penulisan fungsi dan mempertahankan konteks `this` dari lingkup pembungkus luar.
- **Contoh Penggunaan Praktis:**
```javascript
const multiply = (a, b) => a * b;
console.log(multiply(6, 7));
```
- **Hasil Output yang Diharapkan:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Fungsi Utama:** Penanganan operasi asinkron berbasis Promise.
- **Parameter / Atribut:** `URL string, RequestInit options`.
- **Perilaku & Efek Sistem:** Menulis kode asinkron dengan alur linier layaknya kode sinkron tanpa callback hell.
- **Contoh Penggunaan Praktis:**
```javascript
async function fetchUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  const data = await res.json();
  return data;
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan objek data JSON terurai dari server
```

### 4. `Array.prototype.map() / filter()`
- **Fungsi Utama:** Transformasi array fungsional tanpa mutasi data asal.
- **Parameter / Atribut:** `callback(item, index, array)`.
- **Perilaku & Efek Sistem:** `map` menghasilkan array baru dari hasil transformasi; `filter` menyaring elemen berdasarkan kondisi boolean.
- **Contoh Penggunaan Praktis:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubledEvens = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2);
console.log(doubledEvens);
```
- **Hasil Output yang Diharapkan:**
```text
[4, 8]
```


---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Memblokir Event Loop (Synchronous CPU Intensive)
- **Gejala / Masalah:** Seluruh request pengguna lain tertahan dan server berhenti merespons (hang).
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Hindari operasi kriptografi berat atau parsing JSON raksasa di thread utama; gunakan Worker Threads.

### 2. Unhandled Exception pada Asynchronous Callback
- **Gejala / Masalah:** Server Node.js crash seketika dan mematikan seluruh proses aplikasi.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan async/await dengan try-catch terpusat dan daftarkan handler `process.on('unhandledRejection')`.

### 3. Memory Leak pada Event Emitter Listener
- **Gejala / Masalah:** Muncul warning `MaxListenersExceededWarning` dan memori RAM server meningkat terus-menerus.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu hapus event listener yang tidak digunakan lagi dengan `emitter.off()` atau `emitter.removeListener()`.

---

## Ringkasan

Kamu telah menguasai fs/promises, path sanitization, dan eksekusi child process yang aman. Minggu depan kita beralih ke framework HTTP berkecepatan tinggi: Fastify.
