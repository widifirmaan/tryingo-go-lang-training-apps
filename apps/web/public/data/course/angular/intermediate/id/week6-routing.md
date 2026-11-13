# Angular Router

> **Kategori:** Angular | **Level:** Menengah | **Minggu 6:** Angular Router

## Tujuan Pembelajaran

- Routes configuration
- RouterLink dan RouterOutlet
- Route parameters
- Navigation guards: CanActivate
- Lazy loading

---

## Program: Angular Router

Rute modern berbasis standalone component dengan functional guard.

```typescript
// app.routes.ts - standalone API
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'products', loadComponent: () => import('./products/list.component').then(m => m.ListComponent) },
  { path: 'products/:id', loadComponent: () => import('./products/detail.component').then(m => m.DetailComponent) },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
  },
  { path: '**', redirectTo: '' },
];

// functional guard (no class-based anymore)
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isLogged ? true : router.createUrlTree(['/login'], { queryParams: { redirect: state.url } });
};

// reading params in a component
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  template: '<h1>Produk {{ id() }}</h1>',
})
export class DetailComponent {
  private route = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id');
}
```

---

## Konsep Kunci

### CanActivateFn

Functional guard berbasis inject(); menggantikan class-based guard lama yang deprecated.

### loadComponent lazy loading

Chunk per komponen: initial bundle kecil, panel admin baru diunduh saat dikunjungi.

### Resolver data

ResolveFn mem-fetch data sebelum route aktif; komponen membaca hasilnya dari route data.

### Navigation events

router.events (stream) untuk progress bar/loading global; filter NavigationStart/End.

---

## Eksperimen

- Buat guard "canDeactivate" yang konfirmasi sebelum menavigasi.
- Atur route custom matching: /users/:id(\d+).
- Resolve user detail via resolver.

---

## Tantangan

Implementasi aturan redirect kanonik dan penanganan 404 dengan konfigurasi minimal.

---

## Ringkasan

Materi minggu ini telah dibahas: Angular Router. Lanjut ke pekan berikutnya untuk memperdalam.
