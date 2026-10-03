# Modern Rails 8: Konvensi Omakase, Propshaft & Struktur Proyek

> **Kategori:** Ruby on Rails 8 | **Level:** Pemula | **Minggu 1:** Modern Rails 8: Konvensi Omakase, Propshaft & Struktur Proyek
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami filosofi "Convention over Configuration" dan "The Rails Doctrine" (Omakase Stack).
- Menguasai struktur direktori Rails 8 dan pipeline aset modern Propshaft (tanpa Node.js bundler).
- Mendefinisikan nested RESTful resources dengan opsi `shallow: true`.
- Mengotomatisasi pembuatan slug URL menggunakan callback model `before_validation`.

---

## Program: Domain Model Workspace Proyek Kolaboratif dengan Konvensi Rails 8

```ruby
# config/routes.rb (Rails 8: Ramping & Elegan)
Rails.application.routes.draw do
  root "workspaces#index"

  resources :workspaces do
    resources :projects, shallow: true do
      resources :tasks, only: [:create, :update, :destroy]
    end
  end
end

# app/models/workspace.rb
class Workspace < ApplicationRecord
  # Konvensi Rails: nama tabel otomatis 'workspaces', primary key otomatis 'id'
  has_many :projects, dependent: :destroy
  has_many :tasks, through: :projects

  validates :name, presence: true, length: { minimum: 3, maximum: 80 }
  validates :slug, presence: true, uniqueness: { case_sensitive: false }

  before_validation :generate_slug, on: :create

  private

  def generate_slug
    self.slug = name.parameterize if name.present?
  end
end

# app/controllers/workspaces_controller.rb
class WorkspacesController < ApplicationController
  def index
    # Konvensi: otomatis render 'app/views/workspaces/index.html.erb'
    @workspaces = Workspace.order(created_at: :desc)
  end

  def show
    @workspace = Workspace.find_by!(slug: params[:id])
    @projects = @workspace.projects.includes(:tasks)
  end
end

puts "=== RUBY ON RAILS 8 OMAKASE ARCHITECTURE INITIALIZED ==="
```

---

## Konsep Kunci

Ruby on Rails adalah framework web revolusioner yang memelopori banyak konsep web modern (seperti MVC, RESTful conventions, dan migrations). Di versi **Rails 8**, framework ini kembali ke akarnya yang paling elegan dengan menghadirkan filosofi **"Omakase"**: seluruh komponen terbaik (database, queue, cache, asset pipeline) sudah dipilihkan dan disajikan langsung tanpa perlu konfigurasi rumit.

### Convention over Configuration (CoC)
Di Rails, Anda tidak perlu mengonfigurasi nama tabel atau primary key. Jika nama model Anda adalah `Workspace`, Rails secara otomatis mengetahui bahwa tabelnya di PostgreSQL bernama `workspaces`, foreign key-nya bernama `workspace_id`, dan controller-nya bernama `WorkspacesController`.

### Propshaft: Selamat Tinggal Node.js Build Tool
Di Rails 8, developer tidak lagi dipusingkan oleh Webpack atau Node.js build configuration yang membengkak. **Propshaft** adalah asset pipeline generasi baru yang memanfaatkan protokol HTTP/2 browser modern untuk memuat file CSS dan JS murni secara instan tanpa proses kompilasi bundler yang lambat.


---

---

## Penjelasan untuk Pemula

Bayangkan memesan hidangan Omakase di restoran sushi Jepang ternama. Anda tidak perlu repot memilih bumbu atau cara memasak ikan sendiri; koki master terbaik sudah menyajikan sushi paling lezat dan sempurna di atas meja Anda. Rails 8 adalah Omakase untuk web development: semua perkakas terbaik sudah disiapkan dan langsung pas satu sama lain.

## Eksperimen

- Jalankan perintah `bin/rails routes` di terminal untuk melihat seluruh rute RESTful yang dihasilkan.
- Gunakan konsol interaktif `bin/rails console` (Pry) untuk membuat record Workspace baru di memori.
- Uji coba fitur `shallow: true` dan amati bagaimana rute task menjadi `/projects/:id/tasks` yang bersih.

---

## Tantangan

Gunakan generator Rails `bin/rails generate model Task title:string status:integer priority:integer due_date:date` dan amati migration yang otomatis dihasilkan.

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

Kamu telah menguasai konvensi Rails 8, Propshaft, dan nested resources. Minggu depan kita masuk ke Active Record associations, scopes, dan validasi.
