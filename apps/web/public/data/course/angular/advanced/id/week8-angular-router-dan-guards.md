# Angular Router Modern: Functional CanActivateFn, Resolvers & Lazy Routes

> **Kategori:** Angular | **Level:** Routing Fungsional, Interceptors & Capstone RS | **Minggu 8:** Angular Router Modern: Functional CanActivateFn, Resolvers & Lazy Routes
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami migrasi dari class-based guards yang bertele-tele ke Functional CanActivateFn modern
- Menggunakan inject() langsung di dalam fungsi guard untuk mengakses Router dan AuthService
- Menerapkan pengalihan rute aman menggunakan UrlTree (router.createUrlTree())
- Mengonfigurasi Lazy Loading komponen menggunakan sintaks loadComponent: () => import(...)
- Mengamankan rute bedah sensitif berbasis peran pengguna (Role-Based Access Control - RBAC)

---

## Program: Sistem Navigasi Rumah Sakit dengan Proteksi Peran Medis (RBAC)

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

## Konsep Kunci

### Kematian Class-Based Guards di Angular
Di Angular versi lama, membuat route guard mewajibkan pembuatan file class dengan dekorator `@Injectable()` dan implementasi interface `canActivate(route, state): boolean`.
Di Angular modern:
**Guard adalah fungsi JavaScript murni bertipe `CanActivateFn`**!
```typescript
export const myGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  return auth.isLoggedIn() ? true : inject(Router).createUrlTree(['/login']);
};
```
Sangat ringkas, mudah dibaca, dan mudah di-unit test tanpa mock class kompleks.

### `loadComponent` untuk Pemecahan Bundel Sempurna
Dengan Standalone Components, Anda tidak lagi menggunakan `loadChildren` untuk memuat modul.
Cukup tulis `loadComponent: () => import('./path').then(m => m.Component)`.
Vite / Webpack akan memecah file tersebut menjadi chunk terisolasi yang hanya diunduh saat pengguna mengunjungi URL tersebut.

---

---

## Penjelasan untuk Pemula

### Analogi: Pintu Ruang Operasi Ber-Kunci Biometrik
**Functional CanActivateFn** seperti pemindai sidik jari di depan pintu ruang operasi bedah: Anda tidak perlu mendirikan pos satpam fisik (*class guard lama*). Cukup pasang sensor pemindai digital kecil di gagang pintu (*functional guard*). Jika dokter spesialis menempelkan jempol (*token & role valid*), pintu otomatis terbuka hijau; jika bukan dokter, pintu mengunci merah.

## Eksperimen

- Coba buka rute /kamar-operasi tanpa login dan verifikasi bahwa guard mengembalikan UrlTree ke halaman /login.
- Setel peran ke "PERAWAT" di localStorage dan coba akses rute dokter spesialis untuk melihat blokir hak akses.
- Buka Network Tab di DevTools dan buktikan file operating-theater.component.js baru diunduh saat link diklik.
- Pelajari functional CanDeactivateFn untuk mencegah dokter menutup halaman rekam medis yang belum disimpan.

---

## Tantangan

Implementasikan functional `CanDeactivateFn` pada formulir pasien yang memunculkan konfirmasi dialog "Perubahan rekam medis belum disimpan, yakin ingin keluar?" jika formulir masih dalam keadaan dirty.

---

## Model Mental & Diagram Alur Visual

```diagram
┌──────────────────────────────────────────────────────────┐
│ ARSITEKTUR KOMPONEN ANGULAR                              │
│                                                          │
│  @Component({ standalone: true })                        │
│       │                                                  │
│  Template HTML ◄── [Property Binding] ── Signals (State) │
│       │                                                  │
│  User Action   ─── (Event Binding)   ──► Method Callback │
│       │                                                  │
│  Dependency Injection: Injeksi Service via inject()      │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `count = signal(0)`
- **Fungsi Utama:** State reaktif Angular Signals.
- **Parameter / Atribut:** `initialValue`.
- **Perilaku & Efek Sistem:** Menyediakan variabel sinyal reaktif granular yang memicu deteksi perubahan performa tinggi..
- **Contoh Penggunaan Praktis:**
```typescript
import { signal } from '@angular/core';
export class CounterComponent {
  count = signal(0);
  inc() { this.count.update(n => n + 1); }
}
```
- **Hasil Output yang Diharapkan:**
```output
Komponen Angular merender sinyal reaktif
```

### 2. `double = computed(() => this.count() * 2)`
- **Fungsi Utama:** Sinyal komputasi memoized.
- **Parameter / Atribut:** `Compute Callback`.
- **Perilaku & Efek Sistem:** Menghitung nilai turunan otomatis dengan cache pintar tanpa re-evaluasi redundan..
- **Contoh Penggunaan Praktis:**
```typescript
import { signal, computed } from '@angular/core';
count = signal(10);
double = computed(() => this.count() * 2);
```
- **Hasil Output yang Diharapkan:**
```output
double() mengembalikan nilai 20
```

### 3. `@Component({ standalone: true, ... })`
- **Fungsi Utama:** Deklarasi Komponen Standalone Modern.
- **Parameter / Atribut:** `Selector, Imports, Template`.
- **Perilaku & Efek Sistem:** Mendefinisikan komponen modular mandiri tanpa memerlukan NgModules yang rumit..
- **Contoh Penggunaan Praktis:**
```typescript
@Component({
  selector: 'app-user',
  standalone: true,
  template: `<h2>{{ title() }}</h2>`
})
export class UserComponent {}
```
- **Hasil Output yang Diharapkan:**
```output
Komponen siap dirender di aplikasi Angular
```

### 4. `inject(HttpClient)`
- **Fungsi Utama:** Injeksi dependensi fungsional.
- **Parameter / Atribut:** `Service Token`.
- **Perilaku & Efek Sistem:** Mengambil instance service dependensi secara fungsional tanpa constructor boilerplate..
- **Contoh Penggunaan Praktis:**
```typescript
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
private http = inject(HttpClient);
```
- **Hasil Output yang Diharapkan:**
```output
Service HttpClient siap digunakan untuk pemanggilan API
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Memory Leak pada RxJS Subscription
- **Gejala / Masalah:** Subscription yang tetap aktif setelah komponen hancur memboroskan memori dan memicu callback ganda.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan operator `takeUntilDestroyed()` atau manfaatkan pipe `async` di template HTML.

### 2. ChangeDetectionStrategy Default yang Boros Performa
- **Gejala / Masalah:** Angular memeriksa seluruh pohon komponen pada setiap event browser.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Terapkan `ChangeDetectionStrategy.OnPush` dan gunakan Angular Signals untuk update granular.

### 3. Mengimpor Seluruh Shared Module di Standalone Component
- **Gejala / Masalah:** Ukuran bundle JavaScript aplikasi membengkak drastis.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Hanya import modul atau standalone directive yang benar-benar digunakan di array `imports: []`.

---

## Ringkasan

Kamu telah menguasai functional route guards, UrlTree redirects, dan loadComponent lazy loading. Minggu depan kita mempelajari Functional Interceptors dan sinyal effect().
