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
```

**Rule:** `with open` auto closes, no `f.close()` needed.

---

## Key Concepts

### `w`/`r`/`a`
- `w` write (erases old), `r` read, `a` append at end

### `json`
`json.dump(obj, file)` writes, `json.load(file)` reads — for `list`/`dict`.

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
