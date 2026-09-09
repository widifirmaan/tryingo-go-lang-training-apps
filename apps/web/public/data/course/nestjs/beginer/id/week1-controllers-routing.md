# Controllers & Routing — Pelayan Warung Terstruktur

> **Kategori:** NestJS | **Level:** Pemula | **Minggu 1:** Controllers & Routing
> **Prasyarat:** Tidak ada — mulai dari nol.

## Tujuan Pembelajaran

- Paham NestJS = **Node.js yang terstruktur** seperti warung dengan SOP: `controller` pelayan, `service` dapur, `module` gedung
- `npm i -g @nestjs/cli`, `nest new warung-nest`, `npm run start:dev` di `3000`
- `@Controller('produk')` + `@Get()` pintu, `return` otomatis JSON

---

## Kenapa Ini Penting Buat Kamu?

Express bebas, tapi berantakan saat besar. NestJS pakai **SOP** — tiap pelayan punya tugas jelas, cocok untuk tim warung yang mau jadi minimarket.

---

## Program: Pelayan Produk

```bash
npm i -g @nestjs/cli
nest new warung-nest
cd warung-nest
npm run start:dev
# Buka http://localhost:3000
```

```typescript
// src/produk/produk.controller.ts
import { Controller, Get, Param } from '@nestjs/common';

@Controller('produk')
export class ProdukController {
  private daftar = [
    { id: 1, nama: "Beras 5kg", harga: 62000 },
    { id: 2, nama: "Bayam", harga: 5000 },
  ];

  @Get()
  semua() { return this.daftar; } // GET /produk

  @Get(':id')
  satu(@Param('id') id: string) {
    return this.daftar.find(p => p.id === Number(id)) || { error: "Tidak ada" };
  }
}
```

Buka `http://localhost:3000/produk` → JSON, `/produk/1` → 1 produk.

---

## Konsep Kunci

### `@Controller('produk')` = Meja Pelayan
`@Get()` = pintu GET, `@Param('id')` = ambil variabel URL.

### SOP NestJS
`controller` (pelayan) → `service` (dapur) → `module` (gedung). Minggu depan service.

---

## Eksperimen

- **Hijau:** Jalankan Program apa adanya; catat 1 baris output pertama.
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus baris `import { Controller, Get, Param } from '@nestjs/common';` → error apa? Pasang lagi.

## Tantangan

**Controllers & Routing di Warungmu:** jalankan ulang hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai di Program; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Naikkan 1 tingkat: tambah 1 kasus gagal + pesan error yang jelas.

## Ringkasan

Minggu 1: **Pelayan Terstruktur** — NestJS SOP. Minggu depan: **Providers & Services**.
