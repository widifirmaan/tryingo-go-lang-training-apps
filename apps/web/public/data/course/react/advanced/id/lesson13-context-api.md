# Context API

> React | State Global & Advanced | Pelajaran 13

## Tujuan Pembelajaran

- Mengenali masalah prop drilling
- Membuat context dengan createContext
- Memberikan nilai via Provider
- Membaca context dengan useContext

---

## Program: Context API

```jsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);

function ThemeToggle() {
  const { theme, toggle } = useContext(ThemeContext);
  return <button onClick={toggle}>Switch to {theme === 'light' ? 'dark' : 'light'}</button>;
}

function Toolbar() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <span>Toolbar</span>
      <ThemeToggle />
    </div>
  );
}

function Card() {
  const { theme } = useContext(ThemeContext);
  return (
    <div style={{ border: '1px solid ' + (theme === 'light' ? '#ddd' : '#555'), borderRadius: 12, padding: '1rem', marginTop: '1rem' }}>
      <h3>Deep component</h3>
      <p>Baca theme dari context — tanpa prop drilling!</p>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, toggle: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')) }}>
      <div style={{ background: theme === 'light' ? '#ffffff' : '#1a1d21', color: theme === 'light' ? '#222' : '#eee', minHeight: '100vh', padding: '2rem', transition: 'all 0.2s' }}>
        <h1>Theme: {theme}</h1>
        <Toolbar />
        <Card />
      </div>
    </ThemeContext.Provider>
  );
}

```

---

## Penjelasan

## Prop Drilling
Saat state harus turun 3-4 level komponen hanya untuk dipakai satu komponen dalam, tiap level perantara wajib meneruskan props yang tidak dipakainya. Ini namanya prop drilling — context adalah solusinya.

## createContext
`createContext(null)` membuat context object dengan nilai default. Context di-import oleh Provider (memberi nilai) dan konsumen (membaca nilai).

## Provider
`<ThemeContext.Provider value={...}>` membungkus subtree yang butuh nilai. Nilai bisa state, fungsi, atau keduanya. Komponen di dalamnya membaca nilai tanpa props.

## useContext
`useContext(ThemeContext)` mengembalikan nilai terdekat dari provider. Komponen dalam pun otomatis re-render saat nilai berubah. Gunakan context untuk nilai "scoped global": theme, auth, language — bukan untuk semua state.

---

## Eksperimen

1. **Prop Drilling**
2. **createContext**
3. **Provider**
4. **useContext**

---

## Tantangan

Bangun sistem auth sederhana: AuthContext menyimpan user (null = belum login). Header menampilkan login/logout, halaman Dashboard hanya tampil jika user ada (jika tidak: pesan "Please login"). User di-set dari form login.

---

## Ringkasan

Context menyelesaikan prop drilling: createContext + Provider + useContext. Cocok untuk nilai global scoped. Lanjut: useReducer & custom hooks.
