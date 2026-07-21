# Project Planning

Before writing code, plan your project thoroughly. Good planning reduces rework and ensures you meet all requirements.

## Step 1: Choose Your Project

Select one of the project options (Portfolio, Business Site, Recipe Blog, or Event Page) based on your interests and learning goals.

## Step 2: Define Content Strategy

List every piece of content your site needs.

### Example: Personal Portfolio

| Page | Content |
|------|---------|
| Home | Hero section, tagline, call-to-action |
| About | Bio, skills list, photo |
| Projects | Project cards with images and descriptions |
| Contact | Contact form, email, social links |

### Example: Small Business Site

| Page | Content |
|------|---------|
| Home | Hero, services overview, testimonials |
| Services | Detailed service descriptions with pricing table |
| About | Team photos, company history |
| Contact | Form, map, address, phone |

## Step 3: Wireframing

Sketch the layout for each page at mobile and desktop widths.

```
Mobile (320px):
┌─────────────┐
│    Header   │
│    Nav      │
├─────────────┤
│             │
│   Content   │
│             │
├─────────────┤
│   Footer    │
└─────────────┘

Desktop (1024px+):
┌─────────────────────────┐
│   Logo        Nav links │
├─────────────────────────┤
│   Hero Banner           │
├─────────────────────────┤
│   Sidebar   │  Main     │
│             │  Content  │
├─────────────────────────┤
│        Footer           │
└─────────────────────────┘
```

### Tools for Wireframing

- Pen and paper (fastest)
- Excalidraw (free, online)
- Figma (professional)
- Balsamiq (wireframe-focused)

## Step 4: Information Architecture

Plan the navigation structure.

```
Home
├── About
├── Projects
│   ├── Project 1
│   └── Project 2
└── Contact
```

## Step 5: Design Decisions

Before coding CSS, decide on:

| Element | Decision |
|---------|----------|
| Color palette | 2-3 primary colors, 1 accent, neutral tones |
| Typography | 1-2 font families (headings + body) |
| Spacing | Consistent padding/margin values |
| Border radius | Rounded or sharp corners |
| Breakpoints | Mobile (< 640px), Tablet (640-1024px), Desktop (> 1024px) |

### Example Design Tokens

```css
:root {
  /* Colors */
  --color-primary: #2563eb;
  --color-secondary: #475569;
  --color-accent: #f59e0b;
  --color-bg: #ffffff;
  --color-text: #1e293b;

  /* Typography */
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;

  /* Spacing */
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 4rem;

  /* Layout */
  --max-width: 1200px;
  --border-radius: 8px;
}
```

## Step 6: File Structure

```
project/
├── index.html
├── about.html
├── projects.html
├── contact.html
├── css/
│   └── style.css
├── images/
│   ├── hero.jpg
│   ├── profile.jpg
│   └── project1.jpg
└── README.md
```

## Practice

1. Choose your project type and define pages
2. Sketch wireframes for mobile and desktop
3. Define your color palette and font choices
4. List every image you need to create or find
5. Plan your navigation structure
