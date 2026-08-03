# Modules: Organisasi Arsitektur

> NestJS | Fondasi Nest | Pelajaran 4

## Tujuan Pembelajaran

- Membuat feature module per domain bisnis
- Memahami imports, exports, dan sharing provider
- Menggunakan @Global untuk provider lintas modul
- Menggambar peta arsitektur dari file module

---

## Program: Modules: Organisasi Arsitektur

```ts
import { Module } from '@nestjs/common';
import { KursusController } from './kursus.controller';
import { KursusService } from './kursus.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule], // provider SharedModule yang di-export tersedia di sini
  controllers: [KursusController],
  providers: [KursusService],
  exports: [KursusService], // SertifikatModule boleh memakai KursusService
})
export class KursusModule {}
```

---

## Penjelasan

## Module = Batas Domain Bisnis
Module mengelompokkan semua yang dibutuhkan SATU fitur: controller + service + DTO + entity. Satu module per domain (kursus, sertifikat, user, order). Modul besar = peta arsitektur yang bisa dibaca: buka app.module.ts dan Anda tahu SEMUA fitur aplikasi. Ini perbedaan utama Nest vs Express: arsitektur terlihat dari struktur folder, bukan tersembunyi di file router.
## imports & exports: Jalan Berbagi
Provider bersifat privat per module UNLESS di-export. KursusModule exports KursusService → SertifikatModule imports KursusModule → SertifikatService bisa inject KursusService. Ekspor yang hemat adalah desain yang sehat: hanya apa yang benar-benar dibutuhkan modul lain. Kalau SertifikatModule butuh KursusService, jangan langsung register - ikuti jalur ekspor.
## @Global: Provider yang "Di Udara"
@Global() membuat provider tersedia di semua module TANPA import. Cocok untuk: logging, config, koneksi DB, audit. Gunakan hemat - global = hidden dependency. Aturan praktik bootcamp: global untuk infrastruktur, module untuk bisnis.
## Circular Dependency & Dynamic Modules
Dua module saling import = circular dependency → error Nest. Solusi: forwardRef(() => ModulLain) - tapi ini alarm desain: pindahkan provider bersama ke module ketiga. Dynamic modules (forRoot) memungkinkan module menerima konfigurasi - dipakai @nestjs/config dan TypeOrmModule (pelajaran 7).

---

## Eksperimen

1. **Module = Batas Domain Bisnis**
2. **imports & exports: Jalan Berbagi**
3. **@Global: Provider yang "Di Udara"**
4. **Circular Dependency & Dynamic Modules**

---

## Tantangan

Refactor ke arsitektur domain: (1) buat UserModule (user.controller + user.service) yang menyimpan daftar user, (2) KursusModule menginject UserService lewat jalur exports (tambah route GET /kursus/:id/peserta), (3) pindahkan AuditService ke module InfraModule @Global, (4) gambar dependency graph modul-modul Anda di kertas dan cocokkan dengan kode.

---

## Ringkasan

Module = batas domain. exports = jalur berbagi provider. @Global untuk infrastruktur. Circular = alarm desain. Baca arsitektur dari app.module. Lanjut: pipes & validasi DTO.
