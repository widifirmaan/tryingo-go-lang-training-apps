# Libraries & Virtual Environments

> **Kategori:** Python | **Level:** Advanced | **Minggu 9:** Libraries & Virtual Environments

## Learning Objectives

- Create and manage virtual environments (venv)
- pip: install, uninstall, freeze, requirements.txt
- Standard library: datetime, itertools, functools, os, re
- Third-party packages: requests, flask, pandas
- Modern Python project structure: src layout, pyproject.toml

---

## Program: Python Ecosystem

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

## Key Concepts

### venv
`python -m venv myenv` — isolated environment.

### pip
Install, freeze, and manage dependencies.

### Standard Library
Powerful built-in modules.

### Third-Party
Popular packages for web, data, and more.

### Project Structure
Modern Python project layout.

---

## Experiments

- Create new venv and install packages
- Try itertools: chain, product, groupby
- Build regex for email/phone validation
- Experiment with @lru_cache on recursive functions
- Create project with pyproject.toml

---

## Challenge

Build a structured Python project: venv, requirements.txt, src layout, multiple modules. Install and use 3 third-party packages.

---

## Summary

Week 9 of 12: **Libraries & Virtual Environments** (Level: Advanced). Vast Python ecosystem. Next week: **Testing & Quality**.
