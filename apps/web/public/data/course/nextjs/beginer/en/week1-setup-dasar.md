# Setup & Core Concepts — Your First Next.js Website

> **Kategori:** Next.js | **Level:** Beginner | **Minggu 1:** Setup & Core Concepts

## Learning Objectives

- Understand Next.js with an analogy: React = bricks, Next.js = finished house with plumbing & wiring
- Install Node.js, VS Code, and create your first project with `create-next-app` (zero steps skipped)
- Run the website at `localhost:3000` and see live changes
- Understand the `app/` blueprint — folder = URL, `page.js` = the page
- Understand `layout.js` (frame wrapping all pages) and `metadata` (browser tab title for Google)

---

## Why This Matters (Non-IT)

You don't need to be a programmer to need a website. A shop needs an online catalog, a teacher needs a grade page, a small business needs a product landing page. Next.js is a **full hardware store**: React only gives you bricks (components), Next.js gives you the blueprint (routing), wiring (server), and decoration (optimization) — you just fill the shelves.

This week you will **not memorize theory**. You will **own a real website** you can open on your phone.

---

## Program: First Shop Website

Copy all files below into your project (install steps are in Beginner Explanation). This is a 2-page website that **runs immediately**.

```jsx
// ── app/layout.js — MAIN FRAME (like the house frame, wraps every page) ──
export const metadata = {
  title: "Siti's Shop — Online Catalog",
  description: "Fresh products catalog, open daily 07:00-20:00",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", margin: 0 }}>
        <header style={{ background: "#2E5B44", color: "white", padding: 16 }}>
          <strong>Siti's Shop</strong> — 12 Melati St.
        </header>
        <main style={{ padding: 24 }}>{children}</main>
        <footer style={{ background: "#EFECE6", padding: 16, textAlign: "center" }}>
          © 2026 Siti's Shop — WA +62 812-3456-7890
        </footer>
      </body>
    </html>
  );
}

// ── app/page.js — HOME PAGE (address: / ) ──
export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Siti's Shop 🥬</h1>
      <p>Fresh vegetables, free delivery for RW 01-03.</p>
      <a href="/about" style={{ color: "#2E5B44", fontWeight: "bold" }}>
        → About Us
      </a>

      <h2 style={{ marginTop: 24 }}>Today's Products</h2>
      <ul>
        <li>Spinach — Rp 5.000 / bunch</li>
        <li>Chicken Eggs — Rp 28.000 / kg</li>
        <li>Rice 5kg — Rp 62.000</li>
      </ul>
    </div>
  );
}

// ── app/about/page.js — ABOUT PAGE (address: /about) ──
export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Siti's Shop since 2018. Order via WA, pay COD / Transfer.</p>
      <p>Hours: 07:00 — 20:00</p>
      <a href="/">← Back to Home</a>
    </div>
  );
}
```

> How to run: see **Beginner Friendly Explanation → Steps 1-4** below. After `npm run dev`, open `http://localhost:3000`.

---

## Key Concepts

### Next.js = Finished House, React = Bricks Only
React makes you install routing, server, image optimization yourself. Next.js ships all of it.

### App Router: Folder = URL
Golden rule:
- `app/page.js` → `/`
- `app/about/page.js` → `/about`
- `app/products/[id]/page.js` → `/products/123` (dynamic, next week)

Rename a folder = rename the URL. No router config needed.

### layout.js vs page.js
- `layout.js` = **frame & walls** — persists when navigating.
- `page.js` = **room content** — changes per URL.
- `metadata` = **shop sign** — read by Google, shown in browser tab.

### Server Component (Default)
All files in `app/` are Server Components: rendered on the server, lighter, better SEO. No `useState` this week. Interactivity (`"use client"`) comes in week 3.

---

## Beginner Friendly Explanation

### Analogy: Building a Shophouse

- **Node.js** = **electricity & water** — without it, the tools (Next.js) won't run. Install once.
- **npm** = **hardware store** — fetch bricks, paint (libraries) with `npm install`.
- **Terminal / PowerShell** = **walkie-talkie to the builder** — you type text commands, the computer builds.
- **VS Code** = **architect's desk** — where you write the blueprint (code).
- **`npx create-next-app`** = **order a prefab shophouse** — foundation, blueprint, wiring done. You fill the shelves.

### Step 0 — Prepare Tools (5 min, once)

1. **Install Node.js LTS**: Go to `nodejs.org`, click **LTS**, download `.msi`, Next → Install. Verify: open **Terminal** and type `node -v` and `npm -v`. If you see `v22.x` and `10.x`, done. If `not recognized`, close and reopen Terminal.

2. **Install VS Code**: `code.visualstudio.com`.

### Step 1 — Create Project (2 min)

In PowerShell, type line by line:
```
npx create-next-app@latest siti-shop --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd siti-shop
npm run dev
```
You should see `Ready on http://localhost:3000`.

### Step 2 — Open Website

Open Chrome → `http://localhost:3000` → you see the default Next.js page. **Power is on.**

### Step 3 — Replace Content

1. Open `siti-shop` in VS Code.
2. Open `src/app/page.tsx`, delete everything, paste `HomePage` code.
3. Open `src/app/layout.tsx`, replace with `RootLayout` code.
4. Create folder `src/app/about`, create `page.tsx` inside, paste `AboutPage`.
5. Browser auto-reloads! Click links → navigate without full reload.

### How the Computer Reads It

1. `npm run dev` → Node starts a small server on your laptop (port 3000).
2. Browser asks `/` → Next.js finds `app/page.js` → renders `RootLayout` + `HomePage`.
3. Browser asks `/about` → finds `app/about/page.js` → renders **same** `RootLayout` + `AboutPage`.

Header/footer don't blink — layout is not re-rendered.

### 3 Must-Know Terms

1. **Route** = address. `/` and `/about` are two routes. In Next.js, **folder = route**.
2. **Layout** = persistent frame.
3. **Metadata** = title & description for Google, written as `export const metadata = { title: ... }`.

---

## Experiments

- **Green (Safe):** Change `Siti's Shop` to your shop name, change prices, save → see browser update.
- **Yellow (Try):** Create a new page: folder `src/app/contact` + `page.tsx` with `<h1>Contact</h1>`. Open `/contact` — it just works!
- **Red (Debug):** Delete `export default` in `page.js` and see error: `The default export is not a React Component`. Put it back.

---

## Challenge

**Pick one:**

**A. Shop Catalog:** 3 pages: Home (welcome + 3 products), Products (`/products` list of 6), Contact (`/contact` address + WA). Same `RootLayout`.

**B. Teacher Profile:** Home (photo + name), Schedule (`/schedule` Mon-Fri table), Contact. Use different `metadata` per page.

Done when `npm run dev` has no red error and 3 routes are clickable.

---

## Mini Glossary

- **Node.js**: engine running JavaScript outside browser
- **npm**: store to download other people's code
- **Terminal**: black box to type commands
- **localhost:3000**: address of website living only on your laptop
- **App Router**: modern Next.js blueprint (folder = URL), replacement for old Pages Router

---

## Summary

Week 1 of 12: **Setup & Core Concepts** (Level: Beginner). You turned on power (Node.js), ordered a prefab shophouse (create-next-app), and filled 2 rooms (routes `/` and `/about`). Next week: **Routing & Navigation** — dynamic addresses like `/products/123` without creating 100 folders manually.
