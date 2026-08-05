import fs from 'fs';
import path from 'path';

const BASE = new URL('../public/data/course/codeigniter4', import.meta.url).pathname;
const BASE_DIR = process.platform === 'win32' ? BASE.slice(1) : BASE;

const PKG = (name, extraRequire = '', extraDev = '') => `{
    "name": "tryngo/${name}",
    "type": "project",
    "require": { "php": "^8.2"${extraRequire ? `,\n        ${extraRequire}` : ''} },
    "require-dev": {
        "fakerphp/faker": "^1.23",
        "phpunit/phpunit": "^11.0"${extraDev ? `,\n        ${extraDev}` : ''}
    },
    "autoload": { "psr-4": { "App\\": "app/" } },
    "minimum-stability": "stable",
    "prefer-stable": true
}
`;

const PKG_NODE = (name, dev) => `{
  "name": "${name}",
  "version": "1.0.0",
  "private": true,
  "scripts": { "dev": "${dev}" }
}
`;

const DEV_SERVE = 'php -S 0.0.0.0:3000 -t public';

const LESSONS = [
  {
    num: 1, topicId: 'pengenalan-ci4',
    titleId: 'Pengenalan CodeIgniter 4 & Instalasi', titleEn: 'Introduction to CodeIgniter 4 & Installation',
    codeFile: 'public/index.php',
    files: {
      'public/index.php': `<?php\n\n// CodeIgniter 4 - Front Controller\n// Ini adalah titik masuk utama aplikasi CI4.\n// Semua request HTTP melewati file ini.\n\nrequire_once __DIR__ . '/../system/bootstrap.php';\n\necho "Hello, CodeIgniter 4!";\necho "\\nMVC = Model-View-Controller";\necho "\\nRouting: URL -> Controller -> View";\n`,
      'app/Controllers/Home.php': `<?php\n\nnamespace App\\Controllers;\n\nclass Home extends BaseController\n{\n    public function index(): string\n    {\n        return view('welcome_message');\n    }\n}\n`,
      'app/Views/welcome_message.php': `<!DOCTYPE html>\n<html>\n<head><title>Welcome</title></head>\n<body>\n    <h1>Welcome to CodeIgniter 4!</h1>\n    <p>MVC framework for PHP developers.</p>\n</body>\n</html>\n`,
      'composer.json': PKG('pengenalan-ci4'),
      'package.json': PKG_NODE('ci4-lesson-1', DEV_SERVE),
      'README.md': `# CodeIgniter 4 Lesson 1 - Introduction\n\nJalankan: composer install && npm run dev\nBuka: http://localhost:3000\n\nMVC = Model-View-Controller.\nController menerima request, Model mengakses data, View menampilkan output.\n`,
    },
    objId: ['Memahami posisi CI4: PHP framework modern dengan pola MVC', 'Mengenal struktur direktori CI4 (app/, public/, writable/, system/)', 'Memahami peran front controller (public/index.php)', 'Membedakan CI4 dari PHP murni: framework vs bahasa'],
    objEn: ['Understand CI4: a modern PHP framework with MVC pattern', 'Learn CI4 directory structure (app/, public/, writable/, system/)', 'Understand the front controller role (public/index.php)', 'Distinguish CI4 from pure PHP: framework vs language'],
    expId: `## Struktur Direktori CI4\napp/ = kode aplikasi (Controllers, Models, Views, Config). public/ = web root (index.php, assets). writable/ = cache, logs, session, uploads. system/ = inti framework (tidak perlu dimodifikasi). vendor/ = dependency Composer.\n## MVC di CI4\nRequest -> public/index.php -> Router -> Controller -> Model (database) -> View (HTML) -> Response. Setiap lapisan punya tanggung jawab sendiri.\n## Menjalankan CI4\nphp -S 0.0.0.0:3000 -t public menjalankan server development. Buka http://localhost:3000 dan liat output "Welcome to CodeIgniter 4!".`,
    expEn: `## CI4 Directory Structure\napp/ = application code (Controllers, Models, Views, Config). public/ = web root (index.php, assets). writable/ = cache, logs, session, uploads. system/ = framework core (don't modify). vendor/ = Composer dependencies.\n## MVC in CI4\nRequest -> public/index.php -> Router -> Controller -> Model (database) -> View (HTML) -> Response. Each layer has its own responsibility.\n## Running CI4\nphp -S 0.0.0.0:3000 -t public starts the dev server. Open http://localhost:3000 and see "Welcome to CodeIgniter 4!".`,
    chId: 'Eksplorasi: (1) ubah "Welcome to CodeIgniter 4!" menjadi selamat datang Anda di view welcome_message.php, (2) tambah h2 dengan nama framework Anda, (3) coba akses http://localhost:3000/ dan liat perubahan, (4) tambah link <a href="/about">About</a> di view.',
    chEn: 'Explore: (1) change "Welcome to CodeIgniter 4!" to your welcome message in welcome_message.php, (2) add an h2 with your name, (3) try accessing http://localhost:3000/ and see the change, (4) add an <a href="/about">About</a> link in the view.',
    sumId: 'CI4 = PHP framework MVC. public/index.php = front controller. app/ = kode Anda. Lanjut: routing & controllers.',
    sumEn: 'CI4 = PHP MVC framework. public/index.php = front controller. app/ = your code. Next: routing & controllers.',
  },
  {
    num: 2, topicId: 'routing-controllers',
    titleId: 'Routing & Controllers', titleEn: 'Routing & Controllers',
    codeFile: 'app/Controllers/Blog.php',
    files: {
      'app/Controllers/Blog.php': `<?php\n\nnamespace App\\Controllers;\n\nclass Blog extends BaseController\n{\n    public function index(): string\n    {\n        return view('blog/index');\n    }\n\n    public function view(string $slug = null): string\n    {\n        if ($slug === null) {\n            return redirect()->to('/blog');\n        }\n\n        return view('blog/view', ['slug' => $slug]);\n    }\n\n    public function create(): string\n    {\n        return view('blog/create');\n    }\n\n    public function store(): string\n    {\n        $title = $this->request->getPost('title');\n        return "Post dibuat: " . esc($title);\n    }\n}\n`,
      'app/Config/Routes.php': `<?php\n\n$routes->get('/', 'Home::index');\n$routes->get('blog', 'Blog::index');\n$routes->get('blog/(:any)', 'Blog::view/$1');\n$routes->get('blog/create', 'Blog::create');\n$routes->post('blog/store', 'Blog::store');\n`,
      'app/Views/blog/index.php': `<!DOCTYPE html>\n<html>\n<head><title>Blog</title></head>\n<body>\n    <h1>Blog</h1>\n    <ul>\n        <li><a href="/blog/hello-world">Hello World</a></li>\n        <li><a href="/blog/ci4-routing">CI4 Routing</a></li>\n    </ul>\n    <a href="/blog/create">Buat Post Baru</a>\n</body>\n</html>\n`,
      'app/Views/blog/view.php': `<!DOCTYPE html>\n<html>\n<head><title>Post: <?= esc($slug) ?></title></head>\n<body>\n    <h1>Post: <?= esc($slug) ?></h1>\n    <p>Isi post untuk slug: <?= esc($slug) ?></p>\n    <a href="/blog">Kembali ke daftar</a>\n</body>\n</html>\n`,
      'app/Views/blog/create.php': `<!DOCTYPE html>\n<html>\n<head><title>Buat Post</title></head>\n<body>\n    <h1>Buat Post Baru</h1>\n    <form method="post" action="/blog/store">\n        <label>Nama Post:</label><br>\n        <input type="text" name="title">\n        <button type="submit">Simpan</button>\n    </form>\n</body>\n</html>\n`,
      'composer.json': PKG('routing-controllers'),
      'package.json': PKG_NODE('ci4-lesson-2', DEV_SERVE),
      'README.md': `# CodeIgniter 4 Lesson 2 - Routing & Controllers\n\nJalankan: composer install && npm run dev\nBuka: http://localhost:3000\n\nRoutes: app/Config/Routes.php mendefinisikan URL -> Controller mapping.\n`,
    },
    objId: ['Memahami routing: URL dipetakan ke controller dan method', 'Membuat controller dengan method index, view, create, store', 'Menggunakan $this->request->getPost() untuk menerima data form', 'Menggunakan redirect()->to() untuk redirect'],
    objEn: ['Understand routing: URL mapped to controller and method', 'Create controller with index, view, create, store methods', 'Use $this->request->getPost() to receive form data', 'Use redirect()->to() for redirection'],
    expId: `## Routing Patterns\n$routes->get('blog', 'Blog::index') — GET /blog -> Blog::index. $routes->get('blog/(:any)', 'Blog::view/$1') — parameter (:any) ditangkap dan diteruskan ke method. $routes->post('blog/store', 'Blog::store') — POST request.\n## Controller Methods\npublic function index(): string — method default. return view('nama_view') — render view. return redirect()->to('/url') — redirect. $this->request->getPost('field') — ambil data POST.\n## View dengan Data\nview('blog/view', ['slug' => $slug]) — kirim data ke view. Di view: <?= esc($slug) ?> — output yang di-escape untuk keamanan (anti XSS).`,
    expEn: `## Routing Patterns\n$routes->get('blog', 'Blog::index') — GET /blog -> Blog::index. $routes->get('blog/(:any)', 'Blog::view/$1') — parameter captured and passed to method. $routes->post('blog/store', 'Blog::store') — POST request.\n## Controller Methods\npublic function index(): string — default method. return view('view_name') — render view. return redirect()->to('/url') — redirect. $this->request->getPost('field') — get POST data.\n## View with Data\nview('blog/view', ['slug' => $slug]) — pass data to view. In view: <?= esc($slug) ?> — escaped output for security (anti XSS).`,
    chId: 'Kembangkan routing: (1) tambah method edit($slug) di Blog controller, (2) tambah route PUT untuk update, (3) tambah method delete($slug) dengan route DELETE, (4) buat halaman /blog/about yang menampilkan info tentang blog.',
    chEn: 'Expand routing: (1) add edit($slug) method in Blog controller, (2) add PUT route for update, (3) add delete($slug) method with DELETE route, (4) create /blog/about page showing blog info.',
    sumId: 'Route = URL ke controller. Controller = logic. View = HTML. $routes->get/post = metode HTTP. Lanjut: views & layouts.',
    sumEn: 'Route = URL to controller. Controller = logic. View = HTML. $routes->get/post = HTTP methods. Next: views & layouts.',
  },
  {
    num: 3, topicId: 'views-layouts',
    titleId: 'Views & Layouts', titleEn: 'Views & Layouts',
    codeFile: 'app/Views/templates/main.php',
    files: {
      'app/Views/templates/main.php': `<!DOCTYPE html>\n<html>\n<head>\n    <title><?= $title ?? 'CI4 App' ?></title>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n</head>\n<body>\n    <header>\n        <nav>\n            <a href="/">Beranda</a> |\n            <a href="/blog">Blog</a> |\n            <a href="/about">Tentang</a>\n        </nav>\n    </header>\n    <main>\n        <?= $this->renderSection('content') ?>\n    </main>\n    <footer>\n        <p>&copy; <?= date('Y') ?> CI4 App</p>\n    </footer>\n</body>\n</html>\n`,
      'app/Views/blog/index.php': `<?php $this->extend('templates/main') ?>\n\n<?php $this->section('content') ?>\n    <h1>Blog</h1>\n    <p>Selamat datang di blog CI4.</p>\n<?php $this->endSection() ?>\n`,
      'app/Views/blog/view.php': `<?php $this->extend('templates/main') ?>\n\n<?php $this->section('content') ?>\n    <h1>Post: <?= esc($slug) ?></h1>\n    <p>Isi post untuk slug: <?= esc($slug) ?></p>\n    <a href="/blog">Kembali ke daftar</a>\n<?php $this->endSection() ?>\n`,
      'app/Controllers/Blog.php': `<?php\n\nnamespace App\\Controllers;\n\nclass Blog extends BaseController\n{\n    public function index(): string\n    {\n        return view('blog/index');\n    }\n\n    public function view(string $slug = null): string\n    {\n        if ($slug === null) {\n            return redirect()->to('/blog');\n        }\n        return view('blog/view', ['slug' => $slug]);\n    }\n}\n`,
      'composer.json': PKG('views-layouts'),
      'package.json': PKG_NODE('ci4-lesson-3', DEV_SERVE),
      'README.md': `# CodeIgniter 4 Lesson 3 - Views & Layouts\n\nJalankan: composer install && npm run dev\nBuka: http://localhost:3000\n\nLayout: template utama yang di-extend oleh view anak.\n`,
    },
    objId: ['Memahami layout: template utama yang di-extend view anak', 'Menggunakan $this->extend() dan $this->section() di view', 'Mengirim data dari controller ke view dengan array', 'Menggunakan esc() untuk output yang aman (anti XSS)'],
    objEn: ['Understand layout: main template extended by child views', 'Use $this->extend() and $this->section() in views', 'Pass data from controller to view with array', 'Use esc() for safe output (anti XSS)'],
    expId: `## Layout System\n\$this->extend('templates/main') — view anak mewarisi layout utama. \$this->section('content') — mendefinisikan bagian yang akan menggantikan @section('content') di layout. \$this->endSection() — menutup section.\n## Data Passing\nview('blog/view', ['slug' => \$slug]) — mengirim data sebagai associative array. Di view: \$slug (atau \$data['slug']) — mengakses data yang dikirim.\n## XSS Prevention\nesc(\$variable) — escape HTML entities. Mencegah script injection. Selalu gunakan esc() untuk output user data di view.`,
    expEn: `## Layout System\n\$this->extend('templates/main') — child view inherits main layout. \$this->section('content') — defines section that replaces @section('content') in layout. \$this->endSection() — closes section.\n## Data Passing\nview('blog/view', ['slug' => \$slug]) — pass data as associative array. In view: \$slug (or \$data['slug']) — access passed data.\n## XSS Prevention\nesc(\$variable) — escape HTML entities. Prevents script injection. Always use esc() for user data output in views.`,
    chId: 'Kembangkan layout: (1) tambah sidebar dengan link navigasi di template main, (2) tambah section "footer" di layout dan isi dari view anak, (3) buat partial view untuk header dan footer yang bisa di-include, (4) tambah meta description dinamis di setiap halaman.',
    chEn: 'Expand layout: (1) add sidebar with nav links in main template, (2) add "footer" section in layout populated by child view, (3) create partial views for header/footer that can be included, (4) add dynamic meta description per page.',
    sumId: 'Layout = template utama. Section = blok konten dinamis. extend() = warisi layout. esc() = anti XSS. Lanjut: database.',
    sumEn: 'Layout = main template. Section = dynamic content block. extend() = inherit layout. esc() = anti XSS. Next: database.',
  },
  {
    num: 4, topicId: 'assets-spark',
    titleId: 'Static Assets & Spark CLI', titleEn: 'Static Assets & Spark CLI',
    codeFile: 'public/index.php',
    files: {
      'public/index.php': `<?php\n\n// CodeIgniter 4 - Front Controller\n// Serve static assets from public/css/, public/js/, public/images/\n\nrequire_once __DIR__ . '/../system/bootstrap.php';\n\n// CI4 handles static assets automatically when APPBASEPATH is set\n// Static files in public/ are served directly by the web server\n`,
      'public/css/style.css': `body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }\nheader { background: #17A2B8; color: white; padding: 10px 20px; }\nnav a { color: white; margin-right: 15px; text-decoration: none; }\nmain { max-width: 800px; margin: 20px auto; }\n`,
      'public/js/app.js': `document.addEventListener('DOMContentLoaded', function() {\n    console.log('CI4 App loaded');\n    const links = document.querySelectorAll('nav a');\n    links.forEach(link => {\n        link.addEventListener('click', function(e) {\n            console.log('Navigating to: ' + this.getAttribute('href'));\n        });\n    });\n});\n`,
      'app/Config/App.php': `<?php\n\nnamespace Config;\n\nclass App extends BaseConfig\n{\n    public string $baseURL = 'http://localhost:3000';\n    public string $indexPage = 'index.php';\n    public string $uriProtocol = 'REQUEST_URI';\n}\n`,
      'composer.json': PKG('assets-spark'),
      'package.json': PKG_NODE('ci4-lesson-4', DEV_SERVE),
      'README.md': `# CodeIgniter 4 Lesson 4 - Static Assets & Spark CLI\n\nJalankan: composer install && npm run dev\nBuka: http://localhost:3000\n\nSpark CLI: php spark list, php spark serve\n`,
    },
    objId: ['Menyajikan static assets (CSS, JS, gambar) dari direktori public/', 'Menggunakan Spark CLI untuk menjalankan commands', 'Memahami peran public/index.php sebagai front controller', 'Mengonfigurasi baseURL di App.php'],
    objEn: ['Serve static assets (CSS, JS, images) from public/ directory', 'Use Spark CLI to run commands', 'Understand public/index.php as front controller', 'Configure baseURL in App.php'],
    expId: `## Static Assets\nFile di public/ (css/, js/, images/) diakses langsung: http://localhost:3000/css/style.css. CI4 tidak mem-proses file static — web server menyajikannya langsung.\n## Spark CLI\nphp spark list — daftar semua command tersedia. php spark serve — jalankan development server (alternatif dari php -S). php spark make:controller NamaController — generate controller baru. php spark make:model NamaModel — generate model baru.\n## App Config\napp/Config/App.php berisi baseURL, indexPage, uriProtocol. baseURL harus sesuai dengan URL akses Anda.`,
    expEn: `## Static Assets\nFiles in public/ (css/, js/, images/) accessed directly: http://localhost:3000/css/style.css. CI4 doesn't process static files — web server serves them directly.\n## Spark CLI\nphp spark list — list all available commands. php spark serve — start dev server (alternative to php -S). php spark make:controller NameController — generate new controller. php spark make:model NameModel — generate new model.\n## App Config\napp/Config/App.php contains baseURL, indexPage, uriProtocol. baseURL must match your access URL.`,
    chId: 'Eksplorasi Spark: (1) jalankan php spark list dan catat 5 command yang tersedia, (2) buat controller baru dengan php spark make:controller About, (3) buat model baru dengan php spark make:model Post, (4) coba php spark serve dan bandingkan dengan npm run dev.',
    chEn: 'Explore Spark: (1) run php spark list and note 5 available commands, (2) create new controller with php spark make:controller About, (3) create new model with php spark make:model Post, (4) try php spark serve and compare with npm run dev.',
    sumId: 'public/ = static assets. Spark CLI = generate code & run commands. App.php = config utama. Lanjut: database & migrations.',
    sumEn: 'public/ = static assets. Spark CLI = generate code & run commands. App.php = main config. Next: database & migrations.',
  },
  {
    num: 5, topicId: 'database-migrations',
    titleId: 'Database Setup & Migrations', titleEn: 'Database Setup & Migrations',
    codeFile: 'app/Database/Migrations/001_create_posts.php',
    files: {
      'app/Database/Migrations/001_create_posts.php': `<?php\n\nnamespace App\\Database\\Migrations;\n\nuse CodeIgniter\\Database\\Migration;\n\nclass CreatePosts extends Migration\n{\n    public function up(): void\n    {\n        \$this->forge->addField([\n            'id' => ['type' => 'INT', 'constraint' => 5, 'unsigned' => true, 'auto_increment' => true],\n            'title' => ['type' => 'VARCHAR', 'constraint' => 255],\n            'slug' => ['type' => 'VARCHAR', 'constraint' => 255],\n            'body' => ['type' => 'TEXT', 'null' => true],\n            'created_at' => ['type' => 'DATETIME', 'null' => true],\n            'updated_at' => ['type' => 'DATETIME', 'null' => true],\n        ]);\n        \$this->forge->addKey('id', true);\n        \$this->forge->addUniqueKey('slug');\n        \$this->forge->createTable('posts');\n    }\n\n    public function down(): void\n    {\n        \$this->forge->dropTable('posts');\n    }\n}\n`,
      'app/Database/Migrations/002_create_comments.php': `<?php\n\nnamespace App\\Database\\Migrations;\n\nuse CodeIgniter\\Database\\Migration;\n\nclass CreateComments extends Migration\n{\n    public function up(): void\n    {\n        \$this->forge->addField([\n            'id' => ['type' => 'INT', 'constraint' => 5, 'unsigned' => true, 'auto_increment' => true],\n            'post_id' => ['type' => 'INT', 'constraint' => 5, 'unsigned' => true],\n            'author' => ['type' => 'VARCHAR', 'constraint' => 100],\n            'body' => ['type' => 'TEXT'],\n            'created_at' => ['type' => 'DATETIME', 'null' => true],\n        ]);\n        \$this->forge->addKey('id', true);\n        \$this->forge->addForeignKey('post_id', 'posts', 'id', 'CASCADE', 'CASCADE');\n        \$this->forge->createTable('comments');\n    }\n\n    public function down(): void\n    {\n        \$this->forge->dropTable('comments');\n    }\n}\n`,
      'app/Config/Database.php': `<?php\n\nnamespace Config;\n\nclass Database extends BaseConfig\n{\n    public string \$defaultGroup = 'default';\n\n    public array \$default = [\n        'DBDriver'   => 'SQLite3',\n        'database'   => WRITEPATH . 'db.sqlite',\n        'DBDebug'    => true,\n        'charset'    => 'utf8',\n        'DBCollat'   => 'utf8_general_ci',\n        'swapPre'    => '',\n        'encrypt'    => false,\n        'compress'   => false,\n        'strictOn'   => false,\n        'failover'   => [],\n    ];\n}\n`,
      'composer.json': PKG('database-migrations'),
      'package.json': PKG_NODE('ci4-lesson-5', DEV_SERVE),
      'README.md': `# CodeIgniter 4 Lesson 5 - Database Setup & Migrations\n\nJalankan: composer install && npm run dev\n\nMigrate: php spark migrate\nRollback: php spark migrate rollback\n`,
    },
    objId: ['Memahami migrasi database: version control untuk schema', 'Membuat migration dengan $this->forge->addField()', 'Menambahkan primary key, unique key, dan foreign key', 'Menggunakan SQLite3 untuk development (tanpa server database)'],
    objEn: ['Understand database migrations: version control for schema', 'Create migration with $this->forge->addField()', 'Add primary key, unique key, and foreign key', 'Use SQLite3 for development (no database server needed)'],
    expId: `## Migration Workflow\nphp spark migrate — jalankan semua migration yang belum. php spark migrate rollback — batalkan migration terakhir. Setiap migration file memiliki method up() (buat) dan down() (hapus). Nama file dimulai dengan nomor urut (001_, 002_).\n## Forge Methods\n\$this->forge->addField([]) — definisikan kolom. \$this->forge->addKey('id', true) — primary key. \$this->forge->addUniqueKey('slug') — unique constraint. \$this->forge->createTable('posts') — buat tabel. \$this->forge->addForeignKey() — foreign key constraint.\n## SQLite3\nDBDriver = 'SQLite3' — tanpa perlu install server database. Database disimpan di writable/db.sqlite. Cocok untuk development dan prototyping.`,
    expEn: `## Migration Workflow\nphp spark migrate — run all pending migrations. php spark migrate rollback — undo last migration. Each migration file has up() (create) and down() (drop) methods. File names start with sequence number (001_, 002_).\n## Forge Methods\n\$this->forge->addField([]) — define columns. \$this->forge->addKey('id', true) — primary key. \$this->forge->addUniqueKey('slug') — unique constraint. \$this->forge->createTable('posts') — create table. \$this->forge->addForeignKey() — foreign key constraint.\n## SQLite3\nDBDriver = 'SQLite3' — no database server needed. Database stored in writable/db.sqlite. Great for development and prototyping.`,
    chId: 'Kembangkan migrasi: (1) buat migration ketiga untuk tabel categories dengan kolom name dan slug, (2) tambah foreign key posts.category_id -> categories.id, (3) jalankan php spark migrate dan verifikasi tabel created di SQLite, (4) coba php spark migrate rollback dan lihat tabel dihapus.',
    chEn: 'Expand migrations: (1) create third migration for categories table with name and slug columns, (2) add posts.category_id -> categories.id foreign key, (3) run php spark migrate and verify tables created in SQLite, (4) try php spark migrate rollback and see tables dropped.',
    sumId: 'Migration = version control schema. up() = buat, down() = hapus. Forge = schema builder. SQLite3 = dev DB. Lanjut: models.',
    sumEn: 'Migration = schema version control. up() = create, down() = drop. Forge = schema builder. SQLite3 = dev DB. Next: models.',
  },
  {
    num: 6, topicId: 'models-querybuilder',
    titleId: 'Models & Query Builder', titleEn: 'Models & Query Builder',
    codeFile: 'app/Models/PostModel.php',
    files: {
      'app/Models/PostModel.php': `<?php\n\nnamespace App\\Models;\n\nuse CodeIgniter\\Model;\n\nclass PostModel extends Model\n{\n    protected \$table = 'posts';\n    protected \$primaryKey = 'id';\n    protected \$allowedFields = ['title', 'slug', 'body'];\n    protected \$useTimestamps = true;\n    protected \$createdField = 'created_at';\n    protected \$updatedField = 'updated_at';\n\n    public function getPosts(int \$limit = 10, int \$offset = 0): array\n    {\n        return \$this->orderBy('id', 'DESC')\n            ->limit(\$limit)\n            ->offset(\$offset)\n            ->findAll();\n    }\n\n    public function getPostBySlug(string \$slug): ?array\n    {\n        return \$this->where('slug', \$slug)->first();\n    }\n\n    public function searchPosts(string \$keyword): array\n    {\n        return \$this->like('title', \$keyword)\n            ->orLike('body', \$keyword)\n            ->findAll();\n    }\n}\n`,
      'app/Controllers/Blog.php': `<?php\n\nnamespace App\\Controllers;\n\nuse App\\Models\\PostModel;\n\nclass Blog extends BaseController\n{\n    public function index(): string\n    {\n        \$model = new PostModel();\n        \$data['posts'] = \$model->getPosts();\n        return view('blog/index', \$data);\n    }\n\n    public function view(string \$slug = null): string\n    {\n        if (\$slug === null) {\n            return redirect()->to('/blog');\n        }\n        \$model = new PostModel();\n        \$data['post'] = \$model->getPostBySlug(\$slug);\n        if (!\$data['post']) {\n            throw \\CodeIgniter\\Exceptions\\PageNotFoundException::forPageNotFound();\n        }\n        return view('blog/view', \$data);\n    }\n}\n`,
      'app/Views/blog/index.php': `<?php \$this->extend('templates/main') ?>\n<?php \$this->section('content') ?>\n    <h1>Blog</h1>\n    <?php if (empty(\$posts)): ?>\n        <p>Belum ada post.</p>\n    <?php else: ?>\n        <?php foreach (\$posts as \$post): ?>\n            <article>\n                <h2><a href="/blog/<?= esc(\$post['slug']) ?>"><?= esc(\$post['title']) ?></a></h2>\n                <small><?= esc(\$post['created_at']) ?></small>\n            </article>\n        <?php endforeach; ?>\n    <?php endif; ?>\n<?php \$this->endSection() ?>\n`,
      'composer.json': PKG('models-querybuilder'),
      'package.json': PKG_NODE('ci4-lesson-6', DEV_SERVE),
      'README.md': `# CodeIgniter 4 Lesson 6 - Models & Query Builder\n\nJalankan: composer install && npm run dev\n\nModel = akses data. Query Builder = chainable SQL queries.\n`,
    },
    objId: ['Membuat model yang extends CodeIgniter\\Model', 'Menggunakan \$this->findAll(), \$this->first(), \$this->where()', 'Chainable Query Builder: orderBy(), limit(), offset(), like()', 'Menggunakan \$allowedFields untuk mass assignment protection'],
    objEn: ['Create model extending CodeIgniter\\Model', 'Use \$this->findAll(), \$this->first(), \$this->where()', 'Chainable Query Builder: orderBy(), limit(), offset(), like()', 'Use \$allowedFields for mass assignment protection'],
    expId: `## Model Conventions\nclass PostModel extends Model — nama model harus PostModel (singular, PascalCase). protected \$table = 'posts' — nama tabel (plural, snake_case). protected \$primaryKey = 'id' — primary key column. protected \$allowedFields = [...] — kolom yang bisa di-insert/update via save().\n## Query Builder Chaining\n\$this->orderBy('id', 'DESC')->limit(10)->offset(0)->findAll() — chainable methods. \$this->where('slug', \$slug)->first() — ambil 1 baris. \$this->like('title', \$keyword)->orLike('body', \$keyword)->findAll() — LIKE query dengan OR.\n## Mass Assignment\n\$allowedFields hanya kolom ini yang bisa di-save via \$model->save(\$data) atau \$model->insert(\$data). Kolom di luar \$allowedFields (seperti id, created_at) otomatis di-ignore — mencegah mass assignment vulnerability.`,
    expEn: `## Model Conventions\nclass PostModel extends Model — model name must be PostModel (singular, PascalCase). protected \$table = 'posts' — table name (plural, snake_case). protected \$primaryKey = 'id' — primary key column. protected \$allowedFields = [...] — columns insertable/updatable via save().\n## Query Builder Chaining\n\$this->orderBy('id', 'DESC')->limit(10)->offset(0)->findAll() — chainable methods. \$this->where('slug', \$slug)->first() — fetch 1 row. \$this->like('title', \$keyword)->orLike('body', \$keyword)->findAll() — LIKE query with OR.\n## Mass Assignment\n\$allowedFields only these columns can be saved via \$model->save(\$data) or \$model->insert(\$data). Columns outside \$allowedFields (like id, created_at) auto-ignored — prevents mass assignment vulnerability.`,
    chId: 'Kembangkan model: (1) tambah method getPostsByCategory(int $categoryId) di PostModel, (2) tambah method countPosts(): int yang mengembalikan total post, (3) buat pagination dengan \$model->paginate(5) dan \$pager->links(), (4) tambah method getRecentPosts(int $limit) yang mengembalikan post terbaru.',
    chEn: 'Expand model: (1) add getPostsByCategory(int $categoryId) method in PostModel, (2) add countPosts(): int method returning total posts, (3) create pagination with $model->paginate(5) and $pager->links(), (4) add getRecentPosts(int $limit) method returning latest posts.',
    sumId: 'Model = akses data. Query Builder = chainable SQL. allowedFields = mass assignment protection. paginate() = pagination. Lanjut: form handling.',
    sumEn: 'Model = data access. Query Builder = chainable SQL. allowedFields = mass assignment protection. paginate() = pagination. Next: form handling.',
  },
  {
    num: 7, topicId: 'form-validation',
    titleId: 'Form Handling & Validation', titleEn: 'Form Handling & Validation',
    codeFile: 'app/Controllers/Blog.php',
    files: {
      'app/Controllers/Blog.php': `<?php\n\nnamespace App\\Controllers;\n\nuse App\\Models\\PostModel;\n\nclass Blog extends BaseController\n{\n    public function store(): string\n    {\n        \$model = new PostModel();\n\n        if (!\$this->validate([\n            'title' => 'required|min_length[3]|max_length[255]',\n            'slug' => 'required|alpha_dash|is_unique[posts.slug]',\n            'body' => 'required',\n        ])) {\n            return view('blog/create', [\n                'validation' => \$this->validator,\n            ]);\n        }\n\n        \$model->save([\n            'title' => \$this->request->getPost('title'),\n            'slug' => \$this->request->getPost('slug'),\n            'body' => \$this->request->getPost('body'),\n        ]);\n\n        return redirect()->to('/blog')->with('message', 'Post berhasil disimpan!');\n    }\n}\n`,
      'app/Views/blog/create.php': `<?php \$this->extend('templates/main') ?>\n<?php \$this->section('content') ?>\n    <h1>Buat Post Baru</h1>\n    <?php if (session()->get('message')): ?>\n        <div class="alert"><?= session()->get('message') ?></div>\n    <?php endif; ?>\n    <form method="post" action="/blog/store">\n        <?= csrf_field() ?>\n        <label>Nama Post:</label><br>\n        <input type="text" name="title" value="<?= old('title') ?>">\n        <?php if (session('errors.title')): ?>\n            <span class="error"><?= session('errors.title') ?></span>\n        <?php endif; ?>\n        <br>\n        <label>Slug:</label><br>\n        <input type="text" name="slug" value="<?= old('slug') ?>">\n        <?php if (session('errors.slug')): ?>\n            <span class="error"><?= session('errors.slug') ?></span>\n        <?php endif; ?>\n        <br>\n        <label>Isi:</label><br>\n        <textarea name="body"><?= old('body') ?></textarea>\n        <?php if (session('errors.body')): ?>\n            <span class="error"><?= session('errors.body') ?></span>\n        <?php endif; ?>\n        <br>\n        <button type="submit">Simpan</button>\n    </form>\n<?php \$this->endSection() ?>\n`,
      'app/Config/Validation.php': `<?php\n\nnamespace Config;\n\nclass Validation extends BaseConfig\n{\n    public array \$ruleSets = [];\n\n    public function __construct()\n    {\n        parent::__construct();\n    }\n}\n`,
      'composer.json': PKG('form-validation'),
      'package.json': PKG_NODE('ci4-lesson-7', DEV_SERVE),
      'README.md': `# CodeIgniter 4 Lesson 7 - Form Handling & Validation\n\nJalankan: composer install && npm run dev\n\nValidation: \$this->validate() dengan aturan rules. csrf_field() untuk proteksi CSRF.\n`,
    },
    objId: ['Menggunakan $this->validate() dengan aturan rules', 'Menampilkan error validation di view dengan session("errors")', 'Menggunakan csrf_field() untuk proteksi CSRF', 'Menggunakan old() untuk mengisi ulang form setelah validation gagal'],
    objEn: ['Use $this->validate() with rule strings', 'Display validation errors in view with session("errors")', 'Use csrf_field() for CSRF protection', 'Use old() to repopulate form after validation failure'],
    expId: `## Validation Rules\n'required' — field tidak boleh kosong. 'min_length[X]' — minimal X karakter. 'max_length[X]' — maksimal X karakter. 'alpha_dash' — hanya huruf, angka, dash, underscore. 'is_unique[posts.slug]' — slug harus unik di tabel posts.\n## CSRF Protection\ncsrf_field() — menambahkan hidden input dengan CSRF token. CI4 otomatis memvalidasi token POST. Tanpa csrf_field(), form POST akan ditolak dengan 403 error.\n## Flash Data\nredirect()->to('/blog')->with('message', 'Berhasil!') — menyimpan pesan di session flash. Di view: session()->get('message') — mengambil dan menghapus flash data setelah dibaca.`,
    expEn: `## Validation Rules\n'required' — field must not be empty. 'min_length[X]' — minimum X characters. 'max_length[X]' — maximum X characters. 'alpha_dash' — letters, numbers, dash, underscore only. 'is_unique[posts.slug]' — slug must be unique in posts table.\n## CSRF Protection\ncsrf_field() — adds hidden input with CSRF token. CI4 auto-validates POST token. Without csrf_field(), POST form is rejected with 403 error.\n## Flash Data\nredirect()->to('/blog')->with('message', 'Success!') — stores message in session flash. In view: session()->get('message') — retrieves and deletes flash data after reading.`,
    chId: 'Tingkatkan form: (1) tambah validation untuk upload gambar (image|max_size[1024]|is_image]), (2) buat custom validation rule untuk slug yang cek duplikat secara real-time via AJAX, (3) tambah form preview yang menampilkan data sebelum submit, (4) gunakan form helper form_open() dan form_input() untuk alternatif penulisan form.',
    chEn: 'Level up form: (1) add validation for image upload (image|max_size[1024]|is_image]), (2) create custom validation rule for slug that checks duplicates via AJAX, (3) add form preview showing data before submit, (4) use form helper form_open() and form_input() as alternative form writing.',
    sumId: 'validate() = rules. csrf_field() = CSRF protection. old() = repopulate form. Flash data = pesan sukses. Lanjut: sessions.',
    sumEn: 'validate() = rules. csrf_field() = CSRF protection. old() = repopulate form. Flash data = success message. Next: sessions.',
  },
  {
    num: 8, topicId: 'sessions-flash',
    titleId: 'Sessions & Flash Data', titleEn: 'Sessions & Flash Data',
    codeFile: 'app/Controllers/Blog.php',
    files: {
      'app/Controllers/Blog.php': `<?php\n\nnamespace App\\Controllers;\n\nuse App\\Models\\PostModel;\n\nclass Blog extends BaseController\n{\n    public function index(): string\n    {\n        \$model = new PostModel();\n        \$data['posts'] = \$model->getPosts();\n        \$data['flash'] = session()->getFlashdata('message');\n        return view('blog/index', \$data);\n    }\n\n    public function store(): string\n    {\n        \$model = new PostModel();\n        \$model->save([\n            'title' => \$this->request->getPost('title'),\n            'slug' => \$this->request->getPost('slug'),\n            'body' => \$this->request->getPost('body'),\n        ]);\n\n        session()->setFlashdata('message', 'Post berhasil disimpan!');\n        return redirect()->to('/blog');\n    }\n\n    public function destroy(int \$id): string\n    {\n        \$model = new PostModel();\n        \$model->delete(\$id);\n        session()->setFlashdata('message', 'Post berhasil dihapus!');\n        return redirect()->to('/blog');\n    }\n}\n`,
      'app/Views/blog/index.php': `<?php \$this->extend('templates/main') ?>\n<?php \$this->section('content') ?>\n    <h1>Blog</h1>\n    <?php if (\$flash): ?>\n        <div class="alert alert-success"><?= esc(\$flash) ?></div>\n    <?php endif; ?>\n    <a href="/blog/create">Buat Post Baru</a>\n    <?php foreach (\$posts as \$post): ?>\n        <article>\n            <h2><?= esc(\$post['title']) ?></h2>\n            <a href="/blog/<?= esc(\$post['slug']) ?>">Baca</a> |\n            <a href="/blog/delete/<?= \$post['id'] ?>" onclick="return confirm('Hapus post ini?')">Hapus</a>\n        </article>\n    <?php endforeach; ?>\n<?php \$this->endSection() ?>\n`,
      'app/Config/Services.php': `<?php\n\nnamespace Config;\n\nuse CodeIgniter\\Config\\Services as BaseServices;\n\nclass Services extends BaseServices\n{\n    public static function session(array \$config = null): \\CodeIgniter\\HTTP\\Session\n    {\n        return parent::session(\$config);\n    }\n}\n`,
      'composer.json': PKG('sessions-flash'),
      'package.json': PKG_NODE('ci4-lesson-8', DEV_SERVE),
      'README.md': `# CodeIgniter 4 Lesson 8 - Sessions & Flash Data\n\nJalankan: composer install && npm run dev\n\nSession: menyimpan data user across requests. Flash data: pesan sekali jalan.\n`,
    },
    objId: ['Menggunakan session()->setFlashdata() dan session()->getFlashdata()', 'Menyimpan data session persisten dengan session()->set()', 'Menghapus session dengan session()->remove()', 'Menggunakan session untuk menyimpan pesan sukses/gagal'],
    objEn: ['Use session()->setFlashdata() and session()->getFlashdata()', 'Store persistent session data with session()->set()', 'Remove session with session()->remove()', 'Use session for storing success/error messages'],
    expId: `## Flash Data vs Persistent Session\nFlash data: session()->setFlashdata('key', 'value') — data tersedia HANYA untuk 1 request berikutnya, lalu otomatis dihapus. Cocok untuk pesan sukses/gagal setelah redirect. Persistent session: session()->set('key', 'value') — data tetap sampai dihapus manual atau session expired.\n## Session in CI4\nsession() helper otomatis loaded. session()->getFlashdata('message') — ambil flash data. session()->set('user_id', 42) — set persistent data. session()->remove('user_id') — hapus data. session()->destroy() — destroy entire session.\n## Delete with Confirmation\nonclick="return confirm('Hapus post ini?')" — browser native confirmation dialog. Jika user klik OK, request dilanjutkan. Jika Cancel, request dibatalkan (return false).`,
    expEn: `## Flash Data vs Persistent Session\nFlash data: session()->setFlashdata('key', 'value') — data available for ONLY the next request, then auto-deleted. Great for success/error messages after redirect. Persistent session: session()->set('key', 'value') — data stays until manually removed or session expires.\n## Session in CI4\nsession() helper auto-loaded. session()->getFlashdata('message') — retrieve flash data. session()->set('user_id', 42) — set persistent data. session()->remove('user_id') — remove data. session()->destroy() — destroy entire session.\n## Delete with Confirmation\nonclick="return confirm('Delete this post?')" — browser native confirmation dialog. If user clicks OK, request continues. If Cancel, request is cancelled (return false).`,
    chId: 'Kembangkan session: (1) buat halaman /login yang menyimpan username ke session, (2) buat /logout yang menghapus session, (3) tambah middleware yang melindungi halaman admin (cek session login), (4) simpan shopping cart di session dengan add/remove/clear methods.',
    chEn: 'Expand session: (1) create /login page storing username in session, (2) create /logout that removes session, (3) add middleware protecting admin pages (check session login), (4) store shopping cart in session with add/remove/clear methods.',
    sumId: 'Flash data = pesan sekali jalan. Session()->set() = data persisten. session()->remove() = hapus data. Lanjut: keamanan.',
    sumEn: 'Flash data = one-time message. Session()->set() = persistent data. session()->remove() = remove data. Next: security.',
  },
  {
    num: 9, topicId: 'security-filters',
    titleId: 'Security: CSRF, XSS & Filters', titleEn: 'Security: CSRF, XSS & Filters',
    codeFile: 'app/Config/Filters.php',
    files: {
      'app/Config/Filters.php': `<?php\n\nnamespace Config;\n\nuse CodeIgniter\\Config\\Filters as BaseFilters;\n\nclass Filters extends BaseFilters\n{\n    public array \$aliases = [\n        'csrf'     => \\CodeIgniter\\Filters\\CSRF::class,\n        'toolbar'  => \\CodeIgniter\\Filters\\DebugToolbar::class,\n        'honeypot' => \\CodeIgniter\\Filters\\Honeypot::class,\n    ];\n\n    public array \$before = [\n        'csrf' => ['except' => ['api/*']],\n        'honeypot' => ['except' => ['api/*']],\n    ];\n\n    public array \$after = [\n        'toolbar',\n    ];\n\n    public array \$aliases = [];\n}\n`,
      'app/Controllers/Blog.php': `<?php\n\nnamespace App\\Controllers;\n\nuse App\\Models\\PostModel;\n\nclass Blog extends BaseController\n{\n    public function store(): string\n    {\n        \$model = new PostModel();\n\n        if (!\$this->validate([\n            'title' => 'required|min_length[3]|max_length[255]',\n            'slug' => 'required|alpha_dash|is_unique[posts.slug]',\n            'body' => 'required',\n        ])) {\n            return view('blog/create', ['validation' => \$this->validator]);\n        }\n\n        \$model->save([\n            'title' => \$this->request->getPost('title'),\n            'slug' => \$this->request->getPost('slug'),\n            'body' => \$this->request->getPost('body'),\n        ]);\n\n        session()->setFlashdata('message', 'Post berhasil disimpan!');\n        return redirect()->to('/blog');\n    }\n\n    public function destroy(int \$id): string\n    {\n        \$model = new PostModel();\n        \$model->delete(\$id);\n        session()->setFlashdata('message', 'Post berhasil dihapus!');\n        return redirect()->to('/blog');\n    }\n}\n`,
      'app/Views/blog/create.php': `<?php \$this->extend('templates/main') ?>\n<?php \$this->section('content') ?>\n    <h1>Buat Post Baru</h1>\n    <form method="post" action="/blog/store">\n        <?= csrf_field() ?>\n        <input type="hidden" name="_ci_csrf_token" value="<?= csrf_hash() ?>">\n        <label>Nama Post:</label><br>\n        <input type="text" name="title" value="<?= old('title') ?>">\n        <?php if (session('errors.title')): ?>\n            <span class="error"><?= session('errors.title') ?></span>\n        <?php endif; ?>\n        <br>\n        <label>Slug:</label><br>\n        <input type="text" name="slug" value="<?= old('slug') ?>">\n        <?php if (session('errors.slug')): ?>\n            <span class="error"><?= session('errors.slug') ?></span>\n        <?php endif; ?>\n        <br>\n        <label>Isi:</label><br>\n        <textarea name="body"><?= old('body') ?></textarea>\n        <?php if (session('errors.body')): ?>\n            <span class="error"><?= session('errors.body') ?></span>\n        <?php endif; ?>\n        <br>\n        <button type="submit">Simpan</button>\n    </form>\n<?php \$this->endSection() ?>\n`,
      'composer.json': PKG('security-filters'),
      'package.json': PKG_NODE('ci4-lesson-9', DEV_SERVE),
      'README.md': `# CodeIgniter 4 Lesson 9 - Security: CSRF, XSS & Filters\n\nJalankan: composer install && npm run dev\n\nCSRF protection via Filters config. XSS prevention via esc(). Honeypot for bot protection.\n`,
    },
    objId: ['Mengaktifkan CSRF protection di Filters.php', 'Menggunakan csrf_field() dan csrf_hash() di form', 'Memahami Honeypot filter untuk proteksi bot', 'Menggunakan esc() untuk mencegah XSS di view'],
    objEn: ['Enable CSRF protection in Filters.php', 'Use csrf_field() and csrf_hash() in forms', 'Understand Honeypot filter for bot protection', 'Use esc() to prevent XSS in views'],
    expId: `## CSRF in CI4\nFilters.php \$before = ['csrf'] — CSRF filter otomatis memvalidasi setiap POST request. csrf_field() — menambahkan hidden input dengan token. csrf_hash() — mengembalikan nilai token untuk manual embedding.\n## XSS Prevention\nesc(\$variable) — escape HTML entities. CI4 auto-escapes all output in views when using <?= ?> shorthand. Never use <?= \$userInput ?> without esc().\n## Honeypot Filter\nHoneypot adds a hidden field that real users never fill. Bots auto-fill it. If honeypot field has value, request is rejected as bot.\n## Filter Aliases\n'csrf' => CSRF::class — proteksi CSRF. 'honeypot' => Honeypot::class — proteksi bot. 'toolbar' => DebugToolbar::class — debug toolbar (development only).`,
    expEn: `## CSRF in CI4\nFilters.php \$before = ['csrf'] — CSRF filter auto-validates every POST request. csrf_field() — adds hidden input with token. csrf_hash() — returns token value for manual embedding.\n## XSS Prevention\nesc(\$variable) — escape HTML entities. CI4 auto-escapes all output in views when using <?= ?> shorthand. Never use <?= \$userInput ?> without esc().\n## Honeypot Filter\nHoneypot adds a hidden field that real users never fill. Bots auto-fill it. If honeypot field has value, request is rejected as bot.\n## Filter Aliases\n'csrf' => CSRF::class — CSRF protection. 'honeypot' => Honeypot::class — bot protection. 'toolbar' => DebugToolbar::class — debug toolbar (development only).`,
    chId: 'Tingkatkan keamanan: (1) buat filter custom yang memblokir request dari IP yang terdeteksi spam, (2) tambah rate limiting untuk form submit (maksimal 3 submit per menit), (3) implementasi Content Security Policy (CSP) header di Filters.php, (4) tambah logging untuk semua request yang ditolak oleh filter.',
    chEn: 'Level up security: (1) create custom filter that blocks requests from detected spam IPs, (2) add rate limiting for form submit (max 3 submits per minute), (3) implement Content Security Policy (CSP) headers in Filters.php, (4) add logging for all requests rejected by filters.',
    sumId: 'CSRF = proteksi form POST. XSS = esc() di view. Honeypot = anti bot. Filters = middleware chain. Lanjut: authentication.',
    sumEn: 'CSRF = form POST protection. XSS = esc() in views. Honeypot = anti bot. Filters = middleware chain. Next: authentication.',
  },
  {
    num: 10, topicId: 'authentication',
    titleId: 'Authentication & Authorization', titleEn: 'Authentication & Authorization',
    codeFile: 'app/Controllers/Auth.php',
    files: {
      'app/Controllers/Auth.php': `<?php\n\nnamespace App\\Controllers;\n\nuse CodeIgniter\\HTTP\\HTTPRequest;\n\nclass Auth extends BaseController\n{\n    public function login(): string\n    {\n        if (\$this->request->getMethod() === 'post') {\n            \$username = \$this->request->getPost('username');\n            \$password = \$this->request->getPost('password');\n\n            if (\$username === 'admin' && \$password === 'secret123') {\n                session()->set('user_id', 1);\n                session()->set('username', \$username);\n                return redirect()->to('/admin');\n            }\n\n            session()->setFlashdata('error', 'Username atau password salah!');\n            return redirect()->back()->withInput();\n        }\n\n        return view('auth/login');\n    }\n\n    public function logout(): string\n    {\n        session()->destroy();\n        return redirect()->to('/');\n    }\n\n    public function isLoggedIn(): bool\n    {\n        return session()->get('user_id') !== null;\n    }\n}\n`,
      'app/Views/auth/login.php': `<?php \$this->extend('templates/main') ?>\n<?php \$this->section('content') ?>\n    <h1>Login</h1>\n    <?php if (session()->getFlashdata('error')): ?>\n        <div class="alert alert-danger"><?= session()->getFlashdata('error') ?></div>\n    <?php endif; ?>\n    <form method="post" action="/login">\n        <?= csrf_field() ?>\n        <label>Username:</label><br>\n        <input type="text" name="username" value="<?= old('username') ?>">\n        <br>\n        <label>Password:</label><br>\n        <input type="password" name="password">\n        <br>\n        <button type="submit">Masuk</button>\n    </form>\n<?php \$this->endSection() ?>\n`,
      'app/Filters/AuthFilter.php': `<?php\n\nnamespace App\\Filters;\n\nuse CodeIgniter\\HTTP\\FilterInterface;\nuse CodeIgniter\\HTTP\\IncomingRequest;\nuse CodeIgniter\\HTTP\\Response;\n\nclass AuthFilter implements FilterInterface\n{\n    public function before(IncomingRequest \$request, \$arguments = null)\n    {\n        if (!session()->get('user_id')) {\n            return redirect()->to('/login');\n        }\n    }\n\n    public function after(IncomingRequest \$request, Response \$response, \$arguments = null)\n    {\n        // Do nothing after request\n    }\n}\n`,
      'app/Config/Routes.php': `<?php\n\n\$routes->get('/', 'Home::index');\n\$routes->get('login', 'Auth::login');\n\$routes->post('login', 'Auth::login');\n\$routes->get('logout', 'Auth::logout');\n\$routes->group('admin', ['filter' => 'auth'], function (\$routes) {\n    \$routes->get('/', 'Admin::index');\n});\n`,
      'composer.json': PKG('authentication'),
      'package.json': PKG_NODE('ci4-lesson-10', DEV_SERVE),
      'README.md': `# CodeIgniter 4 Lesson 10 - Authentication & Authorization\n\nJalankan: composer install && npm run dev\n\nLogin/logout dengan session. Filter untuk melindungi route admin.\n`,
    },
    objId: ['Membuat controller Auth dengan method login dan logout', 'Menggunakan session untuk menyimpan status login user', 'Membuat custom filter (AuthFilter) untuk melindungi route', 'Menggunakan \$routes->group() dengan filter untuk route grouping'],
    objEn: ['Create Auth controller with login and logout methods', 'Use session to store user login status', 'Create custom filter (AuthFilter) to protect routes', 'Use $routes->group() with filter for route grouping'],
    expId: `## Authentication Flow\nLogin: user submits form -> controller validates -> session->set('user_id', ...) -> redirect to protected page. Logout: session->destroy() -> redirect to home. AuthFilter::before() checks session->get('user_id') -> redirect to login if not set.\n## Route Groups\n\$routes->group('admin', ['filter' => 'auth'], function(\$routes) { ... }) — semua route di dalam group memerlukan 'auth' filter. Jika user belum login, filter redirect ke /login.\n## Session Security\nsession()->set('user_id', \$userId) — store user ID. session()->get('user_id') — check if logged in. session()->destroy() — logout. Never store password in session. Always use session->regenerate() after login to prevent session fixation.`,
    expEn: `## Authentication Flow\nLogin: user submits form -> controller validates -> session->set('user_id', ...) -> redirect to protected page. Logout: session->destroy() -> redirect to home. AuthFilter::before() checks session->get('user_id') -> redirect to login if not set.\n## Route Groups\n$routes->group('admin', ['filter' => 'auth'], function($routes) { ... }) — all routes in group require 'auth' filter. If user not logged in, filter redirects to /login.\n## Session Security\nsession()->set('user_id', $userId) — store user ID. session()->get('user_id') — check if logged in. session->destroy() — logout. Never store password in session. Always use session->regenerate() after login to prevent session fixation.`,
    chId: 'Tingkatkan authentication: (1) buat halaman register dengan validasi password confirmation, (2) simpan user di database (tabel users) alih-alih hardcode, (3) tambah middleware role-based (admin vs user), (4) implementasi remember-me dengan cookie persisten.',
    chEn: 'Level up authentication: (1) create register page with password confirmation validation, (2) store user in database (users table) instead of hardcode, (3) add role-based middleware (admin vs user), (4) implement remember-me with persistent cookie.',
    sumId: 'Auth = login/logout. Session = status user. Filter = proteksi route. Route group = grouping + filter. Lanjut: REST API.',
    sumEn: 'Auth = login/logout. Session = user status. Filter = route protection. Route group = grouping + filter. Next: REST API.',
  },
  {
    num: 11, topicId: 'rest-api',
    titleId: 'RESTful APIs', titleEn: 'RESTful APIs',
    codeFile: 'app/Controllers/Api/Posts.php',
    files: {
      'app/Controllers/Api/Posts.php': `<?php\n\nnamespace App\\Controllers\\Api;\n\nuse App\\Models\\PostModel;\n\nclass Posts extends BaseController\n{\n    public function index(): string\n    {\n        \$model = new PostModel();\n        return \$this->response->setJSON(\$model->findAll());\n    }\n\n    public function show(int \$id = null): string\n    {\n        if (\$id === null) {\n            return \$this->failNotFound('Post ID required');\n        }\n        \$model = new PostModel();\n        \$post = \$model->find(\$id);\n        if (!\$post) {\n            return \$this->failNotFound('Post not found');\n        }\n        return \$this->response->setJSON(\$post);\n    }\n\n    public function create(): string\n    {\n        \$model = new PostModel();\n        \$data = \$this->request->getJSON(true) ?? \$this->request->getPost();\n\n        if (!\$model->insert(\$data)) {\n            return \$this->fail(\$model->errors(), 422);\n        }\n\n        return \$this->response->setJSON(['id' => \$model->getInsertID()])->setStatusCode(201);\n    }\n\n    public function update(int \$id = null): string\n    {\n        if (\$id === null) {\n            return \$this->failNotFound('Post ID required');\n        }\n        \$model = new PostModel();\n        \$data = \$this->request->getJSON(true) ?? \$this->request->getPost();\n\n        if (!\$model->update(\$id, \$data)) {\n            return \$this->fail(\$model->errors(), 422);\n        }\n\n        return \$this->response->setJSON(['message' => 'Updated']);\n    }\n\n    public function delete(int \$id = null): string\n    {\n        if (\$id === null) {\n            return \$this->failNotFound('Post ID required');\n        }\n        \$model = new PostModel();\n        \$model->delete(\$id);\n        return \$this->response->setJSON(['message' => 'Deleted']);\n    }\n}\n`,
      'app/Config/Routes.php': `<?php\n\n\$routes->get('/', 'Home::index');\n\$routes->get('blog', 'Blog::index');\n\$routes->get('blog/(:any)', 'Blog::view/\$1');\n\$routes->get('blog/create', 'Blog::create');\n\$routes->post('blog/store', 'Blog::store');\n\n// API Routes\n\$routes->group('api', function (\$routes) {\n    \$routes->get('posts', 'Api\\Posts::index');\n    \$routes->get('posts/(:num)', 'Api\\Posts::show/\$1');\n    \$routes->post('posts', 'Api\\Posts::create');\n    \$routes->put('posts/(:num)', 'Api\\Posts::update/\$1');\n    \$routes->delete('posts/(:num)', 'Api\\Posts::delete/\$1');\n});\n`,
      'composer.json': PKG('rest-api'),
      'package.json': PKG_NODE('ci4-lesson-11', DEV_SERVE),
      'README.md': `# CodeIgniter 4 Lesson 11 - RESTful APIs\n\nJalankan: composer install && npm run dev\n\nAPI: GET /api/posts, POST /api/posts, PUT /api/posts/:id, DELETE /api/posts/:id\n`,
    },
    objId: ['Membuat controller API yang mengembalikan JSON', 'Menggunakan \$this->response->setJSON() untuk response JSON', 'Menggunakan \$this->failNotFound() dan \$this->fail() untuk error response', 'Menggunakan \$this->request->getJSON() untuk menerima JSON body'],
    objEn: ['Create API controller returning JSON', 'Use $this->response->setJSON() for JSON responses', 'Use $this->failNotFound() and $this->fail() for error responses', 'Use $this->request->getJSON() to receive JSON body'],
    expId: `## REST API Conventions\nGET /api/posts — list all. GET /api/posts/:id — get one. POST /api/posts — create. PUT /api/posts/:id — update. DELETE /api/posts/:id — delete. HTTP status codes: 200 OK, 201 Created, 404 Not Found, 422 Unprocessable Entity.\n## JSON Response\n\$this->response->setJSON(\$data) — set JSON body and Content-Type header. \$this->response->setStatusCode(201) — set HTTP status code. \$this->failNotFound('msg') — return 404 with message. \$this->fail(\$errors, 422) — return 422 with validation errors.\n## JSON Request\n\$this->request->getJSON(true) — parse JSON body as associative array. \$this->request->getPost() — parse form data. Using ?? operator: getJSON(true) ?? getPost() — try JSON first, fallback to form data.`,
    expEn: `## REST API Conventions\nGET /api/posts — list all. GET /api/posts/:id — get one. POST /api/posts — create. PUT /api/posts/:id — update. DELETE /api/posts/:id — delete. HTTP status codes: 200 OK, 201 Created, 404 Not Found, 422 Unprocessable Entity.\n## JSON Response\n$this->response->setJSON($data) — set JSON body and Content-Type header. $this->response->setStatusCode(201) — set HTTP status code. $this->failNotFound('msg') — return 404 with message. $this->fail($errors, 422) — return 422 with validation errors.\n## JSON Request\n$this->request->getJSON(true) — parse JSON body as associative array. $this->request->getPost() — parse form data. Using ?? operator: getJSON(true) ?? getPost() — try JSON first, fallback to form data.`,
    chId: 'Tingkatkan API: (1) tambah pagination di GET /api/posts dengan query parameter ?page=1&per_page=10, (2) tambah search dengan ?q=keyword di index method, (3) tambah API authentication dengan Bearer token, (4) buat API versioning dengan /api/v1/posts dan /api/v2/posts.',
    chEn: 'Level up API: (1) add pagination to GET /api/posts with ?page=1&per_page=10 query param, (2) add search with ?q=keyword in index method, (3) add API authentication with Bearer token, (4) create API versioning with /api/v1/posts and /api/v2/posts.',
    sumId: 'API = JSON response. setJSON() = JSON body. failNotFound() = 404. getJSON() = parse JSON request. Lanjut: file upload.',
    sumEn: 'API = JSON response. setJSON() = JSON body. failNotFound() = 404. getJSON() = parse JSON request. Next: file upload.',
  },
  {
    num: 12, topicId: 'file-upload-pagination',
    titleId: 'File Uploads & Pagination', titleEn: 'File Uploads & Pagination',
    codeFile: 'app/Controllers/Upload.php',
    files: {
      'app/Controllers/Upload.php': `<?php\n\nnamespace App\\Controllers;\n\nuse App\\Models\\PostModel;\n\nclass Upload extends BaseController\n{\n    public function index(): string\n    {\n        \$model = new PostModel();\n        \$data['posts'] = \$model->paginate(5, 'posts');\n        \$data['pager'] = \$model->pager;\n        return view('blog/index', \$data);\n    }\n\n    public function upload(): string\n    {\n        \$file = \$this->request->getFile('image');\n\n        if (!\$file->isValid()) {\n            session()->setFlashdata('error', 'File tidak valid');\n            return redirect()->back();\n        }\n\n        if (!\$file->move(WRITEPATH . 'uploads/')) {\n            session()->setFlashdata('error', 'Gagal upload file');\n            return redirect()->back();\n        }\n\n        session()->setFlashdata('message', 'File berhasil diupload: ' . \$file->getClientName());\n        return redirect()->to('/blog');\n    }\n}\n`,
      'app/Views/blog/index.php': `<?php \$this->extend('templates/main') ?>\n<?php \$this->section('content') ?>\n    <h1>Blog</h1>\n    <?php if (session()->getFlashdata('message')): ?>\n        <div class="alert"><?= session()->getFlashdata('message') ?></div>\n    <?php endif; ?>\n    <?php foreach (\$posts as \$post): ?>\n        <article>\n            <h2><?= esc(\$post['title']) ?></h2>\n            <?php if (!empty(\$post['image'])): ?>\n                <img src="/uploads/<?= esc(\$post['image']) ?>" width="200">\n            <?php endif; ?>\n        </article>\n    <?php endforeach; ?>\n    <?= \$pager->links('posts', 'bootstrap_full') ?>\n<?php \$this->endSection() ?>\n`,
      'composer.json': PKG('file-upload-pagination'),
      'package.json': PKG_NODE('ci4-lesson-12', DEV_SERVE),
      'README.md': `# CodeIgniter 4 Lesson 12 - File Uploads & Pagination\n\nJalankan: composer install && npm run dev\n\nUpload: \$this->request->getFile() -> move(). Pagination: \$model->paginate(5).\n`,
    },
    objId: ['Menggunakan $this->request->getFile() untuk menerima file upload', 'Menggunakan $file->move() untuk menyimpan file ke direktori', 'Menggunakan $model->paginate() untuk pagination', 'Menggunakan $pager->links() untuk menampilkan link pagination'],
    objEn: ['Use $this->request->getFile() to receive file upload', 'Use $file->move() to save file to directory', 'Use $model->paginate() for pagination', 'Use $pager->links() to display pagination links'],
    expId: `## File Upload\n$file = $this->request->getFile('image') — get uploaded file object. $file->isValid() — check if upload succeeded. $file->move(WRITEPATH . 'uploads/') — save file. WRITEPATH = writable/ directory. $file->getClientName() — original filename. $file->getRandomName() — generate random name to prevent collisions.\n## Pagination\n$model->paginate(5, 'posts') — get 5 records per page, group named 'posts'. $pager->links('posts', 'bootstrap_full') — render pagination links. Pagination automatically handles ?page=N query parameter.\n## Security\nAlways validate file type and size before moving. Use $file->getMimeType() to check MIME type. Limit file size with $this->validate(['image' => 'uploaded[image]|max_size[image,1024]|is_image[image]]).`,
    expEn: `## File Upload\n$file = $this->request->getFile('image') — get uploaded file object. $file->isValid() — check if upload succeeded. $file->move(WRITEPATH . 'uploads/') — save file. WRITEPATH = writable/ directory. $file->getClientName() — original filename. $file->getRandomName() — generate random name to prevent collisions.\n## Pagination\n$model->paginate(5, 'posts') — get 5 records per page, group named 'posts'. $pager->links('posts', 'bootstrap_full') — render pagination links. Pagination automatically handles ?page=N query parameter.\n## Security\nAlways validate file type and size before moving. Use $file->getMimeType() to check MIME type. Limit file size with $this->validate(['image' => 'uploaded[image]|max_size[image,1024]|is_image[image]]).`,
    chId: 'Tingkatkan upload & pagination: (1) tambah image resize sebelum save menggunakan CI4 image service, (2) tambah multiple file upload (getFiles() bukan getFile()), (3) tambah drag-and-drop upload dengan JavaScript di view, (4) custom pagination template dengan angka halaman dan tombol prev/next.',
    chEn: 'Level up upload & pagination: (1) add image resize before save using CI4 image service, (2) add multiple file upload (getFiles() instead of getFile()), (3) add drag-and-drop upload with JavaScript in view, (4) custom pagination template with page numbers and prev/next buttons.',
    sumId: 'getFile() = upload file. move() = simpan file. paginate() = pagination. pager->links() = tampil pagination. Lanjut: caching.',
    sumEn: 'getFile() = upload file. move() = save file. paginate() = pagination. pager->links() = show pagination. Next: caching.',
  },
  {
    num: 13, topicId: 'caching-performance',
    titleId: 'Caching & Performance', titleEn: 'Caching & Performance',
    codeFile: 'app/Controllers/Blog.php',
    files: {
      'app/Controllers/Blog.php': `<?php\n\nnamespace App\\Controllers;\n\nuse App\\Models\\PostModel;\n\nclass Blog extends BaseController\n{\n    public function index(): string\n    {\n        \$model = new PostModel();\n\n        // Check cache first\n        if (!\$cached = cache('posts_list')) {\n            \$data['posts'] = \$model->getPosts();\n            save_to_cache('posts_list', \$data['posts'], 300); // 5 minutes\n        } else {\n            \$data['posts'] = \$cached;\n        }\n\n        return view('blog/index', \$data);\n    }\n\n    public function view(string \$slug = null): string\n    {\n        if (\$slug === null) {\n            return redirect()->to('/blog');\n        }\n\n        \$cacheKey = 'post_' . \$slug;\n        if (!\$post = cache(\$cacheKey)) {\n            \$model = new PostModel();\n            \$post = \$model->getPostBySlug(\$slug);\n            if (!\$post) {\n                throw \\CodeIgniter\\Exceptions\\PageNotFoundException::forPageNotFound();\n            }\n            save_to_cache(\$cacheKey, \$post, 600); // 10 minutes\n        }\n\n        return view('blog/view', ['post' => \$post]);\n    }\n}\n`,
      'app/Config/Services.php': `<?php\n\nnamespace Config;\n\nuse CodeIgniter\\Config\\Services as BaseServices;\n\nclass Services extends BaseServices\n{\n    public static function cache(\$config = null)\n    {\n        return parent::cache(\$config);\n    }\n}\n`,
      'app/Config/Cache.php': `<?php\n\nnamespace Config;\n\nclass Cache extends BaseConfig\n{\n    public string \$defaultHandler = 'file';\n    public array \$backupHandler = 'file';\n    public array \$handlers = [\n        'file' => [\n            'handler' => \\CodeIgniter\\Cache\\Handlers\\FileHandler::class,\n            'config' => [\n                'path' => WRITEPATH . 'cache/',\n            ],\n        ],\n    ];\n}\n`,
      'composer.json': PKG('caching-performance'),
      'package.json': PKG_NODE('ci4-lesson-13', DEV_SERVE),
      'README.md': `# CodeIgniter 4 Lesson 13 - Caching & Performance\n\nJalankan: composer install && npm run dev\n\nCache: cache() dan save_to_cache(). File handler untuk development.\n`,
    },
    objId: ['Menggunakan cache() untuk menyimpan dan mengambil data dari cache', 'Menggunakan save_to_cache() untuk menyimpan data dengan TTL', 'Memilih file handler untuk development dan Redis/Memcached untuk production', 'Menggunakan cache untuk mengurangi query database yang berulang'],
    objEn: ['Use cache() to store and retrieve data from cache', 'Use save_to_cache() to store data with TTL', 'Choose file handler for development and Redis/Memcached for production', 'Use cache to reduce repeated database queries'],
    expId: `## Cache in CI4\ncache('key') — retrieve from cache. save_to_cache('key', \$data, \$ttl) — store with TTL (seconds). cache()->get('key') — alternative syntax. cache()->save('key', \$data, \$ttl) — alternative store.\n## Cache Handlers\nFile handler (default): menyimpan cache sebagai file di writable/cache/. Redis handler: untuk production dengan Redis server. Memcached handler: untuk production dengan Memcached. Pilih handler di app/Config/Cache.php.\n## Cache Invalidation\nHapus cache saat data berubah: cache()->delete('posts_list'). Hapus semua cache: cache()->flush(). TTL (Time To Live): setelah TTL expired, cache otomatis dihapus dan data diambil dari database lagi.`,
    expEn: `## Cache in CI4\ncache('key') — retrieve from cache. save_to_cache('key', $data, $ttl) — store with TTL (seconds). cache()->get('key') — alternative syntax. cache()->save('key', $data, $ttl) — alternative store.\n## Cache Handlers\nFile handler (default): stores cache as files in writable/cache/. Redis handler: for production with Redis server. Memcached handler: for production with Memcached. Choose handler in app/Config/Cache.php.\n## Cache Invalidation\nDelete cache when data changes: cache()->delete('posts_list'). Delete all cache: cache()->flush(). TTL (Time To Live): after TTL expires, cache auto-deleted and data fetched from database again.`,
    chId: 'Tingkatkan caching: (1) implementasi cache tagging untuk invalidate cache berdasarkan kategori, (2) buat view cache untuk halaman yang jarang berubah, (3) bandingkan performa dengan dan tanpa cache menggunakan timer CI4, (4) implementasi Redis handler untuk production environment.',
    chEn: 'Level up caching: (1) implement cache tagging for invalidating cache by category, (2) create view cache for rarely changing pages, (3) benchmark performance with and without cache using CI4 timer, (4) implement Redis handler for production environment.',
    sumId: 'cache() = ambil data. save_to_cache() = simpan data. TTL = time to live. File handler = dev. Redis = production. Lanjut: advanced topics.',
    sumEn: 'cache() = retrieve data. save_to_cache() = store data. TTL = time to live. File handler = dev. Redis = production. Next: advanced topics.',
  },
  {
    num: 14, topicId: 'advanced-topics',
    titleId: 'Advanced Topics: Events, CLI & Generators', titleEn: 'Advanced Topics: Events, CLI & Generators',
    codeFile: 'app/Config/Events.php',
    files: {
      'app/Config/Events.php': `<?php\n\nnamespace Config;\n\nuse CodeIgniter\\Config\Services as BaseServices;\n\nclass Events extends BaseServices\n{\n    public static function postBlogCreated(array \$data): void\n    {\n        log_message('info', 'Blog post created: ' . \$data['title']);\n    }\n}\n`,
      'app/Controllers/Blog.php': `<?php\n\nnamespace App\\Controllers;\n\nuse App\\Models\\PostModel;\nuse Config\\Events;\n\nclass Blog extends BaseController\n{\n    public function store(): string\n    {\n        \$model = new PostModel();\n        \$model->save([\n            'title' => \$this->request->getPost('title'),\n            'slug' => \$this->request->getPost('slug'),\n            'body' => \$this->request->getPost('body'),\n        ]);\n\n        Events::postBlogCreated(['title' => \$this->request->getPost('title')]);\n\n        session()->setFlashdata('message', 'Post berhasil disimpan!');\n        return redirect()->to('/blog');\n    }\n}\n`,
      'app/Commands/Hello.php': `<?php\n\nnamespace App\\Commands;\n\nuse CodeIgniter\\CLI\BaseCommand;\nuse CodeIgniter\\CLI\CLI;\n\nclass Hello extends BaseCommand\n{\n    protected \$group = 'Tutorial';\n    protected \$name = 'hello';\n    protected \$description = 'Say hello';\n    protected \$usage = 'hello [name]';\n\n    public function run(array \$params)\n    {\n        \$name = \$params[0] ?? 'World';\n        CLI::write("Hello, {\$name}!", 'green');\n    }\n}\n`,
      'composer.json': PKG('advanced-topics'),
      'package.json': PKG_NODE('ci4-lesson-14', DEV_SERVE),
      'README.md': `# CodeIgniter 4 Lesson 14 - Advanced Topics\n\nJalankan: composer install && npm run dev\n\nEvents: hook into CI4 lifecycle. CLI: custom commands. Generators: scaffold code.\n`,
    },
    objId: ['Memahami Events system untuk decoupled code', 'Membuat custom CLI command dengan php spark hello', 'Menggunakan log_message() untuk logging', 'Memahami CI4 Generators untuk scaffold code'],
    objEn: ['Understand Events system for decoupled code', 'Create custom CLI command with php spark hello', 'Use log_message() for logging', 'Understand CI4 Generators for scaffold code'],
    expId: `## Events System\nEvents::postBlogCreated() — trigger custom event after blog post created. Other parts of app can listen to this event without modifying Blog controller. Decouples code: controller doesn't need to know what happens after post creation.\n## CLI Commands\nphp spark hello — menjalankan custom command. BaseCommand::run() — method yang dieksekusi. CLI::write() — output ke terminal dengan warna. CLI::prompt() — meminta input dari user.\n## Generators\nphp spark make:controller Nama — generate controller. php spark make:model Nama — generate model. php spark make:migration Nama — generate migration. php spark make:seeder Nama — generate seeder. php spark make:filter Nama — generate filter.`,
    expEn: `## Events System\nEvents::postBlogCreated() — trigger custom event after blog post created. Other parts of app can listen to this event without modifying Blog controller. Decouples code: controller doesn't need to know what happens after post creation.\n## CLI Commands\nphp spark hello — run custom command. BaseCommand::run() — method executed. CLI::write() — output to terminal with color. CLI::prompt() — request input from user.\n## Generators\nphp spark make:controller Name — generate controller. php spark make:model Name — generate model. php spark make:migration Name — generate migration. php spark make:seeder Name — generate seeder. php spark make:filter Name — generate filter.`,
    chId: 'Jelajahi advanced topics: (1) buat event listener yang mengirim email notification saat post dibuat, (2) buat CLI command yang meng-export semua post ke JSON file, (3) buat custom generator yang menghasilkan CRUD scaffold lengkap, (4) buat event yang mencatat setiap request ke log file custom.',
    chEn: 'Explore advanced topics: (1) create event listener that sends email notification when post is created, (2) create CLI command that exports all posts to JSON file, (3) create custom generator that produces full CRUD scaffold, (4) create event that logs every request to custom log file.',
    sumId: 'Events = decoupled hooks. CLI = custom commands. Generators = scaffold code. log_message() = logging. Lanjut: testing.',
    sumEn: 'Events = decoupled hooks. CLI = custom commands. Generators = scaffold code. log_message() = logging. Next: testing.',
  },
  {
    num: 15, topicId: 'testing-phpunit',
    titleId: 'Testing with PHPUnit', titleEn: 'Testing with PHPUnit',
    codeFile: 'tests/Feature/BlogTest.php',
    files: {
      'tests/Feature/BlogTest.php': `<?php\n\nnamespace Tests\\Feature;\n\nuse CodeIgniter\\Test\\CIUnitTestCase;\nuse CodeIgniter\\Test\\ControllerTester;\nuse CodeIgniter\\Test\\FeatureTestTrait;\n\nclass BlogTest extends CIUnitTestCase\n{\n    use FeatureTestTrait;\n    use ControllerTester;\n\n    public function test_homepage_returns_200(): void\n    {\n        \$result = \$this->withOutputEnabled()\n            ->get('/');\n\n        \$this->assertEquals(200, \$result->getStatusCode());\n    }\n\n    public function test_blog_index_returns_200(): void\n    {\n        \$result = \$this->get('/blog');\n\n        \$this->assertEquals(200, \$result->getStatusCode());\n        \$this->assertStringContainsString('Blog', \$result->getBody());\n    }\n\n    public function test_blog_view_returns_404_for_missing_post(): void\n    {\n        \$result = \$this->get('/blog/non-existent-post');\n\n        \$this->assertEquals(404, \$result->getStatusCode());\n    }\n\n    public function test_login_page_loads(): void\n    {\n        \$result = \$this->get('/login');\n\n        \$this->assertEquals(200, \$result->getStatusCode());\n        \$this->assertStringContainsString('Login', \$result->getBody());\n    }\n}\n`,
      'app/Models/PostModel.php': `<?php\n\nnamespace App\\Models;\n\nuse CodeIgniter\\Model;\n\nclass PostModel extends Model\n{\n    protected \$table = 'posts';\n    protected \$primaryKey = 'id';\n    protected \$allowedFields = ['title', 'slug', 'body'];\n    protected \$useTimestamps = true;\n    protected \$createdField = 'created_at';\n    protected \$updatedField = 'updated_at';\n\n    public function getPosts(int \$limit = 10, int \$offset = 0): array\n    {\n        return \$this->orderBy('id', 'DESC')\n            ->limit(\$limit)\n            ->offset(\$offset)\n            ->findAll();\n    }\n\n    public function getPostBySlug(string \$slug): ?array\n    {\n        return \$this->where('slug', \$slug)->first();\n    }\n}\n`,
      'phpunit.xml': `<?xml version="1.0" encoding="UTF-8"?>\n<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n         xsi:noNamespaceSchemaLocation="vendor/phpunit/phpunit/phpunit.xsd"\n         bootstrap="vendor/autoload.php"\n         colors="true">\n    <testsuites>\n        <testsuite name="Feature">\n            <directory>tests/Feature</directory>\n        </testsuite>\n        <testsuite name="Unit">\n            <directory>tests/Unit</directory>\n        </testsuite>\n    </testsuites>\n</phpunit>\n`,
      'composer.json': PKG('testing-phpunit', '', '"phpunit/phpunit": "^11.0"'),
      'package.json': PKG_NODE('ci4-lesson-15', DEV_SERVE),
      'README.md': `# CodeIgniter 4 Lesson 15 - Testing with PHPUnit\n\nJalankan: composer install && vendor/bin/phpunit\n\nTest: CIUnitTestCase, FeatureTestTrait, assertEquals, assertStringContainsString.\n`,
    },
    objId: ['Menulis test PHPUnit dengan CIUnitTestCase', 'Menggunakan FeatureTestTrait untuk test HTTP requests', 'Menggunakan assertEquals dan assertStringContainsString', 'Menjalankan test dengan vendor/bin/phpunit'],
    objEn: ['Write PHPUnit tests with CIUnitTestCase', 'Use FeatureTestTrait for HTTP request testing', 'Use assertEquals and assertStringContainsString', 'Run tests with vendor/bin/phpunit'],
    expId: `## CI4 Testing\nCIUnitTestCase — base class for all tests. FeatureTestTrait — enables \$this->get(), \$this->post(), \$this->withOutputEnabled() for testing HTTP requests. ControllerTester — enables \$this->controller() for testing controller methods directly.\n## Test Methods\ntest_homepage_returns_200() — method name must start with test_. \$this->get('/') — simulate GET request. \$this->assertEquals(200, \$result->getStatusCode()) — assert HTTP status. \$this->assertStringContainsString('Blog', \$result->getBody()) — assert response body contains text.\n## Running Tests\nvendor/bin/phpunit — run all tests. vendor/bin/phpunit --filter BlogTest — run specific test class. vendor/bin/phpunit --filter test_homepage_returns_200 — run specific test method. vendor/bin/phpunit --coverage-text — show code coverage.`,
    expEn: `## CI4 Testing\nCIUnitTestCase — base class for all tests. FeatureTestTrait — enables $this->get(), $this->post(), $this->withOutputEnabled() for testing HTTP requests. ControllerTester — enables $this->controller() for testing controller methods directly.\n## Test Methods\ntest_homepage_returns_200() — method name must start with test_. $this->get('/') — simulate GET request. $this->assertEquals(200, $result->getStatusCode()) — assert HTTP status. $this->assertStringContainsString('Blog', $result->getBody()) — assert response body contains text.\n## Running Tests\nvendor/bin/phpunit — run all tests. vendor/bin/phpunit --filter BlogTest — run specific test class. vendor/bin/phpunit --filter test_homepage_returns_200 — run specific test method. vendor/bin/phpunit --coverage-text — show code coverage.`,
    chId: 'Tingkatkan testing: (1) tambah test untuk method store() yang menguji form submission dengan validasi berhasil dan gagal, (2) tambah test untuk method destroy() yang menguji delete post, (3) buat unit test untuk PostModel yang menguji getPosts() dan getPostBySlug(), (4) tambah test untuk CSRF protection dan authentication filter.',
    chEn: 'Level up testing: (1) add test for store() method that tests form submission with valid and invalid data, (2) add test for destroy() method that tests post deletion, (3) create unit test for PostModel that tests getPosts() and getPostBySlug(), (4) add test for CSRF protection and authentication filter.',
    sumId: 'CIUnitTestCase = base test class. FeatureTestTrait = HTTP testing. assertEquals = assert status. vendor/bin/phpunit = run tests. Lanjut: proyek akhir.',
    sumEn: 'CIUnitTestCase = base test class. FeatureTestTrait = HTTP testing. assertEquals = assert status. vendor/bin/phpunit = run tests. Next: final project.',
  },
  {
    num: 16, topicId: 'capstone-project',
    titleId: 'Proyek Akhir: Blog CI4', titleEn: 'Final Project: CI4 Blog',
    codeFile: 'app/Controllers/Blog.php',
    files: {
      'app/Controllers/Blog.php': `<?php\n\nnamespace App\\Controllers;\n\nuse App\\Models\\PostModel;\n\nclass Blog extends BaseController\n{\n    public function index(): string\n    {\n        \$model = new PostModel();\n        \$data['posts'] = \$model->getPosts();\n        \$data['flash'] = session()->getFlashdata('message');\n        return view('blog/index', \$data);\n    }\n\n    public function view(string \$slug = null): string\n    {\n        if (\$slug === null) {\n            return redirect()->to('/blog');\n        }\n        \$model = new PostModel();\n        \$data['post'] = \$model->getPostBySlug(\$slug);\n        if (!\$data['post']) {\n            throw \\CodeIgniter\\Exceptions\\PageNotFoundException::forPageNotFound();\n        }\n        return view('blog/view', \$data);\n    }\n\n    public function create(): string\n    {\n        if (!session()->get('user_id')) {\n            return redirect()->to('/login');\n        }\n        return view('blog/create');\n    }\n\n    public function store(): string\n    {\n        \$model = new PostModel();\n\n        if (!\$this->validate([\n            'title' => 'required|min_length[3]|max_length[255]',\n            'slug' => 'required|alpha_dash|is_unique[posts.slug]',\n            'body' => 'required',\n        ])) {\n            return view('blog/create', ['validation' => \$this->validator]);\n        }\n\n        \$model->save([\n            'title' => \$this->request->getPost('title'),\n            'slug' => \$this->request->getPost('slug'),\n            'body' => \$this->request->getPost('body'),\n        ]);\n\n        session()->setFlashdata('message', 'Post berhasil disimpan!');\n        return redirect()->to('/blog');\n    }\n\n    public function destroy(int \$id): string\n    {\n        if (!session()->get('user_id')) {\n            return redirect()->to('/login');\n        }\n        \$model = new PostModel();\n        \$model->delete(\$id);\n        session()->setFlashdata('message', 'Post berhasil dihapus!');\n        return redirect()->to('/blog');\n    }\n}\n`,
      'app/Config/Routes.php': `<?php\n\n\$routes->get('/', 'Home::index');\n\$routes->get('blog', 'Blog::index');\n\$routes->get('blog/(:any)', 'Blog::view/\$1');\n\$routes->get('blog/create', 'Blog::create');\n\$routes->post('blog/store', 'Blog::store');\n\$routes->get('blog/delete/(:num)', 'Blog::destroy/\$1');\n\$routes->get('login', 'Auth::login');\n\$routes->post('login', 'Auth::login');\n\$routes->get('logout', 'Auth::logout');\n`,
      'app/Models/PostModel.php': `<?php\n\nnamespace App\\Models;\n\nuse CodeIgniter\\Model;\n\nclass PostModel extends Model\n{\n    protected \$table = 'posts';\n    protected \$primaryKey = 'id';\n    protected \$allowedFields = ['title', 'slug', 'body'];\n    protected \$useTimestamps = true;\n\n    public function getPosts(int \$limit = 10, int \$offset = 0): array\n    {\n        return \$this->orderBy('id', 'DESC')\n            ->limit(\$limit)\n            ->offset(\$offset)\n            ->findAll();\n    }\n\n    public function getPostBySlug(string \$slug): ?array\n    {\n        return \$this->where('slug', \$slug)->first();\n    }\n}\n`,
      'app/Controllers/Auth.php': `<?php\n\nnamespace App\\Controllers;\n\nclass Auth extends BaseController\n{\n    public function login(): string\n    {\n        if (\$this->request->getMethod() === 'post') {\n            \$username = \$this->request->getPost('username');\n            \$password = \$this->request->getPost('password');\n\n            if (\$username === 'admin' && \$password === 'secret123') {\n                session()->set('user_id', 1);\n                session()->set('username', \$username);\n                return redirect()->to('/blog');\n            }\n\n            session()->setFlashdata('error', 'Username atau password salah!');\n            return redirect()->back()->withInput();\n        }\n\n        return view('auth/login');\n    }\n\n    public function logout(): string\n    {\n        session()->destroy();\n        return redirect()->to('/');\n    }\n}\n`,
      'composer.json': PKG('capstone-project'),
      'package.json': PKG_NODE('ci4-lesson-16', DEV_SERVE),
      'README.md': `# CodeIgniter 4 Lesson 16 - Final Project: Blog\n\nJalankan: composer install && npm run dev\n\nFull CI4 blog with: MVC routing, database migrations, models & query builder, form validation, sessions, CSRF/XSS security, REST API, file upload, pagination, caching, testing, and authentication.\n`,
    },
    objId: ['Merangkus semua konsep CI4 ke dalam satu proyek Blog lengkap', 'Menerapkan MVC dengan routing, controller, model, dan view', 'Menggunakan database migrations dan model untuk data persistence', 'Mengamankan aplikasi dengan CSRF, XSS, dan authentication'],
    objEn: ['Assemble all CI4 concepts into one complete Blog project', 'Apply MVC with routing, controller, model, and view', 'Use database migrations and models for data persistence', 'Secure the app with CSRF, XSS, and authentication'],
    expId: `## Proyek Akhir: Menyatukan Semua\n16 pelajaran CI4 dirangkum di sini: routing & controllers (Lesson 2), views & layouts (Lesson 3), static assets & Spark CLI (Lesson 4), database & migrations (Lesson 5), models & query builder (Lesson 6), form validation (Lesson 7), sessions & flash data (Lesson 8), security CSRF/XSS/filters (Lesson 9), authentication (Lesson 10), REST API (Lesson 11), file upload & pagination (Lesson 12), caching (Lesson 13), events & CLI (Lesson 14), testing (Lesson 15).\n## Arsitektur Blog\nRoute -> Controller -> Model -> View. Setiap request melewati front controller (public/index.php), di-routing ke controller, controller berinteraksi dengan model untuk data, dan merender view untuk output HTML.\n## Dari CI4 ke Production\nUntuk deployment: gunakan php spark serve untuk production (atau Nginx/Apache dengan rewrite rules). Aktifkan production mode di app/Config/Boot/production.php. Gunakan Redis untuk cache production. Setup database MySQL/PostgreSQL menggantikan SQLite3.`,
    expEn: `## Final Project: Bringing It All Together\n16 CI4 lessons summarized here: routing & controllers (Lesson 2), views & layouts (Lesson 3), static assets & Spark CLI (Lesson 4), database & migrations (Lesson 5), models & query builder (Lesson 6), form validation (Lesson 7), sessions & flash data (Lesson 8), security CSRF/XSS/filters (Lesson 9), authentication (Lesson 10), REST API (Lesson 11), file upload & pagination (Lesson 12), caching (Lesson 13), events & CLI (Lesson 14), testing (Lesson 15).\n## Blog Architecture\nRoute -> Controller -> Model -> View. Every request goes through front controller (public/index.php), routed to controller, controller interacts with model for data, and renders view for HTML output.\n## From CI4 to Production\nFor deployment: use php spark serve for production (or Nginx/Apache with rewrite rules). Enable production mode in app/Config/Boot/production.php. Use Redis for production cache. Setup MySQL/PostgreSQL database replacing SQLite3.`,
    chId: 'Tingkatkan proyek akhir: (1) tambah fitur komentar dengan model Comment dan tabel comments, (2) tambah kategori post dengan relasi many-to-many, (3) implementasi search full-text menggunakan LIKE atau database full-text index, (4) tambah admin dashboard dengan statistik posts dan users.',
    chEn: 'Level up the final project: (1) add comment feature with Comment model and comments table, (2) add post categories with many-to-many relationship, (3) implement full-text search using LIKE or database full-text index, (4) add admin dashboard with posts and users statistics.',
    sumId: 'Blog = MVC + DB + Security + API + Testing. Semua konsep CI4 dalam satu proyek. Anda siap build CI4 app nyata!',
    sumEn: 'Blog = MVC + DB + Security + API + Testing. All CI4 concepts in one project. You are ready to build real CI4 apps!',
  },
];

