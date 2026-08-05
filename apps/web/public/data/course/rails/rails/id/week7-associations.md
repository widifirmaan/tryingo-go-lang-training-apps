# Associations & Relationships

> Rails | Modul 7

## Tujuan Pembelajaran

- Memahami has_many, belongs_to
- Membuat association antara models
- Menggunakan joins dan includes
- Membuat nested resources

---

## Program: Blog Posts & Comments

```ruby
class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
end

class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
end
```

---

## Penjelasan

Rails menggunakan pola MVC (Model-View-Controller). Model mengelola data, View menampilkan HTML, Controller menangani request.
Active Record adalah ORM bawaan Rails untuk berinteraksi dengan database.
Rails convention over configuration berarti Anda tidak perlu menulis konfigurasi berlebihan.

---

## Eksperimen

- Ubah kode di atas dan lihat perubahannya di browser
- Tambah method baru di controller dan route baru
- Coba gunakan Rails console untuk query data

---

## Tantangan

Buat aplikasi kecil menggunakan konsep minggu ini. Pastikan menggunakan MVC pattern dan Active Record.
Jalankan dengan: rails server dan buka http://localhost:3000.

---

## Ringkasan

Modul 7 dari 16: **Associations & Relationships**. Rails menggunakan pola MVC dan Active Record untuk membangun aplikasi web secara efisien. Minggu depan: **8. Authentication & Sessions**.
