# Autentikasi Native Rails 8, CurrentAttributes & Deployment Kamal 2

> **Kategori:** Ruby on Rails 8 | **Level:** Lanjutan | **Minggu 9:** Autentikasi Native Rails 8, CurrentAttributes & Deployment Kamal 2
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai generator autentikasi native baru di Rails 8 (`bin/rails generate authentication`).
- Memahami peran `ActiveSupport::CurrentAttributes` untuk isolasi sesi per-thread yang aman.
- Menggunakan cookies terenkripsi bertanda tangan kriptografis (`cookies.signed.permanent`).
- Mengonfigurasi deployment cloud tanpa downtime menggunakan **Kamal 2** langsung ke VPS Linux.

---

## Program: Sistem Autentikasi Modern Bawaan Rails 8 & Konfigurasi Deployment Kamal 2

```ruby
# Rails 8: Autentikasi Native Tanpa Gem Pihak Ketiga (Selamat Tinggal Devise!)
# bin/rails generate authentication

# app/models/user.rb
class User < ApplicationRecord
  has_secure_password # Menggunakan BCrypt cryptographic hashing
  has_many :sessions, dependent: :destroy

  validates :email_address, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  normalizes :email_address, with: ->(e) { e.strip.downcase }
end

# app/models/current.rb (Thread-Isolated Context)
class Current < ActiveSupport::CurrentAttributes
  attribute :session
  attribute :user

  def user
    session&.user
  end
end

# app/controllers/concerns/authentication.rb
module Authentication
  extend ActiveSupport::Concern

  included do
    before_action :require_authentication
    helper_method :authenticated?
  end

  private

  def authenticated?
    resume_session.present?
  end

  def require_authentication
    resume_session || request_authentication
  end

  def resume_session
    Current.session ||= find_session_by_cookie
  end

  def find_session_by_cookie
    Session.find_by(id: cookies.signed[:session_id]) if cookies.signed[:session_id]
  end

  def start_new_session_for(user)
    user.sessions.create!(user_agent: request.userAgent, ip_address: request.remote_ip).tap do |session|
      Current.session = session
      cookies.signed.permanent[:session_id] = { value: session.id, httponly: true, same_site: :lax }
    end
  end
end

# config/deploy.yml (Kamal 2: Zero-Downtime Docker Deployment ke VPS Server Apa Saja)
KAMAL_CONFIG_SAMPLE = <<-'YAML'
service: tryngo-workspace-app
image: tryngo/workspace:latest
servers:
  web:
    - 192.168.1.100
proxy:
  ssl: true
  host: workspace.tryngo.io
env:
  secret:
    - RAILS_MASTER_KEY
YAML

puts "=== RAILS 8 NATIVE AUTH & KAMAL 2 DEPLOYMENT PIPELINE CONFIGURED ==="
```

---

## Konsep Kunci

Selama lebih dari 15 tahun, hampir semua tutorial Rails mewajibkan pemasangan gem pihak ketiga yang sangat rumit: **Devise**. Devise memiliki ratusan baris kode tersembunyi yang sulit dimodifikasi.

### Autentikasi Native Rails 8
Mulai Rails 8, Rails menyertakan generator autentikasi modern bawaan:
`bin/rails generate authentication`
Generator ini menulis kode autentikasi murni yang bersih, transparan, dan dapat Anda edit langsung di dalam folder aplikasi Anda:
- Menggunakan `has_secure_password` dengan algoritma hashing BCrypt.
- Mengelola model `Session` di database sehingga pengguna dapat melihat perangkat apa saja yang sedang aktif login dan melakukan "Logout dari semua perangkat".
- Memanfaatkan **CurrentAttributes** untuk mengakses `Current.user` dari mana saja tanpa perlu mengoper variabel secara manual.

### Deployment Modern dengan Kamal 2
**Kamal 2** adalah alat orkestrasi kontainer open-source resmi dari tim Rails. Kamal memungkinkan Anda melakukan deployment aplikasi Docker ke server VPS Linux biasa (DigitalOcean, Hetzner, AWS) dengan jaminan **Zero-Downtime** tanpa memerlukan Kubernetes yang rumit.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda membeli rumah baru. Autentikasi lama seperti menyewa perusahaan kunci asing yang kuncinya tidak boleh Anda duplikasi sendiri. Autentikasi baru Rails 8 seperti memiliki gembok brankas baja buatan sendiri dengan kunci cadangan yang tersimpan rapi di saku Anda. Dan Kamal 2 seperti helikopter kargo yang mengantar rumah Anda ke tanah kavling mana pun di dunia tanpa ada satu gelas pun yang retak saat mendarat.

## Eksperimen

- Jalankan perintah `bin/rails generate authentication` di proyek baru dan telusuri seluruh file controller yang dihasilkan.
- Coba login dari dua browser berbeda dan perhatikan bagaimana tabel `sessions` mencatat user agent dan IP address secara terpisah.
- Jalankan perintah `kamal envify` untuk mengunci dan mengenkripsi environment secrets produksi.

---

## Tantangan

Tambahkan sistem Reset Password berbasis Token Kadaluarsa: buat model `PasswordResetToken` dengan masa berlaku 15 menit dan kirimkan tautan pemulihan via background job.

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

Kamu telah menguasai Autentikasi Native Rails 8, CurrentAttributes, dan deployment dengan Kamal 2. Minggu depan adalah Capstone Final: Platform Kolaborasi Tim Real-Time Skala Penuh!
