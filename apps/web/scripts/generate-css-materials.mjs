import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.resolve(__dirname, '../public/data/course/css3/css');

const MODULES = [
  { id: 1,  f: 'how-css-works',      lid: 'Cara CSS Bekerja',      len: 'How CSS Works',           cid: 'Dasar CSS',          cen: 'CSS Fundamentals' },
  { id: 2,  f: 'box-model',           lid: 'Box Model',              len: 'Box Model',               cid: 'Visualisasi Box',    cen: 'Box Visualization' },
  { id: 3,  f: 'text-color',          lid: 'Teks & Warna',           len: 'Text & Color',            cid: 'Tipografi',          cen: 'Typography Showcase' },
  { id: 4,  f: 'flow-positioning',    lid: 'Alur & Posisi',          len: 'Flow & Positioning',      cid: 'Demo Posisi',        cen: 'Positioning Demo' },
  { id: 5,  f: 'flexbox',             lid: 'Flexbox',                len: 'Flexbox',                 cid: 'Tata Letak Flex',    cen: 'Flex Layout' },
  { id: 6,  f: 'css-grid',            lid: 'CSS Grid',               len: 'CSS Grid',                cid: 'Tata Letak Grid',    cen: 'Grid Layout' },
  { id: 7,  f: 'responsive-design',   lid: 'Desain Responsif',       len: 'Responsive Design',       cid: 'Halaman Responsif',  cen: 'Responsive Page' },
  { id: 8,  f: 'motion-animation',    lid: 'Gerak & Animasi',        len: 'Motion & Animation',      cid: 'Animasi CSS',        cen: 'CSS Animation' },
  { id: 9,  f: 'modern-css',          lid: 'CSS Modern',             len: 'Modern CSS',              cid: 'Fitur Modern',       cen: 'Modern Features' },
  { id: 10, f: 'final-project',       lid: 'Proyek Akhir: Portofolio', len: 'Final Project: Portfolio', cid: 'Portofolio',       cen: 'Portfolio Page' },
];

const OBJ = {
  1: {
    id: [
      'Memahami sintaks CSS: selector, property, dan value',
      'Mengenal 3 cara menambahkan CSS: inline, internal, dan external',
      'Menguasai berbagai jenis selector: elemen, class, ID, universal, dan grouping',
      'Memahami konsep cascade dan specificity dasar',
      'Mengetahui cara menghubungkan CSS ke HTML melalui <link> dan <style>'
    ],
    en: [
      'Understand CSS syntax: selector, property, and value',
      'Learn 3 ways to add CSS: inline, internal, and external',
      'Master various selectors: element, class, ID, universal, and grouping',
      'Understand the cascade and basic specificity concepts',
      'Know how to connect CSS to HTML via <link> and <style>'
    ]
  },
  2: {
    id: [
      'Memahami Box Model: content, padding, border, dan margin',
      'Menguasai perbedaan box-sizing: content-box vs border-box',
      'Mengatur ukuran elemen dengan width, height, dan overflow',
      'Memahami display: block vs inline dan pengaruhnya pada box',
      'Mengelola jarak antar elemen dengan margin collapsing'
    ],
    en: [
      'Understand the Box Model: content, padding, border, and margin',
      'Master box-sizing difference: content-box vs border-box',
      'Control element sizing with width, height, and overflow',
      'Understand display: block vs inline and their effect on boxes',
      'Manage spacing between elements with margin collapsing'
    ]
  },
  3: {
    id: [
      'Menguasai format warna: hex, rgb, hsl, dan oklch',
      'Mengatur tipografi: font-family, font-size, font-weight, line-height',
      'Menerapkan text-align, text-decoration, dan text-transform',
      'Menggunakan web fonts (@font-face dan Google Fonts)',
      'Membuat background dengan warna, gradien, dan gambar'
    ],
    en: [
      'Master color formats: hex, rgb, hsl, and oklch',
      'Control typography: font-family, font-size, font-weight, line-height',
      'Apply text-align, text-decoration, and text-transform',
      'Use web fonts (@font-face and Google Fonts)',
      'Create backgrounds with colors, gradients, and images'
    ]
  },
  4: {
    id: [
      'Memahami normal flow dan bagaimana elemen mengalir di halaman',
      'Menguasai display: block, inline, inline-block, dan none',
      'Menerapkan position: static, relative, absolute, fixed, dan sticky',
      'Menggunakan z-index untuk mengatur tumpukan elemen',
      'Memahami stacking context dan kapan terbentuknya'
    ],
    en: [
      'Understand normal flow and how elements flow on the page',
      'Master display: block, inline, inline-block, and none',
      'Apply position: static, relative, absolute, fixed, and sticky',
      'Use z-index to control element stacking',
      'Understand stacking context and when it forms'
    ]
  },
  5: {
    id: [
      'Memahami sumbu utama (main axis) dan sumbu silang (cross axis)',
      'Menguasai properti flex container: flex-direction, justify-content, align-items, gap, flex-wrap',
      'Menerapkan flex-grow, flex-shrink, dan flex-basis pada item',
      'Menggunakan align-self untuk override alignment individual',
      'Membangun layout navigasi dan card grid dengan Flexbox'
    ],
    en: [
      'Understand main axis and cross axis in Flexbox',
      'Master flex container properties: flex-direction, justify-content, align-items, gap, flex-wrap',
      'Apply flex-grow, flex-shrink, and flex-basis on items',
      'Use align-self to override individual alignment',
      'Build navigation and card grid layouts with Flexbox'
    ]
  },
  6: {
    id: [
      'Memahami CSS Grid untuk layout dua dimensi (baris + kolom)',
      'Menguasai grid-template-columns, grid-template-rows, dan unit fr',
      'Menerapkan grid-column dan grid-row untuk span dan penempatan',
      'Menggunakan minmax(), repeat(), auto-fit, dan auto-fill',
      'Membuat layout kompleks dengan grid-template-areas'
    ],
    en: [
      'Understand CSS Grid for two-dimensional layouts (rows + columns)',
      'Master grid-template-columns, grid-template-rows, and the fr unit',
      'Apply grid-column and grid-row for spanning and placement',
      'Use minmax(), repeat(), auto-fit, and auto-fill',
      'Create complex layouts with grid-template-areas'
    ]
  },
  7: {
    id: [
      'Memahami prinsip mobile-first dan progressive enhancement',
      'Menguasai media queries untuk berbagai breakpoint',
      'Menggunakan unit relatif: rem, em, vw, vh, %, clamp()',
      'Menerapkan container queries untuk responsivitas komponen',
      'Menggunakan prefers-color-scheme untuk dark/light mode'
    ],
    en: [
      'Understand mobile-first principles and progressive enhancement',
      'Master media queries for different breakpoints',
      'Use relative units: rem, em, vw, vh, %, clamp()',
      'Apply container queries for component-level responsiveness',
      'Use prefers-color-scheme for dark/light mode'
    ]
  },
  8: {
    id: [
      'Membuat transisi halus dengan transition-property, duration, timing, delay',
      'Menguasai transform: translate, rotate, scale, skew, transform-origin',
      'Mendefinisikan animasi kompleks dengan @keyframes',
      'Mengatur animation: name, duration, timing, delay, iteration, direction, fill-mode',
      'Memahami performa animasi: hanya animasikan transform dan opacity'
    ],
    en: [
      'Create smooth transitions with transition-property, duration, timing, delay',
      'Master transform: translate, rotate, scale, skew, transform-origin',
      'Define complex animations with @keyframes',
      'Control animation: name, duration, timing, delay, iteration, direction, fill-mode',
      'Understand animation performance: only animate transform and opacity'
    ]
  },
  9: {
    id: [
      'Mendeklarasikan dan menggunakan Custom Properties (CSS variables)',
      'Menggunakan calc() untuk perhitungan dinamis dalam CSS',
      'Menerapkan nesting CSS native untuk stylesheet yang lebih rapi',
      'Mengatur prioritas stylesheet dengan @layer',
      'Menggunakan selector modern: :has(), :not(), :is(), :where()'
    ],
    en: [
      'Declare and use Custom Properties (CSS variables)',
      'Use calc() for dynamic calculations in CSS',
      'Apply native CSS nesting for cleaner stylesheets',
      'Control stylesheet priority with @layer',
      'Use modern selectors: :has(), :not(), :is(), :where()'
    ]
  },
  10: {
    id: [
      'Merencanakan struktur portofolio yang responsif',
      'Menggabungkan Flexbox, Grid, dan positioning dalam satu halaman',
      'Menerapkan tema konsisten dengan Custom Properties',
      'Menambahkan interaktivitas dengan transisi dan animasi',
      'Mengoptimalkan layout untuk mobile, tablet, dan desktop'
    ],
    en: [
      'Plan a responsive portfolio structure',
      'Combine Flexbox, Grid, and positioning in one page',
      'Apply consistent theming with Custom Properties',
      'Add interactivity with transitions and animations',
      'Optimize layout for mobile, tablet, and desktop'
    ]
  },
};

