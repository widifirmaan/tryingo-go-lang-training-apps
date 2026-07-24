export interface WeekMaterial {
  trackId: string;
  weekTitle: string;
  objectives: string[];
  topics: { title: string; desc: string }[];
  codeExample: string;
  exercise: string;
  summary: string;
}

export const BEGINNER_WEEK_1: Record<string, WeekMaterial> = {
  'tryngo-lang-html5': {
    trackId: 'tryngo-lang-html5',
    weekTitle: 'Beginner Week 1: HTML5 Semantic Structure',
    objectives: [
      'Memahami struktur dasar dokumen HTML5',
      'Menguasai elemen semantik (header, main, section, article, footer)',
      'Mampu membuat form dengan validasi HTML5 bawaan',
      'Memahami konsep accessibility (ARIA landmarks)',
    ],
    topics: [
      { title: 'DOCTYPE & Meta Charset', desc: 'Deklarasi DOCTYPE html, charset UTF-8, dan viewport meta tag untuk responsive design.' },
      { title: 'Semantic Elements', desc: 'Penggunaan header, nav, main, section, article, aside, footer untuk struktur halaman yang bermakna.' },
      { title: 'Form & Input Types', desc: 'Input type text, email, number, date, range, pattern validation dengan atribut required, minlength, pattern.' },
      { title: 'Accessibility (A11y)', desc: 'ARIA roles, alt text pada gambar, label pada form, dan semantic heading hierarchy.' },
      { title: 'Multimedia Elements', desc: 'Tag video, audio, iframe, dan picture element dengan fallback untuk berbagai resolusi.' },
    ],
    codeExample: `<form>
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required
         placeholder="user@domain.com">
  <label for="age">Age (18-99):</label>
  <input type="number" id="age" name="age"
         min="18" max="99" required>
  <button type="submit">Submit</button>
</form>`,

    exercise: 'Buat halaman profil pribadi dengan semantic HTML5. Sertakan header dengan nama, section tentang saya, article daftar skill, footer dengan kontak. Pastikan semua form input memiliki validasi bawaan HTML5.',
    summary: 'HTML5 semantic elements memberikan struktur bermakna pada halaman web, meningkatkan SEO, accessibility, dan maintainability kode.',
  },

  'tryngo-lang-css3': {
    trackId: 'tryngo-lang-css3',
    weekTitle: 'Beginner Week 1: CSS Layout & Tailwind Fundamentals',
    objectives: [
      'Menguasai Flexbox dan Grid layout',
      'Memahami utility-first CSS dengan Tailwind',
      'Mampu membuat animasi dan transisi CSS',
      'Mendesain UI responsif dengan breakpoints',
    ],
    topics: [
      { title: 'Flexbox Layout', desc: 'Display flex, justify-content, align-items, flex-wrap, gap untuk layout 1 dimensi.' },
      { title: 'CSS Grid', desc: 'Grid template columns/rows, gap, grid-column/row span untuk layout 2 dimensi.' },
      { title: 'Utility-First Approach', desc: 'Konsep utility classes Tailwind: padding, margin, warna, typography tanpa custom CSS.' },
      { title: 'Animasi & Transisi', desc: 'Transition property, keyframe animation, transform (scale, rotate, translate) untuk interaksi halus.' },
      { title: 'Responsive Design', desc: 'Media queries, mobile-first approach, breakpoints sm/md/lg/xl, container queries.' },
    ],
    codeExample: `.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
.card { transition: transform 0.3s ease; }
.card:hover { transform: translateY(-4px); }`,

    exercise: 'Buat gallery card 3 kolom dengan Grid, setiap card memiliki image, title, deskripsi, dan tombol. Tambahkan hover animation scale. Gunakan Tailwind utility classes untuk styling.',
    summary: 'Kombinasi Flexbox/Grid untuk layout ditambah utility-first Tailwind mempercepat pengembangan UI yang konsisten dan responsif.',
  },

  'tryngo-lang-javascript': {
    trackId: 'tryngo-lang-javascript',
    weekTitle: 'Beginner Week 1: JS Fundamentals & DOM',
    objectives: [
      'Menguasai variabel, tipe data, dan fungsi ES6+',
      'Memahami DOM manipulation dan event handling',
      'Mampu menggunakan Promise dan async/await',
      'Mengerti ES modules dan import/export',
    ],
    topics: [
      { title: 'Variables & Scoping', desc: 'let, const, var perbedaan, block scoping, temporal dead zone, hoisting.' },
      { title: 'Arrow Functions & Template Literals', desc: 'Arrow function syntax, implicit return, template strings dengan ${} interpolation.' },
      { title: 'DOM Manipulation', desc: 'querySelector, createElement, textContent, classList, appendChild untuk manipulasi elemen.' },
      { title: 'Event Handling', desc: 'addEventListener, event delegation, event object, preventDefault, stopPropagation.' },
      { title: 'Async JavaScript', desc: 'Promise chaining, async/await syntax, try/catch error handling, fetch API.' },
    ],
    codeExample: `const form = document.querySelector('#login-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  try {
    const res = await fetch('/api/login', {
      method: 'POST', body: JSON.stringify(Object.fromEntries(data))
    });
    const user = await res.json();
    console.log('Welcome:', user.name);
  } catch (err) {
    console.error('Login failed:', err);
  }
});`,

    exercise: 'Buat to-do list app dengan DOM: input field, tombol add, daftar item. Setiap item bisa di-check (strikethrough) dan dihapus. Simpan state dengan array dan render ulang setiap perubahan.',
    summary: 'JavaScript ES6+ memberikan alat modern (arrow function, Promise, async/await, modules) untuk membangun aplikasi web interaktif.',
  },

  'tryngo-lang-typescript': {
    trackId: 'tryngo-lang-typescript',
    weekTitle: 'Beginner Week 1: Type System & Interfaces',
    objectives: [
      'Memahami type annotation dan inference',
      'Menguasai interface, type alias, dan generics',
      'Mampu menggunakan union, intersection, dan enum',
      'Mengerti type narrowing dan type guards',
    ],
    topics: [
      { title: 'Type Annotations', desc: 'Type inference, explicit types, primitive types, array, tuple, any, unknown, never.' },
      { title: 'Interface & Type Alias', desc: 'Interface declaration, optional properties, readonly, extends, intersection types (&).' },
      { title: 'Generics', desc: 'Generic functions, constraints (extends), generic interface, utility types (Partial, Pick, Omit).' },
      { title: 'Union & Narrowing', desc: 'Union types, typeof/instanceof guards, discriminated unions, exhaustiveness checking.' },
      { title: 'Enums & Literal Types', desc: 'Numeric/string enum, const enum, literal types, template literal types, satisfies keyword.' },
    ],
    codeExample: `interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

async function fetchUser<T>(endpoint: string): Promise<T> {
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error('Request failed');
  return res.json();
}

const user = await fetchUser<User>('/api/user/1');`,

    exercise: 'Buat sistem tipe untuk e-commerce cart: interface Product, CartItem (qty + product), interface Cart (items + total). Implementasikan generic function untuk menghitung total harga.',
    summary: 'TypeScript memberikan safety melalui static type checking, meningkatkan developer experience dan mengurangi runtime errors.',
  },

  'tryngo-lang-golang': {
    trackId: 'tryngo-lang-golang',
    weekTitle: 'Beginner Week 1: Go Fundamentals & Concurrency',
    objectives: [
      'Memahami struct, interface, dan pointer di Go',
      'Menguasai goroutine dan channel dasar',
      'Mampu membuat REST API sederhana dengan net/http',
      'Mengerti error handling dan testing di Go',
    ],
    topics: [
      { title: 'Struct & Methods', desc: 'Struct definition, value/receiver methods, pointer receiver, struct embedding, tags.' },
      { title: 'Interfaces', desc: 'Interface definition, implicit implementation, empty interface, type assertion, type switch.' },
      { title: 'Goroutines', desc: 'go keyword, sync.WaitGroup, channel unbuffered/buffered, select statement, fan-in/fan-out.' },
      { title: 'Error Handling', desc: 'error interface, sentinel errors, custom error types, errors.Is/As, panic/recover.' },
      { title: 'HTTP Server', desc: 'net/http package, HandleFunc, ServeMux, middleware pattern, JSON encoding/decoding, struct tags.' },
    ],
    codeExample: `type Product struct {
  ID    int     \`json:"id"\`
  Name  string  \`json:"name"\`
  Price float64 \`json:"price"\`
}

func getProducts(w http.ResponseWriter, r *http.Request) {
  products := []Product{{1, "Laptop", 1500.00}}
  json.NewEncoder(w).Encode(products)
}

func main() {
  http.HandleFunc("/api/products", getProducts)
  log.Fatal(http.ListenAndServe(":8080", nil))
}`,

    exercise: 'Buat REST API sederhana dengan endpoint GET /tasks dan POST /tasks. Simpan data di slice in-memory. Gunakan struct untuk Task dengan fields: ID, Title, Completed.',
    summary: 'Go menggabungkan performa tinggi dengan sintaks sederhana, goroutine untuk concurrency, dan standard library yang kuat untuk backend service.',
  },

  'tryngo-lang-nextjs': {
    trackId: 'tryngo-lang-nextjs',
    weekTitle: 'Beginner Week 1: Next.js App Router & RSC',
    objectives: [
      'Memahami App Router dan file-based routing',
      'Menguasai Server Components (RSC) dan Client Components',
      'Mampu menggunakan Server Actions untuk form',
      'Mengerti SSR, SSG, dan ISR caching strategies',
    ],
    topics: [
      { title: 'App Router', desc: 'File-based routing, layout.tsx, page.tsx, loading.tsx, error.tsx, not-found.tsx, route groups.' },
      { title: 'Server Components', desc: 'Default RSC, async component fetching data, Client component boundary dengan "use client".' },
      { title: 'Server Actions', desc: '"use server" directive, form action, revalidatePath, useActionState, progressive enhancement.' },
      { title: 'Data Fetching', desc: 'fetch with cache/next.revalidate, generateStaticParams, dynamic routes, parallel data fetching.' },
      { title: 'Metadata & SEO', desc: 'generateMetadata, metadata object, Open Graph tags, sitemap.ts, robots.ts.' },
    ],
    codeExample: `// app/products/page.tsx - Server Component
export default async function ProductsPage() {
  const products = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 }
  }).then(res => res.json());

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}`,

    exercise: 'Buat blog sederhana dengan App Router: halaman home (list posts), halaman detail [slug], loading state, dan error boundary. Gunakan RSC untuk fetching data.',
    summary: 'Next.js App Router dengan React Server Components memberikan performa tinggi, SEO optimal, dan developer experience modern untuk fullstack apps.',
  },

  'tryngo-lang-python': {
    trackId: 'tryngo-lang-python',
    weekTitle: 'Beginner Week 1: Python Fundamentals & Pandas',
    objectives: [
      'Menguasai tipe data, list comprehension, dan function',
      'Memahami Pandas Series dan DataFrame',
      'Mampu melakukan data cleaning dan filtering',
      'Mengerti integrasi dasar dengan Gemini SDK',
    ],
    topics: [
      { title: 'Python Essentials', desc: 'List, tuple, dict, set, list comprehension, lambda, generator, decorator dasar.' },
      { title: 'Pandas Series & DataFrame', desc: 'Membuat DataFrame dari dict/CSV, head/info/describe, indexing dengan loc/iloc.' },
      { title: 'Data Cleaning', desc: 'Handling missing values (dropna, fillna), duplicate removal, type conversion, string operations.' },
      { title: 'Filtering & Grouping', desc: 'Boolean filtering, query method, groupby aggregation, pivot table, merge/join.' },
      { title: 'Gemini SDK Intro', desc: 'Install google-generativeai, API key setup, text generation, chat session, streaming response.' },
    ],
    codeExample: `import pandas as pd

df = pd.read_csv('sales.csv')
# Clean: drop duplicates, fill missing
df = df.drop_duplicates()
df['amount'] = df['amount'].fillna(0)

# Analysis by category
summary = df.groupby('category').agg(
  total_sales=('amount', 'sum'),
  avg_price=('amount', 'mean'),
  count=('id', 'count')
).reset_index()
print(summary)`,

    exercise: 'Download dataset CSV sederhana (atau buat manual), lakukan cleaning (hapus duplikat, isi missing values), lalu buat summary groupby untuk analisis kategori. Tampilkan hasil dalam bentuk chart sederhana.',
    summary: 'Python dengan Pandas memungkinkan data analysis yang efisien, dikombinasikan dengan Gemini SDK untuk integrasi AI capabilities.',
  },

  'tryngo-lang-react': {
    trackId: 'tryngo-lang-react',
    weekTitle: 'Beginner Week 1: React 19 Hooks & Components',
    objectives: [
      'Memahami komponen function dan JSX',
      'Menguasai useState, useEffect, useCallback, useMemo',
      'Mampu menggunakan use() hook dan Actions',
      'Mengerti Virtual DOM dan reconcilation',
    ],
    topics: [
      { title: 'Components & Props', desc: 'Function component, props destructuring, children, default props, Component typing dengan TypeScript.' },
      { title: 'State & Lifecycle', desc: 'useState, lazy initialization, functional update, useEffect dependencies, cleanup function.' },
      { title: 'Performance Hooks', desc: 'useCallback untuk referential equality, useMemo untuk expensive computation, React.memo HOC.' },
      { title: 'React 19 Actions', desc: 'useActionState, form action prop, useOptimistic, useTransition for pending states.' },
      { title: 'Context & Composition', desc: 'createContext, useContext, Context.Provider, component composition vs context, slots pattern.' },
    ],
    codeExample: `function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = useCallback(() => {
    setTodos(prev => [...prev, {
      id: crypto.randomUUID(),
      text: input,
      done: false
    }]);
    setInput('');
  }, [input]);

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
      </ul>
    </div>
  );
}`,

    exercise: 'Buat komponen counter dengan useState, timer dengan useEffect (cleanup penting!), dan form controlled component. Gunakan useCallback untuk optimization.',
    summary: 'React 19 memperkenalkan Actions dan use() hook, membangun di atas arsitektur komponen yang stabil dengan Virtual DOM untuk UI reaktif.',
  },

  'tryngo-lang-vue': {
    trackId: 'tryngo-lang-vue',
    weekTitle: 'Beginner Week 1: Vue 3 Composition API',
    objectives: [
      'Memahami Composition API (ref, reactive, computed)',
      'Menguasai component props dan emit',
      'Mampu menggunakan Vue Router untuk navigasi',
      'Mengerti state management dengan Pinia',
    ],
    topics: [
      { title: 'Composition API', desc: 'ref untuk primitives, reactive untuk objects, computed, watch, watchEffect, lifecycle hooks (onMounted).' },
      { title: 'Props & Emits', desc: 'defineProps dengan TypeScript, defineEmits, v-model komponen, fallthrough attributes.' },
      { title: 'Slots & Provide/Inject', desc: 'Named slots, scoped slots, provide/inject untuk dependency injection tanpa props drilling.' },
      { title: 'Vue Router', desc: 'createRouter, createWebHistory, route params, nested routes, navigation guards, lazy loading.' },
      { title: 'Pinia State', desc: 'defineStore, setup syntax store, actions, getters, persist plugin, devtools integration.' },
    ],
    codeExample: `<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
const items = ref<string[]>([])

function addItem(text: string) {
  items.value.push(text)
}
</script>

<template>
  <button @click="count++">Count: {{ count }}</button>
  <p>Doubled: {{ doubled }}</p>
  <input @keyup.enter="addItem(($event.target as HTMLInputElement).value)" />
</template>`,

    exercise: 'Buat komponen todo list dengan Composition API: ref untuk list, computed untuk active/completed count, watch untuk localStorage persist. Tambahkan props untuk filter category.',
    summary: 'Vue 3 Composition API memberikan fleksibilitas kode yang lebih baik dibandingkan Options API, dengan TypeScript support yang matang.',
  },

  'tryngo-lang-rust': {
    trackId: 'tryngo-lang-rust',
    weekTitle: 'Beginner Week 1: Rust Ownership & Borrowing',
    objectives: [
      'Memahami ownership, borrowing, dan lifetimes',
      'Menguasai struct, enum, dan pattern matching',
      'Mampu menggunakan Result dan Option untuk error handling',
      'Mengerti trait dan generic programming',
    ],
    topics: [
      { title: 'Ownership Rules', desc: 'Each value has one owner, ownership transfer (move), clone untuk deep copy, Copy trait untuk stack-only types.' },
      { title: 'Borrowing & References', desc: 'Immutable ref (&T), mutable ref (&mut T), borrowing rules, dangling references prevention, slice type.' },
      { title: 'Struct & Enum', desc: 'Struct definition, tuple struct, unit struct, enum with variants, Option<T>, Result<T, E>, match expression.' },
      { title: 'Traits & Generics', desc: 'Trait definition, trait bounds, impl Trait, generic functions, associated types, derive macros.' },
      { title: 'Error Handling', desc: 'panic!, Result type, ? operator, unwrap/expect, custom error types with thiserror/anyhow.' },
    ],
    codeExample: `#[derive(Debug)]
struct Task {
    id: u32,
    title: String,
    completed: bool,
}

impl Task {
    fn new(id: u32, title: &str) -> Self {
        Self { id, title: title.to_string(), completed: false }
    }

    fn toggle(&mut self) {
        self.completed = !self.completed;
    }
}

fn main() {
    let mut task = Task::new(1, "Learn Rust");
    task.toggle();
    println!("{:?}", task);
}`,

    exercise: 'Buat program CLI task manager dengan struct Task, implementasi method new, toggle, dan display. Gunakan Vec<Task> sebagai penyimpanan dan loop untuk interaksi user.',
    summary: 'Rust menggabungkan memory safety tanpa GC dengan performa native, melalui ownership model yang ketat dan trait-based generics.',
  },

  'tryngo-lang-docker': {
    trackId: 'tryngo-lang-docker',
    weekTitle: 'Beginner Week 1: Docker Containers & Images',
    objectives: [
      'Memahami konsep container vs virtual machine',
      'Menguasai Dockerfile dan image building',
      'Mampu menggunakan Docker Compose untuk multi-service',
      'Mengerti volume, network, dan environment variables',
    ],
    topics: [
      { title: 'Docker Fundamentals', desc: 'Container vs VM, image layers, Docker daemon, registry (Docker Hub), pull/push/run commands.' },
      { title: 'Dockerfile', desc: 'FROM, RUN, COPY, ADD, CMD, ENTRYPOINT, WORKDIR, EXPOSE, multi-stage build untuk production image.' },
      { title: 'Volumes & Networks', desc: 'Bind mount vs volume, docker network (bridge, host, overlay), port mapping -p, environment variables.' },
      { title: 'Docker Compose', desc: 'docker-compose.yml, services, depends_on, volumes, networks, environment, healthcheck.' },
      { title: 'CI/CD Integration', desc: 'Docker in CI pipeline, image tagging (latest, commit SHA), registry authentication, security scanning.' },
    ],
    codeExample: `# Multi-stage Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`,

    exercise: 'Buat Dockerfile untuk aplikasi Node.js sederhana (multi-stage: build dengan node:alpine, serve dengan nginx). Buat docker-compose.yml yang menjalankan app + Redis untuk caching.',
    summary: 'Docker containerization memastikan lingkungan konsisten dari development hingga production, memudahkan scaling dan deployment.',
  },

  'tryngo-lang-nodejs': {
    trackId: 'tryngo-lang-nodejs',
    weekTitle: 'Beginner Week 1: Node.js & Express API',
    objectives: [
      'Memahami event loop dan non-blocking I/O',
      'Menguasai Express routing dan middleware',
      'Mampu membuat REST API dengan JWT auth',
      'Mengerti database integration dengan Prisma/TypeORM',
    ],
    topics: [
      { title: 'Event Loop & Modules', desc: 'Event loop phases, CommonJS vs ESM, process object, Buffer, Stream, path, fs module.' },
      { title: 'Express Routing', desc: 'Router, route params, query string, body parsing (JSON, urlencoded), response methods (json, send, status).' },
      { title: 'Middleware Pattern', desc: 'Application-level middleware, error handling middleware, cors, helmet, morgan, rate limiting.' },
      { title: 'JWT Authentication', desc: 'jsonwebtoken library, sign/verify, access token + refresh token, middleware auth guard, bcrypt password hashing.' },
      { title: 'Database with Prisma', desc: 'Schema definition, migrations, CRUD operations, relations (1:1, 1:N, N:M), pagination, filtering.' },
    ],
    codeExample: `const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch { res.status(403).json({ error: 'Invalid token' }); }
};

app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

app.listen(3000);`,

    exercise: 'Buat REST API dengan Express: endpoints GET /todos, POST /todos, PUT /todos/:id, DELETE /todos/:id. Tambahkan JWT auth untuk protected routes. Simpan data di array in-memory dulu.',
    summary: 'Node.js event-driven non-blocking I/O membuatnya ideal untuk aplikasi real-time dan REST API dengan throughput tinggi.',
  },

  'tryngo-lang-angular': {
    trackId: 'tryngo-lang-angular',
    weekTitle: 'Beginner Week 1: Angular 17+ Components & Signals',
    objectives: [
      'Memahami standalone components dan project structure',
      'Menguasai Signals untuk reactive state',
      'Mampu menggunakan dependency injection',
      'Mengerti RxJS Observables dasar',
    ],
    topics: [
      { title: 'Standalone Components', desc: 'Standalone bootstrap, component decorator, imports array, control flow (@if, @for, @switch).' },
      { title: 'Signals', desc: 'signal(), computed(), effect(), input(), output(), model() untuk two-way binding tanpa RxJS.' },
      { title: 'Dependency Injection', desc: 'Injectable services, providedIn root/component, @Optional, @Host, injection token, factory provider.' },
      { title: 'RxJS Basics', desc: 'Observable, of, from, map, filter, tap, switchMap, debounceTime, Subject, BehaviorSubject, async pipe.' },
      { title: 'Routing & Lazy Loading', desc: 'RouterModule, loadComponent, lazy loading standalone components, route guards (canActivate, canMatch).' },
    ],
    codeExample: `import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <button (click)="decrement()">-</button>
    <span>{{ count() }}</span>
    <button (click)="increment()">+</button>
    <p>Double: {{ double() }}</p>
  \`
})
export class CounterComponent {
  count = signal(0);
  double = computed(() => this.count() * 2);

  increment() { this.count.update(c => c + 1); }
  decrement() { this.count.update(c => c - 1); }
}`,

    exercise: 'Buat komponen todo list standalone dengan signal() untuk data, computed() untuk filter (active/completed), effect() untuk localStorage. Gunakan @for untuk rendering list.',
    summary: 'Angular 17+ dengan standalone components dan Signals memberikan pengalaman development yang lebih sederhana tanpa module boilerplate.',
  },

  'tryngo-lang-svelte': {
    trackId: 'tryngo-lang-svelte',
    weekTitle: 'Beginner Week 1: Svelte 5 Runes & Reactivity',
    objectives: [
      'Memahami Svelte 5 runes ($state, $derived, $effect)',
      'Menguasai component props dan event forwarding',
      'Mampu menggunakan SvelteKit routing dan load functions',
      'Mengerti stores untuk state global',
    ],
    topics: [
      { title: 'Runes Reactivity', desc: '$state, $derived, $effect, $props, $bindable untuk reactive state tanpa Virtual DOM.' },
      { title: 'Component Composition', desc: 'Props dengan $props(), event forwarding, snippet/blocks untuk slot pattern, context API.' },
      { title: 'SvelteKit Routing', desc: 'File-based routing, +page.svelte, +layout.svelte, +server.ts, page parameters, load function.' },
      { title: 'Server Load Functions', desc: 'load function, page.data, universal vs server load, fetch in load, invalidateAll.' },
      { title: 'Form Actions', desc: 'Action, use:enhance, named actions, progressive enhancement, form validation with superforms.' },
    ],
    codeExample: `<script lang="ts">
  let count = $state(0);
  let doubled = $derived(count * 2);
  let name = $state('Svelte');

  function reset() {
    count = 0;
    name = 'Svelte';
  }
</script>

<h1>Hello {name}!</h1>
<button onclick={() => count++}>Clicked {count} times</button>
<p>Doubled: {doubled}</p>
<button onclick={reset}>Reset</button>`,

    exercise: 'Buat counter app dengan $state, $derived untuk computed value, dan $effect untuk sync ke localStorage. Tambahkan tombol increment, decrement, reset.',
    summary: 'Svelte 5 dengan runes menghilangkan Virtual DOM overhead, memberikan reaktivitas fine-grained dengan syntax yang minimal dan intuitif.',
  },

  'tryngo-lang-php': {
    trackId: 'tryngo-lang-php',
    weekTitle: 'Beginner Week 1: PHP 8.3 OOP & Enums',
    objectives: [
      'Memahami OOP di PHP (class, inheritance, interface)',
      'Menguasai PHP 8 features (enum, match expression, attributes)',
      'Mampu menggunakan PDO untuk database',
      'Mengerti JIT compiler dan performance',
    ],
    topics: [
      { title: 'OOP Fundamentals', desc: 'Class, constructor property promotion, readonly properties, inheritance, abstract class, interface, trait.' },
      { title: 'PHP 8 Features', desc: 'Match expression, named arguments, nullsafe operator (?->), enum with methods, readonly class.' },
      { title: 'Attributes', desc: 'Native attributes, custom attributes, reflection API, attribute reader untuk metadata.' },
      { title: 'PDO Database', desc: 'PDO connection, prepared statements, bindValue, transactions, fetch modes, error handling dengan exception.' },
      { title: 'JIT Compiler', desc: 'OPcache, JIT configuration (tracing/function), performance benchmark, when to enable JIT.' },
    ],
    codeExample: `enum Status: string {
  case Pending = 'pending';
  case Completed = 'completed';
  case Archived = 'archived';

  public function label(): string {
    return match($this) {
      self::Pending => 'Menunggu',
      self::Completed => 'Selesai',
      self::Archived => 'Diarsipkan',
    };
  }
}

class Task {
  public function __construct(
    public readonly int $id,
    public string $title,
    public Status $status = Status::Pending,
  ) {}
}`,

    exercise: 'Buat class Task dengan enum Status, constructor property promotion. Implementasikan PDO CRUD sederhana: create table tasks, insert, select all, update status. Gunakan prepared statements.',
    summary: 'PHP 8.3 menghadirkan fitur modern (enum, attributes, match, JIT) yang membuatnya powerful untuk web development dengan performa meningkat.',
  },

  'tryngo-lang-laravel': {
    trackId: 'tryngo-lang-laravel',
    weekTitle: 'Beginner Week 1: Laravel 11 MVC & Eloquent',
    objectives: [
      'Memahami MVC architecture Laravel',
      'Menguasai Eloquent ORM dan relationships',
      'Mampu menggunakan Blade templating dan components',
      'Mengerti Artisan CLI dan migrations',
    ],
    topics: [
      { title: 'Laravel MVC Structure', desc: 'Directory structure, routes (web/api), controllers (invoke, resource), request lifecycle, service container.' },
      { title: 'Eloquent ORM', desc: 'Model definition, migrations, CRUD operations, query scopes, accessors/mutators, casting.' },
      { title: 'Relationships', desc: 'HasMany, BelongsTo, BelongsToMany, HasManyThrough, eager loading (with), lazy eager loading.' },
      { title: 'Blade Components', desc: 'Blade templates, component class + view, anonymous components, slots, stacks, includes.' },
      { title: 'Artisan & Tinker', desc: 'make: commands, migrate, db:seed, tinker REPL, custom commands, schedule tasks.' },
    ],
    codeExample: `// Route
Route::resource('tasks', TaskController::class);

// Controller
class TaskController extends Controller
{
  public function index()
  {
    $tasks = Task::where('user_id', auth()->id())
      ->latest()
      ->paginate(10);
    return view('tasks.index', compact('tasks'));
  }
}

// Blade
@foreach($tasks as $task)
  <div class="task-card">
    <h3>{{ $task->title }}</h3>
    <span>{{ $task->status->label() }}</span>
  </div>
@endforeach`,

    exercise: 'Buat CRUD Task dengan Laravel: migration, model, resource controller, Blade views (index, create, edit, show). Tambahkan authentication scaffolding dengan Breeze.',
    summary: 'Laravel 11 menyediakan ekosistem lengkap untuk web development modern dengan Eloquent ORM, Blade templating, dan Artisan tooling.',
  },

  'tryngo-lang-rails': {
    trackId: 'tryngo-lang-rails',
    weekTitle: 'Beginner Week 1: Rails 7 MVC & Active Record',
    objectives: [
      'Memahami Convention over Configuration',
      'Menguasai Active Record ORM dan migrations',
      'Mampu menggunakan Hotwire (Turbo + Stimulus)',
      'Mengerti RESTful routing dan resourceful design',
    ],
    topics: [
      { title: 'Rails MVC Structure', desc: 'Directory convention, generate command, routes.rb, resourceful routing, namespaced controllers.' },
      { title: 'Active Record', desc: 'Model generation, migrations, CRUD operations, validations, callbacks, scopes, enum.' },
      { title: 'Associations', desc: 'belongs_to, has_many, has_many :through, polymorphic associations, counter_cache, dependent options.' },
      { title: 'Hotwire (Turbo + Stimulus)', desc: 'Turbo Drive, Turbo Frames, Turbo Streams, Stimulus controllers, Action Cable for real-time.' },
      { title: 'Action View Helpers', desc: 'Form helpers, link_to, partials, layout, content_for, view locals, collection rendering.' },
    ],
    codeExample: `# routes.rb
resources :tasks do
  member { patch :toggle }
end

# app/models/task.rb
class Task < ApplicationRecord
  belongs_to :user
  validates :title, presence: true
  enum :status, { pending: 0, completed: 1, archived: 2 }

  scope :active, -> { where(status: :pending) }
end

# app/controllers/tasks_controller.rb
class TasksController < ApplicationController
  def index
    @tasks = current_user.tasks.active
  end
end`,

    exercise: 'Generate scaffold Task dengan Rails (title, description, status enum). Tambahkan validasi, scope untuk filter, dan Turbo Frame untuk toggle status tanpa reload.',
    summary: 'Rails 7 dengan Hotwire memberikan pengalaman fullstack yang cepat dengan sedikit JavaScript, mengikuti Convention over Configuration.',
  },

  'tryngo-lang-postgresql': {
    trackId: 'tryngo-lang-postgresql',
    weekTitle: 'Beginner Week 1: PostgreSQL Queries & Indexing',
    objectives: [
      'Memahami SQL queries (SELECT, JOIN, GROUP BY)',
      'Menguasai indexing strategies dan query optimization',
      'Mampu menggunakan JSONB document querying',
      'Mengerti ACID transactions dan isolation levels',
    ],
    topics: [
      { title: 'SQL Fundamentals', desc: 'SELECT, WHERE, JOIN (INNER, LEFT, RIGHT, FULL), GROUP BY, HAVING, ORDER BY, LIMIT/OFFSET.' },
      { title: 'Indexing Strategies', desc: 'B-tree, Hash, GIN, GiST indexes, EXPLAIN ANALYZE, composite indexes, partial indexes, covering indexes.' },
      { title: 'JSONB Operations', desc: 'JSONB column type, @> containment, ->/->> access, jsonb_set, GIN index on JSONB, performance considerations.' },
      { title: 'Transactions & Locks', desc: 'BEGIN/COMMIT/ROLLBACK, isolation levels (READ COMMITTED, REPEATABLE READ, SERIALIZABLE), row-level locking (FOR UPDATE).' },
      { title: 'Window Functions', desc: 'ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, SUM/AVG OVER, PARTITION BY, frame specification (ROWS BETWEEN).' },
    ],
    codeExample: `-- Products with category average comparison
SELECT
  p.name,
  p.price,
  c.name AS category,
  AVG(p.price) OVER (PARTITION BY p.category_id) AS category_avg,
  p.price - AVG(p.price) OVER (PARTITION BY p.category_id) AS price_diff
FROM products p
JOIN categories c ON c.id = p.category_id
WHERE p.price > 100
ORDER BY price_diff DESC;

-- JSONB query example
SELECT * FROM events
WHERE metadata @> '{"source": "web", "priority": "high"}'::jsonb;`,

    exercise: 'Buat tabel products dengan JSONB metadata. Insert 20+ sample data. Buat query: JOIN dengan categories, GROUP BY untuk summary, window function untuk ranking harga per kategori. Analisis dengan EXPLAIN ANALYZE.',
    summary: 'PostgreSQL menawarkan relational database yang matang dengan fitur advanced seperti JSONB, window functions, full-text search, dan indexing yang powerful.',
  },

  'tryngo-lang-graphql': {
    trackId: 'tryngo-lang-graphql',
    weekTitle: 'Beginner Week 1: GraphQL Schema & Queries',
    objectives: [
      'Memahami Schema Definition Language (SDL)',
      'Menguasai Queries, Mutations, dan Subscriptions',
      'Mampu setup Apollo Server',
      'Mengerti resolver pattern dan DataLoader',
    ],
    topics: [
      { title: 'SDL (Schema Definition)', desc: 'Type definitions, scalar types, enum, input type, interface, union, directive, non-null (!), list [].' },
      { title: 'Queries & Resolvers', desc: 'Query type, field resolver, arguments, parent/args/context/info parameters, rootValue.' },
      { title: 'Mutations', desc: 'Mutation type, input types, return payload pattern, error handling with union/interface.' },
      { title: 'Subscriptions', desc: 'Subscription type, pub/sub pattern, async iterators, filter events, WebSocket transport.' },
      { title: 'DataLoader & N+1', desc: 'DataLoader pattern, batch function, cache per request, solving N+1 problem, join-monster alternative.' },
    ],
    codeExample: `type Product {
  id: ID!
  name: String!
  price: Float!
  category: Category!
  reviews: [Review!]!
}

type Query {
  products(category: ID, limit: Int): [Product!]!
  product(id: ID!): Product
}

type Mutation {
  createProduct(input: CreateProductInput!): ProductPayload!
}

input CreateProductInput {
  name: String!
  price: Float!
  categoryId: ID!
}

type ProductPayload {
  product: Product
  errors: [Error!]
}`,

    exercise: 'Buat GraphQL schema untuk blog: tipe Post, Author, Comment. Implementasikan queries (posts, post(id), author(id)), mutations (createPost, addComment), dan resolvers dengan data array in-memory.',
    summary: 'GraphQL memberikan fleksibilitas query yang efisien, mengurangi over/under-fetching data dengan schema yang self-documenting.',
  },

  'tryngo-lang-csharp': {
    trackId: 'tryngo-lang-csharp',
    weekTitle: 'Beginner Week 1: C# & .NET 8 Minimal APIs',
    objectives: [
      'Memahami C# OOP (class, record, interface)',
      'Menguasai Minimal APIs dan endpoint mapping',
      'Mampu menggunakan Entity Framework Core',
      'Mengerti LINQ queries dan Dependency Injection',
    ],
    topics: [
      { title: 'C# Modern Syntax', desc: 'record, record struct, init-only properties, primary constructors, pattern matching, switch expression.' },
      { title: 'Minimal APIs', desc: 'WebApplication.CreateBuilder, MapGet/Post/Put/Delete, route params, typed results, filters.' },
      { title: 'Entity Framework Core', desc: 'DbContext, DbSet, migration, relationship fluent API, LINQ queries, eager loading with Include.' },
      { title: 'LINQ (Language Integrated Query)', desc: 'Method syntax vs query syntax, Select, Where, GroupBy, Join, Aggregate, deferred execution.' },
      { title: 'Dependency Injection', desc: 'AddScoped/Transient/Singleton, service registration, constructor injection, keyed services, options pattern.' },
    ],
    codeExample: `var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddScoped<ITaskService, TaskService>();

var app = builder.Build();

app.MapGet("/api/tasks", async (ITaskService service) =>
    Results.Ok(await service.GetAllAsync()));

app.MapPost("/api/tasks", async (CreateTaskDto dto, ITaskService service) =>
{
    var task = await service.CreateAsync(dto);
    return Results.Created($"/api/tasks/{task.Id}", task);
});

app.Run();`,

    exercise: 'Buat Minimal API untuk task management dengan EF Core SQLite. Entities: Task (Id, Title, IsCompleted, CreatedAt). Implementasikan CRUD endpoints dengan Dependency Injection service layer.',
    summary: '.NET 8 Minimal APIs memberikan cara sederhana untuk membangun HTTP APIs dengan performa tinggi, EF Core untuk ORM, dan LINQ untuk query.',
  },

  'tryngo-lang-spring': {
    trackId: 'tryngo-lang-spring',
    weekTitle: 'Beginner Week 1: Spring Boot 3 & JPA',
    objectives: [
      'Memahami Spring MVC architecture',
      'Menguasai JPA/Hibernate ORM',
      'Mampu membuat REST API dengan Spring Boot',
      'Mengerti Spring Security JWT authentication',
    ],
    topics: [
      { title: 'Spring Boot Setup', desc: 'Spring Initializr, Maven/Gradle, application.yml, @SpringBootApplication, devtools, actuator.' },
      { title: 'JPA Entities & Repositories', desc: '@Entity, @Table, @Id, @GeneratedValue, JpaRepository, derived query methods, @Query, @Modifying.' },
      { title: 'REST Controllers', desc: '@RestController, @RequestMapping, @GetMapping/@PostMapping, @PathVariable, @RequestBody, ResponseEntity.' },
      { title: 'DTO & Service Layer', desc: 'DTO pattern, ModelMapper/MapStruct, @Service, @Transactional, business logic separation.' },
      { title: 'Spring Security JWT', desc: 'SecurityConfig, JwtAuthenticationFilter, UserDetailsService, JWT token generation/validation, @PreAuthorize.' },
    ],
    codeExample: `@Entity
@Table(name = "tasks")
public class Task {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    private boolean completed;

    // getters/setters
}

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByCompletedFalse();
}

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired
    private TaskRepository repository;

    @GetMapping
    public List<Task> getAll() {
        return repository.findByCompletedFalse();
    }
}`,

    exercise: 'Buat REST API dengan Spring Boot untuk blog posts: Entity Post (id, title, content, author, createdAt), JpaRepository, REST Controller CRUD. Tambahkan validasi dengan Jakarta Validation.',
    summary: 'Spring Boot 3 menyediakan framework enterprise yang mature dengan JPA/Hibernate ORM, Spring Security, dan auto-configuration untuk rapid development.',
  },

  'tryngo-lang-codeigniter': {
    trackId: 'tryngo-lang-codeigniter',
    weekTitle: 'Beginner Week 1: CodeIgniter 4 MVC Basics',
    objectives: [
      'Memahami struktur folder CodeIgniter 4',
      'Menguasai Controllers, Models, dan Views',
      'Mampu menggunakan Query Builder',
      'Mengerti Shield Auth untuk authentication',
    ],
    topics: [
      { title: 'CI4 Architecture', desc: 'App/Config/Public/Writable structure, .env configuration, base URL, environment modes.' },
      { title: 'Controllers & Routing', desc: 'BaseController, method routing, auto-routing (optional), parameter passing, redirect, Request/Response objects.' },
      { title: 'Models & Query Builder', desc: 'Model class, Query Builder methods (select, where, join, orderBy, paginate), Entity class.' },
      { title: 'Views & Layouts', desc: 'View rendering, layout inheritance with sections, Parser vs View renderer, cell, component.' },
      { title: 'Shield Auth', desc: 'Install Shield, User model, login/register, session management, permission/group, remember-me.' },
    ],
    codeExample: `// Controller
class Tasks extends BaseController
{
    public function index()
    {
        $model = model('TaskModel');
        $data['tasks'] = $model->where('user_id', auth()->id())
                               ->orderBy('created_at', 'DESC')
                               ->paginate(10);
        $data['pager'] = $model->pager;
        return view('tasks/index', $data);
    }

    public function create()
    {
        if ($this->request->getMethod() === 'POST') {
            $model = model('TaskModel');
            $model->save([
                'title' => $this->request->getPost('title'),
                'user_id' => auth()->id(),
            ]);
            return redirect()->to('/tasks');
        }
        return view('tasks/create');
    }
}`,

    exercise: 'Buat CRUD Task dengan CI4: migration, model, controller, views (Bootstrap styling). Implementasikan pagination, search, dan form validation. Shield auth untuk proteksi.',
    summary: 'CodeIgniter 4 menawarkan framework PHP ringan dengan footprint kecil, performa baik, dan dokumentasi yang jelas untuk rapid development.',
  },

  'tryngo-lang-mysql': {
    trackId: 'tryngo-lang-mysql',
    weekTitle: 'Beginner Week 1: MySQL 8 InnoDB & Queries',
    objectives: [
      'Memahami InnoDB storage engine dan indexing',
      'Menguasai complex JOINs dan subqueries',
      'Mampu menggunakan stored procedures dan triggers',
      'Mengerti transaction isolation dan deadlock handling',
    ],
    topics: [
      { title: 'InnoDB Architecture', desc: 'Buffer pool, redo log, undo log, clustered indexes, secondary indexes, MVCC for concurrency control.' },
      { title: 'Advanced JOINs', desc: 'INNER, LEFT, RIGHT, CROSS JOIN, self-join, natural join, JOIN dengan subquery, derived table, CTE (WITH).' },
      { title: 'Stored Procedures', desc: 'CREATE PROCEDURE, IN/OUT parameters, variables, cursors, condition handlers, advantages vs application logic.' },
      { title: 'Triggers & Events', desc: 'BEFORE/AFTER INSERT/UPDATE/DELETE triggers, CREATE EVENT for scheduled tasks, audit logging pattern.' },
      { title: 'Performance Tuning', desc: 'EXPLAIN output analysis, slow query log, index optimization, partitioning (RANGE, LIST, HASH).' },
    ],
    codeExample: `-- Recursive CTE for category tree
WITH RECURSIVE category_tree AS (
  SELECT id, name, parent_id, 1 AS level
  FROM categories WHERE parent_id IS NULL
  UNION ALL
  SELECT c.id, c.name, c.parent_id, ct.level + 1
  FROM categories c
  JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT * FROM category_tree;

-- Stored procedure with transaction
DELIMITER //
CREATE PROCEDURE TransferFunds(
  IN from_account INT, IN to_account INT, IN amount DECIMAL(10,2)
)
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN ROLLBACK; RESIGNAL; END;

  START TRANSACTION;
  UPDATE accounts SET balance = balance - amount WHERE id = from_account;
  UPDATE accounts SET balance = balance + amount WHERE id = to_account;
  COMMIT;
END //`,

    exercise: 'Buat database e-commerce: tabel categories (hierarchical dengan parent_id), products, orders, order_items. Buat stored procedure untuk order placement dengan transaction. Query best-selling products dengan JOIN.',
    summary: 'MySQL 8 dengan InnoDB menyediakan relational database yang andal dengan ACID compliance, replication, dan performance tuning yang mature.',
  },

  'tryngo-lang-mongodb': {
    trackId: 'tryngo-lang-mongodb',
    weekTitle: 'Beginner Week 1: MongoDB Documents & Aggregation',
    objectives: [
      'Memahami document model BSON dan collections',
      'Menguasai CRUD operations dan indexing',
      'Mampu menggunakan Aggregation Pipeline',
      'Mengerti schema design patterns dan embedding',
    ],
    topics: [
      { title: 'Document Model', desc: 'BSON format, _id ObjectId, embedded documents, array fields, dynamic schema, validation rules.' },
      { title: 'CRUD Operations', desc: 'insertOne/insertMany, find with query operators ($gt, $in, $regex), updateOne/updateMany ($set, $push), deleteOne/deleteMany.' },
      { title: 'Indexes', desc: 'Single field, compound, multikey (array), text index, geospatial index, unique/sparse/partial/TTL indexes.' },
      { title: 'Aggregation Pipeline', desc: '$match, $group, $sort, $project, $lookup (JOIN), $unwind, $bucket, $facet, $addFields.' },
      { title: 'Schema Design', desc: 'Embedding vs referencing, one-to-one, one-to-many, many-to-many patterns, polymorphic schema, migration strategies.' },
    ],
    codeExample: `// Aggregation: Order summary per customer
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: {
      _id: "$customerId",
      totalOrders: { $sum: 1 },
      totalSpent: { $sum: "$totalAmount" },
      avgOrderValue: { $avg: "$totalAmount" }
  }},
  { $sort: { totalSpent: -1 } },
  { $lookup: {
      from: "customers",
      localField: "_id",
      foreignField: "_id",
      as: "customer"
  }},
  { $unwind: "$customer" },
  { $project: {
      "customer.name": 1,
      totalOrders: 1,
      totalSpent: 1,
      avgOrderValue: 1
  }}
]);`,

    exercise: 'Buat collection products dengan embedded reviews. Insert sample data. Buat aggregation pipeline: group by category, avg price, top-rated products. Index pada field yang sering di-query.',
    summary: 'MongoDB document model memberikan fleksibilitas schema dan scalability horizontal, dengan Aggregation Pipeline untuk analytics powerful.',
  },

  'tryngo-lang-redis': {
    trackId: 'tryngo-lang-redis',
    weekTitle: 'Beginner Week 1: Redis Data Structures & Caching',
    objectives: [
      'Memahami key-value store dan data structures',
      'Menguasai Strings, Hashes, Lists, Sets, Sorted Sets',
      'Mampu menggunakan Pub/Sub messaging',
      'Mengerti caching strategies dan rate limiting',
    ],
    topics: [
      { title: 'Core Data Structures', desc: 'String (SET/GET, incr, expire), Hash (HSET/HGET, HGETALL), List (LPUSH, RPUSH, LRANGE), Set (SADD, SINTER, SUNION), Sorted Set (ZADD, ZRANGE, ZREVRANGE).' },
      { title: 'Expiry & Eviction', desc: 'TTL, EXPIRE, volatile-lru/allkeys-lru, LFU, maxmemory policy, lazy/free memory eviction.' },
      { title: 'Pub/Sub', desc: 'SUBSCRIBE, PUBLISH, UNSUBSCRIBE, pattern subscribe (PSUBSCRIBE), channel vs pattern, message broker pattern.' },
      { title: 'Session Store', desc: 'Session data in Hashes, session expiry with TTL, atomic operations, session invalidation.' },
      { title: 'Rate Limiting', desc: 'Sliding window counter with Sorted Set, token bucket with MULTI/EXEC, INCR + EXPIRE for fixed window.' },
    ],
    codeExample: `// Rate limiting middleware pattern (pseudo)
async function rateLimit(userId, limit = 100, window = 60) {
  const key = \`ratelimit:\${userId}:\${Math.floor(Date.now() / 1000 / window)}\`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, window);
  if (count > limit) throw new Error('Rate limit exceeded');
  return count;
}

// Session store
await redis.hSet(\`session:\${sessionId}\`, {
  userId: user.id,
  role: user.role,
  loggedInAt: new Date().toISOString()
});
await redis.expire(\`session:\${sessionId}\`, 86400);`,

    exercise: 'Buat implementasi distributed rate limiter dengan Redis (sliding window menggunakan Sorted Set). Implementasikan juga session store dengan Hash + TTL. Testing dengan Node.js ioredis client.',
    summary: 'Redis adalah in-memory data structure store yang sangat cepat, ideal untuk caching, session management, rate limiting, dan real-time Pub/Sub.',
  },

  'tryngo-lang-django': {
    trackId: 'tryngo-lang-django',
    weekTitle: 'Beginner Week 1: Django 5 Models & Admin',
    objectives: [
      'Memahami Django MVT architecture',
      'Menguasai Models, migrations, dan Admin interface',
      'Mampu membuat REST API dengan DRF',
      'Mengerti authentication dan authorization systems',
    ],
    topics: [
      { title: 'Django Models & Migrations', desc: 'Model fields, relationships (ForeignKey, ManyToMany, OneToOne), Meta class, migration commands, data migration.' },
      { title: 'Admin Interface', desc: 'ModelAdmin configuration, list_display, search_fields, list_filter, inlines, custom actions, admin theming.' },
      { title: 'Class-Based Views', desc: 'ListView, DetailView, CreateView, UpdateView, DeleteView, mixins, generic views customization.' },
      { title: 'Django REST Framework', desc: 'ModelSerializer, ViewSet, Router, permission classes, pagination, filtering (django-filter).' },
      { title: 'Auth System', desc: 'User model, groups/permissions, authentication backends, password validation, custom user model, JWT with djangorestframework-simplejwt.' },
    ],
    codeExample: `# models.py
class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ['-created_at']

# admin.py
@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'completed', 'user', 'created_at']
    list_filter = ['completed', 'created_at']
    search_fields = ['title']

# serializers.py
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'`,

    exercise: 'Buat Django project untuk Task Manager: Model Task, Admin config, DRF ViewSet dengan CRUD, JWT authentication. Gunakan django-filter untuk filtering by status.',
    summary: 'Django 5 menyediakan full-stack framework dengan "batteries included": ORM, Admin, auth system, DRF untuk API, dan security middleware.',
  },

  'tryngo-lang-nestjs': {
    trackId: 'tryngo-lang-nestjs',
    weekTitle: 'Beginner Week 1: NestJS Modules & Providers',
    objectives: [
      'Memahami modular architecture NestJS',
      'Menguasai Controllers, Providers, dan Modules',
      'Mampu menggunakan TypeORM/Prisma integration',
      'Mengerti dependency injection dan decorators',
    ],
    topics: [
      { title: 'NestJS Modules', desc: '@Module decorator, imports, exports, providers, controllers, global modules, dynamic modules.' },
      { title: 'Providers & DI', desc: '@Injectable, custom providers (useClass, useFactory, useValue), provider scopes (singleton, request, transient).' },
      { title: 'Controllers & DTOs', desc: '@Controller, routing decorators, @Param, @Query, @Body, @Headers, DTO with class-validator, pipes.' },
      { title: 'TypeORM Integration', desc: '@Entity, @PrimaryGeneratedColumn, @OneToMany/@ManyToOne, TypeORMModule.forRoot, repository pattern.' },
      { title: 'Swagger Documentation', desc: '@ApiTags, @ApiBearerAuth, @ApiOperation, @ApiResponse, SwaggerModule setup, OpenAPI 3.0 spec.' },
    ],
    codeExample: `// task.module.ts
@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService]
})
export class TaskModule {}

// task.service.ts
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private repo: Repository<Task>
  ) {}

  async findAll(): Promise<Task[]> {
    return this.repo.find({ where: { completed: false } });
  }
}

// task.controller.ts
@Controller('api/tasks')
export class TaskController {
  constructor(private service: TaskService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active tasks' })
  findAll() { return this.service.findAll(); }
}`,

    exercise: 'Buat NestJS REST API dengan TypeORM SQLite: Task entity, CRUD service, controller dengan class-validator DTO, Swagger docs, dan error handling dengan ExceptionFilter.',
    summary: 'NestJS menyediakan arsitektur modular terinspirasi Angular untuk Node.js, dengan dependency injection, decorators, dan integrasi TypeORM/Prisma yang matang.',
  },
};
