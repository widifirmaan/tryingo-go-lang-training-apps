# ⚡ Tryngo — Interactive Coding Education Platform & Multi-Language Sandbox

**Tryngo** is a modern, enterprise-grade interactive coding education platform and browser-based programming sandbox designed to teach software engineering from beginner to professional. Built as a high-performance single-page application with **React 19**, **Vite 6**, and **Tailwind CSS 4**, deployed globally on **Cloudflare Pages**, Tryngo features 27 comprehensive learning tracks, in-browser **WebAssembly (Yaegi Go)** and **Monaco Editor** execution environments, bilingual curriculum (Indonesian & English), instant fuzzy search, interactive quizzes, and a punchy **Neo-Brutalist** aesthetic with seamless Light/Dark themes.

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

## 📸 Application Showcase

### 1. Platform Overview & Learning Experience (Desktop)

| Core Hero & Navigation | Track Catalog Directory |
| :---: | :---: |
| ![Hero Index](screenshots/Tryngo%20Index%20Desktop.png)<br>**Interactive Neo-Brutalist Hero Landing** | ![Track Grid](screenshots/Tryngo%20Grid%20Desktop.png)<br>**27-Track Curriculum Directory & Category Filters** |
| ![Course Page](screenshots/Tryngo%20Course%20Desktop.png)<br>**Go Track Deep-Dive Curriculum & Inline Runner** | ![React Course](screenshots/Tryngo%20Course%20React%20Desktop.png)<br>**React & TypeScript Interactive Curriculum** |

### 2. Interactive Execution Sandboxes, Modals & Theme (Desktop)

| In-Browser Sandboxes & Validation | System Configuration & Aesthetics |
| :---: | :---: |
| ![Code Playground](screenshots/Tryngo%20Playground%20Desktop.png)<br>**Monaco Code Playground & Live WASM Execution** | ![Quiz Modal](screenshots/Tryngo%20Quiz%20Desktop.png)<br>**Interactive Practice Quiz & Knowledge Validation** |
| ![Search Modal](screenshots/Tryngo%20Search%20Desktop.png)<br>**Fuse.js Instant Fuzzy Search Modal** | ![Settings Modal](screenshots/Tryngo%20Settings%20Desktop.png)<br>**Theme & Bilingual (ID/EN) Localization Settings** |
| ![Career Paths](screenshots/Tryngo%20Career%20Paths%20Desktop.png)<br>**Structured Career Roadmaps (Frontend, Backend, DevOps)** | ![Dark Mode](screenshots/Tryngo%20Dark%20Mode%20Desktop.png)<br>**High-Contrast Neo-Brutalist Dark Theme** |

### 3. Mobile Responsive Experience (Mobile Viewports)

| Mobile Navigation & Catalog | Mobile Learning & Sandboxes |
| :---: | :---: |
| ![Mobile Hero](screenshots/Tryngo%20Index%20Mobile.png)<br>**Mobile View: Hero & Quick Navigation** | ![Mobile Grid](screenshots/Tryngo%20Grid%20Mobile.png)<br>**Mobile View: Filterable Track Grid** |
| ![Mobile Course](screenshots/Tryngo%20Course%20Mobile.png)<br>**Mobile View: Weekly Course Material Reader** | ![Mobile Playground](screenshots/Tryngo%20Playground%20Mobile.png)<br>**Mobile View: Touch Code Playground** |
| ![Mobile Quiz](screenshots/Tryngo%20Quiz%20Mobile.png)<br>**Mobile View: Interactive Quiz Challenge** | ![Mobile Drawer](screenshots/Tryngo%20Hamburger%20Mobile.png)<br>**Mobile View: Slide-out Navigation Drawer** |
| ![Mobile Search](screenshots/Tryngo%20Search%20Mobile.png)<br>**Mobile: Real-Time Fuzzy Search** | ![Mobile Settings](screenshots/Tryngo%20Settings%20Mobile.png)<br>**Mobile: Preferences & Localization** |
| ![Mobile Career Paths](screenshots/Tryngo%20Career%20Paths%20Mobile.png)<br>**Mobile: Career Learning Roadmaps** | ![Mobile Dark Mode](screenshots/Tryngo%20Dark%20Mode%20Mobile.png)<br>**Mobile: High-Contrast Dark Mode** |

---

## 🚀 Key Features

### 💻 In-Browser Multi-Language Sandboxes
- **Client-Side Go WebAssembly (Yaegi)**: Execute authentic Go code directly in the browser via WebAssembly without hitting backend servers or incurring API latency.
- **Embedded Microsoft Monaco Editor**: Full desktop Visual Studio Code editing experience equipped with syntax highlighting, autocomplete, code folding, and bracket matching.
- **Multi-Framework Playgrounds**: Interactive sandboxes powered by StackBlitz WebContainers for React, Next.js, Node.js, NestJS, Django, and Angular.
- **Specialized REPL Runners**: Dedicated in-browser sandboxes for Docker commands, SQL queries (PostgreSQL / MySQL), MongoDB document queries, and Redis in-memory commands.

### 🎓 27 Comprehensive Tech Tracks
- **From Zero to Production**: Structured curricula spanning Frontend, Backend, DevOps, Systems Programming, Mobile, and Cloud Infrastructure.
- **Step-by-Step Learning Units**: Each track is partitioned into progressive levels (`Pemula`, `Menengah`, `Lanjutan`, `Profesional`) with weekly actionable exercises.
- **Instant Code Previews**: Every syllabus item includes pre-loaded boilerplate code that students can run, tweak, and test in real time.

