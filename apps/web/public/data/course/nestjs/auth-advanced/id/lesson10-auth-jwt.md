# Autentikasi JWT

> NestJS | Auth & Lanjutan | Pelajaran 10

## Tujuan Pembelajaran

- Menjelaskan alur JWT: login, token, verifikasi
- Menggunakan @nestjs/jwt untuk sign & verify token
- Menulis JwtAuthGuard untuk melindungi route
- Membaca user dari token di handler (req.user)

---

## Program: Autentikasi JWT

```ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

// DEMO: user di memori. Di produksi: tabel users (pelajaran 7-8)
// dengan password di-hash bcrypt (jangan pernah simpan plain text!).
const USERS: User[] = [
  { id: 1, username: 'admin', password: 'rahasia123', role: 'admin' },
  { id: 2, username: 'siswa', password: 'rahasia123', role: 'siswa' },
];

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(username: string, password: string) {
    const user = USERS.find(
      (u) => u.username === username && u.password === password,
    );
    if (!user) {
      throw new UnauthorizedException('Username atau password salah');
    }
    const payload = { sub: user.id, username: user.username, role: user.role };
    // Sign: server menandatangani token (stateless - server tak simpan sesi)
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, user: { id: user.id, username: user.username, role: user.role } };
  }

  cariById(id: number): User | undefined {
    return USERS.find((u) => u.id === id);
  }
}
```

---

## Penjelasan

## Alur JWT: Stateless Authentication
Login (POST /api/auth/login) → server memverifikasi kredensial → server SIGN token (payload + secret) → client menyimpan token dan mengirimnya di header Authorization: Bearer <token> di setiap request → JwtAuthGuard VERIFY token (tanpa menyentuh database!) → request.user diisi. Stateless: server tidak menyimpan sesi - token membawa identitasnya sendiri. Ini yang membuat API bisa di-scale horizontal tanpa shared session store.
## JwtModule: Konfigurasi Sekali
JwtModule.register({ secret, expiresIn: '1h' }) tersedia di seluruh AuthModule (dan modul yang mengimport-nya lewat exports). Payload yang umum: sub (user id), username, role. Jangan masukkan password atau data sensitif ke token - token bisa dibaca siapa pun (hanya TANDA TANGAN-nya yang aman).
## JwtAuthGuard: Verifikasi di Setiap Request
Guard membaca header Authorization, mengecek prefix Bearer, verify token dengan secret yang sama, lalu menempelkan payload ke request.user. Token expired/cacat = UnauthorizedException (401). Pola ini setara middleware butuhToken di track Node.js - tapi sekarang dibungkus arsitektur Nest dan bisa dikombinasikan dengan RolesGuard (pelajaran 9).
## Keamanan yang Wajib
Secret JWT = kartu identitas server: simpan di env, jangan pernah di git (pelajaran 12). Hash password dengan bcrypt/argon2 sebelum simpan. Masa berlaku pendek (1h) + refresh token untuk sesi panjang. HTTPS wajib di produksi - token lewat HTTP polos = token bocor.

---

## Eksperimen

1. **Alur JWT: Stateless Authentication**
2. **JwtModule: Konfigurasi Sekali**
3. **JwtAuthGuard: Verifikasi di Setiap Request**
4. **Keamanan yang Wajib**

---

## Tantangan

Lengkapi sistem auth: (1) ganti penyimpanan password plain text dengan hash bcrypt (npm i bcryptjs) - bandingkan login lama vs baru, (2) tambah POST /api/auth/refresh yang mengeluarkan token baru dari token lama yang masih valid, (3) proteksi route DELETE /catatan/:id dengan JwtAuthGuard + RolesGuard sekaligus (kombinasi @UseGuards ganda), (4) uji: tanpa token (401), token salah (401), token benar (200).

---

## Ringkasan

JWT = stateless auth. Login sign token, guard verify. request.user dari payload. Secret di env, password di-hash. Lanjut: interceptors.
