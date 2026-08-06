# Providers & Services

> **Kategori:** NestJS | **Level:** Pemula | **Minggu 2:** Providers & Services

## Tujuan Pembelajaran

- Memahami konsep Provider di NestJS
- @Injectable() decorator untuk DI
- Service layer: business logic terpisah dari controller
- CRUD operations di service
- Type-safe dengan TypeScript interfaces

---

## Program: Service Layer

```javascript
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, nama: 'Budi', email: 'budi@mail.com', role: 'admin' },
    { id: 2, nama: 'Siti', email: 'siti@mail.com', role: 'user' },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find(u => u.id === id);
  }

  create(userData: { nama: string; email: string }) {
    const newUser = { id: this.users.length + 1, role: 'user', ...userData };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, data: Partial<{ nama: string; email: string }>) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    this.users[index] = { ...this.users[index], ...data };
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
}

console.log('NestJS Service Simulation:');
const service = new UsersService();
console.log('All users:', service.findAll().length);
console.log('Find id=1:', service.findOne(1).nama);
console.log('Create:', service.create({ nama: 'Andi', email: 'andi@mail.com' }));
console.log('Update:', service.update(1, { nama: 'Budi Updated' }));
console.log('Remove:', service.remove(2));
console.log('Final count:', service.findAll().length);
```

---

## Konsep Kunci

### Provider
Class dengan @Injectable(). Bisa di-inject ke controller.

### Service Layer
Business logic di service, bukan di controller. Controller hanya handle HTTP.

### Dependency Injection
NestJS auto-instantiate dan inject service ke controller constructor.

### TypeScript
Interface untuk type safety: interface User { id: number; nama: string }.

---

## Eksperimen

- Buat ProductsService dengan method sendiri
- Tambah method search dengan filter
- Implementasikan soft delete
- Buat interface untuk type safety

---

## Tantangan

Buat BlogService: posts, comments, categories dengan full CRUD dan relationships.

---

## Ringkasan

Minggu 2 dari 12: **Providers & Services** (Level: Pemula). Minggu depan: **Modules & DI**.
