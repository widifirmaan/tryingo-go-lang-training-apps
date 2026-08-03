# Guards & Authorization

> NestJS | Auth & Advanced | Lesson 9

## Learning Objectives

- Explain the guard role: access permission before handlers
- Write a custom guard with Reflector (@Roles metadata)
- Create a @Roles decorator to mark routes
- Understand the execution order: middleware, guard, pipe, handler

---

## Program: Guards & Authorization

```ts
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

// Guard: memutuskan IZIN akses SEBELUM handler dijalankan
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Baca metadata @Roles dari handler (dan controller)
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // tidak ada aturan peran -> semua boleh akses
    }
    const request = context.switchToHttp().getRequest();
    // DEMO: peran user dari header X-User-Role.
    // Di aplikasi nyata: diambil dari token JWT (pelajaran 10).
    const userRole: string | undefined = request.headers['x-user-role'];
    if (!requiredRoles.includes(userRole)) {
      throw new ForbiddenException(
        'Akses ditolak: butuh peran ' + requiredRoles.join(', '),
      );
    }
    return true;
  }
}
```

---

## Explanation

## Guards: The Gatekeepers
Guards decide WHO may run a route - running AFTER middleware, BEFORE pipes/handlers. Middleware is blind to handler context (it cannot see which @Roles exist), while guards can read handler metadata via Reflector. The rule of thumb: middleware for global HTTP concerns (logging, CORS), guards for route-specific authorization decisions.
## Reflector + @Roles: Metadata the Guard Reads
@Roles('admin') is just SetMetadata - attaching data to a handler without changing its behavior. RolesGuard reads that metadata (getAllAndOverride) and compares it with the user's role. Authorization logic is centralized in the guard, not scattered across controllers - adding a new role means changing one place.
## @UseGuards: Mounting Levels
Controller level: protects every route in the controller (in the example: @UseGuards(RolesGuard) above the class). Method level: only specific routes. Global: via the APP_GUARD provider. Defense flow: access is denied at the first strict gate, 403 (Forbidden) if the user is authenticated but unauthorized, 401 if not logged in (lesson 10).
## The Full Request Flow
Middleware (raw HTTP) → Guard (access permission) → Interceptor (before the handler) → Pipe (validation) → Handler → Interceptor (after) → Exception Filter. Memorizing this order matters: each layer has its own job and access level.

---

## Experiments

1. **Guards: The Gatekeepers**
2. **Reflector + @Roles: Metadata the Guard Reads**
3. **@UseGuards: Mounting Levels**
4. **The Full Request Flow**

---

## Challenge

Strengthen the role system: (1) add a @Public() decorator and adjust the guard to allow routes marked @Public without role checks, (2) add an "editor" role that may update (PUT) but not delete, (3) a new GET /catatan/:id/detail-full route for "admin" only, (4) test with X-User-Role headers: siswa, editor, admin - record the HTTP status for each combination.

---

## Summary

Guards = the permission gate before handlers. Reflector reads @Roles metadata. @UseGuards at controller/method/global level. 403 vs 401. Next: JWT authentication.
