# Directives & Pipes — Saklar dan Saringan Warung Angular

> **Kategori:** Angular | **Level:** Pemula | **Minggu 2:** Directives & Pipes
> **Prasyarat:** Minggu 1 — **Components & Templates**.

## Tujuan Pembelajaran

- `*ngIf` saklar tampil, `*ngFor` fotokopi daftar, `[ngClass]` baju dinamis, `| currency:'IDR'` saring harga (sumber: angular.dev/guide/directives + pipes)

---

## Kenapa Ini Penting Buat Kamu?

Tanpa `*ngIf`, tombol "Beli" tampil meski stok 0 → pelanggan kecewa. Tanpa `*ngFor`, tulis 30 `<li>` manual. Tanpa `| currency`, `62000` tampil mentah (bukan `Rp62.000`).

---

## Program: Etalase Saklar Warung

```typescript
// kartu.component.ts
import { Component } from "@angular/core";
@Component({
  selector: "app-kartu",
  templateUrl: "./kartu.component.html"
})
export class KartuComponent {
  total = 75000;
  daftar = [
    { nama: "Beras", harga: 62000 },
    { nama: "Bayam", harga: 5000 },
  ];
}
```

```html
<!-- kartu.component.html -->
<p *ngIf="total > 50000; else bayarOngkir" style="color: green;">Gratis ongkir!</p>
<ng-template #bayarOngkir><p>Belanja lagi untuk gratis ongkir</p></ng-template>

<ul>
  <li *ngFor="let p of daftar; let i = index">
    {{ i + 1 }}. {{ p.nama }} - {{ p.harga | currency:'IDR':'symbol':'1.0-0' }}
  </li>
</ul>

<div [ngClass]="{ mahal: total > 50000, murah: total <= 50000 }">
  Total: {{ total | currency:'IDR' }}
</div>
```

---

## Konsep Kunci

### `*ngIf` + `else` = Saklar
`*ngIf="total > 50000"` tampil jika ya. `else bayarOngkir` + `<ng-template #bayarOngkir>` jika tidak. (`*` = structural, ubah DOM.)

> **Catatan versi (riset 2026):** `*ngIf`/`*ngFor` masih jalan penuh, tapi sejak Angular 20 statusnya **deprecated** — gaya modernnya `@if (total > 50000) { ... } @else { ... }` dan `@for (p of daftar; track p.id) { ... }`. Kuasai `*ngIf` dulu (masih ada di jutaan kode lama), lalu pelajari `@if` sebagai langkah berikut.

### `*ngFor` = Fotokopi
`*ngFor="let p of daftar; let i = index"` → `p` barang, `i` nomor 0,1,2.

### `| currency` = Saringan Uang
`{{ 62000 | currency:'IDR':'symbol':'1.0-0' }}` → `Rp62.000`.

### `[ngClass]` = Baju Dinamis
`[ngClass]="{ mahal: total > 50000 }"` → class `mahal` jika benar.

---

## Penjelasan untuk Pemula

### Analogi: Saklar Lampu & Mesin Fotokopi
- **`*ngIf` = saklar**: total >50rb → lampu hijau nyala.
- **`*ngFor` = fotokopi**: 1 template `<li>`, fotokopi per barang.

### Langkah 0 — Siapkan Device
- Sama W1: `ng serve` di `4200`.

### Cara Komputer Membaca
1. `*ngIf="total > 50000"` → true → tampil `<p>`, `else` disembunyikan (komentar DOM).
2. `*ngFor` → loop `daftar`, tiap `p` buat `<li>`.

### 3 Istilah Wajib
1. **Directive `*`/`[]`**: saklar struktural/atribut
2. **Pipe `|`**: saringan tampil
3. **ng-template**: cetakan cadangan

---

## Eksperimen

- **Hijau:** `total = 30000` → tampil yang mana?
- **Kuning:** `currency:'USD'` → `$62,000.00`?
- **Merah:** Lupa `*` tulis `ngIf=` saja → error `Can't bind`? Tambah `*`.

---

## Tantangan

**Etalase Saklar Lengkap:** `*ngIf` gratis-ongkir + `else`, `*ngFor` 5 produk + `index`, `| currency:'IDR'`, `[ngClass]` mahal/murah.
- **Sambungan (Minggu 1 — Components & Templates):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **ngIf/ngFor/ngClass**: saklar/fotokopi/baju
- **Pipe currency**: saring uang
- **ng-template**: cadangan

---

## Ringkasan

Minggu 2 dari 5: **Saklar & Saringan** (Level: Pemula). Tampil cerdas + uang rapi. Minggu depan: **Services** — gudang bersama.
