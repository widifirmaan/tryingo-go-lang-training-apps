# Reusable Components

> Svelte | Lesson 7

## Learning Objectives

- Understand reusable components with $props() and {@render}\n- Create slots for component composition\n- Import and use components in other components\n- Use props for component customization

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

## Explanation

## $props()
$props() — receives all props from parent. Svelte 5 uses $props() instead of export let.
## {@render children()}
{@render children()} — render slot content from parent. Similar to <slot> in Svelte 4.
## Component Composition
Import component with import Card from "./Card.svelte". Use as HTML element: <Card><p>Content</p></Card>.
## Props Customization
Props allow component reuse with different data. <Card title="X" color="red"> vs <Card title="Y" color="blue">.

---

## Experiments

1. **## $props()
$props() — receives all props from parent. Svelte 5 uses $props() instead of export let.
## {@render children()}
{@render children()} — render slot content from parent. Similar to <slot> in Svelte 4.
## Component Composition
Import component with import Card from "./Card.svelte". Use as HTML element: <Card><p>Content</p></Card>.
## Props Customization
Props allow component reuse with different data. <Card title="X" color="red"> vs <Card title="Y" color="blue">.**

---

## Challenge

Level up reusable components: (1) create a Modal component with header/body/footer slots, (2) create a Table component with columns and data props, (3) create a Badge component with variant props (primary/success/warning/danger), (4) create an Input component with label, validation, and error message.

---

## Summary

$props() = receive props. {@render children()} = slot. Import = use components. Next: state management.
