# Aksesibilitas Web

> HTML5 | Modul 11

## Tujuan Pembelajaran

- Memahami prinsip WCAG: Perceivable, Operable, Understandable, Robust
- Menggunakan ARIA roles dan properties dengan benar
- Memastikan navigasi keyboard yang logis
- Menerapkan skip link dan focus management
- Menulis alt text yang deskriptif untuk gambar

---

## Program: Halaman Inklusif

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Halaman Inklusif - Aksesibilitas Web</title>
</head>
<body>
  <a href="#main" class="skip-link">Langsung ke konten utama</a>

  <header role="banner">
    <h1>Web Untuk Semua</h1>
    <nav role="navigation" aria-label="Navigasi utama">
      <ul>
        <li><a href="#about" aria-current="page">Tentang</a></li>
        <li><a href="#form">Form</a></li>
        <li><a href="#table">Data</a></li>
      </ul>
    </nav>
  </header>

  <main id="main" role="main">
    <section id="about" aria-labelledby="about-heading">
      <h2 id="about-heading">Aksesibilitas Web (A11y)</h2>
      <p>Aksesibilitas memastikan website dapat digunakan oleh <strong>semua orang</strong>, termasuk penyandang disabilitas.</p>

      <article aria-labelledby="wcag-heading">
        <h3 id="wcag-heading">4 Prinsip WCAG</h3>
        <ul>
          <li><strong>Perceivable</strong> — Informasi harus dapat diterima oleh setidaknya satu indra</li>
          <li><strong>Operable</strong> — Komponen UI harus dapat dioperasikan</li>
          <li><strong>Understandable</strong> — Informasi dan UI harus dapat dipahami</li>
          <li><strong>Robust</strong> — Konten harus kompatibel dengan berbagai alat bantu</li>
        </ul>
      </article>

      <article aria-labelledby="aria-heading">
        <h3 id="aria-heading">ARIA Roles & Properties</h3>
        <p>ARIA melengkapi semantic HTML untuk alat bantu seperti <em>screen reader</em>.</p>
        <div role="alert" aria-live="polite">
          <p>💡 Tip: Gunakan elemen semantic HTML dulu sebelum menambahkan ARIA.</p>
        </div>
      </article>
    </section>

    <section id="form" aria-labelledby="form-heading">
      <h2 id="form-heading">Form Aksesibel</h2>
      <form>
        <p>
          <label for="nama">Nama Lengkap <span aria-label="wajib">*</span>:</label>
          <input type="text" id="nama" name="nama" required aria-required="true" autocomplete="name">
        </p>
        <p>
          <label for="pesan">Pesan:</label>
          <textarea id="pesan" name="pesan" aria-describedby="pesan-hint"></textarea>
          <small id="pesan-hint">Tulis pesan Anda di sini.</small>
        </p>
        <p>
          <label for="negara">Negara:</label>
          <input type="text" id="negara" name="negara" list="negara-list" autocomplete="country-name">
          <datalist id="negara-list">
            <option value="Indonesia">
            <option value="Malaysia">
            <option value="Singapura">
          </datalist>
        </p>
        <button type="submit" aria-label="Kirim form">Kirim</button>
      </form>
    </section>

    <section id="table" aria-labelledby="table-heading">
      <h2 id="table-heading">Data dengan Aksesibilitas</h2>
      <table>
        <caption>Nilai Siswa - Semester 1</caption>
        <thead>
          <tr>
            <th scope="col">Nama</th>
            <th scope="col">HTML</th>
            <th scope="col">CSS</th>
            <th scope="col">JS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Budi</th>
            <td>85</td>
            <td>90</td>
            <td>78</td>
          </tr>
          <tr>
            <th scope="row">Siti</th>
            <td>92</td>
            <td>88</td>
            <td>95</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>

  <footer role="contentinfo">
    <p>&copy; 2026 Tryngo — Web untuk Semua</p>
  </footer>
</body>
</html>
```

---

## Penjelasan

Berikut penjelasan detail materi:

### WCAG 4 Prinsip
**Perceivable** — informasi harus bisa diterima oleh setidaknya satu indra. **Operable** — UI harus bisa dioperasikan. **Understandable** — informasi dan UI harus bisa dipahami. **Robust** — konten harus kompatibel dengan alat bantu.

### ARIA
`role` — peran elemen (banner, navigation, main, contentinfo). `aria-label` — label untuk elemen. `aria-labelledby` — hubungkan dengan elemen lain. `aria-describedby` — deskripsi tambahan. `aria-live` — region yang dinamis.

### Skip Link
Tautan tersembunyi yang muncul saat di-focus untuk keyboard user. Memungkinkan lompat ke konten utama langsung.

### Focus Management
Pastikan semua interaktif bisa diakses keyboard. Tab order logis. Focus style terlihat.

### Alt Text
Deskriptif dan kontekstual. Gambar dekoratif: `alt=""` (kosong). Gambar informatif: deskripsikan fungsi, bukan penampilan.

---

## Eksperimen

Tambah skip link yang muncul saat di-tab,Gunakan aria-expanded pada elemen yang bisa di-toggle,Implementasi role="tablist" untuk tab panel,Uji halaman dengan screen reader (NVDA atau VoiceOver)

---

## Tantangan

Buat halaman form yang sepenuhnya aksesibel dengan: skip link, ARIA roles pada semua section, aria-required pada field wajib, aria-describedby untuk hint, role="alert" untuk error messages, focus management (auto-focus ke field error), dan uji coba navigasi keyboard.

---

## Ringkasan

Aksesibilitas web bukan opsional — ini adalah hak. WCAG, ARIA, keyboard navigation, skip link, dan alt text memastikan website Anda dapat digunakan oleh semua orang, termasuk penyandang disabilitas. Modul selanjutnya: **HTML5 APIs** — fitur-fitur modern browser untuk aplikasi web yang lebih powerful.
