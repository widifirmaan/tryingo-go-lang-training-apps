import { BaseGenerator } from './lib/base-generator.mjs';

const gen = new BaseGenerator('svelte', 'Svelte');

const LEVELS = [
  { levelId: 'beginer', nameId: 'Pemula', nameEn: 'Beginner', descId: 'Dasar Svelte: template, reactivity, props, events, stores.', descEn: 'Svelte basics: template, reactivity, props, events, stores.' },
  { levelId: 'intermediate', nameId: 'Menengah', nameEn: 'Intermediate', descId: 'Svelte menengah: routing, actions, transitions, proyek.', descEn: 'Intermediate Svelte: routing, actions, transitions, project.' },
];

const MODULES = [
  {
    week: 1, level: 'beginer', topicId: 'dasar-svelte',
    titleId: 'Dasar Svelte & Template', titleEn: 'Svelte Basics & Template',
    programId: 'Halo Svelte', programEn: 'Hello Svelte',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'svelte',
    code: `<!-- Svelte = compiler framework (no virtual DOM) -->
<script>
  let name = "Tryngo";
  let count = 0;
  $: doubled = count * 2;
  $: greeting = "Halo, " + name + "!";
  function increment() { count++; }
</script>
<h1>{greeting}</h1>
<p>Count: {count} | Doubled: {doubled}</p>
<button on:click={increment}>+</button>
<!-- Svelte app siap dijalankan -->`,
    objectivesId: ['Memahami Svelte sebagai compiler framework', 'Template syntax: { } untuk expressions', 'Reactive declarations: $: derived = expr', 'Event handling: on:click={handler}', 'Scoped CSS di dalam komponen'],
    objectivesEn: ['Understand Svelte as compiler framework', 'Template syntax: { } for expressions', 'Reactive declarations: $: derived = expr', 'Event handling: on:click={handler}', 'Scoped CSS inside component'],
    explanationId: '### Svelte\nCompiler framework. No virtual DOM.\n\n### Template\n{ } = expression. Auto-update saat state berubah.\n\n### Reactive Declarations\n$: = re-run saat dependency berubah.\n\n### Scoped CSS\nCSS di <style> hanya berlaku untuk komponen ini.',
    explanationEn: '### Svelte\nCompiler framework, no virtual DOM.\n\n### Template\n{ } = expressions, auto-update.\n\n### Reactive Declarations\n$: re-runs on dependency change.\n\n### Scoped CSS\nStyle scoped to component.',
    experimentsId: ['Ubah state dan lihat UI update', 'Tambah reactive declaration baru', 'Buat conditional rendering', 'Render list dengan each'],
    experimentsEn: ['Change state and observe UI update', 'Add new reactive declaration', 'Create conditional rendering', 'Render list with each'],
    challengeId: 'Buat counter app dengan increment, decrement, reset. Tampilkan pesan berbeda berdasarkan nilai.',
    challengeEn: 'Build a counter app with increment, decrement, reset. Show different messages based on value.',
    summaryId: 'Minggu 1 dari 10: **Dasar Svelte & Template** (Level: Pemula). Minggu depan: **Reactivity & Statements**.',
    summaryEn: 'Week 1 of 10: **Svelte Basics & Template** (Level: Beginner). Next week: **Reactivity & Statements**.',
  },
  {
    week: 2, level: 'beginer', topicId: 'reactivity-statements',
    titleId: 'Reactivity & Statements', titleEn: 'Reactivity & Statements',
    programId: 'Todo App', programEn: 'Todo App',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'svelte',
    code: `<!-- Svelte reactivity: assign to update, $: for derived -->
<script>
  let todos = [];
  let newTodo = "";
  function addTodo() {
    if (newTodo.trim()) {
      todos = [...todos, { id: Date.now(), text: newTodo, done: false }];
      newTodo = "";
    }
  }
  $: remaining = todos.filter(t => !t.done).length;
</script>
<input bind:value={newTodo} placeholder="Tambah todo...">
<button on:click={addTodo}>Tambah</button>
<p>{remaining} tersisa</p>
{#each todos as todo}
  <div>
    <input type="checkbox" checked={todo.done}>
    <span>{todo.text}</span>
  </div>
{/each}`,
    objectivesId: ['Reactive assignments: perlu reassignment', '$: untuk derived state', 'Array reactivity: reassign array', 'each block untuk list rendering', 'if block untuk conditional rendering'],
    objectivesEn: ['Reactive assignments: need reassignment', '$: for derived state', 'Array reactivity: reassign', 'each block for list rendering', 'if block for conditional rendering'],
    explanationId: '### Reactivity\nAssign to update: count = count + 1. Array: todos = [...todos, new].\n\n### $:\nDerived state. Re-run saat dependency berubah.\n\n### each block\n{#each items as item}...{/each}.\n\n### if block\n{#if condition}...{:else}...{/if}.',
    explanationEn: '### Reactivity\nAssign to update.\n\n### $:\nDerived state.\n\n### each block\nList rendering.\n\n### if block\nConditional rendering.',
    experimentsId: ['Buat filter completed/active/all', 'Tambah edit todo', 'Implementasikan clear completed', 'Tambah localStorage persistence'],
    experimentsEn: ['Create filter completed/active/all', 'Add edit todo', 'Implement clear completed', 'Add localStorage persistence'],
    challengeId: 'Buat todo app lengkap: add, toggle, delete, filter, persist ke localStorage.',
    challengeEn: 'Build a complete todo app: add, toggle, delete, filter, persist to localStorage.',
    summaryId: 'Minggu 2 dari 10: **Reactivity & Statements** (Level: Pemula). Minggu depan: **Props & Components**.',
    summaryEn: 'Week 2 of 10: **Reactivity & Statements** (Level: Beginner). Next week: **Props & Components**.',
  },
  {
    week: 3, level: 'beginer', topicId: 'props-components',
    titleId: 'Props & Components', titleEn: 'Props & Components',
    programId: 'Komponen Produk', programEn: 'Product Components',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'svelte',
    code: `<!-- Props = data dari parent ke child -->
<!-- Child: ProductCard.svelte -->
<script>
  export let name;
  export let price;
  export let isAvailable = true;
</script>
<div class="card">
  <h3>{name}</h3>
  <p>Rp {price.toLocaleString("id-ID")}</p>
  <button disabled={!isAvailable} on:click>Tambah</button>
</div>
<!-- Parent: App.svelte -->
<script>
  import ProductCard from './ProductCard.svelte';
  let products = [{ name: 'Laptop', price: 15000000, isAvailable: true }];
</script>
{#each products as product}
  <ProductCard name={product.name} price={product.price} />
{/each}`,
    objectivesId: ['export let untuk definisi props', 'Default values untuk props', 'Spread props: {...props}', 'Component composition', 'Slot untuk konten dinamis'],
    objectivesEn: ['export let for prop definition', 'Default values for props', 'Spread props: {...props}', 'Component composition', 'Slot for dynamic content'],
    explanationId: '### Props\nexport let name = prop definition. Parent: <Comp name="value" />.\n\n### Default Values\nexport let name = "default".\n\n### Slots\n<slot /> = konten dari parent.',
    explanationEn: '### Props\nexport let for prop definition.\n\n### Default Values\nexport let with default.\n\n### Slots\n<slot /> for parent content.',
    experimentsId: ['Buat komponen dengan multiple props', 'Tambah named slots', 'Implementasikan slot props', 'Buat komponen dengan events'],
    experimentsEn: ['Create component with multiple props', 'Add named slots', 'Implement slot props', 'Create component with events'],
    challengeId: 'Buat product catalog: ProductCard, ProductList, CartSummary.',
    challengeEn: 'Build a product catalog: ProductCard, ProductList, CartSummary.',
    summaryId: 'Minggu 3 dari 10: **Props & Components** (Level: Pemula). Minggu depan: **Events & Bindings**.',
    summaryEn: 'Week 3 of 10: **Props & Components** (Level: Beginner). Next week: **Events & Bindings**.',
  },
  {
    week: 4, level: 'beginer', topicId: 'events-bindings',
    titleId: 'Events & Bindings', titleEn: 'Events & Bindings',
    programId: 'Form Interaktif', programEn: 'Interactive Form',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'svelte',
    code: `<!-- Events: on:event, Bindings: bind:property -->
<script>
  let name = "";
  let email = "";
  let errors = {};
  function validate() {
    errors = {};
    if (!name.trim()) errors.name = "Wajib diisi";
    if (!email.includes("@")) errors.email = "Tidak valid";
    return Object.keys(errors).length === 0;
  }
</script>
<form on:submit|preventDefault>
  <input bind:value={name} placeholder="Nama">
  {#if errors.name}<span class="error">{errors.name}</span>{/if}
  <input bind:value={email} placeholder="Email">
  {#if errors.email}<span class="error">{errors.email}</span>{/if}
  <button type="submit" disabled={!validate()}>Daftar</button>
</form>`,
    objectivesId: ['on:event untuk event handling', 'bind:value untuk two-way binding', 'Event modifiers: preventDefault, stopPropagation', 'bind:checked untuk checkbox', 'bind:group untuk radio/checkbox group'],
    objectivesEn: ['on:event for event handling', 'bind:value for two-way binding', 'Event modifiers: preventDefault, stopPropagation', 'bind:checked for checkbox', 'bind:group for radio/checkbox group'],
    explanationId: '### Events\non:click={handler}. Shorthand: on:click.\n\n### Bindings\nbind:value = two-way. Input -> state, state -> input.\n\n### Modifiers\n|preventDefault, |stopPropagation, |once, |self.',
    explanationEn: '### Events\non:click={handler}.\n\n### Bindings\nbind:value for two-way.\n\n### Modifiers\n|preventDefault, |stopPropagation.',
    experimentsId: ['Buat form dengan multiple input types', 'Implementasikan keyboard shortcuts', 'Buat custom event', 'Tambah form validation real-time'],
    experimentsEn: ['Create form with multiple input types', 'Implement keyboard shortcuts', 'Create custom event', 'Add real-time form validation'],
    challengeId: 'Buat registration form dengan validasi: nama, email, password, konfirmasi password.',
    challengeEn: 'Build a registration form with validation: name, email, password, confirm password.',
    summaryId: 'Minggu 4 dari 10: **Events & Bindings** (Level: Pemula). Minggu depan: **Stores**.',
    summaryEn: 'Week 4 of 10: **Events & Bindings** (Level: Beginner). Next week: **Stores**.',
  },
  {
    week: 5, level: 'beginer', topicId: 'stores',
    titleId: 'Svelte Stores', titleEn: 'Svelte Stores',
    programId: 'State Management', programEn: 'State Management',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'svelte',
    code: `<!-- Stores = shared state antar komponen -->
<!-- stores.js -->
import { writable, derived } from 'svelte/store';
export const count = writable(0);
export const doubled = derived(count, $count => $count * 2);
function createCount() {
  const { subscribe, set, update } = writable(0);
  return { subscribe, increment: () => update(n => n + 1), reset: () => set(0) };
}
export const counter = createCount();
<!-- Component.svelte -->
<script>
  import { count, doubled, counter } from './stores.js';
</script>
<p>Count: {$count} | Doubled: {$doubled}</p>
<button on:click={counter.increment}>+</button>
<!-- $ = auto-subscribe ke store -->`,
    objectivesId: ['writable store untuk mutable state', 'derived store untuk derived state', 'Custom store dengan methods', '$ prefix untuk auto-subscribe', 'readable store untuk read-only state'],
    objectivesEn: ['writable store for mutable state', 'derived store for derived state', 'Custom store with methods', '$ prefix for auto-subscribe', 'readable store for read-only state'],
    explanationId: '### writable\nwritable(initial). set(), update(), subscribe().\n\n### derived\nderived(store, callback). Computed dari store lain.\n\n### Auto-subscribe\n$store = subscribe otomatis.',
    explanationEn: '### writable\nwritable(initial) with set, update, subscribe.\n\n### derived\nderived from other stores.\n\n### Auto-subscribe\n$store for auto-subscription.',
    experimentsId: ['Buat custom store dengan async actions', 'Implementasikan store persistence', 'Buat store dengan multiple derived', 'Gunakan readable store'],
    experimentsEn: ['Create custom store with async actions', 'Implement store persistence', 'Create store with multiple derived', 'Use readable store'],
    challengeId: 'Buat shopping cart dengan stores: cart store, total derived store, add/remove actions.',
    challengeEn: 'Build a shopping cart with stores: cart store, total derived store, add/remove actions.',
    summaryId: 'Minggu 5 dari 10: **Svelte Stores** (Level: Pemula). Selesai fase Beginner! Minggu depan: **SvelteKit Routing**.',
    summaryEn: 'Week 5 of 10: **Svelte Stores** (Level: Beginner). Beginner phase complete! Next week: **SvelteKit Routing**.',
  },
  {
    week: 6, level: 'intermediate', topicId: 'sveltekit-routing',
    titleId: 'SvelteKit Routing', titleEn: 'SvelteKit Routing',
    programId: 'Multi-Halaman', programEn: 'Multi-Page App',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'svelte',
    code: `<!-- SvelteKit = meta-framework untuk Svelte (routing, SSR) -->
<!-- File-based routing: src/routes/ -->
<!-- +page.svelte = page component -->
<!-- +layout.svelte = layout wrapper -->
<!-- [id].svelte = dynamic route -->
<!-- +error.svelte = error page -->
<script>
  export let data; // dari load function
</script>
<h1>{data.title}</h1>
<a href=\"/about\">Tentang</a>
<a href=\"/products/123\">Detail</a>`,
    objectivesId: ['File-based routing: routes/folder', '+page.svelte dan +layout.svelte', 'Dynamic routes: [id].svelte', 'Load function untuk data fetching', 'Navigate dengan goto()'],
    objectivesEn: ['File-based routing', '+page.svelte and +layout.svelte', 'Dynamic routes: [id].svelte', 'Load function for data fetching', 'Navigate with goto()'],
    explanationId: '### File-based Routing\nroutes/folder/+page.svelte = /folder.\n\n### Dynamic Routes\n[id].svelte = parameter dinamis.\n\n### Load Function\n+page.js: load() return data ke component.\n\n### Navigation\ngoto("/path") = programmatic navigate.',
    explanationEn: '### File-based Routing\nroutes/folder = URL.\n\n### Dynamic Routes\n[id] for parameters.\n\n### Load Function\nload() returns data.\n\n### Navigation\ngoto for programmatic.',
    experimentsId: ['Buat nested routes', 'Implementasikan dynamic route', 'Tambah layout wrapper', 'Buat 404 page'],
    experimentsEn: ['Create nested routes', 'Implement dynamic route', 'Add layout wrapper', 'Create 404 page'],
    challengeId: 'Buat blog app dengan SvelteKit: Home, Posts, Post Detail (/post/[slug]), About.',
    challengeEn: 'Build a blog app with SvelteKit: Home, Posts, Post Detail (/post/[slug]), About.',
    summaryId: 'Minggu 6 dari 10: **SvelteKit Routing** (Level: Menengah). Minggu depan: **Actions & Forms**.',
    summaryEn: 'Week 6 of 10: **SvelteKit Routing** (Level: Intermediate). Next week: **Actions & Forms**.',
  },
  {
    week: 7, level: 'intermediate', topicId: 'actions-forms',
    titleId: 'Actions & Forms', titleEn: 'Actions & Forms',
    programId: 'Form & API', programEn: 'Form & API',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'svelte',
    code: `<!-- SvelteKit Actions: form submission ke server -->
<!-- +page.server.js -->
// export const actions = {
//   create: async ({ request }) => {
//     const data = await request.formData();
//     const name = data.get('name');
//     return { success: true, message: 'Berhasil' };
//   }
// };
<!-- +page.svelte (Form) -->
<script>
  export let form; // hasil dari action
</script>
<form method=\"POST\" action=\"?/create\">
  <input name=\"name\" placeholder=\"Nama\">
  <button type=\"submit\">Simpan</button>
</form>
{#if form?.success}<p>{form.message}</p>{/if}`,
    objectivesId: ['Form actions: ?/create, ?/delete', '+page.server.js untuk server actions', 'Form data dengan request.formData()', 'Enhance form untuk progressive enhancement', 'Return data dari action'],
    objectivesEn: ['Form actions: ?/create, ?/delete', '+page.server.js for server actions', 'Form data with request.formData()', 'Enhance form for progressive enhancement', 'Return data from action'],
    explanationId: '### Actions\n+page.server.js: actions object. ?/create = create action.\n\n### Form Data\nrequest.formData() = parse form submission.\n\n### Progressive Enhancement\nTanpa JS tetap jalan. Dengan JS lebih baik.',
    explanationEn: '### Actions\nServer-side form handling.\n\n### Form Data\nrequest.formData().\n\n### Progressive Enhancement\nWorks without JS.',
    experimentsId: ['Buat form dengan multiple actions', 'Implementasikan form validation server-side', 'Tambah enhance untuk no-reload', 'Buat delete confirmation'],
    experimentsEn: ['Create form with multiple actions', 'Implement server-side validation', 'Add enhance for no-reload', 'Create delete confirmation'],
    challengeId: 'Buat CRUD app dengan SvelteKit actions: create, read, update, delete posts.',
    challengeEn: 'Build a CRUD app with SvelteKit actions: create, read, update, delete posts.',
    summaryId: 'Minggu 7 dari 10: **Actions & Forms** (Level: Menengah). Minggu depan: **Lifecycle & Context**.',
    summaryEn: 'Week 7 of 10: **Actions & Forms** (Level: Intermediate). Next week: **Lifecycle & Context**.',
  },
  {
    week: 8, level: 'intermediate', topicId: 'lifecycle-context',
    titleId: 'Lifecycle & Context', titleEn: 'Lifecycle & Context',
    programId: 'Hooks & Context', programEn: 'Hooks & Context',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'svelte',
    code: `<!-- Lifecycle: onMount, onDestroy, beforeUpdate, afterUpdate -->
<!-- Context: setContext, getContext -->
<script>
  import { onMount, onDestroy, setContext, getContext } from 'svelte';
  onMount(() => { console.log('Mounted!'); return () => console.log('Cleanup'); });
  onDestroy(() => { console.log('Destroyed'); });
  setContext('theme', { dark: false, toggle: () => {} });
  const theme = getContext('theme');
</script>`,
    objectivesId: ['onMount: jalan setelah komponen di-mount', 'onDestroy: cleanup sebelum komponen di-destroy', 'beforeUpdate dan afterUpdate', 'setContext dan getContext', 'tick() untuk flush state changes'],
    objectivesEn: ['onMount: runs after mount', 'onDestroy: cleanup before destroy', 'beforeUpdate and afterUpdate', 'setContext and getContext', 'tick() to flush state changes'],
    explanationId: '### onMount\nJalan setelah mount. Return function = cleanup.\n\n### onDestroy\nJalan sebelum destroy.\n\n### Context\nsetContext(key, value) di parent. getContext(key) di child.\n\n### Tick\nawait tick() = tunggu DOM update.',
    explanationEn: '### onMount\nRuns after mount, returns cleanup.\n\n### onDestroy\nRuns before destroy.\n\n### Context\nsetContext in parent, getContext in child.\n\n### Tick\nawait tick() waits for DOM update.',
    experimentsId: ['Buat timer dengan onMount/onDestroy', 'Implementasikan context untuk theme', 'Gunakan tick setelah state update', 'Buat custom lifecycle hook'],
    experimentsEn: ['Create timer with onMount/onDestroy', 'Implement context for theme', 'Use tick after state update', 'Create custom lifecycle hook'],
    challengeId: 'Buat theme provider dengan context: setContext theme, useContext di child components.',
    challengeEn: 'Build a theme provider with context: setContext theme, useContext in child components.',
    summaryId: 'Minggu 8 dari 10: **Lifecycle & Context** (Level: Menengah). Minggu depan: **Transitions & Animations**.',
    summaryEn: 'Week 8 of 10: **Lifecycle & Context** (Level: Intermediate). Next week: **Transitions & Animations**.',
  },
  {
    week: 9, level: 'intermediate', topicId: 'transitions-animations',
    titleId: 'Transitions & Animations', titleEn: 'Transitions & Animations',
    programId: 'UI Animasi', programEn: 'Animated UI',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'svelte',
    code: `<!-- Svelte Transitions: built-in animation directives -->
<script>
  import { fade, fly, slide, scale, flip } from 'svelte/transition';
  let visible = true;
  let items = [1, 2, 3];
</script>
{#if visible}
  <div transition:fade={{ duration: 300 }}>Fade in/out</div>
  <div in:fly={{ y: -200 }} out:slide>Fly in, slide out</div>
{/if}
{#each items as item (item)}
  <div transition:scale>{{ item }}</div>
{/each}`,
    objectivesId: ['transition: directive untuk enter/leave', 'in: dan out: untuk separate transitions', 'Built-in transitions: fade, fly, slide, scale', 'each block animations dengan animate:flip', 'Custom transition functions'],
    objectivesEn: ['transition: for enter/leave', 'in: and out: for separate transitions', 'Built-in transitions: fade, fly, slide, scale', 'each block animations with animate:flip', 'Custom transition functions'],
    explanationId: '### transition:\ntransition:name = same for in/out.\n\n### in:/out:\nSeparate transitions.\n\n### Built-in\nfade, fly, slide, scale, blur, draw.\n\n### animate:flip\nFlip animation untuk reorder list.',
    explanationEn: '### transition:\nSame for in/out.\n\n### in:/out:\nSeparate transitions.\n\n### Built-in\nfade, fly, slide, scale.\n\n### animate:flip\nFlip for list reorder.',
    experimentsId: ['Buat page transition', 'Implementasikan modal animation', 'Buat staggered list animation', 'Integrasikan spring motion'],
    experimentsEn: ['Create page transitions', 'Implement modal animation', 'Create staggered list animation', 'Integrate spring motion'],
    challengeId: 'Buat animated dashboard: page transitions, list animations, modal animations.',
    challengeEn: 'Build an animated dashboard: page transitions, list animations, modal animations.',
    summaryId: 'Minggu 9 dari 10: **Transitions & Animations** (Level: Menengah). Minggu depan: **Capstone Project**!',
    summaryEn: 'Week 9 of 10: **Transitions & Animations** (Level: Intermediate). Next week: **Capstone Project**!',
  },
  {
    week: 10, level: 'intermediate', topicId: 'capstone',
    titleId: 'Capstone: SvelteKit App', titleEn: 'Capstone: SvelteKit App',
    programId: 'Platform Kursus', programEn: 'Course Platform',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'svelte',
    code: `<!-- Capstone: SvelteKit Course Platform -->
<!-- Architecture: SvelteKit + Prisma + SQLite + Tailwind -->
<!-- src/routes/ -->
<!--   (app)/dashboard/+page.svelte -->
<!--   (app)/courses/[id]/+page.svelte -->
<!--   auth/login/+page.svelte -->
<!--   api/courses/+server.js -->
<!-- Features: Auth, Course catalog, Video player, Progress tracking, Admin panel -->
console.log('SvelteKit Course Platform siap digunakan!');`,
    objectivesId: ['Menggabungkan semua konsep Svelte/SvelteKit', 'SvelteKit: routing, actions, load functions', 'Database integration dengan Prisma', 'Auth dan protected routes', 'Production deployment'],
    objectivesEn: ['Combine all Svelte/SvelteKit concepts', 'SvelteKit: routing, actions, load functions', 'Database integration with Prisma', 'Auth and protected routes', 'Production deployment'],
    explanationId: '### Architecture\nSvelteKit + Prisma + SQLite.\n\n### Routing\nFile-based: routes/folder/+page.svelte.\n\n### Data Loading\n+page.js: load() return data.\n\n### Production\nvite build -> adapter.',
    explanationEn: '### Architecture\nSvelteKit + Prisma + SQLite.\n\n### Routing\nFile-based routing.\n\n### Data Loading\nload() returns data.\n\n### Production\nvite build with adapter.',
    experimentsId: ['Tambah payment integration', 'Implementasikan video player', 'Buat comprehensive test suite', 'Deploy ke production'],
    experimentsEn: ['Add payment integration', 'Implement video player', 'Build comprehensive test suite', 'Deploy to production'],
    challengeId: 'Buat course platform lengkap: auth, course catalog, video player, progress tracking, admin panel.',
    challengeEn: 'Build a complete course platform: auth, course catalog, video player, progress tracking, admin panel.',
    summaryId: 'Minggu 10 dari 10: **Capstone: SvelteKit App** (Level: Menengah). Selesai! 🎉',
    summaryEn: 'Week 10 of 10: **Capstone: SvelteKit App** (Level: Intermediate). Complete! 🎉',
  },
];

for (const level of LEVELS) {
  level.weeks = MODULES.filter(m => m.level === level.levelId).map(m => ({ week: m.week, topicId: m.topicId, titleId: m.titleId, titleEn: m.titleEn }));
}

gen.writeFiles(MODULES, LEVELS);
