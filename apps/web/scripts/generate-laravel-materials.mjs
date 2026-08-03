// ============================================================================
// generate-laravel-materials.mjs
// Laravel track: 20 lessons x 2 languages (id/en) -> 40 markdown + 40 project JSON.
// Structure based on Laravel roadmap research 2026 (LaravelHub Roadmap 2026,
// LaravelDaily Learning Path, roadmap.sh/laravel, Techstack Digital, codepractice.in):
//   1. Fundamentals      : setup & artisan, routing & controllers, Blade,
//                          migrations & Eloquent basics
//   2. Data & CRUD       : relationships, validation & form requests, CRUD blog,
//                          factories & seeders
//   3. Auth & Middleware : auth sessions, middleware & policies, mail & notifications,
//                          file storage & uploads
//   4. APIs & Real-time  : Sanctum tokens, API resources, queues & jobs,
//                          broadcasting & WebSockets (Reverb)
//   5. Testing & Prod.   : PHPUnit testing, caching & Redis, Docker & CI/CD,
//                          deployment & capstone
// PHP basics are a separate Tryngo track (pre-requisite), so this track
// starts directly at Laravel.
// Each lesson ships a full minimal Laravel 12 project (files JSON) runnable via
// StackBlitz webcontainers (composer install && php artisan migrate && php artisan serve);
// the lesson's key file is the markdown code block.
// ============================================================================
import fs from 'fs';
import path from 'path';

const BASE = new URL('../public/data/course/laravel', import.meta.url).pathname;
const BASE_DIR = process.platform === 'win32' ? BASE.slice(1) : BASE;

const PHASES = [
  { phase: 1, id: 'fundamentals', nameId: 'Fondasi Laravel', nameEn: 'Laravel Fundamentals' },
  { phase: 2, id: 'data-crud', nameId: 'Data & CRUD', nameEn: 'Data & CRUD' },
  { phase: 3, id: 'auth-middleware', nameId: 'Auth & Middleware', nameEn: 'Auth & Middleware' },
  { phase: 4, id: 'apis-realtime', nameId: 'API & Realtime', nameEn: 'APIs & Real-time' },
  { phase: 5, id: 'production', nameId: 'Testing & Produksi', nameEn: 'Testing & Production' },
];

const ENV_BASE = `APP_NAME=Tryngo Laravel
APP_ENV=local
APP_KEY=base64:AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8=
APP_DEBUG=true
APP_URL=http://localhost:8000
DB_CONNECTION=sqlite
SESSION_DRIVER=file
CACHE_STORE=file
QUEUE_CONNECTION=sync
`;

const ENV = (extra) => `${ENV_BASE}${extra || ''}`;

const CONFIG_APP = `<?php

return [
    'name' => env('APP_NAME', 'Tryngo Laravel'),
    'env' => env('APP_ENV', 'local'),
    'debug' => (bool) env('APP_DEBUG', true),
    'url' => env('APP_URL', 'http://localhost:8000'),
    'timezone' => 'UTC',
    'locale' => 'id',
    'fallback_locale' => 'en',
    'faker_locale' => 'id_ID',
    'key' => env('APP_KEY'),
    'cipher' => 'AES-256-CBC',
];
`;

const CONFIG_DB = `<?php

return [
    'default' => env('DB_CONNECTION', 'sqlite'),
    'connections' => [
        'sqlite' => [
            'driver' => 'sqlite',
            'database' => env('DB_DATABASE', database_path('database.sqlite')),
            'prefix' => '',
            'foreign_key_constraints' => true,
        ],
        'mysql' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'tryngo'),
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => 'utf8mb4',
        ],
        'pgsql' => [
            'driver' => 'pgsql',
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '5432'),
            'database' => env('DB_DATABASE', 'tryngo'),
            'username' => env('DB_USERNAME', 'postgres'),
            'password' => env('DB_PASSWORD', ''),
        ],
    ],
    'migrations' => 'migrations',
];
`;

const CONFIG_SESSION = `<?php

return [
    'driver' => env('SESSION_DRIVER', 'file'),
    'lifetime' => 120,
    'expire_on_close' => false,
    'encrypt' => false,
    'files' => storage_path('framework/sessions'),
    'cookie' => env('SESSION_COOKIE', 'tryngo_session'),
    'path' => '/',
    'secure' => env('SESSION_SECURE_COOKIE'),
    'http_only' => true,
    'same_site' => 'lax',
];
`;

const CONFIG_AUTH = `<?php

return [
    'defaults' => [
        'guard' => env('AUTH_GUARD', 'web'),
        'passwords' => env('AUTH_PASSWORD_BROKER', 'users'),
    ],
    'guards' => [
        'web' => ['driver' => 'session', 'provider' => 'users'],
    ],
    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\\Models\\User::class,
        ],
    ],
    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],
];
`;

const CONFIG_CACHE = `<?php

return [
    'default' => env('CACHE_STORE', 'file'),
    'stores' => [
        'file' => [
            'driver' => 'file',
            'path' => storage_path('framework/cache/data'),
            'lock_path' => storage_path('framework/cache/data'),
        ],
        'database' => [
            'driver' => 'database',
            'table' => 'cache',
            'connection' => env('DB_CACHE_CONNECTION'),
        ],
        'redis' => [
            'driver' => 'redis',
            'connection' => 'cache',
        ],
    ],
    'prefix' => env('CACHE_PREFIX', 'tryngo_cache_'),
];
`;

const CONFIG_QUEUE = `<?php

return [
    'default' => env('QUEUE_CONNECTION', 'sync'),
    'connections' => [
        'sync' => ['driver' => 'sync'],
        'database' => [
            'driver' => 'database',
            'connection' => env('DB_QUEUE_CONNECTION'),
            'table' => 'jobs',
            'queue' => 'default',
            'retry_after' => 90,
        ],
        'redis' => [
            'driver' => 'redis',
            'connection' => 'default',
            'queue' => env('REDIS_QUEUE', 'default'),
            'retry_after' => 90,
        ],
    ],
];
`;

const CONFIG_REDIS = `<?php

return [
    'client' => env('REDIS_CLIENT', 'phpredis'),
    'options' => ['prefix' => env('REDIS_PREFIX', 'tryngo_')],
    'default' => [
        'host' => env('REDIS_HOST', '127.0.0.1'),
        'password' => env('REDIS_PASSWORD'),
        'port' => env('REDIS_PORT', 6379),
        'database' => env('REDIS_DB', '0'),
    ],
    'cache' => [
        'host' => env('REDIS_HOST', '127.0.0.1'),
        'password' => env('REDIS_PASSWORD'),
        'port' => env('REDIS_PORT', 6379),
        'database' => env('REDIS_CACHE_DB', '1'),
    ],
];
`;

const CONFIG_MAIL = `<?php

return [
    'default' => env('MAIL_MAILER', 'log'),
    'mailers' => [
        'log' => [
            'transport' => 'log',
            'channel' => env('MAIL_LOG_CHANNEL', 'stack'),
        ],
        'smtp' => [
            'transport' => 'smtp',
            'host' => env('MAIL_HOST', 'smtp.mailgun.org'),
            'port' => env('MAIL_PORT', 587),
            'username' => env('MAIL_USERNAME'),
            'password' => env('MAIL_PASSWORD'),
            'encryption' => env('MAIL_ENCRYPTION', 'tls'),
        ],
    ],
    'from' => [
        'address' => env('MAIL_FROM_ADDRESS', 'belajar@tryngo.dev'),
        'name' => env('MAIL_FROM_NAME', 'Tryngo Laravel'),
    ],
];
`;

const CONFIG_FILESYSTEMS = `<?php

return [
    'default' => env('FILESYSTEM_DISK', 'public'),
    'disks' => [
        'local' => [
            'driver' => 'local',
            'root' => storage_path('app/private'),
        ],
        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],
        's3' => [
            'driver' => 's3',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION', 'ap-southeast-1'),
            'bucket' => env('AWS_BUCKET'),
        ],
    ],
];
`;

const CONFIG_BROADCAST = `<?php

return [
    'default' => env('BROADCAST_CONNECTION', 'reverb'),
    'connections' => [
        'reverb' => [
            'driver' => 'reverb',
            'key' => env('REVERB_APP_KEY'),
            'secret' => env('REVERB_APP_SECRET'),
            'app_id' => env('REVERB_APP_ID'),
            'options' => [
                'host' => env('REVERB_HOST', '127.0.0.1'),
                'port' => env('REVERB_PORT', 8080),
                'scheme' => env('REVERB_SCHEME', 'http'),
                'useTLS' => env('REVERB_SCHEME', 'http') === 'https',
            ],
        ],
        'log' => ['driver' => 'log'],
        'null' => ['driver' => 'null'],
    ],
];
`;

const CONFIG_REVERB = `<?php

return [
    'default' => env('REVERB_SERVER', 'reverb'),
    'servers' => [
        'reverb' => [
            'host' => env('REVERB_SERVER_HOST', '0.0.0.0'),
            'port' => env('REVERB_SERVER_PORT', 8080),
            'hostname' => env('REVERB_HOST'),
            'options' => [
                'useTLS' => env('REVERB_SCHEME', 'https') === 'https',
            ],
            'max_request_size' => env('REVERB_MAX_REQUEST_SIZE', 10000),
            'scaling' => [
                'enabled' => false,
            ],
        ],
    ],
    'apps' => [
        'providers' => [
            'reverb' => [
                'key' => env('REVERB_APP_KEY'),
                'secret' => env('REVERB_APP_SECRET'),
                'app_id' => env('REVERB_APP_ID'),
                'options' => [
                    'host' => env('REVERB_HOST', '127.0.0.1'),
                    'port' => env('REVERB_PORT', 8080),
                    'scheme' => env('REVERB_SCHEME', 'http'),
                    'useTLS' => env('REVERB_SCHEME', 'http') === 'https',
                ],
            ],
        ],
    ],
];
`;

const CONFIG_SANCTUM = `<?php

return [
    'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost,127.0.0.1,127.0.0.1:8000,::1')),
    'guard' => ['web'],
    'expiration' => null,
    'middleware' => [
        'verify_csrf_token' => App\\Http\\Middleware\\VerifyCsrfToken::class,
        'encrypt_cookies' => App\\Http\\Middleware\\EncryptCookies::class,
    ],
];
`;

const ARTISAN = `#!/usr/bin/env php
<?php

use Illuminate\\Contracts\\Console\\Kernel;
use Symfony\\Component\\Console\\Input\\ArgvInput;

define('LARAVEL_START', microtime(true));

require __DIR__.'/vendor/autoload.php';

$app = require __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Kernel::class);

$status = $kernel->handle($input = new ArgvInput);

$kernel->terminate($input, $status);

exit($status);
`;

const BOOTSTRAP = (hasApi = false, middlewareExtra = '') => `<?php

use Illuminate\\Foundation\\Application;
use Illuminate\\Foundation\\Configuration\\Exceptions;
use Illuminate\\Foundation\\Configuration\\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        ${hasApi ? "api: __DIR__.'/../routes/api.php'," : ''}
        commands: __DIR__.'/../routes/console.php',
    )
    ->withMiddleware(function (Middleware $middleware) {
        ${middlewareExtra}
    })
    ->withExceptions(function (Exceptions $exceptions) {})
    ->create();
`;

const ROUTES_CONSOLE = `<?php

use Illuminate\\Support\\Facades\\Artisan;

Artisan::command('tryngo:hello', function () {
    $this->info('Selamat datang di Tryngo Laravel!');
});
`;

const PKG = (name, extraRequire = '', extraDev = '') => `{
    "name": "tryngo/${name}",
    "type": "project",
    "require": {
        "php": "^8.2",
        "laravel/framework": "^12.0"${extraRequire ? `,\n        ${extraRequire}` : ''}
    },
    "require-dev": {
        "fakerphp/faker": "^1.23",
        "phpunit/phpunit": "^11.0"${extraDev ? `,\n        ${extraDev}` : ''}
    },
    "autoload": {
        "psr-4": {
            "App\\\\": "app/",
            "Database\\\\Factories\\\\": "database/factories/",
            "Database\\\\Seeders\\\\": "database/seeders/"
        }
    },
    "autoload-dev": {
        "psr-4": {
            "Tests\\\\": "tests/"
        }
    },
    "scripts": {
        "post-autoload-dump": [
            "@php artisan package:discover --ansi"
        ]
    },
    "minimum-stability": "stable",
    "prefer-stable": true
}
`;

const PKG_NODE = (name, dev) => `{
  "name": "${name}",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "${dev}"
  }
}
`;

const DEV_SERVE = 'composer install --no-interaction && touch database/database.sqlite && php artisan migrate --force && php artisan serve';

const STORAGE_KEEPS = {
  'storage/framework/sessions/.gitkeep': '',
  'storage/framework/cache/data/.gitkeep': '',
  'storage/framework/views/.gitkeep': '',
  'storage/logs/.gitkeep': '',
};

const SKELETON = (hasApi = false, middlewareExtra = '') => ({
  artisan: ARTISAN,
  'bootstrap/app.php': BOOTSTRAP(hasApi, middlewareExtra),
  'routes/console.php': ROUTES_CONSOLE,
  'config/app.php': CONFIG_APP,
  'config/database.php': CONFIG_DB,
  'config/session.php': CONFIG_SESSION,
  'config/cache.php': CONFIG_CACHE,
  'config/queue.php': CONFIG_QUEUE,
  'config/redis.php': CONFIG_REDIS,
  'database/database.sqlite': '',
  ...STORAGE_KEEPS,
});

