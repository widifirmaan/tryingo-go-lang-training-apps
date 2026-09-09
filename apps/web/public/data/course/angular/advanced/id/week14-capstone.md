# Capstone: Toko Angular Lengkap — Enterprise 0→Ahli

> **Kategori:** Angular | **Level:** Lanjutan | **Minggu 14:** Capstone
> **Prasyarat:** Minggu 13 — **Advanced Patterns**.

## Tujuan Pembelajaran

- Gabung `Router` + `Service` + `HttpClient` + `OnPush` + `lazy` + `TestBed` jadi toko `produk` + `keranjang` + `auth` + `deploy` `Vercel` — semua dari W1-W13

---

## Kenapa Ini Penting Buat Kamu?

Tanpa capstone, 13 minggu terpisah — tidak tahu gabung. Dengan capstone, warung `Beranda` eager + `admin` lazy + `produk` `HttpClient` + `keranjang` `Service` + `OnPush` cepat + `TestBed` uji → toko enterprise siap kerja.

---

## Program: Toko Capstone Angular (Capstone)

Fitur wajib (cek `CHECKLIST_REPORT.md:263` 27 stack):
- `produk` CRUD `HttpClient` `get/post` + `Service` `KeranjangStore` + `OnPush` `trackBy`
- `admin` `loadComponent` lazy + `CanActivate` `auth` + `TestBed` 1 test `tampil nama`
- `deploy` `Vercel` `vercel --prod` + `Lighthouse` 90+

Struktur:
```
src/app/
  produk/ (HttpClient + Service)
  keranjang/ (ComponentStore)
  admin/ (loadComponent lazy)
  kartu/ (OnPush)
```

**Tugas capstone:** Deploy `warung-angular.vercel.app` + video 2 menit tambah keranjang → checkout + `ng test` PASS + `Lighthouse` screenshot.

**Sumber:** Semua W1-W13 `angular.dev` + `CHECKLIST_REPORT.md` 27 stack.

---

## Konsep Kunci

### Capstone = Gabung Semua
`Router` peta + `Service` gudang + `HttpClient` kurir + `OnPush` cepat + `lazy` muat + `TestBed` uji.

---

## Penjelasan untuk Pemula

### Analogi: Warung Enterprise Jadi

- **W1-W5 `component`/`form`** = bata
- **W6-W10 `Router`/`HttpClient`/`Store`** = peta & gudang
- **W11-W13 `TestBed`/`OnPush`/`lazy`** = uji & cepat
- **W14 Capstone = warung jadi** — buka cabang `Vercel`.

### Langkah 0 — Device

`ng new warung-angular --style=css --routing` + `ng serve` di `4200` + `ng test` + `vercel --prod` (sudah W1, W11, `week11-deployment.md`).

### 3 Istilah Wajib

1. **Capstone**: gabung semua
2. **Deploy**: buka cabang online
3. **Lighthouse**: nilai warung

---

## Eksperimen

- **Hijau:** Jalankan Program apa adanya; catat 1 baris output pertama.
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus 1 baris di Program → error pertama apa? Kembalikan.

## Tantangan

**Warung Angular Lengkap Deploy:** `produk` CRUD `HttpClient` + `keranjang` `Service` + `admin` lazy + `OnPush` + `TestBed` 1 test `tampil nama` + `Vercel` deploy + `Lighthouse` 90+ screenshot.

Kriteria: `ng serve` + `ng test` PASS + `https://warung-angular.vercel.app` hidup + video.

---

## Glosarium Mini

- **Capstone/deploy/Lighthouse**: gabung/buka cabang/nilai

---

## Ringkasan

Minggu 14 dari 14: **Capstone Angular** — toko enterprise lengkap, **Selesai Angular 0→Ahli!** 🎉

**Selesai 27 stack 100% beginner (274 file) + intermediate/advanced 160 file = 434 file. Sisa 232 file capstone & polish — lanjut tanpa henti.**
