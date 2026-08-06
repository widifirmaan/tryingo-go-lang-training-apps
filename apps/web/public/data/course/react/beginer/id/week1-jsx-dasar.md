# JSX & Komponen Dasar

> **Kategori:** React | **Level:** Pemula | **Minggu 1:** JSX & Komponen Dasar

## Tujuan Pembelajaran

- Memahami JSX sebagai extension syntax JavaScript (React Docs)
- Membuat function component sederhana yang me-return JSX
- Menggunakan curly braces {} untuk ekspresi JavaScript di JSX
- Membedakan JSX dengan HTML: className, htmlFor, camelCase
- Mengapa JSX bukan string HTML — compiled ke React.createElement

---

## Program: Halo React

```jsx
// JSX memungkinkan penulisan HTML-like syntax dalam JavaScript
// Setiap komponen React adalah function yang return JSX

function Welcome() {
  const name = "Tryngo";
  const isDark = true;

  return (
    <div className="card">
      <h1>Halo, {name}!</h1>
      <p>Mode: {isDark ? "Gelap" : "Terang"}</p>
      <ul>
        <li>JSX = JavaScript + XML</li>
        <li>Curly braces {} untuk ekspresi</li>
        <li>className (bukan class)</li>
      </ul>
    </div>
  );
}

function App() {
  return (
    <div>
      <Welcome />
      <Welcome />
    </div>
  );
}

// Render ke DOM
// ReactDOM.createRoot(document.getElementById('root')).render(<App />);
console.log("Komponen App berhasil didefinisikan");
```

---

## Konsep Kunci

### JSX
JSX = JavaScript XML. Syntactic sugar yang dikompilasi ke React.createElement(). Bisa menyisipkan ekspresi JS dengan {}.

### Komponen
Function yang return JSX. Harus dimulai huruf kapital (konvensi React). Komponen bisa dipakai berulang.

### Ekspresi JSX
- Ternary: {cond ? "yes" : "no"}
- Logical &&: {isLoggedIn && <Dashboard />}
- map(): {items.map(item => <li key={item.id}>{item.name}</li>)}

### Rules JSX
- Satu root element (atau Fragment <>)
- Semua tag harus ditutup
- className, htmlFor (reserved words)

---

## Eksperimen

- Buat komponen baru dengan data berbeda
- Ubah conditional rendering dari ternary ke logical &&
- Render list dengan map() dari array object
- Buat nested komponen 3 level

---

## Tantangan

Buat halaman profil pengguna dengan komponen: Avatar, UserInfo, SkillList. Gunakan conditional rendering untuk status online/offline.

---

## Ringkasan

Minggu 1 dari 12: **JSX & Komponen Dasar** (Level: Pemula). Fondasi React. Minggu depan: **Props & Data Flow**.
