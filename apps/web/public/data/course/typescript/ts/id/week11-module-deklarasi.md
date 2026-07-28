# Module & Deklarasi

> TypeScript | Modul 11

## Tujuan Pembelajaran

- Mengimpor dan mengekspor tipe
- Membuat declaration file (.d.ts)
- Menggunakan @types packages
- Memahami ambient module declarations
- Mengatur module resolution

---

## Program: Struktur Proyek

```typescript
// ES Module syntax with types
// File: types.ts
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type TodoStatus = 'active' | 'completed';

export function createTodo(title: string): Todo {
  return { id: Date.now(), title, completed: false };
}

// File: store.ts
export class TodoStore {
  private todos: Todo[] = [];

  add(title: string): void {
    this.todos.push(createTodo(title));
  }

  getAll(): Todo[] {
    return [...this.todos];
  }

  toggle(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) todo.completed = !todo.completed;
  }
}

// Re-export
export type { Todo as TodoItem } from './types';

// Declaration merging (ambient)
// Normally in a .d.ts file:
declare module 'my-library' {
  export function doSomething(): void;
  export const VERSION: string;
}

```

---

## Penjelasan

Module ES6: `export` dan `import` untuk berbagi kode dan tipe. Declaration file `.d.ts` untuk library JavaScript tanpa tipe. `@types` packages menyediakan tipe untuk library populer. Ambient declarations dengan `declare module` untuk kode global.

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

Modul 11 dari 16: **Module & Deklarasi**. TypeScript memberikan type safety tanpa mengorbankan fleksibilitas JavaScript. Minggu depan: **12. Tipe Lanjutan**.
