# State Management — Gudang Besar Angular (ngrx.io)

> **Kategori:** Angular | **Level:** Menengah | **Minggu 10:** State Management

## Tujuan Pembelajaran

- `@ngrx/component-store` gudang komponen — `store` + `updater` + `selector` + `dispatch` (sumber: ngrx.io/guide/component-store)

---

## Kenapa Ini Penting Buat Kamu?

Warung 10 komponen butuh `keranjang` — `props` estafet 5 level melelahkan. `ComponentStore` = gudang di tengah, semua ambil.

---

## Program: Gudang NgRx Warung (ngrx.io)

```bash
npm install @ngrx/component-store
```

```typescript
// keranjang.store.ts
import { ComponentStore } from "@ngrx/component-store";
import { Injectable } from "@angular/core";

interface KeranjangState { items: { nama: string }[]; }

@Injectable({ providedIn: "root" })
export class KeranjangStore extends ComponentStore<KeranjangState> {
  constructor(){ super({ items: [] }); }

  readonly items$ = this.select(state => state.items);
  readonly tambah = this.updater((state, item: { nama: string }) => ({
    items: [...state.items, item]
  }));
}

// component.ts
constructor(private store: KeranjangStore) {}
tambah(){ this.store.tambah({ nama: "Beras" }); }

// template.html
<button (click)="tambah()">Tambah Beras</button>
<div *ngFor="let i of store.items$ | async">{{ i.nama }}</div>
```

**Sumber:** `ngrx.io/guide/component-store` — `ComponentStore` + `select`/`updater`.

---

## Konsep Kunci

### `ComponentStore` = Gudang Komponen
`select` baca, `updater` ubah, `| async` di template.

---

## Penjelasan untuk Pemula

### Analogi: Gudang Besar

- **`ComponentStore` = gudang**: `tambah` masukkan, `items$` lihat.

### Langkah 0 — Device

`ng new` + `npm install @ngrx/component-store` + `ng serve` di `4200`.

### 3 Istilah Wajib

1. **Store/select/updater**: gudang/baca/ubah

---

## Tantangan

**Warung Gudang Lengkap:** `KeranjangStore` `items: {nama, harga}[]` + `tambah` + `hapus` `updater`, `items$ | async` tampil, `ng serve` cek.

---

## Glosarium Mini

- **ComponentStore**: gudang komponen

---

## Ringkasan

Minggu 10 dari 12: **Gudang Besar** — `ComponentStore`. Minggu depan: **Testing**.
