# Kontrol Alur Modern (@if, @for, @empty) & Sinyal Komputasi computed()

> **Kategori:** Angular | **Level:** Standalone Components, Signals & Kontrol Alur Modern | **Minggu 2:** Kontrol Alur Modern (@if, @for, @empty) & Sinyal Komputasi computed()

## Tujuan Pembelajaran

- Memahami migrasi dari direktif struktural usang (*ngIf, *ngFor) ke sintaks kontrol alur bawaan modern (@if, @for)
- Menggunakan blok @for dengan tracking kunci wajib (track item.id) untuk rekonsiliasi DOM instan
- Memanfaatkan blok @empty untuk menampilkan state kosong tanpa kondisi tambahan
- Menggunakan computed() signals untuk kalkulasi metrik analitik rumah sakit yang otomatis ter-cache
- Menerapkan mutasi data array secara immutable menggunakan spread operator di dalam sinyal update()

---

## Program: Dashboard Okupansi Kamar Rawat Inap Rumah Sakit (Bed Occupancy Rate)

```typescript
// ============================================================================
// File: src/app/bed-occupancy.component.ts (Modern Control Flow & Computed Signals)
// ============================================================================
import { Component, signal, computed } from '@angular/core';

interface BedKamar {
  id: string;
  nomorKamar: string;
  bangsal: string;
  terisi: boolean;
  namaPasien?: string;
}

@Component({
  selector: 'app-bed-occupancy',
  standalone: true,
  template: `
    <div class="dashboard-bed">
      <header>
        <h3>Manajemen Tempat Tidur Rumah Sakit (BOR)</h3>
        <div class="kpi-rate">
          Tingkat Keterisian: <strong>{{ persentaseOkupansi() }}%</strong>
        </div>
      </header>

      <!-- 1. Sinyal Komputasi Cerdas (computed) -->
      <div class="metrics-row">
        <div class="stat">Total Bed: {{ totalBeds() }}</div>
        <div class="stat terisi">Terisi: {{ bedsTerisi() }}</div>
        <div class="stat kosong">Kosong: {{ bedsKosong() }}</div>
      </div>

      <!-- 2. Kontrol Alur Modern: @for dengan pelacakan wajib (track item.id) -->
      <div class="bed-grid">
        @for (bed of daftarBeds(); track bed.id) {
          <div class="bed-card" [class.occupied]="bed.terisi">
            <div class="bed-header">
              <strong>{{ bed.nomorKamar }}</strong>
              <small>{{ bed.bangsal }}</small>
            </div>
            
            <!-- 3. Kontrol Alur Modern: @if dan @else menggantikan *ngIf lama -->
            @if (bed.terisi) {
              <div class="pasien-info">Pasien: {{ bed.namaPasien }}</div>
              <button (click)="pulangkanPasien(bed.id)" class="btn-discharge">Discharge (Pulang)</button>
            } @else {
              <div class="kosong-info">Siap Digunakan</div>
              <button (click)="terimaPasien(bed.id)" class="btn-admit">+ Admisi Pasien</button>
            }
          </div>
        } @empty {
          <!-- 4. Blok @empty otomatis jika array kosong -->
          <div class="empty-state">Tidak ada data tempat tidur yang terdaftar di bangsal ini.</div>
        }
      </div>
    </div>
  `,
  styles: [`
    .dashboard-bed { max-width: 620px; margin: 24px auto; font-family: sans-serif; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #cbd5e1; }
    header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    h3 { margin: 0; font-size: 18px; color: #0f172a; }
    .kpi-rate { font-size: 15px; background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 6px; }
    .metrics-row { display: flex; gap: 12px; margin-bottom: 20px; }
    .stat { flex: 1; background: white; padding: 10px; border-radius: 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; }
    .stat.terisi { color: #dc2626; border-color: #fca5a5; }
    .stat.kosong { color: #16a34a; border-color: #86efac; }
    .bed-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .bed-card { background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; }
    .bed-card.occupied { border-color: #fca5a5; background: #fff5f5; }
    .bed-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
    .pasien-info { font-size: 13px; font-weight: bold; color: #991b1b; margin-bottom: 8px; }
    .kosong-info { font-size: 13px; color: #16a34a; margin-bottom: 8px; }
    button { width: 100%; padding: 6px; border-radius: 4px; border: none; cursor: pointer; font-size: 12px; font-weight: bold; }
    .btn-discharge { background: #fee2e2; color: #b91c1c; }
    .btn-admit { background: #dcfce7; color: #15803d; }
    .empty-state { text-align: center; padding: 24px; color: #94a3b8; grid-column: 1 / -1; }
  `]
})
export class BedOccupancyComponent {
  daftarBeds = signal<BedKamar[]>([
    { id: 'b1', nomorKamar: 'ICU-01', bangsal: 'Intensive Care', terisi: true, namaPasien: 'Hadi Sucipto' },
    { id: 'b2', nomorKamar: 'VIP-102', bangsal: 'Paviliun Melati', terisi: false },
    { id: 'b3', nomorKamar: 'K3-04', bangsal: 'Bangsal Umum Flamboyan', terisi: true, namaPasien: 'Siti Aminah' },
    { id: 'b4', nomorKamar: 'K3-05', bangsal: 'Bangsal Umum Flamboyan', terisi: false }
  ]);

  // Sinyal Komputasi (computed): Nilai turunan otomatis di-cache
  totalBeds = computed(() => this.daftarBeds().length);
  bedsTerisi = computed(() => this.daftarBeds().filter((b) => b.terisi).length);
  bedsKosong = computed(() => this.totalBeds() - this.bedsTerisi());
  persentaseOkupansi = computed(() => {
    if (this.totalBeds() === 0) return 0;
    return Math.round((this.bedsTerisi() / this.totalBeds()) * 100);
  });

  pulangkanPasien(id: string): void {
    this.daftarBeds.update((beds) =>
      beds.map((b) => (b.id === id ? { ...b, terisi: false, namaPasien: undefined } : b))
    );
  }

  terimaPasien(id: string): void {
    this.daftarBeds.update((beds) =>
      beds.map((b) => (b.id === id ? { ...b, terisi: true, namaPasien: 'Pasien Baru Rujukan' } : b))
    );
  }
}
```

---

## Konsep Kunci

### Mengapa Sintaks Kontrol Alur Modern (@if / @for) Mengubah Angular?
Sebelum Angular 17, pengembang harus mengimpor `CommonModule` dan menggunakan direktif struktural seperti `*ngIf="kondisi"` dan `*ngFor="let item of list"`.
Sintaks lama ini memiliki kelemahan:
1. Memerlukan impor modul tambahan.
2. Sering lupa menulis `trackBy` yang menyebabkan Angular menghancurkan dan membuat ulang seluruh elemen DOM saat array berubah.

### Sintaks Bawaan Baru:
- **`@if (kondisi) { ... } @else { ... }`**: Diterjemahkan langsung di level kompilasi compiler Angular, jauh lebih cepat dan rapi.
- **`@for (item of items; track item.id) { ... } @empty { ... }`**:
  Kata kunci `track item.id` kini **wajib ditulis**, memastikan Anda tidak pernah lagi membuat bug performa daftar!
  Blok `@empty` otomatis aktif jika array kosong, menghapus kebutuhan tag `<div *ngIf="items.length === 0">` yang kikuk.

### `computed()` Sinyal
`computed()` adalah fungsi murni yang bergantung pada sinyal lain. Sinyal ini **bersifat read-only dan otomatis di-cache**.
Jika Anda memulangkan pasien di kamar ICU-01, `persentaseOkupansi()` otomatis menghitung ulang angka persentase tanpa ada baris kode manual yang perlu memanggilnya!

---

---

## Penjelasan untuk Pemula

### Analogi: Sakelar Papan Display Kamar Operasi
1. **`@for` dengan `track item.id`** seperti lemari kunci kamar hotel bernomor: jika kunci kamar 102 diambil, resepsionis hanya membuka laci nomor 102. Resepsionis tidak perlu membongkar seluruh 500 laci lemari hanya untuk satu kamar.
2. **`computed()`** seperti kalkulator otomatis di meja kasir: begitu kamar diubah statusnya menjadi terisi, persentase okupansi di monitor kepala rumah sakit berubah seketika tanpa perlu kasir menekan tombol hitung.

## Eksperimen

- Klik tombol "Discharge" pada salah satu kamar dan amati metrik Terisi berkurang dan Okupansi turun instan.
- Klik tombol "Admisi Pasien" pada kamar kosong dan perhatikan border kamar berubah merah occupied.
- Kosongkan seluruh array daftarBeds di console dan amati blok @empty otomatis merender pesan state kosong.
- Bandingkan performa rendering @for baru dengan *ngFor lama pada daftar 1.000 item.

---

## Tantangan

Tambahkan tombol filter "Hanya Tampilkan Kamar Kosong" menggunakan sinyal `filterHanyaKosong = signal(false)`, dan buat computed signal `bedsTampil` yang menyaring daftar sesuai filter tersebut.

---

## Ringkasan

Kamu telah menguasai kontrol alur modern (@if, @for, @empty) dan sinyal computed(). Minggu depan kita mempelajari Signal Inputs dan Outputs.
