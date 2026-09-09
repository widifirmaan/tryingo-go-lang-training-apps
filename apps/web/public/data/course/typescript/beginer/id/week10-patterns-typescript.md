# Design Patterns TS — Pola Warung Rapi (TechPulse 2026)

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 10:** Design Patterns TS

## Tujuan Pembelajaran

- `Singleton` 1 kasir, `Factory` pabrik `buatProduk("beras")`, `Observer` langganan `stokHabis` (sumber: TechPulse 2026 + refactoring.guru)

---

## Kenapa Ini Penting Buat Kamu?

Tanpa pola, `if (tipe==="beras")` 20x duplikat. Dengan `Factory`, 1 pabrik untuk semua. `Observer` untuk "jika stok habis, beri tahu 3 cabang" tanpa `if` manual.

---

## Program: Pola Warung TS (TechPulse)

```typescript
// Singleton — 1 kasir (TechPulse)
class Kasir {
  private static instance: Kasir;
  private constructor(){}
  static getInstance(): Kasir {
    if(!Kasir.instance) Kasir.instance = new Kasir();
    return Kasir.instance;
  }
}
const a = Kasir.getInstance();
const b = Kasir.getInstance();
console.log(a === b); // true, sama

// Factory — pabrik (refactoring.guru)
function buatProduk(tipe: "beras" | "bayam"){
  if(tipe === "beras") return { nama: "Beras", harga: 62000 };
  return { nama: "Bayam", harga: 5000 };
}
console.log(buatProduk("beras"));

// Observer — langganan (TechPulse)
class Toko {
  private pelanggan: ((nama:string)=>void)[] = [];
  langganan(fn: (nama:string)=>void){ this.pelanggan.push(fn); }
  stokHabis(nama: string){ this.pelanggan.forEach(fn=>fn(nama)); }
}
const toko = new Toko();
toko.langganan(nama=>console.log(`Stok ${nama} habis, restok?`));
toko.stokHabis("Beras");
```

**Sumber:** `techpulsesite.com/typescript-design-patterns-2026` — Singleton/Factory/Observer + `refactoring.guru`.

---

## Konsep Kunci

### `Singleton` = 1 Kasir
`private constructor` + `static getInstance` — 1 instance.

### `Factory` = Pabrik
`buatProduk(tipe)` → objek, tanpa `new` manual 20x.

### `Observer` = Langganan
`langganan(fn)` + `stokHabis` → panggil semua.

---

## Penjelasan untuk Pemula

### Analogi: Warung Rapi

- **Singleton = 1 kasir utama**: tidak ada 2 kasir utama.
- **Factory = pabrik kardus**: minta "beras" → pabrik buat kardus beras.
- **Observer = grup WA**: stok habis → broadcast ke 3 cabang.

### Langkah 0 — Device

`npx tsc` cek, `tsc --version` 5.x (sudah W1).

### 3 Istilah Wajib

1. **Singleton/Factory/Observer**: 1/pabrik/langganan

---

## Tantangan

**Warung Pola Lengkap:** `Kasir` Singleton + `buatProduk` Factory 3 tipe + `Toko` Observer 2 pelanggan langganan `stokHabis`.

---

## Glosarium Mini

- **Singleton/Factory/Observer**: pola

---

## Ringkasan

Minggu 10 dari 12: **Pola Rapi** — Singleton, Factory, Observer. Minggu depan: **Advanced Types**.
