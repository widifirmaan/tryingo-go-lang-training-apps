// ============================================================================
// generate-django-materials.mjs
// Django track: 18 lessons x 2 languages (id/en) -> 36 markdown + 36 project JSON.
// Structure based on Django bootcamp/roadmap research 2026 (ZTM Django Bootcamp,
// appwars "Django Roadmap 2026", Django Wiki 2026 roadmap, Evynta Django 6.0 guide,
// Coursera Django roadmap). Research phases (AppWars, Django Wiki):
//   1. Django fundamentals  : MVT, request lifecycle, URLs & views,
//                             models & migrations, templates
//   2. Data & features      : querysets, forms, auth, class-based views
//   3. REST APIs & DRF      : serializers, viewsets & routers, JWT & permissions
//   4. Testing & security   : tests, security, caching & async
//   5. Production & capstone: settings & PostgreSQL, Docker + Gunicorn/Nginx,
//                             CI/CD, capstone
// Python basics are a separate Tryngo track (pre-requisite), so this track
// starts directly at Django.
// Each lesson ships a full minimal Django project (files JSON) runnable via
// StackBlitz webcontainers (python3 manage.py runserver); the lesson's key
// file is the markdown code block.
// ============================================================================
import fs from 'fs';
import path from 'path';

const BASE = new URL('../public/data/course/django', import.meta.url).pathname;
const BASE_DIR = process.platform === 'win32' ? BASE.slice(1) : BASE;

const PHASES = [
  { phase: 1, id: 'fundamentals', nameId: 'Fondasi Django', nameEn: 'Django Fundamentals' },
  { phase: 2, id: 'data-features', nameId: 'Data & Fitur', nameEn: 'Data & Features' },
  { phase: 3, id: 'drf-apis', nameId: 'REST API & DRF', nameEn: 'REST APIs & DRF' },
  { phase: 4, id: 'testing-security', nameId: 'Testing & Keamanan', nameEn: 'Testing & Security' },
  { phase: 5, id: 'production', nameId: 'Produksi & Capstone', nameEn: 'Production & Capstone' },
];

const PKG_DJANGO = (name, desc, deps) => `{
  "name": "${name}",
  "version": "1.0.0",
  "private": true,
  "description": "${desc}",
  "scripts": {
    "dev": "pip install -r requirements.txt && python3 manage.py runserver"
  },
  "dependencies": ${deps}
}`;

const REQ_DJANGO = (extra = []) => ['Django>=5.2,<6.1', 'djangorestframework>=3.16.0', ...extra].join('\n');

const PKG_NODE = `{
  "name": "django-lesson",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "python3 index.py"
  }
}`;

const MANAGE_PY = `#!/usr/bin/env python
import os
import sys


def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            'Tidak bisa import Django. Apakah sudah terpasang?'
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()`;

// ===== PHASE 1: DJANGO FUNDAMENTALS (lessons 1-4) =====
const LESSONS_P1 = [
  {
    phase: 1, num: 1, topicId: 'pengenalan-django',
    titleId: 'Pengenalan Django: MVT & Request Lifecycle', titleEn: 'Django Intro: MVT & the Request Lifecycle',
    codeFile: 'myproject/urls.py',
    files: {
      'manage.py': MANAGE_PY,
      'myproject/__init__.py': '',
      'myproject/settings.py': `# Konfigurasi proyek: satu file untuk semua pengaturan
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'katalog',  # app buatan kita
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
ALLOWED_HOSTS = []`,
      'myproject/urls.py': `"""URLconf root: peta semua route proyek."""
from django.contrib import admin
from django.urls import include, path

from katalog import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # Request masuk -> URLconf root -> dicocokkan dengan pola
    path('', views.beranda, name='beranda'),
    path('katalog/', include('katalog.urls')),  # delegasi ke app
]`,
      'myproject/wsgi.py': `import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
application = get_wsgi_application()`,
      'katalog/__init__.py': '',
      'katalog/apps.py': `from django.apps import AppConfig


class KatalogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'katalog'`,
      'katalog/views.py': `from django.http import HttpResponse


def beranda(request):
    # View: fungsi Python yang menerima request dan mengembalikan response
    return HttpResponse('<h1>Selamat datang di Tryngo Django!</h1>')`,
      'katalog/urls.py': `from django.urls import path

from . import views

urlpatterns = [
    path('', views.beranda, name='beranda'),
]`,
      'package.json': PKG_NODE,
      'requirements.txt': 'Django>=5.2,<6.1\n',
      'README.md': `# Django Lesson 1 - Pengenalan

Jalankan: pip install -r requirements.txt && python3 manage.py runserver
Buka http://localhost:8000/`,
    },
    objId: [
      'Menjelaskan kenapa Django: batteries included, admin, ORM, keamanan',
      'Membedakan project dan app',
      'Memahami MVT: Model, View, Template',
      'Mengikuti alur request dari URL sampai respons',
    ],
    objEn: [
      'Explain why Django: batteries included, admin, ORM, security',
      'Distinguish project vs app',
      'Understand MVT: Model, View, Template',
      'Follow a request from URL to response',
    ],
    expId: `## Kenapa Django? "Batteries Included"
Django adalah framework web Python yang paling lengkap: ORM, admin panel otomatis, auth system, forms, security (CSRF, XSS, SQL injection) SEMUA bawaan. Tidak seperti Express (pilih komponen sendiri) atau Flask (minimal), Django datang siap pakai - satu framework untuk seluruh backend. Inilah kenapa Django dipakai enterprise dan proyek pemerintah selama 20 tahun.
## Project vs App
Project = seluruh situs (settings, root urls, wsgi). App = satu fitur/domain (katalog, user, order). Satu project bisa berisi banyak app; satu app bisa dipakai di beberapa project. Aturan bootcamp: mulai dengan app per domain, bukan satu app raksasa.
## MVT: Bukan MVC
Model = struktur data (tabel DB). View = fungsi/class yang menerima request, memproses, mengembalikan response. Template = file HTML dengan Django Template Language. Bedanya dari MVC: View "controller"-nya ada di URLconf + view itu sendiri, dan Template bisa berisi logika tampilan sederhana. Flow: URL → View → (Model) → Template → HTML.
## Request Lifecycle: Satu Permintaan, Perjalanan Utuh
Request masuk → settings (middleware) → URLconf root (myproject/urls.py) → cocokkan pola → include() ke app urls → view dipanggil → view memakai Model/ORM kalau perlu → render Template → respons kembali lewat middleware. Menghafal jalur ini menjawab setengah pertanyaan wawancara Django.`,
    expEn: `## Why Django? "Batteries Included"
Django is Python's most complete web framework: ORM, an automatic admin panel, an auth system, forms, security (CSRF, XSS, SQL injection) ALL built in. Unlike Express (pick components yourself) or Flask (minimal), Django arrives ready - one framework for the whole backend. This is why enterprises and government projects have used Django for 20 years.
## Project vs App
A project = the whole site (settings, root urls, wsgi). An app = one feature/domain (catalog, users, orders). One project holds many apps; one app can be reused in several projects. Bootcamp rule: start with one app per domain, not one giant app.
## MVT: Not MVC
Model = data structure (DB tables). View = the function/class receiving a request, processing it, and returning a response. Template = an HTML file with the Django Template Language. The difference from MVC: the "controller" role lives in the URLconf + the view itself, and templates may contain simple presentation logic. Flow: URL → View → (Model) → Template → HTML.
## The Request Lifecycle: One Request, One Full Journey
Request in → settings (middleware) → root URLconf (myproject/urls.py) → pattern match → include() to the app urls → the view runs → the view uses Models/ORM when needed → render the Template → the response goes back through middleware. Memorizing this path answers half of Django interview questions.`,
    chId: 'Buat app kedua bernama berita: (1) python manage.py startapp berita, (2) daftarkan di INSTALLED_APPS, (3) buat urls.py di app dan include dari root, (4) buat view daftar_berita yang merender daftar 3 berita (list Python di-view). Tuliskan struktur folder proyek Anda.',
    chEn: 'Create a second app named berita: (1) python manage.py startapp berita, (2) register it in INSTALLED_APPS, (3) create urls.py inside the app and include it from the root, (4) write a daftar_berita view rendering a list of 3 news items (a Python list in the view). Write down your project folder structure.',
    sumId: 'Django = batteries included. Project vs app. MVT: Model-View-Template. Alur: URL → View → Model → Template. Lanjut: URLs & views.',
    sumEn: 'Django = batteries included. Project vs app. MVT: Model-View-Template. Flow: URL → View → Model → Template. Next: URLs & views.',
  },
  {
    phase: 1, num: 2, topicId: 'urls-views',
    titleId: 'URLs & Views: Dispatcher & Path Converters', titleEn: 'URLs & Views: The Dispatcher & Path Converters',
    codeFile: 'katalog/views.py',
    files: {
      'manage.py': MANAGE_PY,
      'myproject/__init__.py': '',
      'myproject/settings.py': `INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
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
ALLOWED_HOSTS = []`,
      'myproject/urls.py': `from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('katalog.urls')),  # semua route katalog di sini
]`,
      'myproject/wsgi.py': `import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
application = get_wsgi_application()`,
      'katalog/__init__.py': '',
      'katalog/apps.py': `from django.apps import AppConfig


class KatalogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'katalog'`,
      'katalog/views.py': `from django.http import Http404, HttpResponse, JsonResponse
from django.shortcuts import render

PRODUK = [
    {'id': 1, 'nama': 'Kopi Arabika', 'harga': 45000},
    {'id': 2, 'nama': 'Teh Melati', 'harga': 25000},
    {'id': 3, 'nama': 'Matcha Latte', 'harga': 55000},
]


def daftar(request):
    """View berbasis fungsi (FBV): render daftar produk."""
    return render(request, 'katalog/daftar.html', {'produk': PRODUK})


def detail(request, produk_id):
    """Path converter <int:produk_id> mengirimkan int (bukan string!)."""
    item = next((p for p in PRODUK if p['id'] == produk_id), None)
    if item is None:
        raise Http404('Produk tidak ditemukan')  # -> halaman 404
    return render(request, 'katalog/detail.html', {'item': item})


def cari(request):
    """Query params: ?q=teh -> request.GET['q']."""
    kata = request.GET.get('q', '')
    hasil = [p for p in PRODUK if kata.lower() in p['nama'].lower()]
    return render(request, 'katalog/cari.html', {'hasil': hasil, 'kata': kata})


def api_produk(request):
    """JsonResponse: balas JSON, dasar API (DRF di pelajaran 9)."""
    return JsonResponse({'produk': PRODUK})`,
      'katalog/urls.py': `from django.urls import path

from . import views

urlpatterns = [
    # <int:produk_id> = path converter: hanya angka yang cocok
    path('produk/<int:produk_id>/', views.detail, name='detail-produk'),
    path('cari/', views.cari, name='cari'),
    path('api/produk/', views.api_produk, name='api-produk'),
    path('', views.daftar, name='daftar'),
]`,
      'katalog/templates/katalog/base.html': `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>{% block title %}Katalog{% endblock %}</title>
  <style>
    body { font-family: system-ui; max-width: 640px; margin: 2rem auto; padding: 0 1rem; }
    .kartu { border: 1px solid #ddd; border-radius: 8px; padding: 1rem; margin-bottom: .75rem; }
    a { color: #2E5B44; }
  </style>
</head>
<body>
  <header><a href="{% url 'daftar' %}">Katalog</a></header>
  <main>
    {% block konten %}{% endblock %}
  </main>
</body>
</html>`,
      'katalog/templates/katalog/daftar.html': `{% extends 'katalog/base.html' %}
{% block konten %}
  <h1>Daftar Produk</h1>
  {% for p in produk %}
    <div class="kartu">
      <a href="{% url 'detail-produk' p.id %}">{{ p.nama }}</a>
      <p>Rp {{ p.harga }}</p>
    </div>
  {% empty %}
    <p>Belum ada produk.</p>
  {% endfor %}
{% endblock %}`,
      'katalog/templates/katalog/detail.html': `{% extends 'katalog/base.html' %}
{% block konten %}
  <h1>{{ item.nama }}</h1>
  <p>Harga: Rp {{ item.harga }}</p>
  <p>ID: {{ item.id }}</p>
{% endblock %}`,
      'katalog/templates/katalog/cari.html': `{% extends 'katalog/base.html' %}
{% block konten %}
  <h1>Hasil pencarian: "{{ kata }}"</h1>
  {% for p in hasil %}
    <div class="kartu">{{ p.nama }} - Rp {{ p.harga }}</div>
  {% empty %}
    <p>Tidak ditemukan.</p>
  {% endfor %}
{% endblock %}`,
      'package.json': PKG_NODE,
      'requirements.txt': 'Django>=5.2,<6.1\n',
      'README.md': `# Django Lesson 2 - URLs & Views

Jalankan: pip install -r requirements.txt && python3 manage.py runserver
Coba: /, /produk/1/, /cari/?q=teh, /api/produk/`,
    },
    objId: [
      'Menulis URL patterns dengan path() dan include()',
      'Memakai path converters: int, str, slug, uuid',
      'Menulis function-based views (FBV)',
      'Membaca query params dan mengembalikan JSON',
    ],
    objEn: [
      'Write URL patterns with path() and include()',
      'Use path converters: int, str, slug, uuid',
      'Write function-based views (FBVs)',
      'Read query params and return JSON',
    ],
    expId: `## URLconf: Peta Route yang Jelas
urlpatterns adalah daftar pattern: path('produk/<int:produk_id>/', views.detail) mencocokkan URL dan MENGIRIM produk_id sebagai parameter view. Order penting: Django mencoba dari atas ke bawah, pattern pertama yang cocok menang. Konvensi nama (name='daftar') membuat template bisa merujuk dengan {% url 'daftar' %} - ganti URL tanpa menyentuh template.
## Path Converters: Tipe di URL
<int:...> hanya menerima angka (kirim 'abc' = 404), <str:...> teks, <slug:...> untuk slug (huruf-angka-tanda-sambung), <uuid:...>. Converter = validasi + konversi tipe dalam satu syntax. Aturan: URL yang ketat mencegah bug - 'produk/<int:id>' tidak akan pernah menerima sampah.
## FBV: Fungsi Biasa, Kekuatan Penuh
View = fungsi dengan request sebagai argumen, mengembalikan HttpResponse (render, JsonResponse, redirect). render(request, template, context) menggabungkan template + data. Http404 melempar respons 404 yang benar. FBV sederhana dan eksplisit - mulai dari sini sebelum melompat ke class-based views (pelajaran 8).
## Query Params & JSON
?q=teh dibaca via request.GET.get('q', '') - default saat tidak ada. JsonResponse({'produk': [...]}) mengembalikan JSON untuk frontend/mobile - inilah dasar API yang nanti diformalisasi dengan Django REST Framework (pelajaran 9).`,
    expEn: `## The URLconf: A Clear Route Map
urlpatterns is a list of patterns: path('produk/<int:produk_id>/', views.detail) matches a URL and PASSES produk_id to the view. Order matters: Django tries top-down, the first matching pattern wins. The naming convention (name='daftar') lets templates reference routes with {% url 'daftar' %} - change the URL without touching templates.
## Path Converters: Types in the URL
<int:...> accepts only digits (sending 'abc' = 404), <str:...> text, <slug:...> slugs (letters-digits-hyphens), <uuid:...>. A converter is validation + type conversion in one syntax. Rule: strict URLs prevent bugs - 'produk/<int:id>' will never receive junk.
## FBVs: Plain Functions, Full Power
A view is a function with request as an argument, returning an HttpResponse (render, JsonResponse, redirect). render(request, template, context) merges the template + data. Http404 throws a proper 404 response. FBVs are simple and explicit - start here before jumping to class-based views (lesson 8).
## Query Params & JSON
?q=teh is read via request.GET.get('q', '') - a default when absent. JsonResponse({'produk': [...]}) returns JSON for frontends/mobile - this is the seed of the APIs later formalized with the Django REST Framework (lesson 9).`,
    chId: 'Perluas katalog: (1) tambah route /produk/baru/ yang menerima POST sederhana dan menambah item ke PRODUK (ingat: ini akan hilang saat server restart - kenapa?), (2) tambah <slug:nama> converter di route detail lain, (3) buat route /statistik/ yang mengembalikan JsonResponse dengan jumlah produk dan total harga, (4) refactor PRODUK menjadi daftar dict dengan field tambahan stok.',
    chEn: 'Extend the catalog: (1) add a /produk/baru/ route accepting a simple POST and appending to PRODUK (note: it disappears on server restart - why?), (2) add a <slug:nama> converter to another detail route, (3) create a /statistik/ route returning a JsonResponse with the product count and total price, (4) refactor PRODUK into a dict list with an extra stok field.',
    sumId: 'URLconf = peta route. Path converters = tipe di URL. FBV = fungsi request→response. Query params & JSON. Lanjut: models & migrations.',
    sumEn: 'The URLconf = the route map. Path converters = types in the URL. FBVs = request→response functions. Query params & JSON. Next: models & migrations.',
  },
  {
    phase: 1, num: 3, topicId: 'models-migrations',
    titleId: 'Models & Migrations: Database Tanpa SQL', titleEn: 'Models & Migrations: The Database Without SQL',
    codeFile: 'katalog/models.py',
    files: {
      'manage.py': MANAGE_PY,
      'myproject/__init__.py': '',
      'myproject/settings.py': `INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
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
ALLOWED_HOSTS = []`,
      'myproject/urls.py': `from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('katalog.urls')),
]`,
      'myproject/wsgi.py': `import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
application = get_wsgi_application()`,
      'katalog/__init__.py': '',
      'katalog/apps.py': `from django.apps import AppConfig


class KatalogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'katalog'`,
      'katalog/models.py': `from django.db import models


class Kategori(models.Model):
    """Satu model = satu tabel database."""
    nama = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ['nama']

    def __str__(self):
        return self.nama


class Produk(models.Model):
    nama = models.CharField(max_length=200)
    harga = models.DecimalField(max_digits=10, decimal_places=2)
    stok = models.PositiveIntegerField(default=0)
    tersedia = models.BooleanField(default=True)
    # Relasi: banyak produk -> satu kategori (ForeignKey)
    kategori = models.ForeignKey(Kategori, on_delete=models.CASCADE, related_name='produk')
    dibuat = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-dibuat']

    def __str__(self):
        return self.nama`,
      'katalog/admin.py': `from django.contrib import admin

from .models import Kategori, Produk


# Admin: CRUD otomatis untuk model kita
@admin.register(Produk)
class ProdukAdmin(admin.ModelAdmin):
    list_display = ('nama', 'harga', 'stok', 'tersedia', 'kategori')
    list_filter = ('tersedia', 'kategori')
    search_fields = ('nama',)


admin.site.register(Kategori)`,
      'katalog/views.py': `from django.shortcuts import get_object_or_404, render

from .models import Kategori, Produk


def daftar(request, kategori_id=None):
    # ORM: query Python, bukan SQL mentah
    produk = Produk.objects.all()
    if kategori_id is not None:
        produk = produk.filter(kategori_id=kategori_id)
    return render(request, 'katalog/daftar.html', {
        'produk': produk,
        'kategori': Kategori.objects.all(),
    })


def detail(request, produk_id):
    # get_object_or_404: ambil atau lempar 404
    item = get_object_or_404(Produk, id=produk_id)
    return render(request, 'katalog/detail.html', {'item': item})`,
      'katalog/urls.py': `from django.urls import path

from . import views

urlpatterns = [
    path('produk/<int:produk_id>/', views.detail, name='detail-produk'),
    path('kategori/<int:kategori_id>/', views.daftar, name='kategori'),
    path('', views.daftar, name='daftar'),
]`,
      'katalog/templates/katalog/base.html': `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>{% block title %}Katalog{% endblock %}</title>
  <style>
    body { font-family: system-ui; max-width: 640px; margin: 2rem auto; padding: 0 1rem; }
    .kartu { border: 1px solid #ddd; border-radius: 8px; padding: 1rem; margin-bottom: .75rem; }
    a { color: #2E5B44; }
  </style>
</head>
<body>
  <main>{% block konten %}{% endblock %}</main>
</body>
</html>`,
      'katalog/templates/katalog/daftar.html': `{% extends 'katalog/base.html' %}
{% block konten %}
  <h1>Produk</h1>
  <nav>
    {% for k in kategori %}
      <a href="{% url 'kategori' k.id %}">{{ k.nama }}</a>
    {% endfor %}
  </nav>
  {% for p in produk %}
    <div class="kartu">
      <a href="{% url 'detail-produk' p.id %}">{{ p.nama }}</a>
      <p>Rp {{ p.harga }} - stok {{ p.stok }}</p>
    </div>
  {% empty %}
    <p>Belum ada produk.</p>
  {% endfor %}
{% endblock %}`,
      'katalog/templates/katalog/detail.html': `{% extends 'katalog/base.html' %}
{% block konten %}
  <h1>{{ item.nama }}</h1>
  <p>Kategori: {{ item.kategori }}</p>
  <p>Harga: Rp {{ item.harga }}</p>
  <p>Stok: {{ item.stok }}</p>
  <p>Ditambahkan: {{ item.dibuat|date:'d M Y' }}</p>
{% endblock %}`,
      'package.json': PKG_NODE,
      'requirements.txt': 'Django>=5.2,<6.1\n',
      'README.md': `# Django Lesson 3 - Models & Migrations

Jalankan:
  pip install -r requirements.txt
  python3 manage.py makemigrations
  python3 manage.py migrate
  python3 manage.py createsuperuser
  python3 manage.py runserver
Buka /admin untuk CRUD otomatis.`,
    },
    objId: [
      'Menulis model: field types, choices, relasi',
      'Menjalankan makemigrations & migrate',
      'Menggunakan Django admin untuk CRUD otomatis',
      'Memakai get_object_or_404 dan QuerySet dasar',
    ],
    objEn: [
      'Write models: field types, choices, relations',
      'Run makemigrations & migrate',
      'Use the Django admin for automatic CRUD',
      'Use get_object_or_404 and basic QuerySets',
    ],
    expId: `## Model = Tabel, Class = Skema
Satu class = satu tabel; satu atribut = satu kolom. CharField → VARCHAR, DecimalField → DECIMAL, ForeignKey → kolom id + constraint. Django menerjemahkan class ke SQL; Anda tidak menulis CREATE TABLE. Model juga pusat validasi: tipe field menentukan apa yang boleh masuk ke database.
## Migrations: Versioned Schema
makemigrations membandingkan models.py dengan database, membuat file migration (riwayat perubahan skema). migrate menerapkannya. Keajaiban: skema di-version di git, bisa rollback, dan TIM mengubah skema bersama tanpa konflik. Aturan: ubah model → makemigrations → migrate. Jangan pernah ubah tabel manual di SQLite - biarkan Django yang pegang.
## Admin: CRUD Gratis
Daftarkan model di admin.py → panel /admin langsung punya create/read/update/delete + pencarian + filter (list_display, list_filter, search_fields). Admin = "internal tool" yang lahir otomatis dari model. Untuk proyek internal, admin saja sering cukup - tidak perlu membangun UI CRUD dari nol.
## Relasi: FK, One-to-Many
ForeignKey(Kategori) = banyak produk ke satu kategori; related_name='produk' membuat kategori.produk.all() tersedia (reverse). get_object_or_404(Produk, id=...) = ORM + 404 dalam satu baris. Produk.objects.filter(...) mengembalikan QuerySet - dipelajari dalam di pelajaran 5.`,
    expEn: `## Model = Table, Class = Schema
One class = one table; one attribute = one column. CharField → VARCHAR, DecimalField → DECIMAL, ForeignKey → an id column + a constraint. Django translates classes to SQL; you never write CREATE TABLE. Models are also the validation center: the field type decides what may enter the database.
## Migrations: Versioned Schema
makemigrations compares models.py with the database and creates a migration file (the schema change history). migrate applies it. The magic: the schema is versioned in git, rollbackable, and TEAMS evolve the schema together without conflicts. Rule: change the model → makemigrations → migrate. Never alter tables manually - let Django own the schema.
## Admin: Free CRUD
Register a model in admin.py → the /admin panel instantly has create/read/update/delete + search + filters (list_display, list_filter, search_fields). The admin is an "internal tool" born automatically from models. For internal projects, the admin is often enough - no need to build CRUD UIs from scratch.
## Relations: FK, One-to-Many
ForeignKey(Kategori) = many products to one category; related_name='produk' makes kategori.produk.all() available (reverse). get_object_or_404(Produk, id=...) = ORM + 404 in one line. Produk.objects.filter(...) returns a QuerySet - studied in depth in lesson 5.`,
    chId: 'Perluas model: (1) tambah model Ulasan (produk FK, penulis CharField, isi TextField, bintang PositiveSmallIntegerField dengan choices 1-5), (2) tambah field diskon_persen di Produk (DecimalField nullable), (3) buat migration dan terapkan, (4) tampilkan rata-rata bintang di halaman detail produk (aggregate Avg - dipelajari pelajaran 5).',
    chEn: 'Extend the models: (1) add a Ulasan model (produk FK, penulis CharField, isi TextField, bintang PositiveSmallIntegerField with 1-5 choices), (2) add a diskon_persen field to Produk (nullable DecimalField), (3) create and apply the migration, (4) show the average rating on the product detail page (an Avg aggregate - studied in lesson 5).',
    sumId: 'Model = skema. Migrations = versioned schema. Admin = CRUD otomatis. FK = relasi. Jangan sentuh tabel manual. Lanjut: templates.',
    sumEn: 'Models = the schema. Migrations = versioned schema. Admin = automatic CRUD. FK = relations. Never touch tables manually. Next: templates.',
  },
  {
    phase: 1, num: 4, topicId: 'templates',
    titleId: 'Templates: DTL, Inheritance & Static Files', titleEn: 'Templates: DTL, Inheritance & Static Files',
    codeFile: 'katalog/templates/katalog/daftar.html',
    files: {
      'manage.py': MANAGE_PY,
      'myproject/__init__.py': '',
      'myproject/settings.py': `INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
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
STATICFILES_DIRS = ['static']
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
SECRET_KEY = 'kunci-rahasia-dev'
DEBUG = True
ALLOWED_HOSTS = []`,
      'myproject/urls.py': `from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('katalog.urls')),
]`,
      'myproject/wsgi.py': `import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
application = get_wsgi_application()`,
      'katalog/__init__.py': '',
      'katalog/apps.py': `from django.apps import AppConfig


class KatalogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'katalog'`,
      'katalog/models.py': `from django.db import models


class Produk(models.Model):
    nama = models.CharField(max_length=200)
    harga = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.nama`,
      'katalog/views.py': `from django.shortcuts import render

from .models import Produk


def daftar(request):
    produk = Produk.objects.all()
    # context: data yang bisa dipakai template
    return render(request, 'katalog/daftar.html', {
        'produk': produk,
        'judul': 'Katalog Produk',
    })`,
      'katalog/urls.py': `from django.urls import path

from . import views

urlpatterns = [
    path('', views.daftar, name='daftar'),
]`,
      'katalog/templates/katalog/base.html': `{% load static %}
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>{% block title %}Tryngo{% endblock %}</title>
  <link rel="stylesheet" href="{% static 'css/style.css' %}" />
</head>
<body>
  <header class="navbar">
    <span class="brand">Tryngo Katalog</span>
    <nav>
      <a href="{% url 'daftar' %}">Daftar</a>
    </nav>
  </header>
  <main class="kontainer">
    {% block konten %}{% endblock %}
  </main>
  <footer>© 2026 Tryngo</footer>
</body>
</html>`,
      'katalog/templates/katalog/daftar.html': `{% extends 'katalog/base.html' %}

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
{% endblock %}`,
      'static/css/style.css': `body {
  font-family: system-ui, sans-serif;
  margin: 0;
  background: #EFECE6;
  color: #121417;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2E5B44;
  color: #fff;
  padding: 1rem 2rem;
}
.brand { font-weight: 700; }
.navbar a { color: #fff; margin-left: 1rem; }
.kontainer { max-width: 640px; margin: 2rem auto; padding: 0 1rem; }
table { width: 100%; border-collapse: collapse; }
th, td { border: 1px solid #ccc; padding: .5rem; text-align: left; }
footer { text-align: center; padding: 2rem; color: #777; }`,
      'package.json': PKG_NODE,
      'requirements.txt': 'Django>=5.2,<6.1\n',
      'README.md': `# Django Lesson 4 - Templates

Jalankan: pip install -r requirements.txt && python3 manage.py runserver
Template + inheritance + static files.`,
    },
    objId: [
      'Menulis sintaks DTL: variable, tag, filter',
      'Memakai template inheritance (extends/block)',
      'Menghubungkan static files (css/js)',
      'Menghindari logika berat di template',
    ],
    objEn: [
      'Write DTL syntax: variables, tags, filters',
      'Use template inheritance (extends/block)',
      'Wire static files (css/js)',
      'Avoid heavy logic in templates',
    ],
    expId: `## DTL: Variabel, Tag, Filter
{{ produk|length }} = variabel + filter. {% for %}, {% if %}, {% empty %}, {% block %}, {% extends %}, {% load static %} = tag (dengan kurung kurawal + %). Filter: |length, |upper, |date, |floatformat, |default. DTL sengaja DIBATASI: tidak ada pemanggilan fungsi arbitrary - mencegah logika bisnis di tampilan. Jika butuh perhitungan, lakukan di view.
## Inheritance: Satu Kerangka, Banyak Halaman
base.html = kerangka (header, footer, css). Halaman lain {% extends 'katalog/base.html' %} dan mengisi {% block konten %}. Ubah navbar SEKALI di base → semua halaman ikut. Ini pola paling penting DTL: tanpa inheritance, setiap halaman mengulang boilerplate dan perbaikan navbar jadi pekerjaan 20 file.
## Static Files: CSS, JS, Gambar
Folder static/ (per app atau global via STATICFILES_DIRS) + {% load static %} + {% static 'css/style.css' %} → di development Django melayani langsung; di produksi collectstatic mengumpulkannya untuk Nginx/CDN (pelajaran 15). Aturan: aset yang TIDAK berubah per-user = static; konten per-data = template.
## Pola View-Template yang Sehat
View menyiapkan SEMUA data (context), template hanya MENAMPILKAN. Tanda template sehat: tidak ada perhitungan, tidak ada query, hanya loop + kondisi + format. Ini sama seperti komponen "presentational" di React/Vue - pisahkan data dan tampilan, dan keduanya mudah di-test dan diubah.`,
    expEn: `## DTL: Variables, Tags, Filters
{{ produk|length }} = a variable + a filter. {% for %}, {% if %}, {% empty %}, {% block %}, {% extends %}, {% load static %} = tags (curly braces + %). Filters: |length, |upper, |date, |floatformat, |default. DTL is DELIBERATELY limited: no arbitrary function calls - keeping business logic out of presentation. If you need computation, do it in the view.
## Inheritance: One Skeleton, Many Pages
base.html = the skeleton (header, footer, css). Other pages {% extends 'katalog/base.html' %} and fill {% block konten %}. Change the navbar ONCE in base → every page follows. This is the most important DTL pattern: without inheritance every page repeats boilerplate and fixing the navbar becomes a 20-file job.
## Static Files: CSS, JS, Images
A static/ folder (per app or global via STATICFILES_DIRS) + {% load static %} + {% static 'css/style.css' %} → Django serves it in development; in production collectstatic gathers it for Nginx/CDN (lesson 15). Rule: assets that do not change per user = static; per-data content = templates.
## The Healthy View-Template Pattern
The view prepares ALL data (the context); the template only PRESENTS it. Signs of a healthy template: no computation, no queries, only loops + conditions + formatting. The same as "presentational" components in React/Vue - separate data and display, and both become easy to test and change.`,
    chId: 'Poles tampilan: (1) buat halaman kedua "Tentang" dengan extends base (route + view + template), (2) tambah block tambahan di base (misal {% block skrip %}) dan isi dari halaman daftar dengan JavaScript kecil, (3) tambah gambar statis (assets/logo.png) dan tampilkan di header, (4) buat filter harga dengan format titik ribuan (custom template filter di katalog/templatetags/).',
    chEn: 'Polish the UI: (1) build a second "Tentang" page extending the base (route + view + template), (2) add an extra block in base (e.g. {% block skrip %}) and fill it from the list page with a small JavaScript snippet, (3) add a static image (assets/logo.png) and show it in the header, (4) format prices with thousand separators (a custom template filter in katalog/templatetags/).',
    sumId: 'DTL: {{ var }} + {% tag %} + filter. Inheritance = kerangka sekali. Static = aset. View siapkan data, template tampilkan. Lanjut: querysets.',
    sumEn: 'DTL: {{ var }} + {% tag %} + filters. Inheritance = skeleton once. Static = assets. Views prepare data, templates present it. Next: querysets.',
  },
];

