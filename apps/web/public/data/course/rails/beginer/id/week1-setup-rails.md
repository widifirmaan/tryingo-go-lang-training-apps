# Setup Rails — Warung Kilat Convention

> **Kategori:** Ruby on Rails | **Level:** Pemula | **Minggu 1:** Setup Rails
> **Prasyarat:** Tidak ada — mulai dari nol.

## Tujuan Pembelajaran

- Instal `gem install rails`, `rails new warung --database=postgresql`, `rails server` di `3000`
- Rails = **warung kilat**: `convention over configuration` — tidak perlu setting, ikuti aturan nama

---

## Kenapa Ini Penting Buat Kamu?

Rails paling cepat bikin warung online dari nol: 1 perintah `rails generate scaffold Produk nama:string harga:integer` langsung jadi CRUD + DB + views.

---

## Program: Warung Kilat

```bash
rails new warung --database=postgresql
cd warung
rails generate scaffold Produk nama:string harga:integer stok:integer
rails db:migrate
rails server
# Buka http://localhost:3000/produks
```

Buka `http://localhost:3000/produks` → CRUD jadi! Tambah produk langsung tanpa coding.

---

## Konsep Kunci

### `scaffold` = Warung Jadi
1 perintah jadi Model + View + Controller + DB.

### Convention
File `produk.rb` otomatis tabel `produks`, `Produk` class.

---

## Tantangan

**Setup Rails di Warungmu:** pakai `rails new warung`, `cd warung
rails`, `rails db` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `rails new warung`, `cd warung
rails`, `rails db`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Naikkan 1 tingkat: tambah 1 kasus gagal + pesan error yang jelas.

## Ringkasan

Minggu 1: **Warung Kilat Rails** — `scaffold` langsung jadi. Minggu depan: **MVC**.
