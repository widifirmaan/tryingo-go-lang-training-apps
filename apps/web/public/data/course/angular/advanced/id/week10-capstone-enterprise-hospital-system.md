# Capstone: Sistem Manajemen Klinis & Penjadwalan Rumah Sakit Enterprise

> **Kategori:** Angular | **Level:** Routing Fungsional, Interceptors & Capstone RS | **Minggu 10:** Capstone: Sistem Manajemen Klinis & Penjadwalan Rumah Sakit Enterprise
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengintegrasikan seluruh pilar Angular modern (Standalone, Signals, Computed, Modern Control Flow @for/@empty) ke dalam produk sistem rumah sakit enterprise
- Menghitung metrik analitik klinis (BOR %, Kasus Kritis, Sisa Bed) secara reaktif instan menggunakan computed()
- Menerapkan perancangan UI bertaraf institusi kesehatan dengan pembedaan visual status triase darurat
- Mengelola mutasi data rawat inap secara immutable dan aman tanpa dirty-checking zone.js
- Menghasilkan kode arsitektur Angular tingkat senior yang bersih, modular, dan siap dihubungkan dengan backend mikroservis

---

## Program: Aplikasi Manajemen Rumah Sakit Terintegrasi dengan Signals & Standalone Architecture

```typescript
// ============================================================================
// CAPSTONE PROJECT: NUSA MEDIKA ENTERPRISE CLINICAL SUITE
// ============================================================================
import { Component, signal, computed } from '@angular/core';

interface PasienKlinis {
  id: string;
  nama: string;
  triase: 'KRITIS' | 'MENDESAK' | 'STABIL';
  lokasiBed: string;
  waktuMasuk: string;
}

@Component({
  selector: 'app-hospital-capstone',
  standalone: true,
  template: `
    <div class="hospital-shell">
      <header class="hospital-header">
        <div>
          <h2>Nusa Medika Executive Health Dashboard</h2>
          <small>Modern Angular Enterprise Architecture • Signal-Driven State</small>
        </div>
        <div class="header-stat">
          <div class="stat-label">Bed Occupancy Rate (BOR)</div>
          <div class="stat-value" [class.alert]="borPercentage() > 80">{{ borPercentage() }}%</div>
        </div>
      </header>

      <!-- KPI Summary Cards -->
      <section class="kpi-grid">
        <div class="kpi-card">
          <small>Pasien Rawat Inap Aktif</small>
          <div class="kpi-num">{{ totalPasien() }} Jiwa</div>
        </div>
        <div class="kpi-card critical">
          <small>Kasus Kritis UGD</small>
          <div class="kpi-num">{{ totalKritis() }} Pasien</div>
        </div>
        <div class="kpi-card">
          <small>Kapasitas Bed Tersisa</small>
          <div class="kpi-num">{{ bedTersisa() }} Bed</div>
        </div>
      </section>

      <!-- Panel Kontrol Admisi Pasien Cepat -->
      <section class="admission-panel">
        <h3>Admisi Cepat Pasien Baru</h3>
        <div class="input-row">
          <input #namaInput type="text" placeholder="Nama Pasien Lengkap..." />
          <select #triaseSelect>
            <option value="STABIL">Triase Hijau (Stabil)</option>
            <option value="MENDESAK">Triase Kuning (Mendesak)</option>
            <option value="KRITIS">Triase Merah (Kritis UGD)</option>
          </select>
          <button (click)="tambahPasien(namaInput.value, triaseSelect.value); namaInput.value = ''" class="btn-admit">
            + Daftarkan Pasien
          </button>
        </div>
      </section>

      <!-- Tabel Pasien Aktif -->
      <section class="table-section">
        <h3>Daftar Pasien Sedang Dirawat</h3>
        <table class="clinical-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Pasien</th>
              <th>Status Triase</th>
              <th>Alokasi Bed</th>
              <th>Waktu Masuk</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            @for (p of daftarPasien(); track p.id) {
              <tr [class.row-critical]="p.triase === 'KRITIS'">
                <td><code>{{ p.id }}</code></td>
                <td><strong>{{ p.nama }}</strong></td>
                <td>
                  <span class="badge" [attr.data-triase]="p.triase">{{ p.triase }}</span>
                </td>
                <td>{{ p.lokasiBed }}</td>
                <td>{{ p.waktuMasuk }}</td>
                <td>
                  <button (click)="pulangkanPasien(p.id)" class="btn-discharge">Discharge</button>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="6" class="empty-msg">Seluruh bed rawat inap saat ini kosong.</td>
              </tr>
            }
          </tbody>
        </table>
      </section>
    </div>
  `,
  styles: [`
    .hospital-shell { max-width: 860px; margin: 24px auto; font-family: system-ui, sans-serif; background: white; padding: 24px; border-radius: 12px; border: 1px solid #cbd5e1; box-shadow: 0 4px 6px rgba(0,0,0,0.04); }
    .hospital-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f172a; padding-bottom: 16px; }
    h2 { margin: 0; color: #0f172a; font-size: 20px; }
    small { color: #64748b; }
    .header-stat { text-align: right; }
    .stat-label { font-size: 11px; color: #64748b; text-transform: uppercase; }
    .stat-value { font-size: 24px; font-weight: bold; color: #16a34a; }
    .stat-value.alert { color: #dc2626; }
    .kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 20px 0; }
    .kpi-card { background: #f8fafc; border: 1px solid #cbd5e1; padding: 14px; border-radius: 8px; }
    .kpi-card.critical { background: #fff5f5; border-color: #fca5a5; color: #b91c1c; }
    .kpi-num { font-size: 22px; font-weight: bold; margin-top: 4px; }
    .admission-panel { background: #f1f5f9; padding: 16px; border-radius: 8px; margin-bottom: 24px; }
    .admission-panel h3 { margin: 0 0 10px 0; font-size: 14px; }
    .input-row { display: flex; gap: 8px; }
    .input-row input { flex: 1; padding: 8px; border: 1px solid #cbd5e1; border-radius: 4px; }
    .input-row select { padding: 8px; border: 1px solid #cbd5e1; border-radius: 4px; }
    .btn-admit { background: #0f172a; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-weight: bold; }
    .clinical-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .clinical-table th, .clinical-table td { padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: left; }
    .clinical-table th { background: #f8fafc; font-size: 12px; color: #64748b; }
    .badge { font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 3px; }
    .badge[data-triase="KRITIS"] { background: #fee2e2; color: #b91c1c; }
    .badge[data-triase="MENDESAK"] { background: #fef3c7; color: #b45309; }
    .badge[data-triase="STABIL"] { background: #dcfce7; color: #15803d; }
    .row-critical { background: #fffbfb; }
    .btn-discharge { background: #fee2e2; color: #b91c1c; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; }
    .empty-msg { text-align: center; color: #94a3b8; padding: 24px; }
  `]
})
export class HospitalCapstoneComponent {
  readonly kapasitasMaksimalBed = 20;

  // Signal State Pasien Terintegrasi
  daftarPasien = signal<PasienKlinis[]>([
    { id: 'PX-101', nama: 'Suryadi Pratama', triase: 'KRITIS', lokasiBed: 'ICU Bed 01', waktuMasuk: '08:15' },
    { id: 'PX-102', nama: 'Ratna Wulandari', triase: 'MENDESAK', lokasiBed: 'Kamar VIP 204', waktuMasuk: '09:40' },
    { id: 'PX-103', nama: 'Gunawan Susanto', triase: 'STABIL', lokasiBed: 'Bangsal Melati B3', waktuMasuk: '11:05' }
  ]);

  // Derived Computed KPI Metrics
  totalPasien = computed(() => this.daftarPasien().length);
  totalKritis = computed(() => this.daftarPasien().filter((p) => p.triase === 'KRITIS').length);
  bedTersisa = computed(() => this.kapasitasMaksimalBed - this.totalPasien());
  borPercentage = computed(() => Math.round((this.totalPasien() / this.kapasitasMaksimalBed) * 100));

  tambahPasien(nama: string, triaseVal: string): void {
    if (!nama.trim()) return;

    const baru: PasienKlinis = {
      id: `PX-${Date.now().toString().slice(-4)}`,
      nama,
      triase: triaseVal as PasienKlinis['triase'],
      lokasiBed: `Bed Observasi ${Math.floor(Math.random() * 10) + 1}`,
      waktuMasuk: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    this.daftarPasien.update((list) => [baru, ...list]);
  }

  pulangkanPasien(id: string): void {
    this.daftarPasien.update((list) => list.filter((p) => p.id !== id));
  }
}
```

---

## Konsep Kunci

### Arsitektur Capstone Sistem Manajemen Rumah Sakit
Aplikasi capstone ini menyatukan seluruh revolusi Angular modern dalam satu arsitektur terpadu:
1. **Zero-NgModule Standalone Architecture**: Komponen berjalan mandiri dan sangat ringan, siap untuk di-deploy ke lingkungan cloud dan CDN.
2. **Reaktivitas Sinyal Murni (Signals & Computed)**: Ketika perawat mengklik tombol "Discharge" pada pasien, seluruh KPI analitik (`borPercentage`, `totalPasien`, `bedTersisa`) langsung dihitung ulang secara sinkron dan instan tanpa membebani browser.
3. **Kontrol Alur Modern**: Menggunakan `@for (p of daftarPasien(); track p.id)` yang menjamin performa pelacakan baris tabel tingkat mikrodetik.
4. **Kesiapan Integrasi Enterprise**: Komponen ini dirancang untuk dapat dengan mudah dihubungkan dengan `PatientRecordsService`, `HttpClient`, dan WebSocket real-time monitor telemetry.

### Selamat Datang di Level Senior Angular Developer!
Anda kini telah menguasai salah satu framework paling kokoh dan dihormati di dunia enterprise perbankan, kesehatan, dan penerbangan global.

---

---

## Penjelasan untuk Pemula

### Analogi: Ruang Komando Krisis Rumah Sakit
Aplikasi ini seperti ruang komando krisis rumah sakit:
1. **Header BOR & KPI Grid** adalah layar raksasa di dinding ruang komando: direktur rumah sakit langsung tahu jika kapasitas tempat tidur sudah mencapai zona bahaya merah (*BOR > 80%*).
2. **Tabel Pasien** adalah buku besar digital UGD: setiap perawat yang memasukkan pasien baru (*tambahPasien*) langsung membuat angka statistik di layar dinding bertambah detik itu juga.

## Eksperimen

- Daftarkan pasien baru dengan triase "Triase Merah (Kritis UGD)" dan amati baris tabel disorot warna merah muda otomatis.
- Tambahkan pasien terus-menerus hingga BOR melebihi 80% dan perhatikan indikator BOR berubah warna menjadi merah peringatan.
- Pulangkan semua pasien hingga kosong dan amati blok @empty menampilkan pesan bahwa seluruh bed kosong.
- Hubungkan aplikasi ini dengan jwtAuthInterceptor dan functional routing yang telah dibuat di materi sebelumnya.

---

## Tantangan

Tambahkan fitur pencarian cepat: buat input teks filter yang menyaring baris tabel pasien berdasarkan nama atau lokasi bed secara reaktif menggunakan computed signal.

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

Selamat! Kamu telah menyelesaikan seluruh kurikulum Angular modern dari Standalone Components dasar hingga membangun Sistem Rumah Sakit Enterprise bertaraf industri.
