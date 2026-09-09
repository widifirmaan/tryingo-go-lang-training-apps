# Design Patterns — Cetak Biru Warung Rapi

> **Kategori:** JavaScript | **Level:** Lanjutan | **Minggu 11:** Design Patterns

## Tujuan Pembelajaran

- `Singleton` 1 kasir, `Factory` pabrik produk, `Observer` langganan stok habis, `Strategy` colokan cara bayar

---

## Kenapa Ini Penting Buat Kamu?

Tanpa pola, `if` bayar 20x duplikat + tambah cara ubah 20 tempat. Dengan `Strategy` tambah 1 class; `Singleton` 1 kasir; `Observer` siar stok.

---

## Program

```javascript
// Singleton — 1 kasir
class Kasir {
  static instance = null;
  static getInstance(){ if(!Kasir.instance) Kasir.instance = new Kasir(); return Kasir.instance; }
}
const a = Kasir.getInstance();
const b = Kasir.getInstance();
console.log(a === b); // true, sama

// Factory — pabrik
function buatProduk(tipe){
  if(tipe==="beras") return { nama:"Beras", harga:62000 };
  if(tipe==="bayam") return { nama:"Bayam", harga:5000 };
}
console.log(buatProduk("beras"));

// Observer — langganan
class Toko {
  constructor(){ this.pelanggan=[]; }
  langganan(fn){ this.pelanggan.push(fn); }
  stokHabis(nama){ this.pelanggan.forEach(fn=>fn(nama)); }
}
const toko = new Toko();
toko.langganan(nama=>console.log(`Stok ${nama} habis, kapan restok?`));
toko.stokHabis("Beras");

// Strategy — colokan cara bayar (tambah cara tanpa ubah kasir)
class KasirBayar {
  constructor(cara){ this.cara = cara; } // colok Tunai/Transfer
  checkout(total){ return this.cara.bayar(total); }
}
const tunai = { bayar: t => `Tunai Rp${t}` };
const transfer = { bayar: t => `Transfer Rp${t}` };
console.log(new KasirBayar(tunai).checkout(62000));
console.log(new KasirBayar(transfer).checkout(62000));
```


---

## Penjelasan untuk Pemula

### Primer Class 2 Menit (wajib sebelum pola! ala freeCodeCamp Shopping Cart)
```javascript
class Produk {
  constructor(nama, harga){ this.nama = nama; this.harga = harga; } // isi awal
  info(){ return `${this.nama}: Rp${this.harga}`; } // this = kartu ini
}
class Member extends Produk { // warisi + tambah
  constructor(nama, harga, poin){ super(nama, harga); this.poin = poin; }
}
const b = new Member("Beras", 62000, 10);
console.log(b.info(), "| poin", b.poin);
```
- `class` = cetak biru, `new` = cetak kartu, `this` = kartu ini, `extends`/`super` = warisi/induk.

### Analogi: Colokan & Kasir Utama JS
- **Tanpa pola = 20 colokan beda untuk 20 lampu**: tambah 1 lampu → bobok 20 tembok.
- **Strategy = 1 colokan universal**: colok Tunai/Transfer/QRIS, kasir SAMA. **Singleton = 1 kasir utama** (tidak ada 2!). **Observer = grup WA**: stok habis → siar ke semua cabang!

### Langkah 0 — Siapkan Device
- Sama JS W1: `node -v` / browser + `npm test` untuk W12.

### Cara Komputer Membaca
- `new KasirBayar(tunai)` colok cara bayar; `getInstance()` 1 kasir saja; `langganan/stokHabis` siar.

### 3 Istilah Wajib
- 1. **Strategy/Singleton/Observer**: colokan/1/siar

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 11: **Cetak Biru** — Singleton, Factory, Observer. Minggu depan: **Testing JavaScript**.
