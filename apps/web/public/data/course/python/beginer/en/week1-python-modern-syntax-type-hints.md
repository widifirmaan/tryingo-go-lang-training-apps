# Modern Python 3.12+: Strict Type Hints, Dataclasses & Pattern Matching

> **Kategori:** Python Backend & Automation | **Level:** Beginner | **Minggu 1:** Modern Python 3.12+: Strict Type Hints, Dataclasses & Pattern Matching
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master modern Python 3.12+ features: strict typing, `StrEnum`, and `slots=True`.
- Use `@dataclass(frozen=True)` for memory-optimized and immutable domain data modeling.
- Apply Structural Pattern Matching (`match-case`) with conditional guards (`if`).
- Eliminate floating-point arithmetic errors in financial data using `decimal.Decimal`.

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **Python for VS Code** (`ms-python.python`): Official Python support: debugger, linter, and autocomplete
- **Ruff** (`charliermarsh.ruff`): Ultra-fast Rust-based Python linter and formatter

Or install all recommended extensions at once via terminal:
```bash
code --install-extension ms-python.python --install-extension charliermarsh.ruff
```

---

### 2. Runtime & Dependency Installation (Python 3.12+)
Make sure the required runtime or SDK is installed on your machine:

**Windows (PowerShell):**
```powershell
winget install Python.Python.3.12
```

**macOS (Terminal / Homebrew):**
```bash
brew install python@3.12
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install python3 python3-pip python3-venv
```

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
python --version || python3 --version
```

Expected output:
```output
Python 3.12.x
```

> 💡 **Prerequisite Note:** Ensure "Add python.exe to PATH" is checked when using the Windows graphical installer.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
mkdir my-python-app && cd my-python-app
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
```
- **Details:** The virtual environment isolates project packages from global system packages.
- **Navigate to the project directory:**
```bash
cd my-python-app
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
python main.py
```
Open in browser or terminal: `Terminal Console`

> ℹ️ Code runs immediately via the Python interpreter.

**Initial Entry File (`main.py`):**
```py
import sys
from datetime import datetime

def greet(name: str) -> str:
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return f"🐍 Halo {name}! Waktu server: {now} (Python {sys.version.split()[0]})"

if __name__ == "__main__":
    print(greet("Developer"))
```
Python script utilizing modern type annotations and datetime.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
my-python-app/
├── .venv/               # Virtual environment isolasi package
├── src/
│   └── main.py          # Entrypoint program
├── requirements.txt     # Daftar package dependensi
└── pyproject.toml       # Metadata konfigurasi modern
```
Modern Python project layout featuring venv isolation.

---

### 6. Beginner Tips & Best Practices
- Run `pip freeze > requirements.txt` to lock project dependencies.
- Try `uv` (`pip install uv`) as an ultra-fast drop-in replacement for standard pip.

---

## Program: Financial Market Modeling with Type Annotations & Match Statements

```python
from dataclasses import dataclass
from decimal import Decimal
from datetime import datetime, timezone
from enum import StrEnum
from typing import Final

class AssetClass(StrEnum):
    EQUITY = "EQUITY"
    CRYPTO = "CRYPTO"
    COMMODITY = "COMMODITY"
    FOREX = "FOREX"

@dataclass(frozen=True, slots=True)
class MarketTick:
    symbol: str
    price: Decimal
    volume: int
    asset_class: AssetClass
    timestamp: datetime = datetime.now(timezone.utc)

def evaluate_market_signal(tick: MarketTick) -> str:
    # Python 3.10+ Structural Pattern Matching with Guards
    match tick:
        case MarketTick(symbol=s, price=p, asset_class=AssetClass.CRYPTO) if p > Decimal("100000.00"):
            return f"[HIGH VOLATILITY] Crypto {s} broke $100k barrier! Price: ${p:,.2f}"
        case MarketTick(symbol=s, volume=v) if v >= 1_000_000:
            return f"[WHALE ALERT] Massive volume surge ({v:,} units) detected on {s}."
        case MarketTick(symbol=s, price=p):
            return f"[NORMAL] {s} traded at ${p:,.2f} with volume {tick.volume:,}."
        case _:
            return "[UNKNOWN] Unrecognized market payload format."

# Demonstrasi Eksekusi
btc_tick = MarketTick(
    symbol="BTC-USD",
    price=Decimal("104250.50"),
    volume=4200,
    asset_class=AssetClass.CRYPTO
)

bbca_tick = MarketTick(
    symbol="BBCA.JK",
    price=Decimal("10150.00"),
    volume=2_500_000,
    asset_class=AssetClass.EQUITY
)

