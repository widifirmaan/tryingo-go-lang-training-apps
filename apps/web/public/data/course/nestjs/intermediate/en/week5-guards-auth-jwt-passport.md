# Enterprise Security: Passport JWT, Auth Guards & Role-Based Access Control

> **Kategori:** NestJS Enterprise Architecture | **Level:** Intermediate | **Minggu 5:** Enterprise Security: Passport JWT, Auth Guards & Role-Based Access Control
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand NestJS authentication lifecycle using `@nestjs/passport` and `@nestjs/jwt`.
- Deploy `AuthGuard("jwt")` to shield endpoints against unauthenticated requests.
- Build a Role-Based Access Control (RBAC) system via `Reflector` and the `@Roles` decorator.
- Author a custom `@CurrentUser()` parameter decorator to extract verified user claims.

---

## Program: E-Commerce Multi-Role Authorization with Guards & Custom Decorators

```typescript
// Menggunakan @nestjs/passport, @nestjs/jwt, dan passport-jwt
import {
  Injectable, CanActivate, ExecutionContext, SetMetadata,
  createParamDecorator, UnauthorizedException, ForbiddenException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export enum Role {
  CUSTOMER = 'CUSTOMER',
  MERCHANT = 'MERCHANT',
  ADMIN = 'ADMIN',
}

// 1. Custom Metadata Decorator untuk Menentukan Peran yang Diizinkan
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

// 2. Custom User Parameter Decorator (Mengekstrak User dari Request)
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// 3. Roles Guard: Memvalidasi Apakah User Memiliki Peran yang Dibutuhkan
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Jika endpoint tidak memiliki batasan peran (@Roles), izinkan akses
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      throw new UnauthorizedException('Pengguna belum terautentikasi.');
    }

    const hasRole = requiredRoles.some(role => user.roles?.includes(role));
    if (!hasRole) {
      throw new ForbiddenException(`Akses ditolak! Endpoint ini membutuhkan peran: ${requiredRoles.join(', ')}`);
    }

    return true;
  }
}

console.log('=== ROLES GUARD & CURRENT USER DECORATOR TERDEFINISI ===');
```

---

## Key Concepts

Authentication and authorization in enterprise e-commerce systems must remain decoupled, declaratively guarding route handlers without cluttering service business logic.

### The Role of NestJS Guards
**Guards** implement the `CanActivate` interface. Executed after middleware but **prior** to interceptors, pipes, or route handlers, returning `false` or throwing exceptions immediately halts execution.

### Metadata Reflection via @Roles
Rather than scattering role checks across controllers, we declare custom `@Roles(Role.ADMIN, Role.MERCHANT)` decorators. Values are stored as route metadata via `SetMetadata`. Within `RolesGuard`, the **Reflector** service reads this metadata, evaluating it against the user's validated JWT claims array.

### Custom Parameter Decorator: @CurrentUser
Authoring `createParamDecorator` allows controllers to extract validated users directly: `@CurrentUser() user: UserEntity`. This keeps controller signatures declarative and simplifies unit testing.


---

---

## Beginner Friendly Explanation

Imagine an exclusive corporate gala. At the outer foyer, security officers verify admissions tickets (AuthGuard), validating passes. However, entering the private VIP executive suite (RolesGuard) requires an inner guard verifying whether your wristband is gold-stamped (Admin/Merchant).

## Experiments

- Attempt accessing an `@Roles(Role.ADMIN)` route with a CUSTOMER token and inspect the 403 Forbidden payload.
- Build a composite guard validating both JWT authenticity and active account suspension status (isSuspended).
- Register RolesGuard globally using the `APP_GUARD` token within your root module.

---

## Challenge

Implement a Permission-Based Access Control (PBAC) subsystem where users hold fine-grained permissions like `products:write`, validated via a custom Guard.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────────────────────────────────────────────────┐
│ PIPELINE PERMINTAAN NESTJS                               │
│                                                          │
│ HTTP Request ──► [Guards: Auth] ──► [Interceptors: Pre]  │
│                         │                                │
│                         ▼                                │
│              [Pipes: Validation DTO]                     │
│                         │                                │
│                         ▼                                │
│              [Controller: @Get/@Post]                    │
│                         │                                │
│                         ▼                                │
│              [Service: Business Logic]                   │
│                         │                                │
│                         ▼                                │
│ Response ◄── [Interceptors: Post] ◄── [Exception Filter] │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `@Controller('users')`
- **Core Functionality:** Dekorator pengenal rute API controller.
- **Parameters / Attributes:** `Base path string`.
- **System Behavior & Return:** Memetakan request HTTP yang masuk ke handler method spesifik di dalam kelas controller..
- **Practical Code Example:**
```typescript
@Controller('users')
export class UsersController {
  @Get(':id')
  findOne(@Param('id') id: string) { return { id }; }
}
```
- **Expected Execution Output:**
```text
Endpoint GET /users/:id siap diakses klien
```

### 2. `@Injectable()`
- **Core Functionality:** Dekorator penyedia layanan (Provider / Service).
- **Parameters / Attributes:** `Provider Scope (default: Singleton)`.
- **System Behavior & Return:** Mendaftarkan class ke dalam IoC (Inversion of Control) Container NestJS untuk diinjeksi otomatis..
- **Practical Code Example:**
```typescript
@Injectable()
export class UsersService {
  findAll() { return ['Alex', 'Budi']; }
}
```
- **Expected Execution Output:**
```text
Service siap diinjeksi ke Controller mana pun
```

### 3. `@Body() dto: CreateUserDto`
- **Core Functionality:** Ekstraksi dan validasi payload body.
- **Parameters / Attributes:** `DTO Class Schema`.
- **System Behavior & Return:** Mengekstrak JSON body dari HTTP request dan memvalidasi aturan field via ValidationPipe..
- **Practical Code Example:**
```typescript
@Post()
create(@Body() dto: CreateUserDto) {
  return this.usersService.create(dto);
}
```
- **Expected Execution Output:**
```text
Payload otomatis divalidasi sebelum logika dijalankan
```

### 4. `@Module({ controllers: [...], providers: [...] })`
- **Core Functionality:** Pengelompok modul arsitektur terstruktur.
- **Parameters / Attributes:** `controllers, providers, exports, imports`.
- **System Behavior & Return:** Mengorganisasi aplikasi menjadi modul-modul independen dan kohesif..
- **Practical Code Example:**
```typescript
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
```
- **Expected Execution Output:**
```text
Modul Users siap diimpor oleh modul utama AppModule
```

---

## Common Pitfalls & Debugging Tips

### 1. Indiscriminate Request-Scoped Providers
- **Symptom / Issue:** Degrades throughput significantly by re-instantiating dependency trees per request.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Stick to default Singleton providers unless per-request isolation is strictly required.

### 2. Missing Module Exports / Imports
- **Symptom / Issue:** Crashes on boot: `Nest can't resolve dependencies of the Service`.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Verify that the exporting module exports the provider and the consumer imports it.

### 3. Omitting Global ValidationPipe
- **Symptom / Issue:** DTO payload properties pass into business services unvalidated.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Configure `app.useGlobalPipes(new ValidationPipe({ whitelist: true }))` in `main.ts`.

---

## Summary

You have mastered Passport JWT, RolesGuard, and Custom Decorators. Next week we construct Code-First GraphQL APIs with NestJS.
