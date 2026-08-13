import { BaseGenerator } from './lib/base-generator.mjs';

// ─────────────────────────────────────────────────────────────────────────────
// REACT CURRICULUM — pure research, zero framework influence
// Sources: Official React Docs, Epic React (Kent C. Dodds), React Docs Beta,
//          Roadmap.sh React, Patterns.dev, React TypeScript Cheatsheet
// ─────────────────────────────────────────────────────────────────────────────
// Research consensus: 3 levels, 12 weeks total
//   Beginner (4w): JSX, Components, Props, State
//   Intermediate (4w): Effects, Router, Context, Forms
//   Advanced (4w): Patterns, Testing, Performance, Project
// Total: 12 weeks (within research range)
// ─────────────────────────────────────────────────────────────────────────────

const gen = new BaseGenerator('react', 'React');

const LEVELS = [
  {
    levelId: 'beginer',
    nameId: 'Pemula',
    nameEn: 'Beginner',
    descId: 'Dasar React: JSX, komponen, props, state — fondasi membangun UI modern.',
    descEn: 'React basics: JSX, components, props, state — foundation for building modern UIs.',
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah',
    nameEn: 'Intermediate',
    descId: 'React tingkat menengah: effects, router, context, forms — membangun aplikasi lengkap.',
    descEn: 'Intermediate React: effects, router, context, forms — building complete applications.',
  },
  {
    levelId: 'advanced',
    nameId: 'Lanjutan',
    nameEn: 'Advanced',
    descId: 'React tingkat lanjutan: patterns, testing, performance, proyek capstone.',
    descEn: 'Advanced React: patterns, testing, performance, capstone project.',
  },
];

