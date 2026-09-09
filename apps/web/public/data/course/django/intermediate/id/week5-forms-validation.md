# Forms & Validasi — Formulir Warung Django

> **Kategori:** Django | **Level:** Menengah | **Minggu 5:** Forms & Validasi

## Tujuan Pembelajaran

- `forms.Form` / `ModelForm` — `CharField`, `IntegerField` + `is_valid()` + `cleaned_data`

---

## Kenapa Ini Penting Buat Kamu?

Tanpa `ModelForm`, tulis HTML + validasi manual 50 baris per form. Dengan `ModelForm` + `is_valid()`, 5 baris + error otomatis.

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

## Penjelasan untuk Pemula

### Analogi: Formulir Terhubung Model
- **ModelForm = formulir fotokopi dari kartu model**: ganti model (tambah field `stok`) → form ikut berubah, tanpa tulis HTML baru.
- **`is_valid()` = kasir cek**: kosong/salah format → tolak + catat `form.errors` (tampilkan di template!).

### Langkah 0 — Siapkan Device
- Sama Django W1: `runserver` di `8000` (+ paket minggu ini).

### Cara Komputer Membaca
- `ModelForm` baca model → buat field; `is_valid()` cek; `save()` simpan.

### 3 Istilah Wajib
- 1. **ModelForm/is_valid**: terhubung/cek

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 5: **Formulir** — `ModelForm` + `is_valid()`. Minggu depan: **Authentication**.
