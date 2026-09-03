# Queues & Jobs — Antrian Warung Laravel

> **Kategori:** Laravel | **Level:** Lanjutan | **Minggu 10:** Queues & Jobs

## Tujuan Pembelajaran

- `php artisan make:job KirimEmail` antrian, `dispatch` kirim, `queue:work` proses

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

## Ringkasan

Minggu 10: **Antrian** — Jobs tidak tunggu.
