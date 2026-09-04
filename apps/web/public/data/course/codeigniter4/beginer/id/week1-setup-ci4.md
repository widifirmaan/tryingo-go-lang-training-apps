# Setup CI4 — Warung Ringan dengan Composer

> **Kategori:** CodeIgniter | **Level:** Pemula | **Minggu 1:** Setup CI4

## Tujuan Pembelajaran

- Menyiapkan device: cek `php -v` (≥8.1), `composer --version` (≥2.0.14), aktifkan `php.ini` `extension=intl, curl` (sumber: codeigniter.com/user_guide/installation)
- Instal resmi: `composer create-project codeigniter4/appstarter warung-ci` (app starter, bukan manual download)
- Atur `cp env .env` dan `php spark serve` di `http://localhost:8080` (sumber: running.html)

---

## Kenapa Ini Penting Buat Kamu?

CodeIgniter 4 = warung ringan tanpa banyak SOP — cocok UMKM yang PHP-nya sudah ada di hosting murah `cPanel`. Tanpa `composer` yang benar (2.0.14+), install gagal. Tanpa `intl`, `spark serve` error. Minggu ini kamu siapkan dapur yang benar, bukan asal `download & go`.

---

## Program: Warung CI4 5 Menit (Resmi)

```bash
# 1. Cek device (wajib sebelum install)
php -v          # harus 8.1+ (codeigniter.com: requirements)
composer --version # harus 2.0.14+
php -m | findstr intl   # Windows cek intl aktif
# Jika intl tidak ada: buka php.ini, hilangkan ; di ;extension=intl → extension=intl, restart

# 2. Buat proyek resmi (app starter)
composer create-project codeigniter4/appstarter warung-ci
cd warung-ci

# 3. Atur env (safety)
copy env .env   # Windows; Mac/Linux: cp env .env
# Buka .env, ubah CI_ENVIRONMENT = development

# 4. Jalan
php spark serve
# → http://localhost:8080 → "Welcome to CodeIgniter 4!"

# 5. Ubah port/host jika 8080 dipakai
php spark serve --port 8081
php spark serve --host 192.168.1.10
```

**Struktur resmi (user_guide):**
- `app/Controllers` pelayan, `app/Views` etalase, `public/` document root, `writable/` log/cache.

---

## Konsep Kunci

### `composer create-project codeigniter4/appstarter`
Skeleton + `vendor/codeigniter4/framework` terbaru. `composer install --no-dev` untuk produksi (hapus dev).

### `php spark serve` = `php -S` dengan routing CI4
Pakai server built-in untuk dev, bukan Apache di awal.

### `env → .env` + `intl`/`curl`
Tanpa `.env`, `CI_ENVIRONMENT` masih `production` (safety). Tanpa `intl`, error.

---

## Penjelasan untuk Pemula

### Analogi: Warung Ringan Siap Pakai
- **Composer = toko bahan**: `create-project` pesan paket warung lengkap.
- **`appstarter` = paket warung**: sudah ada kompor (`spark`), rak (`app/`), tidak rakit dari nol.
- **`php spark serve` = buka pintu coba**: tidak perlu sewa ruko (Apache) dulu.

### Langkah 0 — Siapkan Device (Research-Based)

1. **PHP 8.1+**: `php -v` → `PHP 8.2.x`. Jika `8.0` update di `php.net` atau XAMPP terbaru.
2. **Composer 2.0.14+**: `composer --version` → `2.7`. Jika `1.x` → `composer self-update`.
3. **Ekstensi**: `php -m` harus ada `intl`, `curl`, `mbstring`. Jika tidak: `php.ini` → `extension=intl` (buang `;`).
4. **Test**: `php spark phpini:check` (CI4 4.7) cek persyaratan.

### Cara Komputer Membaca

1. `composer create-project` → download `appstarter` + `framework` ke `vendor/`.
2. `php spark serve` → baca `.env` → `CI_ENVIRONMENT=development` → jalankan `public/index.php` → route `/` → `Home::index` → `welcome_message`.

### 3 Istilah Wajib

1. **Composer**: toko bahan PHP
2. **AppStarter**: paket warung jadi
3. **spark serve**: pintu coba

---

## Eksperimen

- **Hijau:** `php spark serve --port 8081` → `http://localhost:8081` jalan?
- **Kuning:** Ganti `CI_ENVIRONMENT = production` di `.env` → error detail hilang?
- **Merah:** Matikan `extension=intl` jadi `;extension=intl` → `php spark serve` error `intl`? Aktifkan lagi.

---

## Tantangan

**Warung CI4 Hidup:** `composer create-project` + `.env` + `php spark serve` → ganti `app/Views/welcome_message.php` jadi `Halo Warung Bu Siti` → `http://localhost:8080` tampil? Screenshot.

---

## Glosarium Mini

- **Composer/appstarter/vendor**: toko/paket/gudang bahan
- **spark serve**: server coba
- **.env**: buku alamat rahasia

---

## Ringkasan

Minggu 1 dari 5: **Setup CI4 Resmi** (Level: Pemula). Device siap, warung ringan menyala di 8080. Minggu depan: **Controllers & Routing** — pintu `Routes.php`.
