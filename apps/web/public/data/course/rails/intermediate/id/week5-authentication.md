# Authentication — KTP Rails

> **Kategori:** Ruby on Rails | **Level:** Menengah | **Minggu 5:** Authentication
> **Prasyarat:** Minggu 4 — **Views ERB**.

## Tujuan Pembelajaran

- `has_secure_password` KTP, `session[:user_id]` stempel, `before_action :require_login`

---

## Kenapa Ini Penting Buat Kamu?

Tanpa auth, `/admin` dibuka siapa saja. `has_secure_password` + `session` = KTP + gelang 5 baris (Devise untuk produksi).

---

## Program

```ruby
# Gemfile: gem 'bcrypt'
# User model: has_secure_password
# rails generate controller Sessions new create destroy

class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to "/produks"
    else
      flash[:alert] = "Salah"
      render :new
    end
  end
end

# ApplicationController
def require_login
  redirect_to "/login" unless session[:user_id]
end
```


---

## Penjelasan untuk Pemula

### Analogi: Gelang Konser Rails
- **`has_secure_password` = brankas di kartu user**: password mentah TAK PERNAH disimpan — cuma hash `password_digest`. `authenticate` cocokkan tanpa buka brankas.
- **`session[:user_id]` = gelang konser**: login → gelang, tiap request cek gelang. `before_action :require_login` = satpam yang cek SEMUA pintu kecuali loket login!

### Langkah 0 — Siapkan Device
- Sama Rails W1: `rails server` di `3000` (+ `redis` untuk W10).

### Cara Komputer Membaca
- `has_secure_password` butuh kolom `password_digest`; `authenticate` cek; `session[:user_id]` ingat.

### 3 Istilah Wajib
- 1. **has_secure_password/session**: brankas/gelang

---

## Tantangan

**Authentication di Warungmu:** pakai `/produks`, `/login`, `create` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `/produks`, `/login`, `create`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Views ERB** (Minggu 4): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 5: **KTP Rails** — `has_secure_password` + `session`. Minggu depan: **Associations**.
