# Form Validation & Error Handling

> Vue | Production-Grade | Lesson 19

## Learning Objectives

- Validate forms with computed errors
- Show errors on blur (touched)
- Build an ErrorBoundary with onErrorCaptured
- Handle global errors with app.config.errorHandler

---

## Program: Form Validation & Error Handling

```vue
<script setup>
import { ref, computed } from 'vue'
import ErrorBoundary from './components/ErrorBoundary.vue'
import ProfileForm from './components/ProfileForm.vue'
</script>

<template>
  <h1>Validasi & Error Handling</h1>
  <ErrorBoundary>
    <ProfileForm />
  </ErrorBoundary>
</template>

```

---

## Explanation

## Validation = Derived State
Errors are computed from state, not stored separately — one source of truth. The `errors` object + `touched` pattern distinguishes "not filled" from "touched, then wrong".

## When to Show Errors
Show errors only after blur (the user left the field) or after a failed submit — not while typing (distracting). Disable the submit button when errors exist (`:disabled="!isValid"`).

## ErrorBoundary
`onErrorCaptured` in a component catches errors from child components and swaps in a fallback UI (preventing blank screens). Returning `false` stops propagation. This mirrors error boundaries in other frameworks.

## Global Errors
`app.config.errorHandler = (err) => ...` catches errors no component handled (failed fetches in composables, etc.). Combination: ErrorBoundary per critical area + a global errorHandler for logging.

---

## Experiments

1. **Validasi = Turunan State**
2. **Kapan Tampil Error**
3. **ErrorBoundary**
4. **Error Global**

---

## Challenge

Build a full checkout form: name, email, address, zip (5-digit validation), phone (10+ digits). All errors computed. Show an error summary above the form after a failed submit. Wrap it in an ErrorBoundary that throws a manual error (throw) for testing.

---

## Summary

Errors = computed from state. Shown on touched/blur. ErrorBoundary (onErrorCaptured) + global errorHandler. Next: transitions & teleport.
