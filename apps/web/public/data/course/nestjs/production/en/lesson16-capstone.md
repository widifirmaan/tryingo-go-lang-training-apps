# Capstone: Protected Notes API

> NestJS | Production & Capstone | Lesson 16

## Learning Objectives

- Combine ALL track concepts in one application
- Build an API with end-to-end JWT authentication
- Guarantee per-user data via userId filtering from the token
- Close the project: documentation, tests, and deployment

---

## Program: Capstone: Protected Notes API

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CatatanModule } from './catatan/catatan.module';

// Root module capstone: SEMUA konsep track berkumpul di sini
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    CatatanModule,
  ],
})
export class AppModule {}
```

---

## Explanation

## The Capstone: Why All Lessons Become One
This Notes API is complete NestJS: modules (domain boundaries) → controllers (routes) → services (logic) → DTOs + ValidationPipe (clean input) → AuthModule + JwtAuthGuard (identity) → Swagger (documentation) → ConfigModule (env) → ready for testing and Docker (lessons 13-15). If you can explain every file in this project without notes, you own the track.
## Per-User Data: The Privacy-Saving Filter
Every service method receives the userId from the token (req.user.sub) and filters data with it. User A's notes CANNOT be seen by user B - not because the UI hides them, but because the QUERY itself refuses. This is real security vs cosmetic security: rules always live in the backend; the frontend only displays.
## Authentication: One Gate for Every Route
@UseGuards(JwtAuthGuard) at the controller level: no note route works without a valid token. Login → token → Authorization: Bearer ... header → req.user. Combined with the Swagger @ApiBearerAuth, the documentation explains how to use the token. The secret comes from env (JwtModule.registerAsync) - not hardcoded.
## Closing the Project Like a Professional
The finishing touches that separate bootcamp graduates: (1) README - how to run, env vars, curl examples, endpoint list, (2) minimal unit + e2e tests for the auth & CRUD flows, (3) deployment to Render/Railway/Fly with a managed database, (4) a multi-stage Dockerfile. One finished, deployed project is worth more than five half-finished ones.

---

## Experiments

1. **The Capstone: Why All Lessons Become One**
2. **Per-User Data: The Privacy-Saving Filter**
3. **Authentication: One Gate for Every Route**
4. **Closing the Project Like a Professional**

---

## Challenge

Take the capstone to production level: (1) add full e2e tests: login → create note → read → mark done → delete (the token flow), plus a no-token access test (401), (2) replace in-memory users with TypeORM + PostgreSQL in Docker (compose api + db), hash passwords with bcrypt, (3) write a professional README + curl examples for each endpoint, (4) deploy to a free platform (Render/Railway) and share the URL.

---

## Summary

The capstone ties it together: module → controller → service → DTO → JWT → Swagger → env. Per-user data at the query level. One finished project > five half-finished ones. Congratulations - you are a NestJS Developer!
