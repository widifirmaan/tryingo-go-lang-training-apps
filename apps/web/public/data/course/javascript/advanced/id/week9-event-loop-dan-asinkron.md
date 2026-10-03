# Arsitektur Asinkron: Event Loop V8, Call Stack & Task Queues

> **Kategori:** JavaScript | **Level:** Asinkron, Storage & Proyek Kanban | **Minggu 9:** Arsitektur Asinkron: Event Loop V8, Call Stack & Task Queues

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

## Ringkasan

Kamu telah menguasai arsitektur V8 Event Loop. Minggu depan kita akan mendalami pemanggilan API HTTP dengan Promises, async/await, dan Fetch API.
