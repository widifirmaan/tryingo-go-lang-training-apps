# Data Fetching

> React | Efek & Data | Pelajaran 10

## Tujuan Pembelajaran

- Fetch data di dalam useEffect
- Mengelola 3 status: loading, error, ready
- Menangani empty state
- Mencegah race condition dengan cancelled flag

---

## Program: Data Fetching

```jsx
import { useState, useEffect } from 'react';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | error | ready

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then((res) => {
        if (!res.ok) throw new Error('Request failed: ' + res.status);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) { setPosts(data); setStatus('ready'); }
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => { cancelled = true; };
  }, []);

  if (status === 'loading') return <p style={{ color: '#666' }}>Loading posts...</p>;
  if (status === 'error') return <p style={{ color: '#b00020' }}>Failed to load data. Check your connection.</p>;

  return (
    <div>
      <h1>Data Fetching</h1>
      <h2>Posts</h2>
      {posts.length === 0
        ? <p>No posts found.</p>
        : <ul style={{ listStyle: 'none', padding: 0 }}>
            {posts.map((p) => (
              <li key={p.id} style={{ border: '1px solid #eee', borderRadius: 10, padding: '0.8rem', margin: '0.4rem 0' }}>
                <strong>{p.title}</strong>
                <p style={{ margin: '0.2rem 0 0', color: '#666' }}>{p.body}</p>
              </li>
            ))}
          </ul>}
    </div>
  );
}

```

---

## Penjelasan

## Fetch dalam useEffect
Pola standar: `useEffect` dengan dependency `[]` berisi fetch, lalu update state saat response tiba. State, bukan variabel, yang menyimpan data hasil fetch.

## 3 Request States
UI harus menangani loading, error, dan ready — masing-masing dengan tampilan berbeda. Profesional menamai ini "request states" dan ini salah satu skill yang paling dicari di interview.

## Empty State
Data kosong bukan error: tampilkan pesan "no results". Fetch berhasil tapi array kosong tetap masuk status ready.

## Race Condition & Cleanup
Jika komponen unmount sebelum response tiba, setState pada komponen yang unmount memicu warning. Gunakan `cancelled` flag di cleanup. Juga cek `res.ok` — fetch tidak melempar error pada status 404/500.

---

## Eksperimen

1. **Fetch dalam useEffect**
2. **3 Request States**
3. **Empty State**
4. **Race Condition & Cleanup**

---

## Tantangan

Buat halaman dengan 2 seksi: daftar users (10 data) dan tombol "Load More" yang menambah limit (10 -> 20 -> 30). Tangani loading per aksi dan tampilkan skeleton sederhana saat memuat.

---

## Ringkasan

Fetch di useEffect + 3 request states + empty state + cancelled flag = pola produksi yang benar. Lanjut: React Router.
