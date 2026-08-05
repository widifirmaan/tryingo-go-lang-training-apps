# Component Communication (Input/Output)

> Angular | Pelajaran 10

## Tujuan Pembelajaran

- Menggunakan @Input untuk mengirim data dari parent ke child\n- Menggunakan @Output dan EventEmitter untuk mengirim data dari child ke parent\n- Memahami one-way data flow di Angular\n- Membuat komponen parent dan child yang saling berkomunikasi

---

## Program: Angular

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `<div>
    <h2>Parent Component</h2>
    <p>Data dari parent: {{ parentData }}</p>
    <app-child [inputData]="parentData" (outputEvent)="handleOutput($event)"></app-child>
    <button (click)="parentData = 'Data baru dari parent'">Ubah Data</button>
  </div>`,
})
export class ParentComponent {
  parentData = 'Halo dari parent';

  handleOutput(data: string): void {
    this.parentData = data;
  }
}

```

---

## Penjelasan

## @Input
@Input() propertyName: string — decorator untuk menerima data dari parent ke child. Parent mengirim via [propertyName]="value" di template.
## @Output & EventEmitter
@Output() eventName = new EventEmitter<string>() — decorator untuk mengirim data dari child ke parent. Child memanggil eventName.emit(value). Parent mendengarkan dengan (eventName)="handler($event)".
## One-way Data Flow
Data mengalir satu arah: parent → child (via @Input), child → parent (via @Output). Angular menggunakan unidirectional data flow untuk predictability dan easier debugging.
## Services for Communication
Untuk komunikasi antar komponen yang tidak berhubungan (siblings), gunakan shared service dengan BehaviorSubject dari RxJS.

---

## Eksperimen

1. **## @Input
@Input() propertyName: string — decorator untuk menerima data dari parent ke child. Parent mengirim via [propertyName]="value" di template.
## @Output & EventEmitter
@Output() eventName = new EventEmitter<string>() — decorator untuk mengirim data dari child ke parent. Child memanggil eventName.emit(value). Parent mendengarkan dengan (eventName)="handler($event)".
## One-way Data Flow
Data mengalir satu arah: parent → child (via @Input), child → parent (via @Output). Angular menggunakan unidirectional data flow untuk predictability dan easier debugging.
## Services for Communication
Untuk komunikasi antar komponen yang tidak berhubungan (siblings), gunakan shared service dengan BehaviorSubject dari RxJS.**

---

## Tantangan

Tingkatkan komunikasi komponen: (1) buat sibling communication dengan shared service dan BehaviorSubject, (2) buat komponen grandparent-parent-child dengan data flow 3 level, (3) implementasi query params untuk passing data antar route, (4) buat state management sederhana dengan service dan Observable.

---

## Ringkasan

@Input = parent ke child. @Output = child ke parent. EventEmitter = emit event. One-way flow. Lanjut: lifecycle hooks.
