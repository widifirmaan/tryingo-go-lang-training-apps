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

### 1. Core Learning Experience & Track Discovery

| Hero Landing & Track Catalog | Curriculum & Multi-Framework Study |
| :---: | :---: |
| ![Hero Index](screenshots/Tryngo%20Index%20Desktop.png)<br>**Interactive Neo-Brutalist Hero Landing** | ![Track Grid](screenshots/Tryngo%20Grid%20Desktop.png)<br>**27-Track Curriculum Directory & Category Filters** |
| ![Course Page](screenshots/Tryngo%20Course%20Desktop.png)<br>**Go Track Deep-Dive Curriculum & Inline Runner** | ![React Course](screenshots/Tryngo%20Course%20React%20Desktop.png)<br>**React & TypeScript Interactive Curriculum** |
| ![Code Playground](screenshots/Tryngo%20Playground%20Desktop.png)<br>**Monaco Code Playground & Live WASM Execution** | ![Quiz Modal](screenshots/Tryngo%20Quiz%20Desktop.png)<br>**Interactive Practice Quiz & Knowledge Validation** |
| ![Search Modal](screenshots/Tryngo%20Search%20Desktop.png)<br>**Fuse.js Instant Fuzzy Search Modal** | ![Settings Modal](screenshots/Tryngo%20Settings%20Desktop.png)<br>**Neo-Brutalist Theme & Bilingual Switchers** |

---

### 2. Advanced Sandboxes & Aesthetic Modes

| Career Paths & Dark Theme | Mobile Responsive Experience |
| :---: | :---: |
| ![Career Paths](screenshots/Tryngo%20Career%20Paths%20Desktop.png)<br>**Structured Career Roadmaps (Frontend, Backend, DevOps)** | ![Dark Mode](screenshots/Tryngo%20Dark%20Mode%20Desktop.png)<br>**High-Contrast Neo-Brutalist Dark Theme** |
| ![Mobile Hero](screenshots/Tryngo%20Index%20Mobile.png)<br>**Mobile View: Hero & Quick Navigation** | ![Mobile Grid](screenshots/Tryngo%20Grid%20Mobile.png)<br>**Mobile View: Filterable Track Grid** |
| ![Mobile Course](screenshots/Tryngo%20Course%20Mobile.png)<br>**Mobile View: Weekly Course Material Reader** | ![Mobile Playground](screenshots/Tryngo%20Playground%20Mobile.png)<br>**Mobile View: Touch Code Playground** |
| ![Mobile Quiz](screenshots/Tryngo%20Quiz%20Mobile.png)<br>**Mobile View: Interactive Quiz Challenge** | ![Mobile Drawer](screenshots/Tryngo%20Hamburger%20Mobile.png)<br>**Mobile View: Slide-out Navigation Drawer** |

---

### 3. Mobile Responsive Showcase

| Mobile Search & Settings | Mobile Career & Dark Mode |
| :---: | :---: |
| ![Mobile Search](screenshots/Tryngo%20Search%20Mobile.png)<br>**Mobile: Real-Time Fuzzy Search** | ![Mobile Settings](screenshots/Tryngo%20Settings%20Mobile.png)<br>**Mobile: Preferences & Localization** |
| ![Mobile Career Paths](screenshots/Tryngo%20Career%20Paths%20Mobile.png)<br>**Mobile: Career Learning Roadmaps** | ![Mobile Dark Mode](screenshots/Tryngo%20Dark%20Mode%20Mobile.png)<br>**Mobile: High-Contrast Dark Mode** |

---

## 🚀 Key Features

### 🎓 27 Comprehensive Tech Tracks
- **Frontend & UI**: HTML5, CSS3, Tailwind CSS, JavaScript, TypeScript, React, Next.js, Vue, Angular, Svelte.
- **Backend & Systems**: Go (Golang), Node.js, NestJS, Python, Django, PHP, Laravel, CodeIgniter 4, Ruby on Rails, Rust, C# (.NET), Spring Boot.
- **Database & Storage**: PostgreSQL, MySQL, MongoDB, Redis, GraphQL.
- **DevOps & Infrastructure**: Docker, Linux Containers, Cloud Deployments.

