# Testing Angular — Factory Test (angular.dev)

> **Kategori:** Angular | **Level:** Advanced | **Minggu 11:** Testing Angular
> **Prerequisites:** Week 10 — **State Management**.

## Learning Objectives

- `TestBed.createComponent(Card)` + `fixture.detectChanges()` + `fixture.nativeElement.querySelector` tests `Card` (source: angular.dev/api/core/testing/TestBed)

---

## Why This Matters (Non-IT)

Without tests, editing `Card` → missing price unnoticed. With `TestBed`, edit → red test → fix before deploy.

---

## Program: Test Angular Card (angular.dev)

```typescript
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { CardComponent } from "./card.component";

describe("Card", () => {
  let fixture: ComponentFixture<CardComponent>;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CardComponent] });
    fixture = TestBed.createComponent(CardComponent);
    fixture.componentInstance.name = "Rice";
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it("shows name", () => {
    expect(el.textContent).toContain("Rice");
  });

  it("detectChanges update", async () => {
    fixture.componentInstance.name = "Spinach";
    fixture.detectChanges();
    await fixture.whenStable();
    expect(el.textContent).toContain("Spinach");
  });
});
```

`ng test` → PASS. `fixture.detectChanges()` = re-render, `whenStable()` waits.

**Source:** `angular.dev/api/core/testing/TestBed` + `ComponentFixture`.

---

## Key Concepts

### `TestBed.createComponent` + `detectChanges`
`createComponent` creates, `detectChanges` renders, `nativeElement.querySelector` grabs.

---

## Beginner Friendly Explanation

### Analogy: Test Factory

- **`TestBed` = test factory**: builds `Card` in the factory, `detectChanges` powers on, checks `textContent`.

### Step 0 — Prepare Device

`ng new` + `ng test` on `4200` (done in W1) + `npm install`.

### How the Computer Reads It
1. `createComponent` → instance built, not yet rendered.
2. `detectChanges()` → renders → `textContent` contains "Rice".

### 3 Must-Know Terms

1. **TestBed/fixture**: factory/test
2. **detectChanges/whenStable**: render/wait

---

## Experiments

- **Green:** Change name to "Sugar" → test red? Fix.
- **Yellow:** Skip `detectChanges` → empty text? Add it.
- **Red:** `whenStable` without async → flaky? Keep async.

---

## Challenge

**Complete Tested Shop:** `Card` `name` + `price` + tests `shows name` & `shows price` 2 tests, `ng test` PASS.
- **Link-up (Week 10 — State Management):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **TestBed/fixture**: test factory

---

## Summary

Week 11 of 14: **Test Factory** — `TestBed`. Next: **Performance**.
