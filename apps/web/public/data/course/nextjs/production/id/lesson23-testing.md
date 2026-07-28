# Testing

> Next.js | Production & Optimization | Pelajaran 23

## Tujuan Pembelajaran

- Setup Vitest dengan Next.js
- Menulis unit test untuk Server Components
- Menulis integration test
- E2E testing dengan Playwright

---

## Program: Testing

```tsx
export default function Home() {
  return (<div><h1>Testing Demo</h1><p>Next.js supports:</p><ul><li>Unit tests: Vitest / Jest</li><li>Component tests: React Testing Library</li><li>E2E: Playwright / Cypress</li></ul></div>);
}
```

---

## Penjelasan

## Vitest Setup
`npm install -D vitest @vitejs/plugin-react`. Konfigurasi di `vitest.config.ts`. `npm run test` untuk menjalankan.

## Unit Test
Test fungsi murni: validasi, format, utility. Test Server Component: render dengan data mock. `render(await Component())`.

## Component Test
Client Components: render dengan React Testing Library. Test user interaction: click, type, submit. Assert UI changes.

## Playwright E2E
Test alur lengkap: navigate → login → create data → verify. `page.goto('/')`, `page.click('button')`, `expect(page.locator('h1')).toHaveText('...')`.

---

## Eksperimen

1. **Vitest Setup**
2. **Unit Test**
3. **Component Test**
4. **Playwright E2E**

---

## Tantangan

Setup Vitest untuk project Next.js. Tulis test untuk: fungsi utility, Server Component (render dengan mock), dan komponen Counter (click test).

---

## Ringkasan

Vitest untuk unit/integration. React Testing Library untuk komponen. Playwright untuk E2E. Test Server Components dengan async render.
