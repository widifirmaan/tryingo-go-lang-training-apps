# Control Flow — If Score 85 Gets B?

> **Kategori:** Python | **Level:** Beginner | **Minggu 3:** Control Flow & Loops

## Learning Objectives

- Decide with `if / elif / else` (4-space indent, no `{}`)
- Short with `"Pass" if score >= 70 else "Fail"`
- Repeat with `for` + `range()`: `range(5)` = 0-4, `range(2,10,2)` = even
- Loop list: `for fruit in list:` and number `enumerate(list, 1)`
- `while` while condition, `break` exit, `continue` skip, `pass` empty
- Fast **list comprehension**: `[x**2 for x in range(5) if x%2==0]`

---

## Why This Matters (Non-IT)

Score 85 must be B without 30 manual writes. Stock must be checked one by one automatically. **Control flow = guard deciding path, loop = stamping repeatedly.**

---

## Program: Report & Stock Count

```python
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "D"
print(f"Score {score} → Grade {grade}")

status = "Pass" if score >= 70 else "Fail"
print("Status:", status)

print("\nCount 0-4:")
for i in range(5):
    print(i, end=" ")
print("\nEven 2-8:")
for i in range(2, 10, 2):
    print(i, end=" ")
print()

print("\n=== Stock ===")
fruits = ["rice", "oil", "sugar", "eggs"]
for no, name in enumerate(fruits, 1):
    print(f"{no}. {name}")

print("\n=== While ===")
left = 3
while left > 0:
    print(f"Left: {left}")
    left -= 1

print("\n=== Break & Continue ===")
for i in range(10):
    if i == 3: continue
    if i == 7: break
    print(i, end=" ")
print()

prices = [10000, 15000, 20000, 25000]
cheap = [p for p in prices if p < 20000]
up = [p * 1.1 for p in prices]
print(f"\nCheap: {cheap}")
print(f"Up 10%: {[int(x) for x in up]}")

cart = [{"name": "Rice", "price": 62000, "inStock": True}, {"name": "Sugar", "price": 15000, "inStock": False}, {"name": "Oil", "price": 34000, "inStock": True}]
total = 0
for item in cart:
    if not item["inStock"]: continue
    total += item["price"]
print(f"\nTotal buyable: Rp {total:,}")
```

---

## Key Concepts

### `if/elif/else` with Spaces
```python
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
else:
    grade = "C"
```
No `()` and `{}`, just `:` and indent.

### `range()` = Number Machine
- `range(5)` → 0,1,2,3,4
- `range(2,10,2)` → 2,4,6,8
- `range(5,0,-1)` → 5,4,3,2,1

### `for` Python Direct Item
`for fruit in ["apple","mango"]:` directly `fruit` = "apple", not index. Use `enumerate` for number.

### `break`/`continue`/`pass`
- `break` exit, `continue` skip, `pass` silent placeholder.

### List Comprehension = Express Lane
`[x**2 for x in range(5) if x%2==0]` = loop + filter 1 line, faster than `for` + `append`.

---

## Beginner Friendly Explanation

### Analogy

- **`if` = shop guard**: "If score ≥90, door A. If 80, door B."
- **`range` = queue machine**: press `range(5)` get 0-4.
- **`for fruit in list` = check shelf**: pick each item, no index needed.
- **`comprehension` = sieve + stamp at once**: filter cheap + stamp 10% in 1 sieve.

---

## Experiments

- **Green:** `score=95` → grade? `range(10,0,-2)` → ?
- **Yellow:** `even = [x for x in range(20) if x%2==0 and x>10]` → ?
- **Red:** Forget indent → `IndentationError`. Indent 4 spaces → works.

---

## Challenge

**Guess Price:** `secret= 7`, `guesses=[3,9,7]` loop `for g in guesses:` if `g==secret` → `print("Correct!")` + `break`, if `g<secret` → "Too small", else "Too big". If no correct → "Failed". Use `continue` if `g is None`.

---

## Mini Glossary

- **if/elif/else**: branch
- **range/for/while**: loops
- **enumerate**: number + item
- **comprehension**: short loop

---

## Summary

Week 3 of 12: **Control Flow & Loops** (Level: Beginner). Can decide and repeat automatically. Next: **Functions** — reusable recipes.
