# Queues & Jobs — Antrian Warung Laravel

> **Kategori:** Laravel | **Level:** Lanjutan | **Minggu 10:** Queues & Jobs
> **Prasyarat:** Minggu 9 — **Testing**.

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
- **Kirim WA di request = kasir antar sendiri 5 detik**: pelanggan bengong nunggu loading.
- **`dispatch()` = panggil kurir**: balas OK 0.1 detik, kurir antar background. `queue:work` = kurirnya; gagal? `failed_jobs` catat + coba lagi!

### Langkah 0 — Siapkan Device
- Sama Laravel W1: `php artisan serve` di `8000` (+ paket minggu ini).

### Cara Komputer Membaca
- `Job::dispatch()` antre; `queue:work` ambil; `failed` jika gagal 3x.

### 3 Istilah Wajib
- 1. **dispatch/queue:work**: antre/ambil

### Bonus: Mail + Jadwal Otomatis (docs: Mail & Task Scheduling!)

Job kirim email beneran + jalan tiap pagi TANPA cron manual:

```bash
php artisan make:mail StrukMail --markdown=emails.struk
```

```php
// app/Mail/StrukMail.php — render() tampilkan struk
public function content() {
  return new Content(markdown: 'emails.struk', with: ['total' => 62000]);
}
// Kirim dari Job: Mail::to($user->email)->send(new StrukMail());
```

```php
// routes/console.php — jadwal (ganti cron manual!)
use Illuminate\Support\Facades\Schedule;
Schedule::job(new KirimPromo)->dailyAt("07:00"); // tiap jam 7 pagi
// Server: 1 cron saja → * * * * * php artisan schedule:run
```
---

## Eksperimen

- **Hijau:** Jalankan Program apa adanya; catat 1 baris output pertama.
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus 1 baris di Program → error pertama apa? Kembalikan.

## Tantangan

**Queues & Jobs di Warungmu:** pakai `content` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `content`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Testing** (Minggu 9): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 10: **Antrian** — Jobs tidak tunggu. Minggu depan: **REST API**.
