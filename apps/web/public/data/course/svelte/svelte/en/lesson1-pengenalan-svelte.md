# Introduction to Svelte & Setup

> Svelte | Lesson 1

## Learning Objectives

- Understand Svelte: compile-time framework for the web\n- Learn Svelte project structure (src/App.svelte, src/main.ts)\n- Understand Svelte components: script, markup, and style\n- Run Svelte app via Vite and view output in browser

---

## Program: Svelte

```svelte
<script>
  let name = "Svelte";
</script>

<h1>Hello, {name}!</h1>
<p>Welcome to Svelte 5.</p>
```

---

## Explanation

## Svelte Component Structure
Each Svelte component has 3 parts: <script> (logic), markup (HTML), and <style> (CSS).
## Reactivity
Svelte 5 uses runes: $state, $derived, $effect. No need for reactive declarations like Svelte 4.
## Running Svelte
npm install && npm run dev — install dependencies and start Vite dev server. Open http://localhost:5173.

---

## Experiments

1. **## Svelte Component Structure
Each Svelte component has 3 parts: <script> (logic), markup (HTML), and <style> (CSS).
## Reactivity
Svelte 5 uses runes: $state, $derived, $effect. No need for reactive declarations like Svelte 4.
## Running Svelte
npm install && npm run dev — install dependencies and start Vite dev server. Open http://localhost:5173.**

---

## Challenge

Explore: (1) change "Svelte" to your framework name in the name variable, (2) add an h2 with your project title, (3) try accessing http://localhost:5173 and see the change, (4) add a button that changes the name when clicked.

---

## Summary

Svelte = compile-time framework. Component = script + markup + style. Runes = $state, $derived, $effect. Next: props and events.
