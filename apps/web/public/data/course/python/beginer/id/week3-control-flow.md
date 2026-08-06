# Control Flow & Loops

> **Kategori:** Python | **Level:** Pemula | **Minggu 3:** Control Flow & Loops

## Tujuan Pembelajaran

- If/elif/else dengan indentation sebagai pengganti kurung kurawal
- For loop dengan range() dan iterasi pada list/string/dict
- While loop dengan kondisi dan increment
- Break, continue, dan pass untuk kontrol loop
- List comprehension: [expr for x in iterable if cond]

---

## Program: Grade & Bilangan

```python

# Control Flow & Loops
print("=== If/Elif/Else ===")
nilai = 85
if nilai >= 90:
    grade = "A"
elif nilai >= 80:
    grade = "B"
elif nilai >= 70:
    grade = "C"
elif nilai >= 60:
    grade = "D"
else:
    grade = "E"
print(f"Nilai {nilai} -> Grade {grade}")

print("\n=== Ternary Expression ===")
status = "Lulus" if nilai >= 60 else "Tidak Lulus"
print(f"Status: {status}")

print("\n=== For Loop ===")
print("Range 5:")
for i in range(5):
    print(f"  {i}", end="")
print()

print("Range(2, 10, 2):")
for i in range(2, 10, 2):
    print(f"  {i}", end="")
print()

print("\n=== Loop through List ===")
buah = ["apel", "mangga", "pisang", "jeruk"]
for i, item in enumerate(buah, 1):
    print(f"  {i}. {item}")

print("\n=== While Loop ===")
n = 1
while n <= 5:
    print(f"  While: {n}")
    n += 1

print("\n=== Break & Continue ===")
for i in range(10):
    if i == 3:
        continue
    if i == 7:
        break
    print(f"  {i}", end="")
print()

print("\n=== Nested Loop (Multiplication Table) ===")
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i*j:3}", end="")
    print()

print("\n=== List Comprehension ===")
kuadrat = [x**2 for x in range(1, 6)]
genap = [x for x in range(10) if x % 2 == 0]
print(f"Kuadrat: {kuadrat}")
print(f"Genap: {genap}")
    
```

---

## Konsep Kunci

### If/Elif/Else
Indentasi (4 spasi) menentukan blok. Tidak perlu kurung kurawal atau parentheses.

### For Loop
`range(n)` = 0..n-1. `range(start, stop, step)`. Iterasi langsung pada iterable.

### enumerate
`enumerate(list, start=1)` memberikan index + value sekaligus.

### Break & Continue
`break` keluar loop, `continue` skip ke iterasi berikutnya, `pass` dummy statement.

### List Comprehension
`[x**2 for x in range(5)]` — ringkas, cepat, Pythonic.

### Ternary
`value_if_true if condition else value_if_false`.

---

## Eksperimen

- Ubah nilai dan lihat grade berubah
- Buat for loop dengan break pada kondisi tertentu
- Buat list comprehension yang filter + transform
- Implementasikan FizzBuzz dengan if/elif
- Coba nested loop untuk pola segitiga

---

## Tantangan

Buat program tebak angka: generate random 1-100, user diberi hint "lebih besar/kecil", hitung jumlah percobaan. Gunakan while loop.

---

## Ringkasan

Minggu 3 dari 12: **Control Flow & Loops** (Level: Pemula). Logika program Anda. Minggu depan: **Functions**.