### ⚡ Client-Side WebAssembly & Sandboxes
- **Yaegi Go WASM Interpreter**: Compiles and executes Go code entirely inside the browser without transmitting code to a backend server.
- **Monaco Code Editor**: Professional-grade code editor powered by VS Code’s core engine with autocompletion, bracket matching, and theme synchronization.
- **StackBlitz & WebContainer Bridge**: Runs full Node.js web applications, Vite bundlers, and npm dependencies directly within browser tabs.

### 🌐 Bilingual Curriculum Engine (ID & EN)
- Every single lesson includes native **Bahasa Indonesia** and **English** explanations, code commentary, and hands-on experiments.
- Instant language switching across navigation, course readers, and quiz assessments.

### 🔍 Instant Fuzzy Search (Fuse.js)
- Pre-compiled search index containing thousands of weekly curriculum topics, code snippets, and conceptual tags.
- Sub-millisecond keystroke fuzzy matching with direct deep-linking to lessons.

### 🎨 Neo-Brutalist Aesthetic & Theming
- Distinctive high-contrast visual design featuring punchy borders, tactile buttons, and fluid spring physics via `motion` (Framer Motion).
- Persistent **Light** and **Dark** theme modes saved locally with zero-flash rendering.

### 🗺️ Curated Career Roadmaps
- Structured learning paths guiding aspiring developers through **Frontend Specialist**, **Backend Architect**, **Fullstack Engineer**, and **Cloud DevOps Engineer** career trajectories.

---

