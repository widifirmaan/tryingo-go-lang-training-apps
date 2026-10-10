# Modern Rails 8: Konvensi Omakase, Propshaft & Struktur Proyek

> **Kategori:** Ruby on Rails 8 | **Level:** Pemula | **Minggu 1:** Modern Rails 8: Konvensi Omakase, Propshaft & Struktur Proyek
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami filosofi "Convention over Configuration" dan "The Rails Doctrine" (Omakase Stack).
- Menguasai struktur direktori Rails 8 dan pipeline aset modern Propshaft (tanpa Node.js bundler).
- Mendefinisikan nested RESTful resources dengan opsi `shallow: true`.
- Mengotomatisasi pembuatan slug URL menggunakan callback model `before_validation`.

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **Ruby LSP (Shopify)** (`shopify.ruby-lsp`): Server bahasa Ruby resmi dengan format, definisi, dan diagnostics

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension shopify.ruby-lsp
```

---

### 2. Instalasi Runtime & Dependency (Ruby 3.3+ & Bundler)
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
winget install RubyInstallerTeam.RubyWithDevKit.3.3
```

**macOS (Terminal / Homebrew):**
```bash
brew install ruby && gem install bundler
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install -y ruby-full build-essential && sudo gem install bundler
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
ruby -v && bundle -v
```

Output yang diharapkan:
```output
ruby 3.3.x
Bundler version 2.x
```

> 💡 **Tips Prasyarat:** Di Linux/macOS, manfaatkan `rbenv` atau `asdf` untuk mengelola beberapa versi Ruby.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
gem install rails
rails new my-rails-app --api
cd my-rails-app
```
- **Keterangan:** Menyiapkan aplikasi Rails mode API ringan tanpa aset frontend berlebih.
- **Pindah ke direktori project:**
```bash
cd my-rails-app
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
bin/rails server
```
Akses di browser atau terminal: `http://localhost:3000`

> ℹ️ Server Puma aktif di port 3000.

**File Titik Masuk Utama (`config/routes.rb`):**
```ruby
Rails.application.routes.draw do
  get "/api/status", to: proc { [200, { "Content-Type" => "application/json" }, ['{"status":"ok","framework":"Ruby on Rails 7"}']] }
end
```
Definisi route langsung di config/routes.rb.

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-rails-app/
├── app/
│   ├── controllers/     # Controller penangan request
│   └── models/          # Model ActiveRecord
├── config/
│   ├── routes.rb        # Pemetaan URL routes
│   └── database.yml     # Konfigurasi database
├── db/
│   └── migrate/         # Migrasi ActiveRecord
├── Gemfile              # Daftar gem dependensi
└── bin/rails            # Executable CLI Rails
```
Arsitektur MVC Convention over Configuration khas Rails.

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan perintah `bin/rails generate scaffold Product name:string price:decimal` untuk men-generate seluruh API CRUD dalam 2 detik.
- Gunakan `bin/rails console` untuk menguji query ActiveRecord langsung di terminal.

---

## Program: Domain Model Workspace Proyek Kolaboratif dengan Konvensi Rails 8

```ruby
# config/routes.rb (Rails 8: Ramping & Elegan)
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
```

---

## Konsep Kunci

Ruby on Rails adalah framework web revolusioner yang memelopori banyak konsep web modern (seperti MVC, RESTful conventions, dan migrations). Di versi **Rails 8**, framework ini kembali ke akarnya yang paling elegan dengan menghadirkan filosofi **"Omakase"**: seluruh komponen terbaik (database, queue, cache, asset pipeline) sudah dipilihkan dan disajikan langsung tanpa perlu konfigurasi rumit.

### Convention over Configuration (CoC)
Di Rails, Anda tidak perlu mengonfigurasi nama tabel atau primary key. Jika nama model Anda adalah `Workspace`, Rails secara otomatis mengetahui bahwa tabelnya di PostgreSQL bernama `workspaces`, foreign key-nya bernama `workspace_id`, dan controller-nya bernama `WorkspacesController`.

### Propshaft: Selamat Tinggal Node.js Build Tool
Di Rails 8, developer tidak lagi dipusingkan oleh Webpack atau Node.js build configuration yang membengkak. **Propshaft** adalah asset pipeline generasi baru yang memanfaatkan protokol HTTP/2 browser modern untuk memuat file CSS dan JS murni secara instan tanpa proses kompilasi bundler yang lambat.


---

---

## Penjelasan untuk Pemula

Bayangkan memesan hidangan Omakase di restoran sushi Jepang ternama. Anda tidak perlu repot memilih bumbu atau cara memasak ikan sendiri; koki master terbaik sudah menyajikan sushi paling lezat dan sempurna di atas meja Anda. Rails 8 adalah Omakase untuk web development: semua perkakas terbaik sudah disiapkan dan langsung pas satu sama lain.

## Eksperimen

- Jalankan perintah `bin/rails routes` di terminal untuk melihat seluruh rute RESTful yang dihasilkan.
- Gunakan konsol interaktif `bin/rails console` (Pry) untuk membuat record Workspace baru di memori.
- Uji coba fitur `shallow: true` dan amati bagaimana rute task menjadi `/projects/:id/tasks` yang bersih.

---

## Tantangan

Gunakan generator Rails `bin/rails generate model Task title:string status:integer priority:integer due_date:date` dan amati migration yang otomatis dihasilkan.

---

## Model Mental & Diagram Alur Visual

```diagram
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
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `resources :articles do ... end`
- **Fungsi Utama:** Resourceful REST Routing Rails.
- **Parameter / Atribut:** `Resource name, options block`.
- **Perilaku & Efek Sistem:** Mendefinisikan 7 rute RESTful standar (index, show, new, create, edit, update, destroy) dalam 1 baris..
- **Contoh Penggunaan Praktis:**
```ruby
Rails.application.routes.draw do
  resources :products
  root 'products#index'
end
```
- **Hasil Output yang Diharapkan:**
```output
7 rute CRUD standar otomatis aktif
```

