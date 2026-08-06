# Database & ORM

> **Kategori:** Next.js | **Level:** Advanced | **Minggu 9:** Database & ORM

## Learning Objectives

- Setup Prisma with Next.js
- Schema definition: models, relations, fields
- CRUD operations: create, read, update, delete
- Relations: one-to-many, many-to-many
- Migrations: prisma migrate, prisma generate

---

## Program: Prisma & CRUD

```jsx
// Next.js + Database: Prisma ORM
// Setup, schema, migrations, CRUD operations

// ── prisma/schema.prisma ──
// generator client {
//   provider = "prisma-client-js"
// }
// datasource db {
//   provider = "postgresql"
//   url      = env("DATABASE_URL")
// }
// model User {
//   id        Int      @id @default(autoincrement())
//   email     String   @unique
//   name      String?
//   posts     Post[]
//   createdAt DateTime @default(now())
// }
// model Post {
//   id        Int      @id @default(autoincrement())
//   title     String
//   content   String?
//   published Boolean  @default(false)
//   author    User     @relation(fields: [authorId], references: [id])
//   authorId  Int
// }

// ── lib/prisma.js ──
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// export default prisma;

// ── Server Component dengan Prisma ──
// import prisma from "@/lib/prisma";

export default async function UsersPage() {
  // Simulasi data dari database
  const users = await getUsers();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email}) — {user.posts} posts
          </li>
        ))}
      </ul>
    </div>
  );
}

async function getUsers() {
  // Simulasi: prisma.user.findMany({ include: { posts: true } })
  return [
    { id: 1, name: "Budi", email: "budi@tryngo.dev", posts: 5 },
    { id: 2, name: "Siti", email: "siti@tryngo.dev", posts: 3 },
  ];
}

// ── Server Action: Create User ──
// "use server";
// export async function createUser(formData) {
//   const name = formData.get("name");
//   const email = formData.get("email");
//   await prisma.user.create({ data: { name, email } });
//   revalidatePath("/users");
// }

console.log("Database & ORM siap digunakan");
```

---

## Key Concepts

### Prisma
Type-safe ORM for Next.js. Schema-first.

### Schema
Model = table, Field = column, Relation = FK.

### CRUD
findMany, create, update, delete.

### Migrations
prisma migrate dev creates and applies migrations.

---

## Experiments

- Create schema with relations
- Implement pagination
- Add search and filter
- Create nested create (user + posts)

---

## Challenge

Build a blog database: User, Post, Comment models. CRUD operations with Prisma. Include relations and pagination.

---

## Summary

Week 9 of 12: **Database & ORM** (Level: Advanced). Data persistence. Next week: **Advanced Auth**.
