# Data Fetching

> **Kategori:** Next.js | **Level:** Intermediate | **Minggu 5:** Data Fetching

## Learning Objectives

- Fetch data directly in Server Component
- Cache options: force-cache, no-store, revalidate
- Revalidation: ISR (Incremental Static Regeneration)
- Parallel fetching with Promise.all
- Error handling and not-found for data fetching

---

## Program: Fetch & Cache

```jsx
// Next.js Data Fetching: fetch di Server Component
// Caching, Revalidation, dan Suspense

// ── app/posts/page.js ──
export default async function PostsPage() {
  // Fetch langsung di Server Component (auto cached)
  const posts = await fetchPosts();

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={"/posts/" + post.id}>{post.title}</a>
            <span> — {post.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Fetch dengan cache options
async function fetchPosts() {
  // Cache options:
  // - force-cache (default): cache selama build
  // - no-store: selalu fetch baru
  // - revalidate: cache + revalidate setelah N detik

  return [
    { id: 1, title: "Belajar Next.js", date: "2026-01-15" },
    { id: 2, title: "React Server Components", date: "2026-01-20" },
    { id: 3, title: "TypeScript di Next.js", date: "2026-01-25" },
  ];
}

// ── Fetch dengan revalidate ──
async function fetchProducts() {
  const res = await fetch("https://api.example.com/products", {
    next: { revalidate: 60 }, // revalidate setiap 60 detik
  });
  return res.json();
}

// ── Fetch tanpa cache ──
async function fetchLiveData() {
  const res = await fetch("https://api.example.com/live", {
    cache: "no-store",
  });
  return res.json();
}

// ── Parallel Data Fetching ──
export default async function Dashboard() {
  const [users, products] = await Promise.all([
    fetchUsers(),
    fetchProducts(),
  ]);
  return <DashboardUI users={users} products={products} />;
}

async function fetchUsers() {
  return [{ id: 1, name: "Budi" }];
}
async function fetchProducts2() {
  return [{ id: 1, name: "Laptop" }];
}

console.log("Data fetching siap digunakan");
```

---

## Key Concepts

### Server Fetch
Async Server Components await fetch directly.

### Cache
force-cache (default), revalidate (ISR), no-store.

### Parallel
Promise.all for simultaneous fetching.

### Error & 404
throw not-found() for 404, error.js for errors.

---

## Experiments

- Setup fetch with 30 second revalidation
- Create error handling for failed fetch
- Implement not-found for empty data
- Create loading state with Suspense

---

## Challenge

Build a blog with data fetching: fetch posts from API, implement ISR (revalidate 60s), loading state, error handling.

---

## Summary

Week 5 of 12: **Data Fetching** (Level: Intermediate). Server-side fetching. Next week: **Server Actions**.
