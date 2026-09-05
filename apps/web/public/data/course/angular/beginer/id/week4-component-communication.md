# Component Communication — Amplop Antar Cabang

> **Kategori:** Angular | **Level:** Pemula | **Minggu 4:** Component Communication

## Tujuan Pembelajaran

- `@Input()` amplop masuk, `@Output() EventEmitter` lapor balik, `{{ }}` tampil

---

## Program: Kartu Angular

```typescript
// kartu.component.ts
@Component({ selector: "app-kartu", template: `<div><h3>{{ nama }}</h3><button (click)="beli.emit(nama)">Beli</button></div>` })
export class KartuComponent {
  @Input() nama!: string;
  @Input() harga!: number;
  @Output() beli = new EventEmitter<string>();
}

// app.component.html
<app-kartu nama="Beras" [harga]="62000" (beli)="tambah($event)"></app-kartu>
```

---

## Ringkasan

Minggu 4: **Amplop Antar Cabang** — `@Input`/`@Output`.
