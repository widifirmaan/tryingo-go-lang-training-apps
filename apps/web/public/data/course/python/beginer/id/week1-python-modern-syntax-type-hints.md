# Modern Python 3.12+: Strict Type Hints, Dataclasses & Pattern Matching

> **Kategori:** Python Backend & Automation | **Level:** Pemula | **Minggu 1:** Modern Python 3.12+: Strict Type Hints, Dataclasses & Pattern Matching

## Tujuan Pembelajaran

- Menguasai fitur Python 3.12+ modern: strict type annotations (`typing`), `StrEnum`, dan `slots=True`.
- Menggunakan `@dataclass(frozen=True)` untuk pemodelan data domain yang aman dan hemat memori.
- Menerapkan Structural Pattern Matching (`match-case`) dengan guard conditions (`if`).
- Menghindari floating-point error pada nilai finansial menggunakan modul `decimal.Decimal`.

---

## Program: Pemodelan Data Pasar Finansial dengan Type Annotations & Match Statements

```python
from dataclasses import dataclass
from decimal import Decimal
from datetime import datetime, timezone
from enum import StrEnum
from typing import Final

class AssetClass(StrEnum):
    EQUITY = "EQUITY"
    CRYPTO = "CRYPTO"
    COMMODITY = "COMMODITY"
    FOREX = "FOREX"

@dataclass(frozen=True, slots=True)
class MarketTick:
    symbol: str
    price: Decimal
    volume: int
    asset_class: AssetClass
    timestamp: datetime = datetime.now(timezone.utc)

def evaluate_market_signal(tick: MarketTick) -> str:
    # Python 3.10+ Structural Pattern Matching with Guards
    match tick:
        case MarketTick(symbol=s, price=p, asset_class=AssetClass.CRYPTO) if p > Decimal("100000.00"):
            return f"[HIGH VOLATILITY] Crypto {s} broke $100k barrier! Price: ${p:,.2f}"
        case MarketTick(symbol=s, volume=v) if v >= 1_000_000:
            return f"[WHALE ALERT] Massive volume surge ({v:,} units) detected on {s}."
        case MarketTick(symbol=s, price=p):
            return f"[NORMAL] {s} traded at ${p:,.2f} with volume {tick.volume:,}."
        case _:
            return "[UNKNOWN] Unrecognized market payload format."

# Demonstrasi Eksekusi
btc_tick = MarketTick(
    symbol="BTC-USD",
    price=Decimal("104250.50"),
    volume=4200,
    asset_class=AssetClass.CRYPTO
)

bbca_tick = MarketTick(
    symbol="BBCA.JK",
    price=Decimal("10150.00"),
    volume=2_500_000,
    asset_class=AssetClass.EQUITY
)

print(evaluate_market_signal(btc_tick))
print(evaluate_market_signal(bbca_tick))
```

---

## Konsep Kunci

Python bukan lagi sekadar bahasa skrip santai tanpa tipe data. Dalam rekayasa backend modern, Python 3.12+ adalah bahasa yang sangat ekspresif, aman, dan memiliki performa memori yang jauh lebih efisien berkat optimasi internal CPython.

### Type Hints dan Keamanan Kode
Dengan menuliskan anotasi tipe seperti `symbol: str` dan `price: Decimal`, kode kita dapat diverifikasi secara statis menggunakan static type checker seperti **Mypy** atau **Pyright**. Ini mencegah puluhan bug runtime klasik seperti `AttributeError` atau pemanggilan method pada objek `None`.

### Keunggulan Dataclasses dengan Slots
Anotasi `@dataclass(frozen=True, slots=True)` memberikan dua manfaat besar:
1. `frozen=True`: Objek menjadi immutable (tidak bisa dimutasi sembarangan setelah dibuat), mencegah bug race condition pada sistem finansial.
2. `slots=True`: Mengeliminasi atribut `__dict__` internal Python yang boros memori, menghemat konsumsi RAM hingga 40-50% saat menyimpan jutaan data harga saham di memori.

### Structural Pattern Matching (match-case)
Fitur `match-case` memungkinkan kita memeriksa struktur objek secara mendalam (destructuring). Tidak seperti `if-elif` konvensional yang kaku, pattern matching mampu mengekstrak atribut objek secara langsung (`case MarketTick(symbol=s, price=p)`) sekaligus menerapkan logika filter (guards).


---

---

## Penjelasan untuk Pemula

Bayangkan Anda petugas bursa saham yang menerima lembaran laporan harga saham. Jika lembaran tersebut dicetak dengan stempel laminating anti-air (dataclass frozen), tidak ada yang bisa mengubah angka harga dengan pulpen. Dan Anda punya mesin sortir pintar (match-case) yang otomatis memisahkan transaksi raksasa langsung ke meja investigasi.

## Eksperimen

- Coba ubah harga `btc_tick.price = Decimal("200000")` dan perhatikan `FrozenInstanceError` yang dilempar Python.
- Tambahkan enum baru `AssetClass.BOND` dan buat rule matching baru untuk obligasi.
- Gunakan operator walrus `:=` untuk menghitung rasio volume terhadap moving average dalam kondisi if.

---

## Tantangan

Buat fungsi `calculate_vwap(ticks: list[MarketTick]) -> Decimal` yang menghitung Volume-Weighted Average Price secara presisi tanpa memutasi list asli.

---

## Ringkasan

Kamu telah menguasai fitur Python 3.12+ modern: type hints, slots dataclasses, dan pattern matching. Minggu depan kita mempelajari struktur data tingkat lanjut dan functional pipelines.
