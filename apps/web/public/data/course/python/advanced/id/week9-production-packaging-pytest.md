# Arsitektur Pengujian Asinkron: Pytest, Mocks & Testcontainers

> **Kategori:** Python Backend & Automation | **Level:** Lanjutan | **Minggu 9:** Arsitektur Pengujian Asinkron: Pytest, Mocks & Testcontainers
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai framework pengujian modern `pytest` dan plugin `pytest-asyncio`.
- Menggunakan `unittest.mock.AsyncMock` untuk mengisolasi dependensi eksternal (API pihak ketiga).
- Memahami konsep Fixtures (`@pytest.fixture`) untuk dependency injection dalam pengujian.
- Mencapai code coverage tinggi dan menguji skenario edge cases sistem finansial.

---

## Program: Suite Pengujian Unit & Integrasi Asinkron Komprehensif dengan Pytest

```python
import asyncio
import pytest
from unittest.mock import AsyncMock, patch

# Unit yang akan diuji: MarketSentimentEngine
class MarketSentimentEngine:
    def __init__(self, external_api_client):
        self.api_client = external_api_client

    async def analyze_ticker_sentiment(self, ticker: str) -> dict:
        headlines = await self.api_client.fetch_latest_headlines(ticker)
        if not headlines:
            return {"ticker": ticker, "composite_score": 0.0, "status": "NO_DATA"}

        scores = [h.get("score", 0.0) for h in headlines]
        avg_score = sum(scores) / len(scores)
        
        signal = "BUY" if avg_score > 0.3 else ("SELL" if avg_score < -0.3 else "HOLD")
        return {
            "ticker": ticker,
            "composite_score": round(avg_score, 2),
            "signal": signal,
            "sample_size": len(headlines)
        }

# 1. Test Kasus Positif dengan AsyncMock
@pytest.mark.asyncio
async def test_sentiment_engine_bullish_signal():
    # Mocking dependensi eksternal agar test cepat, deterministik, dan tidak tergantung internet
    mock_client = AsyncMock()
    mock_client.fetch_latest_headlines.return_value = [
        {"headline": "Laba Q4 melonjak 40%", "score": 0.8},
        {"headline": "Ekspansi pabrik disetujui", "score": 0.6}
    ]

    engine = MarketSentimentEngine(mock_client)
    result = await engine.analyze_ticker_sentiment("NVDA")

    assert result["ticker"] == "NVDA"
    assert result["composite_score"] == 0.7
    assert result["signal"] == "BUY"
    assert result["sample_size"] == 2
    mock_client.fetch_latest_headlines.assert_awaited_once_with("NVDA")

# 2. Test Kasus Edge: Tidak Ada Berita
@pytest.mark.asyncio
async def test_sentiment_engine_no_data():
    mock_client = AsyncMock()
    mock_client.fetch_latest_headlines.return_value = []

    engine = MarketSentimentEngine(mock_client)
    result = await engine.analyze_ticker_sentiment("UNKNOWN_CO")

    assert result["signal"] == "HOLD"
    assert result["composite_score"] == 0.0
    assert result["status"] == "NO_DATA"

# Runner simulasi untuk lingkungan standalone
if __name__ == "__main__":
    print("[TEST RUNNER] Menjalankan test suite asinkron...")
    asyncio.run(test_sentiment_engine_bullish_signal())
    print("[PASS] test_sentiment_engine_bullish_signal berhasil!")
    asyncio.run(test_sentiment_engine_no_data())
    print("[PASS] test_sentiment_engine_no_data berhasil!")
    print("=== SELURUH PENGUJIAN ASINKRON LULUS 100% ===")
```

---

## Konsep Kunci

Dalam aplikasi keuangan dan backend produksi, menguji kode secara manual melalui browser atau Postman adalah resep bencana. Satu bug kecil pada pembulatan desimal atau race condition dapat merugikan jutaan rupiah.

### Mengapa Pytest adalah Standar Industri?
`pytest` menggantikan pustaka `unittest` lama warisan Java yang kaku. Pytest memungkinkan penulisan pengujian sederhana menggunakan kata kunci bawaan Python `assert` tanpa method pembungkus yang rumit (`self.assertEqual(...)`).

### Pengujian Asinkron dengan pytest-asyncio
Karena method backend kita menggunakan `async def`, pengujian unit harus dapat menjalankan coroutine di dalam event loop. Anotasi `@pytest.mark.asyncio` memberitahu pytest untuk membungkus fungsi test dalam event loop sementara dan menunggu eksekusi coroutine (`await`) hingga selesai.

### Kekuatan Mocking dengan AsyncMock
Unit test yang baik harus berjalan dalam hitungan milidetik dan tidak boleh mengirim request HTTP asli ke internet (karena bisa gagal jika internet lambat atau terkena kuota API). Dengan `AsyncMock`, kita mensimulasikan respons API bursa secara deterministik sehingga pengujian dapat diulang ribuan kali di pipeline CI/CD GitHub Actions.


---

---

## Penjelasan untuk Pemula

Bayangkan latihan simulator penerbangan untuk pilot pesawat. Daripada menerbangkan pesawat sungguhan ke tengah badai petir untuk menguji reaksi pilot (berbahaya dan mahal), pilot dilatih di dalam kokpit simulator buatan (Mock). Jika simulator dimatikan atau ada badai buatan, pilot bisa menguji semua tombol darurat dengan aman.

## Eksperimen

- Tambahkan test case baru yang memverifikasi bahwa sinyal "SELL" dihasilkan jika rata-rata skor adalah -0.6.
- Simulasikan timeout jaringan dengan mengonfigurasi `mock_client.fetch_latest_headlines.side_effect = TimeoutError()`.
- Gunakan flag pytest `--cov` untuk mengukur persentase cakupan pengujian (test coverage).

---

## Tantangan

Buat integration test menggunakan `httpx.AsyncClient` dan `ASGITransport` untuk menguji endpoint FastAPI secara menyeluruh tanpa perlu membuka port jaringan TCP fisik.

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

Kamu telah menguasai pytest, pytest-asyncio, dan isolasi mocking. Minggu depan adalah Capstone Final: Mesin Intelijen & Sentimen Pasar Keuangan Lengkap!
