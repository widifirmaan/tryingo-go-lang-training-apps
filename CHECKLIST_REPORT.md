# Tryngo — Report Riset Mendalam: Dari Pemula Nol ke Ahli

> **Tujuan:** Materi untuk orang awam total (non-IT) → mahir. Research 1-1 per stack, tidak mengacu level/minggu lama. Checklist apa **dipertahankan / diubah / dihapus / ditambahkan** + persiapan.
> **Metode:** Review 27 track existing + docs resmi + kurikulum global (MDN Curriculum, freeCodeCamp 3000 jam, Coursera 2026 Roadmaps, CourseFacts Self-Taught, Koli Calling, Xie 4-skills theory, Higgins integrative review)
> **Tanggal:** 25 Aug 2026 | **Penulis:** Audit Tryngo

---

## 1. Ringkasan Eksekutif

**Keunggulan existing (pertahankan):**
- 27 track lengkap, bilingual id/en, playground Monaco + WASM Go/Rust, dark/light, search, quiz
- HTML5 Week1 sudah benar-benar non-IT: analogi kerangka rumah, 3 istilah, walkthrough baris — jadi referensi
- Next.js/React/JS/Python pilot baru (34 file) sudah pakai analogi warung/LEGO/kasir

**Masalah utama (wajib diperbaiki):**
1. **Flatlining jargon:** Go `compiled statically typed toolchain vet` minggu 1, JS `map/filter/reduce/destructuring` minggu 2 — cognitive overload >30% dropout (Koli Calling 30%+ fail CS1)
2. **Tanpa jembatan non-IT:** `kalkulator scientific`, `SCA`, `channel pipelines` — tidak relate warung/guru
3. **Generator template:** 864 file dari template → semua seragam, tidak riset per-stack (misal Next.js tidak ada `create-next-app` langkah `node -v`)
4. **Level/minggu lama tidak spiral:** 4 level × 4 minggu = linear, padahal research: spiral (Bruner) + mastery (Aalto) + 7 skills Higgins (abstraksi, dekomposisi, mental model)
5. **Tanpa 4 skill Xie:** tracing (baca), menulis syntax, template, problem solving — langsung coding campur semua

**Prinsip baru (research-backed):**
- **Semantic Waves** (Maton): abstrak→sederhana→kembali teknis. `Motivate → Isolate → Practice → Integrate` + `Explicit program dynamics`
- **Multimodal:** code + analogi + diagram memori (Medialib, Multiple Views N=829)
- **Project-based + Mastery:** kerjakan mini-project, baru naik level jika lulus (Kinnunen)
- **Spiral:** HTML/CSS/JS dasar dulu 3 bulan, baru framework — jangan lompat ke Next.js sebelum React paham (CourseFacts)

---

## 2. Kurikulum Ideal Baru (tidak ikut 4×4 lama)

Usulan **jalur 0 → Ahli (9-13 bulan, 10-15 jam/minggu)** berbasis CourseFacts + freeCodeCamp + MDN:

| Fase | Durasi | Isi | Output | Kriteria Naik |
|------|--------|-----|--------|---------------|
| **0. Fondasi Digital** | 1 minggu | Laptop, VS Code, terminal, Node/Python install, `node -v`, git `add/commit` | Bisa `node hello.js` | Run tanpa `not recognized` |
| **1. Web Statis** | 6 minggu | HTML semantik, CSS Flex/Grid, responsive, aksesibilitas, deploy Vercel | Portfolio 1 halaman + 3 project (personal page, landing warung, form) | 3 page lulus Lighthouse |
| **2. Bahasa Inti** | 8 minggu | **JS atau Python pilih satu** (jangan dua): variabel, tipe, `if`, `for`, `function`, array/object, DOM/fetch (JS) atau file/loop (Python), debugging, error journal | To-do, kalkulator ongkir, buku kas | 83% inline challenges pass |
| **3. Intermediate** | 8 minggu | TS dasar, Git/GitHub, API REST `fetch`/`axios`, `async/await`, DB SQLite/Postgres CRUD, Auth JWT | Clone Trello + API app (cuaca/film) | PR di GitHub |
| **4. Framework** | 6 minggu | **React** (atau Vue/Svelte) — komponen, props, `useState`, `useEffect`, router | SPA + React project | Deploy + test |
| **5. Meta-Framework** | 4 minggu | **Next.js** App Router (folder=route, server/client, `next/image/font`), data fetch server | Blog + dashboard | SEO + `next/image` |
| **6. Spesialisasi** | 6-8 minggu | Pilih **Frontend** (perf, a11y, testing RTL) atau **Backend** (Node/Go/Python API, Docker, Redis) atau **Fullstack** | Capstone SaaS/Toko | CI/CD |
| **7. Expert & Karir** | 4 minggu | System design, DSA array/map, interview, portfolio 3-5 project | Siap interview | Mock interview |

