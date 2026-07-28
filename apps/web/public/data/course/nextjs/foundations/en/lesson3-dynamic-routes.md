# Dynamic Routes & Navigation

> Next.js | Next.js Foundations | Lesson 3

## Learning Objectives

- Create dynamic routes with [slug]
- Access params in Server Components
- Use Link for client-side navigation
- Understand catch-all routes

---

## Program: Dynamic Routes & Navigation

```tsx
import Link from 'next/link';
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (<div><h1>Post: {slug}</h1><p>This is the content of {slug}.</p><Link href="/">Back</Link></div>);
}
```

---

## Explanation

## Dynamic Routes
`[slug]` = single segment. `[...slug]` = catch-all (one level). `[[...slug]]` = optional catch-all.

## Link Component
`<Link href="/blog/post-1">Post 1</Link>` — client-side navigation without reload. Auto-prefetch in viewport.

## useRouter
`useRouter()` from `next/navigation` for programmatic navigation: `router.push('/about')`, `router.back()`.

---

## Experiments

1. **Dynamic Routes**
2. **Link Component**
3. **useRouter**

---

## Challenge

Create a products page with dynamic routes. Show a product list at `/products` and product details at `/products/[id]`. Use Link for navigation.

---

## Summary

Dynamic routes use [slug] in folder names. Link component for client-side navigation. Catch-all routes with [...slug].
