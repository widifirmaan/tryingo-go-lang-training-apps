# Proyek: Strings, List & Number Guessing

> Python | Foundasi Python | Pelajaran 4

## Tujuan Pembelajaran

- Menguasai slicing string dan konsep immutability
- Menggunakan split/join sebagai jembatan string-list
- Memahami mutability list (append, sort, pop)
- Menggabungkan loop + list + random dalam satu program

---

## Program: Proyek: Strings, List & Number Guessing

```python
import random

# ===== Strings & Lists =====
nama = "tryngo academy"
print(f"Panjang: {len(nama)} | Kapital: {nama.upper()}")
print(f"Split: {nama.split()}")

kata_kata = ["python", "belajar", "menyenangkan"]
print("Join:", " ".join(kata_kata))

teks = "   halo dunia   "
print(f"Strip: '{teks.strip()}'")
print(f"Replace: {teks.strip().replace('halo', 'hai')}")

# Slicing: [start:stop:step] -- stop EXCLUSIVE
pesan = "abcdef"
print(f"pesan[0:3] = {pesan[0:3]}")
print(f"pesan[::-1] = {pesan[::-1]} (terbalik)")
print(f"pesan[::2] = {pesan[::2]} (tiap 2 karakter)")

# String immutable: method mengembalikan string BARU
s = "abc"
s2 = s.upper()
print(f"s tetap '{s}', s2 = '{s2}'")

# List mutable: method mengubah langsung
angka = [3, 1, 4, 1, 5]
angka.append(9)
angka.sort()
print(f"List setelah append+sort: {angka}")

# ===== Number Guessing Game (simulasi auto-play) =====
# Versi interaktif memakai input(); di sini game "bermain sendiri"
# agar bisa dijalankan di preview. Strategi: bagi dua rentang.
secret = random.randint(1, 20)
tebakan = []
low, high = 1, 20
while True:
    guess = (low + high) // 2
    tebakan.append(guess)
    if guess == secret:
        break
    elif guess < secret:
        low = guess + 1
    else:
        high = guess - 1
print(f"\nAngka rahasia: {secret}")
print(f"Tebakan: {tebakan} ({len(tebakan)} langkah)")

```

---

## Penjelasan

## Slicing
`teks[start:stop:step]` — start inclusive, stop exclusive, step opsional. `[::-1]` membalik. Slicing tidak pernah melempar IndexError (datafield.dev): out-of-range ditangani diam-diam — indeks tunggal bisa error, slice tidak.

## Immutability: Threshold Concept
String tidak bisa diubah in-place; method mengembalikan string BARU. Ini "trips up nearly every beginner" (datafield) dan fondasi memahami references nanti (riset Glasgow: hanya 2% mahasiswa benar soal `+=` vs `append`).

## split/join: Jembatan Strings <-> List
`.split()` memecah string menjadi list; `" ".join(list)` menggabungkan kembali. Dua method paling powerful untuk pemrosesan teks — dipakai lagi di Contact Book dan Expense Tracker nanti.

## import random
`import random` memuat modul stdlib; `random.randint(a, b)` mengembalikan int acak inklusif. Memakai modul sejak dini tanpa lesson tersendiri adalah pola yang valid (Scaler: proyek #1 Number Guessing memakai random di modul 1-2).

## Common Mistakes
Method tanpa tanda kurung (`s.upper` bukan `s.upper()`), mengubah list saat diiterasi, `pesan[3]` di luar indeks (IndexError), memakai `+` untuk string di dalam loop besar (pakai join).

---

## Eksperimen

1. **Slicing**
2. **Immutability: Threshold Concept**
3. **split/join: Jembatan Strings <-> List**
4. **import random**
5. **Common Mistakes**

---

## Tantangan

Ubah ke versi interaktif: ganti `random.randint` dengan `input()` sehingga pemain menebak sendiri. Batasi 5 kesempatan, beri petunjuk "terlalu besar/kecil", tampilkan skor = sisa kesempatan. Bonus: simpan riwayat tebakan dalam list dan tampilkan di akhir.

---

## Ringkasan

Slicing & immutability string, split/join bridge, list mutable, import random, loop+list bersama. Fase 1 selesai: Anda bisa program utuh. Lanjut: fungsi.
