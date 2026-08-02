import fs from 'fs';
import path from 'path';

const BASE = new URL('../public/data/course/react', import.meta.url).pathname;
const BASE_DIR = process.platform === 'win32' ? BASE.slice(1) : BASE;

// ===== PHASES (research-based: Scrimba, The Odin Project, Scaler, GreatFrontend) =====
const PHASES = [
  { phase: 1, id: 'foundations', nameId: 'Foundasi', nameEn: 'Foundations' },
  { phase: 2, id: 'state', nameId: 'State & Interaksi', nameEn: 'State & Interaction' },
  { phase: 3, id: 'effects-data', nameId: 'Efek & Data', nameEn: 'Effects & Data' },
  { phase: 4, id: 'advanced', nameId: 'State Global & Advanced', nameEn: 'Global State & Advanced' },
];

const BASE_PROJECT_FILES = {
  'package.json': JSON.stringify({
    name: 'react-lesson',
    version: '1.0.0',
    private: true,
    type: 'module',
    scripts: { dev: 'vite' },
    dependencies: { react: '^19.0.0', 'react-dom': '^19.0.0', 'react-router-dom': '^7.1.0' },
    devDependencies: { '@vitejs/plugin-react': '^4.3.0', vite: '^6.0.0' },
  }, null, 2),
  'vite.config.js': `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({ plugins: [react()] });
`,
  'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Lesson</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`,
  'src/main.jsx': `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
createRoot(document.getElementById('root')).render(<App />);
`,
  'src/index.css': `body { font-family: system-ui, sans-serif; max-width: 800px; margin: 2rem auto; padding: 0 1rem; line-height: 1.6; }
button { font: inherit; padding: 0.4rem 0.9rem; border-radius: 8px; border: 1px solid #999; background: #f1f1f1; cursor: pointer; }
button:hover { background: #e2e2e2; }
input, select { font: inherit; padding: 0.4rem 0.6rem; border-radius: 8px; border: 1px solid #999; }
`,
};

