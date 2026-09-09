# Guards & Auth — NestJS ID Guards

> **Kategori:** NestJS | **Level:** Intermediate | **Minggu 6:** Guards & Auth
> **Prerequisites:** Week 5 — **Pipes & Validation**.

## Learning Objectives

- `CanActivate` + `@UseGuards(AuthGuard)` guard per door + JWT `sign/verify` ID (source: docs.nestjs.com/security/authentication)

---

## Why This Matters (Non-IT)

Without guards, `/admin/delete-all` opens to anyone. With 1-line `@UseGuards` per door + JWT, safe. Different doors, different guards (admin vs cashier).

---

## Program: NestJS Shop ID

```bash
npm install @nestjs/jwt
```

```typescript
// auth.guard.ts — guard (1x, used everywhere)
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const token = (req.headers.authorization || "").replace("Bearer ", "");
    try {
      req.user = await this.jwt.verifyAsync(token); // valid ID?
      return true;
    } catch {
      throw new UnauthorizedException("Login first!");
    }
  }
}
```

```typescript
// auth.controller.ts — ID counter
import { JwtService } from "@nestjs/jwt";

@Post("login")
login(@Body() b: any) {
  if (b.email === "admin@shop.com" && b.password === "123") {
    return { token: this.jwt.sign({ email: b.email }) };
  }
  throw new UnauthorizedException("Wrong");
}

// products.controller.ts — guarded door
@UseGuards(AuthGuard)
@Post()
add(@Body() dto: CreateProductDto) { /* ... */ }

@Get()  // free (no guard)
all() { /* ... */ }
```

Test: `POST /login` → token → `POST /products` + `Authorization: Bearer TOKEN` header → passes. Without → 401.

---

## Key Concepts

### `CanActivate` = Guard Card
`canActivate()` returns `true` (pass) / throws (kick).

### `@UseGuards` = Stick on Door
Per method (1 door) or controller (all doors).

### JWT = Wristband
`sign` makes, `verify` checks. Secret in env!

---

## Beginner Friendly Explanation

### Analogy: Concert Wristband + Guard
- **login = swap ticket for wristband (JWT)**, **Guard = wristband-checking guard** at every VIP door.

### Step 0 — Prepare Device
- Same as W1 + `npm install @nestjs/jwt` + `JwtModule.register({ secret: "secret" })`.

### How the Computer Reads It
1. `POST /products` + header → Guard `verify` → `req.user` filled → controller.
2. No header → `UnauthorizedException` → 401.

### 3 Must-Know Terms
1. **Guard/CanActivate**: guard/can-enter?
2. **JWT/Bearer**: wristband/carry

---

## Experiments

- **Green:** No header → 401?
- **Yellow:** Fake token → 401?
- **Red:** Guard on `GET` too → list needs login (dead sales)? Choose doors!

---

### Bonus: Middleware + Nest Pipeline Order (Middleware chapter, docs.nestjs.com!)

Requests travel a pipeline in order: **Middleware → Guard → Interceptor → Pipe → Controller**. Middleware = frontmost guard (logs every request!).

```typescript
// logger.middleware.ts — greets every guest
import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(`${req.method} ${req.url} — ${new Date().toLocaleTimeString()}`);
    next(); // MUST forward! forgotten = request hangs forever!
  }
}

// app.module.ts — attach to doors
import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";

@Module({ /* ... */ })
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("products"); // only /products
    // .forRoutes("*") = all doors
  }
}
```

---

## Challenge

**ID-Protected Restaurant:** `login` + free `GET` + guarded `POST/DELETE` + `curl` 4 tests (free/none/fake/real).
- **Link-up (Week 5 — Pipes & Validation):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Guard/JWT/UseGuards**: guard/wristband/stick

---

## Summary

Week 6 of 12: **ID Guard** (Level: Intermediate). Doors guarded. Next: **Advanced ORM**.
