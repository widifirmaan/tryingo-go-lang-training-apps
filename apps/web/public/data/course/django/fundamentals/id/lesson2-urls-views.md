# URLs & Views: Dispatcher & Path Converters

> Django | Fondasi Django | Pelajaran 2

## Tujuan Pembelajaran

- Menulis URL patterns dengan path() dan include()
- Memakai path converters: int, str, slug, uuid
- Menulis function-based views (FBV)
- Membaca query params dan mengembalikan JSON

---

## Program: URLs & Views: Dispatcher & Path Converters

```python
from django.http import Http404, HttpResponse, JsonResponse
from django.shortcuts import render

PRODUK = [
    {'id': 1, 'nama': 'Kopi Arabika', 'harga': 45000},
    {'id': 2, 'nama': 'Teh Melati', 'harga': 25000},
    {'id': 3, 'nama': 'Matcha Latte', 'harga': 55000},
]


def daftar(request):
    """View berbasis fungsi (FBV): render daftar produk."""
    return render(request, 'katalog/daftar.html', {'produk': PRODUK})


def detail(request, produk_id):
    """Path converter <int:produk_id> mengirimkan int (bukan string!)."""
    item = next((p for p in PRODUK if p['id'] == produk_id), None)
    if item is None:
        raise Http404('Produk tidak ditemukan')  # -> halaman 404
    return render(request, 'katalog/detail.html', {'item': item})


def cari(request):
    """Query params: ?q=teh -> request.GET['q']."""
    kata = request.GET.get('q', '')
    hasil = [p for p in PRODUK if kata.lower() in p['nama'].lower()]
    return render(request, 'katalog/cari.html', {'hasil': hasil, 'kata': kata})


def api_produk(request):
    """JsonResponse: balas JSON, dasar API (DRF di pelajaran 9)."""
    return JsonResponse({'produk': PRODUK})
```

---

## Penjelasan

## URLconf: Peta Route yang Jelas
urlpatterns adalah daftar pattern: path('produk/<int:produk_id>/', views.detail) mencocokkan URL dan MENGIRIM produk_id sebagai parameter view. Order penting: Django mencoba dari atas ke bawah, pattern pertama yang cocok menang. Konvensi nama (name='daftar') membuat template bisa merujuk dengan {% url 'daftar' %} - ganti URL tanpa menyentuh template.
## Path Converters: Tipe di URL
<int:...> hanya menerima angka (kirim 'abc' = 404), <str:...> teks, <slug:...> untuk slug (huruf-angka-tanda-sambung), <uuid:...>. Converter = validasi + konversi tipe dalam satu syntax. Aturan: URL yang ketat mencegah bug - 'produk/<int:id>' tidak akan pernah menerima sampah.
## FBV: Fungsi Biasa, Kekuatan Penuh
View = fungsi dengan request sebagai argumen, mengembalikan HttpResponse (render, JsonResponse, redirect). render(request, template, context) menggabungkan template + data. Http404 melempar respons 404 yang benar. FBV sederhana dan eksplisit - mulai dari sini sebelum melompat ke class-based views (pelajaran 8).
## Query Params & JSON
?q=teh dibaca via request.GET.get('q', '') - default saat tidak ada. JsonResponse({'produk': [...]}) mengembalikan JSON untuk frontend/mobile - inilah dasar API yang nanti diformalisasi dengan Django REST Framework (pelajaran 9).

---

## Eksperimen

1. **URLconf: Peta Route yang Jelas**
2. **Path Converters: Tipe di URL**
3. **FBV: Fungsi Biasa, Kekuatan Penuh**
4. **Query Params & JSON**

---

## Tantangan

Perluas katalog: (1) tambah route /produk/baru/ yang menerima POST sederhana dan menambah item ke PRODUK (ingat: ini akan hilang saat server restart - kenapa?), (2) tambah <slug:nama> converter di route detail lain, (3) buat route /statistik/ yang mengembalikan JsonResponse dengan jumlah produk dan total harga, (4) refactor PRODUK menjadi daftar dict dengan field tambahan stok.

---

## Ringkasan

URLconf = peta route. Path converters = tipe di URL. FBV = fungsi request→response. Query params & JSON. Lanjut: models & migrations.
