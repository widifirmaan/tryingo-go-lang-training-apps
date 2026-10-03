import os
import re

APP_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
COURSE_BASE = os.path.join(APP_ROOT, 'public/data/course')

# SVG Diagram mapping per track / theme
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

# Rich ASCII Mental Model Diagrams per track
ASCII_DIAGRAMS_ID = {
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
    'golang': """```diagram
┌────────────────┐                     ┌────────────────┐
│  GOROUTINE A   │                     │  GOROUTINE B   │
│  (Worker Thread)                     │  (Consumer)    │
│  ch <- 42      │ ─── Kirim Data ──► │  val := <-ch   │
└────────────────┘   [ CHANNEL: chan ] └────────────────┘
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

ASCII_DIAGRAMS_EN = {
    'html5': """```diagram
┌──────────────────────────────────────────────────────────┐
│                   <!DOCTYPE html>                        │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ <html lang="en">                                     │ │
│ │  ┌─────────────────────────┐ ┌─────────────────────┐ │ │
│ │  │ <head> (Metadata)       │ │ <body> (Visible UI) │ │ │
│ │  │ • <meta charset="UTF-8">│ │ • <header>          │ │ │
│ │  │ • <title>Document</title>│ • <main>             │ │ │
│ │  │ • <meta name="viewport">│ │ • <footer>          │ │ │
│ │  └─────────────────────────┘ └─────────────────────┘ │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```""",
    'css3': """```diagram
┌──────────────────────────────────────────────────────────┐
│ MARGIN (Outer Transparent Space)                         │
│   ┌──────────────────────────────────────────────────┐   │
│   │ BORDER (Decorative Outline / Frame)              │   │
│   │   ┌──────────────────────────────────────────┐   │   │
│   │   │ PADDING (Inner Breathing Room)           │   │   │
│   │   │   ┌──────────────────────────────────┐   │   │   │
│   │   │   │ CONTENT (Rendered Width x Height)│   │   │   │
│   │   │   └──────────────────────────────────┘   │   │   │
│   │   └──────────────────────────────────────────┘   │   │
│   └──────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```""",
    'javascript': """```diagram
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```""",
    'react': """```diagram
     ┌────────────────────────┐
     │    PARENT COMPONENT    │ ◄─── Updates State via Setter
     │  (Holds Single State)  │
     └───────────┬────────────┘
                 │ Props Down (Unidirectional Flow ⬇)
     ┌───────────┴────────────┐
     ▼                        ▼
┌──────────────┐       ┌──────────────┐
│  Child Card  │       │ Action Btn   │ ─── Event Callback Up (⬆)
│ (Reads Props)│       │ (Calls Prop) │
└──────────────┘       └──────────────┘
```""",
    'golang': """```diagram
┌────────────────┐                     ┌────────────────┐
│  GOROUTINE A   │                     │  GOROUTINE B   │
│  (Worker Thread)                     │  (Consumer)    │
│  ch <- 42      │ ─── Pass Data ───►  │  val := <-ch   │
└────────────────┘   [ CHANNEL: chan ] └────────────────┘
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
│ id (PK: UUID)      │ ◄── 1-N Rel ─── │ id (PK: UUID)      │
│ email (UNIQUE)     │                 │ user_id (FK -> PK) │
│ created_at         │                 │ total_amount       │
└────────────────────┘                 └────────────────────┘
```""",
    'graphql': """```diagram
┌─────────────────────────────────────────────────────────┐
│ CLIENT: Sends Single Declarative Query (Exact Fields)   │
│ POST /graphql { query { user { id name orders { id } } }│
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│ GRAPHQL SERVER: SDL Schema & Resolver Tree              │
│ 1. Resolves Query.user -> Calls Database                │
│ 2. Resolves User.orders -> Calls Payment Microservice   │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│ RESPONSE: Pure JSON Mirroring Query Structure           │
│ { "data": { "user": { "name": "Alex", "orders": [...] }}}│
└─────────────────────────────────────────────────────────┘
```""",
}

# Core Syntax Reference database per language
SYNTAX_CATALOG_ID = {
    'html5': [
        ("<!DOCTYPE html>", "Deklarasi standar dokumen HTML5", "Wajib di baris 1", "Mengaktifkan rendering Standard Mode pada peramban web modern.", "<!DOCTYPE html>\n<html lang=\"id\">\n  <head><title>Tryngo</title></head>\n</html>", "Halaman dirender sesuai spesifikasi HTML5 W3C"),
        ("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">", "Pengaturan viewport perangkat mobile", "name, content", "Mengatur skala layar perangkat 1:1 agar website responsif tanpa zoom bawaan yang mengecilkan font.", "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">", "Tampilan menyesuaikan lebar layar ponsel secara otomatis"),
        ("<header>, <main>, <footer>", "Elemen penanda semantik (Landmark Elements)", "Global attributes (class, id, lang)", "Membagi dokumen menjadi banner navigasi, konten unik utama, dan informasi kaki untuk aksesibilitas screen reader.", "<header><h1>Judul Portal</h1></header>\n<main><p>Konten artikel utama.</p></main>\n<footer>&copy; 2026 Tryngo</footer>", "Struktur dokumen terbaca jelas oleh mesin pencari & pembaca tuna netra"),
        ("<form action=\"/api\" method=\"POST\">", "Kontainer pengumpulan data pengguna", "action (URL), method (GET/POST)", "Menyediakan form interaktif untuk mengirimkan data input ke server endpoint.", "<form action=\"/submit\" method=\"POST\">\n  <input type=\"text\" name=\"username\" required />\n  <button type=\"submit\">Kirim</button>\n</form>", "Formulir interaktif siap dikirimkan ke backend")
    ],
    'css3': [
        ("box-sizing: border-box;", "Pengubah kalkulasi Box Model universal", "border-box | content-box", "Memasukkan padding dan border ke dalam kalkulasi total lebar (width) elemen sehingga elemen tidak meluap keluar kontainer.", "* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}", "Elemen berukuran presisi tanpa kalkulasi manual tambahan"),
        ("display: flex; justify-content: space-between; align-items: center;", "Penyusunan tata letak satu dimensi (Flexbox)", "flex-direction, justify-content, align-items", "Mengatur perataan dan distribusi ruang kosong antar item anak secara fleksibel di sumbu utama dan sumbu silang.", ".navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n}", "Item navbar terdistribusi rapi di ujung kiri dan kanan"),
        ("display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));", "Sistem kisi dua dimensi responsif", "grid-template-columns, gap", "Menyusun grid adaptif yang otomatis menyesuaikan jumlah kolom berdasarkan lebar layar tanpa media query.", ".card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 1.5rem;\n}", "Kartu otomatis menyusun 1, 2, atau 3 kolom sesuai layar"),
        ("transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);", "Animasi transisi status interaktif", "property, duration, timing-function", "Memberikan efek perubahan visual yang mulus saat elemen mengalami perubahan status (misal hover/focus).", ".btn {\n  background-color: #2E5B44;\n  transition: transform 0.2s ease, background 0.2s ease;\n}\n.btn:hover {\n  transform: translateY(-2px);\n  background-color: #1f3d2e;\n}", "Tombol terangkat halus 2px saat kursor mouse diarahkan")
    ],
    'javascript': [
        ("const / let variabel", "Deklarasi variabel modern lingkup blok (Block Scope)", "Identifier, Initial Value", "`const` untuk referensi konstan yang tidak dapat di-reassign; `let` untuk variabel nilai dinamis.", "const appName = 'Tryngo';\nlet counter = 0;\ncounter += 1;\nconsole.log(appName, counter);", "Tryngo 1"),
        ("() => { ... } (Arrow Function)", "Sintaks fungsi ringkas dengan lexical 'this'", "Parameters, Function Body", "Menyederhanakan penulisan fungsi dan mempertahankan konteks `this` dari lingkup pembungkus luar.", "const multiply = (a, b) => a * b;\nconsole.log(multiply(6, 7));", "42"),
        ("async / await & fetch(url)", "Penanganan operasi asinkron berbasis Promise", "URL string, RequestInit options", "Menulis kode asinkron dengan alur linier layaknya kode sinkron tanpa callback hell.", "async function fetchUser(id) {\n  const res = await fetch(`https://api.example.com/users/${id}`);\n  const data = await res.json();\n  return data;\n}", "Mengembalikan objek data JSON terurai dari server"),
        ("Array.prototype.map() / filter()", "Transformasi array fungsional tanpa mutasi data asal", "callback(item, index, array)", "`map` menghasilkan array baru dari hasil transformasi; `filter` menyaring elemen berdasarkan kondisi boolean.", "const numbers = [1, 2, 3, 4, 5];\nconst doubledEvens = numbers\n  .filter(n => n % 2 === 0)\n  .map(n => n * 2);\nconsole.log(doubledEvens);", "[4, 8]")
    ],
    'typescript': [
        ("interface Name { prop: Type; }", "Mendefinisikan kontrak bentuk objek terstruktur", "Field names, Types, Optional (?)", "Menjamin seluruh objek yang dibuat mematuhi struktur tipe yang ditentukan secara ketat saat compile-time.", "interface Student {\n  id: string;\n  name: string;\n  gpa?: number;\n}\nconst alex: Student = { id: 's1', name: 'Alex' };", "Validasi kompilasi berhasil tanpa error type mismatch"),
        ("type Union = TypeA | TypeB", "Tipe gabungan multi-kondisi (Union Type)", "Dua atau lebih definisi tipe", "Mengizinkan variabel memiliki salah satu dari sekumpulan nilai atau struktur tipe yang diizinkan.", "type Status = 'pending' | 'success' | 'failed';\nlet currentStatus: Status = 'success';", "Hanya menerima 3 kemungkinan string yang dideklarasikan"),
        ("function genericFn<T>(arg: T): T", "Fungsi tipe dinamis aman (Generics)", "Type Parameter T", "Memungkinkan pembuatan fungsi atau struktur kelas yang dapat bekerja dengan beragam tipe data dengan tetap menjaga type-safety.", "function getFirst<T>(items: T[]): T | undefined {\n  return items[0];\n}\nconst firstNum = getFirst([10, 20]); // Type: number", "10 (dengan inferensi tipe number murni)"),
        ("Partial<T> / Pick<T, K> / Omit<T, K>", "Tipe utilitas bawaan TypeScript", "Type T, Keys K", "Mentransformasi struktur tipe yang sudah ada menjadi opsional (`Partial`) atau mengambil subset field spesifik.", "interface Product { id: string; name: string; price: number; }\ntype UpdateProductDto = Partial<Product>;", "Semua properti Product berubah menjadi opsional untuk update")
    ],
    'react': [
        ("const [state, setState] = useState(initialValue)", "Hook penyimpanan state lokal komponen", "initialValue", "Menyimpan data reaktif komponen. Memanggil setter memicu re-render UI secara otomatis dan terisolasi.", "const [count, setCount] = useState(0);\n// Memanggil: setCount(prev => prev + 1);", "Komponen memperbarui angka count di layar"),
        ("useEffect(() => { ... }, [dependencies])", "Hook efek samping (Lifecycle, Data Fetching, Subscription)", "Effect Callback, Dependency Array", "Menjalankan logika sampingan setelah komponen di-render dan membersihkannya saat unmount.", "useEffect(() => {\n  const timer = setInterval(() => console.log('Ping'), 1000);\n  return () => clearInterval(timer);\n}, []);", "Timer berjalan 1x saat mount dan dibersihkan saat unmount"),
        ("function Component(props) { return <JSX /> }", "Deklarasi Komponen Fungsi Dasar", "props object", "Blok bangunan independen dan dapat digunakan kembali yang mengubah data props menjadi elemen visual.", "function Badge({ label }: { label: string }) {\n  return <span className=\"badge\">{label}</span>;\n}", "Elemen visual badge ter-render dengan teks label"),
        ("useContext(MyContext)", "Konsumsi state global tanpa prop-drilling", "React Context Object", "Membaca nilai state dari Context Provider terdekat di pohon hierarki komponen.", "const { theme, toggleTheme } = useContext(ThemeContext);", "Mendapatkan akses instan ke nilai tema global")
    ],
    'golang': [
        ("var x int / x := 42", "Deklarasi variabel statis dan deklarasi pendek (Short Declaration)", "Identifier, Type / Value", "`:=` menginferensi tipe data secara otomatis di dalam fungsi; `var` digunakan untuk deklarasi paket atau nilai default.", "age := 25\nname := \"Alex Iskandar\"\nfmt.Printf(\"%s berusia %d tahun\\n\", name, age);", "Alex Iskandar berusia 25 tahun"),
        ("func (r Receiver) Method() ReturnType", "Penerapan Method pada Struct (OOP ala Go)", "Receiver (value/pointer), Parameters", "Menghubungkan fungsi khusus ke tipe struct untuk membentuk perilaku objek tanpa class inheritance hierarki.", "type User struct { Name string }\nfunc (u User) Greet() string {\n  return \"Halo, \" + u.Name\n}", "Mengembalikan string sapaan personal"),
        ("go func() { ... }()", "Eksekusi thread ringan konkuren (Goroutine)", "Fungsi anonim / fungsi bernama", "Menjalankan komputasi di thread runtime Go yang sangat ringan (hanya ~2KB memori awal).", "go func() {\n  fmt.Println(\"Berjalan konkuren di goroutine terpisah!\")\n}()", "Dieksekusi asinkron tanpa memblokir alur utama program"),
        ("ch := make(chan string); ch <- val; val := <-ch", "Saluran komunikasi antar goroutine (Channel)", "Tipe data channel, kapasitas buffer", "Mengirim dan menerima data antar goroutine dengan sinkronisasi bawaan tanpa perlu lock/mutex manual.", "ch := make(chan int)\ngo func() { ch <- 100 }()\nresult := <-ch\nfmt.Println(\"Diterima:\", result);", "Diterima: 100")
    ],
    'rust': [
        ("let x: i32 = 5; let mut y = 10;", "Deklarasi variabel immutable default & mutable", "Tipe data (i32, f64, String), mut keyword", "Rust secara default mengunci variabel agar tidak bisa diubah guna menjamin keamanan memori tanpa garbage collector.", "let mut score = 50;\nscore += 25;\nprintln!(\"Score: {}\", score);", "Score: 75"),
        ("&T (Immutable Borrow) vs &mut T (Mutable Borrow)", "Peminjaman referensi memori (Borrowing)", "Referensi variabel", "Mengizinkan pembacaan data tanpa memindahkan kepemilikan (ownership) dengan aturan ketat: 1 mutable borrow ATAU banyak immutable borrow.", "fn print_len(s: &String) {\n  println!(\"Panjang: {}\", s.len());\n}", "Membaca panjang string tanpa menghapus variabel asal"),
        ("match value { Pattern => Action }", "Pencocokan pola menyeluruh (Pattern Matching)", "Ekspresi, Arms", "Mengevaluasi setiap kemungkinan kondisi secara lengkap (kompiler memaksa semua cabang tertangani).", "let status = Some(200);\nmatch status {\n  Some(code) => println!(\"Status OK: {}\", code),\n  None => println!(\"Tidak ada data\"),\n}", "Status OK: 200"),
        ("Result<T, E> & Operator ?", "Penanganan kegagalan idiomatik tanpa exception", "Ok(T), Err(E)", "Mengembalikan nilai sukses atau error terstruktur, dan operator `?` untuk meneruskan error ke pemanggil.", "fn read_data() -> Result<String, std::io::Error> {\n  let content = std::fs::read_to_string(\"config.txt\")?;\n  Ok(content)\n}", "Mengembalikan isi file atau meneruskan kegagalan I/O")
    ],
    'docker': [
        ("FROM <image>:<tag>", "Menentukan base image awal", "Nama image, Versi/Tag", "Fondasi sistem operasi dan runtime aplikasi (misal `node:20-alpine`, `golang:1.24`).", "FROM node:20-alpine\nWORKDIR /app", "Menyiapkan lingkungan Node.js di atas sistem operasi Alpine Linux"),
        ("COPY <src> <dest>", "Menyalin file lokal ke dalam image filesystem", "Path file host, Path tujuan container", "Memasukkan kode sumber, file konfigurasi, dan aset ke direktori kerja container.", "COPY package*.json ./\nRUN npm install\nCOPY . .", "Kode aplikasi tersalin ke dalam container untuk dijalankan"),
        ("RUN <command>", "Mengeksekusi perintah build pembuatan layer", "Shell command", "Menginstal dependencies, mengkompilasi binary, dan mengatur izin sistem.", "RUN npm run build", "Menghasilkan bundle produksi di dalam layer image"),
        ("docker run -d -p 8080:80 --name web app:v1", "Menjalankan container dari image", "Flag -d (detached), -p (port mapping), --name", "Membuat dan menyalakan instance container aktif yang memetakan port host 8080 ke port container 80.", "docker run -d -p 3000:3000 my-app", "Aplikasi web aktif dan dapat diakses di http://localhost:3000")
    ],
    'postgresql': [
        ("CREATE TABLE name ( col TYPE CONSTRAINT );", "Mendefinisikan skema tabel relasional", "Nama tabel, definisi kolom, batasan (PK, FK, NOT NULL)", "Menyiapkan tabel database dengan validasi tipe data presisi dan integritas data.", "CREATE TABLE users (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  email VARCHAR(255) UNIQUE NOT NULL,\n  created_at TIMESTAMPTZ DEFAULT NOW()\n);", "Tabel users siap menerima baris data"),
        ("SELECT cols FROM tbl WHERE cond ORDER BY col LIMIT n;", "Query pembacaan dan penyaringan data", "Daftar kolom, kondisi WHERE, klausa urutan dan limit", "Mengambil rekaman data yang memenuhi kriteria pengujian secara efisien.", "SELECT id, email FROM users WHERE created_at > NOW() - INTERVAL '7 days' ORDER BY created_at DESC LIMIT 10;", "Mengembalikan 10 baris pengguna terbaru"),
        ("INSERT INTO tbl (cols) VALUES (vals) RETURNING id;", "Penyisipan baris baru dengan pengembalian nilai instan", "Kolom target, data masukan, klausa RETURNING", "Menyimpan data baru dan langsung mengembalikan nilai kolom yang digenerasi otomatis (seperti ID atau timestamp).", "INSERT INTO users (email) VALUES ('alex@example.com') RETURNING id, created_at;", "Mengembalikan ID UUID yang baru dibuat"),
        ("SELECT * FROM a INNER JOIN b ON a.id = b.a_id;", "Penggabungan relasi antar tabel (Join)", "Nama tabel, kondisi pencocokan kunci relasi ON", "Menggabungkan baris dari dua tabel berdasarkan relasi foreign key.", "SELECT u.email, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id;", "Daftar transaksi pesanan beserta email pemilik akun")
    ],
    'graphql': [
        ("type Entity { id: ID! field: Type! }", "Schema Definition Language (SDL) Tipe Entitas", "Field Name, Type, Non-Null Modifier (!)", "Mendefinisikan struktur kontrak data yang dijamin oleh server kepada klien.", "type Product {\n  id: ID!\n  name: String!\n  price: Float!\n  inStock: Boolean!\n}", "Mendefinisikan tipe Product dalam skema"),
        ("type Query { products: [Product!]! }", "Root Query Type titik masuk pembacaan data", "Field Resolver Signature", "Menjadi pintu gerbang semua operasi pembacaan data yang dapat diminta oleh klien.", "type Query {\n  products(limit: Int): [Product!]!\n  product(id: ID!): Product\n}", "Klien dapat meminta daftar produk dengan filter opsional limit"),
        ("mutation CreateOrder($input: OrderInput!)", "Operasi perubahan state data (Insert/Update/Delete)", "Parameter variabel GraphQL, Input Type", "Mengirimkan data perubahan ke server dan meminta field balasan yang diperbarui secara atomik.", "mutation {\n  createOrder(customer: \"Alex\", items: [{ product: \"Mouse\", qty: 1 }]) {\n    id\n    total\n    status\n  }\n}", "Pesanan dibuat dan ID beserta status langsung dikembalikan"),
        ("resolvers = { Query: { field: (parent, args, ctx) => ... } }", "Fungsi Resolver pemetaan data", "parent, args, context, info", "Fungsi backend yang mengeksekusi pengambilan data dari database atau layanan lain untuk setiap field skema.", "const resolvers = {\n  Query: {\n    product: (_, { id }, { db }) => db.products.findById(id)\n  }\n};", "Resolver mengambil data dari database sesuai argumen id")
    ]
}

# English catalog definitions
SYNTAX_CATALOG_EN = {
    'html5': [
        ("<!DOCTYPE html>", "Document type preamble", "Must be placed on line 1", "Instructs web browsers to render the document in modern Standard Mode, avoiding legacy Quirks Mode rendering quirks.", "<!DOCTYPE html>\n<html lang=\"en\">\n  <head><title>Tryngo Platform</title></head>\n</html>", "Page renders strictly compliant with W3C HTML5 standards"),
        ("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">", "Responsive mobile viewport configuration", "name, content", "Aligns viewport coordinates 1:1 with device physical pixels, preventing mobile browsers from shrinking text.", "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">", "Layout adapts dynamically to mobile, tablet, and desktop viewports"),
        ("<header>, <main>, <footer>", "Semantic ARIA landmark structural elements", "Global attributes (class, id, lang)", "Partitions documents into navigation headers, main content, and footer regions for accessibility screen readers.", "<header><h1>News Feed</h1></header>\n<main><p>Primary article content.</p></main>\n<footer>&copy; 2026 Tryngo</footer>", "Provides accessible landmark navigation for screen readers and SEO crawlers"),
        ("<form action=\"/api\" method=\"POST\">", "Interactive user input container", "action (target URL), method (GET/POST)", "Collects and packages validated user form inputs for HTTP submission to server endpoints.", "<form action=\"/submit\" method=\"POST\">\n  <input type=\"text\" name=\"username\" required />\n  <button type=\"submit\">Submit</button>\n</form>", "Form inputs serialized and transmitted on submit")
    ],
    'css3': [
        ("box-sizing: border-box;", "Universal Box Model recalculation", "border-box | content-box", "Includes padding and borders within calculated element width and height, preventing layout breakage and overflows.", "* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}", "Elements respect exact specified dimensions without expanding"),
        ("display: flex; justify-content: space-between; align-items: center;", "One-dimensional Flexbox layout system", "flex-direction, justify-content, align-items", "Distributes empty space and aligns child items along primary and cross axes flexibly.", ".navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n}", "Navbar brand and links pinned cleanly to opposite edges"),
        ("display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));", "Two-dimensional responsive grid layout", "grid-template-columns, gap", "Constructs responsive card grids that automatically calculate column counts without manual media queries.", ".card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 1.5rem;\n}", "Items rearrange smoothly into 1, 2, or 3 columns"),
        ("transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);", "Interactive state change animation", "property, duration, timing-function", "Interpolates CSS property changes smoothly when hover, focus, or active states trigger.", ".btn {\n  background-color: #2E5B44;\n  transition: transform 0.2s ease;\n}\n.btn:hover {\n  transform: translateY(-2px);\n}", "Button glides up 2px smoothly when hovered")
    ],
    'javascript': [
        ("const / let variables", "Modern block-scoped variable declarations", "Identifier, Initial Value", "`const` defines immutable references; `let` defines reassignable state variables bounded to enclosing blocks.", "const title = 'Tryngo Learning';\nlet counter = 0;\ncounter += 1;\nconsole.log(title, counter);", "Tryngo Learning 1"),
        ("() => { ... } (Arrow Function)", "Compact function expression with lexical 'this'", "Parameters, Function Body", "Provides concise function syntax while retaining the lexical `this` binding of the outer enclosing scope.", "const double = (n) => n * 2;\nconsole.log(double(21));", "42"),
        ("async / await & fetch(url)", "Linear asynchronous Promise resolution", "URL string, RequestInit options", "Author asynchronous asynchronous workflows sequentially without callback pyramids.", "async function getUser(id) {\n  const res = await fetch(`https://api.example.com/users/${id}`);\n  return await res.json();\n}", "Returns resolved JSON object from server"),
        ("Array.prototype.map() / filter()", "Pure functional array transformation", "callback(item, index, array)", "`map` returns transformed values; `filter` removes non-matching elements without mutating the original array.", "const numbers = [1, 2, 3, 4, 5];\nconst evens = numbers.filter(n => n % 2 === 0);\nconsole.log(evens);", "[2, 4]")
    ],
    'typescript': [
        ("interface Name { prop: Type; }", "Strongly typed object contract definition", "Field names, Types, Optional (?)", "Enforces compile-time structural contracts across object literals, classes, and function parameters.", "interface User {\n  id: string;\n  name: string;\n  role?: string;\n}\nconst u: User = { id: 'u1', name: 'Alex' };", "Compile-time validation succeeds with zero type errors"),
        ("type Union = TypeA | TypeB", "Disjoint union type combination", "Two or more distinct types", "Restricts variable assignments strictly to predefined variants or primitive literal choices.", "type Status = 'idle' | 'loading' | 'success';\nlet s: Status = 'loading';", "Guarantees only one of the 3 specified string literals can be assigned"),
        ("function genericFn<T>(arg: T): T", "Type-safe reusable generic abstraction", "Type Parameter T", "Enables creation of parameterized functions and collections while preserving concrete type information.", "function wrap<T>(item: T): { data: T } {\n  return { data: item };\n}\nconst w = wrap(42); // Type: { data: number }", "{ data: 42 }"),
        ("Partial<T> / Pick<T, K> / Omit<T, K>", "Built-in utility type transformations", "Base Type T, Selected Keys K", "Transforms existing types into optional variants (`Partial`) or selects field subsets cleanly.", "interface Item { id: string; name: string; price: number; }\ntype PatchItem = Partial<Item>;", "All properties become optional for update requests")
    ],
    'react': [
        ("const [state, setState] = useState(initialValue)", "Component local reactive state hook", "initialValue", "Maintains local component state and automatically triggers UI re-renders on state setter invocation.", "const [count, setCount] = useState(0);\n// Later: setCount(c => c + 1);", "Triggers isolated reactive UI re-render"),
        ("useEffect(() => { ... }, [deps])", "Side-effect lifecycle hook", "Effect Callback, Dependency Array", "Handles API calls, subscriptions, and DOM updates after rendering, running cleanup callbacks on unmount.", "useEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);", "Updates browser document title whenever count changes"),
        ("function Component(props) { return <JSX /> }", "Pure Functional Component definition", "props object", "Reusable architectural building block mapping incoming property data to declarative UI markup.", "function Avatar({ url }: { url: string }) {\n  return <img src={url} alt=\"User\" className=\"rounded-full\" />;\n}", "Renders round user avatar image element"),
        ("useContext(MyContext)", "Global context subscription hook", "React Context Object", "Accesses global application state without tedious multi-level property drilling.", "const { theme } = useContext(ThemeContext);", "Reads ambient theme preference directly from provider")
    ],
    'golang': [
        ("var x int / x := 42", "Type-safe variable declaration and short assignment", "Identifier, Type / Value", "`:=` infers concrete types dynamically in function bodies; `var` sets deterministic zero values.", "counter := 10\nfmt.Println(\"Counter:\", counter)", "Counter: 10"),
        ("func (r Receiver) Method() ReturnType", "Struct receiver method binding", "Receiver instance, Parameters", "Associates behaviors directly with struct types without classical inheritance hierarchies.", "type Point struct { X, Y int }\nfunc (p Point) Sum() int {\n  return p.X + p.Y\n}", "Evaluates method computation over struct fields"),
        ("go func() { ... }()", "Lightweight concurrent Goroutine dispatch", "Anonymous / Named function", "Launches asynchronous task execution scheduled cooperatively by the Go runtime (~2KB stack footprint).", "go func() {\n  fmt.Println(\"Running asynchronously!\")\n}()", "Executes concurrently without blocking the main OS thread"),
        ("ch := make(chan int); ch <- 1; v := <-ch", "Thread-safe CSP Channel pipeline", "Element Type, Buffer capacity", "Transmits values synchronously between Goroutines with zero manual mutex or lock synchronization.", "ch := make(chan int)\ngo func() { ch <- 42 }()\nfmt.Println(<-ch)", "42")
    ],
    'rust': [
        ("let x = 5; let mut y = 10;", "Default immutable and mutable binding", "Variable identifier, mut keyword", "Rust defaults variables to read-only guarantees to eliminate race conditions and unexpected mutations.", "let mut health = 100;\nhealth -= 20;\nprintln!(\"Health: {}\", health);", "Health: 80"),
        ("&T (Borrow) vs &mut T (Mutable Borrow)", "Strict reference borrowing model", "Referenced memory location", "Permits data inspection without moving ownership, enforcing either one mutable borrow OR multiple shared borrows.", "fn display_len(s: &String) {\n  println!(\"Length: {}\", s.len());\n}", "Inspects string length while preserving caller ownership"),
        ("match value { Pattern => Action }", "Exhaustive algebraic pattern matching", "Expression, Match arms", "Evaluates all enum variants with compile-time verification ensuring no condition is left unhandled.", "let res: Option<i32> = Some(10);\nmatch res {\n  Some(v) => println!(\"Value: {}\", v),\n  None => println!(\"Empty\"),\n}", "Value: 10"),
        ("Result<T, E> & Operator ?", "Deterministic functional error propagation", "Ok(T), Err(E)", "Avoids runtime exceptions by passing structured errors upward using the concise `?` propagation operator.", "fn load_file() -> Result<String, std::io::Error> {\n  let data = std::fs::read_to_string(\"app.log\")?;\n  Ok(data)\n}", "Returns file contents or bubbles I/O error upwards cleanly")
    ],
    'docker': [
        ("FROM <image>:<tag>", "Initial container image base declaration", "Image name, Version tag", "Establishes the minimal operating system distribution and toolchain dependencies.", "FROM node:20-alpine\nWORKDIR /app", "Configures lightweight Alpine Linux runtime foundation"),
        ("COPY <src> <dest>", "Host to container filesystem transfer", "Local path, Container destination", "Packages application source files, package manifests, and compiled artifacts into image layers.", "COPY package.json ./\nRUN npm install\nCOPY . .", "Injects application bundle into container workspace"),
        ("RUN <command>", "Build-time layer execution command", "Shell instruction", "Executes dependency installation, binary compilation, and directory permission setup during build time.", "RUN npm run build", "Generates production artifacts inside immutable image layer"),
        ("docker run -d -p 8080:80 app:v1", "Container runtime lifecycle instantiation", "Flags -d (detached), -p (port mapping)", "Spawns an active container instance exposing port 80 to host port 8080.", "docker run -d -p 3000:3000 my-web-app", "Web application live and reachable at http://localhost:3000")
    ],
    'postgresql': [
        ("CREATE TABLE name ( col TYPE CONSTRAINT );", "Relational schema definition", "Column names, Data types, Constraints (PK/FK/NOT NULL)", "Constructs strongly typed database tables with guaranteed relational integrity.", "CREATE TABLE accounts (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  email TEXT UNIQUE NOT NULL,\n  balance NUMERIC(10, 2) DEFAULT 0.00\n);", "Initializes accounts table ready for ACID transactions"),
        ("SELECT cols FROM tbl WHERE cond ORDER BY col LIMIT n;", "Declarative relational data retrieval", "Column list, Filter predicates, Ordering, Paging limit", "Fetches matching database records with predictable execution plan optimization.", "SELECT id, email, balance FROM accounts WHERE balance > 0 ORDER BY balance DESC LIMIT 5;", "Returns top 5 funded customer accounts"),
        ("INSERT INTO tbl (cols) VALUES (vals) RETURNING id;", "Atomic record insertion with immediate return", "Columns, Insert values, RETURNING clause", "Persists new row data and returns computed primary keys or defaults without an extra query.", "INSERT INTO accounts (email) VALUES ('dev@tryngo.com') RETURNING id;", "Returns newly allocated UUID primary key"),
        ("SELECT * FROM a INNER JOIN b ON a.id = b.a_id;", "Multi-table relational join", "Table identifiers, ON match predicate", "Correlates rows across related tables matching foreign key references.", "SELECT a.email, t.amount FROM accounts a INNER JOIN transactions t ON a.id = t.account_id;", "Consolidates account holders with their transaction history")
    ],
    'graphql': [
        ("type Entity { id: ID! field: Type! }", "Schema Definition Language (SDL) Entity Contract", "Field names, Types, Non-Null Modifier (!)", "Defines structural schema contracts strictly guaranteed by server resolvers to API consumers.", "type Product {\n  id: ID!\n  title: String!\n  price: Float!\n  inStock: Boolean!\n}", "Declares strongly typed Product contract in SDL"),
        ("type Query { products: [Product!]! }", "Root Query Type Entry Point", "Field query signature", "Acts as the single ingress door for all client data reads across the system.", "type Query {\n  products(limit: Int): [Product!]!\n  product(id: ID!): Product\n}", "Clients may query product catalogs with optional limit filtering"),
        ("mutation CreateOrder($input: OrderInput!)", "Atomic State Mutation Operation", "GraphQL variables, Input Object Type", "Executes create, update, or delete commands and returns modified fields atomically.", "mutation {\n  createOrder(customer: \"Alex\", items: [{ product: \"Hub\", qty: 1 }]) {\n    id\n    total\n    status\n  }\n}", "Persists order and immediately returns generated ID and status"),
        ("resolvers = { Query: { field: (parent, args, ctx) => ... } }", "Resolver execution mapping function", "parent, args, context, info", "Maps schema fields to underlying database queries, microservice RPCs, or cache Lookups.", "const resolvers = {\n  Query: {\n    product: (_, { id }, { db }) => db.products.findById(id)\n  }\n};", "Executes database query using supplied argument ID")
    ]
}

def get_syntax_for_slug(slug, is_id):
    catalog = SYNTAX_CATALOG_ID if is_id else SYNTAX_CATALOG_EN
    if slug in catalog:
        return catalog[slug]
    # Fallback to closest related or javascript
    if slug in ['nextjs', 'nodejs', 'nestjs', 'angular', 'vue', 'svelte']:
        return catalog.get('javascript')
    if slug in ['mysql', 'mongodb', 'redis']:
        return catalog.get('postgresql')
    if slug in ['django', 'python']:
        return catalog.get('python', catalog['javascript'])
    if slug in ['php', 'laravel', 'codeigniter4']:
        return catalog.get('php', catalog['javascript'])
    if slug in ['csharp', 'spring']:
        return catalog.get('csharp', catalog['golang'])
    return catalog['javascript']

def build_w3schools_section(slug, is_id):
    syntax_items = get_syntax_for_slug(slug, is_id)
    ascii_diagrams = ASCII_DIAGRAMS_ID if is_id else ASCII_DIAGRAMS_EN
    diagram = ascii_diagrams.get(slug, ascii_diagrams.get('javascript'))

    svg_info = TRACK_DIAGRAMS.get(slug)

    if is_id:
        heading_visual = "## Model Mental & Diagram Alur Visual"
        heading_syntax = "## Panduan Sintaks & Referensi Lengkap (W3Schools Style)"
        intro_syntax = "Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:"
        
        svg_md = f"\n![{svg_info[1]}]({svg_info[0]})\n" if svg_info else ""

        body = f"""---

{heading_visual}
{svg_md}
{diagram}

---

{heading_syntax}

{intro_syntax}

"""
        for idx, (sig, desc, params, behavior, code, output) in enumerate(syntax_items, 1):
            body += f"""### {idx}. `{sig}`
- **Fungsi Utama:** {desc}.
- **Parameter / Atribut:** `{params}`.
- **Perilaku & Efek Sistem:** {behavior}
- **Contoh Penggunaan Praktis:**
```javascript
{code}
```
- **Hasil Output yang Diharapkan:**
```text
{output}
```

"""
    else:
        heading_visual = "## Visual Mental Model & Architecture Flow"
        heading_syntax = "## Syntax Reference & Practical Guide (W3Schools Style)"
        intro_syntax = "Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:"

        svg_md = f"\n![{svg_info[1]}]({svg_info[0]})\n" if svg_info else ""

        body = f"""---

{heading_visual}
{svg_md}
{diagram}

---

{heading_syntax}

{intro_syntax}

"""
        for idx, (sig, desc, params, behavior, code, output) in enumerate(syntax_items, 1):
            body += f"""### {idx}. `{sig}`
- **Core Functionality:** {desc}.
- **Parameters / Attributes:** `{params}`.
- **System Behavior & Return:** {behavior}
- **Practical Code Example:**
```javascript
{code}
```
- **Expected Execution Output:**
```text
{output}
```

"""

    return body

def enhance_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    is_id = '/id/' in file_path.replace('\\', '/')
    parts = file_path.replace('\\', '/').split('/')
    course_idx = parts.index('course')
    slug = parts[course_idx + 1]

    # Check if W3Schools section already present
    if "W3Schools Style" in content:
        return False

    w3_section = build_w3schools_section(slug, is_id)

    # Replace the old generic table
    # Match:
    # ## Ringkasan Sintaks & Quick Reference ... | Return / Output | ...
    old_table_pattern = re.compile(
        r'---\s*\n\s*## (?:Ringkasan Sintaks & Quick Reference|Syntax Cheatsheet & Quick Reference)[\s\S]*?\| \*\*Return / Output\*\*.*?\n',
        re.MULTILINE
    )

    if old_table_pattern.search(content):
        new_content = old_table_pattern.sub(w3_section, content, count=1)
    else:
        # Fallback: insert before ## Jebakan Umum or ## Common Pitfalls
        pitfall_pattern = re.compile(r'(---\s*\n\s*## (?:Jebakan Umum|Common Pitfalls))')
        if pitfall_pattern.search(content):
            new_content = pitfall_pattern.sub(w3_section + r'\1', content, count=1)
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
                if enhance_file(p):
                    count += 1

    print(f"Successfully upgraded {count} course markdown files with W3Schools-style syntax definitions, parameters, outputs, and visual diagrams!")

if __name__ == '__main__':
    main()
