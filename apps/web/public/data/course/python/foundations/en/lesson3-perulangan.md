# Loops: for-first

> Python | Python Foundations | Lesson 3

## Learning Objectives

- Understand why for comes before while in Python
- Master range() and off-by-one boundaries
- Use break and continue
- Write while as the exception case (3 components)

---

## Program: Loops: for-first

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

## Explanation

## Why for First?
A synthesis of 4 decades of research (That Le 2026, covering Soloway, Mselle, Sorva, Caceffo, Lister): the "while first" tradition is C/Pascal/Java heritage. In Python, `for x in iterable` has low misconception density — deterministic, no infinite-loop misconception, and it transfers cleanly to comprehensions.

## range() and Off-by-One
`range(stop)` stops at `stop - 1` (exclusive). ACM research (2020): off-by-one errors are common and persist among students. Practice: always check boundaries — reverse iteration (`range(5, 0, -1)`) is also error-prone; deliberately trained in Experiments.

## break & continue
`break` exits the loop entirely; `continue` jumps to the next iteration. An instructor-validated misconception: many think the loop stops as soon as the condition is false — but the current body finishes first.

## while: The Exception Case
Use `while` only when iteration is not over an iterable (e.g. until a condition holds). The 3-component pattern (py4e): initialize -> condition -> update. Forgetting the update = infinite loop; StackOverflow: 90% of Python programs can be written without while.

---

## Experiments

1. **Mengapa for Duluan?**
2. **range() dan Off-by-One**
3. **break & continue**
4. **while: Kasus Pengecualian**

---

## Challenge

Build an asterisk triangle: input height (e.g. 5), show rows 1..5 with asterisks matching the row number (nested loops). Then a 1..5 x 1..5 multiplication table. Predict the output before running.

---

## Summary

for-first: for x in range/iterable first, while later. range stop is exclusive = off-by-one source. break/continue. Next: strings & lists project.
