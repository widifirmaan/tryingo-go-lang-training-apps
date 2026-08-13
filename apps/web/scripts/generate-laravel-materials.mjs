import { BaseGenerator } from './lib/base-generator.mjs';

// ─────────────────────────────────────────────────────────────────────────────
// LARAVEL CURRICULUM — pure research, zero framework influence
// Sources: Laravel Official Docs, Laravel Daily, Laracasts, Laravel News,
//          Codecourse, Laravel Bootcamp, Freek Van der Herten
// ─────────────────────────────────────────────────────────────────────────────
// Research consensus: 3 levels, 12 weeks total
//   Beginner (4w): setup → routing → blade → eloquent
//   Intermediate (4w): auth → relationships → validation → file storage
//   Advanced (4w): testing → queues → APIs → project
// Total: 12 weeks
// ─────────────────────────────────────────────────────────────────────────────

const gen = new BaseGenerator('laravel', 'Laravel');

const LEVELS = [
  {
    levelId: 'beginer',
    nameId: 'Pemula',
    nameEn: 'Beginner',
    descId: 'Fundamental Laravel: setup, routing, Blade template, dan Eloquent ORM.',
    descEn: 'Laravel fundamentals: setup, routing, Blade templates, and Eloquent ORM.',
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah',
    nameEn: 'Intermediate',
    descId: 'Laravel menengah: authentication, relasi database, validasi, dan file storage.',
    descEn: 'Intermediate Laravel: authentication, database relationships, validation, and file storage.',
  },
  {
    levelId: 'advanced',
    nameId: 'Lanjutan',
    nameEn: 'Advanced',
    descId: 'Laravel lanjutan: testing, queues, REST API, dan capstone project.',
    descEn: 'Advanced Laravel: testing, queues, REST API, and capstone project.',
  },
];

