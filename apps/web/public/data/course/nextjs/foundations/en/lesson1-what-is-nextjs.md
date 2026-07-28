# What is Next.js?

> Next.js | Next.js Foundations | Lesson 1

## Learning Objectives

- Understand Next.js as a React framework
- Learn App Router vs Pages Router
- Create a new Next.js project
- Understand the project folder structure

---

## Program: What is Next.js?

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

## Explanation

## App Router vs Pages Router
The `app/` directory (App Router) is the standard since Next.js 13. The `pages/` directory (Pages Router) is legacy. Always use App Router for new projects.

## create-next-app
Run `npx create-next-app@latest my-app --typescript --app` to create a new project. Choose TypeScript, App Router, Tailwind CSS when prompted.

## Folder Structure
`app/layout.tsx` = root layout. `app/page.tsx` = home page. `public/` = static files. `next.config.ts` = configuration.

---

## Experiments

1. **App Router vs Pages Router**
2. **create-next-app**
3. **Struktur Folder**

---

## Challenge

Create a new Next.js project with App Router. Explore layout.tsx and page.tsx. Try adding an `/about` page by creating `app/about/page.tsx`.

---

## Summary

Next.js is a production React framework. The App Router is the new standard with file-based routing. Next: Routing & Layouts.
