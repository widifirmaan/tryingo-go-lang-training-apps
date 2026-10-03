# Capstone: Enterprise CRM Sales Pipeline & Lead Management Dashboard

> **Kategori:** Vue | **Level:** Advanced Slots, Animations, Optimization & CRM Capstone | **Minggu 10:** Capstone: Enterprise CRM Sales Pipeline & Lead Management Dashboard

## Learning Objectives

- Synthesize the comprehensive Vue 3 curriculum into an enterprise-grade production CRM application
- Manage dynamic sales pipeline workflows with reactive transitions and computed business metrics
- Compute financial analytics in real-time (Closed Won Revenue, Total Pipeline, Conversion Win Rate)
- Deliver a modular, responsive architecture engineered for enterprise REST and GraphQL APIs
- Demonstrate mastery of modern, maintainable Vue 3 frontend engineering standards

---

## Program: Full-Feature CRM Sales Dashboard with Stage Dragging, Pinia & Real-Time Analytics

```vue
<!-- ===================================================================== -->
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
```

---

## Key Concepts

### Capstone CRM Sales Dashboard Architecture
This capstone integrates the definitive pillars of modern Vue 3 engineering:
1. **Pure Reactivity & Performance**: When a deal stage transitions (e.g. NEGOSIASI to DEAL), all high-level business analytics (`totalWonDeal`, `totalPipelineValue`, `Win Rate %`) **recalculate instantaneously powered by computed dependency graphs**.
2. **Declarative Composition**: Pipeline stage filters and item updates bind seamlessly via `v-model` and dynamic bindings without manual DOM manipulation.
3. **Enterprise Backend Readiness**: The state architecture easily hooks into Pinia stores, REST/GraphQL endpoints, and WebSocket channels for collaborative multi-user workflows.

### Next Step: Svelte & Lightweight Reactive Frameworks
You have mastered one of the most elegant and developer-friendly frontend frameworks in the world. You are primed to explore Svelte or backend systems!

---

---

## Beginner Friendly Explanation

### Analogy: Commodity Exchange Trading Rooms
This CRM dashboard functions like a commodity exchange trading terminal:
1. **Analytics Header (Computed Metrics)** is the illuminated LED ticker board on the wall calculating gross closed transactions dynamically.
2. **Pipeline Rows** are negotiating desks: whenever a broker stamps an agreement "DEAL" (*stage mutation*), the wall ticker beeps and updates corporate cash registers in sub-second time.

## Experiments

- Change a lead stage to DEAL to observe Closed Won Revenue jump instantaneously.
- Filter pipeline stages by NEGOSIASI to inspect targeted stage filtering.
- Delete a lead row to observe total pipeline values and conversion win rates recalculate automatically.
- Wire this view directly to the Pinia usePipelineStore constructed in Week 6.

---

## Challenge

Integrate a `<Teleport to="body">` modal dialog enabling sales reps to register fresh client leads equipped with field validations.

---

## Summary

Congratulations! You have completed the comprehensive Vue 3 curriculum, culminating in a feature-rich, high-performance Enterprise CRM Sales Dashboard.
