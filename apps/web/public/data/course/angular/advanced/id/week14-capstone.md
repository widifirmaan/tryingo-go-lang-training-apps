# Capstone: Enterprise App

> **Kategori:** Angular | **Level:** Lanjutan | **Minggu 14:** Capstone: Enterprise App

## Tujuan Pembelajaran

- Menggabungkan semua konsep Angular
- Enterprise architecture: feature modules
- NgRx state management
- Role-based access control
- Production deployment

---

## Program: Capstone: Enterprise Resource Planning

Sistemintimeer enterprise: modul orders + clients + deployment.

```typescript
// main.ts — final architecture
 // lazy feature modules per domain

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
  { path: 'new',
    loadComponent: () => import('./new.component').then(m => m.NewComponent) },
  { path: ':id',
    loadComponent: () => import('./detail.component').then(m => m.DetailComponent),
    resolve: { order: orderResolver } },
];

// layout.shell with header nav, side menu, main VIEW
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MenuComponent],
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

## Konsep Kunci

### Domain modules

Satu feature module per domain (orders/reports/settings) menjaga skala enterprise.

### Resolver pre-loading

Data tersedia tepat saat komponen render: route resolve dulu, spinner tak menyala.

### Design tokens & theming

CSS variables + tema dark/light dari design system.

### Deployment

CDN caching, service worker (NGSW), analytics, dan error tracking.

---

## Eksperimen

- Tambah modul SLA berisi screen metrics.
- Benchmark initial load setelah lazy feature aktif.

---

## Tantangan

Tulis README sendiri: diagram arsitektur, setup, run, test, dan SOP deploy.

---

## Ringkasan

Materi minggu ini telah dibahas: Capstone: Enterprise Resource Planning. Lanjut ke pekan berikutnya untuk memperdalam.
