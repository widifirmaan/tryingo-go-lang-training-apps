import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.resolve(__dirname, '../public/data/course/redis/redis');

const MODULES = [
  { id: 1, f: 'pengenalan-redis', lid: 'Pengenalan Redis & Setup', len: 'Introduction to Redis & Setup', pid: 'Hello Redis', pen: 'Hello Redis' },
  { id: 2, f: 'data-types', lid: 'Data Types Overview', len: 'Data Types Overview', pid: 'Key-Value Basics', pen: 'Key-Value Basics' },
  { id: 3, f: 'strings', lid: 'Strings & Binary Safe Data', len: 'Strings & Binary Safe Data', pid: 'String Operations', pen: 'String Operations' },
  { id: 4, f: 'hashes', lid: 'Hashes', len: 'Hashes', pid: 'Hash Operations', pen: 'Hash Operations' },
  { id: 5, f: 'lists', lid: 'Lists & Stack/Queue', len: 'Lists & Stack/Queue', pid: 'List Operations', pen: 'List Operations' },
  { id: 6, f: 'sets', lid: 'Sets & Unique Collections', len: 'Sets & Unique Collections', pid: 'Set Operations', pen: 'Set Operations' },
  { id: 7, f: 'sorted-sets', lid: 'Sorted Sets & Rankings', len: 'Sorted Sets & Rankings', pid: 'Ranking Operations', pen: 'Ranking Operations' },
  { id: 8, f: 'expiration', lid: 'Expiration & TTL', len: 'Expiration & TTL', pid: 'Time-Based Data', pen: 'Time-Based Data' },
  { id: 9, f: 'pub-sub', lid: 'Pub/Sub Messaging', len: 'Pub/Sub Messaging', pid: 'Real-time Messaging', pen: 'Real-time Messaging' },
  { id: 10, f: 'transactions', lid: 'Transactions & Pipelining', len: 'Transactions & Pipelining', pid: 'Atomic Operations', pen: 'Atomic Operations' },
  { id: 11, f: 'lua-scripting', lid: 'Lua Scripting', len: 'Lua Scripting', pid: 'Server-Side Scripts', pen: 'Server-Side Scripts' },
  { id: 12, f: 'persistence', lid: 'Persistence & RDB/AOF', len: 'Persistence & RDB/AOF', pid: 'Data Durability', pen: 'Data Durability' },
  { id: 13, f: 'replication', lid: 'Replication & Sentinel', len: 'Replication & Sentinel', pid: 'High Availability', pen: 'High Availability' },
  { id: 14, f: 'clustering', lid: 'Clustering & Scaling', len: 'Clustering & Scaling', pid: 'Distributed Redis', pen: 'Distributed Redis' },
  { id: 15, f: 'security', lid: 'Security & ACL', len: 'Security & ACL', pid: 'Access Control', pen: 'Access Control' },
  { id: 16, f: 'capstone', lid: 'Capstone: Real-time Leaderboard', len: 'Capstone: Real-time Leaderboard', pid: 'Full Project', pen: 'Full Project' },
];

