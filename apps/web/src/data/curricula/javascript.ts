import type { LevelInfo } from '../curriculum';

// JavaScript curriculum — product-driven research-backed structure
export const javascriptCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Dasar Logika & Struktur Data',
    nameEn: 'Logic Fundamentals & Data Structures',
    descId: 'Pondasi logika komputasi: variabel, tipe data, coercion, control flow, fungsi kelas satu, dan transformasi array modern.',
    descEn: 'Computational logic foundations: variables, types, coercion, control flow, first-class functions, and modern array pipelines.',
    weeks: [
      { week: 1, topicId: 'variabel-tipe-data-dan-operator', titleId: 'Variabel Modern (const/let), 7 Tipe Primitif & Type Coercion', titleEn: 'Modern Variables (const/let), 7 Primitive Types & Coercion' },
      { week: 2, topicId: 'kontrol-alur-dan-perulangan', titleId: 'Kontrol Alur: Percabangan Logika, Ternary & Perulangan for...of', titleEn: 'Control Flow: Logic Branching, Ternary & for...of Loops' },
      { week: 3, topicId: 'fungsi-arrow-scope-dan-closures', titleId: 'Fungsi Kelas Satu, Arrow Functions, Scope & Closures', titleEn: 'First-Class Functions, Arrow Syntax, Scope & Closures' },
      { week: 4, topicId: 'array-dan-metode-fungsional', titleId: 'Array Modern: Transformasi Data dengan Map, Filter & Reduce', titleEn: 'Modern Arrays: Functional Pipelines with Map, Filter & Reduce' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'DOM, Event & Arsitektur Objek',
    nameEn: 'DOM, Events & Object Architecture',
    descId: 'Manipulasi dokumen browser langsung, event bubbling/delegation, destrukturisasi objek, dan OOP dengan kelas ES6.',
    descEn: 'Direct browser document mutation, event bubbling/delegation, object destructuring, and ES6 class-based OOP.',
    weeks: [
      { week: 5, topicId: 'objek-destrukturisasi-dan-spread', titleId: 'Objek Modern: Destrukturisasi, Spread/Rest & Optional Chaining', titleEn: 'Modern Objects: Destructuring, Spread/Rest & Optional Chaining' },
      { week: 6, topicId: 'dom-manipulasi-dan-seleksi', titleId: 'Manipulasi DOM: querySelector, Pembuatan Elemen & ClassList', titleEn: 'DOM Manipulation: querySelector, Element Creation & ClassList' },
      { week: 7, topicId: 'event-bubbling-dan-delegation', titleId: 'Arsitektur Event: Event Bubbling, Capturing & Event Delegation', titleEn: 'Event Architecture: Bubbling, Capturing & Event Delegation' },
      { week: 8, topicId: 'oop-dan-es6-classes', titleId: 'Object-Oriented JavaScript: ES6 Classes, Prototype & Pewarisan', titleEn: 'Object-Oriented JavaScript: ES6 Classes, Prototypes & Inheritance' }
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Asinkron, Storage & Proyek Kanban',
    nameEn: 'Asynchronous, Storage & Kanban Project',
    descId: 'Event loop V8, Promises, async/await, Fetch API, penyimpanan lokal persistent, dan capstone Kanban board interaktif.',
    descEn: 'V8 event loop, Promises, async/await, Fetch API, persistent local storage, and the interactive Kanban board capstone.',
    weeks: [
      { week: 9, topicId: 'event-loop-dan-asinkron', titleId: 'Arsitektur Asinkron: Event Loop V8, Call Stack & Task Queues', titleEn: 'Asynchronous Architecture: The V8 Event Loop, Stack & Queues' },
      { week: 10, topicId: 'promises-async-await-dan-fetch', titleId: 'Promises, Async/Await & Konsumsi HTTP REST API dengan Fetch', titleEn: 'Promises, Async/Await & HTTP REST API Consumption via Fetch' },
      { week: 11, topicId: 'browser-storage-dan-state-persistence', titleId: 'Penyimpanan Browser: LocalStorage, SessionStorage & Serialisasi JSON', titleEn: 'Browser Storage: LocalStorage, SessionStorage & JSON Persistence' },
      { week: 12, topicId: 'proyek-akhir-kanban-board-lengkap', titleId: 'Proyek Akhir: Aplikasi Papan Tugas Kanban Interaktif Lengkap', titleEn: 'Capstone Project: Full Interactive Kanban Task Management Board' }
    ],
  }
];
