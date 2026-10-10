# Providers & Services

> **Kategori:** NestJS | **Level:** Beginner | **Minggu 2:** Providers & Services

## Learning Objectives

- Understand NestJS Provider concept
- @Injectable() decorator for DI
- Service layer: business logic separated from controller
- CRUD operations in service
- Type-safe with TypeScript interfaces

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

## Key Concepts

### Provider
@Injectable() classes.

### Service Layer
Separate business logic from controllers.

### Dependency Injection
Auto-instantiation and injection.

### TypeScript
Type-safe with interfaces.

---

## Experiments

- Create ProductsService with own methods
- Add search method with filter
- Implement soft delete
- Create interface for type safety

---

## Challenge

Build BlogService: posts, comments, categories with full CRUD and relationships.

---

## Summary

Week 2 of 12: **Providers & Services** (Level: Beginner). Next week: **Modules & DI**.
