# Database & TypeORM

> **Kategori:** NestJS | **Level:** Beginner | **Minggu 4:** Database & TypeORM

## Learning Objectives

- TypeORM Entity: @Entity, @Column, @PrimaryGeneratedColumn
- Repository pattern: inject into service
- Database config: TypeOrmModule.forRoot
- Relationships: OneToMany, ManyToOne, ManyToMany
- Migrations and synchronize

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

## Key Concepts

### Entity
Maps class to database table.

### Repository
Injected into services.

### Config
Database connection setup.

### Relationships
Table relations.

---

## Experiments

- Create Product entity with User relation
- Implement pagination with findAndCount
- Add query builder for complex queries
- Create migration for schema changes

---

## Challenge

Build blog database: User, Post, Comment entities with relationships and CRUD.

---

## Summary

Week 4 of 12: **Database & TypeORM** (Level: Beginner). Beginner phase complete! Next week: **Pipes & Validation** (Intermediate).
