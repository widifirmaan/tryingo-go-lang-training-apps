# Forms & Validations

> Rails | Modul 6

## Tujuan Pembelajaran

- Membuat form dengan form_with
- Menggunakan validations di model
- Menampilkan error messages
- Memahami strong parameters

---

## Program: User Registration

```ruby
<%= form_with model: @post, local: true do |form| %>
  <%= form.label :title %>
  <%= form.text_field :title %>
  <%= form.label :body %>
  <%= form.text_area :body %>
  <%= form.submit "Publish" %>
<% end %>
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

Modul 6 dari 16: **Forms & Validations**. Rails menggunakan pola MVC dan Active Record untuk membangun aplikasi web secara efisien. Minggu depan: **7. Associations & Relationships**.
