import os
import re

APP_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
COURSE_BASE = os.path.join(APP_ROOT, 'public/data/course')

# Track-specific Gotchas & Pitfalls bank
GOTCHAS_ID = {
    'html5': [
        ("Tag bersarang tidak tertutup (Unclosed/Mismatched Tags)", "Tata letak halaman rusak atau elemen inline menelan elemen block.", "Selalu tutup tag berpasangan dan manfaatkan validator HTML5 atau auto-closing tag di VS Code."),
        ("Penggunaan tag <div> berlebihan (Div Soup)", "Website sulit diakses pembaca layar (screen reader) dan skor SEO menurun drastis.", "Gunakan tag semantik seperti <header>, <nav>, <main>, <article>, dan <footer>."),
        ("Lupa atribut 'alt' pada <img> dan 'for' pada <label>", "Skor aksesibilitas (a11y) merah dan form sulit diklik pada perangkat layar sentuh.", "Selalu sertakan deskripsi alt yang bermakna dan hubungkan label dengan id input terkait.")
    ],
    'css3': [
        ("Masalah Box Model: Padding Menambah Lebar Elemen", "Elemen melebar melebihi kontainer induk dan merusak grid.", "Gunakan `box-sizing: border-box;` secara global di selector `*`."),
        ("Specificity War (!important overuse)", "CSS sulit di-override dan kode menjadi rapuh saat aplikasi bertambah besar.", "Patuhi metodologi BEM atau gunakan selector class sederhana, hindari chaining ID selector dan `!important`."),
        ("Z-Index Tidak Bekerja", "Elemen tetap berada di bawah elemen lain meski z-index sudah disetel ke 9999.", "Pastikan elemen memiliki properti `position: relative`, `absolute`, atau `fixed` untuk membentuk Stacking Context.")
    ],
    'tailwind': [
        ("String Interpolation Dinamis pada Nama Class", "Class seperti `text-${color}-500` tidak muncul di hasil build produksi.", "Tuliskan nama class Tailwind secara utuh atau gunakan `safelist` di konfigurasi."),
        ("Urutan Utilitas yang Saling Menimpa", "Menulis `p-4 px-2` vs `px-2 p-4` menghasilkan specificity bentrok.", "Gunakan ekstensi resmi Prettier Tailwind Plugin untuk merapikan urutan class secara otomatis."),
        ("Arbitrary Values yang Berlebihan", "Menggunakan `w-[347px]` merusak konsistensi design token tema.", "Utamakan skala bawaan Tailwind (`w-80`, `w-96`) atau definisikan custom spacing di `theme.extend`.")
    ],
    'javascript': [
        ("Perilaku Equality Lemah (== vs ===)", "Coercion tipe data tak terduga (misal `0 == ''` bernilai `true`).", "Selalu gunakan operator strict equality (`===` dan `!==`)."),
        ("Mutasi Objek & Array secara Langsung", "Perubahan state tidak terdeteksi oleh reactive framework atau memicu bug sampingan tak terduga.", "Gunakan spread operator (`{ ...obj }`, `[...arr]`) atau metode immutable seperti `.map()`, `.filter()`, dan `.toSorted()`."),
        ("Unhandled Promise Rejection & Async/Await tanpa Try-Catch", "Aplikasi crash atau thread backend macet tanpa log error yang jelas.", "Selalu bungkus `await` dalam blok `try { ... } catch (err) { ... }`.")
    ],
    'typescript': [
        ("Penyalahgunaan Tipe 'any'", "Menghilangkan seluruh keamanan pengecekan compile-time TypeScript.", "Gunakan `unknown` jika tipe data belum pasti, lalu persempit dengan type guards (`typeof`, `instanceof`)."),
        ("Non-Null Assertion Operator (!) Sembarangan", "Terjadi runtime error `Cannot read properties of undefined` saat nilai ternyata null.", "Gunakan optional chaining (`?.`) atau pengecekan kondisional eksplisit `if (val != null)`."),
        ("Interface vs Type yang Tidak Konsisten", "Membingungkan arsitektur tim dan menyulitkan declaration merging saat menulis library.", "Gunakan `interface` untuk struktur objek extensible dan `type` untuk union, tuple, atau primitive alias.")
    ],
    'react': [
        ("Mutasi State Langsung (Direct Mutation)", "Komponen tidak melakukan re-render karena referensi memori tidak berubah.", "Gunakan updater function dari setter state: `setCount(prev => prev + 1)` atau buat salinan baru."),
        ("Dependency Array useEffect yang Tidak Lengkap", "Terjadi stale closures (membaca nilai lama variabel) atau infinite re-render loop.", "Cantumkan semua variabel luar yang dibaca di dalam useEffect ke dalam array dependency."),
        ("Lupa Memberi Unique 'key' pada List Rendering", "DOM reconciliation lambat dan status elemen input di dalam list bisa tertukar.", "Gunakan ID unik database (`item.id`), jangan gunakan index array (`key={idx}`) jika list bisa diubah atau diurutkan.")
    ],
    'nextjs': [
        ("Menggunakan Hook Browser di Server Component", "Error kompilasi `useState can only be used in a Client Component`.", "Tambahkan direktif `'use client'` di baris paling atas berkas komponen yang memerlukan interaktivitas browser."),
        ("Waterfalls Fetching Data yang Tidak Perlu", "Loading halaman menjadi sangat lambat karena request dilakukan berurutan.", "Gunakan `Promise.all([fetchA(), fetchB()])` untuk menjalankan pemanggilan API secara paralel di server."),
        ("Caching yang Terlalu Agresif", "Data baru di database tidak muncul di browser pengguna.", "Tentukan revalidasi yang tepat via `fetch(url, { next: { revalidate: 60 } })` atau panggil `revalidatePath()`.")
    ],
    'vue': [
        ("Destructuring Reaktif State Hilang", "Variabel yang di-destructure dari `reactive()` kehilangan sifat reaktivitasnya.", "Gunakan `toRefs(state)` sebelum melakukan destructuring pada Composition API."),
        ("Mengubah Prop Komponen Anak secara Langsung", "Memicu warning konsol Vue dan membuat data flow satu arah (one-way data flow) kacau.", "Kirim event `emit('update:prop', value)` ke parent alih-alih memutasi prop."),
        ("Lupa `.value` pada Ref di JavaScript", "Objek `ref` dikirim alih-alih nilai aslinya ke logika komputasi.", "Ingat bahwa `.value` wajib di dalam blok `<script setup>`, namun otomatis di-unwrap di template `<template>`.")
    ],
    'svelte': [
        ("Mutasi Array Method In-Place Tanpa Assignment", "Memanggil `arr.push(x)` tidak memicu re-render di Svelte 4/5.", "Gunakan syntax assignment: `arr = [...arr, x]` untuk memberi sinyal reaktivitas."),
        ("Unsubscribe Store / Lifecycle Memory Leak", "Berlangganan manual ke store tanpa membatalkannya menyebabkan memory leak.", "Gunakan auto-subscription dengan prefix `$` (`$myStore`) agar Svelte mengelolanya secara otomatis."),
        ("Penggunaan `$state` vs State Biasa di Runes", "Nilai tidak reaktif saat berpindah antar modul tanpa pemanggilan signal yang benar.", "Gunakan rune `$state()` dan `$derived()` pada proyek modern Svelte 5.")
    ],
    'angular': [
        ("Memory Leak pada RxJS Subscription", "Subscription yang tetap aktif setelah komponen hancur memboroskan memori dan memicu callback ganda.", "Gunakan operator `takeUntilDestroyed()` atau manfaatkan pipe `async` di template HTML."),
        ("ChangeDetectionStrategy Default yang Boros Performa", "Angular memeriksa seluruh pohon komponen pada setiap event browser.", "Terapkan `ChangeDetectionStrategy.OnPush` dan gunakan Angular Signals untuk update granular."),
        ("Mengimpor Seluruh Shared Module di Standalone Component", "Ukuran bundle JavaScript aplikasi membengkak drastis.", "Hanya import modul atau standalone directive yang benar-benar digunakan di array `imports: []`.")
    ],
    'golang': [
        ("Nil Pointer Dereference (Panic)", "Aplikasi panic dan crash seketika saat mengakses field struct pada pointer bernilai `nil`.", "Selalu validasi `if ptr != nil { ... }` sebelum memanggil method atau membaca field."),
        ("Goroutine Leak (Macet Selamanya)", "Goroutine menunggu baca/tulis pada channel tanpa pernah dihentikan, menguras memori server.", "Gunakan `context.WithCancel` atau buffered channel untuk memastikan goroutine memiliki titik keluar pasti."),
        ("Shadowing Variabel dengan Operator :=", "Variabel luar tidak terisi karena variabel baru dengan nama yang sama dibuat di dalam blok `if/err`.", "Periksa kembali deklarasi pendek `:=` vs assignment biasa `=` saat menangani error.")
    ],
    'rust': [
        ("Borrow Checker: Borrowing Mutably Lebih dari Sekali", "Kompiler menolak kompilasi dengan pesan `cannot borrow as mutable more than once at a time`.", "Batasi masa pakai peminjaman (*lifetime/scope*) atau gunakan tipe interior mutability seperti `RefCell`/`Mutex`."),
        ("Penyalahgunaan `.unwrap()` di Kode Produksi", "Program mengalami panic seketika saat menerima `Err` atau `None`.", "Gunakan operator `?` untuk propagasi error idiomatik atau tangani dengan blok `match`."),
        ("Kloning Berlebihan (`.clone()`) untuk Menghindari Lifetime", "Penurunan performa akibat alokasi heap baru secara redundan.", "Gunakan referensi pinjaman `&str` atau `&[T]` alih-alih menduplikasi seluruh data.")
    ],
    'csharp': [
        ("NullReferenceException", "Aplikasi melempar exception fatal saat mengakses method dari object yang bernilai null.", "Aktifkan `<Nullable>enable</Nullable>` di csproj dan gunakan operator null-conditional `?.` atau null-coalescing `??`."),
        ("Async Void pada Method Biasa", "Exception yang terjadi di dalam method `async void` tidak bisa ditangkap oleh blok try-catch luar.", "Selalu gunakan `async Task` untuk method asynchronous, kecuali pada event handler UI."),
        ("Lupa Melakukan Dispose pada Objek IDisposable", "Koneksi database atau file handle tertahan di memori sistem.", "Gunakan statement `using var resource = new ...` agar pembersihan resource berjalan otomatis.")
    ],
    'spring': [
        ("Circular Dependency antar Service Bean", "Aplikasi Spring Boot gagal start dengan pesan `BeanCurrentlyInCreationException`.", "Rancang ulang arsitektur menggunakan mediator pattern, atau gunakan `@Lazy` sebagai solusi transisi."),
        ("Transaksi Database Tidak Berjalan pada Panggilan Internal", "Anotasi `@Transactional` diabaikan saat dipanggil dari method dalam class yang sama.", "Pahami bahwa Spring bekerja melalui AOP Proxy; panggil method transaksional melalui bean terinjeksi."),
        ("N+1 Query Problem pada JPA Hibernate", "Database menerima ratusan query SQL individual saat mengambil entitas relasi.", "Gunakan `JOIN FETCH` pada JPQL query atau tentukan `@EntityGraph` pada repository interface.")
    ],
    'python': [
        ("Default Parameter Bersifat Mutable (List/Dict)", "Nilai default yang diubah pada panggilan pertama akan terbawa ke panggilan fungsi berikutnya.", "Gunakan `None` sebagai nilai default: `def fn(items=None): if items is None: items = []`."),
        ("Salah Paham Scope Variabel Global di dalam Fungsi", "Melempar error `UnboundLocalError: local variable referenced before assignment`.", "Gunakan kata kunci `global` secara hati-hati atau lebih baik oper nilai sebagai parameter dan return value."),
        ("Menangkap Exception Terlalu Luas (`except:`)", "Menyembunyikan error syntax, `KeyboardInterrupt`, atau bug kritis sistem.", "Selalu sebutkan exception spesifik: `except ValueError as err:`.")
    ],
    'nodejs': [
        ("Memblokir Event Loop (Synchronous CPU Intensive)", "Seluruh request pengguna lain tertahan dan server berhenti merespons (hang).", "Hindari operasi kriptografi berat atau parsing JSON raksasa di thread utama; gunakan Worker Threads."),
        ("Unhandled Exception pada Asynchronous Callback", "Server Node.js crash seketika dan mematikan seluruh proses aplikasi.", "Gunakan async/await dengan try-catch terpusat dan daftarkan handler `process.on('unhandledRejection')`."),
        ("Memory Leak pada Event Emitter Listener", "Muncul warning `MaxListenersExceededWarning` dan memori RAM server meningkat terus-menerus.", "Selalu hapus event listener yang tidak digunakan lagi dengan `emitter.off()` atau `emitter.removeListener()`.")
    ],
    'nestjs': [
        ("Scope Provider Default vs Request Scope", "Menggunakan Request Scope pada service membuat performa anjlok drastis karena bean dibuat ulang setiap request.", "Pertahankan Singleton Scope default kecuali jika benar-benar membutuhkan data spesifik per HTTP request."),
        ("Lupa Mendaftarkan Module di `imports: []`", "Error `Nest can't resolve dependencies of the Service` saat aplikasi dijalankan.", "Pastikan module yang mengekspor provider tersebut telah dicantumkan di array `imports` pada modul pemanggil."),
        ("Lupa Mengaktifkan ValidationPipe Global", "Payload DTO tidak divalidasi dan data kotor masuk ke database tanpa tersaring.", "Selalu pasang `app.useGlobalPipes(new ValidationPipe({ whitelist: true }))` di `main.ts`.")
    ],
    'django': [
        ("Lupa Menjalankan Migration setelah Mengubah Model", "Database tidak sinkron dengan kode Python, memicu error `ProgrammingError: relation does not exist`.", "Selalu jalankan `python manage.py makemigrations` lalu `python manage.py migrate`."),
        ("N+1 Query Problem di Django ORM", "Template me-render list dengan mengeksekusi query database berulang kali untuk setiap relasi.", "Gunakan `select_related()` untuk Foreign Key satu-ke-satu dan `prefetch_related()` untuk Many-to-Many."),
        ("Expose SECRET_KEY atau DEBUG=True di Produksi", "Informasi credential rentan dibobol dan halaman debug menampilkan variabel lingkungan.", "Simpan rahasia di environment variable dan pastikan `DEBUG = False` di lingkungan produksi.")
    ],
    'php': [
        ("SQL Injection Akibat String Concatenation", "Peretas dapat memanipulasi query SQL dan mencuri seluruh isi database.", "Selalu gunakan Prepared Statements dengan PDO atau MySQLi parameterized query."),
        ("Mengabaikan Strict Types", "PHP melakukan konversi tipe data otomatis yang memicu bug logika angka/string.", "Tambahkan `declare(strict_types=1);` di baris pertama setiap berkas PHP modern."),
        ("Memasukkan Output Mentah ke HTML (XSS Vulnerability)", "Skrip berbahaya dieksekusi di browser pengunjung.", "Selalu bungkus variabel output dengan fungsi `htmlspecialchars($str, ENT_QUOTES, 'UTF-8')`.")
    ],
    'laravel': [
        ("Mass Assignment Exception", "Muncul error `Add [field] to fillable property to allow mass assignment` saat create/update model.", "Daftarkan kolom yang aman di properti `protected $fillable = [...]` pada Model Eloquent."),
        ("Menyimpan Logika Bisnis di Controller (Fat Controller)", "Controller menjadi ribet, sulit diuji (*untestable*), dan melanggar prinsip Single Responsibility.", "Pindahkan logika bisnis ke Action Classes, Service Classes, atau Form Requests."),
        ("Lupa Menjalankan `php artisan config:cache` di Server Produksi", "Pembacaan file konfigurasi secara berulang memperlambat response time aplikasi.", "Jalankan caching konfigurasi, route, dan view saat pipeline deployment produksi selesai.")
    ],
    'codeigniter4': [
        ("Lupa Menyesuaikan `baseURL` di File `.env`", "Aset CSS/JS tidak termuat atau link navigasi redirect ke alamat yang keliru.", "Pastikan variabel `app.baseURL = 'http://localhost:8080/'` telah disesuaikan dengan domain yang aktif."),
        ("Mengabaikan Fitur CSRF Protection Bawaan", "Formulir POST rentan serangan Cross-Site Request Forgery.", "Aktifkan filter CSRF di `app/Config/Filters.php` dan sertakan `<?= csrf_field() ?>` di setiap form."),
        ("Salah Penamaan Namespace Controller & Model", "Framework gagal memuat class dengan pesan `Class not found` akibat inkonsistensi huruf kapital.", "Patuhi konvensi penamaan PSR-4 dan pastikan nama folder/berkas sesuai persis dengan namespace.")
    ],
    'rails': [
        ("N+1 Queries pada Active Record", "Me-render tampilan tabel memicu puluhan query SQL tambahan yang memperlambat respon.", "Gunakan method `includes(:relation)` pada controller query untuk melakukan eager loading."),
        ("Migrasi Database yang Mengubah Kolom Tanpa Reversibility", "Perintah `rails db:rollback` gagal dieksekusi saat proses deployment dibatalkan.", "Gunakan method migrasi eksplisit `up` dan `down` jika operasi kolom tidak dapat dibalik secara otomatis."),
        ("Menyimpan Credential Sensitif di Direktori Publik", "API key pihak ketiga bocor ke publik melalui repositori git.", "Manfaatkan sistem enkripsi `rails credentials:edit` untuk menyimpan API key produksi.")
    ],
    'postgresql': [
        ("Full Table Scan Akibat Lupa Menambahkan Index", "Query SELECT menjadi lambat seiring bertambahnya jutaan baris data.", "Tambahkan B-Tree Index pada kolom yang sering digunakan di klausa `WHERE`, `ORDER BY`, dan `JOIN`."),
        ("Lupa Menggunakan Transaksi pada Operasi Finansial/Multi-Tabel", "Data menjadi tidak konsisten jika terjadi error di tengah-tengah rentetan query.", "Selalu bungkus operasi dengan blok `BEGIN; ... COMMIT;` atau `ROLLBACK;` saat terjadi kegagalan."),
        ("Tipe Data Angka Desimal yang Keliru (`FLOAT` vs `NUMERIC`)", "Perhitungan saldo uang mengalami selisih desimal akibat floating-point precision error.", "Gunakan tipe data `NUMERIC(15, 2)` untuk uang dan data finansial presisi tinggi.")
    ],
    'mysql': [
        ("Menggunakan Charset Lawas `utf8` alih-alih `utf8mb4`", "Karakter emoji atau aksara non-Latin memicu error `Incorrect string value`.", "Selalu setel charset ke `utf8mb4` dan collation ke `utf8mb4_unicode_ci` pada tabel dan database."),
        ("Tipe Penyimpanan Tanggal (`TIMESTAMP` vs `DATETIME`)", "Tahun 2038 bug pada kolom TIMESTAMP atau inkonsistensi zona waktu server.", "Gunakan `DATETIME` untuk tanggal independen zona waktu atau simpan dalam format UTC eksplisit."),
        ("Lupa Mematikan Autocommit pada Operasi Batch Besar", "Proses batch insert ribuan data memakan waktu sangat lama karena commit per baris.", "Jalankan dalam transaksi tunggal `START TRANSACTION; ... COMMIT;` untuk kecepatan maksimal.")
    ],
    'mongodb': [
        ("Desain Dokumen Tanpa Batas (Unbounded Array Anti-Pattern)", "Ukuran dokumen melebihi batas keras 16MB MongoDB saat array anak terus membesar.", "Gunakan teknik referensi ID (`bucketing` atau koleksi terpisah) jika data relasi diproyeksikan tumbuh tanpa batas."),
        ("Tidak Menggunakan Indeks pada Query Sering", "Operasi pencarian melakukan pemeriksaan seluruh koleksi (*COLLSCAN*) yang boros IOPS memori.", "Buat compound index via `db.collection.createIndex({ status: 1, createdAt: -1 })`."),
        ("Tipe Data Object ID vs String pada Pencarian", "Query tidak mengembalikan data apa pun karena mencari ID dengan tipe string mentah.", "Konversikan string input ke objek `new ObjectId(id)` sebelum melakukan query.")
    ],
    'redis': [
        ("Lupa Menetapkan TTL (Time-To-Live) pada Kunci Cache", "Memori RAM Redis penuh (*Out of Memory*) dan mematikan fungsi penyimpanan kunci baru.", "Selalu tentukan masa kedaluwarsa pada kunci cache: `SET key val EX 3600` (1 jam)."),
        ("Menjalankan Perintah `KEYS *` di Server Produksi", "Redis adalah single-threaded; `KEYS *` memblokir seluruh operasi database selama beberapa detik.", "Gunakan perintah kursor non-blocking `SCAN` untuk mencari pola kunci di produksi."),
        ("Menyimpan Objek Raksasa dalam Satu Key Tunggal", "Memicu latensi jaringan tinggi saat transfer data dan membebani alokasi memori Redis.", "Pecah objek raksasa ke dalam struktur `HSET` (Hash) atau simpan hanya data esensial yang sering diakses.")
    ],
    'graphql': [
        ("Query Bersarang Tanpa Batas (Denial of Service)", "Pengguna jahat mengirim query rekursif tak terhingga yang merubuhkan server backend.", "Terapkan middleware pembatas kedalaman (*depth limiting*) dan kalkulasi biaya query (*query complexity*)."),
        ("N+1 Problem pada Resolver Lapangan", "Resolver anak memanggil database secara berulang untuk setiap objek induk dalam array.", "Gunakan pustaka `DataLoader` untuk menggabungkan (*batching*) dan menyimpan cache pemanggilan database."),
        ("Menyerahkan Seluruh Error Internal ke Klien", "Stack trace sensitif database dan password dapat terbaca oleh publik di response error.", "Filter pesan error di tingkat server formatError sebelum dikirimkan kembali ke klien.")
    ],
    'docker': [
        ("Menjalankan Container sebagai User `root`", "Potensi eskalasi hak akses sistem operasi host jika container berhasil ditembus peretas.", "Definisikan user non-root khusus di Dockerfile: `USER node` atau `USER 1001`."),
        ("Mengabaikan File `.dockerignore`", "Folder raksasa seperti `node_modules`, `.git`, atau file `.env` rahasia ikut ter-copy ke dalam image.", "Selalu sediakan `.dockerignore` untuk membuang file lokal sebelum build dijalankan."),
        ("Ukuran Image Membengkak Tanpa Multi-Stage Build", "Image berukuran gigabytes memperlambat waktu transfer jaringan dan deployment cloud.", "Terapkan Multi-Stage Build: pisahkan tahap kompilasi (*builder stage*) dari runtime minimalis (*alpine/distroless*).")
    ],
}

