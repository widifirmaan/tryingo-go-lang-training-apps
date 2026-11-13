# Capstone: Enterprise App

## Learning Objectives

- Combine all Angular concepts
- Enterprise architecture: feature modules
- NgRx state management
- Role-based access control
- Production deployment

---

## Program: Capstone: Enterprise Resource Planning

An enterprise system: orders + clients + deployment.

```typescript
// main.ts - final architecture with lazy features

const routes: Routes = [
  { path: '', component: LayoutComponent, canActivate: [authGuard],
    children: [
      { path: 'orders',  loadChildren: () => import('./orders/orders.routes').then(m => m.routes) },
      { path: 'reports', loadChildren: () => import('./reports/reports.routes').then(m => m.routes) },
      { path: 'settings', loadChildren: () => import('./settings/settings.routes').then(m => m.routes) },
    ] },
];

// orders.routes.ts
export const routes: Routes = [
  { path: '', data: { title: 'Orders list' },
    loadComponent: () => import('./list.component').then(m => m.ListComponent),
    resolve: { orders: ordersResolver } },
  { path: 'new', loadComponent: () => import('./new.component').then(m => m.NewComponent) },
  { path: ':id',
    loadComponent: () => import('./detail.component').then(m => m.DetailComponent),
    resolve: { order: orderResolver } },
];

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/orders" routerLinkActive="active">Orders</a>
      <a routerLink="/reports" routerLinkActive="active">Reports</a>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class LayoutComponent {}
```

---

## Key Concepts

### Domain modules

Satu feature module per domain (orders/reports/settings) menjaga skala enterprise.

### Resolver pre-loading

Data tersedia tepat saat komponen render: route resolve dulu, spinner tak menyala.

### Design tokens & theming

CSS variables + tema dark/light dari design system.

### Deployment

CDN caching, service worker (NGSW), analytics, dan error tracking.

---

## Experiments

- Add metrics/SLA to feature modules
- Benchmark initial load after lazy stacking

---

## Challenge

Write the README: architecture diagram, setup, run, test, deploy SOP.

---

## Summary

This week's material has been covered: Capstone: Enterprise Resource Planning. Continue to the following week to deepen.
