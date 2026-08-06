# Testing & Quality

> **Kategori:** Python | **Level:** Lanjutan | **Minggu 10:** Testing & Quality

## Tujuan Pembelajaran

- unittest: TestCase, assertEqual, assertRaises, setUp
- pytest: fixture, parametrize, mark, conftest.py
- Test coverage: pytest-cov, coverage.py
- Type hints dan mypy untuk static type checking
- Code quality: black, flake8, isort, pre-commit

---

## Program: Unit Test & Pytest

```python

# Testing & Quality
def add(a: int, b: int) -> int: return a + b

def divide(a: float, b: float) -> float:
    if b == 0: raise ValueError("Cannot divide by zero")
    return a / b

def is_palindrome(s: str) -> bool:
    s = s.lower().replace(" ", "")
    return s == s[::-1]

def fizzbuzz(n: int) -> str:
    if n % 15 == 0: return "FizzBuzz"
    if n % 3 == 0: return "Fizz"
    if n % 5 == 0: return "Buzz"
    return str(n)

# Manual Test Simulation
print("=== Manual Tests ===")
tests = [
    ("add(2,3)", add(2, 3), 5),
    ("add(-1,1)", add(-1, 1), 0),
    ("divide(10,2)", divide(10, 2), 5.0),
    ("is_palindrome('racecar')", is_palindrome("racecar"), True),
    ("is_palindrome('hello')", is_palindrome("hello"), False),
    ("fizzbuzz(15)", fizzbuzz(15), "FizzBuzz"),
    ("fizzbuzz(9)", fizzbuzz(9), "Fizz"),
    ("fizzbuzz(10)", fizzbuzz(10), "Buzz"),
    ("fizzbuzz(7)", fizzbuzz(7), "7"),
]

passed = 0
for name, result, expected in tests:
    status = "PASS" if result == expected else "FAIL"
    if result == expected: passed += 1
    print(f"  {status}: {name} = {result} (expected {expected})")

print(f"\nResults: {passed}/{len(tests)} passed")

# unittest Framework
print("\n=== unittest Framework ===")
print("""
import unittest

class TestMath(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(2, 3), 5)
        self.assertEqual(add(-1, 1), 0)

    def test_divide(self):
        self.assertAlmostEqual(divide(10, 2), 5.0)
        with self.assertRaises(ValueError):
            divide(10, 0)

    def test_palindrome(self):
        self.assertTrue(is_palindrome("racecar"))
        self.assertFalse(is_palindrome("hello"))

if __name__ == '__main__':
    unittest.main()
""")

# pytest Style
print("\n=== pytest Style ===")
print("""
# test_math.py
def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0

def test_divide():
    assert divide(10, 2) == 5.0
    with pytest.raises(ValueError):
        divide(10, 0)

@pytest.mark.parametrize("input,expected", [
    ("racecar", True),
    ("hello", False),
])
def test_palindrome(input, expected):
    assert is_palindrome(input) == expected
""")

# Type Hints & Quality
print("\n=== Type Hints & Quality Tools ===")
print("Tools: mypy, black, flake8, isort, pre-commit")
print("Commands:")
print("  mypy src/")
print("  black src/ tests/")
print("  flake8 src/")
print("  pytest --cov=src tests/")
    
```

---

## Konsep Kunci

### unittest
Built-in testing framework. `TestCase` class, `assertEqual`, `assertRaises`, `setUp/tearDown`.

### pytest
Lebih powerful: `fixture`, `@pytest.mark.parametrize`, `conftest.py` shared fixtures.

### Coverage
`pytest --cov=src --cov-report=html` — ukur berapa % kode yang ditest.

### Type Hints
`def f(x: int) -> str:`. `mypy` static checker. Tidak enforce saat runtime.

### Quality Tools
`black` formatter, `flake8` linter, `isort` import sorter, `pre-commit` hooks.

### TDD Cycle
Red -> Green -> Refactor. Write test first, watch it fail, make it pass, clean up.

---

## Eksperimen

- Buat test suite lengkap untuk fungsi sendiri
- Coba pytest parametrize dengan banyak input
- Buat fixture untuk setup/teardown
- Jalankan mypy pada project dan fix type errors
- Setup pre-commit dengan black dan flake8

---

## Tantangan

Buat library dengan 100% test coverage: unit tests, edge cases, parametrized tests. Setup black + flake8 + mypy.

---

## Ringkasan

Minggu 10 dari 12: **Testing & Quality** (Level: Lanjutan). Kualitas kode produksi. Minggu depan: **CLI & Automation**.
