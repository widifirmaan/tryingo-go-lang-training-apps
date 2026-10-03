# Optimasi Performa ORM: Mitigasi N+1 Query & Transaksi Atomik

> **Kategori:** Django Web Framework | **Level:** Menengah | **Minggu 7:** Optimasi Performa ORM: Mitigasi N+1 Query & Transaksi Atomik
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengidentifikasi dan membasmi N+1 Query Problem pada Django ORM.
- Membedakan `select_related` (SQL JOIN untuk relasi single) vs `prefetch_related` (kueri terpisah untuk multi-relasi).
- Menggunakan `django.db.transaction.atomic` untuk menjamin integritas data ACID.
- Menerapkan `select_for_update()` untuk mencegah race condition pada alokasi kuota pendaftaran kursus.

---

## Program: Pelacak Progres Belajar Siswa Bebas N+1 Query dengan select_related & prefetch_related

```python
from django.db import transaction
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
    
    # optimized_qs = Course.objects.filter(is_published=True)\
    #     .select_related("instructor")\
    #     .prefetch_related(
    #         Prefetch("lessons", queryset=Lesson.objects.only("id", "title", "order"))
    #     )\
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
```

---

## Konsep Kunci

Salah satu kelemahan terbesar developer yang baru menggunakan ORM adalah ketidaktahuan atas kode SQL apa yang sebenarnya dieksekusi di balik layar. Kesalahan paling umum yang melumpuhkan server produksi adalah **N+1 Query Problem**.

### Memahami N+1 Query Problem
Jika Anda memiliki 50 kursus dan melakukan loop `for c in courses: print(c.instructor.name)`, Django akan menjalankan 1 kueri untuk mengambil 50 kursus, lalu **50 kueri tambahan** untuk mengambil instruktur dari masing-masing kursus (Total: 51 kueri database!). Jika ada 1.000 pengunjung bersamaan, database akan langsung mengalami downtime.

### Senjata Utama: select_related vs prefetch_related
1. **select_related**: Digunakan untuk relasi "single-valued" (ForeignKey atau OneToOne). Django menggabungkan tabel menggunakan **SQL INNER JOIN**, sehingga data instruktur dan kursus diambil sekaligus dalam **1 kueri tunggal**.
2. **prefetch_related**: Digunakan untuk relasi "multi-valued" (ManyToMany atau reverse ForeignKey seperti `course.lessons`). Django mengeksekusi 1 kueri tambahan menggunakan klausa SQL `IN (...)` dan menggabungkan datanya di memori Python.

### Transaksi Atomik (transaction.atomic)
Pendaftaran kursus melibatkan pemotongan saldo, pembuatan invoice, dan penambahan kuota. Jika koneksi terputus saat saldo sudah terpotong namun kuota belum bertambah, terjadi inkonsistensi fatal. Dengan membungkus kode di dalam `with transaction.atomic():`, seluruh operasi dijamin sukses bersama atau dibatalkan bersama (**Rollback**).


---

---

## Penjelasan untuk Pemula

Bayangkan Anda disuruh membeli 50 buku di toko buku. Cara N+1 kueri seperti orang bodoh yang pergi ke toko buku untuk membeli 1 buku, pulang ke rumah, lalu berangkat lagi ke toko buku untuk membeli buku ke-2, diulang 50 kali (50 kali bolak-balik). Cara select_related/prefetch_related seperti membawa daftar 50 buku sekaligus dan memasukkannya ke dalam 1 troli belanja dalam sekali jalan.

## Eksperimen

- Pasang `django-debug-toolbar` dan amati jumlah kueri SQL di browser dev console sebelum dan sesudah optimasi.
- Lemparkan `raise RuntimeError("Simulasi payment gateway down!")` di dalam blok `transaction.atomic()` dan buktikan enrollment tidak tersimpan di database.
- Gunakan method `.only("id", "title")` untuk membatasi kolom SQL yang diambil dari tabel database.

---

## Tantangan

Gunakan Django ORM `F()` expressions untuk memperbarui view count kursus secara atomik (`Course.objects.filter(id=x).update(views_count=F("views_count") + 1)`) tanpa mengalami race condition.

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

Kamu telah menguasai optimasi N+1 Query dengan select_related/prefetch_related dan transaksi atomik. Level 2 selesai! Di Level 3 kita mempelajari Celery, Caching, dan Capstone LMS.
