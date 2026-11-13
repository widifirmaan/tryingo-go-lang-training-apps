# Components & Templates

## Why This Matters

Angular powers large internal enterprise applications - banks, insurance, healthcare - because its strict structure survives teams of dozens of developers. Thinking in clean architecture from day one means you already work the way real engineering teams do.

Practice program: *"Hello Angular"*. Run the code in the Playground to examine how it works.


## Learning Objectives

- Understand Angular as web app platform
- Component: selector, template, class
- Interpolation: {{ }} for data display
- Event binding: (click)="method()"
- Structural directive: *ngIf, *ngFor


## Foundations: Before Writing Code

This section is for readers who are **completely new** to programming. The concepts are identical across every language - learn them once, use them forever.

- **Files & folders = where programs live.** A program is plain text saved in a file (e.g. `lesson.md`). Files have **extensions** that indicate the language: `.md`, `.go`, `.py`, `.html`. A folder holding all of a program's files is called a **project**.
- **Terminal / command line.** A text window where you type commands: `cd folder` (change folder), `ls` / `dir` (list contents), `go run main.go` (run a program). Programs run from the folder containing their files.
- **Compiled vs interpreted.** **Compiled** languages (Go, Rust, C#) translate the whole program into machine instructions before running - fast, but require a build step. **Interpreted** languages (Python, PHP, JavaScript) execute line by line directly - great for learning and quick prototypes. The playgrounds on this site execute code **inside your browser**, so no installation is needed.
- **Statically typed vs dynamically typed.** **Statically typed** languages (Go, Rust, TypeScript) check data types (numbers, text) while you write - errors surface early. **Dynamically typed** languages (Python, PHP, JavaScript) check types while the program runs - more lenient, but errors appear at runtime.
- **How to read error messages.** Read the last line first: the error type plus a short explanation, then locate the **line number** it mentions. Errors are not tragedies - they are the computer telling you what to fix.
- **REPL / playground.** A REPL (Read-Eval-Print Loop) is a code "calculator": type one line, see the result instantly. Every code block on this site has a **Try in Playground** button letting you tweak and run the code live - the fastest way to learn: change a little, run, observe the difference.

> **Important note:** the browser playground has limitations - it cannot receive interactive keyboard input (stdin). If a challenge asks for "user input", simply write the value directly into a variable (e.g. `let name = "Budi"`; `rupiah = 250000`) and run.

---

---

## Quick Start Guide: Setup & Project Initialization

> **Try it directly in the browser without local setup.** All code blocks can run directly in the Playground.

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. Runtime & Dependency Installation (Node.js LTS (v20+))
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

> **Prerequisite Note:** The Angular CLI requires the latest Node.js LTS release.

---

### 2. Initializing a Blank Project (Scaffolding)
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

### 3. Running the Local Dev Server & First Entry File
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

### 4. New Project Directory Structure
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

### 5. Beginner Tips & Best Practices
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