const LESSONS_P1 = [
  {
    phase: 1, num: 1, topicId: 'laravel-setup',
    titleId: 'Pengenalan Laravel & Artisan', titleEn: 'Laravel Intro & Artisan',
    codeFile: 'routes/web.php',
    files: {
      ...SKELETON(),
      'routes/web.php': `<?php

use Illuminate\\Support\\Facades\\Route;

Route::get('/', function () {
    return view('beranda', ['judul' => 'Selamat datang di Tryngo Laravel!']);
});

Route::get('/waktu', function () {
    return now()->toDateTimeString();
});
`,
      'resources/views/beranda.blade.php': `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $judul }}</title>
</head>
<body>
    <h1>{{ $judul }}</h1>
    <p>Laravel berjalan! Server: {{ php_sapi_name() }}</p>
    <p>Waktu sekarang: <a href="{{ url('/waktu') }}">cek</a></p>
</body>
</html>
`,
      'composer.json': PKG('laravel-setup'),
      'package.json': PKG_NODE('laravel-lesson-setup', DEV_SERVE),
      'README.md': `# Laravel Lesson 1 - Setup & Artisan

Jalankan: composer install && php artisan migrate && php artisan serve
Coba: http://localhost:8000/ dan http://localhost:8000/waktu
Perintah artisan: php artisan list, php artisan route:list
`,
    },
    objId: [
      'Memahami posisi Laravel: framework MVC paling populer untuk PHP',
      'Mengenal struktur project Laravel 12 (app, routes, config, database, resources)',
      'Menjalankan server dengan php artisan serve dan route:list',
      'Memahami siklus request: URL → Route → Controller/Closure → View → Response',
    ],
    objEn: [
      'Understand Laravel: the most popular PHP MVC framework',
      'Learn the Laravel 12 project structure (app, routes, config, database, resources)',
      'Run the server with php artisan serve and inspect routes with route:list',
      'Understand the request cycle: URL → Route → Controller/Closure → View → Response',
    ],
    expId: `## Request Lifecycle
Browser mengirim GET / → publik/index.php (front controller) → bootstrap/app.php menyiapkan Application → router mencocokkan URL ke route → closure dieksekusi → response HTML dikembalikan. Semua request PHP melewati SATU pintu ini - inilah pola front controller.
## Route: Jantung Laravel
routes/web.php adalah peta URL aplikasi. Route::get('/') mendaftarkan URL root. Closure menerima Request dan mengembalikan Response. 'waktu' memakai helper now() - framework memuat aplikasi penuh sebelum route jalan, jadi helper Laravel tersedia di mana saja.
## view(): Blade Sebagai Jawaban
view('beranda', ['judul' => ...]) mencari resources/views/beranda.blade.php dan mengirim data. Blade: {{ $judul }} = echo dengan escape otomatis (anti-XSS). url('/waktu') membuat URL absolut dari path.
## Artisan: Toolbox
php artisan list (semua perintah), route:list (peta URL), make:model/make:controller (scaffolding), tinker (REPL interaktif). Artisan adalah pembeda Laravel: sebagian besar tugas dilakukan lewat perintah konsol, bukan manual.`,
    expEn: `## Request Lifecycle
The browser sends GET / → public/index.php (the front controller) → bootstrap/app.php prepares the Application → the router matches the URL to a route → the closure runs → an HTML response returns. Every PHP request passes through ONE door - this is the front controller pattern.
## Routes: The Heart of Laravel
routes/web.php is the URL map of the app. Route::get('/') registers the root URL. The closure receives a Request and returns a Response. 'waktu' uses the now() helper - the framework boots fully before any route runs, so Laravel helpers are available everywhere.
## view(): Blade as the Answer
view('beranda', ['judul' => ...]) looks up resources/views/beranda.blade.php and passes data. Blade: {{ $judul }} = echo with automatic escaping (anti-XSS). url('/waktu') builds an absolute URL from a path.
## Artisan: The Toolbox
php artisan list (all commands), route:list (the route map), make:model/make:controller (scaffolding), tinker (an interactive REPL). Artisan is Laravel's differentiator: most tasks are done through console commands, not by hand.`,
    chId: 'Eksplorasi setup: (1) tambah route /profil yang mengembalikan teks HTML berisi nama Anda, (2) buat route /kalkulator/{a}/{b} dengan closure yang menjumlahkan dua angka, (3) ganti route / dengan closure yang mengembalikan response()->json([...]) dan amati perbedaannya di browser, (4) jalankan php artisan route:list dan tulis ulang isinya di README.',
    chEn: 'Explore the setup: (1) add a /profil route returning HTML text with your name, (2) build a /kalkulator/{a}/{b} route whose closure sums two numbers, (3) change the / route to a closure returning response()->json([...]) and observe the browser difference, (4) run php artisan route:list and write its output in the README.',
    sumId: 'Front controller + route = pintu tunggal. Artisan = toolbox. View = Blade. Lanjut: routing & controllers.',
    sumEn: 'Front controller + routes = the single door. Artisan = the toolbox. Views = Blade. Next: routing & controllers.',
  },
  {
    phase: 1, num: 2, topicId: 'routing-controllers',
    titleId: 'Routing & Controllers', titleEn: 'Routing & Controllers',
    codeFile: 'routes/web.php',
    files: {
      ...SKELETON(),
      'routes/web.php': `<?php

use App\\Http\\Controllers\\ProdukController;
use Illuminate\\Support\\Facades\\Route;

Route::get('/', [ProdukController::class, 'index']);

// Parameter route: {produk} diteruskan ke method
Route::get('/produk/{produk}', [ProdukController::class, 'detail'])
    ->whereNumber('produk')
    ->name('produk.detail');

// Constraint regex: hanya huruf
Route::get('/produk/kategori/{kategori}', [ProdukController::class, 'perKategori'])
    ->whereAlpha('kategori')
    ->name('produk.kategori');

// Group: prefix + middleware berlaku untuk semua route di dalamnya
Route::prefix('admin')->middleware('auth')->group(function () {
    Route::get('/produk', [ProdukController::class, 'kelola'])->name('admin.produk');
});

// Fallback untuk URL yang tidak cocok
Route::fallback(function () {
    return response('Halaman tidak ditemukan', 404);
});
`,
      'app/Http/Controllers/ProdukController.php': `<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;

class ProdukController extends Controller
{
    private array $produk = [
        1 => ['nama' => 'Kopi Gayo', 'harga' => 25000],
        2 => ['nama' => 'Teh Hitam', 'harga' => 15000],
        3 => ['nama' => 'Madu Hutan', 'harga' => 45000],
    ];

    public function index()
    {
        return view('produk.daftar', ['produk' => $this->produk]);
    }

    public function detail(int $produk)
    {
        if (! isset($this->produk[$produk])) {
            abort(404, 'Produk tidak ditemukan');
        }

        return view('produk.detail', ['item' => $this->produk[$produk]]);
    }

    public function perKategori(string $kategori)
    {
        return "Kategori: {$kategori}";
    }

    public function kelola(Request $request)
    {
        return 'Halaman admin (perlu login)';
    }
}
`,
      'resources/views/produk/daftar.blade.php': `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Daftar Produk</title>
</head>
<body>
    <h1>Daftar Produk</h1>
    <ul>
        @foreach ($produk as $id => $item)
            <li><a href="{{ route('produk.detail', $id) }}">{{ $item['nama'] }}</a> - Rp {{ number_format($item['harga']) }}</li>
        @endforeach
    </ul>
</body>
</html>
`,
      'resources/views/produk/detail.blade.php': `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>{{ $item['nama'] }}</title>
</head>
<body>
    <h1>{{ $item['nama'] }}</h1>
    <p>Harga: Rp {{ number_format($item['harga']) }}</p>
    <p><a href="{{ route('produk.daftar') }}">Kembali</a></p>
</body>
</html>
`,
      'composer.json': PKG('routing-controllers'),
      'package.json': PKG_NODE('laravel-lesson-routing', DEV_SERVE),
      'README.md': `# Laravel Lesson 2 - Routing & Controllers

Jalankan: composer install && php artisan migrate && php artisan serve
Coba: / , /produk/1 , /produk/kategori/kopi , /admin/produk
Lihat semua route: php artisan route:list
`,
    },
    objId: [
      'Menulis route dengan parameter, named routes, dan constraints',
      'Memindahkan logika dari closure ke controller (pola MVC)',
      'Menggunakan route groups dengan prefix dan middleware',
      'Membuat halaman 404 custom dengan Route::fallback',
    ],
    objEn: [
      'Write routes with parameters, named routes, and constraints',
      'Move logic from closures into controllers (the MVC pattern)',
      'Use route groups with prefixes and middleware',
      'Build a custom 404 page with Route::fallback',
    ],
    expId: `## Controller: Memisahkan Web dari Logika
Route berisi HANYA pemetaan URL → [Controller::class, 'method']. Method menerima parameter URL sesuai urutan. Controller memakai class Controller bawaan agar bisa menggunakan middleware dan validasi (pada lesson berikutnya).
## Parameter & Constraint
{produk} menangkap segmen URL dan mengirimnya sebagai int $produk - Type Hint int membuat Laravel otomatis menolak URL non-angka (404). whereNumber()/whereAlpha() = constraint eksplisit. Route::fallback menangkap semua URL tak dikenal → kontrol penuh atas halaman 404.
## Named Routes: Anti-Broken-Link
->name('produk.detail') memberi identitas route. Blade memakai route('produk.detail', $id) - saat URL berubah, seluruh aplikasi mengikuti tanpa edit satu pun template. Rule: JANGAN menulis URL string di blade.
## Group: Batching Config
Route::prefix('admin') menambahkan prefix ke semua anaknya. ->middleware('auth') melindungi semua route admin sekaligus (dipakai lesson 10). Group mengurangi duplikasi dan mencegah lupa proteksi.`,
    expEn: `## Controllers: Separating the Web from Logic
Routes contain ONLY the URL → [Controller::class, 'method'] mapping. Methods receive URL parameters in order. Controllers extend the base Controller class to unlock middleware and validation (lesson 10).
## Parameters & Constraints
{produk} captures a URL segment and passes it as int $produk - the int type hint makes Laravel automatically reject non-numeric URLs (404). whereNumber()/whereAlpha() = explicit constraints. Route::fallback catches all unknown URLs → full control of the 404 page.
## Named Routes: Anti-Broken-Link
->name('produk.detail') gives the route an identity. Blade uses route('produk.detail', $id) - when the URL changes, the whole app follows without editing a single template. Rule: NEVER write URL strings in blade.
## Groups: Batching Config
Route::prefix('admin') adds the prefix to every child. ->middleware('auth') protects all admin routes at once (used in lesson 10). Groups reduce duplication and prevent forgotten protection.`,
    chId: 'Perluas katalog: (1) tambah route /produk/{produk}/ulasan dengan whereNumber dan tampilkan daftar ulasan dummy dari controller, (2) tambah named route produk.baru untuk form create, (3) buat group /api dengan prefix dan route yang mengembalikan response()->json($produk), (4) buat halaman 404 custom dengan view dan desain bebas.',
    chEn: 'Extend the catalog: (1) add a /produk/{produk}/ulasan route with whereNumber showing dummy reviews from the controller, (2) add a produk.baru named route for a create form, (3) build an /api group with a route returning response()->json($produk), (4) build a custom 404 page with a view and free design.',
    sumId: 'Controller = logika. Named route = anti-broken-link. Group = batching. Lanjut: Blade.',
    sumEn: 'Controllers = logic. Named routes = anti-broken-link. Groups = batching. Next: Blade.',
  },
  {
    phase: 1, num: 3, topicId: 'blade-templates',
    titleId: 'Blade: Template, Layout & Komponen', titleEn: 'Blade: Templates, Layouts & Components',
    codeFile: 'resources/views/layouts/app.blade.php',
    files: {
      ...SKELETON(),
      'routes/web.php': `<?php

use Illuminate\\Support\\Facades\\Route;

Route::get('/', fn () => view('beranda'));
Route::get('/produk', fn () => view('produk.daftar'))->name('produk.daftar');
`,
      'resources/views/layouts/app.blade.php': `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('judul', 'Tryngo') - Katalog</title>
    <style>
        body { font-family: system-ui, sans-serif; margin: 0; background: #f6f4ef; color: #1c1c1c; }
        header { background: #2E5B44; color: white; padding: 1rem 2rem; }
        nav a { color: white; margin-right: 1rem; text-decoration: none; }
        main { max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
        footer { text-align: center; padding: 2rem; color: #888; }
        .kartu { background: white; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; }
    </style>
</head>
<body>
    <header>
        <h1>Katalog Tryngo</h1>
        <nav>
            <a href="{{ url('/') }}">Beranda</a>
            <a href="{{ route('produk.daftar') }}">Produk</a>
        </nav>
    </header>

    <main>
        @yield('konten')
    </main>

    <footer>&copy; {{ date('Y') }} Tryngo. Dibuat dengan Blade.</footer>
</body>
</html>
`,
      'resources/views/beranda.blade.php': `@extends('layouts.app')

@section('judul', 'Beranda')

@section('konten')
    <h2>Selamat datang di Katalog Tryngo</h2>
    <p>Layout ini ditulis SEKALI di layouts/app.blade.php, semua halaman hanya mengisi @yield.</p>
    {{-- Komentar Blade: tidak pernah tampil di HTML --}}
@endsection
`,
      'resources/views/produk/daftar.blade.php': `@extends('layouts.app')

@section('judul', 'Daftar Produk')

@section('konten')
    <h2>Daftar Produk</h2>

    @forelse ($produk as $item)
        <div class="kartu">
            <h3>{{ $item['nama'] }}</h3>
            <p>Rp {{ number_format($item['harga'], 0, ',', '.') }}</p>
            @if ($item['stok'] > 0)
                <span style="color: green;">Tersedia ({{ $item['stok'] }})</span>
            @else
                <span style="color: red;">Habis</span>
            @endif
        </div>
    @empty
        <p>Belum ada produk.</p>
    @endforelse
@endsection
`,
      'app/Http/Controllers/ProdukController.php': `<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;

class ProdukController extends Controller
{
    public function daftar()
    {
        $produk = [
            ['nama' => 'Kopi Gayo', 'harga' => 25000, 'stok' => 12],
            ['nama' => 'Teh Hitam', 'harga' => 15000, 'stok' => 0],
            ['nama' => 'Madu Hutan', 'harga' => 45000, 'stok' => 5],
        ];

        return view('produk.daftar', compact('produk'));
    }
}
`,
      'composer.json': PKG('blade-templates'),
      'package.json': PKG_NODE('laravel-lesson-blade', DEV_SERVE),
      'README.md': `# Laravel Lesson 3 - Blade Templates

Jalankan: composer install && php artisan migrate && php artisan serve
Coba: http://localhost:8000/ dan http://localhost:8000/produk
Pelajari: @extends / @yield / @section / @forelse / @if / {{ }} / {{-- --}}
`,
    },
    objId: [
      'Membangun layout tunggal dengan @yield dan mewarisinya via @extends',
      'Menggunakan direktif Blade: {{ }}, @if, @forelse, {{-- --}}',
      'Memahami escape otomatis {{ }} vs raw {!! !!}',
      'Membuat halaman dari data controller dengan compact()',
    ],
    objEn: [
      'Build a single layout with @yield and inherit it via @extends',
      'Use Blade directives: {{ }}, @if, @forelse, {{-- --}}',
      'Understand auto-escaping {{ }} vs raw output {!! !!}',
      'Render pages from controller data with compact()',
    ],
    expId: `## Layout: Tulis Sekali, Pakai di Semua Halaman
layouts/app.blade.php berisi kerangka HTML lengkap. @yield('konten') adalah lubang yang diisi halaman anak. @yield('judul', 'Tryngo') = lubang dengan default. @extends('layouts.app') di halaman anak + @section('konten') mengisi lubangnya. Semua halaman memakai kerangka yang sama - konsistensi gratis.
## {{ }} vs {!! !!}
{{ $variabel }} = echo + htmlspecialchars: input user tampil sebagai teks, bukan HTML (anti-XSS - lesson 13 mengulang ini dalam konteks keamanan). {!! $html !!} = raw tanpa escape: HANYA untuk konten yang Anda kontrol sendiri. Rule: {{ }} default, {!! !!} hanya dengan alasan kuat.
## Direktif: PHP dengan Kurang Ribut
@if/@else, @forelse (loop + else dalam satu direktif), @empty, @foreach, {{-- komentar --}} (tidak dirender ke HTML). Direktif adalah struktur kontrol PHP yang dibaca manusia.
## Compact Helper
compact('produk') = ['produk' => $produk] - cara singkat mengirim banyak variabel ke view.`,
    expEn: `## Layout: Write Once, Use Everywhere
layouts/app.blade.php holds the full HTML skeleton. @yield('konten') is the slot child pages fill. @yield('judul', 'Tryngo') = a slot with a default. @extends('layouts.app') on the child page + @section('konten') fills the slot. Every page shares the same skeleton - free consistency.
## {{ }} vs {!! !!}
{{ $variabel }} = echo + htmlspecialchars: user input displays as text, not HTML (anti-XSS - lesson 13 revisits this in security). {!! $html !!} = raw without escaping: ONLY for content you fully control. Rule: {{ }} by default, {!! !!} only with a strong reason.
## Directives: PHP with Less Noise
@if/@else, @forelse (loop + else in one directive), @empty, @foreach, {{-- comment --}} (not rendered into HTML). Directives are human-readable PHP control structures.
## The Compact Helper
compact('produk') = ['produk' => $produk] - a short way to pass many variables to a view.`,
    chId: 'Poles tampilan: (1) tambah block @section("skrip") di layout dan isi dari halaman daftar dengan sedikit JavaScript, (2) buat halaman Tentang yang meng-extends layout dengan @yield("judul") berubah, (3) tampilkan harga dengan format Rp 1.250.000 via number_format di blade, (4) buat partial footer terpisah dan include dengan @include.',
    chEn: 'Polish the UI: (1) add a @section("skrip") block in the layout and fill it from the list page with a small JavaScript snippet, (2) build an About page extending the layout with @yield("judul") changing, (3) display prices as Rp 1.250.000 via number_format in blade, (4) extract a footer partial and include it with @include.',
    sumId: 'Layout sekali, halaman banyak. {{ }} = escape. Direktif = PHP bersih. Lanjut: migrations & Eloquent.',
    sumEn: 'Layout once, many pages. {{ }} = escaped. Directives = clean PHP. Next: migrations & Eloquent.',
  },
  {
    phase: 1, num: 4, topicId: 'migrations-eloquent',
    titleId: 'Migrations & Eloquent Dasar', titleEn: 'Migrations & Eloquent Basics',
    codeFile: 'app/Models/Produk.php',
    files: {
      ...SKELETON(),
      'routes/web.php': `<?php

use App\\Models\\Kategori;
use App\\Models\\Produk;
use Illuminate\\Support\\Facades\\Route;

Route::get('/', function () {
    return view('beranda');
});

Route::get('/produk', function () {
    return view('produk.daftar', ['produk' => Produk::all()]);
});

Route::get('/produk/{produk}', function (Produk $produk) {
    return view('produk.detail', compact('produk'));
});

Route::get('/kategori', fn () => view('kategori', ['kategori' => Kategori::withCount('produk')->get()]));
`,
      'database/migrations/2026_07_01_000001_create_kategoris_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kategoris', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 100);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kategoris');
    }
};
`,
      'database/migrations/2026_07_01_000002_create_produks_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('produks', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 200);
            $table->decimal('harga', 10, 2);
            $table->unsignedInteger('stok')->default(0);
            $table->boolean('tersedia')->default(true);
            $table->foreignId('kategori_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('produks');
    }
};
`,
      'app/Models/Kategori.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class Kategori extends Model
{
    use HasFactory;

    protected $fillable = ['nama'];
}
`,
      'app/Models/Produk.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class Produk extends Model
{
    use HasFactory;

    protected $fillable = ['nama', 'harga', 'stok', 'tersedia', 'kategori_id'];

    protected $casts = [
        'tersedia' => 'boolean',
        'harga' => 'decimal:2',
    ];
}
`,
      'resources/views/produk/detail.blade.php': `@extends('layouts.app')

@section('judul', $produk->nama)

@section('konten')
    <h2>{{ $produk->nama }}</h2>
    <p>Harga: Rp {{ number_format($produk->harga, 0, ',', '.') }}</p>
    <p>Stok: {{ $produk->stok }}</p>
    <p>Status: {{ $produk->tersedia ? 'Tersedia' : 'Habis' }}</p>
@endsection
`,
      'composer.json': PKG('migrations-eloquent'),
      'package.json': PKG_NODE('laravel-lesson-eloquent', DEV_SERVE),
      'README.md': `# Laravel Lesson 4 - Migrations & Eloquent

Jalankan: composer install && php artisan migrate && php artisan serve
Tinker: php artisan tinker
  Kategori::create(['nama' => 'Minuman'])
  Produk::create(['nama' => 'Kopi Gayo', 'harga' => 25000, 'stok' => 12, 'kategori_id' => 1])
Coba: http://localhost:8000/produk
`,
    },
    objId: [
      'Membuat tabel dengan migration (schema versioning) dan menjalankannya',
      'Menulis Eloquent Model: $fillable, $casts, query dasar',
      'Menggunakan route model binding: {produk} → Produk $produk',
      'Menjalankan perintah artisan make:migration dan tinker',
    ],
    objEn: [
      'Create tables with migrations (schema versioning) and run them',
      'Write an Eloquent Model: $fillable, $casts, basic queries',
      'Use route model binding: {produk} → Produk $produk',
      'Run the make:migration and tinker artisan commands',
    ],
    expId: `## Migration: Skema sebagai Versi
Migration = file PHP yang mendeskripsikan perubahan skema, dieksekusi dengan php artisan migrate. Tabel dibuat dari kode, bukan SQL manual. Ini memungkinkan tim sinkron: setiap orang menjalankan migrate dan mendapat database yang sama. down() membatalkan perubahan (rollback).
## Eloquent: Model = Tabel
class Produk extends Model → objek Produk mewakili baris tabel produks. Tanpa konfigurasi: nama class jamak = nama tabel (Produk → produks). $fillable = daftar kolom yang boleh diisi massal (keamanan mass assignment). $casts = transformasi otomatis: tersedia jadi boolean, harga jadi decimal.
## Query Builder yang Manusiawi
Produk::all() (semua baris), Produk::find(1), Produk::where('stok', '>', 0)->get(), count(), firstOrFail(). Setiap query mengembalikan Collection - bisa di-loop langsung di blade.
## Route Model Binding
{produk} + type hint Produk $produk → Laravel otomatis mencari Produk::findOrFail($id) - kalau tidak ada, otomatis 404. Tanpa binding, Anda menulis pencarian manual di setiap controller.`,
    expEn: `## Migration: Schema as Version Control
A migration = a PHP file describing a schema change, executed with php artisan migrate. Tables are built from code, not hand-written SQL. This keeps teams in sync: everyone runs migrate and gets the same database. down() undoes the change (rollback).
## Eloquent: Model = Table
class Produk extends Model → a Produk object represents a row of the produks table. Zero config: pluralized class name = table name (Produk → produks). $fillable = the columns allowed for mass assignment (mass-assignment security). $casts = automatic transformation: tersedia becomes boolean, harga becomes decimal.
## A Human Query Builder
Produk::all() (all rows), Produk::find(1), Produk::where('stok', '>', 0)->get(), count(), firstOrFail(). Every query returns a Collection - loop it directly in blade.
## Route Model Binding
{produk} + type hint Produk $produk → Laravel automatically looks up Produk::findOrFail($id) - missing records auto-404. Without binding you would hand-write lookups in every controller.`,
    chId: 'Bangun model kedua: (1) buat migration tabel ulasans (produk_id FK, isi text, bintang 1-5) + model Ulasan, (2) tampilkan ulasan di halaman detail produk dengan @forelse, (3) tambah scopeTersedia() di Produk dan pakai di route /produk, (4) tambah kolom diskon_persen (nullable) lewat migration baru - jangan edit migration lama!',
    chEn: 'Build a second model: (1) create an ulasans table migration (produk_id FK, isi text, bintang 1-5) + an Ulasan model, (2) show reviews on the product detail page with @forelse, (3) add scopeTersedia() to Produk and use it on the /produk route, (4) add a diskon_persen (nullable) column via a NEW migration - never edit old migrations!',
    sumId: 'Migration = skema versioned. Eloquent = tabel sebagai object. Binding = 404 otomatis. Lanjut: relationships.',
    sumEn: 'Migrations = versioned schema. Eloquent = tables as objects. Binding = auto-404. Next: relationships.',
  },
];

const LESSONS_P2 = [
  {
    phase: 2, num: 5, topicId: 'eloquent-relations',
    titleId: 'Eloquent Relationships: 1-N & N-N', titleEn: 'Eloquent Relationships: 1-N & N-N',
    codeFile: 'app/Models/Produk.php',
    files: {
      ...SKELETON(),
      'routes/web.php': `<?php

use App\\Models\\Kategori;
use App\\Models\\Produk;
use App\\Models\\Tag;
use Illuminate\\Support\\Facades\\Route;

Route::get('/produk', function () {
    $produk = Produk::with(['kategori', 'tags'])->get();

    return view('produk.daftar', compact('produk'));
});

Route::get('/produk/{produk}', function (Produk $produk) {
    $produk->load('kategori', 'tags');

    return view('produk.detail', compact('produk'));
});

Route::get('/kategori/{kategori}', function (Kategori $kategori) {
    $produk = $kategori->produk()->where('tersedia', true)->get();

    return view('kategori.detail', compact('kategori', 'produk'));
});

Route::get('/tag/{tag}', fn (Tag $tag) => view('tag.detail', ['tag' => $tag->load('produk')]));
`,
      'database/migrations/2026_07_01_000003_create_tags_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 50)->unique();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tags');
    }
};
`,
      'database/migrations/2026_07_01_000004_create_produk_tag_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('produk_tag', function (Blueprint $table) {
            $table->id();
            $table->foreignId('produk_id')->constrained()->cascadeOnDelete();
            $table->foreignId('tag_id')->constrained()->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('produk_tag');
    }
};
`,
      'app/Models/Tag.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = ['nama'];

    public function produk()
    {
        return $this->belongsToMany(Produk::class);
    }
}
`,
      'app/Models/Kategori.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class Kategori extends Model
{
    use HasFactory;

    protected $fillable = ['nama'];

    public function produk()
    {
        return $this->hasMany(Produk::class);
    }
}
`,
      'app/Models/Produk.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class Produk extends Model
{
    use HasFactory;

    protected $fillable = ['nama', 'harga', 'stok', 'tersedia', 'kategori_id'];

    protected $casts = [
        'tersedia' => 'boolean',
    ];

    public function kategori()
    {
        return $this->belongsTo(Kategori::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function scopeTersedia($query)
    {
        return $query->where('tersedia', true);
    }
}
`,
      'resources/views/produk/detail.blade.php': `@extends('layouts.app')

@section('judul', $produk->nama)

@section('konten')
    <h2>{{ $produk->nama }}</h2>
    <p>Kategori: {{ $produk->kategori?->nama }}</p>
    <p>Harga: Rp {{ number_format($produk->harga, 0, ',', '.') }}</p>
    <p>Tags:
        @foreach ($produk->tags as $tag)
            <a href="{{ route('tag.detail', $tag) }}">#{{ $tag->nama }}</a>
        @endforeach
    </p>
@endsection
`,
      'composer.json': PKG('eloquent-relations'),
      'package.json': PKG_NODE('laravel-lesson-relations', DEV_SERVE),
      'README.md': `# Laravel Lesson 5 - Eloquent Relationships

Jalankan: composer install && php artisan migrate && php artisan serve
Tinker: php artisan tinker
  $k = Kategori::create(['nama' => 'Minuman'])
  $p = Produk::create(['nama' => 'Kopi Gayo', 'harga' => 25000, 'stok' => 12, 'kategori_id' => $k->id])
  $p->tags()->attach(Tag::create(['nama' => 'lokal'])->id)
Coba: http://localhost:8000/produk
`,
    },
    objId: [
      'Mendefinisikan hasMany, belongsTo, dan belongsToMany',
      'Memakai relasi sebagai properti: $produk->kategori (lazy load)',
      'Menghindari N+1 dengan with() (eager loading)',
      'Menggunakan scope untuk query yang bisa dipakai ulang',
    ],
    objEn: [
      'Define hasMany, belongsTo, and belongsToMany relationships',
      'Use relationships as properties: $produk->kategori (lazy loading)',
      'Avoid N+1 with with() (eager loading)',
      'Use scopes for reusable query filters',
    ],
    expId: `## Relasi sebagai Bahasa
Produk belongsTo Kategori (punya kategori_id), Kategori hasMany Produk (satu kategori punya banyak produk), Produk belongsToMany Tag (many-to-many via tabel pivot produk_tag). Setelah didefinisikan, relasi dipakai seperti properti: $produk->kategori mengembalikan objek Kategori, $produk->tags mengembalikan Collection.
## Eager Loading vs N+1
Loop 30 produk + akses $produk->kategori di dalamnya = 1 query produk + 30 query kategori = 31 query (masalah N+1). Produk::with('kategori') memuat semuanya dalam 2 query via JOIN. Aturan: di dalam @foreach, gunakan with() di controller - dan observasi jumlah query dengan debugbar/telescope.
## Query Relasi
$kategori->produk()->where('tersedia', true)->get() memfilter anak dari relasi (query builder penuh tetap tersedia). Relasi bisa dirantai: Produk::with('kategori.produk')->get().
## Scope: Query Bernama
scopeTersedia() memungkinkan Produk::tersedia()->get() - filter yang dibungkus nama deskriptif, dipakai ulang di banyak controller. Ini pola kunci kode Eloquent yang bersih.`,
    expEn: `## Relationships as a Language
Produk belongsTo Kategori (holds kategori_id), Kategori hasMany Produk (one category has many products), Produk belongsToMany Tag (many-to-many through the produk_tag pivot table). Once defined, relationships are used like properties: $produk->kategori returns a Kategori object, $produk->tags returns a Collection.
## Eager Loading vs N+1
Looping 30 products + touching $produk->kategori inside = 1 product query + 30 category queries = 31 queries (the N+1 problem). Produk::with('kategori') loads everything in 2 queries via a JOIN. Rule: inside @foreach, use with() in the controller - and watch query counts with debugbar/telescope.
## Relationship Queries
$kategori->produk()->where('tersedia', true)->get() filters the relationship's children (the full query builder remains available). Relationships chain: Produk::with('kategori.produk')->get().
## Scopes: Named Queries
scopeTersedia() enables Produk::tersedia()->get() - a filter wrapped in a descriptive name, reused across controllers. This is a key pattern of clean Eloquent code.`,
    chId: 'Perkuat relasi: (1) buat relasi Ulasan (produk hasMany ulasan, ulasan belongsTo produk + pengguna) dan tampilkan rata-rata bintang via withAvg, (2) tambah relasi kategoris pada Tag (belongsToMany kategori) - ya, relasi antar pivot boleh, (3) buat halaman statistik yang menampilkan jumlah produk per kategori memakai withCount, (4) tambahkan scopeHargaBawah(15000) dan pakai di route.',
    chEn: 'Strengthen relations: (1) build a Ulasan relation (produk hasMany ulasan, ulasan belongsTo produk + user) and show the average rating via withAvg, (2) add a kategoris relation on Tag (belongsToMany kategori) - yes, pivot-to-pivot relations are fine, (3) build a stats page showing product counts per category with withCount, (4) add a scopeHargaBawah(15000) and use it on a route.',
    sumId: 'Relasi = bahasa. with() lawan N+1. Scope = query bernama. Lanjut: validasi & form requests.',
    sumEn: 'Relations = language. with() vs N+1. Scopes = named queries. Next: validation & form requests.',
  },
  {
    phase: 2, num: 6, topicId: 'validation-forms',
    titleId: 'Validasi & Form Requests', titleEn: 'Validation & Form Requests',
    codeFile: 'app/Http/Requests/ProdukRequest.php',
    files: {
      ...SKELETON(),
      'routes/web.php': `<?php

use App\\Http\\Controllers\\ProdukController;
use Illuminate\\Support\\Facades\\Route;

Route::get('/produk', [ProdukController::class, 'daftar'])->name('produk.daftar');
Route::get('/produk/baru', [ProdukController::class, 'create'])->name('produk.create');
Route::post('/produk', [ProdukController::class, 'store'])->name('produk.store');
Route::get('/produk/{produk}/edit', [ProdukController::class, 'edit'])->name('produk.edit');
Route::put('/produk/{produk}', [ProdukController::class, 'update'])->name('produk.update');
`,
      'app/Http/Requests/ProdukRequest.php': `<?php

namespace App\\Http\\Requests;

use Illuminate\\Foundation\\Http\\FormRequest;

class ProdukRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama' => ['required', 'string', 'min:3', 'max:200'],
            'harga' => ['required', 'numeric', 'min:0', 'max:1000000000'],
            'stok' => ['required', 'integer', 'min:0'],
            'tersedia' => ['sometimes', 'boolean'],
            'kategori_id' => ['required', 'exists:kategoris,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'nama.required' => 'Nama produk wajib diisi.',
            'nama.min' => 'Nama minimal 3 karakter.',
            'harga.min' => 'Harga tidak boleh negatif.',
            'kategori_id.exists' => 'Kategori tidak valid.',
        ];
    }
}
`,
      'app/Http/Controllers/ProdukController.php': `<?php

namespace App\\Http\\Controllers;

use App\\Http\\Requests\\ProdukRequest;
use App\\Models\\Kategori;
use App\\Models\\Produk;

class ProdukController extends Controller
{
    public function daftar()
    {
        return view('produk.daftar', ['produk' => Produk::with('kategori')->get()]);
    }

    public function create()
    {
        return view('produk.create', ['kategori' => Kategori::all()]);
    }

    public function store(ProdukRequest $request)
    {
        Produk::create($request->validated());

        return redirect()->route('produk.daftar')->with('sukses', 'Produk berhasil ditambahkan.');
    }

    public function edit(Produk $produk)
    {
        return view('produk.edit', ['produk' => $produk, 'kategori' => Kategori::all()]);
    }

    public function update(ProdukRequest $request, Produk $produk)
    {
        $produk->update($request->validated());

        return redirect()->route('produk.daftar')->with('sukses', 'Produk diperbarui.');
    }
}
`,
      'resources/views/produk/create.blade.php': `@extends('layouts.app')

@section('judul', 'Tambah Produk')

@section('konten')
    <h2>Tambah Produk</h2>

    @if ($errors->any())
        <ul style="color: red;">
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    @endif

    <form method="POST" action="{{ route('produk.store') }}">
        @csrf
        <p><label>Nama <input name="nama" value="{{ old('nama') }}"></label></p>
        <p><label>Harga <input name="harga" type="number" value="{{ old('harga') }}"></label></p>
        <p><label>Stok <input name="stok" type="number" value="{{ old('stok') }}"></label></p>
        <p><label>Kategori
            <select name="kategori_id">
                @foreach ($kategori as $k)
                    <option value="{{ $k->id }}">{{ $k->nama }}</option>
                @endforeach
            </select>
        </label></p>
        <p><label><input type="checkbox" name="tersedia" value="1" checked> Tersedia</label></p>
        <button type="submit">Simpan</button>
    </form>
