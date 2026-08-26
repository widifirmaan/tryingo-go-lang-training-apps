# MVC — Dapur, Pelayan, Etalase Rails

> **Kategori:** Ruby on Rails | **Level:** Pemula | **Minggu 2:** MVC Architecture

## Tujuan Pembelajaran

- `Model` (dapur, `app/models/produk.rb`), `View` (etalase, `app/views/produks/index.html.erb`), `Controller` (pelayan, `app/controllers/produks_controller.rb`)

---

## Program

```ruby
# model: app/models/produk.rb
class Produk < ApplicationRecord
  validates :nama, presence: true
  validates :harga, numericality: { greater_than: 0 }
end

# controller: app/controllers/produks_controller.rb
def index
  @produks = Produk.all
  @produk = Produk.new
end

# view: app/views/produks/index.html.erb
<% @produks.each do |p| %>
  <div><%= p.nama %> - Rp<%= p.harga %></div>
<% end %>
<%= form_with model: @produk do |f| %>
  <%= f.text_field :nama %> <%= f.number_field :harga %> <%= f.submit "Tambah" %>
<% end %>
```

---

## Ringkasan

Minggu 2: **MVC Rails** — Model, View, Controller terpisah rapi.
