# Modules & DI — Gedung Warung NestJS

> **Kategori:** NestJS | **Level:** Pemula | **Minggu 3:** Modules & DI
> **Prasyarat:** Minggu 2 — **Providers & Services**.

## Tujuan Pembelajaran

- `@Module({ controllers, providers, imports, exports })` gedung: kumpulkan + hubungkan (sumber: docs.nestjs.com/modules)
- `imports: [ProdukModule]` di `AppModule`, `exports: [ProdukService]` bagi ke gedung lain

---

## Kenapa Ini Penting Buat Kamu?

Tanpa module, 20 controller + 20 service 1 gedung — cari `ProdukService` tenggelam. Dengan `ProdukModule` (gedung produk) + `PesananModule` (gedung pesanan), rapi per toko. `exports` bagi dapur antar gedung tanpa duplikat.

---

## Program: 2 Gedung Terhubung

```typescript
// produk/produk.module.ts — gedung produk
import { Module } from '@nestjs/common';
import { ProdukController } from './produk.controller';
import { ProdukService } from './produk.service';

@Module({
  controllers: [ProdukController],
  providers: [ProdukService],
  exports: [ProdukService], // bagi dapur ke gedung lain
})
export class ProdukModule {}

// pesanan/pesanan.module.ts — gedung pesanan pakai dapur produk
import { Module } from '@nestjs/common';
import { ProdukModule } from '../produk/produk.module';
import { PesananService } from './pesanan.service';

@Module({
  imports: [ProdukModule], // hubungkan gedung
  providers: [PesananService],
})
export class PesananModule {}
```

```typescript
// pesanan.service.ts — suntik dapur gedung lain (bisa karena exports!)
import { Injectable } from '@nestjs/common';
import { ProdukService } from '../produk/produk.service';

@Injectable()
export class PesananService {
  constructor(private produkService: ProdukService) {}
  total() {
    return this.produkService.semua().reduce((s: any, p: any) => s + p.harga, 0);
  }
}
```

```typescript
// app.module.ts — gedung utama
import { Module } from '@nestjs/common';
import { ProdukModule } from './produk/produk.module';
import { PesananModule } from './pesanan/pesanan.module';

@Module({ imports: [ProdukModule, PesananModule] })
export class AppModule {}
```

---

## Konsep Kunci

### `controllers` / `providers` / `imports` / `exports` = 4 Daftar Gedung
- `controllers`: pelayan gedung ini.
- `providers`: dapur gedung ini.
- `imports`: hubungkan gedung lain.
- `exports`: bagi dapur ke luar.

### Tanpa `exports` = Dapur Terkunci
`PesananService` suntik `ProdukService` tanpa `exports` → error resolve.

---

## Penjelasan untuk Pemula

### Analogi: Mal dengan 2 Toko
- **Module = toko di mal**: `ProdukModule` toko beras, `PesananModule` toko kasir.
- **imports = pintu penghubung**, **exports = bagi dapur**.

### Langkah 0 — Siapkan Device
- Sama W1: `nest generate module pesanan` + `nest generate service pesanan` (CLI buatkan file!).

### Cara Komputer Membaca
1. Start → `AppModule` → `imports` → bangun `ProdukModule` (+ `exports` catat).
2. `PesananModule` minta `ProdukService` → cek `exports` → boleh → suntik.

### 3 Istilah Wajib
1. **Module/imports**: gedung/hubungkan
2. **exports/providers**: bagi/daftar dapur

---

## Eksperimen

- **Hijau:** `nest generate resource pesanan` → 4 file jadi?
- **Kuning:** Hapus `exports` → `PesananService` error? Pasang lagi.
- **Merah:** Lupa `imports: [ProdukModule]` di `PesananModule` → error? Tambah.

---

## Tantangan

**Mal 2 Toko:** `ProdukModule` (CRUD) + `PelangganModule` (CRUD) + `PesananModule` (`imports` keduanya, `total()` gabung) → `curl` 3 pintu lulus.

---

## Glosarium Mini

- **Module/imports/exports**: gedung/hubung/bagi
- **generate resource**: buat 4 file

---

## Ringkasan

Minggu 3 dari 4: **Gedung Terhubung** (Level: Pemula). Bisa bagi dapur antar toko. Minggu depan: **Database** — rak permanen.
