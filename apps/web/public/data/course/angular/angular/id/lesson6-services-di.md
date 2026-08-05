# Services & Dependency Injection

> Angular | Pelajaran 6

## Tujuan Pembelajaran

- Membuat service dengan @Injectable decorator\n- Menggunakan providedIn: root untuk root-level provider\n- Menginjeksi service via constructor\n- Memahami singleton service di Angular

---

## Program: Angular

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data: string[] = ['Item 1', 'Item 2', 'Item 3'];

  getData(): string[] {
    return this.data;
  }

  addItem(item: string): void {
    this.data.push(item);
  }

  removeItem(index: number): void {
    this.data.splice(index, 1);
  }
}

```

---

## Penjelasan

## @Injectable
@Injectable({ providedIn: 'root' }) — mendefinisikan service yang tersedia di seluruh aplikasi. providedIn: 'root' membuat service sebagai singleton.
## Dependency Injection
constructor(private dataService: DataService) — Angular otomatis menginjeksi DataService. Tidak perlu manual registration di providers array.
## Service Pattern
Service menyimpan data dan logika bisnis. Komponen hanya bertanggung jawab untuk menampilkan data dan menangani interaksi user. Pemisahan ini memudahkan testing dan reuse.
## providedIn Options
'root' — singleton untuk seluruh aplikasi. 'any' — new instance per lazy-loaded module. Component-level — instance per component.

---

## Eksperimen

1. **## @Injectable
@Injectable({ providedIn: 'root' }) — mendefinisikan service yang tersedia di seluruh aplikasi. providedIn: 'root' membuat service sebagai singleton.
## Dependency Injection
constructor(private dataService: DataService) — Angular otomatis menginjeksi DataService. Tidak perlu manual registration di providers array.
## Service Pattern
Service menyimpan data dan logika bisnis. Komponen hanya bertanggung jawab untuk menampilkan data dan menangani interaksi user. Pemisahan ini memudahkan testing dan reuse.
## providedIn Options
'root' — singleton untuk seluruh aplikasi. 'any' — new instance per lazy-loaded module. Component-level — instance per component.**

---

## Tantangan

Kembangkan service: (1) tambah method updateItem() di DataService, (2) buat service kedua (AuthService) dengan method login/logout, (3) buat service dengan HttpClient untuk fetch data dari API, (4) implementasi service caching yang menyimpan data di memory dan mengembalikan cached data jika tersedia.

---

## Ringkasan

@Injectable = service. providedIn: root = singleton. constructor = DI. Service = data + logic. Lanjut: routing.
