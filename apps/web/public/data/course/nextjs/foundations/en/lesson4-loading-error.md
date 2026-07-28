# Loading & Error Handling

> Next.js | Next.js Foundations | Lesson 4

## Learning Objectives

- Create loading UI with loading.tsx
- Create error boundary with error.tsx
- Create 404 page with not-found.tsx
- Understand streaming and Suspense

---

## Program: Loading & Error Handling

```tsx
export default function Loading() { return <div style={{padding:'2rem',textAlign:'center'}}><p>Loading...</p><div style={{width:40,height:40,border:'4px solid #ccc',borderTopColor:'#000',borderRadius:'50%',animation:'spin 1s linear infinite',margin:'1rem auto'}}></div><style>{'@keyframes spin{to{transform:rotate(360deg)}}'}</style></div>; }
```

---

## Explanation

## loading.tsx
A `loading.tsx` file in a route folder automatically becomes a Suspense fallback. Show a skeleton or spinner.

## error.tsx
`error.tsx` must be a Client Component ('use client'). Props: `error` (object) and `reset` (function to retry).

## not-found.tsx
`not-found.tsx` for 404 pages. Can be triggered with `notFound()` from `next/navigation`.

## Streaming
Server Components stream automatically. Wrap slow components in `<Suspense>` for partial fallbacks.

---

## Experiments

1. **loading.tsx**
2. **error.tsx**
3. **not-found.tsx**
4. **Streaming**

---

## Challenge

Create a page with slow data (simulate 3s delay). Add a skeleton loading state, error boundary, and custom 404 page.

---

## Summary

loading.tsx for loading state, error.tsx for error boundary (Client Component), not-found.tsx for 404, Suspense for partial streaming.
