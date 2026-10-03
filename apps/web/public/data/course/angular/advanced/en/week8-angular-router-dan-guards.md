# Modern Angular Router: Functional CanActivateFn, Resolvers & Lazy Routes

> **Kategori:** Angular | **Level:** Functional Routing, Interceptors & Hospital Capstone | **Minggu 8:** Modern Angular Router: Functional CanActivateFn, Resolvers & Lazy Routes

## Learning Objectives

- Migrate from verbose class-based guards to modern functional CanActivateFn primitives
- Deploy functional inject() directly inside guard predicates to resolve Router and Auth dependencies
- Execute safe navigational redirects utilizing immutable UrlTree (router.createUrlTree()) structures
- Configure component-level lazy loading deploying loadComponent: () => import(...) syntax
- Harden sensitive operating theater clinical routes through Role-Based Access Control (RBAC)

---

## Program: Hospital Clinical Navigation with Functional RBAC Route Guards

```typescript
// ============================================================================
// File: src/app/app.routes.ts (Router Fungsional Standalone Tanpa Modul)
// ============================================================================
import { Routes, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

// 1. Functional Route Guard (CanActivateFn Modern - Tidak perlu class CanActivate lama!)
export const clinicalAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('nusa_hospital_jwt');
  const userRole = localStorage.getItem('nusa_hospital_role'); // "DOKTER" | "PERAWAT" | "ADMIN"

  console.log(`[Clinical Guard] Memeriksa otorisasi menuju: ${state.url}`);

  if (!token) {
    // Pengguna belum login: Arahkan ke halaman login
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }

  // Periksa apakah rute membutuhkan peran dokter spesialis
  const requiredRole = route.data?.['requiredRole'];
  if (requiredRole && requiredRole !== userRole) {
    alert('Akses Terbatas: Halaman ini hanya dapat diakses oleh Dokter Spesialis.');
    return false; // Tolak navigasi
  }

  return true; // Izinkan navigasi
};

// 2. Konfigurasi Routes dengan Component-Level Lazy Loading
export const APP_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./views/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'dashboard',
    canActivate: [clinicalAuthGuard],
    loadComponent: () => import('./views/clinical-dashboard.component').then((m) => m.ClinicalDashboardComponent)
  },
  {
    path: 'kamar-operasi',
    canActivate: [clinicalAuthGuard],
    data: { requiredRole: 'DOKTER' },
    loadComponent: () => import('./views/operating-theater.component').then((m) => m.OperatingTheaterComponent)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadComponent: () => import('./views/not-found.component').then((m) => m.NotFoundComponent)
  }
];
```

---

## Key Concepts

### Deprecation of Class-Based Route Guards
Historically, establishing an Angular route guard mandated scaffolding a full `@Injectable()` class implementing the `CanActivate` interface with verbose dependency injection constructors.
In modern Angular:
**A Guard is a pure functional predicate typed as `CanActivateFn`**!
```typescript
export const myGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  return auth.isLoggedIn() ? true : inject(Router).createUrlTree(['/login']);
};
```
Concise, elegant, and effortlessly tested without mocking class hierarchies.

### Component-Level Lazy Loading via `loadComponent`
In standalone applications, `loadChildren` module mappings are obsolete.
Simply declare `loadComponent: () => import('./path').then(m => m.MyComponent)`.
The build pipeline bundles the view into an isolated JavaScript chunk loaded strictly upon route resolution.

---

---

## Beginner Friendly Explanation

### Analogy: Biometric Surgical Suite Access Locks
**Functional CanActivateFn** is a biometric thumbprint scanner on an operating suite threshold: you avoid stationing an administrative desk guard (*legacy class guards*), simply fastening a compact digital sensor to the door handle (*functional guard*). If an attending surgeon scans credentials (*valid role claims*), magnetic latches disengage green; uncredentialed scans lock doors securely.

## Experiments

- Navigate to /kamar-operasi unauthenticated to verify the guard returns an explicit login UrlTree.
- Set role to "PERAWAT" in localStorage observing the role-based rejection alert trigger.
- Inspect network activity verifying the operating theater chunk downloads strictly on link clicks.
- Explore functional CanDeactivateFn preventing clinicians from discarding unsaved medical records.

---

## Challenge

Author a functional `CanDeactivateFn` on patient forms triggering a confirmation prompt if uncommitted changes exist.

---

## Summary

You have mastered functional route guards, UrlTree redirects, and lazy loading. Next week, we examine Functional Interceptors and signal effect().
