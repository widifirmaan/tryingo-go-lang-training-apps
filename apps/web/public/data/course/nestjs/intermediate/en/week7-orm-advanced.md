# ORM Relations — Tali Antar Rak NestJS

> **Kategori:** NestJS | **Level:** Menengah | **Minggu 7:** ORM Advanced & Relations

## Tujuan Pembelajaran

- `@OneToMany` + `@ManyToOne` tali (1 pelanggan - banyak pesanan) (sumber: typeorm.io/relations)
- `relations: ["pesanans"]` ikut ambil (eager manual) vs N+1 lambat

---

## Kenapa Ini Penting Buat Kamu?

Tanpa relasi, ambil pelanggan + pesanannya = 2 query manual + gabung di JS. Dengan `@OneToMany`, 1 baris ikut ambil. Tanpa sadar N+1, 100 pelanggan = 101 query (lambat!).

---

## Program: Tali Warung NestJS

```typescript
// pelanggan.entity.ts — 1 punya banyak
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Pesanan } from "./pesanan.entity";

@Entity()
export class Pelanggan {
  @PrimaryGeneratedColumn() id: number;
  @Column() nama: string;

  @OneToMany(() => Pesanan, (p) => p.pelanggan)
  pesanans: Pesanan[];
}
```

```typescript
// pesanan.entity.ts — banyak milik 1
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Pelanggan } from "./pelanggan.entity";

@Entity()
export class Pesanan {
  @PrimaryGeneratedColumn() id: number;
  @Column() total: number;

  @ManyToOne(() => Pelanggan, (p) => p.pesanans)
  pelanggan: Pelanggan;
}
```

```typescript
// service — ikut ambil (hindari N+1!)
semua() {
  return this.repo.find({ relations: ["pesanans"] });
}
```

---

## Konsep Kunci

### `@OneToMany` / `@ManyToOne` = Punya / Milik
1 pelanggan punya banyak pesanan; tiap pesanan milik 1 pelanggan.

### `relations: [...]` = Ikut Ambil
Tanpa ini, `pelanggan.pesanans` kosong! Dengan ini, 2 query (bukan 101).

---

## Penjelasan untuk Pemula

### Analogi: Buku Tamu & Nota Terjahit
- **Relasi = jahitan**: nota dijahit ke halaman buku tamu pemiliknya.

### Langkah 0 — Siapkan Device
- Sama W4-beginner: TypeORM + Postgres jalan.

### Cara Komputer Membaca
1. `find({ relations: ["pesanans"] })` → `SELECT` pelanggan + `SELECT ... WHERE pelangganId IN (...)`.
2. Tempel hasil ke tiap pelanggan.

### 3 Istilah Wajib
1. **OneToMany/ManyToOne**: punya/milik
2. **relations**: ikut-ambil

---

## Eksperimen

- **Hijau:** Tanpa `relations` → `pesanans` kosong?
- **Kuning:** Log query: tanpa relations 101 query? Dengan 2?
- **Merah:** `@OneToMany` tanpa `@ManyToOne` pasangan → FK tidak dibuat? Pasangkan.

---

## Tantangan

**Toko Bertali:** `Pelanggan 1-N Pesanan N-1 Produk` + `relations` 2 level + buktikan 3 query (bukan 1+N+M).

---

## Glosarium Mini

- **OneToMany/ManyToOne/relations**: punya/milik/ikut

---

## Ringkasan

Minggu 7 dari 12: **Tali Rak** (Level: Menengah). Tanpa N+1. Minggu depan: **Error & Log**.
