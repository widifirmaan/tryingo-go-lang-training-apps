# FastAPI & Pydantic v2: Validasi Performa Tinggi & REST API Asinkron

> **Kategori:** Python Backend & Automation | **Level:** Menengah | **Minggu 5:** FastAPI & Pydantic v2: Validasi Performa Tinggi & REST API Asinkron
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami keunggulan Pydantic v2 yang ditenagai Rust (`pydantic-core`) untuk validasi data berkecepatan 5-10x lebih cepat.
- Menggunakan `Field`, `Annotated`, dan `@field_validator` untuk validasi dan normalisasi payload.
- Membangun REST API asinkron non-blocking dengan FastAPI.
- Menghasilkan dokumentasi interaktif OpenAPI (Swagger & Redoc) secara otomatis.

---

## Program: REST API Ingesti Sentimen Pasar Keuangan dengan Validasi Pydantic v2

```python
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field, field_validator
from decimal import Decimal
from datetime import datetime, timezone
from typing import Annotated

app = FastAPI(
    title="Financial Market Sentiment API",
    version="1.0.0",
    description="Engine ingesti dan validasi sentimen pasar real-time"
)

# Pydantic v2 Model (Didukung oleh Rust Core pydantic-core untuk kecepatan maksimal)
class SentimentScorePayload(BaseModel):
    ticker: Annotated[str, Field(min_length=2, max_length=12, examples=["AAPL", "BTC-USD"])]
    sentiment_score: Annotated[float, Field(ge=-1.0, le=1.0, description="Skor sentimen antara -1.0 (sangat bearish) hingga +1.0 (sangat bullish)")]
    source_outlet: str = Field(..., min_length=3)
    headline_text: str = Field(..., max_length=280)
    confidence: float = Field(default=0.85, ge=0.0, le=1.0)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    @field_validator("ticker")
    @classmethod
    def normalize_ticker(cls, v: str) -> str:
        return v.strip().upper()

class SentimentResponse(BaseModel):
    id: str
    ticker: str
    classification: str
    processed_at: datetime

# In-Memory Storage untuk demonstrasi
db_records: dict[str, SentimentScorePayload] = {}

@app.post("/api/v1/sentiments", response_model=SentimentResponse, status_code=status.HTTP_201_CREATED)
async def ingest_sentiment(payload: SentimentScorePayload):
    classification = "BULLISH" if payload.sentiment_score > 0.2 else ("BEARISH" if payload.sentiment_score < -0.2 else "NEUTRAL")
    
    record_id = f"SENT-{len(db_records) + 1:04d}"
    db_records[record_id] = payload

    return SentimentResponse(
        id=record_id,
        ticker=payload.ticker,
        classification=classification,
        processed_at=datetime.now(timezone.utc)
    )

@app.get("/api/v1/sentiments/{record_id}", response_model=SentimentScorePayload)
async def get_sentiment(record_id: str):
    if record_id not in db_records:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Record sentimen dengan ID '{record_id}' tidak ditemukan."
        )
    return db_records[record_id]
```

---

## Konsep Kunci

FastAPI telah menjadi framework backend Python paling populer di dunia untuk AI, data science, dan microservices berkat arsitekturnya yang sepenuhnya asinkron dan terintegrasi mendalam dengan Pydantic.

### Pydantic v2 dan Core Rust
Pydantic v2 menulis ulang seluruh mesin validasi dan parsing datanya dalam bahasa Rust (`pydantic-core`). Hasilnya, parsing JSON dan validasi tipe data berjalan 5 hingga 20 kali lebih cepat daripada Pydantic v1, mendekati kecepatan parser bahasa terkompilasi seperti Go atau Java.

### Deklarasi Validasi dengan Field dan Annotated
Dengan memanfaatkan fitur `Annotated[T, Field(...)]`, kita dapat mendefinisikan batasan data langsung pada tipe data (misal nilai skor sentimen harus di antara `-1.0` dan `1.0`). Jika klien mengirimkan nilai di luar range tersebut, FastAPI otomatis menghasilkan respons `HTTP 422 Unprocessable Entity` lengkap dengan deskripsi error JSON yang jelas tanpa kita perlu menulis kode validasi manual.

### Otomatisasi OpenAPI Swagger
Setiap endpoint FastAPI secara otomatis dipetakan ke spesifikasi OpenAPI 3.1 standar industri. Pengembang dapat membuka URL `/docs` di browser untuk langsung menguji endpoint menggunakan antarmuka grafis Swagger UI.


---

---

## Penjelasan untuk Pemula

Bayangkan loket pemeriksaan imigrasi otomatis di bandara. Mesin pemindai (Pydantic v2) memeriksa paspor Anda dalam 0,1 detik. Jika tanggal berlaku paspor sudah lewat atau foto tidak jelas, mesin langsung menolak Anda dengan lampu merah dan tiket instruksi tanpa membebani petugas imigrasi manual.

## Eksperimen

- Kirim payload POST dengan `sentiment_score: 1.5` dan amati struktur pesan error validasi HTTP 422.
- Kirim ticker dengan huruf kecil `aapl` dan buktikan `@field_validator` otomatis mengubahnya menjadi `AAPL`.
- Buka antarmuka Swagger UI di browser pada `http://localhost:8000/docs`.

---

## Tantangan

Tambahkan endpoint `GET /api/v1/sentiments/aggregate?ticker=AAPL` yang menghitung rata-rata skor sentimen tertimbang berdasarkan nilai confidence dari seluruh entri tersimpan.

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

Kamu telah menguasai FastAPI, Pydantic v2, dan validasi data berkecepatan tinggi. Minggu depan kita menghubungkan basis data analitik secepat kilat dengan DuckDB.
