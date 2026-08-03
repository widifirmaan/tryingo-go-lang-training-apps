# QuerySets: Filtering, Aggregation & N+1

> Django | Data & Features | Lesson 5

## Learning Objectives

- Write QuerySets: filter, exclude, order_by
- Use Q objects for complex OR/AND
- Compute aggregations in the database (aggregate/annotate)
- Avoid N+1 with select_related & prefetch_related

---

## Program: QuerySets: Filtering, Aggregation & N+1

```python
from django.db.models import Avg, Count, Max, Min, Q
from django.shortcuts import render

from .models import Kategori, Produk


def daftar(request):
    # QuerySet LAZY: SQL dijalankan saat data benar-benar dibutuhkan
    produk = Produk.objects.all()

    # Filter dinamis dari query params
    kata = request.GET.get('q', '')
    if kata:
        produk = produk.filter(nama__icontains=kata)  # LIKE %kata%
    kategori_id = request.GET.get('kategori')
    if kategori_id:
        produk = produk.filter(kategori_id=kategori_id)

    # Q object: kombinasi kondisi (OR)
    produk = produk.filter(Q(stok__gt=0) | Q(tersedia=True))

    # select_related: JOIN kategori SEKALIGUS (hindari N+1)
    produk = produk.select_related('kategori')

    # Agregasi: hitung di DATABASE, bukan di Python
    statistik = Produk.objects.aggregate(
        rata_rata=Avg('harga'),
        termurah=Min('harga'),
        termahal=Max('harga'),
        total=Count('id'),
    )

    return render(request, 'katalog/daftar.html', {
        'produk': produk,
        'kategori': Kategori.objects.all(),
        'statistik': statistik,
    })


def kategori_rekap(request):
    # annotate: kolom baru per grup (COUNT per kategori)
    rekap = Kategori.objects.annotate(jumlah=Count('produk'))
    return render(request, 'katalog/rekap.html', {'rekap': rekap})
```

---

## Explanation

## QuerySets: Lazy & Chainable
Produk.objects.filter(...) does NOT run SQL - a QuerySet is lazy: SQL executes when evaluated (iteration, list(), len()). Because of laziness you chain filters for free: .filter(a).filter(b).order_by('-harga') builds step by step. .filter(nama__icontains=kata) = LIKE %kata% (case-insensitive). Field lookups: __icontains, __gt, __lt, __in, __startswith, __date - an expressive query language.
## Q Objects: OR in a Single Query
filter(Q(stok__gt=0) | Q(tersedia=True)) combines conditions with | (OR) and & (AND). Without Q, an OR must be split into two queries. Q also combines with plain filters: filter(Q(...), nama__icontains='teh').
## Aggregation in the Database, Not Python
aggregate(Avg('harga'), Min, Max, Count) computes in the DATABASE - once per query, without pulling 10,000 rows into memory. annotate(Count('produk')) adds a per-row result column (per category). Performance rule: compute in SQL, not Python - the database is optimized for this.
## N+1: Performance Killer #1
Looping 100 products → 1 product query + 100 category queries = 101 queries (N+1). select_related('kategori') turns this into ONE query with a JOIN (for FK/one-to-one). prefetch_related for many-to-many (two queries). Debug: the Django Debug Toolbar shows the query count per page - use it as your compass.

---

## Experiments

1. **QuerySets: Lazy & Chainable**
2. **Q Objects: OR in a Single Query**
3. **Aggregation in the Database, Not Python**
4. **N+1: Performance Killer #1**

---

## Challenge

Analytics challenge: (1) build a /produk/terlaris/ page showing the 10 best-stocked products (order_by('-stok')[:10]), (2) add price filters ?min=...&max=... (__gte/__lte), (3) show products without a category (kategori__isnull=True), (4) build a per-category recap page with SUM stock and average price (annotate + Sum/Avg).

---

## Summary

QuerySets lazy & chainable. Q = OR. Aggregation in the DB. select_related vs N+1. Next: forms & validation.
