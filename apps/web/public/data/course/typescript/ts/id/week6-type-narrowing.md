# Type Narrowing & Guard

> TypeScript | Modul 6

## Tujuan Pembelajaran

- Mempersempit tipe dengan typeof guard
- Menggunakan instanceof untuk class
- Menerapkan discriminated union pattern
- Membuat custom type predicate
- Menggunakan in operator narrowing

---

## Program: Validasi Input

```typescript
// typeof narrowing
function processValue(val: string | number): string {
  if (typeof val === 'string') {
    return val.toUpperCase();  // TS knows val is string
  }
  return val.toFixed(2);       // TS knows val is number
}
console.log(processValue('hello'));
console.log(processValue(3.14159));

// instanceof narrowing
class Dog { bark() { return 'Woof!'; } }
class Cat { meow() { return 'Meow!'; } }

function makeSound(animal: Dog | Cat): string {
  if (animal instanceof Dog) return animal.bark();
  return animal.meow();
}
console.log(makeSound(new Dog()));

// Discriminated union
type ApiState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: string }
  | { status: 'error'; error: string };

function handleState(state: ApiState): string {
  switch (state.status) {
    case 'idle': return 'Menunggu...';
    case 'loading': return 'Memuat...';
    case 'success': return `Data: ${state.data}`;
    case 'error': return `Error: ${state.error}`;
  }
}
console.log(handleState({ status: 'idle' }));
console.log(handleState({ status: 'success', data: 'Halo' }));

// Custom type predicate
interface Fish { swim(): string; }
interface Bird { fly(): string; }
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

```

---

## Penjelasan

Type narrowing mempersempit tipe union berdasarkan kondisi. `typeof` guard untuk primitif. `instanceof` untuk class. Discriminated union dengan switch sangat ampuh. Type predicate (`pet is Fish`) memberi tahu TypeScript tentang tipe hasil fungsi.

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

Modul 6 dari 16: **Type Narrowing & Guard**. TypeScript memberikan type safety tanpa mengorbankan fleksibilitas JavaScript. Minggu depan: **7. Generik Dasar**.
