# Proyek: Todo App

> React | State & Interaksi | Pelajaran 8

## Tujuan Pembelajaran

- Menerapkan semua pola state: controlled form, lifting, immutability
- Meng-update array state tanpa mutasi (map, filter, spread)
- Menambahkan filter dan derived state
- Menangani input + keyboard event

---

## Program: Proyek: Todo App

```jsx
import { useState } from 'react';

const initialTodos = [
  { id: 1, title: 'Belajar useState', done: true },
  { id: 2, title: 'Lifting state up', done: true },
  { id: 3, title: 'Bikin Todo App', done: false },
];

export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');

  const addTodo = () => {
    const title = text.trim();
    if (!title) return;
    setTodos((prev) => [...prev, { id: Date.now(), title, done: false }]);
    setText('');
  };

  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const visible = todos.filter((t) =>
    filter === 'all' ? true : filter === 'done' ? t.done : !t.done
  );
  const remaining = todos.filter((t) => !t.done).length;

  return (
    <div>
      <h1>Todo App</h1>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          style={{ flex: 1 }}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div style={{ marginBottom: '0.8rem' }}>
        {['all', 'active', 'done'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{ marginRight: '0.4rem', background: filter === f ? '#2E5B44' : '#f1f1f1', color: filter === f ? '#fff' : '#222', border: 'none' }}
          >
            {f}
          </button>
        ))}
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {visible.map((t) => (
          <li key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
            <input type="checkbox" checked={t.done} onChange={() => toggleTodo(t.id)} />
            <span style={{ flex: 1, textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#999' : '#222' }}>
              {t.title}
            </span>
            <button onClick={() => deleteTodo(t.id)} style={{ border: 'none', background: '#fde8e8', color: '#b00020' }}>Delete</button>
          </li>
        ))}
      </ul>

      <p style={{ color: '#666' }}>{remaining} remaining · {todos.length} total</p>
    </div>
  );
}

```

---

## Penjelasan

## Immutability
Semua update array memakai cara immutable: `[...prev, item]` untuk tambah, `.map` untuk ubah item, `.filter` untuk hapus. React hanya me-render ulang jika reference state berubah — mutasi langsung tidak terdeteksi.

## Derived State
`visible` dan `remaining` dihitung setiap render dari `todos` — tidak disimpan sebagai state terpisah. Derived state menghindari data ganda yang bisa tidak sinkron.

## Satu State Per Concern
Filter, input, dan list masing-masing punya state sendiri yang kecil dan jelas. Ini pola "state colocation": simpan state sedekat mungkin dengan tempat pemakaiannya.

## Project Milestone
Todo App adalah project wajib di hampir semua kurikulum React (Scrimba, Odin, EduRev, Marcy Lab). Ia membuktikan penguasaan state, event, forms, dan rendering — fondasi semua aplikasi.

---

## Eksperimen

1. **Immutability**
2. **Derived State**
3. **Satu State Per Concern**
4. **Project Milestone**

---

## Tantangan

Tambah fitur: edit todo (klik dua kali untuk mengubah teks), counter progress bar (done/total), dan tombol "Clear completed". Gunakan hanya state + derived state, tanpa library.

---

## Ringkasan

Todo App = milestone state: controlled input, immutability, derived state, filter. Anda siap untuk efek samping dan data API. Lanjut: useEffect.
