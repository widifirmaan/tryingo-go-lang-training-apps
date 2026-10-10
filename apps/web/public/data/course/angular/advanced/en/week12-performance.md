# Performance Optimization

> **Kategori:** Angular | **Level:** Advanced | **Minggu 12:** Performance Optimization

## Learning Objectives

- OnPush change detection strategy
- trackBy for ngFor optimization
- Lazy loading modules
- Preloading strategies
- Angular Universal SSR

---

## Program: Optimization & SSR

```typescript
// Performance: OnPush, trackBy, Lazy Loading, SSR
// @Component({ changeDetection: ChangeDetectionStrategy.OnPush })
// <li *ngFor='let item of items; trackBy: trackByFn'></li>
// trackByFn(index: number, item: any) { return item.id; }
// { path: 'admin', loadChildren: () => import('./admin.module').then(m => m.AdminModule) }
console.log('Performance Optimization siap digunakan');
```

---

## Key Concepts

### OnPush
Only checks on @Input change.

### trackBy
Identify items to avoid full re-render.

### Lazy Loading
Load modules on demand.

---

## Experiments

- Implement OnPush
- Add trackBy to ngFor
- Setup lazy loading route
- Measure bundle size

---

## Challenge

Optimize Angular app: OnPush, trackBy, lazy loading, measure performance.

---

## Summary

Week 12 of 14: **Performance** (Level: Advanced). Next week: **Advanced Patterns**.
