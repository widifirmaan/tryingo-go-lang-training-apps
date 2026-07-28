# Apa itu Next.js?

> Next.js | Foundasi Next.js | Pelajaran 1

## Tujuan Pembelajaran

- Memahami peran Next.js sebagai React framework
- Mengenal App Router dan Pages Router
- Membuat project Next.js baru
- Memahami struktur folder project

---

## Program: Apa itu Next.js?

```tsx
export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>This is a React framework for production.</p>
      <p>Edit <code>app/page.tsx</code> to see changes.</p>
    </div>
  );
}
```

---

## Penjelasan

## App Router vs Pages Router
App Router (direktori `app/`) adalah standar baru sejak Next.js 13. Pages Router (`pages/`) adalah legacy. Selalu gunakan App Router untuk project baru.

## create-next-app
Jalankan `npx create-next-app@latest my-app --typescript --app` untuk membuat project baru. Pilih TypeScript, App Router, Tailwind CSS jika ditawarkan.

## Struktur Folder
`app/layout.tsx` = layout root. `app/page.tsx` = halaman home. `public/` = file statis. `next.config.ts` = konfigurasi.

---

## Eksperimen

1. **App Router vs Pages Router**
2. **create-next-app**
3. **Struktur Folder**

---

## Tantangan

Buat project Next.js baru dengan App Router. Eksplorasi file layout.tsx dan page.tsx. Coba tambahkan halaman `/about` dengan membuat `app/about/page.tsx`.

---

## Ringkasan

Next.js adalah React framework untuk production. App Router adalah standar baru dengan file-based routing. Lanjut: Routing & Layout.
