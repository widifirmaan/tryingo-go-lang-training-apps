# Performance Optimization

## Learning Objectives

- OnPush change detection strategy
- trackBy for ngFor optimization
- Lazy loading modules
- Preloading strategies
- Angular Universal SSR

---

## Program: Optimizing Angular Performance

Detection strategy, memoization, and on-demand loading.

```typescript
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (p of products(); track p.id) {
      <article class="card">
        <h3>{{ p.name }}</h3>
        <span>{{ p.price | currency }}</span>
      </article>
    }
  `,
})
export class ProductsComponent {
  products = signal<Product[]>([]);
  loading = signal(true);

  async ngOnInit() {
    const chunks = chunk(allProducts, 50);
    for (const c of chunks) {
      this.products.update((prev) => [...prev, ...c]);
      await nextFrame();
    }
    this.loading.set(false);
  }
}
```

---

## Key Concepts

### OnPush + zoneless

OnPush skips checking when input unchanged; combined with zoneless apps; world-class UI responsiveness.

### @for track

Track by identity reduces DOM operations - running browser like recycler.

### Deferred loading

Angular 17 @defer conditionally loads heavy parts (heavy charts) only when scrolled.

### Budget & bundle analyzer

build budgets per route: measure initial, worst-case bytes; tune build.

---

## Experiments

- Add @defer on a heavy chart
- Benchmark track vs untracked rendering
- Throttle network and experience the difference

---

## Challenge

Profile with Angular DevTools flame graphs on a real component tree.

---

## Summary

This week's material has been covered: Optimizing Angular Performance. Continue to the following week to deepen.
