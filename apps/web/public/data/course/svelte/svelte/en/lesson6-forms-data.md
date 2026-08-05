# Forms & Data Fetching

> Svelte | Lesson 6

## Learning Objectives

- Understand form handling in Svelte with bind:value and on:submit\n- Implement simple form validation\n- Use preventDefault to prevent page reload\n- Show conditional success message after submit

---

## Program: Svelte

```svelte
<script>
  let name = "";
  let email = "";
  let message = "";
  let submitted = false;
  let errors = {};

  function validate() {
    errors = {};
    if (!name.trim()) errors.name = "Nama wajib diisi";
    if (!email.trim() || !email.includes("@")) errors.email = "Email tidak valid";
    if (!message.trim()) errors.message = "Pesan wajib diisi";
    return Object.keys(errors).length === 0;
  }

  function handleSubmit() {
    if (validate()) {
      submitted = true;
      console.log({ name, email, message });
    }
  }
</script>

<h1>Svelte Forms & Data</h1>

{#if !submitted}
  <form on:submit|preventDefault={handleSubmit}>
    <label>Nama:</label>
    <input type="text" bind:value={name} />
    {#if errors.name}<span class="error">{errors.name}</span>{/if}

    <label>Email:</label>
    <input type="email" bind:value={email} />
    {#if errors.email}<span class="error">{errors.email}</span>{/if}

    <label>Pesan:</label>
    <textarea bind:value={message}></textarea>
    {#if errors.message}<span class="error">{errors.message}</span>{/if}

    <button type="submit">Kirim</button>
  </form>
{:else}
  <p>Terima kasih, {name}! Pesan Anda telah dikirim.</p>
{/if}
```

---

## Explanation

## Form Handling
on:submit|preventDefault={handleSubmit} — handles submit without page reload. bind:value={name} — two-way binding.
## Validation
Validation done in JavaScript before submit. Errors stored in object and displayed conditionally.
## Data Fetching
fetch("https://api.example.com/data") — fetches data from API. Use onMount for fetch on component mount.
## Loading State
{#if loading}<p>Loading...</p>{/if} — shows loading state while fetching data.

---

## Experiments

1. **## Form Handling
on:submit|preventDefault={handleSubmit} — handles submit without page reload. bind:value={name} — two-way binding.
## Validation
Validation done in JavaScript before submit. Errors stored in object and displayed conditionally.
## Data Fetching
fetch("https://api.example.com/data") — fetches data from API. Use onMount for fetch on component mount.
## Loading State
{#if loading}<p>Loading...</p>{/if} — shows loading state while fetching data.**

---

## Challenge

Level up forms & data: (1) add form with async validation (check duplicate email via API), (2) create file upload form with preview, (3) add data fetching from public API (JSONPlaceholder), (4) create search form with debounce.

---

## Summary

Form = bind:value + on:submit|preventDefault. Validation = JS object. Fetch = onMount + fetch. Next: reusable components.
