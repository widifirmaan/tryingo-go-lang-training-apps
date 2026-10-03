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
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `const / let variables`
- **Core Functionality:** Modern block-scoped variable declarations.
- **Parameters / Attributes:** `Identifier, Initial Value`.
- **System Behavior & Return:** `const` defines immutable references; `let` defines reassignable state variables bounded to enclosing blocks.
- **Practical Code Example:**
```javascript
const title = 'Tryngo Learning';
let counter = 0;
counter += 1;
console.log(title, counter);
```
- **Expected Execution Output:**
```text
Tryngo Learning 1
```

### 2. `() => { ... } (Arrow Function)`
- **Core Functionality:** Compact function expression with lexical 'this'.
- **Parameters / Attributes:** `Parameters, Function Body`.
- **System Behavior & Return:** Provides concise function syntax while retaining the lexical `this` binding of the outer enclosing scope.
- **Practical Code Example:**
```javascript
const double = (n) => n * 2;
console.log(double(21));
```
- **Expected Execution Output:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Core Functionality:** Linear asynchronous Promise resolution.
- **Parameters / Attributes:** `URL string, RequestInit options`.
- **System Behavior & Return:** Author asynchronous asynchronous workflows sequentially without callback pyramids.
- **Practical Code Example:**
```javascript
async function getUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return await res.json();
}
```
- **Expected Execution Output:**
```text
Returns resolved JSON object from server
```

### 4. `Array.prototype.map() / filter()`
- **Core Functionality:** Pure functional array transformation.
- **Parameters / Attributes:** `callback(item, index, array)`.
- **System Behavior & Return:** `map` returns transformed values; `filter` removes non-matching elements without mutating the original array.
- **Practical Code Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);
```
- **Expected Execution Output:**
```text
[2, 4]
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
