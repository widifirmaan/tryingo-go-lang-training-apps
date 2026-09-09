# Providers & Services — Dapur Terpisah NestJS

> **Kategori:** NestJS | **Level:** Pemula | **Minggu 2:** Providers & Services
> **Prasyarat:** Minggu 1 — **Controllers & Routing**.

## Tujuan Pembelajaran

- `@Injectable()` tandai dapur, `constructor(private produkService: ProdukService)` suntik otomatis (sumber: docs.nestjs.com/providers)
- Controller tipis (antar), Service gemuk (masak + simpan)

---

## Kenapa Ini Penting Buat Kamu?

Jika hitung total di controller, ganti rumus → ubah 5 controller. Jika di service 1 tempat → ubah 1x. Suntik otomatis = tidak `new ProdukService()` manual di tiap controller (lupa 1 = data beda).

---

## Program: Dapur Disuntik ke Pelayan

```typescript
// produk.service.ts — dapur (masak + simpan)
import { Injectable } from '@nestjs/common';

@Injectable() // wajib! tanpa ini Nest tidak kenal
export class ProdukService {
  private daftar = [{ id: 1, nama: "Beras", harga: 62000 }];

  semua() { return this.daftar; }

  tambah(p: any) {
    const baru = { id: Date.now(), ...p };
    this.daftar.push(baru);
    return baru;
  }
}
```

```typescript
// produk.controller.ts — pelayan (antar saja)
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProdukService } from './produk.service';

@Controller('produk')
export class ProdukController {
  // Suntik otomatis: Nest buatkan 1 ProdukService untuk semua
  constructor(private produkService: ProdukService) {}

  @Get()
  semua() { return this.produkService.semua(); }

  @Post()
  tambah(@Body() body: any) { return this.produkService.tambah(body); }
}
```

```typescript
// produk.module.ts — daftarkan (jangan lupa!)
import { Module } from '@nestjs/common';
import { ProdukController } from './produk.controller';
import { ProdukService } from './produk.service';

@Module({ controllers: [ProdukController], providers: [ProdukService] })
export class ProdukModule {}
```

Test: `curl http://localhost:3000/produk` → daftar. `curl -X POST -H "Content-Type: application/json" -d '{"nama":"Gula","harga":15000}' http://localhost:3000/produk` → tambah.

---

## Konsep Kunci

### `@Injectable()` = Kartu Dapur
Tanpa `@Injectable()`, Nest tolak suntik (`Nest can't resolve dependencies`).

### Constructor Inject = Suntik Otomatis
`constructor(private x: Y)` → Nest buatkan 1 `Y` (singleton) untuk semua pemakai.

### Daftarkan di Module
`providers: [ProdukService]` wajib — lupa = error resolve.

---

## Penjelasan untuk Pemula

### Analogi: Dapur Sentral Restoran
- **Service = dapur sentral**: 1 dapur masak untuk 5 pelayan.
- **Controller = pelayan**: antar, tidak masak.
- **Module = gedung**: daftarkan siapa kerja di mana.

### Langkah 0 — Siapkan Device
- Sama W1: `nest new` + `npm run start:dev` di `3000`.

### Cara Komputer Membaca
1. Start → baca `providers` → buat 1 `ProdukService`.
2. `GET /produk` → `ProdukController` (disuntik service yang sama) → `semua()`.

### 3 Istilah Wajib
1. **Service/Injectable**: dapur/kartu
2. **Inject/constructor**: suntik
3. **Module/providers**: gedung/daftar

---

## Eksperimen

- **Hijau:** `POST` Gula → `GET` ada 2?
- **Kuning:** Hapus `@Injectable()` → error `can't resolve`? Pasang lagi.
- **Merah:** Hapus dari `providers` → error sama? Daftarkan.

---

## Tantangan

**Dapur Lengkap:** `ProdukService` + `tambah/hapus/cari` + `ProdukController` `GET/POST/DELETE` + `curl` 3 perintah lulus.
- **Sambungan (Minggu 1 — Controllers & Routing):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **Service/Controller/Module**: dapur/pelayan/gedung
- **Injectable/providers**: kartu/daftar

---

## Ringkasan

Minggu 2 dari 4: **Dapur Terpisah** (Level: Pemula). Controller tipis, service gemuk. Minggu depan: **Modules & DI** — gedung.
