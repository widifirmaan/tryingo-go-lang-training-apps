# Angular Track: 10 Weeks (3 Levels)
# Final Product: Enterprise Multi-Tier Hospital Clinical Management & Patient Scheduling System

LEVELS = [
    {
        'levelId': 'beginer',
        'nameId': 'Standalone Components, Signals & Kontrol Alur Modern',
        'nameEn': 'Standalone Components, Signals & Modern Control Flow',
        'descId': 'Angular modern (v17-v19): Standalone components, reaktivitas Signals (signal, computed), sintaks kontrol @if/@for, dan @defer.',
        'descEn': 'Modern Angular (v17-v19): Standalone components, Signals reactivity (signal, computed), @if/@for control flow, and @defer.',
    },
    {
        'levelId': 'intermediate',
        'nameId': 'Dependency Injection, Reactive Forms & RxJS',
        'nameEn': 'Dependency Injection, Reactive Forms & RxJS',
        'descId': 'Injeksi dependensi modern via inject(), formulir reaktif bertipe ketat (Reactive Forms), dan integrasi HttpClient dengan RxJS toSignal().',
        'descEn': 'Modern Dependency Injection via inject(), strongly-typed Reactive Forms, and HttpClient integration with RxJS toSignal().',
    },
    {
        'levelId': 'advanced',
        'nameId': 'Routing Fungsional, Interceptors & Capstone RS',
        'nameEn': 'Functional Routing, Interceptors & Hospital Capstone',
        'descId': 'Router guards fungsional (CanActivateFn), HTTP interceptors modern, efek sinyal effect(), dan capstone sistem manajemen rumah sakit.',
        'descEn': 'Functional router guards (CanActivateFn), modern HTTP interceptors, signal effect(), and the enterprise hospital system capstone.',
    },
]

