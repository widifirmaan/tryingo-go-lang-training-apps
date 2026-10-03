# Async Testing Architecture: Pytest, Mocks & Testcontainers

> **Kategori:** Python Backend & Automation | **Level:** Advanced | **Minggu 9:** Async Testing Architecture: Pytest, Mocks & Testcontainers

## Learning Objectives

- Master modern testing paradigms with `pytest` and `pytest-asyncio`.
- Use `unittest.mock.AsyncMock` to isolate third-party external dependencies.
- Understand `@pytest.fixture` mechanics for test state management and dependency injection.
- Achieve high code coverage and stress-test financial edge cases deterministically.

---

## Program: Comprehensive Async Unit & Integration Test Suite with Pytest

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

## Key Concepts

In financial applications, manually verifying endpoints via Postman or browser tabs invites catastrophe. A subtle rounding flaw or race condition can incur massive financial liability.

### The Superiority of Pytest
`pytest` supersedes legacy Java-inspired `unittest` boilerplate. It allows engineers to author tests utilizing native Python `assert` statements rather than cumbersome assertion methods (`self.assertEqual(...)`).

### Asynchronous Testing via pytest-asyncio
Because modern backends employ `async def`, testing suites must spin up test coroutines within isolated event loops. Decorating test functions with `@pytest.mark.asyncio` provisions an ephemeral loop, awaiting coroutines seamlessly.

### Deterministic Mocking with AsyncMock
Production unit tests must execute in single-digit milliseconds without making real network roundtrips (which introduce flakiness, rate limits, and network costs). `AsyncMock` injects deterministic responses, allowing thousands of assertions to pass within CI/CD pipelines.


---

---

## Beginner Friendly Explanation

Think of a flight simulator for airline captains. Rather than flying real aircraft into severe thunderstorms to test pilot reactions (dangerous and expensive), captains train inside a simulated replica cockpit (the Mock). All emergency checklists can be verified repeatedly in complete safety.

## Experiments

- Author an additional test verifying a "SELL" signal is triggered when average sentiment evaluates to -0.6.
- Simulate network timeouts via `mock_client.fetch_latest_headlines.side_effect = TimeoutError()`.
- Utilize pytest `--cov` flags to evaluate repository code coverage metrics.

---

## Challenge

Build an integration test using `httpx.AsyncClient` with `ASGITransport` to test FastAPI routes end-to-end without opening physical TCP sockets.

---

## Summary

You have mastered pytest, pytest-asyncio, and mock isolation. Next week is our Final Capstone: Complete Financial Market Intelligence Engine!
