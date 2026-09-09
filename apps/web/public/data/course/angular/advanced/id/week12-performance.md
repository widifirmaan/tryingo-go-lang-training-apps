# Performance — Cepat Enterprise dengan OnPush (angular.dev)

> **Kategori:** Angular | **Level:** Lanjutan | **Minggu 12:** Performance
> **Prasyarat:** Minggu 11 — **Testing Angular**.

## Tujuan Pembelajaran

- `ChangeDetectionStrategy.OnPush` — hanya cek jika `Input` baru (referensi baru) atau `event` di dalam, bukan tiap detik (sumber: angular.dev/api/core/ChangeDetectionStrategy)
- `trackBy` untuk `*ngFor` agar tidak gambar ulang semua

---

## Kenapa Ini Penting Buat Kamu?

Warung 1000 produk tanpa `OnPush` → tiap klik, Angular cek 1000 komponen (lambat). Dengan `OnPush`, hanya cek yang `Input` baru — 10x lebih cepat (angular.dev).

---

## Program: Warung Cepat OnPush (angular.dev)

```typescript
import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-kartu",
  changeDetection: ChangeDetectionStrategy.OnPush, // hanya cek jika Input baru
  template: `<div>{{ nama }} - Rp{{ harga }}</div>`
})
export class KartuComponent {
  @Input() nama!: string;
  @Input() harga!: number;
}

// Daftar
@Component({
  selector: "app-daftar",
  template: `
    <div *ngFor="let p of daftar; trackBy: trackById">
      <app-kartu [nama]="p.nama" [harga]="p.harga"></app-kartu>
    </div>
  `
})
export class DaftarComponent {
  daftar = [{ id: 1, nama: "Beras", harga: 62000 }];
  trackById(index, item){ return item.id; }
}
```

**Aturan OnPush (angular.dev):** cek hanya jika `Input` referensi baru (bukan mutasi `daftar[0].harga = 0`), atau `event` di dalam. Mutasi langsung tidak terdeteksi — buat array baru `[...daftar]`.

**Sumber:** `angular.dev/api/core/ChangeDetectionStrategy` — `OnPush` `CheckOnce`.

---

## Konsep Kunci

### `OnPush` = Hanya Cek Jika Perlu
`Default` cek tiap detik, `OnPush` cek jika `Input` baru atau `event`.

### `trackBy` = KTP `*ngFor`
`trackById` biar `*ngFor` tidak gambar ulang semua saat 1 tambah.

---

## Penjelasan untuk Pemula

### Analogi: Satpam Hemat

- **`Default` = satpam cek 1000 kamar tiap detik** — capek.
- **`OnPush` = satpam cek hanya kamar yang ada tamu baru** — hemat.

### Langkah 0 — Device

`ng new` + `ng serve` di `4200` (sudah W1).

### Cara Komputer Membaca

1. `daftar = [...daftar, baru]` → referensi baru → `OnPush` cek.
2. `daftar[0].harga = 0` → referensi sama → `OnPush` tidak cek (salah).

### 3 Istilah Wajib

1. **OnPush**: cek hemat
2. **trackBy**: KTP list

---

## Eksperimen

- **Hijau:** `OnPush` + `daftar = [...daftar, baru]` → cek? Ya.
- **Kuning:** `daftar[0].harga = 0` mutasi → tidak cek? Buat baru.
- **Merah:** Lupa `trackBy` → `*ngFor` 1000 gambar ulang tiap tambah.

---

## Tantangan

**Warung Cepat Lengkap:** `KartuComponent` `OnPush` + `Daftar` `trackById` + `daftar = [...daftar, baru]` (bukan `push` mutasi), `ng serve` cek `Augury` tidak cek semua.

---

## Glosarium Mini

- **OnPush/trackBy**: hemat/KTP

---

## Ringkasan

Minggu 12 dari 14: **Cepat Enterprise** — `OnPush`. Minggu depan: **Capstone**.
