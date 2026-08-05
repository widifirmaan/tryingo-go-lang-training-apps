# Routing & Navigation

> Angular | Pelajaran 7

## Tujuan Pembelajaran

- Mengatur routes dengan array Routes\n- Menggunakan routerLink untuk navigasi\n- Menggunakan router-outlet untuk menampilkan komponen\n- Menggunakan wildcard route untuk 404 handling

---

## Program: Angular

```typescript
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' },
];

```

---

## Penjelasan

## Routes Configuration
Routes = array of route objects. path = URL path. component = component to render. redirectTo = redirect path. ** = wildcard (404).
## Navigation
routerLink="/about" — navigasi ke /about. routerLinkActive — tambah class aktif. routerLink dengan query params: routerLink="/about" [queryParams]="{page: 1}".
## Router Outlet
<router-outlet> — placeholder di mana komponen route ditampilkan. Setiap navigasi mengganti konten di outlet.
## Lazy Loading
loadComponent: () => import('./about/about.component').then(m => m.AboutComponent) — load component on demand untuk performa lebih baik.

---

## Eksperimen

1. **## Routes Configuration
Routes = array of route objects. path = URL path. component = component to render. redirectTo = redirect path. ** = wildcard (404).
## Navigation
routerLink="/about" — navigasi ke /about. routerLinkActive — tambah class aktif. routerLink dengan query params: routerLink="/about" [queryParams]="{page: 1}".
## Router Outlet
<router-outlet> — placeholder di mana komponen route ditampilkan. Setiap navigasi mengganti konten di outlet.
## Lazy Loading
loadComponent: () => import('./about/about.component').then(m => m.AboutComponent) — load component on demand untuk performa lebih baik.**

---

## Tantangan

Tingkatkan routing: (1) tambah route parameter /detail/:id dengan ActivatedRoute, (2) tambah route guards (CanActivate) untuk proteksi halaman, (3) buat nested routes dengan children, (4) implementasi lazy loading untuk setiap modul.

---

## Ringkasan

Routes = array config. routerLink = navigasi. router-outlet = display. ** = wildcard. Lanjut: HTTP client.
