import fs from 'fs';
import path from 'path';

const BASE = new URL('../public/data/course/vue', import.meta.url).pathname;
const BASE_DIR = process.platform === 'win32' ? BASE.slice(1) : BASE;

// ===== PHASES (research-based: Vue Mastery, Vue School, official docs tutorial order,
//      bestwebteacher 2026, Frontend Masters, roadmap 2026, misconception literature) =====
const PHASES = [
  { phase: 1, id: 'foundations', nameId: 'Foundasi Vue', nameEn: 'Vue Foundations' },
  { phase: 2, id: 'components', nameId: 'Komponen & Komunikasi', nameEn: 'Components & Communication' },
  { phase: 3, id: 'architecture', nameId: 'Arsitektur & State', nameEn: 'Architecture & State' },
  { phase: 4, id: 'production', nameId: 'Production-Grade', nameEn: 'Production-Grade' },
  { phase: 5, id: 'ecosystem', nameId: 'Ekosistem & Capstone', nameEn: 'Ecosystem & Capstone' },
];

// StackBlitz WebContainers: template 'node' + dev script 'vite' boots Vite.
// Composition API + <script setup> from lesson 1 (2026 consensus; Options API only for legacy code).
const BASE_PKG = {
  name: 'vue-lesson',
  version: '1.0.0',
  private: true,
  type: 'module',
  scripts: { dev: 'vite' },
  dependencies: { vue: '^3.5.0' },
  devDependencies: { '@vitejs/plugin-vue': '^5.0.0', vite: '^6.0.0' },
};

