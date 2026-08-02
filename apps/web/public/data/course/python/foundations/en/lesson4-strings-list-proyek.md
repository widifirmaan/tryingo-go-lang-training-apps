# Project: Strings, Lists & Number Guessing

> Python | Python Foundations | Lesson 4

## Learning Objectives

- Master string slicing and the immutability concept
- Use split/join as the string-list bridge
- Understand list mutability (append, sort, pop)
- Combine loops + lists + random in one program

---

## Program: Project: Strings, Lists & Number Guessing

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

## Explanation

## Slicing
`text[start:stop:step]` — start inclusive, stop exclusive, step optional. `[::-1]` reverses. Slicing never raises IndexError (datafield.dev): out-of-range is handled silently — single indexing can error, slicing cannot.

## Immutability: A Threshold Concept
Strings cannot change in place; methods return NEW strings. This "trips up nearly every beginner" (datafield) and is the foundation for understanding references later (Glasgow research: only 2% of students got `+=` vs `append` right).

## split/join: The Strings <-> List Bridge
`.split()` breaks a string into a list; `" ".join(list)` reassembles it. The two most powerful text-processing methods — reused in the Contact Book and Expense Tracker later.

## import random
`import random` loads a stdlib module; `random.randint(a, b)` returns a random int, inclusive. Using a module early without a dedicated lesson is a valid pattern (Scaler: project #1 Number Guessing uses random in modules 1-2).

## Common Mistakes
Methods without parentheses (`s.upper` not `s.upper()`), mutating a list while iterating over it, `message[3]` out of range (IndexError), building strings with `+` inside big loops (use join).

---

## Experiments

1. **Slicing**
2. **Immutability: Threshold Concept**
3. **split/join: Jembatan Strings <-> List**
4. **import random**
5. **Common Mistakes**

---

## Challenge

Convert to the interactive version: replace the auto-guess loop with `input()` so the player guesses. Limit to 5 tries, give "too high/low" hints, show score = tries left. Bonus: keep the guess history in a list and show it at the end.

---

## Summary

Slicing & string immutability, split/join bridge, mutable lists, import random, loops+lists together. Phase 1 done: you can write full programs. Next: functions.
