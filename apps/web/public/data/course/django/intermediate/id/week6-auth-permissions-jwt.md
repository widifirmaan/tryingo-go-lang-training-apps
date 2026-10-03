# Keamanan API: Stateless JWT (SimpleJWT) & Custom Permissions

> **Kategori:** Django Web Framework | **Level:** Menengah | **Minggu 6:** Keamanan API: Stateless JWT (SimpleJWT) & Custom Permissions
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengonfigurasi stateless authentication menggunakan JSON Web Token dengan `djangorestframework-simplejwt`.
- Memahami siklus hidup Access Token (umur pendek: 15 menit) dan Refresh Token (umur panjang: 7 hari).
- Membangun Custom Permission Classes dengan mewarisi `permissions.BasePermission`.
- Mengamankan konten video digital berbayar dari pembajakan dan akses tidak sah.

---

## Program: Proteksi Akses Materi Video Pelajaran Khusus Siswa Terdaftar dengan SimpleJWT

```python
# Menggunakan djangorestframework-simplejwt
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
```

---

## Konsep Kunci

Aplikasi mobile dan frontend SPA modern tidak menggunakan cookies berbasis sesi (session cookies) karena rentan terhadap pemblokiran pihak ketiga dan sulit diskalakan di klaster multi-server. Kita menggunakan **Stateless JWT (JSON Web Tokens)**.

### Cara Kerja SimpleJWT di Django
1. Pengguna mengirimkan username dan password ke endpoint `/api/token/`.
2. SimpleJWT mengembalikan dua token:
   - **Access Token**: Token umur pendek (misal 15 menit) yang disertakan pada setiap HTTP request di header `Authorization: Bearer <access_token>`.
   - **Refresh Token**: Token umur panjang yang disimpan aman di client untuk memperbarui access token baru saat kadaluarsa tanpa meminta pengguna login ulang.

### Custom Permissions (BasePermission)
Keamanan sejati bukan hanya mengecek apakah pengguna sudah login (`IsAuthenticated`), tetapi juga memverifikasi apakah pengguna berhak mengakses sumber daya spesifik (**Object-Level Permissions**). Dengan mengimplementasikan method `has_object_permission`, kita memeriksa kepemilikan kursus atau status pembayaran langganan secara terpusat dan elegan.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda pergi ke festival musik. Di loket depan Anda menukarkan tiket dengan gelang festival (Access Token). Gelang ini berlaku selama 1 hari. Untuk masuk ke tenda konser VIP (Custom Permission), petugas di depan tenda memindai barcode gelang Anda untuk memastikan Anda sudah membeli paket VIP, bukan sekadar tiket reguler.

## Eksperimen

- Kirim request ke `/api/token/` menggunakan cURL dan amati balikan `access` dan `refresh` token.
- Akses endpoint yang dilindungi tanpa header Authorization dan amati status 401 Unauthorized.
- Akses endpoint dengan user yang belum terdaftar dan amati pesan penolakan custom dari `IsEnrolledStudentOrInstructor`.

---

## Tantangan

Implementasikan sistem Token Blacklisting: ketika pengguna logout, masukkan refresh token ke dalam tabel blacklist database menggunakan `rest_framework_simplejwt.token_blacklist` sehingga token tidak bisa digunakan lagi.

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

Kamu telah menguasai SimpleJWT stateless authentication dan Custom Permissions. Minggu depan kita mempelajari optimasi kueri ORM dan mitigasi N+1 Problem.
