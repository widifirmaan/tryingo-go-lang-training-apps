import fs from 'fs';
import path from 'path';

const BASE = new URL('../public/data/course/svelte', import.meta.url).pathname;
const BASE_DIR = process.platform === 'win32' ? BASE.slice(1) : BASE;

const PKG_NODE = (name, dev) => `{
  "name": "${name}",
  "version": "1.0.0",
  "private": true,
  "scripts": { "dev": "${dev}" }
}
`;

const DEV_SERVE = 'npx vite';

const LESSONS = [
  {
    num: 1, topicId: 'pengenalan-svelte',
    titleId: 'Pengenalan Svelte & Setup', titleEn: 'Introduction to Svelte & Setup',
    codeFile: 'src/App.svelte',
    files: {
      'src/App.svelte': '<script>\n  let name = "Svelte";\n</script>\n\n<h1>Hello, {name}!</h1>\n<p>Welcome to Svelte 5.</p>',
      'src/main.ts': 'import App from "./App.svelte";\n\nconst app = new App({\n  target: document.getElementById("app"),\n});\n\nexport default app;\n',
      'index.html': '<!DOCTYPE html>\n<html>\n<head><title>Svelte App</title></head>\n<body>\n  <div id="app"></div>\n  <script type="module" src="/src/main.ts"></script>\n</body>\n</html>\n',
      'package.json': PKG_NODE('svelte-lesson-1', DEV_SERVE),
      'vite.config.ts': 'import { defineConfig } from "vite";\nimport svelte from "@sveltejs/vite-plugin-svelte";\n\nexport default defineConfig({\n  plugins: [svelte()],\n});\n',
      'composer.json': PKG_NODE('svelte-lesson-1', DEV_SERVE),
      'README.md': '# Svelte Lesson 1 - Introduction\n\nJalankan: npm install && npm run dev\nBuka: http://localhost:5173\n',
    },
    objId: ['Memahami posisi Svelte: framework compile-time untuk web', 'Mengenal struktur proyek Svelte (src/App.svelte, src/main.ts)', 'Memahami komponen Svelte: script, markup, dan style', 'Menjalankan Svelte app via Vite dan melihat output di browser'],
    objEn: ['Understand Svelte: compile-time framework for the web', 'Learn Svelte project structure (src/App.svelte, src/main.ts)', 'Understand Svelte components: script, markup, and style', 'Run Svelte app via Vite and view output in browser'],
    expId: `## Struktur Komponen Svelte\nSetiap komponen Svelte memiliki 3 bagian: <script> (logika), markup (HTML), dan <style> (CSS).\n## Reactivity\nSvelte 5 menggunakan runes: \$state, \$derived, \$effect. Tidak perlu reactive declarations seperti Svelte 4.\n## Menjalankan Svelte\nnpm install && npm run dev — instal dependency dan jalankan Vite dev server. Buka http://localhost:5173.`,
    expEn: `## Svelte Component Structure\nEach Svelte component has 3 parts: <script> (logic), markup (HTML), and <style> (CSS).\n## Reactivity\nSvelte 5 uses runes: \$state, \$derived, \$effect. No need for reactive declarations like Svelte 4.\n## Running Svelte\nnpm install && npm run dev — install dependencies and start Vite dev server. Open http://localhost:5173.`,
    chId: 'Eksplorasi: (1) ubah "Svelte" menjadi nama framework Anda di variabel name, (2) tambah h2 dengan judul proyek Anda, (3) coba akses http://localhost:5173 dan lihat perubahan, (4) tambah tombol yang mengubah nama saat diklik.',
    chEn: 'Explore: (1) change "Svelte" to your framework name in the name variable, (2) add an h2 with your project title, (3) try accessing http://localhost:5173 and see the change, (4) add a button that changes the name when clicked.',
    sumId: 'Svelte = framework compile-time. Komponen = script + markup + style. Runes = \$state, \$derived, \$effect. Lanjut: props dan events.',
    sumEn: 'Svelte = compile-time framework. Component = script + markup + style. Runes = \$state, \$derived, \$effect. Next: props and events.',
  },
  {
    num: 2, topicId: 'props-events',
    titleId: 'Props & Events', titleEn: 'Props & Events',
    codeFile: 'src/App.svelte',
    files: {
      'src/App.svelte': '<script>\n  import Child from "./Child.svelte";\n  let count = 0;\n\n  function handleClick() {\n    count += 1;\n  }\n</script>\n\n<h1>Svelte Props & Events</h1>\n<p>Count: {count}</p>\n<button on:click={handleClick}>Tambah</button>\n<Child {count} on:increment={handleClick} />',
      'src/Child.svelte': '<script>\n  let { count, onincrement } = $props();\n</script>\n\n<p>Child count: {count}</p>\n<button on:click={() => onincrement?.()}>Increment dari Child</button>',
      'composer.json': PKG_NODE('svelte-lesson-2', DEV_SERVE),
      'package.json': PKG_NODE('svelte-lesson-2', DEV_SERVE),
      'README.md': '# Svelte Lesson 2 - Props & Events\n\nJalankan: npm install && npm run dev\n\nProps: $props(). Events: on:click, on:custom.\n',
    },
    objId: ['Memahami props: mengirim data dari parent ke child dengan $props()', 'Memahami events: mengirim data dari child ke parent dengan on:event', 'Menggunakan $state() untuk reactive state di Svelte 5', 'Menggunakan $derived() untuk derived values'],
    objEn: ['Understand props: pass data from parent to child with $props()', 'Understand events: pass data from child to parent with on:event', 'Use $state() for reactive state in Svelte 5', 'Use $derived() for derived values'],
    expId: `## Props\n$props() — menerima props dari parent. Di parent: <Child {count} on:increment={handler} />.\n## Events\non:click — menangani click event. on:custom — custom event dari child.\n## Reactive State\n\$state() — mendeklarasikan reactive state. \$derived() — menghitung derived value secara otomatis.\n## Svelte 5 vs Svelte 4\nSvelte 5 menggunakan runes (\$state, \$props, \$derived, \$effect). Svelte 4 menggunakan let export dan reactive declarations (\$:).`,
    expEn: `## Props\n$props() — receives props from parent. In parent: <Child {count} on:increment={handler} />.\n## Events\non:click — handles click event. on:custom — custom event from child.\n## Reactive State\n\$state() — declares reactive state. \$derived() — computes derived values automatically.\n## Svelte 5 vs Svelte 4\nSvelte 5 uses runes (\$state, \$props, \$derived, \$effect). Svelte 4 uses let exports and reactive declarations (\$:).`,
    chId: 'Tingkatkan props & events: (1) buat komponen Counter yang menerima props awal dan mengirim event increment, (2) buat komponen TodoList dengan props todos dan event toggle, (3) tambah $derived untuk menghitung jumlah todo yang selesai, (4) buat form input yang menambah todo baru.',
    chEn: 'Level up props & events: (1) create a Counter component that accepts initial props and emits increment event, (2) create a TodoList component with todos prop and toggle event, (3) add $derived to compute completed todo count, (4) create an input form that adds new todos.',
    sumId: 'Props = $props(). Events = on:event. $state = reactive. $derived = computed. Lanjut: bindings dan reactive statements.',
    sumEn: 'Props = $props(). Events = on:event. $state = reactive. $derived = computed. Next: bindings and reactive statements.',
  },
  {
    num: 3, topicId: 'bindings',
    titleId: 'Bindings & Reactive Statements', titleEn: 'Bindings & Reactive Statements',
    codeFile: 'src/App.svelte',
    files: {
      'src/App.svelte': '<script>\n  let name = "";\n  let items = [];\n  let newItem = "";\n\n  $: hasItems = items.length > 0;\n  $: itemCount = items.length;\n\n  function addItem() {\n    if (newItem.trim()) {\n      items = [...items, { id: Date.now(), text: newItem, done: false }];\n      newItem = "";\n    }\n  }\n\n  function toggleItem(id) {\n    items = items.map(item =>\n      item.id === id ? { ...item, done: !item.done } : item\n    );\n  }\n</script>\n\n<h1>Svelte Bindings</h1>\n\n<input bind:value={name} placeholder="Nama Anda" />\n<p>Halo, {name || "Dunia"}!</p>\n\n<input bind:value={newItem} placeholder="Item baru" />\n<button on:click={addItem}>Tambah</button>\n\n{#if hasItems}\n  <p>Jumlah item: {itemCount}</p>\n  {#each items as item (item.id)}\n    <div>\n      <input type="checkbox" checked={item.done} on:change={() => toggleItem(item.id)} />\n      <span style:opacity={item.done ? 0.5 : 1}>{item.text}</span>\n    </div>\n  {/each}\n{/if}',
      'composer.json': PKG_NODE('svelte-lesson-3', DEV_SERVE),
      'package.json': PKG_NODE('svelte-lesson-3', DEV_SERVE),
      'README.md': '# Svelte Lesson 3 - Bindings & Reactive Statements\n\nJalankan: npm install && npm run dev\n\nBindings: bind:value. Reactive: $:. Each: {#each}. If: {#if}.\n',
    },
    objId: ['Menggunakan bind:value untuk two-way data binding', 'Menggunakan reactive statements ($:) untuk computed values', 'Menggunakan {#each} untuk iterasi list', 'Menggunakan {#if} untuk conditional rendering'],
    objEn: ['Use bind:value for two-way data binding', 'Use reactive statements ($:) for computed values', 'Use {#each} for list iteration', 'Use {#if} for conditional rendering'],
    expId: `## bind:value\nbind:value={name} — two-way binding antara input dan variabel. Svelte secara otomatis sync perubahan.\n## Reactive Statements\n$: hasItems = items.length > 0 — dieksekusi otomatis saat items berubah. \$: itemCount = items.length.\n## {#each}\n{#each items as item (item.id)} — iterasi list dengan key. item.id adalah key untuk efficient DOM updates.\n## {#if}\n{#if hasItems} — conditional rendering. Svelte menghapus DOM elemen jika kondisi false.`,
    expEn: `## bind:value\nbind:value={name} — two-way binding between input and variable. Svelte automatically syncs changes.\n## Reactive Statements\n$: hasItems = items.length > 0 — executed automatically when items changes. \$: itemCount = items.length.\n## {#each}\n{#each items as item (item.id)} — iterate list with key. item.id is the key for efficient DOM updates.\n## {#if}\n{#if hasItems} — conditional rendering. Svelte removes DOM element if condition is false.`,
    chId: 'Tingkatkan bindings: (1) tambah bind:checked untuk checkbox select all, (2) tambah reactive statement yang menghitung jumlah item yang selesai, (3) buat filter items berdasarkan status (all/active/completed), (4) tambah input jumlah dan bind it ke variabel.',
    chEn: 'Level up bindings: (1) add bind:checked for select all checkbox, (2) add reactive statement that computes completed item count, (3) create items filter based on status (all/active/completed), (4) add quantity input bound to a variable.',
    sumId: 'bind:value = two-way. $: = reactive. {#each} = loop. {#if} = conditional. Lanjut: stores dan lifecycle.',
    sumEn: 'bind:value = two-way. $: = reactive. {#each} = loop. {#if} = conditional. Next: stores and lifecycle.',
  },
  {
    num: 4, topicId: 'stores-lifecycle',
    titleId: 'Stores & Lifecycle', titleEn: 'Stores & Lifecycle',
    codeFile: 'src/App.svelte',
    files: {
      'src/App.svelte': '<script>\n  import { writable, derived } from "svelte/store";\n  import Child from "./Child.svelte";\n\n  const count = writable(0);\n  const doubled = derived(count, $count => $count * 2);\n\n  function increment() {\n    count.update(n => n + 1);\n  }\n\n  function decrement() {\n    count.update(n => n - 1);\n  }\n</script>\n\n<h1>Svelte Stores & Lifecycle</h1>\n\n<p>Count: {$count}</p>\n<p>Doubled: {$doubled}</p>\n<button on:click={decrement}>-</button>\n<button on:click={increment}>+</button>\n\n<Child />',
      'src/Child.svelte': '<script>\n  import { onMount, onDestroy } from "svelte";\n\n  let time = new Date().toLocaleTimeString();\n\n  onMount(() => {\n    const interval = setInterval(() => {\n      time = new Date().toLocaleTimeString();\n    }, 1000);\n\n    onDestroy(() => {\n      clearInterval(interval);\n    });\n  });\n</script>\n\n<p>Child mounted at: {time}</p>',
      'composer.json': PKG_NODE('svelte-lesson-4', DEV_SERVE),
      'package.json': PKG_NODE('svelte-lesson-4', DEV_SERVE),
      'README.md': '# Svelte Lesson 4 - Stores & Lifecycle\n\nJalankan: npm install && npm run dev\n\nStores: writable, derived. Lifecycle: onMount, onDestroy.\n',
    },
    objId: ['Memahami Svelte stores: writable dan derived', 'Menggunakan $store syntax untuk mengakses store values', 'Menggunakan onMount untuk side effects setelah mount', 'Menggunakan onDestroy untuk cleanup'],
    objEn: ['Understand Svelte stores: writable and derived', 'Use $store syntax to access store values', 'Use onMount for side effects after mounting', 'Use onDestroy for cleanup'],
    expId: `## Stores\nwritable(initial) — membuat store yang bisa di-update. derived(store, fn) — membuat derived store.\n## \$store Syntax\n$count — mengakses value dari store secara reactive. Svelte secara otomatis subscribe dan unsubscribe.\n## onMount\nonMount(() => { ... }) — dijalankan setelah komponen di-mount. Cocok untuk API calls, intervals.\n## onDestroy\nonDestroy(() => { ... }) — dijalankan sebelum komponen di-destroy. Cocok untuk cleanup intervals, listeners.`,
    expEn: `## Stores\nwritable(initial) — creates an updatable store. derived(store, fn) — creates a derived store.\n## \$store Syntax\n$count — accesses store value reactively. Svelte automatically subscribes and unsubscribes.\n## onMount\nonMount(() => { ... }) — runs after component is mounted. Great for API calls, intervals.\n## onDestroy\nonDestroy(() => { ... }) — runs before component is destroyed. Great for cleanup of intervals, listeners.`,
    chId: 'Tingkatkan stores & lifecycle: (1) buat store untuk tema (light/dark) dan toggle di parent, (2) buat custom store untuk localStorage persistence, (3) tambah onMount untuk fetch data dari API, (4) buat komponen countdown timer dengan onMount dan onDestroy.',
    chEn: 'Level up stores & lifecycle: (1) create a theme store (light/dark mode) and toggle in parent, (2) create a custom store for localStorage persistence, (3) add onMount for API data fetch, (4) create a countdown timer component with onMount and onDestroy.',
    sumId: 'Stores = writable/derived. $store = reactive access. onMount = after mount. onDestroy = cleanup. Lanjut: routing.',
    sumEn: 'Stores = writable/derived. $store = reactive access. onMount = after mount. onDestroy = cleanup. Next: routing.',
  },
  {
    num: 5, topicId: 'routing',
    titleId: 'Routing & Navigation', titleEn: 'Routing & Navigation',
    codeFile: 'src/App.svelte',
    files: {
      'src/App.svelte': '<script>\n  import { goto } from "$app/navigation";\n  import { page } from "$app/stores";\n</script>\n\n<nav>\n  <a href="/" use:goto>Beranda</a>\n  <a href="/about" use:goto>Tentang</a>\n  <a href="/contact" use:goto>Kontak</a>\n</nav>\n\n<main>\n  {#if $page.url.pathname === "/"}\n    <h1>Beranda</h1>\n    <p>Selamat datang di aplikasi Svelte.</p>\n  {:else if $page.url.pathname === "/about"}\n    <h1>Tentang</h1>\n    <p>Ini adalah aplikasi Svelte routing demo.</p>\n  {:else if $page.url.pathname === "/contact"}\n    <h1>Kontak</h1>\n    <p>Hubungi kami di kontak@example.com</p>\n  {/if}\n</main>',
      'src/routes/+page.svelte': '<script>\n  export let data;\n</script>\n\n<h1>Home Page</h1>\n<p>Welcome to the Svelte app.</p>',
      'src/routes/about/+page.svelte': '<h1>About Page</h1>\n<p>About this Svelte app.</p>',
      'src/routes/contact/+page.svelte': '<h1>Contact Page</h1>\n<p>Contact us.</p>',
      'composer.json': PKG_NODE('svelte-lesson-5', DEV_SERVE),
      'package.json': PKG_NODE('svelte-lesson-5', DEV_SERVE),
      'README.md': '# Svelte Lesson 5 - Routing & Navigation\n\nJalankan: npm install && npm run dev\n\nRouting: $app/navigation, $app/stores. File-based routing.\n',
    },
    objId: ['Memahami routing di Svelte: file-based routing dan $app/navigation', 'Menggunakan goto() untuk navigasi programmatic', 'Menggunakan $page store untuk mengakses route info', 'Membuat route pages dengan file-based routing'],
    objEn: ['Understand Svelte routing: file-based routing and $app/navigation', 'Use goto() for programmatic navigation', 'Use $page store to access route info', 'Create route pages with file-based routing'],
    expId: `## File-based Routing\nSvelteKit menggunakan file system untuk routing: src/routes/+page.svelte = halaman utama. src/routes/about/+page.svelte = /about.\n## goto()\ngoto("/about") — navigasi programmatic. Gunakan di onclick atau use:action.\n## $page Store\n$page.url.pathname — path saat ini. $page.params — URL parameters. $page.data — page data.\n## Link vs goto\n<a href="/about"> — native anchor. use:goto={"/about"} — SvelteKit navigation (SPA, no full reload).`,
    expEn: `## File-based Routing\nSvelteKit uses file system for routing: src/routes/+page.svelte = home page. src/routes/about/+page.svelte = /about.\n## goto()\ngoto("/about") — programmatic navigation. Use in onclick or use:action.\n## $page Store\n$page.url.pathname — current path. $page.params — URL parameters. $page.data — page data.\n## Link vs goto\n<a href="/about"> — native anchor. use:goto={"/about"} — SvelteKit navigation (SPA, no full reload).`,
    chId: 'Tingkatkan routing: (1) tambah route /users dengan daftar user, (2) tambah dynamic route /users/[id] untuk detail user, (3) tambah navigasi sidebar dengan active state berdasarkan $page.url.pathname, (4) buat breadcrumb navigation.',
    chEn: 'Level up routing: (1) add /users route with user list, (2) add dynamic route /users/[id] for user detail, (3) add sidebar navigation with active state based on $page.url.pathname, (4) create breadcrumb navigation.',
    sumId: 'Routing = file-based. goto() = programmatic. $page = route info. Lanjut: forms dan data fetching.',
    sumEn: 'Routing = file-based. goto() = programmatic. $page = route info. Next: forms and data fetching.',
  },
  {
    num: 6, topicId: 'forms-data',
    titleId: 'Forms & Data Fetching', titleEn: 'Forms & Data Fetching',
    codeFile: 'src/App.svelte',
    files: {
      'src/App.svelte': '<script>\n  let name = "";\n  let email = "";\n  let message = "";\n  let submitted = false;\n  let errors = {};\n\n  function validate() {\n    errors = {};\n    if (!name.trim()) errors.name = "Nama wajib diisi";\n    if (!email.trim() || !email.includes("@")) errors.email = "Email tidak valid";\n    if (!message.trim()) errors.message = "Pesan wajib diisi";\n    return Object.keys(errors).length === 0;\n  }\n\n  function handleSubmit() {\n    if (validate()) {\n      submitted = true;\n      console.log({ name, email, message });\n    }\n  }\n</script>\n\n<h1>Svelte Forms & Data</h1>\n\n{#if !submitted}\n  <form on:submit|preventDefault={handleSubmit}>\n    <label>Nama:</label>\n    <input type="text" bind:value={name} />\n    {#if errors.name}<span class="error">{errors.name}</span>{/if}\n\n    <label>Email:</label>\n    <input type="email" bind:value={email} />\n    {#if errors.email}<span class="error">{errors.email}</span>{/if}\n\n    <label>Pesan:</label>\n    <textarea bind:value={message}></textarea>\n    {#if errors.message}<span class="error">{errors.message}</span>{/if}\n\n    <button type="submit">Kirim</button>\n  </form>\n{:else}\n  <p>Terima kasih, {name}! Pesan Anda telah dikirim.</p>\n{/if}',
      'composer.json': PKG_NODE('svelte-lesson-6', DEV_SERVE),
      'package.json': PKG_NODE('svelte-lesson-6', DEV_SERVE),
      'README.md': '# Svelte Lesson 6 - Forms & Data Fetching\n\nJalankan: npm install && npm run dev\n\nForm validation, preventDefault, conditional rendering.\n',
    },
    objId: ['Memahami form handling di Svelte dengan bind:value dan on:submit', 'Mengimplementasi form validation sederhana', 'Menggunakan preventDefault untuk mencegah page reload', 'Menampilkan conditional success message setelah submit'],
    objEn: ['Understand form handling in Svelte with bind:value and on:submit', 'Implement simple form validation', 'Use preventDefault to prevent page reload', 'Show conditional success message after submit'],
    expId: `## Form Handling\non:submit|preventDefault={handleSubmit} — menangani submit tanpa page reload. bind:value={name} — two-way binding.\n## Validation\nValidasi dilakukan di JavaScript sebelum submit. Errors disimpan dalam object dan ditampilkan conditional.\n## Data Fetching\nfetch("https://api.example.com/data") — mengambil data dari API. Gunakan onMount untuk fetch saat component mount.\n## Loading State\n{#if loading}<p>Loading...</p>{/if} — menampilkan loading state selama data di-fetch.`,
    expEn: `## Form Handling\non:submit|preventDefault={handleSubmit} — handles submit without page reload. bind:value={name} — two-way binding.\n## Validation\nValidation done in JavaScript before submit. Errors stored in object and displayed conditionally.\n## Data Fetching\nfetch("https://api.example.com/data") — fetches data from API. Use onMount for fetch on component mount.\n## Loading State\n{#if loading}<p>Loading...</p>{/if} — shows loading state while fetching data.`,
    chId: 'Tingkatkan forms & data: (1) tambah form dengan validasi async (cek email duplikat via API), (2) buat form upload file dengan preview, (3) tambah data fetching dari public API (JSONPlaceholder), (4) buat form search dengan debounce.',
    chEn: 'Level up forms & data: (1) add form with async validation (check duplicate email via API), (2) create file upload form with preview, (3) add data fetching from public API (JSONPlaceholder), (4) create search form with debounce.',
    sumId: 'Form = bind:value + on:submit|preventDefault. Validation = JS object. Fetch = onMount + fetch. Lanjut: komponen reusable.',
    sumEn: 'Form = bind:value + on:submit|preventDefault. Validation = JS object. Fetch = onMount + fetch. Next: reusable components.',
  },
  {
    num: 7, topicId: 'components-reusable',
    titleId: 'Reusable Components', titleEn: 'Reusable Components',
    codeFile: 'src/App.svelte',
    files: {
      'src/App.svelte': '<script>\n  import Card from "./components/Card.svelte";\n  import Button from "./components/Button.svelte";\n\n  const cards = [\n    { title: "Svelte 5", desc: "Runes reactivity", color: "#FF3E00" },\n    { title: "Performance", desc: "No virtual DOM", color: "#4FC08D" },\n    { title: "Developer Experience", desc: "Less boilerplate", color: "#7BA3BE" },\n  ];\n</script>\n\n<h1>Reusable Components</h1>\n\n{#each cards as card (card.title)}\n  <Card title={card.title} description={card.desc} color={card.color}>\n    <Button slot="action" on:click={() => alert(card.title)}>\n      Learn More\n    </Button>\n  </Card>\n{/each}',
      'src/components/Card.svelte': '<script>\n  let { title, description, color, children } = $props();\n</script>\n\n<div class="card" style="border-top: 4px solid {color}">\n  <h2>{title}</h2>\n  <p>{description}</p>\n  <div class="actions">\n    {@render children()}\n  </div>\n</div>\n\n<style>\n  .card {\n    background: white;\n    border-radius: 8px;\n    padding: 1.5rem;\n    margin: 1rem 0;\n    box-shadow: 0 2px 8px rgba(0,0,0,0.1);\n  }\n  .actions {\n    margin-top: 1rem;\n  }\n</style>',
      'src/components/Button.svelte': '<script>\n  let { children, onClick } = $props();\n</script>\n\n<button on:click={onClick} class="btn">\n  {@render children()}\n</button>\n\n<style>\n  .btn {\n    background: #FF3E00;\n    color: white;\n    border: none;\n    padding: 0.5rem 1rem;\n    border-radius: 4px;\n    cursor: pointer;\n  }\n  .btn:hover {\n    background: #e03500;\n  }\n</style>',
      'composer.json': PKG_NODE('svelte-lesson-7', DEV_SERVE),
      'package.json': PKG_NODE('svelte-lesson-7', DEV_SERVE),
      'README.md': '# Svelte Lesson 7 - Reusable Components\n\nJalankan: npm install && npm run dev\n\nProps with $props(), slots with {@render children()}, component composition.\n',
    },
    objId: ['Memahami reusable components dengan $props() dan {@render}', 'Membuat slot untuk component composition', 'Mengimpor dan menggunakan komponen di komponen lain', 'Menggunakan props untuk customisasi komponen'],
    objEn: ['Understand reusable components with $props() and {@render}', 'Create slots for component composition', 'Import and use components in other components', 'Use props for component customization'],
    expId: `## $props()\n$props() — menerima semua props dari parent. Svelte 5 menggunakan $props() menggantikan export let.\n## {@render children()}\n{@render children()} — render slot content dari parent. Mirip dengan <slot> di Svelte 4.\n## Component Composition\nImpor komponen dengan import Card from "./Card.svelte". Gunakan sebagai elemen HTML: <Card><p>Content</p></Card>.\n## Props Customization\nProps memungkinkan komponen digunakan ulang dengan data berbeda. <Card title="X" color="red"> vs <Card title="Y" color="blue">.`,
    expEn: `## $props()\n$props() — receives all props from parent. Svelte 5 uses $props() instead of export let.\n## {@render children()}\n{@render children()} — render slot content from parent. Similar to <slot> in Svelte 4.\n## Component Composition\nImport component with import Card from "./Card.svelte". Use as HTML element: <Card><p>Content</p></Card>.\n## Props Customization\nProps allow component reuse with different data. <Card title="X" color="red"> vs <Card title="Y" color="blue">.`,
    chId: 'Tingkatkan reusable components: (1) buat komponen Modal dengan slot header/body/footer, (2) buat komponen Table dengan props columns dan data, (3) buat komponen Badge dengan props variant (primary/success/warning/danger), (4) buat komponen Input dengan label, validation, dan error message.',
    chEn: 'Level up reusable components: (1) create a Modal component with header/body/footer slots, (2) create a Table component with columns and data props, (3) create a Badge component with variant props (primary/success/warning/danger), (4) create an Input component with label, validation, and error message.',
    sumId: '$props() = terima props. {@render children()} = slot. Import = gunakan komponen. Lanjut: state management.',
    sumEn: '$props() = receive props. {@render children()} = slot. Import = use components. Next: state management.',
  },
  {
    num: 8, topicId: 'state-management',
    titleId: 'State Management & Stores', titleEn: 'State Management & Stores',
    codeFile: 'src/App.svelte',
    files: {
      'src/App.svelte': '<script>\n  import { countStore, doubleStore } from "./stores/counter";\n  import { goto } from "$app/navigation";\n</script>\n\n<h1>Svelte State Management</h1>\n\n<p>Count: {$countStore}</p>\n<p>Double: {$doubleStore}</p>\n\n<button on:click={() => countStore.update(n => n + 1)}>+</button>\n<button on:click={() => countStore.update(n => n - 1)}>-</button>\n<button on:click={() => countStore.set(0)}>Reset</button>\n\n<button on:click={() => goto("/about")}>Ke About</button>',
      'src/stores/counter.js': 'import { writable, derived } from "svelte/store";\n\nexport const countStore = writable(0);\n\nexport const doubleStore = derived(\n  countStore,\n  $count => $count * 2\n);\n\nexport function increment() {\n  countStore.update(n => n + 1);\n}\n\nexport function decrement() {\n  countStore.update(n => n - 1);\n}\n\nexport function reset() {\n  countStore.set(0);\n}',
      'composer.json': PKG_NODE('svelte-lesson-8', DEV_SERVE),
      'package.json': PKG_NODE('svelte-lesson-8', DEV_SERVE),
      'README.md': '# Svelte Lesson 8 - State Management & Stores\n\nJalankan: npm install && npm run dev\n\nCustom stores, derived stores, store actions.\n',
    },
    objId: ['Memahami custom stores untuk state management lintas komponen', 'Memahami derived stores untuk computed state', 'Membuat store actions untuk encapsulate logic', 'Menggunakan stores untuk state global tanpa prop drilling'],
    objEn: ['Understand custom stores for cross-component state management', 'Understand derived stores for computed state', 'Create store actions to encapsulate logic', 'Use stores for global state without prop drilling'],
    expId: `## Custom Stores\nCustom store = object dengan subscribe, set, update methods. Bisa menambahkan custom logic di dalamnya.\n## Derived Stores\nderived(store, fn) — menghitung value baru dari store lain secara reactive. Otomatis update saat source store berubah.\n## Store Actions\nFungsi yang mengubah store value. Bisa di-export dari file store dan di-import di komponen manapun.\n## Global State\nStores memungkinkan state dibagikan ke semua komponen tanpa prop drilling. Cukup import store dan gunakan $store syntax.`,
    expEn: `## Custom Stores\nCustom store = object with subscribe, set, update methods. Can add custom logic inside.\n## Derived Stores\nderived(store, fn) — computes new value from another store reactively. Automatically updates when source store changes.\n## Store Actions\nFunctions that modify store value. Can be exported from store file and imported in any component.\n## Global State\nStores allow state to be shared across all components without prop drilling. Just import store and use $store syntax.`,
    chId: 'Tingkatkan state management: (1) buat store untuk auth (user, login, logout), (2) buat store untuk theme (light/dark mode), (3) buat store untuk cart (add, remove, total), (4) buat store untuk notifications (add, remove, auto-dismiss).',
    chEn: 'Level up state management: (1) create auth store (user, login, logout), (2) create theme store (light/dark mode), (3) create cart store (add, remove, total), (4) create notification store (add, remove, auto-dismiss).',
    sumId: 'Custom store = state global. Derived = computed. Actions = logic. Lanjut: final project.',
    sumEn: 'Custom store = global state. Derived = computed. Actions = logic. Next: final project.',
  },
  {
    num: 9, topicId: 'lifecycle-api',
    titleId: 'Lifecycle Hooks & External APIs', titleEn: 'Lifecycle Hooks & External APIs',
    codeFile: 'src/App.svelte',
    files: {
      'src/App.svelte': '<script>\n  import { onMount, onDestroy, beforeUpdate, afterUpdate } from "svelte";\n  import { goto } from "$app/navigation";\n\n  let data = [];\n  let loading = true;\n  let error = null;\n  let filter = "all";\n\n  onMount(async () => {\n    try {\n      const res = await fetch("https://jsonplaceholder.typicode.com/posts");\n      data = await res.json();\n    } catch (e) {\n      error = "Gagal memuat data";\n    } finally {\n      loading = false;\n    }\n  });\n\n  $: filteredData = filter === "all" ? data : data.filter(item => item.userId === parseInt(filter));\n\n  function deleteItem(id) {\n    data = data.filter(item => item.id !== id);\n  }\n</script>\n\n<h1>Lifecycle & APIs</h1>\n\n<label>Filter by User:</label>\n<select bind:value={filter}>\n  <option value="all">Semua</option>\n  <option value="1">User 1</option>\n  <option value="2">User 2</option>\n  <option value="3">User 3</option>\n</select>\n\n{#if loading}\n  <p>Loading...</p>\n{:else if error}\n  <p class="error">{error}</p>\n{:else}\n  <ul>\n    {#each filteredData.slice(0, 10) as item (item.id)}\n      <li>\n        <strong>{item.title}</strong>\n        <button on:click={() => deleteItem(item.id)}>Hapus</button>\n      </li>\n    {/each}\n  </ul>\n{/if}',
      'composer.json': PKG_NODE('svelte-lesson-9', DEV_SERVE),
      'package.json': PKG_NODE('svelte-lesson-9', DEV_SERVE),
      'README.md': '# Svelte Lesson 9 - Lifecycle Hooks & External APIs\n\nJalankan: npm install && npm run dev\n\nLifecycle hooks, fetch API, error handling, reactive filtering.\n',
    },
    objId: ['Memahami lifecycle hooks: onMount, onDestroy, beforeUpdate, afterUpdate', 'Menggunakan fetch API untuk mengambil data dari external API', 'Mengimplementasi error handling untuk API calls', 'Menggunakan reactive statements untuk filtering data'],
    objEn: ['Understand lifecycle hooks: onMount, onDestroy, beforeUpdate, afterUpdate', 'Use fetch API to get data from external API', 'Implement error handling for API calls', 'Use reactive statements for data filtering'],
    expId: `## Lifecycle Hooks\nonMount — dijalankan setelah component di-mount (DOM ready). Cocok untuk fetch data, setup intervals.\nonDestroy — dijalankan sebelum component di-destroy. Cocok untuk cleanup intervals, listeners.\nbeforeUpdate — dijalankan sebelum DOM di-update. afterUpdate — dijalankan setelah DOM di-update.\n## Fetch API\nfetch(url) — mengambil data dari API. Gunakan try/catch untuk error handling. Gunakan loading state untuk UX.\n## Reactive Filtering\n$: filteredData = filter === "all" ? data : data.filter(...) — otomatis recalculate saat data atau filter berubah.`,
    expEn: `## Lifecycle Hooks\nonMount — runs after component is mounted (DOM ready). Great for fetch data, setup intervals.\nonDestroy — runs before component is destroyed. Great for cleanup intervals, listeners.\nbeforeUpdate — runs before DOM updates. afterUpdate — runs after DOM updates.\n## Fetch API\nfetch(url) — fetches data from API. Use try/catch for error handling. Use loading state for UX.\n## Reactive Filtering\n$: filteredData = filter === "all" ? data : data.filter(...) — automatically recalculates when data or filter changes.`,
    chId: 'Tingkatkan lifecycle & APIs: (1) tambah pagination untuk data yang lebih banyak, (2) tambah search dengan debounce, (3) buat caching layer untuk menghindari fetch berulang, (4) tambah optimistic update untuk delete operation.',
    chEn: 'Level up lifecycle & APIs: (1) add pagination for more data, (2) add search with debounce, (3) create caching layer to avoid repeated fetches, (4) add optimistic update for delete operation.',
    sumId: 'onMount = after mount. onDestroy = cleanup. fetch = API. $: = reactive. Lanjut: final project.',
    sumEn: 'onMount = after mount. onDestroy = cleanup. fetch = API. $: = reactive. Next: final project.',
  },
  {
    num: 10, topicId: 'final-project',
    titleId: 'Proyek Akhir: Task Manager', titleEn: 'Final Project: Task Manager',
    codeFile: 'src/App.svelte',
    files: {
      'src/App.svelte': '<script>\n  import { goto } from "$app/navigation";\n  import TaskList from "./components/TaskList.svelte";\n  import TaskForm from "./components/TaskForm.svelte";\n  import { taskStore } from "./stores/tasks";\n\n  let activeTab = "all";\n</script>\n\n<h1>Task Manager</h1>\n\n<nav>\n  <button on:click={() => activeTab = "all"} class:active={activeTab === "all"}>Semua</button>\n  <button on:click={() => activeTab = "active"} class:active={activeTab === "active"}>Aktif</button>\n  <button on:click={() => activeTab = "done"} class:active={activeTab === "done"}>Selesai</button>\n</nav>\n\n<TaskForm />\n\n<TaskList filter={activeTab} />\n\n<p>Total: {$taskStore.length} tugas</p>',
      'src/stores/tasks.js': 'import { writable, derived } from "svelte/store";\n\nconst { subscribe, set, update } = writable([]);\n\nexport const taskStore = {\n  subscribe,\n  add: (task) => update(tasks => [...tasks, { ...task, id: Date.now(), done: false }]),\n  toggle: (id) => update(tasks => tasks.map(t => t.id === id ? { ...t, done: !t.done } : t)),\n  remove: (id) => update(tasks => tasks.filter(t => t.id !== id)),\n  clearDone: () => set(tasks.filter(t => !t.done)),\n};\n\nexport const activeTasks = derived(taskStore, $tasks => $tasks.filter(t => !t.done));\nexport const doneTasks = derived(taskStore, $tasks => $tasks.filter(t => t.done));\nexport const taskCount = derived(taskStore, $tasks => $tasks.length);',
      'src/components/TaskList.svelte': '<script>\n  let { filter = "all" } = $props();\n  import { taskStore, activeTasks, doneTasks } from "../stores/tasks";\n\n  function getTasks() {\n    if (filter === "active") return $activeTasks;\n    if (filter === "done") return $doneTasks;\n    return $taskStore;\n  }\n</script>\n\n{#if getTasks().length === 0}\n  <p>Tidak ada tugas.</p>\n{:else}\n  {#each getTasks() as task (task.id)}\n    <div>\n      <input type="checkbox" checked={task.done} on:change={() => taskStore.toggle(task.id)} />\n      <span style:opacity={task.done ? 0.5 : 1}>{task.title}</span>\n      <button on:click={() => taskStore.remove(task.id)}>Hapus</button>\n    </div>\n  {/each}\n{/if}',
      'src/components/TaskForm.svelte': '<script>\n  let title = "";\n  import { taskStore } from "../stores/tasks";\n\n  function handleSubmit() {\n    if (title.trim()) {\n      taskStore.add({ title });\n      title = "";\n    }\n  }\n</script>\n\n<form on:submit|preventDefault={handleSubmit}>\n  <input type="text" bind:value={title} placeholder="Tugas baru..." />\n  <button type="submit">Tambah</button>\n</form>',
      'composer.json': PKG_NODE('svelte-lesson-10', DEV_SERVE),
      'package.json': PKG_NODE('svelte-lesson-10', DEV_SERVE),
      'README.md': '# Svelte Lesson 10 - Final Project: Task Manager\n\nJalankan: npm install && npm run dev\n\nTask Manager dengan stores, reusable components, routing, dan CRUD operations.\n',
    },
    objId: ['Menggabungkan semua konsep Svelte: components, stores, props, events, lifecycle', 'Membangun Task Manager dengan CRUD operations', 'Menggunakan custom stores untuk state management', 'Menerapkan reusable components (TaskList, TaskForm)'],
    objEn: ['Combine all Svelte concepts: components, stores, props, events, lifecycle', 'Build a Task Manager with CRUD operations', 'Use custom stores for state management', 'Apply reusable components (TaskList, TaskForm)'],
    expId: `## Final Project Architecture\nApp.svelte = root component dengan navigation. TaskStore = custom store dengan CRUD actions. TaskList = reusable list component. TaskForm = reusable form component.\n## Key Concepts\n$props() untuk props, {@render children()} untuk slots, $store untuk reactive store access, onMount untuk data fetching, bind:value untuk two-way binding.\n## Deployment\nnpm run build — build production. Deploy ke Vercel, Netlify, atau Cloudflare Pages.`,
    expEn: `## Final Project Architecture\nApp.svelte = root component with navigation. TaskStore = custom store with CRUD actions. TaskList = reusable list component. TaskForm = reusable form component.\n## Key Concepts\n$props() for props, {@render children()} for slots, $store for reactive store access, onMount for data fetching, bind:value for two-way binding.\n## Deployment\nnpm run build — build production. Deploy to Vercel, Netlify, or Cloudflare Pages.`,
    chId: 'Tingkatkan proyek akhir: (1) tambah kategori untuk tugas (work, personal, urgent), (2) tambah due date dengan date picker, (3) tambah drag-and-drop untuk reorder tugas, (4) tambah persistensi ke localStorage, (5) tambah dark mode toggle.',
    chEn: 'Level up the final project: (1) add categories for tasks (work, personal, urgent), (2) add due date with date picker, (3) add drag-and-drop for task reorder, (4) add localStorage persistence, (5) add dark mode toggle.',
    sumId: 'Task Manager = Svelte 5 + stores + components + CRUD. Semua konsep Svelte terpakai! Anda siap build Svelte app nyata.',
    sumEn: 'Task Manager = Svelte 5 + stores + components + CRUD. All Svelte concepts applied! You are ready to build real Svelte apps.',
  },
];

