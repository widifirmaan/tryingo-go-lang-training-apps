# NestJS Intro: Enterprise Architecture

> NestJS | Nest Fundamentals | Lesson 1

## Learning Objectives

- Explain why NestJS exists: structure at scale
- Understand bootstrap: NestFactory, AppModule, listen
- Meet Controller, Service, Module and their roles
- Create a project with the Nest CLI

---

## Program: NestJS Intro: Enterprise Architecture

```ts
// File bootstrap: titik masuk aplikasi NestJS
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // NestFactory membuat aplikasi dari root module
  const app = await NestFactory.create(AppModule);

  // Prefix global: semua route menjadi /api/...
  app.setGlobalPrefix('api');

  await app.listen(3000);
  console.log('NestJS berjalan di http://localhost:3000/api');
}

bootstrap();
```

---

## Explanation

## Why NestJS? The Express Problem
Express is flexible - and that is the problem: no rules, so every developer writes a different architecture. Large projects become hard to maintain. NestJS answers with MANDATORY architecture: controller, service, module - plus TypeScript, decorators, and Dependency Injection. This is why NestJS is rising fast in enterprises in 2026: consistent structure = easy onboarding, testing, and scaling.
## Bootstrap: main.ts and AppModule
NestFactory.create(AppModule) builds the application from the root module. app.listen(3000) starts the server (behind the scenes: Express). setGlobalPrefix('api') prefixes all routes - standard practice for API versioning (lesson 6). NestFactory can also create microservice/WebSocket apps (lesson 14).
## Controller, Service, Module: Three Pillars
Controller = receives requests, maps routes to methods (via @Get() and friends), holds NO business logic. Service = business logic, injected into the controller via the constructor (private readonly appService: AppService) - that is Dependency Injection. Module = groups controller + service + imports, acting as the "architecture map". The Nest CLI creates all three: nest g controller app, nest g service app.
## Decorators: TypeScript That Speaks
@Controller(), @Get(), @Injectable() are decorators - metadata the framework reads to handle your classes and methods. This is what makes Nest code "self-describing". If you have used Angular or Spring Boot, everything feels familiar - Nest is inspired by both.

---

## Experiments

1. **Why NestJS? The Express Problem**
2. **Bootstrap: main.ts and AppModule**
3. **Controller, Service, Module: Three Pillars**
4. **Decorators: TypeScript That Speaks**

---

## Challenge

Create a new project with the Nest CLI (nest new latihan), then: (1) add a GET /waktu endpoint in AppController returning new Date().toISOString(), (2) create a new WaktuService (nest g service waktu) and move the logic there, (3) set setGlobalPrefix("api") and test the endpoint in the preview. Write down your Nest project's folder structure.

---

## Summary

NestJS = mandatory structure + TypeScript + DI. Bootstrap: main.ts + AppModule. Controller/Service/Module = the three pillars. Decorators = metadata the framework reads. Next: controllers & routing in depth.
