# Data Types & Operasi

> **Kategori:** Python | **Level:** Pemula | **Minggu 2:** Data Types & Operasi

## Tujuan Pembelajaran

- Operator aritmatika: +, -, *, /, //, %, **
- String methods: upper, lower, replace, strip, split
- String slicing: s[start:end:step], s[::-1] reverse
- Boolean operators: and, or, not, comparison chains
- None type dan identity check dengan is operator

---

## Program: Kalkulator Data

```python

# Data Types & Operasi
print("=== Numbers ===")
a, b = 17, 5
print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b:.2f}")
print(f"{a} // {b} = {a // b}")
print(f"{a} % {b} = {a % b}")
print(f"{a} ** {b} = {a ** b}")

print("\n=== Strings ===")
s = "Python"
print(f"Length: {len(s)}")
print(f"Upper: {s.upper()}")
print(f"Lower: {s.lower()}")
print(f"Replace: {s.replace('Py', 'My')}")
print(f"Slice [0:3]: {s[0:3]}")
print(f"Slice [::2]: {s[::2]}")
print(f"Reverse: {s[::-1]}")
print(f"'th' in s: {'th' in s}")

print("\n=== Booleans ===")
x, y = 10, 20
print(f"{x} == {y}: {x == y}")
print(f"{x} != {y}: {x != y}")
print(f"{x} < {y}: {x < y}")
print(f"True and False: {True and False}")
print(f"True or False: {True or False}")
print(f"not True: {not True}")

print("\n=== Comparison Chains ===")
n = 15
print(f"10 <= {n} <= 20: {10 <= n <= 20}")

print("\n=== None ===")
hasil = None
print(f"None: {hasil}, type: {type(hasil).__name__}")
print(f"hasil is None: {hasil is None}")
    
```

---

## Konsep Kunci

### Operator Aritmatika
`/` float division, `//` floor division, `%` modulo, `**` power.

### String Methods
`upper()`, `lower()`, `replace()`, `strip()`, `split()`, `join()`.

### String Slicing
`s[start:end:step]`. `s[::-1]` reverse string. `s[::2]` setiap karakter kedua.

### Boolean & Comparison
`and`, `or`, `not`. Comparison chains: `10 <= x <= 20`.

### None & Identity
`None` = null Python. Cek dengan `is None`, bukan `== None`.

---

## Eksperimen

- Hitung BMI dengan operator aritmatika
- Balik string dengan slicing — cek palindrom
- Coba semua string methods pada teks panjang
- Buat truth table untuk and/or/not
- Eksperimen comparison chains

---

## Tantangan

Buat program validasi password: min 8 karakter, ada huruf besar, kecil, angka, simbol. Gunakan string methods dan boolean operators.

---

## Ringkasan

Minggu 2 dari 12: **Data Types & Operasi** (Level: Pemula). Fondasi manipulasi data. Minggu depan: **Control Flow**.
