# Routing — Peta Warung Angular

> **Kategori:** Angular | **Level:** Menengah | **Minggu 6:** Routing
> **Prasyarat:** Minggu 5 — **Template Forms**.

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

## Tantangan

**Routing di Warungmu:** pakai `/produk` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `/produk`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Template Forms** (Minggu 5): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Ringkasan

Minggu 6: **Peta Angular** — `Routes` + `routerLink`. Minggu depan: **Reactive Forms**.
