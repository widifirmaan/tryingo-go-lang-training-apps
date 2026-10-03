# Konkurensi Modern: Asyncio, Event Loop & TaskGroup di Python 3.11+

> **Kategori:** Python Backend & Automation | **Level:** Pemula | **Minggu 4:** Konkurensi Modern: Asyncio, Event Loop & TaskGroup di Python 3.11+
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami Event Loop, Coroutines, dan non-blocking I/O di Python.
- Menguasai Structured Concurrency modern dengan `asyncio.TaskGroup` (Python 3.11+).
- Menggunakan `asyncio.Semaphore` untuk rate limiting konkurensi request keluar.
- Mengetahui perbedaan antara `asyncio.gather` lama vs `asyncio.TaskGroup` yang aman dari error unhandled.

---

## Program: Crawler Data Pasar Asinkron Multi-Bursa dengan TaskGroup & Semaphore

```python
import asyncio
import time
from typing import NamedTuple

class TickerResult(NamedTuple):
    exchange: str
    symbol: str
    price: float
    latency_ms: float

# Batasi konkurensi maksimal 3 koneksi paralel bersamaan agar tidak terkena Rate Limit
rate_limiter = asyncio.Semaphore(3)

async def fetch_exchange_ticker(exchange: str, symbol: str) -> TickerResult:
    async with rate_limiter:
        start = time.perf_counter()
        print(f"[{exchange}] Memulai request harga untuk {symbol}...")
        
        # Simulasi latensi jaringan I/O non-blocking
        await asyncio.sleep(0.3)
        
        elapsed_ms = (time.perf_counter() - start) * 1000
        # Simulasi harga dummy
        simulated_price = 10500.0 if "BBCA" in symbol else 95000.0
        print(f"[{exchange}] SELESAI: {symbol} -> ${simulated_price:,.2f} ({elapsed_ms:.1f}ms)")
        
        return TickerResult(exchange, symbol, simulated_price, elapsed_ms)

async def main():
    exchanges = ["BINANCE", "COINBASE", "KRAKEN", "BYBIT", "OKX"]
    target_symbol = "BTC/USDT"

    print("=== MEMULAI CRAWLER ASINKRON DENGAN TASKGROUP (PYTHON 3.11+) ===")
    start_total = time.perf_counter()
    
    results: list[TickerResult] = []

    # Python 3.11+ Structured Concurrency dengan TaskGroup
    async with asyncio.TaskGroup() as tg:
        tasks = [
            tg.create_task(fetch_exchange_ticker(exch, target_symbol))
            for exch in exchanges
        ]

    for t in tasks:
        results.append(t.result())

    total_time = (time.perf_counter() - start_total) * 1000
    print(f"\n=== HASIL: Berhasil mengambil {len(results)} bursa dalam {total_time:.1f}ms ===")
    best_price = max(results, key=lambda r: r.price)
    print(f"Harga Tertinggi: ${best_price.price:,.2f} di {best_price.exchange}")

if __name__ == "__main__":
    asyncio.run(main())
```

---

## Konsep Kunci

Dalam pengembangan backend pengumpulan data (data crawling & market feeds), 99% waktu CPU habis hanya untuk menunggu respons jaringan eksternal (I/O bound). Menggunakan thread biasa memakan banyak memori, sedangkan asyncio mengeksekusi ribuan request di atas satu thread saja secara efisien.

### Event Loop dan Coroutines
Fungsi yang dideklarasikan dengan `async def` menghasilkan sebuah **Coroutine**. Ketika coroutine memanggil `await asyncio.sleep(...)` atau operasi I/O asinkron lainnya, coroutine menyerahkan kontrol kembali ke **Event Loop**. Event Loop segera menjalankan coroutine lain yang siap, sehingga tidak ada siklus CPU yang terbuang sia-sia.

### Structured Concurrency dengan asyncio.TaskGroup
Di Python versi sebelum 3.11, developer menggunakan `asyncio.gather()`. Namun jika salah satu tugas gagal melempar exception, tugas-tugas lainnya tetap berjalan liar di background (Orphaned Tasks). **TaskGroup** (diperkenalkan di Python 3.11) menerapkan Structured Concurrency: jika salah satu task di dalam blok `async with TaskGroup()` gagal, seluruh task saudara lainnya otomatis dibatalkan, dan error dikumpulkan dalam `ExceptionGroup`.

### Rate Limiting dengan Semaphore
Server eksternal biasanya membatasi jumlah koneksi konkuren maksimal (misalnya 3 koneksi per IP). Dengan membungkus panggilan dalam `async with rate_limiter:` menggunakan `asyncio.Semaphore(3)`, kita menjamin sistem tidak akan pernah membombardir server lawan melebihi kapasitas yang diizinkan.


---

---

## Penjelasan untuk Pemula

Bayangkan seorang juru masak di restoran yang harus memanggang 5 roti burger. Daripada berdiri diam menatap panggangan selama 3 menit menunggu roti matang baru memasak roti berikutnya, koki menaruh 5 roti ke atas panggangan sekaligus. Sambil menunggu roti matang (await), koki memotong sayur dan menyiapkan keju.

## Eksperimen

- Ubah nilai `Semaphore` dari 3 menjadi 1 dan amati bagaimana eksekusi berubah menjadi sekuensial.
- Lemparkan `raise ValueError("Bursa Bybit down!")` pada salah satu task dan amati penanganan ExceptionGroup di TaskGroup.
- Bandingkan waktu total jika 5 bursa dieksekusi secara sekuensial biasa (tanpa asyncio).

---

## Tantangan

Buat fungsi `async def fetch_with_retry(coro_fn, max_retries=3, backoff_factor=1.5)` yang secara otomatis mencoba ulang coroutine yang gagal dengan jeda waktu eksponensial asinkron.

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

Kamu telah menguasai asyncio, Event Loop, TaskGroup, dan Semaphores. Level 1 selesai! Di Level 2 kita membangun Web API dengan FastAPI, Pydantic v2, dan DuckDB.
