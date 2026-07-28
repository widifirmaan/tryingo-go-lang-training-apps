# Tipe Dasar

> TypeScript | Modul 2

## Tujuan Pembelajaran

- Menguasai tipe primitif: string, number, boolean
- Menggunakan array dan tuple
- Membedakan any vs unknown vs never
- Memahami null, undefined, dan void
- Menerapkan enum untuk konstanta bernama

---

## Program: Demo Tipe Dasar

```typescript
// Primitive types
let name: string = 'Budi';
let age: number = 20;
let isActive: boolean = true;

// Arrays & Tuples
let scores: number[] = [85, 90, 78];
let pair: [string, number] = ['Budi', 20]; // tuple

// any — avoid when possible
let flexible: any = 'bisa apa saja';
flexible = 42;

// unknown — safer than any, must narrow
let input: unknown = 'some data';
if (typeof input === 'string') {
  console.log(input.toUpperCase());
}

// never — function that never returns
function fail(msg: string): never {
  throw new Error(msg);
}

// void — function returns nothing
function log(msg: string): void {
  console.log(msg);
}

// null & undefined
let nullable: string | null = null;
let undef: string | undefined = undefined;

// Enum
enum Color { Red, Green, Blue }
let c: Color = Color.Green;

console.log('Scores:', scores);
console.log('Pair:', pair);
console.log('Color:', c);  // 1

```

---

## Penjelasan

Tipe primitif: `string`, `number`, `boolean`. Array: `number[]` atau `Array<number>`. Tuple: `[string, number]` untuk array dengan panjang tetap. `any` mematikan type checking — hindari. `unknown` aman karena harus dipersempit dulu. `never` untuk fungsi yang tidak pernah selesai. `void` untuk fungsi tanpa return.

---

## Eksperimen

- Ubah tipe data di setiap fungsi dan lihat error kompilasi
- Tambah properti baru ke interface dan update implementasinya
- Ganti `any` dengan `unknown` dan tambahkan type guard
- Coba kombinasi union dan intersection type yang berbeda

---

## Tantangan

Buat program yang menerapkan konsep minggu ini dalam studi kasus nyata. Gunakan type annotation eksplisit di setiap variable dan function. Pastikan tidak ada `any`. Tambahkan komentar yang menjelaskan tipe yang digunakan.

---

## Ringkasan

Modul 2 dari 16: **Tipe Dasar**. TypeScript memberikan type safety tanpa mengorbankan fleksibilitas JavaScript. Minggu depan: **3. Fungsi di TypeScript**.
