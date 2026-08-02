# Komponen & Props

> React | Foundasi | Pelajaran 2

## Tujuan Pembelajaran

- Memahami props sebagai input read-only komponen
- Menggunakan children untuk komposisi
- Membuat komponen reusable dengan props
- Membedakan props vs state

---

## Program: Komponen & Props

```jsx
function Card({ title, level, children }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 12, padding: '1rem', margin: '0.5rem 0' }}>
      <h3>{title} <span style={{ color: '#666', fontWeight: 'normal' }}>({level})</span></h3>
      <p>{children}</p>
    </div>
  );
}

function Badge({ label }) {
  return <span style={{ background: '#e7f5ee', color: '#2E5B44', padding: '0.15rem 0.6rem', borderRadius: 999, fontWeight: 'bold' }}>{label}</span>;
}

export default function App() {
  return (
    <div>
      <h1>Props & Composition</h1>
      <Card title="Frontend" level="Beginner">
        React, Vue, Svelte. Fokus pada <Badge label="UI" /> dan interaksi.
      </Card>
      <Card title="Backend" level="Intermediate">
        Node.js, Go, Rust. Fokus pada <Badge label="API" /> dan data.
      </Card>
      <Card title="Database" level="Advanced">
        PostgreSQL, MongoDB. Fokus pada <Badge label="Storage" /> dan query.
      </Card>
    </div>
  );
}

```

---

## Penjelasan

## Props
Props adalah parameter fungsi komponen — data yang dikirim parent ke child. Props bersifat read-only: child tidak boleh mengubahnya. `function Card({ title, level })` mendestrukturisasi props langsung.

## Children
Segala yang berada di dalam tag komponen (`<Card>...</Card>`) diterima sebagai `children`. Ini memungkinkan komposisi seperti HTML, tempat komponen membungkus konten lain.

## Reusability
Dengan props, satu komponen bisa dirender berkali-kali dengan data berbeda. `<Badge label="UI" />` dipakai di banyak tempat tanpa duplikasi kode.

## Props vs State
Props = data dari luar (read-only, diatur parent). State = data internal yang berubah (diatur komponen sendiri, akan dipelajari di phase berikutnya). Aturan: data mengalir ke bawah via props.

---

## Eksperimen

1. **Props**
2. **Children**
3. **Reusability**
4. **Props vs State**

---

## Tantangan

Buat komponen ProductCard reusable: terima props name, price, dan category. Render 4 kartu produk dengan data berbeda. Tambahkan komponen PriceTag yang dipakai di dalam ProductCard.

---

## Ringkasan

Props = input read-only komponen. children memungkinkan komposisi. Komponen reusable via props. Data mengalir ke bawah. Lanjut: rendering list & kondisi.
