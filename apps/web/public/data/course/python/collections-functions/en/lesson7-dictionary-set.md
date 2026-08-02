# Dictionaries, Sets & Comprehensions

> Python | Collections & Functions | Lesson 7

## Learning Objectives

- Solve the parallel lists problem with dicts
- Do CRUD and understand KeyError + .get()
- Iterate keys, values, items
- Use sets for uniqueness & membership
- Write list/dict comprehensions

---

## Program: Dictionaries, Sets & Comprehensions

```python
# ===== Masalah: parallel lists (MIT OCW) =====
nama = ["Ayu", "Budi", "Citra"]
nilai = [90, 78, 85]
# Menjaga 2 list sinkron itu rapuh -- DICTIONARY lebih bersih.

# ===== Dictionary: key -> value =====
nilai_siswa = {"Ayu": 90, "Budi": 78, "Citra": 85}
print(f"Nilai Ayu: {nilai_siswa['Ayu']}")
nilai_siswa["Dewi"] = 92          # tambah
nilai_siswa["Ayu"] = 95           # update
del nilai_siswa["Budi"]           # hapus
print(f"Setelah update: {nilai_siswa}")

# ===== KeyError & .get() =====
# nilai_siswa["Zainal"]  -> KeyError! (error dict paling umum)
print(f"get() aman: {nilai_siswa.get('Zainal')}")
print(f"get() + default: {nilai_siswa.get('Zainal', 0)}")
print(f"Cek key: {'Ayu' in nilai_siswa}")

# ===== Iterasi: keys, values, items =====
for nama_siswa in nilai_siswa:
    print(f"Key: {nama_siswa}")
for nama_siswa, nilai_angka in nilai_siswa.items():
    print(f"{nama_siswa}: {nilai_angka}")

# ===== Set: unik + membership cepat =====
warna = {"merah", "biru", "hijau", "merah"}
print(f"Set (duplikat hilang): {warna}")
print(f"'merah' in warna: {'merah' in warna}")
# {} membuat DICT kosong, bukan set!
set_kosong = set()
print(f"set() kosong: {set_kosong}, type: {type(set_kosong)}")

# ===== Word frequency (contoh klasik MIT) =====
lirik = "kita semua saudara kita semua sama kita satu"
kata_list = lirik.split()
frekuensi = {}
for kata in kata_list:
    frekuensi[kata] = frekuensi.get(kata, 0) + 1
print(f"Frekuensi kata: {frekuensi}")

# ===== Comprehensions =====
kuadrat = [n * n for n in range(1, 6)]
print(f"Kuadrat: {kuadrat}")
genap = [n for n in range(1, 11) if n % 2 == 0]
print(f"Genap: {genap}")
dua_kali = {n: n * 2 for n in range(3)}
print(f"Dict comp: {dua_kali}")

```

---

## Explanation

## The Parallel Lists Motivation
Three parallel lists (names, scores) must change together on every operation — fragile (MIT OCW Lecture 14). Dicts group related data: `nilai_siswa["Ayu"]` gets the score directly, no index search. Order: Python 3.7+ dicts preserve insertion order.

## KeyError & .get()
KeyError is the most common dict error (datafield.dev): case-sensitive typos (`"torch"` vs `"Torch"`), assuming a key exists, `1` vs `"1"` are different keys. Use `.get()` when a missing key is expected (counting, optional config); use `dict[key]` when the key MUST exist — an error beats a silent bug.

## Dict Iteration
`for k in d` = keys. `.items()` for (key, value) — unpack two names. Prefer `.items()` over separate `.keys()`+`.values()`.

## Sets
Sets are unordered unique collections; `in` is O(1). `{}` creates an empty dict — a famous gotcha: an empty set requires `set()`. Order is not guaranteed — never rely on it.

## Comprehensions
`[expression for x in iterable if condition]` — concise and idiomatic, a direct transfer from for-first. Don't force it: complex if/else or nested loops -> use a plain for (datafield: "readability always wins").

## Choose the Right Data Structure
Ordered sequence -> list. Immutable -> tuple. Fast key lookup -> dict. Unique + membership -> set. Count occurrences -> dict + get(). Deduplicate -> set(list).

---

## Experiments

1. **Motivasi: Parallel Lists**
2. **KeyError & .get()**
3. **Iterasi Dictionary**
4. **Set**
5. **Comprehensions**
6. **Pilih Struktur Data yang Tepat**

---

## Challenge

Build a unique-word counter: (1) read a sentence, split, count each word with a dict, (2) show the top 3 words by frequency (sorted with key=lambda), (3) unique words with a set, (4) a simple inverted index: {word: [sentence indices]}.

---

## Summary

Dicts = key-value lookup, KeyError/.get(), items() iteration, unique sets, comprehensions. Ready for modules & error handling. Next: Contact Book.
