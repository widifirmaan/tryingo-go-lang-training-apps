# Tugas Latar Belakang: Django Signals, Celery & Redis Message Broker

> **Kategori:** Django Web Framework | **Level:** Lanjutan | **Minggu 8:** Tugas Latar Belakang: Django Signals, Celery & Redis Message Broker
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami pola Publish-Subscribe internal Django menggunakan Signals (`post_save`, `pre_delete`).
- Mengintegrasikan Celery dengan message broker Redis untuk tugas background asinkron.
- Memahami method `.delay()` dan `.apply_async()` untuk melepaskan beban pemrosesan berat dari request web.
- Menerapkan retry mechanism dan dead-letter handling pada tugas Celery yang gagal.

---

## Program: Generator Sertifikat PDF Kelulusan Siswa Asinkron dengan Sinyal & Celery Worker

```python
# Demonstrasi Celery Tasks & Django Signals (tasks.py & signals.py)
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
```

---

## Konsep Kunci

Operasi yang memakan waktu komputasi intensif (seperti menghasilkan file PDF bersertifikat digital, mengirim email massal, atau memproses kompresi video) tidak boleh dijalankan di dalam siklus request-response HTTP Django. Jika dijalankan langsung, koneksi browser pengguna akan macet dan server akan mengalami timeout.

### Django Signals
Django Signals memungkinkan komponen aplikasi yang berbeda saling berkomunikasi secara terlepas (decoupled). Sinyal bawaan seperti `post_save` dipancarkan secara otomatis setiap kali sebuah model disimpan ke database. Kita dapat mendaftarkan receiver function yang bereaksi terhadap perubahan status kelulusan siswa.

### Arsitektur Celery & Redis
**Celery** adalah distributed task queue standar industri untuk Python.
1. **Producer (Django View/Signal)**: Memanggil `generate_completion_certificate_pdf.delay(student_id, course_id)`. Panggilan ini hanya memakan waktu 2 milidetik untuk memasukkan pesan JSON ke dalam antrean Redis.
2. **Broker (Redis)**: Menyimpan antrean tugas secara persisten di memori.
3. **Worker (Celery Process)**: Proses terpisah di background yang mengambil tugas dari Redis, me-render file PDF, dan mengunggahnya ke cloud storage (AWS S3). Pengguna menerima respons web secara instan tanpa menunggu pembuatan PDF selesai.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda memesan jas pengantin di penjahit pakaian. Kasir penjahit (Django View) menerima pesanan Anda dalam 2 menit dan memberikan Anda nomor nota. Kasir tidak langsung menjahit jas Anda di depan mata Anda sambil Anda disuruh menunggu berdiri selama 3 hari. Kasir meletakkan nota di meja ruang jahit (Redis), dan tim penjahit di ruang belakang (Celery Worker) yang menyelesaikannya secara tenang.

## Eksperimen

- Jalankan Celery worker di terminal menggunakan perintah `celery -A lms_project worker -l info`.
- Uji coba pemanggilan `.delay()` dan perhatikan bagaimana terminal Celery worker langsung mencetak log eksekusi.
- Konfigurasikan Celery Beat untuk menjalankan tugas pengecekan langganan kadaluarsa setiap tengah malam.

---

## Tantangan

Konfigurasikan task retry otomatis di Celery dengan Exponential Backoff: jika pengunggahan PDF ke cloud storage gagal karena masalah jaringan, coba ulang sebanyak 3 kali.

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

Kamu telah menguasai Django Signals, Celery background workers, dan Redis broker. Minggu depan kita mempelajari Caching dan Security Hardening.
