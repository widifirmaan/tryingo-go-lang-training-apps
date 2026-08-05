# Reusable Components

> Svelte | Pelajaran 7

## Tujuan Pembelajaran

- Memahami reusable components dengan $props() dan {@render}\n- Membuat slot untuk component composition\n- Mengimpor dan menggunakan komponen di komponen lain\n- Menggunakan props untuk customisasi komponen

---

## Program: Svelte

```svelte
<script>
  import Card from "./components/Card.svelte";
  import Button from "./components/Button.svelte";

  const cards = [
    { title: "Svelte 5", desc: "Runes reactivity", color: "#FF3E00" },
    { title: "Performance", desc: "No virtual DOM", color: "#4FC08D" },
    { title: "Developer Experience", desc: "Less boilerplate", color: "#7BA3BE" },
  ];
</script>

<h1>Reusable Components</h1>

{#each cards as card (card.title)}
  <Card title={card.title} description={card.desc} color={card.color}>
    <Button slot="action" on:click={() => alert(card.title)}>
      Learn More
    </Button>
  </Card>
{/each}
```

---

## Penjelasan

## $props()
$props() — menerima semua props dari parent. Svelte 5 menggunakan $props() menggantikan export let.
## {@render children()}
{@render children()} — render slot content dari parent. Mirip dengan <slot> di Svelte 4.
## Component Composition
Impor komponen dengan import Card from "./Card.svelte". Gunakan sebagai elemen HTML: <Card><p>Content</p></Card>.
## Props Customization
Props memungkinkan komponen digunakan ulang dengan data berbeda. <Card title="X" color="red"> vs <Card title="Y" color="blue">.

---

## Eksperimen

1. **## $props()
$props() — menerima semua props dari parent. Svelte 5 menggunakan $props() menggantikan export let.
## {@render children()}
{@render children()} — render slot content dari parent. Mirip dengan <slot> di Svelte 4.
## Component Composition
Impor komponen dengan import Card from "./Card.svelte". Gunakan sebagai elemen HTML: <Card><p>Content</p></Card>.
## Props Customization
Props memungkinkan komponen digunakan ulang dengan data berbeda. <Card title="X" color="red"> vs <Card title="Y" color="blue">.**

---

## Tantangan

Tingkatkan reusable components: (1) buat komponen Modal dengan slot header/body/footer, (2) buat komponen Table dengan props columns dan data, (3) buat komponen Badge dengan props variant (primary/success/warning/danger), (4) buat komponen Input dengan label, validation, dan error message.

---

## Ringkasan

$props() = terima props. {@render children()} = slot. Import = gunakan komponen. Lanjut: state management.