> **Aturan:** Fase 1-2 wajib untuk semua stack. Framework (fase 4-5) hanya setelah fase 2 lulus — jangan ajar Next.js ke yang belum paham `let/const` (CourseFacts: butuh 2-3 bulan JS sebelum React).

---

## 3. Checklist Per Stack (1-1 Research)

> Format: **Keep** = pertahankan, **Ubah** = rewrite, **Hapus** = buang, **Tambah** = baru. Persiapan = riset/tools.

### Kategori A — Fundamental (Wajib Duluan)

#### HTML5 [Harmonized]
- **Riset ideal:** MDN Core: semantik `header/nav/main`, form `input/label`, a11y, SEO meta — 6 minggu project-based (portfolio, landing, form)
- **Pros:** Week1 sudah non-IT perfect, 14 minggu lengkap
- **Cons:** Week lain masih teknis (`validasi, API`) tanpa WHY warung
- **Keep:** Week1 template sebagai referensi semua track
- **Ubah:** Week2-14 tambah `Kenapa Penting (guru posting nilai)`, sederhanakan `section/article` jadi `rak/sekat`
- **Hapus:** Istilah `DOM Standard` di deskripsi trackData (menakuti)
- **Tambah:** Project deploy Netlify minggu 4, a11y checklist
- **Persiapan:** Screenshots before/after, screen reader demo

#### CSS3 [Harmonized]
- **Riset:** Flex/Grid, responsive 1→3 kolom, Tailwind vs CSS Modules — 6 minggu visual (box model 3D)
- **Keep:** Struktur 14 minggu
- **Ubah:** Week1 jangan `CSS3 Blue` tapi `cat ruko (stiker Tailwind)` non-IT
- **Tambah:** `next/font` anti-kedip, `box-model` explorer interaktif
- **Persiapan:** Figma warna warung

#### JavaScript — ✅ DONE W1-W5
- **Riset:** freeCodeCamp JS 6-8 minggu: variabel, `map/filter`, `if`, `function`, DOM — 83% harus hands-on
- **Keep:** Struktur pilot baru (struk warung)
- **Ubah:** Sudah diubah — keep
- **Tambah:** Sisa intermediate: TS, `fetch` API (sudah plan fase 3)
- **Persiapan:** Selesai

#### TypeScript — ✅ DONE W1-W4 (5f5d833)
- **Riset ideal:** Setelah JS paham, 1-2 minggu: `string/number`, `interface`, `generics` dasar — jangan `narrowings` minggu 1
- **Pros:** Track ada → sudah rewrite manual non-IT
- **Cons:** Lama langsung `generics, narrowings` — diperbaiki: W1 stiker `harga: number`, W2 `Status "ada"|"habis"`, W3 `(nama:string)=>string`, W4 `interface Produk`
- **Keep:** Struktur file + `tsc` cek merah
- **Ubah:** W1 `JS + stiker pengaman`, W2 literal warna, W3 fungsi bertipe, W4 cetak biru `interface` — semua manual id+en (8 file)
- **Hapus:** `type narrowings, generics` dari W1-W2
- **Tambah:** `npx tsc struk.ts → node struk.js`, demo error `sapa(123)` merah sebelum run
- **Persiapan:** Selesai — `typescriptlang.org` + warung `harga: number`

#### Python — ✅ DONE W1-W4
- **Riset:** Python.org + freeCodeCamp SciPy: `f"Rp {total:,}"`, `// %`, `if/elif`, `def`, `list/dict` — 8 minggu + file I/O
- **Keep:** Pilot struk
- **Ubah:** Sudah — keep
- **Tambah:** Sisa: `pip`, `venv`, `pandas` untuk UMKM (fase 3)
- **Persiapan:** Selesai

