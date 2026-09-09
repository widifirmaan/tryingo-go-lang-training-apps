# TypeScript Config — Buku Aturan Warung (typescriptlang.org)

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 8:** TypeScript Config
> **Prasyarat:** Minggu 7 — **Utility Types**.

## Tujuan Pembelajaran

- `tsconfig.json` buku aturan: `strict: true` satpam ketat, `target: "ES2020"`, `module: "ESNext"` (sumber: typescriptlang.org/tsconfig)

---

## Kenapa Ini Penting Buat Kamu?

Tanpa `strict: true`, `nama: string | null` lolos `null` → error di `nama.length`. Dengan `strict`, merah sebelum run.

---

## Program: Buku Aturan Warung (typescriptlang.org)

```json
// tsconfig.json — buku aturan (typescriptlang.org)
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true, // satpam ketat: null, any, this semua dicek
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

```bash
npx tsc --init # buat tsconfig.json
npx tsc --noEmit # cek tanpa buat js
```

```ts
// tsconfig strict: null TAK bisa masuk string (buka komentar baris X -> error TS2322 di editor/CI)
function sapa(nama: string): string {
  return `Halo ${nama}`;
}
const user: string | null = null;
// const salah: string = user;
console.log(sapa("Budi"));
```

**Sumber:** `typescriptlang.org/tsconfig` — `strict` = 7 cek ketat.

---

## Konsep Kunci

### `strict: true` = Satpam Ketat
Aktifkan 7 cek: `strictNullChecks`, `noImplicitAny`, dll. Tanpa `strict`, `null` lolos.

### `target`/`module`
`target: ES2020` → `let/const` tetap, `module: ESNext` → `import`.

---

## Penjelasan untuk Pemula

### Analogi: Buku Aturan Warung

- **`tsconfig.json` = buku SOP**: `strict: true` SOP ketat, `target` bahasa.

### Langkah 0 — Device

`npx tsc --init` di root, `npx tsc --noEmit` cek.

### 3 Istilah Wajib

1. **tsconfig/strict**: buku aturan/satpam

---

## Eksperimen

- **Hijau:** Jalankan Program apa adanya; catat 1 baris output pertama.
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus 1 baris di Program → error pertama apa? Kembalikan.

## Tantangan

**Warung Aturan Lengkap:** `strict: true` + `noImplicitAny` error `function hitung(a,b)` tanpa tipe → tambah `: number`.
- **Sambungan (Minggu 7 — Utility Types):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **tsconfig/strict/target**: buku/satpam/target

---

## Ringkasan

Minggu 8 dari 12: **Buku Aturan** — `tsconfig` + `strict`. Minggu depan: **Testing TypeScript**.
