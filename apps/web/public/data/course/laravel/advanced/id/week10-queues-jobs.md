# Queues & Jobs — Antrian Warung Laravel

> **Kategori:** Laravel | **Level:** Lanjutan | **Minggu 10:** Queues & Jobs

## Tujuan Pembelajaran

- `php artisan make:job KirimEmail` antrian, `dispatch` kirim, `queue:work` proses

---

## Kenapa Ini Penting Buat Kamu?

Kirim WA 5 detik di request → loading 5 detik. Dengan `dispatch()` + `queue:work`, balas langsung, WA background.

---

## Program

```bash
php artisan make:job KirimEmail
```

```php
// app/Jobs/KirimEmail.php
public function handle(){ Mail::to($this->user->email)->send(new StrukMail()); }

// Controller
KirimEmail::dispatch($user); // masuk antrian, tidak tunggu
```

`php artisan queue:work` → proses antrian.


---

## Penjelasan untuk Pemula

### Analogi: Antrian Kurir Laravel
- Lihat Program: jalankan perintahnya, ubah 1 hal, lihat bedanya.

### Langkah 0 — Siapkan Device
- Sama Laravel W1: `php artisan serve` di `8000` (+ paket minggu ini).

### Cara Komputer Membaca
- `Job::dispatch()` antre; `queue:work` ambil; `failed` jika gagal 3x.

### 3 Istilah Wajib
- 1. **dispatch/queue:work**: antre/ambil

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 10: **Antrian** — Jobs tidak tunggu.
