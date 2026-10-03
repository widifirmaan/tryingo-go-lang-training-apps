# Vue Track: 10 Weeks (3 Levels)
# Final Product: Enterprise CRM Lead Management & Sales Pipeline Dashboard

LEVELS = [
    {
        'levelId': 'beginer',
        'nameId': 'Composition API, Reaktivitas & Komponen',
        'nameEn': 'Composition API, Reactivity & Components',
        'descId': 'Vue 3 modern: Single File Components (.vue), <script setup>, ref vs reactive, computed, watchers, dan komunikasi props/emit.',
        'descEn': 'Modern Vue 3: Single File Components (.vue), <script setup>, ref vs reactive, computed, watchers, and props/emit communication.',
    },
    {
        'levelId': 'intermediate',
        'nameId': 'Composables, Pinia & Vue Router',
        'nameEn': 'Composables, Pinia & Vue Router',
        'descId': 'Ekstraksi logika reusable dengan Composables kustom, manajemen state terpusat dengan Pinia, dan Vue Router 4 dengan route guards.',
        'descEn': 'Reusable logic extraction with custom Composables, centralized state via Pinia, and Vue Router 4 with navigation guards.',
    },
    {
        'levelId': 'advanced',
        'nameId': 'Slots Lanjut, Animasi, Optimasi & Capstone CRM',
        'nameEn': 'Advanced Slots, Animations, Optimization & CRM Capstone',
        'descId': 'Scoped slots, <Teleport>, animasi <TransitionGroup>, optimasi shallowRef, dan proyek dashboard CRM enterprise interaktif.',
        'descEn': 'Scoped slots, <Teleport>, <TransitionGroup> animations, shallowRef tuning, and the interactive enterprise CRM dashboard capstone.',
    },
]

