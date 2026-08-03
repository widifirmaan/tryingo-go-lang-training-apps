# Django Intro: MVT & the Request Lifecycle

> Django | Django Fundamentals | Lesson 1

## Learning Objectives

- Explain why Django: batteries included, admin, ORM, security
- Distinguish project vs app
- Understand MVT: Model, View, Template
- Follow a request from URL to response

---

## Program: Django Intro: MVT & the Request Lifecycle

```python
"""URLconf root: peta semua route proyek."""
from django.contrib import admin
from django.urls import include, path

from katalog import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # Request masuk -> URLconf root -> dicocokkan dengan pola
    path('', views.beranda, name='beranda'),
    path('katalog/', include('katalog.urls')),  # delegasi ke app
]
```

---

## Explanation

## Why Django? "Batteries Included"
Django is Python's most complete web framework: ORM, an automatic admin panel, an auth system, forms, security (CSRF, XSS, SQL injection) ALL built in. Unlike Express (pick components yourself) or Flask (minimal), Django arrives ready - one framework for the whole backend. This is why enterprises and government projects have used Django for 20 years.
## Project vs App
A project = the whole site (settings, root urls, wsgi). An app = one feature/domain (catalog, users, orders). One project holds many apps; one app can be reused in several projects. Bootcamp rule: start with one app per domain, not one giant app.
## MVT: Not MVC
Model = data structure (DB tables). View = the function/class receiving a request, processing it, and returning a response. Template = an HTML file with the Django Template Language. The difference from MVC: the "controller" role lives in the URLconf + the view itself, and templates may contain simple presentation logic. Flow: URL → View → (Model) → Template → HTML.
## The Request Lifecycle: One Request, One Full Journey
Request in → settings (middleware) → root URLconf (myproject/urls.py) → pattern match → include() to the app urls → the view runs → the view uses Models/ORM when needed → render the Template → the response goes back through middleware. Memorizing this path answers half of Django interview questions.

---

## Experiments

1. **Why Django? "Batteries Included"**
2. **Project vs App**
3. **MVT: Not MVC**
4. **The Request Lifecycle: One Request, One Full Journey**

---

## Challenge

Create a second app named berita: (1) python manage.py startapp berita, (2) register it in INSTALLED_APPS, (3) create urls.py inside the app and include it from the root, (4) write a daftar_berita view rendering a list of 3 news items (a Python list in the view). Write down your project folder structure.

---

## Summary

Django = batteries included. Project vs app. MVT: Model-View-Template. Flow: URL → View → Model → Template. Next: URLs & views.
