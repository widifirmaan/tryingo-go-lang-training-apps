import { BaseGenerator } from './lib/base-generator.mjs';

const gen = new BaseGenerator('vue', 'Vue');

const LEVELS = [
  { levelId: 'beginer', nameId: 'Pemula', nameEn: 'Beginner', descId: 'Dasar Vue: template, reactivity, directives, events.', descEn: 'Vue basics: template, reactivity, directives, events.' },
  { levelId: 'intermediate', nameId: 'Menengah', nameEn: 'Intermediate', descId: 'Vue menengah: components, router, Pinia.', descEn: 'Intermediate Vue: components, router, Pinia.' },
  { levelId: 'advanced', nameId: 'Lanjutan', nameEn: 'Advanced', descId: 'Vue lanjutan: testing, performance, Nuxt, proyek.', descEn: 'Advanced Vue: testing, performance, Nuxt, project.' },
];

const MODULES = [
  {
    week: 1, level: 'beginer', topicId: 'dasar-vue',
    titleId: 'Dasar Vue & Template Syntax', titleEn: 'Vue Basics & Template Syntax',
    programId: 'Halo Vue', programEn: 'Hello Vue',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'vue',
    code: `// Vue = progressive framework untuk membangun UI
const { createApp } = Vue;
const app = createApp({
  data() { return { message: 'Halo, Vue!', name: 'Tryngo', isDark: false, count: 0 }; },
  methods: { toggle() { this.isDark = !this.isDark; }, increment() { this.count++; } },
  computed: { greeting() { return this.message + ' Selamat datang, ' + this.name; } },
});
app.mount('#app');
console.log('Vue app siap dijalankan');`,
    objectivesId: ['Memahami Vue sebagai progressive framework', 'Template syntax: {{ }} untuk text interpolation', 'Directives: v-bind, v-on, v-if, v-for, v-model', 'Reactivity: data() return object yang reaktif', 'Methods dan Computed properties'],
    objectivesEn: ['Understand Vue as a progressive framework', 'Template syntax: {{ }} for text interpolation', 'Directives: v-bind, v-on, v-if, v-for, v-model', 'Reactivity: data() returns reactive object', 'Methods and Computed properties'],
    explanationId: '### Template Syntax\n{{ }} = text interpolation. Update otomatis saat data berubah.\n\n### Directives\nv-bind, v-on, v-if, v-for, v-model.\n\n### Reactivity\nData di-return dari data() jadi reactive.\n\n### Computed vs Method\nComputed = cached, hanya re-evaluate saat dependency berubah.',
    explanationEn: '### Template Syntax\n{{ }} = text interpolation, auto-updates.\n\n### Directives\nv-bind, v-on, v-if, v-for, v-model.\n\n### Reactivity\nData from data() becomes reactive.\n\n### Computed vs Method\nCached, only re-evaluates on dependency change.',
    experimentsId: ['Ubah data dan lihat UI update', 'Tambah computed property baru', 'Buat conditional rendering', 'Render list dengan v-for'],
    experimentsEn: ['Change data and observe UI update', 'Add new computed property', 'Create conditional rendering', 'Render list with v-for'],
    challengeId: 'Buat counter app dengan: increment, decrement, reset. Tampilkan pesan berbeda berdasarkan nilai.',
    challengeEn: 'Build a counter app with: increment, decrement, reset. Show different messages based on value.',
    summaryId: 'Minggu 1 dari 12: **Dasar Vue & Template Syntax** (Level: Pemula). Minggu depan: **Reactivity & Composition API**.',
    summaryEn: 'Week 1 of 12: **Vue Basics & Template Syntax** (Level: Beginner). Next week: **Reactivity & Composition API**.',
  },
  {
    week: 2, level: 'beginer', topicId: 'reactivity-composition',
    titleId: 'Reactivity & Composition API', titleEn: 'Reactivity & Composition API',
    programId: 'Todo App', programEn: 'Todo App',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'vue',
    code: `// Composition API = cara modern menulis komponen Vue 3
const { createApp, ref, reactive, computed, watch } = Vue;
const app = createApp({
  setup() {
    const count = ref(0);
    const message = ref('Halo Vue!');
    const user = reactive({ name: 'Budi', age: 25 });
    const doubled = computed(() => count.value * 2);
    const greeting = computed(() => message.value + ' ' + user.name);
    watch(count, (newVal, oldVal) => { console.log('Count berubah dari ' + oldVal + ' ke ' + newVal); });
    function increment() { count.value++; }
    function updateName(name) { user.name = name; }
    return { count, message, user, doubled, greeting, increment, updateName };
  },
});
app.mount('#app');
console.log('Composition API siap digunakan');`,
    objectivesId: ['ref() untuk reactive primitive values', 'reactive() untuk reactive objects', 'computed() untuk derived values', 'watch() untuk side effects saat value berubah', '.value untuk ref di JavaScript'],
    objectivesEn: ['ref() for reactive primitive values', 'reactive() for reactive objects', 'computed() for derived values', 'watch() for side effects on value change', '.value for ref in JavaScript'],
    explanationId: '### ref vs reactive\nref = primitive (number, string, boolean). Harus .value di JS.\nreactive = object. Langsung akses field.\n\n### computed\nDerived value. Cached, re-evaluate saat dependency berubah.\n\n### watch\nSide effect saat value berubah. Dapat newVal dan oldVal.',
    explanationEn: '### ref vs reactive\nref = primitives, needs .value in JS.\nreactive = objects, direct access.\n\n### computed\nCached derived values.\n\n### watch\nSide effects on value change.',
    experimentsId: ['Buat ref untuk string dan ubah nilainya', 'Watch multiple sources dengan array', 'Buat computed dengan getter dan setter', 'Bandingkan ref dan reactive untuk object'],
    experimentsEn: ['Create ref for string and change its value', 'Watch multiple sources with array', 'Create computed with getter and setter', 'Compare ref and reactive for objects'],
    challengeId: 'Buat form dengan validasi reaktif: nama (min 3 char), email (harus @), password (min 6 char).',
    challengeEn: 'Build a form with reactive validation: name (min 3 chars), email (must have @), password (min 6 chars).',
    summaryId: 'Minggu 2 dari 12: **Reactivity & Composition API** (Level: Pemula). Minggu depan: **Directives & Events**.',
    summaryEn: 'Week 2 of 12: **Reactivity & Composition API** (Level: Beginner). Next week: **Directives & Events**.',
  },
  {
    week: 3, level: 'beginer', topicId: 'directives-events',
    titleId: 'Directives & Events', titleEn: 'Directives & Events',
    programId: 'Form Interaktif', programEn: 'Interactive Form',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'vue',
    code: `// Directives = special attributes dengan prefix v-
const { createApp, ref } = Vue;
const app = createApp({
  setup() {
    const text = ref('');
    const isVisible = ref(true);
    const items = ref(['Vue', 'React', 'Angular']);
    const newItem = ref('');
    function addItem() { if (newItem.value.trim()) { items.value.push(newItem.value); newItem.value = ''; } }
    function removeItem(index) { items.value.splice(index, 1); }
    return { text, isVisible, items, newItem, addItem, removeItem };
  },
});
app.mount('#app');
console.log('Directives & Events siap digunakan');`,
    objectivesId: ['v-model: two-way binding untuk form inputs', 'v-show vs v-if: kapan pakai masing-masing', 'v-for: list rendering dengan :key', 'Event modifiers: .prevent, .stop, .once', 'Key modifiers: .enter, .tab, .delete'],
    objectivesEn: ['v-model: two-way binding for form inputs', 'v-show vs v-if: when to use each', 'v-for: list rendering with :key', 'Event modifiers: .prevent, .stop, .once', 'Key modifiers: .enter, .tab, .delete'],
    explanationId: '### v-model\nTwo-way binding: input -> state, state -> input. Otomatis sync.\n\n### v-show vs v-if\nv-show = toggle CSS display (selalu render).\nv-if = conditional render (destroy/create element).\n\n### v-for\nRender list. :key = unique identifier untuk tracking.',
    explanationEn: '### v-model\nTwo-way binding, auto-sync.\n\n### v-show vs v-if\nv-show = CSS toggle, v-if = conditional render.\n\n### v-for\nList rendering with :key.',
    experimentsId: ['Buat form dengan multiple input types', 'Implementasikan keyboard shortcuts', 'Buat conditional rendering kompleks', 'Tambah transition saat item muncul/hilang'],
    experimentsEn: ['Create form with multiple input types', 'Implement keyboard shortcuts', 'Create complex conditional rendering', 'Add transitions on item appear/disappear'],
    challengeId: 'Buat shopping cart: tambah item, hapus item, update quantity, total price.',
    challengeEn: 'Build a shopping cart: add item, remove item, update quantity, total price.',
    summaryId: 'Minggu 3 dari 12: **Directives & Events** (Level: Pemula). Minggu depan: **Components & Props**.',
    summaryEn: 'Week 3 of 12: **Directives & Events** (Level: Beginner). Next week: **Components & Props**.',
  },
  {
    week: 4, level: 'beginer', topicId: 'components-props',
    titleId: 'Components & Props', titleEn: 'Components & Props',
    programId: 'Komponen Produk', programEn: 'Product Components',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'vue',
    code: `// Components = reusable UI building blocks
const { createApp, ref } = Vue;
const ProductCard = {
  props: { name: { type: String, required: true }, price: { type: Number, required: true }, isAvailable: { type: Boolean, default: true } },
  emits: ['add-to-cart'],
  template: '<div><h3>{{ name }}</h3><p>Rp {{ price.toLocaleString("id-ID") }}</p><button @click="$emit(\'add-to-cart\', name)" :disabled="!isAvailable">Tambah</button></div>',
};
const app = createApp({
  components: { ProductCard },
  setup() {
    const products = ref([{ name: 'Laptop', price: 15000000, isAvailable: true }, { name: 'Mouse', price: 250000, isAvailable: true }]);
    const cart = ref([]);
    function addToCart(name) { cart.value.push(name); }
    return { products, cart, addToCart };
  },
});
app.mount('#app');
console.log('Components & Props siap digunakan');`,
    objectivesId: ['Membuat dan meregister komponen', 'Props: definisi, type validation, required, default', 'Emits: custom events dari child ke parent', 'One-way data flow: parent -> child via props', 'Slots: konten dinamis di dalam komponen'],
    objectivesEn: ['Create and register components', 'Props: definition, type validation, required, default', 'Emits: custom events from child to parent', 'One-way data flow: parent -> child via props', 'Slots: dynamic content inside components'],
    explanationId: '### Components\nReusable UI blocks. Register di components: {}.\n\n### Props\nDefinisikan type, required, default. Validasi otomatis.\n\n### Emits\n$emit("event", data) = kirim event ke parent.\n\n### Slots\n<slot /> = konten dari parent.',
    explanationEn: '### Components\nReusable UI blocks.\n\n### Props\nDefine type, required, default.\n\n### Emits\n$emit sends event to parent.\n\n### Slots\n<slot /> for parent content.',
    experimentsId: ['Buat komponen dengan multiple props', 'Tambah named slots', 'Implementasikan prop validation custom', 'Buat komponen dengan emit events'],
    experimentsEn: ['Create component with multiple props', 'Add named slots', 'Implement custom prop validation', 'Create component with emit events'],
    challengeId: 'Buat product catalog: ProductCard, ProductList, CartSummary.',
    challengeEn: 'Build a product catalog: ProductCard, ProductList, CartSummary.',
    summaryId: 'Minggu 4 dari 12: **Components & Props** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Vue Router**.',
    summaryEn: 'Week 4 of 12: **Components & Props** (Level: Beginner). Beginner phase complete! Next week: **Vue Router**.',
  },
  {
    week: 5, level: 'intermediate', topicId: 'vue-router',
    titleId: 'Vue Router', titleEn: 'Vue Router',
    programId: 'Multi-Halaman', programEn: 'Multi-Page App',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'vue',
    code: `// Vue Router = official routing untuk Vue.js SPA
const routes = [
  { path: '/', name: 'home', component: { template: '<h1>Beranda</h1>' } },
  { path: '/about', name: 'about', component: { template: '<h1>Tentang</h1>' } },
  { path: '/user/:id', name: 'user', component: { template: '<h1>User {{ $route.params.id }}</h1>' } },
];
// const router = createRouter({ history: createWebHistory(), routes });
// router.beforeEach((to, from, next) => { ... });
console.log('Vue Router siap digunakan');`,
    objectivesId: ['Setup createRouter dan createWebHistory', 'RouterLink untuk navigasi, RouterView untuk render', 'Dynamic routes: /user/:id dengan useRoute', 'Navigation guards: beforeEach, beforeEnter', 'Lazy loading: () => import() untuk code splitting'],
    objectivesEn: ['Setup createRouter and createWebHistory', 'RouterLink for navigation, RouterView for rendering', 'Dynamic routes: /user/:id with useRoute', 'Navigation guards: beforeEach, beforeEnter', 'Lazy loading: () => import() for code splitting'],
    explanationId: '### Setup\ncreateRouter + createWebHistory. Register di app.\n\n### Navigation\n<RouterLink to="/path"> = SPA navigation.\n\n### Dynamic Routes\n/path/:id -> useRoute().params.id.\n\n### Guards\nbeforeEach = global guard. beforeEnter = per-route guard.',
    explanationEn: '### Setup\ncreateRouter + createWebHistory.\n\n### Navigation\nRouterLink for SPA nav.\n\n### Dynamic Routes\nuseRoute().params for URL params.\n\n### Guards\nbeforeEach global, beforeEnter per-route.',
    experimentsId: ['Buat nested routes', 'Implementasikan route guard untuk auth', 'Tambah transition antar route', 'Buat 404 Not Found page'],
    experimentsEn: ['Create nested routes', 'Implement route guard for auth', 'Add transitions between routes', 'Create 404 Not Found page'],
    challengeId: 'Buat blog app dengan routing: Home, Posts, Post Detail (/post/:slug), About.',
    challengeEn: 'Build a blog app with routing: Home, Posts, Post Detail (/post/:slug), About.',
    summaryId: 'Minggu 5 dari 12: **Vue Router** (Level: Menengah). Minggu depan: **Pinia State Management**.',
    summaryEn: 'Week 5 of 12: **Vue Router** (Level: Intermediate). Next week: **Pinia State Management**.',
  },
  {
    week: 6, level: 'intermediate', topicId: 'pinia',
    titleId: 'Pinia State Management', titleEn: 'Pinia State Management',
    programId: 'Store & Cart', programEn: 'Store & Cart',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'vue',
    code: `// Pinia = official state management untuk Vue
// export const useCartStore = defineStore("cart", () => {
//   const items = ref([]);
//   const totalItems = computed(() => items.value.reduce((s, i) => s + i.quantity, 0));
//   function addItem(product) { ... }
//   function removeItem(id) { ... }
//   return { items, totalItems, addItem, removeItem };
// });
console.log('Pinia State Management siap digunakan');`,
    objectivesId: ['defineStore: setup function atau options style', 'State: ref() untuk reactive state', 'Getters: computed() untuk derived state', 'Actions: functions untuk mutate state', 'Stores di multiple components'],
    objectivesEn: ['defineStore: setup function or options style', 'State: ref() for reactive state', 'Getters: computed() for derived state', 'Actions: functions to mutate state', 'Stores across multiple components'],
    explanationId: '### Setup Store\ndefineStore("id", () => { ... }) = setup function style.\n\n### State\nref() = reactive. Akses langsung di template.\n\n### Getters\ncomputed() = derived value. Cached.\n\n### Actions\nFunctions untuk mutate state. Bisa async.',
    explanationEn: '### Setup Store\ndefineStore with setup function.\n\n### State\nref() for reactive state.\n\n### Getters\ncomputed() for derived values.\n\n### Actions\nFunctions to mutate state.',
    experimentsId: ['Buat multiple stores (cart, user, products)', 'Implementasikan async action', 'Tambah store persistence', 'Buat store dengan modules pattern'],
    experimentsEn: ['Create multiple stores', 'Implement async action', 'Add store persistence', 'Create store with modules pattern'],
    challengeId: 'Buat e-commerce dengan Pinia: product store, cart store, user store.',
    challengeEn: 'Build an e-commerce with Pinia: product store, cart store, user store.',
    summaryId: 'Minggu 6 dari 12: **Pinia State Management** (Level: Menengah). Minggu depan: **Lifecycle & Watchers**.',
    summaryEn: 'Week 6 of 12: **Pinia State Management** (Level: Intermediate). Next week: **Lifecycle & Watchers**.',
  },
  {
    week: 7, level: 'intermediate', topicId: 'lifecycle-watchers',
    titleId: 'Lifecycle & Watchers', titleEn: 'Lifecycle & Watchers',
    programId: 'Data Fetching', programEn: 'Data Fetching',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'vue',
    code: `// Lifecycle hooks = functions di tahap tertentu lifecycle komponen
const { createApp, ref, onMounted, onUnmounted, watch, watchEffect } = Vue;
const app = createApp({
  setup() {
    const users = ref([]); const loading = ref(true); const search = ref(''); const filteredUsers = ref([]);
    onMounted(() => { console.log('Mounted!'); fetchUsers(); });
    onUnmounted(() => { console.log('Unmounted!'); });
    watch(search, (newVal) => { filteredUsers.value = users.value.filter((u) => u.name.toLowerCase().includes(newVal.toLowerCase())); });
    watchEffect(() => { console.log('Search:', search.value); });
    function fetchUsers() { setTimeout(() => { users.value = [{ id: 1, name: 'Budi' }, { id: 2, name: 'Siti' }]; loading.value = false; }, 1000); }
    return { users, loading, search, filteredUsers };
  },
});
app.mount('#app');
console.log('Lifecycle & Watchers siap digunakan');`,
    objectivesId: ['onMounted: fetch data setelah komponen muncul', 'onUnmounted: cleanup (unsubscribe, clear timer)', 'watch: reaktif terhadap specific data changes', 'watchEffect: auto-track dependencies', 'Lifecycle: onUpdated, onBeforeMount'],
    objectivesEn: ['onMounted: fetch data after component appears', 'onUnmounted: cleanup', 'watch: react to specific data changes', 'watchEffect: auto-track dependencies', 'Lifecycle: onUpdated, onBeforeMount'],
    explanationId: '### Lifecycle Hooks\nonMounted = setelah mount (fetch data).\nonUnmounted = sebelum unmount (cleanup).\n\n### Watch\nSpecific: watch(source, callback).\n\n### WatchEffect\nAuto-track semua dependencies.',
    explanationEn: '### Lifecycle Hooks\nonMounted for fetch, onUnmounted for cleanup.\n\n### Watch\nSpecific source watching.\n\n### WatchEffect\nAuto-track dependencies.',
    experimentsId: ['Buat timer dengan onMounted/onUnmounted', 'Implementasikan debounce search', 'Watch nested object dengan deep: true', 'Bandingkan watch vs watchEffect'],
    experimentsEn: ['Create timer with onMounted/onUnmounted', 'Implement debounce search', 'Watch nested object with deep: true', 'Compare watch vs watchEffect'],
    challengeId: 'Buat user directory: fetch users, search filter, loading state, error handling.',
    challengeEn: 'Build a user directory: fetch users, search filter, loading state, error handling.',
    summaryId: 'Minggu 7 dari 12: **Lifecycle & Watchers** (Level: Menengah). Minggu depan: **Provide/Inject & Teleport**.',
    summaryEn: 'Week 7 of 12: **Lifecycle & Watchers** (Level: Intermediate). Next week: **Provide/Inject & Teleport**.',
  },
  {
    week: 8, level: 'intermediate', topicId: 'provide-inject',
    titleId: 'Provide/Inject & Teleport', titleEn: 'Provide/Inject & Teleport',
    programId: 'Theme & Modal', programEn: 'Theme & Modal',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'vue',
    code: `// Provide/Inject = share state tanpa prop drilling
const { createApp, ref, provide, inject } = Vue;
const App = {
  setup() {
    const theme = ref('light');
    const user = ref({ name: 'Budi', role: 'admin' });
    provide('theme', theme);
    provide('user', user);
    provide('toggleTheme', () => { theme.value = theme.value === 'light' ? 'dark' : 'light'; });
    return { theme };
  },
};
const ChildComponent = {
  setup() {
    const theme = inject('theme');
    const user = inject('user');
    const toggleTheme = inject('toggleTheme');
    return { theme, user, toggleTheme };
  },
};
console.log('Provide/Inject & Teleport siap digunakan');`,
    objectivesId: ['provide: share data ke semua descendants', 'inject: terima data dari ancestor', 'Kapan pakai provide/inject vs props', 'Teleport: render ke DOM tree berbeda', 'Slots: default, named, scoped slots'],
    objectivesEn: ['provide: share data to all descendants', 'inject: receive data from ancestor', 'When to use provide/inject vs props', 'Teleport: render to different DOM tree', 'Slots: default, named, scoped slots'],
    explanationId: '### Provide/Inject\nParent provide("key", value). Child inject("key"). Bypass intermediate.\n\n### Kapan Pakai\nProps: parent -> direct child. Provide/Inject: ancestor -> deep descendant.\n\n### Teleport\n<Teleport to="body"> = render di body.',
    explanationEn: '### Provide/Inject\nParent provides, child injects.\n\n### When to Use\nProps for direct, provide/inject for deep.\n\n### Teleport\nRender to different DOM location.',
    experimentsId: ['Buat theme switcher dengan provide/inject', 'Implementasikan modal dengan Teleport', 'Buat card component dengan named slots', 'Buat scoped slot untuk data table'],
    experimentsEn: ['Create theme switcher with provide/inject', 'Implement modal with Teleport', 'Create card component with named slots', 'Create scoped slot for data table'],
    challengeId: 'Buat UI library: Modal (Teleport), Card (named slots), ThemeProvider (provide/inject).',
    challengeEn: 'Build a UI library: Modal (Teleport), Card (named slots), ThemeProvider (provide/inject).',
    summaryId: 'Minggu 8 dari 12: **Provide/Inject & Teleport** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Testing Vue**.',
    summaryEn: 'Week 8 of 12: **Provide/Inject & Teleport** (Level: Intermediate). Intermediate phase complete! Next week: **Testing Vue**.',
  },
  {
    week: 9, level: 'advanced', topicId: 'testing-vue',
    titleId: 'Testing Vue Components', titleEn: 'Testing Vue Components',
    programId: 'Unit & Integration', programEn: 'Unit & Integration',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'vue',
    code: `// Testing Vue: Vitest + Vue Test Utils
// import { mount } from "@vue/test-utils";
// import { describe, it, expect } from "vitest";
// describe("Counter", () => {
//   it("renders initial count", () => {
//     const wrapper = mount(Counter);
//     expect(wrapper.find("[data-testid=count]").text()).toBe("0");
//   });
// });
console.log('Testing Vue siap digunakan');`,
    objectivesId: ['Vitest + Vue Test Utils setup', 'mount vs shallowMount: kapan pakai', 'find, findAll: query DOM elements', 'trigger, emit: simulate user interactions', 'Mock stores dan router di test'],
    objectivesEn: ['Vitest + Vue Test Utils setup', 'mount vs shallowMount: when to use', 'find, findAll: query DOM elements', 'trigger, emit: simulate user interactions', 'Mock stores and router in tests'],
    explanationId: '### Setup\nVitest + @vue/test-utils. mount() = full render.\n\n### Queries\nfind() = pertama cocok. findAll() = semua.\n\n### Interactions\ntrigger("click") = klik. setValue() = isi input.\n\n### Best Practices\nTest behavior, bukan implementation.',
    explanationEn: '### Setup\nVitest + @vue/test-utils.\n\n### Queries\nfind() = first match, findAll() = all.\n\n### Interactions\ntrigger, setValue for user simulation.\n\n### Best Practices\nTest behavior, not implementation.',
    experimentsId: ['Test form submission', 'Test async component dengan fetch', 'Test dengan mocked store', 'Test navigation dengan router'],
    experimentsEn: ['Test form submission', 'Test async component with fetch', 'Test with mocked store', 'Test navigation with router'],
    challengeId: 'Buat test suite untuk TodoApp: add todo, toggle complete, delete todo, filter.',
    challengeEn: 'Build a test suite for TodoApp: add todo, toggle complete, delete todo, filter.',
    summaryId: 'Minggu 9 dari 12: **Testing Vue** (Level: Lanjutan). Minggu depan: **Performance & Nuxt**.',
    summaryEn: 'Week 9 of 12: **Testing Vue** (Level: Advanced). Next week: **Performance & Nuxt**.',
  },
  {
    week: 10, level: 'advanced', topicId: 'performance-nuxt',
    titleId: 'Performance & Nuxt', titleEn: 'Performance & Nuxt',
    programId: 'Optimasi & SSR', programEn: 'Optimization & SSR',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'vue',
    code: `// Performance: lazy loading, keep-alive, v-memo
// Nuxt = meta-framework untuk Vue (SSR, file-based routing)
// const Heavy = defineAsyncComponent(() => import("./Heavy.vue"));
// <keep-alive><router-view /></keep-alive>
// <div v-memo="[value]">{{ value }}</div>
console.log('Performance & Nuxt siap digunakan');`,
    objectivesId: ['defineAsyncComponent untuk lazy loading', 'keep-alive untuk cache component state', 'v-memo untuk conditional re-render', 'Nuxt: file-based routing, auto-imports', 'Nuxt: useFetch, useAsyncData, server routes'],
    objectivesEn: ['defineAsyncComponent for lazy loading', 'keep-alive for component state caching', 'v-memo for conditional re-render', 'Nuxt: file-based routing, auto-imports', 'Nuxt: useFetch, useAsyncData, server routes'],
    explanationId: '### Lazy Loading\ndefineAsyncComponent + import() = load saat dibutuhkan.\n\n### Keep-Alive\nCache component saat di-switch.\n\n### Nuxt\nMeta-framework: SSR, file routing, auto-import.',
    explanationEn: '### Lazy Loading\ndefineAsyncComponent for on-demand loading.\n\n### Keep-Alive\nCache component state.\n\n### Nuxt\nMeta-framework with SSR, file routing.',
    experimentsId: ['Implementasikan lazy loading route', 'Setup keep-alive untuk tabs', 'Buat Nuxt project dengan pages', 'Implementasikan server API route'],
    experimentsEn: ['Implement lazy loading routes', 'Setup keep-alive for tabs', 'Create Nuxt project with pages', 'Implement server API routes'],
    challengeId: 'Buat blog dengan Nuxt: SSR, file-based routing, server API, layouts, middleware.',
    challengeEn: 'Build a blog with Nuxt: SSR, file-based routing, server API, layouts, middleware.',
    summaryId: 'Minggu 10 dari 12: **Performance & Nuxt** (Level: Lanjutan). Minggu depan: **Animations & Transitions**.',
    summaryEn: 'Week 10 of 12: **Performance & Nuxt** (Level: Advanced). Next week: **Animations & Transitions**.',
  },
  {
    week: 11, level: 'advanced', topicId: 'animations-transitions',
    titleId: 'Animations & Transitions', titleEn: 'Animations & Transitions',
    programId: 'UI Animasi', programEn: 'Animated UI',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'vue',
    code: `// Vue Transitions: built-in component untuk animasi
// <transition name="fade"><p v-if="show">Hello</p></transition>
// <transition-group name="list" tag="ul"><li v-for="item in items" :key="item.id">{{ item }}</li></transition-group>
console.log('Animations & Transitions siap digunakan');`,
    objectivesId: ['<transition>: enter/leave animations', 'CSS classes: -enter-active, -leave-to', '<transition-group>: list animations', 'JavaScript hooks: before-enter, enter, leave', 'GSAP integration untuk complex animations'],
    objectivesEn: ['<transition>: enter/leave animations', 'CSS classes: -enter-active, -leave-to', '<transition-group>: list animations', 'JavaScript hooks: before-enter, enter, leave', 'GSAP integration for complex animations'],
    explanationId: '### Transition\nBuilt-in component. Auto apply CSS classes.\n\n### CSS Classes\n-enter-from, -enter-active, -enter-to, -leave-from, -leave-active, -leave-to.\n\n### Transition Group\nAnimasi list (add/remove items).',
    explanationEn: '### Transition\nBuilt-in component with CSS classes.\n\n### CSS Classes\nEnter/leave class lifecycle.\n\n### Transition Group\nList add/remove animations.',
    experimentsId: ['Buat page transition', 'Implementasikan modal animation', 'Buat staggered list animation', 'Integrasikan GSAP'],
    experimentsEn: ['Create page transitions', 'Implement modal animation', 'Create staggered list animation', 'Integrate GSAP'],
    challengeId: 'Buat animated dashboard: page transitions, list animations, modal animations.',
    challengeEn: 'Build an animated dashboard: page transitions, list animations, modal animations.',
    summaryId: 'Minggu 11 dari 12: **Animations & Transitions** (Level: Lanjutan). Minggu depan: **Capstone Project**!',
    summaryEn: 'Week 11 of 12: **Animations & Transitions** (Level: Advanced). Next week: **Capstone Project**!',
  },
  {
    week: 12, level: 'advanced', topicId: 'capstone',
    titleId: 'Capstone: SaaS Dashboard', titleEn: 'Capstone: SaaS Dashboard',
    programId: 'Platform Analytics', programEn: 'Analytics Platform',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'vue',
    code: `// Capstone: SaaS Analytics Dashboard
// Architecture: Vue 3 + Pinia + Vue Router + Vite + Vitest
// Features: Auth, charts, CRUD, notifications, dark mode, testing
console.log('SaaS Dashboard siap digunakan!');`,
    objectivesId: ['Menggabungkan semua konsep Vue dalam satu proyek', 'Composition API + Pinia + Router pattern', 'Component architecture: reusable, composable', 'Testing: unit, integration, e2e', 'Production build dan deployment'],
    objectivesEn: ['Combine all Vue concepts in one project', 'Composition API + Pinia + Router pattern', 'Component architecture: reusable, composable', 'Testing: unit, integration, e2e', 'Production build and deployment'],
    explanationId: '### Architecture\nComposition API + Pinia + Router = modern Vue stack.\n\n### Testing\nUnit: Vitest + Test Utils. E2E: Playwright.\n\n### Production\nvite build -> dist/. Deploy ke Vercel/Netlify.',
    explanationEn: '### Architecture\nComposition API + Pinia + Router.\n\n### Testing\nUnit with Vitest, E2E with Playwright.\n\n### Production\nvite build for production.',
    experimentsId: ['Tambah real-time WebSocket', 'Implementasikan data export', 'Buat comprehensive test suite', 'Deploy ke production'],
    experimentsEn: ['Add real-time WebSocket', 'Implement data export', 'Build comprehensive test suite', 'Deploy to production'],
    challengeId: 'Buat SaaS dashboard lengkap: auth, charts, CRUD, notifications, dark mode, testing.',
    challengeEn: 'Build a complete SaaS dashboard: auth, charts, CRUD, notifications, dark mode, testing.',
    summaryId: 'Minggu 12 dari 12: **Capstone: SaaS Dashboard** (Level: Lanjutan). Selesai! 🎉',
    summaryEn: 'Week 12 of 12: **Capstone: SaaS Dashboard** (Level: Advanced). Complete! 🎉',
  },
];

for (const level of LEVELS) {
  level.weeks = MODULES.filter(m => m.level === level.levelId).map(m => ({ week: m.week, topicId: m.topicId, titleId: m.titleId, titleEn: m.titleEn }));
}

gen.writeFiles(MODULES, LEVELS);
