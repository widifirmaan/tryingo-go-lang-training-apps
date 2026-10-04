# Task Queue Terdistribusi: Redis, Celery & Asynchronous Background Workers

> **Kategori:** Python Backend & Automation | **Level:** Lanjutan | **Minggu 8:** Task Queue Terdistribusi: Redis, Celery & Asynchronous Background Workers
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami arsitektur Distributed Task Queues (Producer, Message Broker, Worker).
- Menggunakan Redis sebagai message broker berlatensi rendah untuk task queuing.
- Memahami prinsip kerja Celery dan arsitektur Celery Beat untuk tugas periodik (cron).
- Menerapkan task idempotency dan retry mechanism dengan Dead Letter Queue (DLQ).

---

## Program: Antrean Pemrosesan NLP Sentimen Berita dengan Redis Task Broker

```python
import json
import time
import uuid

# Simulasi Antrean Tugas Berbasis Redis In-Memory
class InMemoryRedisQueue:
    def __init__(self):
        self._queue = []

    def lpush(self, queue_name: str, payload: str):
        self._queue.insert(0, payload)

    def rpop(self, queue_name: str):
        return self._queue.pop() if self._queue else None

    def qsize(self):
        return len(self._queue)

redis_broker = InMemoryRedisQueue()

# 1. Producer: Mengirim tugas scoring NLP ke antrean Redis
def enqueue_sentiment_task(ticker: str, headline: str) -> str:
    task_id = str(uuid.uuid4())
    task_payload = {
        "task_id": task_id,
        "ticker": ticker,
        "headline": headline,
        "enqueued_at": time.time()
    }
    
    redis_broker.lpush("nlp_sentiment_queue", json.dumps(task_payload))
    print(f"[PRODUCER] Tugas {task_id[:8]} untuk '{ticker}' berhasil didaftarkan ke antrean.")
    return task_id

# 2. Worker: Background process yang mengeksekusi analisis NLP berat
def run_nlp_worker_batch():
    print("\n[WORKER] Memulai proses konsumsi antrean latar belakang...")
    processed_count = 0

    while redis_broker.qsize() > 0:
        raw_msg = redis_broker.rpop("nlp_sentiment_queue")
        if not raw_msg:
            break

        task = json.loads(raw_msg)
        print(f"[WORKER] Memproses Task {task['task_id'][:8]} | Analisis Sentimen NLP: '{task['headline']}'...")
        
        # Simulasi komputasi NLP inferensi model AI selama 150ms
        time.sleep(0.15)
        
        score = 0.85 if "Rekor" in task['headline'] else -0.40
        print(f"[WORKER DONE] Task {task['task_id'][:8]} Selesai! Skor: {score:+.2f}")
        processed_count += 1

    print(f"[WORKER IDLE] Seluruh {processed_count} tugas dalam antrean telah selesai dikerjakan.")

# Eksekusi Demonstrasi
enqueue_sentiment_task("BTC-USD", "Bitcoin Cetak Rekor Tertinggi Baru Sepanjang Sejarah")
enqueue_sentiment_task("NVDA", "Penjualan Chip AI Mengalami Koreksi Jangka Pendek")
enqueue_sentiment_task("BBCA.JK", "Laba Bersih Kuartal Pertama Tumbuh Melampaui Estimasi")

run_nlp_worker_batch()
```

---

## Konsep Kunci

Model AI dan Natural Language Processing (NLP) membutuhkan waktu komputasi CPU/GPU yang signifikan (ratusan milidetik hingga beberapa detik). Endpoint API tidak boleh menahan koneksi HTTP pengguna saat model AI sedang menghitung skor sentimen.

### Arsitektur Task Queue Terdistribusi
Sistem dibagi menjadi tiga bagian independen:
1. **Producer (FastAPI)**: Menerima HTTP request, membuat task ID, memasukkan tugas ke broker dalam beberapa milidetik, dan langsung mengembalikan respons `HTTP 202 Accepted` ke pengguna.
2. **Message Broker (Redis)**: Menyimpan antrean tugas secara persisten dan thread-safe di memori.
3. **Consumers/Workers (Celery / Background Workers)**: Node pekerja terpisah yang terus memantau antrean, mengeksekusi model AI, dan menyimpan hasilnya ke database analitik.

### Tugas Periodik dengan Celery Beat
Selain tugas berbasis request pengguna, sistem intelijen pasar membutuhkan scraping rutin setiap 5 menit. **Celery Beat** bertindak sebagai scheduler (cron digital terdistribusi) yang memicu tugas crawling secara otomatis tepat waktu.

### Idempotensi Tugas (Task Idempotency)
Dalam jaringan terdistribusi, ada kemungkinan tugas yang sama dieksekusi dua kali karena timeout jaringan. Desain tugas yang baik harus bersifat **Idempotent**: menjalankan tugas yang sama berulang kali tidak boleh menghasilkan data duplikat atau efek samping ganda pada saldo/database.


---

---

## Penjelasan untuk Pemula

