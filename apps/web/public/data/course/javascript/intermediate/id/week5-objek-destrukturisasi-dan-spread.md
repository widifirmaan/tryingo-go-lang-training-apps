# Objek Modern: Destrukturisasi, Spread/Rest & Optional Chaining

> **Kategori:** JavaScript | **Level:** DOM, Event & Arsitektur Objek | **Minggu 5:** Objek Modern: Destrukturisasi, Spread/Rest & Optional Chaining

## Tujuan Pembelajaran

- Menguasai destrukturisasi objek dan array untuk ekstraksi properti ringkas beserta nilai default
- Menggunakan Object Spread (...) untuk kloning objek yang aman tanpa mutasi langsung (*shallow copy*)
- Menghilangkan error fatal "Cannot read property of undefined" dengan Optional Chaining (?.)
- Membedakan operator Nullish Coalescing (??) dengan Logical OR (||) dalam penanganan nilai falsy nol atau string kosong
- Memahami referensi memori objek (Reference Types) vs nilai primitif (Primitive Types)

---

## Program: Manajemen Konfigurasi Server dengan Operator Modern

```javascript
// 1. Objek Konfigurasi Bersarang
const serverConfig = {
  host: "api.nusadigital.com",
  port: 8080,
  keamanan: {
    ssl: true,
    sertifikat: {
      penerbit: "DigiCert Global CA",
      kadaluarsa: "2027-12-31"
    }
  },
  database: {
    driver: "postgres",
    koneksiPool: 20
  }
};

// 2. Destrukturisasi Objek & Nilai Default
const { host, port, protocol = "https" } = serverConfig;
console.log("Server Endpoint :", protocol + "://" + host + ":" + port);

// Destrukturisasi bersarang (Nested Destructuring)
const { keamanan: { sertifikat: { penerbit } } } = serverConfig;
console.log("Penerbit SSL    :", penerbit);

// 3. Object Spread (...): Menggabungkan & Mengkloning Immutably
const konfigurasiTambahan = {
  timeoutMs: 5000,
  modeDebug: false
};

const finalRuntimeConfig = {
  ...serverConfig,
  ...konfigurasiTambahan,
  port: 9000 // Menimpa port lama dengan aman
};
console.log("\nPort Baru Setelah Override :", finalRuntimeConfig.port);
console.log("Timeout Konfigurasi          :", finalRuntimeConfig.timeoutMs, "ms");

// 4. Optional Chaining (?.) & Nullish Coalescing (??)
const userProfile = {
  nama: "Siti Rahma",
  preferensi: {
    tema: "dark"
  }
};

// Aman: Jika objek 'kontak' tidak ada, kembalikan undefined tanpa crash!
const nomorTelepon = userProfile.kontak?.telepon;
console.log("\nNomor Telepon Pengguna :", nomorTelepon);

// Operator Nullish Coalescing (??): Hanya fallback jika null atau undefined
const bahasaPilihan = userProfile.preferensi?.bahasa ?? "Bahasa Indonesia (Default)";
console.log("Bahasa Pengguna        :", bahasaPilihan);
```

---

## Konsep Kunci

### Optional Chaining (?.) Menyelamatkan Produksi
Di masa lalu, mengakses properti bersarang `user.kontak.telepon` saat objek `kontak` tidak ada akan melempar error fatal `TypeError: Cannot read properties of undefined` yang mematikan seluruh aplikasi.
Dengan **Optional Chaining (`?.`)**:
- `user.kontak?.telepon` memeriksa apakah `user.kontak` bernilai `null` atau `undefined`. Jika ya, eksekusi langsung berhenti dan mengembalikan `undefined` tanpa melempar crash!

### Nullish Coalescing (??) vs Logical OR (||)
Operator `||` mengevaluasi semua nilai Falsy (`0`, `""`, `false`). Jika pengguna memiliki saldo 0 rupiah, `saldo || 100000` akan salah menganggap 0 sebagai ketiadaan data dan mengubah saldo menjadi 100.000!
Operator **Nullish Coalescing (`??`)** hanya melakukan fallback jika nilainya **benar-benar `null` atau `undefined`**. Nilai `0`, `""`, dan `false` tetap dipertahankan secara utuh.

---

---

## Penjelasan untuk Pemula

### Analogi: Membuka Laci Rahasia Kantor
1. **Destrukturisasi** seperti mengeluarkan paspor dan dompet langsung dari saku celana ke meja tanpa harus membawa seluruh lemari pakaian Anda.
2. **Spread Operator `...`** seperti mesin fotokopi cepat: Anda memfotokopi dokumen lama, lalu mencoret dan menulis nomor telepon baru di kertas salinannya tanpa merusak dokumen aslinya.
3. **Optional Chaining `?.`** seperti mengetuk pintu sebelum masuk: Anda mengetuk pintu kamar mandi, jika pintunya terkunci Anda langsung berbalik badan pergi tanpa menabrakkan kepala ke pintu kayu.

## Eksperimen

- Hapus tanda tanya pada userProfile.kontak?.telepon dan amati pesan error TypeError yang seketika menghentikan eksekusi kode.
- Bandingkan hasil 0 || 50 (hasil 50) dengan 0 ?? 50 (hasil 0) untuk memahami pentingnya Nullish Coalescing dalam aplikasi keuangan.
- Coba kloning objek menggunakan spread, ubah salah satu propertinya, dan buktikan bahwa objek awal tetap tidak berubah (immutability).
- Gunakan destrukturisasi array: const [pertama, kedua, ...sisa] = [10, 20, 30, 40, 50] dan amati nilai variabel sisa.

---

## Tantangan

Buat fungsi manajemen profil pengguna `normalisasiProfil(input)`: gunakan destrukturisasi dengan nilai default untuk nama, email, dan preferensi tema. Manfaatkan `?.` dan `??` untuk membaca kota domisili dengan fallback "Kota Belum Terdaftar", serta kembalikan objek baru yang bersih menggunakan spread operator.

---

## Ringkasan

Kamu telah menguasai destrukturisasi objek, operator spread/rest, dan pertahanan kode dengan optional chaining. Minggu depan kita akan mempelajari manipulasi DOM browser langsung untuk menciptakan antarmuka interaktif.
