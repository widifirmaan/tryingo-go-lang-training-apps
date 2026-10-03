# Computed Properties: Caching Pintar, watch & watchEffect untuk Efek Samping

> **Kategori:** Vue | **Level:** Composition API, Reaktivitas & Komponen | **Minggu 2:** Computed Properties: Caching Pintar, watch & watchEffect untuk Efek Samping
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami perbedaan mendasar antara method biasa vs computed property yang memiliki fitur caching otomatis
- Menggunakan computed properties untuk kalkulasi data turunan murni tanpa efek samping
- Menggunakan watch() untuk merespons perubahan state spesifik dengan akses ke nilai lama dan baru (oldValue, newValue)
- Memanfaatkan watchEffect() untuk pelacakan dependensi implisit otomatis
- Mencegah komputasi berulang yang tidak perlu pada template Vue

---

## Program: Kalkulator Komisi Penjualan & Pelacak Perubahan Skor Lead

```vue
<script setup>
import { ref, computed, watch, watchEffect } from "vue";

const nilaiKesepakatan = ref(150000000); // 150 Juta
const tierSales = ref("SENIOR"); // "JUNIOR" (5%) | "SENIOR" (10%) | "LEAD" (15%)
const catatanAuditLog = ref([]);

// 1. computed: Otomatis di-cache! Hanya dihitung ulang jika dependensi (nilai/tier) berubah
const persentaseKomisi = computed(() => {
  switch (tierSales.value) {
    case "LEAD": return 0.15;
    case "SENIOR": return 0.10;
    default: return 0.05;
  }
});

const totalKomisiDiterima = computed(() => {
  return nilaiKesepakatan.value * persentaseKomisi.value;
});

// 2. watch: Mengamati perubahan variabel spesifik dengan akses ke nilai (baru, lama)
watch(tierSales, (tierBaru, tierLama) => {
  const log = `[AUDIT] Promosi Sales terdeteksi: dari ${tierLama} menjadi ${tierBaru}`;
  catatanAuditLog.value.unshift(log);
});

// 3. watchEffect: Berjalan langsung saat inisialisasi dan melacak otomatis variabel apapun di dalamnya
watchEffect(() => {
  if (totalKomisiDiterima.value > 20000000) {
    console.log(`[Peringatan HR] Komisi besar di atas 20 Juta membutuhkan otorisasi Direktur!`);
  }
});
</script>

<template>
  <div style="max-width: 480px; margin: 20px auto; font-family: sans-serif; border: 1px solid #cbd5e1; padding: 16px; borderRadius: 8px;">
    <h3>Kalkulator Komisi Sales Eksekutif</h3>

    <div style="margin-bottom: 12px;">
      <label style="display: block; font-size: 13px; font-weight: bold;">Nilai Kesepakatan (IDR):</label>
      <input type="number" v-model.number="nilaiKesepakatan" style="width: 100%; padding: 8px; box-sizing: border-box;" />
    </div>

    <div style="margin-bottom: 16px;">
      <label style="display: block; font-size: 13px; font-weight: bold;">Tier Akun Sales:</label>
      <select v-model="tierSales" style="width: 100%; padding: 8px;">
        <option value="JUNIOR">Junior Account Exec (5%)</option>
        <option value="SENIOR">Senior Account Exec (10%)</option>
        <option value="LEAD">Sales Director / Lead (15%)</option>
      </select>
    </div>

    <div style="background: #f8fafc; padding: 12px; border-radius: 6px; margin-bottom: 16px;">
      <div>Persentase: <strong>{{ persentaseKomisi * 100 }}%</strong></div>
      <div style="font-size: 18px; color: #16a34a; font-weight: bold; margin-top: 4px;">
        Hak Komisi: Rp {{ totalKomisiDiterima.toLocaleString('id-ID') }}
      </div>
    </div>

    <div v-if="catatanAuditLog.length > 0">
      <small style="color: #64748b; font-weight: bold;">Riwayat Audit:</small>
      <ul style="margin: 4px 0 0 0; padding-left: 20px; font-size: 12px; color: #475569;">
        <li v-for="(log, idx) in catatanAuditLog" :key="idx">{{ log }}</li>
      </ul>
    </div>
  </div>
</template>
```

