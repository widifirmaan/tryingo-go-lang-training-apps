# Lifecycle Hooks

> Angular | Pelajaran 11

## Tujuan Pembelajaran

- Memahami lifecycle hooks Angular\n- Menggunakan ngOnInit untuk inisialisasi\n- Menggunakan ngOnDestroy untuk cleanup\n- Menggunakan ngOnChanges untuk mendeteksi perubahan input

---

## Program: Angular

```typescript
import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<div>
    <h2>Lifecycle Hooks Demo</h2>
    <p>Status: {{ status }}</p>
    <button (click)="toggle()">Toggle Component</button>
    <app-child *ngIf="showChild" [inputData]="data"></app-child>
  </div>`,
})
export class AppComponent implements OnInit, OnDestroy, OnChanges {
  status = 'init';
  showChild = true;
  data = 'Halo';

  ngOnInit(): void {
    this.status = 'initialized';
    console.log('ngOnInit: Component initialized');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges:', changes);
    this.status = 'changed';
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy: Component destroyed');
    this.status = 'destroyed';
  }

  toggle(): void {
    this.showChild = !this.showChild;
  }
}

```

---

## Penjelasan

## Lifecycle Hooks
ngOnInit() — dipanggil setelah komponen diinisialisasi. Cocok untuk fetch data dan setup subscription.
ngOnDestroy() — dipanggil sebelum komponen dihancurkan. Cocok untuk unsubscribe dari Observable dan cleanup.
ngOnChanges(changes) — dipanggil saat @Input properties berubah. Menerima SimpleChanges object.
ngDoCheck() — dipanggil setiap change detection cycle. Untuk custom change detection.
## Cleanup Pattern
subscription = this.data$.subscribe(...). Di ngOnDestroy: subscription.unsubscribe() — mencegah memory leak.
## ngOnChanges
changes.currentValue — nilai baru. changes.previousValue — nilai sebelumnya. changes.firstChange — apakah ini perubahan pertama.

---

## Eksperimen

1. **## Lifecycle Hooks
ngOnInit() — dipanggil setelah komponen diinisialisasi. Cocok untuk fetch data dan setup subscription.
ngOnDestroy() — dipanggil sebelum komponen dihancurkan. Cocok untuk unsubscribe dari Observable dan cleanup.
ngOnChanges(changes) — dipanggil saat @Input properties berubah. Menerima SimpleChanges object.
ngDoCheck() — dipanggil setiap change detection cycle. Untuk custom change detection.
## Cleanup Pattern
subscription = this.data$.subscribe(...). Di ngOnDestroy: subscription.unsubscribe() — mencegah memory leak.
## ngOnChanges
changes.currentValue — nilai baru. changes.previousValue — nilai sebelumnya. changes.firstChange — apakah ini perubahan pertama.**

---

## Tantangan

Tingkatkan lifecycle hooks: (1) buat komponen dengan subscription yang di-cleanup di ngOnDestroy, (2) implementasi ngDoCheck untuk custom validation, (3) buat komponen yang menggunakan AfterViewInit untuk akses ke DOM element, (4) implementasi retry logic di ngOnInit dengan timer dan retry count.

---

## Ringkasan

ngOnInit = init. ngOnDestroy = cleanup. ngOnChanges = input change. ngDoCheck = custom check. Lanjut: RxJS.
