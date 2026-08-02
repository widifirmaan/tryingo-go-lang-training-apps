# Forms & v-model

> Vue | Vue Foundations | Lesson 5

## Learning Objectives

- Bind inputs with v-model (two-way binding)
- Understand v-model = :value + @input
- Use the .trim / .number / .lazy modifiers
- Use v-model on checkboxes, selects, textareas

---

## Program: Forms & v-model

```vue
<script setup>
import { ref, computed } from 'vue'

const name = ref('')
const email = ref('')
const level = ref('beginner')
const interests = ref(['vue'])
const bio = ref('')
const agree = ref(false)

const charCount = computed(() => bio.value.length)

const summary = computed(() => ({
  name: name.value,
  email: email.value,
  level: level.value,
  interests: interests.value,
  agree: agree.value,
}))
</script>

<template>
  <h1>Profil Belajar</h1>
  <form @submit.prevent>
    <label>Nama: <input v-model.trim="name" placeholder="Nama kamu" /></label>
    <label>Email: <input v-model.trim="email" type="email" /></label>
    <label>
      Level:
      <select v-model="level">
        <option value="beginner">Pemula</option>
        <option value="intermediate">Menengah</option>
        <option value="advanced">Lanjutan</option>
      </select>
    </label>
    <fieldset>
      <legend>Minat:</legend>
      <label><input type="checkbox" value="vue" v-model="interests" /> Vue</label>
      <label><input type="checkbox" value="ts" v-model="interests" /> TypeScript</label>
      <label><input type="checkbox" value="nuxt" v-model="interests" /> Nuxt</label>
    </fieldset>
    <label>
      Bio:
      <textarea v-model="bio" rows="3"></textarea>
      ({{ charCount }} karakter)
    </label>
    <label><input type="checkbox" v-model="agree" /> Setuju syarat</label>
  </form>

  <h2>Pratinjau Langsung</h2>
  <pre>{{ summary }}</pre>
  <p v-if="agree">Siap belajar! 👋</p>
</template>

<style scoped>
label, fieldset { display: block; margin: 0.6rem 0; }
pre { background: #f4f4f4; padding: 1rem; border-radius: 8px; }
</style>

```

---

## Explanation

## v-model = Two Ways
`v-model` reads the input value AND writes state back as the user types — syntactic sugar for `:value` + `@input`. State changes are reflected instantly (e.g. live preview).

## Modifiers
`.trim` strips leading/trailing whitespace automatically (great for names/emails), `.number` casts the input to a number (not a string), `.lazy` syncs state on the change event instead of every keystroke.

## Different Input Types
Checkbox: `v-model` is a boolean (or an array with `value` for multi-select — see interests). Select: `v-model` binds to the `value` of options. Textarea: behaves like a plain text input.

## Trap: Number vs String
Without `.number`, `<input type="number">` still yields a string ("12", not 12). The comparison `age > 18` misbehaves when age = "9" vs 18 (strings compare lexicographically). Use `.number` or parse explicitly.

---

## Experiments

1. **v-model = Dua Arah**
2. **Modifiers**
3. **Tipe Input Berbeda**
4. **Trap: Number vs String**

---

## Challenge

Build a mini checkout form: name, address, item count (with .number), payment method (radio). Show a live order summary. Disable the "Pay" button while the form is incomplete (computed).

---

## Summary

v-model = :value + @input. .trim/.number/.lazy. Checkbox boolean/array, select, textarea. No .number = string! Next: computed & watch.
