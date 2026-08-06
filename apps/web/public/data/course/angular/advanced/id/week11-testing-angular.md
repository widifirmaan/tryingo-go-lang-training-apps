# Testing Angular

> **Kategori:** Angular | **Level:** Lanjutan | **Minggu 11:** Testing Angular

## Tujuan Pembelajaran

- Jasmine + Karma setup
- TestBed untuk testing environment
- ComponentFixture untuk component testing
- Service testing dengan TestBed.inject
- Async testing: fakeAsync, waitForAsync

---

## Program: Unit & Integration

```typescript
// Testing Angular: Jasmine + Karma
// describe('AppComponent', () => {
//   let component: AppComponent;
//   let fixture: ComponentFixture<AppComponent>;
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({ declarations: [AppComponent] }).compileComponents();
//     fixture = TestBed.createComponent(AppComponent);
//     component = fixture.componentInstance;
//   });
//   it('should create', () => { expect(component).toBeTruthy(); });
// });
console.log('Testing Angular siap digunakan');
```

---

## Konsep Kunci

### TestBed
Configure testing module.

### ComponentFixture
Wrapper untuk component + DOM.

### Async Testing
fakeAsync + tick = simulate async.

---

## Eksperimen

- Test component dengan @Input/@Output
- Test service dengan HTTP mocking
- Test dengan reactive forms
- Test route navigation

---

## Tantangan

Buat test suite untuk product component: display, add to cart, remove from cart.

---

## Ringkasan

Minggu 11 dari 14: **Testing Angular** (Level: Lanjutan). Minggu depan: **Performance**.
