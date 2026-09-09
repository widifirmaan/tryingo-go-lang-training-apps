# Pipes & Validation — Satpam Pintu NestJS

> **Kategori:** NestJS | **Level:** Menengah | **Minggu 5:** Pipes & Validation
> **Prasyarat:** Minggu 4 — **Database TypeORM**.

## Tujuan Pembelajaran

- DTO + `class-validator` (`@IsString()`, `@MinLength(3)`) stempel + `ValidationPipe` satpam otomatis (sumber: docs.nestjs.com/techniques/validation)
- `ParseIntPipe` ubah `:id` jadi angka (bukan string!)

---

## Kenapa Ini Penting Buat Kamu?

Tanpa validasi, `nama: ""` masuk DB → laporan rusak. Tanpa `ParseIntPipe`, `id` string `"1"` vs number `1` bikin `find` gagal diam-diam. 3 baris cegah semua.

---

## Program: Satpam Warung NestJS

```bash
npm install class-validator class-transformer
```

```typescript
// dto.ts — amplop berstempel
import { IsString, MinLength, IsInt, Min } from "class-validator";

export class BuatProdukDto {
  @IsString()
  @MinLength(3, { message: "Nama minimal 3 huruf" })
  nama: string;

  @IsInt()
  @Min(1, { message: "Harga minimal 1" })
  harga: number;
}
```

```typescript
// main.ts — pasang satpam GLOBAL (1x untuk semua!)
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
```

```typescript
// controller — otomatis dicek!
@Post()
tambah(@Body() dto: BuatProdukDto) {
  return this.service.tambah(dto); // sampai sini = sudah lolos!
}

@Get(":id")
satu(@Param("id", ParseIntPipe) id: number) { // "1" → 1
  return this.service.satu(id);
}
```

POST `{}` → `400` + pesan "Nama minimal 3 huruf" (bukan 500!).

---

## Konsep Kunci

### DTO + Decorator = Amplop Berstempel
`@IsString()` stempel di field. `whitelist: true` buang field tak dikenal (anti mass-assignment!).

### `ValidationPipe` Global = Satpam 1x
Pasang di `main.ts` → semua `@Body` dicek otomatis.

### `ParseIntPipe` = Penerjemah
`":id"` string → number otomatis.

---

## Penjelasan untuk Pemula

### Analogi: Satpam + Penerjemah
- **ValidationPipe = satpam pintu**: cek stempel tiap amplop.
- **ParseIntPipe = penerjemah**: "1" → 1.

### Langkah 0 — Siapkan Device
- Sama NestJS W1 + `npm install class-validator class-transformer`.

### Cara Komputer Membaca
1. POST JSON → pipe cek tiap decorator → gagal? `400` + pesan.
2. `:id` → `ParseIntPipe` → number → controller.

### 3 Istilah Wajib
1. **DTO/Pipe**: amplop/satpam
2. **whitelist/ParseInt**: buang-asing/terjemah

---

## Eksperimen

- **Hijau:** POST `{}` → 400 + pesan?
- **Kuning:** POST + field `is_admin` → dibuang (`whitelist`)?
- **Merah:** Hapus global pipe → data jelek lolos? (Itulah kenapa wajib!)

---

## Tantangan

**Warung Bersatpam:** DTO `nama/harga/stok` + global pipe + `ParseIntPipe` `:id` + `curl` 3 kasus (lolos/kosong/salah-tipe).
- **Sambungan (Minggu 4 — Database TypeORM):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **DTO/Pipe/whitelist**: amplop/satpam/buang-asing

---

## Ringkasan

Minggu 5 dari 12: **Satpam Pintu** (Level: Menengah). Data kotor ditolak. Minggu depan: **Guards** — KTP.
