# Templates & Template Language

> **Kategori:** Django | **Level:** Pemula | **Minggu 4:** Templates & Template Language

## Tujuan Pembelajaran

- Template syntax: {{ }}, {% %}, {{ | }}
- Template inheritance: extends, block
- For loop: {% for %} dan {% empty %}
- If/Else: {% if %}, {% else %}
- Filters: length, date, truncatewords

---

## Program: Template Pertama

```python
print("=== Django Templates ===")
print("=== Syntax ===")
print("{{ variable }}     - Output variable")
print("{% tag %}          - Template tag")
print("{{ value|filter }} - Filter")
print("")
print("=== Inheritance ===")
print("{% extends 'base.html' %}")
print("{% block title %}Home{% endblock %}")
print("{% block content %}")
print("    {% for product in products %}")
print("        <p>{{ product.name }} - ${{ product.price }}</p>")
print("    {% endfor %}")
print("{% endblock %}")
print("")
print("=== For Loop ===")
products = ["Laptop", "Mouse", "Keyboard"]
print("{% for product in products %}")
for p in products:
    print(f"  {p}")
print("{% empty %}")
print("  No products found")
print("{% endfor %}"

```

---

## Konsep Kunci

### Template Syntax
`{{ var }}` output, `{% tag %}` logic, `{{ val|filter }}` filter.

### Inheritance
`{% extends 'base.html' %}` inherit template. `{% block content %}` override block.

### For Loop
`{% for item in items %}`. `{% empty %}` jika kosong.

### Filters
`length`, `date`, `truncatewords`, `default`, `safe`.

---

## Eksperimen

- Buat base template dengan block
- Buat child template
- Implementasikan for loop
- Coba if/else
- Gunakan filters

---

## Tantangan

Buat template: base.html, home.html (list products). Gunakan inheritance dan for loop.

---

## Ringkasan

Minggu 4 dari 12: **Templates** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Forms**.
