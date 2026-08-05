# Components & Templates

> Angular | Lesson 2

## Learning Objectives

- Understand Angular component: @Component with selector and template\n- Use interpolation {{ }} to display data\n- Use event binding (click) to handle user actions\n- Separate template to .html file with templateUrl

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

## Explanation

## Angular Component
@Component({ selector, template }) — decorator that defines the component. selector = HTML tag name. template = inline HTML template.
## Interpolation
{{ title }} — displays the title property value from the component into HTML. Angular automatically detects changes and updates the view.
## Event Binding
(click)="onClick()" — listens for click event and calls onClick() method in the component.
## Template URL
templateUrl: './app.component.html' — separates template to HTML file for cleaner code.

---

## Experiments

1. **## Angular Component
@Component({ selector, template }) — decorator that defines the component. selector = HTML tag name. template = inline HTML template.
## Interpolation
{{ title }} — displays the title property value from the component into HTML. Angular automatically detects changes and updates the view.
## Event Binding
(click)="onClick()" — listens for click event and calls onClick() method in the component.
## Template URL
templateUrl: './app.component.html' — separates template to HTML file for cleaner code.**

---

## Challenge

Expand component: (1) add new property "nama" and display in template, (2) add method "ubahPesan()" that changes message, (3) create child component with selector "app-child" and display in parent, (4) add input field with [(ngModel)] for two-way binding.

---

## Summary

Component = @Component. Interpolation = {{ }}. Event binding = (click). templateUrl = separate file. Next: directives.
