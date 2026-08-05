# Route Guards & Resolvers

> Angular | Pelajaran 13

## Tujuan Pembelajaran

- Membuat custom guard dengan CanActivate interface\n- Menggunakan guard untuk proteksi route\n- Menggunakan router.navigate untuk redirect\n- Memahami perbedaan guard types (CanActivate, CanDeactivate, Resolve)

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

## Penjelasan

## CanActivate
canActivate() — dipanggil sebelum route diaktifkan. Return true = izinkan navigasi. Return false = blokir navigasi. Bisa return Observable<boolean> atau Promise<boolean> untuk async check.
## CanDeactivate
canDeactivate() — dipanggil sebelum route ditinggalkan. Cocok untuk konfirmasi "Anda yakin ingin keluar?" jika ada perubahan yang belum disimpan.
## Resolve
resolve() — dipanggil sebelum route diaktifkan untuk mengambil data. Data tersedia di komponen via route.snapshot.data.
## Route Configuration
canActivate: [AuthGuard] — proteksi route. canDeactivate: [LeaveGuard] — konfirmasi sebelum leave. resolve: { data: DataResolver } — pre-fetch data.

---

## Eksperimen

1. **## CanActivate
canActivate() — dipanggil sebelum route diaktifkan. Return true = izinkan navigasi. Return false = blokir navigasi. Bisa return Observable<boolean> atau Promise<boolean> untuk async check.
## CanDeactivate
canDeactivate() — dipanggil sebelum route ditinggalkan. Cocok untuk konfirmasi "Anda yakin ingin keluar?" jika ada perubahan yang belum disimpan.
## Resolve
resolve() — dipanggil sebelum route diaktifkan untuk mengambil data. Data tersedia di komponen via route.snapshot.data.
## Route Configuration
canActivate: [AuthGuard] — proteksi route. canDeactivate: [LeaveGuard] — konfirmasi sebelum leave. resolve: { data: DataResolver } — pre-fetch data.**

---

## Tantangan

Tingkatkan route guards: (1) buat guard dengan role-based access (admin vs user), (2) buat guard dengan async check via Observable (cek token di API), (3) buat resolver yang fetch data dari API sebelum route diaktifkan, (4) implementasi CanDeactivate guard untuk form dengan unsaved changes confirmation.

---

## Ringkasan

CanActivate = proteksi route. CanDeactivate = konfirmasi leave. Resolve = pre-fetch data. Lanjut: state management.
