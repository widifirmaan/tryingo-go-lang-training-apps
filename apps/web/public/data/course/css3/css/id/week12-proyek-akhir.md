# Proyek Akhir: Landing Page

> **Kategori:** CSS3 | **Level:** CSS3 Lengkap | **Minggu 12:** Proyek Akhir: Landing Page

## Tujuan Pembelajaran

- Menggabungkan semua konsep: variables, flexbox, grid, responsive, animasi
- BEM naming convention untuk maintainability
- Sticky navbar dengan backdrop
- Hero section dengan gradient dan fluid typography
- Responsive grid layout dengan auto-fit

---

## Program: Landing Page Profesional

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page — Tech Startup</title>
    <style>
        :root {
            --primary: #2E5B44;
            --primary-light: #4CAF50;
            --text: #333;
            --text-light: #666;
            --bg: #fff;
            --bg-alt: #f5f5f5;
            --radius: 8px;
            --shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            font-family: 'Segoe UI', sans-serif;
            color: var(--text);
            line-height: 1.6;
        }

        /* Navbar */
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 40px;
            background: var(--bg);
            box-shadow: var(--shadow);
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .navbar__logo { font-size: 1.5rem; font-weight: 700; color: var(--primary); }
        .navbar__links { display: flex; gap: 30px; list-style: none; }
        .navbar__links a { text-decoration: none; color: var(--text); }

        /* Hero */
        .hero {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 80vh;
            background: linear-gradient(135deg, var(--primary), var(--primary-light));
            color: white;
            text-align: center;
            padding: 40px 20px;
        }

        .hero__title { font-size: clamp(2rem, 5vw, 4rem); margin-bottom: 20px; }
        .hero__subtitle { font-size: clamp(1rem, 2vw, 1.5rem); opacity: 0.9; margin-bottom: 30px; }

        .btn {
            padding: 15px 30px;
            border: none;
            border-radius: var(--radius);
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s;
        }

        .btn--light { background: white; color: var(--primary); }
        .btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }

        /* Features */
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
            padding: 80px 40px;
            background: var(--bg-alt);
        }

        .feature-card {
            background: white;
            padding: 30px;
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            text-align: center;
            transition: transform 0.3s;
        }

        .feature-card:hover { transform: translateY(-5px); }
        .feature-card__icon { font-size: 2.5rem; margin-bottom: 15px; }
        .feature-card__title { color: var(--primary); margin-bottom: 10px; }

        /* CTA */
        .cta {
            text-align: center;
            padding: 80px 40px;
            background: var(--primary);
            color: white;
        }

        .cta__title { font-size: 2rem; margin-bottom: 20px; }

        /* Footer */
        .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 30px 40px;
            background: #1a1a1a;
            color: #aaa;
        }

        .footer__links { display: flex; gap: 20px; list-style: none; }
        .footer__links a { color: #aaa; text-decoration: none; }

        /* Responsive */
        @media (max-width: 768px) {
            .navbar { flex-direction: column; gap: 15px; }
            .navbar__links { flex-wrap: wrap; justify-content: center; }
            .features { padding: 40px 20px; }
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="navbar__logo">TechCo</div>
        <ul class="navbar__links">
            <li><a href="#features">Fitur</a></li>
            <li><a href="#cta">Harga</a></li>
            <li><a href="#kontak">Kontak</a></li>
        </ul>
    </nav>

    <section class="hero">
        <div>
            <h1 class="hero__title">Build Something Amazing</h1>
            <p class="hero__subtitle">Platform modern untuk developer yang ingin berkarya lebih cepat.</p>
            <button class="btn btn--light">Mulai Sekarang</button>
        </div>
    </section>

    <section class="features" id="features">
        <div class="feature-card">
            <div class="feature-card__icon">⚡</div>
            <h3 class="feature-card__title">Cepat</h3>
            <p>Performa tinggi dengan optimasi modern.</p>
        </div>
        <div class="feature-card">
            <div class="feature-card__icon">🔒</div>
            <h3 class="feature-card__title">Aman</h3>
            <p>Keamanan enterprise-grade built-in.</p>
        </div>
        <div class="feature-card">
            <div class="feature-card__icon">📱</div>
            <h3 class="feature-card__title">Responsive</h3>
            <p>Tampil sempurna di semua perangkat.</p>
        </div>
    </section>

    <section class="cta" id="cta">
        <h2 class="cta__title">Siap memulai?</h2>
        <p style="margin-bottom:20px;">Bergabung dengan 10,000+ developer.</p>
        <button class="btn btn--light">Daftar Gratis</button>
    </section>

    <footer class="footer">
        <p>&copy; 2026 TechCo</p>
        <ul class="footer__links">
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </footer>
</body>
</html>
```

---

## Konsep Kunci

### Proyek Akhir
Gabungan semua 11 minggu sebelumnya dalam satu landing page profesional.

### Komponen
- Sticky navbar dengan flexbox
- Hero section dengan gradient + fluid typography
- Features grid dengan auto-fit + hover animation
- CTA section
- Footer dengan flexbox
- Fully responsive
- BEM naming
- CSS variables untuk theming

---

## Eksperimen

- Tambah dark mode toggle
- Buat hamburger menu untuk mobile
- Tambah scroll animations
- Buat halaman tambahan: about atau pricing
- Tambah testimonial carousel

---

## Tantangan

Buat multi-page website: landing, about, pricing, contact — dengan CSS konsisten dan fully responsive.

---

## Ringkasan

Minggu 12 dari 12: **Proyek Akhir: Landing Page** (Level: CSS3 Lengkap). Selesai! 🎉 Anda sudah menguasai CSS3 dari nol hingga mahir.
