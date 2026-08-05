# Pengenalan Angular & Setup

> Angular | Pelajaran 1

## Tujuan Pembelajaran

- Memahami posisi Angular: framework TypeScript untuk web\n- Mengenal struktur proyek Angular (src/app/, src/index.html)\n- Memahami modul AppModule dan komponen AppComponent\n- Menjalankan Angular app via serve dan melihat output di browser

---

## Program: Angular

```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

```

---

## Penjelasan

## Struktur Proyek Angular
src/app/ = kode aplikasi (components, services, modules). src/index.html = HTML template utama. src/main.ts = titik masuk aplikasi.
## Modul & Komponen
@NgModule({ declarations, imports, providers, bootstrap }) — mendefinisikan modul Angular. @Component({ selector, template }) — mendefinisikan komponen.
## Menjalankan Angular
npm install && npm run dev — instal dependency dan jalankan development server. Buka http://localhost:3000.

---

## Eksperimen

1. **## Struktur Proyek Angular
src/app/ = kode aplikasi (components, services, modules). src/index.html = HTML template utama. src/main.ts = titik masuk aplikasi.
## Modul & Komponen
@NgModule({ declarations, imports, providers, bootstrap }) — mendefinisikan modul Angular. @Component({ selector, template }) — mendefinisikan komponen.
## Menjalankan Angular
npm install && npm run dev — instal dependency dan jalankan development server. Buka http://localhost:3000.**

---

## Tantangan

Eksplorasi: (1) ubah "Hello, Angular!" menjadi "Selamat datang di Angular!" di template AppComponent, (2) tambah h2 dengan nama framework Anda, (3) coba akses http://localhost:3000 dan liat perubahan, (4) tambah tombol di template yang menampilkan alert saat diklik.

---

## Ringkasan

Angular = framework TypeScript. src/app/ = kode Anda. @NgModule = modul. @Component = komponen. Lanjut: data binding.
