# Components & Templates

> Angular | Pelajaran 2

## Tujuan Pembelajaran

- Memahami komponen Angular: @Component dengan selector dan template\n- Menggunakan interpolation {{ }} untuk menampilkan data\n- Menggunakan event binding (click) untuk menangani aksi user\n- Memisahkan template ke file .html terpisah dengan templateUrl

---

## Program: Angular

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<div>
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <button (click)="onClick()">Klik Saya</button>
  </div>`,
})
export class AppComponent {
  title = 'Angular Components';
  message = 'Belajar data binding di Angular';

  onClick(): void {
    this.message = 'Tombol diklik!';
  }
}

```

---

## Penjelasan

## Komponen Angular
@Component({ selector, template }) — decorator yang mendefinisikan komponen. selector = nama tag HTML. template = HTML template inline.
## Interpolation
{{ title }} — menampilkan nilai properti title dari komponen ke HTML. Angular secara otomatis mendeteksi perubahan dan memperbarui view.
## Event Binding
(click)="onClick()" — mendengarkan event click dan memanggil method onClick() di komponen.
## Template URL
templateUrl: './app.component.html' — memisahkan template ke file HTML terpisah untuk kode yang lebih bersih.

---

## Eksperimen

1. **## Komponen Angular
@Component({ selector, template }) — decorator yang mendefinisikan komponen. selector = nama tag HTML. template = HTML template inline.
## Interpolation
{{ title }} — menampilkan nilai properti title dari komponen ke HTML. Angular secara otomatis mendeteksi perubahan dan memperbarui view.
## Event Binding
(click)="onClick()" — mendengarkan event click dan memanggil method onClick() di komponen.
## Template URL
templateUrl: './app.component.html' — memisahkan template ke file HTML terpisah untuk kode yang lebih bersih.**

---

## Tantangan

Kembangkan komponen: (1) tambah properti baru "nama" dan tampilkan di template, (2) tambah method "ubahPesan()" yang mengubah message, (3) buat komponen anak dengan selector "app-child" dan tampilkan di parent, (4) tambah input field dengan [(ngModel)] untuk two-way binding.

---

## Ringkasan

Component = @Component. Interpolation = {{ }}. Event binding = (click). templateUrl = file terpisah. Lanjut: directives.
