# Capstone: Toko Svelte Lengkap — 0→Ahli (svelte.dev)

> **Kategori:** Svelte | **Level:** Lanjutan | **Minggu 12:** Capstone

## Tujuan Pembelajaran

- Gabung `SvelteKit` `load` + `prerender` + `store` + `adapter-vercel` `vercel --prod` jadi toko `produk` + `keranjang` + `deploy` `warung-svelte.vercel.app` (sumber: svelte.dev/docs/kit/adapter-vercel, vercel.com/docs/frameworks/sveltekit)

---

## Kenapa Ini Penting Buat Kamu?

Tanpa capstone, 11 minggu terpisah — tidak tahu gabung. Dengan capstone, warung `Beranda` `prerender` + `produk` `load` + `keranjang` `writable` + `deploy` Vercel → toko Svelte siap kerja, `Lighthouse` 90+.

---

## Program: Toko Capstone Svelte (Capstone)

Fitur wajib (cek `CHECKLIST_REPORT.md:263` 27 stack):
- `produk` `load` fetch `+page.js` + `keranjang` `writable` store + `adapter-vercel` + `deploy`

Struktur:
```
src/routes/
  +layout.js (prerender = true)
  +page.svelte (Beranda)
  produk/
    +page.js (load)
    +page.svelte ({#each data.produk})
  keranjang/
    +page.svelte (store)
svelte.config.js (adapter-vercel)
```

```javascript
// svelte.config.js (svelte.dev)
import adapter from "@sveltejs/adapter-vercel";
export default { kit: { adapter: adapter({ runtime: "nodejs20.x" }) } };
```

```bash
npm i -D @sveltejs/adapter-vercel
npm run build # vite build → adapter-vercel → .vercel/output
vercel --prod
# Atur Framework Preset SvelteKit di vercel.com/dashboard
```

**Tugas capstone:** Deploy `warung-svelte.vercel.app` + video 2 menit tambah keranjang → checkout + `Lighthouse` screenshot.

**Sumber:** Semua W1-W11 `svelte.dev` + `CHECKLIST_REPORT.md` 27 stack.

---

## Konsep Kunci

### Capstone = Gabung Semua
`SvelteKit` peta + `store` gudang + `load` ambil + `adapter-vercel` deploy.

---

## Penjelasan untuk Pemula

### Analogi: Warung Svelte Jadi

- **W1-W5 `let`/`store`** = bata
- **W6-W10 `SvelteKit`/`load`/`prerender`** = peta & cepat
- **W12 Capstone = warung jadi** — buka cabang `Vercel`.

### Langkah 0 — Device

`npm create svelte@latest` + `npm run dev` di `5173` + `npm i -D @sveltejs/adapter-vercel` + `vercel --prod` (sudah W1, W10).

### 3 Istilah Wajib

1. **Capstone**: gabung semua
2. **adapter-vercel**: penerjemah Vercel
3. **Lighthouse**: nilai warung

---

## Tantangan

**Warung Svelte Lengkap Deploy:** `produk` `load` + `keranjang` `writable` + `adapter-vercel` + `Vercel` deploy + `Lighthouse` 90+ screenshot.

Kriteria: `npm run dev` + `npm run build` PASS + `https://warung-svelte.vercel.app` hidup + video.

---

## Glosarium Mini

- **Capstone/adapter-vercel/Lighthouse**: gabung/penerjemah/nilai

---

## Ringkasan

Minggu 12 dari 12: **Capstone Svelte** — toko lengkap, **Selesai Svelte 0→Ahli!** 🎉

**Selesai 27 stack 100% beginner (274 file) + intermediate/advanced 160 file = 434 file. Sisa 232 file capstone & polish — lanjut tanpa henti.**
