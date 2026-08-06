# Events & Bindings

> **Kategori:** Svelte | **Level:** Beginner | **Minggu 4:** Events & Bindings

## Learning Objectives

- on:event for event handling
- bind:value for two-way binding
- Event modifiers: preventDefault, stopPropagation
- bind:checked for checkbox
- bind:group for radio/checkbox group

---

## Program: Interactive Form

```svelte
<!-- Events: on:event, Bindings: bind:property -->
<script>
  let name = "";
  let email = "";
  let errors = {};
  function validate() {
    errors = {};
    if (!name.trim()) errors.name = "Wajib diisi";
    if (!email.includes("@")) errors.email = "Tidak valid";
    return Object.keys(errors).length === 0;
  }
</script>
<form on:submit|preventDefault>
  <input bind:value={name} placeholder="Nama">
  {#if errors.name}<span class="error">{errors.name}</span>{/if}
  <input bind:value={email} placeholder="Email">
  {#if errors.email}<span class="error">{errors.email}</span>{/if}
  <button type="submit" disabled={!validate()}>Daftar</button>
</form>
```

---

## Key Concepts

### Events
on:click={handler}.

### Bindings
bind:value for two-way.

### Modifiers
|preventDefault, |stopPropagation.

---

## Experiments

- Create form with multiple input types
- Implement keyboard shortcuts
- Create custom event
- Add real-time form validation

---

## Challenge

Build a registration form with validation: name, email, password, confirm password.

---

## Summary

Week 4 of 10: **Events & Bindings** (Level: Beginner). Next week: **Stores**.
