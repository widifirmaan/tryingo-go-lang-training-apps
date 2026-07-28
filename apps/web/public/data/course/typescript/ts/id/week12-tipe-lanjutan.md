# Tipe Lanjutan

> TypeScript | Modul 12

## Tujuan Pembelajaran

- Menggunakan satisfies operator
- Membuat branded types untuk ID
- Menerapkan assertion function
- Menggunakan never untuk exhaustive check
- Mengelola covariance dan contravariance

---

## Program: Validasi Canggih

```typescript
// satisfies operator — check type without widening
type Palette = { [key: string]: string | string[] };

const colors = {
  primary: '#3178C6',
  secondary: ['#fff', '#000'],
} satisfies Palette;

// colors.primary is still string (not string | string[])
console.log(colors.primary.toUpperCase());

// Branded types — nominal typing
type Brand<T, B extends string> = T & { __brand: B };
type UserId = Brand<number, 'UserId'>;
type OrderId = Brand<number, 'OrderId'>;

function getUser(id: UserId): string {
  return `User ${id}`;
}

const uid = 1 as UserId;
const oid = 1 as OrderId;
console.log(getUser(uid));
// getUser(oid); // Error: type mismatch

// Assertion functions
function assertIsString(val: unknown): asserts val is string {
  if (typeof val !== 'string') throw new Error('Not a string');
}

function process(input: unknown): void {
  assertIsString(input);
  console.log(input.toUpperCase()); // TS knows input is string
}

process('hello');
// process(42); // Would throw

// never for exhaustive checks
type Shape2 = 'circle' | 'square' | 'triangle';
function area2(s: Shape2): number {
  if (s === 'circle') return 1;
  if (s === 'square') return 2;
  // if (s === 'triangle') return 3;
  // const _exhaustive: never = s; // Error if unhandled
  return 0;
}

```

---

## Penjelasan

`satisfies` mengecek tipe tanpa mengubah inferred type. Branded types menambahkan nominal typing. Assertion functions: `asserts val is Type`. `never` untuk exhaustive checking di switch. Covariance/contravariance mengatur kompatibilitas tipe kompleks.

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

Modul 12 dari 16: **Tipe Lanjutan**. TypeScript memberikan type safety tanpa mengorbankan fleksibilitas JavaScript. Minggu depan: **13. Konfigurasi & Tools**.
