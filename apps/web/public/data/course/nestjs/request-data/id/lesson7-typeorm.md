# TypeORM: Entity, Repository, Relasi

> NestJS | Request & Data | Pelajaran 7

## Tujuan Pembelajaran

- Mendefinisikan entity dengan decorators TypeORM
- Menggunakan repository pattern lewat InjectRepository
- Menulis CRUD async tanpa SQL manual
- Menjelaskan peran migration dan koneksi (forRoot)

---

## Program: TypeORM: Entity, Repository, Relasi

```ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Catatan } from './entities/catatan.entity';

@Injectable()
export class CatatanService {
  // Repository Pattern: DI menyuntikkan repository entity ini
  constructor(
    @InjectRepository(Catatan)
    private readonly repo: Repository<Catatan>,
  ) {}

  async semua(hanyaSelesai?: boolean): Promise<Catatan[]> {
    return this.repo.find({
      where: hanyaSelesai === undefined ? {} : { selesai: hanyaSelesai },
      order: { id: 'DESC' },
    });
  }

  async detail(id: number): Promise<Catatan> {
    const item = await this.repo.findOneBy({ id });
    if (!item) throw new NotFoundException('Catatan tidak ditemukan');
    return item;
  }

  async buat(data: Partial<Catatan>): Promise<Catatan> {
    return this.repo.save(this.repo.create(data));
  }

  async ubah(id: number, perubahan: Partial<Catatan>): Promise<Catatan> {
    await this.repo.update(id, perubahan);
    return this.detail(id);
  }

  async hapus(id: number): Promise<void> {
    const hasil = await this.repo.delete(id);
    if (!hasil.affected) throw new NotFoundException('Catatan tidak ditemukan');
  }
}

// KONFIGURASI KONEKSI (di proyek nyata, file app.module.ts root):
// TypeOrmModule.forRoot({
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   autoLoadEntities: true,
//   synchronize: false, // produksi: pakai migration!
// })
```

---

## Penjelasan

## Entity: Database dalam Bentuk Class
@Entity('catatan') memetakan class ke tabel. @PrimaryGeneratedColumn = id auto-increment. @Column = kolom (dengan opsi: length, default, enum). @CreateDateColumn = dibuat otomatis. Satu entity = satu tabel; perubahan struktur tabel = MIGRATION (bukan alter manual). synchronize: true nyaman di dev tapi DILARANG di produksi - pakai migration yang ter-versioning.
## Repository Pattern: Tanpa SQL di Service
@InjectRepository(Catatan) repo: Repository<Catatan> menyuntikkan repository - object yang membungkus operasi tabel: find, findOneBy, save, update, delete. Service tidak menulis SQL: TypeORM menerjemahkan ke SQL yang aman (parameterized). Hasil: kode tipis, type-safe, dan mudah ditest (mock repository).
## forRoot vs forFeature
TypeOrmModule.forRoot (root module): konfigurasi koneksi sekali (host, user, database, autoLoadEntities). TypeOrmModule.forFeature([Entity]): mendaftarkan entity milik modul ini. AutoLoadEntities menyederhanakan - entity otomatis terdeteksi dari forFeature.
## Relasi & Query Builder
Entity berelasi: @ManyToOne/@OneToMany/@ManyToMany (misal User @OneToMany Catatan) dan pemuatan relasi: find({ relations: ['user'] }). Untuk query kompleks: query builder (createQueryBuilder('catatan').where(...).innerJoin(...)). Pelajaran 10 track Node.js (SQL/JOIN) berlaku persis di sini - TypeORM hanyalah pembungkus.

---

## Eksperimen

1. **Entity: Database dalam Bentuk Class**
2. **Repository Pattern: Tanpa SQL di Service**
3. **forRoot vs forFeature**
4. **Relasi & Query Builder**

---

## Tantangan

Tambah relasi: (1) buat entity Label (id, nama) dan relasi @ManyToMany dengan Catatan (join table), (2) ubah CatatanService.semua menerima ?label=nama dan filter dengan relations + where, (3) buat endpoint GET /api/catatan/:id/label yang menampilkan label catatan, (4) tulis query builder untuk menghitung catatan per prioritas (GROUP BY) dan tampilkan di /api/statistik.

---

## Ringkasan

Entity = tabel; repository = operasi aman; forRoot = koneksi, forFeature = entity modul. Migration untuk skema. Relasi + query builder untuk query kompleks. Lanjut: Prisma.
