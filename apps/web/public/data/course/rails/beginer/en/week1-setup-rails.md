# Setup & Rails Installation

> **Kategori:** Ruby on Rails | **Level:** Beginner | **Minggu 1:** Setup & Rails Installation

## Learning Objectives

- Install Ruby and Rails (Rails Guides: Getting Started)
- Understand Rails folder structure: app, config, db, test
- Rails CLI: server, console, generate, db:migrate
- Gemfile: dependency management with Bundler
- Convention over Configuration: Rails philosophy

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
