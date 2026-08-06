import { BaseGenerator } from './lib/base-generator.mjs';

// ─────────────────────────────────────────────────────────────────────────────
// CODEIGNITER 4 CURRICULUM — pure research, zero framework influence
// Sources: CodeIgniter 4 Official Docs, CI4 User Guide, Apprentice CI4,
//          Building Web Apps with CI4, CodeIgniter Forum
// ─────────────────────────────────────────────────────────────────────────────
// Research consensus: 2 levels, 10 weeks total
//   Beginner (5w): setup → controllers → views → models → database
//   Intermediate (5w): validation → auth → REST → testing → project
// Total: 10 weeks
// ─────────────────────────────────────────────────────────────────────────────

const gen = new BaseGenerator('codeigniter4', 'CodeIgniter 4');

const LEVELS = [
  {
    levelId: 'beginer',
    nameId: 'Pemula',
    nameEn: 'Beginner',
    descId: 'Fundamental CodeIgniter 4: setup, MVC, controllers, views, models, database.',
    descEn: 'CodeIgniter 4 fundamentals: setup, MVC, controllers, views, models, database.',
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah',
    nameEn: 'Intermediate',
    descId: 'CI4 menengah: validation, authentication, REST API, testing, proyek akhir.',
    descEn: 'Intermediate CI4: validation, authentication, REST API, testing, final project.',
  },
];

