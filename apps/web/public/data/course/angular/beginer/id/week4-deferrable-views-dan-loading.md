# Deferrable Views: Optimasi Pemuatan Malas (@defer, @placeholder, @loading, @error)

> **Kategori:** Angular | **Level:** Standalone Components, Signals & Kontrol Alur Modern | **Minggu 4:** Deferrable Views: Optimasi Pemuatan Malas (@defer, @placeholder, @loading, @error)
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami inovasi Deferrable Views (@defer) sebagai fitur pemecahan kode (code splitting) tingkat deklaratif di template
- Menggunakan berbagai pemicu defer: on viewport (terlihat di layar), on interaction (diklik), on hover, on timer
- Menggunakan blok @placeholder untuk reservasi layout visual dan mencegah layout shifts
- Mengonfigurasi blok @loading dengan timer minimum 500ms untuk mencegah efek flicker berkedip
- Mereduksi ukuran bundel JavaScript awal (Initial Bundle Size) hingga 60% pada halaman enterprise yang panjang

---

## Program: Jadwal Dokter Spesialis & Riwayat Pasien dengan Pemuatan On-Viewport

```typescript
// ============================================================================
// File: src/app/jadwal-dokter.component.ts (Demonstrasi Deferrable Views)
// ============================================================================
import { Component } from '@angular/core';

@Component({
  selector: 'app-jadwal-dokter',
  standalone: true,
  template: `
    <div class="portal-dokter">
      <h2>Portal Jadwal Praktik Dokter Spesialis</h2>
      <p>Scroll ke bawah untuk melihat timeline detail dokter on-duty hari ini.</p>

      <div class="spacer-box">
        Area Konten Pembuka (Gulir Layar ke Bawah ↓)
      </div>

      <!-- 1. @defer: Komponen Berat HANYA Diunduh & Dirender saat terlihat di layar (on viewport) -->
      @defer (on viewport) {
        <div class="timeline-berat">
          <h3>Jadwal Dokter Spesialis Bedah Saraf & Jantung</h3>
          <ul class="timeline-list">
            <li><strong>08:00 - 11:30</strong>: dr. Hendra Gunawan, Sp.BS (Operasi Kraniotomi)</li>
            <li><strong>13:00 - 16:00</strong>: dr. Maya Puspita, Sp.JP (Konsultasi Kateterisasi)</li>
            <li><strong>19:00 - 21:00</strong>: dr. Faisal Riza, Sp.A (Poli Anak Siaga)</li>
          </ul>
        </div>
      } @placeholder {
        <!-- 2. @placeholder: Tampilan placeholder instan sebelum pemicu defer aktif -->
        <div class="placeholder-box">
          [Placeholder] Gulir mendekati area ini untuk mengunduh modul jadwal dokter...
        </div>
      } @loading (minimum 500ms) {
        <!-- 3. @loading: Tampilan skeleton saat chunk JS sedang diunduh dari server -->
        <div class="loading-box">
          Sedang mengunduh modul timeline dokter spesialis...
        </div>
      } @error {
        <!-- 4. @error: Penanganan jika unduhan paket JS gagal karena jaringan -->
        <div class="error-box">
          Gagal mengunduh modul jadwal. Periksa koneksi internet Anda.
        </div>
      }
    </div>
  `,
  styles: [`
    .portal-dokter { max-width: 580px; margin: 20px auto; font-family: sans-serif; }
    .spacer-box { height: 400px; background: #f1f5f9; border: 2px dashed #cbd5e1; display: flex; align-items: center; justify-content: center; color: #64748b; font-weight: bold; margin-bottom: 24px; border-radius: 8px; }
    .timeline-berat { background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    h3 { margin-top: 0; color: #0284c7; }
    .timeline-list { list-style: none; padding: 0; margin: 0; }
    .timeline-list li { padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .placeholder-box { padding: 30px; background: #e2e8f0; border-radius: 8px; text-align: center; color: #475569; font-size: 13px; }
    .loading-box { padding: 30px; background: #fef9c3; border-radius: 8px; text-align: center; color: #854d0e; font-weight: bold; }
    .error-box { padding: 20px; background: #fee2e2; color: #991b1b; border-radius: 8px; text-align: center; }
  `]
})
export class JadwalDokterComponent {}
```

---

## Konsep Kunci

### Revolusi Deferrable Views di Angular
Sebelumnya, jika sebuah halaman rumah sakit memiliki grafik analitik raksasa, tabel 50 dokter, dan peta poliklinik di bagian paling bawah halaman:
Browser pengguna terpaksa mengunduh **seluruh megabyte kode JavaScript tersebut di muka**, memperlambat waktu buka web (*First Contentful Paint*).

Dengan **`@defer`**:
Angular secara otomatis **memecah komponen tersebut menjadi file JavaScript terpisah (*lazy chunk*)**.
Kode tersebut HANYA diunduh dan dirender saat:
- `on viewport`: Elemen mulai masuk ke layar pengguna saat digulir.
- `on interaction`: Pengguna mengeklik tombol tertentu.
- `on hover`: Kursor mouse mendekati area tersebut.
Semua ini terjadi tanpa Anda perlu menulis satupun baris kode router atau dynamic import manual!

---

---

## Penjelasan untuk Pemula

### Analogi: Tirai Kamar Operasi & Buku Menu Tebal
Bayangkan buku menu restoran yang memiliki 100 halaman:
1. **Tanpa @defer**, pelayan membacakan seluruh 100 halaman menu sejak Anda baru melangkahkan kaki di pintu depan restoran. Kepala Anda pusing dan lelah (*loading web lambat*).
2. **Dengan @defer**, pelayan hanya memberikan lembaran menu pembuka (*halaman utama*). Begitu Anda membalik halaman kedua (*on viewport scroll*), pelayan baru mengambilkan lembaran menu hidangan penutup yang baru dicetak dari kasir (*chunk diunduh saat dibutuhkan*).

## Eksperimen

- Buka tab Network di browser, scroll halaman ke bawah hingga area placeholder terlihat, dan saksikan chunk JS diunduh otomatis tepat pada detik itu!
- Ganti pemicu menjadi @defer (on interaction) dan klik pada placeholder untuk memicu pemuatan.
- Uji simulasi koneksi slow 3G di DevTools untuk melihat blok @loading berkedip kuning sebelum konten dokter muncul.
- Amati bahwa ukuran bundel awal halaman berkurang drastis berkat pemecahan kode otomatis.

---

## Tantangan

Buat tombol pemicu `<button #tombolBuka>` dan konfigurasikan `@defer (on interaction(tombolBuka))` yang menunda pemuatan komponen riwayat rekam medis hingga tombol ditekan.

---

## Model Mental & Diagram Alur Visual

```diagram
┌──────────────────────────────────────────────────────────┐
│ ARSITEKTUR KOMPONEN ANGULAR                              │
│                                                          │
│  @Component({ standalone: true })                        │
│       │                                                  │
│  Template HTML ◄── [Property Binding] ── Signals (State) │
│       │                                                  │
│  User Action   ─── (Event Binding)   ──► Method Callback │
│       │                                                  │
│  Dependency Injection: Injeksi Service via inject()      │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `count = signal(0)`
- **Fungsi Utama:** State reaktif Angular Signals.
- **Parameter / Atribut:** `initialValue`.
- **Perilaku & Efek Sistem:** Menyediakan variabel sinyal reaktif granular yang memicu deteksi perubahan performa tinggi..
- **Contoh Penggunaan Praktis:**
```typescript
import { signal } from '@angular/core';
export class CounterComponent {
  count = signal(0);
  inc() { this.count.update(n => n + 1); }
}
```
- **Hasil Output yang Diharapkan:**
```output
Komponen Angular merender sinyal reaktif
```

### 2. `double = computed(() => this.count() * 2)`
- **Fungsi Utama:** Sinyal komputasi memoized.
- **Parameter / Atribut:** `Compute Callback`.
- **Perilaku & Efek Sistem:** Menghitung nilai turunan otomatis dengan cache pintar tanpa re-evaluasi redundan..
- **Contoh Penggunaan Praktis:**
```typescript
import { signal, computed } from '@angular/core';
count = signal(10);
double = computed(() => this.count() * 2);
```
- **Hasil Output yang Diharapkan:**
```output
double() mengembalikan nilai 20
```

### 3. `@Component({ standalone: true, ... })`
- **Fungsi Utama:** Deklarasi Komponen Standalone Modern.
- **Parameter / Atribut:** `Selector, Imports, Template`.
- **Perilaku & Efek Sistem:** Mendefinisikan komponen modular mandiri tanpa memerlukan NgModules yang rumit..
- **Contoh Penggunaan Praktis:**
```typescript
@Component({
  selector: 'app-user',
  standalone: true,
  template: `<h2>{{ title() }}</h2>`
})
export class UserComponent {}
```
- **Hasil Output yang Diharapkan:**
```output
Komponen siap dirender di aplikasi Angular
```

### 4. `inject(HttpClient)`
- **Fungsi Utama:** Injeksi dependensi fungsional.
- **Parameter / Atribut:** `Service Token`.
- **Perilaku & Efek Sistem:** Mengambil instance service dependensi secara fungsional tanpa constructor boilerplate..
- **Contoh Penggunaan Praktis:**
```typescript
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
private http = inject(HttpClient);
```
- **Hasil Output yang Diharapkan:**
```output
Service HttpClient siap digunakan untuk pemanggilan API
```

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

Kamu telah menguasai Deferrable Views (@defer, @placeholder, @loading). Minggu depan kita memasuki Level 2: Dependency Injection modern via inject() dan Reactive Forms.
