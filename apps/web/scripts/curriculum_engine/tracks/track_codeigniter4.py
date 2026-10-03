"""
CodeIgniter 4 Track Curriculum Generator (8 Weeks, 2 Levels)
Product: High-Speed Lightweight Academic & School Information Management System (CodeIgniter 4)
"""

def get_track():
    return {
        'slug': 'codeigniter4',
        'track_name': 'CodeIgniter 4',
        'levels': [
            {
                'levelId': 'beginer',
                'nameId': 'Pemula (Fondasi CI4, Spark & Model Entities)',
                'nameEn': 'Beginner (CI4 Foundations, Spark & Model Entities)',
                'descId': 'Arsitektur MVC CodeIgniter 4, Spark CLI, Model Entities, View Layouts, dan Route Filters keamanan.',
                'descEn': 'CodeIgniter 4 MVC architecture, Spark CLI, Model Entities, View Layouts, and security Route Filters.',
            },
            {
                'levelId': 'intermediate',
                'nameId': 'Menengah (RESTful APIs, Transaksi & SIS Capstone)',
                'nameEn': 'Intermediate (RESTful APIs, Transactions & SIS Capstone)',
                'descId': 'ResourceController RESTful, Query Builder berkinerja tinggi, transaksi atomik, dan sistem informasi akademik lengkap.',
                'descEn': 'RESTful ResourceController, high-performance Query Builder, atomic transactions, and complete academic SIS platform.',
            },
        ],
        'modules': [
            # Week 1
            {
                'week': 1,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'ci4-mvc-spark-routing',
                'titleId': 'Arsitektur CodeIgniter 4: Spark CLI, Routing & Controller Namespacing',
                'titleEn': 'CodeIgniter 4 Architecture: Spark CLI, Routing & Controller Namespacing',
                'programId': 'Portal Akademik Sekolah dengan Spark CLI & Route Groups Terstruktur',
                'programEn': 'Academic School Portal with Spark CLI & Structured Route Groups',
                'language': 'php',
                'code': '''<?php
// app/Config/Routes.php (CodeIgniter 4 Modern Routing)
use CodeIgniter\\Router\\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');

// Pengelompokan Rute Portal Akademik Berdasarkan Namespace
$routes->group('portal/academic', ['namespace' => 'App\\Controllers\\Academic'], static function ($routes) {
    $routes->get('/', 'DashboardController::index', ['as' => 'academic.dashboard']);
    $routes->get('students', 'StudentController::index', ['as' => 'academic.students.list']);
    $routes->get('students/(:num)', 'StudentController::show/$1', ['as' => 'academic.students.show']);
    $routes->post('students/enroll', 'StudentController::enroll', ['as' => 'academic.students.enroll']);
});

// app/Controllers/Academic/StudentController.php
namespace App\\Controllers\\Academic;

use App\\Controllers\\BaseController;

class StudentController extends BaseController {
    public function index(): string {
        $data = [
            'title'       => 'Buku Induk Siswa & Akademik',
            'active_term' => 'Semester Ganjil 2026/2027',
            'students'    => [
                ['nisn' => '1029481', 'name' => 'Aditya Pratama', 'grade' => 'XII-RPL-1', 'gpa' => 3.85],
                ['nisn' => '1029482', 'name' => 'Siti Nurhaliza', 'grade' => 'XII-RPL-1', 'gpa' => 3.92],
            ]
        ];

        return view('academic/student_list', $data);
    }

    public function show(int $nisn): string {
        return view('academic/student_detail', ['nisn' => $nisn]);
    }
}

echo "=== CODEIGNITER 4 MVC SPARK ROUTING & CONTROLLER NAMESPACING ACTIVE ===\\n";
''',
                'objectivesId': [
                    'Memahami filosofi CodeIgniter 4: framework PHP teringan di dunia dengan jejak instalasi sangat kecil (< 15MB).',
                    'Menggunakan Spark CLI (`php spark serve`, `php spark make:controller`) untuk otomatisasi pengembangan.',
                    'Mengorganisir rute terstruktur menggunakan `$routes->group()` dan named routes.',
                    'Menerapkan namespacing controller berbasis domain bisnis (`App\\Controllers\\Academic`).',
                ],
                'objectivesEn': [
                    'Understand CodeIgniter 4 philosophy: the world\'s lightest full-stack PHP framework (< 15MB footprint).',
                    'Utilize Spark CLI (`php spark serve`, `php spark make:controller`) for automated scaffolding.',
                    'Organize structured routing via `$routes->group()` and named routes.',
                    'Apply domain-driven controller namespacing (`App\\Controllers\\Academic`).',
                ],
                'explanationId': '''CodeIgniter 4 (CI4) adalah framework PHP modern yang ditulis ulang sepenuhnya dari nol untuk mendukung PHP 8. CI4 mempertahankan reputasinya yang legendaris: **sangat cepat**, ramah terhadap server berspesifikasi hemat (shared hosting), dan tidak membutuhkan dependensi npm atau Node.js yang rumit.

### Spark CLI
CI4 dilengkapi dengan CLI bawaan bernama **Spark** (`php spark`). Spark menyediakan puluhan perintah otomatis untuk membuat Controller, Model, Migration, Seeder, hingga menjalankan server lokal pengembangan (`php spark serve`).

### Routing Modern dan Namespacing
Di CI4 modern, auto-routing lama yang tidak aman dinonaktifkan secara default. Kita mendefinisikan rute eksplisit di `app/Config/Routes.php`. Menggunakan `$routes->group()` dengan opsi `'namespace'`, kita memisahkan Controller modul akademik, keuangan, dan admin sekolah ke dalam sub-folder rapi tanpa konflik penamaan kelas.
''',
                'explanationEn': '''CodeIgniter 4 (CI4) is a modern PHP framework rebuilt from scratch to exploit PHP 8 capabilities. CI4 maintains its legendary heritage: **ultra-fast execution**, seamless compatibility with resource-constrained servers (shared hosting), and zero dependency on complicated node/npm build chains.

### The Spark CLI Tool
CI4 incorporates a native command-line utility called **Spark** (`php spark`). Spark automates file scaffolding for Controllers, Models, Migrations, and Seeders, alongside spinning up ephemeral development webservers (`php spark serve`).

### Explicit Modern Routing & Namespacing
In modern CI4, insecure legacy reflection auto-routing is disabled by default. Explicit routing definitions reside in `app/Config/Routes.php`. Leveraging `$routes->group()` configured with namespaces neatly partitions academic, bursar, and administrative controllers into modular sub-directories.
''',
                'beginnerId': '''Bayangkan perbedaan antara truk trailer besar yang butuh jalan tol lebar (framework berat) vs sepeda motor gesit yang bisa melewati gang sempit dan sampai tujuan dalam 3 menit (CodeIgniter 4). CI4 sangat ringan, tidak membebani memori server sekolah, dan dapat langsung dipasang di server murah sekalipun.''',
                'beginnerEn': '''Consider the difference between a massive freight semi-truck requiring multi-lane highways (heavy enterprise frameworks) versus a nimble motorcycle navigating tight alleyways to reach destinations in three minutes (CodeIgniter 4). CI4 is featherweight, never congests modest school servers, and deploys effortlessly on economical hosting.''',
                'experimentsId': [
                    'Jalankan perintah `php spark routes` di terminal untuk melihat seluruh peta rute yang aktif.',
                    'Gunakan placeholder `(:segment)` atau `(:num)` untuk membatasi tipe parameter URL yang diizinkan.',
                    'Ubah environment ke `development` di file `.env` untuk mengaktifkan Debug Toolbar grafis CI4.',
                ],
                'experimentsEn': [
                    'Run `php spark routes` in your terminal to inspect the active routing table.',
                    'Deploy `(:segment)` or `(:num)` placeholders enforcing strict URL parameter types.',
                    'Toggle the `.env` environment to `development` unlocking CI4\'s graphic bottom Debug Toolbar.',
                ],
                'challengeId': 'Buat Subdomain Routing di CI4: arahkan request dari `admin.sekolah.sch.id` langsung ke controller grup `App\\Controllers\\Admin\\` secara terisolasi.',
                'challengeEn': 'Configure Subdomain Routing in CI4: route requests originating from `admin.sekolah.sch.id` directly into the isolated `App\\Controllers\\Admin\\` controller group.',
                'summaryId': 'Kamu telah menguasai arsitektur MVC CI4, Spark CLI, dan Controller Namespacing. Minggu depan kita masuk ke Model Entities dan Database Migrations.',
                'summaryEn': 'You have mastered CI4 MVC architecture, Spark CLI, and Controller Namespacing. Next week we explore Model Entities and Database Migrations.',
            },

            # Week 2
            {
                'week': 2,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'ci4-models-entities-migrations',
                'titleId': 'Persistensi Data: CI4 Models, Model Entities & Database Forge',
                'titleEn': 'Data Persistence: CI4 Models, Model Entities & Database Forge',
                'programId': 'Entitas Siswa & Model Nilai Akademik dengan Casting & Validasi Terpusat',
                'programEn': 'Student Entity & Academic Score Model with Casting & Centralized Validation',
                'language': 'php',
                'code': '''<?php
// app/Entities/StudentEntity.php
namespace App\\Entities;

use CodeIgniter\\Entity\\Entity;

// Model Entity: Mewakili satu baris data siswa dengan business methods
class StudentEntity extends Entity {
    protected $dates = ['created_at', 'updated_at', 'birth_date'];

    protected $casts = [
        'id'        => 'integer',
        'nisn'      => 'string',
        'gpa'       => 'float',
        'is_active' => 'boolean',
    ];

    // Computed Attribute: Predikat Kelulusan Otomatis
    public function getGraduationHonors(): string {
        $gpa = (float) ($this->attributes['gpa'] ?? 0.0);
        return match (true) {
            $gpa >= 3.90 => 'Summa Cum Laude',
            $gpa >= 3.75 => 'Magna Cum Laude',
            $gpa >= 3.50 => 'Cum Laude',
            default      => 'Lulus Memuaskan',
        };
    }
}

// app/Models/StudentModel.php
namespace App\\Models;

use CodeIgniter\\Model;
use App\\Entities\\StudentEntity;

class StudentModel extends Model {
    protected $table            = 'students';
    protected $primaryKey       = 'id';
    protected $returnType       = StudentEntity::class; // Otomatis return objek Entity!
    protected $useTimestamps    = true;
    protected $allowedFields    = ['nisn', 'full_name', 'grade_class', 'gpa', 'is_active', 'birth_date'];

    // Aturan Validasi Terpusat di Tingkat Model
    protected $validationRules = [
        'nisn'        => 'required|alpha_numeric|min_length[7]|max_length[10]|is_unique[students.nisn,id,{id}]',
        'full_name'   => 'required|min_length[3]|max_length[120]',
        'grade_class' => 'required|max_length[20]',
        'gpa'         => 'required|decimal|greater_than_equal_to[0.0]|less_than_equal_to[4.0]',
    ];

    protected $validationMessages = [
        'nisn' => [
            'is_unique' => 'NISN ini sudah terdaftar di sistem buku induk!',
        ],
    ];
}

echo "=== CODEIGNITER 4 MODEL & ENTITY DENGAN VALIDASI ATRIBUT TERKONFIGURASI ===\\n";
''',
                'objectivesId': [
                    'Membedakan peran CI4 Model (akses tabel database) vs Entity (representasi baris data berbasis objek).',
                    'Menggunakan properti `$returnType = StudentEntity::class` untuk hidrasi objek otomatis.',
                    'Menerapkan aturan validasi terpusat pada properti `$validationRules` di tingkat model.',
                    'Mengelola skema database secara terprogram menggunakan Database Migrations (`php spark migrate`).',
                ],
                'objectivesEn': [
                    'Differentiate CI4 Models (table persistence) from Entities (object-oriented row representation).',
                    'Deploy `$returnType = StudentEntity::class` for automatic object hydration.',
                    'Enforce centralized validation rules via `$validationRules` directly on models.',
                    'Govern schema lifecycle programmatically using Database Migrations (`php spark migrate`).',
                ],
                'explanationId': '''Salah satu lonjakan arsitektur terbesar di CodeIgniter 4 adalah hadirnya **Model Entities**. Di CI3 lawas, model hanya mengembalikan array asosiatif mentah tanpa metode bisnis apa pun.

### Keunggulan CI4 Model Entities
Entity (`CodeIgniter\\Entity\\Entity`) adalah kelas pembawa data cerdas:
- Secara otomatis mengonversi tipe data kolom melalui properti `$casts = ['gpa' => 'float']`.
- Mendukung penulisan logika bisnis komputasi langsung di dalam model, misalnya method `getGraduationHonors()`.
- Mengizinkan mutasi data dirty tracking: Entity hanya mengirimkan field yang benar-benar berubah saat method `$model->save($entity)` dipanggil.

### Validasi Terpusat di Model
Daripada menulis aturan validasi berulang di setiap controller form, CI4 memungkinkan penetapan `$validationRules` langsung di dalam kelas model. Ketika controller memanggil `$studentModel->save($data)`, validasi otomatis dievaluasi. Jika data gagal, `$studentModel->errors()` menyediakan daftar error lengkap.
''',
                'explanationEn': '''A major architectural leap in CodeIgniter 4 is the introduction of **Model Entities**. In legacy CI3, models returned raw associative arrays devoid of domain encapsulation.

### The Power of CI4 Model Entities
An Entity (`CodeIgniter\\Entity\\Entity`) represents an intelligent object-oriented data carrier:
- Hydrates and casts database attributes dynamically via `$casts = ['gpa' => 'float']`.
- Encapsulates domain logic methods directly, such as `getGraduationHonors()`.
- Tracks dirty state: calling `$model->save($entity)` persists only modified attributes, optimizing SQL bandwidth.

### Centralized Model-Level Validation
Rather than scattering validation assertions across multiple controllers, CI4 embeds `$validationRules` inside the Model class. Calling `$studentModel->save($data)` invokes automated validation; if assertions fail, `$studentModel->errors()` exposes localized failure messages.
''',
                'beginnerId': '''Bayangkan formulir rapor siswa. Di CI3 lama, rapor hanya selembar fotokopi biasa tanpa kalkulator. Di CI4 dengan Entity, rapor tersebut seperti rapor digital cerdas: begitu nilai dimasukkan, rapor otomatis menghitung sendiri apakah siswa mendapat predikat Juara Kelas (Cum Laude) tanpa guru perlu menghitung manual dengan kalkulator.''',
                'beginnerEn': '''Think of a student report card. In legacy CI3, it behaved like a static photocopy sheet. In CI4 with Entities, the report card acts as an intelligent digital pad: entering student scores causes the sheet to automatically calculate honors standings without teachers manually punching numbers into desk calculators.''',
                'experimentsId': [
                    'Jalankan perintah `php spark make:migration CreateStudentsTable` dan definisikan kolom tabel dengan `$this->forge`.',
                    'Coba simpan data siswa dengan IPK 4.5 dan amati bagaimana validasi `less_than_equal_to[4.0]` menolak data.',
                    'Gunakan method `$studentModel->paginate(10)` untuk paginasi data otomatis.',
                ],
                'experimentsEn': [
                    'Execute `php spark make:migration CreateStudentsTable` and declare table schemas with `$this->forge`.',
                    'Attempt persisting a student with GPA 4.5 and verify `less_than_equal_to[4.0]` rejects the record.',
                    'Deploy `$studentModel->paginate(10)` to render automated pagination slices.',
                ],
                'challengeId': 'Tambahkan mutator method `setPassword(string $pass)` pada Entity yang secara otomatis melakukan hash password menggunakan `password_hash($pass, PASSWORD_ARGON2ID)` sebelum disimpan ke database.',
                'challengeEn': 'Add a `setPassword(string $pass)` mutator on the Entity hashing incoming strings via `password_hash($pass, PASSWORD_ARGON2ID)` prior to persistence.',
                'summaryId': 'Kamu telah menguasai CI4 Models, Model Entities, dan Database Migrations. Minggu depan kita mempelajari View Layouts dan View Cells.',
                'summaryEn': 'You have mastered CI4 Models, Model Entities, and Database Migrations. Next week we explore View Layouts and View Cells.',
            },

            # Week 3
            {
                'week': 3,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'views-layouts-cell',
                'titleId': 'Antarmuka Modular: View Layouts, View Partials & View Cells',
                'titleEn': 'Modular UI: View Layouts, View Partials & View Cells',
                'programId': 'Dashboard Akademik dengan View Layouts & Widget Ringkasan Nilai ViewCell',
                'programEn': 'Academic Dashboard with View Layouts & Grade Summary ViewCell',
                'language': 'php',
                'code': '''<?php
// app/Cells/AcademicSummaryCell.php (CodeIgniter 4 View Cell)
namespace App\\Cells;

class AcademicSummaryCell {
    public function render(array $params = []): string {
        $gradeClass = $params['grade'] ?? 'XII-RPL';
        
        // Dalam implementasi nyata: kueri rata-rata kelas dari database
        $averageGpa = 3.82;
        $totalStudents = 34;

        return view('cells/academic_summary', [
            'gradeClass'    => $gradeClass,
            'averageGpa'    => $averageGpa,
            'totalStudents' => $totalStudents,
        ]);
    }
}

// app/Views/layouts/academic_master.php (View Layout Induk)
$masterLayoutSnippet = <<<'HTML'
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title><?= $this->renderSection('title') ?> - Portal Akademik CI4</title>
    <link rel="stylesheet" href="/assets/css/academic.css">
</head>
<body class="bg-gray-50">
    <header class="navbar">Portal Sekolah Menengah Kejuruan</header>
    
    <main class="container">
        <!-- Konten Halaman Spesifik Diinjeksikan ke Section Ini -->
        <?= $this->renderSection('content') ?>
    </main>
</body>
</html>
HTML;

// app/Views/academic/dashboard.php (Halaman Anak)
$childViewSnippet = <<<'HTML'
<?= $this->extend('layouts/academic_master') ?>

<?= $this->section('title') ?>Dashboard Siswa<?= $this->endSection() ?>

<?= $this->section('content') ?>
    <h2>Selamat Datang di Portal Nilai Akademik</h2>
    
    <!-- Memanggil View Cell Independen secara Modular -->
    <?= view_cell('App\\Cells\\AcademicSummaryCell::render', ['grade' => 'XII-RPL-1']) ?>
<?= $this->endSection() ?>
HTML;

echo "=== VIEW LAYOUTS & VIEW CELL SYSTEM TERDEFINISI DENGAN BERSIH ===\\n";
''',
                'objectivesId': [
                    'Menguasai sistem pewarisan View Layouts di CI4 (`$this->extend()` dan `$this->renderSection()`).',
                    'Memahami konsep View Cells (`view_cell()`): widget independen yang memiliki controller mini sendiri.',
                    'Menghindari duplikasi markup header, footer, dan sidebar di seluruh halaman web.',
                    'Mengirim parameter dinamis ke View Cell untuk rendering widget modular.',
                ],
                'objectivesEn': [
                    'Master CI4 View Layout inheritance (`$this->extend()` and `$this->renderSection()`).',
                    'Understand View Cells (`view_cell()`): autonomous UI mini-controllers rendering isolated widgets.',
                    'Eliminate duplicated header, footer, and sidebar markup across web templates.',
                    'Transmit dynamic parameters into View Cells for reusable widget presentation.',
                ],
                'explanationId': '''Di CodeIgniter 3 lama, pengembang harus memuat view secara terpotong-potong menggunakan `$this->load->view('header'); $this->load->view('content'); $this->load->view('footer');`. Jika ada 20 halaman, urutan include ini harus diulang 20 kali.

### View Layouts di CodeIgniter 4
CI4 memperkenalkan sistem pewarisan layout modern:
1. Halaman master (`layouts/academic_master.php`) menentukan kerangka utama dan menyediakan slot section: `<?= $this->renderSection('content') ?>`.
2. Halaman spesifik (`dashboard.php`) cukup mendeklarasikan `<?= $this->extend('layouts/academic_master') ?>` dan membungkus isinya di dalam `<?= $this->section('content') ?>`.

### Inovasi Cemerlang: View Cells
**View Cell** adalah fitur paling inovatif di UI CI4. Bayangkan sebuah widget statistik rata-rata kelas yang muncul di 5 halaman berbeda. Jika menggunakan partial view biasa, controller di kelima halaman tersebut harus mengkueri database secara manual. Dengan View Cell (`view_cell('App\\Cells\\AcademicSummaryCell::render')`), widget memiliki controller mini sendiri yang mengambil datanya secara mandiri tanpa mencemari controller utama!
''',
                'explanationEn': '''In legacy CodeIgniter 3, developers pieced layouts together using fragmented snippets: `$this->load->view('header'); $this->load->view('content'); $this->load->view('footer');`. Across 20 pages, this boilerplate repeated 20 times.

### View Layouts in CodeIgniter 4
CI4 introduces master template inheritance:
1. A master view (`layouts/academic_master.php`) declares global frames exposing injection slots: `<?= $this->renderSection('content') ?>`.
2. Individual pages (`dashboard.php`) extend the parent via `<?= $this->extend('layouts/academic_master') ?>` and wrap page copy within `<?= $this->section('content') ?>`.

### The Innovation of View Cells
**View Cells** deliver modular component autonomy. If an academic grade summary widget appears on five distinct pages, traditional partial views require all five controllers to query database stats repetitively. A View Cell (`view_cell()`) binds its own isolated mini-controller, resolving data independently without cluttering primary page controllers!
''',
                'beginnerId': '''Bayangkan koran dinding sekolah. View Layout seperti papan kayu induk yang sudah ditempeli logo sekolah di atasnya. View Cell seperti jam dinding digital mandiri yang ditempel di sudut papan: jam tersebut memiliki baterai sendiri dan terus berjalan tanpa perlu diatur manual oleh guru setiap kali ada pengumuman baru.''',
                'beginnerEn': '''Imagine a school notice board. The View Layout is the master bulletin board bordered by the school crest. A View Cell is an autonomous digital clock mounted in the corner: it runs on its own internal battery without requiring teachers to manually adjust clock hands whenever posting fresh notices.''',
                'experimentsId': [
                    'Jalankan perintah `php spark make:cell AcademicSummary` untuk membuat View Cell otomatis.',
                    'Tambahkan parameter kedua pada View Cell untuk meng-cache output HTML selama 5 menit (`["ttl" => 300]`).',
                    'Gunakan section bersyarat untuk menyuntikkan file JavaScript khusus hanya pada halaman tertentu.',
                ],
                'experimentsEn': [
                    'Run `php spark make:cell AcademicSummary` to scaffold a View Cell class and view file.',
                    'Add a caching TTL parameter to the View Cell caching HTML output for 5 minutes (`["ttl" => 300]`).',
                    'Deploy conditional sections to inject page-specific JavaScript scripts exclusively on designated views.',
                ],
                'challengeId': 'Bangun View Cell `StudentAttendanceBadgeCell` yang menampilkan persentase kehadiran siswa hari ini lengkap dengan warna indikator hijau/kuning/merah.',
                'challengeEn': 'Build a `StudentAttendanceBadgeCell` View Cell displaying student attendance percentages styled with green/yellow/red color indicators.',
                'summaryId': 'Kamu telah menguasai View Layouts, template inheritance, dan modular View Cells di CI4. Minggu depan kita mempelajari CSRF, Session, dan Route Filters keamanan.',
                'summaryEn': 'You have mastered View Layouts, template inheritance, and modular View Cells in CI4. Next week we cover CSRF, Sessions, and security Route Filters.',
            },

            # Week 4
            {
                'week': 4,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'csrf-filters-session-auth',
                'titleId': 'Keamanan Portal: Proteksi CSRF, Session & Route Filters Keamanan',
                'titleEn': 'Portal Security: CSRF Protection, Sessions & Security Route Filters',
                'programId': 'Filter Autentikasi Peran Guru & Siswa dengan FilterInterface di CI4',
                'programEn': 'Teacher & Student Role Authentication Filter with FilterInterface in CI4',
                'language': 'php',
                'code': '''<?php
// app/Filters/RoleAuthFilter.php (CodeIgniter 4 Route Filter)
namespace App\\Filters;

use CodeIgniter\\Filters\\FilterInterface;
use CodeIgniter\\HTTP\\RequestInterface;
use CodeIgniter\\HTTP\\ResponseInterface;

class RoleAuthFilter implements FilterInterface {
    // Dieksekusi SEBELUM Controller dipanggil (Penjaga Gerbang)
    public function before(RequestInterface $request, $arguments = null) {
        $session = session();

        // 1. Periksa apakah user sudah login
        if (!$session->get('is_logged_in')) {
            return redirect()->to('/login')
                ->with('error', 'Sesi Anda telah berakhir. Harap login kembali.');
        }

        // 2. Periksa Peran Pengguna (Role-Based Access Control)
        $userRole = $session->get('user_role'); // 'TEACHER', 'STUDENT', 'ADMIN'
        
        // $arguments dilewatkan dari konfigurasi rute: ['filter' => 'role:TEACHER,ADMIN']
        if (!empty($arguments) && !in_array($userRole, $arguments, true)) {
            // Pengguna login tetapi tidak memiliki hak akses ke modul ini
            return redirect()->to('/portal/unauthorized')
                ->with('error', 'Akses ditolak! Halaman penginputan nilai hanya untuk Guru.');
        }

        return null; // Lanjutkan ke Controller
    }

    // Dieksekusi SETELAH Controller selesai (Pascabedah Respons)
    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {
        // Terapkan Security Headers
        $response->setHeader('X-Frame-Options', 'DENY');
        $response->setHeader('X-Content-Type-Options', 'nosniff');
        return $response;
    }
}

// app/Config/Filters.php (Registrasi Filter)
// public array $aliases = [
//     'role' => \\App\\Filters\\RoleAuthFilter::class,
// ];

// Penggunaan di Routes.php:
// $routes->group('grades', ['filter' => 'role:TEACHER,ADMIN'], static function ($routes) {
//     $routes->post('input', 'GradeController::store');
// });

echo "=== CODEIGNITER 4 SECURITY FILTER & RBAC TERKONFIGURASI ===\\n";
''',
                'objectivesId': [
                    'Menguasai arsitektur Route Filters (`FilterInterface`) di CodeIgniter 4.',
                    'Memahami siklus `before()` (mencegat request) dan `after()` (menyuntikkan security headers ke respons).',
                    'Mengamankan form input menggunakan proteksi CSRF bawaan CI4 (`csrf_field()`).',
                    'Menerapkan Role-Based Access Control (RBAC) pada modul nilai raport menggunakan argumen filter.',
                ],
                'objectivesEn': [
                    'Master Route Filters architecture (`FilterInterface`) in CodeIgniter 4.',
                    'Understand `before()` (request interception) and `after()` (response security injection) cycles.',
                    'Protect input forms using CI4\'s native CSRF defense (`csrf_field()`).',
                    'Implement Role-Based Access Control (RBAC) across grade entry modules via filter arguments.',
                ],
                'explanationId': '''Di CodeIgniter 3 lama, pengembang sering kali menulis `if (!isset($_SESSION['user'])) exit;` di setiap method controller secara manual—cara yang sangat rapuh dan mudah terlupakan saat ada penambahan fitur baru.

### Route Filters di CodeIgniter 4
CodeIgniter 4 menyediakan **Filters** (pengganti middleware di framework lain). Filter mengimplementasikan `FilterInterface`:
- **before()**: Berjalan sebelum controller dipanggil. Jika user belum login atau perannya tidak cocok, filter langsung mengalihkan (redirect) pengguna ke halaman login dengan pesan error. Controller tidak akan pernah dieksekusi!
- **after()**: Berjalan setelah controller menghasilkan output, sangat ideal untuk menyuntikkan header keamanan HTTP seperti anti-Clickjacking (`X-Frame-Options: DENY`).

### Proteksi CSRF Otomatis
CI4 memiliki proteksi CSRF native yang dapat diaktifkan secara global di `app/Config/Filters.php`. Anda cukup menyisipkan tag `<?= csrf_field() ?>` di dalam form HTML Anda. CI4 akan memverifikasi token dan meregenerasinya secara aman pada setiap request.
''',
                'explanationEn': '''In legacy CodeIgniter 3, developers manually pasted `if (!isset($_SESSION['user'])) exit;` blocks atop every single controller action—a fragile practice prone to security omissions during rapid development.

### CodeIgniter 4 Route Filters
CodeIgniter 4 introduces **Filters** (the CI4 equivalent to HTTP middleware) implementing `FilterInterface`:
- **before()**: Executes prior to controller entry. If authentication fails or roles mismatch, the filter issues an immediate redirect. The controller action is never reached!
- **after()**: Executes after the controller yields a response, ideal for appending HTTP security headers like anti-Clickjacking (`X-Frame-Options: DENY`).

### Automated CSRF Governance
CI4 ships with native CSRF defense enabled globally in `app/Config/Filters.php`. Simply inject `<?= csrf_field() ?>` inside HTML forms. CI4 verifies the cryptographic token, regenerating tokens securely on submissions.
''',
                'beginnerId': '''Bayangkan ruang guru di sekolah. Satpam di pintu gerbang utama (Filter Before) memeriksa apakah Anda memakai seragam guru. Siswa dilarang masuk ke ruang guru dan disuruh kembali ke kelas. Dan begitu tamu selesai berkunjung, petugas kebersihan memastikan pintu gerbang selalu terkunci rapat kembali (Filter After).''',
                'beginnerEn': '''Imagine the faculty room at an academy. The security guard stationed at the threshold (Filter Before) verifies whether you wear a certified faculty badge. Students are turned back to their home classrooms. And as visitors exit, groundskeepers ensure security gates latch shut (Filter After).''',
                'experimentsId': [
                    'Akses URL `/grades/input` tanpa login dan buktikan filter otomatis me-redirect Anda ke `/login`.',
                    'Simulasikan login sebagai siswa dan buktikan filter menolak akses ke halaman guru dengan pesan peringatan.',
                    'Aktifkan opsi `$csrf->regenerate = true;` di `app/Config/Security.php` untuk keamanan token tingkat tinggi.',
                ],
                'experimentsEn': [
                    'Access `/grades/input` without active sessions and verify the filter redirects to `/login`.',
                    'Simulate a student session and confirm the filter denies entry to faculty routes.',
                    'Toggle `$csrf->regenerate = true;` inside `app/Config/Security.php` enforcing one-time CSRF tokens.',
                ],
                'challengeId': 'Buat Throttle Filter kustom yang membatasi percobaan login maksimal 5 kali per IP dalam waktu 1 menit menggunakan CI4 Cache Engine untuk mencegah serangan Brute-Force Password.',
                'challengeEn': 'Build a custom Throttle Filter capping failed logins to 5 attempts per IP per minute using CI4\'s Cache Engine preventing password brute-force attacks.',
                'summaryId': 'Kamu telah menguasai Route Filters, proteksi CSRF, dan RBAC di CI4. Level 1 selesai! Di Level 2 kita mempelajari RESTful APIs, Database Transactions, dan SIS Capstone.',
                'summaryEn': 'You have mastered Route Filters, CSRF defense, and RBAC in CI4. Level 1 complete! Level 2 covers RESTful APIs, Database Transactions, and our SIS Capstone.',
            },

            # Week 5
            {
                'week': 5,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'restful-resource-controllers',
                'titleId': 'RESTful Web APIs: ResourceController, Content Negotiation & ResponseTrait',
                'titleEn': 'RESTful Web APIs: ResourceController, Content Negotiation & ResponseTrait',
                'programId': 'RESTful API Raport Siswa untuk Aplikasi Mobile Wali Murid dengan ResponseTrait',
                'programEn': 'Student Report Card RESTful API for Parent Mobile App with ResponseTrait',
                'language': 'php',
                'code': '''<?php
// app/Controllers/Api/StudentApiController.php
namespace App\\Controllers\\Api;

use CodeIgniter\\RESTful\\ResourceController;
use App\\Models\\StudentModel;

// ResourceController secara otomatis menyediakan method RESTful standar:
// index, show, create, update, delete
class StudentApiController extends ResourceController {
    // Model yang terikat otomatis
    protected $modelName = StudentModel::class;
    protected $format    = 'json'; // Format respons default

    // GET /api/v1/students
    public function index() {
        $students = $this->model->where('is_active', true)->findAll(20);
        
        // ResponseTrait helper: respond() menghasilkan JSON terstandarisasi dengan status 200 OK
        return $this->respond([
            'status'   => 200,
            'message'  => 'Daftar siswa aktif berhasil diambil.',
            'count'    => count($students),
            'data'     => $students,
        ]);
    }

    // GET /api/v1/students/(:num)
    public function show($id = null) {
        $student = $this->model->find($id);

        if (!$student) {
            // Helper failNotFound() otomatis mengembalikan HTTP 404
            return $this->failNotFound("Data siswa dengan ID {$id} tidak ditemukan.");
        }

        return $this->respond([
            'status' => 200,
            'data'   => [
                'nisn'       => $student->nisn,
                'name'       => $student->full_name,
                'grade'      => $student->grade_class,
                'gpa'        => $student->gpa,
                'honors'     => $student->getGraduationHonors(),
            ]
        ]);
    }

    // POST /api/v1/students
    public function create() {
        $data = $this->request->getJSON(true) ?? $this->request->getPost();

        if (!$this->model->insert($data)) {
            // Helper failValidationErrors() otomatis mengembalikan HTTP 400 dengan pesan error model
            return $this->failValidationErrors($this->model->errors());
        }

        return $this->respondCreated([
            'status'  => 201,
            'message' => 'Siswa baru berhasil didaftarkan ke buku induk akademik!',
            'id'      => $this->model->getInsertID()
        ]);
    }
}

// Konfigurasi Routes.php:
// $routes->resource('api/v1/students', ['controller' => 'App\\Controllers\\Api\\StudentApiController']);

echo "=== CODEIGNITER 4 RESTFUL RESOURCE CONTROLLER ACTIVE ===\\n";
''',
                'objectivesId': [
                    'Menguasai `CodeIgniter\\RESTful\\ResourceController` untuk pembuatan RESTful API secepat kilat.',
                    'Menggunakan metode helper bawaan `ResponseTrait`: `respond()`, `respondCreated()`, `failNotFound()`, dan `failValidationErrors()`.',
                    'Mengonfigurasi resource routing dengan satu baris `$routes->resource()`.',
                    'Menerapkan Content Negotiation otomatis untuk format JSON dan XML.',
                ],
                'objectivesEn': [
                    'Master `CodeIgniter\\RESTful\\ResourceController` scaffolding RESTful APIs with blazing velocity.',
                    'Deploy `ResponseTrait` helpers: `respond()`, `respondCreated()`, `failNotFound()`, and `failValidationErrors()`.',
                    'Configure complete resource routing via single-line `$routes->resource()` directives.',
                    'Apply automated Content Negotiation across JSON and XML formats.',
                ],
                'explanationId': '''Banyak developer terkejut mengetahui betapa hebatnya CodeIgniter 4 untuk membangun backend RESTful API aplikasi mobile. CI4 menyertakan kelas khusus **ResourceController** yang mengeliminasi seluruh kode boilerplate API.

### ResponseTrait Helper Methods
Alih-alih menulis `echo json_encode(...)` dan mengatur header HTTP status code secara manual, `ResponseTrait` menyediakan method semantik:
- `$this->respond($data)`: Mengembalikan HTTP 200 OK dengan format JSON.
- `$this->respondCreated($data)`: Mengembalikan HTTP 201 Created.
- `$this->failNotFound($message)`: Mengembalikan HTTP 404 Not Found terstruktur.
- `$this->failValidationErrors($errors)`: Mengembalikan HTTP 400 Bad Request lengkap dengan array validasi.

### Resource Routing dengan Satu Baris
Cukup tambahkan `$routes->resource('api/v1/students')` di file konfigurasi. CI4 secara otomatis memetakan seluruh kata kerja HTTP RESTful standar:
- `GET /students` -> `index()`
- `GET /students/{id}` -> `show($id)`
- `POST /students` -> `create()`
- `PUT /students/{id}` -> `update($id)`
- `DELETE /students/{id}` -> `delete($id)`
''',
                'explanationEn': '''Many engineers underestimate CodeIgniter 4\'s capabilities as a high-throughput mobile RESTful API backend. CI4 packages a dedicated **ResourceController** streamlining API development.

### Semantic ResponseTrait Helpers
Rather than manually concatenating `json_encode()` outputs and configuring HTTP header status codes, `ResponseTrait` provisions semantic helpers:
- `$this->respond($data)`: Emits HTTP 200 OK with sanitized JSON.
- `$this->respondCreated($data)`: Emits HTTP 201 Created.
- `$this->failNotFound($message)`: Formats standard HTTP 404 Not Found payloads.
- `$this->failValidationErrors($errors)`: Emits HTTP 400 Bad Request with model validation bags.

### Single-Line Resource Routing
Declaring `$routes->resource('api/v1/students')` configures canonical RESTful verbs automatically:
- `GET /students` -> `index()`
- `GET /students/{id}` -> `show($id)`
- `POST /students` -> `create()`
- `PUT /students/{id}` -> `update($id)`
- `DELETE /students/{id}` -> `delete($id)`
''',
                'beginnerId': '''Bayangkan loket kasir otomatis di bank. Daripada Anda harus berteriak dan menjelaskan apa yang Anda mau, loket sudah memiliki 5 tombol tombol standar: Tombol Lihat Saldo (GET), Tombol Buka Tabungan (POST), Tombol Ganti Alamat (PUT), dan Tombol Tutup Akun (DELETE). Semuanya berjalan cepat dan otomatis.''',
                'beginnerEn': '''Think of an automated bank teller terminal. Rather than explaining requests to clerks from scratch, the kiosk presents five standardized push buttons: View Balance (GET), Open Account (POST), Update Address (PUT), and Close Account (DELETE). Processing executes instantaneously.''',
                'experimentsId': [
                    'Kirim request POST dengan data NISN yang sudah ada dan amati respons JSON error dari `failValidationErrors`.',
                    'Kirim request GET dengan header `Accept: application/xml` dan buktikan CI4 otomatis mengubah respons ke XML.',
                    'Kirim request GET ke ID siswa yang tidak ada dan amati format JSON dari `failNotFound`.',
                ],
                'experimentsEn': [
                    'Transmit a POST payload with an existing NISN observing JSON error bags emitted by `failValidationErrors`.',
                    'Send a GET request with `Accept: application/xml` and verify CI4 automatically serializes output to XML.',
                    'Query a non-existent student ID and observe the structured JSON from `failNotFound`.',
                ],
                'challengeId': 'Tambahkan autentikasi API Key pada ResourceController menggunakan header kustom `X-API-KEY` yang memverifikasi akses dari aplikasi mobile wali murid.',
                'challengeEn': 'Add API Key authorization to the ResourceController validating an `X-API-KEY` header guarding parent mobile client access.',
                'summaryId': 'Kamu telah menguasai CI4 ResourceController, ResponseTrait, dan Content Negotiation. Minggu depan kita mempelajari Query Builder dan transaksi database atomik.',
                'summaryEn': 'You have mastered CI4 ResourceController, ResponseTrait, and Content Negotiation. Next week we explore the Query Builder and atomic database transactions.',
            },

            # Week 6
            {
                'week': 6,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'database-transactions-query-builder',
                'titleId': 'Query Builder Canggih & Transaksi Database Multi-Tabel Atomik',
                'titleEn': 'Advanced Query Builder & Multi-Table Atomic Database Transactions',
                'programId': 'Transaksi Pembayaran SPP Sekolah & Aktivasi KRS Siswa Bebas Race Condition',
                'programEn': 'Tuition Settlement Transaction & Enrollment Activation with ACID Guarantees',
                'language': 'php',
                'code': '''<?php
// app/Services/TuitionPaymentService.php
namespace App\\Services;

use CodeIgniter\\Database\\BaseConnection;
use Config\\Database;
use Exception;

class TuitionPaymentService {
    private BaseConnection $db;

    public function __construct() {
        $this->db = Database::connect();
    }

    public function settleTuitionFee(int $studentId, float $amount, string $invoiceRef): bool {
        // 1. Memulai Transaksi Database Manual di CodeIgniter 4
        $this->db->transBegin();

        try {
            // A. Gunakan Query Builder Canggih untuk Mencari Tagihan yang Menggantung
            $bill = $this->db->table('tuition_bills')
                ->where('student_id', $studentId)
                ->where('is_paid', false)
                ->get()
                ->getRow();

            if (!$bill) {
                throw new Exception("Tidak ada tagihan SPP aktif untuk siswa ID: {$studentId}.");
            }

            if ($amount < $bill->amount_due) {
                throw new Exception("Nominal pembayaran (Rp {$amount}) kurang dari total tagihan (Rp {$bill->amount_due})!");
            }

            // B. Perbarui Status Tagihan Menjadi Lunas
            $this->db->table('tuition_bills')
                ->where('id', $bill->id)
                ->update([
                    'is_paid'     => true,
                    'paid_at'     => date('Y-m-d H:i:s'),
                    'invoice_ref' => $invoiceRef,
                ]);

            // C. Aktifkan Status Hak Akses KRS Siswa di Semester Baru
            $this->db->table('students')
                ->where('id', $studentId)
                ->update(['enrollment_status' => 'ACTIVE']);

            // D. Catat Audit Log Finansial
            $this->db->table('payment_audit_logs')->insert([
                'student_id'   => $studentId,
                'amount'       => $amount,
                'reference'    => $invoiceRef,
                'processed_at' => date('Y-m-d H:i:s'),
            ]);

            // Cek status transaksi: jika ada query yang gagal di tengah jalan, rollback otomatis!
            if ($this->db->transStatus() === false) {
                $this->db->transRollback();
                return false;
            }

            // Seluruh 3 query berhasil -> COMMIT perubahan permanen ke database
            $this->db->transCommit();
            echo "[SUCCESS] Pembayaran SPP siswa #{$studentId} berhasil diproses dan status KRS aktif!\\n";
            return true;

        } catch (Exception $e) {
            $this->db->transRollback();
            echo "[ROLLBACK TRIGGERED] Pembayaran SPP dibatalkan: " . $e->getMessage() . "\\n";
            return false;
        }
    }
}

echo "=== CODEIGNITER 4 TRANSACTIONAL SERVICE ACTIVE ===\\n";
''',
                'objectivesId': [
                    'Menguasai Query Builder CI4 berkecepatan tinggi: joins, aggregates, batch inserts, dan sub-queries.',
                    'Memahami manajemen transaksi database ACID di CI4: `transBegin()`, `transCommit()`, dan `transRollback()`.',
                    'Menggunakan metode pengecekan status transaksi `$this->db->transStatus()`.',
                    'Mencegah data keuangan parsial (inkonsistensi saldo) saat koneksi terputus di tengah jalan.',
                ],
                'objectivesEn': [
                    'Master high-throughput CI4 Query Builder: joins, aggregates, batch inserts, and sub-queries.',
                    'Understand ACID database transaction mechanics in CI4: `transBegin()`, `transCommit()`, and `transRollback()`.',
                    'Deploy transaction health assertions via `$this->db->transStatus()`.',
                    'Prevent corrupt partial state (financial balance desynchronization) during unexpected failures.',
                ],
                'explanationId': '''Ketika aplikasi menangani pembayaran uang sekolah (SPP) atau pencatatan nilai rapor semester, satu kegagalan query tidak boleh meninggalkan data dalam kondisi menggantung (misal: uang sudah tercatat masuk di tabel pembayaran, tetapi status pendaftaran siswa tetap berstatus "Belum Lunas").

### Query Builder Berperforma Tinggi
Query Builder CodeIgniter 4 dirancang untuk kecepatan murni tanpa overhead memori yang besar. Sintaksnya seperti `$this->db->table('students')->where(...)->update(...)` menghasilkan kueri SQL parameter-bound yang kebal terhadap SQL Injection.

### Transaksi Database Manual di CI4
CI4 menyediakan kontrol transaksi yang sangat fleksibel:
1. `$this->db->transBegin()`: Membuka transaksi database.
2. Seluruh kueri dieksekusi secara terisolasi.
3. `$this->db->transStatus()`: Memeriksa apakah ada salah satu kueri yang mengalami syntax error atau constraint violation.
4. Jika aman, `$this->db->transCommit()` membukukan seluruh perubahan secara atomik. Jika ada exception, `$this->db->transRollback()` mengembalikan database ke kondisi awal seolah-olah tidak ada yang pernah terjadi.
''',
                'explanationEn': '''When processing tuition settlements or semester report card finalizations, a single query fault must never leave records in a corrupt state (e.g., recording an incoming wire transfer without clearing the student\'s active hold).

### High-Throughput Query Builder
The CodeIgniter 4 Query Builder executes with blazing speed and near-zero memory bloat. Chained calls like `$this->db->table('students')->where()->update()` compile into parameter-bound SQL statements immune to injection exploits.

### Manual Database Transactions in CI4
CI4 delivers deterministic transaction control:
1. `$this->db->transBegin()`: Initializes an isolated database transaction.
2. Intermediate SQL operations execute in staging.
3. `$this->db->transStatus()`: Audits whether any query triggered constraint violations or execution errors.
4. If healthy, `$this->db->transCommit()` commits all mutations atomically. Upon failure, `$this->db->transRollback()` reverts changes instantly to pristine state.
''',
                'beginnerId': '''Bayangkan transaksi pembelian tiket kereta api di kasir. Anda menyerahkan uang tunai Rp 100.000 ke kasir, dan kasir mencetak tiket untuk Anda. Jika mesin cetak tiket tiba-tiba kehabisan tinta dan tiket gagal keluar (Error), kasir wajib mengembalikan uang Rp 100.000 Anda kembali ke tangan Anda (Rollback), bukan menyimpan uang Anda tanpa memberikan tiket.''',
                'beginnerEn': '''Imagine purchasing a train ticket at a ticket counter. You slide a Rp 100,000 banknote across the counter, and the clerk prints your travel pass. If the ticket printer jams and fails to print (an Error), the clerk must slide your banknote back into your hand (Rollback), rather than keeping your cash without delivering the ticket.''',
                'experimentsId': [
                    'Uji coba transfer dengan nominal kurang dari tagihan dan buktikan mekanisme `transRollback()` membatalkan perubahan status.',
                    'Gunakan metode batch insert `$this->db->table("grades")->insertBatch($gradesArray)` untuk memasukkan 100 nilai siswa sekaligus dalam 1 kueri.',
                    'Gunakan query builder `$this->db->table("students")->selectAvg("gpa")` untuk menghitung rata-rata nilai sekolah.',
                ],
                'experimentsEn': [
                    'Attempt payment with insufficient funds and verify `transRollback()` cancels status modifications.',
                    'Deploy batch inserts via `$this->db->table("grades")->insertBatch($gradesArray)` inserting 100 grades in a single SQL operation.',
                    'Deploy `$this->db->table("students")->selectAvg("gpa")` computing school-wide average GPAs.',
                ],
                'challengeId': 'Gunakan metode Automatic Strict Transactions di CI4 (`$this->db->transStrict(true); $this->db->transStart(); ... $this->db->transComplete();`) untuk menyederhanakan alur transaksi.',
                'challengeEn': 'Deploy Automatic Strict Transactions in CI4 (`$this->db->transStrict(true); $this->db->transStart(); ... $this->db->transComplete();`) streamlining transaction logic.',
                'summaryId': 'Kamu telah menguasai CI4 Query Builder, batch operations, dan transaksi database atomik. Minggu depan kita mempelajari Services Container, Events, dan Caching.',
                'summaryEn': 'You have mastered CI4 Query Builder, batch operations, and atomic transactions. Next week we cover the Services Container, Events, and Caching.',
            },

            # Week 7
            {
                'week': 7,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'services-events-caching',
                'titleId': 'Arsitektur Enterprise: Services Container, System Events & Caching',
                'titleEn': 'Enterprise Architecture: Services Container, System Events & Caching',
                'programId': 'Sistem Event Kelulusan Siswa & Cache Transkrip Nilai Akademik di CI4',
                'programEn': 'Student Graduation Event System & Cached Academic Transcripts in CI4',
                'language': 'php',
                'code': '''<?php
// app/Config/Events.php (CI4 System Events)
namespace Config;

use CodeIgniter\\Events\\Events;

// 1. Mendaftarkan Event Listener untuk Kelulusan Siswa
Events::on('student:graduated', static function (int $studentId, string $honorTitle) {
    echo "[EVENT TRIGGERED] Siswa ID #{$studentId} resmi dinyatakan LULUS dengan predikat: {$honorTitle}!\\n";
    echo " -> Mengirim instruksi pencetakan ijazah fisik ke antrean tata usaha...\\n";
});

// app/Config/Services.php (CI4 Central Services Factory)
namespace Config;

use CodeIgniter\\Config\\BaseService;
use App\\Services\\TranscriptCacheService;

class Services extends BaseService {
    // Daftarkan Service sebagai Shared Singleton di seluruh aplikasi
    public static function transcriptCache(bool $getShared = true): TranscriptCacheService {
        if ($getShared) {
            return static::getSharedInstance('transcriptCache');
        }
        return new TranscriptCacheService(service('cache'));
    }
}

// app/Services/TranscriptCacheService.php
namespace App\\Services;

use CodeIgniter\\Cache\\CacheInterface;

class TranscriptCacheService {
    public function __construct(private CacheInterface $cache) {}

    public function getStudentTranscript(int $studentId): array {
        $cacheKey = "academic:transcript:student_{$studentId}";

        // 1. Cek apakah ada di cache (File atau Redis driver)
        $cachedData = $this->cache->get($cacheKey);
        if ($cachedData !== null) {
            echo "[CACHE HIT] Mengembalikan transkrip nilai siswa #{$studentId} dari Cache CI4.\\n";
            return $cachedData;
        }

        // 2. Cache Miss: Kueri dari Database
        echo "[CACHE MISS] Mengkueri seluruh nilai raport 6 semester dari database untuk siswa #{$studentId}...\\n";
        $transcript = [
            'student_id'   => $studentId,
            'total_credits' => 144,
            'final_gpa'    => 3.88,
            'generated_at' => date('Y-m-d H:i:s')
        ];

        // Simpan ke Cache selama 1 Jam (3600 Detik)
        $this->cache->save($cacheKey, $transcript, 3600);
        return $transcript;
    }
}

echo "=== CODEIGNITER 4 SERVICES, EVENTS & CACHING PIPELINE READY ===\\n";
''',
                'objectivesId': [
                    'Menguasai kontainer layanan terpusat CodeIgniter 4 (`Config\\Services` dan helper `service()`).',
                    'Menggunakan System Events (`Events::on` dan `Events::trigger`) untuk memisahkan logika efek samping.',
                    'Mengonfigurasi Caching Engine bawaan CI4 dengan driver File, Redis, atau Memcached.',
                    'Mengimplementasikan pola Singleton (`getSharedInstance`) untuk efisiensi memori layanan bersama.',
                ],
                'objectivesEn': [
                    'Master CodeIgniter 4 centralized service container (`Config\\Services` and the `service()` helper).',
                    'Utilize System Events (`Events::on` and `Events::trigger`) to decouple auxiliary workflows.',
                    'Configure CI4 native Caching Engines across File, Redis, or Memcached drivers.',
                    'Implement Singleton patterns (`getSharedInstance`) optimizing shared service memory.',
                ],
                'explanationId': '''Meskipun CodeIgniter 4 dirancang sederhana, framework ini memiliki arsitektur enterprise yang sangat matang melalui kelas **Services** dan **System Events**.

### Services Container (Config\\Services)
Di CI4, semua komponen inti (database connection, session, cache, router) dikelola oleh pabrik terpusat `Config\\Services`. Alih-alih membuat instance baru setiap saat, kita memanggil `service('cache')` atau mendaftarkan custom service kita sendiri. Fitur `getSharedInstance` memastikan objek hanya dibuat satu kali di memori (Singleton).

### System Events di CI4
`CodeIgniter\\Events\\Events` menyediakan pola Publish-Subscribe bawaan. Ketika seorang siswa dinyatakan lulus, controller cukup memanggil:
`Events::trigger('student:graduated', $studentId, 'Summa Cum Laude');`
Seluruh listener (pengiriman SMS ke wali murid, pencetakan nomor ijazah di dinas pendidikan) otomatis dieksekusi tanpa membuat controller menjadi rumit.

### CI4 Caching Abstraction
Dengan antarmuka yang seragam (`$cache->get`, `$cache->save`, `$cache->delete`), Anda dapat beralih dari penyimpanan file lokal saat development ke server Redis berkecepatan tinggi saat production hanya dengan mengubah satu baris di file `.env`.
''',
                'explanationEn': '''Despite its compact size, CodeIgniter 4 delivers sophisticated enterprise primitives through **Services** and **System Events**.

### Centralized Services Container (Config\\Services)
In CI4, core capabilities (database pools, sessions, cache managers, routers) are governed by the `Config\\Services` factory. Instead of manual instantiations, developers call `service('cache')` or register custom providers. Utilizing `getSharedInstance` ensures singletons instantiate once per request cycle.

### CI4 System Events
The `CodeIgniter\\Events\\Events` engine provisions native Publish-Subscribe mechanics. When graduation milestones occur, controllers simply broadcast:
`Events::trigger('student:graduated', $studentId, 'Summa Cum Laude');`
Registered listeners (SMS alerts to guardians, graduation roll logging) execute seamlessly without polluting primary controller flows.

### CI4 Caching Abstractions
Exposing uniform methods (`$cache->get`, `$cache->save`, `$cache->delete`), backends toggle from local file caches in development to high-throughput Redis instances in production by altering one line in `.env`.
''',
                'beginnerId': '''Bayangkan kantor sekolah modern. Services Container seperti gudang perlengkapan sekolah terpusat tempat guru meminjam proyektor dan spidol (semua guru memakai alat yang sama secara bersama). System Events seperti bel pengumuman sekolah: ketika kepala sekolah mengumumkan "Lomba Dimulai", seluruh guru dan murid serentak melakukan tugas masing-masing tanpa kepala sekolah perlu mendatangi setiap kelas satu per satu.''',
                'beginnerEn': '''Imagine a modern school facility. The Services Container represents the centralized equipment depot where staff check out projectors and markers (shared singletons). System Events function like the school-wide intercom: when the principal announces "Exam Period Commences", all faculty and students coordinate actions immediately without the principal visiting each classroom individually.''',
                'experimentsId': [
                    'Panggil method `getStudentTranscript(101)` dua kali dan amati panggilan kedua memicu `[CACHE HIT]`.',
                    'Ubah konfigurasi cache handler dari `File` ke `Redis` di `app/Config/Cache.php`.',
                    'Daftarkan event listener kustom di `app/Config/Events.php` dan picu menggunakan `Events::trigger()`.',
                ],
                'experimentsEn': [
                    'Invoke `getStudentTranscript(101)` twice and observe the second call triggering a `[CACHE HIT]`.',
                    'Swap cache handlers from `File` to `Redis` in `app/Config/Cache.php`.',
                    'Register a custom event listener in `app/Config/Events.php` and invoke via `Events::trigger()`.',
                ],
                'challengeId': 'Buat cache invalidation otomatis: ketika nilai siswa diperbarui di database, picu event `Events::trigger("grade:updated", $studentId)` yang otomatis menghapus cache transkrip siswa tersebut.',
                'challengeEn': 'Build an automated cache invalidation listener: when student grades update, trigger `Events::trigger("grade:updated", $studentId)` clearing the cached transcript.',
                'summaryId': 'Kamu telah menguasai Services Container, System Events, dan Caching Engine di CI4. Minggu depan adalah Capstone Final: Sistem Informasi Manajemen Akademik Sekolah (SIS) Skala Penuh!',
                'summaryEn': 'You have mastered Services Container, System Events, and Caching in CI4. Next week is our Final Capstone: Full-Scale School Information Management System (SIS)!',
            },

            # Week 8
            {
                'week': 8,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'capstone-academic-sis',
                'titleId': 'Capstone: Sistem Informasi Akademik Sekolah (SIS) Skala Penuh Production-Ready',
                'titleEn': 'Capstone: Production-Ready Full-Scale School Information System (SIS)',
                'programId': 'Sistem Informasi Akademik Sekolah Lengkap (CI4, Entities, REST API, Auth Filters & Transaksi)',
                'programEn': 'Complete Academic SIS Platform (CI4, Entities, REST API, Auth Filters & Transactions)',
                'language': 'php',
                'code': '''<?php
// CodeIgniter 4 Production Academic SIS Capstone Architecture
namespace App\\Controllers\\Academic;

use App\\Controllers\\BaseController;
use CodeIgniter\\HTTP\\ResponseInterface;
use Config\\Database;

class SisReportCardController extends BaseController {
    // Alur Cetak Buku Rapor Digital & Rekap Nilai Semester
    public function generateReportCard(int $studentId): ResponseInterface {
        $db = Database::connect();

        // 1. Ambil data siswa dan nilai menggunakan Query Builder Canggih
        $student = $db->table('students')->where('id', $studentId)->get()->getRow();
        if (!$student) {
            return $this->response->setStatusCode(404)->setJSON(['error' => 'Siswa tidak ditemukan.']);
        }

        $scores = $db->table('academic_scores')
            ->select('subjects.name as subject_name, academic_scores.score, academic_scores.grade_letter')
            ->join('subjects', 'subjects.id = academic_scores.subject_id')
            ->where('academic_scores.student_id', $studentId)
            ->get()
            ->getResultArray();

        $reportData = [
            'portal'       => 'Tryngo Academic School Information System',
            'version'      => 'CI4-LTS',
            'student_nisn' => $student->nisn,
            'student_name' => $student->full_name,
            'academic_term'=> 'Semester Genap 2026',
            'total_subjects' => count($scores),
            'grades'       => $scores,
            'status'       => 'VERIFIED_OFFICIAL'
        ];

        return $this->response->setJSON($reportData);
    }

    // Health Check Probe untuk Kubernetes / Docker Container Liveness
    public function healthz(): ResponseInterface {
        return $this->response->setJSON([
            'status'      => 'healthy',
            'framework'   => 'CodeIgniter ' . \\CodeIgniter\\CodeIgniter::CI_VERSION,
            'php_version' => PHP_VERSION,
            'database'    => 'connected',
            'cache'       => 'active'
        ]);
    }
}

echo "=== TRYNGO SCHOOL INFORMATION SYSTEM (SIS) PRODUCTION ENGINE ACTIVE ===\\n";
echo "Siap melayani ribuan siswa, guru, dan wali murid dengan kecepatan tinggi.\\n";
''',
                'objectivesId': [
                    'Mengintegrasikan seluruh ekosistem: MVC, Model Entities, Query Builder, Route Filters, dan REST APIs.',
                    'Membangun sistem informasi akademik sekolah (SIS) yang ringan, cepat, dan hemat sumber daya memori server.',
                    'Mengonfigurasi endpoint `/healthz` untuk probe liveness/readiness klaster container cloud.',
                    'Menyiapkan arsitektur web modern yang siap dideploy di lingkungan Docker dan web server Nginx / Apache.',
                ],
                'objectivesEn': [
                    'Integrate the complete ecosystem: MVC, Model Entities, Query Builder, Route Filters, and REST APIs.',
                    'Build a lightweight, high-speed, memory-efficient School Information System (SIS).',
                    'Configure `/healthz` endpoints for cloud container liveness and readiness probes.',
                    'Ship an enterprise-ready modern web architecture ready for Docker, Nginx, and Apache hosting.',
                ],
                'explanationId': '''Selamat! Anda telah mencapai proyek Capstone akhir kurikulum CodeIgniter 4. Sistem ini menyatukan semua fondasi rekayasa perangkat lunak CI4 ke dalam satu platform Sistem Informasi Akademik Sekolah (SIS) yang tangguh, aman, dan siap diproduksi.

### Keunggulan Efisiensi Sumber Daya
Berbeda dari framework modern lain yang membutuhkan server cloud mahal dengan RAM gigabyte besar, aplikasi SIS berbasis CodeIgniter 4 ini dapat melayani ribuan siswa dan guru secara bersamaan di atas server VPS ekonomis dengan konsumsi RAM di bawah 20MB.

### Arsitektur Terpadu Web & API
Sistem ini menyediakan dua antarmuka harmonis:
1. **Web Portal Guru & Admin**: Dibangun dengan View Layouts dan View Cells yang interaktif untuk penginputan nilai dan rekap buku induk.
2. **RESTful API Wali Murid**: Ditenagai oleh ResourceController untuk memberikan data nilai dan absensi secara real-time ke aplikasi smartphone wali murid.
''',
                'explanationEn': '''Congratulations! You have reached the Capstone project. This application synthesizes modern CodeIgniter 4 engineering paradigms into an enterprise, production-ready School Information System (SIS).

### Peak Resource Efficiency
Unlike heavyweight frameworks requiring expensive multi-gigabyte cloud servers, this CodeIgniter 4 SIS platform services thousands of concurrent students, faculty, and parents on modest VPS instances while consuming under 20MB of RAM.

### Unified Web & API Architecture
The system provisions twin harmonious interfaces:
1. **Faculty & Admin Web Portal**: Powered by View Layouts and View Cells for intuitive grade recording and student roster auditing.
2. **Parent Mobile RESTful API**: Driven by ResourceController endpoints streaming attendance and academic report cards in real time to parent smartphones.
''',
                'beginnerId': '''Proyek ini ibarat gedung sekolah digital modern yang serba efisien. Ruang guru memiliki meja buku rapor yang rapi dan teratur (Web Portal & View Layouts), gerbang sekolah dijaga satpam pintar yang memeriksa tanda pengenal (Route Filters), brankas penyimpanan nilai terbuat dari baja anti-bongkar (Database Transactions & Prepared Statements), dan ada loket kilat di dinding sekolah tempat orang tua siswa bisa mengecek nilai rapor anaknya lewat smartphone kapan pun (REST API).''',
                'beginnerEn': '''This project mirrors a state-of-the-art digital school facility. The faculty room features organized report card desks (Web Portal & View Layouts), entrance gates are guarded by vigilant security officers (Route Filters), student records vaults are cast in tamper-proof steel (Database Transactions & Prepared Statements), and an automated express kiosk allows parents to review grades from their smartphones 24/7 (REST APIs).''',
                'experimentsId': [
                    'Jalankan aplikasi dan uji coba endpoint raport `/academic/generateReportCard/1` melalui browser.',
                    'Periksa endpoint status kesehatan server pada `/academic/healthz`.',
                    'Ukur waktu respons request menggunakan Debug Toolbar CI4 dan buktikan latensi di bawah 15 milidetik.',
                ],
                'experimentsEn': [
                    'Launch the application and test the report card route `/academic/generateReportCard/1` via browser.',
                    'Inspect container health via the `/academic/healthz` endpoint.',
                    'Audit response timings via CI4\'s Debug Toolbar verifying sub-15ms execution latencies.',
                ],
                'challengeId': 'Tambahkan modul Export PDF: gunakan pustaka `Dompdf` di dalam service CI4 untuk menghasilkan file PDF rapor resmi siswa lengkap dengan watermark tanda tangan kepala sekolah.',
                'challengeEn': 'Add a PDF Export module: integrate `Dompdf` inside a CI4 service generating official printable report card PDFs with principal watermark seals.',
                'summaryId': 'Selamat! Kamu telah menyelesaikan seluruh kurikulum CodeIgniter 4 dari nol hingga Sistem Informasi Akademik Sekolah berskala produksi!',
                'summaryEn': 'Congratulations! You have completed the entire CodeIgniter 4 curriculum from zero to an enterprise production School Information System!',
            },
        ]
    }
