# Tryngo

> Code made easy, with in-browser playgrounds and interactive quizzes.

Tryngo is an open-source, client-side interactive learning platform offering 28 structured curricula across programming languages, web frameworks, and databases in Indonesian and English with zero login required.

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

- **28 Stack**: Comprehensive learning tracks covering Frontend, Backend, Systems, Mobile, DevOps, and Databases.
- **Playground Every Stack**: Interactive in-browser coding environments (Embed StackBlitz WebContainers, Client-Side WebAssembly, Dedicated REPL, and Live Previews).
- **Step by Step Learning**: Structured roadmap from Beginner to Advanced with weekly modules and hands-on exercises.
- **7,000+ Quiz Questions**: Practice quizzes across every stack with instant scoring, feedback, and progress retention.
- **Embedded Monaco Editor**: Visual Studio Code editing experience in the browser with syntax highlighting, autocomplete, and code folding.
- **Instant Fuzzy Search**: Typo-tolerant search across all tracks, materials, and concepts powered by Fuse.js.
- **Bilingual Support**: Instant toggle between Bahasa Indonesia and English.
- **Local Progress Tracking**: Auto-saved progress for completed weeks and quiz results (zero-login required).
- **Responsive Modern UI**: Clean interface optimized for desktop and mobile with dark and light mode.

---

## Tech Stack

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

## Curriculum

| Track | Weeks | Execution Runtime |
|---|:---:|---|
| **Go (Golang)** | 13 | In-Browser WebAssembly (Yaegi) |
| **HTML5** | 14 | In-Browser HTML Sandbox |
| **CSS3** | 14 | CSS Live Preview |
| **JavaScript** | 14 | Browser JS Runtime |
| **Angular** | 14 | WebContainers / StackBlitz |
| **Rust** | 14 | Rust Playground API |
| **Spring Boot** | 14 | Interactive Spring Sandbox |
| **React** | 12 | Client-Side React/Babel Runner |
| **Next.js** | 12 | WebContainers / StackBlitz |
| **TypeScript** | 12 | Monaco Editor Sandbox |
| **Python** | 12 | Client-Side Python Sandbox |
| **Django** | 12 | Python Web Framework Sandbox |
| **Docker** | 12 | Interactive Docker Terminal |
| **Node.js** | 12 | WebContainers / StackBlitz |
| **NestJS** | 12 | WebContainers / StackBlitz |
| **Vue** | 12 | Client-Side Vue 3 Runner |
| **PHP** | 12 | In-Browser PHP Playground |
| **Laravel** | 12 | In-Browser PHP Playground |
| **C# (.NET)** | 12 | Monaco C# Sandbox |
| **Ruby on Rails** | 12 | In-Browser Ruby Sandbox |
| **Svelte** | 10 | Client-Side Svelte Runner |
| **CodeIgniter 4** | 10 | In-Browser PHP Playground |
| **PostgreSQL** | 10 | Client-Side SQL Engine |
| **MySQL** | 10 | Client-Side SQL Engine |
| **MongoDB** | 10 | Document Store Sandbox |
| **Redis** | 10 | In-Memory CLI Sandbox |
| **GraphQL** | 10 | Interactive GraphQL Runner |
| **Tailwind CSS** | 9 | Tailwind JIT Engine |

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
