# Modern Frontend Without SPAs: Hotwire Turbo Drive & Turbo Frames

> **Kategori:** Ruby on Rails 8 | **Level:** Beginner | **Minggu 4:** Modern Frontend Without SPAs: Hotwire Turbo Drive & Turbo Frames
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand the Hotwire philosophy: delivering SPA responsiveness without client-side JavaScript complexity.
- Deploy Turbo Drive accelerating links and form submissions without full-page reloads.
- Master `turbo_frame_tag` decomposing templates into isolated interactive view islands.
- Implement inline form editing isolating DOM replacements via model identity (`dom_id(task)`).

---

## Program: Team Task Board with Zero-Reload Inline Editing via Turbo Frames

```ruby
# app/views/tasks/_task.html.erb (Partial Kartu Tugas dengan Turbo Frame)
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
```

---

## Key Concepts

For years, web engineering bifurcated into fragmented silos: detached backend JSON APIs paired with bloated client SPAs (React/Vue) burdened by npm dependency trees and SEO hurdles. Rails bridges this divide via **Hotwire (HTML Over The Wire)**.

### Turbo Drive Mechanics
Turbo Drive intercepts standard `<a>` navigation and `<form>` submissions automatically. Bypassing traditional browser page tearing, Turbo Drive fetches HTML responses asynchronously via `fetch()`, swapping out `<body>` nodes while retaining cached scroll states and stylesheets.

### The Power of Turbo Frames
Encapsulating a task card inside `<%= turbo_frame_tag dom_id(task) %>` restricts link and form interactions strictly to that view island. Clicking "Edit" replaces the task card with an inline form instantaneously without touching adjacent DOM nodes—delivering React-like component reactivity with 100% server-side Ruby!


---

---

## Beginner Friendly Explanation

Imagine reading a daily newspaper. In legacy web models, printing a correction on page 3 requires throwing the entire paper into the trash and purchasing a brand-new paper from the newsstand (Full Page Reload). Turbo Frames behave like an automated correction stamp updating only that paragraph on page 3 while you continue reading uninterrupted.

## Experiments

- Click "Edit" on a task card in your browser observing the card morph into a form with zero page tear.
- Audit the browser Network inspector noting the outgoing `Turbo-Frame: task_42` header.
- Attach `data-turbo-frame="_top"` to a link escaping frame sandboxes to drive full-page transitions.

---

## Challenge

Build an accessible modal dialog using Turbo Frames: click "New Task", render the form inside `<dialog id="modal">`, closing the dialog upon submission.

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

You have mastered Hotwire Turbo Drive and Turbo Frames. Level 1 complete! Level 2 covers Turbo Streams, Solid Cable WebSockets, and Stimulus JS.
