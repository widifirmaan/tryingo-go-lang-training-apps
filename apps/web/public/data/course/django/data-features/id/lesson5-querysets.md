# QuerySets: Filter, Agregasi & N+1

> Django | Data & Fitur | Pelajaran 5

## Tujuan Pembelajaran

- Menulis QuerySet: filter, exclude, order_by
- Menggunakan Q objects untuk OR/AND kompleks
- Menghitung agregasi di database (aggregate/annotate)
- Menghindari N+1 dengan select_related & prefetch_related

---

## Program: QuerySets: Filter, Agregasi & N+1

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

## Penjelasan

## QuerySet: Lazy & Chaining
Produk.objects.filter(...) TIDAK menjalankan SQL - QuerySet itu lazy: SQL dieksekusi saat dievaluasi (iterasi, list(), len()). Karena lazy, Anda bisa merangkai filter tanpa biaya: .filter(a).filter(b).order_by('-harga') dibangun bertahap. .filter(nama__icontains=kata) = LIKE %kata% (case-insensitive). Field lookups: __icontains, __gt, __lt, __in, __startswith, __date - bahasa query yang ekspresif.
## Q Objects: OR dalam Satu Query
filter(Q(stok__gt=0) | Q(tersedia=True)) menggabungkan kondisi dengan | (OR) dan & (AND). Tanpa Q, OR harus dipecah menjadi dua query. Q juga bisa dikombinasikan dengan filter biasa: filter(Q(...), nama__icontains='teh').
## Agregasi di Database, Bukan Python
aggregate(Avg('harga'), Min, Max, Count) menghitung di DATABASE - sekali per query, tidak menaruh 10.000 baris ke memori. annotate(Count('produk')) menambah kolom hasil per baris (per kategori). Aturan performa: hitung di SQL, bukan di Python - database dioptimalkan untuk ini.
## N+1: Pembunuh Performa #1
Loop 100 produk → 1 query produk + 100 query kategori = 101 query (N+1). select_related('kategori') mengubahnya jadi SATU query dengan JOIN (untuk FK/one-to-one). prefetch_related untuk many-to-many (dua query). Debug: Django Debug Toolbar menampilkan jumlah query per halaman - pakai itu sebagai kompas.

---

## Eksperimen

1. **QuerySet: Lazy & Chaining**
2. **Q Objects: OR dalam Satu Query**
3. **Agregasi di Database, Bukan Python**
4. **N+1: Pembunuh Performa #1**

---

## Tantangan

Tantangan analitik: (1) buat halaman /produk/terlaris/ menampilkan 10 produk dengan stok terbanyak (order_by('-stok')[:10]), (2) tambah filter harga ?min=...&max=... (__gte/__lte), (3) tampilkan produk tanpa kategori (kategori__isnull=True), (4) buat halaman rekap per kategori dengan SUM stok dan rata-rata harga (annotate + Sum/Avg).

---

## Ringkasan

QuerySet lazy & chainable. Q = OR. Agregasi di DB. select_related lawan N+1. Lanjut: forms & validasi.
