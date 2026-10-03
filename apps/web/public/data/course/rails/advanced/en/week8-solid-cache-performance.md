# Performance & Caching: Rails 8 Solid Cache & Russian Doll Caching

> **Kategori:** Ruby on Rails 8 | **Level:** Advanced | **Minggu 8:** Performance & Caching: Rails 8 Solid Cache & Russian Doll Caching

## Learning Objectives

- Master the legendary Russian Doll Caching (Matryoshka Caching) paradigm in Ruby on Rails.
- Understand Rails 8 Solid Cache (terabyte-scale database-backed caching eliminating Redis RAM limits).
- Deploy `belongs_to :parent, touch: true` for automated hierarchical cache invalidation.
- Enforce Active Record `strict_loading` to programmatically eliminate N+1 regressions.

---

## Program: High-Throughput Project Board with Russian Doll Caching & Solid Cache

```ruby
# app/views/projects/show.html.erb (Russian Doll Caching Pattern)

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
```

---

## Key Concepts

One of the most celebrated optimizations pioneered by DHH within Basecamp is the **Russian Doll Caching** (Matryoshka Caching) pattern.

### The Russian Doll Caching Architecture
Consider a project board housing 100 task cards.
1. The outer wrapper caches the global board: `<% cache @project do %>`.
2. Nested within, each task card caches independently: `<% cache task do %>`.
Cache keys derive deterministically from the model's `updated_at` timestamp digest.

### The Magic of touch: true
When a team member updates Task #42:
- Declaring `belongs_to :project, touch: true` causes Rails to bump the parent Project's `updated_at` timestamp.
- On the subsequent request, the outer project frame key expires.
- However, when iterating through the 100 cards, **the other 99 tasks hit the HTML fragment cache instantly**, rendering only Task #42! The entire page compiles in two milliseconds!

### Rails 8 Solid Cache Advantages
Traditionally, fragment caches were hosted in volatile Redis RAM tiers with severe memory constraints. Rails 8 introduces **Solid Cache**: persisting fragments directly to SSD database storage with high-speed FIFO eviction, slashing hosting costs by 80%.


---

---

## Beginner Friendly Explanation

Imagine a Russian Matryoshka nesting doll. An outer wooden figure encases smaller figurines inside. If you decide to repaint one miniature figurine deep within, you do not discard all ten hand-carved dolls. You repaint only that specific figurine and slide it back inside the existing master doll.

## Experiments

- Toggle fragment caching in local development via `bin/rails dev:cache`.
- Edit an isolated task and observe terminal logs confirming the other 99 fragments log clean `[CACHE HIT]` receipts.
- Enable `strict_loading` on Task models verifying `ActiveRecord::StrictLoadingViolationError` halts un-eager loaded calls.

---

## Challenge

Deploy Low-Level Cache APIs `Rails.cache.fetch("workspace_stats_#{workspace.id}", expires_in: 12.hours)` caching aggregated team productivity metrics.

---

## Summary

You have mastered Russian Doll Caching and Rails 8 Solid Cache. Next week we cover Rails 8 Native Authentication and Kamal 2 deployments.
