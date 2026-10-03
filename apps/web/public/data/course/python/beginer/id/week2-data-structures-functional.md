# Struktur Data Lanjutan, Collections & Pipeline Fungsional

> **Kategori:** Python Backend & Automation | **Level:** Pemula | **Minggu 2:** Struktur Data Lanjutan, Collections & Pipeline Fungsional

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

## Ringkasan

Kamu telah menguasai struktur data lanjutan, deque ring buffers, dan defaultdict. Minggu depan kita mempelajari OOP, magic methods, dan context managers.
