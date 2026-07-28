# Generik Dasar

> TypeScript | Modul 7

## Tujuan Pembelajaran

- Membuat generic function
- Menggunakan generic constraint dengan extends
- Membuat generic interface dan type
- Menerapkan generic default type
- Menggunakan multiple type parameters

---

## Program: Koleksi Aman Tipe

```typescript
// Generic function — reusable type-safe code
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log(first([1, 2, 3]));           // number
console.log(first(['a', 'b']));           // string
console.log(first<number>([10, 20]));     // explicit

// Generic with constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: 'Budi', age: 20, city: 'Jakarta' };
console.log(getProperty(user, 'name'));   // Budi
// getProperty(user, 'email'); // Error

// Generic interface
interface Repository<T> {
  getAll(): T[];
  getById(id: number): T | undefined;
  add(item: T): void;
}

class InMemoryRepo<T> implements Repository<T> {
  private items: T[] = [];
  getAll(): T[] { return this.items; }
  getById(id: number): T | undefined { return this.items[id]; }
  add(item: T): void { this.items.push(item); }
}

const repo = new InMemoryRepo<string>();
repo.add('TypeScript');
repo.add('React');
console.log('All items:', repo.getAll());

// Generic default type
function createArray<T = string>(length: number, value: T): T[] {
  return Array(length).fill(value);
}
console.log(createArray(3, 'a'));  // string[]

```

---

## Penjelasan

Generik membuat kode reusable tanpa kehilangan type safety. `<T>` menangkap tipe yang digunakan. Constraint `extends` membatasi tipe yang bisa digunakan. Generic interface membuat struktur data type-safe. Default type menyediakan tipe fallback.

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

Modul 7 dari 16: **Generik Dasar**. TypeScript memberikan type safety tanpa mengorbankan fleksibilitas JavaScript. Minggu depan: **8. Generik Lanjutan**.
