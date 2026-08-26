# Migrations — Cetak Biru Rak Rails

> **Kategori:** Ruby on Rails | **Level:** Pemula | **Minggu 3:** Migrations & Database

## Tujuan Pembelajaran

- `rails generate migration TambahKolom`, `rails db:migrate`, `rails db:rollback` — ubah rak tanpa hapus data

---

## Program

```bash
rails generate migration AddKategoriToProduks kategori:string
# db/migrate/xxx_add_kategori_to_produks.rb
# def change; add_column :produks, :kategori, :string; end

rails db:migrate
rails db:migrate:status
rails db:rollback # batalkan terakhir
```

Model otomatis punya `kategori` baru.

---

## Ringkasan

Minggu 3: **Cetak Biru Rak** — migration aman.
