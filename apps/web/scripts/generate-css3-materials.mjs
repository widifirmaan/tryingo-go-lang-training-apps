import { BaseGenerator } from './lib/base-generator.mjs';

// ─────────────────────────────────────────────────────────────────────────────
// CSS3 CURRICULUM — pure research, zero framework influence
// Sources: MDN, freeCodeCamp, CSS-Tricks, Smashing Magazine
// ─────────────────────────────────────────────────────────────────────────────
// Research consensus: 1 level, 12 weeks
// Selectors → Box Model → Colors/Text → Flexbox → Grid → Positioning → Responsive → Animations → Variables → Architecture → Modern → Project
// ─────────────────────────────────────────────────────────────────────────────

const gen = new BaseGenerator('css3', 'CSS3');

const LEVELS = [
  {
    levelId: 'css',
    nameId: 'CSS3 Lengkap',
    nameEn: 'Complete CSS3',
    descId: 'Dari nol hingga mahir: selector, layout, animasi, responsive, dan arsitektur CSS modern.',
    descEn: 'From zero to expert: selectors, layouts, animations, responsive design, and modern CSS architecture.',
  },
];

const MODULES = [
  // ── WEEK 1: Selector & Basic Styling ───────────────────────────────────────
  {
    week: 1, level: 'css', topicId: 'selector-dasar',
    titleId: 'Selector & Basic Styling', titleEn: 'Selectors & Basic Styling',
    programId: 'Halaman Styling Pertama', programEn: 'First Styled Page',
    levelNameId: 'CSS3 Lengkap', levelNameEn: 'Complete CSS3',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>CSS Selectors</title>
    <style>
        /* Element Selector */
        body {
            font-family: 'Segoe UI', sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
        }

        /* Class Selector */
        .card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            margin: 10px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        /* ID Selector */
        #header {
            background: #2E5B44;
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px;
        }

        /* Descendant Selector */
        .card p {
            color: #555;
        }

        /* Pseudo-class */
        .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }

        /* Multiple Selector */
        h1, h2, h3 {
            margin-top: 0;
        }

        /* Attribute Selector */
        a[href^="https"] {
            color: #2E5B44;
        }
    </style>
</head>
<body>
    <div id="header">
        <h1>Belajar CSS Selectors</h1>
        <p>Styling halaman web dengan CSS3</p>
    </div>

    <div class="card">
        <h2>Card Pertama</h2>
        <p>Ini adalah paragraf di dalam card.</p>
        <a href="https://developer.mozilla.org">Link ke MDN</a>
    </div>

    <div class="card">
        <h2>Card Kedua</h2>
        <p>Card ini juga terkena styling yang sama.</p>
        <a href="#internal">Link internal</a>
    </div>
