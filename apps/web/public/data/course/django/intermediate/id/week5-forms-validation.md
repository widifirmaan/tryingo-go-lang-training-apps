# Forms & Validasi — Formulir Warung Django

> **Kategori:** Django | **Level:** Menengah | **Minggu 5:** Forms & Validasi

## Tujuan Pembelajaran

- `forms.Form` / `ModelForm` — `CharField`, `IntegerField` + `is_valid()` + `cleaned_data`

---

## Program

```python
# warung/forms.py
from django import forms
from .models import Produk

class ProdukForm(forms.ModelForm):
    class Meta:
        model = Produk
        fields = ["nama", "harga", "stok"]

# views.py
def tambah(request):
    if request.method == "POST":
        form = ProdukForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("daftar")
    else:
        form = ProdukForm()
    return render(request, "warung/form.html", {"form": form})
```

`form.html`: `{{ form.as_p }}` + `{% csrf_token %}`.

---

## Ringkasan

Minggu 5: **Formulir** — `ModelForm` + `is_valid()`.
