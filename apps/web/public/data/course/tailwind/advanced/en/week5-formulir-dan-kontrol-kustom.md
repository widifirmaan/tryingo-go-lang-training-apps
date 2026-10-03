# Modern Forms, Input Controls & Smooth Transitions

> **Kategori:** Tailwind CSS | **Level:** Custom Components, Design Systems & Production | **Minggu 5:** Modern Forms, Input Controls & Smooth Transitions

## Learning Objectives

- Author uniform form inputs leveraging pure Tailwind utilities
- Construct an interactive toggle switch via the peer modifier and peer-checked variants
- Employ the sr-only (Screen Reader Only) utility to preserve accessibility on custom controls
- Implement transparent transition halos across focus states and border dimensions
- Position primary and secondary action toolbars cleanly with Flexbox alignments

---

## Program: User Profile Settings Form with Visual Validation

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind Form & Input Controls</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 text-slate-800 min-h-screen p-8 font-sans flex items-center justify-center">

  <div class="max-w-xl w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
    <div class="border-b border-slate-100 pb-4">
      <h2 class="text-xl font-bold text-slate-900">Pengaturan Akun Insinyur</h2>
      <p class="text-sm text-slate-500">Perbarui informasi profil dan preferensi notifikasi cloud Anda.</p>
    </div>

    <form class="space-y-5">
      <!-- Input Teks Biasa -->
      <div>
        <label for="name" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nama Lengkap</label>
        <input type="text" id="name" value="Budi Pratama"
               class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/20 transition-all">
      </div>

      <!-- Select Dropdown -->
      <div>
        <label for="role" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Spesialisasi Rekayasa</label>
        <select id="role" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/20 transition-all">
          <option>Backend Systems (Go & Rust)</option>
          <option>Frontend Engineering (React & Tailwind)</option>
          <option>DevOps & Cloud Architecture</option>
        </select>
      </div>

      <!-- Toggle Switch Murni CSS Tailwind -->
      <div class="flex items-center justify-between pt-2">
        <div>
          <span class="text-sm font-semibold text-slate-900 block">Notifikasi Email Deployment</span>
          <span class="text-xs text-slate-500">Terima ringkasan log setiap kali pipeline produksi berhasil.</span>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked class="sr-only peer">
          <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-emerald-700"></div>
        </label>
      </div>

      <div class="pt-4 border-t border-slate-100 flex justify-end gap-3">
        <button type="button" class="px-5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
          Batal
        </button>
        <button type="submit" class="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold shadow-md transition-all active:scale-95">
          Simpan Perubahan
        </button>
      </div>
    </form>
  </div>

</body>
</html>
```

---

## Key Concepts

### The peer Modifier Pattern
While `group` responds to parent triggers, the `peer` modifier tracks **preceding sibling states**:
1. Apply `peer` to the visually hidden native checkbox (`sr-only peer`).
2. Decorate the adjacent sibling visual track with `peer-checked:bg-emerald-700` and `peer-checked:after:translate-x-full`.
When checked, the slider transitions smoothly to the active state with zero JavaScript!

### The sr-only Accessibility Standard
The `sr-only` utility removes elements from visual screen space while **retaining full accessibility for screen readers**. This is the professional standard for custom inputs.

---

---

## Beginner Friendly Explanation

### Analogy: A Concealed Lever Mechanism
1. **`sr-only`** is concealing a functional electrical breaker behind a painting: the breaker remains wired to the main grid, but the plastic faceplate is out of sight.
2. **`peer`** is mounting an elegant brass lever on the front: flicking the brass lever actuates the concealed switch behind it, lighting the room.

## Experiments

- Click the toggle slider to watch the white thumb glide rightward while the track illuminates emerald.
- Remove the sr-only class to reveal the raw browser checkbox control.
- Change peer-checked:bg-emerald-700 to peer-checked:bg-blue-600 to alter the active accent.
- Tab to the toggle switch using your keyboard and hit Space to toggle its state.

---

## Challenge

Build a "Change Password" form: author current and new password inputs, a visual password strength bar (3 indicators shifting from red, yellow, to green), and a "Trust this device" custom toggle.

---

## Summary

You have mastered interactive form controls and custom toggle mechanics with the peer modifier. Next week, we examine arbitrary values and advanced Tailwind configuration.
