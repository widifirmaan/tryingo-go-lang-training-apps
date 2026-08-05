# Directives (Structural & Attribute)

> Angular | Pelajaran 4

## Tujuan Pembelajaran

- Menggunakan *ngFor untuk iterasi array\n- Menggunakan *ngIf untuk conditional rendering\n- Memahami perbedaan structural dan attribute directives\n- Menggunakan [(ngModel)] untuk two-way binding

---

## Program: Angular

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<div>
    <h2>Structural Directives</h2>
    <ul>
      <li *ngFor="let item of items; let i = index">{{ i + 1 }}. {{ item }}</li>
    </ul>
    <p *ngIf="showHello">Hello dengan *ngIf</p>
    <p *ngIf="!showHello; else elseBlock">Else block</p>
    <ng-template #elseBlock><p>Template else</p></ng-template>

    <h2>Attribute Directives</h2>
    <div [class.active]="isActive" [style.background]="bgColor">Div dengan attribute directive</div>
    <input [(ngModel)]="nama" placeholder="Ketik nama Anda">
    <p>{{ nama }}</p>
  </div>`,
})
export class AppComponent {
  items = ['Angular', 'React', 'Vue'];
  showHello = true;
  isActive = true;
  bgColor = '#f0f0f0';
  nama = '';
}

```

---

## Penjelasan

## Structural Directives
*ngFor="let item of items; let i = index" — loop dengan index. *ngIf="condition" — conditional render. *ngIf="condition; else elseTemplate" — dengan else block.
## Attribute Directives
[class.active]="condition" — toggle class. [style.color]="value" — set style. [(ngModel)]="value" — two-way binding (requires FormsModule).
## ng-template
<ng-template #templateRef> — mendefinisikan template yang bisa dirujuk dengan #ref. Digunakan untuk *ngIf else dan *ngFor template.
## FormsModule
Import FormsModule di app.module.ts untuk menggunakan ngModel. Tanpa FormsModule, ngModel tidak akan berfungsi.

---

## Eksperimen

1. **## Structural Directives
*ngFor="let item of items; let i = index" — loop dengan index. *ngIf="condition" — conditional render. *ngIf="condition; else elseTemplate" — dengan else block.
## Attribute Directives
[class.active]="condition" — toggle class. [style.color]="value" — set style. [(ngModel)]="value" — two-way binding (requires FormsModule).
## ng-template
<ng-template #templateRef> — mendefinisikan template yang bisa dirujuk dengan #ref. Digunakan untuk *ngIf else dan *ngFor template.
## FormsModule
Import FormsModule di app.module.ts untuk menggunakan ngModel. Tanpa FormsModule, ngModel tidak akan berfungsi.**

---

## Tantangan

Tingkatkan directives: (1) buat list dengan *ngFor dan filter berdasarkan search input, (2) buat nested *ngIf dengan beberapa kondisi, (3) buat custom attribute directive yang mengubah background color pada hover, (4) implementasi *ngSwitch untuk menampilkan konten berdasarkan kondisi multiple.

---

## Ringkasan

*ngFor = loop. *ngIf = conditional. [class] = attribute directive. ngModel = two-way. Lanjut: forms.
