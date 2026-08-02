# Testing & Git

> Python | Real-World Python | Lesson 15

## Learning Objectives

- Write assert-based tests
- Structure tests as functions
- Understand pytest and basic fixtures
- Know the Git workflow: add, commit, push

---

## Program: Testing & Git

```python
# ===== Pengujian dasar: assert =====
import calculator

def uji():
    hasil = []
    hasil.append(("tambah", calculator.tambah(2, 3) == 5))
    hasil.append(("kurang", calculator.kurang(10, 4) == 6))
    hasil.append(("kali", calculator.kali(3, 4) == 12))
    hasil.append(("bagi", calculator.bagi(9, 3) == 3))
    try:
        calculator.bagi(1, 0)
        hasil.append(("bagi-nol", False))
    except ValueError:
        hasil.append(("bagi-nol", True))
    return hasil

hasil = uji()
for nama, ok in hasil:
    print(f"  [{'PASS' if ok else 'FAIL'}] {nama}")
print(f"\n{sum(ok for _, ok in hasil)}/{len(hasil)} lolos")

# ===== pytest (tool sungguhan, jalankan lokal) =====
# Buat file test_calculator.py:
#
#   from calculator import tambah, bagi
#   import pytest
#
#   def test_tambah():
#       assert tambah(2, 3) == 5
#
#   def test_bagi_nol():
#       with pytest.raises(ValueError):
#           bagi(1, 0)
#
# Jalankan:  pytest test_calculator.py -v

# ===== Git (konsep inti, jalankan lokal) =====
# git init
# git add calculator.py test_calculator.py
# git commit -m "feat: kalkulator + test"
# git branch -M main
# git remote add origin <url>
# git push -u origin main
# git log --oneline

```

---

## Explanation

## assert & Test Functions
`assert` checks truthiness and raises AssertionError on failure. Test structure: one function per behavior, descriptive names (`test_tambah`). The 3-phase pattern: arrange (prepare) -> act (call) -> assert (check). DataCamp places testing in months 3-4 of its 12-month roadmap; travisjneuman level 3: "packages, logging, test-driven development".

## pytest
`pytest` is the de facto test framework: finds `test_*` functions, runs them, reports red/green. `pytest.raises(ValueError)` tests errors. Its built-in assertions read clear messages — Springer research: clear error messages reduced beginner frustration by 73%.

## Concise TDD
TDD: write a failing test first, then minimal implementation until green, then refactor. For this track: writing tests WITH the implementation is enough — the habit of testing what you build matters far more than the order.

## Git & GitHub
`git add` (staging) -> `git commit` (snapshot + message) -> `git push` (to remote). `git log --oneline` views history. Git appears in nearly every researched curriculum: DataCamp months 1-2, Asmorix week 8, travisjneuman "Git Basics".

## Common Mistakes
Tests asserting implementation rather than behavior (testing internals, not input->output), missing edge cases (divide by zero!), always-passing tests, committing irrelevant files, commits without descriptive messages.

---

## Experiments

1. **assert & Test Function**
2. **pytest**
3. **TDD Ringkas**
4. **Git & GitHub**
5. **Common Mistakes**

---

## Challenge

Add `pangkat(a, b)` and `sisa(a, b)` to calculator.py, write their tests in index.py, then create the pytest version test_calculator.py and run it locally. Once green: git init, commit, create a GitHub repo, push.

---

## Summary

assert + test functions, pytest, concise TDD, the Git workflow. Tested + version-controlled code = production ready. Next: the final project.