const CODE = {
  1: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Cara CSS Bekerja</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; background: #f0f4f8; padding: 2rem; }
    h1 { color: #1572B6; text-align: center; margin-bottom: 1.5rem; font-size: 2rem; }
    .card { background: #fff; border-radius: 12px; padding: 2rem; max-width: 700px; margin: 0 auto 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .highlight { background: #e3f0fa; border-left: 4px solid #1572B6; }
    #main-title { border-bottom: 3px solid #1572B6; padding-bottom: 0.5rem; }
    .btn { display: inline-block; background: #1572B6; color: #fff; padding: 0.7rem 1.8rem; border-radius: 6px; text-decoration: none; font-weight: 600; border: none; cursor: pointer; }
    .btn:hover { background: #115a8f; }
    p { line-height: 1.7; margin-bottom: 0.8rem; }
    code { background: #e8e8e8; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.9em; }
    .selector-demo { margin: 0.8rem 0; padding: 0.8rem; border-radius: 6px; }
    .universal-demo * { border: 1px solid #ddd; padding: 0.3rem; margin: 0.2rem 0; }
  </style>
</head>
<body>
  <h1 id="main-title">Cara CSS Bekerja</h1>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Selector Element</h2>
    <p>Semua elemen <code>h1</code> dan <code>p</code> mendapat style dari selector elemen.</p>
  </div>
  <div class="card highlight">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Selector Class</h2>
    <p>Kartu ini menggunakan class <code>.highlight</code> untuk border biru dan background.</p>
  </div>
  <div class="card universal-demo">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Selector Universal</h2>
    <span>Item A</span><span>Item B</span><div>Item C</div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Grouping & Inline</h2>
    <p>CSS internal di <code>&lt;style&gt;</code> mengatur halaman ini.</p>
    <p style="color:#1572B6;font-weight:bold">Paragraf ini pakai inline CSS.</p>
    <button class="btn">Tombol dengan CSS</button>
  </div>
</body>
</html>`,

  2: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Box Model</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; background: #f0f4f8; padding: 2rem; }
    h1 { color: #1572B6; text-align: center; margin-bottom: 1.5rem; }
    .card { background: #fff; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .box-viz { margin: 1.5rem auto; width: 300px; }
    .box-viz .margin { background: #ffd54f; padding: 1.5rem; border-radius: 8px; }
    .box-viz .border { background: #ff8a65; padding: 1.5rem; border-radius: 4px; }
    .box-viz .padding { background: #81c784; padding: 1.5rem; }
    .box-viz .content { background: #64b5f6; padding: 1.5rem; text-align: center; color: #fff; font-weight: bold; border-radius: 2px; }
    .box-viz .label { text-align: center; font-size: 0.75rem; margin-top: 0.3rem; color: #555; }
    .row { display: flex; gap: 1.5rem; flex-wrap: wrap; }
    .box { width: 200px; padding: 1.5rem; border: 5px solid #1572B6; margin: 1rem; background: #e3f0fa; text-align: center; }
    .content-box { box-sizing: content-box; background: #ffebee; }
    .border-box { box-sizing: border-box; background: #e8f5e9; }
    .overflow-demo { width: 200px; height: 60px; border: 2px solid #1572B6; padding: 0.5rem; overflow: auto; background: #fff; }
  </style>
</head>
<body>
  <h1>Box Model</h1>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.8rem">Anatomi Box Model</h2>
    <div class="box-viz">
      <div class="margin">
        <div style="font-size:0.8rem;text-align:center;margin-bottom:0.3rem">Margin</div>
        <div class="border">
          <div style="font-size:0.8rem;text-align:center;margin-bottom:0.3rem">Border</div>
          <div class="padding">
            <div style="font-size:0.8rem;text-align:center;margin-bottom:0.3rem">Padding</div>
            <div class="content">Content</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.8rem">content-box vs border-box</h2>
    <div class="row">
      <div><div class="box content-box">content-box<br>250px total</div><div class="label" style="text-align:center">width + padding + border</div></div>
      <div><div class="box border-box">border-box<br>200px total</div><div class="label" style="text-align:center">width = total termasuk border</div></div>
    </div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.8rem">Overflow</h2>
    <div class="overflow-demo">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</div>
    <div class="label" style="margin-top:0.3rem">Gulir untuk melihat konten yang meluap</div>
  </div>
</body>
</html>`,

  3: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Teks & Warna</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;600&family=Playfair+Display:ital@1&family=Fira+Code&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { background: #fafafa; padding: 2rem; }
    h1 { color: #1572B6; font-family: 'Inter', system-ui, sans-serif; text-align: center; font-size: 2rem; font-weight: 600; letter-spacing: -0.5px; margin-bottom: 1.5rem; }
    .card { background: #fff; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; max-width: 700px; margin-left: auto; margin-right: auto; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    .color-row { display: flex; gap: 0.8rem; margin: 0.8rem 0; flex-wrap: wrap; }
    .swatch { width: 60px; height: 60px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.6rem; font-weight: 600; text-align: center; }
    .font-playfair { font-family: 'Playfair Display', serif; font-style: italic; font-size: 1.3rem; }
    .font-inter { font-family: 'Inter', system-ui, sans-serif; font-weight: 300; font-size: 1.2rem; }
    .font-mono { font-family: 'Fira Code', monospace; font-size: 1rem; background: #f0f0f0; padding: 0.3rem 0.6rem; border-radius: 4px; }
    .decor-underline { text-decoration: underline; }
    .decor-line-through { text-decoration: line-through; color: #999; }
    .transform-upper { text-transform: uppercase; letter-spacing: 1px; }
    .transform-capitalize { text-transform: capitalize; }
    .bg-gradient { background: linear-gradient(135deg, #1572B6, #4a9de0); color: #fff; padding: 1.5rem; border-radius: 8px; text-align: center; margin: 0.8rem 0; }
    .line-height-loose { line-height: 2; }
    .line-height-tight { line-height: 1.2; }
  </style>
</head>
<body>
  <h1>Teks &amp; Warna</h1>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Format Warna</h2>
    <div class="color-row">
      <div class="swatch" style="background:#1572B6">HEX</div>
      <div class="swatch" style="background:rgb(21,114,182)">RGB</div>
      <div class="swatch" style="background:hsl(207,79%,40%)">HSL</div>
      <div class="swatch" style="background:oklch(0.5 0.15 250)">OKLCH</div>
      <div class="swatch" style="background:rgba(21,114,182,0.6)">RGBA</div>
    </div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Font Family</h2>
    <p class="font-playfair">Playfair Display — serif italic elegan</p>
    <p class="font-inter">Inter — sans-serif modern dengan weight 300</p>
    <p class="font-mono">Fira Code — monospace untuk kode</p>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Dekorasi & Transformasi</h2>
    <p class="decor-underline">Teks dengan garis bawah</p>
    <p class="decor-line-through">Teks dicoret</p>
    <p class="transform-upper">diubah menjadi huruf besar semua</p>
    <p class="transform-capitalize">setiap kata diawali huruf kapital</p>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Background Gradien</h2>
    <div class="bg-gradient">
      <p style="font-size:1.2rem;font-weight:600">Gradien Linear 135&deg;</p>
      <p style="font-size:0.9rem;opacity:0.9">#1572B6 &rarr; #4a9de0</p>
    </div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Line Height</h2>
    <p class="line-height-loose">Line height longgar (2.0) — setiap baris memiliki ruang ekstra yang membuat teks lebih mudah dibaca pada paragraf panjang.</p>
    <p class="line-height-tight">Line height rapat (1.2) — cocok untuk heading atau teks pendek.</p>
  </div>
</body>
</html>`,

  4: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Alur & Posisi</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; background: #f0f4f8; padding: 2rem; padding-top: 4rem; }
    h1 { color: #1572B6; text-align: center; margin-bottom: 1.5rem; }
    .card { background: #fff; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .demo-box { display: inline-block; width: 80px; height: 50px; color: #fff; display: inline-flex; align-items: center; justify-content: center; border-radius: 6px; font-size: 0.75rem; font-weight: 600; }
    .container { position: relative; height: 180px; background: #f5f5f5; border: 2px dashed #ccc; border-radius: 8px; margin: 1rem 0; }
    .static { position: static; background: #999; }
    .relative { position: relative; top: 15px; left: 20px; background: #1572B6; }
    .absolute { position: absolute; bottom: 10px; right: 10px; background: #e74c3c; }
    .sticky-header { position: sticky; top: 0; background: #1572B6; color: #fff; padding: 0.8rem; text-align: center; border-radius: 8px; z-index: 10; font-weight: 600; margin-bottom: 1rem; }
    .inline-demo span { background: #e3f0fa; border: 1px solid #1572B6; padding: 5px; margin: 3px; }
    .block-demo div { background: #e3f0fa; border: 1px solid #1572B6; padding: 5px; margin: 3px 0; }
    .inline-block-demo div { display: inline-block; background: #e3f0fa; border: 1px solid #1572B6; padding: 10px; margin: 3px; width: 100px; text-align: center; }
    .z-container { position: relative; height: 90px; margin: 1rem 0; }
    .z-box { position: absolute; width: 100px; height: 60px; color: #fff; display: flex; align-items: center; justify-content: center; border-radius: 6px; font-size: 0.75rem; font-weight: 600; }
    .z-1 { background: #1572B6; top: 10px; left: 10px; z-index: 1; }
    .z-2 { background: #e74c3c; top: 25px; left: 50px; z-index: 2; }
    .z-3 { background: #2ecc71; top: 40px; left: 90px; z-index: 3; }
  </style>
</head>
<body>
  <div class="sticky-header">Sticky Header — tetap di atas saat scroll</div>
  <h1>Alur &amp; Posisi</h1>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Display: Inline</h2>
    <div class="inline-demo"><span>inline 1</span><span>inline 2</span><span>inline 3</span></div>
    <p style="font-size:0.85rem;color:#666;margin-top:0.3rem">Elemen inline sejajar horizontal, padding/margin vertikal tidak memengaruhi flow.</p>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Display: Block</h2>
    <div class="block-demo"><div>block 1</div><div>block 2</div><div>block 3</div></div>
    <p style="font-size:0.85rem;color:#666;margin-top:0.3rem">Setiap elemen block mengambil lebar penuh dan turun ke baris baru.</p>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Display: Inline-Block</h2>
    <div class="inline-block-demo"><div>item 1</div><div>item 2</div><div>item 3</div></div>
    <p style="font-size:0.85rem;color:#666;margin-top:0.3rem">Inline-block sejajar horizontal tapi bisa diberi lebar dan tinggi.</p>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Position</h2>
    <div class="container">
      <div class="demo-box static">static</div>
      <div class="demo-box relative">relative<br>top:15 left:20</div>
      <div class="demo-box absolute">absolute<br>bottom:10 right:10</div>
    </div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Z-Index</h2>
    <div class="z-container">
      <div class="z-box z-1">z:1</div>
      <div class="z-box z-2">z:2</div>
      <div class="z-box z-3">z:3</div>
    </div>
  </div>
</body>
</html>`,

  5: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Flexbox</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; background: #f0f4f8; padding: 2rem; }
    h1 { color: #1572B6; text-align: center; margin-bottom: 1.5rem; }
    .card { background: #fff; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .flex { display: flex; gap: 0.8rem; background: #e3f0fa; padding: 1rem; border-radius: 8px; margin: 0.8rem 0; }
    .item { background: #1572B6; color: #fff; padding: 1rem; border-radius: 6px; text-align: center; min-width: 60px; }
    .item-alt { background: #e74c3c; }
    .item-green { background: #2ecc71; }
    .flex-col { flex-direction: column; }
    .flex-wrap { flex-wrap: wrap; }
    .flex-center { justify-content: center; align-items: center; height: 120px; }
    .flex-between { justify-content: space-between; }
    .flex-around { justify-content: space-around; }
    .flex-end { justify-content: flex-end; }
    .grow-1 { flex-grow: 1; }
    .grow-2 { flex-grow: 2; }
    .grow-3 { flex-grow: 3; }
    .align-start { align-self: flex-start; }
    .align-center { align-self: center; }
    .align-end { align-self: flex-end; }
    .nav { display: flex; background: #1572B6; color: #fff; padding: 0.8rem 1.5rem; border-radius: 8px; align-items: center; gap: 1.5rem; }
    .nav .logo { font-weight: 700; font-size: 1.2rem; }
    .nav a { color: #fff; text-decoration: none; opacity: 0.85; }
    .nav a:hover { opacity: 1; }
    .nav .spacer { flex: 1; }
    .card-grid { display: flex; gap: 1rem; flex-wrap: wrap; }
    .card-grid .fc { flex: 1 1 200px; background: #1572B6; color: #fff; padding: 1.5rem; border-radius: 8px; text-align: center; }
    .card-grid .fc-alt { background: #e74c3c; }
    .card-grid .fc-green { background: #2ecc71; }
  </style>
</head>
<body>
  <h1>Flexbox</h1>
  <div class="nav">
    <span class="logo">FlexLogo</span>
    <a href="#">Beranda</a>
    <a href="#">Tentang</a>
    <a href="#">Layanan</a>
    <span class="spacer"></span>
    <a href="#">Login</a>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">flex-direction: row</h2>
    <div class="flex"><div class="item">1</div><div class="item item-alt">2</div><div class="item item-green">3</div></div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">flex-direction: column</h2>
    <div class="flex flex-col" style="width:150px"><div class="item">Atas</div><div class="item item-alt">Tengah</div><div class="item item-green">Bawah</div></div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">justify-content</h2>
    <div class="flex flex-between"><div class="item">Kiri</div><div class="item item-alt">Tengah</div><div class="item item-green">Kanan</div></div>
    <div class="flex flex-around"><div class="item">1</div><div class="item item-alt">2</div><div class="item item-green">3</div></div>
    <div class="flex flex-end"><div class="item">1</div><div class="item item-alt">2</div><div class="item item-green">3</div></div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">flex-grow</h2>
    <div class="flex"><div class="item grow-1">1</div><div class="item item-alt grow-2">2</div><div class="item item-green grow-3">3</div></div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">align-self</h2>
    <div class="flex" style="height:100px;align-items:flex-start">
      <div class="item align-start">start</div>
      <div class="item item-alt align-center">center</div>
      <div class="item item-green align-end">end</div>
    </div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Card Grid dengan flex-wrap</h2>
    <div class="card-grid">
      <div class="fc">Card 1</div>
      <div class="fc fc-alt">Card 2</div>
      <div class="fc fc-green">Card 3</div>
      <div class="fc">Card 4</div>
    </div>
  </div>
</body>
</html>`,

  6: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>CSS Grid</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; background: #f0f4f8; padding: 2rem; }
    h1 { color: #1572B6; text-align: center; margin-bottom: 1.5rem; }
    .card { background: #fff; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .grid { display: grid; gap: 0.8rem; background: #e3f0fa; padding: 1rem; border-radius: 8px; margin: 0.8rem 0; }
    .item { background: #1572B6; color: #fff; padding: 1.2rem; border-radius: 6px; text-align: center; font-weight: 600; }
    .item-alt { background: #e74c3c; }
    .item-green { background: #2ecc71; }
    .item-orange { background: #f39c12; }
    .item-purple { background: #9b59b6; }
    .col-3 { grid-template-columns: 1fr 1fr 1fr; }
    .col-mixed { grid-template-columns: 2fr 1fr 1fr; }
    .col-repeat { grid-template-columns: repeat(3, 1fr); }
    .col-auto { grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); }
    .span-demo { grid-template-columns: repeat(4, 1fr); }
    .span-2 { grid-column: span 2; }
    .span-3 { grid-column: span 3; }
    .span-full { grid-column: 1 / -1; }
    .row-span-2 { grid-row: span 2; }
    .layout { grid-template-columns: 1fr 3fr 1fr; grid-template-rows: auto 1fr auto; min-height: 250px; }
    .layout header { grid-column: 1 / -1; background: #1572B6; padding: 1rem; color: #fff; text-align: center; border-radius: 6px 6px 0 0; }
    .layout nav { background: #9b59b6; padding: 1rem; color: #fff; }
    .layout main { background: #2ecc71; padding: 1rem; color: #fff; }
    .layout aside { background: #f39c12; padding: 1rem; color: #fff; }
    .layout footer { grid-column: 1 / -1; background: #e74c3c; padding: 1rem; color: #fff; text-align: center; border-radius: 0 0 6px 6px; }
  </style>
</head>
<body>
  <h1>CSS Grid</h1>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">3 Kolom Sama (1fr 1fr 1fr)</h2>
    <div class="grid col-3"><div class="item">1</div><div class="item item-alt">2</div><div class="item item-green">3</div></div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Proporsi Berbeda (2fr 1fr 1fr)</h2>
    <div class="grid col-mixed"><div class="item">2fr</div><div class="item item-alt">1fr</div><div class="item item-green">1fr</div></div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">repeat() &amp; auto-fill minmax()</h2>
    <div class="grid col-auto"><div class="item">A</div><div class="item item-alt">B</div><div class="item item-green">C</div><div class="item item-orange">D</div><div class="item item-purple">E</div></div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Grid Span</h2>
    <div class="grid span-demo">
      <div class="item span-full">span full width</div>
      <div class="item span-2">span 2</div>
      <div class="item item-alt">1</div>
      <div class="item item-green">1</div>
      <div class="item item-orange">1</div>
    </div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Layout dengan Grid Areas</h2>
    <div class="grid layout">
      <header>Header</header>
      <nav>Sidebar Kiri</nav>
      <main>Konten Utama</main>
      <aside>Sidebar Kanan</aside>
      <footer>Footer</footer>
    </div>
  </div>
</body>
</html>`,

  7: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Desain Responsif</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; background: #f0f4f8; padding: 1rem; color: #333; }
    h1 { color: #1572B6; text-align: center; font-size: clamp(1.5rem, 4vw, 2.5rem); margin-bottom: 1rem; }
    .card { background: #fff; border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .grid { display: grid; gap: 1rem; grid-template-columns: 1fr; }
    .grid-item { background: #1572B6; color: #fff; padding: 2rem; border-radius: 8px; text-align: center; font-size: 1.2rem; font-weight: 600; }
    .grid-item:nth-child(2) { background: #e74c3c; }
    .grid-item:nth-child(3) { background: #2ecc71; }
    .unit-demo { font-size: 1rem; margin: 0.5rem 0; padding: 0.5rem; background: #e3f0fa; border-radius: 6px; }
    .unit-vw { font-size: clamp(1rem, 3vw, 2rem); }
    .unit-rem { font-size: 1.5rem; }
    .mode-toggle { padding: 0.5rem 1rem; background: #1572B6; color: #fff; border: none; border-radius: 6px; cursor: pointer; }
    @media (prefers-color-scheme: dark) {
      body { background: #1a1a2e; color: #e0e0e0; }
      .card { background: #16213e; }
      .unit-demo { background: #1a1a3e; }
      .grid-item { background: #0f3460; }
    }
    @media (min-width: 600px) { .grid { grid-template-columns: 1fr 1fr; } body { padding: 2rem; } }
    @media (min-width: 900px) { .grid { grid-template-columns: 1fr 1fr 1fr; } body { padding: 3rem; max-width: 1200px; margin: 0 auto; } }
  </style>
</head>
<body>
  <h1>Desain Responsif</h1>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Grid Responsif</h2>
    <p style="margin-bottom:0.8rem;font-size:0.9rem;color:#666">Ubah lebar jendela — grid menyesuaikan jumlah kolom.</p>
    <div class="grid">
      <div class="grid-item">Mobile: 1 kolom</div>
      <div class="grid-item">Tablet: 2 kolom</div>
      <div class="grid-item">Desktop: 3 kolom</div>
    </div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Unit Relatif</h2>
    <div class="unit-demo"><strong>clamp()</strong>: Teks ini ukurannya <span class="unit-vw">3vw (min 1rem, max 2rem)</span></div>
    <div class="unit-demo"><strong>rem</strong>: Teks ini 1.5rem <span style="font-size:1.5rem">&rarr; relatif ke root font-size</span></div>
    <div class="unit-demo" style="width:80%"><strong>%</strong>: Lebar 80% dari parent</div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Dark Mode</h2>
    <p style="margin-bottom:0.5rem;font-size:0.9rem">Halaman otomatis mengikuti preferensi tema sistem Anda melalui <code>prefers-color-scheme</code>.</p>
    <p style="font-size:0.85rem;color:#666">Jika sistem Anda dalam mode gelap, latar belakang akan berubah menjadi gelap.</p>
  </div>
</body>
</html>`,

  8: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Gerak & Animasi</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; background: #f0f4f8; padding: 2rem; }
    h1 { color: #1572B6; text-align: center; margin-bottom: 1.5rem; }
    .card { background: #fff; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .row { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; margin: 1rem 0; }
    .box { width: 90px; height: 90px; background: #1572B6; color: #fff; display: flex; align-items: center; justify-content: center; border-radius: 8px; cursor: pointer; font-size: 0.75rem; font-weight: 600; text-align: center; }
    .trans-bg { transition: background 0.3s ease; }
    .trans-bg:hover { background: #e74c3c; }
    .trans-all { transition: all 0.4s ease-in-out; }
    .trans-all:hover { background: #2ecc71; border-radius: 50%; transform: scale(1.2) rotate(180deg); }
    .trans-delay { transition: transform 0.3s ease, background 0.3s ease 0.15s; }
    .trans-delay:hover { transform: rotate(45deg); background: #f39c12; }
    .trans-bounce { transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55); }
    .trans-bounce:hover { transform: translateX(30px); background: #9b59b6; }
    .t-translate:hover { transform: translate(15px, 10px); }
    .t-rotate:hover { transform: rotate(45deg); }
    .t-scale:hover { transform: scale(1.3); }
    .t-skew:hover { transform: skew(10deg, 5deg); }
    .t-multi:hover { transform: translateX(15px) rotate(15deg) scale(1.1); }
    @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.15); } 100% { transform: scale(1); } }
    @keyframes slide { from { transform: translateX(0); opacity: 0; } to { transform: translateX(80px); opacity: 1; } }
    @keyframes bounce { 0%, 100% { transform: translateY(0); } 40% { transform: translateY(-40px); } 60% { transform: translateY(-20px); } }
    @keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
    @keyframes colorCycle { 0% { background: #1572B6; } 25% { background: #e74c3c; } 50% { background: #2ecc71; } 75% { background: #f39c12; } 100% { background: #1572B6; } }
    .anim-pulse { animation: pulse 1.5s ease-in-out infinite; }
    .anim-bounce { animation: bounce 1s ease infinite; }
    .anim-spin { animation: spin 2s linear infinite; }
    .anim-color { animation: colorCycle 4s ease infinite; }
    .anim-slide { animation: slide 1s ease forwards; }
  </style>
</head>
<body>
  <h1>Gerak &amp; Animasi</h1>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Transition — Arahkan kursor</h2>
    <div class="row">
      <div class="box trans-bg">Background</div>
      <div class="box trans-all">All + Rotate</div>
      <div class="box trans-delay">Delay 0.15s</div>
      <div class="box trans-bounce">Bounce</div>
    </div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Transform — Arahkan kursor</h2>
    <div class="row">
      <div class="box t-translate" style="transition:transform 0.3s">Translate</div>
      <div class="box t-rotate" style="transition:transform 0.3s">Rotate</div>
      <div class="box t-scale" style="transition:transform 0.3s">Scale</div>
      <div class="box t-skew" style="transition:transform 0.3s">Skew</div>
      <div class="box t-multi" style="transition:transform 0.3s">Multi</div>
    </div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Keyframe Animation</h2>
    <div class="row">
      <div class="box anim-pulse">Pulse</div>
      <div class="box anim-bounce" style="background:#e74c3c">Bounce</div>
      <div class="box anim-spin" style="background:#2ecc71">Spin</div>
      <div class="box anim-color">Color</div>
      <div class="box anim-slide" style="background:#9b59b6">Slide</div>
    </div>
  </div>
</body>
</html>`,

  9: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>CSS Modern</title>
  <style>
    @layer base, theme, components;
    @layer base {
      *, *::before, *::after { box-sizing: border-box; margin: 0; }
      body { font-family: system-ui, sans-serif; background: #f0f4f8; padding: 2rem; }
      h1 { text-align: center; margin-bottom: 1.5rem; }
      .card { background: #fff; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    }
    @layer theme {
      :root { --primary: #1572B6; --primary-light: #4a9de0; --primary-dark: #0d4f82; --success: #2ecc71; --warning: #f39c12; --danger: #e74c3c; --radius: 8px; --shadow: 0 2px 8px rgba(0,0,0,0.1); --gap: 1rem; }
      h1 { color: var(--primary); }
    }
    @layer components {
      .btn { padding: 0.6rem 1.5rem; border: none; border-radius: var(--radius); cursor: pointer; font-weight: 600; transition: transform 0.2s, opacity 0.2s; }
      .btn:hover { transform: scale(1.05); }
      .btn-primary { background: var(--primary); color: #fff; }
      .btn-danger { background: var(--danger); color: #fff; }
      .btn-success { background: var(--success); color: #fff; }
      .calc-box { width: calc(100% - var(--gap) * 2); background: var(--primary); color: #fff; padding: 1rem; border-radius: var(--radius); text-align: center; margin: 0.8rem auto; }
      .row { display: flex; gap: var(--gap); flex-wrap: wrap; }
      .sidebar { width: calc(30% - var(--gap) / 2); background: var(--primary-dark); color: #fff; padding: 1rem; border-radius: var(--radius); }
      .main { width: calc(70% - var(--gap) / 2); background: var(--primary-light); color: #fff; padding: 1rem; border-radius: var(--radius); }
      .clamp-text { font-size: clamp(1rem, 3vw, 2rem); background: #e3f0fa; padding: 1rem; border-radius: var(--radius); text-align: center; margin: 0.8rem 0; }
      .has-demo:has(.special) { background: #e3f0fa; border-left: 4px solid var(--primary); }
      .nesting-demo { background: #f5f5f5; padding: 1rem; border-radius: var(--radius); }
      .nesting-demo h3 { color: var(--primary); }
      .nesting-demo p { color: #555; margin-top: 0.5rem; }
      .nesting-demo p strong { color: var(--danger); }
      .scroll-snap { display: flex; gap: 1rem; overflow-x: auto; scroll-snap-type: x mandatory; padding: 1rem 0; }
      .scroll-snap > div { scroll-snap-align: start; min-width: 200px; background: var(--primary); color: #fff; padding: 2rem; border-radius: var(--radius); text-align: center; flex-shrink: 0; }
      .scroll-snap > div:nth-child(2) { background: var(--danger); }
      .scroll-snap > div:nth-child(3) { background: var(--success); }
      .scroll-snap > div:nth-child(4) { background: var(--warning); }
    }
  </style>
</head>
<body>
  <h1>CSS Modern</h1>
  <div class="card">
    <h2 style="color:var(--primary);margin-bottom:0.5rem">Custom Properties</h2>
    <p>Warna, radius, shadow dikontrol oleh <code>--var</code> di <code>:root</code>.</p>
    <div style="display:flex;gap:0.5rem;margin-top:0.8rem">
      <button class="btn btn-primary">Primary</button>
      <button class="btn btn-danger">Danger</button>
      <button class="btn btn-success">Success</button>
    </div>
  </div>
  <div class="card">
    <h2 style="color:var(--primary);margin-bottom:0.5rem">calc()</h2>
    <div class="calc-box">100% - 2rem (calc(100% - var(--gap) * 2))</div>
    <div class="row">
      <div class="sidebar">30%</div>
      <div class="main">70%</div>
    </div>
  </div>
  <div class="card">
    <h2 style="color:var(--primary);margin-bottom:0.5rem">clamp()</h2>
    <div class="clamp-text">Teks ini clamp(1rem, 3vw, 2rem)</div>
  </div>
  <div class="card has-demo">
    <h2 style="color:var(--primary);margin-bottom:0.5rem">:has() Selector</h2>
    <p>Card ini memiliki border biru karena mengandung elemen dengan class <code>.special</code>.</p>
    <p class="special" style="color:var(--primary);font-weight:600;margin-top:0.5rem">&rarr; Elemen .special di dalam card</p>
  </div>
  <div class="card">
    <h2 style="color:var(--primary);margin-bottom:0.5rem">Nesting CSS</h2>
    <div class="nesting-demo">
      <h3>Contoh Nesting</h3>
      <p>CSS modern memungkinkan <strong>nesting</strong> selector seperti preprocessor.</p>
    </div>
  </div>
  <div class="card">
    <h2 style="color:var(--primary);margin-bottom:0.5rem">Scroll Snap</h2>
    <div class="scroll-snap">
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
      <div>Slide 4</div>
    </div>
    <p style="font-size:0.85rem;color:#666;margin-top:0.5rem">Gulir horizontal — setiap slide men-snap ke posisi start.</p>
  </div>
</body>
</html>`,

  10: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Portofolio — Proyek Akhir</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    @layer base, layout, components;
    @layer base {
      :root { --primary: #1572B6; --primary-dark: #0d4f82; --primary-light: #e3f0fa; --text: #333; --text-light: #666; --bg: #f0f4f8; --card: #fff; --radius: 12px; --shadow: 0 4px 20px rgba(0,0,0,0.08); --font: 'Inter', system-ui, sans-serif; }
      *, *::before, *::after { box-sizing: border-box; margin: 0; }
      body { font-family: var(--font); background: var(--bg); color: var(--text); line-height: 1.6; }
      img { max-width: 100%; display: block; }
      a { color: var(--primary); text-decoration: none; }
      a:hover { text-decoration: underline; }
    }
    @layer layout {
      .container { max-width: 1100px; margin: 0 auto; padding: 1rem; }
      .hero { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 4rem 1rem; background: linear-gradient(135deg, var(--primary), var(--primary-dark)); color: #fff; border-radius: 0 0 var(--radius) var(--radius); }
      .hero h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700; margin-bottom: 0.5rem; }
      .hero p { font-size: 1.2rem; opacity: 0.9; max-width: 600px; }
      .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; margin: 2rem 0; }
      .projects-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin: 2rem 0; }
      .contact { display: flex; flex-direction: column; gap: 1rem; align-items: center; padding: 3rem 1rem; background: var(--primary-dark); color: #fff; border-radius: var(--radius); margin: 2rem 0; }
      footer { text-align: center; padding: 2rem 0; color: var(--text-light); font-size: 0.9rem; }
      @media (min-width: 600px) { .projects-grid { grid-template-columns: 1fr 1fr; } }
      @media (min-width: 900px) { .projects-grid { grid-template-columns: 1fr 1fr 1fr; } }
    }
    @layer components {
      .skill-card { background: var(--card); padding: 1.5rem; border-radius: var(--radius); box-shadow: var(--shadow); text-align: center; transition: transform 0.3s ease, box-shadow 0.3s ease; }
      .skill-card:hover { transform: translateY(-5px); box-shadow: 0 8px 30px rgba(0,0,0,0.15); }
      .skill-card .icon { font-size: 2rem; margin-bottom: 0.5rem; }
      .skill-card h3 { font-size: 1rem; color: var(--primary); }
      .project-card { background: var(--card); border-radius: var(--radius); box-shadow: var(--shadow); overflow: hidden; transition: transform 0.3s ease; }
      .project-card:hover { transform: scale(1.02); }
      .project-card .thumb { height: 180px; background: linear-gradient(135deg, var(--primary-light), var(--primary)); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 2rem; font-weight: 700; }
      .project-card .body { padding: 1.5rem; }
      .project-card .body h3 { margin-bottom: 0.5rem; color: var(--primary); }
      .project-card .body p { color: var(--text-light); font-size: 0.9rem; }
      .btn { display: inline-block; padding: 0.8rem 2rem; background: var(--primary); color: #fff; border: none; border-radius: var(--radius); font-weight: 600; cursor: pointer; transition: background 0.3s ease, transform 0.2s ease; }
      .btn:hover { background: var(--primary-dark); transform: translateY(-2px); text-decoration: none; }
      .btn-outline { background: transparent; border: 2px solid #fff; }
      .btn-outline:hover { background: #fff; color: var(--primary); }
      .contact input, .contact textarea { width: 100%; max-width: 400px; padding: 0.8rem; border: none; border-radius: 8px; font-family: var(--font); }
      .contact form { display: flex; flex-direction: column; gap: 0.8rem; align-items: center; width: 100%; max-width: 400px; }
    }
  </style>
</head>
<body>
  <section class="hero">
    <h1>Halo, Saya Gita</h1>
    <p>Seorang desainer dan pengembang web yang menciptakan pengalaman digital yang indah dan responsif.</p>
    <div style="display:flex;gap:1rem;margin-top:1.5rem;flex-wrap:wrap;justify-content:center">
      <a href="#" class="btn">Lihat Proyek</a>
      <a href="#" class="btn btn-outline">Hubungi Saya</a>
    </div>
  </section>
  <div class="container">
    <section>
      <h2 style="color:var(--primary);margin:2rem 0 1rem;font-size:1.8rem">Keahlian</h2>
      <div class="skills-grid">
        <div class="skill-card"><div class="icon">🌐</div><h3>HTML5</h3></div>
        <div class="skill-card"><div class="icon">🎨</div><h3>CSS3</h3></div>
        <div class="skill-card"><div class="icon">⚡</div><h3>JavaScript</h3></div>
        <div class="skill-card"><div class="icon">📱</div><h3>Responsive</h3></div>
        <div class="skill-card"><div class="icon">🔧</div><h3>Flexbox &amp; Grid</h3></div>
        <div class="skill-card"><div class="icon">✨</div><h3>Animasi CSS</h3></div>
      </div>
    </section>
    <section>
      <h2 style="color:var(--primary);margin:2rem 0 1rem;font-size:1.8rem">Proyek</h2>
      <div class="projects-grid">
        <div class="project-card"><div class="thumb">01</div><div class="body"><h3>Landing Page</h3><p>Halaman landing responsif dengan Flexbox dan Grid.</p></div></div>
        <div class="project-card"><div class="thumb">02</div><div class="body"><h3>Dashboard</h3><p>Dashboard interaktif dengan animasi dan transisi.</p></div></div>
        <div class="project-card"><div class="thumb">03</div><div class="body"><h3>E-Commerce</h3><p>Toko online dengan layout grid dan filter produk.</p></div></div>
      </div>
    </section>
    <section class="contact">
      <h2 style="font-size:1.8rem;margin-bottom:0.5rem">Hubungi Saya</h2>
      <p style="opacity:0.85">Punya proyek? Mari diskusikan.</p>
      <form>
        <input type="text" placeholder="Nama Anda">
        <input type="email" placeholder="Email">
        <textarea rows="3" placeholder="Pesan"></textarea>
        <button class="btn" type="submit">Kirim Pesan</button>
      </form>
    </section>
  </div>
  <footer>&copy; 2026 Gita — Dibuat dengan CSS &amp; HTML</footer>
</body>
</html>`,
};

const EXP = {
  1: {
    id: `### Sintaks CSS

CSS menggunakan sintaks \`selector { property: value; }\`. **Selector** menarget elemen, **property** adalah aspek yang diubah, dan **value** adalah nilai yang diberikan. Titik koma (\`;\`) memisahkan setiap deklarasi.

### Selector

- **Element selector** (\`h1\`, \`p\`) — menarget semua elemen dengan tag tertentu
- **Class selector** (\`.card\`) — menarget elemen dengan class \`class="card"\`. Bisa digunakan banyak elemen
- **ID selector** (\`#main-title\`) — menarget satu elemen unik dengan \`id="main-title"\`
- **Universal selector** (\`*\`) — menarget SEMUA elemen. Gunakan hati-hati karena bisa memengaruhi performa
- **Grouping** (\`h1, h2, p\`) — menerapkan style yang sama ke beberapa selector sekaligus

### Cara Menambahkan CSS

1. **Inline** — melalui atribut \`style\` pada elemen HTML. Specificity tertinggi, sulit dipelihara.
2. **Internal** — di dalam tag \`<style>\` di \`<head>\`. Cocok untuk halaman tunggal.
3. **External** — file .css terpisah yang dihubungkan dengan \`<link rel="stylesheet" href="style.css">\`. Paling direkomendasikan untuk produksi.

### Cascade & Specificity

CSS adalah **Cascading** Style Sheets — artinya ada hierarki prioritas:

1. **Specificity**: ID (100) > Class (10) > Element (1)
2. **Order**: Jika specificity sama, deklarasi terakhir yang menang
3. **Inline style**: Mengalahkan selector internal/eksternal
4. **!important**: Mengalahkan segalanya (hindari penggunaan)`,
    en: `### CSS Syntax

CSS uses the syntax \`selector { property: value; }\`. **Selector** targets elements, **property** is the aspect being changed, and **value** is the assigned value. Semicolons (\`;\`) separate declarations.

### Selectors

- **Element selector** (\`h1\`, \`p\`) — targets all elements with a specific tag
- **Class selector** (\`.card\`) — targets elements with \`class="card"\`. Can be reused on multiple elements
- **ID selector** (\`#main-title\`) — targets one unique element with \`id="main-title"\`
- **Universal selector** (\`*\`) — targets ALL elements. Use carefully as it impacts performance
- **Grouping** (\`h1, h2, p\`) — applies the same style to multiple selectors at once

### Adding CSS

1. **Inline** — via the \`style\` attribute on HTML elements. Highest specificity, hard to maintain.
2. **Internal** — inside a \`<style>\` tag in \`<head>\`. Good for single pages.
3. **External** — a separate .css file linked with \`<link rel="stylesheet" href="style.css">\`. Recommended for production.

### Cascade & Specificity

CSS is **Cascading** Style Sheets — a priority hierarchy exists:

1. **Specificity**: ID (100) > Class (10) > Element (1)
2. **Order**: If specificity is equal, the last declaration wins
3. **Inline style**: Overrides internal/external selectors
4. **!important**: Overrides everything (avoid using it)`
  },
  2: {
    id: `### Box Model

Setiap elemen HTML adalah **kotak** yang terdiri dari empat lapisan:

1. **Content** — area tempat teks/gambar ditampilkan. Ukurannya diatur oleh \`width\` dan \`height\`.
2. **Padding** — ruang antara konten dan border. Membersihkan area dalam elemen. Transparan terhadap background.
3. **Border** — garis yang mengelilingi padding. Bisa solid, dashed, dotted, dll.
4. **Margin** — ruang di luar border. Membersihkan area antar elemen. Transparan.

### box-sizing

- **content-box** (default): \`width\` hanya mengukur konten. Total lebar = width + padding + border.
- **border-box**: \`width\` mencakup konten + padding + border. Total lebar = width.

Gunakan \`box-sizing: border-box\` pada semua elemen untuk layout yang lebih mudah diprediksi.

### Overflow

Saat konten lebih besar dari box-nya, \`overflow\` menentukan perilakunya:
- \`visible\` (default) — konten meluap keluar
- \`hidden\` — konten terpotong
- \`scroll\` — scrollbar selalu muncul
- \`auto\` — scrollbar muncul hanya saat diperlukan

### Margin Collapsing

Margin vertikal antar elemen block tidak dijumlahkan — margin terbesar yang menang.`,
    en: `### Box Model

Every HTML element is a **box** consisting of four layers:

1. **Content** — the area where text/images are displayed. Sized by \`width\` and \`height\`.
2. **Padding** — space between content and border. Clears the inner area.
3. **Border** — the line surrounding padding. Can be solid, dashed, dotted, etc.
4. **Margin** — space outside the border. Creates gaps between elements.

### box-sizing

- **content-box** (default): \`width\` only measures content. Total width = width + padding + border.
- **border-box**: \`width\` includes content + padding + border. Total width = width.

Use \`box-sizing: border-box\` on all elements for more predictable layouts.

### Overflow

When content exceeds the box size:
- \`visible\` (default) — content overflows outside
- \`hidden\` — content is clipped
- \`scroll\` — scrollbars always appear
- \`auto\` — scrollbars appear only when needed

### Margin Collapsing

Vertical margins between block elements don't add up — the larger margin wins.`
  },
  3: {
    id: `### Format Warna

CSS mendukung beberapa format warna:

- **HEX** (\`#1572B6\`) — 6 digit hex (RGB). Format paling umum.
- **RGB** (\`rgb(21, 114, 182)\`) — nilai merah, hijau, biru 0-255.
- **HSL** (\`hsl(207, 79%, 40%)\`) — hue (0-360), saturation, lightness. Lebih intuitif.
- **OKLCH** (\`oklch(0.5 0.15 250)\`) — format modern dengan persepsi warna lebih akurat.
- **RGBA/HSLA** — tambah alpha channel untuk transparansi (0-1).

### Tipografi

- **font-family**: Gunakan \`font stack\` — beberapa font sebagai fallback (\`"Inter", system-ui, sans-serif\`)
- **font-weight**: 100-900, atau keyword (normal, bold, light)
- **font-size**: Gunakan unit relatif (\`rem\`) untuk aksesibilitas
- **line-height**: Jarak antar baris. 1.5 untuk body text, 1.2 untuk heading
- **text-align**: left, center, right, justify
- **text-decoration**: underline, line-through, overline, none
- **text-transform**: uppercase, lowercase, capitalize

### Web Fonts

Gunakan \`@font-face\` untuk font kustom, atau Google Fonts via \`<link>\`.

### Background

\`background\`: shorthand untuk color, image, repeat, position, size. Gradien: \`background: linear-gradient(135deg, #1572B6, #4a9de0)\``,
    en: `### Color Formats

CSS supports several color formats:

- **HEX** (\`#1572B6\`) — 6-digit hex (RGB). Most common format.
- **RGB** (\`rgb(21, 114, 182)\`) — red, green, blue values 0-255.
- **HSL** (\`hsl(207, 79%, 40%)\`) — hue (0-360), saturation, lightness. More intuitive.
- **OKLCH** (\`oklch(0.5 0.15 250)\`) — modern format with better color perception.
- **RGBA/HSLA** — adds alpha channel for transparency (0-1).

### Typography

- **font-family**: Use a \`font stack\` — multiple fonts as fallback
- **font-weight**: 100-900, or keywords (normal, bold, light)
- **font-size**: Use relative units (\`rem\`) for accessibility
- **line-height**: Space between lines. 1.5 for body text, 1.2 for headings
- **text-align**: left, center, right, justify
- **text-decoration**: underline, line-through, overline, none
- **text-transform**: uppercase, lowercase, capitalize

### Web Fonts

Use \`@font-face\` for custom fonts, or Google Fonts via \`<link>\`.

### Background

\`background\`: shorthand for color, image, repeat, position, size. Gradients: \`background: linear-gradient(135deg, #1572B6, #4a9de0)\``
  },
  4: {
    id: `### Display

- **block**: Elemen mengambil lebar penuh, turun ke baris baru. Bisa diberi width/height. (\`<div>\`, \`<p>\`, \`<h1>\`)
- **inline**: Elemen sejajar horizontal, width/height tidak berpengaruh. (\`<span>\`, \`<a>\`, \`<strong>\`)
- **inline-block**: Sejajar horizontal TAPI bisa diberi width/height. Kombinasi terbaik keduanya.
- **none**: Elemen disembunyikan, tidak mengambil ruang. Berbeda dengan \`visibility: hidden\` yang tetap mengambil ruang.

### Position

- **static** (default): Mengikuti normal flow. Tidak bisa di-offset.
- **relative**: Offset dari posisi normalnya (\`top\`, \`left\`, dll). Ruang asli tetap dipertahankan.
- **absolute**: Dikeluarkan dari flow. Posisi relatif terhadap ancestor terdekat yang tidak static.
- **fixed**: Dikeluarkan dari flow. Posisi relatif terhadap viewport. Tetap saat scroll.
- **sticky**: Campuran relative dan fixed. Normal sampai scroll threshold tercapai, lalu "menempel".

### Z-Index & Stacking Context

\`z-index\` mengatur tumpukan elemen yang diposisikan. Semakin tinggi nilai, semakin di atas. **Stacking context** baru terbentuk saat elemen memiliki \`position\` + \`z-index\`, \`opacity < 1\`, \`transform\`, \`filter\`, atau \`isolation: isolate\`.`,
    en: `### Display

- **block**: Element takes full width, starts on a new line. Can have width/height. (\`<div>\`, \`<p>\`, \`<h1>\`)
- **inline**: Elements sit horizontally, width/height don't apply. (\`<span>\`, \`<a>\`, \`<strong>\`)
- **inline-block**: Horizontal layout BUT can have width/height. Best of both.
- **none**: Element hidden, takes no space. Different from \`visibility: hidden\` which still occupies space.

### Position

- **static** (default): Follows normal flow. Cannot be offset.
- **relative**: Offset from normal position. Original space is preserved.
- **absolute**: Removed from flow. Positioned relative to nearest non-static ancestor.
- **fixed**: Removed from flow. Positioned relative to viewport. Stays on scroll.
- **sticky**: Hybrid of relative and fixed. Normal until scroll threshold, then "sticks".

### Z-Index & Stacking Context

\`z-index\` controls the stacking order of positioned elements. Higher values appear on top. New **stacking contexts** form when an element has \`position\` + \`z-index\`, \`opacity < 1\`, \`transform\`, \`filter\`, or \`isolation: isolate\`.`
  },
  5: {
    id: `### Konsep Dasar Flexbox

Flexbox adalah model layout satu dimensi (baris ATAU kolom). Dua komponen utama:

1. **Flex Container** — elemen dengan \`display: flex\`. Mengontrol anak-anaknya.
2. **Flex Items** — anak langsung dari flex container.

### Main Axis & Cross Axis

- **Main axis**: Arah utama — ditentukan oleh \`flex-direction\` (\`row\` = horizontal, \`column\` = vertikal)
- **Cross axis**: Sumbu tegak lurus main axis

### Container Properties

- \`flex-direction\`: row | column | row-reverse | column-reverse
- \`justify-content\**: Perataan di MAIN axis (flex-start, flex-end, center, space-between, space-around, space-evenly)
- \`align-items\**: Perataan di CROSS axis (stretch, flex-start, flex-end, center, baseline)
- \`flex-wrap\**: nowrap | wrap | wrap-reverse
- \`gap\**: Jarak antar item (row-gap dan column-gap)

### Item Properties

- \`flex-grow\**: Seberapa banyak item tumbuh relatif terhadap item lain (default 0)
- \`flex-shrink\**: Seberapa banyak item menyusut (default 1)
- \`flex-basis\**: Ukuran awal item sebelum distribusi ruang
- \`flex\**: Shorthand: \`flex: grow shrink basis\` (misal: \`flex: 1 1 200px\`)
- \`align-self\**: Override \`align-items\` untuk item individual
- \`order\**: Mengatur urutan visual (default 0)`,
    en: `### Flexbox Fundamentals

Flexbox is a one-dimensional layout model (row OR column). Two main components:

1. **Flex Container** — element with \`display: flex\`. Controls its children.
2. **Flex Items** — direct children of the flex container.

### Main Axis & Cross Axis

- **Main axis**: Primary direction — set by \`flex-direction\` (\`row\` = horizontal, \`column\` = vertical)
- **Cross axis**: Perpendicular to main axis

### Container Properties

- \`flex-direction\`: row | column | row-reverse | column-reverse
- \`justify-content\`: Alignment on MAIN axis
- \`align-items\`: Alignment on CROSS axis
- \`flex-wrap\`: nowrap | wrap | wrap-reverse
- \`gap\`: Space between items

### Item Properties

- \`flex-grow\`: How much item grows relative to others (default 0)
- \`flex-shrink\`: How much item shrinks (default 1)
- \`flex-basis\**: Initial item size before space distribution
- \`flex\**: Shorthand: \`flex: grow shrink basis\`
- \`align-self\**: Override \`align-items\` for individual items
- \`order\**: Controls visual order (default 0)`
  },
  6: {
    id: `### Konsep Dasar CSS Grid

CSS Grid adalah model layout **dua dimensi** — baris DAN kolom sekaligus. Ideal untuk layout halaman kompleks.

### Grid Container Properties

- \`display: grid\` — mendefinisikan grid container
- \`grid-template-columns\` & \`grid-template-rows\` — ukuran track (kolom/baris)
- \`gap\` (atau \`row-gap\` / \`column-gap\`) — jarak antar track

### Unit fr

\`fr\` = **fraction** — membagi ruang yang tersedia secara proporsional. \`grid-template-columns: 2fr 1fr\` berarti kolom pertama dua kali lebih lebar dari kolom kedua.

### repeat() & minmax()

- \`repeat(3, 1fr)\` — 3 kolom dengan lebar sama
- \`repeat(auto-fill, minmax(200px, 1fr))\` — kolom otomatis yang responsif, minimal 200px
- \`minmax(100px, 300px)\` — track minimal 100px, maksimal 300px

### Grid Item Placement

- \`grid-column: span 2\` — item melebar 2 kolom
- \`grid-column: 1 / -1\` — item dari kolom 1 sampai akhir
- \`grid-row: span 2\` — item meninggi 2 baris

### grid-template-areas

Cara deklaratif untuk menamai area grid:

\u0060\u0060\u0060css
grid-template-areas:
  "header header header"
  "nav    main   aside"
  "footer footer footer";
\u0060\u0060\u0060

Item kemudian ditempatkan dengan \`grid-area: header\`.`,
    en: `### CSS Grid Fundamentals

CSS Grid is a **two-dimensional** layout model — rows AND columns simultaneously. Ideal for complex page layouts.

### Grid Container Properties

- \`display: grid\` — defines a grid container
- \`grid-template-columns\` & \`grid-template-rows\` — track sizes (columns/rows)
- \`gap\` (or \`row-gap\` / \`column-gap\`) — space between tracks

### The fr Unit

\`fr\` = **fraction** — distributes available space proportionally. \`grid-template-columns: 2fr 1fr\` means the first column is twice as wide as the second.

### repeat() & minmax()

- \`repeat(3, 1fr)\` — 3 equal-width columns
- \`repeat(auto-fill, minmax(200px, 1fr))\` — responsive auto-columns, minimum 200px
- \`minmax(100px, 300px)\` — track minimum 100px, maximum 300px

### Grid Item Placement

- \`grid-column: span 2\` — item spans 2 columns
- \`grid-column: 1 / -1\` — item from column 1 to the end
- \`grid-row: span 2\` — item spans 2 rows

### grid-template-areas

A declarative way to name grid areas:

\u0060\u0060\u0060css
grid-template-areas:
  "header header header"
  "nav    main   aside"
  "footer footer footer";
\u0060\u0060\u0060

Items are then placed with \`grid-area: header\`.`
  },
  7: {
    id: `### Mobile-First

**Mobile-first** berarti mendesain untuk layar kecil TERLEBIH DAHULU, lalu menambahkan media queries untuk layar lebih besar. Pendekatan ini:

- Memaksa fokus pada konten esensial
- Performa lebih baik di perangkat terbatas
- Menggunakan \`min-width\` (bukan \`max-width\`) di media queries

### Media Queries

\u0060\u0060\u0060css
/* Mobile-first: base style untuk mobile */
.grid { grid-template-columns: 1fr; }

/* Tablet: ≥600px */
@media (min-width: 600px) {
  .grid { grid-template-columns: 1fr 1fr; }
}

/* Desktop: ≥900px */
@media (min-width: 900px) {
  .grid { grid-template-columns: 1fr 1fr 1fr; }
}
\u0060\u0060\u0060

### Unit Relatif

- **rem** — relatif terhadap root font-size (16px default). Aksesibel karena menghormati preferensi ukuran font pengguna.
- **em** — relatif terhadap font-size elemen parent. Berbahaya untuk nesting karena efek compounding.
- **vw/vh** — 1% dari lebar/tinggi viewport
- **%** — relatif terhadap parent
- **clamp()** — \`font-size: clamp(1rem, 3vw, 2rem)\` = nilai minimum, ideal, maksimum

### Container Queries

Responsivitas berdasarkan ukuran **kontainer**, bukan viewport. \`@container (min-width: 400px)\`.

### prefers-color-scheme

Media query untuk mendeteksi tema sistem: \`@media (prefers-color-scheme: dark) { ... }\``,
    en: `### Mobile-First

**Mobile-first** means designing for small screens FIRST, then adding media queries for larger screens. This approach:

- Forces focus on essential content
- Better performance on limited devices
- Uses \`min-width\` (not \`max-width\`) in media queries

### Media Queries

\u0060\u0060\u0060css
/* Mobile-first: base style for mobile */
.grid { grid-template-columns: 1fr; }

/* Tablet: ≥600px */
@media (min-width: 600px) {
  .grid { grid-template-columns: 1fr 1fr; }
}

/* Desktop: ≥900px */
@media (min-width: 900px) {
  .grid { grid-template-columns: 1fr 1fr 1fr; }
}
\u0060\u0060\u0060

### Relative Units

- **rem** — relative to root font-size (16px default). Accessible because it respects user font-size preferences.
- **em** — relative to parent element's font-size. Dangerous for nesting (compounding effect).
- **vw/vh** — 1% of viewport width/height
- **%** — relative to parent
- **clamp()** — \`font-size: clamp(1rem, 3vw, 2rem)\` = minimum, preferred, maximum

### Container Queries

Responsiveness based on **container** size, not viewport. \`@container (min-width: 400px)\`.

### prefers-color-scheme

Media query to detect system theme: \`@media (prefers-color-scheme: dark) { ... }\``
  },
  8: {
    id: `### CSS Transitions

Transisi membuat perubahan properti menjadi **halus** dari waktu ke waktu.

\u0060\u0060\u0060css
.element {
  transition: property duration timing-function delay;
}
\u0060\u0060\u0060

- **transition-property**: Properti yang ditransisikan (misal: \`background\`, \`transform\`, \`opacity\`)
- **transition-duration**: Durasi dalam detik (\`0.3s\`) atau milidetik (\`300ms\`)
- **transition-timing-function**: Kurva percepatan — \`ease\`, \`linear\`, \`ease-in\`, \`ease-out\`, \`ease-in-out\`, \`cubic-bezier(n, n, n, n)\`
- **transition-delay**: Tunda sebelum transisi dimulai

### Transform

Mengubah tampilan elemen tanpa memengaruhi layout:

- \`translate(x, y)\` — memindahkan elemen
- \`rotate(angle)\` — memutar (derajat, grad, rad, turn)
- \`scale(factor)\` — memperbesar/memperkecil
- \`skew(x, y)\` — memiringkan
- \`transform-origin\` — mengatur titik pivot transformasi

**Kinerja**: Hanya \`transform\` dan \`opacity\` yang bisa dianimasi tanpa memicu layout/reflow. GPU-accelerated.

### Keyframe Animation

\u0060\u0060\u0060css
@keyframes nama {
  0% { property: value; }
  100% { property: value; }
}
\u0060\u0060\u0060

### Animation Properties

- \`animation-name\` — nama @keyframes
- \`animation-duration\` — durasi satu siklus
- \`animation-timing-function\` — kurva percepatan
- \`animation-delay\` — tunda sebelum mulai
- \`animation-iteration-count\` — jumlah siklus (\`infinite\` tak terbatas)
- \`animation-direction\` — \`normal\`, \`reverse\`, \`alternate\`, \`alternate-reverse\`
- \`animation-fill-mode\` — gaya sebelum/setelah animasi (\`none\`, \`forwards\`, \`backwards\`, \`both\`)`,
    en: `### CSS Transitions

Transitions make property changes **smooth** over time.

\u0060\u0060\u0060css
.element {
  transition: property duration timing-function delay;
}
\u0060\u0060\u0060

- **transition-property**: The property to transition
- **transition-duration**: Duration in seconds (\`0.3s\`) or milliseconds (\`300ms\`)
- **transition-timing-function**: Acceleration curve — \`ease\`, \`linear\`, \`ease-in\`, \`ease-out\`, \`ease-in-out\`, \`cubic-bezier(n, n, n, n)\`
- **transition-delay**: Delay before transition starts

### Transform

Changes element appearance without affecting layout:

- \`translate(x, y)\` — moves element
- \`rotate(angle)\` — rotates (degrees, grad, rad, turn)
- \`scale(factor)\` — scales up/down
- \`skew(x, y)\` — skews
- \`transform-origin\` — sets transform pivot point

**Performance**: Only \`transform\` and \`opacity\` can be animated without triggering layout/reflow. GPU-accelerated.

### Keyframe Animation

\u0060\u0060\u0060css
@keyframes name {
  0% { property: value; }
  100% { property: value; }
}
\u0060\u0060\u0060

### Animation Properties

- \`animation-name\` — @keyframes name
- \`animation-duration\` — duration per cycle
- \`animation-timing-function\` — acceleration curve
- \`animation-delay\` — delay before start
- \`animation-iteration-count\` — cycle count (\`infinite\`)
- \`animation-direction\` — \`normal\`, \`reverse\`, \`alternate\`, \`alternate-reverse\`
- \`animation-fill-mode\` — before/after animation styles (\`none\`, \`forwards\`, \`backwards\`, \`both\`)`
  },
  9: {
    id: `### Custom Properties (CSS Variables)

Variabel CSS dideklarasikan dengan \`--name\` dan dibaca dengan \`var(--name)\`.

\u0060\u0060\u0060css
:root {
  --primary: #1572B6;
  --spacing: 1rem;
}
.element {
  color: var(--primary);
  margin: var(--spacing);
}
\u0060\u0060\u0060

Kelebihan: **reusable**, **mengikuti cascade**, bisa diubah via JavaScript, bisa dioverride per komponen.

### calc()

Fungsi untuk perhitungan matematis: \`width: calc(100% - 40px)\`. Mendukung +, -, *, /. Bisa mengkombinasikan unit berbeda.

### CSS Nesting

CSS native (2024+) mendukung nesting seperti preprocessor:

\u0060\u0060\u0060css
.parent {
  color: #333;
  & .child { color: blue; }
  & > .direct { font-weight: bold; }
  &:hover { color: red; }
}
\u0060\u0060\u0060

### @layer

Mengontrol urutan cascade dengan mendefinisikan **layer**:

\u0060\u0060\u0060css
@layer base, theme, components;
@layer base { body { ... } }
@layer components { .btn { ... } }
\u0060\u0060\u0060

Layer yang disebut belakangan memiliki prioritas lebih tinggi.

### Selector Modern

- **:has()** — "parent selector": \`.card:has(img)\` — card yang memiliki img di dalamnya
- **:not()** — negasi: \`input:not([disabled])\`
- **:is()** — grouping: \`:is(h1, h2, h3) { font-weight: bold; }\`
- **:where()** — seperti :is() tapi specificity = 0

### Scroll Snap

Membuat container scroll yang "men-snap" ke posisi tertentu:
- \`scroll-snap-type: x mandatory\` pada container
- \`scroll-snap-align: start\` pada children`,
    en: `### Custom Properties (CSS Variables)

CSS variables are declared with \`--name\` and read with \`var(--name)\`.

\u0060\u0060\u0060css
:root {
  --primary: #1572B6;
  --spacing: 1rem;
}
.element {
  color: var(--primary);
  margin: var(--spacing);
}
\u0060\u0060\u0060

Benefits: **reusable**, **follows cascade**, changeable via JavaScript, overridable per component.

### calc()

Math function: \`width: calc(100% - 40px)\`. Supports +, -, *, /. Can combine different units.

### CSS Nesting

Native CSS (2024+) supports nesting like preprocessors:

\u0060\u0060\u0060css
.parent {
  color: #333;
  & .child { color: blue; }
  & > .direct { font-weight: bold; }
  &:hover { color: red; }
}
\u0060\u0060\u0060

### @layer

Controls cascade order by defining **layers**:

\u0060\u0060\u0060css
@layer base, theme, components;
@layer base { body { ... } }
@layer components { .btn { ... } }
\u0060\u0060\u0060

Layers declared later have higher priority.

### Modern Selectors

- **:has()** — "parent selector": \`.card:has(img)\` — cards that contain an img
- **:not()** — negation: \`input:not([disabled])\`
- **:is()** — grouping: \`:is(h1, h2, h3) { font-weight: bold; }\`
- **:where()** — like :is() but specificity = 0

### Scroll Snap

Makes scroll containers "snap" to positions:
- \`scroll-snap-type: x mandatory\` on container
- \`scroll-snap-align: start\` on children`
  },
  10: {
    id: `### Menggabungkan Semua Konsep

Proyek akhir ini mendemonstrasikan integrasi SEMUA modul CSS yang telah dipelajari:

1. **Selectors & Cascade** (@layer untuk mengatur prioritas)
2. **Box Model** (padding, margin, border-radius pada setiap komponen)
3. **Text & Color** (font Inter dari Google Fonts, gradien hero, warna konsisten)
4. **Flow & Positioning** (hero sebagai flex container, z-index implisit)
5. **Flexbox** (hero, contact section, tombol)
6. **CSS Grid** (skills-grid dengan auto-fit, projects-grid dengan media queries)
7. **Responsive Design** (clamp() untuk heading, 3 breakpoint layout, mobile-first)
8. **Motion & Animation** (hover transitions pada skill card dan project card, scale)
9. **Modern CSS** (Custom Properties untuk tema, @layer untuk cascade control)

### Struktur Halaman

- **Hero Section**: Latar gradien, judul dengan clamp(), tombol CTA
- **Skills Section**: Grid responsif dengan auto-fit, hover effect
- **Projects Section**: Grid 3 kolom (1/2/3 tergantung viewport), card dengan thumbnail
- **Contact Section**: Formulir sederhana dengan input dan textarea

### Tips

- Gunakan \`:root\` untuk variabel tema global
- Manfaatkan \`min-width\` media queries untuk mobile-first
- Animasi hanya pada transform dan opacity untuk performa
- Uji di berbagai ukuran layar`,
    en: `### Combining All Concepts

This final project demonstrates the integration of ALL CSS modules learned:

1. **Selectors & Cascade** (@layer for priority management)
2. **Box Model** (padding, margin, border-radius on every component)
3. **Text & Color** (Inter font from Google Fonts, gradient hero, consistent colors)
4. **Flow & Positioning** (hero as flex container, implicit z-index)
5. **Flexbox** (hero, contact section, buttons)
6. **CSS Grid** (skills-grid with auto-fit, projects-grid with media queries)
7. **Responsive Design** (clamp() for headings, 3 breakpoint layout, mobile-first)
8. **Motion & Animation** (hover transitions on skill cards and project cards, scale)
9. **Modern CSS** (Custom Properties for theming, @layer for cascade control)

### Page Structure

- **Hero Section**: Gradient background, clamp() heading, CTA buttons
- **Skills Section**: Responsive grid with auto-fit, hover effect
- **Projects Section**: 3-column grid (1/2/3 depending on viewport), card with thumbnail
- **Contact Section**: Simple form with input and textarea

### Tips

- Use \`:root\` for global theme variables
- Leverage \`min-width\` media queries for mobile-first
- Animate only transform and opacity for performance
- Test across different screen sizes`
  },
};

const EXP_E = {
  1: {
    id: `1. **Ganti warna** — ubah \`color: #1572B6\` menjadi \`#e74c3c\` (merah) dan lihat perbedaannya
2. **Tambah selector baru** — buat class \`.shadow\` dengan \`box-shadow\` dan terapkan ke kartu
3. **Coba inline style** — tambahkan \`style="background: #ffeb3b"\` pada salah satu kartu
4. **External CSS** — pindahkan style ke file \`style.css\` dan gunakan \`<link>\``,
    en: `1. **Change colors** — replace \`color: #1572B6\` with \`#e74c3c\` (red) and see the difference
2. **Add new selector** — create a \`.shadow\` class with \`box-shadow\` and apply it to a card
3. **Try inline style** — add \`style="background: #ffeb3b"\` to one of the cards
4. **External CSS** — move the styles to a \`style.css\` file and use \`<link>\``
  },
  2: {
    id: `1. **Ubah padding** — ganti padding box model dari 1.5rem menjadi 3rem, lihat bagaimana ukuran total berubah
2. **Ganti border** — ubah border solid menjadi \`border: 5px dashed #e74c3c\` pada box content-box
3. **Coba negative margin** — tambahkan \`margin-top: -20px\` pada salah satu box
4. **box-sizing toggle** — ganti class content-box ke border-box dan perhatikan perbedaan lebar`,
    en: `1. **Change padding** — change box model padding from 1.5rem to 3rem, see how total size changes
2. **Change border** — switch solid border to \`border: 5px dashed #e74c3c\` on the content-box
3. **Try negative margin** — add \`margin-top: -20px\` to one of the boxes
4. **box-sizing toggle** — switch content-box to border-box and note the width difference`
  },
  3: {
    id: `1. **Ganti font** — ubah Google Fonts link ke \`Playfair+Display:wght@400;700\` dan terapkan
2. **Eksperimen gradien** — buat \`background: radial-gradient(circle, #1572B6, #0d4f82)\`
3. **Ubah line-height** — ganti line-height paragraf dari 2 menjadi 3
4. **Coba text-shadow** — tambahkan \`text-shadow: 2px 2px 4px rgba(0,0,0,0.3)\` pada heading`,
    en: `1. **Change font** — update Google Fonts link to \`Playfair+Display:wght@400;700\` and apply it
2. **Experiment with gradients** — create \`background: radial-gradient(circle, #1572B6, #0d4f82)\`
3. **Change line-height** — change paragraph line-height from 2 to 3
4. **Try text-shadow** — add \`text-shadow: 2px 2px 4px rgba(0,0,0,0.3)\` to the heading`
  },
  4: {
    id: `1. **Ubah posisi absolute** — ganti \`bottom: 10px; right: 10px\` menjadi \`top: 10px; left: 10px\`
2. **Tambah z-index** — buat elemen baru di container z-index dengan z-index lebih tinggi
3. **Coba sticky** — ubah salah satu kartu menjadi \`position: sticky; top: 20px\`
4. **Toggle display** — ganti display inline-block ke block dan inline, lihat perbedaan layout`,
    en: `1. **Change absolute position** — switch \`bottom: 10px; right: 10px\` to \`top: 10px; left: 10px\`
2. **Add z-index** — create a new element in the z-index container with a higher z-index
3. **Try sticky** — change one card to \`position: sticky; top: 20px\`
4. **Toggle display** — switch inline-block to block and inline, see the layout difference`
  },
  5: {
    id: `1. **Ubah flex-direction** — ganti \`row\` menjadi \`column\` pada container flex dan lihat perubahannya
2. **Tambah item** — tambahkan item ke-5 dan ke-6, lihat bagaimana flex-wrap bekerja
3. **Coba nilai grow berbeda** — ubah grow-1 menjadi 5, grow-2 menjadi 1
4. **Mainkan gap** — ubah gap dari 0.8rem menjadi 2rem`,
    en: `1. **Change flex-direction** — switch \`row\` to \`column\` on the flex container and see the change
2. **Add items** — add 5th and 6th items, see how flex-wrap works
3. **Try different grow values** — change grow-1 to 5, grow-2 to 1
4. **Play with gap** — change gap from 0.8rem to 2rem`
  },
  6: {
    id: `1. **Ubah jumlah kolom** — ganti \`1fr 1fr 1fr\` menjadi \`1fr 2fr 1fr\` pada grid 3 kolom
2. **Tambah item grid** — tambahkan item ke-4 untuk melihat perilaku auto-placement
3. **Coba auto-fill vs auto-fit** — ganti \`auto-fill\` menjadi \`auto-fit\` dan lihat perbedaannya
4. **Modifikasi grid areas** — tambahkan baris baru di layout dan tempatkan item`,
    en: `1. **Change column count** — change \`1fr 1fr 1fr\` to \`1fr 2fr 1fr\` in the 3-column grid
2. **Add grid items** — add a 4th item to see auto-placement behavior
3. **Try auto-fill vs auto-fit** — switch \`auto-fill\` to \`auto-fit\` and see the difference
4. **Modify grid areas** — add a new row in the layout and place items`
  },
  7: {
    id: `1. **Ubah breakpoint** — ganti \`600px\` menjadi \`500px\` dan \`900px\` menjadi \`800px\`
2. **Tambah breakpoint baru** — tambahkan breakpoint untuk layar besar (1200px+) dengan 4 kolom
3. **Eksperimen clamp()** — ubah nilai clamp menjadi \`clamp(0.8rem, 5vw, 3rem)\`
4. **Coba dark mode** — ubah preferensi warna sistem Anda dan refresh halaman`,
    en: `1. **Change breakpoints** — change \`600px\` to \`500px\` and \`900px\` to \`800px\`
2. **Add new breakpoint** — add a breakpoint for large screens (1200px+) with 4 columns
3. **Experiment with clamp()** — change clamp values to \`clamp(0.8rem, 5vw, 3rem)\`
4. **Try dark mode** — change your system color preference and refresh the page`
  },
  8: {
    id: `1. **Ubah durasi transisi** — ganti \`0.3s\` menjadi \`1s\` dan lihat perbedaan kecepatan
2. **Coba timing function berbeda** — ganti \`ease\` menjadi \`cubic-bezier(0, 1, 1, 0)\`
3. **Modifikasi keyframes** — tambahkan keyframe baru dengan properti berbeda, seperti \`opacity\` dan \`border-radius\`
4. **Gabungkan multiple animation** — terapkan dua animasi ke satu elemen`,
    en: `1. **Change transition duration** — change \`0.3s\` to \`1s\` and see the speed difference
2. **Try different timing functions** — change \`ease\` to \`cubic-bezier(0, 1, 1, 0)\`
3. **Modify keyframes** — add new keyframes with different properties like \`opacity\` and \`border-radius\`
4. **Combine multiple animations** — apply two animations to one element`
  },
  9: {
    id: `1. **Tambah variabel baru** — tambahkan \`--secondary: #e74c3c\` di :root dan gunakan
2. **Coba calc() kompleks** — buat \`width: calc((100% - var(--gap) * 3) / 4)\` untuk 4 kolom
3. **Uji :has()** — tambahkan elemen baru di dalam card dan lihat efek :has() berubah
4. **Eksperimen nesting** — tulis ulang selector .nesting-demo menggunakan sintaks nesting CSS`,
    en: `1. **Add new variables** — add \`--secondary: #e74c3c\` in :root and use it
2. **Try complex calc()** — create \`width: calc((100% - var(--gap) * 3) / 4)\` for 4 columns
3. **Test :has()** — add a new element inside the card and see the :has() effect change
4. **Experiment with nesting** — rewrite the .nesting-demo selectors using CSS nesting syntax`
  },
  10: {
    id: `1. **Tambah section baru** — tambahkan section "Testimoni" dengan layout grid
2. **Ubah tema warna** — ganti nilai \`--primary\` di :root menjadi \`#6c5ce7\` (ungu) dan lihat perubahan global
3. **Animasi hero** — tambahkan animasi fade-in pada teks hero saat halaman dimuat
4. **Responsif lanjutan** — tambahkan breakpoint untuk mode landscape di mobile`,
    en: `1. **Add new section** — add a "Testimonials" section with grid layout
2. **Change color theme** — replace \`--primary\` in :root with \`#6c5ce7\` (purple) and see the global change
3. **Hero animation** — add a fade-in animation on hero text when the page loads
4. **Advanced responsive** — add a breakpoint for landscape mode on mobile`
  },
};

const CHALL = {
  1: {
    id: `Buat halaman profil singkat tentang diri Anda yang menerapkan SETIAP jenis selector CSS yang telah dipelajari:
- Gunakan **selector elemen** untuk body dan heading
- Gunakan **selector class** untuk komponen yang berulang (kartu, tombol)
- Gunakan **selector ID** untuk elemen unik (foto profil, judul utama)
- Gunakan **selector universal** untuk box-sizing
- Gunakan **grouping** untuk style yang sama pada beberapa elemen

Sertakan ketiga metode CSS: inline (minimal satu), internal (di <style>), dan external (file .css terpisah).`,
    en: `Create a short profile page about yourself that uses EVERY CSS selector type you've learned:
- Use **element selectors** for body and headings
- Use **class selectors** for repeating components (cards, buttons)
- Use **ID selectors** for unique elements (profile photo, main title)
- Use **universal selector** for box-sizing
- Use **grouping** for shared styles across multiple elements

Include all three CSS methods: inline (at least one), internal (in <style>), and external (separate .css file).`
  },
  2: {
    id: `Buat halaman "Kartu Harga" (pricing cards) dengan tiga kartu berjajar. Setiap kartu harus memiliki:
- Padding yang berbeda untuk header, body, dan footer
- Border yang membedakan kartu unggulan (featured) dari yang biasa
- Margin antar kartu
- box-sizing: border-box pada semua elemen
- Overflow handling untuk deskripsi yang panjang`,
    en: `Build a "Pricing Cards" page with three cards in a row. Each card must have:
- Different padding for header, body, and footer
- Distinctive border for the featured card vs regular cards
- Margin between cards
- box-sizing: border-box on all elements
- Overflow handling for long descriptions`
  },
  3: {
    id: `Buat halaman "Kutipan Favorit" yang menampilkan 5-6 kutipan dengan desain tipografi yang menarik:
- Gunakan font serif untuk kutipan itu sendiri
- Gunakan font sans-serif untuk penulis kutipan
- Variasikan ukuran font untuk kutipan favorit vs biasa
- Gunakan warna berbeda untuk setiap kategori kutipan
- Tambahkan background gradien pada kartu kutipan
- Gunakan text-transform untuk nama penulis`,
    en: `Create a "Favorite Quotes" page displaying 5-6 quotes with attractive typography:
- Use serif font for the quote itself
- Use sans-serif font for the author
- Vary font sizes for favorite vs regular quotes
- Use different colors for each quote category
- Add gradient backgrounds to quote cards
- Use text-transform on author names`
  },
  4: {
    id: `Buat halaman "Layout Majalah" sederhana dengan:
- Header fixed/sticky di bagian atas
- Sidebar kiri dengan position sticky
- Konten utama dengan banyak teks
- Badge "baru" yang diposisikan absolute di pojok artikel
- Overlay dengan z-index untuk modal/popup sederhana
- Tombol "kembali ke atas" yang fixed di pojok kanan bawah`,
    en: `Build a simple "Magazine Layout" page with:
- Fixed/sticky header at the top
- Left sidebar with sticky position
- Main content with lots of text
- "New" badge positioned absolutely on article corners
- z-index overlay for a simple modal/popup
- "Back to top" button fixed at the bottom-right`
  },
  5: {
    id: `Buat halaman "Dashboard Admin" menggunakan Flexbox:
- Navigasi horizontal dengan logo, link, dan avatar pengguna (gunakan justify-content: space-between)
- Grid kartu statistik (4 kartu) yang menggunakan flex-wrap
- Daftar aktivitas terbaru dengan flex-direction: column
- Sidebar navigasi dengan align-items yang berbeda
- Pastikan semua responsif saat layar menyempit`,
    en: `Build an "Admin Dashboard" page using Flexbox:
- Horizontal navigation with logo, links, and user avatar (use justify-content: space-between)
- Statistics card grid (4 cards) using flex-wrap
- Recent activity list with flex-direction: column
- Navigation sidebar with different align-items
- Ensure everything is responsive on narrow screens`
  },
  6: {
    id: `Buat halaman "Gallery Foto" menggunakan CSS Grid:
- Grid dengan auto-fill dan minmax untuk responsivitas otomatis
- Satu foto unggulan yang span 2 kolom dan 2 baris
- Foto portrait yang span 2 baris
- Foto landscape yang span 2 kolom
- Gunakan gap yang konsisten
- Tambahkan hover effect dengan overlay pada setiap foto`,
    en: `Build a "Photo Gallery" page using CSS Grid:
- Grid with auto-fill and minmax for automatic responsiveness
- One featured photo spanning 2 columns and 2 rows
- Portrait photos spanning 2 rows
- Landscape photos spanning 2 columns
- Use consistent gap
- Add hover effects with overlay on each photo`
  },
  7: {
    id: `Buat halaman "Company Profile" yang sepenuhnya responsif:
- Mobile: satu kolom, navigasi hamburger, teks lebih kecil
- Tablet: dua kolom, navigasi horizontal sederhana
- Desktop: tiga kolom, navigasi lengkap dengan dropdown
- Gunakan unit rem untuk semua ukuran font
- Gunakan clamp() untuk heading utama
- Sertakan dark mode dengan prefers-color-scheme`,
    en: `Build a fully responsive "Company Profile" page:
- Mobile: single column, hamburger navigation, smaller text
- Tablet: two columns, simple horizontal navigation
- Desktop: three columns, full navigation with dropdown
- Use rem units for all font sizes
- Use clamp() for the main heading
- Include dark mode with prefers-color-scheme`
  },
  8: {
    id: `Buat halaman "Loading Screen" yang menarik dengan animasi:
- Spinner berputar dengan keyframes
- Progress bar yang terisi secara animasi
- Logo yang pulse (denyut)
- Teks yang muncul bergantian dengan fade-in
- Transition halus saat loading selesai dan konten muncul
- Gunakan timing function yang berbeda untuk setiap animasi`,
    en: `Create an attractive "Loading Screen" page with animations:
- Spinning spinner with keyframes
- Progress bar that fills with animation
- Pulsing logo
- Alternating text with fade-in
- Smooth transition when loading completes and content appears
- Use different timing functions for each animation`
  },
  9: {
    id: `Buat halaman "Theme Switcher" yang menerapkan CSS modern:
- Gunakan Custom Properties untuk skema warna terang dan gelap
- Tambahkan tombol toggle yang mengganti class pada body untuk switch tema
- Gunakan @layer untuk memisahkan base, theme, dan komponen
- Gunakan :has() untuk mendeteksi status toggle
- Gunakan calc() untuk spacing yang konsisten
- Gunakan scroll-snap untuk section slider`,
    en: `Build a "Theme Switcher" page using modern CSS:
- Use Custom Properties for light and dark color schemes
- Add a toggle button that switches a class on body for theme change
- Use @layer to separate base, theme, and components
- Use :has() to detect toggle state
- Use calc() for consistent spacing
- Use scroll-snap for a section slider`
  },
  10: {
    id: `Kembangkan portofolio dari kode contoh menjadi portofolio pribadi Anda:
1. **Branding**: Ganti skema warna, font, dan foto profil
2. **Hero Section**: Tambahkan animasi teks dan CTA yang lebih menarik
3. **Skills**: Tambahkan level keahlian (progress bar) untuk setiap skill
4. **Projects**: Tambahkan 4-6 proyek nyata atau fiktif dengan screenshot
5. **Testimonials**: Section baru dengan slider menggunakan scroll-snap
6. **Contact**: Validasi form dengan pseudo-class :valid/:invalid
7. **Footer**: Tambahkan link sosial media dengan icon
8. **Animasi**: Tambahkan reveal animation saat scroll (menggunakan @keyframes dengan animation-play-state)

Hasil akhir harus responsif di mobile, tablet, dan desktop.`,
    en: `Develop the example portfolio into your personal portfolio:
1. **Branding**: Change the color scheme, fonts, and profile photo
2. **Hero Section**: Add text animation and more engaging CTAs
3. **Skills**: Add skill levels (progress bars) for each skill
4. **Projects**: Add 4-6 real or fictional projects with screenshots
5. **Testimonials**: New section with scroll-snap slider
6. **Contact**: Form validation with :valid/:invalid pseudo-classes
7. **Footer**: Add social media links with icons
8. **Animation**: Add scroll reveal animations (using @keyframes with animation-play-state)

The final result must be responsive on mobile, tablet, and desktop.`
  },
};

const SUM = {
  1: {
    id: `CSS adalah fondasi tampilan web. Anda telah mempelajari sintaks dasar, berbagai jenis selector, tiga cara menambahkan CSS, dan konsep cascade. Module selanjutnya akan membahas **Box Model** — inti dari layout CSS.`,
    en: `CSS is the foundation of web presentation. You've learned basic syntax, various selector types, three ways to add CSS, and the cascade concept. The next module covers the **Box Model** — the core of CSS layout.`
  },
  2: {
    id: `Box Model adalah konsep paling penting dalam CSS layout. Setiap elemen adalah kotak dengan content, padding, border, dan margin. Pilih box-sizing: border-box untuk layout yang mudah diprediksi. Module selanjutnya: **Teks & Warna** — cara mempercantik tipografi dan menggunakan warna secara efektif.`,
    en: `The Box Model is the most important concept in CSS layout. Every element is a box with content, padding, border, and margin. Choose box-sizing: border-box for predictable layouts. Next module: **Text & Color** — how to beautify typography and use colors effectively.`
  },
  3: {
    id: `Warna dan tipografi adalah elemen desain yang paling terlihat. Anda telah menguasai format warna, properti font, dekorasi teks, web fonts, dan background. Module selanjutnya: **Alur & Posisi** — cara mengontrol flow elemen dan positioning lanjutan.`,
    en: `Color and typography are the most visible design elements. You've mastered color formats, font properties, text decoration, web fonts, and backgrounds. Next module: **Flow & Positioning** — controlling element flow and advanced positioning.`
  },
  4: {
    id: `Display dan position memberi Anda kontrol presisi atas layout. Inline, block, inline-block, static ke sticky, dan z-index — setiap properti memiliki peran unik. Module selanjutnya: **Flexbox** — model layout satu dimensi yang revolusioner.`,
    en: `Display and position give you precise layout control. Inline, block, inline-block, static through sticky, and z-index — each property has a unique role. Next module: **Flexbox** — the revolutionary one-dimensional layout model.`
  },
  5: {
    id: `Flexbox menyederhanakan layout satu dimensi. Dengan justify-content, align-items, flex-grow, dan gap, Anda bisa membuat layout fleksibel tanpa hack. Module selanjutnya: **CSS Grid** — model layout dua dimensi untuk kontrol baris dan kolom sekaligus.`,
    en: `Flexbox simplifies one-dimensional layout. With justify-content, align-items, flex-grow, and gap, you can create flexible layouts without hacks. Next module: **CSS Grid** — a two-dimensional layout model for simultaneous row and column control.`
  },
  6: {
    id: `CSS Grid memberi Anda kekuatan layout dua dimensi. Dengan grid-template, fr unit, span, dan grid areas, Anda bisa membuat layout kompleks dengan mudah. Module selanjutnya: **Desain Responsif** — cara membuat halaman yang indah di semua ukuran layar.`,
    en: `CSS Grid gives you two-dimensional layout power. With grid-template, the fr unit, spanning, and grid areas, you can easily create complex layouts. Next module: **Responsive Design** — making beautiful pages at every screen size.`
  },
  7: {
    id: `Desain responsif memastikan halaman Anda terlihat baik di semua perangkat. Mobile-first, media queries, unit relatif, container queries, dan dark mode adalah toolkit modern Anda. Module selanjutnya: **Gerak & Animasi** — menghidupkan halaman dengan transisi dan animasi.`,
    en: `Responsive design ensures your pages look good on all devices. Mobile-first, media queries, relative units, container queries, and dark mode are your modern toolkit. Next module: **Motion & Animation** — bringing pages to life with transitions and animations.`
  },
  8: {
    id: `Transisi, transform, dan animasi membuat halaman web terasa hidup. Ingat: hanya animasikan transform dan opacity untuk performa GPU-accelerated. Module selanjutnya: **CSS Modern** — custom properties, calc(), nesting, @layer, dan selector modern.`,
    en: `Transitions, transforms, and animations make web pages feel alive. Remember: only animate transform and opacity for GPU-accelerated performance. Next module: **Modern CSS** — custom properties, calc(), nesting, @layer, and modern selectors.`
  },
  9: {
    id: `CSS modern membawa tools canggih seperti custom properties, calc(), nesting native, @layer, :has(), dan scroll-snap. Fitur-fitur ini membuat CSS lebih powerful dan mudah dipelihara. Module selanjutnya: **Proyek Akhir** — menggabungkan SEMUA konsep dalam portofolio responsif.`,
    en: `Modern CSS brings powerful tools like custom properties, calc(), native nesting, @layer, :has(), and scroll-snap. These features make CSS more powerful and maintainable. Next module: **Final Project** — combining ALL concepts in a responsive portfolio.`
  },
  10: {
    id: `Selamat! Anda telah menyelesaikan seluruh kurikulum CSS — dari sintaks dasar hingga portofolio responsif penuh. Anda sekarang memiliki fondasi kuat untuk mendesain web yang indah, responsif, dan modern. Teruslah bereksperimen dan bangun proyek-proyek baru!`,
    en: `Congratulations! You've completed the entire CSS curriculum — from basic syntax to a full responsive portfolio. You now have a strong foundation for designing beautiful, responsive, and modern websites. Keep experimenting and building new projects!`
  },
};

function generateFile(mod, lang) {
  const isId = lang === 'id';
  const title = isId ? mod.lid : mod.len;
  const obj = OBJ[mod.id];
  const objectives = isId ? obj.id : obj.en;
  const programName = isId ? mod.cid : mod.cen;
  const explanation = EXP[mod.id][lang];
  const experiments = EXP_E[mod.id][lang];
  const challenge = CHALL[mod.id][lang];
  const summary = SUM[mod.id][lang];

  const objHeading = isId ? 'Tujuan Pembelajaran' : 'Learning Objectives';
  const expHeading = isId ? 'Penjelasan' : 'Explanation';
  const expEHeading = isId ? 'Eksperimen' : 'Experiments';
  const challHeading = isId ? 'Tantangan' : 'Challenge';
  const sumHeading = isId ? 'Ringkasan' : 'Summary';

  const objectivesBullets = objectives.map(o => `- ${o}`).join('\n');

  return `# ${title}

> CSS | Module ${mod.id}

## ${objHeading}

${objectivesBullets}

---

## Program: ${programName}

\`\`\`html
${CODE[mod.id]}
\`\`\`

---

## ${expHeading}

${explanation}

---

## ${expEHeading}

${experiments}

---

## ${challHeading}

${challenge}

---

## ${sumHeading}

${summary}
`;
}

fs.mkdirSync(path.join(BASE, 'id'), { recursive: true });
fs.mkdirSync(path.join(BASE, 'en'), { recursive: true });

let count = 0;
for (const mod of MODULES) {
  const idContent = generateFile(mod, 'id');
  const enContent = generateFile(mod, 'en');
  fs.writeFileSync(path.join(BASE, 'id', `week${mod.id}-${mod.f}.md`), idContent, 'utf8');
  fs.writeFileSync(path.join(BASE, 'en', `week${mod.id}-${mod.f}.md`), enContent, 'utf8');
  count += 2;
}

console.log(`✓ Generated ${count} CSS curriculum files (${MODULES.length} modules × 2 languages)`);
console.log(`  Output: ${BASE}`);
