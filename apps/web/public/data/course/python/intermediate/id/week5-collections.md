# Collections & Data Structures

> **Kategori:** Python | **Level:** Menengah | **Minggu 5:** Collections & Data Structures

## Tujuan Pembelajaran

- List: mutable, ordered — append, insert, pop, sort, slice
- Tuple: immutable, hashable — unpacking dan namedtuple
- Dictionary: key-value pairs — get, keys, values, items
- Set: unique elements — union, intersection, difference
- collections module: Counter, defaultdict, namedtuple, deque

---

## Program: Manajemen Data

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

## Konsep Kunci

### List vs Tuple
List mutable `[]`, Tuple immutable `()`. Tuple bisa jadi dict key.

### Dictionary
Key-value dengan O(1) lookup. `get(key, default)` aman dari KeyError.

### Dict Comprehension
`{k: v for x in iterable}`.

### Set
Operasi matematika: union `|`, intersection `&`, difference `-`.

### collections Module
`Counter` untuk frekuensi, `defaultdict` auto-init key, `namedtuple` tuple dengan nama field.

### Zip
`zip(list1, list2)` menggabungkan iterable parallel.

---

## Eksperimen

- Buat program frekuensi kata dengan Counter
- Implementasikan cache sederhana dengan dict
- Coba set operations pada dua list
- Buat data processing pipeline dengan zip
- Eksperimen dengan deque untuk queue/stack

---

## Tantangan

Buat program inventory: tambah/hapus produk (dict), kategori (set), riwayat transaksi (list). Gunakan Counter untuk laporan penjualan.

---

## Ringkasan

Minggu 5 dari 12: **Collections & Data Structures** (Level: Menengah). Struktur data harian Python. Minggu depan: **Object-Oriented Programming**.
