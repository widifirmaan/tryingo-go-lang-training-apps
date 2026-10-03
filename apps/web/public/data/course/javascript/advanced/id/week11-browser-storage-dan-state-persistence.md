# Penyimpanan Browser: LocalStorage, SessionStorage & Serialisasi JSON

> **Kategori:** JavaScript | **Level:** Asinkron, Storage & Proyek Kanban | **Minggu 11:** Penyimpanan Browser: LocalStorage, SessionStorage & Serialisasi JSON

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

## Ringkasan

Kamu telah menguasai penyimpanan lokal persisten di browser. Minggu depan adalah proyek capstone: membangun aplikasi Kanban Board interaktif lengkap!
