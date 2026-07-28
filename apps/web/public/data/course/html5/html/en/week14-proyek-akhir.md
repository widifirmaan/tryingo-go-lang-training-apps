# Final Project

> HTML5 | Module 14

## Learning Objectives

- Combine semantic HTML in multi-page structures
- Apply forms, validation, and multimedia
- Optimize SEO and accessibility
- Implement responsive design through HTML
- Build a portfolio-ready website

---

## Program: Personal Portfolio

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portofolio — Nama Anda</title>
  <meta name="description" content="Portofolio pribadi — Web Developer & Designer">
  <meta property="og:title" content="Portofolio | Nama Anda">
  <meta property="og:description" content="Portofolio pribadi website developer.">
  <meta property="og:image" content="https://placehold.co/1200x630/E34F26/fff?text=Portofolio">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%23E34F26'/><text x='16' y='23' font-size='20' text-anchor='middle' fill='white'>P</text></svg>">
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"Person","name":"Nama Anda","jobTitle":"Web Developer","url":"https://tryngo.com"}
  </script>
</head>
<body>
  <header role="banner">
    <nav aria-label="Navigasi utama">
      <ul>
        <li><a href="#home" aria-current="page">Home</a></li>
        <li><a href="#about">Tentang</a></li>
        <li><a href="#skills">Skill</a></li>
        <li><a href="#projects">Proyek</a></li>
        <li><a href="#contact">Kontak</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="home" aria-labelledby="home-title">
      <h1 id="home-title">Halo, Saya <strong>Nama Anda</strong></h1>
      <p>Web Developer & Designer</p>
      <figure>
        <img src="https://placehold.co/200x200/333/fff?text=Foto" alt="Foto profil Nama Anda" width="200" height="200" loading="eager">
        <figcaption>Foto profil</figcaption>
      </figure>
    </section>

    <section id="about" aria-labelledby="about-title">
      <h2 id="about-title">Tentang Saya</h2>
      <p>Saya seorang <strong>web developer</strong> yang bersemangat dalam menciptakan <em>pengalaman digital</em> yang inklusif dan mudah diakses.</p>
      <blockquote>
        <p>"Kode adalah puisi yang bisa dijalankan."</p>
      </blockquote>
    </section>

    <section id="skills" aria-labelledby="skills-title">
      <h2 id="skills-title">Keahlian</h2>
      <table>
        <caption>Daftar keahlian teknis</caption>
        <thead>
          <tr>
            <th scope="col">Kategori</th>
            <th scope="col">Teknologi</th>
            <th scope="col">Level</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Frontend</th><td>HTML5, CSS3, JavaScript</td><td>Mahir</td></tr>
          <tr><th scope="row">Backend</th><td>Go, Node.js</td><td>Menengah</td></tr>
          <tr><th scope="row">Tools</th><td>Git, VS Code, Figma</td><td>Mahir</td></tr>
        </tbody>
      </table>

      <h3>Kemampuan Teknis Detail</h3>
      <ul>
        <li><abbr title="HyperText Markup Language">HTML</abbr> — Semantic, Aksesibilitas, SEO</li>
        <li><abbr title="Cascading Style Sheets">CSS</abbr> — Flexbox, Grid, Animasi</li>
        <li>JavaScript — ES6+, DOM, Async</li>
      </ul>
    </section>

    <section id="projects" aria-labelledby="projects-title">
      <h2 id="projects-title">Proyek</h2>
      <article>
        <h3>Aplikasi Todo</h3>
        <figure>
          <img src="https://placehold.co/400x250/2E5B44/fff?text=Todo+App" alt="Screenshot aplikasi Todo" loading="lazy" width="400" height="250">
          <figcaption>Aplikasi manajemen tugas berbasis web</figcaption>
        </figure>
        <p>Dibangun dengan HTML5, CSS3, dan JavaScript. Menggunakan <strong>localStorage</strong> untuk persistensi data.</p>
        <ul>
          <li><a href="https://github.com" target="_blank">Lihat Source Code</a></li>
          <li><a href="#" target="_blank">Lihat Demo</a></li>
        </ul>
      </article>
      <article>
        <h3>Website Portofolio</h3>
        <figure>
          <img src="https://placehold.co/400x250/E34F26/fff?text=Portfolio" alt="Screenshot website portofolio" loading="lazy" width="400" height="250">
          <figcaption>Website portofolio pribadi responsif</figcaption>
        </figure>
        <p>Website ini sendiri! Semantic HTML, aksesibel, dan SEO-friendly.</p>
      </article>
    </section>

    <section id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title">Hubungi Saya</h2>
      <form action="#" method="post">
        <p>
          <label for="contact-name">Nama <span aria-label="wajib">*</span>:</label>
          <input type="text" id="contact-name" name="name" required minlength="3" autocomplete="name">
        </p>
        <p>
          <label for="contact-email">Email <span aria-label="wajib">*</span>:</label>
          <input type="email" id="contact-email" name="email" required autocomplete="email">
        </p>
        <p>
          <label for="contact-subject">Subjek:</label>
          <select id="contact-subject" name="subject">
            <optgroup label="Proyek">
              <option value="web">Pengembangan Web</option>
              <option value="design">Desain</option>
            </optgroup>
            <option value="lain">Lainnya</option>
          </select>
        </p>
        <p>
          <label for="contact-message">Pesan <span aria-label="wajib">*</span>:</label><br>
          <textarea id="contact-message" name="message" rows="5" cols="50" required minlength="10" placeholder="Tulis pesan..."></textarea>
        </p>
        <button type="submit">Kirim Pesan</button>
      </form>
    </section>
  </main>

  <aside>
    <h3>Media Sosial</h3>
    <ul>
      <li><a href="https://github.com" target="_blank" rel="noopener">GitHub</a></li>
      <li><a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a></li>
      <li><a href="mailto:email@example.com">Email</a></li>
    </ul>
  </aside>

  <footer role="contentinfo">
    <p>&copy; 2026 Nama Anda. Dibangun dengan <strong>HTML5</strong>.</p>
    <p><a href="#home">Kembali ke atas</a></p>
  </footer>
</body>
</html>
```

---

## Explanation

Here is a detailed explanation of the material:

### Architecture
A portfolio website combines ALL HTML5 concepts: semantic structure, navigation, forms, tables, multimedia, accessibility, SEO meta tags, and structured data.

### Semantic Structure
Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>` for clear layout. One `<h1>` per page.

### Accessibility
`role` attributes, `aria-label`, `aria-labelledby`, `aria-describedby`, skip link, `alt` text, form labels.

### SEO
Meta tags, Open Graph, Twitter Cards, canonical URL, structured data JSON-LD.

### Deploy
Upload to GitHub Pages, Netlify, or Vercel. Ensure valid HTML and accessible.

---

## Experiments

Add a second page "about.html" with your own content,Implement a project gallery with figure and figcaption,Add testimonials using blockquote with cite,Validate the page with W3C Validator

---

## Challenge

Build a 3-page personal portfolio website (Home, About, Projects) combining ALL HTML5 concepts: semantic layout, consistent navigation, contact form with validation, skills table, project gallery with figures, multimedia (intro video or audio), SEO meta tags, ARIA accessibility, structured data JSON-LD, and favicon. Deploy to GitHub Pages.

---

## Summary

Congratulations! You have completed the entire HTML5 curriculum. From basic structure to semantic HTML, from forms to accessibility, from multimedia to performance — you now have a solid HTML foundation. Next steps: dive into CSS3 and JavaScript to become a skilled frontend developer!
