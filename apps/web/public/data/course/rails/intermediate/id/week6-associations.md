# Associations — Tali Antar Rak Rails

> **Kategori:** Ruby on Rails | **Level:** Menengah | **Minggu 6:** Associations
> **Prasyarat:** Minggu 5 — **Authentication**.

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
- **`has_many`/`belongs_to` = tali dua arah**: pelanggan tarik `pesanans`-nya, pesanan tahu `pelanggan`-nya — tanpa tulis SQL JOIN manual.
- **`includes` = tarik rombongan**: tanpa ini 1 + N query (101x ke DB!). `has_many :through` = tali estafet (pelanggan → pesanan → produk).

### Langkah 0 — Siapkan Device
- Sama Rails W1: `rails server` di `3000` (+ `redis` untuk W10).

### Cara Komputer Membaca
- `pelanggan.pesanans` otomatis `WHERE pelanggan_id = ?`; `includes(:pesanans)` 2 query (bukan 101).

### 3 Istilah Wajib
- 1. **has_many/belongs_to**: punya/milik

---

## Eksperimen

- **Hijau:** Jalankan apa adanya, lalu ubah nilai `Pelanggan` → output ikut berubah?
- **Kuning:** Ubah huruf besar-kecil `Pelanggan` dan `Pesanan` → masih jalan atau error?
- **Merah:** Salah ketik 1 huruf pada `Pelanggan` → pesan error apa? Betulkan.

## Tantangan

**Associations di Warungmu:** pakai `Pelanggan`, `Pesanan` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `Pelanggan`, `Pesanan`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Authentication** (Minggu 5): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 6: **Tali Rak** — associations. Minggu depan: **Testing dengan RSpec**.
