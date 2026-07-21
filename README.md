# Tryngo - Interactive Programming Learning Platform

Learn programming from zero to professional with built-in interactive playground. Start with **Go (Golang)** and **HTML5**, with more languages coming soon.

## Features

- **Structured Curriculum** — Bootcamp-quality content: 52 weeks of Go, 24 weeks of HTML5
- **Interactive Playground** — Write and run code in your browser (like W3Schools)
- **Project-Based** — Build real projects at every level
- **Fully Responsive** — Desktop, tablet, and mobile
- **Enterprise-Grade** — Deployed on Cloudflare Pages + Workers
- **Multi-Language** — Python, JavaScript, TypeScript, Rust coming soon

## Quick Start

### Frontend (Cloudflare Pages)

```bash
cd apps/web
npm install
npx wrangler pages dev . --bindings
```

### Playground Worker

```bash
cd apps/playground
npm install
npx wrangler dev
```

## Deployment

```bash
# Deploy frontend
cd apps/web
npx wrangler pages deploy . --project-name=tryngo-web

# Deploy playground worker
cd apps/playground
npx wrangler deploy
```

## Project Structure

```
tryingo-go-lang-training-apps/
├── docs/                           # Documentation
│   ├── AI_GUIDANCE.md             # Resume instructions for AI
│   ├── PROJECT_PLAN.md            # Roadmap & milestones
│   ├── CURRICULUM.md              # Full curriculum
│   └── ARCHITECTURE.md            # Technical architecture
├── apps/
│   ├── web/                       # Cloudflare Pages frontend
│   │   ├── index.html            # SPA shell
│   │   ├── styles/main.css       # Design system
│   │   ├── app.js                # Main entry
│   │   ├── utils/                # Router, DOM helpers
│   │   ├── pages/                # Page components
│   │   ├── components/           # UI components
│   │   ├── data/                 # Language & curriculum data
│   │   ├── functions/api/        # Pages Functions
│   │   └── wrangler.toml         # CF Pages config
│   └── playground/               # Cloudflare Worker
│       └── src/index.js          # Code execution API
├── materials/                     # Learning content (loaded dynamically as markdown)
│   ├── golang/                   # 248 files across 52 weeks
│   │   ├── beginner/             # 6 weeks
│   │   ├── intermediate/         # 10 weeks
│   │   ├── advanced/             # 10 weeks
│   │   └── professional/         # 26 weeks
│   └── html/                     # 118 files across 24 weeks
│       ├── beginner/             # 8 weeks
│       └── advanced/             # 16 weeks
└── README.md
```

## Tech Stack

| Component | Technology |
|-----------|------------|
| Hosting | Cloudflare Pages |
| Frontend | Vanilla JS SPA |
| Styling | CSS Custom Properties, Grid, Flexbox |
| API | Cloudflare Pages Functions |
| Code Execution | Cloudflare Workers |
| Storage (future) | Cloudflare D1, KV |

## License

MIT