@endsection
`,
      'composer.json': PKG('validation-forms'),
      'package.json': PKG_NODE('laravel-lesson-validation', DEV_SERVE),
      'README.md': `# Laravel Lesson 6 - Validation & Form Requests

Jalankan: composer install && php artisan migrate && php artisan serve
Tinker: php artisan tinker
  Kategori::create(['nama' => 'Minuman'])
Coba: http://localhost:8000/produk/baru - submit form kosong, perhatikan error & old()
`,
    },
    objId: [
      'Menulis FormRequest: rules(), messages(), authorize()',
      'Menggunakan $request->validated() sebagai satu-satunya sumber data',
      'Menampilkan error validasi dan old() di blade',
      'Memahami CSRF token dan @csrf di form',
    ],
    objEn: [
      'Write a FormRequest: rules(), messages(), authorize()',
      'Use $request->validated() as the only source of data',
      'Show validation errors and old() in blade',
      'Understand CSRF tokens and @csrf in forms',
    ],
    expId: `## FormRequest: Validasi sebagai Class
php artisan make:request ProdukRequest membuat class khusus. rules() mengembalikan array aturan: required, min:3, max:200, numeric, integer, exists:kategoris,id. Laravel menjalankan validasi OTOMATIS sebelum controller dipanggil - data buruk tidak pernah sampai ke logika bisnis.
## validated(): Satu-Satunya Sumber Data
$request->validated() mengembalikan HANYA kolom yang lolos aturan - tidak ada input nakal (mass assignment protection lapis kedua setelah $fillable). Jangan pernah membaca request langsung di controller saat FormRequest ada.
## Error & old()
Saat validasi gagal: redirect otomatis kembali + error di session. $errors->all() menampilkan semuanya, $errors->first('nama') per kolom. old('nama') mengisi ulang input - user tidak mengetik ulang. 422 vs redirect: form HTML memakai redirect, API (lesson 13) menerima JSON 422.
## CSRF: Token di Setiap Form
@csrf menyisipkan token rahasia; middleware VerifyCsrfToken mencocokkannya dengan session. Tanpa token, POST ditolak (419). Ini menutup serangan cross-site request forgery - form dari situs lain tidak bisa mengirim data atas nama user.`,
    expEn: `## FormRequest: Validation as a Class
php artisan make:request ProdukRequest creates a dedicated class. rules() returns the rule array: required, min:3, max:200, numeric, integer, exists:kategoris,id. Laravel runs validation AUTOMATICALLY before the controller is called - bad data never reaches business logic.
## validated(): The Only Data Source
$request->validated() returns ONLY the columns that passed the rules - no sneaky inputs (a second mass-assignment layer on top of $fillable). Never read the request directly in a controller when a FormRequest exists.
## Errors & old()
On validation failure: automatic redirect back + errors in the session. $errors->all() shows them all, $errors->first('nama') per column. old('nama') refills inputs - users do not retype. 422 vs redirect: HTML forms get a redirect, APIs (lesson 13) receive JSON 422.
## CSRF: A Token in Every Form
@csrf inserts a secret token; the VerifyCsrfToken middleware compares it with the session. Without a token, POST is rejected (419). This closes cross-site request forgery - forms from other sites cannot submit data on the user's behalf.`,
    chId: `Perkuat validasi: (1) tambah aturan unique:nama pada update (abaikan id sendiri: unique:produks,nama,'.$produk->id), (2) buat aturan custom 'stok_genap' via Rule::custom atau closure di rules(), (3) tambahkan error khusus per-field dengan @error('nama') di blade, (4) buat UlasanRequest untuk form ulasan (isi required min:10, bintang required integer between:1,5).`,
    chEn: `Strengthen validation: (1) add a unique:nama rule on update (ignore self: unique:produks,nama,'.$produk->id), (2) write a custom stok_genap rule via Rule::custom or a closure in rules(), (3) add per-field errors with @error('nama') in blade, (4) build a UlasanRequest for a review form (isi required min:10, bintang required integer between:1,5).`,
    sumId: 'FormRequest = gerbang. validated() = satu-satunya sumber. CSRF = tameng POST. Lanjut: CRUD blog.',
    sumEn: 'FormRequest = the gate. validated() = the only source. CSRF = the POST shield. Next: CRUD blog.',
  },
  {
    phase: 2, num: 7, topicId: 'crud-blog',
    titleId: 'Proyek CRUD: Blog Lengkap', titleEn: 'CRUD Project: A Full Blog',
    codeFile: 'app/Http/Controllers/ArtikelController.php',
    files: {
      ...SKELETON(),
      'routes/web.php': `<?php

use App\\Http\\Controllers\\ArtikelController;
use Illuminate\\Support\\Facades\\Route;

Route::resource('artikel', ArtikelController::class)->only([
    'index', 'create', 'store', 'show', 'edit', 'update', 'destroy',
]);
`,
      'database/migrations/2026_07_01_000005_create_artikels_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('artikels', function (Blueprint $table) {
            $table->id();
            $table->string('judul', 200);
            $table->string('slug', 220)->unique();
            $table->text('isi');
            $table->boolean('terbit')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('artikels');
    }
};
`,
      'app/Models/Artikel.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Support\\Str;

class Artikel extends Model
{
    use HasFactory;

    protected $fillable = ['judul', 'slug', 'isi', 'terbit'];

    protected $casts = ['terbit' => 'boolean'];

    protected static function booted(): void
    {
        static::creating(function (Artikel $artikel) {
            $artikel->slug = $artikel->slug ?: Str::slug($artikel->judul);
        });
    }
}
`,
      'app/Http/Controllers/ArtikelController.php': `<?php

namespace App\\Http\\Controllers;

use App\\Http\\Requests\\ArtikelRequest;
use App\\Models\\Artikel;

class ArtikelController extends Controller
{
    public function index()
    {
        $artikel = Artikel::where('terbit', true)->latest()->paginate(5);

        return view('artikel.index', compact('artikel'));
    }

    public function create()
    {
        return view('artikel.create');
    }

    public function store(ArtikelRequest $request)
    {
        Artikel::create($request->validated());

        return redirect()->route('artikel.index')->with('sukses', 'Artikel berhasil dibuat.');
    }

    public function show(Artikel $artikel)
    {
        return view('artikel.show', compact('artikel'));
    }

    public function edit(Artikel $artikel)
    {
        return view('artikel.edit', compact('artikel'));
    }

    public function update(ArtikelRequest $request, Artikel $artikel)
    {
        $artikel->update($request->validated());

        return redirect()->route('artikel.show', $artikel)->with('sukses', 'Artikel diperbarui.');
    }

    public function destroy(Artikel $artikel)
    {
        $artikel->delete();

        return redirect()->route('artikel.index')->with('sukses', 'Artikel dihapus.');
    }
}
`,
      'app/Http/Requests/ArtikelRequest.php': `<?php

namespace App\\Http\\Requests;

use Illuminate\\Foundation\\Http\\FormRequest;

class ArtikelRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'judul' => ['required', 'string', 'max:200'],
            'isi' => ['required', 'string', 'min:50'],
            'terbit' => ['sometimes', 'boolean'],
        ];
    }
}
`,
      'resources/views/artikel/index.blade.php': `@extends('layouts.app')

@section('judul', 'Blog Tryngo')

@section('konten')
    <h2>Blog Tryngo</h2>

    @if (session('sukses'))
        <p style="color: green;">{{ session('sukses') }}</p>
    @endif

    <p><a href="{{ route('artikel.create') }}">+ Tulis Artikel</a></p>

    @forelse ($artikel as $item)
        <article class="kartu">
            <h3><a href="{{ route('artikel.show', $item) }}">{{ $item->judul }}</a></h3>
            <p>{{ Str::limit($item->isi, 120) }}</p>
        </article>
    @empty
        <p>Belum ada artikel terbit.</p>
    @endforelse

    {{ $artikel->links() }}
@endsection
`,
      'composer.json': PKG('crud-blog'),
      'package.json': PKG_NODE('laravel-lesson-crud', DEV_SERVE),
      'README.md': `# Laravel Lesson 7 - CRUD Blog

Jalankan: composer install && php artisan migrate && php artisan serve
Coba: /artikel (index), /artikel/create (buat), /artikel/1 (detail), edit, hapus
Route list: php artisan route:list (perhatikan resource route)
`,
    },
    objId: [
      'Membangun CRUD lengkap dengan Route::resource',
      'Menggunakan paginate() + {{ $artikel->links() }}',
      'Mengirim flash message dengan with(\'sukses\', ...)',
      'Mengisi slug otomatis dengan model event creating',
    ],
    objEn: [
      'Build full CRUD with Route::resource',
      'Use paginate() + {{ $artikel->links() }}',
      'Send flash messages with with(\'sukses\', ...)',
      'Auto-fill the slug with the creating model event',
    ],
    expId: `## Route::resource: CRUD Sekali Jalan
Route::resource('artikel', ArtikelController::class) membuat 7 route sekaligus (index, create, store, show, edit, update, destroy) dengan URL dan method HTTP yang konvensi. ->only([...]) membatasi. Cek php artisan route:list: nama route otomatis (artikel.index, artikel.store, artikel.destroy...).
## Pagination Bawaan
paginate(5) membungkus query: SELECT ... LIMIT 5 OFFSET 0 + menghitung total. {{ $artikel->links() }} merender navigasi halaman. Laravel menghasilkan tautan pagination yang benar tanpa menulis satu baris pun - fitur yang paling diremehkan.
## Flash Message: Satu Request Saja
with('sukses', 'Artikel berhasil dibuat') menyimpan pesan di session HANYA untuk request berikutnya (flash). setelah redirect, session('sukses') menampilkannya sekali lalu hilang. Pola UX standar: aksi → konfirmasi.
## Model Event: Slug Otomatis
Model event creating dijalankan SEBELUM record disimpan. Artikel::create tanpa slug → Str::slug($artikel->judul) mengisi otomatis. Kolom yang 'hidup sendiri' lebih baik dikelola di model, bukan controller - setiap jalur pembuatan (form, tinker, factory) mendapat perilaku yang sama.`,
    expEn: `## Route::resource: CRUD in One Line
Route::resource('artikel', ArtikelController::class) creates 7 routes at once (index, create, store, show, edit, update, destroy) with conventional URLs and HTTP methods. ->only([...]) limits them. Check php artisan route:list: automatic route names (artikel.index, artikel.store, artikel.destroy...).
## Built-in Pagination
paginate(5) wraps the query: SELECT ... LIMIT 5 OFFSET 0 + a total count. {{ $artikel->links() }} renders the pager. Laravel produces correct pagination links without writing a single line - the most underrated feature.
## Flash Messages: One Request Only
with('sukses', 'Artikel berhasil dibuat') stores a message in the session for ONLY the next request (flash). after the redirect, session('sukses') shows it once and it disappears. The standard UX pattern: action → confirmation.
## Model Events: Automatic Slugs
The creating model event runs BEFORE the record is saved. Artikel::create without a slug → Str::slug($artikel->judul) fills it automatically. Self-managing columns belong in the model, not controllers - every creation path (form, tinker, factory) gets the same behavior.`,
    chId: `Perluas blog: (1) tambah pencarian ?q= di index (where('judul', 'like', '%'.$q.'%') dengan paginate->withQueryString()), (2) tambah filter kategori (relasi kategori pada artikel + select di form), (3) buat draft page /artikel/draft yang hanya menampilkan artikel belum terbit, (4) tambahkan konfirmasi hapus di blade (form DELETE + @method('DELETE')).`,
    chEn: `Extend the blog: (1) add a ?q= search on index (where('judul', 'like', '%'.$q.'%') with paginate->withQueryString()), (2) add a category filter (a kategori relation on artikel + a select in the form), (3) build a /artikel/draft page showing only unpublished articles, (4) add delete confirmation in blade (DELETE form + @method('DELETE')).`,
    sumId: 'Resource = 7 route sekali. Pagination = gratis. Flash = konfirmasi. Lanjut: factories & seeders.',
    sumEn: 'Resource = 7 routes at once. Pagination = free. Flash = confirmation. Next: factories & seeders.',
  },
  {
    phase: 2, num: 8, topicId: 'factories-seeders',
    titleId: 'Factories & Seeders: Data Dummy', titleEn: 'Factories & Seeders: Dummy Data',
    codeFile: 'database/seeders/DatabaseSeeder.php',
    files: {
      ...SKELETON(),
      'routes/web.php': `<?php

use Illuminate\\Support\\Facades\\Route;

Route::get('/', function () {
    return view('beranda', ['produk' => \\App\\Models\\Produk::with('kategori')->get()]);
});
`,
      'database/factories/KategoriFactory.php': `<?php

namespace Database\\Factories;

use Illuminate\\Database\\Eloquent\\Factories\\Factory;

class KategoriFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nama' => fake()->unique()->randomElement(['Minuman', 'Makanan', 'Snack', 'Kopi', 'Teh']),
        ];
    }
}
`,
      'database/factories/ProdukFactory.php': `<?php

namespace Database\\Factories;

use App\\Models\\Kategori;
use Illuminate\\Database\\Eloquent\\Factories\\Factory;

class ProdukFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nama' => fake()->unique()->words(2, true),
            'harga' => fake()->numberBetween(5000, 250000),
            'stok' => fake()->numberBetween(0, 100),
            'tersedia' => fake()->boolean(80),
            'kategori_id' => Kategori::factory(),
        ];
    }
}
`,
      'database/seeders/DatabaseSeeder.php': `<?php

namespace Database\\Seeders;

use App\\Models\\Kategori;
use App\\Models\\Produk;
use Illuminate\\Database\\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Kategori::factory()->count(5)->create();
        Produk::factory()->count(30)->create();
    }
}
`,
      'app/Models/Produk.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class Produk extends Model
{
    use HasFactory;

    protected $fillable = ['nama', 'harga', 'stok', 'tersedia', 'kategori_id'];

    protected $casts = ['tersedia' => 'boolean'];

    public function kategori()
    {
        return $this->belongsTo(Kategori::class);
    }
}
`,
      'app/Models/Kategori.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class Kategori extends Model
{
    use HasFactory;

    protected $fillable = ['nama'];

    public function produk()
    {
        return $this->hasMany(Produk::class);
    }
}
`,
      'resources/views/beranda.blade.php': `@extends('layouts.app')

@section('judul', 'Beranda')

@section('konten')
    <h2>30 Produk dari Factory</h2>
    <p>php artisan db:seed - data dummy siap untuk dikembangkan.</p>
    <ul>
        @foreach ($produk as $item)
            <li>{{ $item->nama }} - Rp {{ number_format($item->harga) }} ({{ $item->kategori->nama }})</li>
        @endforeach
    </ul>
@endsection
`,
      'composer.json': PKG('factories-seeders'),
      'package.json': PKG_NODE('laravel-lesson-factories', 'composer install --no-interaction && touch database/database.sqlite && php artisan migrate --force && php artisan db:seed --force && php artisan serve'),
      'README.md': `# Laravel Lesson 8 - Factories & Seeders

Jalankan: composer install && php artisan migrate --force && php artisan db:seed --force && php artisan serve
Coba: http://localhost:8000/ - 30 produk dummy
Ulangi data: php artisan migrate:fresh --seed
`,
    },
    objId: [
      'Menulis Factory dengan Faker (fake())',
      'Merangkai relasi di factory: kategori_id => Kategori::factory()',
      'Menulis DatabaseSeeder dan menjalankan db:seed',
      'Membuat ulang database dengan migrate:fresh --seed',
    ],
    objEn: [
      'Write Factories with Faker (fake())',
      'Chain relationships in factories: kategori_id => Kategori::factory()',
      'Write DatabaseSeeder and run db:seed',
      'Rebuild the database with migrate:fresh --seed',
    ],
    expId: `## Factory: Resep Data
Factory mendefinisikan 'resep' satu baris: fake()->name(), numberBetween(5000, 250000), randomElement([...]). Produk::factory()->count(30)->create() menghasilkan 30 baris realistik dalam hitungan detik. fake() = Faker - generator data palsu dalam 30+ bahasa (locale dari config app faker_locale).
## Relasi di Factory
'kategori_id' => Kategori::factory() membuat kategori baru secara implisit untuk tiap produk - data selalu konsisten (FK valid). Pola ini juga bekerja di test: panggil factory dan dapatkan objek lengkap dengan relasinya.
## Seeder: Data Awal Aplikasi
DatabaseSeeder::run() dijalankan dengan php artisan db:seed. Seed produsen data: kategori master + produk awal + user admin. Untuk tim: satu perintah = database berisi data yang sama untuk semua orang - menghilangkan setup manual.
## migrate:fresh: Reset Total
php artisan migrate:fresh --seed menghapus SEMUA tabel, menjalankan semua migration dari nol, lalu seed. Di development ini menghemat waktu; DI PRODUKSI JANGAN PERNAH - data asli hilang.`,
    expEn: `## Factories: Data Recipes
A factory defines a 'recipe' for one row: fake()->name(), numberBetween(5000, 250000), randomElement([...]). Produk::factory()->count(30)->create() produces 30 realistic rows in seconds. fake() = Faker - a fake-data generator in 30+ languages (locale from the app faker_locale config).
## Relationships in Factories
'kategori_id' => Kategori::factory() implicitly creates a category for each product - data stays consistent (valid FKs). The pattern also shines in tests: call a factory and get a complete object with its relations.
## Seeders: Initial App Data
DatabaseSeeder::run() executes with php artisan db:seed. Seed production data: master categories + initial products + an admin user. For teams: one command = the same populated database for everyone - no manual setup.
## migrate:fresh: Total Reset
php artisan migrate:fresh --seed drops ALL tables, runs every migration from zero, then seeds. In development this saves time; NEVER ON PRODUCTION - real data is lost.`,
    chId: 'Perkuat data dummy: (1) buat ArtikelFactory (judul kata-kata acak, isi paragraf(3), terbit boolean) dan 50 artikel di seeder, (2) buat factory state: Produk::factory()->habis() dengan state tersedia => false, (3) buat UserFactory dan user admin dengan email tetap admin@tryngo.test, (4) pecah seeder menjadi KelasSeeder terpisah dan panggil dengan $this->call([...]).',
    chEn: 'Strengthen dummy data: (1) create an ArtikelFactory (random word judul, paragraf(3) isi, boolean terbit) and 50 articles in the seeder, (2) make a factory state: Produk::factory()->habis() with tersedia => false, (3) create a UserFactory and an admin user with a fixed email admin@tryngo.test, (4) split the seeder into separate Seeder classes called with $this->call([...]).',
    sumId: 'Factory = resep baris. Seeder = data awal tim. fresh --seed = reset cepat. Lanjut: authentication.',
    sumEn: 'Factories = row recipes. Seeders = shared initial data. fresh --seed = quick reset. Next: authentication.',
  },
];

