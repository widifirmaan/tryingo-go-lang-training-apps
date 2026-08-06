# Modules & Dependency Injection

> **Kategori:** NestJS | **Level:** Pemula | **Minggu 3:** Modules & Dependency Injection

## Tujuan Pembelajaran

- @Module decorator: controllers, providers, exports, imports
- Dependency Injection: constructor injection
- Module organization: feature modules, shared modules
- Provider scopes: singleton, request, transient
- Custom providers: useValue, useFactory, useClass

---

## Program: Struktur Modul

```javascript
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [],
})
export class AppModule {}

console.log('NestJS Module Structure:');
console.log('');
console.log('=== Module Decorator ===');
console.log('@Module({');
console.log('  controllers: [UsersController],');
console.log('  providers: [UsersService],');
console.log('  exports: [UsersService],');
console.log('  imports: [DatabaseModule],');
console.log('})');
console.log('');
console.log('=== DI Pattern ===');
console.log('constructor(private usersService: UsersService) {}');
console.log('');
console.log('=== Module Hierarchy ===');
console.log('AppModule');
console.log('  |-- UsersModule');
console.log('  |     |-- UsersController');
console.log('  |     |-- UsersService');
console.log('  |-- ProductsModule');
console.log('  |     |-- ProductsController');
console.log('  |     |-- ProductsService');
console.log('  |-- DatabaseModule');
console.log('  |     |-- DatabaseService');
console.log('');
console.log('=== DI Container ===');
console.log('1. NestJS scan semua @Module');
console.log('2. Instantiate providers');
console.log('3. Inject ke constructor');
console.log('4. Singleton scope (default)');
```

---

## Konsep Kunci

### @Module
Decorator untuk organize application. controllers, providers, exports, imports.

### DI
constructor(private service: Service) — NestJS auto-instantiate.

### Scopes
Singleton (default), Request (per-request), Transient (new each inject).

### Custom Providers
useValue, useFactory, useClass untuk advanced DI.

---

## Eksperimen

- Buat feature module untuk products
- Implementasikan custom provider dengan useFactory
- Tambah global module dengan @Global()
- Coba request-scoped provider

---

## Tantangan

Buat modular app: UsersModule, ProductsModule, DatabaseModule dengan proper DI.

---

## Ringkasan

Minggu 3 dari 12: **Modules & DI** (Level: Pemula). Minggu depan: **Database & TypeORM**.
