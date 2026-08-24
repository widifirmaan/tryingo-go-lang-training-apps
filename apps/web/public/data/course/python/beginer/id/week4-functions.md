# Functions — Resep Warung Pakai Ulang

> **Kategori:** Python | **Level:** Pemula | **Minggu 4:** Functions & Modules

## Tujuan Pembelajaran

- Bikin resep dengan `def nama():` — tulis sekali, pakai 100x
- Kirim bahan **parameter**, dapat hasil **return**
- Bahan cadangan `nama="Tamu"` dan borong `*angka`
- Pintas `lambda x: x**2` dan alat bawaan `map`, `filter`, `sorted`, `sum`
- Ambil alat orang lain `import math`, `from datetime import datetime`

---

## Kenapa Ini Penting Buat Kamu?

Resep "hitung total + ongkir" dipakai 30x sehari. Tanpa fungsi, tulis rumus 30x. Dengan `def hitung_total(belanja):` tulis sekali, panggil `hitung_total(keranjang_A)`. Warung tidak ada yang tulis ulang resep tiap masak.

---

## Program: Dapur Fungsi Warung

```python
# ── 1. Fungsi dasar — resep sapa ──
def sapa(nama, greeting="Halo"):
    """Sapa dengan sapaan yang bisa ganti."""
    return f"{greeting}, {nama}!"

print(sapa("Budi"))               # Halo, Budi!
print(sapa("Siti", "Selamat pagi")) # Selamat pagi, Siti!

# ── 2. Return banyak — seperti kembalian + bon ──
def hitung(a, b):
    return a + b, a - b, a * b   # return 3 nilai → tuple

jumlah, selisih, kali = hitung(10, 3)
print(f"\nJumlah {jumlah}, Selisih {selisih}, Kali {kali}")

# ── 3. *angka — terima berapa pun (seperti karung) ──
def total(*angka):
    return sum(angka)

print("\nTotal:", total(1, 2, 3, 4, 5))  # borong!

# ── 4. Lambda — resep kilat 1 baris ──
kuadrat = lambda x: x ** 2
print(f"Kuadrat 5 = {kuadrat(5)}")

# ── 5. Map & Filter dengan lambda — saring rak ──
harga = [10000, 15000, 20000, 25000]
naik = list(map(lambda h: h * 1.1, harga))          # ubah tiap item
murah = list(filter(lambda h: h < 20000, harga))    # saring
print(f"\nNaik 10%: {[int(x) for x in naik]}")
print(f"Murah: {murah}")

# ── 6. Alat bawaan — tidak usah bikin sendiri ──
angka = [3, 1, 4, 1, 5, 9]
print(f"\nSorted: {sorted(angka)}")
print(f"Sum: {sum(angka)}, Max: {max(angka)}")

# ── 7. Import — pinjam alat tetangga ──
import math
print(f"\nPi: {math.pi:.4f}, Akar 144: {math.sqrt(144)}")

# ── 8. Contoh nyata warung ──
def hitung_total(belanja, diskon=0):
    """belanja = list dict {harga, qty}, diskon persen."""
    total = sum(item["harga"] * item["qty"] for item in belanja)
    return total * (1 - diskon/100)

keranjang = [{"harga": 62000, "qty": 1}, {"harga": 5000, "qty": 2}]
print(f"\nTotal tanpa diskon: Rp {hitung_total(keranjang):,}")
print(f"Diskon 10%: Rp {hitung_total(keranjang, 10):,}")
```

---

## Konsep Kunci

### `def` = Tulis Resep
```python
def sapa(nama):
    return f"Halo {nama}"
```
Panggil `sapa("Budi")` → dapat `"Halo Budi"`. Tanpa `return` → `None`.

### Parameter Fleksibel
- Default: `def sapa(nama="Tamu")`
- `*angka` → tampung banyak positional jadi tuple
- `**info` → tampung banyak keyword jadi dict (jangan dulu jika bingung, cukup `*`)

### Lambda & Map/Filter
- `lambda x: x*2` resep kilat untuk `map`/`filter`
- `map(lambda, list)` ubah, `filter(lambda, list)` saring

### Import
`import math` → `math.sqrt(144)`, `from datetime import datetime` → langsung `datetime.now()`

---

## Penjelasan untuk Pemula

### Analogi: Resep Dapur

- **Fungsi = resep**: tulis "soto: ayam + bumbu → rebus" sekali, masak 100x `soto(ayam)`.
- **Parameter = bahan**, **return = hidangan**
- **`*angka` = karung**: muat berapa pun.
- **Lambda = coretan cepat**: bukan buku resep tebal, hanya sticky note `x*2`.

### Cara Komputer Membaca

1. `def kuadrat(x): return x**2` → simpan resep `kuadrat`
2. `kuadrat(5)` → ambil resep, isi `x=5` → `25` → kembalikan

### 3 Istilah Wajib

1. **Fungsi**: blok resep
2. **Return**: hasil kembalikan
3. **Import**: pinjam alat

---

## Eksperimen

- **Hijau:** `def sapa_warung(nama): return f"Selamat datang {nama}"` → panggil 2x
- **Kuning:** `total(10,20,30)` → berapa? `hitung_total(keranjang, 20)` diskon 20%
- **Merah:** Lupa `return` → hasil `None`. Tambah `return` → benar

---

## Tantangan

**Warung Otomatis:** Buat 3 fungsi:
1. `subtotal(keranjang)` → total tanpa diskon
2. `ongkir(berat, jarak)` → `berat*5000 + jarak*2000`
3. `cetak_struk(keranjang, jarak)` → gabung 1+2 + `sapa(nama)` return string
Panggil 2 keranjang beda untuk buktikan pakai ulang.

---

## Glosarium Mini

- **def/return**: buat & kembalikan
- **lambda**: fungsi 1 baris
- **map/filter**: olah daftar
- **import**: pinjam modul

---

## Ringkasan

Minggu 4 dari 12: **Functions & Modules** (Level: Pemula). Punya resep pakai ulang. **Selesai Beginner Python!** Minggu depan: **Collections** — list, dict, set untuk stok warung.
