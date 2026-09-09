# Advanced Auth — KTP & Satpam Warung

> **Kategori:** Next.js | **Level:** Lanjutan | **Minggu 10:** Advanced Auth & Security
> **Prasyarat:** Minggu 9 — **Database & ORM**.

## Tujuan Pembelajaran

- `NextAuth` / `Auth.js` — KTP digital: `signIn`, `session`, lindungi `/admin` dengan `auth()`

---

## Kenapa Ini Penting Buat Kamu?

Tanpa auth, `/admin` dibuka siapa saja → harga diubah iseng. Dengan NextAuth + `auth()` di Server Component, 5 baris lindungi + session siap pakai.

---

## Program: KTP Warung

```bash
npm install next-auth
```

```javascript
// auth.js
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
export const { handlers, auth, signIn } = NextAuth({
  providers: [Credentials({
    credentials: { email: {}, password: {} },
    authorize: async (c) => c.email === "admin@warung.com" && c.password === "123" ? { id: "1", name: "Admin" } : null
  })]
});

// app/api/auth/[...nextauth]/route.js — WAJIB agar login jalan!
import { handlers } from "@/auth";
export const { GET, POST } = handlers;

// app/admin/page.js
import { auth } from "@/auth";
export default async function Admin(){
  const session = await auth();
  if (!session) return <p>Belum login — <a href="/login">Login</a></p>;
  return <p>Halo {session.user.name} — Admin Warung</p>;
}
```


---

## Penjelasan untuk Pemula

### Analogi: KTP Digital Warung
- **Tanpa auth = warung tanpa satpam**: siapa saja buka `/admin` → ubah harga iseng.
- **NextAuth = KTP digital + satpam otomatis**: `signIn` cetak KTP (JWT), `auth()` cek tiap halaman server. `[...nextauth]/route.js` = kantor KTP (tanpa ini login TAK JALAN!).

### Langkah 0 — Siapkan Device
- Sama W1 track ini (lihat minggu 1 untuk install).

### Cara Komputer Membaca
- `auth()` di Server Component baca session; tanpa session tampilkan login.

### 3 Istilah Wajib
- 1. **NextAuth/session**: KTP/periksa

## Eksperimen

- **Hijau:** Buka `/login` → apa yang tampil? Coba ID lain → bedanya apa?
- **Kuning:** Ubah huruf besar-kecil `session` → masih jalan atau error?
- **Merah:** Hapus baris `import NextAuth from "next-auth";` → error apa? Pasang lagi.

## Tantangan

**Advanced Auth di Warungmu:** pakai `/login` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `/login`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Database & ORM** (Minggu 9): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Ringkasan

Minggu 10: **KTP Digital** — NextAuth lindungi admin. Minggu depan: **Deployment**.
