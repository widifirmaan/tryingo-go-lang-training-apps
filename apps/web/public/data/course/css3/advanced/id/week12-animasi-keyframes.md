# Animasi Keyframes

> **Kategori:** CSS3 | **Level:** Sistem CSS, Animasi & Proyek Akhir | **Minggu 12:** Animasi Keyframes
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami aturan deklarasi @keyframes menggunakan persentase tahapan (0% hingga 100%)
- Menguasai sub-properti animation: name, duration, timing-function, delay, iteration-count, dan direction
- Menggunakan animation-iteration-count: infinite untuk animasi berulang terus-menerus
- Memahami peran animation-fill-mode: forwards untuk mempertahankan posisi akhir animasi
- Membangun komponen UI produksi: loading spinner, denyut sinyal (pulse), dan banner masuk

---

## 1. Anatomi Aturan @keyframes

Berbeda dari transisi yang membutuhkan pemicu interaksi pengguna (seperti `:hover`), animasi CSS dapat berjalan otomatis dan memiliki alur bertingkat banyak:

```css
/* 1. Definisi Rangkaian Gerakan */
@keyframes putarPenuh {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 2. Pengikatan ke Elemen */
.spinner {
  animation: putarPenuh 1s linear infinite;
}
```

---

## 2. Properti Kontrol Animasi

- **`animation-name`**: Nama dari aturan `@keyframes` yang dituju.
- **`animation-duration`**: Waktu yang dibutuhkan untuk menyelesaikan satu siklus animasi (misal: `2s`).
- **`animation-timing-function`**: Karakter akselerasi (`ease`, `linear`, `ease-in-out`).
- **`animation-iteration-count`**: Jumlah pengulangan (angka spesifik seperti `3` atau `infinite` untuk berputar terus).
- **`animation-direction`**: Arah alur (`normal`, `reverse`, `alternate` untuk bolak-balik).
- **`animation-fill-mode`**: Menentukan gaya elemen sebelum mulai atau setelah selesai:
  - `forwards`: Mempertahankan gaya frame 100% setelah animasi berakhir.

---

## 3. Shorthand Animasi

```css
/* animation: name duration timing-function delay iteration-count direction fill-mode; */
.notifikasi {
  animation: meluncurMasuk 0.4s ease-out 0.2s 1 normal forwards;
}
```

---

## Program: Pustaka Animasi UI: Spinner Berputar, Denyut Sinyal, dan Notifikasi Masuk

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Animasi Keyframes</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF9;
      color: #2D3748;
      padding: 40px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 32px;
      min-height: 100vh;
    }

    .demo-box {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      width: 100%;
      max-width: 440px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    /* ── 1. ANIMASI SPINNER BERPUTAR ── */
    @keyframes spinCircle {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .loading-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid #E2E8F0;
      border-top-color: #2E5B44;
      border-radius: 50%;
      animation: spinCircle 0.8s linear infinite;
    }

    /* ── 2. ANIMASI DENYUT SINYAL (PULSE) ── */
    @keyframes pulseLive {
      0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(46, 91, 68, 0.7);
      }
      70% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba(46, 91, 68, 0);
      }
      100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(46, 91, 68, 0);
      }
    }

    .status-badge {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      font-weight: 600;
      color: #2E5B44;
    }

    .pulse-dot {
      width: 12px;
      height: 12px;
      background-color: #2E5B44;
      border-radius: 50%;
      animation: pulseLive 1.8s infinite;
    }

    /* ── 3. ANIMASI MELUNCUR MASUK (SLIDE-IN) ── */
    @keyframes slideInUp {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .toast-notification {
      background-color: #2E5B44;
      color: #FFFFFF;
      border-radius: 8px;
      padding: 14px 20px;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 10px 15px -3px rgba(46, 91, 68, 0.2);
      animation: slideInUp 0.5s ease-out forwards;
    }
  </style>
</head>
<body>

  <!-- Demo 1: Spinner -->
  <div class="demo-box">
    <div>
      <h4 style="margin-bottom: 4px;">Indikator Loading</h4>
      <p style="font-size: 13px; color: #718096;">Putaran linear berulang terus-menerus</p>
    </div>
    <div class="loading-spinner"></div>
  </div>

  <!-- Demo 2: Pulse Signal -->
  <div class="demo-box">
    <div>
      <h4 style="margin-bottom: 4px;">Status Koneksi Sistem</h4>
      <p style="font-size: 13px; color: #718096;">Efek denyut box-shadow dinamis</p>
    </div>
    <div class="status-badge">
      <span class="pulse-dot"></span>
      Online
    </div>
  </div>

  <!-- Demo 3: Slide-in Notification -->
  <div class="toast-notification">
    ✓ Data sinkronisasi berhasil disimpan ke server.
  </div>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `@keyframes spinCircle`: Memutar elemen 360 derajat secara konstan menggunakan `transform: rotate(360deg)`.
- `.loading-spinner`: Memanfaatkan border lingkaran dengan satu sisi berwarna hijau `#2E5B44` yang diputar oleh animasi `infinite`.
- `@keyframes pulseLive`: Mengombinasikan `scale` dan penyebaran `box-shadow` dengan transparansi alpha untuk mensimulasikan gelombang denyut sinyal.
- `@keyframes slideInUp`: Menganimasikan opacity dari 0 ke 1 dan pergeseran `translateY(20px)` ke posisi netral `0`.
- `animation-fill-mode: forwards`: Memastikan notifikasi tetap tampil di posisi akhirnya setelah durasi 0.5 detik selesai tanpa kembali hilang.

---

## Eksperimen di Playground

1. Ubah nilai warna, padding, atau margin pada kode program di Playground dan perhatikan perubahan tata letaknya secara langsung.
2. Coba tambahkan aturan gaya baru sesuai kebutuhan komponen halaman Anda.
3. Kecilkan dan perlebar jendela preview untuk memeriksa respon layout terhadap ukuran layar yang bervariasi.

---

## Tantangan Praktik

Terapkan konsep Minggu 12 ini pada file styles.css proyek Anda. Pastikan selektor tidak menggunakan !important, perhatikan spesifisitas, dan gunakan satuan rem untuk konsistensi hierarki.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Lupa menentukan animation-duration: Jika durasi tidak diatur (default 0s), animasi tidak akan pernah terlihat berjalan.
- Lupa animation-fill-mode: forwards: Tanpa forwards, elemen yang masuk akan melompat kembali ke kondisi sebelum animasi saat selesai.
- Terlalu banyak animasi bersamaan: Terlalu banyak elemen bergerak di satu halaman membingungkan fokus pengguna dan membebani baterai perangkat.
- Mengabaikan preferensi pengguna (prefers-reduced-motion): Pengguna dengan gangguan vestibular membutuhkan opsi mematikan animasi gerak berlebih.

---

## Ringkasan

- Modul Minggu 12 (Animasi Keyframes) melatih pemahaman konsep dan penataan gaya visual secara terstruktur.
- Kode CSS mematuhi standar W3C dan langsung dapat diuji serta dimodifikasi di browser dan CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan fitur dan komponen visual hingga proyek website utuh terselesaikan.
