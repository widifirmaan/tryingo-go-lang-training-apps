# REST APIs & JSON

> Rails | Modul 10

## Tujuan Pembelajaran

- Membuat REST API endpoints
- Menggunakan respond_to untuk JSON
- Memahami status codes
- Mengimplementasi API versioning

---

## Program: API Endpoints

```ruby
class PostsController < ApplicationController
  def index
    @posts = Post.all
    render json: @posts
  end

  def show
    @post = Post.find(params[:id])
    render json: @post
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :body)
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

Modul 10 dari 16: **REST APIs & JSON**. Rails menggunakan pola MVC dan Active Record untuk membangun aplikasi web secara efisien. Minggu depan: **11. Testing with Minitest**.
