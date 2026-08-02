# v-model on Components

> Vue | Components & Communication | Lesson 10

## Learning Objectives

- Understand the v-model contract: modelValue + update:modelValue
- Build reusable inputs with v-model
- Use the computed getter/setter pattern
- Combine multiple v-models (v-model:name)

---

## Program: v-model on Components

```vue
<script setup>
import { ref } from 'vue'
import SearchInput from './components/SearchInput.vue'
import EditableTitle from './components/EditableTitle.vue'

const query = ref('')
const title = ref('Daftar Belanja')

const items = ref(['Vue', 'Vite', 'Pinia'])
</script>

<template>
  <h1>{{ title }}</h1>
  <EditableTitle v-model="title" />
  <SearchInput v-model="query" placeholder="Cari item..." />
  <ul>
    <li v-for="item in items" :key="item">
      {{ item }}
    </li>
  </ul>
</template>

```

---

## Explanation

## The v-model Contract
`v-model="x"` on a component = `:modelValue="x"` + `@update:modelValue="x = $event"`. That is all a component must implement: accept the modelValue prop, emit update:modelValue.

## Getter/Setter Pattern
For complex inputs, create a computed with get (read props.modelValue) and set (emit update). In the template just `v-model="value"` — clean, no manual `$event.target.value`.

## Multiple v-models
`v-model:title` + `v-model:body` bind two prop/event pairs: `title`/`update:title`, `body`/`update:body`. Great for multi-field forms wrapped in one component.

## Trap: Writing the Prop Directly
Never `props.modelValue = v` — that mutates props. The only correct way out is emitting update:modelValue; the parent then changes its own state.

---

## Experiments

1. **Kontrak v-model**
2. **Pola Getter/Setter**
3. **Beberapa v-model**
4. **Trap: Menulis Prop Langsung**

---

## Challenge

Build a reusable FormField: label, modelValue, type props; update emit. Use three FormFields (name, email, age) with plain v-model. Add simple validation: submit button disabled if any field is empty (computed in App).

---

## Summary

Component v-model = modelValue + update:modelValue. Getter/setter pattern for clean inputs. v-model:name for multi-field. Never mutate props. Next: slots.
