# Functions — Reusable Shop Recipes

> **Kategori:** Python | **Level:** Beginner | **Minggu 4:** Functions & Modules

## Learning Objectives

- Make recipe with `def name():` — write once, use 100x
- Send ingredients **parameter**, get result **return**
- Default `name="Guest"` and bulk `*numbers`
- Shortcut `lambda x: x**2` and built-ins `map`, `filter`, `sorted`, `sum`
- Borrow others' tools `import math`, `from datetime import datetime`

---

## Why This Matters (Non-IT)

Recipe "total + delivery" used 30x a day. Without function, write formula 30x. With `def calc_total(cart):` write once, call `calc_total(cart_A)`. No copy, no mistake.

---

## Program: Shop Functions Kitchen

```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Budi"))
print(greet("Siti", "Good morning"))

def calc(a, b):
    return a + b, a - b, a * b

total, diff, prod = calc(10, 3)
print(f"\nTotal {total}, Diff {diff}, Prod {prod}")

def total_all(*numbers):
    return sum(numbers)

print("\nTotal:", total_all(1, 2, 3, 4, 5))

square = lambda x: x ** 2
print(f"Square 5 = {square(5)}")

prices = [10000, 15000, 20000, 25000]
up = list(map(lambda h: h * 1.1, prices))
cheap = list(filter(lambda h: h < 20000, prices))
print(f"\nUp 10%: {[int(x) for x in up]}")
print(f"Cheap: {cheap}")

numbers = [3, 1, 4, 1, 5, 9]
print(f"\nSorted: {sorted(numbers)}")
print(f"Sum: {sum(numbers)}, Max: {max(numbers)}")

import math
print(f"\nPi: {math.pi:.4f}, Sqrt 144: {math.sqrt(144)}")

def calc_total(cart, discount=0):
    total = sum(item["price"] * item["qty"] for item in cart)
    return total * (1 - discount/100)

cart = [{"price": 62000, "qty": 1}, {"price": 5000, "qty": 2}]
print(f"\nTotal no discount: Rp {calc_total(cart):,}")
print(f"10% off: Rp {calc_total(cart, 10):,}")
```

---

## Key Concepts

### `def` = Write Recipe
```python
def greet(name):
    return f"Hello {name}"
```
Call `greet("Budi")` → `"Hello Budi"`. No `return` → `None`.

### Flexible Parameter
- Default: `def greet(name="Guest")`
- `*numbers` → collect many positionals into tuple
- `**info` → collect many keywords into dict

### Lambda & Map/Filter
- `lambda x: x*2` quick recipe for `map`/`filter`
- `map(lambda, list)` change, `filter(lambda, list)` filter

### Import
`import math` → `math.sqrt(144)`, `from datetime import datetime` → `datetime.now()`

---

## Beginner Friendly Explanation

### Analogy: Kitchen Recipe

- **Function = recipe**: write "soto: chicken + spice → boil" once, cook 100x `soto(chicken)`.
- **Parameter = ingredients**, **Return = dish**
- **`*numbers` = sack**: fits any amount.
- **Lambda = quick sticky**: not thick book, just `x*2`.

---

## Experiments

- **Green:** `def shop_greet(name): return f"Welcome {name}"` → call 2x
- **Yellow:** `total_all(10,20,30)` → ? `calc_total(cart, 20)` 20% off
- **Red:** Forget `return` → result `None`. Add `return` → correct

---

## Challenge

**Auto Shop:** Make 3 functions:
1. `subtotal(cart)` → total no discount
2. `delivery(weight, distance)` → `weight*5000 + distance*2000`
3. `print_receipt(cart, distance)` → combine 1+2 + `greet(name)` return string
Call with 2 different carts to prove reuse.

---

## Mini Glossary

- **def/return**: make & return
- **lambda**: 1-line function
- **map/filter**: process list
- **import**: borrow module

---

## Summary

Week 4 of 12: **Functions & Modules** (Level: Beginner). Have reusable recipes. **Beginner Python done!** Next: **Collections** — list, dict, set for shop stock.
