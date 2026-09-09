# RxJS — Aliran Data Warung (angular.io)

> **Kategori:** Angular | **Level:** Menengah | **Minggu 9:** RxJS
> **Prasyarat:** Minggu 8 — **HttpClient**.

## Tujuan Pembelajaran

- `Observable` aliran, `of(1,2,3).pipe(map(x=>x*x)).subscribe(v=>...)` saring, `async` pipe `| async` di template (sumber: angular.io/guide/rx-library, rxjs.dev)

---

## Kenapa Ini Penting Buat Kamu?

Harga warung 100 item — tulis `for` manual 100x. Dengan `Observable` + `pipe(map)`, 1 baris saring semua `harga < 20000` tanpa `for`.

---

## Program: Aliran Harga Warung (angular.io)

```typescript
import { of } from "rxjs";
import { map, filter } from "rxjs/operators";

// Aliran harga
const harga$ = of(62000, 5000, 28000, 15000);

harga$.pipe(
  filter(h => h < 20000), // saring murah
  map(h => `Rp ${h}`)     // ubah jadi teks
).subscribe(teks => console.log(teks));
// Rp 5000
// Rp 15000

// Di Angular template: {{ harga$ | async }}
import { Component } from "@angular/core";
import { Observable, of } from "rxjs";

@Component({
  selector: "app-warung",
  template: `<div *ngFor="let h of harga$ | async">{{ h }}</div>`
})
export class WarungComponent {
  harga$ = of([62000, 5000]).pipe(map(arr => arr.filter(h => h < 20000)));
}
```

**Sumber:** `angular.io/guide/rx-library` — `Observable` + `pipe` + `subscribe`, `rxjs.dev/guide/operators` — `map`, `filter`.

---

## Konsep Kunci

### `Observable` + `pipe` + `subscribe` = Aliran + Saring + Dengar
`of(1,2,3).pipe(map(x=>x*x)).subscribe(v=> console.log(v))` → `1,4,9`.

### `async` pipe = Langganan di Template
`{{ harga$ | async }}` otomatis `subscribe` + `unsubscribe`.

---

## Penjelasan untuk Pemula

### Analogi: Aliran Air Warung

- **`Observable` = pipa air**: `of(62000,5000)` pipa dengan 2 tetes.
- **`pipe(map)` = saringan**: `filter(h=>h<20000)` saring murah.
- **`subscribe` = ember**: tangkap tetes yang lolos.

### Langkah 0 — Device

`ng new` + `ng serve` di `4200` (sudah W1) + `npm install rxjs` (sudah di Angular).

### Cara Komputer Membaca

1. `of(62000,5000).pipe(filter(h=>h<20000))` → buat aliran baru yang hanya `5000`.
2. `.subscribe(v=> console.log(v))` → ember tangkap `5000`.

### 3 Istilah Wajib

1. **Observable**: pipa aliran
2. **pipe/map/filter**: saringan
3. **subscribe/async**: ember/langganan template

---

## Eksperimen

- **Hijau:** `of(1,2,3).pipe(map(x=>x*2)).subscribe(console.log)` → `2,4,6`?
- **Kuning:** `filter(h=>h<20000)` ganti `>50000` → hanya `62000`?
- **Merah:** Lupa `subscribe` → tidak ada log? Tambah `subscribe`.

---

## Tantangan

**Warung Aliran Lengkap:** `of([62000,5000,28000]).pipe(map(arr=>arr.filter(h=>h<20000)), map(arr=>arr.map(h=>`Rp ${h}`))).subscribe(console.log)` → `["Rp 5000"]`.

---

## Glosarium Mini

- **Observable/pipe/subscribe**: pipa/saringan/ember

---

## Ringkasan

Minggu 9 dari 12: **Aliran** — `Observable` + `pipe`. Minggu depan: **State Management**.
