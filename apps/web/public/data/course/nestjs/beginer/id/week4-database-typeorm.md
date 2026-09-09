# Database TypeORM — Rak Permanen NestJS

> **Kategori:** NestJS | **Level:** Pemula | **Minggu 4:** Database & TypeORM
> **Prasyarat:** Minggu 3 — **Modules & DI**.

## Tujuan Pembelajaran

- `@Entity()` + `@Column()` + `@PrimaryGeneratedColumn()` cetak biru rak (sumber: typeorm.io/entities)
- `TypeOrmModule.forRoot({...})` + `forFeature([Produk])` sambung DB, `@InjectRepository(Produk)` suntik rak
- `synchronize: true` untuk belajar (jangan di produksi!)

---

## Kenapa Ini Penting Buat Kamu?

Array di service hilang saat restart — warung tutup buka stok nol lagi. Dengan TypeORM + Postgres, data awet. `synchronize: true` bikin tabel otomatis dari entity (tanpa `CREATE TABLE` manual) — cocok belajar.

---

## Program: Rak TypeORM Warung

```bash
npm install @nestjs/typeorm typeorm pg
```

```typescript
// produk.entity.ts — cetak biru (bukan tabel SQL manual!)
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('produks')
export class Produk {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nama: string;

  @Column()
  harga: number;

  @Column({ default: 0 })
  stok: number;
}
```

```typescript
// app.module.ts — sambung DB
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produk } from './produk/produk.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'rahasia',
      database: 'warung',
      entities: [Produk],
      synchronize: true, // belajar saja! produksi pakai migration
    }),
    TypeOrmModule.forFeature([Produk]),
  ],
})
export class AppModule {}
```

```typescript
// produk.service.ts — suntik rak
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produk } from './produk.entity';

@Injectable()
export class ProdukService {
  constructor(@InjectRepository(Produk) private repo: Repository<Produk>) {}

  semua() { return this.repo.find(); }
  tambah(p: Partial<Produk>) { return this.repo.save(p); }
  cari(nama: string) { return this.repo.find({ where: { nama } }); }
}
```

Test: `curl -X POST .../produk` → restart server → `GET` data masih ada!

---

## Konsep Kunci

### `@Entity` + `@Column` = Cetak Biru
`@Entity('produks')` nama tabel, `@Column()` kolom, `@PrimaryGeneratedColumn()` nomor otomatis.

### `forRoot` + `forFeature` = Sambung + Daftarkan
`forRoot` koneksi DB 1x, `forFeature([Produk])` daftarkan rak ke module.

### `Repository` = Tukang Gudang
`find()`, `save()`, `findOneBy({id})`, `delete(id)` — tanpa SQL.

---

## Penjelasan untuk Pemula

### Analogi: Rak dengan Tukang
- **Entity = gambar rak**, **Repository = tukang** yang ambil/simpan, **forRoot = sambung listrik gudang**.

### Langkah 0 — Siapkan Device
- Postgres jalan (`docker run -e POSTGRES_PASSWORD=rahasia -p 5432:5432 -d postgres`) + DB `warung` dibuat.

### Cara Komputer Membaca
1. Start → `forRoot` konek → `synchronize` buat tabel `produks` jika belum ada.
2. `repo.save({nama:"Beras"})` → `INSERT INTO produks ...`.

### 3 Istilah Wajib
1. **Entity/Repository**: biru/tukang
2. **synchronize**: bikin otomatis (dev saja)

---

## Eksperimen

- **Hijau:** `POST` 2 produk → restart → `GET` masih 2? (awet!)
- **Kuning:** Ubah entity tambah `kategori` → restart → kolom muncul otomatis?
- **Merah:** `synchronize: false` + entity baru → tabel tidak dibuat? (Itulah kenapa dev pakai true)

---

## Tantangan

**Rak Lengkap:** `Produk` + `Pelanggan` entity + 2 service `Repository` + `GET/POST` keduanya + restart cek awet. **Selesai Beginner NestJS!**
- **Sambungan (Minggu 3 — Modules & DI):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **Entity/Column/Repository**: biru/kolom/tukang
- **forRoot/forFeature**: sambung/daftar
- **synchronize**: otomatis (dev)

---

## Ringkasan

Minggu 4 dari 4: **Rak Permanen** (Level: Pemula). **Selesai Beginner NestJS!** Lanjut: **Auth/JWT** (Menengah).
