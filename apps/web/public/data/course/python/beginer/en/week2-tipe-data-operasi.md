# Data Types & Operations — Numbers and Shop Text

> **Kategori:** Python | **Level:** Beginner | **Minggu 2:** Data Types & Operasi

## Learning Objectives

- Calc with `+ - * / // % **` — `/` normal vs `//` floor
- Text: `upper()`, `lower()`, `replace()`, `strip()`, `split()`
- Slice: `s[0:3]`, `s[::-1]` reverse
- Logic: `and` `or` `not` and chain `10 <= n <= 20`
- Empty `None` and check `is None` (not `==`)

---

## Why This Matters (Non-IT)

Price `17 // 5 = 3` (floor for packs), `s[::-1]` reverse code, `strip()` clean customer input typo.

---

## Program: Shop Calculator

```python
print("=== Numbers ===")
a, b = 17, 5
print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b:.2f}")
print(f"{a} // {b} = {a // b}")
print(f"{a} % {b} = {a % b}")
print(f"{a} ** {b} = {a ** b}")

price, stock = 12500, 7
total = price * stock
packs = stock // 6
left = stock % 6
print(f"\nStock {stock} → {packs} packs + {left} left → Total Rp {total:,}")

print("\n=== Text ===")
s = "  Siti's Shop  "
print(f"Original: '{s}'")
print(f"strip(): '{s.strip()}'")
print(f"upper(): '{s.strip().upper()}'")
print(f"lower(): '{s.strip().lower()}'")
print(f"replace Siti→Budi: '{s.strip().replace('Siti', 'Budi')}'")
print(f"split(): {s.strip().split()}")
print(f"'Siti' in s? {'Siti' in s}")

name = "Python"
print(f"\nSlice '{name}':")
print(f" [0:3] = {name[0:3]}")
print(f" [::2] = {name[::2]}")
print(f" [::-1] = {name[::-1]}")

print("\n=== Logic ===")
score = 85
print(f"Score {score} pass? {score >= 70}")
print(f"10 <= {score} <= 100 ? {10 <= score <= 100}")
print(f"Need and: {score >= 70 and score <= 90}")
print(f"Need or: {score < 70 or score > 90}")

print("\n=== None ===")
note = None
print(f"note is None? {note is None}")
if note is None:
    print("→ No note, show '-'")
```

---

## Key Concepts

### `/` vs `//` vs `%`
- `/` → `7/2 = 3.5`
- `//` → `7//2 = 3` (floor, for packs)
- `%` → `7%2 = 1` (remainder, odd/even)
- `**` → power

### String Methods
`upper()`, `lower()`, `strip()`, `replace()`, `split()`, `in` check

### Slicing
`s[start:end:step]` → `s[0:3]` first 3, `s[::-1]` reverse.

### `and`/`or`/`not` + Chain
`10 <= n <= 20` directly.

### `None` & `is`
`None` = intentional empty. Check with `is None`, not `== None`.

---

## Beginner Friendly Explanation

### Analogy

- **`//` = count packs**: 17 eggs `//6` = 2 packs, `%` 5 left.
- **`strip()` = wipe table**: remove edge crumbs.
- **`[::-1]` = mirror**: reverse text.
- **`and`/`or` = guard**: `and` needs 2 keys, `or` 1 enough.

---

## Experiments

- **Green:** `stock=10, packs=stock//6, left=stock%6` → ?
- **Yellow:** `"  budi  ".strip().capitalize()` → "Budi"
- **Red:** `s = "  hi  "; s.strip(); print(s)` → still spaces! Use `s = s.strip()`.

---

## Challenge

**Product Name Validation:** Input `name = "  beras  "` → `strip`, `lower`, check `len(name) >= 3`, no space? `check = " " not in name.strip()` for code without space, and `name[::-1]` for simple palindrome.

Bonus: calc delivery `total = weight*5000 + distance*2000` with `//` to round thousand.

---

## Mini Glossary

- **`/` `//` `%` `**`**: divide, floor, remainder, power
- **upper/lower/strip/replace**: text ops
- **Slicing**: `s[a:b]`
- **None/is**: empty & check

---

## Summary

Week 2 of 12: **Data Types & Operations** (Level: Beginner). Can calc packs & clean shop text. Next: **Control Flow** — decide "if 85 → B" with `if` and `for`.
