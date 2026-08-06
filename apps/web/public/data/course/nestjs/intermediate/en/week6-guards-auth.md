# Guards & Authentication

> **Kategori:** NestJS | **Level:** Intermediate | **Minggu 6:** Guards & Authentication

## Learning Objectives

- Guards: implement CanActivate interface
- JWT: generate and verify tokens
- Auth flow: login, token, protected routes
- Role-based access with custom decorator
- Global guards and per-route guards

---

## Program: JWT Auth

```javascript
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if (!token) throw new UnauthorizedException();
    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractToken(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

console.log('NestJS Guards & Auth:');
console.log('');
console.log('=== Auth Flow ===');
console.log('1. Client POST /auth/login { email, password }');
console.log('2. Server verify, return JWT');
console.log('3. Client store JWT, send as Authorization: Bearer <token>');
console.log('4. Guard verify JWT di setiap request');
console.log('');
console.log('=== JWT Structure ===');
console.log('Header: { alg: "HS256", typ: "JWT" }');
console.log('Payload: { sub: 1, email: "budi@mail.com", role: "admin" }');
console.log('Signature: HMACSHA256(header + payload, secret)');
console.log('');
console.log('=== Guard Usage ===');
console.log('@UseGuards(AuthGuard)');
console.log('@Controller("users")');
console.log('export class UsersController {');
console.log('  @Get("profile")');
console.log('  getProfile(@Request() req) {');
console.log('    return req.user;');
console.log('  }');
console.log('}');
console.log('');
console.log('=== Roles Guard ===');
console.log('@SetMetadata("roles", ["admin"])');
console.log('@UseGuards(RolesGuard)');
```

---

## Key Concepts

### Guards
canActivate() returns boolean.

### JWT
Stateless authentication.

### Auth Flow
Login -> JWT -> protected routes.

### Roles
Metadata-based role checking.

---

## Experiments

- Implement refresh token mechanism
- Create RolesGuard with multiple roles
- Add @Public() decorator to skip auth
- Implement token blacklist

---

## Challenge

Build auth system: register, login, JWT, role guards, refresh token.

---

## Summary

Week 6 of 12: **Guards & Authentication** (Level: Intermediate). Next week: **ORM Advanced & Relations**.
