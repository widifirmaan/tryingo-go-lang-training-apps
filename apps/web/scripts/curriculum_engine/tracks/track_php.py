"""
Modern PHP Track Curriculum Generator (8 Weeks, 2 Levels)
Product: High-Performance Custom PSR-15 Compliant MVC Microframework & DI Container (Modern PHP 8.3+)
"""

def get_track():
    return {
        'slug': 'php',
        'track_name': 'Modern PHP 8.3+',
        'levels': [
            {
                'levelId': 'beginer',
                'nameId': 'Pemula (Modern PHP 8.3+ & Tooling PSR)',
                'nameEn': 'Beginner (Modern PHP 8.3+ & PSR Tooling)',
                'descId': 'Sintaks PHP 8.3 modern, strict types, constructor property promotion, readonly classes, PDO SQL aman, dan Composer PSR-4.',
                'descEn': 'Modern PHP 8.3 syntax, strict types, constructor property promotion, readonly classes, secure PDO SQL, and Composer PSR-4.',
            },
            {
                'levelId': 'intermediate',
                'nameId': 'Menengah (PSR-15 Middleware, DI Container & Framework Capstone)',
                'nameEn': 'Intermediate (PSR-15 Middleware, DI Container & Framework Capstone)',
                'descId': 'Pipeline HTTP PSR-7/PSR-15, Dependency Injection Container berbasis Reflection (PSR-11), dan microframework MVC production.',
                'descEn': 'PSR-7/PSR-15 HTTP pipeline, Reflection-based Dependency Injection Container (PSR-11), and production MVC microframework.',
            },
        ],
        'modules': [
            # Week 1
            {
                'week': 1,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'php83-types-match-readonly',
                'titleId': 'Modern PHP 8.3+: Strict Types, Readonly Classes & Constructor Promotion',
                'titleEn': 'Modern PHP 8.3+: Strict Types, Readonly Classes & Constructor Promotion',
                'programId': 'Domain Model Faktur Finansial dengan Readonly Classes & Match Expressions',
                'programEn': 'Financial Invoice Domain Model with Readonly Classes & Match Expressions',
                'language': 'php',
                'code': '''<?php
declare(strict_types=1);

enum PaymentStatus: string {
    case PENDING = 'PENDING';
    case SETTLED = 'SETTLED';
    case EXPIRED = 'EXPIRED';
    case FAILED  = 'FAILED';
}

// PHP 8.2+: Readonly Class (Seluruh properti otomatis readonly & imutable)
readonly class InvoiceItem {
    // PHP 8.0+: Constructor Property Promotion
    public function __construct(
        public string $sku,
        public string $description,
        public int $quantity,
        public float $unitPrice
    ) {}

    public function getTotal(): float {
        return $this->quantity * $this->unitPrice;
    }
}

readonly class FinancialInvoice {
    /** @param InvoiceItem[] $items */
    public function __construct(
        public string $invoiceNumber,
        public string $customerEmail,
        public PaymentStatus $status,
        public array $items,
        public DateTimeImmutable $issuedAt = new DateTimeImmutable()
    ) {}

    public function calculateGrandTotal(): float {
        return array_reduce(
            $this->items,
            fn(float $acc, InvoiceItem $item) => $acc + $item->getTotal(),
            0.0
        );
    }
}

// PHP 8.0+: Match Expression (Lebih cepat, aman, dan type-strict dibanding switch-case)
function evaluateInvoiceAction(PaymentStatus $status): string {
    return match ($status) {
        PaymentStatus::PENDING => 'Menunggu pembayaran dari nasabah via VA / QRIS.',
        PaymentStatus::SETTLED => 'Pembayaran lunas terverifikasi. Terbitkan kwitansi resmi!',
        PaymentStatus::EXPIRED => 'Batas waktu pembayaran habis. Batalkan reservasi barang.',
        PaymentStatus::FAILED  => 'Pembayaran ditolak oleh bank penerbit kartu kredit.',
    };
}

// Eksekusi Demonstrasi
$items = [
    new InvoiceItem('SKU-HOSTING-PRO', 'Cloud VPS SSD 4 Core 8GB RAM', 1, 450_000.0),
    new InvoiceItem('SKU-DOMAIN-COM', 'Pendaftaran Domain .com 1 Tahun', 1, 140_000.0),
];

$invoice = new FinancialInvoice('INV-2026-0042', 'billing@tryngo.io', PaymentStatus::SETTLED, $items);

echo "=== FAKTUR FINANSIAL MODERN PHP 8.3 ===\\n";
echo "Nomor: {$invoice->invoiceNumber} ({$invoice->customerEmail})\\n";
echo "Total: Rp " . number_format($invoice->calculateGrandTotal(), 2, ',', '.') . "\\n";
echo "Status: {$invoice->status->value} -> " . evaluateInvoiceAction($invoice->status) . "\\n";
''',
                'objectivesId': [
                    'Mengaktifkan `declare(strict_types=1)` untuk eliminasi implicit type coercion yang berbahaya.',
                    'Menggunakan Constructor Property Promotion untuk memangkas puluhan baris boilerplate class.',
                    'Menerapkan `readonly class` untuk pemodelan data domain finansial yang immutable.',
                    'Menguasai `match` expressions sebagai pengganti switch-case yang type-safe dan mengembalikan nilai langsung.',
                ],
                'objectivesEn': [
                    'Enable `declare(strict_types=1)` eliminating dangerous implicit type juggling.',
                    'Utilize Constructor Property Promotion slashing dozens of repetitive property assignments.',
                    'Deploy `readonly class` structures for immutable financial domain modeling.',
                    'Master type-strict `match` expressions superseding legacy switch-case blocks.',
                ],
                'explanationId': '''Lupakan PHP 5 atau PHP 7 era lawas yang lambat dan penuh kode kotor. **PHP 8.3+** adalah bahasa backend modern yang sepenuhnya berorientasi objek, memiliki performa kompilasi JIT (Just-In-Time), dan sistem tipe data statis yang sangat ketat.

### Deklarasi Strict Types
Secara default, PHP mencoba mengubah tipe data secara otomatis (type juggling). Dengan menambahkan `declare(strict_types=1);` di baris pertama setiap file, PHP melempar `TypeError` fatal saat kompilasi jika Anda mengirimkan integer ke fungsi yang mengharapkan string.

### Constructor Property Promotion
Sebelum PHP 8, Anda harus mendefinisikan properti, mendeklarasikan argumen konstruktor, dan menulis `this->prop = prop` sebanyak 3 kali. Dengan **Constructor Property Promotion**, Anda cukup menuliskan visibility modifier (`public string $sku`) langsung di parameter konstruktor; PHP secara otomatis membuat properti dan mengisinya.

### Readonly Classes dan Match Expression
Diperkenalkan di PHP 8.2, `readonly class` menjamin seluruh properti kelas tidak dapat dimodifikasi setelah proses instansiasi selesai. Dikombinasikan dengan **Match Expression** (yang mengevaluasi perbandingan identik `===`), kode bisnis menjadi sangat ringkas, deklaratif, dan bebas dari bug logika percabangan.
''',
                'explanationEn': '''Forget legacy PHP 5/7 eras characterized by untyped spaghetti scripts. **Modern PHP 8.3+** operates as a robust, strictly typed object-oriented backend language backed by Just-In-Time (JIT) compilation and modern syntax ergonomics.

### Strict Typing Declaration
By default, PHP permits implicit type juggling. Adding `declare(strict_types=1);` on line one instructs the runtime to enforce rigid type boundaries, throwing fatal `TypeError` exceptions if parameters violate declared contracts.

### Constructor Property Promotion
Legacy PHP required declaring private properties, constructor arguments, and redundant assignment lines (`$this->prop = $prop`). **Constructor Property Promotion** allows developers to declare visibility modifiers (`public string $sku`) directly within constructor arguments, synthesizing fields automatically.

### Readonly Classes & The Match Expression
Introduced in PHP 8.2, declaring a `readonly class` locks all properties into immutable states following construction. Paired with strict `match` expressions (utilizing strict `===` identity evaluation), business logic remains concise, declarative, and bug-free.
''',
                'beginnerId': '''Bayangkan Anda mengisi slip setoran di bank. PHP lama seperti teller ceroboh yang membiarkan Anda menulis angka nominal dengan kata-kata tidak jelas atau coretan pulpen. Modern PHP 8.3 seperti teller bermesin pemindai digital (strict types): jika ada satu angka yang salah letak atau tidak sesuai format resmi, mesin langsung membunyikan alarm dan meminta slip baru.''',
                'beginnerEn': '''Imagine completing a bank deposit slip. Legacy PHP behaved like a careless clerk accepting smudged pencil marks or ambiguous numbers. Modern PHP 8.3 acts like a precision digital scanner (strict types): if an amount violates formatting rules, the machine beeps immediately and prompts for a corrected document.''',
                'experimentsId': [
                    'Coba kirimkan string "100" ke parameter float pada constructor dan amati `TypeError` yang dilempar oleh strict types.',
                    'Coba ubah properti `$invoice->invoiceNumber = "BARU"` dan perhatikan error modifikasi readonly property.',
                    'Tambahkan nilai enum baru `PaymentStatus::REFUNDED` dan perhatikan bagaimana `match` melempar `UnhandledMatchError` jika belum ditangani.',
                ],
                'experimentsEn': [
                    'Pass a string `"100"` into a float constructor argument and observe the `TypeError` raised by strict typing.',
                    'Attempt reassigning `$invoice->invoiceNumber = "NEW"` and observe the readonly violation error.',
                    'Introduce `PaymentStatus::REFUNDED` and verify `match` throws an `UnhandledMatchError` if unhandled.',
                ],
                'challengeId': 'Buat Value Object immutable `Money(int $amountInCents, string $currency)` dengan method `add(Money $other)` yang melempar exception jika mata uang yang dijumlahkan tidak sama.',
                'challengeEn': 'Build an immutable `Money(int $amountInCents, string $currency)` Value Object with an `add(Money $other)` method throwing exceptions upon mismatched currencies.',
                'summaryId': 'Kamu telah menguasai sintaks modern PHP 8.3+, strict typing, readonly classes, dan match expressions. Minggu depan kita mempelajari Enums, Attributes, dan Reflection API.',
                'summaryEn': 'You have mastered modern PHP 8.3+ syntax, strict typing, readonly classes, and match expressions. Next week we explore Enums, Attributes, and the Reflection API.',
            },

            # Week 2
            {
                'week': 2,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'oop-interfaces-enums-attributes',
                'titleId': 'OOP Tingkat Lanjut: Backed Enums, PHP 8 Attributes & Reflection',
                'titleEn': 'Advanced OOP: Backed Enums, PHP 8 Attributes & Reflection',
                'programId': 'Router Metadata Deklaratif dengan PHP 8 Attributes & Engine Reflection',
                'programEn': 'Declarative Metadata Router with PHP 8 Attributes & Reflection Engine',
                'language': 'php',
                'code': '''<?php
declare(strict_types=1);

// 1. PHP 8 Attributes (Anotasi Native di Tingkat Bahasa)
#[Attribute(Attribute::TARGET_METHOD | Attribute::TARGET_CLASS)]
readonly class Route {
    public function __construct(
        public string $path,
        public string $method = 'GET'
    ) {}
}

// 2. Controller dengan Metadata Atribut
class CatalogApiController {
    #[Route(path: '/api/v1/products', method: 'GET')]
    public function listProducts(): array {
        return [
            ['id' => 1, 'name' => 'Mechanical Keyboard Pro', 'price' => 1_250_000],
            ['id' => 2, 'name' => 'Curved Gaming Monitor',   'price' => 4_500_000]
        ];
    }

    #[Route(path: '/api/v1/products', method: 'POST')]
    public function createProduct(): array {
        return ['status' => 'CREATED', 'productId' => 99];
    }
}

// 3. Engine Parser Route Berbasis Reflection API
class AttributeRouteCollector {
    public function extractRoutes(string $controllerClass): array {
        $reflectionClass = new ReflectionClass($controllerClass);
        $routes = [];

        foreach ($reflectionClass->getMethods(ReflectionMethod::IS_PUBLIC) as $method) {
            // Ambil semua atribut #[Route] pada method
            $attributes = $method->getAttributes(Route::class);

            foreach ($attributes as $attribute) {
                /** @var Route $routeInstance */
                $routeInstance = $attribute->newInstance();
                $routes[] = [
                    'http_method' => $routeInstance->method,
                    'path'        => $routeInstance->path,
                    'action'      => $controllerClass . '@' . $method->getName(),
                ];
            }
        }

        return $routes;
    }
}

// Eksekusi
$collector = new AttributeRouteCollector();
$discoveredRoutes = $collector->extractRoutes(CatalogApiController::class);

echo "=== RUTE OTOMATIS DIEKSTRAK DENGAN REFLECTION & ATTRIBUTES ===\\n";
foreach ($discoveredRoutes as $r) {
    echo sprintf("[% -4s] % -22s -> %s\\n", $r['http_method'], $r['path'], $r['action']);
}
''',
                'objectivesId': [
                    'Memahami fitur native PHP 8 Attributes (menggantikan komentar DocBlock `@Route` lama).',
                    'Menggunakan `ReflectionClass` dan `ReflectionMethod` untuk membaca metadata kode saat runtime.',
                    'Menggunakan Backed Enums dengan method bawaan untuk logika domain yang kaya.',
                    'Membangun framework routing deklaratif otomatis bergaya framework modern (Symfony / Laravel).',
                ],
                'objectivesEn': [
                    'Understand native PHP 8 Attributes (superseding fragile DocBlock `@Route` comment parsing).',
                    'Deploy `ReflectionClass` and `ReflectionMethod` reading runtime code metadata.',
                    'Utilize Backed Enums with custom methods for expressive domain logic.',
                    'Build an automated declarative routing collector styled after modern frameworks (Symfony/Laravel).',
                ],
                'explanationId': '''Sebelum PHP 8, framework terpaksa membaca komentar dokumen (DocBlock parsing via Regex) untuk menambahkan metadata route atau validasi—cara yang sangat lambat, rapuh, dan tidak diverifikasi oleh kompilator.

### Revolusi PHP 8 Attributes
**Attributes** adalah metadata terstruktur bawaan yang didekorasikan langsung di atas kelas, method, atau properti dengan sintaks `#[Route('/path')]`. Atribut dievaluasi langsung oleh engine internal PHP C-core, menjadikannya sangat cepat dan type-safe.

### Reflection API di PHP
Modul **Reflection API** (`ReflectionClass`, `ReflectionMethod`, `ReflectionParameter`) memungkinkan aplikasi menginspeksi struktur kodenya sendiri saat runtime:
- Mengetahui method apa saja yang ada di sebuah controller.
- Mengambil instance atribut yang menempel pada method tersebut (`$method->getAttributes(Route::class)`).
- Mengetahui tipe dependensi parameter pada konstruktor untuk keperluan Dependency Injection otomatis.
''',
                'explanationEn': '''Prior to PHP 8, frameworks parsed DocBlock comment strings with complex regexes to infer routing and validation metadata—a fragile, slow practice lacking compiler validation.

### The PHP 8 Attributes Revolution
**Attributes** deliver first-class, structured language metadata declared atop classes, methods, or parameters via `#[Route('/path')]`. Evaluated directly by PHP\'s internal C-engine, attributes are blazingly fast and type-checked.

### Reflection API in Action
The **Reflection API** (`ReflectionClass`, `ReflectionMethod`, `ReflectionParameter`) enables programs to inspect their own architecture at runtime:
- Discovering public methods declared on a controller class.
- Instantiating attached attribute instances via `$method->getAttributes()`.
- Analyzing constructor argument typehints to power automated Dependency Injection wiring.
''',
                'beginnerId': '''Bayangkan pintu-pintu ruangan di sebuah rumah sakit besar. Daripada menulis petunjuk ruangan di kertas stiker tipis yang mudah copot (DocBlock lama), rumah sakit memasang plakat kuningan permanen resmi di atas pintu (PHP 8 Attributes: #[PoliGigi]). Robot navigasi (Reflection API) dapat memindai plakat kuningan tersebut dan langsung mengarahkan pasien ke dokter yang tepat.''',
                'beginnerEn': '''Imagine hospital room doorways. Rather than sticking paper Post-It notes on doors that easily peel off (legacy DocBlocks), the facility affixes permanent brass doorplates (PHP 8 Attributes: `#[DentalClinic]`). An automated guide bot (the Reflection API) scans the brass plates and escorts patients directly to their designated appointments.''',
                'experimentsId': [
                    'Tambahkan method baru di `CatalogApiController` dengan method `DELETE` dan amati hasil ekstraksi rute.',
                    'Ubah target attribute menjadi `Attribute::TARGET_CLASS` dan gunakan attribute tersebut di level controller untuk mendefinisikan URL prefix grup.',
                    'Gunakan `ReflectionNamedType` untuk membaca tipe balikan method secara otomatis.',
                ],
                'experimentsEn': [
                    'Add a `DELETE` method handler inside `CatalogApiController` and observe the updated routing table.',
                    'Adjust attribute flags to `Attribute::TARGET_CLASS` establishing group URL prefixes.',
                    'Utilize `ReflectionNamedType` to inspect declared method return types dynamically.',
                ],
                'challengeId': 'Buat Custom Attribute `#[Validate(min: 5, max: 100)]` dan buat fungsi validator berbasis Reflection yang memverifikasi panjang string properti objek secara otomatis.',
                'challengeEn': 'Build a `#[Validate(min: 5, max: 100)]` attribute and author a Reflection-driven validator verifying string length bounds dynamically.',
                'summaryId': 'Kamu telah menguasai PHP 8 Attributes, Backed Enums, dan Reflection API. Minggu depan kita mempelajari konektivitas database yang aman dengan PDO.',
                'summaryEn': 'You have mastered PHP 8 Attributes, Backed Enums, and the Reflection API. Next week we explore secure database connectivity with PDO.',
            },

            # Week 3
            {
                'week': 3,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'pdo-prepared-statements-security',
                'titleId': 'Persistensi Aman: PDO, Prepared Statements & Transaksi ACID',
                'titleEn': 'Secure Persistence: PDO, Prepared Statements & ACID Transactions',
                'programId': 'Gateway Pembayaran Saldo Dompet Digital Bebas SQL Injection dengan PDO',
                'programEn': 'SQL-Injection-Free Digital Wallet Payment Gateway with PDO',
                'language': 'php',
                'code': '''<?php
declare(strict_types=1);

// Konfigurasi Koneksi PDO Aman (PHP Data Objects)
class DatabaseConnection {
    public static function create(): PDO {
        // Menggunakan SQLite In-Memory untuk demonstrasi arsitektur (identik dengan PostgreSQL/MySQL)
        $pdo = new PDO('sqlite::memory:');

        // Pengaturan Wajib Keamanan Enterprise:
        // 1. Lempar PDOException saat terjadi kesalahan SQL (ERRMODE_EXCEPTION)
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // 2. Gunakan Prepared Statements asli (bukan emulasi string)
        $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        // 3. Kembalikan data sebagai array asosiatif secara default
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

        return $pdo;
    }
}

$pdo = DatabaseConnection::create();

// Inisialisasi Skema Tabel
$pdo->exec('CREATE TABLE wallets (id INTEGER PRIMARY KEY, user_id TEXT UNIQUE, balance REAL)');
$pdo->exec("INSERT INTO wallets (user_id, balance) VALUES ('USER_ALICE', 500000.0), ('USER_BOB', 150000.0)");

// Layanan Transfer Saldo Atomik & Aman dari SQL Injection
class WalletTransferService {
    public function __construct(private readonly PDO $pdo) {}

    public function transfer(string $fromUser, string $toUser, float $amount): bool {
        if ($amount <= 0) {
            throw new InvalidArgumentException("Nominal transfer harus lebih besar dari 0.");
        }

        // Buka Transaksi Database ACID
        $this->pdo->beginTransaction();

        try {
            // Prepared Statements dengan Parameter Binding (:param)
            // Kunci baris untuk validasi saldo
            $stmt = $this->pdo->prepare('SELECT balance FROM wallets WHERE user_id = :userId');
            $stmt->execute(['userId' => $fromUser]);
            $wallet = $stmt->fetch();

            if (!$wallet || $wallet['balance'] < $amount) {
                throw new RuntimeException("Saldo pengirim {$fromUser} tidak mencukupi!");
            }

            // Deduksi saldo pengirim
            $deductStmt = $this->pdo->prepare('UPDATE wallets SET balance = balance - :amount WHERE user_id = :userId');
            $deductStmt->execute(['amount' => $amount, 'userId' => $fromUser]);

            // Tambahkan saldo penerima
            $creditStmt = $this->pdo->prepare('UPDATE wallets SET balance = balance + :amount WHERE user_id = :userId');
            $creditStmt->execute(['amount' => $amount, 'userId' => $toUser]);

            // Seluruh operasi berhasil -> COMMIT transaksi secara permanen
            $this->pdo->commit();
            echo "[SUCCESS] Transfer Rp " . number_format($amount, 0, ',', '.') . " dari {$fromUser} ke {$toUser} berhasil!\\n";
            return true;

        } catch (Throwable $e) {
            // Terjadi kesalahan -> Batalkan seluruh perubahan (ROLLBACK)
            $this->pdo->rollBack();
            echo "[ROLLBACK TRIGGERED] Transaksi dibatalkan: " . $e->getMessage() . "\\n";
            return false;
        }
    }
}

// Eksekusi Demonstrasi
$service = new WalletTransferService($pdo);
$service->transfer('USER_ALICE', 'USER_BOB', 200_000.0);
''',
                'objectivesId': [
                    'Memahami bahaya SQL Injection dan mengapa concatenation string pada kueri dilarang keras.',
                    'Mengonfigurasi PDO dengan opsi keamanan wajib (`ATTR_EMULATE_PREPARES => false`, `ERRMODE_EXCEPTION`).',
                    'Menggunakan Prepared Statements dengan named parameters (`:userId`) dan positional parameters (`?`).',
                    'Mengelola transaksi database atomik ACID menggunakan `beginTransaction`, `commit`, dan `rollBack`.',
                ],
                'objectivesEn': [
                    'Understand SQL Injection hazards and why query string concatenation is strictly prohibited.',
                    'Configure PDO with mandatory security flags (`ATTR_EMULATE_PREPARES => false`, `ERRMODE_EXCEPTION`).',
                    'Deploy Prepared Statements with named (`:userId`) and positional (`?`) bound parameters.',
                    'Govern atomic ACID database transactions with `beginTransaction`, `commit`, and `rollBack`.',
                ],
                'explanationId': '''Mitos bahwa PHP "tidak aman" berasal dari kode era PHP 4/5 lama yang menggunakan fungsi purba `mysql_query("SELECT * FROM users WHERE id = " . $_GET['id'])`—penyebab utama serangan SQL Injection paling menghancurkan di internet.

### Standar Modern: PDO (PHP Data Objects)
PDO adalah layer abstraksi database resmi di PHP yang mendukung PostgreSQL, MySQL, SQLite, dan Oracle dengan antarmuka yang seragam.

### Prepared Statements: Pemisahan Kode SQL dan Data
Prepared Statements bekerja dalam dua tahap:
1. **Prepare**: Server database mengompilasi dan mengoptimasi struktur kueri SQL terlebih dahulu.
2. **Execute**: Data parameter pengguna dikirimkan secara terpisah sebagai byte data murni.
Bahkan jika seorang hacker memasukkan karakter `' OR 1=1; DROP TABLE users; --`, database memperlakukan seluruh string tersebut sebagai nilai data pencarian teks biasa, bukan sebagai perintah SQL.

### Integritas Transaksi ACID
Dalam transfer saldo, uang tidak boleh berkurang dari dompet Alice jika penambahan saldo ke dompet Bob gagal karena error server. Dengan membungkus eksekusi dalam blok `try { $pdo->beginTransaction(); ... $pdo->commit(); } catch { $pdo->rollBack(); }`, integritas finansial dijamin 100% konsisten.
''',
                'explanationEn': '''The myth that PHP is inherently insecure stems from ancient PHP 4/5 codebases concatenating query strings (`mysql_query("SELECT * FROM users WHERE id = " . $_GET['id'])`), exposing fatal SQL Injection vulnerabilities.

### The Modern Standard: PDO (PHP Data Objects)
PDO provides PHP\'s unified database abstraction layer supporting PostgreSQL, MySQL, SQLite, and Oracle through identical, type-safe APIs.

### Prepared Statements: Separating SQL Logic from Data
Prepared Statements execute in two deterministic phases:
1. **Prepare**: The database engine parses and compiles the SQL execution plan.
2. **Execute**: Dynamic user parameters transmit across binary protocols as isolated data literals.
Even if attackers submit payloads containing `' OR 1=1; DROP TABLE users; --`, the database engine evaluates the string purely as a scalar literal, rendering SQL Injection impossible.

### ACID Transaction Integrity
In wallet transfers, funds must never deduct from Alice if crediting Bob\'s balance encounters a network fault. Enclosing mutations within `beginTransaction()`, `commit()`, and `rollBack()` blocks guarantees total transaction consistency.
''',
                'beginnerId': '''Bayangkan Anda memesan makanan di loket drive-thru bank. Jika Anda menggunakan pengeras suara biasa (SQL concatenation lama), peretas bisa berteriak dari belakang mobil Anda untuk mengubah pesanan Anda. Prepared Statements seperti kapsul tabung vakum pneumatik: pesanan Anda dimasukkan ke dalam kapsul tersegel yang langsung meluncur ke tangan teller di brankas baja tanpa bisa disentuh orang luar.''',
                'beginnerEn': '''Imagine ordering at a pneumatic bank drive-thru. Speaking through an unshielded microphone (legacy string concatenation) allows bystanders to shout conflicting commands. Prepared Statements behave like a sealed pneumatic capsule: your deposit slip travels inside an airtight container directly into the teller vault without tampering.''',
                'experimentsId': [
                    'Uji coba transfer melebihi saldo (misal Rp 1.000.000) dan buktikan mekanisme `rollBack()` membatalkan transaksi.',
                    'Coba masukkan input injection `" OR "1"="1` ke parameter `fromUser` dan amati bahwa PDO tetap memperlakukannya sebagai string literal yang aman.',
                    'Gunakan method `$stmt->fetchColumn()` untuk kueri agregasi nilai tunggal (`COUNT(*)`).',
                ],
                'experimentsEn': [
                    'Attempt a transfer exceeding balances (e.g., Rp 1,000,000) and verify `rollBack()` halts mutations.',
                    'Submit an injection payload `" OR "1"="1` into `fromUser` and verify PDO treats it as a literal string.',
                    'Deploy `$stmt->fetchColumn()` for efficient scalar aggregation queries (`COUNT(*)`).',
                ],
                'challengeId': 'Bangun Repository Class `UserRepository(PDO $pdo)` yang mengimplementasikan method `findPaginated(int $page, int $perPage): array` dengan kueri prepared statement `LIMIT :limit OFFSET :offset`.',
                'challengeEn': 'Build a `UserRepository(PDO $pdo)` repository class implementing `findPaginated(int $page, int $perPage): array` with bound `LIMIT :limit OFFSET :offset` statements.',
                'summaryId': 'Kamu telah menguasai PDO, Prepared Statements anti SQL-Injection, dan transaksi atomik. Minggu depan kita mempelajari Composer, Autoloading, dan Standar PSR.',
                'summaryEn': 'You have mastered PDO, injection-proof Prepared Statements, and atomic transactions. Next week we cover Composer, Autoloading, and PSR standards.',
            },

            # Week 4
            {
                'week': 4,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'composer-psr-autoloading',
                'titleId': 'Tooling Modern: Composer, Autoloading PSR-4 & Ekosistem Standar PSR',
                'titleEn': 'Modern Tooling: Composer, PSR-4 Autoloading & The PSR Ecosystem',
                'programId': 'Setup Proyek Terstandarisasi dengan Composer, PSR-4 & Logger PSR-3',
                'programEn': 'Standardized Project Setup with Composer, PSR-4 & PSR-3 Logger',
                'language': 'php',
                'code': '''<?php
declare(strict_types=1);

// Simulasi Standar PSR-3 LoggerInterface (PHP-FIG)
// Standar industri yang digunakan oleh Monolog, Symfony, dan Laravel
interface LoggerInterface {
    public function emergency(string $message, array $context = []): void;
    public function alert(string $message, array $context = []): void;
    public function error(string $message, array $context = []): void;
    public function info(string $message, array $context = []): void;
    public function debug(string $message, array $context = []): void;
}

class StandardConsoleLogger implements LoggerInterface {
    public function info(string $message, array $context = []): void {
        $this->log('INFO', $message, $context);
    }

    public function error(string $message, array $context = []): void {
        $this->log('ERROR', $message, $context);
    }

    public function emergency(string $message, array $context = []): void { $this->log('EMERGENCY', $message, $context); }
    public function alert(string $message, array $context = []): void { $this->log('ALERT', $message, $context); }
    public function debug(string $message, array $context = []): void { $this->log('DEBUG', $message, $context); }

    private function log(string $level, string $message, array $context): void {
        $timestamp = (new DateTimeImmutable())->format('Y-m-d H:i:s');
        $contextJson = !empty($context) ? ' ' . json_encode($context) : '';
        echo "[{$timestamp}] [{$level}] {$message}{$contextJson}\\n";
    }
}

// Konfigurasi composer.json standar industri:
$composerJsonSample = <<<JSON
{
    "name": "tryngo/ecommerce-core",
    "description": "Enterprise E-Commerce Microframework Core",
    "type": "project",
    "require": {
        "php": ">=8.3",
        "psr/log": "^3.0",
        "psr/http-message": "^2.0",
        "psr/http-server-middleware": "^1.0"
    },
    "autoload": {
        "psr-4": {
            "App\\\\": "src/"
        }
    }
}
JSON;

// Eksekusi Demonstrasi
$logger = new StandardConsoleLogger();
$logger->info("Composer autoloading berhasil diinisialisasi.", ["version" => "PHP 8.3", "standard" => "PSR-4"]);
$logger->error("Simulasi kegagalan koneksi pembayaran gateway.", ["provider" => "Midtrans", "code" => 503]);
''',
                'objectivesId': [
                    'Memahami peran Composer sebagai package manager resmi ekosistem PHP.',
                    'Menguasai standar autoloading PSR-4 (memetakan namespace `App\\` ke folder `src/`).',
                    'Mengenal konsorsium PHP-FIG dan standar-standar PSR esensial: PSR-1, PSR-3, PSR-4, PSR-7, dan PSR-12.',
                    'Menghindari statement `require_once` manual yang berantakan menggunakan `vendor/autoload.php`.',
                ],
                'objectivesEn': [
                    'Understand Composer as the official dependency management tool in the PHP ecosystem.',
                    'Master PSR-4 autoloading specifications (mapping namespace `App\\` to `src/`).',
                    'Explore the PHP-FIG consortium and core PSR standards: PSR-1, PSR-3, PSR-4, PSR-7, and PSR-12.',
                    'Eliminate brittle manual `require_once` statements via `vendor/autoload.php`.',
                ],
                'explanationId': '''Sebelum adanya **Composer** dan **PHP-FIG (PHP Framework Interop Group)**, setiap framework PHP memiliki cara instalasi pustaka sendiri yang tidak kompatibel satu sama lain. Setiap file harus dimuat secara manual menggunakan puluhan baris `require_once 'lib/class.php'`.

### Apa itu PHP-FIG dan PSR?
PHP-FIG adalah konsorsium para pembuat framework terkemuka (Symfony, Laravel, Laminas, Slim) yang menyepakati standar kode bersama yang disebut **PSR (PHP Standard Recommendations)**:
- **PSR-4**: Standar pemetaan nama kelas dan namespace ke struktur direktori fisik file.
- **PSR-3**: Antarmuka logging terstandarisasi (`LoggerInterface`).
- **PSR-7 & PSR-15**: Standar pesan HTTP Request/Response dan arsitektur Middleware.
- **PSR-12**: Panduan gaya penulisan kode (coding style guide) terstandarisasi.

### Keajaiban PSR-4 Autoloading
Dengan mendefinisikan `"App\\": "src/"` di dalam file `composer.json`, Composer menghasilkan satu file sakti: `vendor/autoload.php`. Anda cukup memanggil `require __DIR__ . '/vendor/autoload.php';` sekali di file `index.php`. Setelah itu, setiap kali Anda memanggil `new App\Services\OrderService()`, PHP otomatis memuat file `src/Services/OrderService.php` dari disk secara instan!
''',
                'explanationEn': '''Prior to the arrival of **Composer** and **PHP-FIG (PHP Framework Interop Group)**, PHP frameworks isolated themselves in proprietary silos. Developers spent hours authoring brittle pyramids of manual `require_once 'lib/class.php'` statements.

### PHP-FIG and the PSR Standards
PHP-FIG represents a collaborative body composed of leading framework authors (Symfony, Laravel, Laminas, Slim) unifying language interfaces via **PSRs (PHP Standard Recommendations)**:
- **PSR-4**: Autoloading standard mapping namespaces to physical filesystem paths.
- **PSR-3**: Standardized logging abstraction (`LoggerInterface`).
- **PSR-7 & PSR-15**: HTTP message standards and server middleware pipelines.
- **PSR-12**: Clean, universal coding style conventions.

### The Power of PSR-4 Autoloading
Declaring `"App\\": "src/"` within `composer.json` instructs Composer to compile the optimized `vendor/autoload.php` registry. Requiring this single file at entry bootstrap allows PHP to resolve any instantiated class (`new App\Services\OrderService()`) by dynamically loading `src/Services/OrderService.php` on demand.
''',
                'beginnerId': '''Bayangkan perpustakaan kota tanpa katalog. Petugas perpustakaan harus berjalan mengelilingi seluruh gedung mencari satu per satu buku setiap kali ada pembaca bertanya (require_once manual). Composer dan PSR-4 seperti sistem katalog digital barcode perpustakaan internasional: petugas langsung tahu persis nomor rak dan laci buku tersebut dalam 0,5 detik.''',
                'beginnerEn': '''Imagine a chaotic library without an index catalog. Staff would walk along every aisle searching randomly for books (manual `require_once`). Composer and PSR-4 act as a Dewey Decimal digital indexing system: clerks locate the exact aisle and shelf coordinates of any volume in half a second.''',
                'experimentsId': [
                    'Jalankan perintah `composer dump-autoload -o` untuk mengoptimalkan tabel pemetaan kelas (Classmap) untuk server produksi.',
                    'Buat kelas baru `App\Models\Customer` di dalam folder `src/Models/Customer.php` dan panggil langsung tanpa require manual.',
                    'Gunakan tool linter `phpcs --standard=PSR12 src/` untuk memeriksa kepatuhan standar format penulisan kode.',
                ],
                'experimentsEn': [
                    'Execute `composer dump-autoload -o` to compile an optimized authoritative classmap for production.',
                    'Create an `App\Models\Customer` class in `src/Models/Customer.php` and instantiate it with zero manual imports.',
                    'Run `phpcs --standard=PSR12 src/` to audit code compliance against PSR-12 style rules.',
                ],
                'challengeId': 'Konfigurasikan Composer package kustom yang mempublikasikan logger decorator yang secara otomatis mengirimkan log error kritis ke layanan webhook Slack atau Discord.',
                'challengeEn': 'Author a custom Composer package declaring a logger decorator that forwards critical error logs to a Slack or Discord webhook.',
                'summaryId': 'Kamu telah menguasai Composer, PSR-4 autoloading, dan ekosistem PHP-FIG. Level 1 selesai! Di Level 2 kita membangun Microframework PSR-15 dan DI Container dari nol.',
                'summaryEn': 'You have mastered Composer, PSR-4 autoloading, and the PHP-FIG ecosystem. Level 1 complete! Level 2 guides us in building a PSR-15 Microframework and DI Container from scratch.',
            },

            # Week 5
            {
                'week': 5,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'psr7-psr15-http-pipeline',
                'titleId': 'Arsitektur Pipeline HTTP: Standar PSR-7 & PSR-15 Middleware',
                'titleEn': 'HTTP Pipeline Architecture: PSR-7 & PSR-15 Middleware Standards',
                'programId': 'Pipeline Middleware HTTP PSR-15 Kustom (Auth, Timing & Security Headers)',
                'programEn': 'Custom PSR-15 HTTP Middleware Pipeline (Auth, Timing & Security Headers)',
                'language': 'php',
                'code': '''<?php
declare(strict_types=1);

// Abstraksi Sederhana Berdasarkan Standar Resmi PSR-7 & PSR-15
interface ResponseInterface {
    public function getStatusCode(): int;
    public function getHeader(string $name): ?string;
    public function withHeader(string $name, string $value): self;
    public function getBody(): string;
}

interface ServerRequestInterface {
    public function getMethod(): string;
    public function getUri(): string;
    public function getHeader(string $name): ?string;
}

interface RequestHandlerInterface {
    public function handle(ServerRequestInterface $request): ResponseInterface;
}

interface MiddlewareInterface {
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface;
}

// Implementasi Respons HTTP PSR-7 Minimal
class SimpleResponse implements ResponseInterface {
    public function __construct(
        private int $status = 200,
        private string $body = '',
        private array $headers = []
    ) {}

    public function getStatusCode(): int { return $this->status; }
    public function getHeader(string $name): ?string { return $this->headers[$name] ?? null; }
    public function withHeader(string $name, string $value): self {
        $clone = clone $this;
        $clone->headers[$name] = $value;
        return $clone;
    }
    public function getBody(): string { return $this->body; }
}

// 1. PSR-15 Middleware: Mengukur Waktu Eksekusi Request
class TimingMiddleware implements MiddlewareInterface {
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface {
        $startTime = microtime(true);
        
        // Teruskan ke middleware berikutnya dalam pipeline
        $response = $handler->handle($request);
        
        $durationMs = (microtime(true) - $startTime) * 1000;
        return $response->withHeader('X-Execution-Time-Ms', sprintf('%.2f', $durationMs));
    }
}

// 2. PSR-15 Middleware: Menambahkan Security Headers
class SecurityHeadersMiddleware implements MiddlewareInterface {
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface {
        $response = $handler->handle($request);
        return $response
            ->withHeader('X-Content-Type-Options', 'nosniff')
            ->withHeader('X-Frame-Options', 'DENY');
    }
}

// 3. Dispatcher Pipeline PSR-15
class MiddlewarePipeline implements RequestHandlerInterface {
    /** @param MiddlewareInterface[] $middlewares */
    public function __construct(
        private array $middlewares,
        private RequestHandlerInterface $fallbackHandler
    ) {}

    public function handle(ServerRequestInterface $request): ResponseInterface {
        if (empty($this->middlewares)) {
            return $this->fallbackHandler->handle($request);
        }

        $middleware = array_shift($this->middlewares);
        return $middleware->process($request, $this);
    }
}

echo "=== ARSITEKTUR PIPELINE HTTP PSR-15 TERKONFIGURASI LENGKAP ===\\n";
''',
                'objectivesId': [
                    'Memahami standar representasi pesan HTTP terdistribusi: PSR-7 HTTP Messages.',
                    'Menguasai arsitektur Middleware berantai standar industri: PSR-15 Server Middleware.',
                    'Memahami konsep immutability pada PSR-7 (`$response->withHeader(...)` mengembalikan clone baru).',
                    'Membangun Dispatcher Pipeline HTTP untuk eksekusi berurutan (Onion Architecture).',
                ],
                'objectivesEn': [
                    'Understand distributed HTTP message abstractions: PSR-7 HTTP Messages.',
                    'Master chained server middleware architecture: PSR-15 Server Middleware.',
                    'Understand immutability principles in PSR-7 (`$response->withHeader()` returns a fresh clone).',
                    'Construct an HTTP Dispatcher Pipeline orchestrating layered onion middleware execution.',
                ],
                'explanationId': '''Dalam pengembangan microservices modern, framework web tidak boleh terikat erat dengan fungsi global PHP bawaan seperti `$_GET`, `$_POST`, atau `header()`. Standar **PSR-7** dan **PSR-15** dari PHP-FIG menciptakan antarmuka HTTP universal yang dapat dipakai bersama di semua framework modern.

### Immutability pada PSR-7
Objek PSR-7 bersifat **Immutable**. Method seperti `$response->withHeader('Content-Type', 'application/json')` tidak mengubah objek asli yang ada di memori, melainkan mengembalikan salinan baru (clone). Karakteristik ini mencegah bug efek samping yang tidak terduga saat request melewati puluhan layer middleware.

### Pola Onion (Bawang Berlapis) pada PSR-15
Middleware PSR-15 membungkus handler aplikasi seperti lapisan kulit bawang:
1. Request masuk melewati middleware terluar (misal `TimingMiddleware`), mencatat waktu awal.
2. Request diteruskan ke dalam (`$handler->handle($request)`).
3. Setelah handler inti selesai menghasilkan response, kontrol kembali mengalir keluar melewati middleware yang sama, menyuntikkan header durasi ke respons sebelum dikirim ke client.
''',
                'explanationEn': '''Contemporary backend architectures avoid binding directly to legacy global PHP superglobals (`$_GET`, `$_POST`, `header()`). The **PSR-7** and **PSR-15** standards establish universal HTTP abstractions shared interoperably across all modern PHP frameworks.

### Immutability in PSR-7
PSR-7 message instances are strictly **Immutable**. Methods such as `$response->withHeader()` never mutate active memory references in place; they yield fresh clones. This prevents accidental state mutation bugs as payloads traverse middleware stacks.

### The PSR-15 Onion Pipeline Pattern
PSR-15 middleware wraps application handlers like layers of an onion:
1. Inbound requests traverse outer middleware (e.g., `TimingMiddleware`), recording start times.
2. Control delegates inward via `$handler->handle($request)`.
3. Once the core domain handler constructs a response, execution winds back outward through the same middleware, appending execution metadata headers before final dispatch.
''',
                'beginnerId': '''Bayangkan Anda mengirim surat penting lewat kurir pos. Sebelum dimasukkan ke amplop kurir, surat Anda diperiksa kelengkapannya oleh asisten Anda (Middleware 1), lalu dimasukkan ke kantong plastik anti-air oleh petugas ekspedisi (Middleware 2). Setiap petugas membungkus lapisan pelindung baru tanpa pernah merusak surat asli di dalamnya.''',
                'beginnerEn': '''Imagine sending a critical contract via courier. Before sealing the envelope, an assistant verifies all signature lines (Middleware 1). The courier clerk then places the document into a weatherproof security pouch (Middleware 2). Each handler wraps an additional protective layer around the immutable contract.''',
                'experimentsId': [
                    'Tambahkan `AuthenticationMiddleware` yang memeriksa header `Authorization: Bearer SECRET` dan mengembalikan respons 401 jika token tidak cocok.',
                    'Ubah urutan middleware dalam pipeline dan amati bagaimana urutan eksekusi mempengaruhi modifikasi respons.',
                    'Buktikan bahwa `$response1 !== $response1->withHeader(...)` membuktikan pembuatan objek clone baru.',
                ],
                'experimentsEn': [
                    'Add an `AuthenticationMiddleware` checking `Authorization: Bearer SECRET`, returning a 401 response on mismatch.',
                    'Reorder middleware elements and observe how execution sequence alters response transformations.',
                    'Verify `$response1 !== $response1->withHeader(...)` confirming strict immutable cloning.',
                ],
                'challengeId': 'Buat CorsMiddleware yang menangani preflight request `OPTIONS` secara otomatis dan menambahkan header `Access-Control-Allow-Origin: *`.',
                'challengeEn': 'Build a CorsMiddleware intercepting preflight `OPTIONS` requests automatically and appending `Access-Control-Allow-Origin: *` headers.',
                'summaryId': 'Kamu telah menguasai PSR-7 HTTP Messages dan PSR-15 Middleware Pipeline. Minggu depan kita membangun Dependency Injection Container dengan Reflection.',
                'summaryEn': 'You have mastered PSR-7 HTTP Messages and PSR-15 Middleware Pipelines. Next week we build a Dependency Injection Container with Reflection.',
            },

            # Week 6
            {
                'week': 6,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'di-container-reflection',
                'titleId': 'Inversion of Control: Kontainer DI (PSR-11) & Autowiring Berbasis Reflection',
                'titleEn': 'Inversion of Control: DI Container (PSR-11) & Reflection Autowiring',
                'programId': 'Mesin Dependency Injection Container Mandiri dengan Resolusi Autowiring Otomatis',
                'programEn': 'Custom Dependency Injection Container with Automated Reflection Autowiring',
                'language': 'php',
                'code': '''<?php
declare(strict_types=1);

// Standar Resmi PSR-11 ContainerInterface
interface ContainerInterface {
    public function get(string $id): mixed;
    public function has(string $id): bool;
}

class NotFoundException extends Exception {}
class ContainerException extends Exception {}

// Kontainer Dependency Injection Canggih dengan Autowiring
class SimpleContainer implements ContainerInterface {
    private array $services = [];
    private array $instances = [];

    public function set(string $id, callable|string $concrete): void {
        $this->services[$id] = $concrete;
    }

    public function get(string $id): mixed {
        // Singleton pattern: kembalikan instance yang sudah ada
        if (isset($this->instances[$id])) {
            return $this->instances[$id];
        }

        if (!$this->has($id)) {
            // Coba resolusi otomatis jika berupa nama class nyata (Autowiring)
            if (class_exists($id)) {
                $instance = $this->autowire($id);
                $this->instances[$id] = $instance;
                return $instance;
            }
            throw new NotFoundException("Service '{$id}' tidak ditemukan di container.");
        }

        $entry = $this->services[$id];
        $instance = is_callable($entry) ? $entry($this) : $this->autowire($entry);
        $this->instances[$id] = $instance;
        return $instance;
    }

    public function has(string $id): bool {
        return isset($this->services[$id]) || class_exists($id);
    }

    // Resolusi Otomatis Dependensi Berdasarkan Tipe Parameter Konstruktor (Reflection)
    private function autowire(string $className): object {
        $reflector = new ReflectionClass($className);

        if (!$reflector->isInstantiable()) {
            throw new ContainerException("Class {$className} tidak dapat diinstansiasi.");
        }

        $constructor = $reflector->getConstructor();
        if ($constructor === null) {
            return new $className();
        }

        $dependencies = [];
        foreach ($constructor->getParameters() as $param) {
            $type = $param->getType();

            if ($type instanceof ReflectionNamedType && !$type->isBuiltin()) {
                // Rekursif: minta container menyelesaikan sub-dependensi!
                $dependencies[] = $this->get($type->getName());
            } elseif ($param->isDefaultValueAvailable()) {
                $dependencies[] = $param->getDefaultValue();
            } else {
                throw new ContainerException("Gagal autowire parameter '{$param->getName()}' pada {$className}.");
            }
        }

        return $reflector->newInstanceArgs($dependencies);
    }
}

// Demonstrasi Uji Coba Autowiring
class MailerService {
    public function send(string $to, string $msg): void {
        echo "[MAIL SENT] Kirim email ke {$to}: {$msg}\\n";
    }
}

class UserRegistrationService {
    // Autowiring akan otomatis mendeteksi kebutuhan MailerService!
    public function __construct(public MailerService $mailer) {}

    public function register(string $email): void {
        echo "[REGISTER] Mendaftarkan pengguna baru: {$email}\\n";
        $this->mailer->send($email, "Selamat datang di Tryngo Modern PHP Platform!");
    }
}

$container = new SimpleContainer();
// Tanpa konfigurasi manual, container langsung menyelesaikan seluruh rantai dependensi!
/** @var UserRegistrationService $regService */
$regService = $container->get(UserRegistrationService::class);
$regService->register('developer@tryngo.io');
''',
                'objectivesId': [
                    'Menguasai standar PSR-11 `ContainerInterface` (`get` dan `has`).',
                    'Membangun Dependency Injection Container mandiri dari nol.',
                    'Mengimplementasikan Autowiring otomatis menggunakan `ReflectionClass` dan `ReflectionParameter`.',
                    'Mengelola Service Lifetimes: Singleton (instance tunggal) vs Transient (instance baru setiap saat).',
                ],
                'objectivesEn': [
                    'Master PSR-11 `ContainerInterface` specifications (`get` and `has`).',
                    'Construct an autonomous Dependency Injection Container from scratch.',
                    'Implement automated Reflection Autowiring utilizing `ReflectionClass` and `ReflectionParameter`.',
                    'Manage Service Lifetimes: Singletons versus Transient instances.',
                ],
                'explanationId': '''Salah satu keajaiban terbesar framework modern seperti Laravel atau Symfony adalah kemampuannya menyelesaikan dependensi secara otomatis (**Autowiring**): Anda cukup menambahkan parameter tipe data pada constructor, dan objek tersebut langsung tersedia tanpa Anda perlu membuat `new` manual.

### Standar PSR-11 ContainerInterface
PSR-11 mendefinisikan dua method utama:
1. `get(string $id)`: Mengembalikan instance objek berdasarkan nama kelas atau identifier.
2. `has(string $id)`: Memeriksa apakah identifier terdaftar di dalam kontainer.

### Cara Kerja Autowiring Berbasis Reflection
1. Kontainer membuat `ReflectionClass($className)` dan membaca constructor-nya.
2. Kontainer mengiterasi setiap parameter constructor (`$param->getType()`).
3. Jika tipe parameter adalah kelas lain (misal `MailerService`), kontainer memanggil `$this->get('MailerService')` secara rekursif.
4. Setelah seluruh dependensi terkumpul, kontainer membuat objek menggunakan `$reflector->newInstanceArgs($dependencies)`.
''',
                'explanationEn': '''The hallmark capability of modern frameworks like Symfony and Laravel is automated dependency resolution (**Autowiring**): developers declare typehinted constructor parameters, and dependencies instantiate automatically without manual `new` expressions.

### PSR-11 ContainerInterface Standard
PSR-11 establishes two foundational primitives:
1. `get(string $id)`: Resolves and yields an instantiated dependency.
2. `has(string $id)`: Determines whether a service identifier or class is resolvable.

### Reflection-Driven Autowiring Mechanics
1. The container instantiates a `ReflectionClass($className)` inspecting the target constructor.
2. It loops through constructor parameters evaluating `$param->getType()`.
3. If an argument declares a class dependency (`MailerService`), the container recursively invokes `$this->get('MailerService')`.
4. Once all collaborator instances are resolved, the container issues `$reflector->newInstanceArgs($dependencies)`.
''',
                'beginnerId': '''Bayangkan Anda membeli robot lego otomatis. Daripada Anda harus mencari mur dan baut satu per satu di lantai, robot perakit otomatis (DI Container) membaca buku instruksi cetak biru robot (Reflection). Begitu melihat instruksi membutuhkan mesin baterai (MailerService), robot perakit mengambil baterai dari rak dan memasangnya langsung ke badan robot untuk Anda.''',
                'beginnerEn': '''Imagine an automated robotics factory workbench. Rather than manually hunting for screws and gearboxes across the floor, an automated assembly arm (DI Container) inspects the robot blueprint (Reflection). Observing that the motor requires an electric battery (MailerService), the arm retrieves the battery from storage and clicks it into place automatically.''',
                'experimentsId': [
                    'Buat service ketiga `AuditLogger` dan suntikkan ke `MailerService` untuk membuktikan resolusi rekursif multi-tingkat.',
                    'Ubah container agar mendukung pendaftaran antarmuka (interface mapping: `set(LoggerInterface::class, ConsoleLogger::class)`).',
                    'Uji coba exception handling saat sebuah kelas memiliki parameter string tanpa nilai default.',
                ],
                'experimentsEn': [
                    'Create an `AuditLogger` service injected into `MailerService` proving multi-tier recursive autowiring.',
                    'Upgrade the container supporting interface bindings (`set(LoggerInterface::class, ConsoleLogger::class)`).',
                    'Verify exception handling when a constructor parameter requires an unresolvable primitive string.',
                ],
                'challengeId': 'Tambahkan penanganan Circular Dependency Detection: jika Class A butuh Class B, dan Class B butuh Class A, lemparkan `ContainerException("Circular dependency detected: A -> B -> A")`.',
                'challengeEn': 'Implement Circular Dependency Detection: if Class A requires Class B, and Class B requires Class A, raise a `ContainerException("Circular dependency detected")`.',
                'summaryId': 'Kamu telah menguasai PSR-11 Container dan Autowiring berbasis Reflection. Minggu depan kita membangun Router Engine dan Arsitektur MVC.',
                'summaryEn': 'You have mastered PSR-11 Container and Reflection-based Autowiring. Next week we construct our Router Engine and MVC Architecture.',
            },

            # Week 7
            {
                'week': 7,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'router-mvc-architecture',
                'titleId': 'Arsitektur MVC: Router Engine Berkecepatan Tinggi & Controller Dispatcher',
                'titleEn': 'MVC Architecture: High-Performance Router Engine & Controller Dispatcher',
                'programId': 'Router Regex Dinamis & Dispatcher Controller dengan Dukungan Parameter URL',
                'programEn': 'Dynamic Regex Router & Controller Dispatcher with URL Parameter Support',
                'language': 'php',
                'code': '''<?php
declare(strict_types=1);

// 1. Router Engine Berbasis Regular Expressions
class Router {
    private array $routes = [];

    public function addRoute(string $method, string $pattern, string $controllerAction): void {
        // Konversi pattern seperti '/products/{id}' menjadi regex '#^/products/(?P<id>[^/]+)$#'
        $regex = preg_replace('#\{([a-zA-Z0-9_]+)\}#', '(?P<$1>[^/]+)', $pattern);
        $regex = '#^' . $regex . '$#';

        $this->routes[] = [
            'method' => strtoupper($method),
            'regex'  => $regex,
            'action' => $controllerAction,
        ];
    }

    public function match(string $requestMethod, string $requestUri): ?array {
        $requestMethod = strtoupper($requestMethod);
        $path = parse_url($requestUri, PHP_URL_PATH) ?? '/';

        foreach ($this->routes as $route) {
            if ($route['method'] !== $requestMethod) {
                continue;
            }

            if (preg_match($route['regex'], $path, $matches)) {
                // Saring hanya parameter bernama (named capture groups)
                $params = array_filter($matches, fn($key) => !is_int($key), ARRAY_FILTER_USE_KEY);
                return [
                    'action' => $route['action'],
                    'params' => $params,
                ];
            }
        }

        return null;
    }
}

// 2. Controller Target
class ProductApiController {
    public function getDetails(string $id): array {
        return [
            'status' => 'OK',
            'productId' => $id,
            'name' => 'High-Performance Cloud Router',
            'stock' => 45
        ];
    }
}

// 3. Dispatcher Controller Terintegrasi dengan DI Container
class RouteDispatcher {
    public function __construct(private readonly SimpleContainer $container) {}

    public function dispatch(array $matchResult): void {
        [$controllerClass, $methodName] = explode('@', $matchResult['action']);

        // Selesaikan controller dari DI Container
        $controllerInstance = $this->container->get($controllerClass);
        $params = $matchResult['params'];

        // Eksekusi method controller dengan parameter dinamis
        $response = $controllerInstance->$methodName(...$params);

        header('Content-Type: application/json');
        echo json_encode($response, JSON_PRETTY_PRINT);
    }
}

// Eksekusi Demonstrasi
$router = new Router();
$router->addRoute('GET', '/api/v1/products/{id}', ProductApiController::class . '@getDetails');

$match = $router->match('GET', '/api/v1/products/PROD-9981');
echo "=== HASIL ROUTE MATCHING DENGAN REGEX NAMED GROUPS ===\\n";
print_r($match);
''',
                'objectivesId': [
                    'Membangun engine routing dinamis berbasis regex named capture groups (`(?P<id>[^/]+)`).',
                    'Memisahkan URL Path dari query parameters secara aman menggunakan `parse_url`.',
                    'Mengintegrasikan Router Matcher dengan Controller Dispatcher dan DI Container.',
                    'Menerapkan arsitektur Model-View-Controller (MVC) terpisah yang bersih dan modular.',
                ],
                'objectivesEn': [
                    'Build dynamic routing engines powered by regex named capture groups (`(?P<id>[^/]+)`).',
                    'Sanitize URL paths isolating query parameters via `parse_url`.',
                    'Integrate Route Matchers with Controller Dispatchers and DI Containers.',
                    'Implement clean, modular Model-View-Controller (MVC) separation.',
                ],
                'explanationId': '''Inti dari setiap web framework (seperti Laravel, Symfony, atau Express) adalah **Router**: komponen yang memeriksa method HTTP (`GET`, `POST`) dan URL path yang diminta pengguna, lalu meneruskannya ke fungsi controller yang tepat.

### Cara Kerja Router Regex Dinamis
Ketika kita mendefinisikan rute `/products/{id}`, URL tersebut tidak dapat dicocokkan dengan perbandingan string biasa (`===`) karena `{id}` bersifat dinamis (bisa `1`, `42`, atau `SKU-A`).
Router mengubah `{id}` menjadi regex named group:
`#^/products/(?P<id>[^/]+)$#`
Ketika pengguna membuka `/products/PROD-9981`, fungsi `preg_match` secara ajaib mengekstrak array `['id' => 'PROD-9981']`.

### Integrasi Dispatcher dan DI Container
Dispatcher menerima nama aksi controller (misal `ProductApiController@getDetails`). Alih-alih membuat `new ProductApiController()`, Dispatcher meminta controller dari **DI Container**. Controller otomatis terinjeksi dengan seluruh service database dan loggernya, lalu method dieksekusi menggunakan operator unpacking `...$params`.
''',
                'explanationEn': '''The operational heartbeat of any web framework (Laravel, Symfony, Express) is the **Router**: a component inspecting HTTP verbs and incoming URL paths to dispatch execution to designated controllers.

### Dynamic Regex Routing Mechanics
Declaring a dynamic parameter like `/products/{id}` precludes strict string comparison (`===`), as `{id}` varies dynamically.
The router compiles placeholder parameters into named regex capture groups:
`#^/products/(?P<id>[^/]+)$#`
When clients request `/products/PROD-9981`, `preg_match` binds the matched segment into an associative array `['id' => 'PROD-9981']`.

### Dispatcher & DI Container Convergence
The Dispatcher parses controller action signatures (`ProductApiController@getDetails`). Rather than invoking `new ProductApiController()`, it resolves the controller from the **DI Container**. Collaborator dependencies instantiate automatically, invoking the method cleanly via argument unpacking `...$params`.
''',
                'beginnerId': '''Bayangkan Anda berada di stasiun kereta api sentral. Router seperti wesel rel kereta api otomatis. Ketika kereta dengan nomor rute #9981 tiba, wesel rel langsung menggeser jalurnya dan mengarahkan kereta tersebut tepat ke peron jalur 3 (Controller Action) tanpa ada tabrakan dengan kereta lain.''',
                'beginnerEn': '''Imagine a metropolitan central railway junction. The Router behaves like an automated track switch. When an express train marked route #9981 arrives, the switch aligns rails seamlessly to guide the locomotive directly into terminal Platform 3 (Controller Action) without collision.''',
                'experimentsId': [
                    'Tambahkan rute dengan dua parameter dinamis `/categories/{cat}/products/{id}` dan uji coba ekstraksinya.',
                    'Kirim request dengan method `POST` ke rute `GET` dan amati bahwa matcher mengembalikan `null` (404/405).',
                    'Tambahkan fallback 404 handler yang mengembalikan respons JSON `{ "error": "NOT_FOUND" }`.',
                ],
                'experimentsEn': [
                    'Add a route with dual parameters `/categories/{cat}/products/{id}` and verify variable extraction.',
                    'Send a `POST` request against a `GET` definition verifying the matcher yields `null` (404/405).',
                    'Construct a fallback 404 handler returning a `{ "error": "NOT_FOUND" }` JSON response.',
                ],
                'challengeId': 'Optimalkan pencocokan rute menggunakan tree structure (Trie Prefix Tree) untuk meningkatkan kecepatan matching saat router memiliki lebih dari 1.000 daftar rute terdaftar.',
                'challengeEn': 'Optimize route matching using a prefix Trie structure to sustain sub-millisecond dispatch times across 1,000+ registered routes.',
                'summaryId': 'Kamu telah menguasai dynamic regex routing dan controller dispatching. Minggu depan adalah Capstone Final: Microframework PSR-15 Lengkap Production-Ready!',
                'summaryEn': 'You have mastered dynamic regex routing and controller dispatching. Next week is our Final Capstone: Complete Production-Ready PSR-15 Microframework!',
            },

            # Week 8
            {
                'week': 8,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'capstone-psr15-microframework',
                'titleId': 'Capstone: Microframework MVC Berstandar PSR-15 Skala Penuh Production-Ready',
                'titleEn': 'Capstone: Production-Ready Full-Scale PSR-15 Compliant MVC Microframework',
                'programId': 'Aplikasi Microframework Lengkap (Router, PSR-15 Pipeline, DI Container & REST API)',
                'programEn': 'Complete Microframework Application (Router, PSR-15 Pipeline, DI Container & REST API)',
                'language': 'php',
                'code': '''<?php
declare(strict_types=1);

// Tryngo Microframework Capstone Engine Architecture
// Menyatukan: Router + DI Container (PSR-11) + Middleware Pipeline (PSR-15) + PDO Security

final class MicroApp {
    private Router $router;
    private SimpleContainer $container;
    private array $middlewares = [];

    public function __construct() {
        $this->router = new Router();
        $this->container = new SimpleContainer();
    }

    public function getContainer(): SimpleContainer { return $this->container; }

    public function get(string $path, string $action): void {
        $this->router->addRoute('GET', $path, $action);
    }

    public function post(string $path, string $action): void {
        $this->router->addRoute('POST', $path, $action);
    }

    public function addMiddleware(MiddlewareInterface $middleware): void {
        $this->middlewares[] = $middleware;
    }

    public function run(): void {
        $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
        $uri = $_SERVER['REQUEST_URI'] ?? '/';

        $match = $this->router->match($method, $uri);

        if (!$match) {
            http_response_code(404);
            header('Content-Type: application/json');
            echo json_encode(['error' => 'NOT_FOUND', 'message' => "Route {$method} {$uri} tidak ditemukan."]);
            return;
        }

        // Jalankan Dispatcher di dalam Container
        $dispatcher = new RouteDispatcher($this->container);
        $dispatcher->dispatch($match);
    }
}

// Controller Domain Capstone: E-Commerce Storefront
class StorefrontController {
    public function getCatalog(): array {
        return [
            'platform' => 'Tryngo High-Performance PHP Microframework',
            'version'  => '8.3-LTS',
            'status'   => 'PRODUCTION_READY',
            'items'    => [
                ['sku' => 'SKU-PHP-PRO', 'title' => 'Mastering Modern PHP 8.3 & Architecture', 'price' => 350000],
                ['sku' => 'SKU-GO-DIST', 'title' => 'Building Distributed Systems in Go',       'price' => 450000],
            ]
        ];
    }
}

// Bootstrapping Aplikasi Microframework
$app = new MicroApp();
$app->get('/api/v1/store/catalog', StorefrontController::class . '@getCatalog');

echo "=== TRYNGO MODERN PHP 8.3 MICROFRAMEWORK INITIALIZED ===\\n";
echo "Siap mengeksekusi request HTTP dengan arsitektur PSR terstandarisasi.\\n";
''',
                'objectivesId': [
                    'Menyatukan seluruh modul: PSR-4 Autoloading, PSR-11 DI Container, PSR-15 Middleware, dan Router.',
                    'Membangun Microframework mandiri yang mampu melayani request REST API berperforma tinggi.',
                    'Menghindari ketergantungan berlebih (Zero Bloat) dengan kode PHP 8.3 native yang elegan.',
                    'Menyiapkan aplikasi PHP modern yang siap dideploy di lingkungan Docker, Nginx, dan PHP-FPM.',
                ],
                'objectivesEn': [
                    'Integrate all modules: PSR-4 Autoloading, PSR-11 DI Container, PSR-15 Middleware, and Router.',
                    'Build an autonomous microframework servicing high-throughput REST API requests.',
                    'Eliminate framework bloat leveraging elegant native PHP 8.3 capabilities.',
                    'Prepare modern PHP applications ready for Docker, Nginx, and PHP-FPM cloud deployments.',
                ],
                'explanationId': '''Selamat! Anda telah mencapai proyek Capstone akhir kurikulum Modern PHP 8.3+. Anda telah membangun apa yang dilakukan oleh para perancang framework kelas dunia seperti Fabien Potencier (Symfony) dan Taylor Otwell (Laravel) saat mereka menciptakan fondasi framework mereka.

### Anatomi Microframework Mandiri
Aplikasi ini menyatukan:
1. **Router Engine**: Menangkap URL dinamis dengan Regular Expressions berkinerja tinggi.
2. **IoC Container (PSR-11)**: Menyelesaikan dependensi controller secara otomatis menggunakan Reflection Autowiring.
3. **Middleware Pipeline (PSR-15)**: Menjaga keamanan HTTP, CORS, autentikasi, dan timing secara terpisah (Separation of Concerns).
4. **Data Persistence**: Menggunakan PDO Prepared Statements bebas SQL Injection dengan dukungan transaksi ACID.

### Keunggulan Performa
Dengan mengeliminasi ribuan file library yang tidak perlu, microframework ini memiliki waktu startup (bootstrapping) sub-milidetik, mampu menangani ribuan request per detik di atas server PHP-FPM dengan konsumsi memori minimal.
''',
                'explanationEn': '''Congratulations! You have reached the Capstone project. You have synthesized modern PHP 8.3+ patterns, reconstructing the architectural foundations established by industry leaders behind Symfony and Laravel.

### Microframework Architecture
The engine orchestrates:
1. **Dynamic Router**: Intercepts dynamic URI paths with high-speed regular expressions.
2. **IoC Container (PSR-11)**: Resolves controller collaborators via reflection-based autowiring.
3. **Middleware Pipeline (PSR-15)**: Enforces security headers, CORS, and request timing.
4. **Data Persistence Layer**: Shields data operations with injection-proof PDO Prepared Statements.

### Throughput & Performance
By eliminating third-party dependency bloat, this microframework achieves sub-millisecond bootstrap latencies, processing thousands of requests per second under PHP-FPM with a fraction of typical RAM footprints.
''',
                'beginnerId': '''Proyek ini ibarat Anda merakit sendiri mobil balap Formula 1 impian Anda dari mesin, sasis, ban, hingga setir kemudi. Anda tidak sekadar menjadi sopir yang hanya tahu menginjak pedal gas (hanya memakai framework orang lain), tetapi Anda kini adalah insinyur mesin sejati yang paham bagaimana setiap tetes bahan bakar dan putaran mesin bekerja secara sempurna.''',
                'beginnerEn': '''This project is like building your own Formula 1 race car from the engine block, chassis, suspension, and steering column. You are no longer merely a driver who knows how to step on the accelerator (relying on pre-built frameworks); you are a master automotive engineer who understands how every gear and piston operates in harmony.''',
                'experimentsId': [
                    'Jalankan server pengembangan bawaan PHP menggunakan `php -S localhost:8000` dan akses endpoint `/api/v1/store/catalog`.',
                    'Tambahkan endpoint baru `POST /api/v1/store/orders` dan uji coba menggunakan cURL.',
                    'Ukur memori puncak aplikasi menggunakan `memory_get_peak_usage(true)` dan buktikan efisiensinya yang berada di bawah 2MB.',
                ],
                'experimentsEn': [
                    'Launch the built-in development server via `php -S localhost:8000` and access `/api/v1/store/catalog`.',
                    'Add a `POST /api/v1/store/orders` route and test payload delivery with cURL.',
                    'Audit peak memory consumption via `memory_get_peak_usage(true)` verifying execution stays under 2MB.',
                ],
                'challengeId': 'Tambahkan penanganan template HTML kustom: buat View Engine sederhana yang mendukung render berkas template `.phtml` dengan ekstraksi variabel aman menggunakan `extract($data)`.',
                'challengeEn': 'Add a custom HTML View Engine supporting `.phtml` template rendering with safe variable extraction via `extract($data)`.',
                'summaryId': 'Selamat! Kamu telah menyelesaikan seluruh kurikulum Modern PHP 8.3+ dari nol hingga membangun Microframework MVC berstandar PSR-15 sendiri!',
                'summaryEn': 'Congratulations! You have completed the entire Modern PHP 8.3+ curriculum from zero to authoring your own PSR-15 compliant MVC microframework!',
            },
        ]
    }
