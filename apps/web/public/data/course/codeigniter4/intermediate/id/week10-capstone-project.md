# Capstone: Warung CI4 Grand Opening

> **Kategori:** CodeIgniter 4 | **Level:** Menengah | **Minggu 10:** Capstone: Task Management API
> **Prasyarat:** Minggu 9 — **Testing**.

## Tujuan Pembelajaran

- Gabung W1-W9: `spark` + `MVC` + `validasi` + `auth filter` + `REST resource` + `test` jadi warung API + web beneran (bukan `echo`!)

---

## Kenapa Ini Penting Buat Kamu?

9 minggu terpisah — capstone buktikan gabung: web HTML + API JSON + login + uji, semua jalan beneran (`php spark serve` + `curl` + `php spark test`). Portfolio "CI4 production-ready".

---

## Program: Warung Grand Opening (Checklist)

```bash
# 1. Fondasi (W1-W5)
composer create-project codeigniter4/appstarter warung
php spark make:model ProdukModel
php spark make:migration BuatProduk && php spark migrate
php spark db:seed IsiProduk
```

```php
// 2. Web + validasi (W2,W3,W6): routes + controller + view + validate
// 3. Auth (W7): AuthFilter jaga /admin
// 4. API (W8): $routes->resource('api/produk')
```

```bash
# 5. Uji (W9) + buktikan
php spark test                    # HIJAU?
php spark serve                   # :8080?
curl localhost:8080/api/produk   # JSON?
curl -X POST -H "Content-Type: application/json" \
  -d '{"nama":"Gula","harga":15000}' localhost:8080/api/produk  # 201?
```

**Tugas capstone:** Semua hijau + screenshot 4 (`test`, `serve`, `curl` GET/POST) + video 1 menit. **Selesai CI4 0→Ahli!** 🎉

---

## Konsep Kunci

### Capstone = Gabung 9 Minggu
`spark` + MVC + validasi + auth + REST + test = warung beneran.

---

## Eksperimen

- **Hijau:** Jalankan Program apa adanya; catat 1 baris output pertama.
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus 1 baris di Program → error pertama apa? Kembalikan.

## Tantangan

**Grand Opening:** Semua checklist + `README.md` cara jalan. **Selesai CI4 0→Ahli!** 🎉

---
- **Checklist integrasi:** **Setup CI4** (Minggu 1) + **Controllers & Routing** (Minggu 2) + **Views & Templates** (Minggu 3) + **Models & Database** (Minggu 4) + **Migrations & Seeds** (Minggu 5) + **Validasi** (Minggu 6) + **Authentication** (Minggu 7) + **REST API** (Minggu 8) + **Testing** (Minggu 9) → semua bagian di atas jalan bareng saat grand opening.
## Glosarium Mini

- **Capstone/deploy**: gabung/buka

---

## Ringkasan

Minggu 10 dari 10: **Grand Opening** (Level: Menengah). **Selesai CI4 0→Ahli dari nol!** 🎉
