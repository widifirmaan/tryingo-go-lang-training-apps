# Penyimpanan Browser: LocalStorage, SessionStorage & Serialisasi JSON

> **Kategori:** JavaScript | **Level:** Asinkron, Storage & Proyek Kanban | **Minggu 11:** Penyimpanan Browser: LocalStorage, SessionStorage & Serialisasi JSON
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Membedakan LocalStorage (permanen) vs SessionStorage (sementara per tab)
- Memahami kuota penyimpanan Web Storage (~5MB) dan batasan tipe data teks
- Menguasai serialisasi JSON.stringify() dan deserialisasi JSON.parse()
- Membangun kelas abstraksi penyimpanan untuk mencegah bentrokan kunci
- Menangani error kuota penuh dengan blok try-catch pelindung

---

## Program: Engine Penyimpanan State Aplikasi dengan Enkapsulasi LocalStorage

```javascript
class StorageManager {
  static simpan(kunci, nilai) {
    try {
      localStorage.setItem(kunci, JSON.stringify(nilai));
      return true;
    } catch (e) {
      console.error("Gagal menyimpan ke storage:", e);
      return false;
    }
  }

  static ambil(kunci, fallback = null) {
    try {
      const data = localStorage.getItem(kunci);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }
}

// Uji Simpan dan Baca
StorageManager.simpan("preferensi_user", { tema: "dark", fontSize: 16 });
const saved = StorageManager.ambil("preferensi_user");
console.log("Tema tersimpan:", saved.tema);
```

---

## Konsep Kunci

### Web Storage & Serialisasi JSON
LocalStorage menyimpan data permanen di browser pengguna. Karena Web Storage hanya menerima tipe teks string murni, data objek atau array wajib diserialisasi menggunakan `JSON.stringify()` sebelum disimpan dan dibaca kembali dengan `JSON.parse()`.

---

---

## Penjelasan untuk Pemula

### Analogi: Lemari Arsip Pribadi
LocalStorage seperti lemari brankas di rumah: dokumen penting yang Anda simpan di lemari tetap aman ada di sana meskipun Anda mematikan lampu dan tidur nyenyak.

## Eksperimen

- Buka tab Application -> Local Storage di DevTools untuk melihat data tersimpan.
- Coba simpan objek tanpa JSON.stringify dan amati string [object Object] yang rusak.
- Gunakan localStorage.removeItem() untuk menghapus data tertentu.
- Gunakan localStorage.clear() untuk membersihkan seluruh penyimpanan.

---

## Tantangan

Buat fungsi cache sederhana yang menyimpan hasil panggilan API ke LocalStorage dengan timestamp kadaluarsa (TTL) 5 menit.

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

Kamu telah menguasai penyimpanan lokal persisten di browser. Minggu depan adalah proyek capstone: membangun aplikasi Kanban Board interaktif lengkap!
