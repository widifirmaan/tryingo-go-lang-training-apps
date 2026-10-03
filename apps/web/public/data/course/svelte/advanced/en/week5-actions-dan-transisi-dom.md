# Svelte Actions (use:action): Low-Level DOM Lifecycle & Rotary Knob Controls

> **Kategori:** Svelte | **Level:** Web Audio, Actions & Synthesizer Capstone | **Minggu 5:** Svelte Actions (use:action): Low-Level DOM Lifecycle & Rotary Knob Controls

## Learning Objectives

- Master Svelte Actions (use:action) as the canonical bridge for imperative DOM behaviors
- Author encapsulated Actions implementing full lifecycle contracts: mount, update, and destroy
- Construct tactile gesture-driven UI controls (rotary drag dials) for creative audio workflows
- Eliminate memory leak vulnerabilities by deregistering global window listeners inside destroy callbacks
- Synchronize reactive Svelte parameters with DOM Actions through the update() method

---

## Program: Synthesizer Rotary Knob Control with use:rotaryDrag Action

```svelte
<script>
  let cutoffFrekuensi = $state(1200); // 20 Hz - 20000 Hz

  // 1. Svelte Action: Fungsi siklus hidup DOM mandiri (node, parameter) => { update, destroy }
  function rotaryDrag(node, { min = 20, max = 5000, value, onChange }) {
    let startY = 0;
    let startVal = value;

    function onMouseDown(e) {
      startY = e.clientY;
      startVal = value;
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }

    function onMouseMove(e) {
      const deltaY = startY - e.clientY; // Geser ke atas = naik, ke bawah = turun
      const step = (max - min) / 200;    // Sensitivitas drag
      let newVal = Math.min(max, Math.max(min, startVal + deltaY * step));
      onChange(Math.round(newVal));
    }

    function onMouseUp() {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }

    node.addEventListener("mousedown", onMouseDown);

    return {
      update(newParams) {
        value = newParams.value;
      },
      destroy() {
        node.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      }
    };
  }
</script>

<div class="knob-container">
  <h4>Filter Cutoff (Action Dial)</h4>

  <!-- 2. Penggunaan use:action pada elemen DOM -->
  <div
    class="knob-dial"
    use:rotaryDrag={{
      min: 100,
      max: 5000,
      value: cutoffFrekuensi,
      onChange: (val) => (cutoffFrekuensi = val)
    }}
    style:--rotasi={`${((cutoffFrekuensi - 100) / 4900) * 270 - 135}deg`}
  >
    <div class="pointer"></div>
  </div>

  <div class="val-display">{cutoffFrekuensi} Hz</div>
  <small style="color: #71717a;">* Klik & drag mouse ke atas/bawah</small>
</div>

<style>
  .knob-container {
    max-width: 260px;
    margin: 20px auto;
    font-family: sans-serif;
    text-align: center;
    background: #18181b;
    color: white;
    padding: 20px;
    border-radius: 12px;
  }
  .knob-dial {
    width: 80px;
    height: 80px;
    background: #27272a;
    border: 3px solid #3f3f46;
    border-radius: 50%;
    margin: 16px auto;
    position: relative;
    cursor: ns-resize;
    transform: rotate(var(--rotasi));
    box-shadow: inset 0 2px 6px rgba(0,0,0,0.5);
  }
  .pointer {
    width: 4px;
    height: 18px;
    background: #38bdf8;
    position: absolute;
    top: 4px;
    left: calc(50% - 2px);
    border-radius: 2px;
  }
  .val-display { font-size: 20px; font-weight: bold; color: #38bdf8; }
</style>
```

---

## Key Concepts

### Understanding Svelte Actions
A Svelte Action is **an element-level lifecycle attachment declared via `use:actionName`**.
The Action receives the native HTML element handle (`node`) alongside parameter payloads.
Key strengths:
1. Bypasses bulky component wrapper wrappers.
2. Infinitely reusable: apply `use:rotaryDrag` to arbitrary DOM nodes.
3. Clean memory ergonomics: the `destroy()` hook fires automatically when the host node unmounts, guaranteeing flawless listener teardown.

---

---

## Beginner Friendly Explanation

### Analogy: Industrial Rotary Knobs on Valve Stems
**use:action** is fastening an ergonomic knurled metal dial directly onto an existing copper valve stem: you avoid rebuilding the furnace chassis (*no wrapper component needed*), simply anchoring the rotational interaction attachment (*use:rotaryDrag*) onto the native stem.

## Experiments

- Click and drag upward over the knob observing the pointer rotate clockwise reactively.
- Drag downward observing frequency values descend to the 100 Hz minimum bound.
- Inspect DevTools observing the inline CSS Variable --rotasi update during drags.
- Introduce custom drag sensitivity configuration parameters to the action.

---

## Challenge

Author a `use:longPress(duration, callback)` Action triggering an automated parameter reset to 1000 Hz when clicks hold beyond 1.5 seconds.

---

## Summary

You have mastered Svelte Actions and gesture DOM bindings. Next week, we examine Svelte Context and universal .svelte.js reactivity modules.
