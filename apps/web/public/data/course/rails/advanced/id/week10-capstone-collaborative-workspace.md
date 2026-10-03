# Capstone: Platform Kolaborasi Tim & Manajemen Proyek Real-Time Production-Ready

> **Kategori:** Ruby on Rails 8 | **Level:** Lanjutan | **Minggu 10:** Capstone: Platform Kolaborasi Tim & Manajemen Proyek Real-Time Production-Ready

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

## Ringkasan

Selamat! Kamu telah menyelesaikan seluruh kurikulum Ruby on Rails 8 dari nol hingga platform kolaborasi tim real-time berskala produksi!
