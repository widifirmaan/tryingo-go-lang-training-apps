// Enrichment data: svelte, vue, angular (framework documentation code)
export const DATA_FRONTEND = {
  svelte: {
    'week3-props-components': {
      titleId: 'Props & Component Composition', titleEn: 'Props & Component Composition',
      introId: 'Program menulis komponen ProductCard yang menerima props, memakai snippet {#each}, dan memakai console simulation.',
      introEn: 'The program writes a ProductCard component with props rendered over an {#each} loop.',
      lang: 'svelte',
      codeId: `<!-- ProductCard.svelte -->
<script lang="ts">
  let { name, price, emoji = '📦' } = $props();
  let formatted = $derived(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price));
</script>

<div class="card">
  <span class="emoji">{emoji}</span>
  <h3>{name}</h3>
  <p class="price">{formatted}</p>
</div>

<!-- App.svelte -->
<script lang="ts">
  import ProductCard from './ProductCard.svelte';
  const products = [
    { name: 'Laptop', price: 15_000_000, emoji: '💻' },
    { name: 'Mouse', price: 250_000 },
    { name: 'Monitor', price: 4_500_000, emoji: '🖥️' },
  ];
</script>

{#each products as p (p.name)}
  <ProductCard name={p.name} price={p.price} emoji={p.emoji} />
{/each}`,
      codeEn: `<!-- ProductCard.svelte -->
<script lang="ts">
  let { name, price, emoji = '📦' } = $props();
  let formatted = $derived(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price));
</script>

<div class="card">
  <span class="emoji">{emoji}</span>
  <h3>{name}</h3>
  <p class="price">{formatted}</p>
</div>

<!-- App.svelte -->
<script lang="ts">
  import ProductCard from './ProductCard.svelte';
  const products = [
    { name: 'Laptop', price: 1500, emoji: '💻' },
    { name: 'Mouse', price: 25 },
    { name: 'Monitor', price: 450, emoji: '🖥️' },
  ];
</script>

{#each products as p (p.name)}
  <ProductCard name={p.name} price={p.price} emoji={p.emoji} />
{/each}`,
      concepts: [
        ["Rune $props", "let { name, price } = $props() mendestrukturisasi props; default value juga bisa (emoji='📦')."],
        ["Keyed each", "{#each items as item (item.id)} memberi identitas: elemen DOM dipakai ulang dengan cerdas saat daftar berubah."],
        ['$derived', 'Nilai ter-derive otomatis diperbarui ketika input berubah — tanpa watch/effect manual.'],
        ['Composition', 'Komponen kecil reusable = design system; tiap parent bisa memasang banyak instance dengan props berbeda tanpa duplikasi markup.'],
      ],
      expsId: ['Tambah prop `badge` yang tampil bila price > 10.000.000.', 'Ganti emoji default untuk Mouse jadi 🖱️.', 'Tambah tombol "checkout" pada kartu dan bandingkan reaksi tiap kartu.'],
      expsEn: ['Add a `badge` prop shown when price > 1000.', 'Change the default emoji for Mouse to 🖱️.', 'Add a "checkout" button per card and observe each card\'s state.'],
      serId: 'Buat komponen <StatBadge label value color /> dan gunakan di tiga kartu untuk menampilkan stok tersisa.',
      serEn: 'Create a <StatBadge label value color /> component and use it on three cards to show remaining stock.',
    },
    'week6-sveltekit-routing': {
      titleId: 'SvelteKit Routing & Load Functions', titleEn: 'SvelteKit Routing & Load Functions',
      introId: 'File-based routing + load functions untuk mengambil data sebelum render.',
      introEn: 'File-based routing plus load functions that fetch data before render.',
      lang: 'svelte',
      codeId: `<!-- src/routes/products/[id]/+page.svelte -->
<script lang="ts">
  import type { PageProps } from './$types';
  let { data }: PageProps = $props();
</script>

<h1>{data.product.name}</h1>
<p>{data.product.description}</p>
<a href="/products">← kembali ke katalog</a>

<!-- src/routes/products/[id]/+page.ts -->
export const load = async ({ params, fetch }) => {
  const res = await fetch('/api/products/' + params.id);
  if (!res.ok) error(404, 'Produk tidak ditemukan');
  return { product: await res.json() };
};

<!-- src/routes/products/+page.svelte -->
<script>
  import { link } from '@sveltejs/kit';
</script>
<nav>
  <a href="/products">Daftar</a> |
  <a href="/products/new">Baru</a>
</nav>

<!-- Layout dengan <a> biasa memicu client-side navigation -->
<!-- src/routes/+layout.svelte -->
<script>
  let { children } = $props();
</script>
{@render children()}`,
      codeEn: `<!-- src/routes/products/[id]/+page.svelte -->
<script lang="ts">
  import type { PageProps } from './$types';
  let { data }: PageProps = $props();
</script>

<h1>{data.product.name}</h1>
<p>{data.product.description}</p>
<a href="/products">← back to catalog</a>

<!-- src/routes/products/[id]/+page.ts -->
export const load = async ({ params, fetch }) => {
  const res = await fetch('/api/products/' + params.id);
  if (!res.ok) error(404, 'Product not found');
  return { product: await res.json() };
};

<!-- src/routes/products/+page.svelte -->
<script>
  import { link } from '@sveltejs/kit';
</script>
<nav>
  <a href="/products">List</a> |
  <a href="/products/new">New</a>
</nav>

<!-- Layout with plain <a> triggers client-side navigation -->
<!-- src/routes/+layout.svelte -->
<script>
  let { children } = $props();
</script>
{@render children()}`,
      concepts: [
        ['File-based routing', '+page.svelte = halaman; [id] = dynamic segment; (group)/grouped routes terlihat lebih lega tanpa menambah URL.'],
        ['load functions', 'Data diambil sebelum paint: load di +page.ts merespon params/fetch; relasi load result mengalir sebagai prop data.'],
        ["error() & redirects", "error(404, msg) merender +error.svelte; redirect(302, '/login') juga bisa dipanggil di dalam load."],
        ['Layout persistence', '+layout.svelte bertahan sepanjang navigasi antar child routes — tempat ideal untuk sidebar/shell.'],
      ],
      expsId: ['Tambahkan route [id]/reviews dan tampilkan data.reviews', "Ubah load() melempar error(404) untuk id '999'.", 'Selipkan +layout.svelte dengan <header> yang bertahan saat navigasi.'],
      expsEn: ['Add an [id]/reviews route and render data.reviews.', 'Make load() error(404) for id "999".', 'Wrap +layout.svelte with a persistent <header>.'],
      serId: "Buat bagian admin memakai (group) sehingga layout admin hanya berlaku untuk halaman di dalamnya.",
      serEn: 'Create an admin section using a (group) so the admin layout only applies to pages inside it.',
    },
    'week7-actions-forms': {
      titleId: 'Actions pada +page.server.ts', titleEn: 'Actions on +page.server.ts',
      introId: "Progressive enhancement: formulir tetap bekerja tanpa JavaScript berkat action di server.",
      introEn: 'Progressive enhancement: the form works without JavaScript thanks to server actions.',
      lang: 'svelte',
      codeId: `<!-- src/routes/checkout/+page.server.ts -->
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name')?.toString() ?? '';
    const qty = Number(data.get('qty') ?? 0);

    if (!name) return fail(400, { error: 'Nama wajib diisi' });
    if (qty < 1 || qty > 50) return fail(400, { error: 'Qty 1-50' });

    // ... simpan ke database ...
    return { success: true, orderId: 'TR-1201' };
  },
};

<!-- src/routes/checkout/+page.svelte -->
<script>
  let { form } = $props();     // hasil kembalian action (terbaru)
</script>

{#if form?.error}
  <p class="error">{form.error}</p>
{/if}

<form method="POST" use:enhance>
  <input name="name" placeholder="Nama penerima" />
  <input name="qty" type="number" min="1" max="50" value="1" />
  <button>Kirim Pesanan</button>
</form>`,
      codeEn: `<!-- src/routes/checkout/+page.server.ts -->
import { fail } from '@sveltejs/kit';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name')?.toString() ?? '';
    const qty = Number(data.get('qty') ?? 0);

    if (!name) return fail(400, { error: 'Name is required' });
    if (qty < 1 || qty > 50) return fail(400, { error: 'Qty must be 1-50' });

    // ... store to database ...
    return { success: true, orderId: 'TR-1201' };
  },
};

<!-- src/routes/checkout/+page.svelte -->
<script>
  let { form } = $props();     // latest action return value
</script>

{#if form?.error}
  <p class="error">{form.error}</p>
{/if}

<form method="POST" use:enhance>
  <input name="name" placeholder="Recipient name" />
  <input name="qty" type="number" min="1" max="50" value="1" />
  <button>Submit order</button>
</form>`,
      concepts: [
        ['Named vs default actions', 'actions = { default } untuk satu form; `actions = { update, delete }` untuk beberapa form: action="/checkout?/update".'],
        ['fail() vs redirect', 'fail(400, { error }) mempertahankan halaman + mengirim data validasi ke `form`; redirect() pergi ke URL lain.'],
        ['use:enhance', 'SvelteKit mengintervensi submit form: tidak reload, mengelola loading state, dan mengirim kembali hasil action variable ke `form`.'],
        ["Progressive enhancement", "Tanpa JavaScript form tetap berjalan (server action + reload penuh); dengan JS, use:enhance membuatnya halus tanpa reload."],
      ],
      expsId: ["Tambahkan action ?/gift dengan tombol form terpisah.", "Validasi qty terhadap stok palsu (hardcode 999) di dalam action.", "Tombol kirim dimatikan bila masih pending."],
      expsEn: ['Add an ?/gift action with a distinct form button.', 'Validate qty against a fake stock (hardoced 999).', 'Disable the submit button while pending.'],
      serId: "Rancang wizard dua langkah: action kedua ?/step2 dibantu hidden input yang membawa state antar langkah.",
      serEn: 'Design a two-step form wizard using a second action ?/step2 with hidden inputs carrying state across steps.',
    },
    'week8-lifecycle-context': {
      titleId: 'Lifecycle & Context API', titleEn: 'Lifecycle & the Context API',
      introId: 'Program onMount/onDestroy dan context (setContext/getContext) untuk tema & service ter-share.',
      introEn: 'The program covers onMount/onDestroy and context (setContext/getContext) for shared services like theming.',
      lang: 'svelte',
      codeId: `<script lang="ts">
  import { onMount, onDestroy, setContext, getContext } from 'svelte';

  let { sessionId = 'abc-42' } = $props();

  // === Lifecycle: mount/unmount ===
  let data = $state<string[]>([]);
  let ws = $state<WebSocket | null>(null);
  onMount(() => {
    // Browsers only! API DOM/subscription di sini
    data = ['initial', 'ready'];
    console.log('[mounted]', sessionId);
  });
  onDestroy(() => {
    console.log('[teardown] close SSE socket');
  });

  // === Context: berikan nilai ke subtree (theme toggle) ===
  const themeCtx = $state({ theme: 'dark' });
  setContext('theme', {
    get theme() { return themeCtx.theme; },
    toggle() { themeCtx.theme = themeCtx.theme === 'dark' ? 'light' : 'dark'; }
  });
</script>

<!-- ThemeButton.svelte -->
<script lang="ts">
  import { getContext } from 'svelte';
  const theme = getContext('theme');
</script>
<button onclick={theme.toggle}>Ganti tema: {theme.theme}</button>`,
      codeEn: `<script lang="ts">
  import { onMount, onDestroy, setContext, getContext } from 'svelte';

  export let sessionId = 'abc-42';

  let data = $state<string[]>([]);
  onMount(() => {
    // Browser only! DOM APIs / subscriptions here
    data = ['initial', 'ready'];
    console.log('[mounted]', sessionId);
  });
  onDestroy(() => {
    console.log('[teardown] closing socket');
  });

  // === Context API (theming) ===
  const themeCtx = $state({ theme: 'dark' });
  setContext('theme', {
    get theme() { return themeCtx.theme; },
    toggle() { themeCtx.theme = themeCtx.theme === 'dark' ? 'light' : 'dark'; }
  });
</script>

<!-- ThemeButton.svelte -->
<script lang="ts">
  import { getContext } from 'svelte';
  const theme = getContext('theme');
</script>
<button onclick={theme.toggle}>Switch theme: {theme.theme}</button>`,
      concepts: [
        ['SSR safety', 'onMount TIDAK berjalan di server — aman untuk localStorage/WebSocket; kode di <script> sendiri dieksekusi SSR (guard window).'],
        ["Cleanup pattern", "onDestroy(ws.close()) mencegah leak saat komponen unmount — tangani juga timer, listener, dan AbortSignal."],
        ['Context API', 'setContext di parent root, getContext di deep child TANPA mengepos props per lapisan; ideal untuk theme/i18n/service singleton.'],
        ['Reactive objects in context', 'Simpan obyek $state di dalam context supaya perubahan terpropagasi ke seluruh consumer.'],
      ],
      expsId: ["Pasang listener window resize di onMount lalu lepas di onDestroy.", "Simpan pilihan tema ke localStorage saat toggle.", "Buat context 'notifications' dengan add()/list() dipakai dua komponen."],
      expsEn: ['Attach a window resize listener in onMount, remove it in onDestroy.', 'Persist the theme choice with localStorage on toggle.', 'Add a notifications context with add()/list().'],
      serId: "Buat context 'userService' berisi fetch async dengan cache per user; konsumsi di sidebar dan header.",
      serEn: 'Build a "userService" context with cached async fetchers; consume it in both the sidebar and header.',
    },
    'week9-transitions-animations': {
      titleId: 'Transitions, Animations & Motion', titleEn: 'Transitions, Animations & Motion',
      introId: 'Transitions built-in (fade, fly), spring & tweened, dan animate flip untuk list reorder.',
      introEn: 'Built-in transitions (fade, fly), spring & tweened, and the FLIP animate directive for reordering.',
      lang: 'svelte',
      codeId: `<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { spring, tweened, cubicOut } from 'svelte/motion';
  import { flip } from 'svelte/animate';

  let visible = $state(true);
  let items = $state(['alpha', 'beta', 'gamma']);
  let progress = tweened(0, { duration: 400, easing: cubicOut });
  let pos = spring({ x: 0, y: 0, stiffness: 0.3, damping: 0.8 });
  progress.set(100);
</script>

{#if visible}
  <div transition:fade={{ duration: 200 }}>Menghilang halus</div>
  <div in:fly={{ y: 20, duration: 300 }}>Masuk dari bawah</div>
{/if}
<button onclick={() => visible = !visible}>Toggle</button>

<ul>
  {#each items as item (item)}
    <li animate:flip={{ duration: 250 }}>{item}</li>
  {/each}
</ul>
<button onclick={() => items = items.slice().reverse()}>
    Balik urutan (FLIP animation)
</button>

<progress value={progress} max="100"></progress>`,
      codeEn: `<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { spring, tweened, cubicOut } from 'svelte/motion';
  import { flip } from 'svelte/animate';

  let visible = $state(true);
  let items = $state(['alpha', 'beta', 'gamma']);
  let progress = tweened(0, { duration: 400, easing: cubicOut });
  let pos = spring({ x: 0, y: 0, stiffness: 0.3, damping: 0.8 });
  progress.set(100);
</script>

{#if visible}
  <div transition:fade={{ duration: 200 }}>Fading out</div>
  <div in:fly={{ y: 20, duration: 300 }}>Flying in from below</div>
{/if}
<button onclick={() => visible = !visible}>Toggle</button>

<ul>
  {#each items as item (item)}
    <li animate:flip={{ duration: 250 }}>{item}</li>
  {/each}
</ul>
<button onclick={() => items = items.slice().reverse()}>
    Reverse order (FLIP animation)
</button>

<progress value={progress} max="100"></progress>`,
      concepts: [
        ['In/out/custom transitions', 'transition: == enter+exit BOTH, in:/out: masing-masing arah. Parameters: duration, delay, easing (cubicOut).'],
        ['FLIP animate', 'animate:flip bekerja dengan keyed {#each}: Kalau order berubah, bersih rekruten (first last invert) animasi DOM reorder ikut alernative leadership.'],
        ["tweened vs spring", "tweened menginterpolasi A→B dalam durasi tertentu; spring bergerak dengan fisika (stiffness/damping). Spring untuk drag, tweened untuk progress."],
        ['CSS vs JS animasi', 'Untuk hover/active state, normal CSS animations & transitions sudah cukup; transitions Svelte untuk enter/exit DOM yang makin kompling.'],
      ],
      expsId: ["Ganti fade dengan scale berdurasi 600 ms.", "Setel stiffness/damping spring lalu rasakan perbedaannya saat toggle.", "Tambah item baru saat list sedang beranimasi — rasakan smoothnya FLIP."],
      expsEn: ['Replace fade with scale at 600ms duration.', 'Tweak spring stiffness/damping and compare the settle behavior.', 'Add an item to the list while it animates — measure smoothness.'],
      serId: "Bangun modal dengan transition:fly — buka lewat tombol, tutup saat klik overlay; pastikan koreografi masuk/keluar rapi.",
      serEn: 'Write a modal using transition:fly that closes on overlay click; verify enter/exit choreography.',
    },
    'week10-capstone': {
      titleId: 'Capstone SvelteKit: App Produksi', titleEn: 'SvelteKit Capstone: Production App',
      introId: "Capstone menyatukan routing SvelteKit, form actions, load + locals, dan pemilihan adapter deployment.",
      introEn: 'The finale bring together SvelteKit routing, form actions, stores, and deployment.',
      lang: 'svelte',
      codeId: `<!-- Capstone: dashboard mini e-commerce (3 arsitektur) -->
<!-- src/routes/dashboard/+page.server.ts -->
export const load = async ({ locals }) => {
  const [orders, stats] = await Promise.all([
    locals.db.orders.latest(5),
    locals.db.orders.summaries(),
  ]);
  return { orders, stats };
};

<!-- src/routes/dashboard/+page.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms';
  let { data } = $props();
</script>

<summary>
  <h1>Revenue: {data.stats.revenue}</h1>
  <p>Orders: {data.stats.count}</p>
</summary>

<table>
  {#each data.orders as o (o.id)}
    <tr><td>{o.customer}</td><td>{o.total}</td></tr>
  {/each}
</table>

<form method="POST" action="?/refresh" use:enhance>
  <button>Terapkan Refresh</button>
</form>`,
      codeEn: `<!-- Capstone: mini e-commerce dashboard -->
<!-- src/routes/dashboard/+page.server.ts -->
export const load = async ({ locals }) => {
  const [orders, stats] = await Promise.all([
    locals.db.orders.latest(5),
    locals.db.orders.summaries(),
  ]);
  return { orders, stats };
};

<!-- src/routes/dashboard/+page.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms';
  let { data } = $props();
</script>

<summary>
  <h1>Revenue: {data.stats.revenue}</h1>
  <p>Orders: {data.stats.count}</p>
</summary>

<table>
  {#each data.orders as o (o.id)}
    <tr><td>{o.customer}</td><td>{o.total}</td></tr>
  {/each}
</table>

<form method="POST" action="?/refresh" use:enhance>
  <button>Refresh stats</button>
</form>`,
      concepts: [
        ['load + locals', 'locals.db dipenuhi di hooks.server.ts — dependency injection pattern untuk koneksi DB per request (connection pool, request user).'],
        ["Form actions & invalidate", "Form action + invalidateAll menyegarkan data load setelah mutasi — pola server-first sebelum memakai state global."],
        ["Project structure", "lib/ untuk service dan komponen reusable; routes/ untuk halaman; hooks.server.ts untuk middleware; alias $lib untuk import rapi."],
        ['Deployment target', 'Pass up SvelteKit adapter: adapter-auto (Vercel/CF Pages), adapter-node (self-hosted), adapter-static (SSG).'],
      ],
      expsId: ["Tambah grafik revenue bulanan via chart library.", "Tampilkan skeleton loading saat fetch.", "Susun checklist build: pagination, error state, sidebar collapse."],
      expsEn: ['Add a monthly revenue chart with a chart library.', 'Load skeleton states during fetches.', 'Build a checklist: pagination, error states, responsive sidebar.'],
      serId: "Ship it: pasang analytics, error tracking, dan lighthouse budget sebelum demo day.",
      serEn: 'Ship it: connect analytics, error tracking, and a performance budget before demo day.',
    },
  },

  vue: {
    'week5-vue-router': {
      titleId: 'Vue Router: Rute & Guards', titleEn: 'Vue Router: Routes & Guards',
      introId: 'Router dengan rute dinamis, lazy loading, dan navigation guards.',
      introEn: 'Router with dynamic routes, lazy loading, and navigation guards.',
      lang: 'vue',
      codeId: `// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('./views/Home.vue') },         // dirender hanya saat dibutuhkan
  { path: '/products', component: () => import('./views/ProductList.vue') },
  { path: '/products/:id(\\d+)', component: () => import('./views/ProductDetail.vue') },
  { path: '/admin', component: () => import('./views/Admin.vue'),
    meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

// Global guard
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !useAuth().isLogged) {
    return { path: '/login', query: { redirect: to.fullPath } };
  }
});

// src/views/ProductDetail.vue
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();            // params, query, hash
const router = useRouter();          // push, replace, back
const productId = route.params.id;
router.replace('/products');
</script>`,
      codeEn: `// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('./views/Home.vue') },         // lazy
  { path: '/products', component: () => import('./views/ProductList.vue') },
  { path: '/products/:id(\\d+)', component: () => import('./views/ProductDetail.vue') },
  { path: '/admin', component: () => import('./views/Admin.vue'),
    meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

// Global guard
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !useAuth().isLogged) {
    return { path: '/login', query: { redirect: to.fullPath } };
  }
});

// src/views/ProductDetail.vue
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();            // params, query, hash
const router = useRouter();          // push, replace, back
const productId = route.params.id;
router.replace('/products');
</script>`,
      concepts: [
        ["Dynamic segments", ":id di path; regex juga didukung (:id(\\d+)) sebagai constraint; beberapa params bisa digabung dalam satu segmen."],
        ['Lazy loading routes', 'import() async menempatkan komponen di chunk berbeda; aplikasi berukuran besar tetap kecil di initial bundle.'],
        ["Guards: beforeEach/perRoute", "Guard bisa async; return false membatalkan navigasi, return object redirect mengarahkan ke rute lain."],
        ['Nested views & components', '<router-view> di dalam layout; name untuk outlet sibling — clean UI composition.'],
      ],
      expsId: ["Tambah meta.requiresRole lalu cek di guard global.", "Bungkus router-view dengan <Transition> mode out-in.", "Pertahankan query saat router.push ke route lain."],
      expsEn: ['Add per-route meta and read it in a global guard.', 'Animate router-view transitions.', 'Query param preservation across router.push.'],
      serId: 'Buat multi-step (nested) checkout keseluruhan dengan guards per langkah dan state store.',
      serEn: 'Build a multi-step (nested) checkout with per-step guards and a store.',
    },
    'week6-pinia': {
      titleId: 'Pinia State Management', titleEn: 'Pinia State Management',
      introId: 'Store kontributor state global: setup refs, actions async, getters computed, dan persistence.',
      introEn: 'Pinia store: refs, async actions, computed getters, and persistence.',
      lang: 'vue',
      codeId: `// src/stores/cart.ts
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useCartStore = defineStore('cart', () => {
  // state (ref) — akses di component: store.items
  const items = ref<{ id: number; name: string; price: number; qty: number }[]>([]);

  // getters (computed)
  const total = computed(() => items.value.reduce((sum, i) => sum + i.price * i.qty, 0));
  const count = computed(() => items.value.reduce((n, i) => n + i.qty, 0));

  // actions (fungsi async juga boleh)
  function add(product: { id: number; name: string; price: number }, qty = 1) {
    const found = items.value.find((i) => i.id === product.id);
    if (found) found.qty += qty;
    else items.value.push({ ...product, qty });
  }
  async function checkout() {
    await api.post('/orders', { items: items.value, total: total.value });
    items.value = [];
  }

  return { items, total, count, add, checkout };
});

<!-- src/components/CartBadge.vue -->
<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
const cart = useCartStore();
</script>
<template>
  <span class="badge" :class="{ shake: cart.count > 5 }">
    🛒 {{ cart.count }} — {{ cart.total.toLocaleString('id-ID') }}
  </span>
</template>`,
      codeEn: `// src/stores/cart.ts
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useCartStore = defineStore('cart', () => {
  // state (ref)
  const items = ref<{ id: number; name: string; price: number; qty: number }[]>([]);

  // getters (computed)
  const total = computed(() => items.value.reduce((sum, i) => sum + i.price * i.qty, 0));
  const count = computed(() => items.value.reduce((n, i) => n + i.qty, 0));

  // actions
  function add(product: { id: number; name: string; price: number }, qty = 1) {
    const found = items.value.find((i) => i.id === product.id);
    if (found) found.qty += qty;
    else items.value.push({ ...product, qty });
  }
  async function checkout() {
    await api.post('/orders', { items: items.value, total: total.value });
    items.value = [];
  }

  return { items, total, count, add, checkout };
});

<!-- src/components/CartBadge.vue -->
<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
const cart = useCartStore();
</script>
<template>
  <span class="badge" :class="{ shake: cart.count > 5 }">
    🛒 {{ cart.count }} — {{ cart.total.toLocaleString() }}
  </span>
</template>`,
      concepts: [
        ["Setup-store vs options", "Setup store (defineStore('cart', () => { ... })) mengikuti composition API; options store lebih ringkas untuk state kecil. Hasilnya sama persis."],
        ["Direct read, mutate via actions", "Komponen boleh membaca state langsung, tetapi kapsulkan mutasi di action — mudah dilacak lewat Pinia devtools."],
        ["State flow", "component -> action -> API -> patch state -> computed derive: data mengalir satu arah, debugging mudah."],
        ["Persistence & SSR", "pinia-plugin-persistedstate menulis ke localStorage; plugin hydration membawa state server ke client saat SSR."],
      ],
      expsId: ["Persist keranjang (plugin) lalu refresh browser — barang tetap ada.", "Tambah undo stack untuk checkout terakhir.", "Catat aksi per user di dalam store."],
      expsEn: ['Persist the cart and refresh — items remain.', 'Add an undo stack for the last checkout.', 'Track user-specific actions inside the store.'],
      serId: "Tambah action ubah-jumlah per item (increment/decrement + remove) dengan computed untuk total.",
      serEn: 'Add quantity adjust per item (increment/decrement + remove) as actions, with computed derived totals.',
    },
    'week8-provide-inject': {
      titleId: 'Provide/Inject & Teleport', titleEn: 'Provide/Inject & Teleport',
      introId: 'Program: context antar komponen tanpa props drilling, Teleport untuk portal modals, dan Suspense async components.',
      introEn: 'Cross-tree dependency without props drilling, Teleport for portals/modals, and Suspense for async components.',
      lang: 'vue',
      codeId: `<!-- === provide/inject === -->
// src/composables/useTheme.ts
import { provide, inject, InjectionKey } from 'vue';

interface ThemeAPI { theme: 'light' | 'dark'; toggle(): void }
const Key: InjectionKey<ThemeAPI> = Symbol('theme');

export function provideTheme() {
  let theme = ref<'light' | 'dark'>('dark');
  provide(Key, {
    theme,                       // reactive ref — di-inject langsung
    toggle: () => (theme.value = theme.value === 'dark' ? 'light' : 'dark'),
  });
}
export function useTheme() {
  const t = inject(Key);
  if (!t) throw new Error('useTheme harus dalam subtree provider');
  return t;
}

<!-- App.vue: provideTheme() di setup root; ThemeToggle.vue: const t = useTheme() -->

<!-- === Teleport: modal ke body === -->
<template>
  <Teleport to="body">
    <div class="overlay" v-if="open" @click.self="open = false">
      <div class="modal">...</div>
    </div>
  </Teleport>
</template>

<!-- === Suspense: async component data loading === -->
<Suspense>
  <Dashboard :key="screen" />
  <template #fallback><div class="skeleton spin">Loading…</div></template>
</Suspense>`,
      codeEn: `<!-- === provide/inject === -->
// src/composables/useTheme.ts
import { provide, inject, InjectionKey } from 'vue';

interface ThemeAPI { theme: 'light' | 'dark'; toggle(): void }
const Key: InjectionKey<ThemeAPI> = Symbol('theme');

export function provideTheme() {
  let theme = ref<'light' | 'dark'>('dark');
  provide(Key, {
    theme,
    toggle: () => (theme.value = theme.value === 'dark' ? 'light' : 'dark'),
  });
}
export function useTheme() {
  const t = inject(Key);
  if (!t) throw new Error('useTheme must be inside the provider subtree');
  return t;
}

<!-- App.vue: provideTheme() in the root setup; ThemeToggle.vue: const t = useTheme() -->

<!-- === Teleport: modal to body === -->
<template>
  <Teleport to="body">
    <div class="overlay" v-if="open" @click.self="open = false">
      <div class="modal">...</div>
    </div>
  </Teleport>
</template>

<!-- === Suspense: async component loading === -->
<Suspense>
  <Dashboard :key="screen" />
  <template #fallback><div class="skeleton spin">Loading…</div></template>
</Suspense>`,
      concepts: [
        ["InjectionKey type-safe", "Symbol + InjectionKey<ThemeAPI> memberi tipe pada inject — bentuk data injection terjaga di TypeScript."],
        ["Provide at root", "provide di root App, konsumsi di subtree mana pun; mirip React Context tetapi built-in penuh di Vue."],
        ["Teleport", "Modal/tooltip tak perlu bersarang di DOM parent (z-index bentrok); portal ke body menghindari overflow dan stacking yang terpotong."],
        ["Suspense async boundaries", "Membungkus komponen async; fallback skeleton tampil sampai data siap, per bagian dashboard."],
      ],
      expsId: ["Provide token auth dengan InjectionKey typed lalu konsumsi di dua komponen.", "Teleport notifikasi ke header lengkap dengan Transition.", "Bungkus tiap widget dashboard dengan Suspense sendiri."],
      expsEn: ['Provide a token with a typed key and consume it in multiple components.', 'Teleport a notification to the header with transitions.', 'Wrap each dashboard widget in its own Suspense.'],
      serId: "Bangun sistem modal: useModal() via inject + Teleport + Transition agar susunan modal tetap mudah diakses.",
      serEn: 'Build a modal system: useModal() via inject + Teleport + Transition so stacking stays accessible.',
    },
    'week9-testing-vue': {
      titleId: 'Testing Komponen Vue', titleEn: 'Testing Vue Components',
      introId: "Vitest + @vue/test-utils: mount, find/stub, props, dan interaksi pengguna.",
      introEn: 'Vitest + @vue/test-utils: mount, find/findAll, props, and user interaction testing.',
      lang: 'vue',
      codeId: `// tests/Counter.spec.ts
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Counter from '@/components/Counter.vue';

describe('Counter', () => {
  it('renders initial value from props', () => {
    const wrapper = mount(Counter, { props: { start: 5 } });
    expect(wrapper.text()).toContain('5');
  });

  it('increments on button click', async () => {
    const wrapper = mount(Counter);
    await wrapper.find('button.inc').trigger('click');
    expect(wrapper.find('output').text()).toBe('1');
  });

  it('emits change event', async () => {
    const wrapper = mount(Counter);
    await wrapper.find('button.inc').trigger('click');
    expect(wrapper.emitted('change')).toEqual([[1]]);
  });

  it('does not allow negative', async () => {
    const wrapper = mount(Counter);
    await wrapper.find('button.dec').trigger('click');
    expect(wrapper.emitted('change')).toBeUndefined();
  });
});

// Testing store (pinia):
import { setActivePinia, createPinia } from 'pinia';
beforeEach(() => setActivePinia(createPinia()));
it('cart total sums prices', () => {
  useCartStore().add({ id: 1, price: 100, name: 'A' });
  expect(useCartStore().total).toBe(100);
});`,
      codeEn: `// tests/Counter.spec.ts
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Counter from '@/components/Counter.vue';

describe('Counter', () => {
  it('renders initial value from props', () => {
    const wrapper = mount(Counter, { props: { start: 5 } });
    expect(wrapper.text()).toContain('5');
  });

  it('increments on button click', async () => {
    const wrapper = mount(Counter);
    await wrapper.find('button.inc').trigger('click');
    expect(wrapper.find('output').text()).toBe('1');
  });

  it('emits change event', async () => {
    const wrapper = mount(Counter);
    await wrapper.find('button.inc').trigger('click');
    expect(wrapper.emitted('change')).toEqual([[1]]);
  });

  it('does not allow negative', async () => {
    const wrapper = mount(Counter);
    await wrapper.find('button.dec').trigger('click');
    expect(wrapper.emitted('change')).toBeUndefined();
  });
});

// Testing a pinia store:
import { setActivePinia, createPinia } from 'pinia';
beforeEach(() => setActivePinia(createPinia()));
it('cart total sums prices', () => {
  useCartStore().add({ id: 1, price: 100, name: 'A' });
  expect(useCartStore().total).toBe(100);
});`,
      concepts: [
        ["mount vs shallowMount", "mount() merender penuh (termasuk child); shallowMount men-stub child — pilih sesuai isolasi test."],
        ["trigger() selalu async", "await wrapper.find('button').trigger('click') — Vue flush update di microtask; tanpa await, assertion melihat DOM lama."],
        ["Mocking API", "vi.mock('./api') atau stub fetch via msw agar unit test berjalan tanpa network."],
        ["Unit + E2E", "Unit cepat dan murah; E2E (Playwright/Cypress) memeriksa integrasi penuh routing-server-page."],
      ],
      expsId: ["Uji reset button mengembalikan nilai awal.", "Tabel uji semua varian props.", "Tambahkan visual regression sederhana."],
      expsEn: ['Test the reset button restoring the start value', 'Test all prop variants in a table-driven test', 'Add visual regression check.'],
      serId: "Upgrade Counter dengan kontrol stepper (min, max, step) lalu tulis 8 unit test.",
      serEn: 'Improve the Counter with stepper controls (min, max, step) and write 8 unit tests.',
    },
    'week10-performance-nuxt': {
      titleId: 'Performa & Nuxt 3', titleEn: 'Performance & Nuxt 3',
      introId: 'Optimasi boot size, code splitting, lazy/async components, dan Nuxt untuk SSR / Prerendering.',
      introEn: 'Performance tuning, code splitting, lazy and async components, then Nuxt for SSR/prerendering.',
      lang: 'vue',
      codeId: `// === Code splitting manual ===
const HeavyChart = defineAsyncComponent(() => import('./HeavyChart.vue'));

// v-memo: melompat re-render card yang tak berubah
<div v-memo="[item.id, item.qty]" class="row">
  <span>{{ item.name }}</span><span>{{ item.qty }}</span>
</div>

// === Nuxt 3: server rendering + data ===
// pages/index.vue
<script setup>
const { data: products, refresh } = await useAsyncData('products', () =>
  $fetch('/api/products')
);
</script>

// nuxt.config.ts pseudo-config:
// defineNuxtConfig({
//   ssr: true,                    // server rendering HTML siap SEO
//   nitro: { static: false },
//   experimental: { payloadExtraction: true },
// })

// Route-level: /about prerendered; /dashboard SSR; states via nuxt hooks`,
      codeEn: `// === Manual code splitting ===
const HeavyChart = defineAsyncComponent(() => import('./HeavyChart.vue'));

// v-memo: skip re-render when deps unchanged
<div v-memo="[item.id, item.qty]" class="row">
  <span>{{ item.name }}</span><span>{{ item.qty }}</span>
</div>

// === Nuxt 3: server rendering + data ===
// pages/index.vue
<script setup>
const { data: products, refresh } = await useAsyncData('products', () =>
  $fetch('/api/products')
);
</script>

// nuxt.config.ts:
// defineNuxtConfig({
//   ssr: true,                    // SEO-ready HTML at first byte
//   nitro: { static: false },
//   experimental: { payloadExtraction: true },
// })

// Route-level: /about prerendered; /dashboard SSR; states via nuxt hooks`,
      concepts: [
        ["Bundle analysis", "Analisa chunk dengan rollup-plugin-visualizer: pecah chunk raksasa lewat lazy import."],
        ["v-memo & keys", "v-memo di tabel panjang melewati re-render saat deps ([item.id, item.qty]) tidak berubah — ukur sebelum dipakai luas."],
        ["Nuxt SSR + hydration", "SSR mengirim HTML SEO-ready; hydration menyalakan interaksi di client; waspadai hydration mismatch (angka acak, tanggal lokal)."],
        ["Prerender strategy", "Halaman statik (landing) di-prerender; dashboard dinamis SSR; shell CSR untuk area login."],
      ],
      expsId: ["Bench: log jumlah chunk sebelum/sesudah lazy import.", "Ukur v-memo pada tabel 1000 baris.", "Jalankan nuxi generate: berapa halaman prerender vs SSR."],
      expsEn: ['Bench: log chunk count before/after lazy import.', 'Benchmark v-memo on a 1000-row table.', 'Run nuxi generate to see prerendered vs SSR pages.'],
      serId: "Profil Lighthouse: preload font, lazy gambar, lalu bandingkan lab + field data.",
      serEn: 'Profile Lighthouse: preload fonts, lazy images, then benchmark lab + field data.',
    },
    'week11-animations-transitions': {
      titleId: 'Animations & Transitions', titleEn: 'Animations & Transitions',
      introId: "<Transition> menangani enter/leave; mode out-in menyusun koreografi pergantian.",
      introEn: '<Transition> hooks enter/leave animations; mode out-in choreographs swaps.',
      lang: 'vue',
      codeId: `<script setup lang="ts">
import { ref } from 'vue';
const show = ref(true);
const items = ref(['a', 'b', 'c']);
const shuffled = () => items.value = [...items.value].sort(() => Math.random() - 0.5);
const key = ref(0);
</script>

<template>
  <!-- Enter/leave -->
  <Transition name="fade" mode="out-in">
    <div v-if="show" class="toast">Halo!</div>
  </Transition>

  <!-- List fade/move -->
  <TransitionGroup name="list" tag="ul">
    <li v-for="(it, i) in items" :key="it">{{ i }}. {{ it }}</li>
  </TransitionGroup>
  <button @click="shuffled">Shuffle (FLIP)</button>

  <!-- Component swap with unique keys -->
  <Transition name="slide" mode="out-in">
    <Screen :key="key" />
  </Transition>

  <style>
    .fade-enter-active, .fade-leave-active { transition: opacity .3s; }
    .fade-enter-from, .fade-leave-to     { opacity: 0; }
    .list-move { transition: transform .4s; }
    .list-enter-active, .list-leave-active { transition: all .3s; }
    .list-enter-from { transform: translateX(-30px); opacity: 0; }
  </style>
</template>`,
      codeEn: `<script setup lang="ts">
import { ref } from 'vue';
const show = ref(true);
const items = ref(['a', 'b', 'c']);
const shuffled = () => items.value = [...items.value].sort(() => Math.random() - 0.5);
const key = ref(0);
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div v-if="show" class="toast">Hello!</div>
  </Transition>

  <TransitionGroup name="list" tag="ul">
    <li v-for="(it, i) in items" :key="it">{{ i }}. {{ it }}</li>
  </TransitionGroup>
  <button @click="shuffled">Shuffle (FLIP)</button>

  <Transition name="slide" mode="out-in">
    <Screen :key="key" />
  </Transition>

  <style>
    .fade-enter-active, .fade-leave-active { transition: opacity .3s; }
    .fade-enter-from, .fade-leave-to     { opacity: 0; }
    .list-move { transition: transform .4s; }
    .list-enter-active, .list-leave-active { transition: all .3s; }
    .list-enter-from { transform: translateX(-30px); opacity: 0; }
  </style>
</template>`,
      concepts: [
        ["transition vs TransitionGroup", "<Transition> untuk pergantian elemen tunggal; <TransitionGroup> untuk list dengan class move (FLIP)."],
        ["mode out-in", "Mencegah overlap dua komponen; keluar dulu, baru masuk — koreografi bersih."],
        ["CSS classes mapping", ".fade-enter-from (gaya awal) -> .fade-enter-active (berjalan) -> selesai; konvensi CSS default Vue sudah rapi."],
        ["JS hooks", "@before-enter/@enter/@after-enter untuk animasi JS (gsap, dsb) saat CSS tidak cukup."],
      ],
      expsId: ["Ganti fade dengan kurva cubic-bezier bouncy.", "Tambah stagger delay per item.", "Bandingkan mode in-out vs out-in."],
      expsEn: ['Swap fade for a bouncy cubic-bezier curve', 'Add per-item stagger delays', 'Compare in-out vs out-in modes.'],
      serId: "Bangun tab panel beranimasi dengan motion sadar-scroll.",
      serEn: 'Create an animated carousel of tabs with both transition timing modes and scrolling behavior.',
    },
    'week12-capstone': {
      titleId: 'Capstone: SaaS Dashboard', titleEn: 'Capstone: SaaS Dashboard',
      introId: 'Menggabungkan semua bagian dari routing, store, provide/inject, testing, dan deployment.',
      introEn: 'Combines routing, store, provide/inject, testing, and deployment.',
      lang: 'vue',
      codeId: `<!-- Capstone: SaaS analytics dashboard -->
<!-- src/main.ts: -->
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import { provideTheme } from '@/composables/useTheme';
import './style.css';

const app = createApp(App);
app.use(createPinia()).use(router);
app.provide('apiBase', import.meta.env.VITE_API_BASE);
provideTheme();
app.mount('#app');

<!-- src/App.vue: shell -->
<template>
  <header>
    <ThemeToggle />
    <CartBadge />            <!-- Pinia state -->
  </header>
  <router-view />            <!-- lazy routes -->
  <Teleport to="body">
    <Modals />               <!-- global modals -->
  </Teleport>
</template>

<!-- feature slice pattern -->
<!-- src/features/orders/ -->
// api.ts       — endpoints /api/orders
// store.ts     — defineStore('orders', () => {...})
// components/  — OrdersTable.vue, OrderRow.vue
// views/       — OrdersList.vue (route-driven via lazy import)
// Router: lazy per feature: () => import('@/features/orders/views/OrdersList.vue')`,
      codeEn: `<!-- Capstone: SaaS analytics dashboard -->
<!-- src/main.ts -->
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import { provideTheme } from '@/composables/useTheme';
import './style.css';

const app = createApp(App);
app.use(createPinia()).use(router);
app.provide('apiBase', import.meta.env.VITE_API_BASE);
provideTheme();
app.mount('#app');

<!-- src/App.vue shell -->
<template>
  <header>
    <ThemeToggle />
    <CartBadge />            <!-- Pinia state -->
  </header>
  <router-view />            <!-- lazy routes -->
  <Teleport to="body">
    <Modals />
  </Teleport>
</template>

<!-- Feature slice pattern -->
<!-- src/features/orders/ -->
// api.ts       — /api/orders endpoints
// store.ts     — defineStore('orders', () => {...})
// components/  — OrdersTable.vue, OrderRow.vue
// views/       — OrdersList.vue (route-loaded)
// Router: lazy per feature: () => import('@/features/orders/views/OrdersList.vue')`,
      concepts: [
        ["Architecture layout", "features/ per domain (orders, products) memisahkan tanggung jawab dan menghasilkan chunk lazy per fitur."],
        ["DI & config", "main.ts: provide apiBase, konsumsi di API clients — konfigurasi tanpa duplikasi."],
        ["Route lazy-loading", "Chunk per feature; pasang juga meta (requiresAuth) di level route."],
        ["Testing & deploy", "Unit menguji store + komponen; E2E happy path; deploy: build + CDN (static) atau SSR via Nuxt."],
      ],
      expsId: ["Tambahkan feature 'settings' untuk preferensi UI per user.", "Jalankan coverage dan tambahkan test.", "Susun deploy checklist: CI, budget performa."],
      expsEn: ['Add a settings feature with per-user UI preferences.', 'Run coverage reports and expand tests.', 'Deploy checklist: DX, CI, performance budget.'],
      serId: 'Kumpulkan semua kickoffs: tulis README arsitektur + onboarding 10 menit untuk dev baru.',
      serEn: 'Write an architecture README so a new dev onboards in 10 minutes.',
    },
  },

  angular: {
    'week6-routing': {
      titleId: 'Angular Router', titleEn: 'Angular Router',
      introId: "Rute modern berbasis standalone component dengan functional guard.",
      introEn: 'Modern standalone routes with functional guards.',
      lang: 'typescript',
      codeId: `// app.routes.ts — standalone API
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'products', loadComponent: () => import('./products/list.component').then(m => m.ListComponent) },
  { path: 'products/:id', loadComponent: () => import('./products/detail.component').then(m => m.DetailComponent) },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
  },
  { path: '**', redirectTo: '' },
];

// functional guard (no class-based anymore)
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isLogged ? true : router.createUrlTree(['/login'], { queryParams: { redirect: state.url } });
};

// reading params in a component
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  template: '<h1>Produk {{ id() }}</h1>',
})
export class DetailComponent {
  private route = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id');
}`,
      codeEn: `// app.routes.ts — standalone API
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'products', loadComponent: () => import('./products/list.component').then(m => m.ListComponent) },
  { path: 'products/:id', loadComponent: () => import('./products/detail.component').then(m => m.DetailComponent) },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
  },
  { path: '**', redirectTo: '' },
];

// functional guard (no class-based anymore)
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isLogged ? true : router.createUrlTree(['/login'], { queryParams: { redirect: state.url } });
};

// reading params in a component
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  template: '<h1>Product {{ id() }}</h1>',
})
export class DetailComponent {
  private route = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id');
}`,
      concepts: [
        ["CanActivateFn", "Functional guard berbasis inject(); menggantikan class-based guard lama yang deprecated."],
        ["loadComponent lazy loading", "Chunk per komponen: initial bundle kecil, panel admin baru diunduh saat dikunjungi."],
        ["Resolver data", "ResolveFn mem-fetch data sebelum route aktif; komponen membaca hasilnya dari route data."],
        ["Navigation events", "router.events (stream) untuk progress bar/loading global; filter NavigationStart/End."],
      ],
      expsId: ['Buat guard "canDeactivate" yang konfirmasi sebelum menavigasi.', 'Atur route custom matching: /users/:id(\\d+).', 'Resolve user detail via resolver.'],
      expsEn: ['Add a canDeactivate guard prompting on navigation.', 'Match numeric route params with regex.', 'Preload user detail via a resolver.'],
      serId: "Implementasi aturan redirect kanonik dan penanganan 404 dengan konfigurasi minimal.",
      serEn: 'Implement canonical redirects and smart 404 handling with minimal config.',
    },
    'week7-reactive-forms': {
      titleId: 'Reactive Forms & Validation', titleEn: 'Reactive Forms & Validation',
      introId: 'FormControl + validator sync/async arg; typed forms.',
      introEn: 'FormControl with sync/async validators and typed forms.',
      lang: 'typescript',
      codeId: `// checkout.component.ts
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule, FormBuilder, Validators, AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: \`
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="name" placeholder="Nama" />
      @if (form.controls.name.hasError('required')) { <small>Nama wajib</small> }
      <input formControlName="coupon" />
      @if (form.controls.coupon.hasError('couponExpired')) { <small>Kupon kedaluwarsa</small> }
      <button [disabled]="form.pending || form.invalid">Bayar</button>
    </form>\`,
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    coupon: ['', [Validators.minLength(6), this.couponActive]],
  });

  couponActive(control: AbstractControl): ValidationErrors | null {
    const ok = control.value && !control.value.toUpperCase().includes('EXPIRED');
    return ok ? null : { couponExpired: true };
  }

  submit() {
    if (this.form.valid) {
      console.log('Order payload', this.form.value);
    }
  }
}`,
      codeEn: `// checkout.component.ts
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule, FormBuilder, Validators, AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: \`
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="name" placeholder="Name" />
      @if (form.controls.name.hasError('required')) { <small>Name required</small> }
      <input formControlName="coupon" />
      @if (form.controls.coupon.hasError('couponExpired')) { <small>Coupon expired</small> }
      <button [disabled]="form.pending || form.invalid">Pay</button>
    </form>\`,
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    coupon: ['', [Validators.minLength(6), this.couponActive]],
  });

  couponActive(control: AbstractControl): ValidationErrors | null {
    const ok = control.value && !control.value.toUpperCase().includes('EXPIRED');
    return ok ? null : { couponExpired: true };
  }

  submit() {
    if (this.form.valid) {
      console.log('Order payload', this.form.value);
    }
  }
}`,
      concepts: [
        ["Typed FormGroup", "fb.group menginferensi tipe sehingga form.controls.name tetap typed di compile time."],
        ["Sync vs async validators", "Validator sinkron dijalankan langsung; validator async (cek kupon ke server) mengembalikan Promise/Observable."],
        ["Control state", "touched, dirty, valid, pending, disabled — template mengikat state ke pesan error dan CSS."],
        ["FormArray & nested", "FormArray untuk baris item; FormGroup bersarang untuk parent-child."],
      ],
      expsId: ["Tambahkan FormArray dinamis item order: tombol push + remove.", "Buat async validator cek kupon via http (mocked).", "Gunakan patchValue + reset untuk mengisi draft."],
      expsEn: ['Add a dynamic FormArray of order items with add/remove.', 'Build an async validator checking a coupon via HTTP (mocked).', 'Use patchValue to populate drafts.'],
      serId: "Buat dynamic form builder yang membaca schema JSON lalu merender kontrol dan validator-nya.",
      serEn: 'Create a dynamic form builder driven by JSON schema with validation and nested child controls.',
    },
    'week8-http-client': {
      titleId: 'HttpClient & Interceptors', titleEn: 'HttpClient & Interceptors',
      introId: 'fetch JSON, error handling, loading state signals, dan functional interceptor token.',
      introEn: 'Json fetching, error handling, loading state signals, plus a token interceptor.',
      lang: 'typescript',
      codeId: `// product.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal, computed } from '@angular/core';

export interface Product { id: number; name: string; price: number; }

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  products = signal<Product[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  total = computed(() => this.products().reduce((s, p) => s + p.price, 0));

  load() {
    this.loading.set(true);
    this.http.get<Product[]>('/api/products').subscribe({
      next: (data) => { this.products.set(data); this.loading.set(false); },
      error: (err) => { this.error.set(err.message); this.loading.set(false); },
    });
  }
}

// app.config.ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

export const appConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(withInterceptors([authInterceptor, retryInterceptor])),
  ],
};

// interceptors.ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwt');
  return next(token ? req.clone({ setHeaders: { Authorization: 'Bearer ' + token } }) : req);
};

export const retryInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(retry({ count: 2, delay: 400 }));`,
      codeEn: `// product.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal, computed } from '@angular/core';

export interface Product { id: number; name: string; price: number; }

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  products = signal<Product[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  total = computed(() => this.products().reduce((s, p) => s + p.price, 0));

  load() {
    this.loading.set(true);
    this.http.get<Product[]>('/api/products').subscribe({
      next: (data) => { this.products.set(data); this.loading.set(false); },
      error: (err) => { this.error.set(err.message); this.loading.set(false); },
    });
  }
}

// app.config.ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

export const appConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(withInterceptors([authInterceptor, retryInterceptor])),
  ],
};

// interceptors.ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwt');
  return next(token ? req.clone({ setHeaders: { Authorization: 'Bearer ' + token } }) : req);
};

export const retryInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(retry({ count: 2, delay: 400 }));`,
      concepts: [
        ["Observable stream", "http.get memunculkan observable; gunakan takeUntilDestroyed agar auto-unsubscribe saat komponen hancur."],
        ["Signals + computed", "signal()/computed() memberi state reaktif modern — pas dengan zoneless change detection."],
        ["Functional interceptors", "HttpInterceptorFn mudah diuji dan dirantai berurutan (auth -> logging -> retry)."],
        ["Error handling", "Retry dengan backoff, catchError memetakan ke pesan ramah, tap() untuk state loading."],
      ],
      expsId: ["Tampilkan skeleton saat loading() true.", "Retry interceptor: 3x dengan exponential backoff.", "Tambah CRUD di ProductService: post/put/delete via RxJS."],
      expsEn: ['Add a skeleton while loading=true', 'Retry 3x with exponential backoff', 'CRUD via post/put/delete calls in the product service.'],
      serId: 'Buat optimistic update: patch UI _sebelum_ server confirm; rollback pada error.',
      serEn: 'Implement optimistic updates: patch UI before the server confirms; roll back on error.',
    },
    'week9-rxjs': {
      titleId: 'Rxjs fundamentals', titleEn: 'RxJS Fundamentals',
      introId: "Operator inti + combineLatest dan pola Subjects.",
      introEn: 'Core operators plus combineLatest and Subjects.',
      lang: 'typescript',
      codeId: `import { fromEvent, interval, Subject, BehaviorSubject, of } from 'rxjs';
import {
  map, filter, debounceTime, switchMap, take,
  scan, catchError, combineLatest, merge,
} from 'rxjs/operators';

// 1) User typing → search
const input = document.querySelector('#search') as HTMLInputElement;
const results$ = fromEvent(input, 'input').pipe(
  debounceTime(400),
  map(() => (input as HTMLInputElement).value),
  filter((q) => q.length >= 2),
  switchMap((q) => fetch('/api/search?q=' + q).then((r) => r.json())
    .catch(() => of([]))),
);
results$.subscribe((items) => console.log('Search:', items));

// 2) Behavioral subject: current user state
const user$ = new BehaviorSubject<{ id: number; name: string } | null>(null);
user$.subscribe((u) => console.log('User:', u));
user$.next({ id: 1, name: 'Budi' });

// 3) combineLatest: what drives the cart bar
const cart$ = new Subject<{ total: number; count: number }>();
const discounts$ = interval(5000).pipe(map((i) => 0.1 + i * 0.01), take(3));

combineLatest([cart$, discounts$])
  .pipe(map(([cart, diskon]) => cart.total * (1 - diskon)))
  .subscribe((total) => console.log('Final total', total));

cart$.next({ total: 200000, count: 3 });`,
      codeEn: `import { fromEvent, interval, Subject, BehaviorSubject, of } from 'rxjs';
import {
  map, filter, debounceTime, switchMap, take,
  catchError, combineLatest,
} from 'rxjs/operators';

// 1) Typing → search
const input = document.querySelector('#search') as HTMLInputElement;
const results$ = fromEvent(input, 'input').pipe(
  debounceTime(400),
  map(() => input.value),
  filter((q) => q.length >= 2),
  switchMap((q) => fetch('/api/search?q=' + q).then((r) => r.json())
    .catch(() => of([]))),
);
results$.subscribe((items) => console.log('Search:', items));

// 2) Behavior subject: current user
const user$ = new BehaviorSubject<{ id: number; name: string } | null>(null);
user$.subscribe((u) => console.log('User:', u));
user$.next({ id: 1, name: 'Budi' });

// 3) combineLatest: drives the cart summary
const cart$ = new Subject<{ total: number; count: number }>();
const discounts$ = interval(5000).pipe(map((i) => 0.1 + i * 0.01), take(3));

combineLatest([cart$, discounts$])
  .pipe(map(([cart, discount]) => cart.total * (1 - discount)))
  .subscribe((total) => console.log('Final total', total));

cart$.next({ total: 200000, count: 3 });`,
      concepts: [
        ["Observable contract", "cold vs hot; subscribe memulai eksekusi; selalu teardown lewat unsubscribe/takeUntil."],
        ["Operator inti: map/switchMap/combineLatest", "map memetakan nilai; switchMap membatalkan request lama saat request baru datang; combineLatest menggabungkan nilai terkini."],
        ["Subject vs BehaviorSubject", "Subject hanya broadcast ke event berikutnya; BehaviorSubject menyimpan nilai terakhir untuk subscriber baru — pas untuk state user."],
        ["take/takeUntil", "Batasi langganan: take(1) untuk one-shot, takeUntil(destroy$) saat unmount."],
      ],
      expsId: ["Debounce input dan batasi panjang query.", "Gabungkan dua source data via merge.", "Tulis retry with backoff."],
      expsEn: ['Debounce a filter with a length limit', 'Merge two data loaders', 'chain and retry with backoff'],
      serId: "Bangun typeahead: cari saat ketik, batalkan request basi (switchMap), tampilkan hasil terbaik.",
      serEn: 'Search as user types, cancel outstanding requests, and render best matches.',
    },
    'week10-state-management': {
      titleId: 'State management dalam Angular', titleEn: 'Angular State Management',
      introId: "Signal store + service: state global modern tanpa NgRx.",
      introEn: 'Signalized stores and computed kernels — modern state.',
      lang: 'typescript',
      codeId: `import { Injectable, computed, signal, inject } from '@angular/core';

export interface CartItem { id: number; name: string; price: number; qty: number }

@Injectable({ providedIn: 'root' })
export class CartSignalStore {
  private readonly items = signal<CartItem[]>([]);
  private readonly coupon = signal<string | null>(null);

  readonly count = computed(() => this.items().reduce((n, i) => n + i.qty, 0));
  readonly total = computed(() => this.items().reduce((s, i) => s + i.price * i.qty, 0));
  readonly totalWithCoupon = computed(() => {
    const t = this.total();
    return this.coupon() === 'NG10' ? t * 0.9 : t;
  });

  add(item: Omit<CartItem, 'qty'>) {
    this.items.update((list) => {
      const i = list.findIndex((x) => x.id === item.id);
      if (i === -1) return [...list, { ...item, qty: 1 }];
      const copy = [...list];
      copy[i] = { ...copy[i], qty: copy[i].qty + 1 };
      return copy;
    });
  }

  applyCoupon(code: string) { this.coupon.set(code.toUpperCase()); }
}

@Component({
  selector: 'app-cart-badge',
  standalone: true,
  template: \`
    <span class="badge">{{ store.count() }} items — {{ store.totalWithCoupon() | currency }}</span>\`,
})
export class CartBadgeComponent {
  protected store = inject(CartSignalStore);
}`,
      codeEn: `import { Injectable, computed, signal, inject } from '@angular/core';

export interface CartItem { id: number; name: string; price: number; qty: number }

@Injectable({ providedIn: 'root' })
export class CartSignalStore {
  private readonly items = signal<CartItem[]>([]);
  private readonly coupon = signal<string | null>(null);

  readonly count = computed(() => this.items().reduce((n, i) => n + i.qty, 0));
  readonly total = computed(() => this.items().reduce((s, i) => s + i.price * i.qty, 0));
  readonly totalWithCoupon = computed(() => {
    const t = this.total();
    return this.coupon() === 'NG10' ? t * 0.9 : t;
  });

  add(item: Omit<CartItem, 'qty'>) {
    this.items.update((list) => {
      const i = list.findIndex((x) => x.id === item.id);
      if (i === -1) return [...list, { ...item, qty: 1 }];
      const copy = [...list];
      copy[i] = { ...copy[i], qty: copy[i].qty + 1 };
      return copy;
    });
  }

  applyCoupon(code: string) { this.coupon.set(code.toUpperCase()); }
}

@Component({
  selector: 'app-cart-badge',
  standalone: true,
  template: \`
    <span class="badge">{{ store.count() }} items — {{ store.totalWithCoupon() | currency }}</span>\`,
})
export class CartBadgeComponent {
  protected store = inject(CartSignalStore);
}`,
      concepts: [
        ["Signal semantics", "signal().set/update butir halus; computed untuk derivasi; efek bisa dibroadcast — seirama zoneless."],
        ["Service + DI", "Store singleton via providedIn root; komponen inject; scope diatur DI."],
        ["Immutable updates", "update() menyalin array; identity berubah, change detection langsung tahu."],
        ["Kapan cocok", "Pas untuk state global coarse-grained; kombinasikan dengan RxJS untuk alur async yang kompleks."],
      ],
      expsId: ["Tambah remove + hitung total item.", "Validasi kupon saat applyCoupon.", "Persist cart signals ke localStorage."],
      expsEn: ['Add remove + total item count', 'Coupon validation on application', 'Persist cart signals to localStorage.'],
      serId: "Buat ringkasan keranjang per kategori produk yang bisa dilipat, semuanya computed.",
      serEn: 'Build a cart summary grouped by category with collapse toggles, all computed.',
    },
    'week11-testing-angular': {
      titleId: 'Testing Angular: Unit + E2E', titleEn: 'Angular Testing: Unit & E2E',
      introId: "Spesifikasi unit via TestBed + Karma; integrasi dengan testing-library + Cypress.",
      introEn: 'Specs via TestBed + Karma; integration with testing-library + Cypress.',
      lang: 'typescript',
      codeId: `import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CounterComponent } from './counter';

describe('CounterComponent (TestBed unit)', () => {
  let fixture: ComponentFixture<CounterComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CounterComponent);
    el = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('renders initial value', () => {
    expect(el.querySelector('output')!.textContent).toContain('0');
  });

  it('increments on click', () => {
    (el.querySelector('button.inc') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(el.querySelector('output')!.textContent).toContain('1');
  });

  // E2E (cypress style)
  describe('cypress example', () => {
    it('cart flows', () => {
      cy.visit('/');
      cy.injectAxe(); // accessibility scan
      cy.get('.product-card').first().find('button.add').click();
      cy.get('[data-testid=cart-badge]').should('contain', '1 item');
      cy.get('[data-testid=checkout-link]').click();
      cy.url().should('include', '/checkout');
    });
  });
});`,
      codeEn: `import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CounterComponent } from './counter';

describe('CounterComponent (TestBed unit)', () => {
  let fixture: ComponentFixture<CounterComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CounterComponent);
    el = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('renders initial value', () => {
    expect(el.querySelector('output')!.textContent).toContain('0');
  });

  it('increments on click', () => {
    (el.querySelector('button.inc') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(el.querySelector('output')!.textContent).toContain('1');
  });

  // E2E (Cypress style)
  describe('cypress example', () => {
    it('cart flows', () => {
      cy.visit('/');
      cy.injectAxe(); // accessibility scan
      cy.get('.product-card').first().find('button.add').click();
      cy.get('[data-testid=cart-badge]').should('contain', '1 item');
      cy.get('[data-testid=checkout-link]').click();
      cy.url().should('include', '/checkout');
    });
  });
});`,
      concepts: [
        ["TestBed composition", "Isolasi test per spec: konfigurasi providers/mocks di configureTestingModule."],
        ["Query by semantics", "nativeElement bekerja, tetapi @testing-library getByRole/getByLabel lebih tahan refaktor."],
        ["fixture.detectChanges()", "Zona klasik: dipanggil manual; dengan zoneless/signals, scheduling otomatis."],
        ["E2E checklist", "Auth flow, navigasi, baseline a11y — semua harus hijau di jalur utama."],
      ],
      expsId: ["Konversi spec querySelector ke query @testing-library.", "Uji fetch async dengan fake timers."],
      expsEn: ['Convert querySelector specs to @testing-library queries', 'Test async fetch with fake clocks.'],
      serId: 'Tambahkan: snapshot stability test store shape after checkout.',
      serEn: 'Add snapshot stability tests to store shape after checkout.',
    },
    'week12-performance': {
      titleId: 'Optimizing Angular Performance', titleEn: 'Optimizing Angular Performance',
      introId: 'Change detection strategy, memoization, dan on-demand loading.',
      introEn: 'Detection strategy, memoization, and on-demand loading.',
      lang: 'typescript',
      codeId: `import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,    // check when input changes
  template: \`
    @for (p of products(); track p.id) {
      <article class="card">                           <!-- track identity: reconciliation DOM minimal -->
        <h3>{{ p.name }}</h3>
        <span>{{ p.price | currency:'IDR' }}</span>
      </article>
    }
  \`,
})
export class ProductsComponent {
  products = signal<Product[]>([]);
  loading = signal(true);

  async ngOnInit() {
    // deferred loading: chunked paint for long lists
    const chunks = chunk(allProducts, 50);
    for (const c of chunks) {
      this.products.update((prev) => [...prev, ...c]);
      await nextFrame();
    }
    this.loading.set(false);
  }
}`,
      codeEn: `import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    @for (p of products(); track p.id) {
      <article class="card">
        <h3>{{ p.name }}</h3>
        <span>{{ p.price | currency }}</span>
      </article>
    }
  \`,
})
export class ProductsComponent {
  products = signal<Product[]>([]);
  loading = signal(true);

  async ngOnInit() {
    const chunks = chunk(allProducts, 50);
    for (const c of chunks) {
      this.products.update((prev) => [...prev, ...c]);
      await nextFrame();
    }
    this.loading.set(false);
  }
}`,
      concepts: [
        ['OnPush + zoneless', 'OnPush skips checking when input unchanged; combined with zoneless apps; world-class UI responsiveness.'],
        ['@for track', 'Track by identity reduces DOM operations — running browser like recycler.'],
        ['Deferred loading', 'Angular 17 @defer conditionally loads heavy parts (heavy charts) only when scrolled.'],
        ['Budget & bundle analyzer', 'build budgets per route: measure initial, worst-case bytes; tune build.'],
      ],
      expsId: ["Tambah @defer chart berat saat scroll.", "Benchmark render dengan track vs tanpa track.", "Uji network throttle dan rasakan efeknya."],
      expsEn: ['Add @defer on a heavy chart', 'Benchmark track vs untracked rendering', 'Throttle network and experience the difference'],
      serId: 'Use Angular DevTools profiling: flame graphs in component tree.',
      serEn: 'Profile with Angular DevTools flame graphs on a real component tree.',
    },
    'week13-advanced-patterns': {
      titleId: 'Pola Lanjutan: DI, Resolvers & Interceptors', titleEn: 'Advanced Patterns: DI, Resolvers & Interceptors',
      introEn: 'Advanced patterns: DI, resolvers, interceptors.',
      introId: 'Dependency injection advanced, resolvers, layer interceptor.',
      lang: 'typescript',
      codeId: `import { Injectable, InjectionToken, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const API_BASE = new InjectionToken<string>('api_base');

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private http = inject(HttpClient);
  private base = inject(API_BASE);

  get(id: string) { return this.http.get<Order>(\`\${this.base}/orders/\${id}\`); }
  create(payload: Order) { return this.http.post<Order>(\`\${this.base}/orders\`, payload); }
}

// Resolver-based preloading data
import { ResolveFn } from '@angular/router';
export const orderResolver: ResolveFn<Order> = (route, state) =>
  inject(OrdersService).get(route.paramMap.get('id')!);

// Route configuration with resolve
{
  path: 'orders/:id',
  resolve: { order: orderResolver },
  loadComponent: () => import('./order-detail.component').then(m => m.OrderDetailComponent),
}

// Component-in-the construct: inject + signal pattern
export class OrderDetailComponent {
  order = inject(ActivatedRoute).snapshot.data['order'];
}`,
      codeEn: `import { Injectable, InjectionToken, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const API_BASE = new InjectionToken<string>('api_base');

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private http = inject(HttpClient);
  private base = inject(API_BASE);

  get(id: string) { return this.http.get<Order>(\`\${this.base}/orders/\${id}\`); }
  create(payload: Order) { return this.http.post<Order>(\`\${this.base}/orders\`, payload); }
}

// Resolver-based pre-loading
import { ResolveFn } from '@angular/router';
export const orderResolver: ResolveFn<Order> = (route) =>
  inject(OrdersService).get(route.paramMap.get('id')!);

// Route config wiring
{
  path: 'orders/:id',
  resolve: { order: orderResolver },
  loadComponent: () => import('./order-detail.component').then(m => m.OrderDetailComponent),
}

export class OrderDetailComponent {
  order = inject(ActivatedRoute).snapshot.data['order'];
}`,
      concepts: [
        ["InjectionToken DI", "Token type-safe: provide(API_BASE, { useValue: env }) — override di tests."],
        ["Resolver pre-render", "resolve dijalankan sebelum route aktif; data hidup di route data, komponen tak pernah null."],
        ["Layered concerns", "Guard memutus ijin, resolver menyiapkan data, interceptor memoles HTTP — tiga lapis."],
        ["inject() fungsional", "inject() langsung di field/konstruktor mengurangi boilerplate dan lebih ramah tree-shake."],
      ],
      expsId: ["Ambil API_BASE dari useFactory sesuai environment.", "Batalkan fetch stale dengan switchMap."],
      expsEn: ['Environment-driven API_BASE via useFactory', 'Cancel stale fetches with switchMap.'],
      serId: "Catat request pending lewat interceptor lalu lihat di tab network DevTools.",
      serEn: 'Log pending requests via an interceptor and visualize them in DevTools.',
    },
    'week14-capstone': {
      titleId: 'Capstone: Enterprise Resource Planning', titleEn: 'Capstone: Enterprise Resource Planning',
      introId: 'Sistemintimeer enterprise: modul orders + clients + deployment.',
      introEn: 'An enterprise system: orders + clients + deployment.',
      lang: 'typescript',
      codeId: `// main.ts — final architecture
 // lazy feature modules per domain

const routes: Routes = [
  { path: '', component: LayoutComponent, canActivate: [authGuard],
    children: [
      { path: 'orders',  loadChildren: () => import('./orders/orders.routes').then(m => m.routes) },
      { path: 'reports', loadChildren: () => import('./reports/reports.routes').then(m => m.routes) },
      { path: 'settings', loadChildren: () => import('./settings/settings.routes').then(m => m.routes) },
    ] },
];

// orders.routes.ts
export const routes: Routes = [
  { path: '', data: { title: 'Orders list' },
    loadComponent: () => import('./list.component').then(m => m.ListComponent),
    resolve: { orders: ordersResolver } },
  { path: 'new',
    loadComponent: () => import('./new.component').then(m => m.NewComponent) },
  { path: ':id',
    loadComponent: () => import('./detail.component').then(m => m.DetailComponent),
    resolve: { order: orderResolver } },
];

// layout.shell with header nav, side menu, main VIEW
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MenuComponent],
  template: \`
    <nav>
      <a routerLink="/orders" routerLinkActive="active">Orders</a>
      <a routerLink="/reports" routerLinkActive="active">Reports</a>
    </nav>
    <router-outlet></router-outlet>
  \`,
})
export class LayoutComponent {}`,
      codeEn: `// main.ts — final architecture with lazy features

const routes: Routes = [
  { path: '', component: LayoutComponent, canActivate: [authGuard],
    children: [
      { path: 'orders',  loadChildren: () => import('./orders/orders.routes').then(m => m.routes) },
      { path: 'reports', loadChildren: () => import('./reports/reports.routes').then(m => m.routes) },
      { path: 'settings', loadChildren: () => import('./settings/settings.routes').then(m => m.routes) },
    ] },
];

// orders.routes.ts
export const routes: Routes = [
  { path: '', data: { title: 'Orders list' },
    loadComponent: () => import('./list.component').then(m => m.ListComponent),
    resolve: { orders: ordersResolver } },
  { path: 'new', loadComponent: () => import('./new.component').then(m => m.NewComponent) },
  { path: ':id',
    loadComponent: () => import('./detail.component').then(m => m.DetailComponent),
    resolve: { order: orderResolver } },
];

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: \`
    <nav>
      <a routerLink="/orders" routerLinkActive="active">Orders</a>
      <a routerLink="/reports" routerLinkActive="active">Reports</a>
    </nav>
    <router-outlet></router-outlet>
  \`,
})
export class LayoutComponent {}`,
      concepts: [
        ["Domain modules", "Satu feature module per domain (orders/reports/settings) menjaga skala enterprise."],
        ["Resolver pre-loading", "Data tersedia tepat saat komponen render: route resolve dulu, spinner tak menyala."],
        ["Design tokens & theming", "CSS variables + tema dark/light dari design system."],
        ["Deployment", "CDN caching, service worker (NGSW), analytics, dan error tracking."],
      ],
      expsId: ["Tambah modul SLA berisi screen metrics.", "Benchmark initial load setelah lazy feature aktif."],
      expsEn: ['Add metrics/SLA to feature modules', 'Benchmark initial load after lazy stacking'],
      serId: "Tulis README sendiri: diagram arsitektur, setup, run, test, dan SOP deploy.",
      serEn: 'Write the README: architecture diagram, setup, run, test, deploy SOP.',
    },
  },
};
