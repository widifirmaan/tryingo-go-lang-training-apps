# useReducer & Custom Hooks

> React | State Global & Advanced | Pelajaran 14

## Tujuan Pembelajaran

- Memahami pola useReducer untuk state kompleks
- Menulis reducer murni dengan action types
- Membuat custom hook untuk membungkus logika
- Menggabungkan reducer + derived state

---

## Program: useReducer & Custom Hooks

```jsx
import { useReducer } from 'react';

const products = [
  { id: 1, name: 'Mechanical Keyboard', price: 750000 },
  { id: 2, name: '27-inch Monitor', price: 3200000 },
  { id: 3, name: 'USB-C Hub', price: 250000 },
];

function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const item = state.find((i) => i.id === action.product.id);
      return item
        ? state.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...state, { ...action.product, qty: 1 }];
    }
    case 'remove':
      return state.filter((i) => i.id !== action.id);
    case 'clear':
      return [];
    default:
      return state;
  }
}

function useCart() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  return { cart, total, count, add: (p) => dispatch({ type: 'add', product: p }), remove: (id) => dispatch({ type: 'remove', id }), clear: () => dispatch({ type: 'clear' }) };
}

export default function App() {
  const { cart, total, count, add, remove, clear } = useCart();

  return (
    <div>
      <h1>useReducer & Custom Hooks</h1>

      <h2>Products</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map((p) => (
          <li key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', padding: '0.5rem 0' }}>
            <span>{p.name} — Rp {p.price.toLocaleString('id-ID')}</span>
            <button onClick={() => add(p)}>Add</button>
          </li>
        ))}
      </ul>

      <h2>Cart ({count} items)</h2>
      {cart.length === 0 && <p>Cart is empty.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cart.map((i) => (
          <li key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.3rem 0' }}>
            <span>{i.name} x{i.qty}</span>
            <button onClick={() => remove(i.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p><strong>Total: Rp {total.toLocaleString('id-ID')}</strong></p>
      {cart.length > 0 && <button onClick={clear}>Clear cart</button>}
    </div>
  );
}

```

---

## Penjelasan

## useReducer
Untuk state dengan banyak transisi terkait (tambah/ubah/hapus), useReducer memusatkan logika update dalam satu fungsi murni: `(state, action) => newState`. Action adalah objek deskriptif: `{ type: 'add', product }`.

## Reducer Murni
Reducer harus murni: output hanya dari (state, action), tanpa side effect. Ini membuat transisi mudah diuji dan diprediksi — alasan utama pola ini dipakai Redux/Zustand di belakang layar.

## Custom Hooks
`useCart` membungkus reducer + derived state (total, count) + aksi (add, remove, clear) dalam satu API rapi. Komponen memakai `const { cart, total, add } = useCart()` — logika diuji terpisah, komponen bersih.

## Kapan Reducer vs useState
Transisi sederhana (satu setter) -> useState. Banyak transisi saling terkait atau state object kompleks -> useReducer. Kebutuhan keduanya -> reducer dalam context (pola akhir di project berikutnya).

---

## Eksperimen

1. **useReducer**
2. **Reducer Murni**
3. **Custom Hooks**
4. **Kapan Reducer vs useState**

---

## Tantangan

Refactor: pindahkan useCart ke CartContext (Provider + useContext) sehingga Header (badge jumlah item) dan halaman lain bisa membaca cart. Tambah tombol quantity +/- per item di keranjang (action inc/dec).

---

## Ringkasan

useReducer memusatkan transisi state, custom hooks membungkus logika jadi API bersih. Lanjut: testing & performansi.