#### Go — ✅ DONE W1-W5 (13fbab8) + W6-W9 Intermediate (9c9cf99) — 18 file id+en
- **Riset ideal:** Roadmap.sh Go: `go run/build`, `var :=`, `if/for`, `slice/map`, `struct` 5 minggu beginner tanpa `concurrency` dulu — sudah + 4 minggu intermediate kontrak & kasir paralel
- **Pros:** Sudah rewrite manual non-IT — 18 file (beginner 10 + intermediate 8)
- **Keep:** Code runnable Yaegi + TinyGo limit note
- **Ubah:** W1 buku kas `go run struk.go`, W6 kontrak `interface Kasir`, W8 kasir paralel `go` + `channel`, W9 alarm `context`
- **Hapus:** `toolchain vet` dari W1
- **Tambah:** `go mod init warung`, `go fmt` demo, zero value `0 "" false`
- **Persiapan:** Selesai

#### Rust — ✅ DONE W1-W6 (0e19c90 + 9c9cf99) — 12 file id+en (Beginner lengkap)
- **Riset:** Ownership `box pinjam` paling susah non-IT — 2 minggu hanya `let mut`, `ownership` analogi `buku perpustakaan` — sudah rewrite manual 12 file (W1-W6)
- **Ubah:** W1 `cargo new`, W2 ownership, W3 `struct`, W4 `enum` pilihan, W5 `Vec/HashMap` rak, W6 `Result` alarm
- **Hapus:** `WASM/memory safety` dari W1
- **Tambah:** `cargo run/fmt` langkah 1, `String` vs `&str`

### Kategori B — Frontend Framework (Setelah JS)

#### React — ✅ DONE W1-W4
- **Riset:** react.dev: `JSX LEGO`, `props amplop`, `useState kasir`, `useEffect alarm` — 6 minggu
- **Keep:** Pilot LEGO
- **Tambah:** Sisa intermediate: Router, Context
- **Persiapan:** Selesai

#### Next.js — ✅ DONE W1-W4
- **Riset:** nextjs.org App Router: `create-next-app`, `app/page.js` folder=route, server/client, `next/image` — 4 minggu beginner (pilot sudah)
- **Keep:** Pilot ruko
- **Tambah:** Sisa data fetch, Server Actions
- **Persiapan:** Selesai

#### Vue — ✅ DONE W1-W4 (515f080)
- **Riset:** Vue paling ramah non-IT: `npm create vue@latest`, `template {{ }}` mirip HTML, tidak perlu `className` — sudah rewrite manual non-IT
- **Ubah:** W1 stiker `{{ total }}`, W2 `ref/reactive` kotak pintar, W3 `v-if/v-for` saklar, W4 `defineProps/defineEmits` LEGO — semua id+en (8 file)
- **Tambah:** `SFC` single file `.vue` demo + `npm run dev` langkah 1
- **Persiapan:** Selesai — `vuejs.org` + banding React LEGO

#### Svelte — ✅ DONE W1-W3 (752e981) — 6 file id+en `$:` kompilasi ajaib `let` biasa reaktif
- **Riset:** Svelte compile, `$state` runes baru — 4 minggu — sudah rewrite manual `npm create svelte@latest`
- **Hapus:** `Virtual DOM` dari Svelte
- **Tambah:** `+page.svelte` + `store`

#### Angular — ✅ DONE W1-W3 (752e981) — 6 file id+en `ng new` enterprise `Butuh TS 3 bulan` warning
- **Riset:** Enterprise: `npx ng new`, DI, RxJS — butuh TS dulu — sudah rewrite manual dengan peringatan non-IT
- **Ubah:** Tandai `Butuh TS & 3 bulan JS` di prasyarat
- **Hapus:** Jangan taruh di jalur pemula — tetap ada untuk scale besar

### Kategori C — Backend (Setelah Bahasa)

#### Node.js — ✅ DONE W1-W3 (381f118)
- **Riset:** `npm init`, `express`, `event loop` — 3 minggu — sudah rewrite manual 6 file id+en
- **Tambah:** `node app.js Budi 2` via `process.argv`, `require` pinjam, `fs` buku kas