Bayangkan restoran pizza. Pelayan kasir (FastAPI) mencatat pesanan Anda dalam 30 detik dan memberikan Anda struk nomor antrean (Task ID). Kasir meletakkan slip pesanan di rak gantung dapur (Redis Broker). Koki di dapur (Celery Worker) mengambil slip tersebut dan memanggang pizza Anda tanpa membuat orang di kasir depan menunggu.

## Eksperimen

- Kirim 10 tugas sekaligus dan amati bagaimana worker menghabiskannya satu per satu secara berurutan.
- Simulasikan worker kedua yang bekerja secara paralel untuk mempercepat waktu penyelesaian total.
- Tambahkan field `status: PENDING | SUCCESS | FAILED` untuk memeriksa progres tugas via Task ID.

---

## Tantangan

Bangun sistem Task Dead-Letter Queue (DLQ): jika sebuah tugas gagal dieksekusi sebanyak 3 kali, otomatis pindahkan payload tugas ke antrean `nlp_dead_letters` untuk investigasi manual.

---

## Model Mental & Diagram Alur Visual

```diagram
┌──────────────────────────────────────────────────────────┐
│ SIKLUS EKSEKUSI PYTHON MODERN                            │
│                                                          │
│ Kode Sumber (.py)                                        │
│       │                                                  │
│       ▼ Bytecode Compiler                                │
│ File Cache (.pyc)                                        │
│       │                                                  │
│       ▼ Python Virtual Machine (PVM)                     │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ Global Interpreter Lock (GIL) / Memory Heap Manager  │ │
│ │ • Automatic Reference Counting + Cyclic Garbage Coll │ │
│ │ • Asyncio Event Loop untuk I/O Asinkron              │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `def fn(param: int) -> str:`
- **Fungsi Utama:** Definisi fungsi dengan type hinting modern.
- **Parameter / Atribut:** `Parameter list, Type Annotations, Return Type`.
- **Perilaku & Efek Sistem:** Mendeklarasikan fungsi dengan dokumentasi tipe data statis yang diverifikasi linter..
- **Contoh Penggunaan Praktis:**
```python
def calculate_tax(price: float, rate: float = 0.11) -> float:
    return round(price * rate, 2)
print(calculate_tax(100000.0))
```
- **Hasil Output yang Diharapkan:**
```output
11000.0
```

### 2. `[x * 2 for x in items if x > 0]`
- **Fungsi Utama:** List & Dictionary Comprehension.
- **Parameter / Atribut:** `Mapping expression, Iterable, Filter predicate`.
- **Perilaku & Efek Sistem:** Mentransformasi dan menyaring elemen koleksi secara ekspresif dalam 1 baris kode yang cepat..
- **Contoh Penggunaan Praktis:**
```python
numbers = [1, 2, 3, 4, 5, 6]
evens_squared = [n ** 2 for n in numbers if n % 2 == 0]
print(evens_squared)
```
- **Hasil Output yang Diharapkan:**
```output
[4, 16, 36]
```

### 3. `with open(filename, 'r') as f:`
- **Fungsi Utama:** Pengelola Konteks Otomatis (Context Manager).
- **Parameter / Atribut:** `Resource target, alias as`.
- **Perilaku & Efek Sistem:** Menjamin pembersihan resource (seperti menutup file atau koneksi DB) secara otomatis setelah blok selesai..
- **Contoh Penggunaan Praktis:**
```python
with open('data.txt', 'w') as f:
    f.write('Tryngo Platform')
# File otomatis ditutup dengan aman di sini
```
- **Hasil Output yang Diharapkan:**
```output
File tersimpan dan resource ditutup aman
```

### 4. `async def & await asyncio.gather(*tasks)`
- **Fungsi Utama:** Konkurensi asinkron non-blocking.
- **Parameter / Atribut:** `Coroutines, asyncio Event Loop`.
- **Perilaku & Efek Sistem:** Mengeksekusi banyak panggilan I/O jaringan secara paralel tanpa thread blocking..
- **Contoh Penggunaan Praktis:**
```python
import asyncio
async def fetch_api(n):
    await asyncio.sleep(0.1)
    return f'Hasil {n}'
# asyncio.run(fetch_api(1))
```
- **Hasil Output yang Diharapkan:**
```output
Coroutines tereksekusi tanpa memblokir thread utama
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Default Parameter Bersifat Mutable (List/Dict)
- **Gejala / Masalah:** Nilai default yang diubah pada panggilan pertama akan terbawa ke panggilan fungsi berikutnya.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `None` sebagai nilai default: `def fn(items=None): if items is None: items = []`.

### 2. Salah Paham Scope Variabel Global di dalam Fungsi
- **Gejala / Masalah:** Melempar error `UnboundLocalError: local variable referenced before assignment`.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan kata kunci `global` secara hati-hati atau lebih baik oper nilai sebagai parameter dan return value.

### 3. Menangkap Exception Terlalu Luas (`except:`)
- **Gejala / Masalah:** Menyembunyikan error syntax, `KeyboardInterrupt`, atau bug kritis sistem.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu sebutkan exception spesifik: `except ValueError as err:`.

---

## Ringkasan

Kamu telah menguasai Distributed Task Queues dengan Redis dan Celery workers. Minggu depan kita mempelajari arsitektur pengujian otomatis asinkron dengan Pytest.
