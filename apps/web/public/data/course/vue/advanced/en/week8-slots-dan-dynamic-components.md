# Advanced Components: Scoped Slots, Dynamic Components & KeepAlive

> **Kategori:** Vue | **Level:** Advanced Slots, Animations, Optimization & CRM Capstone | **Minggu 8:** Advanced Components: Scoped Slots, Dynamic Components & KeepAlive

## Learning Objectives

- Master component transclusion paradigms deploying flexible Vue Slots
- Utilize Named Slots (v-slot:header or #header shorthand) for structured multi-zone layouts
- Master Scoped Slots streaming internal child state back up into parent template scopes
- Deploy dynamic component rendering via the meta element <component :is="activeTab">
- Envelop dynamic views in <KeepAlive> preserving scroll state and form inputs across tab toggles

---

## Program: Customizable CRM Dashboard Widget System with Scoped Slots & KeepAlive

```vue
<!-- ===================================================================== -->
<!-- File: WidgetContainer.vue (Komponen Pembungkus dengan Scoped Slots)       -->
<!-- ===================================================================== -->
<script setup>
import { ref } from "vue";

defineProps({
  judul: String
});

const isCollapsed = ref(false);
const waktuDiperbarui = ref(new Date().toLocaleTimeString("id-ID"));

function refreshWidget() {
  waktuDiperbarui.value = new Date().toLocaleTimeString("id-ID");
}
</script>

<template>
  <div style="border: 1px solid #cbd5e1; border-radius: 8px; background: white; margin-bottom: 16px;">
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid #f1f5f9;">
      <!-- Named Slot: Header Kustom -->
      <slot name="header" :judul="judul">
        <h4 style="margin: 0;">{{ judul }}</h4>
      </slot>

      <div style="display: flex; gap: 8px;">
        <button @click="refreshWidget" style="font-size: 11px; cursor: pointer;">↻ Refresh</button>
        <button @click="isCollapsed = !isCollapsed" style="font-size: 11px; cursor: pointer;">
          {{ isCollapsed ? "Buka" : "Tutup" }}
        </button>
      </div>
    </div>

    <!-- Scoped Slot Default: Mengalirkan data waktuDiperbarui ke Parent -->
    <div v-show="!isCollapsed" style="padding: 16px;">
      <slot :terakhirSync="waktuDiperbarui">
        <p style="color: #94a3b8; font-size: 13px;">Tidak ada konten widget.</p>
      </slot>
    </div>
  </div>
</template>
```

---

## Key Concepts

### Scoped Slots: Vue's Most Powerful Inversion of Control
In vanilla slots, parents simply project static markup into children.
With **Scoped Slots**, children **pass internal state tokens back up to the parent template scope**!
In an enterprise data table: the child manages sorting algorithms and pagination, yielding current rows to the parent via `<template #default="{ row }">`.
The parent enjoys complete freedom styling badges, avatars, or actions without hacking internal table code!

### Dynamic Components & `<KeepAlive>`
When managing tabbed dashboard layouts (Leads Tab, Deals Tab, Contacts Tab):
Avoid verbose cascades of `v-if` / `v-else-if`. Deploy `<component :is="activeTab" />`.
Enclosing the dynamic view inside `<KeepAlive>` ensures:
When users switch from Tab 1 to Tab 2 and back, **uncommitted form inputs remain pristine**, because Vue suspends the component in memory rather than unmounting it!

---

---

## Beginner Friendly Explanation

### Analogy: Modular Picture Frames & Reserved Theater Seats
1. **Scoped Slots** are precision picture frames: the manufacturer supplies the mahogany moulding (*container component*), while you insert graduation portraits or modern oil paintings into the aperture. The frame communicates dimensions (*slot props*).
2. **KeepAlive** is leaving your jacket draped over a theater seat while buying popcorn: upon returning, your seat position remains reserved exactly as you left it.

## Experiments

- Use #header="{ judul }" in the parent template rendering a custom styled red header.
- Consume the scoped terakhirSync prop rendering an updated timestamp badge in the card footer.
- Benchmark tab transitions with and without <KeepAlive> to observe state retention versus destruction.
- Drive dynamic components with a dropdown select switching between 3 distinct dashboard widgets.

---

## Challenge

Build a `DataTable.vue` component employing Scoped Slots to render dynamic table cells, allowing parents to inject customized status badge styling.

---

## Summary

You have mastered Scoped Slots, dynamic components, and KeepAlive caching. Next week, we examine Teleport, Transitions, and Performance Tuning.