const OBJ = {
  1: { id: ['Mengenal Redis sebagai in-memory data store', 'Menginstall Redis dan Redis CLI', 'Memahami konsep key-value store', 'Menjalankan Redis dan melakukan SET/GET pertama'], en: ['Understand Redis as an in-memory data store', 'Install Redis and Redis CLI', 'Understand key-value store concepts', 'Run Redis and perform first SET/GET'] },
  2: { id: ['Mengenal tipe data dasar Redis', 'Memahami string, hash, list, set, sorted set', 'Menggunakan TYPE dan KEYS commands', 'Memahami TTL dan data expiration'], en: ['Learn Redis basic data types', 'Understand string, hash, list, set, sorted set', 'Use TYPE and KEYS commands', 'Understand TTL and data expiration'] },
  3: { id: ['Melakukan SET, GET, MSET, MGET', 'Memahami string operations', 'Menggunakan INCR, DECR untuk counter', 'Menggunakan APPEND dan STRLEN'], en: ['Perform SET, GET, MSET, MGET', 'Understand string operations', 'Use INCR, DECR for counters', 'Use APPEND and STRLEN'] },
  4: { id: ['Membuat hash dengan HSET, HGET', 'Menggunakan HMSET dan HMGET', 'Memahami HGETALL dan HKEYS', 'Menggunakan HINCRBY untuk atomic increment'], en: ['Create hashes with HSET, HGET', 'Use HMSET and HMGET', 'Understand HGETALL and HKEYS', 'Use HINCRBY for atomic increment'] },
  5: { id: ['Melakukan LPUSH, RPUSH, LRANGE', 'Memahami LPOP, RPOP untuk stack/queue', 'Menggunakan LINSERT untuk insert before/after', 'Menggunakan LREM untuk remove elements'], en: ['Perform LPUSH, RPUSH, LRANGE', 'Understand LPOP, RPOP for stack/queue', 'Use LINSERT for insert before/after', 'Use LREM to remove elements'] },
  6: { id: ['Melakukan SADD, SREM, SMEMBERS', 'Memahami SINTER, SUNION, SDIFF', 'Menggunakan SISMEMBER untuk membership test', 'Menggunakan SRANDMEMBER untuk random selection'], en: ['Perform SADD, SREM, SMEMBERS', 'Understand SINTER, SUNION, SDIFF', 'Use SISMEMBER for membership test', 'Use SRANDMEMBER for random selection'] },
  7: { id: ['Melakukan ZADD, ZRANGE, ZREVRANGE', 'Memahami ZSCORE dan ZRANK', 'Menggunakan ZUNIONSTORE dan ZINTERSTORE', 'Menggunakan ZREM untuk remove dari sorted set'], en: ['Perform ZADD, ZRANGE, ZREVRANGE', 'Understand ZSCORE and ZRANK', 'Use ZUNIONSTORE and ZINTERSTORE', 'Use ZREM to remove from sorted set'] },
  8: { id: ['Memahami TTL dan EXPIRE', 'Menggunakan PERSIST untuk remove expiration', 'Menggunakan SETEX untuk set with expiration', 'Memahami volatile TTL dan data eviction'], en: ['Understand TTL and EXPIRE', 'Use PERSIST to remove expiration', 'Use SETEX for set with expiration', 'Understand volatile TTL and data eviction'] },
  9: { id: ['Memahami Pub/Sub model', 'Menggunakan PUBLISH, SUBSCRIBE, UNSUBSCRIBE', 'Memahami pattern matching di subscription', 'Membangun real-time notification system'], en: ['Understand Pub/Sub model', 'Use PUBLISH, SUBSCRIBE, UNSUBSCRIBE', 'Understand pattern matching in subscriptions', 'Build real-time notification system'] },
  10: { id: ['Memahami MULTI, EXEC, DISCARD', 'Menggunakan WATCH untuk optimistic locking', 'Memahami pipelining untuk performance', 'Mengimplementasi atomic counter dengan transactions'], en: ['Understand MULTI, EXEC, DISCARD', 'Use WATCH for optimistic locking', 'Understand pipelining for performance', 'Implement atomic counter with transactions'] },
  11: { id: ['Memahami Lua scripting di Redis', 'Menggunakan EVAL dan EVALSHA', 'Memahami KEYS dan ARGV', 'Mengimplementasi atomic operations dengan Lua'], en: ['Understand Lua scripting in Redis', 'Use EVAL and EVALSHA', 'Understand KEYS and ARGV', 'Implement atomic operations with Lua'] },
  12: { id: ['Memahami RDB persistence', 'Menggunakan BGSAVE untuk background save', 'Memahami AOF persistence', 'Mengatur hybrid RDB+AOF untuk durability'], en: ['Understand RDB persistence', 'Use BGSAVE for background save', 'Understand AOF persistence', 'Configure hybrid RDB+AOF for durability'] },
  13: { id: ['Memahami Redis replication', 'Mengatur master-replica setup', 'Menggunakan Redis Sentinel untuk failover', 'Memahami read replicas dan load balancing'], en: ['Understand Redis replication', 'Configure master-replica setup', 'Use Redis Sentinel for failover', 'Understand read replicas and load balancing'] },
  14: { id: ['Memahami Redis Cluster', 'Mengatur slot distribution', 'Menggunakan redis-cli untuk cluster management', 'Memahami hash tags untuk key distribution'], en: ['Understand Redis Cluster', 'Configure slot distribution', 'Use redis-cli for cluster management', 'Understand hash tags for key distribution'] },
  15: { id: ['Memahami Redis ACL', 'Mengatur user authentication', 'Memberikan command permissions', 'Menggunakan TLS untuk encrypted connections'], en: ['Understand Redis ACL', 'Configure user authentication', 'Grant command permissions', 'Use TLS for encrypted connections'] },
  16: { id: ['Merancang Real-time Leaderboard', 'Menggabungkan semua konsep Redis', 'Mengoptimasi untuk performa tinggi', 'Mempersiapkan deployment Redis'], en: ['Design a Real-time Leaderboard', 'Combine all Redis concepts', 'Optimize for high performance', 'Prepare Redis deployment'] },
};

