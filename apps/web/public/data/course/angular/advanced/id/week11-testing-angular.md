# Testing Angular

> **Kategori:** Angular | **Level:** Lanjutan | **Minggu 11:** Testing Angular

## Tujuan Pembelajaran

- Jasmine + Karma setup
- TestBed untuk testing environment
- ComponentFixture untuk component testing
- Service testing dengan TestBed.inject
- Async testing: fakeAsync, waitForAsync

---

## Program: Testing Angular: Unit + E2E

Spesifikasi unit via TestBed + Karma; integrasi dengan testing-library + Cypress.

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

  // E2E (cypress style)
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

## Konsep Kunci

### TestBed composition

Isolasi test per spec: konfigurasi providers/mocks di configureTestingModule.

### Query by semantics

nativeElement bekerja, tetapi @testing-library getByRole/getByLabel lebih tahan refaktor.

### fixture.detectChanges()

Zona klasik: dipanggil manual; dengan zoneless/signals, scheduling otomatis.

### E2E checklist

Auth flow, navigasi, baseline a11y - semua harus hijau di jalur utama.

---

## Eksperimen

- Konversi spec querySelector ke query @testing-library.
- Uji fetch async dengan fake timers.

---

## Tantangan

Tambahkan: snapshot stability test store shape after checkout.

---

## Ringkasan

Materi minggu ini telah dibahas: Testing Angular: Unit + E2E. Lanjut ke pekan berikutnya untuk memperdalam.
