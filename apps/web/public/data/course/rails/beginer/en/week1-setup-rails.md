# Setup Rails — Warung Kilat Convention

> **Kategori:** Ruby on Rails | **Level:** Pemula | **Minggu 1:** Setup Rails

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

## Ringkasan

Minggu 1: **Warung Kilat Rails** — `scaffold` langsung jadi. Minggu depan: **MVC**.
