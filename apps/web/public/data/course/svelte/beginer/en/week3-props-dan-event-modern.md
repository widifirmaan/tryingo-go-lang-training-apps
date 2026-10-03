# Modern Svelte 5 Components: $props, Fallbacks & Callback Functions

> **Kategori:** Svelte | **Level:** Svelte 5 Runes & Compiler Reactivity | **Minggu 3:** Modern Svelte 5 Components: $props, Fallbacks & Callback Functions
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Migrate from legacy export let declarations to the modern Svelte 5 $props() Rune
- Declare fallback prop defaults cleanly leveraging native JavaScript destructuring
- Replace cumbersome createEventDispatcher boilerplates with clean callback props (onTrigger)
- Inject dynamic CSS Custom Properties directly into styling blocks via style:--css-var directives
- Construct tactile audio buttons featuring low-latency visual feedback transitions

---

## Program: Synthesizer Drum Pad Button with Modern $props & Visual Feedback

```svelte
<!-- ===================================================================== -->
<!-- File: DrumPad.svelte (Komponen Pad Drum Modern Svelte 5)                 -->
<!-- ===================================================================== -->
<script>
  // 1. Svelte 5 $props: Menggantikan sintaks lama 'export let nama'
  // Destrukturisasi dengan nilai default langsung di dalam fungsi!
  let {
    label = "Kick",
    tombolShortcut = "Q",
    warnaAksen = "#ec4899",
    suaraSampleUrl = "",
    onTrigger = () => {} // Callback function menggantikan createEventDispatcher lama!
  } = $props();

  let isSedangDitekan = $state(false);

  function triggerPad() {
    isSedangDitekan = true;
    onTrigger({ label, waktu: Date.now() });

    setTimeout(() => {
      isSedangDitekan = false;
    }, 150);
  }
</script>

<button
  class="drum-pad"
  class:pressed={isSedangDitekan}
  style:--accent-color={warnaAksen}
  onclick={triggerPad}
>
  <span class="shortcut">[{tombolShortcut}]</span>
  <span class="label">{label}</span>
</button>

<style>
  .drum-pad {
    width: 100px;
    height: 100px;
    background: #18181b;
    border: 2px solid #27272a;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justifyContent: center;
    align-items: center;
    gap: 6px;
    transition: all 0.08s ease;
  }
  .drum-pad:hover { border-color: var(--accent-color); }
  .drum-pad.pressed {
    background: var(--accent-color);
    color: black;
    transform: scale(0.94);
    box-shadow: 0 0 16px var(--accent-color);
  }
  .shortcut { font-size: 11px; color: #a1a1aa; }
  .label { font-weight: bold; font-size: 14px; }
</style>
```

---

## Key Concepts

### Why Svelte 5 Deprecated `export let`
In legacy Svelte versions, props declared via `export let title = 'Default'`.
Using `export` baffled newcomers because standard JavaScript semantics imply exporting values out, whereas the component was **accepting values inward**.

In **Svelte 5**:
All incoming contracts resolve via the **`$props()`** Rune:
`let { title = "Default", active = false } = $props();`
This aligns with native JavaScript destructuring ergonomics with first-class TypeScript inference!

### Goodbye `createEventDispatcher`
In Svelte 5, the legacy `createEventDispatcher` package is obsolete.
Simply pass **plain callback functions** as props:
`<DrumPad onTrigger={(payload) => playSample(payload)} />`
Simpler, faster, and completely typed without runtime abstraction overhead.

---

---

## Beginner Friendly Explanation

### Analogy: Industrial Pushbuttons & Terminal Blocks
1. **$props** is the rear wiring terminal block of an industrial push button: labelled terminals accept 'LED Color' (*warnaAksen*) and 'Sample Source' (*suaraSampleUrl*).
2. **Callback onTrigger** is the relay signal wire: when an operator hits the button, the terminal emits a pulse to the master sequencer (*onTrigger executes*).

## Experiments

- Instantiate DrumPad with distinct accent colors (e.g. warnaAksen="#3b82f6") to observe dynamic styling.
- Click the pad observing tactile scale transitions and vibrant glow flashes.
- Bind a window keydown event triggering triggerPad() when keyboard letter Q is struck.
- Omit props from the parent to confirm default fallbacks populate flawlessly.

---

## Challenge

Build a 4x4 drum pad grid (16 pads) mapping unique percussion samples (Kick, Snare, HiHat, Clap) recording hit history into an array state.

---

## Visual Mental Model & Architecture Flow

![Diagram Universal Signals & Svelte 5 Runes State Flow](/diagrams/react-data-flow.svg)

```diagram
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `const / let variables`
- **Core Functionality:** Modern block-scoped variable declarations.
- **Parameters / Attributes:** `Identifier, Initial Value`.
- **System Behavior & Return:** `const` defines immutable references; `let` defines reassignable state variables bounded to enclosing blocks.
- **Practical Code Example:**
```javascript
const title = 'Tryngo Learning';
let counter = 0;
counter += 1;
console.log(title, counter);
```
- **Expected Execution Output:**
```text
Tryngo Learning 1
```

### 2. `() => { ... } (Arrow Function)`
- **Core Functionality:** Compact function expression with lexical 'this'.
- **Parameters / Attributes:** `Parameters, Function Body`.
- **System Behavior & Return:** Provides concise function syntax while retaining the lexical `this` binding of the outer enclosing scope.
- **Practical Code Example:**
```javascript
const double = (n) => n * 2;
console.log(double(21));
```
- **Expected Execution Output:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Core Functionality:** Linear asynchronous Promise resolution.
- **Parameters / Attributes:** `URL string, RequestInit options`.
- **System Behavior & Return:** Author asynchronous asynchronous workflows sequentially without callback pyramids.
- **Practical Code Example:**
```javascript
async function getUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return await res.json();
}
```
- **Expected Execution Output:**
```text
Returns resolved JSON object from server
```

### 4. `Array.prototype.map() / filter()`
- **Core Functionality:** Pure functional array transformation.
- **Parameters / Attributes:** `callback(item, index, array)`.
- **System Behavior & Return:** `map` returns transformed values; `filter` removes non-matching elements without mutating the original array.
- **Practical Code Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);
```
- **Expected Execution Output:**
```text
[2, 4]
```


---

## Common Pitfalls & Debugging Tips

### 1. In-Place Array Mutation Without Assignment
- **Symptom / Issue:** Calling `arr.push()` fails to trigger reactive UI updates in Svelte.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Reassign the array reference: `arr = [...arr, newItem]` to signal reactivity.

### 2. Store Subscription Memory Leaks
- **Symptom / Issue:** Manual store subscriptions that are never cancelled consume memory indefinitely.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use Svelte auto-subscriptions with the `$` prefix (`$myStore`).

### 3. Runes State Boundaries
- **Symptom / Issue:** Passing reactive signals across module borders without `$state()` or `$derived()` signals.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use modern Svelte 5 runes consistently.

---

## Summary

You have mastered modern $props, fallbacks, and callback props. Next week, we examine Svelte 5 Snippets and control flow.
