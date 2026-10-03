# Class-Based Views (CBV), URL Routing & Django Template Engine

> **Kategori:** Django Web Framework | **Level:** Pemula | **Minggu 3:** Class-Based Views (CBV), URL Routing & Django Template Engine

## Tujuan Pembelajaran

- Memahami perbedaan Function-Based Views (FBV) vs Class-Based Views (CBV).
- Menggunakan Generic CBV standar industri: `ListView` dan `DetailView`.
- Menguasai sintaks Django Template Language (DTL): inheritance (`{% extends %}`), loops, dan filter formatting.
- Mengonfigurasi URL dispatcher dengan slug parameters type-safe (`<slug:slug>`).

---

## Program: Katalog Kursus & Halaman Detail Materi dengan Generic Class-Based Views

```python
# Demonstrasi Views & URL Dispatcher (views.py & urls.py)
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
```

---

## Konsep Kunci

Alih-alih menulis kode berulang untuk mengambil data dari database, melakukan paginasi, dan me-render template HTML, Django menyediakan abstraksi **Generic Class-Based Views (CBV)**.

### Keunggulan Generic CBV
- **ListView**: Secara otomatis mengambil data dari model, menangani paginasi halaman (misal 6 item per halaman), dan mengirim data ke template dalam variabel `courses`.
- **DetailView**: Mengambil satu record data berdasarkan slug atau ID di URL, otomatis menampilkan halaman 404 jika record tidak ditemukan, dan memuat relasinya.

### Template Inheritance pada DTL
Django Template Language (DTL) menggunakan pola pewarisan template (`{% extends "base.html" %}`). File `base.html` memuat header, footer, navigasi, dan CSS framework. Halaman anak hanya perlu mengisi blok konten spesifik (`{% block content %}`), mengeliminasi duplikasi markup HTML.

### DTL Filters dan Keamanan XSS
DTL dilengkapi filter bawaan seperti `|truncatewords:20` untuk memotong teks panjang dan `|floatformat:0` untuk format angka. Secara default, seluruh variabel di DTL otomatis di-escape secara aman untuk mematikan celah serangan Cross-Site Scripting (XSS).


---

---

## Penjelasan untuk Pemula

Bayangkan cetakan koran. Halaman induk (base.html) sudah memiliki judul koran dan nomor halaman di bagian atas dan bawah. Anda hanya perlu meletakkan naskah artikel hari ini ke dalam kotak tengah (block content). Anda tidak perlu mendesain ulang seluruh halaman koran setiap kali menulis berita baru.

## Eksperimen

- Ubah nilai `paginate_by = 2` dan uji coba navigasi halaman `?page=2` di browser.
- Gunakan tag DTL `{% url "course_detail" course.slug %}` untuk menghasilkan link URL dinamis yang kebal terhadap perubahan path.
- Override method `get_context_data` untuk menambahkan daftar instruktur terpopuler ke dalam halaman katalog.

---

## Tantangan

Buat View pencarian `CourseSearchView(ListView)` yang memfilter kursus berdasarkan kata kunci query string `?q=python` menggunakan Q-objects (`Q(title__icontains=q) | Q(description__icontains=q)`).

---

## Ringkasan

Kamu telah menguasai Class-Based Views, URL routing, dan Django Template Language. Minggu depan kita mempelajari Forms, CSRF, dan sistem Autentikasi.
