# Data Types & Operasi — Olah Angka dan Teks Warung

> **Kategori:** Python | **Level:** Pemula | **Minggu 2:** Data Types & Operasi

## Tujuan Pembelajaran

- Hitung dengan `+ - * / // % **` — beda `/` (bagi biasa) vs `//` (bagi bulat)
- Olah teks: `upper()`, `lower()`, `replace()`, `strip()`, `split()`
- Potong teks: `s[0:3]`, `s[::-1]` balikkan
- Logika: `and` `or` `not` dan rantai `10 <= n <= 20`
- Kosong `None` dan cek `is None` (bukan `==`)

---

## Kenapa Ini Penting Buat Kamu?

Harga `17 // 5 = 3` (bagi bulat untuk hitung dos), `s[::-1]` balikkan kode, `strip()` bersihkan spasi input pelanggan yang typo. Tanpa ini, teks berantakan, hitungan dos salah.

---

## Program: Kalkulator Toko

```python
print("=== Angka ===")
a, b = 17, 5
print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b:.2f}")  # bagi biasa → 3.40
print(f"{a} // {b} = {a // b}")    # bagi bulat → 3 (untuk dos)
print(f"{a} % {b} = {a % b}")      # sisa → 2 (untuk cek ganjil/genap)
print(f"{a} ** {b} = {a ** b}")    # pangkat

# Contoh warung: harga total dan dos
harga, stok = 12500, 7
total = harga * stok
dos = stok // 6  # 1 dos isi 6
sisa = stok % 6
print(f"\nStok {stok} → {dos} dos + sisa {sisa} → Total Rp {total:,}")

print("\n=== Teks ===")
s = "  Warung Bu Siti  "
print(f"Asli: '{s}'")
print(f"strip(): '{s.strip()}'")            # buang spasi ujung
print(f"upper(): '{s.strip().upper()}'")
print(f"lower(): '{s.strip().lower()}'")
print(f"replace Bu→Pak: '{s.strip().replace('Bu', 'Pak')}'")
print(f"split(): {s.strip().split()}")     # jadi list
print(f"'Siti' di dalam? {'Siti' in s}")

nama = "Python"
print(f"\nPotong '{nama}':")
print(f" [0:3] = {nama[0:3]}")   # Pyt
print(f" [::2] = {nama[::2]}")   # Pto (loncat 2)
print(f" [::-1] = {nama[::-1]}") # nohtyP (balik)

print("\n=== Logika ===")
nilai = 85
print(f"Nilai {nilai} lulus? {nilai >= 70}")
print(f"10 <= {nilai} <= 100 ? {10 <= nilai <= 100}")  # rantai, enak!
print(f"Butuh and: {nilai >= 70 and nilai <= 90}")
print(f"Butuh or: {nilai < 70 or nilai > 90}")

print("\n=== None ===")
catatan = None
print(f"catatan is None? {catatan is None}")  # pakai is, bukan ==
if catatan is None:
    print("→ Belum ada catatan, tampilkan '-'")
```

---

## Konsep Kunci

### `/` vs `//` vs `%`
- `/` → `7/2 = 3.5` (koma)
- `//` → `7//2 = 3` (bulat bawah, untuk dos)
- `%` → `7%2 = 1` (sisa, untuk ganjil/genap)
- `**` → pangkat

### String Methods
`upper()`, `lower()`, `strip()` (buang spasi), `replace("lama","baru")`, `split()` (pecah jadi list), `in` (cek ada)

### Slicing
`s[start:end:step]` → `s[0:3]` 3 huruf pertama, `s[::-1]` balik.

### `and`/`or`/`not` + Rantai
`10 <= n <= 20` langsung, tidak perlu `n>=10 and n<=20`.

### `None` & `is`
`None` = kosong sengaja. Cek pakai `is None`, bukan `== None` (aturan Python).

---

## Penjelasan untuk Pemula

### Analogi

- **`//` = hitung dos**: 17 telur `//6` = 2 dos, sisa `%` 5 butir.
- **`strip()` = lap meja**: hapus remah spasi ujung.
- **`[::-1]` = kaca spion**: balikkan tulisan.
- **`and`/`or` = satpam**: `and` butuh 2 kunci, `or` 1 kunci cukup.

### Cara Komputer Membaca

1. `s.strip()` → buat teks baru tanpa spasi ujung, `s` asli tetap (string tidak berubah, harus `s = s.strip()` jika mau simpan).
2. `nama[0:3]` → ambil index 0,1,2.

### 3 Istilah Wajib

1. **`//`**: bagi bulat
2. **Slicing**: potong teks
3. **`is None`**: cek kosong

---

## Eksperimen

- **Hijau:** `stok=10, dos=stok//6, sisa=stok%6` → berapa?
- **Kuning:** `nama="  budi  ".strip().capitalize()` → "Budi"
- **Merah:** `s = "  halo  "; s.strip(); print(s)` → masih spasi! Ganti `s = s.strip()`.

---

## Tantangan

**Validasi Nama Produk:** Input `nama = "  beras  "` → `strip`, `lower`, cek `len(nama) >= 3`, ada spasi? `cek = " " not in nama.strip()` untuk kode tanpa spasi, dan `nama[::-1]` untuk cek palindrom sederhana.

Bonus: hitung ongkir `total = berat*5000 + jarak*2000` dengan `//` untuk bulatkan ribu.

---

## Glosarium Mini

- **`/` `//` `%` `**`**: bagi, bagi bulat, sisa, pangkat
- **upper/lower/strip/replace**: olah teks
- **Slicing**: `s[a:b]`
- **None/is**: kosong & ceknya

---

## Ringkasan

Minggu 2 dari 12: **Data Types & Operasi** (Level: Pemula). Bisa hitung dos & olah teks warung. Minggu depan: **Control Flow** — putuskan "jika nilai 85 → B" dengan `if` dan `for`.