// ===== PHASE 1: FOUNDATIONS (lessons 1-4) =====
const LESSONS_P1 = [
  {
    phase: 1, num: 1, topicId: 'pengenalan-react',
    titleId: 'Pengenalan React & JSX', titleEn: 'React & JSX Introduction',
    codeFile: 'src/App.jsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.jsx': `function Profile() {
  const name = 'Ayu';
  const role = 'React Developer';
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 12, padding: '1.5rem', maxWidth: 320 }}>
      <h1>Hello, {name}!</h1>
      <p>Role: {role}</p>
      <p>2 + 3 = {2 + 3}</p>
      <p>{name.length} characters in name</p>
    </div>
  );
}

export default function App() {
  return <Profile />;
}
`,
      };
    },
    objId: ['Memahami peran React sebagai library UI', 'Mengenal sintaks JSX dan ekspresi di dalamnya', 'Membuat komponen fungsi pertama', 'Memahami konsep single-page application (SPA)'],
    objEn: ['Understand React as a UI library', 'Learn JSX syntax and embedded expressions', 'Create a first function component', 'Understand single-page application (SPA) concepts'],
    expId: `## Apa itu React?
React adalah library JavaScript untuk membangun user interface dari komponen. Berbeda dengan framework, React fokus pada view layer dan dapat dikombinasikan dengan library lain.
\n## JSX
JSX adalah ekstensi sintaks yang memungkinkan markup ditulis di dalam JavaScript. Ekspresi JavaScript dimasukkan dengan \`{ }\` — misalnya \`{name}\` atau \`{2 + 3}\`. Setiap ekspresi dievaluasi saat render.
\n## Komponen Fungsi
Komponen adalah fungsi yang mengembalikan JSX. Satu komponen bisa digunakan berulang. Nama komponen harus diawali huruf kapital agar React mengenalinya sebagai komponen.
\n## SPA
Aplikasi React adalah single-page application: satu halaman HTML di-load sekali, lalu React meng-update UI tanpa reload penuh. Inilah fondasi untuk React Router nanti.`,
    expEn: `## What is React?
React is a JavaScript library for building user interfaces from components. Unlike a framework, React focuses on the view layer and can be combined with other libraries.
\n## JSX
JSX is a syntax extension that lets you write markup inside JavaScript. JavaScript expressions are embedded with \`{ }\` — e.g. \`{name}\` or \`{2 + 3}\`. Every expression is evaluated at render time.
\n## Function Components
A component is a function that returns JSX. Components are reusable. Component names must start with a capital letter so React treats them as components.
\n## SPA
React apps are single-page applications: one HTML page loads once, then React updates the UI without full reloads. This is the foundation for React Router later.`,
    chId: 'Buat kartu profil sendiri: ubah nilai name dan role, tambahkan ekspresi baru seperti tahun pengalaman ({2026 - 2020}) dan daftar skill dengan array.join().',
    chEn: 'Build your own profile card: change name and role values, add new expressions like years of experience ({2026 - 2020}) and a skill list with array.join().',
    sumId: 'React = library UI berbasis komponen. JSX menggabungkan markup + logika. Ekspresi dalam {} dievaluasi saat render. SPA memuat sekali lalu meng-update dinamis.',
    sumEn: 'React = component-based UI library. JSX combines markup + logic. Expressions in {} are evaluated at render. SPAs load once then update dynamically.',
  },
  {
    phase: 1, num: 2, topicId: 'komponen-props',
    titleId: 'Komponen & Props', titleEn: 'Components & Props',
    codeFile: 'src/App.jsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.jsx': `function Card({ title, level, children }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 12, padding: '1rem', margin: '0.5rem 0' }}>
      <h3>{title} <span style={{ color: '#666', fontWeight: 'normal' }}>({level})</span></h3>
      <p>{children}</p>
    </div>
  );
}

function Badge({ label }) {
  return <span style={{ background: '#e7f5ee', color: '#2E5B44', padding: '0.15rem 0.6rem', borderRadius: 999, fontWeight: 'bold' }}>{label}</span>;
}

export default function App() {
  return (
    <div>
      <h1>Props & Composition</h1>
      <Card title="Frontend" level="Beginner">
        React, Vue, Svelte. Fokus pada <Badge label="UI" /> dan interaksi.
      </Card>
      <Card title="Backend" level="Intermediate">
        Node.js, Go, Rust. Fokus pada <Badge label="API" /> dan data.
      </Card>
      <Card title="Database" level="Advanced">
        PostgreSQL, MongoDB. Fokus pada <Badge label="Storage" /> dan query.
      </Card>
    </div>
  );
}
`,
      };
    },
    objId: ['Memahami props sebagai input read-only komponen', 'Menggunakan children untuk komposisi', 'Membuat komponen reusable dengan props', 'Membedakan props vs state'],
    objEn: ['Understand props as read-only component inputs', 'Use children for composition', 'Create reusable components with props', 'Distinguish props vs state'],
    expId: `## Props
Props adalah parameter fungsi komponen — data yang dikirim parent ke child. Props bersifat read-only: child tidak boleh mengubahnya. \`function Card({ title, level })\` mendestrukturisasi props langsung.
\n## Children
Segala yang berada di dalam tag komponen (\`<Card>...</Card>\`) diterima sebagai \`children\`. Ini memungkinkan komposisi seperti HTML, tempat komponen membungkus konten lain.
\n## Reusability
Dengan props, satu komponen bisa dirender berkali-kali dengan data berbeda. \`<Badge label="UI" />\` dipakai di banyak tempat tanpa duplikasi kode.
\n## Props vs State
Props = data dari luar (read-only, diatur parent). State = data internal yang berubah (diatur komponen sendiri, akan dipelajari di phase berikutnya). Aturan: data mengalir ke bawah via props.`,
    expEn: `## Props
Props are function component parameters — data passed from parent to child. Props are read-only: a child must never mutate them. \`function Card({ title, level })\` destructures props directly.
\n## Children
Anything between a component's tags (\`<Card>...</Card>\`) is received as \`children\`. This enables HTML-like composition where components wrap other content.
\n## Reusability
With props, one component renders many times with different data. \`<Badge label="UI" />\` is used in many places without code duplication.
\n## Props vs State
Props = external data (read-only, owned by parent). State = internal changing data (owned by the component itself, covered in the next phase). Rule: data flows down via props.`,
    chId: 'Buat komponen ProductCard reusable: terima props name, price, dan category. Render 4 kartu produk dengan data berbeda. Tambahkan komponen PriceTag yang dipakai di dalam ProductCard.',
    chEn: 'Create a reusable ProductCard component: accept name, price, and category props. Render 4 product cards with different data. Add a PriceTag component used inside ProductCard.',
    sumId: 'Props = input read-only komponen. children memungkinkan komposisi. Komponen reusable via props. Data mengalir ke bawah. Lanjut: rendering list & kondisi.',
    sumEn: 'Props = read-only component inputs. children enables composition. Components are reusable via props. Data flows down. Next: lists & conditional rendering.',
  },
  {
    phase: 1, num: 3, topicId: 'rendering-list',
    titleId: 'Rendering List & Kondisi', titleEn: 'Lists & Conditional Rendering',
    codeFile: 'src/App.jsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.jsx': `const products = [
  { id: 1, name: 'Mechanical Keyboard', price: 750000, inStock: true },
  { id: 2, name: '27-inch Monitor', price: 3200000, inStock: false },
  { id: 3, name: 'USB-C Hub', price: 250000, inStock: true },
  { id: 4, name: 'Webcam', price: 450000, inStock: true },
];

export default function App() {
  return (
    <div>
      <h1>Product Catalog</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map((p) => (
          <li key={p.id} style={{ border: '1px solid #eee', borderRadius: 10, padding: '0.8rem', margin: '0.4rem 0' }}>
            <strong>{p.name}</strong> — Rp {p.price.toLocaleString('id-ID')}{' '}
            {p.inStock ? <span style={{ color: '#2E5B44', fontWeight: 'bold' }}>(In stock)</span>
                      : <span style={{ color: '#b00020', fontWeight: 'bold' }}>(Sold out)</span>}
          </li>
        ))}
      </ul>
      <p>Total: {products.length} products · {products.filter((p) => p.inStock).length} in stock</p>
      {products.length === 0 && <p>Catalog is empty.</p>}
    </div>
  );
}
`,
      };
    },
    objId: ['Merender list dengan array.map()', 'Menggunakan key yang unik dan stabil', 'Rendering kondisional dengan ternary dan &&', 'Menggabungkan data + UI dari array objek'],
    objEn: ['Render lists with array.map()', 'Use unique and stable keys', 'Conditional rendering with ternary and &&', 'Combine data + UI from an array of objects'],
    expId: `## map() untuk List
Untuk merender array, gunakan \`.map()\` yang mengembalikan array JSX. React me-render setiap elemen array secara berurutan. Ini pola paling umum di aplikasi React.
\n## Key
Setiap item list butuh \`key\` unik dan stabil (biasanya id). Key membantu React melacak item saat list berubah — menambah/menghapus tanpa merender ulang seluruh list. Jangan gunakan index sebagai key jika list bisa berubah urutan.
\n## Kondisional
Gunakan \`ternary\` (\`cond ? A : B\`) untuk dua cabang, \`&&\` untuk render "kondisi benar saja" (misal pesan kosong), dan \`||\` untuk nilai fallback.
\n## Data-Driven UI
List + kondisi adalah jantung UI data-driven: data array + fungsi render = tampilan yang selalu sinkron dengan data.`,
    expEn: `## map() for Lists
To render an array, use \`.map()\` which returns an array of JSX. React renders each element in order. This is the most common pattern in React apps.
\n## Keys
Every list item needs a unique, stable \`key\` (usually an id). Keys let React track items when the list changes — adding/removing without re-rendering the whole list. Avoid index as key when list order can change.
\n## Conditionals
Use \`ternary\` (\`cond ? A : B\`) for two branches, \`&&\` to render "only if true" (e.g. empty message), and \`||\` for fallback values.
\n## Data-Driven UI
Lists + conditions are the heart of data-driven UI: data array + render function = a view always in sync with data.`,
    chId: 'Ubah data products menjadi 6 item dengan field baru category. Render heading per kategori dan hanya tampilkan produk dengan price di atas 300.000. Tambahkan pesan khusus saat tidak ada produk.',
    chEn: 'Change products to 6 items with a new category field. Render a heading per category and only show products above 300,000. Add a special message when no products match.',
    sumId: 'map() merender list, key membuat list efisien, ternary/&& untuk kondisi. UI selalu sinkron dengan data. Lanjut: project halaman produk statis.',
    sumEn: 'map() renders lists, keys keep lists efficient, ternary/&& handle conditions. UI stays in sync with data. Next: static product page project.',
  },
  {
    phase: 1, num: 4, topicId: 'proyek-halaman-statis',
    titleId: 'Proyek: Halaman Produk Statis', titleEn: 'Project: Static Product Page',
    codeFile: 'src/App.jsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.jsx': `const products = [
  { id: 1, name: 'Mechanical Keyboard', price: 750000, category: 'Accessories' },
  { id: 2, name: '27-inch Monitor', price: 3200000, category: 'Displays' },
  { id: 3, name: 'USB-C Hub', price: 250000, category: 'Accessories' },
  { id: 4, name: 'Webcam 1080p', price: 450000, category: 'Accessories' },
  { id: 5, name: 'Ergonomic Chair', price: 1500000, category: 'Furniture' },
  { id: 6, name: 'Desk Lamp', price: 300000, category: 'Furniture' },
];

function Header() {
  return (
    <header style={{ borderBottom: '2px solid #2E5B44', paddingBottom: '0.8rem', marginBottom: '1rem' }}>
      <h1>Tryngo Store</h1>
      <p>Komponen reusable, data terpusat.</p>
    </header>
  );
}

function ProductCard({ name, price, category }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 12, padding: '1rem' }}>
      <h3>{name}</h3>
      <p style={{ margin: '0.2rem 0' }}>Rp {price.toLocaleString('id-ID')}</p>
      <span style={{ background: '#e7f5ee', color: '#2E5B44', borderRadius: 999, padding: '0.1rem 0.6rem', fontSize: '0.8rem' }}>{category}</span>
    </div>
  );
}

function ProductGrid() {
  return (
    <section>
      <h2>Products</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.8rem' }}>
        {products.map((p) => <ProductCard key={p.id} name={p.name} price={p.price} category={p.category} />)}
      </div>
    </section>
  );
}

function Footer() {
  return <footer style={{ marginTop: '2rem', borderTop: '1px solid #ddd', paddingTop: '0.8rem', color: '#666' }}>Tryngo Store 2026 — built with React components.</footer>;
}

export default function App() {
  return (
    <div>
      <Header />
      <ProductGrid />
      <Footer />
    </div>
  );
}
`,
      };
    },
    objId: ['Membangun halaman lengkap dari komponen kecil', 'Memisahkan data dari tampilan', 'Menerapkan komposisi header/grid/footer', 'Merender grid produk dari array data'],
    objEn: ['Build a complete page from small components', 'Separate data from presentation', 'Apply header/grid/footer composition', 'Render a product grid from a data array'],
    expId: `## Struktur Komponen
Halaman dipecah menjadi komponen fokus-tunggal: Header, ProductCard, ProductGrid, Footer. Setiap komponen kecil mudah dipahami, diuji, dan dipakai ulang.
\n## Data Terpusat
Data products didefinisikan di satu tempat (atas file). Tampilan hanya membaca — tidak menduplikasi. Saat data berubah, seluruh UI otomatis sinkron karena React me-render ulang.
\n## Grid dengan CSS
Gunakan CSS grid (\`repeat(auto-fill, minmax(220px, 1fr))\`) agar responsif tanpa media query — kartu otomatis menyesuaikan kolom berdasarkan lebar layar.
\n## Review
Ini pola "static first": sebelum belajar state, pastikan struktur komponen dan alur data sudah benar. Bootcamp profesional (Scrimba, Odin) selalu memulai dari halaman statis seperti ini.`,
    expEn: `## Component Structure
The page is split into single-purpose components: Header, ProductCard, ProductGrid, Footer. Small components are easy to understand, test, and reuse.
\n## Centralized Data
The products data lives in one place (top of file). The view only reads — no duplication. When data changes, the whole UI stays in sync because React re-renders.
\n## Grid with CSS
Use CSS grid (\`repeat(auto-fill, minmax(220px, 1fr))\`) for responsiveness without media queries — cards automatically adjust columns to the viewport.
\n## Review
This is the "static first" pattern: before learning state, make sure the component structure and data flow are correct. Professional bootcamps (Scrimba, Odin) always start with static pages like this.`,
    chId: 'Tambah komponen SearchBar (input statis), FeaturedSection yang menampilkan 2 produk termahal, dan tombol "Add to Cart" di ProductCard. Struktur tetap komponen kecil.',
    chEn: 'Add a SearchBar component (static input), a FeaturedSection showing the 2 most expensive products, and an "Add to Cart" button in ProductCard. Keep small components.',
    sumId: 'Halaman = komposisi komponen kecil. Data terpusat, UI sinkron otomatis. Selesai fondasi statis — lanjut: state & interaksi.',
    sumEn: 'A page = composition of small components. Centralized data, auto-synced UI. Static foundations done — next: state & interaction.',
  },
];

