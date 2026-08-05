# Final Project: Task Manager App

> Angular | Lesson 16

## Learning Objectives

- Assemble all Angular concepts into one Task Manager project\n- Implement routing with RouterModule and router-outlet\n- Use FormsModule and ReactiveFormsModule for form input\n- Secure routes with AuthGuard and protect admin pages

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

## Explanation

## Final Project: Bringing It All Together
16 Angular lessons summarized here: components & templates (Lesson 2), data binding (Lesson 3), directives (Lesson 4), forms (Lesson 5), services & DI (Lesson 6), routing (Lesson 7), HTTP client (Lesson 8), pipes (Lesson 9), component communication (Lesson 10), lifecycle hooks (Lesson 11), RxJS (Lesson 12), route guards (Lesson 13), state management (Lesson 14), testing (Lesson 15).
## Task Manager Architecture
Route -> Component -> Service -> Model. Every request goes through router, routed to component, component interacts with service for data, and renders template for HTML output.
## From Angular to Production
For deployment: use ng build --prod for production build. Deploy to Firebase Hosting, Netlify, or Vercel. Enable production mode in environment.prod.ts. Setup backend API for data persistence.

---

## Experiments

1. **## Final Project: Bringing It All Together
16 Angular lessons summarized here: components & templates (Lesson 2), data binding (Lesson 3), directives (Lesson 4), forms (Lesson 5), services & DI (Lesson 6), routing (Lesson 7), HTTP client (Lesson 8), pipes (Lesson 9), component communication (Lesson 10), lifecycle hooks (Lesson 11), RxJS (Lesson 12), route guards (Lesson 13), state management (Lesson 14), testing (Lesson 15).
## Task Manager Architecture
Route -> Component -> Service -> Model. Every request goes through router, routed to component, component interacts with service for data, and renders template for HTML output.
## From Angular to Production
For deployment: use ng build --prod for production build. Deploy to Firebase Hosting, Netlify, or Vercel. Enable production mode in environment.prod.ts. Setup backend API for data persistence.**

---

## Challenge

Level up the final project: (1) add task category feature with filter, (2) add drag-and-drop for task reorder, (3) implement real-time sync with Firebase or WebSocket, (4) add dark mode toggle with Angular Material theme.

---

## Summary

Task Manager = all Angular concepts. Routing + Forms + Services + RxJS + Guards + Signals + Testing. You are ready to build real Angular apps!
