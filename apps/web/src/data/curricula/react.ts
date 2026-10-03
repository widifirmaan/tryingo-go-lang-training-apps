import type { LevelInfo } from '../curriculum';

// React curriculum — product-driven research-backed structure
export const reactCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Pondasi Komponen, JSX & State',
    nameEn: 'Component Foundations, JSX & State',
    descId: 'Paradigma deklaratif React: JSX, props unidirectional data flow, useState, list reconciliation, dan controlled forms.',
    descEn: 'React declarative paradigm: JSX, unidirectional props flow, useState, list reconciliation, and controlled forms.',
    weeks: [
      { week: 1, topicId: 'komponen-jsx-dan-props', titleId: 'Arsitektur Komponen, Aturan JSX & Unidirectional Data Flow via Props', titleEn: 'Component Architecture, JSX Rules & Unidirectional Data Flow via Props' },
      { week: 2, topicId: 'state-usestate-dan-event-handling', titleId: 'Reaktivitas State: useState, Immutability & Lifting State Up', titleEn: 'State Reactivity: useState, Immutability & Lifting State Up' },
      { week: 3, topicId: 'render-list-dan-keys', titleId: 'Iterasi List, Algoritma Rekonsiliasi & Bahaya Menggunakan Index Sebagai Key', titleEn: 'List Iteration, Reconciliation & The Danger of Index as Key' },
      { week: 4, topicId: 'form-controlled-dan-uncontrolled', titleId: 'Form Handling: Controlled Components, Validasi Real-Time & useRef', titleEn: 'Form Handling: Controlled Components, Real-Time Validation & useRef' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Side Effects, Context & Arsitektur Reducer',
    nameEn: 'Side Effects, Context & Reducer Architecture',
    descId: 'Siklus hidup reaktif: useEffect dengan cleanup dan abort controller, Context API tanpa prop drilling, dan useReducer state machine.',
    descEn: 'Reactive lifecycle: useEffect with cleanup and abort controllers, Context API without prop drilling, and useReducer state machines.',
    weeks: [
      { week: 5, topicId: 'useeffect-dan-lifecycle', titleId: 'useEffect: Siklus Hidup Reaktif, Cleanup Function & AbortController', titleEn: 'useEffect: Reactive Lifecycles, Cleanup Functions & AbortController' },
      { week: 6, topicId: 'usecontext-dan-state-management', titleId: 'Context API: Mengatasi Prop Drilling & Arsitektur State Terdistribusi', titleEn: 'Context API: Eliminating Prop Drilling & Distributed State Architecture' },
      { week: 7, topicId: 'usereducer-dan-complex-state', titleId: 'useReducer: Arsitektur State Machine & Transisi Terprediksi', titleEn: 'useReducer: State Machine Architecture & Predictable Transitions' }
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Optimasi Performa, Custom Hooks & Capstone Editor',
    nameEn: 'Performance Optimization, Custom Hooks & Capstone Editor',
    descId: 'Memoization mendalam (useMemo/useCallback/memo), pembuatan custom hooks reusable, dan proyek capstone Notion-style Block Editor.',
    descEn: 'Deep memoization (useMemo/useCallback/memo), authoring reusable custom hooks, and the Notion-style Block Editor capstone.',
    weeks: [
      { week: 8, topicId: 'optimasi-usememo-usecallback-memo', titleId: 'Optimasi Performa: React.memo, useMemo, useCallback & Profiling', titleEn: 'Performance Optimization: React.memo, useMemo, useCallback & Profiling' },
      { week: 9, topicId: 'custom-hooks-dan-patterns', titleId: 'Custom Hooks Modern: Enkapsulasi Logika Reusable & Compound Components', titleEn: 'Modern Custom Hooks: Reusable Logic Encapsulation & Compound Components' },
      { week: 10, topicId: 'capstone-notion-block-workspace', titleId: 'Capstone: Editor Dokumen Modular Notion-Style & Ruang Kerja Terdistribusi', titleEn: 'Capstone: Modular Notion-Style Block Document Editor & Workspace' }
    ],
  }
];
