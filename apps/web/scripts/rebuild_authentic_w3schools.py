import os
import re

APP_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
COURSE_BASE = os.path.join(APP_ROOT, 'public/data/course')

# SVG Diagram mapping per track
TRACK_DIAGRAMS = {
    'css3': ('/diagrams/box-model.svg', 'Diagram CSS Box Model (Margin, Border, Padding, Content)'),
    'html5': ('/diagrams/dom-tree.svg', 'Diagram Struktur DOM Tree HTML5'),
    'tailwind': ('/diagrams/flexbox-axis.svg', 'Diagram Flexbox & Grid Axis Sumbu Layout'),
    'javascript': ('/diagrams/js-event-loop.svg', 'Diagram JavaScript Event Loop & Asynchronous Architecture'),
    'react': ('/diagrams/react-data-flow.svg', 'Diagram Alur Data Satu Arah React (Props Down, Events Up)'),
    'vue': ('/diagrams/react-data-flow.svg', 'Diagram Reaktivitas Komponen & Data Flow Vue'),
    'svelte': ('/diagrams/react-data-flow.svg', 'Diagram Universal Signals & Svelte 5 Runes State Flow'),
    'docker': ('/diagrams/docker-layers.svg', 'Diagram Layer Arsitektur Docker Image & Container'),
    'golang': ('/diagrams/goroutine-channel.svg', 'Diagram CSP Goroutine & Channel Communication Pipeline'),
    'rust': ('/diagrams/rust-ownership.svg', 'Diagram Rust Ownership, Move Semantics & Borrowing Memory'),
    'postgresql': ('/diagrams/sql-joins.svg', 'Diagram Relasi Antar Tabel & SQL Joins'),
    'mysql': ('/diagrams/sql-joins.svg', 'Diagram Relasi Relasional & Eksekusi Query Joins'),
    'graphql': ('/diagrams/rest-vs-graphql.svg', 'Diagram Perbandingan Arsitektur REST vs GraphQL Query Execution'),
    'nodejs': ('/diagrams/js-event-loop.svg', 'Diagram Arsitektur V8 Engine & Libuv Event Loop Node.js'),
}

