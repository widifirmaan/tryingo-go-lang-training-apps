import type { LevelInfo } from '../curriculum';

// Svelte curriculum — product-driven research-backed structure
export const svelteCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Svelte 5 Runes & Reaktivitas Kompilasi',
    nameEn: 'Svelte 5 Runes & Compiler Reactivity',
    descId: 'Revolusi Svelte 5: Tanpa Virtual DOM, Runes ($state, $derived, $effect), $props modern, snippets, dan kontrol alur.',
    descEn: 'The Svelte 5 revolution: Zero Virtual DOM, Runes ($state, $derived, $effect), modern $props, snippets, and control flow.',
    weeks: [
      { week: 1, topicId: 'svelte-5-runes-dan-state', titleId: 'Svelte 5 Runes: Arsitektur Tanpa Virtual DOM & $state Reaktif', titleEn: 'Svelte 5 Runes: Zero-Virtual DOM Architecture & Reactive $state' },
      { week: 2, topicId: 'derived-dan-effect-runes', titleId: 'Svelte 5 Runes: $derived untuk Nilai Turunan & $effect untuk Efek Samping', titleEn: 'Svelte 5 Runes: $derived Computations & $effect Side Effects' },
      { week: 3, topicId: 'props-dan-event-modern', titleId: 'Svelte 5 Komponen Modern: $props, Nilai Default & Callback Functions', titleEn: 'Modern Svelte 5 Components: $props, Fallbacks & Callback Functions' },
      { week: 4, topicId: 'snippets-dan-kontrol-alur', titleId: 'Snippets ({#snippet}), {@render} & Blok Kontrol ({#if}, {#each}, {#await})', titleEn: 'Snippets ({#snippet}), {@render} & Control Flow ({#if}, {#each}, {#await})' }
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Web Audio, Actions & Capstone Synthesizer',
    nameEn: 'Web Audio, Actions & Synthesizer Capstone',
    descId: 'Svelte Actions (use:action), modul .svelte.js, integrasi Web Audio API berkecepatan tinggi, dan capstone 16-step beat sequencer.',
    descEn: 'Svelte Actions (use:action), .svelte.js modules, high-performance Web Audio API, and the 16-step beat sequencer capstone.',
    weeks: [
      { week: 5, topicId: 'actions-dan-transisi-dom', titleId: 'Svelte Actions (use:action): Manipulasi DOM Tingkat Rendah & Rotary Knob Dial', titleEn: 'Svelte Actions (use:action): Low-Level DOM Lifecycle & Rotary Knob Controls' },
      { week: 6, topicId: 'context-dan-universal-reactivity', titleId: 'Svelte 5 Universal Reactivity: Modul .svelte.js & Context API (setContext/getContext)', titleEn: 'Svelte 5 Universal Reactivity: .svelte.js Modules & Context API' },
      { week: 7, topicId: 'web-audio-api-dan-performance', titleId: 'Web Audio API: AudioContext, OscillatorNode, GainNode & Timing Scheduling', titleEn: 'Web Audio API: AudioContext, OscillatorNode, GainNode & Sample-Accurate Timing' },
      { week: 8, topicId: 'capstone-audio-beat-sequencer', titleId: 'Capstone: 16-Step Audio Beat Sequencer & Synthesizer dengan Svelte 5 Runes', titleEn: 'Capstone: Production 16-Step Audio Beat Sequencer & Synthesizer with Svelte 5' }
    ],
  }
];
