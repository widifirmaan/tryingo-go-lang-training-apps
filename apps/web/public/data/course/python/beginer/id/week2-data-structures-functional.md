# Struktur Data Lanjutan, Collections & Pipeline Fungsional

> **Kategori:** Python Backend & Automation | **Level:** Pemula | **Minggu 2:** Struktur Data Lanjutan, Collections & Pipeline Fungsional
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai modul `collections`: `deque` (O(1) append/popleft), `defaultdict`, dan `Counter`.
- Menggunakan `deque(maxlen=N)` sebagai ring-buffer efisien untuk rolling window calculations.
- Memahami generator expressions dan modul `itertools` untuk pengolahan data memory-efficient.
- Membangun pipeline fungsional untuk transformasi data pasar finansial.

---

## Program: Agregasi Kedalaman Order Book & Analisis Waktu-Nyata dengan Collections

```python
from collections import defaultdict, deque, Counter
from decimal import Decimal
import itertools

# 1. Ring Buffer untuk Rolling Moving Average (Maksimal 5 harga terakhir)
price_history: deque[Decimal] = deque(maxlen=5)

prices = [Decimal(p) for p in ["100.5", "101.2", "102.0", "101.8", "103.5", "104.0", "102.5"]]

print("=== ROLLING MOVING AVERAGE DENGAN DEQUE ===")
for p in prices:
    price_history.append(p)
    rolling_avg = sum(price_history) / len(price_history)
    print(f"Price: ${p:.2f} | Buffer: {list(price_history)} | 5-MA: ${rolling_avg:.2f}")

# 2. Agregasi Kedalaman Pasar (Order Book Bids/Asks) dengan defaultdict
order_book: defaultdict[str, Decimal] = defaultdict(Decimal)

raw_orders = [
    ("BID", Decimal("100.50"), Decimal("150.0")),
    ("BID", Decimal("100.50"), Decimal("50.0")),
    ("BID", Decimal("100.00"), Decimal("300.0")),
    ("ASK", Decimal("101.00"), Decimal("200.0")),
    ("ASK", Decimal("101.50"), Decimal("450.0")),
]

for side, price_level, volume in raw_orders:
    key = f"{side} @ ${price_level}"
    order_book[key] += volume

print("\n=== AGREGASI KEDALAMAN BUKU PESANAN ===")
for level, total_vol in order_book.items():
    print(f"{level,-18} -> Total Volume: {total_vol} unit")

# 3. Analisis Frekuensi Transaksi dengan Counter
trader_counter = Counter(["TRADER_A", "TRADER_B", "TRADER_A", "TRADER_C", "TRADER_A", "TRADER_B"])
print("\n=== TRADER PALING AKTIF ===")
for trader, count in trader_counter.most_common(2):
    print(f"Trader: {trader} ({count} transaksi)")
```

---

## Konsep Kunci

Memilih struktur data yang tepat adalah perbedaan antara sistem finansial yang responsif dalam hitungan mikrodetik vs sistem yang melambat drastis saat dibebani jutaan data.

### Ring Buffer dengan collections.deque
List standar di Python dioptimalkan untuk akses acak (random access), namun operasi `pop(0)` atau penghapusan elemen di awal list memiliki kompleksitas O(N) karena seluruh elemen harus digeser di memori. `collections.deque` adalah antrean berujung ganda (double-ended queue) yang memiliki kompleksitas O(1) untuk penambahan dan penghapusan di kedua ujungnya. Menentukan `maxlen=5` otomatis membuang elemen terlama saat elemen baru masuk.

### Agregasi Efisien dengan defaultdict
`defaultdict` mengeliminasi kondisi `if key not in dict: dict[key] = 0`. Jika sebuah key belum ada di dictionary, pabrik tipe data (misal `Decimal`) otomatis memanggil konstruktor default (`Decimal(0)`), memungkinkan akumulasi volume order book yang bersih dan berkecepatan tinggi.

### Frekuensi Data dengan Counter
`Counter` adalah subkelas dictionary khusus untuk menghitung kemunculan elemen. Method `.most_common(K)` mengembalikan K elemen teratas secara sangat efisien berbasis algoritma heap internal tanpa memerlukan sorting penuh terhadap seluruh dataset.


---

---

## Penjelasan untuk Pemula

Bayangkan sebuah toples permen yang hanya muat 5 butir (deque maxlen=5). Setiap kali Anda memasukkan permen rasa baru dari atas, permen paling bawah otomatis terjatuh keluar dari toples. Anda tidak pernah perlu repot membersihkan toples secara manual; kapasitas toples selalu terjaga otomatis.

## Eksperimen

- Bandingkan benchmark waktu eksekusi `list.pop(0)` vs `deque.popleft()` pada 100.000 iterasi.
- Gunakan `itertools.islice` untuk mengambil irisan data harga saham dari generator tak terbatas.
- Gunakan `itertools.chain` untuk menggabungkan order book dari 3 bursa berbeda menjadi satu aliran data.

---

## Tantangan

Tulis fungsi generator `stream_moving_average(price_stream, window_size)` yang menghasilkan nilai moving average secara lazy menggunakan `yield` dan `deque` tanpa menyimpan seluruh riwayat data di RAM.

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

Kamu telah menguasai struktur data lanjutan, deque ring buffers, dan defaultdict. Minggu depan kita mempelajari OOP, magic methods, dan context managers.
