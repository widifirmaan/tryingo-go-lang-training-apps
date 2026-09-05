# Template Forms — Formulir Warung Angular

> **Kategori:** Angular | **Level:** Pemula | **Minggu 5:** Template Forms

## Tujuan Pembelajaran

- `FormsModule`, `[(ngModel)]` 2 arah, `required` validasi

---

## Program

```html
<form #f="ngForm" (ngSubmit)="tambah()">
  <input name="nama" [(ngModel)]="nama" required placeholder="Nama" />
  <input name="harga" [(ngModel)]="harga" type="number" required />
  <button [disabled]="f.invalid">Tambah</button>
</form>
```

```typescript
nama = ""; harga = 0;
tambah(){ console.log(this.nama, this.harga); }
```

---

## Ringkasan

Minggu 5: **Formulir Warung** — `ngModel` + `required`.
