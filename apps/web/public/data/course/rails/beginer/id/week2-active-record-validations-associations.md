# Active Record Lanjutan: Asosiasi Kompleks, Scopes & Enums

> **Kategori:** Ruby on Rails 8 | **Level:** Pemula | **Minggu 2:** Active Record Lanjutan: Asosiasi Kompleks, Scopes & Enums
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai Active Record: ORM paling ekspresif dan elegan dalam sejarah rekayasa perangkat lunak.
- Mendefinisikan asosiasi kompleks: `belongs_to :assignee, class_name: "User"` dan `has_one :through`.
- Menggunakan Rails 8 modern `enum :status` yang otomatis menyediakan method helper (`task.status_completed!`, `task.status_in_progress?`).
- Membangun kueri database yang dapat dirangkai (Chainable Scopes) untuk performa SQL optimal.

---

## Program: Model Manajemen Tugas Tim dengan Status Enum & Kueri Scopes Cepat

```ruby
# app/models/task.rb
class Task < ApplicationRecord
  belongs_to :project
  belongs_to :assignee, class_name: "User", optional: true
  has_one :workspace, through: :project

  # Rails 7.1 / 8: Enum Tersintaksis Modern
  enum :status, {
    backlog: 0,
    in_progress: 1,
    in_review: 2,
    completed: 3
  }, default: :backlog, prefix: true

  enum :priority, {
    low: 0,
    medium: 1,
    high: 2,
    urgent: 3
  }, default: :medium

  # Active Record Validations
  validates :title, presence: true, length: { minimum: 3, maximum: 120 }
  validates :due_date, comparison: { greater_than_or_equal_to: -> { Date.current } }, allow_nil: true

  # Reusable Query Scopes (Kueri SQL Bersih & Rantaiable)
  scope :overdue, -> { where("due_date < ? AND status != ?", Date.current, statuses[:completed]) }
  scope :urgent_tasks, -> { where(priority: :urgent) }
  scope :assigned_to_user, ->(user_id) { where(assignee_id: user_id) }
  scope :recently_updated, -> { order(updated_at: :desc).limit(10) }

  # Business Methods
  def mark_as_done!
    status_completed! # Built-in method otomatis dari deklarasi enum!
    touch(:completed_at)
  end
end

puts "=== ACTIVE RECORD TASK MODEL WITH SCOPES & ENUMS CONFIGURED ==="
```

---

## Konsep Kunci

Active Record di Ruby on Rails adalah standar emas desain ORM yang kemudian ditiru oleh puluhan framework di bahasa lain (seperti Laravel Eloquent dan Django ORM).

### Kekuatan Enums Modern di Rails 8
Dengan mendeklarasikan `enum :status, { backlog: 0, in_progress: 1, completed: 3 }, prefix: true`, Active Record secara otomatis memberikan Anda belasan method ajaib gratis:
- Pengecekan status: `task.status_completed?` (mengembalikan true/false).
- Mutasi langsung: `task.status_in_progress!` (mengubah status dan langsung menyimpan ke database).
- Query scope instan: `Task.status_completed` (menghasilkan SQL `SELECT * FROM tasks WHERE status = 3`).

### Chainable Scopes
Scopes memungkinkan Anda merangkum kueri SQL bisnis yang sering digunakan ke dalam method kelas yang dapat dirangkai dengan indah:
`Task.urgent_tasks.overdue.assigned_to_user(current_user.id)`
Active Record menunda eksekusi kueri (**Lazy Evaluation**) hingga data benar-benar dibutuhkan di view, menggabungkan seluruh kondisi WHERE menjadi satu perintah SQL tunggal yang sangat efisien.


---

---

## Penjelasan untuk Pemula

Bayangkan papan kartu tugas tim di dinding kantor. Daripada Anda harus membaca 100 kartu satu per satu mencari mana tugas yang mendesak, Anda memiliki stiker warna otomatis (Enum: Merah = Urgent, Hijau = Selesai). Anda bisa menekan tombol ajaib (Scope: overdue) dan papan kartu otomatis menyalakan lampu hanya pada kartu tugas yang telat diselesaikan.

## Eksperimen

- Uji coba pemanggilan helper bang method `task.status_completed!` di konsol Rails.
- Rangkai dua scope sekaligus `Task.urgent_tasks.recently_updated` dan amati kueri SQL di log konsol.
- Coba buat tugas dengan tanggal due date kemarin dan perhatikan validasi `comparison` menggagalkan penyimpanan.

---

## Tantangan

Tambahkan validasi kustom `validate :assignee_must_belong_to_workspace` yang memastikan anggota tim yang ditugaskan benar-benar terdaftar di workspace proyek tersebut.

---

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

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

Kamu telah menguasai Active Record associations, modern enums, dan chainable scopes. Minggu depan kita mempelajari Action Controller dan Strong Parameters.