// ===== PHASE 2: STATE & INTERACTION (lessons 5-8) =====
const LESSONS_P2 = [
  {
    phase: 2, num: 5, topicId: 'state-event',
    titleId: 'useState & Event', titleEn: 'useState & Events',
    codeFile: 'src/App.jsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.jsx': `import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <h1>useState & Events</h1>

      <h2>Counter</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount((c) => c - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>

      <h2>Toggle</h2>
      <button onClick={() => setIsOn((prev) => !prev)}>
        {isOn ? 'Switch OFF' : 'Switch ON'}
      </button>
      <p>Status: {isOn ? 'ON' : 'OFF'}</p>

      <p style={{ color: '#666', fontSize: '0.85rem' }}>
        Catatan: state update bersifat async. Dua klik +1 berturut-turut dalam satu
        handler tidak menumpuk kecuali memakai functional update (c) => c + 1.
      </p>
    </div>
  );
}
`,
      };
    },
    objId: ['Memahami kenapa variabel biasa gagal untuk UI berubah', 'Menggunakan useState dan setter function', 'Menangani event onClick dengan handler', 'Menerapkan functional updates (prev => prev + 1)'],
    objEn: ['Understand why plain variables fail for changing UI', 'Use useState and the setter function', 'Handle onClick events with handlers', 'Apply functional updates (prev => prev + 1)'],
    expId: `## Kenapa State?
Variabel biasa tidak memicu render ulang. Hanya ketika state berubah (via setter), React me-render ulang komponen dengan nilai baru. Inilah perbedaan utama variabel vs state.
\n## useState
\`const [count, setCount] = useState(0)\` — hook mengembalikan array: nilai saat ini + setter. Setter selalu dipakai untuk mengubah nilai; jangan pernah mutasi langsung.
\n## Event Handler
React memakai sintaks camelCase: \`onClick\`, \`onChange\`, \`onSubmit\`. Handler menerima event object. Jangan memanggil handler langsung di JSX — kirim fungsi: \`onClick={handleClick}\` bukan \`onClick={handleClick()}\`.
\n## Functional Updates
Update state bersifat async dan di-batch. Jika update bergantung pada nilai sebelumnya, gunakan \`setCount((c) => c + 1)\` agar selalu benar walau dipanggil cepat berulang.`,
    expEn: `## Why State?
Plain variables do not trigger re-renders. Only when state changes (via the setter) does React re-render the component with the new value. This is the core difference between variables and state.
\n## useState
\`const [count, setCount] = useState(0)\` — the hook returns an array: current value + setter. Always use the setter to change values; never mutate directly.
\n## Event Handlers
React uses camelCase syntax: \`onClick\`, \`onChange\`, \`onSubmit\`. Handlers receive an event object. Don't call handlers in JSX — pass the function: \`onClick={handleClick}\`, not \`onClick={handleClick()}\`.
\n## Functional Updates
State updates are asynchronous and batched. When an update depends on the previous value, use \`setCount((c) => c + 1)\` so it is always correct even when called rapidly.`,
    chId: 'Buat komponen Quiz: state index soal, skor, dan jawaban terpilih. Array 5 soal pilihan ganda. Klik jawaban menambah skor, tombol Next pindah soal, tombol Reset mengulang.',
    chEn: 'Build a Quiz component: question index, score, and selected answer state. An array of 5 multiple-choice questions. Clicking an answer adds score, Next button advances, Reset restarts.',
    sumId: 'State = data yang me-render ulang UI. Setter mengganti nilai, functional updates aman untuk nilai berurutan. Lanjut: form terkontrol.',
    sumEn: 'State = data that re-renders the UI. Setters replace values, functional updates are safe for sequential values. Next: controlled forms.',
  },
  {
    phase: 2, num: 6, topicId: 'form-terkontrol',
    titleId: 'Form Terkontrol', titleEn: 'Controlled Forms',
    codeFile: 'src/App.jsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.jsx': `import { useState } from 'react';

export default function App() {
  const [form, setForm] = useState({ name: '', email: '', level: 'beginner', agree: false });
  const [submitted, setSubmitted] = useState(null);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.agree) { alert('Please agree to the terms.'); return; }
    setSubmitted(form);
  };

  const buttonStyle = {
    background: '#2E5B44', color: '#fff', border: 'none',
    padding: '0.5rem 1.2rem', borderRadius: 10, marginTop: '0.8rem', cursor: 'pointer',
  };

  return (
    <div>
      <h1>Controlled Form</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ margin: '0.5rem 0' }}>
          <label>Name: </label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div style={{ margin: '0.5rem 0' }}>
          <label>Email: </label>
          <input name="email" type="email" value={form.email} onChange={handleChange} />
        </div>
        <div style={{ margin: '0.5rem 0' }}>
          <label>Level: </label>
          <select name="level" value={form.level} onChange={handleChange}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div style={{ margin: '0.5rem 0' }}>
          <label>
            <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
            {' '}I agree to the terms
          </label>
        </div>
        <button type="submit" style={buttonStyle}>Register</button>
      </form>

      <h2>Live State Preview</h2>
      <pre style={{ background: '#f6f6f6', padding: '1rem', borderRadius: 10 }}>
        {JSON.stringify(form, null, 2)}
      </pre>

      {submitted && <p style={{ color: '#2E5B44', fontWeight: 'bold' }}>Registered: {submitted.name} ({submitted.email})</p>}
    </div>
  );
}
`,
      };
    },
    objId: ['Memahami pola controlled input (value + onChange)', 'Mengelola banyak field dalam satu state object', 'Menangani checkbox, select, dan validasi sederhana', 'Menggunakan preventDefault saat submit'],
    objEn: ['Understand the controlled input pattern (value + onChange)', 'Manage many fields in one state object', 'Handle checkboxes, selects, and simple validation', 'Use preventDefault on submit'],
    expId: `## Controlled Input
Input dikontrol: nilai input selalu = state (\`value={form.name}\`), dan setiap ketikan melewati \`onChange\` untuk update state. Siklus: ketik -> change -> setState -> re-render -> input menampilkan nilai baru.
\n## Satu Object untuk Banyak Field
Gabungkan field dalam satu state object. Satu handler \`handleChange\` melayani semua field dengan atribut \`name\` sebagai kunci: \`setForm(prev => ({ ...prev, [name]: value }))\`.
\n## Checkbox & Select
Checkbox memakai \`checked={state}\` + \`e.target.checked\`, bukan \`value\`. Select memakai \`value\` + \`onChange\` sama seperti input teks.
\n## Submit
Selalu panggil \`e.preventDefault()\` agar halaman tidak reload. Validasi sederhana bisa langsung di handler submit sebelum menyimpan. Perhatikan: mengontrol semua input = banyak re-render — untuk form sederhana ini wajar dan justru memungkinkan validasi real-time.`,
    expEn: `## Controlled Input
An input is controlled: the input value always equals state (\`value={form.name}\`), and every keystroke flows through \`onChange\` to update state. Cycle: type -> change -> setState -> re-render -> input shows the new value.
\n## One Object for Many Fields
Combine fields into a single state object. One \`handleChange\` serves all fields using the \`name\` attribute as the key: \`setForm(prev => ({ ...prev, [name]: value }))\`.
\n## Checkbox & Select
Checkboxes use \`checked={state}\` + \`e.target.checked\`, not \`value\`. Selects use \`value\` + \`onChange\` just like text inputs.
\n## Submit
Always call \`e.preventDefault()\` so the page doesn't reload. Simple validation can run directly in the submit handler before saving. Note: controlling all inputs means more re-renders — for simple forms this is fine and actually enables real-time validation.`,
    chId: 'Tambah validasi real-time: field password dengan indikator kekuatan (>= 6 karakter = lemah/kuat), field age yang hanya menerima angka, dan tombol submit dinonaktifkan (disabled) saat form belum lengkap.',
    chEn: 'Add real-time validation: a password field with a strength indicator (>= 6 chars = weak/strong), an age field accepting digits only, and a disabled submit button until the form is complete.',
    sumId: 'Controlled form: value + onChange mengikat input ke state. Satu object state + satu handler untuk semua field. preventDefault saat submit. Lanjut: lifting state up.',
    sumEn: 'Controlled forms: value + onChange bind inputs to state. One state object + one handler for all fields. preventDefault on submit. Next: lifting state up.',
  },
  {
    phase: 2, num: 7, topicId: 'lifting-state',
    titleId: 'Lifting State Up', titleEn: 'Lifting State Up',
    codeFile: 'src/App.jsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.jsx': `import { useState } from 'react';

const foods = ['Sate Ayam', 'Rendang', 'Gado-Gado', 'Nasi Goreng', 'Bakso', 'Soto'];

function SearchBar({ query, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search food..."
      value={query}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: '100%', boxSizing: 'border-box' }}
    />
  );
}

function FoodList({ items }) {
  if (items.length === 0) return <p>No results found.</p>;
  return (
    <ul>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

export default function App() {
  const [query, setQuery] = useState('');
  const [text, setText] = useState('');
  const results = foods.filter((f) => f.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <h1>Lifting State Up</h1>

      <h2>Search Bar (state di parent)</h2>
      <SearchBar query={query} onChange={setQuery} />
      <FoodList items={results} />

      <h2>Synced Inputs (satu state, dua input)</h2>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="First input" />
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Second input" />
      <p>Kedua input selalu sinkron: "{text}"</p>
    </div>
  );
}
`,
      };
    },
    objId: ['Memahami pola lifting state up 3 langkah', 'Menerapkan data flows down, actions flow up', 'Membuat komponen controlled oleh parent', 'Menggunakan single source of truth'],
    objEn: ['Understand the 3-step lifting state up pattern', 'Apply data flows down, actions flow up', 'Create components controlled by their parent', 'Use a single source of truth'],
    expId: `## Kapan Lifting Diperlukan
Ketika dua komponen perlu berbagi data yang sama — contoh: SearchBar mengubah list FoodList. State tidak boleh hidup di salah satu saja; ia harus diangkat ke common parent.
\n## 3 Langkah (react.dev)
1. Hapus state dari child. 2. Terima data via props dari parent. 3. Tambahkan state ke common parent dan oper data + event handler ke bawah sebagai props.
\n## Data Down, Actions Up
Aturan emas: data mengalir ke bawah via props, aksi mengalir ke atas via callback. \`onChange={setQuery}\` — parent mengirim setter sebagai prop, child memanggilnya saat input berubah.
\n## Controlled Components
Komponen yang menerima nilai + handler dari parent disebut controlled. Parent sepenuhnya menentukan perilakunya. Ini pola yang sama dengan controlled forms — hanya dinaikkan levelnya ke antar-komponen.`,
    expEn: `## When Lifting Is Needed
When two components must share the same data — e.g. SearchBar changes what FoodList shows. The state cannot live in either one; it must move up to the closest common parent.
\n## 3 Steps (react.dev)
1. Remove state from the child. 2. Accept data via props from the parent. 3. Add state to the common parent and pass data + event handlers down as props.
\n## Data Down, Actions Up
The golden rule: data flows down via props, actions flow up via callbacks. \`onChange={setQuery}\` — the parent passes the setter as a prop, the child calls it on input change.
\n## Controlled Components
A component that receives its value + handler from a parent is called controlled. The parent fully determines its behavior. This is the same pattern as controlled forms — just lifted to inter-component level.`,
    chId: 'Refactor App: buat komponen FilterableProductList berisi SearchBar + daftar produk (nama, harga, stok). Tambah filter select (Semua/Tersedia) — state query dan filter tinggal di parent-nya.',
    chEn: 'Refactor App: create a FilterableProductList component with a SearchBar + product list (name, price, stock). Add a filter select (All/In Stock) — query and filter state live in its parent.',
    sumId: 'Lifting state: state diangkat ke common parent, data turun via props, aksi naik via callback. Single source of truth. Lanjut: project Todo App.',
    sumEn: 'Lifting state: state moves to the common parent, data flows down via props, actions flow up via callbacks. Single source of truth. Next: Todo App project.',
  },
  {
    phase: 2, num: 8, topicId: 'proyek-todo',
    titleId: 'Proyek: Todo App', titleEn: 'Project: Todo App',
    codeFile: 'src/App.jsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.jsx': `import { useState } from 'react';

const initialTodos = [
  { id: 1, title: 'Belajar useState', done: true },
  { id: 2, title: 'Lifting state up', done: true },
  { id: 3, title: 'Bikin Todo App', done: false },
];

export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');

  const addTodo = () => {
    const title = text.trim();
    if (!title) return;
    setTodos((prev) => [...prev, { id: Date.now(), title, done: false }]);
    setText('');
  };

  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const visible = todos.filter((t) =>
    filter === 'all' ? true : filter === 'done' ? t.done : !t.done
  );
  const remaining = todos.filter((t) => !t.done).length;

  return (
    <div>
      <h1>Todo App</h1>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          style={{ flex: 1 }}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div style={{ marginBottom: '0.8rem' }}>
        {['all', 'active', 'done'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{ marginRight: '0.4rem', background: filter === f ? '#2E5B44' : '#f1f1f1', color: filter === f ? '#fff' : '#222', border: 'none' }}
          >
            {f}
          </button>
        ))}
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {visible.map((t) => (
          <li key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
            <input type="checkbox" checked={t.done} onChange={() => toggleTodo(t.id)} />
            <span style={{ flex: 1, textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#999' : '#222' }}>
              {t.title}
            </span>
            <button onClick={() => deleteTodo(t.id)} style={{ border: 'none', background: '#fde8e8', color: '#b00020' }}>Delete</button>
          </li>
        ))}
      </ul>

      <p style={{ color: '#666' }}>{remaining} remaining · {todos.length} total</p>
    </div>
  );
}
`,
      };
    },
    objId: ['Menerapkan semua pola state: controlled form, lifting, immutability', 'Meng-update array state tanpa mutasi (map, filter, spread)', 'Menambahkan filter dan derived state', 'Menangani input + keyboard event'],
    objEn: ['Apply all state patterns: controlled forms, lifting, immutability', 'Update array state without mutation (map, filter, spread)', 'Add filters and derived state', 'Handle inputs + keyboard events'],
    expId: `## Immutability
Semua update array memakai cara immutable: \`[...prev, item]\` untuk tambah, \`.map\` untuk ubah item, \`.filter\` untuk hapus. React hanya me-render ulang jika reference state berubah — mutasi langsung tidak terdeteksi.
\n## Derived State
\`visible\` dan \`remaining\` dihitung setiap render dari \`todos\` — tidak disimpan sebagai state terpisah. Derived state menghindari data ganda yang bisa tidak sinkron.
\n## Satu State Per Concern
Filter, input, dan list masing-masing punya state sendiri yang kecil dan jelas. Ini pola "state colocation": simpan state sedekat mungkin dengan tempat pemakaiannya.
\n## Project Milestone
Todo App adalah project wajib di hampir semua kurikulum React (Scrimba, Odin, EduRev, Marcy Lab). Ia membuktikan penguasaan state, event, forms, dan rendering — fondasi semua aplikasi.`,
    expEn: `## Immutability
All array updates use immutable patterns: \`[...prev, item]\` to add, \`.map\` to update items, \`.filter\` to remove. React only re-renders when the state reference changes — direct mutation is never detected.
\n## Derived State
\`visible\` and \`remaining\` are computed every render from \`todos\` — not stored as separate state. Derived state avoids duplicated data that can drift out of sync.
\n## One State Per Concern
Filter, input, and list each have their own small, clear state. This is the "state colocation" pattern: keep state as close as possible to where it is used.
\n## Project Milestone
The Todo App is a mandatory project in nearly every React curriculum (Scrimba, Odin, EduRev, Marcy Lab). It proves mastery of state, events, forms, and rendering — the foundation of every app.`,
    chId: 'Tambah fitur: edit todo (klik dua kali untuk mengubah teks), counter progress bar (done/total), dan tombol "Clear completed". Gunakan hanya state + derived state, tanpa library.',
    chEn: 'Add features: edit a todo (double-click to change text), a progress bar counter (done/total), and a "Clear completed" button. Use only state + derived state, no libraries.',
    sumId: 'Todo App = milestone state: controlled input, immutability, derived state, filter. Anda siap untuk efek samping dan data API. Lanjut: useEffect.',
    sumEn: 'Todo App = state milestone: controlled inputs, immutability, derived state, filters. You are ready for side effects and API data. Next: useEffect.',
  },
];

