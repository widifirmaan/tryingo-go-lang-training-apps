# Lifecycle & Context

> **Kategori:** Svelte | **Level:** Menengah | **Minggu 8:** Lifecycle & Context

## Tujuan Pembelajaran

- onMount: jalan setelah komponen di-mount
- onDestroy: cleanup sebelum komponen di-destroy
- beforeUpdate dan afterUpdate
- setContext dan getContext
- tick() untuk flush state changes

---

## Program: Hooks & Context

```svelte
<!-- Lifecycle: onMount, onDestroy, beforeUpdate, afterUpdate -->
<!-- Context: setContext, getContext -->
<script>
  import { onMount, onDestroy, setContext, getContext } from 'svelte';
  onMount(() => { console.log('Mounted!'); return () => console.log('Cleanup'); });
  onDestroy(() => { console.log('Destroyed'); });
  setContext('theme', { dark: false, toggle: () => {} });
  const theme = getContext('theme');
</script>
```

---

## Konsep Kunci

### onMount
Jalan setelah mount. Return function = cleanup.

### onDestroy
Jalan sebelum destroy.

### Context
setContext(key, value) di parent. getContext(key) di child.

### Tick
await tick() = tunggu DOM update.

---

## Eksperimen

- Buat timer dengan onMount/onDestroy
- Implementasikan context untuk theme
- Gunakan tick setelah state update
- Buat custom lifecycle hook

---

## Tantangan

Buat theme provider dengan context: setContext theme, useContext di child components.

---

## Ringkasan

Minggu 8 dari 10: **Lifecycle & Context** (Level: Menengah). Minggu depan: **Transitions & Animations**.
