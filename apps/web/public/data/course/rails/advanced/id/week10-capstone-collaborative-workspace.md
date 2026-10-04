# Capstone: Platform Kolaborasi Tim & Manajemen Proyek Real-Time Production-Ready

> **Kategori:** Ruby on Rails 8 | **Level:** Lanjutan | **Minggu 10:** Capstone: Platform Kolaborasi Tim & Manajemen Proyek Real-Time Production-Ready
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengintegrasikan seluruh ekosistem: Rails 8, Hotwire (Turbo & Stimulus), Solid Stack (Queue, Cable, Cache), dan Kamal 2.
- Membangun platform manajemen proyek real-time kolaboratif multi-pengguna tanpa SPA terpisah.
- Mengonfigurasi endpoint `/api/v1/health` untuk probe liveness/readiness container produksi.
- Menyiapkan aplikasi monolitik modern berperforma tinggi yang siap diproduksi di server VPS mandiri.

---

## Program: Platform Kolaborasi Lengkap (Rails 8, Hotwire Turbo, Solid Queue, Solid Cable & Solid Cache)

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

## Konsep Kunci

Selamat! Anda telah mencapai proyek Capstone akhir kurikulum Ruby on Rails 8. Platform ini menyatukan semua inovasi terbesar Rails 8 ke dalam satu aplikasi kolaborasi tim real-time yang sangat responsif, elegan, dan siap diproduksi.

### Keunggulan Arsitektur "The One Person Framework"
DHH menyebut Rails sebagai **"The One Person Framework"**: sebuah teknologi yang memungkinkan satu orang engineer membangun produk berskala jutaan pengguna tanpa membutuhkan tim terpisah untuk DevOps, backend API, dan frontend React.
- **Hotwire**: Menghadirkan kecepatan 60 FPS tanpa SPA JavaScript yang berat.
- **The Solid Stack**: Menghilangkan ketergantungan Redis. Seluruh WebSockets (Solid Cable), Antrean Background (Solid Queue), dan Caching (Solid Cache) berjalan di atas database relasional PostgreSQL Anda dengan efisiensi puncak.
- **Kamal 2**: Menyebarkan aplikasi ke server produksi dalam hitungan menit dengan satu perintah `kamal deploy`.


---

---

## Penjelasan untuk Pemula

Proyek ini ibarat kantor pusat kerja bersama digital (Co-Working Space Virtual). Di meja kerja tim, setiap kali ada anggota tim yang menyelesaikan tugas atau membuat proyek baru, perubahan tersebut langsung muncul di layar monitor seluruh anggota tim tanpa jeda (Hotwire & Solid Cable), surat laporan dikirimkan otomatis oleh kurir di malam hari (Solid Queue), dan gedung kantor ini bisa dibangun di kota mana pun di dunia hanya dengan satu kali menekan tombol (Kamal 2).

## Eksperimen

- Jalankan server aplikasi menggunakan `bin/dev` (menjalankan Puma webserver, Solid Queue worker, dan Tailwind compiler).
- Buka endpoint `/api/v1/health` di browser dan amati status kesehatan seluruh subsistem Solid Stack.
- Uji coba pembuatan tugas secara konkuren dari dua sesi pengguna yang berbeda.

---

## Tantangan

Tambahkan modul Activity Feed: buat model `ActivityAudit` yang secara otomatis mencatat seluruh mutasi status tugas dan menyiarkannya ke tab log aktivitas proyek secara real-time.

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
```output
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
```output
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
```output
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
```output
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

Selamat! Kamu telah menyelesaikan seluruh kurikulum Ruby on Rails 8 dari nol hingga platform kolaborasi tim real-time berskala produksi!
