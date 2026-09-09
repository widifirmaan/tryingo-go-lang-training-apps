# Advanced Patterns — Pola Enterprise Lazy (angular.dev)

> **Kategori:** Angular | **Level:** Lanjutan | **Minggu 13:** Advanced Patterns
> **Prasyarat:** Minggu 12 — **Performance**.

## Tujuan Pembelajaran

- `loadComponent: () => import('./admin/admin.component')` muat lambat, `loadChildren` muat anak (sumber: angular.dev/guide/routing/loading-strategies)

---

## Kenapa Ini Penting Buat Kamu?

Warung admin jarang dibuka — tanpa lazy, `admin` 500KB ikut di `Beranda` → lambat. Dengan `loadComponent`, `admin` jadi chunk terpisah, hanya di-load saat `/admin`.

---

## Program: Pola Lazy Warung (angular.dev)

```typescript
import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", loadComponent: () => import("./beranda/beranda.component").then(m => m.BerandaComponent) }, // eager untuk landing
  {
    path: "admin",
    loadComponent: () => import("./admin/admin.component").then(m => m.AdminComponent),
    loadChildren: () => import("./admin/admin.routes").then(m => m.routes)
  },
  {
    path: "dashboard",
    loadComponent: () => {
      // injection context: bisa inject FeatureFlags
      const flags = inject(FeatureFlags);
      return flags.isPremium
        ? import("./dashboard/premium-dashboard")
        : import("./dashboard/basic-dashboard");
    }
  }
];
```

**Sumber:** `angular.dev/guide/routing/loading-strategies` — `loadComponent`/`loadChildren` lazy.

---

## Konsep Kunci

### `loadComponent` vs `loadChildren` = Muat Lambat
`loadComponent` muat 1 komponen, `loadChildren` muat anak routes — jadi chunk terpisah.

### Eager vs Lazy
Landing `Beranda` eager, `admin` lazy — `ng serve` `chunk` terpisah di `Network`.

---

## Penjelasan untuk Pemula

### Analogi: Gudang Warung

- **`loadComponent` = buka gudang saat perlu**: `admin` di gudang, buka hanya saat `admin` dikunjungi.

### Langkah 0 — Device

`ng new` + `ng serve` di `4200` (sudah W1).

### 3 Istilah Wajib

1. **loadComponent/loadChildren**: muat lambat
2. **chunk**: potongan JS

---

## Eksperimen

- **Hijau:** Jalankan apa adanya, lalu ubah nilai `flags` → output ikut berubah?
- **Kuning:** Ubah huruf besar-kecil `flags` → masih jalan atau error?
- **Merah:** Hapus baris `import { Routes } from "@angular/router";` → error apa? Pasang lagi.

## Tantangan

**Warung Lazy Lengkap:** `Beranda` eager, `admin` `loadComponent`, `admin` anak `loadChildren`, `Network` cek chunk `admin` hanya saat `/admin`.
- **Sambungan (Minggu 12 — Performance):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **loadComponent/loadChildren/chunk**: muat/muat anak/potongan

---

## Ringkasan

Minggu 13 dari 14: **Pola Lazy** — `loadComponent`. Minggu depan: **Capstone**.