// ===== PHASE 2: DATA & FEATURES (lessons 5-8) =====
const LESSONS_P2 = [
  {
    phase: 2, num: 5, topicId: 'querysets',
    titleId: 'QuerySets: Filter, Agregasi & N+1', titleEn: 'QuerySets: Filtering, Aggregation & N+1',
    codeFile: 'katalog/views.py',
    files: {
      'manage.py': MANAGE_PY,
      'myproject/__init__.py': '',
      'myproject/settings.py': `INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
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
ALLOWED_HOSTS = []`,
      'myproject/urls.py': `from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('katalog.urls')),
]`,
      'myproject/wsgi.py': `import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
application = get_wsgi_application()`,
      'katalog/__init__.py': '',
      'katalog/apps.py': `from django.apps import AppConfig


class KatalogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'katalog'`,
      'katalog/models.py': `from django.db import models


class Kategori(models.Model):
    nama = models.CharField(max_length=100)

    def __str__(self):
        return self.nama


class Produk(models.Model):
    nama = models.CharField(max_length=200)
    harga = models.DecimalField(max_digits=10, decimal_places=2)
    stok = models.PositiveIntegerField(default=0)
    kategori = models.ForeignKey(Kategori, on_delete=models.CASCADE, related_name='produk')
    dibuat = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nama`,
      'katalog/views.py': `from django.db.models import Avg, Count, Max, Min, Q
from django.shortcuts import render

from .models import Kategori, Produk


def daftar(request):
    # QuerySet LAZY: SQL dijalankan saat data benar-benar dibutuhkan
    produk = Produk.objects.all()

    # Filter dinamis dari query params
    kata = request.GET.get('q', '')
    if kata:
        produk = produk.filter(nama__icontains=kata)  # LIKE %kata%
    kategori_id = request.GET.get('kategori')
    if kategori_id:
        produk = produk.filter(kategori_id=kategori_id)

    # Q object: kombinasi kondisi (OR)
    produk = produk.filter(Q(stok__gt=0) | Q(tersedia=True))

    # select_related: JOIN kategori SEKALIGUS (hindari N+1)
    produk = produk.select_related('kategori')

    # Agregasi: hitung di DATABASE, bukan di Python
    statistik = Produk.objects.aggregate(
        rata_rata=Avg('harga'),
        termurah=Min('harga'),
        termahal=Max('harga'),
        total=Count('id'),
    )

    return render(request, 'katalog/daftar.html', {
        'produk': produk,
        'kategori': Kategori.objects.all(),
        'statistik': statistik,
    })


def kategori_rekap(request):
    # annotate: kolom baru per grup (COUNT per kategori)
    rekap = Kategori.objects.annotate(jumlah=Count('produk'))
    return render(request, 'katalog/rekap.html', {'rekap': rekap})`,
      'katalog/urls.py': `from django.urls import path

from . import views

urlpatterns = [
    path('rekap/', views.kategori_rekap, name='rekap'),
    path('', views.daftar, name='daftar'),
]`,
      'katalog/templates/katalog/base.html': `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>{% block title %}Katalog{% endblock %}</title>
  <style>
    body { font-family: system-ui; max-width: 640px; margin: 2rem auto; padding: 0 1rem; }
    table { width: 100%; border-collapse: collapse; }
    th, td { border: 1px solid #ccc; padding: .5rem; text-align: left; }
  </style>
</head>
<body>
  <main>{% block konten %}{% endblock %}</main>
</body>
</html>`,
      'katalog/templates/katalog/daftar.html': `{% extends 'katalog/base.html' %}
{% block konten %}
  <h1>Produk</h1>
  <form method="get">
    <input name="q" placeholder="Cari nama..." value="{{ request.GET.q }}" />
    <button>Cari</button>
  </form>
  <p>
    Rata-rata: Rp {{ statistik.rata_rata|floatformat:0 }} |
    Termurah: Rp {{ statistik.termurah }} |
    Total: {{ statistik.total }} produk
  </p>
  <table>
    <thead><tr><th>Nama</th><th>Kategori</th><th>Harga</th><th>Stok</th></tr></thead>
    <tbody>
      {% for p in produk %}
        <tr>
          <td>{{ p.nama }}</td>
          <td>{{ p.kategori.nama }}</td>
          <td>Rp {{ p.harga|floatformat:0 }}</td>
          <td>{{ p.stok }}</td>
        </tr>
      {% empty %}
        <tr><td colspan="4">Tidak ada produk.</td></tr>
      {% endfor %}
    </tbody>
  </table>
{% endblock %}`,
      'katalog/templates/katalog/rekap.html': `{% extends 'katalog/base.html' %}
{% block konten %}
  <h1>Rekap per Kategori</h1>
  <table>
    <thead><tr><th>Kategori</th><th>Jumlah Produk</th></tr></thead>
    <tbody>
      {% for k in rekap %}
        <tr><td>{{ k.nama }}</td><td>{{ k.jumlah }}</td></tr>
      {% endfor %}
    </tbody>
  </table>
{% endblock %}`,
      'package.json': PKG_NODE,
      'requirements.txt': 'Django>=5.2,<6.1\n',
      'README.md': `# Django Lesson 5 - QuerySets

Jalankan: pip install -r requirements.txt && python3 manage.py migrate && python3 manage.py runserver
Coba: /?q=teh, /rekap/`,
    },
    objId: [
      'Menulis QuerySet: filter, exclude, order_by',
      'Menggunakan Q objects untuk OR/AND kompleks',
      'Menghitung agregasi di database (aggregate/annotate)',
      'Menghindari N+1 dengan select_related & prefetch_related',
    ],
    objEn: [
      'Write QuerySets: filter, exclude, order_by',
      'Use Q objects for complex OR/AND',
      'Compute aggregations in the database (aggregate/annotate)',
      'Avoid N+1 with select_related & prefetch_related',
    ],
    expId: `## QuerySet: Lazy & Chaining
Produk.objects.filter(...) TIDAK menjalankan SQL - QuerySet itu lazy: SQL dieksekusi saat dievaluasi (iterasi, list(), len()). Karena lazy, Anda bisa merangkai filter tanpa biaya: .filter(a).filter(b).order_by('-harga') dibangun bertahap. .filter(nama__icontains=kata) = LIKE %kata% (case-insensitive). Field lookups: __icontains, __gt, __lt, __in, __startswith, __date - bahasa query yang ekspresif.
## Q Objects: OR dalam Satu Query
filter(Q(stok__gt=0) | Q(tersedia=True)) menggabungkan kondisi dengan | (OR) dan & (AND). Tanpa Q, OR harus dipecah menjadi dua query. Q juga bisa dikombinasikan dengan filter biasa: filter(Q(...), nama__icontains='teh').
## Agregasi di Database, Bukan Python
aggregate(Avg('harga'), Min, Max, Count) menghitung di DATABASE - sekali per query, tidak menaruh 10.000 baris ke memori. annotate(Count('produk')) menambah kolom hasil per baris (per kategori). Aturan performa: hitung di SQL, bukan di Python - database dioptimalkan untuk ini.
## N+1: Pembunuh Performa #1
Loop 100 produk → 1 query produk + 100 query kategori = 101 query (N+1). select_related('kategori') mengubahnya jadi SATU query dengan JOIN (untuk FK/one-to-one). prefetch_related untuk many-to-many (dua query). Debug: Django Debug Toolbar menampilkan jumlah query per halaman - pakai itu sebagai kompas.`,
    expEn: `## QuerySets: Lazy & Chainable
Produk.objects.filter(...) does NOT run SQL - a QuerySet is lazy: SQL executes when evaluated (iteration, list(), len()). Because of laziness you chain filters for free: .filter(a).filter(b).order_by('-harga') builds step by step. .filter(nama__icontains=kata) = LIKE %kata% (case-insensitive). Field lookups: __icontains, __gt, __lt, __in, __startswith, __date - an expressive query language.
## Q Objects: OR in a Single Query
filter(Q(stok__gt=0) | Q(tersedia=True)) combines conditions with | (OR) and & (AND). Without Q, an OR must be split into two queries. Q also combines with plain filters: filter(Q(...), nama__icontains='teh').
## Aggregation in the Database, Not Python
aggregate(Avg('harga'), Min, Max, Count) computes in the DATABASE - once per query, without pulling 10,000 rows into memory. annotate(Count('produk')) adds a per-row result column (per category). Performance rule: compute in SQL, not Python - the database is optimized for this.
## N+1: Performance Killer #1
Looping 100 products → 1 product query + 100 category queries = 101 queries (N+1). select_related('kategori') turns this into ONE query with a JOIN (for FK/one-to-one). prefetch_related for many-to-many (two queries). Debug: the Django Debug Toolbar shows the query count per page - use it as your compass.`,
    chId: "Tantangan analitik: (1) buat halaman /produk/terlaris/ menampilkan 10 produk dengan stok terbanyak (order_by('-stok')[:10]), (2) tambah filter harga ?min=...&max=... (__gte/__lte), (3) tampilkan produk tanpa kategori (kategori__isnull=True), (4) buat halaman rekap per kategori dengan SUM stok dan rata-rata harga (annotate + Sum/Avg).",
    chEn: "Analytics challenge: (1) build a /produk/terlaris/ page showing the 10 best-stocked products (order_by('-stok')[:10]), (2) add price filters ?min=...&max=... (__gte/__lte), (3) show products without a category (kategori__isnull=True), (4) build a per-category recap page with SUM stock and average price (annotate + Sum/Avg).",
    sumId: 'QuerySet lazy & chainable. Q = OR. Agregasi di DB. select_related lawan N+1. Lanjut: forms & validasi.',
    sumEn: 'QuerySets lazy & chainable. Q = OR. Aggregation in the DB. select_related vs N+1. Next: forms & validation.',
  },
  {
    phase: 2, num: 6, topicId: 'forms',
    titleId: 'Forms: ModelForm, Validasi & CSRF', titleEn: 'Forms: ModelForms, Validation & CSRF',
    codeFile: 'katalog/forms.py',
    files: {
      'manage.py': MANAGE_PY,
      'myproject/__init__.py': '',
      'myproject/settings.py': `INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
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
ALLOWED_HOSTS = []`,
      'myproject/urls.py': `from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('katalog.urls')),
]`,
      'myproject/wsgi.py': `import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
application = get_wsgi_application()`,
      'katalog/__init__.py': '',
      'katalog/apps.py': `from django.apps import AppConfig


class KatalogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'katalog'`,
      'katalog/models.py': `from django.db import models


class Kategori(models.Model):
    nama = models.CharField(max_length=100)

    def __str__(self):
        return self.nama


class Produk(models.Model):
    nama = models.CharField(max_length=200)
    harga = models.DecimalField(max_digits=10, decimal_places=2)
    stok = models.PositiveIntegerField(default=0)
    kategori = models.ForeignKey(Kategori, on_delete=models.CASCADE, related_name='produk')

    def __str__(self):
        return self.nama`,
      'katalog/forms.py': `from django import forms

from .models import Produk


class ProdukForm(forms.ModelForm):
    """ModelForm: form lahir dari model - validasi & field otomatis."""

    class Meta:
        model = Produk
        fields = ['nama', 'harga', 'stok', 'kategori']
        widgets = {
            'nama': forms.TextInput(attrs={'placeholder': 'Nama produk'}),
        }

    # Validasi custom: dipanggil setelah validasi bawaan
    def clean_harga(self):
        harga = self.cleaned_data['harga']
        if harga <= 0:
            raise forms.ValidationError('Harga harus lebih dari 0.')
        if harga > 100_000_000:
            raise forms.ValidationError('Harga terlalu besar.')
        return harga

    def clean(self):
        # clean(): validasi antar-field
        cleaned = super().clean()
        nama = cleaned.get('nama', '')
        stok = cleaned.get('stok', 0)
        if 'Gratis' in nama and stok > 0:
            raise forms.ValidationError('Produk gratis tidak boleh punya stok.')
        return cleaned`,
      'katalog/views.py': `from django.contrib import messages
from django.shortcuts import redirect, render

from .forms import ProdukForm
from .models import Kategori, Produk


def daftar(request):
    return render(request, 'katalog/daftar.html', {'produk': Produk.objects.all()})


def tambah(request):
    if request.method == 'POST':
        # POST: validasi + simpan. Data DIBERSIHKAN Django.
        form = ProdukForm(request.POST)
        if form.is_valid():
            form.save()  # form.cleaned_data -> model -> database
            messages.success(request, 'Produk berhasil ditambahkan.')
            return redirect('daftar')
    else:
        form = ProdukForm()  # GET: form kosong
    return render(request, 'katalog/tambah.html', {'form': form})


def ubah(request, produk_id):
    produk = Produk.objects.get(id=produk_id)
    if request.method == 'POST':
        form = ProdukForm(request.POST, instance=produk)  # update, bukan create
        if form.is_valid():
            form.save()
            messages.success(request, 'Perubahan disimpan.')
            return redirect('daftar')
    else:
        form = ProdukForm(instance=produk)  # pre-filled
    return render(request, 'katalog/tambah.html', {'form': form, 'produk': produk})`,
      'katalog/urls.py': `from django.urls import path

from . import views

urlpatterns = [
    path('tambah/', views.tambah, name='tambah'),
    path('produk/<int:produk_id>/ubah/', views.ubah, name='ubah'),
    path('', views.daftar, name='daftar'),
]`,
      'katalog/templates/katalog/base.html': `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>{% block title %}Katalog{% endblock %}</title>
  <style>
    body { font-family: system-ui; max-width: 640px; margin: 2rem auto; padding: 0 1rem; }
    .kartu { border: 1px solid #ddd; border-radius: 8px; padding: 1rem; margin-bottom: .75rem; }
    .error { color: #b91c1c; font-size: .9rem; }
    label { display: block; margin-top: 1rem; font-weight: 600; }
    input, select { width: 100%; padding: .5rem; box-sizing: border-box; }
    button { margin-top: 1rem; padding: .5rem 1.5rem; background: #2E5B44; color: #fff; border: 0; border-radius: 6px; }
  </style>
</head>
<body>
  <main>
    {% if messages %}
      {% for m in messages %}<p class="pesan">{{ m }}</p>{% endfor %}
    {% endif %}
    {% block konten %}{% endblock %}
  </main>
</body>
</html>`,
      'katalog/templates/katalog/daftar.html': `{% extends 'katalog/base.html' %}
{% block konten %}
  <h1>Produk</h1>
  <p><a href="{% url 'tambah' %}">+ Tambah produk</a></p>
  {% for p in produk %}
    <div class="kartu">
      <strong>{{ p.nama }}</strong> - Rp {{ p.harga|floatformat:0 }}
      <a href="{% url 'ubah' p.id %}">(ubah)</a>
    </div>
  {% empty %}
    <p>Belum ada produk.</p>
  {% endfor %}
{% endblock %}`,
      'katalog/templates/katalog/tambah.html': `{% extends 'katalog/base.html' %}
{% block konten %}
  <h1>{{ produk|default:'Tambah' }} Produk</h1>
  <form method="post">
    {% csrf_token %} {# WAJIB: melindungi dari serangan CSRF #}
    {{ form.as_p }}
    {% if form.non_field_errors %}
      <ul class="error">
        {% for e in form.non_field_errors %}<li>{{ e }}</li>{% endfor %}
      </ul>
    {% endif %}
    <button type="submit">Simpan</button>
  </form>
{% endblock %}`,
      'package.json': PKG_NODE,
      'requirements.txt': 'Django>=5.2,<6.1\n',
      'README.md': `# Django Lesson 6 - Forms

Jalankan: pip install -r requirements.txt && python3 manage.py migrate && python3 manage.py runserver
Coba: /tambah/ - kirim harga 0 atau -5 untuk lihat validasi.`,
    },
    objId: [
      'Menulis ModelForm dan mengatur widget',
      'Memahami validasi: is_valid, cleaned_data, error',
      'Menulis clean_<field> dan clean untuk validasi custom',
      'Menggunakan {% csrf_token %} dan pola POST-redirect-GET',
    ],
    objEn: [
      'Write ModelForms and configure widgets',
      'Understand validation: is_valid, cleaned_data, errors',
      'Write clean_<field> and clean for custom validation',
      'Use {% csrf_token %} and the POST-redirect-GET pattern',
    ],
    expId: `## ModelForm: Form Lahir dari Model
class ProdukForm(forms.ModelForm) dengan Meta.model + fields: field form dibuat dari tipe model (CharField → input text, DecimalField → number, FK → select). form.save() menyimpan instance baru ATAU update (instance=produk). Keuntungan: validasi tipe konsisten dengan database - tidak ada dua aturan yang bisa bertabrakan.
## Alur Validasi
POST masuk → Django membangun form dari request.POST → is_valid() menjalankan validasi berlapis (tipe field → clean_<field> → clean → model constraints) → form.cleaned_data berisi data BERSIH (tipe sudah benar, misal Decimal) atau form.errors. Aturan: jangan pernah membaca request.POST langsung untuk logika - selalu lewat cleaned_data.
## Validasi Custom: clean_<field> vs clean
clean_harga() memvalidasi SATU field (error menempel di field itu). clean() memvalidasi antar-field (non_field_errors). Keduanya mengembalikan cleaned_data - modifikasi di sini = data yang tersimpan. Ini gerbang validasi fail-fast yang sama seperti DTO di NestJS: input kotor tidak pernah mencapai logika bisnis.
## CSRF & POST-Redirect-GET
{% csrf_token %} menyisipkan token acak yang diverifikasi middleware: form dari situs LAIN gagal (proteksi CSRF). Pola POST-redirect-GET: setelah simpan, redirect (bukan render) agar refresh browser tidak mengirim ulang POST. Pesan sukses lewat messages framework.`,
    expEn: `## ModelForms: Forms Born from Models
class ProdukForm(forms.ModelForm) with Meta.model + fields: form fields are built from the model types (CharField → text input, DecimalField → number, FK → select). form.save() stores a new instance OR updates one (instance=produk). Benefit: type validation stays consistent with the database - two rules can never clash.
## The Validation Flow
A POST arrives → Django builds the form from request.POST → is_valid() runs layered validation (field types → clean_<field> → clean → model constraints) → form.cleaned_data holds CLEAN data (types fixed, e.g. Decimal) or form.errors. Rule: never read request.POST directly for logic - always go through cleaned_data.
## Custom Validation: clean_<field> vs clean
clean_harga() validates ONE field (the error attaches to that field). clean() validates across fields (non_field_errors). Both return cleaned_data - modifying here means modifying what gets stored. This is the same fail-fast validation gate as DTOs in NestJS: dirty input never reaches business logic.
## CSRF & POST-Redirect-GET
{% csrf_token %} inserts a random token verified by middleware: forms from OTHER sites fail (CSRF protection). The POST-redirect-GET pattern: after saving, redirect (not render) so a browser refresh never re-sends the POST. Success messages go through the messages framework.`,
    chId: 'Perkuat forms: (1) tambah field ulasan di model Ulasan (produk FK, isi TextField, bintang 1-5) + ModelForm dengan widgets bintang pilihan, (2) validasi custom: bintang harus genap? (kreatif!) atau pastikan ulasan minimal 20 karakter, (3) tambah validasi di clean() yang menolak dua ulasan sama dari produk yang sama, (4) tampilkan daftar ulasan per produk di halaman detail.',
    chEn: 'Strengthen forms: (1) add a Ulasan model (produk FK, isi TextField, 1-5 bintang) + a ModelForm with a star-select widget, (2) custom validation: ratings must be even? (be creative!) or ensure reviews are at least 20 characters, (3) add clean() validation rejecting duplicate reviews for the same product, (4) show per-product reviews on the detail page.',
    sumId: 'ModelForm = validasi otomatis dari model. cleaned_data = satu-satunya sumber data. clean_<field>/clean. CSRF + PRG. Lanjut: authentication.',
    sumEn: 'ModelForms = automatic validation from models. cleaned_data = the only data source. clean_<field>/clean. CSRF + PRG. Next: authentication.',
  },
  {
    phase: 2, num: 7, topicId: 'auth-users',
    titleId: 'Authentication: Login, Signup & Permissions', titleEn: 'Authentication: Login, Signup & Permissions',
    codeFile: 'katalog/views.py',
    files: {
      'manage.py': MANAGE_PY,
      'myproject/__init__.py': '',
      'myproject/settings.py': `INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
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

# Redirect setelah login/logout
LOGIN_URL = 'login'
LOGIN_REDIRECT_URL = 'dashboard'
LOGOUT_REDIRECT_URL = 'login'`,
      'myproject/urls.py': `from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('akun/login/', auth_views.LoginView.as_view(template_name='katalog/login.html'), name='login'),
    path('akun/logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('', include('katalog.urls')),
]`,
      'myproject/wsgi.py': `import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
application = get_wsgi_application()`,
      'katalog/__init__.py': '',
      'katalog/apps.py': `from django.apps import AppConfig


class KatalogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'katalog'`,
      'katalog/models.py': `from django.contrib.auth.models import User
from django.db import models


class Profil(models.Model):
    # Satu user = satu profil (OneToOne)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profil')
    kota = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.user.username`,
      'katalog/forms.py': `from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class DaftarForm(UserCreationForm):
    """Form pendaftaran: username + password (hash otomatis oleh Django)."""

    email = forms.EmailField(required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']`,
      'katalog/views.py': `from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required, permission_required
from django.shortcuts import redirect, render

from .forms import DaftarForm
from .models import Profil


def daftar(request):
    """Signup: buat user + login langsung."""
    if request.method == 'POST':
        form = DaftarForm(request.POST)
        if form.is_valid():
            # create_user: password DI-HASH, bukan plain text
            user = form.save()
            login(request, user)  # sesi dimulai
            messages.success(request, f'Selamat datang, {user.username}!')
            return redirect('dashboard')
    else:
        form = DaftarForm()
    return render(request, 'katalog/daftar.html', {'form': form})


@login_required  # belum login -> dialihkan ke LOGIN_URL
def dashboard(request):
    return render(request, 'katalog/dashboard.html', {
        'user': request.user,
        'is_admin': request.user.is_staff,
    })


@login_required
def kota(request):
    if request.method == 'POST':
        kota_baru = request.POST.get('kota', '')
        # get_or_create: buat profil kalau belum ada
        profil, _ = Profil.objects.get_or_create(user=request.user)
        profil.kota = kota_baru
        profil.save()
        messages.success(request, 'Kota disimpan.')
        return redirect('dashboard')
    return redirect('dashboard')`,
      'katalog/urls.py': `from django.urls import path

from . import views

urlpatterns = [
    path('daftar/', views.daftar, name='daftar-akun'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('kota/', views.kota, name='kota'),
]`,
      'katalog/templates/katalog/login.html': `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>Login</title>
  <style>
    body { font-family: system-ui; max-width: 400px; margin: 4rem auto; padding: 0 1rem; }
    label { display: block; margin-top: 1rem; }
    input { width: 100%; padding: .5rem; box-sizing: border-box; }
    button { margin-top: 1rem; padding: .5rem 1.5rem; background: #2E5B44; color: #fff; border: 0; border-radius: 6px; }
  </style>
</head>
<body>
  <h1>Masuk</h1>
  {% if form.errors %}<p style="color:#b91c1c">Username atau password salah.</p>{% endif %}
  <form method="post">
    {% csrf_token %}
    {{ form.as_p }}
    <button type="submit">Masuk</button>
  </form>
  <p>Belum punya akun? <a href="{% url 'daftar-akun' %}">Daftar</a></p>
</body>
</html>`,
      'katalog/templates/katalog/daftar.html': `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>Daftar</title>
  <style>
    body { font-family: system-ui; max-width: 400px; margin: 4rem auto; padding: 0 1rem; }
    label { display: block; margin-top: 1rem; }
    input { width: 100%; padding: .5rem; box-sizing: border-box; }
    button { margin-top: 1rem; padding: .5rem 1.5rem; background: #2E5B44; color: #fff; border: 0; border-radius: 6px; }
    .errorlist { color: #b91c1c; }
  </style>
</head>
<body>
  <h1>Buat Akun</h1>
  <form method="post">
    {% csrf_token %}
    {{ form.as_p }}
    <button type="submit">Daftar</button>
  </form>
</body>
</html>`,
      'katalog/templates/katalog/dashboard.html': `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>Dashboard</title>
  <style>
    body { font-family: system-ui; max-width: 480px; margin: 4rem auto; padding: 0 1rem; }
    form { margin-top: 1rem; }
    input { padding: .5rem; }
    button { padding: .5rem 1rem; background: #2E5B44; color: #fff; border: 0; border-radius: 6px; }
  </style>
</head>
<body>
  <h1>Dashboard</h1>
  <p>Halo, <strong>{{ user.username }}</strong>
    {% if is_admin %}(admin){% endif %} - <a href="{% url 'logout' %}">Keluar</a></p>
  <form method="post" action="{% url 'kota' %}">
    {% csrf_token %}
    <input name="kota" placeholder="Kota kamu" value="{{ user.profil.kota }}" />
    <button>Simpan</button>
  </form>
</body>
</html>`,
      'package.json': PKG_NODE,
      'requirements.txt': 'Django>=5.2,<6.1\n',
      'README.md': `# Django Lesson 7 - Authentication

Jalankan:
  pip install -r requirements.txt
  python3 manage.py migrate
  python3 manage.py runserver
1. Buka /akun/login/ lalu buat akun lewat /daftar/ (atau createsuperuser)
2. Login lalu lihat /dashboard/`,
    },
    objId: [
      'Menjelaskan auth bawaan Django: User, sesi, password hash',
      'Membuat signup dengan UserCreationForm + login otomatis',
      'Melindungi view dengan @login_required',
      'Mengelola data per-user (OneToOne profil)',
    ],
    objEn: [
      'Explain Django built-in auth: User, sessions, password hashing',
      'Build signup with UserCreationForm + auto login',
      'Protect views with @login_required',
      'Manage per-user data (OneToOne profiles)',
    ],
    expId: `## Auth Bawaan: Jangan Bangun dari Nol
Django mengirim SEMUA yang dibutuhkan auth: model User (username, email, password, permissions), hashing password (PBKDF2/argon2), sesi via cookie, form login/logout/signup, decorators. Yang TIDAK boleh Anda lakukan: menyimpan password plain text atau menulis hashing sendiri. UserCreationForm membuat user dengan password1/password2 (konfirmasi + strength validation).
## Sesi: State untuk "Tanpa State"
HTTP stateless, tapi Django memberi sesi: cookie berisi session id, server menyimpan data sesi. login(request, user) menulis sesi; request.user tersedia di view & template (context processor auth). Logout menghapusnya. Di produksi multi-server, sesi dipindah ke Redis (pelajaran 12) - tapi API-nya sama.
## @login_required: Gerbang View
Decorator memeriksa request.user.is_authenticated; belum login → redirect ke LOGIN_URL (dengan ?next= URL asal). Dekorator lain: @permission_required('katalog.tambah_produk') untuk izin model. Tingkat keamanan: halaman publik vs halaman login-only vs halaman admin - setiap lapisan butuh gerbangnya sendiri.
## Data Per-User
OneToOneField(User, related_name='profil') = satu profil per user; user.profil.kota mengaksesnya (get_or_create saat belum ada). Aturan keamanan yang sama seperti track lain: selalu ambil data MILIK user ini (filter(user=request.user)), jangan menebak dari URL.`,
    expEn: `## Built-in Auth: Do Not Build From Scratch
Django ships EVERYTHING auth needs: the User model (username, email, password, permissions), password hashing (PBKDF2/argon2), cookie sessions, login/logout/signup forms, decorators. What you must NEVER do: store plain-text passwords or write your own hashing. UserCreationForm creates users with password1/password2 (confirmation + strength validation).
## Sessions: State for "Statelessness"
HTTP is stateless, but Django provides sessions: a cookie holds the session id, the server stores session data. login(request, user) writes the session; request.user is available in views & templates (the auth context processor). Logout removes it. In multi-server production, sessions move to Redis (lesson 12) - but the API stays the same.
## @login_required: The View Gate
The decorator checks request.user.is_authenticated; unauthenticated → redirect to LOGIN_URL (with ?next= the original URL). Other decorators: @permission_required('katalog.tambah_produk') for model permissions. Security tiers: public pages vs login-only pages vs admin pages - every layer needs its own gate.
## Per-User Data
OneToOneField(User, related_name='profil') = one profile per user; user.profil.kota accesses it (get_or_create when missing). The same security rule as other tracks: always fetch data OWNED BY this user (filter(user=request.user)), never guess from the URL.`,
    chId: 'Perluas sistem user: (1) tambah @permission_required di view yang hanya boleh diakses staff (buat permission via Meta permissions di model), (2) tambah halaman ganti password (django.contrib.auth.views.PasswordChangeView + template), (3) tampilkan pesan "5 menit terakhir" jika user baru login, (4) buat UserProfilePage yang menampilkan daftar aksi user (buat model Aksi dengan FK user + waktu + deskripsi, catat setiap login via signal).',
    chEn: 'Extend the user system: (1) add @permission_required to a staff-only view (create the permission via Meta permissions on a model), (2) add a password change page (django.contrib.auth.views.PasswordChangeView + template), (3) show a "last 5 minutes" message if the user just logged in, (4) build a user activity page (an Aksi model with FK user + time + description, logging every login via a signal).',
    sumId: 'Auth bawaan: User, hash, sesi. UserCreationForm + login otomatis. @login_required = gerbang. Data per-user via OneToOne. Lanjut: class-based views.',
    sumEn: 'Built-in auth: User, hashing, sessions. UserCreationForm + auto login. @login_required = the gate. Per-user data via OneToOne. Next: class-based views.',
  },
  {
    phase: 2, num: 8, topicId: 'class-based-views',
    titleId: 'Class-Based Views & Mixins', titleEn: 'Class-Based Views & Mixins',
    codeFile: 'katalog/views.py',
    files: {
      'manage.py': MANAGE_PY,
      'myproject/__init__.py': '',
      'myproject/settings.py': `INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
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

LOGIN_URL = 'login'
LOGIN_REDIRECT_URL = 'daftar'`,
      'myproject/urls.py': `from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('akun/login/', auth_views.LoginView.as_view(), name='login'),
    path('akun/logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('', include('katalog.urls')),
]`,
      'myproject/wsgi.py': `import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
application = get_wsgi_application()`,
      'katalog/__init__.py': '',
      'katalog/apps.py': `from django.apps import AppConfig


class KatalogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'katalog'`,
      'katalog/models.py': `from django.db import models


class Kategori(models.Model):
    nama = models.CharField(max_length=100)

    def __str__(self):
        return self.nama


class Produk(models.Model):
    nama = models.CharField(max_length=200)
    harga = models.DecimalField(max_digits=10, decimal_places=2)
    stok = models.PositiveIntegerField(default=0)
    kategori = models.ForeignKey(Kategori, on_delete=models.CASCADE, related_name='produk')
    dibuat = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nama`,
      'katalog/views.py': `from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.views.generic import CreateView, DetailView, ListView, UpdateView

from .models import Produk


# CBV: perilaku umum DIWARISKAN, bukan ditulis ulang
class ProdukListView(ListView):
    model = Produk
    template_name = 'katalog/daftar.html'
    context_object_name = 'produk'
    paginate_by = 5  # paginasi BAWAAN: ?page=2

    def get_queryset(self):
        # Override: kustomisasi query (filter dari ?q=)
        qs = super().get_queryset().select_related('kategori')
        kata = self.request.GET.get('q', '')
        if kata:
            qs = qs.filter(nama__icontains=kata)
        return qs

    def get_context_data(self, **kwargs):
        # Override: tambah data ke context template
        context = super().get_context_data(**kwargs)
        context['judul'] = 'Katalog Produk'
        return context


class ProdukDetailView(DetailView):
    model = Produk
    template_name = 'katalog/detail.html'
    context_object_name = 'item'


class ProdukCreateView(LoginRequiredMixin, CreateView):
    """LoginRequiredMixin: belum login -> redirect ke LOGIN_URL."""
    model = Produk
    template_name = 'katalog/form.html'
    fields = ['nama', 'harga', 'stok', 'kategori']
    success_url = reverse_lazy('daftar')  # lazy: URL di-resolve saat sukses


class ProdukUpdateView(LoginRequiredMixin, UpdateView):
    model = Produk
    template_name = 'katalog/form.html'
    fields = ['nama', 'harga', 'stok', 'kategori']
    success_url = reverse_lazy('daftar')`,
      'katalog/urls.py': `from django.urls import path

from . import views

urlpatterns = [
    path('tambah/', views.ProdukCreateView.as_view(), name='tambah'),
    path('produk/<int:pk>/', views.ProdukDetailView.as_view(), name='detail-produk'),
    path('produk/<int:pk>/ubah/', views.ProdukUpdateView.as_view(), name='ubah'),
    path('', views.ProdukListView.as_view(), name='daftar'),
]`,
      'katalog/templates/katalog/daftar.html': `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>{{ judul }}</title>
  <style>
    body { font-family: system-ui; max-width: 640px; margin: 2rem auto; padding: 0 1rem; }
    .kartu { border: 1px solid #ddd; border-radius: 8px; padding: 1rem; margin-bottom: .75rem; }
    a { color: #2E5B44; }
  </style>
</head>
<body>
  <h1>{{ judul }}</h1>
  <form method="get"><input name="q" placeholder="Cari..." /><button>Cari</button></form>
  {% for p in produk %}
    <div class="kartu">
      <a href="{% url 'detail-produk' p.pk %}">{{ p.nama }}</a>
      - Rp {{ p.harga|floatformat:0 }} ({{ p.kategori.nama }})
    </div>
  {% empty %}
    <p>Tidak ada produk.</p>
  {% endfor %}

  {% if is_paginated %}
    <nav>
      {% if page_obj.has_previous %}<a href="?page={{ page_obj.previous_page_number }}">Sebelumnya</a>{% endif %}
      <span>Halaman {{ page_obj.number }} / {{ page_obj.paginator.num_pages }}</span>
      {% if page_obj.has_next %}<a href="?page={{ page_obj.next_page_number }}">Berikutnya</a>{% endif %}
    </nav>
  {% endif %}
  <p><a href="{% url 'tambah' %}">+ Tambah</a></p>
</body>
</html>`,
      'katalog/templates/katalog/detail.html': `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>{{ item.nama }}</title>
  <style>body { font-family: system-ui; max-width: 640px; margin: 2rem auto; padding: 0 1rem; }</style>
</head>
<body>
  <h1>{{ item.nama }}</h1>
  <p>Harga: Rp {{ item.harga }}</p>
  <p>Stok: {{ item.stok }}</p>
  <p>Kategori: {{ item.kategori }}</p>
  <p>Ditambahkan: {{ item.dibuat|date:'d M Y' }}</p>
  <p><a href="{% url 'daftar' %}">Kembali</a></p>
</body>
</html>`,
      'katalog/templates/katalog/form.html': `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>Form Produk</title>
  <style>
    body { font-family: system-ui; max-width: 480px; margin: 2rem auto; padding: 0 1rem; }
    label { display: block; margin-top: 1rem; }
    input, select { width: 100%; padding: .5rem; box-sizing: border-box; }
    button { margin-top: 1rem; padding: .5rem 1.5rem; background: #2E5B44; color: #fff; border: 0; border-radius: 6px; }
  </style>
</head>
<body>
  <h1>Form Produk</h1>
  <form method="post">
    {% csrf_token %}
    {{ form.as_p }}
    <button type="submit">Simpan</button>
  </form>
</body>
</html>`,
      'package.json': PKG_NODE,
      'requirements.txt': 'Django>=5.2,<6.1\n',
      'README.md': `# Django Lesson 8 - Class-Based Views

Jalankan: pip install -r requirements.txt && python3 manage.py migrate && python3 manage.py runserver
ListView + DetailView + CreateView + UpdateView dengan mixins & pagination.`,
    },
    objId: [
      'Menjelaskan CBV: perilaku umum yang diwariskan',
      'Memakai ListView, DetailView, CreateView, UpdateView',
      'Meng-override get_queryset dan get_context_data',
      'Menggabungkan mixins (LoginRequiredMixin) dan paginasi',
    ],
    objEn: [
      'Explain CBVs: inherited common behavior',
      'Use ListView, DetailView, CreateView, UpdateView',
      'Override get_queryset and get_context_data',
      'Combine mixins (LoginRequiredMixin) and pagination',
    ],
    expId: `## CBV: Kode yang Tidak Ditulis Ulang
CRUD web selalu sama: list, detail, form create, form update. ListView(model=Produk) sudah menyediakan query, context (object_list), template default, dan paginasi. Anda TIDAK menulis view - Anda mengonfigurasi dan meng-override. Hasil: 4 halaman CRUD = 4 class ~10 baris, dibanding ~80 baris FBV. Aturan: mulailah dengan FBV untuk memahami, lalu CBV untuk produktivitas - keduanya sah.
## Override: Titik Kustomisasi
get_queryset() mengubah data yang diambil (filter ?q=, select_related). get_context_data() menambah variabel template (judul). get_success_url / success_url menentukan redirect setelah simpan. Form validation, URL kwargs (pk), 404 otomatis untuk id salah - SEMUA sudah ada. Menemukan titik override = memahami CBV.
## Mixins: Keamanan Lewat Komposisi
LoginRequiredMixin mengecek login SEBELUM view berjalan (setara @login_required, tapi sebagai class). Komposisi: class ProdukCreateView(LoginRequiredMixin, CreateView) - mixin di KIRI, view dasar di KANAN (urutan MRO penting). Mixin lain: PermissionRequiredMixin, UserPassesTestMixin. Pola komposisi yang sama dengan mixins di Vue/React HOC.
## Paginasi & Aturan Praktis
paginate_by = 5: ListView mengirim page_obj + is_paginated + url ?page=N. Template: previous/next + nomor halaman. Kapan CBV tidak cocok: view dengan logika POST kompleks atau banyak cabang - jangan memaksakan class; FBV tetap pilihan sah. Pragmatisme > dogma.`,
    expEn: `## CBVs: Code That Is Not Rewritten
Web CRUD is always the same: list, detail, create form, update form. ListView(model=Produk) already provides the query, the context (object_list), a default template, and pagination. You do not WRITE the view - you configure and override. Result: 4 CRUD pages = 4 classes of ~10 lines, versus ~80 lines of FBVs. Rule: start with FBVs to understand, then CBVs for productivity - both are valid.
## Overrides: The Customization Points
get_queryset() changes the fetched data (?q= filter, select_related). get_context_data() adds template variables (judul). get_success_url / success_url set the post-save redirect. Form validation, URL kwargs (pk), automatic 404 for bad ids - ALL built in. Finding the override points = understanding CBVs.
## Mixins: Security Through Composition
LoginRequiredMixin checks the login BEFORE the view runs (equivalent to @login_required, but as a class). Composition: class ProdukCreateView(LoginRequiredMixin, CreateView) - the mixin on the LEFT, the base view on the RIGHT (MRO order matters). Other mixins: PermissionRequiredMixin, UserPassesTestMixin. The same composition pattern as Vue mixins or React HOCs.
## Pagination & Practical Rules
paginate_by = 5: ListView delivers page_obj + is_paginated + the ?page=N url. Template: previous/next + page numbers. When CBVs do not fit: views with complex POST logic or many branches - do not force a class; FBVs stay a valid choice. Pragmatism over dogma.`,
    chId: 'Buat CRUD lengkap ala bootcamp: (1) tambah DeleteView (get_success_url kembali ke daftar) + template konfirmasi hapus, (2) tambah FormView untuk pencarian lanjutan (form dengan q + kategori), (3) ganti paginate_by menjadi 3 dan tambahkan navigasi halaman lengkap (first/last), (4) refactor satu FBV kompleks dari pelajaran 7 (kota) menjadi CBV dengan UserPassesTestMixin.',
    chEn: 'Build a full bootcamp-style CRUD: (1) add a DeleteView (get_success_url back to the list) + a delete-confirmation template, (2) add a FormView for advanced search (a form with q + kategori), (3) change paginate_by to 3 and add full page navigation (first/last), (4) refactor one complex FBV from lesson 7 (kota) into a CBV with UserPassesTestMixin.',
    sumId: 'CBV = konfigurasi + override, bukan tulis ulang. get_queryset/get_context_data. Mixins di kiri. Paginasi bawaan. Lanjut: DRF serializers.',
    sumEn: 'CBVs = configuration + overrides, not rewrites. get_queryset/get_context_data. Mixins on the left. Built-in pagination. Next: DRF serializers.',
  },
];

