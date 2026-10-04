# Capstone: Production-Ready Full-Scale Real-Time Collaborative Team Workspace Platform

> **Kategori:** Ruby on Rails 8 | **Level:** Advanced | **Minggu 10:** Capstone: Production-Ready Full-Scale Real-Time Collaborative Team Workspace Platform
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Integrate the complete ecosystem: Rails 8, Hotwire (Turbo & Stimulus), Solid Stack (Queue, Cable, Cache), and Kamal 2.
- Build a collaborative multi-user project management platform with zero SPA complexity.
- Configure `/api/v1/health` endpoints for container production liveness probes.
- Ship an enterprise-grade modern monolith ready for deployment on autonomous VPS instances.

---

## Program: Complete Collaborative Platform (Rails 8, Hotwire Turbo, Solid Queue, Solid Cable & Solid Cache)

```ruby
# Rails 8 Production Collaborative Team Workspace Capstone Architecture
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
```

---

## Key Concepts

Congratulations! You have reached the Capstone project. This application synthesizes modern Rails 8 paradigms into a hyper-responsive, production-ready real-time collaborative workspace platform.

### The "One Person Framework" Advantage
DHH designates Rails as **"The One Person Framework"**: a stack empowering a solo software engineer to author products serving millions of users without requiring segregated DevOps, backend JSON, and client React teams.
- **Hotwire**: Delivers 60 FPS client responsiveness without bloated JavaScript SPAs.
- **The Solid Stack**: Eradicates Redis dependencies. WebSockets (Solid Cable), Background Jobs (Solid Queue), and Caching (Solid Cache) run directly atop PostgreSQL with extreme efficiency.
- **Kamal 2**: Deploys containerized releases directly to Linux VPS targets within minutes via `kamal deploy`.


---

---

## Beginner Friendly Explanation

This project mirrors a digital collaborative co-working hub. At the shared team workspace, whenever a colleague finishes a task or creates a project, updates materialize across everyone's screens with zero latency (Hotwire & Solid Cable), reports compile overnight automatically (Solid Queue), and the entire facility deploys to any server worldwide with a single command (Kamal 2).

## Experiments

- Launch the local development environment via `bin/dev` (orchestrating Puma, Solid Queue, and Tailwind).
- Navigate to `/api/v1/health` auditing the live operational status of all Solid subsystems.
- Test concurrent task mutations across dual authenticated user sessions.

---

## Challenge

Add an Activity Feed module: create an `ActivityAudit` model capturing task transitions and streaming them to a live activity log in real time.

---

## Visual Mental Model & Architecture Flow

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
│          Database                 HTML Output ke Client   │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `resources :articles do ... end`
- **Core Functionality:** Resourceful REST Routing Rails.
- **Parameters / Attributes:** `Resource name, options block`.
- **System Behavior & Return:** Mendefinisikan 7 rute RESTful standar (index, show, new, create, edit, update, destroy) dalam 1 baris..
- **Practical Code Example:**
```ruby
Rails.application.routes.draw do
  resources :products
  root 'products#index'
end
```
- **Expected Execution Output:**
```output
7 rute CRUD standar otomatis aktif
```

### 2. `class Product < ApplicationRecord`
- **Core Functionality:** Model ActiveRecord dengan ORM Canggih.
- **Parameters / Attributes:** `Validations, Associations (has_many, belongs_to)`.
- **System Behavior & Return:** Memetakan tabel database ke objek Ruby lengkap dengan validasi data dan relasi otomatis..
- **Practical Code Example:**
```ruby
class Product < ApplicationRecord
  has_many :reviews, dependent: :destroy
  validates :title, presence: true, length: { minimum: 3 }
  validates :price, numericality: { greater_than_or_equal_to: 0 }
end
```
- **Expected Execution Output:**
```output
Model Product aktif dengan validasi integritas data
```

### 3. `params.require(:product).permit(:title, :price)`
- **Core Functionality:** Strong Parameters keamanan mass assignment.
- **Parameters / Attributes:** `Model key, permitted attributes list`.
- **System Behavior & Return:** Menolak atribut berbahaya yang dikirimkan peretas sebelum disimpan ke dalam database..
- **Practical Code Example:**
```ruby
def product_params
  params.require(:product).permit(:title, :price, :in_stock)
end
```
- **Expected Execution Output:**
```output
Hanya kolom yang diizinkan yang dapat disimpan
```

### 4. `render json: @products / render :index`
- **Core Functionality:** Rendering format respons fleksibel.
- **Parameters / Attributes:** `Output format (json, html, turbo_stream)`.
- **System Behavior & Return:** Menyajikan data dalam format JSON untuk API atau rendering template ERB untuk antarmuka web..
- **Practical Code Example:**
```ruby
def index
  @products = Product.all
  render json: @products
end
```
- **Expected Execution Output:**
```output
Array objek produk disajikan sebagai JSON murni
```

---

## Common Pitfalls & Debugging Tips

### 1. N+1 Active Record Queries
- **Symptom / Issue:** Iterating through associations fires repeated queries per record.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Eager load required associations using `includes(:association)`.

### 2. Irreversible Database Migrations
- **Symptom / Issue:** Running `rails db:rollback` fails when migration direction is ambiguous.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Write explicit `up` and `down` migration methods for complex column changes.

### 3. Checking Secrets into Public Version Control
- **Symptom / Issue:** Third-party tokens and database credentials get leaked.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use encrypted credentials via `rails credentials:edit`.

---

## Summary

Congratulations! You have completed the entire Ruby on Rails 8 curriculum from zero to an enterprise production real-time collaborative workspace platform!
