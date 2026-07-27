# Final Project: Portfolio

> CSS | Module 10

## Learning Objectives

- Plan a responsive portfolio structure
- Combine Flexbox, Grid, and positioning in one page
- Apply consistent theming with Custom Properties
- Add interactivity with transitions and animations
- Optimize layout for mobile, tablet, and desktop

---

## Program: Portfolio Page

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Portofolio — Proyek Akhir</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @layer base, layout, components;
    @layer base {
      :root { --primary: #1572B6; --primary-dark: #0d4f82; --primary-light: #e3f0fa; --text: #333; --text-light: #666; --bg: #f0f4f8; --card: #fff; --radius: 12px; --shadow: 0 4px 20px rgba(0,0,0,0.08); --font: 'Inter', system-ui, sans-serif; }
      *, *::before, *::after { box-sizing: border-box; margin: 0; }
      body { font-family: var(--font); background: var(--bg); color: var(--text); line-height: 1.6; }
      img { max-width: 100%; display: block; }
      a { color: var(--primary); text-decoration: none; }
      a:hover { text-decoration: underline; }
    }
    @layer layout {
      .container { max-width: 1100px; margin: 0 auto; padding: 1rem; }
      .hero { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 4rem 1rem; background: linear-gradient(135deg, var(--primary), var(--primary-dark)); color: #fff; border-radius: 0 0 var(--radius) var(--radius); }
      .hero h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700; margin-bottom: 0.5rem; }
      .hero p { font-size: 1.2rem; opacity: 0.9; max-width: 600px; }
      .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; margin: 2rem 0; }
      .projects-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin: 2rem 0; }
      .contact { display: flex; flex-direction: column; gap: 1rem; align-items: center; padding: 3rem 1rem; background: var(--primary-dark); color: #fff; border-radius: var(--radius); margin: 2rem 0; }
      footer { text-align: center; padding: 2rem 0; color: var(--text-light); font-size: 0.9rem; }
      @media (min-width: 600px) { .projects-grid { grid-template-columns: 1fr 1fr; } }
      @media (min-width: 900px) { .projects-grid { grid-template-columns: 1fr 1fr 1fr; } }
    }
    @layer components {
      .skill-card { background: var(--card); padding: 1.5rem; border-radius: var(--radius); box-shadow: var(--shadow); text-align: center; transition: transform 0.3s ease, box-shadow 0.3s ease; }
      .skill-card:hover { transform: translateY(-5px); box-shadow: 0 8px 30px rgba(0,0,0,0.15); }
      .skill-card .icon { font-size: 2rem; margin-bottom: 0.5rem; }
      .skill-card h3 { font-size: 1rem; color: var(--primary); }
      .project-card { background: var(--card); border-radius: var(--radius); box-shadow: var(--shadow); overflow: hidden; transition: transform 0.3s ease; }
      .project-card:hover { transform: scale(1.02); }
      .project-card .thumb { height: 180px; background: linear-gradient(135deg, var(--primary-light), var(--primary)); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 2rem; font-weight: 700; }
      .project-card .body { padding: 1.5rem; }
      .project-card .body h3 { margin-bottom: 0.5rem; color: var(--primary); }
      .project-card .body p { color: var(--text-light); font-size: 0.9rem; }
      .btn { display: inline-block; padding: 0.8rem 2rem; background: var(--primary); color: #fff; border: none; border-radius: var(--radius); font-weight: 600; cursor: pointer; transition: background 0.3s ease, transform 0.2s ease; }
      .btn:hover { background: var(--primary-dark); transform: translateY(-2px); text-decoration: none; }
      .btn-outline { background: transparent; border: 2px solid #fff; }
      .btn-outline:hover { background: #fff; color: var(--primary); }
      .contact input, .contact textarea { width: 100%; max-width: 400px; padding: 0.8rem; border: none; border-radius: 8px; font-family: var(--font); }
      .contact form { display: flex; flex-direction: column; gap: 0.8rem; align-items: center; width: 100%; max-width: 400px; }
    }
  </style>
</head>
<body>
  <section class="hero">
    <h1>Halo, Saya Gita</h1>
    <p>Seorang desainer dan pengembang web yang menciptakan pengalaman digital yang indah dan responsif.</p>
    <div style="display:flex;gap:1rem;margin-top:1.5rem;flex-wrap:wrap;justify-content:center">
      <a href="#" class="btn">Lihat Proyek</a>
      <a href="#" class="btn btn-outline">Hubungi Saya</a>
    </div>
  </section>
  <div class="container">
    <section>
      <h2 style="color:var(--primary);margin:2rem 0 1rem;font-size:1.8rem">Keahlian</h2>
      <div class="skills-grid">
        <div class="skill-card"><div class="icon">🌐</div><h3>HTML5</h3></div>
        <div class="skill-card"><div class="icon">🎨</div><h3>CSS3</h3></div>
        <div class="skill-card"><div class="icon">⚡</div><h3>JavaScript</h3></div>
        <div class="skill-card"><div class="icon">📱</div><h3>Responsive</h3></div>
        <div class="skill-card"><div class="icon">🔧</div><h3>Flexbox &amp; Grid</h3></div>
        <div class="skill-card"><div class="icon">✨</div><h3>Animasi CSS</h3></div>
      </div>
    </section>
    <section>
      <h2 style="color:var(--primary);margin:2rem 0 1rem;font-size:1.8rem">Proyek</h2>
      <div class="projects-grid">
        <div class="project-card"><div class="thumb">01</div><div class="body"><h3>Landing Page</h3><p>Halaman landing responsif dengan Flexbox dan Grid.</p></div></div>
        <div class="project-card"><div class="thumb">02</div><div class="body"><h3>Dashboard</h3><p>Dashboard interaktif dengan animasi dan transisi.</p></div></div>
        <div class="project-card"><div class="thumb">03</div><div class="body"><h3>E-Commerce</h3><p>Toko online dengan layout grid dan filter produk.</p></div></div>
      </div>
    </section>
    <section class="contact">
      <h2 style="font-size:1.8rem;margin-bottom:0.5rem">Hubungi Saya</h2>
      <p style="opacity:0.85">Punya proyek? Mari diskusikan.</p>
      <form>
        <input type="text" placeholder="Nama Anda">
        <input type="email" placeholder="Email">
        <textarea rows="3" placeholder="Pesan"></textarea>
        <button class="btn" type="submit">Kirim Pesan</button>
      </form>
    </section>
  </div>
  <footer>&copy; 2026 Gita — Dibuat dengan CSS &amp; HTML</footer>
</body>
</html>
```

---

## Explanation

### Combining All Concepts

This final project demonstrates the integration of ALL CSS modules learned:

1. **Selectors & Cascade** (@layer for priority management)
2. **Box Model** (padding, margin, border-radius on every component)
3. **Text & Color** (Inter font from Google Fonts, gradient hero, consistent colors)
4. **Flow & Positioning** (hero as flex container, implicit z-index)
5. **Flexbox** (hero, contact section, buttons)
6. **CSS Grid** (skills-grid with auto-fit, projects-grid with media queries)
7. **Responsive Design** (clamp() for headings, 3 breakpoint layout, mobile-first)
8. **Motion & Animation** (hover transitions on skill cards and project cards, scale)
9. **Modern CSS** (Custom Properties for theming, @layer for cascade control)

### Page Structure

- **Hero Section**: Gradient background, clamp() heading, CTA buttons
- **Skills Section**: Responsive grid with auto-fit, hover effect
- **Projects Section**: 3-column grid (1/2/3 depending on viewport), card with thumbnail
- **Contact Section**: Simple form with input and textarea

### Tips

- Use `:root` for global theme variables
- Leverage `min-width` media queries for mobile-first
- Animate only transform and opacity for performance
- Test across different screen sizes

---

## Experiments

1. **Add new section** — add a "Testimonials" section with grid layout
2. **Change color theme** — replace `--primary` in :root with `#6c5ce7` (purple) and see the global change
3. **Hero animation** — add a fade-in animation on hero text when the page loads
4. **Advanced responsive** — add a breakpoint for landscape mode on mobile

---

## Challenge

Develop the example portfolio into your personal portfolio:
1. **Branding**: Change the color scheme, fonts, and profile photo
2. **Hero Section**: Add text animation and more engaging CTAs
3. **Skills**: Add skill levels (progress bars) for each skill
4. **Projects**: Add 4-6 real or fictional projects with screenshots
5. **Testimonials**: New section with scroll-snap slider
6. **Contact**: Form validation with :valid/:invalid pseudo-classes
7. **Footer**: Add social media links with icons
8. **Animation**: Add scroll reveal animations (using @keyframes with animation-play-state)

The final result must be responsive on mobile, tablet, and desktop.

---

## Summary

Congratulations! You've completed the entire CSS curriculum — from basic syntax to a full responsive portfolio. You now have a strong foundation for designing beautiful, responsive, and modern websites. Keep experimenting and building new projects!
