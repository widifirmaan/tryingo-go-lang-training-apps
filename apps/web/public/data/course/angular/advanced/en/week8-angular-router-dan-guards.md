# Modern Angular Router: Functional CanActivateFn, Resolvers & Lazy Routes

> **Kategori:** Angular | **Level:** Functional Routing, Interceptors & Hospital Capstone | **Minggu 8:** Modern Angular Router: Functional CanActivateFn, Resolvers & Lazy Routes
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


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

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `const / let variables`
- **Core Functionality:** Modern block-scoped variable declarations.
- **Parameters / Attributes:** `Identifier, Initial Value`.
- **System Behavior & Return:** `const` defines immutable references; `let` defines reassignable state variables bounded to enclosing blocks.
- **Practical Code Example:**
```javascript
const title = 'Tryngo Learning';
let counter = 0;
counter += 1;
console.log(title, counter);
```
- **Expected Execution Output:**
```text
Tryngo Learning 1
```

### 2. `() => { ... } (Arrow Function)`
- **Core Functionality:** Compact function expression with lexical 'this'.
- **Parameters / Attributes:** `Parameters, Function Body`.
- **System Behavior & Return:** Provides concise function syntax while retaining the lexical `this` binding of the outer enclosing scope.
- **Practical Code Example:**
```javascript
const double = (n) => n * 2;
console.log(double(21));
```
- **Expected Execution Output:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Core Functionality:** Linear asynchronous Promise resolution.
- **Parameters / Attributes:** `URL string, RequestInit options`.
- **System Behavior & Return:** Author asynchronous asynchronous workflows sequentially without callback pyramids.
- **Practical Code Example:**
```javascript
async function getUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return await res.json();
}
```
- **Expected Execution Output:**
```text
Returns resolved JSON object from server
```

### 4. `Array.prototype.map() / filter()`
- **Core Functionality:** Pure functional array transformation.
- **Parameters / Attributes:** `callback(item, index, array)`.
- **System Behavior & Return:** `map` returns transformed values; `filter` removes non-matching elements without mutating the original array.
- **Practical Code Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);
```
- **Expected Execution Output:**
```text
[2, 4]
```


---

## Common Pitfalls & Debugging Tips

### 1. RxJS Subscription Memory Leaks
- **Symptom / Issue:** Subscriptions lingering after component destruction cause memory bloat and duplicate work.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use `takeUntilDestroyed()` or resolve observables directly via the template `async` pipe.

### 2. Suboptimal Default Change Detection
- **Symptom / Issue:** Forces Angular to verify every single component on every browser event.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Switch to `ChangeDetectionStrategy.OnPush` and adopt Angular Signals.

### 3. Bloated Shared Modules
- **Symptom / Issue:** Impairs code splitting and inflates initial JavaScript bundle size.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Adopt Standalone Components and import only specific directives into the `imports: []` array.

---

## Summary

You have mastered functional route guards, UrlTree redirects, and lazy loading. Next week, we examine Functional Interceptors and signal effect().
