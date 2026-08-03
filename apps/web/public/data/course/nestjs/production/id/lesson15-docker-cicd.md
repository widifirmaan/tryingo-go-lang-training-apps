# Docker & CI/CD

> NestJS | Produksi & Capstone | Pelajaran 15

## Tujuan Pembelajaran

- Membuat Dockerfile multi-stage untuk image kecil
- Menyusun stack dengan docker-compose (api + db)
- Menulis workflow GitHub Actions (CI)
- Menjelaskan alur: build, test, push image, deploy

---

## Program: Docker & CI/CD

```ts
# Stage 1: build (toolchain lengkap)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: runtime - image minimal tanpa toolchain build
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
EXPOSE 3000
CMD ["node", "dist/main"]
```

---

## Penjelasan

## Multi-stage Build: Image Kecil, Sama Hasilnya
Stage 1 (build): node:20-alpine + toolchain, npm ci, npm run build → dist/. Stage 2 (runtime): node:20-alpine KOSONG, hanya menyalin dist + node_modules produksi. Hasil: image tanpa TypeScript compiler, tanpa source - lebih kecil dan permukaan serangan lebih sempit. Aturan Docker yang sama dari track Docker berlaku: dependency duluan (cache), source belakangan.
## docker-compose: Satu Perintah, Satu Stack
api (build .) + db (postgres:16-alpine) - jaringan otomatis, api memanggil db dengan nama service. depends_on + healthcheck (pg_isready) menjamin database SIAP sebelum api start - bukan sekadar urutan start. Volume db-data membuat data bertahan saat container dihancurkan. Satu docker compose up menjalankan seluruh aplikasi.
## GitHub Actions: Pintu Gerbang Otomatis
Workflow CI: setiap push → checkout → setup-node → npm ci → npm run build → npm test. Build rusak atau test merah = alur BERHENTI di sini, tidak pernah sampai deploy. CI adalah "reviewer tak kenal lelah": ia menjalankan hal yang sama persis di tiap push, tanpa lupa dan tanpa lelah.
## Dari CI ke Produksi
Pola lengkap: CI (build + test) → build image Docker → push ke registry (Docker Hub/GHCR) → deploy ke platform (Render/Railway/Fly/ECS) dengan image itu. Kode yang SAMA diuji di CI dan dijalankan di produksi - tidak ada lagi "di laptop saya jalan". Ini juga alur standar track Node.js; Nest menambahkan langkah nest build.

---

## Eksperimen

1. **Multi-stage Build: Image Kecil, Sama Hasilnya**
2. **docker-compose: Satu Perintah, Satu Stack**
3. **GitHub Actions: Pintu Gerbang Otomatis**
4. **Dari CI ke Produksi**

---

## Tantangan

Perkuat pipeline: (1) tambah stage deploy di workflow: push image ke GHCR (actions: docker/build-push-action) jika branch main, (2) tambah cache npm (actions/cache) agar npm ci lebih cepat, (3) ubah healthcheck API di compose: wget ke /api/health dengan retry, (4) tuliskan alur rilis Anda: commit → CI → image → deploy, dan identifikasi di langkah mana kegagalan paling sering terjadi.

---

## Ringkasan

Multi-stage = image kecil. Compose = stack satu perintah. CI = pintu gerbang otomatis. Image yang sama ke produksi. Lanjut: capstone.