// ===== PHASE 3: REST APIS & DRF (lessons 9-11) =====
const LESSONS_P3 = [
  {
    phase: 3, num: 9, topicId: 'drf-serializers',
    titleId: 'DRF: Serializers & APIView', titleEn: 'DRF: Serializers & APIView',
    codeFile: 'katalog/serializers.py',
    files: {
      'manage.py': MANAGE_PY,
      'myproject/__init__.py': '',
      'myproject/settings.py': `INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',  # DRF
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

# DRF: konfigurasi global
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}`,
      'myproject/urls.py': `from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('katalog.api_urls')),
]`,
      'myproject/wsgi.py': `import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
application = get_wsgi_application()`,
      'katalog/__init__.py': '',
      'katalog/apps.py': `from django.apps import AppConfig


class KatalogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'katalog'`,
      'katalog/models.py': `from django.db import models


class Kategori(models.Model):
    nama = models.CharField(max_length=100)

    def __str__(self):
        return self.nama


class Produk(models.Model):
    nama = models.CharField(max_length=200)
    harga = models.DecimalField(max_digits=10, decimal_places=2)
    stok = models.PositiveIntegerField(default=0)
    kategori = models.ForeignKey(Kategori, on_delete=models.CASCADE, related_name='produk')
    dibuat = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nama`,
      'katalog/serializers.py': `from rest_framework import serializers

from .models import Kategori, Produk


class KategoriSerializer(serializers.ModelSerializer):
    """ModelSerializer: JSON dari/ke model - otomatis dari field model."""

    class Meta:
        model = Kategori
        fields = ['id', 'nama']


class ProdukSerializer(serializers.ModelSerializer):
    # Nama field boleh beda dari model (read-only, dari relasi)
    nama_kategori = serializers.CharField(source='kategori.nama', read_only=True)

    class Meta:
        model = Produk
        fields = ['id', 'nama', 'harga', 'stok', 'kategori', 'nama_kategori', 'dibuat']

    # Validasi custom (setara clean_* di forms)
    def validate_harga(self, harga):
        if harga <= 0:
            raise serializers.ValidationError('Harga harus lebih dari 0.')
        return harga


class ProdukRingkasSerializer(serializers.ModelSerializer):
    """Serializer kedua: subset field untuk endpoint ringkas."""

    class Meta:
        model = Produk
        fields = ['id', 'nama', 'harga']`,
      'katalog/views.py': `from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Kategori, Produk
from .serializers import KategoriSerializer, ProdukSerializer


# APIView berbasis fungsi (setara FBV untuk API)
@api_view(['GET', 'POST'])
def produk_list(request):
    if request.method == 'GET':
        produk = Produk.objects.select_related('kategori').all()
        serializer = ProdukSerializer(produk, many=True)  # list -> many=True
        return Response(serializer.data)

    if request.method == 'POST':
        # Validasi + data bersih dalam satu langkah
        serializer = ProdukSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # -> create di DB
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def produk_detail(request, pk):
    try:
        produk = Produk.objects.get(pk=pk)
    except Produk.DoesNotExist:
        return Response({'detail': 'Tidak ditemukan.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return Response(ProdukSerializer(produk).data)

    if request.method == 'PUT':
        serializer = ProdukSerializer(produk, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        produk.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def kategori_list(request):
    return Response(KategoriSerializer(Kategori.objects.all(), many=True).data)`,
      'katalog/urls.py': `from django.urls import path

urlpatterns = []  # API di api_urls.py`,
      'katalog/api_urls.py': `from django.urls import path

from . import views

urlpatterns = [
    path('produk/', views.produk_list, name='api-produk-list'),
    path('produk/<int:pk>/', views.produk_detail, name='api-produk-detail'),
    path('kategori/', views.kategori_list, name='api-kategori-list'),
]`,
      'package.json': `{
  "name": "django-lesson-drf",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "pip install -r requirements.txt && python3 manage.py migrate && python3 manage.py runserver"
  }
}`,
      'requirements.txt': REQ_DJANGO(),
      'README.md': `# Django Lesson 9 - DRF: Serializers & APIView

Jalankan: pip install -r requirements.txt && python3 manage.py migrate && python3 manage.py runserver
Buka /api/produk/ - browsable API! POST dari /api/produk/ dengan JSON.`,
    },
    objId: [
      'Memasang dan mengonfigurasi Django REST Framework',
      'Menulis ModelSerializer dan validasi custom',
      'Menulis APIView: GET list, POST create, GET/PUT/DELETE detail',
      'Memakai browsable API DRF untuk eksplorasi',
    ],
    objEn: [
      'Install and configure the Django REST Framework',
      'Write ModelSerializers and custom validation',
      'Write APIViews: GET list, POST create, GET/PUT/DELETE detail',
      'Use the DRF browsable API for exploration',
    ],
    expId: `## Kenapa DRF: Serializer = DTO + Form dalam Satu
Serializer mengubah model → JSON (keluar) dan JSON → model (masuk), plus validasi - persis DTO + ValidationPipe di NestJS. ModelSerializer menurunkan field dan validasi dari model: satu definisi, konsisten dengan database. serializer.save() menulis ke DB; banyak = many=True. Dua arah: ProdukSerializer(data=request.data) untuk input, serializer.data untuk output.
## APIView: Empat Method, Satu Fungsi
@api_view(['GET','POST']) membuat view yang menangani method HTTP: GET = baca, POST = buat (201), PUT = ganti penuh, DELETE = hapus (204). Response(serializer.data) mengembalikan JSON; serializer.errors → 400 dengan detail field mana yang gagal. Pola ini setara route + controller di Express/Nest - tapi validasi dan serialisasi otomatis.
## Browsable API: Dokumentasi Hidup
Buka /api/produk/ di browser → DRF merender UI interaktif: form isian, tombol method, detail response. Ini "Swagger-nya DRF" yang lahir gratis. Frontend dev bisa uji endpoint tanpa Postman; explorer bisa membaca kontrak API dari browser. Dokumentasi tidak pernah basi karena lahir dari serializer.
## API vs Template: Dua Wajah Django
View template mengembalikan HTML (render); APIView mengembalikan JSON (Response). Aplikasi nyata memakai KEDUANYA: halaman admin/template untuk internal, API untuk frontend/mobile. Pisahkan routing-nya (/ vs /api/) dan mulailah API-first seperti riset 2026: banyak perusahaan Django memakai DRF sebagai backend utama.`,
    expEn: `## Why DRF: Serializer = DTO + Form in One
A serializer converts model → JSON (out) and JSON → model (in), plus validation - exactly the DTO + ValidationPipe from NestJS. ModelSerializer derives fields and validation from the model: one definition, consistent with the database. serializer.save() writes to the DB; collections use many=True. Two directions: ProdukSerializer(data=request.data) for input, serializer.data for output.
## APIView: Four Methods, One Function
@api_view(['GET','POST']) builds a view handling HTTP methods: GET = read, POST = create (201), PUT = full replace, DELETE = remove (204). Response(serializer.data) returns JSON; serializer.errors → 400 with the failing fields detailed. This pattern equals routes + controllers in Express/Nest - but validation and serialization are automatic.
## The Browsable API: Living Documentation
Open /api/produk/ in a browser → DRF renders an interactive UI: input forms, method buttons, response details. This is DRF's "Swagger", free from birth. Frontend devs test endpoints without Postman; explorers read the API contract from the browser. Docs never go stale because they are born from serializers.
## API vs Template: Django's Two Faces
Template views return HTML (render); APIViews return JSON (Response). Real apps use BOTH: admin/template pages for internal use, APIs for frontends/mobiles. Split the routing (/ vs /api/) and start API-first like the 2026 research: many Django companies run DRF as their primary backend.`,
    chId: 'Perluas API: (1) tambah serializer Ulasan (produk FK + isi + bintang + penulis) dan endpoint GET/POST /api/produk/<id>/ulasan/, (2) tambah query param ?stok_min= di produk_list (filter sebelum serializer), (3) tambah endpoint GET /api/statistik/ mengembalikan aggregasi (jumlah produk, rata-rata harga) via Response, (4) buat serializer nested: produk dengan daftar ulasannya (UlasanSerializer many=True).',
    chEn: 'Extend the API: (1) add a Ulasan serializer (produk FK + isi + bintang + penulis) and GET/POST /api/produk/<id>/ulasan/ endpoints, (2) add a ?stok_min= query param to produk_list (filter before serializing), (3) add a GET /api/statistik/ endpoint returning aggregations (product count, average price) via Response, (4) build a nested serializer: products with their reviews (UlasanSerializer many=True).',
    sumId: 'Serializer = DTO + form + validasi. APIView = 4 method satu view. Browsable API = docs hidup. JSON untuk frontend. Lanjut: viewsets & routers.',
    sumEn: 'Serializers = DTO + form + validation. APIViews = 4 methods in one view. The browsable API = living docs. JSON for frontends. Next: viewsets & routers.',
  },
  {
    phase: 3, num: 10, topicId: 'drf-viewsets',
    titleId: 'DRF: ViewSets, Routers & Filtering', titleEn: 'DRF: ViewSets, Routers & Filtering',
    codeFile: 'katalog/views.py',
    files: {
      'manage.py': MANAGE_PY,
      'myproject/__init__.py': '',
      'myproject/settings.py': `INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'django_filters',  # filtering deklaratif
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

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    # Paginasi global: semua list dikembalikan per halaman
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
}`,
      'myproject/urls.py': `from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('katalog.api_urls')),
]`,
      'myproject/wsgi.py': `import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
application = get_wsgi_application()`,
      'katalog/__init__.py': '',
      'katalog/apps.py': `from django.apps import AppConfig


class KatalogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'katalog'`,
      'katalog/models.py': `from django.db import models


class Kategori(models.Model):
    nama = models.CharField(max_length=100)

    def __str__(self):
        return self.nama


class Produk(models.Model):
    nama = models.CharField(max_length=200)
    harga = models.DecimalField(max_digits=10, decimal_places=2)
    stok = models.PositiveIntegerField(default=0)
    tersedia = models.BooleanField(default=True)
    kategori = models.ForeignKey(Kategori, on_delete=models.CASCADE, related_name='produk')
    dibuat = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nama`,
      'katalog/serializers.py': `from rest_framework import serializers

from .models import Kategori, Produk


class KategoriSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kategori
        fields = ['id', 'nama']


class ProdukSerializer(serializers.ModelSerializer):
    nama_kategori = serializers.CharField(source='kategori.nama', read_only=True)

    class Meta:
        model = Produk
        fields = ['id', 'nama', 'harga', 'stok', 'tersedia', 'kategori', 'nama_kategori', 'dibuat']`,
      'katalog/views.py': `from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import OrderingFilter, SearchFilter

from .models import Kategori, Produk
from .serializers import KategoriSerializer, ProdukSerializer


# ViewSet: list + create + retrieve + update + delete SEKALIGUS
class ProdukViewSet(viewsets.ModelViewSet):
    queryset = Produk.objects.select_related('kategori').all()
    serializer_class = ProdukSerializer

    # Filtering deklaratif dari query params
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['kategori', 'tersedia']  # ?kategori=1&tersedia=true
    search_fields = ['nama', 'kategori__nama']   # ?search=kopi
    ordering_fields = ['harga', 'stok', 'dibuat']  # ?ordering=-harga
    ordering = ['-dibuat']

    # Override query: batasi data per-user (pola keamanan!)
    def get_queryset(self):
        qs = super().get_queryset()
        min_harga = self.request.query_params.get('min_harga')
        if min_harga:
            qs = qs.filter(harga__gte=min_harga)
        return qs


class KategoriViewSet(viewsets.ModelViewSet):
    queryset = Kategori.objects.all()
    serializer_class = KategoriSerializer`,
      'katalog/api_urls.py': `from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

# Router: URL otomatis untuk SEMUA aksi ViewSet
router = DefaultRouter()
router.register('produk', views.ProdukViewSet, basename='produk')
router.register('kategori', views.KategoriViewSet, basename='kategori')

urlpatterns = [
    path('', include(router.urls)),
]`,
      'package.json': `{
  "name": "django-lesson-drf",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "pip install -r requirements.txt && python3 manage.py migrate && python3 manage.py runserver"
  }
}`,
      'requirements.txt': REQ_DJANGO(['django-filter>=24.3']),
      'README.md': `# Django Lesson 10 - ViewSets & Routers

Jalankan: pip install -r requirements.txt && python3 manage.py migrate && python3 manage.py runserver
Coba: /api/produk/, /api/produk/1/, /api/produk/?search=kopi&ordering=-harga&page=2`,
    },
    objId: [
      'Menulis ModelViewSet: CRUD lengkap dalam satu class',
      'Membuat URL otomatis dengan DefaultRouter',
      'Menambahkan filtering, search & ordering',
      'Meng-override get_queryset untuk kontrol query',
    ],
    objEn: [
      'Write a ModelViewSet: full CRUD in one class',
      'Auto-generate URLs with DefaultRouter',
      'Add filtering, search & ordering',
      'Override get_queryset for query control',
    ],
    expId: `## ViewSet: CRUD dalam Satu Class
ModelViewSet menyediakan list, create, retrieve, update, partial_update, delete - TANPA menulis satu pun method. Konfigurasi: queryset + serializer_class. DefaultRouter menghasilkan URL-nya: /produk/ (list+create), /produk/{pk}/ (retrieve+update+delete). Ini jawaban DRF untuk "controller fat" - 80% endpoint CRUD tidak butuh kode baru, hanya konfigurasi.
## Filtering: Deklaratif, Bukan Manual
filter_backends + filterset_fields = ?kategori=1&tersedia=true otomatis. SearchFilter = ?search=kopi (icontains, bisa lintas field). OrderingFilter = ?ordering=-harga. Tanpa backend ini, filter manual = if di tiap view (banyak duplikasi). Django-filter memetakan query params ke QuerySet secara aman - validasi tipe bawaan.
## get_queryset: Titik Keamanan & Kustomisasi
Override get_queryset untuk: filter per-user (request.user), soft delete, filter harga custom, optimasi select_related. Di sinilah aturan "user hanya melihat datanya sendiri" DIPAKSA - bukan di serializer, bukan di frontend. Pola yang sama di semua track: query-level security.
## Router: URL yang Tidak Bisa Typo
DefaultRouter membaca aksi ViewSet dan membuat URL + nama route konsisten. Tambah aksi custom dengan @action (GET/POST /produk/terlaris/) tanpa merusak router. Browsable API + router = endpoint yang bisa dieksplorasi tanpa dokumentasi terpisah.`,
    expEn: `## ViewSets: CRUD in One Class
ModelViewSet provides list, create, retrieve, update, partial_update, delete - without writing a single method. Configuration: queryset + serializer_class. DefaultRouter generates the URLs: /produk/ (list+create), /produk/{pk}/ (retrieve+update+delete). This is DRF's answer to "fat controllers" - 80% of CRUD endpoints need no new code, only configuration.
## Filtering: Declarative, Not Manual
filter_backends + filterset_fields = ?kategori=1&tersedia=true automatically. SearchFilter = ?search=kopi (icontains, cross-field). OrderingFilter = ?ordering=-harga. Without these backends, manual filtering = ifs in every view (lots of duplication). django-filter maps query params to QuerySets safely - built-in type validation.
## get_queryset: The Security & Customization Point
Override get_queryset for: per-user filtering (request.user), soft deletes, custom price filters, select_related optimization. This is where the "users only see their own data" rule is ENFORCED - not in the serializer, not in the frontend. The same pattern across all tracks: query-level security.
## Routers: URLs That Cannot Typos
DefaultRouter reads the ViewSet actions and generates URLs + consistent route names. Add custom actions with @action (GET/POST /produk/terlaris/) without breaking the router. Browsable API + router = endpoints explorable without separate documentation.`,
    chId: 'Perkuat API: (1) tambah aksi custom @action(detail=False) GET terlaris di ProdukViewSet (top 5 stok terbanyak), (2) tambah aksi @action(detail=True) POST /produk/<id>/tambah-stok/ yang menambah stok via serializer input, (3) aktifkan pagination custom: 5 per halaman + ?page_size override, (4) buat ReadOnlyModelViewSet untuk laporan (statistik per kategori) - hanya baca, tidak bisa write.',
    chEn: 'Strengthen the API: (1) add a custom @action(detail=False) GET terlaris to ProdukViewSet (top 5 best-stocked), (2) add a @action(detail=True) POST /produk/<id>/tambah-stok/ increasing stock via serializer input, (3) enable custom pagination: 5 per page + ?page_size override, (4) build a ReadOnlyModelViewSet for reports (statistics per category) - read only, no writes.',
    sumId: 'ViewSet = CRUD satu class. Router = URL otomatis. Filter/search/ordering deklaratif. get_queryset = gerbang keamanan. Lanjut: JWT & permissions.',
    sumEn: 'ViewSets = CRUD in one class. Routers = automatic URLs. Declarative filter/search/ordering. get_queryset = the security gate. Next: JWT & permissions.',
  },
  {
    phase: 3, num: 11, topicId: 'drf-auth-jwt',
    titleId: 'DRF: JWT, Permissions & Throttling', titleEn: 'DRF: JWT, Permissions & Throttling',
    codeFile: 'myproject/settings.py',
    files: {
      'manage.py': MANAGE_PY,
      'myproject/__init__.py': '',
      'myproject/settings.py': `INSTALLED_APPS = [
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
}`,
      'myproject/urls.py': `from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    # Endpoint token JWT bawaan simplejwt
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include('katalog.api_urls')),
]`,
      'myproject/wsgi.py': `import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
application = get_wsgi_application()`,
      'katalog/__init__.py': '',
      'katalog/apps.py': `from django.apps import AppConfig


class KatalogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'katalog'`,
      'katalog/models.py': `from django.db import models


class Kategori(models.Model):
    nama = models.CharField(max_length=100)

    def __str__(self):
        return self.nama


class Produk(models.Model):
    nama = models.CharField(max_length=200)
    harga = models.DecimalField(max_digits=10, decimal_places=2)
    stok = models.PositiveIntegerField(default=0)
    kategori = models.ForeignKey(Kategori, on_delete=models.CASCADE, related_name='produk')
    dibuat = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nama`,
      'katalog/serializers.py': `from rest_framework import serializers

from .models import Kategori, Produk


class KategoriSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kategori
        fields = ['id', 'nama']


class ProdukSerializer(serializers.ModelSerializer):
    nama_kategori = serializers.CharField(source='kategori.nama', read_only=True)

    class Meta:
        model = Produk
        fields = ['id', 'nama', 'harga', 'stok', 'kategori', 'nama_kategori', 'dibuat']`,
      'katalog/permissions.py': `from rest_framework import permissions


# Permission custom: hanya staff yang boleh menulis
class IsStaffOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        # GET/HEAD/OPTIONS boleh semua; tulis hanya staff
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff`,
      'katalog/views.py': `from rest_framework import permissions, viewsets

from .models import Kategori, Produk
from .serializers import KategoriSerializer, ProdukSerializer
from .permissions import IsStaffOrReadOnly


class ProdukViewSet(viewsets.ModelViewSet):
    queryset = Produk.objects.select_related('kategori').all()
    serializer_class = ProdukSerializer
    # Semua aksi butuh login (default global IsAuthenticated),
    # tulis hanya staff
    permission_classes = [IsStaffOrReadOnly]


class KategoriViewSet(viewsets.ModelViewSet):
    queryset = Kategori.objects.all()
    serializer_class = KategoriSerializer
    permission_classes = [IsStaffOrReadOnly]`,
      'katalog/api_urls.py': `from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('produk', views.ProdukViewSet, basename='produk')
router.register('kategori', views.KategoriViewSet, basename='kategori')

urlpatterns = [
    path('', include(router.urls)),
]`,
      'package.json': `{
  "name": "django-lesson-drf",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "pip install -r requirements.txt && python3 manage.py migrate && python3 manage.py createsuperuser && python3 manage.py runserver"
  }
}`,
      'requirements.txt': REQ_DJANGO(['djangorestframework-simplejwt>=5.4.0']),
      'README.md': `# Django Lesson 11 - JWT, Permissions & Throttling

Jalankan:
  pip install -r requirements.txt
  python3 manage.py migrate
  python3 manage.py createsuperuser
  python3 manage.py runserver
Lalu: POST /api/token/ {username, password} -> access token.
GET /api/produk/ dengan header Authorization: Bearer <token>.`,
    },
    objId: [
      'Menjelaskan JWT: access & refresh token',
      'Mendapatkan token via simplejwt (TokenObtainPairView)',
      'Menulis permission classes (IsAuthenticated, custom)',
      'Mengonfigurasi throttling untuk proteksi API',
    ],
    objEn: [
      'Explain JWT: access & refresh tokens',
      'Obtain tokens via simplejwt (TokenObtainPairView)',
      'Write permission classes (IsAuthenticated, custom)',
      'Configure throttling to protect the API',
    ],
    expId: `## JWT: Token yang Membawa Identitas
Login → POST /api/token/ {username, password} → {access, refresh}. Client mengirim Authorization: Bearer <access> di tiap request; JWTAuthentication memverifikasi tanda tangan tanpa menyentuh database sesi. Access token pendek (30 menit), refresh panjang (7 hari) - refresh hanya untuk menukar access baru. Stateless = API bisa di-scale horizontal.
## Permission Classes: Siapa Boleh Apa
IsAuthenticated = harus login (semua default global). AllowAny = publik. IsAdminUser = staff. Custom IsStaffOrReadOnly: SAFE_METHODS (GET/HEAD/OPTIONS) untuk semua, tulis (POST/PUT/DELETE) hanya staff. Permission dipasang per-view atau global - komposisi seperti guards di NestJS. Kombinasi umum: auth (siapa) + permission (boleh apa).
## Throttling: Rem untuk API
Throttle membatasi permintaan: anon 20/menit, user 100/menit - melindungi dari brute-force dan penyalahgunaan. Rate limits muncul sebagai header HTTP (X-RateLimit-*) dan error 429 saat lewat. Untuk produksi: throttle lebih ketat di endpoint auth, lebih longgar di endpoint publik read-only.
## Alur Lengkap di Aplikasi
Frontend: login → simpan token → kirim Authorization tiap request → 401 saat expired → refresh token → token baru. Password di-hash (auth bawaan Django), secret JWT di env (pelajaran 15). Token TIDAK disimpan di localStorage pada app sensitif - gunakan httpOnly cookie yang aman (django-cookie-jar) atau short-lived token.`,
    expEn: `## JWT: Tokens That Carry Identity
Login → POST /api/token/ {username, password} → {access, refresh}. The client sends Authorization: Bearer <access> on every request; JWTAuthentication verifies the signature without touching a session database. Short access tokens (30 minutes), long refresh tokens (7 days) - refresh only exchanges for a new access. Stateless = horizontally scalable APIs.
## Permission Classes: Who May Do What
IsAuthenticated = must log in (the global default). AllowAny = public. IsAdminUser = staff. Custom IsStaffOrReadOnly: SAFE_METHODS (GET/HEAD/OPTIONS) for everyone, writes (POST/PUT/DELETE) staff only. Permissions mount per-view or globally - composition like guards in NestJS. Common pairing: authentication (who) + permissions (what they may do).
## Throttling: The API Brake
Throttles cap requests: anon 20/minute, user 100/minute - protecting against brute force and abuse. Rate limits surface as HTTP headers (X-RateLimit-*) and 429 errors when exceeded. For production: tighter throttles on auth endpoints, looser on public read-only endpoints.
## The Full App Flow
Frontend: login → store tokens → send Authorization on every request → 401 when expired → refresh token → new token. Passwords hashed (Django built-in auth), JWT secret in env (lesson 15). Tokens are NOT stored in localStorage for sensitive apps - use secure httpOnly cookies (django-cookie-jar) or short-lived tokens.`,
    chId: 'Perkuat keamanan API: (1) buat permission IsOwnerOrReadOnly: objek dengan field pemilik hanya bisa diubah pemiliknya (has_object_permission + request.user == objek.pemilik), (2) tambah model Ulasan dengan pemilik=FK User dan terapkan permission itu di viewset-nya, (3) tambah throttle khusus: 5/menit untuk endpoint token (ScopedRateThrottle), (4) uji: tanpa token (401), token salah (401), token valid (200), rate limit lewat (429).',
    chEn: 'Harden the API: (1) write an IsOwnerOrReadOnly permission: objects with an owner field are editable only by their owner (has_object_permission + request.user == objek.pemilik), (2) add a Ulasan model with pemilik=FK User and apply that permission in its viewset, (3) add a dedicated throttle: 5/minute for the token endpoint (ScopedRateThrottle), (4) test: no token (401), wrong token (401), valid token (200), rate limit exceeded (429).',
    sumId: 'JWT = stateless, access+refresh. Permissions = siapa boleh apa. Throttling = rem API. 401/403/429 jelas. Lanjut: testing.',
    sumEn: 'JWT = stateless, access+refresh. Permissions = who may do what. Throttling = the API brake. Clear 401/403/429. Next: testing.',
  },
];

