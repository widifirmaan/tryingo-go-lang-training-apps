# Route Guards & Resolvers

> Angular | Lesson 13

## Learning Objectives

- Create custom guard with CanActivate interface\n- Use guard for route protection\n- Use router.navigate for redirect\n- Understand guard types (CanActivate, CanDeactivate, Resolve)

---

## Program: Angular

```typescript
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isLoggedIn = localStorage.getItem('token') !== null;
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

```

---

## Explanation

## CanActivate
canActivate() — called before route is activated. Return true = allow navigation. Return false = block navigation. Can return Observable<boolean> or Promise<boolean> for async check.
## CanDeactivate
canDeactivate() — called before route is left. Good for "Are you sure you want to leave?" confirmation if there are unsaved changes.
## Resolve
resolve() — called before route is activated to fetch data. Data available in component via route.snapshot.data.
## Route Configuration
canActivate: [AuthGuard] — protect route. canDeactivate: [LeaveGuard] — confirm before leaving. resolve: { data: DataResolver } — pre-fetch data.

---

## Experiments

1. **## CanActivate
canActivate() — called before route is activated. Return true = allow navigation. Return false = block navigation. Can return Observable<boolean> or Promise<boolean> for async check.
## CanDeactivate
canDeactivate() — called before route is left. Good for "Are you sure you want to leave?" confirmation if there are unsaved changes.
## Resolve
resolve() — called before route is activated to fetch data. Data available in component via route.snapshot.data.
## Route Configuration
canActivate: [AuthGuard] — protect route. canDeactivate: [LeaveGuard] — confirm before leaving. resolve: { data: DataResolver } — pre-fetch data.**

---

## Challenge

Level up route guards: (1) create guard with role-based access (admin vs user), (2) create guard with async check via Observable (check token via API), (3) create resolver that fetches data from API before route activation, (4) implement CanDeactivate guard for form with unsaved changes confirmation.

---

## Summary

CanActivate = route protection. CanDeactivate = leave confirmation. Resolve = pre-fetch data. Next: state management.
