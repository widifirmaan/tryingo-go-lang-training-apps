# Authentication — KTP Warung CI4 Beneran

> **Kategori:** CodeIgniter | **Level:** Menengah | **Minggu 7:** Authentication & Authorization
> **Prasyarat:** Minggu 6 — **Validasi**.

## Tujuan Pembelajaran

- `session()->set('user_id', ...)` KTP + `session()->destroy()` keluar (sumber: codeigniter.com/user_guide/libraries/sessions)
- Filter `AuthFilter::before()` satpam pintu + daftarkan di `Filters.php` (sumber: user_guide/incoming/filters)
- `password_hash`/`password_verify` (jangan MD5!)

---

## Kenapa Ini Penting Buat Kamu?

Tanpa auth, `/admin` dibuka siapa saja → harga diubah iseng. Tanpa filter, cek login ditulis di 20 method (lupa 1 = bolong). Filter 1x jaga semua pintu.

---

## Program: KTP + Satpam CI4 Beneran

```php
// Auth.php — login beneran (bukan echo!)
public function masuk() {
  $email = $this->request->getPost('email');
  $user = (new \App\Models\UserModel())->where('email', $email)->first();
  if ($user && password_verify($this->request->getPost('password'), $user['password'])) {
    session()->set(['user_id' => $user['id'], 'masuk' => true]);
    session()->regenerate(); // ganti kunci (anti bajak!)
    return redirect()->to('/admin');
  }
  return redirect()->back()->with('error', 'Salah');
}

public function keluar() {
  session()->destroy();
  return redirect()->to('/login');
}
```

```php
// Filters/AuthFilter.php — satpam 1x untuk semua pintu
namespace App\Filters;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\{RequestInterface, ResponseInterface};

class AuthFilter implements FilterInterface {
  public function before(RequestInterface $request, $arguments = null) {
    if (!session('masuk')) {
      return redirect()->to('/login'); // tendang!
    }
  }
  public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {}
}
```

```php
// Config/Filters.php — daftarkan satpam
public $aliases = ['auth' => \App\Filters\AuthFilter::class];
// Routes.php:
$routes->group('admin', ['filter' => 'auth'], function($routes) {
  $routes->get('/', 'Admin::index');
});
```

---

## Konsep Kunci

### `session()->set/get/destroy` = KTP
`set` beri, `session('masuk')` cek, `destroy` cabut. `regenerate()` ganti kunci.

### Filter `before()` = Satpam Pintu
Jalan SEBELUM controller. Return redirect = tendang.

### `password_verify` = Cek Brankas
Banding hash, bukan teks.

---

## Penjelasan untuk Pemula

### Analogi: Gelang Konser + Satpam
- **session = gelang**: masuk → gelang, keluar → gunting.
- **Filter = satpam tiap pintu admin**.

### Langkah 0 — Siapkan Device
- Sama W1 + tabel `users` (migration + seeder 1 admin, password `password_hash`!).

### Cara Komputer Membaca
1. `GET /admin` → filter `before` → `session('masuk')`? Tidak → redirect `/login`.
2. Login benar → `set` + `regenerate` → `/admin` lolos.

### 3 Istilah Wajib
1. **Session/filter**: gelang/satpam
2. **password_verify**: cek-brankas

---

## Eksperimen

- **Hijau:** Buka `/admin` tanpa login → ke `/login`?
- **Kuning:** Login salah → kembali + error?
- **Merah:** Hapus `'filter' => 'auth'` → bebas tanpa login? (Jangan! Pasang.)

---

## Tantangan

**Warung Ber-KTP:** Login/logout beneran + `AuthFilter` jaga `/admin/*` + seeder admin + screenshot tendang & lolos.

---

## Glosarium Mini

- **Session/filter/regenerate**: gelang/satpam/ganti-kunci

---

## Ringkasan

Minggu 7 dari 10: **KTP + Satpam** (Level: Menengah). Pintu terjaga. Minggu depan: **REST API**.
