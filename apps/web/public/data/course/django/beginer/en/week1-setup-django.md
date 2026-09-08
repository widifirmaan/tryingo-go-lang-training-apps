# Django Setup — Shop with Automatic Admin

> **Kategori:** Django | **Level:** Beginner | **Minggu 1:** Setup Django

## Learning Objectives

- Install Django `pip install django`, check `django-admin --version`, create `django-admin startproject store .`
- `python manage.py runserver` on `localhost:8000`, `migrate`, `createsuperuser`
- Understand `project` (building) vs `app` (store in building)

---

## Why This Matters (Non-IT)

Django = shop with **automatic admin**: create a `Product` model → admin CRUD appears without coding. Fastest for non-IT learners needing a dashboard.

---

## Program: 5-Minute Django Shop

```bash
pip install django
django-admin --version
django-admin startproject store .
python manage.py startapp shop
python manage.py migrate
python manage.py createsuperuser # admin / admin123
python manage.py runserver
# Open http://localhost:8000 and http://localhost:8000/admin
```

**Structure:**
```
store/ (building)
  settings.py # building config
  urls.py # main doors
shop/ (store)
  models.py # racks
  views.py # waiters
  admin.py # admin cashier
```

Add `shop` to `INSTALLED_APPS` in `settings.py`.

---

## Key Concepts

### Project vs App
`startproject` = building, `startapp` = store inside. 1 building, many stores.

---

## Beginner Friendly Explanation

### Analogy: Mall with Free Admin
- **Project = mall building**, **app = your store**, **admin = free cashier desk** Django builds for every rack.

### Step 0 — Prepare Device
- Python 3.10+ (`python --version`), `pip install django`, folder `store/`.

### How the Computer Reads It
1. `startproject store .` → creates building files.
2. `runserver` → dev server on 8000 → `/admin` login works after `createsuperuser`.

### 3 Must-Know Terms
1. **project/app/admin**: building/store/cashier

---

## Experiments

- **Green:** `/admin` login → dashboard appears?
- **Yellow:** Forget `migrate` → admin tables missing error? Run it.
- **Red:** App missing from `INSTALLED_APPS` → models invisible? Add it.

---

## Challenge

**Live Shop:** Project + app + migrate + superuser + `/admin` login screenshot.

---

## Mini Glossary

- **project/app/migrate**: building/store/build

---

## Summary

Week 1: **Building & Store** — Django alive with admin. Next: **Models**.
