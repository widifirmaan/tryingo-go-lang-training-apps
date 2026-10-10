# Forms & Validation

> **Kategori:** Django | **Level:** Menengah | **Minggu 5:** Forms & Validation

## Tujuan Pembelajaran

- Form class: forms.Form
- ModelForm: form dari model
- Form validation: is_valid, errors
- CSRF: {% csrf_token %}
- Rendering: as_p, as_table

---

## Program: Form Pertama

```python
# forms.py
print("=== Django Forms ===")
print("from django import forms")
print("class ProductForm(forms.Form):")
print("    name = forms.CharField(max_length=200)")
print("    price = forms.DecimalField(max_digits=10, decimal_places=2)")
print("    is_available = forms.BooleanField(required=False)")
print("")
print("=== ModelForm ===")
print("class ProductModelForm(forms.ModelForm):")
print("    class Meta:")
print("        model = Product")
print("        fields = ["name", "price", "is_available"]")
print("")
print("=== View with Form ===")
print("def create_product(request):")
print("    if request.method == "POST":")
print("        form = ProductModelForm(request.POST)")
print("        if form.is_valid():")
print("            form.save()")
print("            return redirect("product_list")")
print("    else:")
print("        form = ProductModelForm()")
print("    return render(request, "products/form.html", {"form": form})")

```

---

## Konsep Kunci

### Form Class
`forms.Form` - manual. `forms.ModelForm` - from model.

### Validation
`form.is_valid()`, `form.errors`, `form.cleaned_data`.

### CSRF
`{% csrf_token %}` required in POST forms.

### Rendering
`{{ form.as_p }}`, `{{ form.as_table }}`.

---

## Eksperimen

- Buat Form dengan 5+ fields
- Buat ModelForm
- Implementasikan form di view
- Coba validasi invalid data
- Custom error messages

---

## Tantangan

Buat form product: name, price, is_available. Validasi: name required, price > 0.

---

## Ringkasan

Minggu 5 dari 12: **Forms & Validation** (Level: Menengah). Minggu depan: **Authentication**.
