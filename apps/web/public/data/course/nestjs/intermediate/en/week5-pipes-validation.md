# Pipes & Validation — NestJS Door Guards

> **Kategori:** NestJS | **Level:** Intermediate | **Minggu 5:** Pipes & Validation
> **Prerequisites:** Week 4 — **Database TypeORM**.

## Learning Objectives

- DTO + `class-validator` (`@IsString()`, `@MinLength(3)`) stamps + `ValidationPipe` automatic guard (source: docs.nestjs.com/techniques/validation)
- `ParseIntPipe` turns `:id` into numbers (not strings!)

---

## Why This Matters (Non-IT)

Without validation, `name: ""` enters the DB → reports break. Without `ParseIntPipe`, string `"1"` vs number `1` ids silently break `find`. 3 lines stop all of it.

---

## Program: NestJS Shop Guard

```bash
npm install class-validator class-transformer
```

```typescript
// dto.ts — stamped envelope
import { IsString, MinLength, IsInt, Min } from "class-validator";

export class CreateProductDto {
  @IsString()
  @MinLength(3, { message: "Name min 3 letters" })
  name: string;

  @IsInt()
  @Min(1, { message: "Price min 1" })
  price: number;
}
```

```typescript
// main.ts — install GLOBAL guard (1x for all!)
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
```

```typescript
// controller — auto-checked!
@Post()
add(@Body() dto: CreateProductDto) {
  return this.service.add(dto); // reaching here = already passed!
}

@Get(":id")
one(@Param("id", ParseIntPipe) id: number) { // "1" → 1
  return this.service.one(id);
}
```

POST `{}` → `400` + "Name min 3 letters" message (not 500!).

---

## Key Concepts

### DTO + Decorator = Stamped Envelope
`@IsString()` stamp on field. `whitelist: true` drops unknown fields (anti mass-assignment!).

### Global `ValidationPipe` = 1x Guard
Installed in `main.ts` → every `@Body` auto-checked.

### `ParseIntPipe` = Translator
`":id"` string → number automatically.

---

## Beginner Friendly Explanation

### Analogy: Guard + Translator
- **ValidationPipe = door guard**: checks stamps on every envelope.
- **ParseIntPipe = translator**: "1" → 1.

### Step 0 — Prepare Device
- Same as NestJS W1 + `npm install class-validator class-transformer`.

### How the Computer Reads It
1. POST JSON → pipe checks each decorator → fail? `400` + message.
2. `:id` → `ParseIntPipe` → number → controller.

### 3 Must-Know Terms
1. **DTO/Pipe**: envelope/guard
2. **whitelist/ParseInt**: drop-strangers/translate

---

## Experiments

- **Green:** POST `{}` → 400 + message?
- **Yellow:** POST with `is_admin` field → dropped (`whitelist`)?
- **Red:** Remove global pipe → bad data passes? (That's why it's mandatory!)

---

## Challenge

**Guarded Shop:** DTO `name/price/stock` + global pipe + `ParseIntPipe` `:id` + `curl` 3 cases (pass/empty/wrong-type).

---

## Mini Glossary

- **DTO/Pipe/whitelist**: envelope/guard/drop-strangers

---

## Summary

Week 5 of 12: **Door Guard** (Level: Intermediate). Dirty data rejected. Next: **Guards** — ID.