// ===== PHASE 3: EFFECTS & DATA (lessons 9-12) =====
const LESSONS_P3 = [
  {
    phase: 3, num: 9, topicId: 'use-effect',
    titleId: 'useEffect & Side Effects', titleEn: 'useEffect & Side Effects',
    codeFile: 'src/App.jsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.jsx': `import { useState, useEffect } from 'react';

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  const [name, setName] = useState('');

  // Pattern 3: runs when 'seconds' changes
  useEffect(() => {
    document.title = 'Seconds: ' + seconds;
  }, [seconds]);

  // Pattern 2: runs once after first render — with cleanup
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id); // cleanup runs before next effect or unmount
  }, [running]);

  return (
    <div>
      <h1>useEffect</h1>

      <h2>Timer dengan Cleanup</h2>
      <p>Elapsed: {seconds}s (lihat judul tab!)</p>
      <button onClick={() => setRunning((r) => !r)}>
        {running ? 'Pause' : 'Resume'}
      </button>

      <h2>Effect Mengikuti State</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Type to sync title..." />
      <p>Judul tab di-set saat seconds berubah.</p>

      <p style={{ color: '#666', fontSize: '0.85rem' }}>
        3 pola dependency: (fn) tiap render · (fn, []) sekali · (fn, [dep]) saat dep berubah.
        Cleanup mencegah kebocoran interval. StrictMode memanggil effect dua kali di dev
        untuk menampakkan bug.
      </p>
    </div>
  );
}
`,
      };
    },
    objId: ['Memahami apa itu side effect', 'Menguasai 3 pola dependency array', 'Menulis cleanup function yang benar', 'Memahami StrictMode double-invoke'],
    objEn: ['Understand what a side effect is', 'Master the 3 dependency array patterns', 'Write correct cleanup functions', 'Understand StrictMode double-invoke'],
    expId: `## Side Effects
Side effect = sesuatu yang menyentuh dunia luar komponen: timer, fetch, subscription, document.title, localStorage. \`useEffect\` adalah tempat yang tepat — bukan di body render (yang harus murni).
\n## 3 Pola Dependency
\`useEffect(fn)\` — jalan setelah setiap render. \`useEffect(fn, [])\` — sekali setelah render pertama. \`useEffect(fn, [dep])\` — saat dep berubah. Salah pilih pola = bug (effect berjalan terlalu sering atau tidak pernah).
\n## Cleanup
Return function dieksekusi sebelum effect berikutnya atau saat unmount. Interval/setTimeout harus dibersihkan — jika tidak, terjadi memory leak dan perilaku aneh (contoh: counter berjalan ganda).
\n## StrictMode
Di development, React StrictMode menjalankan effect dua kali (mount -> cleanup -> mount) untuk menampakkan efek yang tidak bersih. Ini normal — bukan bug kode Anda. Production hanya sekali.`,
    expEn: `## Side Effects
A side effect is anything touching the world outside the component: timers, fetches, subscriptions, document.title, localStorage. \`useEffect\` is the right place — not the render body (which must stay pure).
\n## 3 Dependency Patterns
\`useEffect(fn)\` — runs after every render. \`useEffect(fn, [])\` — once after the first render. \`useEffect(fn, [dep])\` — when dep changes. Choosing the wrong pattern = bugs (effects running too often or never).
\n## Cleanup
The returned function runs before the next effect or on unmount. Intervals/timeouts must be cleaned up — otherwise you leak memory and see weird behavior (e.g. a counter running twice).
\n## StrictMode
In development, React StrictMode runs effects twice (mount -> cleanup -> mount) to reveal effects that aren't clean. That's normal — not a bug in your code. Production runs it once.`,
    chId: 'Buat stopwatch lengkap: lap times (array), tombol Start/Stop/Lap/Reset, dan format mm:ss. Tambahkan effect untuk menyimpan lap terakhir ke localStorage dan membacanya saat mount.',
    chEn: 'Build a full stopwatch: lap times (array), Start/Stop/Lap/Reset buttons, and mm:ss formatting. Add an effect that saves the last lap to localStorage and reads it on mount.',
    sumId: 'useEffect untuk side effect. 3 pola dependency array. Cleanup mencegah kebocoran. StrictMode double-invoke di dev. Lanjut: data fetching.',
    sumEn: 'useEffect handles side effects. 3 dependency array patterns. Cleanup prevents leaks. StrictMode double-invokes in dev. Next: data fetching.',
  },
  {
    phase: 3, num: 10, topicId: 'data-fetching',
    titleId: 'Data Fetching', titleEn: 'Data Fetching',
    codeFile: 'src/App.jsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.jsx': `import { useState, useEffect } from 'react';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | error | ready

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then((res) => {
        if (!res.ok) throw new Error('Request failed: ' + res.status);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) { setPosts(data); setStatus('ready'); }
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => { cancelled = true; };
  }, []);

  if (status === 'loading') return <p style={{ color: '#666' }}>Loading posts...</p>;
  if (status === 'error') return <p style={{ color: '#b00020' }}>Failed to load data. Check your connection.</p>;

  return (
    <div>
      <h1>Data Fetching</h1>
      <h2>Posts</h2>
      {posts.length === 0
        ? <p>No posts found.</p>
        : <ul style={{ listStyle: 'none', padding: 0 }}>
            {posts.map((p) => (
              <li key={p.id} style={{ border: '1px solid #eee', borderRadius: 10, padding: '0.8rem', margin: '0.4rem 0' }}>
                <strong>{p.title}</strong>
                <p style={{ margin: '0.2rem 0 0', color: '#666' }}>{p.body}</p>
              </li>
            ))}
          </ul>}
    </div>
  );
}
`,
      };
    },
    objId: ['Fetch data di dalam useEffect', 'Mengelola 3 status: loading, error, ready', 'Menangani empty state', 'Mencegah race condition dengan cancelled flag'],
    objEn: ['Fetch data inside useEffect', 'Manage 3 statuses: loading, error, ready', 'Handle the empty state', 'Prevent race conditions with a cancelled flag'],
    expId: `## Fetch dalam useEffect
Pola standar: \`useEffect\` dengan dependency \`[]\` berisi fetch, lalu update state saat response tiba. State, bukan variabel, yang menyimpan data hasil fetch.
\n## 3 Request States
UI harus menangani loading, error, dan ready — masing-masing dengan tampilan berbeda. Profesional menamai ini "request states" dan ini salah satu skill yang paling dicari di interview.
\n## Empty State
Data kosong bukan error: tampilkan pesan "no results". Fetch berhasil tapi array kosong tetap masuk status ready.
\n## Race Condition & Cleanup
Jika komponen unmount sebelum response tiba, setState pada komponen yang unmount memicu warning. Gunakan \`cancelled\` flag di cleanup. Juga cek \`res.ok\` — fetch tidak melempar error pada status 404/500.`,
    expEn: `## Fetch inside useEffect
The standard pattern: a \`useEffect\` with \`[]\` dependency contains the fetch, then updates state when the response arrives. State, not variables, holds fetched data.
\n## 3 Request States
The UI must handle loading, error, and ready — each with its own view. Professionals call these "request states" and it is one of the most sought-after skills in interviews.
\n## Empty State
Empty data is not an error: show a "no results" message. A successful fetch with an empty array still lands in the ready state.
\n## Race Conditions & Cleanup
If a component unmounts before the response arrives, setting state on an unmounted component warns. Use a \`cancelled\` flag in cleanup. Also check \`res.ok\` — fetch does not throw on 404/500 statuses.`,
    chId: 'Buat halaman dengan 2 seksi: daftar users (10 data) dan tombol "Load More" yang menambah limit (10 -> 20 -> 30). Tangani loading per aksi dan tampilkan skeleton sederhana saat memuat.',
    chEn: 'Build a page with 2 sections: a users list (10 items) and a "Load More" button increasing the limit (10 -> 20 -> 30). Handle per-action loading and show a simple skeleton while loading.',
    sumId: 'Fetch di useEffect + 3 request states + empty state + cancelled flag = pola produksi yang benar. Lanjut: React Router.',
    sumEn: 'Fetch in useEffect + 3 request states + empty state + cancelled flag = correct production pattern. Next: React Router.',
  },
  {
    phase: 3, num: 11, topicId: 'react-router',
    titleId: 'React Router v6', titleEn: 'React Router v6',
    codeFile: 'src/App.jsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.jsx': `import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

const products = [
  { id: 1, name: 'Mechanical Keyboard', price: 750000 },
  { id: 2, name: '27-inch Monitor', price: 3200000 },
  { id: 3, name: 'USB-C Hub', price: 250000 },
];

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Selamat datang di toko kita. Pilih produk dari menu Products.</p>
    </div>
  );
}

function Products() {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <Link to={'/products/' + p.id}>{p.name} — Rp {p.price.toLocaleString('id-ID')}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const navigate = useNavigate();
  if (!product) return <p>Product not found.</p>;
  return (
    <div>
      <h1>{product.name}</h1>
      <p>Rp {product.price.toLocaleString('id-ID')}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <p>Halaman tidak ditemukan.</p>
      <Link to="/">Go home</Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: 'flex', gap: '1rem', padding: '0.8rem 0', borderBottom: '2px solid #2E5B44', marginBottom: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
`,
      };
    },
    objId: ['Memahami SPA routing dengan React Router', 'Membuat route dan navigasi dengan Link', 'Menggunakan dynamic segments dengan useParams', 'Membuat 404 page dan useNavigate'],
    objEn: ['Understand SPA routing with React Router', 'Create routes and navigation with Link', 'Use dynamic segments with useParams', 'Build a 404 page and useNavigate'],
    expId: `## SPA Routing
React Router mengganti view tanpa reload penuh. URL adalah bagian dari state aplikasi: \`/products/2\` = produk id 2 — bisa di-share dan di-bookmark.
\n## Routes & Route
\`<Routes>\` mencocokkan URL ke elemen. \`path="*"\` menangkap semua URL yang tidak cocok (404). Order penting: route spesifik dulu, catch-all terakhir.
\n## Link vs <a>
\`<Link>\` melakukan navigasi client-side tanpa reload — berbeda dari \`<a href>\` yang memuat ulang halaman. Gunakan Link untuk semua navigasi internal.
\n## Dynamic Segments
\`/products/:id\` menangkap nilai di posisi \`:id\`, diakses via \`useParams()\`. Konversi tipe perlu manual: \`Number(id)\`. \`useNavigate()\` untuk navigasi programatik (tombol Back).`,
    expEn: `## SPA Routing
React Router swaps views without a full reload. The URL is part of app state: \`/products/2\` = product id 2 — shareable and bookmarkable.
\n## Routes & Route
\`<Routes>\` matches URLs to elements. \`path="*"\` catches any unmatched URL (404). Order matters: specific routes first, catch-all last.
\n## Link vs <a>
\`<Link>\` navigates client-side without reload — unlike \`<a href>\` which reloads the page. Use Link for all internal navigation.
\n## Dynamic Segments
\`/products/:id\` captures the value at the \`:id\` position, accessed via \`useParams()\`. Type conversion is manual: \`Number(id)\`. \`useNavigate()\` for programmatic navigation (Back button).`,
    chId: 'Tambah halaman Checkout dengan form (nama, alamat, metode bayar) di route /checkout, halaman About, dan layout NavigasiBar dengan NavLink (style aktif). Gunakan nested routes dengan Outlet.',
    chEn: 'Add a Checkout page with a form (name, address, payment method) at /checkout, an About page, and a NavBar layout with NavLink (active styles). Use nested routes with Outlet.',
    sumId: 'React Router v6: Routes/Route, Link, useParams, useNavigate, 404. URL = state aplikasi. Lanjut: project Recipe App.',
    sumEn: 'React Router v6: Routes/Route, Link, useParams, useNavigate, 404. The URL is app state. Next: Recipe App project.',
  },
  {
    phase: 3, num: 12, topicId: 'proyek-recipe',
    titleId: 'Proyek: Recipe App', titleEn: 'Project: Recipe App',
    codeFile: 'src/App.jsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.jsx': `import { useState, useEffect } from 'react';

export default function App() {
  const [query, setQuery] = useState('chicken');
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!query.trim()) return;
    let cancelled = false;
    setStatus('loading');
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + query)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) { setRecipes(data.meals || []); setStatus('ready'); }
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => { cancelled = true; };
  }, [query]);

  return (
    <div>
      <h1>Recipe Search</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search recipe (e.g. chicken, rice)..."
        style={{ width: '100%', boxSizing: 'border-box' }}
      />

      {status === 'loading' && <p style={{ color: '#666' }}>Searching recipes...</p>}
      {status === 'error' && <p style={{ color: '#b00020' }}>Failed to fetch recipes.</p>}

      {status === 'ready' && recipes.length === 0 && <p>No recipes found for "{query}".</p>}

      {status === 'ready' && recipes.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.8rem', marginTop: '1rem' }}>
          {recipes.map((r) => (
            <div key={r.idMeal} style={{ border: '1px solid #ddd', borderRadius: 12, padding: '1rem' }}>
              <img src={r.strMealThumb} alt={r.strMeal} style={{ width: '100%', borderRadius: 8 }} />
              <h3 style={{ margin: '0.5rem 0 0.2rem' }}>{r.strMeal}</h3>
              <p style={{ margin: 0, color: '#666' }}>{r.strCategory} · {r.strArea}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
`,
      };
    },
    objId: ['Menggabungkan fetching + controlled input', 'Memicu fetch ulang saat query berubah', 'Menampilkan grid hasil dengan request states', 'Menangani data dari API eksternal (CORS)'],
    objEn: ['Combine fetching + controlled inputs', 'Re-trigger fetches when the query changes', 'Render a results grid with request states', 'Handle external API data (CORS)'],
    expId: `## Search on Type
State query menjadi dependency effect: setiap ketikan mengubah state -> effect jalan ulang -> fetch dengan query baru. Ini pola "debounce-free" yang sederhana dan cukup untuk pembelajaran.
\n## Request States Lengkap
Proyek ini memakai keempat kondisi: loading (spinner/teks), error (pesan), empty ("no recipes"), dan success (grid). Sumber riset (GreatFrontend) menyebut ini proyek inti untuk job-readiness.
\n## API & CORS
API eksternal (themealdb) mengizinkan CORS sehingga bisa dipanggil dari browser. Di produksi, fetch biasanya lewat backend/server proxy untuk menyembunyikan key dan menghindari rate limit.
\n## Cleanup di Setiap Effect
Perhatikan \`cancelled\` flag — saat query cepat berubah, response lama dibuang sehingga tidak menimpa hasil baru (race condition).`,
    expEn: `## Search on Type
The query state is the effect dependency: every keystroke changes state -> effect re-runs -> fetch with the new query. This simple "no debounce" pattern is enough for learning.
\n## Complete Request States
This project uses all four conditions: loading (spinner/text), error (message), empty ("no recipes"), and success (grid). Research sources (GreatFrontend) call this a core project for job-readiness.
\n## APIs & CORS
The external API (themealdb) allows CORS so it can be called from the browser. In production, fetches usually go through a backend/proxy to hide keys and avoid rate limits.
\n## Cleanup in Every Effect
Note the \`cancelled\` flag — when the query changes quickly, stale responses are discarded so they never overwrite newer results (race condition).`,
    chId: 'Tambah halaman detail: klik resep membuka kartu berisi ingredients (loop strIngredient1..20 yang tidak kosong) dan petunjuk (strInstructions). Tambahkan tombol "Clear" untuk mengosongkan query.',
    chEn: 'Add a detail view: clicking a recipe opens a card with ingredients (loop strIngredient1..20, skipping empty ones) and instructions (strInstructions). Add a "Clear" button to reset the query.',
    sumId: 'Recipe App = milestone data: fetch + controlled input + 4 request states + race condition handling. Lanjut: Context API.',
    sumEn: 'Recipe App = data milestone: fetch + controlled inputs + 4 request states + race handling. Next: Context API.',
  },
];

