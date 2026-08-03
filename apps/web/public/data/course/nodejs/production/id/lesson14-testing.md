# Testing API: Jest & Supertest

> Node.js | Produksi & Capstone | Pelajaran 14

## Tujuan Pembelajaran

- Membedakan unit test dan integration test
- Menulis test API dengan Jest dan Supertest
- Menguji skenario sukses DAN error (404, 400)
- Menjelaskan pola test yang andal: deskriptif, cepat, independen

---

## Program: Testing API: Jest & Supertest

```js
// Aplikasi yang akan dites (dipisahkan dari server agar bisa di-supertest)
// Jalankan test: npm test

const express = require('express');
const app = express();
app.use(express.json());

// Data dengan fungsi terpisah agar mudah di-unit-test
const buatCatatan = (judul) => ({ id: Date.now(), judul, selesai: false });

const data = [
  { id: 1, judul: 'Belajar Jest', selesai: true },
  { id: 2, judul: 'Belajar Supertest', selesai: false },
];

app.get('/catatan', (req, res) => {
  const { selesai } = req.query;
  let hasil = data;
  if (selesai !== undefined) hasil = data.filter((c) => c.selesai === (selesai === 'true'));
  res.json(hasil);
});

app.get('/catatan/:id', (req, res) => {
  const item = data.find((c) => c.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Tidak ditemukan' });
  res.json(item);
});

app.post('/catatan', (req, res) => {
  const { judul } = req.body;
  if (!judul || typeof judul !== 'string') {
    return res.status(400).json({ error: 'judul wajib: string' });
  }
  const baru = buatCatatan(judul.trim());
  data.push(baru);
  res.status(201).json(baru);
});

app.delete('/catatan/:id', (req, res) => {
  const idx = data.findIndex((c) => c.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Tidak ditemukan' });
  data.splice(idx, 1);
  res.status(204).end();
});

module.exports = app; // ekspor untuk supertest (server listen di file lain)
module.exports.buatCatatan = buatCatatan; // ekspor helper untuk unit test
```

---

## Penjelasan

## Mengapa Test? Kepercayaan Diri yang Bisa Dihitung
Test bukan untuk "mengejar 100% coverage" - ia untuk memberanikan Anda mengubah kode. Tanpa test, refactor = berdoa. Dengan test, Anda bisa memindahkan 50 baris dan tahu persis kalau perilaku berubah. Bootcamp produksi menjadikan test bagian dari definisi "selesai", bukan bonus.
## Unit Test vs Integration Test
Unit: menguji SATU fungsi murni (buatCatatan) - cepat, tanpa jaringan. Integration: menguji API end-to-end (supertest memanggil app Express tanpa listen) - verifikasi routing, middleware, status code, dan respons JSON. Keduanya saling melengkapi: unit untuk logika, integration untuk kontrak HTTP.
## Pola Test yang Baik (AAA)
Arrange (siapkan input), Act (panggil fungsi/endpoint), Assert (periksa hasil). Deskripsi test harus bercerita: 'mengembalikan 404 untuk id yang tidak ada'. Assert yang TEPAT: periksa status code DAN body, bukan hanya "tidak error". Test error sama pentingnya dengan test sukses - 400, 404, 401, 429 adalah kontrak API.
## Independen & Deterministik
Setiap test harus berdiri sendiri: jangan bergantung pada urutan eksekusi atau state test lain (reset data di beforeEach). Test yang bergantung = test yang kadang gagal tanpa sebab. Jalankan npm test di CI (pelajaran 16): setiap push kode yang memecahkan test = build merah, dan itu melindungi seluruh tim.

---

## Eksperimen

1. **Mengapa Test? Kepercayaan Diri yang Bisa Dihitung**
2. **Unit Test vs Integration Test**
3. **Pola Test yang Baik (AAA)**
4. **Independen & Deterministik**

---

## Tantangan

Tulis test untuk skenario yang belum tercakup: (1) POST /catatan dengan judul berupa angka (400), (2) GET /catatan?selesai=false hanya item belum selesai, (3) POST lalu DELETE catatan baru (alur hidup lengkap), (4) test unit untuk helper buatCatatan (pindahkan ke modul terpisah agar bisa di-require). Jalankan npm test sampai semua hijau.

---

## Ringkasan

Test = keberanian refactor. Unit vs integration. AAA + deskripsi bercerita. Test error = kontrak API. Independen & deterministik. Lanjut: performa & skalabilitas.
