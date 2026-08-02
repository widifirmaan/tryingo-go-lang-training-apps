# Python Intro & Variables

> Python | Python Foundations | Lesson 1

## Learning Objectives

- Understand variables as labels, not boxes
- Know the 4 basic types: int, float, str, bool
- Write output with f-strings
- Understand reassignment and the meaning of quotes

---

## Program: Python Intro & Variables

```python
# Variabel adalah LABEL yang menunjuk ke sebuah nilai.
# Variabel BUKAN "kotak" yang menampung banyak nilai sekaligus.

name = "Ayu"
age = 26
height = 1.65
is_learner = True

print("Halo,", name, "!")
print(f"Umur: {age} tahun | Tinggi: {height} m | Pelajar: {is_learner}")

# Ekspresi dievaluasi saat program berjalan
print(f"Tahun depan: {age + 1}")
print(f"Umur dalam bulan: {age * 12}")

# Reassignment: nilai lama DIGANTI, bukan ditumpuk
score = 10
print(f"Score awal: {score}")
score = 20
print(f"Score baru: {score}")

# Tipe data: int, float, str, bool
print(type(42))     # <class 'int'>
print(type(3.14))   # <class 'float'>
print(type("42"))   # <class 'str'>  -- tanda kutip = string!
print(type(True))   # <class 'bool'>

```

---

## Explanation

## Variables = Labels, Not Boxes
Misconception research (Cabo, n=108) found 37% of beginners believe a variable can hold several values at once, and 34% believe values cannot be changed. In fact: `score = 10` then `score = 20` — a variable points to one value; the old value is replaced, never stacked.

## Data Types
`int` (integers), `float` (decimals), `str` (text), `bool` (True/False). Use `type()` to check. 46% of beginners misread `"2.5"` (a string!) vs `2.5` (a float) — quotes determine the type.

## f-strings
`f"..."` with `{expression}` is the only formatting approach taught in this track (StackOverflow: "show only one method, stick to it"). Avoid chained `+` and legacy `%`/`.format()`.

## Reassignment & Comments
Variable names are case-sensitive and should be descriptive (`is_learner`, not `x`). `#` comments explain "why", not "what".

---

## Experiments

1. **Variabel = Label, Bukan Kotak**
2. **Tipe Data**
3. **f-strings**
4. **Reassignment & Komentar**

---

## Challenge

Create a short profile with 4 variables (str, int, float, bool) shown with f-strings. Then predict the output before running: (1) `a = 5; a = a + 3; print(a)`, (2) `b = "5"; print(b + 3)` — explain why (2) errors (TypeError).

---

## Summary

Variables = labels to one value. 4 basic types + type(). f-strings for output. Reassignment replaces, never stacks. Next: data types & conditionals.
