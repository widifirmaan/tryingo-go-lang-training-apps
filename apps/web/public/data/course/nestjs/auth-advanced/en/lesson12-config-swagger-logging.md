# Config, Swagger & Logging

> NestJS | Auth & Advanced | Lesson 12

## Learning Objectives

- Manage configuration with @nestjs/config
- Generate API documentation with Swagger/OpenAPI
- Use the Nest Logger with levels and contexts
- Tidy production: env, config validation, logging

---

## Program: Config, Swagger & Logging

```ts
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Swagger: dokumentasi API OTOMATIS dari decorators + DTO
  const config = new DocumentBuilder()
    .setTitle('Catatan API')
    .setDescription('API catatan - materi NestJS Tryngo')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const logger = new Logger('Bootstrap');
  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
  logger.log(`API aktif di http://localhost:${port}/api`);
  logger.log(`Dokumentasi Swagger: http://localhost:${port}/docs`);
}

bootstrap();
```

---

## Explanation

## ConfigModule: One Place for Every Setting
ConfigModule.forRoot({ isGlobal: true }) reads .env and makes it available app-wide via ConfigService (get<string>('PORT')). Missing values get defaults (get('APP_NAME', 'Catatan API')). Production rules: no magic numbers, no secrets in code - everything in env, versioning only .env.example (a template without real values).
## Swagger: Documentation That Never Goes Stale
DocumentBuilder + SwaggerModule produce the /docs page FROM your code: controller decorators (@ApiTags, @ApiOperation) and DTOs (@ApiProperty). Docs are always in sync with the implementation - because they are BORN from it. Frontend teams, testers, and other developers read the API contract without asking. OpenAPI is an exportable standard (json/yaml) for codegen.
## Nest Logger: Not console.log
Logger provides: context (CatatanService), levels (log/warn/error/fatal), and consistent formatting. warn/error can feed monitoring systems (Sentry, Grafana) in production - plain console.log has no levels, so it cannot be filtered. Rules: info logs for traces, warn for anomalies, error for failures.
## Why All Three in One Lesson
Config + Swagger + Logging are "visible infrastructure": without them the app runs, with them the app is OPERABLE - ready for a team, debuggable in production, documented. All three are mounted ONCE at the project start, and every production Nest project has them.

---

## Experiments

1. **ConfigModule: One Place for Every Setting**
2. **Swagger: Documentation That Never Goes Stale**
3. **Nest Logger: Not console.log**
4. **Why All Three in One Lesson**

---

## Challenge

Tidy the configuration: (1) move the JWT secret (lesson 10) into .env and read it via ConfigService (JwtModule.registerAsync), (2) enable config validation: write a validation function throwing an error when PORT is not a number, (3) add @ApiBearerAuth + @ApiResponse for token-protected routes, (4) add a ?q= query param to GET /catatan and document it with @ApiQuery.

---

## Summary

ConfigModule = centralized env. Swagger = docs born from code. Nest Logger = levels + contexts. Production-ready. Next: testing.
