# Testing Angular — Uji Pabrik (angular.dev)

> **Kategori:** Angular | **Level:** Lanjutan | **Minggu 11:** Testing Angular
> **Prasyarat:** Minggu 10 — **State Management**.

## Tujuan Pembelajaran

- `TestBed.createComponent(Kartu)` + `fixture.detectChanges()` + `fixture.nativeElement.querySelector` uji `Kartu` (sumber: angular.dev/api/core/testing/TestBed)

---

## Kenapa Ini Penting Buat Kamu?

Tanpa uji, ubah `Kartu` → harga hilang tidak ketahuan. Dengan `TestBed`, ubah → test merah → perbaiki sebelum deploy.

---

## Program: Uji Kartu Angular (angular.dev)

```typescript
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { KartuComponent } from "./kartu.component";

describe("Kartu", () => {
  let fixture: ComponentFixture<KartuComponent>;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [KartuComponent] });
    fixture = TestBed.createComponent(KartuComponent);
    fixture.componentInstance.nama = "Beras";
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it("tampil nama", () => {
    expect(el.textContent).toContain("Beras");
  });

  it("detectChanges update", async () => {
    fixture.componentInstance.nama = "Bayam";
    fixture.detectChanges();
    await fixture.whenStable();
    expect(el.textContent).toContain("Bayam");
  });
});
```

`ng test` → PASS. `fixture.detectChanges()` = gambar ulang, `whenStable()` tunggu.

**Sumber:** `angular.dev/api/core/testing/TestBed` + `ComponentFixture`.

---

## Konsep Kunci

### `TestBed.createComponent` + `detectChanges`
`createComponent` buat, `detectChanges` gambar, `nativeElement.querySelector` ambil.

---

## Penjelasan untuk Pemula

### Analogi: Uji Pabrik

- **`TestBed` = pabrik uji**: buat `Kartu` di pabrik, `detectChanges` hidupkan, cek `textContent`.

### Langkah 0 — Device

`ng new` + `ng test` di `4200` (sudah W1) + `npm install`.

### 3 Istilah Wajib

1. **TestBed/fixture**: pabrik/uji
2. **detectChanges/whenStable**: gambar/tunggu

---

## Tantangan

**Warung Uji Lengkap:** `Kartu` `nama` + `harga` + test `tampil nama` & `tampil harga` 2 test, `ng test` PASS.

---

## Glosarium Mini

- **TestBed/fixture**: pabrik uji

---

## Ringkasan

Minggu 11 dari 14: **Uji Pabrik** — `TestBed`. Minggu depan: **Performance**.
