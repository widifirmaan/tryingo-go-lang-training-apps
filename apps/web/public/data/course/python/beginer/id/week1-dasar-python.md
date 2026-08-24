# Dasar Python & Sintaks — Buku Kas yang Bisa Hitung Sendiri

> **Kategori:** Python | **Level:** Pemula | **Minggu 1:** Dasar Python & Sintaks

## Tujuan Pembelajaran

- Memahami Python seperti kalkulator pintar yang baca baris per baris (interpreted)
- Install Python, jalankan `python hello.py` dan di VS Code
- Simpan data tanpa tulis tipe: `nama = "Budi"` langsung jadi teks
- Kenali 5 tipe: `int`, `float`, `str`, `bool`, `None`
- Gabung teks rapi dengan `f" Halo {nama}"` dan cek tipe `type()`

---

## Kenapa Ini Penting Buat Kamu?

Guru rekap nilai, warung hitung stok — semua butuh catat dan hitung. Python = **buku kas yang bisa hitung sendiri**: kamu tulis `total = harga * jumlah`, ia langsung hitung. Tidak perlu `;` atau kurung kurawal — cukup **enter & spasi**.

Hari ini kamu bikin struk warung yang sama seperti JS, tapi dengan bahasa yang lebih mirip bahasa manusia.

---

## Program: Struk Warung Python

Simpan sebagai `struk.py` → jalankan `python struk.py`

```python
# Struk Warung — mirip nota tulis tangan
print("Warung Bu Siti")
print("=" * 25)

nama_warung = "Warung Bu Siti"  # tidak perlu tulis tipe, Python tebak
pelanggan = "Budi"
beras_kg = 2                    # int
harga_per_kg = 12500
telur_kg = 1
harga_telur = 28000

total = beras_kg * harga_per_kg + telur_kg * harga_telur
print(f"Warung: {nama_warung}")
print(f"Pelanggan: {pelanggan}")
print(f"Total belanja: Rp {total:,}")  # :, = pemisah ribuan

# Cek tipe
print("\n=== Cek Tipe ===")
print(f"nama_warung: {type(nama_warung).__name__}")
print(f"beras_kg: {type(beras_kg).__name__}")
print(f"total: {type(total).__name__}")

# Gabung teks dengan f-string
struk = f"Halo {pelanggan}, totalmu Rp {total:,}. Terima kasih!"
print("\n" + struk)

# Ubah nilai
pelanggan = "Siti"
total = total + 5000  # tambah ongkir
print(f"\nSetelah ganti: {pelanggan}, Total baru: Rp {total:,}")

# Tukar tanpa bantu (keajaiban Python)
a, b = 5, 10
print(f"\nSebelum tukar: a={a}, b={b}")
a, b = b, a
print(f"Setelah tukar: a={a}, b={b}")

# Konversi
angka_str = "42"
angka_int = int(angka_str)
print(f"\n'{angka_str}' jadi angka: {angka_int} + 8 = {angka_int + 8}")
```

**Cara jalankan:**
- Install Python dari `python.org` → centang `Add python to PATH`
- VS Code → buat `struk.py` → `Run` atau Terminal `python struk.py`
- Di Tryngo playground: salin, Run

---

## Konsep Kunci

### Python = Dibaca Baris per Baris, Tanpa Tipe di Depan
`nama = "Budi"` langsung jadi `str`, `umur = 25` jadi `int`. Python tebak saat jalan (dynamically typed). Tidak perlu `string nama` seperti JS `const`.

### 5 Tipe Dasar
- `int` `25`, `float` `3.14`, `str` `"Budi"`, `bool` `True/False` (huruf kapital!), `None` (kosong)

### `f"..."` = Stempel Otomatis
`f"Halo {nama}"` — kurung kurawal isi variabel. `f"Rp {total:,}"` pakai `:,` biar `62000` jadi `62,000`.

### Indentasi = Aturan Spasi
Python tidak pakai `{}`. Blok ditentukan **spasi menjorok 4**. Salah spasi → error.

### `a, b = b, a` — Tukar Sakti
Tidak perlu `temp`. Python tukar dalam 1 baris.

---

## Penjelasan untuk Pemula

### Analogi: Buku Kas Ajaib

- **Variabel = baris buku kas**: `pelanggan = "Budi"` = tulis "Budi" di baris pelanggan.
- **Tanpa tipe = tidak perlu stempel**: kamu tulis "Budi", buku tahu itu teks. Di bahasa lain harus stempel "ini teks".
- **f-string = stempel isi otomatis**: `f"Total {total}"` = stempel yang otomatis isi angka.
- **Indentasi = margin buku**: tulisan menjorok = masih bagian bab yang sama.

### Langkah Install (Sekali)

1. `python.org` → Download → Install → **centang Add to PATH**
2. Terminal → `python --version` → `Python 3.12.x` muncul?
3. VS Code → `struk.py` → Run

### Cara Komputer Membaca

1. `beras_kg = 2` → simpan 2 di kotak `beras_kg`
2. `total = beras_kg * harga_per_kg` → ambil 2 * 12500 = 25000
3. `f"Halo {pelanggan}"` → ambil "Budi" → gabung

### 3 Istilah Wajib

1. **Variabel**: kotak berlabel
2. **f-string**: gabung teks + data pakai `f"{}"`
3. **Indentasi**: spasi penentu blok

---

## Eksperimen

- **Hijau:** Ganti `beras_kg = 5`, `pelanggan = "Andi"` → total?
- **Kuning:** `f"Diskon 10% = {total * 0.1:,}"`
- **Merah:** Lupa `f` di depan → `"{pelanggan}"` tampil mentah `{pelanggan}`. Tambah `f`.

---

## Tantangan

**Kalkulator Ongkir:** Hardcode `berat = 2.5`, `jarak = 8`, hitung `ongkir = berat*5000 + jarak*2000`, tampilkan `f"Berat {berat}kg, jarak {jarak}km → Rp {ongkir:,}"` + cek `type(ongkir).__name__`. Tambah `catatan = None` jika tanpa catatan.

---

## Glosarium Mini

- **Variabel**: kotak simpan
- **f-string**: template teks
- **int/float/str/bool/None**: jenis data
- **Indentasi**: spasi 4 ketuk

---

## Ringkasan

Minggu 1 dari 12: **Dasar Python & Sintaks** (Level: Pemula). Kamu bisa catat warung dan hitung struk dengan bahasa mirip catatan. Minggu depan: **Tipe Data & Operasi** — olah teks (upper, slice) dan hitung // % **.