const LESSONS_P3 = [
  {
    phase: 3, num: 9, topicId: 'auth-basics',
    titleId: 'Autentikasi Session', titleEn: 'Session Authentication',
    codeFile: 'app/Http/Controllers/AuthController.php',
    files: {
      ...SKELETON(),
      'config/auth.php': CONFIG_AUTH,
      'database/migrations/2026_07_01_000001_create_users_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
`,
      'app/Models/User.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Foundation\\Auth\\User as Authenticatable;
use Illuminate\\Notifications\\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = ['nama', 'email', 'password'];

    protected $hidden = ['password', 'remember_token'];
}
`,
      'app/Http/Controllers/AuthController.php': `<?php

namespace App\\Http\\Controllers;

use App\\Models\\User;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Auth;
use Illuminate\\Support\\Facades\\Hash;

class AuthController extends Controller
{
    public function showRegister()
    {
        return view('auth.register');
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'nama' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = User::create([
            'nama' => $data['nama'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        Auth::login($user);

        return redirect()->route('dashboard');
    }

    public function showLogin()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $kredensial = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (Auth::attempt($kredensial, $request->boolean('ingat'))) {
            $request->session()->regenerate();

            return redirect()->intended('/dashboard');
        }

        return back()->withErrors([
            'email' => 'Email atau password salah.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
`,
      'routes/web.php': `<?php

use App\\Http\\Controllers\\AuthController;
use Illuminate\\Support\\Facades\\Route;

Route::get('/', function () {
    return view('beranda');
});

Route::get('/daftar', [AuthController::class, 'showRegister'])->name('register');
Route::post('/daftar', [AuthController::class, 'register']);
Route::get('/masuk', [AuthController::class, 'showLogin'])->name('login');
Route::post('/masuk', [AuthController::class, 'login']);
Route::post('/keluar', [AuthController::class, 'logout'])->name('logout');

Route::get('/dashboard', function () {
    return view('dashboard', ['user' => auth()->user()]);
})->middleware('auth')->name('dashboard');
`,
      'resources/views/layouts/app.blade.php': `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('judul', 'Tryngo Laravel')</title>
</head>
<body>
    <nav>
        <a href="{{ url('/') }}">Tryngo</a>
        @auth
            <span>Halo, {{ auth()->user()->nama }}!</span>
            <a href="{{ route('dashboard') }}">Dashboard</a>
            <form method="POST" action="{{ route('logout') }}" style="display:inline">
                @csrf
                <button type="submit">Keluar</button>
            </form>
        @else
            <a href="{{ route('login') }}">Masuk</a>
            <a href="{{ route('register') }}">Daftar</a>
        @endauth
    </nav>
    <main>
        @yield('konten')
    </main>
</body>
</html>
`,
      'resources/views/beranda.blade.php': `@extends('layouts.app')

@section('judul', 'Beranda')

@section('konten')
    <h1>Selamat datang di Tryngo!</h1>
    <p>
        @auth
            Anda sudah masuk sebagai <strong>{{ auth()->user()->email }}</strong>.
        @else
            Daftar atau masuk untuk mengakses dashboard.
        @endauth
    </p>
@endsection
`,
      'resources/views/auth/register.blade.php': `@extends('layouts.app')

@section('judul', 'Daftar')

@section('konten')
    <h1>Daftar Akun Baru</h1>

    <form method="POST" action="{{ url('/daftar') }}">
        @csrf
        <div>
            <label>Nama</label>
            <input type="text" name="nama" value="{{ old('nama') }}" required>
            @error('nama') <small>{{ $message }}</small> @enderror
        </div>
        <div>
            <label>Email</label>
            <input type="email" name="email" value="{{ old('email') }}" required>
            @error('email') <small>{{ $message }}</small> @enderror
        </div>
        <div>
            <label>Password</label>
            <input type="password" name="password" required>
            @error('password') <small>{{ $message }}</small> @enderror
        </div>
        <div>
            <label>Ulangi Password</label>
            <input type="password" name="password_confirmation" required>
        </div>
        <button type="submit">Daftar</button>
    </form>
@endsection
`,
      'resources/views/auth/login.blade.php': `@extends('layouts.app')

@section('judul', 'Masuk')

@section('konten')
    <h1>Masuk</h1>

    @if ($errors->any())
        <p style="color:red">{{ $errors->first('email') }}</p>
    @endif

    <form method="POST" action="{{ url('/masuk') }}">
        @csrf
        <div>
            <label>Email</label>
            <input type="email" name="email" value="{{ old('email') }}" required>
        </div>
        <div>
            <label>Password</label>
            <input type="password" name="password" required>
        </div>
        <div>
            <label><input type="checkbox" name="ingat" value="1"> Ingat saya</label>
        </div>
        <button type="submit">Masuk</button>
    </form>
@endsection
`,
      'resources/views/dashboard.blade.php': `@extends('layouts.app')

@section('judul', 'Dashboard')

@section('konten')
    <h1>Dashboard</h1>
    <p>Selamat datang, <strong>{{ $user->nama }}</strong>!</p>
    <ul>
        <li>Email: {{ $user->email }}</li>
        <li>ID: {{ $user->id }}</li>
    </ul>
@endsection
`,
      'composer.json': PKG('auth-basics'),
      'package.json': PKG_NODE('laravel-lesson-auth', DEV_SERVE),
      'README.md': `# Laravel Lesson 9 - Session Authentication

Jalankan: composer install && php artisan migrate && php artisan serve
Coba: http://localhost:8000/daftar -> buat akun -> otomatis masuk ke /dashboard
Perhatikan: /dashboard mengalihkan tamu ke /masuk (middleware auth)
`,
    },
    objId: [
      'Membangun registrasi & login berbasis session dengan Auth facade',
      'Melindungi password dengan Hash::make (bcrypt)',
      'Mengamankan halaman dengan middleware auth dan redirect()->intended()',
      'Memahami session regeneration dan logout yang aman',
    ],
    objEn: [
      'Build session-based registration & login with the Auth facade',
      'Protect passwords with Hash::make (bcrypt)',
      'Secure pages with the auth middleware and redirect()->intended()',
      'Understand session regeneration and safe logout',
    ],
    expId: `## Auth Facade: Siapa yang Masuk?
Auth::login($user) menyimpan identitas user di session (guard 'web'). Auth::attempt() memeriksa kredensial dan membuat session sekaligus. auth()->user() mengembalikan model user yang sedang masuk - tersedia di controller, route, dan blade. $hidden = password tidak pernah bocor ke JSON/serialisasi.
## Hash::make: Jangan Pernah Simpan Password Asli
Hash::make() menggunakan bcrypt - satu arah. login tidak membandingkan string: Auth::attempt() menjalankan Hash::check() di belakang layar. Aturan min:8 datang dari validasi; jangan pernah memvalidasi 'password sama' dengan string.
## Middleware auth: Pagar Otomatis
->middleware('auth') pada route: tamu dialihkan ke halaman login (route bernama 'login'), user yang sudah masuk diteruskan. redirect()->intended() membawa user kembali ke halaman yang tadinya dia tuju - pengalaman pengguna yang benar.
## Keamanan Session
Setelah login: $request->session()->regenerate() mencegah session fixation (mencuri session ID lama). Setelah logout: invalidate() menghapus semua data session dan regenerateToken() membatalkan token CSRF lama.`,
    expEn: `## The Auth Facade: Who Is In?
Auth::login($user) stores the user's identity in the session (the 'web' guard). Auth::attempt() checks credentials and creates the session in one call. auth()->user() returns the logged-in model - available in controllers, routes, and blade. $hidden = the password never leaks to JSON/serialization.
## Hash::make: Never Store Plain Passwords
Hash::make() uses bcrypt - one way. Login does not compare strings: Auth::attempt() runs Hash::check() behind the scenes. The min:8 rule comes from validation; never validate a password against a literal string.
## The auth Middleware: An Automatic Gate
->middleware('auth') on a route: guests are redirected to the login page (the named 'login' route), logged-in users pass through. redirect()->intended() takes users back to the page they originally wanted - the correct UX.
## Session Security
After login: $request->session()->regenerate() prevents session fixation (stealing an old session ID). After logout: invalidate() wipes all session data and regenerateToken() invalidates the old CSRF token.`,
    chId: `Perkuat autentikasi: (1) tambah halaman profil dengan link "Ubah Password" (password lama wajib + konfirmasi, gunakan Hash::check untuk verifikasi), (2) tampilkan badge "Login terakhir" dengan menyimpan timestamp di session saat login, (3) tambah rate limiting pada route login: ->middleware('throttle:5,1') dan amati error 429 setelah 5 percobaan gagal, (4) buat middleware EnsureEmailVerified yang memblokir dashboard sampai user "memverifikasi" email (simulasi dengan kolom email_verified_at).`,
    chEn: 'Harden the authentication: (1) add a profile page with a "Change Password" link (current password required + confirmation, verify with Hash::check), (2) show a "Last login" badge by storing a timestamp in the session on login, (3) add rate limiting on the login route: ->middleware(\'throttle:5,1\') and watch error 429 after 5 failed attempts, (4) build an EnsureEmailVerified middleware that blocks the dashboard until the user "verifies" the email (simulate with an email_verified_at column).',
    sumId: 'Auth facade + Hash = identitas aman. Middleware auth = pagar. Session regenerate = anti-fixation. Lanjut: middleware & policies.',
    sumEn: 'Auth facade + Hash = secure identity. auth middleware = the gate. Session regenerate = anti-fixation. Next: middleware & policies.',
  },
  {
    phase: 3, num: 10, topicId: 'middleware-policies',
    titleId: 'Middleware & Policies', titleEn: 'Middleware & Policies',
    codeFile: 'app/Policies/ArtikelPolicy.php',
    files: {
      ...SKELETON(false, `$middleware->alias([
            'admin' => \\App\\Http\\Middleware\\AdminOnly::class,
            'profil-lengkap' => \\App\\Http\\Middleware\\EnsureProfilLengkap::class,
        ]);`),
      'database/migrations/2026_07_01_000001_create_users_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('telepon', 20)->nullable();
            $table->string('peran', 20)->default('pelanggan');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
`,
      'database/migrations/2026_07_01_000002_create_artikels_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('artikels', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->text('isi');
            $table->foreignId('penulis_id')->constrained('users')->cascadeOnDelete();
            $table->boolean('terbit')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('artikels');
    }
};
`,
      'app/Models/User.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Foundation\\Auth\\User as Authenticatable;
use Illuminate\\Notifications\\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = ['nama', 'email', 'password', 'telepon', 'peran'];
}
`,
      'app/Models/Artikel.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class Artikel extends Model
{
    use HasFactory;

    protected $fillable = ['judul', 'isi', 'penulis_id', 'terbit'];

    protected $casts = ['terbit' => 'boolean'];

    public function penulis()
    {
        return $this->belongsTo(User::class, 'penulis_id');
    }
}
`,
      'app/Http/Middleware/AdminOnly.php': `<?php

namespace App\\Http\\Middleware;

use Closure;
use Illuminate\\Http\\Request;
use Symfony\\Component\\HttpFoundation\\Response;

class AdminOnly
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()->peran !== 'admin') {
            abort(403, 'Hanya admin yang bisa mengakses halaman ini.');
        }

        return $next($request);
    }
}
`,
      'app/Http/Middleware/EnsureProfilLengkap.php': `<?php

namespace App\\Http\\Middleware;

use Closure;
use Illuminate\\Http\\Request;
use Symfony\\Component\\HttpFoundation\\Response;

class EnsureProfilLengkap
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() && blank($request->user()->telepon)) {
            return redirect()->route('profil.edit')
                ->with('info', 'Lengkapi nomor telepon Anda dulu.');
        }

        return $next($request);
    }
}
`,
      'app/Policies/ArtikelPolicy.php': `<?php

namespace App\\Policies;

use App\\Models\\Artikel;
use App\\Models\\User;

class ArtikelPolicy
{
    public function viewAny(?User $user): bool
    {
        return true;
    }

    public function view(?User $user, Artikel $artikel): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Artikel $artikel): bool
    {
        return $user->id === $artikel->penulis_id;
    }

    public function delete(User $user, Artikel $artikel): bool
    {
        return $user->id === $artikel->penulis_id || $user->peran === 'admin';
    }
}
`,
      'app/Http/Controllers/ArtikelController.php': `<?php

namespace App\\Http\\Controllers;

use App\\Models\\Artikel;
use Illuminate\\Http\\Request;

class ArtikelController extends Controller
{
    public function show(Artikel $artikel)
    {
        return view('artikel.show', compact('artikel'));
    }

    public function edit(Artikel $artikel)
    {
        $this->authorize('update', $artikel);

        return view('artikel.edit', compact('artikel'));
    }

    public function update(Request $request, Artikel $artikel)
    {
        $this->authorize('update', $artikel);

        $data = $request->validate([
            'judul' => ['required', 'string', 'max:200'],
            'isi' => ['required', 'string'],
            'terbit' => ['nullable', 'boolean'],
        ]);

        $artikel->update($data);

        return redirect('/artikel/'.$artikel->id);
    }
}
`,
      'app/Http/Controllers/ProfilController.php': `<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;

class ProfilController extends Controller
{
    public function edit()
    {
        return view('profil.edit', ['user' => auth()->user()]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'nama' => ['required', 'string', 'max:100'],
            'telepon' => ['required', 'string', 'max:20'],
        ]);

        auth()->user()->update($data);

        return back()->with('sukses', 'Profil diperbarui!');
    }
}
`,
      'routes/web.php': `<?php

use App\\Http\\Controllers\\ArtikelController;
use App\\Http\\Controllers\\ProfilController;
use App\\Models\\Artikel;
use Illuminate\\Support\\Facades\\Route;

Route::get('/', function () {
    return view('beranda');
});

Route::get('/artikel', function () {
    return view('artikel.index', ['artikels' => Artikel::with('penulis')->get()]);
})->middleware(['auth', 'profil-lengkap']);

Route::get('/artikel/{artikel}', [ArtikelController::class, 'show']);
Route::get('/artikel/{artikel}/edit', [ArtikelController::class, 'edit'])->middleware('auth');
Route::put('/artikel/{artikel}', [ArtikelController::class, 'update'])->middleware('auth');

Route::get('/profil/edit', [ProfilController::class, 'edit'])->middleware('auth')->name('profil.edit');
Route::put('/profil', [ProfilController::class, 'update'])->middleware('auth');

Route::get('/admin', function () {
    return view('admin.panel');
})->middleware(['auth', 'admin']);
`,
      'resources/views/beranda.blade.php': `@extends('layouts.app')

@section('judul', 'Beranda')

@section('konten')
    <h1>Tryngo Artikel</h1>
    <p><a href="{{ url('/artikel') }}">Lihat artikel</a></p>
    @auth
        <p>Masuk sebagai {{ auth()->user()->nama }} ({{ auth()->user()->peran }}).</p>
        @if (auth()->user()->peran === 'admin')
            <p><a href="{{ url('/admin') }}">Panel Admin</a></p>
        @endif
    @endauth
@endsection
`,
      'resources/views/artikel/index.blade.php': `@extends('layouts.app')

@section('judul', 'Artikel')

@section('konten')
    <h1>Semua Artikel</h1>
    @forelse ($artikels as $artikel)
        <article>
            <h3><a href="{{ url('/artikel/'.$artikel->id) }}">{{ $artikel->judul }}</a></h3>
            <p>Oleh {{ $artikel->penulis->nama }} - {{ $artikel->terbit ? 'Terbit' : 'Draft' }}</p>
            @can('update', $artikel)
                <a href="{{ url('/artikel/'.$artikel->id.'/edit') }}">Edit</a>
            @endcan
        </article>
    @empty
        <p>Belum ada artikel.</p>
    @endforelse
@endsection
`,
      'resources/views/artikel/show.blade.php': `@extends('layouts.app')

@section('judul', $artikel->judul)

@section('konten')
    <h1>{{ $artikel->judul }}</h1>
    <p>Oleh {{ $artikel->penulis->nama }}</p>
    <p>{{ $artikel->isi }}</p>
    @can('update', $artikel)
        <p><a href="{{ url('/artikel/'.$artikel->id.'/edit') }}">Edit artikel ini</a></p>
    @endcan
@endsection
`,
      'resources/views/artikel/edit.blade.php': `@extends('layouts.app')

@section('judul', 'Edit Artikel')

@section('konten')
    <h1>Edit: {{ $artikel->judul }}</h1>

    <form method="POST" action="{{ url('/artikel/'.$artikel->id) }}">
        @csrf
        @method('PUT')
        <div>
            <label>Judul</label>
            <input type="text" name="judul" value="{{ old('judul', $artikel->judul) }}" required>
            @error('judul') <small>{{ $message }}</small> @enderror
        </div>
        <div>
            <label>Isi</label>
            <textarea name="isi" required>{{ old('isi', $artikel->isi) }}</textarea>
        </div>
        <div>
            <label><input type="checkbox" name="terbit" value="1" @checked($artikel->terbit)> Terbitkan</label>
        </div>
        <button type="submit">Simpan</button>
    </form>
@endsection
`,
      'resources/views/profil/edit.blade.php': `@extends('layouts.app')

@section('judul', 'Edit Profil')

@section('konten')
    <h1>Edit Profil</h1>

    @if (session('info')) <p>{{ session('info') }}</p> @endif
    @if (session('sukses')) <p>{{ session('sukses') }}</p> @endif

    <form method="POST" action="{{ url('/profil') }}">
        @csrf
        @method('PUT')
        <div>
            <label>Nama</label>
            <input type="text" name="nama" value="{{ old('nama', $user->nama) }}" required>
        </div>
        <div>
            <label>Telepon</label>
            <input type="text" name="telepon" value="{{ old('telepon', $user->telepon) }}" required>
            @error('telepon') <small>{{ $message }}</small> @enderror
        </div>
        <button type="submit">Simpan</button>
    </form>
@endsection
`,
      'resources/views/admin/panel.blade.php': `@extends('layouts.app')

@section('judul', 'Panel Admin')

@section('konten')
    <h1>Panel Admin</h1>
    <p>Halaman ini hanya bisa dibuka oleh user dengan peran admin.</p>
@endsection
`,
      'composer.json': PKG('middleware-policies'),
      'package.json': PKG_NODE('laravel-lesson-middleware', DEV_SERVE),
      'README.md': `# Laravel Lesson 10 - Middleware & Policies

Jalankan: composer install && php artisan migrate && php artisan serve
Buat user admin via tinker:
  php artisan tinker
  App\\Models\\User::create(['nama' => 'Admin', 'email' => 'admin@tryngo.test', 'password' => bcrypt('rahasia123'), 'peran' => 'admin'])
Coba: /artikel (diblokir sampai telepon diisi), /admin (403 untuk non-admin)
`,
    },
    objId: [
      'Membuat middleware kustom dan mendaftarkan alias di bootstrap/app.php',
      'Memahami urutan middleware dan tanggung jawabnya (auth dulu, lalu bisnis)',
      'Menulis Policy per-model dan memanfaatkan auto-discovery',
      'Menegakkan otorisasi di controller ($this->authorize) dan blade (@can)',
    ],
    objEn: [
      'Create custom middleware and register aliases in bootstrap/app.php',
      'Understand middleware order and responsibility (auth first, then business)',
      'Write per-model Policies and leverage auto-discovery',
      'Enforce authorization in controllers ($this->authorize) and blade (@can)',
    ],
    expId: `## Middleware: Filter di Jalan Request
Middleware mengecek request SEBELUM controller dieksekusi. Alias didaftarkan di bootstrap/app.php: $middleware->alias([...]) - lalu dipakai seperti 'auth' bawaan: ->middleware('admin'). Urutan array penting: ['auth', 'admin'] - cek login dulu baru cek peran, supaya guest tidak dapat 403 melainkan dialihkan ke login.
## Middleware vs Controller
Middleware = keputusan yang SAMA untuk banyak route (harus login, harus admin, profil harus lengkap). Controller = logika khusus route itu. Kalau cek hanya dipakai satu route, middleware boleh ditaruh langsung di controller - kalau dipakai banyak, buat middleware.
## Policy: Aturan per Model
ArtikelPolicy mengatur otorisasi per MODEL: viewAny/view boleh semua (membaca), update hanya penulis, delete penulis atau admin. Laravel 11+ menemukan policy secara otomatis (penamaan ArtikelPolicy vs Artikel). Tidak ada peran hardcode di controller - semua keputusan di satu tempat.
## Dua Tempat Menegakkan
$this->authorize('update', $artikel) di controller: melempar 403 kalau gagal. @can('update', $artikel) di blade: menyembunyikan tombol. UI disembunyikan UNTUK KENYAMANAN, authorize di backend adalah KEAMANAN yang sesungguhnya - keduanya harus ada.`,
    expEn: `## Middleware: Filters on the Request's Path
Middleware checks a request BEFORE the controller runs. Aliases are registered in bootstrap/app.php: $middleware->alias([...]) - then used like the built-in 'auth': ->middleware('admin'). Array order matters: ['auth', 'admin'] - check login first, then role, so guests get redirected to login instead of a 403.
## Middleware vs Controller
Middleware = decisions IDENTICAL across many routes (must be logged in, must be admin, profile must be complete). Controller = route-specific logic. If a check is used by one route only it may live in the controller - if it is reused, make middleware.
## Policy: Per-Model Rules
ArtikelPolicy governs authorization per MODEL: viewAny/view allow everyone (reading), update only the author, delete the author or an admin. Laravel 11+ discovers policies automatically (ArtikelPolicy matching Artikel). No hardcoded roles in the controller - all decisions live in one place.
## Two Places to Enforce
$this->authorize('update', $artikel) in the controller: throws 403 on failure. @can('update', $artikel) in blade: hides the button. Hiding the UI is for CONVENIENCE, authorize in the backend is the actual SECURITY - you need both.`,
    chId: 'Kembangkan sistem otorisasi: (1) tambah middleware CachePublik (meng-set header Cache-Control public pada response) untuk route /artikel, (2) buat policy PostPolicy untuk model baru Post dengan aturan: hanya penulis yang bisa update, admin bisa hapus, semua bisa baca, (3) tambah aksi "Hapus" di artikel dengan tombol konfirmasi dan route DELETE yang memanggil $this->authorize(\'delete\', $artikel), (4) catat di README tabel 4 method policy + siapa yang boleh.',
    chEn: 'Extend the authorization system: (1) add a CachePublik middleware (sets a Cache-Control: public header on the response) for the /artikel route, (2) write a PostPolicy for a new Post model: only the author can update, admins can delete, everyone can read, (3) add a "Delete" action on articles with a confirm button and a DELETE route calling $this->authorize(\'delete\', $artikel), (4) document in the README a table of the 4 policy methods + who is allowed.',
    sumId: 'Middleware = filter per-request. Policy = aturan per-model. @can = UI, authorize = keamanan. Lanjut: mail & notifications.',
    sumEn: 'Middleware = per-request filters. Policies = per-model rules. @can = UI, authorize = security. Next: mail & notifications.',
  },
  {
    phase: 3, num: 11, topicId: 'mail-notifications',
    titleId: 'Mail & Notifications', titleEn: 'Mail & Notifications',
    codeFile: 'app/Notifications/ArtikelDiterbitkan.php',
    files: {
      ...SKELETON(),
      'config/mail.php': CONFIG_MAIL,
      'database/migrations/2026_07_01_000001_create_users_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
`,
      'database/migrations/2026_07_01_000002_create_artikels_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('artikels', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->text('isi');
            $table->foreignId('penulis_id')->constrained('users')->cascadeOnDelete();
            $table->boolean('terbit')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('artikels');
    }
};
`,
      'database/migrations/2026_07_01_000003_create_notifications_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('type');
            $table->morphs('notifiable');
            $table->text('data');
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
`,
      'app/Models/User.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Foundation\\Auth\\User as Authenticatable;
use Illuminate\\Notifications\\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = ['nama', 'email', 'password'];
}
`,
      'app/Models/Artikel.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class Artikel extends Model
{
    use HasFactory;

    protected $fillable = ['judul', 'isi', 'penulis_id', 'terbit'];

    protected $casts = ['terbit' => 'boolean'];

    public function penulis()
    {
        return $this->belongsTo(User::class, 'penulis_id');
    }
}
`,
      'app/Mail/ArtikelTerbitMailable.php': `<?php

namespace App\\Mail;

use App\\Models\\Artikel;
use Illuminate\\Bus\\Queueable;
use Illuminate\\Mail\\Mailable;
use Illuminate\\Mail\\Mailables\\Content;
use Illuminate\\Mail\\Mailables\\Envelope;
use Illuminate\\Queue\\SerializesModels;

class ArtikelTerbitMailable extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Artikel $artikel)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(subject: 'Artikel baru terbit: '.$this->artikel->judul);
    }

    public function content(): Content
    {
        return new Content(view: 'emails.artikel-terbit');
    }
}
`,
      'app/Notifications/ArtikelDiterbitkan.php': `<?php

namespace App\\Notifications;

use App\\Models\\Artikel;
use Illuminate\\Bus\\Queueable;
use Illuminate\\Notifications\\Messages\\MailMessage;
use Illuminate\\Notifications\\Notification;

class ArtikelDiterbitkan extends Notification
{
    use Queueable;

    public function __construct(public Artikel $artikel)
    {
    }

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->greeting('Halo '.$notifiable->nama.'!')
            ->line('Artikel baru sudah terbit: '.$this->artikel->judul)
            ->action('Baca Artikel', url('/artikel/'.$this->artikel->id))
            ->line('Terima kasih sudah belajar bersama Tryngo.');
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'artikel_id' => $this->artikel->id,
            'judul' => $this->artikel->judul,
        ];
    }
}
`,
      'app/Http/Controllers/ArtikelController.php': `<?php

namespace App\\Http\\Controllers;

use App\\Mail\\ArtikelTerbitMailable;
use App\\Models\\Artikel;
use App\\Notifications\\ArtikelDiterbitkan;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Mail;

class ArtikelController extends Controller
{
    public function show(Artikel $artikel)
    {
        return view('artikel.show', compact('artikel'));
    }

    public function terbitkan(Artikel $artikel)
    {
        abort_unless($artikel->penulis_id === auth()->id(), 403);

        $artikel->update(['terbit' => true]);

        Mail::to($artikel->penulis->email)->send(new ArtikelTerbitMailable($artikel));
        $artikel->penulis->notify(new ArtikelDiterbitkan($artikel));

        return back()->with('sukses', 'Artikel terbit! Email + notifikasi terkirim.');
    }
}
`,
      'routes/web.php': `<?php

use App\\Http\\Controllers\\ArtikelController;
use App\\Models\\Artikel;
use Illuminate\\Support\\Facades\\Route;

Route::get('/', function () {
    return view('beranda');
});

Route::get('/artikel', function () {
    return view('artikel.index', ['artikels' => Artikel::with('penulis')->get()]);
});

Route::get('/artikel/{artikel}', [ArtikelController::class, 'show']);
Route::post('/artikel/{artikel}/terbitkan', [ArtikelController::class, 'terbitkan'])->middleware('auth');

Route::get('/dashboard', function () {
    return view('dashboard', ['notifikasi' => auth()->user()->unreadNotifications]);
})->middleware('auth');
`,
      'resources/views/emails/artikel-terbit.blade.php': `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>{{ $artikel->judul }}</title>
</head>
<body>
    <h1>{{ $artikel->judul }}</h1>
    <p>Artikel Anda sudah terbit di Tryngo. Berikut kutipannya:</p>
    <blockquote>{{ Str::limit($artikel->isi, 200) }}</blockquote>
    <p><a href="{{ url('/artikel/'.$artikel->id) }}">Baca selengkapnya</a></p>
</body>
</html>
`,
      'resources/views/layouts/app.blade.php': `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('judul', 'Tryngo Laravel')</title>
</head>
<body>
    <nav>
        <a href="{{ url('/') }}">Tryngo</a>
        <a href="{{ url('/artikel') }}">Artikel</a>
        @auth
            <a href="{{ url('/dashboard') }}">Dashboard</a>
        @else
            <a href="{{ url('/masuk') }}">Masuk</a>
        @endauth
    </nav>
    <main>@yield('konten')</main>
</body>
</html>
`,
      'resources/views/beranda.blade.php': `@extends('layouts.app')

@section('judul', 'Beranda')

@section('konten')
    <h1>Tryngo Penerbit</h1>
    <p>Terbitkan artikel dan pantau notifikasi yang terkirim.</p>
@endsection
`,
      'resources/views/artikel/index.blade.php': `@extends('layouts.app')

@section('judul', 'Artikel')

@section('konten')
    <h1>Artikel</h1>
    @forelse ($artikels as $artikel)
        <article>
            <h3><a href="{{ url('/artikel/'.$artikel->id) }}">{{ $artikel->judul }}</a></h3>
            <p>Oleh {{ $artikel->penulis->nama }} - {{ $artikel->terbit ? 'Terbit' : 'Draft' }}</p>
            @auth
                @if ($artikel->penulis_id === auth()->id() && ! $artikel->terbit)
                    <form method="POST" action="{{ url('/artikel/'.$artikel->id.'/terbitkan') }}">
                        @csrf
                        <button type="submit">Terbitkan + Kirim Email</button>
                    </form>
                @endif
            @endauth
        </article>
    @empty
        <p>Belum ada artikel.</p>
    @endforelse
@endsection
`,
      'resources/views/artikel/show.blade.php': `@extends('layouts.app')

