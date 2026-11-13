# Tryngo - Code made easy, with playground coding and quiz.

Tryngo is an interactive web platform built to make learning to code straightforward, from beginner to professional levels. Developed with React 19, Vite 6, and Tailwind CSS 4, it offers 27 learning tracks across programming languages, frameworks, and databases in both Indonesian and English. Users can write and run code directly in the browser using Monaco Editor and WebAssembly, search topics instantly, and test their knowledge through interactive quizzes.

[![Live Demo](https://img.shields.io/badge/Demo-Live_Production-10B981?style=for-the-badge&logo=cloudflare&logoColor=white)](https://tryngo.widifirmaan.web.id)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages_Edge-F38020?style=for-the-badge&logo=cloudflare)](https://tryngo.widifirmaan.web.id)
[![React 19](https://img.shields.io/badge/React-19.0.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite 6](https://img.shields.io/badge/Vite-6.2.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4.1.14-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![WebAssembly](https://img.shields.io/badge/WebAssembly-WASM_Go-654FF0?style=for-the-badge&logo=webassembly&logoColor=white)](https://webassembly.org/)

---

## 🌐 Live Production

- **URL:** [https://tryngo.widifirmaan.web.id](https://tryngo.widifirmaan.web.id)
- **Architecture:** Cloudflare Pages (Edge SPA with Prerendered Static SEO Routes)
- **Client Execution Engine:** In-Browser WebAssembly (Yaegi Go Interpreter) + WebContainers / StackBlitz API
- **Editor Engine:** Microsoft Monaco Editor with multi-language syntax highlighting and diagnostics
- **Search System:** Fuse.js Build-Time Pre-Indexed Fuzzy Search Engine

---

## Showcase

| Desktop | Mobile |
| :---: | :---: |
| **Homepage Desktop**<br>![Homepage Desktop](screenshots/Tryngo%20Index%20Desktop.png) | **Homepage Mobile**<br>![Homepage Mobile](screenshots/Tryngo%20Index%20Mobile.png) |
| **Stack Grid Desktop**<br>![Stack Grid Desktop](screenshots/Tryngo%20Grid%20Desktop.png) | **Stack Grid Mobile with Expanded Hamburger**<br>![Stack Grid Mobile with Expanded Hamburger](screenshots/Tryngo%20Hamburger%20Mobile.png) |
| **Lesson Section Desktop**<br>![Lesson Section Desktop](screenshots/Tryngo%20Course%20Desktop.png) | **Lesson Section Mobile**<br>![Lesson Section Mobile](screenshots/Tryngo%20Course%20Mobile.png) |
| **Playground Desktop**<br>![Playground Desktop](screenshots/Tryngo%20Playground%20Desktop.png) | **Playground Mobile**<br>![Playground Mobile](screenshots/Tryngo%20Playground%20Mobile.png) |
| **Quiz Desktop**<br>![Quiz Desktop](screenshots/Tryngo%20Quiz%20Desktop.png) | **Quiz Mobile**<br>![Quiz Mobile](screenshots/Tryngo%20Quiz%20Mobile.png) |
| **Quiz Question Desktop**<br>![Quiz Question Desktop](screenshots/Tryngo%20Quiz%20Question%20Desktop.png) | **Quiz Question Mobile**<br>![Quiz Question Mobile](screenshots/Tryngo%20Quiz%20Question%20Mobile.png) |
| **Search Modal Desktop**<br>![Search Modal Desktop](screenshots/Tryngo%20Search%20Desktop.png) | **Search Modal Mobile**<br>![Search Modal Mobile](screenshots/Tryngo%20Search%20Mobile.png) |
| **Settings Modal Desktop**<br>![Settings Modal Desktop](screenshots/Tryngo%20Settings%20Desktop.png) | **Settings Modal Mobile**<br>![Settings Modal Mobile](screenshots/Tryngo%20Settings%20Mobile.png) |

---

## Features

- **27 Stack**: Comprehensive learning tracks covering Frontend, Backend, Systems, Mobile, DevOps, and Databases.
- **Playground Every Stack**: Interactive in-browser coding environments (Embed StackBlitz WebContainers, Client-Side WebAssembly, Dedicated REPL, and Live Previews).
- **Step by Step Learning**: Structured roadmap from Beginner to Advanced with weekly modules and hands-on exercises.
- **7,000+ Quiz Questions**: Practice quizzes across every stack with instant scoring, feedback, and progress retention.
- **Embedded Monaco Editor**: Visual Studio Code editing experience in the browser with syntax highlighting, autocomplete, and code folding.
- **Instant Fuzzy Search**: Typo-tolerant search across all tracks, materials, and concepts powered by Fuse.js.
- **Bilingual Support**: Instant toggle between Bahasa Indonesia and English.
- **Local Progress Tracking**: Auto-saved progress for completed weeks and quiz results (zero-login required).
- **Responsive Neo-Brutalist Design**: Tactile interface optimized for desktop and mobile with dark and light mode.

---

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19 + Vite 6 |
| **Styling & Design** | Tailwind CSS 4 |
| **Language** | TypeScript 5.8 |
| **Animations** | Motion |
| **Code Editor** | Monaco Editor |
| **Go Code Engine** | Yaegi + WebAssembly |
| **Web Sandbox** | StackBlitz SDK + WebContainers |
| **Fuzzy Search** | Fuse.js |
| **Deployment** | Cloudflare Pages |

---

## 📚 Curriculum

| Track | Weeks | Execution Runtime |
|---|:---:|---|
| **Go (Golang)** | 14 | In-Browser WebAssembly (Yaegi) |
| **React** | 16 | WebContainers / StackBlitz |
| **Next.js** | 16 | WebContainers / StackBlitz |
| **TypeScript** | 16 | Monaco Editor Sandbox |
| **JavaScript** | 16 | Browser JS Runtime |
| **HTML5** | 14 | In-Browser HTML Sandbox |
| **CSS3** | 14 | CSS Live Preview |
| **Tailwind CSS** | 9 | Tailwind JIT Engine |
| **Python** | 18 | Client-side Python WASM |
| **Django** | 18 | Python Runtime Sandbox |
| **Docker** | 16 | Interactive Docker Terminal |
| **Node.js** | 16 | WebContainers Sandbox |
| **NestJS** | 16 | WebContainers Sandbox |
| **Rust** | 14 | Rust WebAssembly Playground |
| **Vue** | 16 | WebContainers Sandbox |
| **Svelte** | 16 | WebContainers Sandbox |
| **Angular** | 16 | WebContainers Sandbox |
| **PHP** | 16 | Browser PHP Playground |
| **Laravel** | 20 | Browser PHP Playground |
| **CodeIgniter 4** | 12 | Browser PHP Playground |
| **Spring Boot** | 16 | WebContainers Sandbox |
| **C# (.NET)** | 16 | Monaco C# Sandbox |
| **Ruby on Rails** | 16 | Interactive Ruby Sandbox |
| **PostgreSQL** | 16 | Client-side SQL Engine |
| **MySQL** | 16 | Client-side SQL Engine |
| **MongoDB** | 16 | Document Store Sandbox |
| **Redis** | 16 | In-Memory CLI Sandbox |
| **GraphQL** | 16 | Interactive GraphQL Runner |

---

## 📂 Project Structure

```bash
/
├── apps/
│   └── web/                      # Main Web Application
│       ├── public/
│       │   ├── data/course/      # Course markdown materials (27 tracks x levels x weeks)
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
├── screenshot/                   # Legacy showcase image sync
├── scripts/
│   └── capture_tryngo_screenshots.js # Automated Puppeteer capture script
└── README.md
```

---

## 🚀 Getting Started & Local Development

### Prerequisites
- **Node.js 20+** or **Node.js 22+**
- **npm**, **pnpm**, or **yarn**

### Installation & Setup
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

### Production Build & Deployment
```bash
# Build production bundle
npm run build

# Deploy to Cloudflare Pages
npm run deploy
```

---

## 👥 Author

Developed with ❤️ by **Widi Firmansyah**.