const MODULES = [
  // ── BEGINNER (weeks 1-5) ──────────────────────────────────────────────────
  {
    week: 1, level: 'beginer', topicId: 'setup-ci4',
    titleId: 'Setup & Instalasi CI4', titleEn: 'Setup & CI4 Installation',
    programId: 'Project Pertama', programEn: 'First Project',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'php',
    code: `<?php
echo "=== CodeIgniter 4 Setup ===<br>";
echo "composer create-project codeigniter4/appstarter my-app<br>";
echo "cd my-app<br>";
echo "php spark serve<br>";
echo "Server running on http://localhost:8080<br><br>";

echo "=== CI4 Directory Structure ===<br>";
$dirs = [
    "app/",
    "  Config/",
    "  Controllers/",
    "  Models/",
    "  Views/",
    "  Filters/",
    "  Database/Migrations/",
    "  Database/Seeds/",
    "public/",
    "writable/",
    "tests/",
];
foreach ($dirs as $dir) {
    echo "  $dir<br>";
}

echo "<br>=== Key Files ===<br>";
echo "app/Config/Routes.php — Route definitions<br>";
echo "app/Controllers/ — Controllers<br>";
echo "app/Models/ — Models<br>";
echo "app/Views/ — View files<br>";
echo "app/Config/Database.php — DB config<br>";
echo ".env — Environment config<br>";

echo "<br>=== spark Commands ===<br>";
echo "php spark serve — Start dev server<br>";
echo "php spark make:controller Name — Create controller<br>";
echo "php spark make:model Name — Create model<br>";
echo "php spark make:migration Name — Create migration<br>";
echo "php spark migrate — Run migrations<br>";
echo "php spark db:seed Name — Run seeder<br>";
echo "php spark routes — Show all routes<br>";

echo "<br>=== Namespace ===<br>";
echo "namespace App\\Controllers;<br>";
echo "namespace App\\Models;<br>";
>`,
    objectivesId: [
      'Install CodeIgniter 4 via Composer (CI4 Docs: Installation)',
      'Memahami struktur folder CI4: app, public, writable, tests',
      'Spark CLI: serve, make:controller, make:model, migrate',
      'File .env untuk environment configuration',
      'Namespace: App\\Controllers, App\\Models',
    ],
    objectivesEn: [
      'Install CodeIgniter 4 via Composer (CI4 Docs: Installation)',
      'Understand CI4 folder structure: app, public, writable, tests',
      'Spark CLI: serve, make:controller, make:model, migrate',
      '.env file for environment configuration',
      'Namespaces: App\\Controllers, App\\Models',
    ],
    explanationId: '### Instalasi CI4\n\`composer create-project codeigniter4/appstarter nama-project\`.\n\n### Struktur Folder\n- \`app/\` — Application code (Controllers, Models, Config)\n- \`public/\` — Entry point (index.php)\n- \`writable/\` — Cache, logs, uploads\n- \`tests/\` — Test files\n\n### Spark CLI\nCommand-line tool CI4. \`php spark\` untuk list commands.\n\n### Namespace\nCI4 gunakan namespace. Controller: \`namespace App\\Controllers\`.\n\n### Routes\n\`app/Config/Routes.php\` — define semua routes di sini.',
    explanationEn: '### CI4 Installation\n\`composer create-project codeigniter4/appstarter name\`.\n\n### Folder Structure\n- \`app/\` — Application code\n- \`public/\` — Entry point\n- \`writable/\` — Cache, logs, uploads\n- \`tests/\` — Test files\n\n### Spark CLI\nCI4 command-line tool. \`php spark\` lists commands.\n\n### Namespaces\nCI4 uses namespaces. Controller: \`namespace App\\Controllers\`.\n\n### Routes\n\`app/Config/Routes.php\` defines all routes.',
    experimentsId: [
      'Install CI4 dan jalankan spark serve',
      'Jelajahi folder app/ dan lihat isinya',
      'Coba spark list untuk semua commands',
      'Buat route sederhana di Routes.php',
      'Pindah ke Config/ dan lihat file konfigurasi',
    ],
    experimentsEn: [
      'Install CI4 and run spark serve',
      'Explore app/ folder and its contents',
      'Try spark list for all commands',
      'Create simple route in Routes.php',
      'Navigate Config/ and view config files',
    ],
    challengeId: 'Buat project CI4 baru dengan 3 routes: home (/), about (/about), contact (/contact). Tampilkan teks berbeda di setiap route.',
    challengeEn: 'Create a new CI4 project with 3 routes: home (/), about (/about), contact (/contact). Display different text on each route.',
    summaryId: 'Minggu 1 dari 10: **Setup & Instalasi CI4** (Level: Pemula). Fondasi CI4 dimulai. Minggu depan: **Controllers & Routing**.',
    summaryEn: 'Week 1 of 10: **Setup & CI4 Installation** (Level: Beginner). CI4 foundation begins. Next week: **Controllers & Routing**.',
  },
  {
    week: 2, level: 'beginer', topicId: 'controllers-routing',
    titleId: 'Controllers & Routing', titleEn: 'Controllers & Routing',
    programId: 'Route & Controller', programEn: 'Route & Controller',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'php',
    code: `<?php
echo "=== CI4 Controllers ===<br><br>";

echo "=== Basic Controller ===<br>";
echo "namespace App\\Controllers;<br>";
echo "use CodeIgniter\\Controller;<br>";
echo "class Home extends BaseController {<br>";
echo "    public function index() {<br>";
echo "        return view('welcome');<br>";
echo "    }<br>";
echo "}<br><br>";

echo "=== Routing ===<br>";
echo "// app/Config/Routes.php<br>";
echo "$routes->get('/', 'Home::index');<br>";
echo "$routes->get('/about', 'Page::about');<br>";
echo "$routes->get('/users', 'User::index');<br>";
echo "$routes->get('/users/(:num)', 'User::show/$1');<br>";
echo "$routes->post('/users', 'User::store');<br>";
echo "$routes->put('/users/(:num)', 'User::update/$1');<br>";
echo "$routes->delete('/users/(:num)', 'User::delete/$1');<br><br>";

echo "=== Route Simulation ===<br>";
$routes = [
    ["GET", "/", "Home::index"],
    ["GET", "/about", "Page::about"],
    ["GET", "/users", "User::index"],
    ["GET", "/users/1", "User::show (id: 1)"],
    ["POST", "/users", "User::store"],
];

foreach ($routes as [$method, $uri, $action]) {
    echo "$method $uri → $action<br>";
}

echo "<br>=== Controller with Parameters ===<br>";
echo "public function show($id) {<br>";
echo "    $data['user'] = $this->userModel->find($id);<br>";
echo "    return view('user/show', $data);<br>";
echo "}<br><br>";

echo "=== Redirect & Named Routes ===<br>";
echo "return redirect()->to('/home');<br>";
echo "$routes->add('login', 'Auth::login', ['as' => 'login']);<br>";
echo "return redirect()->route('login');<br>";
>`,
    objectivesId: [
      'Membuat controller dengan extends BaseController',
      'Routing: get, post, put, delete methods',
      'Route parameters: (:num), (:alpha), (:any)',
      'Redirect: redirect()->to() dan redirect()->route()',
      'Named routes dengan as option',
    ],
    objectivesEn: [
      'Create controllers with extends BaseController',
      'Routing: get, post, put, delete methods',
      'Route parameters: (:num), (:alpha), (:any)',
      'Redirect: redirect()->to() and redirect()->route()',
      'Named routes with as option',
    ],
    explanationId: '### Controller\n\`class Home extends BaseController\`. Method \`index()\` sebagai default.\n\n### Routing\n\`$routes->get($uri, $handler)\`. Parameter: \`(:num)\` digit, \`(:alpha)\` huruf, \`(:any)\` apapun.\n\n### Parameters\nRoute \`/users/(:num)\` → controller method \`show($1)\`.\n\n### Redirect\n\`redirect()->to(\'/url\')\`, \`redirect()->route(\'name\')\`, \`redirect()->back()\`.\n\n### Named Routes\n\`$routes->add(\'uri\', \'handler\', [\'as\' => \'name\'])\`. Generate URL dengan \`route()\`.',
    explanationEn: '### Controller\n\`class Home extends BaseController\`. \`index()\` method as default.\n\n### Routing\n\`$routes->get($uri, $handler)\`. Params: \`(:num)\`, \`(:alpha)\`, \`(:any)\`.\n\n### Parameters\nRoute \`/users/(:num)\` → controller \`show($1)\`.\n\n### Redirect\n\`redirect()->to(\'/url\')\`, \`redirect()->route(\'name\')\`.\n\n### Named Routes\n\`$routes->add(\'uri\', \'handler\', [\'as\' => \'name\'])\`.',
    experimentsId: [
      'Buat controller dengan multiple methods',
      'Coba route parameters dengan (:num)',
      'Buat route group dengan namespace',
      'Implementasikan redirect after form submit',
      'Buat custom 404 override',
    ],
    experimentsEn: [
      'Create controller with multiple methods',
      'Try route parameters with (:num)',
      'Create route group with namespace',
      'Implement redirect after form submit',
      'Create custom 404 override',
    ],
    challengeId: 'Buat controller Product dengan 5 methods: index, show, create, store, destroy. Definisikan routes untuk semua methods.',
    challengeEn: 'Create Product controller with 5 methods: index, show, create, store, destroy. Define routes for all methods.',
    summaryId: 'Minggu 2 dari 10: **Controllers & Routing** (Level: Pemula). Heart of CI4. Minggu depan: **Views & Templates**.',
    summaryEn: 'Week 2 of 10: **Controllers & Routing** (Level: Beginner). Heart of CI4. Next week: **Views & Templates**.',
  },
  {
    week: 3, level: 'beginer', topicId: 'views-templates',
    titleId: 'Views & Templates', titleEn: 'Views & Templates',
    programId: 'View Layer', programEn: 'View Layer',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'php',
    code: `<?php
echo "=== CI4 Views ===<br><br>";

echo "=== Basic View ===<br>";
echo "public function index() {<br>";
echo "    return view('home');<br>";
echo "}<br>";
echo "File: app/Views/home.php<br><br>";

echo "=== View with Data ===<br>";
echo "$data = [<br>";
echo "    'title' => 'Home Page',<br>";
echo "    'users' => $this->userModel->findAll(),<br>";
echo "];<br>";
echo "return view('home', $data);<br><br>";

echo "=== View Simulation ===<br>";
$users = [
    ["id" => 1, "name" => "Budi", "email" => "budi@mail.com"],
    ["id" => 2, "name" => "Siti", "email" => "siti@mail.com"],
];

echo "<h1>Users</h1><br>";
echo "<table border='1'><br>";
echo "<tr><th>ID</th><th>Name</th><th>Email</th></tr><br>";
foreach ($users as $user) {
    echo "<tr><br>";
    echo "  <td>{$user['id']}</td><br>";
    echo "  <td>{$user['name']}</td><br>";
    echo "  <td>{$user['email']}</td><br>";
    echo "</tr><br>";
}
echo "</table><br><br>";

echo "=== Layout/Template ===<br>";
echo "// app/Views/layouts/main.php<br>";
echo "<!DOCTYPE html><br>";
echo "<html><head><title><?= $title ?></title></head><br>";
echo "<body><br>";
echo "    <?= $this->renderSection('content') ?><br>";
echo "</body></html><br><br>";

echo "=== Extending Layout ===<br>";
echo "<?php $this->extend('layouts/main') ?><br>";
echo "<?php $this->section('content') ?><br>";
echo "    <h1>Welcome</h1><br>";
echo "<?php $this->endSection() ?><br><br>";

echo "=== View Cells ===<br>";
echo "<?= view_cell('Blog::recentPosts') ?><br>";
>`,
    objectivesId: [
      'View: return view() untuk render template',
      'Pass data ke view: $data array',
      'Layout: extend dan section untuk template inheritance',
      'View Cells: reusable view components',
      'Render sections: renderSection, endSection',
    ],
    objectivesEn: [
      'View: return view() to render templates',
      'Pass data to view: $data array',
      'Layouts: extend and section for template inheritance',
      'View Cells: reusable view components',
      'Render sections: renderSection, endSection',
    ],
    explanationId: '### View\n\`return view(\'home\')\` — render \`app/Views/home.php\`.\n\n### Data\n\`return view(\'home\', $data)\` — extract $data ke variabel di view.\n\n### Layout\n\`$this->extend(\'layouts/main\')\` inherit template. \`$this->section(\'content\')\` inject content.\n\n### View Cells\n\`view_cell(\'Class::method\')\` — reusable component dengan logic.\n\n### Render\n\`renderSection()\` tempat content muncul. \`endSection()\` tutup section.',
    explanationEn: '### Views\n\`return view(\'home\')\` renders \`app/Views/home.php\`.\n\n### Data\n\`return view(\'home\', $data)\` extracts $data to view variables.\n\n### Layouts\n\`$this->extend(\'layouts/main\')\` inherits template. \`$this->section(\'content\')\` injects content.\n\n### View Cells\n\`view_cell(\'Class::method\')\` — reusable components.\n\n### Render\n\`renderSection()\` where content appears. \`endSection()\` closes section.',
    experimentsId: [
      'Buat view dengan data dari database',
      'Buat layout master dengan section header, content, footer',
      'Implementasikan partial views',
      'Buat view cell untuk sidebar',
      'Coba conditional display dengan if di view',
    ],
    experimentsEn: [
      'Create view with data from database',
      'Create master layout with header, content, footer sections',
      'Implement partial views',
      'Create view cell for sidebar',
      'Try conditional display with if in view',
    ],
    challengeId: 'Buat layout blog: header, footer, sidebar. Buat halaman home menampilkan daftar posts dengan foreach di view.',
    challengeEn: 'Create a blog layout: header, footer, sidebar. Create home page displaying post list with foreach in view.',
    summaryId: 'Minggu 3 dari 10: **Views & Templates** (Level: Pemula). View layer CI4. Minggu depan: **Models & Database**.',
    summaryEn: 'Week 3 of 10: **Views & Templates** (Level: Beginner). View layer of CI4. Next week: **Models & Database**.',
  },
  {
    week: 4, level: 'beginer', topicId: 'models-database',
    titleId: 'Models & Database', titleEn: 'Models & Database',
    programId: 'CRUD Model', programEn: 'CRUD Model',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'php',
    code: `<?php
echo "=== CI4 Models ===<br><br>";

echo "=== Basic Model ===<br>";
echo "namespace App\\Models;<br>";
echo "use CodeIgniter\\Model;<br>";
echo "class UserModel extends Model {<br>";
echo "    protected $table = 'users';<br>";
echo "    protected $primaryKey = 'id';<br>";
echo "    protected $allowedFields = ['name', 'email'];<br>";
echo "    protected $useTimestamps = true;<br>";
echo "}<br><br>";

echo "=== CRUD Operations ===<br>";
$users = [
    ["id" => 1, "name" => "Budi", "email" => "budi@mail.com"],
    ["id" => 2, "name" => "Siti", "email" => "siti@mail.com"],
    ["id" => 3, "name" => "Andi", "email" => "andi@mail.com"],
];

echo "// Find All<br>";
foreach ($users as $u) {
    echo "  {$u['id']}: {$u['name']} ({$u['email']})<br>";
}

echo "<br>// Find by ID<br>";
echo "  Found: Budi (id: 1)<br>";

echo "<br>// Insert<br>";
$newId = 4;
echo "  Added: Dewi (id: $newId)<br>";

echo "<br>// Update<br>";
echo "  Updated: Budi → Budi Updated<br>";

echo "<br>// Delete<br>";
$remaining = 3;
echo "  Remaining: $remaining users<br><br>";

echo "=== Query Builder ===<br>";
echo "$builder = $this->db->table('users');<br>";
echo "$builder->where('active', 1)->orderBy('name', 'ASC')->get();<br><br>";

echo "=== Model Methods ===<br>";
echo "findAll()      // All records<br>";
echo "find($id)      // By primary key<br>";
echo "where($where)  // With condition<br>";
echo "first()        // First record<br>";
echo "insert($data)  // Insert<br>";
echo "update($id, $data) // Update<br>";
echo "delete($id)    // Delete<br><br>";

echo "=== Timestamps ===<br>";
echo "protected $useTimestamps = true;<br>";
echo "protected $createdField = 'created_at';<br>";
echo "protected $updatedField = 'updated_at';<br>";
>`,
    objectivesId: [
      'Model CI4: extends Model dengan $table, $primaryKey',
      'CRUD: findAll, find, insert, update, delete',
      'Allowed fields: $allowedFields untuk mass assignment',
      'Timestamps: created_at dan updated_at otomatis',
      'Query builder: where, orderBy, get',
    ],
    objectivesEn: [
      'CI4 Model: extends Model with $table, $primaryKey',
      'CRUD: findAll, find, insert, update, delete',
      'Allowed fields: $allowedFields for mass assignment',
      'Timestamps: automatic created_at and updated_at',
      'Query builder: where, orderBy, get',
    ],
    explanationId: '### Model\n\`class UserModel extends Model\`. Property: \`$table\`, \`$primaryKey\`, \`$allowedFields\`.\n\n### CRUD\n\`findAll()\`, \`find($id)\`, \`where()->findAll()\`, \`insert($data)\`, \`update($id, $data)\`, \`delete($id)\`.\n\n### Allowed Fields\n\`$allowedFields\` — field yang boleh diisi mass. Proteksi dari mass assignment.\n\n### Timestamps\n\`$useTimestamps = true\` — auto manage \`created_at\` dan \`updated_at\`.\n\n### Query Builder\n\`$builder->where()->orderBy()->get()\` — chain methods.',
    explanationEn: '### Model\n\`class UserModel extends Model\`. Properties: \`$table\`, \`$primaryKey\`.\n\n### CRUD\n\`findAll()\`, \`find($id)\`, \`insert()\`, \`update()\`, \`delete()\`.\n\n### Allowed Fields\n\`$allowedFields\` — fields allowed for mass assignment.\n\n### Timestamps\n\`$useTimestamps = true\` auto-manages \`created_at\`/\`updated_at\`.\n\n### Query Builder\n\`$builder->where()->orderBy()->get()\`.',
    experimentsId: [
      'Buat model dengan migration dan coba CRUD',
      'Gunakan where dengan multiple conditions',
      'Implementasikan soft delete',
      'Buat model relation manual',
      'Coba paginate dengan model',
    ],
    experimentsEn: [
      'Create model with migration and try CRUD',
      'Use where with multiple conditions',
      'Implement soft delete',
      'Create manual model relation',
      'Try paginate with model',
    ],
    challengeId: 'Buat model Post dengan migration. Implementasikan CRUD lengkap: create, read (all, by id), update, delete.',
    challengeEn: 'Create Post model with migration. Implement full CRUD: create, read (all, by id), update, delete.',
    summaryId: 'Minggu 4 dari 10: **Models & Database** (Level: Pemula). Data layer CI4. Minggu depan: **Migrations & Seeds**.',
    summaryEn: 'Week 4 of 10: **Models & Database** (Level: Beginner). Data layer of CI4. Next week: **Migrations & Seeds**.',
  },
  {
    week: 5, level: 'beginer', topicId: 'migrations-seeds',
    titleId: 'Migrations & Seeds', titleEn: 'Migrations & Seeds',
    programId: 'Database Schema', programEn: 'Database Schema',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'php',
    code: `<?php
echo "=== CI4 Migrations ===<br><br>";

echo "=== Create Migration ===<br>";
echo "php spark make:migration CreateUsersTable<br>";
echo "php spark migrate<br>";
echo "php spark migrate:rollback<br>";
echo "php spark migrate:status<br><br>";

echo "=== Migration Class ===<br>";
echo "class Migration_CreateUsersTable extends Migration {<br>";
echo "    public function up() {<br>";
echo "        $this->forge->addField([<br>";
echo "            'id' => ['type' => 'INT', 'constraint' => 11, 'auto_increment' => true],<br>";
echo "            'name' => ['type' => 'VARCHAR', 'constraint' => 255],<br>";
echo "            'email' => ['type' => 'VARCHAR', 'constraint' => 255, 'unique' => true],<br>";
echo "            'created_at' => ['type' => 'DATETIME', 'null' => true],<br>";
echo "        ]);<br>";
echo "        $this->forge->addKey('id', true);<br>";
echo "        $this->forge->createTable('users');<br>";
echo "    }<br>";
echo "    public function down() {<br>";
echo "        $this->forge->dropTable('users');<br>";
echo "    }<br>";
echo "}<br><br>";

echo "=== Field Types ===<br>";
echo "INT, VARCHAR, TEXT, DATETIME, DATE, FLOAT, BOOLEAN<br>";
echo "Options: constraint, unsigned, null, default, unique, auto_increment<br><br>";

echo "=== Seeds ===<br>";
echo "php spark make:seed UserSeeder<br>";
echo "class UserSeeder extends Seeder {<br>";
echo "    public function run() {<br>";
echo "        $data = [<br>";
echo "            ['name' => 'Budi', 'email' => 'budi@mail.com'],<br>";
echo "            ['name' => 'Siti', 'email' => 'siti@mail.com'],<br>";
echo "        ];<br>";
echo "        $this->db->table('users')->insertBatch($data);<br>";
echo "    }<br>";
echo "}<br>";
echo "php spark db:seed UserSeeder<br><br>";

echo "=== Foreign Keys ===<br>";
echo "$this->forge->addForeignKey('user_id', 'users', 'id', 'CASCADE', 'CASCADE');<br>";
>`,
    objectivesId: [
      'Migration: up() untuk create/modify, down() untuk rollback',
      'Field types: INT, VARCHAR, TEXT, DATETIME, DATE',
      'Forge: addField, addKey, createTable, dropTable',
      'Seeds: populate database dengan data awal',
      'Foreign keys: addForeignKey dengan cascade',
    ],
    objectivesEn: [
      'Migration: up() for create/modify, down() for rollback',
      'Field types: INT, VARCHAR, TEXT, DATETIME, DATE',
      'Forge: addField, addKey, createTable, dropTable',
      'Seeds: populate database with initial data',
      'Foreign keys: addForeignKey with cascade',
    ],
    explanationId: '### Migration\nVersion control untuk database. \`up()\` apply changes, \`down()\` rollback.\n\n### Field\n\`addField([\'id\' => [\'type\' => \'INT\', \'auto_increment\' => true]])\`. Options: constraint, null, default.\n\n### Seeds\nPopulate data awal. \`insertBatch()\` untuk multiple rows.\n\n### Foreign Key\n\`addForeignKey(\'col\', \'ref_table\', \'ref_col\', \'on_delete\', \'on_update\')\`.\n\n### Commands\n\`migrate\`, \`migrate:rollback\`, \`migrate:status\`, \`db:seed\`.',
    explanationEn: '### Migrations\nVersion control for databases. \`up()\` applies, \`down()\` rollbacks.\n\n### Fields\n\`addField([\'id\' => [\'type\' => \'INT\', \'auto_increment\' => true]])\`.\n\n### Seeds\nPopulate initial data. \`insertBatch()\` for multiple rows.\n\n### Foreign Keys\n\`addForeignKey(\'col\', \'ref_table\', \'ref_col\', \'on_delete\', \'on_update\')\`.\n\n### Commands\n\`migrate\`, \`migrate:rollback\`, \`db:seed\`.',
    experimentsId: [
      'Buat migration untuk posts table',
      'Tambah dan hapus column dengan migration',
      'Buat seeder dengan 10 data',
      'Implementasikan foreign key constraint',
      'Coba rollback migration',
    ],
    experimentsEn: [
      'Create migration for posts table',
      'Add and remove column with migration',
      'Create seeder with 10 records',
      'Implement foreign key constraint',
      'Try migration rollback',
    ],
    challengeId: 'Buat migration lengkap: users, posts, comments table dengan foreign keys. Buat seeder untuk populasi data dummy.',
    challengeEn: 'Create complete migration: users, posts, comments tables with foreign keys. Create seeder to populate dummy data.',
    summaryId: 'Minggu 5 dari 10: **Migrations & Seeds** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Validation** (Intermediate).',
    summaryEn: 'Week 5 of 10: **Migrations & Seeds** (Level: Beginner). Beginner phase complete! Next week: **Validation** (Intermediate).',
  },
  // ── INTERMEDIATE (weeks 6-10) ──────────────────────────────────────────────
  {
    week: 6, level: 'intermediate', topicId: 'validation',
    titleId: 'Validation & Form Handling', titleEn: 'Validation & Form Handling',
    programId: 'Validasi Form', programEn: 'Form Validation',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'php',
    code: `<?php
echo "=== CI4 Validation ===<br><br>";

echo "=== Validation Rules ===<br>";
echo "$rules = [<br>";
echo "    'username' => 'required|min_length[3]|max_length[20]',<br>";
echo "    'email' => 'required|valid_email',<br>";
echo "    'password' => 'required|min_length[8]',<br>";
echo "    'pass_confirm' => 'required|matches[password]',<br>";
echo "];<br><br>";

echo "=== Validate in Controller ===<br>";
echo "public function store() {<br>";
echo "    if (!$this->validate($rules)) {<br>";
echo "        return redirect()->back()->withInput()->with('errors', $this->validator->getErrors());<br>";
echo "    }<br>";
echo "    // Process data<br>";
echo "}<br><br>";

echo "=== Validation Simulation ===<br>";
$inputs = [
    "username" => "",
    "email" => "invalid-email",
    "password" => "123",
];

$errors = [];
if (empty($inputs['username'])) {
    $errors[] = "The username field is required.";
}
if (!filter_var($inputs['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = "The email field must contain a valid email address.";
}
if (strlen($inputs['password']) < 8) {
    $errors[] = "The password field must be at least 8 characters in length.";
}

echo "Validation errors:<br>";
foreach ($errors as $error) {
    echo "  - $error<br>";
}

echo "<br>=== Custom Rules ===<br>";
echo "$custom = [<br>";
echo "    'slug' => 'required|regex_match[a-z0-9-]+',<br>";
echo "    'age' => 'required|numeric|greater_than[17]',<br>";
echo "];<br><br>";

echo "=== Displaying Errors ===<br>";
echo "<?php if (session()->has('errors')) : ?><br>";
echo "    <?php foreach (session('errors') as $error) : ?><br>";
echo "        <p><?= esc($error) ?></p><br>";
echo "    <?php endforeach ?><br>";
echo "<?php endif ?><br>";
>`,
    objectivesId: [
      'Validation rules: required, min_length, max_length, valid_email',
      'Validate di controller: $this->validate()',
      'Display errors: $this->validator->getErrors()',
      'Custom error messages per field',
      'Flash data: withInput, with errors',
    ],
    objectivesEn: [
      'Validation rules: required, min_length, max_length, valid_email',
      'Validate in controller: $this->validate()',
      'Display errors: $this->validator->getErrors()',
      'Custom error messages per field',
      'Flash data: withInput, with errors',
    ],
    explanationId: '### Validation Rules\n\`required\`, \`min_length[3]\`, \`max_length[20]\`, \`valid_email\`, \`matches[field]\`.\n\n### Validate\n\`$this->validate($rules)\` — return false jika gagal. Auto-redirect.\n\n### Errors\n\`$this->validator->getErrors()\` — array error messages.\n\n### Flash Data\n\`withInput()\` retain input, \`with(\'errors\', $errors)\` store errors.\n\n### Display\nLoop \`session(\'errors\')\` di view. \`esc()\` untuk escape output.',
    explanationEn: '### Validation Rules\n\`required\`, \`min_length[3]\`, \`valid_email\`, \`matches[field]\`.\n\n### Validate\n\`$this->validate($rules)\` returns false on failure.\n\n### Errors\n\`$this->validator->getErrors()\` — array of error messages.\n\n### Flash Data\n\`withInput()\` retains input, \`with(\'errors\', $errors)\` stores errors.\n\n### Display\nLoop \`session(\'errors\')\` in view. \`esc()\` for output escaping.',
    experimentsId: [
      'Buat form dengan 5+ validation rules',
      'Coba custom validation class',
      'Implementasikan AJAX validation',
      'Buat regex_match untuk format khusus',
      'Coba permit_empty untuk field optional',
    ],
    experimentsEn: [
      'Create form with 5+ validation rules',
      'Try custom validation class',
      'Implement AJAX validation',
      'Create regex_match for custom formats',
      'Try permit_empty for optional fields',
    ],
    challengeId: 'Buat form registrasi dengan validasi lengkap: username (min 3), email (valid, unique), password (min 8), password confirm (matches).',
    challengeEn: 'Create a registration form with complete validation: username (min 3), email (valid, unique), password (min 8), password confirm (matches).',
    summaryId: 'Minggu 6 dari 10: **Validation & Form Handling** (Level: Menengah). Input sanitization. Minggu depan: **Authentication**.',
    summaryEn: 'Week 6 of 10: **Validation & Form Handling** (Level: Intermediate). Input sanitization. Next week: **Authentication**.',
  },
  {
    week: 7, level: 'intermediate', topicId: 'authentication',
    titleId: 'Authentication & Authorization', titleEn: 'Authentication & Authorization',
    programId: 'Login System', programEn: 'Login System',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'php',
    code: `<?php
echo "=== CI4 Authentication ===<br><br>";

echo "=== Session ===<br>";
echo "// Login<br>";
echo "$session = session();<br>";
echo "$session->set('user_id', $user->id);<br>";
echo "$session->set('logged_in', true);<br><br>";

echo "// Check<br>";
echo "if (session('logged_in')) {<br>";
echo "    // User is logged in<br>";
echo "}<br><br>";

echo "// Logout<br>";
echo "$session->destroy();<br>";
echo "return redirect()->to('/login');<br><br>";

echo "=== Login Simulation ===<br>";
$users = [
    ["id" => 1, "email" => "admin@mail.com", "password" => password_hash("secret123", PASSWORD_DEFAULT), "role" => "admin"],
    ["id" => 2, "email" => "user@mail.com", "password" => password_hash("pass456", PASSWORD_DEFAULT), "role" => "user"],
];

$input_email = "admin@mail.com";
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

echo "<br>=== Filters ===<br>";
echo "// app/Config/Filters.php<br>";
echo "public $aliases = [<br>";
echo "    'auth' => \\App\\Filters\\AuthFilter::class,<br>";
echo "];<br>";
echo "public $globals = [<br>";
echo '    "before' => ["auth"],<br>';
echo "];<br><br>";

echo "=== Auth Filter ===<br>";
echo "class AuthFilter implements FilterInterface {<br>";
echo "    public function before(RequestInterface $request) {<br>";
echo "        if (!session('logged_in')) {<br>";
echo "            return redirect()->to('/login');<br>";
echo "        }<br>";
echo "    }<br>";
echo "}<br>";
>`,
    objectivesId: [
      'Session: set, get, destroy untuk state management',
      'Custom authentication dengan password_verify',
      'Filters: protect routes dengan before filter',
      'Auth filter: redirect jika belum login',
      'Role-based access dengan session data',
    ],
    objectivesEn: [
      'Session: set, get, destroy for state management',
      'Custom authentication with password_verify',
      'Filters: protect routes with before filter',
      'Auth filter: redirect if not logged in',
      'Role-based access with session data',
    ],
    explanationId: '### Session\n\`session()->set(\'key\', $value)\`, \`session(\'key\')\`, \`session()->destroy()\`.\n\n### Custom Auth\nManual: query user by email, verify password dengan \`password_verify()\`.\n\n### Filters\n\`before()\` dijalankan sebelum controller. Redirect jika tidak auth.\n\n### Auth Filter\nImplement \`FilterInterface\`. Cek session, redirect ke login jika tidak auth.\n\n### Apply Filter\n\`$routes->group(\'/\', [\'filter\' => \'auth\'], function ($routes) {...})\`.',
    explanationEn: '### Session\n\`session()->set()\`, \`session(\'key\')\`, \`session()->destroy()\`.\n\n### Custom Auth\nManual: query user, verify with \`password_verify()\`.\n\n### Filters\n\`before()\` runs before controller. Redirect if unauthenticated.\n\n### Auth Filter\nImplement \`FilterInterface\`. Check session, redirect to login.\n\n### Apply Filter\n\`$routes->group(\'/\', [\'filter\' => \'auth\'], ...)\`.',
    experimentsId: [
      'Implementasikan login/logout dengan session',
      'Buat auth filter untuk protect routes',
      'Coba remember me dengan cookie',
      'Buat role-based access (admin/user)',
      'Implementasikan CSRF protection',
    ],
    experimentsEn: [
      'Implement login/logout with sessions',
      'Create auth filter to protect routes',
      'Try remember me with cookies',
      'Create role-based access (admin/user)',
      'Implement CSRF protection',
    ],
    challengeId: 'Buat sistem auth lengkap: register, login, logout, auth filter, role-based access, CSRF protection.',
    challengeEn: 'Build a complete auth system: register, login, logout, auth filter, role-based access, CSRF protection.',
    summaryId: 'Minggu 7 dari 10: **Authentication & Authorization** (Level: Menengah). Keamanan aplikasi. Minggu depan: **REST API**.',
    summaryEn: 'Week 7 of 10: **Authentication & Authorization** (Level: Intermediate). Application security. Next week: **REST API**.',
  },
  {
    week: 8, level: 'intermediate', topicId: 'rest-api',
    titleId: 'REST API Development', titleEn: 'REST API Development',
    programId: 'API Endpoints', programEn: 'API Endpoints',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'php',
    code: `<?php
echo "=== CI4 REST API ===<br><br>";

echo "=== API Routes ===<br>";
echo "$routes->resource('api/products');<br>";
echo "$routes->group('api', function($routes) {<br>";
echo "    $routes->get('products', 'Api\\Product::index');<br>";
echo "    $routes->post('products', 'Api\\Product::store');<br>";
echo "    $routes->put('products/(:num)', 'Api\\Product::update/$1');<br>";
echo "    $routes->delete('products/(:num)', 'Api\\Product::delete/$1');<br>";
echo "});<br><br>";

echo "=== JSON Response ===<br>";
echo "return $this->response->setJSON([<br>";
echo "    'status' => 'success',<br>";
echo "    'data' => $products,<br>";
echo "]);<br><br>";

echo "=== API Controller ===<br>";
echo "class Product extends ResourceController {<br>";
echo "    protected $model = ProductModel::class;<br>";
echo "    protected $format = 'json';<br><br>";
echo "    public function index() {<br>";
echo "        return $this->respond($this->model->findAll());<br>";
echo "    }<br><br>";
echo "    public function create() {<br>";
echo "        $data = $this->request->getJSON(true);<br>";
echo "        $this->model->insert($data);<br>";
echo "        return $this->respondCreated($data);<br>";
echo "    }<br>";
echo "}<br><br>";

echo "=== API Simulation ===<br>";
$endpoints = [
    "GET /api/products" => ["status" => 200, "data" => "List products"],
    "GET /api/products/1" => ["status" => 200, "data" => "Product #1"],
    "POST /api/products" => ["status" => 201, "data" => "Created"],
    "PUT /api/products/1" => ["status" => 200, "data" => "Updated"],
    "DELETE /api/products/1" => ["status" => 200, "data" => "Deleted"],
];

foreach ($endpoints as $endpoint => $resp) {
    echo "$endpoint → {$resp['status']}: {$resp['data']}<br>";
}

echo "<br>=== CORS & Filters ===<br>";
echo "// app/Config/Cors.php<br>";
echo "public $allowedOrigins = ['http://localhost:3000'];<br>";
echo "public $allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];<br>";
echo "public $allowedHeaders = ['Content-Type', 'Authorization'];<br>";
>`,
    objectivesId: [
      'Resource routes: $routes->resource() untuk CRUD API',
      'JSON response: setJSON, respond, respondCreated',
      'ResourceController: pre-built CRUD controller',
      'getJSON: parse request body JSON',
      'CORS: configure cross-origin resource sharing',
    ],
    objectivesEn: [
      'Resource routes: $routes->resource() for CRUD APIs',
      'JSON responses: setJSON, respond, respondCreated',
      'ResourceController: pre-built CRUD controller',
      'getJSON: parse JSON request body',
      'CORS: configure cross-origin resource sharing',
    ],
    explanationId: '### Resource Routes\n\`$routes->resource(\'products\')\` — generate 5 RESTful routes.\n\n### JSON Response\n\`$this->respond($data)\`, \`$this->respondCreated($data)\`, \`setJSON()\`.\n\n### ResourceController\nPre-built CRUD: \`index\`, \`show\`, \`create\`, \`store\`, \`edit\`, \`update\`, \`delete\`.\n\n### getJSON\n\`$this->request->getJSON(true)\` — parse body JSON ke array.\n\n### CORS\n\`app/Config/Cors.php\` — configure allowed origins, methods, headers.',
    explanationEn: '### Resource Routes\n\`$routes->resource()\` generates 5 RESTful routes.\n\n### JSON Response\n\`$this->respond()\`, \`$this->respondCreated()\`, \`setJSON()\`.\n\n### ResourceController\nPre-built CRUD controller.\n\n### getJSON\n\`$this->request->getJSON(true)\` parses JSON body to array.\n\n### CORS\n\`app/Config/Cors.php\` configures allowed origins, methods, headers.',
    experimentsId: [
      'Buat API resource controller untuk Post',
      'Implementasikan API dengan JWT auth',
      'Coba API versioning dengan route group',
      'Buat API pagination',
      'Implementasikan rate limiting',
    ],
    experimentsEn: [
      'Create API resource controller for Post',
      'Implement API with JWT auth',
      'Try API versioning with route group',
      'Create API pagination',
      'Implement rate limiting',
    ],
    challengeId: 'Buat REST API lengkap untuk produk: CRUD endpoints, validation, JSON responses, CORS.',
    challengeEn: 'Build a complete REST API for products: CRUD endpoints, validation, JSON responses, CORS.',
    summaryId: 'Minggu 8 dari 10: **REST API Development** (Level: Menengah). API-first development. Minggu depan: **Testing**.',
    summaryEn: 'Week 8 of 10: **REST API Development** (Level: Intermediate). API-first development. Next week: **Testing**.',
  },
  {
    week: 9, level: 'intermediate', topicId: 'testing',
    titleId: 'Testing dengan PHPUnit', titleEn: 'Testing with PHPUnit',
    programId: 'Unit & Feature Test', programEn: 'Unit & Feature Test',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'php',
    code: `<?php
echo "=== CI4 Testing ===<br><br>";

echo "=== Unit Test ===<br>";
echo "use CodeIgniter\\Test\\CIUnitTestCase;<br>";
echo "class ProductModelTest extends CIUnitTestCase {<br>";
echo "    protected $refresh = true;<br><br>";
echo "    public function testFindAll() {<br>";
echo "        $model = new ProductModel();<br>";
echo "        $result = $model->findAll();<br>";
echo "        $this->assertIsArray($result);<br>";
echo "    }<br>";
echo "}<br><br>";

echo "=== Feature Test ===<br>";
echo "use CodeIgniter\\Test\\FeatureTestTrait;<br>";
echo "class ProductControllerTest extends CIUnitTestCase {<br>";
echo "    use FeatureTestTrait;<br><br>";
echo "    public function testIndex() {<br>";
echo "        $result = $this->get('/api/products');<br>";
echo "        $result->assertStatus(200);<br>";
echo "        $result->assertJSON();<br>";
echo "    }<br><br>";
echo "    public function testCreate() {<br>";
echo "        $result = $this->post('/api/products', [<br>";
echo "            'name' => 'Test Product',<br>";
echo "            'price' => 100000,<br>";
echo "        ]);<br>";
echo "        $result->assertStatus(201);<br>";
echo "    }<br>";
echo "}<br><br>";

echo "=== Test Simulation ===<br>";
$tests = [
    ["testFindAll", "PASS"],
    ["testFindById", "PASS"],
    ["testCreate", "PASS"],
    ["testUpdate", "PASS"],
    ["testDelete", "PASS"],
];

foreach ($tests as [$name, $result]) {
    echo "  $result: $name<br>";
}

echo "<br>=== Database Testing ===<br>";
echo "$this->seeInDatabase('products', ['name' => 'Test Product']);<br>";
echo "$this->dontSeeInDatabase('products', ['name' => 'Deleted']);<br>";
echo "$this->hasInDatabase('products', ['name' => 'New', 'price' => 50]);<br><br>";

echo "=== Test Helpers ===<br>";
echo "model('ProductModel') — Get model instance<br>";
echo "db_connect() — Get database connection<br>";
echo "$this->seed('ProductSeeder') — Run seeder<br>";
>`,
    objectivesId: [
      'CIUnitTestCase: base class untuk unit test',
      'FeatureTestTrait: test HTTP request',
      'Database testing: seeInDatabase, dontSeeInDatabase',
      'Test helpers: model(), db_connect(), seed()',
      'Assertions: assertStatus, assertJSON, assertIsArray',
    ],
    objectivesEn: [
      'CIUnitTestCase: base class for unit tests',
      'FeatureTestTrait: test HTTP requests',
      'Database testing: seeInDatabase, dontSeeInDatabase',
      'Test helpers: model(), db_connect(), seed()',
      'Assertions: assertStatus, assertJSON, assertIsArray',
    ],
    explanationId: '### CIUnitTestCase\nBase class untuk test. \`$refresh = true\` untuk reset database.\n\n### FeatureTestTrait\nTest HTTP: \`$this->get()\`, \`$this->post()\`, dengan assertion methods.\n\n### Database Test\n\`seeInDatabase()\` cek record exists. \`dontSeetInDatabase()\` cek tidak exists.\n\n### Helpers\n\`model()\` get model, \`db_connect()\` get DB, \`seed()\` run seeder.\n\n### Assertions\n\`assertStatus(200)\`, \`assertJSON()\`, \`assertIsArray()\`.',
    explanationEn: '### CIUnitTestCase\nBase test class. \`$refresh = true\` resets database.\n\n### FeatureTestTrait\nTest HTTP: \`$this->get()\`, \`$this->post()\`.\n\n### Database Tests\n\`seeInDatabase()\` checks record exists. \`dontSeeInDatabase()\` checks absence.\n\n### Helpers\n\`model()\`, \`db_connect()\`, \`seed()\`.\n\n### Assertions\n\`assertStatus()\`, \`assertJSON()\`, \`assertIsArray()\`.',
    experimentsId: [
      'Buat test untuk model CRUD',
      'Test controller dengan FeatureTestTrait',
      'Coba database assertion',
      'Buat test dengan seeder',
      'Implementasikan test dengan mocking',
    ],
    experimentsEn: [
      'Create test for model CRUD',
      'Test controller with FeatureTestTrait',
      'Try database assertions',
      'Create test with seeder',
      'Implement test with mocking',
    ],
    challengeId: 'Buat test suite lengkap untuk CRUD Product: model test, controller test, database assertion. Min 10 test cases.',
    challengeEn: 'Create a complete test suite for Product CRUD: model test, controller test, database assertions. Min 10 test cases.',
    summaryId: 'Minggu 9 dari 10: **Testing dengan PHPUnit** (Level: Menengah). Kualitas kode terjamin. Minggu depan: **Capstone Project**!',
    summaryEn: 'Week 9 of 10: **Testing with PHPUnit** (Level: Intermediate). Code quality guaranteed. Next week: **Capstone Project**!',
  },
  {
    week: 10, level: 'intermediate', topicId: 'capstone-project',
    titleId: 'Capstone: Task Management API', titleEn: 'Capstone: Task Management API',
    programId: 'Task Manager', programEn: 'Task Manager',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'php',
    code: `<?php
echo "=== Capstone: Task Management API ===<br><br>";

echo "=== Architecture ===<br>";
echo "Models: User, Task, Category<br>";
echo "Controllers: AuthController, TaskController, CategoryController<br>";
echo "Filters: AuthFilter, AdminFilter<br>";
echo "Migrations: users, tasks, categories<br>";
echo "Seeds: UserSeeder, TaskSeeder<br><br>";

echo "=== Features ===<br>";
echo "✓ User registration & login<br>";
echo "✓ JWT/Session authentication<br>";
echo "✓ CRUD tasks with validation<br>";
echo "✓ Task categories<br>";
echo "✓ Filter by status (pending/done)<br>";
echo "✓ Due date management<br>";
echo "✓ RESTful API endpoints<br>";
echo "✓ JSON responses<br>";
echo "✓ Testing (Feature + Unit)<br><br>";

echo "=== API Endpoints ===<br>";
$endpoints = [
    "POST /api/register" => "Register",
    "POST /api/login" => "Login",
    "GET /api/tasks" => "List tasks",
    "POST /api/tasks" => "Create task",
    "GET /api/tasks/(:num)" => "Task detail",
    "PUT /api/tasks/(:num)" => "Update task",
    "DELETE /api/tasks/(:num)" => "Delete task",
    "PATCH /api/tasks/(:num)/complete" => "Mark complete",
];

foreach ($endpoints as $endpoint => $desc) {
    echo "  $endpoint — $desc<br>";
}

echo "<br>=== Task Flow ===<br>";
echo "1. User registers → POST /api/register<br>";
echo "2. User logs in → POST /api/login → get token<br>";
echo "3. Create task → POST /api/tasks (with auth)<br>";
echo "4. List tasks → GET /api/tasks<br>";
echo "5. Update task → PUT /api/tasks/1<br>";
echo "6. Mark complete → PATCH /api/tasks/1/complete<br>";
echo "7. Delete task → DELETE /api/tasks/1<br><br>";

echo "=== Test Coverage ===<br>";
echo "✓ Auth: register, login, logout<br>";
echo "✓ Tasks: CRUD, validation errors<br>";
echo "✓ Filter: unauthorized access<br>";
echo "✓ Database: insert, update, delete<br>";
>`,
    objectivesId: [
      'Menggabungkan semua konsep: MVC, validation, auth, REST, testing',
      'Task management domain: users, tasks, categories',
      'Full CRUD API dengan authentication',
      'Validation: task title, due date, status',
      'Testing: feature test untuk semua endpoints',
    ],
    objectivesEn: [
      'Combine all concepts: MVC, validation, auth, REST, testing',
      'Task management domain: users, tasks, categories',
      'Full CRUD API with authentication',
      'Validation: task title, due date, status',
      'Testing: feature tests for all endpoints',
    ],
    explanationId: '### Architecture\nMVC + Filters. Controller → Model → Database. Auth filter protect routes.\n\n### Task Flow\nRegister → Login → CRUD tasks → Filter/complete → Delete.\n\n### Auth\nSession-based atau JWT. Filter protect task routes.\n\n### Validation\nTitle required, due date valid, status in (pending/done).\n\n### Testing\nFeature test: \`$this->post(\'/api/tasks\', [...])\`. Assert status, JSON, database.',
    explanationEn: '### Architecture\nMVC + Filters. Controller → Model → Database. Auth filter protects routes.\n\n### Task Flow\nRegister → Login → CRUD tasks → Filter/complete → Delete.\n\n### Auth\nSession-based or JWT. Filter protects task routes.\n\n### Validation\nTitle required, due date valid, status in (pending/done).\n\n### Testing\nFeature test: \`$this->post(\'/api/tasks\', [...])\`. Assert status, JSON, database.',
    experimentsId: [
      'Tambah task priority (low/medium/high)',
      'Implementasikan task search',
      'Buat task statistics endpoint',
      'Tambah file attachment untuk task',
      'Buat API documentation',
    ],
    experimentsEn: [
      'Add task priority (low/medium/high)',
      'Implement task search',
      'Create task statistics endpoint',
      'Add file attachment for tasks',
      'Create API documentation',
    ],
    challengeId: 'Buat task management API lengkap: auth, CRUD tasks, categories, filtering, testing. Deploy ke production.',
    challengeEn: 'Build a complete task management API: auth, CRUD tasks, categories, filtering, testing. Deploy to production.',
    summaryId: 'Minggu 10 dari 10: **Capstone: Task Management API** (Level: Menengah). Selesai! 🎉 Anda sudah menguasai CodeIgniter 4 dari dasar hingga produksi.',
    summaryEn: 'Week 10 of 10: **Capstone: Task Management API** (Level: Intermediate). Complete! 🎉 You\'ve mastered CodeIgniter 4 from basics to production.',
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
