# Konfigurasi & Tools

> TypeScript | Modul 13

## Tujuan Pembelajaran

- Menguasai konfigurasi tsconfig strict flags
- Mengintegrasikan ESLint typescript-eslint
- Menulis unit test dengan Vitest + TypeScript
- Menggunakan project references
- Mengoptimalkan kompilasi dengan isolatedModules

---

## Program: Setup Proyek

```typescript
// tsconfig strict mode demo
// strict: true enables: noImplicitAny, strictNullChecks, etc.

// With strictNullChecks:
function greetName(name: string | null): string {
  if (name === null) return 'No name';
  return name.toUpperCase(); // TS knows name is string here
}
console.log(greetName('Budi'));
console.log(greetName(null));

// noImplicitAny — every parameter must be typed
function multiply(a: number, b: number): number {
  return a * b;
}
console.log(multiply(3, 4));

// noUnusedLocals — catches unused variables
function calculate(): number {
  const result = 42;
  // const unused = 'will warn'; // Would cause error with the flag
  return result;
}
console.log(calculate());

// Unit test example (Vitest style)
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

const calc: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
};

// In a real test file:
// import { describe, it, expect } from 'vitest';
// describe('Calculator', () => {
//   it('should add correctly', () => {
//     expect(calc.add(2, 3)).toBe(5);
//   });
// });

console.log('Calc add:', calc.add(5, 3));
console.log('Calc subtract:', calc.subtract(10, 4));

```

---

## Penjelasan

`strict: true` mengaktifkan semua strict flag. `noImplicitAny` mewajibkan tipe eksplisit. `strictNullChecks` membedakan `T | null`. `noUnusedLocals` membersihkan kode. `typescript-eslint` menegakkan aturan TypeScript. Vitest mendukung TypeScript natively.

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

Modul 13 dari 16: **Konfigurasi & Tools**. TypeScript memberikan type safety tanpa mengorbankan fleksibilitas JavaScript. Minggu depan: **14. TypeScript di Frontend**.
