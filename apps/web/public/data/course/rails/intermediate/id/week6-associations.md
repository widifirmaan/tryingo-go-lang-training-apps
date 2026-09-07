# Associations — Tali Antar Rak Rails

> **Kategori:** Ruby on Rails | **Level:** Menengah | **Minggu 6:** Associations

## Tujuan Pembelajaran

- `has_many`, `belongs_to`, `has_many :through` — tali

---

## Kenapa Ini Penting Buat Kamu?

Tanpa tali, `pesanan.pelanggan` = query manual + N+1 lambat. Dengan `has_many/belongs_to`, 1 baris + `includes` anti-N+1.

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

## Penjelasan untuk Pemula

### Analogi: Tali Antar Rak
- Lihat Program: jalankan perintahnya, ubah 1 hal, lihat bedanya.

### Langkah 0 — Siapkan Device
- Sama Rails W1: `rails server` di `3000` (+ `redis` untuk W10).

### Cara Komputer Membaca
- `pelanggan.pesanans` otomatis `WHERE pelanggan_id = ?`; `includes(:pesanans)` 2 query (bukan 101).

### 3 Istilah Wajib
- 1. **has_many/belongs_to**: punya/milik

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 6: **Tali Rak** — associations.