// ===== PHASE 4: GLOBAL STATE & ADVANCED (lessons 13-16) =====
const LESSONS_P4 = [
  {
    phase: 4, num: 13, topicId: 'context-api',
    titleId: 'Context API', titleEn: 'Context API',
    codeFile: 'src/App.jsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.jsx': `import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);

function ThemeToggle() {
  const { theme, toggle } = useContext(ThemeContext);
  return <button onClick={toggle}>Switch to {theme === 'light' ? 'dark' : 'light'}</button>;
}

function Toolbar() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <span>Toolbar</span>
      <ThemeToggle />
    </div>
  );
}

function Card() {
  const { theme } = useContext(ThemeContext);
  return (
    <div style={{ border: '1px solid ' + (theme === 'light' ? '#ddd' : '#555'), borderRadius: 12, padding: '1rem', marginTop: '1rem' }}>
      <h3>Deep component</h3>
      <p>Baca theme dari context — tanpa prop drilling!</p>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, toggle: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')) }}>
      <div style={{ background: theme === 'light' ? '#ffffff' : '#1a1d21', color: theme === 'light' ? '#222' : '#eee', minHeight: '100vh', padding: '2rem', transition: 'all 0.2s' }}>
        <h1>Theme: {theme}</h1>
        <Toolbar />
        <Card />
      </div>
    </ThemeContext.Provider>
  );
}
`,
      };
    },
    objId: ['Mengenali masalah prop drilling', 'Membuat context dengan createContext', 'Memberikan nilai via Provider', 'Membaca context dengan useContext'],
    objEn: ['Recognize the prop drilling problem', 'Create a context with createContext', 'Provide values via Provider', 'Read context with useContext'],
    expId: `## Prop Drilling
Saat state harus turun 3-4 level komponen hanya untuk dipakai satu komponen dalam, tiap level perantara wajib meneruskan props yang tidak dipakainya. Ini namanya prop drilling — context adalah solusinya.
\n## createContext
\`createContext(null)\` membuat context object dengan nilai default. Context di-import oleh Provider (memberi nilai) dan konsumen (membaca nilai).
\n## Provider
\`<ThemeContext.Provider value={...}>\` membungkus subtree yang butuh nilai. Nilai bisa state, fungsi, atau keduanya. Komponen di dalamnya membaca nilai tanpa props.
\n## useContext
\`useContext(ThemeContext)\` mengembalikan nilai terdekat dari provider. Komponen dalam pun otomatis re-render saat nilai berubah. Gunakan context untuk nilai "scoped global": theme, auth, language — bukan untuk semua state.`,
    expEn: `## Prop Drilling
When state must travel 3-4 levels down only for one deep component, every intermediate level must forward props it doesn't use. That is prop drilling — context is the fix.
\n## createContext
\`createContext(null)\` creates a context object with a default value. The context is imported by the Provider (providing values) and consumers (reading values).
\n## Provider
\`<ThemeContext.Provider value={...}>\` wraps the subtree that needs the value. Values can be state, functions, or both. Components inside read it without props.
\n## useContext
\`useContext(ThemeContext)\` returns the nearest provider value. Deep components re-render automatically when the value changes. Use context for "scoped global" values: theme, auth, language — not for every state.`,
    chId: 'Bangun sistem auth sederhana: AuthContext menyimpan user (null = belum login). Header menampilkan login/logout, halaman Dashboard hanya tampil jika user ada (jika tidak: pesan "Please login"). User di-set dari form login.',
    chEn: 'Build a simple auth system: AuthContext holds user (null = logged out). Header shows login/logout, a Dashboard page renders only when a user exists (otherwise: "Please login" message). User is set from a login form.',
    sumId: 'Context menyelesaikan prop drilling: createContext + Provider + useContext. Cocok untuk nilai global scoped. Lanjut: useReducer & custom hooks.',
    sumEn: 'Context solves prop drilling: createContext + Provider + useContext. Best for scoped global values. Next: useReducer & custom hooks.',
  },
  {
    phase: 4, num: 14, topicId: 'reducer-custom-hooks',
    titleId: 'useReducer & Custom Hooks', titleEn: 'useReducer & Custom Hooks',
    codeFile: 'src/App.jsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.jsx': `import { useReducer } from 'react';

const products = [
  { id: 1, name: 'Mechanical Keyboard', price: 750000 },
  { id: 2, name: '27-inch Monitor', price: 3200000 },
  { id: 3, name: 'USB-C Hub', price: 250000 },
];

function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const item = state.find((i) => i.id === action.product.id);
      return item
        ? state.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...state, { ...action.product, qty: 1 }];
    }
    case 'remove':
      return state.filter((i) => i.id !== action.id);
    case 'clear':
      return [];
    default:
      return state;
  }
}

function useCart() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  return { cart, total, count, add: (p) => dispatch({ type: 'add', product: p }), remove: (id) => dispatch({ type: 'remove', id }), clear: () => dispatch({ type: 'clear' }) };
}

export default function App() {
  const { cart, total, count, add, remove, clear } = useCart();

  return (
    <div>
      <h1>useReducer & Custom Hooks</h1>

      <h2>Products</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map((p) => (
          <li key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', padding: '0.5rem 0' }}>
            <span>{p.name} — Rp {p.price.toLocaleString('id-ID')}</span>
            <button onClick={() => add(p)}>Add</button>
          </li>
        ))}
      </ul>

      <h2>Cart ({count} items)</h2>
      {cart.length === 0 && <p>Cart is empty.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cart.map((i) => (
          <li key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.3rem 0' }}>
            <span>{i.name} x{i.qty}</span>
            <button onClick={() => remove(i.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p><strong>Total: Rp {total.toLocaleString('id-ID')}</strong></p>
      {cart.length > 0 && <button onClick={clear}>Clear cart</button>}
    </div>
  );
}
`,
      };
    },
    objId: ['Memahami pola useReducer untuk state kompleks', 'Menulis reducer murni dengan action types', 'Membuat custom hook untuk membungkus logika', 'Menggabungkan reducer + derived state'],
    objEn: ['Understand useReducer for complex state', 'Write pure reducers with action types', 'Create custom hooks to wrap logic', 'Combine reducers + derived state'],
    expId: `## useReducer
Untuk state dengan banyak transisi terkait (tambah/ubah/hapus), useReducer memusatkan logika update dalam satu fungsi murni: \`(state, action) => newState\`. Action adalah objek deskriptif: \`{ type: 'add', product }\`.
\n## Reducer Murni
Reducer harus murni: output hanya dari (state, action), tanpa side effect. Ini membuat transisi mudah diuji dan diprediksi — alasan utama pola ini dipakai Redux/Zustand di belakang layar.
\n## Custom Hooks
\`useCart\` membungkus reducer + derived state (total, count) + aksi (add, remove, clear) dalam satu API rapi. Komponen memakai \`const { cart, total, add } = useCart()\` — logika diuji terpisah, komponen bersih.
\n## Kapan Reducer vs useState
Transisi sederhana (satu setter) -> useState. Banyak transisi saling terkait atau state object kompleks -> useReducer. Kebutuhan keduanya -> reducer dalam context (pola akhir di project berikutnya).`,
    expEn: `## useReducer
For state with many related transitions (add/update/remove), useReducer centralizes update logic in one pure function: \`(state, action) => newState\`. Actions are descriptive objects: \`{ type: 'add', product }\`.
\n## Pure Reducers
Reducers must be pure: output depends only on (state, action), no side effects. This makes transitions easy to test and predict — the reason Redux/Zustand use this pattern under the hood.
\n## Custom Hooks
\`useCart\` wraps the reducer + derived state (total, count) + actions (add, remove, clear) into one clean API. Components use \`const { cart, total, add } = useCart()\` — logic is tested separately, components stay clean.
\n## Reducer vs useState
Simple transitions (one setter) -> useState. Many related transitions or complex object state -> useReducer. Both needed -> reducer inside context (final pattern in the next project).`,
    chId: 'Refactor: pindahkan useCart ke CartContext (Provider + useContext) sehingga Header (badge jumlah item) dan halaman lain bisa membaca cart. Tambah tombol quantity +/- per item di keranjang (action inc/dec).',
    chEn: 'Refactor: move useCart into a CartContext (Provider + useContext) so the Header (item count badge) and other pages can read the cart. Add +/- quantity buttons per cart item (inc/dec actions).',
    sumId: 'useReducer memusatkan transisi state, custom hooks membungkus logika jadi API bersih. Lanjut: testing & performansi.',
    sumEn: 'useReducer centralizes state transitions, custom hooks wrap logic into clean APIs. Next: testing & performance.',
  },
  {
    phase: 4, num: 15, topicId: 'testing-performansi',
    titleId: 'Testing & Performansi', titleEn: 'Testing & Performance',
    codeFile: 'src/App.jsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.jsx': `import { memo, useMemo, useState } from 'react';

const products = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  name: 'Product ' + (i + 1),
  price: 50000 + i * 25000,
}));

const ProductRow = memo(function ProductRow({ product, onSelect }) {
  return (
    <li style={{ border: '1px solid #eee', borderRadius: 10, padding: '0.6rem', margin: '0.3rem 0' }}>
      <button onClick={() => onSelect(product)} style={{ border: 'none', background: 'none', textAlign: 'left', width: '100%', cursor: 'pointer' }}>
        <strong>{product.name}</strong> — Rp {product.price.toLocaleString('id-ID')}
      </button>
    </li>
  );
});

export default function App() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  // useMemo: only recompute when 'query' changes (60 items filtered per keystroke otherwise)
  const filtered = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <div>
      <h1>Testing & Performance</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter products..."
        style={{ width: '100%', boxSizing: 'border-box' }}
      />

      <p style={{ color: '#666' }}>{filtered.length} of {products.length} shown · ProductRow is memoized</p>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filtered.map((p) => (
          <ProductRow key={p.id} product={p} onSelect={setSelected} />
        ))}
      </ul>

      {selected && (
        <p><strong>Selected:</strong> {selected.name} — Rp {selected.price.toLocaleString('id-ID')}</p>
      )}
    </div>
  );
}
`,
        'src/App.test.jsx': `import { render, screen, fireEvent } from '@testing-library/react';
import App from './App.jsx';

test('filters the product list by query', async () => {
  render(<App />);
  const input = screen.getByPlaceholderText('Filter products...');
  fireEvent.change(input, { target: { value: 'Product 5' } });
  expect(screen.getByText(/Product 5/)).toBeInTheDocument();
  expect(screen.queryByText(/Product 60/)).not.toBeInTheDocument();
});
`,
      };
    },
    objId: ['Menulis test dasar dengan React Testing Library', 'Menerapkan memo untuk mencegah re-render tidak perlu', 'Menggunakan useMemo untuk kalkulasi mahal', 'Memahami kapan optimasi dibutuhkan'],
    objEn: ['Write basic tests with React Testing Library', 'Apply memo to prevent unnecessary re-renders', 'Use useMemo for expensive calculations', 'Understand when optimization is needed'],
    expId: `## React Testing Library
Test meniru cara user berinteraksi: render komponen, cari elemen, trigger event, cek hasil. \`getByPlaceholderText\`, \`fireEvent.change\`, \`expect(...).toBeInTheDocument()\`. Test file contoh ada di \`src/App.test.jsx\` (jalankan dengan Vitest + jsdom di project sendiri).
\n## memo
\`memo\` membuat komponen me-render ulang hanya jika props berubah. Berguna untuk list besar yang item-nya jarang berubah — mencegah seluruh list re-render saat parent berubah.
\n## useMemo
\`useMemo\` menyimpan hasil kalkulasi dan menghitung ulang hanya saat dependency berubah. Untuk filter 60 item per ketikan, ini menghindari kalkulasi ulang pada render yang tidak terkait.
\n## Jangan Prematur
Aturan praktis (react.dev): ukur dulu dengan profiler, optimasi hanya saat ada masalah nyata. memo/useMemo bukan default untuk setiap komponen — gunakan untuk list besar dan kalkulasi mahal saja.`,
    expEn: `## React Testing Library
Tests mimic how users interact: render a component, find elements, fire events, assert results. \`getByPlaceholderText\`, \`fireEvent.change\`, \`expect(...).toBeInTheDocument()\`. The example test file is in \`src/App.test.jsx\` (run with Vitest + jsdom in your own project).
\n## memo
\`memo\` makes a component re-render only when its props change. Great for large lists whose items rarely change — prevents the whole list from re-rendering when the parent changes.
\n## useMemo
\`useMemo\` caches a computed result and recomputes only when dependencies change. For filtering 60 items per keystroke, this avoids recomputation on unrelated renders.
\n## Don't Optimize Prematurely
Rule of thumb (react.dev): profile first, optimize only when there is a real problem. memo/useMemo are not defaults for every component — use them for large lists and expensive calculations.`,
    chId: 'Tambah test baru di App.test.jsx: klik produk menampilkan "Selected:" (gunakan fireEvent.click + getByText). Di komponen: tambahkan ProductRow yang menampilkan badge stok, dan hitung total harga list dengan useMemo.',
    chEn: 'Add a new test in App.test.jsx: clicking a product shows "Selected:" (use fireEvent.click + getByText). In the component: add a stock badge to ProductRow and compute the total list price with useMemo.',
    sumId: 'Testing = meniru interaksi user. memo/useMemo untuk optimasi list & kalkulasi — ukur dulu sebelum optimasi. Lanjut: project akhir.',
    sumEn: 'Testing = simulating user interaction. memo/useMemo optimize lists & calculations — measure before optimizing. Next: final project.',
  },
  {
    phase: 4, num: 16, topicId: 'proyek-akhir',
    titleId: 'Proyek Akhir: Shopping Cart', titleEn: 'Final Project: Shopping Cart',
    codeFile: 'src/App.jsx',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.jsx': `import { createContext, useContext, useReducer, useState } from 'react';

const products = [
  { id: 1, name: 'Mechanical Keyboard', price: 750000, category: 'Accessories' },
  { id: 2, name: '27-inch Monitor', price: 3200000, category: 'Displays' },
  { id: 3, name: 'USB-C Hub', price: 250000, category: 'Accessories' },
  { id: 4, name: 'Webcam 1080p', price: 450000, category: 'Accessories' },
  { id: 5, name: 'Ergonomic Chair', price: 1500000, category: 'Furniture' },
  { id: 6, name: 'Desk Lamp', price: 300000, category: 'Furniture' },
];

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state.some((i) => i.id === action.product.id)
        ? state.map((i) => (i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...state, { ...action.product, qty: 1 }];
    case 'remove':
      return state.filter((i) => i.id !== action.id);
    case 'clear':
      return [];
    default:
      return state;
  }
}

