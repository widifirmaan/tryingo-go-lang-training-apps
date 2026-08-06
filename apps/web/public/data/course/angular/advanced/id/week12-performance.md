# Performance Optimization

> **Kategori:** Angular | **Level:** Lanjutan | **Minggu 12:** Performance Optimization

## Tujuan Pembelajaran

- OnPush change detection strategy
- trackBy untuk ngFor optimization
- Lazy loading modules
- Preloading strategies
- Angular Universal SSR

---

## Program: Optimasi & SSR

```typescript
// Performance: OnPush, trackBy, Lazy Loading, SSR
// @Component({ changeDetection: ChangeDetectionStrategy.OnPush })
// <li *ngFor='let item of items; trackBy: trackByFn'></li>
// trackByFn(index: number, item: any) { return item.id; }
// { path: 'admin', loadChildren: () => import('./admin.module').then(m => m.AdminModule) }
console.log('Performance Optimization siap digunakan');
```

---

## Konsep Kunci

### OnPush
Hanya check saat @Input berubah.

### trackBy
Identifikasi item untuk hindari re-render semua.

### Lazy Loading
Load module saat dibutuhkan.

---

## Eksperimen

- Implementasikan OnPush
- Tambah trackBy ke ngFor
- Setup lazy loading route
- Measure bundle size

---

## Tantangan

Optimasi Angular app: OnPush, trackBy, lazy loading, measure performance.

---

## Ringkasan

Minggu 12 dari 14: **Performance** (Level: Lanjutan). Minggu depan: **Advanced Patterns**.
