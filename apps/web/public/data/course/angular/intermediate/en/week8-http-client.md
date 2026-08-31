# HttpClient — Ambil Stok dari Gudang

> **Kategori:** Angular | **Level:** Menengah | **Minggu 8:** HttpClient

## Tujuan Pembelajaran

- `HttpClient` `get`/`post` ambil API warung, `Observable` langganan

---

## Program

```typescript
// service
import { HttpClient } from "@angular/common/http";
@Injectable({ providedIn: "root" })
export class ProdukService {
  constructor(private http: HttpClient) {}
  getAll(){ return this.http.get<any[]>("/api/produk"); }
}

// component
produk$ = this.produkService.getAll();
```

Template: `<li *ngFor="let p of produk$ | async">{{ p.nama }}</li>`

---

## Ringkasan

Minggu 8: **Ambil Stok** — `HttpClient` + `async` pipe.
