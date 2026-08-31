# Associations — Tali Antar Rak Rails

> **Kategori:** Ruby on Rails | **Level:** Menengah | **Minggu 6:** Associations

## Tujuan Pembelajaran

- `has_many`, `belongs_to`, `has_many :through` — tali

---

## Program

```ruby
class Pelanggan < ApplicationRecord
  has_many :pesanans
  has_many :produks, through: :pesanans
end
class Pesanan < ApplicationRecord
  belongs_to :pelanggan
  belongs_to :produk
end

pelanggan.pesanans.count
produk.pesanans.map(&:pelanggan)
```

---

## Ringkasan

Minggu 6: **Tali Rak** — associations.