MODULES = [
    # Level 1: Composition API, Reaktivitas & Komponen (Weeks 1-4)
    {
        'week': 1,
        'level': 'beginer',
        'topicId': 'single-file-components-dan-reactivity',
        'titleId': 'Vue 3 Single File Components (.vue): <script setup>, ref vs reactive',
        'titleEn': 'Vue 3 Single File Components (.vue): <script setup>, ref vs reactive',
        'programId': 'Kartu Calon Pelanggan (CRM Lead Card) Reaktif',
        'programEn': 'Interactive CRM Lead Card with Composition Reactivity',
        'levelNameId': 'Composition API, Reaktivitas & Komponen',
        'levelNameEn': 'Composition API, Reactivity & Components',
        'language': 'vue',
        'code': """<script setup>
import { ref, reactive } from "vue";

// 1. ref: Membungkus nilai primitif ke dalam objek reaktif (.value)
const judulKartu = ref("Lead Prospek Enterprise");
const sedangFollowUp = ref(false);

// 2. reactive: Membungkus objek data terstruktur secara mendalam (deep reactivity)
const lead = reactive({
  id: "LEAD-101",
  namaPerusahaan: "PT Nusa Teknologi Mandiri",
  kontakPerson: "Dewi Lestari",
  estimasiNilai: 85000000,
  status: "PROSPEK" // "PROSPEK" | "NEGOSIASI" | "DEAL" | "LOST"
});

function toggleFollowUp() {
  sedangFollowUp.value = !sedangFollowUp.value;
}

function naikkanStatus() {
  if (lead.status === "PROSPEK") lead.status = "NEGOSIASI";
  else if (lead.status === "NEGOSIASI") lead.status = "DEAL";
}
</script>

<template>
  <div class="lead-card" :class="{ 'highlight': sedangFollowUp }">
    <div class="header">
      <h3>{{ judulKartu }}</h3>
      <span class="badge" :data-status="lead.status">{{ lead.status }}</span>
    </div>

    <p class="company">{{ lead.namaPerusahaan }}</p>
    <p class="contact">PIC: <strong>{{ lead.kontakPerson }}</strong></p>
    <div class="value">Rp {{ lead.estimasiNilai.toLocaleString('id-ID') }}</div>

    <div class="actions">
      <button @click="toggleFollowUp">
        {{ sedangFollowUp ? "Selesai Kontak" : "Tandai Follow-Up" }}
      </button>
      <button @click="naikkanStatus" class="btn-primary" :disabled="lead.status === 'DEAL'">
        {{ lead.status === 'DEAL' ? "Sudah Deal ✓" : "Progres Status →" }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.lead-card {
  max-width: 420px;
  margin: 20px auto;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  background: white;
  font-family: sans-serif;
  transition: all 0.2s ease;
}
.lead-card.highlight {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}
.header { display: flex; justify-content: space-between; align-items: center; }
.header h3 { margin: 0; font-size: 16px; }
.badge { font-size: 11px; padding: 2px 8px; border-radius: 4px; font-weight: bold; background: #e2e8f0; }
.badge[data-status="DEAL"] { background: #dcfce7; color: #15803d; }
.badge[data-status="NEGOSIASI"] { background: #fef3c7; color: #b45309; }
.company { font-weight: bold; font-size: 18px; margin: 12px 0 4px 0; }
.contact { font-size: 13px; color: #64748b; margin: 0 0 12px 0; }
.value { font-size: 20px; color: #0f172a; font-weight: bold; margin-bottom: 16px; }
.actions { display: flex; gap: 8px; }
button { padding: 8px 12px; border-radius: 4px; border: 1px solid #cbd5e1; cursor: pointer; }
.btn-primary { background: #0f172a; color: white; border: none; }
button:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
""",
        'objectivesId': [
            'Memahami filosofi Single File Components (.vue) yang menyatukan template, script, dan style',
            'Menguasai sintaks modern Vue 3 <script setup> tanpa boilerplate export default',
            'Membedakan kapan menggunakan ref() (primitif, .value) vs reactive() (objek bersarang)',
            'Menggunakan Template Directives: v-bind (:), v-on (@), dan v-model',
            'Mengisolasi gaya CSS menggunakan atribut scoped untuk mencegah kebocoran styling global',
        ],
        'objectivesEn': [
            'Master Vue 3 Single File Component architecture unifying template, script, and style blocks',
            'Adopt the concise <script setup> compiler sugar eliminating boilerplate export default wrappers',
            'Discern when to employ ref() (.value wrapping) versus reactive() (deep object proxies)',
            'Deploy core template directives: dynamic bindings (:), event listeners (@), and two-way models',
            'Enforce style encapsulation via scoped attributes preventing global CSS cascade pollution',
        ],
        'explanationId': """### Mengapa Vue 3 Composition API dengan `<script setup>`?
Di Vue 2 (Options API), kode dipecah ke dalam opsi terpisah (`data`, `methods`, `computed`, `watch`). Ketika komponen membesar hingga 500 baris, logika untuk satu fitur (misalnya fitur keranjang belanja) tersebar di 4 tempat berbeda.
Dengan **Composition API (`<script setup>`)**:
1. Anda mengelompokkan kode berdasarkan **fitur logika**, bukan berdasarkan opsi struktur.
2. Tidak perlu kata kunci `this` yang membingungkan.
3. Kinerja kompilasi lebih cepat dan dukungan TypeScript yang sempurna.

### Memahami `ref` vs `reactive`
Sistem reaktivitas Vue 3 ditenagai oleh **JavaScript Proxy**:
- **`ref(initialValue)`**: Membungkus nilai apa saja (angka, string, boolean, objek). Di dalam `<script>`, Anda wajib mengaksesnya via `.value` (`sedangFollowUp.value = true`). Namun di dalam `<template>`, Vue **membongkar (.value) secara otomatis**, sehingga Anda cukup menulis `{{ sedangFollowUp }}`.
- **`reactive(object)`**: Hanya menerima objek/array. Anda tidak perlu menulis `.value` (`lead.status = 'DEAL'`). Namun hati-hati: Anda tidak boleh melakukan destrukturisasi `const { status } = lead` karena reaktivitasnya akan terputus!""",
        'explanationEn': """### Why Vue 3 Composition API & `<script setup>`
In legacy Vue 2 (Options API), components fragmented across disparate option blocks (`data`, `methods`, `computed`, `watch`). In large 500-line components, a single logical concern (such as checkout cart math) spanned 4 distant regions.
With **Composition API (`<script setup>`)**:
1. Code colocates by **feature concern**, rather than arbitrary syntax buckets.
2. The confusing JavaScript `this` contextual binding is entirely discarded.
3. Compiler performance excels with first-class TypeScript inference.

### Dissecting `ref` vs `reactive`
Reactivity in Vue 3 is orchestrated through **JavaScript ES6 Proxies**:
- **`ref(val)`**: Envelops any scalar or complex value inside a reactive container. Within `<script>`, properties mutate via `.value` (`isActive.value = true`). Inside `<template>`, Vue auto-unwraps references, so typing `{{ isActive }}` suffices.
- **`reactive(obj)`**: Strictly accepts objects or arrays. Access omits `.value` (`lead.status = 'DEAL'`). Warning: never destructure reactive objects (`const { status } = lead`) as destructuring severs Proxy tracking!""",
        'beginnerId': """### Analogi: Kartu Nama Pintar & Sensor Alarm Rumah
1. **SFC (.vue)** seperti rumah lengkap: `<template>` adalah ruang tamu (yang dilihat tamu), `<script>` adalah mesin listrik di garasi (logika), dan `<style scoped>` adalah warna cat dinding kamar sendiri yang tidak mencoreti dinding rumah tetangga.
2. **Reaktivitas ref/reactive** seperti termostat pendingin ruangan (AC): begitu suhu ruangan naik 1 derajat (*data berubah*), sensor otomatis menyalakan kompresor dan mengubah tampilan angka di layar remote seketika (*template update otomatis*).""",
        'beginnerEn': """### Analogy: Self-Contained Townhomes & Smart Thermostats
1. **Single File Components (.vue)** are self-contained townhomes: `<template>` is the furnished parlor (visual layer), `<script>` is the electrical utility panel (logic), and `<style scoped>` is interior wallpaper completely isolated from the neighbor's wall.
2. **Reactivity (ref/reactive)** is a smart thermostat: when room temperature climbs one degree (*state mutation*), digital sensors trigger the condenser and update the LCD thermostat screen instantaneously (*DOM re-render*).""",
        'experimentsId': [
            'Klik tombol "Tandai Follow-Up" dan perhatikan border kartu berubah biru menyala berkat class binding reaktif.',
            'Klik tombol "Progres Status" hingga status menjadi DEAL dan buktikan tombol otomatis terkunci (disabled).',
            'Coba ubah judulKartu tanpa .value di dalam fungsi toggleFollowUp dan amati mengapa reaktivitas gagal.',
            'Tambahkan input teks dengan v-model="lead.namaPerusahaan" di dalam template dan amati perubahan nama secara instan.',
        ],
        'experimentsEn': [
            'Click "Tandai Follow-Up" to observe the reactive border outline trigger via conditional class binding.',
            'Advance status to DEAL to observe the button transition into a disabled state.',
            'Attempt mutating judulKartu omitting .value inside script to observe why reactivity breaks.',
            'Bind an input via v-model="lead.namaPerusahaan" inside template and witness two-way real-time data sync.',
        ],
        'challengeId': 'Tambahkan properti `sumberLead` ("WEBSITE" | "REFERRAL" | "COLD_CALL") ke dalam objek reactive `lead`, dan tampilkan ikon unik di samping nama kontak menggunakan direktif `v-if` / `v-else-if`.',
        'challengeEn': 'Add a `sumberLead` field ("WEBSITE" | "REFERRAL" | "COLD_CALL") into the reactive `lead` object, rendering distinct badges via `v-if` / `v-else-if` directives.',
        'summaryId': 'Kamu telah menguasai Single File Components, <script setup>, ref vs reactive, dan template directives. Minggu depan kita mempelajari Computed Properties dan Watchers.',
        'summaryEn': 'You have mastered Single File Components, <script setup>, ref vs reactive, and template directives. Next week, we examine Computed Properties and Watchers.',
    },
    {
        'week': 2,
        'level': 'beginer',
        'topicId': 'computed-dan-watchers',
        'titleId': 'Computed Properties: Caching Pintar, watch & watchEffect untuk Efek Samping',
        'titleEn': 'Computed Properties: Intelligent Caching, watch & watchEffect for Side Effects',
        'programId': 'Kalkulator Komisi Penjualan & Pelacak Perubahan Skor Lead',
        'programEn': 'Sales Commission Calculator & Lead Health Score Watcher',
        'levelNameId': 'Composition API, Reaktivitas & Komponen',
        'levelNameEn': 'Composition API, Reactivity & Components',
        'language': 'vue',
        'code': """<script setup>
import { ref, computed, watch, watchEffect } from "vue";

const nilaiKesepakatan = ref(150000000); // 150 Juta
const tierSales = ref("SENIOR"); // "JUNIOR" (5%) | "SENIOR" (10%) | "LEAD" (15%)
const catatanAuditLog = ref([]);

// 1. computed: Otomatis di-cache! Hanya dihitung ulang jika dependensi (nilai/tier) berubah
const persentaseKomisi = computed(() => {
  switch (tierSales.value) {
    case "LEAD": return 0.15;
    case "SENIOR": return 0.10;
    default: return 0.05;
  }
});

const totalKomisiDiterima = computed(() => {
  return nilaiKesepakatan.value * persentaseKomisi.value;
});

// 2. watch: Mengamati perubahan variabel spesifik dengan akses ke nilai (baru, lama)
watch(tierSales, (tierBaru, tierLama) => {
  const log = `[AUDIT] Promosi Sales terdeteksi: dari ${tierLama} menjadi ${tierBaru}`;
  catatanAuditLog.value.unshift(log);
});

// 3. watchEffect: Berjalan langsung saat inisialisasi dan melacak otomatis variabel apapun di dalamnya
watchEffect(() => {
  if (totalKomisiDiterima.value > 20000000) {
    console.log(`[Peringatan HR] Komisi besar di atas 20 Juta membutuhkan otorisasi Direktur!`);
  }
});
</script>

<template>
  <div style="max-width: 480px; margin: 20px auto; font-family: sans-serif; border: 1px solid #cbd5e1; padding: 16px; borderRadius: 8px;">
    <h3>Kalkulator Komisi Sales Eksekutif</h3>

    <div style="margin-bottom: 12px;">
      <label style="display: block; font-size: 13px; font-weight: bold;">Nilai Kesepakatan (IDR):</label>
      <input type="number" v-model.number="nilaiKesepakatan" style="width: 100%; padding: 8px; box-sizing: border-box;" />
    </div>

    <div style="margin-bottom: 16px;">
      <label style="display: block; font-size: 13px; font-weight: bold;">Tier Akun Sales:</label>
      <select v-model="tierSales" style="width: 100%; padding: 8px;">
        <option value="JUNIOR">Junior Account Exec (5%)</option>
        <option value="SENIOR">Senior Account Exec (10%)</option>
        <option value="LEAD">Sales Director / Lead (15%)</option>
      </select>
    </div>

    <div style="background: #f8fafc; padding: 12px; border-radius: 6px; margin-bottom: 16px;">
      <div>Persentase: <strong>{{ persentaseKomisi * 100 }}%</strong></div>
      <div style="font-size: 18px; color: #16a34a; font-weight: bold; margin-top: 4px;">
        Hak Komisi: Rp {{ totalKomisiDiterima.toLocaleString('id-ID') }}
      </div>
    </div>

    <div v-if="catatanAuditLog.length > 0">
      <small style="color: #64748b; font-weight: bold;">Riwayat Audit:</small>
      <ul style="margin: 4px 0 0 0; padding-left: 20px; font-size: 12px; color: #475569;">
        <li v-for="(log, idx) in catatanAuditLog" :key="idx">{{ log }}</li>
      </ul>
    </div>
  </div>
</template>
""",
        'objectivesId': [
            'Memahami perbedaan mendasar antara method biasa vs computed property yang memiliki fitur caching otomatis',
            'Menggunakan computed properties untuk kalkulasi data turunan murni tanpa efek samping',
            'Menggunakan watch() untuk merespons perubahan state spesifik dengan akses ke nilai lama dan baru (oldValue, newValue)',
            'Memanfaatkan watchEffect() untuk pelacakan dependensi implisit otomatis',
            'Mencegah komputasi berulang yang tidak perlu pada template Vue',
        ],
        'objectivesEn': [
            'Distinguish plain template methods from computed properties equipped with smart caching heuristics',
            'Deploy computed properties for deterministic derived data pipelines free of side effects',
            'Utilize watch() to react to explicit state mutations accessing previous and next values',
            'Leverage watchEffect() for automatic implicit dependency collection and immediate startup runs',
            'Eliminate redundant evaluation overhead across complex Vue template hierarchies',
        ],
        'explanationId': """### Mengapa Harus `computed` Bukan Method Biasa?
Jika Anda menulis fungsi biasa di template: `{{ hitungKomisi() }}`, fungsi tersebut akan **dieksekusi ulang setiap kali ADA BAGIAN APAPUN di halaman yang me-render ulang**, meskipun nilai kesepakatan tidak berubah sama sekali!
Sebaliknya, **`computed` memiliki caching pintar**:
Nilai hasil perhitungan disimpan di memori. Selama variabel reaktif di dalamnya (`nilaiKesepakatan`, `tierSales`) tidak berubah, Vue langsung mengembalikan hasil cache instan tanpa menghitung ulang!

### `watch` vs `watchEffect`
- **`watch(source, callback)`**:
  - *Lazy*: Tidak berjalan saat komponen pertama kali dipasang, kecuali diberi opsi `{ immediate: true }`.
  - Eksplisit: Anda harus menyebutkan variabel apa yang ingin diawasi (`tierSales`).
  - Menyediakan nilai lama dan baru: `(baru, lama) => { ... }`.
  - Cocok untuk: Menyimpan data ke LocalStorage, memanggil API pencarian saat input berubah.
- **`watchEffect(callback)`**:
  - *Immediate*: Langsung dieksekusi sekali saat startup.
  - Implisit: Secara otomatis melacak variabel reaktif apa saja yang dibaca di dalam fungsi.""",
        'explanationEn': """### Why `computed` Trumps Plain Template Methods
Invoking plain methods in templates (`{{ calculateCommission() }}`) triggers **re-execution on EVERY single unrelated render pass**, even when deal valuations remain untouched.
In contrast, **`computed` properties feature intelligent dependency caching**:
The output is cached in memory. As long as reactive inputs (`dealValue`, `salesTier`) remain identical, Vue returns the cached scalar instantly without touching CPU cycles!

### `watch` vs `watchEffect`
- **`watch(source, callback)`**:
  - *Lazy*: Dormant during mount unless flagged with `{ immediate: true }`.
  - Explicit: You specify target references to observe (`salesTier`).
  - Provides provenance: delivers `(newValue, oldValue)` parameters.
  - Ideal for: Network queries on query mutation, persisting records to LocalStorage.
- **`watchEffect(callback)`**:
  - *Immediate*: Runs instantly upon component initialization.
  - Implicit: Scans the closure, automatically collecting every reactive property accessed.""",
        'beginnerId': """### Analogi: Kalkulator Memori vs Alarm Peringatan Suhu
1. **Computed Property** seperti tombol memori `M+` pada kalkulator meja: kalkulator menyimpan hasil perkalian panjang di layarnya; selama Anda tidak menekan angka baru, kalkulator tidak perlu mengulang proses hitung dari awal.
2. **Watch** seperti satpam gerbang yang mencatat buku tamu: "Pukul 14:00 Pak Budi (*nilai lama*) keluar dan digantikan Pak Joko (*nilai baru*)". Satpam hanya mencatat saat orang tersebut benar-benar berganti.""",
        'beginnerEn': """### Analogy: Desktop Calculator Memory Keys & Gate Access Logs
1. **Computed Properties** are memory recall buttons (`MR`) on a desktop calculator: the machine retains long product calculations; until you type fresh digits, the display serves memory instantly without re-crunching math.
2. **Watch** is a gatehouse security guard: "At 14:00, Officer Smith (*oldValue*) handed over the gate key to Officer Jones (*newValue*)". The guard acts only when the specific guard post turns over.""",
        'experimentsId': [
            'Ubah nilai kesepakatan menjadi 250 Juta dan perhatikan totalKomisiDiterima terhitung instan.',
            'Ganti Tier Sales dari SENIOR ke LEAD dan amati Riwayat Audit bertambah satu baris di bawah.',
            'Buka DevTools Console dan amati pesan peringatan HR muncul otomatis saat komisi melewati 20 Juta.',
            'Tambahkan opsi { deep: true } pada watcher saat mengamati objek reaktif bersarang.',
        ],
        'experimentsEn': [
            'Mutate the deal value to 250M to witness totalKomisiDiterima update reactively.',
            'Promote the Sales Tier from SENIOR to LEAD and verify a fresh audit record appends below.',
            'Inspect DevTools console to observe the automated HR warning fire when commissions breach 20M.',
            'Attach the { deep: true } configuration modifier when observing nested reactive object trees.',
        ],
        'challengeId': 'Buat computed property `estimasiPajakKomisi` yang menghitung pajak progresif (5% untuk komisi di bawah 10 Juta, 15% untuk di atas 10 Juta), dan tampilkan nilai komisi bersih setelah dipotong pajak.',
        'challengeEn': 'Author a computed `estimatedTax` property evaluating bracketed taxes (5% below 10M, 15% above 10M), rendering net commission take-home pay.',
        'summaryId': 'Kamu telah menguasai computed caching cerdas, watch, dan watchEffect. Minggu depan kita mempelajari komunikasi komponen: Props, Emits, dan kustom v-model.',
        'summaryEn': 'You have mastered computed caching, watch, and watchEffect. Next week, we examine component communication: Props, Emits, and custom v-model.',
    },
    {
        'week': 3,
        'level': 'beginer',
        'topicId': 'props-emits-dan-v-model',
        'titleId': 'Komunikasi Komponen: defineProps, defineEmits & Custom v-model Binding',
        'titleEn': 'Component Communication: defineProps, defineEmits & Custom v-model',
        'programId': 'Baris Lead CRM yang Dapat Diedit Langsung (Inline Editing)',
        'programEn': 'Inline-Editable CRM Lead Row Component with Custom v-model',
        'levelNameId': 'Composition API, Reaktivitas & Komponen',
        'levelNameEn': 'Composition API, Reactivity & Components',
        'language': 'vue',
        'code': """<!-- ===================================================================== -->
<!-- File: EditableLeadRow.vue (Komponen Anak)                                -->
<!-- ===================================================================== -->
<script setup>
// 1. defineProps: Menerima data dari Parent dengan validasi tipe
const props = defineProps({
  id: { type: String, required: true },
  nama: { type: String, required: true },
  nilai: { type: Number, default: 0 },
  modelValue: { type: String, default: "" } // Standar nama prop untuk v-model
});

// 2. defineEmits: Mendeklarasikan event yang dapat dipancarkan ke Parent
const emit = defineEmits(["update:modelValue", "hapus-lead"]);

function onInputKomentar(e) {
  // Pancarkan event update:modelValue untuk sinkronisasi dua arah v-model
  emit("update:modelValue", e.target.value);
}
</script>

<template>
  <div style="display: flex; gap: 8px; align-items: center; padding: 8px; border-bottom: 1px solid #e2e8f0;">
    <span style="font-weight: bold; width: 140px;">{{ nama }}</span>
    <span style="color: #16a34a; width: 100px;">Rp {{ (nilai / 1000000).toFixed(0) }} Juta</span>
    
    <!-- Custom Two-Way Binding Input -->
    <input
      type="text"
      placeholder="Catatan status..."
      :value="modelValue"
      @input="onInputKomentar"
      style="flex: 1; padding: 4px 8px; border: 1px solid #cbd5e1; border-radius: 4px;"
    />

    <button
      @click="emit('hapus-lead', id)"
      style="background: #fee2e2; color: #dc2626; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer;"
    >
      Hapus
    </button>
  </div>
</template>
""",
        'objectivesId': [
            'Memahami pola komunikasi komponen Vue: Props Down (Data mengalir ke bawah), Events Up (Aksi memancar ke atas)',
            'Menggunakan compiler macro defineProps() dengan validasi tipe ketat dan nilai default',
            'Menggunakan defineEmits() untuk memancarkan event kustom ke komponen induk',
            'Membangun Custom v-model pada komponen anak menggunakan konvensi prop modelValue dan event update:modelValue',
            'Menghindari anti-pattern mutasi props secara langsung di komponen anak',
        ],
        'objectivesEn': [
            'Master Vue component communication topologies: Props Down, Events Up',
            'Deploy compiler macro defineProps() with strict type contracts and default fallbacks',
            'Leverage defineEmits() to dispatch custom semantic events up to parent boundaries',
            'Architect custom v-model bindings utilizing the modelValue prop and update:modelValue event conventions',
            'Eliminate direct child props mutation anti-patterns preserving immutable contracts',
        ],
        'explanationId': """### Komunikasi Antar Komponen di Vue 3
Arsitektur Vue menganut prinsip **"Props Down, Events Up"**:
1. **Parent ke Child**: Komponen induk mengirimkan data menggunakan atribut props: `<LeadRow :nama="item.nama" :nilai="item.nilai" />`.
2. **Child ke Parent**: Komponen anak **dilarang keras mengubah props tersebut secara langsung**. Jika anak ingin melakukan perubahan atau aksi (misal menghapus item), anak memancarkan event menggunakan `emit('hapus-lead', id)`. Komponen induk menangkap event tersebut via `@hapus-lead="prosesHapus"`.

### Rahasia Custom `v-model` pada Komponen
Di Vue 3, ketika Anda menulis `<Komponen v-model="teksCatatan" />`, Vue secara otomatis memperluas sintaks tersebut menjadi:
`<Komponen :modelValue="teksCatatan" @update:modelValue="val => teksCatatan = val" />`.
Dengan mendeklarasikan prop `modelValue` dan memancarkan event `update:modelValue`, komponen kustom Anda kini memiliki kemampuan sinkronisasi dua arah (*two-way binding*) yang sangat elegan!""",
        'explanationEn': """### Inter-Component Telemetry in Vue 3
Vue architectures follow the canonical **"Props Down, Events Up"** contract:
1. **Parent to Child**: Parents supply data downward via explicit props: `<LeadRow :nama="item.nama" :nilai="item.nilai" />`.
2. **Child to Parent**: Children **must never mutate incoming props directly**. When requesting modifications (e.g. deleting an item), the child emits an event upward via `emit('hapus-lead', id)`. The parent catches the notification via `@hapus-lead="processDeletion"`.

### Anatomy of Custom `v-model`
In Vue 3, declaring `<Component v-model="notes" />` expands sugar syntax into:
`<Component :modelValue="notes" @update:modelValue="val => notes = val" />`.
Declaring prop `modelValue` and dispatching `update:modelValue` endows bespoke components with native two-way binding ergonomics!""",
        'beginnerId': """### Analogi: Walkie-Talkie Komandan dan Prajurit Lapangan
1. **Props (Komandan -> Prajurit)** seperti perintah misi tertulis dari komandan: prajurit membawa kertas perintah tersebut (*read-only*), tidak boleh mencoret atau mengubah isi misi sesuka hati di lapangan.
2. **Emits (Prajurit -> Komandan)** seperti tombol bicara di walkie-talkie prajurit: saat prajurit menekan tombol 'Lapor' (*emit*), sinyal suara terkirim ke markas komando, dan komandan yang mengambil keputusan strategis.""",
        'beginnerEn': """### Analogy: Command Directives & Tactical Radios
1. **Props (Command to Field)** are sealed mission orders issued by headquarters: field operatives carry the directive (*read-only*), prohibited from altering mission parameters on paper.
2. **Emits (Field to Command)** are push-to-talk tactical radio transmissions: operatives dispatch alerts (*emit*), streaming telemetry up to command who authorizes tactical responses.""",
        'experimentsId': [
            'Ketik catatan di input dan amati bagaimana state parent ikut terupdate secara real-time via v-model.',
            'Klik tombol "Hapus" dan buktikan baris dihapus oleh parent melalui event emit.',
            'Coba ubah props.nama = "Nama Baru" di dalam script anak dan perhatikan peringatan konsol Vue yang melarang mutasi props.',
            'Gunakan argumen v-model:judul="judul" untuk membuat multiple v-model pada satu komponen yang sama.',
        ],
        'experimentsEn': [
            'Type notes to observe parent state synchronize reactively via custom v-model pipelines.',
            'Click "Hapus" to verify deletion resolves cleanly at the parent tier via emit listeners.',
            'Attempt props.nama = "Tampered" in the child script to observe the strict mutation warning.',
            'Deploy argument syntax v-model:title="title" authoring multiple two-way bindings on a single component.',
        ],
        'challengeId': 'Buat komponen `LeadRatingStar.vue` yang menerima prop `modelValue: number` (1 sampai 5) dan me-render 5 bintang interaktif yang saat diklik memancarkan nilai rating baru ke parent via v-model.',
        'challengeEn': 'Build a `LeadRatingStar.vue` component receiving `modelValue: number` (1 to 5) rendering 5 clickable stars dispatching updated rating values via v-model.',
        'summaryId': 'Kamu telah menguasai defineProps, defineEmits, dan custom v-model dua arah. Minggu depan kita mempelajari Lifecycle Hooks dan Template Refs.',
        'summaryEn': 'You have mastered defineProps, defineEmits, and custom v-model bindings. Next week, we examine Lifecycle Hooks and Template Refs.',
    },
    {
        'week': 4,
        'level': 'beginer',
        'topicId': 'lifecycle-hooks-dan-template-refs',
        'titleId': 'Lifecycle Hooks: onMounted, onUnmounted & Template Refs (useTemplateRef)',
        'titleEn': 'Lifecycle Hooks: onMounted, onUnmounted & Template Refs (useTemplateRef)',
        'programId': 'Umpan Aktivitas CRM Real-Time dengan Polling & Auto-Focus DOM',
        'programEn': 'Real-Time CRM Activity Stream with Interval Polling & DOM Autofocus',
        'levelNameId': 'Composition API, Reaktivitas & Komponen',
        'levelNameEn': 'Composition API, Reactivity & Components',
        'language': 'vue',
        'code': """<script setup>
import { ref, onMounted, onUnmounted, useTemplateRef } from "vue";

const aktivitasList = ref([]);
const inputRef = useTemplateRef("inputAktivitasBaru"); // Vue 3.5+ Template Ref API
const teksAktivitas = ref("");
let timerPolling = null;

// 1. onMounted: Dijalankan setelah komponen terpasang di DOM browser
onMounted(() => {
  console.log("[Lifecycle] Komponen CRM Activity mounted. Memulai polling...");
  
  // Fokuskan kursor otomatis ke elemen input tanpa library pihak ketiga
  inputRef.value?.focus();

  // Simulasi polling data aktivitas baru setiap 4 detik
  timerPolling = setInterval(() => {
    const waktu = new Date().toLocaleTimeString("id-ID");
    aktivitasList.value.unshift({
      id: Date.now(),
      pesan: `Panggilan keluar ke klien pada ${waktu}`,
      tipe: "CALL"
    });
    // Batasi 5 riwayat teratas
    if (aktivitasList.value.length > 5) aktivitasList.value.pop();
  }, 4000);
});

// 2. onUnmounted: Pembersihan memori saat komponen dihancurkan (mencegah memory leak)
onUnmounted(() => {
  console.log("[Lifecycle] Membersihkan interval timer polling CRM.");
  if (timerPolling) clearInterval(timerPolling);
});

function kirimCatatan() {
  if (!teksAktivitas.value.trim()) return;
  aktivitasList.value.unshift({
    id: Date.now(),
    pesan: teksAktivitas.value,
    tipe: "MANUAL"
  });
  teksAktivitas.value = "";
  inputRef.value?.focus();
}
</script>

<template>
  <div style="max-width: 450px; margin: 20px auto; font-family: sans-serif; border: 1px solid #cbd5e1; padding: 16px; border-radius: 8px;">
    <h3>Umpan Aktivitas Sales Real-Time</h3>

    <div style="display: flex; gap: 8px; margin-bottom: 16px;">
      <input
        ref="inputAktivitasBaru"
        type="text"
        v-model="teksAktivitas"
        placeholder="Catat aktivitas manual..."
        style="flex: 1; padding: 6px 10px; border: 1px solid #cbd5e1; border-radius: 4px;"
        @keyup.enter="kirimCatatan"
      />
      <button @click="kirimCatatan" style="background: #2563eb; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">
        Kirim
      </button>
    </div>

    <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">
      Status: <span style="color: green;">● Polling Otomatis Aktif (4s)</span>
    </div>

    <ul style="list-style: none; padding: 0; margin: 0;">
      <li
        v-for="item in aktivitasList"
        :key="item.id"
        style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-size: 13px; display: flex; justify-content: space-between;"
      >
        <span>{{ item.pesan }}</span>
        <span style="font-size: 10px; background: #e2e8f0; padding: 2px 6px; border-radius: 3px;">{{ item.tipe }}</span>
      </li>
    </ul>
  </div>
</template>
""",
        'objectivesId': [
            'Memahami urutan siklus hidup komponen Vue: onMounted, onUpdated, onUnmounted',
            'Mengakses elemen DOM browser secara aman menggunakan Template Refs (useTemplateRef)',
            'Menginisialisasi koneksi websocket atau timer interval di dalam hook onMounted',
            'Mencegah memory leak fatal dengan membersihkan event listener dan timer di onUnmounted',
            'Menghindari manipulasi DOM langsung sebelum hook onMounted terpanggil',
        ],
        'objectivesEn': [
            'Master the sequential lifecycle stages of Vue components: onMounted, onUpdated, onUnmounted',
            'Acquire imperative DOM element handles safely via Template Refs (useTemplateRef)',
            'Initialize WebSocket streams and recurring polling timers within the onMounted phase',
            'Prevent catastrophic memory leaks by tearing down timers and subscriptions inside onUnmounted',
            'Avoid premature direct DOM queries prior to DOM mounting completion',
        ],
        'explanationId': """### Siklus Hidup Komponen Vue 3
Sebuah komponen Vue melewati beberapa fase:
1. **Setup / Creation**: Kode di dalam `<script setup>` dieksekusi. State reaktif dibuat, namun **elemen DOM HTML belum ada di layar!** (Jangan panggil `.focus()` atau `document.querySelector` di sini).
2. **`onMounted()`**: Komponen selesai dirender dan dipasang ke DOM browser. Ini adalah waktu yang tepat untuk: auto-focus input, mengambil data dari API, atau menginisialisasi chart grafik (Chart.js / Leaflet).
3. **`onUpdated()`**: Dipanggil saat data reaktif berubah dan DOM telah selesai diperbarui.
4. **`onUnmounted()`**: Komponen dihapus dari layar. **Wajib membersihkan `clearInterval`, `removeEventListener`, dan koneksi socket** agar browser pengguna tidak melambat.

### Template Refs Modern (`useTemplateRef`)
Di Vue 3.5+, cara terbaik mengambil referensi elemen DOM adalah menggunakan macro `useTemplateRef('namaRef')`. Ini menghasilkan ref yang akan otomatis terisi dengan elemen HTML asli begitu komponen mencapai tahap `onMounted`.""",
        'explanationEn': """### The Vue 3 Component Lifecycle Pipeline
Components progress through deterministic lifecycle milestones:
1. **Setup Phase**: Logic in `<script setup>` initializes. Reactive state binds, yet **browser DOM nodes do not yet exist!** (Never execute query selectors here).
2. **`onMounted()`**: Component markup commits to the browser DOM. The prime opportunity to: autofocus inputs, trigger network fetches, or mount external canvases (Chart.js, Leaflet).
3. **`onUpdated()`**: Fires following state mutations after the DOM reconciles.
4. **`onUnmounted()`**: Component prunes from memory. **You must clear intervals, global window listeners, and open sockets** to prevent memory accumulation.

### Modern Template Refs (`useTemplateRef`)
In Vue 3.5+, access DOM nodes declaratively with `useTemplateRef('refIdentifier')`. This returns a typed ref populating with the native DOM element instance upon completion of the `onMounted` lifecycle step.""",
        'beginnerId': """### Analogi: Panggung Teater Sandiwara
1. **`<script setup>`** seperti ruang ganti di belakang panggung: para aktor menghafal naskah (*state*), tetapi penonton belum melihat apapun di panggung.
2. **`onMounted`** seperti tirai panggung dibuka: lampu sorot menyala, aktor melangkah ke panggung (*DOM siap*), dan musik orkestra mulai dimainkan (*polling timer*).
3. **`onUnmounted`** seperti pementasan selesai dan lampu gedung dimatikan: pemusik berhenti bermain biola dan merapikan alat musik (*clearInterval*) agar gedung tidak boros listrik semalaman.""",
        'beginnerEn': """### Analogy: Live Theatrical Productions
1. **`<script setup>`** is backstage dressing room rehearsal: actors review scripts (*state*), invisible to audience view.
2. **`onMounted`** is the curtain opening: stage lighting illuminates, actors step onto the stage floor (*DOM ready*), and the live orchestra plays the opening score (*polling timer*).
3. **`onUnmounted`** is the final curtain fall: musicians pack instruments and shut off power feeds (*clearInterval*) preventing unnecessary overnight utility consumption.""",
        'experimentsId': [
            'Buka halaman dan perhatikan kursor otomatis fokus ke input tanpa perlu Anda klik berkat template ref.',
            'Tunggu selama 4 detik dan saksikan aktivitas baru muncul otomatis dari simulasi polling.',
            'Tinggalkan halaman komponen ini dan amati pesan log onUnmounted membersihkan timer di konsol.',
            'Gunakan hook onUpdated untuk mendeteksi kapan saja aktivitasList selesai dirender ke DOM.',
        ],
        'experimentsEn': [
            'Load the view to observe the input autofocus imperatively without user clicks via template ref.',
            'Wait 4 seconds to observe real-time activity entries stream in from the simulated polling loop.',
            'Unmount the component to verify the onUnmounted hook logs timer cleanup in the dev console.',
            'Deploy the onUpdated hook to benchmark when DOM reconciliations finalize.',
        ],
        'challengeId': 'Gunakan `useTemplateRef` untuk membuat scroll otomatis ke bagian paling bawah daftar aktivitas setiap kali ada aktivitas baru yang masuk, menggunakan method `element.scrollTop = element.scrollHeight`.',
        'challengeEn': 'Deploy `useTemplateRef` to enforce automatic downward scrolling whenever fresh activity arrives via `element.scrollTop = element.scrollHeight`.',
        'summaryId': 'Kamu telah menguasai lifecycle hooks onMounted/onUnmounted dan template refs DOM. Minggu depan kita memasuki Level 2: Composables dan Pinia State Management.',
        'summaryEn': 'You have mastered lifecycle hooks onMounted/onUnmounted and DOM template refs. Next week, we enter Level 2: Composables and Pinia State Management.',
    },

    # Level 2: Composables, Pinia & Vue Router (Weeks 5-7)
    {
        'week': 5,
        'level': 'intermediate',
        'topicId': 'composables-dan-reusability',
        'titleId': 'Composables Modern: Ekstraksi Logika Ber-State Reusable (useSalesLeads)',
        'titleEn': 'Modern Composables: Stateful Reusable Logic Extraction (useSalesLeads)',
        'programId': 'Composable Pengambilan Data CRM dengan Auto-Fetch & Error Handling',
        'programEn': 'CRM Lead Fetcher Composable with Async State & Error Handling',
        'levelNameId': 'Composables, Pinia & Vue Router',
        'levelNameEn': 'Composables, Pinia & Vue Router',
        'language': 'js',
        'code': """// ============================================================================
// File: composables/useSalesLeads.js (Composable Logic Ber-State Mandiri)
// ============================================================================
import { ref } from "vue";

export function useSalesLeads() {
  const leads = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchLeads() {
    loading.value = true;
    error.value = null;

    try {
      // Simulasi latency jaringan 800ms
      await new Promise((r) => setTimeout(r, 800));

      leads.value = [
        { id: "L1", nama: "PT Sinarmas Agro", nilai: 120000000, tahap: "DEAL" },
        { id: "L2", nama: "Bank Syariah Nusantara", nilai: 450000000, tahap: "NEGOSIASI" },
        { id: "L3", nama: "Startup EduTech Maju", nilai: 75000000, tahap: "PROSPEK" }
      ];
    } catch (err) {
      error.value = "Gagal menyinkronkan data leads dari server.";
    } finally {
      loading.value = false;
    }
  }

  function tambahLead(leadBaru) {
    leads.value.unshift({ id: `L-${Date.now()}`, ...leadBaru });
  }

  function hitungTotalPipeline() {
    return leads.value.reduce((total, item) => total + item.nilai, 0);
  }

  // Kembalikan state dan fungsi aksi dalam bentuk objek
  return {
    leads,
    loading,
    error,
    fetchLeads,
    tambahLead,
    hitungTotalPipeline
  };
}
""",
        'objectivesId': [
            'Memahami filosofi Composables di Vue 3 sebagai padanan Custom Hooks di React',
            'Mengetahui konvensi penamaan baku Composable (selalu diawali dengan use, misal useSalesLeads)',
            'Mengemas state reaktif (leads, loading, error) dan fungsi mutasi ke dalam satu modul terisolasi',
            'Mengonsumsi Composable yang sama di berbagai komponen berbeda tanpa duplikasi kode',
            'Menjaga reaktivitas data saat diekspor dari Composable tanpa merusak Proxy tracking',
        ],
        'objectivesEn': [
            'Master the Composable design philosophy in Vue 3 equivalent to React Custom Hooks',
            'Follow canonical Composable naming conventions (mandatory `use` prefix, e.g. useSalesLeads)',
            'Encapsulate reactive state slices (leads, loading, error) and mutations inside cohesive modules',
            'Consume identical Composables across disparate components with zero code duplication',
            'Preserve reactive Proxy integrity when destructuring Composable return values',
        ],
        'explanationId': """### Apa itu Composable di Vue 3?
Dalam pengembangan aplikasi Vue modern, **Composable adalah fungsi yang memanfaatkan Composition API Vue untuk mengkapsulasi dan menggunakan kembali logika yang memiliki state (*stateful logic*)**.
Sebelum ada Composable, pengembang Vue menggunakan *Mixins* yang terkenal dengan masalah benturan nama (*namespace collisions*) dan sumber data yang tidak jelas (*implicit dependencies*).

### Keunggulan Composable:
1. **Eksplisit**: Semua state dan fungsi yang dikembalikan dideklarasikan dengan jelas: `const { leads, loading } = useSalesLeads()`.
2. **Tidak ada benturan nama**: Anda bebas me-rename variabel saat destrukturisasi: `const { leads: daftarKlien } = useSalesLeads()`.
3. **Fleksibel**: Composable dapat memanggil Composable lain di dalamnya (misal `useSalesLeads` memanggil `useLocalStorage`).""",
        'explanationEn': """### Understanding Vue 3 Composables
In modern Vue architecture, **a Composable is a function leveraging Vue Composition APIs to encapsulate and distribute stateful logic**.
Prior to Composables, developers relied on *Mixins*, infamous for silent property collisions and obfuscated data origins.

### Advantages of Composables:
1. **Explicit Lineage**: Output states and actions declare with complete transparency: `const { leads, loading } = useSalesLeads()`.
2. **Collision-Free Ergonomics**: You can rename properties during destructuring: `const { leads: clientList } = useSalesLeads()`.
3. **Hierarchical Composability**: Composables seamlessly nest within other composables (e.g. `useSalesLeads` orchestrating `useLocalStorage`).""",
        'beginnerId': """### Analogi: Resep Bumbu Masak Kemasan Sachet
1. **Tanpa Composable**, setiap koki di 10 cabang restoran harus menakar garam, merica, dan rempah secara manual dari awal di setiap masakan (kode berulang dan rawan salah takaran).
2. **Composable** seperti bumbu instan sachet buatan pabrik: pabrik mengemas bumbu lezat dalam satu sachet (*useSalesLeads*). Koki di cabang mana saja cukup merobek sachet tersebut dan memasukkannya ke wajan untuk rasa masakan yang 100% konsisten.""",
        'beginnerEn': """### Analogy: Standardized Spice Sachets
1. **Without Composables**, kitchen staff across 10 franchise branches hand-measure salt, pepper, and spices from raw jars for every single order (repetitive, human error prone).
2. **Composables** are sealed factory spice sachets: quality control blends the recipe into a convenient packet (*useSalesLeads*). Any franchise cook tears open the sachet into the pan, guaranteeing flawless, identical culinary output.""",
        'experimentsId': [
            'Impor useSalesLeads ke dalam komponen .vue, panggil fetchLeads() di onMounted, dan tampilkan indikator loading.',
            'Panggil hitungTotalPipeline() dan buktikan total nominal dihitung dengan tepat dari seluruh leads.',
            'Gunakan composable yang sama di dua komponen terpisah untuk membuktikan independensi state lokalnya.',
            'Kombinasikan useSalesLeads dengan useLocalStorage untuk menyimpan draf lead ke browser.',
        ],
        'experimentsEn': [
            'Import useSalesLeads into a .vue SFC, trigger fetchLeads() in onMounted, and display the loading spinner.',
            'Invoke hitungTotalPipeline() confirming accurate total pipeline valuation math.',
            'Instantiate the composable within two independent components to verify state isolation.',
            'Chain useSalesLeads with useLocalStorage to persist lead drafts to the browser cache.',
        ],
        'challengeId': 'Buat composable `useDebouncedSearch(initialQuery, delay)` yang mengembalikan `query` dan `debouncedQuery` dengan debounce timer otomatis.',
        'challengeEn': 'Author a `useDebouncedSearch(initialQuery, delay)` composable exporting `query` and `debouncedQuery` governed by an automated debounce timer.',
        'summaryId': 'Kamu telah menguasai pembuatan Composables modern untuk ekstraksi logika bisnis. Minggu depan kita mempelajari Manajemen State Global dengan Pinia.',
        'summaryEn': 'You have mastered authoring modern Composables for business logic reuse. Next week, we examine Global State Management with Pinia.',
    },
    {
        'week': 6,
        'level': 'intermediate',
        'topicId': 'pinia-state-management',
        'titleId': 'Pinia: Manajemen State Global Modern, Actions, Getters & Store DevTools',
        'titleEn': 'Pinia: Modern Global State Management, Actions, Getters & DevTools',
        'programId': 'Pipeline Penjualan Global CRM Menggunakan Pinia Store',
        'programEn': 'Global Sales Pipeline State Store with Pinia & Dynamic Getters',
        'levelNameId': 'Composables, Pinia & Vue Router',
        'levelNameEn': 'Composables, Pinia & Vue Router',
        'language': 'js',
        'code': """// ============================================================================
// File: stores/salesPipeline.js (Pinia Setup Store Modern)
// ============================================================================
import { defineStore } from "pinia";
import { ref, computed } from "vue";

// Setup Store Syntax (Identik dengan gaya <script setup>)
export const usePipelineStore = defineStore("salesPipeline", () => {
  // 1. State (ref)
  const deals = ref([
    { id: "D-1", klien: "Telkom Digital", nominal: 250000000, stage: "QUALIFIED" },
    { id: "D-2", klien: "Astra International", nominal: 600000000, stage: "PROPOSAL" },
    { id: "D-3", klien: "Gojek Tokopedia", nominal: 180000000, stage: "WON" }
  ]);
  const filterTahap = ref("ALL");

  // 2. Getters (computed)
  const totalOmsetWon = computed(() => {
    return deals.value
      .filter((d) => d.stage === "WON")
      .reduce((sum, d) => sum + d.nominal, 0);
  });

  const dealsTerfilter = computed(() => {
    if (filterTahap.value === "ALL") return deals.value;
    return deals.value.filter((d) => d.stage === filterTahap.value);
  });

  // 3. Actions (functions)
  function geserStage(dealId, stageBaru) {
    const target = deals.value.find((d) => d.id === dealId);
    if (target) {
      target.stage = stageBaru;
    }
  }

  function tambahDeal(klien, nominal) {
    deals.value.push({
      id: `D-${Date.now()}`,
      klien,
      nominal: Number(nominal),
      stage: "QUALIFIED"
    });
  }

  return {
    deals,
    filterTahap,
    totalOmsetWon,
    dealsTerfilter,
    geserStage,
    tambahDeal
  };
});
""",
        'objectivesId': [
            'Memahami mengapa Pinia menggantikan Vuex sebagai standar resmi manajemen state Vue',
            'Membuat Pinia Setup Store menggunakan sintaks reaktif modern (ref untuk state, computed untuk getters)',
            'Menulis Actions untuk mengkapsulasi mutasi sinkron maupun permintaan asinkron ke server',
            'Mengakses dan memodifikasi store dari komponen manapun tanpa prop drilling',
            'Menggunakan fitur time-travel debugging dan state inspection dengan Vue DevTools',
        ],
        'objectivesEn': [
            'Understand why Pinia replaced Vuex as the definitive official state store standard',
            'Construct Pinia Setup Stores leveraging modern composition syntax (ref as state, computed as getters)',
            'Author Actions encapsulating both synchronous mutations and asynchronous HTTP operations',
            'Consume and mutate store data from arbitrary components without prop drilling',
            'Leverage time-travel debugging and state inspection within official Vue DevTools',
        ],
        'explanationId': """### Mengapa Pinia Menggantikan Vuex?
Vuex (standar lama) sangat bertele-tele: Anda harus memisahkan *mutations* (sinkron) dan *actions* (asinkron), serta tidak memiliki autokomplet TypeScript yang baik.
**Pinia** adalah penyempurnaan mutlak:
1. **Tidak ada Mutations**: Cukup tulis fungsi biasa (*actions*) yang dapat menangani mutasi langsung maupun operasi asinkron.
2. **Setup Store Syntax**: Anda mendefinisikan store persis seperti menulis komponen biasa dengan `<script setup>` (`ref` = state, `computed` = getters, `function` = actions).
3. **Sangat Ringan**: Ukuran file hanya ~1KB dan mendukung pemecahan kode otomatis (*code splitting*).

### Mengonsumsi Store di Komponen
Di komponen `.vue`:
```vue
<script setup>
import { usePipelineStore } from '@/stores/salesPipeline';
const pipeline = usePipelineStore();
</script>
<template>
  <div>Omset Deal: Rp {{ pipeline.totalOmsetWon }}</div>
</template>
```""",
        'explanationEn': """### Why Pinia Replaced Legacy Vuex
Vuex suffered from verbose boilerplate: artificially bifurcating updates into synchronous *mutations* versus asynchronous *actions*, alongside poor TypeScript typing.
**Pinia** re-engineers global state:
1. **No Mutations**: Regular functions (*actions*) perform both immediate mutations and asynchronous I/O transparently.
2. **Setup Store Syntax**: Store definitions look identical to standard `<script setup>` components (`ref` = state, `computed` = getters, `function` = actions).
3. **Ultra Lightweight**: Weighs ~1KB with native support for modular code-splitting.

### Consuming Stores in Components
Inside any `.vue` component:
```vue
<script setup>
import { usePipelineStore } from '@/stores/salesPipeline';
const pipeline = usePipelineStore();
</script>
<template>
  <div>Closed Revenue: Rp {{ pipeline.totalOmsetWon }}</div>
</template>
```""",
        'beginnerId': """### Analogi: Rekening Bank Perusahaan Terpusat
1. **State Lokal (useState/ref)** seperti uang tunai di dompet masing-masing staf: staf divisi sales tidak tahu berapa uang di dompet staf divisi marketing.
2. **Pinia Store** seperti rekening koran pusat perusahaan: semua divisi (sales, HR, finance) melihat saldo kas yang persis sama. Jika sales menutup transaksi bernilai 1 Miliar, finance langsung melihat angka saldo kas bertambah di layar mereka saat itu juga.""",
        'beginnerEn': """### Analogy: Corporate Central Banking Ledger
1. **Local State (ref)** is pocket petty cash in each sales agent's wallet: the marketing manager cannot observe cash inside the lead developer's pocket.
2. **Pinia Store** is the centralized corporate treasury: all departments (sales, HR, finance) view the identical ledger balance. When sales closes a 1-billion contract, finance witnesses the capital balance surge on their monitors simultaneously.""",
        'experimentsId': [
            'Panggil pipeline.tambahDeal("Unilever", 800000000) dan buktikan total deals bertambah di seluruh komponen.',
            'Pindahkan stage deal ke WON dan amati totalOmsetWon melonjak otomatis berkat Pinia getter.',
            'Buka Vue DevTools di browser dan periksa tab Pinia untuk melihat state tree secara visual.',
            'Gunakan fungsi pipeline.$reset() atau plugin pinia-plugin-persistedstate untuk menyimpan state ke LocalStorage.',
        ],
        'experimentsEn': [
            'Invoke pipeline.tambahDeal("Unilever", 800000000) and verify deals increment across all components.',
            'Transition a deal stage to WON observing totalOmsetWon jump automatically via the Pinia getter.',
            'Open Vue DevTools to inspect the active Pinia state tree visually.',
            'Evaluate store reset semantics ($reset) and explore pinia-plugin-persistedstate for browser persistence.',
        ],
        'challengeId': 'Tambahkan action `hapusDeal(id)` pada `usePipelineStore` dan buat getter `hitungPersentaseWinRate` yang menghitung persentase jumlah deal berstatus WON dibanding seluruh total deal.',
        'challengeEn': 'Add a `deleteDeal(id)` action to `usePipelineStore` alongside a `calculateWinRate` getter computing the percentage of WON deals relative to total deals.',
        'summaryId': 'Kamu telah menguasai Pinia global state management, getters, dan actions. Minggu depan kita mempelajari Vue Router 4 dan Navigation Guards.',
        'summaryEn': 'You have mastered Pinia global state management, getters, and actions. Next week, we examine Vue Router 4 and Navigation Guards.',
    },
    {
        'week': 7,
        'level': 'intermediate',
        'topicId': 'vue-router-dan-navigation-guards',
        'titleId': 'Vue Router 4: Dynamic Routes, Nested Routes & Navigation Guards (beforeEach)',
        'titleEn': 'Vue Router 4: Dynamic Routes, Nested Routes & Navigation Guards (beforeEach)',
        'programId': 'Sistem Navigasi CRM Enterprise dengan Proteksi Rute Hak Akses',
        'programEn': 'Enterprise CRM Navigation with RBAC Route Guards & Lazy Loading',
        'levelNameId': 'Composables, Pinia & Vue Router',
        'levelNameEn': 'Composables, Pinia & Vue Router',
        'language': 'js',
        'code': """// ============================================================================
// File: router/index.js (Vue Router 4 dengan Navigasi Proteksi RBAC)
// ============================================================================
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"), // Lazy Loading Chunk
    meta: { public: true }
  },
  {
    path: "/",
    redirect: "/dashboard"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/DashboardView.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/leads/:id",
    name: "LeadDetail",
    component: () => import("../views/LeadDetailView.vue"),
    props: true, // Inject route.params.id langsung sebagai props komponen!
    meta: { requiresAuth: true, role: "SALES" }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFoundView.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation Guard Global: Berjalan sebelum setiap perpindahan halaman
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("nusa_crm_token");
  const userRole = localStorage.getItem("nusa_crm_role") || "GUEST";

  console.log(`[Router Guard] Navigasi dari ${from.path} menuju ${to.path}`);

  if (to.meta.requiresAuth && !token) {
    // Belum login: Lempar ke login
    next({ name: "Login", query: { redirect: to.fullPath } });
  } else if (to.meta.role && to.meta.role !== userRole && userRole !== "ADMIN") {
    // Role tidak mencukupi
    alert("Akses Ditolak: Anda tidak memiliki izin untuk halaman ini.");
    next(false); // Batalkan navigasi
  } else {
    next(); // Izinkan navigasi berlanjut
  }
});

export default router;
""",
        'objectivesId': [
            'Mengonfigurasi Vue Router 4 dengan mode createWebHistory() HTML5 bersih tanpa tanda pagar (#)',
            'Menerapkan Lazy Loading rute menggunakan dynamic import () => import(...) untuk mengecilkan bundle awal',
            'Menggunakan properti meta pada rute untuk menyimpan metadata hak akses (requiresAuth, role)',
            'Mengamankan rute aplikasi menggunakan Global Navigation Guards (router.beforeEach)',
            'Mengoper parameter URL dinamis (:id) langsung sebagai props ke komponen tampilan via props: true',
        ],
        'objectivesEn': [
            'Configure Vue Router 4 utilizing clean HTML5 createWebHistory() sans hash (#) symbols',
            'Enforce route-level Lazy Loading with dynamic import expressions () => import(...) shrinking startup bundles',
            'Attach route meta fields encoding authorization claims (requiresAuth, role)',
            'Harden sensitive route boundaries deploying Global Navigation Guards (router.beforeEach)',
            'Inject dynamic URL parameters (:id) directly as component props via props: true',
        ],
        'explanationId': """### Arsitektur Routing Single Page Application (SPA)
Pada SPA, perpindahan halaman tidak menyebabkan browser me-refresh dokumen HTML dari server. Vue Router mencegat klik link, memperbarui URL di bilah alamat browser melalui HTML5 History API, dan menukar komponen tampilan yang aktif di dalam `<RouterView />`.

### Lazy Loading untuk Performa Skala Besar
Jangan pernah mengimpor semua halaman di baris atas router!
Dengan sintaks `component: () => import('../views/Detail.vue')`, Vite akan memecah file tersebut menjadi chunk JavaScript terpisah. Kode halaman detail hanya diunduh oleh browser ketika pengguna benar-benar mengeklik link tersebut!

### Kekuatan `router.beforeEach`
Fungsi navigation guard bertindak sebagai gerbang otentikasi. Anda dapat memeriksa apakah token JWT ada di storage sebelum mengizinkan rute `/dashboard` ditampilkan. Jika tidak ada, pengguna langsung dibelokkan ke `/login` tanpa sempat melihat data rahasia.""",
        'explanationEn': """### Single Page Application (SPA) Routing
Within SPAs, route transitions never trigger hard full-page browser refreshes. Vue Router intercepts link clicks, mutates the URL bar through the HTML5 History API, and dynamically swaps view components inside `<RouterView />`.

### Route-Level Lazy Loading
Avoid importing all view templates statically at the head of your router configuration.
Writing `component: () => import('../views/Detail.vue')` instructs Vite to split that view into an isolated JavaScript chunk. The browser downloads the chunk on-demand only when a user navigates to that path!

### The Power of `router.beforeEach`
Navigation guards serve as identity gates. You evaluate JWT tokens before allowing routes like `/dashboard` to mount. Unauthenticated visitors redirect to `/login` immediately without exposing confidential views.""",
        'beginnerId': """### Analogi: Papan Penunjuk Jalan & Penjaga Pintu Lobi VIP
1. **Vue Router** seperti sistem lift pintar di gedung pencakar langit: menekan tombol lantai 14 mengarahkan Anda ke lantai 14 tanpa harus keluar dari gedung dan masuk lagi lewat pintu depan.
2. **beforeEach Guard** seperti petugas keamanan di depan pintu lift eksekutif: sebelum pintu lift terbuka ke lantai direksi (*rute admin*), petugas memeriksa kartu ID (*meta.requiresAuth*). Jika kartu tidak valid, lift ditolak dan dikembalikan ke lobi dasar.""",
        'beginnerEn': """### Analogy: Smart Elevator Terminals & VIP Access Checkpoints
1. **Vue Router** is a high-speed elevator terminal in a skyscraper: pressing floor 14 whisks you to floor 14 without leaving the building to re-enter the front revolving door.
2. **beforeEach Guard** is a security guard stationed before executive elevator banks: before doors open onto the boardroom floor (*admin route*), security inspects badges (*meta.requiresAuth*). Invalid badges send passengers back down to the lobby.""",
        'experimentsId': [
            'Coba buka rute /dashboard tanpa token di LocalStorage dan amati redirect otomatis ke /login.',
            'Simulasikan login sukses dengan menulis localStorage.setItem("nusa_crm_token", "xyz") dan buka kembali dashboard.',
            'Buka URL /leads/L-101 dan verifikasi komponen LeadDetail menerima prop id = "L-101" secara langsung.',
            'Coba akses rute yang tidak terdaftar dan amati komponen NotFound menangkap rute 404.',
        ],
        'experimentsEn': [
            'Navigate to /dashboard lacking localStorage tokens to observe automated redirection to /login.',
            'Simulate successful login by setting localStorage.setItem("nusa_crm_token", "jwt") and reload dashboard.',
            'Navigate to /leads/L-101 and verify the view component receives prop id = "L-101" directly.',
            'Hit an unmapped URL path to verify the catch-all NotFound wildcard route renders.',
        ],
        'challengeId': 'Tambahkan progress bar loading visual di bagian atas layar menggunakan library NProgress yang dipicu pada hook `router.beforeEach` (start) dan `router.afterEach` (done).',
        'challengeEn': 'Integrate a visual top-bar loading indicator using NProgress triggered across `router.beforeEach` (start) and `router.afterEach` (done) hooks.',
        'summaryId': 'Kamu telah menguasai Vue Router 4, lazy loading chunks, dan navigation guards. Minggu depan kita memasuki Level 3: Slots Lanjut, Teleport, dan Capstone CRM.',
        'summaryEn': 'You have mastered Vue Router 4, lazy loading, and navigation guards. Next week, we enter Level 3: Advanced Slots, Teleport, and CRM Capstone.',
    },

    # Level 3: Slots Lanjut, Animasi, Optimasi & Capstone CRM (Weeks 8-10)
    {
        'week': 8,
        'level': 'advanced',
        'topicId': 'slots-dan-dynamic-components',
        'titleId': 'Komponen Tingkat Lanjut: Scoped Slots, Dinamis (<component :is>) & KeepAlive',
        'titleEn': 'Advanced Components: Scoped Slots, Dynamic Components & KeepAlive',
        'programId': 'Sistem Kartu Widget Dashboard CRM yang Dapat Disesuaikan (Customizable)',
        'programEn': 'Customizable CRM Dashboard Widget System with Scoped Slots & KeepAlive',
        'levelNameId': 'Slots Lanjut, Animasi, Optimasi & Capstone CRM',
        'levelNameEn': 'Advanced Slots, Animations, Optimization & CRM Capstone',
        'language': 'vue',
        'code': """<!-- ===================================================================== -->
<!-- File: WidgetContainer.vue (Komponen Pembungkus dengan Scoped Slots)       -->
<!-- ===================================================================== -->
<script setup>
import { ref } from "vue";

defineProps({
  judul: String
});

const isCollapsed = ref(false);
const waktuDiperbarui = ref(new Date().toLocaleTimeString("id-ID"));

function refreshWidget() {
  waktuDiperbarui.value = new Date().toLocaleTimeString("id-ID");
}
</script>

<template>
  <div style="border: 1px solid #cbd5e1; border-radius: 8px; background: white; margin-bottom: 16px;">
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid #f1f5f9;">
      <!-- Named Slot: Header Kustom -->
      <slot name="header" :judul="judul">
        <h4 style="margin: 0;">{{ judul }}</h4>
      </slot>

      <div style="display: flex; gap: 8px;">
        <button @click="refreshWidget" style="font-size: 11px; cursor: pointer;">↻ Refresh</button>
        <button @click="isCollapsed = !isCollapsed" style="font-size: 11px; cursor: pointer;">
          {{ isCollapsed ? "Buka" : "Tutup" }}
        </button>
      </div>
    </div>

    <!-- Scoped Slot Default: Mengalirkan data waktuDiperbarui ke Parent -->
    <div v-show="!isCollapsed" style="padding: 16px;">
      <slot :terakhirSync="waktuDiperbarui">
        <p style="color: #94a3b8; font-size: 13px;">Tidak ada konten widget.</p>
      </slot>
    </div>
  </div>
</template>
""",
        'objectivesId': [
            'Memahami konsep Transklusi dan Slots untuk komposisi komponen tingkat tinggi',
            'Menggunakan Named Slots (v-slot:header atau #header) untuk multi-area konten fleksibel',
            'Menguasai Scoped Slots: komponen anak mengekspos data internal ke template parent',
            'Menggunakan elemen khusus <component :is="activeTab"> untuk render komponen dinamis',
            'Membungkus komponen dengan <KeepAlive> untuk mempertahankan state form saat berganti tab',
        ],
        'objectivesEn': [
            'Master component transclusion paradigms deploying flexible Vue Slots',
            'Utilize Named Slots (v-slot:header or #header shorthand) for structured multi-zone layouts',
            'Master Scoped Slots streaming internal child state back up into parent template scopes',
            'Deploy dynamic component rendering via the meta element <component :is="activeTab">',
            'Envelop dynamic views in <KeepAlive> preserving scroll state and form inputs across tab toggles',
        ],
        'explanationId': """### Scoped Slots: Pola Desain Paling Kuat di Vue
Pada slot biasa, parent hanya menyisipkan markup ke dalam anak.
Pada **Scoped Slots**, komponen anak **mengirimkan data internalnya ke parent** untuk ditentukan bagaimana data tersebut harus ditampilkan!
Misalnya pada komponen tabel data: anak mengelola sorting dan pagination, namun anak memberikan data baris kepada parent melalui scoped slot: `<template #default="{ row }">`.
Parent memiliki kebebasan 100% mendesain tampilan kartu, teks tebal, atau avatar tanpa perlu mengubah kode komponen tabel!

### `<component :is="...">` dan `<KeepAlive>`
Ketika Anda memiliki navigasi multi-tab (Tab Lead, Tab Deals, Tab Kontak):
Daripada menulis banyak `v-if` / `v-else-if`, gunakan `<component :is="tabAktif" />`.
Jika Anda membungkusnya dengan `<KeepAlive>`:
Saat pengguna berpindah dari Tab 1 ke Tab 2 lalu kembali lagi ke Tab 1, **isi form yang sudah diketik pengguna tidak akan hilang**, karena Vue tidak menghancurkan (*unmount*) komponen tersebut melainkan hanya menonaktifkannya di memori!""",
        'explanationEn': """### Scoped Slots: Vue's Most Powerful Inversion of Control
In vanilla slots, parents simply project static markup into children.
With **Scoped Slots**, children **pass internal state tokens back up to the parent template scope**!
In an enterprise data table: the child manages sorting algorithms and pagination, yielding current rows to the parent via `<template #default="{ row }">`.
The parent enjoys complete freedom styling badges, avatars, or actions without hacking internal table code!

### Dynamic Components & `<KeepAlive>`
When managing tabbed dashboard layouts (Leads Tab, Deals Tab, Contacts Tab):
Avoid verbose cascades of `v-if` / `v-else-if`. Deploy `<component :is="activeTab" />`.
Enclosing the dynamic view inside `<KeepAlive>` ensures:
When users switch from Tab 1 to Tab 2 and back, **uncommitted form inputs remain pristine**, because Vue suspends the component in memory rather than unmounting it!""",
        'beginnerId': """### Analogi: Bingkai Pigura Foto & Tempat Duduk Bioskop Bernomor
1. **Scoped Slot** seperti bingkai foto pintar: toko menyediakan bingkai kayu elegan (*komponen container*), namun Anda bebas memasukkan foto pernikahan, ijazah, atau lukisan pemandangan di dalamnya. Bingkai memberi tahu Anda ukuran fotonya (*slot props*).
2. **KeepAlive** seperti meletakkan jaket di kursi bioskop saat Anda keluar sebentar membeli popcorn: saat Anda kembali, kursi Anda masih tersimpan untuk Anda, tidak ada orang lain yang mendudukinya.""",
        'beginnerEn': """### Analogy: Modular Picture Frames & Reserved Theater Seats
1. **Scoped Slots** are precision picture frames: the manufacturer supplies the mahogany moulding (*container component*), while you insert graduation portraits or modern oil paintings into the aperture. The frame communicates dimensions (*slot props*).
2. **KeepAlive** is leaving your jacket draped over a theater seat while buying popcorn: upon returning, your seat position remains reserved exactly as you left it.""",
        'experimentsId': [
            'Gunakan sintaks #header="{ judul }" di parent untuk mengubah judul widget menjadi huruf kapital merah.',
            'Gunakan data terakhirSync dari scoped slot default untuk menampilkan jam sinkronisasi di footer kartu.',
            'Uji perpindahan tab dengan dan tanpa <KeepAlive> untuk melihat bagaimana state input bertahan atau ter-reset.',
            'Kombinasikan komponen dinamis dengan dropdown select untuk beralih antar 3 widget yang berbeda.',
        ],
        'experimentsEn': [
            'Use #header="{ judul }" in the parent template rendering a custom styled red header.',
            'Consume the scoped terakhirSync prop rendering an updated timestamp badge in the card footer.',
            'Benchmark tab transitions with and without <KeepAlive> to observe state retention versus destruction.',
            'Drive dynamic components with a dropdown select switching between 3 distinct dashboard widgets.',
        ],
        'challengeId': 'Buat komponen `DataTable.vue` yang menggunakan Scoped Slots untuk merender kolom tabel secara dinamis, sehingga parent dapat mengustomisasi isi kolom status dengan badge warna-warni.',
        'challengeEn': 'Build a `DataTable.vue` component employing Scoped Slots to render dynamic table cells, allowing parents to inject customized status badge styling.',
        'summaryId': 'Kamu telah menguasai Scoped Slots, komponen dinamis <component :is>, dan cache memori <KeepAlive>. Minggu depan kita mempelajari Teleport, Transition, dan Optimasi.',
        'summaryEn': 'You have mastered Scoped Slots, dynamic components, and KeepAlive caching. Next week, we examine Teleport, Transitions, and Performance Tuning.',
    },
    {
        'week': 9,
        'level': 'advanced',
        'topicId': 'teleport-transition-dan-optimasi',
        'titleId': 'Teleport Modal, Animasi <TransitionGroup> & Optimasi (shallowRef)',
        'titleEn': 'Teleport Modals, <TransitionGroup> Animations & shallowRef Tuning',
        'programId': 'Modal Drawer CRM & Kanban Board Animasi Halus',
        'programEn': 'CRM Teleport Modal Drawer & Smooth Animated Pipeline List',
        'levelNameId': 'Slots Lanjut, Animasi, Optimasi & Capstone CRM',
        'levelNameEn': 'Advanced Slots, Animations, Optimization & CRM Capstone',
        'language': 'vue',
        'code': """<script setup>
import { ref, shallowRef } from "vue";

const isModalBuka = ref(false);

// shallowRef: Hanya melacak perubahan referensi tingkat atas (.value = baru), menghemat komputasi pada array 10.000 data
const listLeads = shallowRef([
  { id: 1, nama: "PT Telkom Akses", nilai: "Rp 150 Jt" },
  { id: 2, nama: "PT Bank Mandiri", nilai: "Rp 500 Jt" },
  { id: 3, nama: "PT Indofood CBP", nilai: "Rp 320 Jt" }
]);

function hapusItem(id) {
  // Karena shallowRef, kita wajib membuat salinan array baru untuk memicu reaktivitas
  listLeads.value = listLeads.value.filter((item) => item.id !== id);
}

function tambahCepat() {
  const baru = { id: Date.now(), nama: "Lead Baru Prospek", nilai: "Rp 100 Jt" };
  listLeads.value = [baru, ...listLeads.value];
}
</script>

<template>
  <div style="max-width: 480px; margin: 20px auto; font-family: sans-serif;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
      <h3>Pipeline Leads Aktif</h3>
      <div>
        <button @click="tambahCepat" style="margin-right: 6px; padding: 6px 10px; cursor: pointer;">+ Tambah</button>
        <button @click="isModalBuka = true" style="background: #0f172a; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">
          Buka Drawer
        </button>
      </div>
    </div>

    <!-- TransitionGroup: Menghidupkan animasi penambahan, penghapusan, dan pergeseran list secara otomatis -->
    <TransitionGroup name="list" tag="ul" style="list-style: none; padding: 0; margin: 0;">
      <li
        v-for="item in listLeads"
        :key="item.id"
        style="padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; margin-bottom: 8px; display: flex; justify-content: space-between; background: white;"
      >
        <span>{{ item.nama }} ({{ item.nilai }})</span>
        <button @click="hapusItem(item.id)" style="color: red; border: none; background: none; cursor: pointer;">✕</button>
      </li>
    </TransitionGroup>

    <!-- Teleport: Memindahkan elemen modal keluar dari hierarki DOM komponen ke <body> langsung -->
    <Teleport to="body">
      <div v-if="isModalBuka" style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; justify-content: flex-end; z-index: 9999;">
        <div style="width: 320px; background: white; height: 100%; padding: 20px; box-shadow: -2px 0 8px rgba(0,0,0,0.2);">
          <h3>Drawer Pengaturan CRM</h3>
          <p style="font-size: 13px; color: #64748b;">Modal ini di-teleport langsung ke &lt;body&gt; agar tidak terjebak z-index parent!</p>
          <button @click="isModalBuka = false" style="padding: 8px 16px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Tutup Drawer
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
/* Animasi Transisi Halus untuk List */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
""",
        'objectivesId': [
            'Memahami masalah stacking context z-index dan cara mengatasinya dengan <Teleport>',
            'Memindahkan modal dialog dan drawer langsung ke target DOM luar (misal: <body>)',
            'Menggunakan <Transition> untuk menganimasikan elemen masuk dan keluar dengan CSS kelas terprediksi',
            'Menerapkan <TransitionGroup> untuk animasi pergeseran, penambahan, dan penghapusan list halus',
            'Mengoptimalkan performa data raksasa menggunakan shallowRef() untuk menghindari deep proxy overhead',
        ],
        'objectivesEn': [
            'Diagnose stacking context z-index clipping bugs and resolve them via <Teleport>',
            'Port modal overlays and sliding drawers cleanly into document body targets',
            'Deploy <Transition> to choreograph element enter/leave cycles with CSS transition states',
            'Apply <TransitionGroup> orchestrating smooth item additions, deletions, and layout reshuffling',
            'Optimize massive dataset performance using shallowRef() bypassing deep proxy instantiation',
        ],
        'explanationId': """### Mengapa Membutuhkan `<Teleport>`?
Ketika Anda membangun komponen modal atau popup di dalam kartu kecil yang memiliki properti CSS `overflow: hidden` atau `transform`, modal Anda akan terpotong secara visual atau berada di bawah elemen lain (*z-index trap*).
`<Teleport to="body">` secara magis **memindahkan render fisik elemen HTML modal ke akhir tag `<body>`**, namun kode komponennya tetap berada di dalam komponen Vue Anda dan tetap dapat mengakses state reaktif yang sama!

### Animasi Halus dengan `<TransitionGroup>`
Vue memiliki sistem transisi bawaan terbaik di industri:
1. `name-enter-from` -> `name-enter-to`
2. `name-leave-from` -> `name-leave-to`
Ketika item dihapus dari list, Vue secara otomatis menyematkan kelas CSS transisi dan menghitung posisi pergeseran item lain (*FLIP animation*), menghasilkan animasi antarmuka yang sangat anggun tanpa library pihak ketiga.

### shallowRef untuk Performa Ekstrem
Jika Anda memuat data 10.000 log server atau data geospasial besar, `ref()` biasa akan membungkus setiap properti bersarang dengan Proxy (membutuhkan banyak RAM).
`shallowRef()` hanya membuat properti `.value` yang reaktif. Objek di dalamnya tidak di-proxy, menghemat memori hingga 80%.""",
        'explanationEn': """### Why `<Teleport>` Is Critical for Overlays
When embedding dialog modals inside child containers governed by `overflow: hidden` or `transform`, dialogs get clipped or submerged behind sibling components (*the z-index stacking trap*).
`<Teleport to="body">` **relocates the physical HTML output of the modal directly beneath `<body>`**, while retaining component logic, scope, and reactivity bindings!

### Choreographed Animations via `<TransitionGroup>`
Vue provides class-based animation pipelines:
1. `name-enter-from` -> `name-enter-to`
2. `name-leave-from` -> `name-leave-to`
When removing items, Vue injects transition utility classes and calculates layout shifts (*FLIP animation heuristics*), rendering smooth animations without heavy third-party animation engines.

### High-Throughput Tuning with `shallowRef`
When managing datasets exceeding 10,000 entities, deep `ref()` instantiates thousands of nested Proxy interceptors.
`shallowRef()` bounds reactivity strictly to the `.value` root pointer, yielding up to an 80% reduction in memory overhead.""",
        'beginnerId': """### Analogi: Pintu Kemana Saja Doraemon & Balon Mengambang
1. **`<Teleport>`** seperti Pintu Kemana Saja: Anda menyalakan sakelar di dalam kamar tidur sempit (*komponen kartu anak*), tetapi pintu langsung terbuka di tengah alun-alun kota yang luas (*body dokumen*) sehingga Anda bebas membentangkan tenda raksasa (*modal dialog*) tanpa terhalang dinding kamar.
2. **TransitionGroup** seperti antrean orang berbaris rapi: saat orang di depan keluar antrean, orang di belakangnya melangkah maju secara anggun dan teratur.""",
        'beginnerEn': """### Analogy: Teleportation Portals & Orderly Queue Lines
1. **`<Teleport>`** is an architectural portal: you activate a switch inside a tiny bedroom (*child component*), but the doorway opens into an expansive city square (*document body*), allowing an enormous pavilion (*modal dialog*) to erect unobstructed by bedroom walls.
2. **TransitionGroup** is an orderly boarding queue: when the lead traveler steps forward, trailing passengers slide into position smoothly rather than instantly popping across space.""",
        'experimentsId': [
            'Buka Elements tab di Chrome DevTools, klik tombol "Buka Drawer", dan perhatikan elemen div modal muncul tepat di bawah <body>.',
            'Hapus salah satu item dari list dan amati animasi menghilang ke kanan secara halus berkat TransitionGroup.',
            'Klik "+ Tambah" dan perhatikan item baru meluncur dari atas dengan animasi elegan.',
            'Uji perbedaan shallowRef vs ref biasa pada objek bertingkat saat Anda mengubah properti dalamnya.',
        ],
        'experimentsEn': [
            'Open Elements tab in DevTools, click "Buka Drawer", and observe the modal div mount directly under <body>.',
            'Delete an item to observe the smooth rightward slide transition governed by TransitionGroup.',
            'Click "+ Tambah" to witness the fresh entry slide in smoothly from the top.',
            'Compare shallowRef vs deep ref behavior when attempting in-place property mutations.',
        ],
        'challengeId': 'Implementasikan transisi fade untuk backdrop modal gelap menggunakan `<Transition name="fade">` saat drawer dibuka dan ditutup.',
        'challengeEn': 'Implement a smooth backdrop fade transition utilizing `<Transition name="fade">` when the modal drawer toggles.',
        'summaryId': 'Kamu telah menguasai Teleport to body, animasi TransitionGroup, dan optimasi performa shallowRef. Minggu depan adalah Capstone Final: Enterprise CRM Dashboard.',
        'summaryEn': 'You have mastered Teleport, TransitionGroup animations, and shallowRef tuning. Next week is our Capstone Project: Enterprise CRM Dashboard.',
    },
    {
        'week': 10,
        'level': 'advanced',
        'topicId': 'capstone-enterprise-crm-dashboard',
        'titleId': 'Capstone: Dashboard CRM Enterprise & Pipeline Penjualan Interaktif',
        'titleEn': 'Capstone: Enterprise CRM Sales Pipeline & Lead Management Dashboard',
        'programId': 'Dashboard CRM Full-Feature dengan Drag & Drop Tahap, Pinia Store & Analitik',
        'programEn': 'Full-Feature CRM Sales Dashboard with Stage Dragging, Pinia & Real-Time Analytics',
        'levelNameId': 'Slots Lanjut, Animasi, Optimasi & Capstone CRM',
        'levelNameEn': 'Advanced Slots, Animations, Optimization & CRM Capstone',
        'language': 'vue',
        'code': """<!-- ===================================================================== -->
<!-- CAPSTONE: ENTERPRISE CRM DASHBOARD & SALES PIPELINE ENGINE             -->
<!-- ===================================================================== -->
<script setup>
import { ref, computed } from "vue";

// Data State Pipeline Penjualan
const stages = ["PROSPEK", "PROPOSAL", "NEGOSIASI", "DEAL"];

const leads = ref([
  { id: "L-1", nama: "PT Bank Mandiri Tbk", pic: "Agus Pratama", nilai: 450000000, stage: "NEGOSIASI" },
  { id: "L-2", nama: "Astra International", pic: "Siti Rahma", nilai: 750000000, stage: "PROPOSAL" },
  { id: "L-3", nama: "Telkomsel Solutions", pic: "Budi Santoso", nilai: 320000000, stage: "PROSPEK" },
  { id: "L-4", nama: "Unilever Indonesia", pic: "Dewi Lestari", nilai: 900000000, stage: "DEAL" }
]);

const stageFilter = ref("ALL");

// Metrik Finansial Reaktif (Computed)
const totalPipelineValue = computed(() => {
  return leads.value.reduce((sum, item) => sum + item.nilai, 0);
});

const totalWonDeal = computed(() => {
  return leads.value
    .filter((l) => l.stage === "DEAL")
    .reduce((sum, item) => sum + item.nilai, 0);
});

const filteredLeads = computed(() => {
  if (stageFilter.value === "ALL") return leads.value;
  return leads.value.filter((l) => l.stage === stageFilter.value);
});

function pindahkanStage(id, stageBaru) {
  const target = leads.value.find((l) => l.id === id);
  if (target) target.stage = stageBaru;
}

function hapusLead(id) {
  leads.value = leads.value.filter((l) => l.id !== id);
}
</script>

<template>
  <div style="max-width: 820px; margin: 24px auto; font-family: system-ui, sans-serif; padding: 0 16px;">
    <header style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f172a; padding-bottom: 16px;">
      <div>
        <h2 style="margin: 0;">Nusa CRM Enterprise Dashboard</h2>
        <small style="color: #64748b;">Vue 3 Composition API • Reactive Sales Engine</small>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 11px; color: #64748b; text-transform: uppercase;">Closed Won Revenue</div>
        <div style="font-size: 20px; font-weight: bold; color: #16a34a;">
          Rp {{ (totalWonDeal / 1000000).toFixed(0) }} Juta
        </div>
      </div>
    </header>

    <!-- Bar Analitik Ringkasan -->
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 20px 0;">
      <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1;">
        <small style="color: #64748b;">Total Nilai Pipeline</small>
        <div style="font-size: 18px; font-weight: bold; margin-top: 4px;">Rp {{ (totalPipelineValue / 1000000).toFixed(0) }} Jt</div>
      </div>
      <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1;">
        <small style="color: #64748b;">Jumlah Leads Terdaftar</small>
        <div style="font-size: 18px; font-weight: bold; margin-top: 4px;">{{ leads.length }} Perusahaan</div>
      </div>
      <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1;">
        <small style="color: #64748b;">Win Rate Konversi</small>
        <div style="font-size: 18px; font-weight: bold; color: #2563eb; margin-top: 4px;">
          {{ leads.length > 0 ? ((leads.filter(l => l.stage === 'DEAL').length / leads.length) * 100).toFixed(0) : 0 }}%
        </div>
      </div>
    </div>

    <!-- Filter Tahapan -->
    <div style="margin-bottom: 16px; display: flex; gap: 8px; align-items: center;">
      <span style="font-size: 13px; font-weight: bold;">Filter Tahap:</span>
      <select v-model="stageFilter" style="padding: 6px 12px; border-radius: 4px; border: 1px solid #cbd5e1;">
        <option value="ALL">Semua Tahap</option>
        <option v-for="s in stages" :key="s" :value="s">{{ s }}</option>
      </select>
    </div>

    <!-- Daftar Leads Pipeline -->
    <div style="display: grid; gap: 10px;">
      <div
        v-for="lead in filteredLeads"
        :key="lead.id"
        style="padding: 14px; border: 1px solid #cbd5e1; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; background: white;"
      >
        <div>
          <div style="font-weight: bold; font-size: 16px;">{{ lead.nama }}</div>
          <small style="color: #64748b;">PIC: {{ lead.pic }} • Nilai: <strong>Rp {{ (lead.nilai / 1000000).toLocaleString('id-ID') }} Jt</strong></small>
        </div>

        <div style="display: flex; gap: 8px; align-items: center;">
          <select
            :value="lead.stage"
            @change="(e) => pindahkanStage(lead.id, e.target.value)"
            style="padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 12px; border: 1px solid #cbd5e1;"
          >
            <option v-for="stg in stages" :key="stg" :value="stg">{{ stg }}</option>
          </select>

          <button @click="hapusLead(lead.id)" style="color: #dc2626; border: none; background: #fee2e2; padding: 6px 10px; border-radius: 4px; cursor: pointer;">
            ✕
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
""",
        'objectivesId': [
            'Mengintegrasikan seluruh kurikulum Vue 3 modern dari level pemula hingga mahir dalam aplikasi CRM produksi',
            'Mengelola alur pipeline penjualan dinamis dengan manipulasi state reaktif dan computed metrics',
            'Menerapkan kalkulasi finansial real-time (Closed Won, Total Pipeline, Conversion Win Rate)',
            'Membangun UI yang sangat modular, responsif, dan siap dikoneksikan ke backend REST / GraphQL',
            'Menghasilkan arsitektur frontend enterprise Vue 3 berkualitas tinggi dan mudah dirawat',
        ],
        'objectivesEn': [
            'Synthesize the comprehensive Vue 3 curriculum into an enterprise-grade production CRM application',
            'Manage dynamic sales pipeline workflows with reactive transitions and computed business metrics',
            'Compute financial analytics in real-time (Closed Won Revenue, Total Pipeline, Conversion Win Rate)',
            'Deliver a modular, responsive architecture engineered for enterprise REST and GraphQL APIs',
            'Demonstrate mastery of modern, maintainable Vue 3 frontend engineering standards',
        ],
        'explanationId': """### Arsitektur Capstone CRM Enterprise Dashboard
Aplikasi Capstone ini menyatukan seluruh pilar utama pengembangan Vue 3 modern:
1. **Reaktivitas Murni dan Performa**: Setiap kali tahap lead diubah (misalnya dari NEGOSIASI ke DEAL), seluruh metrik analitik (`totalWonDeal`, `totalPipelineValue`, dan `Win Rate %`) **dihitung ulang secara instan berkat caching reaktif `computed`**.
2. **Komposisi Deklaratif**: Pemfilteran tahapan pipeline dan pembaruan data terikat rapi melalui `v-model` dan dynamic bindings, tanpa satupun instruksi DOM manual.
3. **Kesiapan Integrasi Backend**: Struktur data `leads` dirancang modular sehingga mudah dihubungkan dengan Pinia Store, API Fetching, dan WebSocket untuk pembaruan multi-user secara real-time.

### Langkah Berikutnya: Svelte & Framework Lainnya
Dengan menyelesaikan track Vue 3 ini, Anda telah menguasai salah satu framework frontend paling elegan dan dicintai di dunia. Anda sekarang siap melanjutkan ke Svelte atau memperluas ke backend!""",
        'explanationEn': """### Capstone CRM Sales Dashboard Architecture
This capstone integrates the definitive pillars of modern Vue 3 engineering:
1. **Pure Reactivity & Performance**: When a deal stage transitions (e.g. NEGOSIASI to DEAL), all high-level business analytics (`totalWonDeal`, `totalPipelineValue`, `Win Rate %`) **recalculate instantaneously powered by computed dependency graphs**.
2. **Declarative Composition**: Pipeline stage filters and item updates bind seamlessly via `v-model` and dynamic bindings without manual DOM manipulation.
3. **Enterprise Backend Readiness**: The state architecture easily hooks into Pinia stores, REST/GraphQL endpoints, and WebSocket channels for collaborative multi-user workflows.

### Next Step: Svelte & Lightweight Reactive Frameworks
You have mastered one of the most elegant and developer-friendly frontend frameworks in the world. You are primed to explore Svelte or backend systems!""",
        'beginnerId': """### Analogi: Ruang Kendali Saham & Perdagangan Komoditas
Aplikasi CRM ini seperti ruang kendali bursa komoditas:
1. **Layar Atas (Computed Metrics)** adalah papan skor besar di dinding yang menghitung total nilai transaksi hari ini secara otomatis.
2. **Pipeline List** adalah meja perundingan: setiap kali pialang memindahkan berkas kontrak ke map 'DEAL' (*ganti stage*), papan skor di dinding langsung berbunyi dan menambahkan angka rupiah keuntungan perusahaan tanpa ada jeda.""",
        'beginnerEn': """### Analogy: Commodity Exchange Trading Rooms
This CRM dashboard functions like a commodity exchange trading terminal:
1. **Analytics Header (Computed Metrics)** is the illuminated LED ticker board on the wall calculating gross closed transactions dynamically.
2. **Pipeline Rows** are negotiating desks: whenever a broker stamps an agreement "DEAL" (*stage mutation*), the wall ticker beeps and updates corporate cash registers in sub-second time.""",
        'experimentsId': [
            'Ubah stage salah satu lead menjadi DEAL dan perhatikan Closed Won Revenue di pojok kanan atas bertambah instan.',
            'Gunakan dropdown Filter Tahap untuk melihat hanya lead yang berada di tahap NEGOSIASI.',
            'Hapus salah satu lead dan amati total nilai pipeline dan persentase win rate otomatis menyesuaikan.',
            'Hubungkan komponen ini dengan Pinia usePipelineStore yang sudah dibuat di materi Minggu 6.',
        ],
        'experimentsEn': [
            'Change a lead stage to DEAL to observe Closed Won Revenue jump instantaneously.',
            'Filter pipeline stages by NEGOSIASI to inspect targeted stage filtering.',
            'Delete a lead row to observe total pipeline values and conversion win rates recalculate automatically.',
            'Wire this view directly to the Pinia usePipelineStore constructed in Week 6.',
        ],
        'challengeId': 'Tambahkan form modal kecil dengan `<Teleport to="body">` yang memungkinkan pengguna menambahkan prospek klien baru lengkap dengan validasi nama dan nominal.',
        'challengeEn': 'Integrate a `<Teleport to="body">` modal dialog enabling sales reps to register fresh client leads equipped with field validations.',
        'summaryId': 'Selamat! Kamu telah menyelesaikan seluruh kurikulum Vue 3 Composition API dari nol hingga membangun Enterprise CRM Dashboard yang kaya fitur dan berkinerja tinggi.',
        'summaryEn': 'Congratulations! You have completed the comprehensive Vue 3 curriculum, culminating in a feature-rich, high-performance Enterprise CRM Sales Dashboard.',
    },
]

def get_track():
    return {
        'slug': 'vue',
        'track_name': 'Vue',
        'levels': LEVELS,
        'modules': MODULES,
    }
