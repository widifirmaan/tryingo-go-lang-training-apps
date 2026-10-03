# Functional HTTP Interceptors (withInterceptors) & Sinyal Efek effect()

> **Kategori:** Angular | **Level:** Routing Fungsional, Interceptors & Capstone RS | **Minggu 9:** Functional HTTP Interceptors (withInterceptors) & Sinyal Efek effect()

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

## Ringkasan

Kamu telah menguasai functional interceptors dan sinyal effect(). Minggu depan adalah Capstone Final: Enterprise Hospital Management System.
