# Pengenalan React & JSX

> React | Foundasi | Pelajaran 1

## Tujuan Pembelajaran

- Memahami peran React sebagai library UI
- Mengenal sintaks JSX dan ekspresi di dalamnya
- Membuat komponen fungsi pertama
- Memahami konsep single-page application (SPA)

---

## Program: Pengenalan React & JSX

```jsx
function Profile() {
  const name = 'Ayu';
  const role = 'React Developer';
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 12, padding: '1.5rem', maxWidth: 320 }}>
      <h1>Hello, {name}!</h1>
      <p>Role: {role}</p>
      <p>2 + 3 = {2 + 3}</p>
      <p>{name.length} characters in name</p>
    </div>
  );
}

export default function App() {
  return <Profile />;
}

```

---

## Penjelasan

## Apa itu React?
React adalah library JavaScript untuk membangun user interface dari komponen. Berbeda dengan framework, React fokus pada view layer dan dapat dikombinasikan dengan library lain.

## JSX
JSX adalah ekstensi sintaks yang memungkinkan markup ditulis di dalam JavaScript. Ekspresi JavaScript dimasukkan dengan `{ }` — misalnya `{name}` atau `{2 + 3}`. Setiap ekspresi dievaluasi saat render.

## Komponen Fungsi
Komponen adalah fungsi yang mengembalikan JSX. Satu komponen bisa digunakan berulang. Nama komponen harus diawali huruf kapital agar React mengenalinya sebagai komponen.

## SPA
Aplikasi React adalah single-page application: satu halaman HTML di-load sekali, lalu React meng-update UI tanpa reload penuh. Inilah fondasi untuk React Router nanti.

---

## Eksperimen

1. **Apa itu React?**
2. **JSX**
3. **Komponen Fungsi**
4. **SPA**

---

## Tantangan

Buat kartu profil sendiri: ubah nilai name dan role, tambahkan ekspresi baru seperti tahun pengalaman ({2026 - 2020}) dan daftar skill dengan array.join().

---

## Ringkasan

React = library UI berbasis komponen. JSX menggabungkan markup + logika. Ekspresi dalam {} dievaluasi saat render. SPA memuat sekali lalu meng-update dinamis.
