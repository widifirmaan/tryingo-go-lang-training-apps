# Planning and Architecture

## Project Overview

Build a **Portfolio Platform** — a professional portfolio website with:

- Project showcase with filtering
- Blog with markdown content
- Contact form with validation
- Admin dashboard for managing content
- PWA support for offline access
- Full accessibility compliance
- SEO optimization
- Security hardening

## Architecture

### Project Structure

```txt
portfolio/
├── index.html
├── manifest.json
├── sw.js
├── robots.txt
├── sitemap.xml
├── pages/
│   ├── about.html
│   ├── projects.html
│   ├── blog.html
│   ├── contact.html
│   └── admin/
│       ├── dashboard.html
│       ├── projects.html
│       └── blog.html
├── components/
│   ├── header.html
│   ├── footer.html
│   ├── project-card.html
│   ├── blog-card.html
│   └── contact-form.html
├── css/
│   ├── critical.css
│   ├── styles.css
│   ├── admin.css
│   └── themes.css
├── js/
│   ├── app.js
│   ├── router.js
│   ├── validation.js
│   ├── pwa.js
│   ├── admin.js
│   └── utils.js
├── assets/
│   ├── images/
│   ├── fonts/
│   └── icons/
└── data/
    ├── projects.json
    └── blog.json
```

## Requirements Specification

### Functional Requirements

```txt
Essential:
- Responsive design (mobile, tablet, desktop)
- Project showcase with filtering (by tech, category)
- Blog with pagination
- Contact form with validation and submission
- Admin dashboard for content management
- PWA: installable, offline support
- Dark/light theme toggle

Nice to have:
- Blog search
- Project analytics
- Comments on blog posts
- Image lazy loading with blur-up
- Print stylesheet
```

### Non-Functional Requirements

```txt
Performance:
- Lighthouse score > 90 in all categories
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- Total bundle size < 200KB (critical path)

Accessibility:
- WCAG 2.1 AA compliance
- ARIA landmarks throughout
- Full keyboard navigation
- Screen reader tested

SEO:
- Structured data (Person, Article, Project)
- XML sitemap
- Meta tags (OG, Twitter)
- Semantic HTML structure

Security:
- CSP header
- HTTPS enforced
- Input sanitized
- CSRF protection
- Security headers
```

## Design System

### Typography

```css
/* Design tokens */
:root {
  --font-display: 'Inter', system-ui, sans-serif;
  --font-body: system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;

  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
}
```

### Color Palette

```css
:root {
  /* Light theme */
  --color-primary: #3498db;
  --color-primary-dark: #2980b9;
  --color-secondary: #2ecc71;
  --color-danger: #e74c3c;
  --color-warning: #f1c40f;

  --color-bg: #ffffff;
  --color-bg-secondary: #f8f9fa;
  --color-bg-tertiary: #e9ecef;
  --color-text: #2c3e50;
  --color-text-secondary: #7f8c8d;
  --color-border: #e0e0e0;

  --color-accent: #9b59b6;
  --color-success: #27ae60;
  --color-info: #17a2b8;
}

[data-theme="dark"] {
  --color-bg: #1a1a2e;
  --color-bg-secondary: #16213e;
  --color-bg-tertiary: #0f3460;
  --color-text: #ecf0f1;
  --color-text-secondary: #95a5a6;
  --color-border: #2c3e50;
}
```

### Spacing

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
}
```

## Component Tree

```txt
App
├── SkipLink
├── Header
│   ├── Logo
│   ├── Navigation
│   │   ├── NavLink (Home)
│   │   ├── NavLink (Projects)
│   │   ├── NavLink (Blog)
│   │   ├── NavLink (About)
│   │   └── NavLink (Contact)
│   ├── ThemeToggle
│   └── MobileMenuToggle
├── Main
│   ├── Routes
│   │   ├── HomePage
│   │   │   ├── HeroSection
│   │   │   ├── FeaturedProjects
│   │   │   └── Testimonials
│   │   ├── ProjectsPage
│   │   │   ├── ProjectFilter
│   │   │   └── ProjectGrid
│   │   │       └── ProjectCard
│   │   ├── BlogPage
│   │   │   ├── BlogSearch
│   │   │   ├── BlogList
│   │   │   │   └── BlogCard
│   │   │   └── Pagination
│   │   ├── BlogPostPage
│   │   │   ├── ArticleHeader
│   │   │   ├── ArticleContent
│   │   │   └── ShareButtons
│   │   ├── AboutPage
│   │   │   ├── Bio
│   │   │   ├── Skills
│   │   │   └── Timeline
│   │   └── ContactPage
│   │       ├── ContactForm
│   │       └── ContactInfo
│   └── AdminRoutes
│       ├── Dashboard
│       ├── ProjectManager
│       ├── BlogManager
│       └── Settings
├── Footer
│   ├── SocialLinks
│   ├── FooterNav
│   └── Copyright
└── Toasts
```

## Data Models

```json
// Project model
{
  "id": "project-1",
  "title": "E-Commerce Platform",
  "slug": "e-commerce-platform",
  "description": "Full-stack e-commerce solution",
  "content": "<p>Detailed project description...</p>",
  "technologies": ["React", "Node.js", "PostgreSQL"],
  "category": "full-stack",
  "image": "/assets/images/project-1.jpg",
  "url": "https://example.com",
  "github": "https://github.com/user/project",
  "featured": true,
  "order": 1,
  "created": "2026-01-15",
  "updated": "2026-06-20"
}

// Blog post model
{
  "id": "post-1",
  "title": "Getting Started with Web Components",
  "slug": "web-components-intro",
  "excerpt": "Learn the basics of Web Components...",
  "content": "<h2>Introduction</h2><p>Article content...</p>",
  "author": "Jane Developer",
  "tags": ["html", "web-components", "javascript"],
  "category": "tutorial",
  "image": "/assets/images/blog-1.jpg",
  "published": true,
  "created": "2026-07-01",
  "updated": "2026-07-10",
  "readTime": 8
}

// Contact message model
{
  "id": "msg-1",
  "name": "John Client",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a new project...",
  "created": "2026-07-21",
  "read": false
}
```

## Sprint Plan

```txt
Sprint 1 (Days 1-2): Foundation
- Project scaffolding
- Design system (CSS variables, typography, spacing)
- Header and footer components
- Routing system
- Theme toggle

Sprint 2 (Days 3-5): Core Pages
- Home page (hero, featured projects)
- Projects page (filter, grid, cards)
- Blog page (list, search, pagination)
- About page (bio, skills, timeline)

Sprint 3 (Days 6-7): Advanced Features
- Contact form with validation
- PWA setup (manifest, service worker)
- Admin dashboard (content management)
- Image optimization and lazy loading

Sprint 4 (Days 8-10): Polish & Launch
- Accessibility audit and fixes
- SEO setup (meta tags, structured data, sitemap)
- Performance optimization
- Security headers
- Testing (cross-browser, Lighthouse)
- Deployment
```

## Practice

1. Create a complete project plan with user stories, acceptance criteria, and task breakdown for each sprint.
2. Design a component tree for the portfolio platform with all UI components and their relationships.
3. Build the design system with CSS custom properties for colors, typography, spacing, and shadows.
4. Create wireframes for the home page, projects page, blog post, and admin dashboard.
