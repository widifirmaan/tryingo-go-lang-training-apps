# Pengenalan Rails & Setup

> Rails | Modul 1

## Tujuan Pembelajaran

- Mengenal Rails sebagai framework web Ruby
- Menginstall Ruby dan Rails
- Memahami struktur proyek Rails
- Membuat aplikasi Rails pertama

---

## Program: Hello Rails

```ruby
class HelloController < ApplicationController
  def index
    @message = "Hello, Rails!"
    @framework = "Ruby on Rails"
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

Modul 1 dari 16: **Pengenalan Rails & Setup**. Rails menggunakan pola MVC dan Active Record untuk membangun aplikasi web secara efisien. Minggu depan: **2. MVC & Routing**.
