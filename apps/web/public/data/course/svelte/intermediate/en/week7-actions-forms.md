# Actions & Forms

> **Kategori:** Svelte | **Level:** Intermediate | **Minggu 7:** Actions & Forms

## Learning Objectives

- Form actions: ?/create, ?/delete
- +page.server.js for server actions
- Form data with request.formData()
- Enhance form for progressive enhancement
- Return data from action

---

## Program: Form & API

```svelte
<!-- SvelteKit Actions: form submission ke server -->
<!-- +page.server.js -->
// export const actions = {
//   create: async ({ request }) => {
//     const data = await request.formData();
//     const name = data.get('name');
//     return { success: true, message: 'Berhasil' };
//   }
// };
<!-- +page.svelte (Form) -->
<script>
  export let form; // hasil dari action
</script>
<form method="POST" action="?/create">
  <input name="name" placeholder="Nama">
  <button type="submit">Simpan</button>
</form>
{#if form?.success}<p>{form.message}</p>{/if}
```

---

## Key Concepts

### Actions
Server-side form handling.

### Form Data
request.formData().

### Progressive Enhancement
Works without JS.

---

## Experiments

- Create form with multiple actions
- Implement server-side validation
- Add enhance for no-reload
- Create delete confirmation

---

## Challenge

Build a CRUD app with SvelteKit actions: create, read, update, delete posts.

---

## Summary

Week 7 of 10: **Actions & Forms** (Level: Intermediate). Next week: **Lifecycle & Context**.
