# Forms & Validasi

> **Kategori:** React | **Level:** Menengah | **Minggu 7:** Forms & Validasi
> **Prasyarat:** Minggu 6 — **Context API**.

## Tujuan Pembelajaran

- Controlled form: setiap input punya value + onChange
- Single handler untuk multiple input (name attribute)
- Real-time validation: error saat submit dan saat mengetik
- Error state management dan conditional rendering
- Form submission: preventDefault, validate, submit

---

## Kenapa Ini Penting Buat Kamu?

Tanpa validasi, nama kosong masuk → laporan rusak. Dengan `react-hook-form` + `zod`, 3 baris validasi + pesan otomatis.

---

## Program: Form Registrasi

```jsx
// Controlled forms = setiap input dikontrol React state
// Validasi: real-time feedback, error messages, prevent submit

import { useState } from "react";

function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Nama wajib diisi";
    if (!form.email.includes("@")) errs.email = "Email tidak valid";
    if (form.password.length < 6) errs.password = "Min 6 karakter";
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Clear error saat user mulai mengetik
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
    console.log("Data terkirim:", form);
  }

  if (submitted) {
    return <p>Registrasi berhasil! Selamat, {form.name}!</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nama" />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div>
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      <button type="submit">Daftar</button>
    </form>
  );
}

console.log("RegisterForm siap digunakan");
```

---

## Konsep Kunci

### Controlled Form
value + onChange = React kontrol input.

### Single Handler
e.name sebagai key: setForm({ ...form, [e.target.name]: e.target.value }).

### Validation
Validate saat submit. Clear error saat user mulai mengetik.

### UX Pattern
- Error di bawah input
- Disable button saat invalid
- Success message setelah submit

---

## Eksperimen

- Tambah validasi password strength
- Buat field konfirmasi password
- Tambah checkbox terms & conditions
- Implementasikan async validation (cek email unik)

---

## Tantangan

Buat form checkout dengan validasi: nama, alamat, telepon, email, metode pembayaran. Tampilkan error real-time.
- **Sambungan (Minggu 6 — Context API):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Penjelasan untuk Pemula

### Analogi: Satpam Formulir
- **Form tanpa validasi = pintu tanpa satpam**: nama kosong lolos → laporan rusak.
- **`errors.nama` + `validate()` = satpam + daftar salah**: cek SEBELUM kirim, tampil TEPAT di bawah input yang salah (bukan alert umum!).

### Langkah 0 — Siapkan Device
- Sama W1 track ini (lihat minggu 1 untuk install).

### Cara Komputer Membaca
- `register('nama', { required: 'Wajib' })` + `errors.nama?.message` tampil.

### 3 Istilah Wajib
- 1. **register/errors**: daftar/salah

## Ringkasan

Minggu 7 dari 12: **Forms & Validasi** (Level: Menengah). User input handling. Minggu depan: **Custom Hooks & Patterns**.
