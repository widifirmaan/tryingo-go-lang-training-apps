# Architecture - Tryngo Learning Platform

## System Overview

```
User Browser
    │
    ├── Cloudflare Pages (Frontend SPA)
    │   ├── index.html          (SPA shell)
    │   ├── styles/main.css     (Design system)
    │   ├── app.js              (Router + App init)
    │   ├── components/         (UI components)
    │   └── pages/              (Page views)
    │
    ├── Cloudflare Pages Functions (API)
    │   ├── api/curriculum.js   (Serve curriculum data)
    │   ├── api/playground.js   (Proxy to Playground Worker)
    │   └── api/progress.js     (Future: user progress)
    │
    └── Cloudflare Workers (Playground)
        ├── POST /go            (Forward to play.golang.org)
        └── POST /html          (Return sandbox HTML page)
```

## Frontend Architecture

### SPA Router
- Hash-based routing (`#/learn/golang`, `#/playground`, etc.)
- No page reloads, dynamic content loading
- Route patterns:
  - `#/` - Landing page
  - `#/learn/:language` - Language overview
  - `#/learn/:language/:module/:lesson` - Lesson content
  - `#/playground/:language` - Interactive playground
  - `#/dashboard` - User dashboard (future)

### Component Tree
```
App
├── Navbar (sticky, responsive hamburger)
├── RouterOutlet (dynamic content)
│   ├── LandingPage
│   │   ├── HeroSection
│   │   ├── LanguageCards (with search)
│   │   └── Footer
│   ├── DashboardLayout
│   │   ├── Sidebar (lesson navigation)
│   │   ├── ContentArea (markdown renderer)
│   │   └── PlaygroundPanel (code editor + preview)
│   └── PlaygroundPage
│       ├── CodeEditor
│       ├── RunButton
│       └── OutputArea
└── Footer
```

### Design System (CSS Custom Properties)
```css
:root {
  --color-primary: #00ADD8;     /* Go blue */
  --color-secondary: #E44D26;   /* HTML orange */
  --color-bg: #ffffff;
  --color-text: #1a1a2e;
  --color-text-muted: #6b7280;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 4rem;
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
  --container-max: 1280px;
}
```

### Responsive Breakpoints
- Mobile: < 640px (single column)
- Tablet: 640px - 1024px (2 columns)
- Desktop: > 1024px (3+ columns, sidebar visible)

## Data Flow

### Curriculum Data
```
Static JSON/JS files → Components render content
├── languages.json    (Available languages)
├── curriculum.json   (Module/lesson structure)
└── lessons/          (Markdown content files)
```

### Playground Execution Flow
```
User writes code → [Playground Worker] → Execute → Return output
    │
    ├── Go: Worker forwards to https://play.golang.org/compile
    │   Response: { Errors: "", Events: [{ Message: "...", Kind: "stdout" }] }
    │
    └── HTML: Worker generates sandbox HTML page URL
        User's HTML/CSS/JS injected into sandboxed iframe
```

## Security

### Playground Sandbox
- Go: All code sent to official Go playground API (no arbitrary execution on our infra)
- HTML: Rendered in sandboxed iframe with `sandbox` attribute:
  ```
  sandbox="allow-scripts allow-same-origin"
  ```
- CSP headers on all Pages responses
- Input sanitization on user-submitted code

### Future Auth
- Cloudflare Access or Auth0 integration
- JWT-based session management
- D1 database for user data

## Performance Targets
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3s
- Lighthouse Performance: > 90
- Playground round-trip: < 3s

## Deployment Topology

```
Production: tryngo.pages.dev
├── Branch: main
├── Auto-deploy on git push
└── Preview: PR-specific URLs

Playground API: playground.tryngo.workers.dev
└── Points to latest Playground Worker
```
