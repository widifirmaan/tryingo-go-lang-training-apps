# Libraries & Virtual Environments

> **Kategori:** Python | **Level:** Lanjutan | **Minggu 9:** Libraries & Virtual Environments

## Tujuan Pembelajaran

- Membuat dan mengelola virtual environment (venv)
- pip: install, uninstall, freeze, requirements.txt
- Standard library: datetime, itertools, functools, os, re
- Third-party packages: requests, flask, pandas
- Struktur proyek Python modern: src layout, pyproject.toml

---

## Program: Ekosistem Python

```python

# Libraries & Virtual Environments
import sys
import json
from pathlib import Path
from datetime import datetime, timedelta
import itertools
from functools import reduce, lru_cache
import os
import re

print("=== Virtual Environment ===")
print(f"Python: {sys.version}")
print(f"Executable: {sys.executable}")
print(f"sys.path: {sys.path[:3]}...")

# Standard Library Highlights
print("\n=== Standard Library ===")

# datetime
now = datetime.now()
future = now + timedelta(days=30)
print(f"Now: {now:%Y-%m-%d %H:%M}")
print(f"30 days later: {future:%Y-%m-%d}")

# itertools
print(f"Permutations: {list(itertools.permutations('ABC', 2))}")
print(f"Combinations: {list(itertools.combinations('ABCD', 2))}")

# functools
product = reduce(lambda x, y: x * y, [1, 2, 3, 4, 5])
print(f"Reduce (product): {product}")

@lru_cache(maxsize=128)
def fib(n):
    if n < 2: return n
    return fib(n-1) + fib(n-2)
print(f"Fib(30): {fib(30)}")

# os
print(f"CWD: {os.getcwd()}")
print(f"Files: {os.listdir('.')[:5]}")

# re (regex)
text = "Email: test@example.com, Phone: +6281234567890"
emails = re.findall(r'[w.+-]+@[w-]+.[w.-]+', text)
phones = re.findall(r'+?d{10,13}', text)
print(f"Emails: {emails}")
print(f"Phones: {phones}")

# requirements.txt format
print("\n=== requirements.txt Example ===")
requirements = [
    "requests>=2.28.0",
    "flask>=2.3.0",
    "sqlalchemy>=2.0.0",
    "pytest>=7.0.0",
    "black>=23.0.0",
]
for req in requirements:
    print(f"  {req}")
    
```

---

## Konsep Kunci

### venv
`python -m venv myenv` — isolated environment. Activate: `source myenv/bin/activate` atau `myenv\Scripts\activate`.

### pip
`pip install pkg`, `pip freeze > requirements.txt`, `pip install -r requirements.txt`.

### Standard Library
`datetime` untuk tanggal, `itertools` untuk iterasi advanced, `functools` untuk functional tools, `re` untuk regex.

### Third-Party
`requests` HTTP, `flask` web framework, `pandas` data analysis, `numpy` numerik.

### Struktur Proyek
`pyproject.toml` modern config. `src/` layout. `tests/` directory.

---

## Eksperimen

- Buat venv baru dan install package
- Coba itertools: chain, product, groupby
- Buat regex untuk validasi email/phone
- Eksperimen dengan @lru_cache pada recursive function
- Buat proyek dengan pyproject.toml

---

## Tantangan

Buat proyek Python terstruktur: venv, requirements.txt, src layout, multiple modules. Install dan gunakan 3 third-party packages.

---

## Ringkasan

Minggu 9 dari 12: **Libraries & Virtual Environments** (Level: Lanjutan). Ekosistem Python yang luas. Minggu depan: **Testing & Quality**.
