# Dialog, Details, dan Template

> **Kategori:** HTML5 | **Level:** Form dan Interaksi | **Minggu 7:** Dialog, Details, dan Template
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Membuat komponen akordeon buka-tutup (FAQ) native tanpa JavaScript menggunakan <details> dan <summary>
- Membuat jendela pop-up modal native browser menggunakan tag <dialog>
- Mengontrol dialog modal dengan method standar .showModal() dan .close()
- Memahami fungsi tag <template> dan <slot> sebagai kerangka cetak biru elemen yang tidak langsung dirender
- Mengintegrasikan komponen interaktif ke dalam struktur proyek website

---

## 1. Komponen Akordeon Native: <details> dan <summary>

Sering kali kita ingin membuat daftar tanya-jawab (FAQ) yang bisa diklik untuk membuka atau menutup jawabannya. Di HTML5, Anda tidak memerlukan JavaScript untuk fitur ini:
```html
<details>
  <summary>Berapa lama proses pembuatan website?</summary>
  <p>Proses pengerjaan berkisar antara 3 hingga 14 hari kerja tergantung jumlah halaman.</p>
</details>
```
- **`<details>`**: Wadah pembungkus yang secara native dapat membuka dan menutup kontennya.
- **`<summary>`**: Teks judul yang selalu terlihat dan bertindak sebagai tombol klik.

---

## 2. Jendela Modal Pop-Up Native: <dialog>

HTML5 menyediakan tag `<dialog>` untuk membuat jendela pop-up modal:
```html
<dialog id="modal-info">
  <h2>Pemberitahuan</h2>
  <p>Permintaan pesan Anda telah berhasil dikirim!</p>
  <button id="tutup-modal">Tutup</button>
</dialog>
```
Untuk membukanya sebagai modal dengan latar belakang gelap (*backdrop*), cukup panggil method native di tombol:
```html
<button onclick="document.getElementById('modal-info').showModal()">Buka Info</button>
<button onclick="document.getElementById('modal-info').close()">Tutup</button>
```

---

## 3. Tag Cetak Biru: <template> dan <slot>
- **`<template>`**: Kode HTML di dalam tag ini **tidak dirender oleh browser saat halaman dimuat**. Tag ini bertindak sebagai cetak biru yang baru ditampilkan saat diduplikasi oleh script.
- **`<slot>`**: Tempat penampung isi konten pada Web Components.

---

## Program: Akordeon FAQ Native dan Modal Dialog

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FAQ dan Informasi — Alex Pratama</title>
  <style>
    body { font-family: sans-serif; max-width: 680px; margin: 30px auto; padding: 0 16px; line-height: 1.6; color: #1e293b; }
    nav { background: #f1f5f9; padding: 10px 16px; border-radius: 6px; margin-bottom: 24px; }
    nav a { text-decoration: none; color: #0284c7; font-weight: bold; margin-right: 14px; }
    details { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px 16px; margin-bottom: 12px; }
    summary { font-weight: bold; cursor: pointer; color: #0f172a; }
    details[open] { background: #ffffff; border-color: #0284c7; }
    details p { margin: 10px 0 0; color: #475569; }
    dialog { border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px; max-width: 400px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
    dialog::backdrop { background: rgba(15, 23, 42, 0.6); }
    .btn-action { background: #0284c7; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold; }
    footer { margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 12px; color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <header>
    <nav>
      <a href="index.html">Beranda</a>
      <a href="layanan.html">Layanan</a>
      <a href="kontak.html">Kontak</a>
    </nav>
    <h1>Pertanyaan Umum (FAQ)</h1>
  </header>

  <main>
    <section>
      <h2>Tanya Jawab Seputar Layanan</h2>

      <details>
        <summary>Apakah website yang dibuat sudah ramah perangkat seluler?</summary>
        <p>Ya, seluruh dokumen HTML dilengkapi dengan tag meta viewport dan struktur layout yang fleksibel untuk layar ponsel.</p>
      </details>

      <details>
        <summary>Berapa lama estimasi pengerjaan website?</summary>
        <p>Estimasi standar berkisar antara 3 hari untuk paket dasar hingga 14 hari kerja untuk paket kustom.</p>
      </details>

      <details>
        <summary>Apakah kode HTML yang dihasilkan valid dan semantik?</summary>
        <p>Seluruh dokumen mematuhi standar HTML5 resmi W3C dengan struktur tag semantik lengkap.</p>
      </details>
    </section>

    <section style="margin-top: 24px;">
      <h2>Konsultasi Cepat</h2>
      <button class="btn-action" onclick="document.getElementById('modal-kontak').showModal()">
        Buka Kontak Singkat
      </button>

      <dialog id="modal-kontak">
        <h3>Kontak Singkat Studio</h3>
        <p>Anda dapat menghubungi kami langsung melalui email:</p>
        <p><strong>alex@example.com</strong></p>
        <button class="btn-action" onclick="document.getElementById('modal-kontak').close()">Tutup</button>
      </dialog>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Alex Pratama. Komponen Interaktif Native.</p>
  </footer>
</body>
</html>
```

---

## Bedah Detail Kode Program

- Line 28-39: Tag `<details>` dan `<summary>` menghasilkan akordeon buka-tutup tanpa satu baris pun JavaScript.
- Line 46-51: Tag `<dialog>` menghasilkan modal popup native lengkap dengan latar backdrop gelap bawaan browser.
- Line 43 & 50: Pemanggilan method native `.showModal()` dan `.close()` mengontrol visibilitas dialog.

---

## Eksperimen di Playground

1. Ubah teks atau data pada kode program di Playground dan amati hasil perubahannya secara instan.
2. Coba tambahkan elemen baru sesuai kebutuhan halaman Anda.
3. Uji tampilan kode di ukuran layar yang berbeda untuk memeriksa kelenturan layout.

---

## Tantangan Praktik

Terapkan konsep Minggu 7 ini pada file proyek Anda sendiri. Pastikan kode memiliki kurung sudut lengkap, tag penutup yang benar, serta penamaan class atau id yang rapi.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Menggunakan method `.show()` alih-alih `.showModal()` pada dialog (method `.show()` tidak mengaktifkan backdrop modal).
- Lupa memberikan tag `<summary>` di dalam `<details>` (browser akan menampilkan teks default "Details").
- Mencoba menampilkan konten `<template>` langsung tanpa bantuan script kloning DOM.

---

## Ringkasan

- Modul Minggu 7 (Dialog, Details, dan Template) melatih pemahaman struktural secara praktis.
- Seluruh kode yang dipelajari mematuhi standar HTML valid dan dapat langsung dijalankan di browser maupun Playground.
- Di modul berikutnya, kita akan melanjutkan langkah pembangunan proyek ke tingkat materi selanjutnya.
