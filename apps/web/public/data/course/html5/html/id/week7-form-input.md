# Form & Input — Pesanan Warung

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 7:** Form & Input
> **Prasyarat:** Minggu 6 — **Tabel**.

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

### Program Tambahan: Semua Jenis Input (ala freeCodeCamp Registration Form)

```html
<form action="/daftar" method="post">
  <fieldset>
    <legend>Akun</legend>
    <label for="email2">Email</label>
    <input id="email2" name="email" type="email" required>
    <label for="pass">Password</label>
    <input id="pass" name="pass" type="password" minlength="6" required>
  </fieldset>

  <fieldset>
    <legend>Pesanan</legend>
    <p>Ambil sendiri atau antar?</p>
    <label><input type="radio" name="cara" value="ambil" checked> Ambil</label>
    <label><input type="radio" name="cara" value="antar"> Antar</label>
    <p>Topping (boleh banyak):</p>
    <label><input type="checkbox" name="toping" value="telur" checked> Telur</label>
    <label><input type="checkbox" name="toping" value="kerupuk"> Kerupuk</label>
    <label for="tgl">Tanggal antar</label>
    <input id="tgl" name="tgl" type="date">
    <label for="bukti">Bukti transfer</label>
    <input id="bukti" name="bukti" type="file" accept="image/*">
  </fieldset>
</form>
```

- `radio` 1 nama = pilih 1 (`checked` bawaan). `checkbox` 1 nama = boleh banyak.
- `fieldset` + `legend` = kotak + judul (wajib untuk aksesibilitas radio/checkbox — freeCodeCamp tekankan ini!).
- `select` alternatif jika opsi >5: `<select name="kota"><option>Jakarta</option>...</select>`.

---

## Konsep Kunci

### `label for` + `input id`
`for="nama"` hubungkan ke `id="nama"` — klik label = fokus input.

### `name` + `required` + `type`
`name` kunci kirim, `required` wajib, `type="email"` validasi email.

### Radio / Checkbox / Fieldset
- `type="radio" name="cara"` sama = 1 pilihan. `checked` = bawaan.
- `type="checkbox"` = banyak pilihan. `fieldset` + `legend` bungkus + judul (screen reader baca judul dulu).

---

## Penjelasan untuk Pemula

### Analogi: Formulir Kertas
- **`form` = kertas formulir**, **`label` = judul kolom**, **`input` = kotak isi**, **`button submit` = serahkan ke kasir**.

---

## Eksperimen

- **Hijau:** Buka `/daftar` → apa yang tampil? Coba ID lain → bedanya apa?
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus 1 baris di Program → error pertama apa? Kembalikan.

## Tantangan

**Form Warung Lengkap:** `nama` text `required`, `wa` tel, `jumlah` number, `catatan` textarea, `metode` select `COD/Transfer`, `label for` semua, `required` + `name`.
- **Sambungan (Minggu 6 — Tabel):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Ringkasan

Minggu 7: **Form** — pesan warung. Minggu depan: **Validasi**.