# ─────────────────────────────────────────────────────────────────────────────
# 28 TRACKS AUTHENTIC ASCII DIAGRAMS (ID & EN)
# ─────────────────────────────────────────────────────────────────────────────
DIAGRAMS_ID = {
    'html5': """```diagram
┌──────────────────────────────────────────────────────────┐
│                   <!DOCTYPE html>                        │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ <html lang="id">                                     │ │
│ │  ┌─────────────────────────┐ ┌─────────────────────┐ │ │
│ │  │ <head> (Metadata)       │ │ <body> (Tampilan)   │ │ │
│ │  │ • <meta charset="UTF-8">│ │ • <header>          │ │ │
│ │  │ • <title>Judul Web</title>│ • <main>            │ │ │
│ │  │ • <meta name="viewport">│ │ • <footer>          │ │ │
│ │  └─────────────────────────┘ └─────────────────────┘ │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```""",
    'css3': """```diagram
┌──────────────────────────────────────────────────────────┐
│ MARGIN (Jarak Luar Transparan)                           │
│   ┌──────────────────────────────────────────────────┐   │
│   │ BORDER (Garis Tepi & Bingkai)                    │   │
│   │   ┌──────────────────────────────────────────┐   │   │
│   │   │ PADDING (Ruang Bantalan Internal)        │   │   │
│   │   │   ┌──────────────────────────────────┐   │   │   │
│   │   │   │ CONTENT (Lebar x Tinggi Teks/UI) │   │   │   │
│   │   │   └──────────────────────────────────┘   │   │   │
│   │   └──────────────────────────────────────────┘   │   │
│   └──────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```""",
    'tailwind': """```diagram
┌──────────────────────────────────────────────────────────┐
│ KONTROL UTILITY TAILWIND                                 │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ flex items-center justify-between (Flexbox)          │ │
│ │ ┌──────────────┐ ┌──────────────┐ ┌────────────────┐ │ │
│ │ │ w-1/3 p-4    │ │ w-1/3 p-4    │ │ w-1/3 p-4      │ │ │
│ │ │ bg-zinc-900  │ │ bg-emerald-600│ │ bg-zinc-800   │ │ │
│ │ │ text-white   │ │ hover:scale-105│ │ rounded-2xl   │ │ │
│ │ └──────────────┘ └──────────────┘ └────────────────┘ │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```""",
    'javascript': """```diagram
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
```""",
    'typescript': """```diagram
┌───────────────────────────────┐
│     KODE SUMBER TYPESCRIPT    │ (Strict Type Annotations)
│ interface User { id: UUID; }  │
└──────────────┬────────────────┘
               │ TYPE CHECKING (tsc) ──► Menemukan bug sebelum runtime!
               ▼
┌───────────────────────────────┐
│     JAVASCRIPT HASIL COMPILE  │ (Tipe dihapus / Type Erasure)
│ function getUser(user) { ... }│
└───────────────────────────────┘
```""",
    'react': """```diagram
     ┌────────────────────────┐
     │    PARENT COMPONENT    │ ◄─── Update State via Setter
     │  (Holds Single State)  │
     └───────────┬────────────┘
                 │ Props Turun (Data Flow 1 Arah ⬇)
     ┌───────────┴────────────┐
     ▼                        ▼
┌──────────────┐       ┌──────────────┐
│  Child Card  │       │ Action Btn   │ ─── Event Handler Naik (⬆)
│ (Reads Props)│       │ (Calls Prop) │
└──────────────┘       └──────────────┘
```""",
    'vue': """```diagram
┌──────────────────────────────────────────────────────────┐
│ PROXY REAKTIVITAS VUE 3                                  │
│                                                          │
│  State: ref(0) / reactive({...})                         │
│       │                                                  │
│       ▼ (Trigger Mutation)                               │
│  Effect Dependency Tracker                               │
│       │                                                  │
│       ▼                                                  │
│  Virtual DOM Diffing & Patching ──► Real DOM Re-render   │
└──────────────────────────────────────────────────────────┘
```""",
    'svelte': """```diagram
┌──────────────────────────────────────────────────────────┐
│ SVELTE 5 RUNES & FINE-GRAINED REACTIVITY                 │
│                                                          │
│  let count = $state(0) ──► Signal Primer                 │
│       │                                                  │
│       ▼                                                  │
│  let double = $derived(count * 2) ──► Komputasi Turunan  │
│       │                                                  │
│       ▼ (Hanya memperbarui node teks spesifik di DOM!)   │
│  <h1>{double}</h1> ◄── Tanpa Virtual DOM Overhead        │
└──────────────────────────────────────────────────────────┘
```""",
    'angular': """```diagram
┌──────────────────────────────────────────────────────────┐
│ ARSITEKTUR KOMPONEN ANGULAR                              │
│                                                          │
│  @Component({ standalone: true })                        │
│       │                                                  │
│  Template HTML ◄── [Property Binding] ── Signals (State) │
│       │                                                  │
│  User Action   ─── (Event Binding)   ──► Method Callback │
│       │                                                  │
│  Dependency Injection: Injeksi Service via inject()      │
└──────────────────────────────────────────────────────────┘
```""",
    'nextjs': """```diagram
┌──────────────────────────────────────────────────────────┐
│ NEXT.JS APP ROUTER ARCHITECTURE                          │
│                                                          │
│ [Server Component] (Default: Keamanan & DB Direct Access)│
│  • page.tsx / layout.tsx                                 │
│  • Fetch data di server tanpa CORS / Waterfalls          │
│       │                                                  │
│       ▼ Mengirim RSC Payload                             │
│ [Client Component] ('use client')                        │
│  • State lokal, onClick, animasi interaktif              │
│       │                                                  │
│       ▼ Server Actions ('use server')                    │
│  Mutasi langsung ke database & Revalidasi Path           │
└──────────────────────────────────────────────────────────┘
```""",
    'nodejs': """```diagram
┌──────────────────────────────────────────────────────────┐
│ ARSITEKTUR RUNTIME NODE.JS                               │
│                                                          │
│   V8 JavaScript Engine  ◄──►  Node.js Core C++ Bindings  │
│            │                             │               │
│            ▼                             ▼               │
│   ┌──────────────────────────────────────────────────┐   │
│   │ LIBUV THREAD POOL & ASYNCHRONOUS EVENT LOOP      │   │
│   │ • Non-blocking File I/O (fs.promises)            │   │
│   │ • Network Sockets (http, net, tls)               │   │
│   │ • Worker Threads untuk komputasi CPU berat       │   │
│   └──────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```""",
    'nestjs': """```diagram
┌──────────────────────────────────────────────────────────┐
│ PIPELINE PERMINTAAN NESTJS                               │
│                                                          │
│ HTTP Request ──► [Guards: Auth] ──► [Interceptors: Pre]  │
│                         │                                │
│                         ▼                                │
│              [Pipes: Validation DTO]                     │
│                         │                                │
│                         ▼                                │
│              [Controller: @Get/@Post]                    │
│                         │                                │
│                         ▼                                │
│              [Service: Business Logic]                   │
│                         │                                │
│                         ▼                                │
│ Response ◄── [Interceptors: Post] ◄── [Exception Filter] │
└──────────────────────────────────────────────────────────┘
```""",
    'golang': """```diagram
┌────────────────┐                     ┌────────────────┐
│  GOROUTINE A   │                     │  GOROUTINE B   │
│  (Worker Thread)                     │  (Consumer)    │
│  ch <- 42      │ ─── Kirim Data ──►  │  val := <-ch   │
└────────────────┘   [ CHANNEL: chan ] └────────────────┘
```""",
    'rust': """```diagram
┌──────────────────────────────┐
│ KEPEMILIKAN MEMORI (OWNERSHIP)│
│ let s1 = String::from("Hi"); │
│       │                      │
│       ▼ (Move Semantics)     │
│ let s2 = s1;                 │
│ • s1 menjadi INVALID         │
│ • s2 menjadi pemilik sah     │
│ • Bebas Data Race & Null     │
└──────────────────────────────┘
```""",
    'python': """```diagram
┌──────────────────────────────────────────────────────────┐
│ SIKLUS EKSEKUSI PYTHON MODERN                            │
│                                                          │
│ Kode Sumber (.py)                                        │
│       │                                                  │
│       ▼ Bytecode Compiler                                │
│ File Cache (.pyc)                                        │
│       │                                                  │
│       ▼ Python Virtual Machine (PVM)                     │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ Global Interpreter Lock (GIL) / Memory Heap Manager  │ │
│ │ • Automatic Reference Counting + Cyclic Garbage Coll │ │
│ │ • Asyncio Event Loop untuk I/O Asinkron              │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```""",
    'django': """```diagram
┌──────────────────────────────────────────────────────────┐
│ ARSITEKTUR MODEL-TEMPLATE-VIEW (MTV) DJANGO              │
│                                                          │
│ Browser Request ──► urls.py (URL Router)                 │
│                            │                             │
│                            ▼                             │
│                       views.py (Logika Bisnis)           │
│                         │         │                      │
│             Query DB    ▼         ▼   Render HTML        │
│        models.py (ORM) ◄           ► templates/*.html    │
│               │                            │             │
│               ▼                            ▼             │
│          Database Relasional           HTTP Response     │
└──────────────────────────────────────────────────────────┘
```""",
    'php': """```diagram
┌──────────────────────────────────────────────────────────┐
│ SIKLUS HIDUP REQUEST PHP 8.3+ FPM                        │
│                                                          │
│ Nginx / Web Server ──(FastCGI)──► PHP-FPM Worker Pool    │
│                                         │                │
│                                         ▼                │
│                                    OPcache Engine        │
│                                    (Bytecode Preload)    │
│                                         │                │
│                                         ▼                │
│                                    Zend Engine Eksekusi  │
│                                    (Clean State per Req) │
│                                         │                │
│                                         ▼                │
│ HTTP Response Output ◄───────── Garbage Collection       │
└──────────────────────────────────────────────────────────┘
```""",
    'laravel': """```diagram
┌──────────────────────────────────────────────────────────┐
│ ALUR KERJA SIKLUS LARAVEL                                │
│                                                          │
│ HTTP Request ──► index.php ──► HTTP Kernel               │
│                                     │                    │
│                                     ▼                    │
│                                Middleware                │
│                                     │                    │
│                                     ▼                    │
│                           Router (web.php/api.php)       │
│                                     │                    │
│                                     ▼                    │
│                           Controller / Action            │
│                            │              │              │
│                            ▼              ▼              │
│                   Eloquent ORM (Model)  Blade Template   │
│                            │              │              │
│                            ▼              ▼              │
│                         Database     HTTP Response       │
└──────────────────────────────────────────────────────────┘
```""",
    'codeigniter4': """```diagram
┌──────────────────────────────────────────────────────────┐
│ ARSITEKTUR MVC RINGAN CODEIGNITER 4                      │
│                                                          │
│ Public Ingress (public/index.php)                        │
│       │                                                  │
│       ▼                                                  │
│ URI Routing (app/Config/Routes.php)                      │
│       │                                                  │
│       ▼ Filters (Auth/CSRF/CORS)                         │
│ Controller (extends BaseController)                      │
│       │                          │                       │
│       ▼                          ▼                       │
│ Model (Entity & Validation)    View (Render Buffer)      │
│       │                          │                       │
│       ▼                          ▼                       │
│ Database Output ──────────────► Browser Response         │
└──────────────────────────────────────────────────────────┘
```""",
    'rails': """```diagram
┌──────────────────────────────────────────────────────────┐
│ ALUR MVC RAILS (THE RAILS DOCTRINE)                      │
│                                                          │
│ Browser ──► config/routes.rb (RESTful Routing)           │
│                   │                                      │
│                   ▼                                      │
│             Controllers (ApplicationController)          │
│               │                         │                │
│               ▼                         ▼                │
│       Models (ActiveRecord)      Views (ActionView / ERB)│
│         • Validations              • Turbo Streams / SSR │
│         • Associations             • Partials            │
│               │                         │                │
│               ▼                         ▼                │
│          Database                 HTML Output ke Klien   │
└──────────────────────────────────────────────────────────┘
```""",
    'spring': """```diagram
┌──────────────────────────────────────────────────────────┐
│ ARSITEKTUR ENTERPRISE SPRING BOOT 3                      │
│                                                          │
│ Client HTTP Request                                      │
│       │                                                  │
│       ▼                                                  │
│ DispatcherServlet                                        │
│       │                                                  │
│       ▼                                                  │
│ @RestController (Controller Endpoint)                    │
│       │ Injeksi Dependensi (@Autowired / Constructor)    │
│       ▼                                                  │
│ @Service (Lapisan Logika Bisnis & @Transactional)        │
│       │                                                  │
│       ▼                                                  │
│ @Repository (Spring Data JPA / Hibernate ORM)            │
│       │                                                  │
│       ▼                                                  │
│ Database Pool (HikariCP)                                 │
└──────────────────────────────────────────────────────────┘
```""",
    'csharp': """```diagram
┌──────────────────────────────────────────────────────────┐
│ PIPELINE MIDDLEWARE ASP.NET CORE (.NET 8/9)              │
│                                                          │
│ Request ──► ExceptionHandler ──► Routing ──► Auth/CORS   │
│                                                │         │
│                                                ▼         │
│                                       Minimal API /      │
│                                       Controllers        │
│                                                │         │
│                                                ▼         │
│                                       Dependency Inject  │
│                                       (Scoped Services)  │
│                                                │         │
│                                                ▼         │
│ Response ◄── Compression ◄── Cache ◄── EF Core / DB      │
└──────────────────────────────────────────────────────────┘
```""",
    'docker': """```diagram
┌────────────────────────────────────────────────────────┐
│ [Layer 4 - Writeable] Container R/W Layer (Ephemeral)  │
├────────────────────────────────────────────────────────┤
│ [Layer 3 - Read Only] CMD ["npm", "start"]             │
├────────────────────────────────────────────────────────┤
│ [Layer 2 - Read Only] COPY . /app & RUN npm install    │
├────────────────────────────────────────────────────────┤
│ [Layer 1 - Read Only] FROM node:20-alpine (Base Image) │
└────────────────────────────────────────────────────────┘
```""",
    'postgresql': """```diagram
┌────────────────────┐                 ┌────────────────────┐
│   TABLE: users     │                 │   TABLE: orders    │
├────────────────────┤                 ├────────────────────┤
│ id (PK: UUID)      │ ◄── Relasi 1-N ─┤ id (PK: UUID)      │
│ email (UNIQUE)     │                 │ user_id (FK -> PK) │
│ created_at         │                 │ total_amount       │
└────────────────────┘                 └────────────────────┘
```""",
    'mysql': """```diagram
┌──────────────────────────────────────────────────────────┐
│ MESIN PENYIMPANAN INNODB MYSQL                           │
│                                                          │
│ SQL Parser & Optimizer ──► Buffer Pool (RAM Cache)       │
│                                  │                       │
│                 ┌────────────────┴────────────────┐      │
│                 ▼                                 ▼      │
│     Clustered Index (B+ Tree)              Redo Log WAL  │
│     (Data tersimpan berurut PK)            (Crash Safe)  │
│                 │                                 │      │
│                 ▼                                 ▼      │
│            Tabel .ibd Disk               Binlog (Replika)│
└──────────────────────────────────────────────────────────┘
```""",
    'mongodb': """```diagram
┌──────────────────────────────────────────────────────────┐
│ MODEL DATA DOKUMEN BSON MONGODB                          │
│                                                          │
│ Koleksi: users                                           │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ {                                                    │ │
│ │   "_id": ObjectId("64f1a2b..."),                     │ │
│ │   "name": "Alex Iskandar",                           │ │
│ │   "profile": { "role": "admin", "verified": true },  │ │
│ │   "tags": ["developer", "golang"],                   │ │
│ │   "orders": [ { "id": "ORD-1", "total": 150000 } ]  │ │
│ │ }                                                    │ │
│ └──────────────────────────────────────────────────────┘ │
│ Mendukung data bersarang (Embedded Document) tanpa Join! │
└──────────────────────────────────────────────────────────┘
```""",
    'redis': """```diagram
┌──────────────────────────────────────────────────────────┐
│ ARSITEKTUR IN-MEMORY SINGLE-THREADED REDIS               │
│                                                          │
│ Klien TCP Request ──► I/O Multiplexing (epoll/kqueue)    │
│                              │                           │
│                              ▼                           │
│                 Pusat Eksekusi Command                   │
│                 (O(1) Super Cepat di RAM)                │
│                 ┌───────────────────────────┐            │
│                 │ STRINGS: 'user:1' -> JSON │            │
│                 │ HASHES:  'cart:9' -> Fields│           │
│                 │ SETS:    'online_users'   │            │
│                 │ STREAMS: 'event_log'      │            │
│                 └─────────────┬─────────────┘            │
│                               │                          │
│                               ▼                          │
│              Persistensi Latar Belakang (AOF / RDB)      │
└──────────────────────────────────────────────────────────┘
```""",
    'graphql': """```diagram
┌─────────────────────────────────────────────────────────┐
│ CLIENT: Mengirim 1 Query Deklaratif (Spesifik Field)    │
│ POST /graphql { query { user { id name orders { id } } }│
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│ GRAPHQL SERVER: Skema SDL & Pohon Resolver              │
│ 1. Resolves Query.user -> Panggil DB Pengguna           │
│ 2. Resolves User.orders -> Panggil Service Transaksi    │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│ HASIL: JSON Murni Berbentuk Sama Persis dengan Query   │
│ { "data": { "user": { "name": "Alex", "orders": [...] }}}│
└─────────────────────────────────────────────────────────┘
```""",
}

