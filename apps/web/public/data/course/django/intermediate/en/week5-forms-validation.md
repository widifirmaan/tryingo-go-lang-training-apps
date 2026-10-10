# Forms & Validation

> **Kategori:** Django | **Level:** Intermediate | **Minggu 5:** Forms & Validation

## Learning Objectives

- Form class: forms.Form
- ModelForm: form from model
- Form validation: is_valid, errors
- CSRF: {% csrf_token %}
- Rendering: as_p, as_table

---

## Program: First Form

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

## Key Concepts

### Form Class
`forms.Form` - manual. `forms.ModelForm` - from model.

### Validation
`form.is_valid()`, `form.errors`, `form.cleaned_data`.

### CSRF
`{% csrf_token %}` required in POST forms.

### Rendering
`{{ form.as_p }}`, `{{ form.as_table }}`.

---

## Experiments

- Create Form with 5+ fields
- Create ModelForm
- Implement form in view
- Try invalid data validation
- Custom error messages

---

## Challenge

Create product form: name, price, is_available. Validate: name required, price > 0.

---

## Summary

Week 5 of 12: **Forms & Validation** (Level: Intermediate). Next week: **Authentication**.
