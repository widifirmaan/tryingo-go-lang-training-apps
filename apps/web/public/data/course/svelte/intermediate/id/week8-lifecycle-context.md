# Lifecycle & Context

> **Kategori:** Svelte | **Level:** Menengah | **Minggu 8:** Lifecycle & Context

## Tujuan Pembelajaran

- onMount: jalan setelah komponen di-mount
- onDestroy: cleanup sebelum komponen di-destroy
- beforeUpdate dan afterUpdate
- setContext dan getContext
- tick() untuk flush state changes

---

## Program: Lifecycle & Context API

Program onMount/onDestroy dan context (setContext/getContext) untuk tema & service ter-share.

```svelte
<script lang="ts">
  import { onMount, onDestroy, setContext, getContext } from 'svelte';

  let { sessionId = 'abc-42' } = $props();

  // === Lifecycle: mount/unmount ===
  let data = $state<string[]>([]);
  let ws = $state<WebSocket | null>(null);
  onMount(() => {
    // Browsers only! API DOM/subscription di sini
    data = ['initial', 'ready'];
    console.log('[mounted]', sessionId);
  });
  onDestroy(() => {
    console.log('[teardown] close SSE socket');
  });

  // === Context: berikan nilai ke subtree (theme toggle) ===
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
<button onclick={theme.toggle}>Ganti tema: {theme.theme}</button>
```

---

## Konsep Kunci

### SSR safety

onMount TIDAK berjalan di server - aman untuk localStorage/WebSocket; kode di <script> sendiri dieksekusi SSR (guard window).

### Cleanup pattern

onDestroy(ws.close()) mencegah leak saat komponen unmount - tangani juga timer, listener, dan AbortSignal.

### Context API

setContext di parent root, getContext di deep child TANPA mengepos props per lapisan; ideal untuk theme/i18n/service singleton.

### Reactive objects in context

Simpan obyek $state di dalam context supaya perubahan terpropagasi ke seluruh consumer.

---

## Eksperimen

- Pasang listener window resize di onMount lalu lepas di onDestroy.
- Simpan pilihan tema ke localStorage saat toggle.
- Buat context 'notifications' dengan add()/list() dipakai dua komponen.

---

## Tantangan

Buat context 'userService' berisi fetch async dengan cache per user; konsumsi di sidebar dan header.

---

## Ringkasan

Materi minggu ini telah dibahas: Lifecycle & Context API. Lanjut ke pekan berikutnya untuk memperdalam.
