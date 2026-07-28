# Fungsi di TypeScript

> TypeScript | Modul 3

## Tujuan Pembelajaran

- Menentukan tipe parameter dan return function
- Menggunakan optional dan default parameter
- Membuat function overloads
- Memahami this type pada method
- Menerapkan rest parameter dan spread

---

## Program: Koleksi Fungsi

```typescript
// Parameter & return types
function add(a: number, b: number): number {
  return a + b;
}

// Optional & default parameters
function greet(name: string, title?: string, prefix: string = 'Halo'): string {
  return `${prefix} ${title ? title + ' ' : ''}${name}!`;
}

console.log(greet('Budi'));           // Halo Budi!
console.log(greet('Siti', 'Dr.'));    // Halo Dr. Siti!

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

console.log('Sum:', sum(1, 2, 3, 4, 5));

// Function overloads
function process(x: string): string;
function process(x: number): number;
function process(x: string | number): string | number {
  if (typeof x === 'string') return x.toUpperCase();
  return x * 10;
}

console.log(process('hello'));  // HELLO
console.log(process(5));        // 50

// Arrow function type
const multiply: (a: number, b: number) => number = (x, y) => x * y;
console.log('Multiply:', multiply(4, 3));

```

---

## Penjelasan

Tipe fungsi: `(param: Tipe) => ReturnType`. Parameter opsional dengan `?`. Default parameter: `nama = "default"`. Rest parameter: `...args: number[]`. Function overloads memungkinkan beberapa signature untuk satu fungsi. Arrow function bisa diberi tipe eksplisit.

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

Modul 3 dari 16: **Fungsi di TypeScript**. TypeScript memberikan type safety tanpa mengorbankan fleksibilitas JavaScript. Minggu depan: **4. Object & Interface**.
