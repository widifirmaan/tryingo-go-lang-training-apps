# State & useState

> **Kategori:** React | **Level:** Pemula | **Minggu 3:** State & useState

## Tujuan Pembelajaran

- Memahami state sebagai data yang bisa berubah dalam komponen
- useState hook: const [value, setValue] = useState(initial)
- State trigger re-render — UI update otomatis saat state berubah
- Controlled component: form input yang dikontrol React
- Event handling: onChange, onClick, onSubmit

---

## Program: Counter & Form

```jsx
// State = data internal komponen yang bisa berubah
// useState hook = tambahkan state ke function component

import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Hitung: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+ Tambah</button>
      <button onClick={() => setCount(count - 1)}>- Kurang</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

function Form() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(name);
    setName("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama Anda"
        />
        <button type="submit">Kirim</button>
      </form>
      {submitted && <p>Halo, {submitted}!</p>}
    </div>
  );
}

function App() {
  return (
    <div>
      <Counter />
      <Form />
    </div>
  );
}

console.log("Counter & Form siap digunakan");
```

---

## Konsep Kunci

### useState
Hook untuk tambah state. Return [currentValue, setterFunction].

### Re-render
Saat setState dipanggil, React re-render komponen dengan nilai baru.

### Controlled Component
Form input yang value-nya dikontrol state. onChange update state.

### Event Handling
e.target.value untuk input, e.preventDefault() untuk form.

---

## Eksperimen

- Buat toggle show/hide dengan useState boolean
- Buat input untuk multiple field (nama, email)
- Gunakan functional update: setCount(prev => prev + 1)
- Buat counter dengan step configurable

---

## Tantangan

Buat todo list sederhana: tambah task, toggle complete, hapus task. Gunakan useState untuk array of objects.

---

## Ringkasan

Minggu 3 dari 12: **State & useState** (Level: Pemula). Interaktivitas dalam komponen. Minggu depan: **useEffect & Lifecycle**.
