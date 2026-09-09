# Capstone: Enterprise API — Warung NestJS Grand Opening

> **Kategori:** NestJS | **Level:** Lanjutan | **Minggu 12:** Capstone: Enterprise API
> **Prasyarat:** Minggu 11 — **Microservices**.

## Tujuan Pembelajaran

- Gabung W1-W11: `module` + `auth` + `TypeORM` + `WebSocket` + `test` + `Docker` jadi toko beneran (bukan `console.log`!)

---

## Kenapa Ini Penting Buat Kamu?

11 minggu terpisah — capstone buktikan gabung: daftar → login → pesan → live → teruji → deploy. Portfolio "NestJS production-ready".

---

## Program: Toko Grand Opening (Checklist)

```bash
nest new warung
npm install @nestjs/typeorm typeorm pg @nestjs/jwt @nestjs/websockets
```

Fitur wajib (cek 1 per 1):
- [ ] `ProdukModule` CRUD + `ValidationPipe` + `Postgres` (W2-W4)
- [ ] `login` JWT + `@UseGuards` untuk `POST/DELETE` (W6)
- [ ] `Gateway` siar `stok-habis` (W10)
- [ ] 3 test HIJAU (`npm test`) (W9)
- [ ] `Dockerfile` + `docker build` + `docker run` (W4-Docker)

```bash
npm test          # HIJAU?
npm run build && npm run start:prod  # jalan?
curl localhost:3000/produk  # JSON?
```

**Tugas capstone:** Repo + test hijau + URL publik (`Railway`) + video 1 menit (daftar → login → tambah → live). **Selesai NestJS 0→Ahli!** 🎉

---

## Konsep Kunci

### Capstone = Gabung 11 Minggu
Module + auth + DB + live + test + deploy = toko.

---

## Eksperimen

- **Hijau:** Jalankan Program apa adanya; catat 1 baris output pertama.
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus 1 baris di Program → error pertama apa? Kembalikan.

## Tantangan

**Grand Opening:** Semua checklist + URL + video. **Selesai NestJS 0→Ahli!** 🎉

---

## Glosarium Mini

- **Capstone/deploy**: gabung/buka

---

## Ringkasan

Minggu 12 dari 12: **Grand Opening** (Level: Lanjutan). **Selesai NestJS 0→Ahli dari nol!** 🎉
