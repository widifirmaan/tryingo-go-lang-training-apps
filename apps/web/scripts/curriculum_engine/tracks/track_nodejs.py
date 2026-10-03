"""
Node.js Track Curriculum Generator (10 Weeks, 3 Levels)
Product: High-Throughput Real-Time Collaborative Event Stream & WebSocket Gateway (Node.js 22 LTS + Fastify + Redis Streams)
"""

def get_track():
    return {
        'slug': 'nodejs',
        'track_name': 'Node.js Backend',
        'levels': [
            {
                'levelId': 'beginer',
                'nameId': 'Pemula (Node.js 22 LTS Runtime & Streams)',
                'nameEn': 'Beginner (Node.js 22 LTS Runtime & Streams)',
                'descId': 'Runtime Node.js 22 LTS, Native ESM, Buffers, EventEmitter, Transform Streams, dan Fastify REST.',
                'descEn': 'Node.js 22 LTS runtime, Native ESM, Buffers, EventEmitter, Transform Streams, and Fastify REST.',
            },
            {
                'levelId': 'intermediate',
                'nameId': 'Menengah (Worker Threads, Redis Streams & WebSockets)',
                'nameEn': 'Intermediate (Worker Threads, Redis Streams & WebSockets)',
                'descId': 'Worker threads multi-core, Redis Pub/Sub, Redis Streams consumer groups, dan arsitektur WebSocket berkecepatan tinggi.',
                'descEn': 'Multi-core worker threads, Redis Pub/Sub, Redis Streams consumer groups, and high-performance WebSockets.',
            },
            {
                'levelId': 'advanced',
                'nameId': 'Lanjutan (V8 Memory Profiling, Security & Gateway Capstone)',
                'nameEn': 'Advanced (V8 Memory Profiling, Security & Gateway Capstone)',
                'descId': 'Diagnostik memory leak V8, profiling heap dump, security hardening, dan gateway notifikasi real-time production-ready.',
                'descEn': 'V8 memory leak diagnostics, heap dump profiling, security hardening, and production real-time notification gateway.',
            },
        ],
        'modules': [
            # Week 1
            {
                'week': 1,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'node-runtime-esm-buffers',
                'titleId': 'Modern Node.js 22 LTS: Native ESM, node: Protocol & Buffer Memory',
                'titleEn': 'Modern Node.js 22 LTS: Native ESM, node: Protocol & Buffer Memory',
                'programId': 'Parser Paket Biner Telemetri Perangkat IoT dengan Buffer & TypedArrays',
                'programEn': 'IoT Device Telemetry Binary Packet Parser with Buffers & TypedArrays',
                'language': 'javascript',
                'code': '''import { Buffer } from 'node:buffer';

// Simulasi Paket Biner dari Sensor IoT Jarak Jauh (12 Bytes Total)
// Format Protokol:
// [0..1]  : Magic Bytes (0x54, 0x52 -> 'TR')
// [2..3]  : Device ID (Uint16 Big-Endian)
// [4..7]  : Suhu Sensor Celcius (Float32 Big-Endian)
// [8..11] : Timestamp Epoch Detik (Uint32 Big-Endian)

function createSamplePacket(deviceId, temperature, timestamp) {
  const buf = Buffer.alloc(12);
  buf.write('TR', 0, 2, 'ascii');             // Magic Signature
  buf.writeUInt16BE(deviceId, 2);              // Device ID: 2 bytes
  buf.writeFloatBE(temperature, 4);            // Temp Float32: 4 bytes
  buf.writeUInt32BE(timestamp, 8);             // Timestamp Uint32: 4 bytes
  return buf;
}

function decodeTelemetryBuffer(buffer) {
  if (buffer.length !== 12) {
    throw new RangeError(`Paket korup! Panjang harus tepat 12 byte, diterima: ${buffer.length}`);
  }

  const magic = buffer.toString('ascii', 0, 2);
  if (magic !== 'TR') {
    throw new Error(`Magic bytes invalid: ${magic}. Paket tidak dikenali.`);
  }

  const deviceId = buffer.readUInt16BE(2);
  const temperature = Number(buffer.readFloatBE(4).toFixed(2));
  const timestamp = buffer.readUInt32BE(8);

  return {
    magic,
    deviceId,
    temperature,
    timestamp: new Date(timestamp * 1000).toISOString(),
    rawHex: buffer.toString('hex').toUpperCase()
  };
}

// Eksekusi Demonstrasi
const nowEpoch = Math.floor(Date.now() / 1000);
const rawPacket = createSamplePacket(1042, 28.75, nowEpoch);

console.log('=== PAKET RAW BUFFER DITERIMA DARI JARINGAN ===');
console.log('Buffer:', rawPacket);
console.log('Hex representation:', rawPacket.toString('hex').toUpperCase());

console.log('\\n=== HASIL DEKODE BINER TELEMETRI ===');
const decoded = decodeTelemetryBuffer(rawPacket);
console.log(decoded);
''',
                'objectivesId': [
                    'Memahami evolusi runtime Node.js 22 LTS dan penggunaan prefix import `node:`.',
                    'Menguasai manajemen memori biner mentah menggunakan `Buffer` dan TypedArrays di luar V8 Heap.',
                    'Membaca dan menulis format biner Big-Endian dan Little-Endian (`readUInt16BE`, `writeFloatBE`).',
                    'Membedakan `Buffer.alloc` (zero-filled yang aman) vs `Buffer.allocUnsafe` (alokasi instan tanpa zero-fill).',
                ],
                'objectivesEn': [
                    'Understand Node.js 22 LTS runtime evolutions and explicit `node:` import prefixes.',
                    'Master raw binary memory management using `Buffer` and TypedArrays allocated outside the V8 heap.',
                    'Read and write Big-Endian and Little-Endian binary layouts (`readUInt16BE`, `writeFloatBE`).',
                    'Differentiate `Buffer.alloc` (safe zero-filled) from `Buffer.allocUnsafe` (high-speed uninitialized memory).',
                ],
                'explanationId': '''Node.js 22 LTS adalah runtime JavaScript server-side paling matang di dunia. Dalam sistem berskala enterprise seperti IoT gateway dan video/audio streaming, data bergerak dalam bentuk byte biner mentah, bukan string JSON biasa.

### Native ESM dan Awalan node:
Di Node.js modern, modul CommonJS (`require`) telah digantikan oleh Native ECMAScript Modules (`import`). Penggunaan awalan `node:` seperti `import { Buffer } from 'node:buffer'` adalah standar resmi yang menjamin modul dimuat langsung dari core runtime Node.js dan kebal terhadap serangan pembajakan paket pihak ketiga di npm (Dependency Confusion / Typosquatting).

### Buffer: Memori di Luar V8 Heap
V8 JavaScript Engine mengelola objek melalui Garbage Collector di dalam V8 Heap. Namun untuk pemrosesan I/O biner skala besar (jaringan TCP, streaming file), Node.js mengalokasikan memori mentah langsung dari sistem operasi C++ menggunakan kelas `Buffer`. Buffer tidak membebani siklus Garbage Collector V8, sehingga operasi manipulasi byte berjalan secepat kilat.

### Keamanan: Buffer.alloc vs Buffer.allocUnsafe
- `Buffer.alloc(size)`: Menginisialisasi memori dan mengisinya dengan angka 0 (`zero-filled`). Sangat aman dari kebocoran data sensitif.
- `Buffer.allocUnsafe(size)`: Mengalokasikan blok RAM lama tanpa membersihkannya terlebih dahulu. Jauh lebih cepat, namun jika byte-nya langsung dikirim ke client tanpa ditimpa seluruhnya, data sensitif (seperti token atau password lama yang pernah ada di RAM) bisa bocor.
''',
                'explanationEn': '''Node.js 22 LTS stands as the foundational server-side JavaScript runtime. In enterprise IoT hubs and streaming infrastructure, high-volume payloads traverse networks as raw binary bytes rather than bloated JSON strings.

### Native ESM & The node: Prefix
Modern Node.js embraces native ECMAScript Modules (`import/export`) over legacy CommonJS (`require`). Designating the explicit `node:` prefix (`import { Buffer } from 'node:buffer'`) guarantees unambiguous loading from Node's internal C++ core, guarding against npm typosquatting and namespace collisions.

### Buffer: Off-Heap Binary Memory
While the V8 engine manages objects within its garbage-collected heap, high-throughput binary streams allocate memory directly via OS-level memory pools using the `Buffer` class. Off-heap allocation bypasses V8 GC pauses, delivering native throughput.

### Buffer.alloc vs Buffer.allocUnsafe Security
- `Buffer.alloc(size)`: Clears memory chunks with zeroes. Mandatory when preventing memory residue leakage.
- `Buffer.allocUnsafe(size)`: Reserves uninitialized memory instantly without zero-filling. Faster, but risks leaking stale memory fragments (passwords, tokens) if unpopulated bytes are transmitted downstream.
''',
                'beginnerId': '''Bayangkan Anda menerima paket kargo tersegel dari luar negeri berukuran 12 cm (Buffer 12 bytes). 2 cm pertama adalah logo negara pengirim (Magic Bytes), 2 cm berikutnya kode gudang (Device ID), dan 4 cm berikutnya adalah kode angka suhu. Membaca Buffer seperti menggunakan penggaris presisi untuk membaca arti setiap milimeter kotak kargo tersebut.''',
                'beginnerEn': '''Imagine receiving a sealed 12-centimeter cargo crate from overseas (a 12-byte Buffer). The first 2 cm marks the country seal (Magic Bytes), the next 2 cm stamps the warehouse ID, and the next 4 cm stamps calibrated temperature metrics. Decoding a Buffer is like measuring along a ruler to extract binary data points cleanly.''',
                'experimentsId': [
                    'Ubah byte pertama `rawPacket[0] = 0x00` dan amati bagaimana parser melempar error magic bytes invalid.',
                    'Bandingkan benchmark kecepatan `Buffer.alloc(1024)` vs `Buffer.allocUnsafe(1024)` pada 100.000 iterasi.',
                    'Gunakan `buffer.subarray()` untuk memotong irisan byte tanpa menduplikasi alokasi memori baru (Zero-Copy slicing).',
                ],
                'experimentsEn': [
                    'Corrupt the first byte `rawPacket[0] = 0x00` and observe the parser rejecting invalid magic bytes.',
                    'Benchmark execution times of `Buffer.alloc(1024)` versus `Buffer.allocUnsafe(1024)` across 100,000 iterations.',
                    'Use `buffer.subarray()` to slice byte segments with zero-copy memory allocation.',
                ],
                'challengeId': 'Buat parser biner streaming yang memisahkan aliran byte berkelanjutan menjadi paket-paket telemetri individual berdasarkan delimiter magic bytes `TR`.',
                'challengeEn': 'Build a streaming binary parser that slices continuous incoming byte chunks into discrete telemetry packets using the `TR` magic byte delimiter.',
                'summaryId': 'Kamu telah menguasai Node.js 22 ESM, Buffers, dan parsing protokol biner. Minggu depan kita masuk ke Event-Driven Architecture, EventEmitters, dan Transform Streams.',
                'summaryEn': 'You have mastered Node.js 22 ESM, Buffers, and binary protocol parsing. Next week we explore Event-Driven Architecture, EventEmitters, and Transform Streams.',
            },

            # Week 2
            {
                'week': 2,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'event-emitter-streams',
                'titleId': 'Arsitektur Event-Driven: EventEmitter, Transform Streams & Backpressure',
                'titleEn': 'Event-Driven Architecture: EventEmitter, Transform Streams & Backpressure',
                'programId': 'Pipeline Pembersihan & Kompresi Data Telemetri dengan Transform Streams',
                'programEn': 'Telemetry Data Cleansing & Compression Pipeline with Transform Streams',
                'language': 'javascript',
                'code': '''import { EventEmitter } from 'node:events';
import { Transform, Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

// 1. Bus Event Sensor Berbasis EventEmitter
class SensorEventHub extends EventEmitter {
  emitTelemetry(sensorId, value) {
    if (value > 85.0) {
      this.emit('alert:overheat', { sensorId, value, timestamp: Date.now() });
    }
    this.emit('telemetry', { sensorId, value });
  }
}

const hub = new SensorEventHub();

// Daftarkan listener alert overheat
hub.on('alert:overheat', (evt) => {
  console.log(`[CRITICAL ALERT] Sensor ${evt.sensorId} overheating: ${evt.value}°C!`);
});

// 2. Transform Stream: Memfilter Anomali & Menghitung Normalisasi
class TelemetryFilterTransform extends Transform {
  constructor(options = {}) {
    super({ ...options, objectMode: true });
  }

  _transform(chunk, encoding, callback) {
    // Buang data noise (sensor rusak dengan nilai negatif)
    if (chunk.value >= 0) {
      const enriched = {
        ...chunk,
        status: chunk.value > 80 ? 'WARNING' : 'NORMAL',
        processedAt: Date.now()
      };
      this.push(enriched);
    }
    callback();
  }
}

// 3. Eksekusi Pipeline Asinkron dengan Penanganan Backpressure Aman
async function runStreamPipeline() {
  console.log('=== MEMULAI PIPELINE STREAM TELEMETRI ===');
  
  // Sumber Data Stream (Readable)
  const rawReadings = [
    { sensorId: 'SNS-01', value: 24.5 },
    { sensorId: 'SNS-02', value: -999.0 }, // Noise data
    { sensorId: 'SNS-03', value: 92.1 },   // Overheat!
    { sensorId: 'SNS-04', value: 31.0 }
  ];

  const sourceStream = Readable.from(rawReadings);
  const filterTransform = new TelemetryFilterTransform();

  const sinkStream = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      console.log(` -> [PIPELINE OUTPUT]: Sensor ${chunk.sensorId} -> ${chunk.value}°C [${chunk.status}]`);
      callback();
    }
  });

  // stream/promises pipeline otomatis menangani pembersihan memory & error propagation
  await pipeline(sourceStream, filterTransform, sinkStream);
  console.log('=== PIPELINE SELESAI DENGAN SUKSES ===');
}

hub.emitTelemetry('SNS-03', 92.1);
await runStreamPipeline();
''',
                'objectivesId': [
                    'Menguasai arsitektur inti Node.js: `EventEmitter` dan pola Publish-Subscribe in-memory.',
                    'Memahami 4 jenis Streams: Readable, Writable, Duplex, dan Transform.',
                    'Memahami bahaya Backpressure dan mengapa `pipeline()` dari `node:stream/promises` wajib digunakan menggantikan `.pipe()`.',
                    'Membangun Transform Stream kustom dalam `objectMode` untuk pengolahan aliran data.',
                ],
                'objectivesEn': [
                    'Master Node.js core event-driven architecture: `EventEmitter` and in-memory Pub/Sub patterns.',
                    'Understand the 4 stream paradigms: Readable, Writable, Duplex, and Transform.',
                    'Understand Backpressure hazards and why `pipeline()` from `node:stream/promises` is mandatory over legacy `.pipe()`.',
                    'Construct custom Transform Streams in `objectMode` for streaming data processing.',
                ],
                'explanationId': '''Node.js dirancang dari akarnya sebagai platform event-driven non-blocking. Dua fondasi paling penting dalam arsitektur Node.js adalah **EventEmitter** dan **Streams**.

### EventEmitter dan Batasan Listener
`EventEmitter` memungkinkan objek memancarkan event bernama (`hub.emit('telemetry')`) yang didengarkan oleh fungsi listener. Secara default, Node.js memberikan peringatan jika ada lebih dari 10 listener pada satu event untuk mencegah kebocoran memori (memory leak).

### Mengapa Streams Sangat Efisien?
Jika server harus membaca file log berukuran 10GB atau ribuan aliran data sensor, memuat seluruh data ke RAM sekaligus akan langsung menyebabkan Node.js crash dengan error `JavaScript heap out of memory`. Streams memecah data menjadi potongan-potongan kecil (**chunks**) dan memprosesnya seiring data tiba.

### Masalah Backpressure dan pipeline()
Ketika data dibaca (Readable) jauh lebih cepat daripada kemampuan pemrosesan downstream (Writable), memori buffer akan membengkak—fenomena ini disebut **Backpressure**.
Metode lama `source.pipe(dest)` memiliki cacat desain: jika terjadi error di tengah stream, koneksi dan file descriptor tidak ditutup secara otomatis. Sejak Node.js modern, kita selalu menggunakan `pipeline(source, transform, sink)` dari `node:stream/promises` yang otomatis mengatur laju backpressure dan menutup seluruh resource jika terjadi error.
''',
                'explanationEn': '''Node.js was engineered from inception as an asynchronous, event-driven I/O platform. The twin cornerstones of this design are **EventEmitter** and **Streams**.

### EventEmitter & Listener Safety
`EventEmitter` allows objects to publish named events (`hub.emit('telemetry')`) observed by callback subscribers. Node.js issues warning notices if more than 10 listeners bind to an instance, preventing subtle memory leaks.

### Why Streams Deliver Extreme Efficiency
If a server must process a 10GB log file or continuous sensor feeds, buffering everything into memory will instantly trigger `JavaScript heap out of memory` crashes. Streams slice data into discrete **chunks**, processing them progressively.

### Backpressure Hazards & pipeline()
When a Readable stream produces data faster than a Writable destination can consume, intermediate RAM buffers inflate uncontrollably—a state known as **Backpressure**.
The legacy `source.pipe(dest)` syntax harbored critical flaws: errors did not close underlying descriptors, leading to resource leaks. Modern Node.js mandates `pipeline()` from `node:stream/promises`, which regulates backpressure and guarantees descriptor destruction upon completion or failure.
''',
                'beginnerId': '''Bayangkan selang air pemadam kebakaran yang sangat deras (Readable Stream) dialirkan ke ember kecil (Writable Stream). Jika keran dibuka penuh tanpa pengatur, air akan tumpah ke mana-mana dan membanjiri ruangan (Memory Crash). Mekanisme Backpressure seperti katup otomatis yang memperlambat semprotan air sesuai kecepatan ember menampungnya.''',
                'beginnerEn': '''Imagine a high-pressure fire hose (Readable Stream) pouring directly into a small household bucket (Writable Stream). If left unchecked, water floods the room (Memory Crash). Backpressure functions like an automated valve that throttles water delivery to match the exact ingestion speed of the bucket.''',
                'experimentsId': [
                    'Ubah kapasitas buffer menggunakan opsi `highWaterMark` pada stream dan amati frekuensi chunk yang dipancarkan.',
                    'Daftarkan lebih dari 10 listener pada `hub` dan perhatikan peringatan `MaxListenersExceededWarning` di console.',
                    'Simulasikan error di tengah pipeline dan buktikan bahwa `sinkStream` tetap ditutup dengan aman.',
                ],
                'experimentsEn': [
                    'Modify buffer capacity via the `highWaterMark` option and observe chunk frequency.',
                    'Bind more than 10 listeners to `hub` and observe the `MaxListenersExceededWarning` in the console.',
                    'Simulate a mid-stream fault and prove that `sinkStream` descriptors are safely cleaned up.',
                ],
                'challengeId': 'Buat Transform Stream `GzipCompressionTransform` yang memadatkan potongan chunk teks string menjadi buffer terkompresi menggunakan modul `node:zlib`.',
                'challengeEn': 'Build a `GzipCompressionTransform` Transform Stream that compresses streaming text chunks into compressed buffers via `node:zlib`.',
                'summaryId': 'Kamu telah menguasai EventEmitter, Transform Streams, dan penanganan Backpressure dengan pipeline. Minggu depan kita mempelajari File System, Path, dan Child Process.',
                'summaryEn': 'You have mastered EventEmitter, Transform Streams, and Backpressure governance with pipeline. Next week we explore File System, Path, and Child Process.',
            },

            # Week 3
            {
                'week': 3,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'fs-promises-path-childprocess',
                'titleId': 'Operasi Sistem: node:fs/promises, Path & Child Process Management',
                'titleEn': 'System Operations: node:fs/promises, Path & Child Process Management',
                'programId': 'Rotator File Log Otomatis & Pemantau Diagnostik Subproses Sistem',
                'programEn': 'Automated File Log Rotator & Subprocess Diagnostic Monitor',
                'language': 'javascript',
                'code': '''import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

// 1. Path Normalization & File System Promises
async function logTelemetryAudit(logDir, fileName, entry) {
  // Cegah Path Traversal Attack dengan path.join & path.resolve
  const safeDirPath = path.resolve(logDir);
  const targetFilePath = path.join(safeDirPath, fileName);

  // Buat direktori secara rekursif jika belum ada
  await fs.mkdir(safeDirPath, { recursive: true });

  const logLine = `[${new Date().toISOString()}] ${JSON.stringify(entry)}\\n`;
  await fs.appendFile(targetFilePath, logLine, 'utf8');
  console.log(`[FS WRITE SUCCESS] Audit tersimpan ke: ${targetFilePath}`);

  // Periksa Ukuran File untuk Rotasi Log
  const stats = await fs.stat(targetFilePath);
  console.log(`Ukuran file saat ini: ${stats.size} bytes`);
  return stats.size;
}

// 2. Child Process: Menjalankan Perintah OS Diagnostik secara Aman
async function runSystemDiagnostics() {
  console.log('\\n=== MENJALANKAN DIAGNOSTIK OS (CHILD PROCESS) ===');
  try {
    // Menjalankan executable langsung tanpa shell untuk mencegah Command Injection
    const isWindows = process.platform === 'win32';
    const cmd = isWindows ? 'cmd.exe' : 'uname';
    const args = isWindows ? ['/c', 'echo Node.js 22 LTS Telemetry Engine Active'] : ['-a'];

    const { stdout, stderr } = await execFileAsync(cmd, args);
    if (stderr) console.error('[CHILD PROCESS WARN]:', stderr);
    console.log('[CHILD PROCESS OUTPUT]:', stdout.trim());
  } catch (err) {
    console.error('[CHILD PROCESS ERROR]: Gagal menjalankan diagnostik:', err.message);
  }
}

// Eksekusi
const sampleAudit = { event: 'DEVICE_PING', deviceId: 'SNS-1002', status: 'OK' };
await logTelemetryAudit('./storage/logs', 'telemetry.log', sampleAudit);
await runSystemDiagnostics();
''',
                'objectivesId': [
                    'Menggunakan `node:fs/promises` untuk operasi disk non-blocking (`mkdir`, `appendFile`, `stat`).',
                    'Mengamankan manipulasi path dari serangan Path Traversal (`path.resolve`, `path.normalize`).',
                    'Mengeksekusi perintah eksternal menggunakan `child_process.execFile` (bebas dari serangan shell injection).',
                    'Mengonversi callback lawas menjadi Promise menggunakan `node:util.promisify`.',
                ],
                'objectivesEn': [
                    'Use `node:fs/promises` for non-blocking disk operations (`mkdir`, `appendFile`, `stat`).',
                    'Secure path manipulation against Path Traversal vulnerabilities (`path.resolve`, `path.normalize`).',
                    'Execute external processes safely using `child_process.execFile` (immune to shell injection).',
                    'Convert legacy callback APIs into clean Promises using `node:util.promisify`.',
                ],
                'explanationId': '''Aplikasi backend server tidak hanya menerima request HTTP, tetapi juga mengelola file log, berinteraksi dengan sistem operasi host, dan menjalankan subproses utilitas.

### Keunggulan node:fs/promises
Di masa lalu, operasi file menggunakan method callback (`fs.readFile(file, (err, data) => ...)`) yang memicu callback hell, atau method synchronous (`fs.readFileSync()`) yang memblokir seluruh event loop server. Modul `node:fs/promises` menyediakan antarmuka async/await modern yang sepenuhnya non-blocking.

### Mencegah Path Traversal Vulnerability
Jika backend menerima nama file dari pengguna (misal: `../../etc/passwd`), peretas dapat membaca atau menimpa file rahasia sistem operasi. Selalu gunakan `path.resolve` dan `path.join`, serta pastikan path tujuan berada di dalam direktori dasar yang diizinkan sebelum melakukan operasi file.

### Keamanan Child Process: exec vs execFile
- `exec('echo ' + input)`: Menjalankan string melalui sub-shell sistem operasi (`/bin/sh` atau `cmd.exe`). Jika input memuat tanda `; rm -rf /`, sistem Anda dapat diretas (Command Injection).
- `execFile(binary, [args])`: Menjalankan binary executable langsung tanpa shell, memperlakukan seluruh argumen sebagai data murni, sehingga 100% kebal terhadap injeksi shell.
''',
                'explanationEn': '''Enterprise backends frequently interact with host OS environments: managing rotated log volumes, archiving data chunks, and orchestrating external utility sub-processes.

### Non-blocking node:fs/promises
Legacy Node.js relied on callback pyramids or synchronous blocking variants (`fs.readFileSync()`) which paralyzed the event loop. The `node:fs/promises` module provides clean, non-blocking async/await file operations.

### Mitigating Path Traversal Attacks
If an application accepts dynamic file paths from clients (e.g., `../../etc/passwd`), attackers can read arbitrary system configuration. Leveraging `path.resolve` and `path.join` verifies that targets remain confined within intended sandboxes.

### Process Security: exec vs execFile
- `exec('cmd ' + input)`: Spawns an intermediary system shell (`/bin/sh` or `cmd.exe`). Unsanitized input containing delimiters (`;`, `&&`) triggers remote Command Injection exploits.
- `execFile(binary, [args])`: Bypasses shell invocation entirely, executing binaries directly and treating all arguments as isolated string literals, guaranteeing immunity to shell injection.
''',
                'beginnerId': '''Bayangkan Anda petugas arsip gedung. Menggunakan fs/promises seperti mengirim nota permintaan berkas ke petugas gudang bawah tanah sambil Anda terus melayani antrean tamu lain. Dan execFile seperti menyuruh kurir mengantar paket ke alamat yang sudah tertulis di amplop tertutup, bukan membiarkan kurir sembarangan membuka pintu dan menjelajahi seluruh gedung Anda.''',
                'beginnerEn': '''Think of an archivist. Using fs/promises is like submitting a document retrieval request to the basement vault while continuing to assist lobby visitors. And execFile is like instructing a courier to deliver a sealed envelope directly to an address, rather than giving the courier a master key to explore the entire building.''',
                'experimentsId': [
                    'Ubah ukuran rotasi log: jika ukuran file melebihi 10KB, ganti nama file menjadi `telemetry.log.bak` menggunakan `fs.rename`.',
                    'Coba panggil `execFile` dengan argumen yang memuat karakter `; echo hacked` dan buktikan perintah tersebut tidak dieksekusi sebagai shell command.',
                    'Gunakan `fs.watch` untuk memantau perubahan file log secara real-time.',
                ],
                'experimentsEn': [
                    'Implement log rotation: if file size exceeds 10KB, rotate using `fs.rename` to `telemetry.log.bak`.',
                    'Pass arguments containing `; echo hacked` to `execFile` and observe that shell chaining is neutralized.',
                    'Use `fs.watch` to monitor file system modifications reactively.',
                ],
                'challengeId': 'Buat utilitas pembersihan direktori log asinkron `cleanupOldLogs(dir, maxAgeDays)` yang membaca seluruh file di direktori, mengecek `stats.mtimeMs`, dan menghapus file yang lebih tua dari batas hari.',
                'challengeEn': 'Build an async log cleanup utility `cleanupOldLogs(dir, maxAgeDays)` scanning directory files, evaluating `stats.mtimeMs`, and purging expired logs.',
                'summaryId': 'Kamu telah menguasai fs/promises, path sanitization, dan eksekusi child process yang aman. Minggu depan kita beralih ke framework HTTP berkecepatan tinggi: Fastify.',
                'summaryEn': 'You have mastered fs/promises, path sanitization, and secure child process execution. Next week we transition to high-throughput HTTP with Fastify.',
            },

            # Week 4
            {
                'week': 4,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'http-core-vs-fastify',
                'titleId': 'HTTP Berperforma Tinggi: Dari node:http ke Fastify & Schema Compilation',
                'titleEn': 'High-Throughput HTTP: From node:http to Fastify & Schema Compilation',
                'programId': 'Ingesti REST API Telemetri Berkecepatan Tinggi dengan Fastify & Skema Ajv',
                'programEn': 'High-Throughput Telemetry REST API Ingestion with Fastify & Ajv Schema',
                'language': 'javascript',
                'code': '''// Menggunakan arsitektur Fastify (Framework HTTP tercepat di ekosistem Node.js)
// npm install fastify

import Fastify from 'fastify';

const fastify = Fastify({
  logger: false // Matikan logger bawaan untuk benchmark throughput murni
});

// JSON Schema untuk Validasi Input (Ajv) & Kompilasi Serialisasi Cepat (fast-json-stringify)
const telemetryIngestSchema = {
  body: {
    type: 'object',
    required: ['deviceId', 'temperature', 'humidity'],
    properties: {
      deviceId: { type: 'string', minLength: 3, maxLength: 20 },
      temperature: { type: 'number', minimum: -50, maximum: 120 },
      humidity: { type: 'number', minimum: 0, maximum: 100 },
      batteryLevel: { type: 'number', minimum: 0, maximum: 100, default: 100 }
    }
  },
  response: {
    201: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        packetId: { type: 'string' },
        receivedAt: { type: 'string' }
      }
    }
  }
};

let packetCounter = 0;

// Hook Siklus Hidup Request (Fastify Lifecycle Hooks)
fastify.addHook('onRequest', async (request, reply) => {
  request.startTime = process.hrtime.bigint();
});

fastify.addHook('onResponse', async (request, reply) => {
  const diffNs = process.hrtime.bigint() - request.startTime;
  const elapsedMs = Number(diffNs) / 1_000_000;
  // fastify dapat memproses ribuan request per detik dengan latensi sub-milidetik
});

// Endpoint Ingesti Berkecepatan Tinggi
fastify.post('/api/v1/telemetry', { schema: telemetryIngestSchema }, async (request, reply) => {
  packetCounter++;
  const { deviceId, temperature } = request.body;

  reply.status(201);
  return {
    status: 'ACCEPTED',
    packetId: `PKT-${packetCounter.toString().padStart(6, '0')}`,
    receivedAt: new Date().toISOString()
  };
});

// Endpoint Health Check
fastify.get('/health', async () => ({ status: 'UP', totalPackets: packetCounter }));

console.log('=== MEMULAI FASTIFY TELEMETRY SERVER (SIMULASI INITIALIZATION) ===');
console.log('Fastify siap menerima request di port 3000 dengan skema Ajv terkompilasi.');
''',
                'objectivesId': [
                    'Mengetahui keterbatasan arsitektur Express.js lama dibanding framework modern seperti Fastify.',
                    'Memahami kompilasi serialisasi JSON berkecepatan tinggi dengan `fast-json-stringify`.',
                    'Menguasai validasi deklaratif payload menggunakan JSON Schema dan Ajv.',
                    'Menggunakan Request Lifecycle Hooks (`onRequest`, `preHandler`, `onResponse`) di Fastify.',
                ],
                'objectivesEn': [
                    'Understand limitations of legacy Express.js compared to modern frameworks like Fastify.',
                    'Understand accelerated JSON serialization using compiled `fast-json-stringify`.',
                    'Master declarative payload validation leveraging JSON Schema and Ajv.',
                    'Apply Fastify Request Lifecycle Hooks (`onRequest`, `preHandler`, `onResponse`).',
                ],
                'explanationId': '''Selama lebih dari satu dekade, Express.js adalah framework paling populer di Node.js. Namun, Express dirancang di era JavaScript lama dan tidak dioptimalkan untuk async/await modern dan kompilasi skema.

### Mengapa Fastify Menjadi Pilihan Enterprise?
Fastify mampu melayani **hingga 2x - 3x lebih banyak request per detik** dibandingkan Express.js dengan latensi yang jauh lebih rendah dan alokasi memori yang minimal.

### Rahasia Kecepatan: Schema Compilation
Biasanya, server menggunakan `JSON.stringify()` standar untuk mengembalikan data ke klien. `JSON.stringify` harus menelusuri seluruh properti objek secara dinamis saat runtime.
Fastify menggunakan pustaka **fast-json-stringify**: berdasarkan skema `response` yang kita definisikan, Fastify membuat fungsi kompilasi C-like khusus di awal startup. Fungsi ini langsung mencetak string JSON tanpa refleksi, menghasilkan serialisasi 200% lebih cepat.

### Validasi Otomatis dengan Ajv
Dengan mendefinisikan skema JSON pada properti `body`, Fastify menggunakan engine **Ajv** (Another JSON Schema Validator) yang mengompilasi aturan validasi menjadi kode mesin super cepat. Request yang tidak sesuai langsung ditolak dengan status HTTP 400 sebelum menyentuh route handler bisnis kita.
''',
                'explanationEn': '''For over a decade, Express.js dominated the Node.js landscape. However, Express was designed in an earlier era, lacking native optimization for modern async/await execution and schema compilation.

### Why Fastify Powers Modern Enterprise Architectures
Fastify services **2x to 3x higher throughput (requests per second)** than Express.js while sustaining drastically lower latencies and minimal GC allocation footprints.

### The Engine Behind the Speed: Schema Compilation
Standard web frameworks serialize responses via `JSON.stringify()`, which traverses object trees dynamically at runtime.
Fastify integrates **fast-json-stringify**: relying on declared `response` schemas, Fastify synthesizes an optimized C-like serialization function during bootstrapping. This serializes payloads over 200% faster by omitting runtime object introspection.

### High-Speed Validation with Ajv
By binding JSON schemas to route definitions, Fastify compiles validation rules via **Ajv** (Another JSON Schema Validator). Out-of-spec payloads fail fast with HTTP 400 before invoking domain handlers.
''',
                'beginnerId': '''Bayangkan perbedaan antara seorang juru tulis yang harus membaca ulang seluruh dokumen surat setiap kali ingin memfotokopinya (Express + JSON.stringify biasa) vs mesin stempel cetak otomatis yang sudah punya cetakan huruf tetap (Fastify + Skema Ajv). Mesin stempel langsung mencap dokumen dalam 0,01 detik tanpa membaca ulang kata demi kata.''',
                'beginnerEn': '''Consider the difference between a copyist hand-transcribing each letter from scratch (Express + vanilla JSON.stringify) versus an industrial steel stamping press equipped with pre-molded typeplates (Fastify + compiled Ajv schemas). The stamping press stamps documents in 0.01 seconds without re-reading word-by-word.''',
                'experimentsId': [
                    'Kirim request dengan temperature di luar rentang (misal 150) dan amati error validasi Ajv otomatis.',
                    'Hapus field `deviceId` dari body request dan perhatikan penolakan dengan field `required`.',
                    'Ukur durasi eksekusi menggunakan `process.hrtime.bigint()` pada hook `onResponse`.',
                ],
                'experimentsEn': [
                    'Transmit a payload with temperature exceeding 120 and inspect the automated Ajv schema rejection.',
                    'Omit the `deviceId` field from the body and verify the `required` constraint failure.',
                    'Benchmark execution latency via `process.hrtime.bigint()` in the `onResponse` hook.',
                ],
                'challengeId': 'Tambahkan Fastify plugin kustom menggunakan `fastify-plugin` (fp) yang menginjeksi decorator `fastify.decorate("db", myDatabaseClient)` ke seluruh route aplikasi secara modular.',
                'challengeEn': 'Author a custom Fastify plugin using `fastify-plugin` (fp) that injects a `fastify.decorate("db", myDatabaseClient)` decorator across all application routes.',
                'summaryId': 'Kamu telah menguasai Fastify, validasi Ajv, dan serialisasi cepat. Level 1 selesai! Di Level 2 kita mempelajari Worker Threads, Redis Streams, dan WebSockets.',
                'summaryEn': 'You have mastered Fastify, Ajv validation, and accelerated serialization. Level 1 complete! Level 2 explores Worker Threads, Redis Streams, and WebSockets.',
            },

            # Week 5
            {
                'week': 5,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'worker-threads-clustering',
                'titleId': 'Skalabilitas CPU-Bound: Worker Threads, SharedArrayBuffer & Clustering',
                'titleEn': 'CPU-Bound Scalability: Worker Threads, SharedArrayBuffer & Clustering',
                'programId': 'Kalkulator Checksum Biner Kriptografis Paralel dengan Worker Threads',
                'programEn': 'Parallel Cryptographic Binary Checksum Calculator with Worker Threads',
                'language': 'javascript',
                'code': '''import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

if (isMainThread) {
  // === THREAD UTAMA (EVENT LOOP NODE.JS) ===
  console.log(`[MAIN THREAD PID: ${process.pid}] Memulai distribusi beban komputasi CPU berat...`);

  function calculateChecksumInWorker(dataChunk) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: { payload: dataChunk }
      });

      worker.on('message', (result) => resolve(result));
      worker.on('error', (err) => reject(err));
      worker.on('exit', (code) => {
        if (code !== 0) reject(new Error(`Worker berhenti dengan exit code: ${code}`));
      });
    });
  }

  // Simulasi 3 Paket Telemetri Besar yang butuh Hashing CPU Intensif
  const chunks = ['PAYLOAD_TELEMETRY_ALPHA_9981', 'PAYLOAD_TELEMETRY_BETA_2314', 'PAYLOAD_TELEMETRY_GAMMA_7712'];
  
  const start = performance.now();
  const promises = chunks.map((chunk, index) => {
    console.log(` -> Mendelegasikan chunk #${index + 1} ke Worker Thread terpisah...`);
    return calculateChecksumInWorker(chunk);
  });

  const results = await Promise.all(promises);
  const elapsed = (performance.now() - start).toFixed(2);

  console.log(`\\n=== SEMUA WORKER SELESAI DALAM ${elapsed} ms ===`);
  results.forEach((res, i) => {
    console.log(`Chunk #${i + 1} Hash: ${res.hash} (Dihitung di Worker Thread ID: ${res.threadId})`);
  });

} else {
  // === WORKER THREAD (BERJALAN DI THREAD OS TERPISAH TANPA MEMBLOKIR EVENT LOOP) ===
  import('node:crypto').then(({ createHash }) => {
    const { payload } = workerData;
    
    // Simulasi komputasi kriptografi intensif
    const hash = createHash('sha256').update(payload).digest('hex');
    
    // Simulasi jeda beban kerja
    const target = Date.now() + 50;
    while (Date.now() < target) {}

    parentPort.postMessage({
      hash,
      threadId: (import.meta.url) ? 'Worker-Thread-Active' : 'unknown'
    });
  });
}
''',
                'objectivesId': [
                    'Memahami arsitektur Single-Threaded Event Loop Node.js dan bahaya operasi CPU-bound.',
                    'Menggunakan modul `node:worker_threads` untuk komputasi berat tanpa memblokir I/O.',
                    'Memahami mekanisme berbagi memori berkinerja tinggi menggunakan `SharedArrayBuffer` dan `Atomics`.',
                    'Mengetahui perbedaan `worker_threads` (multi-threading dalam 1 proses) vs `node:cluster` (multi-process forking per core CPU).',
                ],
                'objectivesEn': [
                    'Understand Node.js single-threaded Event Loop constraints and the hazards of CPU-bound tasks.',
                    'Deploy `node:worker_threads` for heavy computation without stalling network I/O.',
                    'Understand zero-copy memory sharing using `SharedArrayBuffer` and `Atomics`.',
                    'Differentiate `worker_threads` (shared memory threads) from `node:cluster` (multi-process core forking).',
                ],
                'explanationId': '''Mitos umum mengatakan "Node.js itu single-threaded". Faktanya, I/O jaringan memang ditangani secara non-blocking di atas satu event loop. Namun jika ada fungsi CPU-bound yang berat (seperti kompresi gambar, hashing kriptografi rumit, atau kalkulasi matriks AI), event loop akan terblokir dan server tidak bisa melayani request pengguna lain.

### Worker Threads vs Cluster Module
- **Cluster Module (`node:cluster`)**: Menggandakan seluruh proses Node.js di setiap core CPU. Masing-masing proses memiliki memory space terisolasi dan port HTTP yang dibagi bersama.
- **Worker Threads (`node:worker_threads`)**: Menjalankan thread baru di dalam satu proses Node.js yang sama. Sangat ideal untuk mendelegasikan tugas komputasi spesifik dan memungkinkan berbagi data memori secara langsung.

### SharedArrayBuffer dan Atomics
Biasanya, pengiriman data antara thread utama dan worker menggunakan `postMessage()` yang melakukan kloning data (structured cloning). Untuk pertukaran data telemetri berukuran gigabyte tanpa overhead kloning, kita dapat menggunakan `SharedArrayBuffer` yang dipetakan ke memori yang sama di kedua thread, dikendalikan dengan operasi `Atomics` untuk mencegah race condition.
''',
                'explanationEn': '''A pervasive myth claims "Node.js is purely single-threaded". While network I/O executes over a single event loop, intensive CPU-bound tasks (cryptographic hashing, image manipulation, heavy mathematical modeling) will freeze the event loop, starving incoming connections.

### Worker Threads vs The Cluster Module
- **Cluster Module (`node:cluster`)**: Forks the entire Node.js runtime process across CPU cores. Each worker owns isolated memory while sharing underlying server ports.
- **Worker Threads (`node:worker_threads`)**: Spawns isolated execution threads within a single Node.js process. Tailored for offloading CPU-intensive algorithms without spinning up distinct OS processes.

### SharedArrayBuffer & Atomics
Default inter-thread communication via `postMessage()` incurs structured-cloning serialization penalties. For multi-gigabyte data sets, allocating a `SharedArrayBuffer` permits zero-copy memory sharing between threads, coordinated safely via `Atomics` primitives to prevent race conditions.
''',
                'beginnerId': '''Bayangkan sebuah kantor pos dengan satu petugas loket yang sangat ramah (Event Loop). Jika ada pelanggan yang meminta petugas loket menghitung 10.000 koin receh dengan tangan (CPU-bound), antrean ratusan orang di belakangnya akan tertahan berjam-jam. Dengan Worker Threads, petugas loket segera memanggil asisten di ruang belakang untuk menghitung koin tersebut, sementara loket tetap buka melayani tamu lain.''',
                'beginnerEn': '''Imagine a post office counter staffed by a single clerk (the Event Loop). If a customer demands the clerk manually count 10,000 copper coins (a CPU-bound task), hundreds of waiting customers are blocked for hours. With Worker Threads, the clerk immediately delegates the coin sack to assistants in the back room while keeping the service window open.''',
                'experimentsId': [
                    'Ubah kalkulasi worker menjadi loop penghitungan 100 juta angka dan buktikan thread utama tetap responsif.',
                    'Kirim data antar thread menggunakan `MessageChannel` untuk komunikasi dua arah langsung antar worker.',
                    'Uji coba modul `node:cluster` untuk mem-fork 4 worker HTTP server pada core CPU yang berbeda.',
                ],
                'experimentsEn': [
                    'Execute a 100-million iteration loop inside the worker and verify the main thread remains fully responsive.',
                    'Establish peer-to-peer worker communication channels using `MessageChannel`.',
                    'Test `node:cluster` to fork four HTTP worker processes across multi-core processors.',
                ],
                'challengeId': 'Bangun Thread Pool kustom `WorkerPool(workerScript, poolSize)` yang menggunakan kembali sejumlah worker tetap (misal 4 thread) untuk mengeksekusi antrean tugas tanpa perlu menginstansiasi worker baru setiap saat.',
                'challengeEn': 'Build a custom `WorkerPool(workerScript, poolSize)` reusing a fixed set of persistent worker threads to execute queued tasks without continuous instantiation overhead.',
                'summaryId': 'Kamu telah menguasai Worker Threads, SharedArrayBuffer, dan mitigasi CPU-bound. Minggu depan kita mempelajari perutean pesan terdistribusi dengan Redis Pub/Sub dan Redis Streams.',
                'summaryEn': 'You have mastered Worker Threads, SharedArrayBuffer, and CPU-bound mitigation. Next week we explore distributed messaging with Redis Pub/Sub and Redis Streams.',
            },

            # Week 6
            {
                'week': 6,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'redis-pubsub-streams',
                'titleId': 'Pesan Terdistribusi: Redis Pub/Sub vs Redis Streams & Consumer Groups',
                'titleEn': 'Distributed Messaging: Redis Pub/Sub vs Redis Streams & Consumer Groups',
                'programId': 'Router Event Telemetri Terdistribusi dengan Redis Streams & Consumer Groups',
                'programEn': 'Distributed Telemetry Event Router with Redis Streams & Consumer Groups',
                'language': 'javascript',
                'code': '''// Simulasi In-Memory Redis Streams Engine untuk Demonstrasi Arsitektur
class InMemoryRedisStreams {
  constructor() {
    this.streams = new Map();
    this.consumerOffsets = new Map();
  }

  // XADD: Tambahkan event ke Stream
  xadd(streamKey, id, fields) {
    if (!this.streams.has(streamKey)) {
      this.streams.set(streamKey, []);
    }
    const entryId = id === '*' ? `${Date.now()}-0` : id;
    const entry = { id: entryId, fields };
    this.streams.get(streamKey).push(entry);
    return entryId;
  }

  // XREADGROUP: Baca event sebagai anggota Consumer Group dengan Ack
  xreadgroup(groupName, consumerName, streamKey, count = 2) {
    const stream = this.streams.get(streamKey) || [];
    const key = `${groupName}:${streamKey}`;
    const lastReadIndex = this.consumerOffsets.get(key) || 0;

    const available = stream.slice(lastReadIndex, lastReadIndex + count);
    this.consumerOffsets.set(key, lastReadIndex + available.length);
    return available;
  }
}

const redis = new InMemoryRedisStreams();

// 1. Produsen: Mempublikasikan event telemetri ke stream 'telemetry:events'
console.log('=== PRODUCER: MEMPUBLIKASIKAN EVENT KE REDIS STREAMS (XADD) ===');
const id1 = redis.xadd('telemetry:events', '*', { sensorId: 'SNS-A1', temp: 34.2, alert: 'NORMAL' });
const id2 = redis.xadd('telemetry:events', '*', { sensorId: 'SNS-B2', temp: 88.5, alert: 'OVERHEAT' });
const id3 = redis.xadd('telemetry:events', '*', { sensorId: 'SNS-C3', temp: 22.0, alert: 'NORMAL' });

console.log(`Event dipublikasikan dengan IDs: ${id1}, ${id2}, ${id3}`);

// 2. Konsumen Kelompok (Consumer Group Worker 1 & Worker 2)
console.log('\\n=== CONSUMER GROUP: DISTRIBUSI BEBAN KERJA BERSAMA ===');
const batchWorker1 = redis.xreadgroup('alert-processors', 'worker-pod-1', 'telemetry:events', 2);
console.log('[WORKER 1] Menerima', batchWorker1.length, 'event untuk diproses:');
batchWorker1.forEach(e => console.log(` -> ID: ${e.id} | Sensor: ${e.fields.sensorId} | Temp: ${e.fields.temp}°C`));

const batchWorker2 = redis.xreadgroup('alert-processors', 'worker-pod-2', 'telemetry:events', 2);
console.log('\\n[WORKER 2] Menerima sisa', batchWorker2.length, 'event dari stream:');
batchWorker2.forEach(e => console.log(` -> ID: ${e.id} | Sensor: ${e.fields.sensorId} | Temp: ${e.fields.temp}°C`));
''',
                'objectivesId': [
                    'Mengetahui perbedaan mendasar antara Redis Pub/Sub (ephemeral fire-and-forget) vs Redis Streams (persisten & terurut).',
                    'Menggunakan perintah inti Redis Streams: `XADD`, `XREAD`, `XRANGE`, dan `XACK`.',
                    'Menerapkan Consumer Groups untuk membagi beban pemrosesan event di antara beberapa instance worker.',
                    'Menangani pemulihan kegagalan konsumen menggunakan Pending Entries List (PEL) dan `XCLAIM`.',
                ],
                'objectivesEn': [
                    'Differentiate Redis Pub/Sub (ephemeral fire-and-forget) from Redis Streams (durable, ordered log).',
                    'Use core Redis Streams commands: `XADD`, `XREAD`, `XRANGE`, and `XACK`.',
                    'Implement Consumer Groups distributing streaming workloads across worker instances.',
                    'Handle consumer failure recoveries via Pending Entries Lists (PEL) and `XCLAIM`.',
                ],
                'explanationId': '''Ketika aplikasi Node.js dijalankan di banyak container pod di cloud, kita membutuhkan sistem perutean event terdistribusi untuk menghubungkan seluruh instans aplikasi.

### Redis Pub/Sub vs Redis Streams
- **Redis Pub/Sub**: Bersifat *fire-and-forget*. Jika ada subscriber yang sedang offline atau mengalami restart, pesan yang dikirim pada detik itu akan hilang selamanya. Sangat cocok untuk chat ephemeral atau sinyal invalidasi cache cepat.
- **Redis Streams**: Adalah log pesan persisten bergaya Apache Kafka di dalam Redis. Setiap pesan diberi ID berbasis timestamp yang unik. Jika sebuah pod worker mati, worker pengganti dapat membaca ulang pesan dari titik terakhir.

### Keunggulan Consumer Groups
Fitur **Consumer Groups** memungkinkan beberapa pod worker bergabung dalam satu tim kelompok. Redis memastikan satu pesan di dalam stream hanya diproses oleh satu worker di dalam kelompok tersebut (Load Balancing).

### Jaminan Pemrosesan: XACK dan PEL
Setelah worker selesai memproses event, worker harus mengirimkan konfirmasi `XACK`. Jika worker mengalami crash sebelum mengirim `XACK`, event tersebut akan tetap berada di dalam **Pending Entries List (PEL)** sehingga dapat diklaim dan diproses ulang oleh worker lain menggunakan perintah `XCLAIM`.
''',
                'explanationEn': '''When Node.js applications scale across clustered containers in the cloud, distributed event routing tiers become mandatory to coordinate workloads across nodes.

### Redis Pub/Sub vs Redis Streams
- **Redis Pub/Sub**: Operates on a *fire-and-forget* principle. If a subscriber experiences momentary network blips or container restarts, transmitted messages vanish irrecoverably. Suited for real-time ephemeral notifications or cache invalidation signals.
- **Redis Streams**: Acts as an append-only durable commit log modeled after Apache Kafka. Messages receive chronological timestamped IDs. Disconnected workers recover missed events upon reconnecting.

### Consumer Groups Architecture
**Consumer Groups** allow clusters of worker pods to divide stream ingestion dynamically. Redis guarantees that each discrete event within a consumer group is routed exclusively to a single active worker, establishing native horizontal load balancing.

### Delivery Guarantees: XACK & The PEL
Upon completing work, consumers issue an `XACK` acknowledgment. If a worker pod crashes mid-computation, the unacknowledged event remains inside the **Pending Entries List (PEL)**, allowing healthy peer workers to adopt and process it via `XCLAIM`.
''',
                'beginnerId': '''Bayangkan siaran radio FM (Redis Pub/Sub). Jika Anda mematikan radio mobil Anda selama 5 menit, Anda melewatkan lagu yang sedang diputar dan tidak bisa mendengarkannya lagi. Bandingkan dengan playlist Spotify (Redis Streams): lagu tersimpan rapi dalam daftar antrean, dan Anda bisa menekan pause atau mendengarkannya kapan pun Anda siap.''',
                'beginnerEn': '''Think of broadcast FM radio (Redis Pub/Sub). If you turn off your car radio for five minutes, you miss whatever song aired and cannot retrieve it. In contrast, consider a queued Spotify playlist (Redis Streams): every track is durably cataloged, allowing you to pause, resume, or replay whenever you are ready.''',
                'experimentsId': [
                    'Ubah perintah `count` pada `xreadgroup` menjadi 1 dan amati bagaimana pesan didistribusikan satu per satu.',
                    'Simulasikan worker yang crash tanpa memanggil ack dan periksa daftar pending entries.',
                    'Gunakan Redis Pub/Sub (`PUBLISH` dan `SUBSCRIBE`) untuk membandingkan karakteristik latensi dengan Streams.',
                ],
                'experimentsEn': [
                    'Adjust the `count` parameter in `xreadgroup` to 1 and inspect granular distribution behavior.',
                    'Simulate an unacknowledged worker failure and audit the pending entries list.',
                    'Deploy Redis Pub/Sub (`PUBLISH`/`SUBSCRIBE`) and compare latency characteristics against Streams.',
                ],
                'challengeId': 'Bangun worker pemulih `recoverPendingTasks(streamKey, groupName, minIdleTimeMs)` yang secara berkala memeriksa event yang menggantung di PEL dan mengklaimnya kembali untuk diproses.',
                'challengeEn': 'Author a `recoverPendingTasks(streamKey, groupName, minIdleTimeMs)` worker that periodically inspects stalled entries in the PEL, reclaiming them for completion.',
                'summaryId': 'Kamu telah menguasai Redis Streams, Consumer Groups, dan jaminan pengiriman pesan. Minggu depan kita membangun server WebSocket skala besar dengan heartbeat.',
                'summaryEn': 'You have mastered Redis Streams, Consumer Groups, and delivery guarantees. Next week we construct high-scale WebSocket servers with heartbeats.',
            },

            # Week 7
            {
                'week': 7,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'websockets-heartbeat-auth',
                'titleId': 'Komunikasi Real-Time: WebSockets (ws), Token Auth & Heartbeat Ping/Pong',
                'titleEn': 'Real-Time Communication: WebSockets (ws), Token Auth & Heartbeat Ping/Pong',
                'programId': 'Gateway WebSocket Telemetri dengan Deteksi Koneksi Zombie & Heartbeat',
                'programEn': 'Telemetry WebSocket Gateway with Zombie Connection Detection & Heartbeat',
                'language': 'javascript',
                'code': '''// Arsitektur WebSocket Server Berkecepatan Tinggi (Menggunakan pustaka 'ws')
import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

console.log('=== WEBSOCKET TELEMETRY GATEWAY AKTIF DI PORT 8080 ===');

// Pool Klien Terkoneksi
const clients = new Map();

// 1. Heartbeat Ping-Pong Interval (Pembersih Koneksi Zombie)
const heartbeatInterval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      console.log(`[ZOMBIE DETECTED] Menghentikan koneksi mati untuk client: ${clients.get(ws)?.clientId}`);
      clients.delete(ws);
      return ws.terminate();
    }

    // Tandai false dan kirim Ping; client harus membalas Pong untuk mereset ke true
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('close', () => clearInterval(heartbeatInterval));

// 2. Koneksi Masuk & Autentikasi
wss.on('connection', (ws, req) => {
  // Ekstrak token dari query string: ws://localhost:8080?token=SECRET_KEY_99
  const url = new URL(req.url, 'http://localhost:8080');
  const token = url.searchParams.get('token');

  if (token !== 'GATEWAY_SECRET_2026') {
    ws.send(JSON.stringify({ error: 'UNAUTHORIZED: Token invalid!' }));
    return ws.close(1008, 'Policy Violation');
  }

  const clientId = `CLI-${Math.floor(Math.random() * 10000)}`;
  ws.isAlive = true;
  clients.set(ws, { clientId, connectedAt: Date.now() });

  console.log(`[CLIENT CONNECTED] ${clientId} berhasil terautentikasi.`);
  ws.send(JSON.stringify({ event: 'CONNECTED', clientId, message: 'Selamat datang di Tryngo Gateway' }));

  // Handler Pong Heartbeat
  ws.on('pong', () => {
    ws.isAlive = true;
  });

  // Handler Pesan Masuk
  ws.on('message', (data, isBinary) => {
    const messageText = isBinary ? data : data.toString();
    console.log(`[MESSAGE RECEIVED] Dari ${clientId}:`, messageText);

    // Broadcast pesan ke seluruh client aktif lainnya
    for (const [clientWs, meta] of clients.entries()) {
      if (clientWs !== ws && clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(JSON.stringify({ from: clientId, payload: messageText }));
      }
    }
  });

  ws.on('close', () => {
    console.log(`[CLIENT DISCONNECTED] ${clientId} keluar.`);
    clients.delete(ws);
  });
});
''',
                'objectivesId': [
                    'Menguasai protokol WebSocket (RFC 6455) dan handshake upgrade dari HTTP.',
                    'Menerapkan autentikasi koneksi WebSocket menggunakan token atau cookie aman.',
                    'Membangun mekanisme Heartbeat Ping/Pong untuk mendeteksi dan membersihkan koneksi mati (Zombie Connections).',
                    'Mengoptimalkan penyiaran pesan (broadcasting) ke ribuan klien secara efisien.',
                ],
                'objectivesEn': [
                    'Master the WebSocket protocol (RFC 6455) and HTTP connection upgrade mechanics.',
                    'Implement secure WebSocket authentication via tokens or validated cookies.',
                    'Build Heartbeat Ping/Pong mechanisms detecting and purging stalled zombie connections.',
                    'Optimize high-frequency event broadcasting across thousands of connected clients.',
                ],
                'explanationId': '''HTTP bersifat stateless (request-response). Namun untuk dasbor live telemetri, kolaborasi dokumen real-time, atau notifikasi kilat, klien dan server membutuhkan koneksi dua arah (bi-directional) berlatensi sangat rendah yang tetap terbuka secara terus-menerus: **WebSocket**.

### Handshake HTTP Upgrade
Koneksi WebSocket dimulai dengan request HTTP standar yang memuat header:
`Connection: Upgrade`
`Upgrade: websocket`
Jika server menerima, koneksi TCP di-*upgrade* menjadi socket biner dua arah penuh tanpa overhead header HTTP berulang pada setiap pengiriman data.

### Bahaya Koneksi Zombie
Di dunia nyata, pengguna mobile sering melewati terowongan, baterai ponsel habis, atau kabel LAN tiba-tiba dicabut tanpa mengirimkan frame penutupan TCP (FIN/RST). Jika server tidak memantau, koneksi tersebut akan tetap menggantung di memori server selamanya sebagai **Zombie Connection**, memakan kuota file descriptor dan RAM.

### Pola Heartbeat Ping/Pong
Protokol WebSocket memiliki opcode khusus: `Ping (0x9)` dan `Pong (0xA)`. Setiap 30 detik, server mengirim Ping ke klien. Jika klien tidak merespons dengan Pong sebelum interval berikutnya, server memanggil `ws.terminate()` untuk membebaskan soket dan memori secara instan.
''',
                'explanationEn': '''Standard HTTP operates as a request-response protocol. For live telemetry streams, multiplayer state replication, and instant push notifications, systems require persistent, low-latency, bidirectional connections: **WebSockets**.

### HTTP Upgrade Handshakes
WebSockets originate via a standard HTTP handshake presenting:
`Connection: Upgrade`
`Upgrade: websocket`
Upon validation, the TCP socket upgrades into a continuous bidirectional stream, omitting repetitive HTTP header overhead on subsequent frames.

### The Threat of Zombie Connections
Mobile devices frequently lose cellular signal, experience battery depletion, or disconnect without transmitting TCP teardown packets (FIN/RST). Without active health probes, these connections stall inside server memory as **Zombie Connections**, exhausting file descriptors and socket pools.

### The Heartbeat Ping/Pong Pattern
The WebSocket specification reserves native control opcodes: `Ping (0x9)` and `Pong (0xA)`. Servers emit periodic Ping frames. If a client fails to return a matching Pong before the subsequent heartbeat tick, the server invokes `ws.terminate()`, releasing OS socket resources immediately.
''',
                'beginnerId': '''Bayangkan Anda sedang berbicara lewat telepon dengan teman. Jika teman Anda tiba-tiba masuk ke dalam lift dan sinyalnya hilang tanpa mematikan telepon, Anda akan terus berbicara sendiri ke layar telepon yang hening (Zombie Connection). Untuk mengetahuinya, setiap 30 detik Anda bertanya: "Kamu masih di situ?" (Ping). Jika teman Anda tidak menjawab "Ya, masih!" (Pong), Anda langsung mematikan sambungan telepon.''',
                'beginnerEn': '''Imagine speaking on a phone call. If your friend drives into an underground tunnel and loses service without hanging up, you continue talking to a silent line (Zombie Connection). To verify, every 30 seconds you ask: "Are you still there?" (Ping). If they do not respond "Yes!" (Pong), you hang up the receiver.''',
                'experimentsId': [
                    'Hubungkan klien WebSocket via browser `const ws = new WebSocket("ws://localhost:8080?token=GATEWAY_SECRET_2026")`.',
                    'Coba hubungkan klien dengan token salah dan perhatikan kode penutupan 1008 (Policy Violation).',
                    'Matikan WiFi komputer klien dan amati bagaimana server mendeteksi zombie connection setelah 30 detik.',
                ],
                'experimentsEn': [
                    'Connect a WebSocket client via browser dev tools `const ws = new WebSocket("ws://localhost:8080?token=GATEWAY_SECRET_2026")`.',
                    'Connect with an invalid token and observe the connection closure with code 1008 (Policy Violation).',
                    'Disconnect the client network abruptly and observe the server purging the zombie socket after 30 seconds.',
                ],
                'challengeId': 'Implementasikan sistem Channel Subscription: izinkan klien mengirim pesan `{ action: "SUBSCRIBE", channel: "telemetry:room_1" }` dan pastikan broadcast hanya dikirimkan ke subscriber channel yang relevan.',
                'challengeEn': 'Implement a Channel Subscription subsystem: allow clients to submit `{ action: "SUBSCRIBE", channel: "telemetry:room_1" }`, restricting broadcasts solely to verified channel subscribers.',
                'summaryId': 'Kamu telah menguasai WebSockets, autentikasi handshake, dan pembersihan zombie dengan heartbeat. Level 2 selesai! Di Level 3 kita mempelajari V8 Memory Profiling, Security Hardening, dan Gateway Capstone.',
                'summaryEn': 'You have mastered WebSockets, handshake auth, and heartbeat zombie purging. Level 2 complete! Level 3 covers V8 Memory Profiling, Security Hardening, and our Gateway Capstone.',
            },

            # Week 8
            {
                'week': 8,
                'level': 'advanced',
                'levelNameId': 'Lanjutan',
                'levelNameEn': 'Advanced',
                'topicId': 'memory-leaks-diagnostic-profiling',
                'titleId': 'Diagnostik V8: Memory Leaks, Event Listener Leaks & Heap Snapshots',
                'titleEn': 'V8 Diagnostics: Memory Leaks, Event Listener Leaks & Heap Snapshots',
                'programId': 'Detektor Kebocoran Memori & Pemicu Heap Snapshot Otomatis di Node.js',
                'programEn': 'Memory Leak Detector & Automated Heap Snapshot Trigger in Node.js',
                'language': 'javascript',
                'code': '''import v8 from 'node:v8';
import fs from 'node:fs/promises';
import { EventEmitter } from 'node:events';

class MemoryDiagnosticsEngine {
  constructor(thresholdMb = 150) {
    this.thresholdMb = thresholdMb;
    this.globalEmitter = new EventEmitter();
    this.leakyStorage = []; // Koleksi berpotensi memory leak
  }

  // Simulasi Bug Klasik: Mendaftarkan closure ke global emitter tanpa pernah di-unsubscribe
  simulateListenerLeak(sensorData) {
    const heavyPayload = new Array(1000).fill(`SENSOR_PAYLOAD_${sensorData.id}`);

    const handler = () => {
      // Closure menahan referensi ke heavyPayload dan sensorData di memori
      console.log('Handler terpanggil:', heavyPayload.length);
    };

    this.globalEmitter.on('telemetry_tick', handler);
    // Masalah: jika handler tidak pernah di `.off()`, memori tidak akan pernah dibersihkan GC!
  }

  checkMemoryAndSnapshot() {
    const memoryUsage = process.memoryUsage();
    const heapUsedMb = (memoryUsage.heapUsed / 1024 / 1024).toFixed(2);
    const rssMb = (memoryUsage.rss / 1024 / 1024).toFixed(2);

    console.log(`[MEMORY AUDIT] Heap Used: ${heapUsedMb} MB | RSS: ${rssMb} MB | Total Listeners: ${this.globalEmitter.listenerCount('telemetry_tick')}`);

    if (memoryUsage.heapUsed > this.thresholdMb * 1024 * 1024) {
      console.warn(`[ALERT] Penggunaan Heap (${heapUsedMb} MB) melampaui batas ambang (${this.thresholdMb} MB)!`);
      this.triggerHeapSnapshot();
    }
  }

  triggerHeapSnapshot() {
    console.log('[DIAGNOSTIC] Menghasilkan V8 Heap Snapshot ke disk untuk investigasi Chrome DevTools...');
    const snapshotStream = v8.getHeapSnapshot();
    const fileName = `heap-${Date.now()}.heapsnapshot`;

    // Mengalirkan snapshot langsung ke disk
    import('node:fs').then(fsSync => {
      const fileStream = fsSync.createWriteStream(fileName);
      snapshotStream.pipe(fileStream);
      fileStream.on('finish', () => console.log(`[HEAP SNAPSHOT SAVED]: ${fileName}`));
    });
  }
}

// Eksekusi Demonstrasi
const engine = new MemoryDiagnosticsEngine(50); // Threshold rendah untuk pengujian

console.log('=== MEMULAI SIMULASI KEBOCORAN MEMORI V8 ===');
for (let i = 1; i <= 20; i++) {
  engine.simulateListenerLeak({ id: `SNS-${i}` });
}

engine.checkMemoryAndSnapshot();
''',
                'objectivesId': [
                    'Memahami cara kerja V8 Garbage Collector (Generational GC: Scavenge vs Mark-Sweep-Compact).',
                    'Mengidentifikasi 3 penyebab utama memory leak di Node.js: Global variables, Unhandled Closures, dan Dangling Event Listeners.',
                    'Menggunakan `v8.getHeapSnapshot()` untuk menghasilkan file snapshot yang dapat dianalisis di Chrome DevTools.',
                    'Memantau metrik memori proses: `heapUsed`, `heapTotal`, `rss`, dan `external`.',
                ],
                'objectivesEn': [
                    'Understand V8 Garbage Collection mechanics (Generational GC: Scavenge vs Mark-Sweep-Compact).',
                    'Identify primary Node.js memory leak causes: Global variables, Unreleased Closures, and Dangling Event Listeners.',
                    'Deploy `v8.getHeapSnapshot()` to export snapshot files inspectable inside Chrome DevTools.',
                    'Monitor runtime memory metrics: `heapUsed`, `heapTotal`, `rss`, and `external`.',
                ],
                'explanationId': '''Dalam lingkungan cloud production (Kubernetes/Docker), server yang mengalami kebocoran memori (memory leak) akan terus membengkak hingga akhirnya dimatikan secara paksa oleh sistem operasi (OOMKilled - Out Of Memory Kill).

### Cara Kerja V8 Garbage Collector
Mesin V8 membagi memori menjadi dua generasi utama:
1. **Young Generation (New Space)**: Objek baru yang berumur pendek dibersihkan dengan algoritma *Scavenge* yang sangat cepat.
2. **Old Generation (Old Space)**: Objek yang bertahan dari beberapa siklus GC dipindahkan ke Old Space dan dibersihkan dengan algoritma *Mark-Sweep-Compact* yang lebih berat.

### Bahaya Dangling Event Listeners
Penyebab memory leak nomor satu di Node.js adalah mendaftarkan listener pada objek global (`emitter.on('event', callback)`) tanpa pernah memanggil `.removeListener()` atau `.off()` saat koneksi ditutup. Fungsi callback menyimpan variabel-variabel di sekitarnya dalam **Closure Scope**, mencegah V8 membebaskan objek-objek tersebut dari RAM.

### Menggunakan Heap Snapshots
Dengan modul bawaan `node:v8`, kita dapat menghasilkan file `.heapsnapshot` saat memori server melonjak. File ini dapat dibuka langsung di browser Google Chrome (tab DevTools -> Memory -> Load Profile) untuk melihat objek mana yang menahan alokasi memori terbesar (Retainers Tree).
''',
                'explanationEn': '''In containerized cloud environments (Kubernetes), services harboring memory leaks inflate progressively until terminated by kernel OOM killers (`OOMKilled - Exit Code 137`).

### The V8 Garbage Collection Engine
V8 segregates memory into two distinct generations:
1. **Young Generation (New Space)**: Short-lived object allocations, harvested rapidly via the *Scavenge* algorithm.
2. **Old Generation (Old Space)**: Surviving long-lived objects migrate here, harvested via thorough *Mark-Sweep-Compact* cycles.

### The Menace of Dangling Event Listeners
The primary culprit behind Node.js memory leaks is attaching listener callbacks to long-lived singletons (`emitter.on('event', callback)`) without unbinding them via `.off()` upon client disconnection. Closures retain references to parent lexical scopes, preventing garbage collector sweeps.

### Chrome DevTools Heap Snapshots
Leveraging `node:v8`, applications snapshot heap allocations when thresholds breach. Developers open the `.heapsnapshot` profile inside Chrome DevTools (Memory tab) to inspect the Retainers Graph and pinpoint retaining object references.
''',
                'beginnerId': '''Bayangkan Anda menyewa kamar kos. Setiap kali ada tamu datang, Anda menempelkan foto tamu tersebut di dinding kamar (Event Listener). Jika tamu sudah pulang tetapi fotonya tidak pernah Anda lepas dari dinding, lama-kelamaan kamar kos Anda penuh sesak dengan jutaan lembar foto sampai Anda tidak bisa bergerak dan pemilik kos mengusir Anda keluar (OOM Kill).''',
                'beginnerEn': '''Imagine renting an apartment. Every time a visitor stops by, you pin their framed photograph to your bedroom wall (Event Listener). If guests leave but you never unpin the frames, the room fills with thousands of photo frames until you run out of breathing room and get evicted (OOM Kill).''',
                'experimentsId': [
                    'Tambahkan method `.off("telemetry_tick", handler)` dan buktikan jumlah listener berkurang kembali ke 0.',
                    'Buka file `.heapsnapshot` yang dihasilkan di Chrome DevTools dan cari kelas `MemoryDiagnosticsEngine`.',
                    'Gunakan flag Node.js `--max-old-space-size=64` untuk menguji perilaku OOM pada memori terbatas.',
                ],
                'experimentsEn': [
                    'Add `.off("telemetry_tick", handler)` logic and verify the listener count drops back to 0.',
                    'Load the exported `.heapsnapshot` file inside Chrome DevTools and locate the `MemoryDiagnosticsEngine` constructor.',
                    'Launch Node.js with `--max-old-space-size=64` to simulate OOM boundaries under constrained heap limits.',
                ],
                'challengeId': 'Buat middleware pendeteksi kebocoran memori otomatis yang membandingkan `process.memoryUsage().heapUsed` sebelum dan sesudah 1.000 HTTP request diproses, mencatat warning jika memori terus naik secara monoton.',
                'challengeEn': 'Build an automated memory leak detection middleware sampling `process.memoryUsage().heapUsed` across 1,000 HTTP cycles, alerting if consumption increases monotonically.',
                'summaryId': 'Kamu telah menguasai diagnostik memori V8, analisis Retainers, dan Heap Snapshots. Minggu depan kita mempelajari Security Hardening, Rate Limiting, dan Graceful Shutdown.',
                'summaryEn': 'You have mastered V8 memory diagnostics, Retainer graphs, and Heap Snapshots. Next week we cover Security Hardening, Rate Limiting, and Graceful Shutdown.',
            },

            # Week 9
            {
                'week': 9,
                'level': 'advanced',
                'levelNameId': 'Lanjutan',
                'levelNameEn': 'Advanced',
                'topicId': 'security-hardening-rate-limiting',
                'titleId': 'Security Hardening: Rate Limiting, Header Security & Graceful Shutdown',
                'titleEn': 'Security Hardening: Rate Limiting, Header Security & Graceful Shutdown',
                'programId': 'Stack Pertahanan API Gateway Node.js dengan Token Bucket & Graceful Teardown',
                'programEn': 'Node.js API Gateway Defense Stack with Token Bucket & Graceful Teardown',
                'language': 'javascript',
                'code': '''import http from 'node:http';

// 1. In-Memory Token Bucket Rate Limiter
class TokenBucketRateLimiter {
  constructor(capacity = 5, refillRatePerSec = 1) {
    this.capacity = capacity;
    this.refillRate = refillRatePerSec;
    this.buckets = new Map();
  }

  isAllowed(clientId) {
    const now = Date.now();
    let bucket = this.buckets.get(clientId);

    if (!bucket) {
      bucket = { tokens: this.capacity, lastRefill: now };
      this.buckets.set(clientId, bucket);
    } else {
      // Tambahkan token berdasarkan waktu yang telah berlalu
      const elapsedSec = (now - bucket.lastRefill) / 1000;
      bucket.tokens = Math.min(this.capacity, bucket.tokens + elapsedSec * this.refillRate);
      bucket.lastRefill = now;
    }

    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;
      return true;
    }
    return false;
  }
}

const rateLimiter = new TokenBucketRateLimiter(3, 1); // 3 token, isi ulang 1 token/detik

// 2. Server HTTP dengan Security Headers (Mirip modul Helmet)
const server = http.createServer((req, res) => {
  const clientIp = req.socket.remoteAddress || '127.0.0.1';

  // Terapkan Security Headers Penting
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  // Periksa Rate Limiting
  if (!rateLimiter.isAllowed(clientIp)) {
    res.writeHead(429, { 'Content-Type': 'application/json', 'Retry-After': '2' });
    return res.end(JSON.stringify({ error: 'TOO_MANY_REQUESTS', message: 'Rate limit terlampaui. Harap tunggu.' }));
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'OK', message: 'Akses gateway diizinkan' }));
});

// 3. Graceful Shutdown Handlers (Mencegah Pemutusan Paksa Saat Deployment)
function setupGracefulShutdown(serverInstance) {
  const signals = ['SIGTERM', 'SIGINT'];

  signals.forEach((signal) => {
    process.on(signal, () => {
      console.log(`\\n[SIGNAL RECEIVED: ${signal}] Memulai proses Graceful Shutdown...`);

      // Berhenti menerima koneksi baru
      serverInstance.close(() => {
        console.log('[HTTP SERVER CLOSED] Seluruh koneksi HTTP aktif telah diselesaikan.');
        // Tutup koneksi database / Redis di sini
        console.log('[RESOURCES RELEASED] Database pool & socket terputus bersih.');
        process.exit(0);
      });

      // Paksa shutdown jika proses tersangkut melebihi 10 detik
      setTimeout(() => {
        console.error('[FORCE EXIT] Waktu timeout shutdown habis. Memaksa proses keluar.');
        process.exit(1);
      }, 10000).unref();
    });
  });
}

setupGracefulShutdown(server);
console.log('=== GATEWAY DEFENSE STACK INITIALIZED (RATE LIMITER & SECURITY HEADERS) ===');
''',
                'objectivesId': [
                    'Mengamankan header HTTP menggunakan standar Helmet (`X-Content-Type-Options`, CSP, HSTS).',
                    'Mengimplementasikan algoritma Rate Limiting: Token Bucket vs Leaky Bucket.',
                    'Menangani sinyal terminasi OS (`SIGTERM`, `SIGINT`) untuk Graceful Shutdown tanpa menjatuhkan koneksi klien aktif.',
                    'Menggunakan `unref()` pada timer darurat agar tidak menahan proses Node.js keluar.',
                ],
                'objectivesEn': [
                    'Harden HTTP headers conforming to Helmet security standards (CSP, HSTS, `X-Content-Type-Options`).',
                    'Implement rate-limiting algorithms: Token Bucket versus Leaky Bucket.',
                    'Handle OS termination signals (`SIGTERM`, `SIGINT`) executing graceful connection draining.',
                    'Deploy `unref()` on fallback shutdown timeouts preventing event loop hanging.',
                ],
                'explanationId': '''Aplikasi backend yang berjalan di jaringan publik rentan terhadap serangan DDoS, injeksi skrip berbahaya, dan kehilangan data saat proses deployment berlangsung.

### Security Headers Penting
- `X-Content-Type-Options: nosniff`: Mencegah browser menebak (MIME-sniffing) tipe file, memblokir eksekusi skrip berbahaya yang menyamar sebagai gambar.
- `Content-Security-Policy (CSP)`: Membatasi dari domain mana saja skrip, font, dan iframe boleh dimuat, mematikan serangan Cross-Site Scripting (XSS).
- `Strict-Transport-Security (HSTS)`: Memaksa browser hanya menggunakan koneksi HTTPS terenkripsi.

### Algoritma Token Bucket Rate Limiting
Daripada menggunakan fixed window (yang rentan terhadap lonjakan request di pergantian detik), **Token Bucket** memberikan fleksibilitas: pengguna memiliki kapasitas token tertentu untuk menangani lonjakan sesaat (bursts), namun rata-rata konsumsi request jangka panjang dibatasi oleh laju isi ulang token per detik.

### Graceful Shutdown di Kubernetes
Saat Kubernetes melakukan rolling update aplikasi, orchestrator mengirim sinyal `SIGTERM` ke pod. Jika aplikasi langsung mati seketika, ribuan request pengguna yang sedang berlangsung akan putus di tengah jalan (502 Bad Gateway). Dengan graceful shutdown:
1. Server berhenti menerima request baru (`server.close()`).
2. Server menyelesaikan semua request yang sedang diproses.
3. Seluruh koneksi database dan Redis ditutup secara teratur sebelum proses keluar dengan status code 0.
''',
                'explanationEn': '''Public-facing backend applications constantly withstand distributed DDoS surges, cross-site script injections, and dropped client transactions during cluster rolling deployments.

### Critical Security Headers
- `X-Content-Type-Options: nosniff`: Inhibits browser MIME-sniffing, preventing executable scripts disguised as media uploads.
- `Content-Security-Policy (CSP)`: Enforces strict origin boundaries for scripts, stylesheets, and frames, neutralizing Cross-Site Scripting (XSS).
- `Strict-Transport-Security (HSTS)`: Compels clients to interact exclusively via encrypted HTTPS channels.

### Token Bucket Rate Limiting Mechanics
Unlike rigid fixed-window counters, the **Token Bucket** algorithm accommodates legitimate bursts: clients draw down accumulated tokens during traffic spikes while bounding sustainable long-term request rates via steady refill intervals.

### Graceful Shutdown in Cloud Orchestration
During rolling deployments, Kubernetes signals pods with `SIGTERM`. Abrupt process termination causes inflight HTTP calls to drop abruptly, generating 502 Bad Gateway errors. Graceful teardowns:
1. Cease accepting new inbound connections (`server.close()`).
2. Drain and complete all inflight requests.
3. Disconnect database pools and Redis sockets cleanly before exiting with code 0.
''',
                'beginnerId': '''Bayangkan sebuah kafe yang ingin tutup jam 10 malam. Penjaga kafe membalik tanda di pintu menjadi "TUTUP" (server.close) agar tamu baru tidak masuk. Namun, tamu yang masih duduk makan di dalam kafe dipersilakan menghabiskan makanannya sampai selesai sebelum lampu kafe benar-benar dimatikan (Graceful Shutdown).''',
                'beginnerEn': '''Imagine a cafe closing at 10 PM. The host flips the door sign to "CLOSED" (server.close) so no new patrons enter. However, customers already seated at tables are permitted to finish their meals and desserts comfortably before the kitchen turns off the lights (Graceful Shutdown).''',
                'experimentsId': [
                    'Kirim 5 request HTTP secara beruntun dalam 1 detik dan amati respons 429 Too Many Requests.',
                    'Kirim sinyal `process.emit("SIGINT")` dan amati urutan penutupan graceful shutdown di console.',
                    'Periksa header respons menggunakan `curl -I http://localhost:3000` untuk memvalidasi security headers.',
                ],
                'experimentsEn': [
                    'Issue 5 consecutive HTTP calls in 1 second and observe the 429 Too Many Requests payload.',
                    'Emit a simulated `process.emit("SIGINT")` and trace the clean shutdown logs in the console.',
                    'Audit response headers via `curl -I http://localhost:3000` to verify security headers.',
                ],
                'challengeId': 'Integrasikan rate limiter berbasis Redis (`INCR` dan `EXPIRE`) sehingga kuota request dibagikan secara konsisten ke seluruh instance container yang berjalan paralel.',
                'challengeEn': 'Integrate a Redis-backed rate limiter (`INCR` and `EXPIRE`) sharing request quotas consistently across multi-pod container clusters.',
                'summaryId': 'Kamu telah menguasai Security Headers, Token Bucket Rate Limiting, dan Graceful Shutdown. Minggu depan adalah Capstone Final: Gateway Telemetri & Notifikasi Real-Time Skala Tinggi!',
                'summaryEn': 'You have mastered Security Headers, Token Bucket Rate Limiting, and Graceful Shutdown. Next week is our Final Capstone: High-Throughput Real-Time Telemetry & Notification Gateway!',
            },

            # Week 10
            {
                'week': 10,
                'level': 'advanced',
                'levelNameId': 'Lanjutan',
                'levelNameEn': 'Advanced',
                'topicId': 'capstone-event-gateway',
                'titleId': 'Capstone: Gateway Notifikasi & Aliran Event Kolaboratif Real-Time Production-Ready',
                'titleEn': 'Capstone: Production-Ready Real-Time Collaborative Event Stream & Notification Gateway',
                'programId': 'Gateway Telemetri Lengkap (FastAPI/Node.js, WebSocket Hub, Redis Stream Pipeline & Heartbeat)',
                'programEn': 'Complete Telemetry Gateway (Fastify/Node.js, WebSocket Hub, Redis Stream Pipeline & Heartbeat)',
                'language': 'javascript',
                'code': '''// Node.js 22 LTS Production Gateway Capstone Architecture
import http from 'node:http';
import { WebSocketServer, WebSocket } from 'ws';

// 1. HTTP Ingestion Server & WebSocket Server Hybrid
const server = http.createServer((req, res) => {
  // CORS & Security Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method === 'POST' && req.url === '/api/v1/events') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const eventData = JSON.parse(body);
        const enrichedEvent = {
          eventId: `EVT-${Date.now()}`,
          ...eventData,
          receivedAt: new Date().toISOString()
        };

        // Siarkan event yang masuk secara instan ke seluruh client WebSocket
        broadcastToWebSockets(enrichedEvent);

        res.writeHead(202, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'QUEUED', eventId: enrichedEvent.eventId }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'BAD_REQUEST', message: 'Payload JSON invalid.' }));
      }
    });
  } else if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'UP', connectedClients: wss.clients.size }));
  } else {
    res.writeHead(404);
    res.end();
  }
});

// 2. WebSocket Hub
const wss = new WebSocketServer({ server });

function broadcastToWebSockets(payload) {
  const jsonStr = JSON.stringify(payload);
  let deliveredCount = 0;

  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(jsonStr);
      deliveredCount++;
    }
  }
  console.log(`[BROADCAST EVENT] Disiarkan ke ${deliveredCount} subscriber aktif:`, payload.eventId);
}

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', () => { ws.isAlive = true; });
  console.log('[WS CONNECTED] Klien baru terhubung. Total klien:', wss.clients.size);

  ws.send(JSON.stringify({ type: 'WELCOME', message: 'Terhubung ke Tryngo Real-Time Event Gateway' }));
});

// Heartbeat Liveness Monitor
const heartbeatTimer = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 15000);

// Graceful Teardown
process.on('SIGTERM', () => {
  console.log('[GATEWAY SHUTDOWN] Menutup WebSocket dan server HTTP...');
  clearInterval(heartbeatTimer);
  wss.close();
  server.close(() => {
    console.log('[GATEWAY CLOSED] Teardown selesai dengan aman.');
    process.exit(0);
  });
});

console.log('=== TRYNGO REAL-TIME EVENT STREAM GATEWAY BERHASIL DIINISIALISASI ===');
''',
                'objectivesId': [
                    'Mengintegrasikan seluruh ekosistem: HTTP Ingestion, WebSocket Broadcasting, Heartbeat, dan Graceful Shutdown.',
                    'Membangun arsitektur Pub/Sub bi-directional berkecepatan tinggi.',
                    'Menerapkan pola Asynchronous Ingestion (`HTTP 202 Accepted`) untuk pemrosesan event throughput tinggi.',
                    'Menyiapkan service Node.js enterprise yang siap di-deploy pada klaster Kubernetes / Docker.',
                ],
                'objectivesEn': [
                    'Integrate the complete ecosystem: HTTP Ingestion, WebSocket Broadcasting, Heartbeats, and Graceful Shutdown.',
                    'Build high-throughput bidirectional Pub/Sub gateways.',
                    'Implement Asynchronous Ingestion (`HTTP 202 Accepted`) for extreme event volumes.',
                    'Prepare enterprise Node.js services ready for Docker and Kubernetes cluster deployments.',
                ],
                'explanationId': '''Selamat! Anda telah mencapai proyek Capstone akhir kurikulum Node.js Backend. Gateway ini menyatukan semua kemampuan runtime Node.js 22 LTS ke dalam satu platform perutean notifikasi dan event real-time yang tangguh, hemat memori, dan berskala tinggi.

### Arsitektur Terpadu HTTP & WebSockets
Aplikasi ini menjalankan server HTTP dan WebSocket pada satu port jaringan TCP yang sama menggunakan event `upgrade`. Endpoint HTTP `/api/v1/events` menerima lonjakan event dari microservices lain, langsung mengembalikan respons `202 Accepted`, dan menyiarkan event tersebut ke ratusan browser atau perangkat mobile secara instan melalui WebSocket.

### Ketahanan Produksi (Resilience)
Gateway dilengkapi dengan timer heartbeat terotomatisasi yang membersihkan koneksi zombie setiap 15 detik, header keamanan nosniff, serta penanganan sinyal OS `SIGTERM` yang memastikan proses pembaruan aplikasi di Kubernetes berjalan mulus tanpa downtime (Zero-Downtime Deployment).
''',
                'explanationEn': '''Congratulations! You have reached the Capstone project. This application synthesizes modern Node.js 22 LTS engineering paradigms into a resilient, high-throughput, production-ready real-time event stream and notification gateway.

### Hybrid HTTP & WebSocket Architecture
The service unifies HTTP ingestion and WebSocket multiplexing over a single TCP socket via native `upgrade` interception. Inbound event bursts to `/api/v1/events` yield immediate `202 Accepted` receipts before broadcasting data frames to connected browser dashboards instantaneously.

### Production Resilience
The gateway enforces automated 15-second heartbeat intervals purging stalled zombie sockets, applies nosniff security headers, and orchestrates clean `SIGTERM` connection draining ensuring zero-downtime rolling deployments in Kubernetes.
''',
                'beginnerId': '''Proyek ini ibarat menara pemancar radio pusat kota. Stasiun pemadam kebakaran, polisi, dan rumah sakit mengirim berita mendesak ke menara lewat jalur telepon khusus (HTTP Ingestion). Menara pemancar langsung menyiarkan berita tersebut dalam sekejap mata ke ribuan radio mobil di seluruh kota (WebSocket Broadcast) tanpa ada jeda sedikit pun.''',
                'beginnerEn': '''This project mirrors a metropolitan emergency radio broadcast tower. Police, paramedics, and firefighters report incident dispatches over dedicated priority hotlines (HTTP Ingestion). The tower instantaneously broadcasts the dispatches over the airwaves to thousands of patrol vehicles across the city (WebSocket Broadcast).''',
                'experimentsId': [
                    'Kirim payload POST ke `/api/v1/events` menggunakan cURL dan amati pesan broadcast diterima seketika di console client.',
                    'Kirim sinyal `kill -SIGTERM` pada process ID dan amati proses penutupan gateway yang bersih.',
                    'Buka endpoint `/health` untuk memantau jumlah klien WebSocket yang aktif secara real-time.',
                ],
                'experimentsEn': [
                    'Dispatch a POST payload to `/api/v1/events` via cURL and observe the broadcast frame arriving at client terminals.',
                    'Trigger a `kill -SIGTERM` signal and inspect the clean graceful teardown sequence.',
                    'Navigate to `/health` to audit connected WebSocket socket counts in real time.',
                ],
                'challengeId': 'Tambahkan integrasi Redis Streams Publisher di dalam gateway: setiap event yang masuk otomatis disimpan ke stream `gateway:events` di Redis sebelum disiarkan ke WebSocket.',
                'challengeEn': 'Add a Redis Streams Publisher integration: every ingested event is committed to a Redis `gateway:events` stream before broadcasting over WebSockets.',
                'summaryId': 'Selamat! Kamu telah menyelesaikan seluruh kurikulum Node.js Backend dari nol hingga gateway notifikasi dan streaming event berskala produksi!',
                'summaryEn': 'Congratulations! You have completed the entire Node.js Backend curriculum from zero to an enterprise production event and notification gateway!',
            },
        ]
    }