const CODE = {
  1: `# Connect to Redis\nredis-cli\n\n# Set and Get\nSET mykey "Hello, Redis!"\nGET mykey\n\n# Set with expiration\nSET session:abc123 "user_data" EX 3600\n\n# Check type\nTYPE mykey\n\n# Delete\nDEL mykey`,
  2: `# List all keys\nKEYS *\n\n# Check type of a key\nTYPE mykey\n\n# Get all string keys\nKEYS string:*\n\n# Get all hash keys\nKEYS hash:*\n\n# Memory usage\nMEMORY USAGE mykey`,
  3: `# Basic string operations\nSET counter 0\nGET counter\n\n# Increment counter\nINCR counter\nINCR counter\nGET counter\n\n# Decrement\nDECR counter\n\n# Append to string\nSET message "Hello"\nAPPEND message " World"\nGET message\n\n# Get string length\nSTRLEN message\n\n# Multiple set/get\nMSET name1 "Alice" name2 "Bob"\nMGET name1 name2`,
  4: `# Hash operations\nHSET user:1001 name "Alice" email "alice@example.com" age 25\n\n# Get single field\nHGET user:1001 name\n\n# Get all fields\nHGETALL user:1001\n\n# Get all field names\nHKEYS user:1001\n\n# Get all values\nHVALS user:1001\n\n# Increment hash field\nHINCRBY user:1001 age 1\n\n# Check field exists\nHEXISTS user:1001 email`,
  5: `# List operations (as queue)\nLPUSH queue:task "task1"\nLPUSH queue:task "task2"\nLPUSH queue:task "task3"\n\n# Pop from right (FIFO)\nRPOP queue:task\n\n# Get range\nLRANGE queue:task 0 -1\n\n# List length\nLLEN queue:task\n\n# Get element by index\nLINDEX queue:task 0\n\n# Insert before/after\nLINSERT queue:task BEFORE "task2" "task1.5"`,
  6: `# Set operations\nSADD tags:post1 "javascript" "web" "frontend"\nSADD tags:post2 "javascript" "backend" "api"\n\n# Get all members\nSMEMBERS tags:post1\n\n# Set intersection\nSINTER tags:post1 tags:post2\n\n# Set union\nSUNION tags:post1 tags:post2\n\n# Set difference\nSDIFF tags:post1 tags:post2\n\n# Check membership\nSISMEMBER tags:post1 "javascript"\n\n# Random member\nSRANDMEMBER tags:post1 2`,
  7: `# Sorted set operations\nZADD leaderboard 100 "player1"\nZADD leaderboard 200 "player2"\nZADD leaderboard 150 "player3"\n\n# Get all with scores\nZRANGE leaderboard 0 -1 WITHSCORES\n\n# Get top 3\nZREVRANGE leaderboard 0 2 WITHSCORES\n\n# Get score\nZSCORE leaderboard "player1"\n\n# Get rank (0-based)\nZRANK leaderboard "player1"\n\n# Count in range\nZCOUNT leaderboard 100 200\n\n# Union of sorted sets\nZUNIONSTORE merged 2 leaderboard other_leaderboard`,
  8: `# Set expiration\nSET temp "data" EX 60\nSET temp2 "data2" PX 5000\n\n# Check remaining TTL\nTTL temp\nPTTL temp2\n\n# Remove expiration\nPERSIST temp\n\n# Set with NX (only if not exists)\nSET lock:resource "locked" NX EX 30\n\n# Set with XX (only if exists)\nSET counter "updated" XX`,
  9: `# Publish/Subscribe\n# Terminal 1 - Subscribe\nSUBSCRIBE notifications\n\n# Terminal 2 - Publish\nPUBLISH notifications "New user registered!"\nPUBLISH notifications "Order #123 shipped"\n\n# Pattern subscription\nPSUBSCRIBE notifications:*\n\n# Unsubscribe\nUNSUBSCRIBE notifications\nPUNSUBSCRIBE notifications:*`,
  10: `# Transaction\nMULTI\nSET user:1001 "Alice"\nINCR counter\nSET user:1002 "Bob"\nEXEC\n\n# Watch for optimistic locking\nWATCH balance:account1\nMULTI\nDECRBY balance:account1 500000\nINCRBY balance:account2 500000\nEXEC\n\n# Pipeline for performance\nPING\nPING\nPING\nPING\nPING`,
  11: `# Lua script\nEVAL "return redis.call('GET', KEYS[1])" 1 mykey\n\n# Script with arguments\nEVAL "local current = tonumber(redis.call('GET', KEYS[1]) or '0'); redis.call('SET', KEYS[1], current + tonumber(ARGV[1])); return current + tonumber(ARGV[1])" 1 counter 10\n\n# Store and reuse script\nSCRIPT LOAD "return redis.call('GET', KEYS[1])"\nSCRIPT EXIST <sha1>\nSCRIPT FLUSH`,
  12: `# Save RDB snapshot\nSAVE\nBGSAVE\n\n# Check last save time\nLASTSAVE\n\n# Configure RDB in redis.conf\n# save 900 1\n# save 300 10\n# save 60 10000\n\n# Enable AOF\n# appendonly yes\n# appendfilename "appendonly.aof"\n# appendfsync everysec\n\n# Check persistence info\nINFO persistence`,
  13: `# Configure replication in redis.conf\n# replicaof <masterip> <masterport>\n\n# Check replication info\nINFO replication\n\n# Sentinel configuration\n# sentinel monitor mymaster <masterip> <masterport> 2\n# sentinel down-after-milliseconds mymaster 5000\n# sentinel failover-timeout mymaster 10000\n\n# Check sentinel\nSENTINEL get-master-addr-by-name mymaster`,
  14: `# Create cluster\nredis-cli --cluster create \
  127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 \
  127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 \
  --cluster-replicas 1\n\n# Check cluster info\nredis-cli -c CLUSTER INFO\n\n# Check nodes\nredis-cli -c CLUSTER NODES\n\n# Add slots to node\nredis-cli -c CLUSTER ADDSLOTS 0 1 2 3`,
  15: `# ACL configuration\nACL SETUSER admin on >mypassword ~* +@all\nACL SETUSER readonly on >readonlypass ~* +@read\n\n# List users\nACL LIST\n\n# Test authentication\nAUTH admin mypassword\n\n# Enable ACL in redis.conf\n# requirepass <master-password>\n# user default on ><password> ~* +@all\n\n# TLS configuration\n# tls-port 6379\n# tls-cert-file redis.crt\n# tls-key-file redis.key`,
  16: `# Real-time Leaderboard with Redis\n# Features:\n# - ZADD for score updates\n# - ZREVRANGE for top players\n# - ZRANK for player position\n# - Pub/Sub for live updates\n# - Expiration for session management\n# - Lua scripts for atomic score updates\n# - Persistence for data durability\n# - Cluster for horizontal scaling`,
};