print(evaluate_market_signal(btc_tick))
print(evaluate_market_signal(bbca_tick))
```

---

## Key Concepts

Python has evolved far beyond a casual dynamically typed scripting tool. In contemporary backend engineering, Python 3.12+ delivers exceptional expressiveness, strict type safety, and dramatic memory efficiencies.

### Type Annotations and Static Verification
Declaring annotations such as `symbol: str` and `price: Decimal` enables ahead-of-time auditing via static type checkers like **Mypy** or **Pyright**. This eradicates common runtime catastrophes like `AttributeError: 'NoneType' object has no attribute`.

### Dataclasses with Slots
The `@dataclass(frozen=True, slots=True)` decorator delivers two crucial capabilities:
1. `frozen=True`: Guarantees immutability across market models, preventing accidental mutations across concurrent pipelines.
2. `slots=True`: Replaces the default dynamic dictionary (`__dict__`) with compact C-level pointer arrays, reducing RAM consumption by 40-50% across high-volume time-series datasets.

### Structural Pattern Matching
Python's `match-case` enables deep structural destructuring. Rather than cascading brittle `if-elif` ladders, pattern matching extracts object attributes inline (`case MarketTick(symbol=s, price=p)`) while enforcing conditional guard predicates.


---

---

## Beginner Friendly Explanation

Imagine you are an exchange floor clerk receiving stock price sheets. If the sheet is sealed in an impermeable plastic laminate (dataclass frozen), nobody can tamper with the numbers using a pen. And you possess an automated sorting chute (match-case) that immediately diverts mega-volume trades to the chief auditor desk.

## Experiments

- Attempt mutating `btc_tick.price = Decimal("200000")` and observe Python raising a `FrozenInstanceError`.
- Introduce a new enum `AssetClass.BOND` and author a dedicated pattern matching clause.
- Apply the walrus operator `:=` within an if condition to compute volume velocity inline.

---

## Challenge

Build a `calculate_vwap(ticks: list[MarketTick]) -> Decimal` function computing Volume-Weighted Average Price with high precision without mutating the input list.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────────────────────────────────────────────────┐
│ SIKLUS EKSEKUSI PYTHON MODERN                            │
│                                                          │
│ Kode Sumber (.py)                                        │
│       │                                                  │
│       ▼ Bytecode Compiler                                │
│ File Cache (.pyc)                                        │
│       │                                                  │
│       ▼ Python Virtual Machine (PVM)                     │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ Global Interpreter Lock (GIL) / Memory Heap Manager  │ │
│ │ • Automatic Reference Counting + Cyclic Garbage Coll │ │
│ │ • Asyncio Event Loop untuk I/O Asinkron              │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `def fn(param: int) -> str:`
- **Core Functionality:** Definisi fungsi dengan type hinting modern.
- **Parameters / Attributes:** `Parameter list, Type Annotations, Return Type`.
- **System Behavior & Return:** Mendeklarasikan fungsi dengan dokumentasi tipe data statis yang diverifikasi linter..
- **Practical Code Example:**
```python
def calculate_tax(price: float, rate: float = 0.11) -> float:
    return round(price * rate, 2)
print(calculate_tax(100000.0))
```
- **Expected Execution Output:**
```output
11000.0
```

### 2. `[x * 2 for x in items if x > 0]`
- **Core Functionality:** List & Dictionary Comprehension.
- **Parameters / Attributes:** `Mapping expression, Iterable, Filter predicate`.
- **System Behavior & Return:** Mentransformasi dan menyaring elemen koleksi secara ekspresif dalam 1 baris kode yang cepat..
- **Practical Code Example:**
```python
numbers = [1, 2, 3, 4, 5, 6]
evens_squared = [n ** 2 for n in numbers if n % 2 == 0]
print(evens_squared)
```
- **Expected Execution Output:**
```output
[4, 16, 36]
```

### 3. `with open(filename, 'r') as f:`
- **Core Functionality:** Pengelola Konteks Otomatis (Context Manager).
- **Parameters / Attributes:** `Resource target, alias as`.
- **System Behavior & Return:** Guarantees pembersihan resource (seperti menutup file atau koneksi DB) secara otomatis setelah blok selesai..
- **Practical Code Example:**
```python
with open('data.txt', 'w') as f:
    f.write('Tryngo Platform')
# File otomatis ditutup dengan aman di sini
```
- **Expected Execution Output:**
```output
File tersimpan dan resource ditutup aman
```

### 4. `async def & await asyncio.gather(*tasks)`
- **Core Functionality:** Konkurensi asinkron non-blocking.
- **Parameters / Attributes:** `Coroutines, asyncio Event Loop`.
- **System Behavior & Return:** Mengeksekusi banyak panggilan I/O jaringan secara paralel tanpa thread blocking..
- **Practical Code Example:**
```python
import asyncio
async def fetch_api(n):
    await asyncio.sleep(0.1)
    return f'Hasil {n}'
# asyncio.run(fetch_api(1))
```
- **Expected Execution Output:**
```output
Coroutines tereksekusi tanpa memblokir thread utama
```

---

## Common Pitfalls & Debugging Tips

### 1. Mutable Default Arguments
- **Symptom / Issue:** Default list or dict parameters persist modifications across successive function calls.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Assign `None` as default: `def fn(items=None): if items is None: items = []`.

### 2. Accidental Variable Scope Errors
- **Symptom / Issue:** Throws `UnboundLocalError: local variable referenced before assignment`.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Pass variables explicitly through arguments and return values rather than mutating globals.

### 3. Catch-All `except:` Clauses
- **Symptom / Issue:** Suppresses critical syntax errors, interrupts, and crashes silently.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always catch explicit exceptions: `except ValueError as err:`.

---

## Summary

You have mastered modern Python 3.12+ features: type hints, slots dataclasses, and pattern matching. Next week we explore advanced data structures and functional pipelines.
