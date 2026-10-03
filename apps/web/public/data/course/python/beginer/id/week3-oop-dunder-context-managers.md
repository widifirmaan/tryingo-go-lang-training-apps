# OOP Tingkat Lanjut, Magic Methods & Custom Context Managers

> **Kategori:** Python Backend & Automation | **Level:** Pemula | **Minggu 3:** OOP Tingkat Lanjut, Magic Methods & Custom Context Managers
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami Structural Subtyping menggunakan `typing.Protocol` (duck typing type-safe).
- Menguasai Magic Methods (Dunder Methods) `__enter__` dan `__exit__`.
- Menjamin pembersihan resource (socket, koneksi DB, file) menggunakan statement `with`.
- Menggunakan decorator `@contextmanager` dari pustaka `contextlib` untuk context manager fungsional.

---

## Program: Konektor Socket Pasar Keuangan Aman dengan Protocol & Context Manager

```python
from typing import Protocol, runtime_checkable
from contextlib import contextmanager
import time

@runtime_checkable
class MarketFeedClient(Protocol):
    """Structural Subtyping (Duck Typing yang aman dan diverifikasi secara statis)"""
    def connect(self) -> None: ...
    def disconnect(self) -> None: ...
    def fetch_quote(self, symbol: str) -> dict: ...

class ExchangeFeedConnection:
    def __init__(self, exchange_name: str, api_key: str):
        self.exchange_name = exchange_name
        self.api_key = api_key
        self.is_connected = False

    def connect(self) -> None:
        self.is_connected = True
        print(f"[SOCKET CONNECTED] Berhasil terhubung ke WebSocket {self.exchange_name}.")

    def disconnect(self) -> None:
        self.is_connected = False
        print(f"[SOCKET DISCONNECTED] Koneksi ke {self.exchange_name} ditutup dengan aman.")

    def fetch_quote(self, symbol: str) -> dict:
        if not self.is_connected:
            raise ConnectionError("Gagal mengambil kuotasi: Socket belum terhubung!")
        return {"symbol": symbol, "bid": 10500.0, "ask": 10550.0}

    # Context Manager Protocol (with statement)
    def __enter__(self):
        self.connect()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.disconnect()
        if exc_type:
            print(f"[ERROR CAUGHT IN CONTEXT]: {exc_val}")
            return False # Teruskan exception ke atas

# Demonstrasi Penggunaan Context Manager
print("=== PENGGUNAAN CONTEXT MANAGER (WITH STATEMENT) ===")
with ExchangeFeedConnection("IDX_JAKARTA", "KEY_SECRET_99") as client:
    # Memverifikasi kepatuhan terhadap Protocol MarketFeedClient
    assert isinstance(client, MarketFeedClient)
    quote = client.fetch_quote("BBCA.JK")
    print(f"[DATA RECEIVED]: {quote}")

print("Status koneksi setelah blok 'with':", client.is_connected)
```

---

## Konsep Kunci

Dalam pengembangan backend, salah satu penyebab utama crash server adalah **Resource Leak** (kebocoran koneksi socket atau file descriptor yang tidak pernah ditutup saat terjadi error).

### Protocol vs Abstract Base Classes
Di masa lalu, Python mengandalkan ABC (`abc.ABC`) yang mengharuskan inheritance kaku (`class MyClient(ABC)`). Dengan `typing.Protocol` (PEP 544), Python mendukung **Structural Subtyping** (Duck Typing statis): jika sebuah kelas memiliki method `connect`, `disconnect`, dan `fetch_quote`, kelas tersebut otomatis dianggap memenuhi kontrak `MarketFeedClient` tanpa harus mewarisi kelas induk secara eksplisit.

### Dunder Methods __enter__ dan __exit__
Statement `with` diatur oleh protokol context manager:
1. `__enter__`: Dieksekusi sebelum memasuki blok kode. Nilai balikan akan di-assign ke variabel setelah kata kunci `as`.
2. `__exit__`: Dijamin **selalu dieksekusi**, bahkan jika terjadi crash atau exception fatal di dalam blok `with`. Ini memastikan socket koneksi bursa selalu ditutup dengan bersih.

### Menangani Exception di __exit__
Jika method `__exit__` mengembalikan `True`, exception yang terjadi di dalam blok dianggap tertangani dan diredam. Jika mengembalikan `False` atau `None`, Python akan melemparkan exception tersebut ke atas setelah proses pembersihan selesai.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda meminjam kunci brankas bank (with statement). Begitu Anda masuk pintu brankas (__enter__), pintu terbuka. Begitu Anda selesai mengambil dokumen atau bahkan jika tiba-tiba listrik padam dan Anda harus lari keluar (__exit__), pintu brankas otomatis mengunci dirinya sendiri agar tidak ada maling yang masuk.

## Eksperimen

- Lemparkan `raise RuntimeError("Simulasi jaringan putus!")` di dalam blok `with` dan buktikan bahwa `disconnect()` tetap dipanggil.
- Buat context manager kedua menggunakan decorator `@contextlib.contextmanager`.
- Gunakan `runtime_checkable` untuk memverifikasi apakah objek pihak ketiga mematuhi protokol.

---

## Tantangan

Buat context manager `@contextmanager def measure_execution_time(task_name: str)` yang mencatat durasi eksekusi blok kode dalam milidetik dan memperingatkan jika waktu eksekusi melebihi threshold SLA.

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

Kamu telah menguasai Protocol typing, dunder methods, dan context managers. Minggu depan kita mempelajari pemrograman asinkron dengan asyncio dan TaskGroups.
