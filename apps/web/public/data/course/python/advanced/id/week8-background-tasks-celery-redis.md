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
