# Deployment — Open Django Branch

> **Kategori:** Django | **Level:** Advanced | **Minggu 11:** Deployment
> **Prerequisites:** Week 10 — **Caching**.

## Learning Objectives

- `gunicorn` + `Vercel`/`Railway` deploy `shop-django.vercel.app`, `collectstatic`

---

## Why This Matters (Non-IT)

Local `localhost` is laptop-only. `gunicorn` + Railway + `collectstatic` + `DEBUG=False` = safe public URL.

---

## Program

```bash
pip install gunicorn
python manage.py collectstatic
gunicorn store.wsgi
# Deploy: vercel --prod or railway
```

`settings.py`: `ALLOWED_HOSTS = ["*"]`, `DEBUG=False`, `DATABASE_URL` from env.


---

## Beginner Friendly Explanation

### Analogy: Open Django Branch
- **`runserver` = pushcart**: nice for roaming (dev), forbidden for permanent branches (1 buyer, dies when the laptop closes!).
- **`gunicorn` = shophouse + staff**: serves many buyers together + lives on. `collectstatic` = moves paint/banners (CSS) into 1 warehouse so the production shophouse finds them. `DEBUG=False` + env = branch vault keys!

### Step 0 — Prepare Device
- Same as Django W1: `runserver` on `8000` (+ this week's package).

### How the Computer Reads It
- `collectstatic` gathers CSS; `gunicorn` serves; env holds secrets (not files!).

### 3 Must-Know Terms
- 1. **gunicorn/collectstatic**: serve/gather-css

---

## Experiments

- **Green:** Run the Program as-is; note the first output line.
- **Yellow:** Change 1 number/string in the Program → predict first, then run.
- **Red:** Delete 1 line in the Program → what is the first error? Restore it.

## Challenge

**Deployment in Your Shop:** use `pip install gunicorn`, `python manage`, `gunicorn store` until it truly runs, then do these three levels.
- **Green:** Run this week's Program as-is; note the output.
- **Yellow:** Change 1 value in `pip install gunicorn`, `python manage`, `gunicorn store`; predict the output BEFORE running, then compare.
- **Red:** Combine with **Caching** (Week 10): plug the result into that flow, end-to-end must work.

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 11: **Open Django Branch** — `gunicorn`. Next: **Capstone**.