// ===== PHASE 4: TESTING & SECURITY (lessons 12-14) =====
const LESSONS_P4 = [
  {
    phase: 4, num: 12, topicId: 'testing',
    titleId: 'Testing: TestCase, Client & APITestCase', titleEn: 'Testing: TestCase, Client & APITestCase',
    codeFile: 'katalog/tests.py',
    files: {
      'manage.py': MANAGE_PY,
      'myproject/__init__.py': '',
      'myproject/settings.py': `INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
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

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}`,
      'myproject/urls.py': `from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('katalog.api_urls')),
]`,
      'myproject/wsgi.py': `import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
application = get_wsgi_application()`,
      'katalog/__init__.py': '',
      'katalog/apps.py': `from django.apps import AppConfig


class KatalogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'katalog'`,
      'katalog/models.py': `from django.db import models


class Kategori(models.Model):
    nama = models.CharField(max_length=100)

    def __str__(self):
        return self.nama


class Produk(models.Model):
    nama = models.CharField(max_length=200)
    harga = models.DecimalField(max_digits=10, decimal_places=2)
    stok = models.PositiveIntegerField(default=0)
    kategori = models.ForeignKey(Kategori, on_delete=models.CASCADE, related_name='produk')
    dibuat = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nama`,
      'katalog/serializers.py': `from rest_framework import serializers

from .models import Kategori, Produk


class KategoriSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kategori
        fields = ['id', 'nama']


class ProdukSerializer(serializers.ModelSerializer):
    nama_kategori = serializers.CharField(source='kategori.nama', read_only=True)

    class Meta:
        model = Produk
        fields = ['id', 'nama', 'harga', 'stok', 'kategori', 'nama_kategori', 'dibuat']

    def validate_harga(self, harga):
        if harga <= 0:
            raise serializers.ValidationError('Harga harus lebih dari 0.')
        return harga`,
      'katalog/views.py': `from rest_framework import viewsets

from .models import Kategori, Produk
from .serializers import KategoriSerializer, ProdukSerializer


class ProdukViewSet(viewsets.ModelViewSet):
    queryset = Produk.objects.select_related('kategori').all()
    serializer_class = ProdukSerializer


class KategoriViewSet(viewsets.ModelViewSet):
    queryset = Kategori.objects.all()
    serializer_class = KategoriSerializer`,
      'katalog/api_urls.py': `from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('produk', views.ProdukViewSet, basename='produk')
router.register('kategori', views.KategoriViewSet, basename='kategori')

urlpatterns = [
    path('', include(router.urls)),
]`,
      'katalog/tests.py': `from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Kategori, Produk


class ModelTestCase(TestCase):
    """Test model: fast, tanpa HTTP."""

    def setUp(self):
        # setUp dijalankan SEBELUM tiap test - database test bersih
        self.kategori = Kategori.objects.create(nama='Minuman')
        self.produk = Produk.objects.create(
            nama='Kopi', harga=45000, stok=10, kategori=self.kategori,
        )

    def test_string_representation(self):
        self.assertEqual(str(self.produk), 'Kopi')

    def test_relasi(self):
        # related_name='produk' bekerja di arah sebaliknya
        self.assertEqual(self.kategori.produk.count(), 1)


class ApiTestCase(APITestCase):
    """Test API: HTTP sungguhan terhadap test database."""

    def setUp(self):
        self.kategori = Kategori.objects.create(nama='Minuman')
        self.admin = User.objects.create_superuser(
            username='admin', password='rahasia123', email='a@a.co',
        )

    def test_list_produk_kosong(self):
        response = self.client.get('/api/produk/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 0)  # pagination

    def test_buat_produk_valid(self):
        self.client.force_authenticate(self.admin)
        response = self.client.post('/api/produk/', {
            'nama': 'Teh', 'harga': '25000', 'stok': 5, 'kategori': self.kategori.id,
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Produk.objects.count(), 1)

    def test_buat_produk_harga_negatif_ditolak(self):
        self.client.force_authenticate(self.admin)
        response = self.client.post('/api/produk/', {
            'nama': 'Teh', 'harga': '-5', 'stok': 5, 'kategori': self.kategori.id,
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)`,
      'package.json': `{
  "name": "django-lesson-testing",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "pip install -r requirements.txt && python3 manage.py migrate && python3 manage.py test",
    "test": "python3 manage.py test"
  }
}`,
      'requirements.txt': REQ_DJANGO(),
      'README.md': `# Django Lesson 12 - Testing

Jalankan: pip install -r requirements.txt && python3 manage.py test -v 2
TestCase untuk model, APITestCase untuk HTTP.`,
    },
    objId: [
      'Menulis TestCase untuk model (unit test)',
      'Memakai Django test client untuk view',
      'Menulis APITestCase untuk endpoint DRF',
      'Menjalankan test suite dan membaca hasilnya',
    ],
    objEn: [
      'Write TestCases for models (unit tests)',
      'Use the Django test client for views',
      'Write APITestCases for DRF endpoints',
      'Run the test suite and read the results',
    ],
    expId: `## Django Test Runner: Bawaan, Gratis, Cepat
python manage.py test menemukan tests.py, membuat DATABASE TEST terpisah (tidak menyentuh data asli!), menjalankan tiap test, lalu menghapusnya. setUp() menyiapkan data sebelum tiap test - setiap test dimulai dari keadaan bersih, tidak bergantung urutan. Ini yang membuat suite test Django sangat mudah dimulai: tidak butuh framework tambahan.
## TestCase: Unit untuk Model & Logika
ModelTestCase menguji model: __str__, relasi, validasi, method. Test model = test tercepat dan paling banyak jumlahnya (piramida test). Aturan: setiap logika yang bisa salah (harga negatif, relasi, method bisnis) layak diuji - jangan sampai bug model baru ketahuan di produksi.
## APITestCase: HTTP Sungguhan
self.client.get/post/put/delete() menjalankan HTTP melawan test server in-memory. force_authenticate(user) meniru login untuk endpoint terproteksi. Assertion: status_code (200/201/400), response.data (body JSON), database state. Test API = kontrak yang DILIHAT frontend - kualitas tertinggi untuk uang Anda.
## Red-Green-Refactor di Praktik
Pola bootcamp: tulis test DULU (merah), buat fitur (hijau), rapikan (refactor). Test memaksa Anda berpikir "bagaimana ini dipakai?" sebelum menulis implementasi. Di CI (pelajaran 17), test yang gagal menghentikan deploy - kode rusak tidak pernah sampai produksi.`,
    expEn: `## The Django Test Runner: Built-in, Free, Fast
python manage.py test discovers tests.py, creates a SEPARATE test database (never touching real data!), runs each test, then deletes it. setUp() prepares data before each test - every test starts clean, never depending on order. This is why starting a Django test suite is so easy: no extra framework needed.
## TestCase: Units for Models & Logic
ModelTestCase tests models: __str__, relations, validation, methods. Model tests are the fastest and most numerous (the test pyramid). Rule: any logic that can break (negative prices, relations, business methods) deserves a test - never let model bugs surface in production.
## APITestCase: Real HTTP
self.client.get/post/put/delete() runs real HTTP against an in-memory test server. force_authenticate(user) simulates login for protected endpoints. Assertions: status_code (200/201/400), response.data (the JSON body), database state. API tests = the contract the FRONTEND sees - the highest quality for your money.
## Red-Green-Refactor in Practice
The bootcamp pattern: write the test FIRST (red), build the feature (green), tidy up (refactor). Tests force you to think "how is this used?" before writing the implementation. In CI (lesson 17), failing tests stop the deployment - broken code never reaches production.`,
    chId: 'Perkuat suite: (1) tulis test untuk PUT /api/produk/<id>/ (update) dan DELETE (hapus + 204), (2) tulis test validasi: judul kosong, stok negatif, kategori tidak ada (FK validasi) - semua harus 400, (3) tulis test untuk custom @action terlaris dari pelajaran 10 (buat 3 produk, cek urutan), (4) tambahkan factory sederhana: method bantu buat_produk(nama, harga) di setUp untuk mengurangi duplikasi.',
    chEn: 'Strengthen the suite: (1) write tests for PUT /api/produk/<id>/ (update) and DELETE (delete + 204), (2) write validation tests: empty name, negative stock, missing category (FK validation) - all must be 400, (3) write a test for the terlaris custom @action from lesson 10 (create 3 products, check the order), (4) add a simple factory: a buat_produk(nama, harga) helper in setUp to reduce duplication.',
    sumId: 'Test runner bawaan + test DB terpisah. TestCase = model, APITestCase = HTTP. setUp = bersih tiap test. Merah-hijau-refactor. Lanjut: security.',
    sumEn: 'Built-in runner + isolated test DB. TestCase = models, APITestCase = HTTP. setUp = clean per test. Red-green-refactor. Next: security.',
  },
  {
    phase: 4, num: 13, topicId: 'security',
    titleId: 'Security: SQLi, XSS, CSRF & Headers', titleEn: 'Security: SQLi, XSS, CSRF & Headers',
    codeFile: 'myproject/settings.py',
    files: {
      'manage.py': MANAGE_PY,
      'myproject/__init__.py': '',
      'myproject/settings.py': `import os

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
X_FRAME_OPTIONS = 'DENY'`,
      'myproject/urls.py': `from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('katalog.urls')),
]`,
      'myproject/wsgi.py': `import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
application = get_wsgi_application()`,
      'katalog/__init__.py': '',
      'katalog/apps.py': `from django.apps import AppConfig


class KatalogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'katalog'`,
      'katalog/models.py': `from django.db import models


class Artikel(models.Model):
    judul = models.CharField(max_length=200)
    isi = models.TextField()
    penulis = models.CharField(max_length=100)

    def __str__(self):
        return self.judul`,
      'katalog/views.py': `from django.contrib import messages
from django.shortcuts import get_object_or_404, render

from .models import Artikel


def daftar(request):
    # ORM = parameterized query: input user TIDAK PERNAH jadi SQL mentah
    artikel = Artikel.objects.all()
    kata = request.GET.get('q', '')
    if kata:
        artikel = artikel.filter(judul__icontains=kata)
    return render(request, 'katalog/daftar.html', {'artikel': artikel, 'kata': kata})


def detail(request, artikel_id):
    # {{ item.isi }} di template di-escape otomatis (anti-XSS)
    return render(request, 'katalog/detail.html', {'item': get_object_or_404(Artikel, id=artikel_id)})`,
      'katalog/urls.py': `from django.urls import path

from . import views

urlpatterns = [
    path('artikel/<int:artikel_id>/', views.detail, name='detail'),
    path('', views.daftar, name='daftar'),
]`,
      'katalog/templates/katalog/base.html': `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>{% block title %}Berita{% endblock %}</title>
  <style>
    body { font-family: system-ui; max-width: 640px; margin: 2rem auto; padding: 0 1rem; }
    .kartu { border: 1px solid #ddd; border-radius: 8px; padding: 1rem; margin-bottom: .75rem; }
  </style>
</head>
<body>
  <main>{% block konten %}{% endblock %}</main>
</body>
</html>`,
      'katalog/templates/katalog/daftar.html': `{% extends 'katalog/base.html' %}
{% block konten %}
  <h1>Berita</h1>
  <form method="get"><input name="q" placeholder="Cari judul..." /><button>Cari</button></form>
  {% for a in artikel %}
    <div class="kartu">
      <a href="{% url 'detail' a.id %}">{{ a.judul }}</a>
      <p>{{ a.isi|truncatechars:80 }}</p>
    </div>
  {% empty %}
    <p>Tidak ada.</p>
  {% endfor %}
{% endblock %}`,
      'katalog/templates/katalog/detail.html': `{% extends 'katalog/base.html' %}
{% block konten %}
  <h1>{{ item.judul }}</h1>
  <p>oleh {{ item.penulis }}</p>
  {# Autoescape ON: {{ }} selalu meng-escape HTML - anti-XSS bawaan #}
  <p>{{ item.isi }}</p>
{% endblock %}`,
      'package.json': PKG_NODE,
      'requirements.txt': 'Django>=5.2,<6.1\n',
      'README.md': `# Django Lesson 13 - Security

Jalankan: pip install -r requirements.txt && python3 manage.py migrate && python3 manage.py runserver
Coba: /?q=<script>alert(1)</script> - lihat di template: TIDAK dieksekusi (autoescape).`,
    },
    objId: [
      'Menjelaskan perlindungan bawaan Django: SQLi, XSS, CSRF',
      'Membaca hardening settings: HTTPS, HSTS, cookies',
      'Memakai ORM vs raw SQL: parameterized queries',
      'Memahami autoescape template dan CSRF token',
    ],
    objEn: [
      'Explain Django built-in protections: SQLi, XSS, CSRF',
      'Read hardening settings: HTTPS, HSTS, cookies',
      'Use the ORM vs raw SQL: parameterized queries',
      'Understand template autoescape and CSRF tokens',
    ],
    expId: `## SQL Injection: Tidak Ada di ORM
ORM mengubah filter() menjadi parameterized query: input user jadi PARAMETER, bukan string SQL. Artikel.objects.filter(judul__icontains="x' OR 1=1") tidak bisa membocorkan data - meski user mengirim SQL jahat. Aturan: JANGAN pernah concat string ke raw SQL. Kalau terpaksa raw (raw()/connection.cursor), selalu parameter: cursor.execute(sql, [nilai]).
## XSS: Autoescape Adalah Perisai
Template Django meng-escape {{ var }} secara otomatis: <script> menjadi &lt;script&gt; - input user dirender sebagai TEKS, bukan HTML. Pengecualian eksplisit: |safe, mark_safe, autoescape off - hanya untuk konten yang Anda kendalikan. Aturan: jangan pernah menandai input user sebagai safe.
## CSRF: Token yang Membuktikan Niat
POST tanpa token CSRF valid = 403. Token acak per sesi, diverifikasi middleware - form dari situs LAIN tidak bisa memalsukan aksi pengguna yang login. {% csrf_token %} di tiap form POST; untuk API, CSRFExemptView atau token dari cookie (dua sumber - keduanya wajib cocok).
## Hardening: Header & HTTPS
DEBUG=False mengaktifkan: SECURE_SSL_REDIRECT (HTTP→HTTPS), SESSION_COOKIE_SECURE + CSRF_COOKIE_SECURE (cookie hanya lewat HTTPS), HSTS (browser hanya HTTPS untuk domain ini), X_FRAME_OPTIONS DENY (anti clickjacking), X-Content-Type-Options. SECRET_KEY dari env, ALLOWED_HOSTS dibatasi (bukan '*'). Periksa dengan securityheaders.com / Mozilla Observatory.`,
    expEn: `## SQL Injection: Not in the ORM
The ORM turns filter() into parameterized queries: user input becomes a PARAMETER, never SQL text. Artikel.objects.filter(judul__icontains="x' OR 1=1") cannot leak data - even if the user sends malicious SQL. Rule: NEVER concatenate strings into raw SQL. If raw SQL is unavoidable (raw()/connection.cursor), always parameterize: cursor.execute(sql, [value]).
## XSS: Autoescape Is the Shield
Django templates escape {{ var }} automatically: <script> becomes &lt;script&gt; - user input renders as TEXT, not HTML. Explicit exceptions: |safe, mark_safe, autoescape off - only for content you control. Rule: never mark user input as safe.
## CSRF: A Token Proving Intent
A POST without a valid CSRF token = 403. A random per-session token, verified by middleware - forms from OTHER sites cannot forge actions of a logged-in user. {% csrf_token %} in every POST form; for APIs, CSRFExemptView or the cookie token (two sources - both must match).
## Hardening: Headers & HTTPS
DEBUG=False enables: SECURE_SSL_REDIRECT (HTTP→HTTPS), SESSION_COOKIE_SECURE + CSRF_COOKIE_SECURE (cookies over HTTPS only), HSTS (browser allows HTTPS-only for this domain), X_FRAME_OPTIONS DENY (anti-clickjacking), X-Content-Type-Options. SECRET_KEY from env, ALLOWED_HOSTS restricted (not '*'). Audit with securityheaders.com / Mozilla Observatory.`,
    chId: 'Audit keamanan proyek Anda: (1) pasang django-debug-toolbar dan periksa jumlah query halaman berita (N+1?), (2) tambah Referrer-Policy & Content-Security-Policy (header CSP minimal: default-src self) di settings, (3) buat form komentar publik dengan validasi + tampilkan via |linebreaksbr (escape tetap aktif), lalu uji isi <script>alert(1)</script> - harus tampil sebagai teks, (4) ganti ALLOWED_HOSTS dengan daftar domain nyata (bukan *) dan uji error 400 saat pakai host asing.',
    chEn: 'Audit your project security: (1) install django-debug-toolbar and check the query count on the news page (N+1?), (2) add a Referrer-Policy & Content-Security-Policy header (minimal CSP: default-src self) in settings, (3) build a public comment form with validation and render it via |linebreaksbr (escaping stays on), then test an isi of <script>alert(1)</script> - it must display as text, (4) replace ALLOWED_HOSTS with real domains (not *) and verify a 400 error when using a foreign host.',
    sumId: 'ORM = parameterized (anti-SQLi). Autoescape = anti-XSS. CSRF token = anti-pemalsuan. Hardening headers saat DEBUG=False. Lanjut: caching & async.',
    sumEn: 'ORM = parameterized (anti-SQLi). Autoescape = anti-XSS. CSRF tokens = anti-forgery. Hardening headers at DEBUG=False. Next: caching & async.',
  },
  {
    phase: 4, num: 14, topicId: 'caching-async',
    titleId: 'Caching, Redis & Async Views', titleEn: 'Caching, Redis & Async Views',
    codeFile: 'katalog/views.py',
    files: {
      'manage.py': MANAGE_PY,
      'myproject/__init__.py': '',
      'myproject/settings.py': `INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
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

# Cache: LokMemCache untuk dev (per proses).
# Produksi: RedisCache (django-redis) - lihat pelajaran 15.
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
    }
}`,
      'myproject/urls.py': `from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('katalog.urls')),
]`,
      'myproject/wsgi.py': `import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
application = get_wsgi_application()`,
      'katalog/__init__.py': '',
      'katalog/apps.py': `from django.apps import AppConfig


class KatalogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'katalog'`,
      'katalog/models.py': `from django.db import models


class Produk(models.Model):
    nama = models.CharField(max_length=200)
    harga = models.DecimalField(max_digits=10, decimal_places=2)
    stok = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.nama`,
      'katalog/views.py': `import asyncio

from django.core.cache import cache
from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.cache import cache_page

from .models import Produk


# cache_page: seluruh response di-cache 60 detik (per URL)
@cache_page(60)
def daftar(request):
    produk = Produk.objects.all()
    return render(request, 'katalog/daftar.html', {'produk': produk})


# Cache manual: kontrol penuh atas kunci & TTL
def statistik(request):
    key = 'statistik_produk'
    data = cache.get(key)
    if data is None:
        # MISS: hitung (mahal), lalu simpan 5 menit
        data = {
            'jumlah': Produk.objects.count(),
            'rata_rata': float(Produk.objects.aggregate(
                avg=__import__('django.db.models', fromlist=['Avg']).Avg('harga')
            )['avg'] or 0),
        }
        cache.set(key, data, 300)
    return render(request, 'katalog/statistik.html', {'data': data})


# Async view (Django 5+): await untuk I/O yang lama
async def kesehatan(request):
    # contoh: await fetch ke service lain (httpx, dsb.)
    await asyncio.sleep(0.01)
    return HttpResponse('OK')`,
      'katalog/urls.py': `from django.urls import path

from . import views

urlpatterns = [
    path('statistik/', views.statistik, name='statistik'),
    path('kesehatan/', views.kesehatan, name='kesehatan'),
    path('', views.daftar, name='daftar'),
]`,
      'katalog/templates/katalog/base.html': `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>{% block title %}Katalog{% endblock %}</title>
  <style>
    body { font-family: system-ui; max-width: 640px; margin: 2rem auto; padding: 0 1rem; }
    .kartu { border: 1px solid #ddd; border-radius: 8px; padding: 1rem; margin-bottom: .75rem; }
  </style>
</head>
<body>
  <main>{% block konten %}{% endblock %}</main>
</body>
</html>`,
      'katalog/templates/katalog/daftar.html': `{% extends 'katalog/base.html' %}
{% block konten %}
  <h1>Produk (cache 60 detik)</h1>
  <p>Waktu render: {% now 'H:i:s' %} - refresh halaman: berubah tiap 60 detik, bukan tiap request.</p>
  {% for p in produk %}
    <div class="kartu">{{ p.nama }} - Rp {{ p.harga|floatformat:0 }}</div>
  {% empty %}
    <p>Belum ada produk.</p>
  {% endfor %}
{% endblock %}`,
      'katalog/templates/katalog/statistik.html': `{% extends 'katalog/base.html' %}
{% block konten %}
  <h1>Statistik (cache manual 5 menit)</h1>
  <p>Jumlah produk: {{ data.jumlah }}</p>
  <p>Rata-rata harga: Rp {{ data.rata_rata|floatformat:0 }}</p>
{% endblock %}`,
      'package.json': PKG_NODE,
      'requirements.txt': 'Django>=5.2,<6.1\n',
      'README.md': `# Django Lesson 14 - Caching & Async

Jalankan: pip install -r requirements.txt && python3 manage.py migrate && python3 manage.py runserver
Refresh / beberapa kali - waktu render tetap sama (cache).`,
    },
    objId: [
      'Mengonfigurasi cache backend (LocMem → Redis)',
      'Menggunakan @cache_page dan cache manual (cache.get/set)',
      'Menulis async views (Django 5+)',
      'Memilih strategi cache: apa yang di-cache, kapan di-invalidasi',
    ],
    objEn: [
      'Configure cache backends (LocMem → Redis)',
      'Use @cache_page and manual caching (cache.get/set)',
      'Write async views (Django 5+)',
      'Choose a caching strategy: what to cache, when to invalidate',
    ],
    expId: `## Cache: Server Menghafal Pekerjaan
Cache menyimpan hasil yang mahal (query berat, response penuh, perhitungan) di memori dengan TTL. @cache_page(60) men-cache response view per URL selama 60 detik - query database di-skip untuk semua request dalam jendela itu. Pola cache yang umum: halaman publik read-heavy (berita, katalog), statistik, konfigurasi, rate-limit counter.
## Manual Cache: Kontrol Penuh
cache.get(key) → None saat MISS, lalu hitung + cache.set(key, data, 300). Pola read-through: cek → hitung → simpan. Kunci harus deterministik: f'statistik_{kategori_id}'. Invalidasi: cache.delete(key) setelah data berubah (buat produk baru = hapus kunci statistik). Tanpa invalidasi, pengguna melihat data basi sampai TTL habis - pilih TTL sesuai toleransi kesegaran data.
## Redis: Cache Bersama untuk Banyak Server
LocMemCache = per-proses (hilang saat restart, tidak berbagi antar server). Produksi: django-redis (RedisCache) - SATE cache + sesi + queue (Celery), diakses semua worker. Config: CACHES.default.BACKEND = django_redis.cache.RedisCache + LOCATION redis://... (pelajaran 15: Docker Redis).
## Async Views: I/O Panjang Tidak Memblokir
View biasa sinkron: request menunggu I/O (HTTP ke service lain, file besar) dengan worker terikat. async def view + await membebaskan worker untuk request lain selama menunggu - ideal untuk integrasi API dan WebSocket. Catatan: ORM tetap sinkron (sync_to_async untuk memanggilnya dari view async). Django 6 (rilis akhir 2025) membawa dukungan async yang matang - riset 2026 menyebutnya non-opsional.`,
    expEn: `## Caching: The Server Remembers Work
A cache stores expensive results (heavy queries, full responses, computations) in memory with a TTL. @cache_page(60) caches the view's response per URL for 60 seconds - database queries are skipped for every request in that window. Common cache targets: read-heavy public pages (news, catalogs), statistics, configuration, rate-limit counters.
## Manual Caching: Full Control
cache.get(key) → None on MISS, then compute + cache.set(key, data, 300). The read-through pattern: check → compute → store. Keys must be deterministic: f'statistik_{kategori_id}'. Invalidation: cache.delete(key) after data changes (creating a product = delete the stats key). Without invalidation, users see stale data until the TTL expires - pick TTLs matching your data-freshness tolerance.
## Redis: A Shared Cache for Many Servers
LocMemCache = per-process (lost on restart, not shared across servers). Production: django-redis (RedisCache) - one cache + sessions + queues (Celery), reachable from every worker. Config: CACHES.default.BACKEND = django_redis.cache.RedisCache + LOCATION redis://... (lesson 15: Docker Redis).
## Async Views: Long I/O Does Not Block
A sync view makes requests wait on I/O (HTTP to another service, big files) with the worker bound. async def view + await frees the worker for other requests while waiting - ideal for API integrations and WebSockets. Note: the ORM stays sync (sync_to_async to call it from an async view). Django 6 (late 2025 release) brings mature async support - the 2026 research calls it non-optional.`,
    chId: 'Tingkatkan performa: (1) pasang cache berbasis file (FileBasedCache) lalu Redis via Docker (redis:7-alpine + django-redis) - bandingkan keduanya, (2) tambahkan cache pada query set (qs = Produk.objects.all(); qs = qs.cache()) dengan versioning key, (3) buat halaman /flush-cache/ (staff only) yang memanggil cache.clear(), (4) tulis satu endpoint async yang memanggil https://httpbin.org/delay/1 dengan httpx.AsyncClient - bandingkan waktu dengan versi sinkron.',
    chEn: 'Level up performance: (1) switch to FileBasedCache, then Redis via Docker (redis:7-alpine + django-redis) - compare the two, (2) add queryset caching (qs = Produk.objects.all(); qs = qs.cache()) with versioned keys, (3) build a /flush-cache/ page (staff only) calling cache.clear(), (4) write one async endpoint calling https://httpbin.org/delay/1 with httpx.AsyncClient - compare timing with the sync version.',
    sumId: 'Cache = hasil mahal disimpan. @cache_page + manual + TTL + invalidasi. Redis = cache bersama. Async views untuk I/O. Lanjut: produksi.',
    sumEn: 'Caching = expensive results stored. @cache_page + manual + TTL + invalidation. Redis = shared cache. Async views for I/O. Next: production.',
  },
];