// ===== GENERATE =====
for (const lesson of LESSONS) {
  const levelDir = 'codeigniter4';
  const mdDir = path.join(BASE_DIR, levelDir);
  fs.mkdirSync(mdDir, { recursive: true });

  const objListId = lesson.objId.map((o) => `- ${o}`).join('\\n');
  const objListEn = lesson.objEn.map((o) => `- ${o}`).join('\\n');

  for (const lang of ['id', 'en']) {
    const langDir = path.join(mdDir, lang);
    fs.mkdirSync(langDir, { recursive: true });
    const isId = lang === 'id';
    const title = isId ? lesson.titleId : lesson.titleEn;
    const objList = isId ? objListId : objListEn;
    const exp = isId ? lesson.expId : lesson.expEn;
    const ch = isId ? lesson.chId : lesson.chEn;
    const sum = isId ? lesson.sumId : lesson.sumEn;
    const lessonLabel = isId ? `Pelajaran ${lesson.num}` : `Lesson ${lesson.num}`;

    const code = lesson.files[lesson.codeFile] || '';
    const filename = `lesson${lesson.num}-${lesson.topicId}.md`;
    const content = `# ${title}

> CodeIgniter 4 | ${lessonLabel}

## ${isId ? 'Tujuan Pembelajaran' : 'Learning Objectives'}

${objList}

---

## Program: ${isId ? 'CodeIgniter 4' : 'CodeIgniter 4'}

\`\`\`php
${code}
\`\`\`

---

## ${isId ? 'Penjelasan' : 'Explanation'}

${exp}

---

## ${isId ? 'Eksperimen' : 'Experiments'}

${exp.split('\\n').map((l) => l.trim()).filter((l) => l.startsWith('##')).map((h, i) => `${i + 1}. **${h.replace(/^#+\\s*/, '')}**`).join('\\n')}

---

## ${isId ? 'Tantangan' : 'Challenge'}

${ch}

---

## ${isId ? 'Ringkasan' : 'Summary'}

${sum}
`;

    fs.writeFileSync(path.join(langDir, filename), content);

    const filesJson = path.join(langDir, `lesson${lesson.num}-${lesson.topicId}.json`);
    fs.writeFileSync(filesJson, JSON.stringify(lesson.files, null, 2));
  }

  console.log(`  ${lesson.num}. ${lesson.titleId} / ${lesson.titleEn}`);
}

const total = LESSONS.length * 2;
console.log(`\\nGenerated ${total} CodeIgniter 4 curriculum files (${LESSONS.length} lessons x 2 languages)`);
console.log(`  Output: ${BASE_DIR}`);