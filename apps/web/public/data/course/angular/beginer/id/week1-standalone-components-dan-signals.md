# Angular Modern: Standalone Components, Tanpa NgModule & Sinyal Reaktif signal()

> **Kategori:** Angular | **Level:** Standalone Components, Signals & Kontrol Alur Modern | **Minggu 1:** Angular Modern: Standalone Components, Tanpa NgModule & Sinyal Reaktif signal()
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami arsitektur Angular modern Standalone Components tanpa kebutuhan berkas NgModule yang rumit
- Menguasai sistem reaktivitas Angular Signals: deklarasi signal(), pembacaan via getter (), set(), dan update()
- Mengetahui perbedaan reaktivitas sinyal granular (fine-grained) dibanding zone.js dirty-checking lama
- Menghubungkan sinyal reaktif langsung ke template HTML dengan interpolasi {{ namaSignal() }}
- Menerapkan data binding [property] dan event binding (event) sesuai standar Angular

---

## Program: Antrean Pasien Rawat Jalan (Outpatient Clinic Queue) dengan Signals

```typescript
// ============================================================================
// File: src/app/antrean-klinik.component.ts (Standalone Component Modern)
// ============================================================================
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-antrean-klinik',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="klinik-card">
      <header>
        <h2>Klinik Rawat Jalan Nusa Medika</h2>
        <span class="status-badge" [class.buka]="isKlinikBuka()">
          {{ isKlinikBuka() ? 'Buka Pelayanan' : 'Tutup' }}
        </span>
      </header>

      <div class="counter-box">
        <small>Nomor Antrean Sedang Dilayani:</small>
        <div class="nomor-display">A-{{ nomorAntreanAktif() }}</div>
        <div class="sisa-info">Total Pasien Menunggu: {{ sisaAntrean() }} Orang</div>
      </div>

      <div class="action-buttons">
        <button (click)="panggilPasienBerikutnya()" class="btn-primary" [disabled]="!isKlinikBuka() || sisaAntrean() === 0">
          Panggil Berikutnya →
        </button>
        <button (click)="tambahPasienBaru()" class="btn-secondary" [disabled]="!isKlinikBuka()">
          + Ambil Nomor Antrean
        </button>
      </div>

      <div class="footer-toggle">
        <button (click)="toggleKlinik()">
          {{ isKlinikBuka() ? 'Tutup Pendaftaran Hari Ini' : 'Buka Pendaftaran' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .klinik-card { max-width: 440px; margin: 24px auto; font-family: system-ui, sans-serif; padding: 20px; border-radius: 12px; border: 1px solid #cbd5e1; background: white; }
    header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
    h2 { margin: 0; font-size: 16px; color: #0f172a; }
    .status-badge { font-size: 11px; padding: 3px 8px; border-radius: 4px; font-weight: bold; background: #fee2e2; color: #b91c1c; }
    .status-badge.buka { background: #dcfce7; color: #15803d; }
    .counter-box { text-align: center; margin: 24px 0; background: #f8fafc; padding: 16px; border-radius: 8px; }
    .nomor-display { font-size: 48px; font-weight: bold; color: #2563eb; margin: 8px 0; }
    .sisa-info { font-size: 13px; color: #64748b; }
    .action-buttons { display: flex; gap: 8px; margin-bottom: 16px; }
    button { padding: 10px 14px; border-radius: 6px; border: 1px solid #cbd5e1; cursor: pointer; font-weight: bold; }
    .btn-primary { flex: 1; background: #2563eb; color: white; border: none; }
    .btn-secondary { flex: 1; background: #f1f5f9; }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    .footer-toggle { text-align: center; }
    .footer-toggle button { font-size: 12px; background: none; border: none; color: #64748b; text-decoration: underline; }
  `]
})
export class AntreanKlinikComponent {
  // 1. Angular Signals: Reaktivitas fine-grained berbasis fungsi pemanggil ()
  nomorAntreanAktif = signal<number>(1);
  sisaAntrean = signal<number>(14);
  isKlinikBuka = signal<boolean>(true);

  panggilPasienBerikutnya(): void {
    // 2. update(): Memperbarui sinyal berdasarkan nilai sebelumnya
    this.nomorAntreanAktif.update((n) => n + 1);
    this.sisaAntrean.update((s) => Math.max(0, s - 1));
  }

  tambahPasienBaru(): void {
    this.sisaAntrean.update((s) => s + 1);
  }

  toggleKlinik(): void {
    // 3. set(): Menetapkan nilai sinyal secara langsung
    this.isKlinikBuka.set(!this.isKlinikBuka());
  }
}
```

---

## Konsep Kunci

### Revolusi Angular Modern: Standalone & Signals
Angular telah bertransformasi total sejak versi 17+. Dua pilar terbesarnya adalah:
1. **Kematian `NgModule`**: Dulu pengembang harus mendaftarkan komponen ke dalam `AppModule` yang sangat membingungkan. Sekarang, setiap komponen adalah **`standalone: true`** yang dapat mengimpor dependensinya sendiri secara mandiri (`imports: [...]`).
2. **Revolusi Signals (`signal()`)**:
   Dulu Angular mengandalkan *Zone.js* yang memindai seluruh pohon komponen dari atas ke bawah setiap kali ada klik mouse (*dirty checking* yang lambat).
   Dengan **Signals**, Angular tahu persis **bagian teks mana di template yang perlu diperbarui secara langsung (*surgical DOM updates*)**, membuat aplikasi Angular secepat kilat!

### Anatomi Signal:
- Baca nilai: Panggil sebagai fungsi `this.nomorAntreanAktif()` atau di template `{{ nomorAntreanAktif() }}`.
- Ubah nilai mutlak: `this.isKlinikBuka.set(false)`.
- Ubah berbasis nilai lama: `this.sisaAntrean.update(lama => lama + 1)`.

---

---

## Penjelasan untuk Pemula

### Analogi: Sakelar Papan Skor Rumah Sakit
1. **Zone.js (Lama)** seperti petugas rumah sakit yang harus berlari memeriksa semua 500 kamar rawat inap setiap kali bel pintu depan berbunyi, hanya untuk memastikan apakah ada lampu kamar yang mati. Sangat melelahkan dan boros tenaga.
2. **Signals (Modern)** seperti kabel listrik pintar langsung: begitu tombol bel antrean ditekan (*signal update*), angka di lampu LED papan loket nomor 3 langsung berkedip berganti angka (*surgical update*), tanpa petugas perlu memeriksa 499 kamar lainnya.

## Eksperimen

- Klik tombol "Panggil Berikutnya" dan amati nomor antrean bertambah sementara sisa pasien berkurang instan.
- Klik tombol "Tutup Pendaftaran" dan amati tombol panggilan dinonaktifkan (disabled) secara reaktif.
- Coba baca sinyal tanpa tanda kurung nomorAntreanAktif di template dan amati Angular menampilkan representasi fungsi sinyal.
- Buka file main.ts pada project Angular modern dan buktikan tidak ada lagi AppModule sama sekali.

---

## Tantangan

Tambahkan sinyal baru `waktuPelayananRataRata = signal(15)` (menit), lalu buat tampilan estimasi total waktu tunggu pasien terakhir yang dihitung dari perkalian sisaAntrean dan waktu rata-rata.

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

Kamu telah menguasai Standalone Components dan dasar Angular Signals. Minggu depan kita mempelajari Kontrol Alur Modern (@if, @for) dan computed signals.