// ===== PHASE 5: PRODUCTION & CAPSTONE (lessons 15-18) =====
const LESSONS_P5 = [
  {
    phase: 5, num: 15, topicId: 'production-settings',
    titleId: 'Produksi: Settings, Env & PostgreSQL', titleEn: 'Production: Settings, Env & PostgreSQL',
    codeFile: 'myproject/settings/production.py',
    files: {
      'manage.py': MANAGE_PY,
      'myproject/__init__.py': '',
      'myproject/settings/__init__.py': `from .production import *  # default untuk StackBlitz
# Lokal: import .local (buat file local.py) untuk menimpa`,
      'myproject/settings/base.py': `import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

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

WSGI_APPLICATION = 'myproject.wsgi.application'

STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'`,
      'myproject/settings/development.py': `from .base import *  # noqa

DEBUG = True
ALLOWED_HOSTS = ['*']
SECRET_KEY = 'kunci-rahasia-dev'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}`,
      'myproject/settings/production.py': `import os

from .base import *  # noqa

# Sekali masuk ke produksi: semua dari environment
SECRET_KEY = os.environ['DJANGO_SECRET_KEY']  # crash cepat jika tidak ada
DEBUG = False
ALLOWED_HOSTS = os.environ.get('DJANGO_ALLOWED_HOSTS', '').split(',')

# PostgreSQL: production standard (bukan SQLite!)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('POSTGRES_DB', 'tryngo'),
        'USER': os.environ.get('POSTGRES_USER', 'tryngo'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD', ''),
        'HOST': os.environ.get('POSTGRES_HOST', 'db'),
        'PORT': os.environ.get('POSTGRES_PORT', '5432'),
        # Koneksi pool: koneksi DB dipakai ulang (performa)
        'CONN_MAX_AGE': 600,
    }
}

# Security hardening (dari pelajaran 13)
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_REFERRER_POLICY = 'same-origin'
X_FRAME_OPTIONS = 'DENY'

# Redis cache + sesi (django-redis) - cache bersama antar worker
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': os.environ.get('REDIS_URL', 'redis://redis:6379/1'),
        'OPTIONS': {'CLIENT_CLASS': 'django_redis.client.DefaultClient'},
    }
}`,
      'myproject/urls.py': `from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('katalog.urls')),
]`,
      'myproject/wsgi.py': `import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings.production')
application = get_wsgi_application()`,
      'myproject/asgi.py': `import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings.production')
application = get_asgi_application()`,
      'katalog/__init__.py': '',
      'katalog/apps.py': `from django.apps import AppConfig


class KatalogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'katalog'`,
      'katalog/models.py': `from django.db import models


class Produk(models.Model):
    nama = models.CharField(max_length=200)
    harga = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.nama`,
      'katalog/views.py': `from django.shortcuts import render

from .models import Produk


def daftar(request):
    return render(request, 'katalog/daftar.html', {'produk': Produk.objects.all()})`,
      'katalog/urls.py': `from django.urls import path

from . import views

urlpatterns = [
    path('', views.daftar, name='daftar'),
]`,
      'katalog/templates/katalog/daftar.html': `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>Katalog</title>
  <style>body { font-family: system-ui; max-width: 640px; margin: 2rem auto; padding: 0 1rem; }</style>
</head>
<body>
  <h1>Produk</h1>
  {% for p in produk %}<p>{{ p.nama }} - Rp {{ p.harga|floatformat:0 }}</p>{% empty %}
  <p>Belum ada produk.</p>{% endfor %}
</body>
</html>`,
      '.env.example': `DJANGO_SECRET_KEY=ganti-dengan-nilai-acak-50-karakter
DJANGO_DEBUG=false
DJANGO_ALLOWED_HOSTS=tryngo.com,www.tryngo.com
POSTGRES_DB=tryngo
POSTGRES_USER=tryngo
POSTGRES_PASSWORD=ganti-password
POSTGRES_HOST=db
REDIS_URL=redis://redis:6379/1`,
      'requirements.txt': REQ_DJANGO(['psycopg[binary]>=3.2', 'django-redis>=5.4']),
      'package.json': `{
  "name": "django-lesson-prod",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "pip install -r requirements.txt && python3 manage.py migrate --settings=myproject.settings.development && python3 manage.py runserver --settings=myproject.settings.development"
  }
}`,
      'README.md': `# Django Lesson 15 - Production Settings & PostgreSQL

Pengaturan dibagi: base.py (bersama) + development.py + production.py.
Pilih via --settings atau DJANGO_SETTINGS_MODULE.`,
    },
    objId: [
      'Memisahkan settings: base, development, production',
      'Membaca konfigurasi dari environment (env vars)',
      'Menjalankan PostgreSQL (bukan SQLite) di produksi',
      'Menggunakan Redis untuk cache & sesi bersama',
    ],
    objEn: [
      'Split settings: base, development, production',
      'Read configuration from environment variables',
      'Run PostgreSQL (not SQLite) in production',
      'Use Redis for shared cache & sessions',
    ],
    expId: `## Tiga File Settings: Satu Logika, Tiga Lingkungan
base.py = semua yang sama (apps, middleware, templates). development.py = DEBUG=True, SQLite, SECRET_KEY dummy. production.py = env-driven, PostgreSQL, hardening. Pilih dengan --settings=... atau DJANGO_SETTINGS_MODULE. Aturan: tidak ada nilai produksi di git - kecuali .env.example (template tanpa rahasia).
## Env Vars: Bahasa Lingkungan
SECRET_KEY, DB credentials, ALLOWED_HOSTS, REDIS_URL - semuanya dari environment, dibaca dengan os.environ['KEY'] (crash cepat jika hilang - lebih baik gagal saat start daripada diam-diam berjalan tanpa secret). Platform PaaS/CI menyuntikkan env ini; di lokal, tools seperti django-environ atau dotenv membaca .env.
## PostgreSQL: Database Produksi yang Sebenarnya
SQLite = file, satu pengguna, mudah dibawa - untuk belajar. Produksi: PostgreSQL - multi-user, concurrent, indexing kuat, JSONB, dll. ENGINE='django.db.backends.postgresql' + kredensial dari env. CONN_MAX_AGE = 600: koneksi DB dipakai ulang, hemat handshake. Migration yang sama (makemigrations/migrate) berlaku untuk keduanya - ORM menyembunyikan perbedaan.
## Redis: Cache + Sesi yang Dibagikan
Sesi Django default = tabel database (bisa jadi bottleneck multi-request). Django-Redis memindahkan cache (dan sesi via SESSION_ENGINE='django.contrib.sessions.backends.cache') ke satu Redis - semua worker berbagi. Satu infrastruktur, tiga peran: cache, sesi, queue (Celery di pelajaran berikutnya).`,
    expEn: `## Three Settings Files: One Logic, Three Environments
base.py = everything shared (apps, middleware, templates). development.py = DEBUG=True, SQLite, a dummy SECRET_KEY. production.py = env-driven, PostgreSQL, hardening. Select with --settings=... or DJANGO_SETTINGS_MODULE. Rule: no production values in git - except .env.example (a template without secrets).
## Env Vars: The Language of Environments
SECRET_KEY, DB credentials, ALLOWED_HOSTS, REDIS_URL - all from the environment, read with os.environ['KEY'] (fail fast if missing - better to crash at startup than silently run without a secret). PaaS/CI platforms inject these; locally, tools like django-environ or dotenv read .env.
## PostgreSQL: The Real Production Database
SQLite = a file, single user, easy to carry - for learning. Production: PostgreSQL - multi-user, concurrent, strong indexing, JSONB, etc. ENGINE='django.db.backends.postgresql' + credentials from env. CONN_MAX_AGE = 600: DB connections are reused, saving handshakes. The same migrations (makemigrations/migrate) work on both - the ORM hides the difference.
## Redis: Shared Cache + Sessions
The default Django session store = a database table (a potential bottleneck under many requests). Django-Redis moves the cache (and sessions via SESSION_ENGINE='django.contrib.sessions.backends.cache') into one Redis - every worker shares it. One piece of infrastructure, three roles: cache, sessions, queue (Celery in later lessons).`,
    chId: 'Siapkan produksi nyata: (1) buat docker-compose.yml dengan api (build .), db (postgres:16-alpine + healthcheck), redis (redis:7-alpine), (2) pindahkan collectstatic: STATIC_ROOT + perintah di Dockerfile, (3) uji koneksi PostgreSQL: buat user/db, jalankan migrate dengan settings production, (4) tulis runbook deploy manual: env vars → migrate → collectstatic → gunicorn → verifikasi /health.',
    chEn: 'Prepare real production: (1) write a docker-compose.yml with api (build .), db (postgres:16-alpine + healthcheck), redis (redis:7-alpine), (2) move collectstatic: STATIC_ROOT + the command in the Dockerfile, (3) test the PostgreSQL connection: create user/db, run migrate with production settings, (4) write a manual deploy runbook: env vars → migrate → collectstatic → gunicorn → verify /health.',
    sumId: '3 file settings. Env vars = satu-satunya sumber config produksi. PostgreSQL + Redis. Crash cepat tanpa secret. Lanjut: Docker & Gunicorn.',
    sumEn: '3 settings files. Env vars = the only production config source. PostgreSQL + Redis. Fail fast without secrets. Next: Docker & Gunicorn.',
  },
  {
    phase: 5, num: 16, topicId: 'docker-gunicorn',
    titleId: 'Docker, Gunicorn & Nginx', titleEn: 'Docker, Gunicorn & Nginx',
    codeFile: 'Dockerfile',
    files: {
      'Dockerfile': `# Stage 1: build (toolchain lengkap)
FROM python:3.12-slim AS build
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
COPY requirements.txt .
RUN pip install --prefix=/install -r requirements.txt

# Stage 2: runtime - image minimal, hanya dependency + kode
FROM python:3.12-slim
WORKDIR /app
COPY --from=build /install /usr/local
COPY . .
RUN mkdir -p staticfiles

EXPOSE 8000
# Gunicorn: WSGI server produksi (bukan runserver!)
CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py collectstatic --noinput && gunicorn myproject.wsgi:application --bind 0.0.0.0:8000 --workers 3"]`,
      'docker-compose.yml': `services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      DJANGO_SECRET_KEY: \${DJANGO_SECRET_KEY}
      DJANGO_DEBUG: "false"
      DJANGO_ALLOWED_HOSTS: localhost,127.0.0.1
      POSTGRES_DB: tryngo
      POSTGRES_USER: tryngo
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD}
      POSTGRES_HOST: db
      REDIS_URL: redis://redis:6379/1
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: tryngo
      POSTGRES_USER: tryngo
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD}
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U tryngo"]
      interval: 5s
      timeout: 3s
      retries: 5
    volumes:
      - db-data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5

  nginx:
    image: nginx:1.27-alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - static-files:/static
    depends_on:
      - api

volumes:
  db-data:
  static-files:`,
      'nginx.conf': `# Nginx: reverse proxy + pelayan static files
server {
    listen 80;

    # Static files dari volume (hasil collectstatic)
    location /static/ {
        alias /static/;
    }

    # Semua request lain diteruskan ke Gunicorn
    location / {
        proxy_pass http://api:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`,
      '.dockerignore': `__pycache__
*.pyc
db.sqlite3
.env
staticfiles
.git`,
      '.env.example': `DJANGO_SECRET_KEY=ganti-dengan-nilai-acak-50-karakter
POSTGRES_PASSWORD=ganti-password`,
      'requirements.txt': REQ_DJANGO(['psycopg[binary]>=3.2', 'django-redis>=5.4', 'gunicorn>=23.0']),
      'myproject/settings.py': `# Ringkas untuk demo produksi (dari pelajaran 15 pakai file terpisah)
import os

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'kunci-rahasia-dev')
DEBUG = os.environ.get('DJANGO_DEBUG', 'false').lower() == 'true'
ALLOWED_HOSTS = os.environ.get('DJANGO_ALLOWED_HOSTS', '*').split(',')

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
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('POSTGRES_DB', 'tryngo'),
        'USER': os.environ.get('POSTGRES_USER', 'tryngo'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD', ''),
        'HOST': os.environ.get('POSTGRES_HOST', 'db'),
        'PORT': '5432',
    }
}

STATIC_URL = 'static/'
STATIC_ROOT = '/static'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'`,
      'myproject/urls.py': `from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('katalog.urls')),
]`,
      'myproject/wsgi.py': `import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
application = get_wsgi_application()`,
      'katalog/__init__.py': '',
      'katalog/apps.py': `from django.apps import AppConfig


class KatalogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'katalog'`,
      'katalog/models.py': `from django.db import models


class Produk(models.Model):
    nama = models.CharField(max_length=200)
    harga = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.nama`,
      'katalog/views.py': `from django.http import JsonResponse
from django.shortcuts import render

from .models import Produk


def daftar(request):
    return render(request, 'katalog/daftar.html', {'produk': Produk.objects.all()})


def health(request):
    # Healthcheck untuk orkestrator (compose/Docker)
    return JsonResponse({'status': 'ok'})`,
      'katalog/urls.py': `from django.urls import path

from . import views

urlpatterns = [
    path('health/', views.health, name='health'),
    path('', views.daftar, name='daftar'),
]`,
      'katalog/templates/katalog/daftar.html': `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>Katalog</title>
  <style>body { font-family: system-ui; max-width: 640px; margin: 2rem auto; padding: 0 1rem; }</style>
</head>
<body>
  <h1>Produk</h1>
  {% for p in produk %}<p>{{ p.nama }} - Rp {{ p.harga|floatformat:0 }}</p>{% empty %}
  <p>Belum ada produk.</p>{% endfor %}
</body>
</html>`,
      'package.json': `{
  "name": "django-lesson-docker",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "pip install -r requirements.txt && python3 manage.py migrate && python3 manage.py runserver"
  }
}`,
      'README.md': `# Django Lesson 16 - Docker, Gunicorn & Nginx

docker compose up -d --build
Buka http://localhost - Nginx → Gunicorn → Django → PostgreSQL/Redis.`,
    },
    objId: [
      'Menulis Dockerfile multi-stage untuk Django',
      'Menjalankan Gunicorn sebagai WSGI server produksi',
      'Menyusun stack: nginx + api + db + redis (compose)',
      'Memahami peran collectstatic & healthcheck',
    ],
    objEn: [
      'Write a multi-stage Dockerfile for Django',
      'Run Gunicorn as the production WSGI server',
      'Compose a stack: nginx + api + db + redis (compose)',
      'Understand the roles of collectstatic & healthchecks',
    ],
    expId: `## Gunicorn: Bukan runserver
python manage.py runserver = server development (auto-reload, tidak untuk produksi: lambat, satu worker, tidak teruji). Gunicorn = WSGI production server: multi-worker (--workers 3), preloading, timeout, graceful restart. gunicorn myproject.wsgi:application memuat WSGI application. Aturan produksi: Gunicorn di belakang reverse proxy, DENGAN HTTPS.
## Dockerfile Multi-Stage: Kecil & Aman
Stage build: python:3.12-slim + pip install (toolchain penuh). Stage runtime: base yang sama TAPI hanya menyalin dependency terpasang (--prefix=/install) + kode. Hasil: image tanpa cache pip, tanpa source build, lebih kecil dan lebih aman. CMD menjalankan: migrate --noinput → collectstatic --noinput → gunicorn. Semua di container = lingkungan produksi identik di mana pun.
## Nginx: Reverse Proxy & Static Files
Django TIDAK melayani static files di produksi. Nginx: /static/ dari volume (hasil collectstatic), sisanya proxy_pass ke Gunicorn (api:8000) + header X-Forwarded-*. Satu pintu masuk (80), tiga lapisan di belakangnya - pola produksi standar Django.
## Compose: Satu Perintah, Empat Service
docker compose up -d --build menjalankan api + db + redis + nginx dengan jaringan otomatis. depends_on + healthcheck: db siap (pg_isready) dan redis siap (redis-cli ping) SEBELUM api start. Volume db-data = data bertahan; static-files = hasil collectstatic dibagi api & nginx. Ini stack yang sama dengan produksi nyata.`,
    expEn: `## Gunicorn: Not runserver
python manage.py runserver = the dev server (auto-reload, not for production: slow, single worker, untested). Gunicorn = the production WSGI server: multi-worker (--workers 3), preloading, timeouts, graceful restart. gunicorn myproject.wsgi:application loads the WSGI application. Production rule: Gunicorn behind a reverse proxy, WITH HTTPS.
## Multi-Stage Dockerfile: Small & Safe
Build stage: python:3.12-slim + pip install (full toolchain). Runtime stage: the same base BUT only copying installed deps (--prefix=/install) + code. Result: an image without pip caches or build sources - smaller and safer. CMD runs: migrate --noinput → collectstatic --noinput → gunicorn. Everything in a container = an identical production environment everywhere.
## Nginx: Reverse Proxy & Static Files
Django does NOT serve static files in production. Nginx: /static/ from the volume (collectstatic output), everything else proxy_pass to Gunicorn (api:8000) + X-Forwarded-* headers. One entry point (80), three layers behind it - the standard Django production pattern.
## Compose: One Command, Four Services
docker compose up -d --build runs api + db + redis + nginx with automatic networking. depends_on + healthchecks: db ready (pg_isready) and redis ready (redis-cli ping) BEFORE the api starts. The db-data volume = surviving data; static-files = collectstatic output shared by api & nginx. This is the same stack as real production.`,
    chId: 'Perkuat stack: (1) tambah endpoint /health/ dengan pengecekan DB (connection.ensure_connection) dan Redis (cache.get) - return 200/503, (2) tambah healthcheck api di compose: wget -qO- http://api:8000/health/ dengan retries, (3) multi-stage tambahan: stage nginx menyalin staticfiles ke image nginx (copy --from=api), (4) tambah gunicorn timeout & log level di CMD, lalu uji restart worker (SIGTERM) tidak memutus request aktif.',
    chEn: 'Strengthen the stack: (1) add a /health/ endpoint checking the DB (connection.ensure_connection) and Redis (cache.get) - return 200/503, (2) add an api healthcheck in compose: wget -qO- http://api:8000/health/ with retries, (3) an extra stage: an nginx stage copying staticfiles into the nginx image (copy --from=api), (4) add gunicorn timeout & log levels to CMD, then test that a worker restart (SIGTERM) does not cut active requests.',
    sumId: 'Gunicorn = WSGI produksi. Multi-stage = image kecil. Nginx = proxy + static. Compose = 4 service satu perintah. Lanjut: CI/CD.',
    sumEn: 'Gunicorn = the production WSGI. Multi-stage = small images. Nginx = proxy + static. Compose = 4 services, one command. Next: CI/CD.',
  },
  {
    phase: 5, num: 17, topicId: 'cicd-deploy',
    titleId: 'CI/CD & Deployment', titleEn: 'CI/CD & Deployment',
    codeFile: '.github/workflows/ci.yml',
    files: {
      '.github/workflows/ci.yml': `name: CI

on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_DB: tryngo_test
          POSTGRES_USER: tryngo
          POSTGRES_PASSWORD: rahasia
        ports:
          - 5432:5432
        options: >-
          --health-cmd "pg_isready -U tryngo"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    env:
      DJANGO_SETTINGS_MODULE: myproject.settings.test
      POSTGRES_DB: tryngo_test
      POSTGRES_USER: tryngo
      POSTGRES_PASSWORD: rahasia
      POSTGRES_HOST: 127.0.0.1
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: pip
      - run: pip install -r requirements.txt
      - run: python manage.py migrate --noinput
      - run: python manage.py test
      - run: python manage.py check --deploy
      # Build image + push ke registry (CD dimulai dari sini)
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v6
        with:
          push: true
          tags: ghcr.io/\${{ github.repository }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max`,
      'myproject/settings/test.py': `# Settings khusus test: PostgreSQL test DB + DEBUG False
from .development import *  # noqa

DEBUG = False
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ['POSTGRES_DB'],
        'USER': os.environ['POSTGRES_USER'],
        'PASSWORD': os.environ['POSTGRES_PASSWORD'],
        'HOST': os.environ['POSTGRES_HOST'],
        'PORT': '5432',
    }
}`,
      'requirements.txt': REQ_DJANGO(['psycopg[binary]>=3.2']),
      'manage.py': MANAGE_PY,
      'myproject/settings/__init__.py': `# Dev default
from .development import *`,
      'myproject/settings/base.py': `import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

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
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
SECRET_KEY = 'kunci-rahasia-dev'
DEBUG = True
ALLOWED_HOSTS = ['*']`,
      'myproject/settings/development.py': `from .base import *  # noqa`,
      'myproject/urls.py': `from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('katalog.urls')),
]`,
      'myproject/wsgi.py': `import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
application = get_wsgi_application()`,
      'katalog/__init__.py': '',
      'katalog/apps.py': `from django.apps import AppConfig


class KatalogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'katalog'`,
      'katalog/models.py': `from django.db import models


class Produk(models.Model):
    nama = models.CharField(max_length=200)
    harga = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.nama`,
      'katalog/views.py': `from django.http import JsonResponse
from django.shortcuts import render

from .models import Produk


def daftar(request):
    return render(request, 'katalog/daftar.html', {'produk': Produk.objects.all()})


def health(request):
    return JsonResponse({'status': 'ok'})`,
      'katalog/urls.py': `from django.urls import path

from . import views

urlpatterns = [
    path('health/', views.health, name='health'),
    path('', views.daftar, name='daftar'),
]`,
      'katalog/templates/katalog/daftar.html': `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>Katalog</title>
  <style>body { font-family: system-ui; max-width: 640px; margin: 2rem auto; padding: 0 1rem; }</style>
</head>
<body>
  <h1>Produk</h1>
  {% for p in produk %}<p>{{ p.nama }} - Rp {{ p.harga|floatformat:0 }}</p>{% empty %}
  <p>Belum ada produk.</p>{% endfor %}
</body>
</html>`,
      'package.json': `{
  "name": "django-lesson-cicd",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "pip install -r requirements.txt && python3 manage.py migrate && python3 manage.py runserver"
  }
}`,
      'README.md': `# Django Lesson 17 - CI/CD

Workflow GitHub Actions: test di PostgreSQL nyata + python manage.py check --deploy + build & push image.`,
    },
    objId: [
      'Menulis workflow GitHub Actions untuk Django',
      'Menjalankan test di PostgreSQL nyata (services)',
      'Menggunakan manage.py check --deploy untuk audit',
      'Build & push image Docker ke registry (GHCR)',
    ],
    objEn: [
      'Write a GitHub Actions workflow for Django',
      'Run tests against real PostgreSQL (services)',
      'Use manage.py check --deploy for auditing',
      'Build & push Docker images to a registry (GHCR)',
    ],
    expId: `## CI: Reviewer yang Tidak Pernah Lelah
Setiap push ke git → workflow dijalankan: pip install → migrate → test → check --deploy. Build rusak atau test merah = alur berhenti, kode tidak pernah sampai produksi. Ini melindungi tim: kesalahan ditemukan dalam menit, bukan setelah insiden. Workflow yang sama yang Anda jalankan lokal, dijalankan di lingkungan yang sama persis untuk semua orang.
## Services: Test Melawan Database Nyata
Django test default memakai SQLite - berbeda dari produksi (PostgreSQL). GitHub Actions services: menjalankan postgres:16-alpine SEBAGAI container pendamping dengan healthcheck - test dijalankan melawan PostgreSQL SUNGGAH (settings/test.py dengan env). Bug yang hanya muncul di PostgreSQL tertangkap SEBELUM produksi. Ini praktik 2026: "test on what you ship on".
## check --deploy: Audit Satu Perintah
python manage.py check --deploy memeriksa settings produksi: SECRET_KEY tidak aman, DEBUG=True, ALLOWED_HOSTS kosong, header keamanan mati - semua terdeteksi dengan peringatan jelas. Masukkan ke CI: audit otomatis tiap push, bukan checklist manual yang mudah terlupakan. Gabungkan dengan test = dua pintu gerbang sebelum deploy.
## CD: Dari Image ke Produksi
Setelah test hijau: buildx build + push image ke GHCR (ghcr.io/<user>/<repo>:latest) dengan cache lapisan (type=gha). Produksi menarik image yang SAMA yang diuji - tidak ada "di laptop saya jalan". Deploy target: PaaS (Render/Railway/Fly menarik image), VPS (docker compose pull + up), atau K8s. Image + tag = artefak yang bisa di-audit dan di-rollback.`,
    expEn: `## CI: The Reviewer That Never Tires
Every push to git → the workflow runs: pip install → migrate → test → check --deploy. A broken build or a red test = the flow stops, code never reaches production. This protects the team: mistakes surface in minutes, not after incidents. The same workflow you run locally runs in the exact same environment for everyone.
## Services: Testing Against a Real Database
The Django test default uses SQLite - different from production (PostgreSQL). GitHub Actions services: run postgres:16-alpine AS a sidecar container with a healthcheck - tests run against REAL PostgreSQL (settings/test.py with env). Bugs that only appear on PostgreSQL are caught BEFORE production. This is the 2026 practice: "test on what you ship on".
## check --deploy: One-Command Audit
python manage.py check --deploy inspects production settings: insecure SECRET_KEY, DEBUG=True, empty ALLOWED_HOSTS, disabled security headers - all detected with clear warnings. Put it in CI: an automatic audit on every push, not an easily-forgotten manual checklist. Combined with tests = two gates before deploying.
## CD: From Image to Production
After green tests: buildx build + push the image to GHCR (ghcr.io/<user>/<repo>:latest) with layer caching (type=gha). Production pulls the SAME image that was tested - no more "it works on my laptop". Deploy targets: PaaS (Render/Railway/Fly pulling images), a VPS (docker compose pull + up), or K8s. Images + tags = auditable, rollbackable artifacts.`,
    chId: 'Selesaikan pipeline: (1) tambah branch protection: workflow hanya jalan di push ke main, (2) tambah job deploy terpisah (needs: test) yang menarik image di server VPS via SSH (atau tulis rencana deploy Render/Railway), (3) tambah caching pip di workflow (actions/cache atau setup-python cache) dan ukur percepatannya, (4) tulis POST-MORTEM singkat: buat bug sengaja (test gagal), dorong, dokumentasikan alur merah → hijau.',
    chEn: 'Finish the pipeline: (1) add branch protection: the workflow runs only on pushes to main, (2) add a separate deploy job (needs: test) pulling the image on a VPS server via SSH (or write a Render/Railway deployment plan), (3) add pip caching to the workflow (actions/cache or setup-python cache) and measure the speedup, (4) write a short POST-MORTEM: introduce a deliberate bug (failing test), push, document the red → green flow.',
    sumId: 'CI = test + audit tiap push. Services = DB nyata. check --deploy = audit otomatis. CD = image yang sama ke produksi. Lanjut: capstone.',
    sumEn: 'CI = test + audit on every push. Services = real DBs. check --deploy = automatic audit. CD = the same image to production. Next: capstone.',
  },
  {
    phase: 5, num: 18, topicId: 'capstone',
    titleId: 'Capstone: Blog API + Admin', titleEn: 'Capstone: Blog API + Admin',
    codeFile: 'blog/api/views.py',
    files: {
      'manage.py': MANAGE_PY,
      'myproject/__init__.py': '',
      'myproject/settings.py': `from datetime import timedelta

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'django_filters',
    'rest_framework_simplejwt',
    'blog',
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

# DRF + JWT: seluruh API capstone memakai pola pelajaran 11
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
}`,
      'myproject/urls.py': `from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include('blog.api_urls')),
]`,
      'myproject/wsgi.py': `import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
application = get_wsgi_application()`,
      'blog/__init__.py': '',
      'blog/apps.py': `from django.apps import AppConfig


class BlogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'blog'`,
      'blog/models.py': `from django.contrib.auth.models import User
from django.db import models


class Artikel(models.Model):
    judul = models.CharField(max_length=200)
    isi = models.TextField()
    status = models.CharField(
        max_length=10,
        choices=[('draft', 'Draft'), ('terbit', 'Terbit')],
        default='draft',
    )
    # pemilik: dipakai permission IsOwnerOrReadOnly
    pemilik = models.ForeignKey(User, on_delete=models.CASCADE, related_name='artikel')
    dibuat = models.DateTimeField(auto_now_add=True)
    diupdate = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-dibuat']

    def __str__(self):
        return self.judul`,
      'blog/admin.py': `from django.contrib import admin

from .models import Artikel


@admin.register(Artikel)
class ArtikelAdmin(admin.ModelAdmin):
    list_display = ('judul', 'status', 'pemilik', 'dibuat')
    list_filter = ('status', 'pemilik')
    search_fields = ('judul', 'isi')`,
      'blog/permissions.py': `from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """Baca boleh semua; ubah/hapus hanya pemilik."""

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.pemilik == request.user`,
      'blog/serializers.py': `from rest_framework import serializers

from .models import Artikel


class ArtikelSerializer(serializers.ModelSerializer):
    # pemilik terisi OTOMATIS dari user yang login
    pemilik_username = serializers.CharField(source='pemilik.username', read_only=True)

    class Meta:
        model = Artikel
        fields = ['id', 'judul', 'isi', 'status', 'pemilik', 'pemilik_username', 'dibuat', 'diupdate']
        read_only_fields = ['pemilik']`,
      'blog/api/views.py': `from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from ..models import Artikel
from ..permissions import IsOwnerOrReadOnly
from ..serializers import ArtikelSerializer


class ArtikelViewSet(viewsets.ModelViewSet):
    queryset = Artikel.objects.select_related('pemilik').all()
    serializer_class = ArtikelSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    filterset_fields = ['status', 'pemilik']
    search_fields = ['judul', 'isi']
    ordering_fields = ['dibuat', 'diupdate', 'judul']

    def perform_create(self, serializer):
        # pemilik di-set dari request.user - TIDAK bisa dipalsukan client
        serializer.save(pemilik=self.request.user)

    def get_queryset(self):
        # Filter default: hanya terbit untuk pengunjung
        qs = super().get_queryset()
        user = self.request.user
        if not user.is_authenticated:
            qs = qs.filter(status='terbit')
        return qs`,
      'blog/api_urls.py': `from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .api.views import ArtikelViewSet

router = DefaultRouter()
router.register('artikel', ArtikelViewSet, basename='artikel')

urlpatterns = [
    path('', include(router.urls)),
]`,
      'blog/tests.py': `from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Artikel


class ArtikelApiTestCase(APITestCase):
    def setUp(self):
        self.penulis = User.objects.create_user(
            username='penulis', password='rahasia123',
        )
        self.lain = User.objects.create_user(
            username='lain', password='rahasia123',
        )

    def test_buat_artikel_butuh_login(self):
        response = self.client.post('/api/artikel/', {
            'judul': 'Tanpa login', 'isi': 'x',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_pemilik_terisi_otomatis(self):
        self.client.force_authenticate(self.penulis)
        response = self.client.post('/api/artikel/', {
            'judul': 'Dari penulis', 'isi': 'x', 'status': 'draft',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        artikel = Artikel.objects.get()
        self.assertEqual(artikel.pemilik, self.penulis)

    def test_non_pemilik_tidak_bisa_ubah(self):
        artikel = Artikel.objects.create(
            judul='Punya penulis', isi='x', pemilik=self.penulis,
        )
        self.client.force_authenticate(self.lain)
        response = self.client.patch(f'/api/artikel/{artikel.id}/', {
            'judul': 'Diretas',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)`,
      'package.json': `{
  "name": "django-lesson-capstone",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "pip install -r requirements.txt && python3 manage.py migrate && python3 manage.py runserver"
  }
}`,
      'requirements.txt': REQ_DJANGO(['django-filter>=24.3', 'djangorestframework-simplejwt>=5.4.0']),
      'README.md': `# Django Capstone - Blog API + Admin

Fitur:
- CRUD Artikel via /api/artikel/ (JWT, permissions per pemilik)
- Filter status/pemilik, search, ordering, pagination
- Admin /admin untuk kelola artikel
- Test: APITestCase untuk auth & ownership

Coba: POST /api/token/ (username: penulis, password: rahasia123).`,
    },
    objId: [
      'Menggabungkan SEMUA konsep track dalam satu proyek',
      'Membuat API dengan JWT + ownership permissions',
      'Menjaga data per-user lewat perform_create & get_queryset',
      'Menutup proyek: test, README, deployment',
    ],
    objEn: [
      'Combine ALL track concepts in one project',
      'Build an API with JWT + ownership permissions',
      'Enforce per-user data via perform_create & get_queryset',
      'Close the project: tests, README, deployment',
    ],
    expId: `## Capstone: Semua Pelajaran Menjadi Satu Proyek
Blog API ini merangkum: models & migrations (Artikel + FK User) → admin (kelola cepat) → DRF serializers (JSON dua arah) → viewsets & routers (CRUD + URL otomatis) → JWT (login/refresh) → permissions (ownership) → filtering/search/pagination → testing (APITestCase) → siap production (settings + Docker dari pelajaran 15-17). Jika Anda bisa menjelaskan setiap file tanpa catatan, Anda menguasai track.
## Ownership: Keamanan di Tiga Lapis
1) perform_create: pemilik DIAMBIL dari request.user - client tidak bisa memalsukan. 2) get_queryset: pengunjung hanya melihat status='terbit'. 3) IsOwnerOrReadOnly (has_object_permission): hanya pemilik yang mengubah/menghapus objeknya. Tiga lapis independen - satu gagal, dua lainnya tetap melindungi. Pola yang sama di semua track: aturan di backend, bukan di UI.
## IsAuthenticatedOrReadOnly: API Publik yang Aman
Baca (GET) boleh tanpa login - untuk pengunjung/blog publik. Menulis butuh token. Kombinasi dengan IsOwnerOrReadOnly = pola REST API blog standar. JWT memberi identitas (request.user dari token), permissions memberi wewenang - dipasang berlapis, dievaluasi berurutan.
## Menutup Proyek Seperti Profesional
Yang membedakan lulusan bootcamp: (1) test yang menutup alur kritis (401 tanpa token, pemilik otomatis, 403 non-pemilik), (2) README: cara run, env, endpoint, contoh curl, (3) deployment (Render/Railway/Fly + PostgreSQL + Redis), (4) pipeline CI. Satu proyek selesai dan ter-deploy > lima proyek setengah jadi.`,
    expEn: `## The Capstone: All Lessons Become One Project
This Blog API sums up: models & migrations (Artikel + FK User) → admin (fast management) → DRF serializers (two-way JSON) → viewsets & routers (CRUD + automatic URLs) → JWT (login/refresh) → permissions (ownership) → filtering/search/pagination → testing (APITestCase) → production-ready (settings + Docker from lessons 15-17). If you can explain every file without notes, you own the track.
## Ownership: Security in Three Layers
1) perform_create: the owner is TAKEN from request.user - clients cannot forge it. 2) get_queryset: visitors only see status='terbit'. 3) IsOwnerOrReadOnly (has_object_permission): only owners modify/delete their objects. Three independent layers - if one fails, the other two still protect. The same pattern across all tracks: rules in the backend, not the UI.
## IsAuthenticatedOrReadOnly: A Public API That Is Safe
Reads (GET) work without login - for visitors/public blogs. Writes need a token. Combined with IsOwnerOrReadOnly = the standard REST blog API pattern. JWT provides identity (request.user from the token), permissions provide authority - stacked, evaluated in order.
## Closing the Project Like a Professional
What separates bootcamp graduates: (1) tests covering critical flows (401 without token, automatic ownership, 403 for non-owners), (2) a README: how to run, env, endpoints, curl examples, (3) deployment (Render/Railway/Fly + PostgreSQL + Redis), (4) a CI pipeline. One finished, deployed project > five half-finished ones.`,
    chId: 'Bawa capstone ke level produksi: (1) tambah endpoint /api/artikel/statistik (custom action) dengan jumlah per status, (2) tambah komentar: model Komentar (artikel FK, isi, penulis, dibuat) + serializer + endpoint CRUD dengan permission yang sama, (3) tulis 5 test tambahan: komentar non-pemilik ditolak, filter status, search judul, pagination, refresh token berhasil, (4) deploy ke platform gratis (Render/Railway + PostgreSQL + Redis) dan bagikan URL-nya.',
    chEn: 'Take the capstone to production level: (1) add a /api/artikel/statistik custom action with per-status counts, (2) add comments: a Komentar model (artikel FK, isi, penulis, dibuat) + serializer + CRUD endpoints with the same permissions, (3) write 5 more tests: non-owner comments rejected, status filter, title search, pagination, refresh token success, (4) deploy to a free platform (Render/Railway + PostgreSQL + Redis) and share the URL.',
    sumId: 'Capstone merangkum: models → admin → DRF → JWT → permissions → test. Ownership 3 lapis. API publik yang aman. Anda siap Django!',
    sumEn: 'The capstone ties it together: models → admin → DRF → JWT → permissions → tests. Three-layer ownership. A safe public API. You are Django-ready!',
  },
];