# English version of Gotchas & Pitfalls
GOTCHAS_EN = {
    'html5': [
        ("Unclosed or Mismatched Tags", "Breaks page layout and causes unexpected DOM tree nesting.", "Always close matching pairs and validate HTML using linters or browser developer tools."),
        ("Overusing Generic <div> Containers (Div Soup)", "Harms accessibility (screen readers) and lowers search engine ranking.", "Prefer semantic markup elements like <header>, <nav>, <main>, <article>, and <footer>."),
        ("Missing 'alt' on Images and 'for' on Labels", "Fails accessibility audits and creates bad UX on mobile touch targets.", "Always provide descriptive alt attributes and bind input fields explicitly to form labels.")
    ],
    'css3': [
        ("Box Model Padding Side-Effects", "Padding and borders expand the element beyond its container width.", "Set `box-sizing: border-box;` globally across all elements using the universal selector `*`."),
        ("Specificity Wars & !important Abuse", "Styles become unmaintainable and impossible to override cleanly as codebase grows.", "Rely on BEM naming or flat utility classes, avoiding deep nesting and `!important`."),
        ("Z-Index Not Applying", "Element stays behind siblings despite high numeric z-index values.", "Ensure the element establishes a Stacking Context via `position: relative`, `absolute`, or `fixed`.")
    ],
    'tailwind': [
        ("Dynamic String Interpolation for Class Names", "Classes like `text-${color}-500` get purged from the production CSS bundle.", "Always write complete class names or declare them explicitly in the Tailwind safelist."),
        ("Conflicting Utility Order", "Writing competing rules like `p-4 px-2` creates non-deterministic layout.", "Use the official Prettier Tailwind plugin to sort classes automatically."),
        ("Excessive Arbitrary Values", "Sprinkling `w-[371px]` breaks theme design tokens and visual rhythm.", "Stick to theme spacing presets (`w-80`, `w-96`) or extend your design tokens in `theme.extend`.")
    ],
    'javascript': [
        ("Loose Equality Bugs (== vs ===)", "Unintended type coercion leads to subtle logic bugs (e.g. `0 == ''` is true).", "Consistently use strict equality operators (`===` and `!==`)."),
        ("Direct State & Array Mutation", "Prevents reactive UI frameworks from detecting updates and causes hard-to-track bugs.", "Embrace immutable updates using spread syntax (`{ ...obj }`, `[...arr]`) or `.map()` and `.filter()`."),
        ("Unhandled Asynchronous Rejections", "Uncaught promise failures crash backend processes or leave user interfaces frozen.", "Wrap `await` calls in explicit `try { ... } catch (err) { ... }` blocks.")
    ],
    'typescript': [
        ("Overusing the 'any' Escape Hatch", "Completely disables TypeScript compile-time safety across downstream code.", "Use `unknown` for dynamic values and narrow types using type guards."),
        ("Reckless Non-Null Assertions (!)", "Causes runtime `Cannot read property of undefined` crashes when assumptions fail.", "Rely on optional chaining (`?.`) or explicit defensive guard statements."),
        ("Inconsistent Type vs Interface Usage", "Hinders declaration merging and confuses team conventions.", "Use `interface` for extensible object contracts and `type` for unions, primitives, and tuples.")
    ],
    'react': [
        ("Mutating State In-Place", "React will not trigger a re-render because memory references stay identical.", "Always supply a new copy or functional updater: `setList(prev => [...prev, newItem])`."),
        ("Incomplete useEffect Dependencies", "Causes stale closures reading outdated variable values or infinite re-render loops.", "Include every reactive value accessed inside the effect in the dependency array."),
        ("Using Array Indices as Component Keys", "Breaks DOM reconciliation and corrupts internal state in list items.", "Assign unique database IDs (`item.id`) rather than arbitrary iteration indices.")
    ],
    'nextjs': [
        ("Client Hooks in Server Components", "Build error stating `useState can only be used in a Client Component`.", "Add the `'use client'` directive to the top of components requiring browser state."),
        ("Sequential Data Fetching Waterfalls", "Significantly delays page render times by running independent requests one after another.", "Run asynchronous fetches concurrently using `Promise.all([fetchA(), fetchB()])`."),
        ("Over-Aggressive Static Caching", "Stale database content remains visible to users after updates.", "Configure accurate revalidation: `fetch(url, { next: { revalidate: 60 } })` or `revalidatePath()`.")
    ],
    'vue': [
        ("Destructuring Loss of Reactivity", "Unpacking fields from `reactive()` breaks Vue reactivity linkage.", "Apply `toRefs(state)` prior to destructuring inside the Composition API."),
        ("Directly Mutating Child Component Props", "Generates console warnings and violates unidirectional data flow.", "Emit events `emit('update:modelValue', value)` back to the parent component."),
        ("Omitting `.value` in Script Setup", "Passes the wrapper Ref object instead of the underlying value into calculations.", "Remember `.value` is mandatory in script blocks and auto-unwrapped in `<template>`.")
    ],
    'svelte': [
        ("In-Place Array Mutation Without Assignment", "Calling `arr.push()` fails to trigger reactive UI updates in Svelte.", "Reassign the array reference: `arr = [...arr, newItem]` to signal reactivity."),
        ("Store Subscription Memory Leaks", "Manual store subscriptions that are never cancelled consume memory indefinitely.", "Use Svelte auto-subscriptions with the `$` prefix (`$myStore`)."),
        ("Runes State Boundaries", "Passing reactive signals across module borders without `$state()` or `$derived()` signals.", "Use modern Svelte 5 runes consistently.")
    ],
    'angular': [
        ("RxJS Subscription Memory Leaks", "Subscriptions lingering after component destruction cause memory bloat and duplicate work.", "Use `takeUntilDestroyed()` or resolve observables directly via the template `async` pipe."),
        ("Suboptimal Default Change Detection", "Forces Angular to verify every single component on every browser event.", "Switch to `ChangeDetectionStrategy.OnPush` and adopt Angular Signals."),
        ("Bloated Shared Modules", "Impairs code splitting and inflates initial JavaScript bundle size.", "Adopt Standalone Components and import only specific directives into the `imports: []` array.")
    ],
    'golang': [
        ("Nil Pointer Dereference Panic", "Accessing struct fields on an uninitialized pointer panics and crashes the binary.", "Always check `if ptr != nil` before invoking methods or dereferencing pointers."),
        ("Goroutine Leaks", "Spawning background goroutines blocked on unbuffered channels with no termination signal.", "Use `context.WithCancel` or buffered channels to guarantee deterministic exit paths."),
        ("Accidental Variable Shadowing with :=", "Inner scope re-creates an existing variable instead of assigning to the outer one.", "Double check `:=` versus `=` when handling errors inside `if` or `for` blocks.")
    ],
    'rust': [
        ("Multiple Mutable Borrows", "Rejected by compiler: `cannot borrow as mutable more than once at a time`.", "Narrow borrow scopes or adopt interior mutability constructs like `RefCell` or `Mutex`."),
        ("Unchecked `.unwrap()` in Production", "Panics and terminates execution when encountering unexpected `Err` or `None` values.", "Use idiomatic `?` error propagation or pattern match with `match` / `if let`."),
        ("Over-Cloning to Escape Lifetime Checks", "Degrades throughput by allocating redundant copies on the heap.", "Prefer borrowed references like `&str` or `&[T]` instead of deep cloning full data structures.")
    ],
    'csharp': [
        ("NullReferenceException at Runtime", "Attempting to invoke methods on null object instances crashes request threads.", "Enable `<Nullable>enable</Nullable>` in csproj and leverage null-conditional `?.` operators."),
        ("Async Void Anti-Pattern", "Exceptions thrown inside `async void` cannot be caught by callers and crash the runtime.", "Always return `async Task` except on top-level UI event handlers."),
        ("Failing to Dispose Managed Resources", "Database connections and file handles remain open indefinitely.", "Use `using var resource = new ...` to guarantee prompt deterministic cleanup.")
    ],
    'spring': [
        ("Circular Bean Dependencies", "Application fails startup with `BeanCurrentlyInCreationException`.", "Refactor dependencies using mediator patterns or apply `@Lazy` as a stopgap."),
        ("Self-Invocation Bypassing `@Transactional`", "Internal method calls within the same class bypass the Spring AOP proxy.", "Invoke transactional methods through an injected bean reference."),
        ("N+1 Hibernate Query Problem", "Loads relational collections with hundreds of sequential database trips.", "Use `JOIN FETCH` queries or annotate repository methods with `@EntityGraph`.")
    ],
    'python': [
        ("Mutable Default Arguments", "Default list or dict parameters persist modifications across successive function calls.", "Assign `None` as default: `def fn(items=None): if items is None: items = []`."),
        ("Accidental Variable Scope Errors", "Throws `UnboundLocalError: local variable referenced before assignment`.", "Pass variables explicitly through arguments and return values rather than mutating globals."),
        ("Catch-All `except:` Clauses", "Suppresses critical syntax errors, interrupts, and crashes silently.", "Always catch explicit exceptions: `except ValueError as err:`.")
    ],
    'nodejs': [
        ("Event Loop Blocking on Heavy Computation", "Freezes response handling for all concurrent user requests.", "Delegate CPU-heavy tasks to Worker Threads or external background queues."),
        ("Uncaught Asynchronous Exceptions", "Kills the Node.js process abruptly and terminates the service.", "Handle async errors with try-catch and attach `process.on('unhandledRejection')` handlers."),
        ("EventEmitter Listener Leak", "Generates `MaxListenersExceededWarning` and leaks memory across long-lived servers.", "Detach obsolete event handlers using `emitter.off()` or `emitter.removeListener()`.")
    ],
    'nestjs': [
        ("Indiscriminate Request-Scoped Providers", "Degrades throughput significantly by re-instantiating dependency trees per request.", "Stick to default Singleton providers unless per-request isolation is strictly required."),
        ("Missing Module Exports / Imports", "Crashes on boot: `Nest can't resolve dependencies of the Service`.", "Verify that the exporting module exports the provider and the consumer imports it."),
        ("Omitting Global ValidationPipe", "DTO payload properties pass into business services unvalidated.", "Configure `app.useGlobalPipes(new ValidationPipe({ whitelist: true }))` in `main.ts`.")
    ],
    'django': [
        ("Unapplied Model Migrations", "Triggers database errors: `ProgrammingError: relation does not exist`.", "Always run `python manage.py makemigrations` followed by `python manage.py migrate`."),
        ("N+1 Queries in Django ORM Templates", "Templates trigger a separate SQL query per item rendered.", "Use `select_related()` for foreign keys and `prefetch_related()` for many-to-many."),
        ("Exposing Sensitive Secrets in Settings", "Leaking SECRET_KEY or running `DEBUG = True` in production environments.", "Load secrets from environment variables and ensure `DEBUG = False` in production.")
    ],
    'php': [
        ("SQL Injection via String Concatenation", "Attackers can manipulate SQL statements and compromise data.", "Always use PDO or MySQLi parameterized prepared statements."),
        ("Omitting Strict Types", "PHP weak coercion masks subtle mathematical and comparison defects.", "Include `declare(strict_types=1);` at the top of every modern PHP file."),
        ("Unescaped Output Rendering (XSS)", "Malicious user input runs arbitrary scripts in visitors' browsers.", "Wrap dynamic output using `htmlspecialchars($str, ENT_QUOTES, 'UTF-8')`.")
    ],
    'laravel': [
        ("Mass Assignment Exception", "Model throws error preventing mass creation when columns are unprotected.", "Define safe assignable attributes inside `protected $fillable = [...]` on the model."),
        ("Overstuffed Controllers (Fat Controllers)", "Controllers become untestable and violate single-responsibility guidelines.", "Extract domain logic into Action classes, Form Requests, and Service layers."),
        ("Skipping Production Cache Optimization", "Repeated file system lookups drag down production response latency.", "Run `php artisan config:cache`, `route:cache`, and `view:cache` in production deployments.")
    ],
    'codeigniter4': [
        ("Incorrect `baseURL` in `.env`", "Assets and navigation redirect to incorrect hosts or fail to load.", "Configure `app.baseURL` to match your exact local or production host address."),
        ("Overlooking CSRF Form Tokens", "Leaves form submissions vulnerable to Cross-Site Request Forgery.", "Enable CSRF filters in `Filters.php` and include `<?= csrf_field() ?>` inside HTML forms."),
        ("Case-Sensitivity Mismatches in Namespaces", "Fails class autoloading on Linux servers due to uppercase/lowercase discrepancies.", "Follow strict PSR-4 casing matching folder and file names identically.")
    ],
    'rails': [
        ("N+1 Active Record Queries", "Iterating through associations fires repeated queries per record.", "Eager load required associations using `includes(:association)`."),
        ("Irreversible Database Migrations", "Running `rails db:rollback` fails when migration direction is ambiguous.", "Write explicit `up` and `down` migration methods for complex column changes."),
        ("Checking Secrets into Public Version Control", "Third-party tokens and database credentials get leaked.", "Use encrypted credentials via `rails credentials:edit`.")
    ],
    'postgresql': [
        ("Sequential Table Scans on Large Tables", "SELECT queries degrade in latency as table rows increase into millions.", "Add B-Tree indexes on columns used in `WHERE`, `ORDER BY`, and `JOIN` clauses."),
        ("Missing Transactions for Multi-Step Operations", "Leaves data in inconsistent partial states when middle operations fail.", "Always wrap operations in `BEGIN; ... COMMIT;` or `ROLLBACK;` blocks."),
        ("Using Inexact Floating Point for Currency", "Floating point rounding errors corrupt financial accounting balances.", "Always use `NUMERIC(15, 2)` or `DECIMAL` for currency amounts.")
    ],
    'mysql': [
        ("Legacy `utf8` Instead of `utf8mb4`", "Throws `Incorrect string value` when saving 4-byte Unicode characters (emojis).", "Set default database and table character set to `utf8mb4` with `utf8mb4_unicode_ci`."),
        ("TIMESTAMP 2038 Boundary & Timezone Shifts", "Epoch overflow bugs on older tables or unexpected timezone conversions.", "Store UTC explicitly or choose `DATETIME` for timezone-neutral timestamps."),
        ("Failing to Batch Inserts", "Per-row autocommit causes massive disk write bottlenecks on large imports.", "Wrap batch imports in a single `START TRANSACTION; ... COMMIT;` block.")
    ],
    'mongodb': [
        ("Unbounded Array Document Growth", "Document exceeds MongoDB strict 16MB limit as nested arrays grow indefinitely.", "Adopt bucketing or reference child documents in separate collections."),
        ("Missing Indexes on High-Frequency Filters", "Forces expensive full collection scans (COLLSCAN) burning memory IOPS.", "Create compound indexes with `db.collection.createIndex({ field: 1, created: -1 })`."),
        ("Mismatched String vs ObjectId Queries", "Queries return zero results because searching string IDs against ObjectId fields.", "Convert search input to `new ObjectId(id)` before querying.")
    ],
    'redis': [
        ("Omitting Time-To-Live (TTL) on Cached Keys", "Fills server RAM over time and triggers out-of-memory eviction crashes.", "Always assign an explicit TTL: `SET key val EX 3600` (1 hour)."),
        ("Running `KEYS *` in Production", "Redis is single-threaded; `KEYS *` locks the entire database server.", "Use non-blocking cursor-based iteration via the `SCAN` command."),
        ("Storing Giant Monolithic Blobs", "Spikes network latency during roundtrips and degrades Redis throughput.", "Decompose large objects into Redis Hashes (`HSET`) or cache only essential fields.")
    ],
    'graphql': [
        ("Unbounded Query Nesting Attacks", "Malicious circular queries exhaust server CPU and database resources.", "Enforce query depth limits and query complexity analysis middleware."),
        ("Resolver N+1 Database Execution", "Child field resolvers fire individual database queries per parent item in an array.", "Use `DataLoader` to batch and cache database calls within a request cycle."),
        ("Exposing Internal Server Traces to Clients", "Database stack traces and confidential errors surface in GraphQL error responses.", "Sanitize errors in server configuration using custom `formatError` handlers.")
    ],
    'docker': [
        ("Running Containers as Root", "Enables container breakout attacks to compromise host operating system privileges.", "Declare dedicated non-root users inside Dockerfile: `USER node` or `USER 1001`."),
        ("Omitting `.dockerignore` Files", "Unintentionally copies gigabytes of local build caches and sensitive `.env` files into image.", "Always maintain `.dockerignore` ignoring `node_modules`, `.git`, and environment files."),
        ("Bloated Images Without Multi-Stage Builds", "Massive image sizes slow down container registry pulls and cloud deployments.", "Adopt Multi-Stage Builds separating compile tooling from lightweight runtime images.")
    ],
}

