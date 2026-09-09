# TypeScript Config — Buku Aturan Warung (typescriptlang.org)

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 8:** TypeScript Config

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

## Tantangan

**Warung Aturan Lengkap:** `strict: true` + `noImplicitAny` error `function hitung(a,b)` tanpa tipe → tambah `: number`.

---

## Glosarium Mini

- **tsconfig/strict/target**: buku/satpam/target

---

## Ringkasan

Minggu 8 dari 12: **Buku Aturan** — `tsconfig` + `strict`. Minggu depan: **Testing TypeScript**.
