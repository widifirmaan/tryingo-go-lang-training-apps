## Kenapa Materi Ini Penting

Rails melegenda konvensi-diatas-konfigurasi: satu perintah generator sudah menghasilkan CRUD lengkap. Marks of productive developer: fokus pada produk, bukan menyiapkan wiring. Dipakai GitHub, Shopify, dan Airbnb dulu.

Program latihan: *"Project Pertama"*. Jalankan kode di Playground untuk mempelajari alur kerjanya.


## Tujuan Pembelajaran

- Install Ruby dan Rails (Rails Guides: Getting Started)
- Memahami struktur folder Rails: app, config, db, test
- Rails CLI: server, console, generate, db:migrate
- Gemfile: dependency management dengan Bundler
- Convention over Configuration: filosofi Rails


## Fondasi: Sebelum Menulis Kode

Panduan dasar berikut merangkum konsep pemrograman inti yang berlaku universal.

- **File & folder = tempat program tinggal.** Program hanyalah teks biasa yang disimpan dalam file (contoh: `belajar.md`). File punya **ekstensi** yang menunjukkan bahasanya: `.md`, `.go`, `.py`, `.html`. Satu folder berisi semua file program disebut **project**.
- **Terminal / command line.** Jendela hitam tempat kita mengetik perintah teks: `cd folder` (pindah folder), `ls` / `dir` (lihat isi folder), `go run main.go` (jalankan program). Program dijalankan dari folder tempat file-nya berada.
- **Compiled vs interpreted.** Bahasa **compiled** (Go, Rust, C#) diterjemahkan dulu seluruh program menjadi instruksi mesin sebelum jalan - cepat, tapi harus "di-build" dulu. Bahasa **interpreted** (Python, PHP, JavaScript) dieksekusi baris per baris langsung - cocok untuk belajar & prototipe cepat. Playground di website ini mengeksekusi kode **di browser**, jadi Anda bisa mencoba materi tanpa install apa pun.
- **Statically typed vs dynamically typed.** Bahasa **statically typed** (Go, Rust, TypeScript) mewajibkan/mengecek tipe data (angka, teks) saat ditulis - error tertangkap lebih awal. Bahasa **dynamically typed** (Python, PHP, JavaScript) cek tipe saat program berjalan - lebih longgar, error baru muncul saat runtime.
- **Cara membaca pesan error.** Baca baris paling bawah dulu: jenis error + penjelasan singkatnya, lalu cari **nomor baris** yang disebut. Error bukan tragis - itulah cara komputer memberi tahu ada yang perlu diperbaiki.
- **REPL / playground.** REPL (Read-Eval-Print Loop) = "kalkulator" kode: ketik satu baris, langsung terlihat hasilnya. Tombol **Coba di Playground** di setiap blok kode memungkinkan Anda mengubah kode dan menjalankannya langsung - inilah cara tercepat belajar: ubah sedikit, jalankan, lihat bedanya.

> **Catatan penting:** playground di browser memiliki batasan - tidak menerima input keyboard interaktif (stdin). Jika sebuah tantangan meminta "input dari pengguna", cukup tulis nilainya langsung ke variabel (contoh: `let nama = "Budi"`; `rupiah = 250000`), lalu jalankan.

---

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

> **Coba langsung di browser tanpa instalasi.** Semua blok kode dapat dijalankan langsung di Playground.

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Instalasi Runtime & Dependency (Ruby 3.3+ & Bundler)
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

> **Tips Prasyarat:** Di Linux/macOS, manfaatkan `rbenv` atau `asdf` untuk mengelola beberapa versi Ruby.

---

### 2. Inisialisasi Project Kosong (Scaffolding)
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

### 3. Menjalankan Server Lokal & File Titik Masuk Pertama
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

### 4. Struktur Direktori Proyek Baru
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

### 5. Tips & Best Practice untuk Pemula
- Gunakan perintah `bin/rails generate scaffold Product name:string price:decimal` untuk men-generate seluruh API CRUD dalam 2 detik.
- Gunakan `bin/rails console` untuk menguji query ActiveRecord langsung di terminal.

---

## Program: Project Pertama

```ruby
#!/usr/bin/env ruby
# Ruby simulation
puts "=== Ruby on Rails Setup ==="
puts "gem install rails"
puts "rails new my_app"
puts "cd my_app"
puts "rails server"
puts "Server running on http://localhost:3000"
puts ""
puts "=== Rails Directory Structure ==="
dirs = [
    "app/",
    "  controllers/",
    "  models/",
    "  views/",
    "  helpers/",
    "  assets/",
    "config/",
    "  routes.rb",
    "  database.yml",
    "db/",
    "  migrate/",
    "  seeds.rb",
    "test/",
    "Gemfile",
]
dirs.each { |d| puts "  #{d}" }
puts ""
puts "=== Key Commands ==="
puts "rails new name      - Create new project"
puts "rails server        - Start dev server (bin/rails s)"
puts "rails console       - Interactive console (bin/rails c)"
puts "rails generate      - Generate code (bin/rails g)"
puts "rails db:migrate    - Run migrations"
puts "rails routes        - List all routes"
puts ""
puts "=== Gemfile ==="
puts "gem 'rails', '~> 7.0'"
puts "gem 'sqlite3'         # Database"
puts "gem 'puma'            # Server"
puts "gem 'devise'          # Auth (later)"
puts "bundle install"

```

---

## Konsep Kunci

### Instalasi Rails
`gem install rails`, lalu `rails new nama_project`.

### Struktur Folder
- `app/` - MVC (controllers, models, views)
- `config/` - routes, database, environment
- `db/` - migrations, seeds
- `test/` - test files

### CLI
`rails server` (bin/rails s), `rails console` (bin/rails c), `rails generate`.

### Gemfile
Define dependencies. `bundle install` untuk install.

### Convention over Configuration
Rails mengikuti konvensi: model `Post` -> tabel `posts` -> controller `PostsController`.

---

## Eksperimen

- Install Rails dan buat project baru
- Jelajahi folder app/ dan lihat isinya
- Coba rails console untuk eksplorasi
- Buat route sederhana di routes.rb
- Pindah ke config/ dan lihat konfigurasi

---

## Tantangan

Buat project Rails baru dengan 3 routes: home (/), about (/about), contact (/contact). Tampilkan teks berbeda di setiap route.

---

## Ringkasan

Minggu 1 dari 12: **Setup & Instalasi Rails** (Level: Pemula). Fondasi Rails dimulai. Minggu depan: **MVC Architecture**.
