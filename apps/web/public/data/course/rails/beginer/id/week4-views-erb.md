# Views ERB — Etalase Nyata Warung Rails

> **Kategori:** Ruby on Rails | **Level:** Pemula | **Minggu 4:** Views & ERB Templates
> **Prasyarat:** Minggu 3 — **Migrations**.

## Tujuan Pembelajaran

- `<%= %>` tampilkan (aman XSS), `<% %>` logika, `<%# %>` komentar (sumber: guides.rubyonrails.org/layouts_and_rendering)
- `render 'shared/header'` partial `_header.html.erb`, `layouts/application.html.erb` + `yield` bingkai
- `link_to`, `form_with`, `posts_path` path helper

---

## Kenapa Ini Penting Buat Kamu?

Tanpa partial/layout, header ditulis di 10 file — ganti nomor WA ubah 10x. Tanpa `link_to`, URL hardcode `/posts/1` — ganti routes, semua putus. Path helper ikut routes otomatis.

---

## Program: Etalase Warung Nyata

```erb
<!-- app/views/layouts/application.html.erb — bingkai -->
<!DOCTYPE html>
<html lang="id">
<head><title>Warung</title></head>
<body>
  <%= render 'shared/header' %>
  <%= yield %>
  <%= render 'shared/footer' %>
</body>
</html>
```

```erb
<!-- app/views/shared/_header.html.erb — partial (garis bawah _) -->
<nav><%= link_to "Beranda", root_path %> | <%= link_to "Produk", produks_path %></nav>

<!-- app/views/produks/index.html.erb — isi -->
<h1>Katalog (<%= @produks.count %> item)</h1>
<% @produks.each do |p| %>
  <div>
    <%= link_to p.nama, produk_path(p) %> - Rp<%= p.harga %>
    <%= link_to "Ubah", edit_produk_path(p) %>
  </div>
<% end %>

<%= form_with model: @produk do |f| %>
  <%= f.label :nama %> <%= f.text_field :nama %>
  <%= f.label :harga %> <%= f.number_field :harga %>
  <%= f.submit "Tambah" %>
<% end %>
```

---

## Konsep Kunci

### `<%= %>` vs `<% %>` vs `<%# %>`
Tampilkan / logika / komentar.

### Partial `_nama.html.erb` + `render`
`render 'shared/header'` cari `_header.html.erb` — tanpa garis bawah di `render`.

### Layout + `yield` = Bingkai
`application.html.erb` otomatis bungkus semua (kecuali `layout false`).

### Path Helper = URL Otomatis
`produks_path` → `/produks`, `produk_path(p)` → `/produks/1` — ikut `routes.rb`.

---

## Penjelasan untuk Pemula

### Analogi: Etalase Modular
- **Layout = bingkai toko**, **partial = papan header** dipakai 10 halaman, **yield = lubang** untuk isi.

### Langkah 0 — Siapkan Device
- Sama W1: `rails server` di `3000`, routes `resources :produks` ada.

### Cara Komputer Membaca
1. `render 'shared/header'` → cari `_header.html.erb` → tempel.
2. `link_to "Ubah", edit_produk_path(p)` → tanya routes → `/produks/1/edit`.

### 3 Istilah Wajib
1. **ERB/partial/layout**: template/potongan/bingkai
2. **link_to/path helper**: link/URL otomatis
3. **form_with**: form terhubung

---

## Eksperimen

- **Hijau:** `<%= 2 + 3 %>` → 5? `<%# komentar %>` → hilang?
- **Kuning:** Ganti `produk_path(p)` jadi `/produks/#{p.id}` manual → jalan tapi rapuh?
- **Merah:** `render 'shared/header'` tanpa file `_header` → error `Missing partial`? Buat file.

---

## Tantangan

**Warung Etalase Lengkap:** `application.html.erb` + `_header` (nav `link_to`) + `index` (`each` + `link_to` show/edit + `form_with`) + `_produk.html.erb` partial per item (`render @produks`). **Selesai Beginner Rails!**
- **Sambungan (Minggu 3 — Migrations):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **ERB/partial/yield**: template/potongan/lubang
- **link_to/path**: link/URL

---

## Ringkasan

Minggu 4 dari 4: **Etalase Nyata** (Level: Pemula). **Selesai Beginner Rails!** Lanjut: **Authentication** (Menengah).
