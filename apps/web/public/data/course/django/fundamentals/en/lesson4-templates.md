# Templates: DTL, Inheritance & Static Files

> Django | Django Fundamentals | Lesson 4

## Learning Objectives

- Write DTL syntax: variables, tags, filters
- Use template inheritance (extends/block)
- Wire static files (css/js)
- Avoid heavy logic in templates

---

## Program: Templates: DTL, Inheritance & Static Files

```python
{% extends 'katalog/base.html' %}

{% block title %}{{ judul }}{% endblock %}

{% block konten %}
  <h1>{{ judul }}</h1>
  <p>Jumlah produk: {{ produk|length }}</p>

  <table>
    <thead>
      <tr><th>Nama</th><th>Harga</th></tr>
    </thead>
    <tbody>
      {% for p in produk %}
        <tr>
          <td>{{ p.nama }}</td>
          <td>Rp {{ p.harga|floatformat:0 }}</td>
        </tr>
      {% empty %}
        <tr><td colspan="2">Belum ada produk.</td></tr>
      {% endfor %}
    </tbody>
  </table>
{% endblock %}
```

---

## Explanation

## DTL: Variables, Tags, Filters
{{ produk|length }} = a variable + a filter. {% for %}, {% if %}, {% empty %}, {% block %}, {% extends %}, {% load static %} = tags (curly braces + %). Filters: |length, |upper, |date, |floatformat, |default. DTL is DELIBERATELY limited: no arbitrary function calls - keeping business logic out of presentation. If you need computation, do it in the view.
## Inheritance: One Skeleton, Many Pages
base.html = the skeleton (header, footer, css). Other pages {% extends 'katalog/base.html' %} and fill {% block konten %}. Change the navbar ONCE in base → every page follows. This is the most important DTL pattern: without inheritance every page repeats boilerplate and fixing the navbar becomes a 20-file job.
## Static Files: CSS, JS, Images
A static/ folder (per app or global via STATICFILES_DIRS) + {% load static %} + {% static 'css/style.css' %} → Django serves it in development; in production collectstatic gathers it for Nginx/CDN (lesson 15). Rule: assets that do not change per user = static; per-data content = templates.
## The Healthy View-Template Pattern
The view prepares ALL data (the context); the template only PRESENTS it. Signs of a healthy template: no computation, no queries, only loops + conditions + formatting. The same as "presentational" components in React/Vue - separate data and display, and both become easy to test and change.

---

## Experiments

1. **DTL: Variables, Tags, Filters**
2. **Inheritance: One Skeleton, Many Pages**
3. **Static Files: CSS, JS, Images**
4. **The Healthy View-Template Pattern**

---

## Challenge

Polish the UI: (1) build a second "Tentang" page extending the base (route + view + template), (2) add an extra block in base (e.g. {% block skrip %}) and fill it from the list page with a small JavaScript snippet, (3) add a static image (assets/logo.png) and show it in the header, (4) format prices with thousand separators (a custom template filter in katalog/templatetags/).

---

## Summary

DTL: {{ var }} + {% tag %} + filters. Inheritance = skeleton once. Static = assets. Views prepare data, templates present it. Next: querysets.
