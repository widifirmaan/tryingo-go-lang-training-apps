# Templates — Pretty Django Shop Tables

> **Kategori:** Django | **Level:** Beginner | **Minggu 4:** Templates & Template Language

## Learning Objectives

- `{{ name }}` displays, `{% for %}` repeats, `{% if %}` decides, `|length` filters (source: docs.djangoproject.com/topics/templates)
- Inheritance `{% extends "base.html" %}` + `{% block content %}` — write header 1x, use on 10 pages

---

## Why This Matters (Non-IT)

Without inheritance, headers/footers written in 10 files — changing the WA number edits 10x. With `extends`, edit `base.html` 1x → 10 pages follow. `{% empty %}` shows "empty" automatically, no manual `if`.

---

## Program: Table Inheriting Frame

```html
<!-- shop/templates/base.html — frame (write once) -->
<!DOCTYPE html>
<html lang="en">
<body>
  <header><h1>Siti's Shop</h1><nav><a href="/products/">Products</a></nav></header>
  <main>{% block content %}{% endblock %}</main>
  <footer>WA 0812 — {{ year|default:"2026" }}</footer>
</body>
</html>
```

```html
<!-- shop/templates/shop/list.html — content (inherits) -->
{% extends "base.html" %}
{% block content %}
<h2>Catalog ({{ products|length }} items)</h2>
{% if products %}
<ul>
  {% for p in products %}
  <li>{{ p.name }} - Rp{{ p.price }}{% if p.stock == 0 %} (gone){% endif %}</li>
  {% empty %}
  <li>No products yet</li>
  {% endfor %}
</ul>
{% else %}
<p>Empty</p>
{% endif %}
{% endblock %}
```

---

## Key Concepts

### `{{ }}` vs `{% %}` vs `|`
- `{{ name }}` displays, `{% for %}`/`{% if %}` logic, `{{ list|length }}` filters.

### `extends` + `block` = Inheritance
`base.html` frame + `{% block content %}` hole → children fill the hole.

### `{% empty %}` = When Empty
Inside `for`, shows when the list is empty.

---

## Beginner Friendly Explanation

### Analogy: Photo Frame & Picture
- **base.html = frame**: fixed header/footer.
- **list.html = photo**: swaps per page.
- **`|length` filter = counter**: auto-counts.

### Step 0 — Prepare Device
- Same as W1-W3: `runserver`, open `/products/`.

### How the Computer Reads It
1. `{% extends "base.html" %}` → takes the frame.
2. `{% block content %}` → pastes child content into the frame hole.

### 3 Must-Know Terms
1. **extends/block**: inherit/hole
2. **for/empty**: repeat/empty
3. **Filter `|`**: display processing

---

## Experiments

- **Green:** `{{ "rice"|upper }}` → "RICE"? `{{ products|length }}` → 3?
- **Yellow:** Remove `extends` → header gone? Reattach.
- **Red:** `{% for p in emptyproducts %}` without `empty` → gaping blank? Add `empty`.

---

## Challenge

**Complete Table Shop:** `base.html` (header/nav/footer) + `list.html` (`extends`, `for` + `empty`, `if stock==0`) + `detail.html` (`{{ p.name }}` + `|date:"d M Y"` for `created`). **Beginner Django DONE!**

---

## Mini Glossary

- **extends/block/for**: inherit/hole/repeat
- **filter/date**: process/date

---

## Summary

Week 4 of 4: **Pretty Tables** (Level: Beginner). **Beginner Django DONE!** Next: **Forms** (Intermediate).
