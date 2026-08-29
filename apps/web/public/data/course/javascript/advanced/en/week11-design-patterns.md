# Design Patterns — Cetak Biru Warung Rapi

> **Kategori:** JavaScript | **Level:** Lanjutan | **Minggu 11:** Design Patterns

## Tujuan Pembelajaran

- `Singleton` 1 kasir, `Factory` pabrik produk, `Observer` langganan stok habis

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

## Ringkasan

Minggu 11: **Cetak Biru** — Singleton, Factory, Observer.
