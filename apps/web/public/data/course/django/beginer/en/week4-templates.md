# Templates & Template Language

> **Kategori:** Django | **Level:** Beginner | **Minggu 4:** Templates & Template Language

## Learning Objectives

- Template syntax: {{ }}, {% %}, {{ | }}
- Template inheritance: extends, block
- For loops: {% for %} and {% empty %}
- If/Else: {% if %}, {% else %}
- Filters: length, date, truncatewords

---

## Program: First Template

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

## Key Concepts

### Template Syntax
`{{ var }}` output, `{% tag %}` logic, `{{ val|filter }}` filter.

### Inheritance
`{% extends 'base.html' %}` inherits template. `{% block content %}` overrides block.

### For Loops
`{% for item in items %}`. `{% empty %}` if empty.

### Filters
`length`, `date`, `truncatewords`, `default`, `safe`.

---

## Experiments

- Create base template with blocks
- Create child template
- Implement for loop
- Try if/else
- Use filters

---

## Challenge

Create templates: base.html, home.html (list products). Use inheritance and for loops.

---

## Summary

Week 4 of 12: **Templates** (Level: Beginner). Beginner phase complete! Next week: **Forms**.
