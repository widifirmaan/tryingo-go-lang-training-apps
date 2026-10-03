# Dependency Injection Modern: Fungsi inject() & Layanan Rekam Medis (providedIn)

> **Kategori:** Angular | **Level:** Dependency Injection, Reactive Forms & RxJS | **Minggu 5:** Dependency Injection Modern: Fungsi inject() & Layanan Rekam Medis (providedIn)
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami sistem Dependency Injection (DI) hierarkis Angular yang bertaraf enterprise
- Menggunakan dekorator @Injectable({ providedIn: 'root' }) untuk layanan singleton global pohon pohon
- Menguasai fungsi modern inject() yang menggantikan injeksi constructor lama yang berbelit-belit
- Melindungi mutasi state internal service menggunakan metode .asReadonly() pada sinyal
- Memisahkan logika bisnis manipulasi data medis dari lapisan presentasi visual komponen

---

## Program: Layanan Pusat Rekam Medis Pasien (Patient Records Service)

```typescript
// ============================================================================
// File: src/app/services/patient-records.service.ts (Injectable Service Modern)
// ============================================================================
import { Injectable, signal } from '@angular/core';

export interface RekamMedis {
  idRekam: string;
  nomorRM: string;
  namaPasien: string;
  diagnosaUtama: string;
  dokterPJ: string;
}

@Injectable({
  providedIn: 'root' // Singleton Global: Tersedia di seluruh aplikasi tanpa deklarasi modul
})
export class PatientRecordsService {
  private records = signal<RekamMedis[]>([
    { idRekam: 'RM-01', nomorRM: '00-11-22', namaPasien: 'Anisa Rahmawati', diagnosaUtama: 'Hipertensi Primer', dokterPJ: 'dr. Hendra, Sp.PD' },
    { idRekam: 'RM-02', nomorRM: '00-11-23', namaPasien: 'Bambang Irawan', diagnosaUtama: 'Diabetes Melitus Tipe 2', dokterPJ: 'dr. Maya, Sp.PD' }
  ]);

  // Sinyal Readonly untuk dikonsumsi komponen luar
  readonly daftarRekamMedis = this.records.asReadonly();

  tambahRekamMedis(data: Omit<RekamMedis, 'idRekam'>): void {
    const baru: RekamMedis = {
      idRekam: `RM-${Date.now()}`,
      ...data
    };
    this.records.update((list) => [baru, ...list]);
  }

  cariBerdasarkanRM(nomor: string): RekamMedis | undefined {
    return this.records().find((r) => r.nomorRM === nomor);
  }
}

// ============================================================================
// File: src/app/rekam-medis-list.component.ts (Konsumsi via fungsi inject())
// ============================================================================
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-rekam-medis-list',
  standalone: true,
  template: `
    <div style="max-width: 500px; margin: 20px auto; font-family: sans-serif;">
      <h3>Sistem Rekam Medis Elektronik (RME)</h3>
      <p style="color: #64748b; font-size: 13px;">Ditenagai Dependency Injection inject(PatientRecordsService)</p>

      <ul>
        @for (item of recordService.daftarRekamMedis(); track item.idRekam) {
          <li style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
            <strong>[{{ item.nomorRM }}] {{ item.namaPasien }}</strong>
            <div style="font-size: 12px; color: #475569;">Diagnosa: {{ item.diagnosaUtama }} • Dokter: {{ item.dokterPJ }}</div>
          </li>
        }
      </ul>
    </div>
  `
})
export class RekamMedisListComponent {
  // Modern DI: Menggunakan fungsi inject() menggantikan constructor injection yang bertele-tele!
  readonly recordService = inject(PatientRecordsService);
}
```

---

## Konsep Kunci

### Revolusi `inject()` di Angular Modern
Selama bertahun-tahun, jika Anda ingin menyuntikkan service ke komponen Angular, Anda terpaksa menulis constructor yang panjang:
`constructor(private recordService: PatientRecordsService, private router: Router) {}`.
Di Angular modern, Anda cukup menggunakan fungsi **`inject()`**:
`readonly recordService = inject(PatientRecordsService);`
Keunggulan:
1. Lebih ringkas, deklaratif, dan mudah dibaca.
2. Dapat digunakan di luar kelas (misal di dalam functional router guards atau factory functions).
3. Mendukung inferensi tipe TypeScript secara otomatis tanpa anotasi tipe ganda.

### Kapsulasi State Service dengan `.asReadonly()`
Jangan biarkan komponen luar memutasi sinyal service Anda secara liar (`service.records.set([])`).
Jadikan `records` bersifat `private`, lalu ekspos versi aman ke komponen publik menggunakan `this.records.asReadonly()`.
Komponen luar hanya bisa membaca data, sedangkan mutasi wajib melalui method resmi seperti `tambahRekamMedis()`.

---

---

## Penjelasan untuk Pemula

### Analogi: Ruang Farmasi Rumah Sakit & Jalur Telepon Khusus
1. **Layanan (@Injectable Service)** seperti instalasi farmasi pusat rumah sakit: ada satu gudang obat terpusat (*singleton global*) yang menyimpan seluruh pasokan obat.
2. **`inject()`** seperti telepon interkom dokter di meja periksa: dokter tidak perlu berjalan kaki ke lantai bawah membawa gerobak obat; dokter cukup mengangkat interkom (*inject(FarmasiService)*) dan obat langsung disuplai ke meja periksa secara instan.

## Eksperimen

- Panggil recordService.tambahRekamMedis(...) dari komponen dan buktikan seluruh daftar pasien langsung ter-update otomatis.
- Coba ubah recordService.daftarRekamMedis().push(...) dan perhatikan compiler melarang karena asReadonly().
- Uji injeksi service di dalam functional guard router tanpa class constructor sama sekali.
- Pelajari InjectionToken kustom untuk menginjeksi konfigurasi string atau objek API key.

---

## Tantangan

Kembangkan `PatientRecordsService` dengan fungsi pencarian reaktif `cariPasienBerdasarkanNama(nama: string)` yang mengembalikan array pasien yang cocok menggunakan metode filter array.

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

### 1. Memory Leak pada RxJS Subscription
- **Gejala / Masalah:** Subscription yang tetap aktif setelah komponen hancur memboroskan memori dan memicu callback ganda.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan operator `takeUntilDestroyed()` atau manfaatkan pipe `async` di template HTML.

### 2. ChangeDetectionStrategy Default yang Boros Performa
- **Gejala / Masalah:** Angular memeriksa seluruh pohon komponen pada setiap event browser.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Terapkan `ChangeDetectionStrategy.OnPush` dan gunakan Angular Signals untuk update granular.

### 3. Mengimpor Seluruh Shared Module di Standalone Component
- **Gejala / Masalah:** Ukuran bundle JavaScript aplikasi membengkak drastis.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Hanya import modul atau standalone directive yang benar-benar digunakan di array `imports: []`.

---

## Ringkasan

Kamu telah menguasai Dependency Injection modern dengan inject() dan enkapsulasi service asReadonly. Minggu depan kita mempelajari Reactive Forms.
