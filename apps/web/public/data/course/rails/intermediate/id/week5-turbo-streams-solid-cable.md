# Reaktivitas Real-Time: Turbo Streams & Rails 8 Solid Cable

> **Kategori:** Ruby on Rails 8 | **Level:** Menengah | **Minggu 5:** Reaktivitas Real-Time: Turbo Streams & Rails 8 Solid Cable
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai aksi manipulasi DOM Turbo Streams: `append`, `prepend`, `replace`, `update`, dan `remove`.
- Memahami Rails 8 Solid Cable (server WebSocket bawaan berbasis database berkinerja tinggi tanpa dependensi Redis).
- Menggunakan makro model `broadcasts_to` untuk reaktivitas multi-user instan dengan 1 baris kode.
- Membangun antarmuka kolaborasi tim real-time tanpa menulis satu baris pun kode JavaScript klien.

---

## Program: Papan Kolaborasi Tugas Real-Time Multi-User dengan Turbo Streams & Solid Cable

```ruby
# app/models/task.rb (Real-Time Broadcasting Lifecycle Callbacks)
class Task < ApplicationRecord
  belongs_to :project

  # Rails 8: Otomatis broadcast pembaruan ke seluruh browser tim via Solid Cable!
  # Action: append (tambah ke list), replace (update kartu), remove (hapus dari DOM)
  broadcasts_to ->(task) { [task.project, :tasks] }, inserts_by: :prepend

  # broadcasts_to setara dengan:
  # after_create_commit  -> { broadcast_prepend_to [project, :tasks], target: "tasks_list" }
  # after_update_commit  -> { broadcast_replace_to [project, :tasks] }
  # after_destroy_commit -> { broadcast_remove_to  [project, :tasks] }
end

# app/views/projects/show.html.erb (Berlangganan Stream WebSocket)
# Tag turbo_stream_from membuka koneksi WebSocket Solid Cable di background
<%= turbo_stream_from @project, :tasks %>

<div class="kanban-board">
  <h2>Daftar Tugas Proyek: <%= @project.name %></h2>

  <!-- Kontainer tempat tugas baru otomatis disisipkan secara real-time -->
  <div id="tasks_list" class="space-y-2">
    <%= render @project.tasks %>
  </div>
</div>

# Format Respons Turbo Stream di Controller (tasks_controller.rb):
# respond_to do |format|
#   format.turbo_stream
#   format.html { redirect_to @project }
# end

puts "=== RAILS 8 SOLID CABLE & TURBO STREAMS BROADCASTING ACTIVE ==="
```

---

## Konsep Kunci

Selama lebih dari satu dekade, menambahkan fitur real-time (seperti live chat atau papan kolaborasi tim multi-pengguna) di web membutuhkan pengaturan server Redis yang rumit, dependensi Pusher berbayar, dan ratusan baris kode state management di frontend (Redux / Zustand).

### Revolusi Rails 8 Solid Cable
Di Rails 8, Rails memperkenalkan **Solid Cable**: mesin backend WebSockets berkinerja tinggi yang ditenagai langsung oleh database PostgreSQL atau SQLite Anda menggunakan fitur polling I/O modern. Anda **tidak perlu menginstal server Redis** terpisah hanya untuk fitur WebSockets!

### Keajaiban broadcasts_to pada Turbo Streams
Cukup dengan menambahkan satu baris di model Task:
`broadcasts_to ->(task) { [task.project, :tasks] }`
Ketika Pengguna A membuat atau menggeser tugas di laptopnya, model Task secara otomatis memancarkan frame WebSocket via Solid Cable ke browser Pengguna B di belahan dunia lain. Browser Pengguna B langsung menyisipkan atau memperbarui elemen kartu tugas di layar dalam hitungan milidetik secara mulus!


---

---

## Penjelasan untuk Pemula

Bayangkan papan pengumuman bandara internasional. Ketika status pesawat berubah menjadi "Boarding", petugas tidak mendatangi satu per satu 2.000 penumpang di ruang tunggu. Layar monitor digital besar di dinding (Solid Cable & Turbo Streams) otomatis berganti warna dari kuning menjadi hijau di depan mata seluruh penumpang secara bersamaan.

## Eksperimen

