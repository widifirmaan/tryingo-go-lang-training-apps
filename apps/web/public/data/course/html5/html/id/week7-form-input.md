# Form & Input — Pesanan Warung

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 7:** Form & Input

## Tujuan Pembelajaran

- `<form>` + `<label for="nama">` + `<input id="nama" name="nama" required>` — `for` hubungkan label & input (klik label fokus input, a11y)
- `type="text/email/number"` + `placeholder` + `required` + `name` untuk kirim data
- `button type="submit"` kirim, `method="get/post"` (MDN Forms)

---

## Kenapa Ini Penting Buat Kamu?

Tanpa `label for`, klik tulisan "Nama" tidak fokus input — susah di HP. Tanpa `name`, data tidak kekirim ke server. `required` cegah kirim kosong.

---

## Program: Form Pesan Warung

```html
<form action="/pesan" method="post">
  <div>
    <label for="nama">Nama Pelanggan</label>
    <input id="nama" name="nama" type="text" placeholder="Budi" required>
  </div>
  <div>
    <label for="wa">WA</label>
    <input id="wa" name="wa" type="tel" placeholder="0812..." required>
  </div>
  <div>
    <label for="jumlah">Jumlah (kg)</label>
    <input id="jumlah" name="jumlah" type="number" min="1" max="100" value="1" required>
  </div>
  <button type="submit">Pesan</button>
</form>
```

**Wajib:** `label for="nama"` sama `id="nama"`, `name="nama"` untuk server, `required` wajib.

---

## Konsep Kunci

### `label for` + `input id`
`for="nama"` hubungkan ke `id="nama"` — klik label = fokus input.

### `name` + `required` + `type`
`name` kunci kirim, `required` wajib, `type="email"` validasi email.

---

## Penjelasan untuk Pemula

### Analogi: Formulir Kertas
- **`form` = kertas formulir**, **`label` = judul kolom**, **`input` = kotak isi**, **`button submit` = serahkan ke kasir**.

---

## Tantangan

**Form Warung Lengkap:** `nama` text `required`, `wa` tel, `jumlah` number, `catatan` textarea, `metode` select `COD/Transfer`, `label for` semua, `required` + `name`.

---

## Ringkasan

Minggu 7: **Form** — pesan warung. Minggu depan: **Validasi**.
