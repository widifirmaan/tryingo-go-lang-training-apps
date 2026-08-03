# HTTP Module & Web Server

> Node.js | Express & Web API | Pelajaran 5

## Tujuan Pembelajaran

- Membaca request: method, path, query, body
- Menulis response: status code, header, JSON
- Membangun routing manual dengan http murni
- Memahami keterbatasan http murni (kenapa butuh Express)

---

## Program: HTTP Module & Web Server

```js
// Web server dengan modul http murni (tanpa framework)
// Jalankan: node server.js lalu buka preview

const http = require('node:http');
const { URL } = require('node:url');

// Data in-memory sederhana (belum database - pelajaran 9)
const catatan = [
  { id: 1, judul: 'Belajar Node', selesai: false },
  { id: 2, judul: 'Belajar Express', selesai: true },
];

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost:3000');
  const method = req.method;

  // Helper untuk kirim JSON
  const kirimJson = (status, data) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  // ROUTING manual: method + path
  if (method === 'GET' && url.pathname === '/') {
    return kirimJson(200, { pesan: 'API Catatan Sederhana' });
  }

  if (method === 'GET' && url.pathname === '/catatan') {
    return kirimJson(200, catatan);
  }

  if (method === 'GET' && url.pathname.startsWith('/catatan/')) {
    const id = Number(url.pathname.split('/')[2]);
    const item = catatan.find((c) => c.id === id);
    if (!item) return kirimJson(404, { error: 'Catatan tidak ditemukan' });
    return kirimJson(200, item);
  }

  // Ambil body dari POST (manual - pelajaran 6 pakai express.json)
  if (method === 'POST' && url.pathname === '/catatan') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      const baru = JSON.parse(body || '{}');
      baru.id = catatan.length + 1;
      catatan.push(baru);
      kirimJson(201, baru);
    });
    return;
  }

  kirimJson(404, { error: 'Route tidak ditemukan: ' + method + ' ' + url.pathname });
});

server.listen(3000, () => {
  console.log('Server http murni berjalan di http://localhost:3000');
});
```

---

## Penjelasan

## Anatomi Request & Response
Setiap request punya: method (GET/POST/PUT/DELETE), url (path + query), headers, dan body (untuk POST/PUT). Response punya: status code (200 OK, 201 Created, 404 Not Found, 500 Error), headers (Content-Type), dan body. Bootcamp yang baik melatih ini DULU dengan http murni, sebelum framework menyembunyikannya.
## Status Code yang Wajib Dihafal
2xx sukses (200 OK, 201 Created, 204 No Content), 3xx redirect, 4xx error client (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found), 5xx error server (500). API yang benar mengembalikan status code yang TEPAT - bukan hanya 200 untuk semuanya.
## Routing Manual: Penderitaan yang Mendidik
Lihat betapa banyak kode untuk 5 route? Setiap route butuh: cek method, cek path, parsing id, helper JSON. Bayangkan 50 route. Inilah tepatnya yang Express otomatiskan. Tapi Anda sekarang PAHAM apa yang terjadi di balik layar - kebanyakan developer framework tidak pernah mengerti request-response cycle.
## Body Parsing Manual
POST body datang sebagai stream (data/end) - Anda menggabungkan chunk lalu JSON.parse. Ini membuka konsep penting: request body adalah stream, bukan string jadi. Express.json() melakukan ini untuk Anda, tapi sekarang Anda tahu persis apa yang dilakukannya.

---

## Eksperimen

1. **Anatomi Request & Response**
2. **Status Code yang Wajib Dihafal**
3. **Routing Manual: Penderitaan yang Mendidik**
4. **Body Parsing Manual**

---

## Tantangan

Perluas API catatan: (1) tambah route PUT /catatan/:id untuk mengubah judul, (2) route DELETE /catatan/:id untuk menghapus, (3) validasi: POST dengan body kosong mengembalikan 400. Uji semua route dengan curl/POST (di terminal playground atau dengan fetch di preview). Tuliskan status code tiap route.

---

## Ringkasan

Request = method + url + headers + body. Status code wajib tepat. Routing manual mahal - itulah kenapa Express ada. Body = stream. Lanjut: Express dan routing.