@section('judul', $artikel->judul)

@section('konten')
    <h1>{{ $artikel->judul }}</h1>
    <p>Oleh {{ $artikel->penulis->nama }}</p>
    <p>{{ $artikel->isi }}</p>
@endsection
`,
      'resources/views/dashboard.blade.php': `@extends('layouts.app')

@section('judul', 'Dashboard')

@section('konten')
    <h1>Dashboard</h1>

    @if (session('sukses')) <p>{{ session('sukses') }}</p> @endif

    <h2>Notifikasi Belum Dibaca ({{ $notifikasi->count() }})</h2>
    @forelse ($notifikasi as $n)
        <div>
            <strong>{{ $n->data['judul'] }}</strong>
            <form method="POST" action="{{ url('/notifikasi/'.$n->id.'/baca') }}">
                @csrf
                <button type="submit">Tandai dibaca</button>
            </form>
        </div>
    @empty
        <p>Kosong. Terbitkan artikel untuk melihat notifikasi masuk di sini.</p>
    @endforelse
@endsection
`,
      'composer.json': PKG('mail-notifications'),
      'package.json': PKG_NODE('laravel-lesson-mail', DEV_SERVE),
      'README.md': `# Laravel Lesson 11 - Mail & Notifications

Jalankan: composer install && php artisan migrate && php artisan serve
Coba:
  1. Buat user via tinker: App\\Models\\User::create(['nama' => 'Budi', 'email' => 'budi@tryngo.test', 'password' => bcrypt('rahasia123')])
  2. Masuk sebagai Budi di /masuk, buat artikel via tinker:
     App\\Models\\Artikel::create(['judul' => 'Belajar Laravel', 'isi' => 'Isi artikel...', 'penulis_id' => 1])
  3. Klik "Terbitkan + Kirim Email" di /artikel
  4. Cek email di storage/logs/laravel.log (MAIL_MAILER=log) + notifikasi di /dashboard
`,
    },
    objId: [
      'Mengirim email transaksional dengan Mailable (envelope, content, view)',
      'Membuat Notification multi-channel: mail + database sekaligus',
      'Menyimpan dan membaca notifikasi database (unreadNotifications)',
      'Menulis email template Blade dengan data model',
    ],
    objEn: [
      'Send transactional emails with a Mailable (envelope, content, view)',
      'Build a multi-channel Notification: mail + database at once',
      'Store and read database notifications (unreadNotifications)',
      'Write Blade email templates with model data',
    ],
    expId: `## Dua Jalur Mengirim
Mail::to()->send(new ArtikelTerbitMailable($artikel)) = email PRIBADI satu kali (invoice, welcome). ->notify(new ArtikelDiterbitkan($artikel)) = notifikasi yang bisa punya BANYAK channel sekaligus. via() memutuskan channel: ['mail', 'database'] = dikirim ke keduanya. Bedanya: notification punya keabadian (database), email tidak.
## Mailable: Surat dengan Kontrak
envelope() = metadata (subject). content() = view yang dipakai. PHP 8: parameter constructor public Artikel $artikel otomatis jadi properti - tersedia langsung di view email. MAIL_MAILER=log: email "dikirim" ke log file - sempurna untuk development tanpa SMTP.
## Notification Database: Riwayat yang Bisa Dibaca
Channel 'database' menyimpan baris di tabel notifications (dibuat dari migration morphs: bisa dipakai user/penjual/admin apa pun). unreadNotifications = relasi bawaan Notifiable trait. data[] = array JSON yang bisa ditampilkan apa adanya di UI.
## Pola Pikir: Satu Kejadian, Banyak Pengirim
Terbit artikel -> email ke penulis + notifikasi database -> nanti bisa ditambah channel lain (WhatsApp, Slack) cukup menambah method di kelas notification yang sama. Satu kejadian domain, nol perubahan di controller.`,
    expEn: `## Two Delivery Paths
Mail::to()->send(new ArtikelTerbitMailable($artikel)) = a PERSONAL one-off email (invoice, welcome). ->notify(new ArtikelDiterbitkan($artikel)) = a notification that can have MANY channels at once. via() decides the channels: ['mail', 'database'] = sent through both. The difference: notifications have persistence (database), emails do not.
## Mailable: A Letter with a Contract
envelope() = metadata (subject). content() = which view to render. PHP 8: the public Artikel $artikel constructor parameter becomes a property automatically - available directly in the email view. MAIL_MAILER=log: emails are "sent" to a log file - perfect for development without SMTP.
## Database Notifications: Readable History
The 'database' channel stores a row in the notifications table (built by the migration with morphs: usable for users/vendors/admins alike). unreadNotifications = a built-in relation from the Notifiable trait. data[] = a JSON array you can render as-is in the UI.
## Mindset: One Event, Many Senders
Article published -> email to the author + database notification -> later add other channels (WhatsApp, Slack) by just adding a method to the same notification class. One domain event, zero controller changes.`,
    chId: 'Bangun sistem notifikasi lengkap: (1) buat Mailable ArtikelDihapusMailable dan Notification ArtikelDihapus (mail+database) yang terkirim saat artikel dihapus, (2) tambah tombol "Tandai semua dibaca" (auth()->user()->unreadNotifications->markAsRead()), (3) tampilkan badge jumlah unread di navbar, (4) ganti MAIL_MAILER ke smtp dengan Mailtrap (gratis) dan isi MAIL_HOST/MAIL_USERNAME di .env - buktikan email benar-benar terkirim.',
    chEn: 'Build a complete notification system: (1) create an ArtikelDihapusMailable and an ArtikelDihapus Notification (mail+database) sent when an article is deleted, (2) add a "Mark all as read" button (auth()->user()->unreadNotifications->markAsRead()), (3) show an unread-count badge in the navbar, (4) switch MAIL_MAILER to smtp with Mailtrap (free) and fill MAIL_HOST/MAIL_USERNAME in .env - prove the email really sends.',
    sumId: 'Mailable = email personal. Notification = banyak channel. Database channel = riwayat. Lanjut: file storage & uploads.',
    sumEn: 'Mailables = personal emails. Notifications = many channels. Database channel = history. Next: file storage & uploads.',
  },
  {
    phase: 3, num: 12, topicId: 'file-storage',
    titleId: 'File Storage & Upload', titleEn: 'File Storage & Uploads',
    codeFile: 'app/Http/Controllers/ProfilController.php',
    files: {
      ...SKELETON(),
      'config/filesystems.php': CONFIG_FILESYSTEMS,
      'database/migrations/2026_07_01_000001_create_users_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('avatar')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
`,
      'app/Models/User.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Foundation\\Auth\\User as Authenticatable;
use Illuminate\\Notifications\\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = ['nama', 'email', 'password', 'avatar'];
}
`,
      'app/Http/Controllers/ProfilController.php': `<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Storage;

class ProfilController extends Controller
{
    public function edit()
    {
        $user = auth()->user();

        return view('profil.edit', [
            'user' => $user,
            'avatarUrl' => $user->avatar ? Storage::disk('public')->url($user->avatar) : null,
        ]);
    }

    public function update(Request $request)
    {
        $user = auth()->user();

        $data = $request->validate([
            'nama' => ['required', 'string', 'max:100'],
            'avatar' => ['nullable', 'image', 'mimes:jpeg,png,webp', 'max:2048'],
        ]);

        if ($request->hasFile('avatar')) {
            $data['avatar'] = $request->file('avatar')->store('avatar', 'public');
        }

        $user->update($data);

        return back()->with('sukses', 'Profil berhasil diperbarui.');
    }
}
`,
      'routes/web.php': `<?php

use App\\Http\\Controllers\\ProfilController;
use Illuminate\\Support\\Facades\\Route;

Route::get('/', function () {
    return view('beranda');
});

Route::get('/profil/edit', [ProfilController::class, 'edit'])->middleware('auth')->name('profil.edit');
Route::put('/profil', [ProfilController::class, 'update'])->middleware('auth');
`,
      'resources/views/layouts/app.blade.php': `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('judul', 'Tryngo Laravel')</title>
</head>
<body>
    <nav>
        <a href="{{ url('/') }}">Tryngo</a>
        @auth
            <a href="{{ route('profil.edit') }}">Edit Profil</a>
        @endauth
    </nav>
    <main>@yield('konten')</main>
</body>
</html>
`,
      'resources/views/beranda.blade.php': `@extends('layouts.app')

@section('judul', 'Beranda')

@section('konten')
    <h1>Tryngo Profil</h1>
    @auth
        <p>Masuk sebagai {{ auth()->user()->nama }}.</p>
        @if (auth()->user()->avatar)
            <img src="{{ Storage::disk('public')->url(auth()->user()->avatar) }}" alt="Avatar" width="96">
        @endif
    @endauth
@endsection
`,
      'resources/views/profil/edit.blade.php': `@extends('layouts.app')

@section('judul', 'Edit Profil')

@section('konten')
    <h1>Edit Profil</h1>

    @if (session('sukses')) <p>{{ session('sukses') }}</p> @endif

    @if ($avatarUrl)
        <img src="{{ $avatarUrl }}" alt="Avatar saat ini" width="128">
    @endif

    <form method="POST" action="{{ url('/profil') }}" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        <div>
            <label>Nama</label>
            <input type="text" name="nama" value="{{ old('nama', $user->nama) }}" required>
        </div>
        <div>
            <label>Foto Profil (maks 2 MB, jpeg/png/webp)</label>
            <input type="file" name="avatar">
            @error('avatar') <small>{{ $message }}</small> @enderror
        </div>
        <button type="submit">Simpan</button>
    </form>
@endsection
`,
      'storage/app/public/.gitkeep': '',
      'composer.json': PKG('file-storage'),
      'package.json': PKG_NODE('laravel-lesson-storage', DEV_SERVE),
      'README.md': `# Laravel Lesson 12 - File Storage & Uploads

Jalankan: composer install && php artisan migrate && php artisan serve
Lokal (di luar webcontainers): php artisan storage:link
Coba: buat user (tinker), masuk, upload avatar di /profil/edit.
File tersimpan di storage/app/public/avatar/ - tampil via Storage::url().
`,
    },
    objId: [
      'Mengunggah file dari form (enctype multipart, input file)',
      'Menyimpan file dengan $request->file()->store() ke disk public',
      'Memvalidasi upload (image, mimes, ukuran maksimum)',
      'Menampilkan file dengan Storage::url() dan memahami storage:link',
    ],
    objEn: [
      'Upload files from a form (enctype multipart, file input)',
      'Store files with $request->file()->store() on the public disk',
      'Validate uploads (image, mimes, max size)',
      'Serve files with Storage::url() and understand storage:link',
    ],
    expId: `## Form: Tiga Syarat Upload
enctype="multipart/form-data" (form), input type="file" (elemen), method POST/PUT. Tanpa enctype, browser mengirim nama file saja, bukan isi file. Validasi 'image' = cek MIME asli (bukan ekstensi), 'max:2048' = kilobita, 'mimes' = whitelist ekstensi.
## store(): Satu Baris untuk Simpan
$request->file('avatar')->store('avatar', 'public') = upload, beri nama unik, simpan di storage/app/public/avatar/. Dua argumen: folder tujuan + disk. hasFile() mengecek file benar-benar terkirim (jangan dipakai untuk validasi!).
## Disk & Public
Disk 'public' (storage/app/public) bisa diakses publik. storage:link membuat symlink public/storage -> storage/app/public. URL file: Storage::disk('public')->url($path) = /storage/avatar/abc.jpg. Di webcontainers symlink mungkin tidak jalan - cukup pahami alurnya untuk deployment sungguhan.
## Strategi Produksi
Lokal: disk public. Produksi: S3/Cloudflare R2 dengan driver s3 - kode SAMA, cukup ganti FILESYSTEM_DISK di .env. Inilah kekuatan abstraction: app tidak tahu di mana file disimpan.`,
    expEn: `## The Form: Three Upload Requirements
enctype="multipart/form-data" (form), input type="file" (element), method POST/PUT. Without enctype the browser sends only the file NAME, not its contents. The 'image' rule checks the real MIME (not the extension), 'max:2048' means kilobytes, 'mimes' is an extension whitelist.
## store(): One Line to Save
$request->file('avatar')->store('avatar', 'public') = upload, assign a unique name, save under storage/app/public/avatar/. Two arguments: target folder + disk. hasFile() checks a file was actually sent (not for validation!).
## Disks & Public
The 'public' disk (storage/app/public) is publicly accessible. storage:link creates the symlink public/storage -> storage/app/public. File URL: Storage::disk('public')->url($path) = /storage/avatar/abc.jpg. Symlinks may not work in webcontainers - just understand the flow for real deployments.
## Production Strategy
Local: the public disk. Production: S3/Cloudflare R2 with the s3 driver - the SAME code, just change FILESYSTEM_DISK in .env. This is the power of abstraction: the app never knows where files live.`,
    chId: `Bangun galeri foto: (1) buat model + migration Foto (judul, path, user_id FK) dan halaman /galeri yang menampilkan semua foto, (2) form upload galeri: validator harus menerima max:5 file sekaligus (name="fotos[]", validasi 'array' + tiap item image), (3) tampilkan tombol hapus per foto yang menghapus file dari disk dan baris dari database (Storage::delete), (4) tambah validasi dimensi (dimensions:min_width=200) untuk anti gambar terlalu kecil.`,
    chEn: `Build a photo gallery: (1) create a Foto model + migration (judul, path, user_id FK) and a /galeri page showing all photos, (2) a gallery upload form: the validator must accept up to 5 files at once (name="fotos[]", validate as 'array' with each item image), (3) add a per-photo delete button that removes the file from disk AND the row from the database (Storage::delete), (4) add a dimensions rule (dimensions:min_width=200) to reject tiny images.`,
    sumId: 'Upload = multipart + validasi + store(). Disk public = file terpublikasi. S3 = disk yang sama. Lanjut: Sanctum API tokens.',
    sumEn: 'Uploads = multipart + validation + store(). Public disk = published files. S3 = the same disk. Next: Sanctum API tokens.',
  },
];

const LESSONS_P4 = [
  {
    phase: 4, num: 13, topicId: 'sanctum-apis',
    titleId: 'API Token dengan Sanctum', titleEn: 'Sanctum API Tokens',
    codeFile: 'routes/api.php',
    files: {
      ...SKELETON(true, `$middleware->statefulApi();`),
      'config/sanctum.php': CONFIG_SANCTUM,
      'database/migrations/2026_07_01_000001_create_users_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
`,
      'database/migrations/2026_07_01_000002_create_produks_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('produks', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 200);
            $table->decimal('harga', 10, 2);
            $table->unsignedInteger('stok')->default(0);
            $table->boolean('tersedia')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('produks');
    }
};
`,
      'app/Models/User.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Foundation\\Auth\\User as Authenticatable;
use Illuminate\\Notifications\\Notifiable;
use Laravel\\Sanctum\\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = ['nama', 'email', 'password'];
}
`,
      'app/Models/Produk.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class Produk extends Model
{
    use HasFactory;

    protected $fillable = ['nama', 'harga', 'stok', 'tersedia'];
}
`,
      'app/Http/Controllers/Api/AuthController.php': `<?php

namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use App\\Models\\User;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Hash;

class AuthController extends Controller
{
    public function registrasi(Request $request)
    {
        $data = $request->validate([
            'nama' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $user = User::create([
            'nama' => $data['nama'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        return response()->json([
            'user' => $user,
            'token' => $user->createToken('aplikasi-web')->plainTextToken,
        ], 201);
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $data['email'])->first();

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            return response()->json(['pesan' => 'Kredensial salah.'], 401);
        }

        return response()->json([
            'user' => $user,
            'token' => $user->createToken('aplikasi-web')->plainTextToken,
        ]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['pesan' => 'Logout berhasil.']);
    }
}
`,
      'app/Http/Controllers/Api/ProdukController.php': `<?php

namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Produk;
use Illuminate\\Http\\Request;

class ProdukController extends Controller
{
    public function index()
    {
        return response()->json(Produk::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nama' => ['required', 'string', 'max:200'],
            'harga' => ['required', 'numeric', 'min:0'],
            'stok' => ['required', 'integer', 'min:0'],
        ]);

        $produk = Produk::create($data);

        return response()->json($produk, 201);
    }
}
`,
      'routes/api.php': `<?php

use App\\Http\\Controllers\\Api\\AuthController;
use App\\Http\\Controllers\\Api\\ProdukController;
use Illuminate\\Support\\Facades\\Route;

Route::post('/registrasi', [AuthController::class, 'registrasi']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/produk', [ProdukController::class, 'index']);
    Route::post('/produk', [ProdukController::class, 'store']);
});
`,
      'composer.json': PKG('sanctum-apis', `"laravel/sanctum": "^4.0"`),
      'package.json': PKG_NODE('laravel-lesson-sanctum', DEV_SERVE),
      'README.md': `# Laravel Lesson 13 - Sanctum API Tokens

Jalankan: composer install && php artisan migrate && php artisan serve

Registrasi (simpan token dari response):
  curl -X POST http://localhost:8000/api/registrasi -H "Accept: application/json" -H "Content-Type: application/json" -d '{"nama":"Budi","email":"budi@tryngo.test","password":"rahasia123"}'

Login:
  curl -X POST http://localhost:8000/api/login -H "Accept: application/json" -H "Content-Type: application/json" -d '{"email":"budi@tryngo.test","password":"rahasia123"}'

Pakai token:
  curl http://localhost:8000/api/user -H "Accept: application/json" -H "Authorization: Bearer TOKEN_ANDA"

Tanpa token -> 401:
  curl http://localhost:8000/api/user -H "Accept: application/json"
`,
    },
    objId: [
      'Membuat token API dengan Sanctum (createToken, plainTextToken)',
      'Melindungi endpoint dengan middleware auth:sanctum',
      'Mengirim kredensial lewat header Authorization: Bearer',
      'Menghapus token (logout stateless) dan memahami siklus hidup token',
    ],
    objEn: [
      'Create API tokens with Sanctum (createToken, plainTextToken)',
      'Protect endpoints with the auth:sanctum middleware',
      'Send credentials via the Authorization: Bearer header',
      'Revoke tokens (stateless logout) and understand token lifecycle',
    ],
    expId: `## Token vs Session
Web biasa pakai cookie session: identitas disimpan server. API/SPA/mobile butuh cara stateless: klien menyimpan TOKEN dan mengirimnya di setiap request. Sanctum menambah 2 hal: tabel personal_access_tokens (migration otomatis) dan trait HasApiTokens di model User.
## createToken & plainTextToken
$user->createToken('aplikasi-web') membuat baris token (ada di database). plainTextToken = string acak yang DITAMPILKAN SEKALI SAJA ke klien - yang tersimpan di DB hanyalah hash-nya. Kalau hilang, token tidak bisa diambil lagi: buat baru. Nama token = untuk manusia (bisa dilihat user saat kelola perangkat).
## auth:sanctum: Pagar Token
Route::middleware('auth:sanctum') memvalidasi header Authorization: Bearer <token> di setiap request. Tidak ada session, tidak ada cookie - identitas ditentukan murni dari token. $request->user() tetap berfungsi, sekarang dari token.
## Siklus Hidup Token
currentAccessToken()->delete() = logout di satu perangkat tanpa mempengaruhi perangkat lain (bandingkan dengan session yang logout semua). User bisa punya banyak token sekaligus - $user->tokens untuk menampilkan daftarnya.`,
    expEn: `## Token vs Session
Regular web uses session cookies: identity lives on the server. APIs/SPAs/mobile need a stateless approach: the client holds a TOKEN and sends it on every request. Sanctum adds two things: the personal_access_tokens table (automatic migration) and the HasApiTokens trait on the User model.
## createToken & plainTextToken
$user->createToken('aplikasi-web') creates a token row (in the database). plainTextToken = a random string shown ONCE to the client - the DB only stores its hash. If you lose it, you cannot retrieve it: create a new one. The token name is for humans (visible when users manage devices).
## auth:sanctum: The Token Gate
Route::middleware('auth:sanctum') validates the Authorization: Bearer <token> header on every request. No session, no cookie - identity is determined purely by the token. $request->user() still works, now from the token.
## Token Lifecycle
currentAccessToken()->delete() = logout on one device without affecting others (unlike a session which logs out everything). A user can hold many tokens at once - $user->tokens lists them.`,
    chId: `Perkuat keamanan token: (1) beri abilities pada token: createToken('aplikasi', ['baca', 'tulis']) dan cek dengan $request->user()->tokenCan('tulis') di store produk (endpoint baca tanpa ability tulis harus 403), (2) tambah endpoint GET /api/token (daftar semua token user dengan last_used_at) dan DELETE /api/token/{id}, (3) atur masa berlaku: set 'expiration' => 60 di config/sanctum.php dan pindahkan masa aktif dari DB dengan php artisan sanctum:prune-expired, (4) tulis README tentang skenario token bocor: revoke dan buat ulang.`,
    chEn: 'Harden token security: (1) give tokens abilities: createToken(\'app\', [\'read\', \'write\']) and check with $request->user()->tokenCan(\'write\') in the product store (read endpoints without the write ability must 403), (2) add GET /api/token (list all user tokens with last_used_at) and DELETE /api/token/{id}, (3) set expiry: put \'expiration\' => 60 in config/sanctum.php and prune expired tokens from the DB with php artisan sanctum:prune-expired, (4) document in the README the leaked-token scenario: revoke and recreate.',
    sumId: 'Token = identitas stateless. Bearer header = pengirimannya. Revoke = kontrol per perangkat. Lanjut: API resources.',
    sumEn: 'Tokens = stateless identity. Bearer header = the delivery. Revoke = per-device control. Next: API resources.',
  },
  {
    phase: 4, num: 14, topicId: 'api-resources',
    titleId: 'API Resources & Filtering', titleEn: 'API Resources & Filtering',
    codeFile: 'app/Http/Resources/ProdukResource.php',
    files: {
      ...SKELETON(true),
      'config/sanctum.php': CONFIG_SANCTUM,
      'database/migrations/2026_07_01_000001_create_users_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
`,
      'database/migrations/2026_07_01_000002_create_kategoris_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kategoris', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 100);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kategoris');
    }
};
`,
      'database/migrations/2026_07_01_000003_create_produks_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('produks', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 200);
            $table->decimal('harga', 10, 2);
            $table->unsignedInteger('stok')->default(0);
            $table->boolean('tersedia')->default(true);
            $table->foreignId('kategori_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('produks');
    }
};
`,
      'database/seeders/DatabaseSeeder.php': `<?php

namespace Database\\Seeders;

use App\\Models\\Kategori;
use App\\Models\\Produk;
use Illuminate\\Database\\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $minuman = Kategori::create(['nama' => 'Minuman']);
        $makanan = Kategori::create(['nama' => 'Makanan']);

        Produk::create(['nama' => 'Kopi Gayo', 'harga' => 25000, 'stok' => 12, 'tersedia' => true, 'kategori_id' => $minuman->id]);
        Produk::create(['nama' => 'Teh Melati', 'harga' => 12000, 'stok' => 0, 'tersedia' => false, 'kategori_id' => $minuman->id]);
        Produk::create(['nama' => 'Keripik Singkong', 'harga' => 15000, 'stok' => 30, 'tersedia' => true, 'kategori_id' => $makanan->id]);
        Produk::create(['nama' => 'Bakpia Jogja', 'harga' => 45000, 'stok' => 8, 'tersedia' => true, 'kategori_id' => $makanan->id]);
    }
}
`,
      'app/Models/Kategori.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class Kategori extends Model
{
    use HasFactory;

    protected $fillable = ['nama'];
}
`,
      'app/Models/Produk.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class Produk extends Model
{
    use HasFactory;

    protected $fillable = ['nama', 'harga', 'stok', 'tersedia', 'kategori_id'];

    protected $casts = [
        'tersedia' => 'boolean',
        'harga' => 'decimal:2',
    ];

    public function kategori()
    {
        return $this->belongsTo(Kategori::class);
    }
}
`,
      'app/Models/User.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Foundation\\Auth\\User as Authenticatable;
use Illuminate\\Notifications\\Notifiable;
use Laravel\\Sanctum\\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = ['nama', 'email', 'password'];
}
`,
      'app/Http/Resources/ProdukResource.php': `<?php

