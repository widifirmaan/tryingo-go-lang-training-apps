# Python Basics — Ledger That Calculates Itself

> **Kategori:** Python | **Level:** Beginner | **Minggu 1:** Dasar Python & Sintaks

## Learning Objectives

- Understand Python like smart ledger reading line by line (interpreted)
- Install Python, run `python hello.py` and in VS Code
- Store data without type: `name = "Budi"` auto text
- Know 5 types: `int`, `float`, `str`, `bool`, `None`
- Join text neat with `f" Hello {name}"` and check `type()`

---

## Why This Matters (Non-IT)

Teacher recaps scores, shop counts stock — all need note and calc. Python = **ledger that calculates**: write `total = price * qty`, it calculates. No `;` or braces — just **enter & 4 spaces**.

Today you make same receipt as JS, but more human-like.

---

## Program: Shop Receipt Python

Save as `receipt.py` → `python receipt.py`

```python
print("Siti's Shop")
print("=" * 25)

shop = "Siti's Shop"
customer = "Budi"
rice_kg = 2
price_per_kg = 12500
eggs_kg = 1
egg_price = 28000

total = rice_kg * price_per_kg + eggs_kg * egg_price
print(f"Shop: {shop}")
print(f"Customer: {customer}")
print(f"Total: Rp {total:,}")

print("\n=== Check Type ===")
print(f"shop: {type(shop).__name__}")
print(f"rice_kg: {type(rice_kg).__name__}")
print(f"total: {type(total).__name__}")

receipt = f"Hello {customer}, your total is Rp {total:,}. Thanks!"
print("\n" + receipt)

customer = "Siti"
total = total + 5000
print(f"\nAfter switch: {customer}, New total: Rp {total:,}")

a, b = 5, 10
print(f"\nBefore swap: a={a}, b={b}")
a, b = b, a
print(f"After swap: a={a}, b={b}")

num_str = "42"
num_int = int(num_str)
print(f"\n'{num_str}' as number: {num_int} + 8 = {num_int + 8}")
```

**How to run:**
- Install Python from `python.org` → check `Add to PATH`
- VS Code → `receipt.py` → Run or `python receipt.py`
- Tryngo playground: copy, Run

---

## Key Concepts

### Python = Read Line by Line, No Type Prefix
`name = "Budi"` auto `str`, `age = 25` auto `int`. No `string name`.

### 5 Basic Types
`int` `25`, `float` `3.14`, `str` `"Budi"`, `bool` `True/False` (capital!), `None` (empty)

### `f"..."` = Auto Stamp
`f"Hello {name}"` — braces fill variable. `f"Rp {total:,}"` with `:,` makes `62000` → `62,000`.

### Indentation = Space Rule
No `{}`. Block by **4 spaces indent**. Wrong space → error.

### `a, b = b, a` — Magic Swap
No temp needed. Python swaps in 1 line.

---

## Beginner Friendly Explanation

### Analogy: Magic Ledger

- **Variable = ledger line**: `customer = "Budi"` write "Budi" on customer line.
- **No type = no stamp needed**: write "Budi", book knows text.
- **f-string = auto stamp**: `f"Total {total}"` auto fills number.
- **Indentation = book margin**: indented = still same chapter.

---

## Experiments

- **Green:** Change `rice_kg = 5`, `customer = "Andi"` → total?
- **Yellow:** `f"10% discount = {total * 0.1:,}"`
- **Red:** Forget `f` → `"{customer}"` shows raw `{customer}`. Add `f`.

---

## Challenge

**Delivery Calculator:** Hardcode `weight = 2.5`, `distance = 8`, calc `delivery = weight*5000 + distance*2000`, show `f"Weight {weight}kg, distance {distance}km → Rp {delivery:,}"` + `type(delivery).__name__`. Add `note = None` if no note.

---

## Mini Glossary

- **Variable**: labeled box
- **f-string**: `f"{}"` template
- **int/float/str/bool/None**: data types
- **Indentation**: 4-space block

---

## Summary

Week 1 of 12: **Python Basics** (Level: Beginner). You can note shop and calc receipt in human-like language. Next week: **Data Types & Operations** — text tricks (upper, slice) and `// % **` .
