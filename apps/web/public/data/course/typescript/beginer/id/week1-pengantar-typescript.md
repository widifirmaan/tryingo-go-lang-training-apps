# Pengantar TypeScript — Stiker Pengaman untuk JavaScript

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 1:** Pengantar TypeScript

## Tujuan Pembelajaran

- Memahami TypeScript = JavaScript + **stiker label** (tipe) yang cegah salah kirim
- Install TypeScript, ubah `app.js` jadi `app.ts`, jalankan `npx tsc` dan `npx tsc --watch`
- Tulis tipe dasar: `string`, `number`, `boolean` dengan `:`
- Biarkan TypeScript **tebak otomatis** (inference) — tidak harus tulis semua
- Lihat error merah **sebelum run**, bukan setelah pelanggan komplain

---

## Kenapa Ini Penting Buat Kamu?

JavaScript membiarkan `harga = "lima ribu"` (teks) lolos, baru error saat hitung. Warung rugi. TypeScript = **stiker pengaman di kotak**: `harga: number` artinya kotak hanya muat angka. Salah isi, VS Code langsung garis merah — perbaiki sebelum kirim.

Jika sudah paham JS minggu lalu, TS hanya tambah **1 titik dua**.

---

## Program: Struk Warung Bertipe

Simpan sebagai `struk.ts` → `npx tsc struk.ts` → `node struk.js`

```typescript
// struk.ts — sama seperti JS, tambah :tipe
const namaWarung: string = "Warung Bu Siti";
const berasKg: number = 2;
const hargaPerKg: number = 12500;
let pelanggan: string = "Budi";

// Type inference — tidak tulis :number, TS sudah tahu 0 itu number
let total = berasKg * hargaPerKg; // TS tebak: number
console.log(`Warung: ${namaWarung}, Pelanggan: ${pelanggan}, Total: Rp ${total}`);

// Fungsi dengan tipe — seperti resep dengan label bahan
function sapa(nama: string): string {
  return `Halo, ${nama}!`;
}
console.log(sapa("Budi"));
// console.log(sapa(123)); // ❌ Error merah: Argument of type 'number' is not assignable to 'string'

// Array bertipe — rak yang hanya muat 1 jenis
const hargaList: number[] = [10000, 15000, 20000];
const buah: string[] = ["apel", "mangga"];
// buah.push(123); // ❌ Error: number tidak masuk string[]

console.log("\n=== Inference ===");
const kota = "Jakarta"; // TS tebak string, tidak perlu :string
const tinggi = 175.5;   // number
// kota = 123; // ❌ Error

// Union sederhana minggu1 — kotak bisa 2 isi
let catatan: string | null = null; // boleh teks atau kosong
catatan = "Jangan pakai plastik";
console.log("Catatan:", catatan);

console.log("\n✅ TypeScript cek sebelum run — aman!");
```

**Cara jalankan (3 langkah):**
1. `npm install -g typescript` atau `npm install typescript --save-dev` di proyek
2. `npx tsc struk.ts` → buat `struk.js`
3. `node struk.js` → lihat hasil. Coba sengaja `sapa(123)` → `npx tsc` langsung error merah sebelum `node`.

---

## Konsep Kunci

### TS = JS + Stiker
`const nama: string` → stiker "hanya teks". `const umur: number` → stiker "hanya angka". JS tidak ada stiker.

### Inference = Tebak Otomatis
`const kota = "Jakarta"` TS tahu `string` tanpa `:string`. Tulis tipe hanya saat perlu kejelasan.

### Array Bertipe
`number[]` atau `Array<number>` — rak khusus angka. Salah isi langsung merah.

### Union `A | B`
`string | null` = boleh teks atau kosong. Untuk `catatan` yang opsional.

### Cek Sebelum Run
`tsc` kompilasi TS→JS dan cek tipe. Error muncul **di VS Code** (garis merah), bukan setelah deploy.

---

## Penjelasan untuk Pemula

### Analogi: Stiker Gudang

- **JS = kotak tanpa label**: masukkan beras atau batu, tidak ada yang protes.
- **TS = kotak dengan stiker**: `harga: number` stiker biru "Angka saja". Masukkan teks → satpam (VS Code) cegat.
- **`npx tsc` = satpam cek**: sebelum barang keluar gudang, satpam cek semua stiker.

### Langkah 0 — Install (Jika Belum)

```
npm install -g typescript
tsc --version  # harus 5.x
```

Di proyek Vite/React kamu: `npm install typescript --save-dev`

### Cara Komputer Membaca

1. Kamu tulis `const berasKg: number = "dua"` → `tsc` lihat `string` vs `number` → **error**, tidak buat `struk.js`.
2. Kamu betulkan `2` → `tsc` buat `struk.js` (JS biasa) → `node` jalankan.

### 3 Istilah Wajib

1. **Tipe**: label kotak (`: string`)
2. **Inference**: tebak otomatis
3. **Union**: boleh A atau B (`string | null`)

---

## Eksperimen

- **Hijau:** Ubah `berasKg: number = 2` jadi `"dua"` → lihat merah. Betulkan.
- **Kuning:** `let poin: number | string = 10; poin = "sepuluh";` — union boleh ganti?
- **Merah:** `buah: string[]` lalu `buah.push(123)` → error. Ganti jadi `number[]`?

---

## Tantangan

**Struk Bertipe:** Buat `function hitungTotal(berat: number, harga: number): number { return berat * harga }`. Panggil `hitungTotal(2, 12500)` ✅ dan sengaja `hitungTotal("2", 12500)` ❌ lihat error. Tambah `let diskon: number | null = null` dan `if (diskon !== null) total -= diskon`.

---

## Glosarium Mini

- **TypeScript**: JS berstiker
- **: string / : number**: anotasi tipe
- **Inference**: tebak tipe
- **Union `|`**: atau
- **tsc**: kompilator TS→JS

---

## Ringkasan

Minggu 1 dari 12: **Pengantar TypeScript** (Level: Lengkap). Kamu pasang stiker pengaman di kotak JS. Minggu depan: **Advanced Types** yang disederhanakan — `status: "ada" | "habis"` bukan teori.
