# Perulangan: for-first

> Python | Foundasi Python | Pelajaran 3

## Tujuan Pembelajaran

- Memahami mengapa for lebih dulu daripada while di Python
- Menguasai range() dan boundary off-by-one
- Menggunakan break dan continue
- Menulis while sebagai kasus pengecualian (3 komponen)

---

## Program: Perulangan: for-first

```python
# ===== FOR dulu, WHILE kedua (riset: That Le 2026) =====
# Di Python, for over iterable = konstruk kanonik.
# while = pengecualian, dipelajari belakangan.

# for x in range(n): menghasilkan 0..n-1
for i in range(5):
    print(f"range(5) -> {i}")

# range(start, stop, step) -- stop EXCLUSIVE (sumber off-by-one!)
print("range(2, 8, 2):")
for i in range(2, 8, 2):
    print(" ", i)

# Iterasi atas string
for ch in "tryngo":
    print(ch, end="-")
print()

# Iterasi atas list
for buah in ["apel", "mangga", "pisang"]:
    print(f"Buah: {buah}")

# Off-by-one: range(1, 4) = 1,2,3 -- BUKAN 4!
print("range(1, 4):", list(range(1, 4)))

# break & continue
for i in range(10):
    if i == 3:
        continue          # lewati 3
    if i == 7:
        break             # berhenti di 7
    print(i, end=" ")
print()

# while = kasus pengecualian: 3 komponen wajib
i = 0                    # 1. inisialisasi
while i < 5:             # 2. kondisi
    print("while:", i)
    i += 1               # 3. update -- lupa = infinite loop!

# FizzBuzz klasik (latihan standar industri)
for n in range(1, 16):
    if n % 15 == 0:
        print("FizzBuzz")
    elif n % 3 == 0:
        print("Fizz")
    elif n % 5 == 0:
        print("Buzz")
    else:
        print(n)

```

---

## Penjelasan

## Mengapa for Duluan?
Sintesis riset 4 dekade (That Le 2026, merangkum Soloway, Mselle, Sorva, Caceffo, Lister): tradisi "while first" adalah warisan C/Pascal/Java. Di Python, `for x in iterable` punya misconception density rendah — deterministik, tanpa miskonsepsi infinite loop, dan transfer mulus ke comprehensions.

## range() dan Off-by-One
`range(stop)` berhenti di `stop - 1` (exclusive). Riset ACM (2020): off-by-one umum dan menetap di kalangan mahasiswa. Latihan: selalu cek boundary — iterasi terbalik (`range(5, 0, -1)`) juga rawan error; sengaja dilatih di Eksperimen.

## break & continue
`break` menghentikan loop sepenuhnya; `continue` melompat ke iterasi berikutnya. Misconception tervalidasi instruktur: banyak yang mengira loop berhenti segera saat kondisi false — padahal body yang sedang berjalan diselesaikan dulu.

## while: Kasus Pengecualian
Gunakan `while` hanya saat iterasi bukan atas iterable (mis. sampai kondisi terpenuhi). Pola 3 komponen (py4e): inisialisasi -> kondisi -> update. Lupa update = infinite loop; StackOverflow: 90% program Python bisa tanpa while.

---

## Eksperimen

1. **Mengapa for Duluan?**
2. **range() dan Off-by-One**
3. **break & continue**
4. **while: Kasus Pengecualian**

---

## Tantangan

Buat pola segitiga asterisk: input tinggi segitiga (mis. 5), tampilkan baris 1..5 dengan jumlah * sesuai nomor baris (nested loop). Lalu tabel perkalian 1..5 x 1..5. Prediksi output sebelum menjalankan.

---

## Ringkasan

for-first: for x in range/iterable dulu, while belakangan. range stop-exclusive = sumber off-by-one. break/continue. Lanjut: proyek strings & list.
