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

Kamu telah menguasai fitur Python 3.12+ modern: type hints, slots dataclasses, dan pattern matching. Minggu depan kita mempelajari struktur data tingkat lanjut dan functional pipelines.
