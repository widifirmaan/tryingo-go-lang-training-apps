# Testing dengan Jasmine & Karma

> Angular | Pelajaran 15

## Tujuan Pembelajaran

- Menulis test dengan Jasmine dan Karma\n- Menggunakan TestBed untuk konfigurasi testing module\n- Menggunakan ComponentFixture untuk testing komponen\n- Menggunakan describe/it/expect untuk test structure

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

## Penjelasan

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

## Eksperimen

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

## Tantangan

Tingkatkan testing: (1) buat test service dengan dependency injection mock, (2) buat test untuk route guards dengan RouterTestingModule, (3) tambah test untuk HTTP client dengan HttpTestingController, (4) implementasi test coverage report dan target minimal 80%.

---

## Ringkasan

Jasmine = framework. Karma = runner. TestBed = setup. describe/it/expect = structure. Lanjut: proyek akhir.