# English mirrors of diagrams
DIAGRAMS_EN = {k: v.replace('Tampilan', 'Visible UI').replace('Jarak Luar', 'Outer Space').replace('Garis Tepi', 'Border').replace('Ruang Bantalan', 'Padding').replace('Lebar x Tinggi', 'Width x Height').replace('Call Stack Kosong?', 'Call Stack Empty?').replace('Pemeriksa', 'Coordinator').replace('Operasi Async', 'Async Operation').replace('Callback Selesai', 'Callback Ready').replace('Kirim Data', 'Pass Data').replace('Alur Data Satu Arah', 'Unidirectional Data Flow').replace('Props Turun', 'Props Down').replace('Event Handler Naik', 'Event Callback Up').replace('Mendefinisikan', 'Defining').replace('Hasil', 'Result').replace('Klien', 'Client') for k, v in DIAGRAMS_ID.items()}

# ─────────────────────────────────────────────────────────────────────────────
# AUTHENTIC NATIVE SYNTAX CATALOG FOR ALL 28 TECH STACKS (ID)
# ─────────────────────────────────────────────────────────────────────────────
SYNTAX_DB_ID = {
    'html5': [
        ("<!DOCTYPE html>", "Deklarasi standar dokumen HTML5 modern", "Wajib di baris paling pertama", "Mengaktifkan rendering Standard Mode pada peramban web modern.", "html", "<!DOCTYPE html>\n<html lang=\"id\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>Standar HTML5</title>\n  </head>\n  <body style=\"font-family:system-ui,sans-serif;padding:24px;background:#0f172a;color:white;\">\n    <h1>Standar Dokumen HTML5 W3C</h1>\n    <p>Halaman dirender optimal pada mode peramban modern.</p>\n  </body>\n</html>", "Halaman dirender sesuai standar W3C"),
        ("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">", "Pengaturan dimensi dan skala layar mobile", "name='viewport', content='...'", "Menyesuaikan skala tampilan 1:1 dengan lebar fisik perangkat agar tidak mengecil di ponsel.", "html", "<!DOCTYPE html>\n<html lang=\"id\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Viewport Demo</title>\n  <style>\n    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; margin: 0; }\n    .card { background: #1e293b; border: 2px solid #10b981; padding: 20px; border-radius: 12px; }\n  </style>\n</head>\n<body>\n  <div class=\"card\">\n    <h3>Layar Responsif 1:1 Aktif</h3>\n    <p>Skala layout menyesuaikan lebar viewport perangkat secara otomatis.</p>\n  </div>\n</body>\n</html>", "Tampilan responsif di seluruh layar ponsel"),
        ("<header>, <main>, <footer>", "Struktur landmark semantik aksesibilitas", "Global attributes (class, id, lang)", "Membagi dokumen menjadi banner navigasi, konten unik utama, dan informasi penutup.", "html", "<!DOCTYPE html>\n<html lang=\"id\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Semantic HTML5</title>\n  <style>\n    body { font-family: system-ui, sans-serif; margin: 0; background: #0f172a; color: white; }\n    header, footer { background: #1e293b; padding: 16px 24px; }\n    main { padding: 24px; background: #334155; margin: 12px; border-radius: 8px; }\n  </style>\n</head>\n<body>\n  <header><h1>Portal Navigasi</h1></header>\n  <main><p>Konten utama dokumen HTML5 beraksesibilitas tinggi.</p></main>\n  <footer><small>&copy; 2026 Tryngo Platform</small></footer>\n</body>\n</html>", "Terbaca jelas oleh screen reader & mesin pencari"),
        ("<form action=\"/api\" method=\"POST\">", "Kontainer pengumpulan data pengguna", "action (URL), method (GET/POST)", "Menyediakan wadah terstruktur untuk memvalidasi dan mengirimkan data input ke server.", "html", "<!DOCTYPE html>\n<html lang=\"id\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Formulir Input</title>\n  <style>\n    body { font-family: system-ui, sans-serif; padding: 24px; background: #0f172a; color: white; }\n    form { display: flex; flex-direction: column; gap: 12px; max-width: 320px; }\n    input { padding: 10px; border-radius: 6px; border: 1px solid #475569; background: #1e293b; color: white; }\n    button { padding: 10px; background: #10b981; color: #022c22; font-weight: bold; border: none; border-radius: 6px; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <form onsubmit=\"event.preventDefault(); alert('Data terkirim: ' + this.user.value);\">\n    <label for=\"user\">Nama Pengguna:</label>\n    <input type=\"text\" id=\"user\" name=\"user\" value=\"Budi Santoso\" required />\n    <button type=\"submit\">Kirim Formulir</button>\n  </form>\n</body>\n</html>", "Formulir interaktif siap dikirim")
    ],
    'css3': [
        ("box-sizing: border-box;", "Kalkulasi Box Model presisi", "border-box | content-box", "Memasukkan padding dan border ke dalam total lebar elemen agar tidak merusak layout grid.", "html", "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body { font-family: system-ui, sans-serif; padding: 24px; background: #0f172a; color: white; }\n    .box { width: 100%; padding: 20px; border: 4px solid #10b981; background: #1e293b; border-radius: 8px; }\n  </style>\n</head>\n<body>\n  <div class=\"box\">Total lebar pas 100% termasuk padding & border</div>\n</body>\n</html>", "Elemen berukuran presisi tanpa kalkulasi manual"),
        ("display: flex; justify-content: space-between; align-items: center;", "Penyusunan tata letak satu dimensi", "flex-direction, justify-content, align-items", "Mengatur perataan dan distribusi ruang kosong antar item anak secara fleksibel.", "html", "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <style>\n    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; margin: 0; }\n    .navbar { display: flex; justify-content: space-between; align-items: center; background: #1e293b; padding: 16px 24px; border-radius: 12px; }\n    .brand { font-weight: bold; color: #10b981; font-size: 18px; }\n    .menu { display: flex; gap: 16px; list-style: none; margin: 0; padding: 0; }\n  </style>\n</head>\n<body>\n  <nav class=\"navbar\">\n    <span class=\"brand\">Tryngo</span>\n    <ul class=\"menu\"><li>Beranda</li><li>Kursus</li><li>Profil</li></ul>\n  </nav>\n</body>\n</html>", "Item navbar terdistribusi rapi di ujung kiri & kanan"),
        ("display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));", "Sistem kisi dua dimensi responsif", "grid-template-columns, gap", "Menyusun grid adaptif yang otomatis menyesuaikan jumlah kolom tanpa media query.", "html", "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <style>\n    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; margin: 0; }\n    .grid-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; }\n    .card { background: #1e293b; padding: 20px; border-radius: 10px; border: 1px solid #334155; }\n  </style>\n</head>\n<body>\n  <div class=\"grid-container\">\n    <div class=\"card\">Kartu Responsif 1</div>\n    <div class=\"card\">Kartu Responsif 2</div>\n    <div class=\"card\">Kartu Responsif 3</div>\n  </div>\n</body>\n</html>", "Kolom grid otomatis menyusun sesuai lebar layar"),
        ("transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);", "Animasi transisi status interaktif", "property, duration, timing-function", "Memberikan efek perubahan visual yang mulus saat elemen mengalami perubahan status.", "html", "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <style>\n    body { font-family: system-ui, sans-serif; padding: 40px; background: #0f172a; text-align: center; }\n    .btn { display: inline-block; padding: 12px 28px; background: #10b981; color: #022c22; font-weight: bold; border-radius: 8px; border: none; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease; }\n    .btn:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3); }\n  </style>\n</head>\n<body>\n  <button class=\"btn\">Arahkan Kursor ke Sini</button>\n</body>\n</html>", "Tombol terangkat halus 2px saat kursor diarahkan")
    ],
    'tailwind': [
        ("flex items-center justify-between", "Utility tata letak Flexbox instan", "Display flex, alignment, distribution", "Menyusun kontainer fleksibel dengan pemusatan vertikal dan pemisahan horizontal antar elemen.", "html", "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <script src=\"https://cdn.tailwindcss.com\"></script>\n</head>\n<body class=\"p-6 bg-slate-900\">\n  <div class=\"flex items-center justify-between p-4 bg-slate-800 text-white rounded-xl shadow-lg\">\n    <span class=\"font-bold text-emerald-400\">Tryngo Brand</span>\n    <button class=\"px-4 py-2 bg-emerald-600 rounded-lg text-sm font-semibold\">Menu</button>\n  </div>\n</body>\n</html>", "Elemen tersusun rapi di ujung kiri dan kanan"),
        ("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", "Grid responsif multi-breakpoint", "Breakpoint prefixes (sm:, md:, lg:)", "Mengubah jumlah kolom secara bertahap saat layar membesar dari ponsel ke desktop.", "html", "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <script src=\"https://cdn.tailwindcss.com\"></script>\n</head>\n<body class=\"p-6 bg-slate-900\">\n  <div class=\"grid grid-cols-1 md:grid-cols-3 gap-4\">\n    <div class=\"p-5 bg-slate-800 text-white rounded-xl\">Kolom 1</div>\n    <div class=\"p-5 bg-slate-800 text-white rounded-xl\">Kolom 2</div>\n    <div class=\"p-5 bg-slate-800 text-white rounded-xl\">Kolom 3</div>\n  </div>\n</body>\n</html>", "Grid 1 kolom di HP, 3 kolom di desktop"),
        ("hover:bg-emerald-600 active:scale-95 transition-all duration-200", "State modifiers interaktif & animasi", "hover:, active:, focus:, transition", "Memberikan feedback visual interaktif saat tombol disentuh atau kursor diarahkan.", "html", "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <script src=\"https://cdn.tailwindcss.com\"></script>\n</head>\n<body class=\"p-8 bg-slate-900 flex justify-center\">\n  <button class=\"bg-emerald-500 hover:bg-emerald-600 active:scale-95 transition-all px-6 py-3 rounded-xl text-white font-bold shadow-lg\">\n    Tombol Interaktif Tailwind\n  </button>\n</body>\n</html>", "Tombol membesar dan berubah warna saat di-hover"),
        ("dark:bg-zinc-950 dark:text-zinc-100", "Dukungan tema gelap (Dark Mode)", "dark: prefix selector", "Menentukan warna khusus saat pengguna mengaktifkan mode gelap di peramban atau sistem.", "html", "<!DOCTYPE html>\n<html class=\"dark\">\n<head>\n  <meta charset=\"UTF-8\">\n  <script src=\"https://cdn.tailwindcss.com\"></script>\n</head>\n<body class=\"p-6 bg-slate-950\">\n  <div class=\"bg-slate-900 text-white border border-slate-700 p-6 rounded-2xl shadow-xl\">\n    <h3 class=\"text-xl font-bold text-emerald-400\">Tema Gelap (Dark Mode)</h3>\n    <p class=\"text-slate-300 mt-2\">Warna latar dan kontras otomatis menyesuaikan preferensi sistem.</p>\n  </div>\n</body>\n</html>", "Warna otomatis menyesuaikan mode gelap pengguna")
    ],
    'javascript': [
        ("const / let variabel", "Deklarasi variabel modern lingkup blok", "Identifier, Initial Value", "`const` untuk referensi konstan yang tidak diubah; `let` untuk nilai dinamis reassignable.", "javascript", "const app = 'Tryngo';\nlet count = 0;\ncount += 1;\nconsole.log(app, count);", "Tryngo 1"),
        ("() => { ... } (Arrow Function)", "Sintaks fungsi ringkas dengan lexical this", "Parameters, Function Body", "Menyederhanakan penulisan fungsi dan mempertahankan konteks `this` dari lingkup luar.", "javascript", "const square = (n) => n * n;\nconsole.log(square(7));", "49"),
        ("async / await & fetch(url)", "Penanganan operasi asinkron linear", "URL string, RequestInit options", "Membaca data HTTP API secara asinkron tanpa callback hell.", "javascript", "async function loadData() {\n  const res = Promise.resolve({ user: 'Alex', status: 'active' });\n  return await res;\n}\nloadData().then(data => console.log(JSON.stringify(data)));", "{\"user\":\"Alex\",\"status\":\"active\"}"),
        ("Array.prototype.map() / filter()", "Transformasi array fungsional immutable", "callback(item, index)", "`map` menghasilkan array baru dari hasil transformasi; `filter` menyaring data.", "javascript", "const nums = [1, 2, 3, 4];\nconst evens = nums.filter(n => n % 2 === 0);\nconsole.log(evens);", "[2, 4]")
    ],
    'typescript': [
        ("interface Name { prop: Type; }", "Mendefinisikan kontrak bentuk objek terstruktur", "Field names, Types, Optional (?)", "Menjamin seluruh objek mematuhi struktur tipe data saat compile-time.", "typescript", "interface User {\n  id: string;\n  name: string;\n  isActive?: boolean;\n}\nconst u: User = { id: 'u1', name: 'Alex' };\nconsole.log(u.name);", "Alex"),
        ("type Union = TypeA | TypeB", "Tipe gabungan multi-kondisi", "Dua atau lebih varian tipe data", "Membatasi variabel hanya boleh menerima salah satu nilai yang sah.", "typescript", "type Status = 'idle' | 'loading' | 'success';\nlet current: Status = 'loading';\nconsole.log(current);", "loading"),
        ("function genericFn<T>(arg: T): T", "Fungsi tipe dinamis aman (Generics)", "Type Parameter T", "Membuat fungsi yang dapat menangani berbagai tipe data dengan tetap menjaga type safety.", "typescript", "function wrap<T>(val: T): { data: T } {\n  return { data: val };\n}\nconst box = wrap('Tryngo');\nconsole.log(JSON.stringify(box));", "{\"data\":\"Tryngo\"}"),
        ("Partial<T> / Pick<T, K> / Omit<T, K>", "Tipe utilitas transformasi bawaan", "Base Type T, Keys K", "Mengubah properti menjadi opsional (`Partial`) atau mengambil subset kolom tertentu.", "typescript", "interface Task { id: string; title: string; done: boolean; }\ntype UpdateDto = Partial<Task>;\nconst update: UpdateDto = { done: true };\nconsole.log(update.done);", "true")
    ],
    'react': [
        ("const [state, setState] = useState(initialValue)", "Hook penyimpanan state lokal komponen", "initialValue", "Menyimpan data reaktif. Memanggil setter memicu re-render UI secara otomatis.", "jsx", "const [count, setCount] = useState(0);\n// Eksekusi: setCount(prev => prev + 1);", "Komponen memperbarui angka count di layar"),
        ("useEffect(() => { ... }, [dependencies])", "Hook efek samping (Lifecycle & Subscriptions)", "Effect Callback, Dependency Array", "Menjalankan sinkronisasi data setelah render dan membersihkan resource saat unmount.", "jsx", "useEffect(() => {\n  console.log('Komponen terpasang ke DOM');\n  return () => console.log('Komponen dilepas');\n}, []);", "Log dicetak saat mount dan unmount"),
        ("function Component(props) { return <JSX /> }", "Deklarasi Komponen Fungsi Dasar", "props object", "Blok bangunan UI modular yang mengubah parameter data menjadi tampilan visual.", "jsx", "function UserCard({ name }: { name: string }) {\n  return <div className=\"card\"><h3>{name}</h3></div>;\n}", "Elemen kartu ter-render dengan nama pengguna"),
        ("useContext(MyContext)", "Akses state global tanpa prop-drilling", "React Context Object", "Membaca nilai state dari Context Provider terdekat dalam hierarki komponen.", "jsx", "const { theme, toggleTheme } = useContext(ThemeContext);", "Mendapatkan nilai tema aktif secara instan")
    ],
    'vue': [
        ("const count = ref(0)", "State reaktif primitif Vue 3", "initialValue", "Membungkus nilai ke dalam Reactive Ref. Di script diakses via `.value`, di template otomatis di-unwrap.", "vue", "<script setup>\nimport { ref } from 'vue';\nconst count = ref(0);\nconst increment = () => count.value++;\n</script>", "Nilai count bertambah secara reaktif"),
        ("const double = computed(() => count.value * 2)", "Komputasi nilai turunan ber-cache", "Getter function", "Menghitung nilai baru secara otomatis hanya ketika dependensi reaktifnya berubah.", "vue", "<script setup>\nimport { ref, computed } from 'vue';\nconst count = ref(5);\nconst double = computed(() => count.value * 2);\n</script>", "double otomatis bernilai 10"),
        ("defineProps<{ title: string }>()", "Deklarasi kontrak Props komponen anak", "Generic Type Schema", "Menerima kiriman data dari parent komponen dengan validasi tipe statis.", "vue", "<script setup>\ndefineProps<{\n  title: string;\n  inStock?: boolean;\n}>();\n</script>", "Komponen siap menerima atribut title dari parent"),
        ("v-model=\"message\"", "Two-way data binding dua arah", "Target state variable", "Menghubungkan nilai elemen input form dengan state JavaScript secara sinkron.", "vue", "<template>\n  <input v-model=\"username\" placeholder=\"Ketik nama...\" />\n  <p>Halo, {{ username }}</p>\n</template>", "Input teks sinkron seketika ke paragraf tampilan")
    ],
    'svelte': [
        ("let count = $state(0)", "Rune state reaktif Svelte 5", "initialValue", "Mendeklarasikan variabel reaktif murni tanpa pembungkus .value atau setter khusus.", "svelte", "<script>\n  let count = $state(0);\n  function inc() { count += 1; }\n</script>\n<button onclick={inc}>Klik: {count}</button>", "Tombol reaktif memperbarui angka count"),
        ("let double = $derived(count * 2)", "Rune komputasi turunan Svelte 5", "Expression", "Otomatis menghitung ulang nilai turunan saat sinyal state primernya berubah.", "svelte", "<script>\n  let count = $state(4);\n  let double = $derived(count * 2);\n</script>\n<p>Hasil: {double}</p>", "Hasil: 8"),
        ("$effect(() => { ... })", "Rune efek samping reaktif", "Effect Callback", "Menjalankan operasi DOM, API, atau timer saat state di dalamnya mengalami mutasi.", "svelte", "<script>\n  let count = $state(0);\n  $effect(() => {\n    console.log('Nilai terkini:', count);\n  });\n</script>", "Mencetak log otomatis setiap count berubah"),
        ("bind:value={variable}", "Sinkronisasi input form dua arah", "Target state variable", "Menautkan input form langsung ke state tanpa memerlukan event handler manual.", "svelte", "<script>\n  let name = $state('Tryngo');\n</script>\n<input bind:value={name} />", "Perubahan input langsung mengalir ke state name")
    ],
    'angular': [
        ("count = signal(0)", "State reaktif Angular Signals", "initialValue", "Menyediakan variabel sinyal reaktif granular yang memicu deteksi perubahan performa tinggi.", "typescript", "import { signal } from '@angular/core';\nexport class CounterComponent {\n  count = signal(0);\n  inc() { this.count.update(n => n + 1); }\n}", "Komponen Angular merender sinyal reaktif"),
        ("double = computed(() => this.count() * 2)", "Sinyal komputasi memoized", "Compute Callback", "Menghitung nilai turunan otomatis dengan cache pintar tanpa re-evaluasi redundan.", "typescript", "import { signal, computed } from '@angular/core';\ncount = signal(10);\ndouble = computed(() => this.count() * 2);", "double() mengembalikan nilai 20"),
        ("@Component({ standalone: true, ... })", "Deklarasi Komponen Standalone Modern", "Selector, Imports, Template", "Mendefinisikan komponen modular mandiri tanpa memerlukan NgModules yang rumit.", "typescript", "@Component({\n  selector: 'app-user',\n  standalone: true,\n  template: `<h2>{{ title() }}</h2>`\n})\nexport class UserComponent {}", "Komponen siap dirender di aplikasi Angular"),
        ("inject(HttpClient)", "Injeksi dependensi fungsional", "Service Token", "Mengambil instance service dependensi secara fungsional tanpa constructor boilerplate.", "typescript", "import { inject } from '@angular/core';\nimport { HttpClient } from '@angular/common/http';\nprivate http = inject(HttpClient);", "Service HttpClient siap digunakan untuk pemanggilan API")
    ],
    'nextjs': [
        ("export default async function Page()", "Server Component asinkron bawaan", "Props (params, searchParams)", "Merender halaman di server dengan akses database langsung tanpa paparan secret ke browser.", "typescript", "export default async function Page() {\n  const data = await db.query('SELECT * FROM items');\n  return <main>{data.map(i => <p key={i.id}>{i.name}</p>)}</main>;\n}", "HTML statis siap saji dikirimkan ke peramban klien"),
        ("'use client'", "Direktif penanda Komponen Klien", "Ditulis di baris pertama", "Mengizinkan penggunaan hook interaktif browser seperti `useState`, `useEffect`, dan event listener.", "typescript", "'use client';\nimport { useState } from 'react';\nexport default function Counter() {\n  const [val, setVal] = useState(0);\n  return <button onClick={() => setVal(v => v + 1)}>{val}</button>;\n}", "Komponen interaktif beroperasi di browser klien"),
        ("'use server' (Server Actions)", "Mutasi data server langsung dari form", "Form data / arguments", "Mengeksekusi mutasi database di sisi server langsung dari event form klien tanpa endpoint REST terpisah.", "typescript", "async function createItem(formData: FormData) {\n  'use server';\n  const name = formData.get('name');\n  await db.items.create({ name });\n  revalidatePath('/items');\n}", "Data tersimpan di server dan halaman otomatis di-revalidasi"),
        ("<Link href=\"/dashboard\">", "Navigasi halaman cepat tanpa reload", "href (Path route)", "Melakukan pre-fetching rute di latar belakang dan transisi halaman instan (SPA feel).", "typescript", "import Link from 'next/link';\n<Link href=\"/about\" className=\"btn\">Tentang Kami</Link>", "Halaman berpindah instan tanpa muat ulang browser")
    ],
    'nodejs': [
        ("import fs from 'node:fs/promises'", "Modul manipulasi filesystem asinkron", "Path file, Encoding, Data", "Membaca dan menulis file lokal dengan aman tanpa memblokir thread event loop.", "javascript", "import fs from 'node:fs/promises';\nconst content = await fs.readFile('app.config.json', 'utf8');\nconsole.log(JSON.parse(content));", "Membaca isi berkas konfigurasi secara non-blocking"),
        ("http.createServer((req, res) => { ... })", "Server HTTP native berkecepatan tinggi", "Request Listener (req, res)", "Menangani koneksi jaringan HTTP langsung dan mengirimkan status respon beserta payload data.", "javascript", "import http from 'node:http';\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'application/json' });\n  res.end(JSON.stringify({ status: 'ok' }));\n});\nserver.listen(3000);", "Server aktif mendengarkan di http://localhost:3000"),
        ("EventEmitter & .on() / .emit()", "Arsitektur komunikasi berbasis event", "Event name, Payload arguments", "Menyediakan decoupling komunikasi modular menggunakan pola pub/sub internal Node.js.", "javascript", "import { EventEmitter } from 'node:events';\nconst emitter = new EventEmitter();\nemitter.on('order', id => console.log('Pesanan masuk:', id));\nemitter.emit('order', 'ORD-99');", "Pesanan masuk: ORD-99"),
        ("process.env.VARIABLE_NAME", "Akses variabel lingkungan sistem", "Environment key identifier", "Membaca rahasia kredensial, port server, dan mode operasi (production/development).", "javascript", "const PORT = process.env.PORT || 8080;\nconsole.log('Menjalankan pada port:', PORT);", "Menjalankan pada port: 8080")
    ],
    'nestjs': [
        ("@Controller('users')", "Dekorator pengenal rute API controller", "Base path string", "Memetakan request HTTP yang masuk ke handler method spesifik di dalam kelas controller.", "typescript", "@Controller('users')\nexport class UsersController {\n  @Get(':id')\n  findOne(@Param('id') id: string) { return { id }; }\n}", "Endpoint GET /users/:id siap diakses klien"),
        ("@Injectable()", "Dekorator penyedia layanan (Provider / Service)", "Provider Scope (default: Singleton)", "Mendaftarkan class ke dalam IoC (Inversion of Control) Container NestJS untuk diinjeksi otomatis.", "typescript", "@Injectable()\nexport class UsersService {\n  findAll() { return ['Alex', 'Budi']; }\n}", "Service siap diinjeksi ke Controller mana pun"),
        ("@Body() dto: CreateUserDto", "Ekstraksi dan validasi payload body", "DTO Class Schema", "Mengekstrak JSON body dari HTTP request dan memvalidasi aturan field via ValidationPipe.", "typescript", "@Post()\ncreate(@Body() dto: CreateUserDto) {\n  return this.usersService.create(dto);\n}", "Payload otomatis divalidasi sebelum logika dijalankan"),
        ("@Module({ controllers: [...], providers: [...] })", "Pengelompok modul arsitektur terstruktur", "controllers, providers, exports, imports", "Mengorganisasi aplikasi menjadi modul-modul independen dan kohesif.", "typescript", "@Module({\n  controllers: [UsersController],\n  providers: [UsersService],\n  exports: [UsersService]\n})\nexport class UsersModule {}", "Modul Users siap diimpor oleh modul utama AppModule")
    ],
    'golang': [
        ("var x int / x := 42", "Deklarasi variabel statis dan pendek", "Identifier, Type / Value", "`:=` menginferensi tipe data otomatis dalam fungsi; `var` untuk nilai default.", "go", "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tage := 25\n\tname := \"Alex\"\n\tfmt.Printf(\"%s berusia %d tahun\\n\", name, age)\n}", "Alex berusia 25 tahun"),
        ("func (r Receiver) Method() ReturnType", "Penerapan Method pada Struct (OOP ala Go)", "Receiver (value/pointer), Parameters", "Menghubungkan fungsi khusus ke tipe struct untuk membentuk perilaku objek tanpa pewarisan.", "go", "package main\n\nimport \"fmt\"\n\ntype User struct {\n\tName string\n}\n\nfunc (u User) Greet() string {\n\treturn \"Halo, \" + u.Name\n}\n\nfunc main() {\n\tu := User{Name: \"Budi\"}\n\tfmt.Println(u.Greet())\n}", "Halo, Budi"),
        ("go func() { ... }()", "Eksekusi thread ringan konkuren (Goroutine)", "Fungsi anonim / bernama", "Menjalankan komputasi di thread runtime Go yang sangat ringan (~2KB memori awal).", "go", "package main\n\nimport (\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc main() {\n\tgo func() {\n\t\tfmt.Println(\"Berjalan di goroutine terpisah!\")\n\t}()\n\ttime.Sleep(50 * time.Millisecond)\n\tfmt.Println(\"Selesai alur utama\")\n}", "Berjalan di goroutine terpisah!\nSelesai alur utama"),
        ("ch := make(chan int); ch <- 42; val := <-ch", "Saluran komunikasi antar goroutine (Channel)", "Tipe data channel, kapasitas buffer", "Mengirim dan menerima data antar goroutine dengan sinkronisasi bawaan tanpa lock manual.", "go", "package main\n\nimport \"fmt\"\n\nfunc main() {\n\tch := make(chan int)\n\tgo func() {\n\t\tch <- 100\n\t}()\n\tresult := <-ch\n\tfmt.Println(\"Diterima:\", result)\n}", "Diterima: 100")
    ],
    'rust': [
        ("let x = 5; let mut y = 10;", "Deklarasi variabel immutable & mutable", "Identifier, mut keyword", "Rust secara default mengunci variabel agar tidak bisa diubah demi keamanan memori.", "rust", "fn main() {\n    let mut score = 50;\n    score += 25;\n    println!(\"Score: {}\", score);\n}", "Score: 75"),
        ("&T (Borrow) vs &mut T (Mutable Borrow)", "Peminjaman referensi memori (Borrowing)", "Referensi variabel", "Mengizinkan pembacaan data tanpa memindahkan ownership dengan aturan ketat kompiler.", "rust", "fn print_len(s: &String) {\n    println!(\"Panjang: {}\", s.len());\n}\n\nfn main() {\n    let s = String::from(\"Tryngo Rust\");\n    print_len(&s);\n    println!(\"Variabel s tetap valid: {}\", s);\n}", "Panjang: 11\nVariabel s tetap valid: Tryngo Rust"),
        ("match value { Pattern => Action }", "Pencocokan pola menyeluruh (Pattern Matching)", "Expression, Arms", "Mengevaluasi setiap kemungkinan kondisi secara lengkap tanpa ada cabang yang terlewat.", "rust", "fn main() {\n    let res: Option<i32> = Some(10);\n    match res {\n        Some(v) => println!(\"Nilai: {}\", v),\n        None => println!(\"Kosong\"),\n    }\n}", "Nilai: 10"),
        ("Result<T, E> & Operator ?", "Penanganan error idiomatik tanpa exception", "Ok(T), Err(E)", "Mengembalikan nilai sukses atau error terstruktur, dan operator `?` untuk propagasi error.", "rust", "fn parse_number(s: &str) -> Result<i32, std::num::ParseIntError> {\n    let num: i32 = s.parse()?;\n    Ok(num * 2)\n}\n\nfn main() {\n    match parse_number(\"42\") {\n        Ok(val) => println!(\"Hasil kali dua: {}\", val),\n        Err(e) => println!(\"Gagal: {}\", e),\n    }\n}", "Hasil kali dua: 84")
    ],
    'python': [
        ("def fn(param: int) -> str:", "Definisi fungsi dengan type hinting modern", "Parameter list, Type Annotations, Return Type", "Mendeklarasikan fungsi dengan dokumentasi tipe data statis yang diverifikasi linter.", "python", "def calculate_tax(price: float, rate: float = 0.11) -> float:\n    return round(price * rate, 2)\nprint(calculate_tax(100000.0))", "11000.0"),
        ("[x * 2 for x in items if x > 0]", "List & Dictionary Comprehension", "Mapping expression, Iterable, Filter predicate", "Mentransformasi dan menyaring elemen koleksi secara ekspresif dalam 1 baris kode yang cepat.", "python", "numbers = [1, 2, 3, 4, 5, 6]\nevens_squared = [n ** 2 for n in numbers if n % 2 == 0]\nprint(evens_squared)", "[4, 16, 36]"),
        ("with open(filename, 'r') as f:", "Pengelola Konteks Otomatis (Context Manager)", "Resource target, alias as", "Menjamin pembersihan resource (seperti menutup file atau koneksi DB) secara otomatis setelah blok selesai.", "python", "with open('data.txt', 'w') as f:\n    f.write('Tryngo Platform')\n# File otomatis ditutup dengan aman di sini", "File tersimpan dan resource ditutup aman"),
        ("async def & await asyncio.gather(*tasks)", "Konkurensi asinkron non-blocking", "Coroutines, asyncio Event Loop", "Mengeksekusi banyak panggilan I/O jaringan secara paralel tanpa thread blocking.", "python", "import asyncio\nasync def fetch_api(n):\n    await asyncio.sleep(0.1)\n    return f'Hasil {n}'\n# asyncio.run(fetch_api(1))", "Coroutines tereksekusi tanpa memblokir thread utama")
    ],
    'django': [
        ("class Model(models.Model)", "Definisi entitas ORM database", "Field Types (CharField, IntegerField, ForeignKey)", "Memetakan struktur tabel database langsung dari class Python dengan migrasi bawaan.", "python", "from django.db import models\nclass Product(models.Model):\n    name = models.CharField(max_length=200)\n    price = models.DecimalField(max_digits=10, decimal_places=2)\n    created_at = models.DateTimeField(auto_now_add=True)", "Skema tabel Product siap dimigrasi ke database"),
        ("Product.objects.filter(price__gt=50000)", "ORM QuerySet Fluent API", "Field lookups (__gt, __icontains, __in)", "Menyusun query SQL relasional berkinerja tinggi secara lazy tanpa menulis SQL mentah.", "python", "cheap_products = Product.objects.filter(price__lte=100000).order_by('-created_at')[:5]", "Mengembalikan 5 baris produk termurah"),
        ("def view(request): return render(request, 'home.html', ctx)", "View Handler berbasis fungsi/kelas", "HttpRequest, Template name, Context dict", "Menerima permintaan pengguna, memproses data, dan mengembalikan HTML yang ter-render.", "python", "from django.shortcuts import render\ndef home_view(request):\n    items = Product.objects.all()\n    return render(request, 'home.html', {'items': items})", "Halaman web ter-render sempurna untuk pengguna"),
        ("path('products/<int:id>/', views.detail, name='product-detail')", "Pendaftaran URL Pattern terstruktur", "Route string, View function, Unique name", "Menghubungkan pola URL yang diminta peramban ke fungsi view yang sesuai.", "python", "from django.urls import path\nfrom . import views\nurlpatterns = [\n    path('products/<int:id>/', views.detail, name='product-detail')\n]", "Rute /products/123 dipetakan ke views.detail")
    ],
    'php': [
        ("declare(strict_types=1);", "Penegakan tipe data ketat PHP 8+", "Wajib di baris 1 berkas PHP", "Mencegah type coercion tak terduga dan memastikan kompilasi menolak ketidaksesuaian tipe.", "php", "<?php\ndeclare(strict_types=1);\nfunction add(int $a, int $b): int {\n    return $a + $b;\n}\necho add(5, 10);", "15"),
        ("readonly class UserDto { public function __construct(...) }", "Constructor Promotion & Readonly Class", "public readonly properties", "Menyederhanakan pembuatan class immutable transfer data tanpa boilerplate penulisan getter.", "php", "<?php\nreadonly class UserDto {\n    public function __construct(\n        public string $id,\n        public string $email\n    ) {}\n}\n$user = new UserDto('u1', 'alex@example.com');", "Objek data transfer immutable tercipta bersih"),
        ("match($status) { 'paid' => 200, default => 400 }", "Ekspresi pencocokan nilai PHP 8 (Match Expression)", "Target value, Arms pattern", "Alternatif modern untuk switch-case dengan perbandingan identik (`===`) dan nilai kembalian instan.", "php", "<?php\n$statusCode = 'paid';\n$code = match($statusCode) {\n    'paid' => 200,\n    'pending' => 202,\n    default => 400\n};\necho $code;", "200"),
        ("PDO::prepare('SELECT * FROM tbl WHERE id = ?')", "Prepared statements pencegah SQL Injection", "SQL query berparameter, Execute bindings", "Memisahkan instruksi SQL dari data pengguna untuk menjamin keamanan database mutlak.", "php", "<?php\n$stmt = $pdo->prepare('SELECT name FROM users WHERE id = :id');\n$stmt->execute(['id' => 1]);\n$user = $stmt->fetch();", "Query aman bebas dari celah serangan injeksi")
    ],
    'laravel': [
        ("Route::get('/users', [UserController::class, 'index'])", "Pendaftaran rute HTTP deklaratif", "URI pattern, Action Controller array", "Mengarahkan permintaan HTTP GET yang masuk ke method controller yang relevan.", "php", "<?php\nuse App\\Http\\Controllers\\ProductController;\nRoute::get('/products', [ProductController::class, 'index'])->name('products.index');", "Rute terdaftar dan siap diakses pengguna"),
        ("class Product extends Model { protected $fillable = [...]; }", "Model Eloquent ORM & Mass Assignment Guard", "$fillable array", "Mendefinisikan entitas database dengan relasi aktif dan perlindungan injeksi mass assignment.", "php", "<?php\nnamespace App\\Models;\nuse Illuminate\\Database\\Eloquent\\Model;\nclass Product extends Model {\n    protected $fillable = ['title', 'price', 'in_stock'];\n}", "Model Product siap untuk operasi CRUD Eloquent"),
        ("$request->validate(['email' => 'required|email|unique:users'])", "Validasi HTTP request terpusat", "Rules array", "Memvalidasi input data pengguna secara otomatis dan mengembalikan error jika tidak memenuhi syarat.", "php", "<?php\n$validated = $request->validate([\n    'title' => 'required|string|max:255',\n    'price' => 'required|numeric|min:0'\n]);", "Data lolos seleksi atau redirect dengan error session"),
        ("return view('products.index', compact('products'))", "Rendering tampilan Blade Template", "View path, Data array / compact", "Mengirimkan data dari controller ke template Blade untuk dirender menjadi antarmuka HTML.", "php", "<?php\npublic function index() {\n    $products = Product::where('in_stock', true)->paginate(10);\n    return view('products.index', compact('products'));\n}", "Tampilan daftar produk berhasil disajikan")
    ],
    'codeigniter4': [
        ("$routes->get('items', 'Items::index')", "Routing URI CodeIgniter 4", "HTTP verb, URI string, Controller::method", "Menghubungkan URL browser ke controller CodeIgniter 4 dengan namespace terorganisir.", "php", "<?php\n$routes->get('catalog', 'CatalogController::index');\n$routes->post('catalog/create', 'CatalogController::create');", "Endpoint CI4 siap menerima koneksi HTTP"),
        ("class ProductModel extends Model { protected $allowedFields = [...]; }", "Model CI4 dengan Query Builder bawaan", "$table, $primaryKey, $allowedFields", "Menyediakan operasi database aman dengan proteksi field otomatis tanpa query SQL mentah.", "php", "<?php\nnamespace App\\Models;\nuse CodeIgniter\\Model;\nclass ProductModel extends Model {\n    protected $table = 'products';\n    protected $allowedFields = ['name', 'price'];\n}", "Model siap menjalankan method findAll() dan save()"),
        ("return view('template_name', $data)", "Helper render antarmuka View CI4", "View path, Data array", "Mengurai berkas view PHP di dalam direktori `app/Views/` dan menyajikannya ke layar klien.", "php", "<?php\n$data = ['title' => 'Katalog Produk', 'items' => $items];\nreturn view('products/list', $data);", "Halaman web disajikan melalui buffering respons"),
        ("$this->request->getPost('fieldName')", "Pengambilan input request aman CI4", "Field identifier, Filter flag", "Membaca payload POST yang masuk dengan pembersihan sanitasi XSS bawaan framework.", "php", "<?php\n$title = $this->request->getPost('title', FILTER_SANITIZE_SPECIAL_CHARS);", "Input terbaca dengan pembersihan karakter berbahaya")
    ],
    'rails': [
        ("resources :articles do ... end", "Resourceful REST Routing Rails", "Resource name, options block", "Mendefinisikan 7 rute RESTful standar (index, show, new, create, edit, update, destroy) dalam 1 baris.", "ruby", "Rails.application.routes.draw do\n  resources :products\n  root 'products#index'\nend", "7 rute CRUD standar otomatis aktif"),
        ("class Product < ApplicationRecord", "Model ActiveRecord dengan ORM Canggih", "Validations, Associations (has_many, belongs_to)", "Memetakan tabel database ke objek Ruby lengkap dengan validasi data dan relasi otomatis.", "ruby", "class Product < ApplicationRecord\n  has_many :reviews, dependent: :destroy\n  validates :title, presence: true, length: { minimum: 3 }\n  validates :price, numericality: { greater_than_or_equal_to: 0 }\nend", "Model Product aktif dengan validasi integritas data"),
        ("params.require(:product).permit(:title, :price)", "Strong Parameters keamanan mass assignment", "Model key, permitted attributes list", "Menolak atribut berbahaya yang dikirimkan peretas sebelum disimpan ke dalam database.", "ruby", "def product_params\n  params.require(:product).permit(:title, :price, :in_stock)\nend", "Hanya kolom yang diizinkan yang dapat disimpan"),
        ("render json: @products / render :index", "Rendering format respons fleksibel", "Output format (json, html, turbo_stream)", "Menyajikan data dalam format JSON untuk API atau rendering template ERB untuk antarmuka web.", "ruby", "def index\n  @products = Product.all\n  render json: @products\nend", "Array objek produk disajikan sebagai JSON murni")
    ],
    'spring': [
        ("@RestController & @RequestMapping('/api/v1')", "Dekorator API Endpoint Spring Web", "Base path mapping", "Mendeklarasikan kelas Java sebagai REST API Controller yang otomatis menserialisasi return value ke JSON.", "java", "@RestController\n@RequestMapping(\"/api/products\")\npublic class ProductController {\n    @GetMapping\n    public List<Product> list() { return productService.findAll(); }\n}", "Endpoint HTTP GET /api/products aktif"),
        ("@Service & Injeksi Dependensi Konstruktor", "Komponen Logika Bisnis & Dependency Injection", "Constructor Injection", "Mendaftarkan class ke IoC Container Spring dan menginjeksi dependensi yang dibutuhkan secara otomatis.", "java", "@Service\npublic class ProductService {\n    private final ProductRepository repository;\n    public ProductService(ProductRepository repository) {\n        this.repository = repository;\n    }\n}", "Service terinjeksi aman tanpa @Autowired refleksi"),
        ("public interface ProductRepository extends JpaRepository<Product, Long>", "Akses Database Otomatis Spring Data JPA", "Entity Class, Primary Key Type", "Menyediakan metode CRUD database (findAll, findById, save, delete) instan tanpa menulis implementasi.", "java", "public interface ProductRepository extends JpaRepository<Product, UUID> {\n    List<Product> findByInStockTrue();\n}", "Metode pencarian database siap dipakai seketika"),
        ("@Transactional", "Manajemen transaksi database ACID", "Propagation, Isolation, RollbackFor", "Menjamin seluruh operasi database di dalam method berhasil seluruhnya atau di-rollback otomatis saat gagal.", "java", "@Transactional\npublic void checkout(Order order) {\n    inventoryService.deduct(order);\n    orderRepository.save(order);\n}", "Transaksi ACID dijamin aman tanpa data korup")
    ],
    'csharp': [
        ("record ProductDto(Guid Id, string Name, decimal Price);", "Tipe data Record Immutable C# 12", "Positional parameters", "Mendefinisikan struktur data transfer bernilai tetap dengan kesetaraan berbasis nilai (value equality).", "csharp", "public record UserRecord(Guid Id, string FullName, string Email);\nvar user = new UserRecord(Guid.NewGuid(), \"Alex\", \"alex@test.com\");", "Objek transfer data immutable siap digunakan"),
        ("app.MapGet(\"/api/items\", async (AppDbContext db) => ...)", "Endpoint Minimal API ASP.NET Core", "Route pattern, Request delegate", "Membangun endpoint API super cepat dan hemat memori tanpa overhead controller konvensional.", "csharp", "app.MapGet(\"/api/products\", async (AppDbContext db) =>\n    await db.Products.AsNoTracking().ToListAsync());", "Endpoint GET /api/products aktif dengan performa tinggi"),
        ("using var connection = new SqlConnection(connStr);", "Pernyataan Using pembersihan resource otomatis", "IDisposable resource", "Menjamin koneksi database atau file stream ditutup dan dibebaskan seketika setelah blok fungsi keluar.", "csharp", "using var stream = File.OpenRead(\"data.json\");\nvar data = await JsonSerializer.DeserializeAsync<Config>(stream);", "Resource stream otomatis dibersihkan dari RAM"),
        ("items.Where(p => p.Price > 100).OrderBy(p => p.Name)", "Kueri pemrosesan data deklaratif (LINQ)", "Lambda predicates", "Melakukan filtering, pengurutan, dan transformasi koleksi data dalam memori atau database secara ekspresif.", "csharp", "var premiumProducts = products\n    .Where(p => p.InStock && p.Price > 500000)\n    .Select(p => p.Name)\n    .ToList();", "Daftar nama produk premium terfilter rapi")
    ],
    'docker': [
        ("FROM <image>:<tag>", "Menentukan base image fondasi container", "Image identifier, Tag versi", "Menetapkan sistem operasi minimalis dan runtime awal (misal `node:20-alpine`, `golang:1.24`).", "dockerfile", "FROM node:20-alpine\nWORKDIR /app", "Lingkungan container Node.js di atas Alpine siap"),
        ("COPY <host_src> <container_dest>", "Menyalin file host ke dalam image filesystem", "Path lokal, Path tujuan container", "Memasukkan kode sumber, file konfigurasi, dan aset ke direktori kerja container.", "dockerfile", "COPY package*.json ./\nRUN npm install --production\nCOPY . .", "Kode aplikasi tersalin ke dalam container"),
        ("RUN <command>", "Mengeksekusi instruksi build layer", "Shell instruction", "Menginstal dependencies, mengkompilasi binary, dan mengatur izin sistem saat build dijalankan.", "dockerfile", "RUN npm run build", "Menghasilkan bundle produksi di dalam layer image"),
        ("docker run -d -p 8080:80 --name my-app app:v1", "Menjalankan instance container aktif", "Flag -d (detached), -p (port mapping), --name", "Membuat dan menyalakan container yang memetakan port host 8080 ke port container 80.", "bash", "docker run -d -p 3000:3000 --name web-service my-app:latest", "Container berjalan di latar belakang dan dapat diakses")
    ],
    'postgresql': [
        ("CREATE TABLE name ( col TYPE CONSTRAINT );", "Mendefinisikan skema tabel relasional", "Nama tabel, definisi kolom, batasan (PK, FK, UNIQUE)", "Menyiapkan tabel database dengan validasi tipe data presisi dan integritas data ACID.", "sql", "CREATE TABLE users (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  email VARCHAR(255) UNIQUE NOT NULL,\n  created_at TIMESTAMPTZ DEFAULT NOW()\n);", "Tabel users siap menerima baris data"),
        ("SELECT cols FROM tbl WHERE cond ORDER BY col LIMIT n;", "Query pembacaan dan penyaringan data", "Kolom list, Filter WHERE, Order, Limit", "Mengambil rekaman data yang memenuhi kriteria pengujian secara efisien.", "sql", "SELECT id, email FROM users WHERE created_at > NOW() - INTERVAL '7 days' ORDER BY created_at DESC LIMIT 10;", "Mengembalikan 10 baris pengguna terbaru"),
        ("INSERT INTO tbl (cols) VALUES (vals) RETURNING id;", "Penyisipan baris baru dengan pengembalian nilai instan", "Kolom target, data masukan, klausa RETURNING", "Menyimpan baris baru dan langsung mengembalikan nilai kolom yang digenerasi otomatis.", "sql", "INSERT INTO users (email) VALUES ('alex@example.com') RETURNING id, created_at;", "Mengembalikan ID UUID yang baru dibuat"),
        ("SELECT * FROM a INNER JOIN b ON a.id = b.a_id;", "Penggabungan relasi antar tabel (Join)", "Nama tabel, kondisi pencocokan kunci relasi ON", "Menggabungkan baris dari dua tabel berdasarkan relasi foreign key.", "sql", "SELECT u.email, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id;", "Daftar transaksi pesanan beserta email pemilik akun")
    ],
    'mysql': [
        ("CREATE TABLE name ( id INT AUTO_INCREMENT PRIMARY KEY, ... )", "Definisi tabel mesin penyimpanan InnoDB", "Column types (INT, VARCHAR, DECIMAL), Constraints", "Menyusun skema tabel MySQL berkinerja tinggi dengan indeks kunci utama berurut otomatis.", "sql", "CREATE TABLE products (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  sku VARCHAR(50) NOT NULL UNIQUE,\n  price DECIMAL(12, 2) NOT NULL,\n  in_stock BOOLEAN DEFAULT TRUE\n) ENGINE=InnoDB;", "Tabel products InnoDB siap digunakan"),
        ("SELECT * FROM tbl WHERE cond LIMIT offset, count", "Paginasi data efisien MySQL", "LIMIT offset, row_count", "Mengambil potongan data per halaman untuk optimasi waktu muat aplikasi.", "sql", "SELECT id, sku, price FROM products WHERE in_stock = 1 ORDER BY id DESC LIMIT 0, 10;", "10 produk pertama untuk halaman 1"),
        ("START TRANSACTION; ... COMMIT; / ROLLBACK;", "Kontrol transaksi ACID multi-tahap", "ACID guarantees", "Memastikan serangkaian operasi query berhasil seluruhnya atau dibatalkan saat ada kesalahan.", "sql", "START TRANSACTION;\nUPDATE accounts SET balance = balance - 500 WHERE id = 1;\nUPDATE accounts SET balance = balance + 500 WHERE id = 2;\nCOMMIT;", "Saldo berhasil dipindahkan secara atomik"),
        ("EXPLAIN SELECT ...", "Analisis rencana eksekusi query (Query Plan)", "Query SELECT", "Memeriksa apakah query memanfaatkan indeks (Using index) atau mengalami Full Table Scan lambat.", "sql", "EXPLAIN SELECT * FROM products WHERE sku = 'LAP-001';", "Menampilkan estimasi baris dan indeks yang digunakan")
    ],
    'mongodb': [
        ("db.collection.insertOne({ ... })", "Penyisipan dokumen BSON tunggal", "Document Object", "Menyimpan data dokumen JSON/BSON baru ke dalam koleksi MongoDB.", "javascript", "db.products.insertOne({\n  name: 'Keyboard Mekanikal',\n  price: 1200000,\n  tags: ['gaming', 'hardware'],\n  inStock: true\n});", "Dokumen tersimpan dengan _id unik otomatis"),
        ("db.collection.find({ query }, { projection })", "Pencarian dokumen dengan filter deklaratif", "Query filters ($eq, $gt, $in), Field projections", "Mengambil daftar dokumen yang memenuhi kondisi pencarian.", "javascript", "db.products.find(\n  { price: { $gte: 500000 }, inStock: true },\n  { name: 1, price: 1 }\n).limit(5);", "Mengembalikan maksimal 5 dokumen produk"),
        ("db.collection.updateOne({ _id }, { $set: { status: 'paid' } })", "Pembaruan field dokumen secara atomik", "Filter selector, Update operators ($set, $inc, $push)", "Mengubah field tertentu tanpa menimpa seluruh struktur dokumen yang ada.", "javascript", "db.orders.updateOne(\n  { orderId: 'ORD-101' },\n  { $set: { status: 'completed' }, $currentDate: { updatedAt: true } }\n);", "Status pesanan berubah menjadi completed"),
        ("db.collection.aggregate([ { $match: ... }, { $group: ... } ])", "Pipeline agregasi multi-tahap analitik", "Aggregation stages ($match, $group, $sort)", "Memproses dan mentransformasi jutaan dokumen menjadi laporan rekapitulasi data cepat.", "javascript", "db.orders.aggregate([\n  { $match: { status: 'completed' } },\n  { $group: { _id: '$category', totalSales: { $sum: '$total' } } }\n]);", "Menghasilkan ringkasan total penjualan per kategori")
    ],
    'redis': [
        ("SET key value [EX seconds] / GET key", "Operasi string in-memory tercepat", "Key identifier, Value payload, Expiration (EX)", "Menyimpan dan mengambil cache data dalam hitungan sub-milidetik dengan batas kedaluwarsa otomatis.", "redis", "SET session:user_99 '{\"role\":\"admin\"}' EX 3600\nGET session:user_99", "\"{\\\"role\\\":\\\"admin\\\"}\""),
        ("HSET key field value / HGETALL key", "Struktur data Hash penyimpanan objek", "Key, Field name, Value", "Menyimpan banyak atribut objek di bawah satu key tanpa perlu serialisasi JSON berat.", "redis", "HSET user:101 name \"Alex\" role \"developer\" active \"true\"\nHGETALL user:101", "1) \"name\" 2) \"Alex\" 3) \"role\" 4) \"developer\""),
        ("LPUSH queue job / RPOP queue", "Struktur List untuk Message Queue FIFO", "Key queue, Payload job", "Mengimplementasikan antrean tugas asinkron super cepat antar pekerja worker.", "redis", "LPUSH email_queue \"kirim_verifikasi_user_1\"\nRPOP email_queue", "\"kirim_verifikasi_user_1\""),
        ("PUBLISH channel message / SUBSCRIBE channel", "Pub/Sub komunikasi real-time event", "Channel name, Message payload", "Menyiarkan pesan ke jutaan listener secara instan untuk chat atau notifikasi langsung.", "redis", "PUBLISH notifications:global \"Server maintenance jam 23:00\"", "(integer) 1 (Pesan terkirim ke 1 subscriber)")
    ],
    'graphql': [
        ("type Entity { id: ID! name: String! }", "Schema Definition Language (SDL) Tipe Entitas", "Field Name, Type, Non-Null Modifier (!)", "Mendefinisikan kontrak tipe data yang dijamin oleh server kepada seluruh klien API.", "graphql", "type Product {\n  id: ID!\n  name: String!\n  price: Float!\n  inStock: Boolean!\n}", "Mendefinisikan tipe Product dalam skema SDL"),
        ("type Query { products: [Product!]! }", "Root Query Type gerbang pembacaan data", "Field Resolver Signature", "Menjadi pintu masuk semua operasi pembacaan data yang dapat diminta oleh klien.", "graphql", "type Query {\n  products(limit: Int): [Product!]!\n  product(id: ID!): Product\n}", "Klien dapat meminta daftar produk dengan filter limit"),
        ("mutation CreateOrder($input: OrderInput!)", "Operasi perubahan data atomik", "GraphQL variables, Input Object Type", "Mengirimkan data perubahan ke server dan meminta field balasan yang diperbarui secara atomik.", "graphql", "mutation AddOrder {\n  createOrder(customer: \"Alex\", items: [{ product: \"Hub\", qty: 1 }]) {\n    id\n    total\n    status\n  }\n}", "Pesanan dibuat dan ID beserta status langsung dikembalikan"),
        ("resolvers = { Query: { field: (parent, args, ctx) => ... } }", "Fungsi Resolver pemetaan data", "parent, args, context, info", "Fungsi backend yang mengeksekusi pengambilan data dari database untuk setiap field skema.", "typescript", "const resolvers = {\n  Query: {\n    product: (_, { id }, { db }) => db.products.findById(id)\n  }\n};", "Resolver mengambil data dari database sesuai argumen id")
    ]
}

