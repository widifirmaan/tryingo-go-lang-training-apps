# Modules & Dependency Injection

> **Kategori:** NestJS | **Level:** Beginner | **Minggu 3:** Modules & Dependency Injection

## Learning Objectives

- @Module decorator: controllers, providers, exports, imports
- Dependency Injection: constructor injection
- Module organization: feature modules, shared modules
- Provider scopes: singleton, request, transient
- Custom providers: useValue, useFactory, useClass

---

## Program: Module Structure

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

## Key Concepts

### @Module
Organize application structure.

### DI
Constructor injection.

### Scopes
Singleton, Request, Transient.

### Custom Providers
useValue, useFactory, useClass.

---

## Experiments

- Create feature module for products
- Implement custom provider with useFactory
- Add global module with @Global()
- Try request-scoped provider

---

## Challenge

Build modular app: UsersModule, ProductsModule, DatabaseModule with proper DI.

---

## Summary

Week 3 of 12: **Modules & DI** (Level: Beginner). Next week: **Database & TypeORM**.