namespace App\\Http\\Resources;

use Illuminate\\Http\\Request;
use Illuminate\\Http\\Resources\\Json\\JsonResource;

class ProdukResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama' => $this->nama,
            'harga' => (int) $this->harga,
            'stok' => $this->stok,
            'tersedia' => $this->tersedia,
            'kategori' => $this->whenLoaded('kategori', fn () => $this->kategori->nama),
            'dibuat' => $this->created_at?->toDateTimeString(),
        ];
    }
}
`,
      'app/Http/Controllers/Api/AuthController.php': `<?php

namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use App\\Models\\User;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $data['email'])->first();

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            return response()->json(['pesan' => 'Kredensial salah.'], 401);
        }

        return response()->json([
            'user' => $user,
            'token' => $user->createToken('etalase')->plainTextToken,
        ]);
    }
}
`,
      'app/Http/Controllers/Api/ProdukController.php': `<?php

namespace App\\Http\\Controllers\\Api;

use App\\Http\\Resources\\ProdukResource;
use App\\Models\\Produk;
use Illuminate\\Http\\Request;

class ProdukController extends Controller
{
    public function index(Request $request)
    {
        $query = Produk::with('kategori');

        if ($request->filled('kategori')) {
            $query->whereHas('kategori', fn ($q) => $q->where('nama', $request->kategori));
        }

        if ($request->filled('cari')) {
            $query->where('nama', 'like', '%'.$request->cari.'%');
        }

        $query->where('tersedia', true);

        $query->orderBy($request->input('urut', 'nama'), $request->input('arah', 'asc'));

        return ProdukResource::collection($query->paginate(10));
    }

    public function show(Produk $produk)
    {
        return new ProdukResource($produk->load('kategori'));
    }
}
`,
      'routes/api.php': `<?php

use App\\Http\\Controllers\\Api\\AuthController;
use App\\Http\\Controllers\\Api\\ProdukController;
use Illuminate\\Support\\Facades\\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::get('/produk', [ProdukController::class, 'index']);
Route::get('/produk/{produk}', [ProdukController::class, 'show']);
`,
      'composer.json': PKG('api-resources', `"laravel/sanctum": "^4.0"`),
      'package.json': PKG_NODE('laravel-lesson-resources', DEV_SERVE),
      'README.md': `# Laravel Lesson 14 - API Resources & Filtering

Jalankan: composer install && php artisan migrate --seed && php artisan serve

Coba (gunakan curl):
  curl "http://localhost:8000/api/produk" -H "Accept: application/json"
  curl "http://localhost:8000/api/produk?kategori=Minuman" -H "Accept: application/json"
  curl "http://localhost:8000/api/produk?cari=kopi&urut=harga&arah=desc" -H "Accept: application/json"
  curl "http://localhost:8000/api/produk?page=2" -H "Accept: application/json"

Perhatikan bentuk response: data + links + meta (pagination).
`,
    },
    objId: [
      'Membentuk respons JSON dengan API Resource (JsonResource)',
      'Menggunakan whenLoaded untuk relasi tanpa N+1',
      'Menambahkan filter, pencarian, dan sorting lewat query parameter',
      'Membaca struktur pagination Laravel (data, links, meta)',
    ],
    objEn: [
      'Shape JSON responses with an API Resource (JsonResource)',
      'Use whenLoaded for relations without N+1',
      'Add filtering, search, and sorting via query parameters',
      'Read Laravel pagination structure (data, links, meta)',
    ],
    expId: `## Resource: Kontrak API
ProdukResource menentukan BENTUK JSON. Model punya kolom lain (created_at dll) - API menentukan yang mana yang boleh keluar dan bagaimana penamaannya ('dibuat' bukan 'created_at'). Ubah struktur DB tanpa memecah klien API: cukup edit resource. Resource = antarmuka stabil ke dunia luar.
## whenLoaded: N+1 yang Benar
$this->whenLoaded('kategori') hanya menyertakan relasi jika SUDAH di-load. Controller memakai Produk::with('kategori') - satu query join, bukan satu query per baris. Tanpa keduanya: 1 + N query. Dengan keduanya: 2 query. Ketidakcocokan (with tanpa whenLoaded = data kelebihan; whenLoaded tanpa with = field hilang).
## Filter, Cari, Urut
Semua lewat query parameter: kategori (relasi dengan whereHas), cari (LIKE), urut/arah (orderBy). $request->filled() membedakan 'tidak dikirim' dan 'kosong'. Berhati-hatilah: orderBy menerima input USER - dalam produksi batasi whitelist kolom yang boleh diurutkan.
## Pagination: Bagian dari Kontrak
paginate(10) menghasilkan data + links + meta - klien tahu total, halaman, dan URL halaman berikutnya. Halaman berikutnya = ?page=2. Konsumen API (aplikasi mobile) tidak perlu tahu cara kerja internal - cukup ikuti links.`,
    expEn: `## Resource: The API Contract
ProdukResource defines the JSON SHAPE. Models have other columns (created_at etc.) - the API decides which ones leave and how they are named ('dibuat' not 'created_at'). Change the DB structure without breaking API clients: just edit the resource. A resource = the stable interface to the outside world.
## whenLoaded: Correct N+1
$this->whenLoaded('kategori') includes the relation only if it is ALREADY loaded. The controller uses Produk::with('kategori') - one join query, not one query per row. Without both: 1 + N queries. With both: 2 queries. Mismatches (with without whenLoaded = bloated data; whenLoaded without with = missing field).
## Filter, Search, Sort
All via query parameters: kategori (relation with whereHas), cari (LIKE), urut/arah (orderBy). $request->filled() distinguishes 'not sent' from 'empty'. Be careful: orderBy accepts USER input - in production, whitelist the sortable columns.
## Pagination: Part of the Contract
paginate(10) yields data + links + meta - clients know the total, the page, and the next-page URL. The next page = ?page=2. API consumers (mobile apps) do not need to know internals - just follow the links.`,
    chId: 'Tingkatkan API: (1) tambah whitelist sorting (hanya nama/harga/stok/created_at) dengan in_array, kalau bukan -> 422, (2) buat endpoint /api/kategori (KategoriResource: id, nama, jumlah_produk dari withCount) + filter ?kategori_id di /api/produk, (3) tambah ProdukLiteResource (tanpa relasi) untuk daftar dan ProdukResource penuh untuk detail - bentuk berbeda, satu sumber data, (4) tulis README berisi contoh response JSON sebelum dan sesudah resource dipakai.',
    chEn: 'Level up the API: (1) add a sort whitelist (only nama/harga/stok/created_at) with in_array, otherwise -> 422, (2) create a /api/kategori endpoint (KategoriResource: id, nama, jumlah_produk from withCount) plus a ?kategori_id filter on /api/produk, (3) add a ProdukLiteResource (no relations) for lists and the full ProdukResource for details - different shapes, one data source, (4) write a README with example JSON responses before and after using resources.',
    sumId: 'Resource = kontrak API. whenLoaded = relasi tepat. Pagination = bagian kontrak. Lanjut: queues & jobs.',
    sumEn: 'Resources = the API contract. whenLoaded = precise relations. Pagination = part of the contract. Next: queues & jobs.',
  },
  {
    phase: 4, num: 15, topicId: 'queues-jobs',
    titleId: 'Queues & Jobs', titleEn: 'Queues & Jobs',
    codeFile: 'app/Jobs/KirimEmailPesananJob.php',
    files: {
      ...SKELETON(),
      'database/migrations/2026_07_01_000001_create_pesanans_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pesanans', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('email');
            $table->string('produk');
            $table->unsignedInteger('jumlah');
            $table->string('status', 20)->default('antri');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pesanans');
    }
};
`,
      'database/migrations/2026_07_01_000002_create_jobs_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('queue')->index();
            $table->longText('payload');
            $table->unsignedTinyInteger('attempts');
            $table->unsignedInteger('reserved_at')->nullable();
            $table->unsignedInteger('available_at');
            $table->unsignedInteger('created_at');
        });

        Schema::create('failed_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('uuid')->unique();
            $table->text('connection');
            $table->text('queue');
            $table->longText('payload');
            $table->longText('exception');
            $table->timestamp('failed_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('failed_jobs');
        Schema::dropIfExists('jobs');
    }
};
`,
      'app/Models/Pesanan.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class Pesanan extends Model
{
    use HasFactory;

    protected $fillable = ['nama', 'email', 'produk', 'jumlah', 'status'];
}
`,
      'app/Jobs/KirimEmailPesananJob.php': `<?php

namespace App\\Jobs;

use App\\Models\\Pesanan;
use Illuminate\\Contracts\\Queue\\ShouldQueue;
use Illuminate\\Foundation\\Queue\\Queueable;

class KirimEmailPesananJob implements ShouldQueue
{
    use Queueable;

    public $tries = 3;

    public $backoff = 5;

    public function __construct(public Pesanan $pesanan)
    {
    }

    public function handle(): void
    {
        sleep(2);

        logger('Email konfirmasi dikirim ke '.$this->pesanan->email.' untuk '.$this->pesanan->produk);

        $this->pesanan->update(['status' => 'terkirim']);
    }
}
`,
      'app/Http/Controllers/PesananController.php': `<?php

namespace App\\Http\\Controllers;

use App\\Jobs\\KirimEmailPesananJob;
use App\\Models\\Pesanan;
use Illuminate\\Http\\Request;

class PesananController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'nama' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email'],
            'produk' => ['required', 'string', 'max:200'],
            'jumlah' => ['required', 'integer', 'min:1'],
        ]);

        $pesanan = Pesanan::create($data + ['status' => 'antri']);

        KirimEmailPesananJob::dispatch($pesanan);

        return view('pesanan.sukses', ['pesanan' => $pesanan]);
    }
}
`,
      'routes/web.php': `<?php

use App\\Http\\Controllers\\PesananController;
use Illuminate\\Support\\Facades\\Route;

Route::get('/', function () {
    return view('beranda');
});

Route::get('/pesanan', function () {
    return view('pesanan.form');
});

Route::post('/pesanan', [PesananController::class, 'store']);
`,
      'resources/views/layouts/app.blade.php': `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('judul', 'Tryngo Laravel')</title>
</head>
<body>
    <nav><a href="{{ url('/') }}">Tryngo</a> <a href="{{ url('/pesanan') }}">Buat Pesanan</a></nav>
    <main>@yield('konten')</main>
</body>
</html>
`,
      'resources/views/beranda.blade.php': `@extends('layouts.app')

@section('judul', 'Beranda')

@section('konten')
    <h1>Tryngo Marketplace</h1>
    <p>Kirim pesanan - email konfirmasi diproses sebagai <strong>job di queue</strong>, bukan di dalam request.</p>
@endsection
`,
      'resources/views/pesanan/form.blade.php': `@extends('layouts.app')

@section('judul', 'Buat Pesanan')

@section('konten')
    <h1>Buat Pesanan</h1>

    <form method="POST" action="{{ url('/pesanan') }}">
        @csrf
        <div>
            <label>Nama</label>
            <input type="text" name="nama" required>
            @error('nama') <small>{{ $message }}</small> @enderror
        </div>
        <div>
            <label>Email</label>
            <input type="email" name="email" required>
            @error('email') <small>{{ $message }}</small> @enderror
        </div>
        <div>
            <label>Produk</label>
            <input type="text" name="produk" required>
        </div>
        <div>
            <label>Jumlah</label>
            <input type="number" name="jumlah" min="1" required>
        </div>
        <button type="submit">Kirim Pesanan</button>
    </form>
@endsection
`,
      'resources/views/pesanan/sukses.blade.php': `@extends('layouts.app')

@section('judul', 'Pesanan Diterima')

@section('konten')
    <h1>Pesanan #{{ $pesanan->id }} diterima!</h1>
    <p>{{ $pesanan->nama }}, pesanan {{ $pesanan->produk }} x{{ $pesanan->jumlah }} sedang diproses.</p>
    <p>Status saat ini: <strong>{{ $pesanan->status }}</strong></p>
    <p>Cek <code>storage/logs/laravel.log</code> untuk bukti job dieksekusi.</p>
@endsection
`,
      'composer.json': PKG('queues-jobs'),
      'package.json': PKG_NODE('laravel-lesson-queues', DEV_SERVE),
      'README.md': `# Laravel Lesson 15 - Queues & Jobs

Jalankan: composer install && php artisan migrate && php artisan serve
Buat pesanan di /pesanan.

Sekarang job jalan INLINE (QUEUE_CONNECTION=sync di .env): hasilnya sama, tapi
request menunggu job selesai (sleep 2 detik terasa).

Simulasi worker sungguhan (lokal, luar webcontainers):
  1. Edit .env: QUEUE_CONNECTION=database
  2. php artisan queue:table && php artisan migrate
  3. Buka terminal kedua: php artisan queue:work
  4. Kirim pesanan lagi - response langsung, job diproses oleh worker.
     Pantau status pesanan berubah 'antri' -> 'terkirim'.
`,
    },
    objId: [
      'Memindahkan kerja berat keluar dari request dengan Jobs (ShouldQueue)',
      'Memahami queue: sync vs database + worker (queue:work)',
      'Mengatur percobaan ulang: $tries dan $backoff',
      'Menangani kegagalan: tabel failed_jobs dan queue:retry',
    ],
    objEn: [
      'Move heavy work out of the request with Jobs (ShouldQueue)',
      'Understand queues: sync vs database + the worker (queue:work)',
      'Configure retries: $tries and $backoff',
      'Handle failures: the failed_jobs table and queue:retry',
    ],
    expId: `## Kenapa Queue?
Request HTTP punya batas waktu; klien menunggu response. Email/SMS/PDF/resize gambar = lambat. Queue memisahkan: request menyimpan PESANAN (cepat), pekerjaan lain (kirim email) dijalankan LATER oleh worker. User tidak menunggu hal yang tidak penting.
## Sync vs Queue Sungguhan
QUEUE_CONNECTION=sync: job jalan langsung di request (untuk development/test - sederhana tapi tetap memakai kode yang sama). database: job masuk tabel jobs, worker (php artisan queue:work) mengambil dan menjalankannya. Kode app TIDAK berubah - hanya konfigurasi.
## ShouldQueue & handle()
class ... implements ShouldQueue = tanda "kerjakan nanti". handle() berisi kerja sebenarnya. dispatch() = masukkan ke queue. Constructor berisi data job (serializable) - jangan masukkan resource/connection. public $tries = 3: kalau handle() melempar exception, coba ulang sampai 3x dengan jeda backoff.
## Kegagalan: Bukannya Hilang
Setelah percobaan habis, job pindah ke failed_jobs dengan exception lengkap. queue:failed (daftar), queue:retry (jalankan ulang), queue:forget (hapus satu), queue:flush (bersihkan). Kegagalan = data, bukan kejadian yang hilang.`,
    expEn: `## Why Queues?
HTTP requests have timeouts; clients wait for responses. Email/SMS/PDF/image resizing = slow. Queues separate concerns: the request stores the ORDER (fast), other work (send email) runs LATER on a worker. Users do not wait for non-essential things.
## Sync vs Real Queues
QUEUE_CONNECTION=sync: jobs run inline in the request (for development/tests - simple but the same code path). database: jobs land in the jobs table, a worker (php artisan queue:work) picks and runs them. The app code does NOT change - only the configuration.
## ShouldQueue & handle()
class ... implements ShouldQueue = the "run later" flag. handle() holds the actual work. dispatch() enqueues it. The constructor holds the job data (must be serializable) - never pass resources/connections. public $tries = 3: if handle() throws, retry up to 3 times with a backoff gap.
## Failure: Not a Vanishing Act
After retries are exhausted the job moves to failed_jobs with the full exception. queue:failed (list), queue:retry (re-run), queue:forget (drop one), queue:flush (clean all). Failures = data, not lost events.`,
    chId: 'Latih queue dengan skenario nyata: (1) ubah job agar menghitung $this->attempt() dan log "Percobaan ke-N" - lalu tambah exception acak (if ($this->attempt() < 3) throw) dan amati retry + failed_jobs, (2) tunda pengiriman: KirimEmailPesananJob::dispatch($pesanan)->delay(now()->addSeconds(30)) dan buktikan lewat timestamp di log, (3) buat job kedua KirimWhatsappJob dan jalankan berantai dengan Bus::chain([...])->dispatch(), (4) pasang failed job handler di README: queue:retry all lalu jelaskan skenario pembayaran yang butuh idempotency.',
    chEn: 'Practice queues with real scenarios: (1) make the job count $this->attempt() and log "Attempt N" - then add a random exception (if ($this->attempt() < 3) throw) and watch retries + failed_jobs, (2) delay delivery: KirimEmailPesananJob::dispatch($pesanan)->delay(now()->addSeconds(30)) and prove it via log timestamps, (3) create a second KirimWhatsappJob and run them in sequence with Bus::chain([...])->dispatch(), (4) document a failed-job runbook in the README: queue:retry all and explain the payment scenario that needs idempotency.',
    sumId: 'Queue = request cepat, kerja ditunda. Worker = pengeksekusi. failed_jobs = jaring pengaman. Lanjut: broadcasting & WebSockets.',
    sumEn: 'Queues = fast requests, deferred work. Workers = the executors. failed_jobs = the safety net. Next: broadcasting & WebSockets.',
  },
  {
    phase: 4, num: 16, topicId: 'broadcasting-websockets',
    titleId: 'Broadcasting & WebSockets', titleEn: 'Broadcasting & WebSockets',
    codeFile: 'app/Events/PesananBaru.php',
    files: {
      ...SKELETON(true),
      '.env': ENV(`\nBROADCAST_CONNECTION=log\nREVERB_APP_ID=tryngo-01\nREVERB_APP_KEY=key-tryngo\nREVERB_APP_SECRET=secret-tryngo\n`),
      'config/broadcasting.php': CONFIG_BROADCAST,
      'config/reverb.php': CONFIG_REVERB,
      'config/sanctum.php': CONFIG_SANCTUM,
      'database/migrations/2026_07_01_000001_create_pesanans_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pesanans', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('produk');
            $table->unsignedInteger('jumlah');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pesanans');
    }
};
`,
      'app/Models/Pesanan.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class Pesanan extends Model
{
    use HasFactory;

    protected $fillable = ['nama', 'produk', 'jumlah'];
}
`,
      'app/Events/PesananBaru.php': `<?php

namespace App\\Events;

use App\\Models\\Pesanan;
use Illuminate\\Broadcasting\\Channel;
use Illuminate\\Broadcasting\\InteractsWithSockets;
use Illuminate\\Contracts\\Broadcasting\\ShouldBroadcast;
use Illuminate\\Foundation\\Events\\Dispatchable;
use Illuminate\\Queue\\SerializesModels;

class PesananBaru implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Pesanan $pesanan)
    {
    }

    public function broadcastOn(): array
    {
        return [new Channel('pesanan')];
    }

    public function broadcastAs(): string
    {
        return 'pesanan.baru';
    }
}
`,
      'app/Http/Controllers/PesananController.php': `<?php

namespace App\\Http\\Controllers;

use App\\Events\\PesananBaru;
use App\\Models\\Pesanan;
use Illuminate\\Http\\Request;

class PesananController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'nama' => ['required', 'string', 'max:100'],
            'produk' => ['required', 'string', 'max:200'],
            'jumlah' => ['required', 'integer', 'min:1'],
        ]);

        $pesanan = Pesanan::create($data);

        PesananBaru::dispatch($pesanan);

        return redirect('/pesanan/panel');
    }
}
`,
      'routes/web.php': `<?php

use App\\Http\\Controllers\\PesananController;
use Illuminate\\Support\\Facades\\Route;

Route::get('/', function () {
    return view('beranda');
});

Route::get('/pesanan', function () {
    return view('pesanan.form');
});

Route::post('/pesanan', [PesananController::class, 'store']);

Route::get('/pesanan/panel', function () {
    return view('pesanan.panel');
});
`,
      'resources/views/layouts/app.blade.php': `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('judul', 'Tryngo Laravel')</title>
</head>
<body>
    <nav>
        <a href="{{ url('/') }}">Tryngo</a>
        <a href="{{ url('/pesanan') }}">Buat Pesanan</a>
        <a href="{{ url('/pesanan/panel') }}">Panel Real-time</a>
    </nav>
    <main>@yield('konten')</main>
</body>
</html>
`,
      'resources/views/beranda.blade.php': `@extends('layouts.app')

@section('judul', 'Beranda')

@section('konten')
    <h1>Tryngo Pesanan Real-time</h1>
    <p>Kirim pesanan, lihat pesanan masuk di panel tanpa refresh halaman.</p>
@endsection
`,
      'resources/views/pesanan/form.blade.php': `@extends('layouts.app')

@section('judul', 'Buat Pesanan')

@section('konten')
    <h1>Buat Pesanan</h1>

    <form method="POST" action="{{ url('/pesanan') }}">
        @csrf
        <div>
            <label>Nama</label>
            <input type="text" name="nama" required>
        </div>
        <div>
            <label>Produk</label>
            <input type="text" name="produk" required>
        </div>
        <div>
            <label>Jumlah</label>
            <input type="number" name="jumlah" min="1" required>
        </div>
        <button type="submit">Kirim Pesanan</button>
    </form>
@endsection
`,
      'resources/views/pesanan/panel.blade.php': `@extends('layouts.app')

@section('judul', 'Panel Pesanan Real-time')

@section('konten')
    <h1>Panel Pesanan</h1>
    <p>Buka halaman ini di dua tab. Kirim pesanan dari tab lain - pesanan baru muncul di sini <strong>tanpa refresh</strong>.</p>
    <ul id="daftar"></ul>

    <script src="https://js.pusher.com/8.2.0/pusher.min.js"></script>
    <script src="https://unpkg.com/laravel-echo@1.16.1/dist/echo.iife.js"></script>
    <script>
        window.Echo = new Echo({
            broadcaster: 'pusher',
            key: '{{ config('broadcasting.connections.reverb.key') }}',
            wsHost: '127.0.0.1',
            wsPort: 8080,
            forceTLS: false,
            enabledTransports: ['ws', 'wss'],
        });

        Echo.channel('pesanan')
            .listen('.pesanan.baru', (e) => {
                const item = document.createElement('li');
                item.textContent = 'Pesanan #' + e.pesanan.id + ' - ' + e.pesanan.nama + ' membeli ' + e.pesanan.produk + ' x' + e.pesanan.jumlah;
                document.getElementById('daftar').prepend(item);
            });
    </script>
@endsection
`,
      'composer.json': PKG('broadcasting-websockets', `"laravel/reverb": "^1.0"`),
      'package.json': PKG_NODE('laravel-lesson-broadcast', DEV_SERVE),
      'README.md': `# Laravel Lesson 16 - Broadcasting & WebSockets (Reverb)

Jalankan: composer install && php artisan migrate && php artisan serve
Kirim pesanan -> event dicatat (BROADCAST_CONNECTION=log di .env).

Aktifkan WebSocket sungguhan (lokal, luar webcontainers):
  1. composer require laravel/reverb (sudah ada di composer.json)
  2. Terminal 2: php artisan reverb:start --host=127.0.0.1 --port=8080
  3. Ubah .env: BROADCAST_CONNECTION=reverb
  4. Buka /pesanan/panel di dua tab, kirim pesanan dari /pesanan -
     pesanan baru muncul real-time di kedua tab.
`,
    },
    objId: [
      'Memahami pola broadcast vs polling untuk data real-time',
      'Membuat Event ShouldBroadcast dengan channel dan broadcastAs',
      'Menjalankan server WebSocket Reverb dan klien Laravel Echo',
      'Memilih channel publik vs private/presence',
    ],
    objEn: [
      'Understand the broadcast vs polling pattern for real-time data',
      'Create a ShouldBroadcast Event with a channel and broadcastAs',
      'Run the Reverb WebSocket server and the Laravel Echo client',
      'Choose public vs private/presence channels',
    ],
    expId: `## Real-time: Dua Pendekatan
Polling = klien bertanya tiap 5 detik (boros, telat). WebSocket = koneksi permanen, server PUSH saat ada kejadian (seketika, efisien). Laravel broadcast = lapisan yang membuat app Anda bisa push tanpa tahu protokolnya: Reverb lokal atau Pusher/Soketi di produksi.
## Event: ShouldBroadcast
class PesananBaru implements ShouldBroadcast = "kejadian ini harus disiarkan". broadcastOn() = channel tujuan (Channel('pesanan') = publik). broadcastAs() = nama event di sisi klien ('.pesanan.baru' dengan titik = jangan tambahkan namespace default). dispatch() dari controller = siarkan ke semua pendengar channel.
## Server & Klien
Server: php artisan reverb:start (server WebSocket berbasis Laravel, protokol kompatibel Pusher). Klien: Laravel Echo + pusher.js di browser. Echo.channel('pesanan').listen('.pesanan.baru', cb) - callback dipanggil SETIAP kali event terbit, tanpa refresh.
## Memilih Channel
Channel = publik (Channel). PrivateChannel = hanya user terotorisasi (routes/channels.php: auth callback). PresenceChannel = private + daftar siapa yang online. Mulai dari publik, naik ke private saat ada data pribadi.`,
    expEn: `## Real-time: Two Approaches
Polling = the client asks every 5 seconds (wasteful, late). WebSockets = a permanent connection, the server PUSHES when something happens (instant, efficient). Laravel broadcasting = the layer that lets your app push without knowing the protocol: Reverb locally, Pusher/Soketi in production.
## Event: ShouldBroadcast
class PesananBaru implements ShouldBroadcast = "this occurrence must be broadcast". broadcastOn() = the destination channel (Channel('pesanan') = public). broadcastAs() = the client-side event name ('.pesanan.baru' with a dot = don't add the default namespace). dispatch() from the controller = broadcast to every channel listener.
## Server & Client
Server: php artisan reverb:start (a Laravel-native WebSocket server, Pusher-compatible protocol). Client: Laravel Echo + pusher.js in the browser. Echo.channel('pesanan').listen('.pesanan.baru', cb) - the callback fires EVERY time the event publishes, no refresh needed.
## Choosing a Channel
Channel = public (Channel). PrivateChannel = authorized users only (routes/channels.php: the auth callback). PresenceChannel = private + a live list of who is online. Start public, move to private as soon as personal data is involved.`,
    chId: 'Bangun real-time yang lebih dalam: (1) ubah ke PrivateChannel pesanan.{user} - tambahkan routes/channels.php dengan auth callback yang memverifikasi user, dan Echo.private(\'pesanan.\' + userId) di klien, (2) buat presence channel kehadiran dengan counter "X sedang melihat panel" (Echo.join(\'presensi.panel\')), (3) tambah kolom terkirim_at di pesanans dan kirim event kedua PesananDiproses 5 detik setelahnya (delay via queue), (4) README: jelaskan beda deployment - Reverb di server sendiri vs Pusher managed.',
    chEn: 'Build deeper real-time: (1) switch to a PrivateChannel pesanan.{user} - add routes/channels.php with an auth callback that verifies the user, and Echo.private(\'pesanan.\' + userId) on the client, (2) build a presence channel with an "X people viewing the panel" counter (Echo.join(\'presensi.panel\')), (3) add a terkirim_at column to pesanans and fire a second PesananDiproses event 5 seconds later (delayed via queue), (4) README: explain deployment differences - Reverb on your own server vs managed Pusher.',
    sumId: 'Broadcast = server push, bukan polling. Reverb = server, Echo = klien. Channel publik vs private. Lanjut: PHPUnit testing.',
    sumEn: 'Broadcast = server push, not polling. Reverb = server, Echo = client. Public vs private channels. Next: PHPUnit testing.',
  },
];

