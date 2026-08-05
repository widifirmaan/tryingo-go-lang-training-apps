# Tryngo — Interactive Coding Education Platform

**Tryngo** is a web-based interactive coding education platform that teaches programming from zero to professional. Built as a single-page application with React 19, Vite 6, and Tailwind CSS 4, deployed on Cloudflare Pages.

[![Status](https://img.shields.io/badge/Status-Active%20Development-success)](https://github.com/widifirmaan/tryingo-go-lang-training-apps)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-purple)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-4-38BDF8)](https://tailwindcss.com/)
[![Deploy](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-orange)](https://pages.cloudflare.com/)

---

## 📸 Application Showcase

<table>
<tr>
<th width="30%">📱 Mobile</th>
<th width="70%">🖥 Desktop</th>
</tr>
<tr>
<td>

![Index Mobile](/screenshot/Tryngo%20Index%20Mobile.png)
**Index Mobile**

</td>
<td>

![Index Desktop](/screenshot/Tryngo%20Index%20Desktop.png)
**Index Desktop**

</td>
</tr>
<tr>
<td>

![Grid Mobile](/screenshot/Tryngo%20Grid%20Mobile.png)
**Grid Mobile**

</td>
<td>

![Grid Desktop](/screenshot/Tryngo%20Grid%20Desktop.png)
**Grid Desktop**

</td>
</tr>
<tr>
<td>

![Settings Mobile](/screenshot/Tryngo%20Settings%20Mobile.png)
**Settings Mobile**

</td>
<td>

![Settings Desktop](/screenshot/Tryngo%20Settings%20Desktop.png)
**Settings Desktop**

</td>
</tr>
<tr>
<td>

![Search Mobile](/screenshot/Tryngo%20Search%20Mobile.png)
**Search Mobile**

</td>
<td>

![Search Desktop](/screenshot/Tryngo%20Search%20Desktop.png)
**Search Desktop**

</td>
</tr>
<tr>
<td>

![Course Mobile](/screenshot/Tryngo%20Course%20Mobile.png)
**Course Mobile**

</td>
<td>

![Course Desktop](/screenshot/Tryngo%20Course%20Desktop.png)
**Course Desktop**

</td>
</tr>
<tr>
<td>

![Playground Mobile](/screenshot/Tryngo%20Playground%20Mobile.png)
**Playground Mobile**

</td>
<td>

—

</td>
</tr>
<tr>
<td>

![Hamburger Mobile](/screenshot/Tryngo%20Hamburger%20Mobile.png)
**Hamburger Mobile**

</td>
<td>

—

</td>
</tr>
<tr>
<td>

![Index Modal Desktop](/screenshot/Tryngo%20Index%20Modal%20Desktop.png)
**Index Modal Desktop**

</td>
<td>

—

</td>
</tr>
</table>

---

## 🚀 Features

### Learning

- **27 Tracks** across multiple programming languages and frameworks
- **4 Levels** per track (Beginner → Intermediate → Advanced → Professional)
- **16 Weeks** per track with progressive curriculum
- **Bilingual Content** — Indonesian and English materials for every lesson
- **Interactive Code Playground** — Monaco Editor with live preview for web languages
- **Client-side Go Execution** — Yaegi interpreter compiled to WebAssembly
- **Full-text Search** — Fuse.js-powered fuzzy search across all course materials

### Tracks

| Track | Language | Levels | Weeks | Playground |
|-------|----------|--------|-------|------------|
| HTML5 | HTML | — | 12 | Browser |
| CSS3 | CSS | — | 14 | Browser |
| JavaScript | JS | — | 16 | Browser |
| TypeScript | TS | — | 16 | Browser |
| Go | Go | 3 | 14 | WASM + Worker |
| React | JS/TS | — | 16 | Browser |
| Next.js | TS | — | 16 | Browser |
| Vue | JS/TS | — | 16 | Browser |
| Angular | TS | 1 | 16 | Browser |
| Svelte | JS/TS | — | 16 | Browser |
| Node.js | JS | 4 | 16 | Browser |
| NestJS | TS | 3 | 16 | Browser |
| Django | Python | 5 | 18 | Worker |
| Laravel | PHP | 5 | 20 | Browser |
| CodeIgniter 4 | PHP | 1 | 16 | Browser |
| PHP | PHP | 1 | 16 | Browser |
| Rust | Rust | — | 14 | WASM |
| Spring Boot | Java | — | 16 | Browser |
| C# (.NET) | C# | — | 16 | Browser |
| PostgreSQL | SQL | — | 16 | Browser |
| MySQL | SQL | — | 16 | Browser |
| MongoDB | NoSQL | — | 16 | Browser |
| Redis | NoSQL | — | 16 | Browser |
| GraphQL | Query | — | 16 | Browser |
| Docker | DevOps | — | 16 | Browser |

### UI/UX

- **Responsive Design** — Desktop, tablet, and mobile layouts
- **Dark/Light Mode** — Theme toggle with persistent preference
- **Neo-Brutalist Design** — Distinctive visual language with bold borders and shadows
- **i18n** — Indonesian + English translations
- **Accessibility** — ARIA landmarks, lang attribute sync, keyboard navigation, skip-to-content

---

## 🛠 Tech Stack

### Frontend

- **Framework**: React 19
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **Editor**: Monaco Editor (for interactive code playground)
- **Routing**: State-based view switching (no router library)
- **i18n**: Simple string map in utils/translations.ts

### Backend & Infrastructure

- **Deployment**: Cloudflare Pages (SPA)
- **Code Execution**: Cloudflare Workers (server-side) + WebAssembly (client-side)
- **Search**: Build-time index with Fuse.js fuzzy search
- **Go Runtime**: Yaegi interpreter compiled to WASM + TinyGo pre-compiled runner

### Development

- **Language**: TypeScript
- **Package Manager**: npm
- **Linting**: TypeScript compiler (tsc --noEmit)

---

## 📂 Project Structure

```
tryingo-go-lang-training-apps/
├── apps/
│   └── web/                    # Main web application
│       ├── public/
│       │   ├── data/course/    # Course materials (27 tracks x levels x weeks)
│       │   ├── search-index.json  # Build-time search index
│       │   └── wasm/           # WebAssembly binaries (Go execution)
│       ├── scripts/            # Curriculum generators and build scripts
│       ├── src/
│       │   ├── components/     # React components
│       │   ├── data/           # Curriculum data and track configuration
│       │   ├── utils/          # Utility functions and translations
│       │   └── styles/         # Global styles
│       └── vite.config.ts
├── workers/                    # Cloudflare Workers
│   └── code-execution/         # Server-side code execution worker
├── screenshot/                 # Application screenshots
├── .wrangler/                  # Cloudflare local state
├── .gitignore
├── AGENTS.md                   # AI agent guidance
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
cd apps/web
npm install
```

### Development

```bash
npm run dev          # Dev server at http://localhost:3000
```

### Build

```bash
npm run build        # Lint + build search index + Vite production build
```

### Deployment

```bash
npx wrangler pages deploy dist
```

---

## 📝 Adding a New Track

1. Add SVG logo to `apps/web/src/assets/logos/`
2. Add entry in `apps/web/src/data/tracksData.ts`
3. Add SLUG_MAP entry in `apps/web/src/data/curriculum.ts`
4. Add to `CUSTOM_CURRICULA` and `LEVEL_BADGE_COLORS` in curriculum.ts
5. Register in `build-search-index.mjs` LEVEL_MAP
6. Register in `CoursePage.tsx` (isStackBlitz, stackBlitzMainFile, stackBlitzTitle)
7. Register in `CodePlayground.tsx` LANGUAGE_MAP
8. Write generator script in `scripts/generate-{track}-materials.mjs`
9. Run generator -> lint -> build -> smoke test

---

## 📖 Material Structure

Each lesson markdown file follows this template:

```markdown
# Title

> Metadata (category, level, week)

## Learning Objectives
- ...

---

## Program: [Name]

\`\`\`language
// Complete runnable code example
\`\`\`

---

## Explanation
Key concepts referencing the code above

---

## Experiments
Modification ideas for the playground

---

## Challenge
Build something using the concepts

---

## Summary
Key takeaways + next week preview
```

---

## 🔧 Curriculum Generators

| Script | Track | Output |
|--------|-------|--------|
| `generate-go-materials.mjs` | Go | 28 files |
| `generate-rust-materials.mjs` | Rust | 28 files |
| `generate-css-materials.mjs` | CSS3 | 28 files |
| `generate-django-materials.mjs` | Django | 72 files |
| `generate-laravel-materials.mjs` | Laravel | 40 files |
| `generate-nodejs-materials.mjs` | Node.js | 64 files |
| `generate-nestjs-materials.mjs` | NestJS | 64 files |
| `generate-php-materials.mjs` | PHP | 32 files |
| `generate-codeigniter4-materials.mjs` | CodeIgniter 4 | 32 files |
| `generate-angular-materials.mjs` | Angular | 32 files |

---

## 👥 Authors

Developed by **Widi Firmansyah**.

## License

MIT

## Resources

[Readme](#readme-ov-file)
[Activity](https://github.com/widifirmaan/tryingo-go-lang-training-apps/activity)
[Stars](https://github.com/widifirmaan/tryingo-go-lang-training-apps/stargazers)
[Issues](https://github.com/widifirmaan/tryingo-go-lang-training-apps/issues)
