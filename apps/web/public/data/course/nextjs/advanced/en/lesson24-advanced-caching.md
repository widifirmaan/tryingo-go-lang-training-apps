# Advanced Caching (Next.js 16)

> Next.js | Advanced | Lesson 24

## Learning Objectives

- Understand "use cache" directive
- Cache Components in Next.js 16
- Compare caching Next.js 14 → 15 → 16
- Production caching strategies

---

## Program: Advanced Caching (Next.js 16)

```tsx
export default async function Home() {
  // Next.js 16: 'use cache' directive at component level
  // Instead of fetch options, cache the entire component
  async function CachedSection() {
    'use cache';
    const data = await fetch('https://jsonplaceholder.typicode.com/posts/1').then(r => r.json());
    return <div style={{border:'1px solid #2E5B44',borderRadius:8,padding:'1rem',margin:'.5rem 0'}}><h3>{data.title}</h3><p>This component is cached with 'use cache'</p></div>;
  }
  return (<div><h1>Next.js 16 Caching</h1><CachedSection /><p>'use cache' replaces fetch(url, { cache: 'force-cache' }) at the component level.</p></div>);
}
```

---

## Explanation

## 'use cache' directive
Next.js 16: add `'use cache'` at the top of a component or function. The entire component output is cached. More explicit than fetch options.

## Cache Components
Components with `'use cache'` are cached based on props. Revalidate by tag or time-based. A cleaner alternative to ISR fetch.

## Caching Evolution
Next.js 14: cache by default (confusing). Next.js 15: no cache by default (opt-in). Next.js 16: 'use cache' explicit at component level.

## Strategy
Use 'use cache' for content that's the same for all users. Use dynamic for personalized content. Combine for hybrid pages.

---

## Experiments

1. **'use cache' directive**
2. **Cache Components**
3. **Evolusi Caching**
4. **Strategi**

---

## Challenge

Refactor a blog page: use 'use cache' for the post list (revalidate 60s), and dynamic for user-specific recommendations.

---

## Summary

'use cache' = component-level caching in Next.js 16. More explicit. Evolution from implicit (v14) to explicit (v16). Hybrid strategy.