const BASE_PROJECT_FILES = {
  'package.json': JSON.stringify(BASE_PKG, null, 2),
  'vite.config.js': `import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({ plugins: [vue()] });
`,
  'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue Lesson</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
`,
  'src/main.js': `import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
createApp(App).mount('#app');
`,
  'src/index.css': `body { font-family: system-ui, sans-serif; max-width: 800px; margin: 2rem auto; padding: 0 1rem; line-height: 1.6; }
button { font: inherit; padding: 0.4rem 0.9rem; border-radius: 8px; border: 1px solid #999; background: #f1f1f1; cursor: pointer; }
button:hover { background: #e2e2e2; }
input, select { font: inherit; padding: 0.4rem 0.6rem; border-radius: 8px; border: 1px solid #999; }
`,
};

const withPkg = (overrides) => ({
  'package.json': JSON.stringify({ ...BASE_PKG, ...overrides }, null, 2),
});

// ===== PHASE 1: FOUNDATIONS (lessons 1-6) — template-first, Composition API =====
const LESSONS_P1 = [
  {
    phase: 1, num: 1, topicId: 'pengenalan-vue',
    titleId: 'Pengenalan Vue & Setup', titleEn: 'Vue Intro & Setup',
    codeFile: 'src/App.vue',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.vue': `<script setup>
// <script setup> = Composition API langsung dari awal (rekomendasi resmi 2026).
// Options API (data/methods/computed) hanya perlu dikenal untuk membaca kode legacy.
import { ref } from 'vue'

const name = ref('Ayu')
const role = ref('Vue Developer')
const stack = ['Vue 3', 'Vite', 'Pinia']
</script>

<template>
  <h1>Halo, {{ name }}!</h1>
  <p>Peran: {{ role }}</p>
  <p>Stack: {{ stack.join(' + ') }}</p>
  <p>{{ name }} sedang belajar Vue pada {{ new Date().getFullYear() }}</p>
</template>

<style scoped>
h1 { color: #42B883; }
</style>
`,
      };
    },
    objId: ['Memahami Vue sebagai framework progresif', 'Mengenal struktur Single-File Component (template/script/style)', 'Menjalankan aplikasi pertama dengan Vite + createApp', 'Menggunakan sintaks interpolasi {{ }} dan <script setup>'],
    objEn: ['Understand Vue as a progressive framework', 'Know the Single-File Component structure (template/script/style)', 'Run a first app with Vite + createApp', 'Use {{ }} interpolation and <script setup>'],
    expId: `## Vue Itu Apa?
Vue adalah framework progresif: bisa dipakai sedikit-sedikit (menambah interaktivitas ke halaman HTML lama) atau penuh (SPA besar dengan Vite). Satu file .vue = satu komponen: template (HTML), script (logika JS), style (CSS scoped).
\n## createApp & Mounting
\`createApp(App).mount('#app')\` membuat instance aplikasi dan memasangnya ke elemen \`<div id="app">\` di index.html. Semua komponen berada di dalam pohon komponen yang berakar di App.vue.
\n## Interpolasi {{ }}
\`{{ name }}\` membaca nilai dari script setup. Ekspresi JS apa pun valid di dalamnya (contoh: \`{{ stack.join(' + ') }}\`), selama tidak punya side-effect.
\n## Kenapa <script setup>?
Satu-satunya API yang diajarkan di track ini (konsensus 2026: Vue Mastery, Vue School, docs resmi). Lebih ringkas, tipe-friendly, dan template langsung bisa memakai variabel script tanpa \`return {}\`.`,
    expEn: `## What Is Vue?
Vue is a progressive framework: you can adopt it gradually (adding interactivity to an old HTML page) or fully (large SPAs with Vite). One .vue file = one component: template (HTML), script (JS logic), style (scoped CSS).
\n## createApp & Mounting
\`createApp(App).mount('#app')\` creates the app instance and attaches it to the \`<div id="app">\` element in index.html. All components live in a component tree rooted at App.vue.
\n## {{ }} Interpolation
\`{{ name }}\` reads a value from the script setup. Any JS expression is valid inside (e.g. \`{{ stack.join(' + ') }}\`), as long as it has no side effects.
\n## Why <script setup>?
The only API taught in this track (2026 consensus: Vue Mastery, Vue School, official docs). More concise, type-friendly, and the template can use script variables directly without a \`return {}\`.`,
    chId: 'Ubah App.vue menjadi kartu profil: variabel name, age, city (ref). Tambahkan ekspresi interpolasi (misal \u0060{{ name.length }}\u0060, \u0060{{ age + 1 }}\u0060). Lalu coba hapus \u0060<script setup>\u0060 dan tulis ulang dengan setup() + return — bandingkan mana yang lebih ringkas.',
    chEn: 'Turn App.vue into a profile card: name, age, city variables (ref). Add interpolation expressions (e.g. \u0060{{ name.length }}\u0060, \u0060{{ age + 1 }}\u0060). Then remove \u0060<script setup>\u0060 and rewrite with setup() + return — compare which is more concise.',
    sumId: 'Vue = framework progresif. SFC = template + script + style. createApp().mount(). Interpolasi {{ }}. Composition API + <script setup> sejak awal. Lanjut: reaktivitas & ref().',
    sumEn: 'Vue = progressive framework. SFC = template + script + style. createApp().mount(). {{ }} interpolation. Composition API + <script setup> from the start. Next: reactivity & ref().',
  },
  {
    phase: 1, num: 2, topicId: 'rendering-deklaratif',
    titleId: 'Rendering Deklaratif & ref()', titleEn: 'Declarative Rendering & ref()',
    codeFile: 'src/App.vue',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.vue': `<script setup>
import { ref } from 'vue'

const count = ref(0)
const message = ref('Klik tombolnya!')

function increment() {
  count.value += 1
  message.value = count.value > 5 ? 'Luar biasa, teruskan!' : 'Bagus, lanjutkan!'
}

function reset() {
  count.value = 0
  message.value = 'Mulai lagi dari nol.'
}
</script>

<template>
  <h1>Counter: {{ count }}</h1>
  <p>{{ message }}</p>
  <button @click="increment">Tambah</button>
  <button @click="reset">Reset</button>
  <p>Di template ref otomatis terbuka (tanpa .value). Di script Wajib .value.</p>
</template>

<style scoped>
h1 { color: #42B883; }
</style>
`,
      };
    },
    objId: ['Memahami mental model reaktivitas: data berubah → DOM ikut berubah', 'Mendeklarasikan state dengan ref()', 'Memahami aturan .value (wajib di script, otomatis dibuka di template)', 'Mengapa ref ada: agar Vue bisa melacak akses dan mutasi'],
    objEn: ['Understand the reactivity mental model: data changes → DOM updates', 'Declare state with ref()', 'Master the .value rules (required in script, auto-unwrapped in template)', 'Why refs exist: so Vue can track access and mutation'],
    expId: `## Mental Model: Data -> UI
Kamu TIDAK menulis \`document.getElementById(...)\` untuk update UI. Kamu mengubah state; Vue yang memperbarui DOM. Inilah rendering deklaratif: kamu menyatakan "apa yang ditampilkan", bukan "bagaimana mengubahnya".
\n## ref() & .value
\`ref(0)\` membungkus nilai dalam objek dengan properti \`.value\`. Aturan: di \`<script>\` gunakan \`.value\`; di template otomatis dibuka (jangan tulis \`count.value\` di template). Misconception paling umum: lupa \`.value\` di script — cek .value dulu setiap bug.
\n## Kenapa Harus ref?
Variabel biasa tidak bisa dilacak. \`.value\` memberi Vue kesempatan melacak di getter dan memicu di setter: saat komponen render, Vue melacak setiap ref yang dipakai; saat ref bermutasi, komponen yang melacaknya di-render ulang.
\n## Reaktivitas mendalam & Mutasi
Ref bersifat deep reactive secara default: mengubah objek/array bersarang tetap terdeteksi. Di event handler, mutasi ref langsung valid (contoh: \`count.value += 1\`).`,
    expEn: `## Mental Model: Data -> UI
You never write \`document.getElementById(...)\` to update the UI. You change state; Vue updates the DOM. This is declarative rendering: you state "what to show", not "how to change it".
\n## ref() & .value
\`ref(0)\` wraps a value in an object with a \`.value\` property. The rule: in \`<script>\` use \`.value\`; in templates it auto-unwraps (never write \`count.value\` in a template). The most common beginner bug: forgetting \`.value\` in script — check .value first with any bug.
\n## Why Refs?
Plain variables cannot be tracked. \`.value\` gives Vue the chance to track in the getter and trigger in the setter: when a component renders, Vue tracks every ref used; when a ref mutates, the components tracking it re-render.
\n## Deep Reactivity & Mutation
Refs are deeply reactive by default: mutating nested objects/arrays is still detected. Mutating a ref directly in event handlers is fine (e.g. \`count.value += 1\`).`,
    chId: 'Buat timer "waktu belajar": ref detik, tombol mulai/jeda dengan setInterval, stopwatch yang reset. Prediksi: apakah \u0060count.value++\u0060 di dalam setInterval membuat UI berubah? Jelaskan kenapa (ya — karena ref melacak mutasi).',
    chEn: 'Build a "study timer": seconds ref, start/pause button with setInterval, a reset stopwatch. Predict: does \u0060count.value++\u0060 inside setInterval update the UI? Explain why (yes — because refs track mutation).',
    sumId: 'Reaktivitas: ubah data → UI otomatis. ref() + .value (script) / auto-unwrap (template). ref ada untuk tracking. Deep reactive. Lanjut: direktif template.',
    sumEn: 'Reactivity: change data → UI updates. ref() + .value (script) / auto-unwrap (template). Refs exist for tracking. Deeply reactive. Next: template directives.',
  },
  {
    phase: 1, num: 3, topicId: 'template-directives',
    titleId: 'Directive & Binding', titleEn: 'Directives & Bindings',
    codeFile: 'src/App.vue',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.vue': `<script setup>
import { ref } from 'vue'

const product = ref({
  name: 'Vue Mug',
  price: 120000,
  inStock: false,
})

const theme = ref('light')
const isMember = ref(true)
const discount = ref(15)
</script>

<template>
  <div :class="['card', theme === 'dark' ? 'card-dark' : 'card-light']">
    <h1>{{ product.name }}</h1>
    <p>Harga: Rp{{ product.price.toLocaleString('id-ID') }}</p>
    <p :style="{ color: product.inStock ? '#2e7d32' : '#c62828' }">
      {{ product.inStock ? 'Tersedia' : 'Stok habis' }}
    </p>
    <p v-if="isMember">Member: diskon {{ discount }}%</p>
    <p v-else>Belum jadi member.</p>
    <button @click="theme = theme === 'dark' ? 'light' : 'dark'">
      Ganti tema: {{ theme }}
    </button>
  </div>
</template>

<style scoped>
.card { border-radius: 12px; padding: 1.5rem; border: 1px solid #ddd; max-width: 360px; }
.card-light { background: #fff; color: #222; }
.card-dark { background: #1e1e1e; color: #eee; }
button { margin-top: 0.75rem; }
</style>
`,
      };
    },
    objId: ['Mengikat atribut dinamis dengan v-bind (:)', 'Menggunakan binding class & style (sintaks objek dan array)', 'Menampilkan kondisi dengan v-if / v-else / v-show', 'Memahami beda v-if vs v-show'],
    objEn: ['Bind dynamic attributes with v-bind (:)', 'Use class & style bindings (object and array syntax)', 'Render conditions with v-if / v-else / v-show', 'Understand the v-if vs v-show difference'],
    expId: `## v-bind (:)
\`v-bind:attribute\` atau \`:\` mengikat atribut ke ekspresi JS. \`:style="{ color: ... }"\` dan \`:class="[...]"\` adalah bentuk khusus: objek untuk kondisi per-properti, array untuk menggabungkan beberapa class.
\n## v-if / v-else / v-show
\`v-if\` MENGHAPUS elemen dari DOM saat false; \`v-show\` hanya menyembunyikan (display:none) tetapi elemen tetap ada. Aturan praktis: \`v-if\` untuk kondisi yang jarang berubah (lebih murah), \`v-show\` untuk toggle cepat.
\n## Penulisan Kondisi
\`v-else\` harus langsung mengikuti elemen \`v-if\` tanpa elemen di antaranya. Untuk banyak cabang: \`v-else-if\`. Template literal bisa memuat ekspresi kompleks, tapi pindahkan ke computed bila mulai panjang.
\n## Jebakan: Atribut Statis vs Dinamis
Atribut tanpa \`:\` adalah string literal ("theme" bukan nilai variabel theme). Lupa titik dua = bug klasik: \`class="theme"\` mengikat string "theme", bukan class dari variabel.`,
    expEn: `## v-bind (:)
\`v-bind:attribute\` or \`:\` binds an attribute to a JS expression. \`:style="{ color: ... }"\` and \`:class="[...]"\` are special forms: objects for per-property conditions, arrays to combine multiple classes.
\n## v-if / v-else / v-show
\`v-if\` REMOVES the element from the DOM when false; \`v-show\` only hides it (display:none) but the element stays. Rule of thumb: \`v-if\` for conditions that rarely change (cheaper), \`v-show\` for fast toggles.
\n## Writing Conditions
\`v-else\` must directly follow the \`v-if\` element with nothing in between. For many branches: \`v-else-if\`. Templates can hold complex expressions, but move them to computed when they get long.
\n## Trap: Static vs Dynamic Attributes
An attribute without \`:\` is a string literal ("theme", not the theme variable). Forgetting the colon is a classic bug: \`class="theme"\` binds the string "theme", not the class from a variable.`,
    chId: 'Buat kartu produk dengan state: nama, harga, rating (1-5), status promo. Gunakan v-if/v-else untuk badge "PROMO", :class untuk warna rating, dan v-show untuk tombol "Tambah ke keranjang" yang muncul hanya saat stok ada.',
    chEn: 'Build a product card with state: name, price, rating (1-5), promo status. Use v-if/v-else for a "PROMO" badge, :class for rating colors, and v-show for an "Add to cart" button that appears only when in stock.',
    sumId: 'v-bind (:) untuk atribut dinamis. Class/style binding: objek & array. v-if/v-else menghapus DOM; v-show menyembunyikan. Tanpa ":" = string literal. Lanjut: list & events.',
    sumEn: 'v-bind (:) for dynamic attributes. Class/style binding: object & array. v-if/v-else remove DOM; v-show hides. No ":" = string literal. Next: lists & events.',
  },
  {
    phase: 1, num: 4, topicId: 'list-event',
    titleId: 'List & Event', titleEn: 'Lists & Events',
    codeFile: 'src/App.vue',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.vue': `<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, name: 'Belajar Vue', done: false },
  { id: 2, name: 'Baca docs reaktivitas', done: true },
  { id: 3, name: 'Latihan v-for', done: false },
])

let nextId = 4

function addItem(event) {
  const text = event.target.value.trim()
  if (!text) return
  items.value.push({ id: nextId++, name: text, done: false })
  event.target.value = ''
}

function removeItem(id) {
  items.value = items.value.filter((item) => item.id !== id)
}

function toggleDone(id) {
  const item = items.value.find((i) => i.id === id)
  if (item) item.done = !item.done
}
</script>

<template>
  <h1>Daftar Belajar</h1>
  <input @keyup.enter="addItem" placeholder="Tulis tugas lalu Enter" />
  <ul>
    <li v-for="item in items" :key="item.id" :class="{ done: item.done }">
      <input type="checkbox" :checked="item.done" @change="toggleDone(item.id)" />
      {{ item.name }}
      <button @click.stop="removeItem(item.id)">hapus</button>
    </li>
  </ul>
  <p>Total: {{ items.length }} | Selesai: {{ items.filter((i) => i.done).length }}</p>
</template>

<style scoped>
.done { text-decoration: line-through; color: #888; }
li { margin: 0.4rem 0; }
button { margin-left: 0.5rem; }
</style>
`,
      };
    },
    objId: ['Merender list dengan v-for dan :key', 'Memahami key = identitas, BUKAN posisi', 'Menangani event dengan v-on (@) + modifiers', 'Mengirim argumen event handler dengan $event'],
    objEn: ['Render lists with v-for and :key', 'Understand key = identity, NOT position', 'Handle events with v-on (@) + modifiers', 'Pass event handler arguments with $event'],
    expId: `## v-for + :key
\`v-for="item in items"\` merender satu elemen per item. \`:key\` WAJIB untuk identitas item. Key = IDENTITAS data, bukan posisinya: jangan \`:key="index"\` — saat list diurutkan ulang atau item ber-state internal, index memicu bug yang sulit dilacak (VueConf Toronto: kondisi bug muncul saat urutan berubah + item punya state sendiri).
\n## Event: v-on (@)
\`@click\` = \`v-on:click\`. Handler bisa statement (\`count++\`) atau fungsi. Argumen: \`@click="addItem($event)"\` mengirim event asli; untuk data lain: \`@click="removeItem(item.id)"\` (jangan tulis \`item.id\` tanpa kurung di handler).
\n## Modifiers
\`.stop\` menghentikan propagasi (\`@click.stop\`), \`.prevent\` memanggil preventDefault (form submit), \`.once\` hanya sekali, \`.self\` hanya jika target = elemen sendiri. \`@keyup.enter\` untuk tombol Enter.
\n## Mutasi List
Metode mutasi array (\`push\`, \`splice\`) terdeteksi reaktivitas; assignment ulang (\`items.value = filter(...)\`) juga memicu update. Jangan pernah mengganti \`items.value\` dengan array baru di event tanpa alasan — pilih salah satu pola dan konsisten.`,
    expEn: `## v-for + :key
\`v-for="item in items"\` renders one element per item. \`:key\` is REQUIRED for item identity. Key = data IDENTITY, not position: never \`:key="index"\` — when the list reorders or items hold internal state, index causes hard-to-trace bugs (VueConf Toronto: the bug needs reorder + stateful items).
\n## Events: v-on (@)
\`@click\` = \`v-on:click\`. Handlers can be statements (\`count++\`) or functions. Arguments: \`@click="addItem($event)"\` passes the raw event; for data: \`@click="removeItem(item.id)"\` (never write \`item.id\` without parentheses in a handler).
\n## Modifiers
\`.stop\` stops propagation (\`@click.stop\`), \`.prevent\` calls preventDefault (form submit), \`.once\` fires once, \`.self\` only when the target is the element itself. \`@keyup.enter\` for the Enter key.
\n## List Mutation
Mutating array methods (\`push\`, \`splice\`) are reactivity-detected; reassignment (\`items.value = filter(...)\`) also triggers updates. Never replace \`items.value\` with a new array in an event without reason — pick one pattern and stay consistent.`,
    chId: 'Perluas menjadi daftar belanja: item { id, nama, jumlah }. Tombol + dan - untuk jumlah. Filter tombol: Semua / Belum dibeli. Jelaskan kenapa :key="item.id" lebih aman daripada :key="index" saat menghapus item di tengah list.',
    chEn: 'Extend it into a shopping list: items { id, name, qty }. +/- buttons for quantity. Filter buttons: All / Not bought. Explain why :key="item.id" is safer than :key="index" when deleting an item in the middle of the list.',
    sumId: 'v-for + :key (identitas!). v-on (@) + modifiers (.stop/.prevent/.once/.enter). Argumen handler. Mutasi array terdeteksi. Lanjut: forms & v-model.',
    sumEn: 'v-for + :key (identity!). v-on (@) + modifiers (.stop/.prevent/.once/.enter). Handler arguments. Array mutation is detected. Next: forms & v-model.',
  },
  {
    phase: 1, num: 5, topicId: 'form-v-model',
    titleId: 'Form & v-model', titleEn: 'Forms & v-model',
    codeFile: 'src/App.vue',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.vue': `<script setup>
import { ref, computed } from 'vue'

const name = ref('')
const email = ref('')
const level = ref('beginner')
const interests = ref(['vue'])
const bio = ref('')
const agree = ref(false)

const charCount = computed(() => bio.value.length)

const summary = computed(() => ({
  name: name.value,
  email: email.value,
  level: level.value,
  interests: interests.value,
  agree: agree.value,
}))
</script>

<template>
  <h1>Profil Belajar</h1>
  <form @submit.prevent>
    <label>Nama: <input v-model.trim="name" placeholder="Nama kamu" /></label>
    <label>Email: <input v-model.trim="email" type="email" /></label>
    <label>
      Level:
      <select v-model="level">
        <option value="beginner">Pemula</option>
        <option value="intermediate">Menengah</option>
        <option value="advanced">Lanjutan</option>
      </select>
    </label>
    <fieldset>
      <legend>Minat:</legend>
      <label><input type="checkbox" value="vue" v-model="interests" /> Vue</label>
      <label><input type="checkbox" value="ts" v-model="interests" /> TypeScript</label>
      <label><input type="checkbox" value="nuxt" v-model="interests" /> Nuxt</label>
    </fieldset>
    <label>
      Bio:
      <textarea v-model="bio" rows="3"></textarea>
      ({{ charCount }} karakter)
    </label>
    <label><input type="checkbox" v-model="agree" /> Setuju syarat</label>
  </form>

  <h2>Pratinjau Langsung</h2>
  <pre>{{ summary }}</pre>
  <p v-if="agree">Siap belajar! 👋</p>
</template>

<style scoped>
label, fieldset { display: block; margin: 0.6rem 0; }
pre { background: #f4f4f4; padding: 1rem; border-radius: 8px; }
</style>
`,
      };
    },
    objId: ['Mengikat input dengan v-model (two-way binding)', 'Memahami v-model = :value + @input', 'Menggunakan modifiers .trim / .number / .lazy', 'Menggunakan v-model pada checkbox, select, textarea'],
    objEn: ['Bind inputs with v-model (two-way binding)', 'Understand v-model = :value + @input', 'Use the .trim / .number / .lazy modifiers', 'Use v-model on checkboxes, selects, textareas'],
    expId: `## v-model = Dua Arah
\`v-model\` membaca nilai input DAN menulis kembali state saat user mengetik — sintaks gula dari \`:value\` + \`@input\`. Perubahan state langsung tercermin (contoh: pratinjau live).
\n## Modifiers
\`.trim\` menghapus spasi kiri/kanan otomatis (cocok untuk nama/email), \`.number\` mengubah input menjadi number (bukan string), \`.lazy\` memperbarui state saat event change, bukan setiap keystroke.
\n## Tipe Input Berbeda
Checkbox: \`v-model\` = boolean (atau array dengan \`value\` untuk multi-select — contoh interests). Select: \`v-model\` terikat pada \`value\` option. Textarea: sama seperti text biasa.
\n## Trap: Number vs String
Tanpa \`.number\`, \`<input type="number">\` tetap menghasilkan string ("12" bukan 12). Perbandingan \`age > 18\` akan salah arah saat umur = "9" vs 18 (string dibandingkan leksikografis). Gunakan \`.number\` atau parse eksplisit.`,
    expEn: `## v-model = Two Ways
\`v-model\` reads the input value AND writes state back as the user types — syntactic sugar for \`:value\` + \`@input\`. State changes are reflected instantly (e.g. live preview).
\n## Modifiers
\`.trim\` strips leading/trailing whitespace automatically (great for names/emails), \`.number\` casts the input to a number (not a string), \`.lazy\` syncs state on the change event instead of every keystroke.
\n## Different Input Types
Checkbox: \`v-model\` is a boolean (or an array with \`value\` for multi-select — see interests). Select: \`v-model\` binds to the \`value\` of options. Textarea: behaves like a plain text input.
\n## Trap: Number vs String
Without \`.number\`, \`<input type="number">\` still yields a string ("12", not 12). The comparison \`age > 18\` misbehaves when age = "9" vs 18 (strings compare lexicographically). Use \`.number\` or parse explicitly.`,
    chId: 'Buat form checkout mini: nama, alamat, jumlah item (dengan .number), metode pembayaran (radio). Tampilkan ringkasan pesanan live. Nonaktifkan tombol "Bayar" selama form belum lengkap (computed).',
    chEn: 'Build a mini checkout form: name, address, item count (with .number), payment method (radio). Show a live order summary. Disable the "Pay" button while the form is incomplete (computed).',
    sumId: 'v-model = :value + @input. .trim/.number/.lazy. Checkbox boolean/array, select, textarea. Tanpa .number = string! Lanjut: computed & watch.',
    sumEn: 'v-model = :value + @input. .trim/.number/.lazy. Checkbox boolean/array, select, textarea. No .number = string! Next: computed & watch.',
  },
  {
    phase: 1, num: 6, topicId: 'computed-watch',
    titleId: 'Computed & Watchers', titleEn: 'Computed & Watchers',
    codeFile: 'src/App.vue',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.vue': `<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

const query = ref('')
const notes = ref([
  'Computed itu cache & pure',
  'Watch untuk side effects',
  'Jangan lupa .value di script',
])

const filtered = computed(() =>
  notes.value.filter((n) => n.toLowerCase().includes(query.value.toLowerCase()))
)

const stats = computed(() => ({
  total: notes.value.length,
  done: notes.value.filter((n) => n.startsWith('[x]')).length,
}))

// Side effect: simpan ke localStorage saat list berubah
watch(notes, (list) => {
  localStorage.setItem('notes', JSON.stringify(list))
}, { deep: true })

// watchEffect: otomatis melacak dependency yang dipakai
watchEffect(() => {
  console.log('Filter aktif:', query.value || '(kosong)', '| Hasil:', filtered.value.length)
})
</script>

<template>
  <h1>Catatan {{ stats.done }}/{{ stats.total }} selesai</h1>
  <input v-model="query" placeholder="Cari catatan..." />
  <ul>
    <li v-for="note in filtered" :key="note">{{ note }}</li>
  </ul>
  <p v-if="filtered.length === 0">Tidak ada hasil untuk "{{ query }}".</p>
</template>

<style scoped>
li { margin: 0.3rem 0; }
</style>
`,
      };
    },
    objId: ['Menurunkan nilai dengan computed() (cache & pure)', 'Menjalankan side effects dengan watch()', 'Memahami beda watch vs watchEffect', 'Menghindari trap: computed ber-side-effect & watch nilai (bukan getter)'],
    objEn: ['Derive values with computed() (cached & pure)', 'Run side effects with watch()', 'Understand watch vs watchEffect', 'Avoid traps: side-effecting computeds & watching values (not getters)'],
    expId: `## computed: Turunan Murni
\`computed\` = nilai yang diturunkan dari state lain; CACHE sampai dependency berubah. Wajib PURE: tidak boleh mutasi state / fetch / console.log di dalamnya. Aturan: jika butuh efek samping → watch, bukan computed.
\n## watch: Side Effects
\`watch(notes, cb)\` menjalankan callback saat sumber berubah (localStorage, fetch, log). \`deep: true\` untuk mengamati mutasi bersarang. Untuk ref: lewatkan ref langsung. Untuk properti objek reaktif: WAJIB getter — \`watch(state.count, cb)\` mengamati nilai 0, bukan state (tidak pernah terpanggil!).
\n## watchEffect: Auto-Track
\`watchEffect(cb)\` langsung dijalankan sekali dan melacak SEMUA ref yang dibaca di dalamnya secara otomatis. Risiko: infinite loop saat kamu membaca DAN menulis sumber yang sama dalam satu callback — gunakan watch dengan sumber eksplisit bila perlu kontrol.
\n## Trap: computed Ber-side-effect
\`computed(() => { localStorage.setItem(...); return x })\` = bug: computed bisa dihitung ulang kapan pun dan tanpa user sadar. Computed hanya transformasi; side effects hidup di watch/watchEffect.`,
    expEn: `## computed: Pure Derivations
\`computed\` is a value derived from other state; it CACHES until a dependency changes. It must be PURE: no state mutation / fetch / console.log inside. Rule: if you need side effects → watch, not computed.
\n## watch: Side Effects
\`watch(notes, cb)\` runs the callback when a source changes (localStorage, fetch, log). \`deep: true\` observes nested mutations. For refs: pass the ref directly. For properties of reactive objects: you MUST use a getter — \`watch(state.count, cb)\` watches the value 0, not the state (never fires!).
\n## watchEffect: Auto-Track
\`watchEffect(cb)\` runs once immediately and automatically tracks every ref read inside it. Risk: infinite loops when you read AND write the same source in one callback — use watch with explicit sources when you need control.
\n## Trap: Side-Effecting Computed
\`computed(() => { localStorage.setItem(...); return x })\` is a bug: computed may re-run anytime, invisibly. Computed is transformation only; side effects live in watch/watchEffect.`,
    chId: 'Buat pencarian buku: list buku {judul, tahun, selesai}. computed untuk filter + urutkan, watch untuk menyimpan filter terakhir ke localStorage (restore saat load), watchEffect untuk log jumlah hasil. Tambahkan "hapus semua" — dan perhatikan stats computed ikut update.',
    chEn: 'Build a book search: books {title, year, read}. computed to filter + sort, watch to persist the last filter to localStorage (restore on load), watchEffect to log result counts. Add "clear all" — notice the stats computed updates too.',
    sumId: 'computed = turunan cache & pure. watch = side effects (getter untuk properti objek!). watchEffect = auto-track, hati-hati loop. Lanjut: komponen.',
    sumEn: 'computed = cached & pure derivations. watch = side effects (getter for object properties!). watchEffect = auto-track, beware loops. Next: components.',
  },
];

// ===== PHASE 2: COMPONENTS (lessons 7-12) =====
const LESSONS_P2 = [
  {
    phase: 2, num: 7, topicId: 'komponen-sfc',
    titleId: 'Komponen & SFC', titleEn: 'Components & SFC',
    codeFile: 'src/App.vue',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.vue': `<script setup>
import ProfileCard from './components/ProfileCard.vue'
import StatsRow from './components/StatsRow.vue'

const name = 'Ayu'
const role = 'Vue Developer'
const stats = [
  { label: 'Lesson', value: 7 },
  { label: 'Latihan', value: 12 },
  { label: 'Materi', value: 3 },
]
</script>

<template>
  <main>
    <h1>Halaman Profil</h1>
    <ProfileCard :name="name" :role="role" />
    <StatsRow :stats="stats" />
  </main>
</template>
`,
        'src/components/ProfileCard.vue': `<script setup>
defineProps({
  name: String,
  role: String,
})
</script>

<template>
  <section class="card">
    <h2>{{ name }}</h2>
    <p>{{ role }}</p>
  </section>
</template>

<style scoped>
.card { border: 1px solid #ddd; border-radius: 12px; padding: 1.2rem; margin-bottom: 1rem; }
</style>
`,
        'src/components/StatsRow.vue': `<script setup>
defineProps({
  stats: Array,
})
</script>

<template>
  <div class="row">
    <div v-for="s in stats" :key="s.label" class="stat">
      <strong>{{ s.value }}</strong>
      <span>{{ s.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.row { display: flex; gap: 1rem; }
.stat { flex: 1; text-align: center; border: 1px solid #ddd; border-radius: 8px; padding: 0.8rem; }
.stat strong { display: block; font-size: 1.4rem; color: #42B883; }
</style>
`,
      };
    },
    objId: ['Memecah UI menjadi komponen kecil', 'Membangun pohon komponen (parent → child)', 'Mengimpor & memakai komponen dengan <script setup>', 'Mengisolasi style dengan scoped'],
    objEn: ['Break UI into small components', 'Build a component tree (parent → child)', 'Import & use components with <script setup>', 'Isolate styles with scoped'],
    expId: `## Kenapa Komponen?
Satu file raksasa sulit dipelihara. Komponen = blok UI reusable dengan logika sendiri. Prinsip: pecah saat komponen > ~100 baris atau saat ada bagian yang jelas bisa dipakai ulang (kartu, baris statistik, tombol).
\n## Import & Pakai
Dengan <script setup>, \`import ProfileCard from ...\` cukup — variabel komponen langsung tersedia di template. Penamaan: PascalCase untuk komponen (\`ProfileCard.vue\` bukan \`profileCard.vue\`).
\n## style scoped
\`<style scoped>\` menambahkan atribut data unik sehingga CSS hanya berlaku di komponen itu — mencegah bentrok class antar komponen. Tanpa scoped, class global bisa saling menimpa.
\n## Aturan Satu File Satu Komponen
Nama file = nama komponen. Gunakan satu direktori \`src/components/\`. App.vue tetap jadi akar yang menyusun komposisi (App = "halaman", components = "bagian").`,
    expEn: `## Why Components?
A giant single file is unmaintainable. A component is a reusable UI block with its own logic. Rule: split when a component exceeds ~100 lines or when a part is clearly reusable (cards, stat rows, buttons).
\n## Import & Use
With <script setup>, \`import ProfileCard from ...\` is enough — the component variable is directly available in the template. Naming: PascalCase for components (\`ProfileCard.vue\`, not \`profileCard.vue\`).
\n## style scoped
\`<style scoped>\` adds a unique data attribute so the CSS only applies inside that component — preventing class clashes across components. Without scoped, global classes can overwrite each other.
\n## One File, One Component
File name = component name. Use a single \`src/components/\` directory. App.vue remains the root that composes everything (App = "page", components = "parts").`,
    chId: 'Pecah kartu produk dari pelajaran 3 menjadi: ProductCard.vue (tampilan) dan App.vue (state). Tambahkan komponen BadgePromo yang dipakai di dalam ProductCard. Perhatikan: tiga level pohon komponen.',
    chEn: 'Split the product card from lesson 3 into: ProductCard.vue (presentation) and App.vue (state). Add a BadgePromo component used inside ProductCard. Notice: three levels of component tree.',
    sumId: 'Komponen = blok reusable. Import otomatis via <script setup>. PascalCase. style scoped. Pecah saat besar/reusable. Lanjut: props.',
    sumEn: 'Components = reusable blocks. Auto-import via <script setup>. PascalCase. scoped styles. Split when big/reusable. Next: props.',
  },
  {
    phase: 2, num: 8, topicId: 'props',
    titleId: 'Props: Aliran Data Satu Arah', titleEn: 'Props: One-Way Data Flow',
    codeFile: 'src/App.vue',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.vue': `<script setup>
import ProductCard from './components/ProductCard.vue'

const products = [
  { id: 1, name: 'Vue Mug', price: 120000, rating: 4.5 },
  { id: 2, name: 'Vue T-Shirt', price: 185000, rating: 5 },
  { id: 3, name: 'Stiker Vue', price: 15000, rating: 3 },
]
</script>

<template>
  <h1>Katalog</h1>
  <div class="grid">
    <ProductCard
      v-for="p in products"
      :key="p.id"
      :name="p.name"
      :price="p.price"
      :rating="p.rating"
    />
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
</style>
`,
        'src/components/ProductCard.vue': `<script setup>
// Deklarasi props dengan objek: tipe + default + required
defineProps({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
})

const stars = (rating) => '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating))
</script>

<template>
  <article class="card">
    <h3>{{ name }}</h3>
    <p>Rp{{ price.toLocaleString('id-ID') }}</p>
    <p class="stars">{{ stars(rating) }}</p>
  </article>
</template>

<style scoped>
.card { border: 1px solid #ddd; border-radius: 12px; padding: 1rem; }
.stars { color: #f5b301; }
</style>
`,
      };
    },
    objId: ['Mengirim data parent → child dengan props', 'Mendeklarasikan props: tipe, required, default', 'Memahami props itu read-only (aliran satu arah)', 'Menghindari mutasi props'],
    objEn: ['Pass data parent → child with props', 'Declare props: types, required, defaults', 'Understand props are read-only (one-way flow)', 'Avoid mutating props'],
    expId: `## Aliran Satu Arah
Props turun dari parent ke child. Data di parent TIDAK ikut berubah saat child mengubah props (itu dilarang!). Umpan balik child → parent lewat emits (pelajaran 9).
\n## Deklarasi Props
Dua gaya: array (\`['name']\`) atau objek dengan spesifikasi (\`{ name: { type: String, required: true } }\`). Spesifikasi memberi validasi + dokumentasi + default. Default hanya dipakai saat parent tidak mengirim.
\n## Trap: Mutasi Props
\`name = 'x'\` di child = anti-pattern (mengubah milik parent secara tak terlihat). Jika child perlu nilai lokal awal dari props: salin ke ref sendiri. Jika perlu mengubah data asli: emit event (next lesson).
\n## Tips: Variabel vs Literal
Dengan kebab-case di template, props PascalCase di deklarasi berubah menjadi kebab di pemakaian (\`:productName\` = \`:product-name\`). Props statis tanpa ":" dikirim sebagai string literal.`,
    expEn: `## One-Way Flow
Props flow down from parent to child. Parent data does NOT change when the child edits props (it is forbidden!). Feedback child → parent goes through emits (lesson 9).
\n## Declaring Props
Two styles: array (\`['name']\`) or object with spec (\`{ name: { type: String, required: true } }\`). The spec adds validation + documentation + defaults. Defaults only apply when the parent sends nothing.
\n## Trap: Mutating Props
\`name = 'x'\` inside the child is an anti-pattern (silently changing the parent's data). If the child needs a local initial value from a prop: copy it to a local ref. If it must change the real data: emit an event (next lesson).
\n## Tips: Variables vs Literals
In templates with kebab-case, PascalCase prop declarations become kebab in usage (\`:productName\` = \`:product-name\`). Static props without ":" are sent as string literals.`,
    chId: 'Buat daftar film: App punya array films; FilmCard menerima props judul, tahun, genre, rating, sudahDitonton. Tambahkan prop wajib (judul) dan prop default (tahun = 2024). Coba mutasi props di child — lihat warning di konsol.',
    chEn: 'Build a movie list: App has a films array; FilmCard receives title, year, genre, rating, watched props. Add a required prop (title) and a default prop (year = 2024). Try mutating a prop in the child — watch the console warning.',
    sumId: 'Props: parent → child, satu arah, read-only. Deklarasi dengan tipe/required/default. Mutasi props = anti-pattern (emit saja). Lanjut: emits.',
    sumEn: 'Props: parent → child, one-way, read-only. Declare with types/required/defaults. Mutating props = anti-pattern (emit instead). Next: emits.',
  },
  {
    phase: 2, num: 9, topicId: 'emits',
    titleId: 'Emits: Anak → Induk', titleEn: 'Emits: Child → Parent',
    codeFile: 'src/App.vue',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.vue': `<script setup>
import { ref } from 'vue'
import TaskItem from './components/TaskItem.vue'

const tasks = ref([
  { id: 1, title: 'Belajar props', done: true },
  { id: 2, title: 'Belajar emits', done: false },
])

function handleToggle(id) {
  const t = tasks.value.find((task) => task.id === id)
  if (t) t.done = !t.done
}

function handleDelete(id) {
  tasks.value = tasks.value.filter((task) => task.id !== id)
}
</script>

<template>
  <h1>Emits: Anak ke Induk</h1>
  <TaskItem
    v-for="t in tasks"
    :key="t.id"
    :task="t"
    @toggle="handleToggle"
    @delete="handleDelete"
  />
  <p>{{ tasks.length }} tugas tersisa</p>
</template>
`,
        'src/components/TaskItem.vue': `<script setup>
// Deklarasi emits: dokumentasi + validasi
const emit = defineEmits(['toggle', 'delete'])

const props = defineProps({
  task: { type: Object, required: true },
})

function onToggle() {
  emit('toggle', props.task.id)
}
</script>

<template>
  <li class="item" :class="{ done: task.done }">
    <label>
      <input type="checkbox" :checked="task.done" @change="onToggle" />
      {{ task.title }}
    </label>
    <button @click="emit('delete', task.id)">hapus</button>
  </li>
</template>

<style scoped>
.item { display: flex; justify-content: space-between; margin: 0.4rem 0; }
.done { text-decoration: line-through; color: #888; }
</style>
`,
      };
    },
    objId: ['Mengirim data child → parent dengan emits', 'Mendeklarasikan event dengan defineEmits', 'Mengirim payload (id, nilai, event)', 'Memahami pola: props turun, events naik'],
    objEn: ['Send data child → parent with emits', 'Declare events with defineEmits', 'Send payloads (id, values, events)', 'Understand the pattern: props down, events up'],
    expId: `## Props Turun, Events Naik
Data mengalir satu arah ke bawah, event naik ke atas. Child TIDAK menyentuh data parent; child memberitahu via \`emit('toggle', id)\` dan parent memutuskan cara memprosesnya.
\n## defineEmits
\`defineEmits(['toggle', 'delete'])\` mendeklarasikan event (dokumentasi + validasi). Di template, panggil \`emit('delete', task.id)\` langsung atau lewat fungsi. Parent mendengarkan: \`@delete="handleDelete"\`.
\n## Payload Event
Event bisa membawa argumen apa pun: \`emit('toggle', task.id)\`, \`emit('submit', { name, email })\`. Handler parent menerima sebagai parameter pertama — data yang TIDAK ikut dibungkus event asli.
\n## Kapan Menggunakan Emits
Setiap kali child perlu "meminta" perubahan data milik parent: toggle, delete, submit, pilih. Aturan: jika child mengubah sesuatu yang BUKAN state lokalnya sendiri → emits. Konsisten dengan pola form (lesson 5): \`@submit.prevent\` + emit payload objek.`,
    expEn: `## Props Down, Events Up
Data flows one way down, events bubble up. A child never touches parent data; it notifies via \`emit('toggle', id)\` and the parent decides how to process it.
\n## defineEmits
\`defineEmits(['toggle', 'delete'])\` declares events (documentation + validation). In templates call \`emit('delete', task.id)\` directly or through a function. The parent listens: \`@delete="handleDelete"\`.
\n## Event Payloads
Events can carry any arguments: \`emit('toggle', task.id)\`, \`emit('submit', { name, email })\`. The parent handler receives them as first parameters — data is not wrapped in the raw event.
\n## When to Use Emits
Every time a child needs to "request" a change to parent-owned data: toggle, delete, submit, select. Rule: if the child changes something that is NOT its own local state → emits. Stay consistent with the lesson-5 form pattern: \`@submit.prevent\` + emitting an object payload.`,
    chId: 'Buat voting app: App punya array kandidat; VoteButton meng-email \'increment\' + payload id; hasil diperbarui di App. Tambahkan tombol "reset semua" di App. Latihan: event dengan payload objek \u0060emit(\'vote\', { id, by: \'user\' })\u0060.',
    chEn: 'Build a voting app: App has a candidates array; VoteButton emits "increment" + id payload; results update in App. Add a "reset all" button in App. Practice: events with object payloads \u0060emit(\'vote\', { id, by: \'user\' })\u0060.',
    sumId: 'Events naik: emit(\'nama\', payload). defineEmits untuk deklarasi. Props turun + events naik = aliran dua arah yang sehat. Lanjut: v-model pada komponen.',
    sumEn: 'Events bubble up: emit(name, payload). defineEmits declares them. Props down + events up = a healthy two-way flow. Next: v-model on components.',
  },
  {
    phase: 2, num: 10, topicId: 'v-model-komponen',
    titleId: 'v-model pada Komponen', titleEn: 'v-model on Components',
    codeFile: 'src/App.vue',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.vue': `<script setup>
import { ref } from 'vue'
import SearchInput from './components/SearchInput.vue'
import EditableTitle from './components/EditableTitle.vue'

const query = ref('')
const title = ref('Daftar Belanja')

const items = ref(['Vue', 'Vite', 'Pinia'])
</script>

<template>
  <h1>{{ title }}</h1>
  <EditableTitle v-model="title" />
  <SearchInput v-model="query" placeholder="Cari item..." />
  <ul>
    <li v-for="item in items" :key="item">
      {{ item }}
    </li>
  </ul>
</template>
`,
        'src/components/SearchInput.vue': `<script setup>
// v-model pada komponen = prop 'modelValue' + event 'update:modelValue'
defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    :placeholder="placeholder"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
`,
        'src/components/EditableTitle.vue': `<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

// Pola getter/setter: baca prop, tulis event
const value = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})
</script>

<template>
  <input v-model="value" class="title" />
</template>

<style scoped>
.title { font-size: 1.2rem; font-weight: 600; }
</style>
`,
      };
    },
    objId: ['Memahami kontrak v-model: modelValue + update:modelValue', 'Membangun input reusable dengan v-model', 'Menggunakan pola computed getter/setter', 'Menggabungkan beberapa v-model (v-model:nama)'],
    objEn: ['Understand the v-model contract: modelValue + update:modelValue', 'Build reusable inputs with v-model', 'Use the computed getter/setter pattern', 'Combine multiple v-models (v-model:name)'],
    expId: `## Kontrak v-model
\`v-model="x"\` pada komponen = \`:modelValue="x"\` + \`@update:modelValue="x = $event"\`. Itulah satu-satunya yang perlu diimplementasikan komponen: terima prop modelValue, emit update:modelValue.
\n## Pola Getter/Setter
Untuk input kompleks, buat computed dengan get (baca props.modelValue) dan set (emit update). Di template tinggal \`v-model="value"\` — bersih dan tidak perlu \`$event.target.value\` manual.
\n## Beberapa v-model
\`v-model:title\` + \`v-model:body\` mengikat dua pasang prop/event: \`title\`/\`update:title\`, \`body\`/\`update:body\`. Cocok untuk form multi-field yang dibungkus komponen.
\n## Trap: Menulis Prop Langsung
Jangan pernah \`props.modelValue = v\` — itu mutasi props. Satu-satunya jalan keluar yang benar adalah emit update:modelValue, lalu parent yang mengubah state miliknya.`,
    expEn: `## The v-model Contract
\`v-model="x"\` on a component = \`:modelValue="x"\` + \`@update:modelValue="x = $event"\`. That is all a component must implement: accept the modelValue prop, emit update:modelValue.
\n## Getter/Setter Pattern
For complex inputs, create a computed with get (read props.modelValue) and set (emit update). In the template just \`v-model="value"\` — clean, no manual \`$event.target.value\`.
\n## Multiple v-models
\`v-model:title\` + \`v-model:body\` bind two prop/event pairs: \`title\`/\`update:title\`, \`body\`/\`update:body\`. Great for multi-field forms wrapped in one component.
\n## Trap: Writing the Prop Directly
Never \`props.modelValue = v\` — that mutates props. The only correct way out is emitting update:modelValue; the parent then changes its own state.`,
    chId: 'Buat FormField reusable: prop label, modelValue, type; emit update. Pakai tiga FormField (nama, email, umur) dengan \u0060v-model:label\` style (v-model biasa). Tambahkan validasi sederhana: tombol submit nonaktif jika ada field kosong (computed di App).',
    chEn: 'Build a reusable FormField: label, modelValue, type props; update emit. Use three FormFields (name, email, age) with plain v-model. Add simple validation: submit button disabled if any field is empty (computed in App).',
    sumId: 'v-model komponen = modelValue + update:modelValue. Pola getter/setter untuk input bersih. v-model:nama untuk multi-field. Jangan mutasi props. Lanjut: slots.',
    sumEn: 'Component v-model = modelValue + update:modelValue. Getter/setter pattern for clean inputs. v-model:name for multi-field. Never mutate props. Next: slots.',
  },
  {
    phase: 2, num: 11, topicId: 'slots-inject',
    titleId: 'Slots & Provide/Inject', titleEn: 'Slots & Provide/Inject',
    codeFile: 'src/App.vue',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.vue': `<script setup>
import { ref, provide } from 'vue'
import PageCard from './components/PageCard.vue'
import ThemeText from './components/ThemeText.vue'

const theme = ref('light')
provide('theme', theme)

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <button @click="toggleTheme">Tema: {{ theme }}</button>

  <PageCard title="Default Slot">
    Konten ini masuk ke slot default.
  </PageCard>

  <PageCard>
    <template #title>Judul Kustom (named slot)</template>
    <p>Slot bisa berisi komponen lain, termasuk ThemeText:</p>
    <ThemeText />
  </PageCard>
</template>
`,
        'src/components/PageCard.vue': `<script setup>
// Slot default + named slot 'title' dengan fallback content
</script>

<template>
  <section class="card">
    <h2>
      <slot name="title">Judul Default</slot>
    </h2>
    <slot></slot>
  </section>
</template>

<style scoped>
.card { border: 1px solid #ddd; border-radius: 12px; padding: 1.2rem; margin-bottom: 1rem; }
</style>
`,
        'src/components/ThemeText.vue': `<script setup>
import { inject } from 'vue'

// inject: membaca nilai dari provide() di ancestor mana pun
const theme = inject('theme', 'light')
</script>

<template>
  <p :class="theme">Provide/Inject menembus berapa pun kedalaman — tanpa prop drilling.</p>
</template>

<style scoped>
.light { color: #222; }
.dark { color: #42B883; }
</style>
`,
      };
    },
    objId: ['Menyisipkan konten dengan slots (default & named)', 'Membuat fallback content di slot', 'Menggunakan scoped slots untuk data binding', 'Menghindari prop drilling dengan provide/inject'],
    objEn: ['Insert content with slots (default & named)', 'Create fallback content in slots', 'Use scoped slots for data binding', 'Avoid prop drilling with provide/inject'],
    expId: `## Slot = Tempat Sisip
\`<slot>\` di komponen adalah "lubang" yang diisi parent. Komponen layout (kartu, modal, halaman) memakai slot agar bisa menyusun konten berbeda tanpa hard-code. Tanpa slot, komponen tidak bisa menerima konten.
\n## Named & Fallback
\`<slot name="title">\` diisi via \`<template #title>\`. Teks di dalam tag slot = fallback saat parent tidak mengirim. Pola: \`<slot>\` (default) + \`<slot name="header">\`.
\n## Scoped Slot (lanjutan)
\`<slot :item="item">\` mengirim data dari child ke konten slot parent — parent menerimanya via \`<template #default="{ item }">\`. Berguna untuk list generic yang tetap memegang logika item di child.
\n## Provide/Inject
\`provide('theme', ref)\` di root; \`inject('theme')\` di komponen sedalam apa pun. Menggantikan rantai props 3+ level (prop drilling). Aturan: pakai saat >2 level atau banyak komponen jauh memakai nilai yang sama; untuk 1-2 level, props tetap lebih jelas.`,
    expEn: `## Slot = Insertion Point
\`<slot>\` inside a component is a "hole" the parent fills. Layout components (cards, modals, pages) use slots to compose different content without hard-coding. Without slots, components cannot receive content.
\n## Named & Fallback
\`<slot name="title">\` is filled via \`<template #title>\`. Text inside the slot tag = fallback when the parent sends nothing. Pattern: \`<slot>\` (default) + \`<slot name="header">\`.
\n## Scoped Slots (advanced)
\`<slot :item="item">\` sends data from child to the parent's slot content — the parent receives it via \`<template #default="{ item }">\`. Great for generic lists that keep item logic in the child.
\n## Provide/Inject
\`provide('theme', ref)\` at the root; \`inject('theme')\` at any depth. Replaces 3+ level prop chains (prop drilling). Rule: use when >2 levels deep or many distant components share a value; for 1-2 levels, props stay clearer.`,
    chId: 'Buat komponen TableGrid dengan scoped slot kolom: \u0060<slot name="cell" :row="row">\u0060. Di App, render daftar user dengan kolom kustom (nama tebal, aksi tombol). Tambahkan provide(\'currentUser\') dan tampilkan di komponen terdalam.',
    chEn: 'Build a TableGrid component with a scoped column slot: \u0060<slot name="cell" :row="row">\u0060. In App, render a user list with custom columns (bold name, action buttons). Add provide("currentUser") and show it in the deepest component.',
    sumId: 'Slot: lubang konten (default/named/fallback/scoped). Provide/inject: menembus kedalaman tanpa prop drilling (>2 level). Lanjut: proyek komponen.',
    sumEn: 'Slots: content holes (default/named/fallback/scoped). Provide/inject: pierces depth without prop drilling (>2 levels). Next: component project.',
  },
  {
    phase: 2, num: 12, topicId: 'proyek-komponen',
    titleId: 'Proyek: Modal + Form + Tabs', titleEn: 'Project: Modal + Form + Tabs',
    codeFile: 'src/App.vue',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.vue': `<script setup>
import { ref } from 'vue'
import AppModal from './components/AppModal.vue'
import ContactForm from './components/ContactForm.vue'
import Tabs from './components/Tabs.vue'

const showModal = ref(false)
const contacts = ref([
  { id: 1, name: 'Ayu', email: 'ayu@mail.com' },
  { id: 2, name: 'Budi', email: 'budi@mail.com' },
])

function addContact(data) {
  contacts.value.push({ id: Date.now(), ...data })
  showModal.value = false
}
</script>

<template>
  <h1>Buku Kontak</h1>
  <Tabs :tabs="['Semua', 'Favorit']">
    <template #panel-0>
      <ul>
        <li v-for="c in contacts" :key="c.id">
          {{ c.name }} — {{ c.email }}
        </li>
      </ul>
    </template>
    <template #panel-1>
      <p>Belum ada favorit. Klik + untuk tambah kontak.</p>
    </template>
  </Tabs>

  <button @click="showModal = true">+ Kontak Baru</button>

  <AppModal :open="showModal" @close="showModal = false">
    <template #title>Tambah Kontak</template>
    <ContactForm @submit="addContact" />
  </AppModal>
</template>
`,
        'src/components/AppModal.vue': `<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  open: Boolean,
})
const emit = defineEmits(['close'])

const visible = ref(props.open)
watch(() => props.open, (v) => { visible.value = v })
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="visible" class="backdrop" @click.self="emit('close')">
        <div class="modal">
          <header>
            <slot name="title">Judul</slot>
            <button class="x" @click="emit('close')">x</button>
          </header>
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; }
.modal { background: #fff; border-radius: 12px; padding: 1.5rem; max-width: 420px; width: 100%; }
header { display: flex; justify-content: space-between; }
.x { border: none; background: none; font-size: 1.2rem; cursor: pointer; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
`,
        'src/components/ContactForm.vue': `<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit'])
const name = ref('')
const email = ref('')

function submit() {
  if (!name.value.trim() || !email.value.includes('@')) return
  emit('submit', { name: name.value.trim(), email: email.value.trim() })
  name.value = ''
  email.value = ''
}
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model.trim="name" placeholder="Nama" />
    <input v-model.trim="email" placeholder="Email" type="email" />
    <button type="submit">Simpan</button>
  </form>
</template>

<style scoped>
input { margin-right: 0.5rem; }
</style>
`,
        'src/components/Tabs.vue': `<script setup>
import { ref } from 'vue'

defineProps({
  tabs: { type: Array, required: true },
})

const active = ref(0)
</script>

<template>
  <nav class="tabs">
    <button
      v-for="(tab, i) in tabs"
      :key="tab"
      :class="{ active: i === active }"
      @click="active = i"
    >
      {{ tab }}
    </button>
  </nav>
  <section>
    <slot :name="'panel-' + active"></slot>
  </section>
</template>

<style scoped>
.tabs { display: flex; gap: 0.4rem; margin-bottom: 0.8rem; }
.tabs .active { background: #42B883; color: #fff; border-color: #42B883; }
</style>
`,
      };
    },
    objId: ['Menggabungkan props, emits, slots, v-model dalam satu app', 'Membangun modal reusable (Teleport + Transition)', 'Membangun tabs generic dengan scoped slot dinamis', 'Menyusun komponen dengan kontrak yang jelas'],
    objEn: ['Combine props, emits, slots, v-model in one app', 'Build a reusable modal (Teleport + Transition)', 'Build generic tabs with dynamic scoped slots', 'Compose components with clear contracts'],
    expId: `## Kontrak Komponen
Setiap komponen punya kontrak eksplisit: AppModal ({ open } + @close + slot title/default), ContactForm (@submit + payload objek), Tabs ({ tabs } + slot panel-N). Komponen yang kontraknya jelas bisa dipakai ulang tanpa membaca isi file.
\n## Teleport & Transition
\`<Teleport to="body">\` merender modal di akhir <body> (bebas dari parent yang overflow:hidden/z-index). \`<Transition>\` dengan class enter/leave memberi animasi. Modal + form = pola produksi standar.
\n## Scoped Slot Dinamis
\`:name="'panel-' + active"\` memilih slot berdasarkan state aktif — tabs generic yang kontennya ditentukan parent. Tanpa scoped slot, Tabs harus hard-code konten dan kehilangan reusability.
\n## Umpan Balik Lengkap
Amati alur: Form → emit submit (payload) → App menambah kontak → App mengatur \`showModal = false\` → Modal menutup (props turun). Data selalu milik App; komponen anak hanya melaporkan.`,
    expEn: `## Component Contracts
Every component has an explicit contract: AppModal ({ open } + @close + title/default slots), ContactForm (@submit + object payload), Tabs ({ tabs } + panel-N slots). Components with clear contracts are reusable without reading their internals.
\n## Teleport & Transition
\`<Teleport to="body">\` renders the modal at the end of <body> (free from overflow:hidden/z-index parents). \`<Transition>\` with enter/leave classes animates it. Modal + form = the standard production pattern.
\n## Dynamic Scoped Slots
\`:name="'panel-' + active"\` picks a slot based on active state — a generic Tabs whose content the parent defines. Without scoped slots, Tabs would hard-code content and lose reusability.
\n## Full Feedback Loop
Trace the flow: Form → emit submit (payload) → App adds the contact → App sets \`showModal = false\` → Modal closes (props down). Data always belongs to App; children only report.`,
    chId: 'Perluas proyek: (1) tombol hapus kontak dengan konfirmasi di modal yang sama, (2) tab "Favorit" benar-benar berfungsi (toggle bintang di baris kontak), (3) validasi duplikat email. Commit ke git setelah tiap fitur — pola "commit per exercise".',
    chEn: 'Extend the project: (1) delete contact with a confirmation inside the same modal, (2) make the "Favorites" tab real (star toggle per row), (3) duplicate-email validation. Commit to git after each feature — the "commit per exercise" pattern.',
    sumId: 'Proyek menggabungkan props/emits/slots/v-model. Teleport + Transition untuk modal. Scoped slot untuk komponen generic. Data di parent, anak melaporkan. Lanjut: composables.',
    sumEn: 'Project combines props/emits/slots/v-model. Teleport + Transition for modals. Scoped slots for generic components. Data in parent, children report. Next: composables.',
  },
];

// ===== PHASE 3: ARCHITECTURE (lessons 13-18) =====
const LESSONS_P3 = [
  {
    phase: 3, num: 13, topicId: 'composables',
    titleId: 'Composables', titleEn: 'Composables',
    codeFile: 'src/App.vue',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.vue': `<script setup>
import { useCounter } from './composables/useCounter'
import { useLocalStorage } from './composables/useLocalStorage'

// Setiap pemanggilan composable = state instance TERPISAH
const a = useCounter(0)
const b = useCounter(100)

const savedNotes = useLocalStorage('notes', ['Belajar composables'])
</script>

<template>
  <h1>Dua Counter Independen</h1>
  <p>Counter A: {{ a.count.value }} <button @click="a.increment()">+1</button></p>
  <p>Counter B: {{ b.count.value }} <button @click="b.increment()">+1</button></p>

  <h2>useLocalStorage (persist)</h2>
  <ul>
    <li v-for="(n, i) in savedNotes.value" :key="i">{{ n }}</li>
  </ul>
</template>
`,
        'src/composables/useCounter.js': `import { ref, computed } from 'vue'

// Composable = fungsi yang memakai reaktivitas Vue.
// Awalan 'use' menandakan: panggil di setup context.
export function useCounter(start = 0) {
  const count = ref(start)
  const doubled = computed(() => count.value * 2)

  function increment() { count.value += 1 }
  function reset() { count.value = start }

  return { count, doubled, increment, reset }
}
`,
        'src/composables/useLocalStorage.js': `import { ref, watch } from 'vue'

export function useLocalStorage(key, initial) {
  const stored = ref(JSON.parse(localStorage.getItem(key)) ?? initial)

  watch(stored, (val) => {
    localStorage.setItem(key, JSON.stringify(val))
  }, { deep: true })

  return stored
}
`,
      };
    },
    objId: ['Mengekstrak logika stateful ke composable (awalan use)', 'Memahami state instance vs state bersama', 'Menulis composable sendiri: useCounter, useLocalStorage', 'Meniru pola dari VueUse (200+ utilitas)'],
    objEn: ['Extract stateful logic into composables (use prefix)', 'Understand instance state vs shared state', 'Write your own composables: useCounter, useLocalStorage', 'Mirror patterns from VueUse (200+ utilities)'],
    expId: `## Apa Itu Composable?
Fungsi biasa yang memakai reaktivitas Vue (ref, computed, watch) dan mengembalikan state + method. Inilah PAYOFF utama Composition API: logic reuse tanpa mixins (yang punya naming collision & dependency tersembunyi).
\n## State Instance vs Bersama
Ref di DALAM fungsi composable = state per instance (tiap pemanggilan dapat instance sendiri — lihat counter A vs B). Ref di LUAR fungsi = state global bersama. Menaruh ref di tempat salah adalah bug klasik "sharing state tak sengaja".
\n## Konvensi Penulisan
Awalan \`use\` wajib (menandakan memakai reaktivitas). Return object berisi refs + fungsi. Cleanup: kembalikan fungsi untuk membersihkan interval/listener (dipanggil di onUnmounted).
\n## Kapan TIDAK Mengekstrak
Jangan ekstrak 3 baris yang hanya dipakai satu komponen. Ekstrak saat: dipakai 2+ komponen, atau logika kompleks yang mengacaukan komponen (>20 baris terkait). Baca sumber VueUse untuk internalisasi pola.`,
    expEn: `## What Is a Composable?
An ordinary function that uses Vue reactivity (ref, computed, watch) and returns state + methods. This is the MAIN payoff of the Composition API: logic reuse without mixins (which cause naming collisions and hidden dependencies).
\n## Instance vs Shared State
Refs INSIDE the composable function = per-instance state (each call gets its own instance — see counter A vs B). Refs OUTSIDE the function = shared global state. Placing a ref in the wrong place is the classic "accidental state sharing" bug.
\n## Conventions
The \`use\` prefix is required (signals reactivity usage). Return an object of refs + functions. Cleanup: return a function that tears down intervals/listeners (called in onUnmounted).
\n## When NOT to Extract
Do not extract 3 lines used by a single component. Extract when: used by 2+ components, or complex logic cluttering a component (>20 related lines). Read the VueUse source to internalize the patterns.`,
    chId: 'Tulis useClock (detik berjalan dengan setInterval + cleanup onUnmounted) dan useDebounce (nilai tertunda). Pakai keduanya di App: jam live + input pencarian yang baru memproses setelah berhenti mengetik 300ms.',
    chEn: 'Write useClock (a running seconds interval with onUnmounted cleanup) and useDebounce (a delayed value). Use both in App: a live clock + a search input that only processes 300ms after typing stops.',
    sumId: 'Composable = logika stateful reusable (use-). Ref dalam fungsi = per instance; di luar = shared. Cleanup di onUnmounted. Jangan ekstrak berlebihan. Lanjut: data fetching.',
    sumEn: 'Composable = reusable stateful logic (use-). Refs inside = per instance; outside = shared. Cleanup in onUnmounted. Do not over-extract. Next: data fetching.',
  },
  {
    phase: 3, num: 14, topicId: 'data-fetching',
    titleId: 'Data Fetching', titleEn: 'Data Fetching',
    codeFile: 'src/App.vue',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.vue': `<script setup>
import { useFetch } from './composables/useFetch'

const { data, error, loading, retry } = useFetch(
  'https://jsonplaceholder.typicode.com/users'
)
</script>

<template>
  <h1>Fetch Users</h1>
  <p v-if="loading">Memuat...</p>
  <p v-else-if="error">Gagal: {{ error }} <button @click="retry">Coba lagi</button></p>
  <p v-else-if="!data || data.length === 0">Tidak ada data.</p>
  <ul v-else>
    <li v-for="u in data" :key="u.id">{{ u.name }} — {{ u.email }}</li>
  </ul>
</template>
`,
        'src/composables/useFetch.js': `import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  async function load() {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error('HTTP ' + res.status)
      data.value = await res.json()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  load()

  return { data, error, loading, retry: load }
}
`,
      };
    },
    objId: ['Mengambil data dengan fetch + async/await', 'Menangani 3 status UI: loading, error, empty', 'Membangun composable useFetch reusable', 'Menyusun state server terpisah dari state lokal'],
    objEn: ['Fetch data with fetch + async/await', 'Handle 3 UI states: loading, error, empty', 'Build a reusable useFetch composable', 'Keep server state separate from local state'],
    expId: `## Tiga Status Wajib
App produksi selalu menampilkan 3 status: loading (spinner/teks), error (pesan + tombol retry), dan empty (tidak ada data). \`v-if\` berurutan: \`loading\` → \`error\` → \`empty\` → data. Lewat satu status saja = UX jelek.
\n## fetch + async/await
\`await fetch(url)\` → cek \`res.ok\` → \`await res.json()\`. Jangan lupa throw saat HTTP error (fetch tidak throw otomatis untuk 404/500!). \`try/catch/finally\` menangani error jaringan dan reset loading.
\n## Mengapa useFetch?
Logika fetching (loading/error/data) identik di setiap halaman. Composable = satu tempat, dipakai di mana saja. Pola ini yang dipakai Nuxt (\`useFetch\`) dan TanStack Query/Pinia Colada untuk server state.
\n## Server State ≠ State Lokal
Data dari API bukan "state app" — jangan masukkan ke Pinia (pelajaran 17). Server state punya siklus hidup sendiri: refetch, invalidasi, cache. Gunakan useFetch/query library; Pinia untuk state UI lintas komponen.`,
    expEn: `## Three Required States
Production apps always show 3 states: loading (spinner/text), error (message + retry button), and empty (no data). Chain \`v-if\` in order: \`loading\` → \`error\` → \`empty\` → data. Missing any one = poor UX.
\n## fetch + async/await
\`await fetch(url)\` → check \`res.ok\` → \`await res.json()\`. Do not forget to throw on HTTP errors (fetch does NOT throw for 404/500 by default!). \`try/catch/finally\` handles network errors and resets loading.
\n## Why useFetch?
Fetching logic (loading/error/data) is identical on every page. A composable = one place, used everywhere. This is the pattern Nuxt (\`useFetch\`) and TanStack Query/Pinia Colada use for server state.
\n## Server State != Local State
API data is not "app state" — do not put it in Pinia (lesson 17). Server state has its own lifecycle: refetch, invalidation, caching. Use useFetch/query libraries; Pinia is for cross-component UI state.`,
    chId: 'Bangun halaman daftar posting + detail: useFetch untuk /posts, klik item → useFetch /posts/{id}. Tambahkan status empty ketika filter pencarian tidak cocok. Simulasikan error: ubah URL jadi URL tidak valid, lihat tombol retry bekerja.',
    chEn: 'Build a posts list + detail page: useFetch for /posts, click an item → useFetch /posts/{id}. Add an empty state when the search filter matches nothing. Simulate an error: change the URL to an invalid one, see the retry button work.',
    sumId: '3 status: loading/error/empty. fetch tidak throw otomatis — cek res.ok. useFetch reusable. Server state terpisah dari Pinia. Lanjut: router.',
    sumEn: '3 states: loading/error/empty. fetch does not auto-throw — check res.ok. Reusable useFetch. Server state stays out of Pinia. Next: router.',
  },
  {
    phase: 3, num: 15, topicId: 'router-dasar',
    titleId: 'Vue Router Dasar', titleEn: 'Vue Router Basics',
    codeFile: 'src/router/index.js',
    get files() {
      return {
        ...withPkg({ dependencies: { vue: '^3.5.0', 'vue-router': '^4.5.0' } }),
        'src/main.js': `import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import './index.css';
createApp(App).use(router).mount('#app');
`,
        'src/router/index.js': `import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import UserPage from '../pages/UserPage.vue'
import AboutPage from '../pages/AboutPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/about', name: 'about', component: AboutPage },
  { path: '/users/:id', name: 'user', component: UserPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
`,
        'src/App.vue': `<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Beranda</RouterLink>
    <RouterLink to="/about">Tentang</RouterLink>
    <RouterLink to="/users/1">User 1</RouterLink>
    <RouterLink to="/users/2">User 2</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
nav { display: flex; gap: 1rem; margin-bottom: 1rem; }
a.router-link-active { color: #42B883; font-weight: 600; }
</style>
`,
        'src/pages/HomePage.vue': `<template>
  <section>
    <h1>Beranda</h1>
    <p>Ini adalah Single-Page Application: navigasi tanpa reload halaman.</p>
  </section>
</template>
`,
        'src/pages/AboutPage.vue': `<template>
  <section>
    <h1>Tentang</h1>
    <p>Vue Router memetakan path URL ke komponen.</p>
  </section>
</template>
`,
        'src/pages/UserPage.vue': `<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <section>
    <h1>Halaman User</h1>
    <p>Route param: <strong>{{ route.params.id }}</strong></p>
  </section>
</template>
`,
      };
    },
    objId: ['Membangun multi-page SPA dengan Vue Router', 'Menggunakan RouterLink & RouterView', 'Membuat dynamic routes dengan :params', 'Membaca param dengan useRoute()'],
    objEn: ['Build multi-page SPAs with Vue Router', 'Use RouterLink & RouterView', 'Create dynamic routes with :params', 'Read params with useRoute()'],
    expId: `## SPA & Router
SPA = satu halaman HTML; "pindah halaman" = router menukar komponen di \`<RouterView>\` tanpa reload. \`createWebHistory()\` memberi URL bersih (/about) tanpa hash (#/about).
\n## RouterLink
\`<RouterLink to="/about">\` merender <a> dengan navigasi terinterupsi — SPA tidak reload. Class aktif otomatis: \`.router-link-active\` (cocok untuk styling menu).
\n## Dynamic Routes
\`path: '/users/:id'\` menangkap segmen URL sebagai \`route.params.id\`. Akses via \`useRoute()\`. Ganti dengan prop routes (\`props: true\`) untuk kejelasan: komponen menerima id sebagai prop biasa.
\n## Struktur Proyek
Konvensi: \`src/router/index.js\` (konfigurasi), \`src/pages/\` (komponen halaman), \`src/components/\` (komponen UI). Halaman = full-screen; komponen = bagian reusable. Ini pola yang sama di Nuxt.`,
    expEn: `## SPA & Router
An SPA is one HTML page; "navigating" = the router swaps components inside \`<RouterView>\` without a reload. \`createWebHistory()\` gives clean URLs (/about) instead of hashes (#/about).
\n## RouterLink
\`<RouterLink to="/about">\` renders an <a> with intercepted navigation — the SPA never reloads. Active classes are automatic: \`.router-link-active\` (great for menu styling).
\n## Dynamic Routes
\`path: '/users/:id'\` captures a URL segment as \`route.params.id\`. Access via \`useRoute()\`. Prefer route props (\`props: true\`) for clarity: the component receives id as a normal prop.
\n## Project Structure
Convention: \`src/router/index.js\` (config), \`src/pages/\` (page components), \`src/components/\` (UI components). Pages are full-screen; components are reusable parts. This is the same pattern Nuxt uses.`,
    chId: 'Tambah halaman Produk: /products (list dari useFetch) dan /products/:id (detail). RouterLink ke detail memakai \u0060:to="{ name: \'product\', params: { id: p.id } }"\u0060. Ubah UserPage menerima id sebagai prop (\u0060props: true\u0060).',
    chEn: 'Add a Products page: /products (list from useFetch) and /products/:id (detail). RouterLink to detail uses \u0060:to="{ name: \'product\', params: { id: p.id } }"\u0060. Make UserPage receive id as a prop (\u0060props: true\u0060).',
    sumId: 'Router = SPA tanpa reload. RouterLink + RouterView. Dynamic routes :params. Konvensi folder pages/ + router/. Lanjut: router lanjutan.',
    sumEn: 'Router = SPA without reload. RouterLink + RouterView. Dynamic :params routes. pages/ + router/ folder convention. Next: advanced routing.',
  },
  {
    phase: 3, num: 16, topicId: 'router-lanjut',
    titleId: 'Router Lanjutan', titleEn: 'Advanced Routing',
    codeFile: 'src/router/index.js',
    get files() {
      return {
        ...withPkg({ dependencies: { vue: '^3.5.0', 'vue-router': '^4.5.0' } }),
        'src/main.js': `import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import './index.css';
createApp(App).use(router).mount('#app');
`,
        'src/router/index.js': `import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../pages/HomePage.vue') },
  {
    path: '/dashboard',
    component: () => import('../pages/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'dashboard', component: () => import('../pages/DashboardHome.vue') },
      { path: 'settings', name: 'settings', component: () => import('../pages/DashboardSettings.vue') },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../pages/NotFound.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard: proteksi route
router.beforeEach((to) => {
  const isLoggedIn = localStorage.getItem('demo-auth') === '1'
  if (to.meta.requiresAuth && !isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
`,
        'src/App.vue': `<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Beranda</RouterLink>
    <RouterLink to="/dashboard">Dashboard</RouterLink>
    <RouterLink to="/login">Login</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
`,
        'src/pages/HomePage.vue': `<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const username = ref('')

function login() {
  localStorage.setItem('demo-auth', '1')
  router.push('/dashboard')
}
</script>

<template>
  <section>
    <h1>Beranda</h1>
    <button @click="login">Login demo (set auth)</button>
    <RouterLink to="/dashboard">Ke dashboard (terproteksi)</RouterLink>
    <RouterLink to="/abc">Route 404</RouterLink>
  </section>
</template>
`,
        'src/pages/DashboardLayout.vue': `<template>
  <section>
    <h1>Dashboard</h1>
    <nav>
      <RouterLink to="/dashboard">Ringkasan</RouterLink>
      <RouterLink to="/dashboard/settings">Pengaturan</RouterLink>
    </nav>
    <RouterView />
  </section>
</template>
`,
        'src/pages/DashboardHome.vue': `<template>
  <p>Ini adalah nested route: konten di dalam layout Dashboard.</p>
</template>
`,
        'src/pages/DashboardSettings.vue': `<template>
  <p>Pengaturan akun (nested route kedua).</p>
</template>
`,
        'src/pages/NotFound.vue': `<template>
  <section>
    <h1>404</h1>
    <p>Halaman tidak ditemukan.</p>
    <RouterLink to="/">Kembali ke beranda</RouterLink>
  </section>
</template>
`,
      };
    },
    objId: ['Membuat nested routes dengan children', 'Melindungi route dengan navigation guards', 'Lazy loading route dengan dynamic import', 'Menangani halaman 404 dengan catch-all'],
    objEn: ['Create nested routes with children', 'Protect routes with navigation guards', 'Lazy-load routes with dynamic imports', 'Handle 404 pages with catch-all'],
    expId: `## Nested Routes
\`children\` membuat route bertingkat: layout (sidebar/header) sebagai komponen induk, konten anak di \`<RouterView>\` kedua di dalam layout. Pattern dashboard klasik.
\n## Navigation Guards
\`router.beforeEach((to) => ...)\` dijalankan sebelum navigasi. Kembalikan route lain untuk redirect (\`return { name: 'login' }\`) atau true/undefined untuk lanjut. \`to.meta.requiresAuth\` = metadata per route — pola proteksi halaman standar.
\n## Lazy Loading
\`component: () => import(...)\` memecah kode per route: chunk diunduh saat pertama kali dikunjungi. Bundle awal kecil, navigasi tetap cepat. Ini praktik standar produksi — jangan import statis untuk halaman besar.
\n## Catch-all 404
\`{ path: '/:pathMatch(.*)*' }\` menangkap URL yang tidak cocok route mana pun. Selalu punya halaman 404 yang ramah, bukan layar putih.`,
    expEn: `## Nested Routes
\`children\` creates nested routes: a layout (sidebar/header) as the parent component, child content in a second \`<RouterView>\` inside that layout. The classic dashboard pattern.
\n## Navigation Guards
\`router.beforeEach((to) => ...)\` runs before navigation. Return another route to redirect (\`return { name: 'login' }\`) or true/undefined to continue. \`to.meta.requiresAuth\` is per-route metadata — the standard page-protection pattern.
\n## Lazy Loading
\`component: () => import(...)\` code-splits per route: the chunk downloads on first visit. The initial bundle stays small, navigation stays fast. This is standard production practice — never statically import large pages.
\n## Catch-all 404
\`{ path: '/:pathMatch(.*)*' }\` catches URLs matching no route. Always have a friendly 404 page, never a blank screen.`,
    chId: 'Tambahkan guard kedua: route /dashboard/settings hanya bisa diakses jika \u0060meta.requiresAuth\` DAN role "admin" ada di localStorage. Simulasikan logout (hapus localStorage + redirect ke /). Jadikan seluruh dashboard lazy-loaded.',
    chEn: 'Add a second guard: /dashboard/settings requires \u0060meta.requiresAuth\` AND an "admin" role in localStorage. Simulate logout (clear localStorage + redirect to /). Make the whole dashboard lazy-loaded.',
    sumId: 'Nested routes untuk layout. Guards + meta untuk proteksi. Lazy loading per route. Catch-all 404. Lanjut: Pinia & state ladder.',
    sumEn: 'Nested routes for layouts. Guards + meta for protection. Per-route lazy loading. Catch-all 404. Next: Pinia & the state ladder.',
  },
  {
    phase: 3, num: 17, topicId: 'pinia-state',
    titleId: 'State Ladder & Pinia', titleEn: 'State Ladder & Pinia',
    codeFile: 'src/App.vue',
    get files() {
      return {
        ...withPkg({ dependencies: { vue: '^3.5.0', pinia: '^3.0.0' } }),
        'src/main.js': `import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './index.css';
createApp(App).use(createPinia()).mount('#app');
`,
        'src/stores/cart.js': `import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Setup store: persis seperti composable — ref, computed, fungsi
export const useCartStore = defineStore('cart', () => {
  const items = ref([
    { id: 1, name: 'Vue Mug', price: 120000, qty: 1 },
  ])

  const total = computed(() =>
    items.value.reduce((sum, i) => sum + i.price * i.qty, 0)
  )

  function add(item) {
    const found = items.value.find((i) => i.id === item.id)
    if (found) found.qty += 1
    else items.value.push({ ...item, qty: 1 })
  }

  function remove(id) {
    items.value = items.value.filter((i) => i.id !== id)
  }

  return { items, total, add, remove }
})
`,
        'src/App.vue': `<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from './stores/cart'

const cart = useCartStore()

// storeToRefs: destructuring aman — menjaga reaktivitas!
const { items, total } = storeToRefs(cart)
</script>

<template>
  <h1>Keranjang (Pinia)</h1>
  <button @click="cart.add({ id: 2, name: 'Vue T-Shirt', price: 185000 })">
    Tambah T-Shirt
  </button>
  <ul>
    <li v-for="i in items" :key="i.id">
      {{ i.name }} x{{ i.qty }} — Rp{{ (i.price * i.qty).toLocaleString('id-ID') }}
      <button @click="cart.remove(i.id)">hapus</button>
    </li>
  </ul>
  <p><strong>Total: Rp{{ total.toLocaleString('id-ID') }}</strong></p>
</template>
`,
      };
    },
    objId: ['Menguasai "state ladder": lokal → lift → provide/inject → Pinia', 'Membuat store dengan defineStore (setup syntax)', 'Menggunakan getters & actions', 'Menyadari kapan TIDAK memakai Pinia'],
    objEn: ['Master the "state ladder": local → lift → provide/inject → Pinia', 'Create stores with defineStore (setup syntax)', 'Use getters & actions', 'Know when NOT to use Pinia'],
    expId: `## State Ladder (tangga keputusan)
Sebelum memakai Pinia, tanyakan berurutan: (1) server data? → query library/useFetch, (2) perlu survive refresh/link? → URL/query params, (3) dipakai satu komponen + anaknya? → ref lokal, (4) dipakai beberapa sibling? → lift ke parent terdekat, (5) dipakai banyak komponen berjauhan? → Pinia. Hampir semua state berhenti di langkah 3-4. Naik hanya saat benar-benar sakit.
\n## Setup Store = Composable
\`defineStore('cart', () => { ... })\` persis seperti composable: ref (state), computed (getters), fungsi (actions). "Kalau paham ref/computed, kamu sudah tahu 80% Pinia." Tidak ada mutation layer ala Vuex.
\n## storeToRefs
Destructuring store biasa (\`const { items } = cart\`) memutus reaktivitas — jebakan yang sama seperti reactive(). Wajib \`storeToRefs(cart)\` untuk state; method/action bisa langsung \`cart.add()\`.
\n## Kapan TIDAK Pakai Pinia
Satu komponen → jangan. Form draft → jangan (hidup di komponen). Server data → jangan (siklus hidup berbeda). Toggle dropdown → jangan. Pinia untuk: state UI lintas-route yang harus survive navigasi (cart, user auth, theme, notifikasi).`,
    expEn: `## The State Ladder (decision order)
Before reaching for Pinia, ask in order: (1) server data? → query library/useFetch, (2) must survive refresh/link? → URL/query params, (3) used by one component + its children? → local ref, (4) used by a few siblings? → lift to the closest common parent, (5) used by many far-apart components? → Pinia. Almost all state stops at steps 3-4. Climb only when it actually hurts.
\n## Setup Store = Composable
\`defineStore('cart', () => { ... })\` is exactly like a composable: ref (state), computed (getters), functions (actions). "If you understand ref/computed, you already know 80% of Pinia." No Vuex-style mutation layer.
\n## storeToRefs
Destructuring a store (\`const { items } = cart\`) breaks reactivity — the same trap as reactive(). You MUST use \`storeToRefs(cart)\` for state; methods/actions can be called directly as \`cart.add()\`.
\n## When NOT to Use Pinia
One component → no. Form drafts → no (they live in the component). Server data → no (different lifecycle). Dropdown toggles → no. Pinia is for: cross-route UI state that must survive navigation (cart, user auth, theme, notifications).`,
    chId: 'Perluas toko: tambahkan action \u0060clear()\`, getter \u0060count\` (jumlah item), dan persist ke localStorage (watch di store). Buat App kedua — keranjang bersifat GLOBAL: perubahan di satu komponen langsung terlihat di komponen lain (beda dengan composable instance).',
    chEn: 'Extend the store: add a \u0060clear()\` action, a \u0060count\` getter, and localStorage persistence (watch inside the store). Make a second App — the cart is GLOBAL: changes in one component are instantly visible in another (unlike instance composables).',
    sumId: 'State ladder: mulai lokal, naik bertahap. Setup store = composable global. storeToRefs wajib. Pinia untuk state lintas-route. Lanjut: proyek dashboard.',
    sumEn: 'State ladder: start local, climb gradually. Setup stores = global composables. storeToRefs required. Pinia for cross-route state. Next: dashboard project.',
  },
  {
    phase: 3, num: 18, topicId: 'proyek-dashboard',
    titleId: 'Proyek: Mini Dashboard', titleEn: 'Project: Mini Dashboard',
    codeFile: 'src/stores/session.js',
    get files() {
      return {
        ...withPkg({ dependencies: { vue: '^3.5.0', 'vue-router': '^4.5.0', pinia: '^3.0.0' } }),
        'src/main.js': `import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/index.js';
import './index.css';
createApp(App).use(createPinia()).use(router).mount('#app');
`,
        'src/stores/session.js': `import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', () => {
  const user = ref(JSON.parse(localStorage.getItem('demo-user') ?? 'null'))

  const isLoggedIn = computed(() => user.value !== null)

  function login(name) {
    user.value = { name }
    localStorage.setItem('demo-user', JSON.stringify(user.value))
  }

  function logout() {
    user.value = null
    localStorage.removeItem('demo-user')
  }

  return { user, isLoggedIn, login, logout }
})
`,
        'src/stores/tasks.js': `import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([
    { id: 1, title: 'Siapkan struktur', done: false },
    { id: 2, title: 'Auth dengan Pinia', done: true },
  ])

  const doneCount = computed(() => tasks.value.filter((t) => t.done).length)

  function add(title) {
    tasks.value.push({ id: Date.now(), title, done: false })
  }

  function toggle(id) {
    const t = tasks.value.find((task) => task.id === id)
    if (t) t.done = !t.done
  }

  return { tasks, doneCount, add, toggle }
})
`,
        'src/router/index.js': `import { createRouter, createWebHistory } from 'vue-router'
import { useSessionStore } from '../stores/session'

const routes = [
  { path: '/', component: () => import('../pages/LoginPage.vue') },
  {
    path: '/dashboard',
    component: () => import('../pages/DashboardPage.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const session = useSessionStore()
  if (to.meta.requiresAuth && !session.isLoggedIn) {
    return { path: '/' }
  }
})

export default router
`,
        'src/App.vue': `<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>
`,
        'src/pages/LoginPage.vue': `<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/session'

const session = useSessionStore()
const router = useRouter()
const name = ref('')

function login() {
  if (!name.value.trim()) return
  session.login(name.value.trim())
  router.push('/dashboard')
}
</script>

<template>
  <main>
    <h1>Login</h1>
    <input v-model.trim="name" placeholder="Nama kamu" @keyup.enter="login" />
    <button @click="login">Masuk</button>
  </main>
</template>
`,
        'src/pages/DashboardPage.vue': `<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useSessionStore } from '../stores/session'
import { useTasksStore } from '../stores/tasks'

const session = useSessionStore()
const tasks = useTasksStore()
const router = useRouter()
const { user } = storeToRefs(session)
const { tasks: list, doneCount } = storeToRefs(tasks)
const newTask = ref('')

function logout() {
  session.logout()
  router.push('/')
}

function addTask() {
  if (!newTask.value.trim()) return
  tasks.add(newTask.value.trim())
  newTask.value = ''
}
</script>

<template>
  <main>
    <header>
      <h1>Dashboard</h1>
      <p>Halo, {{ user?.name }} | <button @click="logout">Keluar</button></p>
    </header>
    <section>
      <h2>Tugas ({{ doneCount }}/{{ list.length }} selesai)</h2>
      <input v-model="newTask" placeholder="Tugas baru..." @keyup.enter="addTask" />
      <ul>
        <li v-for="t in list" :key="t.id">
          <label>
            <input type="checkbox" :checked="t.done" @change="tasks.toggle(t.id)" />
            {{ t.title }}
          </label>
        </li>
      </ul>
    </section>
  </main>
</template>
`,
      };
    },
    objId: ['Mengintegrasikan Pinia + Router + guard dalam satu app', 'Menyimpan session auth di store global', 'Melindungi route berdasarkan state store', 'Menyusun struktur proyek: stores/, pages/, router/'],
    objEn: ['Integrate Pinia + Router + guards in one app', 'Keep auth session in a global store', 'Protect routes based on store state', 'Structure the project: stores/, pages/, router/'],
    expId: `## Arsitektur App Nyata
Pola produksi: \`src/stores/\` (state global: session, tasks), \`src/pages/\` (halaman), \`src/router/\` (route + guard). Halaman tidak pernah menyimpan user di state lokal — guard butuh store yang sama agar bisa menilai akses.
\n## Guard + Store
\`router.beforeEach\` membaca \`useSessionStore().isLoggedIn\` — store dan guard berbagi satu sumber kebenaran. Inilah alasan utama auth hidup di Pinia: semua komponen + router melihat state yang sama.
\n## Komposisi Store
Satu store per concern: \`session\` (auth) dan \`tasks\` (data tugas) terpisah. Store bertukar data secara eksplisit bila perlu (import store dalam store — jarang). Jangan buat satu \`useAppStore\` raksasa.
\n## Checkpoint
Sebelum lanjut, kamu harus bisa: (1) membangun halaman login yang menyimpan user global, (2) melindungi route dengan guard dari store, (3) logout yang mereset state + redirect. Jika masih bingung antara ref lokal dan store: tanya "apakah state ini perlu survive navigasi?".`,
    expEn: `## Real App Architecture
The production pattern: \`src/stores/\` (global state: session, tasks), \`src/pages/\` (pages), \`src/router/\` (routes + guard). Pages never keep the user in local state — the guard needs the same store to judge access.
\n## Guard + Store
\`router.beforeEach\` reads \`useSessionStore().isLoggedIn\` — the store and the guard share one source of truth. This is the main reason auth lives in Pinia: all components and the router see the same state.
\n## Store Composition
One store per concern: \`session\` (auth) and \`tasks\` are separate. Stores talk to each other explicitly when needed (importing a store inside a store — rare). Never build one giant \`useAppStore\`.
\n## Checkpoint
Before moving on you must be able to: (1) build a login page storing the user globally, (2) protect routes with a guard reading the store, (3) log out by resetting state + redirecting. If unsure between local ref and store: ask "does this state need to survive navigation?".`,
    chId: 'Perluas dashboard: (1) role admin vs user (login dengan checkbox admin), (2) halaman /dashboard/settings khusus admin (guard membaca meta + role), (3) persist tasks ke localStorage. Commit tiap fitur.',
    chEn: 'Extend the dashboard: (1) admin vs user roles (login with an admin checkbox), (2) a /dashboard/settings page for admins only (guard reading meta + role), (3) persist tasks to localStorage. Commit each feature.',
    sumId: 'Pinia + Router + guard = arsitektur app nyata. Session di store, guard membaca store. Store per concern. Checkpoint: login/proteksi/logout. Lanjut: production-grade.',
    sumEn: 'Pinia + Router + guard = real app architecture. Session in a store, guard reads the store. One store per concern. Checkpoint: login/protect/logout. Next: production-grade.',
  },
];

// ===== PHASE 4: PRODUCTION (lessons 19-23) =====
const LESSONS_P4 = [
  {
    phase: 4, num: 19, topicId: 'validasi-error',
    titleId: 'Validasi Form & Error Handling', titleEn: 'Form Validation & Error Handling',
    codeFile: 'src/App.vue',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.vue': `<script setup>
import { ref, computed } from 'vue'
import ErrorBoundary from './components/ErrorBoundary.vue'
import ProfileForm from './components/ProfileForm.vue'
</script>

<template>
  <h1>Validasi & Error Handling</h1>
  <ErrorBoundary>
    <ProfileForm />
  </ErrorBoundary>
</template>
`,
        'src/components/ProfileForm.vue': `<script setup>
import { ref, computed } from 'vue'

const name = ref('')
const email = ref('')
const age = ref(null)
const touched = ref({})

const errors = computed(() => ({
  name: name.value.trim().length < 3 ? 'Minimal 3 karakter.' : '',
  email: !/^[^@]+@[^@]+\\.[^@]+$/.test(email.value) ? 'Format email tidak valid.' : '',
  age: age.value !== null && age.value < 13 ? 'Minimal umur 13.' : '',
}))

const hasErrors = computed(() => Object.values(errors.value).some(Boolean))
const isValid = computed(() => hasErrors.value === false)

function blur(field) {
  touched.value[field] = true
}

function submit() {
  if (!isValid.value) return
  alert('Tersimpan: ' + name.value)
}
</script>

<template>
  <form @submit.prevent="submit">
    <label>
      Nama:
      <input v-model.trim="name" @blur="blur('name')" />
      <p v-if="touched.name && errors.name" class="err">{{ errors.name }}</p>
    </label>
    <label>
      Email:
      <input v-model.trim="email" type="email" @blur="blur('email')" />
      <p v-if="touched.email && errors.email" class="err">{{ errors.email }}</p>
    </label>
    <label>
      Umur:
      <input v-model.number="age" type="number" @blur="blur('age')" />
      <p v-if="touched.age && errors.age" class="err">{{ errors.age }}</p>
    </label>
    <button type="submit" :disabled="!isValid">Simpan</button>
  </form>
</template>

<style scoped>
.err { color: #c62828; font-size: 0.85rem; margin: 0.2rem 0 0; }
label { display: block; margin: 0.6rem 0; }
button:disabled { opacity: 0.5; }
</style>
`,
        'src/components/ErrorBoundary.vue': `<script setup>
import { ref, onErrorCaptured } from 'vue'

const error = ref(null)

onErrorCaptured((e) => {
  error.value = e.message
  return false // hentikan propagasi ke atas
})

function reset() {
  error.value = null
}
</script>

<template>
  <div>
    <div v-if="error" class="fallback" role="alert">
      <p><strong>Terjadi error:</strong> {{ error }}</p>
      <button @click="reset">Coba lagi</button>
    </div>
    <slot v-else></slot>
  </div>
</template>

<style scoped>
.fallback { border: 1px solid #c62828; background: #fdecea; border-radius: 8px; padding: 1rem; }
</style>
`,
      };
    },
    objId: ['Memvalidasi form dengan computed errors', 'Menampilkan error saat blur (touched)', 'Membuat ErrorBoundary dengan onErrorCaptured', 'Menangani error global dengan app.config.errorHandler'],
    objEn: ['Validate forms with computed errors', 'Show errors on blur (touched)', 'Build an ErrorBoundary with onErrorCaptured', 'Handle global errors with app.config.errorHandler'],
    expId: `## Validasi = Turunan State
Errors dihitung dari state (computed), bukan disimpan terpisah — satu sumber kebenaran. Pola \`errors\` objek + \`touched\` membedakan "belum diisi" vs "sudah disentuh lalu salah".
\n## Kapan Tampil Error
Tampilkan error hanya setelah blur (user meninggalkan field) atau submit gagal — bukan saat masih mengetik (mengganggu). Tombol submit disabled saat ada error (\`:disabled="!isValid"\`).
\n## ErrorBoundary
\`onErrorCaptured\` di komponen menangkap error dari komponen anak dan mengganti UI dengan fallback (mencegah layar putih). Kembalikan \`false\` untuk menghentikan propagasi. Pola ini meniru error boundary di framework lain.
\n## Error Global
\`app.config.errorHandler = (err) => ...\` menangkap error yang tidak tertangkap komponen (fetch gagal di composable, dsb). Kombinasi: ErrorBoundary per area penting + errorHandler global untuk logging.`,
    expEn: `## Validation = Derived State
Errors are computed from state, not stored separately — one source of truth. The \`errors\` object + \`touched\` pattern distinguishes "not filled" from "touched, then wrong".
\n## When to Show Errors
Show errors only after blur (the user left the field) or after a failed submit — not while typing (distracting). Disable the submit button when errors exist (\`:disabled="!isValid"\`).
\n## ErrorBoundary
\`onErrorCaptured\` in a component catches errors from child components and swaps in a fallback UI (preventing blank screens). Returning \`false\` stops propagation. This mirrors error boundaries in other frameworks.
\n## Global Errors
\`app.config.errorHandler = (err) => ...\` catches errors no component handled (failed fetches in composables, etc.). Combination: ErrorBoundary per critical area + a global errorHandler for logging.`,
    chId: 'Buat form checkout lengkap: nama, email, alamat, kode pos (validasi 5 digit), nomor telepon (min 10 digit). Semua error computed. Tampilkan ringkasan error di atas form setelah submit gagal. Bungkus dengan ErrorBoundary yang melempar error manual (throw) untuk diuji.',
    chEn: 'Build a full checkout form: name, email, address, zip (5-digit validation), phone (10+ digits). All errors computed. Show an error summary above the form after a failed submit. Wrap it in an ErrorBoundary that throws a manual error (throw) for testing.',
    sumId: 'Errors = computed dari state. Tampil saat touched/blur. ErrorBoundary (onErrorCaptured) + errorHandler global. Lanjut: transisi & teleport.',
    sumEn: 'Errors = computed from state. Shown on touched/blur. ErrorBoundary (onErrorCaptured) + global errorHandler. Next: transitions & teleport.',
  },
  {
    phase: 4, num: 20, topicId: 'transisi-teleport',
    titleId: 'Transisi & Teleport', titleEn: 'Transitions & Teleport',
    codeFile: 'src/App.vue',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.vue': `<script setup>
import { ref } from 'vue'

const show = ref(false)
const items = ref(['Item 1', 'Item 2', 'Item 3'])
const dynamic = ref('card-a')

const components = {
  'card-a': { template: '<p class="dyn">Kartu A</p>' },
  'card-b': { template: '<p class="dyn">Kartu B</p>' },
}
</script>

<template>
  <h1>Transisi & Teleport</h1>

  <button @click="show = !show">Toggle Kotak</button>
  <Transition name="fade">
    <div v-if="show" class="box">Muncul & hilang dengan animasi</div>
  </Transition>

  <h2>TransitionGroup (list)</h2>
  <button @click="items.push('Item ' + (items.length + 1))">Tambah</button>
  <button @click="items.shift()">Hapus pertama</button>
  <TransitionGroup name="list" tag="ul">
    <li v-for="item in items" :key="item">{{ item }}</li>
  </TransitionGroup>

  <h2>Komponen Dinamis</h2>
  <select v-model="dynamic">
    <option value="card-a">Kartu A</option>
    <option value="card-b">Kartu B</option>
  </select>
  <component :is="components[dynamic]" />

  <h2>Teleport</h2>
  <Teleport to="body">
    <p class="teletip">Saya di-render di &lt;body&gt;, bukan di sini!</p>
  </Teleport>
</template>

<style scoped>
.box { padding: 1rem; border: 1px solid #42B883; border-radius: 8px; margin: 0.5rem 0; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.list-enter-active, .list-leave-active { transition: all 0.3s; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateX(20px); }
.dyn { border: 1px dashed #42B883; padding: 0.6rem; border-radius: 8px; }
.teletip { position: fixed; bottom: 1rem; right: 1rem; background: #42B883; color: #fff; padding: 0.6rem 1rem; border-radius: 8px; }
</style>
`,
      };
    },
    objId: ['Menganimasikan masuk/keluar elemen dengan Transition', 'Menganimasikan list dengan TransitionGroup (+key!)', 'Menukar komponen dengan <component :is>', 'Merender ke luar pohon DOM dengan Teleport'],
    objEn: ['Animate element enter/leave with Transition', 'Animate lists with TransitionGroup (+key!)', 'Swap components with <component :is>', 'Render outside the DOM tree with Teleport'],
    expId: `## Transition
\`<Transition>\` membungkus satu elemen: kelas \`enter-from/enter-active/enter-to\` dan \`leave-*\` otomatis saat v-if/v-show berubah. Animasi CSS di stylesheet komponen. Untuk elemen yang bertukar (counter), tambahkan :key agar transisi antar nilai berjalan.
\n## TransitionGroup
Untuk LIST: memerlukan \`:key\` (identitas! pelajaran 4) di tiap item — tanpa key, Vue tidak tahu item mana masuk/keluar/pindah. Class \`list-*\` + \`move\` untuk animasi posisi.
\n## Komponen Dinamis
\`<component :is="...">\` menukar komponen saat nilai :is berubah. Sering dipakai dengan \`<KeepAlive>\` (state tersimpan saat beralih) dan tab panel.
\n## Teleport
\`<Teleport to="body">\` memindahkan render DOM ke target (body, modal root) tanpa mengubah logika komponen. Dipakai: modal (bebas overflow), tooltip, toast. Modal pelajaran 12 memakai pola ini.`,
    expEn: `## Transition
\`<Transition>\` wraps a single element: \`enter-from/enter-active/enter-to\` and \`leave-*\` classes apply automatically when v-if/v-show changes. CSS animation lives in the component stylesheet. For swapping elements (counters), add :key so the transition runs between values.
\n## TransitionGroup
For LISTS: requires \`:key\` (identity! lesson 4) on every item — without keys Vue cannot tell which item entered/left/moved. \`list-*\` classes + \`move\` animate positions.
\n## Dynamic Components
\`<component :is="...">\` swaps components when the :is value changes. Often combined with \`<KeepAlive>\` (state preserved when switching) and tab panels.
\n## Teleport
\`<Teleport to="body">\` moves DOM rendering to a target (body, modal root) without changing component logic. Used for: modals (overflow-free), tooltips, toasts. The lesson-12 modal uses this pattern.`,
    chId: 'Buat toast notification system: Teleport ke body + TransitionGroup, list toasts {id, pesan, tipe}, auto-hilang 3 detik (setTimeout + hapus). Animasi slide dari kanan. Bonus: tombol "hapus semua" dengan animasi.',
    chEn: 'Build a toast notification system: Teleport to body + TransitionGroup, toasts {id, message, type}, auto-dismiss after 3s (setTimeout + remove). Slide-in-from-right animation. Bonus: a "clear all" button with animation.',
    sumId: 'Transition (1 elemen), TransitionGroup (list + :key!), <component :is> dinamis, Teleport (body). Modal + toast = pola nyata. Lanjut: performansi.',
    sumEn: 'Transition (single element), TransitionGroup (lists + :key!), dynamic <component :is>, Teleport (body). Modals + toasts = real patterns. Next: performance.',
  },
  {
    phase: 4, num: 21, topicId: 'performansi',
    titleId: 'Performansi', titleEn: 'Performance',
    codeFile: 'src/App.vue',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.vue': `<script setup>
import { ref, shallowRef, defineAsyncComponent, nextTick } from 'vue'

// 1) Lazy: komponen berat diunduh saat pertama dirender
const HeavyWidget = defineAsyncComponent(() =>
  import('./components/HeavyWidget.vue')
)

// 2) shallowRef: data besar yang diganti utuh, tanpa deep tracking
const rows = shallowRef(
  Array.from({ length: 2000 }, (_, i) => ({ id: i, label: 'Baris ' + i }))
)

const loaded = ref(false)

async function loadHeavy() {
  loaded.value = true
  // 3) nextTick: baca DOM sesudah Vue selesai update
  await nextTick()
  console.log('HeavyWidget dirender, DOM sudah siap')
}
</script>

<template>
  <h1>Perfomasi</h1>
  <button @click="loadHeavy">Muat Widget Berat</button>
  <HeavyWidget v-if="loaded" />

  <h2>shallowRef: 2000 baris</h2>
  <p>Total: {{ rows.length }} (deep tracking dimatikan)</p>
  <ul>
    <li v-for="r in rows" :key="r.id">{{ r.label }}</li>
  </ul>
</template>
`,
        'src/components/HeavyWidget.vue': `<template>
  <section class="heavy">
    <h3>Widget Berat (lazy)</h3>
    <p>Chunk saya diunduh terpisah — hanya saat dibutuhkan.</p>
  </section>
</template>

<style scoped>
.heavy { border: 2px solid #42B883; border-radius: 8px; padding: 1rem; margin: 0.5rem 0; }
</style>
`,
      };
    },
    objId: ['Memecah kode dengan defineAsyncComponent', 'Menggunakan shallowRef untuk data besar', 'Memahami kapan optimasi DIPERLUKAN (bukan dini)', 'Menggunakan nextTick untuk timing yang tepat'],
    objEn: ['Code-split with defineAsyncComponent', 'Use shallowRef for large data', 'Know when optimization is NEEDED (not premature)', 'Use nextTick for precise timing'],
    expId: `## Kapan Perlu Optimasi?
Pertama ukur (Vue DevTools: timeline, render count). Vue sudah efisien: fine-grained reactivity membuat komponen hanya update saat data yang dipakainya berubah — optimasi manual jarang diperlukan. Optimalkan saat ADA masalah: bundle besar, render lambat, data raksasa.
\n## Lazy & Code Splitting
\`defineAsyncComponent(() => import(...))\` memecah chunk per komponen — widget berat tidak masuk bundle awal. Di route (pelajaran 16) memakai pola sama. Ukur dengan devtools → bila halaman pertama besar, pecah.
\n## shallowRef untuk Data Besar
\`shallowRef\` hanya melacak \`.value\` (referensi), bukan isi — array 2000 baris yang DIGANTI utuh tidak perlu deep tracking. Pakai saat: data besar jarang dimutasi, atau di-manage library eksternal. Jangan untuk data yang dimutasi per-item (lewat deteksi).
\n## nextTick
DOM diperbarui async (buffered). \`await nextTick()\` menunggu Vue selesai meng-update DOM — dipakai saat kamu perlu membaca/mengukur DOM tepat setelah perubahan state (scroll restore, pengukuran tinggi).`,
    expEn: `## When Is Optimization Needed?
Measure first (Vue DevTools: timeline, render counts). Vue is already efficient: fine-grained reactivity re-renders only the components whose used data changed — manual optimization is rarely needed. Optimize when a problem exists: big bundle, slow renders, huge data.
\n## Lazy & Code Splitting
\`defineAsyncComponent(() => import(...))\` splits chunks per component — a heavy widget stays out of the initial bundle. Routes (lesson 16) use the same pattern. Measure with devtools — if the first page is big, split it.
\n## shallowRef for Large Data
\`shallowRef\` tracks only \`.value\` (the reference), not the contents — a 2000-row array that is REPLACED wholesale needs no deep tracking. Use when: large data rarely mutated, or managed by external libraries. Not for per-item mutations (they would go undetected).
\n## nextTick
The DOM updates asynchronously (buffered). \`await nextTick()\` waits until Vue finishes updating the DOM — used when you must read/measure the DOM right after a state change (scroll restore, height measurement).`,
    chId: 'Buat list 5000 item dengan v-memo (surgical re-render skip): \u0060v-memo="[item.id === selected]"\u0060 pada baris. Tambahkan tombol "pilih random" dan ukur perbedaannya di DevTools (render timeline). Jelaskan kapan v-memo layak.',
    chEn: 'Build a 5000-item list with v-memo (surgical re-render skipping): \u0060v-memo="[item.id === selected]"\u0060 on each row. Add a "select random" button and measure the difference in DevTools (render timeline). Explain when v-memo is worth it.',
    sumId: 'Ukur dulu, optimasi saat ada masalah. defineAsyncComponent + route lazy. shallowRef untuk data besar. nextTick untuk timing. Lanjut: testing.',
    sumEn: 'Measure first, optimize when there is a problem. defineAsyncComponent + lazy routes. shallowRef for large data. nextTick for timing. Next: testing.',
  },
  {
    phase: 4, num: 22, topicId: 'testing',
    titleId: 'Testing (Vitest)', titleEn: 'Testing (Vitest)',
    codeFile: 'src/components/Counter.vue',
    get files() {
      return {
        ...withPkg({
          scripts: { dev: 'vite', test: 'vitest run' },
          devDependencies: { '@vitejs/plugin-vue': '^5.0.0', vite: '^6.0.0', vitest: '^3.0.0', '@vue/test-utils': '^2.4.0', jsdom: '^26.0.0' },
        }),
        'vite.config.js': `import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
  plugins: [vue()],
  test: { environment: 'jsdom' },
});
`,
        'src/App.vue': `<script setup>
import Counter from './components/Counter.vue'
</script>

<template>
  <h1>Counter (diuji oleh Vitest)</h1>
  <Counter :initial="5" />
  <p>Jalankan \`npm run test\` di terminal untuk melihat pengujian.</p>
</template>
`,
        'src/components/Counter.vue': `<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  initial: { type: Number, default: 0 },
})

const emit = defineEmits(['changed'])

const count = ref(props.initial)
const doubled = computed(() => count.value * 2)

function increment() {
  count.value += 1
  emit('changed', count.value)
}
</script>

<template>
  <div>
    <p class="count">{{ count }}</p>
    <p class="doubled">x2 = {{ doubled }}</p>
    <button class="inc" @click="increment">+1</button>
  </div>
</template>
`,
        'src/components/__tests__/Counter.test.js': `import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Counter from '../Counter.vue'

describe('Counter', () => {
  it('renders the initial count', () => {
    const wrapper = mount(Counter, { props: { initial: 5 } })
    expect(wrapper.text()).toContain('5')
  })

  it('increments on click and emits changed', async () => {
    const wrapper = mount(Counter, { props: { initial: 0 } })
    await wrapper.find('button.inc').trigger('click')
    expect(wrapper.find('.count').text()).toBe('1')
    expect(wrapper.emitted('changed')[0]).toEqual([1])
  })
})
`,
      };
    },
    objId: ['Menguji komponen dengan Vitest + Vue Test Utils', 'Menulis tes render, interaksi, dan emits', 'Menjalankan tes dengan npm run test', 'Memahami scope testing: unit & component'],
    objEn: ['Test components with Vitest + Vue Test Utils', 'Write render, interaction, and emit tests', 'Run tests with npm run test', 'Understand test scope: unit & component'],
    expId: `## Mengapa Testing?
Tes membuktikan perilaku, bukan hanya tampilan: "counter menampilkan 5", "klik meng-email changed". App yang sedang tumbuh tanpa tes akan patah diam-diam saat refactor. Mulai dari yang penting: logika murni + komponen dengan interaksi.
\n## Struktur Tes
\`mount(Counter, { props })\` merender komponen sungguhan; \`wrapper.find('.count').text()\` memeriksa output; \`trigger('click')\` mensimulasikan interaksi; \`wrapper.emitted('changed')\` memeriksa event yang keluar. \`await\` penting: state Vue async.
\n## Jalankan di Terminal
\`npm run test\` menjalankan semua file \`*.test.js\` (vitest). Dalam playground, file tes sudah disiapkan — buka terminal StackBlitz dan jalankan. CI/CD nanti menjalankan ini di setiap push.
\n## Scope: Jangan Over-Test
Tidak semua hal perlu tes. Prioritas: logika bisnis (computed, store actions, composables), komponen form/interaksi, perilaku penting. Hindari snapshot raksasa yang rapuh dan tes yang hanya mengulang implementasi.`,
    expEn: `## Why Testing?
Tests prove behavior, not just appearance: "the counter renders 5", "click emits changed". A growing app without tests breaks silently during refactors. Start with what matters: pure logic + interactive components.
\n## Test Structure
\`mount(Counter, { props })\` renders a real component; \`wrapper.find('.count').text()\` checks output; \`trigger('click')\` simulates interaction; \`wrapper.emitted('changed')\` checks emitted events. \`await\` matters: Vue state is async.
\n## Run in Terminal
\`npm run test\` runs all \`*.test.js\` files (vitest). In the playground the test file is ready — open the StackBlitz terminal and run it. CI/CD runs this on every push later.
\n## Scope: Do Not Over-Test
Not everything needs a test. Priorities: business logic (computeds, store actions, composables), form/interaction components, critical behavior. Avoid fragile giant snapshots and tests that merely repeat the implementation.`,
    chId: 'Tulis tes untuk useCartStore: (1) add menambah item baru, (2) add item yang sama menambah qty, (3) remove menghapus item, (4) total menghitung benar. File \u0060src/stores/cart.test.js\u0060 + jalankan. Ini pola "tes untuk logika bisnis".',
    chEn: 'Write tests for useCartStore: (1) add inserts a new item, (2) adding the same item increments qty, (3) remove deletes the item, (4) total computes correctly. File \u0060src/stores/cart.test.js\u0060 + run it. This is the "test business logic" pattern.',
    sumId: 'Vitest + Vue Test Utils: mount, find, trigger, emitted. npm run test. Prioritas: logika bisnis + interaksi. Lanjut: proyek e-commerce.',
    sumEn: 'Vitest + Vue Test Utils: mount, find, trigger, emitted. npm run test. Priorities: business logic + interactions. Next: e-commerce project.',
  },
  {
    phase: 4, num: 23, topicId: 'proyek-ecommerce',
    titleId: 'Proyek: E-commerce', titleEn: 'Project: E-commerce',
    codeFile: 'src/stores/cart.js',
    get files() {
      return {
        ...withPkg({ dependencies: { vue: '^3.5.0', pinia: '^3.0.0' } }),
        'src/main.js': `import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './index.css';
createApp(App).use(createPinia()).mount('#app');
`,
        'src/data/products.js': `export const PRODUCTS = [
  { id: 1, name: 'Vue Mug', price: 120000, category: 'aksesoris' },
  { id: 2, name: 'Vue T-Shirt', price: 185000, category: 'pakaian' },
  { id: 3, name: 'Stiker Vue', price: 15000, category: 'aksesoris' },
  { id: 4, name: 'Hoodie Vue', price: 320000, category: 'pakaian' },
]
`,
        'src/stores/cart.js': `import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const total = computed(() =>
    items.value.reduce((sum, i) => sum + i.price * i.qty, 0)
  )
  const count = computed(() =>
    items.value.reduce((sum, i) => sum + i.qty, 0)
  )

  function add(product) {
    const found = items.value.find((i) => i.id === product.id)
    if (found) found.qty += 1
    else items.value.push({ ...product, qty: 1 })
  }

  function remove(id) {
    items.value = items.value.filter((i) => i.id !== id)
  }

  function clear() {
    items.value = []
  }

  return { items, total, count, add, remove, clear }
})
`,
        'src/components/ProductList.vue': `<script setup>
import { PRODUCTS } from '../data/products'
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
</script>

<template>
  <section>
    <h2>Produk</h2>
    <div class="grid">
      <article v-for="p in PRODUCTS" :key="p.id" class="card">
        <h3>{{ p.name }}</h3>
        <p>Rp{{ p.price.toLocaleString('id-ID') }}</p>
        <button @click="cart.add(p)">+ Keranjang</button>
      </article>
    </div>
  </section>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; }
.card { border: 1px solid #ddd; border-radius: 10px; padding: 1rem; }
</style>
`,
        'src/components/CartDrawer.vue': `<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
const { items, total, count } = storeToRefs(cart)
</script>

<template>
  <aside class="drawer">
    <h2>Keranjang ({{ count }})</h2>
    <ul>
      <li v-for="i in items" :key="i.id">
        {{ i.name }} x{{ i.qty }}
        <button @click="cart.remove(i.id)">hapus</button>
      </li>
    </ul>
    <p v-if="items.length === 0">Kosong.</p>
    <p v-else><strong>Total: Rp{{ total.toLocaleString('id-ID') }}</strong></p>
    <button v-if="items.length" @click="cart.clear()">Kosongkan</button>
  </aside>
</template>

<style scoped>
.drawer { border: 1px solid #ddd; border-radius: 10px; padding: 1rem; position: sticky; top: 1rem; }
li { margin: 0.3rem 0; }
</style>
`,
        'src/App.vue': `<script setup>
import ProductList from './components/ProductList.vue'
import CartDrawer from './components/CartDrawer.vue'
</script>

<template>
  <div class="layout">
    <ProductList />
    <CartDrawer />
  </div>
</template>

<style scoped>
.layout { display: grid; grid-template-columns: 1fr 280px; gap: 1.5rem; }
</style>
`,
      };
    },
    objId: ['Membangun app e-commerce dengan Pinia store', 'Mengelola kuantitas & total dengan getters', 'Memisahkan komponen presentasi vs state global', 'Menerapkan semua pola: props, emits, store, computed'],
    objEn: ['Build an e-commerce app with a Pinia store', 'Manage quantities & totals with getters', 'Separate presentation components vs global state', 'Apply all patterns: props, emits, store, computed'],
    expId: `## Checkpoint Fase 4
Proyek ini merangkum semuanya: computed (total/count), store actions (add/remove/clear), storeToRefs (destructuring aman), komponen presentasi murni (ProductList hanya memanggil action store). Jika semua berjalan, kamu siap fase produksi.
\n## Cart Logic di Store
Kuantitas = logika bisnis → hidup di store (getters + actions), bukan di komponen. ProductList dan CartDrawer berbagi satu cart; keduanya update otomatis karena membaca ref yang sama (state global Pinia).
\n## Presentasi vs State
\`ProductList\` hanya UI + memanggil \`cart.add(p)\` — tidak menyimpan apa pun. Ini pola smart/dumb: komponen "dumb" menerima/memanggil, komponen "smart" (App) mengatur. Konsisten dan mudah dites.
\n## Lanjut ke Capstone
Semua bahan sudah lengkap: form validation (19), transisi (20), performansi (21), testing (22). Capstone (fase 5) menggabungkan dengan ecosystem tools (Nuxt, i18n, deploy).`,
    expEn: `## Phase 4 Checkpoint
This project brings it all together: computed (total/count), store actions (add/remove/clear), storeToRefs (safe destructuring), pure presentation components (ProductList only calls store actions). If this works, you are ready for production.
\n## Cart Logic in the Store
Quantity is business logic → lives in the store (getters + actions), not in components. ProductList and CartDrawer share one cart; both update automatically because they read the same ref (global Pinia state).
\n## Presentation vs State
\`ProductList\` is pure UI + calls \`cart.add(p)\` — it stores nothing. This is the smart/dumb pattern: "dumb" components call/display, "smart" components (App) orchestrate. Consistent and easy to test.
\n## On to the Capstone
All the ingredients are ready: form validation (19), transitions (20), performance (21), testing (22). The capstone (phase 5) combines them with ecosystem tools (Nuxt, i18n, deploy).`,
    chId: 'Perluas: (1) filter kategori di ProductList (computed), (2) tombol -/+ per item di drawer, (3) checkout form (nama, email, alamat) dengan validasi → pesan sukses + cart.clear(), (4) tes Vitest untuk store cart (pola pelajaran 22).',
    chEn: 'Extend it: (1) category filter in ProductList (computed), (2) -/+ buttons per item in the drawer, (3) checkout form (name, email, address) with validation → success message + cart.clear(), (4) Vitest tests for the cart store (lesson-22 pattern).',
    sumId: 'E-commerce: store berisi logika bisnis, komponen presentasi murni. storeToRefs + getters. Checkpoint fase 4 lengkap. Lanjut: fase ekosistem.',
    sumEn: 'E-commerce: store holds business logic, pure presentation components. storeToRefs + getters. Phase 4 checkpoint complete. Next: the ecosystem phase.',
  },
];

// ===== PHASE 5: ECOSYSTEM (lessons 24-27) =====
const LESSONS_P5 = [
  {
    phase: 5, num: 24, topicId: 'nuxt',
    titleId: 'Pengenalan Nuxt', titleEn: 'Nuxt Introduction',
    codeFile: 'src/composables/useApi.js',
    get files() {
      return {
        ...BASE_PROJECT_FILES,
        'src/App.vue': `<script setup>
import { useApi } from './composables/useApi'

// Pola yang sama dipakai Nuxt: komposisi + otomatisasi
const { data, error, loading } = useApi(
  'https://jsonplaceholder.typicode.com/posts/1'
)
</script>

<template>
  <h1>Pola Nuxt dalam Vue</h1>
  <p v-if="loading">Memuat...</p>
  <p v-else-if="error">{{ error }}</p>
  <pre v-else>{{ data }}</pre>
</template>
`,
        'src/composables/useApi.js': `import { ref } from 'vue'

// Di Nuxt, composables + auto-import + useFetch bawaan:
//   const { data, error } = await useFetch('/api/posts')
export function useApi(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  async function run() {
    loading.value = true
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error('HTTP ' + res.status)
      data.value = await res.json()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  run()
  return { data, error, loading }
}
`,
      };
    },
    objId: ['Memahami kapan Vue polos vs Nuxt', 'Mengenal file-based routing, layouts, auto-import Nuxt', 'Mengenal useFetch/useAsyncData (server state)', 'Memutuskan: Nuxt butuh SEO/SSR, Vue polos untuk SPA'],
    objEn: ['Understand when plain Vue vs Nuxt', 'Know Nuxt file-based routing, layouts, auto-import', 'Know useFetch/useAsyncData (server state)', 'Decide: Nuxt for SEO/SSR, plain Vue for SPAs'],
    expId: `## Vue Polos vs Nuxt
Perdebatan 2026: belajar lewat Nuxt langsung (seperti Next.js untuk React) vs Vue polos dulu. Kesimpulan riset: Vue polos dulu — pola (composables, router, pinia) 100% transferable; Nuxt menambah konvensi + SSR. Pindah ke Nuxt saat butuh: SEO, SSR, API routes sendiri.
\n## Konvensi Nuxt (berbasis file)
\`pages/\` = routing otomatis (pages/about.vue → /about), \`layouts/\` = template halaman, \`composables/\` + \`utils/\` = auto-import (tanpa import manual), \`app.vue\` = root. Struktur project Vue kita sudah 80% mirip — itu sengaja.
\n## useFetch / useAsyncData
Nuxt membungkus fetching dengan cache, deduplikasi, dan SSR-aware state: \`const { data, error, pending } = await useFetch('/api/x')\`. Pola useFetch yang kamu tulis di pelajaran 14 adalah versi mini-nya.
\n## Server Routes
Nuxt bisa punya API sendiri: \`server/api/posts.js\` → \`/api/posts\`. Frontend + backend satu codebase (Nitro). Ini keunggulan utama beralih ke Nuxt.`,
    expEn: `## Plain Vue vs Nuxt
The 2026 debate: learn via Nuxt directly (like Next.js for React) vs plain Vue first. Research conclusion: plain Vue first — the patterns (composables, router, pinia) are 100% transferable; Nuxt adds conventions + SSR. Move to Nuxt when you need: SEO, SSR, your own API routes.
\n## Nuxt Conventions (file-based)
\`pages/\` = automatic routing (pages/about.vue → /about), \`layouts/\` = page templates, \`composables/\` + \`utils/\` = auto-import (no manual imports), \`app.vue\` = root. Our Vue project structure is already 80% similar — intentionally.
\n## useFetch / useAsyncData
Nuxt wraps fetching with caching, deduplication, and SSR-aware state: \`const { data, error, pending } = await useFetch('/api/x')\`. The useFetch you wrote in lesson 14 is its miniature version.
\n## Server Routes
Nuxt can host its own API: \`server/api/posts.js\` → \`/api/posts\`. Frontend + backend in one codebase (Nitro). This is the main reason to switch to Nuxt.`,
    chId: 'Rancang konversi proyek e-commerce (pelajaran 23) ke Nuxt: tuliskan daftar file yang berubah (pages/, layouts/, server/api/products.js) dan file yang tetap sama (stores/, composables/). Jelaskan per file apa bedanya. Tidak perlu menjalankan Nuxt — cukup rencana konversi tertulis.',
    chEn: 'Plan the conversion of the e-commerce project (lesson 23) to Nuxt: list the files that change (pages/, layouts/, server/api/products.js) and the files that stay the same (stores/, composables/). Explain the difference per file. No need to run Nuxt — just a written conversion plan.',
    sumId: 'Vue polos untuk SPA; Nuxt untuk SEO/SSR/API. Konvensi file-based: pages/layouts/auto-import. useFetch = versi mini useAsyncData. Lanjut: VueUse & i18n.',
    sumEn: 'Plain Vue for SPAs; Nuxt for SEO/SSR/APIs. File-based conventions: pages/layouts/auto-import. useFetch = mini useAsyncData. Next: VueUse & i18n.',
  },
  {
    phase: 5, num: 25, topicId: 'vueuse-i18n',
    titleId: 'VueUse & i18n', titleEn: 'VueUse & i18n',
    codeFile: 'src/App.vue',
    get files() {
      return {
        ...withPkg({ dependencies: { vue: '^3.5.0', '@vueuse/core': '^12.0.0', 'vue-i18n': '^11.0.0' } }),
        'src/main.js': `import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import './index.css';

const i18n = createI18n({
  legacy: false,
  locale: 'id',
  messages: {
    id: { title: 'Aplikasi Saya', search: 'Cari...', greeting: 'Halo, {name}!' },
    en: { title: 'My App', search: 'Search...', greeting: 'Hello, {name}!' },
  },
});

createApp(App).use(i18n).mount('#app');
`,
        'src/App.vue': `<script setup>
import { ref } from 'vue'
import { useDark, useDebounceFn, useStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const name = ref('Ayu')

// VueUse: dark mode reaktif (persist ke localStorage otomatis)
const isDark = useDark()
// VueUse: debounce 300ms
const debouncedNotify = useDebounceFn(() => {
  alert(t('search'))
}, 300)
// VueUse: storage reaktif
const history = useStorage('search-history', [])
</script>

<template>
  <h1>{{ t('title') }}</h1>
  <p>{{ t('greeting', { name }) }}</p>

  <button @click="isDark = !isDark">Mode {{ isDark ? 'terang' : 'gelap' }}</button>
  <button @click="locale = locale === 'id' ? 'en' : 'id'">Bahasa: {{ locale }}</button>
  <button @click="debouncedNotify">Debounce test</button>
  <input placeholder="Ketik untuk menambah history (tunggu 1 dtk)" @change="history.push($event.target.value)" />
  <ul><li v-for="h in history" :key="h">{{ h }}</li></ul>
</template>
`,
      };
    },
    objId: ['Menggunakan VueUse untuk utilitas reaktif (useDark, useStorage, useDebounceFn)', 'Menerapkan i18n dengan vue-i18n (t(), locale)', 'Menggabungkan state UI global (theme, locale)', 'Membaca sumber VueUse untuk meniru polanya'],
    objEn: ['Use VueUse reactive utilities (useDark, useStorage, useDebounceFn)', 'Apply i18n with vue-i18n (t(), locale)', 'Combine global UI state (theme, locale)', 'Read the VueUse source to copy its patterns'],
    expId: `## VueUse: 200+ Utilitas
\`@vueuse/core\` membungkus browser API ke dalam reaktivitas: \`useDark\` (theme + persist + prefers-color-scheme), \`useStorage\` (localStorage reaktif), \`useDebounceFn\` / \`useThrottleFn\`, \`useFetch\`, \`useGeolocation\`, dll. Setiap fungsi = composable — pola persis yang kamu pelajari di pelajaran 13. Jangan tulis ulang: cek VueUse dulu.
\n## VueUse adalah Curiculum
Membaca sumber VueUse adalah cara terbaik menginternalisasi struktur composable: ref + efek + cleanup + return. Setelah beberapa kali meniru, kamu bisa menulis sendiri.
\n## vue-i18n
\`createI18n({ legacy: false, locale, messages })\`; terjemahan via \`t('key')\` dan \`t('greeting', { name })\` untuk interpolasi. Ganti bahasa: \`locale.value = 'en'\` — semua teks ter-update reaktif.
\n## State UI Global: Theme & Locale
Theme + bahasa adalah state UI global lintas komponen: cocok untuk Pinia atau (dengan VueUse) cukup ref global + auto-persist. Jangan simpan di props per komponen — harus survive di seluruh app.`,
    expEn: `## VueUse: 200+ Utilities
\`@vueuse/core\` wraps browser APIs into reactivity: \`useDark\` (theme + persist + prefers-color-scheme), \`useStorage\` (reactive localStorage), \`useDebounceFn\` / \`useThrottleFn\`, \`useFetch\`, \`useGeolocation\`, etc. Every function is a composable — exactly the pattern you learned in lesson 13. Do not rewrite: check VueUse first.
\n## VueUse as Curriculum
Reading the VueUse source is the best way to internalize composable structure: refs + effects + cleanup + return. After mimicking a few times, you can write your own.
\n## vue-i18n
\`createI18n({ legacy: false, locale, messages })\`; translate via \`t('key')\` and \`t('greeting', { name })\` for interpolation. Switch language: \`locale.value = 'en'\` — all texts update reactively.
\n## Global UI State: Theme & Locale
Theme + language are cross-component global UI state: fit for Pinia or (with VueUse) just global refs with auto-persist. Never store them in per-component props — they must survive across the whole app.`,
    chId: 'Lokalkan proyek e-commerce (pelajaran 23): semua label via t() (id/en), pilih bahasa di header, theme toggle useDark, riwayat pencarian dengan useStorage. Pastikan store cart tidak ikut terlokalisasi (data ≠ UI).',
    chEn: 'Localize the e-commerce project (lesson 23): all labels via t() (id/en), a language picker in the header, a useDark theme toggle, search history with useStorage. Make sure the cart store stays unlocalized (data != UI).',
    sumId: 'VueUse = browser API yang reaktif (useDark, useStorage, useDebounce). vue-i18n: t() + locale. Theme/locale = state global. Lanjut: deployment.',
    sumEn: 'VueUse = reactive browser APIs (useDark, useStorage, useDebounce). vue-i18n: t() + locale. Theme/locale = global state. Next: deployment.',
  },
  {
    phase: 5, num: 26, topicId: 'deployment',
    titleId: 'Deployment', titleEn: 'Deployment',
    codeFile: 'src/App.vue',
    get files() {
      return {
        ...withPkg({ scripts: { dev: 'vite', build: 'vite build' } }),
        'src/App.vue': `<script setup>
import { ref, onMounted } from 'vue'

const env = import.meta.env
const ready = ref(false)

onMounted(() => {
  // import.meta.env tersedia saat build; VITE_ prefix = publik
  ready.value = true
})
</script>

<template>
  <h1>Portofolio — Siap Deploy</h1>
  <p v-if="ready">Mode: {{ env.MODE }} | Versi API: {{ env.VITE_API_VERSION || 'v1' }}</p>
  <ul>
    <li>Build statis: \`npm run build\` → folder dist/</li>
    <li>Hosting: Cloudflare Pages / Vercel / Netlify</li>
    <li>SPA fallback: semua route ke index.html (404 → app)</li>
    <li>Env vars: awalan VITE_ tersedia di client</li>
  </ul>
</template>
`,
      };
    },
    objId: ['Membangun bundle produksi dengan vite build', 'Mendeploy SPA ke Cloudflare Pages/Vercel/Netlify', 'Mengonfigurasi SPA fallback (_redirects)', 'Menggunakan env vars (VITE_ prefix)'],
    objEn: ['Build a production bundle with vite build', 'Deploy SPAs to Cloudflare Pages/Vercel/Netlify', 'Configure SPA fallback (_redirects)', 'Use env vars (VITE_ prefix)'],
    expId: `## vite build
\`npm run build\` menghasilkan folder \`dist/\` (HTML/CSS/JS terminisasi + code-split). Deploy = mengunggah dist/ ke hosting statis mana pun. Test lokal: \`npm run preview\`.
\n## Cloudflare Pages / Vercel / Netlify
Ketiganya gratis untuk proyek kecil: hubungkan repo git → otomatis build + deploy tiap push. Untuk Cloudflare Pages: build command \`npm run build\`, output \`dist\`. Semua mendukung SPA.
\n## SPA Fallback
Router (createWebHistory) butuh semua URL mengarah ke index.html — jika tidak, refresh /about → 404. Cloudflare Pages: file \`public/_redirects\` berisi \`/* /index.html 200\`. Vercel/Netlify: konfigurasi serupa otomatis.
\n## Env Variables
\`VITE_\` prefix wajib agar variabel ter-expose ke client (\`import.meta.env.VITE_API_URL\`). Tanpa prefix, tidak akan muncul. Jangan pernah menaruh secret (API key server) di VITE_ — itu publik di bundle!`,
    expEn: `## vite build
\`npm run build\` produces a \`dist/\` folder (minified HTML/CSS/JS + code-split). Deploying = uploading dist/ to any static host. Test locally: \`npm run preview\`.
\n## Cloudflare Pages / Vercel / Netlify
All three are free for small projects: connect the git repo → automatic build + deploy on every push. For Cloudflare Pages: build command \`npm run build\`, output \`dist\`. All support SPAs.
\n## SPA Fallback
Router (createWebHistory) needs every URL to serve index.html — otherwise refreshing /about → 404. Cloudflare Pages: a \`public/_redirects\` file with \`/* /index.html 200\`. Vercel/Netlify: similar config, mostly automatic.
\n## Env Variables
The \`VITE_\` prefix is required to expose variables to the client (\`import.meta.env.VITE_API_URL\`). Without the prefix they never appear. NEVER put server secrets in VITE_ — they are public in the bundle!`,
    chId: 'Deploy proyek e-commerce kamu: (1) tambah \u0060_redirects\` dengan \u0060/* /index.html 200\u0060, (2) build + preview lokal, (3) deploy ke Cloudflare Pages (atau Vercel), (4) tambah VITE_API_VERSION dan tampilkan di halaman, (5) share URL-nya.',
    chEn: 'Deploy your e-commerce project: (1) add \u0060_redirects\` with \u0060/* /index.html 200\u0060, (2) build + preview locally, (3) deploy to Cloudflare Pages (or Vercel), (4) add VITE_API_VERSION and show it on the page, (5) share the URL.',
    sumId: 'vite build → dist/. Deploy ke Cloudflare/Vercel/Netlify. SPA fallback _redirects. Env: VITE_ prefix (publik!). Lanjut: capstone.',
    sumEn: 'vite build → dist/. Deploy to Cloudflare/Vercel/Netlify. SPA fallback _redirects. Env: VITE_ prefix (public!). Next: capstone.',
  },
  {
    phase: 5, num: 27, topicId: 'capstone',
    titleId: 'Capstone: SaaS Starter', titleEn: 'Capstone: SaaS Starter',
    codeFile: 'src/App.vue',
    get files() {
      return {
        ...withPkg({ dependencies: { vue: '^3.5.0', 'vue-router': '^4.5.0', pinia: '^3.0.0', '@vueuse/core': '^12.0.0' } }),
        'src/main.js': `import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/index.js';
import './index.css';
createApp(App).use(createPinia()).use(router).mount('#app');
`,
        'src/stores/session.js': `import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', () => {
  const user = ref(JSON.parse(localStorage.getItem('saas-user') ?? 'null'))
  const isLoggedIn = computed(() => user.value !== null)

  function login(name) {
    user.value = { name }
    localStorage.setItem('saas-user', JSON.stringify(user.value))
  }
  function logout() {
    user.value = null
    localStorage.removeItem('saas-user')
  }
  return { user, isLoggedIn, login, logout }
})
`,
        'src/router/index.js': `import { createRouter, createWebHistory } from 'vue-router'
import { useSessionStore } from '../stores/session'

const routes = [
  { path: '/', component: () => import('../pages/HomePage.vue') },
  { path: '/login', name: 'login', component: () => import('../pages/LoginPage.vue') },
  { path: '/dashboard', component: () => import('../pages/DashboardPage.vue'), meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const session = useSessionStore()
  if (to.meta.requiresAuth && !session.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
`,
        'src/App.vue': `<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>

<template>
  <nav>
    <RouterLink to="/">Beranda</RouterLink>
    <RouterLink to="/dashboard">Dashboard</RouterLink>
    <button @click="isDark = !isDark">Tema</button>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
`,
        'src/pages/HomePage.vue': `<template>
  <section>
    <h1>Capstone: SaaS Starter</h1>
    <p>Daftar periksa: auth (store + guard), dashboard terproteksi, dark mode (VueUse), i18n, tes, deploy.</p>
    <RouterLink to="/login">Masuk</RouterLink>
  </section>
</template>
`,
        'src/pages/LoginPage.vue': `<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSessionStore } from '../stores/session'

const session = useSessionStore()
const route = useRoute()
const router = useRouter()
const name = ref('')

function login() {
  if (!name.value.trim()) return
  session.login(name.value.trim())
  router.push(route.query.redirect || '/dashboard')
}
</script>

<template>
  <main>
    <h1>Login</h1>
    <input v-model.trim="name" placeholder="Nama" @keyup.enter="login" />
    <button @click="login">Masuk</button>
  </main>
</template>
`,
        'src/pages/DashboardPage.vue': `<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useSessionStore } from '../stores/session'

const session = useSessionStore()
const router = useRouter()
const { user } = storeToRefs(session)

function logout() {
  session.logout()
  router.push('/')
}
</script>

<template>
  <main>
    <h1>Dashboard</h1>
    <p>Halo, {{ user?.name }} <button @click="logout">Keluar</button></p>
    <p>Area ini terproteksi: guard membaca store session.</p>
  </main>
</template>
`,
      };
    },
    objId: ['Membangun capstone dengan semua pola yang dipelajari', 'Menjalankan siklus: fitur → tes → commit → deploy', 'Menerapkan auth, proteksi route, dark mode', 'Menyajikan hasil akhir sebagai portfolio'],
    objEn: ['Build the capstone with every learned pattern', 'Run the cycle: feature → test → commit → deploy', 'Apply auth, route protection, dark mode', 'Present the result as portfolio'],
    expId: `## Checkpoint Akhir
Capstone = SaaS starter yang menggabungkan: Pinia session (auth + persist), router guard (proteksi + redirect), VueUse (dark mode), dan pola komponen yang rapi. Setiap baris harus bisa kamu jelaskan — kalau ada yang tidak, ulangi pelajaran terkait.
\n## Siklus Profesional
Alur kerja bootcamp: kerjakan SATU fitur → tulis tes untuk logikanya → commit (pesan jelas) → lanjut. Bukan menulis semua lalu commit sekali. Git history yang rapi = bukti kerja yang bisa ditunjukkan ke perekrut.
\n## Ekspansi Capstone
Tambahan yang lazim: i18n (t() + locale switch), komponen UI reusable (Modal, Toast, Tabs dari pelajaran 12), halaman 404, empty states untuk semua list, dan error boundary. Pilih 2-3, jangan semuanya.
\n## Jadi Portfolio
Deploy (pelajaran 26), tulis README: apa app-nya, stack, fitur, cara run. Screenshot + demo URL. Satu app selesai & rapi > lima app setengah jadi. Selamat — kamu sekarang Vue Developer.`,
    expEn: `## Final Checkpoint
The capstone is a SaaS starter combining: Pinia session (auth + persist), router guard (protection + redirect), VueUse (dark mode), and clean component patterns. You must be able to explain every line — if not, revisit the related lesson.
\n## The Professional Cycle
Bootcamp workflow: work on ONE feature → write tests for its logic → commit (clear message) → continue. Not writing everything then committing once. A clean git history is proof of work you can show recruiters.
\n## Capstone Extensions
Common additions: i18n (t() + locale switch), reusable UI components (Modal, Toast, Tabs from lesson 12), a 404 page, empty states for all lists, and an error boundary. Pick 2-3, not all of them.
\n## Into the Portfolio
Deploy (lesson 26), write a README: what the app is, stack, features, how to run. Screenshot + demo URL. One finished, polished app beats five half-finished ones. Congratulations — you are now a Vue Developer.`,
    chId: 'Rencanakan dan kerjakan: (1) 3 fitur baru di atas starter ini (mis. notes CRUD dengan persist, profil user, halaman 404), (2) tes Vitest untuk 2 store/logika, (3) i18n id/en, (4) deploy + README. Target: semua checklist capstone tercentang.',
    chEn: 'Plan and execute: (1) 3 new features on top of this starter (e.g. notes CRUD with persist, a user profile, a 404 page), (2) Vitest tests for 2 stores/logic, (3) id/en i18n, (4) deploy + README. Goal: every capstone checklist item checked.',
    sumId: 'Capstone merangkum semua fase. Siklus: fitur → tes → commit. Auth + guard + dark mode. Deploy + README = portfolio. Selamat, kamu Vue Developer!',
    sumEn: 'The capstone covers every phase. Cycle: feature → test → commit. Auth + guard + dark mode. Deploy + README = portfolio. Congratulations, you are a Vue Developer!',
  },
];

const LESSONS = [...LESSONS_P1, ...LESSONS_P2, ...LESSONS_P3, ...LESSONS_P4, ...LESSONS_P5];

// ===== GENERATE =====
for (const lesson of LESSONS) {
  const phase = PHASES.find((p) => p.phase === lesson.phase);
  const levelDir = phase.id;
  const mdDir = path.join(BASE_DIR, levelDir);

  const objListId = lesson.objId.map((o) => `- ${o}`).join('\n');
  const objListEn = lesson.objEn.map((o) => `- ${o}`).join('\n');

  const codeExt = lesson.codeFile.split('.').pop();
  const codeLang = codeExt === 'vue' ? 'vue' : codeExt === 'js' ? 'js' : codeExt;

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

> Vue | ${phaseName} | ${lessonLabel}

## ${isId ? 'Tujuan Pembelajaran' : 'Learning Objectives'}

${objList}

---

## Program: ${title}

\`\`\`${codeLang}
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
console.log(`\n✓ Generated ${total} Vue curriculum files (${LESSONS.length} lessons × 2 languages)`);
console.log(`  Output: ${BASE_DIR}`);