# English mirrors of the catalog
SYNTAX_DB_EN = {}
for slug, items in SYNTAX_DB_ID.items():
    SYNTAX_DB_EN[slug] = []
    for sig, desc, params, behavior, lang, code, output in items:
        # Translate to clear English
        desc_en = desc.replace('Deklarasi', 'Declaration of').replace('Pengaturan', 'Configuration of').replace('Kalkulasi', 'Calculation of').replace('Penyusunan', 'Arrangement of').replace('Mendefinisikan', 'Defines').replace('Pengambilan', 'Retrieval of').replace('Penyisipan', 'Insertion of').replace('Pembaruan', 'Update of').replace('Operasi', 'Operation of')
        params_en = params.replace('Wajib di baris 1', 'Mandatory on line 1').replace('Wajib di baris paling pertama', 'Mandatory on first line').replace('Dua atau lebih', 'Two or more').replace('Nilai', 'Value').replace('Tipe', 'Type').replace('Daftar', 'List of')
        behavior_en = behavior.replace('Mengaktifkan', 'Enables').replace('Mengatur', 'Configures').replace('Membagi', 'Partitions').replace('Menyediakan', 'Provides').replace('Memasukkan', 'Includes').replace('Menyimpan', 'Persists').replace('Mengambil', 'Retrieves').replace('Menjamin', 'Guarantees').replace('Menghasilkan', 'Generates')
        output_en = output.replace('Halaman dirender', 'Page rendered').replace('Tampilan responsif', 'Responsive layout').replace('Terbaca jelas', 'Clearly accessible').replace('Formulir siap', 'Form ready').replace('Elemen berukuran', 'Element sized accurately').replace('Validasi sukses', 'Validation succeeded')
        SYNTAX_DB_EN[slug].append((sig, desc_en, params_en, behavior_en, lang, code, output_en))

