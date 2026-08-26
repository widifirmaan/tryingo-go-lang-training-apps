# OOP — Cetak Biru Warung

> **Kategori:** Python | **Level:** Menengah | **Minggu 6:** OOP

## Tujuan Pembelajaran

- `class Produk:` cetak biru, `__init__` isi awal, `self` = diri sendiri, `method` stempel

---

## Kenapa Ini Penting Buat Kamu?

50 produk tanpa cetak biru → tulis `nama, harga, stok` 50x. Dengan `class` tulis sekali, cetak 50 kartu.

---

## Program: Kartu Produk OOP

```python
class Produk:
    def __init__(self, nama, harga, stok=0):
        self.nama = nama      # self = kartu ini
        self.harga = harga
        self.stok = stok

    def info(self):
        return f"{self.nama}: Rp{self.harga:,} (stok {self.stok})"

    def diskon(self, persen):
        self.harga = int(self.harga * (1 - persen/100))

# Cetak kartu
beras = Produk("Beras 5kg", 62000, 10)
print(beras.info())
beras.diskon(10)
print("Setelah diskon:", beras.info())

# Warisan
class Member(Produk):
    def __init__(self, nama, harga, stok, poin):
        super().__init__(nama, harga, stok)
        self.poin = poin

m = Member("Gula", 15000, 5, 120)
print(m.info(), f"poin {m.poin}")
```

---

## Konsep Kunci

### `class` + `__init__` + `self`
`class` cetak biru, `__init__` isi awal, `self` kartu ini.

### Warisan `class Member(Produk)`
`Member` punya semua `Produk` + tambahan `poin`.

---

## Penjelasan untuk Pemula

### Analogi: Cetak Biru Kartu
- **class = cetak biru**, **object = kartu jadi** `Produk("Beras",62000)`.
- **self = "saya"**: `self.nama` = nama kartu ini.

---

## Tantangan

**Keranjang OOP:** `class Keranjang: def __init__(self): self.items=[]; def tambah(self, p): self.items.append(p); def total(self): return sum(i.harga*i.stok for i in self.items)`

---

## Ringkasan

Minggu 6: **OOP** — cetak biru warung. Minggu depan: **File I/O**.
