# Reactive Forms: Formulir Ber-Tipe Ketat (Typed Forms), Validasi & Custom Async Validators

> **Kategori:** Angular | **Level:** Dependency Injection, Reactive Forms & RxJS | **Minggu 6:** Reactive Forms: Formulir Ber-Tipe Ketat (Typed Forms), Validasi & Custom Async Validators
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami keunggulan Strictly-Typed Reactive Forms yang diperkenalkan di Angular modern
- Menggunakan FormGroup dan FormControl dengan opsi nonNullable: true untuk mencegah bug null
- Menerapkan validator bawaan: Validators.required, minLength, maxLength, pattern
- Menampilkan pesan kesalahan validasi secara kontekstual hanya saat input telah disentuh (.touched)
- Mengekstrak nilai payload formulir menggunakan .getRawValue() dengan keamanan tipe TypeScript penuh

---

## Program: Formulir Pendaftaran Pasien Rawat Inap Darurat (Emergency Admission Form)

```typescript
// ============================================================================
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
```

---

## Konsep Kunci

### Mengapa Reactive Forms Angular Terbaik di Kelasnya?
Berbeda dengan template-driven forms atau form handling di framework lain yang sering mengandalkan manipulasi string, **Reactive Forms Angular adalah arsitektur berbasis objek terstruktur**:
1. **Strictly-Typed Forms**: Di Angular modern, jika Anda mengakses `form.controls.nik.value`, TypeScript tahu pasti bahwa tipenya adalah `string`, bukan `any` atau `null`!
2. **Validasi Sinkron & Asinkron**: Anda bisa menambahkan validator kustom untuk memeriksa apakah NIK sudah pernah terdaftar di database rumah sakit secara asinkron (*Async Validator*).
3. **Immutability & Testing**: Sangat mudah diuji dengan unit test tanpa perlu me-render DOM browser.

---

---

## Penjelasan untuk Pemula

### Analogi: Formulir Rekam Medis Kertas Karbon
**Reactive Forms** seperti formulir pendaftaran rumah sakit berformat standar: setiap kotak isian (Nama, NIK, Golongan Darah) memiliki ukuran dan aturan ketat (misal kotak NIK terdiri dari tepat 16 kotak kecil). Jika pasien baru mengisi 15 kotak, sistem di meja admisi menolak memproses berkas sebelum kotak ke-16 diisi lengkap.

## Eksperimen

- Ketik NIK sebanyak 10 digit dan amati pesan eror "NIK harus tepat 16 digit angka" muncul seketika.
- Coba tekan tombol Submit saat form kosong dan buktikan tombol disabled tidak bisa diklik.
- Gunakan formAdmisi.valueChanges.subscribe(...) di TypeScript untuk mengamati perubahan data formulir secara real-time.
- Tambahkan validator kustom yang melarang NIK bernilai "0000000000000000".

---

## Tantangan

Buat custom validator fungsi `validatorTanggalLahir()` yang memastikan tanggal lahir yang dimasukkan pasien tidak berada di masa depan.

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

Kamu telah menguasai Strictly-Typed Reactive Forms dan validasi data. Minggu depan kita mempelajari integrasi RxJS dan HttpClient dengan toSignal().
