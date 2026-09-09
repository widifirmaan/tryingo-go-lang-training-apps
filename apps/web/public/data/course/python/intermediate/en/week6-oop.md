# OOP — Shop Blueprint

> **Kategori:** Python | **Level:** Intermediate | **Minggu 6:** OOP
> **Prerequisites:** Week 5 — **Collections**.

## Learning Objectives

- `class Product:` blueprint, `__init__` initial fill, `self` = itself, `method` stamp

---

## Why This Matters (Non-IT)

50 products without a blueprint → write `name, price, stock` 50x. With `class` write once, print 50 cards.

---

## Program: OOP Product Cards

```python
class Product:
    def __init__(self, name, price, stock=0):
        self.name = name      # self = this card
        self.price = price
        self.stock = stock

    def info(self):
        return f"{self.name}: Rp{self.price:,} (stock {self.stock})"

    def discount(self, percent):
        self.price = int(self.price * (1 - percent/100))

# Print cards
rice = Product("Rice 5kg", 62000, 10)
print(rice.info())
rice.discount(10)
print("After discount:", rice.info())

# Inheritance
class Member(Product):
    def __init__(self, name, price, stock, points):
        super().__init__(name, price, stock)
        self.points = points

m = Member("Sugar", 15000, 5, 120)
print(m.info(), f"points {m.points}")
```

---

## Key Concepts

### `class` + `__init__` + `self`
`class` blueprint, `__init__` initial fill, `self` this card.

### Inheritance `class Member(Product)`
`Member` has everything `Product` has + extra `points`.

---

## Beginner Friendly Explanation

### Analogy: Card Blueprint
- **class = blueprint**, **object = finished card** `Product("Rice",62000)`.
- **self = "me"**: `self.name` = this card's name.

### Step 0 — Prepare Device
- Python terminal, paste class, create 2 products, compare.

### How the Computer Reads It
1. `Product("Rice", 62000, 10)` → `__init__` fills `self`.
2. `rice.discount(10)` → method edits this card's price.

### 3 Must-Know Terms
1. **class/object/self**: blueprint/card/me

---

## Experiments

- **Green:** New `Product("Tea", 8000, 3)` → `info()` works?
- **Yellow:** `discount(50)` twice → price halves twice?
- **Red:** Forget `self` in method → TypeError? Add `self`.

---

## Challenge

**OOP Cart:** `class Cart: def __init__(self): self.items=[]; def add(self, p): self.items.append(p); def total(self): return sum(i.price*i.stock for i in self.items)`
- **Link-up (Week 5 — Collections):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **class/self/inheritance**: blueprint/me/heir

---

## Summary

Week 6: **OOP** — shop blueprint. Next: **File I/O**.
