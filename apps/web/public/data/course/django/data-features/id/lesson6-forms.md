# Forms: ModelForm, Validasi & CSRF

> Django | Data & Fitur | Pelajaran 6

## Tujuan Pembelajaran

- Menulis ModelForm dan mengatur widget
- Memahami validasi: is_valid, cleaned_data, error
- Menulis clean_<field> dan clean untuk validasi custom
- Menggunakan {% csrf_token %} dan pola POST-redirect-GET

---

## Program: Forms: ModelForm, Validasi & CSRF

```python
from django import forms

from .models import Produk


class ProdukForm(forms.ModelForm):
    """ModelForm: form lahir dari model - validasi & field otomatis."""

    class Meta:
        model = Produk
        fields = ['nama', 'harga', 'stok', 'kategori']
        widgets = {
            'nama': forms.TextInput(attrs={'placeholder': 'Nama produk'}),
        }

    # Validasi custom: dipanggil setelah validasi bawaan
    def clean_harga(self):
        harga = self.cleaned_data['harga']
        if harga <= 0:
            raise forms.ValidationError('Harga harus lebih dari 0.')
        if harga > 100_000_000:
            raise forms.ValidationError('Harga terlalu besar.')
        return harga

    def clean(self):
        # clean(): validasi antar-field
        cleaned = super().clean()
        nama = cleaned.get('nama', '')
        stok = cleaned.get('stok', 0)
        if 'Gratis' in nama and stok > 0:
            raise forms.ValidationError('Produk gratis tidak boleh punya stok.')
        return cleaned
```

---

## Penjelasan

## ModelForm: Form Lahir dari Model
class ProdukForm(forms.ModelForm) dengan Meta.model + fields: field form dibuat dari tipe model (CharField → input text, DecimalField → number, FK → select). form.save() menyimpan instance baru ATAU update (instance=produk). Keuntungan: validasi tipe konsisten dengan database - tidak ada dua aturan yang bisa bertabrakan.
## Alur Validasi
POST masuk → Django membangun form dari request.POST → is_valid() menjalankan validasi berlapis (tipe field → clean_<field> → clean → model constraints) → form.cleaned_data berisi data BERSIH (tipe sudah benar, misal Decimal) atau form.errors. Aturan: jangan pernah membaca request.POST langsung untuk logika - selalu lewat cleaned_data.
## Validasi Custom: clean_<field> vs clean
clean_harga() memvalidasi SATU field (error menempel di field itu). clean() memvalidasi antar-field (non_field_errors). Keduanya mengembalikan cleaned_data - modifikasi di sini = data yang tersimpan. Ini gerbang validasi fail-fast yang sama seperti DTO di NestJS: input kotor tidak pernah mencapai logika bisnis.
## CSRF & POST-Redirect-GET
{% csrf_token %} menyisipkan token acak yang diverifikasi middleware: form dari situs LAIN gagal (proteksi CSRF). Pola POST-redirect-GET: setelah simpan, redirect (bukan render) agar refresh browser tidak mengirim ulang POST. Pesan sukses lewat messages framework.

---

## Eksperimen

1. **ModelForm: Form Lahir dari Model**
2. **Alur Validasi**
3. **Validasi Custom: clean_<field> vs clean**
4. **CSRF & POST-Redirect-GET**

---

## Tantangan

Perkuat forms: (1) tambah field ulasan di model Ulasan (produk FK, isi TextField, bintang 1-5) + ModelForm dengan widgets bintang pilihan, (2) validasi custom: bintang harus genap? (kreatif!) atau pastikan ulasan minimal 20 karakter, (3) tambah validasi di clean() yang menolak dua ulasan sama dari produk yang sama, (4) tampilkan daftar ulasan per produk di halaman detail.

---

## Ringkasan

ModelForm = validasi otomatis dari model. cleaned_data = satu-satunya sumber data. clean_<field>/clean. CSRF + PRG. Lanjut: authentication.
