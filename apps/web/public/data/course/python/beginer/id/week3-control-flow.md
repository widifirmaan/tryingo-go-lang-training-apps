# Control Flow — Jika Nilai 85 Dapat B apa?

> **Kategori:** Python | **Level:** Pemula | **Minggu 3:** Control Flow & Loops

## Tujuan Pembelajaran

- Putuskan dengan `if / elif / else` (pakai spasi menjorok 4, tanpa `{}`)
- Singkat dengan ` "Lulus" if nilai >= 70 else "Gagal"`
- Ulangi dengan `for` + `range()`: `range(5)` = 0-4, `range(2,10,2)` = genap
- Loop daftar: `for buah in daftar:` dan hitung `enumerate(daftar, 1)`
- `while` selama kondisi, `break` keluar, `continue` loncat, `pass` kosong
- Cepat dengan **list comprehension**: `[x**2 for x in range(5) if x%2==0]`

---

## Kenapa Ini Penting Buat Kamu?

Nilai 85 harus jadi B tanpa tulis manual 30x. Stok harus dicek satu per satu otomatis. **Control flow = satpam yang putuskan jalur, loop = cap stempel berulang.** Tanpa ini, kamu if manual 100 baris.

---

## Program: Rapor Warung & Hitung Stok

```python
# ── 1. If Bertingkat — seperti rapor ──
nilai = 85
if nilai >= 90:
    grade = "A"
elif nilai >= 80:  # elif = else if Python
    grade = "B"
elif nilai >= 70:
    grade = "C"
else:
    grade = "D"
print(f"Nilai {nilai} → Grade {grade}")

# Ternary Python (dibalik dari JS!)
status = "Lulus" if nilai >= 70 else "Gagal"
print("Status:", status)

# ── 2. For dengan range ──
print("\nHitung 0-4:")
for i in range(5):  # 0,1,2,3,4
    print(i, end=" ")
print("\nGenap 2-8:")
for i in range(2, 10, 2):
    print(i, end=" ")
print()

# ── 3. Loop daftar + nomor ──
print("\n=== Stok ===")
buah = ["beras", "minyak", "gula", "telur"]
for no, nama in enumerate(buah, 1):
    print(f"{no}. {nama}")

# ── 4. While — selama ada sisa ──
print("\n=== While ===")
sisa = 3
while sisa > 0:
    print(f"Sisa: {sisa}")
    sisa -= 1

# ── 5. Break & Continue — sortir apel busuk ──
print("\n=== Break & Continue ===")
for i in range(10):
    if i == 3: continue  # loncat 3
    if i == 7: break     # stop di 7
    print(i, end=" ")
print()

# ── 6. List comprehension — saring + ubah sekaligus ──
harga = [10000, 15000, 20000, 25000]
murah = [h for h in harga if h < 20000]   # saring
naik = [h * 1.1 for h in harga]           # ubah
print(f"\nMurah: {murah}")
print(f"Naik 10%: {[int(x) for x in naik]}")

# ── 7. Gabungan nyata: total belanja yang ada stok ──
keranjang = [
    {"nama": "Beras", "harga": 62000, "ada": True},
    {"nama": "Gula", "harga": 15000, "ada": False},
    {"nama": "Minyak", "harga": 34000, "ada": True},
]
total = 0
for item in keranjang:
    if not item["ada"]:
        continue
    total += item["harga"]
print(f"\nTotal yang bisa dibeli: Rp {total:,}")
```

---

## Konsep Kunci

### `if/elif/else` Pakai Spasi
```python
if nilai >= 90:
    grade = "A"  # menjorok 4 spasi
elif nilai >= 80:
    grade = "B"
else:
    grade = "C"
```
Tanpa `()` dan `{}`, cukup `:` dan menjorok.

### `range()` = Mesin Nomor
- `range(5)` → 0,1,2,3,4
- `range(2,10,2)` → 2,4,6,8
- `range(5,0,-1)` → 5,4,3,2,1

### `for` Python Langsung Barang
`for buah in ["apel","mangga"]:` langsung `buah` = "apel", tidak `i` index. Pakai `enumerate` jika butuh nomor.

### `break`/`continue`/`pass`
- `break` keluar, `continue` loncat, `pass` diam (placeholder `if True: pass`).

### List Comprehension = Jalan Tol
`[x**2 for x in range(5) if x%2==0]` = loop + filter 1 baris, lebih cepat dari `for` + `append`.

---

## Penjelasan untuk Pemula

### Analogi

- **`if` = satpam toko**: "Jika nilai ≥90, pintu A. Jika 80, pintu B."
- **`range` = mesin nomor antrian**: tekan `range(5)` keluar 0-4.
- **`for buah in daftar` = cek rak**: ambil tiap barang, tidak perlu hitung index.
- **`comprehension` = saringan + stempel sekaligus**: saring murah + stempel naik 10% dalam 1 saringan.

### Cara Komputer Membaca

1. `if nilai >=90:` → 85>=90? false → `elif 85>=80` true → `grade="B"` → **stop**, tidak cek C/D.
2. `for i in range(5): print(i)` → `i=0` cetak, `i=1` cetak, sampai 4.

### 3 Istilah Wajib

1. **elif**: else if Python
2. **range**: pembuat urutan angka
3. **Comprehension**: loop 1 baris

---

## Eksperimen

- **Hijau:** `nilai=95` → grade apa? `range(10,0,-2)` → apa?
- **Kuning:** `genap = [x for x in range(20) if x%2==0 and x>10]` → berapa?
- **Merah:** Lupa menjorok → `IndentationError`. Menjorok 4 spasi → jalan.

---

## Tantangan

**Tebak Harga:** `harga_rahasia= 7` (hardcode), `tebakan=[3,9,7]` loop `for t in tebakan:` jika `t==rahasia` → `print("Benar!")` + `break`, jika `t<rahasia` → "Kekecilan", else "Kebesaran". Jika habis loop tanpa benar → "Gagal". Pakai `continue` jika `t is None`.

---

## Glosarium Mini

- **if/elif/else**: cabang
- **range/for/while**: loop
- **enumerate**: nomor + isi
- **comprehension**: loop singkat

---

## Ringkasan

Minggu 3 dari 12: **Control Flow & Loops** (Level: Pemula). Bisa putuskan dan ulang otomatis. Minggu depan: **Functions** — resep pakai ulang.
