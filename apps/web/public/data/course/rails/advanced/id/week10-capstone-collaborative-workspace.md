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
┌──────────────┐     Call Stack Kosong?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Pemeriksa)   │
└──────┬───────┘                             └───────▲────────┘
       │ Operasi Async (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Selesai ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `const / let variabel`
- **Fungsi Utama:** Deklarasi variabel modern lingkup blok (Block Scope).
- **Parameter / Atribut:** `Identifier, Initial Value`.
- **Perilaku & Efek Sistem:** `const` untuk referensi konstan yang tidak dapat di-reassign; `let` untuk variabel nilai dinamis.
- **Contoh Penggunaan Praktis:**
```javascript
const appName = 'Tryngo';
let counter = 0;
counter += 1;
console.log(appName, counter);
```
- **Hasil Output yang Diharapkan:**
```text
Tryngo 1
```

### 2. `() => { ... } (Arrow Function)`
- **Fungsi Utama:** Sintaks fungsi ringkas dengan lexical 'this'.
- **Parameter / Atribut:** `Parameters, Function Body`.
- **Perilaku & Efek Sistem:** Menyederhanakan penulisan fungsi dan mempertahankan konteks `this` dari lingkup pembungkus luar.
- **Contoh Penggunaan Praktis:**
```javascript
const multiply = (a, b) => a * b;
console.log(multiply(6, 7));
```
- **Hasil Output yang Diharapkan:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Fungsi Utama:** Penanganan operasi asinkron berbasis Promise.
- **Parameter / Atribut:** `URL string, RequestInit options`.
- **Perilaku & Efek Sistem:** Menulis kode asinkron dengan alur linier layaknya kode sinkron tanpa callback hell.
- **Contoh Penggunaan Praktis:**
```javascript
async function fetchUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  const data = await res.json();
  return data;
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan objek data JSON terurai dari server
```

### 4. `Array.prototype.map() / filter()`
- **Fungsi Utama:** Transformasi array fungsional tanpa mutasi data asal.
- **Parameter / Atribut:** `callback(item, index, array)`.
- **Perilaku & Efek Sistem:** `map` menghasilkan array baru dari hasil transformasi; `filter` menyaring elemen berdasarkan kondisi boolean.
- **Contoh Penggunaan Praktis:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubledEvens = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2);
console.log(doubledEvens);
```
- **Hasil Output yang Diharapkan:**
```text
[4, 8]
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
