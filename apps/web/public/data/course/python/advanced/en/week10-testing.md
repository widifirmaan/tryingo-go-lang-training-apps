# Testing — Taste Before Serving

> **Kategori:** Python | **Level:** Advanced | **Minggu 10:** Testing

## Learning Objectives

- `pytest` or `unittest` — taste before serving, `assert` checks

---

## Why This Matters (Non-IT)

Without `pytest`, formula changes → mistakes found by customers. With `assert` + `pytest -v`, change → red → fix. `parametrize` tastes 10 cases in 3 lines.

---

## Program

```python
# calc.py
def calc(a,b): return a+b

# test_calc.py
def test_calc():
    assert calc(2,3) == 5
    assert calc(0,0) == 0
    print("Pass")

test_calc()

# Run: pytest -v
# (python -m unittest needs TestCase classes — this plain-function style is for pytest)
```


---

## Beginner Friendly Explanation

### Analogy: Python Kitchen Taste-Test
- **`assert` = machine taste**: `calc(2,3)==5`? Differs → RED + left-right values shown.
- **`parametrize` = bulk tasting**: 10 cases in 3 lines (without it: 10 functions!). Change formula → red → fix BEFORE customers!

### Step 0 — Prepare Device
- Same as Python W1: `python --version` + project folder.

### How the Computer Reads It
- `pytest` finds `test_*.py`; `assert a == b` match? Continue : red + value.

### 3 Must-Know Terms
- 1. **pytest/assert/parametrize**: kitchen/taste/bulk

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 10: **Taste Test** — `assert` before deploy.