## 🏗️ Technical Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Tryngo Platform Architecture                    │
└────────────────────────────────────────────────────────────────────────┘

    Client Layer (React 19 + Vite 6 + Tailwind CSS 4)
    ├── State-Based View Switcher & Hash Router (#/course/level/week)
    ├── Dynamic Motion Engine (Framer Motion / Motion 12)
    ├── Markdown Parser & Syntax Highlighter (React Markdown + Remark GFM)
    └── UI Modals: Search, Settings, Quiz, Career Paths
                       │
         ┌─────────────┼─────────────┐
         ▼                           ▼                           ▼
    Search Engine             Code Playgrounds            Course Curriculum
    ├── Fuse.js               ├── Monaco Editor           ├── 27 Tracks
    └── Pre-Indexed Data      ├── WebAssembly (Go)        ├── 4 Difficulty Levels
                              ├── WebContainers (Node)    ├── 16-20 Weeks Each
                              └── Docker Runner (CLI)     └── Bilingual Markdown
```

---

## 🛠 Tech Stack

| Layer | Technology | Details |
|---|---|---|
| **Frontend Framework** | React 19.0.1 | Concurrent React features, Suspense-driven code splitting |
| **Bundler & Build Tool**| Vite 6.2.3 | Lightning-fast HMR and optimized production asset pipeline |
| **Styling** | Tailwind CSS 4.1.14 | Modern utility-first CSS engine with custom Neo-Brutalist tokens |
| **Language** | TypeScript 5.8 | End-to-end strict typing across curricula, tracks, and UI |
| **Animations** | Motion 12.23.24 | Fluid micro-interactions and tactile spring physics |
| **Code Editor** | Monaco Editor 0.56.0 | Embedded Visual Studio Code editing experience |
| **Go Code Engine** | Yaegi + WebAssembly | Client-side Go runtime executing safely in sandbox |
| **Web Sandbox** | StackBlitz SDK + WebContainers | Browser-based Node.js runtime and full-stack playgrounds |
| **Fuzzy Search** | Fuse.js 7.5.0 | High-performance client-side full-text search |
| **Deployment** | Cloudflare Pages | Global low-latency CDN edge delivery |

---

## 📚 Curriculum & Tracks Directory

| Track | Category | Levels | Weeks | Interactive Sandbox |
|---|---|:---:|:---:|---|
| **Go (Golang)** | Backend | 3 | 14 | In-Browser WebAssembly (Yaegi) |
| **React** | Frontend | 4 | 16 | WebContainers / StackBlitz |
| **Next.js** | Fullstack | 4 | 16 | WebContainers / StackBlitz |
| **TypeScript** | Language | 4 | 16 | Monaco Editor Sandbox |
| **JavaScript** | Language | 4 | 16 | Browser JS Sandbox |
| **Python** | Language | 5 | 18 | Client-side Python WASM |
| **Django** | Backend | 5 | 18 | Python Runtime Sandbox |
| **Docker** | DevOps | 3 | 16 | Interactive Docker Terminal |
| **Node.js** | Backend | 4 | 16 | WebContainers Sandbox |
| **NestJS** | Backend | 3 | 16 | WebContainers Sandbox |
| **Rust** | Systems | 3 | 14 | Rust WebAssembly Playground |
| **Vue** | Frontend | 4 | 16 | WebContainers Sandbox |
| **Svelte** | Frontend | 4 | 16 | WebContainers Sandbox |
| **Laravel** | Backend | 5 | 20 | Browser PHP Playground |
| **PostgreSQL** | Database | 4 | 16 | Client-side SQL Engine |
| **MySQL** | Database | 4 | 16 | Client-side SQL Engine |
| **MongoDB** | Database | 4 | 16 | Document Store Sandbox |
| **Redis** | Database | 3 | 16 | In-Memory CLI Sandbox |
| **GraphQL** | API | 3 | 16 | Interactive GraphQL Schema Runner |

---

## 📂 Project Structure

```bash
/
├── apps/
│   └── web/                    # Main Web Application
│       ├── public/
│       │   ├── data/course/    # Course markdown materials (27 tracks x levels x weeks)
│       │   ├── search-index.json # Pre-compiled Fuse.js search index
│       │   └── wasm/           # Yaegi WebAssembly execution binaries
│       ├── scripts/            # Curriculum and sitemap generator scripts
│       ├── src/
│       │   ├── assets/         # SVG technology logos & brand graphics
│       │   ├── components/     # Reusable UI, Modals, & Playgrounds
│       │   │   ├── playgrounds/# Specialised language playground runners
│       │   │   ├── CareerPathsModal.tsx
│       │   │   ├── CodePlayground.tsx
│       │   │   ├── CoursePage.tsx
│       │   │   ├── HeroSection.tsx
│       │   │   ├── Modals.tsx
│       │   │   ├── QuizModal.tsx
│       │   │   └── TrackCard.tsx
│       │   ├── data/           # Curriculum configurations, tracks & slug mappings
│       │   ├── utils/          # Bilingual translation map & color tokens
│       │   ├── App.tsx         # Root application & state router
│       │   └── main.tsx        # React entrypoint
│       ├── package.json
│       └── vite.config.ts
├── screenshots/                # Comprehensive desktop & mobile screenshots
├── scripts/
│   └── capture_tryngo_screenshots.js # Automated Puppeteer capture script
└── README.md
```

---

## 🧪 Automated Screenshot Suite

The repository includes a headless Chromium automation script that captures all desktop and mobile views directly against the live production deployment:

```bash
node scripts/capture_tryngo_screenshots.js
```

Built with deliberate render delays (`4000ms – 7000ms`) to ensure Monaco editor instances, WebAssembly runtimes, and Framer Motion layout springs settle before taking each snapshot.

---

## 📦 Getting Started & Local Development

### Prerequisites
- **Node.js 20+** or **Node.js 22+**
- **npm**, **pnpm**, or **yarn**

### Installation
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

### Build for Production
```bash
npm run build
```

### Deploy to Cloudflare Pages
```bash
npm run deploy
```

---

## 👥 Authors & License

Developed with ❤️ by **Widi Firmansyah**.  
Open-source under the MIT License.
