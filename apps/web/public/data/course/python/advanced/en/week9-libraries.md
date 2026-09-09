# Libraries — Borrow Neighbor's Tools

> **Kategori:** Python | **Level:** Advanced | **Minggu 9:** Libraries
> **Prerequisites:** Week 8 — **Decorators & Generators**.

## Learning Objectives

- `pip install requests pandas` borrow, `import requests` use, `venv` separate drawer

---

## Why This Matters (Non-IT)

Without `venv`, borrowing `requests` v2 for project A breaks project B needing v1 (clash!). With a separate drawer per project + `requirements.txt`, the team installs exactly the same.

---

## Program

```bash
python -m venv shop-env
# Windows: shop-env\Scripts\activate
# Mac/Linux: source shop-env/bin/activate
pip install requests
pip freeze > requirements.txt
```

```python
import requests
# Without a real API, simulate
data = [{"name": "Rice", "price": 62000}]
print("Borrowed requests:", data)

import json, os
print("json & os are built-in — no pip needed")
```


---

## Beginner Friendly Explanation

### Analogy: Tool Drawer per Project
- **No `venv` = 1 drawer for 10 projects**: project A needs requests v2, B needs v1 → collision!
- **`venv` = drawer per project** + `requirements.txt` = shopping list: teams install EXACTLY the same (`pip install -r`). `pip` borrows, `venv` fences!

### Step 0 — Prepare Device
- Same as Python W1: `python --version` + project folder.

### How the Computer Reads It
- `python -m venv shop-env` makes a drawer; `activate` enters it; `pip install` puts packages in that drawer only.

### 3 Must-Know Terms
- 1. **venv/pip/requirements**: drawer/borrow/list

---

## Challenge

**Libraries in Your Shop:** re-run it until it truly runs, then do these three levels.
- **Green:** Run this week's Program as-is; note the output.
- **Yellow:** Change 1 value in the Program; predict the output BEFORE running, then compare.
- **Red:** Combine with **Decorators & Generators** (Week 8): plug the result into that flow, end-to-end must work.

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 9: **Borrow Tools** — `pip` + `venv`. Next week: **Testing**.
