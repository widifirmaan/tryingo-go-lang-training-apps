# Database & TypeORM

> **Kategori:** NestJS | **Level:** Pemula | **Minggu 4:** Database & TypeORM

## Tujuan Pembelajaran

- TypeORM Entity: @Entity, @Column, @PrimaryGeneratedColumn
- Repository pattern: inject ke service
- Database config: TypeOrmModule.forRoot
- Relationships: OneToMany, ManyToOne, ManyToMany
- Migrations dan synchronize

---

## Program: Entity & Repository

```javascript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nama: string;
  
  @Column({ unique: true })
  email: string;

  @Column({ default: 'user' })
  role: string;

  @CreateDateColumn()
  createdAt: Date;
}

console.log('NestJS + TypeORM Simulation:');
console.log('');
console.log('=== Entity Definition ===');
console.log("@Entity('users')");
console.log('class User {');
console.log('  @PrimaryGeneratedColumn() id: number');
console.log('  @Column() nama: string');
console.log('  @Column({ unique: true }) email: string');
console.log('}');
console.log('');
console.log('=== Repository Pattern ===');
console.log('constructor(
  @InjectRepository(User)
  private usersRepository: Repository<User>
) {}');
console.log('');
console.log('=== CRUD Operations ===');
const userRepo = {
  findAll: () => [{ id: 1, nama: 'Budi', email: 'budi@mail.com' }],
  findOne: (id) => ({ id, nama: 'User ' + id, email: 'user' + id + '@mail.com' }),
  create: (data) => ({ id: 3, ...data, role: 'user', createdAt: new Date() }),
  update: (id, data) => ({ id, ...data }),
  delete: (id) => true,
};

console.log('findAll():', userRepo.findAll().length, 'users');
console.log('findOne(1):', userRepo.findOne(1).nama);
console.log('create():', userRepo.create({ nama: 'Andi', email: 'andi@mail.com' }));
console.log('update():', userRepo.update(1, { nama: 'Budi Updated' }));
console.log('delete():', userRepo.delete(2));
console.log('');
console.log('=== Module Config ===');
console.log('TypeOrmModule.forRoot({ type: "postgres", host: "localhost" })');
console.log('TypeOrmModule.forFeature([User])');
```

---

## Konsep Kunci

### Entity
Class yang map ke database table. @Entity, @Column, @PrimaryGeneratedColumn.


### Repository
Inject ke service: @InjectRepository(Entity) private repo: Repository<Entity>.

### Config
TypeOrmModule.forRoot() untuk koneksi database.

### Relationships
@OneToMany, @ManyToOne untuk relasi antar table.

---

## Eksperimen

- Buat entity Product dengan relasi ke User
- Implementasikan pagination dengan findAndCount
- Tambah query builder untuk complex queries
- Buat migration untuk schema changes

---

## Tantangan

Buat blog database: User, Post, Comment entities dengan relationships dan CRUD.

---

## Ringkasan

Minggu 4 dari 12: **Database & TypeORM** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Pipes & Validation** (Intermediate).
