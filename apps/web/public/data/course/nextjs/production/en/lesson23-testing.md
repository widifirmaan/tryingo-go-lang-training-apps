# Testing

> Next.js | Production & Optimization | Lesson 23

## Learning Objectives

- Set up Vitest with Next.js
- Write unit tests for Server Components
- Write integration tests
- E2E testing with Playwright

---

## Program: Testing

```tsx
export default function Home() {
  return (<div><h1>Testing Demo</h1><p>Next.js supports:</p><ul><li>Unit tests: Vitest / Jest</li><li>Component tests: React Testing Library</li><li>E2E: Playwright / Cypress</li></ul></div>);
}
```

---

## Explanation

## Vitest Setup
`npm install -D vitest @vitejs/plugin-react`. Configure in `vitest.config.ts`. `npm run test` to run.

## Unit Test
Test pure functions: validation, formatting, utilities. Test Server Component: render with mock data. `render(await Component())`.

## Component Test
Client Components: render with React Testing Library. Test user interaction: click, type, submit. Assert UI changes.

## Playwright E2E
Test full flow: navigate → login → create data → verify. `page.goto('/')`, `page.click('button')`, `expect(page.locator('h1')).toHaveText('...')`.

---

## Experiments

1. **Vitest Setup**
2. **Unit Test**
3. **Component Test**
4. **Playwright E2E**

---

## Challenge

Set up Vitest for a Next.js project. Write tests for: utility function, Server Component (render with mock), and Counter component (click test).

---

## Summary

Vitest for unit/integration. React Testing Library for components. Playwright for E2E. Test Server Components with async render.
