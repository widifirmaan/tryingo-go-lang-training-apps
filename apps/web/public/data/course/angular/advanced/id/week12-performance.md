# Performance Angular — Cepat Enterprise

> **Kategori:** Angular | **Level:** Lanjutan | **Minggu 12:** Performance

## Tujuan Pembelajaran

- `OnPush` + `trackBy` — jangan gambar ulang jika sama

---

## Program

```typescript
@Component({
  selector: "app-kartu",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div>{{ nama }}</div>`
})
export class KartuComponent {
  @Input() nama!: string;
  trackById(index, item){ return item.id; }
}
```

`<div *ngFor="let p of daftar; trackBy: trackById">`.

---

## Ringkasan

Minggu 12: **Cepat** — `OnPush` + `trackBy`.
