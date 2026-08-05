# Directives (Structural & Attribute)

> Angular | Lesson 4

## Learning Objectives

- Use *ngFor for array iteration\n- Use *ngIf for conditional rendering\n- Understand structural vs attribute directives\n- Use [(ngModel)] for two-way binding

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

## Explanation

## Structural Directives
*ngFor="let item of items; let i = index" — loop with index. *ngIf="condition" — conditional render. *ngIf="condition; else elseTemplate" — with else block.
## Attribute Directives
[class.active]="condition" — toggle class. [style.color]="value" — set style. [(ngModel)]="value" — two-way binding (requires FormsModule).
## ng-template
<ng-template #templateRef> — defines template that can be referenced with #ref. Used for *ngIf else and *ngFor template.
## FormsModule
Import FormsModule in app.module.ts to use ngModel. Without FormsModule, ngModel will not work.

---

## Experiments

1. **## Structural Directives
*ngFor="let item of items; let i = index" — loop with index. *ngIf="condition" — conditional render. *ngIf="condition; else elseTemplate" — with else block.
## Attribute Directives
[class.active]="condition" — toggle class. [style.color]="value" — set style. [(ngModel)]="value" — two-way binding (requires FormsModule).
## ng-template
<ng-template #templateRef> — defines template that can be referenced with #ref. Used for *ngIf else and *ngFor template.
## FormsModule
Import FormsModule in app.module.ts to use ngModel. Without FormsModule, ngModel will not work.**

---

## Challenge

Level up directives: (1) create list with *ngFor and filter based on search input, (2) create nested *ngIf with multiple conditions, (3) create custom attribute directive that changes background on hover, (4) implement *ngSwitch for displaying content based on multiple conditions.

---

## Summary

*ngFor = loop. *ngIf = conditional. [class] = attribute directive. ngModel = two-way. Next: forms.
