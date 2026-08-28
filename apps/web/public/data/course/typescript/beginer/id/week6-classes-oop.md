# Classes & OOP — Pabrik Kartu TypeScript

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 6:** Classes & OOP

## Tujuan Pembelajaran

- `class Produk { constructor(nama: string, harga: number){} }` pabrik kartu, `private`, `public`, `extends`

---

## Program

```typescript
class Produk {
  constructor(public nama: string, public harga: number, private stok: number = 0){}
  info(): string { return `${this.nama}: Rp${this.harga} (stok ${this.stok})`; }
  diskon(persen: number){ this.harga -= this.harga * persen/100; }
}

class Member extends Produk {
  constructor(nama: string, harga: number, public poin: number){
    super(nama, harga);
  }
}

const beras = new Produk("Beras", 62000, 10);
console.log(beras.info());
beras.diskon(10);
console.log(beras.info());
console.log(new Member("Gula", 15000, 120).info());
```

---

## Ringkasan

Minggu 6: **Pabrik Kartu** — `class` + `extends`.
