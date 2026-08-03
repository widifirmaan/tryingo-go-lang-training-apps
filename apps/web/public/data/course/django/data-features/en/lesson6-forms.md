# Forms: ModelForms, Validation & CSRF

> Django | Data & Features | Lesson 6

## Learning Objectives

- Write ModelForms and configure widgets
- Understand validation: is_valid, cleaned_data, errors
- Write clean_<field> and clean for custom validation
- Use {% csrf_token %} and the POST-redirect-GET pattern

---

## Program: Forms: ModelForms, Validation & CSRF

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

## Explanation

## ModelForms: Forms Born from Models
class ProdukForm(forms.ModelForm) with Meta.model + fields: form fields are built from the model types (CharField → text input, DecimalField → number, FK → select). form.save() stores a new instance OR updates one (instance=produk). Benefit: type validation stays consistent with the database - two rules can never clash.
## The Validation Flow
A POST arrives → Django builds the form from request.POST → is_valid() runs layered validation (field types → clean_<field> → clean → model constraints) → form.cleaned_data holds CLEAN data (types fixed, e.g. Decimal) or form.errors. Rule: never read request.POST directly for logic - always go through cleaned_data.
## Custom Validation: clean_<field> vs clean
clean_harga() validates ONE field (the error attaches to that field). clean() validates across fields (non_field_errors). Both return cleaned_data - modifying here means modifying what gets stored. This is the same fail-fast validation gate as DTOs in NestJS: dirty input never reaches business logic.
## CSRF & POST-Redirect-GET
{% csrf_token %} inserts a random token verified by middleware: forms from OTHER sites fail (CSRF protection). The POST-redirect-GET pattern: after saving, redirect (not render) so a browser refresh never re-sends the POST. Success messages go through the messages framework.

---

## Experiments

1. **ModelForms: Forms Born from Models**
2. **The Validation Flow**
3. **Custom Validation: clean_<field> vs clean**
4. **CSRF & POST-Redirect-GET**

---

## Challenge

Strengthen forms: (1) add a Ulasan model (produk FK, isi TextField, 1-5 bintang) + a ModelForm with a star-select widget, (2) custom validation: ratings must be even? (be creative!) or ensure reviews are at least 20 characters, (3) add clean() validation rejecting duplicate reviews for the same product, (4) show per-product reviews on the detail page.

---

## Summary

ModelForms = automatic validation from models. cleaned_data = the only data source. clean_<field>/clean. CSRF + PRG. Next: authentication.
