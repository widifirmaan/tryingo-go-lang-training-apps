"""
Ruby on Rails Track Curriculum Generator (10 Weeks, 3 Levels)
Product: High-Interactivity Real-Time Collaborative Team Workspace Platform (Ruby on Rails 8 + Hotwire + Solid Stack)
"""

def get_track():
    return {
        'slug': 'rails',
        'track_name': 'Ruby on Rails 8',
        'levels': [
            {
                'levelId': 'beginer',
                'nameId': 'Pemula (Rails 8 Foundations & Hotwire Turbo)',
                'nameEn': 'Beginner (Rails 8 Foundations & Hotwire Turbo)',
                'descId': 'Arsitektur Rails 8 modern, Active Record associations, RESTful routing, dan Hotwire Turbo Frames.',
                'descEn': 'Modern Rails 8 architecture, Active Record associations, RESTful routing, and Hotwire Turbo Frames.',
            },
            {
                'levelId': 'intermediate',
                'nameId': 'Menengah (Turbo Streams, Stimulus JS & Solid Stack)',
                'nameEn': 'Intermediate (Turbo Streams, Stimulus JS & Solid Stack)',
                'descId': 'WebSockets real-time dengan Turbo Streams & Solid Cable, Stimulus JS, dan background jobs dengan Solid Queue.',
                'descEn': 'Real-time WebSockets with Turbo Streams & Solid Cable, Stimulus JS, and background jobs with Solid Queue.',
            },
            {
                'levelId': 'advanced',
                'nameId': 'Lanjutan (Solid Cache, Native Auth & Workspace Capstone)',
                'nameEn': 'Advanced (Solid Cache, Native Auth & Workspace Capstone)',
                'descId': 'Solid Cache, Russian Doll Caching, sistem autentikasi native Rails 8, deployment Kamal 2, dan platform kolaborasi tim.',
                'descEn': 'Solid Cache, Russian Doll Caching, Rails 8 native auth, Kamal 2 deployment, and team collaboration platform.',
            },
        ],
        'modules': [
            # Week 1
            {
                'week': 1,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'rails8-convention-omakase-scaffolding',
                'titleId': 'Modern Rails 8: Konvensi Omakase, Propshaft & Struktur Proyek',
                'titleEn': 'Modern Rails 8: Omakase Conventions, Propshaft & Project Structure',
                'programId': 'Domain Model Workspace Proyek Kolaboratif dengan Konvensi Rails 8',
                'programEn': 'Collaborative Project Workspace Domain Model with Rails 8 Conventions',
                'language': 'ruby',
                'code': '''# config/routes.rb (Rails 8: Ramping & Elegan)
Rails.application.routes.draw do
  root "workspaces#index"

  resources :workspaces do
    resources :projects, shallow: true do
      resources :tasks, only: [:create, :update, :destroy]
    end
  end
end

# app/models/workspace.rb
class Workspace < ApplicationRecord
  # Konvensi Rails: nama tabel otomatis 'workspaces', primary key otomatis 'id'
  has_many :projects, dependent: :destroy
  has_many :tasks, through: :projects

  validates :name, presence: true, length: { minimum: 3, maximum: 80 }
  validates :slug, presence: true, uniqueness: { case_sensitive: false }

  before_validation :generate_slug, on: :create

  private

  def generate_slug
    self.slug = name.parameterize if name.present?
  end
end

# app/controllers/workspaces_controller.rb
class WorkspacesController < ApplicationController
  def index
    # Konvensi: otomatis render 'app/views/workspaces/index.html.erb'
    @workspaces = Workspace.order(created_at: :desc)
  end

  def show
    @workspace = Workspace.find_by!(slug: params[:id])
    @projects = @workspace.projects.includes(:tasks)
  end
end

puts "=== RUBY ON RAILS 8 OMAKASE ARCHITECTURE INITIALIZED ==="
''',
                'objectivesId': [
                    'Memahami filosofi "Convention over Configuration" dan "The Rails Doctrine" (Omakase Stack).',
                    'Menguasai struktur direktori Rails 8 dan pipeline aset modern Propshaft (tanpa Node.js bundler).',
                    'Mendefinisikan nested RESTful resources dengan opsi `shallow: true`.',
                    'Mengotomatisasi pembuatan slug URL menggunakan callback model `before_validation`.',
                ],
                'objectivesEn': [
                    'Understand "Convention over Configuration" and "The Rails Doctrine" (The Omakase Stack).',
                    'Master Rails 8 directory structure and modern Propshaft asset pipeline (omitting Node.js build tools).',
                    'Declare nested RESTful resources with the `shallow: true` optimization.',
                    'Automate SEO slug generation via `before_validation` model lifecycle callbacks.',
                ],
                'explanationId': '''Ruby on Rails adalah framework web revolusioner yang memelopori banyak konsep web modern (seperti MVC, RESTful conventions, dan migrations). Di versi **Rails 8**, framework ini kembali ke akarnya yang paling elegan dengan menghadirkan filosofi **"Omakase"**: seluruh komponen terbaik (database, queue, cache, asset pipeline) sudah dipilihkan dan disajikan langsung tanpa perlu konfigurasi rumit.

### Convention over Configuration (CoC)
Di Rails, Anda tidak perlu mengonfigurasi nama tabel atau primary key. Jika nama model Anda adalah `Workspace`, Rails secara otomatis mengetahui bahwa tabelnya di PostgreSQL bernama `workspaces`, foreign key-nya bernama `workspace_id`, dan controller-nya bernama `WorkspacesController`.

### Propshaft: Selamat Tinggal Node.js Build Tool
Di Rails 8, developer tidak lagi dipusingkan oleh Webpack atau Node.js build configuration yang membengkak. **Propshaft** adalah asset pipeline generasi baru yang memanfaatkan protokol HTTP/2 browser modern untuk memuat file CSS dan JS murni secara instan tanpa proses kompilasi bundler yang lambat.
''',
                'explanationEn': '''Ruby on Rails stands as the landmark framework that pioneered modern web engineering paradigms (MVC, RESTful conventions, database migrations). In **Rails 8**, the framework doubles down on **"Omakase"**: packaging the definitive developer toolset (database persistence, queues, WebSockets, caching) pre-configured out of the box.

### Convention over Configuration (CoC)
Rails eradicates XML/YAML mapping configurations. Declaring a `Workspace` model instructs Rails that the PostgreSQL table is named `workspaces`, its relational foreign key is `workspace_id`, and its HTTP dispatcher is `WorkspacesController`.

### Propshaft: Retiring Complex Bundlers
Rails 8 replaces bloated Webpack asset tooling with **Propshaft**. Taking advantage of native browser ES modules and HTTP/2 multiplexing, Propshaft delivers asset pipelines with zero Node.js compilation friction.
''',
                'beginnerId': '''Bayangkan memesan hidangan Omakase di restoran sushi Jepang ternama. Anda tidak perlu repot memilih bumbu atau cara memasak ikan sendiri; koki master terbaik sudah menyajikan sushi paling lezat dan sempurna di atas meja Anda. Rails 8 adalah Omakase untuk web development: semua perkakas terbaik sudah disiapkan dan langsung pas satu sama lain.''',
                'beginnerEn': '''Imagine ordering an authentic Omakase dinner at a world-class sushi bar. You do not dictate fish varieties or soy sauce ratios; the master chef selects and presents the finest delicacies directly to your plate. Rails 8 is the Omakase of web development: every premier tool is pre-selected and harmonized for you.''',
                'experimentsId': [
                    'Jalankan perintah `bin/rails routes` di terminal untuk melihat seluruh rute RESTful yang dihasilkan.',
                    'Gunakan konsol interaktif `bin/rails console` (Pry) untuk membuat record Workspace baru di memori.',
                    'Uji coba fitur `shallow: true` dan amati bagaimana rute task menjadi `/projects/:id/tasks` yang bersih.',
                ],
                'experimentsEn': [
                    'Execute `bin/rails routes` in your terminal to inspect generated RESTful endpoints.',
                    'Spin up `bin/rails console` creating experimental Workspace records interactively.',
                    'Test `shallow: true` observing how nested task routes simplify to `/projects/:id/tasks`.',
                ],
                'challengeId': 'Gunakan generator Rails `bin/rails generate model Task title:string status:integer priority:integer due_date:date` dan amati migration yang otomatis dihasilkan.',
                'challengeEn': 'Deploy the Rails generator `bin/rails generate model Task title:string status:integer priority:integer due_date:date` auditing the generated migration file.',
                'summaryId': 'Kamu telah menguasai konvensi Rails 8, Propshaft, dan nested resources. Minggu depan kita masuk ke Active Record associations, scopes, dan validasi.',
                'summaryEn': 'You have mastered Rails 8 conventions, Propshaft, and nested resources. Next week we explore Active Record associations, scopes, and validations.',
            },

            # Week 2
            {
                'week': 2,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'active-record-validations-associations',
                'titleId': 'Active Record Lanjutan: Asosiasi Kompleks, Scopes & Enums',
                'titleEn': 'Advanced Active Record: Complex Associations, Scopes & Enums',
                'programId': 'Model Manajemen Tugas Tim dengan Status Enum & Kueri Scopes Cepat',
                'programEn': 'Team Task Management Model with Status Enums & Fast Query Scopes',
                'language': 'ruby',
                'code': '''# app/models/task.rb
class Task < ApplicationRecord
  belongs_to :project
  belongs_to :assignee, class_name: "User", optional: true
  has_one :workspace, through: :project

  # Rails 7.1 / 8: Enum Tersintaksis Modern
  enum :status, {
    backlog: 0,
    in_progress: 1,
    in_review: 2,
    completed: 3
  }, default: :backlog, prefix: true

  enum :priority, {
    low: 0,
    medium: 1,
    high: 2,
    urgent: 3
  }, default: :medium

  # Active Record Validations
  validates :title, presence: true, length: { minimum: 3, maximum: 120 }
  validates :due_date, comparison: { greater_than_or_equal_to: -> { Date.current } }, allow_nil: true

  # Reusable Query Scopes (Kueri SQL Bersih & Rantaiable)
  scope :overdue, -> { where("due_date < ? AND status != ?", Date.current, statuses[:completed]) }
  scope :urgent_tasks, -> { where(priority: :urgent) }
  scope :assigned_to_user, ->(user_id) { where(assignee_id: user_id) }
  scope :recently_updated, -> { order(updated_at: :desc).limit(10) }

  # Business Methods
  def mark_as_done!
    status_completed! # Built-in method otomatis dari deklarasi enum!
    touch(:completed_at)
  end
end

puts "=== ACTIVE RECORD TASK MODEL WITH SCOPES & ENUMS CONFIGURED ==="
''',
                'objectivesId': [
                    'Menguasai Active Record: ORM paling ekspresif dan elegan dalam sejarah rekayasa perangkat lunak.',
                    'Mendefinisikan asosiasi kompleks: `belongs_to :assignee, class_name: "User"` dan `has_one :through`.',
                    'Menggunakan Rails 8 modern `enum :status` yang otomatis menyediakan method helper (`task.status_completed!`, `task.status_in_progress?`).',
                    'Membangun kueri database yang dapat dirangkai (Chainable Scopes) untuk performa SQL optimal.',
                ],
                'objectivesEn': [
                    'Master Active Record: the software industry\'s most expressive and elegant ORM.',
                    'Declare complex associations: `belongs_to :assignee, class_name: "User"` and `has_one :through`.',
                    'Utilize modern Rails 8 `enum :status` syntax unlocking automated helpers (`task.status_completed!`).',
                    'Construct chainable query scopes compiling down to optimized SQL clauses.',
                ],
                'explanationId': '''Active Record di Ruby on Rails adalah standar emas desain ORM yang kemudian ditiru oleh puluhan framework di bahasa lain (seperti Laravel Eloquent dan Django ORM).

### Kekuatan Enums Modern di Rails 8
Dengan mendeklarasikan `enum :status, { backlog: 0, in_progress: 1, completed: 3 }, prefix: true`, Active Record secara otomatis memberikan Anda belasan method ajaib gratis:
- Pengecekan status: `task.status_completed?` (mengembalikan true/false).
- Mutasi langsung: `task.status_in_progress!` (mengubah status dan langsung menyimpan ke database).
- Query scope instan: `Task.status_completed` (menghasilkan SQL `SELECT * FROM tasks WHERE status = 3`).

### Chainable Scopes
Scopes memungkinkan Anda merangkum kueri SQL bisnis yang sering digunakan ke dalam method kelas yang dapat dirangkai dengan indah:
`Task.urgent_tasks.overdue.assigned_to_user(current_user.id)`
Active Record menunda eksekusi kueri (**Lazy Evaluation**) hingga data benar-benar dibutuhkan di view, menggabungkan seluruh kondisi WHERE menjadi satu perintah SQL tunggal yang sangat efisien.
''',
                'explanationEn': '''Rails Active Record remains the benchmark ORM paradigm that inspired frameworks across the global software industry (including Laravel Eloquent and Django ORM).

### Modern Rails 8 Enum Capabilities
Declaring `enum :status, { backlog: 0, in_progress: 1, completed: 3 }, prefix: true` synthesizes an array of domain methods automatically:
- Predicates: `task.status_completed?` (yielding booleans).
- State Bang Mutations: `task.status_in_progress!` (persisting transitions atomically).
- Built-in Scopes: `Task.status_completed` (compiling `SELECT * FROM tasks WHERE status = 3`).

### Chainable Scopes & Lazy Evaluation
Scopes encapsulate relational SQL predicates into composable methods:
`Task.urgent_tasks.overdue.assigned_to_user(current_user.id)`
Active Record employs **Lazy Evaluation**, chaining SQL WHERE clauses into a single compiled query dispatched only when view rendering begins.
''',
                'beginnerId': '''Bayangkan papan kartu tugas tim di dinding kantor. Daripada Anda harus membaca 100 kartu satu per satu mencari mana tugas yang mendesak, Anda memiliki stiker warna otomatis (Enum: Merah = Urgent, Hijau = Selesai). Anda bisa menekan tombol ajaib (Scope: overdue) dan papan kartu otomatis menyalakan lampu hanya pada kartu tugas yang telat diselesaikan.''',
                'beginnerEn': '''Imagine an office wall task board holding 100 cards. Rather than manually inspecting each card to find overdue tasks, cards possess color-coded tags (Enums: Red = Urgent, Green = Done). Flipping a master switch (Scope: overdue) illuminates only cards that have breached their target deadlines.''',
                'experimentsId': [
                    'Uji coba pemanggilan helper bang method `task.status_completed!` di konsol Rails.',
                    'Rangkai dua scope sekaligus `Task.urgent_tasks.recently_updated` dan amati kueri SQL di log konsol.',
                    'Coba buat tugas dengan tanggal due date kemarin dan perhatikan validasi `comparison` menggagalkan penyimpanan.',
                ],
                'experimentsEn': [
                    'Test enum bang mutations like `task.status_completed!` in `bin/rails console`.',
                    'Chain dual scopes `Task.urgent_tasks.recently_updated` and examine compiled SQL in terminal logs.',
                    'Instantiate a task with a past due date and observe the `comparison` validator rejecting the record.',
                ],
                'challengeId': 'Tambahkan validasi kustom `validate :assignee_must_belong_to_workspace` yang memastikan anggota tim yang ditugaskan benar-benar terdaftar di workspace proyek tersebut.',
                'challengeEn': 'Add a custom validation `validate :assignee_must_belong_to_workspace` ensuring assignees belong to the workspace organization.',
                'summaryId': 'Kamu telah menguasai Active Record associations, modern enums, dan chainable scopes. Minggu depan kita mempelajari Action Controller dan Strong Parameters.',
                'summaryEn': 'You have mastered Active Record associations, modern enums, and chainable scopes. Next week we cover Action Controller and Strong Parameters.',
            },

            # Week 3
            {
                'week': 3,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'controllers-routing-restful',
                'titleId': 'Action Controller: Strong Parameters, Flash Alerts & Alur RESTful',
                'titleEn': 'Action Controller: Strong Parameters, Flash Alerts & RESTful Workflows',
                'programId': 'Controller Manajemen Tugas RESTful dengan Proteksi Strong Parameters',
                'programEn': 'RESTful Task Controller with Strong Parameters Security Defense',
                'language': 'ruby',
                'code': '''# app/controllers/tasks_controller.rb
class TasksController < ApplicationController
  before_action :set_project, only: [:create]
  before_action :set_task, only: [:update, :destroy]

  # POST /projects/:project_id/tasks
  def create
    @task = @project.tasks.build(task_params)

    if @task.save
      redirect_to @project, notice: "Tugas '#{@task.title}' berhasil ditambahkan ke papan proyek!"
    else
      # Kembalikan HTTP 422 Unprocessable Entity untuk kompatibilitas Hotwire Turbo
      render "projects/show", status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/:id
  def update
    if @task.update(task_params)
      redirect_to @task.project, notice: "Status tugas berhasil diperbarui."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/:id
  def destroy
    project = @task.project
    @task.destroy
    redirect_to project, notice: "Tugas berhasil dihapus.", status: :see_other
  end

  private

  def set_project
    @project = Project.find(params[:project_id])
  end

  def set_task
    @task = Task.find(params[:id])
  end

  # Strong Parameters: Whitelist atribut untuk mematikan celah Mass Assignment Attack
  def task_params
    params.require(:task).permit(:title, :status, :priority, :due_date, :assignee_id)
  end
end

puts "=== ACTION CONTROLLER WITH STRONG PARAMETERS INITIALIZED ==="
''',
                'objectivesId': [
                    'Menguasai 7 aksi RESTful standar di Rails: `index`, `show`, `new`, `create`, `edit`, `update`, `destroy`.',
                    'Mengamankan controller dari serangan Mass Assignment menggunakan **Strong Parameters** (`require` dan `permit`).',
                    'Menggunakan lifecycle filter `before_action` untuk prinsip DRY (Don\'t Repeat Yourself).',
                    'Memahami status HTTP semantik (`:unprocessable_entity`, `:see_other`) yang wajib untuk integrasi Hotwire Turbo.',
                ],
                'objectivesEn': [
                    'Master the 7 canonical RESTful Rails controller actions: `index`, `show`, `new`, `create`, `edit`, `update`, `destroy`.',
                    'Shield actions against Mass Assignment exploits via **Strong Parameters** (`require` and `permit`).',
                    'Deploy `before_action` lifecycle filters enforcing DRY (Don\'t Repeat Yourself) design.',
                    'Understand semantic HTTP status codes (`:unprocessable_entity`, `:see_other`) mandatory for Hotwire Turbo integration.',
                ],
                'explanationId': '''Di masa awal Rails, pengguna dapat mengirimkan form dan langsung menyimpannya dengan `User.create(params[:user])`. Ini memicu celah fatal **Mass Assignment**: peretas cukup menyisipkan input tersembunyi `admin=true` pada form pendaftaran untuk mengangkat dirinya menjadi Super Administrator.

### Pertahanan Mutlak: Strong Parameters
Rails Action Controller mewajibkan penggunaan **Strong Parameters**:
`params.require(:task).permit(:title, :status, :priority)`
Hanya atribut yang secara eksplisit dicantumkan di dalam method `.permit()` yang diizinkan masuk ke database. Jika ada atribut liar yang dikirimkan, Rails membuangnya secara otomatis.

### Pentingnya HTTP Status Codes untuk Turbo
Ketika validasi form gagal, controller harus mengembalikan status `status: :unprocessable_entity` (HTTP 422). Jika controller hanya mengembalikan 200 biasa, Hotwire Turbo di browser tidak akan merespons dan form error tidak akan muncul di layar pengguna. Begitu pula saat menghapus data (`destroy`), status `:see_other` (HTTP 303) wajib digunakan untuk redirect yang mulus.
''',
                'explanationEn': '''In early web frameworks, models ingested raw parameters via `User.create(params[:user])`. This exposed catastrophic **Mass Assignment** exploits: malicious actors injected `admin=true` into registration payloads, escalating privileges to Super Admin.

### Absolute Defense: Strong Parameters
Rails Action Controller enforces **Strong Parameters**:
`params.require(:task).permit(:title, :status, :priority)`
Only attributes explicitly whitelisted within `.permit()` pass to model layers; foreign parameters are discarded automatically.

### Semantic HTTP Status Codes for Hotwire Turbo
When form submissions fail validation, controllers must yield `status: :unprocessable_entity` (HTTP 422). Returning HTTP 200 confuses Hotwire Turbo, preventing error banners from rendering. Similarly, deletion redirects require `status: :see_other` (HTTP 303) ensuring smooth frame navigation.
''',
                'beginnerId': '''Bayangkan Anda memesan paket makanan lewat ojek online. Strong Parameters seperti petugas kasir yang memeriksa daftar pesanan Anda: jika Anda diam-diam menyelipkan tulisan pensil "Bonus Emas Batangan Gratis", kasir mencoret tulisan pensil tersebut dan hanya memasukkan makanan yang sah ke dalam kantong kresek Anda.''',
                'beginnerEn': '''Imagine ordering takeout via a delivery app. Strong Parameters act like a checkout clerk auditing order slips: if a patron sneakily scribbled "Include Free Gold Bar" at the bottom, the clerk crosses out the unauthorized addition, packing only authorized food items into the delivery bag.''',
                'experimentsId': [
                    'Kirim payload POST dengan atribut `is_admin: true` dan amati bahwa atribut tersebut dibuang oleh Strong Parameters.',
                    'Hapus opsi `status: :unprocessable_entity` saat validasi gagal dan perhatikan mengapa form error tidak muncul di Hotwire.',
                    'Gunakan flash alert `flash.now[:alert]` untuk pesan kesalahan yang hanya berlaku pada render saat ini.',
                ],
                'experimentsEn': [
                    'Submit a POST payload with an unpermitted `is_admin: true` parameter verifying it is stripped by Strong Parameters.',
                    'Omit `status: :unprocessable_entity` during validation failures and observe Hotwire failing to update the DOM.',
                    'Deploy `flash.now[:alert]` for ephemeral error messages rendered during the active request.',
                ],
                'challengeId': 'Buat nested strong parameters yang mengizinkan pembuatan sebuah Task sekaligus melampirkan beberapa file dokumen attachment menggunakan Active Storage (`permit(:title, documents: [])`).',
                'challengeEn': 'Author nested strong parameters permitting task instantiation alongside multiple uploaded document attachments via Active Storage (`permit(:title, documents: [])`).',
                'summaryId': 'Kamu telah menguasai Action Controller, Strong Parameters, dan HTTP Status Codes untuk Turbo. Minggu depan kita mempelajari Hotwire Turbo Drive dan Turbo Frames.',
                'summaryEn': 'You have mastered Action Controller, Strong Parameters, and HTTP Status Codes for Turbo. Next week we explore Hotwire Turbo Drive and Turbo Frames.',
            },

            # Week 4
            {
                'week': 4,
                'level': 'beginer',
                'levelNameId': 'Pemula',
                'levelNameEn': 'Beginner',
                'topicId': 'hotwire-turbo-drive-frames',
                'titleId': 'Frontend Modern Tanpa SPA: Hotwire Turbo Drive & Turbo Frames',
                'titleEn': 'Modern Frontend Without SPAs: Hotwire Turbo Drive & Turbo Frames',
                'programId': 'Papan Tugas Tim dengan Inline Editing Tanpa Reload Menggunakan Turbo Frames',
                'programEn': 'Team Task Board with Zero-Reload Inline Editing via Turbo Frames',
                'language': 'ruby',
                'code': '''# app/views/tasks/_task.html.erb (Partial Kartu Tugas dengan Turbo Frame)
# Tag turbo_frame_tag membungkus elemen HTML dengan ID unik berbasis model (misal: "task_42")

<%= turbo_frame_tag dom_id(task) do %>
  <div class="task-card border p-3 rounded-lg flex justify-between items-center bg-white shadow-sm mb-2">
    <div>
      <h4 class="font-bold text-slate-800"><%= task.title %></h4>
      <span class="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800">
        <%= task.priority.capitalize %>
      </span>
    </div>

    <!-- Tautan Edit ini HANYA akan me-replace isi turbo_frame_tag ini saja, TANPA reload halaman! -->
    <div class="actions">
      <%= link_to "Edit", edit_task_path(task), class: "text-blue-600 text-sm hover:underline" %>
    </div>
  </div>
<% end %>

# app/views/tasks/edit.html.erb (Formulir Pengeditan Inline)
<%= turbo_frame_tag dom_id(@task) do %>
  <%= form_with(model: @task, class: "border p-3 rounded-lg bg-blue-50 mb-2") do |f| %>
    <%= f.text_field :title, class: "border rounded px-2 py-1 w-full mb-2" %>
    <div class="flex gap-2">
      <%= f.submit "Simpan", class: "btn-primary text-xs" %>
      <%= link_to "Batal", @task, class: "btn-secondary text-xs" %>
    </div>
  <% end %>
<% end %>
''',
                'objectivesId': [
                    'Memahami filosofi Hotwire: menghadirkan kecepatan Single Page Application (SPA) tanpa kompleksitas React/Webpack.',
                    'Menggunakan Turbo Drive untuk akselerasi navigasi link dan form submission tanpa full-page reload.',
                    'Menguasai `turbo_frame_tag` untuk dekomposisi halaman menjadi komponen interaktif independen.',
                    'Menerapkan inline editing formulir dengan isolasi pembaruan DOM berbasis model ID (`dom_id(task)`).',
                ],
                'objectivesEn': [
                    'Understand the Hotwire philosophy: delivering SPA responsiveness without client-side JavaScript complexity.',
                    'Deploy Turbo Drive accelerating links and form submissions without full-page reloads.',
                    'Master `turbo_frame_tag` decomposing templates into isolated interactive view islands.',
                    'Implement inline form editing isolating DOM replacements via model identity (`dom_id(task)`).',
                ],
                'explanationId': '''Selama bertahun-tahun, industri web terpecah menjadi dua kubu: backend API terpisah dan frontend SPA raksasa (React / Vue) yang sangat rumit, membutuhkan ribuan dependensi npm, dan sering mengalami masalah SEO. Rails memecahkan dilema ini melalui **Hotwire (HTML Over The Wire)**.

### Apa itu Turbo Drive?
Secara default, Turbo Drive mencegat semua klik tautan `<a>` dan form `<form>` di browser. Alih-alih merusak dan memuat ulang seluruh halaman dari nol, Turbo Drive mengambil HTML baru di background via `fetch()`, mengganti elemen `<body>`, dan memperbarui URL browser tanpa memicu kedipan layar putih (White Flash).

### Keajaiban Turbo Frames
Dengan membungkus sebuah kartu tugas di dalam `<%= turbo_frame_tag dom_id(task) %>`, tautan edit di dalam frame tersebut **hanya akan memperbarui konten di dalam frame itu saja**. Ketika pengguna menekan tombol "Edit", kartu tugas tersebut berubah seketika menjadi formulir pengeditan input di tempat (inline editing) tanpa menyentuh bagian lain dari halaman web, persis seperti komponen React namun dengan 100% kode Ruby di sisi server!
''',
                'explanationEn': '''For years, web engineering bifurcated into fragmented silos: detached backend JSON APIs paired with bloated client SPAs (React/Vue) burdened by npm dependency trees and SEO hurdles. Rails bridges this divide via **Hotwire (HTML Over The Wire)**.

### Turbo Drive Mechanics
Turbo Drive intercepts standard `<a>` navigation and `<form>` submissions automatically. Bypassing traditional browser page tearing, Turbo Drive fetches HTML responses asynchronously via `fetch()`, swapping out `<body>` nodes while retaining cached scroll states and stylesheets.

### The Power of Turbo Frames
Encapsulating a task card inside `<%= turbo_frame_tag dom_id(task) %>` restricts link and form interactions strictly to that view island. Clicking "Edit" replaces the task card with an inline form instantaneously without touching adjacent DOM nodes—delivering React-like component reactivity with 100% server-side Ruby!
''',
                'beginnerId': '''Bayangkan Anda membaca koran harian. Jika koran tradisional (web lama), setiap kali ada ralat berita di halaman 3, seluruh koran Anda dibuang ke tong sampah dan Anda harus membeli koran baru dari nol (Full Page Reload). Dengan Turbo Frames, seperti ada stiker tempel transparan ajaib yang langsung menempelkan ralat berita tepat di kolom halaman 3 tanpa Anda perlu mengganti koran Anda.''',
                'beginnerEn': '''Imagine reading a daily newspaper. In legacy web models, printing a correction on page 3 requires throwing the entire paper into the trash and purchasing a brand-new paper from the newsstand (Full Page Reload). Turbo Frames behave like an automated correction stamp updating only that paragraph on page 3 while you continue reading uninterrupted.''',
                'experimentsId': [
                    'Klik link "Edit" pada kartu tugas di browser dan amati kartu berubah menjadi form tanpa reload halaman.',
                    'Periksa tab Network di browser DevTools dan amati header request `Turbo-Frame: task_42`.',
                    'Tambahkan atribut `data-turbo-frame="_top"` pada link untuk memecahkan diri dari frame dan memicu navigasi halaman penuh.',
                ],
                'experimentsEn': [
                    'Click "Edit" on a task card in your browser observing the card morph into a form with zero page tear.',
                    'Audit the browser Network inspector noting the outgoing `Turbo-Frame: task_42` header.',
                    'Attach `data-turbo-frame="_top"` to a link escaping frame sandboxes to drive full-page transitions.',
                ],
                'challengeId': 'Bangun modal dialog popup menggunakan Turbo Frame: klik tombol "Tambah Tugas", muat form di dalam `<dialog id="modal">` via Turbo Frame, dan tutup modal otomatis saat form berhasil disimpan.',
                'challengeEn': 'Build an accessible modal dialog using Turbo Frames: click "New Task", render the form inside `<dialog id="modal">`, closing the dialog upon submission.',
                'summaryId': 'Kamu telah menguasai Hotwire Turbo Drive dan Turbo Frames. Level 1 selesai! Di Level 2 kita mempelajari Turbo Streams, WebSockets Solid Cable, dan Stimulus JS.',
                'summaryEn': 'You have mastered Hotwire Turbo Drive and Turbo Frames. Level 1 complete! Level 2 covers Turbo Streams, Solid Cable WebSockets, and Stimulus JS.',
            },

            # Week 5
            {
                'week': 5,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'turbo-streams-solid-cable',
                'titleId': 'Reaktivitas Real-Time: Turbo Streams & Rails 8 Solid Cable',
                'titleEn': 'Real-Time Reactivity: Turbo Streams & Rails 8 Solid Cable',
                'programId': 'Papan Kolaborasi Tugas Real-Time Multi-User dengan Turbo Streams & Solid Cable',
                'programEn': 'Multi-User Collaborative Task Board with Turbo Streams & Solid Cable',
                'language': 'ruby',
                'code': '''# app/models/task.rb (Real-Time Broadcasting Lifecycle Callbacks)
class Task < ApplicationRecord
  belongs_to :project

  # Rails 8: Otomatis broadcast pembaruan ke seluruh browser tim via Solid Cable!
  # Action: append (tambah ke list), replace (update kartu), remove (hapus dari DOM)
  broadcasts_to ->(task) { [task.project, :tasks] }, inserts_by: :prepend

  # broadcasts_to setara dengan:
  # after_create_commit  -> { broadcast_prepend_to [project, :tasks], target: "tasks_list" }
  # after_update_commit  -> { broadcast_replace_to [project, :tasks] }
  # after_destroy_commit -> { broadcast_remove_to  [project, :tasks] }
end

# app/views/projects/show.html.erb (Berlangganan Stream WebSocket)
# Tag turbo_stream_from membuka koneksi WebSocket Solid Cable di background
<%= turbo_stream_from @project, :tasks %>

<div class="kanban-board">
  <h2>Daftar Tugas Proyek: <%= @project.name %></h2>

  <!-- Kontainer tempat tugas baru otomatis disisipkan secara real-time -->
  <div id="tasks_list" class="space-y-2">
    <%= render @project.tasks %>
  </div>
</div>

# Format Respons Turbo Stream di Controller (tasks_controller.rb):
# respond_to do |format|
#   format.turbo_stream
#   format.html { redirect_to @project }
# end

puts "=== RAILS 8 SOLID CABLE & TURBO STREAMS BROADCASTING ACTIVE ==="
''',
                'objectivesId': [
                    'Menguasai aksi manipulasi DOM Turbo Streams: `append`, `prepend`, `replace`, `update`, dan `remove`.',
                    'Memahami Rails 8 Solid Cable (server WebSocket bawaan berbasis database berkinerja tinggi tanpa dependensi Redis).',
                    'Menggunakan makro model `broadcasts_to` untuk reaktivitas multi-user instan dengan 1 baris kode.',
                    'Membangun antarmuka kolaborasi tim real-time tanpa menulis satu baris pun kode JavaScript klien.',
                ],
                'objectivesEn': [
                    'Master Turbo Stream DOM action primitives: `append`, `prepend`, `replace`, `update`, and `remove`.',
                    'Understand Rails 8 Solid Cable (high-throughput database-backed WebSockets retiring Redis dependencies).',
                    'Deploy the `broadcasts_to` model macro provisioning instant multi-user reactivity in one line of code.',
                    'Construct collaborative real-time team interfaces with zero client-side JavaScript overhead.',
                ],
                'explanationId': '''Selama lebih dari satu dekade, menambahkan fitur real-time (seperti live chat atau papan kolaborasi tim multi-pengguna) di web membutuhkan pengaturan server Redis yang rumit, dependensi Pusher berbayar, dan ratusan baris kode state management di frontend (Redux / Zustand).

### Revolusi Rails 8 Solid Cable
Di Rails 8, Rails memperkenalkan **Solid Cable**: mesin backend WebSockets berkinerja tinggi yang ditenagai langsung oleh database PostgreSQL atau SQLite Anda menggunakan fitur polling I/O modern. Anda **tidak perlu menginstal server Redis** terpisah hanya untuk fitur WebSockets!

### Keajaiban broadcasts_to pada Turbo Streams
Cukup dengan menambahkan satu baris di model Task:
`broadcasts_to ->(task) { [task.project, :tasks] }`
Ketika Pengguna A membuat atau menggeser tugas di laptopnya, model Task secara otomatis memancarkan frame WebSocket via Solid Cable ke browser Pengguna B di belahan dunia lain. Browser Pengguna B langsung menyisipkan atau memperbarui elemen kartu tugas di layar dalam hitungan milidetik secara mulus!
''',
                'explanationEn': '''Historically, provisioning multi-user collaborative reactivity (live chat, collaborative Kanban boards) mandated complex Redis clusters, third-party Pusher subscriptions, and labyrinthine client state machinery (Redux/Zustand).

### The Rails 8 Solid Cable Revolution
Rails 8 introduces **Solid Cable**: a high-throughput, database-backed WebSocket architecture executing directly atop PostgreSQL or SQLite via modern non-blocking I/O polling. It **retires the requirement for Redis** merely to operate real-time WebSockets!

### Zero-JS Reactivity with broadcasts_to
Appending a single line to the Task model:
`broadcasts_to ->(task) { [task.project, :tasks] }`
orchestrates continuous reactivity. When Member A inserts or mutates a task on their workstation, Active Record lifecycle hooks dispatch a Turbo Stream payload through Solid Cable to Member B across the globe. Member B\'s browser updates its local DOM tree in single-digit milliseconds—powered by 100% server-rendered HTML!
''',
                'beginnerId': '''Bayangkan papan pengumuman bandara internasional. Ketika status pesawat berubah menjadi "Boarding", petugas tidak mendatangi satu per satu 2.000 penumpang di ruang tunggu. Layar monitor digital besar di dinding (Solid Cable & Turbo Streams) otomatis berganti warna dari kuning menjadi hijau di depan mata seluruh penumpang secara bersamaan.''',
                'beginnerEn': '''Imagine an international airport departure board. When a flight transitions to "Boarding", gate agents do not walk up to 2,000 waiting passengers individually. The master electronic flight board (Solid Cable & Turbo Streams) flashes from yellow to green before everyone's eyes simultaneously.''',
                'experimentsId': [
                    'Buka dua jendela browser berbeda pada halaman proyek yang sama, buat tugas baru di jendela A, dan saksikan tugas langsung muncul di jendela B.',
                    'Periksa tab Network (bagian WS / WebSockets) di browser DevTools untuk melihat pesan Turbo Stream yang ditransmisikan.',
                    'Gunakan method manual `task.broadcast_replace_to(...)` di konsol Rails untuk memperbarui tampilan kartu browser dari terminal.',
                ],
                'experimentsEn': [
                    'Open two browser windows displaying the same project: create a task in Window A and watch it materialize in Window B.',
                    'Audit the browser Network WS tab inspecting incoming Turbo Stream HTML fragment frames.',
                    'Execute `task.broadcast_replace_to(...)` inside `bin/rails console` updating live browser viewports from your terminal.',
                ],
                'challengeId': 'Tambahkan Turbo Stream toast notification: ketika anggota tim lain memindahkan tugas ke status "Completed", tampilkan notifikasi alert hijau di pojok kanan bawah layar seluruh anggota proyek.',
                'challengeEn': 'Add a Turbo Stream toast alert: when a team member shifts a task to "Completed", stream a green toast banner to the bottom-right corner of all online peer screens.',
                'summaryId': 'Kamu telah menguasai Turbo Streams dan Rails 8 Solid Cable WebSockets. Minggu depan kita mempelajari interaktivitas sisi klien dengan Stimulus JS.',
                'summaryEn': 'You have mastered Turbo Streams and Rails 8 Solid Cable WebSockets. Next week we explore client-side interactivity with Stimulus JS.',
            },

            # Week 6
            {
                'week': 6,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'stimulus-js-controllers',
                'titleId': 'Interaktivitas Sisi Klien: Stimulus JS, Targets, Values & Drag-and-Drop',
                'titleEn': 'Client-Side Interactivity: Stimulus JS, Targets, Values & Drag-and-Drop',
                'programId': 'Pengurut Kartu Kanban Drag-and-Drop Interaktif dengan Stimulus JS Controller',
                'programEn': 'Interactive Drag-and-Drop Kanban Task Sorter with Stimulus JS Controller',
                'language': 'javascript',
                'code': '''// app/javascript/controllers/kanban_sort_controller.js
// Stimulus JS: JavaScript Modest untuk Hotwire Stack
import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  // Targets: Elemen DOM yang dipantau oleh controller
  static targets = ['column', 'taskCard'];
  
  // Values: Konfigurasi data terikat tipe otomatis dari atribut HTML
  static values = {
    updateUrl: String,
    projectId: Number
  };

  connect() {
    console.log('[STIMULUS CONNECTED] KanbanSortController aktif pada Project #' + this.projectIdValue);
    this.initializeDragEvents();
  }

  initializeDragEvents() {
    this.taskCardTargets.forEach(card => {
      card.setAttribute('draggable', 'true');
      card.addEventListener('dragstart', this.handleDragStart.bind(this));
      card.addEventListener('dragend', this.handleDragEnd.bind(this));
    });

    this.columnTargets.forEach(col => {
      col.addEventListener('dragover', (e) => e.preventDefault());
      col.addEventListener('drop', this.handleDrop.bind(this));
    });
  }

  handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.taskId);
    event.target.classList.add('opacity-50', 'border-dashed');
  }

  handleDragEnd(event) {
    event.target.classList.remove('opacity-50', 'border-dashed');
  }

  async handleDrop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    const newStatus = event.currentTarget.dataset.columnStatus;

    console.log(`[DRAG & DROP] Tugas #${taskId} dipindahkan ke kolom status: ${newStatus}`);

    // Kirim pembaruan status ke backend Rails melalui Fetch API dengan token CSRF
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
    await fetch(`/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
        'Accept': 'text/vnd.turbo-stream.html'
      },
      body: JSON.stringify({ task: { status: newStatus } })
    });
  }
}
''',
                'objectivesId': [
                    'Memahami filosofi Stimulus JS: "The modest JavaScript framework" untuk melengkapi Hotwire HTML.',
                    'Menguasai 3 konsep inti Stimulus: Controllers (`data-controller`), Targets (`data-...-target`), dan Actions (`data-action`).',
                    'Menggunakan Stimulus Values API untuk transmisi data konfigurasi dari server ke JavaScript secara type-safe.',
                    'Membangun interaktivitas drag-and-drop canggih pada papan Kanban dengan integrasi Fetch API.',
                ],
                'objectivesEn': [
                    'Understand Stimulus JS philosophy: "The modest JavaScript framework" designed to augment server HTML.',
                    'Master the 3 core Stimulus primitives: Controllers (`data-controller`), Targets (`data-...-target`), and Actions (`data-action`).',
                    'Deploy the Stimulus Values API for type-safe data attribute synchronization.',
                    'Construct advanced drag-and-drop Kanban interactivity integrating asynchronous Fetch mutations.',
                ],
                'explanationId': '''Hotwire menangani 80% kebutuhan interaktivitas web melalui rendering HTML dari server (Turbo Drive, Turbo Frames, Turbo Streams). Namun untuk 20% sisanya—seperti interaksi drag-and-drop, animasi transisi, atau copy-to-clipboard—kita tetap membutuhkan sedikit JavaScript. Di sinilah peran **Stimulus JS**.

### Filosofi Stimulus: Modest JavaScript
Tidak seperti framework frontend raksasa yang mencoba menguasai seluruh halaman web, Stimulus tidak me-render HTML. Stimulus dirancang untuk **menghidupkan HTML yang sudah ada**:
1. **Controller**: Kelas JavaScript yang terikat pada elemen HTML via atribut `data-controller="kanban-sort"`.
2. **Targets**: Mereferensikan elemen DOM spesifik (`data-kanban-sort-target="column"`), mengeliminasi kebutuhan `document.getElementById` yang berantakan.
3. **Values API**: Menerima data dari Rails ke JavaScript secara otomatis (misal `this.projectIdValue`).

### Siklus Hidup connect() & disconnect()
Ketika Turbo Frame me-render ulang elemen HTML, Stimulus secara otomatis mendeteksi elemen baru tersebut dan memicu method `connect()`. Tidak ada lagi bug klasik event listener yang hilang saat halaman diperbarui!
''',
                'explanationEn': '''Hotwire services 80% of application interactivity via server-rendered HTML streams (Turbo Drive, Frames, Streams). For the remaining 20%—drag-and-drop canvas manipulation, ephemeral animations, clipboard integration—applications deploy **Stimulus JS**.

### The Stimulus Philosophy: Augmenting Server HTML
Rather than usurping the entire DOM tree like heavyweight client frameworks, Stimulus is engineered to **animate pre-existing server-rendered HTML**:
1. **Controllers**: JavaScript classes mapped declaratively via `data-controller="kanban-sort"`.
2. **Targets**: Exposes DOM pointers (`data-kanban-sort-target="column"`), eliminating brittle `document.querySelector` searches.
3. **Values API**: Ingests typed configuration attributes seamlessly from Rails models (`this.projectIdValue`).

### Lifecycle Hooks: connect() & disconnect()
When Turbo replaces a DOM sub-tree, Stimulus audits new nodes reactively, invoking `connect()` on attached controllers. This eradicates stale event listener bugs prevalent in unmanaged JavaScript setups.
''',
                'beginnerId': '''Bayangkan rumah pintar. Dinding, pintu, dan jendela rumah dibangun kokoh oleh tukang kayu (Rails & Turbo). Stimulus JS seperti memasang saklar lampu pintar otomatis di dinding: saklar tersebut tidak mengubah bentuk rumah, hanya bertugas menyalakan lampu ketika ada orang lewat di depannya.''',
                'beginnerEn': '''Imagine a smart home. The foundation, walls, and timber framing are built durably by master carpenters (Rails & Turbo). Stimulus JS acts like installing automated motion-detector light switches on the walls: it does not re-architect the house; it simply toggles illumination when movement is detected.''',
                'experimentsId': [
                    'Tambahkan target baru `counterTarget` dan perbarui angka jumlah tugas secara dinamis saat drag-and-drop selesai.',
                    'Gunakan Stimulus Action `data-action="click->kanban-sort#copyShareLink"` untuk fitur copy-to-clipboard.',
                    'Amati bagaimana Stimulus Controller otomatis di-reconnect ketika Turbo Frame me-replace isi kartu.',
                ],
                'experimentsEn': [
                    'Add a `counterTarget` target and update column task tallies dynamically upon drop completion.',
                    'Deploy a Stimulus Action `data-action="click->kanban-sort#copyShareLink"` implementing clipboard copying.',
                    'Observe Stimulus controllers reconnecting automatically when Turbo Frames update task cards.',
                ],
                'challengeId': 'Integrasikan pustaka JavaScript `SortableJS` di dalam Stimulus controller untuk memberikan animasi perpindahan kartu kanban yang sangat halus dan mendukung layar sentuh smartphone.',
                'challengeEn': 'Integrate `SortableJS` within the Stimulus controller provisioning smooth fluid drag animations with mobile touch support.',
                'summaryId': 'Kamu telah menguasai Stimulus JS Controllers, Targets, Values, dan drag-and-drop. Minggu depan kita mempelajari background processing dengan Rails 8 Solid Queue.',
                'summaryEn': 'You have mastered Stimulus JS Controllers, Targets, Values, and drag-and-drop. Next week we cover background processing with Rails 8 Solid Queue.',
            },

            # Week 7
            {
                'week': 7,
                'level': 'intermediate',
                'levelNameId': 'Menengah',
                'levelNameEn': 'Intermediate',
                'topicId': 'solid-queue-background-jobs',
                'titleId': 'Tugas Latar Belakang: Rails 8 Solid Queue & Active Job Asinkron',
                'titleEn': 'Background Tasks: Rails 8 Solid Queue & Asynchronous Active Job',
                'programId': 'Pengirim Rekap Mingguan Proyek Tim Asinkron dengan Solid Queue & Active Job',
                'programEn': 'Asynchronous Team Workspace Weekly Digest Job with Solid Queue & Active Job',
                'language': 'ruby',
                'code': '''# app/jobs/workspace_weekly_digest_job.rb
class WorkspaceWeeklyDigestJob < ApplicationJob
  queue_as :mailers

  # Konfigurasi Retry Otomatis jika Terjadi Kegagalan Jaringan
  retry_on Net::SMTPError, wait: :polynomially_longer, attempts: 5
  discard_on ActiveRecord::RecordNotFound

  def perform(workspace_id)
    workspace = Workspace.find(workspace_id)
    puts "[SOLID QUEUE WORKER] Memulai kompilasi rekap mingguan untuk Workspace: #{workspace.name}..."

    completed_tasks = workspace.tasks.status_completed.where("completed_at >= ?", 7.days.ago)
    overdue_tasks   = workspace.tasks.overdue

    puts " -> Tugas Selesai: #{completed_tasks.count} | Tugas Terlambat: #{overdue_tasks.count}"

    # Kirim email ke seluruh anggota tim workspace
    # WorkspaceMailer.weekly_digest(workspace, completed_tasks, overdue_tasks).deliver_now

    puts "[SOLID QUEUE SUCCESS] Rekap email mingguan berhasil dikirimkan ke anggota tim!"
  end
end

# Memicu Job dari Controller atau Console:
# 1. Jalankan asinkron sesegera mungkin:
# WorkspaceWeeklyDigestJob.perform_later(workspace.id)

# 2. Jadwalkan eksekusi di masa depan (Scheduled Recurring):
# WorkspaceWeeklyDigestJob.set(wait_until: Date.tomorrow.noon).perform_later(workspace.id)

puts "=== RAILS 8 SOLID QUEUE BACKGROUND PROCESSING ACTIVE ==="
''',
                'objectivesId': [
                    'Memahami peran Active Job sebagai layer abstraksi pemrosesan background di Ruby on Rails.',
                    'Menguasai Rails 8 Solid Queue (antrean background bawaan berbasis database berkecepatan tinggi tanpa Redis/Sidekiq).',
                    'Menggunakan metode `.perform_later()` dan scheduling waktu eksekusi dengan `.set(wait_until: ...)`.',
                    'Mengelola penanganan kegagalan dengan `retry_on` (Exponential Backoff) dan `discard_on`.',
                ],
                'objectivesEn': [
                    'Understand Active Job as the unified background processing abstraction in Ruby on Rails.',
                    'Master Rails 8 Solid Queue (high-throughput database-backed job queues replacing Redis/Sidekiq).',
                    'Deploy `.perform_later()` and schedule future execution times via `.set(wait_until: ...)`.',
                    'Govern fault tolerance using `retry_on` (Exponential Backoff) and `discard_on`.',
                ],
                'explanationId': '''Tugas-tugas berat seperti mengirim ratusan email rekap, memproses export file Excel laporan proyek, atau memanggil webhook API pihak ketiga tidak boleh membebani web server utama.

### Mengapa Rails 8 Solid Queue Menjadi Terobosan?
Selama hampir dua dekade, developer Rails terpaksa memasang Redis dan pustaka Sidekiq untuk menjalankan background jobs. Di Rails 8, framework menyertakan **Solid Queue**: sistem antrean tingkat enterprise yang ditenagai langsung oleh database relasional (PostgreSQL/MySQL/SQLite). Solid Queue menggunakan teknik FOR UPDATE SKIP LOCKED untuk memproses jutaan job per hari tanpa membebani database dan tanpa perlu mengelola server Redis terpisah.

### Ketahanan Job dengan retry_on
Jaringan internet tidak pernah 100% stabil. Dengan mendeklarasikan `retry_on Net::SMTPError, wait: :polynomially_longer, attempts: 5`, jika server email mengalami timeout sementara, Solid Queue akan menunda eksekusi dan mencoba ulang secara bertahap (5 detik, 20 detik, 60 detik) sebelum menandainya sebagai gagal.
''',
                'explanationEn': '''Heavy operations (dispatching bulk email digests, compiling multi-megabyte spreadsheet archives, querying external webhooks) must never execute synchronously within HTTP server threads.

### The Breakthrough of Rails 8 Solid Queue
For nearly two decades, Rails backends mandated provisioning Redis clusters and running Sidekiq daemons for background workloads. Rails 8 introduces **Solid Queue**: an enterprise-grade job engine executing directly atop relational databases (PostgreSQL/MySQL/SQLite). Leveraging modern `FOR UPDATE SKIP LOCKED` mechanics, Solid Queue crunches millions of jobs daily without Redis infrastructure overhead.

### Fault Tolerance with retry_on
Network connectivity is inherently unreliable. Declaring `retry_on Net::SMTPError, wait: :polynomially_longer, attempts: 5` instructs Solid Queue to pause and retry failed jobs across graduated delays (5s, 20s, 60s) before marking tasks fatal.
''',
                'beginnerId': '''Bayangkan kantor pos pengiriman surat massal. Daripada petugas loket menulis alamat dan mengecap 1.000 amplop surat satu per satu di depan Anda (membuat antrean loket macet total), petugas loket menaruh karung surat ke atas ban berjalan menuju gudang sortir otomatis (Solid Queue). Mesin sortir di gudang memproses pengiriman surat tersebut di malam hari dengan tenang.''',
                'beginnerEn': '''Imagine a high-volume postal distribution terminal. Rather than clerks individually stamping 1,000 envelopes at the service counter (freezing the customer line), the clerk deposits the mail sack onto a motorized conveyor into the automated sorting depot (Solid Queue). Sorting machinery dispatches letters overnight smoothly.''',
                'experimentsId': [
                    'Jalankan worker antrean Solid Queue di terminal menggunakan perintah `bin/jobs`.',
                    'Picu job dari konsol Rails `WorkspaceWeeklyDigestJob.perform_later(1)` dan amati proses eksekusi di log worker.',
                    'Uji coba fitur penjadwalan `perform_later` dengan opsi `wait: 10.seconds` dan perhatikan jeda eksekusi waktu.',
                ],
                'experimentsEn': [
                    'Start the Solid Queue worker supervisor via `bin/jobs` in your terminal.',
                    'Dispatch a job from `bin/rails console` via `perform_later(1)` and observe worker logs in real time.',
                    'Test scheduled execution via `wait: 10.seconds` observing the delayed execution timestamp.',
                ],
                'challengeId': 'Konfigurasikan Solid Queue recurring jobs di file `config/recurring.yml` untuk secara otomatis menjalankan pembersihan tugas-tugas yang telah diarsipkan setiap hari Minggu jam 02:00 dini hari.',
                'challengeEn': 'Configure Solid Queue recurring jobs in `config/recurring.yml` scheduling automated task archive purging every Sunday at 2:00 AM.',
                'summaryId': 'Kamu telah menguasai Active Job dan Rails 8 Solid Queue. Level 2 selesai! Di Level 3 kita mempelajari Solid Cache, Native Auth, dan Workspace Capstone.',
                'summaryEn': 'You have mastered Active Job and Rails 8 Solid Queue. Level 2 complete! Level 3 covers Solid Cache, Native Auth, and our Workspace Capstone.',
            },

            # Week 8
            {
                'week': 8,
                'level': 'advanced',
                'levelNameId': 'Lanjutan',
                'levelNameEn': 'Advanced',
                'topicId': 'solid-cache-performance',
                'titleId': 'Performa & Caching: Rails 8 Solid Cache & Russian Doll Caching',
                'titleEn': 'Performance & Caching: Rails 8 Solid Cache & Russian Doll Caching',
                'programId': 'Papan Proyek Berkecepatan Tinggi dengan Russian Doll Caching & Solid Cache',
                'programEn': 'High-Throughput Project Board with Russian Doll Caching & Solid Cache',
                'language': 'ruby',
                'code': '''# app/views/projects/show.html.erb (Russian Doll Caching Pattern)

<!-- Layer 1: Cache Seluruh Papan Proyek -->
<!-- Kunci cache otomatis berbasis [project, project.updated_at] -->
<% cache @project do %>
  <div class="project-board bg-slate-100 p-6 rounded-2xl">
    <header class="mb-6 flex justify-between">
      <h1 class="text-2xl font-bold"><%= @project.name %></h1>
      <span class="text-sm text-slate-500">Updated: <%= @project.updated_at.to_fs(:short) %></span>
    </header>

    <div class="task-grid grid grid-cols-3 gap-4">
      <% @project.tasks.each do |task| %>
        <!-- Layer 2: Nested Cache per Masing-Masing Kartu Tugas -->
        <!-- Jika hanya 1 kartu tugas yang diubah, 99 kartu lainnya TETAP DIAMBIL DARI CACHE! -->
        <% cache task do %>
          <div class="task-card bg-white p-4 rounded-xl shadow-sm">
            <h4 class="font-semibold"><%= task.title %></h4>
            <p class="text-xs text-slate-400">Status: <%= task.status.humanize %></p>
          </div>
        <% end %>
      <% end %>
    </div>
  </div>
<% end %>

# app/models/task.rb: Menjaga Konsistensi Cache Induk dengan 'touch: true'
# class Task < ApplicationRecord
#   # 'touch: true' otomatis memperbarui 'updated_at' pada Project induk setiap kali Task diedit!
#   belongs_to :project, touch: true
# end

# config/environments/production.rb:
# config.cache_store = :solid_cache_store

puts "=== RAILS 8 SOLID CACHE & RUSSIAN DOLL CACHING ACTIVE ==="
''',
                'objectivesId': [
                    'Memahami pola legendaris Russian Doll Caching (Matryoshka Caching) di Ruby on Rails.',
                    'Menguasai Rails 8 Solid Cache (penyimpanan cache persisten berbasis database berkapasitas besar tanpa batas RAM Redis).',
                    'Menggunakan opsi `belongs_to :parent, touch: true` untuk otomatisasi invalidasi cache hierarkis.',
                    'Menerapkan `strict_loading` pada Active Record untuk memblokir kueri N+1 secara otomatis saat pengujian.',
                ],
                'objectivesEn': [
                    'Master the legendary Russian Doll Caching (Matryoshka Caching) paradigm in Ruby on Rails.',
                    'Understand Rails 8 Solid Cache (terabyte-scale database-backed caching eliminating Redis RAM limits).',
                    'Deploy `belongs_to :parent, touch: true` for automated hierarchical cache invalidation.',
                    'Enforce Active Record `strict_loading` to programmatically eliminate N+1 regressions.',
                ],
                'explanationId': '''Salah satu inovasi terbesar yang diciptakan oleh David Heinemeier Hansson (DHH) di platform Basecamp adalah teknik **Russian Doll Caching** (Caching Boneka Matryoshka Rusia).

### Apa itu Russian Doll Caching?
Bayangkan sebuah proyek dengan 100 kartu tugas.
1. Layer terluar meng-cache seluruh halaman proyek: `<% cache @project do %>`.
2. Di dalamnya, setiap kartu tugas di-cache secara independen: `<% cache task do %>`.
Kunci cache otomatis dihitung berdasarkan hash timestamp `updated_at` dari model.

### Keajaiban touch: true
Ketika seorang pengguna mengubah judul pada Tugas #42:
- Dengan `belongs_to :project, touch: true`, Rails otomatis memperbarui timestamp `updated_at` pada Proyek induk.
- Pada request berikutnya, cache layer terluar invalid karena timestamp proyek berubah.
- Namun ketika me-render 100 tugas di dalamnya, **99 tugas lainnya tetap dibaca langsung dari cache HTML**, hanya Tugas #42 yang di-render ulang! Halaman proyek ter-render dalam 2 milidetik!

### Revolusi Rails 8 Solid Cache
Di masa lalu, cache disimpan di Redis yang harganya sangat mahal karena menggunakan RAM fisik. **Solid Cache** di Rails 8 menyimpan cache HTML di SSD database relasional berukuran gigabyte atau terabyte dengan skema FIFO eviction berkinerja tinggi, menghemat 80% biaya cloud hosting.
''',
                'explanationEn': '''One of the most celebrated optimizations pioneered by DHH within Basecamp is the **Russian Doll Caching** (Matryoshka Caching) pattern.

### The Russian Doll Caching Architecture
Consider a project board housing 100 task cards.
1. The outer wrapper caches the global board: `<% cache @project do %>`.
2. Nested within, each task card caches independently: `<% cache task do %>`.
Cache keys derive deterministically from the model\'s `updated_at` timestamp digest.

### The Magic of touch: true
When a team member updates Task #42:
- Declaring `belongs_to :project, touch: true` causes Rails to bump the parent Project\'s `updated_at` timestamp.
- On the subsequent request, the outer project frame key expires.
- However, when iterating through the 100 cards, **the other 99 tasks hit the HTML fragment cache instantly**, rendering only Task #42! The entire page compiles in two milliseconds!

### Rails 8 Solid Cache Advantages
Traditionally, fragment caches were hosted in volatile Redis RAM tiers with severe memory constraints. Rails 8 introduces **Solid Cache**: persisting fragments directly to SSD database storage with high-speed FIFO eviction, slashing hosting costs by 80%.
''',
                'beginnerId': '''Bayangkan boneka kayu Rusia (Matryoshka) yang di dalamnya ada boneka lebih kecil, dan di dalamnya lagi ada boneka lebih kecil lagi. Jika Anda hanya ingin mengecat ulang satu boneka terkecil di bagian terdalam, Anda tidak perlu membuang seluruh 10 boneka kayu lainnya ke tempat sampah. Anda cukup mengecat satu boneka itu dan memasukkannya kembali ke susunan boneka lama.''',
                'beginnerEn': '''Imagine a Russian Matryoshka nesting doll. An outer wooden figure encases smaller figurines inside. If you decide to repaint one miniature figurine deep within, you do not discard all ten hand-carved dolls. You repaint only that specific figurine and slide it back inside the existing master doll.''',
                'experimentsId': [
                    'Aktifkan caching di local development menggunakan perintah `bin/rails dev:cache`.',
                    'Edit salah satu tugas dan amati di log server bagaimana 99 tugas lainnya mencatat `[CACHE HIT]`.',
                    'Gunakan `strict_loading` pada model Task dan amati pengecualian `ActiveRecord::StrictLoadingViolationError` jika ada kueri N+1 yang terlewat.',
                ],
                'experimentsEn': [
                    'Toggle fragment caching in local development via `bin/rails dev:cache`.',
                    'Edit an isolated task and observe terminal logs confirming the other 99 fragments log clean `[CACHE HIT]` receipts.',
                    'Enable `strict_loading` on Task models verifying `ActiveRecord::StrictLoadingViolationError` halts un-eager loaded calls.',
                ],
                'challengeId': 'Gunakan Low-Level Cache API `Rails.cache.fetch("workspace_stats_#{workspace.id}", expires_in: 12.hours)` untuk meng-cache perhitungan metrik penyelesaian tugas tim.',
                'challengeEn': 'Deploy Low-Level Cache APIs `Rails.cache.fetch("workspace_stats_#{workspace.id}", expires_in: 12.hours)` caching aggregated team productivity metrics.',
                'summaryId': 'Kamu telah menguasai Russian Doll Caching dan Rails 8 Solid Cache. Minggu depan kita mempelajari Autentikasi Native Rails 8 dan deployment modern Kamal 2.',
                'summaryEn': 'You have mastered Russian Doll Caching and Rails 8 Solid Cache. Next week we cover Rails 8 Native Authentication and Kamal 2 deployments.',
            },

            # Week 9
            {
                'week': 9,
                'level': 'advanced',
                'levelNameId': 'Lanjutan',
                'levelNameEn': 'Advanced',
                'topicId': 'authentication-security-kamal',
                'titleId': 'Autentikasi Native Rails 8, CurrentAttributes & Deployment Kamal 2',
                'titleEn': 'Rails 8 Native Authentication, CurrentAttributes & Kamal 2 Deployment',
                'programId': 'Sistem Autentikasi Modern Bawaan Rails 8 & Konfigurasi Deployment Kamal 2',
                'programEn': 'Rails 8 Native Authentication System & Kamal 2 Deployment Configuration',
                'language': 'ruby',
                'code': '''# Rails 8: Autentikasi Native Tanpa Gem Pihak Ketiga (Selamat Tinggal Devise!)
# bin/rails generate authentication

# app/models/user.rb
class User < ApplicationRecord
  has_secure_password # Menggunakan BCrypt cryptographic hashing
  has_many :sessions, dependent: :destroy

  validates :email_address, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  normalizes :email_address, with: ->(e) { e.strip.downcase }
end

# app/models/current.rb (Thread-Isolated Context)
class Current < ActiveSupport::CurrentAttributes
  attribute :session
  attribute :user

  def user
    session&.user
  end
end

# app/controllers/concerns/authentication.rb
module Authentication
  extend ActiveSupport::Concern

  included do
    before_action :require_authentication
    helper_method :authenticated?
  end

  private

  def authenticated?
    resume_session.present?
  end

  def require_authentication
    resume_session || request_authentication
  end

  def resume_session
    Current.session ||= find_session_by_cookie
  end

  def find_session_by_cookie
    Session.find_by(id: cookies.signed[:session_id]) if cookies.signed[:session_id]
  end

  def start_new_session_for(user)
    user.sessions.create!(user_agent: request.userAgent, ip_address: request.remote_ip).tap do |session|
      Current.session = session
      cookies.signed.permanent[:session_id] = { value: session.id, httponly: true, same_site: :lax }
    end
  end
end

# config/deploy.yml (Kamal 2: Zero-Downtime Docker Deployment ke VPS Server Apa Saja)
KAMAL_CONFIG_SAMPLE = <<-'YAML'
service: tryngo-workspace-app
image: tryngo/workspace:latest
servers:
  web:
    - 192.168.1.100
proxy:
  ssl: true
  host: workspace.tryngo.io
env:
  secret:
    - RAILS_MASTER_KEY
YAML

puts "=== RAILS 8 NATIVE AUTH & KAMAL 2 DEPLOYMENT PIPELINE CONFIGURED ==="
''',
                'objectivesId': [
                    'Menguasai generator autentikasi native baru di Rails 8 (`bin/rails generate authentication`).',
                    'Memahami peran `ActiveSupport::CurrentAttributes` untuk isolasi sesi per-thread yang aman.',
                    'Menggunakan cookies terenkripsi bertanda tangan kriptografis (`cookies.signed.permanent`).',
                    'Mengonfigurasi deployment cloud tanpa downtime menggunakan **Kamal 2** langsung ke VPS Linux.',
                ],
                'objectivesEn': [
                    'Master Rails 8\'s new native authentication generator (`bin/rails generate authentication`).',
                    'Understand `ActiveSupport::CurrentAttributes` for thread-isolated session state management.',
                    'Deploy cryptographically signed HTTP-only cookies (`cookies.signed.permanent`).',
                    'Configure zero-downtime containerized deployments via **Kamal 2** targeting standard Linux VPS instances.',
                ],
                'explanationId': '''Selama lebih dari 15 tahun, hampir semua tutorial Rails mewajibkan pemasangan gem pihak ketiga yang sangat rumit: **Devise**. Devise memiliki ratusan baris kode tersembunyi yang sulit dimodifikasi.

### Autentikasi Native Rails 8
Mulai Rails 8, Rails menyertakan generator autentikasi modern bawaan:
`bin/rails generate authentication`
Generator ini menulis kode autentikasi murni yang bersih, transparan, dan dapat Anda edit langsung di dalam folder aplikasi Anda:
- Menggunakan `has_secure_password` dengan algoritma hashing BCrypt.
- Mengelola model `Session` di database sehingga pengguna dapat melihat perangkat apa saja yang sedang aktif login dan melakukan "Logout dari semua perangkat".
- Memanfaatkan **CurrentAttributes** untuk mengakses `Current.user` dari mana saja tanpa perlu mengoper variabel secara manual.

### Deployment Modern dengan Kamal 2
**Kamal 2** adalah alat orkestrasi kontainer open-source resmi dari tim Rails. Kamal memungkinkan Anda melakukan deployment aplikasi Docker ke server VPS Linux biasa (DigitalOcean, Hetzner, AWS) dengan jaminan **Zero-Downtime** tanpa memerlukan Kubernetes yang rumit.
''',
                'explanationEn': '''For over fifteen years, the Rails ecosystem leaned on heavyweight third-party authentication gems: notably **Devise**. Devise contained layers of opaque metaprogramming that complicated bespoke modifications.

### Rails 8 Native Authentication
Rails 8 ships with a native authentication generator:
`bin/rails generate authentication`
It synthesizes transparent, readable Ruby code directly into your application directory:
- Leverages `has_secure_password` backed by BCrypt cryptographic key stretching.
- Persists explicit `Session` records, enabling users to audit active login devices and revoke sessions remotely.
- Utilizes **CurrentAttributes** resolving `Current.user` cleanly across application contexts.

### Containerized Deployments via Kamal 2
**Kamal 2** represents Rails\' official open-source container orchestrator. Kamal ships Docker images to plain Linux VPS instances (Hetzner, DigitalOcean, AWS) delivering true **Zero-Downtime** rolling restarts without Kubernetes complexity.
''',
                'beginnerId': '''Bayangkan Anda membeli rumah baru. Autentikasi lama seperti menyewa perusahaan kunci asing yang kuncinya tidak boleh Anda duplikasi sendiri. Autentikasi baru Rails 8 seperti memiliki gembok brankas baja buatan sendiri dengan kunci cadangan yang tersimpan rapi di saku Anda. Dan Kamal 2 seperti helikopter kargo yang mengantar rumah Anda ke tanah kavling mana pun di dunia tanpa ada satu gelas pun yang retak saat mendarat.''',
                'beginnerEn': '''Imagine moving into a new home. Legacy auth was like hiring an external security firm whose master key you were forbidden to inspect. Rails 8 native auth is like hand-crafting your own vault deadbolt whose tumblers you understand completely. And Kamal 2 acts like a heavy-lift cargo helicopter landing your house onto any plot of land worldwide without rattling a single glass on the kitchen counter.''',
                'experimentsId': [
                    'Jalankan perintah `bin/rails generate authentication` di proyek baru dan telusuri seluruh file controller yang dihasilkan.',
                    'Coba login dari dua browser berbeda dan perhatikan bagaimana tabel `sessions` mencatat user agent dan IP address secara terpisah.',
                    'Jalankan perintah `kamal envify` untuk mengunci dan mengenkripsi environment secrets produksi.',
                ],
                'experimentsEn': [
                    'Execute `bin/rails generate authentication` inspecting the pristine generated controller code.',
                    'Log in from two separate browser windows and audit the database `sessions` table capturing unique IPs.',
                    'Execute `kamal envify` to encrypt and synchronize production environment secrets.',
                ],
                'challengeId': 'Tambahkan sistem Reset Password berbasis Token Kadaluarsa: buat model `PasswordResetToken` dengan masa berlaku 15 menit dan kirimkan tautan pemulihan via background job.',
                'challengeEn': 'Build a Token-Based Password Reset subsystem: create a 15-minute expiring `PasswordResetToken` dispatching reset links via background jobs.',
                'summaryId': 'Kamu telah menguasai Autentikasi Native Rails 8, CurrentAttributes, dan deployment dengan Kamal 2. Minggu depan adalah Capstone Final: Platform Kolaborasi Tim Real-Time Skala Penuh!',
                'summaryEn': 'You have mastered Rails 8 Native Auth, CurrentAttributes, and Kamal 2 deployments. Next week is our Final Capstone: Full-Scale Real-Time Collaborative Team Workspace Platform!',
            },

            # Week 10
            {
                'week': 10,
                'level': 'advanced',
                'levelNameId': 'Lanjutan',
                'levelNameEn': 'Advanced',
                'topicId': 'capstone-collaborative-workspace',
                'titleId': 'Capstone: Platform Kolaborasi Tim & Manajemen Proyek Real-Time Production-Ready',
                'titleEn': 'Capstone: Production-Ready Full-Scale Real-Time Collaborative Team Workspace Platform',
                'programId': 'Platform Kolaborasi Lengkap (Rails 8, Hotwire Turbo, Solid Queue, Solid Cable & Solid Cache)',
                'programEn': 'Complete Collaborative Platform (Rails 8, Hotwire Turbo, Solid Queue, Solid Cable & Solid Cache)',
                'language': 'ruby',
                'code': '''# Rails 8 Production Collaborative Team Workspace Capstone Architecture
# Menyatukan: Hotwire (Turbo & Stimulus) + Solid Stack (Queue, Cable, Cache) + Native Auth

# app/controllers/api/v1/health_controller.rb (Kubernetes / Kamal Health Probe)
class Api::V1::HealthController < ApplicationController
  skip_before_action :require_authentication

  def show
    render json: {
      status: "healthy",
      framework: "Ruby on Rails #{Rails.version}",
      ruby_version: RUBY_VERSION,
      solid_cable: "active",
      solid_queue: "active",
      solid_cache: "active",
      timestamp: Time.current.iso8601
    }, status: :ok
  end
end

# app/models/workspace.rb (Core Collaboration Aggregate)
class Workspace < ApplicationRecord
  has_many :projects, dependent: :destroy
  has_many :memberships, dependent: :destroy
  has_many :members, through: :memberships, source: :user

  # Real-Time Broadcast saat ada proyek baru di dalam workspace
  broadcasts_to ->(workspace) { [workspace, :stream] }
end

# app/models/project.rb
class Project < ApplicationRecord
  belongs_to :workspace, touch: true
  has_many :tasks, dependent: :destroy

  # Russian Doll Caching Key
  def cache_key_with_version
    "project-#{id}-#{updated_at.to_fs(:usec)}"
  end
end

puts "=== TRYNGO REAL-TIME COLLABORATIVE WORKSPACE PLATFORM READY ==="
puts "Menjalankan arsitektur Rails 8 Omakase murni tanpa dependensi Node.js atau Redis!"
''',
                'objectivesId': [
                    'Mengintegrasikan seluruh ekosistem: Rails 8, Hotwire (Turbo & Stimulus), Solid Stack (Queue, Cable, Cache), dan Kamal 2.',
                    'Membangun platform manajemen proyek real-time kolaboratif multi-pengguna tanpa SPA terpisah.',
                    'Mengonfigurasi endpoint `/api/v1/health` untuk probe liveness/readiness container produksi.',
                    'Menyiapkan aplikasi monolitik modern berperforma tinggi yang siap diproduksi di server VPS mandiri.',
                ],
                'objectivesEn': [
                    'Integrate the complete ecosystem: Rails 8, Hotwire (Turbo & Stimulus), Solid Stack (Queue, Cable, Cache), and Kamal 2.',
                    'Build a collaborative multi-user project management platform with zero SPA complexity.',
                    'Configure `/api/v1/health` endpoints for container production liveness probes.',
                    'Ship an enterprise-grade modern monolith ready for deployment on autonomous VPS instances.',
                ],
                'explanationId': '''Selamat! Anda telah mencapai proyek Capstone akhir kurikulum Ruby on Rails 8. Platform ini menyatukan semua inovasi terbesar Rails 8 ke dalam satu aplikasi kolaborasi tim real-time yang sangat responsif, elegan, dan siap diproduksi.

### Keunggulan Arsitektur "The One Person Framework"
DHH menyebut Rails sebagai **"The One Person Framework"**: sebuah teknologi yang memungkinkan satu orang engineer membangun produk berskala jutaan pengguna tanpa membutuhkan tim terpisah untuk DevOps, backend API, dan frontend React.
- **Hotwire**: Menghadirkan kecepatan 60 FPS tanpa SPA JavaScript yang berat.
- **The Solid Stack**: Menghilangkan ketergantungan Redis. Seluruh WebSockets (Solid Cable), Antrean Background (Solid Queue), dan Caching (Solid Cache) berjalan di atas database relasional PostgreSQL Anda dengan efisiensi puncak.
- **Kamal 2**: Menyebarkan aplikasi ke server produksi dalam hitungan menit dengan satu perintah `kamal deploy`.
''',
                'explanationEn': '''Congratulations! You have reached the Capstone project. This application synthesizes modern Rails 8 paradigms into a hyper-responsive, production-ready real-time collaborative workspace platform.

### The "One Person Framework" Advantage
DHH designates Rails as **"The One Person Framework"**: a stack empowering a solo software engineer to author products serving millions of users without requiring segregated DevOps, backend JSON, and client React teams.
- **Hotwire**: Delivers 60 FPS client responsiveness without bloated JavaScript SPAs.
- **The Solid Stack**: Eradicates Redis dependencies. WebSockets (Solid Cable), Background Jobs (Solid Queue), and Caching (Solid Cache) run directly atop PostgreSQL with extreme efficiency.
- **Kamal 2**: Deploys containerized releases directly to Linux VPS targets within minutes via `kamal deploy`.
''',
                'beginnerId': '''Proyek ini ibarat kantor pusat kerja bersama digital (Co-Working Space Virtual). Di meja kerja tim, setiap kali ada anggota tim yang menyelesaikan tugas atau membuat proyek baru, perubahan tersebut langsung muncul di layar monitor seluruh anggota tim tanpa jeda (Hotwire & Solid Cable), surat laporan dikirimkan otomatis oleh kurir di malam hari (Solid Queue), dan gedung kantor ini bisa dibangun di kota mana pun di dunia hanya dengan satu kali menekan tombol (Kamal 2).''',
                'beginnerEn': '''This project mirrors a digital collaborative co-working hub. At the shared team workspace, whenever a colleague finishes a task or creates a project, updates materialize across everyone's screens with zero latency (Hotwire & Solid Cable), reports compile overnight automatically (Solid Queue), and the entire facility deploys to any server worldwide with a single command (Kamal 2).''',
                'experimentsId': [
                    'Jalankan server aplikasi menggunakan `bin/dev` (menjalankan Puma webserver, Solid Queue worker, dan Tailwind compiler).',
                    'Buka endpoint `/api/v1/health` di browser dan amati status kesehatan seluruh subsistem Solid Stack.',
                    'Uji coba pembuatan tugas secara konkuren dari dua sesi pengguna yang berbeda.',
                ],
                'experimentsEn': [
                    'Launch the local development environment via `bin/dev` (orchestrating Puma, Solid Queue, and Tailwind).',
                    'Navigate to `/api/v1/health` auditing the live operational status of all Solid subsystems.',
                    'Test concurrent task mutations across dual authenticated user sessions.',
                ],
                'challengeId': 'Tambahkan modul Activity Feed: buat model `ActivityAudit` yang secara otomatis mencatat seluruh mutasi status tugas dan menyiarkannya ke tab log aktivitas proyek secara real-time.',
                'challengeEn': 'Add an Activity Feed module: create an `ActivityAudit` model capturing task transitions and streaming them to a live activity log in real time.',
                'summaryId': 'Selamat! Kamu telah menyelesaikan seluruh kurikulum Ruby on Rails 8 dari nol hingga platform kolaborasi tim real-time berskala produksi!',
                'summaryEn': 'Congratulations! You have completed the entire Ruby on Rails 8 curriculum from zero to an enterprise production real-time collaborative workspace platform!',
            },
        ]
    }
