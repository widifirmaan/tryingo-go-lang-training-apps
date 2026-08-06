# Pengantar TypeScript

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 1:** Pengantar TypeScript

## Tujuan Pembelajaran

- Perbedaan TypeScript vs JavaScript: static typing
- Tipe dasar: string, number, boolean, array, tuple
- Type inference: TypeScript otomatis deteksi tipe
- Enum untuk set nilai tetap
- Any, unknown, void, never types

---

## Program: Halo TypeScript

```typescript
// Dasar Tipe Data
const nama: string = "Budi";
const umur: number = 25;
const aktif: boolean = true;

console.log("Nama:", nama);
console.log("Umur:", umur);
console.log("Aktif:", aktif);

// Type Inference (TypeScript otomatis deteksi tipe)
const kota = "Jakarta"; // string
const tinggi = 175.5;  // number
const setuju = true;   // boolean

// Array
const angka: number[] = [1, 2, 3, 4, 5];
const buah: Array<string> = ["apel", "mangga"];

// Tuple
const koordinat: [number, number] = [106.8, -6.2];
const userTuple: [string, number, boolean] = ["Budi", 25, true];

// Enum
enum Warna {
    Merah = "red",
    Hijau = "green",
    Biru = "blue"
}
const favColor: Warna = Warna.Hijau;

// Any & Unknown
let flexible: any = "bisa apa saja";
flexible = 42;
flexible = true;

let safeUnknown: unknown = "type-safe any";
if (typeof safeUnknown === "string") {
    console.log("String length:", safeUnknown.length);
}

// Void & Never
function logMessage(msg: string): void {
    console.log(msg);
}

function throwError(msg: string): never {
    throw new Error(msg);
}

console.log("\n=== Enum ===");
console.log("Warna favorit:", favColor);
console.log("Koordinat:", koordinat);
```

---

## Konsep Kunci

### TypeScript vs JavaScript
TypeScript = JavaScript + Static Types. Dikompilasi ke JS. Catch errors di compile-time.

### Tipe Dasar
`string`, `number`, `boolean`, `null`, `undefined`, `symbol`.

### Type Inference
`const x = 10` otomatis `number`. Tidak perlu selalu explicitly type.

### Array & Tuple
`number[]` atau `Array<number>`. Tuple `[string, number]` fixed-length.

### Enum
Set nilai named: `enum Warna { Merah = "red" }`.

### Any vs Unknown
`any` bypass type checking. `unknown` type-safe — harus cek dulu sebelum pakai.

---

## Eksperimen

- Coba assign string ke variabel number — lihat error
- Buat enum untuk hari dalam seminggu
- Eksperimen unknown dengan type guard
- Buat tuple dengan 4 elemen berbeda
- Coba union type: string | number

---

## Tantangan

Buat program konversi suhu: function dengan typed parameters, enum untuk unit, dan type-safe output.

---

## Ringkasan

Minggu 1 dari 12: **Pengantar TypeScript** (Level: TypeScript Lengkap). Fondasi tipe data. Minggu depan: **Advanced Types**.
