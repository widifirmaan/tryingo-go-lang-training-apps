# Array Modern: Transformasi Data dengan Map, Filter & Reduce

> **Kategori:** JavaScript | **Level:** Dasar Logika & Struktur Data | **Minggu 4:** Array Modern: Transformasi Data dengan Map, Filter & Reduce
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami paradigma pemrograman fungsional pada array: immutability (tidak mengubah array asli)
- Menggunakan Array.prototype.map() untuk mentransformasikan setiap elemen menjadi format data baru
- Menggunakan Array.prototype.filter() untuk menyaring elemen berdasarkan kondisi logika pengujian
- Menguasai Array.prototype.reduce() untuk mengagregasi kumpulan data menjadi nilai tunggal (angka, objek)
- Memanfaatkan Array.prototype.find() dan some() / every() untuk pencarian dan validasi cepat

---

## Program: Pipeline Pengolahan Data Penjualan E-Commerce

```javascript
// Kumpulan Data Produk E-Commerce
const katalog = [
  { id: 101, nama: "Mechanical Keyboard", kategori: "Aksesoris", harga: 850000, stok: 12 },
  { id: 102, nama: "Monitor UltraWide 34\"", kategori: "Display", harga: 6500000, stok: 4 },
  { id: 103, nama: "Mouse Wireless Ergonomis", kategori: "Aksesoris", harga: 450000, stok: 0 },
  { id: 104, nama: "Standing Desk Elektrik", kategori: "Furnitur", harga: 4200000, stok: 6 },
  { id: 105, nama: "USB-C Multiport Dock", kategori: "Aksesoris", harga: 750000, stok: 18 }
];

console.log("=== Pipeline Pengolahan Data Fungsional ===");

// 1. FILTER: Ambil hanya produk aksesoris yang tersedia stoknya
const aksesorisTersedia = katalog.filter((item) => {
  return item.kategori === "Aksesoris" && item.stok > 0;
});
console.log("Aksesoris Siap Kirim (Total:", aksesorisTersedia.length, "item)");

// 2. MAP: Transformasi data menjadi format ringkas untuk tampilan katalog
const kartuKatalog = aksesorisTersedia.map((item) => {
  return {
    namaProduk: item.nama,
    hargaFormat: "Rp " + item.harga.toLocaleString("id-ID"),
    statusGudang: item.stok > 10 ? "Stok Melimpah" : "Stok Terbatas"
  };
});
console.log("Format Tampilan:", kartuKatalog);

// 3. REDUCE: Hitung total nilai inventaris seluruh barang di gudang
// rumus: akumulator + (harga * stok)
const totalNilaiAsetGudang = katalog.reduce((total, item) => {
  return total + (item.harga * item.stok);
}, 0); // 0 adalah nilai awal akumulator

console.log("\nTotal Nilai Aset Gudang : Rp " + totalNilaiAsetGudang.toLocaleString("id-ID"));

// 4. FIND & SOME: Pencarian Cepat
const produkMahal = katalog.find((item) => item.harga > 5000000);
console.log("Item Premium Ditemukan  :", produkMahal ? produkMahal.nama : "Tidak ada");

const adaStokHabis = katalog.some((item) => item.stok === 0);
console.log("Apakah ada barang kosong?:", adaStokHabis ? "Ya, segera re-order!" : "Semua aman");
```

---

## Konsep Kunci

