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
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `const / let variables`
- **Core Functionality:** Modern block-scoped variable declarations.
- **Parameters / Attributes:** `Identifier, Initial Value`.
- **System Behavior & Return:** `const` defines immutable references; `let` defines reassignable state variables bounded to enclosing blocks.
- **Practical Code Example:**
```javascript
const title = 'Tryngo Learning';
let counter = 0;
counter += 1;
console.log(title, counter);
```
- **Expected Execution Output:**
```text
Tryngo Learning 1
```

### 2. `() => { ... } (Arrow Function)`
- **Core Functionality:** Compact function expression with lexical 'this'.
- **Parameters / Attributes:** `Parameters, Function Body`.
- **System Behavior & Return:** Provides concise function syntax while retaining the lexical `this` binding of the outer enclosing scope.
- **Practical Code Example:**
```javascript
const double = (n) => n * 2;
console.log(double(21));
```
- **Expected Execution Output:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Core Functionality:** Linear asynchronous Promise resolution.
- **Parameters / Attributes:** `URL string, RequestInit options`.
- **System Behavior & Return:** Author asynchronous asynchronous workflows sequentially without callback pyramids.
- **Practical Code Example:**
```javascript
async function getUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return await res.json();
}
```
- **Expected Execution Output:**
```text
Returns resolved JSON object from server
```

### 4. `Array.prototype.map() / filter()`
- **Core Functionality:** Pure functional array transformation.
- **Parameters / Attributes:** `callback(item, index, array)`.
- **System Behavior & Return:** `map` returns transformed values; `filter` removes non-matching elements without mutating the original array.
- **Practical Code Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);
```
- **Expected Execution Output:**
```text
[2, 4]
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
