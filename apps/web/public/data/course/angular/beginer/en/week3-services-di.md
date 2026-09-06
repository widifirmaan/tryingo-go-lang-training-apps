# Services & DI — Gudang Bersama Warung Angular

> **Kategori:** Angular | **Level:** Pemula | **Minggu 3:** Services & DI

## Tujuan Pembelajaran

- `@Injectable({ providedIn: 'root' })` gudang 1 untuk semua (sumber: angular.dev/guide/di)
- `constructor(private produkService: ProdukService)` suntik, `ngOnInit` ambil saat buka

---

## Kenapa Ini Penting Buat Kamu?

10 komponen butuh `daftar` produk — tulis array di 10 file? Ubah harga → ubah 10x, lupa 1 = beda. Dengan `ProdukService` 1 gudang, semua suntik yang sama.

---

## Program: Gudang Produk Angular

```typescript
// produk.service.ts — gudang (1 untuk semua)
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' }) // root = 1 di seluruh app
export class ProdukService {
  private daftar = [
    { nama: "Beras", harga: 62000 },
    { nama: "Bayam", harga: 5000 },
  ];
  getAll() { return this.daftar; }
  tambah(p: any) { this.daftar.push(p); }
}
```

```typescript
// kartu.component.ts — suntik gudang
import { Component, OnInit } from "@angular/core";
import { ProdukService } from "./produk.service";

@Component({ selector: "app-kartu", template: `<ul><li *ngFor="let p of daftar">{{ p.nama }}</li></ul>` })
export class KartuComponent implements OnInit {
  daftar: any[] = [];
  constructor(private produkService: ProdukService) {} // suntik!
  ngOnInit() { this.daftar = this.produkService.getAll(); }
}
```

---

## Konsep Kunci

### `@Injectable({ providedIn: 'root' })` = Gudang Sentral
Angular buatkan 1 instance untuk semua yang suntik.

### Constructor Inject = Suntik Otomatis
`constructor(private s: ProdukService)` → Angular isi otomatis. Jangan `new ProdukService()` manual (jadi 2 gudang beda!).

### `ngOnInit` = Saat Buka
Jalan sekali setelah komponen jadi — tempat ambil data awal.

---

## Penjelasan untuk Pemula

### Analogi: Gudang Sentral Mal
- **Service = gudang**: 10 toko ambil stok sama.
- **Inject = pipa**: tiap toko pasang pipa ke gudang.
- **`new` manual = gudang palsu**: tiap toko punya gudang sendiri-sendiri (sesat!).

### Langkah 0 — Siapkan Device
- Sama W1: `ng generate service produk` (CLI buatkan file + test!).

### Cara Komputer Membaca
1. Start → baca `providedIn: 'root'` → buat 1 `ProdukService`.
2. `KartuComponent` minta `ProdukService` → beri yang sama.

### 3 Istilah Wajib
1. **Service/Injectable**: gudang/kartu
2. **Inject/DI**: suntik otomatis
3. **ngOnInit**: saat buka

---

## Eksperimen

- **Hijau:** 2 komponen suntik service + 1 `tambah` → keduanya lihat?
- **Kuning:** `new ProdukService()` manual di 2 komponen → tambah di 1, yang lain tidak ikut? (Itulah kenapa inject!)
- **Merah:** Hapus `providedIn` → error `No provider`? Pasang lagi.

---

## Tantangan

**Mal 2 Toko:** `ProdukService` + `KartuComponent` (tampil) + `TambahComponent` (form tambah) → tambah di 1, tampil di 2 tanpa refresh.

---

## Glosarium Mini

- **Service/Inject/OnInit**: gudang/suntik/buka

---

## Ringkasan

Minggu 3 dari 5: **Gudang Bersama** (Level: Pemula). 1 data untuk semua. Minggu depan: **Communication** — amplop antar cabang.
