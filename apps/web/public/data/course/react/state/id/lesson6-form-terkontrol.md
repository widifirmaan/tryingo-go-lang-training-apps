# Form Terkontrol

> React | State & Interaksi | Pelajaran 6

## Tujuan Pembelajaran

- Memahami pola controlled input (value + onChange)
- Mengelola banyak field dalam satu state object
- Menangani checkbox, select, dan validasi sederhana
- Menggunakan preventDefault saat submit

---

## Program: Form Terkontrol

```jsx
import { useState } from 'react';

export default function App() {
  const [form, setForm] = useState({ name: '', email: '', level: 'beginner', agree: false });
  const [submitted, setSubmitted] = useState(null);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.agree) { alert('Please agree to the terms.'); return; }
    setSubmitted(form);
  };

  const buttonStyle = {
    background: '#2E5B44', color: '#fff', border: 'none',
    padding: '0.5rem 1.2rem', borderRadius: 10, marginTop: '0.8rem', cursor: 'pointer',
  };

  return (
    <div>
      <h1>Controlled Form</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ margin: '0.5rem 0' }}>
          <label>Name: </label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div style={{ margin: '0.5rem 0' }}>
          <label>Email: </label>
          <input name="email" type="email" value={form.email} onChange={handleChange} />
        </div>
        <div style={{ margin: '0.5rem 0' }}>
          <label>Level: </label>
          <select name="level" value={form.level} onChange={handleChange}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div style={{ margin: '0.5rem 0' }}>
          <label>
            <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
            {' '}I agree to the terms
          </label>
        </div>
        <button type="submit" style={buttonStyle}>Register</button>
      </form>

      <h2>Live State Preview</h2>
      <pre style={{ background: '#f6f6f6', padding: '1rem', borderRadius: 10 }}>
        {JSON.stringify(form, null, 2)}
      </pre>

      {submitted && <p style={{ color: '#2E5B44', fontWeight: 'bold' }}>Registered: {submitted.name} ({submitted.email})</p>}
    </div>
  );
}

```

---

## Penjelasan

## Controlled Input
Input dikontrol: nilai input selalu = state (`value={form.name}`), dan setiap ketikan melewati `onChange` untuk update state. Siklus: ketik -> change -> setState -> re-render -> input menampilkan nilai baru.

## Satu Object untuk Banyak Field
Gabungkan field dalam satu state object. Satu handler `handleChange` melayani semua field dengan atribut `name` sebagai kunci: `setForm(prev => ({ ...prev, [name]: value }))`.

## Checkbox & Select
Checkbox memakai `checked={state}` + `e.target.checked`, bukan `value`. Select memakai `value` + `onChange` sama seperti input teks.

## Submit
Selalu panggil `e.preventDefault()` agar halaman tidak reload. Validasi sederhana bisa langsung di handler submit sebelum menyimpan. Perhatikan: mengontrol semua input = banyak re-render — untuk form sederhana ini wajar dan justru memungkinkan validasi real-time.

---

## Eksperimen

1. **Controlled Input**
2. **Satu Object untuk Banyak Field**
3. **Checkbox & Select**
4. **Submit**

---

## Tantangan

Tambah validasi real-time: field password dengan indikator kekuatan (>= 6 karakter = lemah/kuat), field age yang hanya menerima angka, dan tombol submit dinonaktifkan (disabled) saat form belum lengkap.

---

## Ringkasan

Controlled form: value + onChange mengikat input ke state. Satu object state + satu handler untuk semua field. preventDefault saat submit. Lanjut: lifting state up.
