# Directives & Pipes — Saklar dan Saringan

> **Kategori:** Angular | **Level:** Pemula | **Minggu 2:** Directives & Pipes

## Tujuan Pembelajaran

- `*ngIf`, `*ngFor`, `[ngClass]`, `| currency` pipe saring harga

---

## Program

```html
<p *ngIf="total > 50000">Gratis ongkir!</p>
<li *ngFor="let p of daftar">{{ p.nama }} - {{ p.harga | currency:'IDR' }}</li>
<div [ngClass]="{ mahal: total > 50000 }">Total</div>
```

---

## Ringkasan

Minggu 2: **Saklar & Saringan** — `ngIf/ngFor` dan `pipe`.
