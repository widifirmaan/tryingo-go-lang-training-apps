# Introduction to Angular & Setup

> Angular | Lesson 1

## Learning Objectives

- Understand Angular: TypeScript framework for web\n- Learn Angular project structure (src/app/, src/index.html)\n- Understand AppModule and AppComponent\n- Run Angular app via serve and view output in browser

---

## Program: Angular

```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

```

---

## Explanation

## Angular Project Structure
src/app/ = application code (components, services, modules). src/index.html = main HTML template. src/main.ts = application entry point.
## Module & Component
@NgModule({ declarations, imports, providers, bootstrap }) — defines Angular module. @Component({ selector, template }) — defines component.
## Running Angular
npm install && npm run dev — install dependencies and start dev server. Open http://localhost:3000.

---

## Experiments

1. **## Angular Project Structure
src/app/ = application code (components, services, modules). src/index.html = main HTML template. src/main.ts = application entry point.
## Module & Component
@NgModule({ declarations, imports, providers, bootstrap }) — defines Angular module. @Component({ selector, template }) — defines component.
## Running Angular
npm install && npm run dev — install dependencies and start dev server. Open http://localhost:3000.**

---

## Challenge

Explore: (1) change "Hello, Angular!" to your welcome message in AppComponent template, (2) add an h2 with your name, (3) try accessing http://localhost:3000 and see the change, (4) add a button in template that shows alert on click.

---

## Summary

Angular = TypeScript framework. src/app/ = your code. @NgModule = module. @Component = component. Next: data binding.
