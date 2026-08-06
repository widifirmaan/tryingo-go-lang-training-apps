# Database & ORM

> **Kategori:** Next.js | **Level:** Lanjutan | **Minggu 9:** Database & ORM

## Tujuan Pembelajaran

- Setup Prisma dengan Next.js
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

## Konsep Kunci

### Prisma
ORM type-safe untuk Next.js. Schema-first approach.

### Schema
Model = table. Field = column. Relation = foreign key.

### CRUD
prisma.user.findMany(), create(), update(), delete().

### Migrations
prisma migrate dev = buat migration + apply.

---

## Eksperimen

- Buat schema dengan relations
- Implementasikan pagination
- Tambah search dan filter
- Buat nested create (user + posts)

---

## Tantangan

Buat blog database: User, Post, Comment models. CRUD operations dengan Prisma. Include relations dan pagination.

---

## Ringkasan

Minggu 9 dari 12: **Database & ORM** (Level: Lanjutan). Data persistence. Minggu depan: **Advanced Auth**.
