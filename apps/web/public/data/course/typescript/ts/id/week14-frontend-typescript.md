# TypeScript di Frontend

> TypeScript | Modul 14

## Tujuan Pembelajaran

- Mengetik props dan state React
- Menggunakan generic components
- Mengetik event handlers
- Membuat custom hooks dengan tipe
- Menggunakan Context dengan TypeScript

---

## Program: Komponen Ter-tipe

```typescript
// React component types (conceptual — for learning)
// This demonstrates TS patterns used in React

// Props type
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick: () => void;
}

function Button(props: ButtonProps): string {
  const { label, variant = 'primary', disabled, onClick } = props;
  return `<button class="${variant}" ${disabled ? 'disabled' : ''}>${label}</button>`;
}

console.log(Button({ label: 'Submit', onClick: () => {} }));

// Generic component pattern
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => string;
}

function List<T>(props: ListProps<T>): string {
  return props.items.map(props.renderItem).join('\n');
}

const numbers = [1, 2, 3];
const rendered = List<number>({
  items: numbers,
  renderItem: (n) => `Item: ${n}`,
});
console.log(rendered);

// Custom hook type pattern
function useCounter(initial: number = 0) {
  let count = initial;
  return {
    get count(): number { return count; },
    increment: () => { count++; },
    decrement: () => { count--; },
    reset: () => { count = initial; },
  };
}

const counter = useCounter(10);
counter.increment();
counter.increment();
console.log('Counter:', counter.count);
counter.decrement();
console.log('Counter after dec:', counter.count);
counter.reset();
console.log('Counter after reset:', counter.count);

```

---

## Penjelasan

TypeScript di React: tipe props dengan interface. Generic components untuk reusable UI. Event types: `React.ChangeEvent`, `React.MouseEvent`. Custom hooks bisa memiliki tipe parameter dan return yang ketat. Context dengan tipe mengurangi runtime error.

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

Modul 14 dari 16: **TypeScript di Frontend**. TypeScript memberikan type safety tanpa mengorbankan fleksibilitas JavaScript. Minggu depan: **15. TypeScript di Backend**.
