# Testing Angular — Uji Pabrik

> **Kategori:** Angular | **Level:** Lanjutan | **Minggu 11:** Testing Angular

## Tujuan Pembelajaran

- `TestBed` + `ComponentFixture` — `fixture.detectChanges()` uji `Kartu`

---

## Program

```typescript
import { TestBed } from "@angular/core/testing";
import { KartuComponent } from "./kartu.component";

it("tampil nama", () => {
  TestBed.configureTestingModule({ imports: [KartuComponent] });
  const fixture = TestBed.createComponent(KartuComponent);
  fixture.componentInstance.nama = "Beras";
  fixture.detectChanges();
  expect(fixture.nativeElement.textContent).toContain("Beras");
});
```

`ng test` → PASS.

---

## Ringkasan

Minggu 11: **Uji Angular** — `TestBed`.
