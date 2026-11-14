# Tryngo

> Code made easy, with in-browser playgrounds and interactive quizzes.

Tryngo is an open-source, 100% client-side interactive learning platform featuring 28 structured curricula (332 weekly modules) across modern frontend, backend, database, and DevOps technologies with in-browser WebAssembly runtimes, 7,332 quiz questions, and zero login required.

[![Live Demo](https://img.shields.io/badge/Demo-tryngo.widifirmaan.web.id-10B981?style=flat-square&logo=cloudflare&logoColor=white)](https://tryngo.widifirmaan.web.id)
[![WebAssembly](https://img.shields.io/badge/Engine-WebAssembly-654FF0?style=flat-square&logo=webassembly&logoColor=white)](https://webassembly.org/)
[![Architecture](https://img.shields.io/badge/Architecture-100%25_Client--Side-8B5CF6?style=flat-square)](#features)
[![Curriculum](https://img.shields.io/badge/Curriculum-28_Tracks_•_332_Modules-F59E0B?style=flat-square)](#curriculum)
[![Quizzes](https://img.shields.io/badge/Quizzes-7%2C332_Interactive-EC4899?style=flat-square)](#features)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript 5.8](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite 6](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Monaco Editor](https://img.shields.io/badge/Editor-Monaco-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white)](https://microsoft.github.io/monaco-editor/)
[![Tests](https://img.shields.io/badge/Tests-14_Passing-22C55E?style=flat-square&logo=vitest&logoColor=white)](#getting-started--local-development)

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

- **28 Structured Curricula (332 Weekly Modules)**: Comprehensive learning roadmaps spanning Frontend, Backend, Databases, and DevOps divided into Beginner, Intermediate, and Advanced tiers.
- **Dedicated In-Browser Execution Engines**: Zero-setup interactive coding environments tailored to each tech stack:
  - **WebAssembly Runtimes**: Yaegi & TinyGo (Go), Pyodide (Python), php-wasm (PHP), ruby-head-wasm (Ruby), and sql.js (PostgreSQL & MySQL relational schema).
  - **Client-Side Framework Sandboxes**: In-browser React execution via Babel Standalone, Vue 3 live SFC runner, Svelte 5 compiler, GraphQL.js AST executor, and real-time HTML/CSS previews.
  - **Interactive Terminal & Database Emulators**: Client-side Docker CLI simulator with container/image lifecycle, Redis in-memory key-value terminal, and MongoDB in-memory document store engine.
  - **Virtual Multi-File Workspaces & StackBlitz Integration**: Hierarchical project explorer with virtual file tree and in-browser simulation, plus 1-click cloud launch into StackBlitz for full-stack tracks (Next.js, NestJS, Angular, Node.js, Django, Spring Boot).
  - **Remote Compiler Integration**: Rust Playground official CORS API for full Rust compilation.
- **Automatic Lesson Code Extraction**: The playground automatically detects and pre-fills the most relevant executable code block from the active week's markdown material so learners can run examples immediately.
- **7,332 Interactive Multiple-Choice Quizzes**: Knowledge checks across all 332 modules with immediate grading, detailed explanations, and progress tracking.
- **Embedded Monaco Editor**: VS Code's editor engine in the browser featuring syntax highlighting, line numbers, autocomplete, and code folding.
- **Resizable Split-Screen Workspace**: Smooth draggable desktop split-pane to adjust reading material width against the live code playground.
- **Fullscreen IDE Modal**: Standalone coding modal for distraction-free experimentation and testing.
- **Full Bilingual Content (ID & EN)**: Instant language switch between Bahasa Indonesia and English across all 332 lesson modules, quizzes, and UI elements (664 indexed markdown files).
- **Instant Typo-Tolerant Search (`Cmd/Ctrl + K`)**: Pre-indexed fuzzy search indexing 664 curriculum documents powered by Fuse.js with global keyboard shortcut navigation.
- **100% Client-Side Privacy & Zero Login**: All progress tracking, quiz scores, and settings persist securely in the browser's `localStorage`—no account creation, no tracking, and no external database.
- **Responsive Dark & Light Theme**: Tactile interface with smooth transitions and persistent theme preferences.

---

## Tech Stack

| Category | Technologies | Purpose |
| :--- | :--- | :--- |
| **Core Framework** | React 19, TypeScript 5.8, Vite 6 | Modern SPA foundation with fast HMR and static build pipeline |
| **Styling & Motion** | Tailwind CSS v4, Motion (Framer Motion v12) | Utility-first responsive design, dark/light theme & fluid UI animations |
| **Code Editor** | Monaco Editor (`@monaco-editor/react`) | In-browser VS Code editor engine with syntax highlighting & autocomplete |
| **WebAssembly Engines** | Yaegi + TinyGo (Go), Pyodide (Python), php-wasm (PHP), ruby-head-wasm (Ruby), sql.js (SQLite) | Real language interpreters running directly in the browser via WebAssembly |
| **Client-Side Framework Sandboxes** | Babel Standalone (React), Vue 3 SFC Compiler, Svelte 5 Compiler, GraphQL.js | In-browser code transformation, component rendering & AST execution |
| **CLI & Database Emulators** | Custom In-Memory State Engines (TypeScript) | Client-side Docker CLI simulator, Redis key-value engine, MongoDB document store, and procedural C# interpreter |
| **Full-Stack Project Workspaces** | Virtual Multi-File Tree + StackBlitz SDK | Hierarchical file explorer with in-browser simulation and 1-click cloud sandbox launch |
| **Content & Search** | React-Markdown, Remark GFM, Fuse.js | GitHub Flavored Markdown rendering and pre-indexed fuzzy search across 664 documents |
| **Deployment & Edge Delivery** | Cloudflare Pages + Custom Prerender Engine | Fast global CDN delivery with static HTML route prerendering for SEO |

---

## Curriculum

| Track | Weeks | Execution Runtime |
|---|:---:|---|
| **Go (Golang)** | 13 | In-Browser WebAssembly (Yaegi & TinyGo) |
| **HTML5** | 14 | In-Browser Live HTML Preview |
| **CSS3** | 14 | In-Browser Live CSS Preview |
| **JavaScript** | 14 | Browser JS V8 Runtime |
| **Angular** | 14 | Virtual Multi-File Workspace + StackBlitz SDK |
| **Rust** | 14 | Rust Playground Official API |
| **Spring Boot** | 14 | Virtual Multi-File Workspace + StackBlitz SDK |
| **React** | 12 | Client-Side React / Babel Standalone Runner |
| **Next.js** | 12 | Virtual Multi-File Workspace + StackBlitz SDK |
| **TypeScript** | 12 | Monaco Editor TypeScript Engine |
| **Python** | 12 | Pyodide WebAssembly (Wasm) |
| **Django** | 12 | Virtual Multi-File Workspace + StackBlitz SDK |
| **Docker** | 12 | Interactive Client-Side CLI Simulator |
| **Node.js** | 12 | Virtual Multi-File Workspace + StackBlitz SDK |
| **NestJS** | 12 | Virtual Multi-File Workspace + StackBlitz SDK |
| **Vue** | 12 | Client-Side Vue 3 SFC Runner |
| **PHP** | 12 | php-wasm WebAssembly / Procedural PHP Engine |
| **Laravel** | 12 | php-wasm WebAssembly / Procedural PHP Engine |
| **C# (.NET)** | 12 | Procedural C# AST Interpreter |
| **Ruby on Rails** | 12 | ruby-head-wasm WebAssembly / Procedural Engine |
| **Svelte** | 10 | Client-Side Svelte 5 Runner |
| **CodeIgniter 4** | 10 | php-wasm WebAssembly / Procedural PHP Engine |
| **PostgreSQL** | 10 | sql.js WebAssembly (Relational SQLite Schema) |
| **MySQL** | 10 | sql.js WebAssembly (Relational SQLite Schema) |
| **MongoDB** | 10 | In-Memory Document Store Engine |
| **Redis** | 10 | In-Memory Key-Value CLI Simulator |
| **GraphQL** | 10 | GraphQL.js Client-Side AST Executor |
| **Tailwind CSS** | 9 | Live HTML/CSS Preview with Tailwind CSS v4 |

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

### Production Build & Deployment

```bash
# Build search index, quiz questions, sitemap, chunk Wasm, and compile Vite production bundle
npm run build

# (Optional) Deploy directly to Cloudflare Pages via Wrangler CLI
npm run deploy
```

---

## Author

Developed by **[Widi Firmansyah](https://widifirmaan.web.id)**.
