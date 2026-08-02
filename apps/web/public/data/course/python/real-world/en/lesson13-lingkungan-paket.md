# venv, pip & Packages

> Python | Real-World Python | Lesson 13

## Learning Objectives

- Split code into your own modules
- Understand if __name__ == "__main__"
- Create and activate virtual environments
- Manage dependencies with pip and requirements.txt

---

## Program: venv, pip & Packages

```python
# ===== Modul sendiri: organisasi kode lintas file =====
import helpers

nilai = [85, 92, 78, 90, 88]
print(f"Rata-rata: {helpers.rata_rata(nilai):.1f}")
print(f"Median: {helpers.median(nilai)}")

# ===== if __name__ == "__main__" =====
# Kode di bawah hanya jalan saat index.py dieksekusi LANGSUNG,
# bukan saat di-import sebagai modul.
def main():
    print("Program dimulai dari index.py (bukan saat di-import)")

if __name__ == "__main__":
    main()

# ===== venv & pip (jalankan di terminal lokal / StackBlitz) =====
# python -m venv venv
# venv\Scripts\activate          (Windows)
# source venv/bin/activate        (macOS / Linux)
# pip install requests
# pip freeze > requirements.txt
# pip install -r requirements.txt

```

---

## Explanation

## Your Own Modules
A .py file = a module. `import helpers` executes helpers.py and provides a namespace. This is the professional way to organize: logic in helpers.py, the "story" in index.py. Scaler M3 places modules with functions; travisjneuman level 3 adds packaging.

## if __name__ == "__main__"
When a file is imported, top-level code RUNS — unless guarded. `__name__` equals `"__main__"` only when executed directly. Every behavioral file needs this guard.

## Virtual Environments
`venv` = an isolated Python environment per project: project A's package versions never break project B. Every serious project REQUIRES venv (Scaler, DataCamp, travisjneuman). `venv\Scripts\activate` (Windows) / `source venv/bin/activate` (Unix).

## pip & requirements.txt
`pip install <pkg>` installs from PyPI; `pip freeze > requirements.txt` records dependencies + versions; `pip install -r requirements.txt` restores the environment on other machines / CI. StackBlitz WebContainers is currently stdlib-only (vanilla python3) — run pip installs in your local environment.

## Common Mistakes
Imports inside functions (usually a design smell), circular imports, no venv (dependency hell), committing the venv/ folder (use .gitignore), `pip` vs `pip3` wrong Python version.

---

## Experiments

1. **Modul Sendiri**
2. **if __name__ == "__main__"**
3. **Virtual Environment**
4. **pip & requirements.txt**
5. **Common Mistakes**

---

## Challenge

Refactor: move the statistics functions (mean, median, mode) into a `statistik.py` module, write index.py importing and running a report, then create an empty requirements.txt for the project. Practice: create a local venv, install one package, freeze.

---

## Summary

Own modules + __name__ guard + venv + pip/requirements.txt = real project foundations. Next: CLI & automation.
