# Testing Angular

> **Kategori:** Angular | **Level:** Advanced | **Minggu 11:** Testing Angular

## Learning Objectives

- Jasmine + Karma setup
- TestBed for testing environment
- ComponentFixture for component testing
- Service testing with TestBed.inject
- Async testing: fakeAsync, waitForAsync

---

## Program: Angular Testing: Unit & E2E

Specs via TestBed + Karma; integration with testing-library + Cypress.

```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CounterComponent } from './counter';

describe('CounterComponent (TestBed unit)', () => {
  let fixture: ComponentFixture<CounterComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CounterComponent);
    el = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('renders initial value', () => {
    expect(el.querySelector('output')!.textContent).toContain('0');
  });

  it('increments on click', () => {
    (el.querySelector('button.inc') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(el.querySelector('output')!.textContent).toContain('1');
  });

  // E2E (Cypress style)
  describe('cypress example', () => {
    it('cart flows', () => {
      cy.visit('/');
      cy.injectAxe(); // accessibility scan
      cy.get('.product-card').first().find('button.add').click();
      cy.get('[data-testid=cart-badge]').should('contain', '1 item');
      cy.get('[data-testid=checkout-link]').click();
      cy.url().should('include', '/checkout');
    });
  });
});
```

---

## Key Concepts

### TestBed composition

Isolasi test per spec: konfigurasi providers/mocks di configureTestingModule.

### Query by semantics

nativeElement bekerja, tetapi @testing-library getByRole/getByLabel lebih tahan refaktor.

### fixture.detectChanges()

Zona klasik: dipanggil manual; dengan zoneless/signals, scheduling otomatis.

### E2E checklist

Auth flow, navigasi, baseline a11y - semua harus hijau di jalur utama.

---

## Experiments

- Convert querySelector specs to @testing-library queries
- Test async fetch with fake clocks.

---

## Challenge

Add snapshot stability tests to store shape after checkout.

---

## Summary

This week's material has been covered: Angular Testing: Unit & E2E. Continue to the following week to deepen.
