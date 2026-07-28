# Utility Types

> TypeScript | Modul 9

## Tujuan Pembelajaran

- Menguasai Partial, Required, Readonly
- Menggunakan Pick dan Omit
- Menerapkan Record untuk dictionary
- Menggunakan Exclude, Extract, NonNullable
- Menggunakan ReturnType dan Parameters

---

## Program: Manipulasi Data

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Partial — semua properti opsional
function updateUser(id: number, updates: Partial<User>): void {
  console.log(`Mengupdate user ${id}:`, updates);
}
updateUser(1, { name: 'Budi Updated' });

// Required — semua properti wajib
type CompleteUser = Required<Partial<User>>;

// Readonly — tidak bisa diubah
const frozen: Readonly<User> = {
  id: 1, name: 'Budi', email: 'budi@mail.com',
  password: 'secret', createdAt: new Date(),
};
// frozen.name = 'Baru'; // Error

// Pick & Omit
type PublicUser = Omit<User, 'password'>;
type UserCredentials = Pick<User, 'email' | 'password'>;

function getProfile(): PublicUser {
  return { id: 1, name: 'Budi', email: 'b@m.com', createdAt: new Date() };
}
console.log('Profile:', getProfile());

// Record — dictionary type
const scores: Record<string, number> = {
  Budi: 85, Siti: 92, Alex: 78,
};
console.log('Scores:', scores);

// Exclude, Extract, NonNullable
type T1 = Exclude<'a' | 'b' | 'c', 'a'>;   // 'b' | 'c'
type T2 = Extract<'a' | 'b' | 'c', 'a' | 'b'>; // 'a' | 'b'
type T3 = NonNullable<string | null | undefined>; // string

// ReturnType & Parameters
function calc(a: number, b: number): number { return a + b; }
type CalcReturn = ReturnType<typeof calc>;     // number
type CalcParams = Parameters<typeof calc>;      // [number, number]

console.log('Utility types demo completed');

```

---

## Penjelasan

Utility types bawaan TypeScript: `Partial<T>` — semua opsional, `Required<T>` — semua wajib, `Readonly<T>` — semua tidak bisa diubah, `Pick<T,K>` — pilih properti, `Omit<T,K>` — kecualikan properti, `Record<K,T>` — dictionary, `Exclude/Extract` — manipulasi union.

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

Modul 9 dari 16: **Utility Types**. TypeScript memberikan type safety tanpa mengorbankan fleksibilitas JavaScript. Minggu depan: **10. Class di TypeScript**.
