# Final Project: Task Manager

> Svelte | Lesson 10

## Learning Objectives

- Combine all Svelte concepts: components, stores, props, events, lifecycle\n- Build a Task Manager with CRUD operations\n- Use custom stores for state management\n- Apply reusable components (TaskList, TaskForm)

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

## Explanation

## Final Project Architecture
App.svelte = root component with navigation. TaskStore = custom store with CRUD actions. TaskList = reusable list component. TaskForm = reusable form component.
## Key Concepts
$props() for props, {@render children()} for slots, $store for reactive store access, onMount for data fetching, bind:value for two-way binding.
## Deployment
npm run build — build production. Deploy to Vercel, Netlify, or Cloudflare Pages.

---

## Experiments

1. **## Final Project Architecture
App.svelte = root component with navigation. TaskStore = custom store with CRUD actions. TaskList = reusable list component. TaskForm = reusable form component.
## Key Concepts
$props() for props, {@render children()} for slots, $store for reactive store access, onMount for data fetching, bind:value for two-way binding.
## Deployment
npm run build — build production. Deploy to Vercel, Netlify, or Cloudflare Pages.**

---

## Challenge

Level up the final project: (1) add categories for tasks (work, personal, urgent), (2) add due date with date picker, (3) add drag-and-drop for task reorder, (4) add localStorage persistence, (5) add dark mode toggle.

---

## Summary

Task Manager = Svelte 5 + stores + components + CRUD. All Svelte concepts applied! You are ready to build real Svelte apps.