const LESSONS_P5 = [
  {
    phase: 5, num: 17, topicId: 'phpunit-testing',
    titleId: 'Testing dengan PHPUnit', titleEn: 'PHPUnit Testing',
    codeFile: 'tests/Feature/ProdukApiTest.php',
    files: {
      ...SKELETON(true),
      'config/sanctum.php': CONFIG_SANCTUM,
      'phpunit.xml': `<?xml version="1.0" encoding="UTF-8"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="vendor/phpunit/phpunit/phpunit.xsd"
         bootstrap="vendor/autoload.php"
         colors="true">
    <testsuites>
        <testsuite name="Feature">
            <directory>tests/Feature</directory>
        </testsuite>
    </testsuites>
    <php>
        <env name="APP_ENV" value="testing"/>
        <env name="DB_CONNECTION" value="sqlite"/>
        <env name="DB_DATABASE" value=":memory:"/>
        <env name="CACHE_STORE" value="array"/>
        <env name="SESSION_DRIVER" value="array"/>
        <env name="QUEUE_CONNECTION" value="sync"/>
    </php>
</phpunit>
`,
      'tests/TestCase.php': `<?php

namespace Tests;

use Illuminate\\Foundation\\Testing\\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
}
`,
      'tests/Feature/ProdukApiTest.php': `<?php

namespace Tests\\Feature;

use App\\Models\\Produk;
use Illuminate\\Foundation\\Testing\\RefreshDatabase;
use Tests\\TestCase;

class ProdukApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_daftar_produk_dapat_diambil(): void
    {
        Produk::create(['nama' => 'Kopi Gayo', 'harga' => 25000, 'stok' => 10, 'tersedia' => true]);

        $this->getJson('/api/produk')
            ->assertOk()
            ->assertJsonCount(1)
            ->assertJsonPath('0.nama', 'Kopi Gayo');
    }

    public function test_produk_baru_dapat_dibuat(): void
    {
        $response = $this->postJson('/api/produk', [
            'nama' => 'Teh Melati',
            'harga' => 12000,
            'stok' => 5,
            'tersedia' => true,
        ]);

        $response->assertCreated();
        $this->assertDatabaseHas('produks', ['nama' => 'Teh Melati']);
    }

    public function test_produk_validasi_gagal_tanpa_nama(): void
    {
        $this->postJson('/api/produk', ['harga' => 5000])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('nama');
    }
}
`,
      'tests/Feature/AuthTest.php': `<?php

namespace Tests\\Feature;

use App\\Models\\User;
use Illuminate\\Foundation\\Testing\\RefreshDatabase;
use Tests\\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_registrasi_mengembalikan_token(): void
    {
        $response = $this->postJson('/api/registrasi', [
            'nama' => 'Budi',
            'email' => 'budi@tryngo.test',
            'password' => 'rahasia123',
        ]);

        $response->assertCreated()->assertJsonStructure(['user', 'token']);
    }

    public function test_login_gagal_dengan_password_salah(): void
    {
        User::create([
            'nama' => 'Budi',
            'email' => 'budi@tryngo.test',
            'password' => bcrypt('rahasia123'),
        ]);

        $this->postJson('/api/login', [
            'email' => 'budi@tryngo.test',
            'password' => 'salah',
        ])->assertUnauthorized();
    }
}
`,
      'database/migrations/2026_07_01_000001_create_users_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
`,
      'database/migrations/2026_07_01_000002_create_produks_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('produks', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 200);
            $table->decimal('harga', 10, 2);
            $table->unsignedInteger('stok')->default(0);
            $table->boolean('tersedia')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('produks');
    }
};
`,
      'app/Models/User.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Foundation\\Auth\\User as Authenticatable;
use Illuminate\\Notifications\\Notifiable;
use Laravel\\Sanctum\\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = ['nama', 'email', 'password'];
}
`,
      'app/Models/Produk.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class Produk extends Model
{
    use HasFactory;

    protected $fillable = ['nama', 'harga', 'stok', 'tersedia'];
}
`,
      'app/Http/Controllers/Api/AuthController.php': `<?php

namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use App\\Models\\User;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Hash;

class AuthController extends Controller
{
    public function registrasi(Request $request)
    {
        $data = $request->validate([
            'nama' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $user = User::create([
            'nama' => $data['nama'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        return response()->json([
            'user' => $user,
            'token' => $user->createToken('test')->plainTextToken,
        ], 201);
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $data['email'])->first();

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            return response()->json(['pesan' => 'Kredensial salah.'], 401);
        }

        return response()->json([
            'user' => $user,
            'token' => $user->createToken('test')->plainTextToken,
        ]);
    }
}
`,
      'app/Http/Controllers/Api/ProdukController.php': `<?php

namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Produk;
use Illuminate\\Http\\Request;

class ProdukController extends Controller
{
    public function index()
    {
        return response()->json(Produk::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nama' => ['required', 'string', 'max:200'],
            'harga' => ['required', 'numeric', 'min:0'],
            'stok' => ['required', 'integer', 'min:0'],
            'tersedia' => ['nullable', 'boolean'],
        ]);

        $produk = Produk::create($data);

        return response()->json($produk, 201);
    }
}
`,
      'routes/api.php': `<?php

use App\\Http\\Controllers\\Api\\AuthController;
use App\\Http\\Controllers\\Api\\ProdukController;
use Illuminate\\Support\\Facades\\Route;

Route::post('/registrasi', [AuthController::class, 'registrasi']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/produk', [ProdukController::class, 'index']);
    Route::post('/produk', [ProdukController::class, 'store']);
});
`,
      'composer.json': PKG('phpunit-testing', `"laravel/sanctum": "^4.0"`),
      'package.json': PKG_NODE('laravel-lesson-testing', DEV_SERVE),
      'README.md': `# Laravel Lesson 17 - PHPUnit Testing

Jalankan: composer install && php artisan migrate && php artisan serve
Jalankan test:
  vendor/bin/phpunit
  vendor/bin/phpunit --filter ProdukApiTest

Catatan: test memakai SQLite in-memory (phpunit.xml) - database project
tidak tersentuh. RefreshDatabase menjalankan migration di tiap test.
`,
    },
    objId: [
      'Menulis feature test API: request simulasi + assertion response',
      'Mengisolasi test dengan RefreshDatabase dan SQLite in-memory',
      'Menguji jalur sukses DAN jalur gagal (validasi, kredensial salah)',
      'Menjalankan test di terminal dan membaca hasil (failure/success)',
    ],
    objEn: [
      'Write API feature tests: simulated requests + response assertions',
      'Isolate tests with RefreshDatabase and in-memory SQLite',
      'Test success AND failure paths (validation, wrong credentials)',
      'Run tests in the terminal and read the results (failure/success)',
    ],
    expId: `## Test: Kontrak yang Dieksekusi
$this->getJson('/api/produk') = request HTTP sungguhan terhadap aplikasi (bukan unit internal). Assertion: assertOk (200), assertCreated (201), assertJsonCount, assertJsonPath, assertJsonStructure. Test membuktikan PERILAKU, bukan detail implementasi - boleh refactor kode, test harus tetap hijau.
## RefreshDatabase & SQLite In-memory
phpunit.xml memaksa DB_CONNECTION=sqlite + DB_DATABASE=:memory: - setiap test dapat database kosong di RAM. RefreshDatabase menjalankan semua migration di awal tiap test. Hasil: test cepat, terisolasi, dan TIDAK menyentuh database development.
## Assertion yang Menuntun Desain
assertUnprocessable (422) + assertJsonValidationErrors memaksa Anda berpikir: apa yang terjadi kalau data invalid? assertDatabaseHas memverifikasi efek ke DATABASE, bukan hanya response. Test yang baik menuliskan skenario klien - dan menuntun API agar konsisten.
## Alur Kerja TDD Ringan
Red-Green-Refactor: tulis test yang gagal (red), buat fitur minimal agar lewat (green), rapikan (refactor). vendor/bin/phpunit --filter NamaTest menjalankan sebagian. Test yang lambat = tanda desain bermasalah.`,
    expEn: `## Tests: A Contract That Executes
$this->getJson('/api/produk') = a real HTTP request against the app (not an internal unit). Assertions: assertOk (200), assertCreated (201), assertJsonCount, assertJsonPath, assertJsonStructure. Tests prove BEHAVIOR, not implementation details - you may refactor code, tests must stay green.
## RefreshDatabase & In-memory SQLite
phpunit.xml forces DB_CONNECTION=sqlite + DB_DATABASE=:memory: - every test gets an empty database in RAM. RefreshDatabase runs all migrations at the start of each test. Result: fast, isolated tests that NEVER touch your development database.
## Assertions That Guide Design
assertUnprocessable (422) + assertJsonValidationErrors forces you to think: what happens when the data is invalid? assertDatabaseHas verifies the effect on the DATABASE, not just the response. Good tests write out client scenarios - and guide the API to be consistent.
## Lightweight TDD Workflow
Red-Green-Refactor: write a failing test (red), build the minimal feature to pass (green), clean up (refactor). vendor/bin/phpunit --filter NameTest runs a subset. Slow tests = a sign of bad design.`,
    chId: 'Perluas coverage: (1) tulis test edit & hapus produk (PUT/DELETE /api/produk/{id}) lengkap dengan 404 untuk id tak ada, (2) tulis test yang memaksa kegagalan 401: akses /api/produk POST tanpa header Authorization, (3) tambah kolom kategori dan test filter ?kategori= (assertJsonPath untuk relasi), (4) hitung coverage: vendor/bin/phpunit --coverage-text dan tulis persentasenya di README - target minimum 70%.',
    chEn: 'Expand coverage: (1) write update & delete tests (PUT/DELETE /api/produk/{id}) including 404 for missing ids, (2) write a forced-401 test: POST /api/produk without an Authorization header, (3) add a kategori column and a test for the ?kategori= filter (assertJsonPath for the relation), (4) measure coverage: vendor/bin/phpunit --coverage-text and write the percentage in the README - target at least 70%.',
    sumId: 'Feature test = request + assertion. RefreshDatabase = isolasi. Jalur sukses & gagal = lengkap. Lanjut: caching & Redis.',
    sumEn: 'Feature tests = request + assertion. RefreshDatabase = isolation. Success & failure paths = complete. Next: caching & Redis.',
  },
  {
    phase: 5, num: 18, topicId: 'caching-redis',
    titleId: 'Caching & Redis', titleEn: 'Caching & Redis',
    codeFile: 'app/Http/Controllers/TokoController.php',
    files: {
      ...SKELETON(),
      'config/cache.php': CONFIG_CACHE,
      'config/redis.php': CONFIG_REDIS,
      'database/migrations/2026_07_01_000001_create_kategoris_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kategoris', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 100);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kategoris');
    }
};
`,
      'database/migrations/2026_07_01_000002_create_produks_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('produks', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 200);
            $table->decimal('harga', 10, 2);
            $table->unsignedInteger('stok')->default(0);
            $table->boolean('tersedia')->default(true);
            $table->foreignId('kategori_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('produks');
    }
};
`,
      'database/seeders/DatabaseSeeder.php': `<?php

namespace Database\\Seeders;

use App\\Models\\Kategori;
use App\\Models\\Produk;
use Illuminate\\Database\\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $minuman = Kategori::create(['nama' => 'Minuman']);
        $makanan = Kategori::create(['nama' => 'Makanan']);

        Produk::create(['nama' => 'Kopi Gayo', 'harga' => 25000, 'stok' => 12, 'tersedia' => true, 'kategori_id' => $minuman->id]);
        Produk::create(['nama' => 'Teh Melati', 'harga' => 12000, 'stok' => 0, 'tersedia' => false, 'kategori_id' => $minuman->id]);
        Produk::create(['nama' => 'Keripik Singkong', 'harga' => 15000, 'stok' => 30, 'tersedia' => true, 'kategori_id' => $makanan->id]);
        Produk::create(['nama' => 'Bakpia Jogja', 'harga' => 45000, 'stok' => 8, 'tersedia' => true, 'kategori_id' => $makanan->id]);
    }
}
`,
      'app/Models/Kategori.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class Kategori extends Model
{
    use HasFactory;

    protected $fillable = ['nama'];
}
`,
      'app/Models/Produk.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class Produk extends Model
{
    use HasFactory;

    protected $fillable = ['nama', 'harga', 'stok', 'tersedia', 'kategori_id'];

    protected $casts = [
        'tersedia' => 'boolean',
        'harga' => 'decimal:2',
    ];

    public function kategori()
    {
        return $this->belongsTo(Kategori::class);
    }
}
`,
      'app/Http/Controllers/TokoController.php': `<?php

namespace App\\Http\\Controllers;

use App\\Models\\Produk;
use Illuminate\\Support\\Facades\\Cache;

class TokoController extends Controller
{
    public function index()
    {
        $produk = Cache::remember('toko.produk', 60, function () {
            return Produk::with('kategori')->get();
        });

        $terlaris = Cache::remember('toko.terlaris', 300, function () {
            return Produk::orderBy('stok', 'asc')->take(5)->get();
        });

        $kunjungan = Cache::increment('toko.kunjungan', 1);

        return view('toko', compact('produk', 'terlaris', 'kunjungan'));
    }

    public function refresh()
    {
        Cache::forget('toko.produk');
        Cache::forget('toko.terlaris');

        return back()->with('sukses', 'Cache toko dibersihkan.');
    }
}
`,
      'routes/web.php': `<?php

use App\\Http\\Controllers\\TokoController;
use Illuminate\\Support\\Facades\\Route;

Route::get('/', [TokoController::class, 'index']);
Route::post('/refresh', [TokoController::class, 'refresh']);
`,
      'resources/views/layouts/app.blade.php': `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tryngo Toko</title>
</head>
<body>
    <nav><a href="{{ url('/') }}">Tryngo Toko</a></nav>
    <main>@yield('konten')</main>
</body>
</html>
`,
      'resources/views/toko.blade.php': `@extends('layouts.app')

@section('konten')
    <h1>Daftar Produk (cache 60 detik)</h1>

    @if (session('sukses')) <p>{{ session('sukses') }}</p> @endif

    <p>Kunjungan halaman: <strong>{{ $kunjungan }}</strong></p>

    <ul>
        @foreach ($produk as $p)
            <li>{{ $p->nama }} - Rp {{ number_format($p->harga, 0, ',', '.') }} - {{ $p->kategori?->nama }}</li>
        @endforeach
    </ul>

    <h2>Terlaris (stok paling menipis)</h2>
    <ol>
        @foreach ($terlaris as $t)
            <li>{{ $t->nama }} (sisa {{ $t->stok }})</li>
        @endforeach
    </ol>

    <form method="POST" action="{{ url('/refresh') }}">
        @csrf
        <button type="submit">Bersihkan Cache</button>
    </form>
@endsection
`,
      'composer.json': PKG('caching-redis'),
      'package.json': PKG_NODE('laravel-lesson-cache', DEV_SERVE),
      'README.md': `# Laravel Lesson 18 - Caching & Redis

Jalankan: composer install && php artisan migrate --seed && php artisan serve
Coba: buka / beberapa kali - kunjungan bertambah, produk TIDAK re-query (cache).

Aktifkan Redis (lokal):
  1. Redis berjalan (mis. Docker: docker run -p 6379:6379 redis)
  2. Edit .env: CACHE_STORE=redis
  3. Redis untuk queue sekaligus: QUEUE_CONNECTION=redis

Perintah berguna:
  php artisan cache:clear
  php artisan config:clear
  tinker: Cache::get('toko.kunjungan'), Cache::has('toko.produk')
`,
    },
    objId: [
      'Menyimpan hasil query dengan Cache::remember (key + TTL)',
      'Memahami berapa lama cache hidup dan kapan harus di-forget',
      'Menggunakan counter dengan Cache::increment',
      'Menukar backend cache: file (lokal) vs Redis (produksi)',
    ],
    objEn: [
      'Store query results with Cache::remember (key + TTL)',
      'Understand how long cache lives and when to forget it',
      'Use counters with Cache::increment',
      'Swap cache backends: file (local) vs Redis (production)',
    ],
    expId: `## remember(): Satu Baris untuk Menyimpan
Cache::remember('toko.produk', 60, fn) = kalau key ada, kembalikan; kalau tidak, jalankan closure, simpan hasilnya selama 60 detik, kembalikan. Query yang berat dijalankan SEKALI per menit, bukan sekali per request. Key = nama unik; TTL = detik.
## Kapan Cache Hidup, Kapan Mati
TTL pendek (detik-menit) untuk data sering berubah, panjang (jam-hari) untuk data jarang berubah. Data yang BERUBAH harus di-invalidate: Cache::forget('toko.produk') saat produk di-create/update/delete - di controller toko ini tombol "Bersihkan Cache" menirunya. TTL tanpa forget = data basi maksimal 60 detik.
## Counter & Angka Kecil
Cache::increment('toko.kunjungan', 1) = operasi atomik: aman diakses banyak request bersamaan (bandingkan read-modify-write manual yang bisa race condition). Cocok untuk hit counter, rate limiting, statistik ringan.
## File vs Redis
CACHE_STORE=file = menyimpan di storage (lokal, tanpa setup). redis = server di memori (cepat, terdistribusi, bisa dipakai BANYAK server aplikasi sekaligus). Ganti 1 baris .env - kode tidak berubah. Untuk memilih: single server kecil = file/array; skala banyak instance = redis.`,
    expEn: `## remember(): One Line to Store
Cache::remember('toko.produk', 60, fn) = if the key exists, return it; otherwise run the closure, store the result for 60 seconds, return it. The heavy query runs ONCE per minute, not once per request. Key = a unique name; TTL = seconds.
## When Cache Lives, When It Dies
Short TTLs (seconds-minutes) for frequently changing data, long ones (hours-days) for rarely changing data. MUTATED data must be invalidated: Cache::forget('toko.produk') when a product is created/updated/deleted - the "Clear Cache" button in this store mimics it. TTL without forget = stale data for at most 60 seconds.
## Counters & Small Numbers
Cache::increment('toko.kunjungan', 1) = an atomic operation: safe under many concurrent requests (compare a manual read-modify-write which can race). Great for hit counters, rate limiting, lightweight stats.
## File vs Redis
CACHE_STORE=file = stored on disk (local, zero setup). redis = an in-memory server (fast, shared across MANY app servers). Change one .env line - the code does not change. Choosing: small single server = file/array; multi-instance scale = redis.`,
    chId: `Optimasi cache nyata: (1) tambah Cache::remember('toko.halaman', 600, fn) untuk halaman produk TERLARIS dengan cache tag? (tanpa package: pakai key terpisah + forget manual di refresh), (2) buat cache stok dengan locking: Cache::lock('stok.produk.'.$id, 10) di sekitar pengurangan stok untuk mencegah oversell, (3) bandingkan kecepatan: cek waktu respons dengan dan tanpa cache (Chrome DevTools/curl -w "%{time_total}"), (4) tulis README: skenario cache stampede dan solusi lock.`,
    chEn: `Real caching optimization: (1) add a Cache::remember('toko.halaman', 600, fn) for the BEST-SELLING page section (no package: separate keys + manual forget in refresh), (2) build locked stock operations: Cache::lock('stok.produk.'.$id, 10) around stock decrements to prevent overselling, (3) compare speeds: measure response time with and without cache (Chrome DevTools/curl -w "%{time_total}"), (4) write a README: the cache stampede scenario and the lock solution.`,
    sumId: 'remember = query sekali, TTL = masa hidup, forget = invalidasi, increment = atomik. Lanjut: Docker & CI/CD.',
    sumEn: 'remember = query once, TTL = lifetime, forget = invalidation, increment = atomic. Next: Docker & CI/CD.',
  },
  {
    phase: 5, num: 19, topicId: 'docker-cicd',
    titleId: 'Docker & CI/CD', titleEn: 'Docker & CI/CD',
    codeFile: 'Dockerfile',
    files: {
      ...SKELETON(),
      '.env.production': `APP_NAME=Tryngo Laravel
APP_ENV=production
APP_DEBUG=false
APP_KEY=
DB_CONNECTION=mysql
DB_HOST=db
DB_DATABASE=tryngo
DB_USERNAME=tryngo
DB_PASSWORD=ubah-saya
CACHE_STORE=redis
QUEUE_CONNECTION=redis
`,
      'Dockerfile': `FROM composer:2 AS build

WORKDIR /app

COPY composer.json composer.lock* ./
RUN composer install --no-dev --no-interaction --prefer-dist

FROM php:8.3-cli

RUN apt-get update && apt-get install -y libzip-dev unzip \
    && docker-php-ext-install pdo pdo_mysql zip bcmath

COPY --from=build /app/vendor /var/www/html/vendor
COPY . /var/www/html

WORKDIR /var/www/html

RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
`,
      'docker-compose.yml': `services:
  app:
    build: .
    ports:
      - "8000:8000"
    environment:
      APP_ENV: production
      APP_DEBUG: "false"
      APP_KEY: \${APP_KEY}
      DB_CONNECTION: mysql
      DB_HOST: db
      DB_DATABASE: tryngo
      DB_USERNAME: tryngo
      DB_PASSWORD: \${DB_PASSWORD}
    depends_on:
      - db
    volumes:
      - ./storage:/var/www/html/storage

  db:
    image: mysql:8.4
    environment:
      MYSQL_DATABASE: tryngo
      MYSQL_USER: tryngo
      MYSQL_PASSWORD: \${DB_PASSWORD}
      MYSQL_ROOT_PASSWORD: \${MYSQL_ROOT_PASSWORD}
    volumes:
      - dbdata:/var/lib/mysql

volumes:
  dbdata:
`,
      '.github/workflows/ci.yml': `name: CI

on:
  push:
    branches: [ main ]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.3'
          extensions: mbstring, pdo_sqlite

      - run: composer install --no-interaction

      - run: touch database/database.sqlite

      - run: php artisan migrate --force

      - run: vendor/bin/phpunit
`,
      'database/migrations/2026_07_01_000001_create_users_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
`,
      'database/migrations/2026_07_01_000002_create_posts_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->text('isi');
            $table->foreignId('penulis_id')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
`,
      'app/Models/User.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Foundation\\Auth\\User as Authenticatable;
use Illuminate\\Notifications\\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = ['nama', 'email', 'password'];
}
`,
      'app/Models/Post.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['judul', 'isi', 'penulis_id'];

    public function penulis()
    {
        return $this->belongsTo(User::class, 'penulis_id');
    }
}
`,
      'routes/web.php': `<?php

use App\\Models\\Post;
use Illuminate\\Support\\Facades\\Route;

Route::get('/', function () {
    return view('beranda', ['posts' => Post::with('penulis')->latest()->get()]);
});
`,
      'resources/views/beranda.blade.php': `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tryngo Docker</title>
</head>
<body>
    <h1>Laravel dalam Container</h1>
    <ul>
        @forelse ($posts as $post)
            <li>{{ $post->judul }} - oleh {{ $post->penulis->nama }}</li>
        @empty
            <li>Belum ada postingan.</li>
        @endforelse
    </ul>
</body>
</html>
`,
      'composer.json': PKG('docker-cicd'),
      'package.json': PKG_NODE('laravel-lesson-docker', DEV_SERVE),
      'README.md': `# Laravel Lesson 19 - Docker & CI/CD

Jalankan via Docker (lokal):
  1. Isi variabel di .env.production (APP_KEY: php artisan key:generate --show)
  2. cp .env.production .env
  3. docker compose up --build
  4. docker compose exec app php artisan migrate --force
  5. Buka http://localhost:8000

CI: .github/workflows/ci.yml berjalan di GitHub Actions saat push/pull request
(composer install + migrate + phpunit di database sqlite).

Catatan: \${VAR} di docker-compose dibaca dari file .env host (bukan .env app).
`,
    },
    objId: [
      'Membangun image Laravel multi-stage dengan Dockerfile',
      'Mengorkestrasi app + MySQL dengan docker-compose',
      'Menulis pipeline CI: test otomatis di setiap push',
      'Menjaga secret: variabel lingkungan bukan file hardcode',
    ],
    objEn: [
      'Build a multi-stage Laravel image with a Dockerfile',
      'Orchestrate app + MySQL with docker-compose',
      'Write a CI pipeline: automated tests on every push',
      'Keep secrets: environment variables, not hardcoded files',
    ],
    expId: `## Dockerfile: Image yang Reproducible
Image = resep lingkungan yang persis sama di laptop, CI, dan server. Tahap 1 'build': Composer meng-install vendor (dengan composer:2 image). Tahap 2 'runtime': PHP CLI + ekstensi (pdo_mysql untuk MySQL), lalu COPY vendor dari tahap 1 - hasil: image kecil, cache layer optimal, tidak ada kunci SSH di dalam image.
## docker-compose: Satu Perintah, Banyak Service
compose mendefinisikan app (build dari Dockerfile) + db (mysql:8.4). Service app memakai \${APP_KEY} dari file .env HOST - secret tidak pernah masuk file project. Volumes: ./storage dipasang dari host (data persisten). depends_on: app menunggu db.
## CI: Gerbang Otomatis
Workflow GitHub Actions: checkout -> setup php -> composer install -> migrate -> phpunit. Setiap push/pull request dijalankan ulang. Pipeline gagal = kode tidak boleh masuk main. Inilah 'quality gate' yang bisa diandalkan - bukan janji manual.
## 12-Factor Mindset
Konfigurasi = lingkungan (env), bukan kode: APP_DEBUG=false + APP_KEY di env produksi. Kode yang sama jalan di development (sqlite, debug on) dan produksi (mysql, debug off) - bedanya hanya variabel. CI/CD + container = deployment berulang yang aman.`,
    expEn: `## Dockerfile: A Reproducible Image
An image = an environment recipe identical on laptops, CI, and servers. Stage 1 'build': Composer installs vendor (with the composer:2 image). Stage 2 'runtime': PHP CLI + extensions (pdo_mysql for MySQL), then COPY vendor from stage 1 - result: a small image, optimal layer caching, no SSH keys baked in.
## docker-compose: One Command, Many Services
compose defines app (built from the Dockerfile) + db (mysql:8.4). The app service reads \${APP_KEY} from the HOST .env file - secrets never enter the project files. Volumes: ./storage is mounted from the host (persistent data). depends_on: app waits for db.
## CI: An Automatic Gate
The GitHub Actions workflow: checkout -> setup php -> composer install -> migrate -> phpunit. Re-run on every push/pull request. A failing pipeline = the code must not enter main. This is a quality gate you can rely on - not manual promises.
## The 12-Factor Mindset
Configuration = the environment (env), not code: APP_DEBUG=false + APP_KEY in the production env. The same code runs in development (sqlite, debug on) and production (mysql, debug off) - only the variables differ. CI/CD + containers = safe repeatable deployments.`,
    chId: 'Naikkan level produksi: (1) tambah service redis di docker-compose dan set CACHE_STORE=redis, QUEUE_CONNECTION=redis di app, (2) tambah healthcheck di service db (mysqladmin ping) dan depends_on dengan condition: service_healthy, (3) tulis job deploy kedua di ci.yml (needs: test) yang mem-build image dan push ke GitHub Container Registry, (4) batasi port: jalankan artisan serve hanya di 127.0.0.1 dan letakkan nginx reverse-proxy (add nginx service) - jelaskan kenapa.',
    chEn: 'Level up production: (1) add a redis service to docker-compose and set CACHE_STORE=redis, QUEUE_CONNECTION=redis on the app, (2) add a healthcheck to the db service (mysqladmin ping) and depends_on with condition: service_healthy, (3) write a second deploy job in ci.yml (needs: test) that builds the image and pushes to the GitHub Container Registry, (4) restrict ports: run artisan serve only on 127.0.0.1 and put nginx as a reverse proxy (add an nginx service) - explain why.',
    sumId: 'Dockerfile = lingkungan reproducible. Compose = banyak service. CI = gerbang otomatis. Env = konfigurasi. Lanjut: deployment & capstone.',
    sumEn: 'Dockerfile = reproducible environments. Compose = many services. CI = the automatic gate. Env = configuration. Next: deployment & capstone.',
  },
  {
    phase: 5, num: 20, topicId: 'deployment-capstone',
    titleId: 'Deployment & Capstone', titleEn: 'Deployment & Capstone',
    codeFile: 'app/Http/Controllers/PostController.php',
    files: {
      ...SKELETON(),
      'database/migrations/2026_07_01_000001_create_users_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
`,
      'database/migrations/2026_07_01_000002_create_posts_table.php': `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->text('isi');
            $table->foreignId('penulis_id')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
`,
      'app/Models/User.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Foundation\\Auth\\User as Authenticatable;
use Illuminate\\Notifications\\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = ['nama', 'email', 'password'];
}
`,
      'app/Models/Post.php': `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['judul', 'isi', 'penulis_id'];

    public function penulis()
    {
        return $this->belongsTo(User::class, 'penulis_id');
    }
}
`,
      'app/Http/Controllers/AuthController.php': `<?php

namespace App\\Http\\Controllers;

use App\\Models\\User;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Auth;
use Illuminate\\Support\\Facades\\Hash;

class AuthController extends Controller
{
    public function showRegister()
    {
        return view('auth.register');
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'nama' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = User::create([
            'nama' => $data['nama'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        Auth::login($user);

        return redirect('/posts');
    }

    public function showLogin()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $kredensial = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (Auth::attempt($kredensial)) {
            $request->session()->regenerate();

            return redirect()->intended('/posts');
        }

        return back()->withErrors([
            'email' => 'Email atau password salah.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
`,
      'app/Http/Controllers/PostController.php': `<?php

namespace App\\Http\\Controllers;

use App\\Models\\Post;
use Illuminate\\Http\\Request;

class PostController extends Controller
{
    public function index()
    {
        return view('posts.index', ['posts' => Post::with('penulis')->latest()->get()]);
    }

    public function create()
    {
        return view('posts.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'judul' => ['required', 'string', 'max:200'],
            'isi' => ['required', 'string'],
        ]);

        Post::create($data + ['penulis_id' => auth()->id()]);

        return redirect('/posts')->with('sukses', 'Postingan dibuat!');
    }

    public function show(Post $post)
    {
        return view('posts.show', compact('post'));
    }

    public function edit(Post $post)
    {
        abort_unless($post->penulis_id === auth()->id(), 403);

        return view('posts.edit', compact('post'));
    }

    public function update(Request $request, Post $post)
    {
        abort_unless($post->penulis_id === auth()->id(), 403);

        $data = $request->validate([
            'judul' => ['required', 'string', 'max:200'],
            'isi' => ['required', 'string'],
        ]);

        $post->update($data);

        return redirect('/posts/'.$post->id)->with('sukses', 'Postingan diperbarui!');
    }

    public function destroy(Post $post)
    {
        abort_unless($post->penulis_id === auth()->id(), 403);

        $post->delete();

        return redirect('/posts')->with('sukses', 'Postingan dihapus.');
    }
}
`,
      'routes/web.php': `<?php

use App\\Http\\Controllers\\AuthController;
use App\\Http\\Controllers\\PostController;
use Illuminate\\Support\\Facades\\Route;

Route::get('/', function () {
    return view('beranda');
});

Route::get('/daftar', [AuthController::class, 'showRegister'])->name('register');
Route::post('/daftar', [AuthController::class, 'register']);
Route::get('/masuk', [AuthController::class, 'showLogin'])->name('login');
Route::post('/masuk', [AuthController::class, 'login']);
Route::post('/keluar', [AuthController::class, 'logout'])->name('logout');

Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{post}', [PostController::class, 'show']);

Route::middleware('auth')->group(function () {
    Route::get('/posts/create', [PostController::class, 'create']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::get('/posts/{post}/edit', [PostController::class, 'edit']);
    Route::put('/posts/{post}', [PostController::class, 'update']);
    Route::delete('/posts/{post}', [PostController::class, 'destroy']);
});
`,
      'resources/views/layouts/app.blade.php': `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('judul', 'Tryngo Blog')</title>
</head>
<body>
    <nav>
        <a href="{{ url('/') }}">Tryngo Blog</a>
        <a href="{{ url('/posts') }}">Postingan</a>
        @auth
            <a href="{{ url('/posts/create') }}">Tulis</a>
            <span>{{ auth()->user()->nama }}</span>
            <form method="POST" action="{{ route('logout') }}" style="display:inline">
                @csrf
                <button type="submit">Keluar</button>
            </form>
        @else
            <a href="{{ route('login') }}">Masuk</a>
            <a href="{{ route('register') }}">Daftar</a>
        @endauth
    </nav>
    <main>@yield('konten')</main>
</body>
</html>
`,
      'resources/views/beranda.blade.php': `@extends('layouts.app')

@section('judul', 'Beranda')

@section('konten')
    <h1>Tryngo Blog</h1>
    <p>Capstone: auth session + CRUD + validasi + otorisasi pemilik + panduan deployment.</p>
    <p><a href="{{ url('/posts') }}">Lihat postingan</a></p>
@endsection
`,
      'resources/views/auth/register.blade.php': `@extends('layouts.app')

@section('judul', 'Daftar')

@section('konten')
    <h1>Daftar Akun</h1>
    <form method="POST" action="{{ url('/daftar') }}">
        @csrf
        <div><label>Nama</label><input type="text" name="nama" value="{{ old('nama') }}" required></div>
        <div><label>Email</label><input type="email" name="email" value="{{ old('email') }}" required>
            @error('email') <small>{{ $message }}</small> @enderror
        </div>
        <div><label>Password</label><input type="password" name="password" required>
            @error('password') <small>{{ $message }}</small> @enderror
        </div>
        <div><label>Ulangi Password</label><input type="password" name="password_confirmation" required></div>
        <button type="submit">Daftar</button>
    </form>
@endsection
`,
      'resources/views/auth/login.blade.php': `@extends('layouts.app')

@section('judul', 'Masuk')

@section('konten')
    <h1>Masuk</h1>
    @if ($errors->any())
        <p style="color:red">{{ $errors->first('email') }}</p>
    @endif
    <form method="POST" action="{{ url('/masuk') }}">
        @csrf
        <div><label>Email</label><input type="email" name="email" value="{{ old('email') }}" required></div>
        <div><label>Password</label><input type="password" name="password" required></div>
        <button type="submit">Masuk</button>
    </form>
@endsection
`,
      'resources/views/posts/index.blade.php': `@extends('layouts.app')

@section('judul', 'Postingan')

@section('konten')
    <h1>Postingan</h1>

    @if (session('sukses')) <p>{{ session('sukses') }}</p> @endif

    @forelse ($posts as $post)
        <article>
            <h3><a href="{{ url('/posts/'.$post->id) }}">{{ $post->judul }}</a></h3>
            <p>Oleh {{ $post->penulis->nama }} - {{ $post->created_at->diffForHumans() }}</p>
        </article>
    @empty
        <p>Belum ada postingan.</p>
    @endforelse
@endsection
`,
      'resources/views/posts/show.blade.php': `@extends('layouts.app')

@section('judul', $post->judul)

@section('konten')
    <h1>{{ $post->judul }}</h1>
    <p>Oleh {{ $post->penulis->nama }}</p>
    <p>{{ $post->isi }}</p>

    @auth
        @if ($post->penulis_id === auth()->id())
            <p>
                <a href="{{ url('/posts/'.$post->id.'/edit') }}">Edit</a>
                <form method="POST" action="{{ url('/posts/'.$post->id) }}" style="display:inline">
                    @csrf
                    @method('DELETE')
                    <button type="submit" onclick="return confirm('Hapus postingan ini?')">Hapus</button>
                </form>
            </p>
        @endif
    @endauth
@endsection
`,
      'resources/views/posts/create.blade.php': `@extends('layouts.app')

@section('judul', 'Tulis Postingan')

@section('konten')
    <h1>Tulis Postingan</h1>

    <form method="POST" action="{{ url('/posts') }}">
        @csrf
        <div>
            <label>Judul</label>
            <input type="text" name="judul" value="{{ old('judul') }}" required>
            @error('judul') <small>{{ $message }}</small> @enderror
        </div>
        <div>
            <label>Isi</label>
            <textarea name="isi" required>{{ old('isi') }}</textarea>
            @error('isi') <small>{{ $message }}</small> @enderror
        </div>
        <button type="submit">Terbitkan</button>
    </form>
@endsection
`,
      'resources/views/posts/edit.blade.php': `@extends('layouts.app')

@section('judul', 'Edit Postingan')

@section('konten')
    <h1>Edit: {{ $post->judul }}</h1>

    <form method="POST" action="{{ url('/posts/'.$post->id) }}">
        @csrf
        @method('PUT')
        <div>
            <label>Judul</label>
            <input type="text" name="judul" value="{{ old('judul', $post->judul) }}" required>
        </div>
        <div>
            <label>Isi</label>
            <textarea name="isi" required>{{ old('isi', $post->isi) }}</textarea>
        </div>
        <button type="submit">Simpan</button>
    </form>
@endsection
`,
      'composer.json': PKG('deployment-capstone'),
      'package.json': PKG_NODE('laravel-lesson-capstone', DEV_SERVE),
      'README.md': `# Laravel Lesson 20 - Deployment & Capstone

Jalankan: composer install && php artisan migrate && php artisan serve
Alur lengkap: daftar -> masuk -> tulis postingan -> edit/hapus (hanya pemilik).

Checklist deployment produksi:
  1. APP_ENV=production, APP_DEBUG=false, APP_KEY hasil php artisan key:generate
  2. Database MySQL/PostgreSQL + Redis (cache & queue)
  3. php artisan migrate --force && php artisan config:cache && php artisan route:cache
  4. storage:link untuk file publik; upload ke S3/R2 bila ada
  5. Queue worker berjalan terus (supervisor): php artisan queue:work
  6. HTTPS (Let's Encrypt), backup database harian
  7. CI dari lesson 19: test otomatis sebelum deploy

Platform: Fly.io / Laravel Forge / Hetzner + Docker (lesson 19).
`,
    },
    objId: [
      'Merangkai capstone: auth + CRUD + validasi + otorisasi pemilik',
      'Menyusun checklist deployment produksi yang aman',
      'Memahami perbedaan environment development vs produksi',
      'Menilai kualitas project: apa yang membuatnya siap produksi',
    ],
    objEn: [
      'Assemble the capstone: auth + CRUD + validation + owner authorization',
      'Write a safe production deployment checklist',
      'Understand development vs production environment differences',
      'Judge project quality: what makes it production-ready',
    ],
    expId: `## Capstone: Semua Konsep dalam Satu App
20 pelajaran diringkas di sini: auth session (Hash, regenerate), validasi, route model binding, relasi Eloquent, blade (auth/guest, forelse, session), dan otorisasi pemilik. Pola yang dipakai di produksi: redirect()->intended() (pengalaman pengguna), abort_unless 403 (keamanan), tombol hapus dengan konfirmasi (UI). Perhatikan BETAPA BANYAK pekerjaan yang tadinya manual sekarang gratis.
## Otorisasi Pemilik: Dua Lapis
abort_unless($post->penulis_id === auth()->id(), 403) di controller = keamanan sungguhan. @if ($post->penulis_id === auth()->id()) di blade = kenyamanan UI. Ingat pelajaran 10: ini versi inline dari Policy. Untuk skala lebih besar, pindahkan ke Policy resmi.
## Deployment: Perbedaan Lingkungan
Produksi: APP_DEBUG=false (jangan bocorkan stack trace!), APP_KEY di-generate, cache config+route (kecepatan), migrate --force, worker jalan terus, HTTPS, backup. Development: semuanya fleksibel. Kode TIDAK berubah antar lingkungan - konfigurasi yang berubah.
## Kapan Project Siap?
Bukan saat fitur selesai - saat: (1) test menutupi jalur kritis, (2) README bisa diikuti orang asing, (3) deployment bisa diulang (CI/CD), (4) kegagalan terpantau (log, monitoring). Satu project yang selesai dan ter-deploy lebih bernilai dari lima yang setengah jalan.`,
    expEn: `## The Capstone: Every Concept in One App
20 lessons summarized here: session auth (Hash, regenerate), validation, route model binding, Eloquent relations, blade (auth/guest, forelse, session), and owner authorization. Production patterns used: redirect()->intended() (user experience), abort_unless 403 (security), delete buttons with confirmation (UI). Notice HOW MUCH work that used to be manual is now free.
## Owner Authorization: Two Layers
abort_unless($post->penulis_id === auth()->id(), 403) in the controller = real security. @if ($post->penulis_id === auth()->id()) in blade = UI convenience. Remember lesson 10: this is the inline version of a Policy. For larger scale, move it to a proper Policy.
## Deployment: Environment Differences
Production: APP_DEBUG=false (never leak stack traces!), a generated APP_KEY, cached config+route (speed), migrate --force, a running worker, HTTPS, backups. Development: everything is flexible. The CODE does not change between environments - the configuration does.
## When Is a Project Ready?
Not when the feature is done - but when: (1) tests cover the critical paths, (2) a stranger can follow the README, (3) deployment is repeatable (CI/CD), (4) failures are observable (logs, monitoring). One finished, deployed project is worth more than five half-finished ones.`,
    chId: 'Bawa capstone ke level berikutnya: (1) tambah halaman profil yang menampilkan semua postingan user + statistik jumlah, (2) tambah komentar: model Komentar (post_id FK, isi, nama penulis) + CRUD dengan otorisasi yang sama, (3) tulis 5 feature test: tamu dilarang membuat postingan (redirect login), non-pemilik dapat 403 saat edit, pemilik berhasil update, postingan tidak ditemukan 404, validasi judul wajib, (4) deploy ke platform gratis (Fly.io/Render + MySQL/PostgreSQL + Redis) dan bagikan URL-nya di README.',
    chEn: 'Take the capstone further: (1) add a profile page showing all of a user\'s posts + a post count, (2) add comments: a Komentar model (post_id FK, isi, author name) + CRUD with the same authorization, (3) write 5 feature tests: guests are barred from creating posts (login redirect), non-owners get 403 on edit, owners update successfully, missing posts 404, judul validation is required, (4) deploy to a free platform (Fly.io/Render + MySQL/PostgreSQL + Redis) and share the URL in the README.',
    sumId: 'Capstone merangkum: auth, CRUD, validasi, otorisasi, deployment. Kode sama, lingkungan berbeda. Anda siap Laravel!',
    sumEn: 'The capstone ties it together: auth, CRUD, validation, authorization, deployment. Same code, different environments. You are Laravel-ready!',
  },
];

