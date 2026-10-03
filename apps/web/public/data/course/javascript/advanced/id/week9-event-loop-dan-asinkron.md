# Arsitektur Asinkron: Event Loop V8, Call Stack & Task Queues

> **Kategori:** JavaScript | **Level:** Asinkron, Storage & Proyek Kanban | **Minggu 9:** Arsitektur Asinkron: Event Loop V8, Call Stack & Task Queues
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami bahwa JavaScript adalah Single-Threaded berbasis Call Stack non-blocking
- Menguasai anatomi Event Loop: Call Stack, Microtasks, dan Macrotasks
- Memahami prioritas eksekusi Promise (Microtask) di atas setTimeout (Macrotask)
- Mencegah pembekuan thread browser (UI freeze) dengan pemrosesan asinkron
- Memanfaatkan queueMicrotask() untuk penjadwalan tugas prioritas tinggi

---

## Program: Simulasi Alur Antrean Event Loop (Microtasks vs Macrotasks)

```javascript
console.log("1. [Synchronous] Kode sinkron Call Stack dimulai.");

setTimeout(() => {
  console.log("4. [Macrotask - setTimeout] Berjalan di antrean macrotask.");
}, 0);

Promise.resolve().then(() => {
  console.log("3. [Microtask - Promise] Diproses sebelum Macrotask!");
});

console.log("2. [Synchronous] Kode sinkron Call Stack selesai.");
```

---

## Konsep Kunci

### Event Loop V8
JavaScript mengeksekusi kode sinkron pada Call Stack. Saat operasi asinkron selesai:
- Callback **Promise** masuk ke **Microtask Queue** (prioritas tertinggi).
- Callback **setTimeout** masuk ke **Macrotask Queue** (prioritas standar).
Seluruh antrean Microtask wajib dikosongkan terlebih dahulu sebelum browser beralih ke Macrotask berikutnya.

---

---

## Penjelasan untuk Pemula

### Analogi: Dokter dan Pasien Gawat Darurat
Call Stack adalah dokter yang sedang memeriksa pasien. Microtask adalah ambulans gawat darurat yang langsung ditangani dokter lebih dulu. Macrotask (setTimeout) adalah pasien antrean umum yang menunggu giliran dengan tertib.

## Eksperimen

- Jalankan kode dan amati urutan pencetakan 1 -> 2 -> 3 -> 4.
- Ubah waktu setTimeout dari 0 ke 500ms untuk melihat penundaan.
- Uji pemanggilan queueMicrotask() untuk verifikasi prioritas.
- Bandingkan waktu eksekusi kode sinkron vs asinkron di konsol.

---

## Tantangan

Buat fungsi `delay(ms)` berbasis Promise yang me-resolve setelah `ms` milidetik menggunakan setTimeout.

---

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Perilaku Equality Lemah (== vs ===)
- **Gejala / Masalah:** Coercion tipe data tak terduga (misal `0 == ''` bernilai `true`).
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu gunakan operator strict equality (`===` dan `!==`).

### 2. Mutasi Objek & Array secara Langsung
- **Gejala / Masalah:** Perubahan state tidak terdeteksi oleh reactive framework atau memicu bug sampingan tak terduga.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan spread operator (`{ ...obj }`, `[...arr]`) atau metode immutable seperti `.map()`, `.filter()`, dan `.toSorted()`.

### 3. Unhandled Promise Rejection & Async/Await tanpa Try-Catch
- **Gejala / Masalah:** Aplikasi crash atau thread backend macet tanpa log error yang jelas.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu bungkus `await` dalam blok `try { ... } catch (err) { ... }`.

---

## Ringkasan

Kamu telah menguasai arsitektur V8 Event Loop. Minggu depan kita akan mendalami pemanggilan API HTTP dengan Promises, async/await, dan Fetch API.