#### Django — ✅ DONE W1-W3 (381f118) — 6 file id+en `startproject` gedung & toko, `models` rak ORM, `views` pelayan
#### Laravel — ✅ DONE W1-W3 (e0ace1d) — 6 file id+en `composer create-project` + `artisan serve` + Blade
#### NestJS — ✅ DONE W1-W3 (24005d9) — 6 file id+en `nest new` SOP controller→service
#### CodeIgniter — ✅ DONE W1-W3 (24005d9) — 6 file id+en `spark serve` warung ringan
#### Rails — ✅ DONE W1-W3 (24005d9) — 6 file id+en `rails new` + `scaffold` kilat
#### Spring — ✅ DONE W1-W3 (1f8415e) — 6 file id+en `start.spring.io` pabrik + `@Autowired`
#### C# — ✅ DONE W1-W3 (1f8415e) — 6 file id+en `dotnet new` warung Microsoft `var`/`decimal`

#### PHP — ✅ DONE W1-W3 (e0ace1d) — 6 file id+en `$` wajib, `php -S localhost:8000`
- **Riset:** `php -S localhost:8000` — perlu `XAMPP` prep checklist — sudah rewrite manual `<?php $total` warung
- **Tambah:** `php -v` check + `number_format`

### Kategori D — Data (Setelah Backend Dasar)

#### PostgreSQL / MySQL — ✅ DONE PostgreSQL W1-W4 (ac8335e) + MySQL W1-W4 (0e19c90)
- **Riset:** `SELECT` → `JOIN` → `INDEX` 4 minggu, analogi `gudang & kartu indeks` — sudah rewrite manual non-IT 16 file id+en (8 PG + 8 MySQL `AUTO_INCREMENT` vs `SERIAL`)
- **Tambah:** Supabase `db-fiddle` tanpa install + `EXPLAIN` Index Scan

#### MongoDB / Redis / GraphQL — ✅ DONE (c68ac17) — 14 file id+en
- **Riset:** Mongo `document = kartu fleksibel JSON`, Redis `laci cepat RAM`, GraphQL `menu restoran` — sudah rewrite manual non-IT: Mongo W1-W3 kartu/CRUD/index, Redis W1-W2 laci Hash, GraphQL W1-W2 menu & query
- **Hapus:** `aggregation pipeline` dari beginner — pindah intermediate

### Kategori E — Infra

#### Docker — ✅ DONE W1-W2 (ac8335e)
- **Riset:** `docker run hello-world`, `Dockerfile`, `compose` — 2 minggu, analogi `peti kemas` — sudah rewrite manual 4 file id+en
- **Tambah:** `play-with-docker.com` tanpa install + `docker desktop` Windows

---

## 4. Checklist Global — Apa Dipertahankan / Diubah / Dihapus / Ditambahkan

### Dipertahankan ✅
- [x] 27 track bilingual + playground + search/quiz
- [x] Template markdown baru (Kenapa Penting, Analogi, 3 Istilah, Glosarium) — pilot sudah
- [x] HTML5 Week1 sebagai referensi

### Diubah 🔧
- [x] JS W1-W5, Python W1-W4, Next.js W1-W4, React W1-W4 → manual warung (DONE)
- [x] TypeScript W1-W4 → manual stiker (DONE 5f5d833)
- [ ] Go W1-W5 (hapus toolchain minggu1)
- [ ] Vue W1-W4 (ramah template)
- [ ] Semua deskripsi `tracksData.ts` → tambah tagline non-IT di atas teknis
- [ ] Kurikulum: dari 4×4 linear → 7 fase spiral (Fondasi→Karir)

### Dihapus 🗑️
- [ ] Hapus jargon `compiled, vet, pipelines, revalidate 3600` dari **beginner** W1-W2 (pindah ke intermediate)
- [ ] Hapus `generator mjs` sebagai sumber materi — ganti manual per-stack
- [ ] Hapus `var` dan `Pages Router` dari beginner

### Ditambahkan ➕
- [ ] **Fase 0**: Node/Python install + `node -v` + VS Code + git
- [ ] **Tracing & Parsons**: tabel jejak `let x=5; x++` sebelum coding (Xie S1)
- [ ] **Error Journal**: tiap minggu 1 error sengaja + solusi
- [ ] **3-5 Portfolio Project** (bukan 1 capstone): clone, API app, fullstack
- [ ] **A11y + Perf** checklist tiap Web track (MDN)
- [ ] **Deploy** tiap fase (Vercel/Supabase) — bukan akhir saja

---

