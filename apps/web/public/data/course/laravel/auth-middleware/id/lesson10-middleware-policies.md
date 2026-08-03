# Middleware & Policies

> Laravel | Auth & Middleware | Pelajaran 10

## Tujuan Pembelajaran

- Membuat middleware kustom dan mendaftarkan alias di bootstrap/app.php
- Memahami urutan middleware dan tanggung jawabnya (auth dulu, lalu bisnis)
- Menulis Policy per-model dan memanfaatkan auto-discovery
- Menegakkan otorisasi di controller ($this->authorize) dan blade (@can)

---

## Program: Middleware & Policies

```php
<?php

namespace App\Policies;

use App\Models\Artikel;
use App\Models\User;

class ArtikelPolicy
{
    public function viewAny(?User $user): bool
    {
        return true;
    }

    public function view(?User $user, Artikel $artikel): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Artikel $artikel): bool
    {
        return $user->id === $artikel->penulis_id;
    }

    public function delete(User $user, Artikel $artikel): bool
    {
        return $user->id === $artikel->penulis_id || $user->peran === 'admin';
    }
}

```

---

## Penjelasan

## Middleware: Filter di Jalan Request
Middleware mengecek request SEBELUM controller dieksekusi. Alias didaftarkan di bootstrap/app.php: $middleware->alias([...]) - lalu dipakai seperti 'auth' bawaan: ->middleware('admin'). Urutan array penting: ['auth', 'admin'] - cek login dulu baru cek peran, supaya guest tidak dapat 403 melainkan dialihkan ke login.
## Middleware vs Controller
Middleware = keputusan yang SAMA untuk banyak route (harus login, harus admin, profil harus lengkap). Controller = logika khusus route itu. Kalau cek hanya dipakai satu route, middleware boleh ditaruh langsung di controller - kalau dipakai banyak, buat middleware.
## Policy: Aturan per Model
ArtikelPolicy mengatur otorisasi per MODEL: viewAny/view boleh semua (membaca), update hanya penulis, delete penulis atau admin. Laravel 11+ menemukan policy secara otomatis (penamaan ArtikelPolicy vs Artikel). Tidak ada peran hardcode di controller - semua keputusan di satu tempat.
## Dua Tempat Menegakkan
$this->authorize('update', $artikel) di controller: melempar 403 kalau gagal. @can('update', $artikel) di blade: menyembunyikan tombol. UI disembunyikan UNTUK KENYAMANAN, authorize di backend adalah KEAMANAN yang sesungguhnya - keduanya harus ada.

---

## Eksperimen

1. **Middleware: Filter di Jalan Request**
2. **Middleware vs Controller**
3. **Policy: Aturan per Model**
4. **Dua Tempat Menegakkan**

---

## Tantangan

Kembangkan sistem otorisasi: (1) tambah middleware CachePublik (meng-set header Cache-Control public pada response) untuk route /artikel, (2) buat policy PostPolicy untuk model baru Post dengan aturan: hanya penulis yang bisa update, admin bisa hapus, semua bisa baca, (3) tambah aksi "Hapus" di artikel dengan tombol konfirmasi dan route DELETE yang memanggil $this->authorize('delete', $artikel), (4) catat di README tabel 4 method policy + siapa yang boleh.

---

## Ringkasan

Middleware = filter per-request. Policy = aturan per-model. @can = UI, authorize = keamanan. Lanjut: mail & notifications.
