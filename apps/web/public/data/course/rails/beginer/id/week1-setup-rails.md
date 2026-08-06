# Setup & Instalasi Rails

> **Kategori:** Ruby on Rails | **Level:** Pemula | **Minggu 1:** Setup & Instalasi Rails

## Tujuan Pembelajaran

- Install Ruby dan Rails (Rails Guides: Getting Started)
- Memahami struktur folder Rails: app, config, db, test
- Rails CLI: server, console, generate, db:migrate
- Gemfile: dependency management dengan Bundler
- Convention over Configuration: filosofi Rails

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
puts "rails new name      — Create new project"
puts "rails server        — Start dev server (bin/rails s)"
puts "rails console       — Interactive console (bin/rails c)"
puts "rails generate      — Generate code (bin/rails g)"
puts "rails db:migrate    — Run migrations"
puts "rails routes        — List all routes"
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
