# Arsitektur Event: Event Bubbling, Capturing & Event Delegation

> **Kategori:** JavaScript | **Level:** DOM, Event & Arsitektur Objek | **Minggu 7:** Arsitektur Event: Event Bubbling, Capturing & Event Delegation

## Tujuan Pembelajaran

- Memahami 3 fase Event: Capturing, Target, dan Bubbling Phase
- Menguasai teknik Event Delegation untuk efisiensi memori tinggi
- Menggunakan Element.closest() untuk deteksi target klik akurat
- Menghentikan perambatan event dengan event.stopPropagation()
- Mencegah aksi bawaan browser dengan event.preventDefault()

---

## Program: Papan Filter Tag E-Commerce Menggunakan Event Delegation

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Delegation Lab</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #F8FAFC; padding: 32px; }
    .container { max-width: 600px; margin: 0 auto; background: white; padding: 24px; border-radius: 16px; border: 1px solid #E2E8F0; }
    .tag-cloud { display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0; }
    .tag-btn { background: #E2E8F0; border: none; padding: 6px 14px; border-radius: 999px; cursor: pointer; font-size: 0.85rem; font-weight: 500; transition: all 0.2s; }
    .tag-btn.active { background: #2E5B44; color: white; }
    .log-panel { background: #0F172A; color: #38BDF8; font-family: monospace; padding: 16px; border-radius: 8px; font-size: 0.8rem; min-height: 100px; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Filter Tag Produk (Event Delegation)</h2>
    <div id="tag-container" class="tag-cloud">
      <button class="tag-btn" data-kategori="backend">Golang</button>
      <button class="tag-btn" data-kategori="backend">Rust</button>
      <button class="tag-btn" data-kategori="frontend">React</button>
      <button class="tag-btn" data-kategori="database">PostgreSQL</button>
    </div>
    <div class="log-panel" id="log-output">Klik salah satu tag di atas...</div>
  </div>

  <script>
    const tagContainer = document.getElementById("tag-container");
    const logOutput = document.getElementById("log-output");

    tagContainer.addEventListener("click", (event) => {
      const targetTombol = event.target.closest(".tag-btn");
      if (!targetTombol) return;

      targetTombol.classList.toggle("active");
      logOutput.textContent = "Tag: " + targetTombol.textContent + " | Status: " + (targetTombol.classList.contains("active") ? "AKTIF" : "NONAKTIF");
    });
  </script>
</body>
</html>
```

---

## Konsep Kunci

### Event Bubbling & Delegation
Saat sebuah elemen diklik, sinyal event memantul naik (*bubbles up*) dari anak ke seluruh leluhurnya hingga `window`.
Dengan **Event Delegation**, kita hanya mendaftarkan satu listener pada elemen kontainer induk, menghemat alokasi memori secara drastis.

---

---

## Penjelasan untuk Pemula

### Analogi: Bel Telepon Resepsionis
Event Delegation seperti bel telepon di meja resepsionis lobi: kamar hotel mana pun yang memencet tombol, deringnya berbunyi di meja resepsionis lobi utama.

## Eksperimen

- Klik tombol tag dan amati teks log yang berubah seketika.
- Klik di celah ruang kosong antara tag dan buktikan bahwa tidak ada error yang terjadi.
- Tambahkan tombol baru dengan appendChild dan buktikan tombol baru langsung aktif tanpa pasang listener baru.
- Uji event.stopPropagation() untuk melihat pemutusan jalur gelembung event.

---

## Tantangan

Bangun sistem tabel e-commerce di mana tombol hapus pada setiap baris ditangani hanya oleh 1 event listener di elemen `<tbody>`.

---

## Ringkasan

Kamu telah menguasai arsitektur event browser dan delegasi event. Minggu depan kita akan mempelajari pemrograman berorientasi objek dengan kelas ES6.
