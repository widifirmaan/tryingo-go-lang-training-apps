# Collections — Racks, Address Books, and Unique Bags

> **Kategori:** Python | **Level:** Intermediate | **Minggu 5:** Collections
> **Prerequisites:** Week 4 — **Functions**.

## Learning Objectives

- `list` ordered rack `["rice","oil"]`, `dict` address book `{"Budi": 081}`, `set` unique bag `{"rice","rice"} → {"rice"}`, `tuple` locked box `(1,2)`
- `list` method `append`, `dict` `get`, `set` `add`, `tuple` can't change

---

## Why This Matters (Non-IT)

Shop stock needs an ordered rack (list), prices by name need an address book (dict), duplicate-free category lists need a unique bag (set).

---

## Program: Shop Collections

```python
# List — ordered rack
stock = ["rice", "oil", "sugar"]
stock.append("eggs")
print(stock, "length", len(stock))
print("First:", stock[0])

# Dict — address book
prices = {"rice": 62000, "sugar": 15000}
print("Rice price:", prices["rice"])
print("Coffee price (safe):", prices.get("coffee", 0)) # no error, default 0
prices["coffee"] = 12000
print(prices)

# Set — unique bag (no duplicates)
categories = {"Staples", "Veggies", "Staples"}
print("Categories:", categories) # {'Staples','Veggies'}
categories.add("Protein")
print("After add:", categories)

# Tuple — locked box (can't change)
location = (106.8, -6.2) # coordinates
print("Location:", location)
# location[0] = 107 # ❌ error: tuple can't change

# Loop collections
for name, p in prices.items():
    print(f"{name}: Rp{p:,}")

# Fast comprehension
cheap = [name for name, p in prices.items() if p < 20000]
print("Cheap:", cheap)
```

---

## Key Concepts

### `list` vs `tuple` vs `dict` vs `set`
- `list` `[]` ordered, changeable
- `tuple` `()` ordered, unchangeable (locked)
- `dict` `{key: value}` fast lookup
- `set` `{}` unique, no duplicates

### Safe `get`
`prices.get("coffee", 0)` no error when missing.

---

## Beginner Friendly Explanation

### Analogy

- **List = rack**: order 0,1,2
- **Dict = address book**: look up "Budi" → 081
- **Set = unique bag**: insert "rice" 2x stays 1
- **Tuple = sealed box**: can't change

### Step 0 — Prepare Device
- Python installed (`python --version`), run snippets in terminal or playground.

### How the Computer Reads It
1. `stock.append("eggs")` → adds to rack end.
2. `prices.get("coffee", 0)` → missing key → returns 0, no crash.

### 3 Must-Know Terms
1. **list/dict/set/tuple**: rack/book/bag/box

---

## Experiments

- **Green:** `stock.append("salt")` → rack grows?
- **Yellow:** `prices["tea"]` missing key → KeyError? Use `.get("tea", 0)`.
- **Red:** `location[0] = 107` → TypeError (tuple locked)? Keep locked.

---

## Challenge

**Inventory:** `stock = ["rice","sugar","rice"]` → `set(stock)` unique? `prices = {"rice":62000}` → `prices.get("rice")` + `for k,v in prices.items()` print.

---

## Mini Glossary

- **list/dict/set/tuple**: rack/book/bag/box

---

## Summary

Week 5: **Collections** — racks, books, bags, boxes. Next: **OOP**.
