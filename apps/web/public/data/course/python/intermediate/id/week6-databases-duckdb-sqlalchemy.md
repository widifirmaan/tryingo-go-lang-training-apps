# Penyimpanan Analitik: DuckDB Embedded & Async SQLAlchemy 2.0

> **Kategori:** Python Backend & Automation | **Level:** Menengah | **Minggu 6:** Penyimpanan Analitik: DuckDB Embedded & Async SQLAlchemy 2.0
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami perbedaan arsitektur OLTP (PostgreSQL/MySQL) vs OLAP (DuckDB/ClickHouse).
- Menggunakan DuckDB sebagai database analitik kolumnar embedded berkecepatan tinggi.
- Memanfaatkan eksekusi kueri vectorized yang memanfaatkan SIMD CPU hardware.
- Menghubungkan analitik DuckDB dengan backend FastAPI untuk pembuatan dashboard instan.

---

## Program: Kueri Analitik OLAP Secepat Kilat pada Jutaan Data Tick dengan DuckDB

```python
import duckdb
import time

# Inisialisasi Database DuckDB (In-Memory atau File Tersemat)
con = duckdb.connect(database=":memory:")

print("=== MEMBUAT DATASET SENTIMEN PASAR DENGAN DUCKDB VECTORIZED ENGINE ===")
# Buat tabel analitik
con.execute("""
    CREATE TABLE market_sentiments (
        ticker VARCHAR,
        sentiment_score DOUBLE,
        source VARCHAR,
        confidence DOUBLE,
        recorded_at TIMESTAMP
    );
""")

# Masukkan 50.000 data sentimen secara instan menggunakan generator SQL DuckDB
con.execute("""
    INSERT INTO market_sentiments
    SELECT 
        CASE (random() * 3)::INT 
            WHEN 0 THEN 'BTC-USD'
            WHEN 1 THEN 'ETH-USD'
            WHEN 2 THEN 'BBCA.JK'
            ELSE 'NVDA'
        END AS ticker,
        (random() * 2 - 1)::DOUBLE AS sentiment_score,
        'BLOOMBERG_RSS' AS source,
        (0.7 + random() * 0.3)::DOUBLE AS confidence,
        NOW() - INTERVAL ((random() * 60)::INT) MINUTE AS recorded_at
    FROM generate_series(1, 50000);
""")

print("Berhasil menyuntikkan 50.000 baris data sentimen.")

# Jalankan Kueri Agregasi Analitik (OLAP)
start_query = time.perf_counter()

query_result = con.execute("""
    SELECT 
        ticker,
        COUNT(*) AS total_signals,
        ROUND(AVG(sentiment_score), 4) AS avg_sentiment,
        ROUND(AVG(confidence), 4) AS avg_confidence,
        SUM(CASE WHEN sentiment_score > 0.3 THEN 1 ELSE 0 END) AS bullish_count,
        SUM(CASE WHEN sentiment_score < -0.3 THEN 1 ELSE 0 END) AS bearish_count
    FROM market_sentiments
    GROUP BY ticker
    ORDER BY avg_sentiment DESC;
""").fetchall()

query_time_ms = (time.perf_counter() - start_query) * 1000

print(f"\n=== HASIL KUERI AGREGASI OLAP ({query_time_ms:.2f} ms) ===")
print(f"{'TICKER':<10} | {'TOTAL':<8} | {'AVG SENTIMENT':<14} | {'BULLISH':<8} | {'BEARISH':<8}")
print("-" * 60)
for row in query_result:
    print(f"{row[0]:<10} | {row[1]:<8} | {row[2]:<14} | {row[4]:<8} | {row[5]:<8}")
```

---

## Konsep Kunci

Ketika aplikasi menangani kueri analitik seperti menghitung rata-rata, agregasi, atau pengelompokan data dari jutaan baris, database tradisional (OLTP baris per baris seperti PostgreSQL) sering kali kewalahan dan membutuhkan indeks yang rumit.

### Apa itu DuckDB?
DuckDB sering dijuluki sebagai **"SQLite untuk Analytics"**. DuckDB adalah engine database kolumnar yang berjalan langsung di dalam proses aplikasi Python (in-process). Anda tidak perlu menginstal server eksternal, mengonfigurasi port jaringan, atau mengatur user permission.

### Arsitektur Kolumnar dan Eksekusi Vectorized
Berbeda dari database baris yang membaca seluruh kolom data saat melakukan kueri, DuckDB menyimpan data dalam format **kolom (Columnar Storage)**. Jika kueri Anda hanya membutuhkan kolom `sentiment_score` dan `ticker`, DuckDB hanya membaca dua kolom tersebut dari memori, mengabaikan kolom lainnya. Dengan eksekusi **Vectorized SIMD**, DuckDB dapat memproses jutaan baris angka dalam beberapa milidetik saja.

### Kapan Menggunakan DuckDB vs PostgreSQL?
- Gunakan **PostgreSQL/MySQL (OLTP)** untuk transaksi akun pengguna, order pembayaran, dan operasi atomik yang membutuhkan jaminan ACID ketat baris per baris.
- Gunakan **DuckDB (OLAP)** untuk agregasi data pasar, scoring sentimen historis, laporan metrik harian, dan query data berukuran gigabyte langsung dari file Parquet.


---

---

## Penjelasan untuk Pemula

Bayangkan sebuah perpustakaan raksasa. Database baris seperti pustakawan yang harus mengambil seluruh buku tebal hanya untuk membaca satu kata di halaman 50. Database kolumnar DuckDB seperti kliping digital yang hanya memotong kalimat yang Anda butuhkan, sehingga Anda bisa membaca ringkasan 50.000 buku dalam 2 detik.

## Eksperimen

- Ubah jumlah generate_series menjadi 500.000 data dan amati waktu kueri DuckDB yang tetap di bawah 50ms.
- Ekspor tabel DuckDB langsung ke file Apache Parquet menggunakan `COPY market_sentiments TO "data.parquet" (FORMAT PARQUET)`.
- Jalankan kueri SQL langsung ke atas file Parquet tanpa mengimpor tabel terlebih dahulu.

---

## Tantangan

Buat fungsi analitik DuckDB yang menghitung Exponential Moving Average (EMA) 14-periode dari skor sentimen menggunakan SQL Window Functions (`OVER (ORDER BY recorded_at ROWS BETWEEN 13 PRECEDING AND CURRENT ROW)`).

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
```text
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
```text
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
```text
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
```text
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

Kamu telah menguasai analitik kolumnar DuckDB dan eksekusi vectorized. Minggu depan kita membangun async web intelligence scraper dengan HTTPX dan Parsel.
