## Tujuan Pembelajaran

- OnPush change detection strategy
- trackBy untuk ngFor optimization
- Lazy loading modules
- Preloading strategies
- Angular Universal SSR

---

## Program: Optimizing Angular Performance

Change detection strategy, memoization, dan on-demand loading.

```typescript
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,    // check when input changes
  template: `
    @for (p of products(); track p.id) {
      <article class="card">                           <!-- track identity: reconciliation DOM minimal -->
        <h3>{{ p.name }}</h3>
        <span>{{ p.price | currency:'IDR' }}</span>
      </article>
    }
  `,
})
export class ProductsComponent {
  products = signal<Product[]>([]);
  loading = signal(true);

  async ngOnInit() {
    // deferred loading: chunked paint for long lists
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

## Konsep Kunci

### OnPush + zoneless

OnPush skips checking when input unchanged; combined with zoneless apps; world-class UI responsiveness.

### @for track

Track by identity reduces DOM operations - running browser like recycler.

### Deferred loading

Angular 17 @defer conditionally loads heavy parts (heavy charts) only when scrolled.

### Budget & bundle analyzer

build budgets per route: measure initial, worst-case bytes; tune build.

---

## Eksperimen

- Tambah @defer chart berat saat scroll.
- Benchmark render dengan track vs tanpa track.
- Uji network throttle dan rasakan efeknya.

---

## Tantangan

Use Angular DevTools profiling: flame graphs in component tree.

---

## Ringkasan

Materi minggu ini telah dibahas: Optimizing Angular Performance. Lanjut ke pekan berikutnya untuk memperdalam.
