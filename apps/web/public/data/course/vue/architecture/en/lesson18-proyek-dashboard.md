# Project: Mini Dashboard

> Vue | Architecture & State | Lesson 18

## Learning Objectives

- Integrate Pinia + Router + guards in one app
- Keep auth session in a global store
- Protect routes based on store state
- Structure the project: stores/, pages/, router/

---

## Program: Project: Mini Dashboard

```js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', () => {
  const user = ref(JSON.parse(localStorage.getItem('demo-user') ?? 'null'))

  const isLoggedIn = computed(() => user.value !== null)

  function login(name) {
    user.value = { name }
    localStorage.setItem('demo-user', JSON.stringify(user.value))
  }

  function logout() {
    user.value = null
    localStorage.removeItem('demo-user')
  }

  return { user, isLoggedIn, login, logout }
})

```

---

## Explanation

## Real App Architecture
The production pattern: `src/stores/` (global state: session, tasks), `src/pages/` (pages), `src/router/` (routes + guard). Pages never keep the user in local state — the guard needs the same store to judge access.

## Guard + Store
`router.beforeEach` reads `useSessionStore().isLoggedIn` — the store and the guard share one source of truth. This is the main reason auth lives in Pinia: all components and the router see the same state.

## Store Composition
One store per concern: `session` (auth) and `tasks` are separate. Stores talk to each other explicitly when needed (importing a store inside a store — rare). Never build one giant `useAppStore`.

## Checkpoint
Before moving on you must be able to: (1) build a login page storing the user globally, (2) protect routes with a guard reading the store, (3) log out by resetting state + redirecting. If unsure between local ref and store: ask "does this state need to survive navigation?".

---

## Experiments

1. **Arsitektur App Nyata**
2. **Guard + Store**
3. **Komposisi Store**
4. **Checkpoint**

---

## Challenge

Extend the dashboard: (1) admin vs user roles (login with an admin checkbox), (2) a /dashboard/settings page for admins only (guard reading meta + role), (3) persist tasks to localStorage. Commit each feature.

---

## Summary

Pinia + Router + guard = real app architecture. Session in a store, guard reads the store. One store per concern. Checkpoint: login/protect/logout. Next: production-grade.
