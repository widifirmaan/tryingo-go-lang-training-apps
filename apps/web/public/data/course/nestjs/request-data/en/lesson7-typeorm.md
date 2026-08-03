# TypeORM: Entities, Repositories, Relations

> NestJS | Request & Data | Lesson 7

## Learning Objectives

- Define entities with TypeORM decorators
- Use the repository pattern via InjectRepository
- Write async CRUD without manual SQL
- Explain migrations and connections (forRoot)

---

## Program: TypeORM: Entities, Repositories, Relations

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

## Explanation

## Entities: The Database as Classes
@Entity('catatan') maps a class to a table. @PrimaryGeneratedColumn = auto-increment id. @Column = a column (with options: length, default, enum). @CreateDateColumn = auto-created. One entity = one table; schema changes = MIGRATIONS (not manual alters). synchronize: true is convenient in dev but FORBIDDEN in production - use versioned migrations instead.
## Repository Pattern: No SQL in Services
@InjectRepository(Catatan) repo: Repository<Catatan> injects the repository - an object wrapping table operations: find, findOneBy, save, update, delete. Services write no SQL: TypeORM translates to safe (parameterized) SQL. Result: thin, type-safe, easily testable code (mock the repository).
## forRoot vs forFeature
TypeOrmModule.forRoot (root module): the one-time connection config (host, user, database, autoLoadEntities). TypeOrmModule.forFeature([Entity]): registers the entities belonging to this module. autoLoadEntities simplifies - entities are auto-detected from forFeature.
## Relations & the Query Builder
Entities relate: @ManyToOne/@OneToMany/@ManyToMany (e.g. User @OneToMany Catatan) with eager relation loading: find({ relations: ['user'] }). For complex queries: the query builder (createQueryBuilder('catatan').where(...).innerJoin(...)). Lesson 10 of the Node.js track (SQL/JOIN) applies exactly here - TypeORM is just a wrapper.

---

## Experiments

1. **Entities: The Database as Classes**
2. **Repository Pattern: No SQL in Services**
3. **forRoot vs forFeature**
4. **Relations & the Query Builder**

---

## Challenge

Add relations: (1) create a Label entity (id, nama) with a @ManyToMany relation to Catatan (join table), (2) change CatatanService.semua to accept ?label=nama filtering with relations + where, (3) create GET /api/catatan/:id/label showing a note's labels, (4) write a query builder counting notes per prioritas (GROUP BY) exposed at /api/statistik.

---

## Summary

Entities = tables; repositories = safe operations; forRoot = connection, forFeature = module entities. Migrations for schema. Relations + query builder for complex queries. Next: Prisma.
