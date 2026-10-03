# Integrasi RxJS Modern & HttpClient: switchMap, debounceTime & Jembatan toSignal()

> **Kategori:** Angular | **Level:** Dependency Injection, Reactive Forms & RxJS | **Minggu 7:** Integrasi RxJS Modern & HttpClient: switchMap, debounceTime & Jembatan toSignal()
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami peran komplementer: kapan menggunakan RxJS (event streams asinkron) vs Signals (state reaktif sinkron)
- Menggunakan operator RxJS penting: debounceTime(300) dan distinctUntilChanged() untuk menghemat kuota API
- Mencegah race condition pencarian menggunakan switchMap() yang membatalkan permintaan lama yang tertunda
- Menggunakan jembatan resmi toSignal() dari @angular/core/rxjs-interop untuk mengonversi Observable ke Sinyal
- Menghilangkan kebutuhan pipe async (| async) di template berkat kemudahan sintaks sinyal

---

## Program: Monitor Telemetri Vital Pasien & Pencarian Obat Real-Time

```typescript
// ============================================================================
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
```

---

## Konsep Kunci

### Sinyal vs RxJS: Siapa Pemenangnya?
Banyak pengembang mengira Signals hadir untuk memusnahkan RxJS. **Ini salah paham besar!**
Keduanya memiliki keahlian yang saling melengkapi:
- **Signals**: Sempurna untuk **State Manajemen Sinkron di UI** (angka counter, status buka/tutup, list yang sedang tampil). Sangat mudah dibaca tanpa perlu subscribe manual.
- **RxJS**: Tidak tertandingi untuk **Aliran Data Asinkron Berbasis Waktu (*Async Streams over Time*)** seperti: debounce ketukan keyboard, pembatalan request lama (*switchMap*), polling interval, dan WebSocket.

### Jembatan Emas: `toSignal()`
Daripada menulis kode kotor seperti `sub = obs$.subscribe(...)` yang rawan lupa di-unsubscribe di komponen, Angular menyediakan jembatan resmi:
`const dataSinyal = toSignal(myObservable$, { initialValue: [] })`.
Observable di-subscribe secara otomatis di latar belakang dan dibersihkan saat komponen hancur. Anda dapat langsung menggunakannya di template sebagai sinyal biasa: `{{ dataSinyal() }}`!

---

---

## Penjelasan untuk Pemula

### Analogi: Gelombang Radio Siaran vs Foto Snapshot
1. **RxJS** seperti siaran radio gelombang FM yang mengalir terus tanpa henti (*aliran waktu asinkron*): ada lagu yang diputar, ada jeda iklan, ada pergantian penyiar. Anda bisa memutar kenop penyaring suara (*operator switchMap/debounce*).
2. **Signals & toSignal()** seperti memotret penyiar radio dengan kamera polaroid dan menempelkan fotonya di dinding (*nilai snapshot saat ini*): siapa pun yang masuk ruangan bisa langsung melihat foto tersebut tanpa perlu membawa radio.

## Eksperimen

- Ketik "para" dengan cepat dan amati hasil pencarian menunggu 300ms sebelum memfilter Paracetamol berkat debounceTime.
- Ketik teks acak seperti "xyz" dan amati blok @empty merender pesan tidak ditemukan.
- Periksa bahwa tidak ada kode manual .subscribe() atau .unsubscribe() di dalam class berkat toSignal().
- Gunakan toObservable(mySignal) untuk melakukan konversi arah sebaliknya dari Sinyal ke Observable RxJS.

---

## Tantangan

Hubungkan pencarian obat dengan indikator loading status: buat sinyal `isMencari = signal(false)` yang menyala saat user mengetik dan mati saat switchMap selesai memfilter hasil.

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

Kamu telah menguasai sinergi RxJS dan Signals menggunakan jembatan toSignal(). Minggu depan kita memasuki Level 3: Router Guards Fungsional dan Interceptors.
