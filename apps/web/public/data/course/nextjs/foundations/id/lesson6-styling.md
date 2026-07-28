# Styling di Next.js

> Next.js | Foundasi Next.js | Pelajaran 6

## Tujuan Pembelajaran

- Menggunakan Global CSS dan CSS Modules
- Mengintegrasikan Tailwind CSS
- Memahami inline styles
- Mengelola font dengan next/font

---

## Program: Styling di Next.js

```tsx
import styles from './page.module.css';
export default function Home() {
  return (<div><h1 style={{borderBottom:'2px solid #2E5B44',paddingBottom:'.5rem'}}>Inline Styles</h1><div className="card"><h2>Global CSS</h2><p>Styles from globals.css</p><button className="btn">Button</button></div><div className={styles.card}><h2>CSS Module</h2><p>Scoped styles</p></div></div>);
}
```

---

## Penjelasan

## Global CSS
Import di `layout.tsx` atau `app/globals.css`. Berlaku global ke seluruh app. Hanya bisa import di root layout.

## CSS Modules
File `*.module.css` — scoped secara otomatis. Nama class di-hash. Import sebagai objek: `import styles from './page.module.css'`.

## Tailwind CSS
Default di create-next-app. Utility classes untuk rapid styling. Konfigurasi di `tailwind.config.ts`.

## next/font
`import { Inter } from 'next/font/google'` — optimize fonts. Download di build time, self-host, tanpa external request.

---

## Eksperimen

1. **Global CSS**
2. **CSS Modules**
3. **Tailwind CSS**
4. **next/font**

---

## Tantangan

Buat halaman profil dengan kombinasi: Tailwind untuk layout, CSS Module untuk component card, dan global CSS untuk body styling.

---

## Ringkasan

Tiga cara styling: Global CSS, CSS Modules (scoped), Tailwind CSS. next/font untuk font optimal. Pilih sesuai kebutuhan.
