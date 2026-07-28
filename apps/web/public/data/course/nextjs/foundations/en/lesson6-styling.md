# Styling in Next.js

> Next.js | Next.js Foundations | Lesson 6

## Learning Objectives

- Use Global CSS and CSS Modules
- Integrate Tailwind CSS
- Understand inline styles
- Manage fonts with next/font

---

## Program: Styling in Next.js

```tsx
import styles from './page.module.css';
export default function Home() {
  return (<div><h1 style={{borderBottom:'2px solid #2E5B44',paddingBottom:'.5rem'}}>Inline Styles</h1><div className="card"><h2>Global CSS</h2><p>Styles from globals.css</p><button className="btn">Button</button></div><div className={styles.card}><h2>CSS Module</h2><p>Scoped styles</p></div></div>);
}
```

---

## Explanation

## Global CSS
Import in `layout.tsx` or `app/globals.css`. Applies globally. Can only be imported in root layout.

## CSS Modules
Files `*.module.css` — automatically scoped. Class names are hashed. Import as object: `import styles from './page.module.css'`.

## Tailwind CSS
Default in create-next-app. Utility classes for rapid styling. Configure in `tailwind.config.ts`.

## next/font
`import { Inter } from 'next/font/google'` — optimized fonts. Downloaded at build time, self-hosted, no external requests.

---

## Experiments

1. **Global CSS**
2. **CSS Modules**
3. **Tailwind CSS**
4. **next/font**

---

## Challenge

Build a profile page with a combination: Tailwind for layout, CSS Module for component card, and global CSS for body styling.

---

## Summary

Three styling methods: Global CSS, CSS Modules (scoped), Tailwind CSS. next/font for optimized fonts. Choose based on need.
