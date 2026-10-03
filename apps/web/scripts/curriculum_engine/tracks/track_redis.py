import sys
import os

def get_track():
    levels = [
        {
            'levelId': 'beginer',
            'nameId': 'Struktur Data In-Memory & Pola Caching',
            'nameEn': 'In-Memory Data Structures & Caching Patterns',
            'descId': 'Arsitektur Single-Threaded Event Loop, tipe data inti (Strings, Hashes, Lists, Sets, Sorted Sets), HyperLogLog, dan pola Cache-Aside dengan eviksi LRU.',
            'descEn': 'Single-Threaded Event Loop architecture, core data types (Strings, Hashes, Lists, Sets, Sorted Sets), HyperLogLog, and Cache-Aside patterns with LRU eviction.',
        },
        {
            'levelId': 'intermediate',
            'nameId': 'Scripting Lua, Streams & Klaster Terdistribusi',
            'nameEn': 'Lua Scripting, Streams & Distributed Cluster',
            'descId': 'Scripting Lua atomic, sliding window rate limiting, Redis Streams dengan Consumer Groups, Sentinel HA, dan capstone caching & gaming leaderboard engine.',
            'descEn': 'Atomic Lua scripting, sliding window rate limiting, Redis Streams with Consumer Groups, Sentinel HA, and gaming leaderboard & caching capstone engine.',
        }
    ]

    modules = [
        # WEEK 1
        {
            'week': 1,
            'level': 'beginer',
            'levelNameId': 'Struktur Data In-Memory & Pola Caching',
            'levelNameEn': 'In-Memory Data Structures & Caching Patterns',
            'topicId': 'arsitektur-in-memory-strings-dan-manajemen-ttl',
            'titleId': 'Arsitektur In-Memory, Strings & Manajemen TTL (Time-To-Live)',
            'titleEn': 'In-Memory Architecture, Strings & TTL (Time-To-Live) Management',
            'language': 'redis',
            'programId': 'Manajemen Sesi Pengguna dan Atomic Counter dengan Expiration',
            'programEn': 'User Session Management and Atomic Counters with Expiration',
            'code': """# Redis CLI Commands Demonstration
# 1. Store serialized JSON session with explicit Time-To-Live (3600 seconds)
SET session:usr_8921 '{"userId": 8921, "role": "admin", "tenant": "corp_alpha"}' EX 3600

# 2. Check remaining lifetime in seconds
TTL session:usr_8921

# 3. Retrieve session payload
GET session:usr_8921

# 4. Atomic Counter: Page visit counter incrementing safely under high concurrency
INCR stats:page_views:home:2026-03-10

# Increment by custom batch step
INCRBY stats:page_views:home:2026-03-10 15

# Set expiration on the metrics key (keep for 7 days = 604800 seconds)
EXPIRE stats:page_views:home:2026-03-10 604800

# 5. Conditional Insertion (SETNX: Set if Not Exists) - Foundational Distributed Mutex
# Sets lock key ONLY if it does not already exist, with 10-second automatic safety release
SET lock:order_processing:ord_9901 "worker_node_01" NX EX 10

# Attempting to acquire the same lock concurrently fails (returns nil)
SET lock:order_processing:ord_9901 "worker_node_02" NX EX 10

# Safe lock release
DEL lock:order_processing:ord_9901

# 6. Bulk read and write operations to minimize network round trips (pipelining benefits)
MSET config:maintenance_mode "false" config:max_upload_mb "50" config:api_version "v2.1"
MGET config:maintenance_mode config:max_upload_mb
""",
            'objectivesId': [
                'Memahami arsitektur Single-Threaded Event Loop Redis dan multiplexing I/O epoll/kqueue',
                'Menguasai tipe data String dan operasi nilai angka atomic: INCR, INCRBY, DECR',
                'Mengelola siklus hidup data cache dengan parameter EX, PX, EXPIRE, dan pemantauan TTL',
                'Mengimplementasikan primitive lock dasar menggunakan perintah SET dengan opsi NX dan EX'
            ],
            'objectivesEn': [
                'Understand Redis Single-Threaded Event Loop architecture and epoll/kqueue I/O multiplexing',
                'Master String data types and atomic numeric mutations: INCR, INCRBY, DECR',
                'Manage cache lifecycle using EX, PX, EXPIRE parameters and TTL introspection',
                'Implement rudimentary distributed locking primitives using SET with NX and EX flags'
            ],
            'explanationId': """### Mengapa Redis Super Cepat? Arsitektur Single-Threaded Event Loop
Mitos umum mengatakan sistem multi-threaded selalu lebih cepat. Kenyataannya, Redis mampu melayani lebih dari 100.000 permintaan per detik (*ops/sec*) pada satu core CPU sederhana karena arsitektur **Single-Threaded Event Loop**. 
1. Seluruh dataset disimpan murni di **RAM** (latensi memori nanodetik vs latensi disk milidetik).
2. Tidak ada overhead penguncian thread (*lock contention*), tidak ada race condition internal, dan tidak ada biaya *context switching* CPU.
3. Menggunakan **I/O Multiplexing** (`epoll` di Linux atau `kqueue` di macOS) untuk menangani puluhan ribu koneksi soket jaringan secara non-blocking dalam satu thread.

### Tipe Data String Bukan Sekadar Teks
Di Redis, tipe **String** adalah *binary-safe*, artinya dapat menyimpan apa saja hingga ukuran 512MB: string teks, representasi JSON terkompresi, gambar biner kecil, atau angka. Jika string berisi angka, Redis mengizinkan operasi matematis atomic seperti `INCRBY`. Operasi ini terjamin atomic secara mutlak: 1.000 thread konkuren yang memanggil `INCR` secara simultan dijamin menaikkan counter tepat 1.000 kali tanpa kehilangan angka.

### SET NX EX: Primitif Kunci Mutex
Perintah `SET key value NX EX seconds`:
- `NX` (*Not Exists*): Hanya menetapkan nilai jika kunci belum pernah ada. Jika kunci sudah ada, perintah gagal (*nil*).
- `EX`: Menentukan waktu kedaluwarsa dalam detik. Opsi ini krusial: jika proses aplikasi yang memegang kunci crash mendadak, Redis akan otomatis melepaskan kunci setelah batas detik tercapai, mencegah *system deadlock*.""",
            'explanationEn': """### Why Redis is Blazing Fast: The Single-Threaded Event Loop
A widespread fallacy assumes multi-threaded systems are universally faster. Redis processes over 100,000 operations per second on a single CPU core thanks to its **Single-Threaded Event Loop**:
1. Datasets reside purely in **RAM** (nanosecond memory bus access vs millisecond physical disk latency).
2. Zero thread lock contention, zero race conditions on mutating structures, and zero CPU context-switching overhead.
3. Powered by **I/O Multiplexing** (`epoll` on Linux, `kqueue` on macOS) handling tens of thousands of concurrent client connections over non-blocking sockets.

### Binary-Safe Strings and Atomic Math
Redis **Strings** are strictly binary-safe and can store arbitrary payloads up to 512MB: plaintext, serialized JSON blobs, binary Protocol Buffers, or numerical scalars. When storing numeric strings, Redis enables atomic scalar operations like `INCRBY`. Atomic execution is absolute: 1,000 concurrent threads issuing `INCR` increment the counter by exactly 1,000 with zero lost updates.

### SET NX EX: The Mutex Lock Primitive
The statement `SET key value NX EX seconds`:
- `NX` (*Not Exists*): Writes the key exclusively if it does not currently exist. Returns *nil* upon collision.
- `EX`: Injects an atomic Time-To-Live countdown in seconds. This prevents perpetual deadlocks: if the worker holding the lock crashes ungracefully, Redis automatically purges the lock key upon expiry.""",
            'beginnerId': """Bayangkan Redis seperti kasir tunggal super cepat di sebuah kedai kopi. Karena kasirnya hanya satu orang jenius yang mengingat semua pesanan di kepalanya (RAM) tanpa pernah mencatat di kertas lambat (Disk), ia bisa melayani 100 orang per detik tanpa pernah bertabrakan dengan pelayan lain.

`SET NX` seperti menaruh tanda 'Sedang Dipakai' di pintu toilet. Jika pintu sudah terkunci dari dalam, orang lain tidak bisa masuk. Tanda `EX 10` memastikan gembok otomatis terbuka sendiri setelah 10 menit jika orang di dalam pingsan.""",
            'beginnerEn': """Think of Redis like a single, superhumanly fast barista at an espresso bar. Because this lone barista holds every order purely in their mind (RAM) rather than writing on paper notepads (Disk), they serve 100 customers per second without colliding into other staff.

`SET NX` is like sliding the 'Occupied' sign on a restroom door. If the door is already latched, nobody else can enter. The `EX 10` timer guarantees the lock pops open automatically after 10 minutes if someone passes out inside.""",
            'experimentsId': [
                'Set sebuah kunci dengan EX 5, jalankan TTL berkali-kali setiap detik sampai nilainya berubah menjadi -2 (kunci terhapus)',
                'Jalankan INCRBY pada string yang berisi teks alfabet dan amati error ERR value is not an integer or out of range',
                'Simulasikan benchmark throughput lokal menggunakan utilitas resmi redis-benchmark -q -n 100000 -c 50',
                'Gunakan perintah KEYS * vs SCAN 0 MATCH session:* dan pahami mengapa KEYS dilarang di production'
            ],
            'experimentsEn': [
                'Set a key with EX 5, poll TTL iteratively each second until it transitions to -2 (key expired and pruned)',
                'Execute INCRBY against a non-numeric string to inspect ERR value is not an integer or out of range',
                'Run a local throughput benchmark using the official redis-benchmark utility: redis-benchmark -q -n 100000 -c 50',
                'Compare KEYS * versus SCAN 0 MATCH session:* and understand why KEYS is strictly forbidden in production'
            ],
            'challengeId': 'Rancang sistem penghitung kuota API sederhana (Rate Limiter primitif) per IP per menit menggunakan kombinasi perintah `INCR` dan penambahan `EXPIRE 60` hanya ketika counter bernilai 1.',
            'challengeEn': 'Architect a basic per-minute API Rate Limiter by IP address using `INCR` and conditionally triggering `EXPIRE 60` only when the counter initializes to 1.',
            'summaryId': 'Anda telah memahami arsitektur Single-Threaded Event Loop Redis, manipulasi tipe String dan atomic counter, manajemen siklus hidup TTL, serta dasar mutex lock dengan SET NX EX.',
            'summaryEn': 'You have mastered the Redis Single-Threaded Event Loop, binary-safe Strings and atomic counters, TTL lifecycle management, and foundational mutex locking via SET NX EX.'
        },

        # WEEK 2
        {
            'week': 2,
            'level': 'beginer',
            'levelNameId': 'Struktur Data In-Memory & Pola Caching',
            'levelNameEn': 'In-Memory Data Structures & Caching Patterns',
            'topicId': 'struktur-data-koleksi-hashes-lists-dan-sets',
            'titleId': 'Struktur Data Koleksi: Hashes, Lists & Sets',
            'titleEn': 'Collection Data Structures: Hashes, Lists & Sets',
            'language': 'redis',
            'programId': 'Profil Objek dengan Hashes, Antrean Job FIFO dengan Lists, dan Tag Unik dengan Sets',
            'programEn': 'Object Profiling with Hashes, FIFO Job Queue with Lists, and Unique Tags with Sets',
            'code': """# 1. HASHES: Ideal for representing structured objects without JSON serialization overhead
# Store user profile fields individually
HSET user:profile:1001 name "Dewi Sartika" email "dewi@example.com" login_count 1 tier "gold"

# Increment specific numerical hash field atomically
HINCRBY user:profile:1001 login_count 1

# Retrieve single field, multiple fields, or entire object
HGET user:profile:1001 email
HMGET user:profile:1001 name tier
HGETALL user:profile:1001

# 2. LISTS: Ordered sequence of strings implemented as dual-ended linked lists (Quicklist)
# Push jobs into a background worker queue (Producer)
LPUSH queue:email_jobs '{"to": "dewi@example.com", "template": "welcome"}'
LPUSH queue:email_jobs '{"to": "ahmad@example.com", "template": "invoice"}'

# Inspect queue length
LLEN queue:email_jobs

# Worker pops job from right (Consumer FIFO: First-In, First-Out)
RPOP queue:email_jobs

# Blocking Pop: Worker sleeps waiting for new jobs without polling CPU (timeout 5s)
# BRPOP queue:email_jobs 5

# 3. SETS: Unordered collection of unique strings (O(1) membership checks and mathematical unions)
# Add follower tags
SADD user:tags:1001 "tech" "investing" "crypto" "ai"
SADD user:tags:1002 "tech" "design" "ai" "gaming"

# Test membership: Does user 1001 have "investing" tag? (Returns 1)
SISMEMBER user:tags:1001 "investing"

# Mathematical Intersection: Find mutual interests between user 1001 and 1002
SINTER user:tags:1001 user:tags:1002

# Union: Combine all unique interests across both users
SUNION user:tags:1001 user:tags:1002

# Difference: Interests unique to user 1001 not shared by 1002
SDIFF user:tags:1001 user:tags:1002
""",
            'objectivesId': [
                'Memanfaatkan Redis Hashes untuk menyimpan objek terstruktur dan menghemat memori (ziplist/listpack encoding)',
                'Membangun antrean pesan FIFO berkecepatan tinggi menggunakan Lists (LPUSH dan RPOP / BRPOP)',
                'Menggunakan Sets untuk memastikan keunikan data dan operasi himpunan matematika (SINTER, SUNION, SDIFF)',
                'Memahami kompleksitas waktu masing-masing operasi struktur data Redis (O(1) vs O(N))'
            ],
            'objectivesEn': [
                'Leverage Redis Hashes for structured object representation and memory optimization (ziplist/listpack)',
                'Construct high-throughput FIFO background task queues using Lists (LPUSH and RPOP / BRPOP)',
                'Apply Sets for uniqueness guarantees and mathematical set algebra (SINTER, SUNION, SDIFF)',
                'Evaluate computational time complexity across Redis data structure operations (O(1) vs O(N))'
            ],
            'explanationId': """### Hashes: Representasi Objek Hemat RAM
Menyimpan objek pengguna dalam format serialized JSON String (`"{\"name\": \"...\"}"`) memiliki dua kelemahan: untuk mengubah satu field saja (misal `login_count`), aplikasi harus mengambil seluruh string JSON, mem-parse, mengubah, dan menimpa semuanya ke Redis. Dengan **Hashes** (`HSET / HGET`), Anda dapat memodifikasi satu field tertentu secara individual. Di balik layar, Redis mengompresi Hashes kecil menggunakan struktur memori hemat yang disebut **listpack/ziplist**.

### Lists: Antrean FIFO dan Pola Blocking Worker
Redis **List** diimplementasikan sebagai linked list ganda (*quicklist*). Menyisipkan data di ujung kiri (`LPUSH`) atau mengambil data di ujung kanan (`RPOP`) memiliki kompleksitas $O(1)$ instan, tidak peduli apakah list berisi 10 elemen atau 10 juta elemen. Perintah `BRPOP` (*Blocking Right Pop*) membuat thread worker tertidur pulas (*sleep*) dan langsung terbangun saat ada job baru masuk, mengeliminasi polling boros CPU.

### Sets: Aljabar Himpunan dan Graf Relasi
Redis **Sets** menyimpan kumpulan string unik tanpa duplikasi. Penambahan data (`SADD`) dan pengecekan anggota (`SISMEMBER`) berjalan dalam kompleksitas waktu $O(1)$. Kekuatan terbesar Sets terletak pada operasi aljabar himpunan server-side:
- `SINTER`: Menghitung perpotongan dua himpunan (misal mencari *mutual friends* atau kesamaan minat belanja).
- `SDIFF`: Menghitung selisih himpunan. Seluruh kalkulasi dieksekusi langsung di memori RAM Redis dengan kecepatan mikrodetik.""",
            'explanationEn': """### Hashes: Memory-Efficient Object Projections
Persisting structured user entities as serialized JSON Strings incurs network and CPU waste: updating an isolated attribute (e.g. `login_count`) forces the client to fetch the entire blob, deserialize, mutate, re-serialize, and upload it back. Redis **Hashes** allow granular, single-attribute mutations (`HINCRBY`, `HSET`). Internally, small hashes are compressed using memory-dense **listpack/ziplist** encodings.

### Lists: Dual-Ended Queues and Blocking Consumers
Redis **Lists** are structured as dual-ended linked lists (*quicklists*). Prepending to the head (`LPUSH`) and popping from the tail (`RPOP`) maintain strict $O(1)$ time complexity regardless of whether the list contains 10 or 10,000,000 items. The blocking variant `BRPOP` puts consumer threads to sleep, waking them the microsecond a producer pushes a job, eliminating polling loops.

### Sets: Set Theory Algebra and Relationship Graphs
Redis **Sets** store collections of unique, unordered strings. Insertions (`SADD`) and membership verifications (`SISMEMBER`) run in instantaneous $O(1)$ time. Their greatest strength is in-memory relational set algebra executed server-side:
- `SINTER`: Computes mathematical intersections (e.g. discovering mutual connections or shared tags).
- `SDIFF`: Calculates set differences. Calculations occur directly in Redis memory at microsecond speeds.""",
            'beginnerId': """Bayangkan Hashes seperti buku formulir data diri di mana tiap baris (nama, umur, alamat) bisa dihapus dan diganti secara terpisah tanpa harus merobek seluruh lembaran.

Lists seperti antrean barisan orang membeli tiket bioskop (antrean FIFO): orang baru berdiri di antrean paling belakang (LPUSH), dan yang dilayani pertama adalah orang di posisi paling depan (RPOP).
Sets seperti keranjang stempel kartu unik: Anda tidak bisa menaruh dua stempel yang sama persis, dan Anda bisa membandingkan isi keranjang Anda dengan teman untuk melihat stempel apa saja yang kalian berdua sama-sama miliki (SINTER).""",
            'beginnerEn': """Think of Hashes like a personnel index card where individual lines (name, age, department) can be penciled in or erased independently without shredding the entire card.

Lists resemble a line of moviegoers buying tickets (FIFO queue): newcomers join the back of the line (LPUSH), and the box office serves whoever has waited at the front (RPOP).
Sets resemble a collector's badge bag: duplicates are physically rejected, and you can dump two bags together to instantly reveal which badges both collectors share (SINTER).""",
            'experimentsId': [
                'Bandingkan penggunaan memori (MEMORY USAGE) antara 1.000 user yang disimpan sebagai JSON string vs disimpan sebagai Hash',
                'Simulasikan worker antrean: jalankan BRPOP di terminal 1, lalu lakukan LPUSH di terminal 2 untuk melihat worker terbangun',
                'Gunakan SADD dengan 10 item di mana 5 item bernilai duplikat dan amati jumlah item unik yang sebenarnya tersimpan',
                'Gunakan perintah SPOP untuk mengambil dan menghapus elemen acak dari Set (berguna untuk undian lucky draw)'
            ],
            'experimentsEn': [
                'Benchmark memory overhead (MEMORY USAGE) between 1,000 entities stored as JSON strings vs native Hashes',
                'Simulate task queueing: invoke BRPOP in session 1, then execute LPUSH in session 2 to witness instantaneous wakeups',
                'Pass 10 items containing 5 duplicates into SADD and observe that only unique elements persist',
                'Apply SPOP to extract and remove random items from a Set (ideal for raffle drawing algorithms)'
            ],
            'challengeId': 'Bangun sistem rekomendasi produk sederhana: simpan daftar kategori yang dilihat pengguna dalam Sets (`user:views:{id}`), dan cari pengguna lain yang memiliki minat serupa menggunakan `SINTERSTORE` dan `SCARD`.',
            'challengeEn': 'Architect a basic collaborative filtering engine: track user category views in Sets (`user:views:{id}`), identifying users with overlapping affinities using `SINTERSTORE` and `SCARD`.',
            'summaryId': 'Anda telah menguasai struktur data koleksi Redis: representasi objek efisien dengan Hashes, antrean FIFO dengan Lists & BRPOP, serta aljabar himpunan dengan Sets.',
            'summaryEn': 'You have mastered Redis collection primitives: memory-dense Hashes, FIFO task queuing with Lists & BRPOP, and set algebra with Sets.'
        },

        # WEEK 3
        {
            'week': 3,
            'level': 'beginer',
            'levelNameId': 'Struktur Data In-Memory & Pola Caching',
            'levelNameEn': 'In-Memory Data Structures & Caching Patterns',
            'topicId': 'sorted-sets-leaderboard-dan-hyperloglog-analitik',
            'titleId': 'Sorted Sets (ZSET) & HyperLogLog untuk Big Data',
            'titleEn': 'Sorted Sets (ZSET) & HyperLogLog for Big Data',
            'language': 'redis',
            'programId': 'Leaderboard Gaming Real-Time dengan ZSET dan Estimasi Unique Visitors dengan HyperLogLog',
            'programEn': 'Real-Time Gaming Leaderboard with ZSET and Unique Visitor Counting with HyperLogLog',
            'code': """# 1. SORTED SETS (ZSET): Elements sorted by a floating-point score (SkipList + HashTable)
# Add players and initial game scores
ZADD leaderboard:weekly 1450 "player:alpha"
ZADD leaderboard:weekly 2800 "player:bravo"
ZADD leaderboard:weekly 1950 "player:charlie"
ZADD leaderboard:weekly 3200 "player:delta"

# Increment player score atomically when they complete a quest (+350 points)
ZINCRBY leaderboard:weekly 350 "player:alpha"

# Get Top 3 highest scoring players with their scores (0-indexed, descending)
ZREVRANGE leaderboard:weekly 0 2 WITHSCORES

# Determine exact rank of a specific player (0-indexed rank: 0 is highest)
ZREVRANK leaderboard:weekly "player:bravo"

# Inspect the exact score of a player
ZSCORE leaderboard:weekly "player:bravo"

# Count total players who scored between 1500 and 3000 points
ZCOUNT leaderboard:weekly 1500 3000

# Paginated Leaderboard Query: Get players ranked 10 to 20
ZREVRANGE leaderboard:weekly 10 20 WITHSCORES

# 2. HYPERLOGLOG (HLL): Probabilistic data structure for estimating cardinalities of billions of items
# Uses ONLY 12KB of fixed memory with standard error of <= 0.81%!
# Track unique daily visitors across distributed servers
PFADD uvc:2026-03-10 "user_ip_192.168.1.1" "user_ip_192.168.1.2" "user_ip_192.168.1.3"
PFADD uvc:2026-03-10 "user_ip_192.168.1.1" # Duplicate entry: will NOT increase cardinality!

# Get estimated unique count
PFCOUNT uvc:2026-03-10

# Merge multiple daily HyperLogLogs into a weekly unique visitor metric without recalculating
PFADD uvc:2026-03-11 "user_ip_192.168.1.1" "user_ip_192.168.1.9"
PFMERGE uvc:weekly_rollup uvc:2026-03-10 uvc:2026-03-11
PFCOUNT uvc:weekly_rollup
""",
            'objectivesId': [
                'Memahami struktur internal Sorted Sets (kombinasi SkipList dan Hash Table berkecepatan O(log N))',
                'Membangun sistem papan peringkat (Leaderboard) real-time dengan ZADD, ZINCRBY, dan ZREVRANK',
                'Memahami konsep algoritma probabilistik Cardinality Estimation dengan HyperLogLog',
                'Menghemat gigabyte memori menggunakan HyperLogLog (12KB fixed size) untuk tracking jutaan pengguna unik'
            ],
            'objectivesEn': [
                'Understand Sorted Set internal structures (SkipList + Hash Table achieving O(log N) operations)',
                'Construct real-time competitive Leaderboards using ZADD, ZINCRBY, and ZREVRANK',
                'Understand probabilistic Cardinality Estimation algorithms via HyperLogLog',
                'Save gigabytes of RAM using HyperLogLog (strict 12KB fixed footprint) to estimate millions of unique visitors'
            ],
            'explanationId': """### Arsitektur Sorted Sets (ZSET) dan SkipList
**Sorted Sets** adalah salah satu struktur data tercanggih di Redis. Setiap elemen terdiri dari string anggota (*member*) dan nilai skor numerik (*score*). Di balik layar, Redis menggabungkan dua struktur data:
1. **Hash Table**: Memetakan member ke score untuk pencarian $O(1)$ instan.
2. **SkipList**: Struktur data probabilistik bertingkat yang menjaga seluruh elemen tetap terurut berdasarkan score dengan kompleksitas penyisipan dan pencarian rentang $O(\\log N)$.
Hal ini memungkinkan kita mencari peringkat pemain dari 10 juta peserta game dalam hitungan pecahan mikrodetik.

### HyperLogLog: Keajaiban Matematika Big Data
Jika Anda ingin menghitung jumlah pengunjung unik (*Unique Visitors*) sebuah situs berita dengan 100 juta pengunjung harian menggunakan Set konvensional (`SADD`), menyimpan 100 juta string UUID membutuhkan memori lebih dari **4 Gigabyte RAM**.
**HyperLogLog (HLL)** adalah algoritma probabilistik yang memperkirakan jumlah data unik (*cardinality*). Hebatnya:
- HLL hanya mengonsumsi memori konstan sebesar **12 Kilobyte** berapapun jumlah datanya (bahkan untuk miliaran pengguna unik!).
- Tingkat toleransi kesalahan (*standard error*) matematisnya sangat kecil, yaitu hanya **0.81%**, yang sangat dapat diterima untuk analitik trafik web.""",
            'explanationEn': """### Sorted Set (ZSET) Architecture: SkipLists Deconstructed
**Sorted Sets** represent one of Redis's crown achievements. Each element binds a string member to a floating-point score. Under the hood, Redis couples dual data structures:
1. **Hash Table**: Maps member identifiers to their score in $O(1)$ time.
2. **SkipList**: A multi-tiered probabilistic data structure maintaining continuous score ordering, enabling range queries and ranking in $O(\\log N)$ time.
This enables microsecond ranking queries across leaderboards containing tens of millions of active contestants.

### HyperLogLog: Big Data Probabilistic Mathematics
Tracking 100 million daily Unique Visitors using standard Sets (`SADD`) to store UUID strings consumes upwards of **4 Gigabytes of RAM**.
**HyperLogLog (HLL)** implements probabilistic cardinality estimation. Its mathematical properties are extraordinary:
- It maintains a strictly fixed memory footprint of **12 Kilobytes**, whether counting 1,000 or 1,000,000,000 unique records!
- The standard error rate is mathematically bounded at **<= 0.81%**, which is negligible for web analytics, ad impressions, and event tracking.""",
            'beginnerId': """Bayangkan papan skor turnamen balap mobil (Sorted Set). Setiap kali pembalap menyalip, skornya bertambah dan posisinya di layar TV langsung naik secara otomatis detik itu juga.

HyperLogLog seperti penjaga pintu festival musik yang menggunakan alat penghitung klik mekanis pintar. Penjaga pintu tidak perlu mencatat nomor KTP setiap penonton di buku tebal (yang menghabiskan berton-ton kertas). Ia menggunakan perkiraan statistik cerdas sehingga buku catatannya hanya berukuran sebesar kartu nama tipis (12KB) tetapi bisa memperkirakan 1 juta penonton dengan ketepatan 99%!""",
            'beginnerEn': """Imagine a real-time racing leaderboard (Sorted Set). Whenever a car overtakes a rival, its points update and its position on the stadium jumbotron shifts upward instantaneously.

HyperLogLog is like a bouncer at a stadium concert using a probabilistic clicker counter. The bouncer does not transcribe every visitor's national ID into thousands of thick ledger notebooks (wasting gigabytes of paper). By observing statistical hash bit patterns, a tiny 12KB index card estimates 1,000,000 attendees with 99.2% accuracy!""",
            'experimentsId': [
                'Masukkan 10.000 skor acak ke dalam ZSET dan amati seberapa cepat ZREVRANK mengembalikan peringkat pemain',
                'Uji operasi ZREMRANGEBYRANK untuk mempertahankan hanya 100 pemain teratas dan membuang sisanya secara efisien',
                'Bandingkan MEMORY USAGE antara SET berisi 100.000 string vs HyperLogLog yang diisi 100.000 string yang sama',
                'Gunakan PFMERGE untuk menggabungkan metrik pengunjung unik dari 7 hari menjadi laporan mingguan'
            ],
            'experimentsEn': [
                'Seed 10,000 randomized scores into a ZSET and measure the latency of ZREVRANK lookups',
                'Execute ZREMRANGEBYRANK to prune a leaderboard to the top 100 contenders, purging trailing entries',
                'Benchmark MEMORY USAGE of a Set holding 100,000 UUIDs versus a HyperLogLog counting the same dataset',
                'Apply PFMERGE to merge 7 daily visitor HyperLogLogs into an aggregate weekly unique visitor metric'
            ],
            'challengeId': 'Rancang sistem peringkat dinamis dengan penalti waktu: skor akhir dihitung dari `poin_murni - (detik_selesai * 0.01)`, dan buat query untuk menampilkan 10 pemain teratas beserta selisih poinnya dari peringkat 1.',
            'challengeEn': 'Architect a time-decayed leaderboard: calculate final scores via `raw_points - (completion_seconds * 0.01)`, crafting queries extracting the top 10 players and their point delta from first place.',
            'summaryId': 'Anda telah menguasai struktur data Sorted Sets (ZSET) untuk leaderboard real-time berkecepatan mikrodetik dan HyperLogLog untuk penghitungan big data kardinalitas tinggi dengan memori konstan 12KB.',
            'summaryEn': 'You have mastered Sorted Sets (ZSET) for real-time microsecond leaderboards and HyperLogLog for high-cardinality big data estimation within a fixed 12KB memory envelope.'
        },

        # WEEK 4
        {
            'week': 4,
            'level': 'beginer',
            'levelNameId': 'Struktur Data In-Memory & Pola Caching',
            'levelNameEn': 'In-Memory Data Structures & Caching Patterns',
            'topicId': 'pola-caching-eviksi-lru-dan-cache-stampede',
            'titleId': 'Pola Caching, Kebijakan Eviksi LRU & Mitigasi Stampede',
            'titleEn': 'Caching Patterns, LRU Eviction & Stampede Mitigation',
            'language': 'redis',
            'programId': 'Simulasi Pola Cache-Aside, Konfigurasi Memori Maksimal, dan Eviksi LRU',
            'programEn': 'Simulation of Cache-Aside Pattern, Maxmemory Policies, and LRU Eviction',
            'code': """# 1. Inspect and configure maximum memory limits and eviction policies
CONFIG SET maxmemory 256mb

# Configure eviction algorithm: volatile-lru (evict least recently used keys with an expire set)
# Other options: allkeys-lru, allkeys-lfu, volatile-ttl, noeviction
CONFIG SET maxmemory-policy allkeys-lru

# 2. Inspect memory metrics and eviction stats
INFO memory

# 3. Cache-Aside Pattern workflow in application pseudocode:
# Step A: Check if key exists in Redis Cache
# GET product:details:prod_5501
# Step B: If found (CACHE HIT) -> return immediately
# Step C: If nil (CACHE MISS) -> Query PostgreSQL/MySQL
# Step D: Populate Redis cache with TTL to avoid stale data
SET product:details:prod_5501 '{"title": "Mechanical Keyboard", "price": 1200000}' EX 300

# 4. Mitigation of Cache Stampede (Dogpile Effect) using Mutex Locking
# When a hot key expires, hundreds of concurrent requests attempt to query DB simultaneously.
# Only the thread that successfully acquires this mutex lock queries the DB!
SET lock:rebuild:product:5501 "worker_uuid" NX EX 5

# Inspect eviction count to monitor if memory is under pressure
INFO stats
""",
            'objectivesId': [
                'Memahami pola-pola arsitektur Caching: Cache-Aside, Write-Through, Write-Behind, dan Refresh-Ahead',
                'Mengonfigurasi kebijakan penggusuran memori Redis: allkeys-lru, volatile-lru, allkeys-lfu, dan noeviction',
                'Mendiagnosis tiga bahaya mematikan cache: Cache Penetration, Cache Breakdown (Stampede), dan Cache Avalanche',
                'Menerapkan solusi Mutex Lock dan Probabilistic Early Expiration (XFetch) untuk mencegah Dogpile Effect'
            ],
            'objectivesEn': [
                'Master architectural caching patterns: Cache-Aside, Write-Through, Write-Behind, and Refresh-Ahead',
                'Configure Redis eviction policies: allkeys-lru, volatile-lru, allkeys-lfu, and noeviction',
                'Diagnose the three catastrophic caching hazards: Penetration, Breakdown (Stampede), and Avalanche',
                'Implement Mutex Locking and Probabilistic Early Expiration (XFetch) to neutralize the Dogpile Effect'
            ],
            'explanationId': """### Pola Arsitektur Cache-Aside
Dalam pola **Cache-Aside** (paling populer di industri):
1. Aplikasi membaca data dari Redis terlebih dahulu (*Cache Read*).
2. Jika data ditemukan (**Cache Hit**), data langsung dikembalikan ke klien (latensi < 1 milidetik).
3. Jika data tidak ada (**Cache Miss**), aplikasi mengambil data dari database relasional (PostgreSQL/MySQL), menyimpannya ke Redis dengan durasi TTL tertentu, lalu mengembalikannya ke klien.
4. Saat data diperbarui di database, aplikasi secara proaktif menghapus (*invalidate*) kunci di Redis.

### Kebijakan Penggusuran Memori (Eviction Policies)
Ketika data di Redis mencapai batas `maxmemory`, Redis harus memilih kunci mana yang akan dihapus:
- `allkeys-lru`: Menghapus kunci yang paling jarang diakses baru-baru ini (*Least Recently Used*) dari seluruh kunci.
- `volatile-lru`: Hanya menghapus kunci LRU yang memiliki batas kedaluwarsa (`EXPIRE`).
- `allkeys-lfu`: Menghapus kunci berdasarkan frekuensi akses paling rendah (*Least Frequently Used*).
- `noeviction`: Menolak operasi tulis baru dan mengembalikan pesan error `OOM command not allowed when used memory > 'maxmemory'`.

### Tiga Bahaya Mematikan Sistem Cache
1. **Cache Penetration**: Klien meminta data yang tidak ada di cache maupun di database (misal ID acak `-999`). Permintaan selalu tembus ke database. Solusi: *Bloom Filters* atau menyimpan nilai kosong dengan TTL singkat.
2. **Cache Breakdown (Stampede / Dogpile Effect)**: Sebuah kunci populer (*hot key*, misal produk flash sale) kedaluwarsa tepat saat ribuan request datang bersamaan. Seluruh request serentak menembus database relasional hingga server tumbang. Solusi: *Distributed Mutex* agar hanya 1 request yang me-rebuild cache.
3. **Cache Avalanche**: Ribuan kunci cache disetel kedaluwarsa pada detik yang persis sama. Solusi: Menambahkan jitter waktu acak (*Random TTL Jitter*).""",
            'explanationEn': """### The Industry Standard: Cache-Aside Architecture
Under the **Cache-Aside** paradigm:
1. Application processes query Redis first.
2. Upon discovery (**Cache Hit**), payloads return to clients within sub-millisecond latencies.
3. Upon absence (**Cache Miss**), the application queries primary storage (PostgreSQL/MySQL), populates Redis with an explicit TTL, and serves the response.
4. During underlying database mutations, the application explicitly invalidates (deletes) the Redis key.

### Eviction Strategies under Memory Pressure
When Redis memory reaches the `maxmemory` threshold, it invokes its eviction policy:
- `allkeys-lru`: Evicts the Least Recently Used keys across the entire dataset.
- `volatile-lru`: Restricts LRU eviction strictly to keys bearing explicit TTL expirations.
- `allkeys-lfu`: Evicts based on Least Frequently Used access counters.
- `noeviction`: Fails incoming writes with hard out-of-memory errors (`OOM command not allowed when used memory > 'maxmemory'`).

### The Three Critical Caching Failure Modes
1. **Cache Penetration**: Clients request non-existent entities (e.g. `id: -999`), bypassing cache and saturating the relational DB. Solved via *Bloom Filters* or caching negative null markers.
2. **Cache Breakdown (Stampede / Dogpile Effect)**: A heavily frequented key expires, prompting thousands of concurrent threads to simultaneously flood primary storage to rebuild it. Solved via *Distributed Mutex Locks*.
3. **Cache Avalanche**: Large tranches of cache keys expire at the exact same second, shifting massive loads to the database. Solved via *Randomized TTL Jitter*.""",
            'beginnerId': """Bayangkan Anda membuka warung fotokopi di depan kampus. 
Cache-Aside seperti memfotokopi 5 lembar modul kuliah terpopuler dan menaruhnya di meja depan. Jika ada mahasiswa datang minta modul itu (Cache Hit), Anda langsung menyerahkannya dalam 1 detik. Jika mahasiswa meminta modul langka (Cache Miss), Anda harus berjalan ke gudang belakang untuk memfotokopinya dulu.

Eviksi LRU seperti meja depan yang terbatas: jika meja penuh, modul yang sudah 3 hari tidak ada yang membeli disingkirkan ke gudang belakang. Sedangkan Cache Stampede seperti saat modul ujian tiba-tiba habis tepat ketika 500 mahasiswa menyerbu kasir secara serempak!""",
            'beginnerEn': """Imagine managing a print shop near a university campus.
Cache-Aside is like pre-printing 5 copies of the top exam study guide and keeping them on the front counter. When a student requests it (Cache Hit), you hand it over in one second. When someone requests an obscure thesis (Cache Miss), you walk to the back storage archives to make a fresh copy.

LRU eviction means that when your front counter is cluttered, study guides that haven't been requested all morning are returned to the back shelves. A Cache Stampede is when that study guide runs out right as 500 panicking students charge the counter simultaneously!""",
            'experimentsId': [
                'Set maxmemory ke 2MB di instance lokal, masukkan banyak key dan amati evicted_keys bertambah di INFO stats',
                'Simulasikan Cache Avalanche: buat 100 key dengan TTL 5 detik yang sama persis dan amati penurunan drastis key di INFO keyspace',
                'Terapkan jitter acak: TTL = 300 + Math.floor(Math.random() * 60) dan perhatikan distribusi kedaluwarsa yang merata',
                'Uji mode noeviction dan amati error yang dihasilkan saat memori penuh'
            ],
            'experimentsEn': [
                'Set maxmemory to 2MB on a local instance, push payloads and verify evicted_keys incrementing in INFO stats',
                'Simulate a Cache Avalanche: inject 100 keys with identical 5-second expirations and witness the collapse in INFO keyspace',
                'Implement TTL jitter: TTL = 300 + Math.floor(Math.random() * 60) and observe smoothed expiration intervals',
                'Configure noeviction mode and observe the hard OOM exception raised when pushing data past memory limits'
            ],
            'challengeId': 'Implementasikan algoritma penanganan Cache Stampede berbasis Mutex: saat cache miss terjadi, gunakan `SET lock:{key} NX EX 5`. Jika berhasil acquire lock, baca DB dan isi cache; jika gagal, lakukan retry loop dengan sleep 50ms.',
            'challengeEn': 'Implement a mutex-based Cache Stampede guard: upon a cache miss, issue `SET lock:{key} NX EX 5`. If acquired, query the DB and refresh cache; if locked, poll with exponential backoff and 50ms sleeps.',
            'summaryId': 'Anda telah menguasai pola arsitektur Caching (Cache-Aside), konfigurasi kebijakan eviksi memori (allkeys-lru), dan mitigasi risiko Cache Penetration, Avalanche, dan Stampede.',
            'summaryEn': 'You have mastered enterprise Caching patterns (Cache-Aside), memory eviction policies (allkeys-lru), and mitigation strategies against Cache Penetration, Avalanche, and Stampedes.'
        },

        # WEEK 5
        {
            'week': 5,
            'level': 'intermediate',
            'levelNameId': 'Scripting Lua, Streams & Klaster Terdistribusi',
            'levelNameEn': 'Lua Scripting, Streams & Distributed Cluster',
            'topicId': 'scripting-lua-atomic-dan-sliding-window-rate-limiter',
            'titleId': 'Scripting Lua Atomic & Sliding Window Rate Limiter',
            'titleEn': 'Atomic Lua Scripting & Sliding Window Rate Limiter',
            'language': 'redis',
            'programId': 'Implementasi Sliding Window Log Rate Limiter Menggunakan Script Lua Atomic',
            'programEn': 'Sliding Window Log Rate Limiter Implementation via Atomic Lua Scripts',
            'code': """-- Lua Script for High-Precision Sliding Window Log Rate Limiter
-- Evaluated atomically within Redis memory (EVAL command)
-- KEYS[1]: Rate limit key (e.g. "ratelimit:ip_192.168.1.100")
-- ARGV[1]: Current Unix Timestamp in milliseconds
-- ARGV[2]: Window Size in milliseconds (e.g. 60000 for 1 minute)
-- ARGV[3]: Maximum Allowed Requests in window (e.g. 10)

local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local max_requests = tonumber(ARGV[3])
local clear_before = now - window

-- Step 1: Remove all log entries older than current sliding window
redis.call('ZREMRANGEBYSCORE', key, 0, clear_before)

-- Step 2: Count how many requests occurred in the active window
local current_requests = redis.call('ZCARD', key)

-- Step 3: Check if request threshold breached
if current_requests < max_requests then
    -- Under limit: Add current request timestamp as member and score
    redis.call('ZADD', key, now, now)
    -- Extend TTL to auto-expire idle keys
    redis.call('PEXPIRE', key, window)
    return {1, max_requests - current_requests - 1} -- Allowed (1), Remaining quota
else
    return {0, 0} -- Denied (0), 0 remaining
end

-- Invocation from redis-cli:
-- EVAL "local key = KEYS[1] ... return {1, 9}" 1 "ratelimit:ip_192.168.1.100" 1710072000000 60000 10
""",
            'objectivesId': [
                'Memahami mengapa Scripting Lua dieksekusi secara atomic mutlak di dalam Redis Event Loop',
                'Menggunakan perintah EVAL, SCRIPT LOAD, dan EVALSHA untuk optimasi bandwidth jaringan',
                'Mengimplementasikan algoritma Sliding Window Log Rate Limiter menggunakan Redis Sorted Sets (ZSET)',
                'Mencegah race condition tanpa perlu menggunakan distributed lock eksternal'
            ],
            'objectivesEn': [
                'Understand why Lua scripts evaluate with absolute atomicity inside the Redis Event Loop',
                'Operate EVAL, SCRIPT LOAD, and EVALSHA to eliminate network script transmission overhead',
                'Implement the Sliding Window Log Rate Limiting algorithm using Redis Sorted Sets (ZSET)',
                'Eliminate concurrency race conditions without deploying cumbersome external distributed locks'
            ],
            'explanationId': """### Mengapa Scripting Lua Bersifat Atomic Mutlak?
Di Redis, setiap script Lua yang dieksekusi melalui perintah `EVAL` atau `EVALSHA` diperlakukan sebagai satu instruksi tunggal yang tidak dapat diinterupsi (*atomic execution*). Selama script Lua berjalan, tidak ada perintah klien lain atau script lain yang dapat disisipkan atau dieksekusi. Ini memberikan kekuatan luar biasa: Anda dapat membaca data, membuat keputusan logika percabangan bisnis (`if/else`), dan menulis data kembali tanpa khawatir ada proses lain yang mengubah data di tengah-tengah proses tersebut.

### Algoritma Sliding Window Log Rate Limiter
Pendekatan rate limiter sederhana (*Fixed Window*, misal per menit kalender) memiliki kelemahan fatal: jika pengguna mengirim 10 request di detik 59 dan 10 request di detik 01 menit berikutnya, pengguna berhasil mengirim 20 request dalam jeda 2 detik!
**Sliding Window Log** memecahkan masalah ini dengan presisi absolut:
1. Menggunakan **Sorted Set** di mana nilai timestamp waktu mikrodetik bertindak sebagai score dan member.
2. Membuang seluruh request yang lebih tua dari jendela waktu (`ZREMRANGEBYSCORE 0 (now - window)`).
3. Menghitung sisa request (`ZCARD`). Jika masih di bawah batas, catat request baru (`ZADD`).

### Optimasi dengan SCRIPT LOAD dan EVALSHA
Mengirimkan teks kode script Lua yang panjang di setiap request API menghabiskan bandwidth jaringan. Perintah `SCRIPT LOAD` mengompilasi script sekali saja di server Redis dan mengembalikan hash SHA1 40-karakter. Aplikasi selanjutnya cukup memanggil `EVALSHA <sha1> ...` yang berukuran sangat kecil.""",
            'explanationEn': """### The Guarantee of Absolute Lua Script Atomicity
In Redis, Lua scripts executed via `EVAL` or `EVALSHA` execute as an indivisible atomic primitive. While a Lua script executes, the Single-Threaded Event Loop locks out all other client operations. This yields unprecedented power: developers read state, execute complex branching logic (`if/else`), and write back mutations without requiring distributed locking protocols.

### The Precision of Sliding Window Log Rate Limiting
Primitive *Fixed Window* rate limiting suffers from boundary burst vulnerabilities: an attacker issuing 10 requests at second 59 and 10 requests at second 01 effectively fires 20 requests across a 2-second burst window.
**Sliding Window Log** resolves this with mathematical precision:
1. Employs a **Sorted Set** where Unix timestamps in milliseconds serve as both member and score.
2. Evicts expired timestamps falling outside the sliding window boundary (`ZREMRANGEBYSCORE 0 (now - window)`).
3. Measures active density via `ZCARD`. If within threshold, it records the request (`ZADD`).

### Bandwidth Optimization: SCRIPT LOAD and EVALSHA
Transmitting entire Lua script source payloads over the wire on high-frequency API endpoints exhausts network bandwidth. Issuing `SCRIPT LOAD` caches the compiled bytecode on the Redis server, returning an immutable 40-character SHA1 digest. Applications subsequently invoke `EVALSHA <sha1> ...` with zero network overhead.""",
            'beginnerId': """Bayangkan pintu putar gedung bioskop yang dijaga satpam tegas. Satpam punya stopwatch.
Aturannya: 'Dalam 60 detik terakhir, hanya boleh ada 10 orang yang lewat'.
Setiap kali ada orang mau masuk, satpam melihat daftar catatan di tangannya: ia mencoret orang-orang yang masuk lebih dari 60 detik lalu, lalu menghitung sisanya. 

Karena satpam memeriksa dan mencatat semuanya sendiri tanpa ada yang boleh mengganggunya (Lua Atomic), tidak ada orang yang bisa menyelinap masuk lewat pintu putar!""",
            'beginnerEn': """Imagine a subway turnstile guarded by a vigilant security officer holding a stopwatch.
The rule states: 'Only 10 passengers may pass through within any rolling 60-second span'.
Whenever a commuter approaches, the guard checks their clipboard: they cross off entries stamped more than 60 seconds ago, and count the active records.

Because the guard examines and writes the clipboard in one uninterrupted motion without distraction (Lua Script Atomicity), nobody can sneak past!""",
            'experimentsId': [
                'Muat script Lua ke Redis menggunakan SCRIPT LOAD dan eksekusi dengan EVALSHA',
                'Simulasikan penolakan request dengan menembakkan 15 request berurutan dan amati nilai return 0 (denied)',
                'Bandingkan performa transaksi MULTI/EXEC vs script Lua untuk operasi read-modify-write',
                'Uji batas waktu eksekusi lua-time-limit dan amati perintah SCRIPT KILL saat script macet dalam loop tak terbatas'
            ],
            'experimentsEn': [
                'Load the Lua script into Redis using SCRIPT LOAD and execute it via EVALSHA',
                'Simulate rate limit rejection by firing 15 rapid requests and observing the return 0 (denied)',
                'Benchmark MULTI/EXEC transactions versus Lua scripts for conditional read-modify-write operations',
                'Trigger the lua-time-limit configuration and observe SCRIPT KILL mechanics during an intentional infinite loop'
            ],
            'challengeId': 'Tulis script Lua atomic untuk mengimplementasikan algoritma Token Bucket: simpan jumlah token dan last_refill_timestamp, hitung penambahan token baru berdasarkan waktu berlalu, dan kurangi 1 token jika tersedia.',
            'challengeEn': 'Craft an atomic Token Bucket Lua script: persist token volume and last_refill_timestamp, calculate replenishment proportional to elapsed time, and decrement 1 token upon request approval.',
            'summaryId': 'Anda telah menguasai eksekusi atomic dengan Scripting Lua di Redis, optimasi SCRIPT LOAD / EVALSHA, dan implementasi Sliding Window Log Rate Limiter.',
            'summaryEn': 'You have mastered atomic execution using Redis Lua scripts, SCRIPT LOAD / EVALSHA caching, and sliding window rate limiter implementations.'
        },

        # WEEK 6
        {
            'week': 6,
            'level': 'intermediate',
            'levelNameId': 'Scripting Lua, Streams & Klaster Terdistribusi',
            'levelNameEn': 'Lua Scripting, Streams & Distributed Cluster',
            'topicId': 'redis-streams-consumer-groups-dan-event-driven',
            'titleId': 'Redis Streams & Consumer Groups untuk Event-Driven',
            'titleEn': 'Redis Streams & Consumer Groups for Event-Driven Systems',
            'language': 'redis',
            'programId': 'Arsitektur Event-Driven dengan Redis Streams, Consumer Groups, dan Acknowledgement',
            'programEn': 'Event-Driven Architecture with Redis Streams, Consumer Groups, and Acknowledgements',
            'code': """# 1. Produce events to an append-only Redis Stream (XADD)
# Auto-generates millisecond-sequence ID (e.g. 1710073000000-0)
XADD stream:orders * orderId "ORD-9901" customerId "CUST-42" amount 450000 status "PLACED"
XADD stream:orders * orderId "ORD-9902" customerId "CUST-88" amount 1250000 status "PLACED"

# Inspect stream length and entries
XLEN stream:orders
XRANGE stream:orders - + COUNT 2

# 2. Setup Consumer Group for distributed scale-out processing (starts from beginning '$' or '0')
XGROUP CREATE stream:orders group:order_processors 0 MKSTREAM

# 3. Consumer 1 reads new unprocessed messages (ID '>' means messages never delivered to others)
XREADGROUP GROUP group:order_processors worker_alpha COUNT 1 BLOCK 2000 STREAMS stream:orders >

# 4. Acknowledge message processing completion (Removes message from Pending Entries List / PEL)
XACK stream:orders group:order_processors 1710073000000-0

# 5. Inspect Pending Entries List (Messages claimed by workers that have NOT been ACKed yet)
XPENDING stream:orders group:order_processors - + 10

# 6. Dead Worker Recovery: Claim a stuck/abandoned message from a dead worker if idle > 60000ms
XCLAIM stream:orders group:order_processors worker_beta 60000 1710073000000-0
""",
            'objectivesId': [
                'Membedakan keterbatasan arsitektur Pub/Sub tradisional (fire-and-forget) dibanding Redis Streams (persisten)',
                'Menyisipkan dan membaca log event menggunakan XADD, XRANGE, dan XREVRANGE',
                'Mendistribusikan beban kerja secara paralel menggunakan Consumer Groups (XREADGROUP)',
                'Menangani kegagalan worker menggunakan sistem acknowledgment (XACK) dan pengklaiman tugas tertunda (XCLAIM / XAUTOCLAIM)'
            ],
            'objectivesEn': [
                'Distinguish traditional Pub/Sub limitations (fire-and-forget) from durable Redis Streams',
                'Append and query append-only event logs using XADD, XRANGE, and XREVRANGE',
                'Distribute processing workloads across parallel workers using Consumer Groups (XREADGROUP)',
                'Handle worker failure recovery via message acknowledgments (XACK) and pending task claiming (XCLAIM / XAUTOCLAIM)'
            ],
            'explanationId': """### Mengapa Redis Streams? Melampaui Pub/Sub Tradisional
Mekanisme `PUBLISH / SUBSCRIBE` tradisional di Redis bersifat *fire-and-forget*. Jika ada subscriber yang sedang offline atau mengalami gangguan koneksi sesaat, seluruh pesan yang dikirim saat itu akan **hilang selamanya**. 
Diperkenalkan pada Redis 5.0, **Redis Streams** adalah struktur data log pesan persisten (mirip Apache Kafka versi in-memory berkecepatan tinggi). Pesan disimpan secara permanen di disk/RAM dengan ID waktu unik (`timestamp-sequence`), mendukung pembacaan ulang historis, serta replikasi terjamin.

### Arsitektur Consumer Groups
Dalam sistem enterprise, kita memerlukan beberapa instance worker untuk memproses antrean pesanan bersama-sama tanpa duplikasi:
- **Consumer Group**: Membagi aliran pesan ke sekumpulan worker yang tergabung dalam grup yang sama.
- Pesan yang diambil oleh `worker_alpha` tidak akan dikirimkan ke `worker_beta`.
- Setiap pesan memiliki ID khusus. Karakter `>` menandakan worker meminta pesan yang belum pernah diserahkan ke worker manapun.

### Pending Entries List (PEL) dan Kegagalan Worker
Ketika worker mengambil pesan, Redis mencatat pesan tersebut ke dalam **Pending Entries List (PEL)**. Pesan baru dihapus dari PEL setelah worker mengirimkan konfirmasi `XACK`. Jika worker mati mendadak sebelum mengirim `XACK`, pesan tetap aman di PEL. Worker lain dapat menggunakan perintah `XCLAIM` atau `XAUTOCLAIM` untuk mengambil alih pesan yang menggantung tersebut dan memprosesnya hingga tuntas.""",
            'explanationEn': """### Why Redis Streams? Transcending Legacy Pub/Sub
Legacy Redis `PUBLISH / SUBSCRIBE` operates strictly on a *fire-and-forget* basis. If a subscriber disconnects momentarily during a network flap, all messages emitted during the outage are **lost irrevocably**.
Introduced in Redis 5.0, **Redis Streams** provide an append-only, durable log abstraction (conceptually an in-memory, ultra-low-latency Apache Kafka). Events are stamped with monotonic millisecond sequence IDs (`timestamp-sequence`), persist durably across restarts, and support historical replay.

### Consumer Groups Architecture
Enterprise event-driven systems require multiple worker instances to process message streams cooperatively without collision:
- **Consumer Groups**: Multiplexes incoming streams across pool workers subscribed to the group.
- An event assigned to `worker_alpha` is hidden from `worker_beta`.
- Supplying `>` instructs the broker to deliver exclusively unallocated messages.

### The Pending Entries List (PEL) and Fault Recovery
When a consumer claims an event, Redis tracks it inside the **Pending Entries List (PEL)**. The event resides in the PEL until the worker delivers an explicit `XACK` confirmation. If the worker encounters an unhandled exception or crashes before ACKing, the message remains safely tracked. Surviving workers execute `XCLAIM` or `XAUTOCLAIM` to steal abandoned messages and fulfill delivery guarantees.""",
            'beginnerId': """Bayangkan Pub/Sub seperti siaran radio FM: jika radio mobil Anda mati saat melewati terowongan, Anda melewatkan lagu yang sedang diputar selamanya.

Redis Streams seperti rekaman video YouTube: videonya tersimpan permanen dan bisa Anda tonton ulang kapan saja. Consumer Group seperti kantor pos dengan 5 kurir: surat-surat baru dibagi rata sehingga kurir A mengantar paket ke blok A, kurir B ke blok B. Jika motor kurir A mogok di jalan, paketnya bisa diambil alih oleh kurir B (XCLAIM) agar paket tetap sampai ke penerima!""",
            'beginnerEn': """Think of Pub/Sub like live FM radio: if your car passes through a tunnel, whatever song was broadcast during that minute is gone forever.

Redis Streams resembles an on-demand video platform: events are permanently recorded, replayable, and inspectable at any time. Consumer Groups act like a delivery depot with 5 drivers: packages are divided so Driver A takes Route 1 and Driver B takes Route 2. If Driver A breaks down mid-route, Driver B claims the abandoned package (XCLAIM) ensuring delivery!""",
            'experimentsId': [
                'Kirim 5 pesan ke stream dan baca satu per satu menggunakan Consumer Groups',
                'Simulasikan kegagalan worker: baca pesan tanpa menjalankan XACK, lalu inspeksi XPENDING untuk melihat pesan menggantung',
                'Jalankan XCLAIM dari worker kedua untuk merebut pesan yang menggantung dari worker pertama',
                'Gunakan opsi MAXLEN ~ 1000 pada XADD untuk membatasi ukuran stream agar memori RAM tidak meledak'
            ],
            'experimentsEn': [
                'Append 5 events to a stream and ingest them iteratively using Consumer Groups',
                'Simulate worker crash: consume messages omitting XACK, then run XPENDING to examine unacknowledged entries',
                'Invoke XCLAIM from a secondary consumer to seize abandoned events from the failed worker',
                'Apply the MAXLEN ~ 1000 modifier on XADD to cap stream retention and protect memory from unbounded growth'
            ],
            'challengeId': 'Bangun sistem dead-letter queue (DLQ) otomatis: periksa XPENDING secara berkala, jika sebuah pesan telah gagal di-ACK dan di-reclaim lebih dari 3 kali (`delivery_count > 3`), pindahkan pesan tersebut ke `stream:dead_letters` dan kirimkan `XACK` pada stream utama.',
            'challengeEn': 'Architect an automated dead-letter queue (DLQ): periodically monitor XPENDING, and if an event exceeds 3 failed deliveries (`delivery_count > 3`), push it to `stream:dead_letters` and `XACK` the primary stream.',
            'summaryId': 'Anda telah menguasai Redis Streams: append-only log persisten, pemrosesan paralel dengan Consumer Groups, pelacakan Pending Entries List (PEL), dan pemulihan pesan dengan XCLAIM.',
            'summaryEn': 'You have mastered Redis Streams: durable append-only event logging, parallel Consumer Group scaling, Pending Entries List (PEL) tracking, and dead worker recovery with XCLAIM.'
        },

        # WEEK 7
        {
            'week': 7,
            'level': 'intermediate',
            'levelNameId': 'Scripting Lua, Streams & Klaster Terdistribusi',
            'levelNameEn': 'Lua Scripting, Streams & Distributed Cluster',
            'topicId': 'durabilitas-sentinel-dan-redis-cluster-sharding',
            'titleId': 'Durabilitas (RDB/AOF), Sentinel HA & Redis Cluster',
            'titleEn': 'Durability (RDB/AOF), Sentinel HA & Redis Cluster',
            'language': 'redis',
            'programId': 'Konfigurasi Ketahanan Data RDB vs AOF dan Arsitektur 16384 Hash Slots Cluster',
            'programEn': 'RDB vs AOF Durability Configuration and 16,384 Hash Slots Cluster Architecture',
            'code': """# 1. Durability Configuration in redis.conf
# RDB (Snapshotting) configuration: save <seconds> <changes>
# save 900 1
# save 300 10
# save 60 10000

# AOF (Append-Only File) configuration - recommended for zero data-loss
# appendonly yes
# appendfilename "appendonly.aof"
# appendfsync everysec  # Options: always (slowest), everysec (balanced), no (OS decides)

# Trigger background snapshotting manually without blocking main event loop
BGSAVE

# Trigger AOF background rewrite to compact file size
BGREWRITEAOF

# 2. Redis Sentinel Commands for High Availability & Automated Failover
# Connect to Sentinel port (default 26379)
# SENTINEL masters
# SENTINEL get-master-addr-by-name mymaster
# SENTINEL failover mymaster  # Manual failover drill

# 3. Redis Cluster: 16,384 Hash Slots Sharding Architecture
# Every key is mapped to a slot via CRC16(key) mod 16384
CLUSTER INFO
CLUSTER NODES

# Hash Tags: Ensure related keys hash to the EXACT same slot and physical node!
# The string inside curly braces {} dictates the slot calculation:
MSET {user:1001}:profile "data" {user:1001}:orders "order_list" {user:1001}:tokens "auth"
# All three keys land on the identical hash slot! Multi-key operations are permitted!

# Inspect slot assignment of a key
CLUSTER KEYSLOT "{user:1001}:profile"
""",
            'objectivesId': [
                'Membandingkan mekanisme durabilitas persistensi disk: RDB (Snapshots) vs AOF (Append-Only File)',
                'Memahami trade-off performa vs durabilitas pada opsi appendfsync: always, everysec, dan no',
                'Mengonfigurasi Redis Sentinel untuk pemantauan kesehatan master dan failover otomatis tanpa downtime',
                'Menguasai arsitektur sharding Redis Cluster (16.384 Hash Slots) dan aturan Hash Tags ({...})'
            ],
            'objectivesEn': [
                'Compare disk persistence mechanics: RDB (Point-in-Time Snapshots) vs AOF (Append-Only Log)',
                'Evaluate performance vs durability trade-offs across appendfsync policies: always, everysec, and no',
                'Configure Redis Sentinel for automated master health monitoring and zero-downtime failovers',
                'Master Redis Cluster horizontal sharding (16,384 Hash Slots) and Hash Tag ({...}) colocations'
            ],
            'explanationId': """### Ketahanan Data: RDB vs AOF
Meskipun Redis beroperasi di RAM, data dapat disimpan permanen ke disk melalui dua mekanisme:
- **RDB (Redis Database Snapshot)**: Mengambil snapshot biner padat seluruh isi memori pada interval waktu tertentu (misal tiap 5 menit jika ada 100 perubahan). Operasi menggunakan `fork()` proses latar belakang. Kekurangannya: jika server mati mendadak di menit ke-4, data 4 menit terakhir akan hilang.
- **AOF (Append-Only File)**: Mencatat setiap instruksi modifikasi data ke dalam file log secara berurutan. Opsi `appendfsync everysec` memberikan kompromi sempurna: penulisan di-flush ke disk setiap 1 detik, membatasi potensi kehilangan data maksimal 1 detik dengan performa tetap tinggi.

### High Availability dengan Redis Sentinel
Dalam topologi Master-Replica, jika server Master mati, replika tidak dapat mempromosikan dirinya sendiri tanpa orkestrasi. **Redis Sentinel** adalah sekumpulan daemon pengawas terdistribusi yang memantau node master. Ketika mayoritas Sentinel mendeteksi master mati (*quorum consensus*), Sentinel otomatis mempromosikan salah satu replica menjadi master baru, mengonfigurasi ulang replica lain, dan memberi tahu aplikasi klien tanpa perlu intervensi manusia.

### Redis Cluster: 16.384 Hash Slots dan Hash Tags
Untuk penskalaan horizontal melebihi batas RAM satu mesin (misal butuh 500GB RAM):
- **Redis Cluster** membagi ruang data menjadi **16.384 Hash Slots**. Setiap node master bertanggung jawab atas subset slot tertentu (misal Node A: slot 0-5460).
- Kunci dipetakan menggunakan rumus: `HASH_SLOT = CRC16(key) mod 16384`.
- **Hash Tags**: Redis Cluster melarang operasi multi-key (`MGET`, transaksi) jika kunci berada di node yang berbeda. Dengan menyematkan kurung kurawal `{user:1001}:profile` dan `{user:1001}:orders`, Redis hanya menghitung hash dari teks di dalam kurung kurawal, menjamin seluruh data milik user tersebut berada di node fisik yang sama.""",
            'explanationEn': """### Persistence Trade-offs: RDB vs AOF
While Redis operates primarily in-memory, durability guarantees are preserved via two complementary mechanisms:
- **RDB (Redis Database Snapshots)**: Emits compact point-in-time binary snapshots of memory to disk at scheduled intervals via background `fork()` processes. Drawback: ungraceful power loss risks losing data accumulated since the last snapshot.
- **AOF (Append-Only File)**: Logs every write mutation command sequentially. Configuring `appendfsync everysec` strikes the optimal balance: memory buffers are flushed to disk every second, bounding maximum theoretical data loss to 1 second while maintaining high throughput.

### High Availability with Redis Sentinel
In standard Master-Replica setups, replica failover requires active orchestration. **Redis Sentinel** operates as an independent quorum of distributed monitoring daemons. Upon confirming master unresponsiveness via consensus, Sentinel autonomously promotes an elected replica to master authority, reconfigures sibling nodes, and notifies client connection pools.

### Redis Cluster: 16,384 Hash Slots and Hash Tags
For dataset footprints exceeding single-machine RAM limits (multi-terabyte scaling):
- **Redis Cluster** partitions keyspace into **16,384 Hash Slots**. Each master node hosts an assigned slot partition (e.g. Node 1: slots 0-5460).
- Keys are mapped via `HASH_SLOT = CRC16(key) mod 16384`.
- **Hash Tags**: Multi-key operations (`MGET`, Lua scripts) fail if target keys reside on disparate physical shards. Encapsulating routing keys in curly brackets `{user:1001}:profile` and `{user:1001}:orders` forces the hash calculator to evaluate strictly the bracketed substring, guaranteeing identical slot colocation.""",
            'beginnerId': """Bayangkan Anda seorang penulis buku harian.
RDB seperti memotret seluruh isi kamar Anda sekali setiap minggu. Jika ada barang hilang hari Rabu, foto hari Minggu kemarin tidak bisa merekam barang yang baru Anda beli hari Senin.
AOF seperti mencatat setiap tindakan Anda di buku harian setiap detik: 'Pukul 10.00 saya beli buku, pukul 10.01 saya beli kopi'. Jika mati lampu, Anda tinggal membaca kembali buku harian dari awal.

Sentinel seperti 3 orang asisten satpam yang selalu menjaga bos: jika bos pingsan, ketiga satpam berembuk dan sepakat menunjuk wakil bos sebagai pemimpin baru dalam 3 detik!""",
            'beginnerEn': """Imagine keeping a journal of your life.
RDB is like taking a panoramic photograph of your room once a week. If you lose something on Wednesday, last Sunday's photo cannot tell you where you set your keys on Tuesday.
AOF is like scribbling an indelible log line every time you move: '10:00 AM bought coffee, 10:01 AM bought pastry'. After a blackout, you reconstruct the room by replaying the log.

Sentinel is like a committee of 3 bodyguards watching the team captain: if the captain collapses, the guards confer, elect the vice-captain as new leader, and direct the convoy without stopping!""",
            'experimentsId': [
                'Jalankan BGSAVE dan periksa kemunculan file dump.rdb di direktori kerja Redis',
                'Inspeksi file appendonly.aof dengan text editor untuk melihat perintah Redis tersimpan dalam format teks protokol RESP',
                'Hitung hash slot suatu key menggunakan perintah CLUSTER KEYSLOT',
                'Buktikan bahwa dua key dengan hash tag yang sama {tenant_42}:users dan {tenant_42}:settings menghasilkan keyslot yang identik'
            ],
            'experimentsEn': [
                'Execute BGSAVE and observe the generation of the binary dump.rdb image on disk',
                'Inspect appendonly.aof with a text editor to witness RESP protocol serialization',
                'Compute the hash slot mapping of arbitrary keys via CLUSTER KEYSLOT',
                'Demonstrate that sharing hash tags like {tenant_42}:users and {tenant_42}:settings guarantees identical keyslot assignment'
            ],
            'challengeId': 'Simulasikan failover terencana pada cluster: kirimkan perintah `SENTINEL failover <master-name>` atau `CLUSTER FAILOVER`, dan ukur waktu yang dibutuhkan aplikasi untuk menyambung kembali ke node master baru.',
            'challengeEn': 'Execute a controlled cluster failover drill: issue `SENTINEL failover <master-name>` or `CLUSTER FAILOVER`, measuring client recovery reconnection latency.',
            'summaryId': 'Anda telah menguasai ketahanan data dan penskalaan Redis: persistensi RDB vs AOF, orkestrasi failover Sentinel, serta partisi 16.384 Hash Slots dan Hash Tags pada Redis Cluster.',
            'summaryEn': 'You have mastered persistence and distributed Redis architecture: RDB vs AOF durability, Sentinel automated failover orchestration, and 16,384 Hash Slot partitioning with Hash Tags.'
        },

        # WEEK 8 - CAPSTONE
        {
            'week': 8,
            'level': 'intermediate',
            'levelNameId': 'Scripting Lua, Streams & Klaster Terdistribusi',
            'levelNameEn': 'Lua Scripting, Streams & Distributed Cluster',
            'topicId': 'capstone-distributed-cache-rate-limiter-leaderboard',
            'titleId': 'Capstone Project: High-Throughput Cache, Limiter & Leaderboard',
            'titleEn': 'Capstone Project: High-Throughput Cache, Limiter & Leaderboard',
            'language': 'redis',
            'programId': 'Engine Gaming Finansial Terpadu: Cache-Aside, Sliding Rate Limiter, dan Leaderboard Real-Time',
            'programEn': 'Unified Gaming Financial Engine: Cache-Aside, Sliding Rate Limiter, and Real-Time Leaderboard',
            'code': """# CAPSTONE PROJECT: High-Throughput In-Memory Cache, Rate Limiter & Leaderboard Engine
# Integrates Hashes, Sorted Sets, Lua Scripting, Streams, and Expiration Strategies

# ==============================================================================
# 1. SLIDING WINDOW RATE LIMITER (Protecting Payment Gateways & Gaming APIs)
# ==============================================================================
# Executed via atomic Lua Script (demonstrated as conceptual sequence)
# Ensures user 1001 cannot execute more than 5 transactions per 60 seconds
ZREMRANGEBYSCORE ratelimit:pay:usr_1001 0 1710072940000
ZADD ratelimit:pay:usr_1001 1710073000000 "tx_nonce_88921"
EXPIRE ratelimit:pay:usr_1001 60
ZCARD ratelimit:pay:usr_1001

# ==============================================================================
# 2. CACHE-ASIDE WITH HASHPACK (Ultra-Fast Player Profile Cache)
# ==============================================================================
# Store player profile using Hash with random TTL Jitter (300s + jitter)
HSET {player:1001}:profile name "Rizky Gamer" rank "Diamond" wallet_balance 450000 xp 12450
EXPIRE {player:1001}:profile 342

# Atomic experience point gain
HINCRBY {player:1001}:profile xp 150

# ==============================================================================
# 3. GLOBAL REAL-TIME COMPETITIVE LEADERBOARD (ZSET)
# ==============================================================================
# Synchronize XP to the global leaderboard
ZADD leaderboard:season_04 12600 "player:1001"
ZADD leaderboard:season_04 15800 "player:2004"
ZADD leaderboard:season_04 9400 "player:3005"

# Query Top 10 Elite Players with scores
ZREVRANGE leaderboard:season_04 0 9 WITHSCORES

# Fetch immediate neighbors of player:1001 (e.g. 1 rank above, 1 rank below)
ZREVRANK leaderboard:season_04 "player:1001"

# ==============================================================================
# 4. AUDIT & EVENT DISPATCH STREAM (Event-Driven Financial Journal)
# ==============================================================================
# Publish point mutation to durable Redis Stream for async relational database sync
XADD stream:gaming_events * event "XP_AWARDED" playerId "1001" xpGained 150 currentXP 12600 timestamp 1710073000000
""",
            'objectivesId': [
                'Mengintegrasikan seluruh struktur data Redis dalam satu arsitektur backend gaming performa tinggi',
                'Menggabungkan Sliding Window Rate Limiter untuk melindungi API dari penyalahgunaan DDOS',
                'Menerapkan Cache-Aside dengan Hash dan eliminasi Cache Avalanche menggunakan TTL Jitter',
                'Menghubungkan Sorted Sets Leaderboard real-time dengan Redis Streams untuk sinkronisasi database persisten'
            ],
            'objectivesEn': [
                'Synthesize all Redis data structures into a unified, high-throughput gaming backend architecture',
                'Implement Sliding Window Rate Limiting shielding transaction APIs from DDOS abuse',
                'Deploy Cache-Aside profiles using Hashes and eliminate Cache Avalanches with TTL Jitter',
                'Harmonize real-time Sorted Set Leaderboards with Redis Streams for persistent database synchronization'
            ],
            'explanationId': """### Arsitektur Capstone High-Throughput Gaming Engine
Proyek capstone ini mensintesiskan kapabilitas in-memory Redis ke dalam satu arsitektur terpadu:
1. **Perlindungan Gerbang Transaksi**: Modul Sliding Window Rate Limiter berbasis Sorted Sets menyaring lalu lintas API pembayaran secara real-time, menolak banjir request sebelum membebani database utama.
2. **Profil Performa Tinggi Hemat Memori**: Modul profil pemain menggunakan struktur `Hashes` dengan TTL jitter acak, memberikan akses pembacaan data sub-milidetik sekaligus mencegah kepunahan cache secara bersamaan (*Cache Avalanche*).
3. **Papan Peringkat Skala Juta Pemain**: Modul leaderboard berbasis `ZSET` menghitung posisi peringkat pemain secara langsung dari memori tanpa pernah melakukan query sorting disk yang lambat.
4. **Log Event Streaming Tahan Banting**: Setiap perolehan skor dipublikasikan ke `Redis Streams` untuk dikonsumsi oleh background worker yang secara asynchronous mencatat riwayat transaksi permanen ke PostgreSQL.""",
            'explanationEn': """### Capstone High-Throughput Gaming Engine Architecture
This capstone project synthesizes the breadth of Redis in-memory paradigms into an industrial-grade engine:
1. **API Gateway Ingress Defense**: The Sorted Set Sliding Window Rate Limiter intercepts and filters incoming transaction requests in real time, neutralizing traffic floods before primary storage is impacted.
2. **Memory-Dense Sub-Millisecond Profiles**: Player state leverages native `Hashes` with randomized TTL jitter, delivering sub-millisecond lookups while eliminating concurrent cache expirations (*Cache Avalanche*).
3. **Million-Scale Real-Time Leaderboards**: The `ZSET` competitive leaderboard calculates dynamic player ranks directly in RAM, bypassing slow relational disk sorting queries.
4. **Resilient Event Stream Hand-off**: Score mutations publish directly to `Redis Streams`, enabling asynchronous background worker pools to persist financial audit records durably into PostgreSQL.""",
            'beginnerId': """Selamat! Anda telah membangun mesin backend super cepat untuk game online sekelas Mobile Legends atau e-commerce besar. 

Mulai dari satpam pintu masuk yang menghadang bot jahat (Rate Limiter), kartu profil pemain yang dibaca secepat kilat (Hashes Cache), papan peringkat dunia yang terupdate setiap detik (ZSET Leaderboard), hingga buku catatan kurir otomatis yang merekam seluruh hadiah pemain (Redis Streams)!""",
            'beginnerEn': """Congratulations! You have constructed an ultra-high-speed backend engine worthy of a massive multiplayer online game or premier e-commerce platform.

From the gatekeeper turnstile repelling rogue bots (Rate Limiter), to lightning-fast player profile lookups (Hashes Cache), to a global leaderboard updating in real-time (ZSET Leaderboard), to a resilient message stream recording every player reward (Redis Streams)!""",
            'experimentsId': [
                'Uji alur lengkap: tambahkan skor pemain di ZSET, perbarui profile Hash, dan verifikasi event terkirim ke Streams',
                'Simulasikan load 10.000 request per detik pada rate limiter dan amati bagaimana Redis mempertahankan latensi sub-milidetik',
                'Bandingkan performa pembacaan leaderboard 10 teratas di Redis vs query SELECT ... ORDER BY di SQL',
                'Inspeksi memori keseluruhan sistem capstone menggunakan perintah INFO memory'
            ],
            'experimentsEn': [
                'Test the complete lifecycle: increment a player score in ZSET, update profile Hashes, and verify stream publication',
                'Simulate 10,000 requests per second across the rate limiter and observe sub-millisecond latencies',
                'Benchmark top-10 leaderboard reads in Redis versus a traditional relational SQL SELECT ... ORDER BY',
                'Inspect overall capstone memory allocations using the INFO memory command'
            ],
            'challengeId': 'Implementasikan sistem Redlock (Distributed Lock terdistribusi multi-node) untuk transfer koin game antar dua pemain: pastikan lock di-acquire di minimal 3 dari 5 node Redis sebelum saldo dipotong.',
            'challengeEn': 'Architect a multi-node Redlock distributed locking mechanism for player coin transfers: acquire locks across at least 3 of 5 independent Redis instances prior to mutating balances.',
            'summaryId': 'Selamat! Anda telah menguasai seluruh kurikulum Redis: arsitektur Single-Threaded Event Loop, Strings, Hashes, Lists, Sets, Sorted Sets, HyperLogLog, pola Cache-Aside, mitigasi Cache Stampede, Scripting Lua Atomic, Redis Streams, Durabilitas RDB/AOF, Sentinel HA, dan Capstone Gaming Engine.',
            'summaryEn': 'Congratulations! You have mastered the comprehensive Redis continuum: Single-Threaded Event Loop, Strings, Hashes, Lists, Sets, Sorted Sets, HyperLogLog, Cache-Aside architectures, Stampede mitigation, Atomic Lua Scripts, Redis Streams, RDB/AOF durability, Sentinel HA, and a Unified Gaming Engine Capstone.'
        }
    ]

    return {
        'slug': 'redis',
        'track_name': 'Redis',
        'levels': levels,
        'modules': modules
    }
