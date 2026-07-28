# Performance Optimization

> Next.js | Production & Optimization | Lesson 19

## Learning Objectives

- Lazy loading with dynamic imports
- Optimize bundle size
- Use the React Compiler
- Analyze bundles with @next/bundle-analyzer

---

## Program: Performance Optimization

```tsx
import dynamic from 'next/dynamic';
const HeavyComponent = dynamic(() => import('./heavy'), { loading: () => <p>Loading heavy component...</p> });
export default function Home() {
  return (<div><h1>Performance Demo</h1><p>This page loads instantly. The heavy component is lazy-loaded.</p><HeavyComponent /></div>);
}
```

---

## Explanation

## Dynamic Imports
`const Comp = dynamic(() => import('./Comp'), { loading: () => <p>...</p> })` — component loaded only when rendered. Reduces bundle size.

## React Compiler
Next.js 16+ includes the React Compiler. Automatically memoizes components. No manual `useMemo` and `useCallback` needed. Enable in next.config.ts.

## Bundle Analyzer
`npm install @next/bundle-analyzer`. Add to next.config.ts. Run `ANALYZE=true npm run build`. Visualize bundle sizes.

## Image Optimization
`next/image` automatically: WebP/AVIF, responsive sizes, lazy loading. `next/font` for optimized fonts. `<Script>` with afterInteractive strategy.

---

## Experiments

1. **Dynamic Imports**
2. **React Compiler**
3. **Bundle Analyzer**
4. **Image Optimization**

---

## Challenge

Analyze a Next.js project bundle with @next/bundle-analyzer. Find the largest components. Implement dynamic importing for them.

---

## Summary

Dynamic imports for code splitting. React Compiler for auto-memoization. Bundle analyzer for audit. next/image + next/font for optimal assets.
