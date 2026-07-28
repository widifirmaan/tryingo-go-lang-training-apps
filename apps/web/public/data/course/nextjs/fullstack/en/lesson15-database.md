# Database & ORM

> Next.js | Full-Stack Next.js | Lesson 15

## Learning Objectives

- Choose ORM: Prisma vs Drizzle
- Setup database client singleton
- Query data in Server Component
- Run database migrations

---

## Program: Database & ORM

```tsx
export default async function Home() {
  // In production, use Prisma or Drizzle:
  // const posts = await db.query.posts.findMany();
  // For this demo, we simulate database results:
  const posts = [
    { id: 1, title: 'Getting Started with Next.js', author: 'Admin', createdAt: '2026-07-01' },
    { id: 2, title: 'Server Components Explained', author: 'Admin', createdAt: '2026-07-05' },
    { id: 3, title: 'Why App Router?', author: 'Admin', createdAt: '2026-07-10' },
  ];
  return (<div><h1>Blog (Database Demo)</h1>{posts.map(p => <div key={p.id} style={{border:'1px solid #ddd',borderRadius:8,padding:'1rem',margin:'.5rem 0'}}><h3>{p.title}</h3><p>By {p.author} | {p.createdAt}</p></div>)}</div>);
}
```

---

## Explanation

## Prisma
Most popular ORM. Declarative schema. Auto-generates types. Migration CLI. `prisma generate` for client.

## Drizzle
Lighter, closer to SQL. Type-safe. SQL-like syntax. Better performance for complex queries.

## Server Component + DB
Query directly in Server Component: `const users = await db.select().from(users)`. Zero JavaScript to client. Data straight from database.

## Client Singleton
Create `lib/db.ts` exporting database client. Use singleton pattern to avoid multiple connections in development.

---

## Experiments

1. **Prisma**
2. **Drizzle**
3. **Server Component + DB**
4. **Client Singleton**

---

## Challenge

Setup Prisma with SQLite. Create User (id, name, email) and Post (id, title, content, userId) schema. Query posts with user join in Server Component.

---

## Summary

Prisma/Drizzle for type-safe database queries. Query directly in Server Component. Client singleton pattern. Migrations for schema changes.
