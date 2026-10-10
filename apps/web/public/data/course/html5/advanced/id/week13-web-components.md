# Web Components: Custom Elements dan Template

> **Kategori:** HTML5 | **Level:** Framework UI | **Minggu 13:** Web Components: Custom Elements dan Template
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami standar Web Components sebagai masa depan HTML native tanpa ketergantungan framework besar
- Membuat Custom Elements (<user-card>, <site-header>) menggunakan JavaScript class dan customElements.define()
- Mengisolasi gaya visual dan DOM menggunakan Shadow DOM (attachShadow)
- Memanfaatkan tag <template> dan <slot> untuk menyusun komponen yang dapat digunakan berulang kali
- Menggunakan library Web Components siap pakai seperti Shoelace (<sl-button>, <sl-dialog>)

---

## 1. Apa Itu Web Components?

Web Components adalah teknologi native browser yang memungkinkan pengembang **membuat tag HTML kustom sendiri**.
Contoh: Daripada menulis `<div class="kartu-profil">`, Anda dapat membuat tag sendiri bernama `<kartu-profil>`!

### Tiga Pilar Web Components:
1. **Custom Elements:** Standar untuk mendaftarkan nama tag HTML baru (wajib memiliki tanda hubung, contoh: `<info-box>`).
2. **Shadow DOM:** Mengisolasi CSS di dalam komponen agar tidak bocor dan tidak merusak styling halaman utama.
3. **HTML Templates (`<template>` & `<slot>`):** Kerangka kode yang dapat diisi konten dinamis.

---

## 2. Cara Membuat Custom Element Sederhana
```javascript
class KartuInfo extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div style="border: 1px solid #cbd5e1; padding: 16px; border-radius: 8px;">
        <h3>${this.getAttribute('judul') || 'Judul Default'}</h3>
        <p>${this.textContent}</p>
      </div>
    `;
  }
}
customElements.define('kartu-info', KartuInfo);
```
Setelah didaftarkan, Anda dapat menggunakan tag tersebut langsung di file HTML:
```html
<kartu-info judul="Pengumuman Penting">Ini adalah teks pengumuman kustom.</kartu-info>
```

---

## 3. Web Components Siap Pakai: Shoelace
Anda tidak selalu harus menulis Web Components dari nol. Ada pustaka Web Components siap pakai bernama **Shoelace**:
```html
<sl-button variant="primary">Tombol Shoelace</sl-button>
<sl-dialog label="Dialog Kustom">...</sl-dialog>
```

---

## Program: Pembuatan dan Penggunaan Custom Element <kartu-layanan>

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Web Components Native — Alex Pratama</title>
  <style>
    body { font-family: sans-serif; max-width: 680px; margin: 30px auto; padding: 0 16px; line-height: 1.6; color: #1e293b; }
    header { border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 24px; }
  </style>
</head>
<body>

  <header>
    <h1>Web Components Native</h1>
    <p>Membuat tag HTML kustom sendiri menggunakan standar resmi Custom Elements.</p>
  </header>

  <main>
    <h2>Komponen Kartu Kustom</h2>
    
    <!-- MENGGUNAKAN TAG KUSTOM KITA SENDIRI -->
    <kartu-layanan judul="Pembuatan Website" paket="Dasar">
      Membangun struktur dokumen HTML5 semantik dan terstruktur.
    </kartu-layanan>

    <kartu-layanan judul="Integrasi Framework" paket="Bisnis">
      Penyusunan antarmuka responsif menggunakan Bootstrap atau Bulma.
    </kartu-layanan>
  </main>

  <!-- DEFINISI JAVASCRIPT CUSTOM ELEMENT -->
  <script>
    class KartuLayanan extends HTMLElement {
      connectedCallback() {
        const judul = this.getAttribute('judul') || 'Layanan';
        const paket = this.getAttribute('paket') || 'Standar';
        const deskripsi = this.innerHTML;

        this.innerHTML = `
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <h3 style="margin: 0; color: #0284c7; font-size: 16px;">${judul}</h3>
              <span style="background: #0284c7; color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">${paket}</span>
            </div>
            <p style="margin: 0; font-size: 14px; color: #475569;">${deskripsi}</p>
          </div>
        `;
      }
    }

    // Daftarkan nama tag kustom ke browser
    customElements.define('kartu-layanan', KartuLayanan);
  </script>

  <footer>
    <p>&copy; 2026 Alex Pratama. Custom Elements HTML Standar.</p>
  </footer>

</body>
</html>
```

---

## Bedah Detail Kode Program

- Line 20-26: Penggunaan tag kustom `<kartu-layanan>` langsung di dalam dokumen HTML.
- Line 30-49: Definisi kelas JavaScript turunan `HTMLElement` yang mengatur isi komponen.
- Line 52: `customElements.define('kartu-layanan', KartuLayanan)` mendaftarkan tag ke sistem browser.

---

## Eksperimen di Playground

1. Ubah teks atau data pada kode program di Playground dan amati hasil perubahannya secara instan.
2. Coba tambahkan elemen baru sesuai kebutuhan halaman Anda.
3. Uji tampilan kode di ukuran layar yang berbeda untuk memeriksa kelenturan layout.

---

## Tantangan Praktik

Terapkan konsep Minggu 13 ini pada file proyek Anda sendiri. Pastikan kode memiliki kurung sudut lengkap, tag penutup yang benar, serta penamaan class atau id yang rapi.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Menamai tag kustom tanpa tanda hubung (nama tag kustom WAJIB memiliki setidaknya satu tanda minus/hubung, misal: `<my-card>`, bukan `<mycard>`).
- Lupa memanggil method `customElements.define()` sebelum atau setelah tag ditulis.
- Mengubah struktur DOM di dalam constructor alih-alih di dalam lifecycle `connectedCallback()`.

---

## Ringkasan

- Modul Minggu 13 (Web Components: Custom Elements dan Template) melatih pemahaman struktural secara praktis.
- Seluruh kode yang dipelajari mematuhi standar HTML valid dan dapat langsung dijalankan di browser maupun Playground.
- Di modul berikutnya, kita akan melanjutkan langkah pembangunan proyek ke tingkat materi selanjutnya.
