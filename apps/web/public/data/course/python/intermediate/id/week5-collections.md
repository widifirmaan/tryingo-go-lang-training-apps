# Collections — Rak, Buku Alamat, dan Tas Unik

> **Kategori:** Python | **Level:** Menengah | **Minggu 5:** Collections

## Tujuan Pembelajaran

- `list` rak urut `["beras","minyak"]`, `dict` buku alamat `{"Budi": 081}`, `set` tas unik `{"beras","beras"} → {"beras"}`, `tuple` kardus kunci `(1,2)`
- `list` method `append`, `dict` `get`, `set` `add`, `tuple` tidak bisa ubah

---

## Kenapa Ini Penting Buat Kamu?

Stok warung butuh rak urut (list), harga per nama butuh buku alamat (dict), daftar kategori tanpa kembar butuh tas unik (set).

---

## Program: Koleksi Warung

```python
# List — rak urut
stok = ["beras", "minyak", "gula"]
stok.append("telur")
print(stok, "panjang", len(stok))
print("Pertama:", stok[0])

# Dict — buku alamat
harga = {"beras": 62000, "gula": 15000}
print("Harga beras:", harga["beras"])
print("Harga kopi (aman):", harga.get("kopi", 0)) # tidak error, default 0
harga["kopi"] = 12000
print(harga)

# Set — tas unik (tidak kembar)
kategori = {"Sembako", "Sayur", "Sembako"}
print("Kategori:", kategori) # {'Sembako','Sayur'}
kategori.add("Protein")
print("Setelah add:", kategori)

# Tuple — kardus kunci (tidak bisa ubah)
lokasi = (106.8, -6.2) # koordinat
print("Lokasi:", lokasi)
# lokasi[0] = 107 # ❌ error: tuple tidak bisa ubah

# Loop koleksi
for nama, h in harga.items():
    print(f"{nama}: Rp{h:,}")

# Comprehension cepat
murah = [nama for nama, h in harga.items() if h < 20000]
print("Murah:", murah)
```

---

## Konsep Kunci

### `list` vs `tuple` vs `dict` vs `set`
- `list` `[]` urut, bisa ubah
- `tuple` `()` urut, tidak bisa ubah (kunci)
- `dict` `{kunci: nilai}` cari cepat
- `set` `{}` unik, tidak kembar

### `get` Aman
`harga.get("kopi", 0)` tidak error jika tidak ada.

---

## Penjelasan untuk Pemula

### Analogi

- **List = rak**: urutan 0,1,2
- **Dict = buku alamat**: cari "Budi" → 081
- **Set = tas unik**: masukkan "beras" 2x tetap 1
- **Tuple = kardus segel**: tidak bisa ubah

---

## Tantangan

**Inventaris:** `stok = ["beras","gula","beras"]` → `set(stok)` unik? `harga = {"beras":62000}` → `harga.get("beras")` + `for k,v in harga.items()` print.

---

## Ringkasan

Minggu 5: **Koleksi** — rak, buku, tas, kardus. Minggu depan: **OOP**.