function generateFile(mod, isId) {
  const lang = isId ? 'id' : 'en';
  const title = isId ? mod.lid : mod.len;
  const programTitle = isId ? mod.pid : mod.pen;
  const obj = OBJ[mod.id];
  const objectives = (isId ? obj.id : obj.en).map(o => '- ' + o).join('\n');
  const code = CODE[mod.id];
  const nextModule = MODULES.find(m => m.id === mod.id + 1);
  const nextWeek = nextModule
    ? (isId ? mod.id + 1 + '. ' + nextModule.lid : nextModule.len)
    : (isId ? 'Selesai! 🎉' : 'Complete! 🎉');

  const summary = isId
    ? `Modul ${mod.id} dari 16: **${mod.lid}**. Redis adalah in-memory data store yang cepat dan fleksibel. Minggu depan: **${nextWeek}**.`
    : `Module ${mod.id} of 16: **${mod.len}**. Redis is a fast and flexible in-memory data store. Next week: **${nextWeek}**.`;

  return '# ' + title + '\n\n'
    + '> Redis | ' + (isId ? 'Modul ' + mod.id : 'Module ' + mod.id) + '\n\n'
    + '## ' + (isId ? 'Tujuan Pembelajaran' : 'Learning Objectives') + '\n\n'
    + objectives + '\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Program' : 'Program') + ': ' + programTitle + '\n\n'
    + '```redis\n' + code + '\n```\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Penjelasan' : 'Explanation') + '\n\n'
    + (isId
      ? 'Redis adalah in-memory data store yang digunakan sebagai database, cache, dan message broker.\nRedis mendukung berbagai tipe data: string, hash, list, set, dan sorted set.\nRedis juga mendukung pub/sub messaging, Lua scripting, dan clustering untuk skalabilitas.'
      : 'Redis is an in-memory data store used as a database, cache, and message broker.\nRedis supports various data types: string, hash, list, set, and sorted set.\nRedis also supports pub/sub messaging, Lua scripting, and clustering for scalability.')
    + '\n\n---\n\n'
    + '## ' + (isId ? 'Eksperimen' : 'Experiments') + '\n\n'
    + '- ' + (isId ? 'Ubah command di atas dan lihat hasilnya' : 'Change the command above and see the results') + '\n'
    + '- ' + (isId ? 'Coba tipe data lain dan bandingkan performanya' : 'Try another data type and compare performance') + '\n'
    + '- ' + (isId ? 'Coba gunakan Lua scripting untuk atomic operation' : 'Try using Lua scripting for atomic operations') + '\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Tantangan' : 'Challenge') + '\n\n'
    + (isId
      ? 'Buat aplikasi sederhana menggunakan konsep minggu ini.\nJalankan command di redis-cli dan verifikasi hasilnya.'
      : 'Build a simple application using this weeks concepts.\nRun commands in redis-cli and verify the results.')
    + '\n\n---\n\n'
    + '## ' + (isId ? 'Ringkasan' : 'Summary') + '\n\n'
    + summary + '\n';
}

if (!fs.existsSync(BASE)) {
  fs.mkdirSync(path.join(BASE, 'id'), { recursive: true });
  fs.mkdirSync(path.join(BASE, 'en'), { recursive: true });
}

for (const mod of MODULES) {
  const idContent = generateFile(mod, true);
  const enContent = generateFile(mod, false);
  fs.writeFileSync(path.join(BASE, 'id', 'week' + mod.id + '-' + mod.f + '.md'), idContent, 'utf8');
  fs.writeFileSync(path.join(BASE, 'en', 'week' + mod.id + '-' + mod.f + '.md'), enContent, 'utf8');
  console.log('  ' + mod.id + '. ' + mod.lid + ' / ' + mod.len);
}

console.log('\n✓ Generated ' + (MODULES.length * 2) + ' Redis curriculum files (' + MODULES.length + ' modules × 2 languages)');
console.log('  Output: ' + BASE);