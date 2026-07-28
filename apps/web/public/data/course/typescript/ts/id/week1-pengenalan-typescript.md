# Pengenalan TypeScript

> TypeScript | Modul 1

## Tujuan Pembelajaran

- Memahami peran TypeScript sebagai superset JavaScript
- Menginstall TypeScript dan menjalankan tsc
- Mengenal type annotation dan type inference
- Mengkonfigurasi tsconfig.json dasar
- Mengompilasi .ts ke .js

---

## Program: Halo TypeScript

```typescript
interface Student {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

const student: Student = {
  name: 'Budi',
  level: 'beginner',
};

// Type inference — TypeScript guesses the type
const course = 'TypeScript';  // inferred as string
const duration = 16;          // inferred as number

// TypeScript catches type errors at compile time
function greet(s: Student): string {
  return `Halo ${s.name}! Selamat belajar ${course} selama ${duration} minggu.`;
}

console.log(greet(student));

// Try changing 'level' to an invalid value!

```

---

## Penjelasan

TypeScript adalah superset JavaScript yang menambahkan tipe statis. Kode TypeScript dikompilasi menjadi JavaScript biasa. Gunakan `tsc nama-file.ts` untuk kompilasi. File `tsconfig.json` mengatur opsi kompilasi seperti `strict`, `target`, dan `module`. Type inference memungkinkan TypeScript menebak tipe secara otomatis.

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

Modul 1 dari 16: **Pengenalan TypeScript**. TypeScript memberikan type safety tanpa mengorbankan fleksibilitas JavaScript. Minggu depan: **2. Tipe Dasar**.
