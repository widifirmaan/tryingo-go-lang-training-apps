# Views & ERB Templates

> Rails | Modul 5

## Tujuan Pembelajaran

- Memahami ERB templates
- Menggunakan layout dan partials
- Mengirim data dari controller ke view
- Menggunakan helper methods

---

## Program: Rendering Views

```ruby
<h1><%= @post.title %></h1>
<p><%= @post.body %></p>
<p>By <%= @post.user.name %> on <%= @post.created_at.strftime("%B %d, %Y") %></p>
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

Modul 5 dari 16: **Views & ERB Templates**. Rails menggunakan pola MVC dan Active Record untuk membangun aplikasi web secara efisien. Minggu depan: **6. Forms & Validations**.
