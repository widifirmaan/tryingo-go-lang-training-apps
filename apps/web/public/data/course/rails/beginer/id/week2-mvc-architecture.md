# MVC — Dapur, Pelayan, Etalase Rails

> **Kategori:** Ruby on Rails | **Level:** Pemula | **Minggu 2:** MVC Architecture
> **Prasyarat:** Minggu 1 — **Setup Rails**.

## Tujuan Pembelajaran

- Pisah `Model` (dapur data, `app/models/produk.rb`), `View` (etalase, `index.html.erb`), `Controller` (pelayan) — pola MVC resmi Rails (sumber: guides.rubyonrails.org/getting_started)
- `validates :nama, presence: true` tolak kosong, `<%= %>` tampilkan, `form_with` form

---

## Kenapa Ini Penting Buat Kamu?

Tanpa MVC, 1 file campur SQL + HTML + logika 500 baris — ubah harga takut merusak tampilan. Dengan MVC, dapur (Model), pelayan (Controller), etalase (View) terpisah — masing-masing 20 baris, aman diubah.

---

## Program: MVC Warung Rails

```ruby
# model: app/models/produk.rb — dapur (aturan data)
class Produk < ApplicationRecord
  validates :nama, presence: true
  validates :harga, numericality: { greater_than: 0 }
end

# controller: app/controllers/produks_controller.rb — pelayan
class ProduksController < ApplicationController
  def index
    @produks = Produk.all
    @produk = Produk.new
  end

  def create
    @produk = Produk.new(params.require(:produk).permit(:nama, :harga))
    if @produk.save
      redirect_to produks_path
    else
      @produks = Produk.all
      render :index
    end
  end
end
```

```erb
<!-- view: app/views/produks/index.html.erb — etalase -->
<h1>Katalog</h1>
<% @produks.each do |p| %>
  <div><%= p.nama %> - Rp<%= p.harga %></div>
<% end %>
<%= form_with model: @produk do |f| %>
  <%= f.text_field :nama, placeholder: "Nama" %>
  <%= f.number_field :harga, placeholder: "Harga" %>
  <%= f.submit "Tambah" %>
<% end %>
```

---

## Konsep Kunci

### Model = Dapur + Aturan
`validates :nama, presence: true` tolak kosong sebelum simpan.

### Controller = Pelayan
`index` ambil `@produks`, `create` simpan + `redirect` atau `render` lagi jika gagal.

### View `<%= %>` = Etalase
`<%= p.nama %>` tampilkan (otomatis aman XSS), `form_with` form terhubung model.

---

## Penjelasan untuk Pemula

### Analogi: Restoran 3 Ruang
- **Model = dapur**: masak + cicip (`validates`).
- **Controller = pelayan**: antar pesanan dapur ↔ meja.
- **View = meja + etalase**: pajang.

### Langkah 0 — Siapkan Device
- Sama W1: `rails server` di `3000`, `rails generate scaffold` sudah (atau buat manual 3 file).

### Cara Komputer Membaca
1. `GET /produks` → routes → `index` → `@produks = Produk.all` → `index.html.erb`.
2. Submit form → `POST /produks` → `create` → `save` lolos? `redirect` : `render :index` + error.

### 3 Istilah Wajib
1. **MVC**: dapur/pelayan/etalase
2. **validates**: aturan dapur
3. **form_with**: form terhubung

---

## Eksperimen

- **Hijau:** Submit nama kosong → gagal + error? Isi → redirect?
- **Kuning:** `validates :harga, numericality: { greater_than: 0 }` → harga -5 ditolak?
- **Merah:** Hapus `permit(:harga)` → harga tidak tersimpan (strong params)? Pasang lagi.

---

## Tantangan

**Warung MVC Lengkap:** `Pelanggan(nama, email)` + `validates :email, uniqueness: true` + `index/create` + `index.html.erb` daftar + form. Submit email kembar → error?

---

## Glosarium Mini

- **Model/View/Controller**: dapur/etalase/pelayan
- **validates/permit**: aturan/izin
- **redirect/render**: pindah/tampilkan

---

## Ringkasan

Minggu 2 dari 4: **MVC Rails** (Level: Pemula). Dapur, pelayan, etalase terpisah. Minggu depan: **Migrations** — cetak biru rak.
