# Streaming & Suspense

> Next.js | Rendering & Data | Lesson 9

## Learning Objectives

- Understand HTML streaming in Next.js
- Use Suspense boundaries
- Create loading skeletons
- Prioritize important content first

---

## Program: Streaming & Suspense

```tsx
import { Suspense } from 'react';
async function SlowPosts() { await new Promise(r => setTimeout(r, 2000)); const posts = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5').then(r=>r.json()); return <div>{posts.map(p => <div key={p.id} style={{border:'1px solid #ddd',borderRadius:8,padding:'.8rem',margin:'.5rem 0'}}><h4>{p.title}</h4><p style={{fontSize:'.9em',color:'#666'}}>{p.body}</p></div>)}</div>; }
async function SlowProfile() { await new Promise(r => setTimeout(r, 1000)); return <div style={{background:'#f0f0f0',padding:'1rem',borderRadius:8}}><h3>User Profile</h3><p>Name: John Doe</p><p>Role: Admin</p></div>; }
export default function Home() {
  return (<div><h1>Dashboard</h1><Suspense fallback={<p>Loading profile...</p>}><SlowProfile /></Suspense><Suspense fallback={<p>Loading posts...</p>}><SlowPosts /></Suspense></div>);
}
```

---

## Explanation

## Streaming
Next.js automatically streams Server Components. HTML is sent progressively as data becomes ready. No need to wait for all data.

## Suspense Boundaries
Wrap slow components in `<Suspense fallback={...}>`. Each Suspense boundary is independent. One slow piece doesn't block others.

## Priority
Critical content (header, nav) outside Suspense — appears instantly. Secondary content inside Suspense — appears when ready.

## loading.tsx
`loading.tsx` = automatic Suspense boundary for the segment. Useful for full-page loading.

---

## Experiments

1. **Streaming**
2. **Suspense Boundaries**
3. **Priority**
4. **loading.tsx**

---

## Challenge

Build a dashboard with 3 data components: profile (fast), posts (2s), comments (3s). Each component in its own Suspense with skeleton.

---

## Summary

Streaming = progressive HTML. Suspense = per-component fallback. loading.tsx = automatic route Suspense. Prioritize important content.
