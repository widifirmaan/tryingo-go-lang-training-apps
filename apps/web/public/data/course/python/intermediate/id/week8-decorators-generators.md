# Decorators & Generators — Stempel dan Antrian

> **Kategori:** Python | **Level:** Menengah | **Minggu 8:** Decorators & Generators

## Tujuan Pembelajaran

- `decorator` = stempel di fungsi — `@catat` log sebelum/ sesudah
- `generator` `yield` = antrian: beri 1, tunggu, beri lagi (hemat RAM)

---

## Kenapa Ini Penting Buat Kamu?

Warung ingin `hitungTotal` otomatis log "mulai" dan "selesai" tanpa tulis `print` di tiap fungsi — decorator stempel sekali untuk semua.

---

## Program

```python
# Decorator = stempel
def catat(func):
    def bungkus(*args, **kwargs):
        print(f"Mulai {func.__name__}")
        hasil = func(*args, **kwargs)
        print(f"Selesai {func.__name__}: {hasil}")
        return hasil
    return bungkus

@catat
def hitung(a, b):
    return a + b

print(hitung(2, 3))

# Generator = antrian hemat
def antrian_produk(daftar):
    for p in daftar:
        print(f"Siapkan {p}")
        yield p  # beri 1, pause, lanjut saat next()

for item in antrian_produk(["Beras", "Bayam", "Telur"]):
    print("Kirim:", item)

# Hemat RAM: range(1_000_000) tidak buat list 1jt, tapi yield 1 per 1
```

---

## Konsep Kunci

### Decorator `@catat`
Fungsi yang bungkus fungsi lain — tambah log tanpa ubah isi.

### Generator `yield`
`return` sekali habis, `yield` beri 1, jeda, beri lagi — untuk 1jt produk hemat.

---

## Penjelasan untuk Pemula

### Analogi

- **Decorator = stempel**: tempel `@catat` di resep, otomatis cap "Mulai/Selesai".
- **Generator = antrian warung**: panggil 1, layani 1, panggil lagi.

---

## Tantangan

**Stempel Waktu:** Buat `@timer` yang `start = time.time()` sebelum `func` dan `print(time.time()-start)` sesudah. Pakai di `hitung(a,b)`.

---

## Ringkasan

Minggu 8: **Stempel & Antrian** — decorator & generator. Selesai Intermediate Python!
