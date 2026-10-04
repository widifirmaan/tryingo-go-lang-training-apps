# Modern Python 3.12+: Strict Type Hints, Dataclasses & Pattern Matching

> **Kategori:** Python Backend & Automation | **Level:** Pemula | **Minggu 1:** Modern Python 3.12+: Strict Type Hints, Dataclasses & Pattern Matching
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


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

Kamu telah menguasai fitur Python 3.12+ modern: type hints, slots dataclasses, dan pattern matching. Minggu depan kita mempelajari struktur data tingkat lanjut dan functional pipelines.
