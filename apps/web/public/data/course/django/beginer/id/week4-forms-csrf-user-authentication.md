# Formulir Aman: ModelForm, Proteksi CSRF & Django Authentication

> **Kategori:** Django Web Framework | **Level:** Pemula | **Minggu 4:** Formulir Aman: ModelForm, Proteksi CSRF & Django Authentication
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami peran `ModelForm` dalam menghubungkan formulir HTML dengan model database secara otomatis.
- Menerapkan proteksi Cross-Site Request Forgery (CSRF) menggunakan token `{% csrf_token %}`.
- Menulis validasi kustom formulir dengan method `clean_<field>()`.
- Mengamankan halaman aplikasi menggunakan decorator `@login_required` dan sistem autentikasi bawaan Django.

---

## Program: Formulir Ulasan Kursus & Alur Pendaftaran Siswa dengan ModelForm

```python
from django import forms
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
```

---

## Konsep Kunci

Memproses input formulir dari browser pengguna secara manual adalah pekerjaan rawan bug dan bahaya keamanan. Django Forms menangani rendering formulir, validasi tipe data, pembersihan input (cleaning), dan perlindungan keamanan secara terpadu.

### Keharusan Token CSRF ({% csrf_token %})
Serangan **CSRF (Cross-Site Request Forgery)** terjadi ketika situs jahat memperdaya browser pengguna yang sedang login untuk mengirimkan request mutasi data rahasia. Django mewajibkan tag `{% csrf_token %}` di dalam setiap form POST. Token kriptografis ini diverifikasi oleh middleware Django; jika token tidak cocok atau absen, request langsung ditolak dengan status HTTP 403 Forbidden.

### Metode Pembersihan clean_<field>()
Ketika method `form.is_valid()` dipanggil, Django menjalankan serangkaian validasi. Kita dapat menambahkan aturan validasi bisnis kustom (seperti mendeteksi spam kata-kata terlarang) dengan mendefinisikan method `clean_comment()`. Data yang telah lolos validasi dapat diakses secara aman melalui dictionary `form.cleaned_data`.

### Sistem Autentikasi Bawaan (django.contrib.auth)
Django menyertakan model `User`, hashing password berstandar industri (PBKDF2 dengan SHA-256), session management, dan sistem izin (permissions). Decorator `@login_required` memastikan bahwa hanya pengguna yang sudah login yang dapat mengakses halaman pengiriman ulasan atau pembelajaran.


---

---

## Penjelasan untuk Pemula

Bayangkan formulir transfer bank fisik. Anda harus membubuhkan stempel hologram bank anti-palsu ({% csrf_token %}). Petugas loket (clean_comment) memeriksa apakah formulir Anda dicoret-coret atau menggunakan kata kasar. Jika Anda belum menunjukkan kartu tanda pengenal nasabah (@login_required), Anda disuruh mengantre di loket pembuatan akun terlebih dahulu.

## Eksperimen

- Hapus tag `{% csrf_token %}` dari form dan amati penolakan HTTP 403 CSRF Verification Failed.
- Kirim ulasan yang memuat kata "spam" dan amati pesan error validasi muncul di bawah kolom input komentar.
- Gunakan generic view `django.contrib.auth.views.LoginView` untuk membuat halaman login dalam 5 baris kode.

---

## Tantangan

Buat formulir registrasi siswa baru `StudentSignUpForm` yang mewarisi `UserCreationForm`, menambahkan field wajib `full_name` dan `phone_number`.

---

## Model Mental & Diagram Alur Visual

```diagram
┌──────────────┐     Call Stack Kosong?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Pemeriksa)   │
└──────┬───────┘                             └───────▲────────┘
       │ Operasi Async (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Selesai ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `const / let variabel`
- **Fungsi Utama:** Deklarasi variabel modern lingkup blok (Block Scope).
- **Parameter / Atribut:** `Identifier, Initial Value`.
- **Perilaku & Efek Sistem:** `const` untuk referensi konstan yang tidak dapat di-reassign; `let` untuk variabel nilai dinamis.
- **Contoh Penggunaan Praktis:**
```javascript
const appName = 'Tryngo';
let counter = 0;
counter += 1;
console.log(appName, counter);
```
- **Hasil Output yang Diharapkan:**
```text
Tryngo 1
```

### 2. `() => { ... } (Arrow Function)`
- **Fungsi Utama:** Sintaks fungsi ringkas dengan lexical 'this'.
- **Parameter / Atribut:** `Parameters, Function Body`.
- **Perilaku & Efek Sistem:** Menyederhanakan penulisan fungsi dan mempertahankan konteks `this` dari lingkup pembungkus luar.
- **Contoh Penggunaan Praktis:**
```javascript
const multiply = (a, b) => a * b;
console.log(multiply(6, 7));
```
- **Hasil Output yang Diharapkan:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Fungsi Utama:** Penanganan operasi asinkron berbasis Promise.
- **Parameter / Atribut:** `URL string, RequestInit options`.
- **Perilaku & Efek Sistem:** Menulis kode asinkron dengan alur linier layaknya kode sinkron tanpa callback hell.
- **Contoh Penggunaan Praktis:**
```javascript
async function fetchUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  const data = await res.json();
  return data;
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan objek data JSON terurai dari server
```

### 4. `Array.prototype.map() / filter()`
- **Fungsi Utama:** Transformasi array fungsional tanpa mutasi data asal.
- **Parameter / Atribut:** `callback(item, index, array)`.
- **Perilaku & Efek Sistem:** `map` menghasilkan array baru dari hasil transformasi; `filter` menyaring elemen berdasarkan kondisi boolean.
- **Contoh Penggunaan Praktis:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubledEvens = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2);
console.log(doubledEvens);
```
- **Hasil Output yang Diharapkan:**
```text
[4, 8]
```


---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Lupa Menjalankan Migration setelah Mengubah Model
- **Gejala / Masalah:** Database tidak sinkron dengan kode Python, memicu error `ProgrammingError: relation does not exist`.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu jalankan `python manage.py makemigrations` lalu `python manage.py migrate`.

### 2. N+1 Query Problem di Django ORM
- **Gejala / Masalah:** Template me-render list dengan mengeksekusi query database berulang kali untuk setiap relasi.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `select_related()` untuk Foreign Key satu-ke-satu dan `prefetch_related()` untuk Many-to-Many.

### 3. Expose SECRET_KEY atau DEBUG=True di Produksi
- **Gejala / Masalah:** Informasi credential rentan dibobol dan halaman debug menampilkan variabel lingkungan.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Simpan rahasia di environment variable dan pastikan `DEBUG = False` di lingkungan produksi.

---

## Ringkasan

Kamu telah menguasai ModelForm, validasi data, proteksi CSRF, dan sistem Autentikasi. Level 1 selesai! Di Level 2 kita masuk ke Django REST Framework dan optimasi ORM.
