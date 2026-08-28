# Generics — Rak untuk Tipe Apa Saja

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 5:** Generics

## Tujuan Pembelajaran

- `function pertama<T>(arr: T[]): T` — rak yang muat `string` atau `number` tergantung pakai
- `Stack<T>` keranjang untuk apa saja, `constraint` `T extends { harga: number }`

---

## Kenapa Ini Penting Buat Kamu?

Tanpa generics, buat `pertamaString` dan `pertamaNumber` 2 fungsi sama — duplikat. Dengan `<T>` 1 rak untuk semua.

---

## Program: Rak Generik

```typescript
function pertama<T>(arr: T[]): T | undefined {
  return arr[0];
}
console.log(pertama([1,2,3])); // T = number → 1
console.log(pertama(["a","b"])); // T = string → "a"

class Keranjang<T> {
  private items: T[] = [];
  tambah(item: T){ this.items.push(item); }
  semua(): T[] { return this.items; }
}

const keranjangString = new Keranjang<string>();
keranjangString.tambah("Beras");
console.log(keranjangString.semua());

const keranjangAngka = new Keranjang<number>();
keranjangAngka.tambah(62000);
console.log(keranjangAngka.semua());

// Constraint — hanya yang punya harga
function total<T extends { harga: number }>(items: T[]): number {
  return items.reduce((s,i)=>s+i.harga,0);
}
console.log(total([{harga:62000},{harga:5000}]));
```

---

## Konsep Kunci

### `<T>` = Label Sementara
`function pertama<T>` → saat pakai `pertama([1,2])` T jadi `number`.

### `Keranjang<T>` = Rak Serbaguna
`Keranjang<string>` rak khusus string, `Keranjang<number>` rak khusus number.

---

## Ringkasan

Minggu 5: **Rak Generik** — 1 rak untuk semua tipe. Minggu depan: **Classes**.
