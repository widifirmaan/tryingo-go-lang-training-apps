# ORM Advanced & Relations

> **Kategori:** NestJS | **Level:** Menengah | **Minggu 7:** ORM Advanced & Relations

## Tujuan Pembelajaran

- One-to-Many dan Many-to-One relations
- Many-to-Many dengan join table
- Eager vs Lazy loading
- Query Builder untuk complex queries
- Cascade operations dan transactions

---

## Program: Relasi Database

```javascript
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama: string;

  @OneToMany(() => Post, post => post.author)
  posts: Post[];
}

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'user_id' })
  author: User;

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];
}

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Post, post => post.comments)
  post: Post;
}

console.log('TypeORM Relations:');
console.log('');
console.log('=== One-to-Many / Many-to-One ===');
console.log('User (1) <-> (N) Post');
console.log('@OneToMany(() => Post, post => post.author)');
console.log('@ManyToOne(() => User, user => user.posts)');
console.log('');
console.log('=== Eager vs Lazy Loading ===');
console.log('Eager: @ManyToOne(() => User, { eager: true })');
console.log('Lazy: @ManyToOne(() => User) // returns Promise');
console.log('');
console.log('=== Query Builder ===');
console.log('this.postsRepository');
console.log('  .createQueryBuilder("post")');
console.log('  .leftJoinAndSelect("post.author", "author")');
console.log('  .where("post.id = :id", { id: 1 })');
console.log('  .getOne();');
console.log('');
console.log('=== Cascade ===');
console.log('@OneToMany(() => Post, post => post.author, { cascade: true })');
console.log('// Save user -> auto-save posts');
```

---

## Konsep Kunci

### Relations
@OneToMany, @ManyToOne, @ManyToMany untuk relasi antar entity.

### Loading
Eager: auto-load relation. Lazy: load on access (returns Promise).

### Query Builder
createQueryBuilder() untuk complex SQL queries.

### Cascade
{ cascade: true } — save parent auto-save children.

---

## Eksperimen

- Buat Many-to-Many: User <-> Role
- Implementasikan pagination dengan Query Builder
- Tambah transaction untuk multi-step operation
- Buat nested relations: User -> Post -> Comment -> Like

---

## Tantangan

Buat social media schema: User, Post, Comment, Like dengan full relations dan queries.

---

## Ringkasan

Minggu 7 dari 12: **ORM Advanced & Relations** (Level: Menengah). Minggu depan: **Error Handling & Logging**.
