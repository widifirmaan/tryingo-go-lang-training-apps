# Capstone: Toko E-Commerce Lengkap

> **Kategori:** React | **Level:** Lanjutan | **Minggu 12:** Capstone: E-Commerce App
> **Prasyarat:** Minggu 11 — **Performance**.

## Tujuan Pembelajaran

- Gabung Router + Context + `fetch` + `memo` jadi toko `produk` + `keranjang` + `checkout`

---

## Kenapa Ini Penting Buat Kamu?

11 minggu terpisah — capstone buktikan gabung: Router + Context + fetch + uji + deploy jadi toko beneran. Portfolio React.

---

## Program: Toko Capstone

Fitur wajib:
- `/` Beranda, `/produk` daftar `fetch` `useEffect`, `/produk/:id` detail `useParams`, `/keranjang` Context
- `memo` untuk `KartuProduk`, `lazy` untuk `Checkout`
- Deploy `Vercel` + `vitest` 1 test

Struktur: `src/pages`, `src/components`, `src/context/KeranjangContext.jsx`.

**Tugas:** Deploy `warung-react.vercel.app` + video 2 menit tambah keranjang → checkout.



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

*Tempel di playground → Run, klik Produk → + Keranjang → Keranjang → Checkout.*

---

## Penjelasan untuk Pemula

### Analogi: Grand Opening Toko React
- **11 minggu = bangun mal**: peta (Router), gudang (Context), etalase (komponen), satpam (forms).
- **Capstone = grand opening**: Router + Context + fetch + memo + uji + deploy JALAN BARENG. Portfolio = bukti, bukan janji!

### Langkah 0 — Siapkan Device
- Sama React W1: `npm run dev` di `5173` (+ `vitest` untuk W10).

### Cara Komputer Membaca
- CHECKLIST (router + gudang + uji + deploy) lalu URL + video.

### 3 Istilah Wajib
- 1. **Capstone/deploy**: gabung/buka

---

## Eksperimen

- **Hijau:** Tambah 2 Beras + 1 Gula → Total Rp141500?
- **Kuning:** Tambah produk `Kopi 12000` di array → muncul di daftar?
- **Merah:** Hapus `[keranjang]` dari `useMemo` → total tetap benar? Kenapa dependensi penting?

## Tantangan

****Toko React Grand Opening:** gabungkan halaman + Context + `useMemo`: tambah halaman `/checkout` (form nama + tombol Bayar → struk total + kosongkan keranjang).**

Hijau: alur Beranda→Produk→Keranjang→Checkout jalan. Kuning: 1 `vitest` tambah-keranjang hijau. Merah: deploy + video (Tugas).

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 12: **Capstone** — toko lengkap, **Selesai React 0→Ahli!**
