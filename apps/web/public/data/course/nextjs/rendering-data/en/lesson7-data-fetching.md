# Server Data Fetching

> Next.js | Rendering & Data | Lesson 7

## Learning Objectives

- Fetch data directly in Server Components
- Understand Next.js 15+ caching defaults
- Use fetch with cache and revalidate options
- Do parallel data fetching

---

## Program: Server Data Fetching

```tsx
export default async function Home() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();
  return (<div><h1>Users</h1>{users.map(u => <div key={u.id} style={{border:'1px solid #ddd',borderRadius:8,padding:'1rem',margin:'.5rem 0'}}><h3>{u.name}</h3><p>{u.email} | {u.company.name}</p></div>)}</div>);
}
```

---

## Explanation

## Fetch in Server Component
Server Components can be `async`. Fetch directly in the component body. No `useEffect` or `getServerSideProps` needed.

## Caching (Next.js 15+)
`fetch()` is NOT cached by default. To cache: `fetch(url, { cache: 'force-cache' })`. To revalidate: `{ next: { revalidate: 3600 } }`.

## Parallel Fetching
`const [a, b] = await Promise.all([fetch(url1), fetch(url2)])` — parallel fetch is faster than sequential.

## Error Handling
Wrap fetch in try/catch. Show error UI on failure. Server Components can call `notFound()` if data is missing.

---

## Experiments

1. **Fetch di Server Component**
2. **Caching (Next.js 15+)**
3. **Parallel Fetching**
4. **Error Handling**

---

## Challenge

Build a page displaying posts and comments from JSONPlaceholder API. Fetch in parallel. Add loading state and error handling.

---

## Summary

Server Component async + direct fetch. Cache with force-cache, revalidate with next.revalidate. Parallel fetch with Promise.all.
