import { BaseGenerator } from './lib/base-generator.mjs';

const gen = new BaseGenerator('redis', 'Redis');

const LEVELS = [
  {
    levelId: 'beginer',
    nameId: 'Pemula',
    nameEn: 'Beginner',
    descId: 'Dasar Redis: tipe data, string, hash, list, set.',
    descEn: 'Redis fundamentals: data types, strings, hashes, lists, sets.',
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah',
    nameEn: 'Intermediate',
    descId: 'Redis lanjutan: sorted sets, pub/sub, lua, clustering.',
    descEn: 'Advanced Redis: sorted sets, pub/sub, lua scripting, clustering.',
  },
];

const MODULES = [
  {
    week: 1, level: 'beginer', topicId: 'tipe-data-string',
    titleId: 'Tipe Data & String', titleEn: 'Data Types & Strings',
    programId: 'Operasi String Redis', programEn: 'Redis String Operations',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'shell',
    code: `# String: operasi dasar
SET user:1001 "Budi Santoso"
GET user:1001

# SET dengan expiry (TTL)
SET session:abc123 "active" EX 3600  # 1 jam
TTL session:abc123

# Multiple set/get
MSET product:1 "Laptop" product:2 "Mouse" product:3 "Keyboard"
MGET product:1 product:2 product:3

# Increment/Decrement
SET counter:visitors 0
INCR counter:visitors
INCRBY counter:visitors 5
DECR counter:visitors
DECRBY counter:visitors 2
GET counter:visitors

# Append & Strlen
SET greeting "Hello"
APPEND greeting " World"
STRLEN greeting

# Set jika tidak ada (untuk locking)
SET lock:resource "locked" NX EX 10
SET lock:resource "locked" NX EX 10  # Gagal, sudah ada

# GETSET (atomic get + SET)
GETSET counter:visitors 0`,
    objectivesId: ["SET dan GET","MSET dan MGET","INCR, DECR, INCRBY","SET dengan TTL (EX, PX)","SET NX untuk locking"],
    objectivesEn: ["SET and GET","MSET and MGET","INCR, DECR, INCRBY","SET with TTL (EX, PX)","SET NX for locking"],
    explanationId: `### String
Tipe data dasar Redis. Bisa simpan text, integer, binary.

### SET & GET
Simpan dan ambil value.

### Multiple
MSET/MGET untuk operasi batch.

### Increment
INCR/DECR atomic counter.

### TTL
EX (detik), PX (milidetik). TTL untuk cek sisa waktu.`,
    explanationEn: `### Strings
Basic Redis data type. Store text, integers, binary.

### SET & GET
Store and retrieve values.

### Multiple
MSET/MGET for batch operations.

### Increment
INCR/DECR atomic counters.

### TTL
EX (seconds), PX (milliseconds). TTL to check remaining time.`,
    experimentsId: ["SET vs SETNX","BITCOUNT untuk bit","SETRANGE","String sebagai counter rate limiter"],
    experimentsEn: ["SET vs SETNX","BITCOUNT for bits","SETRANGE","Strings as rate limiter counters"],
    challengeId: `Session store: simpan session dengan TTL, cek expired.`,
    challengeEn: `Session store: store sessions with TTL, check expiration.`,
    summaryId: `Minggu 1 dari 10: **Tipe Data & String** (Pemula).`,
    summaryEn: `Week 1 of 10: **Data Types & Strings** (Beginner).`,
  },
  {
    week: 2, level: 'beginer', topicId: 'hash',
    titleId: 'Hash', titleEn: 'Hashes',
    programId: 'Operasi Hash Redis', programEn: 'Redis Hash Operations',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'shell',
    code: `# Hash: simpan object
HSET user:1001 nama "Budi" email "budi@mail.com" umur 25 kota "Jakarta"

# Get single field
HGET user:1001 nama

# Get multiple field
HMGET user:1001 nama email kota

# Get all fields
HGETALL user:1001

# Get only keys
HKEYS user:1001

# Get only values
HVALS user:1001

# Increment field
HINCRBY user:1001 umur 1

# Set jika tidak ada
HSETNX user:1001 phone "08123456789"
HSETNX user:1001 phone "08987654321"  # Gagal

# Cek field exists
HEXISTS user:1001 email

# Hapus field
HDEL user:1001 phone

# Panjang hash
HLEN user:1001

# Scan hash (untuk hash besar)
HSCAN user:1001 0 COUNT 10`,
    objectivesId: ["HSET dan HGET","HMSET dan HMGET","HGETALL, HKEYS, HVALS","HINCRBY","HSETNX dan HDEL"],
    objectivesEn: ["HSET and HGET","HMSET and HMGET","HGETALL, HKEYS, HVALS","HINCRBY","HSETNX and HDEL"],
    explanationId: `### Hash
Map field-value dalam satu key. Bagus untuk object.

### HSET & HGET
Simpan dan ambil per field.

### HGETALL
Ambil semua field dan value.

### HINCRBY
Increment numeric field.

### HSETNX
Set hanya jika field belum ada.`,
    explanationEn: `### Hashes
Field-value map in one key. Good for objects.

### HSET & HGET
Store and retrieve per field.

### HGETALL
Get all fields and values.

### HINCRBY
Increment numeric field.

### HSETNX
Set only if field does not exist.`,
    experimentsId: ["Hash untuk shopping cart","HINCRBY untuk stats","Hash vs String serialized","Scan pattern"],
    experimentsEn: ["Hashes for shopping carts","HINCRBY for statistics","Hashes vs serialized strings","Scan patterns"],
    challengeId: `Profil user: simpan, update, ambil field spesifik.`,
    challengeEn: `User profile: store, update, retrieve specific fields.`,
    summaryId: `Minggu 2 dari 10: **Hash** (Pemula).`,
    summaryEn: `Week 2 of 10: **Hashes** (Beginner).`,
  },
  {
    week: 3, level: 'beginer', topicId: 'list',
    titleId: 'List', titleEn: 'Lists',
    programId: 'Operasi List Redis', programEn: 'Redis List Operations',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'shell',
    code: `# List: antrian/linkded list
LPUSH antrian:tasks "task1" "task2" "task3"
RPUSH antrian:tasks "task4" "task5"

# Lihat list
LRANGE antrian:tasks 0 -1

# Pop dari kiri (dequeue)
LPOP antrian:tasks

# Pop dari kanan
RPOP antrian:tasks

# Panjang list
LLEN antrian:tasks

# Blok sampai ada data (untuk queue)
BLPOP antrian:tasks 30  # Tunggu 30 detik

# Insert sebelum/sesudah
RPUSH mylist "a" "b" "c"
LINSERT mylist BEFORE "b" "x"
LRANGE mylist 0 -1

# Trim list
LTRIM mylist 0 2

# Set nilai by index
LSET mylist 0 "z"

# Remove element
RPUSH mylist "a" "b" "a" "c" "a"
LREM mylist 1 "a"  # Hapus 1 occurrence "a"

# Index of element
LINDEX mylist 0`,
    objectivesId: ["LPUSH, RPUSH, LPOP, RPOP","LRANGE untuk lihat list","BLPOP untuk blocking queue","LINSERT dan LTRIM","LREM dan LINDEX"],
    objectivesEn: ["LPUSH, RPUSH, LPOP, RPOP","LRANGE to view lists","BLPOP for blocking queues","LINSERT and LTRIM","LREM and LINDEX"],
    explanationId: `### List
Linked list. Bisa untuk antrian dan stack.

### LPUSH & RPUSH
Tambah ke kiri atau kanan.

### BLPOP
Blocking pop: tunggu sampai ada data.

### LTRIM
Potong list ke range tertentu.

### LREM
Hapus element by value.`,
    explanationEn: `### Lists
Linked lists. For queues and stacks.

### LPUSH & RPUSH
Add to left or right.

### BLPOP
Blocking pop: wait until data available.

### LTRIM
Trim list to range.

### LREM
Remove elements by value.`,
    experimentsId: ["Implementasi stack dengan list","Reliable queue dengan BRPOPLPUSH","Capped list dengan LTRIM","List vs Stream"],
    experimentsEn: ["Stack with lists","Reliable queue with BRPOPLPUSH","Capped lists with LTRIM","Lists vs Streams"],
    challengeId: `Message queue: producer-consumer dengan list.`,
    challengeEn: `Message queue: producer-consumer with lists.`,
    summaryId: `Minggu 3 dari 10: **List** (Pemula).`,
    summaryEn: `Week 3 of 10: **Lists** (Beginner).`,
  },
  {
    week: 4, level: 'beginer', topicId: 'set',
    titleId: 'Set', titleEn: 'Sets',
    programId: 'Operasi Set Redis', programEn: 'Redis Set Operations',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'shell',
    code: `# Set: koleksi unik tidak terurut
SADD tags:produk:1 "elektronik" "laptop" "asus" "gaming"
SADD tags:produk:2 "aksesoris" "mouse" "logitech"
SADD tags:produk:3 "elektronik" "monitor" "lg"

# Lihat semua member
SMEMBERS tags:produk:1

# Cek membership
SISMEMBER tags:produk:1 "gaming"
SISMEMBER tags:produk:1 "murah"

# Panjang set
SCARD tags:produk:1

# Pop random element
SPOP tags:produk:1

# Hapus member
SREM tags:produk:1 "asus"

# Set operations
SADD setA "1" "2" "3" "4"
SADD setB "3" "4" "5" "6"

# Union (gabungan)
SUNION setA setB

# Intersection (irisan)
SINTER setA setB

# Difference (selisih)
SDIFF setA setB

# Store hasil operasi
SUNIONSTORE result:set setA setB
SINTERSTORE result:common setA setB

# Random member tanpa hapus
SRANDMEMBER tags:produk:1 2`,
    objectivesId: ["SADD, SMEMBERS, SREM","SISMEMBER untuk cek","SUNION, SINTER, SDIFF","SUNIONSTORE, SINTERSTORE","SRANDMEMBER"],
    objectivesEn: ["SADD, SMEMBERS, SREM","SISMEMBER for membership","SUNION, SINTER, SDIFF","SUNIONSTORE, SINTERSTORE","SRANDMEMBER"],
    explanationId: `### Set
Koleksi unik tidak terurut.

### SADD & SREM
Tambah dan hapus member.

### Set Operations
Union, intersection, difference.

### Store
SUNIONSTORE simpan hasil ke key baru.

### SRANDMEMBER
Ambil random tanpa hapus.`,
    explanationEn: `### Sets
Unordered unique collections.

### SADD & SREM
Add and remove members.

### Set Operations
Union, intersection, difference.

### Store
SUNIONSTORE saves result to new key.

### SRANDMEMBER
Get random without removing.`,
    experimentsId: ["Tag system dengan set","Friend recommendations (intersection)","Unique visitors (HyperLogLog)","Set vs Sorted Set"],
    experimentsEn: ["Tag systems with sets","Friend recommendations (intersection)","Unique visitors (HyperLogLog)","Sets vs Sorted Sets"],
    challengeId: `Tag system: tambah/hapus tag, cari produk dengan tag yang sama.`,
    challengeEn: `Tag system: add/remove tags, find products with same tags.`,
    summaryId: `Minggu 4 dari 10: **Set** (Pemula).`,
    summaryEn: `Week 4 of 10: **Sets** (Beginner).`,
  },
  {
    week: 5, level: 'beginer', topicId: 'sorted-set',
    titleId: 'Sorted Set', titleEn: 'Sorted Sets',
    programId: 'Operasi Sorted Set', programEn: 'Sorted Set Operations',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'shell',
    code: `# Sorted Set: set dengan score untuk urutan
ZADD leaderboard 100 "player1" 250 "player2" 180 "player3" 300 "player4" 150 "player5"

# Lihat semua (berdasarkan score)
ZRANGE leaderboard 0 -1 WITHSCORES

# Lihat reverse (terbesar dulu)
ZREVRANGE leaderboard 0 -1 WITHSCORES

# Top 3
ZREVRANGE leaderboard 0 2 WITHSCORES

# Score spesifik
ZSCORE leaderboard "player2"

# Rank (posisi)
ZRANK leaderboard "player2"
ZREVRANK leaderboard "player2"

# Increment score
ZINCRBY leaderboard 50 "player1"

# Count dalam range
ZCOUNT leaderboard 100 200

# Range by score
ZRANGEBYSCORE leaderboard 100 200 WITHSCORES

# Remove by score range
ZREMRANGEBYSCORE leaderboard 0 100

# Remove by rank
ZREMRANGEBYRANK leaderboard 0 0

# Intersection sorted sets
ZADD set1 1 "a" 2 "b" 3 "c"
ZADD set2 10 "b" 20 "c" 30 "d"
ZINTERSTORE result 2 set1 set2 WITHSCORES`,
    objectivesId: ["ZADD dan ZRANGE","ZREVRANGE untuk ranking","ZINCRBY untuk increment score","ZCOUNT dan ZRANGEBYSCORE","ZINTERSTORE dan ZUNIONSTORE"],
    objectivesEn: ["ZADD and ZRANGE","ZREVRANGE for rankings","ZINCRBY for score increments","ZCOUNT and ZRANGEBYSCORE","ZINTERSTORE and ZUNIONSTORE"],
    explanationId: `### Sorted Set
Set dengan score. Otomatis urut by score.

### ZADD
Tambah member dengan score.

### ZREVRANGE
Range descending untuk leaderboard.

### ZINCRBY
Increment score (untuk point system).

### ZCOUNT
Count member dalam range score.`,
    explanationEn: `### Sorted Sets
Sets with scores. Auto-sorted by score.

### ZADD
Add member with score.

### ZREVRANGE
Descending range for leaderboards.

### ZINCRBY
Increment score (for point systems).

### ZCOUNT
Count members in score range.`,
    experimentsId: ["Rate limiter dengan sorted set","Leaderboard real-time","Time-based scoring","Sorted set vs list"],
    experimentsEn: ["Rate limiters with sorted sets","Real-time leaderboards","Time-based scoring","Sorted sets vs lists"],
    challengeId: `Leaderboard game: tambah skor, lihat top 10, cek rank pemain.`,
    challengeEn: `Game leaderboard: add scores, view top 10, check player rank.`,
    summaryId: `Minggu 5 dari 10: **Sorted Set** (Pemula).`,
    summaryEn: `Week 5 of 10: **Sorted Sets** (Beginner).`,
  },
  {
    week: 6, level: 'intermediate', topicId: 'pub-sub',
    titleId: 'Pub/Sub & Streams', titleEn: 'Pub/Sub & Streams',
    programId: 'Messaging Redis', programEn: 'Redis Messaging',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'shell',
    code: `# Pub/Sub: publish-subscribe
# Subscriber (terminal 1)
SUBSCRIBE news:tech news:sports
PSUBSCRIBE news:*

# Publisher (terminal 2)
PUBLISH news:tech "AI terbaru 2024"
PUBLISH news:sports "Hasil pertandingan"

# Unsubscribe
UNSUBSCRIBE news:tech

# Streams: append-only log
XADD events * type "login" user "budi" ip "10.0.0.1"
XADD events * type "purchase" user "budi" amount 12500000
XADD events * type "logout" user "budi"

# Baca stream
XRANGE events - +

# Baca dari ID tertentu
XRANGE events 1700000000000-0 +

# Panjang stream
XLEN events

# Consumer group
XGROUP CREATE events mygroup 0
XREADGROUP GROUP mygroup consumer1 STREAMS events >

# ACK message
XACK events mygroup 1700000000000-0

# Trim stream
XTRIM events MAXLEN 1000

# Blocking read
XREAD BLOCK 5000 STREAMS events $`,
    objectivesId: ["SUBSCRIBE, PUBLISH, UNSUBSCRIBE","PSUBSCRIBE pattern matching","XADD dan XRANGE streams","Consumer group","XACK dan XTRIM"],
    objectivesEn: ["SUBSCRIBE, PUBLISH, UNSUBSCRIBE","PSUBSCRIBE pattern matching","XADD and XRANGE streams","Consumer groups","XACK and XTRIM"],
    explanationId: `### Pub/Sub
Messaging pattern: publisher kirim, subscriber terima.

### Pattern
PSUBSCRIBE dengan wildcard pattern.

### Streams
Append-only log untuk event sourcing.

### Consumer Group
Multiple consumer baca stream yang sama.

### XACK
Acknowledge message sudah diproses.`,
    explanationEn: `### Pub/Sub
Messaging pattern: publisher sends, subscriber receives.

### Patterns
PSUBSCRIBE with wildcard patterns.

### Streams
Append-only log for event sourcing.

### Consumer Groups
Multiple consumers read same stream.

### XACK
Acknowledge processed messages.`,
    experimentsId: ["Chat room dengan pub/sub","Event sourcing dengan streams","Stream processing pipeline","Consumer group failover"],
    experimentsEn: ["Chat rooms with pub/sub","Event sourcing with streams","Stream processing pipelines","Consumer group failover"],
    challengeId: `Real-time notification system: pub/sub + streams.`,
    challengeEn: `Real-time notification system: pub/sub + streams.`,
    summaryId: `Minggu 6 dari 10: **Pub/Sub & Streams** (Menengah).`,
    summaryEn: `Week 6 of 10: **Pub/Sub & Streams** (Intermediate).`,
  },
  {
    week: 7, level: 'intermediate', topicId: 'lua-scripting',
    titleId: 'Lua Scripting', titleEn: 'Lua Scripting',
    programId: 'Redis Lua Scripts', programEn: 'Redis Lua Scripts',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'shell',
    code: `# Lua scripting: operasi atomic
# Rate limiter
EVAL "
local current = redis.call('GET', KEYS[1])
if current and tonumber(current) >= tonumber(ARGV[1]) then
    return 0
end
redis.call('INCR', KEYS[1])
if redis.call('TTL', KEYS[1]) == -1 then
    redis.call('EXPIRE', KEYS[1], tonumber(ARGV[2]))
end
return 1
" 1 rate:limit:user:1001 10 60

# Distributed lock
EVAL "
if redis.call('SET', KEYS[1], ARGV[1], 'NX', 'PX', ARGV[2]) then
    return 1
end
return 0
" 1 lock:resource "owner_id" 10000

# Release lock (hanya pemilik)
EVAL "
if redis.call('GET', KEYS[1]) == ARGV[1] then
    return redis.call('DEL', KEYS[1])
end
return 0
" 1 lock:resource "owner_id"

# Atomic transfer
EVAL "
local saldo = tonumber(redis.call('GET', KEYS[1]))
if saldo >= tonumber(ARGV[1]) then
    redis.call('DECRBY', KEYS[1], ARGV[1])
    redis.call('INCRBY', KEYS[2], ARGV[1])
    return 1
end
return 0
" 2 saldo:user:1 saldo:user:2 500000

# Load script untuk reuse
SCRIPT LOAD "return redis.call('GET', KEYS[1])"
# EVALSHA <sha> 1 key`,
    objectivesId: ["EVAL untuk script atomic","Rate limiter dengan Lua","Distributed lock","Release lock aman","SCRIPT LOAD dan EVALSHA"],
    objectivesEn: ["EVAL for atomic scripts","Rate limiter with Lua","Distributed locks","Safe lock release","SCRIPT LOAD and EVALSHA"],
    explanationId: `### EVAL
Jalankan script Lua di Redis. Atomic.

### Rate Limiter
Cek counter, increment, set TTL.

### Distributed Lock
SET NX untuk lock, DEL dengan verifikasi pemilik.

### Atomic Transfer
Cek saldo, debit, credit dalam satu script.

### SCRIPT LOAD
Cache script untuk reuse dengan SHA.`,
    explanationEn: `### EVAL
Run Lua scripts in Redis. Atomic.

### Rate Limiter
Check counter, increment, set TTL.

### Distributed Lock
SET NX for locking, DEL with owner verification.

### Atomic Transfer
Check balance, debit, credit in one script.

### SCRIPT LOAD
Cache scripts for reuse with SHA.`,
    experimentsId: ["Token bucket rate limiter","Redlock algorithm","Atomic inventory decrement","Lua script debugging"],
    experimentsEn: ["Token bucket rate limiter","Redlock algorithm","Atomic inventory decrement","Lua script debugging"],
    challengeId: `Distributed lock manager: acquire, release, renew.`,
    challengeEn: `Distributed lock manager: acquire, release, renew.`,
    summaryId: `Minggu 7 dari 10: **Lua Scripting** (Menengah).`,
    summaryEn: `Week 7 of 10: **Lua Scripting** (Intermediate).`,
  },
  {
    week: 8, level: 'intermediate', topicId: 'clustering',
    titleId: 'Redis Cluster', titleEn: 'Redis Cluster',
    programId: 'Distributed Redis', programEn: 'Distributed Redis',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'shell',
    code: `# Redis Cluster: distribusi data
# Konfigurasi (redis.conf)
# cluster-enabled yes
# cluster-config-file nodes.conf
# cluster-node-timeout 5000

# Buat cluster (6 nodes: 3 master, 3 replica)
# redis-cli --cluster create \\
#   127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 \\
#   127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 \\
#   --cluster-replicas 1

# Hash slots: 16384 slots dibagi ke master
# Master 1: 0-5460
# Master 2: 5461-10922
# Master 3: 10923-16383

# Operasi di cluster
redis-cli -c -p 7000
SET user:1001 "Budi"  # Auto-redirect ke slot yang benar
GET user:1001

# Multi-key operations (harus di slot yang sama)
# Gunah hash tag untuk memastikan slot sama
SET {user:1001}:profile "data"
SET {user:1001}:session "active"
MGET {user:1001}:profile {user:1001}:session

# Cluster info
CLUSTER INFO
CLUSTER NODES
CLUSTER SLOTS
CLUSTER KEYSLOT user:1001

# Failover
CLUSTER FAILOVER

# Resharding
# redis-cli --cluster reshard 127.0.0.1:7000`,
    objectivesId: ["Cluster setup","Hash slots","Hash tags untuk multi-key","Cluster info dan nodes","Failover dan resharding"],
    objectivesEn: ["Cluster setup","Hash slots","Hash tags for multi-key","Cluster info and nodes","Failover and resharding"],
    explanationId: `### Cluster
Distribusi data ke multiple node.

### Hash Slots
16384 slots dibagi ke master nodes.

### Hash Tags
{key} untuk memastikan key di slot yang sama.

### Failover
Replica otomatis jadi master jika master mati.

### Resharding
Pindahkan slot antar node.`,
    explanationEn: `### Cluster
Distribute data across multiple nodes.

### Hash Slots
16384 slots divided among master nodes.

### Hash Tags
{key} to ensure keys in same slot.

### Failover
Replica auto-promotes if master fails.

### Resharding
Move slots between nodes.`,
    experimentsId: ["Cluster dengan Docker","Benchmark cluster vs single","Slot migration","Read replicas"],
    experimentsEn: ["Cluster with Docker","Benchmark cluster vs single","Slot migration","Read replicas"],
    challengeId: `Setup Redis Cluster: 3 master + 3 replica + monitoring.`,
    challengeEn: `Setup Redis Cluster: 3 masters + 3 replicas + monitoring.`,
    summaryId: `Minggu 8 dari 10: **Redis Cluster** (Menengah).`,
    summaryEn: `Week 8 of 10: **Redis Cluster** (Intermediate).`,
  },
  {
    week: 9, level: 'intermediate', topicId: 'caching-patterns',
    titleId: 'Caching Patterns', titleEn: 'Caching Patterns',
    programId: 'Strategi Caching', programEn: 'Caching Strategies',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'shell',
    code: `# Cache-Aside Pattern
# 1. Cek cache
GET product:123
# 2. Jika miss, baca dari DB
# 3. Simpan ke cache
SET product:123 "{...}" EX 3600

# Write-Through Pattern
# 1. Tulis ke DB
# 2. Tulis ke cache
SET product:123 "{...}" EX 3600

# Write-Behind (Write-Back)
# 1. Tulis ke cache
# 2. Async flush ke DB

# Cache invalidation
DEL product:123
# Atau pattern-based
EVAL "
local keys = redis.call('KEYS', ARGV[1])
for _, key in ipairs(keys) do
    redis.call('DEL', key)
end
return #keys
" 0 "product:*"

# Cache stampede prevention
# Gunakan lock untuk regenerate cache
EVAL "
if redis.call('SET', KEYS[1], 'regenerating', 'NX', 'EX', 30) then
    return 'regenerate'
end
return 'wait'
" 1 cache:lock:product:123

# TTL strategy
# - Short TTL untuk data sering berubah
# - Long TTL untuk data statis
# - Random TTL untuk hindari thundering herd

# Cache warming
# Pre-populate cache sebelum peak traffic`,
    objectivesId: ["Cache-aside pattern","Write-through pattern","Cache invalidation","Cache stampede prevention","TTL strategy"],
    objectivesEn: ["Cache-aside pattern","Write-through pattern","Cache invalidation","Cache stampede prevention","TTL strategies"],
    explanationId: `### Cache-Aside
App cek cache, jika miss baca DB, simpan ke cache.

### Write-Through
Tulis ke DB dan cache bersamaan.

### Invalidation
Hapus cache saat data berubah.

### Stampede
Lock untuk mencegah banyak request regenerate cache.

### TTL Strategy
Random TTL untuk hindari thundering herd.`,
    explanationEn: `### Cache-Aside
App checks cache, if miss reads DB, stores in cache.

### Write-Through
Write to DB and cache simultaneously.

### Invalidation
Delete cache when data changes.

### Stampede
Lock to prevent many requests regenerating cache.

### TTL Strategy
Random TTL to avoid thundering herd.`,
    experimentsId: ["Cache hit ratio monitoring","LRU eviction policy","Cache warming script","Multi-level cache"],
    experimentsEn: ["Cache hit ratio monitoring","LRU eviction policy","Cache warming scripts","Multi-level caches"],
    challengeId: `Cache layer: implement cache-aside dengan stampede prevention.`,
    challengeEn: `Cache layer: implement cache-aside with stampede prevention.`,
    summaryId: `Minggu 9 dari 10: **Caching Patterns** (Menengah).`,
    summaryEn: `Week 9 of 10: **Caching Patterns** (Intermediate).`,
  },
  {
    week: 10, level: 'intermediate', topicId: 'capstone-project',
    titleId: 'Capstone: Real-time Analytics', titleEn: 'Capstone: Real-time Analytics',
    programId: 'Sistem Analytics Redis', programEn: 'Redis Analytics System',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'shell',
    code: `# CAPSTONE: Real-time Analytics dengan Redis

# 1. Page view tracking (HyperLogLog)
PFADD page:views:2024-01-15 user:1001 user:1002 user:1003
PFADD page:views:2024-01-15 user:1001 user:1004
PFCOUNT page:views:2024-01-15  # Unique visitors

# 2. Daily active users (bitmaps)
SETBIT dau:2024-01-15 1001 1
SETBIT dau:2024-01-15 1002 1
SETBIT dau:2024-01-15 1003 1
BITCOUNT dau:2024-01-15
BITOP OR dau:week dau:2024-01-15 dau:2024-01-16

# 3. Real-time leaderboard
ZADD leaderboard:daily 150 "user:1001" 200 "user:1002" 180 "user:1003"
ZINCRBY leaderboard:daily 50 "user:1001"
ZREVRANGE leaderboard:daily 0 9 WITHSCORES

# 4. Rate limiter
EVAL "
local current = redis.call('GET', KEYS[1])
if current and tonumber(current) >= 100 then return 0 end
redis.call('INCR', KEYS[1])
if redis.call('TTL', KEYS[1]) == -1 then
    redis.call('EXPIRE', KEYS[1], 60)
end
return 1
" 1 rate:limit:api:user:1001

# 5. Session store
HSET session:abc123 user_id 1001 login_at "2024-01-15T10:00:00"
EXPIRE session:abc123 3600

# 6. Event stream
XADD events * type "page_view" user 1001 page "/products"
XADD events * type "click" user 1001 element "buy-button"
XRANGE events - + COUNT 10

# 7. Caching layer
SET product:top "[{id:1,nama:Laptop,qty:50}]" EX 300
GET product:top

# 8. Real-time stats
INCR stats:page_views:today
INCRBY stats:revenue:today 12500000
EXPIRE stats:page_views:today 86400`,
    objectivesId: ["HyperLogLog untuk unique count","Bitmaps untuk DAU","Sorted set leaderboard","Rate limiter","Event stream"],
    objectivesEn: ["HyperLogLog for unique counts","Bitmaps for DAU","Sorted set leaderboards","Rate limiters","Event streams"],
    explanationId: `### HyperLogLog
Count unique dengan memory kecil.

### Bitmaps
Bit-level operations untuk analytics.

### Sorted Set
Leaderboard real-time.

### Rate Limiter
Lua script untuk rate limiting.

### Streams
Event sourcing untuk analytics.`,
    explanationEn: `### HyperLogLog
Count unique with small memory.

### Bitmaps
Bit-level operations for analytics.

### Sorted Sets
Real-time leaderboards.

### Rate Limiter
Lua scripts for rate limiting.

### Streams
Event sourcing for analytics.`,
    experimentsId: ["Sliding window rate limiter","HyperLogLog merge","Stream consumer groups","RedisTimeSeries"],
    experimentsEn: ["Sliding window rate limiters","HyperLogLog merges","Stream consumer groups","RedisTimeSeries"],
    challengeId: `Deploy analytics system: tracking, leaderboard, rate limiter, caching.`,
    challengeEn: `Deploy analytics system: tracking, leaderboard, rate limiter, caching.`,
    summaryId: `Minggu 10 dari 10: **Capstone: Real-time Analytics** (Menengah). Selesai!`,
    summaryEn: `Week 10 of 10: **Capstone: Real-time Analytics** (Intermediate). Complete!`,
  },
];

for (const level of LEVELS) {
  level.weeks = MODULES.filter(m => m.level === level.levelId).map(m => ({
    week: m.week,
    topicId: m.topicId,
    titleId: m.titleId,
    titleEn: m.titleEn,
  }));
}

gen.writeFiles(MODULES, LEVELS);
