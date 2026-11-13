# Lifecycle & Context

## Learning Objectives

- onMount: runs after mount
- onDestroy: cleanup before destroy
- beforeUpdate and afterUpdate
- setContext and getContext
- tick() to flush state changes

---

## Program: Lifecycle & the Context API

The program covers onMount/onDestroy and context (setContext/getContext) for shared services like theming.

```svelte
<script lang="ts">
  import { onMount, onDestroy, setContext, getContext } from 'svelte';

  export let sessionId = 'abc-42';

  let data = $state<string[]>([]);
  onMount(() => {
    // Browser only! DOM APIs / subscriptions here
    data = ['initial', 'ready'];
    console.log('[mounted]', sessionId);
  });
  onDestroy(() => {
    console.log('[teardown] closing socket');
  });

  // === Context API (theming) ===
  const themeCtx = $state({ theme: 'dark' });
  setContext('theme', {
    get theme() { return themeCtx.theme; },
    toggle() { themeCtx.theme = themeCtx.theme === 'dark' ? 'light' : 'dark'; }
  });
</script>

<!-- ThemeButton.svelte -->
<script lang="ts">
  import { getContext } from 'svelte';
  const theme = getContext('theme');
</script>
<button onclick={theme.toggle}>Switch theme: {theme.theme}</button>
```

---

## Key Concepts

### SSR safety

onMount TIDAK berjalan di server - aman untuk localStorage/WebSocket; kode di <script> sendiri dieksekusi SSR (guard window).

### Cleanup pattern

onDestroy(ws.close()) mencegah leak saat komponen unmount - tangani juga timer, listener, dan AbortSignal.

### Context API

setContext di parent root, getContext di deep child TANPA mengepos props per lapisan; ideal untuk theme/i18n/service singleton.

### Reactive objects in context

Simpan obyek $state di dalam context supaya perubahan terpropagasi ke seluruh consumer.

---

## Experiments

- Attach a window resize listener in onMount, remove it in onDestroy.
- Persist the theme choice with localStorage on toggle.
- Add a notifications context with add()/list().

---

## Challenge

Build a "userService" context with cached async fetchers; consume it in both the sidebar and header.

---

## Summary

This week's material has been covered: Lifecycle & the Context API. Continue to the following week to deepen.
