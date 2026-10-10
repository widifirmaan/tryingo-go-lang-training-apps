# Components & Templates

> **Kategori:** Angular | **Level:** Beginner | **Minggu 1:** Components & Templates

## Learning Objectives

- Understand Angular as web app platform
- Component: selector, template, class
- Interpolation: {{ }} for data display
- Event binding: (click)="method()"
- Structural directive: *ngIf, *ngFor

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **Angular Language Service** (`angular.ng-template`): Template syntax autocomplete and diagnostics

Or install all recommended extensions at once via terminal:
```bash
code --install-extension angular.ng-template
```

---

### 2. Runtime & Dependency Installation (Node.js LTS (v20+))
Make sure the required runtime or SDK is installed on your machine:

**Windows (PowerShell):**
```powershell
winget install OpenJS.NodeJS.LTS
```

**macOS (Terminal / Homebrew):**
```bash
brew install node
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install nodejs npm
```

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
node -v && npm -v
```

Expected output:
```output
v20.x.x
10.x.x
```

> 💡 **Prerequisite Note:** The Angular CLI requires the latest Node.js LTS release.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
npx @angular/cli@latest new my-angular-app --routing --style=css --ssr=false
cd my-angular-app
```
- **Details:** Generates a modern Angular application using standalone components and client routing.
- **Navigate to the project directory:**
```bash
cd my-angular-app
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
npm start
```
Open in browser or terminal: `http://localhost:4200`

> ℹ️ Angular dev server runs by default on port 4200.

**Initial Entry File (`src/app/app.component.ts`):**
```ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div style="text-align: center; padding: 3rem; font-family: system-ui;">
      <h1 style="color: #dd0031;">🅰️ Halo dari Angular!</h1>
      <p>Menggunakan Angular Signal untuk reaktivitas:</p>
      <button (click)="increment()" style="padding: 10px 20px; font-size: 16px;">
        Hitungan Signal: {{ count() }}
      </button>
    </div>
  `,
})
export class AppComponent {
  count = signal(0);

  increment() {
    this.count.update(c => c + 1);
  }
}
```
Standalone Angular component featuring reactive Angular Signals.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
my-angular-app/
├── src/
│   ├── app/
│   │   ├── app.component.ts     # Root component standalone
│   │   ├── app.component.html   # Template HTML
│   │   ├── app.component.css    # Style spesifik
│   │   └── app.routes.ts        # Definisi route
│   ├── index.html               # Shell HTML
│   └── main.ts                  # Bootstrap Application
├── angular.json                 # Konfigurasi build Angular
└── package.json                 # Dependensi @angular/*
```
Modern Angular defaults to Standalone Components, eliminating boilerplate NgModules.

---

### 6. Beginner Tips & Best Practices
- Use Angular Signals (`signal()`, `computed()`) for fine-grained reactivity without Zone.js overhead.
- Take advantage of new template control flow syntax (`@if`, `@for`, `@switch`).

---

## Program: Hello Angular

```typescript
// Angular = platform untuk membangun mobile dan desktop web apps
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: '<h1>Halo, {{ name }}!</h1><button (click)="greet()">Klik</button><p *ngIf="showMessage">{{ message }}</p>',
})
export class AppComponent {
  name = 'Tryngo';
  message = 'Tombol diklik!';
  showMessage = false;
  greet() { this.showMessage = true; console.log('Halo dari Angular!'); }
}
console.log('Angular app siap dijalankan');
```

---

## Key Concepts

### Component
Building block with @Component.

### Template
HTML + Angular syntax.

### Structural Directives
*ngIf conditional, *ngFor loop.

### Module
@NgModule organizes components.

---

## Experiments

- Change property and observe template update
- Add new method with event
- Create conditional display
- Render list with *ngFor

---

## Challenge

Build a counter app: increment, decrement, reset. Show different messages based on value.

---

## Summary

Week 1 of 14: **Components & Templates** (Level: Beginner). Next week: **Directives & Pipes**.
