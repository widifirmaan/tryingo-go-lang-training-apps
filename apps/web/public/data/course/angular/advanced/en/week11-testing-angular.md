# Testing Angular

> **Kategori:** Angular | **Level:** Advanced | **Minggu 11:** Testing Angular

## Learning Objectives

- Jasmine + Karma setup
- TestBed for testing environment
- ComponentFixture for component testing
- Service testing with TestBed.inject
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

## Key Concepts

### TestBed
Configure testing module.

### ComponentFixture
Wrapper for component + DOM.

### Async Testing
fakeAsync, waitForAsync.

---

## Experiments

- Test component with @Input/@Output
- Test service with HTTP mocking
- Test with reactive forms
- Test route navigation

---

## Challenge

Build a test suite for product component: display, add to cart, remove from cart.

---

## Summary

Week 11 of 14: **Testing Angular** (Level: Advanced). Next week: **Performance**.
