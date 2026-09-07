# Design Patterns — Cetak Biru Warung Rapi

> **Kategori:** JavaScript | **Level:** Lanjutan | **Minggu 11:** Design Patterns

## Tujuan Pembelajaran

- `Singleton` 1 kasir, `Factory` pabrik produk, `Observer` langganan stok habis

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
```


---

## Penjelasan untuk Pemula

### Analogi: Colokan & Kasir Utama JS
- Lihat Program: jalankan (`node`/browser), ubah 1 hal, lihat bedanya.

### Langkah 0 — Siapkan Device
- Sama JS W1: `node -v` / browser + `npm test` untuk W12.

### Cara Komputer Membaca
- `new Kasir(new Tunai())` suntik cara; `getInstance()` 1 saja; `on/emit` siar.

### 3 Istilah Wajib
- 1. **Strategy/Singleton/Observer**: colokan/1/siar

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 11: **Cetak Biru** — Singleton, Factory, Observer.
