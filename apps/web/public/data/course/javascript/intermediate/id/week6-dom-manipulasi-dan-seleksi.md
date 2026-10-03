# Manipulasi DOM: querySelector, Pembuatan Elemen & ClassList

> **Kategori:** JavaScript | **Level:** DOM, Event & Arsitektur Objek | **Minggu 6:** Manipulasi DOM: querySelector, Pembuatan Elemen & ClassList
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami konsep Document Object Model (DOM) sebagai representasi pohon simpul (tree of nodes) dari HTML
- Menggunakan document.querySelector() dan document.querySelectorAll() dengan selektor CSS standar
- Membuat elemen dinamis secara aman menggunakan document.createElement() dan appendChild() / append()
- Memahami bahaya celah keamanan XSS (Cross-Site Scripting) pada innerHTML dan selalu memilih textContent
- Mengelola kelas CSS secara dinamis dengan classList.add(), classList.remove(), dan classList.toggle()

---

## Program: Aplikasi Catatan Dinamis dengan Pembuatan Elemen DOM Native

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DOM Manipulation Lab</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #F8FAFC; color: #1E293B; padding: 32px; }
    .card { background: white; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; max-width: 480px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .todo-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: #F1F5F9; border-radius: 8px; margin-bottom: 8px; }
    .completed { text-decoration: line-through; opacity: 0.6; background: #E2E8F0; }
    .btn-del { background: #EF4444; color: white; border: none; padding: 4px 10px; border-radius: 6px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="card">
    <h2>Daftar Catatan Sprint</h2>
    <div style="display: flex; gap: 8px; margin: 16px 0;">
      <input type="text" id="input-tugas" placeholder="Tulis tugas baru..." style="flex: 1; padding: 8px 12px; border-radius: 6px; border: 1px solid #CBD5E1;">
      <button id="btn-tambah" style="background: #2E5B44; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600;">+ Tambah</button>
    </div>
    <div id="daftar-tugas"></div>
  </div>

  <script>
    const inputTugas = document.getElementById("input-tugas");
    const btnTambah = document.getElementById("btn-tambah");
    const containerDaftar = document.querySelector("#daftar-tugas");

    function tambahTugasBaru(teks) {
      if (!teks.trim()) return;

      const itemDiv = document.createElement("div");
      itemDiv.classList.add("todo-item");

      const teksSpan = document.createElement("span");
      teksSpan.textContent = teks;
      teksSpan.style.cursor = "pointer";

      teksSpan.addEventListener("click", () => {
        itemDiv.classList.toggle("completed");
      });

      const btnHapus = document.createElement("button");
      btnHapus.textContent = "Hapus";
      btnHapus.classList.add("btn-del");

      btnHapus.addEventListener("click", () => {
        itemDiv.remove();
      });

      itemDiv.appendChild(teksSpan);
      itemDiv.appendChild(btnHapus);
      containerDaftar.appendChild(itemDiv);

      inputTugas.value = "";
      inputTugas.focus();
    }

    btnTambah.addEventListener("click", () => {
      tambahTugasBaru(inputTugas.value);
    });

    inputTugas.addEventListener("keydown", (e) => {
      if (e.key === "Enter") tambahTugasBaru(inputTugas.value);
    });
  </script>
</body>
</html>
```

---

## Konsep Kunci

### Pohon DOM & Keamanan XSS
Browser membaca HTML dan membangun representasi pohon simpul (*DOM Tree*) di memori.
Menyuntikkan data pengguna langsung dengan `innerHTML` membuka celah serangan **Cross-Site Scripting (XSS)** di mana skrip berbahaya dapat mencuri token sesi pengguna. Selalu buat elemen terisolasi dengan `document.createElement()` dan masukkan teks dengan `textContent`.

---

---

## Penjelasan untuk Pemula

### Analogi: Pohon Keluarga Beranting
DOM seperti pohon silsilah keluarga: `<html>` adalah akar, `<body>` adalah batang pohon, dan setiap paragraf `<p>` adalah ranting kecil yang dapat dipangkas atau dipasangi buah baru oleh JavaScript.

## Eksperimen

- Masukkan teks <strong>Tebal</strong> ke dalam input dan buktikan bahwa teks tidak diubah menjadi tebal (aman dari XSS).
- Klik catatan yang sudah dibuat untuk mencoret teks secara interaktif dengan classList.toggle.
- Ketik document.body.style.background = "#0F172A" di console DevTools untuk mengubah warna latar secara live.
- Periksa jumlah simpul dengan document.querySelectorAll(".todo-item").length di console.

---

## Tantangan

Tambahkan tombol "Hapus Semua Catatan" yang mengosongkan seluruh isi container menggunakan `container.replaceChildren()` atau `container.innerHTML = ""`.

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

Kamu telah menguasai manipulasi DOM aman dan pengelolaan kelas dinamis. Minggu depan kita akan mendalami event bubbling dan event delegation.
