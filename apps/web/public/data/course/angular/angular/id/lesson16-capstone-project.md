# Proyek Akhir: Task Manager App

> Angular | Pelajaran 16

## Tujuan Pembelajaran

- Merangkus semua konsep Angular ke dalam satu proyek Task Manager\n- Menerapkan routing dengan RouterModule dan router-outlet\n- Menggunakan FormsModule dan ReactiveFormsModule untuk form input\n- Mengamankan route dengan AuthGuard dan proteksi halaman admin

---

## Program: Angular

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `<div>
    <nav>
      <a routerLink="/">Task Manager</a>
      <a routerLink="/about">About</a>
    </nav>
    <router-outlet></router-outlet>
  </div>`,
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule],
})
export class AppComponent {}

```

---

## Penjelasan

## Proyek Akhir: Menyatukan Semua
16 pelajaran Angular dirangkum di sini: components & templates (Lesson 2), data binding (Lesson 3), directives (Lesson 4), forms (Lesson 5), services & DI (Lesson 6), routing (Lesson 7), HTTP client (Lesson 8), pipes (Lesson 9), component communication (Lesson 10), lifecycle hooks (Lesson 11), RxJS (Lesson 12), route guards (Lesson 13), state management (Lesson 14), testing (Lesson 15).
## Arsitektur Task Manager
Route -> Component -> Service -> Model. Setiap request melewati router, diarahkan ke komponen, komponen berinteraksi dengan service untuk data, dan merender template untuk output HTML.
## Dari Angular ke Production
Untuk deployment: gunakan ng build --prod untuk build production. Deploy ke Firebase Hosting, Netlify, atau Vercel. Aktifkan production mode di environment.prod.ts. Setup backend API untuk data persistence.

---

## Eksperimen

1. **## Proyek Akhir: Menyatukan Semua
16 pelajaran Angular dirangkum di sini: components & templates (Lesson 2), data binding (Lesson 3), directives (Lesson 4), forms (Lesson 5), services & DI (Lesson 6), routing (Lesson 7), HTTP client (Lesson 8), pipes (Lesson 9), component communication (Lesson 10), lifecycle hooks (Lesson 11), RxJS (Lesson 12), route guards (Lesson 13), state management (Lesson 14), testing (Lesson 15).
## Arsitektur Task Manager
Route -> Component -> Service -> Model. Setiap request melewati router, diarahkan ke komponen, komponen berinteraksi dengan service untuk data, dan merender template untuk output HTML.
## Dari Angular ke Production
Untuk deployment: gunakan ng build --prod untuk build production. Deploy ke Firebase Hosting, Netlify, atau Vercel. Aktifkan production mode di environment.prod.ts. Setup backend API untuk data persistence.**

---

## Tantangan

Tingkatkan proyek akhir: (1) tambah fitur kategori task dengan filter, (2) tambah drag-and-drop untuk reorder task, (3) implementasi real-time sync dengan Firebase atau WebSocket, (4) tambah dark mode toggle dengan Angular Material theme.

---

## Ringkasan

Task Manager = semua konsep Angular. Routing + Forms + Services + RxJS + Guards + Signals + Testing. Anda siap build Angular app nyata!
