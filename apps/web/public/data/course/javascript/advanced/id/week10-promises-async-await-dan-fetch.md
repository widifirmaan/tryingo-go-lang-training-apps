# Promises, Async/Await & Konsumsi HTTP REST API dengan Fetch

> **Kategori:** JavaScript | **Level:** Asinkron, Storage & Proyek Kanban | **Minggu 10:** Promises, Async/Await & Konsumsi HTTP REST API dengan Fetch
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami 3 status Promise: Pending, Fulfilled, dan Rejected
- Menggunakan async/await untuk penulisan kode asinkron yang bersih
- Memahami bahwa fetch() tidak reject pada status HTTP 404/500
- Selalu memeriksa response.ok sebelum parsing JSON
- Menerapkan blok try-catch-finally untuk penanganan error tangguh

---

## Program: Klien Pemanggil API Publik GitHub dengan Penanganan Error Kuat

```javascript
async function ambilProfilGithub(username) {
  const url = "https://api.github.com/users/" + encodeURIComponent(username);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("HTTP Gagal dengan status: " + response.status);
    }
    const data = await response.json();
    console.log("Nama Pengguna:", data.name || data.login);
    console.log("Repositori   :", data.public_repos, "repositori");
    return data;
  } catch (error) {
    console.error("[ERROR]", error.message);
    return null;
  } finally {
    console.log("[SELESAI] Request jaringan ditutup.");
  }
}

ambilProfilGithub("torvalds");
```

---

## Konsep Kunci

### Async/Await & Fetch API
Kata kunci `async` menandai fungsi mengembalikan Promise, sementara `await` menjeda eksekusi fungsi secara non-blocking hingga Promise selesai.
Ingat: `fetch()` hanya melempar reject saat koneksi jaringan putus total, bukan saat server membalas dengan status 404 atau 500. Selalu periksa `response.ok`!

---

---

## Penjelasan untuk Pemula

### Analogi: Bel Getar di Kafe
Promise seperti bel pager nirkabel yang diberikan kasir kafe: saat menunggu kopi diracik (**Pending**), saat kopi siap bel bergetar (**Fulfilled**), dan jika kopi habis barista mengembalikan uang (**Rejected**).

## Eksperimen

- Panggil username yang tidak ada dan amati pesan error status 404.
- Gunakan Promise.all untuk mengambil dua profil sekaligus secara paralel.
- Matikan koneksi internet untuk melihat TypeError yang ditangkap blok catch.
- Perhatikan bahwa blok finally selalu berjalan di akhir.

---

## Tantangan

Buat fungsi `cariRepo(keyword)` yang mengambil repositori terpopuler dari GitHub API dan mengembalikan array 3 proyek teratas.

---

## Model Mental & Diagram Alur Visual

![Diagram JavaScript Event Loop & Asynchronous Architecture](/diagrams/js-event-loop.svg)

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

### 1. Perilaku Equality Lemah (== vs ===)
- **Gejala / Masalah:** Coercion tipe data tak terduga (misal `0 == ''` bernilai `true`).
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu gunakan operator strict equality (`===` dan `!==`).

### 2. Mutasi Objek & Array secara Langsung
- **Gejala / Masalah:** Perubahan state tidak terdeteksi oleh reactive framework atau memicu bug sampingan tak terduga.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan spread operator (`{ ...obj }`, `[...arr]`) atau metode immutable seperti `.map()`, `.filter()`, dan `.toSorted()`.

### 3. Unhandled Promise Rejection & Async/Await tanpa Try-Catch
- **Gejala / Masalah:** Aplikasi crash atau thread backend macet tanpa log error yang jelas.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu bungkus `await` dalam blok `try { ... } catch (err) { ... }`.

---

## Ringkasan

Kamu telah menguasai konsumsi API jaringan dengan async/await dan Fetch API. Minggu depan kita akan mendalami penyimpanan data lokal browser.
