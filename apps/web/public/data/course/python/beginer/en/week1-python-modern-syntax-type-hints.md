# Modern Python 3.12+: Strict Type Hints, Dataclasses & Pattern Matching

> **Kategori:** Python Backend & Automation | **Level:** Beginner | **Minggu 1:** Modern Python 3.12+: Strict Type Hints, Dataclasses & Pattern Matching
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master modern Python 3.12+ features: strict typing, `StrEnum`, and `slots=True`.
- Use `@dataclass(frozen=True)` for memory-optimized and immutable domain data modeling.
- Apply Structural Pattern Matching (`match-case`) with conditional guards (`if`).
- Eliminate floating-point arithmetic errors in financial data using `decimal.Decimal`.

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

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

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
