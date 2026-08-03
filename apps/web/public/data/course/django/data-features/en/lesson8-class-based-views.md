# Class-Based Views & Mixins

> Django | Data & Features | Lesson 8

## Learning Objectives

- Explain CBVs: inherited common behavior
- Use ListView, DetailView, CreateView, UpdateView
- Override get_queryset and get_context_data
- Combine mixins (LoginRequiredMixin) and pagination

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

## Explanation

## CBVs: Code That Is Not Rewritten
Web CRUD is always the same: list, detail, create form, update form. ListView(model=Produk) already provides the query, the context (object_list), a default template, and pagination. You do not WRITE the view - you configure and override. Result: 4 CRUD pages = 4 classes of ~10 lines, versus ~80 lines of FBVs. Rule: start with FBVs to understand, then CBVs for productivity - both are valid.
## Overrides: The Customization Points
get_queryset() changes the fetched data (?q= filter, select_related). get_context_data() adds template variables (judul). get_success_url / success_url set the post-save redirect. Form validation, URL kwargs (pk), automatic 404 for bad ids - ALL built in. Finding the override points = understanding CBVs.
## Mixins: Security Through Composition
LoginRequiredMixin checks the login BEFORE the view runs (equivalent to @login_required, but as a class). Composition: class ProdukCreateView(LoginRequiredMixin, CreateView) - the mixin on the LEFT, the base view on the RIGHT (MRO order matters). Other mixins: PermissionRequiredMixin, UserPassesTestMixin. The same composition pattern as Vue mixins or React HOCs.
## Pagination & Practical Rules
paginate_by = 5: ListView delivers page_obj + is_paginated + the ?page=N url. Template: previous/next + page numbers. When CBVs do not fit: views with complex POST logic or many branches - do not force a class; FBVs stay a valid choice. Pragmatism over dogma.

---

## Experiments

1. **CBVs: Code That Is Not Rewritten**
2. **Overrides: The Customization Points**
3. **Mixins: Security Through Composition**
4. **Pagination & Practical Rules**

---

## Challenge

Build a full bootcamp-style CRUD: (1) add a DeleteView (get_success_url back to the list) + a delete-confirmation template, (2) add a FormView for advanced search (a form with q + kategori), (3) change paginate_by to 3 and add full page navigation (first/last), (4) refactor one complex FBV from lesson 7 (kota) into a CBV with UserPassesTestMixin.

---

## Summary

CBVs = configuration + overrides, not rewrites. get_queryset/get_context_data. Mixins on the left. Built-in pagination. Next: DRF serializers.
