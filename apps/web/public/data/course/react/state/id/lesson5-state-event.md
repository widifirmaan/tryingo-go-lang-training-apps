# useState & Event

> React | State & Interaksi | Pelajaran 5

## Tujuan Pembelajaran

- Memahami kenapa variabel biasa gagal untuk UI berubah
- Menggunakan useState dan setter function
- Menangani event onClick dengan handler
- Menerapkan functional updates (prev => prev + 1)

---

## Program: useState & Event

```jsx
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <h1>useState & Events</h1>

      <h2>Counter</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount((c) => c - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>

      <h2>Toggle</h2>
      <button onClick={() => setIsOn((prev) => !prev)}>
        {isOn ? 'Switch OFF' : 'Switch ON'}
      </button>
      <p>Status: {isOn ? 'ON' : 'OFF'}</p>

      <p style={{ color: '#666', fontSize: '0.85rem' }}>
        Catatan: state update bersifat async. Dua klik +1 berturut-turut dalam satu
        handler tidak menumpuk kecuali memakai functional update (c) => c + 1.
      </p>
    </div>
  );
}

```

---

## Penjelasan

## Kenapa State?
Variabel biasa tidak memicu render ulang. Hanya ketika state berubah (via setter), React me-render ulang komponen dengan nilai baru. Inilah perbedaan utama variabel vs state.

## useState
`const [count, setCount] = useState(0)` — hook mengembalikan array: nilai saat ini + setter. Setter selalu dipakai untuk mengubah nilai; jangan pernah mutasi langsung.

## Event Handler
React memakai sintaks camelCase: `onClick`, `onChange`, `onSubmit`. Handler menerima event object. Jangan memanggil handler langsung di JSX — kirim fungsi: `onClick={handleClick}` bukan `onClick={handleClick()}`.

## Functional Updates
Update state bersifat async dan di-batch. Jika update bergantung pada nilai sebelumnya, gunakan `setCount((c) => c + 1)` agar selalu benar walau dipanggil cepat berulang.

---

## Eksperimen

1. **Kenapa State?**
2. **useState**
3. **Event Handler**
4. **Functional Updates**

---

## Tantangan

Buat komponen Quiz: state index soal, skor, dan jawaban terpilih. Array 5 soal pilihan ganda. Klik jawaban menambah skor, tombol Next pindah soal, tombol Reset mengulang.

---

## Ringkasan

State = data yang me-render ulang UI. Setter mengganti nilai, functional updates aman untuk nilai berurutan. Lanjut: form terkontrol.
