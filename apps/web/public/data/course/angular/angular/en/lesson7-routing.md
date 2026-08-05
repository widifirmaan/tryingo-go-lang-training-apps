# Routing & Navigation

> Angular | Lesson 7

## Learning Objectives

- Configure routes with Routes array\n- Use routerLink for navigation\n- Use router-outlet to display components\n- Use wildcard route for 404 handling

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

## Explanation

## Routes Configuration
Routes = array of route objects. path = URL path. component = component to render. redirectTo = redirect path. ** = wildcard (404).
## Navigation
routerLink="/about" — navigate to /about. routerLinkActive — add active class. routerLink with query params: routerLink="/about" [queryParams]="{page: 1}".
## Router Outlet
<router-outlet> — placeholder where route component is displayed. Each navigation replaces content in outlet.
## Lazy Loading
loadComponent: () => import('./about/about.component').then(m => m.AboutComponent) — load component on demand for better performance.

---

## Experiments

1. **## Routes Configuration
Routes = array of route objects. path = URL path. component = component to render. redirectTo = redirect path. ** = wildcard (404).
## Navigation
routerLink="/about" — navigate to /about. routerLinkActive — add active class. routerLink with query params: routerLink="/about" [queryParams]="{page: 1}".
## Router Outlet
<router-outlet> — placeholder where route component is displayed. Each navigation replaces content in outlet.
## Lazy Loading
loadComponent: () => import('./about/about.component').then(m => m.AboutComponent) — load component on demand for better performance.**

---

## Challenge

Level up routing: (1) add route parameter /detail/:id with ActivatedRoute, (2) add route guards (CanActivate) for page protection, (3) create nested routes with children, (4) implement lazy loading for each module.

---

## Summary

Routes = array config. routerLink = navigation. router-outlet = display. ** = wildcard. Next: HTTP client.
