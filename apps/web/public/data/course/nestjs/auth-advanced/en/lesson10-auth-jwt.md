# JWT Authentication

> NestJS | Auth & Advanced | Lesson 10

## Learning Objectives

- Explain the JWT flow: login, token, verification
- Use @nestjs/jwt for signing & verifying tokens
- Write a JwtAuthGuard to protect routes
- Read the user from the token in handlers (req.user)

---

## Program: JWT Authentication

```ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

// DEMO: user di memori. Di produksi: tabel users (pelajaran 7-8)
// dengan password di-hash bcrypt (jangan pernah simpan plain text!).
const USERS: User[] = [
  { id: 1, username: 'admin', password: 'rahasia123', role: 'admin' },
  { id: 2, username: 'siswa', password: 'rahasia123', role: 'siswa' },
];

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(username: string, password: string) {
    const user = USERS.find(
      (u) => u.username === username && u.password === password,
    );
    if (!user) {
      throw new UnauthorizedException('Username atau password salah');
    }
    const payload = { sub: user.id, username: user.username, role: user.role };
    // Sign: server menandatangani token (stateless - server tak simpan sesi)
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, user: { id: user.id, username: user.username, role: user.role } };
  }

  cariById(id: number): User | undefined {
    return USERS.find((u) => u.id === id);
  }
}
```

---

## Explanation

## The JWT Flow: Stateless Authentication
Login (POST /api/auth/login) → the server verifies credentials → the server SIGNS a token (payload + secret) → the client stores the token and sends it as the Authorization: Bearer <token> header on every request → JwtAuthGuard VERIFIES the token (no database hit!) → request.user is populated. Stateless: the server stores no sessions - the token carries its own identity. This is what makes an API horizontally scalable without a shared session store.
## JwtModule: Configure Once
JwtModule.register({ secret, expiresIn: '1h' }) is available across AuthModule (and modules importing it via exports). Common payload: sub (user id), username, role. Never put passwords or sensitive data in the token - anyone can READ a token; only its SIGNATURE is protected.
## JwtAuthGuard: Verify on Every Request
The guard reads the Authorization header, checks the Bearer prefix, verifies the token with the same secret, then attaches the payload to request.user. An expired/broken token = UnauthorizedException (401). This pattern equals the butuhToken middleware in the Node.js track - but now wrapped in Nest architecture and combinable with RolesGuard (lesson 9).
## Non-Negotiable Security
The JWT secret = the server's identity card: keep it in env, never in git (lesson 12). Hash passwords with bcrypt/argon2 before storing. Short expiry (1h) + a refresh token for long sessions. HTTPS is mandatory in production - a token over plain HTTP is a leaked token.

---

## Experiments

1. **The JWT Flow: Stateless Authentication**
2. **JwtModule: Configure Once**
3. **JwtAuthGuard: Verify on Every Request**
4. **Non-Negotiable Security**

---

## Challenge

Complete the auth system: (1) replace plain-text passwords with bcrypt hashing (npm i bcryptjs) - compare the old vs new login, (2) add POST /api/auth/refresh issuing a new token from a still-valid old one, (3) protect DELETE /catatan/:id with JwtAuthGuard + RolesGuard together (double @UseGuards), (4) test: no token (401), wrong token (401), valid token (200).

---

## Summary

JWT = stateless auth. Login signs tokens, guards verify. request.user from the payload. Secrets in env, passwords hashed. Next: interceptors.
