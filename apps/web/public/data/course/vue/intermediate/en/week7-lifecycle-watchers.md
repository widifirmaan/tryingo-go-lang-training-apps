# Lifecycle & Watchers

> **Kategori:** Vue | **Level:** Intermediate | **Minggu 7:** Lifecycle & Watchers

## Learning Objectives

- onMounted: fetch data after component appears
- onUnmounted: cleanup
- watch: react to specific data changes
- watchEffect: auto-track dependencies
- Lifecycle: onUpdated, onBeforeMount

---

## Program: Data Fetching

```vue
// Lifecycle hooks = functions di tahap tertentu lifecycle komponen
const { createApp, ref, onMounted, onUnmounted, watch, watchEffect } = Vue;
const app = createApp({
  setup() {
    const users = ref([]); const loading = ref(true); const search = ref(''); const filteredUsers = ref([]);
    onMounted(() => { console.log('Mounted!'); fetchUsers(); });
    onUnmounted(() => { console.log('Unmounted!'); });
    watch(search, (newVal) => { filteredUsers.value = users.value.filter((u) => u.name.toLowerCase().includes(newVal.toLowerCase())); });
    watchEffect(() => { console.log('Search:', search.value); });
    function fetchUsers() { setTimeout(() => { users.value = [{ id: 1, name: 'Budi' }, { id: 2, name: 'Siti' }]; loading.value = false; }, 1000); }
    return { users, loading, search, filteredUsers };
  },
});
app.mount('#app');
console.log('Lifecycle & Watchers siap digunakan');
```

---

## Key Concepts

### Lifecycle Hooks
onMounted for fetch, onUnmounted for cleanup.

### Watch
Specific source watching.

### WatchEffect
Auto-track dependencies.

---

## Experiments

- Create timer with onMounted/onUnmounted
- Implement debounce search
- Watch nested object with deep: true
- Compare watch vs watchEffect

---

## Challenge

Build a user directory: fetch users, search filter, loading state, error handling.

---

## Summary

Week 7 of 12: **Lifecycle & Watchers** (Level: Intermediate). Next week: **Provide/Inject & Teleport**.
