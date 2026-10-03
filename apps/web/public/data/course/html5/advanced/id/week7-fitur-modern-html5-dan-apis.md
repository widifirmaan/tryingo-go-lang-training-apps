# Elemen Interaktif Modern: Dialog, Details, Template & Canvas

> **Kategori:** HTML5 | **Level:** Formulir Modern, Aksesibilitas & Web API | **Minggu 7:** Elemen Interaktif Modern: Dialog, Details, Template & Canvas

## Tujuan Pembelajaran

- Memanfaatkan elemen <dialog> native dengan method showModal() dan form method="dialog"
- Memahami penanganan fokus keyboard dan tombol ESC otomatis pada elemen <dialog>
- Membuat menu akordion murni tanpa JavaScript menggunakan pasangan <details> dan <summary>
- Memahami fungsi elemen <template> sebagai fragmen DOM pasif yang efisien untuk rendering dinamis
- Menyematkan elemen <canvas> dengan teks fallback aksesibel untuk rendering visual grafis 2D

---

## Program: Implementasi Komponen Modal Dialog Native & Kartu Interaktif

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Komponen Modern HTML5 — Nusa Digital</title>
</head>
<body>
  <main>
    <article>
      <h1>Eksplorasi Komponen Native Modern HTML5</h1>
      <p>Fitur canggih yang kini didukung langsung oleh browser tanpa ketergantungan library eksternal.</p>

      <!-- 1. Native Modal Dialog -->
      <section>
        <h2>1. Modal Dialog Native (<dialog>)</h2>
        <p>Dialog modal native menangani fokus keyboard, tombol ESC, dan backdrop secara otomatis:</p>
        
        <button type="button" onclick="document.getElementById('confirm-modal').showModal()">
          Buka Dialog Konfirmasi
        </button>

        <dialog id="confirm-modal" aria-labelledby="modal-title">
          <form method="dialog">
            <h3 id="modal-title">Konfirmasi Deployment Produksi</h3>
            <p>Apakah Anda yakin ingin mempublikasikan rilis versi 2.4.0 ke klaster produksi utama?</p>
            <menu>
              <button value="cancel">Batal</button>
              <button value="confirm">Ya, Publikasikan Sekarang</button>
            </menu>
          </form>
        </dialog>
      </section>

      <!-- 2. Accordion Semantik dengan <details> dan <summary> -->
      <section>
        <h2>2. Tanya Jawab Interaktif (<details>)</h2>
        <details>
          <summary><strong>Berapa lama SLA penanganan insiden darurat?</strong></summary>
          <p>Tim On-Call Engineering kami menjamin tanggapan awal di bawah 15 menit untuk insiden berstatus Severity-1.</p>
        </details>
        <details>
          <summary><strong>Apakah data disimpan di yurisdiksi Indonesia?</strong></summary>
          <p>Ya, seluruh data tersimpan pada data center tier-4 bersertifikasi ISO di Jakarta dan Jawa Barat.</p>
        </details>
      </section>

      <!-- 3. Template HTML yang Tidak Langsung Dirender (<template>) -->
      <section>
        <h2>3. Cetak Biru Komponen (<template>)</h2>
        <p>Konten di dalam tag template tidak dirender saat halaman dimuat, siap dikloning oleh JavaScript:</p>
        
        <template id="card-template">
          <div class="user-card">
            <h4>Nama Pengguna</h4>
            <p>Peran: Teknisi Sistem</p>
          </div>
        </template>
        <p><small>Template di atas tersimpan aman di memori browser tanpa menampilkan artefak visual.</small></p>
      </section>

      <!-- 4. Bidang Gambar Bitmap Native (<canvas>) -->
      <section>
        <h2>4. Area Render Grafis (<canvas>)</h2>
        <canvas id="status-chart" width="400" height="150">
          Grafik batang visualisasi beban trafik server Nusa Digital berada pada kapasitas aman 35%.
        </canvas>
      </section>
    </article>
  </main>
</body>
</html>
```

---

## Konsep Kunci

### Elemen Dialog Native (<dialog>)
Dahulu, pembuatan modal popup membutuhkan ratusan baris library JavaScript rumit untuk mengatur fokus tabulasi dan backdrop overlay. Elemen `<dialog>` menyelesaikan masalah ini secara native:
- Memanggil `dialog.showModal()` membuka dialog sebagai modal tingkat atas (*top layer*) lengkap dengan elemen `::backdrop`.
- Tombol `ESC` otomatis menutup dialog modal.
- Form dengan `method="dialog"` menutup modal secara otomatis saat tombol diklik dan mengembalikan nilai tombol tersebut.

### Pasangan <details> dan <summary>
Elemen `<details>` menyediakan interaktivitas buka-tutup bawaan. Tag `<summary>` bertindak sebagai tombol pembuka yang dapat diakses penuh melalui tombol spasi/enter keyboard. Atribut `open` dapat disematkan jika ingin konten terbuka secara default saat halaman dimuat.

### Elemen <template>
Isi di dalam `<template>` sepenuhnya *inert* (pasif): gambar di dalamnya tidak akan diunduh dan script tidak akan dieksekusi sampai elemen tersebut dikloning ke dalam dokumen aktif oleh JavaScript.

---

---

## Penjelasan untuk Pemula

### Analogi: Panggung Teater dan Ruang Ganti
1. **`<dialog>`** seperti aktor yang melangkah maju ke depan panggung dengan lampu sorot: seluruh panggung di belakangnya otomatis gelap (*backdrop*) dan perhatian penonton hanya tertuju pada sang aktor sampai adegan selesai.
2. **`<details>`** seperti laci meja kantor: Anda bisa menariknya untuk melihat isi di dalam, lalu mendorongnya kembali agar meja tetap rapi.
3. **`<template>`** seperti cetakan kue di lemari dapur: cetakannya sendiri bukan makanan, tapi alat untuk mencetak kue sebanyak yang diinginkan saat pesta dimulai.

## Eksperimen

- Klik tombol "Buka Dialog Konfirmasi", lalu tekan tombol Escape pada keyboard untuk melihat penutupan modal otomatis tanpa sebaris pun kode JS penutup.
- Tambahkan atribut open pada elemen <details> dan amati bagaimana akordion langsung terbuka saat halaman pertama kali dimuat.
- Coba periksa elemen <template> di panel Developer Tools Elements dan perhatikan bagaimana kontennya disimpan dalam fragmen #document-fragment.
- Gunakan tombol TAB saat modal terbuka untuk memverifikasi bahwa kursor fokus terkunci rapi di dalam dialog (Focus Trap native).

---

## Tantangan

Buat halaman galeri fitur produk yang memiliki tombol "Kebijakan Garansi" pembuka `<dialog>` modal, akordion spesifikasi teknis menggunakan `<details>`, dan elemen `<canvas>` status baterai perangkat dengan teks deskripsi fallback.

---

## Ringkasan

Kamu telah menguasai fitur-fitur mutakhir HTML5 native seperti dialog top-layer, widget details, dan template memori. Minggu depan adalah proyek capstone: membangun portal produk multi-halaman berkinerja tinggi dan 100% lulus audit aksesibilitas!
