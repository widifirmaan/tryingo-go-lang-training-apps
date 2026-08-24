# Dasar Sintaks JavaScript — Kalkulator Warung Pertama

> **Kategori:** JavaScript | **Level:** Pemula | **Minggu 1:** Dasar Sintaks JavaScript

## Tujuan Pembelajaran

- Memahami JavaScript seperti kalkulator warung: simpan angka, hitung, tampilkan
- Menyimpan data dengan `let` (bisa ubah) dan `const` (tetap)
- Kenali 5 tipe dasar: teks (`string`), angka (`number`), ya/tidak (`boolean`), kosong (`null`/`undefined`)
- Hitung dengan `+ - * / %` dan gabung teks dengan `` `Halo ${nama}` ``
- Cek tipe dengan `typeof` dan lihat hasil di `console.log`

---

## Kenapa Ini Penting Buat Kamu?

Kamu tidak perlu jadi programmer untuk hitung. Ibu warung hitung total belanja, guru hitung nilai, admin hitung ongkir — **semua itu variabel + hitungan**. JavaScript adalah **kalkulator di browser** yang bisa simpan dan hitung otomatis. Hari ini kamu bikin kalkulator struk belanja, bukan "Hello World" abstrak.

---

## Program: Struk Belanja Warung

Salin ke playground atau VS Code → `node struk.js`

```javascript
// ── Struk Belanja — seperti nota tulis tangan, tapi di komputer ──
const namaWarung = "Warung Bu Siti"; // const = tidak berubah
let pelanggan = "Budi";              // let = bisa ganti

const berasKg = 2;                   // number
const hargaPerKg = 12500;
const telurKg = 1;
const hargaTelur = 28000;

let total = berasKg * hargaPerKg + telurKg * hargaTelur;
console.log("Warung:", namaWarung);
console.log("Pelanggan:", pelanggan);
console.log("Total belanja: Rp", total.toLocaleString("id-ID"));

// Tipe data
console.log("\n=== Cek Tipe ===");
console.log("namaWarung:", typeof namaWarung); // string
console.log("berasKg:", typeof berasKg);       // number
console.log("total:", typeof total);

// Gabung teks dengan template literal (pakai backtick `)
const struk = `Halo ${pelanggan}, totalmu Rp ${total.toLocaleString("id-ID")}. Terima kasih!`;
console.log("\n" + struk);

// Ubah nilai let
pelanggan = "Siti";
total = total + 5000; // tambah ongkir
console.log("\nSetelah ganti pelanggan & tambah ongkir:");
console.log(`Pelanggan: ${pelanggan}, Total baru: Rp ${total.toLocaleString("id-ID")}`);

// Null & undefined — seperti kotak kosong vs belum ada kotak
let catatan = null;      // sengaja kosong
let belumDiisi;          // belum diisi apapun
console.log("\ncatatan:", catatan, "| belumDiisi:", belumDiisi);
console.log("typeof null:", typeof null); // object (keanehan JS, hafalkan saja)
```

**Cara coba:**
1. **Di Tryngo playground:** salin, klik Run → lihat output kanan.
2. **Di laptop:** buat file `struk.js` di VS Code, buka Terminal → `node struk.js`

---

## Konsep Kunci

### `const` vs `let` — Kotak Terkunci vs Kotak Bisa Dibuka
- `const namaWarung = "Siti"` → **kotak dikunci**, tidak boleh `namaWarung = "Baru"` (error).
- `let pelanggan = "Budi"` → **kotak biasa**, boleh `pelanggan = "Siti"`.
- Hindari `var` (kotak lama, bocor).

### Tipe Dasar (Hafal 5)
- `string` = teks `"Budi"`, `"Rp 5000"`
- `number` = angka `25`, `3.14`, `62000`
- `boolean` = `true`/`false` (nanti untuk `if`)
- `null` = sengaja kosong (`let catatan = null`)
- `undefined` = belum diisi (`let x;`)

### Operator Aritmatika
`+ - * / % **` → `%` sisa bagi (10%3=1), `**` pangkat (2**3=8).

### Template Literal `` ` ``
Pakai backtick (kiri angka 1 di keyboard): `` `Halo ${nama}, umur ${umur}` `` lebih rapi dari `"Halo " + nama`.

### `typeof` dan `console.log`
`typeof x` cek tipe, `console.log()` tampilkan di layar hitam output.

---

## Penjelasan untuk Pemula

### Analogi: Buku Kas Warung

- **`let`/`const` = baris di buku kas**: `const hargaPerKg = 12500` = harga tulis permanen, `let total = ...` = total yang tiap transaksi berubah.
- **Tipe = jenis tinta**: `string` tinta huruf, `number` tinta angka.
- **Template literal = stempel otomatis**: `` `Total ${total}` `` = stempel yang otomatis isi angka, tidak tulis manual.

### Langkah Jalankan di Laptop (Jika Ingin di Luar Playground)

1. Install Node.js LTS dari `nodejs.org` (sudah di Next.js)
2. Buka VS Code → `File → Open Folder` → buat `struk.js`
3. Terminal → `node struk.js` → lihat struk.

### Cara Komputer Membaca

1. `const berasKg = 2` → simpan 2 di kotak `berasKg`
2. `total = berasKg * hargaPerKg` → ambil 2, kali 12500 → 25000 → simpan di `total`
3. `` `Halo ${pelanggan}` `` → ambil isi `pelanggan` → tempel di teks.

### 3 Istilah Wajib

1. **Variabel**: kotak berlabel untuk simpan data.
2. **const/let**: jenis kotak (kunci vs biasa).
3. **Template literal**: cara gabung teks + variabel pakai `` ` `` dan `${}`.

---

## Eksperimen

- **Hijau:** Ganti `berasKg = 5` dan `pelanggan = "Andi"` → Run → total berubah?
- **Kuning:** Buat `` `Diskon 10% = ${total * 0.1}` `` dan tampilkan.
- **Merah:** Coba `const namaWarung = "Baru"; namaWarung = "X"` → error `Assignment to constant variable`. Ganti jadi `let`.

---

## Tantangan

**Kalkulator Ongkir Warung (Wajib):** Minta 2 angka hardcode `berat = 2.5` kg dan `jarak = 8` km, hitung `ongkir = berat*5000 + jarak*2000`, tampilkan dengan template literal: `"Berat 2.5kg, jarak 8km → ongkir Rp 28.500"`. Tampilkan juga `typeof ongkir`.

**Bonus:** Tambah `catatan = null` jika tanpa catatan, tampilkan `Catatan: (tidak ada)`.

---

## Glosarium Mini

- **Variabel**: kotak penyimpanan
- **const**: kotak terkunci
- **let**: kotak bisa ubah
- **string/number/boolean**: jenis data
- **Template literal**: `` `teks ${variabel}` ``

---

## Ringkasan

Minggu 1 dari 14: **Dasar Sintaks JavaScript** (Level: Pemula). Kamu sudah bisa simpan data warung dan hitung struk. Minggu depan: **Tipe Data & Struktur** — susun daftar belanja (array) dan kartu pelanggan (object).
