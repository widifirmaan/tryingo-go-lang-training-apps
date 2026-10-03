# Promises, Async/Await & Konsumsi HTTP REST API dengan Fetch

> **Kategori:** JavaScript | **Level:** Asinkron, Storage & Proyek Kanban | **Minggu 10:** Promises, Async/Await & Konsumsi HTTP REST API dengan Fetch

## Tujuan Pembelajaran

- Memahami 3 status Promise: Pending, Fulfilled, dan Rejected
- Menggunakan async/await untuk penulisan kode asinkron yang bersih
- Memahami bahwa fetch() tidak reject pada status HTTP 404/500
- Selalu memeriksa response.ok sebelum parsing JSON
- Menerapkan blok try-catch-finally untuk penanganan error tangguh

---

## Program: Klien Pemanggil API Publik GitHub dengan Penanganan Error Kuat

```javascript
async function ambilProfilGithub(username) {
  const url = "https://api.github.com/users/" + encodeURIComponent(username);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("HTTP Gagal dengan status: " + response.status);
    }
    const data = await response.json();
    console.log("Nama Pengguna:", data.name || data.login);
    console.log("Repositori   :", data.public_repos, "repositori");
    return data;
  } catch (error) {
    console.error("[ERROR]", error.message);
    return null;
  } finally {
    console.log("[SELESAI] Request jaringan ditutup.");
  }
}

ambilProfilGithub("torvalds");
```

---

## Konsep Kunci

### Async/Await & Fetch API
Kata kunci `async` menandai fungsi mengembalikan Promise, sementara `await` menjeda eksekusi fungsi secara non-blocking hingga Promise selesai.
Ingat: `fetch()` hanya melempar reject saat koneksi jaringan putus total, bukan saat server membalas dengan status 404 atau 500. Selalu periksa `response.ok`!

---

---

## Penjelasan untuk Pemula

### Analogi: Bel Getar di Kafe
Promise seperti bel pager nirkabel yang diberikan kasir kafe: saat menunggu kopi diracik (**Pending**), saat kopi siap bel bergetar (**Fulfilled**), dan jika kopi habis barista mengembalikan uang (**Rejected**).

## Eksperimen

- Panggil username yang tidak ada dan amati pesan error status 404.
- Gunakan Promise.all untuk mengambil dua profil sekaligus secara paralel.
- Matikan koneksi internet untuk melihat TypeError yang ditangkap blok catch.
- Perhatikan bahwa blok finally selalu berjalan di akhir.

---

## Tantangan

Buat fungsi `cariRepo(keyword)` yang mengambil repositori terpopuler dari GitHub API dan mengembalikan array 3 proyek teratas.

---

## Ringkasan

Kamu telah menguasai konsumsi API jaringan dengan async/await dan Fetch API. Minggu depan kita akan mendalami penyimpanan data lokal browser.
