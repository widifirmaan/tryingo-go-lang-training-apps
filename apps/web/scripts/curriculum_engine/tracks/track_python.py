"""
Python Track Curriculum Generator (10 Weeks, 3 Levels)
Product: High-Throughput Algorithmic Financial Market Sentiment & Automated Web Intelligence Engine (FastAPI + Asyncio + DuckDB)
"""

def get_track():
    return {
        'slug': 'python',
        'track_name': 'Python Backend & Automation',
        'levels': [
            {
                'levelId': 'beginer',
                'nameId': 'Pemula (Modern Python 3.12+ & Asyncio)',
                'nameEn': 'Beginner (Modern Python 3.12+ & Asyncio)',
                'descId': 'Sintaks Python 3.12+ modern, type hints ketat, structural pattern matching, context managers, dan konkurensi asyncio.',
                'descEn': 'Modern Python 3.12+ syntax, strict type hints, structural pattern matching, context managers, and asyncio concurrency.',
            },
            {
                'levelId': 'intermediate',
                'nameId': 'Menengah (FastAPI, Pydantic v2 & DuckDB Analytics)',
                'nameEn': 'Intermediate (FastAPI, Pydantic v2 & DuckDB Analytics)',
                'descId': 'Web API berkecepatan tinggi dengan FastAPI, validasi Pydantic v2, analitik data secepat kilat dengan DuckDB, dan async web scraping.',
                'descEn': 'High-throughput Web APIs with FastAPI, Pydantic v2 validation, lightning-fast DuckDB analytics, and async web intelligence.',
            },
            {
                'levelId': 'advanced',
                'nameId': 'Lanjutan (Distributed Workers, Testing & Intelligence Engine Capstone)',
                'nameEn': 'Advanced (Distributed Workers, Testing & Intelligence Engine Capstone)',
                'descId': 'Task queues Redis/Celery, pengujian async komprehensif pytest, dan mesin agregasi sentimen pasar keuangan production-ready.',
                'descEn': 'Redis/Celery task queues, comprehensive async testing with pytest, and production market intelligence sentiment engine.',
            },
        ],
        'modules': [
            # Week 1
            {
                'week': 1,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'python-modern-syntax-type-hints',
                'titleId': 'Modern Python 3.12+: Strict Type Hints, Dataclasses & Pattern Matching',
                'titleEn': 'Modern Python 3.12+: Strict Type Hints, Dataclasses & Pattern Matching',
                'programId': 'Pemodelan Data Pasar Finansial dengan Type Annotations & Match Statements',
                'programEn': 'Financial Market Modeling with Type Annotations & Match Statements',
                'language': 'python',
                'code': '''from dataclasses import dataclass
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
''',
                'objectivesId': [
                    'Menguasai fitur Python 3.12+ modern: strict type annotations (`typing`), `StrEnum`, dan `slots=True`.',
                    'Menggunakan `@dataclass(frozen=True)` untuk pemodelan data domain yang aman dan hemat memori.',
                    'Menerapkan Structural Pattern Matching (`match-case`) dengan guard conditions (`if`).',
                    'Menghindari floating-point error pada nilai finansial menggunakan modul `decimal.Decimal`.',
                ],
                'objectivesEn': [
                    'Master modern Python 3.12+ features: strict typing, `StrEnum`, and `slots=True`.',
                    'Use `@dataclass(frozen=True)` for memory-optimized and immutable domain data modeling.',
                    'Apply Structural Pattern Matching (`match-case`) with conditional guards (`if`).',
                    'Eliminate floating-point arithmetic errors in financial data using `decimal.Decimal`.',
                ],
                'explanationId': '''Python bukan lagi sekadar bahasa skrip santai tanpa tipe data. Dalam rekayasa backend modern, Python 3.12+ adalah bahasa yang sangat ekspresif, aman, dan memiliki performa memori yang jauh lebih efisien berkat optimasi internal CPython.

### Type Hints dan Keamanan Kode
Dengan menuliskan anotasi tipe seperti `symbol: str` dan `price: Decimal`, kode kita dapat diverifikasi secara statis menggunakan static type checker seperti **Mypy** atau **Pyright**. Ini mencegah puluhan bug runtime klasik seperti `AttributeError` atau pemanggilan method pada objek `None`.

### Keunggulan Dataclasses dengan Slots
Anotasi `@dataclass(frozen=True, slots=True)` memberikan dua manfaat besar:
1. `frozen=True`: Objek menjadi immutable (tidak bisa dimutasi sembarangan setelah dibuat), mencegah bug race condition pada sistem finansial.
2. `slots=True`: Mengeliminasi atribut `__dict__` internal Python yang boros memori, menghemat konsumsi RAM hingga 40-50% saat menyimpan jutaan data harga saham di memori.

### Structural Pattern Matching (match-case)
Fitur `match-case` memungkinkan kita memeriksa struktur objek secara mendalam (destructuring). Tidak seperti `if-elif` konvensional yang kaku, pattern matching mampu mengekstrak atribut objek secara langsung (`case MarketTick(symbol=s, price=p)`) sekaligus menerapkan logika filter (guards).
''',
                'explanationEn': '''Python has evolved far beyond a casual dynamically typed scripting tool. In contemporary backend engineering, Python 3.12+ delivers exceptional expressiveness, strict type safety, and dramatic memory efficiencies.

### Type Annotations and Static Verification
Declaring annotations such as `symbol: str` and `price: Decimal` enables ahead-of-time auditing via static type checkers like **Mypy** or **Pyright**. This eradicates common runtime catastrophes like `AttributeError: 'NoneType' object has no attribute`.

### Dataclasses with Slots
The `@dataclass(frozen=True, slots=True)` decorator delivers two crucial capabilities:
1. `frozen=True`: Guarantees immutability across market models, preventing accidental mutations across concurrent pipelines.
2. `slots=True`: Replaces the default dynamic dictionary (`__dict__`) with compact C-level pointer arrays, reducing RAM consumption by 40-50% across high-volume time-series datasets.

### Structural Pattern Matching
Python's `match-case` enables deep structural destructuring. Rather than cascading brittle `if-elif` ladders, pattern matching extracts object attributes inline (`case MarketTick(symbol=s, price=p)`) while enforcing conditional guard predicates.
''',
                'beginnerId': '''Bayangkan Anda petugas bursa saham yang menerima lembaran laporan harga saham. Jika lembaran tersebut dicetak dengan stempel laminating anti-air (dataclass frozen), tidak ada yang bisa mengubah angka harga dengan pulpen. Dan Anda punya mesin sortir pintar (match-case) yang otomatis memisahkan transaksi raksasa langsung ke meja investigasi.''',
                'beginnerEn': '''Imagine you are an exchange floor clerk receiving stock price sheets. If the sheet is sealed in an impermeable plastic laminate (dataclass frozen), nobody can tamper with the numbers using a pen. And you possess an automated sorting chute (match-case) that immediately diverts mega-volume trades to the chief auditor desk.''',
                'experimentsId': [
                    'Coba ubah harga `btc_tick.price = Decimal("200000")` dan perhatikan `FrozenInstanceError` yang dilempar Python.',
                    'Tambahkan enum baru `AssetClass.BOND` dan buat rule matching baru untuk obligasi.',
                    'Gunakan operator walrus `:=` untuk menghitung rasio volume terhadap moving average dalam kondisi if.',
                ],
                'experimentsEn': [
                    'Attempt mutating `btc_tick.price = Decimal("200000")` and observe Python raising a `FrozenInstanceError`.',
                    'Introduce a new enum `AssetClass.BOND` and author a dedicated pattern matching clause.',
                    'Apply the walrus operator `:=` within an if condition to compute volume velocity inline.',
                ],
                'challengeId': 'Buat fungsi `calculate_vwap(ticks: list[MarketTick]) -> Decimal` yang menghitung Volume-Weighted Average Price secara presisi tanpa memutasi list asli.',
                'challengeEn': 'Build a `calculate_vwap(ticks: list[MarketTick]) -> Decimal` function computing Volume-Weighted Average Price with high precision without mutating the input list.',
                'summaryId': 'Kamu telah menguasai fitur Python 3.12+ modern: type hints, slots dataclasses, dan pattern matching. Minggu depan kita mempelajari struktur data tingkat lanjut dan functional pipelines.',
                'summaryEn': 'You have mastered modern Python 3.12+ features: type hints, slots dataclasses, and pattern matching. Next week we explore advanced data structures and functional pipelines.',
            },

            # Week 2
            {
                'week': 2,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'data-structures-functional',
                'titleId': 'Struktur Data Lanjutan, Collections & Pipeline Fungsional',
                'titleEn': 'Advanced Data Structures, Collections & Functional Pipelines',
                'programId': 'Agregasi Kedalaman Order Book & Analisis Waktu-Nyata dengan Collections',
                'programEn': 'Order Book Depth Aggregation & Real-Time Analytics with Collections',
                'language': 'python',
                'code': '''from collections import defaultdict, deque, Counter
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

print("\\n=== AGREGASI KEDALAMAN BUKU PESANAN ===")
for level, total_vol in order_book.items():
    print(f"{level,-18} -> Total Volume: {total_vol} unit")

# 3. Analisis Frekuensi Transaksi dengan Counter
trader_counter = Counter(["TRADER_A", "TRADER_B", "TRADER_A", "TRADER_C", "TRADER_A", "TRADER_B"])
print("\\n=== TRADER PALING AKTIF ===")
for trader, count in trader_counter.most_common(2):
    print(f"Trader: {trader} ({count} transaksi)")
''',
                'objectivesId': [
                    'Menguasai modul `collections`: `deque` (O(1) append/popleft), `defaultdict`, dan `Counter`.',
                    'Menggunakan `deque(maxlen=N)` sebagai ring-buffer efisien untuk rolling window calculations.',
                    'Memahami generator expressions dan modul `itertools` untuk pengolahan data memory-efficient.',
                    'Membangun pipeline fungsional untuk transformasi data pasar finansial.',
                ],
                'objectivesEn': [
                    'Master the `collections` module: `deque` (O(1) append/popleft), `defaultdict`, and `Counter`.',
                    'Use `deque(maxlen=N)` as a memory-efficient ring buffer for rolling window computations.',
                    'Understand generator expressions and `itertools` for lazy data processing.',
                    'Construct functional data transformation pipelines for financial market feeds.',
                ],
                'explanationId': '''Memilih struktur data yang tepat adalah perbedaan antara sistem finansial yang responsif dalam hitungan mikrodetik vs sistem yang melambat drastis saat dibebani jutaan data.

### Ring Buffer dengan collections.deque
List standar di Python dioptimalkan untuk akses acak (random access), namun operasi `pop(0)` atau penghapusan elemen di awal list memiliki kompleksitas O(N) karena seluruh elemen harus digeser di memori. `collections.deque` adalah antrean berujung ganda (double-ended queue) yang memiliki kompleksitas O(1) untuk penambahan dan penghapusan di kedua ujungnya. Menentukan `maxlen=5` otomatis membuang elemen terlama saat elemen baru masuk.

### Agregasi Efisien dengan defaultdict
`defaultdict` mengeliminasi kondisi `if key not in dict: dict[key] = 0`. Jika sebuah key belum ada di dictionary, pabrik tipe data (misal `Decimal`) otomatis memanggil konstruktor default (`Decimal(0)`), memungkinkan akumulasi volume order book yang bersih dan berkecepatan tinggi.

### Frekuensi Data dengan Counter
`Counter` adalah subkelas dictionary khusus untuk menghitung kemunculan elemen. Method `.most_common(K)` mengembalikan K elemen teratas secara sangat efisien berbasis algoritma heap internal tanpa memerlukan sorting penuh terhadap seluruh dataset.
''',
                'explanationEn': '''Choosing optimal data structures separates microsecond-responsive financial engines from systems crashing under high-volume streaming loads.

### Ring Buffers via collections.deque
Python standard lists provide fast random access, but prepending or popping from the left (`list.pop(0)`) is an O(N) operation requiring memory shifts. `collections.deque` provides O(1) time complexity for insertions and removals at both head and tail. Initializing with `maxlen=N` enforces an automatic memory-bounded circular ring buffer.

### Seamless Accumulation with defaultdict
`defaultdict` eliminates verbose guard conditions (`if key not in my_dict`). Missing keys automatically trigger the default type factory (such as `Decimal`), enabling concise, high-performance order-book volume accumulation.

### Frequency Analysis with Counter
`Counter` extends dictionary mechanics specifically for tallying elements. The `.most_common(k)` method retrieves top-k elements using optimized heap algorithms without requiring full collection sorting.
''',
                'beginnerId': '''Bayangkan sebuah toples permen yang hanya muat 5 butir (deque maxlen=5). Setiap kali Anda memasukkan permen rasa baru dari atas, permen paling bawah otomatis terjatuh keluar dari toples. Anda tidak pernah perlu repot membersihkan toples secara manual; kapasitas toples selalu terjaga otomatis.''',
                'beginnerEn': '''Imagine a candy dispenser holding exactly 5 gumballs (deque maxlen=5). Every time you insert a fresh gumball at the top, the oldest gumball at the bottom automatically dispenses out. You never have to manually scrape out old candies; the capacity is perpetually self-regulating.''',
                'experimentsId': [
                    'Bandingkan benchmark waktu eksekusi `list.pop(0)` vs `deque.popleft()` pada 100.000 iterasi.',
                    'Gunakan `itertools.islice` untuk mengambil irisan data harga saham dari generator tak terbatas.',
                    'Gunakan `itertools.chain` untuk menggabungkan order book dari 3 bursa berbeda menjadi satu aliran data.',
                ],
                'experimentsEn': [
                    'Benchmark execution times of `list.pop(0)` versus `deque.popleft()` across 100,000 iterations.',
                    'Use `itertools.islice` to sample price ticks lazily from an infinite simulated generator.',
                    'Apply `itertools.chain` to merge order books across three simulated exchanges into a unified stream.',
                ],
                'challengeId': 'Tulis fungsi generator `stream_moving_average(price_stream, window_size)` yang menghasilkan nilai moving average secara lazy menggunakan `yield` dan `deque` tanpa menyimpan seluruh riwayat data di RAM.',
                'challengeEn': 'Author a generator function `stream_moving_average(price_stream, window_size)` that yields rolling moving averages lazily using `yield` and `deque` with zero memory bloat.',
                'summaryId': 'Kamu telah menguasai struktur data lanjutan, deque ring buffers, dan defaultdict. Minggu depan kita mempelajari OOP, magic methods, dan context managers.',
                'summaryEn': 'You have mastered advanced data structures, deque ring buffers, and defaultdict. Next week we explore OOP, magic methods, and context managers.',
            },

            # Week 3
            {
                'week': 3,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'oop-dunder-context-managers',
                'titleId': 'OOP Tingkat Lanjut, Magic Methods & Custom Context Managers',
                'titleEn': 'Advanced OOP, Magic Methods & Custom Context Managers',
                'programId': 'Konektor Socket Pasar Keuangan Aman dengan Protocol & Context Manager',
                'programEn': 'Resilient Financial Socket Connector with Protocols & Context Managers',
                'language': 'python',
                'code': '''from typing import Protocol, runtime_checkable
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
''',
                'objectivesId': [
                    'Memahami Structural Subtyping menggunakan `typing.Protocol` (duck typing type-safe).',
                    'Menguasai Magic Methods (Dunder Methods) `__enter__` dan `__exit__`.',
                    'Menjamin pembersihan resource (socket, koneksi DB, file) menggunakan statement `with`.',
                    'Menggunakan decorator `@contextmanager` dari pustaka `contextlib` untuk context manager fungsional.',
                ],
                'objectivesEn': [
                    'Understand Structural Subtyping with `typing.Protocol` (type-safe duck typing).',
                    'Master dunder methods `__enter__` and `__exit__`.',
                    'Guarantee resource cleanup (sockets, DB connections, files) via the `with` statement.',
                    'Use `@contextmanager` from `contextlib` for functional context management.',
                ],
                'explanationId': '''Dalam pengembangan backend, salah satu penyebab utama crash server adalah **Resource Leak** (kebocoran koneksi socket atau file descriptor yang tidak pernah ditutup saat terjadi error).

### Protocol vs Abstract Base Classes
Di masa lalu, Python mengandalkan ABC (`abc.ABC`) yang mengharuskan inheritance kaku (`class MyClient(ABC)`). Dengan `typing.Protocol` (PEP 544), Python mendukung **Structural Subtyping** (Duck Typing statis): jika sebuah kelas memiliki method `connect`, `disconnect`, dan `fetch_quote`, kelas tersebut otomatis dianggap memenuhi kontrak `MarketFeedClient` tanpa harus mewarisi kelas induk secara eksplisit.

### Dunder Methods __enter__ dan __exit__
Statement `with` diatur oleh protokol context manager:
1. `__enter__`: Dieksekusi sebelum memasuki blok kode. Nilai balikan akan di-assign ke variabel setelah kata kunci `as`.
2. `__exit__`: Dijamin **selalu dieksekusi**, bahkan jika terjadi crash atau exception fatal di dalam blok `with`. Ini memastikan socket koneksi bursa selalu ditutup dengan bersih.

### Menangani Exception di __exit__
Jika method `__exit__` mengembalikan `True`, exception yang terjadi di dalam blok dianggap tertangani dan diredam. Jika mengembalikan `False` atau `None`, Python akan melemparkan exception tersebut ke atas setelah proses pembersihan selesai.
''',
                'explanationEn': '''In backend systems, a primary culprit behind server degradation is **Resource Leaking** (socket handles or database connection pools left unreleased following exceptions).

### Protocols vs Abstract Base Classes
While legacy Python relied on `abc.ABC` enforcing rigid class inheritance, `typing.Protocol` (PEP 544) introduces **Structural Subtyping** (static duck typing). Any class exposing `connect`, `disconnect`, and `fetch_quote` satisfies the `MarketFeedClient` protocol without explicitly inheriting from a base class.

### Dunder Methods: __enter__ and __exit__
The `with` statement executes the context manager protocol:
1. `__enter__`: Invoked prior to entering the code block, returning the target resource bound to `as`.
2. `__exit__`: Guaranteed to run unconditionally, even during uncaught exceptions. This ensures network sockets release back to the OS cleanly.

### Exception Governance in __exit__
If `__exit__` returns `True`, exceptions raised inside the block are suppressed. If it returns `False` or `None`, Python propagates the exception upward following mandatory resource cleanup.
''',
                'beginnerId': '''Bayangkan Anda meminjam kunci brankas bank (with statement). Begitu Anda masuk pintu brankas (__enter__), pintu terbuka. Begitu Anda selesai mengambil dokumen atau bahkan jika tiba-tiba listrik padam dan Anda harus lari keluar (__exit__), pintu brankas otomatis mengunci dirinya sendiri agar tidak ada maling yang masuk.''',
                'beginnerEn': '''Imagine checking out a bank deposit vault key (`with` statement). Entering the vault triggers opening seals (`__enter__`). When you exit—even if the building alarms sound and you evacuate mid-task (`__exit__`)—the vault doors clamp shut automatically, protecting assets.''',
                'experimentsId': [
                    'Lemparkan `raise RuntimeError("Simulasi jaringan putus!")` di dalam blok `with` dan buktikan bahwa `disconnect()` tetap dipanggil.',
                    'Buat context manager kedua menggunakan decorator `@contextlib.contextmanager`.',
                    'Gunakan `runtime_checkable` untuk memverifikasi apakah objek pihak ketiga mematuhi protokol.',
                ],
                'experimentsEn': [
                    'Raise `RuntimeError("Simulasi jaringan putus!")` inside the `with` block and verify `disconnect()` runs.',
                    'Implement an alternative context manager using the `@contextlib.contextmanager` generator decorator.',
                    'Use `runtime_checkable` to audit third-party client conformance at runtime.',
                ],
                'challengeId': 'Buat context manager `@contextmanager def measure_execution_time(task_name: str)` yang mencatat durasi eksekusi blok kode dalam milidetik dan memperingatkan jika waktu eksekusi melebihi threshold SLA.',
                'challengeEn': 'Build a `@contextmanager def measure_execution_time(task_name: str)` context manager logging elapsed time in milliseconds and warning if latency exceeds an SLA threshold.',
                'summaryId': 'Kamu telah menguasai Protocol typing, dunder methods, dan context managers. Minggu depan kita mempelajari pemrograman asinkron dengan asyncio dan TaskGroups.',
                'summaryEn': 'You have mastered Protocol typing, dunder methods, and context managers. Next week we explore asynchronous programming with asyncio and TaskGroups.',
            },

            # Week 4
            {
                'week': 4,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'asyncio-event-loop-concurrency',
                'titleId': 'Konkurensi Modern: Asyncio, Event Loop & TaskGroup di Python 3.11+',
                'titleEn': 'Modern Concurrency: Asyncio, Event Loop & TaskGroup in Python 3.11+',
                'programId': 'Crawler Data Pasar Asinkron Multi-Bursa dengan TaskGroup & Semaphore',
                'programEn': 'Concurrent Multi-Exchange Market Crawler with TaskGroup & Semaphore',
                'language': 'python',
                'code': '''import asyncio
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
    print(f"\\n=== HASIL: Berhasil mengambil {len(results)} bursa dalam {total_time:.1f}ms ===")
    best_price = max(results, key=lambda r: r.price)
    print(f"Harga Tertinggi: ${best_price.price:,.2f} di {best_price.exchange}")

if __name__ == "__main__":
    asyncio.run(main())
''',
                'objectivesId': [
                    'Memahami Event Loop, Coroutines, dan non-blocking I/O di Python.',
                    'Menguasai Structured Concurrency modern dengan `asyncio.TaskGroup` (Python 3.11+).',
                    'Menggunakan `asyncio.Semaphore` untuk rate limiting konkurensi request keluar.',
                    'Mengetahui perbedaan antara `asyncio.gather` lama vs `asyncio.TaskGroup` yang aman dari error unhandled.',
                ],
                'objectivesEn': [
                    'Understand the Event Loop, Coroutines, and non-blocking I/O in Python.',
                    'Master modern Structured Concurrency with `asyncio.TaskGroup` (Python 3.11+).',
                    'Utilize `asyncio.Semaphore` for concurrency rate limiting against upstream APIs.',
                    'Differentiate legacy `asyncio.gather` from fail-safe `asyncio.TaskGroup` error semantics.',
                ],
                'explanationId': '''Dalam pengembangan backend pengumpulan data (data crawling & market feeds), 99% waktu CPU habis hanya untuk menunggu respons jaringan eksternal (I/O bound). Menggunakan thread biasa memakan banyak memori, sedangkan asyncio mengeksekusi ribuan request di atas satu thread saja secara efisien.

### Event Loop dan Coroutines
Fungsi yang dideklarasikan dengan `async def` menghasilkan sebuah **Coroutine**. Ketika coroutine memanggil `await asyncio.sleep(...)` atau operasi I/O asinkron lainnya, coroutine menyerahkan kontrol kembali ke **Event Loop**. Event Loop segera menjalankan coroutine lain yang siap, sehingga tidak ada siklus CPU yang terbuang sia-sia.

### Structured Concurrency dengan asyncio.TaskGroup
Di Python versi sebelum 3.11, developer menggunakan `asyncio.gather()`. Namun jika salah satu tugas gagal melempar exception, tugas-tugas lainnya tetap berjalan liar di background (Orphaned Tasks). **TaskGroup** (diperkenalkan di Python 3.11) menerapkan Structured Concurrency: jika salah satu task di dalam blok `async with TaskGroup()` gagal, seluruh task saudara lainnya otomatis dibatalkan, dan error dikumpulkan dalam `ExceptionGroup`.

### Rate Limiting dengan Semaphore
Server eksternal biasanya membatasi jumlah koneksi konkuren maksimal (misalnya 3 koneksi per IP). Dengan membungkus panggilan dalam `async with rate_limiter:` menggunakan `asyncio.Semaphore(3)`, kita menjamin sistem tidak akan pernah membombardir server lawan melebihi kapasitas yang diizinkan.
''',
                'explanationEn': '''In data harvesting and market ingestion backends, 99% of execution time is spent idling on remote network I/O. Multithreading consumes heavy OS stack allocations, whereas asyncio juggles thousands of concurrent requests across a single thread seamlessly.

### The Event Loop & Coroutines
Declaring `async def` defines a **Coroutine**. When a coroutine invokes `await`, it relinquishes control back to the **Event Loop**. The loop immediately advances another awaiting task, achieving peak I/O throughput without context-switching penalties.

### Structured Concurrency with asyncio.TaskGroup
Prior to Python 3.11, developers relied on `asyncio.gather()`. If one task encountered an exception, sibling tasks drifted orphaned in the background. **TaskGroup** implements robust Structured Concurrency: if any child task crashes, sibling tasks are canceled automatically, aggregating faults within an `ExceptionGroup`.

### Concurrency Throttling with Semaphore
Exchanges enforce strict concurrency limits. Wrapping operations inside `async with rate_limiter:` backed by an `asyncio.Semaphore(3)` guarantees outbound HTTP requests do not overwhelm third-party rate limits.
''',
                'beginnerId': '''Bayangkan seorang juru masak di restoran yang harus memanggang 5 roti burger. Daripada berdiri diam menatap panggangan selama 3 menit menunggu roti matang baru memasak roti berikutnya, koki menaruh 5 roti ke atas panggangan sekaligus. Sambil menunggu roti matang (await), koki memotong sayur dan menyiapkan keju.''',
                'beginnerEn': '''Imagine a short-order chef toasting five buns. Rather than staring motionless at a toaster for three minutes before starting the next bun, the chef drops all five buns into the slots simultaneously. While the buns toast (`await`), the chef chops lettuce and prepares burger patties.''',
                'experimentsId': [
                    'Ubah nilai `Semaphore` dari 3 menjadi 1 dan amati bagaimana eksekusi berubah menjadi sekuensial.',
                    'Lemparkan `raise ValueError("Bursa Bybit down!")` pada salah satu task dan amati penanganan ExceptionGroup di TaskGroup.',
                    'Bandingkan waktu total jika 5 bursa dieksekusi secara sekuensial biasa (tanpa asyncio).',
                ],
                'experimentsEn': [
                    'Lower the `Semaphore` value from 3 to 1 and observe tasks executing sequentially.',
                    'Raise `ValueError("Bursa Bybit down!")` within one task and inspect the resulting ExceptionGroup.',
                    'Benchmark total elapsed time executing five requests synchronously without asyncio.',
                ],
                'challengeId': 'Buat fungsi `async def fetch_with_retry(coro_fn, max_retries=3, backoff_factor=1.5)` yang secara otomatis mencoba ulang coroutine yang gagal dengan jeda waktu eksponensial asinkron.',
                'challengeEn': 'Author an `async def fetch_with_retry(coro_fn, max_retries=3, backoff_factor=1.5)` wrapper retrying failed coroutines with exponential async backoff.',
                'summaryId': 'Kamu telah menguasai asyncio, Event Loop, TaskGroup, dan Semaphores. Level 1 selesai! Di Level 2 kita membangun Web API dengan FastAPI, Pydantic v2, dan DuckDB.',
                'summaryEn': 'You have mastered asyncio, Event Loop, TaskGroup, and Semaphores. Level 1 complete! Level 2 takes us into FastAPI, Pydantic v2, and DuckDB analytics.',
            },

            # Week 5
            {
                'week': 5,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'pydantic-fastapi-foundations',
                'titleId': 'FastAPI & Pydantic v2: Validasi Performa Tinggi & REST API Asinkron',
                'titleEn': 'FastAPI & Pydantic v2: High-Performance Validation & Async REST APIs',
                'programId': 'REST API Ingesti Sentimen Pasar Keuangan dengan Validasi Pydantic v2',
                'programEn': 'Financial Market Sentiment Ingestion API with Pydantic v2 Validation',
                'language': 'python',
                'code': '''from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field, field_validator
from decimal import Decimal
from datetime import datetime, timezone
from typing import Annotated

app = FastAPI(
    title="Financial Market Sentiment API",
    version="1.0.0",
    description="Engine ingesti dan validasi sentimen pasar real-time"
)

# Pydantic v2 Model (Didukung oleh Rust Core pydantic-core untuk kecepatan maksimal)
class SentimentScorePayload(BaseModel):
    ticker: Annotated[str, Field(min_length=2, max_length=12, examples=["AAPL", "BTC-USD"])]
    sentiment_score: Annotated[float, Field(ge=-1.0, le=1.0, description="Skor sentimen antara -1.0 (sangat bearish) hingga +1.0 (sangat bullish)")]
    source_outlet: str = Field(..., min_length=3)
    headline_text: str = Field(..., max_length=280)
    confidence: float = Field(default=0.85, ge=0.0, le=1.0)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    @field_validator("ticker")
    @classmethod
    def normalize_ticker(cls, v: str) -> str:
        return v.strip().upper()

class SentimentResponse(BaseModel):
    id: str
    ticker: str
    classification: str
    processed_at: datetime

# In-Memory Storage untuk demonstrasi
db_records: dict[str, SentimentScorePayload] = {}

@app.post("/api/v1/sentiments", response_model=SentimentResponse, status_code=status.HTTP_201_CREATED)
async def ingest_sentiment(payload: SentimentScorePayload):
    classification = "BULLISH" if payload.sentiment_score > 0.2 else ("BEARISH" if payload.sentiment_score < -0.2 else "NEUTRAL")
    
    record_id = f"SENT-{len(db_records) + 1:04d}"
    db_records[record_id] = payload

    return SentimentResponse(
        id=record_id,
        ticker=payload.ticker,
        classification=classification,
        processed_at=datetime.now(timezone.utc)
    )

@app.get("/api/v1/sentiments/{record_id}", response_model=SentimentScorePayload)
async def get_sentiment(record_id: str):
    if record_id not in db_records:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Record sentimen dengan ID '{record_id}' tidak ditemukan."
        )
    return db_records[record_id]
''',
                'objectivesId': [
                    'Memahami keunggulan Pydantic v2 yang ditenagai Rust (`pydantic-core`) untuk validasi data berkecepatan 5-10x lebih cepat.',
                    'Menggunakan `Field`, `Annotated`, dan `@field_validator` untuk validasi dan normalisasi payload.',
                    'Membangun REST API asinkron non-blocking dengan FastAPI.',
                    'Menghasilkan dokumentasi interaktif OpenAPI (Swagger & Redoc) secara otomatis.',
                ],
                'objectivesEn': [
                    'Understand Pydantic v2 advantages powered by the Rust core (`pydantic-core`) for 5-10x faster parsing.',
                    'Use `Field`, `Annotated`, and `@field_validator` for payload validation and sanitization.',
                    'Build asynchronous non-blocking REST APIs with FastAPI.',
                    'Generate interactive OpenAPI documentation (Swagger & Redoc) automatically.',
                ],
                'explanationId': '''FastAPI telah menjadi framework backend Python paling populer di dunia untuk AI, data science, dan microservices berkat arsitekturnya yang sepenuhnya asinkron dan terintegrasi mendalam dengan Pydantic.

### Pydantic v2 dan Core Rust
Pydantic v2 menulis ulang seluruh mesin validasi dan parsing datanya dalam bahasa Rust (`pydantic-core`). Hasilnya, parsing JSON dan validasi tipe data berjalan 5 hingga 20 kali lebih cepat daripada Pydantic v1, mendekati kecepatan parser bahasa terkompilasi seperti Go atau Java.

### Deklarasi Validasi dengan Field dan Annotated
Dengan memanfaatkan fitur `Annotated[T, Field(...)]`, kita dapat mendefinisikan batasan data langsung pada tipe data (misal nilai skor sentimen harus di antara `-1.0` dan `1.0`). Jika klien mengirimkan nilai di luar range tersebut, FastAPI otomatis menghasilkan respons `HTTP 422 Unprocessable Entity` lengkap dengan deskripsi error JSON yang jelas tanpa kita perlu menulis kode validasi manual.

### Otomatisasi OpenAPI Swagger
Setiap endpoint FastAPI secara otomatis dipetakan ke spesifikasi OpenAPI 3.1 standar industri. Pengembang dapat membuka URL `/docs` di browser untuk langsung menguji endpoint menggunakan antarmuka grafis Swagger UI.
''',
                'explanationEn': '''FastAPI has surged as the premier Python backend framework for AI, data science, and high-performance microservices, leveraging native asyncio architecture and deep Pydantic integration.

### Pydantic v2 & The Rust Engine
Pydantic v2 rebuilt its entire core parsing engine in Rust (`pydantic-core`). Consequently, JSON deserialization and schema validation execute 5 to 20 times faster than v1, rivaling compiled languages like Go and Java.

### Declarative Schema Rules via Annotated Fields
Leveraging `Annotated[T, Field(...)]`, engineers define constraints directly on types (e.g., constraining sentiment scores between `-1.0` and `1.0`). If clients transmit out-of-bound payloads, FastAPI automatically yields standardized `HTTP 422 Unprocessable Entity` responses without boilerplate manual checks.

### Native OpenAPI Documentation
Every FastAPI route registers automatically into the OpenAPI 3.1 specification. Developers navigate to `/docs` in their browser to inspect endpoints interactively via Swagger UI.
''',
                'beginnerId': '''Bayangkan loket pemeriksaan imigrasi otomatis di bandara. Mesin pemindai (Pydantic v2) memeriksa paspor Anda dalam 0,1 detik. Jika tanggal berlaku paspor sudah lewat atau foto tidak jelas, mesin langsung menolak Anda dengan lampu merah dan tiket instruksi tanpa membebani petugas imigrasi manual.''',
                'beginnerEn': '''Imagine an automated biometric immigration gate at an international terminal. The optical scanner (Pydantic v2) verifies your credentials in 0.1 seconds. If your passport is expired or smudged, the gate turns red and prints instructions without requiring manual officer intervention.''',
                'experimentsId': [
                    'Kirim payload POST dengan `sentiment_score: 1.5` dan amati struktur pesan error validasi HTTP 422.',
                    'Kirim ticker dengan huruf kecil `aapl` dan buktikan `@field_validator` otomatis mengubahnya menjadi `AAPL`.',
                    'Buka antarmuka Swagger UI di browser pada `http://localhost:8000/docs`.',
                ],
                'experimentsEn': [
                    'Submit a POST payload containing `sentiment_score: 1.5` and inspect the HTTP 422 error response.',
                    'Submit a lowercase ticker `aapl` and verify `@field_validator` sanitizes it to `AAPL`.',
                    'Access the interactive Swagger UI documentation at `http://localhost:8000/docs`.',
                ],
                'challengeId': 'Tambahkan endpoint `GET /api/v1/sentiments/aggregate?ticker=AAPL` yang menghitung rata-rata skor sentimen tertimbang berdasarkan nilai confidence dari seluruh entri tersimpan.',
                'challengeEn': 'Add a `GET /api/v1/sentiments/aggregate?ticker=AAPL` endpoint computing the weighted average sentiment score factoring confidence ratings.',
                'summaryId': 'Kamu telah menguasai FastAPI, Pydantic v2, dan validasi data berkecepatan tinggi. Minggu depan kita menghubungkan basis data analitik secepat kilat dengan DuckDB.',
                'summaryEn': 'You have mastered FastAPI, Pydantic v2, and high-performance validation. Next week we connect lightning-fast embedded analytics with DuckDB.',
            },

            # Week 6
            {
                'week': 6,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'databases-duckdb-sqlalchemy',
                'titleId': 'Penyimpanan Analitik: DuckDB Embedded & Async SQLAlchemy 2.0',
                'titleEn': 'Analytics Storage: Embedded DuckDB & Async SQLAlchemy 2.0',
                'programId': 'Kueri Analitik OLAP Secepat Kilat pada Jutaan Data Tick dengan DuckDB',
                'programEn': 'Lightning-Fast OLAP Analytics on Millions of Ticks with DuckDB',
                'language': 'python',
                'code': '''import duckdb
import time

# Inisialisasi Database DuckDB (In-Memory atau File Tersemat)
con = duckdb.connect(database=":memory:")

print("=== MEMBUAT DATASET SENTIMEN PASAR DENGAN DUCKDB VECTORIZED ENGINE ===")
# Buat tabel analitik
con.execute("""
    CREATE TABLE market_sentiments (
        ticker VARCHAR,
        sentiment_score DOUBLE,
        source VARCHAR,
        confidence DOUBLE,
        recorded_at TIMESTAMP
    );
""")

# Masukkan 50.000 data sentimen secara instan menggunakan generator SQL DuckDB
con.execute("""
    INSERT INTO market_sentiments
    SELECT 
        CASE (random() * 3)::INT 
            WHEN 0 THEN 'BTC-USD'
            WHEN 1 THEN 'ETH-USD'
            WHEN 2 THEN 'BBCA.JK'
            ELSE 'NVDA'
        END AS ticker,
        (random() * 2 - 1)::DOUBLE AS sentiment_score,
        'BLOOMBERG_RSS' AS source,
        (0.7 + random() * 0.3)::DOUBLE AS confidence,
        NOW() - INTERVAL ((random() * 60)::INT) MINUTE AS recorded_at
    FROM generate_series(1, 50000);
""")

print("Berhasil menyuntikkan 50.000 baris data sentimen.")

# Jalankan Kueri Agregasi Analitik (OLAP)
start_query = time.perf_counter()

query_result = con.execute("""
    SELECT 
        ticker,
        COUNT(*) AS total_signals,
        ROUND(AVG(sentiment_score), 4) AS avg_sentiment,
        ROUND(AVG(confidence), 4) AS avg_confidence,
        SUM(CASE WHEN sentiment_score > 0.3 THEN 1 ELSE 0 END) AS bullish_count,
        SUM(CASE WHEN sentiment_score < -0.3 THEN 1 ELSE 0 END) AS bearish_count
    FROM market_sentiments
    GROUP BY ticker
    ORDER BY avg_sentiment DESC;
""").fetchall()

query_time_ms = (time.perf_counter() - start_query) * 1000

print(f"\\n=== HASIL KUERI AGREGASI OLAP ({query_time_ms:.2f} ms) ===")
print(f"{'TICKER':<10} | {'TOTAL':<8} | {'AVG SENTIMENT':<14} | {'BULLISH':<8} | {'BEARISH':<8}")
print("-" * 60)
for row in query_result:
    print(f"{row[0]:<10} | {row[1]:<8} | {row[2]:<14} | {row[4]:<8} | {row[5]:<8}")
''',
                'objectivesId': [
                    'Memahami perbedaan arsitektur OLTP (PostgreSQL/MySQL) vs OLAP (DuckDB/ClickHouse).',
                    'Menggunakan DuckDB sebagai database analitik kolumnar embedded berkecepatan tinggi.',
                    'Memanfaatkan eksekusi kueri vectorized yang memanfaatkan SIMD CPU hardware.',
                    'Menghubungkan analitik DuckDB dengan backend FastAPI untuk pembuatan dashboard instan.',
                ],
                'objectivesEn': [
                    'Understand architectural differences between OLTP (PostgreSQL/MySQL) and OLAP (DuckDB/ClickHouse).',
                    'Deploy DuckDB as an embedded columnar analytical engine.',
                    'Leverage vectorized query execution exploiting hardware CPU SIMD instructions.',
                    'Integrate DuckDB analytics directly into FastAPI backends for real-time dashboards.',
                ],
                'explanationId': '''Ketika aplikasi menangani kueri analitik seperti menghitung rata-rata, agregasi, atau pengelompokan data dari jutaan baris, database tradisional (OLTP baris per baris seperti PostgreSQL) sering kali kewalahan dan membutuhkan indeks yang rumit.

### Apa itu DuckDB?
DuckDB sering dijuluki sebagai **"SQLite untuk Analytics"**. DuckDB adalah engine database kolumnar yang berjalan langsung di dalam proses aplikasi Python (in-process). Anda tidak perlu menginstal server eksternal, mengonfigurasi port jaringan, atau mengatur user permission.

### Arsitektur Kolumnar dan Eksekusi Vectorized
Berbeda dari database baris yang membaca seluruh kolom data saat melakukan kueri, DuckDB menyimpan data dalam format **kolom (Columnar Storage)**. Jika kueri Anda hanya membutuhkan kolom `sentiment_score` dan `ticker`, DuckDB hanya membaca dua kolom tersebut dari memori, mengabaikan kolom lainnya. Dengan eksekusi **Vectorized SIMD**, DuckDB dapat memproses jutaan baris angka dalam beberapa milidetik saja.

### Kapan Menggunakan DuckDB vs PostgreSQL?
- Gunakan **PostgreSQL/MySQL (OLTP)** untuk transaksi akun pengguna, order pembayaran, dan operasi atomik yang membutuhkan jaminan ACID ketat baris per baris.
- Gunakan **DuckDB (OLAP)** untuk agregasi data pasar, scoring sentimen historis, laporan metrik harian, dan query data berukuran gigabyte langsung dari file Parquet.
''',
                'explanationEn': '''When executing analytical queries computing aggregations, averages, or moving windows across millions of rows, traditional row-oriented OLTP databases (PostgreSQL/MySQL) face severe performance bottlenecks.

### What is DuckDB?
DuckDB is universally recognized as the **"SQLite for Analytics"**. It operates as an embedded columnar database executing directly within the Python application process. It eliminates external database servers, network sockets, and authentication latency.

### Columnar Storage & Vectorized SIMD Execution
Unlike row-oriented databases loading entire row entities into memory, DuckDB leverages **Columnar Storage**. When calculating `AVG(sentiment_score)`, DuckDB scans only the sentiment column vector. Paired with vectorized SIMD CPU instructions, it analyzes millions of records in single-digit milliseconds.

### OLTP vs OLAP Decision Matrix
- Deploy **PostgreSQL/MySQL (OLTP)** for transactional workloads, atomic user account updates, and strict ACID guarantees.
- Deploy **DuckDB (OLAP)** for real-time market sentiment aggregation, time-series analytical rollups, and querying gigabyte-scale Parquet files directly.
''',
                'beginnerId': '''Bayangkan sebuah perpustakaan raksasa. Database baris seperti pustakawan yang harus mengambil seluruh buku tebal hanya untuk membaca satu kata di halaman 50. Database kolumnar DuckDB seperti kliping digital yang hanya memotong kalimat yang Anda butuhkan, sehingga Anda bisa membaca ringkasan 50.000 buku dalam 2 detik.''',
                'beginnerEn': '''Imagine a massive municipal library. A row-oriented database acts like a clerk retrieving heavy encyclopedias merely to inspect a single line on page 50. A columnar database like DuckDB acts like a digital search index returning only the requested sentences, reviewing 50,000 documents in two seconds.''',
                'experimentsId': [
                    'Ubah jumlah generate_series menjadi 500.000 data dan amati waktu kueri DuckDB yang tetap di bawah 50ms.',
                    'Ekspor tabel DuckDB langsung ke file Apache Parquet menggunakan `COPY market_sentiments TO "data.parquet" (FORMAT PARQUET)`.',
                    'Jalankan kueri SQL langsung ke atas file Parquet tanpa mengimpor tabel terlebih dahulu.',
                ],
                'experimentsEn': [
                    'Increase generate_series to 500,000 rows and verify DuckDB query durations remain under 50ms.',
                    'Export the DuckDB table directly into an Apache Parquet file via `COPY market_sentiments TO "data.parquet" (FORMAT PARQUET)`.',
                    'Execute an ad-hoc SQL query directly atop the Parquet file without importing it into a table.',
                ],
                'challengeId': 'Buat fungsi analitik DuckDB yang menghitung Exponential Moving Average (EMA) 14-periode dari skor sentimen menggunakan SQL Window Functions (`OVER (ORDER BY recorded_at ROWS BETWEEN 13 PRECEDING AND CURRENT ROW)`).',
                'challengeEn': 'Build a DuckDB analytical query calculating a 14-period Exponential Moving Average (EMA) of sentiment scores using SQL Window Functions.',
                'summaryId': 'Kamu telah menguasai analitik kolumnar DuckDB dan eksekusi vectorized. Minggu depan kita membangun async web intelligence scraper dengan HTTPX dan Parsel.',
                'summaryEn': 'You have mastered DuckDB columnar analytics and vectorized queries. Next week we build an async web intelligence scraper with HTTPX and Parsel.',
            },

            # Week 7
            {
                'week': 7,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'web-scraping-httpx-parsel',
                'titleId': 'Web Intelligence Asinkron: HTTPX (HTTP/2), Parsel & Ethical Scraping',
                'titleEn': 'Async Web Intelligence: HTTPX (HTTP/2), Parsel & Ethical Scraping',
                'programId': 'Scraper Berita Finansial Asinkron dengan Rotasi Header & Politeness Delay',
                'programEn': 'Async Financial News Scraper with Header Rotation & Politeness Delays',
                'language': 'python',
                'code': '''import asyncio
import httpx
from parsel import Selector
from typing import NamedTuple

class NewsArticle(NamedTuple):
    headline: str
    link: str
    published: str

# HTML Dummy untuk demonstrasi ekstraksi selector tanpa scraping situs nyata
SAMPLE_FINANCIAL_HTML = """
<html>
    <body>
        <div class="news-feed">
            <article class="feed-item">
                <h2 class="title"><a href="/news/crypto-soars">Bitcoin Tembus Rekor Baru di Awal Tahun 2026</a></h2>
                <time class="date">10 Menit Lalu</time>
            </article>
            <article class="feed-item">
                <h2 class="title"><a href="/news/fed-interest">The Fed Pertahankan Suku Bunga Acuan Stabil</a></h2>
                <time class="date">1 Jam Lalu</time>
            </article>
            <article class="feed-item">
                <h2 class="title"><a href="/news/tech-rally">Saham Sektor Semikonduktor Kembali Menguat Tajam</a></h2>
                <time class="date">2 Jam Lalu</time>
            </article>
        </div>
    </body>
</html>
"""

def parse_financial_news(html_content: str) -> list[NewsArticle]:
    # Parsel menggunakan CSS selector & XPath berkinerja tinggi
    selector = Selector(text=html_content)
    articles: list[NewsArticle] = []

    for item in selector.css("article.feed-item"):
        headline = item.css("h2.title a::text").get(default="").strip()
        link = item.css("h2.title a::attr(href)").get(default="")
        published = item.css("time.date::text").get(default="").strip()

        if headline and link:
            articles.append(NewsArticle(headline, link, published))

    return articles

async def fetch_news_feed_simulation():
    # Menggunakan HTTPX AsyncClient dengan dukungan HTTP/2 dan timeout ketat
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) TryngoIntelligenceBot/1.0",
        "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8",
    }

    print("[CRAWLER] Mensimulasikan ekstraksi feed intelijen finansial...")
    # Simulasi latency client
    await asyncio.sleep(0.2)
    
    extracted = parse_financial_news(SAMPLE_FINANCIAL_HTML)
    print(f"[CRAWLER SUCCESS] Berhasil mengekstrak {len(extracted)} artikel berita:")
    for a in extracted:
        print(f" -> [{a.published}] {a.headline} ({a.link})")

if __name__ == "__main__":
    asyncio.run(fetch_news_feed_simulation())
''',
                'objectivesId': [
                    'Menguasai `httpx.AsyncClient` dengan dukungan protokol HTTP/2 dan connection pooling.',
                    'Menggunakan pustaka `parsel` untuk parsing HTML berbasis CSS selector dan XPath.',
                    'Menerapkan etika web scraping: rate limiting, identifikasi User-Agent, dan kepatuhan `robots.txt`.',
                    'Menangani error scraping: Cloudflare anti-bot blocks, timeouts, dan retry dengan backoff.',
                ],
                'objectivesEn': [
                    'Master `httpx.AsyncClient` with HTTP/2 protocol support and connection pooling.',
                    'Use the `parsel` library for high-speed CSS and XPath HTML extraction.',
                    'Apply ethical web scraping policies: rate limiting, User-Agent declarations, and `robots.txt` compliance.',
                    'Handle scraping challenges: anti-bot detections, timeouts, and exponential backoff.',
                ],
                'explanationId': '''Membangun sistem intelijen pasar membutuhkan pasokan berita dan data alternatif dari ribuan situs media finansial. Library lama seperti `requests` bersifat synchronous dan memblokir thread, sedangkan `httpx` dirancang untuk era modern asinkron.

### Mengapa HTTPX Menggantikan Requests?
`httpx` menyediakan antarmuka API yang ramah seperti pustaka `requests`, namun memiliki dukungan penuh untuk:
1. **Async/Await**: Dapat dijalankan di dalam event loop FastAPI atau asyncio tanpa memblokir server.
2. **HTTP/2**: Mendukung multiplexing koneksi HTTP/2, memungkinkan pengiriman beberapa request melalui satu koneksi TCP yang sama tanpa koneksi ulang berulang.

### Kecepatan Parsel vs BeautifulSoup
Meskipun BeautifulSoup populer di kalangan pemula, pustaka **Parsel** (yang menjadi mesin inti framework Scrapy) jauh lebih cepat karena didukung oleh engine C `lxml`. Parsel memungkinkan penggunaan CSS selector (`article.feed-item`) dan XPath secara mulus.

### Etika dan Ketahanan Web Intelligence
Scraper profesional tidak boleh membuat server target down (Denial of Service). Kita wajib menambahkan jeda (politeness delay), menyertakan identitas User-Agent yang jelas, dan menangani kegagalan jaringan menggunakan retry logic.
''',
                'explanationEn': '''Constructing market intelligence engines requires harvesting alternative data and breaking news feeds from thousands of financial publications. Legacy libraries like `requests` block threads synchronously, whereas `httpx` is architected for asynchronous backends.

### HTTPX vs Legacy Requests
`httpx` mirrors the intuitive ergonomics of `requests` while delivering critical modern capabilities:
1. **Async/Await Native**: Runs inside FastAPI or asyncio event loops without blocking main worker threads.
2. **HTTP/2 Multiplexing**: Reuses a single persistent TCP socket for concurrent requests, eliminating handshaking overhead.

### Parsel vs BeautifulSoup Performance
While BeautifulSoup is common among learners, **Parsel** (the parsing engine powering Scrapy) processes HTML orders of magnitude faster through underlying C-bindings (`lxml`). Parsel seamlessly pairs CSS selectors (`article.feed-item`) with expressive XPath queries.

### Ethical Web Intelligence Harvesting
Professional bots must never overwhelm publisher servers. Respecting `robots.txt`, declaring transparent User-Agent headers, and enforcing politeness delays safeguard system integrity.
''',
                'beginnerId': '''Bayangkan Anda mengumpulkan kliping koran pagi dari berbagai kios majalah. Scraper synchronous seperti orang yang berjalan kaki bolak-balik membeli koran satu per satu dari kios berbeda. Scraper HTTPX asinkron seperti mengirim 10 kurir sepeda sekaligus yang berangkat bersamaan dan kembali membawa semua koran dalam hitungan menit.''',
                'beginnerEn': '''Imagine clipping morning headlines from distributed newsstands. A synchronous scraper behaves like a pedestrian buying newspapers one by one across town. An async HTTPX scraper deploys a fleet of bicycle couriers departing simultaneously and returning with all clippings in minutes.''',
                'experimentsId': [
                    'Ubah selector CSS untuk mengekstrak hanya artikel yang memuat kata "Bitcoin".',
                    'Uji coba HTTPX AsyncClient terhadap endpoint public `https://httpbin.org/get` dengan custom headers.',
                    'Gunakan XPath selector `item.xpath(".//h2/a/text()").get()` sebagai alternatif dari CSS selector.',
                ],
                'experimentsEn': [
                    'Modify the CSS selector to isolate only articles containing the keyword "Bitcoin".',
                    'Test HTTPX AsyncClient against public endpoints like `https://httpbin.org/get` with custom headers.',
                    'Apply an XPath selector `item.xpath(".//h2/a/text()").get()` as an alternative to CSS queries.',
                ],
                'challengeId': 'Buat scraper asinkron yang membaca RSS feed XML dari portal berita finansial dan mengembalikan daftar `NewsArticle` terurut berdasarkan waktu publikasi.',
                'challengeEn': 'Build an async scraper ingesting RSS XML feeds from financial portals, yielding a `NewsArticle` collection sorted chronologically.',
                'summaryId': 'Kamu telah menguasai async HTTPX, HTTP/2, dan HTML extraction dengan Parsel. Level 2 selesai! Di Level 3 kita mempelajari Background Workers, Pytest, dan Proyek Capstone.',
                'summaryEn': 'You have mastered async HTTPX, HTTP/2, and Parsel extraction. Level 2 complete! Level 3 takes us into Background Workers, Pytest, and our Capstone Project.',
            },

            # Week 8
            {
                'week': 8,
                'level': 'advanced',
                'levelNameId': 'Lanjutan',
                'levelNameEn': 'Advanced',
                'topicId': 'background-tasks-celery-redis',
                'titleId': 'Task Queue Terdistribusi: Redis, Celery & Asynchronous Background Workers',
                'titleEn': 'Distributed Task Queues: Redis, Celery & Asynchronous Background Workers',
                'programId': 'Antrean Pemrosesan NLP Sentimen Berita dengan Redis Task Broker',
                'programEn': 'News NLP Sentiment Processing Queue with Redis Task Broker',
                'language': 'python',
                'code': '''import json
import time
import uuid

# Simulasi Antrean Tugas Berbasis Redis In-Memory
class InMemoryRedisQueue:
    def __init__(self):
        self._queue = []

    def lpush(self, queue_name: str, payload: str):
        self._queue.insert(0, payload)

    def rpop(self, queue_name: str):
        return self._queue.pop() if self._queue else None

    def qsize(self):
        return len(self._queue)

redis_broker = InMemoryRedisQueue()

# 1. Producer: Mengirim tugas scoring NLP ke antrean Redis
def enqueue_sentiment_task(ticker: str, headline: str) -> str:
    task_id = str(uuid.uuid4())
    task_payload = {
        "task_id": task_id,
        "ticker": ticker,
        "headline": headline,
        "enqueued_at": time.time()
    }
    
    redis_broker.lpush("nlp_sentiment_queue", json.dumps(task_payload))
    print(f"[PRODUCER] Tugas {task_id[:8]} untuk '{ticker}' berhasil didaftarkan ke antrean.")
    return task_id

# 2. Worker: Background process yang mengeksekusi analisis NLP berat
def run_nlp_worker_batch():
    print("\\n[WORKER] Memulai proses konsumsi antrean latar belakang...")
    processed_count = 0

    while redis_broker.qsize() > 0:
        raw_msg = redis_broker.rpop("nlp_sentiment_queue")
        if not raw_msg:
            break

        task = json.loads(raw_msg)
        print(f"[WORKER] Memproses Task {task['task_id'][:8]} | Analisis Sentimen NLP: '{task['headline']}'...")
        
        # Simulasi komputasi NLP inferensi model AI selama 150ms
        time.sleep(0.15)
        
        score = 0.85 if "Rekor" in task['headline'] else -0.40
        print(f"[WORKER DONE] Task {task['task_id'][:8]} Selesai! Skor: {score:+.2f}")
        processed_count += 1

    print(f"[WORKER IDLE] Seluruh {processed_count} tugas dalam antrean telah selesai dikerjakan.")

# Eksekusi Demonstrasi
enqueue_sentiment_task("BTC-USD", "Bitcoin Cetak Rekor Tertinggi Baru Sepanjang Sejarah")
enqueue_sentiment_task("NVDA", "Penjualan Chip AI Mengalami Koreksi Jangka Pendek")
enqueue_sentiment_task("BBCA.JK", "Laba Bersih Kuartal Pertama Tumbuh Melampaui Estimasi")

run_nlp_worker_batch()
''',
                'objectivesId': [
                    'Memahami arsitektur Distributed Task Queues (Producer, Message Broker, Worker).',
                    'Menggunakan Redis sebagai message broker berlatensi rendah untuk task queuing.',
                    'Memahami prinsip kerja Celery dan arsitektur Celery Beat untuk tugas periodik (cron).',
                    'Menerapkan task idempotency dan retry mechanism dengan Dead Letter Queue (DLQ).',
                ],
                'objectivesEn': [
                    'Understand Distributed Task Queue architecture (Producers, Message Brokers, Workers).',
                    'Deploy Redis as an ultra-low-latency in-memory message broker.',
                    'Master Celery task workers and Celery Beat periodic cron scheduling.',
                    'Enforce task idempotency and fault-tolerant retries with Dead Letter Queues (DLQ).',
                ],
                'explanationId': '''Model AI dan Natural Language Processing (NLP) membutuhkan waktu komputasi CPU/GPU yang signifikan (ratusan milidetik hingga beberapa detik). Endpoint API tidak boleh menahan koneksi HTTP pengguna saat model AI sedang menghitung skor sentimen.

### Arsitektur Task Queue Terdistribusi
Sistem dibagi menjadi tiga bagian independen:
1. **Producer (FastAPI)**: Menerima HTTP request, membuat task ID, memasukkan tugas ke broker dalam beberapa milidetik, dan langsung mengembalikan respons `HTTP 202 Accepted` ke pengguna.
2. **Message Broker (Redis)**: Menyimpan antrean tugas secara persisten dan thread-safe di memori.
3. **Consumers/Workers (Celery / Background Workers)**: Node pekerja terpisah yang terus memantau antrean, mengeksekusi model AI, dan menyimpan hasilnya ke database analitik.

### Tugas Periodik dengan Celery Beat
Selain tugas berbasis request pengguna, sistem intelijen pasar membutuhkan scraping rutin setiap 5 menit. **Celery Beat** bertindak sebagai scheduler (cron digital terdistribusi) yang memicu tugas crawling secara otomatis tepat waktu.

### Idempotensi Tugas (Task Idempotency)
Dalam jaringan terdistribusi, ada kemungkinan tugas yang sama dieksekusi dua kali karena timeout jaringan. Desain tugas yang baik harus bersifat **Idempotent**: menjalankan tugas yang sama berulang kali tidak boleh menghasilkan data duplikat atau efek samping ganda pada saldo/database.
''',
                'explanationEn': '''Natural Language Processing (NLP) models require non-trivial CPU/GPU inference cycles (hundreds of milliseconds). Web APIs must never block user HTTP connections while language models compute sentiment scores.

### Distributed Task Queue Architecture
The workload partitions across three decoupled layers:
1. **Producers (FastAPI)**: Ingest HTTP requests, generate unique task IDs, dispatch tasks to the broker in sub-milliseconds, and yield `HTTP 202 Accepted`.
2. **Message Brokers (Redis)**: Retains task queues durably in memory with atomic FIFO guarantees.
3. **Workers (Celery / Dedicated Processes)**: Autonomous worker pods consuming queued tasks, running NLP inference, and persisting outputs into analytics tables.

### Scheduled Crons via Celery Beat
Market intelligence engines demand periodic polling (e.g., scraping headline feeds every 60 seconds). **Celery Beat** functions as a distributed cron coordinator triggering scheduled tasks reliably.

### Idempotency Principles
Network timeouts occasionally cause tasks to re-deliver. Systems must enforce **Idempotency**: re-executing identical task payloads must yield consistent database states without generating duplicate records.
''',
                'beginnerId': '''Bayangkan restoran pizza. Pelayan kasir (FastAPI) mencatat pesanan Anda dalam 30 detik dan memberikan Anda struk nomor antrean (Task ID). Kasir meletakkan slip pesanan di rak gantung dapur (Redis Broker). Koki di dapur (Celery Worker) mengambil slip tersebut dan memanggang pizza Anda tanpa membuat orang di kasir depan menunggu.''',
                'beginnerEn': '''Think of a pizzeria. The cashier (FastAPI) records your order in 30 seconds and hands you a numbered receipt (the Task ID). The cashier clips the ticket to the kitchen carousel (Redis Broker). Line cooks (Celery Workers) retrieve the ticket and bake the pizza without keeping the front register line waiting.''',
                'experimentsId': [
                    'Kirim 10 tugas sekaligus dan amati bagaimana worker menghabiskannya satu per satu secara berurutan.',
                    'Simulasikan worker kedua yang bekerja secara paralel untuk mempercepat waktu penyelesaian total.',
                    'Tambahkan field `status: PENDING | SUCCESS | FAILED` untuk memeriksa progres tugas via Task ID.',
                ],
                'experimentsEn': [
                    'Enqueue 10 tasks simultaneously and observe the worker consuming them sequentially.',
                    'Simulate a second worker process consuming tasks in parallel to double throughput.',
                    'Add a `status: PENDING | SUCCESS | FAILED` tracking dictionary to inspect task progress via Task ID.',
                ],
                'challengeId': 'Bangun sistem Task Dead-Letter Queue (DLQ): jika sebuah tugas gagal dieksekusi sebanyak 3 kali, otomatis pindahkan payload tugas ke antrean `nlp_dead_letters` untuk investigasi manual.',
                'challengeEn': 'Build a Dead-Letter Queue (DLQ) mechanism: if task execution fails 3 times, transfer the task payload to an `nlp_dead_letters` queue for manual auditing.',
                'summaryId': 'Kamu telah menguasai Distributed Task Queues dengan Redis dan Celery workers. Minggu depan kita mempelajari arsitektur pengujian otomatis asinkron dengan Pytest.',
                'summaryEn': 'You have mastered Distributed Task Queues with Redis and Celery workers. Next week we explore automated async testing with Pytest.',
            },

            # Week 9
            {
                'week': 9,
                'level': 'advanced',
                'levelNameId': 'Lanjutan',
                'levelNameEn': 'Advanced',
                'topicId': 'production-packaging-pytest',
                'titleId': 'Arsitektur Pengujian Asinkron: Pytest, Mocks & Testcontainers',
                'titleEn': 'Async Testing Architecture: Pytest, Mocks & Testcontainers',
                'programId': 'Suite Pengujian Unit & Integrasi Asinkron Komprehensif dengan Pytest',
                'programEn': 'Comprehensive Async Unit & Integration Test Suite with Pytest',
                'language': 'python',
                'code': '''import asyncio
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
''',
                'objectivesId': [
                    'Menguasai framework pengujian modern `pytest` dan plugin `pytest-asyncio`.',
                    'Menggunakan `unittest.mock.AsyncMock` untuk mengisolasi dependensi eksternal (API pihak ketiga).',
                    'Memahami konsep Fixtures (`@pytest.fixture`) untuk dependency injection dalam pengujian.',
                    'Mencapai code coverage tinggi dan menguji skenario edge cases sistem finansial.',
                ],
                'objectivesEn': [
                    'Master modern testing paradigms with `pytest` and `pytest-asyncio`.',
                    'Use `unittest.mock.AsyncMock` to isolate third-party external dependencies.',
                    'Understand `@pytest.fixture` mechanics for test state management and dependency injection.',
                    'Achieve high code coverage and stress-test financial edge cases deterministically.',
                ],
                'explanationId': '''Dalam aplikasi keuangan dan backend produksi, menguji kode secara manual melalui browser atau Postman adalah resep bencana. Satu bug kecil pada pembulatan desimal atau race condition dapat merugikan jutaan rupiah.

### Mengapa Pytest adalah Standar Industri?
`pytest` menggantikan pustaka `unittest` lama warisan Java yang kaku. Pytest memungkinkan penulisan pengujian sederhana menggunakan kata kunci bawaan Python `assert` tanpa method pembungkus yang rumit (`self.assertEqual(...)`).

### Pengujian Asinkron dengan pytest-asyncio
Karena method backend kita menggunakan `async def`, pengujian unit harus dapat menjalankan coroutine di dalam event loop. Anotasi `@pytest.mark.asyncio` memberitahu pytest untuk membungkus fungsi test dalam event loop sementara dan menunggu eksekusi coroutine (`await`) hingga selesai.

### Kekuatan Mocking dengan AsyncMock
Unit test yang baik harus berjalan dalam hitungan milidetik dan tidak boleh mengirim request HTTP asli ke internet (karena bisa gagal jika internet lambat atau terkena kuota API). Dengan `AsyncMock`, kita mensimulasikan respons API bursa secara deterministik sehingga pengujian dapat diulang ribuan kali di pipeline CI/CD GitHub Actions.
''',
                'explanationEn': '''In financial applications, manually verifying endpoints via Postman or browser tabs invites catastrophe. A subtle rounding flaw or race condition can incur massive financial liability.

### The Superiority of Pytest
`pytest` supersedes legacy Java-inspired `unittest` boilerplate. It allows engineers to author tests utilizing native Python `assert` statements rather than cumbersome assertion methods (`self.assertEqual(...)`).

### Asynchronous Testing via pytest-asyncio
Because modern backends employ `async def`, testing suites must spin up test coroutines within isolated event loops. Decorating test functions with `@pytest.mark.asyncio` provisions an ephemeral loop, awaiting coroutines seamlessly.

### Deterministic Mocking with AsyncMock
Production unit tests must execute in single-digit milliseconds without making real network roundtrips (which introduce flakiness, rate limits, and network costs). `AsyncMock` injects deterministic responses, allowing thousands of assertions to pass within CI/CD pipelines.
''',
                'beginnerId': '''Bayangkan latihan simulator penerbangan untuk pilot pesawat. Daripada menerbangkan pesawat sungguhan ke tengah badai petir untuk menguji reaksi pilot (berbahaya dan mahal), pilot dilatih di dalam kokpit simulator buatan (Mock). Jika simulator dimatikan atau ada badai buatan, pilot bisa menguji semua tombol darurat dengan aman.''',
                'beginnerEn': '''Think of a flight simulator for airline captains. Rather than flying real aircraft into severe thunderstorms to test pilot reactions (dangerous and expensive), captains train inside a simulated replica cockpit (the Mock). All emergency checklists can be verified repeatedly in complete safety.''',
                'experimentsId': [
                    'Tambahkan test case baru yang memverifikasi bahwa sinyal "SELL" dihasilkan jika rata-rata skor adalah -0.6.',
                    'Simulasikan timeout jaringan dengan mengonfigurasi `mock_client.fetch_latest_headlines.side_effect = TimeoutError()`.',
                    'Gunakan flag pytest `--cov` untuk mengukur persentase cakupan pengujian (test coverage).',
                ],
                'experimentsEn': [
                    'Author an additional test verifying a "SELL" signal is triggered when average sentiment evaluates to -0.6.',
                    'Simulate network timeouts via `mock_client.fetch_latest_headlines.side_effect = TimeoutError()`.',
                    'Utilize pytest `--cov` flags to evaluate repository code coverage metrics.',
                ],
                'challengeId': 'Buat integration test menggunakan `httpx.AsyncClient` dan `ASGITransport` untuk menguji endpoint FastAPI secara menyeluruh tanpa perlu membuka port jaringan TCP fisik.',
                'challengeEn': 'Build an integration test using `httpx.AsyncClient` with `ASGITransport` to test FastAPI routes end-to-end without opening physical TCP sockets.',
                'summaryId': 'Kamu telah menguasai pytest, pytest-asyncio, dan isolasi mocking. Minggu depan adalah Capstone Final: Mesin Intelijen & Sentimen Pasar Keuangan Lengkap!',
                'summaryEn': 'You have mastered pytest, pytest-asyncio, and mock isolation. Next week is our Final Capstone: Complete Financial Market Intelligence Engine!',
            },

            # Week 10
            {
                'week': 10,
                'level': 'advanced',
                'levelNameId': 'Lanjutan',
                'levelNameEn': 'Advanced',
                'topicId': 'capstone-market-intelligence',
                'titleId': 'Capstone: Mesin Intelijen & Sentimen Pasar Keuangan Real-Time Production-Ready',
                'titleEn': 'Capstone: Production-Ready Real-Time Financial Market Intelligence Engine',
                'programId': 'Layanan Sentimen Pasar Lengkap (FastAPI, Asyncio, DuckDB Analytics & WebSocket)',
                'programEn': 'Complete Market Sentiment Service (FastAPI, Asyncio, DuckDB Analytics & WebSocket)',
                'language': 'python',
                'code': '''from fastapi import FastAPI, WebSocket, WebSocketDisconnect, status
from pydantic import BaseModel, Field
import duckdb
from datetime import datetime, timezone
import asyncio
import json

app = FastAPI(
    title="Tryngo Financial Market Intelligence Engine",
    version="2.0.0",
    description="Sistem analitik sentimen pasar terdistribusi dengan DuckDB & WebSocket stream"
)

# Inisialisasi DuckDB In-Memory OLAP Store
analytics_db = duckdb.connect(database=":memory:")
analytics_db.execute("""
    CREATE TABLE ticker_sentiments (
        ticker VARCHAR,
        score DOUBLE,
        confidence DOUBLE,
        source VARCHAR,
        timestamp TIMESTAMP
    );
""")

class IngestSignalRequest(BaseModel):
    ticker: str = Field(..., min_length=2, max_length=12)
    score: float = Field(..., ge=-1.0, le=1.0)
    confidence: float = Field(default=0.9, ge=0.0, le=1.0)
    source: str = Field(default="RSS_NEWS_FEED")

# Pengelola Koneksi WebSocket Real-Time (Broadcaster)
class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_text(json.dumps(message))
            except Exception:
                pass

broadcaster = ConnectionManager()

# 1. Endpoint Ingesti Sinyal Sentimen Baru
@app.post("/api/v1/signals", status_code=status.HTTP_201_CREATED)
async def ingest_market_signal(req: IngestSignalRequest):
    ticker_clean = req.ticker.strip().upper()
    now_utc = datetime.now(timezone.utc)

    # Masukkan ke DuckDB untuk agregasi analitik kilat
    analytics_db.execute("""
        INSERT INTO ticker_sentiments VALUES (?, ?, ?, ?, ?);
    """, [ticker_clean, req.score, req.confidence, req.source, now_utc])

    payload = {
        "event": "NEW_SENTIMENT_SIGNAL",
        "ticker": ticker_clean,
        "score": req.score,
        "classification": "BULLISH" if req.score > 0.2 else ("BEARISH" if req.score < -0.2 else "NEUTRAL"),
        "timestamp": now_utc.isoformat()
    }

    # Siarkan secara instan ke seluruh klien dashboard via WebSocket
    await broadcaster.broadcast(payload)
    return {"status": "INGESTED", "data": payload}

# 2. Endpoint Analitik OLAP (DuckDB Vectorized Calculation)
@app.get("/api/v1/analytics/summary")
async def get_market_sentiment_summary():
    result = analytics_db.execute("""
        SELECT 
            ticker,
            COUNT(*) AS signal_count,
            ROUND(AVG(score), 4) AS composite_sentiment,
            ROUND(AVG(confidence), 4) AS avg_confidence,
            CASE 
                WHEN AVG(score) > 0.25 THEN 'STRONG_BUY'
                WHEN AVG(score) < -0.25 THEN 'STRONG_SELL'
                ELSE 'HOLD'
            END AS recommended_action
        FROM ticker_sentiments
        GROUP BY ticker
        ORDER BY signal_count DESC;
    """).fetchall()

    summary = [
        {
            "ticker": r[0],
            "signals": r[1],
            "composite_sentiment": r[2],
            "avg_confidence": r[3],
            "action": r[4]
        }
        for r in result
    ]
    return {"total_tickers": len(summary), "analytics": summary}

# 3. WebSocket Real-Time Stream untuk Terminal Finansial
@app.websocket("/ws/market-feed")
async def market_feed_websocket(websocket: WebSocket):
    await broadcaster.connect(websocket)
    try:
        while True:
            # Jaga koneksi tetap hidup (Ping-Pong)
            _ = await websocket.receive_text()
    except WebSocketDisconnect:
        broadcaster.disconnect(websocket)
''',
                'objectivesId': [
                    'Mengintegrasikan seluruh ekosistem: FastAPI, Pydantic v2, DuckDB Analytics, dan WebSocket.',
                    'Membangun broadcasting feed data pasar real-time ke banyak klien WebSocket bersamaan.',
                    'Menjalankan kueri agregasi komposit berkecepatan tinggi langsung dari memori DuckDB.',
                    'Menerapkan arsitektur backend Python yang siap dideploy di Docker dan cloud Kubernetes.',
                ],
                'objectivesEn': [
                    'Integrate the complete ecosystem: FastAPI, Pydantic v2, DuckDB Analytics, and WebSockets.',
                    'Build a real-time market data broadcasting hub to concurrent WebSocket subscribers.',
                    'Execute ultra-low-latency composite sentiment queries directly against DuckDB memory.',
                    'Architect a production-grade Python backend ready for Docker and Kubernetes deployment.',
                ],
                'explanationId': '''Selamat! Anda telah mencapai proyek Capstone akhir kurikulum Python Backend & Automation. Sistem ini memadukan seluruh keunggulan Python modern ke dalam satu platform intelijen pasar finansial yang tangguh, asinkron, dan berkinerja tinggi.

### Arsitektur Aliran Data (Data Pipeline Flow)
1. **Ingestion Layer**: Endpoint REST `/api/v1/signals` menerima sinyal dari puluhan bot crawler berita secara bersamaan. Pydantic v2 memvalidasi payload dalam hitungan sub-milidetik.
2. **Analytics Tier (DuckDB)**: Data disimpan ke dalam DuckDB engine. Kueri analitik seperti perhitungan Composite Sentiment Index dan rekomendasi pasar (`STRONG_BUY`, `STRONG_SELL`) dieksekusi secara vectorized hanya dalam beberapa milidetik tanpa membebani server utama.
3. **Real-Time Distribution (WebSocket)**: Menggunakan kelas `ConnectionManager`, setiap kali sinyal baru masuk, sinyal tersebut langsung disiarkan secara asinkron ke seluruh browser trader yang terhubung ke `/ws/market-feed`.

### Efisiensi Sumber Daya
Karena seluruh komponen bersifat asinkron dan memanfaatkan DuckDB embedded, aplikasi ini dapat memproses puluhan ribu sinyal per menit dengan konsumsi RAM di bawah 150MB, membuktikan bahwa Python modern mampu bersaing dengan bahasa terkompilasi dalam hal efisiensi operasional.
''',
                'explanationEn': '''Congratulations! You have reached the Capstone project. This application synthesizes modern Python backend engineering paradigms into a high-throughput, production-ready financial market intelligence engine.

### Data Pipeline Architecture
1. **Ingestion Layer**: The `/api/v1/signals` endpoint ingests signals from distributed news crawler bots concurrently. Pydantic v2 validates incoming payloads within sub-milliseconds.
2. **Analytics Tier (DuckDB)**: Events stream directly into DuckDB. Complex analytical queries computing Composite Sentiment Indices and trading actions (`STRONG_BUY`, `STRONG_SELL`) execute in single-digit milliseconds via vectorized SIMD engines.
3. **Real-Time Distribution (WebSockets)**: Leveraging the `ConnectionManager`, new signals broadcast instantaneously to hundreds of concurrent connected trader terminals at `/ws/market-feed`.

### Resource Efficiency
Because the entire stack operates asynchronously atop DuckDB's in-process engine, this service ingests tens of thousands of signals per minute while consuming under 150MB of RAM—proving modern Python's viability in high-performance cloud environments.
''',
                'beginnerId': '''Proyek ini ibarat ruang komando intelijen bursa efek. Di pintu depan, kurir membawa ribuan berita ekonomi setiap menit (FastAPI). Di ruang analisis pusat, komputer super langsung mengelompokkan dan menghitung sentimen pasar dalam sekejap mata (DuckDB). Dan di dinding utama, layar monitor raksasa langsung menampilkan kedipan lampu hijau (Bullish) atau merah (Bearish) kepada para trader di seluruh dunia (WebSocket).''',
                'beginnerEn': '''This project mirrors a digital financial exchange command room. At the intake dock, courier bots deliver thousands of market dispatches every minute (FastAPI). In the data center, an automated compute cluster calculates sentiment rollups in fractions of a second (DuckDB). And on the perimeter walls, ticker screens flash buy/sell signals to market makers worldwide (WebSockets).''',
                'experimentsId': [
                    'Jalankan server menggunakan `uvicorn` dan kirim 5 sinyal berbeda ke `/api/v1/signals`.',
                    'Buka endpoint `/api/v1/analytics/summary` dan perhatikan bagaimana rekomendasi pasar dihitung secara otomatis.',
                    'Hubungkan klien WebSocket menggunakan browser console (`new WebSocket(...)`) dan pantau broadcast sinyal real-time.',
                ],
                'experimentsEn': [
                    'Launch the server via `uvicorn` and submit 5 distinct signals to `/api/v1/signals`.',
                    'Navigate to `/api/v1/analytics/summary` and observe the automated sentiment recommendations.',
                    'Connect a WebSocket client via browser dev tools (`new WebSocket(...)`) and monitor real-time signal broadcasts.',
                ],
                'challengeId': 'Tambahkan endpoint ekspor data `/api/v1/analytics/export?format=parquet` yang mengalirkan file Apache Parquet langsung ke client sebagai file download.',
                'challengeEn': 'Add an export endpoint `/api/v1/analytics/export?format=parquet` streaming an Apache Parquet binary file directly to clients as a file download.',
                'summaryId': 'Selamat! Kamu telah menyelesaikan seluruh kurikulum Python Backend & Automation dari nol hingga sistem intelijen pasar keuangan berskala produksi!',
                'summaryEn': 'Congratulations! You have completed the entire Python Backend & Automation curriculum from zero to an enterprise production market intelligence engine!',
            },
        ]
    }
