# MVC & Routing

> Rails | Modul 2

## Tujuan Pembelajaran

- Memahami pola MVC: Model, View, Controller
- Mengatur routes di config/routes.rb
- Membuat controller dan actions
- Menghubungkan routes ke controller

---

## Program: Routes & Controllers

```ruby
Rails.application.routes.draw do
  root "hello#index"
  get "about", to: "pages#about"
  resources :posts
  resources :comments, only: [:create, :destroy]
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

Modul 2 dari 16: **MVC & Routing**. Rails menggunakan pola MVC dan Active Record untuk membangun aplikasi web secara efisien. Minggu depan: **3. Active Record & Migrations**.
