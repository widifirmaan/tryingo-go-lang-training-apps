# File I/O & Error Handling

> **Kategori:** Python | **Level:** Menengah | **Minggu 7:** File I/O & Error Handling

## Tujuan Pembelajaran

- Membaca/menulis file dengan open() dan with statement
- JSON: json.dump dan json.load untuk structured data
- CSV: csv.writer dan csv.DictReader untuk tabular data
- pathlib.Path untuk operasi path modern
- try/except/else/finally dan custom Exception

---

## Program: Manajemen File

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

## Konsep Kunci

### with Statement
Auto-close file. Lebih aman daripada manual open/close.

### JSON
`json.dump(data, f)` write, `json.load(f)` read. `json.loads(string)` dari string.

### CSV
`csv.writer` untuk write, `csv.DictReader` untuk read sebagai dict.

### pathlib
`Path("file.txt")`. Method: `exists()`, `read_text()`, `write_text()`, `glob()`.

### Error Handling
`try/except/else/finally`. `raise Exception()`. Custom exception extends `Exception`.

### Best Practice
Catch specific exceptions, bukan bare `except:`.

---

## Eksperimen

- Buat program catatan harian: tulis dan baca dari file
- Coba json.dumps dengan sort_keys dan indent
- Buat CSV reader yang filter berdasarkan kolom
- Implementasikan retry logic dengan try/except
- Buat context manager sendiri dengan __enter__/__exit__

---

## Tantangan

Buat program manajemen kontak: simpan ke JSON, load dari JSON, cari kontak, export ke CSV. Gunakan error handling yang proper.

---

## Ringkasan

Minggu 7 dari 12: **File I/O & Error Handling** (Level: Menengah). Robust file processing. Minggu depan: **Decorators & Generators**.
