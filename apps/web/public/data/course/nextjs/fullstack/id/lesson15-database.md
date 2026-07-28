# Database & ORM

> Next.js | Full-Stack Next.js | Pelajaran 15

## Tujuan Pembelajaran

- Memilih ORM: Prisma vs Drizzle
- Setup database client singleton
- Query data di Server Component
- Melakukan migrasi database

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

## Penjelasan

## Prisma
ORM paling populer. Schema deklaratif. Auto-generate types. Migrations CLI. `prisma generate` untuk client.

## Drizzle
Lebih ringan, lebih dekat ke SQL. Type-safe. Syntax seperti SQL. Performa lebih baik untuk query kompleks.

## Server Component + DB
Query langsung di Server Component: `const users = await db.select().from(users)`. Zero JavaScript ke client. Data langsung dari database.

## Client Singleton
Buat file `lib/db.ts` yang export database client. Gunakan pattern singleton untuk menghindari multiple koneksi di development.

---

## Eksperimen

1. **Prisma**
2. **Drizzle**
3. **Server Component + DB**
4. **Client Singleton**

---

## Tantangan

Setup Prisma dengan SQLite. Buat schema User (id, name, email) dan Post (id, title, content, userId). Query posts dengan join user di Server Component.

---

## Ringkasan

Prisma/Drizzle untuk type-safe database queries. Query langsung di Server Component. Client singleton pattern. Migrations untuk schema changes.