### 2. `class Product < ApplicationRecord`
- **Fungsi Utama:** Model ActiveRecord dengan ORM Canggih.
- **Parameter / Atribut:** `Validations, Associations (has_many, belongs_to)`.
- **Perilaku & Efek Sistem:** Memetakan tabel database ke objek Ruby lengkap dengan validasi data dan relasi otomatis..
- **Contoh Penggunaan Praktis:**
```ruby
class Product < ApplicationRecord
  has_many :reviews, dependent: :destroy
  validates :title, presence: true, length: { minimum: 3 }
  validates :price, numericality: { greater_than_or_equal_to: 0 }
end
```
- **Hasil Output yang Diharapkan:**
```output
Model Product aktif dengan validasi integritas data
```

### 3. `params.require(:product).permit(:title, :price)`
- **Fungsi Utama:** Strong Parameters keamanan mass assignment.
- **Parameter / Atribut:** `Model key, permitted attributes list`.
- **Perilaku & Efek Sistem:** Menolak atribut berbahaya yang dikirimkan peretas sebelum disimpan ke dalam database..
- **Contoh Penggunaan Praktis:**
```ruby
def product_params
  params.require(:product).permit(:title, :price, :in_stock)
end
```
- **Hasil Output yang Diharapkan:**
```output
Hanya kolom yang diizinkan yang dapat disimpan
```

### 4. `render json: @products / render :index`
- **Fungsi Utama:** Rendering format respons fleksibel.
- **Parameter / Atribut:** `Output format (json, html, turbo_stream)`.
- **Perilaku & Efek Sistem:** Menyajikan data dalam format JSON untuk API atau rendering template ERB untuk antarmuka web..
- **Contoh Penggunaan Praktis:**
```ruby
def index
  @products = Product.all
  render json: @products
end
```
- **Hasil Output yang Diharapkan:**
```output
Array objek produk disajikan sebagai JSON murni
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. N+1 Queries pada Active Record
- **Gejala / Masalah:** Me-render tampilan tabel memicu puluhan query SQL tambahan yang memperlambat respon.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan method `includes(:relation)` pada controller query untuk melakukan eager loading.

### 2. Migrasi Database yang Mengubah Kolom Tanpa Reversibility
- **Gejala / Masalah:** Perintah `rails db:rollback` gagal dieksekusi saat proses deployment dibatalkan.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan method migrasi eksplisit `up` dan `down` jika operasi kolom tidak dapat dibalik secara otomatis.

### 3. Menyimpan Credential Sensitif di Direktori Publik
- **Gejala / Masalah:** API key pihak ketiga bocor ke publik melalui repositori git.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Manfaatkan sistem enkripsi `rails credentials:edit` untuk menyimpan API key produksi.

---

## Ringkasan

Kamu telah menguasai konvensi Rails 8, Propshaft, dan nested resources. Minggu depan kita masuk ke Active Record associations, scopes, dan validasi.