MODULES = [
    # Level 1: Standalone Components, Signals & Kontrol Alur Modern (Weeks 1-4)
    {
        'week': 1,
        'level': 'beginer',
        'topicId': 'standalone-components-dan-signals',
        'titleId': 'Angular Modern: Standalone Components, Tanpa NgModule & Sinyal Reaktif signal()',
        'titleEn': 'Modern Angular: Standalone Components, Zero NgModule & Reactive signal()',
        'programId': 'Antrean Pasien Rawat Jalan (Outpatient Clinic Queue) dengan Signals',
        'programEn': 'Clinical Patient Outpatient Queue with Angular Signals',
        'levelNameId': 'Standalone Components, Signals & Kontrol Alur Modern',
        'levelNameEn': 'Standalone Components, Signals & Modern Control Flow',
        'language': 'typescript',
        'code': """// ============================================================================
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
""",
        'objectivesId': [
            'Memahami arsitektur Angular modern Standalone Components tanpa kebutuhan berkas NgModule yang rumit',
            'Menguasai sistem reaktivitas Angular Signals: deklarasi signal(), pembacaan via getter (), set(), dan update()',
            'Mengetahui perbedaan reaktivitas sinyal granular (fine-grained) dibanding zone.js dirty-checking lama',
            'Menghubungkan sinyal reaktif langsung ke template HTML dengan interpolasi {{ namaSignal() }}',
            'Menerapkan data binding [property] dan event binding (event) sesuai standar Angular',
        ],
        'objectivesEn': [
            'Master modern Standalone Component architecture completely omitting legacy NgModule boilerplate',
            'Master the Angular Signals reactivity model: signal() declarations, getter reading (), set(), and update()',
            'Contrast fine-grained signal notification pipelines against legacy zone.js dirty-checking overhead',
            'Bind reactive signals directly into HTML templates using getter interpolation {{ mySignal() }}',
            'Deploy canonical property [property] and event (event) bindings adhering to modern Angular conventions',
        ],
        'explanationId': """### Revolusi Angular Modern: Standalone & Signals
Angular telah bertransformasi total sejak versi 17+. Dua pilar terbesarnya adalah:
1. **Kematian `NgModule`**: Dulu pengembang harus mendaftarkan komponen ke dalam `AppModule` yang sangat membingungkan. Sekarang, setiap komponen adalah **`standalone: true`** yang dapat mengimpor dependensinya sendiri secara mandiri (`imports: [...]`).
2. **Revolusi Signals (`signal()`)**:
   Dulu Angular mengandalkan *Zone.js* yang memindai seluruh pohon komponen dari atas ke bawah setiap kali ada klik mouse (*dirty checking* yang lambat).
   Dengan **Signals**, Angular tahu persis **bagian teks mana di template yang perlu diperbarui secara langsung (*surgical DOM updates*)**, membuat aplikasi Angular secepat kilat!

### Anatomi Signal:
- Baca nilai: Panggil sebagai fungsi `this.nomorAntreanAktif()` atau di template `{{ nomorAntreanAktif() }}`.
- Ubah nilai mutlak: `this.isKlinikBuka.set(false)`.
- Ubah berbasis nilai lama: `this.sisaAntrean.update(lama => lama + 1)`.""",
        'explanationEn': """### The Modern Angular Renaissance: Standalone & Signals
Angular has reinvented itself starting in v17+. The two core architectural triumphs:
1. **The Deprecation of `NgModule`**: Developers no longer register components across unwieldy `AppModule` manifests. Every component is **`standalone: true`**, declaring its isolated dependencies directly (`imports: [...]`).
2. **The Signals Revolution (`signal()`)**:
   Historically, Angular leaned upon *Zone.js*, monkey-patching async APIs and diffing the entire application tree top-to-bottom on every user interaction.
   With **Signals**, Angular tracks exact template interpolation nodes, executing **surgical fine-grained updates** yielding breakthrough performance!

### Signal Primitives:
- Read: Evaluate as a function invocation `this.queueNumber()` or in templates `{{ queueNumber() }}`.
- Absolute Mutation: `this.isOpen.set(false)`.
- Functional Transition: `this.remaining.update(prev => prev + 1)`.""",
        'beginnerId': """### Analogi: Sakelar Papan Skor Rumah Sakit
1. **Zone.js (Lama)** seperti petugas rumah sakit yang harus berlari memeriksa semua 500 kamar rawat inap setiap kali bel pintu depan berbunyi, hanya untuk memastikan apakah ada lampu kamar yang mati. Sangat melelahkan dan boros tenaga.
2. **Signals (Modern)** seperti kabel listrik pintar langsung: begitu tombol bel antrean ditekan (*signal update*), angka di lampu LED papan loket nomor 3 langsung berkedip berganti angka (*surgical update*), tanpa petugas perlu memeriksa 499 kamar lainnya.""",
        'beginnerEn': """### Analogy: Hospital Call Bells & Circuit Switches
1. **Zone.js (Legacy)** is a hospital orderly sprinting across all 500 patient wards every time a visitor opens the lobby door, simply to check if a light bulb flickered anywhere in the building. Wasteful and inefficient.
2. **Signals (Modern)** are dedicated direct copper wiring: when the nurse desk taps the queue bell (*signal update*), only LED Display #3 updates its numeric digits (*surgical DOM commit*), leaving the remaining 499 wards completely undisturbed.""",
        'experimentsId': [
            'Klik tombol "Panggil Berikutnya" dan amati nomor antrean bertambah sementara sisa pasien berkurang instan.',
            'Klik tombol "Tutup Pendaftaran" dan amati tombol panggilan dinonaktifkan (disabled) secara reaktif.',
            'Coba baca sinyal tanpa tanda kurung nomorAntreanAktif di template dan amati Angular menampilkan representasi fungsi sinyal.',
            'Buka file main.ts pada project Angular modern dan buktikan tidak ada lagi AppModule sama sekali.',
        ],
        'experimentsEn': [
            'Click "Panggil Berikutnya" observing current queue increment while remaining tallies decrement instantly.',
            'Toggle clinic status to closed observing call buttons disable reactively.',
            'Omit invocation parentheses in templates to observe how Angular renders function references.',
            'Inspect main.ts in modern Angular CLI projects confirming bootstrapApplication operates without AppModule.',
        ],
        'challengeId': 'Tambahkan sinyal baru `waktuPelayananRataRata = signal(15)` (menit), lalu buat tampilan estimasi total waktu tunggu pasien terakhir yang dihitung dari perkalian sisaAntrean dan waktu rata-rata.',
        'challengeEn': 'Introduce an `averageWaitMinutes = signal(15)` state, computing the estimated wait time for the last queued patient by multiplying remaining queue count by average duration.',
        'summaryId': 'Kamu telah menguasai Standalone Components dan dasar Angular Signals. Minggu depan kita mempelajari Kontrol Alur Modern (@if, @for) dan computed signals.',
        'summaryEn': 'You have mastered Standalone Components and Angular Signals. Next week, we examine Modern Control Flow (@if, @for) and computed signals.',
    },
    {
        'week': 2,
        'level': 'beginer',
        'topicId': 'modern-control-flow-dan-computed',
        'titleId': 'Kontrol Alur Modern (@if, @for, @empty) & Sinyal Komputasi computed()',
        'titleEn': 'Modern Control Flow (@if, @for, @empty) & computed() Signals',
        'programId': 'Dashboard Okupansi Kamar Rawat Inap Rumah Sakit (Bed Occupancy Rate)',
        'programEn': 'Hospital Bed Occupancy Dashboard with @for & computed() Metrics',
        'levelNameId': 'Standalone Components, Signals & Kontrol Alur Modern',
        'levelNameEn': 'Standalone Components, Signals & Modern Control Flow',
        'language': 'typescript',
        'code': """// ============================================================================
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
""",
        'objectivesId': [
            'Memahami migrasi dari direktif struktural usang (*ngIf, *ngFor) ke sintaks kontrol alur bawaan modern (@if, @for)',
            'Menggunakan blok @for dengan tracking kunci wajib (track item.id) untuk rekonsiliasi DOM instan',
            'Memanfaatkan blok @empty untuk menampilkan state kosong tanpa kondisi tambahan',
            'Menggunakan computed() signals untuk kalkulasi metrik analitik rumah sakit yang otomatis ter-cache',
            'Menerapkan mutasi data array secara immutable menggunakan spread operator di dalam sinyal update()',
        ],
        'objectivesEn': [
            'Migrate from legacy structural directives (*ngIf, *ngFor) to modern built-in control flow (@if, @for)',
            'Deploy the @for block with mandatory identity tracking (track item.id) guaranteeing optimal reconciliation',
            'Leverage the built-in @empty clause handling empty state collections declaratively',
            'Deploy computed() signals for automatic cached evaluations of hospital occupancy KPI metrics',
            'Enforce immutable array transformations within signal update() closures',
        ],
        'explanationId': """### Mengapa Sintaks Kontrol Alur Modern (@if / @for) Mengubah Angular?
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
Jika Anda memulangkan pasien di kamar ICU-01, `persentaseOkupansi()` otomatis menghitung ulang angka persentase tanpa ada baris kode manual yang perlu memanggilnya!""",
        'explanationEn': """### Why Modern Built-in Control Flow (@if / @for) Revolutionized Angular
Prior to Angular 17, developers imported `CommonModule`, relying upon archaic structural micro-syntax: `*ngIf="condition"` and `*ngFor="let item of list"`.
Flaws:
1. Mandated external module plumbing.
2. Developers frequently neglected `trackBy`, causing Angular to destructively remount entire DOM lists.

### The New Built-In Directives:
- **`@if (condition) { ... } @else { ... }`**: Parsed natively at compile time with zero runtime directive overhead.
- **`@for (item of items; track item.id) { ... } @empty { ... }`**:
  Tracking keys via `track item.id` is now **mandatory**, preventing list rendering regressions by design!
  The companion `@empty` block renders fallback state seamlessly when arrays empty out.

### `computed()` Signals
`computed()` declares read-only derived values subscribing to upstream signals.
Mutating bed occupancy causes `persentaseOkupansi()` to recalculate lazily and update the DOM automatically!""",
        'beginnerId': """### Analogi: Sakelar Papan Display Kamar Operasi
1. **`@for` dengan `track item.id`** seperti lemari kunci kamar hotel bernomor: jika kunci kamar 102 diambil, resepsionis hanya membuka laci nomor 102. Resepsionis tidak perlu membongkar seluruh 500 laci lemari hanya untuk satu kamar.
2. **`computed()`** seperti kalkulator otomatis di meja kasir: begitu kamar diubah statusnya menjadi terisi, persentase okupansi di monitor kepala rumah sakit berubah seketika tanpa perlu kasir menekan tombol hitung.""",
        'beginnerEn': """### Analogy: Hospital Key Cabinets & Automated Tallies
1. **`@for` with `track item.id`** is a precision numbered master key cabinet: retrieving the key for Suite 102 opens only locker slot 102 without rummaging through all 500 lockers.
2. **`computed()`** is the medical director's digital occupancy monitor: discharging a patient triggers the display board percentage to drop in real-time without administrative recalculations.""",
        'experimentsId': [
            'Klik tombol "Discharge" pada salah satu kamar dan amati metrik Terisi berkurang dan Okupansi turun instan.',
            'Klik tombol "Admisi Pasien" pada kamar kosong dan perhatikan border kamar berubah merah occupied.',
            'Kosongkan seluruh array daftarBeds di console dan amati blok @empty otomatis merender pesan state kosong.',
            'Bandingkan performa rendering @for baru dengan *ngFor lama pada daftar 1.000 item.',
        ],
        'experimentsEn': [
            'Discharge a patient to observe occupied metrics decrease and occupancy percentages recalculate.',
            'Admit a patient into a vacant bed observing the visual border adapt to occupied red.',
            'Clear the bed array to verify the @empty block renders fallback empty state messaging.',
            'Benchmark @for rendering throughput against legacy *ngFor directives over 1,000 entities.',
        ],
        'challengeId': 'Tambahkan tombol filter "Hanya Tampilkan Kamar Kosong" menggunakan sinyal `filterHanyaKosong = signal(false)`, dan buat computed signal `bedsTampil` yang menyaring daftar sesuai filter tersebut.',
        'challengeEn': 'Introduce a "Show Vacant Only" filter via `filterVacantOnly = signal(false)` driving a derived `displayedBeds` computed signal.',
        'summaryId': 'Kamu telah menguasai kontrol alur modern (@if, @for, @empty) dan sinyal computed(). Minggu depan kita mempelajari Signal Inputs dan Outputs.',
        'summaryEn': 'You have mastered modern control flow (@if, @for, @empty) and computed() signals. Next week, we examine Signal Inputs and Outputs.',
    },
    {
        'week': 3,
        'level': 'beginer',
        'topicId': 'input-output-dan-component-interaction',
        'titleId': 'Komunikasi Komponen Modern: input(), input.required() & output() Signals',
        'titleEn': 'Modern Component Communication: input(), input.required() & output() Signals',
        'programId': 'Lencana Triase Kegawatdaruratan Medis (Medical Triage Badge)',
        'programEn': 'Emergency Triage Badge Component with Signal Inputs & Output Events',
        'levelNameId': 'Standalone Components, Signals & Kontrol Alur Modern',
        'levelNameEn': 'Standalone Components, Signals & Modern Control Flow',
        'language': 'typescript',
        'code': """// ============================================================================
// File: src/app/triage-badge.component.ts (Komponen Anak Berbasis Signal Inputs)
// ============================================================================
import { Component, input, output, computed } from '@angular/core';

export type TingkatTriase = 'MERAH' | 'KUNING' | 'HIJAU' | 'HITAM';

@Component({
  selector: 'app-triage-badge',
  standalone: true,
  template: `
    <div class="triage-card" [style.border-color]="warnaAksen()">
      <div class="header">
        <span class="kode-triase" [style.background]="warnaAksen()">{{ tingkat() }}</span>
        <span class="pasien-nama">{{ namaPasien() }}</span>
      </div>

      <div class="desc">{{ deskripsiKlinis() }}</div>

      <div class="actions">
        <button (click)="eskalasiKasus()" class="btn-escalate">Eskalasi Triase ↑</button>
        <button (click)="selesaikanTriase()" class="btn-resolve">Tangani Segera ✓</button>
      </div>
    </div>
  `,
  styles: [`
    .triage-card { border-left: 6px solid #cbd5e1; background: white; padding: 12px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 8px; }
    .header { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
    .kode-triase { color: white; font-weight: bold; font-size: 11px; padding: 2px 6px; border-radius: 3px; }
    .pasien-nama { font-weight: bold; font-size: 14px; color: #0f172a; }
    .desc { font-size: 12px; color: #64748b; margin-bottom: 10px; }
    .actions { display: flex; gap: 6px; }
    button { padding: 4px 8px; font-size: 11px; border-radius: 4px; border: 1px solid #cbd5e1; cursor: pointer; }
    .btn-escalate { background: #fef2f2; color: #b91c1c; border-color: #fca5a5; }
    .btn-resolve { background: #f0fdf4; color: #15803d; border-color: #86efac; }
  `]
})
export class TriageBadgeComponent {
  // 1. input.required(): Input wajib dari parent sebagai Sinyal Murni (Read-Only)
  namaPasien = input.required<string>();
  
  // 2. input() dengan nilai default
  tingkat = input<TingkatTriase>('HIJAU');

  // 3. output(): Menggantikan @Output() EventEmitter lama dengan fungsi emisi bersih
  triageChanged = output<{ nama: string; tingkatBaru: TingkatTriase }>();
  patientResolved = output<string>();

  // 4. computed() turunan dari input signal
  warnaAksen = computed(() => {
    switch (this.tingkat()) {
      case 'MERAH': return '#dc2626'; // Darurat Kritis (Resusitasi)
      case 'KUNING': return '#d97706'; // Mendesak
      case 'HIJAU': return '#16a34a';  // Non-Mendesak
      case 'HITAM': return '#18181b';  // Meninggal / Fatal
    }
  });

  deskripsiKlinis = computed(() => {
    switch (this.tingkat()) {
      case 'MERAH': return 'Ancaman nyawa langsung! Butuh penanganan dalam 0 menit.';
      case 'KUNING': return 'Kondisi stabil dengan risiko memburuk dalam 30 menit.';
      case 'HIJAU': return 'Cedera ringan, pasien dapat menunggu di ruang observasi.';
      case 'HITAM': return 'Pasien tiba tanpa tanda-tanda vital yang dapat diselamatkan.';
    }
  });

  eskalasiKasus(): void {
    const urutan: Record<TingkatTriase, TingkatTriase> = {
      'HIJAU': 'KUNING',
      'KUNING': 'MERAH',
      'MERAH': 'HITAM',
      'HITAM': 'HITAM'
    };
    this.triageChanged.emit({ nama: this.namaPasien(), tingkatBaru: urutan[this.tingkat()] });
  }

  selesaikanTriase(): void {
    this.patientResolved.emit(this.namaPasien());
  }
}
""",
        'objectivesId': [
            'Memahami evolusi Angular dari dekorator @Input/@Output ke fungsi signal input() dan output()',
            'Menggunakan input.required() untuk menegakkan kontrak props wajib pada waktu kompilasi TypeScript',
            'Membaca nilai input sebagai Sinyal fungsi bawaan (namaInput()) yang reaktif otomatis',
            'Memanfaatkan output() untuk memancarkan event ke parent tanpa overhead EventEmitter RxJS',
            'Mengombinasikan input signals secara langsung di dalam sinyal turunan computed()',
        ],
        'objectivesEn': [
            'Trace the evolution from legacy @Input/@Output decorators to functional input() and output() primitives',
            'Enforce mandatory parent contracts via input.required() checked at TypeScript compile time',
            'Consume input signals reactively via function call syntax (myInput()) within components and computed derivations',
            'Deploy output() emitting type-safe events to parent components without EventEmitter overhead',
            'Combine input signals directly within computed() derivation graphs seamlessly',
        ],
        'explanationId': """### Sinyal Input & Output: Era Baru Komponen Angular
Dulu di Angular, mendeklarasikan input menggunakan dekorator: `@Input() nama: string = '';`.
Kelemahannya: jika nilai input berubah dari luar, komponen anak **tidak tahu kapan perubahan itu terjadi** tanpa mengimplementasikan interface `ngOnChanges` yang sangat rumit.

### Mengapa `input()` Sinyal Lebih Baik?
Di Angular modern:
1. **`input<string>()`**: Menghasilkan sinyal reaktif murni.
2. Anda bisa langsung menggunakannya di dalam `computed()`:
   `warnaAksen = computed(() => this.tingkat() === 'MERAH' ? 'red' : 'green')`.
   Begitu parent mengubah `[tingkat]="'MERAH'"`, warna aksen anak langsung berubah seketika tanpa `ngOnChanges`!
3. **`output()`**: Menghasilkan pemancar event tanpa perlu mengimpor `EventEmitter` dari RxJS, jauh lebih ringan dan modern.""",
        'explanationEn': """### Signal Inputs & Outputs: The Modern Angular Paradigm
Previously, component inputs required decorators: `@Input() name: string = '';`.
Major limitation: tracking parent changes required implementing cumbersome `ngOnChanges` lifecycle interfaces.

### Why `input()` Signals Triumph:
1. **`input<T>()`**: Returns a first-class reactive Signal.
2. Composes natively inside `computed()` derivations:
   `accentColor = computed(() => this.level() === 'MERAH' ? 'red' : 'green')`.
   When parents alter `[level]="'MERAH'"`, child derivations recalculate immediately with zero lifecycle ceremony!
3. **`output()`**: Replaces legacy RxJS `EventEmitter` classes with lean, performant event dispatcher handles.""",
        'beginnerId': """### Analogi: Gelang Triase UGD Rumah Sakit
1. **`input()`** seperti barcode pada gelang tangan pasien di Unit Gawat Darurat (UGD): dokter di UGD membaca barcode gelang pasien (*input sinyal*). Jika pasien dipindahkan dari ruang periksa ke ruang operasi (*parent ubah data*), informasi di gelang langsung ter-update otomatis.
2. **`output()`** seperti tombol sirene darurat di samping ranjang pasien: saat perawat menekan tombol eskalasi (*emit*), sirine menyala di meja kepala dokter jaga (*parent menangani aksi*).""",
        'beginnerEn': """### Analogy: Emergency ER Wristbands & Nurse Call Sirens
1. **`input()`** is a digital patient ER wristband: physicians scan the electronic barcode (*input signal*). If central triage elevates priority from ambulatory to ICU (*parent mutation*), the digital wristband display reflects the alert instantly.
2. **`output()`** is the bedside nurse emergency call button: hitting the escalation switch (*emit*) rings an alarm at the trauma attending station (*parent event handler*).""",
        'experimentsId': [
            'Kirimkan prop tingkat="MERAH" dari parent dan perhatikan kartu langsung bergaris merah tua dengan deskripsi darurat kritis.',
            'Klik tombol "Eskalasi Triase" dan buktikan event triageChanged terpancar dengan tingkat baru (Hijau -> Kuning).',
            'Hapus pengiriman prop namaPasien dan perhatikan compiler melempar eror merah karena input.required().',
            'Gunakan model() input untuk two-way binding dua arah modern di Angular.',
        ],
        'experimentsEn': [
            'Pass tingkat="MERAH" from parent to observe the card adopt red styling with critical alerts.',
            'Click "Eskalasi Triase" verifying the triageChanged event emits with elevated status.',
            'Omit namaPasien to verify the compiler flags compile-time errors via input.required().',
            'Explore the modern model() signal primitive for two-way signal binding between components.',
        ],
        'challengeId': 'Gunakan `model()` (Two-Way Binding Signal baru di Angular) untuk membuat sakelar status `isTerkonfirmasi = model(false)` yang dapat diubah oleh anak dan otomatis tersinkronisasi ke parent.',
        'challengeEn': 'Deploy the `model()` two-way signal primitive creating an `isConfirmed = model(false)` toggle synchronizing bidirectionally with parent components.',
        'summaryId': 'Kamu telah menguasai input(), input.required(), dan output() berbasis sinyal. Minggu depan kita mempelajari Deferrable Views (@defer) untuk pemuatan komponen malas.',
        'summaryEn': 'You have mastered signal-driven input(), input.required(), and output(). Next week, we examine Deferrable Views (@defer) for high-performance lazy loading.',
    },
    {
        'week': 4,
        'level': 'beginer',
        'topicId': 'deferrable-views-dan-loading',
        'titleId': 'Deferrable Views: Optimasi Pemuatan Malas (@defer, @placeholder, @loading, @error)',
        'titleEn': 'Deferrable Views: Lazy Loading Optimization with @defer & Triggers',
        'programId': 'Jadwal Dokter Spesialis & Riwayat Pasien dengan Pemuatan On-Viewport',
        'programEn': 'Specialist Doctor Timeline with On-Viewport Deferrable Views',
        'levelNameId': 'Standalone Components, Signals & Kontrol Alur Modern',
        'levelNameEn': 'Standalone Components, Signals & Modern Control Flow',
        'language': 'typescript',
        'code': """// ============================================================================
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
""",
        'objectivesId': [
            'Memahami inovasi Deferrable Views (@defer) sebagai fitur pemecahan kode (code splitting) tingkat deklaratif di template',
            'Menggunakan berbagai pemicu defer: on viewport (terlihat di layar), on interaction (diklik), on hover, on timer',
            'Menggunakan blok @placeholder untuk reservasi layout visual dan mencegah layout shifts',
            'Mengonfigurasi blok @loading dengan timer minimum 500ms untuk mencegah efek flicker berkedip',
            'Mereduksi ukuran bundel JavaScript awal (Initial Bundle Size) hingga 60% pada halaman enterprise yang panjang',
        ],
        'objectivesEn': [
            'Master Deferrable Views (@defer) as declarative template-driven code-splitting boundaries',
            'Deploy dynamic defer triggers: on viewport (intersection observer), on interaction, on hover, on timer',
            'Utilize the @placeholder block to reserve geometry layouts eliminating Cumulative Layout Shift (CLS)',
            'Tune @loading boundaries with minimum display thresholds (minimum 500ms) eliminating visual flicker',
            'Shrink initial JavaScript bundle footprints up to 60% across expansive enterprise portals',
        ],
        'explanationId': """### Revolusi Deferrable Views di Angular
Sebelumnya, jika sebuah halaman rumah sakit memiliki grafik analitik raksasa, tabel 50 dokter, dan peta poliklinik di bagian paling bawah halaman:
Browser pengguna terpaksa mengunduh **seluruh megabyte kode JavaScript tersebut di muka**, memperlambat waktu buka web (*First Contentful Paint*).

Dengan **`@defer`**:
Angular secara otomatis **memecah komponen tersebut menjadi file JavaScript terpisah (*lazy chunk*)**.
Kode tersebut HANYA diunduh dan dirender saat:
- `on viewport`: Elemen mulai masuk ke layar pengguna saat digulir.
- `on interaction`: Pengguna mengeklik tombol tertentu.
- `on hover`: Kursor mouse mendekati area tersebut.
Semua ini terjadi tanpa Anda perlu menulis satupun baris kode router atau dynamic import manual!""",
        'explanationEn': """### The Architecture of Deferrable Views
Historically, embedding heavy charting engines or expansive scheduling matrices at the bottom of views forced browsers to download **entire megabytes of script up-front**, degrading initial load scores.

With **`@defer`**:
The Angular compiler isolates the enclosed template into an asynchronous lazy-loaded JavaScript chunk.
The browser fetches and hydrates markup strictly when triggered:
- `on viewport`: The placeholder crosses the viewport via IntersectionObserver.
- `on interaction`: Users focus or click target controls.
- `on hover`: Pointer cursors hover over related trigger nodes.
This declarative optimization occurs without configuring routing rules or authoring manual dynamic imports!""",
        'beginnerId': """### Analogi: Tirai Kamar Operasi & Buku Menu Tebal
Bayangkan buku menu restoran yang memiliki 100 halaman:
1. **Tanpa @defer**, pelayan membacakan seluruh 100 halaman menu sejak Anda baru melangkahkan kaki di pintu depan restoran. Kepala Anda pusing dan lelah (*loading web lambat*).
2. **Dengan @defer**, pelayan hanya memberikan lembaran menu pembuka (*halaman utama*). Begitu Anda membalik halaman kedua (*on viewport scroll*), pelayan baru mengambilkan lembaran menu hidangan penutup yang baru dicetak dari kasir (*chunk diunduh saat dibutuhkan*).""",
        'beginnerEn': """### Analogy: Progressive Dining Menus & Stage Curtains
Imagine a 100-page restaurant catalog:
1. **Without @defer**, waitstaff recite all 100 pages the millisecond diners cross the front doorway, overwhelming patrons (*sluggish initial hydration*).
2. **With @defer**, staff hand you a crisp single-page appetizer card. Only when you flip to dessert (*on viewport scroll*) do staff fetch the pastry menu from the pantry (*downloaded strictly on demand*).""",
        'experimentsId': [
            'Buka tab Network di browser, scroll halaman ke bawah hingga area placeholder terlihat, dan saksikan chunk JS diunduh otomatis tepat pada detik itu!',
            'Ganti pemicu menjadi @defer (on interaction) dan klik pada placeholder untuk memicu pemuatan.',
            'Uji simulasi koneksi slow 3G di DevTools untuk melihat blok @loading berkedip kuning sebelum konten dokter muncul.',
            'Amati bahwa ukuran bundel awal halaman berkurang drastis berkat pemecahan kode otomatis.',
        ],
        'experimentsEn': [
            'Inspect network activity while scrolling downward; watch the lazy JS chunk stream in the instant the viewport threshold trips!',
            'Switch trigger syntax to @defer (on interaction) and click the placeholder to trigger on-demand loading.',
            'Throttle network to Slow 3G in DevTools to observe the @loading yellow banner display for its minimum 500ms.',
            'Benchmark initial bundle distributions verifying code splitting occurs seamlessly.',
        ],
        'challengeId': 'Buat tombol pemicu `<button #tombolBuka>` dan konfigurasikan `@defer (on interaction(tombolBuka))` yang menunda pemuatan komponen riwayat rekam medis hingga tombol ditekan.',
        'challengeEn': 'Author a trigger element `<button #openBtn>` configuring `@defer (on interaction(openBtn))` delaying medical record imports until explicit button clicks.',
        'summaryId': 'Kamu telah menguasai Deferrable Views (@defer, @placeholder, @loading). Minggu depan kita memasuki Level 2: Dependency Injection modern via inject() dan Reactive Forms.',
        'summaryEn': 'You have mastered Deferrable Views and lazy compilation. Next week, we enter Level 2: Modern Dependency Injection via inject() and Reactive Forms.',
    },

    # Level 2: Dependency Injection, Reactive Forms & RxJS (Weeks 5-7)
    {
        'week': 5,
        'level': 'intermediate',
        'topicId': 'dependency-injection-dan-services',
        'titleId': 'Dependency Injection Modern: Fungsi inject() & Layanan Rekam Medis (providedIn)',
        'titleEn': 'Modern Dependency Injection: The inject() Function & ProvidedIn Services',
        'programId': 'Layanan Pusat Rekam Medis Pasien (Patient Records Service)',
        'programEn': 'Centralized Hospital Patient Records Service with inject()',
        'levelNameId': 'Dependency Injection, Reactive Forms & RxJS',
        'levelNameEn': 'Dependency Injection, Reactive Forms & RxJS',
        'language': 'typescript',
        'code': """// ============================================================================
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
""",
        'objectivesId': [
            'Memahami sistem Dependency Injection (DI) hierarkis Angular yang bertaraf enterprise',
            'Menggunakan dekorator @Injectable({ providedIn: \'root\' }) untuk layanan singleton global pohon pohon',
            'Menguasai fungsi modern inject() yang menggantikan injeksi constructor lama yang berbelit-belit',
            'Melindungi mutasi state internal service menggunakan metode .asReadonly() pada sinyal',
            'Memisahkan logika bisnis manipulasi data medis dari lapisan presentasi visual komponen',
        ],
        'objectivesEn': [
            'Master Angular hierarchical enterprise Dependency Injection (DI) container architecture',
            'Deploy @Injectable({ providedIn: \'root\' }) establishing tree-shakable singleton services',
            'Master the modern functional inject() syntax replacing verbose constructor parameter injections',
            'Enforce service state encapsulation deploying .asReadonly() signal views to consumers',
            'Decouple medical domain mutation heuristics cleanly from presentation template tiers',
        ],
        'explanationId': """### Revolusi `inject()` di Angular Modern
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
Komponen luar hanya bisa membaca data, sedangkan mutasi wajib melalui method resmi seperti `tambahRekamMedis()`.""",
        'explanationEn': """### The `inject()` Revolution in Angular
Historically, injecting services into Angular components mandated verbose constructor signatures:
`constructor(private recordService: PatientRecordsService, private router: Router) {}`.
Modern Angular introduces the functional **`inject()`** primitive:
`readonly recordService = inject(PatientRecordsService);`
Benefits:
1. Concise, expressive, and declarative.
2. Operates outside component classes (within functional guards, interceptors, or factories).
3. Infers TypeScript types automatically without duplicating class names.

### Encapsulating Signal Stores with `.asReadonly()`
Prevent external components from executing rogue updates (`service.records.set([])`).
Keep writeable signals `private`, exposing read-only projections via `this.records.asReadonly()`.
Consumers read state transparently while modifications must pass through vetted service mutator methods.""",
        'beginnerId': """### Analogi: Ruang Farmasi Rumah Sakit & Jalur Telepon Khusus
1. **Layanan (@Injectable Service)** seperti instalasi farmasi pusat rumah sakit: ada satu gudang obat terpusat (*singleton global*) yang menyimpan seluruh pasokan obat.
2. **`inject()`** seperti telepon interkom dokter di meja periksa: dokter tidak perlu berjalan kaki ke lantai bawah membawa gerobak obat; dokter cukup mengangkat interkom (*inject(FarmasiService)*) dan obat langsung disuplai ke meja periksa secara instan.""",
        'beginnerEn': """### Analogy: Central Hospital Pharmacy & Dedicated Intercoms
1. **@Injectable Services** are the central hospital pharmacy: an audited, sterile dispensary (*global singleton*) housing pharmaceutical inventories.
2. **`inject()`** is the attending physician's desk intercom: doctors do not hike downstairs pushing medical utility carts; lifting the receiver (*inject(PharmacyService)*) orders medications dispatched directly to the examination table.""",
        'experimentsId': [
            'Panggil recordService.tambahRekamMedis(...) dari komponen dan buktikan seluruh daftar pasien langsung ter-update otomatis.',
            'Coba ubah recordService.daftarRekamMedis().push(...) dan perhatikan compiler melarang karena asReadonly().',
            'Uji injeksi service di dalam functional guard router tanpa class constructor sama sekali.',
            'Pelajari InjectionToken kustom untuk menginjeksi konfigurasi string atau objek API key.',
        ],
        'experimentsEn': [
            'Invoke recordService.tambahRekamMedis(...) from a component to witness real-time list synchronization.',
            'Attempt mutating recordService.daftarRekamMedis().push(...) to confirm asReadonly compile protections.',
            'Evaluate invoking inject() inside functional router guards without class boilerplates.',
            'Author a custom InjectionToken injecting dynamic API runtime configurations.',
        ],
        'challengeId': 'Kembangkan `PatientRecordsService` dengan fungsi pencarian reaktif `cariPasienBerdasarkanNama(nama: string)` yang mengembalikan array pasien yang cocok menggunakan metode filter array.',
        'challengeEn': 'Expand `PatientRecordsService` with a reactive `findPatientByName(name: string)` query utility returning matching patient arrays.',
        'summaryId': 'Kamu telah menguasai Dependency Injection modern dengan inject() dan enkapsulasi service asReadonly. Minggu depan kita mempelajari Reactive Forms.',
        'summaryEn': 'You have mastered modern Dependency Injection with inject() and asReadonly services. Next week, we examine Strongly-Typed Reactive Forms.',
    },
    {
        'week': 6,
        'level': 'intermediate',
        'topicId': 'reactive-forms-dan-validation',
        'titleId': 'Reactive Forms: Formulir Ber-Tipe Ketat (Typed Forms), Validasi & Custom Async Validators',
        'titleEn': 'Reactive Forms: Strongly-Typed Forms, Validations & Custom Async Validators',
        'programId': 'Formulir Pendaftaran Pasien Rawat Inap Darurat (Emergency Admission Form)',
        'programEn': 'Emergency Patient Admission Form with Typed Reactive Forms & Validators',
        'levelNameId': 'Dependency Injection, Reactive Forms & RxJS',
        'levelNameEn': 'Dependency Injection, Reactive Forms & RxJS',
        'language': 'typescript',
        'code': """// ============================================================================
// File: src/app/form-admisi-darurat.component.ts (Typed Reactive Forms Modern)
// ============================================================================
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-admisi-darurat',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="formAdmisi" (ngSubmit)="submitPendaftaran()" class="form-container">
      <h3>Pendaftaran Pasien Gawat Darurat</h3>

      <div class="field">
        <label>Nomor Induk Kependudukan (NIK - 16 Digit) *</label>
        <input type="text" formControlName="nik" placeholder="3201..." />
        @if (formAdmisi.controls.nik.touched && formAdmisi.controls.nik.errors?.['required']) {
          <small class="error">NIK wajib diisi!</small>
        }
        @if (formAdmisi.controls.nik.errors?.['minlength']) {
          <small class="error">NIK harus tepat 16 digit angka.</small>
        }
      </div>

      <div class="field">
        <label>Nama Lengkap Pasien *</label>
        <input type="text" formControlName="namaLengkap" />
      </div>

      <div class="field">
        <label>Golongan Darah:</label>
        <select formControlName="golonganDarah">
          <option value="A">Golongan Darah A</option>
          <option value="B">Golongan Darah B</option>
          <option value="AB">Golongan Darah AB</option>
          <option value="O">Golongan Darah O</option>
        </select>
      </div>

      <div class="field">
        <label>
          <input type="checkbox" formControlName="adaAlergiObat" />
          Memiliki Riwayat Alergi Obat Berat
        </label>
      </div>

      <button type="submit" [disabled]="formAdmisi.invalid" class="btn-submit">
        Konfirmasi Admisi Pasien
      </button>
    </form>
  `,
  styles: [`
    .form-container { max-width: 440px; margin: 20px auto; font-family: sans-serif; padding: 20px; border: 1px solid #cbd5e1; border-radius: 8px; background: white; }
    h3 { margin-top: 0; color: #b91c1c; }
    .field { margin-bottom: 14px; }
    label { display: block; font-size: 13px; font-weight: bold; margin-bottom: 4px; }
    input[type="text"], select { width: 100%; padding: 8px; box-sizing: border-box; border: 1px solid #cbd5e1; border-radius: 4px; }
    .error { color: #dc2626; font-size: 12px; }
    .btn-submit { width: 100%; padding: 10px; background: #0f172a; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
    .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
  `]
})
export class FormAdmisiDaruratComponent {
  // Strictly-Typed Reactive Form (TypeScript memeriksa kesesuaian tipe nilai form)
  readonly formAdmisi = new FormGroup({
    nik: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(16), Validators.maxLength(16)]
    }),
    namaLengkap: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),
    golonganDarah: new FormControl<'A' | 'B' | 'AB' | 'O'>('O', { nonNullable: true }),
    adaAlergiObat: new FormControl<boolean>(false, { nonNullable: true })
  });

  submitPendaftaran(): void {
    if (this.formAdmisi.invalid) return;

    // Nilai form memiliki tipe TypeScript yang akurat tanpa perlu casting 'as any'
    const payload = this.formAdmisi.getRawValue();
    console.log('[Admisi UGD] Memproses pendaftaran:', payload);
    alert(`Pasien ${payload.namaLengkap} (NIK: ${payload.nik}) berhasil didaftarkan ke sistem!`);
    this.formAdmisi.reset();
  }
}
""",
        'objectivesId': [
            'Memahami keunggulan Strictly-Typed Reactive Forms yang diperkenalkan di Angular modern',
            'Menggunakan FormGroup dan FormControl dengan opsi nonNullable: true untuk mencegah bug null',
            'Menerapkan validator bawaan: Validators.required, minLength, maxLength, pattern',
            'Menampilkan pesan kesalahan validasi secara kontekstual hanya saat input telah disentuh (.touched)',
            'Mengekstrak nilai payload formulir menggunakan .getRawValue() dengan keamanan tipe TypeScript penuh',
        ],
        'objectivesEn': [
            'Master Strictly-Typed Reactive Forms delivering end-to-end compile-time safety across form controls',
            'Configure FormGroup and FormControl with nonNullable: true options preventing unexpected null states',
            'Deploy standard validators: Validators.required, minLength, maxLength, and regex patterns',
            'Render contextual field validation feedback strictly when inputs have been touched (.touched)',
            'Extract typed payload models via .getRawValue() retaining strict TypeScript contracts without type assertions',
        ],
        'explanationId': """### Mengapa Reactive Forms Angular Terbaik di Kelasnya?
Berbeda dengan template-driven forms atau form handling di framework lain yang sering mengandalkan manipulasi string, **Reactive Forms Angular adalah arsitektur berbasis objek terstruktur**:
1. **Strictly-Typed Forms**: Di Angular modern, jika Anda mengakses `form.controls.nik.value`, TypeScript tahu pasti bahwa tipenya adalah `string`, bukan `any` atau `null`!
2. **Validasi Sinkron & Asinkron**: Anda bisa menambahkan validator kustom untuk memeriksa apakah NIK sudah pernah terdaftar di database rumah sakit secara asinkron (*Async Validator*).
3. **Immutability & Testing**: Sangat mudah diuji dengan unit test tanpa perlu me-render DOM browser.""",
        'explanationEn': """### Why Angular Reactive Forms Lead the Industry
Unlike loose template-driven models or string-based form handlers, **Angular Reactive Forms embody structured programmatic architectures**:
1. **Strictly-Typed Controls**: In modern Angular, accessing `form.controls.nik.value` resolves deterministically as `string`, eliminating unvalidated `any` leaks!
2. **Synchronous & Asynchronous Validations**: You bind asynchronous validator observables verifying whether a national identity ID already exists in clinical databases before permitting submission (*Async Validators*).
3. **Headless Testability**: The underlying form model executes completely detached from the DOM, empowering lightning-fast headless unit testing.""",
        'beginnerId': """### Analogi: Formulir Rekam Medis Kertas Karbon
**Reactive Forms** seperti formulir pendaftaran rumah sakit berformat standar: setiap kotak isian (Nama, NIK, Golongan Darah) memiliki ukuran dan aturan ketat (misal kotak NIK terdiri dari tepat 16 kotak kecil). Jika pasien baru mengisi 15 kotak, sistem di meja admisi menolak memproses berkas sebelum kotak ke-16 diisi lengkap.""",
        'beginnerEn': """### Analogy: Carbon-Copy Clinical Intake Templates
**Reactive Forms** are structured clinical intake templates: every field (Name, National ID, Blood Type) maintains explicit geometric constraints (the National ID section holds exactly 16 discrete boxes). If an admitting clerk leaves box 16 blank, intake systems halt processing until all validation criteria clear.""",
        'experimentsId': [
            'Ketik NIK sebanyak 10 digit dan amati pesan eror "NIK harus tepat 16 digit angka" muncul seketika.',
            'Coba tekan tombol Submit saat form kosong dan buktikan tombol disabled tidak bisa diklik.',
            'Gunakan formAdmisi.valueChanges.subscribe(...) di TypeScript untuk mengamati perubahan data formulir secara real-time.',
            'Tambahkan validator kustom yang melarang NIK bernilai "0000000000000000".',
        ],
        'experimentsEn': [
            'Enter a 10-digit NIK to observe the minlength validation error fire reactively.',
            'Attempt submitting an empty form to observe button disabled state enforcement.',
            'Subscribe to formAdmisi.valueChanges observing telemetry streams in real time.',
            'Author a custom validator rejecting invalid dummy NIK inputs such as "0000000000000000".',
        ],
        'challengeId': 'Buat custom validator fungsi `validatorTanggalLahir()` yang memastikan tanggal lahir yang dimasukkan pasien tidak berada di masa depan.',
        'challengeEn': 'Author a custom `birthDateValidator()` ensuring entered patient birth dates cannot reside in the future.',
        'summaryId': 'Kamu telah menguasai Strictly-Typed Reactive Forms dan validasi data. Minggu depan kita mempelajari integrasi RxJS dan HttpClient dengan toSignal().',
        'summaryEn': 'You have mastered Strictly-Typed Reactive Forms and validations. Next week, we examine RxJS integration, HttpClient, and the toSignal() bridge.',
    },
    {
        'week': 7,
        'level': 'intermediate',
        'topicId': 'rxjs-dan-httpclient',
        'titleId': 'Integrasi RxJS Modern & HttpClient: switchMap, debounceTime & Jembatan toSignal()',
        'titleEn': 'Modern RxJS & HttpClient: switchMap, debounceTime & The toSignal() Bridge',
        'programId': 'Monitor Telemetri Vital Pasien & Pencarian Obat Real-Time',
        'programEn': 'Real-Time Patient Telemetry & Medicine Lookup with toSignal()',
        'levelNameId': 'Dependency Injection, Reactive Forms & RxJS',
        'levelNameEn': 'Dependency Injection, Reactive Forms & RxJS',
        'language': 'typescript',
        'code': """// ============================================================================
// File: src/app/pencarian-obat.component.ts (RxJS + toSignal() Bridge)
// ============================================================================
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, delay } from 'rxjs/operators';

interface ObatFarmasi {
  kode: string;
  nama: string;
  stok: number;
}

@Component({
  selector: 'app-pencarian-obat',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="farmasi-lookup">
      <h3>Pencarian Resep Obat Farmasi (RxJS + toSignal)</h3>
      
      <input
        type="text"
        [formControl]="queryControl"
        placeholder="Ketik nama obat (misal: Paracetamol, Amoxicillin)..."
        class="search-input"
      />

      <div class="results">
        <small style="color: #64748b;">Hasil Pencarian Real-Time (Debounced 300ms):</small>
        <ul>
          @for (item of hasilPencarianSinyal(); track item.kode) {
            <li>
              <strong>{{ item.nama }}</strong> (Kode: {{ item.kode }})
              <span class="stok" [class.kritis]="item.stok < 10">Stok: {{ item.stok }} botol</span>
            </li>
          } @empty {
            <li class="empty">Tidak ditemukan obat yang cocok.</li>
          }
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .farmasi-lookup { max-width: 480px; margin: 20px auto; font-family: sans-serif; background: white; padding: 20px; border-radius: 8px; border: 1px solid #cbd5e1; }
    h3 { margin-top: 0; color: #0369a1; }
    .search-input { width: 100%; padding: 10px; box-sizing: border-box; border: 1px solid #cbd5e1; border-radius: 6px; margin-bottom: 16px; }
    ul { list-style: none; padding: 0; margin: 8px 0 0 0; }
    li { padding: 8px 0; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; font-size: 13px; }
    .stok { font-weight: bold; color: #16a34a; }
    .stok.kritis { color: #dc2626; }
    .empty { color: #94a3b8; font-style: italic; }
  `]
})
export class PencarianObatComponent {
  readonly queryControl = new FormControl<string>('', { nonNullable: true });

  // Database simulasi obat
  private masterObat: ObatFarmasi[] = [
    { kode: 'OB-01', nama: 'Paracetamol 500mg', stok: 120 },
    { kode: 'OB-02', nama: 'Amoxicillin 500mg', stok: 45 },
    { kode: 'OB-03', nama: 'Ibuprofen 400mg', stok: 8 },
    { kode: 'OB-04', nama: 'Cetirizine 10mg', stok: 60 }
  ];

  // Pipeline RxJS: debounce 300ms -> batalkan request lama jika user mengetik lagi (switchMap)
  private pencarianObservable$ = this.queryControl.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((teks) => {
      const q = teks.trim().toLowerCase();
      if (!q) return of(this.masterObat);
      const filtered = this.masterObat.filter((o) => o.nama.toLowerCase().includes(q));
      return of(filtered).pipe(delay(200)); // Simulasi latency jaringan
    })
  );

  // toSignal(): Mengubah aliran Observable RxJS menjadi Sinyal Reaktif murni untuk template!
  readonly hasilPencarianSinyal = toSignal(this.pencarianObservable$, { initialValue: this.masterObat });
}
""",
        'objectivesId': [
            'Memahami peran komplementer: kapan menggunakan RxJS (event streams asinkron) vs Signals (state reaktif sinkron)',
            'Menggunakan operator RxJS penting: debounceTime(300) dan distinctUntilChanged() untuk menghemat kuota API',
            'Mencegah race condition pencarian menggunakan switchMap() yang membatalkan permintaan lama yang tertunda',
            'Menggunakan jembatan resmi toSignal() dari @angular/core/rxjs-interop untuk mengonversi Observable ke Sinyal',
            'Menghilangkan kebutuhan pipe async (| async) di template berkat kemudahan sintaks sinyal',
        ],
        'objectivesEn': [
            'Understand complementary roles: deploying RxJS for async event streams versus Signals for synchronous reactive state',
            'Utilize essential RxJS operators: debounceTime(300) and distinctUntilChanged() throttling network overhead',
            'Eliminate search race conditions deploying switchMap() canceling superseded in-flight requests',
            'Bridge RxJS Observables to modern Signals seamlessly using the official toSignal() interop primitive',
            'Eliminate legacy template async pipes (| async) in favor of ergonomic Signal getter evaluations',
        ],
        'explanationId': """### Sinyal vs RxJS: Siapa Pemenangnya?
Banyak pengembang mengira Signals hadir untuk memusnahkan RxJS. **Ini salah paham besar!**
Keduanya memiliki keahlian yang saling melengkapi:
- **Signals**: Sempurna untuk **State Manajemen Sinkron di UI** (angka counter, status buka/tutup, list yang sedang tampil). Sangat mudah dibaca tanpa perlu subscribe manual.
- **RxJS**: Tidak tertandingi untuk **Aliran Data Asinkron Berbasis Waktu (*Async Streams over Time*)** seperti: debounce ketukan keyboard, pembatalan request lama (*switchMap*), polling interval, dan WebSocket.

### Jembatan Emas: `toSignal()`
Daripada menulis kode kotor seperti `sub = obs$.subscribe(...)` yang rawan lupa di-unsubscribe di komponen, Angular menyediakan jembatan resmi:
`const dataSinyal = toSignal(myObservable$, { initialValue: [] })`.
Observable di-subscribe secara otomatis di latar belakang dan dibersihkan saat komponen hancur. Anda dapat langsung menggunakannya di template sebagai sinyal biasa: `{{ dataSinyal() }}`!""",
        'explanationEn': """### Signals vs RxJS: The Unified Paradigm
Many assumed Signals were engineered to eradicate RxJS. **This is a fundamental misunderstanding.**
They serve complementary operational domains:
- **Signals**: Ideal for **Synchronous State Representation in UI templates** (counters, toggle flags, displayed models). Effortless consumption without manual subscriptions.
- **RxJS**: Unrivaled for **Complex Time-Series Asynchronous Event Streams** (keystroke debouncing, request cancellation via *switchMap*, polling cascades, WebSockets).

### The Canonical Bridge: `toSignal()`
Rather than manually subscribing `this.stream$.subscribe()` and managing teardown boilerplates, deploy Angular's official interop bridge:
`const dataSignal = toSignal(myObservable$, { initialValue: [] })`.
Angular subscribes automatically, teardowns cleanly upon unmount, and exposes a pure read-only Signal interface in templates: `{{ dataSignal() }}`!""",
        'beginnerId': """### Analogi: Gelombang Radio Siaran vs Foto Snapshot
1. **RxJS** seperti siaran radio gelombang FM yang mengalir terus tanpa henti (*aliran waktu asinkron*): ada lagu yang diputar, ada jeda iklan, ada pergantian penyiar. Anda bisa memutar kenop penyaring suara (*operator switchMap/debounce*).
2. **Signals & toSignal()** seperti memotret penyiar radio dengan kamera polaroid dan menempelkan fotonya di dinding (*nilai snapshot saat ini*): siapa pun yang masuk ruangan bisa langsung melihat foto tersebut tanpa perlu membawa radio.""",
        'beginnerEn': """### Analogy: Live FM Radio Transmissions vs Wall Snapshots
1. **RxJS** is a continuous FM broadcast stream (*asynchronous time-series flow*): audio waves stream, advertisements interleave, and stations shift. Audio engineers tweak filter knobs (*switchMap, debounceTime*).
2. **Signals & toSignal()** is a photographer taking a polaroid snapshot of the live DJ and pinning it to the studio corkboard (*current state snapshot*): anyone walking into the room views the image instantly without carrying a tuner.""",
        'experimentsId': [
            'Ketik "para" dengan cepat dan amati hasil pencarian menunggu 300ms sebelum memfilter Paracetamol berkat debounceTime.',
            'Ketik teks acak seperti "xyz" dan amati blok @empty merender pesan tidak ditemukan.',
            'Periksa bahwa tidak ada kode manual .subscribe() atau .unsubscribe() di dalam class berkat toSignal().',
            'Gunakan toObservable(mySignal) untuk melakukan konversi arah sebaliknya dari Sinyal ke Observable RxJS.',
        ],
        'experimentsEn': [
            'Type "para" rapidly to observe the 300ms debounce buffer holding evaluation until typing settles.',
            'Type unmapped strings like "xyz" observing the @empty block render the fallback notice.',
            'Verify the complete absence of manual .subscribe() or teardown boilerplate thanks to toSignal().',
            'Explore the reverse bridge toObservable(mySignal) converting reactive Signals back into RxJS streams.',
        ],
        'challengeId': 'Hubungkan pencarian obat dengan indikator loading status: buat sinyal `isMencari = signal(false)` yang menyala saat user mengetik dan mati saat switchMap selesai memfilter hasil.',
        'challengeEn': 'Integrate a loading indicator by driving an `isSearching = signal(false)` flag toggling across the switchMap pipeline.',
        'summaryId': 'Kamu telah menguasai sinergi RxJS dan Signals menggunakan jembatan toSignal(). Minggu depan kita memasuki Level 3: Router Guards Fungsional dan Interceptors.',
        'summaryEn': 'You have mastered the synergy of RxJS and Signals using toSignal(). Next week, we enter Level 3: Functional Router Guards and Interceptors.',
    },

    # Level 3: Routing Fungsional, Interceptors & Capstone RS (Weeks 8-10)
    {
        'week': 8,
        'level': 'advanced',
        'topicId': 'angular-router-dan-guards',
        'titleId': 'Angular Router Modern: Functional CanActivateFn, Resolvers & Lazy Routes',
        'titleEn': 'Modern Angular Router: Functional CanActivateFn, Resolvers & Lazy Routes',
        'programId': 'Sistem Navigasi Rumah Sakit dengan Proteksi Peran Medis (RBAC)',
        'programEn': 'Hospital Clinical Navigation with Functional RBAC Route Guards',
        'levelNameId': 'Routing Fungsional, Interceptors & Capstone RS',
        'levelNameEn': 'Functional Routing, Interceptors & Hospital Capstone',
        'language': 'typescript',
        'code': """// ============================================================================
// File: src/app/app.routes.ts (Router Fungsional Standalone Tanpa Modul)
// ============================================================================
import { Routes, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

// 1. Functional Route Guard (CanActivateFn Modern - Tidak perlu class CanActivate lama!)
export const clinicalAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('nusa_hospital_jwt');
  const userRole = localStorage.getItem('nusa_hospital_role'); // "DOKTER" | "PERAWAT" | "ADMIN"

  console.log(`[Clinical Guard] Memeriksa otorisasi menuju: ${state.url}`);

  if (!token) {
    // Pengguna belum login: Arahkan ke halaman login
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }

  // Periksa apakah rute membutuhkan peran dokter spesialis
  const requiredRole = route.data?.['requiredRole'];
  if (requiredRole && requiredRole !== userRole) {
    alert('Akses Terbatas: Halaman ini hanya dapat diakses oleh Dokter Spesialis.');
    return false; // Tolak navigasi
  }

  return true; // Izinkan navigasi
};

// 2. Konfigurasi Routes dengan Component-Level Lazy Loading
export const APP_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./views/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'dashboard',
    canActivate: [clinicalAuthGuard],
    loadComponent: () => import('./views/clinical-dashboard.component').then((m) => m.ClinicalDashboardComponent)
  },
  {
    path: 'kamar-operasi',
    canActivate: [clinicalAuthGuard],
    data: { requiredRole: 'DOKTER' },
    loadComponent: () => import('./views/operating-theater.component').then((m) => m.OperatingTheaterComponent)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadComponent: () => import('./views/not-found.component').then((m) => m.NotFoundComponent)
  }
];
""",
        'objectivesId': [
            'Memahami migrasi dari class-based guards yang bertele-tele ke Functional CanActivateFn modern',
            'Menggunakan inject() langsung di dalam fungsi guard untuk mengakses Router dan AuthService',
            'Menerapkan pengalihan rute aman menggunakan UrlTree (router.createUrlTree())',
            'Mengonfigurasi Lazy Loading komponen menggunakan sintaks loadComponent: () => import(...)',
            'Mengamankan rute bedah sensitif berbasis peran pengguna (Role-Based Access Control - RBAC)',
        ],
        'objectivesEn': [
            'Migrate from verbose class-based guards to modern functional CanActivateFn primitives',
            'Deploy functional inject() directly inside guard predicates to resolve Router and Auth dependencies',
            'Execute safe navigational redirects utilizing immutable UrlTree (router.createUrlTree()) structures',
            'Configure component-level lazy loading deploying loadComponent: () => import(...) syntax',
            'Harden sensitive operating theater clinical routes through Role-Based Access Control (RBAC)',
        ],
        'explanationId': """### Kematian Class-Based Guards di Angular
Di Angular versi lama, membuat route guard mewajibkan pembuatan file class dengan dekorator `@Injectable()` dan implementasi interface `canActivate(route, state): boolean`.
Di Angular modern:
**Guard adalah fungsi JavaScript murni bertipe `CanActivateFn`**!
```typescript
export const myGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  return auth.isLoggedIn() ? true : inject(Router).createUrlTree(['/login']);
};
```
Sangat ringkas, mudah dibaca, dan mudah di-unit test tanpa mock class kompleks.

### `loadComponent` untuk Pemecahan Bundel Sempurna
Dengan Standalone Components, Anda tidak lagi menggunakan `loadChildren` untuk memuat modul.
Cukup tulis `loadComponent: () => import('./path').then(m => m.Component)`.
Vite / Webpack akan memecah file tersebut menjadi chunk terisolasi yang hanya diunduh saat pengguna mengunjungi URL tersebut.""",
        'explanationEn': """### Deprecation of Class-Based Route Guards
Historically, establishing an Angular route guard mandated scaffolding a full `@Injectable()` class implementing the `CanActivate` interface with verbose dependency injection constructors.
In modern Angular:
**A Guard is a pure functional predicate typed as `CanActivateFn`**!
```typescript
export const myGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  return auth.isLoggedIn() ? true : inject(Router).createUrlTree(['/login']);
};
```
Concise, elegant, and effortlessly tested without mocking class hierarchies.

### Component-Level Lazy Loading via `loadComponent`
In standalone applications, `loadChildren` module mappings are obsolete.
Simply declare `loadComponent: () => import('./path').then(m => m.MyComponent)`.
The build pipeline bundles the view into an isolated JavaScript chunk loaded strictly upon route resolution.""",
        'beginnerId': """### Analogi: Pintu Ruang Operasi Ber-Kunci Biometrik
**Functional CanActivateFn** seperti pemindai sidik jari di depan pintu ruang operasi bedah: Anda tidak perlu mendirikan pos satpam fisik (*class guard lama*). Cukup pasang sensor pemindai digital kecil di gagang pintu (*functional guard*). Jika dokter spesialis menempelkan jempol (*token & role valid*), pintu otomatis terbuka hijau; jika bukan dokter, pintu mengunci merah.""",
        'beginnerEn': """### Analogy: Biometric Surgical Suite Access Locks
**Functional CanActivateFn** is a biometric thumbprint scanner on an operating suite threshold: you avoid stationing an administrative desk guard (*legacy class guards*), simply fastening a compact digital sensor to the door handle (*functional guard*). If an attending surgeon scans credentials (*valid role claims*), magnetic latches disengage green; uncredentialed scans lock doors securely.""",
        'experimentsId': [
            'Coba buka rute /kamar-operasi tanpa login dan verifikasi bahwa guard mengembalikan UrlTree ke halaman /login.',
            'Setel peran ke "PERAWAT" di localStorage dan coba akses rute dokter spesialis untuk melihat blokir hak akses.',
            'Buka Network Tab di DevTools dan buktikan file operating-theater.component.js baru diunduh saat link diklik.',
            'Pelajari functional CanDeactivateFn untuk mencegah dokter menutup halaman rekam medis yang belum disimpan.',
        ],
        'experimentsEn': [
            'Navigate to /kamar-operasi unauthenticated to verify the guard returns an explicit login UrlTree.',
            'Set role to "PERAWAT" in localStorage observing the role-based rejection alert trigger.',
            'Inspect network activity verifying the operating theater chunk downloads strictly on link clicks.',
            'Explore functional CanDeactivateFn preventing clinicians from discarding unsaved medical records.',
        ],
        'challengeId': 'Implementasikan functional `CanDeactivateFn` pada formulir pasien yang memunculkan konfirmasi dialog "Perubahan rekam medis belum disimpan, yakin ingin keluar?" jika formulir masih dalam keadaan dirty.',
        'challengeEn': 'Author a functional `CanDeactivateFn` on patient forms triggering a confirmation prompt if uncommitted changes exist.',
        'summaryId': 'Kamu telah menguasai functional route guards, UrlTree redirects, dan loadComponent lazy loading. Minggu depan kita mempelajari Functional Interceptors dan sinyal effect().',
        'summaryEn': 'You have mastered functional route guards, UrlTree redirects, and lazy loading. Next week, we examine Functional Interceptors and signal effect().',
    },
    {
        'week': 9,
        'level': 'advanced',
        'topicId': 'http-interceptors-dan-signals-effects',
        'titleId': 'Functional HTTP Interceptors (withInterceptors) & Sinyal Efek effect()',
        'titleEn': 'Functional HTTP Interceptors (withInterceptors) & Signal effect()',
        'programId': 'Interceptor Token JWT Otomatis & Pelacak Sinyal Denyut Nadi',
        'programEn': 'Automated JWT Bearer Interceptor & Pulse Telemetry Signal Effect',
        'levelNameId': 'Routing Fungsional, Interceptors & Capstone RS',
        'levelNameEn': 'Functional Routing, Interceptors & Hospital Capstone',
        'language': 'typescript',
        'code': """// ============================================================================
// File: src/app/interceptors/jwt.interceptor.ts (Functional Interceptor Modern)
// ============================================================================
import { HttpInterceptorFn } from '@angular/common/http';

export const jwtAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('nusa_hospital_jwt');

  // Kloning request dan suntikkan header Authorization jika token ada
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    console.log(`[HTTP Interceptor] Menyuntikkan Bearer token ke permintaan: ${req.url}`);
    return next(authReq);
  }

  return next(req);
};

// ============================================================================
// File: src/app/vital-monitor.component.ts (Penggunaan effect() Sinyal Modern)
// ============================================================================
import { Component, signal, effect } from '@angular/core';

@Component({
  selector: 'app-vital-monitor',
  standalone: true,
  template: `
    <div style="max-width: 420px; margin: 20px auto; font-family: sans-serif; border: 1px solid #cbd5e1; padding: 16px; border-radius: 8px;">
      <h4>Monitor Tanda Vital ICU (effect() Telemetri)</h4>
      <div style="font-size: 24px; font-weight: bold; color: #dc2626;">
        Denyut Jantung: {{ denyutJantungBpm() }} BPM
      </div>
      <button (click)="simulasiLonjakanDetak()" style="margin-top: 10px; padding: 6px 12px; cursor: pointer;">
        Simulasikan Lonjakan Takiakardi
      </button>
    </div>
  `
})
export class VitalMonitorComponent {
  denyutJantungBpm = signal<number>(75);

  constructor() {
    // Sinyal effect(): Berjalan otomatis saat sinyal di dalamnya (denyutJantungBpm) mengalami mutasi
    effect(() => {
      const bpm = this.denyutJantungBpm();
      console.log(`[Audit Medis ICU] Telemetri denyut diperbarui: ${bpm} BPM`);

      if (bpm > 120) {
        console.warn(`[ALARM KRITIS UGD] Pasien mengalami Takikardia Parah: ${bpm} BPM!`);
      }
    });
  }

  simulasiLonjakanDetak(): void {
    this.denyutJantungBpm.set(135);
  }
}
""",
        'objectivesId': [
            'Memahami evolusi dari HttpInterceptor berbasis class ke Functional HttpInterceptorFn modern',
            'Menyuntikkan token otentikasi Bearer JWT ke setiap panggilan HTTP keluar secara terpusat',
            'Mengonfigurasi provideHttpClient(withInterceptors([jwtAuthInterceptor])) di berkas konfigurasi aplikasi',
            'Menggunakan sinyal effect() untuk mendengarkan perubahan sinyal dan memicu logging/side effects',
            'Memahami aturan eksekusi effect(): hanya berjalan di dalam injection context (constructor)',
        ],
        'objectivesEn': [
            'Transition from class-based HttpInterceptor interfaces to functional HttpInterceptorFn functions',
            'Attach Bearer JWT authorization tokens across outgoing HTTP requests centrally via request cloning',
            'Configure provideHttpClient(withInterceptors([jwtAuthInterceptor])) inside application bootstrap settings',
            'Deploy the signal effect() primitive to observe signal mutations and trigger external telemetry side effects',
            'Enforce effect() execution rules: requiring invocation within an active injection context (constructor)',
        ],
        'explanationId': """### Functional HTTP Interceptors di Angular Modern
Dulu Anda harus membuat file class yang mengimplementasikan `HttpInterceptor` dan mendaftarkannya ke array `providers` multi-provider yang sangat berbelit-belit.
Di Angular modern:
Interceptor adalah **fungsi murni `HttpInterceptorFn = (req, next) => next(req)`**.
Anda cukup mendaftarkannya saat bootstrapping:
```typescript
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([jwtAuthInterceptor]))]
});
```

### Sinyal `effect()` untuk Efek Samping
Jangan gunakan `computed()` untuk memanggil API atau mencetak log; `computed` hanya untuk nilai turunan murni.
Gunakan **`effect(() => { ... })`** untuk:
1. Menyimpan data sinyal ke LocalStorage saat nilainya berubah.
2. Membunyikan suara alarm darurat saat denyut jantung melebihi batas normal.
3. Mengirimkan log analitik ke server monitoring.""",
        'explanationEn': """### Modern Functional HTTP Interceptors
Historically, intercepting HTTP calls required scaffolding full classes implementing `HttpInterceptor` and wiring them through arcane multi-provider injection tokens.
In modern Angular:
An interceptor is **a plain functional handler `HttpInterceptorFn = (req, next) => next(req)`**.
Register it during application bootstrapping cleanly:
```typescript
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([jwtAuthInterceptor]))]
});
```

### The `effect()` Signal Primitive
Never utilize `computed()` for side effects or logging; reserve `computed()` strictly for pure idempotent derivations.
Deploy **`effect(() => { ... })`** for:
1. Serializing signal state to LocalStorage upon mutation.
2. Triggering acoustic alarms when telemetry exceeds physiological thresholds.
3. Transmitting telemetry metrics to remote observability dashboards.""",
        'beginnerId': """### Analogi: Stempel Pos Luar Negeri & Alarm Denyut Nadi Pasien
1. **HTTP Interceptor** seperti loket bea cukai di kantor pos: setiap surat yang dikirim ke luar negeri (*panggilan API*) otomatis dicek dan distempel perangko resmi diplomatik (*header Bearer JWT*) sebelum diizinkan terbang naik pesawat.
2. **`effect()`** seperti mesin monitor EKG di ICU: mesin terus mengamati detak jantung (*signal*); begitu detak jantung melonjak melewati garis merah, alarm suara langsung berbunyi otomatis (*side effect*).""",
        'beginnerEn': """### Analogy: Customs Diplomatic Pouches & ICU Heart Monitors
1. **HTTP Interceptor** is a diplomatic courier checkpoint: every outbound diplomatic pouch (*HTTP request*) is inspected and stamped with verified embassy seal credentials (*Bearer JWT header*) prior to cargo loading.
2. **`effect()`** is an ICU electrocardiogram alarm: the sensor continuously tracks cardiac rhythms (*signal*); if heart rates breach red thresholds, sirens sound across the ward automatically (*side effect*).""",
        'experimentsId': [
            'Simulasikan panggilan API dan periksa tab Network browser untuk memverifikasi header Authorization: Bearer terpasang.',
            'Klik tombol "Simulasikan Lonjakan Takiakardi" dan perhatikan konsol memunculkan pesan peringatan alarm UGD.',
            'Uji pembersihan effect() menggunakan fungsi onCleanup() bawaan Angular.',
            'Gabungkan interceptor error handling yang otomatis me-redirect ke login jika menerima HTTP 401.',
        ],
        'experimentsEn': [
            'Trigger an HTTP call observing the Authorization: Bearer header populate inside DevTools Network headers.',
            'Simulate tachycardia spikes to observe the automated ICU alert warning log in the console.',
            'Evaluate effect teardown callbacks deploying Angular\'s native onCleanup() hook.',
            'Author an error-handling interceptor redirecting to login upon receiving HTTP 401 Unauthorized codes.',
        ],
        'challengeId': 'Buat functional interceptor `loggingMetricsInterceptor` yang mengukur durasi milidetik waktu tunggu panggilan HTTP dari saat dikirim hingga respons diterima.',
        'challengeEn': 'Author a functional `loggingMetricsInterceptor` benchmarking the millisecond round-trip latency of outgoing HTTP requests.',
        'summaryId': 'Kamu telah menguasai functional interceptors dan sinyal effect(). Minggu depan adalah Capstone Final: Enterprise Hospital Management System.',
        'summaryEn': 'You have mastered functional interceptors and signal effect(). Next week is our Capstone Project: Enterprise Hospital Management System.',
    },
    {
        'week': 10,
        'level': 'advanced',
        'topicId': 'capstone-enterprise-hospital-system',
        'titleId': 'Capstone: Sistem Manajemen Klinis & Penjadwalan Rumah Sakit Enterprise',
        'titleEn': 'Capstone: Enterprise Multi-Tier Hospital Clinical Management System',
        'programId': 'Aplikasi Manajemen Rumah Sakit Terintegrasi dengan Signals & Standalone Architecture',
        'programEn': 'Full Enterprise Clinical Suite with Signal Telemetry, Triage & Bed Allocation',
        'levelNameId': 'Routing Fungsional, Interceptors & Capstone RS',
        'levelNameEn': 'Functional Routing, Interceptors & Hospital Capstone',
        'language': 'typescript',
        'code': """// ============================================================================
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
""",
        'objectivesId': [
            'Mengintegrasikan seluruh pilar Angular modern (Standalone, Signals, Computed, Modern Control Flow @for/@empty) ke dalam produk sistem rumah sakit enterprise',
            'Menghitung metrik analitik klinis (BOR %, Kasus Kritis, Sisa Bed) secara reaktif instan menggunakan computed()',
            'Menerapkan perancangan UI bertaraf institusi kesehatan dengan pembedaan visual status triase darurat',
            'Mengelola mutasi data rawat inap secara immutable dan aman tanpa dirty-checking zone.js',
            'Menghasilkan kode arsitektur Angular tingkat senior yang bersih, modular, dan siap dihubungkan dengan backend mikroservis',
        ],
        'objectivesEn': [
            'Synthesize all modern Angular pillars (Standalone, Signals, Computed, Modern Control Flow @for/@empty) into an enterprise clinical hospital platform',
            'Compute real-time clinical KPIs (Bed Occupancy Rate %, Critical Counts, Available Beds) reactively via computed()',
            'Design an institutional-grade healthcare interface with high-contrast emergency triage visual hierarchies',
            'Orchestrate clinical state mutations immutably and surgically without legacy Zone.js dirty-checking overhead',
            'Deliver production-ready senior-grade Angular architecture engineered for enterprise microservice connectivity',
        ],
        'explanationId': """### Arsitektur Capstone Sistem Manajemen Rumah Sakit
Aplikasi capstone ini menyatukan seluruh revolusi Angular modern dalam satu arsitektur terpadu:
1. **Zero-NgModule Standalone Architecture**: Komponen berjalan mandiri dan sangat ringan, siap untuk di-deploy ke lingkungan cloud dan CDN.
2. **Reaktivitas Sinyal Murni (Signals & Computed)**: Ketika perawat mengklik tombol "Discharge" pada pasien, seluruh KPI analitik (`borPercentage`, `totalPasien`, `bedTersisa`) langsung dihitung ulang secara sinkron dan instan tanpa membebani browser.
3. **Kontrol Alur Modern**: Menggunakan `@for (p of daftarPasien(); track p.id)` yang menjamin performa pelacakan baris tabel tingkat mikrodetik.
4. **Kesiapan Integrasi Enterprise**: Komponen ini dirancang untuk dapat dengan mudah dihubungkan dengan `PatientRecordsService`, `HttpClient`, dan WebSocket real-time monitor telemetry.

### Selamat Datang di Level Senior Angular Developer!
Anda kini telah menguasai salah satu framework paling kokoh dan dihormati di dunia enterprise perbankan, kesehatan, dan penerbangan global.""",
        'explanationEn': """### Capstone Enterprise Clinical Suite Architecture
This capstone converges modern Angular architecture into an enterprise-ready system:
1. **Zero-NgModule Standalone Topology**: Components compile into lean, isolated units ready for cloud-edge distribution.
2. **Pure Signal Reactivity (Signals & Computed)**: Discharging patients triggers immediate synchronous recalculations across high-level hospital KPIs (`borPercentage`, `totalPasien`, `bedTersisa`) with zero DOM lag.
3. **Modern Control Flow Directives**: Leverages `@for (p of daftarPasien(); track p.id)` guaranteeing microsecond DOM tracking reconciliation.
4. **Enterprise Extensibility**: Architecture cleanly integrates with `PatientRecordsService`, `HttpClient` interceptors, and real-time telemetry WebSockets.

### Welcome to Senior Angular Engineering!
Congratulations! You have mastered the premier framework powering mission-critical banking, aerospace, and healthcare enterprise infrastructures worldwide.""",
        'beginnerId': """### Analogi: Ruang Komando Krisis Rumah Sakit
Aplikasi ini seperti ruang komando krisis rumah sakit:
1. **Header BOR & KPI Grid** adalah layar raksasa di dinding ruang komando: direktur rumah sakit langsung tahu jika kapasitas tempat tidur sudah mencapai zona bahaya merah (*BOR > 80%*).
2. **Tabel Pasien** adalah buku besar digital UGD: setiap perawat yang memasukkan pasien baru (*tambahPasien*) langsung membuat angka statistik di layar dinding bertambah detik itu juga.""",
        'beginnerEn': """### Analogy: Hospital Crisis Operations Center
This application mirrors a hospital crisis command center:
1. **BOR Header & KPI Display** are the massive wall-mounted telemetry screens: executive directors immediately spot hospital capacity breach warnings (*BOR > 80%*).
2. **Clinical Patient Table** is the digital ER intake roster: admitting new patients (*tambahPasien*) triggers immediate metric updates across master command displays.""",
        'experimentsId': [
            'Daftarkan pasien baru dengan triase "Triase Merah (Kritis UGD)" dan amati baris tabel disorot warna merah muda otomatis.',
            'Tambahkan pasien terus-menerus hingga BOR melebihi 80% dan perhatikan indikator BOR berubah warna menjadi merah peringatan.',
            'Pulangkan semua pasien hingga kosong dan amati blok @empty menampilkan pesan bahwa seluruh bed kosong.',
            'Hubungkan aplikasi ini dengan jwtAuthInterceptor dan functional routing yang telah dibuat di materi sebelumnya.',
        ],
        'experimentsEn': [
            'Admit a patient with "Triase Merah" to observe the row highlight in critical red alert styling.',
            'Admit patients until BOR exceeds 80% to watch the KPI badge transition into red alert mode.',
            'Discharge all patients down to zero verifying the @empty block renders the vacant bed message.',
            'Integrate this suite with the jwtAuthInterceptor and functional router guards from prior weeks.',
        ],
        'challengeId': 'Tambahkan fitur pencarian cepat: buat input teks filter yang menyaring baris tabel pasien berdasarkan nama atau lokasi bed secara reaktif menggunakan computed signal.',
        'challengeEn': 'Add real-time table filtering: introduce a search input filtering patient rows by name or bed location via a derived computed signal.',
        'summaryId': 'Selamat! Kamu telah menyelesaikan seluruh kurikulum Angular modern dari Standalone Components dasar hingga membangun Sistem Rumah Sakit Enterprise bertaraf industri.',
        'summaryEn': 'Congratulations! You have completed the comprehensive modern Angular curriculum, culminating in an enterprise-grade Clinical Hospital Management System.',
    },
]

def get_track():
    return {
        'slug': 'angular',
        'track_name': 'Angular',
        'levels': LEVELS,
        'modules': MODULES,
    }
