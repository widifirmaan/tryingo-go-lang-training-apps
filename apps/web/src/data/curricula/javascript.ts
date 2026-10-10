import type { LevelInfo } from '../curriculum';

export const javascriptCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Dasar JavaScript & Logika',
    nameEn: 'JavaScript Basics & Logic',
    descId: 'Sintaks JavaScript, variabel, tipe data primitif, percabangan kondisi, perulangan, dan fungsi.',
    descEn: 'JavaScript syntax, variables, primitive types, conditional branching, loops, and functions.',
    weeks: [
      { week: 1, topicId: 'pengenalan-dan-lingkungan-eksekusi', titleId: 'Pengenalan JavaScript, Console, dan Lingkungan Eksekusi', titleEn: 'JavaScript Introduction, Console, and Execution Environments' },
      { week: 2, topicId: 'variabel-tipe-data-operator', titleId: 'Variabel, Tipe Data, dan Operator', titleEn: 'Variables, Data Types, and Operators' },
      { week: 3, topicId: 'percabangan-dan-kondisi', titleId: 'Percabangan dan Pengambilan Keputusan', titleEn: 'Conditionals and Decision Making' },
      { week: 4, topicId: 'perulangan-dan-iterasi', titleId: 'Perulangan dan Iterasi Data', titleEn: 'Loops and Data Iteration' },
      { week: 5, topicId: 'fungsi-parameter-dan-scope', titleId: 'Fungsi, Parameter, dan Scope', titleEn: 'Functions, Parameters, and Scope' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Struktur Data & Interaksi DOM',
    nameEn: 'Data Structures & DOM Interaction',
    descId: 'Manipulasi array, objek literal, seleksi elemen DOM, manipulasi tampilan, dan penanganan event.',
    descEn: 'Array methods, object literals, DOM element selection, UI mutation, and event handling.',
    weeks: [
      { week: 6, topicId: 'array-dan-metode-manipulasi', titleId: 'Array dan Metode Manipulasi Data', titleEn: 'Arrays and Data Manipulation Methods' },
      { week: 7, topicId: 'objek-destrukturisasi-dan-json', titleId: 'Objek, Destrukturisasi, dan JSON', titleEn: 'Objects, Destructuring, and JSON' },
      { week: 8, topicId: 'manipulasi-dom-dan-seleksi', titleId: 'Manipulasi DOM dan Seleksi Elemen', titleEn: 'DOM Manipulation and Element Selection' },
      { week: 9, topicId: 'event-handling-dan-formulir', titleId: 'Event Handling dan Formulir Interaktif', titleEn: 'Event Handling and Interactive Forms' }
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Asinkron, Storage & Proyek Akhir',
    nameEn: 'Asynchronous, Storage & Final Project',
    descId: 'Timer, Promise, async/await, Fetch API, LocalStorage, modularitas modul, dan proyek aplikasi web utuh.',
    descEn: 'Timers, Promises, async/await, Fetch API, LocalStorage, modules, and full web application project.',
    weeks: [
      { week: 10, topicId: 'pemrograman-asinkron-dan-timer', titleId: 'Pemrograman Asinkron dan Timer', titleEn: 'Asynchronous Programming and Timers' },
      { week: 11, topicId: 'promise-dan-async-await', titleId: 'Promise dan Async/Await', titleEn: 'Promises and Async/Await' },
      { week: 12, topicId: 'fetch-api-dan-http', titleId: 'Fetch API dan HTTP Requests', titleEn: 'Fetch API and HTTP Requests' },
      { week: 13, topicId: 'localstorage-dan-modularitas', titleId: 'LocalStorage dan Modularitas ES Modules', titleEn: 'LocalStorage and ES Modules' },
      { week: 14, topicId: 'proyek-akhir-aplikasi-web', titleId: 'Proyek Akhir: Aplikasi Web Interaktif Lengkap', titleEn: 'Final Project: Complete Interactive Web Application' }
    ],
  }
];
