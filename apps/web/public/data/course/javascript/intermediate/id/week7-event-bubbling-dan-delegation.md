# Arsitektur Event: Event Bubbling, Capturing & Event Delegation

> **Kategori:** JavaScript | **Level:** DOM, Event & Arsitektur Objek | **Minggu 7:** Arsitektur Event: Event Bubbling, Capturing & Event Delegation
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami 3 fase Event: Capturing, Target, dan Bubbling Phase
- Menguasai teknik Event Delegation untuk efisiensi memori tinggi
- Menggunakan Element.closest() untuk deteksi target klik akurat
- Menghentikan perambatan event dengan event.stopPropagation()
- Mencegah aksi bawaan browser dengan event.preventDefault()

---

## Program: Papan Filter Tag E-Commerce Menggunakan Event Delegation

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Delegation Lab</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #F8FAFC; padding: 32px; }
    .container { max-width: 600px; margin: 0 auto; background: white; padding: 24px; border-radius: 16px; border: 1px solid #E2E8F0; }
    .tag-cloud { display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0; }
    .tag-btn { background: #E2E8F0; border: none; padding: 6px 14px; border-radius: 999px; cursor: pointer; font-size: 0.85rem; font-weight: 500; transition: all 0.2s; }
    .tag-btn.active { background: #2E5B44; color: white; }
    .log-panel { background: #0F172A; color: #38BDF8; font-family: monospace; padding: 16px; border-radius: 8px; font-size: 0.8rem; min-height: 100px; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Filter Tag Produk (Event Delegation)</h2>
    <div id="tag-container" class="tag-cloud">
      <button class="tag-btn" data-kategori="backend">Golang</button>
      <button class="tag-btn" data-kategori="backend">Rust</button>
      <button class="tag-btn" data-kategori="frontend">React</button>
      <button class="tag-btn" data-kategori="database">PostgreSQL</button>
    </div>
    <div class="log-panel" id="log-output">Klik salah satu tag di atas...</div>
  </div>

  <script>
    const tagContainer = document.getElementById("tag-container");
    const logOutput = document.getElementById("log-output");

    tagContainer.addEventListener("click", (event) => {
      const targetTombol = event.target.closest(".tag-btn");
      if (!targetTombol) return;

      targetTombol.classList.toggle("active");
      logOutput.textContent = "Tag: " + targetTombol.textContent + " | Status: " + (targetTombol.classList.contains("active") ? "AKTIF" : "NONAKTIF");
    });
  </script>
</body>
</html>
```

---

## Konsep Kunci

### Event Bubbling & Delegation
Saat sebuah elemen diklik, sinyal event memantul naik (*bubbles up*) dari anak ke seluruh leluhurnya hingga `window`.
Dengan **Event Delegation**, kita hanya mendaftarkan satu listener pada elemen kontainer induk, menghemat alokasi memori secara drastis.

---

---

## Penjelasan untuk Pemula

### Analogi: Bel Telepon Resepsionis
Event Delegation seperti bel telepon di meja resepsionis lobi: kamar hotel mana pun yang memencet tombol, deringnya berbunyi di meja resepsionis lobi utama.

## Eksperimen

- Klik tombol tag dan amati teks log yang berubah seketika.
- Klik di celah ruang kosong antara tag dan buktikan bahwa tidak ada error yang terjadi.
- Tambahkan tombol baru dengan appendChild dan buktikan tombol baru langsung aktif tanpa pasang listener baru.
- Uji event.stopPropagation() untuk melihat pemutusan jalur gelembung event.

---

## Tantangan

Bangun sistem tabel e-commerce di mana tombol hapus pada setiap baris ditangani hanya oleh 1 event listener di elemen `<tbody>`.

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

Kamu telah menguasai arsitektur event browser dan delegasi event. Minggu depan kita akan mempelajari pemrograman berorientasi objek dengan kelas ES6.