const MODULES = [
  // ── BEGINNER (weeks 1-4) ──────────────────────────────────────────────────
  {
    week: 1, level: 'beginer', topicId: 'setup-laravel',
    titleId: 'Setup & Instalasi Laravel', titleEn: 'Setup & Laravel Installation',
    programId: 'Project Pertama', programEn: 'First Project',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'php',
    code: `<?php
// Terminal commands (simulated output)
echo "=== Laravel Setup ===<br>";
echo "composer create-project laravel/laravel my-app<br>";
echo "cd my-app<br>";
echo "php artisan serve<br>";
echo "Server running on http://localhost:8000<br><br>";

// Directory structure
echo "=== Laravel Directory Structure ===<br>";
$dirs = [
    "app/",
    "  Console/Commands/",
    "  Http/Controllers/",
    "  Http/Middleware/",
    "  Models/",
    "  Providers/",
    "bootstrap/",
    "config/",
    "database/migrations/",
    "database/seeders/",
    "public/",
    "resources/views/",
    "routes/",
    "storage/",
    "tests/",
];
foreach ($dirs as $dir) {
    echo "  $dir<br>";
}

echo "<br>=== Key Files ===<br>";
echo "routes/web.php — Web routes<br>";
echo "app/Http/Controllers/ — Controllers<br>";
echo "app/Models/ — Eloquent models<br>";
echo "resources/views/ — Blade templates<br>";
echo "database/migrations/ — Database schema<br>";
echo ".env — Environment config<br>";

echo "<br>=== artisan Commands ===<br>";
echo "php artisan serve — Start dev server<br>";
echo "php artisan make:controller Name — Create controller<br>";
echo "php artisan make:model Name — Create model<br>";
echo "php artisan migrate — Run migrations<br>";
echo "php artisan route:list — Show all routes<br>";
>`,
    objectivesId: [
      'Install Laravel via Composer (Laravel Docs: Installation)',
      'Memahami struktur folder Laravel: app, routes, resources, database',
      'Artisan CLI: serve, make:controller, make:model, migrate',
      'File .env untuk environment configuration',
      'Routes: routes/web.php dan routes/api.php',
    ],
    objectivesEn: [
      'Install Laravel via Composer (Laravel Docs: Installation)',
      'Understand Laravel folder structure: app, routes, resources, database',
      'Artisan CLI: serve, make:controller, make:model, migrate',
      '.env file for environment configuration',
      'Routes: routes/web.php and routes/api.php',
    ],
    explanationId: '### Instalasi Laravel\n\`composer create-project laravel/laravel nama-project\`. Alternatif: \`laravel new\`.\n\n### Struktur Folder\n- \`app/\` — Business logic (Controllers, Models, Middleware)\n- \`routes/\` — Route definitions\n- \`resources/views/\` — Blade templates\n- \`database/migrations/\` — Schema versioning\n- \`public/\` — Entry point (index.php)\n\n### Artisan CLI\nCommand-line tool untuk scaffolding, migration, testing, dan banyak lagi.\n\n### Routes\n\`routes/web.php\` untuk web pages, \`routes/api.php\` untuk API.',
    explanationEn: '### Laravel Installation\n\`composer create-project laravel/laravel name\`. Alternative: \`laravel new\`.\n\n### Folder Structure\n- \`app/\` — Business logic\n- \`routes/\` — Route definitions\n- \`resources/views/\` — Blade templates\n- \`database/migrations/\` — Schema versioning\n- \`public/\` — Entry point\n\n### Artisan CLI\nCLI tool for scaffolding, migrations, testing.\n\n### Routes\n\`routes/web.php\` for web, \`routes/api.php\` for API.',
    experimentsId: [
      'Buat project baru dengan laravel new',
      'Jelajahi setiap folder dan lihat isinya',
      'Coba artisan list untuk semua commands',
      'Buat route sederhana di web.php',
      'Pindah ke config/ dan lihat file konfigurasi',
    ],
    experimentsEn: [
      'Create new project with laravel new',
      'Explore each folder and its contents',
      'Try artisan list for all commands',
      'Create simple route in web.php',
      'Navigate config/ and view config files',
    ],
    challengeId: 'Buat project Laravel baru dengan 3 routes: home (/), about (/about), contact (/contact). Tampilkan teks berbeda di setiap route.',
    challengeEn: 'Create a new Laravel project with 3 routes: home (/), about (/about), contact (/contact). Display different text on each route.',
    summaryId: 'Minggu 1 dari 12: **Setup & Instalasi Laravel** (Level: Pemula). Fondasi Laravel dimulai. Minggu depan: **Routing & Controllers**.',
    summaryEn: 'Week 1 of 12: **Setup & Laravel Installation** (Level: Beginner). Laravel foundation begins. Next week: **Routing & Controllers**.',
  },
  {
    week: 2, level: 'beginer', topicId: 'routing-controllers',
    titleId: 'Routing & Controllers', titleEn: 'Routing & Controllers',
    programId: 'Route & Controller', programEn: 'Route & Controller',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'php',
    code: `<?php
echo "=== Laravel Routing ===<br><br>";

// routes/web.php (simulated)
$routes = [
    ["GET", "/", "HomeController@index", "home"],
    ["GET", "/about", "PageController@about", "about"],
    ["GET", "/users", "UserController@index", "users.index"],
    ["GET", "/users/{id}", "UserController@show", "users.show"],
    ["POST", "/users", "UserController@store", "users.store"],
    ["PUT", "/users/{id}", "UserController@update", "users.update"],
    ["DELETE", "/users/{id}", "UserController@destroy", "users.destroy"],
];

echo "Method | URI | Action | Name<br>";
echo "-------|-----|--------|------<br>";
foreach ($routes as [$method, $uri, $action, $name]) {
    echo "$method | $uri | $action | $name<br>";
}

echo "<br>=== Route Parameters ===<br>";
echo "Route::get('/posts/{post}', function (Post $post) {<br>";
echo "    return $post->title;<br>";
echo "});<br><br>";

echo "=== Route Model Binding ===<br>";
echo "public function show(Post $post)  // Auto-resolve by id<br>";
echo "public function show(Post $post:slug)  // Resolve by slug<br><br>";

echo "=== Resource Route ===<br>";
echo "Route::resource('posts', PostController::class);<br>";
echo "Creates: index, create, store, show, edit, update, destroy<br><br>";

echo "=== Controller Example ===<br>";
echo "php artisan make:controller PostController --resource<br>";
>`,
    objectivesId: [
      'Route definition: Route::get, post, put, delete, patch, options',
      'Route parameters: required {id} dan optional {id?}',
      'Route model binding: implicit binding dengan type-hint',
      'Route naming: name() dan route() helper',
      'Resource routes: Route::resource untuk CRUD otomatis',
    ],
    objectivesEn: [
      'Route definition: Route::get, post, put, delete, patch, options',
      'Route parameters: required {id} and optional {id?}',
      'Route model binding: implicit binding with type-hint',
      'Route naming: name() and route() helper',
      'Resource routes: Route::resource for automatic CRUD',
    ],
    explanationId: '### Route Definition\n\`Route::get($uri, $callback)\`. HTTP method sesuai verb.\n\n### Route Parameters\n\`{id}\` required, \`{id?}\` optional. Diinject ke callback/controller.\n\n### Model Binding\nType-hint model di controller parameter. Laravel auto-resolve by id atau field.\n\n### Resource Routes\n\`Route::resource(\'posts\', PostController)\` generate 7 routes CRUD sekaligus.\n\n### Route Groups\n\`Route::middleware([\'auth\'])->group(function () {})\` untuk apply middleware.',
    explanationEn: '### Route Definition\n\`Route::get($uri, $callback)\`. HTTP method matches verb.\n\n### Route Parameters\n\`{id}\` required, \`{id?}\` optional. Injected to callback.\n\n### Model Binding\nType-hint model in controller. Laravel auto-resolves.\n\n### Resource Routes\n\`Route::resource()\` generates 7 CRUD routes.\n\n### Route Groups\nGroup routes with shared middleware/prefix.',
    experimentsId: [
      'Buat route dengan multiple parameters',
      'Coba route model binding dengan slug',
      'Buat route group dengan prefix dan middleware',
      'Gunakan Route::view untuk static page',
      'Implementasikan fallback route untuk 404',
    ],
    experimentsEn: [
      'Create route with multiple parameters',
      'Try route model binding with slug',
      'Create route group with prefix and middleware',
      'Use Route::view for static page',
      'Implement fallback route for 404',
    ],
    challengeId: 'Buat routes untuk blog: list posts, single post, create, edit, delete. Gunakan resource controller dan named routes.',
    challengeEn: 'Create routes for a blog: list posts, single post, create, edit, delete. Use resource controller and named routes.',
    summaryId: 'Minggu 2 dari 12: **Routing & Controllers** (Level: Pemula). Heart of Laravel. Minggu depan: **Blade Templates**.',
    summaryEn: 'Week 2 of 12: **Routing & Controllers** (Level: Beginner). Heart of Laravel. Next week: **Blade Templates**.',
  },
  {
    week: 3, level: 'beginer', topicId: 'blade-templates',
    titleId: 'Blade Templates', titleEn: 'Blade Templates',
    programId: 'Template Engine', programEn: 'Template Engine',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'php',
    code: `<?php
echo "=== Blade Templates ===<br><br>";

echo "=== Syntax Dasar ===<br>";
echo "{{ \$variable }}  — Echo escaped<br>";
echo "{{{ \$variable }}}  — Echo raw (deprecated, use !!})<br>";
echo "{{ !! \$html !!}}  — Echo unescaped<br>";
echo "@{{ not parsed }}  — Escape blade<br><br>";

echo "=== Control Structures ===<br>";
echo "@if(\$condition) ... @endif<br>";
echo "@unless(\$condition) ... @endunless<br>";
echo "@foreach(\$items as \$item) ... @endforeach<br>";
echo "@for(\$i = 0; \$i < 10; \$i++) ... @endfor<br>";
echo "@while(\$condition) ... @endwhile<br><br>";

echo "=== Layout & Sections ===<br>";
echo "@extends('layouts.app')<br>";
echo "@section('title', 'Home')<br>";
echo "@section('content')<br>";
echo "    <h1>Welcome</h1><br>";
echo "@endsection<br><br>";

echo "=== Components ===<br>";
echo "<x-alert type='error' :message='\$error' /><br>";
echo "<x-button>Click me</x-button><br><br>";

echo "=== Loops ===<br>";
\$posts = [
    ["title" => "Post 1", "author" => "Budi"],
    ["title" => "Post 2", "author" => "Siti"],
    ["title" => "Post 3", "author" => "Andi"],
];

echo "@foreach(\$posts as \$post)<br>";
foreach ($posts as $post) {
    echo "    {{ \$post['title'] }} by {{ \$post['author'] }}<br>";
}
echo "@endforeach<br><br>";

echo "@forelse(\$posts as \$post)<br>";
echo "    {{ \$post->title }}<br>";
echo "@empty<br>";
echo "    No posts found<br>";
echo "@endforelse<br><br>";

echo "=== CSRF & Method ===<br>";
echo "@csrf  — CSRF token field<br>";
echo "@method('DELETE')  — Spoof HTTP method<br>";
>`,
    objectivesId: [
      'Blade syntax: {{ }} untuk echo, @ untuk directives',
      'Layout system: @extends, @section, @yield, @parent',
      'Components: <x-component> untuk reusable UI',
      'Control structures: @if, @foreach, @forelse, @unless',
      'CSRF protection: @csrf dan method spoofing: @method',
    ],
    objectivesEn: [
      'Blade syntax: {{ }} for echo, @ for directives',
      'Layout system: @extends, @section, @yield, @parent',
      'Components: <x-component> for reusable UI',
      'Control structures: @if, @foreach, @forelse, @unless',
      'CSRF protection: @csrf and method spoofing: @method',
    ],
    explanationId: '### Echo Syntax\n\`{{ $var }}\` auto-escape HTML (anti-XSS). \`{!! !!}\` untuk raw HTML.\n\n### Layout\n\`@extends(\'layouts.app\')\` inherit layout. \`@section(\'content\')\` inject content. \`@yield(\'content\')\` placeholder.\n\n### Components\n\`<x-alert>\` reusable component. Di-compile ke PHP. Slot untuk content.\n\n### Directives\n\`@if\`, \`@foreach\`, \`@forelse\` (dengan @empty), \`@csrf\`, \`@method(\'PUT\')\`.\n\n### Blade & JavaScript\n\`@{{ }}\` escape untuk framework JS seperti Vue.',
    explanationEn: '### Echo Syntax\n\`{{ $var }}\` auto-escapes HTML. \`{!! !!}\` for raw HTML.\n\n### Layouts\n\`@extends()\` inherits layout. \`@section()\` injects content. \`@yield()\` placeholder.\n\n### Components\n\`<x-alert>\` reusable components compiled to PHP.\n\n### Directives\n\`@if\`, \`@foreach\`, \`@forelse\` (with @empty), \`@csrf\`, \`@method()\`.\n\n### Blade & JS\n\`@{{ }}\` escapes for JS frameworks.',
    experimentsId: [
      'Buat layout master dengan section header, content, footer',
      'Buat component alert dengan type dan message',
      'Implementasikan nested foreach untuk data',
      'Coba @forelse dengan data kosong',
      'Gunakan @auth dan @guest untuk conditional display',
    ],
    experimentsEn: [
      'Create master layout with header, content, footer sections',
      'Create alert component with type and message',
      'Implement nested foreach for data',
      'Try @forelse with empty data',
      'Use @auth and @guest for conditional display',
    ],
    challengeId: 'Buat layout blog lengkap: header, footer, sidebar. Buat halaman home menampilkan daftar posts dengan foreach. Buat component card untuk post.',
    challengeEn: 'Create a complete blog layout: header, footer, sidebar. Create home page displaying post list with foreach. Create card component for posts.',
    summaryId: 'Minggu 3 dari 12: **Blade Templates** (Level: Pemula). View layer Laravel. Minggu depan: **Eloquent ORM**.',
    summaryEn: 'Week 3 of 12: **Blade Templates** (Level: Beginner). View layer of Laravel. Next week: **Eloquent ORM**.',
  },
  {
    week: 4, level: 'beginer', topicId: 'eloquent-orm',
    titleId: 'Eloquent ORM', titleEn: 'Eloquent ORM',
    programId: 'Database dengan Eloquent', programEn: 'Database with Eloquent',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'php',
    code: `<?php
echo "=== Eloquent ORM ===<br><br>";

echo "=== Model & Migration ===<br>";
echo "// app/Models/Post.php<br>";
echo "class Post extends Model {<br>";
echo "    protected \$fillable = ['title', 'body', 'user_id'];<br>";
echo "    public function user() { return \$this->belongsTo(User::class); }<br>";
echo "}<br><br>";

echo "=== CRUD Operations ===<br>";
$posts = [
    ["id" => 1, "title" => "Belajar Laravel", "body" => "...", "user_id" => 1],
    ["id" => 2, "title" => "Eloquent Dasar", "body" => "...", "user_id" => 2],
    ["id" => 3, "title" => "Blade Template", "body" => "...", "user_id" => 1],
];

echo "// Create<br>";
echo "Post::create(['title' => 'New Post', 'body' => 'Content', 'user_id' => 1]);<br><br>";

echo "// Read<br>";
echo "Post::all();           // All posts<br>";
echo "Post::find(1);         // By primary key<br>";
echo "Post::where('user_id', 1)->get();  // With condition<br>";
echo "Post::first();         // First record<br><br>";

echo "// Update<br>";
echo "\$post = Post::find(1);<br>";
echo "\$post->title = 'Updated';<br>";
echo "\$post->save();<br>";
echo "Post::where('id', 1)->update(['title' => 'Updated']);<br><br>";

echo "// Delete<br>";
echo "\$post->delete();<br>";
echo "Post::destroy(1);<br><br>";

echo "=== Query Builder ===<br>";
echo "Post::where('user_id', 1)<br>";
echo "    ->where('published', true)<br>";
echo "    ->orderBy('created_at', 'desc')<br>";
echo "    ->limit(10)<br>";
echo "    ->get();<br><br>";

echo "=== Mass Assignment ===<br>";
echo "protected \$fillable = ['title', 'body'];<br>";
echo "protected \$guarded = ['is_admin'];<br><br>";

echo "=== Timestamps ===<br>";
echo "public \$timestamps = true;  // created_at & updated_at<br>";
echo "const CREATED_AT = 'created_at';<br>";
echo "const UPDATED_AT = 'updated_at';<br>";
>`,
    objectivesId: [
      'Eloquent Model: representasi tabel database sebagai class',
      'CRUD: create, find, where, update, delete',
      'Mass assignment: fillable dan guarded properties',
      'Query builder: where, orderBy, limit, get, first',
      'Timestamps: created_at dan updated_at otomatis',
    ],
    objectivesEn: [
      'Eloquent Model: database table representation as class',
      'CRUD: create, find, where, update, delete',
      'Mass assignment: fillable and guarded properties',
      'Query builder: where, orderBy, limit, get, first',
      'Timestamps: automatic created_at and updated_at',
    ],
    explanationId: '### Model\nSetiap tabel punya model. Convention: model \`Post\` → tabel \`posts\`.\n\n### CRUD\n\`Model::create($data)\`, \`Model::find($id)\`, \`Model::where()->get()\`, \`$model->save()\`, \`$model->delete()\`.\n\n### Mass Assignment\n\`$fillable\` — field yang boleh diisi mass. \`$guarded\` — field yang dilarang.\n\n### Query Builder\nChain methods: \`where()\`, \`orderBy()\`, \`limit()\`, \`get()\`, \`first()\`, \`count()\`.\n\n### Timestamps\nOtomatis manage \`created_at\` dan \`updated_at\`. Set \`public $timestamps = false\` untuk disable.',
    explanationEn: '### Models\nEach table has a model. Convention: model \`Post\` → table \`posts\`.\n\n### CRUD\n\`Model::create()\`, \`Model::find()\`, \`Model::where()->get()\`, \`$model->save()\`, \`$model->delete()\`.\n\n### Mass Assignment\n\`$fillable\` — fields allowed for mass assignment. \`$guarded\` — fields protected.\n\n### Query Builder\nChain methods: \`where()\`, \`orderBy()\`, \`limit()\`, \`get()\`, \`first()\`.\n\n### Timestamps\nAuto-manages \`created_at\` and \`updated_at\`.',
    experimentsId: [
      'Buat model dengan migration dan coba CRUD',
      'Gunakan firstOrCreate untuk avoid duplicate',
      'Coba chunk untuk proses data besar',
      'Implementasikan soft delete',
      'Buat scope query dengan local scope',
    ],
    experimentsEn: [
      'Create model with migration and try CRUD',
      'Use firstOrCreate to avoid duplicates',
      'Try chunk for large data processing',
      'Implement soft delete',
      'Create query scope with local scope',
    ],
    challengeId: 'Buat model Post dengan migration. Implementasikan CRUD lengkap: create, read (all, by id, by user), update, delete. Gunakan mass assignment.',
    challengeEn: 'Create Post model with migration. Implement full CRUD: create, read (all, by id, by user), update, delete. Use mass assignment.',
    summaryId: 'Minggu 4 dari 12: **Eloquent ORM** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Authentication** (Intermediate).',
    summaryEn: 'Week 4 of 12: **Eloquent ORM** (Level: Beginner). Beginner phase complete! Next week: **Authentication** (Intermediate).',
  },
  // ── INTERMEDIATE (weeks 5-8) ──────────────────────────────────────────────
  {
    week: 5, level: 'intermediate', topicId: 'authentication',
    titleId: 'Authentication & Authorization', titleEn: 'Authentication & Authorization',
    programId: 'Login System', programEn: 'Login System',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'php',
    code: `<?php
echo "=== Laravel Authentication ===<br><br>";

echo "=== Breeze / Jetstream ===<br>";
echo "composer require laravel/breeze --dev<br>";
echo "php artisan breeze:install<br>";
echo "npm install && npm run dev<br>";
echo "php artisan migrate<br><br>";

echo "=== Auth Facade ===<br>";
echo "Auth::attempt(['email' => \$email, 'password' => \$password]);<br>";
echo "Auth::login(\$user);<br>";
echo "Auth::logout();<br>";
echo "Auth::check();     // Is logged in?<br>";
echo "Auth::user();      // Current user<br>";
echo "Auth::id();        // Current user id<br><br>";

echo "=== Login Simulation ===<br>";
$users = [
    ["id" => 1, "email" => "admin@example.com", "password" => password_hash("secret123", PASSWORD_DEFAULT), "role" => "admin"],
    ["id" => 2, "email" => "user@example.com", "password" => password_hash("pass456", PASSWORD_DEFAULT), "role" => "user"],
];

$input_email = "admin@example.com";
$input_password = "secret123";

$authenticated = false;
foreach ($users as $user) {
    if ($user['email'] === $input_email && password_verify($input_password, $user['password'])) {
        $authenticated = true;
        echo "Login success! Welcome, {$user['email']}<br>";
        echo "Role: {$user['role']}<br>";
        break;
    }
}
if (!$authenticated) {
    echo "Login failed!<br>";
}

echo "<br>=== Middleware Auth ===<br>";
echo "Route::middleware(['auth'])->group(function () {<br>";
echo "    Route::get('/dashboard', [DashboardController::class, 'index']);<br>";
echo "});<br><br>";

echo "=== Gates & Policies ===<br>";
echo "Gate::define('edit-post', function (User \$user, Post \$post) {<br>";
echo "    return \$user->id === \$post->user_id;<br>";
echo "});<br><br>";

echo "=== Blade Auth ===<br>";
echo "@auth ... @endauth<br>";
echo "@guest ... @endguest<br>";
echo "@can('edit-post', \$post) ... @endcan<br>";
>`,
    objectivesId: [
      'Laravel Breeze: lightweight auth scaffolding',
      'Auth Facade: attempt, login, logout, check, user',
      'Middleware auth: protect routes dengan authentication',
      'Gates & Policies: authorization logic',
      'Blade directives: @auth, @guest, @can',
    ],
    objectivesEn: [
      'Laravel Breeze: lightweight auth scaffolding',
      'Auth Facade: attempt, login, logout, check, user',
      'Middleware auth: protect routes with authentication',
      'Gates & Policies: authorization logic',
      'Blade directives: @auth, @guest, @can',
    ],
    explanationId: '### Breeze\nScaffolding minimal: login, register, password reset. \`php artisan breeze:install\`.\n\n### Auth Facade\n\`Auth::attempt()\` cek credentials, \`Auth::login()\` manual login, \`Auth::user()\` current user.\n\n### Middleware\n\`Route::middleware([\'auth\'])\` — redirect ke login jika belum auth.\n\n### Gates & Policies\nGate: closure-based authorization. Policy: class-based untuk model.\n\n### Blade\n\`@auth\` hanya tampil jika login, \`@guest\` jika belum, \`@can\` untuk policy check.',
    explanationEn: '### Breeze\nMinimal scaffolding: login, register, password reset.\n\n### Auth Facade\n\`Auth::attempt()\` checks credentials, \`Auth::user()\` current user.\n\n### Middleware\n\`Route::middleware([\'auth\'])\` redirects to login if unauthenticated.\n\n### Gates & Policies\nGate: closure-based. Policy: class-based for models.\n\n### Blade\n\`@auth\` if logged in, \`@guest\` if not, \`@can\` for policy check.',
    experimentsId: [
      'Install Laravel Breeze dan explore generated files',
      'Buat custom guard untuk multi-auth',
      'Implementasikan role-based access dengan Gate',
      'Buat Policy untuk Post model',
      'Coba remember me functionality',
    ],
    experimentsEn: [
      'Install Laravel Breeze and explore generated files',
      'Create custom guard for multi-auth',
      'Implement role-based access with Gate',
      'Create Policy for Post model',
      'Try remember me functionality',
    ],
    challengeId: 'Buat sistem auth lengkap: register, login, logout, middleware protection, role-based access (admin/user).',
    challengeEn: 'Build a complete auth system: register, login, logout, middleware protection, role-based access (admin/user).',
    summaryId: 'Minggu 5 dari 12: **Authentication & Authorization** (Level: Menengah). Keamanan aplikasi. Minggu depan: **Database Relationships**.',
    summaryEn: 'Week 5 of 12: **Authentication & Authorization** (Level: Intermediate). Application security. Next week: **Database Relationships**.',
  },
  {
    week: 6, level: 'intermediate', topicId: 'relationships',
    titleId: 'Database Relationships', titleEn: 'Database Relationships',
    programId: 'Relasi Eloquent', programEn: 'Eloquent Relations',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'php',
    code: `<?php
echo "=== Eloquent Relationships ===<br><br>";

echo "=== One to One ===<br>";
echo "class User extends Model {<br>";
echo "    public function profile() {<br>";
echo "        return \$this->hasOne(Profile::class);<br>";
echo "    }<br>";
echo "}<br>";
echo "\$user->profile;  // Get user profile<br><br>";

echo "=== One to Many ===<br>";
echo "class Post extends Model {<br>";
echo "    public function comments() {<br>";
echo "        return \$this->hasMany(Comment::class);<br>";
echo "    }<br>";
echo "}<br>";
echo "\$post->comments;  // All comments<br>";
echo "Comment::whereBelongsTo(\$post)->get();<br><br>";

echo "=== Many to Many ===<br>";
echo "class User extends Model {<br>";
echo "    public function roles() {<br>";
echo "        return \$this->belongsToMany(Role::class);<br>";
echo "    }<br>";
echo "}<br>";
echo "\$user->roles()->attach(\$roleId);<br>";
echo "\$user->roles()->detach(\$roleId);<br>";
echo "\$user->roles()->sync([1, 2, 3]);<br><br>";

echo "=== Has Many Through ===<br>";
echo "class Country extends Model {<br>";
echo "    public function posts() {<br>";
echo "        return \$this->hasManyThrough(Post::class, User::class);<br>";
echo "    }<br>";
echo "}<br><br>";

echo "=== Polymorphic ===<br>";
echo "class Comment extends Model {<br>";
echo "    public function commentable() {<br>";
echo "        return \$this->morphTo();<br>";
echo "    }<br>";
echo "}<br>";
echo "\$post->comments;  // Polymorphic comments<br><br>";

echo "=== Eager Loading ===<br>";
echo "Post::with('user', 'comments')->get();<br>";
echo "Post::withCount('comments')->get();<br>";
echo "Post::whereHas('comments', fn(\$q) => \$q->where('approved', true))->get();<br>";
>`,
    objectivesId: [
      'One to One: hasOne dan belongsTo',
      'One to Many: hasMany dan belongsTo',
      'Many to Many: belongsToMany dengan pivot table',
      'Eager Loading: with() untuk solve N+1 problem',
      'Polymorphic: morphTo untuk relasi multi-model',
    ],
    objectivesEn: [
      'One to One: hasOne and belongsTo',
      'One to Many: hasMany and belongsTo',
      'Many to Many: belongsToMany with pivot table',
      'Eager Loading: with() to solve N+1 problem',
      'Polymorphic: morphTo for multi-model relations',
    ],
    explanationId: '### One to One\n\`hasOne()\` — user punya satu profile. \`belongsTo()\` — profile milik satu user.\n\n### One to Many\n\`hasMany()\` — post punya banyak comment. \`belongsTo()\` — comment milik satu post.\n\n### Many to Many\n\`belongsToMany()\` — user punya banyak role via pivot table \`role_user\`.\n\n### Eager Loading\n\`with(\'user\')\` load relasi di 1 query. Tanpa ini = N+1 problem.\n\n### Polymorphic\n\`morphTo()\` — comment bisa milik post ATAU video. Tabel: \`commentable_id\`, \`commentable_type\`.',
    explanationEn: '### One to One\n\`hasOne()\` — user has one profile. \`belongsTo()\` — profile belongs to user.\n\n### One to Many\n\`hasMany()\` — post has many comments. \`belongsTo()\` — comment belongs to post.\n\n### Many to Many\n\`belongsToMany()\` — user has many roles via pivot table.\n\n### Eager Loading\n\`with(\'user\')\` loads relation in 1 query. Without = N+1 problem.\n\n### Polymorphic\n\`morphTo()\` — comment can belong to post OR video.',
    experimentsId: [
      'Buat relasi One to One dan coba akses',
      'Implementasikan Many to Many dengan pivot data',
      'Coba Lazy Easing Load: load()',
      'Buat Polymorphic relation untuk image',
      'Gunakan whereHas untuk filter by relation',
    ],
    experimentsEn: [
      'Create One to One relation and try accessing',
      'Implement Many to Many with pivot data',
      'Try Lazy Eager Loading: load()',
      'Create Polymorphic relation for images',
      'Use whereHas to filter by relation',
    ],
    challengeId: 'Buat sistem blog dengan relasi: User hasMany Post, Post hasMany Comment, Post belongsToMany Tag. Gunakan eager loading.',
    challengeEn: 'Build a blog system with relations: User hasMany Post, Post hasMany Comment, Post belongsToMany Tag. Use eager loading.',
    summaryId: 'Minggu 6 dari 12: **Database Relationships** (Level: Menengah). Kekuatan Eloquent. Minggu depan: **Validation & Form Requests**.',
    summaryEn: 'Week 6 of 12: **Database Relationships** (Level: Intermediate). Eloquent\'s power. Next week: **Validation & Form Requests**.',
  },
  {
    week: 7, level: 'intermediate', topicId: 'validation',
    titleId: 'Validation & Form Requests', titleEn: 'Validation & Form Requests',
    programId: 'Validasi Form', programEn: 'Form Validation',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'php',
    code: `<?php
echo "=== Laravel Validation ===<br><br>";

echo "=== Validator Facade ===<br>";
echo "Validator::make(\$request->all(), [<br>";
echo "    'name' => 'required|string|max:255',<br>";
echo "    'email' => 'required|email|unique:users',<br>";
echo "    'password' => 'required|min:8|confirmed',<br>";
echo "    'age' => 'nullable|integer|min:17',<br>";
echo "]);<br><br>";

echo "=== Validate in Controller ===<br>";
echo "public function store(Request \$request) {<br>";
echo "    \$validated = \$request->validate([<br>";
echo "        'title' => 'required|string|max:255',<br>";
echo "        'body' => 'required|string',<br>";
echo "        'published_at' => 'nullable|date',<br>";
echo "    ]);<br>";
echo "    Post::create(\$validated);<br>";
echo "}<br><br>";

echo "=== Form Request ===<br>";
echo "class StorePostRequest extends FormRequest {<br>";
echo "    public function rules(): array {<br>";
echo "        return [<br>";
echo "            'title' => 'required|string|max:255',<br>";
echo "            'body' => 'required|string',<br>";
echo "        ];<br>";
echo "    }<br>";
echo "}<br><br>";

echo "=== Validation Simulation ===<br>";
$inputs = [
    "title" => "",
    "email" => "invalid-email",
    "password" => "123",
    "age" => "15",
];

$rules = [
    "title" => "required|string|max:255",
    "email" => "required|email",
    "password" => "required|min:8",
    "age" => "nullable|integer|min:17",
];

$errors = [];
if (empty($inputs['title'])) {
    $errors['title'][] = "The title field is required.";
}
if (!filter_var($inputs['email'], FILTER_VALIDATE_EMAIL)) {
    $errors['email'][] = "The email must be a valid email address.";
}
if (strlen($inputs['password']) < 8) {
    $errors['password'][] = "The password must be at least 8 characters.";
}
if ($inputs['age'] !== null && (int)$inputs['age'] < 17) {
    $errors['age'][] = "The age must be at least 17.";
}

echo "Validation errors:<br>";
foreach ($errors as $field => $msgs) {
    foreach ($msgs as $msg) {
        echo "  - $field: $msg<br>";
    }
}

echo "<br>=== Custom Rules ===<br>";
echo "Rule::unique('users')->ignore(\$user->id);<br>";
echo "Rule::in(['admin', 'user', 'moderator']);<br>";
echo "Rule::password()->min(8)->mixedCase()->numbers();<br>";
>`,
    objectivesId: [
      'Validator::make dan $request->validate()',
      'Validation rules: required, string, email, max, min, unique',
      'Form Request class untuk validasi terpisah dari controller',
      'Custom error messages dan attribute names',
      'Custom validation rules dengan Rule class',
    ],
    objectivesEn: [
      'Validator::make and $request->validate()',
      'Validation rules: required, string, email, max, min, unique',
      'Form Request class for validation separated from controller',
      'Custom error messages and attribute names',
      'Custom validation rules with Rule class',
    ],
    explanationId: '### Validator\n\`$request->validate($rules)\` — auto-redirect dengan errors jika gagal.\n\n### Rules\n\`required\`, \`string\`, \`email\`, \`max:255\`, \`min:8\`, \`unique:table,column\`, \`confirmed\`.\n\n### Form Request\nClass terpisah untuk validasi complex. \`php artisan make:request StorePostRequest\`.\n\n### Error Messages\nOtomatis di \`$errors\` variable di Blade. \`@error(\'field\') {{ $message }} @enderror\`.\n\n### Custom Rules\n\`Rule::unique(\'users\')->ignore($id)\`, \`Rule::password()->min(8)\`.',
    explanationEn: '### Validator\n\`$request->validate($rules)\` — auto-redirects with errors on failure.\n\n### Rules\n\`required\`, \`string\`, \`email\`, \`max:255\`, \`min:8\`, \`unique:table,column\`.\n\n### Form Request\nSeparate class for complex validation. \`php artisan make:request\`.\n\n### Error Messages\nAuto in \`$errors\` variable. \`@error(\'field\') {{ $message }} @enderror\`.\n\n### Custom Rules\n\`Rule::unique()->ignore($id)\`, \`Rule::password()->min(8)\`.',
    experimentsId: [
      'Buat Form Request dengan 5+ rules',
      'Coba conditional validation: required_if, prohibited_if',
      'Buat custom rule object dengn php artisan make:rule',
      'Implementasikan validation untuk array input',
      'Coba sometimes untuk conditional validation',
    ],
    experimentsEn: [
      'Create Form Request with 5+ rules',
      'Try conditional validation: required_if, prohibited_if',
      'Create custom rule object with php artisan make:rule',
      'Implement validation for array input',
      'Try sometimes for conditional validation',
    ],
    challengeId: 'Buat form registrasi dengan validasi lengkap: name, email (unique), password (confirmed, min 8), phone (optional, numeric). Gunakan Form Request.',
    challengeEn: 'Create a registration form with complete validation: name, email (unique), password (confirmed, min 8), phone (optional, numeric). Use Form Request.',
    summaryId: 'Minggu 7 dari 12: **Validation & Form Requests** (Level: Menengah). Input sanitization. Minggu depan: **File Storage**.',
    summaryEn: 'Week 7 of 12: **Validation & Form Requests** (Level: Intermediate). Input sanitization. Next week: **File Storage**.',
  },
  {
    week: 8, level: 'intermediate', topicId: 'file-storage',
    titleId: 'File Storage & Upload', titleEn: 'File Storage & Upload',
    programId: 'Upload System', programEn: 'Upload System',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'php',
    code: `<?php
echo "=== Laravel File Storage ===<br><br>";

echo "=== Storage Facade ===<br>";
echo "Storage::disk('local')->put('file.txt', \$contents);<br>";
echo "Storage::disk('public')->put('avatar.jpg', \$file);<br>";
echo "Storage::disk('s3')->put('backup.zip', \$contents);<br><br>";

echo "=== File Upload ===<br>";
echo "class PhotoController extends Controller {<br>";
echo "    public function store(Request \$request) {<br>";
echo "        \$path = \$request->file('photo')->store('photos', 'public');<br>";
echo "        \$url = asset('storage/' . \$path);<br>";
echo "    }<br>";
echo "}<br><br>";

echo "=== File Validation ===<br>";
echo "\$request->validate([<br>";
echo "    'photo' => 'required|image|mimes:jpg,png|max:2048',<br>";
echo "]);<br><br>";

echo "=== Upload Simulation ===<br>";
$files = [
    ["name" => "avatar.jpg", "size" => 1024000, "type" => "image/jpeg", "valid" => true],
    ["name" => "document.pdf", "size" => 5120000, "type" => "application/pdf", "valid" => false],
    ["name" => "photo.png", "size" => 2048000, "type" => "image/png", "valid" => true],
];

foreach ($files as $file) {
    $status = $file['valid'] ? "OK" : "REJECTED";
    $sizeKB = round($file['size'] / 1024);
    echo "{$file['name']} ({$sizeKB}KB, {$file['type']}) — $status<br>";
}

echo "<br>=== Storage Operations ===<br>";
echo "Storage::exists('file.txt');     // Check file<br>";
echo "Storage::get('file.txt');        // Read file<br>";
echo "Storage::delete('file.txt');     // Delete file<br>";
echo "Storage::url('file.txt');        // Get URL<br>";
echo "Storage::size('file.txt');       // Get size<br>";
echo "Storage::lastModified('file.txt'); // Get date<br><br>";

echo "=== Symbolic Link ===<br>";
echo "php artisan storage:link<br>";
echo "public/storage → storage/app/public<br><br>";

echo "=== Disks Config ===<br>";
echo "// config/filesystems.php<br>";
echo "'disks' => [<br>";
echo "    'local' => ['driver' => 'local', 'root' => storage_path('app')],<br>";
echo "    'public' => ['driver' => 'local', 'root' => storage_path('app/public')],<br>";
echo "    's3' => ['driver' => 's3', ...],<br>";
echo "],<br>";
>`,
    objectivesId: [
      'Storage Facade: local, public, S3 disks',
      'File upload: store, storeAs, move',
      'File validation: image, mimes, max size',
      'Storage operations: exists, get, delete, url',
      'Symbolic link: php artisan storage:link',
    ],
    objectivesEn: [
      'Storage Facade: local, public, S3 disks',
      'File upload: store, storeAs, move',
      'File validation: image, mimes, max size',
      'Storage operations: exists, get, delete, url',
      'Symbolic link: php artisan storage:link',
    ],
    explanationId: '### Storage Facade\nAbstraction untuk file system. Disk: \`local\`, \`public\`, \`s3\`.\n\n### Upload\n\`$request->file(\'photo\')->store(\'folder\', \'disk\')\`. Auto-generate unique filename.\n\n### Validation\n\`image\`, \`mimes:jpg,png\`, \`max:2048\` (MB).\n\n### Operations\n\`Storage::exists()\`, \`get()\`, \`delete()\`, \`url()\`, \`size()\`.\n\n### Symbolic Link\n\`php artisan storage:link\` — link \`public/storage\` ke \`storage/app/public\`.',
    explanationEn: '### Storage Facade\nFile system abstraction. Disks: \`local\`, \`public\`, \`s3\`.\n\n### Upload\n\`$file->store(\'folder\', \'disk\')\`. Auto-generates unique filename.\n\n### Validation\n\`image\`, \`mimes:jpg,png\`, \`max:2048\` (MB).\n\n### Operations\n\`Storage::exists()\`, \`get()\`, \`delete()\`, \`url()\`.\n\n### Symbolic Link\n\`php artisan storage:link\` links public to storage.',
    experimentsId: [
      'Upload file dan simpan ke disk public',
      'Coba upload multiple files',
      'Buat custom disk untuk cloud storage',
      'Implementasikan image resize sebelum simpan',
      'Coba temporary URL untuk private files',
    ],
    experimentsEn: [
      'Upload file and save to public disk',
      'Try multiple file upload',
      'Create custom disk for cloud storage',
      'Implement image resize before saving',
      'Try temporary URLs for private files',
    ],
    challengeId: 'Buat sistem upload foto profil: validasi (image, max 2MB), simpan ke public disk, tampilkan preview, hapus foto lama saat ganti.',
    challengeEn: 'Build a profile photo upload system: validation (image, max 2MB), save to public disk, display preview, delete old photo on replace.',
    summaryId: 'Minggu 8 dari 12: **File Storage & Upload** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Testing** (Advanced).',
    summaryEn: 'Week 8 of 12: **File Storage & Upload** (Level: Intermediate). Intermediate phase complete! Next week: **Testing** (Advanced).',
  },
  // ── ADVANCED (weeks 9-12) ────────────────────────────────────────────────
  {
    week: 9, level: 'advanced', topicId: 'testing',
    titleId: 'Testing dengan PHPUnit', titleEn: 'Testing with PHPUnit',
    programId: 'Feature & Unit Test', programEn: 'Feature & Unit Test',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'php',
    code: `<?php
echo "=== Laravel Testing ===<br><br>";

echo "=== Unit Test ===<br>";
echo "class CalculatorTest extends TestCase {<br>";
echo "    public function test_add() {<br>";
echo "        \$result = app(Calculator::class)->add(2, 3);<br>";
echo "        \$this->assertEquals(5, \$result);<br>";
echo "    }<br>";
echo "}<br><br>";

echo "=== Feature Test ===<br>";
echo "class PostTest extends TestCase {<br>";
echo "    use RefreshDatabase;<br>";
echo "    <br>";
echo "    public function test_create_post() {<br>";
echo "        \$user = User::factory()->create();<br>";
echo "        \$response = \$this->actingAs(\$user)->post('/posts', [<br>";
echo "            'title' => 'Test Post',<br>";
echo "            'body' => 'Content here',<br>";
echo "        ]);<br>";
echo "        \$response->assertStatus(201);<br>";
echo "        \$this->assertDatabaseHas('posts', ['title' => 'Test Post']);<br>";
echo "    }<br>";
echo "}<br><br>";

echo "=== HTTP Tests ===<br>";
echo "\$response = \$this->get('/posts');<br>";
echo "\$response->assertStatus(200);<br>";
echo "\$response->assertViewIs('posts.index');<br>";
echo "\$response->assertSee('Belajar Laravel');<br>";
echo "\$response->assertJson(['status' => 'ok']);<br><br>";

echo "=== Database Testing ===<br>";
echo "\$this->assertDatabaseHas('users', ['email' => 'test@mail.com']);<br>";
echo "\$this->assertDatabaseMissing('users', ['email' => 'gone@mail.com']);<br>";
echo "\$this->assertSoftDeleted('posts', ['id' => 1]);<br><br>";

echo "=== Mocking ===<br>";
echo "\$mock = \$this->mock(PaymentService::class, function (\$mock) {<br>";
echo "    \$mock->shouldReceive('charge')->once()->andReturn('success');<br>";
echo "});<br><br>";

echo "=== Test Simulation ===<br>";
$tests = [
    ["test_create_post", "PASS"],
    ["test_list_posts", "PASS"],
    ["test_update_post", "PASS"],
    ["test_delete_post", "PASS"],
    ["test_unauthorized_access", "PASS"],
];

foreach ($tests as [$name, $result]) {
    echo "  $result: $name<br>";
}
echo "<br>All 5 tests passed!<br>";
>`,
    objectivesId: [
      'Unit Test: test class terpisah dari database',
      'Feature Test: test HTTP request dan database',
      'RefreshDatabase: reset database setiap test',
      'Assertions: assertStatus, assertViewIs, assertDatabaseHas',
      'Mocking: mock dependencies dengan MockInterface',
    ],
    objectivesEn: [
      'Unit Test: test classes separate from database',
      'Feature Test: test HTTP requests and database',
      'RefreshDatabase: reset database each test',
      'Assertions: assertStatus, assertViewIs, assertDatabaseHas',
      'Mocking: mock dependencies with MockInterface',
    ],
    explanationId: '### Unit Test\nTest logic tanpa HTTP/database. Extend \`TestCase\`.\n\n### Feature Test\nTest full HTTP request: \`$this->get()\`, \`post()\`, \`put()\`, \`delete()\`. Dengan \`RefreshDatabase\`.\n\n### Acting As\n\`$this->actingAs($user)\` — authenticate user untuk test.\n\n### Assertions\n\`assertStatus(200)\`, \`assertViewIs()\`, \`assertSee()\`, \`assertDatabaseHas()\`.\n\n### Mocking\n\`$this->mock(Service::class, fn($mock) => $mock->shouldReceive(\'method\'))\`.',
    explanationEn: '### Unit Test\nTest logic without HTTP/database. Extend \`TestCase\`.\n\n### Feature Test\nTest full HTTP requests: \`$this->get()\`, \`post()\`. With \`RefreshDatabase\`.\n\n### Acting As\n\`$this->actingAs($user)\` — authenticate user for tests.\n\n### Assertions\n\`assertStatus()\`, \`assertViewIs()\`, \`assertSee()\`, \`assertDatabaseHas()\`.\n\n### Mocking\n\`$this->mock(Service::class, fn($mock) => ...)\`.',
    experimentsId: [
      'Buat factory untuk model Post',
      'Test dengan actingAs dan berbagai role',
      'Coba test upload file',
      'Buat test untuk API endpoint',
      'Implementasikan test dengan database transactions',
    ],
    experimentsEn: [
      'Create factory for Post model',
      'Test with actingAs and various roles',
      'Try file upload test',
      'Create test for API endpoint',
      'Implement test with database transactions',
    ],
    challengeId: 'Buat test suite lengkap untuk CRUD Post: create, read, update, delete, unauthorized access, validation errors. Min 10 test cases.',
    challengeEn: 'Create a complete test suite for Post CRUD: create, read, update, delete, unauthorized access, validation errors. Min 10 test cases.',
    summaryId: 'Minggu 9 dari 12: **Testing dengan PHPUnit** (Level: Lanjutan). Kualitas kode terjamin. Minggu depan: **Queues & Jobs**.',
    summaryEn: 'Week 9 of 12: **Testing with PHPUnit** (Level: Advanced). Code quality guaranteed. Next week: **Queues & Jobs**.',
  },
  {
    week: 10, level: 'advanced', topicId: 'queues-jobs',
    titleId: 'Queues & Background Jobs', titleEn: 'Queues & Background Jobs',
    programId: 'Job Processing', programEn: 'Job Processing',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'php',
    code: `<?php
echo "=== Laravel Queues ===<br><br>";

echo "=== Job Class ===<br>";
echo "class ProcessPodcast implements ShouldQueue {<br>";
echo "    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;<br>";
echo "    <br>";
echo "    public function handle(AudioProcessor \$processor): void {<br>";
echo "        \$processor->process(\$this->podcast);<br>";
echo "    }<br>";
echo "}<br><br>";

echo "=== Dispatch Job ===<br>";
echo "ProcessPodcast::dispatch(\$podcast);<br>";
echo "ProcessPodcast::dispatch(\$podcast)->onQueue('processing');<br>";
echo "ProcessPodcast::dispatch(\$podcast)->delay(now()->addMinutes(10));<br><br>";

echo "=== Job Simulation ===<br>";
$jobs = [
    ["id" => 1, "name" => "ProcessPodcast", "status" => "completed", "duration" => "2.3s"],
    ["id" => 2, "name" => "SendEmail", "status" => "completed", "duration" => "0.5s"],
    ["id" => 3, "name" => "GenerateReport", "status" => "processing", "duration" => "..."],
    ["id" => 4, "name" => "ResizeImage", "status" => "queued", "duration" => "..."],
];

echo "ID | Job | Status | Duration<br>";
echo "---|-----|--------|----------<br>";
foreach ($jobs as $job) {
    echo "{$job['id']} | {$job['name']} | {$job['status']} | {$job['duration']}<br>";
}

echo "<br>=== Queue Worker ===<br>";
echo "php artisan queue:work<br>";
echo "php artisan queue:work --queue=high,default --tries=3 --timeout=60<br><br>";

echo "=== Failed Jobs ===<br>";
echo "php artisan queue:failed — List failed jobs<br>";
echo "php artisan queue:retry 1 — Retry job<br>";
echo "php artisan queue:flush — Delete all failed<br><br>";

echo "=== Batch Jobs ===<br>";
echo "Bus::batch([<br>";
echo "    new ProcessPodcast(1),<br>";
echo "    new ProcessPodcast(2),<br>";
echo "])->then(function (Batch \$batch) {<br>";
echo "    // All jobs completed<br>";
echo "})->catch(function (Batch \$batch, Throwable \$e) {<br>";
echo "    // First batch failure<br>";
echo "})->dispatch();<br>";
>`,
    objectivesId: [
      'Job class: ShouldQueue interface untuk background processing',
      'Dispatch: dispatch, onQueue, delay',
      'Queue worker: php artisan queue:work',
      'Failed jobs: retry, flush, forget',
      'Batch jobs: Bus::batch untuk multiple jobs',
    ],
    objectivesEn: [
      'Job class: ShouldQueue interface for background processing',
      'Dispatch: dispatch, onQueue, delay',
      'Queue worker: php artisan queue:work',
      'Failed jobs: retry, flush, forget',
      'Batch jobs: Bus::batch for multiple jobs',
    ],
    explanationId: '### Job Class\n\`implements ShouldQueue\` — Laravel auto-queue job. \`handle()\` method dieksekusi.\n\n### Dispatch\n\`Job::dispatch($data)\`, \`->onQueue(\'name\')\`, \`->delay($time)\`.\n\n### Queue Worker\n\`php artisan queue:work\` — process jobs dari queue. Bisa specify queue, tries, timeout.\n\n### Failed Jobs\n\`queue:failed\` list, \`queue:retry $id\` retry, \`queue:flush\` hapus.\n\n### Batch\n\`Bus::batch([...])->then()->catch()->dispatch()\` — multiple jobs dengan callback.',
    explanationEn: '### Job Class\n\`implements ShouldQueue\` — Laravel auto-queues. \`handle()\` executes.\n\n### Dispatch\n\`Job::dispatch()\`, \`->onQueue()\`, \`->delay()\`.\n\n### Queue Worker\n\`php artisan queue:work\` processes jobs. Specify queue, tries, timeout.\n\n### Failed Jobs\n\`queue:failed\` lists, \`queue:retry\` retries, \`queue:flush\` deletes.\n\n### Batch\n\`Bus::batch([...])->then()->catch()->dispatch()\`.',
    experimentsId: [
      'Buat Job dan dispatch ke queue',
      'Coba job chaining: withChain',
      'Implementasikan job batching',
      'Buat failed job handler',
      'Coba rate limiting dengan RateLimited middleware',
    ],
    experimentsEn: [
      'Create Job and dispatch to queue',
      'Try job chaining: withChain',
      'Implement job batching',
      'Create failed job handler',
      'Try rate limiting with RateLimited middleware',
    ],
    challengeId: 'Buat sistem email notification: queue email sending, retry 3x on failure, batch send to multiple recipients.',
    challengeEn: 'Build an email notification system: queue email sending, retry 3x on failure, batch send to multiple recipients.',
    summaryId: 'Minggu 10 dari 12: **Queues & Background Jobs** (Level: Lanjutan). Async processing. Minggu depan: **REST API**.',
    summaryEn: 'Week 10 of 12: **Queues & Background Jobs** (Level: Advanced). Async processing. Next week: **REST API**.',
  },
  {
    week: 11, level: 'advanced', topicId: 'rest-api',
    titleId: 'REST API Development', titleEn: 'REST API Development',
    programId: 'API Endpoints', programEn: 'API Endpoints',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'php',
    code: `<?php
echo "=== Laravel REST API ===<br><br>";

echo "=== API Routes ===<br>";
echo "// routes/api.php<br>";
echo "Route::apiResource('posts', PostController::class);<br>";
echo "Route::apiResource('comments', CommentController::class);<br>";
echo "Route::middleware('auth:sanctum')->group(function () {<br>";
echo "    Route::post('/posts', [PostController::class, 'store']);<br>";
echo "});<br><br>";

echo "=== API Resource ===<br>";
echo "class PostResource extends JsonResource {<br>";
echo "    public function toArray(Request \$request): array {<br>";
echo "        return [<br>";
echo "            'id' => \$this->id,<br>";
echo "            'title' => \$this->title,<br>";
echo "            'author' => new UserResource(\$this->user),<br>";
echo "            'created_at' => \$this->created_at->toISOString(),<br>";
echo "        ];<br>";
echo "    }<br>";
echo "}<br><br>";

echo "=== API Response ===<br>";
echo "return PostResource::collection(Post::all());<br>";
echo "return new PostResource(\$post);<br>";
echo "return response()->json(['error' => 'Not found'], 404);<br><br>";

echo "=== Sanctum Auth ===<br>";
echo "composer require laravel/sanctum<br>";
echo "php artisan sanctum:install<br>";
echo "\$token = \$user->createToken('api-token')->plainTextToken;<br>";
echo "Authorization: Bearer {token}<br><br>";

echo "=== API Simulation ===<br>";
$endpoints = [
    "GET /api/posts" => ["status" => 200, "data" => "List of posts"],
    "GET /api/posts/1" => ["status" => 200, "data" => "Post #1"],
    "POST /api/posts" => ["status" => 201, "data" => "Created"],
    "PUT /api/posts/1" => ["status" => 200, "data" => "Updated"],
    "DELETE /api/posts/1" => ["status" => 204, "data" => "Deleted"],
];

foreach ($endpoints as $endpoint => $resp) {
    echo "$endpoint → {$resp['status']}: {$resp['data']}<br>";
}

echo "<br>=== Rate Limiting ===<br>";
echo "Route::middleware('throttle:60,1')->group(...);<br>";
echo "60 requests per minute<br>";
>`,
    objectivesId: [
      'API routes: routes/api.php dan apiResource',
      'API Resources: transform model ke JSON response',
      'Sanctum: token-based authentication untuk API',
      'HTTP status codes: 200, 201, 204, 404, 422',
      'Rate limiting: throttle middleware',
    ],
    objectivesEn: [
      'API routes: routes/api.php and apiResource',
      'API Resources: transform models to JSON responses',
      'Sanctum: token-based authentication for APIs',
      'HTTP status codes: 200, 201, 204, 404, 422',
      'Rate limiting: throttle middleware',
    ],
    explanationId: '### API Routes\n\`routes/api.php\` — auto prefix \`/api\`. \`apiResource()\` generate 5 routes.\n\n### API Resources\n\`JsonResource\` transform model ke JSON. \`collection()\` untuk list.\n\n### Sanctum\nToken-based auth. \`createToken()\` generate token. Middleware \`auth:sanctum\`.\n\n### Status Codes\n200 OK, 201 Created, 204 No Content, 404 Not Found, 422 Validation Error.\n\n### Rate Limiting\n\`throttle:60,1\` — 60 requests per minute.',
    explanationEn: '### API Routes\n\`routes/api.php\` — auto \`/api\` prefix. \`apiResource()\` generates 5 routes.\n\n### API Resources\n\`JsonResource\` transforms models to JSON. \`collection()\` for lists.\n\n### Sanctum\nToken-based auth. \`createToken()\` generates tokens.\n\n### Status Codes\n200 OK, 201 Created, 204 No Content, 404 Not Found.\n\n### Rate Limiting\n\`throttle:60,1\` — 60 requests per minute.',
    experimentsId: [
      'Buat API Resource dengan conditional fields',
      'Implementasikan API versioning',
      'Coba API dengan Sanctum auth',
      'Buat API documentation dengan Scribe',
      'Implementasikan cursor pagination',
    ],
    experimentsEn: [
      'Create API Resource with conditional fields',
      'Implement API versioning',
      'Try API with Sanctum auth',
      'Create API documentation with Scribe',
      'Implement cursor pagination',
    ],
    challengeId: 'Buat REST API lengkap untuk blog: CRUD posts, comments, auth dengan Sanctum, API Resources, rate limiting.',
    challengeEn: 'Build a complete REST API for a blog: CRUD posts, comments, auth with Sanctum, API Resources, rate limiting.',
    summaryId: 'Minggu 11 dari 12: **REST API Development** (Level: Lanjutan). API-first development. Minggu depan: **Capstone Project**!',
    summaryEn: 'Week 11 of 12: **REST API Development** (Level: Advanced). API-first development. Next week: **Capstone Project**!',
  },
  {
    week: 12, level: 'advanced', topicId: 'capstone-project',
    titleId: 'Capstone: E-Commerce API', titleEn: 'Capstone: E-Commerce API',
    programId: 'E-Commerce Backend', programEn: 'E-Commerce Backend',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'php',
    code: `<?php
echo "=== Capstone: E-Commerce API ===<br><br>";

echo "=== Architecture ===<br>";
echo "Models: User, Product, Order, OrderItem, Category, Cart<br>";
echo "Controllers: ProductController, OrderController, AuthController<br>";
echo "Resources: ProductResource, OrderResource, UserResource<br>";
echo "Middleware: auth:sanctum, throttle, role:admin<br><br>";

echo "=== Models & Relationships ===<br>";
echo "User hasMany Order, hasOne Cart<br>";
echo "Product belongsTo Category, hasMany OrderItem<br>";
echo "Order belongsTo User, hasMany OrderItem<br>";
echo "OrderItem belongsTo Order, belongsTo Product<br><br>";

echo "=== API Endpoints ===<br>";
$endpoints = [
    "POST /api/register" => "Register user",
    "POST /api/login" => "Login & get token",
    "GET /api/products" => "List products",
    "GET /api/products/{id}" => "Product detail",
    "POST /api/orders" => "Create order",
    "GET /api/orders" => "List user orders",
    "GET /api/orders/{id}" => "Order detail",
    "POST /api/admin/products" => "Create product (admin)",
    "PUT /api/admin/products/{id}" => "Update product (admin)",
];

foreach ($endpoints as $endpoint => $desc) {
    echo "  $endpoint — $desc<br>";
}

echo "<br>=== Order Processing ===<br>";
echo "1. User adds products to cart<br>";
echo "2. User creates order (POST /api/orders)<br>";
echo "3. Validate stock availability<br>";
echo "4. Create order + order items<br>";
echo "5. Reduce product stock<br>";
echo "6. Dispatch SendOrderConfirmation job<br>";
echo "7. Return order with 201 status<br><br>";

echo "=== Features ===<br>";
echo "✓ Authentication (Sanctum)<br>";
echo "✓ CRUD Products (admin only)<br>";
echo "✓ Shopping cart<br>";
echo "✓ Order processing<br>";
echo "✓ Queue jobs (email confirmation)<br>";
echo "✓ API Resources<br>";
echo "✓ Validation (Form Requests)<br>";
echo "✓ Testing (Feature + Unit)<br>";
echo "✓ Rate limiting<br>";
echo "✓ Search & filter products<br>";
>`,
    objectivesId: [
      'Menggabungkan semua konsep: auth, relationships, validation, queues, API',
      'E-commerce domain: products, orders, cart, users',
      'Role-based access: admin vs customer',
      'Order processing: stock validation, order items, queue jobs',
      'API Resources: transform complex data structures',
    ],
    objectivesEn: [
      'Combine all concepts: auth, relationships, validation, queues, API',
      'E-commerce domain: products, orders, cart, users',
      'Role-based access: admin vs customer',
      'Order processing: stock validation, order items, queue jobs',
      'API Resources: transform complex data structures',
    ],
    explanationId: '### Architecture\nMVC + Service Layer. Controller → Service → Repository → Model.\n\n### E-Commerce Flow\nUser browse → add to cart → checkout → order created → stock reduced → email sent.\n\n### Role-Based\nAdmin: CRUD products. Customer: browse, order, view own orders.\n\n### Order Processing\n1. Validasi stock 2. Create order 3. Create order items 4. Reduce stock 5. Queue email.\n\n### API Resources\nTransform model ke JSON dengan format konsisten. Nested resources untuk relasi.',
    explanationEn: '### Architecture\nMVC + Service Layer. Controller → Service → Repository → Model.\n\n### E-Commerce Flow\nUser browse → add to cart → checkout → order created → stock reduced → email sent.\n\n### Role-Based\nAdmin: CRUD products. Customer: browse, order, view own orders.\n\n### Order Processing\n1. Validate stock 2. Create order 3. Create order items 4. Reduce stock 5. Queue email.\n\n### API Resources\nTransform models to JSON with consistent format.',
    experimentsId: [
      'Tambah payment integration (Midtrans/Stripe)',
      'Implementasikan coupon/discount system',
      'Buat product review dan rating',
      'Tambah notification system',
      'Buat admin dashboard API',
    ],
    experimentsEn: [
      'Add payment integration (Midtrans/Stripe)',
      'Implement coupon/discount system',
      'Create product review and rating',
      'Add notification system',
      'Create admin dashboard API',
    ],
    challengeId: 'Buat e-commerce API lengkap: auth, products CRUD, cart, orders, payment webhook, queue jobs, testing. Deploy ke production.',
    challengeEn: 'Build a complete e-commerce API: auth, products CRUD, cart, orders, payment webhook, queue jobs, testing. Deploy to production.',
    summaryId: 'Minggu 12 dari 12: **Capstone: E-Commerce API** (Level: Lanjutan). Selesai! 🎉 Anda sudah menguasai Laravel dari dasar hingga produksi.',
    summaryEn: 'Week 12 of 12: **Capstone: E-Commerce API** (Level: Advanced). Complete! 🎉 You\'ve mastered Laravel from basics to production.',
  },
];

// Add weeks to levels
for (const level of LEVELS) {
  level.weeks = MODULES.filter(m => m.level === level.levelId).map(m => ({
    week: m.week,
    topicId: m.topicId,
    titleId: m.titleId,
    titleEn: m.titleEn,
  }));
}

gen.writeFiles(MODULES, LEVELS);
