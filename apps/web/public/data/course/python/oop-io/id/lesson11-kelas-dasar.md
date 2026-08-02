# Kelas & Objek

> Python | OOP & I/O | Pelajaran 11

## Tujuan Pembelajaran

- Memakai object/method sebelum mendefinisikan kelas
- Mendefinisikan class dengan __init__ dan self
- Membedakan instance vs class attribute
- Menulis methods yang memvalidasi (raise)

---

## Program: Kelas & Objek

```python
# ===== Memakai method object dulu (dot-notation) =====
kata = "tryngo"
print(f"method: {kata.upper()}")
angka = [3, 1, 2]
angka.sort()
print(f"method: {angka}")
# .append(), .split(), .strip() -- kamu sudah memakai object sejak awal!
# (MOOC.fi Part 8: "objects and methods" DULU, definisi kelas belakangan)

# ===== Mendefinisikan kelas =====
class RekeningBank:
    """Contoh standar industri (Scaler): simpanan bank."""
    mata_uang = "IDR"            # class attribute: dibagi semua instance

    def __init__(self, pemilik, saldo=0):
        self.pemilik = pemilik    # instance attribute: unik per objek
        self.saldo = saldo

    def setor(self, jumlah):
        if jumlah <= 0:
            raise ValueError("Jumlah setoran harus positif")
        self.saldo += jumlah
        return self.saldo

    def tarik(self, jumlah):
        if jumlah > self.saldo:
            raise ValueError("Saldo tidak cukup")
        self.saldo -= jumlah
        return self.saldo

    def info(self):
        return f"{self.pemilik}: Rp {self.saldo:,} ({self.mata_uang})"

# Instansiasi = memanggil kelas seperti fungsi
rekening_ayu = RekeningBank("Ayu", 500000)
rekening_budi = RekeningBank("Budi")          # saldo default 0

print(rekening_ayu.info())
rekening_ayu.setor(150000)
print(f"Setelah setor: {rekening_ayu.info()}")
rekening_ayu.tarik(200000)
print(f"Setelah tarik: {rekening_ayu.info()}")
print(rekening_budi.info())

# Class attribute dibagi; instance attribute unik
print(f"Semua pakai mata uang yang sama: {rekening_ayu.mata_uang}")

# Perangkap: tarik lebih besar dari saldo -> ValueError
try:
    rekening_budi.tarik(999999)
except ValueError as err:
    print(f"Tertangkap: {err}")

```

---

## Penjelasan

## Object & Method: Sudah Kamu Kenal
`kata.upper()`, `angka.sort()`, `teks.split()` — kamu memakai object & method sejak Pelajaran 4. MOOC.fi mengajarkan "Objects and Methods" sebagai Part 8 PERTAMA, sebelum definisi kelas: dot-notation adalah prasyarat. Riset ACM ("Some Trouble with Transparency") menemukan error OOP terbesar pemula = lupa `self` — berakar dari dot-notation yang tidak dikuasai.

## class, __init__, self
`class` = cetak biru; `__init__` menginisialisasi tiap instance baru (constructor); `self` = referensi instance saat method dipanggil — SELALU parameter pertama (konvensi, bukan keyword; jangan ganti). Instansiasi = `RekeningBank("Ayu", 500000)`.

## Instance vs Class Attribute
Instance attribute (`self.saldo`) unik per objek — didefinisikan di `__init__` (jangan di class body, kecuali immutable default). Class attribute (`mata_uang`) dibagi semua instance. Perangkap Boot.dev: mutable class attribute = versi class dari mutable default bug.

## Method & Validasi
Method = fungsi di dalam class yang beroperasi pada `self`. `setor`/`tarik` memvalidasi lalu raise ValueError — kontrak yang tegas (lanjutan L8). "Data + behavior berjalan bersama" = alasan utama OOP.

## Common Mistakes: self
Lupa `self` di parameter pertama, lupa `self.` saat mengakses attribute, mendefinisikan instance attribute di luar `__init__`, memanggil method tanpa tanda kurung. Ini error #1 pemula OOP (ACM 2016).

---

## Eksperimen

1. **Object & Method: Sudah Kamu Kenal**
2. **class, __init__, self**
3. **Instance vs Class Attribute**
4. **Method & Validasi**
5. **Common Mistakes: self**

---

## Tantangan

Buat kelas `Produk` (nama, harga, stok) dengan metode `jual(jumlah)` (validasi stok cukup), `restok(jumlah)`, dan `info()`. Buat 3 produk, lakukan transaksi, dan tampilkan daftar produk yang stoknya menipis (< 5).

---

## Ringkasan

Object/method dulu, kelas belakangan. __init__ + self, instance vs class attribute, method memvalidasi. Perangkap self. Lanjut: references & inheritance.