</body>
</html>`,
    objectivesId: [
      'Tiga cara menyisipkan CSS: inline, internal (style tag), external (link)',
      'Selector dasar: element, class (.), id (#)',
      'Selector kombinasi: descendant, child (>), adjacent (+)',
      'Pseudo-class: :hover, :focus, :first-child, :last-child',
      'Attribute selector: [attr], [attr=value], [attr^=value]',
    ],
    objectivesEn: [
      'Three ways to include CSS: inline, internal (style tag), external (link)',
      'Basic selectors: element, class (.), id (#)',
      'Combination selectors: descendant, child (>), adjacent (+)',
      'Pseudo-classes: :hover, :focus, :first-child, :last-child',
      'Attribute selectors: [attr], [attr=value], [attr^=value]',
    ],
    explanationId: '### Cara Menyisipkan CSS\nInline: `<p style="color:red">`. Internal: `<style>` di head. External: `<link rel="stylesheet" href="style.css">`.\n\n### Selector Dasar\nElement: `p {}`. Class: `.card {}`. Id: `#header {}`.\n\n### Kombinasi\nDescendant: `.card p {}`. Child: `.card > p {}`. Adjacent: `h2 + p {}`.\n\n### Pseudo-class\n`:hover` saat mouse over, `:focus` saat input aktif, `:first-child` elemen pertama.\n\n### Attribute\n`[href^="https"]` — href yang dimulai "https".',
    explanationEn: '### Including CSS\nInline: `<p style="color:red">`. Internal: `<style>` in head. External: `<link rel="stylesheet" href="style.css">`.\n\n### Basic Selectors\nElement: `p {}`. Class: `.card {}`. Id: `#header {}`.\n\n### Combinations\nDescendant: `.card p {}`. Child: `.card > p {}`. Adjacent: `h2 + p {}`.\n\n### Pseudo-classes\n`:hover` on mouse over, `:focus` on input active, `:first-child` first element.\n\n### Attributes\n`[href^="https"]` — href starting with "https".',
    experimentsId: [
      'Buat 5 class berbeda dengan styling berbeda',
      'Coba :nth-child(odd) untuk zebra stripe',
      'Eksperimen [attr*="value"] contains selector',
      'Buat selector dengan multiple pseudo-class',
      'Coba :not() selector untuk exclude',
    ],
    experimentsEn: [
      'Create 5 different classes with different styling',
      'Try :nth-child(odd) for zebra stripes',
      'Experiment [attr*="value"] contains selector',
      'Create selector with multiple pseudo-classes',
      'Try :not() selector for exclusion',
    ],
    challengeId: 'Buat halaman dengan 3 card berbeda: gunakan element, class, id, descendant, dan pseudo-class selector.',
    challengeEn: 'Create a page with 3 different cards: use element, class, id, descendant, and pseudo-class selectors.',
    summaryId: 'Minggu 1 dari 12: **Selector & Basic Styling** (Level: CSS3 Lengkap). Dasar styling. Minggu depan: **Box Model**.',
    summaryEn: 'Week 1 of 12: **Selectors & Basic Styling** (Level: Complete CSS3). Styling foundation. Next week: **Box Model**.',
  },
  // ── WEEK 2: Box Model ──────────────────────────────────────────────────────
  {
    week: 2, level: 'css', topicId: 'box-model',
    titleId: 'Box Model', titleEn: 'Box Model',
    programId: 'Layout dengan Box Model', programEn: 'Box Model Layout',
    levelNameId: 'CSS3 Lengkap', levelNameEn: 'Complete CSS3',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>CSS Box Model</title>
    <style>
        body {
            font-family: sans-serif;
            padding: 20px;
            background: #f0f0f0;
        }

        /* Content → Padding → Border → Margin */
        .box {
            /* Content */
            width: 200px;
            height: 100px;

            /* Padding (inner space) */
            padding: 20px;

            /* Border */
            border: 3px solid #2E5B44;

            /* Margin (outer space) */
            margin: 15px;

            background: #e8f5e9;
        }

        /* Box-sizing comparison */
        .content-box {
            box-sizing: content-box;
            width: 200px;
            padding: 20px;
            border: 5px solid #e74c3c;
            margin: 10px 0;
            background: #ffebee;
        }

        .border-box {
            box-sizing: border-box;
            width: 200px;
            padding: 20px;
            border: 5px solid #2E5B44;
            margin: 10px 0;
            background: #e8f5e9;
        }

        /* Margin collapse demo */
        .collapse-a {
            margin-bottom: 30px;
            background: #bbdefb;
            padding: 10px;
        }

        .collapse-b {
            margin-top: 20px;
            background: #c8e6c9;
            padding: 10px;
        }

        /* Shorthand */
        .shorthand {
            /* top right bottom left */
            margin: 10px 20px 30px 40px;
            /* vertical horizontal */
            padding: 15px 25px;
            /* width style color */
            border: 2px dashed #9c27b0;
            background: #f3e5f5;
        }
    </style>
</head>
<body>
    <h1>CSS Box Model</h1>

    <h2>Standard Box</h2>
    <div class="box">Content 200x100 + padding 20 + border 3 + margin 15</div>

    <h2>Box-Sizing Comparison</h2>
    <p>content-box (default): total width = 200 + 40 + 10 = 250px</p>
    <div class="content-box">content-box</div>
    <p>border-box: total width = 200px (padding & border included)</p>
    <div class="border-box">border-box</div>

    <h2>Margin Collapse</h2>
    <p>Margin 30px + 20px = 30px (yang terbesar), bukan 50px!</p>
    <div class="collapse-A">Collapse A (margin-bottom: 30px)</div>
    <div class="collapse-B">Collapse B (margin-top: 20px)</div>

    <h2>Shorthand Properties</h2>
    <div class="shorthand">margin: 10px 20px 30px 40px (TRBL)</div>
</body>
</html>`,
    objectivesId: [
      'Memahami box model: content, padding, border, margin',
      'box-sizing: content-box vs border-box',
      'Margin collapse: margin vertikal bertumpuk, tidak bertambah',
      'Shorthand properties: margin, padding, border',
      'Overflow: visible, hidden, scroll, auto',
    ],
    objectivesEn: [
      'Understand box model: content, padding, border, margin',
      'box-sizing: content-box vs border-box',
      'Margin collapse: vertical margins overlap, not add up',
      'Shorthand properties: margin, padding, border',
      'Overflow: visible, hidden, scroll, auto',
    ],
    explanationId: '### Box Model\nSetiap elemen adalah kotak: content → padding → border → margin.\n\n### Box-Sizing\n`content-box` (default): width = content saja. `border-box`: width = content + padding + border.\n\n### Margin Collapse\nDua margin vertikal bertumpuk — yang dipakai yang terbesar, bukan jumlah.\n\n### Shorthand\n`margin: 10px 20px 30px 40px` = top right bottom left.\n\n### Overflow\n`overflow: hidden` sembunyikan kelebihan, `scroll` tambah scrollbar.',
    explanationEn: '### Box Model\nEvery element is a box: content → padding → border → margin.\n\n### Box-Sizing\n`content-box` (default): width = content only. `border-box`: width = content + padding + border.\n\n### Margin Collapse\nTwo vertical margins overlap — the largest is used, not the sum.\n\n### Shorthand\n`margin: 10px 20px 30px 40px` = top right bottom left.\n\n### Overflow\n`overflow: hidden` hides excess, `scroll` adds scrollbar.',
    experimentsId: [
      'Ubah box-sizing dan lihat perbedaan lebar',
      'Coba margin collapse dengan 3 elemen',
      'Eksperimen overflow: auto pada div pendek',
      'Buat shorthand border dengan 3 properti',
      'Coba negative margin',
    ],
    experimentsEn: [
      'Change box-sizing and observe width difference',
      'Try margin collapse with 3 elements',
      'Experiment overflow: auto on short div',
      'Create shorthand border with 3 properties',
      'Try negative margins',
    ],
    challengeId: 'Buat 3 card dengan box-sizing: border-box, padding konsisten, dan margin yang tidak collapse.',
    challengeEn: 'Create 3 cards with box-sizing: border-box, consistent padding, and non-collapsing margins.',
    summaryId: 'Minggu 2 dari 12: **Box Model** (Level: CSS3 Lengkap). Fondasi layout. Minggu depan: **Warna, Teks & Tipografi**.',
    summaryEn: 'Week 2 of 12: **Box Model** (Level: Complete CSS3). Layout foundation. Next week: **Colors, Text & Typography**.',
  },
  // ── WEEK 3: Warna, Teks & Tipografi ────────────────────────────────────────
  {
    week: 3, level: 'css', topicId: 'warna-teks-tipografi',
    titleId: 'Warna, Teks & Tipografi', titleEn: 'Colors, Text & Typography',
    programId: 'Artikel dengan Tipografi', programEn: 'Typography Article',
    levelNameId: 'CSS3 Lengkap', levelNameEn: 'Complete CSS3',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Colors & Typography</title>
    <style>
        body {
            font-family: 'Georgia', serif;
            line-height: 1.8;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }

        /* Color formats */
        .color-name { color: tomato; }
        .color-hex { color: #2E5B44; }
        .color-rgb { color: rgb(46, 91, 68); }
        .color-rgba { color: rgba(46, 91, 68, 0.7); }
        .color-hsl { color: hsl(145, 35%, 30%); }

        /* Background */
        .bg-solid { background-color: #e8f5e9; padding: 10px; }
        .bg-gradient {
            background: linear-gradient(135deg, #2E5B44, #4CAF50);
            color: white;
            padding: 20px;
            border-radius: 8px;
        }

        /* Typography */
        h1 {
            font-size: 2.5rem;
            font-weight: 700;
            letter-spacing: -0.5px;
            margin-bottom: 0.5em;
        }

        h2 {
            font-size: 1.8rem;
            font-weight: 600;
            color: #2E5B44;
        }

        p {
            font-size: 1rem;
            margin-bottom: 1em;
            text-align: justify;
        }

        /* Text styling */
        .underline { text-decoration: underline wavy #e74c3c; }
        .uppercase { text-transform: uppercase; letter-spacing: 2px; }
        .shadow { text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
        .truncate {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 200px;
        }

        /* Font stack */
        .font-system { font-family: system-ui, sans-serif; }
        .font-mono { font-family: 'Fira Code', monospace; }
    </style>
</head>
<body>
    <h1 class="shadow">Warna & Tipografi CSS</h1>

    <h2>Format Warna</h2>
    <p><span class="color-name">Nama warna</span> |
       <span class="color-hex">Hex</span> |
       <span class="color-rgb">RGB</span> |
       <span class="color-rgba">RGBA (dengan alpha)</span> |
       <span class="color-hsl">HSL</span></p>

    <h2>Background</h2>
    <div class="bg-solid">Background solid color</div>
    <div class="bg-gradient">Background gradient</div>

    <h2>Tipografi</h2>
    <p class="uppercase">Text transform uppercase</p>
    <p class="underline">Text decoration underline wavy</p>
    <p class="truncate">Ini teks panjang yang akan dipotong dengan ellipsis...</p>
    <p class="font-mono">Font monospace untuk kode</p>
</body>
</html>`,
    objectivesId: [
      'Format warna: name, hex, rgb, rgba, hsl, hsla',
      'Background: color, image, gradient, linear-gradient, radial-gradient',
      'Tipografi: font-family, font-size, font-weight, line-height, letter-spacing',
      'Text styling: text-decoration, text-transform, text-shadow, text-overflow',
      'Font stack dan web-safe fonts',
    ],
    objectivesEn: [
      'Color formats: name, hex, rgb, rgba, hsl, hsla',
      'Backgrounds: color, image, gradient, linear-gradient, radial-gradient',
      'Typography: font-family, font-size, font-weight, line-height, letter-spacing',
      'Text styling: text-decoration, text-transform, text-shadow, text-overflow',
      'Font stacks and web-safe fonts',
    ],
    explanationId: '### Format Warna\n`nama`, `#hex`, `rgb(r,g,b)`, `rgba(r,g,b,a)`, `hsl(h,s%,l%)`.\n\n### Background\n`background-color`, `background-image`, `linear-gradient(135deg, #a, #b)`.\n\n### Tipografi\n`font-family`, `font-size` (rem/em/px), `font-weight` (400 normal, 700 bold), `line-height`, `letter-spacing`.\n\n### Text Styling\n`text-decoration`, `text-transform`, `text-shadow: x y blur color`, `text-overflow: ellipsis`.\n\n### Font Stack\n`font-family: "Custom", fallback, generic` — selalu ada fallback.',
    explanationEn: '### Color Formats\n`name`, `#hex`, `rgb(r,g,b)`, `rgba(r,g,b,a)`, `hsl(h,s%,l%)`.\n\n### Backgrounds\n`background-color`, `background-image`, `linear-gradient(135deg, #a, #b)`.\n\n### Typography\n`font-family`, `font-size` (rem/em/px), `font-weight` (400 normal, 700 bold), `line-height`, `letter-spacing`.\n\n### Text Styling\n`text-decoration`, `text-transform`, `text-shadow: x y blur color`, `text-overflow: ellipsis`.\n\n### Font Stack\n`font-family: "Custom", fallback, generic` — always have fallback.',
    experimentsId: [
      'Buat gradient background dengan 3 warna',
      'Coba text-shadow multiple layer',
      'Eksperimen font-size: rem vs em vs px',
      'Buat truncate dengan multi-line (line-clamp)',
      'Coba font-weight dari 100-900',
    ],
    experimentsEn: [
      'Create gradient background with 3 colors',
      'Try multi-layer text-shadow',
      'Experiment font-size: rem vs em vs px',
      'Create multi-line truncate (line-clamp)',
      'Try font-weight from 100-900',
    ],
    challengeId: 'Buat halaman artikel blog dengan tipografi profesional: heading hierarchy, drop cap, blockquote styling.',
    challengeEn: 'Create a blog article page with professional typography: heading hierarchy, drop cap, blockquote styling.',
    summaryId: 'Minggu 3 dari 12: **Warna, Teks & Tipografi** (Level: CSS3 Lengkap). Estetika visual. Minggu depan: **Flexbox**.',
    summaryEn: 'Week 3 of 12: **Colors, Text & Typography** (Level: Complete CSS3). Visual aesthetics. Next week: **Flexbox**.',
  },
  // ── WEEK 4: Flexbox ────────────────────────────────────────────────────────
  {
    week: 4, level: 'css', topicId: 'flexbox',
    titleId: 'Flexbox', titleEn: 'Flexbox',
    programId: 'Layout Flexbox', programEn: 'Flexbox Layout',
    levelNameId: 'CSS3 Lengkap', levelNameEn: 'Complete CSS3',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>CSS Flexbox</title>
    <style>
        body { font-family: sans-serif; padding: 20px; }

        /* Flex Container */
        .flex-container {
            display: flex;
            gap: 15px;
            padding: 15px;
            background: #e3f2fd;
            border-radius: 8px;
            margin-bottom: 20px;
        }

        /* Flex Items */
        .flex-item {
            background: #2E5B44;
            color: white;
            padding: 20px;
            border-radius: 6px;
            text-align: center;
            flex: 1;
        }

        /* Direction */
        .row { flex-direction: row; }
        .column { flex-direction: column; }
        .row-reverse { flex-direction: row-reverse; }

        /* Justify (main axis) */
        .justify-between { justify-content: space-between; }
        .justify-around { justify-content: space-around; }
        .justify-center { justify-content: center; }

        /* Align (cross axis) */
        .align-center {
            align-items: center;
            min-height: 120px;
        }

        /* Wrap */
        .wrap { flex-wrap: wrap; }
        .wrap .flex-item { min-width: 100px; }

        /* Navbar example */
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #2E5B44;
            padding: 15px 30px;
            border-radius: 8px;
            color: white;
        }

        .nav-links {
            display: flex;
            gap: 20px;
            list-style: none;
            margin: 0;
            padding: 0;
        }

        /* Centering */
        .center-demo {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 150px;
            background: #f3e5f5;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <h1>CSS Flexbox</h1>

    <h2>Basic Flex (flex: 1)</h2>
    <div class="flex-container">
        <div class="flex-item">1</div>
        <div class="flex-item">2</div>
        <div class="flex-item">3</div>
    </div>

    <h2>Justify Content</h2>
    <div class="flex-container justify-between align-center">
        <div class="flex-item" style="flex: none;">Left</div>
        <div class="flex-item" style="flex: none;">Center</div>
        <div class="flex-item" style="flex: none;">Right</div>
    </div>

    <h2>Flex Wrap</h2>
    <div class="flex-container wrap">
        <div class="flex-item">Item 1</div>
        <div class="flex-item">Item 2</div>
        <div class="flex-item">Item 3</div>
        <div class="flex-item">Item 4</div>
        <div class="flex-item">Item 5</div>
    </div>

    <h2>Navbar Example</h2>
    <nav class="navbar">
        <div class="logo">Brand</div>
        <ul class="nav-links">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
    </nav>

    <h2>Perfect Centering</h2>
    <div class="center-demo">
        <div class="flex-item" style="flex: none;">Centered!</div>
    </div>
</body>
</html>`,
    objectivesId: [
      'display: flex — mengaktifkan flexbox pada container',
      'flex-direction: row, column, row-reverse, column-reverse',
      'justify-content: alignment pada main axis',
      'align-items: alignment pada cross axis',
      'flex-wrap, flex-grow, flex-shrink, flex-basis',
    ],
    objectivesEn: [
      'display: flex — activate flexbox on container',
      'flex-direction: row, column, row-reverse, column-reverse',
      'justify-content: main axis alignment',
      'align-items: cross axis alignment',
      'flex-wrap, flex-grow, flex-shrink, flex-basis',
    ],
    explanationId: '### Flex Container\n`display: flex` pada parent. Semua child menjadi flex item.\n\n### Direction & Wrap\n`flex-direction: row|column`, `flex-wrap: wrap|nowrap`.\n\n### Justify & Align\n`justify-content` main axis, `align-items` cross axis.\n\n### Flex Item\n`flex: 1` = grow 1, shrink 1, basis 0. `flex: none` = fixed size.\n\n### Gap\n`gap: 15px` — jarak antar item (tidak perlu margin).',
    explanationEn: '### Flex Container\n`display: flex` on parent. All children become flex items.\n\n### Direction & Wrap\n`flex-direction: row|column`, `flex-wrap: wrap|nowrap`.\n\n### Justify & Align\n`justify-content` main axis, `align-items` cross axis.\n\n### Flex Items\n`flex: 1` = grow 1, shrink 1, basis 0. `flex: none` = fixed size.\n\n### Gap\n`gap: 15px` — space between items (no margin needed).',
    experimentsId: [
      'Buat layout sidebar + content dengan flex',
      'Coba align-self pada satu item',
      'Eksperimen order untuk urutan item',
      'Buat holy grail layout dengan flex',
      'Coba flex-basis vs width',
    ],
    experimentsEn: [
      'Create sidebar + content layout with flex',
      'Try align-self on single item',
      'Experiment order for item sequence',
      'Create holy grail layout with flex',
      'Try flex-basis vs width',
    ],
    challengeId: 'Buat layout dashboard: header, sidebar, main content, footer — semua dengan flexbox.',
    challengeEn: 'Create a dashboard layout: header, sidebar, main content, footer — all with flexbox.',
    summaryId: 'Minggu 4 dari 12: **Flexbox** (Level: CSS3 Lengkap). Layout 1-dimensional. Minggu depan: **CSS Grid**.',
    summaryEn: 'Week 4 of 12: **Flexbox** (Level: Complete CSS3). 1-dimensional layout. Next week: **CSS Grid**.',
  },
  // ── WEEK 5: CSS Grid ───────────────────────────────────────────────────────
  {
    week: 5, level: 'css', topicId: 'css-grid',
    titleId: 'CSS Grid', titleEn: 'CSS Grid',
    programId: 'Layout Grid', programEn: 'Grid Layout',
    levelNameId: 'CSS3 Lengkap', levelNameEn: 'Complete CSS3',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>CSS Grid</title>
    <style>
        body { font-family: sans-serif; padding: 20px; }

        /* Grid Container */
        .grid {
            display: grid;
            gap: 15px;
            padding: 15px;
            background: #e8f5e9;
            border-radius: 8px;
            margin-bottom: 20px;
        }

        .grid-item {
            background: #2E5B44;
            color: white;
            padding: 20px;
            border-radius: 6px;
            text-align: center;
        }

        /* Column templates */
        .grid-3col { grid-template-columns: repeat(3, 1fr); }
        .grid-12col { grid-template-columns: repeat(12, 1fr); }
        .grid-mixed { grid-template-columns: 200px 1fr 1fr; }

        /* Row templates */
        .grid-rows { grid-template-rows: 100px 200px 100px; }

        /* Grid areas */
        .grid-areas {
            grid-template-columns: 200px 1fr;
            grid-template-rows: 60px 1fr 40px;
            grid-template-areas:
                "header header"
                "sidebar main"
                "footer footer";
            min-height: 300px;
        }

        .ga-header { grid-area: header; background: #1b5e20; }
        .ga-sidebar { grid-area: sidebar; background: #388e3c; }
        .ga-main { grid-area: main; background: #4CAF50; }
        .ga-footer { grid-area: footer; background: #1b5e20; }

        /* Auto-fit responsive */
        .grid-auto {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        }

        /* Span */
        .span-2 { grid-column: span 2; }
        .span-row-2 { grid-row: span 2; }
    </style>
</head>
<body>
    <h1>CSS Grid</h1>

    <h2>3 Column Grid</h2>
    <div class="grid grid-3col">
        <div class="grid-item">1</div>
        <div class="grid-item">2</div>
        <div class="grid-item">3</div>
        <div class="grid-item">4</div>
        <div class="grid-item">5</div>
        <div class="grid-item">6</div>
    </div>

    <h2>Mixed Columns</h2>
    <div class="grid grid-mixed">
        <div class="grid-item">200px</div>
        <div class="grid-item">1fr</div>
        <div class="grid-item">1fr</div>
    </div>

    <h2>Grid Template Areas</h2>
    <div class="grid grid-areas">
        <div class="grid-item ga-header">Header</div>
        <div class="grid-item ga-sidebar">Sidebar</div>
        <div class="grid-item ga-main">Main Content</div>
        <div class="grid-item ga-footer">Footer</div>
    </div>

    <h2>Auto-fit Responsive</h2>
    <div class="grid grid-auto">
        <div class="grid-item">A</div>
        <div class="grid-item">B</div>
        <div class="grid-item">C</div>
        <div class="grid-item">D</div>
        <div class="grid-item">E</div>
    </div>

    <h2>Column Span</h2>
    <div class="grid grid-3col">
        <div class="grid-item span-2">Span 2 kolom</div>
        <div class="grid-item">Normal</div>
        <div class="grid-item">Normal</div>
        <div class="grid-item span-row-2">Span 2 baris</div>
        <div class="grid-item">Normal</div>
    </div>
</body>
</html>`,
    objectivesId: [
      'display: grid — mengaktifkan grid pada container',
      'grid-template-columns dan grid-template-rows',
      'Grid areas: grid-template-areas untuk layout named',
      'auto-fit dan auto-fill untuk responsive grid',
      'grid-column, grid-row span untuk merge cell',
    ],
    objectivesEn: [
      'display: grid — activate grid on container',
      'grid-template-columns and grid-template-rows',
      'Grid areas: grid-template-areas for named layouts',
      'auto-fit and auto-fill for responsive grids',
      'grid-column, grid-row span for cell merging',
    ],
    explanationId: '### Grid Container\n`display: grid` pada parent. `grid-template-columns: repeat(3, 1fr)` = 3 kolom sama lebar.\n\n### fr Unit\n`1fr` = 1 bagian dari space tersedia. `2fr` = 2x lebar 1fr.\n\n### Grid Areas\n`grid-template-areas` dengan string visual — sangat intuitive untuk layout.\n\n### Auto-fit\n`repeat(auto-fit, minmax(150px, 1fr))` — responsive tanpa media query!\n\n### Span\n`grid-column: span 2` = rentang 2 kolom.',
    explanationEn: '### Grid Container\n`display: grid` on parent. `grid-template-columns: repeat(3, 1fr)` = 3 equal columns.\n\n### fr Unit\n`1fr` = 1 fraction of available space. `2fr` = 2x width of 1fr.\n\n### Grid Areas\n`grid-template-areas` with visual strings — very intuitive for layouts.\n\n### Auto-fit\n`repeat(auto-fit, minmax(150px, 1fr))` — responsive without media queries!\n\n### Span\n`grid-column: span 2` = spans 2 columns.',
    experimentsId: [
      'Buat layout magazine dengan grid areas',
      'Coba auto-fill vs auto-fit',
      'Eksperimen minmax dengan max-content',
      'Buat masonry-like layout dengan grid',
      'Coba grid dengan subgrid',
    ],
    experimentsEn: [
      'Create magazine layout with grid areas',
      'Try auto-fill vs auto-fit',
      'Experiment minmax with max-content',
      'Create masonry-like layout with grid',
      'Try grid with subgrid',
    ],
    challengeId: 'Buat layout dashboard lengkap: header, sidebar, main content dengan card grid, footer — semua dengan CSS Grid.',
    challengeEn: 'Create a complete dashboard layout: header, sidebar, main content with card grid, footer — all with CSS Grid.',
    summaryId: 'Minggu 5 dari 12: **CSS Grid** (Level: CSS3 Lengkap). Layout 2-dimensional. Minggu depan: **Positioning**.',
    summaryEn: 'Week 5 of 12: **CSS Grid** (Level: Complete CSS3). 2-dimensional layout. Next week: **Positioning**.',
  },
  // ── WEEK 6: Positioning ────────────────────────────────────────────────────
  {
    week: 6, level: 'css', topicId: 'positioning',
    titleId: 'Positioning', titleEn: 'Positioning',
    programId: 'Layout Positioning', programEn: 'Positioning Layout',
    levelNameId: 'CSS3 Lengkap', levelNameEn: 'Complete CSS3',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>CSS Positioning</title>
    <style>
        body { font-family: sans-serif; padding: 20px; }

        .position-demo {
            position: relative;
            height: 200px;
            background: #f5f5f5;
            border: 2px dashed #ccc;
            border-radius: 8px;
            margin-bottom: 20px;
        }

        .box {
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            border-radius: 6px;
        }

        /* Static (default) */
        .static { background: #9e9e9e; }

        /* Relative */
        .relative {
            position: relative;
            background: #4CAF50;
            top: 20px;
            left: 20px;
        }

        /* Absolute */
        .absolute {
            position: absolute;
            background: #e74c3c;
            top: 10px;
            right: 10px;
        }

        /* Fixed */
        .fixed-note {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #2196F3;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            z-index: 1000;
        }

        /* Sticky */
        .sticky-header {
            position: sticky;
            top: 0;
            background: #2E5B44;
            color: white;
            padding: 15px;
            z-index: 100;
            border-radius: 8px 8px 0 0;
        }

        .sticky-container {
            height: 300px;
            overflow-y: auto;
            background: #e8f5e9;
            border-radius: 0 0 8px 8px;
        }

        .sticky-container p {
            padding: 10px 20px;
        }

        /* Z-index */
        .z-container { position: relative; height: 150px; }
        .z1 { position: absolute; top: 0; left: 0; background: #e74c3c; z-index: 1; }
        .z2 { position: absolute; top: 20px; left: 20px; background: #4CAF50; z-index: 2; }
        .z3 { position: absolute; top: 40px; left: 40px; background: #2196F3; z-index: 3; }
    </style>
</head>
<body>
    <h1>CSS Positioning</h1>

    <h2>Relative + Absolute</h2>
    <div class="position-demo">
        <div class="box static">Static</div>
        <div class="box relative">Relative</div>
        <div class="box absolute">Absolute</div>
    </div>

    <h2>Z-Index Layering</h2>
    <div class="z-container">
        <div class="box z1">z:1</div>
        <div class="box z2">z:2</div>
        <div class="box z3">z:3</div>
    </div>

    <h2>Sticky Header</h2>
    <div class="sticky-container">
        <div class="sticky-header">Sticky Header (scroll down)</div>
        <p>Paragraf 1 — scroll ke bawah...</p>
        <p>Paragraf 2 — scroll ke bawah...</p>
        <p>Paragraf 3 — scroll ke bawah...</p>
        <p>Paragraf 4 — scroll ke bawah...</p>
        <p>Paragraf 5 — scroll ke bawah...</p>
        <p>Paragraf 6 — scroll ke bawah...</p>
        <p>Paragraf 7 — scroll ke bawah...</p>
        <p>Paragraf 8 — scroll ke bawah...</p>
    </div>

    <div class="fixed-note">Fixed: Selalu terlihat!</div>
</body>
</html>`,
    objectivesId: [
      'position: static, relative, absolute, fixed, sticky',
      'Kapan menggunakan relative vs absolute',
      'z-index untuk kontrol layering',
      'Sticky positioning untuk header yang mengikuti scroll',
      'Fixed positioning untuk elemen yang selalu terlihat',
    ],
    objectivesEn: [
      'position: static, relative, absolute, fixed, sticky',
      'When to use relative vs absolute',
      'z-index for layering control',
      'Sticky positioning for scroll-following headers',
      'Fixed positioning for always-visible elements',
    ],
    explanationId: '### Position Values\n`static` default, `relative` offset dari posisi normal, `absolute` relatif ke ancestor terdekat yang positioned, `fixed` relatif ke viewport, `sticky` hybrid relative+fixed.\n\n### Relative + Absolute\nParent `relative`, child `absolute` — child relatif ke parent, bukan viewport.\n\n### Z-Index\nNilai lebih tinggi = lebih depan. Hanya bekerja pada elemen positioned.\n\n### Sticky\n`position: sticky; top: 0` — relative sampai scroll mencapai top:0, lalu fixed.\n\n### Fixed\nSelalu di viewport — tidak terpengaruh scroll.',
    explanationEn: '### Position Values\n`static` default, `relative` offset from normal position, `absolute` relative to nearest positioned ancestor, `fixed` relative to viewport, `sticky` hybrid relative+fixed.\n\n### Relative + Absolute\nParent `relative`, child `absolute` — child relative to parent, not viewport.\n\n### Z-Index\nHigher value = more front. Only works on positioned elements.\n\n### Sticky\n`position: sticky; top: 0` — relative until scroll reaches top:0, then fixed.\n\n### Fixed\nAlways in viewport — unaffected by scroll.',
    experimentsId: [
      'Buat tooltip dengan relative + absolute',
      'Coba z-index dengan stacking context',
      'Eksperimen sticky sidebar',
      'Buat modal overlay dengan fixed',
      'Coba position absolute tanpa relative parent',
    ],
    experimentsEn: [
      'Create tooltip with relative + absolute',
      'Try z-index with stacking context',
      'Experiment sticky sidebar',
      'Create modal overlay with fixed',
      'Try position absolute without relative parent',
    ],
    challengeId: 'Buat halaman dengan: fixed navbar, sticky section header, absolute positioned badge, dan modal overlay.',
    challengeEn: 'Create a page with: fixed navbar, sticky section header, absolute positioned badge, and modal overlay.',
    summaryId: 'Minggu 6 dari 12: **Positioning** (Level: CSS3 Lengkap). Kontrol posisi. Minggu depan: **Responsive Design**.',
    summaryEn: 'Week 6 of 12: **Positioning** (Level: Complete CSS3). Position control. Next week: **Responsive Design**.',
  },
  // ── WEEK 7: Responsive Design ──────────────────────────────────────────────
  {
    week: 7, level: 'css', topicId: 'responsive-design',
    titleId: 'Responsive Design', titleEn: 'Responsive Design',
    programId: 'Layout Responsive', programEn: 'Responsive Layout',
    levelNameId: 'CSS3 Lengkap', levelNameEn: 'Complete CSS3',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Design</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { font-family: sans-serif; padding: 20px; }

        /* Mobile-first approach */
        .container {
            width: 100%;
            padding: 0 15px;
        }

        .card-grid {
            display: grid;
            gap: 15px;
            /* Mobile: 1 column */
            grid-template-columns: 1fr;
        }

        .card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        /* Tablet: 768px+ */
        @media (min-width: 768px) {
            .card-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        /* Desktop: 1024px+ */
        @media (min-width: 1024px) {
            .container { max-width: 1200px; margin: 0 auto; }
            .card-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        /* Fluid typography */
        h1 {
            font-size: clamp(1.5rem, 4vw, 3rem);
        }

        p {
            font-size: clamp(0.9rem, 2vw, 1.1rem);
        }

        /* Responsive image */
        .responsive-img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
        }

        /* Container queries */
        .card-container {
            container-type: inline-size;
        }

        @container (min-width: 400px) {
            .card {
                display: flex;
                gap: 15px;
                align-items: center;
            }
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
            body { background: #121417; color: #e0e0e0; }
            .card { background: #1e1e1e; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Responsive Design</h1>
        <p>Resize browser untuk melihat perubahan layout.</p>

        <div class="card-grid card-container">
            <div class="card">
                <img src="https://picsum.photos/100/100?random=1" alt="Card" class="responsive-img" style="width:80px;height:80px;border-radius:8px;">
                <div>
                    <h3>Card 1</h3>
                    <p>Layout berubah sesuai ukuran layar.</p>
                </div>
            </div>
            <div class="card">
                <img src="https://picsum.photos/100/100?random=2" alt="Card" class="responsive-img" style="width:80px;height:80px;border-radius:8px;">
                <div>
                    <h3>Card 2</h3>
                    <p>Mobile-first approach.</p>
                </div>
            </div>
            <div class="card">
                <img src="https://picsum.photos/100/100?random=3" alt="Card" class="responsive-img" style="width:80px;height:80px;border-radius:8px;">
                <div>
                    <h3>Card 3</h3>
                    <p>Fluid typography dengan clamp().</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`,
    objectivesId: [
      'Viewport meta tag: width=device-width, initial-scale=1.0',
      'Mobile-first media queries: min-width breakpoints',
      'Fluid typography: clamp() untuk ukuran font responsif',
      'Container queries: styling berdasarkan ukuran container',
      'Dark mode: prefers-color-scheme media query',
    ],
    objectivesEn: [
      'Viewport meta tag: width=device-width, initial-scale=1.0',
      'Mobile-first media queries: min-width breakpoints',
      'Fluid typography: clamp() for responsive font sizes',
      'Container queries: styling based on container size',
      'Dark mode: prefers-color-scheme media query',
    ],
    explanationId: '### Viewport Meta\n`<meta name="viewport" content="width=device-width, initial-scale=1.0">` — wajib untuk responsive.\n\n### Mobile-First\nMobile dulu, lalu tambah complexity untuk layar lebih besar. `min-width` breakpoints.\n\n### Breakpoints Umum\nMobile: <768px, Tablet: 768-1023px, Desktop: 1024px+.\n\n### Fluid Typography\n`clamp(1.5rem, 4vw, 3rem)` — min 1.5rem, preferred 4vw, max 3rem.\n\n### Container Queries\n`container-type: inline-size` + `@container (min-width: 400px)` — responsive berdasarkan container, bukan viewport.',
    explanationEn: '### Viewport Meta\n`<meta name="viewport" content="width=device-width, initial-scale=1.0">` — required for responsive.\n\n### Mobile-First\nMobile first, then add complexity for larger screens. `min-width` breakpoints.\n\n### Common Breakpoints\nMobile: <768px, Tablet: 768-1023px, Desktop: 1024px+.\n\n### Fluid Typography\n`clamp(1.5rem, 4vw, 3rem)` — min 1.5rem, preferred 4vw, max 3rem.\n\n### Container Queries\n`container-type: inline-size` + `@container (min-width: 400px)` — responsive based on container, not viewport.',
    experimentsId: [
      'Ubah breakpoints dan lihat perubahan layout',
      'Coba clamp() untuk berbagai properti',
      'Eksperimen container queries dengan card',
      'Buat responsive navigation: hamburger di mobile',
      'Coba prefers-reduced-motion',
    ],
    experimentsEn: [
      'Change breakpoints and observe layout changes',
      'Try clamp() for various properties',
      'Experiment container queries with cards',
      'Create responsive navigation: hamburger on mobile',
      'Try prefers-reduced-motion',
    ],
    challengeId: 'Buat halaman landing page fully responsive: 1 kolom mobile, 2 kolom tablet, 3 kolom desktop, dengan fluid typography.',
    challengeEn: 'Create a fully responsive landing page: 1 column mobile, 2 columns tablet, 3 columns desktop, with fluid typography.',
    summaryId: 'Minggu 7 dari 12: **Responsive Design** (Level: CSS3 Lengkap). Mobile-first. Minggu depan: **Animasi & Transisi**.',
    summaryEn: 'Week 7 of 12: **Responsive Design** (Level: Complete CSS3). Mobile-first. Next week: **Animations & Transitions**.',
  },
  // ── WEEK 8: Animasi & Transisi ─────────────────────────────────────────────
  {
    week: 8, level: 'css', topicId: 'animasi-transisi',
    titleId: 'Animasi & Transisi', titleEn: 'Animations & Transitions',
    programId: 'UI Animasi', programEn: 'Animated UI',
    levelNameId: 'CSS3 Lengkap', levelNameEn: 'Complete CSS3',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>CSS Animations</title>
    <style>
        body { font-family: sans-serif; padding: 20px; }

        /* Transition */
        .btn {
            padding: 12px 24px;
            background: #2E5B44;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
        }

        .btn:hover {
            background: #1b5e20;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(46,91,68,0.4);
        }

        .btn:active {
            transform: translateY(0);
        }

        /* Transform */
        .transform-box {
            width: 100px;
            height: 100px;
            background: #4CAF50;
            margin: 20px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: white;
            border-radius: 8px;
            transition: transform 0.5s ease;
        }

        .rotate:hover { transform: rotate(45deg); }
        .scale:hover { transform: scale(1.3); }
        .translate:hover { transform: translate(30px, -10px); }
        .skew:hover { transform: skew(10deg, 5deg); }

        /* Keyframe Animation */
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }

        .bounce {
            width: 60px;
            height: 60px;
            background: #e74c3c;
            border-radius: 50%;
            animation: bounce 1s ease-in-out infinite;
        }

        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .spin {
            width: 50px;
            height: 50px;
            border: 4px solid #e0e0e0;
            border-top-color: #2196F3;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .fade-in {
            animation: fadeIn 0.6s ease-out;
        }

        /* Staggered animation */
        .stagger-item {
            opacity: 0;
            animation: fadeIn 0.5s ease-out forwards;
        }
        .stagger-item:nth-child(1) { animation-delay: 0.1s; }
        .stagger-item:nth-child(2) { animation-delay: 0.2s; }
        .stagger-item:nth-child(3) { animation-delay: 0.3s; }
        .stagger-item:nth-child(4) { animation-delay: 0.4s; }
    </style>
</head>
<body>
    <h1>CSS Animations & Transitions</h1>

    <h2>Transition</h2>
    <button class="btn">Hover me!</button>

    <h2>Transform</h2>
        <div class="transform-box rotate">Rotate</div>
        <div class="transform-box scale">Scale</div>
        <div class="transform-box translate">Translate</div>
        <div class="transform-box skew">Skew</div>

    <h2>Keyframe Animations</h2>
    <div style="display:flex;gap:30px;align-items:center;">
        <div class="bounce"></div>
        <div class="spin"></div>
    </div>

    <h2>Staggered Fade In</h2>
    <div>
        <div class="stagger-item card" style="background:#e3f2fd;padding:15px;margin:5px;border-radius:6px;">Item 1</div>
        <div class="stagger-item card" style="background:#e8f5e9;padding:15px;margin:5px;border-radius:6px;">Item 2</div>
        <div class="stagger-item card" style="background:#fff3e0;padding:15px;margin:5px;border-radius:6px;">Item 3</div>
        <div class="stagger-item card" style="background:#f3e5f5;padding:15px;margin:5px;border-radius:6px;">Item 4</div>
    </div>
</body>
</html>`,
    objectivesId: [
      'Transition: property, duration, timing-function, delay',
      'Transform: rotate, scale, translate, skew',
      'Keyframes: @keyframes untuk animasi kompleks',
      'Animation: name, duration, timing, delay, iteration, direction',
      'Staggered animation dengan animation-delay',
    ],
    objectivesEn: [
      'Transition: property, duration, timing-function, delay',
      'Transform: rotate, scale, translate, skew',
      'Keyframes: @keyframes for complex animations',
      'Animation: name, duration, timing, delay, iteration, direction',
      'Staggered animation with animation-delay',
    ],
    explanationId: '### Transition\n`transition: all 0.3s ease` — animasi saat state berubah. Property, duration, timing-function, delay.\n\n### Transform\n`rotate(45deg)`, `scale(1.3)`, `translate(x,y)`, `skew(x,y)` — manipulasi visual.\n\n### Keyframes\n`@keyframes name { 0% {...} 50% {...} 100% {...} }` — definisi animasi.\n\n### Animation Shorthand\n`animation: name 1s ease-in-out 0.5s infinite alternate`.\n\n### Staggered\n`animation-delay` berbeda untuk efek berurutan.',
    explanationEn: '### Transition\n`transition: all 0.3s ease` — animate on state change. Property, duration, timing-function, delay.\n\n### Transform\n`rotate(45deg)`, `scale(1.3)`, `translate(x,y)`, `skew(x,y)` — visual manipulation.\n\n### Keyframes\n`@keyframes name { 0% {...} 50% {...} 100% {...} }` — animation definition.\n\n### Animation Shorthand\n`animation: name 1s ease-in-out 0.5s infinite alternate`.\n\n### Staggered\nDifferent `animation-delay` for sequential effect.',
    experimentsId: [
      'Buat loading spinner dengan keyframes',
      'Coba cubic-bezier custom timing function',
      'Eksperimen transform 3D: perspective, rotateX',
      'Buat page transition animation',
      'Coba animation-fill-mode: forwards',
    ],
    experimentsEn: [
      'Create loading spinner with keyframes',
      'Try cubic-bezier custom timing function',
      'Experiment 3D transform: perspective, rotateX',
      'Create page transition animation',
      'Try animation-fill-mode: forwards',
    ],
    challengeId: 'Buat halaman dengan: animated button, loading spinner, staggered card entrance, dan hover effects.',
    challengeEn: 'Create a page with: animated button, loading spinner, staggered card entrance, and hover effects.',
    summaryId: 'Minggu 8 dari 12: **Animasi & Transisi** (Level: CSS3 Lengkap). Hidupkan UI. Minggu depan: **CSS Variables**.',
    summaryEn: 'Week 8 of 12: **Animations & Transitions** (Level: Complete CSS3). Bring UI to life. Next week: **CSS Variables**.',
  },
  // ── WEEK 9: CSS Variables ──────────────────────────────────────────────────
  {
    week: 9, level: 'css', topicId: 'css-variables',
    titleId: 'CSS Variables', titleEn: 'CSS Variables',
    programId: 'Theming dengan Variables', programEn: 'Theming with Variables',
    levelNameId: 'CSS3 Lengkap', levelNameEn: 'Complete CSS3',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>CSS Variables</title>
    <style>
        /* Define variables */
        :root {
            --primary: #2E5B44;
            --primary-light: #4CAF50;
            --secondary: #e74c3c;
            --bg: #ffffff;
            --bg-card: #f5f5f5;
            --text: #333333;
            --text-light: #666666;
            --radius: 8px;
            --shadow: 0 2px 8px rgba(0,0,0,0.1);
            --spacing-sm: 8px;
            --spacing-md: 16px;
            --spacing-lg: 32px;
            --font-main: 'Segoe UI', sans-serif;
        }

        /* Dark theme */
        [data-theme="dark"] {
            --bg: #121417;
            --bg-card: #1e1e1e;
            --text: #e0e0e0;
            --text-light: #aaaaaa;
            --shadow: 0 2px 8px rgba(0,0,0,0.4);
        }

        body {
            font-family: var(--font-main);
            background: var(--bg);
            color: var(--text);
            padding: var(--spacing-lg);
            transition: background 0.3s, color 0.3s;
        }

        .card {
            background: var(--bg-card);
            border-radius: var(--radius);
            padding: var(--spacing-md);
            box-shadow: var(--shadow);
            margin-bottom: var(--spacing-md);
        }

        .btn {
            padding: var(--spacing-sm) var(--spacing-md);
            background: var(--primary);
            color: white;
            border: none;
            border-radius: var(--radius);
            cursor: pointer;
            font-family: var(--font-main);
        }

        .btn-secondary {
            background: var(--secondary);
        }

        .btn-outline {
            background: transparent;
            border: 2px solid var(--primary);
            color: var(--primary);
        }

        /* Variable with fallback */
        .fallback {
            color: var(--undefined-var, #ff9800);
        }

        /* Computed with calc() */
        .fluid-width {
            width: calc(100% - var(--spacing-lg) * 2);
            background: var(--primary-light);
            color: white;
            padding: var(--spacing-md);
            border-radius: var(--radius);
        }
    </style>
</head>
<body>
    <h1>CSS Variables (Custom Properties)</h1>

    <button class="btn" onclick="toggleTheme()">Toggle Dark Mode</button>

    <div class="card">
        <h2>Theming dengan Variables</h2>
        <p>Ubah semua warna dengan mengubah variabel di :root.</p>
        <p class="fallback">Fallback: <code>var(--undefined, #ff9800)</code></p>
    </div>

    <div class="card">
        <h2>Spacing System</h2>
        <p>Spacing konsisten dengan variables: sm, md, lg.</p>
        <button class="btn">Primary</button>
        <button class="btn btn-secondary">Secondary</button>
        <button class="btn btn-outline">Outline</button>
    </div>

    <div class="fluid-width">
        Width calculated: calc(100% - 32px * 2)
    </div>

    <script>
        function toggleTheme() {
            const html = document.documentElement;
            const current = html.getAttribute('data-theme');
            html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
        }
    </script>
</body>
</html>`,
    objectivesId: [
      'Definisi variabel: --name: value di :root',
      'Penggunaan: var(--name) dengan fallback var(--name, fallback)',
      'Theming: dark mode dengan mengubah variabel',
      'Scope variabel: global (:root) vs local (element)',
      'Kombinasi dengan calc() untuk perhitungan dinamis',
    ],
    objectivesEn: [
      'Define variables: --name: value in :root',
      'Usage: var(--name) with fallback var(--name, fallback)',
      'Theming: dark mode by changing variables',
      'Variable scope: global (:root) vs local (element)',
      'Combine with calc() for dynamic calculations',
    ],
    explanationId: '### Definisi & Penggunaan\n`--primary: #2E5B44` di `:root`. Pakai: `color: var(--primary)`.\n\n### Fallback\n`var(--undefined, #ff9800)` — gunakan #ff9800 jika variabel tidak ada.\n\n### Theming\nUbah variabel di `[data-theme="dark"]` — semua elemen otomatis berubah.\n\n### Scope\nVariabel di :root = global. Variabel di .card = hanya untuk .card dan children.\n\n### Calc\n`calc(100% - var(--spacing) * 2)` — kombinasi variabel dan perhitungan.',
    explanationEn: '### Definition & Usage\n`--primary: #2E5B44` in `:root`. Use: `color: var(--primary)`.\n\n### Fallback\n`var(--undefined, #ff9800)` — use #ff9800 if variable doesn\'t exist.\n\n### Theming\nChange variables in `[data-theme="dark"]` — all elements update automatically.\n\n### Scope\nVariables in :root = global. Variables in .card = only for .card and children.\n\n### Calc\n`calc(100% - var(--spacing) * 2)` — combine variables and calculations.',
    experimentsId: [
      'Buat theme switcher dengan 3 tema berbeda',
      'Coba variabel lokal di dalam komponen',
      'Eksperimen calc() dengan unit berbeda',
      'Buat spacing system dengan variables',
      'Coba variabel untuk font-size scale',
    ],
    experimentsEn: [
      'Create theme switcher with 3 different themes',
      'Try local variables inside components',
      'Experiment calc() with different units',
      'Create spacing system with variables',
      'Try variables for font-size scale',
    ],
    challengeId: 'Buat design system sederhana: warna, spacing, typography, shadows — semua dengan CSS variables + dark mode toggle.',
    challengeEn: 'Create a simple design system: colors, spacing, typography, shadows — all with CSS variables + dark mode toggle.',
    summaryId: 'Minggu 9 dari 12: **CSS Variables** (Level: CSS3 Lengkap). Maintainable styling. Minggu depan: **Arsitektur CSS**.',
    summaryEn: 'Week 9 of 12: **CSS Variables** (Level: Complete CSS3). Maintainable styling. Next week: **CSS Architecture**.',
  },
  // ── WEEK 10: Arsitektur CSS ────────────────────────────────────────────────
  {
    week: 10, level: 'css', topicId: 'arsitektur-css',
    titleId: 'Arsitektur CSS', titleEn: 'CSS Architecture',
    programId: 'BEM & Organisasi', programEn: 'BEM & Organization',
    levelNameId: 'CSS3 Lengkap', levelNameEn: 'Complete CSS3',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>CSS Architecture — BEM</title>
    <style>
        /* ─── BEM: Block__Element──Modifier ─── */

        /* Block: standalone component */
        .card {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        /* Element: part of block */
        .card__header {
            padding: 20px;
            background: #2E5B44;
            color: white;
        }

        .card__title {
            margin: 0;
            font-size: 1.25rem;
        }

        .card__body {
            padding: 20px;
        }

        .card__footer {
            padding: 15px 20px;
            background: #f5f5f5;
            border-top: 1px solid #eee;
        }

        /* Modifier: variant */
        .card--featured {
            border: 2px solid #4CAF50;
        }

        .card--featured .card__header {
            background: #4CAF50;
        }

        .card--dark {
            background: #1e1e1e;
            color: #e0e0e0;
        }

        /* Button Block */
        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
        }

        .btn--primary { background: #2E5B44; color: white; }
        .btn--danger { background: #e74c3c; color: white; }
        .btn--large { padding: 15px 30px; font-size: 16px; }
        .btn--small { padding: 6px 12px; font-size: 12px; }

        /* Utility classes */
        .text-center { text-align: center; }
        .mt-1 { margin-top: 8px; }
        .mt-2 { margin-top: 16px; }
        .mt-3 { margin-top: 24px; }
        .p-1 { padding: 8px; }
        .p-2 { padding: 16px; }
    </style>
</head>
<body>
    <h1>CSS Architecture — BEM</h1>

    <!-- Standard Card -->
    <div class="card">
        <div class="card__header">
            <h2 class="card__title">Card Standard</h2>
        </div>
        <div class="card__body">
            <p>Ini adalah card dengan BEM naming convention.</p>
        </div>
        <div class="card__footer">
            <button class="btn btn--primary">Action</button>
        </div>
    </div>

    <!-- Featured Card -->
    <div class="card card--featured mt-2">
        <div class="card__header">
            <h2 class="card__title">Card Featured</h2>
        </div>
        <div class="card__body">
            <p>Modifier --featured menambahkan border hijau.</p>
        </div>
        <div class="card__footer">
            <button class="btn btn--danger btn--large">Delete</button>
        </div>
    </div>

    <!-- Dark Card -->
    <div class="card card--dark mt-2">
        <div class="card__header">
            <h2 class="card__title">Card Dark</h2>
        </div>
        <div class="card__body">
            <p>Modifier --dark untuk tema gelap.</p>
        </div>
    </div>
</body>
</html>`,
    objectivesId: [
      'BEM naming: Block__Element--Modifier',
      'Block: standalone component (card, btn, nav)',
      'Element: bagian dari block (card__title, card__body)',
      'Modifier: varian block/element (card--featured, btn--primary)',
      'Utility classes untuk spacing dan text alignment',
    ],
    objectivesEn: [
      'BEM naming: Block__Element--Modifier',
      'Block: standalone component (card, btn, nav)',
      'Element: part of block (card__title, card__body)',
      'Modifier: block/element variant (card--featured, btn--primary)',
      'Utility classes for spacing and text alignment',
    ],
    explanationId: '### BEM Convention\n`Block__Element--Modifier` — naming yang jelas dan predictable.\n\n### Block\nStandalone component: `.card`, `.btn`, `.nav`.\n\n### Element\nBagian dari block: `.card__title`, `.card__body` (double underscore).\n\n### Modifier\nVarian: `.card--featured`, `.btn--primary` (double dash).\n\n### Utility Classes\n`.text-center`, `.mt-2` — classes kecil yang bisa dipakai di mana saja.\n\n### Manfaat\n- Nama jelas dan konsisten\n- Tidak ada naming collision\n- Mudah dipahami tim',
    explanationEn: '### BEM Convention\n`Block__Element--Modifier` — clear and predictable naming.\n\n### Block\nStandalone component: `.card`, `.btn`, `.nav`.\n\n### Element\nPart of block: `.card__title`, `.card__body` (double underscore).\n\n### Modifier\nVariant: `.card--featured`, `.btn--primary` (double dash).\n\n### Utility Classes\n`.text-center`, `.mt-2` — small reusable classes.\n\n### Benefits\n- Clear, consistent naming\n- No naming collisions\n- Easy for team to understand',
    experimentsId: [
      'Buat component baru dengan BEM: navbar atau modal',
      'Tambah modifier untuk ukuran berbeda',
      'Eksperimen dengan nested elements',
      'Buat utility classes untuk warna',
      'Coba BEM dengan responsive suffix',
    ],
    experimentsEn: [
      'Create new component with BEM: navbar or modal',
      'Add modifier for different sizes',
      'Experiment with nested elements',
      'Create utility classes for colors',
      'Try BEM with responsive suffix',
    ],
    challengeId: 'Buat component library: card, button, navbar, form input — semua dengan BEM naming dan modifiers.',
    challengeEn: 'Create a component library: card, button, navbar, form input — all with BEM naming and modifiers.',
    summaryId: 'Minggu 10 dari 12: **Arsitektur CSS** (Level: CSS3 Lengkap). Scalable styling. Minggu depan: **Modern CSS**.',
    summaryEn: 'Week 10 of 12: **CSS Architecture** (Level: Complete CSS3). Scalable styling. Next week: **Modern CSS**.',
  },
  // ── WEEK 11: Modern CSS ────────────────────────────────────────────────────
  {
    week: 11, level: 'css', topicId: 'modern-css',
    titleId: 'Modern CSS', titleEn: 'Modern CSS',
    programId: 'Fitur CSS Modern', programEn: 'Modern CSS Features',
    levelNameId: 'CSS3 Lengkap', levelNameEn: 'Complete CSS3',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Modern CSS</title>
    <style>
        body { font-family: sans-serif; padding: 20px; }

        /* :has() selector */
        .card:has(img) {
            border: 2px solid #4CAF50;
        }

        .card:has(.badge--urgent) {
            border-color: #e74c3c;
            background: #ffebee;
        }

        /* Nesting (native CSS) */
        .card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);

            & .card-title {
                color: #2E5B44;
                margin: 0 0 10px;
            }

            & .card-text {
                color: #666;
                line-height: 1.6;
            }

            &:hover {
                box-shadow: 0 4px 16px rgba(0,0,0,0.15);
            }
        }

        /* Subgrid */
        .grid-parent {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
        }

        .grid-child {
            display: grid;
            grid-template-rows: subgrid;
            grid-row: span 3;
            background: #e3f2fd;
            padding: 15px;
            border-radius: 8px;
        }

        /* Aspect ratio */
        .aspect-box {
            aspect-ratio: 16 / 9;
            background: linear-gradient(135deg, #2E5B44, #4CAF50);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
            border-radius: 8px;
        }

        /* Scroll snap */
        .snap-container {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 15px;
            padding: 10px 0;
        }

        .snap-item {
            scroll-snap-align: center;
            min-width: 200px;
            height: 150px;
            background: #f3e5f5;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            font-size: 1.1rem;
        }

        /* Logical properties */
        .logical {
            padding-inline: 20px;
            padding-block: 10px;
            margin-inline: auto;
            border-inline-start: 4px solid #2E5B44;
            max-inline-size: 400px;
            background: #e8f5e9;
        }

        /* Color mix */
        .color-mix {
            background: color-mix(in srgb, #2E5B44 70%, white);
            color: white;
            padding: 15px;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <h1>Modern CSS Features</h1>

    <h2>:has() Selector</h2>
    <div class="card" style="margin-bottom:15px;">
        <h3 class="card-title">Card dengan gambar → border hijau</h3>
        <img src="https://picsum.photos/60/40" alt="" style="border-radius:4px;">
    </div>
    <div class="card">
        <h3 class="card-title">Card dengan badge urgent → border merah</h3>
        <span class="badge--urgent" style="background:#e74c3c;color:white;padding:2px 8px;border-radius:4px;font-size:12px;">Urgent</span>
    </div>

    <h2>Native Nesting</h2>
    <div class="card" style="margin:15px 0;">
        <h3 class="card-title">Nested CSS</h3>
        <p class="card-text">Tidak perlu preprocessor lagi!</p>
    </div>

    <h2>Aspect Ratio</h2>
    <div class="aspect-box">16:9 Aspect Ratio</div>

    <h2>Scroll Snap</h2>
    <div class="snap-container">
        <div class="snap-item">Snap 1</div>
        <div class="snap-item">Snap 2</div>
        <div class="snap-item">Snap 3</div>
        <div class="snap-item">Snap 4</div>
    </div>

    <h2>Logical Properties</h2>
    <div class="logical">padding-inline, margin-inline, border-inline-start</div>

    <h2>Color Mix</h2>
    <div class="color-mix">color-mix(in srgb, #2E5B44 70%, white)</div>
</body>
</html>`,
    objectivesId: [
      ':has() selector — parent selector akhirnya ada di CSS',
      'Native CSS nesting — tidak perlu preprocessor',
      'aspect-ratio untuk rasio proporsional otomatis',
      'Scroll snap untuk carousel native',
      'Logical properties: padding-inline, margin-inline, border-inline',
    ],
    objectivesEn: [
      ':has() selector — parent selector finally in CSS',
      'Native CSS nesting — no preprocessor needed',
      'aspect-ratio for automatic proportional ratios',
      'Scroll snap for native carousels',
      'Logical properties: padding-inline, margin-inline, border-inline',
    ],
    explanationId: '### :has()\n`.card:has(img)` — style parent berdasarkan child. "Parent selector" yang lama ditunggu.\n\n### Native Nesting\n`& .child {}` — nesting langsung di CSS, tidak perlu Sass/Less.\n\n### Aspect Ratio\n`aspect-ratio: 16/9` — rasio otomatis tanpa padding hack.\n\n### Scroll Snap\n`scroll-snap-type: x mandatory` + `scroll-snap-align: center` — carousel native.\n\n### Logical Properties\n`padding-inline` (kiri/kanan), `padding-block` (atas/bawah) — RTL friendly.\n\n### Color Mix\n`color-mix(in srgb, #color1 70%, #color2)` — campur warna langsung di CSS.',
    explanationEn: '### :has()\n`.card:has(img)` — style parent based on child. The long-awaited "parent selector".\n\n### Native Nesting\n`& .child {}` — nest directly in CSS, no Sass/Less needed.\n\n### Aspect Ratio\n`aspect-ratio: 16/9` — automatic ratio without padding hack.\n\n### Scroll Snap\n`scroll-snap-type: x mandatory` + `scroll-snap-align: center` — native carousel.\n\n### Logical Properties\n`padding-inline` (left/right), `padding-block` (top/bottom) — RTL friendly.\n\n### Color Mix\n`color-mix(in srgb, #color1 70%, #color2)` — mix colors directly in CSS.',
    experimentsId: [
      'Buat form validation dengan :has(:invalid)',
      'Coba nesting 3 level dalam',
      'Eksperimen aspect-ratio dengan berbagai rasio',
      'Buat vertical scroll snap',
      'Coba logical properties dengan RTL direction',
    ],
    experimentsEn: [
      'Create form validation with :has(:invalid)',
      'Try nesting 3 levels deep',
      'Experiment aspect-ratio with various ratios',
      'Create vertical scroll snap',
      'Try logical properties with RTL direction',
    ],
    challengeId: 'Buat gallery dengan: :has() untuk hover effect, aspect-ratio untuk gambar, scroll snap untuk navigasi.',
    challengeEn: 'Create a gallery with: :has() for hover effects, aspect-ratio for images, scroll snap for navigation.',
    summaryId: 'Minggu 11 dari 12: **Modern CSS** (Level: CSS3 Lengkap). CSS masa kini. Minggu depan: **Proyek Akhir**!',
    summaryEn: 'Week 11 of 12: **Modern CSS** (Level: Complete CSS3). CSS today. Next week: **Final Project**!',
  },
  // ── WEEK 12: Proyek Akhir ──────────────────────────────────────────────────
  {
    week: 12, level: 'css', topicId: 'proyek-akhir',
    titleId: 'Proyek Akhir: Landing Page', titleEn: 'Final Project: Landing Page',
    programId: 'Landing Page Profesional', programEn: 'Professional Landing Page',
    levelNameId: 'CSS3 Lengkap', levelNameEn: 'Complete CSS3',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page — Tech Startup</title>
    <style>
        :root {
            --primary: #2E5B44;
            --primary-light: #4CAF50;
            --text: #333;
            --text-light: #666;
            --bg: #fff;
            --bg-alt: #f5f5f5;
            --radius: 8px;
            --shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            font-family: 'Segoe UI', sans-serif;
            color: var(--text);
            line-height: 1.6;
        }

        /* Navbar */
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 40px;
            background: var(--bg);
            box-shadow: var(--shadow);
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .navbar__logo { font-size: 1.5rem; font-weight: 700; color: var(--primary); }
        .navbar__links { display: flex; gap: 30px; list-style: none; }
        .navbar__links a { text-decoration: none; color: var(--text); }

        /* Hero */
        .hero {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 80vh;
            background: linear-gradient(135deg, var(--primary), var(--primary-light));
            color: white;
            text-align: center;
            padding: 40px 20px;
        }

        .hero__title { font-size: clamp(2rem, 5vw, 4rem); margin-bottom: 20px; }
        .hero__subtitle { font-size: clamp(1rem, 2vw, 1.5rem); opacity: 0.9; margin-bottom: 30px; }

        .btn {
            padding: 15px 30px;
            border: none;
            border-radius: var(--radius);
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s;
        }

        .btn--light { background: white; color: var(--primary); }
        .btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }

        /* Features */
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
            padding: 80px 40px;
            background: var(--bg-alt);
        }

        .feature-card {
            background: white;
            padding: 30px;
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            text-align: center;
            transition: transform 0.3s;
        }

        .feature-card:hover { transform: translateY(-5px); }
        .feature-card__icon { font-size: 2.5rem; margin-bottom: 15px; }
        .feature-card__title { color: var(--primary); margin-bottom: 10px; }

        /* CTA */
        .cta {
            text-align: center;
            padding: 80px 40px;
            background: var(--primary);
            color: white;
        }

        .cta__title { font-size: 2rem; margin-bottom: 20px; }

        /* Footer */
        .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 30px 40px;
            background: #1a1a1a;
            color: #aaa;
        }

        .footer__links { display: flex; gap: 20px; list-style: none; }
        .footer__links a { color: #aaa; text-decoration: none; }

        /* Responsive */
        @media (max-width: 768px) {
            .navbar { flex-direction: column; gap: 15px; }
            .navbar__links { flex-wrap: wrap; justify-content: center; }
            .features { padding: 40px 20px; }
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="navbar__logo">TechCo</div>
        <ul class="navbar__links">
            <li><a href="#features">Fitur</a></li>
            <li><a href="#cta">Harga</a></li>
            <li><a href="#kontak">Kontak</a></li>
        </ul>
    </nav>

    <section class="hero">
        <div>
            <h1 class="hero__title">Build Something Amazing</h1>
            <p class="hero__subtitle">Platform modern untuk developer yang ingin berkarya lebih cepat.</p>
            <button class="btn btn--light">Mulai Sekarang</button>
        </div>
    </section>

    <section class="features" id="features">
        <div class="feature-card">
            <div class="feature-card__icon">⚡</div>
            <h3 class="feature-card__title">Cepat</h3>
            <p>Performa tinggi dengan optimasi modern.</p>
        </div>
        <div class="feature-card">
            <div class="feature-card__icon">🔒</div>
            <h3 class="feature-card__title">Aman</h3>
            <p>Keamanan enterprise-grade built-in.</p>
        </div>
        <div class="feature-card">
            <div class="feature-card__icon">📱</div>
            <h3 class="feature-card__title">Responsive</h3>
            <p>Tampil sempurna di semua perangkat.</p>
        </div>
    </section>

    <section class="cta" id="cta">
        <h2 class="cta__title">Siap memulai?</h2>
        <p style="margin-bottom:20px;">Bergabung dengan 10,000+ developer.</p>
        <button class="btn btn--light">Daftar Gratis</button>
    </section>

    <footer class="footer">
        <p>&copy; 2026 TechCo</p>
        <ul class="footer__links">
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </footer>
</body>
</html>`,
    objectivesId: [
      'Menggabungkan semua konsep: variables, flexbox, grid, responsive, animasi',
      'BEM naming convention untuk maintainability',
      'Sticky navbar dengan backdrop',
      'Hero section dengan gradient dan fluid typography',
      'Responsive grid layout dengan auto-fit',
    ],
    objectivesEn: [
      'Combine all concepts: variables, flexbox, grid, responsive, animations',
      'BEM naming convention for maintainability',
      'Sticky navbar with backdrop',
      'Hero section with gradient and fluid typography',
      'Responsive grid layout with auto-fit',
    ],
    explanationId: '### Proyek Akhir\nGabungan semua 11 minggu sebelumnya dalam satu landing page profesional.\n\n### Komponen\n- Sticky navbar dengan flexbox\n- Hero section dengan gradient + fluid typography\n- Features grid dengan auto-fit + hover animation\n- CTA section\n- Footer dengan flexbox\n- Fully responsive\n- BEM naming\n- CSS variables untuk theming',
    explanationEn: '### Final Project\nCombines all 11 previous weeks in one professional landing page.\n\n### Components\n- Sticky navbar with flexbox\n- Hero section with gradient + fluid typography\n- Features grid with auto-fit + hover animation\n- CTA section\n- Footer with flexbox\n- Fully responsive\n- BEM naming\n- CSS variables for theming',
    experimentsId: [
      'Tambah dark mode toggle',
      'Buat hamburger menu untuk mobile',
      'Tambah scroll animations',
      'Buat halaman tambahan: about atau pricing',
      'Tambah testimonial carousel',
    ],
    experimentsEn: [
      'Add dark mode toggle',
      'Create hamburger menu for mobile',
      'Add scroll animations',
      'Create additional page: about or pricing',
      'Add testimonial carousel',
    ],
    challengeId: 'Buat multi-page website: landing, about, pricing, contact — dengan CSS konsisten dan fully responsive.',
    challengeEn: 'Create a multi-page website: landing, about, pricing, contact — with consistent CSS and fully responsive.',
    summaryId: 'Minggu 12 dari 12: **Proyek Akhir: Landing Page** (Level: CSS3 Lengkap). Selesai! 🎉 Anda sudah menguasai CSS3 dari nol hingga mahir.',
    summaryEn: 'Week 12 of 12: **Final Project: Landing Page** (Level: Complete CSS5). Complete! 🎉 You\'ve mastered CSS3 from scratch to expert.',
  },
];

// Add weeks to levels
for (const level of LEVELS) {
  level.weeks = MODULES.filter(m => m.level === level.levelId).map(m => ({
    week: m.week,
    topicId: m.topicId,
    titleId: m.titleId,
    titleEn: m.titleEn,
  }));
}

gen.writeFiles(MODULES, LEVELS);
