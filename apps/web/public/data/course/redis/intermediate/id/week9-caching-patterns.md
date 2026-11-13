# Caching Patterns

## Tujuan Pembelajaran

- Cache-aside pattern
- Write-through pattern
- Cache invalidation
- Cache stampede prevention
- TTL strategy

---

## Program: Cache-Aside, TTL & Anti-Pattern

Program menunjukkan pola cache-aside end-to-end: cache miss, penulisan ulang, TTL, dan jebakan stampede.

```redis
# === Alur CACHE-ASIDE READ ===
# 1. Cek cache
GET cache:product:1
# 2. Miss -> ambil dari DB... lalu tulis ke cache:
SET cache:product:1 "Laptop|15000000|25" EX 300
DEL cache:product:1

# === Alur WRITE (invalidasi saat data berubah) ===
SET cache:product:1 "Laptop|15500000|24" EX 300
DEL cache:product:1
# ...pembacaan berikutnya akan mengisi ulang nilai baru

# === Overseeing TTL ===
SET session:abc "uid=42" EX 3600
TTL session:abc

# === ANTI-PATTERN: cache stampede (thundering herd) ===
# key expired TEPAT saat 1000 request datang -> semuanya kena DB.
# Solusi: mutex (SETNX) atau refresh lebih awal lewat background worker:
SET cache:popular:post "rendered-html" EX 590
# refresh SEBELUM expiry oleh worker, bukan di jalur request
```

---

## Konsep Kunci

### Cache-aside vs write-through

Cache-aside: aplikasi mengelola cache sendiri (paling umum, paling fleksibel). Write-through: tiap penulisan DB juga menulis cache (konsisten, biaya tulis tinggi).

### TTL & evict

EX memberi masa hidup kunci; kunci mati otomatis setelah TTL. Pengusiran LRU (maxmemory) berlaku bila memori penuh.

### Stampede & mitigasinya

Kunci panas yang expired bersamaan menggantung DB. Mitigasi: mutex SETNX saat recompute, atau jitter/early refresh agar expiry tidak serempak.

### Invalidation

DEL saat UPDATE/DELETE (cache-aside klasik), atau bump versi nama kunci (cache busting). Sinkronisasi cache & DB adalah bagian terberat sistem terdistribusi.

---

## Eksperimen

- GET kunci yang belum pernah di-set - amati jawabannya (miss).
- SET dengan EX 5 lalu jalankan TTL berulang sampai nilainya -2 (expired).
- Pasangkan SET EX 30 dengan TTL langsung - perhatikan angkanya.

---

## Tantangan

Rancang protokol caching (GET, SET, DEL, TTL per order) untuk satu alur bisnis, lalu kembangkan analisis modus ketika salah, misal saat deploy atau DB failover.

---

## Ringkasan

Materi minggu ini telah dibahas: Cache-Aside, TTL & Anti-Pattern. Lanjut ke pekan berikutnya untuk memperdalam.
