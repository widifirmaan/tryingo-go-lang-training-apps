# Capstone: Complete E-Commerce Store

> **Kategori:** React | **Level:** Advanced | **Minggu 12:** Capstone: E-Commerce App
> **Prerequisites:** Week 11 — **Performance**.

## Learning Objectives

- Combine Router + Context + `fetch` + `memo` into a store with `products` + `cart` + `checkout`

---

## Why This Matters (Non-IT)

11 separate weeks — capstone proves the combination: Router + Context + fetch + tests + deploy become a real store. React portfolio.

---

## Program: Capstone Store

Required features:
- `/` Home, `/products` list `fetch` `useEffect`, `/products/:id` detail `useParams`, `/cart` Context
- `memo` for `ProductCard`, `lazy` for `Checkout`
- Deploy `Vercel` + `vitest` 1 test

Structure: `src/pages`, `src/components`, `src/context/CartContext.jsx`.

**Task:** Deploy `shop-react.vercel.app` + 2-min video adding to cart → checkout.



```jsx
function App() {
  // Peta toko tanpa Router (state = halaman) + gudang via Context (W6)
  const [halaman, setHalaman] = useState("beranda");
  const [keranjang, setKeranjang] = useState([]);
  const KeranjangContext = createContext(null);

  const PRODUK = [
    { id: 1, nama: "Beras 5kg", harga: 62000 },
    { id: 2, nama: "Minyak 2L", harga: 48000 },
    { id: 3, nama: "Gula 1kg", harga: 17500 },
  ];
  // fetch W5 diganti data statis agar preview mandiri (asli: useEffect + fetch /api/produk)
  const tambah = (p) => setKeranjang((k) => [...k, p]);
  // useMemo W11: total hanya dihitung ulang jika keranjang berubah
  const total = useMemo(() => keranjang.reduce((s, p) => s + p.harga, 0), [keranjang]);

  const Menu = () => (
    <nav style={{ display: "flex", gap: 8, marginBottom: 12 }}>
      {[["beranda", "Beranda"], ["produk", "Produk"], ["keranjang", "Keranjang (" + keranjang.length + ")"]].map(([id, label]) => (
        <button key={id} onClick={() => setHalaman(id)}>{label}</button>
      ))}
    </nav>
  );

  return (
    <KeranjangContext.Provider value={keranjang}>
      <div style={{ fontFamily: "system-ui", padding: 16 }}>
        <h1>Warung React 🛒</h1>
        <Menu />
        {halaman === "beranda" && <p>Selamat datang! Pilih menu Produk untuk belanja.</p>}
        {halaman === "produk" && (
          <ul>
            {PRODUK.map((p) => (
              <li key={p.id}>
                {p.nama} — Rp{p.harga} <button onClick={() => tambah(p)}>+ Keranjang</button>
              </li>
            ))}
          </ul>
        )}
        {halaman === "keranjang" && (
          <div>
            <p>Isi: {keranjang.length} barang</p>
            <p><b>Total: Rp{total}</b></p>
            <button onClick={() => setKeranjang([])}>Checkout</button>
          </div>
        )}
      </div>
    </KeranjangContext.Provider>
  );
}
```

*Paste into the playground → Run, click Produk → + Keranjang → Keranjang → Checkout.*

---

## Beginner Friendly Explanation

### Analogy: React Store Grand Opening
- **11 weeks = building a mall**: maps (Router), warehouse (Context), showcase (components), guards (forms).
- **Capstone = grand opening**: Router + Context + fetch + memo + tests + deploy RUN TOGETHER. Portfolio = proof, not promises!

### Step 0 — Prepare Device
- Same as React W1: `npm run dev` on `5173` (+ `vitest` for W10).

### How the Computer Reads It
- CHECKLIST (router + warehouse + tests + deploy) then URL + video.

### 3 Must-Know Terms
- 1. **Capstone/deploy**: combine/open

---

## Experiments

- **Green:** Add 2 Beras + 1 Gula → Total Rp141500?
- **Yellow:** Add `Kopi 12000` to the array → shows in list?
- **Red:** Remove `[keranjang]` from `useMemo` → total still right? Why do deps matter?

## Challenge

****React Store Grand Opening:** combine pages + Context + `useMemo`: add `/checkout` page (name form + Bayar button → total receipt + clear cart).**

Green: Beranda→Produk→Keranjang→Checkout flows. Yellow: 1 green `vitest` for add-to-cart. Red: deploy + video (Task).

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 12: **Capstone** — complete store, **React 0→Expert DONE!**
