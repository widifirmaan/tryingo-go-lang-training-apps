# Migrations — Cetak Biru Rak Rails yang Aman

> **Kategori:** Ruby on Rails | **Level:** Pemula | **Minggu 3:** Migrations & Database
> **Prasyarat:** Minggu 2 — **MVC**.

## Tujuan Pembelajaran

- `rails generate migration AddKategoriToProduks kategori:string` tulis cetak biru, `rails db:migrate` bangun, `rails db:rollback` batalkan (sumber: guides.rubyonrails.org/active_record_migrations)
- `rails db:migrate:status` cek, `schema.rb` foto rak terakhir

---

## Kenapa Ini Penting Buat Kamu?

Tambah kolom `kategori` langsung via SQL di produksi → data 10.000 baris bisa hilang jika salah. Dengan migration, perubahan tercatat + bisa `rollback` — seperti `git` untuk database.

---

## Program: Tambah Kolom Aman

```bash
# 1. Tulis cetak biru
rails generate migration AddKategoriToProduks kategori:string
# → db/migrate/20260825000000_add_kategori_to_produks.rb:
#    def change
#      add_column :produks, :kategori, :string
#    end

# 2. Cek status (up = sudah jalan, down = belum)
rails db:migrate:status

# 3. Bangun
rails db:migrate

# 4. Model otomatis punya kategori (tanpa ubah model!)
rails console
>> Produk.column_names
>> p = Produk.first
>> p.update(kategori: "Sembako")

# 5. Batalkan jika salah
rails db:rollback  # hapus kolom lagi
rails db:migrate   # bangun lagi
```

---

## Konsep Kunci

### `generate migration` + `migrate` + `rollback` = Tulis/Bangun/Batal
- `generate` tulis file `db/migrate/xxx_...rb`.
- `migrate` jalankan yang `down`.
- `rollback` batalkan terakhir.

### `schema.rb` = Foto Rak
Otomatis update tiap `migrate` — jangan edit manual.

---

## Penjelasan untuk Pemula

### Analogi: Renovasi Warung dengan Cetak Biru
- **Migration = gambar renovasi**: "tambah rak kategori".
- **migrate = tukang bangun**, **rollback = bongkar lagi**.

### Langkah 0 — Siapkan Device
- Sama W1: `rails db:migrate:status` pastikan `up` semua dulu.

### Cara Komputer Membaca
1. `rails db:migrate` → cari file `down` → jalankan `change` → catat di `schema_migrations`.
2. `rollback` → jalankan kebalikan `change` (hapus kolom).

### 3 Istilah Wajib
1. **Migration**: cetak biru DB
2. **migrate/rollback**: bangun/batal
3. **schema.rb**: foto terakhir

---

## Eksperimen

- **Hijau:** `rails generate migration AddStokToProduks stok:integer` → `migrate` → `Produk.column_names` ada `stok`?
- **Kuning:** `rails db:migrate:status` → semua `up`?
- **Merah:** Edit `schema.rb` manual → `migrate` timpa lagi? (Jangan edit manual!)

---

## Tantangan

**Renovasi Warung:** `AddDiskonToProduks diskon:integer` (default 0 via `change` + `add_column :produks, :diskon, :integer, default: 0`) → `migrate` → `update` 1 produk → `rollback` → cek hilang → `migrate` lagi.
- **Sambungan (Minggu 2 — MVC):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **migration/migrate/rollback**: biru/bangun/batal
- **schema.rb**: foto rak

---

## Ringkasan

Minggu 3 dari 4: **Cetak Biru Aman** (Level: Pemula). Ubah rak tanpa takut. Minggu depan: **Views ERB** — etalase nyata.