def enhance_markdown(file_path: str, slug: str, is_id: bool):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Avoid duplicate injection
    check_str = '## Jebakan Umum & Debugging' if is_id else '## Common Pitfalls & Debugging'
    if check_str in content:
        return False

    # 1. Enhance Header with Metadata Badges
    time_badge = (
        "> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)"
        if is_id else
        "> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)"
    )

    if "> ⏱️" not in content:
        content = re.sub(
            r'(> \*\*Kategori:\*\*.*?\n)',
            r'\1' + time_badge + '\n\n',
            content,
            count=1
        )

    # 2. Build Pitfalls Section
    pitfalls_list = GOTCHAS_ID.get(slug, GOTCHAS_ID['javascript']) if is_id else GOTCHAS_EN.get(slug, GOTCHAS_EN['javascript'])
    
    heading_pitfalls = "## Jebakan Umum & Debugging (Common Pitfalls)" if is_id else "## Common Pitfalls & Debugging Tips"
    pitfalls_body = f"---\n\n{heading_pitfalls}\n\n"

    for idx, (title, symptom, fix) in enumerate(pitfalls_list, 1):
        if is_id:
            pitfalls_body += f"### {idx}. {title}\n- **Gejala / Masalah:** {symptom}\n- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.\n- **Solusi Tepat:** {fix}\n\n"
        else:
            pitfalls_body += f"### {idx}. {title}\n- **Symptom / Issue:** {symptom}\n- **Root Cause:** Common mistaken assumptions during early development.\n- **Fix / Best Practice:** {fix}\n\n"

    # 3. Build Cheatsheet Section
    heading_cheatsheet = "## Ringkasan Sintaks & Quick Reference" if is_id else "## Syntax Cheatsheet & Quick Reference"
    if is_id:
        cheatsheet_body = f"""---

{heading_cheatsheet}

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

"""
    else:
        cheatsheet_body = f"""---

{heading_cheatsheet}

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

"""

    combined_addition = cheatsheet_body + pitfalls_body

    # Insert right before "## Eksperimen" or "## Experiments"
    target_pattern = r'(---\s*\n\s*## (?:Eksperimen|Experiments))'
    if re.search(target_pattern, content):
        new_content = re.sub(target_pattern, combined_addition + r'\1', content, count=1)
    else:
        # Fallback before "## Ringkasan" or "## Summary"
        fallback_pattern = r'(---\s*\n\s*## (?:Ringkasan|Summary))'
        new_content = re.sub(fallback_pattern, combined_addition + r'\1', content, count=1)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return True

def main():
    enhanced_count = 0
    for root, dirs, files in os.walk(COURSE_BASE):
        for f in files:
            if f.endswith('.md'):
                parts = os.path.normpath(root).split(os.sep)
                # course / <slug> / <level> / <lang>
                if len(parts) >= 4:
                    lang = parts[-1]
                    slug = parts[-3]
                    is_id = lang == 'id'
                    file_path = os.path.join(root, f)
                    if enhance_markdown(file_path, slug, is_id):
                        enhanced_count += 1

    print(f"Enhanced {enhanced_count} markdown course files with Pitfalls, Cheatsheets, and Time Badges.")

if __name__ == '__main__':
    main()
