# AI Guidance - Tryngo: Go & HTML Learning Platform

## Project Identity
- **Name**: Tryngo (Go & HTML Training Apps)
- **Domain**: Learning platform for programming languages
- **Current Phase**: Content complete (Go 52 weeks + HTML 24 weeks), interactive exercises added
- **Deployment**: Cloudflare Pages (frontend) + Cloudflare Workers (playground API)
- **Stack**: Vanilla JS SPA, Cloudflare Pages Functions, Cloudflare Workers

## Project Structure
```
tryingo-go-lang-training-apps/
├── docs/                          # Documentation
│   ├── AI_GUIDANCE.md             # Resume instructions
│   ├── PROJECT_PLAN.md            # Roadmap & milestones
│   ├── CURRICULUM.md              # Complete curriculum
│   └── ARCHITECTURE.md            # Technical architecture
├── apps/
│   ├── web/                       # Cloudflare Pages frontend
│   │   ├── index.html            # SPA shell
│   │   ├── app.js                # Main entry + routing
│   │   ├── styles/main.css       # Design system (CSS Custom Properties)
│   │   ├── utils/
│   │   │   ├── router.js         # Hash-based SPA router
│   │   │   └── markdown.js       # Markdown-to-HTML converter
│   │   ├── pages/                # landing, learn, lesson, playground
│   │   ├── components/           # exercises.js (interactive MC + code challenges)
│   │   ├── data/
│   │   │   ├── languages.js      # Available languages config
│   │   │   ├── curriculum.js     # Module/lesson structure
│   │   │   ├── lessons.js        # Dynamic markdown loader (fetches from /materials/)
│   │   │   └── exercises.js      # Multiple-choice + code challenge data
│   │   ├── materials/            # 366+ markdown files (served as static assets)
│   │   │   ├── golang/           # 248 files (52 weeks, 4 levels)
│   │   │   └── html/             # 118 files (24 weeks, 2 levels)
│   │   ├── functions/api/        # Pages Functions (playground proxy)
│   │   ├── package.json
│   │   ├── wrangler.toml
│   │   └── _routes.json          # SPA fallback routing
│   └── playground/               # Cloudflare Worker
│       ├── src/index.js          # Go proxy + HTML sandbox
│       ├── package.json
│       └── wrangler.toml
└── README.md
```

## How to Resume Work

### Read first
1. `docs/PROJECT_PLAN.md` - Current milestone, completed items, next tasks
2. `docs/ARCHITECTURE.md` - System design, component tree, data flow
3. `docs/CURRICULUM.md` - What content exists and what's missing

### Key files to understand
- `apps/web/index.html` - Main entry point (SPA shell with Navbar + Footer)
- `apps/web/app.js` - App initialization, route registration
- `apps/web/utils/router.js` - Hash-based SPA router with params support
- `apps/web/utils/markdown.js` - Lightweight markdown to HTML parser
- `apps/web/data/lessons.js` - Fetches markdown from `/materials/{lang}/{level}/{module}/{lesson}.md`
- `apps/web/data/exercises.js` - Interactive exercises (MCQ + code challenges)
- `apps/web/pages/lesson.js` - Lesson view with sidebar, content, exercises, prev/next nav
- `apps/web/styles/main.css` - Complete design system with responsive breakpoints
- `apps/web/functions/api/playground.js` - Pages Function for code execution API

### Content loading flow
1. User clicks lesson → `lesson.js` page renders
2. `getLessonContent()` → fetches `materials/{lang}/{level}/{module}/{id}.md`
3. Markdown parsed to HTML by `utils/markdown.js`
4. Cached in `lessonCache` Map for instant reload
5. Exercises loaded from `data/exercises.js` after content

### Development commands
```bash
cd apps/web
npm install
npx wrangler pages dev . --bindings

cd apps/playground
npm install
npx wrangler dev
```

### Deployment commands
```bash
cd apps/web
npx wrangler pages deploy . --project-name=tryngo-web

cd apps/playground
npx wrangler deploy
```

### Content creation workflow
1. Create markdown file in `apps/web/materials/{lang}/{level}/{module}/{lesson-id}.md`
2. Ensure lesson ID matches curriculum.js entry
3. Add exercises in `apps/web/data/exercises.js` (optional)
4. Test with `npx wrangler pages dev . --bindings`

### Architecture decisions log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-07-21 | Vanilla JS SPA | Zero framework lock-in, max performance on CF Pages |
| 2026-07-21 | CSS Custom Properties | Consistent theming, easy dark mode later |
| 2026-07-21 | Hash-based routing | No CF Pages config needed for SPA fallback |
| 2026-07-21 | Go playground via proxy | Workers can't run Go binaries; official API is reliable |
| 2026-07-21 | HTML sandbox via Worker | Content Security Policy + srcdoc iframe |
| 2026-07-21 | Markdown materials as static files | Served by CF Pages, loaded via fetch(), no build step |
| 2026-07-21 | Lightweight markdown parser | Avoid external deps, ~100 lines, handles code blocks/tables |
| 2026-07-21 | Interactive exercises in JS data | Simple JSON, no DB needed; can migrate later |

### Known issues / Gotchas
- Go playground API (play.golang.org) has rate limits
- HTML lesson files for week 1 need lesson IDs matching (01-how-web-works, 04-tools)
- SPA fallback: `_routes.json` routes all paths to index.html
- Markdown parser is basic - complex nested lists may not render perfectly
- Exercise system checks substring match for code challenges (not AST-based)

### Future considerations
- User auth (Cloudflare Access or Auth0)
- D1 database for progress tracking + user-submitted exercise results
- AI-powered code review for playground
- Replace markdown parser with marked.js or similar
- Add Python, JavaScript, TypeScript, Rust
