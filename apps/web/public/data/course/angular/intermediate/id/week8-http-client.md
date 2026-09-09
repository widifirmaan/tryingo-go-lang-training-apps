# HttpClient — Ambil Stok dari Gudang (angular.dev)

> **Kategori:** Angular | **Level:** Menengah | **Minggu 8:** HttpClient

## Tujuan Pembelajaran

- `HttpClient` `get`/`post` ambil API warung — `http.get<Produk[]>('/api/produk').subscribe(produk => ...)` dan `http.post` kirim `body` JSON (sumber: angular.dev/guide/http/making-requests)
- Wajib `subscribe()` agar request terkirim — tanpa itu tidak jalan

---

## Kenapa Ini Penting Buat Kamu?

Tanpa `HttpClient`, warung tidak bisa ambil stok dari gudang pusat `api.warung.com`. Dengan `get`/`post`, 1 baris ambil/kirim.

---

## Program: Ambil & Kirim Warung (angular.dev)

```typescript
// service: produk.service.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ProdukService {
  constructor(private http: HttpClient) {}

  getAll(){
    return this.http.get<any[]>("/api/produk"); // GET → Observable
  }

  tambah(nama: string){
    return this.http.post("/api/produk", { nama }); // POST + body JSON
  }
}

// component.ts
produk$ = this.produkService.getAll(); // di template: | async

ngOnInit(){
  this.produkService.getAll().subscribe(data => console.log(data));
  this.produkService.tambah("Beras").subscribe(res => console.log("Tambah:", res));
}
```

```html
<!-- template -->
<li *ngFor="let p of produk$ | async">{{ p.nama }}</li>
```

**Sumber:** `angular.dev/guide/http/making-requests` — `http.get`/`post` + `subscribe`.

---

## Konsep Kunci

### `HttpClient.get`/`post` = Ambil/Kirim
`get("/api/produk")` ambil, `post("/api/produk", { nama })` kirim `body` JSON otomatis.

### `subscribe()` = Tekan Kirim
`http.get(...).subscribe(data => ...)` tanpa `subscribe` request tidak terkirim — lupa ini = tidak ada data.

### `async` pipe = Langganan di Template
`produk$ | async` otomatis `subscribe` + `unsubscribe`.

---

## Penjelasan untuk Pemula

### Analogi: Kurir Gudang

- **`HttpClient` = kurir**: `get` ambil kardus dari gudang, `post` kirim kardus baru.
- **`subscribe` = tanda terima**: tanpa tanda terima, kurir tidak jalan.

### Langkah 0 — Device

Sudah siap W1: `ng serve` di `4200`, `HttpClient` sudah `provideHttpClient()` di `app.config.ts`.

### Cara Komputer Membaca

1. `http.get("/api/produk").subscribe(data => ...)` → kirim GET → server balas JSON → `data` isi.
2. `http.post("/api/produk", { nama })` → kirim POST + `body` JSON → server simpan.

### 3 Istilah Wajib

1. **HttpClient/get/post**: kurir ambil/kirim
2. **subscribe**: tekan kirim
3. **Observable/async pipe**: aliran + langganan template

---

## Eksperimen

- **Hijau:** `getAll()` tanpa `subscribe` → tidak ada log? Tambah `subscribe`.
- **Kuning:** `post` dengan `nama: "Bayam"` → `subscribe` log `Tambah`?
- **Merah:** `http.get` tanpa `| async` di template → tidak tampil? Tambah `| async`.

---

## Tantangan

**Warung HttpClient Lengkap:** `getAll()` tampil `*ngFor` + `| async`, `tambah("Beras")` + `subscribe` log, `ng serve` cek.

---

## Glosarium Mini

- **HttpClient/get/post/subscribe**: kurir/ambil/kirim/tekan

---

## Ringkasan

Minggu 8 dari 12: **Ambil Stok** — `HttpClient` + `subscribe`. Selesai Menengah Angular! Minggu depan: **RxJS**.
