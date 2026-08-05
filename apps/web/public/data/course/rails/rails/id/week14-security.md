# Security Best Practices

> Rails | Modul 14

## Tujuan Pembelajaran

- Memahami SQL injection dan XSS
- Menggunakan parameterized queries
- Implementing CSRF protection
- Menggunakan Content Security Policy

---

## Program: Secure App

```ruby
# Security Checklist
# 1. Use strong parameters (permit only allowed fields)
# 2. Use CSRF tokens (Rails includes by default)
# 3. Use bcrypt for passwords (has_secure_password)
# 4. Use parameterized queries (Active Record does this)
# 5. Set Content-Security-Policy header
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

Modul 14 dari 16: **Security Best Practices**. Rails menggunakan pola MVC dan Active Record untuk membangun aplikasi web secara efisien. Minggu depan: **15. Performance & Caching**.
