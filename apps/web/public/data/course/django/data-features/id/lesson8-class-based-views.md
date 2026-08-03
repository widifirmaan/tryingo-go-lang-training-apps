# Class-Based Views & Mixins

> Django | Data & Fitur | Pelajaran 8

## Tujuan Pembelajaran

- Menjelaskan CBV: perilaku umum yang diwariskan
- Memakai ListView, DetailView, CreateView, UpdateView
- Meng-override get_queryset dan get_context_data
- Menggabungkan mixins (LoginRequiredMixin) dan paginasi

---

## Program: Class-Based Views & Mixins

```python
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.views.generic import CreateView, DetailView, ListView, UpdateView

from .models import Produk


# CBV: perilaku umum DIWARISKAN, bukan ditulis ulang
class ProdukListView(ListView):
    model = Produk
    template_name = 'katalog/daftar.html'
    context_object_name = 'produk'
    paginate_by = 5  # paginasi BAWAAN: ?page=2

    def get_queryset(self):
        # Override: kustomisasi query (filter dari ?q=)
        qs = super().get_queryset().select_related('kategori')
        kata = self.request.GET.get('q', '')
        if kata:
            qs = qs.filter(nama__icontains=kata)
        return qs

    def get_context_data(self, **kwargs):
        # Override: tambah data ke context template
        context = super().get_context_data(**kwargs)
        context['judul'] = 'Katalog Produk'
        return context


class ProdukDetailView(DetailView):
    model = Produk
    template_name = 'katalog/detail.html'
    context_object_name = 'item'


class ProdukCreateView(LoginRequiredMixin, CreateView):
    """LoginRequiredMixin: belum login -> redirect ke LOGIN_URL."""
    model = Produk
    template_name = 'katalog/form.html'
    fields = ['nama', 'harga', 'stok', 'kategori']
    success_url = reverse_lazy('daftar')  # lazy: URL di-resolve saat sukses


class ProdukUpdateView(LoginRequiredMixin, UpdateView):
    model = Produk
    template_name = 'katalog/form.html'
    fields = ['nama', 'harga', 'stok', 'kategori']
    success_url = reverse_lazy('daftar')
```

---

## Penjelasan

## CBV: Kode yang Tidak Ditulis Ulang
CRUD web selalu sama: list, detail, form create, form update. ListView(model=Produk) sudah menyediakan query, context (object_list), template default, dan paginasi. Anda TIDAK menulis view - Anda mengonfigurasi dan meng-override. Hasil: 4 halaman CRUD = 4 class ~10 baris, dibanding ~80 baris FBV. Aturan: mulailah dengan FBV untuk memahami, lalu CBV untuk produktivitas - keduanya sah.
## Override: Titik Kustomisasi
get_queryset() mengubah data yang diambil (filter ?q=, select_related). get_context_data() menambah variabel template (judul). get_success_url / success_url menentukan redirect setelah simpan. Form validation, URL kwargs (pk), 404 otomatis untuk id salah - SEMUA sudah ada. Menemukan titik override = memahami CBV.
## Mixins: Keamanan Lewat Komposisi
LoginRequiredMixin mengecek login SEBELUM view berjalan (setara @login_required, tapi sebagai class). Komposisi: class ProdukCreateView(LoginRequiredMixin, CreateView) - mixin di KIRI, view dasar di KANAN (urutan MRO penting). Mixin lain: PermissionRequiredMixin, UserPassesTestMixin. Pola komposisi yang sama dengan mixins di Vue/React HOC.
## Paginasi & Aturan Praktis
paginate_by = 5: ListView mengirim page_obj + is_paginated + url ?page=N. Template: previous/next + nomor halaman. Kapan CBV tidak cocok: view dengan logika POST kompleks atau banyak cabang - jangan memaksakan class; FBV tetap pilihan sah. Pragmatisme > dogma.

---

## Eksperimen

1. **CBV: Kode yang Tidak Ditulis Ulang**
2. **Override: Titik Kustomisasi**
3. **Mixins: Keamanan Lewat Komposisi**
4. **Paginasi & Aturan Praktis**

---

## Tantangan

Buat CRUD lengkap ala bootcamp: (1) tambah DeleteView (get_success_url kembali ke daftar) + template konfirmasi hapus, (2) tambah FormView untuk pencarian lanjutan (form dengan q + kategori), (3) ganti paginate_by menjadi 3 dan tambahkan navigasi halaman lengkap (first/last), (4) refactor satu FBV kompleks dari pelajaran 7 (kota) menjadi CBV dengan UserPassesTestMixin.

---

## Ringkasan

CBV = konfigurasi + override, bukan tulis ulang. get_queryset/get_context_data. Mixins di kiri. Paginasi bawaan. Lanjut: DRF serializers.