---

## Konsep Kunci

### Mengapa Harus `computed` Bukan Method Biasa?
Jika Anda menulis fungsi biasa di template: `{{ hitungKomisi() }}`, fungsi tersebut akan **dieksekusi ulang setiap kali ADA BAGIAN APAPUN di halaman yang me-render ulang**, meskipun nilai kesepakatan tidak berubah sama sekali!
Sebaliknya, **`computed` memiliki caching pintar**:
Nilai hasil perhitungan disimpan di memori. Selama variabel reaktif di dalamnya (`nilaiKesepakatan`, `tierSales`) tidak berubah, Vue langsung mengembalikan hasil cache instan tanpa menghitung ulang!

### `watch` vs `watchEffect`
- **`watch(source, callback)`**:
  - *Lazy*: Tidak berjalan saat komponen pertama kali dipasang, kecuali diberi opsi `{ immediate: true }`.
  - Eksplisit: Anda harus menyebutkan variabel apa yang ingin diawasi (`tierSales`).
  - Menyediakan nilai lama dan baru: `(baru, lama) => { ... }`.
  - Cocok untuk: Menyimpan data ke LocalStorage, memanggil API pencarian saat input berubah.
- **`watchEffect(callback)`**:
  - *Immediate*: Langsung dieksekusi sekali saat startup.
  - Implisit: Secara otomatis melacak variabel reaktif apa saja yang dibaca di dalam fungsi.

---

---

## Penjelasan untuk Pemula

### Analogi: Kalkulator Memori vs Alarm Peringatan Suhu
1. **Computed Property** seperti tombol memori `M+` pada kalkulator meja: kalkulator menyimpan hasil perkalian panjang di layarnya; selama Anda tidak menekan angka baru, kalkulator tidak perlu mengulang proses hitung dari awal.
2. **Watch** seperti satpam gerbang yang mencatat buku tamu: "Pukul 14:00 Pak Budi (*nilai lama*) keluar dan digantikan Pak Joko (*nilai baru*)". Satpam hanya mencatat saat orang tersebut benar-benar berganti.

## Eksperimen

- Ubah nilai kesepakatan menjadi 250 Juta dan perhatikan totalKomisiDiterima terhitung instan.
- Ganti Tier Sales dari SENIOR ke LEAD dan amati Riwayat Audit bertambah satu baris di bawah.
- Buka DevTools Console dan amati pesan peringatan HR muncul otomatis saat komisi melewati 20 Juta.
- Tambahkan opsi { deep: true } pada watcher saat mengamati objek reaktif bersarang.

---

## Tantangan

Buat computed property `estimasiPajakKomisi` yang menghitung pajak progresif (5% untuk komisi di bawah 10 Juta, 15% untuk di atas 10 Juta), dan tampilkan nilai komisi bersih setelah dipotong pajak.

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

### 1. Destructuring Reaktif State Hilang
- **Gejala / Masalah:** Variabel yang di-destructure dari `reactive()` kehilangan sifat reaktivitasnya.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `toRefs(state)` sebelum melakukan destructuring pada Composition API.

### 2. Mengubah Prop Komponen Anak secara Langsung
- **Gejala / Masalah:** Memicu warning konsol Vue dan membuat data flow satu arah (one-way data flow) kacau.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Kirim event `emit('update:prop', value)` ke parent alih-alih memutasi prop.

### 3. Lupa `.value` pada Ref di JavaScript
- **Gejala / Masalah:** Objek `ref` dikirim alih-alih nilai aslinya ke logika komputasi.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Ingat bahwa `.value` wajib di dalam blok `<script setup>`, namun otomatis di-unwrap di template `<template>`.

---

## Ringkasan

Kamu telah menguasai computed caching cerdas, watch, dan watchEffect. Minggu depan kita mempelajari komunikasi komponen: Props, Emits, dan kustom v-model.
