# Services & DI — Gudang Bersama

> **Kategori:** Angular | **Level:** Pemula | **Minggu 3:** Services & DI

## Tujuan Pembelajaran

- `service` = gudang bersama, `inject` ke komponen — 1 data untuk 10 cabang

---

## Program

```typescript
// produk.service.ts
@Injectable({ providedIn: 'root' })
export class ProdukService {
  daftar = [{ nama: "Beras", harga: 62000 }];
  getAll(){ return this.daftar; }
}

// kartu.component.ts
constructor(private produkService: ProdukService) {}
ngOnInit(){ this.daftar = this.produkService.getAll(); }
```

---

## Ringkasan

Minggu 3: **Gudang Bersama** — service & DI untuk skala besar.
