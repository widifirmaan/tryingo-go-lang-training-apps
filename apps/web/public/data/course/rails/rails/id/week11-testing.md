# Testing with Minitest

> Rails | Modul 11

## Tujuan Pembelajaran

- Menulis test dengan Minitest
- Menggunakan fixtures dan factories
- Testing models, controllers, dan integration
- Memahami test-driven development

---

## Program: Test Suite

```ruby
require "test_helper"

class PostTest < ActiveSupport::TestCase
  test "valid post with title and body" do
    post = Post.new(title: "Hello", body: "World")
    assert post.valid?
  end

  test "invalid post without title" do
    post = Post.new(body: "World")
    assert_not post.valid?
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

Modul 11 dari 16: **Testing with Minitest**. Rails menggunakan pola MVC dan Active Record untuk membangun aplikasi web secara efisien. Minggu depan: **12. Assets & Pipeline**.
