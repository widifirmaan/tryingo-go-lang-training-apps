# Lifecycle Hooks

> Angular | Lesson 11

## Learning Objectives

- Understand Angular lifecycle hooks\n- Use ngOnInit for initialization\n- Use ngOnDestroy for cleanup\n- Use ngOnChanges to detect input changes

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

## Explanation

## Lifecycle Hooks
ngOnInit() — called after component initialized. Good for fetching data and setting up subscriptions.
ngOnDestroy() — called before component destroyed. Good for unsubscribing from Observables and cleanup.
ngOnChanges(changes) — called when @Input properties change. Receives SimpleChanges object.
ngDoCheck() — called on every change detection cycle. For custom change detection.
## Cleanup Pattern
subscription = this.data$.subscribe(...). In ngOnDestroy: subscription.unsubscribe() — prevents memory leak.
## ngOnChanges
changes.currentValue — new value. changes.previousValue — previous value. changes.firstChange — whether this is the first change.

---

## Experiments

1. **## Lifecycle Hooks
ngOnInit() — called after component initialized. Good for fetching data and setting up subscriptions.
ngOnDestroy() — called before component destroyed. Good for unsubscribing from Observables and cleanup.
ngOnChanges(changes) — called when @Input properties change. Receives SimpleChanges object.
ngDoCheck() — called on every change detection cycle. For custom change detection.
## Cleanup Pattern
subscription = this.data$.subscribe(...). In ngOnDestroy: subscription.unsubscribe() — prevents memory leak.
## ngOnChanges
changes.currentValue — new value. changes.previousValue — previous value. changes.firstChange — whether this is the first change.**

---

## Challenge

Level up lifecycle hooks: (1) create component with subscription cleaned up in ngOnDestroy, (2) implement ngDoCheck for custom validation, (3) create component using AfterViewInit for DOM element access, (4) implement retry logic in ngOnInit with timer and retry count.

---

## Summary

ngOnInit = init. ngOnDestroy = cleanup. ngOnChanges = input change. ngDoCheck = custom check. Next: RxJS.