### 🧭 Career Roadmaps & Knowledge Assessment
- **Curated Career Paths**: Guided learning journeys for aspiring *Fullstack Engineers*, *Go Backend & Systems Engineers*, and *DevOps & Cloud Architects*.
- **Interactive Practice Quizzes**: 100+ multiple-choice and code evaluation challenges per track to validate concepts before advancing.
- **Local Progress Tracking**: Automatic persistence of completed weeks, active courses, and quiz scores via `localStorage` with Zero-Login requirement.

### ⚡ Smart Search & Personalization
- **Fuse.js Fuzzy Search**: Instant, typo-tolerant search across all 27 tracks, materials, topics, and framework tags.
- **Bilingual Localization**: Seamless one-click switching between **Bahasa Indonesia** and **English (US)** across all UI elements and navigation.
- **Neo-Brutalist Theme Engine**: High-contrast, tactile UI aesthetic supporting smooth switching between Light Mode and Dark Mode.

---

## 🛠 Tech Stack

| Layer | Technologies | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19.0.1 + Vite 6.2.3 | Modern React with fast Hot Module Replacement (HMR) |
| **Styling & Design** | Tailwind CSS 4.1.14 | Modern utility-first CSS engine with Neo-Brutalist design tokens |
| **Language** | TypeScript 5.8 | End-to-end strict typing across curricula, tracks, and UI |
| **Animations** | Motion 12.23.24 | Fluid micro-interactions and tactile spring physics |
| **Code Editor** | Monaco Editor 0.56.0 | Embedded Visual Studio Code editing experience |
| **Go Code Engine** | Yaegi + WebAssembly | Client-side Go runtime executing safely in browser sandbox |
| **Web Sandbox** | StackBlitz SDK + WebContainers | Browser-based Node.js runtime and full-stack playgrounds |
| **Fuzzy Search** | Fuse.js 7.5.0 | High-performance client-side full-text search index |
| **Deployment** | Cloudflare Pages | Global low-latency CDN edge delivery with pre-rendered routes |

---

## 📚 Curriculum & 27 Learning Tracks Directory

| Track | Category | Levels | Weeks | Execution Runtime |
|---|---|:---:|:---:|---|
| **Go (Golang)** | Backend & Systems | 3 | 14 | In-Browser WebAssembly (Yaegi) |
| **React** | Frontend Library | 4 | 16 | WebContainers / StackBlitz |
| **Next.js** | Fullstack Framework | 4 | 16 | WebContainers / StackBlitz |
| **TypeScript** | Typed Language | 4 | 16 | Monaco Editor Sandbox |
| **JavaScript** | Language Core | 4 | 16 | Browser JS Runtime |
| **HTML5** | Web Markup | 3 | 14 | In-Browser HTML Sandbox |
| **CSS3** | Modern Styling | 3 | 14 | CSS Live Preview |
| **Tailwind CSS** | Styling Framework | 3 | 9 | Tailwind JIT Engine |
| **Python** | Language & AI | 5 | 18 | Client-side Python WASM |
| **Django** | Python Backend | 5 | 18 | Python Runtime Sandbox |
| **Docker** | Cloud & DevOps | 3 | 16 | Interactive Docker Terminal |
| **Node.js** | Backend Runtime | 4 | 16 | WebContainers Sandbox |
| **NestJS** | Enterprise Node | 3 | 16 | WebContainers Sandbox |
| **Rust** | Systems Programming | 3 | 14 | Rust WebAssembly Playground |
| **Vue** | Frontend Framework | 4 | 16 | WebContainers Sandbox |
| **Svelte** | Reactive Frontend | 4 | 16 | WebContainers Sandbox |
| **Angular** | Enterprise Frontend | 4 | 16 | WebContainers Sandbox |
| **Laravel** | PHP Framework | 5 | 20 | Browser PHP Playground |
| **CodeIgniter 4** | PHP Framework | 3 | 12 | Browser PHP Playground |
| **Spring Boot** | Java Enterprise | 4 | 16 | WebContainers Sandbox |
| **C# (.NET)** | Backend & Enterprise | 4 | 16 | Monaco C# Sandbox |
| **Ruby on Rails** | Fullstack Framework | 4 | 16 | Interactive Ruby Sandbox |
| **PostgreSQL** | Relational Database | 4 | 16 | Client-side SQL Engine |
| **MySQL** | Relational Database | 4 | 16 | Client-side SQL Engine |
| **MongoDB** | Document Database | 4 | 16 | Document Store Sandbox |
| **Redis** | In-Memory Database | 3 | 16 | In-Memory CLI Sandbox |
| **GraphQL** | API Architecture | 3 | 16 | Interactive GraphQL Runner |

---

## 🧪 Automated Testing & Verification Suite

The repository includes comprehensive automated test suites run directly against the codebase and live environment:

### 1. Vitest Unit Test Suite (`apps/web/tests/`)
Tests progress storage, localStorage fallback handling, and slug mapping consistency:
```bash
cd apps/web && npm test
```
*Output: `Test Files: 2 passed (2) | Tests: 15 passed (15) | 100% Success`*

### 2. Headless Screenshot Automation Suite (`scripts/capture_tryngo_screenshots.js`)
Captures all 20 desktop (1440x900) and mobile (390x844) viewport states directly from live production:
```bash
node scripts/capture_tryngo_screenshots.js
```
*Built with rendering delays (`4000ms – 7000ms`) ensuring Monaco editor instances, WebAssembly runtimes, and layout transitions settle before capturing.*

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
│       │   │   ├── CareerPathsModal.tsx
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

### Run Unit Tests
```bash
npm test
```

### Production Build & Deployment
```bash
# Build production bundle
npm run build

# Deploy to Cloudflare Pages
npm run deploy
```

---

## 👥 Authors & License

Developed with ❤️ by **Widi Firmansyah**.  
Open-source under the MIT License.
