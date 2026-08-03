# Autentikasi Session

> Laravel | Auth & Middleware | Pelajaran 9

## Tujuan Pembelajaran

- Membangun registrasi & login berbasis session dengan Auth facade
- Melindungi password dengan Hash::make (bcrypt)
- Mengamankan halaman dengan middleware auth dan redirect()->intended()
- Memahami session regeneration dan logout yang aman

---

## Program: Autentikasi Session

```php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function showRegister()
    {
        return view('auth.register');
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'nama' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = User::create([
            'nama' => $data['nama'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        Auth::login($user);

        return redirect()->route('dashboard');
    }

    public function showLogin()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $kredensial = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (Auth::attempt($kredensial, $request->boolean('ingat'))) {
            $request->session()->regenerate();

            return redirect()->intended('/dashboard');
        }

        return back()->withErrors([
            'email' => 'Email atau password salah.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}

```

---

## Penjelasan

## Auth Facade: Siapa yang Masuk?
Auth::login($user) menyimpan identitas user di session (guard 'web'). Auth::attempt() memeriksa kredensial dan membuat session sekaligus. auth()->user() mengembalikan model user yang sedang masuk - tersedia di controller, route, dan blade. $hidden = password tidak pernah bocor ke JSON/serialisasi.
## Hash::make: Jangan Pernah Simpan Password Asli
Hash::make() menggunakan bcrypt - satu arah. login tidak membandingkan string: Auth::attempt() menjalankan Hash::check() di belakang layar. Aturan min:8 datang dari validasi; jangan pernah memvalidasi 'password sama' dengan string.
## Middleware auth: Pagar Otomatis
->middleware('auth') pada route: tamu dialihkan ke halaman login (route bernama 'login'), user yang sudah masuk diteruskan. redirect()->intended() membawa user kembali ke halaman yang tadinya dia tuju - pengalaman pengguna yang benar.
## Keamanan Session
Setelah login: $request->session()->regenerate() mencegah session fixation (mencuri session ID lama). Setelah logout: invalidate() menghapus semua data session dan regenerateToken() membatalkan token CSRF lama.

---

## Eksperimen

1. **Auth Facade: Siapa yang Masuk?**
2. **Hash::make: Jangan Pernah Simpan Password Asli**
3. **Middleware auth: Pagar Otomatis**
4. **Keamanan Session**

---

## Tantangan

Perkuat autentikasi: (1) tambah halaman profil dengan link "Ubah Password" (password lama wajib + konfirmasi, gunakan Hash::check untuk verifikasi), (2) tampilkan badge "Login terakhir" dengan menyimpan timestamp di session saat login, (3) tambah rate limiting pada route login: ->middleware('throttle:5,1') dan amati error 429 setelah 5 percobaan gagal, (4) buat middleware EnsureEmailVerified yang memblokir dashboard sampai user "memverifikasi" email (simulasi dengan kolom email_verified_at).

---

## Ringkasan

Auth facade + Hash = identitas aman. Middleware auth = pagar. Session regenerate = anti-fixation. Lanjut: middleware & policies.
