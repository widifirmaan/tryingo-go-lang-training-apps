# Tryngo - AI Agent Guidance

## Project Identity
- **Name**: Tryngo - Interactive Coding Education Platform
- **Stack**: React 19 + Vite 6 + Tailwind CSS 4
- **Deploy**: Cloudflare Pages (SPA)
- **Domain**: Programming education from zero to professional

## Quick Start
```bash
cd apps/web
npm install
npm run dev          # Dev at http://localhost:3000
npm run build        # Build to dist/
npx wrangler pages deploy dist
```

## Key Architecture Decisions
1. **No router library** — Simple state-based view switching (isExploring, activeCourseId)
2. **Markdown materials** — Stored in `public/data/course/` for easy editing. Four tracks have custom curriculum: HTML5 (12 weeks), CSS3 (14 weeks), Go (14 weeks), Rust (14 weeks). Other tracks use DEFAULT_CURRICULUM.
3. **Curriculum generators** — `scripts/generate-go-materials.mjs`, `scripts/generate-rust-materials.mjs`, `scripts/generate-css-materials.mjs` each create 28 course files. Old `generate-full-curriculum.mjs` was deleted with the 864 old template files.
4. **Monaco Editor** — For interactive code playground
5. **i18n** — Simple string map in `utils/translations.ts`
6. **Go client-side execution** — Yaegi interpreter compiled to WASM (`wasm-exec/main.go`). Binary `public/wasm/go-exec.wasm` + runtime `wasm_exec.js` (gitignored). Falls back to Cloudflare Worker when WASM unavailable.
7. **Playground content matching** — `extractCode()` in CoursePage.tsx extracts code blocks from markdown → passes as `initialCode` to CodePlayground, so each week's playground is pre-filled with that week's examples.
4. **Monaco Editor** — For interactive code playground
5. **i18n** — Simple string map in `utils/translations.ts`

## Current State (July 2026)
### What Works
- Full curriculum: 27 tracks × 4 levels × 4 weeks × 2 languages = 864 markdown files
- Hero → Explore → Course navigation flow
- CoursePage with level/week picker
- Interactive CodePlayground (Monaco Editor + live preview for web languages)
- Responsive layout (desktop/tablet/mobile)
- Dark/light mode
- Indonesian + English translations

### Recently Added (July 2026)
- **Server-side code execution (free)**: Cloudflare Worker at `workers/code-execution/` — JavaScript runs via `new Function()`, Go/Python/TypeScript return helpful messages directing to client-side WASM. Go execution is 100% client-side via TinyGo + Yaegi WASM. Requires `VITE_EXECUTION_WORKER_URL` env var.
- **Full-text search across course materials**: Build-time index (`scripts/build-search-index.mjs`) creates `search-index.json` from all .md files. Fuse.js powers fuzzy search in the SearchModal. Two search tabs: "Modul" (track metadata) and "Materi Kursus" (course content).
- **Accessibility**: `lang` attribute syncs with language setting, `role="main"` / `role="application"` landmarks, `focus-visible` keyboard outlines, skip-to-content CSS, meta description + theme color, ARIA labels on navigation.
- **Go curriculum redesign** (14 weeks, 3 levels): Beginner (6w: syntax → packages), Intermediate (4w: defer → stdlib), Advanced (4w: CLI/HTTP → final project). Based on research from Scaler, LevelUpGo, roadmap.sh, bytesizego, tutorialQ, and official Go docs. Covers the two project shapes 73-74% of Go devs ship: CLI tools + HTTP services.
- **Client-side Go execution**: Yaegi interpreter compiled to WebAssembly. `public/wasm/go-exec.wasm` (~38MB) + `wasm_exec.js` runtime. Loaded dynamically; auto-falls back to Cloudflare Worker when unavailable. All 28 .md files include runnable code examples pre-loaded in the playground.
- **Playground content matching**: Each week's playground is pre-filled with code blocks from that week's markdown materials, like w3schools interactive tutorials.

### Needs Implementation
- Quiz system with scoring
- User progress tracking (localStorage)
- Service worker for offline access
- Vitest unit tests
- Accessibility audit (automated testing with axe-core)

## Common AI Commands

### Generate Go Curriculum
```bash
node apps/web/scripts/generate-go-materials.mjs
```
Creates 28 Go .md files (14 weeks × 2 languages) from templates with objectives, theory, code examples, and exercises.

### Add New Language Track
1. Add SVG logo to `apps/web/src/assets/logos/`
2. Add entry in `apps/web/src/data/tracksData.ts`
3. Add SLUG_MAP entry in `apps/web/src/data/curriculum.ts`
4. Add to TRACKS in `apps/web/scripts/generate-full-curriculum.mjs`
5. Run curriculum generator

### Modify Course Content
Edit markdown files directly in:
```
apps/web/public/data/course/{slug}/{level}/{lang}/week{N}-{topic}.md
```

### Modify UI
- Cards: `apps/web/src/components/TrackCard.tsx`, `ProductCardMale/Female.tsx`
- Course view: `apps/web/src/components/CoursePage.tsx`
- Playground: `apps/web/src/components/CodePlayground.tsx`
- Sidebar: `apps/web/src/components/HeroSection.tsx`

## Material Structure
Each markdown file follows this template (code-first format for Go):
```
# Title

> Metadata (category, level, week)

## Learning Objectives
- ...

---

## Program: [Name]

\`\`\`go
// One complete, runnable Go program demonstrating all concepts for this week
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

## Playground Architecture
- **Client-side languages** (HTML/CSS/JS/TS): Monaco Editor → iframe sandbox preview
- **Server-side languages** (Go, Python, etc.): Monaco Editor → POST to Cloudflare Worker → WASM execution → return output
- **Go (client-side WASM)**: Two-tier WASM approach:
  1. **TinyGo runner** (pre-compiled, 663KB) — `wasm-exec/examples/tinygo-runner.go` compiles week examples into a single WASM. Auto-runs via `runTinyGoWeek(weekNum)` on mount. Covers basic constructs (vars, loops, functions, structs, interfaces, goroutines, channels). Cannot run `net/http`, `os.File`, `database/sql`, `flag`.
  2. **Yaegi interpreter** (runtime, 38MB) — `wasm-exec/main.go` interprets arbitrary Go code. Used as fallback when TinyGo can't handle the code (modified/user code).
  3. Falls back to Cloudflare Worker when neither WASM is available.
- `src/utils/goWasmLoader.ts` — Lazy-loads both WASM binaries + runtimes, auto-falls back to Worker
- The `CodePlayground.tsx` receives `week` prop to trigger TinyGo auto-run on mount

## Design System
- Primary color: `#2E5B44` (Forest Moss Green)
- Background: `#EFECE6` (light) / `#121417` (dark)
- Cards: Language-specific colors per trackData
- Typography: Inter (system), monospace for code
