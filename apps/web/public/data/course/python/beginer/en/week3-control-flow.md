# Control Flow & Loops

> **Kategori:** Python | **Level:** Beginner | **Minggu 3:** Control Flow & Loops

## Learning Objectives

- If/elif/else with indentation replacing curly braces
- For loops with range() and iteration over lists/strings/dicts
- While loops with conditions and increments
- Break, continue, and pass for loop control
- List comprehension: [expr for x in iterable if cond]

---

## Program: Grades & Numbers

```python

# Control Flow & Loops
print("=== If/Elif/Else ===")
nilai = 85
if nilai >= 90:
    grade = "A"
elif nilai >= 80:
    grade = "B"
elif nilai >= 70:
    grade = "C"
elif nilai >= 60:
    grade = "D"
else:
    grade = "E"
print(f"Nilai {nilai} -> Grade {grade}")

print("\n=== Ternary Expression ===")
status = "Lulus" if nilai >= 60 else "Tidak Lulus"
print(f"Status: {status}")

print("\n=== For Loop ===")
print("Range 5:")
for i in range(5):
    print(f"  {i}", end="")
print()

print("Range(2, 10, 2):")
for i in range(2, 10, 2):
    print(f"  {i}", end="")
print()

print("\n=== Loop through List ===")
buah = ["apel", "mangga", "pisang", "jeruk"]
for i, item in enumerate(buah, 1):
    print(f"  {i}. {item}")

print("\n=== While Loop ===")
n = 1
while n <= 5:
    print(f"  While: {n}")
    n += 1

print("\n=== Break & Continue ===")
for i in range(10):
    if i == 3:
        continue
    if i == 7:
        break
    print(f"  {i}", end="")
print()

print("\n=== Nested Loop (Multiplication Table) ===")
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i*j:3}", end="")
    print()

print("\n=== List Comprehension ===")
kuadrat = [x**2 for x in range(1, 6)]
genap = [x for x in range(10) if x % 2 == 0]
print(f"Kuadrat: {kuadrat}")
print(f"Genap: {genap}")
    
```

---

## Key Concepts

### If/Elif/Else
Indentation (4 spaces) defines blocks. No curly braces needed.

### For Loop
`range(n)` = 0..n-1. Iterate directly over iterables.

### enumerate
`enumerate(list, start=1)` gives index + value.

### Break & Continue
`break` exits loop, `continue` skips, `pass` is a no-op.

### List Comprehension
Concise way to create lists.

### Ternary
`value_if_true if condition else value_if_false`.

---

## Experiments

- Change values and observe grade changes
- Create for loop with break on condition
- Build list comprehension that filters + transforms
- Implement FizzBuzz with if/elif
- Try nested loops for triangle patterns

---

## Challenge

Build a number guessing game: generate random 1-100, give "higher/lower" hints, count attempts. Use while loop.

---

## Summary

Week 3 of 12: **Control Flow & Loops** (Level: Beginner). Your program logic. Next week: **Functions**.
