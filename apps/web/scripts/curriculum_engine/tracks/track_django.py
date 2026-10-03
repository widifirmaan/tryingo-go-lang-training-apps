"""
Django Track Curriculum Generator (10 Weeks, 3 Levels)
Product: Robust Multi-Tenant Subscription Learning Management System (Django 5.1 / Python 3.12+)
"""

def get_track():
    return {
        'slug': 'django',
        'track_name': 'Django Web Framework',
        'levels': [
            {
                'levelId': 'beginer',
                'nameId': 'Pemula (Django MVT, ORM & Admin)',
                'nameEn': 'Beginner (Django MVT, ORM & Admin)',
                'descId': 'Arsitektur MVT Django 5.1, Model ORM, Migrasi, Django Admin yang canggih, dan sistem Autentikasi.',
                'descEn': 'Django 5.1 MVT architecture, ORM Models, Migrations, powerful Django Admin, and Authentication.',
            },
            {
                'levelId': 'intermediate',
                'nameId': 'Menengah (Django REST Framework & ORM Optimization)',
                'nameEn': 'Intermediate (Django REST Framework & ORM Optimization)',
                'descId': 'Membangun Web API dengan DRF, Serializers, SimpleJWT, mitigasi query N+1, dan transaksi atomik.',
                'descEn': 'Building Web APIs with DRF, Serializers, SimpleJWT, N+1 query mitigations, and atomic transactions.',
            },
            {
                'levelId': 'advanced',
                'nameId': 'Lanjutan (Celery, Caching & Subscription LMS Capstone)',
                'nameEn': 'Advanced (Celery, Caching & Subscription LMS Capstone)',
                'descId': 'Antrean tugas Celery dengan Redis, sinyal Django, Redis caching, dan LMS langganan production-ready.',
                'descEn': 'Celery task queues with Redis, Django signals, Redis caching, and production subscription LMS platform.',
            },
        ],
        'modules': [
            # Week 1
            {
                'week': 1,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'django-mvt-architecture-models',
                'titleId': 'Arsitektur MVT Django 5.1, Settings & Deklarasi Model Domain',
                'titleEn': 'Django 5.1 MVT Architecture, Settings & Domain Model Declarations',
                'programId': 'Domain Model Kursus & Pelajaran LMS dengan Django ORM',
                'programEn': 'LMS Course & Lesson Domain Models with Django ORM',
                'language': 'python',
                'code': '''# Demonstrasi Model Domain LMS (models.py)
from django.db import models
from django.utils.text import slugify
from django.core.validators import MinValueValidator

class CourseLevel(models.TextChoices):
    BEGINNER = "BEGINNER", "Pemula"
    INTERMEDIATE = "INTERMEDIATE", "Menengah"
    ADVANCED = "ADVANCED", "Lanjutan"

class Course(models.Model):
    title = models.CharField(max_length=200, help_text="Judul lengkap kursus")
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    description = models.TextField()
    price = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        validators=[MinValueValidator(0.00)]
    )
    level = models.CharField(
        max_length=20, 
        choices=CourseLevel.choices, 
        default=CourseLevel.BEGINNER
    )
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Kursus"
        verbose_name_plural = "Daftar Kursus"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} ({self.get_level_display()})"

class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="lessons")
    title = models.CharField(max_length=200)
    video_url = models.URLField(blank=True)
    content = models.TextField(help_text="Materi markdown pelajaran")
    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["order"]
        unique_together = ["course", "order"]

    def __str__(self):
        return f"{self.course.title} - #{self.order}: {self.title}"

print("=== DJANGO LMS MODELS TERDEFINISI DENGAN VALIDASI & CHOICES ===")
''',
                'objectivesId': [
                    'Memahami filosofi "Batteries-Included" dan arsitektur Model-View-Template (MVT) Django.',
                    'Mendefinisikan entitas database menggunakan `models.Model`, `CharField`, `DecimalField`, dan `TextChoices`.',
                    'Mengonfigurasi relasi antar tabel dengan `models.ForeignKey` dan `related_name`.',
                    'Mengotomatisasi pembuatan slug URL SEO-friendly melalui override method `save()`.',
                ],
                'objectivesEn': [
                    'Understand Django\'s "Batteries-Included" philosophy and Model-View-Template (MVT) architecture.',
                    'Declare database entities via `models.Model`, `CharField`, `DecimalField`, and `TextChoices`.',
                    'Configure relational foreign keys with `models.ForeignKey` and `related_name`.',
                    'Automate SEO-friendly slug generation by overriding the model `save()` method.',
                ],
                'explanationId': '''Django adalah framework web Python paling matang dan produktif di dunia, terkenal dengan filosofi **"Batteries-Included"** (semuanya sudah tersedia bawaan: ORM, migrasi, admin dashboard, autentikasi, proteksi CSRF).

### Arsitektur MVT (Model-View-Template)
- **Model**: Mendefinisikan struktur data dan aturan bisnis yang dipetakan langsung ke tabel database relasional.
- **View**: Memproses logika bisnis, mengambil data dari model, dan menentukan data apa yang akan dikirim ke client.
- **Template**: Mengatur bagaimana antarmuka HTML ditampilkan kepada pengguna.

### Django ORM dan TextChoices
Alih-alih menulis kode SQL mentah yang rentan terhadap SQL Injection, kita mendeklarasikan model dalam bentuk kelas Python. Fitur `models.TextChoices` memungkinkan pendefinisian enum yang aman dan otomatis menyediakan method pembantu seperti `course.get_level_display()` untuk menampilkan label yang ramah pengguna.

### Integritas Relasi Database
Dengan menentukan `models.ForeignKey(Course, on_delete=models.CASCADE, related_name="lessons")`, Django secara otomatis membuat batasan foreign key di PostgreSQL. Jika sebuah kursus dihapus, seluruh pelajaran (`Lesson`) di dalamnya otomatis ikut terhapus dengan aman (Cascade Delete).
''',
                'explanationEn': '''Django stands as Python\'s flagship web framework, renowned for its **"Batteries-Included"** ethos: packaging ORM persistence, automated migrations, an administrative dashboard, authentication, and CSRF defense right out of the box.

### The MVT (Model-View-Template) Architecture
- **Model**: Encapsulates data schemas and business invariants mapped directly to relational database tables.
- **View**: Executes application logic, queries models, and coordinates responses.
- **Template**: Renders dynamic presentations (HTML) delivered to user agents.

### Django ORM & TextChoices
Rather than authoring raw SQL statements prone to injection vulnerabilities, models are declared as clean Python classes. Utilizing `models.TextChoices` provisions type-safe enums alongside built-in helper methods such as `course.get_level_display()`.

### Relational Foreign Key Integrity
Designating `models.ForeignKey(Course, on_delete=models.CASCADE, related_name="lessons")` sets up foreign key constraints within PostgreSQL. If a course is pruned, its associated lessons purge atomically via Cascade Deletion.
''',
                'beginnerId': '''Bayangkan Anda membangun sekolah fisik. Django seperti paket gedung sekolah siap pakai lengkap dengan meja, kursi, brankas guru, dan gerbang keamanan (Batteries-Included). Kelas Course dan Lesson adalah formulir buku induk siswa yang otomatis dicetak rapi ke dalam lemari arsip baja (Database) tanpa Anda perlu merakit lemarinya sendiri.''',
                'beginnerEn': '''Imagine constructing an educational academy. Django represents a turn-key facility fully furnished with classrooms, administrative desks, security gates, and student records vaults (Batteries-Included). The Course and Lesson models act as pre-printed registration forms filed into steel vaults (the Database) without manual carpentry.''',
                'experimentsId': [
                    'Jalankan perintah `python manage.py makemigrations` dan amati file SQL migration yang digenerate Django.',
                    'Buat objek kursus baru di shell Django (`python manage.py shell`) dan buktikan slug otomatis terisi dari title.',
                    'Coba tambahkan dua Lesson dengan nomor `order` yang sama pada satu kursus dan amati validasi `unique_together`.',
                ],
                'experimentsEn': [
                    'Run `python manage.py makemigrations` and inspect the synthesized migration Python script.',
                    'Instantiate a Course in the Django shell (`python manage.py shell`) and verify slug auto-generation.',
                    'Attempt inserting two Lesson records with identical `order` keys within a single course to test `unique_together`.',
                ],
                'challengeId': 'Tambahkan model `Enrollment` yang menghubungkan `User` dengan `Course`, mencakup tanggal pendaftaran dan status pembayaran (PENDING, PAID, CANCELLED).',
                'challengeEn': 'Author an `Enrollment` model binding `User` and `Course`, tracking registration timestamps and payment states (PENDING, PAID, CANCELLED).',
                'summaryId': 'Kamu telah menguasai arsitektur MVT Django, Model ORM, dan relasi ForeignKey. Minggu depan kita mempelajari Migrations Engine dan kustomisasi Django Admin.',
                'summaryEn': 'You have mastered Django MVT architecture, ORM Models, and ForeignKey relations. Next week we explore the Migrations Engine and Django Admin customization.',
            },

            # Week 2
            {
                'week': 2,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'migrations-orm-admin',
                'titleId': 'Migrations Engine, QuerySets & Kustomisasi Django Admin',
                'titleEn': 'Migrations Engine, QuerySets & Django Admin Customization',
                'programId': 'Dashboard Administrasi Kursus Interaktif dengan Search, Filter & Bulk Actions',
                'programEn': 'Interactive Course Admin Dashboard with Search, Filter & Bulk Actions',
                'language': 'python',
                'code': '''# Demonstrasi Kustomisasi Django Admin (admin.py)
from django.contrib import admin
# from .models import Course, Lesson

class LessonInline(admin.TabularInline):
    # Memungkinkan penambahan/pengeditan materi pelajaran langsung di halaman kursus
    # model = Lesson
    extra = 1
    fields = ["order", "title", "video_url"]

class CourseAdmin(admin.ModelAdmin):
    list_display = ["title", "level", "price", "is_published", "lesson_count", "created_at"]
    list_filter = ["is_published", "level", "created_at"]
    search_fields = ["title", "description"]
    prepopulated_fields = {"slug": ("title",)}
    # inlines = [LessonInline]
    actions = ["publish_courses", "unpublish_courses"]

    # Custom Calculated Column
    @admin.display(description="Jumlah Pelajaran")
    def lesson_count(self, obj):
        # Dalam implementasi nyata: obj.lessons.count()
        return 12

    # Custom Bulk Action untuk Admin
    @admin.action(description="Publikasikan kursus terpilih ke publik")
    def publish_courses(self, request, queryset):
        updated = queryset.update(is_published=True)
        self.message_user(request, f"{updated} kursus berhasil dipublikasikan!")

    @admin.action(description="Tarik kursus terpilih dari publik (Draft)")
    def unpublish_courses(self, request, queryset):
        updated = queryset.update(is_published=False)
        self.message_user(request, f"{updated} kursus diubah kembali menjadi draf.")

# admin.site.register(Course, CourseAdmin)
print("=== DJANGO ADMIN DASHBOARD SIAP DENGAN INLINE EDITING & BULK ACTIONS ===")
''',
                'objectivesId': [
                    'Menguasai siklus hidup migrasi database Django (`makemigrations`, `migrate`, `showmigrations`).',
                    'Menyesuaikan antarmuka visual Django Admin dengan `list_display`, `list_filter`, dan `search_fields`.',
                    'Menggunakan `TabularInline` untuk mengedit relasi anak (Lessons) langsung di dalam form induk (Course).',
                    'Membuat Bulk Actions kustom untuk mengubah status ratusan data secara atomik dengan satu klik.',
                ],
                'objectivesEn': [
                    'Master Django migration lifecycles (`makemigrations`, `migrate`, `showmigrations`).',
                    'Customize Django Admin visual dashboards with `list_display`, `list_filter`, and `search_fields`.',
                    'Deploy `TabularInline` editing child relationships (Lessons) directly inside parent forms (Course).',
                    'Author custom bulk administrative actions executing atomic state transitions with one click.',
                ],
                'explanationId': '''Salah satu fitur yang membuat para founder startup dan CTO memilih Django adalah **Django Admin**. Tanpa perlu membangun antarmuka web khusus untuk staf operasional, Django menyediakan dashboard back-office kelas enterprise secara instan.

### Siklus Migrasi Database
Ketika model Python diubah, perintah `makemigrations` mendeteksi perbedaannya dan menulis skrip migrasi deklaratif. Perintah `migrate` kemudian mengeksekusinya ke PostgreSQL/MySQL. Django melacak riwayat migrasi di tabel `django_migrations`, menjamin tidak ada migrasi yang tertinggal saat deployment ke server produksi.

### Kekuatan Kustomisasi ModelAdmin
Dengan mendefinisikan kelas `CourseAdmin`, kita dapat mengubah dashboard bawaan menjadi alat manajemen yang sangat intuitif:
- `search_fields`: Menambahkan kotak pencarian cepat berbasis indeks SQL `LIKE / ILIKE`.
- `list_filter`: Menyediakan filter sidebar instan berdasarkan kategori status.
- `inlines`: Memungkinkan staf menambahkan materi pelajaran (`Lesson`) langsung di halaman pembuatan kursus tanpa berpindah-pindah menu.

### Efisiensi Bulk Actions
Fungsi `publish_courses` menggunakan method `queryset.update(is_published=True)`. Ini mengeksekusi satu perintah SQL tunggal (`UPDATE courses SET is_published = true WHERE id IN (...)`), bukan loop satu per satu, sehingga dapat memperbarui 10.000 data dalam beberapa milidetik.
''',
                'explanationEn': '''A decisive factor driving engineering leadership to choose Django is the **Django Admin**. Without authoring custom frontends for operational staff, Django delivers an enterprise back-office management console automatically.

### The Migrations Pipeline
When Python models update, `makemigrations` detects schema diffs, generating declarative migration files. Running `migrate` translates these operations into DDL statements on PostgreSQL. Django tracks migration lineage within `django_migrations`, guaranteeing repeatable deployments.

### ModelAdmin Customization
Subclassing `ModelAdmin` transforms the administrative console into an intuitive management hub:
- `search_fields`: Injects full-text search bars utilizing SQL `LIKE/ILIKE` indexing.
- `list_filter`: Generates sidebar filters segmenting models across categories or dates.
- `inlines`: Enables operators to manage child records (`Lesson`) directly inside the parent edit view (`Course`).

### Scalable Bulk Actions
The `publish_courses` action leverages `queryset.update(is_published=True)`. This compiles down to a single optimized SQL statement (`UPDATE courses SET is_published = true WHERE id IN (...)`), updating 10,000 records within milliseconds.
''',
                'beginnerId': '''Bayangkan Anda baru membuka toko swalayan. Di framework lain, Anda harus membuat aplikasi kasir dan ruang komputer admin dari nol selama 3 bulan. Di Django, begitu Anda mendaftarkan daftar barang dagangan Anda, ruang kantor manajer lengkap dengan meja komputer, laporan stok, dan filter pencarian barang sudah otomatis tersedia dan siap pakai sejak hari pertama.''',
                'beginnerEn': '''Imagine opening a department store. In other frameworks, you must spend months building internal managerial software and stock dashboards from scratch. In Django, the moment you define your inventory items, a fully functional manager back-office with search bars, filters, and reports is instantly available from day one.''',
                'experimentsId': [
                    'Buat superuser baru dengan perintah `python manage.py createsuperuser` dan login ke `/admin`.',
                    'Uji coba fitur Bulk Action `publish_courses` pada 3 kursus draf sekaligus di antarmuka admin.',
                    'Gunakan `prepopulated_fields` dan amati bagaimana slug terisi otomatis saat Anda mengetik judul kursus di browser.',
                ],
                'experimentsEn': [
                    'Generate an administrative user via `python manage.py createsuperuser` and access `/admin`.',
                    'Test the `publish_courses` bulk action across multiple draft courses in the admin dashboard.',
                    'Leverage `prepopulated_fields` observing the slug populating reactively as you type course titles.',
                ],
                'challengeId': 'Tambahkan aksi ekspor CSV kustom pada `CourseAdmin` yang mengunduh daftar kursus terpilih beserta total pendapatan siswa yang mendaftar.',
                'challengeEn': 'Build a custom CSV export action in `CourseAdmin` downloading selected course datasets alongside aggregated enrollment revenue.',
                'summaryId': 'Kamu telah menguasai Migrasi, QuerySet updates, dan Django Admin kustom. Minggu depan kita mempelajari Class-Based Views dan Template Engine.',
                'summaryEn': 'You have mastered Migrations, QuerySet updates, and custom Django Admin. Next week we explore Class-Based Views and the Template Engine.',
            },

            # Week 3
            {
                'week': 3,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'views-urls-templates',
                'titleId': 'Class-Based Views (CBV), URL Routing & Django Template Engine',
                'titleEn': 'Class-Based Views (CBV), URL Routing & Django Template Engine',
                'programId': 'Katalog Kursus & Halaman Detail Materi dengan Generic Class-Based Views',
                'programEn': 'Course Catalog & Lesson Viewer with Generic Class-Based Views',
                'language': 'python',
                'code': '''# Demonstrasi Views & URL Dispatcher (views.py & urls.py)
from django.views.generic import ListView, DetailView
from django.urls import path
# from .models import Course

class CourseListView(ListView):
    # Mengambil daftar semua kursus yang dipublikasikan dengan paginasi
    # model = Course
    template_name = "courses/course_list.html"
    context_object_name = "courses"
    paginate_by = 6

    def get_queryset(self):
        # Filter hanya kursus yang sudah dipublikasikan
        return super().get_queryset().filter(is_published=True).prefetch_related("lessons")

class CourseDetailView(DetailView):
    # model = Course
    template_name = "courses/course_detail.html"
    context_object_name = "course"
    slug_field = "slug"
    slug_url_kwarg = "slug"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Tambahkan data ekstra ke template
        context["total_lessons"] = self.object.lessons.count()
        return context

urlpatterns = [
    path("", CourseListView.as_view(), name="course_list"),
    path("<slug:slug>/", CourseDetailView.as_view(), name="course_detail"),
]

# Snippet Template DTL (courses/course_list.html):
SAMPLE_DTL_TEMPLATE = """
{% extends "base.html" %}

{% block title %}Katalog Kursus - Tryngo LMS{% endblock %}

{% block content %}
<div class="course-grid">
  {% for course in courses %}
    <div class="course-card">
      <h3><a href="{% url 'course_detail' course.slug %}">{{ course.title }}</a></h3>
      <p>{{ course.description|truncatewords:20 }}</p>
      <span class="badge">{{ course.get_level_display }}</span>
      <span class="price">Rp {{ course.price|floatformat:0 }}</span>
    </div>
  {% empty %}
    <p>Belum ada kursus yang dipublikasikan.</p>
  {% endfor %}
</div>
{% endblock %}
"""

print("=== CLASS-BASED VIEWS & TEMPLATE ROUTING TERKONFIGURASI ===")
''',
                'objectivesId': [
                    'Memahami perbedaan Function-Based Views (FBV) vs Class-Based Views (CBV).',
                    'Menggunakan Generic CBV standar industri: `ListView` dan `DetailView`.',
                    'Menguasai sintaks Django Template Language (DTL): inheritance (`{% extends %}`), loops, dan filter formatting.',
                    'Mengonfigurasi URL dispatcher dengan slug parameters type-safe (`<slug:slug>`).',
                ],
                'objectivesEn': [
                    'Differentiate Function-Based Views (FBV) from Class-Based Views (CBV).',
                    'Utilize enterprise standard Generic CBVs: `ListView` and `DetailView`.',
                    'Master Django Template Language (DTL): template inheritance (`{% extends %}`), loops, and filters.',
                    'Configure URL dispatchers with type-safe slug parameters (`<slug:slug>`).',
                ],
                'explanationId': '''Alih-alih menulis kode berulang untuk mengambil data dari database, melakukan paginasi, dan me-render template HTML, Django menyediakan abstraksi **Generic Class-Based Views (CBV)**.

### Keunggulan Generic CBV
- **ListView**: Secara otomatis mengambil data dari model, menangani paginasi halaman (misal 6 item per halaman), dan mengirim data ke template dalam variabel `courses`.
- **DetailView**: Mengambil satu record data berdasarkan slug atau ID di URL, otomatis menampilkan halaman 404 jika record tidak ditemukan, dan memuat relasinya.

### Template Inheritance pada DTL
Django Template Language (DTL) menggunakan pola pewarisan template (`{% extends "base.html" %}`). File `base.html` memuat header, footer, navigasi, dan CSS framework. Halaman anak hanya perlu mengisi blok konten spesifik (`{% block content %}`), mengeliminasi duplikasi markup HTML.

### DTL Filters dan Keamanan XSS
DTL dilengkapi filter bawaan seperti `|truncatewords:20` untuk memotong teks panjang dan `|floatformat:0` untuk format angka. Secara default, seluruh variabel di DTL otomatis di-escape secara aman untuk mematikan celah serangan Cross-Site Scripting (XSS).
''',
                'explanationEn': '''Rather than authoring repetitive boilerplate querying models, managing pagination slices, and rendering HTML views, Django provides **Generic Class-Based Views (CBVs)**.

### The Power of Generic CBVs
- **ListView**: Automatically fetches models, coordinates pagination slicing (e.g., 6 items per page), and exposes datasets to templates within `courses`.
- **DetailView**: Resolves a unique record using URL slugs or primary keys, automatically generating 404 responses if records do not exist.

### Template Inheritance in DTL
The Django Template Language (DTL) revolves around template inheritance (`{% extends "base.html" %}`). A foundational `base.html` template houses global headers, footers, and design assets. Child views inject specific contents via `{% block content %}`, eliminating template redundancy.

### DTL Formatting Filters & Native XSS Immunity
DTL incorporates expressive filters like `|truncatewords:20` and `|floatformat:0`. By default, DTL auto-escapes all context variables, neutralizing Cross-Site Scripting (XSS) injection vectors.
''',
                'beginnerId': '''Bayangkan cetakan koran. Halaman induk (base.html) sudah memiliki judul koran dan nomor halaman di bagian atas dan bawah. Anda hanya perlu meletakkan naskah artikel hari ini ke dalam kotak tengah (block content). Anda tidak perlu mendesain ulang seluruh halaman koran setiap kali menulis berita baru.''',
                'beginnerEn': '''Think of a newspaper printing press. The master plate (base.html) already stamps the masthead and page numbers at the margins. You simply slot the daily article copy into the central column block (`{% block content %}`). You never redesign the newspaper template for each new story.''',
                'experimentsId': [
                    'Ubah nilai `paginate_by = 2` dan uji coba navigasi halaman `?page=2` di browser.',
                    'Gunakan tag DTL `{% url "course_detail" course.slug %}` untuk menghasilkan link URL dinamis yang kebal terhadap perubahan path.',
                    'Override method `get_context_data` untuk menambahkan daftar instruktur terpopuler ke dalam halaman katalog.',
                ],
                'experimentsEn': [
                    'Adjust `paginate_by = 2` and navigate to page 2 via `?page=2` in your browser.',
                    'Deploy `{% url "course_detail" course.slug %}` to generate robust dynamic URLs immune to path refactoring.',
                    'Override `get_context_data` injecting top-rated instructors into the catalog view.',
                ],
                'challengeId': 'Buat View pencarian `CourseSearchView(ListView)` yang memfilter kursus berdasarkan kata kunci query string `?q=python` menggunakan Q-objects (`Q(title__icontains=q) | Q(description__icontains=q)`).',
                'challengeEn': 'Build a `CourseSearchView(ListView)` querying courses based on `?q=python` using Q-objects (`Q(title__icontains=q) | Q(description__icontains=q)`).',
                'summaryId': 'Kamu telah menguasai Class-Based Views, URL routing, dan Django Template Language. Minggu depan kita mempelajari Forms, CSRF, dan sistem Autentikasi.',
                'summaryEn': 'You have mastered Class-Based Views, URL routing, and the Django Template Language. Next week we explore Forms, CSRF, and Authentication.',
            },

            # Week 4
            {
                'week': 4,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'forms-csrf-user-authentication',
                'titleId': 'Formulir Aman: ModelForm, Proteksi CSRF & Django Authentication',
                'titleEn': 'Secure Forms: ModelForm, CSRF Protection & Django Authentication',
                'programId': 'Formulir Ulasan Kursus & Alur Pendaftaran Siswa dengan ModelForm',
                'programEn': 'Course Review Form & Student Registration Flow with ModelForm',
                'language': 'python',
                'code': '''from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
# from .models import Course, Review

# 1. ModelForm Otomatis dengan Validasi Bawaan
class CourseReviewForm(forms.Form):
    rating = forms.ChoiceField(
        choices=[(1, "1 - Buruk"), (2, "2 - Cukup"), (3, "3 - Baik"), (4, "4 - Sangat Baik"), (5, "5 - Luar Biasa")],
        widget=forms.Select(attrs={"class": "form-select"})
    )
    comment = forms.CharField(
        widget=forms.Textarea(attrs={"class": "form-control", "rows": 4, "placeholder": "Tulis ulasan Anda..."}),
        min_length=10,
        max_length=1000
    )

    def clean_comment(self):
        comment = self.cleaned_data.get("comment", "")
        if "spam" in comment.lower():
            raise forms.ValidationError("Ulasan memuat kata yang dilarang (spam).")
        return comment

# 2. View dengan Proteksi Autentikasi @login_required
@login_required(login_url="/accounts/login/")
def submit_review_view(request, course_slug):
    # course = get_object_or_404(Course, slug=course_slug)

    if request.method == "POST":
        form = CourseReviewForm(request.POST)
        if form.is_valid():
            # Proses penyimpanan aman
            rating = form.cleaned_data["rating"]
            comment = form.cleaned_data["comment"]
            print(f"[NEW REVIEW] User: {request.user.username} | Rating: {rating} | Comment: {comment}")
            return redirect(f"/courses/{course_slug}/")
    else:
        form = CourseReviewForm()

    return render(request, "courses/submit_review.html", {"form": form, "course_slug": course_slug})

# Snippet Template dengan Token CSRF Wajib:
CSRF_FORM_TEMPLATE = """
<form method="POST" action="">
  {% csrf_token %}
  {{ form.as_p }}
  <button type="submit" class="btn btn-primary">Kirim Ulasan</button>
</form>
"""

print("=== MODELFORM & SISTEM AUTENTIKASI DJANGO TERKONFIGURASI ===")
''',
                'objectivesId': [
                    'Memahami peran `ModelForm` dalam menghubungkan formulir HTML dengan model database secara otomatis.',
                    'Menerapkan proteksi Cross-Site Request Forgery (CSRF) menggunakan token `{% csrf_token %}`.',
                    'Menulis validasi kustom formulir dengan method `clean_<field>()`.',
                    'Mengamankan halaman aplikasi menggunakan decorator `@login_required` dan sistem autentikasi bawaan Django.',
                ],
                'objectivesEn': [
                    'Understand `ModelForm` bridging HTML form elements directly to database models.',
                    'Enforce Cross-Site Request Forgery (CSRF) defense using the `{% csrf_token %}` tag.',
                    'Author custom form sanitization and validation using `clean_<field>()` methods.',
                    'Shield private views using `@login_required` decorators and Django\'s built-in authentication system.',
                ],
                'explanationId': '''Memproses input formulir dari browser pengguna secara manual adalah pekerjaan rawan bug dan bahaya keamanan. Django Forms menangani rendering formulir, validasi tipe data, pembersihan input (cleaning), dan perlindungan keamanan secara terpadu.

### Keharusan Token CSRF ({% csrf_token %})
Serangan **CSRF (Cross-Site Request Forgery)** terjadi ketika situs jahat memperdaya browser pengguna yang sedang login untuk mengirimkan request mutasi data rahasia. Django mewajibkan tag `{% csrf_token %}` di dalam setiap form POST. Token kriptografis ini diverifikasi oleh middleware Django; jika token tidak cocok atau absen, request langsung ditolak dengan status HTTP 403 Forbidden.

### Metode Pembersihan clean_<field>()
Ketika method `form.is_valid()` dipanggil, Django menjalankan serangkaian validasi. Kita dapat menambahkan aturan validasi bisnis kustom (seperti mendeteksi spam kata-kata terlarang) dengan mendefinisikan method `clean_comment()`. Data yang telah lolos validasi dapat diakses secara aman melalui dictionary `form.cleaned_data`.

### Sistem Autentikasi Bawaan (django.contrib.auth)
Django menyertakan model `User`, hashing password berstandar industri (PBKDF2 dengan SHA-256), session management, dan sistem izin (permissions). Decorator `@login_required` memastikan bahwa hanya pengguna yang sudah login yang dapat mengakses halaman pengiriman ulasan atau pembelajaran.
''',
                'explanationEn': '''Manually handling browser form submissions invites security oversights. Django Forms abstracts HTML rendering, data validation, payload sanitization, and security defenses into a cohesive architecture.

### Mandatory CSRF Tokens ({% csrf_token %})
A **CSRF (Cross-Site Request Forgery)** exploit occurs when malicious sites trick an authenticated user's browser into transmitting unauthorized mutations. Django enforces `{% csrf_token %}` within every POST form. This cryptographic token is validated by middleware; mismatched tokens fail immediately with HTTP 403 Forbidden.

### Custom Sanitization via clean_<field>()
Invoking `form.is_valid()` triggers systematic validation pipelines. Defining `clean_comment()` allows engineers to enforce domain constraints (like spam keyword filtering). Validated attributes populate the type-safe `form.cleaned_data` dictionary.

### Built-in Authentication (django.contrib.auth)
Django ships with production-grade `User` models, cryptographic password hashing (PBKDF2 with SHA-256), session management, and permission matrices. The `@login_required` decorator restricts private views to authenticated users.
''',
                'beginnerId': '''Bayangkan formulir transfer bank fisik. Anda harus membubuhkan stempel hologram bank anti-palsu ({% csrf_token %}). Petugas loket (clean_comment) memeriksa apakah formulir Anda dicoret-coret atau menggunakan kata kasar. Jika Anda belum menunjukkan kartu tanda pengenal nasabah (@login_required), Anda disuruh mengantre di loket pembuatan akun terlebih dahulu.''',
                'beginnerEn': '''Think of a bank transfer slip. You must affix an official anti-counterfeiting holographic seal (`{% csrf_token %}`). The bank clerk (`clean_comment`) inspects the slip for missing signatures or illegible entries. If you have not presented your verified photo ID (`@login_required`), you are directed to the authentication counter first.''',
                'experimentsId': [
                    'Hapus tag `{% csrf_token %}` dari form dan amati penolakan HTTP 403 CSRF Verification Failed.',
                    'Kirim ulasan yang memuat kata "spam" dan amati pesan error validasi muncul di bawah kolom input komentar.',
                    'Gunakan generic view `django.contrib.auth.views.LoginView` untuk membuat halaman login dalam 5 baris kode.',
                ],
                'experimentsEn': [
                    'Omit the `{% csrf_token %}` tag and observe the HTTP 403 CSRF Verification Failed rejection.',
                    'Submit a review containing the keyword "spam" and observe the inline validation error message.',
                    'Deploy `django.contrib.auth.views.LoginView` to provision a complete login flow in five lines of code.',
                ],
                'challengeId': 'Buat formulir registrasi siswa baru `StudentSignUpForm` yang mewarisi `UserCreationForm`, menambahkan field wajib `full_name` dan `phone_number`.',
                'challengeEn': 'Build a new student registration form `StudentSignUpForm` extending `UserCreationForm`, adding mandatory `full_name` and `phone_number` fields.',
                'summaryId': 'Kamu telah menguasai ModelForm, validasi data, proteksi CSRF, dan sistem Autentikasi. Level 1 selesai! Di Level 2 kita masuk ke Django REST Framework dan optimasi ORM.',
                'summaryEn': 'You have mastered ModelForm, data validation, CSRF defense, and Authentication. Level 1 complete! Level 2 covers Django REST Framework and ORM optimization.',
            },

            # Week 5
            {
                'week': 5,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'django-rest-framework-serializers',
                'titleId': 'Django REST Framework: Serializers, ModelViewSet & RESTful API',
                'titleEn': 'Django REST Framework: Serializers, ModelViewSet & RESTful API',
                'programId': 'RESTful API Modul Kursus & Pelajaran dengan ModelSerializer & ViewSets',
                'programEn': 'Course & Lesson RESTful API with ModelSerializer & ViewSets',
                'language': 'python',
                'code': '''# Demonstrasi Django REST Framework (DRF)
# pip install djangorestframework

from rest_framework import serializers, viewsets, routers
from rest_framework.response import Response
from rest_framework.decorators import action
# from .models import Course, Lesson

# 1. Nested Serializer untuk Data Relasional Pelajaran
class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        # model = Lesson
        fields = ["id", "order", "title", "video_url"]

# 2. ModelSerializer Kursus dengan Nested Lessons & Computed Fields
class CourseDetailSerializer(serializers.ModelSerializer):
    # Menyertakan array pelajaran di dalam respons kursus (Nested Relationship)
    lessons = LessonSerializer(many=True, read_only=True)
    level_label = serializers.CharField(source="get_level_display", read_only=True)
    is_free = serializers.SerializerMethodField()

    class Meta:
        # model = Course
        fields = ["id", "title", "slug", "description", "price", "level", "level_label", "is_free", "lessons"]

    def get_is_free(self, obj) -> bool:
        return obj.price == 0

# 3. ModelViewSet: Menyediakan CRUD Lengkap Otomatis (GET, POST, PUT, DELETE)
class CourseViewSet(viewsets.ModelViewSet):
    # queryset = Course.objects.filter(is_published=True).prefetch_related("lessons")
    serializer_class = CourseDetailSerializer
    lookup_field = "slug"

    # Custom Action Endpoint: GET /api/v1/courses/{slug}/stats/
    @action(detail=True, methods=["get"])
    def stats(self, request, slug=None):
        return Response({
            "status": "success",
            "enrolled_students": 420,
            "completion_rate": "87.5%"
        })

# 4. Registrasi Router Otomatis
router = routers.DefaultRouter()
# router.register(r'courses', CourseViewSet, basename='course')

print("=== DJANGO REST FRAMEWORK MODELVIEWSET & SERIALIZERS TERKONFIGURASI ===")
''',
                'objectivesId': [
                    'Memahami peran Django REST Framework (DRF) dalam memisahkan backend API dari frontend.',
                    'Menggunakan `ModelSerializer` untuk serialisasi data model menjadi format JSON dan sebaliknya (deserialisasi).',
                    'Menggunakan `ModelViewSet` untuk menyediakan endpoint CRUD standar (RESTful) dengan nol boilerplate.',
                    'Menambahkan custom route actions menggunakan decorator `@action(detail=True)`.',
                ],
                'objectivesEn': [
                    'Understand Django REST Framework (DRF) decoupling backend services from frontend clients.',
                    'Deploy `ModelSerializer` serializing models into JSON and deserializing inputs.',
                    'Leverage `ModelViewSet` to provision standard CRUD RESTful routes with zero boilerplate.',
                    'Inject custom route actions using the `@action(detail=True)` decorator.',
                ],
                'explanationId': '''Ketika aplikasi web LMS Anda membutuhkan aplikasi mobile iOS/Android atau frontend modern seperti React / Vue / Next.js, Anda membutuhkan API RESTful berstandar tinggi. **Django REST Framework (DRF)** adalah toolkit standar emas di ekosistem Python.

### Peran Serializer di DRF
Serializer bertindak seperti penerjemah dua arah:
1. **Serialisasi**: Mengonversi objek query database Django (QuerySets) menjadi format data primitif Python yang dapat di-render menjadi JSON.
2. **Deserialisasi & Validasi**: Memeriksa payload JSON yang dikirimkan client melalui request POST/PUT, memvalidasi aturan tipe data, dan mengubahnya menjadi objek model database yang siap disimpan.

### Keajaiban ModelViewSet dan Routers
Daripada menulis 5 view controller terpisah untuk list, create, retrieve, update, dan destroy, `ModelViewSet` menyediakan seluruh operasi CRUD tersebut secara otomatis. Dikombinasikan dengan `DefaultRouter()`, DRF menghasilkan seluruh pola URL RESTful (`/api/v1/courses/`, `/api/v1/courses/{slug}/`) lengkap dengan dokumentasi web browsing yang interaktif (Browsable API).
''',
                'explanationEn': '''When your LMS expands to support mobile iOS/Android applications or React/Next.js frontends, standard RESTful APIs become mandatory. **Django REST Framework (DRF)** provides the gold standard API toolkit for Python.

### The Role of DRF Serializers
Serializers function as bidirectional data converters:
1. **Serialization**: Translates complex Django model instances and QuerySets into standard Python dictionaries serializable to JSON.
2. **Deserialization & Validation**: Inspects incoming JSON payloads on POST/PUT calls, enforcing schema validation rules prior to persisting to databases.

### ModelViewSet & DefaultRouter
Rather than authoring five distinct controller views for list, create, retrieve, update, and delete actions, `ModelViewSet` provisions full CRUD mechanics automatically. Paired with `DefaultRouter()`, DRF synthesizes canonical RESTful URLs (`/api/v1/courses/`) alongside an interactive Browsable API testing GUI.
''',
                'beginnerId': '''Bayangkan restoran siap saji yang ingin membuka layanan pesan-antar lewat aplikasi ojek online (Mobile App). Django Templates seperti pengunjung yang makan langsung di meja restoran. DRF Serializer seperti petugas bagian pengepakan yang membungkus makanan ke dalam kotak boks rapi berlabel barcode (JSON) agar kurir ojek online bisa mengantarkannya ke mana saja.''',
                'beginnerEn': '''Imagine a dine-in restaurant expanding into delivery apps (Mobile Apps). Django Templates represent patrons dining in the dining hall. A DRF Serializer acts as the packing station boxing orders into standardized labeled containers (JSON) ready for dispatch couriers.''',
                'experimentsId': [
                    'Buka endpoint `/api/v1/courses/` di browser dan amati antarmuka grafis DRF Browsable API.',
                    'Kirim request GET dengan header `Accept: application/json` menggunakan cURL dan amati output JSON murni.',
                    'Gunakan `SerializerMethodField` untuk menghitung durasi total seluruh pelajaran dalam menit secara dinamis.',
                ],
                'experimentsEn': [
                    'Navigate to `/api/v1/courses/` in your browser and inspect DRF\'s interactive Browsable API interface.',
                    'Send a GET request with `Accept: application/json` via cURL and inspect the raw JSON payload.',
                    'Deploy `SerializerMethodField` computing total aggregated lesson durations in minutes dynamically.',
                ],
                'challengeId': 'Tambahkan nested writable serializer sehingga instruktur dapat membuat kursus baru sekaligus menyertakan 3 materi pelajaran awal dalam satu request POST.',
                'challengeEn': 'Author a nested writable serializer empowering instructors to create a new Course alongside three initial Lesson entities within a single POST transaction.',
                'summaryId': 'Kamu telah menguasai DRF Serializers, ModelViewSet, dan DefaultRouter. Minggu depan kita mempelajari Autentikasi API dengan SimpleJWT dan Custom Permissions.',
                'summaryEn': 'You have mastered DRF Serializers, ModelViewSet, and DefaultRouter. Next week we cover API Authentication with SimpleJWT and Custom Permissions.',
            },

            # Week 6
            {
                'week': 6,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'auth-permissions-jwt',
                'titleId': 'Keamanan API: Stateless JWT (SimpleJWT) & Custom Permissions',
                'titleEn': 'API Security: Stateless JWT (SimpleJWT) & Custom Permissions',
                'programId': 'Proteksi Akses Materi Video Pelajaran Khusus Siswa Terdaftar dengan SimpleJWT',
                'programEn': 'Enrolled Student Video Content Protection with SimpleJWT',
                'language': 'python',
                'code': '''# Menggunakan djangorestframework-simplejwt
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

# 1. Custom Permission Class: Hanya Siswa yang Terdaftar yang Boleh Mengakses Konten
class IsEnrolledStudentOrInstructor(permissions.BasePermission):
    message = "Akses ditolak! Anda harus terdaftar (enrolled) di kursus ini untuk menonton video materi."

    def has_object_permission(self, request, view, obj):
        # Admin selalu memiliki hak akses penuh
        if request.user.is_staff:
            return True

        # Periksa apakah user terdaftar di kursus terkait
        # Misal: obj adalah instance Lesson, obj.course adalah kursus
        # return obj.course.enrollments.filter(student=request.user, is_paid=True).exists()
        return getattr(request.user, "is_enrolled", False)

# 2. Protected Video Streaming Endpoint
class LessonStreamView(APIView):
    # Memerlukan token JWT valid dan izin custom
    permission_classes = [permissions.IsAuthenticated, IsEnrolledStudentOrInstructor]

    def get(self, request, lesson_id):
        # Data aman yang hanya boleh dilihat siswa yang membayar
        return Response({
            "lesson_id": lesson_id,
            "title": "Membangun High-Throughput Microservice",
            "secure_stream_url": f"https://cdn.tryngo.io/hls/lesson_{lesson_id}/master.m3u8?token=HMAC_SECURE_TOKEN",
            "expires_in_seconds": 3600
        })

# Konfigurasi SimpleJWT di settings.py:
# REST_FRAMEWORK = {
#     'DEFAULT_AUTHENTICATION_CLASSES': (
#         'rest_framework_simplejwt.authentication.JWTAuthentication',
#     )
# }

print("=== STATELSS JWT AUTH & CUSTOM PERMISSIONS TERKONFIGURASI ===")
''',
                'objectivesId': [
                    'Mengonfigurasi stateless authentication menggunakan JSON Web Token dengan `djangorestframework-simplejwt`.',
                    'Memahami siklus hidup Access Token (umur pendek: 15 menit) dan Refresh Token (umur panjang: 7 hari).',
                    'Membangun Custom Permission Classes dengan mewarisi `permissions.BasePermission`.',
                    'Mengamankan konten video digital berbayar dari pembajakan dan akses tidak sah.',
                ],
                'objectivesEn': [
                    'Configure stateless authentication with JSON Web Tokens via `djangorestframework-simplejwt`.',
                    'Understand short-lived Access Tokens (15 min) and long-lived Refresh Tokens (7 days).',
                    'Construct Custom Permission Classes extending `permissions.BasePermission`.',
                    'Shield proprietary digital video content from unauthorized access and piracy.',
                ],
                'explanationId': '''Aplikasi mobile dan frontend SPA modern tidak menggunakan cookies berbasis sesi (session cookies) karena rentan terhadap pemblokiran pihak ketiga dan sulit diskalakan di klaster multi-server. Kita menggunakan **Stateless JWT (JSON Web Tokens)**.

### Cara Kerja SimpleJWT di Django
1. Pengguna mengirimkan username dan password ke endpoint `/api/token/`.
2. SimpleJWT mengembalikan dua token:
   - **Access Token**: Token umur pendek (misal 15 menit) yang disertakan pada setiap HTTP request di header `Authorization: Bearer <access_token>`.
   - **Refresh Token**: Token umur panjang yang disimpan aman di client untuk memperbarui access token baru saat kadaluarsa tanpa meminta pengguna login ulang.

### Custom Permissions (BasePermission)
Keamanan sejati bukan hanya mengecek apakah pengguna sudah login (`IsAuthenticated`), tetapi juga memverifikasi apakah pengguna berhak mengakses sumber daya spesifik (**Object-Level Permissions**). Dengan mengimplementasikan method `has_object_permission`, kita memeriksa kepemilikan kursus atau status pembayaran langganan secara terpusat dan elegan.
''',
                'explanationEn': '''Modern single-page applications (SPAs) and mobile clients avoid stateful session cookies due to third-party cookie restrictions and multi-region scaling hurdles. We deploy **Stateless JSON Web Tokens (JWT)**.

### SimpleJWT Mechanics in Django
1. Clients submit credentials to `/api/token/`.
2. SimpleJWT yields a token pair:
   - **Access Token**: Short-lived credential (e.g., 15 minutes) passed in the `Authorization: Bearer <token>` header on each transaction.
   - **Refresh Token**: Long-lived token used to negotiate fresh access tokens without requiring users to re-enter passwords.

### Custom Permissions via BasePermission
Production security extends beyond binary login checks (`IsAuthenticated`) into granular **Object-Level Permissions**. Overriding `has_object_permission` encapsulates domain access rules—such as verifying enrollment payment status—centrally.
''',
                'beginnerId': '''Bayangkan Anda pergi ke festival musik. Di loket depan Anda menukarkan tiket dengan gelang festival (Access Token). Gelang ini berlaku selama 1 hari. Untuk masuk ke tenda konser VIP (Custom Permission), petugas di depan tenda memindai barcode gelang Anda untuk memastikan Anda sudah membeli paket VIP, bukan sekadar tiket reguler.''',
                'beginnerEn': '''Think of a music festival. At the gate, you exchange your purchase receipt for an RFID wristband (the Access Token). When entering the VIP backstage lounge (Custom Permission), the guard scans your wristband to verify whether you purchased VIP access rather than standard admission.''',
                'experimentsId': [
                    'Kirim request ke `/api/token/` menggunakan cURL dan amati balikan `access` dan `refresh` token.',
                    'Akses endpoint yang dilindungi tanpa header Authorization dan amati status 401 Unauthorized.',
                    'Akses endpoint dengan user yang belum terdaftar dan amati pesan penolakan custom dari `IsEnrolledStudentOrInstructor`.',
                ],
                'experimentsEn': [
                    'Dispatch a request to `/api/token/` via cURL and inspect the returned `access` and `refresh` strings.',
                    'Access protected routes without Authorization headers observing 401 Unauthorized errors.',
                    'Access with an unenrolled student token and observe the custom denial message from `IsEnrolledStudentOrInstructor`.',
                ],
                'challengeId': 'Implementasikan sistem Token Blacklisting: ketika pengguna logout, masukkan refresh token ke dalam tabel blacklist database menggunakan `rest_framework_simplejwt.token_blacklist` sehingga token tidak bisa digunakan lagi.',
                'challengeEn': 'Implement Token Blacklisting: when users logout, invalidate the refresh token via `rest_framework_simplejwt.token_blacklist` preventing token reuse.',
                'summaryId': 'Kamu telah menguasai SimpleJWT stateless authentication dan Custom Permissions. Minggu depan kita mempelajari optimasi kueri ORM dan mitigasi N+1 Problem.',
                'summaryEn': 'You have mastered SimpleJWT stateless authentication and Custom Permissions. Next week we explore ORM query optimization and the N+1 Problem.',
            },

            # Week 7
            {
                'week': 7,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'orm-optimization-transactions',
                'titleId': 'Optimasi Performa ORM: Mitigasi N+1 Query & Transaksi Atomik',
                'titleEn': 'ORM Performance Optimization: Mitigating N+1 Queries & Atomic Transactions',
                'programId': 'Pelacak Progres Belajar Siswa Bebas N+1 Query dengan select_related & prefetch_related',
                'programEn': 'N+1-Free Student Progress Tracker with select_related & prefetch_related',
                'language': 'python',
                'code': '''from django.db import transaction
from django.db.models import Prefetch, Count, Q
# from .models import Course, Lesson, Enrollment, User

# 1. Masalah Fatal: N+1 Query Problem (Kueri Lambat)
def slow_course_listing():
    courses = [] # Course.objects.all()
    # BURUK: Melakukan 1 kueri untuk mengambil kursus,
    # lalu 100 kueri tambahan di dalam loop untuk mengambil pelajaran dan instruktur! (N+1 Queries)
    # for c in courses:
    #     print(c.instructor.username, c.lessons.count())

# 2. Solusi Performa Tinggi: select_related & prefetch_related
def fast_course_listing():
    print("=== EKSEKUSI KUERI OPTIMAL (HANYA 2 KUERI SQL KE DATABASE) ===")
    
    # - select_related: Menggunakan SQL INNER JOIN untuk relasi ForeignKey / OneToOne (1 kueri)
    # - prefetch_related: Menjalankan kueri kedua terpisah untuk relasi ManyToMany / Reverse ForeignKey
    
    # optimized_qs = Course.objects.filter(is_published=True)\\
    #     .select_related("instructor")\\
    #     .prefetch_related(
    #         Prefetch("lessons", queryset=Lesson.objects.only("id", "title", "order"))
    #     )\\
    #     .annotate(total_students=Count("enrollments", filter=Q(enrollments__is_paid=True)))

    print("[SQL OPTIMIZED] Berhasil mengambil 100 kursus, instruktur, dan relasi materi dalam 2 kueri SQL!")

# 3. Transaksi Atomik Aman untuk Proses Enrollment & Pembayaran
def enroll_student_atomic(student_id: int, course_id: int):
    # Menggunakan context manager transaction.atomic()
    # Jika terjadi exception di tengah jalan, seluruh mutasi di-rollback secara otomatis!
    with transaction.atomic():
        print(f"[TRANSACTION START] Mendaftarkan student #{student_id} ke course #{course_id}...")
        
        # 1. Kunci baris database (SELECT ... FOR UPDATE) untuk mencegah race condition
        # course = Course.objects.select_for_update().get(id=course_id)
        
        # 2. Buat record pendaftaran
        # enrollment = Enrollment.objects.create(student_id=student_id, course=course, is_paid=True)
        
        # 3. Log audit transaksi
        print("[TRANSACTION COMMIT] Siswa berhasil terdaftar dan transaksi pembayaran berhasil di-commit!")

fast_course_listing()
enroll_student_atomic(101, 42)
''',
                'objectivesId': [
                    'Mengidentifikasi dan membasmi N+1 Query Problem pada Django ORM.',
                    'Membedakan `select_related` (SQL JOIN untuk relasi single) vs `prefetch_related` (kueri terpisah untuk multi-relasi).',
                    'Menggunakan `django.db.transaction.atomic` untuk menjamin integritas data ACID.',
                    'Menerapkan `select_for_update()` untuk mencegah race condition pada alokasi kuota pendaftaran kursus.',
                ],
                'objectivesEn': [
                    'Identify and eradicate the N+1 Query Problem within Django ORM.',
                    'Differentiate `select_related` (SQL JOINs for single relations) from `prefetch_related` (batch lookups for multi-relations).',
                    'Deploy `django.db.transaction.atomic` guaranteeing ACID transactional integrity.',
                    'Apply `select_for_update()` preventing race conditions during course enrollment allocation.',
                ],
                'explanationId': '''Salah satu kelemahan terbesar developer yang baru menggunakan ORM adalah ketidaktahuan atas kode SQL apa yang sebenarnya dieksekusi di balik layar. Kesalahan paling umum yang melumpuhkan server produksi adalah **N+1 Query Problem**.

### Memahami N+1 Query Problem
Jika Anda memiliki 50 kursus dan melakukan loop `for c in courses: print(c.instructor.name)`, Django akan menjalankan 1 kueri untuk mengambil 50 kursus, lalu **50 kueri tambahan** untuk mengambil instruktur dari masing-masing kursus (Total: 51 kueri database!). Jika ada 1.000 pengunjung bersamaan, database akan langsung mengalami downtime.

### Senjata Utama: select_related vs prefetch_related
1. **select_related**: Digunakan untuk relasi "single-valued" (ForeignKey atau OneToOne). Django menggabungkan tabel menggunakan **SQL INNER JOIN**, sehingga data instruktur dan kursus diambil sekaligus dalam **1 kueri tunggal**.
2. **prefetch_related**: Digunakan untuk relasi "multi-valued" (ManyToMany atau reverse ForeignKey seperti `course.lessons`). Django mengeksekusi 1 kueri tambahan menggunakan klausa SQL `IN (...)` dan menggabungkan datanya di memori Python.

### Transaksi Atomik (transaction.atomic)
Pendaftaran kursus melibatkan pemotongan saldo, pembuatan invoice, dan penambahan kuota. Jika koneksi terputus saat saldo sudah terpotong namun kuota belum bertambah, terjadi inkonsistensi fatal. Dengan membungkus kode di dalam `with transaction.atomic():`, seluruh operasi dijamin sukses bersama atau dibatalkan bersama (**Rollback**).
''',
                'explanationEn': '''A pervasive flaw in ORM engineering is ignorance of the actual SQL compiled under the hood. The most common vulnerability crushing production databases is the **N+1 Query Problem**.

### The Anatomy of an N+1 Query
Iterating through 50 courses via `for c in courses: print(c.instructor.name)` triggers 1 query fetching courses, followed by **50 redundant queries** fetching individual instructor records (51 queries total!). Under concurrent traffic, database connection pools collapse.

### Core Remedies: select_related vs prefetch_related
1. **select_related**: Applied to single-valued relationships (ForeignKey or OneToOne). Django executes an optimized **SQL INNER JOIN**, fetching course and instructor rows within a **single roundtrip**.
2. **prefetch_related**: Applied to multi-valued relationships (ManyToMany or reverse foreign keys like `course.lessons`). Django dispatches a second batched lookup via SQL `IN (...)`, performing joining inside Python memory.

### Atomic Transactions (transaction.atomic)
Course enrollments encompass balance deductions, invoice generation, and seat allocation. Wrapping operations inside `with transaction.atomic():` ensures either all mutations commit successfully or the entire transaction cleanly rolls back upon unexpected errors.
''',
                'beginnerId': '''Bayangkan Anda disuruh membeli 50 buku di toko buku. Cara N+1 kueri seperti orang bodoh yang pergi ke toko buku untuk membeli 1 buku, pulang ke rumah, lalu berangkat lagi ke toko buku untuk membeli buku ke-2, diulang 50 kali (50 kali bolak-balik). Cara select_related/prefetch_related seperti membawa daftar 50 buku sekaligus dan memasukkannya ke dalam 1 troli belanja dalam sekali jalan.''',
                'beginnerEn': '''Imagine being sent to retrieve 50 books from a library. The N+1 query behaves like an apprentice checking out 1 book, walking home, returning to the library for the 2nd book, and repeating this 50 times. The `select_related`/`prefetch_related` approach compiles a master list, loading all 50 books into a cart in a single trip.''',
                'experimentsId': [
                    'Pasang `django-debug-toolbar` dan amati jumlah kueri SQL di browser dev console sebelum dan sesudah optimasi.',
                    'Lemparkan `raise RuntimeError("Simulasi payment gateway down!")` di dalam blok `transaction.atomic()` dan buktikan enrollment tidak tersimpan di database.',
                    'Gunakan method `.only("id", "title")` untuk membatasi kolom SQL yang diambil dari tabel database.',
                ],
                'experimentsEn': [
                    'Install `django-debug-toolbar` and audit executed SQL counts before and after optimization.',
                    'Raise `RuntimeError("Simulated payment gateway timeout")` inside `transaction.atomic()` and verify zero database commits.',
                    'Deploy `.only("id", "title")` to project only specific SQL columns, conserving memory.',
                ],
                'challengeId': 'Gunakan Django ORM `F()` expressions untuk memperbarui view count kursus secara atomik (`Course.objects.filter(id=x).update(views_count=F("views_count") + 1)`) tanpa mengalami race condition.',
                'challengeEn': 'Use Django ORM `F()` expressions to increment course view counts atomically (`update(views_count=F("views_count") + 1)`) preventing race conditions.',
                'summaryId': 'Kamu telah menguasai optimasi N+1 Query dengan select_related/prefetch_related dan transaksi atomik. Level 2 selesai! Di Level 3 kita mempelajari Celery, Caching, dan Capstone LMS.',
                'summaryEn': 'You have mastered N+1 Query optimization via select_related/prefetch_related and atomic transactions. Level 2 complete! Level 3 covers Celery, Caching, and our LMS Capstone.',
            },

            # Week 8
            {
                'week': 8,
                'level': 'advanced',
                'levelNameId': 'Lanjutan',
                'levelNameEn': 'Advanced',
                'topicId': 'signals-celery-background-tasks',
                'titleId': 'Tugas Latar Belakang: Django Signals, Celery & Redis Message Broker',
                'titleEn': 'Background Tasks: Django Signals, Celery & Redis Message Broker',
                'programId': 'Generator Sertifikat PDF Kelulusan Siswa Asinkron dengan Sinyal & Celery Worker',
                'programEn': 'Async Student Graduation PDF Certificate Generator with Signals & Celery Worker',
                'language': 'python',
                'code': '''# Demonstrasi Celery Tasks & Django Signals (tasks.py & signals.py)
import time

# 1. Definisi Celery Task Asinkron (tasks.py)
# from celery import shared_task

# @shared_task(bind=True, max_retries=3, default_retry_delay=60)
def generate_completion_certificate_pdf(student_id: int, course_id: int) -> str:
    print(f"[CELERY WORKER START] Memulai komputasi pembuatan sertifikat PDF untuk Student #{student_id}...")
    
    # Simulasi proses rendering PDF yang memakan waktu CPU (misal: WeasyPrint / ReportLab selama 300ms)
    time.sleep(0.3)
    
    certificate_url = f"https://cdn.tryngo.io/certificates/cert_{student_id}_{course_id}.pdf"
    print(f"[CELERY WORKER SUCCESS] Sertifikat selesai! URL: {certificate_url}")
    return certificate_url

# 2. Django Signal: Memicu Task Begitu Siswa Menyelesaikan Seluruh Pelajaran (signals.py)
# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from .models import StudentProgress

# @receiver(post_save, sender=StudentProgress)
def on_progress_updated(sender, student_id, course_id, is_completed, **kwargs):
    if is_completed:
        print(f"[DJANGO SIGNAL TRIGGERED] Siswa #{student_id} telah menuntaskan 100% materi kursus #{course_id}!")
        print(" -> Meneruskan tugas pembuatan sertifikat ke antrean Celery via Redis...")
        
        # Eksekusi secara asinkron (Non-blocking): generate_completion_certificate_pdf.delay(student_id, course_id)
        # HTTP response dikembalikan ke browser siswa dalam 5 milidetik!
        generate_completion_certificate_pdf(student_id, course_id)

# Simulasi Memicu Sinyal
on_progress_updated(None, student_id=8812, course_id=10, is_completed=True)
''',
                'objectivesId': [
                    'Memahami pola Publish-Subscribe internal Django menggunakan Signals (`post_save`, `pre_delete`).',
                    'Mengintegrasikan Celery dengan message broker Redis untuk tugas background asinkron.',
                    'Memahami method `.delay()` dan `.apply_async()` untuk melepaskan beban pemrosesan berat dari request web.',
                    'Menerapkan retry mechanism dan dead-letter handling pada tugas Celery yang gagal.',
                ],
                'objectivesEn': [
                    'Understand Django internal Publish-Subscribe signals (`post_save`, `pre_delete`).',
                    'Integrate Celery paired with Redis message brokers for asynchronous background workloads.',
                    'Master `.delay()` and `.apply_async()` offloading intensive compute from the HTTP response loop.',
                    'Implement fault-tolerant task retry policies and error handling in Celery workers.',
                ],
                'explanationId': '''Operasi yang memakan waktu komputasi intensif (seperti menghasilkan file PDF bersertifikat digital, mengirim email massal, atau memproses kompresi video) tidak boleh dijalankan di dalam siklus request-response HTTP Django. Jika dijalankan langsung, koneksi browser pengguna akan macet dan server akan mengalami timeout.

### Django Signals
Django Signals memungkinkan komponen aplikasi yang berbeda saling berkomunikasi secara terlepas (decoupled). Sinyal bawaan seperti `post_save` dipancarkan secara otomatis setiap kali sebuah model disimpan ke database. Kita dapat mendaftarkan receiver function yang bereaksi terhadap perubahan status kelulusan siswa.

### Arsitektur Celery & Redis
**Celery** adalah distributed task queue standar industri untuk Python.
1. **Producer (Django View/Signal)**: Memanggil `generate_completion_certificate_pdf.delay(student_id, course_id)`. Panggilan ini hanya memakan waktu 2 milidetik untuk memasukkan pesan JSON ke dalam antrean Redis.
2. **Broker (Redis)**: Menyimpan antrean tugas secara persisten di memori.
3. **Worker (Celery Process)**: Proses terpisah di background yang mengambil tugas dari Redis, me-render file PDF, dan mengunggahnya ke cloud storage (AWS S3). Pengguna menerima respons web secara instan tanpa menunggu pembuatan PDF selesai.
''',
                'explanationEn': '''Compute-intensive workflows (generating cryptographic PDF certificates, dispatching transactional email batches, transcoding uploaded media) must never execute synchronously within the HTTP request-response cycle. Doing so freezes client browsers and triggers 504 Gateway Timeouts.

### Django Signals
Django Signals facilitate decoupled event communication across disparate apps. Native signals like `post_save` broadcast automatically when models commit to storage. Dedicated receiver handlers listen for completion milestones reactively.

### Celery & Redis Task Architecture
**Celery** is Python\'s premier distributed task queue engine.
1. **Producer (Django View/Signal)**: Invokes `generate_completion_certificate_pdf.delay(student_id, course_id)`. This dispatches a compact JSON message to Redis within 2 milliseconds.
2. **Broker (Redis)**: Holds task queues in high-throughput in-memory structures.
3. **Worker (Celery Process)**: Autonomous background pods consuming tasks from Redis, rendering PDF binaries, and uploading artifacts to cloud object storage (AWS S3). Clients receive instantaneous HTTP responses.
''',
                'beginnerId': '''Bayangkan Anda memesan jas pengantin di penjahit pakaian. Kasir penjahit (Django View) menerima pesanan Anda dalam 2 menit dan memberikan Anda nomor nota. Kasir tidak langsung menjahit jas Anda di depan mata Anda sambil Anda disuruh menunggu berdiri selama 3 hari. Kasir meletakkan nota di meja ruang jahit (Redis), dan tim penjahit di ruang belakang (Celery Worker) yang menyelesaikannya secara tenang.''',
                'beginnerEn': '''Imagine ordering a tailored tuxedo at a tailor shop. The front clerk (Django View) records your measurements in two minutes and hands you a claim slip. The clerk does not force you to stand waiting at the counter for three days while the tuxedo is stitched. The ticket is placed on the workshop rack (Redis), and back-room tailors (Celery Workers) complete the garments calmly.''',
                'experimentsId': [
                    'Jalankan Celery worker di terminal menggunakan perintah `celery -A lms_project worker -l info`.',
                    'Uji coba pemanggilan `.delay()` dan perhatikan bagaimana terminal Celery worker langsung mencetak log eksekusi.',
                    'Konfigurasikan Celery Beat untuk menjalankan tugas pengecekan langganan kadaluarsa setiap tengah malam.',
                ],
                'experimentsEn': [
                    'Launch a local Celery worker process via `celery -A lms_project worker -l info`.',
                    'Trigger a task via `.delay()` and observe the Celery worker terminal outputting execution logs.',
                    'Configure Celery Beat to execute subscription expiration audits nightly at midnight.',
                ],
                'challengeId': 'Konfigurasikan task retry otomatis di Celery dengan Exponential Backoff: jika pengunggahan PDF ke cloud storage gagal karena masalah jaringan, coba ulang sebanyak 3 kali.',
                'challengeEn': 'Configure automated Celery task retries with exponential backoff: if cloud storage uploads fail due to network blips, retry up to 3 times.',
                'summaryId': 'Kamu telah menguasai Django Signals, Celery background workers, dan Redis broker. Minggu depan kita mempelajari Caching dan Security Hardening.',
                'summaryEn': 'You have mastered Django Signals, Celery background workers, and Redis broker. Next week we cover Caching and Security Hardening.',
            },

            # Week 9
            {
                'week': 9,
                'level': 'advanced',
                'levelNameId': 'Lanjutan',
                'levelNameEn': 'Advanced',
                'topicId': 'caching-security-middleware',
                'titleId': 'Caching Terdistribusi, Security Hardening & Custom Middleware',
                'titleEn': 'Distributed Caching, Security Hardening & Custom Middleware',
                'programId': 'Middleware Pelindung API & Caching Halaman Kursus dengan Redis Backend',
                'programEn': 'API Defense Middleware & Course Page Caching with Redis Backend',
                'language': 'python',
                'code': '''# Demonstrasi Django Caching & Custom Middleware
import time
from django.core.cache import cache
from django.views.decorators.cache import cache_page

# 1. Custom Security & Timing Middleware
class RequestTimingAndSecurityMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start_time = time.perf_counter()

        # Eksekusi request ke view downstream
        response = self.get_response(request)

        # Hitung waktu eksekusi
        elapsed_ms = (time.perf_counter() - start_time) * 1000
        response["X-Response-Time-Ms"] = f"{elapsed_ms:.2f}"

        # Terapkan Security Headers
        response["X-Content-Type-Options"] = "nosniff"
        response["X-Frame-Options"] = "DENY"
        response["Referrer-Policy"] = "strict-origin-when-cross-origin"

        return response

# 2. Low-Level Caching API dengan Redis
def get_popular_courses_cached():
    cache_key = "lms:popular_courses:v1"
    
    # 1. Periksa apakah data ada di Redis Cache
    popular_courses = cache.get(cache_key)
    if popular_courses is not None:
        print("[CACHE HIT] Mengembalikan daftar kursus populer dari Redis Cache!")
        return popular_courses

    # 2. Cache Miss: Kueri dari Database PostgreSQL
    print("[CACHE MISS] Menghitung agregasi kursus terpopuler dari PostgreSQL...")
    popular_courses = [
        {"id": 1, "title": "Full-Stack React & Django Mastery", "students": 1250},
        {"id": 2, "title": "Rust System Programming from Scratch", "students": 890}
    ]

    # Simpan ke Redis dengan TTL 15 Menit (900 Detik)
    cache.set(cache_key, popular_courses, timeout=900)
    return popular_courses

# Demonstrasi Eksekusi
courses = get_popular_courses_cached()
print("Data Kursus:", courses)
''',
                'objectivesId': [
                    'Mengonfigurasi Django Cache Framework dengan backend terdistribusi `django-redis`.',
                    'Menggunakan Low-Level Cache API (`cache.get`, `cache.set`, `cache.delete`).',
                    'Menerapkan per-view caching menggunakan decorator `@cache_page(60 * 15)`.',
                    'Membangun Custom Middleware untuk audit durasi eksekusi request dan penegakan security headers.',
                ],
                'objectivesEn': [
                    'Configure the Django Cache Framework backed by distributed `django-redis`.',
                    'Deploy Low-Level Cache APIs (`cache.get`, `cache.set`, `cache.delete`).',
                    'Implement per-view caching utilizing the `@cache_page(60 * 15)` decorator.',
                    'Author custom middleware auditing execution timings and enforcing security headers.',
                ],
                'explanationId': '''Ketika ribuan siswa mengakses platform LMS Anda secara bersamaan, database PostgreSQL tidak boleh dibebani dengan kueri data yang jarang berubah (seperti daftar kursus terpopuler atau kurikulum statis). Dua instrumen vital untuk menjaga performa adalah **Caching** dan **Custom Middleware**.

### Tingkatan Caching di Django
1. **Per-View Caching (`@cache_page`)**: Menyimpan seluruh HTML atau JSON respons suatu view di memori Redis. Seluruh komputasi database dilewati secara total.
2. **Template Fragment Caching (`{% cache %}`)**: Meng-cache hanya blok HTML tertentu di dalam template (misal sidebar daftar kategori).
3. **Low-Level Cache API (`cache.get / cache.set`)**: Memberikan kontrol granular untuk menyimpan data objek Python arbitrer ke dalam Redis dengan durasi Time-To-Live (TTL).

### Peran Middleware Pipeline
Middleware adalah rantai komponen yang mencegat setiap HTTP request sebelum mencapai View dan setiap HTTP response sebelum dikirimkan ke browser. Dengan custom middleware, kita dapat menyuntikkan header keamanan browser (seperti `X-Frame-Options: DENY` untuk mencegah Clickjacking) dan memantau waktu respons server (SLA).
''',
                'explanationEn': '''When thousands of students browse LMS portals simultaneously, relational database instances must not drown under repetitive queries for semi-static data (popular catalogs, syllabus blueprints). Maintaining peak throughput rests on **Distributed Caching** and **Custom Middleware**.

### Hierarchical Caching Tiers in Django
1. **Per-View Caching (`@cache_page`)**: Stores entire rendered HTML or JSON responses directly inside Redis, bypassing database hits entirely.
2. **Template Fragment Caching (`{% cache %}`)**: Selectively caches isolated blocks inside templates (such as static category sidebars).
3. **Low-Level Cache API (`cache.get / cache.set`)**: Offers surgical programmatic control over storing arbitrary Python structures in Redis paired with Time-To-Live (TTL) expiration.

### The Middleware Execution Pipeline
Middleware intercepts incoming HTTP requests prior to view execution and outgoing responses before delivery to browsers. Custom middleware enforces protective browser security headers (such as `X-Frame-Options: DENY` blocking Clickjacking) and instruments performance metrics.
''',
                'beginnerId': '''Bayangkan papan pengumuman jadwal pelajaran di lobi sekolah. Daripada setiap siswa harus mengetuk pintu ruang kepala sekolah untuk bertanya jadwal hari ini (menghantam database), sekolah menempelkan jadwal tersebut di papan pengumuman lobi (Redis Cache). Dan satpam di gerbang sekolah (Middleware) selalu memeriksa apakah setiap siswa memakai seragam lengkap sebelum diizinkan masuk.''',
                'beginnerEn': '''Imagine a bulletin board at an academy entrance. Rather than each pupil knocking on the principal's office door to ask for daily schedules (hitting the database), the school posts the schedule on the front bulletin board (Redis Cache). And the front gate security officer (Middleware) verifies students wear verified uniform badges before entering.''',
                'experimentsId': [
                    'Panggil fungsi `get_popular_courses_cached()` dua kali dan amati panggilan kedua langsung menghasilkan pesan `[CACHE HIT]`.',
                    'Gunakan perintah `python manage.py check --deploy` untuk memeriksa audit keamanan pengaturan produksi Django.',
                    'Periksa header HTTP menggunakan cURL dan buktikan header `X-Response-Time-Ms` tercetak dengan benar.',
                ],
                'experimentsEn': [
                    'Invoke `get_popular_courses_cached()` twice and observe the second invocation triggering a clean `[CACHE HIT]`.',
                    'Run `python manage.py check --deploy` to audit production security configurations.',
                    'Audit HTTP response headers via cURL verifying the `X-Response-Time-Ms` diagnostic header is present.',
                ],
                'challengeId': 'Buat sinyal `post_save` pada model Course yang secara otomatis memanggil `cache.delete("lms:popular_courses:v1")` setiap kali data kursus diubah oleh admin.',
                'challengeEn': 'Build a `post_save` model signal on Course that automatically calls `cache.delete("lms:popular_courses:v1")` whenever course details update.',
                'summaryId': 'Kamu telah menguasai Redis Caching, Custom Middleware, dan Security Hardening. Minggu depan adalah Capstone Final: Multi-Tenant Subscription LMS Platform Production-Ready!',
                'summaryEn': 'You have mastered Redis Caching, Custom Middleware, and Security Hardening. Next week is our Final Capstone: Production-Ready Multi-Tenant Subscription LMS Platform!',
            },

            # Week 10
            {
                'week': 10,
                'level': 'advanced',
                'levelNameId': 'Lanjutan',
                'levelNameEn': 'Advanced',
                'topicId': 'capstone-subscription-lms',
                'titleId': 'Capstone: Platform LMS Langganan Multi-Tenant Skala Penuh Production-Ready',
                'titleEn': 'Capstone: Production-Ready Full-Scale Multi-Tenant Subscription LMS Platform',
                'programId': 'Platform LMS Lengkap (Django 5, DRF, Stripe Webhook, Celery & Docker Compose)',
                'programEn': 'Complete LMS Platform (Django 5, DRF, Stripe Webhook, Celery & Docker Compose)',
                'language': 'python',
                'code': '''# Arsitektur Capstone Platform LMS Berlangganan Production-Ready
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction
import json

# 1. Stripe Payment Webhook: Konfirmasi Pembayaran Langganan Siswa Otomatis
@csrf_exempt
def stripe_webhook_handler(request):
    if request.method != "POST":
        return HttpResponse(status=405)

    payload = request.body
    # Dalam implementasi nyata: verifikasi cryptographic signature header stripe-signature
    # sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')

    try:
        event = json.loads(payload)
    except ValueError:
        return HttpResponse(status=400)

    # Tangani Event Pembayaran Sukses (checkout.session.completed)
    if event.get("type") == "checkout.session.completed":
        session = event["data"]["object"]
        customer_email = session.get("customer_email")
        course_id = session.get("metadata", {}).get("course_id")

        print(f"[STRIPE WEBHOOK] Pembayaran lunas diterima dari: {customer_email} untuk Kursus #{course_id}")
        
        # Eksekusi Aktivasi Langganan secara Atomik
        with transaction.atomic():
            # 1. Cari user dan buat record Enrollment
            # 2. Kirim email selamat datang via Celery worker
            print(f"[ENROLLMENT ACTIVATED] Siswa {customer_email} resmi mendapatkan akses penuh ke materi!")

        return JsonResponse({"status": "SUCCESS", "message": "Subscription enrolled successfully."})

    return JsonResponse({"status": "IGNORED"})

# 2. Health Check Endpoint untuk Kubernetes / Docker Swarm Liveness Probe
def healthz_probe(request):
    return JsonResponse({
        "status": "healthy",
        "service": "tryngo-lms-platform",
        "version": "5.1.0",
        "database": "connected",
        "cache": "redis-active"
    })

print("=== TRYNGO PRODUCTION MULTI-TENANT SUBSCRIPTION LMS INITIALIZED ===")
print("Siap melayani pendaftaran siswa, pembayaran Stripe webhook, dan video streaming.")
''',
                'objectivesId': [
                    'Mengintegrasikan seluruh ekosistem: Django 5.1, DRF, PostgreSQL, Celery, Redis, dan Stripe Webhooks.',
                    'Membangun penanganan Webhook pembayaran e-commerce yang aman dan idempotent.',
                    'Mengonfigurasi endpoint `/healthz` untuk probe liveness/readiness klaster container Kubernetes.',
                    'Menyiapkan arsitektur monolitik modern yang siap dideploy menggunakan Docker Compose dan Nginx reverse proxy.',
                ],
                'objectivesEn': [
                    'Integrate the complete ecosystem: Django 5.1, DRF, PostgreSQL, Celery, Redis, and Stripe Webhooks.',
                    'Build secure, idempotent e-commerce payment webhook handlers.',
                    'Configure `/healthz` endpoints for Kubernetes container cluster liveness/readiness probes.',
                    'Ship an enterprise-ready modern monolith configured for Docker Compose and Nginx reverse proxies.',
                ],
                'explanationId': '''Selamat! Anda telah mencapai proyek Capstone akhir kurikulum Django Web Framework. Sistem ini menyatukan seluruh kemampuan Django modern ke dalam satu platform Learning Management System (LMS) berlangganan yang tangguh, aman, dan siap diproduksi.

### Penanganan Webhook Pembayaran Idempotent
Ketika siswa menyelesaikan pembayaran di Stripe atau Midtrans, payment gateway mengirim HTTP POST ke endpoint `/webhooks/stripe/`. Karena webhook tidak dikirim melalui browser pengguna, endpoint ini dibebaskan dari CSRF (`@csrf_exempt`). Setiap mutasi pendaftaran dijalankan di dalam blok `transaction.atomic()` untuk menjamin tidak ada aktivasi langganan ganda saat terjadi retry pengiriman webhook.

### Observability dan Kesiapan Cloud
Platform dilengkapi dengan endpoint `/healthz` yang memverifikasi kesiapan koneksi database PostgreSQL dan antrean Celery Redis, memungkinkan orchestrator cloud seperti Kubernetes atau Docker Swarm melakukan self-healing secara otomatis saat terjadi gangguan jaringan.
''',
                'explanationEn': '''Congratulations! You have reached the Capstone project. This application synthesizes modern Django 5.1 engineering patterns into an enterprise, production-ready subscription Learning Management System (LMS).

### Idempotent Payment Webhook Ingestion
When students settle invoices via Stripe or Midtrans, payment gateways issue asynchronous HTTP POST notifications to `/webhooks/stripe/`. Because webhooks originate outside browser sessions, the route bypasses standard CSRF (`@csrf_exempt`). Mutations execute within `transaction.atomic()` blocks, guaranteeing idempotency during provider network retries.

### Observability & Cloud Readiness
The platform exposes a native `/healthz` probe auditing PostgreSQL connection pools and Redis Celery availability, empowering cloud orchestrators like Kubernetes or Docker Swarm to conduct automated self-healing.
''',
                'beginnerId': '''Proyek ini ibarat universitas digital internasional lengkap. Ada gerbang pendaftaran yang menerima pembayaran dari bank mana pun di dunia (Stripe Webhook), ada gedung kelas digital tempat siswa belajar dengan nyaman (DRF & Video Streaming), perpustakaan materi yang selalu rapi dan cepat dibuka (Redis Caching), dan staf administrasi yang otomatis mencetak ijazah sertifikat begitu siswa lulus (Celery Workers).''',
                'beginnerEn': '''This project mirrors a digital global university. It features an automated bursar office receiving tuition from worldwide payment gateways (Stripe Webhook), state-of-the-art multimedia lecture halls (DRF & Video Streaming), a high-speed library reading room (Redis Caching), and an automated registrar printing diplomas upon graduation (Celery Workers).''',
                'experimentsId': [
                    'Kirim payload webhook Stripe simulasi menggunakan cURL dan amati status response 200 OK.',
                    'Buka browser ke `/healthz` dan pastikan payload status "healthy" dikembalikan.',
                    'Gunakan Stripe CLI (`stripe listen --forward-to localhost:8000/webhooks/stripe/`) untuk menguji alur pembayaran nyata.',
                ],
                'experimentsEn': [
                    'Dispatch a simulated Stripe webhook payload via cURL and inspect the 200 OK receipt.',
                    'Navigate to `/healthz` in your browser and verify the "healthy" payload.',
                    'Deploy the Stripe CLI (`stripe listen --forward-to localhost:8000/webhooks/stripe/`) to test live payment test-clocks.',
                ],
                'challengeId': 'Tambahkan penanganan event Stripe `customer.subscription.deleted` untuk secara otomatis mencabut hak akses kursus ketika siswa membatalkan langganan bulanan mereka.',
                'challengeEn': 'Add Stripe `customer.subscription.deleted` event handling to automatically revoke course access when students terminate monthly recurring subscriptions.',
                'summaryId': 'Selamat! Kamu telah menyelesaikan seluruh kurikulum Django Web Framework dari nol hingga platform LMS berlangganan multi-tenant berskala produksi!',
                'summaryEn': 'Congratulations! You have completed the entire Django Web Framework curriculum from zero to an enterprise production multi-tenant subscription LMS platform!',
            },
        ]
    }