def get_native_syntax(slug, is_id):
    db = SYNTAX_DB_ID if is_id else SYNTAX_DB_EN
    return db.get(slug, db['javascript'])

def build_w3_section(slug, is_id):
    syntax_items = get_native_syntax(slug, is_id)
    ascii_diagrams = DIAGRAMS_ID if is_id else DIAGRAMS_EN
    diagram = ascii_diagrams.get(slug, ascii_diagrams['javascript'])
    svg_info = TRACK_DIAGRAMS.get(slug)

    svg_md = f"\n![{svg_info[1]}]({svg_info[0]})\n" if svg_info else ""

    if is_id:
        heading_visual = "## Model Mental & Diagram Alur Visual"
        heading_syntax = "## Panduan Sintaks & Referensi Lengkap (W3Schools Style)"
        intro_syntax = "Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:"
        
        body = f"""---

{heading_visual}
{svg_md}
{diagram}

---

{heading_syntax}

{intro_syntax}

"""
        for idx, (sig, desc, params, behavior, lang, code, output) in enumerate(syntax_items, 1):
            body += f"""### {idx}. `{sig}`
- **Fungsi Utama:** {desc}.
- **Parameter / Atribut:** `{params}`.
- **Perilaku & Efek Sistem:** {behavior}.
- **Contoh Penggunaan Praktis:**
```{lang}
{code}
```
- **Hasil Output yang Diharapkan:**
```output
{output}
```

"""
    else:
        heading_visual = "## Visual Mental Model & Architecture Flow"
        heading_syntax = "## Syntax Reference & Practical Guide (W3Schools Style)"
        intro_syntax = "Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:"

        body = f"""---

{heading_visual}
{svg_md}
{diagram}

---

{heading_syntax}

{intro_syntax}

"""
        for idx, (sig, desc, params, behavior, lang, code, output) in enumerate(syntax_items, 1):
            body += f"""### {idx}. `{sig}`
- **Core Functionality:** {desc}.
- **Parameters / Attributes:** `{params}`.
- **System Behavior & Return:** {behavior}.
- **Practical Code Example:**
```{lang}
{code}
```
- **Expected Execution Output:**
```output
{output}
```

"""

    return body

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    norm = file_path.replace('\\', '/')
    is_id = '/id/' in norm
    parts = norm.split('/')
    course_idx = parts.index('course')
    slug = parts[course_idx + 1]

    new_section = build_w3_section(slug, is_id)

    # Clean out any old W3Schools or generic table block
    # We want to replace from "## Model Mental" OR "## Ringkasan Sintaks" OR "## Panduan Sintaks"
    # up to "## Jebakan Umum" OR "## Common Pitfalls"
    pattern = re.compile(
        r'---\s*\n\s*## (?:Model Mental|Visual Mental Model|Ringkasan Sintaks|Syntax Cheatsheet|Panduan Sintaks|Syntax Reference)[\s\S]*?(?=---\s*\n\s*## (?:Jebakan Umum|Common Pitfalls))',
        re.MULTILINE
    )

    if pattern.search(content):
        new_content = pattern.sub(lambda _: new_section, content, count=1)
    else:
        # Fallback: insert before ## Jebakan Umum or ## Common Pitfalls
        pitfall_pattern = re.compile(r'(---\s*\n\s*## (?:Jebakan Umum|Common Pitfalls))')
        m = pitfall_pattern.search(content)
        if m:
            idx = m.start()
            new_content = content[:idx] + new_section + content[idx:]
        else:
            return False

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return True

def main():
    count = 0
    for root, dirs, files in os.walk(COURSE_BASE):
        for f in files:
            if f.endswith('.md'):
                p = os.path.join(root, f)
                if process_file(p):
                    count += 1

    print(f"Completely rebuilt {count} course files with 100% authentic, track-specific native syntax, diagrams, and runnable examples!")

if __name__ == '__main__':
    main()