- Buka dua jendela browser berbeda pada halaman proyek yang sama, buat tugas baru di jendela A, dan saksikan tugas langsung muncul di jendela B.
- Periksa tab Network (bagian WS / WebSockets) di browser DevTools untuk melihat pesan Turbo Stream yang ditransmisikan.
- Gunakan method manual `task.broadcast_replace_to(...)` di konsol Rails untuk memperbarui tampilan kartu browser dari terminal.

---

## Tantangan

Tambahkan Turbo Stream toast notification: ketika anggota tim lain memindahkan tugas ke status "Completed", tampilkan notifikasi alert hijau di pojok kanan bawah layar seluruh anggota proyek.

---

## Model Mental & Diagram Alur Visual

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
│          Database                 HTML Output ke Klien   │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `resources :articles do ... end`
- **Fungsi Utama:** Resourceful REST Routing Rails.
- **Parameter / Atribut:** `Resource name, options block`.
- **Perilaku & Efek Sistem:** Mendefinisikan 7 rute RESTful standar (index, show, new, create, edit, update, destroy) dalam 1 baris..
- **Contoh Penggunaan Praktis:**
```ruby
Rails.application.routes.draw do
  resources :products
  root 'products#index'
end
```
- **Hasil Output yang Diharapkan:**
```text
7 rute CRUD standar otomatis aktif
```

### 2. `class Product < ApplicationRecord`
- **Fungsi Utama:** Model ActiveRecord dengan ORM Canggih.
- **Parameter / Atribut:** `Validations, Associations (has_many, belongs_to)`.
- **Perilaku & Efek Sistem:** Memetakan tabel database ke objek Ruby lengkap dengan validasi data dan relasi otomatis..
- **Contoh Penggunaan Praktis:**
```ruby
class Product < ApplicationRecord
  has_many :reviews, dependent: :destroy
  validates :title, presence: true, length: { minimum: 3 }
  validates :price, numericality: { greater_than_or_equal_to: 0 }
end
```
- **Hasil Output yang Diharapkan:**
```text
Model Product aktif dengan validasi integritas data
```

### 3. `params.require(:product).permit(:title, :price)`
- **Fungsi Utama:** Strong Parameters keamanan mass assignment.
- **Parameter / Atribut:** `Model key, permitted attributes list`.
- **Perilaku & Efek Sistem:** Menolak atribut berbahaya yang dikirimkan peretas sebelum disimpan ke dalam database..
- **Contoh Penggunaan Praktis:**
```ruby
def product_params
  params.require(:product).permit(:title, :price, :in_stock)
end
```
- **Hasil Output yang Diharapkan:**
```text
Hanya kolom yang diizinkan yang dapat disimpan
```

### 4. `render json: @products / render :index`
- **Fungsi Utama:** Rendering format respons fleksibel.
- **Parameter / Atribut:** `Output format (json, html, turbo_stream)`.
- **Perilaku & Efek Sistem:** Menyajikan data dalam format JSON untuk API atau rendering template ERB untuk antarmuka web..
- **Contoh Penggunaan Praktis:**
```ruby
def index
  @products = Product.all
  render json: @products
end
```
- **Hasil Output yang Diharapkan:**
```text
Array objek produk disajikan sebagai JSON murni
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. N+1 Queries pada Active Record
- **Gejala / Masalah:** Me-render tampilan tabel memicu puluhan query SQL tambahan yang memperlambat respon.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan method `includes(:relation)` pada controller query untuk melakukan eager loading.

### 2. Migrasi Database yang Mengubah Kolom Tanpa Reversibility
- **Gejala / Masalah:** Perintah `rails db:rollback` gagal dieksekusi saat proses deployment dibatalkan.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan method migrasi eksplisit `up` dan `down` jika operasi kolom tidak dapat dibalik secara otomatis.

### 3. Menyimpan Credential Sensitif di Direktori Publik
- **Gejala / Masalah:** API key pihak ketiga bocor ke publik melalui repositori git.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Manfaatkan sistem enkripsi `rails credentials:edit` untuk menyimpan API key produksi.

---

## Ringkasan

Kamu telah menguasai Turbo Streams dan Rails 8 Solid Cable WebSockets. Minggu depan kita mempelajari interaktivitas sisi klien dengan Stimulus JS.
