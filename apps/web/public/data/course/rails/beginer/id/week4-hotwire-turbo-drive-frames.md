# Frontend Modern Tanpa SPA: Hotwire Turbo Drive & Turbo Frames

> **Kategori:** Ruby on Rails 8 | **Level:** Pemula | **Minggu 4:** Frontend Modern Tanpa SPA: Hotwire Turbo Drive & Turbo Frames

## Tujuan Pembelajaran

- Memahami filosofi Hotwire: menghadirkan kecepatan Single Page Application (SPA) tanpa kompleksitas React/Webpack.
- Menggunakan Turbo Drive untuk akselerasi navigasi link dan form submission tanpa full-page reload.
- Menguasai `turbo_frame_tag` untuk dekomposisi halaman menjadi komponen interaktif independen.
- Menerapkan inline editing formulir dengan isolasi pembaruan DOM berbasis model ID (`dom_id(task)`).

---

## Program: Papan Tugas Tim dengan Inline Editing Tanpa Reload Menggunakan Turbo Frames

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

## Konsep Kunci

Selama bertahun-tahun, industri web terpecah menjadi dua kubu: backend API terpisah dan frontend SPA raksasa (React / Vue) yang sangat rumit, membutuhkan ribuan dependensi npm, dan sering mengalami masalah SEO. Rails memecahkan dilema ini melalui **Hotwire (HTML Over The Wire)**.

### Apa itu Turbo Drive?
Secara default, Turbo Drive mencegat semua klik tautan `<a>` dan form `<form>` di browser. Alih-alih merusak dan memuat ulang seluruh halaman dari nol, Turbo Drive mengambil HTML baru di background via `fetch()`, mengganti elemen `<body>`, dan memperbarui URL browser tanpa memicu kedipan layar putih (White Flash).

### Keajaiban Turbo Frames
Dengan membungkus sebuah kartu tugas di dalam `<%= turbo_frame_tag dom_id(task) %>`, tautan edit di dalam frame tersebut **hanya akan memperbarui konten di dalam frame itu saja**. Ketika pengguna menekan tombol "Edit", kartu tugas tersebut berubah seketika menjadi formulir pengeditan input di tempat (inline editing) tanpa menyentuh bagian lain dari halaman web, persis seperti komponen React namun dengan 100% kode Ruby di sisi server!


---

---

## Penjelasan untuk Pemula

Bayangkan Anda membaca koran harian. Jika koran tradisional (web lama), setiap kali ada ralat berita di halaman 3, seluruh koran Anda dibuang ke tong sampah dan Anda harus membeli koran baru dari nol (Full Page Reload). Dengan Turbo Frames, seperti ada stiker tempel transparan ajaib yang langsung menempelkan ralat berita tepat di kolom halaman 3 tanpa Anda perlu mengganti koran Anda.

## Eksperimen

- Klik link "Edit" pada kartu tugas di browser dan amati kartu berubah menjadi form tanpa reload halaman.
- Periksa tab Network di browser DevTools dan amati header request `Turbo-Frame: task_42`.
- Tambahkan atribut `data-turbo-frame="_top"` pada link untuk memecahkan diri dari frame dan memicu navigasi halaman penuh.

---

## Tantangan

Bangun modal dialog popup menggunakan Turbo Frame: klik tombol "Tambah Tugas", muat form di dalam `<dialog id="modal">` via Turbo Frame, dan tutup modal otomatis saat form berhasil disimpan.

---

## Ringkasan

Kamu telah menguasai Hotwire Turbo Drive dan Turbo Frames. Level 1 selesai! Di Level 2 kita mempelajari Turbo Streams, WebSockets Solid Cable, dan Stimulus JS.
