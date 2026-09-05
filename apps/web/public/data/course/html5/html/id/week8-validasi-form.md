# Validasi Form — Satpam Formulir

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 8:** Validasi Form

## Tujuan Pembelajaran

- `required`, `minlength`, `pattern`, `type="email"` validasi browser tanpa JS (MDN Constraint Validation)
- `novalidate` matikan, `:valid/:invalid` CSS

---

## Kenapa Ini Penting Buat Kamu?

Tanpa `required`, pelanggan kirim nama kosong → pesanan gagal. `pattern="[0-9]{12}"` cegah WA salah.

---

## Program: Validasi Warung

```html
<form>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required>

  <label for="wa">WA (12 digit)</label>
  <input id="wa" name="wa" type="tel" pattern="[0-9]{10,13}" required placeholder="08123456789">

  <label for="nama">Nama (min 3)</label>
  <input id="nama" name="nama" type="text" minlength="3" required>

  <button type="submit">Pesan</button>
</form>
```

Coba kirim kosong → browser cegat merah "Please fill out". Coba `wa` huruf → cegat.

---

## Ringkasan

Minggu 8: **Satpam Formulir** — `required` + `pattern`.
