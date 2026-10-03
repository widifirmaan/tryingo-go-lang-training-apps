# Performa & Caching: Rails 8 Solid Cache & Russian Doll Caching

> **Kategori:** Ruby on Rails 8 | **Level:** Lanjutan | **Minggu 8:** Performa & Caching: Rails 8 Solid Cache & Russian Doll Caching

## Tujuan Pembelajaran

- Memahami pola legendaris Russian Doll Caching (Matryoshka Caching) di Ruby on Rails.
- Menguasai Rails 8 Solid Cache (penyimpanan cache persisten berbasis database berkapasitas besar tanpa batas RAM Redis).
- Menggunakan opsi `belongs_to :parent, touch: true` untuk otomatisasi invalidasi cache hierarkis.
- Menerapkan `strict_loading` pada Active Record untuk memblokir kueri N+1 secara otomatis saat pengujian.

---

## Program: Papan Proyek Berkecepatan Tinggi dengan Russian Doll Caching & Solid Cache

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

## Konsep Kunci

Salah satu inovasi terbesar yang diciptakan oleh David Heinemeier Hansson (DHH) di platform Basecamp adalah teknik **Russian Doll Caching** (Caching Boneka Matryoshka Rusia).

### Apa itu Russian Doll Caching?
Bayangkan sebuah proyek dengan 100 kartu tugas.
1. Layer terluar meng-cache seluruh halaman proyek: `<% cache @project do %>`.
2. Di dalamnya, setiap kartu tugas di-cache secara independen: `<% cache task do %>`.
Kunci cache otomatis dihitung berdasarkan hash timestamp `updated_at` dari model.

### Keajaiban touch: true
Ketika seorang pengguna mengubah judul pada Tugas #42:
- Dengan `belongs_to :project, touch: true`, Rails otomatis memperbarui timestamp `updated_at` pada Proyek induk.
- Pada request berikutnya, cache layer terluar invalid karena timestamp proyek berubah.
- Namun ketika me-render 100 tugas di dalamnya, **99 tugas lainnya tetap dibaca langsung dari cache HTML**, hanya Tugas #42 yang di-render ulang! Halaman proyek ter-render dalam 2 milidetik!

### Revolusi Rails 8 Solid Cache
Di masa lalu, cache disimpan di Redis yang harganya sangat mahal karena menggunakan RAM fisik. **Solid Cache** di Rails 8 menyimpan cache HTML di SSD database relasional berukuran gigabyte atau terabyte dengan skema FIFO eviction berkinerja tinggi, menghemat 80% biaya cloud hosting.


---

---

## Penjelasan untuk Pemula

Bayangkan boneka kayu Rusia (Matryoshka) yang di dalamnya ada boneka lebih kecil, dan di dalamnya lagi ada boneka lebih kecil lagi. Jika Anda hanya ingin mengecat ulang satu boneka terkecil di bagian terdalam, Anda tidak perlu membuang seluruh 10 boneka kayu lainnya ke tempat sampah. Anda cukup mengecat satu boneka itu dan memasukkannya kembali ke susunan boneka lama.

## Eksperimen

- Aktifkan caching di local development menggunakan perintah `bin/rails dev:cache`.
- Edit salah satu tugas dan amati di log server bagaimana 99 tugas lainnya mencatat `[CACHE HIT]`.
- Gunakan `strict_loading` pada model Task dan amati pengecualian `ActiveRecord::StrictLoadingViolationError` jika ada kueri N+1 yang terlewat.

---

## Tantangan

Gunakan Low-Level Cache API `Rails.cache.fetch("workspace_stats_#{workspace.id}", expires_in: 12.hours)` untuk meng-cache perhitungan metrik penyelesaian tugas tim.

---

## Ringkasan

Kamu telah menguasai Russian Doll Caching dan Rails 8 Solid Cache. Minggu depan kita mempelajari Autentikasi Native Rails 8 dan deployment modern Kamal 2.
