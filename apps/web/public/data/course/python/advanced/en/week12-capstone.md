# Capstone: Complete Python Shop

> **Kategori:** Python | **Level:** Advanced | **Minggu 12:** Capstone
> **Prerequisites:** Week 11 — **CLI & Automation**.

## Learning Objectives

- Combine `Flask` + `pandas` + `json` + `test` into a shop with product `API` + Excel report

---

## Why This Matters (Non-IT)

11 separate weeks — capstone proves the combination: Flask API + pandas report + CLI + test become a real shop. Python portfolio.

---

## Program: Python Capstone Shop

```bash
pip install flask pandas openpyxl
```

Save as `app.py`, then:
```python
from flask import Flask, jsonify
app = Flask(__name__)
products = [{"id":1,"name":"Rice","price":62000}]

@app.route("/products")
def list(): return jsonify(products)

# pandas report (+ real Excel)
import pandas as pd
df = pd.DataFrame(products)
print(df.describe())
df.to_excel("report.xlsx", index=False)  # needs openpyxl
print("Excel saved: report.xlsx")

# Run: flask --app app run
# Open http://127.0.0.1:5000/products → JSON
```

**Task:** Deploy `Railway` + `pytest`.


---

## Beginner Friendly Explanation

### Analogy: Python Shop Grand Opening
- **11 weeks = building a shop**: recipes (functions), racks (collections), blueprints (OOP), ledgers (files), borrowed tools (pip).
- **Capstone = grand opening**: Flask API + pandas reports + CLI + tests RUN TOGETHER + Railway deploy. Demo video = opening proof!

### Step 0 — Prepare Device
- Same as Python W1: `python --version` + project folder.

### How the Computer Reads It
- CHECKLIST (API + report + CLI + test) then demo + video.

### 3 Must-Know Terms
- 1. **Capstone/demo**: combine/show

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 12: **Python Capstone** — shop + report, **Python 0→Expert DONE!**
