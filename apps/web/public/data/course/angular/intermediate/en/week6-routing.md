# Angular Router

## Learning Objectives

- Routes configuration
- RouterLink and RouterOutlet
- Route parameters
- Navigation guards: CanActivate
- Lazy loading

---

## Program: Angular Router

Modern standalone routes with functional guards.

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
  template: '<h1>Product {{ id() }}</h1>',
})
export class DetailComponent {
  private route = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id');
}
```

---

## Key Concepts

### CanActivateFn

Functional guard berbasis inject(); menggantikan class-based guard lama yang deprecated.

### loadComponent lazy loading

Chunk per komponen: initial bundle kecil, panel admin baru diunduh saat dikunjungi.

### Resolver data

ResolveFn mem-fetch data sebelum route aktif; komponen membaca hasilnya dari route data.

### Navigation events

router.events (stream) untuk progress bar/loading global; filter NavigationStart/End.

---

## Experiments

- Add a canDeactivate guard prompting on navigation.
- Match numeric route params with regex.
- Preload user detail via a resolver.

---

## Challenge

Implement canonical redirects and smart 404 handling with minimal config.

---

## Summary

This week's material has been covered: Angular Router. Continue to the following week to deepen.
