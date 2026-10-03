# Komunikasi Komponen Modern: input(), input.required() & output() Signals

> **Kategori:** Angular | **Level:** Standalone Components, Signals & Kontrol Alur Modern | **Minggu 3:** Komunikasi Komponen Modern: input(), input.required() & output() Signals
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami evolusi Angular dari dekorator @Input/@Output ke fungsi signal input() dan output()
- Menggunakan input.required() untuk menegakkan kontrak props wajib pada waktu kompilasi TypeScript
- Membaca nilai input sebagai Sinyal fungsi bawaan (namaInput()) yang reaktif otomatis
- Memanfaatkan output() untuk memancarkan event ke parent tanpa overhead EventEmitter RxJS
- Mengombinasikan input signals secara langsung di dalam sinyal turunan computed()

---

## Program: Lencana Triase Kegawatdaruratan Medis (Medical Triage Badge)

```typescript
// ============================================================================
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
```

---

## Konsep Kunci

### Sinyal Input & Output: Era Baru Komponen Angular
Dulu di Angular, mendeklarasikan input menggunakan dekorator: `@Input() nama: string = '';`.
Kelemahannya: jika nilai input berubah dari luar, komponen anak **tidak tahu kapan perubahan itu terjadi** tanpa mengimplementasikan interface `ngOnChanges` yang sangat rumit.

### Mengapa `input()` Sinyal Lebih Baik?
Di Angular modern:
1. **`input<string>()`**: Menghasilkan sinyal reaktif murni.
2. Anda bisa langsung menggunakannya di dalam `computed()`:
   `warnaAksen = computed(() => this.tingkat() === 'MERAH' ? 'red' : 'green')`.
   Begitu parent mengubah `[tingkat]="'MERAH'"`, warna aksen anak langsung berubah seketika tanpa `ngOnChanges`!
3. **`output()`**: Menghasilkan pemancar event tanpa perlu mengimpor `EventEmitter` dari RxJS, jauh lebih ringan dan modern.

---

---

## Penjelasan untuk Pemula

### Analogi: Gelang Triase UGD Rumah Sakit
1. **`input()`** seperti barcode pada gelang tangan pasien di Unit Gawat Darurat (UGD): dokter di UGD membaca barcode gelang pasien (*input sinyal*). Jika pasien dipindahkan dari ruang periksa ke ruang operasi (*parent ubah data*), informasi di gelang langsung ter-update otomatis.
2. **`output()`** seperti tombol sirene darurat di samping ranjang pasien: saat perawat menekan tombol eskalasi (*emit*), sirine menyala di meja kepala dokter jaga (*parent menangani aksi*).

## Eksperimen

- Kirimkan prop tingkat="MERAH" dari parent dan perhatikan kartu langsung bergaris merah tua dengan deskripsi darurat kritis.
- Klik tombol "Eskalasi Triase" dan buktikan event triageChanged terpancar dengan tingkat baru (Hijau -> Kuning).
- Hapus pengiriman prop namaPasien dan perhatikan compiler melempar eror merah karena input.required().
- Gunakan model() input untuk two-way binding dua arah modern di Angular.

---

## Tantangan

Gunakan `model()` (Two-Way Binding Signal baru di Angular) untuk membuat sakelar status `isTerkonfirmasi = model(false)` yang dapat diubah oleh anak dan otomatis tersinkronisasi ke parent.

---

## Model Mental & Diagram Alur Visual

```diagram
┌──────────────┐     Call Stack Kosong?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Pemeriksa)   │
└──────┬───────┘                             └───────▲────────┘
       │ Operasi Async (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Selesai ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `const / let variabel`
- **Fungsi Utama:** Deklarasi variabel modern lingkup blok (Block Scope).
- **Parameter / Atribut:** `Identifier, Initial Value`.
- **Perilaku & Efek Sistem:** `const` untuk referensi konstan yang tidak dapat di-reassign; `let` untuk variabel nilai dinamis.
- **Contoh Penggunaan Praktis:**
```javascript
const appName = 'Tryngo';
let counter = 0;
counter += 1;
console.log(appName, counter);
```
- **Hasil Output yang Diharapkan:**
```text
Tryngo 1
```

### 2. `() => { ... } (Arrow Function)`
- **Fungsi Utama:** Sintaks fungsi ringkas dengan lexical 'this'.
- **Parameter / Atribut:** `Parameters, Function Body`.
- **Perilaku & Efek Sistem:** Menyederhanakan penulisan fungsi dan mempertahankan konteks `this` dari lingkup pembungkus luar.
- **Contoh Penggunaan Praktis:**
```javascript
const multiply = (a, b) => a * b;
console.log(multiply(6, 7));
```
- **Hasil Output yang Diharapkan:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Fungsi Utama:** Penanganan operasi asinkron berbasis Promise.
- **Parameter / Atribut:** `URL string, RequestInit options`.
- **Perilaku & Efek Sistem:** Menulis kode asinkron dengan alur linier layaknya kode sinkron tanpa callback hell.
- **Contoh Penggunaan Praktis:**
```javascript
async function fetchUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  const data = await res.json();
  return data;
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan objek data JSON terurai dari server
```

### 4. `Array.prototype.map() / filter()`
- **Fungsi Utama:** Transformasi array fungsional tanpa mutasi data asal.
- **Parameter / Atribut:** `callback(item, index, array)`.
- **Perilaku & Efek Sistem:** `map` menghasilkan array baru dari hasil transformasi; `filter` menyaring elemen berdasarkan kondisi boolean.
- **Contoh Penggunaan Praktis:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubledEvens = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2);
console.log(doubledEvens);
```
- **Hasil Output yang Diharapkan:**
```text
[4, 8]
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

Kamu telah menguasai input(), input.required(), dan output() berbasis sinyal. Minggu depan kita mempelajari Deferrable Views (@defer) untuk pemuatan komponen malas.
