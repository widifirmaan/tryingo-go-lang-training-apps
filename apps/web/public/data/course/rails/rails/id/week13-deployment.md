# Deployment & Production

> Rails | Modul 13

## Tujuan Pembelajaran

- Mempersiapkan deployment
- Menggunakan Heroku atau Render
- Mengatur environment variables
- Memahami production configuration

---

## Program: Deploy to Production

```ruby
# Deploy to Heroku
heroku create
heroku run rails db:migrate
heroku open

# Deploy to Render
# Add render.yaml with build command: bundle exec rails server -p $PORT
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

Modul 13 dari 16: **Deployment & Production**. Rails menggunakan pola MVC dan Active Record untuk membangun aplikasi web secara efisien. Minggu depan: **14. Security Best Practices**.
