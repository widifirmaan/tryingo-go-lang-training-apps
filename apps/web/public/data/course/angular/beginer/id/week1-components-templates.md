# Components & Templates — Cabang Warung Enterprise

> **Kategori:** Angular | **Level:** Pemula | **Minggu 1:** Components & Templates

## Tujuan Pembelajaran

- Instal `npm install -g @angular/cli`, `ng new warung-angular`, `ng serve` di `4200`
- Paham Angular = **warung enterprise**: banyak aturan, tapi rapi untuk 100 cabang — butuh `TypeScript` dulu
- `component` = toko, `template` = etalase `{{ nama }}`, `selector: 'app-kartu'`

---

## Kenapa Ini Penting Buat Kamu?

Angular untuk perusahaan besar: jika warung mau jadi minimarket 100 cabang, butuh aturan ketat (TypeScript, DI) — tidak untuk warung 1 cabang (pakai Vue/React saja). Jika tetap mau, ini gerbangnya — **butuh 3 bulan JS+TS dulu**.

---

## Program: Kartu Angular

```bash
npx @angular/cli new warung-angular --style=css --routing
cd warung-angular
ng serve
# Buka http://localhost:4200
```

```typescript
// src/app/kartu/kartu.component.ts
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-kartu',
  template: `<div style="border: 1px solid #ddd; padding: 12px;">
    <h3>{{ nama }}</h3><p>Rp {{ harga }}</p>
    <button (click)="beli.emit(nama)">Beli</button>
  </div>`
})
export class KartuComponent {
  @Input() nama!: string;
  @Input() harga!: number;
}
```

Gunakan di `app.component.html`: `<app-kartu nama="Beras" [harga]="62000"></app-kartu>`

---

## Konsep Kunci

### `ng new` + `ng serve`
Buat gedung enterprise, jalan di `4200`.

### `@Component` + `{{ }}`
`selector` nama tag, `template` HTML dengan `{{ nama }}`.

---

## Ringkasan

Minggu 1: **Enterprise Component** — butuh TS, untuk skala besar. Minggu depan: **Directives & Pipes**.
