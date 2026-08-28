# Routing — Peta Warung Angular

> **Kategori:** Angular | **Level:** Menengah | **Minggu 6:** Routing

## Tujuan Pembelajaran

- `RouterModule` peta, `path: 'produk/:id'` variabel, `routerLink` pintu, `ActivatedRoute` baca `id`

---

## Kenapa Ini Penting Buat Kamu?

Sama seperti React/Vue — pindah tanpa reload header.

---

## Program: Toko Angular 3 Halaman

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: '', component: BerandaComponent },
  { path: 'produk', component: DaftarComponent },
  { path: 'produk/:id', component: DetailComponent },
];

// app.component.html
<nav><a routerLink="/">Beranda</a> | <a routerLink="/produk">Produk</a></nav>
<router-outlet />

// detail.component.ts
export class DetailComponent {
  id = inject(ActivatedRoute).snapshot.paramMap.get('id');
}
```

Gunakan `routerLink="/produk/1"` vs `href` (reload).

---

## Ringkasan

Minggu 6: **Peta Angular** — `Routes` + `routerLink`.
