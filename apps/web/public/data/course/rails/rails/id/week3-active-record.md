# Active Record & Migrations

> Rails | Modul 3

## Tujuan Pembelajaran

- Memahami Active Record ORM
- Membuat dan menjalankan migrations
- Mengenal schema.rb
- Membuat model pertama

---

## Program: Database Setup

```ruby
class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.text :body
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
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

Modul 3 dari 16: **Active Record & Migrations**. Rails menggunakan pola MVC dan Active Record untuk membangun aplikasi web secara efisien. Minggu depan: **4. Models & Querying**.
