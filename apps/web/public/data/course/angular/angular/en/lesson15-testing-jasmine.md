# Testing with Jasmine & Karma

> Angular | Lesson 15

## Learning Objectives

- Write tests with Jasmine and Karma\n- Use TestBed for testing module configuration\n- Use ComponentFixture for component testing\n- Use describe/it/expect for test structure

---

## Program: Angular

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Angular');
  });

  it('should increment count on button click', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button') as HTMLButtonElement;
    button.click();
    fixture.detectChanges();
    expect(component.count).toBe(1);
  });
});

```

---

## Explanation

## Testing Setup
Jasmine = test framework. Karma = test runner. TestBed = Angular testing utility.
## Test Structure
describe('suite', () => { it('test name', () => { expect(...).toBe(...) }) }) — nested test suites and individual test cases.
## TestBed
TestBed.configureTestingModule({ declarations: [Component] }) — configure testing module. compileComponents() — compile templates. TestBed.createComponent(Component) — create test fixture.
## Assertions
expect(component).toBeTruthy() — check truthy. expect(value).toBe(expected) — check equality. expect(el.textContent).toContain('text') — check DOM content.
## Running Tests
ng test — run all tests in watch mode. ng test --watch=false — run once and exit. ng test --include src/app/app.component.spec.ts — run specific test file.

---

## Experiments

1. **## Testing Setup
Jasmine = test framework. Karma = test runner. TestBed = Angular testing utility.
## Test Structure
describe('suite', () => { it('test name', () => { expect(...).toBe(...) }) }) — nested test suites and individual test cases.
## TestBed
TestBed.configureTestingModule({ declarations: [Component] }) — configure testing module. compileComponents() — compile templates. TestBed.createComponent(Component) — create test fixture.
## Assertions
expect(component).toBeTruthy() — check truthy. expect(value).toBe(expected) — check equality. expect(el.textContent).toContain('text') — check DOM content.
## Running Tests
ng test — run all tests in watch mode. ng test --watch=false — run once and exit. ng test --include src/app/app.component.spec.ts — run specific test file.**

---

## Challenge

Level up testing: (1) create service test with mock dependency injection, (2) create test for route guards with RouterTestingModule, (3) add test for HTTP client with HttpTestingController, (4) implement test coverage report and target minimum 80%.

---

## Summary

Jasmine = framework. Karma = runner. TestBed = setup. describe/it/expect = structure. Next: final project.
