# Capstone: Complete Django Store

> **Kategori:** Django | **Level:** Advanced | **Minggu 12:** Capstone Project
> **Prerequisites:** Week 11 — **Deployment**.

## Learning Objectives

- Combine `models` + `forms` + `auth` + `admin` + `DRF` + `deploy` into a store with `products` + `orders` + `login`

---

## Why This Matters (Non-IT)

11 separate weeks — capstone proves the combination: models + auth + DRF + tests + deploy become a store. Django portfolio.

---

## Program: Django Capstone Store

Features: `Product` CRUD via `ModelForm` + `admin` + `api/products/` DRF + `auth` + `Railway` deploy.

Structure: `shop/models.py`, `shop/views.py`, `shop/serializers.py`, `shop/admin.py`.

**Task:** Deploy `shop-django.railway.app` + video.



```python
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

# Model ringkas (asli: warung/models.py + migrate) — inti 11 minggu:
# Produk CRUD (ModelForm W5) + auth (W6) + admin (W7) + DRF (W8) + test (W9)
PRODUK = [
    {"id": 1, "nama": "Beras 5kg", "harga": 62000},
    {"id": 2, "nama": "Minyak 2L", "harga": 48000},
]


def tambah_produk(nama, harga):
    """Simulasi ModelForm.is_valid() -> save (asli: form.save())."""
    if not nama or harga <= 0:
        return None  # form tidak valid
    p = {"id": len(PRODUK) + 1, "nama": nama, "harga": harga}
    PRODUK.append(p)
    return p


@login_required  # KTP W6: tanpa login -> tendang ke /login
def daftar(request):
    baris = ", ".join(f"{p['nama']} Rp{p['harga']}" for p in PRODUK)
    return HttpResponse(f"Toko Django: {baris}")


# API drive-thru W8 (asli: warung/serializers.py + ViewSet -> api/produk/)
def api_produk():
    return [{"id": p["id"], "nama": p["nama"]} for p in PRODUK]


# Uji W9 (asli: TestCase): tambah valid + tolak harga minus
tambah_produk("Gula 1kg", 17500)
tambah_produk("", -5)
print(daftar(None).content.decode())
print("API:", api_produk())
print("JUMLAH:", len(PRODUK))  # harap 3
```

*Run each function in the playground/PC (`python views.py`), see receipt + API + COUNT=3.*

---

## Beginner Friendly Explanation

### Analogy: Django Store Grand Opening
- **11 weeks = building parts**: racks (models), waiters (views), tables (templates), IDs (auth), drive-thru (API).
- **Capstone = grand opening**: all parts open together + tested (`test` green) + online branch (deploy). One part stalls → opening fails — hence the checklist!

### Step 0 — Prepare Device
- Same as Django W1: `runserver` on `8000` (+ this week's package).

### How the Computer Reads It
- CHECKLIST (model + auth + API + test + deploy) then URL + video.

### 3 Must-Know Terms
- 1. **Capstone/deploy**: combine/open

---

## Experiments

- **Green:** `tambah_produk('Kopi', 12000)` → COUNT=4?
- **Yellow:** `tambah_produk('Teh', 0)` → rejected (None)? Why?
- **Red:** Remove `@login_required` → `daftar` opens without login? Restore.

## Challenge

****Django Store Grand Opening:** combine `tambah_produk` + `daftar` + `api_produk`: add `stok` field, refuse sale at 0, show stock in API.**

Green: stock drops per sale. Yellow: stock 0 → sold-out message. Red: write 1 green `TestCase` + deploy (Task).

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 12: **Django Capstone** — complete store, **Django 0→Expert DONE!**
