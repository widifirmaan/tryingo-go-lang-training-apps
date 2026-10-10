export interface VsCodeExtension {
  id: string;
  name: string;
  descriptionId: string;
  descriptionEn: string;
}

export interface OsCommand {
  windows: string;
  macos: string;
  linux: string;
}

export interface QuickStartGuide {
  slug: string;
  name: string;
  category: string;
  badge: string;
  taglineId: string;
  taglineEn: string;
  vscode: {
    recommendedExtensions: VsCodeExtension[];
    cliInstallCommand: string;
  };
  installRuntime: {
    name: string;
    version: string;
    command: OsCommand;
    verifyCommand: string;
    expectedOutput: string;
    tipsId: string;
    tipsEn: string;
  };
  createProject: {
    titleId: string;
    titleEn: string;
    command: string;
    explanationId: string;
    explanationEn: string;
    cdCommand: string;
  };
  runProject: {
    command: string;
    localUrl: string;
    outputNoteId: string;
    outputNoteEn: string;
  };
  projectStructure: {
    tree: string;
    summaryId: string;
    summaryEn: string;
  };
  starterFile: {
    filename: string;
    code: string;
    descriptionId: string;
    descriptionEn: string;
  };
  proTipsId: string[];
  proTipsEn: string[];
}

export const QUICK_START_GUIDES: Record<string, QuickStartGuide> = {
  nextjs: {
    slug: 'nextjs',
    name: 'Next.js',
    category: 'React Framework for Production',
    badge: 'App Router & Turbopack',
    taglineId: 'Panduan setup project Next.js modern dari installasi Node.js, ekstensi VS Code, hingga inisialisasi App Router.',
    taglineEn: 'Complete modern Next.js setup guide: install Node.js, configure VS Code, and scaffold your App Router project.',
    vscode: {
      recommendedExtensions: [
        { id: 'dbaeumer.vscode-eslint', name: 'ESLint', descriptionId: 'Linting kode TypeScript/JavaScript', descriptionEn: 'Code linting for TypeScript/JS' },
        { id: 'esbenp.prettier-vscode', name: 'Prettier', descriptionId: 'Formatter otomatis kode yang rapi', descriptionEn: 'Opinionated code formatter' },
        { id: 'bradlc.vscode-tailwindcss', name: 'Tailwind CSS IntelliSense', descriptionId: 'Autocomplete & highlight class Tailwind', descriptionEn: 'Autocomplete & class preview for Tailwind' },
      ],
      cliInstallCommand: 'code --install-extension dbaeumer.vscode-eslint --install-extension esbenp.prettier-vscode --install-extension bradlc.vscode-tailwindcss',
    },
    installRuntime: {
      name: 'Node.js LTS (v20+ / v22+)',
      version: 'v20.x or v22.x LTS',
      command: {
        windows: 'winget install OpenJS.NodeJS.LTS',
        macos: 'brew install node',
        linux: 'curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt-get install -y nodejs',
      },
      verifyCommand: 'node -v && npm -v',
      expectedOutput: 'v22.x.x\n10.x.x',
      tipsId: 'Gunakan Node.js LTS untuk kestabilan dependensi Turbopack dan build Next.js.',
      tipsEn: 'Always use Node.js LTS for maximum Turbopack stability and build compatibility.',
    },
    createProject: {
      titleId: 'Inisialisasi Project Next.js (App Router + Tailwind)',
      titleEn: 'Initialize Next.js Project (App Router + Tailwind)',
      command: 'npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"',
      explanationId: 'Menjalankan wizard resmi Next.js dengan TypeScript, Tailwind CSS, App Router, dan alias import @/*.',
      explanationEn: 'Runs the official Next.js scaffolder configured with TypeScript, Tailwind CSS, App Router, and alias pathing.',
      cdCommand: 'cd my-app',
    },
    runProject: {
      command: 'npm run dev',
      localUrl: 'http://localhost:3000',
      outputNoteId: 'Buka http://localhost:3000 di browser. Hot Module Replacement (HMR) aktif otomatis.',
      outputNoteEn: 'Open http://localhost:3000 in your browser. Fast Refresh and HMR are enabled out of the box.',
    },
    projectStructure: {
      tree: `my-app/
├── src/
│   └── app/
│       ├── layout.tsx       # Root layout untuk semua halaman
│       ├── page.tsx         # Halaman utama (/)
│       └── globals.css      # Styling global Tailwind
├── public/                  # Aset statis (gambar, icon, fonts)
├── next.config.ts           # Konfigurasi Next.js
├── tailwind.config.ts       # Konfigurasi Tailwind CSS
├── tsconfig.json            # Konfigurasi TypeScript compiler
└── package.json             # Dependensi & skrip npm`,
      summaryId: 'Direktori src/app berisi struktur routing otomatis berdasarkan folder dan file page.tsx.',
      summaryEn: 'The src/app directory uses file-system based routing where each folder maps to a URL route.',
    },
    starterFile: {
      filename: 'src/app/page.tsx',
      code: `export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-zinc-950 text-white">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
          Halo dari Next.js!
        </h1>
        <p className="text-zinc-400 text-sm">
          Project Anda telah aktif dengan App Router, Tailwind CSS, dan TypeScript.
        </p>
        <button className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-sm shadow-lg transition-all">
          Mulai Coding
        </button>
      </div>
    </main>
  );
}`,
      descriptionId: 'File komponen Server Component default untuk halaman utama.',
      descriptionEn: 'Default Server Component for your landing route.',
    },
    proTipsId: [
      'Gunakan Turbopack untuk dev server super cepat: jalankan `npm run dev -- --turbopack`.',
      'Untuk komponen yang membutuhkan interaksi pengguna (state, useEffect, onClick), tambahkan directive `"use client";` di baris pertama file.',
    ],
    proTipsEn: [
      'Enable Turbopack for ultra-fast dev server: run `npm run dev -- --turbopack`.',
      'For interactive components with hooks (useState, onClick), add the `"use client";` directive at the top.',
    ],
  },

  react: {
    slug: 'react',
    name: 'React',
    category: 'Frontend Library',
    badge: 'Vite & TypeScript',
    taglineId: 'Setup cepat aplikasi React Single Page Application (SPA) modern berbasis Vite bundler kilat.',
    taglineEn: 'Fast setup for modern React SPAs powered by Vite, TypeScript, and modern tooling.',
    vscode: {
      recommendedExtensions: [
        { id: 'dbaeumer.vscode-eslint', name: 'ESLint', descriptionId: 'Validasi sintaks & aturan React hooks', descriptionEn: 'Validates React hooks and TS syntax' },
        { id: 'esbenp.prettier-vscode', name: 'Prettier', descriptionId: 'Format kode otomatis', descriptionEn: 'Format code automatically' },
      ],
      cliInstallCommand: 'code --install-extension dbaeumer.vscode-eslint --install-extension esbenp.prettier-vscode',
    },
    installRuntime: {
      name: 'Node.js LTS (v20+)',
      version: 'v20.x or v22.x LTS',
      command: {
        windows: 'winget install OpenJS.NodeJS.LTS',
        macos: 'brew install node',
        linux: 'sudo apt install nodejs npm',
      },
      verifyCommand: 'node -v && npm -v',
      expectedOutput: 'v20.x.x\n10.x.x',
      tipsId: 'Node.js dibutuhkan untuk menjalankan Vite build tool.',
      tipsEn: 'Node.js powers Vite and npm package management.',
    },
    createProject: {
      titleId: 'Inisialisasi Project React + Vite',
      titleEn: 'Initialize React + Vite Project',
      command: 'npm create vite@latest my-react-app -- --template react-ts\ncd my-react-app\nnpm install',
      explanationId: 'Membuat starter template React TypeScript resmi dari tim Vite dengan HMR ultra cepat.',
      explanationEn: 'Scaffolds an official Vite React TypeScript template with near-instant HMR.',
      cdCommand: 'cd my-react-app',
    },
    runProject: {
      command: 'npm run dev',
      localUrl: 'http://localhost:5173',
      outputNoteId: 'Vite akan meluncurkan server lokal di port 5173 dalam milidetik.',
      outputNoteEn: 'Vite starts your local development server at port 5173 in milliseconds.',
    },
    projectStructure: {
      tree: `my-react-app/
├── src/
│   ├── App.tsx          # Komponen root aplikasi
│   ├── main.tsx         # Entrypoint React DOM render
│   ├── App.css          # Styling komponen
│   └── index.css        # Styling dasar
├── index.html           # File HTML utama (root SPA)
├── vite.config.ts       # Konfigurasi plugin Vite
├── tsconfig.json        # Konfigurasi TypeScript
└── package.json         # Dependensi project`,
      summaryId: 'index.html terletak di root direktori karena Vite memprosesnya langsung sebagai entry point.',
      summaryEn: 'index.html lives in the root directory and serves as the direct entry point for Vite.',
    },
    starterFile: {
      filename: 'src/App.tsx',
      code: `import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center', padding: '4rem', fontFamily: 'sans-serif' }}>
      <h1>🚀 React + Vite App</h1>
      <p>Klik tombol di bawah untuk menguji state reaktif:</p>
      <button 
        onClick={() => setCount((c) => c + 1)}
        style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', cursor: 'pointer', borderRadius: '8px' }}
      >
        Hitungan: {count}
      </button>
    </div>
  );
}`,
      descriptionId: 'Komponen counter interaktif untuk memverifikasi React state.',
      descriptionEn: 'Interactive counter component to test React state reactivity.',
    },
    proTipsId: [
      'Gunakan Tailwind CSS untuk styling cepat: `npm install -D tailwindcss @tailwindcss/vite`.',
      'Untuk routing halaman, install React Router: `npm i react-router-dom`.',
    ],
    proTipsEn: [
      'Add Tailwind CSS quickly via: `npm install -D tailwindcss @tailwindcss/vite`.',
      'For multi-page routing, install React Router: `npm i react-router-dom`.',
    ],
  },

  vue: {
    slug: 'vue',
    name: 'Vue.js',
    category: 'Progressive Framework',
    badge: 'Vue 3 & Composition API',
    taglineId: 'Bangun Single Page Application reaktif dengan Vue 3 Composition API, Single-File Components (.vue), dan Vite.',
    taglineEn: 'Build reactive SPAs with Vue 3 Composition API, Single-File Components, and Vite.',
    vscode: {
      recommendedExtensions: [
        { id: 'vue.volar', name: 'Vue - Official (Volar)', descriptionId: 'Dukungan bahasa, intellisense, & TypeScript untuk .vue', descriptionEn: 'Language support, syntax highlighting, & TS for .vue files' },
        { id: 'dbaeumer.vscode-eslint', name: 'ESLint', descriptionId: 'Linting kode JavaScript/Vue', descriptionEn: 'Code linting for Vue files' },
      ],
      cliInstallCommand: 'code --install-extension vue.volar --install-extension dbaeumer.vscode-eslint',
    },
    installRuntime: {
      name: 'Node.js LTS (v20+)',
      version: 'v20.x or v22.x LTS',
      command: {
        windows: 'winget install OpenJS.NodeJS.LTS',
        macos: 'brew install node',
        linux: 'sudo apt install nodejs npm',
      },
      verifyCommand: 'node -v && npm -v',
      expectedOutput: 'v20.x.x\n10.x.x',
      tipsId: 'Ekstensi Volar akan mengambil alih TypeScript server untuk mendeteksi tipe dalam template SFC.',
      tipsEn: 'Volar powers the TypeScript language server inside Vue Single-File Components.',
    },
    createProject: {
      titleId: 'Inisialisasi Project Vue Resmi (create-vue)',
      titleEn: 'Initialize Official Vue Project (create-vue)',
      command: 'npm create vue@latest my-vue-app\ncd my-vue-app\nnpm install',
      explanationId: 'Menjalankan generator resmi Vue CLI untuk memilih TypeScript, Vue Router, Pinia, dan ESLint.',
      explanationEn: 'Interactive scaffolder to configure TypeScript, Vue Router, Pinia state management, and ESLint.',
      cdCommand: 'cd my-vue-app',
    },
    runProject: {
      command: 'npm run dev',
      localUrl: 'http://localhost:5173',
      outputNoteId: 'Buka http://localhost:5173 untuk melihat aplikasi Vue aktif.',
      outputNoteEn: 'Open http://localhost:5173 to view your running Vue application.',
    },
    projectStructure: {
      tree: `my-vue-app/
├── src/
│   ├── assets/          # Logo dan gambar
│   ├── components/      # Komponen Vue reusable
│   ├── App.vue          # Root Single-File Component
│   └── main.ts          # Mount instance Vue ke DOM
├── index.html           # Shell HTML utama
├── vite.config.ts       # Vite config dengan plugin @vitejs/plugin-vue
└── package.json         # Dependensi Vue 3 & Pinia`,
      summaryId: 'File .vue menggabungkan <template>, <script setup>, dan <style scoped> dalam satu file.',
      summaryEn: '.vue files bundle <template>, <script setup>, and <style scoped> in a single cohesive unit.',
    },
    starterFile: {
      filename: 'src/App.vue',
      code: `<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
const title = 'Halo dari Vue 3 & Composition API!';
</script>

<template>
  <main class="container">
    <h1>{{ title }}</h1>
    <button @click="count++">
      Ditekan: {{ count }} kali
    </button>
  </main>
</template>

<style scoped>
.container {
  text-align: center;
  padding: 4rem;
  font-family: system-ui, sans-serif;
}
button {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  background-color: #42b883;
  color: white;
  border: none;
  font-weight: bold;
}
</style>`,
      descriptionId: 'Komponen SFC Vue 3 dengan <script setup> dan reactive ref().',
      descriptionEn: 'Vue 3 SFC using modern <script setup> and reactive ref().',
    },
    proTipsId: [
      'Gunakan `ref()` untuk tipe primitif (angka, boolean, string) dan `reactive()` untuk objek.',
      'Gunakan Pinia (`npm i pinia`) sebagai store global resmi pengganti Vuex.',
    ],
    proTipsEn: [
      'Prefer `ref()` for primitives and `reactive()` for complex object states.',
      'Use Pinia as the official modern store management library over Vuex.',
    ],
  },

  svelte: {
    slug: 'svelte',
    name: 'Svelte',
    category: 'Compiled UI Framework',
    badge: 'Svelte 5 Runes & SvelteKit',
    taglineId: 'Framework kompilasi tanpa virtual DOM yang mengubah kode menjadi vanilla JavaScript efisien tinggi.',
    taglineEn: 'Compiler-based UI framework that turns components into highly efficient vanilla JavaScript with zero virtual DOM overhead.',
    vscode: {
      recommendedExtensions: [
        { id: 'svelte.svelte-vscode', name: 'Svelte for VS Code', descriptionId: 'Syntax highlighting, autocomplete & diagnostics file .svelte', descriptionEn: 'Language support and diagnostics for .svelte files' },
      ],
      cliInstallCommand: 'code --install-extension svelte.svelte-vscode',
    },
    installRuntime: {
      name: 'Node.js LTS (v20+)',
      version: 'v20.x or v22.x LTS',
      command: {
        windows: 'winget install OpenJS.NodeJS.LTS',
        macos: 'brew install node',
        linux: 'sudo apt install nodejs npm',
      },
      verifyCommand: 'node -v && npm -v',
      expectedOutput: 'v20.x.x\n10.x.x',
      tipsId: 'Node.js digunakan untuk proses compile Svelte dan Vite bundler.',
      tipsEn: 'Node.js runs the Svelte compiler and Vite development server.',
    },
    createProject: {
      titleId: 'Inisialisasi Project SvelteKit',
      titleEn: 'Initialize SvelteKit Project',
      command: 'npm create svelte@latest my-svelte-app\ncd my-svelte-app\nnpm install',
      explanationId: 'Pilih opsi "Skeleton project" dengan TypeScript untuk memulai project dasar yang bersih.',
      explanationEn: 'Select "Skeleton project" with TypeScript for a minimal, clean starter structure.',
      cdCommand: 'cd my-svelte-app',
    },
    runProject: {
      command: 'npm run dev',
      localUrl: 'http://localhost:5173',
      outputNoteId: 'Server SvelteKit akan berjalan di http://localhost:5173.',
      outputNoteEn: 'SvelteKit dev server runs at http://localhost:5173.',
    },
    projectStructure: {
      tree: `my-svelte-app/
├── src/
│   ├── routes/
│   │   ├── +page.svelte     # Halaman utama (/)
│   │   └── +layout.svelte   # Layout pembungkus
│   └── app.html             # Template HTML dasar
├── svelte.config.js         # Konfigurasi adapter Svelte
├── vite.config.ts           # Konfigurasi bundler Vite
└── package.json             # Dependensi project`,
      summaryId: 'SvelteKit menggunakan struktur folder src/routes untuk routing berbasis file.',
      summaryEn: 'SvelteKit maps files inside src/routes directly to HTTP URL routes.',
    },
    starterFile: {
      filename: 'src/routes/+page.svelte',
      code: `<script lang="ts">
  let count = $state(0);
</script>

<main style="text-align: center; padding: 4rem; font-family: system-ui;">
  <h1 style="color: #ff3e00;">✨ Halo dari Svelte 5!</h1>
  <p>Reaktivitas menggunakan Runes ($state):</p>
  <button on:click={() => count++} style="padding: 10px 20px; font-size: 16px; border-radius: 8px;">
    Klik Counter: {count}
  </button>
</main>`,
      descriptionId: 'Komponen Svelte 5 dengan rune $state() modern.',
      descriptionEn: 'Svelte 5 component utilizing the modern $state() rune.',
    },
    proTipsId: [
      'Svelte 5 menggunakan Runes (`$state`, `$derived`, `$effect`) menggantikan deklarasi `let` reaktif lama.',
      'SvelteKit menyediakan adapter untuk deploy langsung ke Cloudflare Pages, Vercel, atau Node.js.',
    ],
    proTipsEn: [
      'Svelte 5 introduces Runes (`$state`, `$derived`, `$effect`) for explicit, clean reactivity.',
      'SvelteKit includes adapters for direct deployment to Cloudflare Pages, Vercel, or Node.',
    ],
  },

  angular: {
    slug: 'angular',
    name: 'Angular',
    category: 'Enterprise Web Platform',
    badge: 'Signals & Standalone Components',
    taglineId: 'Platform enterprise lengkap dengan dependency injection, Signals reactivity, routing, dan HttpClient terintegrasi.',
    taglineEn: 'Complete enterprise web platform featuring dependency injection, Angular Signals, and built-in routing.',
    vscode: {
      recommendedExtensions: [
        { id: 'angular.ng-template', name: 'Angular Language Service', descriptionId: 'IntelliSense untuk template HTML Angular', descriptionEn: 'Template syntax autocomplete and diagnostics' },
      ],
      cliInstallCommand: 'code --install-extension angular.ng-template',
    },
    installRuntime: {
      name: 'Node.js LTS (v20+)',
      version: 'v20.x or v22.x LTS',
      command: {
        windows: 'winget install OpenJS.NodeJS.LTS',
        macos: 'brew install node',
        linux: 'sudo apt install nodejs npm',
      },
      verifyCommand: 'node -v && npm -v',
      expectedOutput: 'v20.x.x\n10.x.x',
      tipsId: 'Angular CLI membutuhkan versi Node.js LTS terbaru.',
      tipsEn: 'The Angular CLI requires the latest Node.js LTS release.',
    },
    createProject: {
      titleId: 'Inisialisasi Project Angular CLI Modern',
      titleEn: 'Initialize Modern Angular CLI Project',
      command: 'npx @angular/cli@latest new my-angular-app --routing --style=css --ssr=false\ncd my-angular-app',
      explanationId: 'Menghasilkan project Angular modern dengan Standalone Components (tanpa NgModule) dan routing.',
      explanationEn: 'Generates a modern Angular application using standalone components and client routing.',
      cdCommand: 'cd my-angular-app',
    },
    runProject: {
      command: 'npm start',
      localUrl: 'http://localhost:4200',
      outputNoteId: 'Server Angular dev berjalan secara default di port 4200.',
      outputNoteEn: 'Angular dev server runs by default on port 4200.',
    },
    projectStructure: {
      tree: `my-angular-app/
├── src/
│   ├── app/
│   │   ├── app.component.ts     # Root component standalone
│   │   ├── app.component.html   # Template HTML
│   │   ├── app.component.css    # Style spesifik
│   │   └── app.routes.ts        # Definisi route
│   ├── index.html               # Shell HTML
│   └── main.ts                  # Bootstrap Application
├── angular.json                 # Konfigurasi build Angular
└── package.json                 # Dependensi @angular/*`,
      summaryId: 'Angular versi terbaru mengadopsi Standalone Components sehingga tidak lagi memerlukan app.module.ts.',
      summaryEn: 'Modern Angular defaults to Standalone Components, eliminating boilerplate NgModules.',
    },
    starterFile: {
      filename: 'src/app/app.component.ts',
      code: `import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: \`
    <div style="text-align: center; padding: 3rem; font-family: system-ui;">
      <h1 style="color: #dd0031;">🅰️ Halo dari Angular!</h1>
      <p>Menggunakan Angular Signal untuk reaktivitas:</p>
      <button (click)="increment()" style="padding: 10px 20px; font-size: 16px;">
        Hitungan Signal: {{ count() }}
      </button>
    </div>
  \`,
})
export class AppComponent {
  count = signal(0);

  increment() {
    this.count.update(c => c + 1);
  }
}`,
      descriptionId: 'Komponen Standalone dengan Angular Signals (signal()).',
      descriptionEn: 'Standalone Angular component featuring reactive Angular Signals.',
    },
    proTipsId: [
      'Gunakan Signals (`signal()`, `computed()`, `effect()`) untuk performa reaktivitas granular.',
      'Gunakan control flow syntax baru seperti `@if`, `@for`, dan `@switch` di template.',
    ],
    proTipsEn: [
      'Use Angular Signals (`signal()`, `computed()`) for fine-grained reactivity without Zone.js overhead.',
      'Take advantage of new template control flow syntax (`@if`, `@for`, `@switch`).',
    ],
  },

  nestjs: {
    slug: 'nestjs',
    name: 'Nest.js',
    category: 'Progressive Node.js Backend',
    badge: 'TypeScript & Enterprise Architecture',
    taglineId: 'Framework backend TypeScript berskala enterprise dengan arsitektur modular, Controller, Provider, dan Dependency Injection.',
    taglineEn: 'Enterprise TypeScript backend framework built on modular architecture, controllers, and dependency injection.',
    vscode: {
      recommendedExtensions: [
        { id: 'firsttris.vscode-jest-runner', name: 'Jest Runner', descriptionId: 'Menjalankan unit test NestJS dengan 1 klik', descriptionEn: 'Run unit & e2e tests right from editor' },
        { id: 'esbenp.prettier-vscode', name: 'Prettier', descriptionId: 'Format kode TypeScript', descriptionEn: 'Prettier code formatting' },
      ],
      cliInstallCommand: 'code --install-extension firsttris.vscode-jest-runner --install-extension esbenp.prettier-vscode',
    },
    installRuntime: {
      name: 'Node.js LTS (v20+)',
      version: 'v20.x or v22.x LTS',
      command: {
        windows: 'winget install OpenJS.NodeJS.LTS',
        macos: 'brew install node',
        linux: 'sudo apt install nodejs npm',
      },
      verifyCommand: 'node -v && npm -v',
      expectedOutput: 'v20.x.x\n10.x.x',
      tipsId: 'NestJS dikompilasi menggunakan TypeScript compiler bawaan atau SWC untuk performa tinggi.',
      tipsEn: 'NestJS compiles via the TypeScript compiler or SWC for high-speed builds.',
    },
    createProject: {
      titleId: 'Inisialisasi Project NestJS Baru',
      titleEn: 'Initialize New NestJS Project',
      command: 'npx @nestjs/cli new my-nest-app --package-manager npm\ncd my-nest-app',
      explanationId: 'Menjalankan CLI NestJS untuk men-generate starter app berstruktur modul, service, dan controller.',
      explanationEn: 'Invokes NestJS CLI to scaffold modular architecture with controllers and services.',
      cdCommand: 'cd my-nest-app',
    },
    runProject: {
      command: 'npm run start:dev',
      localUrl: 'http://localhost:3000',
      outputNoteId: 'Server NestJS aktif dengan auto-reload file watch di port 3000.',
      outputNoteEn: 'NestJS server runs with automatic file-watch reloading at port 3000.',
    },
    projectStructure: {
      tree: `my-nest-app/
├── src/
│   ├── app.controller.ts    # Endpoint HTTP route handler
│   ├── app.service.ts       # Logika bisnis & pengolahan data
│   ├── app.module.ts        # Root module penyusun aplikasi
│   └── main.ts              # Bootstrap entrypoint aplikasi
├── test/                    # End-to-end (e2e) tests
├── tsconfig.json            # Konfigurasi TypeScript & decorators
├── nest-cli.json            # Konfigurasi CLI NestJS
└── package.json             # Dependensi @nestjs/core`,
      summaryId: 'Pemisahan tanggung jawab yang jelas antara Controller (HTTP) dan Service (Bisnis).',
      summaryEn: 'Clean separation of concerns between Controllers (HTTP routing) and Services (business logic).',
    },
    starterFile: {
      filename: 'src/app.controller.ts',
      code: `import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): { status: string; message: string; timestamp: string } {
    return {
      status: 'success',
      message: 'Halo dari Nest.js Enterprise API!',
      timestamp: new Date().toISOString(),
    };
  }
}`,
      descriptionId: 'Controller HTTP dengan decorator @Controller dan @Get.',
      descriptionEn: 'HTTP Controller featuring standard NestJS decorators.',
    },
    proTipsId: [
      'Gunakan perintah CLI `nest g resource users` untuk membuat modul CRUD lengkap otomatis.',
      'Tambahkan `ValidationPipe` global di `main.ts` untuk validasi otomatis DTO berbasis `class-validator`.',
    ],
    proTipsEn: [
      'Use `nest g resource users` to scaffold a complete CRUD module with DTOs in seconds.',
      'Enable global validation using `ValidationPipe` in `main.ts` with `class-validator`.',
    ],
  },

  nodejs: {
    slug: 'nodejs',
    name: 'Node.js',
    category: 'Server-Side JavaScript Runtime',
    badge: 'Express & TypeScript',
    taglineId: 'Runtime JavaScript V8 di server untuk membangun microservices, REST API, dan tool automation.',
    taglineEn: 'V8 server-side JavaScript runtime for building high-performance microservices, REST APIs, and tooling.',
    vscode: {
      recommendedExtensions: [
        { id: 'dbaeumer.vscode-eslint', name: 'ESLint', descriptionId: 'Linting kode JavaScript & Node.js', descriptionEn: 'Code linting for Node.js' },
        { id: 'esbenp.prettier-vscode', name: 'Prettier', descriptionId: 'Formatting konsisten', descriptionEn: 'Consistent code formatting' },
      ],
      cliInstallCommand: 'code --install-extension dbaeumer.vscode-eslint --install-extension esbenp.prettier-vscode',
    },
    installRuntime: {
      name: 'Node.js LTS (v20+ / v22+)',
      version: 'v20.x or v22.x LTS',
      command: {
        windows: 'winget install OpenJS.NodeJS.LTS',
        macos: 'brew install node',
        linux: 'sudo apt install nodejs npm',
      },
      verifyCommand: 'node -v && npm -v',
      expectedOutput: 'v22.x.x\n10.x.x',
      tipsId: 'Node.js sudah menyertakan package manager npm secara otomatis.',
      tipsEn: 'Node.js bundles the npm package manager by default.',
    },
    createProject: {
      titleId: 'Inisialisasi Project Node.js Express + TypeScript',
      titleEn: 'Initialize Node.js Express + TypeScript Project',
      command: 'mkdir my-node-api && cd my-node-api\nnpm init -y\nnpm install express dotenv\nnpm install -D typescript tsx @types/node @types/express\nnpx tsc --init',
      explanationId: 'Membuat project Node.js modern menggunakan TypeScript dan runtime eksekusi instan tsx.',
      explanationEn: 'Sets up a modern Node.js project powered by TypeScript and tsx fast executor.',
      cdCommand: 'cd my-node-api',
    },
    runProject: {
      command: 'npx tsx watch src/index.ts',
      localUrl: 'http://localhost:3000',
      outputNoteId: 'API server aktif dengan fitur watch otomatis setiap file disimpan.',
      outputNoteEn: 'API server runs with live file watching on port 3000.',
    },
    projectStructure: {
      tree: `my-node-api/
├── src/
│   └── index.ts         # Server HTTP Express
├── .env                 # Konfigurasi environment variables
├── tsconfig.json        # Konfigurasi compiler TypeScript
└── package.json         # Dependensi & skrip start`,
      summaryId: 'Struktur ramping dan minimalis, cocok untuk microservice.',
      summaryEn: 'Lean and lightweight structure ideal for backend microservices.',
    },
    starterFile: {
      filename: 'src/index.ts',
      code: `import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(\`⚡ Server Node.js aktif di http://localhost:\${PORT}\`);
});`,
      descriptionId: 'Server Express sederhana dengan healthcheck endpoint.',
      descriptionEn: 'Simple Express server with health check route.',
    },
    proTipsId: [
      'Gunakan `tsx` (`npx tsx file.ts`) untuk mengeksekusi file TypeScript langsung tanpa kompilasi manual.',
      'Manfaatkan built-in Node test runner: `node --test` untuk unit test tanpa library pihak ketiga.',
    ],
    proTipsEn: [
      'Use `tsx` (`npx tsx file.ts`) to execute TypeScript directly without pre-compiling.',
      'Leverage the built-in Node test runner via `node --test` for zero-dependency tests.',
    ],
  },

  typescript: {
    slug: 'typescript',
    name: 'TypeScript',
    category: 'Typed Superset of JavaScript',
    badge: 'Static Types & Modern ECMAScript',
    taglineId: 'Sistem tipe statis ketat untuk JavaScript yang mencegah runtime bugs dan meningkatkan produktivitas tim.',
    taglineEn: 'Strict static type system for JavaScript that catches runtime bugs and enables IDE refactoring.',
    vscode: {
      recommendedExtensions: [
        { id: 'dbaeumer.vscode-eslint', name: 'ESLint', descriptionId: 'Pemeriksaan aturan ketat tipe', descriptionEn: 'Strict linting rules' },
        { id: 'esbenp.prettier-vscode', name: 'Prettier', descriptionId: 'Formatting konsisten', descriptionEn: 'Consistent formatting' },
      ],
      cliInstallCommand: 'code --install-extension dbaeumer.vscode-eslint --install-extension esbenp.prettier-vscode',
    },
    installRuntime: {
      name: 'Node.js LTS (v20+)',
      version: 'v20.x or v22.x LTS',
      command: {
        windows: 'winget install OpenJS.NodeJS.LTS',
        macos: 'brew install node',
        linux: 'sudo apt install nodejs npm',
      },
      verifyCommand: 'node -v && npm -v',
      expectedOutput: 'v20.x.x\n10.x.x',
      tipsId: 'VS Code memiliki dukungan native engine TypeScript langsung dari Microsoft.',
      tipsEn: 'VS Code provides native, out-of-the-box TypeScript language intelligence.',
    },
    createProject: {
      titleId: 'Inisialisasi Project TypeScript Murni',
      titleEn: 'Initialize Pure TypeScript Project',
      command: 'mkdir my-ts-project && cd my-ts-project\nnpm init -y\nnpm install -D typescript tsx @types/node\nnpx tsc --init',
      explanationId: 'Menyiapkan compiler TypeScript (tsc) dengan tsconfig.json berkonfigurasi strict mode.',
      explanationEn: 'Configures the official TypeScript compiler (tsc) with strict type checking enabled.',
      cdCommand: 'cd my-ts-project',
    },
    runProject: {
      command: 'npx tsx src/index.ts',
      localUrl: 'Terminal Console',
      outputNoteId: 'Output tercetak langsung di terminal tanpa perlu langkah build terpisah.',
      outputNoteEn: 'Code executes and prints directly in the terminal without a separate build step.',
    },
    projectStructure: {
      tree: `my-ts-project/
├── src/
│   ├── index.ts         # Titik masuk eksekusi kode
│   └── types.ts         # Definisi interface & types
├── tsconfig.json        # Konfigurasi compiler TypeScript
└── package.json         # Package configuration`,
      summaryId: 'Direktori src/ menampung seluruh file .ts yang akan dicek tipenya oleh compiler.',
      summaryEn: 'The src/ directory holds all typed source files compiled by tsc.',
    },
    starterFile: {
      filename: 'src/index.ts',
      code: `interface User {
  id: number;
  name: string;
  role: 'admin' | 'developer' | 'guest';
}

function formatGreeting(user: User): string {
  return \`Halo \${user.name}, peran Anda adalah \${user.role.toUpperCase()}.\`;
}

const me: User = { id: 1, name: 'Antigravity Dev', role: 'developer' };
console.log(formatGreeting(me));`,
      descriptionId: 'Contoh program TypeScript dengan interface dan string literal union types.',
      descriptionEn: 'TypeScript program demonstrating interfaces and string literal unions.',
    },
    proTipsId: [
      'Selalu aktifkan `"strict": true` di tsconfig.json untuk keamanan tipe maksimal.',
      'Gunakan utility types bawaan seperti `Partial<T>`, `Pick<T, K>`, dan `Record<K, T>`.',
    ],
    proTipsEn: [
      'Keep `"strict": true` active in tsconfig.json for maximum type safety.',
      'Leverage built-in utility types such as `Partial<T>`, `Pick<T, K>`, and `Record<K, T>`.',
    ],
  },

  javascript: {
    slug: 'javascript',
    name: 'JavaScript',
    category: 'The Language of the Web',
    badge: 'ECMAScript Standard',
    taglineId: 'Bahasa pemrograman inti web untuk logika interaktif di browser dan runtime server.',
    taglineEn: 'The core programming language of the web powering interactive browser logic and server runtimes.',
    vscode: {
      recommendedExtensions: [
        { id: 'ritwickdey.liveserver', name: 'Live Server', descriptionId: 'Local dev server dengan reload otomatis untuk file HTML/JS', descriptionEn: 'Local development server with live reload' },
        { id: 'esbenp.prettier-vscode', name: 'Prettier', descriptionId: 'Code formatting otomatis', descriptionEn: 'Automated code formatter' },
      ],
      cliInstallCommand: 'code --install-extension ritwickdey.liveserver --install-extension esbenp.prettier-vscode',
    },
    installRuntime: {
      name: 'Node.js LTS (Untuk eksekusi terminal)',
      version: 'v20.x or v22.x LTS',
      command: {
        windows: 'winget install OpenJS.NodeJS.LTS',
        macos: 'brew install node',
        linux: 'sudo apt install nodejs npm',
      },
      verifyCommand: 'node -v',
      expectedOutput: 'v20.x.x',
      tipsId: 'JavaScript dapat dijalankan langsung di browser mana pun tanpa instalasi runtime tambahan.',
      tipsEn: 'JavaScript runs natively inside any browser without requiring external runtimes.',
    },
    createProject: {
      titleId: 'Inisialisasi Project JavaScript (ES Modules)',
      titleEn: 'Initialize JavaScript Project (ES Modules)',
      command: 'mkdir my-js-app && cd my-js-app\nnpm init -y\nnode -e "const p=JSON.parse(fs.readFileSync(\'package.json\')); p.type=\'module\'; fs.writeFileSync(\'package.json\', JSON.stringify(p, null, 2))"',
      explanationId: 'Menyiapkan package.json dengan dukungan `"type": "module"` untuk sintaks import/export.',
      explanationEn: 'Configures package.json with `"type": "module"` enabling standard ES import/export syntax.',
      cdCommand: 'cd my-js-app',
    },
    runProject: {
      command: 'node main.js',
      localUrl: 'Terminal / Browser Console',
      outputNoteId: 'Jalankan skrip di terminal atau hubungkan ke file index.html menggunakan Live Server.',
      outputNoteEn: 'Run directly via Node.js terminal or connect to index.html with Live Server.',
    },
    projectStructure: {
      tree: `my-js-app/
├── main.js          # Skrip utama JavaScript
├── utils.js         # Fungsi helper modular
└── package.json     # Konfigurasi module`,
      summaryId: 'Struktur modular bersih menggunakan ES Modules.',
      summaryEn: 'Clean modular structure utilizing standard ES Modules.',
    },
    starterFile: {
      filename: 'main.js',
      code: `// main.js - Titik Masuk JavaScript
const namaAplikasi = "Portal Belajar Tryngo";
const versi = 1;

function sapaPengguna(nama) {
  return \`Selamat datang di \${namaAplikasi} (v\${versi}), \${nama}!\`;
}

console.log(sapaPengguna("Pengembang"));`,
      descriptionId: 'Sintaks fungsi dan variabel dasar untuk titik masuk aplikasi.',
      descriptionEn: 'Foundational function and variable syntax for the application entry point.',
    },
    proTipsId: [
      'Gunakan `const` secara default, dan gunakan `let` hanya jika nilai variabel perlu diubah ulang.',
      'Gunakan `console.log()` untuk memeriksa nilai data dan alur logika di browser console.',
    ],
    proTipsEn: [
      'Use `const` by default, and switch to `let` only when a variable requires reassignment.',
      'Use `console.log()` to inspect data values and debug control flow in the browser console.',
    ],
  },

  html5: {
    slug: 'html5',
    name: 'HTML5',
    category: 'HyperText Markup Language',
    badge: 'Semantic Web & Standards',
    taglineId: 'Fondasi struktur dokumen web semantik, form input, audio/video, dan aksesibilitas (a11y).',
    taglineEn: 'The foundational semantic document structure of the web, forms, multimedia, and accessibility.',
    vscode: {
      recommendedExtensions: [
        { id: 'ritwickdey.liveserver', name: 'Live Server', descriptionId: 'Buka HTML di browser lokal dengan auto-reload saat file disimpan', descriptionEn: 'Launch local dev server with auto-reload' },
        { id: 'formulahendry.auto-close-tag', name: 'Auto Close Tag', descriptionId: 'Menutup tag HTML otomatis saat diketik', descriptionEn: 'Automatically add closing HTML tags' },
      ],
      cliInstallCommand: 'code --install-extension ritwickdey.liveserver --install-extension formulahendry.auto-close-tag',
    },
    installRuntime: {
      name: 'Web Browser (Chrome, Firefox, Safari, Edge)',
      version: 'Browser Standar (Evergreen)',
      command: {
        windows: 'winget install Google.Chrome',
        macos: 'brew install --cask google-chrome',
        linux: 'sudo apt install google-chrome-stable',
      },
      verifyCommand: 'code --version',
      expectedOutput: '1.9x.x',
      tipsId: 'HTML tidak membutuhkan compiler atau runtime server khusus untuk dijalankan.',
      tipsEn: 'HTML runs natively in any browser with zero compilers or backend required.',
    },
    createProject: {
      titleId: 'Bikin Halaman Web HTML5 Pertama',
      titleEn: 'Create Your First HTML5 Web Page',
      command: 'mkdir my-website && cd my-website\ntouch index.html',
      explanationId: 'Buat folder project baru dan tambahkan file index.html sebagai halaman utama.',
      explanationEn: 'Create a project folder and add index.html as the primary document.',
      cdCommand: 'cd my-website',
    },
    runProject: {
      command: 'Klik Kanan index.html -> "Open with Live Server"',
      localUrl: 'http://127.0.0.1:5500/index.html',
      outputNoteId: 'Halaman web akan terbuka otomatis di browser Anda.',
      outputNoteEn: 'The webpage opens automatically in your default browser.',
    },
    projectStructure: {
      tree: `my-website/
├── index.html       # Dokumen struktur web
├── styles.css       # File stylesheet
└── images/          # Direktori gambar & aset`,
      summaryId: 'Struktur standar situs web statis.',
      summaryEn: 'Standard architecture for static web pages.',
    },
    starterFile: {
      filename: 'index.html',
      code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Website Semantik</title>
</head>
<body style="font-family: sans-serif; max-width: 600px; margin: 40px auto; padding: 20px;">
  <header>
    <h1>🌐 Selamat Datang di Web Semantik</h1>
  </header>
  <main>
    <article>
      <h2>Mengapa HTML5 Semantik Penting?</h2>
      <p>Tag seperti &lt;header&gt;, &lt;main&gt;, &lt;article&gt;, dan &lt;footer&gt; membuat web ramah SEO dan mudah dibaca oleh screen reader (aksesibilitas).</p>
    </article>
  </main>
  <footer>
    <p>&copy; 2026 - Dibuat dengan Tryngo HTML5 Track</p>
  </footer>
</body>
</html>`,
      descriptionId: 'Struktur dokumen HTML5 semantik lengkap.',
      descriptionEn: 'Complete semantic HTML5 document boilerplate.',
    },
    proTipsId: [
      'Gunakan shortcut `!` lalu tekan `Tab` di VS Code untuk men-generate boilerplate HTML5 instan.',
      'Selalu sertakan atribut `alt` pada tag `<img>` demi aksesibilitas dan SEO.',
    ],
    proTipsEn: [
      'Type `!` and hit `Tab` in VS Code to generate an instant HTML5 boilerplate.',
      'Always include the `alt` attribute on `<img>` tags for screen readers and SEO.',
    ],
  },

  css3: {
    slug: 'css3',
    name: 'CSS3',
    category: 'Cascading Style Sheets',
    badge: 'Flexbox, Grid & Modern CSS',
    taglineId: 'Desain antarmuka web dengan selektor, Flexbox, CSS Grid, Custom Properties (Variabel), dan animasi transisi.',
    taglineEn: 'Style responsive web interfaces with selectors, Flexbox, CSS Grid, Variables, and transitions.',
    vscode: {
      recommendedExtensions: [
        { id: 'ritwickdey.liveserver', name: 'Live Server', descriptionId: 'Melihat perubahan styling secara realtime di browser', descriptionEn: 'Realtime styling preview in browser' },
        { id: 'ecmel.vscode-html-css', name: 'HTML CSS Support', descriptionId: 'Autocomplete nama class CSS di tag HTML', descriptionEn: 'CSS class name autocomplete in HTML' },
      ],
      cliInstallCommand: 'code --install-extension ritwickdey.liveserver --install-extension ecmel.vscode-html-css',
    },
    installRuntime: {
      name: 'Web Browser & VS Code',
      version: 'Standar W3C',
      command: {
        windows: 'code --version',
        macos: 'code --version',
        linux: 'code --version',
      },
      verifyCommand: 'code --version',
      expectedOutput: '1.9x.x',
      tipsId: 'CSS dieksekusi langsung oleh rendering engine browser.',
      tipsEn: 'CSS is executed directly by the browser rendering engine.',
    },
    createProject: {
      titleId: 'Bikin Project Styling CSS3',
      titleEn: 'Create CSS3 Styling Project',
      command: 'mkdir my-css-project && cd my-css-project\ntouch index.html styles.css',
      explanationId: 'Buat file HTML dan hubungkan file stylesheet styles.css.',
      explanationEn: 'Create an HTML file and link an external styles.css stylesheet.',
      cdCommand: 'cd my-css-project',
    },
    runProject: {
      command: 'Klik Kanan index.html -> "Open with Live Server"',
      localUrl: 'http://127.0.0.1:5500',
      outputNoteId: 'Browser merender layout Flexbox dan warna tema secara instan.',
      outputNoteEn: 'Browser immediately renders the Flexbox layout and theme colors.',
    },
    projectStructure: {
      tree: `my-css-project/
├── index.html       # Markup halaman
└── styles.css       # Aturan tata letak & warna`,
      summaryId: 'Pemisahan struktur (HTML) dan presentasi visual (CSS).',
      summaryEn: 'Separation of markup structure (HTML) and visual styling (CSS).',
    },
    starterFile: {
      filename: 'styles.css',
      code: `:root {
  --primary-color: #2E5B44;
  --bg-color: #F8FAF9;
  --text-color: #1A202C;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  max-width: 400px;
  border: 1px solid #E2E8F0;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
}`,
      descriptionId: 'Styling tata letak kartu menggunakan CSS Variables, Flexbox, dan efek transisi hover.',
      descriptionEn: 'Card layout styling using CSS Custom Properties, Flexbox, and hover transitions.',
    },
    proTipsId: [
      'Gunakan CSS Variables (`--var-name`) untuk kemudahan penerapan Dark Mode dan palet warna konsisten.',
      'Prioritaskan Mobile-First design dengan media queries `@media (min-width: 768px)`.',
    ],
    proTipsEn: [
      'Use CSS Variables (`--var-name`) for frictionless dark mode switching and consistent palettes.',
      'Adopt a mobile-first approach using `@media (min-width: 768px)` breakpoints.',
    ],
  },

  tailwind: {
    slug: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Utility-First Styling Framework',
    badge: 'Tailwind CSS v4',
    taglineId: 'Bangun desain antarmuka modern langsung di dalam markup dengan utility classes tanpa menulis CSS tradisional.',
    taglineEn: 'Build modern responsive interfaces directly in your markup using utility classes.',
    vscode: {
      recommendedExtensions: [
        { id: 'bradlc.vscode-tailwindcss', name: 'Tailwind CSS IntelliSense', descriptionId: 'Autocomplete nama class, preview warna, dan linting class Tailwind', descriptionEn: 'Class name autocomplete, color preview, and CSS linting' },
      ],
      cliInstallCommand: 'code --install-extension bradlc.vscode-tailwindcss',
    },
    installRuntime: {
      name: 'Node.js LTS',
      version: 'v20.x or v22.x LTS',
      command: {
        windows: 'winget install OpenJS.NodeJS.LTS',
        macos: 'brew install node',
        linux: 'sudo apt install nodejs npm',
      },
      verifyCommand: 'node -v && npm -v',
      expectedOutput: 'v20.x.x\n10.x.x',
      tipsId: 'Tailwind CSS v4 menggunakan engine lightningcss baru yang super cepat tanpa file konfigurasi berat.',
      tipsEn: 'Tailwind v4 features the lightningcss engine with near-zero configuration.',
    },
    createProject: {
      titleId: 'Inisialisasi Project Tailwind CSS v4 dengan Vite',
      titleEn: 'Initialize Tailwind CSS v4 Project with Vite',
      command: 'npm create vite@latest my-tailwind-app -- --template vanilla\ncd my-tailwind-app\nnpm install\nnpm install -D tailwindcss @tailwindcss/vite',
      explanationId: 'Setup Vite dengan plugin resmi Tailwind v4 untuk build secepat kilat.',
      explanationEn: 'Sets up Vite with the official Tailwind v4 plugin for lightning-fast builds.',
      cdCommand: 'cd my-tailwind-app',
    },
    runProject: {
      command: 'npm run dev',
      localUrl: 'http://localhost:5173',
      outputNoteId: 'Dev server aktif dengan kompilasi CSS on-demand.',
      outputNoteEn: 'Development server runs with on-demand CSS compilation.',
    },
    projectStructure: {
      tree: `my-tailwind-app/
├── index.html           # HTML dengan utility classes Tailwind
├── src/
│   └── style.css        # Cukup sertakan: @import "tailwindcss";
├── vite.config.ts       # Plugin tailwindcss()
└── package.json         # Dependensi Tailwind & Vite`,
      summaryId: 'Di Tailwind v4, Anda cukup menulis `@import "tailwindcss";` di style.css tanpa tailwind.config.js rumit.',
      summaryEn: 'In Tailwind v4, simply write `@import "tailwindcss";` in style.css with zero config required.',
    },
    starterFile: {
      filename: 'index.html',
      code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="./src/style.css">
  <title>Tailwind v4 Starter</title>
</head>
<body class="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
  <div class="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
    <span class="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
      Tailwind v4 Ready
    </span>
    <h1 class="text-2xl font-bold tracking-tight">Utility-First Speed</h1>
    <p class="text-slate-400 text-sm leading-relaxed">
      Styling cepat, responsif, dan rapi tanpa meninggalkan dokumen HTML.
    </p>
    <button class="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition-colors font-medium text-sm">
      Coba Sekarang
    </button>
  </div>
</body>
</html>`,
      descriptionId: 'Komponen card modern yang di-styling murni dengan Tailwind utility classes.',
      descriptionEn: 'Modern card component styled purely with Tailwind utilities.',
    },
    proTipsId: [
      'Gunakan modifier responsif (`sm:`, `md:`, `lg:`) untuk tata letak yang adaptif di berbagai ukuran layar.',
      'Gunakan class `dark:` untuk mendukung dark mode instan.',
    ],
    proTipsEn: [
      'Use responsive modifiers (`sm:`, `md:`, `lg:`) for adaptive multi-screen layouts.',
      'Leverage the `dark:` prefix to implement dark mode effortlessly.',
    ],
  },

  golang: {
    slug: 'golang',
    name: 'Go (Golang)',
    category: 'Compiled Systems & Cloud Backend',
    badge: 'Goroutines, High Throughput, Fast Compile',
    taglineId: 'Bahasa backend efisiensi tinggi dari Google untuk membangun microservice, CLI tools, dan sistem cloud terdistribusi.',
    taglineEn: 'High-throughput compiled language by Google for microservices, CLI tools, and distributed cloud systems.',
    vscode: {
      recommendedExtensions: [
        { id: 'golang.go', name: 'Go for Visual Studio Code', descriptionId: 'Dukungan resmi Go: intellisense (gopls), debug (delve), format (gofmt)', descriptionEn: 'Official Go extension: gopls intellisense, delve debugger, and gofmt' },
      ],
      cliInstallCommand: 'code --install-extension golang.go',
    },
    installRuntime: {
      name: 'Go Toolchain (1.23+)',
      version: 'Go 1.23.x+',
      command: {
        windows: 'winget install GoLang.Go',
        macos: 'brew install go',
        linux: 'sudo apt install golang-go',
      },
      verifyCommand: 'go version',
      expectedOutput: 'go version go1.23.x ...',
      tipsId: 'Setelah install, buka terminal baru agar path sistem `go` terdeteksi otomatis.',
      tipsEn: 'Open a fresh terminal window after installation so the Go binary path is recognized.',
    },
    createProject: {
      titleId: 'Inisialisasi Modul Go Baru (go mod init)',
      titleEn: 'Initialize New Go Module (go mod init)',
      command: 'mkdir my-go-app && cd my-go-app\ngo mod init my-go-app\ntouch main.go',
      explanationId: 'Membuat file go.mod untuk manajemen dependensi dan deklarasi modul Go resmi.',
      explanationEn: 'Generates go.mod for official dependency tracking and module declaration.',
      cdCommand: 'cd my-go-app',
    },
    runProject: {
      command: 'go run main.go',
      localUrl: 'Terminal / http://localhost:8080 (jika HTTP server)',
      outputNoteId: 'Perintah `go run` mengompilasi dan mengeksekusi program dalam memori seketika.',
      outputNoteEn: '`go run` compiles and runs your program in memory instantly.',
    },
    projectStructure: {
      tree: `my-go-app/
├── cmd/
│   └── api/
│       └── main.go      # Titik masuk aplikasi
├── internal/            # Kode internal privat yang aman
│   ├── handler/         # HTTP handlers
│   └── service/         # Logika domain
├── go.mod               # Definisi modul & versi Go
└── go.sum               # Hash checksum dependensi`,
      summaryId: 'Standar Standard Go Project Layout yang direkomendasikan komunitas.',
      summaryEn: 'Standard Go Project Layout recommended by the ecosystem.',
    },
    starterFile: {
      filename: 'main.go',
      code: `package main

import (
	"fmt"
	"net/http"
	"time"
)

func main() {
	http.HandleFunc("/api/status", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprintf(w, \`{"status":"active","time":"%s","runtime":"Go 1.23"}\`, time.Now().Format(time.RFC3339))
	})

	port := ":8080"
	fmt.Printf("🚀 Server Go aktif di http://localhost%s\\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		fmt.Printf("Error server: %v\\n", err)
	}
}`,
      descriptionId: 'HTTP API server native Go tanpa dependensi pihak ketiga.',
      descriptionEn: 'Native Go HTTP server with zero third-party dependencies.',
    },
    proTipsId: [
      'Gunakan `go build -o app.exe` untuk menghasilkan file binary mandiri yang siap dideploy tanpa instalasi runtime di server tujuan.',
      'Gunakan `go fmt ./...` sebelum commit untuk memastikan gaya penulisan kode selalu standar.',
    ],
    proTipsEn: [
      'Use `go build` to generate a single self-contained binary ready for zero-dependency deployment.',
      'Run `go fmt ./...` before committing to adhere to official Go formatting standards.',
    ],
  },

  rust: {
    slug: 'rust',
    name: 'Rust',
    category: 'Memory-Safe Systems Programming',
    badge: 'Zero-Cost Abstractions, Cargo, Concurrency',
    taglineId: 'Bahasa pemrograman sistem dengan jaminan keamanan memori (memory-safety) tanpa garbage collector.',
    taglineEn: 'Systems programming language delivering memory safety and high performance without a garbage collector.',
    vscode: {
      recommendedExtensions: [
        { id: 'rust-lang.rust-analyzer', name: 'rust-analyzer', descriptionId: 'Server bahasa Rust resmi dengan autocomplete, type inference, dan macro expansion', descriptionEn: 'Official Rust language server with deep type inference and macro expansion' },
        { id: 'tamasfe.even-better-toml', name: 'Even Better TOML', descriptionId: 'Syntax highlighting & validasi untuk file Cargo.toml', descriptionEn: 'TOML syntax support for Cargo.toml' },
      ],
      cliInstallCommand: 'code --install-extension rust-lang.rust-analyzer --install-extension tamasfe.even-better-toml',
    },
    installRuntime: {
      name: 'Rustup (Rust Toolchain Installer)',
      version: 'Rust 1.80+ (stable)',
      command: {
        windows: 'winget install Rustlang.Rustup',
        macos: "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh",
        linux: "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh",
      },
      verifyCommand: 'rustc --version && cargo --version',
      expectedOutput: 'rustc 1.8x.x ...\ncargo 1.8x.x ...',
      tipsId: 'Rustup mengelola versi compiler (rustc), package manager (cargo), dan standard library.',
      tipsEn: 'Rustup manages rustc compiler versions, the Cargo package manager, and stdlib.',
    },
    createProject: {
      titleId: 'Inisialisasi Project Rust Baru (cargo new)',
      titleEn: 'Initialize New Rust Project (cargo new)',
      command: 'cargo new my-rust-app --bin\ncd my-rust-app',
      explanationId: 'Cargo membuat struktur folder project binary lengkap dengan file Cargo.toml dan src/main.rs.',
      explanationEn: 'Cargo scaffolds a complete binary project including Cargo.toml and src/main.rs.',
      cdCommand: 'cd my-rust-app',
    },
    runProject: {
      command: 'cargo run',
      localUrl: 'Terminal Console',
      outputNoteId: 'Cargo otomatis mengunduh dependensi, mengompilasi kode, dan menjalankannya.',
      outputNoteEn: 'Cargo fetches crates, compiles your code, and runs the output binary.',
    },
    projectStructure: {
      tree: `my-rust-app/
├── src/
│   └── main.rs          # Titik masuk program Rust
├── Cargo.toml           # Metadata project & daftar crates
├── Cargo.lock           # Versi dependensi terkunci persis
└── target/              # Hasil kompilasi binary (di-git-ignore)`,
      summaryId: 'Struktur standar Cargo untuk aplikasi binary Rust.',
      summaryEn: 'Standard Cargo structure for binary applications.',
    },
    starterFile: {
      filename: 'src/main.rs',
      code: `fn main() {
    let name = "Developer Rust";
    let message = format!("🦀 Halo, {}! Selamat datang di era Memory Safety.", name);
    println!("{}", message);

    let numbers = vec![1, 2, 3, 4, 5];
    let sum: i32 = numbers.iter().sum();
    println!("Hasil penjumlahan vector: {}", sum);
}`,
      descriptionId: 'Program Rust sederhana mendemonstrasikan vector dan formatting string aman.',
      descriptionEn: 'Simple Rust program showcasing vectors, iterators, and string formatting.',
    },
    proTipsId: [
      'Gunakan `cargo check` saat development untuk validasi kompilasi kilat tanpa membuat binary.',
      'Gunakan `cargo run --release` saat ingin menguji performa maksimal dengan optimasi kompilator.',
    ],
    proTipsEn: [
      'Use `cargo check` during development for lightning-fast compilation verification without building binaries.',
      'Run `cargo run --release` to test code under maximum compiler optimizations.',
    ],
  },

  python: {
    slug: 'python',
    name: 'Python',
    category: 'High-Level General Programming',
    badge: 'AI, Data, Scripting & Backend',
    taglineId: 'Bahasa populer yang ekspresif dan mudah dibaca untuk backend API, otomasi, data science, dan kecerdasan buatan.',
    taglineEn: 'Expressive and readable language powering backend APIs, data science, automation, and AI workflows.',
    vscode: {
      recommendedExtensions: [
        { id: 'ms-python.python', name: 'Python for VS Code', descriptionId: 'Dukungan resmi Microsoft: linter, debugger, autocomplete', descriptionEn: 'Official Python support: debugger, linter, and autocomplete' },
        { id: 'charliermarsh.ruff', name: 'Ruff', descriptionId: 'Linter dan formatter Python super cepat berbasis Rust', descriptionEn: 'Ultra-fast Rust-based Python linter and formatter' },
      ],
      cliInstallCommand: 'code --install-extension ms-python.python --install-extension charliermarsh.ruff',
    },
    installRuntime: {
      name: 'Python 3.12+',
      version: 'Python 3.12.x+',
      command: {
        windows: 'winget install Python.Python.3.12',
        macos: 'brew install python@3.12',
        linux: 'sudo apt install python3 python3-pip python3-venv',
      },
      verifyCommand: 'python --version || python3 --version',
      expectedOutput: 'Python 3.12.x',
      tipsId: 'Pastikan mencentang "Add python.exe to PATH" jika menginstal via Windows installer resmi.',
      tipsEn: 'Ensure "Add python.exe to PATH" is checked when using the Windows graphical installer.',
    },
    createProject: {
      titleId: 'Inisialisasi Project Python & Virtual Environment (venv)',
      titleEn: 'Initialize Python Project & Virtual Environment (venv)',
      command: 'mkdir my-python-app && cd my-python-app\npython -m venv .venv\n# Windows: .venv\\Scripts\\activate\n# macOS/Linux: source .venv/bin/activate',
      explanationId: 'Virtual environment (.venv) mengisolasi package proyek agar tidak bentrok dengan instalasi sistem.',
      explanationEn: 'The virtual environment isolates project packages from global system packages.',
      cdCommand: 'cd my-python-app',
    },
    runProject: {
      command: 'python main.py',
      localUrl: 'Terminal Console',
      outputNoteId: 'Program dieksekusi langsung oleh Python interpreter.',
      outputNoteEn: 'Code runs immediately via the Python interpreter.',
    },
    projectStructure: {
      tree: `my-python-app/
├── .venv/               # Virtual environment isolasi package
├── src/
│   └── main.py          # Entrypoint program
├── requirements.txt     # Daftar package dependensi
└── pyproject.toml       # Metadata konfigurasi modern`,
      summaryId: 'Struktur project Python modern dengan isolasi venv.',
      summaryEn: 'Modern Python project layout featuring venv isolation.',
    },
    starterFile: {
      filename: 'main.py',
      code: `import sys
from datetime import datetime

def greet(name: str) -> str:
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return f"🐍 Halo {name}! Waktu server: {now} (Python {sys.version.split()[0]})"

if __name__ == "__main__":
    print(greet("Developer"))`,
      descriptionId: 'Skrip Python modern dengan type hints dan datetime.',
      descriptionEn: 'Python script utilizing modern type annotations and datetime.',
    },
    proTipsId: [
      'Gunakan perintah `pip freeze > requirements.txt` untuk menyimpan daftar dependensi proyek.',
      'Gunakan `uv` (`pip install uv`) sebagai package manager alternatif yang 10-100x lebih cepat dari pip standar.',
    ],
    proTipsEn: [
      'Run `pip freeze > requirements.txt` to lock project dependencies.',
      'Try `uv` (`pip install uv`) as an ultra-fast drop-in replacement for standard pip.',
    ],
  },

  django: {
    slug: 'django',
    name: 'Django',
    category: 'Full-Featured Python Web Framework',
    badge: 'Batteries-Included, ORM & Admin Panel',
    taglineId: 'Framework web Python kelas industri dengan ORM andal, panel admin otomatis, sistem otentikasi, dan keamanan berlapis.',
    taglineEn: 'Industrial-grade Python web framework with built-in ORM, auto-generated admin panel, and robust security.',
    vscode: {
      recommendedExtensions: [
        { id: 'ms-python.python', name: 'Python for VS Code', descriptionId: 'IntelliSense dan debugger Python', descriptionEn: 'Python language and debugging support' },
        { id: 'batisteo.vscode-django', name: 'Django for VS Code', descriptionId: 'Syntax highlighting untuk template Django dan snippets', descriptionEn: 'Template syntax highlighting and snippets' },
      ],
      cliInstallCommand: 'code --install-extension ms-python.python --install-extension batisteo.vscode-django',
    },
    installRuntime: {
      name: 'Python 3.12+ & pip',
      version: 'Python 3.12.x+',
      command: {
        windows: 'winget install Python.Python.3.12',
        macos: 'brew install python@3.12',
        linux: 'sudo apt install python3 python3-pip python3-venv',
      },
      verifyCommand: 'python --version',
      expectedOutput: 'Python 3.12.x',
      tipsId: 'Selalu aktifkan virtual environment sebelum menginstal django via pip.',
      tipsEn: 'Always activate your virtual environment before running pip install django.',
    },
    createProject: {
      titleId: 'Inisialisasi Project Django Baru',
      titleEn: 'Initialize New Django Project',
      command: 'mkdir my-django-app && cd my-django-app\npython -m venv .venv\n# Windows: .venv\\Scripts\\activate | Mac/Linux: source .venv/bin/activate\npip install django\ndjango-admin startproject config .\npython manage.py migrate',
      explanationId: 'Menyiapkan project Django dengan skrip manage.py dan menjalankan migrasi database SQLite default.',
      explanationEn: 'Scaffolds Django project structure with manage.py and initializes the default SQLite database.',
      cdCommand: 'cd my-django-app',
    },
    runProject: {
      command: 'python manage.py runserver',
      localUrl: 'http://127.0.0.1:8000',
      outputNoteId: 'Buka http://127.0.0.1:8000 di browser untuk melihat halaman sukses roket Django.',
      outputNoteEn: 'Open http://127.0.0.1:8000 in your browser to view the Django launchpad page.',
    },
    projectStructure: {
      tree: `my-django-app/
├── manage.py            # CLI helper Django untuk migrasi & dev server
├── config/
│   ├── settings.py      # Pengaturan database, apps, dan middleware
│   ├── urls.py          # Routing URL global
│   ├── asgi.py          # Entrypoint async server
│   └── wsgi.py          # Entrypoint WSGI production
└── db.sqlite3           # Database lokal bawaan`,
      summaryId: 'Arsitektur MVT (Model-View-Template) khas Django.',
      summaryEn: 'Classic Django Model-View-Template architecture.',
    },
    starterFile: {
      filename: 'config/views.py',
      code: `from django.http import JsonResponse
from datetime import datetime

def home_view(request):
    return JsonResponse({
        "framework": "Django 5.x",
        "status": "Online",
        "message": "Selamat datang di API Django pertama Anda!",
        "server_time": datetime.now().isoformat()
    })`,
      descriptionId: 'View sederhana yang mengembalikan respon JSON dari Django.',
      descriptionEn: 'Simple view returning a clean JSON response from Django.',
    },
    proTipsId: [
      'Jalankan `python manage.py createsuperuser` untuk membuat akun admin panel di `/admin`.',
      'Gunakan perintah `python manage.py startapp core` saat membuat fitur atau domain baru.',
    ],
    proTipsEn: [
      'Run `python manage.py createsuperuser` to create an administrator account for `/admin`.',
      'Use `python manage.py startapp core` when creating a new domain feature or app.',
    ],
  },

  csharp: {
    slug: 'csharp',
    name: 'C# (.NET)',
    category: 'Enterprise Modern Language',
    badge: '.NET 9 & Web API',
    taglineId: 'Bahasa berkinerja tinggi dari Microsoft untuk enterprise API, cloud microservices, desktop, dan game engine.',
    taglineEn: 'High-performance Microsoft language powering enterprise APIs, cloud microservices, and games.',
    vscode: {
      recommendedExtensions: [
        { id: 'ms-dotnettools.csdevkit', name: 'C# Dev Kit', descriptionId: 'Solusi lengkap manajemen project .NET, testing, dan solution explorer di VS Code', descriptionEn: 'Full solution explorer, testing, and debugging suite for .NET' },
        { id: 'ms-dotnettools.csharp', name: 'C# Extension', descriptionId: 'Dukungan bahasa C# & Omnisharp/Roslyn intellisense', descriptionEn: 'C# language support powered by Roslyn' },
      ],
      cliInstallCommand: 'code --install-extension ms-dotnettools.csdevkit --install-extension ms-dotnettools.csharp',
    },
    installRuntime: {
      name: '.NET 9 SDK',
      version: '.NET 9.0 SDK',
      command: {
        windows: 'winget install Microsoft.DotNet.SDK.9',
        macos: 'brew install dotnet-sdk',
        linux: 'sudo apt-get install -y dotnet-sdk-9.0',
      },
      verifyCommand: 'dotnet --version',
      expectedOutput: '9.0.xxx',
      tipsId: '.NET SDK mencakup compiler C#, runtime CLR, dan CLI tools.',
      tipsEn: 'The .NET SDK bundles the C# compiler, CLR runtime, and CLI tools.',
    },
    createProject: {
      titleId: 'Inisialisasi Project Web API / Minimal API .NET',
      titleEn: 'Initialize .NET Web API / Minimal API Project',
      command: 'dotnet new webapi -n MyWebApiApp -controllers\ncd MyWebApiApp',
      explanationId: 'Menghasilkan project Web API modern dengan ASP.NET Core, OpenAPI/Scalar, dan controllers.',
      explanationEn: 'Generates a modern ASP.NET Core Web API project equipped with controllers and OpenAPI.',
      cdCommand: 'cd MyWebApiApp',
    },
    runProject: {
      command: 'dotnet run',
      localUrl: 'http://localhost:5000 / https://localhost:5001',
      outputNoteId: 'Server Kestrel akan aktif di port lokal.',
      outputNoteEn: 'Kestrel web server launches at your designated local port.',
    },
    projectStructure: {
      tree: `MyWebApiApp/
├── Controllers/         # Endpoint controller API
├── Properties/
│   └── launchSettings.json
├── appsettings.json     # Konfigurasi app & connection string
├── Program.cs           # Titik masuk aplikasi & konfigurasi DI
└── MyWebApiApp.csproj   # File konfigurasi project .NET`,
      summaryId: 'Struktur project ASP.NET Core dengan Dependency Injection terintegrasi di Program.cs.',
      summaryEn: 'ASP.NET Core structure featuring built-in Dependency Injection in Program.cs.',
    },
    starterFile: {
      filename: 'Program.cs',
      code: `var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapGet("/api/greeting", () => Results.Ok(new {
    Message = "Halo dari .NET 9 C#!",
    Status = "Healthy",
    Timestamp = DateTime.UtcNow
}));

app.MapControllers();
app.Run();`,
      descriptionId: 'Minimal API endpoint di Program.cs .NET 9.',
      descriptionEn: 'Minimal API endpoint implementation in modern .NET 9.',
    },
    proTipsId: [
      'Gunakan perintah `dotnet watch` untuk mengaktifkan hot reload setiap kali file C# diedit.',
      'Gunakan record types (`public record User(int Id, string Name);`) untuk data transfer objek (DTO) yang ringkas.',
    ],
    proTipsEn: [
      'Run `dotnet watch` to enable hot reload during active development.',
      'Use C# record types (`public record User(int Id, string Name);`) for concise immutable DTOs.',
    ],
  },

  spring: {
    slug: 'spring',
    name: 'Spring Boot (Java)',
    category: 'Enterprise Java Platform',
    badge: 'Java 21 & Spring Boot 3',
    taglineId: 'Standar emas backend skala enterprise global dengan dependency injection, Spring Data JPA, dan ekosistem raksasa.',
    taglineEn: 'The global standard for enterprise backends featuring Spring Data JPA, IoC container, and massive ecosystem.',
    vscode: {
      recommendedExtensions: [
        { id: 'vscjava.vscode-java-pack', name: 'Extension Pack for Java', descriptionId: 'Paket lengkap Java dari Microsoft (LSP, debugger, test runner, maven)', descriptionEn: 'Complete Java support package from Microsoft' },
        { id: 'vmware.vscode-spring-boot', name: 'Spring Boot Tools', descriptionId: 'Autocomplete properti application.properties, simbol bean, dan navigasi controller', descriptionEn: 'Spring properties autocomplete, bean navigation, and symbols' },
      ],
      cliInstallCommand: 'code --install-extension vscjava.vscode-java-pack --install-extension vmware.vscode-spring-boot',
    },
    installRuntime: {
      name: 'JDK 21 (Eclipse Temurin / OpenJDK)',
      version: 'Java 21 LTS',
      command: {
        windows: 'winget install EclipseAdoptium.Temurin.21.JDK',
        macos: 'brew install openjdk@21',
        linux: 'sudo apt install openjdk-21-jdk',
      },
      verifyCommand: 'java -version',
      expectedOutput: 'openjdk version "21.0.x" ...',
      tipsId: 'Spring Boot 3 mewajibkan minimal Java versi 17, sangat direkomendasikan menggunakan Java 21 LTS.',
      tipsEn: 'Spring Boot 3 requires Java 17 minimum; Java 21 LTS is strongly recommended.',
    },
    createProject: {
      titleId: 'Inisialisasi Project Spring Boot (Spring Initializr)',
      titleEn: 'Initialize Spring Boot Project (Spring Initializr)',
      command: 'curl https://start.spring.io/starter.zip -d type=maven-project -d language=java -d bootVersion=3.4.0 -d dependencies=web,actuator -o my-spring-app.zip\ntar -xf my-spring-app.zip\ncd my-spring-app',
      explanationId: 'Mengunduh starter resmi Spring Boot dengan Maven wrapper dan dependensi Spring Web terpasang.',
      explanationEn: 'Downloads official Spring Boot starter with Maven wrapper and Spring Web pre-configured.',
      cdCommand: 'cd my-spring-app',
    },
    runProject: {
      command: './mvnw spring-boot:run # Windows: .\\mvnw.cmd spring-boot:run',
      localUrl: 'http://localhost:8080',
      outputNoteId: 'Embedded Tomcat server aktif di port 8080.',
      outputNoteEn: 'Embedded Tomcat server starts on port 8080.',
    },
    projectStructure: {
      tree: `my-spring-app/
├── src/
│   ├── main/
│   │   ├── java/com/example/demo/
│   │   │   └── DemoApplication.java # @SpringBootApplication
│   │   └── resources/
│   │       └── application.properties # Konfigurasi port & DB
│   └── test/java/
├── mvnw & mvnw.cmd      # Maven wrapper (tanpa perlu install maven)
└── pom.xml              # Definisi dependensi Maven`,
      summaryId: 'Struktur Maven standar Java untuk Spring Boot.',
      summaryEn: 'Standard Maven directory structure for Spring Boot.',
    },
    starterFile: {
      filename: 'src/main/java/com/example/demo/HelloController.java',
      code: `package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class HelloController {

    @GetMapping("/api/hello")
    public Map<String, Object> hello() {
        return Map.of(
            "status", "success",
            "message", "Halo dari Spring Boot 3 & Java 21!",
            "framework", "Spring Web"
        );
    }
}`,
      descriptionId: 'REST Controller sederhana mengembalikan respon Map JSON otomatis.',
      descriptionEn: 'Simple REST Controller returning JSON response via Jackson.',
    },
    proTipsId: [
      'Gunakan Maven Wrapper (`./mvnw`) agar rekan tim tidak perlu menginstal Maven secara manual di komputer mereka.',
      'Tambahkan ekstensi `Spring Boot DevTools` di pom.xml untuk restart otomatis saat kode Java berubah.',
    ],
    proTipsEn: [
      'Always use the Maven Wrapper (`./mvnw`) to guarantee uniform build tools across your team.',
      'Include `Spring Boot DevTools` in pom.xml for instant automatic restarts during local development.',
    ],
  },

  docker: {
    slug: 'docker',
    name: 'Docker',
    category: 'Containerization & DevOps Platform',
    badge: 'Docker Compose, Images, Multi-Stage Builds',
    taglineId: 'Bungkus aplikasi beserta seluruh dependensinya ke dalam kontainer ringan yang identik di dev, staging, dan production.',
    taglineEn: 'Package applications and dependencies into lightweight containers that run reliably anywhere.',
    vscode: {
      recommendedExtensions: [
        { id: 'ms-azuretools.vscode-docker', name: 'Docker for VS Code', descriptionId: 'Kelola kontainer, images, volume, dan intellisense Dockerfile langsung di sidebar', descriptionEn: 'Manage containers, images, volumes, and get Dockerfile intellisense' },
      ],
      cliInstallCommand: 'code --install-extension ms-azuretools.vscode-docker',
    },
    installRuntime: {
      name: 'Docker Engine / Docker Desktop',
      version: 'Docker v26+ & Compose v2',
      command: {
        windows: 'winget install Docker.DockerDesktop',
        macos: 'brew install --cask docker',
        linux: 'curl -fsSL https://get.docker.com | sh && sudo usermod -aG docker $USER',
      },
      verifyCommand: 'docker --version && docker compose version',
      expectedOutput: 'Docker version 26.x.x\nDocker Compose version v2.x.x',
      tipsId: 'Di Windows pastikan WSL 2 (Windows Subsystem for Linux) sudah aktif sebelum memasang Docker Desktop.',
      tipsEn: 'Ensure WSL 2 is enabled on Windows prior to running Docker Desktop.',
    },
    createProject: {
      titleId: 'Bikin Konfigurasi Docker Compose Pertama',
      titleEn: 'Create Your First Docker Compose Configuration',
      command: 'mkdir my-docker-app && cd my-docker-app\ntouch compose.yaml',
      explanationId: 'Menyiapkan file konfigurasi multi-kontainer deklaratif modern compose.yaml.',
      explanationEn: 'Sets up a modern declarative multi-container compose.yaml file.',
      cdCommand: 'cd my-docker-app',
    },
    runProject: {
      command: 'docker compose up -d',
      localUrl: 'http://localhost:80',
      outputNoteId: 'Kontainer berjalan di latar belakang (detached mode).',
      outputNoteEn: 'Containers spin up in background detached mode.',
    },
    projectStructure: {
      tree: `my-docker-app/
├── compose.yaml         # Orkestrasi multi-kontainer
├── Dockerfile           # Instruksi pembuatan image aplikasi
├── .dockerignore        # File yang diabaikan saat build
└── app/                 # Source code aplikasi`,
      summaryId: 'Pemisahan jelas antara konfigurasi image (Dockerfile) dan orkestrasi runtime (compose.yaml).',
      summaryEn: 'Clean separation between image recipes (Dockerfile) and runtime topology (compose.yaml).',
    },
    starterFile: {
      filename: 'compose.yaml',
      code: `services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    restart: always

  database:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: devuser
      POSTGRES_PASSWORD: secretpassword
      POSTGRES_DB: appdb
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:`,
      descriptionId: 'Konfigurasi compose.yaml lengkap dengan web server NGINX dan PostgreSQL.',
      descriptionEn: 'Complete compose.yaml definition with NGINX reverse proxy and persistent PostgreSQL.',
    },
    proTipsId: [
      'Gunakan perintah `docker compose ps` untuk melihat status kontainer yang sedang berjalan.',
      'Gunakan `docker compose logs -f` untuk memantau streaming log kontainer secara realtime.',
    ],
    proTipsEn: [
      'Run `docker compose ps` to inspect running service statuses.',
      'Use `docker compose logs -f` to tail real-time output streams from all running containers.',
    ],
  },

  postgresql: {
    slug: 'postgresql',
    name: 'PostgreSQL',
    category: 'Relational Database Management System',
    badge: 'ACID, JSONB, Advanced Indexing',
    taglineId: 'Database relasional open-source paling canggih di dunia dengan dukungan tipe data JSONB, ekstensi spatial, dan integritas data ACID.',
    taglineEn: 'The world\'s most advanced open-source relational database with JSONB support, spatial extensions, and ACID reliability.',
    vscode: {
      recommendedExtensions: [
        { id: 'ckolkman.vscode-postgres', name: 'PostgreSQL Management', descriptionId: 'Jalankan query SQL, jelajahi tabel, dan kelola database dari VS Code', descriptionEn: 'Run SQL queries, inspect tables, and manage Postgres connections' },
      ],
      cliInstallCommand: 'code --install-extension ckolkman.vscode-postgres',
    },
    installRuntime: {
      name: 'PostgreSQL 16 (via Docker / Native)',
      version: 'PostgreSQL 16.x',
      command: {
        windows: 'docker run -d --name pg-dev -p 5432:5432 -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=devdb -v pgdata:/var/lib/postgresql/data postgres:16-alpine',
        macos: 'brew install postgresql@16 && brew services start postgresql@16',
        linux: 'sudo apt install -y postgresql postgresql-contrib',
      },
      verifyCommand: 'docker exec -it pg-dev psql -U postgres -d devdb -c "SELECT version();"',
      expectedOutput: 'PostgreSQL 16.x ...',
      tipsId: 'Menjalankan PostgreSQL via Docker adalah metode tercepat tanpa mengotori instalasi host OS.',
      tipsEn: 'Running PostgreSQL via Docker provides the cleanest local setup with zero host pollution.',
    },
    createProject: {
      titleId: 'Koneksi & Buat Tabel Pertama di PostgreSQL',
      titleEn: 'Connect & Create Your First PostgreSQL Table',
      command: 'docker exec -it pg-dev psql -U postgres -d devdb',
      explanationId: 'Membuka antarmuka interaktif psql terminal untuk menjalankan query DDL & DML.',
      explanationEn: 'Launches the interactive psql terminal to execute DDL and DML queries.',
      cdCommand: '# Siap di terminal psql',
    },
    runProject: {
      command: 'SELECT * FROM users;',
      localUrl: 'localhost:5432',
      outputNoteId: 'Hasil query tabular akan ditampilkan di terminal psql.',
      outputNoteEn: 'Tabular query output prints directly in the psql console.',
    },
    projectStructure: {
      tree: `database/
├── migrations/
│   ├── 001_create_users.sql
│   └── 002_create_orders.sql
├── seeds/
│   └── 001_seed_dev_data.sql
└── docker-compose.yml`,
      summaryId: 'Struktur manajemen migrasi skema SQL terstruktur.',
      summaryEn: 'Structured layout for SQL schema migrations and seed scripts.',
    },
    starterFile: {
      filename: 'schema.sql',
      code: `-- Buat tabel dengan UUID dan JSONB
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    preferences JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Masukkan data uji
INSERT INTO users (name, email, preferences) 
VALUES ('John Coder', 'john@example.com', '{"theme": "dark", "newsletter": true}');

-- Query dengan operator JSONB
SELECT id, name, preferences->>'theme' AS selected_theme FROM users;`,
      descriptionId: 'Skema tabel SQL dengan fitur native JSONB PostgreSQL.',
      descriptionEn: 'SQL schema illustrating native PostgreSQL JSONB indexing.',
    },
    proTipsId: [
      'Gunakan perintah `\\dt` di psql untuk melihat daftar tabel dan `\\d nama_tabel` untuk melihat struktur kolom.',
      'Gunakan `EXPLAIN ANALYZE SELECT ...` untuk menganalisis performa query dan indeks.',
    ],
    proTipsEn: [
      'Use `\\dt` in psql to list all tables and `\\d table_name` to inspect column structures.',
      'Run `EXPLAIN ANALYZE SELECT ...` to profile query execution plans and index utilization.',
    ],
  },

  mysql: {
    slug: 'mysql',
    name: 'MySQL',
    category: 'Relational Database Management System',
    badge: 'InnoDB, High Speed, Universal Web Standard',
    taglineId: 'Sistem manajemen database relasional paling populer di dunia yang mentenagai web modern dan LAMP/LEMP stack.',
    taglineEn: 'The world\'s most widely adopted open-source relational database powering the modern web.',
    vscode: {
      recommendedExtensions: [
        { id: 'cweijan.vscode-mysql-client2', name: 'Database Client', descriptionId: 'GUI viewer tabel, query runner, dan manajemen koneksi MySQL', descriptionEn: 'Database viewer, query runner, and MySQL table manager' },
      ],
      cliInstallCommand: 'code --install-extension cweijan.vscode-mysql-client2',
    },
    installRuntime: {
      name: 'MySQL 8.0 (via Docker / Native)',
      version: 'MySQL 8.0+',
      command: {
        windows: 'docker run -d --name mysql-dev -p 3306:3306 -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=devdb -v mysqldata:/var/lib/mysql mysql:8.0',
        macos: 'brew install mysql && brew services start mysql',
        linux: 'sudo apt install -y mysql-server',
      },
      verifyCommand: 'docker exec -it mysql-dev mysql -u root -psecret -e "SELECT VERSION();"',
      expectedOutput: '8.0.xx',
      tipsId: 'Docker container MySQL mengisolasi database tanpa memerlukan service background Windows yang berat.',
      tipsEn: 'Docker encapsulates MySQL cleanly without installing heavy background host services.',
    },
    createProject: {
      titleId: 'Buka Koneksi MySQL CLI',
      titleEn: 'Connect to MySQL CLI',
      command: 'docker exec -it mysql-dev mysql -u root -psecret devdb',
      explanationId: 'Membuka sesi terminal MySQL client untuk berinteraksi langsung dengan database.',
      explanationEn: 'Opens interactive MySQL terminal prompt attached to devdb.',
      cdCommand: '# Terhubung ke MySQL CLI',
    },
    runProject: {
      command: 'SHOW TABLES;',
      localUrl: 'localhost:3306',
      outputNoteId: 'Daftar tabel database devdb ditampilkan.',
      outputNoteEn: 'Lists all registered database tables.',
    },
    projectStructure: {
      tree: `database/
├── schema.sql           # Definisi DDL tabel
├── seed.sql             # Data awal
└── my.cnf               # Konfigurasi tuning MySQL`,
      summaryId: 'Struktur file database MySQL.',
      summaryEn: 'MySQL database project layout.',
    },
    starterFile: {
      filename: 'schema.sql',
      code: `CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO products (name, price, stock) 
VALUES ('Mechanical Keyboard', 89.99, 15);

SELECT * FROM products WHERE price < 100;`,
      descriptionId: 'Skema tabel MySQL InnoDB dengan charset utf8mb4.',
      descriptionEn: 'MySQL InnoDB table definition with modern utf8mb4 charset.',
    },
    proTipsId: [
      'Gunakan selalu charset `utf8mb4` untuk mendukung seluruh karakter internasional dan emoji.',
      'Gunakan tipe `DECIMAL(10, 2)` untuk menyimpan nilai mata uang demi menghindari bug floating point.',
    ],
    proTipsEn: [
      'Always use `utf8mb4` charset to guarantee complete emoji and unicode character support.',
      'Use `DECIMAL(10, 2)` for monetary values to avoid binary floating-point precision errors.',
    ],
  },

  mongodb: {
    slug: 'mongodb',
    name: 'MongoDB',
    category: 'Document NoSQL Database',
    badge: 'BSON, Aggregation Pipeline, Scalable',
    taglineId: 'Database dokumen NoSQL berkinerja tinggi berbasis format BSON fleksibel dengan aggregation pipeline yang sangat kuat.',
    taglineEn: 'Leading NoSQL document database powered by flexible BSON documents and powerful aggregation pipelines.',
    vscode: {
      recommendedExtensions: [
        { id: 'mongodb.mongodb-vscode', name: 'MongoDB for VS Code', descriptionId: 'Jelajahi database, koleksi, dokumen, dan jalankan MongoDB playground langsung', descriptionEn: 'Browse collections, run queries, and execute MongoDB playgrounds' },
      ],
      cliInstallCommand: 'code --install-extension mongodb.mongodb-vscode',
    },
    installRuntime: {
      name: 'MongoDB 7.0 (via Docker)',
      version: 'MongoDB 7.0+',
      command: {
        windows: 'docker run -d --name mongo-dev -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=secret -v mongodata:/data/db mongo:7.0',
        macos: 'brew tap mongodb/brew && brew install mongodb-community@7.0 && brew services start mongodb-community@7.0',
        linux: 'docker run -d --name mongo-dev -p 27017:27017 mongo:7.0',
      },
      verifyCommand: 'docker exec -it mongo-dev mongosh --version',
      expectedOutput: '2.x.x',
      tipsId: 'Docker container MongoDB sudah menyertakan `mongosh` modern.',
      tipsEn: 'The official MongoDB Docker image includes the modern `mongosh` shell.',
    },
    createProject: {
      titleId: 'Buka MongoDB Shell (mongosh)',
      titleEn: 'Connect to MongoDB Shell (mongosh)',
      command: 'docker exec -it mongo-dev mongosh -u root -p secret',
      explanationId: 'Membuka shell interaktif mongosh untuk manipulasi koleksi dan dokumen BSON.',
      explanationEn: 'Launches interactive mongosh shell session authenticated as root.',
      cdCommand: '# Terhubung ke mongosh',
    },
    runProject: {
      command: 'db.users.find().pretty()',
      localUrl: 'mongodb://localhost:27017',
      outputNoteId: 'Mencetak dokumen JSON/BSON tersimpan.',
      outputNoteEn: 'Prints matching formatted JSON documents.',
    },
    projectStructure: {
      tree: `mongo-app/
├── scripts/
│   ├── seed.js          # Skrip populasi dokumen awal
│   └── indexes.js       # Pembuatan index koleksi
└── docker-compose.yml`,
      summaryId: 'Struktur project NoSQL berbasis MongoDB.',
      summaryEn: 'MongoDB NoSQL project layout.',
    },
    starterFile: {
      filename: 'playground.mongodb.js',
      code: `use('shopdb');

// Insert dokumen dengan array dan subdokumen bersarang
db.orders.insertOne({
  orderId: "ORD-9912",
  customer: { name: "Budi Santoso", email: "budi@example.com" },
  items: [
    { product: "Laptop Stand", qty: 1, price: 35.00 },
    { product: "USB-C Cable", qty: 2, price: 12.50 }
  ],
  status: "PAID",
  createdAt: new Date()
});

// Aggregation Pipeline untuk menghitung total penjualan
db.orders.aggregate([
  { $unwind: "$items" },
  { $group: { _id: "$status", totalRevenue: { $sum: { $multiply: ["$items.qty", "$items.price"] } } } }
]);`,
      descriptionId: 'Operasi dokumen dan aggregation pipeline MongoDB.',
      descriptionEn: 'Document insertion and aggregation pipeline in mongosh syntax.',
    },
    proTipsId: [
      'Gunakan `db.collection.createIndex({ field: 1 })` untuk mencegah full-collection scan pada koleksi besar.',
      'Gunakan MongoDB Compass sebagai GUI desktop resmi untuk visualisasi data interaktif.',
    ],
    proTipsEn: [
      'Always add indexes via `createIndex()` to avoid costly collection scans.',
      'Use MongoDB Compass for interactive graphical schema and document inspection.',
    ],
  },

  redis: {
    slug: 'redis',
    name: 'Redis',
    category: 'In-Memory Data Structure Store',
    badge: 'Caching, Pub/Sub, Streams, 100k+ OPS',
    taglineId: 'In-memory database berkecepatan sub-milidetik untuk caching, session storage, message broker (Pub/Sub), dan rate limiting.',
    taglineEn: 'Sub-millisecond in-memory data store for caching, sessions, message brokers, and rate limiting.',
    vscode: {
      recommendedExtensions: [
        { id: 'cweijan.vscode-redis-client', name: 'Redis Client', descriptionId: 'Jelajahi keys Redis, TTL, hash, set, dan stream langsung dari VS Code', descriptionEn: 'Explore keys, inspect TTL, hashes, and streams in editor' },
      ],
      cliInstallCommand: 'code --install-extension cweijan.vscode-redis-client',
    },
    installRuntime: {
      name: 'Redis 7 (via Docker)',
      version: 'Redis 7.x',
      command: {
        windows: 'docker run -d --name redis-dev -p 6379:6379 -v redisdata:/data redis:alpine redis-server --appendonly yes',
        macos: 'brew install redis && brew services start redis',
        linux: 'sudo apt install -y redis-server && sudo systemctl start redis',
      },
      verifyCommand: 'docker exec -it redis-dev redis-cli ping',
      expectedOutput: 'PONG',
      tipsId: 'Flag `--appendonly yes` memastikan persistence AOF aktif sehingga data tersimpan ke disk.',
      tipsEn: 'The `--appendonly yes` flag enables AOF persistence across restarts.',
    },
    createProject: {
      titleId: 'Buka Redis CLI Interaktif',
      titleEn: 'Connect to Interactive Redis CLI',
      command: 'docker exec -it redis-dev redis-cli',
      explanationId: 'Membuka prompt perintah redis-cli untuk mengeksekusi operasi data langsung.',
      explanationEn: 'Launches redis-cli prompt to execute commands directly.',
      cdCommand: '# Terhubung ke redis-cli',
    },
    runProject: {
      command: 'KEYS *',
      localUrl: 'localhost:6379',
      outputNoteId: 'Redis mengembalikan daftar semua key yang tersimpan di memori.',
      outputNoteEn: 'Returns all keys currently stored in memory.',
    },
    projectStructure: {
      tree: `redis-cache/
├── docker-compose.yml   # Layanan Redis dengan volume persistensi
└── redis.conf           # Konfigurasi memory policy (eviction)`,
      summaryId: 'Struktur konfigurasi Redis in-memory.',
      summaryEn: 'Redis in-memory configuration setup.',
    },
    starterFile: {
      filename: 'commands.redis',
      code: `# Caching string dengan TTL 60 detik
SET user:session:101 "token_abc123" EX 60
GET user:session:101
TTL user:session:101

# Hash struktur data
HSET user:profile:101 name "Budi" role "admin" points 150
HGETALL user:profile:101

# Pub/Sub atau Streams
XADD mystream * sensor "temp" value 28.5`,
      descriptionId: 'Kumpulan perintah esensial Redis: String dengan TTL, Hashes, dan Streams.',
      descriptionEn: 'Essential Redis commands: Strings with TTL, Hashes, and Streams.',
    },
    proTipsId: [
      'Selalu tentukan TTL (`EX <detik>`) pada key caching untuk mencegah memori RAM server penuh.',
      'Gunakan `SCAN 0 MATCH prefix:*` daripada `KEYS *` di server production untuk menghindari blocking.',
    ],
    proTipsEn: [
      'Always set TTL on cache keys to prevent unconstrained RAM exhaustion.',
      'Use `SCAN` instead of `KEYS *` in production to prevent single-threaded server blocking.',
    ],
  },

  graphql: {
    slug: 'graphql',
    name: 'GraphQL',
    category: 'API Query Language & Runtime',
    badge: 'Declarative Fetching & Typed Schema (SDL)',
    taglineId: 'Bahasa query deklaratif untuk API yang memungkinkan client meminta data persis sesuai kebutuhan tanpa over-fetching.',
    taglineEn: 'Declarative API query language empowering clients to request exactly what they need without over-fetching.',
    vscode: {
      recommendedExtensions: [
        { id: 'graphql.vscode-graphql', name: 'GraphQL: Language Feature Support', descriptionId: 'Syntax highlighting, validasi schema .graphql, dan autocomplete query', descriptionEn: 'Schema validation, syntax highlighting, and query autocomplete' },
      ],
      cliInstallCommand: 'code --install-extension graphql.vscode-graphql',
    },
    installRuntime: {
      name: 'Node.js LTS (v20+)',
      version: 'v20.x or v22.x LTS',
      command: {
        windows: 'winget install OpenJS.NodeJS.LTS',
        macos: 'brew install node',
        linux: 'sudo apt install nodejs npm',
      },
      verifyCommand: 'node -v && npm -v',
      expectedOutput: 'v20.x.x\n10.x.x',
      tipsId: 'GraphQL server dapat dibangun di atas runtime Node.js, Go, Python, maupun Java.',
      tipsEn: 'GraphQL servers can be hosted on Node.js, Go, Python, or Java backends.',
    },
    createProject: {
      titleId: 'Inisialisasi Apollo Server GraphQL',
      titleEn: 'Initialize Apollo Server GraphQL Project',
      command: 'mkdir my-graphql-api && cd my-graphql-api\nnpm init -y\nnpm install @apollo/server graphql\nnpm install -D typescript tsx @types/node\nnpx tsc --init',
      explanationId: 'Menyiapkan Apollo Server v4 standalone dengan eksekusi TypeScript instan.',
      explanationEn: 'Sets up Apollo Server v4 standalone powered by TypeScript.',
      cdCommand: 'cd my-graphql-api',
    },
    runProject: {
      command: 'npx tsx src/index.ts',
      localUrl: 'http://localhost:4000',
      outputNoteId: 'Buka http://localhost:4000 untuk mengakses Apollo Sandbox IDE.',
      outputNoteEn: 'Open http://localhost:4000 to launch Apollo Sandbox IDE.',
    },
    projectStructure: {
      tree: `my-graphql-api/
├── src/
│   ├── schema.ts        # TypeDefs definisi SDL
│   ├── resolvers.ts     # Query & Mutation handlers
│   └── index.ts         # Bootstrap Apollo Server
├── tsconfig.json
└── package.json`,
      summaryId: 'Struktur modular pemisahan SDL Schema dan Resolvers.',
      summaryEn: 'Clean separation of GraphQL Schema Definition and Resolver functions.',
    },
    starterFile: {
      filename: 'src/index.ts',
      code: `import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = \`#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }
\`;

const resolvers = {
  Query: {
    users: () => [
      { id: '1', name: 'Alice', email: 'alice@example.com' },
      { id: '2', name: 'Bob', email: 'bob@example.com' }
    ],
    user: (_: unknown, args: { id: string }) => ({
      id: args.id,
      name: 'Alice',
      email: 'alice@example.com'
    })
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(\`🚀 GraphQL Server siap di \${url}\`);`,
      descriptionId: 'Apollo Server standalone lengkap dengan typeDefs dan resolvers.',
      descriptionEn: 'Complete standalone Apollo Server with typeDefs and resolvers.',
    },
    proTipsId: [
      'Gunakan tag template `#graphql` agar ekstensi VS Code mengaktifkan syntax highlighting di dalam string.',
      'Gunakan Dataloader untuk mencegah masalah query N+1 pada resolver relasi.',
    ],
    proTipsEn: [
      'Prefix strings with `#graphql` for inline VS Code syntax highlighting.',
      'Use Dataloader to batch and eliminate N+1 database queries in nested resolvers.',
    ],
  },

  php: {
    slug: 'php',
    name: 'PHP',
    category: 'Server-Side Web Scripting',
    badge: 'PHP 8.3+, Composer, Modern OOP',
    taglineId: 'Bahasa backend dinamis yang mentenagai sebagian besar web dunia dengan fitur OOP modern dan performa JIT compiler.',
    taglineEn: 'Dynamic backend language powering major web systems with modern OOP and JIT compilation.',
    vscode: {
      recommendedExtensions: [
        { id: 'bmewburn.vscode-intelephense-client', name: 'PHP Intelephense', descriptionId: 'LSP PHP tercepat: code completion, signature help, find references', descriptionEn: 'Ultra-fast PHP language server: code completion and signature help' },
      ],
      cliInstallCommand: 'code --install-extension bmewburn.vscode-intelephense-client',
    },
    installRuntime: {
      name: 'PHP 8.3+ & Composer',
      version: 'PHP 8.3.x',
      command: {
        windows: 'winget install PHP.PHP.8.3 && winget install Composer.Composer',
        macos: 'brew install php composer',
        linux: 'sudo apt install -y php8.3-cli php8.3-mbstring php8.3-xml composer',
      },
      verifyCommand: 'php -v && composer -v',
      expectedOutput: 'PHP 8.3.x\nComposer version 2.x',
      tipsId: 'Composer adalah manajer paket resmi untuk ekosistem PHP modern.',
      tipsEn: 'Composer is the standard dependency manager for PHP.',
    },
    createProject: {
      titleId: 'Inisialisasi Project PHP Composer',
      titleEn: 'Initialize PHP Composer Project',
      command: 'mkdir my-php-app && cd my-php-app\ncomposer init --no-interaction\ntouch index.php',
      explanationId: 'Menyiapkan composer.json untuk autoloading PSR-4 dan dependensi.',
      explanationEn: 'Configures composer.json for PSR-4 autoloading and third-party packages.',
      cdCommand: 'cd my-php-app',
    },
    runProject: {
      command: 'php -S localhost:8000',
      localUrl: 'http://localhost:8000',
      outputNoteId: 'Built-in web server PHP aktif di port 8000.',
      outputNoteEn: 'PHP built-in development web server starts at port 8000.',
    },
    projectStructure: {
      tree: `my-php-app/
├── public/
│   └── index.php        # Entrypoint web
├── src/                 # Class PSR-4 aplikasi
├── vendor/              # Dependensi Composer (autoloader)
└── composer.json        # Manifest project`,
      summaryId: 'Struktur project PHP modern dengan standar PSR-4.',
      summaryEn: 'Modern PSR-4 compliant PHP architecture.',
    },
    starterFile: {
      filename: 'index.php',
      code: `<?php
declare(strict_types=1);

header('Content-Type: application/json');

$data = [
    'status' => 'success',
    'language' => 'PHP ' . PHP_VERSION,
    'message' => 'Halo dari server PHP 8 modern!',
    'timestamp' => date('c')
];

echo json_encode($data, JSON_PRETTY_PRINT);`,
      descriptionId: 'Skrip PHP modern dengan declare(strict_types=1).',
      descriptionEn: 'Modern PHP script demonstrating strict types and JSON output.',
    },
    proTipsId: [
      'Selalu aktifkan `declare(strict_types=1);` di baris pertama file PHP untuk pengetikan parameter yang ketat.',
      'Jalankan `php -S localhost:8000 -t public` untuk mengarahkan root direktori server ke folder public.',
    ],
    proTipsEn: [
      'Always include `declare(strict_types=1);` at the top of PHP files for strict type enforcement.',
      'Pass `-t public` to `php -S` to serve files safely from the public document root.',
    ],
  },

  laravel: {
    slug: 'laravel',
    name: 'Laravel',
    category: 'Full-Stack PHP Framework',
    badge: 'Eloquent ORM, Artisan, Blade, Ecosystem',
    taglineId: 'Framework PHP paling dicintai di dunia dengan sintaks elegan, Eloquent ORM, migrasi skema database, dan ekosistem paket lengkap.',
    taglineEn: 'The world\'s most popular PHP framework with elegant syntax, Eloquent ORM, and comprehensive tooling.',
    vscode: {
      recommendedExtensions: [
        { id: 'bmewburn.vscode-intelephense-client', name: 'PHP Intelephense', descriptionId: 'Dukungan bahasa PHP dan autocomplete method', descriptionEn: 'PHP language server' },
        { id: 'onecentlin.laravel5-snippets', name: 'Laravel Blade Snippets', descriptionId: 'Syntax highlighting & format file .blade.php', descriptionEn: 'Blade template highlighting and snippets' },
      ],
      cliInstallCommand: 'code --install-extension bmewburn.vscode-intelephense-client --install-extension onecentlin.laravel5-snippets',
    },
    installRuntime: {
      name: 'PHP 8.2+ & Composer',
      version: 'PHP 8.2+ & Composer 2.x',
      command: {
        windows: 'winget install PHP.PHP.8.3 && winget install Composer.Composer',
        macos: 'brew install php composer',
        linux: 'sudo apt install -y php8.3-cli php8.3-curl php8.3-mbstring php8.3-xml composer',
      },
      verifyCommand: 'php -v && composer -v',
      expectedOutput: 'PHP 8.x\nComposer 2.x',
      tipsId: 'Laravel membutuhkan ekstensi php-curl, php-mbstring, dan php-xml aktif.',
      tipsEn: 'Ensure php-curl, mbstring, and xml extensions are enabled.',
    },
    createProject: {
      titleId: 'Inisialisasi Project Laravel Baru (Composer)',
      titleEn: 'Initialize New Laravel Project (Composer)',
      command: 'composer create-project laravel/laravel my-laravel-app\ncd my-laravel-app',
      explanationId: 'Men-download skeleton resmi Laravel, men-generate application key, dan menyiapkan file .env.',
      explanationEn: 'Downloads official Laravel skeleton, generates APP_KEY, and creates default .env.',
      cdCommand: 'cd my-laravel-app',
    },
    runProject: {
      command: 'php artisan serve',
      localUrl: 'http://127.0.0.1:8000',
      outputNoteId: 'Server Laravel development aktif di port 8000.',
      outputNoteEn: 'Laravel development server launches on port 8000.',
    },
    projectStructure: {
      tree: `my-laravel-app/
├── app/
│   ├── Http/Controllers/
│   └── Models/          # Model Eloquent ORM
├── routes/
│   ├── web.php          # Route tampilan web
│   └── api.php          # Route REST API
├── database/
│   └── migrations/      # Skema database terkelola
├── resources/views/     # Template Blade (.blade.php)
├── .env                 # Konfigurasi database & environment
└── artisan              # CLI tool pembantu Laravel`,
      summaryId: 'Arsitektur MVC (Model-View-Controller) Laravel yang sangat terstruktur.',
      summaryEn: 'Structured Laravel MVC architecture.',
    },
    starterFile: {
      filename: 'routes/web.php',
      code: `<?php

use Illuminate\\Support\\Facades\\Route;

Route::get('/', function () {
    return response()->json([
        'framework' => 'Laravel ' . app()->version(),
        'status' => 'active',
        'message' => 'Selamat datang di aplikasi Laravel pertama Anda!'
    ]);
});`,
      descriptionId: 'Route closure sederhana yang mengembalikan respon JSON.',
      descriptionEn: 'Simple route closure returning JSON response.',
    },
    proTipsId: [
      'Gunakan `php artisan make:model Product -mcr` untuk membuat Model, Migration, dan Controller Resource sekaligus.',
      'Jalankan `php artisan migrate` untuk mengeksekusi seluruh migrasi database yang tertunda.',
    ],
    proTipsEn: [
      'Run `php artisan make:model Product -mcr` to scaffold a Model, Migration, and Controller in one command.',
      'Execute `php artisan migrate` to apply pending database schema changes.',
    ],
  },

  codeigniter4: {
    slug: 'codeigniter4',
    name: 'CodeIgniter 4',
    category: 'Lightweight PHP Framework',
    badge: 'Zero-Config, High Performance, Small Footprint',
    taglineId: 'Framework PHP berukuran sangat ringan, cepat dipelajari, dan minim konfigurasi untuk aplikasi web dinamis.',
    taglineEn: 'Extremely lightweight, high-performance PHP framework with minimal configuration overhead.',
    vscode: {
      recommendedExtensions: [
        { id: 'bmewburn.vscode-intelephense-client', name: 'PHP Intelephense', descriptionId: 'Autocomplete kode PHP', descriptionEn: 'PHP autocomplete engine' },
      ],
      cliInstallCommand: 'code --install-extension bmewburn.vscode-intelephense-client',
    },
    installRuntime: {
      name: 'PHP 8.1+ & Composer',
      version: 'PHP 8.1+ or 8.2+',
      command: {
        windows: 'winget install PHP.PHP.8.3 && winget install Composer.Composer',
        macos: 'brew install php composer',
        linux: 'sudo apt install -y php-cli php-intl composer',
      },
      verifyCommand: 'php -v && composer -v',
      expectedOutput: 'PHP 8.x\nComposer 2.x',
      tipsId: 'Pastikan ekstensi php-intl dan php-mbstring aktif di php.ini.',
      tipsEn: 'Ensure php-intl and php-mbstring extensions are enabled in php.ini.',
    },
    createProject: {
      titleId: 'Inisialisasi Project CodeIgniter 4 (AppStarter)',
      titleEn: 'Initialize CodeIgniter 4 Project (AppStarter)',
      command: 'composer create-project codeigniter4/appstarter my-ci4-app\ncd my-ci4-app',
      explanationId: 'Mengunduh starter resmi CodeIgniter 4 dengan struktur direktori siap pakai.',
      explanationEn: 'Downloads the official CodeIgniter 4 app starter directory structure.',
      cdCommand: 'cd my-ci4-app',
    },
    runProject: {
      command: 'php spark serve',
      localUrl: 'http://localhost:8080',
      outputNoteId: 'Server CodeIgniter Spark aktif di port 8080.',
      outputNoteEn: 'CodeIgniter Spark dev server runs at port 8080.',
    },
    projectStructure: {
      tree: `my-ci4-app/
├── app/
│   ├── Controllers/     # Controller logika HTTP
│   ├── Models/          # Model query database
│   └── Views/           # Template tampilan HTML
├── public/              # Document root web server
├── spark                # Script CLI CodeIgniter
└── env                  # File contoh konfigurasi (rename ke .env)`,
      summaryId: 'Arsitektur MVC ramping CodeIgniter 4.',
      summaryEn: 'Lean MVC architecture of CodeIgniter 4.',
    },
    starterFile: {
      filename: 'app/Controllers/Home.php',
      code: `<?php

namespace App\\Controllers;

class Home extends BaseController
{
    public function index(): string
    {
        return $this->response->setJSON([
            'framework' => 'CodeIgniter 4',
            'status' => 'running',
            'message' => 'Halo dari CodeIgniter 4 Spark!'
        ]);
    }
}`,
      descriptionId: 'Controller default CodeIgniter 4 mengembalikan JSON.',
      descriptionEn: 'Default CodeIgniter 4 controller returning JSON.',
    },
    proTipsId: [
      'Ubah nama file `env` menjadi `.env` dan atur `CI_ENVIRONMENT = development` untuk mengaktifkan Debug Toolbar.',
      'Gunakan perintah `php spark make:controller User` untuk membuat controller baru dengan cepat.',
    ],
    proTipsEn: [
      'Rename `env` to `.env` and set `CI_ENVIRONMENT = development` to enable the interactive Debug Toolbar.',
      'Use `php spark make:controller User` to generate controllers quickly.',
    ],
  },

  rails: {
    slug: 'rails',
    name: 'Ruby on Rails',
    category: 'Full-Stack MVC Framework',
    badge: 'Convention over Configuration & Productivity',
    taglineId: 'Framework web legendaris berbasis Ruby yang mempopulerkan prinsip Convention over Configuration dan scaffolding kilat.',
    taglineEn: 'Legendary web framework built on Convention over Configuration, developer joy, and rapid delivery.',
    vscode: {
      recommendedExtensions: [
        { id: 'shopify.ruby-lsp', name: 'Ruby LSP (Shopify)', descriptionId: 'Server bahasa Ruby resmi dengan format, definisi, dan diagnostics', descriptionEn: 'Official Shopify Ruby LSP with formatting and jump to definition' },
      ],
      cliInstallCommand: 'code --install-extension shopify.ruby-lsp',
    },
    installRuntime: {
      name: 'Ruby 3.3+ & Bundler',
      version: 'Ruby 3.3.x',
      command: {
        windows: 'winget install RubyInstallerTeam.RubyWithDevKit.3.3',
        macos: 'brew install ruby && gem install bundler',
        linux: 'sudo apt install -y ruby-full build-essential && sudo gem install bundler',
      },
      verifyCommand: 'ruby -v && bundle -v',
      expectedOutput: 'ruby 3.3.x\nBundler version 2.x',
      tipsId: 'Di Linux/macOS, manfaatkan `rbenv` atau `asdf` untuk mengelola beberapa versi Ruby.',
      tipsEn: 'Use `rbenv` or `asdf` on macOS/Linux for seamless version switching.',
    },
    createProject: {
      titleId: 'Inisialisasi Project Ruby on Rails Baru',
      titleEn: 'Initialize New Ruby on Rails Project',
      command: 'gem install rails\nrails new my-rails-app --api\ncd my-rails-app',
      explanationId: 'Menyiapkan aplikasi Rails mode API ringan tanpa aset frontend berlebih.',
      explanationEn: 'Scaffolds a lean API-only Rails application without bloated front-end assets.',
      cdCommand: 'cd my-rails-app',
    },
    runProject: {
      command: 'bin/rails server',
      localUrl: 'http://localhost:3000',
      outputNoteId: 'Server Puma aktif di port 3000.',
      outputNoteEn: 'Puma web server launches at port 3000.',
    },
    projectStructure: {
      tree: `my-rails-app/
├── app/
│   ├── controllers/     # Controller penangan request
│   └── models/          # Model ActiveRecord
├── config/
│   ├── routes.rb        # Pemetaan URL routes
│   └── database.yml     # Konfigurasi database
├── db/
│   └── migrate/         # Migrasi ActiveRecord
├── Gemfile              # Daftar gem dependensi
└── bin/rails            # Executable CLI Rails`,
      summaryId: 'Arsitektur MVC Convention over Configuration khas Rails.',
      summaryEn: 'Convention over Configuration MVC architecture of Rails.',
    },
    starterFile: {
      filename: 'config/routes.rb',
      code: `Rails.application.routes.draw do
  get "/api/status", to: proc { [200, { "Content-Type" => "application/json" }, ['{"status":"ok","framework":"Ruby on Rails 7"}']] }
end`,
      descriptionId: 'Definisi route langsung di config/routes.rb.',
      descriptionEn: 'Direct route declaration in config/routes.rb.',
    },
    proTipsId: [
      'Gunakan perintah `bin/rails generate scaffold Product name:string price:decimal` untuk men-generate seluruh API CRUD dalam 2 detik.',
      'Gunakan `bin/rails console` untuk menguji query ActiveRecord langsung di terminal.',
    ],
    proTipsEn: [
      'Run `bin/rails generate scaffold Product name:string price:decimal` to generate full CRUD APIs in 2 seconds.',
      'Launch `bin/rails console` to query ActiveRecord models interactively.',
    ],
  },
};
