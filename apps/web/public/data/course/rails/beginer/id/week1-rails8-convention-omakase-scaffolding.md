# Modern Rails 8: Konvensi Omakase, Propshaft & Struktur Proyek

> **Kategori:** Ruby on Rails 8 | **Level:** Pemula | **Minggu 1:** Modern Rails 8: Konvensi Omakase, Propshaft & Struktur Proyek

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

## Ringkasan

Kamu telah menguasai konvensi Rails 8, Propshaft, dan nested resources. Minggu depan kita masuk ke Active Record associations, scopes, dan validasi.