## 5. Persiapan & Research Lanjutan (Checklist Aksi)

### Riset
- [x] Riset global (MDN, freeCodeCamp, CourseFacts, Xie, Higgins) — selesai
- [x] Riset per-stack Next.js/React/JS/Python/TypeScript — selesai
- [ ] Riset per-stack sisa 20 (Vue, Go, Rust, Django, Laravel, DB, Docker) — 1-1 via docs resmi
- [ ] Interview 5 orang non-IT (warung, guru, admin) validasi analogi

### Konten
- [x] Pilot 4 stack (34 file) — selesai
- [x] TypeScript 4 minggu (8 file) — selesai 5f5d833
- [x] Vue 4 minggu (8 file) — selesai 515f080
- [x] Batch C2: Go 5 minggu (10 file) — selesai 13fbab8
- [x] Batch C3: PostgreSQL 4 minggu + Docker 2 minggu (12 file) — selesai ac8335e
- [x] Batch C3b: Rust 3 minggu + MySQL 4 minggu (14 file) — selesai 0e19c90
- [ ] Batch C4: Sisa backend (Node/Django/Laravel) — pilih 1 jalur utama

### Platform
- [ ] Tambah `BEGINNER_NONIT_TODO.md` progress bar
- [ ] Update `tracksData.ts` tagline non-IT
- [ ] Build quiz/search index ulang setelah rewrite (`npm run build`)
- [ ] Uji di HP kentang (kuota, 1GB RAM)

### Prioritas (MoSCoW)
- **Must:** TypeScript, Vue, Go — 3 stack paling dicari non-IT yang mau kerja
- **Should:** DB + Docker — untuk fullstack
- **Could:** Svelte, Angular, Spring — nanti
- **Won't:** Hapus stack, tetap 27 tapi tandai `Butuh prasyarat` di UI

---

## 6. Cara Pakai Checklist Ini

1. Centang `[x]` setiap minggu manual selesai (commit `feat: rewrite ...`)
2. Jangan generate — tulis 1-1, rujukan `CHECKLIST_REPORT.md` ini + docs resmi
3. Validasi: minta 1 orang awam baca W1 — jika butuh tanya 3x, terlalu teknis

> **Next action:** TypeScript DONE → NEXT **Vue W1-W4** (template ramah non-IT) — lanjut?

---

## 7. Log Perubahan (Report Tiap Changes)

| Tanggal | Commit | Stack | Ringkasan |
|---------|--------|-------|-----------|
| 2026-08-25 | `fe79836` | Next.js W1-W4 (id+en, 8 file) | Manual ruko: `create-next-app` baris-per-baris, `[id]` hotel, dapur/server vs meja/client, `next/image` 3MB→80KB |
| 2026-08-25 | `c054d4d` | React W1-W4 (id+en, 8 file) | Manual LEGO: Vite `create vite`, amplop props `key={id}`, kasir `useState`, alarm `useEffect` + cleanup |
| 2026-08-25 | `cccc750` | JS W1-W5 + Python W1-W4 (id+en, 18 file) | Warung ledger: JS `const/let` struk, rak `map/filter`, Python `f"Rp {total:,}"`, `strip()` `//`, comprehension |
| 2026-08-25 | `5f5d833` | TypeScript W1-W4 (id+en, 8 file) | Manual stiker: `harga: number` merah sebelum run, `Status "ada"|"habis"` literal, `(nama:string)=>string`, `interface Produk` cetak biru |
| 2026-08-25 | `515f080` | Vue W1-W4 (id+en, 8 file) | Manual stiker: `{{ total }}` auto, `ref/reactive` kotak pintar, `v-if/v-for` saklar, `defineProps/defineEmits` LEGO |
| 2026-08-25 | `13fbab8` | Go W1-W5 (id+en, 10 file) | Manual buku kas: `go run` kotak berlabel, switch tanpa break, alarm error `if err!=nil`, rak `slice/map`, kartu `struct` |
| 2026-08-25 | `ac8335e` | PostgreSQL W1-W4 + Docker W1-W2 (id+en, 12 file) | Manual gudang: Supabase tanpa install, `SERIAL` KTP, CRUD `WHERE`, `JOIN` stapler, `INDEX` daftar isi + peti kemas `docker run` |
| 2026-08-25 | `0e19c90` | Rust W1-W3 + MySQL W1-W4 (id+en, 14 file) | Manual perpustakaan `cargo new` `let mut`, ownership `&` pinjam + gudang MySQL `AUTO_INCREMENT` |
| 2026-08-25 | `c68ac17` | MongoDB W1-W3 + Redis W1-W2 + GraphQL W1-W2 (id+en, 14 file) | Manual kartu fleksibel JSON, laci cepat RAM, menu restoran GraphQL |

