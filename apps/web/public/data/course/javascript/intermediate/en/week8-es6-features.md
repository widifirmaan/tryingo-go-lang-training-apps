# ES6+ Features — Alat Singkat Modern

> **Kategori:** JavaScript | **Level:** Menengah | **Minggu 8:** ES6+ Features

## Tujuan Pembelajaran

- `destructuring` bongkar `const {nama} = pelanggan`, `spread` fotokopi `[...lama, baru]`, `rest` sisa
- `template` `` `Halo ${nama}` ``, `default` param, `arrow` singkat
- `optional chaining` `pelanggan?.alamat?.kota` aman jika kosong, `nullish` `??` default

---

## Kenapa Ini Penting Buat Kamu?

Warung list 10 produk — tulis `const nama = p.nama; const harga = p.harga` 10x capek. `const {nama, harga} = p` 1 baris.

---

## Program: Bongkar & Gabung Cepat

```javascript
const pelanggan = { nama: "Budi", umur: 25, alamat: { kota: "Jakarta" } };
const { nama, umur } = pelanggan; // bongkar
console.log(nama, umur);

const buah = ["apel", "mangga"];
const semua = [...buah, "durian"]; // fotokopi + tambah
console.log(semua);

function total(...angka){ return angka.reduce((a,b)=>a+b,0); } // rest sisa
console.log(total(1,2,3,4));

const kota = pelanggan.alamat?.kota ?? "Tidak ada"; // aman jika alamat null
console.log(kota);

const sapa = (nama="Tamu") => `Halo ${nama}`; // arrow + default
console.log(sapa());
console.log(sapa("Siti"));

// Gabung object
const base = { nama: "Beras", harga: 62000 };
const lengkap = { ...base, stok: 10, kategori: "Sembako" };
console.log(lengkap);
```

---

## Konsep Kunci

### Destructuring = Bongkar Kardus
`const {nama, harga} = produk` langsung jadi variabel.

### Spread/Rest `...`
- `[...lama, baru]` fotokopi tambah
- `function f(...sisa)` sisa jadi array

### `?.` & `??`
`pelanggan?.alamat?.kota` jika `alamat` null → tidak error, `??` jika kiri null pakai kanan.

---

## Penjelasan untuk Pemula

### Analogi: Bongkar & Fotokopi
- **Destructuring = bongkar kardus**: ambil `nama` dan `harga` langsung.
- **Spread = fotokopi + tambah**: fotokopi daftar lama tambah durian.

---

## Tantangan

**Katalog ES6:** `const p = {nama:"Beras", harga:62000, stok:10}` → `const {nama, harga} = p`, `const baru = {...p, diskon:10}`, `const kota = pelanggan?.alamat?.kota ?? "Jakarta"`.

---

## Ringkasan

Minggu 8: **ES6+** — bongkar & fotokopi cepat. Minggu depan: **Modules** — bagi file.
