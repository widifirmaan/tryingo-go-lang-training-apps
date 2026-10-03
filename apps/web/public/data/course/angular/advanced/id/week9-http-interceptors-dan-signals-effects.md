# Functional HTTP Interceptors (withInterceptors) & Sinyal Efek effect()

> **Kategori:** Angular | **Level:** Routing Fungsional, Interceptors & Capstone RS | **Minggu 9:** Functional HTTP Interceptors (withInterceptors) & Sinyal Efek effect()
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami evolusi dari HttpInterceptor berbasis class ke Functional HttpInterceptorFn modern
- Menyuntikkan token otentikasi Bearer JWT ke setiap panggilan HTTP keluar secara terpusat
- Mengonfigurasi provideHttpClient(withInterceptors([jwtAuthInterceptor])) di berkas konfigurasi aplikasi
- Menggunakan sinyal effect() untuk mendengarkan perubahan sinyal dan memicu logging/side effects
- Memahami aturan eksekusi effect(): hanya berjalan di dalam injection context (constructor)

---

## Program: Interceptor Token JWT Otomatis & Pelacak Sinyal Denyut Nadi

```typescript
// ============================================================================
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
```

---

## Konsep Kunci

### Functional HTTP Interceptors di Angular Modern
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
3. Mengirimkan log analitik ke server monitoring.

---

---

## Penjelasan untuk Pemula

### Analogi: Stempel Pos Luar Negeri & Alarm Denyut Nadi Pasien
1. **HTTP Interceptor** seperti loket bea cukai di kantor pos: setiap surat yang dikirim ke luar negeri (*panggilan API*) otomatis dicek dan distempel perangko resmi diplomatik (*header Bearer JWT*) sebelum diizinkan terbang naik pesawat.
2. **`effect()`** seperti mesin monitor EKG di ICU: mesin terus mengamati detak jantung (*signal*); begitu detak jantung melonjak melewati garis merah, alarm suara langsung berbunyi otomatis (*side effect*).

## Eksperimen

- Simulasikan panggilan API dan periksa tab Network browser untuk memverifikasi header Authorization: Bearer terpasang.
- Klik tombol "Simulasikan Lonjakan Takiakardi" dan perhatikan konsol memunculkan pesan peringatan alarm UGD.
- Uji pembersihan effect() menggunakan fungsi onCleanup() bawaan Angular.
- Gabungkan interceptor error handling yang otomatis me-redirect ke login jika menerima HTTP 401.

---

## Tantangan

Buat functional interceptor `loggingMetricsInterceptor` yang mengukur durasi milidetik waktu tunggu panggilan HTTP dari saat dikirim hingga respons diterima.

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

Kamu telah menguasai functional interceptors dan sinyal effect(). Minggu depan adalah Capstone Final: Enterprise Hospital Management System.
