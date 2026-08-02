# Data Types & Conditionals

> Python | Python Foundations | Lesson 2

## Learning Objectives

- Cast between types (int, float, str)
- Master Python arithmetic operators (//, %, **)
- Distinguish = (assignment) from == (comparison)
- Write if/elif/else branching with logic

---

## Program: Data Types & Conditionals

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

## Explanation

## Casting
`int("26")`, `float("185000")`, `str(42)` convert types explicitly. Input from `input()` is always a string — forgetting to cast is the most common TypeError source for beginners (Springer 2023: TypeError is the 2nd most common error).

## Arithmetic Operators
`/` always produces a float. `//` floor division, `%` remainder, `**` power. Precedence: parentheses first, then `**`, `*`/`/`//`%`, finally `+`/`-`.

## = vs ==
`=` assigns (only a variable name on the left!), `==` compares. Writing `if price = 100` is a SyntaxError — a classic habit from math class (Cabo's research: students equate = with math equality).

## if / elif / else
The first matching branch runs, top to bottom. `and`/`or`/`not` combine conditions. Rule of thumb: check the most specific/extreme case first.

---

## Experiments

1. **Casting**
2. **Operator Aritmatika**
3. **= vs ==**
4. **if / elif / else**

---

## Challenge

Build a shop discount calculator: original price and member tier (gold/silver/none). 20% off gold, 10% silver. If the discounted total is >= 500,000, add 5% cashback. Show details with f-strings.

---

## Summary

Casting, arithmetic operators, = vs ==, if/elif/else + logic. Common mistakes: single = in conditions, forgetting to cast input. Next: for-first loops.
