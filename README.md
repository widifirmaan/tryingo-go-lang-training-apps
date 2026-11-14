# Tryngo

> Code made easy, with in-browser playgrounds and interactive quizzes.

Tryngo is an open-source, 100% client-side interactive learning platform featuring 28 structured curricula (332 weekly modules) across modern frontend, backend, database, and DevOps technologies with in-browser WebAssembly runtimes, 7,332 quiz questions, and zero login required.

[![Live Demo](https://img.shields.io/badge/Demo-tryngo.widifirmaan.web.id-10B981?style=for-the-badge&logo=cloudflare&logoColor=white)](https://tryngo.widifirmaan.web.id)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite 6](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Monaco Editor](https://img.shields.io/badge/Editor-Monaco-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)](https://microsoft.github.io/monaco-editor/)

---

## Live Production

- **URL:** [https://tryngo.widifirmaan.web.id](https://tryngo.widifirmaan.web.id)
- **Deployment:** Cloudflare Pages (Edge delivery with prerendered static routes)

---

## Showcase

| Desktop | Mobile |
| :---: | :---: |
| **Homepage Desktop**<br>![Homepage Desktop](screenshots/Tryngo%20Index%20Desktop.png) | **Homepage Mobile**<br>![Homepage Mobile](screenshots/Tryngo%20Index%20Mobile.png) |
| **Stack Grid Desktop**<br>![Stack Grid Desktop](screenshots/Tryngo%20Grid%20Desktop.png) | **Mobile Navigation Menu**<br>![Mobile Navigation Menu](screenshots/Tryngo%20Hamburger%20Mobile.png) |
| **Lesson Section Desktop**<br>![Lesson Section Desktop](screenshots/Tryngo%20Course%20Desktop.png) | **Lesson Section Mobile**<br>![Lesson Section Mobile](screenshots/Tryngo%20Course%20Mobile.png) |
| **Playground Desktop**<br>![Playground Desktop](screenshots/Tryngo%20Playground%20Desktop.png) | **Playground Mobile**<br>![Playground Mobile](screenshots/Tryngo%20Playground%20Mobile.png) |
| **Quiz Desktop**<br>![Quiz Desktop](screenshots/Tryngo%20Quiz%20Desktop.png) | **Quiz Mobile**<br>![Quiz Mobile](screenshots/Tryngo%20Quiz%20Mobile.png) |
| **Quiz Question Desktop**<br>![Quiz Question Desktop](screenshots/Tryngo%20Quiz%20Question%20Desktop.png) | **Quiz Question Mobile**<br>![Quiz Question Mobile](screenshots/Tryngo%20Quiz%20Question%20Mobile.png) |
| **Search Modal Desktop**<br>![Search Modal Desktop](screenshots/Tryngo%20Search%20Desktop.png) | **Search Modal Mobile**<br>![Search Modal Mobile](screenshots/Tryngo%20Search%20Mobile.png) |
| **Settings Modal Desktop**<br>![Settings Modal Desktop](screenshots/Tryngo%20Settings%20Desktop.png) | **Settings Modal Mobile**<br>![Settings Modal Mobile](screenshots/Tryngo%20Settings%20Mobile.png) |

---

## Features

- **28 Learning Tracks (332 Modules)**: Structured roadmaps spanning Frontend, Backend, Databases, and DevOps divided into Beginner, Intermediate, and Advanced tiers.
- **Dedicated In-Browser Runtimes**: Zero-setup interactive coding environments powered by WebAssembly (Yaegi & TinyGo for Go, Pyodide for Python, php-wasm for PHP, ruby-wasm for Ruby, sql.js for SQL), StackBlitz WebContainers (Node, Next, Nest, Angular, Django, Spring Boot), and live HTML/CSS previews.
- **7,332 Interactive Quiz Questions**: Comprehensive knowledge checks across all 332 modules with instant scoring, answer explanations, and progress retention.
- **Embedded Monaco Editor**: Full VS Code-grade editing experience directly in the browser with syntax highlighting, line numbers, autocomplete, and code folding.
- **Resizable Split-Screen Workspace**: Smooth desktop split-pane interface allowing learners to adjust the width between lesson reading material and live code playground.
- **Fullscreen IDE Modal**: Standalone coding workspace modal for distraction-free coding, experimentation, and testing.
- **Full Bilingual Content (ID & EN)**: Instant toggle between Bahasa Indonesia and English across all 332 lesson modules, quizzes, and UI elements (664 indexed markdown files).
- **Instant Typo-Tolerant Search (`Cmd/Ctrl + K`)**: Lightning-fast fuzzy search indexing 664 lesson files powered by Fuse.js with global keyboard shortcut navigation.
- **100% Client-Side & Zero Login**: All progress tracking, quiz scores, and settings persist securely in the browser's `localStorage`—no account creation, no tracking, and no external server dependency.
- **Dark & Light Theme**: Polished interface with smooth transitions and persistent theme preferences.

---

## Tech Stack

| Category | Technologies | Purpose |
| :--- | :--- | :--- |
| **Core Framework** | React 19, TypeScript 5.8, Vite 6 | Modern SPA foundation with fast HMR and type safety |
| **Styling & Motion** | Tailwind CSS v4, Motion (Framer Motion v12) | Utility-first responsive design, dark mode & fluid animations |
| **Code Editor & UI** | Monaco Editor (`@monaco-editor/react`), Lucide React, FontAwesome SVG | VS Code web editing experience and crisp vector icons |
| **WebAssembly Engines** | Yaegi + TinyGo (Go), Pyodide (Python), php-wasm (PHP), ruby-head-wasm (Ruby), sql.js (SQLite) | Real language execution 100% inside the browser |
| **Full-Stack Sandboxes** | StackBlitz SDK + WebContainers | In-browser Node.js runtime for Next.js, NestJS, Angular, Django & Spring Boot |
| **Query & Content** | GraphQL.js, React-Markdown, Remark GFM | In-browser GraphQL AST execution and GitHub Flavored Markdown rendering |
| **Search & Indexing** | Fuse.js (664 documents pre-indexed) | Client-side fuzzy search with typo tolerance |
| **Testing & Quality** | Vitest (100% pass unit test suite), TypeScript compiler (`tsc --noEmit`) | Test-driven reliability and type validation |
| **Deployment & SEO** | Cloudflare Pages + Custom Prerender Generator | Fast global edge delivery with static HTML route prerendering |

---

## Curriculum

| Track | Weeks | Execution Runtime |
|---|:---:|---|
| **Go (Golang)** | 13 | In-Browser WebAssembly (Yaegi & TinyGo) |
| **HTML5** | 14 | In-Browser Live HTML Preview |
| **CSS3** | 14 | In-Browser Live CSS Preview |
| **JavaScript** | 14 | Browser JS V8 Runtime |
| **Angular** | 14 | StackBlitz WebContainers |
| **Rust** | 14 | Rust Playground Official API |
| **Spring Boot** | 14 | StackBlitz WebContainers (Maven & Java Starter) |
| **React** | 12 | Client-Side React / Babel Runner |
| **Next.js** | 12 | StackBlitz WebContainers |
| **TypeScript** | 12 | Monaco Editor TypeScript Engine |
| **Python** | 12 | Pyodide WebAssembly (Wasm) |
| **Django** | 12 | StackBlitz WebContainers |
| **Docker** | 12 | Interactive Client-Side CLI Simulator |
| **Node.js** | 12 | StackBlitz WebContainers |
| **NestJS** | 12 | StackBlitz WebContainers |
| **Vue** | 12 | Client-Side Vue 3 SFC Runner |
| **PHP** | 12 | php-wasm WebAssembly (Wasm) |
| **Laravel** | 12 | php-wasm WebAssembly (Wasm) |
| **C# (.NET)** | 12 | Procedural C# AST Interpreter |
| **Ruby on Rails** | 12 | ruby-wasm WebAssembly (Wasm) |
| **Svelte** | 10 | Client-Side Svelte 5 Runner |
| **CodeIgniter 4** | 10 | php-wasm WebAssembly (Wasm) |
| **PostgreSQL** | 10 | sql.js WebAssembly (SQLite Relational Schema) |
| **MySQL** | 10 | sql.js WebAssembly (SQLite Relational Schema) |
| **MongoDB** | 10 | In-Memory Document Store Engine |
| **Redis** | 10 | In-Memory CLI Command Parser |
| **GraphQL** | 10 | GraphQL.js Client-Side AST Executor |
| **Tailwind CSS** | 9 | Tailwind Play / JIT Engine |

---

## Project Structure

```bash
/
├── apps/
│   └── web/                      # Main Web Application
│       ├── public/
│       │   ├── data/course/      # Course markdown materials (28 tracks x levels x weeks)
│       │   ├── search-index.json # Pre-compiled Fuse.js search index
│       │   ├── quiz-index.json   # Comprehensive quiz question banks
│       │   └── wasm/             # Yaegi WebAssembly Go execution binaries
│       ├── scripts/              # Curriculum, WASM build & sitemap generators
│       ├── src/
│       │   ├── assets/           # SVG technology logos & brand graphics
│       │   ├── components/       # Reusable UI, Modals, & Playgrounds
│       │   │   ├── playgrounds/  # Specialized language playground runners
│       │   │   ├── CodePlayground.tsx
│       │   │   ├── CoursePage.tsx
│       │   │   ├── HeroSection.tsx
│       │   │   ├── IdeModal.tsx
│       │   │   ├── Modals.tsx
│       │   │   ├── QuizModal.tsx
│       │   │   └── TrackCard.tsx
│       │   ├── data/             # Curriculum configurations, tracks & slug mappings
│       │   ├── utils/            # Bilingual translations, progress sync, color tokens
│       │   ├── App.tsx           # Root application & state router
│       │   └── main.tsx          # React entrypoint
│       ├── tests/                # Vitest unit test suites
│       ├── package.json
│       └── vite.config.ts
├── screenshots/                  # High-resolution desktop & mobile showcase images
└── README.md
```

---

## Getting Started & Local Development

### Prerequisites
- **Node.js 20+** or **Node.js 22+**
- **npm**, **pnpm**, or **yarn**

### Installation & Setup

> **Environment Variables:** No `.env` file or API keys are required. All curriculum parsing, search indexing, and code execution sandboxes run 100% client-side in the browser.

```bash
# 1. Clone repository
git clone https://github.com/widifirmaan/tryingo-go-lang-training-apps.git
cd tryingo-go-lang-training-apps

# 2. Enter web application directory and install dependencies
cd apps/web
npm install

# 3. Start local Vite development server
npm run dev
```
*Access local development server via `http://localhost:3000`*

### Production Build
```bash
# Build production bundle
npm run build
```

---

## Author

Developed by **Widi Firmansyah**.
