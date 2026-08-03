# Middleware: Pipeline Request

> Node.js | Express & Web API | Pelajaran 7

## Tujuan Pembelajaran

- Menjelaskan konsep pipeline middleware (req, res, next)
- Menulis middleware kustom: logging, auth, 404
- Memakai middleware pada route tertentu
- Menangani error terpusat dengan error middleware

---

## Program: Middleware: Pipeline Request

```js
// Middleware: pipeline request -> response
// Jalankan: node server.js

const express = require('express');
const app = express();

app.use(express.json());

// 1) Middleware logging kustom
app.use((req, res, next) => {
  const waktu = new Date().toISOString();
  console.log(`[${waktu}] ${req.method} ${req.url}`);
  next(); // WAJIB: teruskan ke middleware berikutnya
});

// 2) Middleware autentikasi sederhana (proteksi route tertentu)
function butuhToken(req, res, next) {
  const token = req.headers['x-auth-token'];
  if (token !== 'rahasia123') {
    return res.status(401).json({ error: 'Token tidak valid' });
  }
  next();
}

// 3) Middleware spesifik route: hitung durasi
app.get('/catatan', (req, res, next) => {
  req.mulai = Date.now();
  next();
}, (req, res) => {
  // Data sementara (akan diganti database di pelajaran 9)
  const data = [
    { id: 1, judul: 'Catatan 1', selesai: false },
    { id: 2, judul: 'Catatan 2', selesai: true },
  ];
  res.json({ data, durasiMs: Date.now() - req.mulai });
});

// 4) Route publik vs terproteksi
app.get('/publik', (req, res) => {
  res.json({ pesan: 'Semua orang bisa akses' });
});

app.get('/rahasia', butuhToken, (req, res) => {
  res.json({ pesan: 'Anda punya token yang benar!' });
});

// 5) Middleware 404: menangkap semua route yang tidak ada
app.use((req, res) => {
  res.status(404).json({ error: 'Route tidak ditemukan' });
});

// 6) Middleware error: 4 argumen (err, req, res, next)
app.use((err, req, res, next) => {
  console.error('ERROR:', err.message);
  res.status(500).json({ error: 'Terjadi kesalahan server' });
});

app.listen(3000, () => console.log('Server middleware di :3000'));
```

---

## Penjelasan

## Middleware: Konsep Inti Express
Middleware adalah fungsi yang menerima (req, res, next) dan berjalan BERTAHAP: setiap middleware bisa membaca/mengubah req & res, lalu memanggil next() untuk meneruskan ke tahap berikutnya. Bayangkan jalur produksi: setiap stasiun menangani satu tugas. express.json() sendiri adalah middleware - begitu juga morgan (logging), helmet (keamanan).
## Urutan Pemasangan = Urutan Eksekusi
Middleware dipanggil sesuai urutan app.use/route yang didaftarkan. Logging harus dipasang paling awal (agar mencatat semua). 404 middleware dipasang di PALING AKHIR (setelah semua route). Jika urutan salah, perilaku aplikasi salah - pola debugging klasik di Express adalah memeriksa urutan middleware.
## next() dan Aliran Kontrol
Panggil next() untuk lanjut; jangan panggil next() jika respons sudah dikirim (akan double response - bug umum). Lewati nilai ke next(err) untuk melompat langsung ke error middleware. Middleware yang TIDAK memanggil next dan TIDAK mengirim respons akan menggantung request.
## Auth via Middleware
Pola butuhToken: cek header, jika gagal → 401 (return! jangan next), jika sukses → next(). Ini pola untuk JWT di pelajaran 11: middleware verifikasi token, lalu route handler jalan. Satu middleware bisa dipasang di banyak route - proteksi API tanpa menduplikasi kode.

---

## Eksperimen

1. **Middleware: Konsep Inti Express**
2. **Urutan Pemasangan = Urutan Eksekusi**
3. **next() dan Aliran Kontrol**
4. **Auth via Middleware**

---

## Tantangan

Bangun middleware "rate limiter" sederhana: batasi maksimal 3 request per menit per IP (simpan hitungan di Map). Jika melebihi, balas 429 Too Many Requests. Pasang pada route /rahasia. Uji dengan 5 request berturut-turut dan catat status code tiap request.

---

## Ringkasan

Middleware = pipeline (req, res, next). Urutan pemasangan menentukan perilaku. 404 & error handler di akhir. Auth = middleware. Lanjut: REST API & MVC.