const LESSONS = [...LESSONS_P1, ...LESSONS_P2, ...LESSONS_P3, ...LESSONS_P4, ...LESSONS_P5];

// ===== GENERATE =====
for (const lesson of LESSONS) {
  const phase = PHASES.find((p) => p.phase === lesson.phase);
  const levelDir = phase.id;
  const mdDir = path.join(BASE_DIR, levelDir);

  const objListId = lesson.objId.map((o) => `- ${o}`).join('\n');
  const objListEn = lesson.objEn.map((o) => `- ${o}`).join('\n');

  for (const lang of ['id', 'en']) {
    const isId = lang === 'id';
    const title = isId ? lesson.titleId : lesson.titleEn;
    const phaseName = isId ? phase.nameId : phase.nameEn;
    const objList = isId ? objListId : objListEn;
    const exp = isId ? lesson.expId : lesson.expEn;
    const ch = isId ? lesson.chId : lesson.chEn;
    const sum = isId ? lesson.sumId : lesson.sumEn;
    const lessonLabel = isId ? `Pelajaran ${lesson.num}` : `Lesson ${lesson.num}`;

    const langDir = path.join(mdDir, lang);
    fs.mkdirSync(langDir, { recursive: true });

    const code = lesson.files[lesson.codeFile] || '';
    const filename = `lesson${lesson.num}-${lesson.topicId}.md`;
    const content = `# ${title}

> Django | ${phaseName} | ${lessonLabel}

## ${isId ? 'Tujuan Pembelajaran' : 'Learning Objectives'}

${objList}

---

## Program: ${title}

\`\`\`python
${code}
\`\`\`

---

## ${isId ? 'Penjelasan' : 'Explanation'}

${exp}

---

## ${isId ? 'Eksperimen' : 'Experiments'}

${exp.split('\n').map((l) => l.trim()).filter((l) => l.startsWith('##')).map((h, i) => `${i + 1}. **${h.replace(/^#+\s*/, '')}**`).join('\n')}

---

## ${isId ? 'Tantangan' : 'Challenge'}

${ch}

---

## ${isId ? 'Ringkasan' : 'Summary'}

${sum}
`;

    fs.writeFileSync(path.join(langDir, filename), content);

    // Write project files JSON for StackBlitz playground
    const filesJson = path.join(langDir, `lesson${lesson.num}-${lesson.topicId}.json`);
    fs.writeFileSync(filesJson, JSON.stringify(lesson.files, null, 2));
  }

  console.log(`  ${lesson.num}. ${lesson.titleId} / ${lesson.titleEn}`);
}

const total = LESSONS.length * 2;
console.log(`\nGenerated ${total} Django curriculum files (${LESSONS.length} lessons x 2 languages)`);
console.log(`  Output: ${BASE_DIR}`);
