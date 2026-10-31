# Transitions & Animations

> **Kategori:** Svelte | **Level:** Menengah | **Minggu 9:** Transitions & Animations

## Tujuan Pembelajaran

- transition: directive untuk enter/leave
- in: dan out: untuk separate transitions
- Built-in transitions: fade, fly, slide, scale
- each block animations dengan animate:flip
- Custom transition functions

---

## Program: Transitions, Animations & Motion

Transitions built-in (fade, fly), spring & tweened, dan animate flip untuk list reorder.

```svelte
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { spring, tweened, cubicOut } from 'svelte/motion';
  import { flip } from 'svelte/animate';

  let visible = $state(true);
  let items = $state(['alpha', 'beta', 'gamma']);
  let progress = tweened(0, { duration: 400, easing: cubicOut });
  let pos = spring({ x: 0, y: 0, stiffness: 0.3, damping: 0.8 });
  progress.set(100);
</script>

{#if visible}
  <div transition:fade={{ duration: 200 }}>Menghilang halus</div>
  <div in:fly={{ y: 20, duration: 300 }}>Masuk dari bawah</div>
{/if}
<button onclick={() => visible = !visible}>Toggle</button>

<ul>
  {#each items as item (item)}
    <li animate:flip={{ duration: 250 }}>{item}</li>
  {/each}
</ul>
<button onclick={() => items = items.slice().reverse()}>
    Balik urutan (FLIP animation)
</button>

<progress value={progress} max="100"></progress>
```

---

## Konsep Kunci

### In/out/custom transitions

transition: == enter+exit BOTH, in:/out: masing-masing arah. Parameters: duration, delay, easing (cubicOut).

### FLIP animate

animate:flip bekerja dengan keyed {#each}: Kalau order berubah, bersih rekruten (first last invert) animasi DOM reorder ikut alernative leadership.

### tweened vs spring

tweened menginterpolasi A→B dalam durasi tertentu; spring bergerak dengan fisika (stiffness/damping). Spring untuk drag, tweened untuk progress.

### CSS vs JS animasi

Untuk hover/active state, normal CSS animations & transitions sudah cukup; transitions Svelte untuk enter/exit DOM yang makin kompling.

---

## Eksperimen

- Ganti fade dengan scale berdurasi 600 ms.
- Setel stiffness/damping spring lalu rasakan perbedaannya saat toggle.
- Tambah item baru saat list sedang beranimasi — rasakan smoothnya FLIP.

---

## Tantangan

Bangun modal dengan transition:fly — buka lewat tombol, tutup saat klik overlay; pastikan koreografi masuk/keluar rapi.

---

## Ringkasan

Materi minggu ini telah dibahas: Transitions, Animations & Motion. Lanjut ke pekan berikutnya untuk memperdalam.