const LESSONS = [...LESSONS_P1, ...LESSONS_P2, ...LESSONS_P3, ...LESSONS_P4, ...LESSONS_P5];

// ===== GENERATE =====
for (const lesson of LESSONS) {
  const phase = PHASES.find((p) => p.phase === lesson.phase);
  const levelDir = phase.id;
  const mdDir = path.join(BASE_DIR, levelDir);

  const objListId = lesson.objId.map((o) => `- ${o}`).join('\n');
  const objListEn = lesson.objEn.map((o) => `- ${o}`).join('\n');

  for (const lang of ['id', 'en']) {
    const isId = lang === 'id';
    const title = isId ? lesson.titleId : lesson.titleEn;
    const phaseName = isId ? phase.nameId : phase.nameEn;
    const objList = isId ? objListId : objListEn;
    const exp = isId ? lesson.expId : lesson.expEn;
    const ch = isId ? lesson.chId : lesson.chEn;
    const sum = isId ? lesson.sumId : lesson.sumEn;
    const lessonLabel = isId ? `Pelajaran ${lesson.num}` : `Lesson ${lesson.num}`;

    const langDir = path.join(mdDir, lang);
    fs.mkdirSync(langDir, { recursive: true });

    const code = lesson.files[lesson.codeFile] || '';
    const filename = `lesson${lesson.num}-${lesson.topicId}.md`;
    const content = `# ${title}

> Laravel | ${phaseName} | ${lessonLabel}

## ${isId ? 'Tujuan Pembelajaran' : 'Learning Objectives'}

${objList}

---

## Program: ${title}

\`\`\`php
${code}
\`\`\`

---

## ${isId ? 'Penjelasan' : 'Explanation'}

${exp}

---

## ${isId ? 'Eksperimen' : 'Experiments'}

${exp.split('\n').map((l) => l.trim()).filter((l) => l.startsWith('##')).map((h, i) => `${i + 1}. **${h.replace(/^#+\s*/, '')}**`).join('\n')}

---

## ${isId ? 'Tantangan' : 'Challenge'}

${ch}

---

## ${isId ? 'Ringkasan' : 'Summary'}

${sum}
`;

    fs.writeFileSync(path.join(langDir, filename), content);

    // Write project files JSON for StackBlitz playground
    const filesJson = path.join(langDir, `lesson${lesson.num}-${lesson.topicId}.json`);
    fs.writeFileSync(filesJson, JSON.stringify(lesson.files, null, 2));
  }

  console.log(`  ${lesson.num}. ${lesson.titleId} / ${lesson.titleEn}`);
}

const total = LESSONS.length * 2;
console.log(`\nGenerated ${total} Laravel curriculum files (${LESSONS.length} lessons x 2 languages)`);
console.log(`  Output: ${BASE_DIR}`);
