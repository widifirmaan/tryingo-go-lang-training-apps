# Tipe Data & Kondisi

> Python | Foundasi Python | Pelajaran 2

## Tujuan Pembelajaran

- Melakukan casting antar tipe (int, float, str)
- Menguasai operator aritmatika Python (//, %, **)
- Membedakan = (assignment) dan == (perbandingan)
- Menulis percabangan if/elif/else dengan logika

---

## Program: Tipe Data & Kondisi

```python
# ---- Casting: mengubah antar tipe ----
age_str = "26"
age = int(age_str)
print(f"'{age_str}' -> int {age}, tahun depan {age + 1}")

price_str = "185000"
price = float(price_str)
print(f"Harga float: {price}, diskon 10%: {price * 0.10}")

# = vs == : = menugaskan, == membandingkan
total = 100
print(f"total = 100 -> {total}")
print(f"total == 100 -> {total == 100}")

# ---- Operator aritmatika ----
a, b = 7, 2
print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b}    (selalu float)")
print(f"{a} // {b} = {a // b}   (pembagian bulat)")
print(f"{a} % {b} = {a % b}    (sisa bagi)")
print(f"{a} ** {b} = {a ** b}  (pangkat)")

# ---- Kondisi: if / elif / else ----
umur = 24
if umur < 13:
    harga = 75000
elif umur <= 25:
    harga = 125000
elif umur <= 59:
    harga = 185000
else:
    harga = 100000
print(f"Umur {umur} -> tiket Rp {harga}")

# ---- Operator logika ----
kartu_member = True
if umur <= 25 and kartu_member:
    print("Bonus: dapat minuman gratis!")
if not kartu_member:
    print("Ajak teman untuk diskon kelompok")

```

---

## Penjelasan

## Casting
`int("26")`, `float("185000")`, `str(42)` mengubah tipe secara eksplisit. Input dari `input()` selalu string — lupa cast adalah sumber TypeError paling umum untuk pemula (Springer 2023: TypeError = error terbanyak kedua).

## Operator Aritmatika
`/` selalu menghasilkan float. `//` pembagian bulat, `%` sisa bagi, `**` pangkat. Urutan operasi: kurung dulu, lalu `**`, `*`/`/`//`%`, terakhir `+`/`-`.

## = vs ==
`=` menugaskan (hanya nama variabel di kiri!), `==` membandingkan. Menulis `if harga = 100` adalah SyntaxError — kesalahan khas dari kebiasaan matematika (riset Cabo: siswa menyamakan = dengan persamaan matematika).

## if / elif / else
Satu cabang yang cocok dieksekusi, urutan atas ke bawah. `and`/`or`/`not` menggabungkan kondisi. Aturan praktis: cek kasus paling spesifik/ekstrem paling atas.

---

## Eksperimen

1. **Casting**
2. **Operator Aritmatika**
3. **= vs ==**
4. **if / elif / else**

---

## Tantangan

Buat kalkulator diskon toko: input harga asli dan tipe member (gold/silver/none). Diskon 20% gold, 10% silver. Jika total setelah diskon >= 500.000, tambah cashback 5%. Tampilkan rincian dengan f-strings.

---

## Ringkasan

Casting, operator aritmatika, = vs ==, if/elif/else + logika. Common mistakes: satu = di kondisi, lupa cast input. Lanjut: perulangan for-first.
