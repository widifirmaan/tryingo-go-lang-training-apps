# Fungsi Lanjutan & Scope

> Python | Koleksi & Fungsi | Pelajaran 6

## Tujuan Pembelajaran

- Memahami scope lokal vs global dan aturan LEGB
- Menggunakan *args dan **kwargs
- Menulis docstring yang baik
- Memakai lambda sebagai fungsi kecil
- Menghindari perangkap mutable default

---

## Program: Fungsi Lanjutan & Scope

```python
# ===== Scope: lokal vs global =====
total = 0                      # global scope

def hitung(angka):
    total = angka * 2          # LOKAL: tidak mengubah global
    return total

print(f"Hasil fungsi: {hitung(5)}")
print(f"Global total tetap: {total}")

# LEGB: Local -> Enclosing -> Global -> Built-in
def luar():
    pesan = "dari luar"
    def dalam():
        return pesan           # membaca dari Enclosing scope
    return dalam()

print(luar())

# ===== *args dan **kwargs =====
def jumlahkan(*args):
    return sum(args)

print(f"jumlahkan(1,2,3,4) = {jumlahkan(1, 2, 3, 4)}")

def profil(**kwargs):
    return ", ".join(f"{k}={v}" for k, v in kwargs.items())

print(profil(nama="Ayu", umur=26, kota="Jakarta"))

# ===== Docstrings =====
def luas_persegi(sisi):
    """Menghitung luas persegi.

    Parameter:
        sisi (int/float): panjang sisi.
    Return:
        Luas = sisi * sisi.
    """
    return sisi * sisi

print(f"Luas: {luas_persegi(4)}")
print(f"Docstring: {luas_persegi.__doc__.strip().splitlines()[0]}")

# ===== Lambda =====
produk = [("Keyboard", 750000), ("Monitor", 3200000), ("Hub", 250000)]
produk.sort(key=lambda item: item[1])   # urutkan by harga
print("Produk termurah dulu:", produk)

# ===== Perangkap: mutable default argument =====
def tambah_item_bug(item, daftar=[]):     # BUG: default dievaluasi SEKALI
    daftar.append(item)
    return daftar

def tambah_item_aman(item, daftar=None):
    if daftar is None:
        daftar = []
    daftar.append(item)
    return daftar

print("Bug:", tambah_item_bug("a"), tambah_item_bug("b"))
print("Aman:", tambah_item_aman("a"), tambah_item_aman("b"))

```

---

## Penjelasan

## Scope & LEGB
Nama dicari dengan urutan: Local -> Enclosing -> Global -> Built-in. Variabel yang di-assign di dalam fungsi adalah lokal — tidak mengubah variabel global dengan nama sama (MOOC.fi Part 6 menempatkan materi ini satu paket dengan error handling). `global` ada, tapi saran profesional: jangan.

## *args dan **kwargs
`*args` mengumpulkan argument posisi ekstra menjadi tuple; `**kwargs` argument keyword menjadi dict. Kamu akan jarang menulisnya, tapi sering membacanya di library (print sendiri memakai `*args`).

## Docstrings
`"""..."""` tepat setelah def: tujuan, parameter, return. Bukan komentar biasa — menjadi `__doc__` dan dibaca tooling. Lalu diakses dengan `help()`.

## Lambda
`lambda x: x * 2` = fungsi satu ekspresi tanpa nama. Hanya untuk callback singkat (sort key, filter). Lebih dari satu baris? Ubah jadi `def` — keterbacaan menang. Fungsi adalah nilai: bisa disimpan, dipassing, dikembalikan.

## Perangkap: Mutable Default
Default dievaluasi SEKALI saat def. `daftar=[]` dibagi semua pemanggilan — item menumpuk misterius. Idiom benar: `daftar=None` lalu buat list baru di dalam.

---

## Eksperimen

1. **Scope & LEGB**
2. ***args dan **kwargs**
3. **Docstrings**
4. **Lambda**
5. **Perangkap: Mutable Default**

---

## Tantangan

Tulis `rata_rata(*nilai)` (return rata-rata, raise ValueError jika kosong), `filter_lebih_dari(daftar, ambang)` memakai lambda+filter, dan refactor program FizzBuzz sebelumnya menjadi fungsi `fizzbuzz(n)` yang mengembalikan list hasil.

---

## Ringkasan

Scope/LEGB, *args/**kwargs, docstrings, lambda, mutable default trap. Fungsi = nilai. Lanjut: dictionary, set & comprehensions.
