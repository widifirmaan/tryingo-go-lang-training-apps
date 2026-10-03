import type { LevelInfo } from '../curriculum';

// Vue curriculum — product-driven research-backed structure
export const vueCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Composition API, Reaktivitas & Komponen',
    nameEn: 'Composition API, Reactivity & Components',
    descId: 'Vue 3 modern: Single File Components (.vue), <script setup>, ref vs reactive, computed, watchers, dan komunikasi props/emit.',
    descEn: 'Modern Vue 3: Single File Components (.vue), <script setup>, ref vs reactive, computed, watchers, and props/emit communication.',
    weeks: [
      { week: 1, topicId: 'single-file-components-dan-reactivity', titleId: 'Vue 3 Single File Components (.vue): <script setup>, ref vs reactive', titleEn: 'Vue 3 Single File Components (.vue): <script setup>, ref vs reactive' },
      { week: 2, topicId: 'computed-dan-watchers', titleId: 'Computed Properties: Caching Pintar, watch & watchEffect untuk Efek Samping', titleEn: 'Computed Properties: Intelligent Caching, watch & watchEffect for Side Effects' },
      { week: 3, topicId: 'props-emits-dan-v-model', titleId: 'Komunikasi Komponen: defineProps, defineEmits & Custom v-model Binding', titleEn: 'Component Communication: defineProps, defineEmits & Custom v-model' },
      { week: 4, topicId: 'lifecycle-hooks-dan-template-refs', titleId: 'Lifecycle Hooks: onMounted, onUnmounted & Template Refs (useTemplateRef)', titleEn: 'Lifecycle Hooks: onMounted, onUnmounted & Template Refs (useTemplateRef)' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Composables, Pinia & Vue Router',
    nameEn: 'Composables, Pinia & Vue Router',
    descId: 'Ekstraksi logika reusable dengan Composables kustom, manajemen state terpusat dengan Pinia, dan Vue Router 4 dengan route guards.',
    descEn: 'Reusable logic extraction with custom Composables, centralized state via Pinia, and Vue Router 4 with navigation guards.',
    weeks: [
      { week: 5, topicId: 'composables-dan-reusability', titleId: 'Composables Modern: Ekstraksi Logika Ber-State Reusable (useSalesLeads)', titleEn: 'Modern Composables: Stateful Reusable Logic Extraction (useSalesLeads)' },
      { week: 6, topicId: 'pinia-state-management', titleId: 'Pinia: Manajemen State Global Modern, Actions, Getters & Store DevTools', titleEn: 'Pinia: Modern Global State Management, Actions, Getters & DevTools' },
      { week: 7, topicId: 'vue-router-dan-navigation-guards', titleId: 'Vue Router 4: Dynamic Routes, Nested Routes & Navigation Guards (beforeEach)', titleEn: 'Vue Router 4: Dynamic Routes, Nested Routes & Navigation Guards (beforeEach)' }
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Slots Lanjut, Animasi, Optimasi & Capstone CRM',
    nameEn: 'Advanced Slots, Animations, Optimization & CRM Capstone',
    descId: 'Scoped slots, <Teleport>, animasi <TransitionGroup>, optimasi shallowRef, dan proyek dashboard CRM enterprise interaktif.',
    descEn: 'Scoped slots, <Teleport>, <TransitionGroup> animations, shallowRef tuning, and the interactive enterprise CRM dashboard capstone.',
    weeks: [
      { week: 8, topicId: 'slots-dan-dynamic-components', titleId: 'Komponen Tingkat Lanjut: Scoped Slots, Dinamis (<component :is>) & KeepAlive', titleEn: 'Advanced Components: Scoped Slots, Dynamic Components & KeepAlive' },
      { week: 9, topicId: 'teleport-transition-dan-optimasi', titleId: 'Teleport Modal, Animasi <TransitionGroup> & Optimasi (shallowRef)', titleEn: 'Teleport Modals, <TransitionGroup> Animations & shallowRef Tuning' },
      { week: 10, topicId: 'capstone-enterprise-crm-dashboard', titleId: 'Capstone: Dashboard CRM Enterprise & Pipeline Penjualan Interaktif', titleEn: 'Capstone: Enterprise CRM Sales Pipeline & Lead Management Dashboard' }
    ],
  }
];
