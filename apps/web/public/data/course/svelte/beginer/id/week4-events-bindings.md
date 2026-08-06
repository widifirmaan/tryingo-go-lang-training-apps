# Events & Bindings

> **Kategori:** Svelte | **Level:** Pemula | **Minggu 4:** Events & Bindings

## Tujuan Pembelajaran

- on:event untuk event handling
- bind:value untuk two-way binding
- Event modifiers: preventDefault, stopPropagation
- bind:checked untuk checkbox
- bind:group untuk radio/checkbox group

---

## Program: Form Interaktif

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

## Konsep Kunci

### Events
on:click={handler}. Shorthand: on:click.

### Bindings
bind:value = two-way. Input -> state, state -> input.

### Modifiers
|preventDefault, |stopPropagation, |once, |self.

---

## Eksperimen

- Buat form dengan multiple input types
- Implementasikan keyboard shortcuts
- Buat custom event
- Tambah form validation real-time

---

## Tantangan

Buat registration form dengan validasi: nama, email, password, konfirmasi password.

---

## Ringkasan

Minggu 4 dari 10: **Events & Bindings** (Level: Pemula). Minggu depan: **Stores**.
