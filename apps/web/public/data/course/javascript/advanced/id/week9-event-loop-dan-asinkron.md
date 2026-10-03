# Arsitektur Asinkron: Event Loop V8, Call Stack & Task Queues

> **Kategori:** JavaScript | **Level:** Asinkron, Storage & Proyek Kanban | **Minggu 9:** Arsitektur Asinkron: Event Loop V8, Call Stack & Task Queues
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami bahwa JavaScript adalah Single-Threaded berbasis Call Stack non-blocking
- Menguasai anatomi Event Loop: Call Stack, Microtasks, dan Macrotasks
- Memahami prioritas eksekusi Promise (Microtask) di atas setTimeout (Macrotask)
- Mencegah pembekuan thread browser (UI freeze) dengan pemrosesan asinkron
- Memanfaatkan queueMicrotask() untuk penjadwalan tugas prioritas tinggi

---

## Program: Simulasi Alur Antrean Event Loop (Microtasks vs Macrotasks)

```javascript
console.log("1. [Synchronous] Kode sinkron Call Stack dimulai.");

setTimeout(() => {
  console.log("4. [Macrotask - setTimeout] Berjalan di antrean macrotask.");
}, 0);

Promise.resolve().then(() => {
  console.log("3. [Microtask - Promise] Diproses sebelum Macrotask!");
});

console.log("2. [Synchronous] Kode sinkron Call Stack selesai.");
```

---

## Konsep Kunci

### Event Loop V8
JavaScript mengeksekusi kode sinkron pada Call Stack. Saat operasi asinkron selesai:
- Callback **Promise** masuk ke **Microtask Queue** (prioritas tertinggi).
- Callback **setTimeout** masuk ke **Macrotask Queue** (prioritas standar).
Seluruh antrean Microtask wajib dikosongkan terlebih dahulu sebelum browser beralih ke Macrotask berikutnya.

---

---

## Penjelasan untuk Pemula

### Analogi: Dokter dan Pasien Gawat Darurat
Call Stack adalah dokter yang sedang memeriksa pasien. Microtask adalah ambulans gawat darurat yang langsung ditangani dokter lebih dulu. Macrotask (setTimeout) adalah pasien antrean umum yang menunggu giliran dengan tertib.

## Eksperimen

- Jalankan kode dan amati urutan pencetakan 1 -> 2 -> 3 -> 4.
- Ubah waktu setTimeout dari 0 ke 500ms untuk melihat penundaan.
- Uji pemanggilan queueMicrotask() untuk verifikasi prioritas.
- Bandingkan waktu eksekusi kode sinkron vs asinkron di konsol.

---

## Tantangan

Buat fungsi `delay(ms)` berbasis Promise yang me-resolve setelah `ms` milidetik menggunakan setTimeout.

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

Kamu telah menguasai arsitektur V8 Event Loop. Minggu depan kita akan mendalami pemanggilan API HTTP dengan Promises, async/await, dan Fetch API.
