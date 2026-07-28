# Union, Intersection & Literal

> TypeScript | Modul 5

## Tujuan Pembelajaran

- Membuat union type dari beberapa tipe
- Menggunakan intersection type
- Menerapkan literal type untuk nilai spesifik
- Menggunakan template literal types
- Menggabungkan union dan intersection

---

## Program: Sistem Status

```typescript
// Union type
type Status = 'idle' | 'loading' | 'success' | 'error';
let currentStatus: Status = 'idle';
currentStatus = 'loading';
// currentStatus = 'unknown'; // Error

// Union with different types
type Result = number | string;
const parseInput = (val: string): Result => {
  const n = Number(val);
  return isNaN(n) ? val : n;
};
console.log('Parsed:', parseInput('42'), parseInput('abc'));

// Intersection type
type HasName = { name: string };
type HasAge = { age: number };
type Person = HasName & HasAge;

const person: Person = { name: 'Budi', age: 20 };

// Literal types
type Direction = 'up' | 'down' | 'left' | 'right';
function move(d: Direction): string {
  return `Moving ${d}`;
}
console.log(move('up'));

// Template literal types
type EventName = `on${Capitalize<string>}`;
type ClickEvent = `onClick`;  // type is "onClick"

// Type alias with union
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number }
  | { kind: 'rectangle'; width: number; height: number };

function area(s: Shape): number {
  if (s.kind === 'circle') return Math.PI * s.radius ** 2;
  if (s.kind === 'square') return s.side ** 2;
  return s.width * s.height;
}

console.log('Circle area:', area({ kind: 'circle', radius: 5 }));
console.log('Square area:', area({ kind: 'square', side: 4 }));

```

---

## Penjelasan

Union `A | B` berarti bisa A atau B. Intersection `A & B` menggabungkan kedua tipe. Literal type membatasi nilai spesifik seperti `"active" | "inactive"`. Template literal types membuat string pattern. Discriminated union menggunakan field `kind` untuk membedakan varian.

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

Modul 5 dari 16: **Union, Intersection & Literal**. TypeScript memberikan type safety tanpa mengorbankan fleksibilitas JavaScript. Minggu depan: **6. Type Narrowing & Guard**.