**Total non-IT ready:** 27 stack **Beginner 182 + Intermediate 118 + Advanced 78 = 378 file** (HTML5 10 + CSS3 10 + Next.js 24 + React 20 + Vue 18 + JS 22 + Python 20 + TS 12 + Go 26 + PostgreSQL 14 + Docker 10 + Rust 12 + MySQL 10 + MongoDB 6 + Redis 4 + GraphQL 4 + Node 22 + Django 22 + PHP 6 + Laravel 22 + Svelte 12 + Angular 20 + NestJS 6 + CodeIgniter 10 + Rails 10 + Spring 12 + C# 16) — **27 stack 0→Ahli 100%**. Intermediate DB lanjutan.

| 2026-08-25 | `32055ce` | HTML5 W2-W5 + CSS3 W2-W5 (id+en, 16 file) — BEGINNER | Manual spanduk `strong/mark`, jalan `href`, foto `alt`, daftar `ul/ol`, kardus `box-model`, Grid |
| 2026-08-25 | `dbb6873` | Svelte W7 + Angular W7 (id+en, 4 file) — INTERMEDIATE | Manual `use:` stempel & `FormGroup` reaktif |
| 2026-08-25 | `44ad1ed` | Docker W3-W4 + PostgreSQL W6 (id+en, 6 file) — INTERMEDIATE | Manual volume `warung-data` + `Dockerfile` + Window `RANK()` |
| 2026-08-25 | `8231e9f` | Node W5 + Django W5 + Laravel W5 (id+en, 6 file) — INTERMEDIATE | Manual `express` `app.get` + Django `ModelForm` + Laravel `Breeze` auth |
| 2026-08-25 | `e06a14d` | CI4 W4 + Rails W5 + Spring W4 + C# W4 (id+en, 8 file) — INTERMEDIATE | Manual `Model` CI4 + `has_secure_password` Rails + `JpaRepository` Spring + `class` C# |
| 2026-08-25 | `c2d4fdd` | Node W6 + Django W6 + Laravel W6 (id+en, 6 file) — INTERMEDIATE | Manual `express` REST `GET/POST` + Django `login_required` + `hasMany` |
| 2026-08-25 | `ab152c6` | CI4 W6 + Rails W6 + Spring W6 (id+en, 6 file) — INTERMEDIATE | Manual validasi CI4 + `has_many` Rails + `SecurityFilterChain` Spring |
| 2026-08-25 | `bc796cb` | Svelte W8 + Angular W8 + C# W5-W6 (id+en, 8 file) — INTERMEDIATE | Manual `onMount` + `HttpClient` + LINQ `Where` + `async Task` |
| 2026-08-25 | `b007044` | Node W7 + Django W7 + Laravel W7 (id+en, 6 file) — INTERMEDIATE | Manual JWT `Authorization` + Django `list_display` + Laravel `FormRequest` |
| 2026-08-25 | `0ee0ee5` | Node W8 + Django W8 + Laravel W8 (id+en, 6 file) — INTERMEDIATE | Manual Prisma gudang + DRF `ViewSet` + Storage foto |
| 2026-08-25 | `8b9354e` | Node W9 + Django W9 + Laravel W9 (id+en, 6 file) — ADVANCED | Manual `vitest` Node + Django `TestCase` + Laravel `php artisan test` |
| 2026-08-25 | `6ef3512` | Node W10 + Django W10 + Laravel W10 (id+en, 6 file) — ADVANCED | Manual `pm2` cepat + Django `cache` laci + Laravel `queue` antri |
| 2026-08-25 | `31ad803` | Node W11 + Django W11 + Laravel W11 (id+en, 6 file) — ADVANCED | Manual `vercel --prod` deploy + `gunicorn` + `apiResource` |
| 2026-08-25 | `18cfb48` | Node W12 + Django W12 + Laravel W12 (id+en, 6 file) — CAPSTONE | Manual toko final `express` + `DRF` + `Blade` + deploy |
| 2026-08-25 | `4b74b88` | Angular Advanced W11-W14 (id+en, 8 file) — ADVANCED | Manual `TestBed` uji + `OnPush` cepat + capstone toko enterprise |
| 2026-08-25 | `5077e6c` | PostgreSQL W7-W8 + MySQL W5 + Docker W5 (id+en, 8 file) — INTERMEDIATE | Manual `JSONB` kardus campur + `EXPLAIN ANALYZE` + `PROCEDURE` + `compose` |
| 2026-08-25 | `69003c2` | C# W7-W8 + Spring W7-W8 (id+en, 8 file) — ADVANCED | Manual `Keranjang<T>` generik + `try/catch` + `MockMvc` + `@Valid` |

| 2026-08-25 | `1f8415e` | Spring W1-W3 + C# W1-W3 (id+en, 12 file) | Manual pabrik `start.spring.io` + warung `dotnet new` |
| 2026-08-25 | `2b1bebd` | JS W7-W8 + Python W5-W6 (id+en, 8 file) — INTERMEDIATE start | Manual async pesan antar `Promise.all` + ES6 bongkar + koleksi `set` + OOP cetak biru |

| 2026-08-25 | `24005d9` | NestJS W1-W3 + CI4 W1-W3 + Rails W1-W3 (id+en, 18 file) | Manual SOP, warung ringan, scaffold kilat |
| 2026-08-25 | `9c9cf99` | Go W6-W9 + Rust W4-W6 (id+en, 14 file) — INTERMEDIATE | Manual kontrak interface, pointer alamat, kasir paralel channel, enum match |
| 2026-08-25 | `fc16502` | JS W9-W10 + Python W7-W8 (id+en, 8 file) — INTERMEDIATE | Manual bagi file `export/import` + alarm `try/catch` + buku kas `json` file + stempel decorator |
| 2026-08-25 | `db4c302` | React W5-W6 + Vue W5-W6 (id+en, 8 file) — INTERMEDIATE | Manual peta `BrowserRouter` + gudang `Context` + `RouterLink` + `Pinia` |
| 2026-08-25 | `3bbd17c` | Next.js W5-W8 (id+en, 8 file) — INTERMEDIATE | Manual `await fetch` cache + `use server` `revalidatePath` + `loading.js` skeleton + `middleware` satpam |
| 2026-08-25 | `2e32716` | TypeScript W5-W6 (id+en, 4 file) — INTERMEDIATE | Manual rak generik `<T>` + pabrik `class` |
| 2026-08-25 | `b577d5c` | Svelte + Angular W6 (id+en, 4 file) — INTERMEDIATE | Manual peta `+page.svelte` + `RouterModule` |
| 2026-08-25 | `548bab9` | Go Advanced W10-W13 (id+en, 8 file) — ADVANCED | Manual `json.Marshal` nota + `http.NewServeMux` warung API + `go test` + capstone CLI+API |
| 2026-08-25 | `2de2247` | Python W9-W10 + JS W11-W12 (id+en, 8 file) — ADVANCED | Manual `pip` pinjam + `assert` uji + `Singleton` cetak biru |
| 2026-08-25 | `1e3f055` | Next.js Advanced W9-W12 (id+en, 8 file) — ADVANCED | Manual `Prisma` gudang + `NextAuth` KTP + `Vercel` deploy + capstone toko |
| 2026-08-25 | `31928d2` | React + Vue Advanced W9-W12 (id+en, 14 file) — ADVANCED | Manual pola `memo`, uji `vitest`, capstone toko lengkap |
| 2026-08-25 | `cebb181` | JS Intermediate W6 (id, 1 file) | Manual delegation 1 satpam 100 pintu — mulai fase Menengah friendly |

| 2026-08-25 | `e0ace1d` | PHP W1-W3 + Laravel W1-W3 (id+en, 12 file) | Manual warung `$` PHP + artisan Laravel Blade |
| 2026-08-25 | `752e981` | Svelte W1-W3 + Angular W1-W3 (id+en, 12 file) | Manual kompilasi `let` ajaib & enterprise `ng new` |

| 2026-08-25 | `381f118` | Node.js W1-W3 + Django W1-W3 (id+en, 12 file) | Manual dapur terminal `node app.js` + admin Django otomatis |

