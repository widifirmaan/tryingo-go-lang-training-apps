# File I/O & Error Handling

> **Kategori:** Python | **Level:** Intermediate | **Minggu 7:** File I/O & Error Handling

## Learning Objectives

- Read/write files with open() and with statement
- JSON: json.dump and json.load for structured data
- CSV: csv.writer and csv.DictReader for tabular data
- pathlib.Path for modern path operations
- try/except/else/finally and custom Exception

---

## Program: File Manager

```python

# File I/O & Error Handling
import json
import csv
import os
from pathlib import Path

# Writing Files
print("=== Writing Files ===")
data = ["Python", "JavaScript", "Go", "Rust"]
with open("languages.txt", "w") as f:
    for lang in data:
        f.write(f"\n- {lang}")
print("Written: languages.txt")

# Reading Files
print("\n=== Reading Files ===")
with open("languages.txt", "r") as f:
    content = f.read()
print(f"Content:\n{content}")

with open("languages.txt", "r") as f:
    lines = f.readlines()
print(f"Lines: {len(lines)}")

# JSON
print("\n=== JSON ===")
users = [
    {"name": "Budi", "age": 25, "city": "Jakarta"},
    {"name": "Siti", "age": 23, "city": "Bandung"},
]
with open("users.json", "w") as f:
    json.dump(users, f, indent=2)

with open("users.json", "r") as f:
    loaded = json.load(f)
print(f"Loaded {len(loaded)} users")
for u in loaded:
    print(f"  {u['name']}: {u['age']}")

# CSV
print("\n=== CSV ===")
with open("data.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["Nama", "Umur", "Kota"])
    writer.writerow(["Budi", 25, "Jakarta"])
    writer.writerow(["Siti", 23, "Bandung"])

with open("data.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"  {row['Nama']}: {row['Umur']} tahun")

# Pathlib
print("\n=== Pathlib ===")
p = Path("users.json")
print(f"Exists: {p.exists()}")
print(f"Name: {p.name}")
print(f"Parent: {p.parent}")

# Error Handling
print("\n=== Error Handling ===")
def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Error: tidak bisa dibagi nol")
        return None
    except TypeError:
        print("Error: tipe data tidak valid")
        return None
    else:
        print(f"Berhasil: {a} / {b} = {result}")
        return result
    finally:
        print("  (finally selalu jalan)")

divide(10, 3)
divide(10, 0)

# Custom Exception
print("\n=== Custom Exception ===")
class ValidationError(Exception):
    def __init__(self, field, message):
        self.field = field
        self.message = message
        super().__init__(f"{field}: {message}")

def validate_age(age):
    if not isinstance(age, int):
        raise ValidationError("age", "harus integer")
    if age < 0 or age > 150:
        raise ValidationError("age", "harus 0-150")
    return True

try:
    validate_age(-5)
except ValidationError as e:
    print(f"Validation error: {e}")

# Cleanup
os.remove("languages.txt")
os.remove("users.json")
os.remove("data.csv")
print("\nCleanup done")
    
```

---

## Key Concepts

### with Statement
Auto-closes files. Safer than manual open/close.

### JSON
`json.dump(data, f)` write, `json.load(f)` read.

### CSV
`csv.writer` for writing, `csv.DictReader` for reading.

### pathlib
Modern path operations.

### Error Handling
`try/except/else/finally`. Raise and catch exceptions.

### Best Practice
Catch specific exceptions, not bare `except:`.

---

## Experiments

- Create a diary program: write and read from file
- Try json.dumps with sort_keys and indent
- Create CSV reader that filters by column
- Implement retry logic with try/except
- Build custom context manager with __enter__/__exit__

---

## Challenge

Build a contact manager: save to JSON, load from JSON, search contacts, export to CSV. Use proper error handling.

---

## Summary

Week 7 of 12: **File I/O & Error Handling** (Level: Intermediate). Robust file processing. Next week: **Decorators & Generators**.
