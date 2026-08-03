# DRF: JWT, Permissions & Throttling

> Django | REST APIs & DRF | Lesson 11

## Learning Objectives

- Explain JWT: access & refresh tokens
- Obtain tokens via simplejwt (TokenObtainPairView)
- Write permission classes (IsAuthenticated, custom)
- Configure throttling to protect the API

---

## Program: DRF: JWT, Permissions & Throttling

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',  # JWT
    'katalog',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
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
SECRET_KEY = 'kunci-rahasia-dev'
DEBUG = True
ALLOWED_HOSTS = []

from datetime import timedelta  # noqa: E402

REST_FRAMEWORK = {
    # Auth: JWT adalah metode DEFAULT (bukan session)
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    # Perhatian: default di pelajaran ini = IsAuthenticated (lihat views)
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '20/min',   # pengunjung: 20 permintaan per menit
        'user': '100/min',  # user login: 100 per menit
    },
}

# simplejwt: konfigurasi token
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'AUTH_HEADER_TYPES': ('Bearer',),
}
```

---

## Explanation

## JWT: Tokens That Carry Identity
Login → POST /api/token/ {username, password} → {access, refresh}. The client sends Authorization: Bearer <access> on every request; JWTAuthentication verifies the signature without touching a session database. Short access tokens (30 minutes), long refresh tokens (7 days) - refresh only exchanges for a new access. Stateless = horizontally scalable APIs.
## Permission Classes: Who May Do What
IsAuthenticated = must log in (the global default). AllowAny = public. IsAdminUser = staff. Custom IsStaffOrReadOnly: SAFE_METHODS (GET/HEAD/OPTIONS) for everyone, writes (POST/PUT/DELETE) staff only. Permissions mount per-view or globally - composition like guards in NestJS. Common pairing: authentication (who) + permissions (what they may do).
## Throttling: The API Brake
Throttles cap requests: anon 20/minute, user 100/minute - protecting against brute force and abuse. Rate limits surface as HTTP headers (X-RateLimit-*) and 429 errors when exceeded. For production: tighter throttles on auth endpoints, looser on public read-only endpoints.
## The Full App Flow
Frontend: login → store tokens → send Authorization on every request → 401 when expired → refresh token → new token. Passwords hashed (Django built-in auth), JWT secret in env (lesson 15). Tokens are NOT stored in localStorage for sensitive apps - use secure httpOnly cookies (django-cookie-jar) or short-lived tokens.

---

## Experiments

1. **JWT: Tokens That Carry Identity**
2. **Permission Classes: Who May Do What**
3. **Throttling: The API Brake**
4. **The Full App Flow**

---

## Challenge

Harden the API: (1) write an IsOwnerOrReadOnly permission: objects with an owner field are editable only by their owner (has_object_permission + request.user == objek.pemilik), (2) add a Ulasan model with pemilik=FK User and apply that permission in its viewset, (3) add a dedicated throttle: 5/minute for the token endpoint (ScopedRateThrottle), (4) test: no token (401), wrong token (401), valid token (200), rate limit exceeded (429).

---

## Summary

JWT = stateless, access+refresh. Permissions = who may do what. Throttling = the API brake. Clear 401/403/429. Next: testing.
