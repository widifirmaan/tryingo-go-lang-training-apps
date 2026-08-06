# GENERATOR INSTRUCTIONS — Research-Backed Curriculum

## Your Task
Create generator files for your assigned tracks. Each generator produces:
1. Markdown files in `public/data/course/{slug}/{level}/{lang}/week{N}-{topic}.md`
2. A curriculum file in `src/data/curricula/{slug}.ts`

## Architecture
- Base class: `scripts/lib/base-generator.mjs` (import { BaseGenerator })
- Reference: `scripts/generate-go-materials.mjs` (working example)
- Curriculum registry: `src/data/curriculum.ts` (imports from curricula/)

## Rules
1. **Research-backed structure ONLY** — week/level counts from bootcamp/docs, NOT from existing app
2. **Dynamic markdown format** — each track uses format suited to its content (code-first for backend, visual for web, etc.)
3. **Client-side playground priority** — runnable code examples where possible
4. **### sub-headings** in explanations for each concept
5. **Bilingual** — all content in Indonesian (id) and English (en)

## Module Structure
Each module object needs:
```js
{
  week: Number,           // Global week number (sequential across levels)
  level: 'beginer' | 'intermediate' | 'advanced',  // or custom level ID
  topicId: 'kebab-case',  // Used in filename
  titleId: 'Indonesian', titleEn: 'English',
  programId: 'Indonesian', programEn: 'English',  // Program title
  levelNameId: 'Indonesian', levelNameEn: 'English',  // Level display name
  language: 'go',         // Code block language (go, js, python, html, css, etc.)
  code: `...`,            // Runnable code example
  objectivesId: [...], objectivesEn: [...],  // Learning objectives (5 items)
  explanationId: '...', explanationEn: '...',  // ### sub-headings for each concept
  experimentsId: [...], experimentsEn: [...],  // 4-5 experiment ideas
  challengeId: '...', challengeEn: '...',  // Weekly challenge
  summaryId: '...', summaryEn: '...',  // Summary + next week preview
}
```

## Level Structure
```js
const LEVELS = [
  {
    levelId: 'beginer',       // Unique ID
    nameId: 'Pemula', nameEn: 'Beginner',
    descId: '...', descEn: '...',
  },
  // ... more levels
];
```

## Generation Pattern
```js
import { BaseGenerator } from './lib/base-generator.mjs';
const gen = new BaseGenerator('slug', 'Track Name');
const LEVELS = [ /* level definitions */ ];
const MODULES = [ /* module definitions */ ];

// Add weeks to levels
for (const level of LEVELS) {
  level.weeks = MODULES.filter(m => m.level === level.levelId).map(m => ({
    week: m.week, topicId: m.topicId, titleId: m.titleId, titleEn: m.titleEn,
  }));
}

gen.writeFiles(MODULES, LEVELS);
```

## After Creating Generator
1. Run: `node scripts/generate-{slug}-materials.mjs`
2. Verify files created in `public/data/course/{slug}/`
3. Verify curriculum file in `src/data/curricula/{slug}.ts`
4. Run: `npx tsc --noEmit --skipLibCheck` (check no app errors)

## Research-Backed Structures (per track)

### HTML5 (MDN, freeCodeCamp, W3Schools)
- 1 level, 14 weeks
- Basics → Text → Links → Images → Lists → Tables → Forms → Validation → Semantic → Multimedia → APIs → Accessibility → SEO → Project

### CSS3 (MDN, freeCodeCamp, CSS-Tricks)
- 1 level, 12 weeks
- Selectors → Box Model → Colors/Text → Flexbox → Grid → Positioning → Responsive → Animations → Variables → Architecture → Modern → Project

### JavaScript (MDN, Eloquent JS, freeCodeCamp)
- 3 levels, 14 weeks
- Beginner (5w): Basics, Types, Control Flow, Functions, DOM
- Intermediate (5w): Events, Async, ES6+, Modules, Error Handling
- Advanced (4w): Patterns, Testing, Performance, Project

### TypeScript (Official Handbook, Total TypeScript)
- 1 level, 12 weeks
- Basics → Types → Functions → Interfaces → Generics → Classes → Utility Types → Config → Testing → Patterns → Project

### React (Official Docs, Epic React)
- 3 levels, 12 weeks
- Beginner (4w): JSX, Components, Props, State
- Intermediate (4w): Effects, Router, Context, Forms
- Advanced (4w): Patterns, Testing, Performance, Project

### Next.js (Official Docs)
- 3 levels, 12 weeks
- Beginner (4w): Setup, Routing, Layouts, Components
- Intermediate (4w): Data Fetching, Server Actions, Forms
- Advanced (4w): Auth, Database, Deployment, Project

### Vue (Official Docs, Vue Mastery)
- 3 levels, 12 weeks
- Beginner (4w): Basics, Reactivity, Directives, Events
- Intermediate (4w): Components, Router, Pinia
- Advanced (4w): Testing, Performance, Nuxt, Project

