# Authorization & Roles

> Rails | Modul 9

## Tujuan Pembelajaran

- Memahami authorization dengan roles
- Menggunakan before_action untuk kontrol akses
- Membuat admin dan user roles
- Mengimplementasi permission checks

---

## Program: Admin Panel

```ruby
class ApplicationController < ActionController::Base
  before_action :require_login

  private

  def require_login
    unless current_user
      redirect_to login_path, alert: "Please log in"
    end
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  helper_method :current_user
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

Modul 9 dari 16: **Authorization & Roles**. Rails menggunakan pola MVC dan Active Record untuk membangun aplikasi web secara efisien. Minggu depan: **10. REST APIs & JSON**.
