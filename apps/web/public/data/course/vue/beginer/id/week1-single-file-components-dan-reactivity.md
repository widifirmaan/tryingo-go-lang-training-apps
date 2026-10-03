# Vue 3 Single File Components (.vue): <script setup>, ref vs reactive

> **Kategori:** Vue | **Level:** Composition API, Reaktivitas & Komponen | **Minggu 1:** Vue 3 Single File Components (.vue): <script setup>, ref vs reactive

## Tujuan Pembelajaran

- Memahami filosofi Single File Components (.vue) yang menyatukan template, script, dan style
- Menguasai sintaks modern Vue 3 <script setup> tanpa boilerplate export default
- Membedakan kapan menggunakan ref() (primitif, .value) vs reactive() (objek bersarang)
- Menggunakan Template Directives: v-bind (:), v-on (@), dan v-model
- Mengisolasi gaya CSS menggunakan atribut scoped untuk mencegah kebocoran styling global

---

## Program: Kartu Calon Pelanggan (CRM Lead Card) Reaktif

```vue
<script setup>
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
```

---

## Konsep Kunci

### Mengapa Vue 3 Composition API dengan `<script setup>`?
Di Vue 2 (Options API), kode dipecah ke dalam opsi terpisah (`data`, `methods`, `computed`, `watch`). Ketika komponen membesar hingga 500 baris, logika untuk satu fitur (misalnya fitur keranjang belanja) tersebar di 4 tempat berbeda.
Dengan **Composition API (`<script setup>`)**:
1. Anda mengelompokkan kode berdasarkan **fitur logika**, bukan berdasarkan opsi struktur.
2. Tidak perlu kata kunci `this` yang membingungkan.
3. Kinerja kompilasi lebih cepat dan dukungan TypeScript yang sempurna.

### Memahami `ref` vs `reactive`
Sistem reaktivitas Vue 3 ditenagai oleh **JavaScript Proxy**:
- **`ref(initialValue)`**: Membungkus nilai apa saja (angka, string, boolean, objek). Di dalam `<script>`, Anda wajib mengaksesnya via `.value` (`sedangFollowUp.value = true`). Namun di dalam `<template>`, Vue **membongkar (.value) secara otomatis**, sehingga Anda cukup menulis `{{ sedangFollowUp }}`.
- **`reactive(object)`**: Hanya menerima objek/array. Anda tidak perlu menulis `.value` (`lead.status = 'DEAL'`). Namun hati-hati: Anda tidak boleh melakukan destrukturisasi `const { status } = lead` karena reaktivitasnya akan terputus!

---

---

## Penjelasan untuk Pemula

### Analogi: Kartu Nama Pintar & Sensor Alarm Rumah
1. **SFC (.vue)** seperti rumah lengkap: `<template>` adalah ruang tamu (yang dilihat tamu), `<script>` adalah mesin listrik di garasi (logika), dan `<style scoped>` adalah warna cat dinding kamar sendiri yang tidak mencoreti dinding rumah tetangga.
2. **Reaktivitas ref/reactive** seperti termostat pendingin ruangan (AC): begitu suhu ruangan naik 1 derajat (*data berubah*), sensor otomatis menyalakan kompresor dan mengubah tampilan angka di layar remote seketika (*template update otomatis*).

## Eksperimen

- Klik tombol "Tandai Follow-Up" dan perhatikan border kartu berubah biru menyala berkat class binding reaktif.
- Klik tombol "Progres Status" hingga status menjadi DEAL dan buktikan tombol otomatis terkunci (disabled).
- Coba ubah judulKartu tanpa .value di dalam fungsi toggleFollowUp dan amati mengapa reaktivitas gagal.
- Tambahkan input teks dengan v-model="lead.namaPerusahaan" di dalam template dan amati perubahan nama secara instan.

---

## Tantangan

Tambahkan properti `sumberLead` ("WEBSITE" | "REFERRAL" | "COLD_CALL") ke dalam objek reactive `lead`, dan tampilkan ikon unik di samping nama kontak menggunakan direktif `v-if` / `v-else-if`.

---

## Ringkasan

Kamu telah menguasai Single File Components, <script setup>, ref vs reactive, dan template directives. Minggu depan kita mempelajari Computed Properties dan Watchers.
