# Proyek Akhir: Task Manager

> Svelte | Pelajaran 10

## Tujuan Pembelajaran

- Menggabungkan semua konsep Svelte: components, stores, props, events, lifecycle\n- Membangun Task Manager dengan CRUD operations\n- Menggunakan custom stores untuk state management\n- Menerapkan reusable components (TaskList, TaskForm)

---

## Program: Svelte

```svelte
<script>
  import { goto } from "$app/navigation";
  import TaskList from "./components/TaskList.svelte";
  import TaskForm from "./components/TaskForm.svelte";
  import { taskStore } from "./stores/tasks";

  let activeTab = "all";
</script>

<h1>Task Manager</h1>

<nav>
  <button on:click={() => activeTab = "all"} class:active={activeTab === "all"}>Semua</button>
  <button on:click={() => activeTab = "active"} class:active={activeTab === "active"}>Aktif</button>
  <button on:click={() => activeTab = "done"} class:active={activeTab === "done"}>Selesai</button>
</nav>

<TaskForm />

<TaskList filter={activeTab} />

<p>Total: {$taskStore.length} tugas</p>
```

---

## Penjelasan

## Final Project Architecture
App.svelte = root component dengan navigation. TaskStore = custom store dengan CRUD actions. TaskList = reusable list component. TaskForm = reusable form component.
## Key Concepts
$props() untuk props, {@render children()} untuk slots, $store untuk reactive store access, onMount untuk data fetching, bind:value untuk two-way binding.
## Deployment
npm run build — build production. Deploy ke Vercel, Netlify, atau Cloudflare Pages.

---

## Eksperimen

1. **## Final Project Architecture
App.svelte = root component dengan navigation. TaskStore = custom store dengan CRUD actions. TaskList = reusable list component. TaskForm = reusable form component.
## Key Concepts
$props() untuk props, {@render children()} untuk slots, $store untuk reactive store access, onMount untuk data fetching, bind:value untuk two-way binding.
## Deployment
npm run build — build production. Deploy ke Vercel, Netlify, atau Cloudflare Pages.**

---

## Tantangan

Tingkatkan proyek akhir: (1) tambah kategori untuk tugas (work, personal, urgent), (2) tambah due date dengan date picker, (3) tambah drag-and-drop untuk reorder tugas, (4) tambah persistensi ke localStorage, (5) tambah dark mode toggle.

---

## Ringkasan

Task Manager = Svelte 5 + stores + components + CRUD. Semua konsep Svelte terpakai! Anda siap build Svelte app nyata.