function Header({ cart, total, count }) {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #2E5B44', paddingBottom: '0.8rem', marginBottom: '1rem' }}>
      <h1 style={{ margin: 0 }}>Tryngo Store</h1>
      <span style={{ background: '#e7f5ee', color: '#2E5B44', borderRadius: 999, padding: '0.3rem 0.9rem', fontWeight: 'bold' }}>
        {count} items · Rp {total.toLocaleString('id-ID')}
      </span>
    </header>
  );
}

function ProductCard({ product, add }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 12, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <h3 style={{ margin: 0 }}>{product.name}</h3>
      <p style={{ margin: 0, color: '#666' }}>{product.category}</p>
      <p style={{ margin: 0 }}><strong>Rp {product.price.toLocaleString('id-ID')}</strong></p>
      <button onClick={() => add(product)} style={{ background: '#2E5B44', color: '#fff', border: 'none' }}>Add to Cart</button>
    </div>
  );
}

function CartList({ cart, remove, clear }) {
  if (cart.length === 0) return <p>Cart is empty — add products from the grid.</p>;
  return (
    <div>
      <h2>Your Cart</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cart.map((i) => (
          <li key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', padding: '0.4rem 0' }}>
            <span>{i.name} x{i.qty}</span>
            <button onClick={() => remove(i.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={clear}>Clear cart</button>
    </div>
  );
}

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [checkoutDone, setCheckoutDone] = useState(false);
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      <div>
        <Header cart={cart} total={total} count={count} />
        <h2>Products</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.8rem', marginBottom: '1.5rem' }}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} add={(product) => dispatch({ type: 'add', product })} />
          ))}
        </div>
        <CartList cart={cart} remove={(id) => dispatch({ type: 'remove', id })} clear={() => dispatch({ type: 'clear' })} />
        {checkoutDone && <p style={{ color: '#2E5B44', fontWeight: 'bold' }}>Order placed — thank you!</p>}
        {cart.length > 0 && (
          <button style={{ background: '#2E5B44', color: '#fff', border: 'none' }} onClick={() => { dispatch({ type: 'clear' }); setCheckoutDone(true); }}>
            Checkout (Rp {total.toLocaleString('id-ID')})
          </button>
        )}
      </div>
    </CartContext.Provider>
  );
}
`,
      };
    },
    objId: ['Membangun aplikasi utuh dengan semua konsep React', 'Menggabungkan reducer + context untuk global state', 'Menghitung derived state (total, count)', 'Menata kode dalam komponen yang jelas'],
    objEn: ['Build a complete app with all React concepts', 'Combine reducer + context for global state', 'Compute derived state (total, count)', 'Organize code into clear components'],
    expId: `## Yang Diuji di Project Ini