### Prinsip Immutability pada Array Modern
Metode lama seperti \`splice()\` atau mengedit indeks secara langsung merusak data asli (*mutation*). Metode fungsional modern (\`map\`, \`filter\`, \`slice\`) selalu **menghasilkan array baru** dan membiarkan array sumber tetap utuh. Ini adalah pondasi wajib dalam pengembangan web modern dan framework reaktif seperti React.

### Tiga Serangkai: Map, Filter, Reduce
1. **\`filter(predicate)\`**: Menguji setiap elemen. Jika fungsi mengembalikan \`true\`, elemen tersebut dimasukkan ke dalam array hasil baru.
2. **\`map(transform)\`**: Mengubah setiap elemen menjadi bentuk lain dengan panjang array hasil yang persis sama dengan array awal.
3. **\`reduce(accumulator, current, initialValue)\`**: Mengalirkan seluruh data ke dalam satu nilai akumulasi (misalnya menjumlahkan total harga belanjaan atau mengelompokkan item berdasarkan kategori).

### Pencarian: find vs filter
- \`filter()\` selalu mengembalikan array (bisa kosong, bisa banyak).
- \`find()\` berhenti mencari begitu menemukan kecocokan pertama dan langsung mengembalikan objek elemen tersebut (atau \`undefined\` jika tidak ada).

---

---

## Penjelasan untuk Pemula

### Analogi: Pabrik Pengolahan Kopi
1. **`filter`** seperti saringan kopi: hanya biji kopi berkualitas super yang lolos saringan, biji kopi yang pecah atau busuk ditahan di atas saringan.
2. **`map`** seperti mesin pemanggang dan pembungkus: setiap biji kopi yang masuk diubah bentuknya menjadi satu bungkus bubuk kopi harum.
3. **`reduce`** seperti mesin timbangan gudang: semua karung kopi yang datang ditimbang dan diakumulasikan menjadi satu angka total berat dalam kilogram di buku kas.

## Eksperimen

- Lupa memberikan nilai awal 0 pada reduce, amati apakah hasilnya berbeda dan pahami bahayanya jika array-nya kosong.
- Rangkai metode secara berantai (method chaining): katalog.filter(...).map(...) dan amati keindahan alur fungsionalnya.
- Coba ubah filter agar mencari kategori "Furnitur" dan perhatikan hasil array yang baru.
- Uji katalog.every(item => item.harga > 100000) untuk memverifikasi apakah semua barang harganya di atas 100 ribu.

---

## Tantangan

Buat pipeline data analitik e-commerce: hitung total pendapatan dari hanya transaksi yang berstatus "PAID", lalu hasilkan objek ringkasan `{ totalOmset: ..., jumlahTransaksi: ..., rataRata: ... }` hanya menggunakan metode fungsional array.

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
- **Fungsi Utama:** Deklarasi variabel modern lingkup blok.
- **Parameter / Atribut:** `Identifier, Initial Value`.
- **Perilaku & Efek Sistem:** `const` untuk referensi konstan yang tidak diubah; `let` untuk nilai dinamis reassignable..
- **Contoh Penggunaan Praktis:**
```javascript
const app = 'Tryngo';
let count = 0;
count += 1;
console.log(app, count);
```
- **Hasil Output yang Diharapkan:**
```text
Tryngo 1
```

### 2. `() => { ... } (Arrow Function)`
- **Fungsi Utama:** Sintaks fungsi ringkas dengan lexical this.
- **Parameter / Atribut:** `Parameters, Function Body`.
- **Perilaku & Efek Sistem:** Menyederhanakan penulisan fungsi dan mempertahankan konteks `this` dari lingkup luar..
- **Contoh Penggunaan Praktis:**
```javascript
const square = (n) => n * n;
console.log(square(7));
```
- **Hasil Output yang Diharapkan:**
```text
49
```

### 3. `async / await & fetch(url)`
- **Fungsi Utama:** Penanganan operasi asinkron linear.
- **Parameter / Atribut:** `URL string, RequestInit options`.
- **Perilaku & Efek Sistem:** Membaca data HTTP API secara asinkron tanpa callback hell..
- **Contoh Penggunaan Praktis:**
```javascript
async function loadData() {
  const res = await fetch('https://api.example.com/data');
  return await res.json();
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan data JSON dari server
```

### 4. `Array.prototype.map() / filter()`
- **Fungsi Utama:** Transformasi array fungsional immutable.
- **Parameter / Atribut:** `callback(item, index)`.
- **Perilaku & Efek Sistem:** `map` menghasilkan array baru dari hasil transformasi; `filter` menyaring data..
- **Contoh Penggunaan Praktis:**
```javascript
const nums = [1, 2, 3, 4];
const evens = nums.filter(n => n % 2 === 0);
console.log(evens);
```
- **Hasil Output yang Diharapkan:**
```text
[2, 4]
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

Kamu telah menguasai logika dasar, tipe data, closures, dan manipulasi array fungsional. Minggu depan kita memasuki Level 2: manipulasi DOM browser langsung dan arsitektur event interaktif.
