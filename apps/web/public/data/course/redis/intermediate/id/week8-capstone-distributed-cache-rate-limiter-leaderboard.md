# Capstone Project: High-Throughput Cache, Limiter & Leaderboard

> **Kategori:** Redis | **Level:** Scripting Lua, Streams & Klaster Terdistribusi | **Minggu 8:** Capstone Project: High-Throughput Cache, Limiter & Leaderboard

## Tujuan Pembelajaran

- Mengintegrasikan seluruh struktur data Redis dalam satu arsitektur backend gaming performa tinggi
- Menggabungkan Sliding Window Rate Limiter untuk melindungi API dari penyalahgunaan DDOS
- Menerapkan Cache-Aside dengan Hash dan eliminasi Cache Avalanche menggunakan TTL Jitter
- Menghubungkan Sorted Sets Leaderboard real-time dengan Redis Streams untuk sinkronisasi database persisten

---

## Program: Engine Gaming Finansial Terpadu: Cache-Aside, Sliding Rate Limiter, dan Leaderboard Real-Time

```redis
# CAPSTONE PROJECT: High-Throughput In-Memory Cache, Rate Limiter & Leaderboard Engine
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
```

---

## Konsep Kunci

### Arsitektur Capstone High-Throughput Gaming Engine
Proyek capstone ini mensintesiskan kapabilitas in-memory Redis ke dalam satu arsitektur terpadu:
1. **Perlindungan Gerbang Transaksi**: Modul Sliding Window Rate Limiter berbasis Sorted Sets menyaring lalu lintas API pembayaran secara real-time, menolak banjir request sebelum membebani database utama.
2. **Profil Performa Tinggi Hemat Memori**: Modul profil pemain menggunakan struktur `Hashes` dengan TTL jitter acak, memberikan akses pembacaan data sub-milidetik sekaligus mencegah kepunahan cache secara bersamaan (*Cache Avalanche*).
3. **Papan Peringkat Skala Juta Pemain**: Modul leaderboard berbasis `ZSET` menghitung posisi peringkat pemain secara langsung dari memori tanpa pernah melakukan query sorting disk yang lambat.
4. **Log Event Streaming Tahan Banting**: Setiap perolehan skor dipublikasikan ke `Redis Streams` untuk dikonsumsi oleh background worker yang secara asynchronous mencatat riwayat transaksi permanen ke PostgreSQL.

---

---

## Penjelasan untuk Pemula

Selamat! Anda telah membangun mesin backend super cepat untuk game online sekelas Mobile Legends atau e-commerce besar. 

Mulai dari satpam pintu masuk yang menghadang bot jahat (Rate Limiter), kartu profil pemain yang dibaca secepat kilat (Hashes Cache), papan peringkat dunia yang terupdate setiap detik (ZSET Leaderboard), hingga buku catatan kurir otomatis yang merekam seluruh hadiah pemain (Redis Streams)!

## Eksperimen

- Uji alur lengkap: tambahkan skor pemain di ZSET, perbarui profile Hash, dan verifikasi event terkirim ke Streams
- Simulasikan load 10.000 request per detik pada rate limiter dan amati bagaimana Redis mempertahankan latensi sub-milidetik
- Bandingkan performa pembacaan leaderboard 10 teratas di Redis vs query SELECT ... ORDER BY di SQL
- Inspeksi memori keseluruhan sistem capstone menggunakan perintah INFO memory

---

## Tantangan

Implementasikan sistem Redlock (Distributed Lock terdistribusi multi-node) untuk transfer koin game antar dua pemain: pastikan lock di-acquire di minimal 3 dari 5 node Redis sebelum saldo dipotong.

---

## Ringkasan

Selamat! Anda telah menguasai seluruh kurikulum Redis: arsitektur Single-Threaded Event Loop, Strings, Hashes, Lists, Sets, Sorted Sets, HyperLogLog, pola Cache-Aside, mitigasi Cache Stampede, Scripting Lua Atomic, Redis Streams, Durabilitas RDB/AOF, Sentinel HA, dan Capstone Gaming Engine.