Project ini membuktikan seluruh kurikulum: komponen + props, list/keys, state, controlled input, lifting, useEffect/fetch, dan kini reducer + context. Capstone-style project seperti ini adalah penutup standar semua bootcamp (Udacity, Odin, Meta).
\n## Arsitektur
CartContext (context) + cartReducer (useReducer) = pola produksi umum: state global terpusat, transisi murni dan teruji, komponen apa pun membaca via useContext. Header dan CartList terpisah dari data.
\n## Derived State
\`total\` dan \`count\` dihitung setiap render dari cart — bukan disimpan. Sumber kebenaran tunggal: cart. UI selalu konsisten.
\n## Langkah Berikutnya
Kembangkan project ini dengan: React Router (halaman produk + checkout), React Query/TanStack untuk fetching server state, Tailwind + komponen library, lalu deploy ke Vercel/Netlify. Itu peta karier React standar industri (roadmap.sh).`,
    expEn: `## What This Project Proves
This project proves the whole curriculum: components + props, lists/keys, state, controlled inputs, lifting, useEffect/fetch, and now reducer + context. Capstone-style projects like this are the standard closer for every bootcamp (Udacity, Odin, Meta).
\n## Architecture
CartContext (context) + cartReducer (useReducer) = a common production pattern: centralized global state, pure testable transitions, any component reads via useContext. Header and CartList stay separate from data.
\n## Derived State
\`total\` and \`count\` are computed each render from cart — not stored. Single source of truth: cart. The UI is always consistent.
\n## Next Steps
Extend this project with: React Router (product + checkout pages), React Query/TanStack for server state, Tailwind + a component library, then deploy to Vercel/Netlify. That is the standard industry career map (roadmap.sh).`,
    chId: 'Sempurnakan project: (1) tambah React Router: /produk, /keranjang, /checkout dengan form alamat; (2) simpan cart ke localStorage via useEffect agar tahan refresh; (3) tampilkan notifikasi "added" saat klik Add to Cart; (4) deploy hasilnya.',
    chEn: 'Polish the project: (1) add React Router: /products, /cart, /checkout with an address form; (2) persist the cart to localStorage via useEffect so it survives refresh; (3) show an "added" notification when clicking Add to Cart; (4) deploy the result.',
    sumId: 'Capstone selesai: reducer + context + derived state dalam satu aplikasi. Selanjutnya: router, server state (React Query), styling, deploy — jalur karier React standar.',
    sumEn: 'Capstone done: reducer + context + derived state in one app. Next: routing, server state (React Query), styling, deployment — the standard React career path.',
  },
];

