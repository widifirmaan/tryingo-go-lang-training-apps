# Forms & Validation — Django Shop Forms

> **Kategori:** Django | **Level:** Intermediate | **Minggu 5:** Forms & Validasi
> **Prerequisites:** Week 4 — **Templates**.

## Learning Objectives

- `forms.Form` / `ModelForm` — `CharField`, `IntegerField` + `is_valid()` + `cleaned_data`

---

## Why This Matters (Non-IT)

Without `ModelForm`, hand-write HTML + manual validation 50 lines per form. With `ModelForm` + `is_valid()`, 5 lines + automatic errors.

---

## Program

```python
# shop/forms.py
from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ["name", "price", "stock"]

# views.py
def add(request):
    if request.method == "POST":
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("list")
    else:
        form = ProductForm()
    return render(request, "shop/form.html", {"form": form})
```

`form.html`: `{{ form.as_p }}` + `{% csrf_token %}`.


---

## Beginner Friendly Explanation

### Analogy: Model-Connected Form
- **ModelForm = form photocopied from the model card**: change the model (add a `stock` field) → the form follows, no new HTML.
- **`is_valid()` = cashier check**: empty/wrong format → reject + record `form.errors` (show in template!).

### Step 0 — Prepare Device
- Same as Django W1: `runserver` on `8000` (+ this week's package).

### How the Computer Reads It
- `ModelForm` reads the model → builds fields; `is_valid()` checks; `save()` stores.

### 3 Must-Know Terms
- 1. **ModelForm/is_valid**: connected/check

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 5: **Forms** — `ModelForm` + `is_valid()`. Next: **Auth**.
