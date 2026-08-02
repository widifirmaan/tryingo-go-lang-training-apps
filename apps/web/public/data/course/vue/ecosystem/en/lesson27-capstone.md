# Capstone: SaaS Starter

> Vue | Ecosystem & Capstone | Lesson 27

## Learning Objectives

- Build the capstone with every learned pattern
- Run the cycle: feature → test → commit → deploy
- Apply auth, route protection, dark mode
- Present the result as portfolio

---

## Program: Capstone: SaaS Starter

```vue
<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>

<template>
  <nav>
    <RouterLink to="/">Beranda</RouterLink>
    <RouterLink to="/dashboard">Dashboard</RouterLink>
    <button @click="isDark = !isDark">Tema</button>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

```

---

## Explanation

## Final Checkpoint
The capstone is a SaaS starter combining: Pinia session (auth + persist), router guard (protection + redirect), VueUse (dark mode), and clean component patterns. You must be able to explain every line — if not, revisit the related lesson.

## The Professional Cycle
Bootcamp workflow: work on ONE feature → write tests for its logic → commit (clear message) → continue. Not writing everything then committing once. A clean git history is proof of work you can show recruiters.

## Capstone Extensions
Common additions: i18n (t() + locale switch), reusable UI components (Modal, Toast, Tabs from lesson 12), a 404 page, empty states for all lists, and an error boundary. Pick 2-3, not all of them.

## Into the Portfolio
Deploy (lesson 26), write a README: what the app is, stack, features, how to run. Screenshot + demo URL. One finished, polished app beats five half-finished ones. Congratulations — you are now a Vue Developer.

---

## Experiments

1. **Checkpoint Akhir**
2. **Siklus Profesional**
3. **Ekspansi Capstone**
4. **Jadi Portfolio**

---

## Challenge

Plan and execute: (1) 3 new features on top of this starter (e.g. notes CRUD with persist, a user profile, a 404 page), (2) Vitest tests for 2 stores/logic, (3) id/en i18n, (4) deploy + README. Goal: every capstone checklist item checked.

---

## Summary

The capstone covers every phase. Cycle: feature → test → commit. Auth + guard + dark mode. Deploy + README = portfolio. Congratulations, you are a Vue Developer!
