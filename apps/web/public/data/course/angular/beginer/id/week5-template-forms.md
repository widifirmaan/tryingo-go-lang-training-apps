# Template Forms — Formulir 2 Arah Warung Angular

> **Kategori:** Angular | **Level:** Pemula | **Minggu 5:** Template Forms
> **Prasyarat:** Minggu 4 — **Component Communication**.

## Tujuan Pembelajaran

- `FormsModule` + `[(ngModel)]` tali 2 arah + `name` wajib + `#f="ngForm"` + `required` (sumber: angular.dev/guide/forms/template-driven-forms)

---

## Kenapa Ini Penting Buat Kamu?

Tanpa `ngModel`, ambil input manual `document.getElementById` (jadul). Dengan `[(ngModel)]`, ketik ↔ variabel otomatis + tombol mati jika `f.invalid` (tidak perlu `if` cek kosong).

---

## Program: Form Tambah Warung

```typescript
// app.module.ts (atau imports jika standalone)
import { FormsModule } from "@angular/forms";
// imports: [FormsModule]
```

```html
<form #f="ngForm" (ngSubmit)="tambah()">
  <input name="nama" [(ngModel)]="nama" required placeholder="Nama" />
  <input name="harga" [(ngModel)]="harga" type="number" required min="1" />
  <button [disabled]="f.invalid">Tambah</button>
</form>
<p>Nilai: {{ nama }} - {{ harga }}</p>
```

```typescript
nama = "";
harga = 0;
tambah() { console.log(this.nama, this.harga); this.nama = ""; }
```

---

## Konsep Kunci

### `[(ngModel)]` = Tali 2 Arah (Banana in a Box)
`[ngModel]` tampil + `(ngModelChange)` update = `[()]`. Ketik ↔ variabel.

### `name` + `#f="ngForm"` = Syarat & Wasit
`ngModel` wajib di dalam `form` + punya `name`. `#f="ngForm"` wasit: `f.invalid` jika ada `required` kosong.

### `[disabled]="f.invalid"` = Tombol Pintar
Mati otomatis jika form cacat.

---

## Penjelasan untuk Pemula

### Analogi: Formulir Karbon
- **`ngModel` = kertas karbon**: tulis di input, tembus ke variabel (dan sebaliknya).

### Langkah 0 — Siapkan Device
- Sama W1 + `FormsModule` di `imports` (lupa = error `Can't bind to 'ngModel'`).

### Cara Komputer Membaca
1. Ketik "Beras" → `ngModelChange` → `nama = "Beras"`.
2. `required` kosong → `f.invalid` true → tombol mati.

### 3 Istilah Wajib
1. **ngModel/[()]/name**: tali/2-arah/wajib
2. **ngForm/invalid**: wasit/cacat

---

## Eksperimen

- **Hijau:** Ketik nama → `{{ nama }}` ikut?
- **Kuning:** Kosongkan → tombol mati?
- **Merah:** Hapus `name="nama"` → error `If ngModel is used within a form tag`? Pasang lagi.

---

## Tantangan

**Form Warung Lengkap:** `nama` + `harga` + `stok` (`required`, `min`) + tombol pintar + `tambah()` push ke `daftar` + tampil `*ngFor`. **Selesai Beginner Angular!**

---

## Glosarium Mini

- **ngModel/ngForm/required**: tali/wasit/wajib

---

## Ringkasan

Minggu 5 dari 5: **Formulir 2 Arah** (Level: Pemula). **Selesai Beginner Angular!** Lanjut: **Router** (Menengah).
