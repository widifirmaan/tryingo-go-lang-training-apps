# Action Controller: Strong Parameters, Flash Alerts & RESTful Workflows

> **Kategori:** Ruby on Rails 8 | **Level:** Beginner | **Minggu 3:** Action Controller: Strong Parameters, Flash Alerts & RESTful Workflows
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master the 7 canonical RESTful Rails controller actions: `index`, `show`, `new`, `create`, `edit`, `update`, `destroy`.
- Shield actions against Mass Assignment exploits via **Strong Parameters** (`require` and `permit`).
- Deploy `before_action` lifecycle filters enforcing DRY (Don't Repeat Yourself) design.
- Understand semantic HTTP status codes (`:unprocessable_entity`, `:see_other`) mandatory for Hotwire Turbo integration.

---

## Program: RESTful Task Controller with Strong Parameters Security Defense

```ruby
# app/controllers/tasks_controller.rb
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
```

---

## Key Concepts

In early web frameworks, models ingested raw parameters via `User.create(params[:user])`. This exposed catastrophic **Mass Assignment** exploits: malicious actors injected `admin=true` into registration payloads, escalating privileges to Super Admin.

### Absolute Defense: Strong Parameters
Rails Action Controller enforces **Strong Parameters**:
`params.require(:task).permit(:title, :status, :priority)`
Only attributes explicitly whitelisted within `.permit()` pass to model layers; foreign parameters are discarded automatically.

### Semantic HTTP Status Codes for Hotwire Turbo
When form submissions fail validation, controllers must yield `status: :unprocessable_entity` (HTTP 422). Returning HTTP 200 confuses Hotwire Turbo, preventing error banners from rendering. Similarly, deletion redirects require `status: :see_other` (HTTP 303) ensuring smooth frame navigation.


---

---

## Beginner Friendly Explanation

Imagine ordering takeout via a delivery app. Strong Parameters act like a checkout clerk auditing order slips: if a patron sneakily scribbled "Include Free Gold Bar" at the bottom, the clerk crosses out the unauthorized addition, packing only authorized food items into the delivery bag.

## Experiments

- Submit a POST payload with an unpermitted `is_admin: true` parameter verifying it is stripped by Strong Parameters.
- Omit `status: :unprocessable_entity` during validation failures and observe Hotwire failing to update the DOM.
- Deploy `flash.now[:alert]` for ephemeral error messages rendered during the active request.

---

## Challenge

Author nested strong parameters permitting task instantiation alongside multiple uploaded document attachments via Active Storage (`permit(:title, documents: [])`).

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
```text
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
```text
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
```text
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
```text
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

You have mastered Action Controller, Strong Parameters, and HTTP Status Codes for Turbo. Next week we explore Hotwire Turbo Drive and Turbo Frames.