const LESSONS = [...LESSONS_P1, ...LESSONS_P2, ...LESSONS_P3, ...LESSONS_P4];

// ===== GENERATE =====
for (const lesson of LESSONS) {
  const phase = PHASES.find((p) => p.phase === lesson.phase);
  const levelDir = phase.id;
  const mdDir = path.join(BASE_DIR, levelDir);

  const objListId = lesson.objId.map((o) => `- ${o}`).join('\n');
  const objListEn = lesson.objEn.map((o) => `- ${o}`).join('\n');

  for (const lang of ['id', 'en']) {
    const isId = lang === 'id';
    const title = isId ? lesson.titleId : lesson.titleEn;
    const phaseName = isId ? phase.nameId : phase.nameEn;
    const objList = isId ? objListId : objListEn;
    const exp = isId ? lesson.expId : lesson.expEn;
    const ch = isId ? lesson.chId : lesson.chEn;
    const sum = isId ? lesson.sumId : lesson.sumEn;
    const lessonLabel = isId ? `Pelajaran ${lesson.num}` : `Lesson ${lesson.num}`;

    const langDir = path.join(mdDir, lang);
    fs.mkdirSync(langDir, { recursive: true });

    const code = lesson.files[lesson.codeFile] || '';
    const filename = `lesson${lesson.num}-${lesson.topicId}.md`;
    const content = `# ${title}

> React | ${phaseName} | ${lessonLabel}

## ${isId ? 'Tujuan Pembelajaran' : 'Learning Objectives'}

${objList}

---

## ${isId ? 'Program: ' : 'Program: '}${title}

\`\`\`jsx
${code}
\`\`\`

---

## ${isId ? 'Penjelasan' : 'Explanation'}

${exp}

---

## ${isId ? 'Eksperimen' : 'Experiments'}

${lesson.expId.split('\n').map((l) => l.trim()).filter((l) => l.startsWith('##')).map((h, i) => `${i + 1}. **${h.replace(/^#+\s*/, '')}**`).join('\n')}

---

## ${isId ? 'Tantangan' : 'Challenge'}

${ch}

---

## ${isId ? 'Ringkasan' : 'Summary'}

${sum}
`;

    fs.writeFileSync(path.join(langDir, filename), content);

    // Write project files JSON for StackBlitz playground
    const filesJson = path.join(langDir, `lesson${lesson.num}-${lesson.topicId}.json`);
    fs.writeFileSync(filesJson, JSON.stringify(lesson.files, null, 2));
  }

  console.log(`  ${lesson.num}. ${lesson.titleId} / ${lesson.titleEn}`);
}

const total = LESSONS.length * 2;
console.log(`\n✓ Generated ${total} React curriculum files (${LESSONS.length} lessons × 2 languages)`);
console.log(`  Output: ${BASE_DIR}`);
