# Arsitektur Pengujian Asinkron: Pytest, Mocks & Testcontainers

> **Kategori:** Python Backend & Automation | **Level:** Lanjutan | **Minggu 9:** Arsitektur Pengujian Asinkron: Pytest, Mocks & Testcontainers

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

## Ringkasan

Kamu telah menguasai pytest, pytest-asyncio, dan isolasi mocking. Minggu depan adalah Capstone Final: Mesin Intelijen & Sentimen Pasar Keuangan Lengkap!
