# Component Communication — Amplop Antar Cabang Angular

> **Kategori:** Angular | **Level:** Pemula | **Minggu 4:** Component Communication
> **Prasyarat:** Minggu 3 — **Services & DI**.

## Tujuan Pembelajaran

- `@Input()` amplop masuk (`nama="Beras"`, `[harga]="62000"`), `@Output() EventEmitter` bel keluar, `(beli)` telinga induk (sumber: angular.dev/guide/components/inputs-outputs)

---

## Kenapa Ini Penting Buat Kamu?

50 kartu produk jika semua di `App` → 500 baris. Dengan `KartuComponent` bata + `@Input`/`@Output`, `App` hanya `*ngFor` 3 baris. Tanpa `@Output`, tombol di anak tidak bisa tambah keranjang induk.

---

## Program: Kartu Berbel Angular

```typescript
// kartu.component.ts — bata
import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-kartu",
  template: `
    <div style="border: 1px solid #ddd; padding: 12px; border-radius: 8px;">
      <h3>{{ nama }}</h3>
      <p>Rp {{ harga }}</p>
      <button (click)="beli.emit(nama)">Beli</button>
      <ng-content></ng-content>
    </div>`
})
export class KartuComponent {
  @Input() nama!: string;   // amplop: nama="Beras"
  @Input() harga!: number;  // amplop: [harga]="62000"
  @Output() beli = new EventEmitter<string>(); // bel
}
```

```html
<!-- app.component.html — susun -->
<app-kartu *ngFor="let p of daftar"
  [nama]="p.nama" [harga]="p.harga"
  (beli)="tambah($event)">
  <small>Gratis ongkir &gt;100rb</small>
</app-kartu>
<p>Keranjang: {{ keranjang.join(", ") }}</p>
```

```typescript
// app.component.ts
daftar = [{ nama: "Beras", harga: 62000 }];
keranjang: string[] = [];
tambah(nama: string) { this.keranjang.push(nama); }
```

---

## Konsep Kunci

### `@Input()` = Amplop Masuk
`nama="Beras"` (teks) vs `[harga]="62000"` (ekspresi, tanpa `[]` jadi string `"62000"`!).

### `@Output()` + `EventEmitter` = Bel Keluar
`beli.emit(nama)` tekan → induk `(beli)="tambah($event)"` dengar, `$event` = nama.

### `<ng-content>` = Lubang
Isi di dalam `<app-kartu>...</app-kartu>` tampil di `<ng-content>`.

---

## Penjelasan untuk Pemula

### Analogi: Bata Bertulis & Bel
- **@Input = tulisan di bata**, **@Output = bel pintu**, **ng-content = kotak kosong**.

### Langkah 0 — Siapkan Device
- Sama W1: `ng generate component kartu` (CLI buatkan 4 file!).

### Cara Komputer Membaca
1. `[nama]="p.nama"` → isi `@Input() nama`.
2. Klik → `beli.emit("Beras")` → `tambah("Beras")`.

### 3 Istilah Wajib
1. **Input/Output**: masuk/keluar
2. **EventEmitter/$event**: bel/isi bel
3. **ng-content**: lubang

---

## Eksperimen

- **Hijau:** `nama="Beras"` vs `[nama]="'Beras'"` → sama? `harga="62000"` (tanpa []) → string?
- **Kuning:** `beli.emit({ nama, harga })` objek → `$event.nama`?
- **Merah:** Anak `this.nama = "X"` langsung → jalan tapi sesat (sumber kebenaran ganda)! Kirim event saja.

---

## Tantangan

**Warung Bata Lengkap:** `Kartu` (`@Input` + `@Output` + `ng-content`) + `App` (`*ngFor` 4 + `keranjang`).

---

## Glosarium Mini

- **Input/Output/ng-content**: masuk/keluar/lubang
- **EventEmitter/$event**: bel/isi

---

## Ringkasan

Minggu 4 dari 5: **Amplop Antar Cabang** (Level: Pemula). Bagi & lapor. Minggu depan: **Forms** — formulir 2 arah.