### Angular (Official Docs)
- 3 levels, 14 weeks
- Beginner (5w): Components, Templates, Directives, Services
- Intermediate (5w): Routing, Forms, HTTP, RxJS
- Advanced (4w): State, Testing, Performance, Project

### Svelte (Official Docs)
- 2 levels, 10 weeks
- Beginner (5w): Basics, Reactivity, Props, Events, Stores
- Intermediate (5w): Routing, Actions, Transitions, Project

### Node.js (Official Docs, NodeSchool)
- 3 levels, 12 weeks
- Beginner (4w): Basics, Modules, File System, Events
- Intermediate (4w): Express, REST API, Auth, Database
- Advanced (4w): Testing, Performance, Deployment, Project

### NestJS (Official Docs)
- 3 levels, 12 weeks
- Beginner (4w): Controllers, Providers, Modules, DI
- Intermediate (4w): Pipes, Guards, ORM, Auth
- Advanced (4w): Testing, WebSockets, Microservices, Project

### Python (Official Tutorial, Automate Boring Stuff, Real Python)
- 3 levels, 12 weeks
- Beginner (4w): Basics, Types, Control Flow, Functions
- Intermediate (4w): Collections, OOP, File I/O, Error Handling
- Advanced (4w): Libraries, Testing, CLI, Project

### Django (Official Docs, Two Scoops)
- 3 levels, 12 weeks
- Beginner (4w): Setup, Models, Views, Templates
- Intermediate (4w): Forms, Auth, Admin, REST
- Advanced (4w): Testing, Caching, Deployment, Project

### PHP (Official Docs, PHP The Right Way)
- 2 levels, 12 weeks
- Beginner (6w): Syntax, Types, Control Flow, Functions, Arrays, OOP
- Intermediate (6w): Security, PDO, Composer, Testing, Patterns, Project

### Laravel (Official Docs, Laravel Daily)
- 3 levels, 12 weeks
- Beginner (4w): Setup, Routing, Blade, Eloquent
- Intermediate (4w): Auth, Relationships, Validation, File Storage
- Advanced (4w): Testing, Queues, APIs, Project

### CodeIgniter 4 (Official Docs)
- 2 levels, 10 weeks
- Beginner (5w): Setup, Controllers, Views, Models, Database
- Intermediate (5w): Validation, Auth, REST, Testing, Project

### Ruby on Rails (Official Guide, Rails Tutorial)
- 3 levels, 12 weeks
- Beginner (4w): Setup, MVC, Migrations, Views
- Intermediate (4w): Auth, Associations, Testing, APIs
- Advanced (4w): Performance, Background Jobs, Deployment, Project

### Rust (Official Book, Rust by Example)
- 3 levels, 14 weeks
- Beginner (6w): Basics, Ownership, Structs, Enums, Collections, Error Handling
- Intermediate (4w): Traits, Generics, Lifetimes, Testing
- Advanced (4w): Smart Pointers, Concurrency, Macros, Project

### C# (Official Docs, C# in Depth)
- 3 levels, 12 weeks
- Beginner (4w): Basics, Types, Control Flow, OOP
- Intermediate (4w): LINQ, Async, Generics, Error Handling
- Advanced (4w): Patterns, Testing, APIs, Project

### Spring Boot (Official Docs, Baeldung)
- 3 levels, 14 weeks
- Beginner (5w): Setup, DI, Controllers, JPA, REST
- Intermediate (5w): Security, Testing, Validation, Actuator
- Advanced (4w): Caching, Async, Deployment, Project

### Docker (Official Docs, Docker Deep Dive)
- 3 levels, 12 weeks
- Beginner (4w): Concepts, Images, Containers, Dockerfile
- Intermediate (4w): Volumes, Networking, Compose, Multi-stage
- Advanced (4w): Security, CI/CD, Orchestration, Project

### PostgreSQL (Official Docs)
- 2 levels, 10 weeks
- Beginner (5w): Basics, CRUD, Joins, Indexes, Functions
- Intermediate (5w): Window Functions, JSONB, Performance, Replication, Project

### MySQL (Official Docs)
- 2 levels, 10 weeks
- Beginner (5w): Basics, CRUD, Joins, Indexes, Stored Procedures
- Intermediate (5w): Transactions, Performance, Replication, Security, Project

### MongoDB (Official Docs, MongoDB University)
- 2 levels, 10 weeks
- Beginner (5w): Documents, CRUD, Indexes, Aggregation Basics
- Intermediate (5w): Aggregation Advanced, Schema Design, Replication, Performance, Project

### Redis (Official Docs)
- 2 levels, 10 weeks
- Beginner (5w): Data Types, Strings, Hashes, Lists, Sets
- Intermediate (5w): Sorted Sets, Pub/Sub, Lua, Clustering, Project

### GraphQL (Official Docs, How to GraphQL)
- 2 levels, 10 weeks
- Beginner (5w): Schema, Queries, Mutations, Resolvers, Types
- Intermediate (5w): Auth, DataLoader, Subscriptions, Testing, Project
