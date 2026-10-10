# Setup & Rails Installation

> **Kategori:** Ruby on Rails | **Level:** Beginner | **Minggu 1:** Setup & Rails Installation

## Learning Objectives

- Install Ruby and Rails (Rails Guides: Getting Started)
- Understand Rails folder structure: app, config, db, test
- Rails CLI: server, console, generate, db:migrate
- Gemfile: dependency management with Bundler
- Convention over Configuration: Rails philosophy

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **Ruby LSP (Shopify)** (`shopify.ruby-lsp`): Official Shopify Ruby LSP with formatting and jump to definition

Or install all recommended extensions at once via terminal:
```bash
code --install-extension shopify.ruby-lsp
```

---

### 2. Runtime & Dependency Installation (Ruby 3.3+ & Bundler)
Make sure the required runtime or SDK is installed on your machine:

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

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
ruby -v && bundle -v
```

Expected output:
```output
ruby 3.3.x
Bundler version 2.x
```

> 💡 **Prerequisite Note:** Use `rbenv` or `asdf` on macOS/Linux for seamless version switching.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
gem install rails
rails new my-rails-app --api
cd my-rails-app
```
- **Details:** Scaffolds a lean API-only Rails application without bloated front-end assets.
- **Navigate to the project directory:**
```bash
cd my-rails-app
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
bin/rails server
```
Open in browser or terminal: `http://localhost:3000`

> ℹ️ Puma web server launches at port 3000.

**Initial Entry File (`config/routes.rb`):**
```ruby
Rails.application.routes.draw do
  get "/api/status", to: proc { [200, { "Content-Type" => "application/json" }, ['{"status":"ok","framework":"Ruby on Rails 7"}']] }
end
```
Direct route declaration in config/routes.rb.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

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
Convention over Configuration MVC architecture of Rails.

---

### 6. Beginner Tips & Best Practices
- Run `bin/rails generate scaffold Product name:string price:decimal` to generate full CRUD APIs in 2 seconds.
- Launch `bin/rails console` to query ActiveRecord models interactively.

---

## Program: First Project

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

## Key Concepts

### Rails Installation
`gem install rails`, then `rails new name`.

### Folder Structure
- `app/` - MVC
- `config/` - routes, database
- `db/` - migrations, seeds
- `test/` - test files

### CLI
`rails server`, `rails console`, `rails generate`.

### Gemfile
Defines dependencies. `bundle install` to install.

### Convention over Configuration
Rails follows conventions: model `Post` -> table `posts` -> controller `PostsController`.

---

## Experiments

- Install Rails and create new project
- Explore app/ folder and its contents
- Try rails console for exploration
- Create simple route in routes.rb
- Navigate config/ and view configuration

---

## Challenge

Create a new Rails project with 3 routes: home (/), about (/about), contact (/contact). Display different text on each route.

---

## Summary

Week 1 of 12: **Setup & Rails Installation** (Level: Beginner). Rails foundation begins. Next week: **MVC Architecture**.