const MODULES = [
  // ── BEGINNER (weeks 1-4) ──────────────────────────────────────────────────
  {
    week: 1, level: 'beginer', topicId: 'jsx-dasar',
    titleId: 'JSX & Komponen Dasar', titleEn: 'JSX & Basic Components',
    programId: 'Halo React', programEn: 'Hello React',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'jsx',
    code: `// JSX memungkinkan penulisan HTML-like syntax dalam JavaScript
// Setiap komponen React adalah function yang return JSX

function Welcome() {
  const name = "Tryngo";
  const isDark = true;

  return (
    <div className="card">
      <h1>Halo, {name}!</h1>
      <p>Mode: {isDark ? "Gelap" : "Terang"}</p>
      <ul>
        <li>JSX = JavaScript + XML</li>
        <li>Curly braces {} untuk ekspresi</li>
        <li>className (bukan class)</li>
      </ul>
    </div>
  );
}

function App() {
  return (
    <div>
      <Welcome />
      <Welcome />
    </div>
  );
}

// Render ke DOM
// ReactDOM.createRoot(document.getElementById('root')).render(<App />);
console.log("Komponen App berhasil didefinisikan");`,
    objectivesId: [
      'Memahami JSX sebagai extension syntax JavaScript (React Docs)',
      'Membuat function component sederhana yang me-return JSX',
      'Menggunakan curly braces {} untuk ekspresi JavaScript di JSX',
      'Membedakan JSX dengan HTML: className, htmlFor, camelCase',
      'Mengapa JSX bukan string HTML — compiled ke React.createElement',
    ],
    objectivesEn: [
      'Understand JSX as JavaScript syntax extension (React Docs)',
      'Create simple function components returning JSX',
      'Use curly braces {} for JavaScript expressions in JSX',
      'Distinguish JSX from HTML: className, htmlFor, camelCase',
      'Why JSX is not HTML strings — compiled to React.createElement',
    ],
    explanationId: '### JSX\nJSX = JavaScript XML. Syntactic sugar yang dikompilasi ke React.createElement(). Bisa menyisipkan ekspresi JS dengan {}.\n\n### Komponen\nFunction yang return JSX. Harus dimulai huruf kapital (konvensi React). Komponen bisa dipakai berulang.\n\n### Ekspresi JSX\n- Ternary: {cond ? "yes" : "no"}\n- Logical &&: {isLoggedIn && <Dashboard />}\n- map(): {items.map(item => <li key={item.id}>{item.name}</li>)}\n\n### Rules JSX\n- Satu root element (atau Fragment <>)\n- Semua tag harus ditutup\n- className, htmlFor (reserved words)',
    explanationEn: '### JSX\nJSX = JavaScript XML. Compiled to React.createElement(). Embed JS expressions with {}.\n\n### Components\nFunctions returning JSX. Must start with uppercase. Reusable.\n\n### JSX Expressions\n- Ternary, logical &&, map()\n- Single root element\n- All tags closed',
    experimentsId: [
      'Buat komponen baru dengan data berbeda',
      'Ubah conditional rendering dari ternary ke logical &&',
      'Render list dengan map() dari array object',
      'Buat nested komponen 3 level',
    ],
    experimentsEn: [
      'Create a new component with different data',
      'Change conditional rendering from ternary to logical &&',
      'Render list with map() from array of objects',
      'Create nested components 3 levels deep',
    ],
    challengeId: 'Buat halaman profil pengguna dengan komponen: Avatar, UserInfo, SkillList. Gunakan conditional rendering untuk status online/offline.',
    challengeEn: 'Build a user profile page with components: Avatar, UserInfo, SkillList. Use conditional rendering for online/offline status.',
    summaryId: 'Minggu 1 dari 12: **JSX & Komponen Dasar** (Level: Pemula). Fondasi React. Minggu depan: **Props & Data Flow**.',
    summaryEn: 'Week 1 of 12: **JSX & Basic Components** (Level: Beginner). React foundations. Next week: **Props & Data Flow**.',
  },
  {
    week: 2, level: 'beginer', topicId: 'props-data-flow',
    titleId: 'Props & Data Flow', titleEn: 'Props & Data Flow',
    programId: 'Kartu Produk', programEn: 'Product Card',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'jsx',
    code: `// Props = data yang diterima komponen dari parent (read-only)
// Data flow React = satu arah: parent → child

function ProductCard({ name, price, isAvailable, tags }) {
  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p className="price">Rp {price.toLocaleString("id-ID")}</p>
      <span className={isAvailable ? "in-stock" : "out-stock"}>
        {isAvailable ? "Tersedia" : "Habis"}
      </span>
      <div className="tags">
        {tags.map((tag, i) => (
          <span key={i} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}

function App() {
  const products = [
    { name: "Laptop", price: 15000000, isAvailable: true, tags: ["Elektronik", "Kerja"] },
    { name: "Buku", price: 85000, isAvailable: false, tags: ["Edukasi"] },
  ];

  return (
    <div>
      {products.map((p, i) => (
        <ProductCard
          key={i}
          name={p.name}
          price={p.price}
          isAvailable={p.isAvailable}
          tags={p.tags}
        />
      ))}
    </div>
  );
}

console.log("App komponen siap digunakan");`,
    objectivesId: [
      'Menerima dan menggunakan props di function component',
      'Destructuring props: { name, price } langsung di parameter',
      'Props read-only — tidak bisa diubah oleh child component',
      'Mengirim props: string, number, boolean, array, object, function',
      'Rendering list dengan map() dan key prop untuk performa',
    ],
    objectivesEn: [
      'Receive and use props in function components',
      'Destructure props: { name, price } directly in parameters',
      'Props are read-only — cannot be changed by child components',
      'Pass props: strings, numbers, booleans, arrays, objects, functions',
      'Render lists with map() and key prop for performance',
    ],
    explanationId: '### Props\nData dari parent ke child. Read-only, tidak bisa diubah child.\n\n### Destructuring\nfunction Card({ name, price }) langsung ambil field yang dibutuhkan.\n\n### Data Flow\nSatu arah: parent → child. Child tidak mengubah parent langsung.\n\n### Key Prop\nKey membantu React identifikasi item saat update list. Gunakan ID unik, bukan index.',
    explanationEn: '### Props\nData from parent to child. Read-only.\n\n### Destructuring\nExtract fields directly in parameters.\n\n### Data Flow\nOne-way: parent → child.\n\n### Key Prop\nHelps React identify list items. Use unique IDs.',
    experimentsId: [
      'Tambah prop baru: rating (1-5 bintang)',
      'Ubah data products dan lihat perubahan otomatis',
      'Buat komponen child yang menerima callback sebagai prop',
      'Coba kirim function sebagai prop',
    ],
    experimentsEn: [
      'Add new prop: rating (1-5 stars)',
      'Change products data and observe automatic updates',
      'Create child component receiving callback as prop',
      'Try passing function as prop',
    ],
    challengeId: 'Buat katalog produk dengan komponen: ProductCard, ProductList, PriceFilter. Props untuk data dan callback untuk filter.',
    challengeEn: 'Build a product catalog with components: ProductCard, ProductList, PriceFilter. Props for data and callback for filtering.',
    summaryId: 'Minggu 2 dari 12: **Props & Data Flow** (Level: Pemula). Komunikasi antar komponen. Minggu depan: **State & useState**.',
    summaryEn: 'Week 2 of 12: **Props & Data Flow** (Level: Beginner). Inter-component communication. Next week: **State & useState**.',
  },
  {
    week: 3, level: 'beginer', topicId: 'state-usestate',
    titleId: 'State & useState', titleEn: 'State & useState',
    programId: 'Counter & Form', programEn: 'Counter & Form',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'jsx',
    code: `// State = data internal komponen yang bisa berubah
// useState hook = tambahkan state ke function component

import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Hitung: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+ Tambah</button>
      <button onClick={() => setCount(count - 1)}>- Kurang</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

function Form() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(name);
    setName("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama Anda"
        />
        <button type="submit">Kirim</button>
      </form>
      {submitted && <p>Halo, {submitted}!</p>}
    </div>
  );
}

function App() {
  return (
    <div>
      <Counter />
      <Form />
    </div>
  );
}

console.log("Counter & Form siap digunakan");`,
    objectivesId: [
      'Memahami state sebagai data yang bisa berubah dalam komponen',
      'useState hook: const [value, setValue] = useState(initial)',
      'State trigger re-render — UI update otomatis saat state berubah',
      'Controlled component: form input yang dikontrol React',
      'Event handling: onChange, onClick, onSubmit',
    ],
    objectivesEn: [
      'Understand state as changeable data within components',
      'useState hook: const [value, setValue] = useState(initial)',
      'State triggers re-render — UI updates automatically when state changes',
      'Controlled components: form inputs controlled by React',
      'Event handling: onChange, onClick, onSubmit',
    ],
    explanationId: '### useState\nHook untuk tambah state. Return [currentValue, setterFunction].\n\n### Re-render\nSaat setState dipanggil, React re-render komponen dengan nilai baru.\n\n### Controlled Component\nForm input yang value-nya dikontrol state. onChange update state.\n\n### Event Handling\ne.target.value untuk input, e.preventDefault() untuk form.',
    explanationEn: '### useState\nHook to add state. Returns [value, setter].\n\n### Re-render\nsetState triggers re-render with new value.\n\n### Controlled Components\nForm inputs controlled by state.\n\n### Event Handling\ne.target.value, e.preventDefault().',
    experimentsId: [
      'Buat toggle show/hide dengan useState boolean',
      'Buat input untuk multiple field (nama, email)',
      'Gunakan functional update: setCount(prev => prev + 1)',
      'Buat counter dengan step configurable',
    ],
    experimentsEn: [
      'Create show/hide toggle with useState boolean',
      'Create input for multiple fields (name, email)',
      'Use functional update: setCount(prev => prev + 1)',
      'Create counter with configurable step',
    ],
    challengeId: 'Buat todo list sederhana: tambah task, toggle complete, hapus task. Gunakan useState untuk array of objects.',
    challengeEn: 'Build a simple todo list: add task, toggle complete, delete task. Use useState for array of objects.',
    summaryId: 'Minggu 3 dari 12: **State & useState** (Level: Pemula). Interaktivitas dalam komponen. Minggu depan: **useEffect & Lifecycle**.',
    summaryEn: 'Week 3 of 12: **State & useState** (Level: Beginner). Interactivity in components. Next week: **useEffect & Lifecycle**.',
  },
  {
    week: 4, level: 'beginer', topicId: 'useeffect-lifecycle',
    titleId: 'useEffect & Lifecycle', titleEn: 'useEffect & Lifecycle',
    programId: 'Fetch Data & Timer', programEn: 'Fetch Data & Timer',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'jsx',
    code: `// useEffect = side effects: fetch data, subscribe, timer, DOM manipulation
// Dependency array: [] = mount only, [dep] = when dep changes

import { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(id); // cleanup
  }, []);

  return <p>Waktu: {seconds} detik</p>;
}

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi fetch data
    setTimeout(() => {
      setUsers([
        { id: 1, name: "Budi" },
        { id: 2, name: "Siti" },
        { id: 3, name: "Andi" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <p>Memuat...</p>;

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <div>
      <Timer />
      <UserList />
    </div>
  );
}

console.log("Timer & UserList siap digunakan");`,
    objectivesId: [
      'useEffect untuk side effects: fetch, subscribe, timer',
      'Dependency array: [] = sekali mount, [dep] = saat dep berubah',
      'Cleanup function: return () => { ... } untuk unsubscribe',
      'Loading state pattern: tampilkan loading saat fetch data',
      'Mengapa fetch di useEffect, bukan langsung di body component',
    ],
    objectivesEn: [
      'useEffect for side effects: fetch, subscribe, timers',
      'Dependency array: [] = mount once, [dep] = when dep changes',
      'Cleanup function: return () => { ... } for unsubscription',
      'Loading state pattern: show loading while fetching data',
      'Why fetch in useEffect, not directly in component body',
    ],
    explanationId: '### useEffect\nJalankan side effect setelah render. Dependency array kontrol kapan jalan.\n\n### Dependency Array\n- [] = sekali saat mount\n- [count] = saat count berubah\n- Tidak ada = setiap render\n\n### Cleanup\nReturn function untuk cleanup: unsubscribe, clear timer.\n\n### Fetch Pattern\nSet loading true → fetch → set data → set loading false.',
    explanationEn: '### useEffect\nRun side effects after render.\n\n### Dependency Array\nControls when effect runs.\n\n### Cleanup\nReturn cleanup function.\n\n### Fetch Pattern\nLoading → fetch → set data → done.',
    experimentsId: [
      'Buat efek yang jalan saat prop berubah',
      'Buat fetch dengan error handling',
      'Implementasikan debounce search input',
      'Buat efek cleanup yang berbeda',
    ],
    experimentsEn: [
      'Create effect that runs when prop changes',
      'Create fetch with error handling',
      'Implement debounce search input',
      'Create different cleanup effects',
    ],
    challengeId: 'Buat aplikasi cuaca: fetch data dari API (simulasi), tampilkan loading/error, auto-refresh setiap 30 detik.',
    challengeEn: 'Build a weather app: fetch data from API (simulated), show loading/error, auto-refresh every 30 seconds.',
    summaryId: 'Minggu 4 dari 12: **useEffect & Lifecycle** (Level: Pemula). Selesai fase Beginner! Minggu depan: **React Router**.',
    summaryEn: 'Week 4 of 12: **useEffect & Lifecycle** (Level: Beginner). Beginner phase complete! Next week: **React Router**.',
  },
  // ── INTERMEDIATE (weeks 5-8) ──────────────────────────────────────────────
  {
    week: 5, level: 'intermediate', topicId: 'react-router',
    titleId: 'React Router', titleEn: 'React Router',
    programId: 'Multi-Halaman', programEn: 'Multi-Page App',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'jsx',
    code: `// React Router = routing SPA (Single Page Application)
// BrowserRouter, Routes, Route, Link, useParams, useNavigate

import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Beranda</h1>
      <p>Selamat datang di Tryngo App</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>Tentang Kami</h1>
      <p>Platform pembelajaran coding interaktif</p>
    </div>
  );
}

function User() {
  const { id } = useParams();
  return (
    <div>
      <h1>Profil Pengguna</h1>
      <p>ID: {id}</p>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => navigate("/")}>Kembali</button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Beranda</Link>
        <Link to="/about">Tentang</Link>
        <Link to="/user/123">User 123</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

console.log("React Router App siap digunakan");`,
    objectivesId: [
      'Setup BrowserRouter dan Routes/Route untuk routing',
      'Link component untuk navigasi tanpa page reload',
      'useParams untuk ambil dynamic route parameters',
      'useNavigate untuk programmatic navigation',
      'Nested routes dan layout routes',
    ],
    objectivesEn: [
      'Setup BrowserRouter and Routes/Route for routing',
      'Link component for navigation without page reload',
      'useParams to get dynamic route parameters',
      'useNavigate for programmatic navigation',
      'Nested routes and layout routes',
    ],
    explanationId: '### BrowserRouter\nWrap seluruh app untuk enable routing.\n\n### Routes & Route\nRoute = path → element. Routes = container.\n\n### Dynamic Routes\n/path/:id → useParams() untuk ambil id.\n\n### Navigation\nLink = anchor tag SPA. useNavigate() = programmatic.',
    explanationEn: '### BrowserRouter\nWraps app for routing.\n\n### Routes & Route\nRoute maps path to element.\n\n### Dynamic Routes\nuseParams for URL parameters.\n\n### Navigation\nLink for SPA navigation, useNavigate for programmatic.',
    experimentsId: [
      'Tambah route 404 Not Found',
      'Buat nested route dengan layout',
      'Implementasikan route guard (protected route)',
      'Tambah active link styling',
    ],
    experimentsEn: [
      'Add 404 Not Found route',
      'Create nested routes with layout',
      'Implement route guards (protected routes)',
      'Add active link styling',
    ],
    challengeId: 'Buat blog app dengan routing: Home, Post List, Post Detail (/post/:id), About. Gunakan layout wrapper dan active navigation.',
    challengeEn: 'Build a blog app with routing: Home, Post List, Post Detail (/post/:id), About. Use layout wrapper and active navigation.',
    summaryId: 'Minggu 5 dari 12: **React Router** (Level: Menengah). Navigasi multi-halaman. Minggu depan: **Context API**.',
    summaryEn: 'Week 5 of 12: **React Router** (Level: Intermediate). Multi-page navigation. Next week: **Context API**.',
  },
  {
    week: 6, level: 'intermediate', topicId: 'context-api',
    titleId: 'Context API & useReducer', titleEn: 'Context API & useReducer',
    programId: 'Tema & Auth', programEn: 'Theme & Auth',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'jsx',
    code: `// Context = state global tanpa prop drilling
// useReducer = state management kompleks (alternatif useState)

import { createContext, useContext, useReducer } from "react";

// ── Context Setup ──
const ThemeContext = createContext(null);

// ── Reducer ──
function themeReducer(state, action) {
  switch (action.type) {
    case "TOGGLE":
      return { ...state, dark: !state.dark };
    case "SET_COLOR":
      return { ...state, color: action.payload };
    default:
      return state;
  }
}

function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, { dark: false, color: "blue" });
  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeToggle() {
  const { state, dispatch } = useContext(ThemeContext);
  return (
    <div style={{ background: state.dark ? "#222" : "#fff", padding: 20 }}>
      <p>Mode: {state.dark ? "Gelap" : "Terang"} | Warna: {state.color}</p>
      <button onClick={() => dispatch({ type: "TOGGLE" })}>
        Toggle Tema
      </button>
      <button onClick={() => dispatch({ type: "SET_COLOR", payload: "green" })}>
        Set Green
      </button>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
}

console.log("Context & useReducer siap digunakan");`,
    objectivesId: [
      'createContext dan Provider untuk state global',
      'useContext hook untuk consume context',
      'useReducer untuk state management dengan action types',
      'Kapan pakai Context vs prop drilling vs state library',
      'Custom hooks: useTheme, useAuth pattern',
    ],
    objectivesEn: [
      'createContext and Provider for global state',
      'useContext hook to consume context',
      'useReducer for state management with action types',
      'When to use Context vs prop drilling vs state library',
      'Custom hooks: useTheme, useAuth pattern',
    ],
    explanationId: '### Context\ncreateContext() → Provider → useContext(). Hindari prop drilling.\n\n### useReducer\nState kompleks dengan banyak action. dispatch({ type, payload }).\n\n### Pattern\n- Provider wrap app\n- Custom hook: useTheme() = useContext(ThemeContext)\n- Reducer: switch(action.type)',
    explanationEn: '### Context\ncreateContext → Provider → useContext. Avoid prop drilling.\n\n### useReducer\nComplex state with actions. dispatch({ type, payload }).\n\n### Pattern\nProvider wraps app, custom hooks, reducer pattern.',
    experimentsId: [
      'Buat context untuk autentikasi (login/logout)',
      'Tambah action baru di reducer',
      'Buat multiple context (Theme + Auth)',
      'Implementasikan custom hook useLocalStorage',
    ],
    experimentsEn: [
      'Create context for authentication (login/logout)',
      'Add new action to reducer',
      'Create multiple contexts (Theme + Auth)',
      'Implement custom hook useLocalStorage',
    ],
    challengeId: 'Buat shopping cart dengan Context + useReducer: add item, remove item, update quantity, total price.',
    challengeEn: 'Build a shopping cart with Context + useReducer: add item, remove item, update quantity, total price.',
    summaryId: 'Minggu 6 dari 12: **Context API & useReducer** (Level: Menengah). State management global. Minggu depan: **Forms & Validation**.',
    summaryEn: 'Week 6 of 12: **Context API & useReducer** (Level: Intermediate). Global state management. Next week: **Forms & Validation**.',
  },
  {
    week: 7, level: 'intermediate', topicId: 'forms-validation',
    titleId: 'Forms & Validasi', titleEn: 'Forms & Validation',
    programId: 'Form Registrasi', programEn: 'Registration Form',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'jsx',
    code: `// Controlled forms = setiap input dikontrol React state
// Validasi: real-time feedback, error messages, prevent submit

import { useState } from "react";

function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Nama wajib diisi";
    if (!form.email.includes("@")) errs.email = "Email tidak valid";
    if (form.password.length < 6) errs.password = "Min 6 karakter";
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Clear error saat user mulai mengetik
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
    console.log("Data terkirim:", form);
  }

  if (submitted) {
    return <p>Registrasi berhasil! Selamat, {form.name}!</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nama" />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div>
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      <button type="submit">Daftar</button>
    </form>
  );
}

console.log("RegisterForm siap digunakan");`,
    objectivesId: [
      'Controlled form: setiap input punya value + onChange',
      'Single handler untuk multiple input (name attribute)',
      'Real-time validation: error saat submit dan saat mengetik',
      'Error state management dan conditional rendering',
      'Form submission: preventDefault, validate, submit',
    ],
    objectivesEn: [
      'Controlled forms: each input has value + onChange',
      'Single handler for multiple inputs (name attribute)',
      'Real-time validation: errors on submit and while typing',
      'Error state management and conditional rendering',
      'Form submission: preventDefault, validate, submit',
    ],
    explanationId: '### Controlled Form\nvalue + onChange = React kontrol input.\n\n### Single Handler\ne.name sebagai key: setForm({ ...form, [e.target.name]: e.target.value }).\n\n### Validation\nValidate saat submit. Clear error saat user mulai mengetik.\n\n### UX Pattern\n- Error di bawah input\n- Disable button saat invalid\n- Success message setelah submit',
    explanationEn: '### Controlled Forms\nvalue + onChange = React controls input.\n\n### Single Handler\ne.name as key for dynamic updates.\n\n### Validation\nValidate on submit, clear on type.\n\n### UX Pattern\nErrors below inputs, disable button, success message.',
    experimentsId: [
      'Tambah validasi password strength',
      'Buat field konfirmasi password',
      'Tambah checkbox terms & conditions',
      'Implementasikan async validation (cek email unik)',
    ],
    experimentsEn: [
      'Add password strength validation',
      'Create password confirmation field',
      'Add terms & conditions checkbox',
      'Implement async validation (check unique email)',
    ],
    challengeId: 'Buat form checkout dengan validasi: nama, alamat, telepon, email, metode pembayaran. Tampilkan error real-time.',
    challengeEn: 'Build a checkout form with validation: name, address, phone, email, payment method. Show real-time errors.',
    summaryId: 'Minggu 7 dari 12: **Forms & Validasi** (Level: Menengah). User input handling. Minggu depan: **Custom Hooks & Patterns**.',
    summaryEn: 'Week 7 of 12: **Forms & Validation** (Level: Intermediate). User input handling. Next week: **Custom Hooks & Patterns**.',
  },
  {
    week: 8, level: 'intermediate', topicId: 'custom-hooks',
    titleId: 'Custom Hooks & Patterns', titleEn: 'Custom Hooks & Patterns',
    programId: 'useFetch & useLocalStorage', programEn: 'useFetch & useLocalStorage',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'jsx',
    code: `// Custom hooks = extract reusable logic ke function sendiri
// Convention: prefix "use" (React convention)

import { useState, useEffect } from "react";

// Custom hook: useLocalStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Custom hook: useFetch
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Simulasi fetch
    setTimeout(() => {
      setData([{ id: 1, name: "Item A" }, { id: 2, name: "Item B" }]);
      setLoading(false);
    }, 1000);
  }, [url]);

  return { data, loading, error };
}

// Custom hook: useToggle
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue((v) => !v);
  return [value, toggle];
}

function App() {
  const [name, setName] = useLocalStorage("username", "");
  const [isOpen, toggle] = useToggle(false);
  const { data, loading } = useFetch("/api/items");

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama" />
      <p>Halo, {name || "Guest"}!</p>
      <button onClick={toggle}>{isOpen ? "Tutup" : "Buka"}</button>
      {loading && <p>Loading...</p>}
      {data && data.map((item) => <p key={item.id}>{item.name}</p>)}
    </div>
  );
}

console.log("Custom hooks siap digunakan");`,
    objectivesId: [
      'Membuat custom hook dengan prefix "use"',
      'useLocalStorage: persist state ke localStorage',
      'useFetch: reusable data fetching logic',
      'useToggle: reusable toggle logic',
      'Kapan extract logic ke custom hook vs inline',
    ],
    objectivesEn: [
      'Create custom hooks with "use" prefix',
      'useLocalStorage: persist state to localStorage',
      'useFetch: reusable data fetching logic',
      'useToggle: reusable toggle logic',
      'When to extract logic to custom hook vs inline',
    ],
    explanationId: '### Custom Hook\nFunction dengan prefix "use" yang bisa pakai hooks lain.\n\n### useLocalStorage\nBaca initial dari localStorage, sync saat value berubah.\n\n### useFetch\nReturn { data, loading, error }. Reusable untuk endpoint berbeda.\n\n### Kapan Extract\n- Logic dipakai 2+ komponen\n- Terlalu banyak logic di component\n- Ingin test logic terpisah',
    explanationEn: '### Custom Hook\nFunction with "use" prefix using other hooks.\n\n### useLocalStorage\nRead initial from localStorage, sync on change.\n\n### useFetch\nReturn { data, loading, error }.\n\n### When Extract\n- Logic used in 2+ components\n- Too much logic in component\n- Want to test logic separately',
    experimentsId: [
      'Buat useDebounce hook',
      'Buat useMediaQuery hook',
      'Buat usePrevious hook',
      'Buat useOnlineStatus hook',
    ],
    experimentsEn: [
      'Create useDebounce hook',
      'Create useMediaQuery hook',
      'Create usePrevious hook',
      'Create useOnlineStatus hook',
    ],
    challengeId: 'Buat useForm hook yang handle: values, errors, handleChange, handleSubmit, reset. Gunakan di 2 form berbeda.',
    challengeEn: 'Build useForm hook handling: values, errors, handleChange, handleSubmit, reset. Use in 2 different forms.',
    summaryId: 'Minggu 8 dari 12: **Custom Hooks & Patterns** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Advanced Patterns**.',
    summaryEn: 'Week 8 of 12: **Custom Hooks & Patterns** (Level: Intermediate). Intermediate phase complete! Next week: **Advanced Patterns**.',
  },
  // ── ADVANCED (weeks 9-12) ────────────────────────────────────────────────
  {
    week: 9, level: 'advanced', topicId: 'advanced-patterns',
    titleId: 'Advanced Patterns', titleEn: 'Advanced Patterns',
    programId: 'HOC & Render Props', programEn: 'HOC & Render Props',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'jsx',
    code: `// Advanced patterns: HOC, Render Props, Compound Components
// Patterns untuk code reuse yang lebih powerful

import { useState } from "react";

// ── Higher-Order Component (HOC) ──
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const isAuthenticated = true; // simulasi
    if (!isAuthenticated) return <p>Silakan login terlebih dahulu</p>;
    return <Component {...props} />;
  };
}

// ── Render Props ──
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  return (
    <div style={{ height: 200, background: "#eee" }}
      onMouseMove={(e) => setPosition({ x: e.clientX, y: e.clientY })}>
      {render(position)}
    </div>
  );
}

// ── Compound Components ──
function Select({ children, value, onChange }) {
  return (
    <div className="select" onClick={() => onChange(value)}>
      {children}
    </div>
  );
}
Select.Option = function Option({ value, children }) {
  return <div className="option">{children}</div>;
};

// ── Usage ──
const ProtectedDashboard = withAuth(function Dashboard() {
  return <h1>Dashboard (Protected)</h1>;
});

function App() {
  return (
    <div>
      <ProtectedDashboard />
      <MouseTracker render={({ x, y }) => <p>Mouse: {x}, {y}</p>} />
      <Select value="a" onChange={(v) => console.log(v)}>
        <Select.Option value="a">Option A</Select.Option>
        <Select.Option value="b">Option B</Select.Option>
      </Select>
    </div>
  );
}

console.log("Advanced patterns siap digunakan");`,
    objectivesId: [
      'Higher-Order Component (HOC): function yang menerima component',
      'Render Props: component dengan prop function untuk render',
      'Compound Components: komponen yang bekerja bersama',
      'Kapan pakai pattern ini vs custom hooks',
      'Composition over inheritance di React',
    ],
    objectivesEn: [
      'Higher-Order Component (HOC): function receiving a component',
      'Render Props: component with function prop for rendering',
      'Compound Components: components working together',
      'When to use these patterns vs custom hooks',
      'Composition over inheritance in React',
    ],
    explanationId: '### HOC\nFunction(Component) → Component baru dengan extra behavior.\n\n### Render Props\nComponent menerima function sebagai prop: render={data => <UI />}.\n\n### Compound Components\n<Select><Select.Option /></Select>. Children berbagi state implisit.\n\n### Modern Alternative\nCustom hooks sering menggantikan HOC dan Render Props.',
    explanationEn: '### HOC\nFunction(Component) → enhanced component.\n\n### Render Props\nComponent receives render function as prop.\n\n### Compound Components\nComponents sharing implicit state.\n\n### Modern Alternative\nCustom hooks often replace HOC and Render Props.',
    experimentsId: [
      'Buat HOC dengan logging',
      'Buat Toggle component dengan render props',
      'Implementasikan compound Tabs component',
      'Refactor HOC ke custom hook',
    ],
    experimentsEn: [
      'Create HOC with logging',
      'Create Toggle component with render props',
      'Implement compound Tabs component',
      'Refactor HOC to custom hook',
    ],
    challengeId: 'Buat Modal component dengan compound pattern: Modal, Modal.Header, Modal.Body, Modal.Footer. Gunakan createContext untuk state sharing.',
    challengeEn: 'Build Modal component with compound pattern: Modal, Modal.Header, Modal.Body, Modal.Footer. Use createContext for state sharing.',
    summaryId: 'Minggu 9 dari 12: **Advanced Patterns** (Level: Lanjutan). Reusable component patterns. Minggu depan: **Testing**.',
    summaryEn: 'Week 9 of 12: **Advanced Patterns** (Level: Advanced). Reusable component patterns. Next week: **Testing**.',
  },
  {
    week: 10, level: 'advanced', topicId: 'testing',
    titleId: 'Testing React', titleEn: 'Testing React',
    programId: 'Unit & Integration Test', programEn: 'Unit & Integration Test',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'jsx',
    code: `// Testing React: Jest + React Testing Library
// Philosophy: test behavior, not implementation

import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";

// ── Component to Test ──
function Counter({ initial = 0 }) {
  const [count, setCount] = useState(initial);
  return (
    <div>
      <p data-testid="count">Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

function Greeting({ name }) {
  if (!name) return <p>Hello, Guest!</p>;
  return <p>Hello, {name}!</p>;
}

// ── Tests ──
describe("Counter", () => {
  test("renders with initial value", () => {
    render(<Counter initial={5} />);
    expect(screen.getByTestId("count")).toHaveTextContent("Count: 5");
  });

  test("increments on click", () => {
    render(<Counter />);
    fireEvent.click(screen.getByText("Increment"));
    expect(screen.getByTestId("count")).toHaveTextContent("Count: 1");
  });
});

describe("Greeting", () => {
  test("renders guest when no name", () => {
    render(<Greeting />);
    expect(screen.getByText("Hello, Guest!")).toBeInTheDocument();
  });

  test("renders name when provided", () => {
    render(<Greeting name="Budi" />);
    expect(screen.getByText("Hello, Budi!")).toBeInTheDocument();
  });
});

console.log("Tests siap dijalankan dengan: npm test");`,
    objectivesId: [
      'React Testing Library: render, screen, fireEvent',
      'Test behavior, bukan implementation details',
      'getBy, queryBy, findBy — kapan pakai masing-masing',
      'Test user interaction: click, type, submit',
      'Async testing: waitFor, findBy untuk async operations',
    ],
    objectivesEn: [
      'React Testing Library: render, screen, fireEvent',
      'Test behavior, not implementation details',
      'getBy, queryBy, findBy — when to use each',
      'Test user interaction: click, type, submit',
      'Async testing: waitFor, findBy for async operations',
    ],
    explanationId: '### Philosophy\nTest dari perspektif user, bukan internal state.\n\n### Queries\n- getBy: element harus ada (throw jika tidak)\n- queryBy: element mungkin null\n- findBy: async, tunggu element muncul\n\n### User Events\nfireEvent.click(), fireEvent.change(), userEvent.type().\n\n### Best Practices\n- Test behavior, bukan state\n- Gunakan accessible queries (getByRole, getByLabelText)',
    explanationEn: '### Philosophy\nTest from user perspective, not internal state.\n\n### Queries\ngetBy (must exist), queryBy (maybe null), findBy (async).\n\n### User Events\nfireEvent for simulating user actions.\n\n### Best Practices\nTest behavior, use accessible queries.',
    experimentsId: [
      'Test form submission',
      'Test async data fetching',
      'Test custom hook dengan renderHook',
      'Test dengan mock API',
    ],
    experimentsEn: [
      'Test form submission',
      'Test async data fetching',
      'Test custom hook with renderHook',
      'Test with mock API',
    ],
    challengeId: 'Buat test suite untuk TodoApp: test add todo, toggle complete, delete todo, filter by status. Gunakan userEvent untuk simulasi.',
    challengeEn: 'Build test suite for TodoApp: test add todo, toggle complete, delete todo, filter by status. Use userEvent for simulation.',
    summaryId: 'Minggu 10 dari 12: **Testing React** (Level: Lanjutan). Kualitas kode terjamin. Minggu depan: **Performance Optimization**.',
    summaryEn: 'Week 10 of 12: **Testing React** (Level: Advanced). Code quality assured. Next week: **Performance Optimization**.',
  },
  {
    week: 11, level: 'advanced', topicId: 'performance',
    titleId: 'Performance Optimization', titleEn: 'Performance Optimization',
    programId: 'Memo & Code Splitting', programEn: 'Memo & Code Splitting',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'jsx',
    code: `// Performance: React.memo, useMemo, useCallback, lazy, Suspense
// Optimasi re-render dan bundle size

import { useState, useMemo, useCallback, memo, lazy, Suspense } from "react";

// ── React.memo: skip re-render jika props sama ──
const ExpensiveList = memo(function ExpensiveList({ items }) {
  console.log("Rendering ExpensiveList");
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
});

// ── useMemo: cache expensive computation ──
function FilteredList({ items, query }) {
  const filtered = useMemo(() => {
    console.log("Filtering...");
    return items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);

  return <ExpensiveList items={filtered} />;
}

// ── useCallback: stable function reference ──
function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, name: "Belajar React", done: false },
    { id: 2, name: "Buat Proyek", done: false },
  ]);
  const [count, setCount] = useState(0);

  const addTodo = useCallback((name) => {
    setTodos((prev) => [...prev, { id: Date.now(), name, done: false }]);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <FilteredList items={todos} query="" />
    </div>
  );
}

// ── Code Splitting: lazy + Suspense ──
const HeavyComponent = lazy(() => import("./HeavyComponent"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <HeavyComponent />
    </Suspense>
  );
}

console.log("Performance optimizations siap digunakan");`,
    objectivesId: [
      'React.memo: skip re-render jika props tidak berubah',
      'useMemo: cache hasil computation expensive',
      'useCallback: stabilkan function reference untuk child',
      'React.lazy + Suspense: code splitting dan lazy loading',
      'Kapan optimize vs premature optimization',
    ],
    objectivesEn: [
      'React.memo: skip re-render if props unchanged',
      'useMemo: cache expensive computation results',
      'useCallback: stabilize function reference for children',
      'React.lazy + Suspense: code splitting and lazy loading',
      'When to optimize vs premature optimization',
    ],
    explanationId: '### React.memo\nHOC yang shallow compare props. Skip re-render jika sama.\n\n### useMemo\nCache hasil function. Re-compute saat dependency berubah.\n\n### useCallback\nStabilkan reference function. Penting untuk memo child.\n\n### Code Splitting\nlazy() + Suspense = load component saat dibutuhkan. Kurangi initial bundle.\n\n### Kapan Optimize\n- List besar\n- Computation expensive\n- Child sering re-render tidak perlu',
    explanationEn: '### React.memo\nShallow compare props, skip re-render.\n\n### useMemo\nCache computation results.\n\n### useCallback\nStabilize function references.\n\n### Code Splitting\nlazy + Suspense for on-demand loading.\n\n### When Optimize\nLarge lists, expensive computation, unnecessary re-renders.',
    experimentsId: [
      'Bandingkan re-render dengan dan tanpa memo',
      'Buat list 1000 item dengan useMemo filter',
      'Implementasikan virtualized list',
      'Analisis bundle dengan webpack-bundle-analyzer',
    ],
    experimentsEn: [
      'Compare re-renders with and without memo',
      'Create 1000-item list with useMemo filter',
      'Implement virtualized list',
      'Analyze bundle with webpack-bundle-analyzer',
    ],
    challengeId: 'Optimisasi aplikasi e-commerce: memo untuk product list, useMemo untuk filter/sort, useCallback untuk event handlers, lazy untuk halaman detail.',
    challengeEn: 'Optimize e-commerce app: memo for product list, useMemo for filter/sort, useCallback for event handlers, lazy for detail page.',
    summaryId: 'Minggu 11 dari 12: **Performance Optimization** (Level: Lanjutan). Aplikasi cepat dan efisien. Minggu depan: **Capstone Project**!',
    summaryEn: 'Week 11 of 12: **Performance Optimization** (Level: Advanced). Fast and efficient apps. Next week: **Capstone Project**!',
  },
  {
    week: 12, level: 'advanced', topicId: 'capstone',
    titleId: 'Capstone: E-Commerce App', titleEn: 'Capstone: E-Commerce App',
    programId: 'Toko Online', programEn: 'Online Store',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'jsx',
    code: `// Capstone: E-Commerce App
// Menggabungkan semua konsep: routing, context, hooks, performance

import { useState, useReducer, createContext, useContext, useMemo } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// ── Types ──
// Product: { id, name, price, image, category }
// CartItem: { product, quantity }

// ── Cart Context ──
const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find((i) => i.product.id === action.payload.id);
      if (existing) {
        return state.map((i) =>
          i.product.id === action.payload.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...state, { product: action.payload, quantity: 1 }];
    }
    case "REMOVE_ITEM":
      return state.filter((i) => i.product.id !== action.payload);
    case "TOTAL":
      return state.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    default:
      return state;
  }
}

function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items]
  );
  return (
    <CartContext.Provider value={{ items, dispatch, total }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}

// ── Components ──
function ProductCard({ product }) {
  const { dispatch } = useCart();
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Rp {product.price.toLocaleString("id-ID")}</p>
      <button onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}>
        Tambah ke Keranjang
      </button>
    </div>
  );
}

function Cart() {
  const { items, dispatch, total } = useCart();
  return (
    <div>
      <h2>Keranjang ({items.length})</h2>
      {items.map((item) => (
        <div key={item.product.id}>
          <span>{item.product.name} x{item.quantity}</span>
          <button onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.product.id })}>
            Hapus
          </button>
        </div>
      ))}
      <p>Total: Rp {total.toLocaleString("id-ID")}</p>
    </div>
  );
}

function Home() {
  const products = [
    { id: 1, name: "Laptop", price: 15000000, category: "Elektronik" },
    { id: 2, name: "Buku", price: 85000, category: "Edukasi" },
    { id: 3, name: "Mouse", price: 250000, category: "Elektronik" },
  ];
  return (
    <div>
      <h1>Tryngo Store</h1>
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <nav>
          <Link to="/">Beranda</Link>
          <Link to="/cart">Keranjang</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

console.log("E-Commerce App siap digunakan!");`,
    objectivesId: [
      'Menggabungkan routing, context, reducer, hooks dalam satu proyek',
      'E-commerce domain: product list, cart, checkout flow',
      'State management: useReducer + Context untuk cart',
      'Performance: useMemo untuk total calculation',
      'Component composition: reusable ProductCard, Cart',
    ],
    objectivesEn: [
      'Combine routing, context, reducer, hooks in one project',
      'E-commerce domain: product list, cart, checkout flow',
      'State management: useReducer + Context for cart',
      'Performance: useMemo for total calculation',
      'Component composition: reusable ProductCard, Cart',
    ],
    explanationId: '### Architecture\nRouting → Context → Reducer → Components.\n\n### Cart Flow\nAdd item → update reducer → total auto-update (useMemo).\n\n### Component Design\nProductCard reusable. Cart consume context.\n\n### Best Practices\n- Separation of concerns\n- Reusable components\n- Performance optimization',
    explanationEn: '### Architecture\nRouting → Context → Reducer → Components.\n\n### Cart Flow\nAdd item → update reducer → total auto-updates.\n\n### Component Design\nReusable ProductCard, Cart consumes context.\n\n### Best Practices\nSeparation of concerns, reusable components, performance.',
    experimentsId: [
      'Tambah halaman checkout',
      'Implementasikan wishlist',
      'Tambah filter dan search',
      'Buat test suite untuk cart reducer',
    ],
    experimentsEn: [
      'Add checkout page',
      'Implement wishlist',
      'Add filter and search',
      'Build test suite for cart reducer',
    ],
    challengeId: 'Buat e-commerce app lengkap: product catalog, cart, checkout, order history. Gunakan semua konsep React yang sudah dipelajari.',
    challengeEn: 'Build a complete e-commerce app: product catalog, cart, checkout, order history. Use all React concepts learned.',
    summaryId: 'Minggu 12 dari 12: **Capstone: E-Commerce App** (Level: Lanjutan). Selesai! 🎉 Anda sudah menguasai React dari nol hingga production-ready.',
    summaryEn: 'Week 12 of 12: **Capstone: E-Commerce App** (Level: Advanced). Complete! 🎉 You\'ve mastered React from scratch to production-ready.',
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
