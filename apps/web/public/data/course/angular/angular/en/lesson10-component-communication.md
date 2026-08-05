# Component Communication (Input/Output)

> Angular | Lesson 10

## Learning Objectives

- Use @Input to send data from parent to child\n- Use @Output and EventEmitter to send data from child to parent\n- Understand one-way data flow in Angular\n- Create parent and child components that communicate

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

## Explanation

## @Input
@Input() propertyName: string — decorator to receive data from parent to child. Parent sends via [propertyName]="value" in template.
## @Output & EventEmitter
@Output() eventName = new EventEmitter<string>() — decorator to send data from child to parent. Child calls eventName.emit(value). Parent listens with (eventName)="handler($event)".
## One-way Data Flow
Data flows one direction: parent → child (via @Input), child → parent (via @Output). Angular uses unidirectional data flow for predictability and easier debugging.
## Services for Communication
For communication between unrelated components (siblings), use shared service with BehaviorSubject from RxJS.

---

## Experiments

1. **## @Input
@Input() propertyName: string — decorator to receive data from parent to child. Parent sends via [propertyName]="value" in template.
## @Output & EventEmitter
@Output() eventName = new EventEmitter<string>() — decorator to send data from child to parent. Child calls eventName.emit(value). Parent listens with (eventName)="handler($event)".
## One-way Data Flow
Data flows one direction: parent → child (via @Input), child → parent (via @Output). Angular uses unidirectional data flow for predictability and easier debugging.
## Services for Communication
For communication between unrelated components (siblings), use shared service with BehaviorSubject from RxJS.**

---

## Challenge

Level up component communication: (1) create sibling communication with shared service and BehaviorSubject, (2) create grandparent-parent-child component with 3-level data flow, (3) implement query params for passing data between routes, (4) create simple state management with service and Observable.

---

## Summary

@Input = parent to child. @Output = child to parent. EventEmitter = emit event. One-way flow. Next: lifecycle hooks.
