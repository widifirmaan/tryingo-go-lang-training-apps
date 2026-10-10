# Vue Basics & Template Syntax

> **Kategori:** Vue | **Level:** Beginner | **Minggu 1:** Vue Basics & Template Syntax

## Learning Objectives

- Understand Vue as a progressive framework
- Template syntax: {{ }} for text interpolation
- Directives: v-bind, v-on, v-if, v-for, v-model
- Reactivity: data() returns reactive object
- Methods and Computed properties

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **Vue - Official (Volar)** (`vue.volar`): Language support, syntax highlighting, & TS for .vue files
- **ESLint** (`dbaeumer.vscode-eslint`): Code linting for Vue files

Or install all recommended extensions at once via terminal:
```bash
code --install-extension vue.volar --install-extension dbaeumer.vscode-eslint
```

---

### 2. Runtime & Dependency Installation (Node.js LTS (v20+))
Make sure the required runtime or SDK is installed on your machine:

**Windows (PowerShell):**
```powershell
winget install OpenJS.NodeJS.LTS
```

**macOS (Terminal / Homebrew):**
```bash
brew install node
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install nodejs npm
```

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
node -v && npm -v
```

Expected output:
```output
v20.x.x
10.x.x
```

> 💡 **Prerequisite Note:** Volar powers the TypeScript language server inside Vue Single-File Components.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
npm create vue@latest my-vue-app
cd my-vue-app
npm install
```
- **Details:** Interactive scaffolder to configure TypeScript, Vue Router, Pinia state management, and ESLint.
- **Navigate to the project directory:**
```bash
cd my-vue-app
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
npm run dev
```
Open in browser or terminal: `http://localhost:5173`

> ℹ️ Open http://localhost:5173 to view your running Vue application.

**Initial Entry File (`src/App.vue`):**
```vue
<script setup lang="ts">
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
</style>
```
Vue 3 SFC using modern <script setup> and reactive ref().

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
my-vue-app/
├── src/
│   ├── assets/          # Logo dan gambar
│   ├── components/      # Komponen Vue reusable
│   ├── App.vue          # Root Single-File Component
│   └── main.ts          # Mount instance Vue ke DOM
├── index.html           # Shell HTML utama
├── vite.config.ts       # Vite config dengan plugin @vitejs/plugin-vue
└── package.json         # Dependensi Vue 3 & Pinia
```
.vue files bundle <template>, <script setup>, and <style scoped> in a single cohesive unit.

---

### 6. Beginner Tips & Best Practices
- Prefer `ref()` for primitives and `reactive()` for complex object states.
- Use Pinia as the official modern store management library over Vuex.

---

## Program: Hello Vue

```vue
// Vue = progressive framework untuk membangun UI
const { createApp } = Vue;
const app = createApp({
  data() { return { message: 'Halo, Vue!', name: 'Tryngo', isDark: false, count: 0 }; },
  methods: { toggle() { this.isDark = !this.isDark; }, increment() { this.count++; } },
  computed: { greeting() { return this.message + ' Selamat datang, ' + this.name; } },
});
app.mount('#app');
console.log('Vue app siap dijalankan');
```

---

## Key Concepts

### Template Syntax
{{ }} = text interpolation, auto-updates.

### Directives
v-bind, v-on, v-if, v-for, v-model.

### Reactivity
Data from data() becomes reactive.

### Computed vs Method
Cached, only re-evaluates on dependency change.

---

## Experiments

- Change data and observe UI update
- Add new computed property
- Create conditional rendering
- Render list with v-for

---

## Challenge

Build a counter app with: increment, decrement, reset. Show different messages based on value.

---

## Summary

Week 1 of 12: **Vue Basics & Template Syntax** (Level: Beginner). Next week: **Reactivity & Composition API**.
