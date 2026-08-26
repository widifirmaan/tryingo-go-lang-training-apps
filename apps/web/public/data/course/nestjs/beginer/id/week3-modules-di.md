# Modules & DI — Gedung Warung

> **Kategori:** NestJS | **Level:** Pemula | **Minggu 3:** Modules & DI

## Tujuan Pembelajaran

- `module` = gedung yang kumpulkan controller + service, `imports` hubungkan gedung

---

## Program

```typescript
// produk.module.ts
import { Module } from '@nestjs/common';
import { ProdukController } from './produk.controller';
import { ProdukService } from './produk.service';

@Module({
  controllers: [ProdukController],
  providers: [ProdukService],
})
export class ProdukModule {}

// app.module.ts
@Module({ imports: [ProdukModule] })
export class AppModule {}
```

---

## Ringkasan

Minggu 3: **Gedung** — module satukan. Minggu depan: **Database**.
