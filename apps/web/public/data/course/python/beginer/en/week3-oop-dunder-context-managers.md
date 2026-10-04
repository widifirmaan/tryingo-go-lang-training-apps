# Advanced OOP, Magic Methods & Custom Context Managers

> **Kategori:** Python Backend & Automation | **Level:** Beginner | **Minggu 3:** Advanced OOP, Magic Methods & Custom Context Managers
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Structural Subtyping with `typing.Protocol` (type-safe duck typing).
- Master dunder methods `__enter__` and `__exit__`.
- Guarantee resource cleanup (sockets, DB connections, files) via the `with` statement.
- Use `@contextmanager` from `contextlib` for functional context management.

---

## Program: Resilient Financial Socket Connector with Protocols & Context Managers

```python
from typing import Protocol, runtime_checkable
from contextlib import contextmanager
import time

@runtime_checkable
class MarketFeedClient(Protocol):
    """Structural Subtyping (Duck Typing yang aman dan diverifikasi secara statis)"""
    def connect(self) -> None: ...
    def disconnect(self) -> None: ...
    def fetch_quote(self, symbol: str) -> dict: ...

class ExchangeFeedConnection:
    def __init__(self, exchange_name: str, api_key: str):
        self.exchange_name = exchange_name
        self.api_key = api_key
        self.is_connected = False

    def connect(self) -> None:
        self.is_connected = True
        print(f"[SOCKET CONNECTED] Berhasil terhubung ke WebSocket {self.exchange_name}.")

    def disconnect(self) -> None:
        self.is_connected = False
        print(f"[SOCKET DISCONNECTED] Koneksi ke {self.exchange_name} ditutup dengan aman.")

    def fetch_quote(self, symbol: str) -> dict:
        if not self.is_connected:
            raise ConnectionError("Gagal mengambil kuotasi: Socket belum terhubung!")
        return {"symbol": symbol, "bid": 10500.0, "ask": 10550.0}

    # Context Manager Protocol (with statement)
    def __enter__(self):
        self.connect()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.disconnect()
        if exc_type:
            print(f"[ERROR CAUGHT IN CONTEXT]: {exc_val}")
            return False # Teruskan exception ke atas

# Demonstrasi Penggunaan Context Manager
print("=== PENGGUNAAN CONTEXT MANAGER (WITH STATEMENT) ===")
with ExchangeFeedConnection("IDX_JAKARTA", "KEY_SECRET_99") as client:
    # Memverifikasi kepatuhan terhadap Protocol MarketFeedClient
    assert isinstance(client, MarketFeedClient)
    quote = client.fetch_quote("BBCA.JK")
    print(f"[DATA RECEIVED]: {quote}")

print("Status koneksi setelah blok 'with':", client.is_connected)
```

---

## Key Concepts

In backend systems, a primary culprit behind server degradation is **Resource Leaking** (socket handles or database connection pools left unreleased following exceptions).

### Protocols vs Abstract Base Classes
While legacy Python relied on `abc.ABC` enforcing rigid class inheritance, `typing.Protocol` (PEP 544) introduces **Structural Subtyping** (static duck typing). Any class exposing `connect`, `disconnect`, and `fetch_quote` satisfies the `MarketFeedClient` protocol without explicitly inheriting from a base class.

### Dunder Methods: __enter__ and __exit__
The `with` statement executes the context manager protocol:
1. `__enter__`: Invoked prior to entering the code block, returning the target resource bound to `as`.
2. `__exit__`: Guaranteed to run unconditionally, even during uncaught exceptions. This ensures network sockets release back to the OS cleanly.

### Exception Governance in __exit__
If `__exit__` returns `True`, exceptions raised inside the block are suppressed. If it returns `False` or `None`, Python propagates the exception upward following mandatory resource cleanup.


---

---

## Beginner Friendly Explanation

Imagine checking out a bank deposit vault key (`with` statement). Entering the vault triggers opening seals (`__enter__`). When you exit—even if the building alarms sound and you evacuate mid-task (`__exit__`)—the vault doors clamp shut automatically, protecting assets.

## Experiments

- Raise `RuntimeError("Simulasi jaringan putus!")` inside the `with` block and verify `disconnect()` runs.
- Implement an alternative context manager using the `@contextlib.contextmanager` generator decorator.
- Use `runtime_checkable` to audit third-party client conformance at runtime.

---

## Challenge

Build a `@contextmanager def measure_execution_time(task_name: str)` context manager logging elapsed time in milliseconds and warning if latency exceeds an SLA threshold.

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

You have mastered Protocol typing, dunder methods, and context managers. Next week we explore asynchronous programming with asyncio and TaskGroups.
