# File I/O — Ledger Book in a File

> **Kategori:** Python | **Level:** Intermediate | **Minggu 7:** File I/O

## Learning Objectives

- `open("receipt.txt", "w")` write, `"r"` read, `"a"` append, `with open(...) as f:` auto close
- `json.dump` save dict to file, `json.load` read

---

## Why This Matters (Non-IT)

Shop stock only in a `list` → close laptop, gone. Save to `products.json` → reopen, still there.

---

## Program: File Ledger

```python
import json

# Write
products = [{"name": "Rice", "price": 62000}, {"name": "Spinach", "price": 5000}]
with open("products.json", "w") as f:
    json.dump(products, f, indent=2) # indent for neatness
print("Write done")

# Read
with open("products.json", "r") as f:
    data = json.load(f)
print("Read:", data)

# Append log
with open("log.txt", "a") as f:
    f.write("Add Rice\n")

# Read text
with open("log.txt", "r") as f:
    print(f.read())

# Safe: missing file / broken JSON → try/except (never crash!)
try:
    with open("products.json", "r") as f:
        data = json.load(f)
except FileNotFoundError:
    print("No file yet → start empty")
    data = []
except json.JSONDecodeError:
    print("Broken file → start empty")
    data = []
else:
    print("Read OK", len(data), "products")
finally:
    print("Check done (finally always runs)")
```

### Bonus: SQLite — Real Ledger Book (à la freeCodeCamp!)

`products.json` suffices for learning, but real stores need fast search + 10,000 rows. `sqlite3` ships WITH Python (no install!) — mini SQL in 1 file.

```python
import sqlite3

db = sqlite3.connect("shop.db")  # creates file when missing
db.execute("CREATE TABLE IF NOT EXISTS products (name TEXT, price INTEGER)")
db.execute("INSERT INTO products VALUES (?, ?)", ("Rice", 62000))  # ? = safe, anti SQL-injection!
db.execute("INSERT INTO products VALUES (?, ?)", ("Spinach", 5000))
db.commit()  # MANDATORY save!

for name, price in db.execute("SELECT name, price FROM products WHERE price < 20000"):
    print(f"Cheap: {name} Rp{price:,}")
db.close()
```

**Rule:** `with open` auto closes, no `f.close()` needed.

---

## Key Concepts

### `w`/`r`/`a`
- `w` write (erases old), `r` read, `a` append at end

### `json`
`json.dump(obj, file)` writes, `json.load(file)` reads — for `list`/`dict`.

### `try/except` = Safety Net (mandatory CS50P!)
`try` attempts → `except FileNotFoundError` catches specific → `else` on success → `finally` always runs. Order specific→general!

### `sqlite3` = SQL Without Install
`connect()` + `execute("... ? ...", (val,))` (`?` stops SQL-injection!) + mandatory `commit()` + `close()`.

---

## Beginner Friendly Explanation

### Analogy: Paper Ledger
- **`open("products.json","w")` = open writing book**, `json.dump` = write, `with` = auto close.

### Step 0 — Prepare Device
- Python + empty folder, run program, check created files.

### How the Computer Reads It
1. `json.dump(products, f)` → list becomes text in file.
2. `json.load(f)` → text becomes list again.

### 3 Must-Know Terms
1. **open/with/json**: open/auto-close/format

---

## Experiments

- **Green:** Open `products.json` in editor → readable text?
- **Yellow:** Mode `"w"` twice → old content erased? Use `"a"` to keep.
- **Red:** Forget `with` (plain `open` no close) → file locked? Use `with`.

---

## Challenge

**Shop File:** Save `cart = [{"name":"Rice","qty":2}]` to `cart.json` with `json.dump`, read back, add 1 item, write again.

---

## Mini Glossary

- **w/r/a/json**: write/read/append/format

---

## Summary

Week 7: **File Ledger** — save to `json` so nothing is lost. Next: **Decorators**.
