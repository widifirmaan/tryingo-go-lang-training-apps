# Collections & Data Structures

> **Kategori:** Python | **Level:** Intermediate | **Minggu 5:** Collections & Data Structures

## Learning Objectives

- List: mutable, ordered — append, insert, pop, sort, slice
- Tuple: immutable, hashable — unpacking and namedtuple
- Dictionary: key-value pairs — get, keys, values, items
- Set: unique elements — union, intersection, difference
- collections module: Counter, defaultdict, namedtuple, deque

---

## Program: Data Manager

```python

# Collections & Data Structures
from collections import Counter, defaultdict, namedtuple

print("=== List ===")
angka = [3, 1, 4, 1, 5, 9, 2, 6]
angka.append(7)
angka.insert(0, 0)
angka.sort()
print(f"List: {angka}")
print(f"Pop: {angka.pop()}, setelah pop: {angka[-3:]}")

print("\n=== Tuple (Immutable) ===")
coord = (10, 20)
x, y = coord
print(f"Coord: {x}, {y}")
single = (42,)
print(f"Single: {single}")

print("\n=== Dictionary ===")
profil = {
    "nama": "Budi",
    "umur": 25,
    "kota": "Jakarta",
    "hobi": ["ngoding", "baca"]
}
print(f"Nama: {profil['nama']}")
print(f"Get: {profil.get('email', 'N/A')}")
profil["email"] = "budi@email.com"
print(f"Keys: {list(profil.keys())}")
print(f"Values: {list(profil.values())}")

print("\n=== Dict Comprehension ===")
kuadrat = {x: x**2 for x in range(1, 6)}
print(f"Kuadrat: {kuadrat}")

print("\n=== Set ===")
a = {1, 2, 3, 4, 5}
b = {4, 5, 6, 7, 8}
print(f"Union: {a | b}")
print(f"Intersection: {a & b}")
print(f"Difference: {a - b}")
print(f"Symmetric diff: {a ^ b}")

print("\n=== Counter ===")
teks = "abracadabra"
counter = Counter(teks)
print(f"Counter: {counter}")
print(f"Top 3: {counter.most_common(3)}")

print("\n=== defaultdict ===")
groups = defaultdict(list)
for buah in ["apel", "mangga", "alpukat", "pisang"]:
    groups[buah[0]].append(buah)
print(f"Group by first letter: {dict(groups)}")

print("\n=== namedtuple ===")
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(f"Point: ({p.x}, {p.y})")

print("\n=== Zip & Unzip ===")
nama = ["Budi", "Siti", "Andi"]
umur = [25, 23, 27]
for n, u in zip(nama, umur):
    print(f"  {n}: {u}")
    
```

---

## Key Concepts

### List vs Tuple
List mutable `[]`, Tuple immutable `()`. Tuples can be dict keys.

### Dictionary
Key-value with O(1) lookup. `get(key, default)` is safe.

### Dict Comprehension
`{k: v for x in iterable}`.

### Set
Mathematical operations: union, intersection, difference.

### collections Module
`Counter` for frequency, `defaultdict` auto-init, `namedtuple` named fields.

### Zip
Combine iterables in parallel.

---

## Experiments

- Build word frequency program with Counter
- Implement simple cache with dict
- Try set operations on two lists
- Build data processing pipeline with zip
- Experiment with deque for queue/stack

---

## Challenge

Build an inventory program: add/remove products (dict), categories (set), transaction history (list). Use Counter for sales reports.

---

## Summary

Week 5 of 12: **Collections & Data Structures** (Level: Intermediate). Daily data structures in Python. Next week: **Object-Oriented Programming**.
