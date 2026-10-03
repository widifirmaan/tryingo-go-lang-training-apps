# Tugas Latar Belakang: Rails 8 Solid Queue & Active Job Asinkron

> **Kategori:** Ruby on Rails 8 | **Level:** Menengah | **Minggu 7:** Tugas Latar Belakang: Rails 8 Solid Queue & Active Job Asinkron
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami peran Active Job sebagai layer abstraksi pemrosesan background di Ruby on Rails.
- Menguasai Rails 8 Solid Queue (antrean background bawaan berbasis database berkecepatan tinggi tanpa Redis/Sidekiq).
- Menggunakan metode `.perform_later()` dan scheduling waktu eksekusi dengan `.set(wait_until: ...)`.
- Mengelola penanganan kegagalan dengan `retry_on` (Exponential Backoff) dan `discard_on`.

---

## Program: Pengirim Rekap Mingguan Proyek Tim Asinkron dengan Solid Queue & Active Job

```ruby
# app/jobs/workspace_weekly_digest_job.rb
class WorkspaceWeeklyDigestJob < ApplicationJob
  queue_as :mailers

  # Konfigurasi Retry Otomatis jika Terjadi Kegagalan Jaringan
  retry_on Net::SMTPError, wait: :polynomially_longer, attempts: 5
  discard_on ActiveRecord::RecordNotFound

  def perform(workspace_id)
    workspace = Workspace.find(workspace_id)
    puts "[SOLID QUEUE WORKER] Memulai kompilasi rekap mingguan untuk Workspace: #{workspace.name}..."

    completed_tasks = workspace.tasks.status_completed.where("completed_at >= ?", 7.days.ago)
    overdue_tasks   = workspace.tasks.overdue

    puts " -> Tugas Selesai: #{completed_tasks.count} | Tugas Terlambat: #{overdue_tasks.count}"

    # Kirim email ke seluruh anggota tim workspace
    # WorkspaceMailer.weekly_digest(workspace, completed_tasks, overdue_tasks).deliver_now

    puts "[SOLID QUEUE SUCCESS] Rekap email mingguan berhasil dikirimkan ke anggota tim!"
  end
end

# Memicu Job dari Controller atau Console:
# 1. Jalankan asinkron sesegera mungkin:
# WorkspaceWeeklyDigestJob.perform_later(workspace.id)

# 2. Jadwalkan eksekusi di masa depan (Scheduled Recurring):
# WorkspaceWeeklyDigestJob.set(wait_until: Date.tomorrow.noon).perform_later(workspace.id)

puts "=== RAILS 8 SOLID QUEUE BACKGROUND PROCESSING ACTIVE ==="
```

---

## Konsep Kunci

Tugas-tugas berat seperti mengirim ratusan email rekap, memproses export file Excel laporan proyek, atau memanggil webhook API pihak ketiga tidak boleh membebani web server utama.

### Mengapa Rails 8 Solid Queue Menjadi Terobosan?
Selama hampir dua dekade, developer Rails terpaksa memasang Redis dan pustaka Sidekiq untuk menjalankan background jobs. Di Rails 8, framework menyertakan **Solid Queue**: sistem antrean tingkat enterprise yang ditenagai langsung oleh database relasional (PostgreSQL/MySQL/SQLite). Solid Queue menggunakan teknik FOR UPDATE SKIP LOCKED untuk memproses jutaan job per hari tanpa membebani database dan tanpa perlu mengelola server Redis terpisah.

### Ketahanan Job dengan retry_on
Jaringan internet tidak pernah 100% stabil. Dengan mendeklarasikan `retry_on Net::SMTPError, wait: :polynomially_longer, attempts: 5`, jika server email mengalami timeout sementara, Solid Queue akan menunda eksekusi dan mencoba ulang secara bertahap (5 detik, 20 detik, 60 detik) sebelum menandainya sebagai gagal.


---

---

## Penjelasan untuk Pemula

Bayangkan kantor pos pengiriman surat massal. Daripada petugas loket menulis alamat dan mengecap 1.000 amplop surat satu per satu di depan Anda (membuat antrean loket macet total), petugas loket menaruh karung surat ke atas ban berjalan menuju gudang sortir otomatis (Solid Queue). Mesin sortir di gudang memproses pengiriman surat tersebut di malam hari dengan tenang.

## Eksperimen

- Jalankan worker antrean Solid Queue di terminal menggunakan perintah `bin/jobs`.
- Picu job dari konsol Rails `WorkspaceWeeklyDigestJob.perform_later(1)` dan amati proses eksekusi di log worker.
- Uji coba fitur penjadwalan `perform_later` dengan opsi `wait: 10.seconds` dan perhatikan jeda eksekusi waktu.

---

## Tantangan

Konfigurasikan Solid Queue recurring jobs di file `config/recurring.yml` untuk secara otomatis menjalankan pembersihan tugas-tugas yang telah diarsipkan setiap hari Minggu jam 02:00 dini hari.

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

Kamu telah menguasai Active Job dan Rails 8 Solid Queue. Level 2 selesai! Di Level 3 kita mempelajari Solid Cache, Native Auth, dan Workspace Capstone.
