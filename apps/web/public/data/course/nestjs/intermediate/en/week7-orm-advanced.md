# ORM Advanced & Relations

> **Kategori:** NestJS | **Level:** Intermediate | **Minggu 7:** ORM Advanced & Relations

## Learning Objectives

- One-to-Many and Many-to-One relations
- Many-to-Many with join table
- Eager vs Lazy loading
- Query Builder for complex queries
- Cascade operations and transactions

---

## Program: Database Relations

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

## Key Concepts

### Relations
Entity relationship decorators.

### Loading
Eager vs lazy loading.

### Query Builder
Complex queries.

### Cascade
Auto-save related entities.

---

## Experiments

- Create Many-to-Many: User <-> Role
- Implement pagination with Query Builder
- Add transaction for multi-step operation
- Create nested relations

---

## Challenge

Build social media schema: User, Post, Comment, Like with full relations and queries.

---

## Summary

Week 7 of 12: **ORM Advanced & Relations** (Level: Intermediate). Next week: **Error Handling & Logging**.
