# Performance & Caching

> Rails | Modul 15

## Tujuan Pembelajaran

- Menggunakan caching dengan Redis
- Optimasi database queries with eager loading
- Memahami N+1 query problem
- Implementing background jobs

---

## Program: Optimize App

```ruby
# config/environments/production.rb
config.cache_store = :redis_cache_store, { url: ENV["REDIS_URL"] }

# In controller
class PostsController < ApplicationController
  caches_action :index, expires_in: 1.hour
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

Modul 15 dari 16: **Performance & Caching**. Rails menggunakan pola MVC dan Active Record untuk membangun aplikasi web secara efisien. Minggu depan: **16. Capstone: Blog App**.
