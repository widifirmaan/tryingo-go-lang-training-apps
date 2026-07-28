# Generik Lanjutan

> TypeScript | Modul 8

## Tujuan Pembelajaran

- Menggunakan conditional types
- Membuat mapped types
- Menggunakan keyof dan typeof operator
- Menerapkan indexed access types
- Menggunakan infer dalam conditional types

---

## Program: Transformasi Tipe

```typescript
// Conditional types
type IsString<T> = T extends string ? 'yes' : 'no';
type A = IsString<string>;   // 'yes'
type B = IsString<number>;   // 'no'

// Conditional with infer
type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;
function example(): boolean { return true; }
type ExampleReturn = ReturnTypeOf<typeof example>;  // boolean

// Mapped types
type Readonly<T> = { readonly [K in keyof T]: T[K] };
type Optional<T> = { [K in keyof T]?: T[K] };

interface Person { name: string; age: number; }
type ReadonlyPerson = Readonly<Person>;
type OptionalPerson = Optional<Person>;

// keyof & typeof
type PersonKeys = keyof Person;  // 'name' | 'age'
const personObj = { name: 'Budi', age: 20 };
type PersonType = typeof personObj;

// Indexed access types
type PersonName = Person['name'];  // string

// Practical: pick specific keys
function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => result[key] = obj[key]);
  return result;
}

const picked = pick({ name: 'Budi', age: 20, city: 'JKT' }, 'name', 'city');
console.log('Picked:', picked);

```

---

## Penjelasan

Conditional types: `T extends U ? X : Y`. Mapped types: `{ [K in keyof T]: NewType }`. `keyof` mengambil key union. `typeof` mengambil tipe runtime. Indexed access: `T["key"]`. `infer` menangkap tipe dalam conditional untuk ekstraksi.

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

Modul 8 dari 16: **Generik Lanjutan**. TypeScript memberikan type safety tanpa mengorbankan fleksibilitas JavaScript. Minggu depan: **9. Utility Types**.
