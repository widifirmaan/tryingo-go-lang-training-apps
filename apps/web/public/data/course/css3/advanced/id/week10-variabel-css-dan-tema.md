# Variabel CSS dan Sistem Tema

> **Kategori:** CSS3 | **Level:** Sistem CSS, Animasi & Proyek Akhir | **Minggu 10:** Variabel CSS dan Sistem Tema
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami deklarasi CSS Custom Properties (Variabel CSS) di pseudo-class :root
- Mengambil dan menggunakan nilai variabel dengan fungsi var() serta nilai fallback
- Memahami cakupan (scope) variabel CSS: variabel global vs variabel lokal komponen
- Membangun sistem tema Light Mode dan Dark Mode berbasis atribut data-theme
- Menerapkan deteksi preferensi sistem operasi pengguna dengan @media (prefers-color-scheme)

---

## 1. Deklarasi dan Penggunaan Variabel CSS

CSS Custom Properties (Variabel CSS) memungkinkan penyimpanan nilai yang dapat digunakan ulang di seluruh stylesheet:

```css
/* 1. Deklarasi Global di :root (Elemen Tertinggi Dokumen) */
:root {
  --primary: #2E5B44;
  --bg-page: #F8FAF9;
  --text-main: #1A202C;
  --radius-md: 8px;
}

/* 2. Penggunaan dengan var() */
.btn {
  background-color: var(--primary);
  border-radius: var(--radius-md);
  color: #FFFFFF;
}

/* 3. Fallback jika variabel tidak ditemukan */
.teks {
  color: var(--warna-khusus, #333333);
}
```

---

## 2. Cakupan Global vs Lokal

- **Global Scope (`:root`)**: Variabel tersedia untuk seluruh elemen di halaman.
- **Local Scope (Selektor Komponen)**: Variabel hanya berlaku di dalam elemen tersebut dan anak-anaknya:

```css
.kartu-peringatan {
  --primary: #C53030; /* Menimpa nilai --primary khusus untuk kartu ini */
  border-color: var(--primary);
}
```

---

## 3. Sistem Tema: Light & Dark Mode

Dengan variabel CSS, beralih antara tema terang dan gelap menjadi sangat sederhana tanpa perlu menulis ulang ratusan selektor:

```css
/* Tema Terang (Default) */
:root {
  --bg-body: #FFFFFF;
  --text-body: #1A202C;
  --card-bg: #F7FAFC;
}

/* Tema Gelap via Atribut */
[data-theme="dark"] {
  --bg-body: #121417;
  --text-body: #EDF2F7;
  --card-bg: #1A202C;
}

body {
  background-color: var(--bg-body);
  color: var(--text-body);
}
```

---

## Program: Sistem Tema Terang dan Gelap Menggunakan Variabel CSS

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Variabel CSS dan Tema</title>
  <style>
    /* 1. Token Desain Tema Terang (Default) */
    :root {
      --bg-canvas: #F4F6F4;
      --bg-surface: #FFFFFF;
      --text-heading: #1A202C;
      --text-muted: #4A5568;
      --border-subtle: #E2E8F0;
      --brand-primary: #2E5B44;
      --brand-accent: #3D7A5B;
      --shadow-elevation: 0 4px 6px -1px rgba(0, 0, 0, 0.06);
    }

    /* 2. Token Desain Tema Gelap */
    [data-theme="dark"] {
      --bg-canvas: #121513;
      --bg-surface: #1E2320;
      --text-heading: #F7FAFC;
      --text-muted: #A0AEC0;
      --border-subtle: #2D3748;
      --brand-primary: #48BB78;
      --brand-accent: #68D391;
      --shadow-elevation: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: var(--bg-canvas);
      color: var(--text-heading);
      padding: 32px;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: background-color 0.25s ease, color 0.25s ease;
    }

    /* 3. Kartu yang Mengonsumsi Variabel */
    .theme-card {
      background-color: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 14px;
      padding: 28px;
      max-width: 440px;
      box-shadow: var(--shadow-elevation);
      transition: background-color 0.25s ease, border-color 0.25s ease;
    }

    .theme-card h2 {
      font-size: 20px;
      color: var(--text-heading);
      margin-bottom: 8px;
    }

    .theme-card p {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 24px;
    }

    /* 4. Tombol Aksi */
    .btn-toggle {
      background-color: var(--brand-primary);
      color: #FFFFFF;
      border: none;
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .btn-toggle:hover {
      background-color: var(--brand-accent);
    }
  </style>
</head>
<body>

  <div class="theme-card">
    <h2>Sistem Desain Token Mandiri</h2>
    <p>Seluruh warna antarmuka ini dikontrol oleh CSS Custom Properties. Klik tombol di bawah untuk menguji pergantian nilai token tema secara instan.</p>
    <button class="btn-toggle" onclick="toggleTheme()">Ganti Tema (Dark / Light)</button>
  </div>

  <script>
    function toggleTheme() {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    }
  </script>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `:root { --brand-primary: #2E5B44; ... }`: Menyimpan palet warna dasar dokumen sebagai token yang dapat dipakai ulang di setiap komponen.
- `[data-theme="dark"]`: Menimpa nilai token warna untuk mode gelap tanpa perlu mengubah selektor komponen `.theme-card` atau `.btn-toggle`.
- `var(--bg-canvas)` dan `var(--bg-surface)`: Mengonsumsi nilai variabel secara dinamis sehingga seluruh halaman langsung bereaksi saat tema berubah.
- `transition: background-color 0.25s ease`: Memberikan animasi peralihan warna yang halus saat pengguna mengklik tombol ganti tema.
- `onclick="toggleTheme()"`: Skrip sederhana untuk mendemonstrasikan perubahan atribut data-theme di elemen <html>.

---

## Eksperimen di Playground

1. Ubah nilai warna, padding, atau margin pada kode program di Playground dan perhatikan perubahan tata letaknya secara langsung.
2. Coba tambahkan aturan gaya baru sesuai kebutuhan komponen halaman Anda.
3. Kecilkan dan perlebar jendela preview untuk memeriksa respon layout terhadap ukuran layar yang bervariasi.

---

## Tantangan Praktik

Terapkan konsep Minggu 10 ini pada file styles.css proyek Anda. Pastikan selektor tidak menggunakan !important, perhatikan spesifisitas, dan gunakan satuan rem untuk konsistensi hierarki.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Lupa tanda dua strip (--): Setiap nama variabel CSS wajib diawali dengan tanda dua strip seperti --primary, bukan primary.
- Nama variabel bersifat Case-Sensitive: Variabel --WarnaUtama dan --warnautama dianggap sebagai dua variabel yang berbeda oleh browser.
- Lupa menyediakan fallback saat memanggil var(): Jika variabel belum dideklarasikan dan tidak ada fallback, properti akan diabaikan dan kembali ke nilai default browser.
- Mendeklarasikan variabel di selektor yang salah: Mendeklarasikan variabel di dalam kelas .card membuatnya tidak bisa diakses oleh elemen header di luarnya.

---

## Ringkasan

- Modul Minggu 10 (Variabel CSS dan Sistem Tema) melatih pemahaman konsep dan penataan gaya visual secara terstruktur.
- Kode CSS mematuhi standar W3C dan langsung dapat diuji serta dimodifikasi di browser dan CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan fitur dan komponen visual hingga proyek website utuh terselesaikan.
