# useEffect & Side Effects

> React | Efek & Data | Pelajaran 9

## Tujuan Pembelajaran

- Memahami apa itu side effect
- Menguasai 3 pola dependency array
- Menulis cleanup function yang benar
- Memahami StrictMode double-invoke

---

## Program: useEffect & Side Effects

```jsx
import { useState, useEffect } from 'react';

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  const [name, setName] = useState('');

  // Pattern 3: runs when 'seconds' changes
  useEffect(() => {
    document.title = 'Seconds: ' + seconds;
  }, [seconds]);

  // Pattern 2: runs once after first render — with cleanup
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id); // cleanup runs before next effect or unmount
  }, [running]);

  return (
    <div>
      <h1>useEffect</h1>

      <h2>Timer dengan Cleanup</h2>
      <p>Elapsed: {seconds}s (lihat judul tab!)</p>
      <button onClick={() => setRunning((r) => !r)}>
        {running ? 'Pause' : 'Resume'}
      </button>

      <h2>Effect Mengikuti State</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Type to sync title..." />
      <p>Judul tab di-set saat seconds berubah.</p>

      <p style={{ color: '#666', fontSize: '0.85rem' }}>
        3 pola dependency: (fn) tiap render · (fn, []) sekali · (fn, [dep]) saat dep berubah.
        Cleanup mencegah kebocoran interval. StrictMode memanggil effect dua kali di dev
        untuk menampakkan bug.
      </p>
    </div>
  );
}

```

---

## Penjelasan

## Side Effects
Side effect = sesuatu yang menyentuh dunia luar komponen: timer, fetch, subscription, document.title, localStorage. `useEffect` adalah tempat yang tepat — bukan di body render (yang harus murni).

## 3 Pola Dependency
`useEffect(fn)` — jalan setelah setiap render. `useEffect(fn, [])` — sekali setelah render pertama. `useEffect(fn, [dep])` — saat dep berubah. Salah pilih pola = bug (effect berjalan terlalu sering atau tidak pernah).

## Cleanup
Return function dieksekusi sebelum effect berikutnya atau saat unmount. Interval/setTimeout harus dibersihkan — jika tidak, terjadi memory leak dan perilaku aneh (contoh: counter berjalan ganda).

## StrictMode
Di development, React StrictMode menjalankan effect dua kali (mount -> cleanup -> mount) untuk menampakkan efek yang tidak bersih. Ini normal — bukan bug kode Anda. Production hanya sekali.

---

## Eksperimen

1. **Side Effects**
2. **3 Pola Dependency**
3. **Cleanup**
4. **StrictMode**

---

## Tantangan

Buat stopwatch lengkap: lap times (array), tombol Start/Stop/Lap/Reset, dan format mm:ss. Tambahkan effect untuk menyimpan lap terakhir ke localStorage dan membacanya saat mount.

---

## Ringkasan

useEffect untuk side effect. 3 pola dependency array. Cleanup mencegah kebocoran. StrictMode double-invoke di dev. Lanjut: data fetching.
