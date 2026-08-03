# Security: SQLi, XSS, CSRF & Headers

> Django | Testing & Security | Lesson 13

## Learning Objectives

- Explain Django built-in protections: SQLi, XSS, CSRF
- Read hardening settings: HTTPS, HSTS, cookies
- Use the ORM vs raw SQL: parameterized queries
- Understand template autoescape and CSRF tokens

---

## Program: Security: SQLi, XSS, CSRF & Headers

```python
import os

from django.core.exceptions import ImproperlyConfigured


def env_bool(key, default=False):
    return os.getenv(key, str(default)).lower() in ('1', 'true', 'yes')


# SECRET: dari environment, BUKAN hardcode (pelajaran 15)
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'kunci-rahasia-dev')

DEBUG = env_bool('DJANGO_DEBUG', True)

ALLOWED_HOSTS = os.getenv('DJANGO_ALLOWED_HOSTS', '*').split(',')

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'katalog',
]

MIDDLEWARE = [
    # SecurityMiddleware: header keamanan otomatis (lihat bawah)
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # CsrfViewMiddleware: memblokir POST tanpa token valid
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'myproject.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'db.sqlite3',
    }
}

STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ---- Hardening: hanya aktif saat DEBUG=False ----
# HTTPS paksa + cookie hanya lewat HTTPS
SECURE_SSL_REDIRECT = not DEBUG
SESSION_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_SECURE = not DEBUG

# Header HTTP: X-Content-Type-Options, X-Frame-Options,
# Strict-Transport-Security, Referrer-Policy, Cross-Origin-Opener-Policy
SECURE_HSTS_SECONDS = 31536000 if not DEBUG else 0
SECURE_HSTS_INCLUDE_SUBDOMAINS = not DEBUG
SECURE_HSTS_PRELOAD = not DEBUG
SECURE_REFERRER_POLICY = 'same-origin'
X_FRAME_OPTIONS = 'DENY'
```

---

## Explanation

## SQL Injection: Not in the ORM
The ORM turns filter() into parameterized queries: user input becomes a PARAMETER, never SQL text. Artikel.objects.filter(judul__icontains="x' OR 1=1") cannot leak data - even if the user sends malicious SQL. Rule: NEVER concatenate strings into raw SQL. If raw SQL is unavoidable (raw()/connection.cursor), always parameterize: cursor.execute(sql, [value]).
## XSS: Autoescape Is the Shield
Django templates escape {{ var }} automatically: <script> becomes &lt;script&gt; - user input renders as TEXT, not HTML. Explicit exceptions: |safe, mark_safe, autoescape off - only for content you control. Rule: never mark user input as safe.
## CSRF: A Token Proving Intent
A POST without a valid CSRF token = 403. A random per-session token, verified by middleware - forms from OTHER sites cannot forge actions of a logged-in user. {% csrf_token %} in every POST form; for APIs, CSRFExemptView or the cookie token (two sources - both must match).
## Hardening: Headers & HTTPS
DEBUG=False enables: SECURE_SSL_REDIRECT (HTTP→HTTPS), SESSION_COOKIE_SECURE + CSRF_COOKIE_SECURE (cookies over HTTPS only), HSTS (browser allows HTTPS-only for this domain), X_FRAME_OPTIONS DENY (anti-clickjacking), X-Content-Type-Options. SECRET_KEY from env, ALLOWED_HOSTS restricted (not '*'). Audit with securityheaders.com / Mozilla Observatory.

---

## Experiments

1. **SQL Injection: Not in the ORM**
2. **XSS: Autoescape Is the Shield**
3. **CSRF: A Token Proving Intent**
4. **Hardening: Headers & HTTPS**

---

## Challenge

Audit your project security: (1) install django-debug-toolbar and check the query count on the news page (N+1?), (2) add a Referrer-Policy & Content-Security-Policy header (minimal CSP: default-src self) in settings, (3) build a public comment form with validation and render it via |linebreaksbr (escaping stays on), then test an isi of <script>alert(1)</script> - it must display as text, (4) replace ALLOWED_HOSTS with real domains (not *) and verify a 400 error when using a foreign host.

---

## Summary

ORM = parameterized (anti-SQLi). Autoescape = anti-XSS. CSRF tokens = anti-forgery. Hardening headers at DEBUG=False. Next: caching & async.
