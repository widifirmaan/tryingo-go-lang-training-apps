# Data Types & Operations

> **Kategori:** Python | **Level:** Beginner | **Minggu 2:** Data Types & Operations

## Learning Objectives

- Arithmetic operators: +, -, *, /, //, %, **
- String methods: upper, lower, replace, strip, split
- String slicing: s[start:end:step], s[::-1] reverse
- Boolean operators: and, or, not, comparison chains
- None type and identity check with is operator

---

## Program: Data Calculator

```python

# Data Types & Operasi
print("=== Numbers ===")
a, b = 17, 5
print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b:.2f}")
print(f"{a} // {b} = {a // b}")
print(f"{a} % {b} = {a % b}")
print(f"{a} ** {b} = {a ** b}")

print("\n=== Strings ===")
s = "Python"
print(f"Length: {len(s)}")
print(f"Upper: {s.upper()}")
print(f"Lower: {s.lower()}")
print(f"Replace: {s.replace('Py', 'My')}")
print(f"Slice [0:3]: {s[0:3]}")
print(f"Slice [::2]: {s[::2]}")
print(f"Reverse: {s[::-1]}")
print(f"'th' in s: {'th' in s}")

print("\n=== Booleans ===")
x, y = 10, 20
print(f"{x} == {y}: {x == y}")
print(f"{x} != {y}: {x != y}")
print(f"{x} < {y}: {x < y}")
print(f"True and False: {True and False}")
print(f"True or False: {True or False}")
print(f"not True: {not True}")

print("\n=== Comparison Chains ===")
n = 15
print(f"10 <= {n} <= 20: {10 <= n <= 20}")

print("\n=== None ===")
hasil = None
print(f"None: {hasil}, type: {type(hasil).__name__}")
print(f"hasil is None: {hasil is None}")
    
```

---

## Key Concepts

### Arithmetic Operators
`/` float div, `//` floor div, `%` modulo, `**` power.

### String Methods
Common string operations.

### String Slicing
`s[start:end:step]`. Reverse with `s[::-1]`.

### Boolean & Comparison
Logical operators and chained comparisons.

### None & Identity
`None` = Python null. Check with `is None`.

---

## Experiments

- Calculate BMI with arithmetic operators
- Reverse string with slicing — check palindrome
- Try all string methods on long text
- Build truth table for and/or/not
- Experiment with comparison chains

---

## Challenge

Build a password validator: min 8 chars, uppercase, lowercase, digit, symbol. Use string methods and boolean operators.

---

## Summary

Week 2 of 12: **Data Types & Operations** (Level: Beginner). Foundation for data manipulation. Next week: **Control Flow**.