// ===== GENERATE =====
for (const lesson of LESSONS) {
  const levelDir = 'svelte';
  const mdDir = path.join(BASE_DIR, levelDir);
  fs.mkdirSync(mdDir, { recursive: true });

  const objListId = lesson.objId.map((o) => `- ${o}`).join('\\n');
  const objListEn = lesson.objEn.map((o) => `- ${o}`).join('\\n');

  for (const lang of ['id', 'en']) {
    const langDir = path.join(mdDir, lang);
    fs.mkdirSync(langDir, { recursive: true });
    const isId = lang === 'id';
    const title = isId ? lesson.titleId : lesson.titleEn;
    const objList = isId ? objListId : objListEn;
    const exp = isId ? lesson.expId : lesson.expEn;
    const ch = isId ? lesson.chId : lesson.chEn;
    const sum = isId ? lesson.sumId : lesson.sumEn;
    const lessonLabel = isId ? `Pelajaran ${lesson.num}` : `Lesson ${lesson.num}`;

    const code = lesson.files[lesson.codeFile] || '';
    const filename = `lesson${lesson.num}-${lesson.topicId}.md`;
    const content = `# ${title}

> Svelte | ${lessonLabel}

## ${isId ? 'Tujuan Pembelajaran' : 'Learning Objectives'}

${objList}

---

## Program: ${isId ? 'Svelte' : 'Svelte'}

\`\`\`svelte
${code}
\`\`\`

---

## ${isId ? 'Penjelasan' : 'Explanation'}

${exp}

---

## ${isId ? 'Eksperimen' : 'Experiments'}

${exp.split('\\n').map((l) => l.trim()).filter((l) => l.startsWith('##')).map((h, i) => `${i + 1}. **${h.replace(/^#+\\s*/, '')}**`).join('\\n')}

---

## ${isId ? 'Tantangan' : 'Challenge'}

${ch}

---

## ${isId ? 'Ringkasan' : 'Summary'}

${sum}
`;

    fs.writeFileSync(path.join(langDir, filename), content);

    const filesJson = path.join(langDir, `lesson${lesson.num}-${lesson.topicId}.json`);
    fs.writeFileSync(filesJson, JSON.stringify(lesson.files, null, 2));
  }

  console.log(`  ${lesson.num}. ${lesson.titleId} / ${lesson.titleEn}`);
}

const total = LESSONS.length * 2;
console.log(`\\nGenerated ${total} Svelte curriculum files (${LESSONS.length} lessons x 2 languages)`);
console.log(`  Output: ${BASE_DIR}`);