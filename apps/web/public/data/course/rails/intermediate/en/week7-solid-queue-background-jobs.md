# Background Tasks: Rails 8 Solid Queue & Asynchronous Active Job

> **Kategori:** Ruby on Rails 8 | **Level:** Intermediate | **Minggu 7:** Background Tasks: Rails 8 Solid Queue & Asynchronous Active Job
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Active Job as the unified background processing abstraction in Ruby on Rails.
- Master Rails 8 Solid Queue (high-throughput database-backed job queues replacing Redis/Sidekiq).
- Deploy `.perform_later()` and schedule future execution times via `.set(wait_until: ...)`.
- Govern fault tolerance using `retry_on` (Exponential Backoff) and `discard_on`.

---

## Program: Asynchronous Team Workspace Weekly Digest Job with Solid Queue & Active Job

```ruby
# app/jobs/workspace_weekly_digest_job.rb
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
```

---

## Key Concepts

Heavy operations (dispatching bulk email digests, compiling multi-megabyte spreadsheet archives, querying external webhooks) must never execute synchronously within HTTP server threads.

### The Breakthrough of Rails 8 Solid Queue
For nearly two decades, Rails backends mandated provisioning Redis clusters and running Sidekiq daemons for background workloads. Rails 8 introduces **Solid Queue**: an enterprise-grade job engine executing directly atop relational databases (PostgreSQL/MySQL/SQLite). Leveraging modern `FOR UPDATE SKIP LOCKED` mechanics, Solid Queue crunches millions of jobs daily without Redis infrastructure overhead.

### Fault Tolerance with retry_on
Network connectivity is inherently unreliable. Declaring `retry_on Net::SMTPError, wait: :polynomially_longer, attempts: 5` instructs Solid Queue to pause and retry failed jobs across graduated delays (5s, 20s, 60s) before marking tasks fatal.


---

---

## Beginner Friendly Explanation

Imagine a high-volume postal distribution terminal. Rather than clerks individually stamping 1,000 envelopes at the service counter (freezing the customer line), the clerk deposits the mail sack onto a motorized conveyor into the automated sorting depot (Solid Queue). Sorting machinery dispatches letters overnight smoothly.

## Experiments

- Start the Solid Queue worker supervisor via `bin/jobs` in your terminal.
- Dispatch a job from `bin/rails console` via `perform_later(1)` and observe worker logs in real time.
- Test scheduled execution via `wait: 10.seconds` observing the delayed execution timestamp.

---

## Challenge

Configure Solid Queue recurring jobs in `config/recurring.yml` scheduling automated task archive purging every Sunday at 2:00 AM.

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

You have mastered Active Job and Rails 8 Solid Queue. Level 2 complete! Level 3 covers Solid Cache, Native Auth, and our Workspace Capstone.
