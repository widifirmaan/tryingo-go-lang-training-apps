# Asynchronous Programming and Timers

> **Category:** JavaScript | **Level:** Asynchronous, Storage & Final Project | **Week 10:** Asynchronous Programming and Timers
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Distinguish synchronous blocking execution from asynchronous non-blocking pipelines
- Understand the Event Loop architecture: Call Stack, Web APIs, Callback Queue
- Deploy setTimeout() for deferred one-shot task execution
- Control recurring intervals using setInterval() and clearInterval()
- Construct a precision stopwatch with lap logging functionality

---

## 1. Synchronous vs Asynchronous Models

JavaScript runs on a **Single-Threaded execution model**:
- **Synchronous (Blocking)**: Instructions execute sequentially. Heavy processes freeze UI rendering.
- **Asynchronous (Non-Blocking)**: Long-running operations offload to Web APIs, keeping main threads responsive.

---

## 2. Event Loop Architecture

```text
┌─────────────────┐       ┌──────────────────────┐
│   CALL STACK    │  ──►  │       WEB APIs       │
│ (Active frames) │       │ (Timers, Network)    │
└────────┬────────┘       └──────────┬───────────┘
         │                           │
         │   ┌───────────────────┐   │
         └───┤    EVENT LOOP     │◄──┘
             └─────────┬─────────┘
                       │
             ┌─────────▼─────────┐
             │  CALLBACK QUEUE   │
             │ (Pending tasks)   │
             └───────────────────┘
```

---

## 3. Timer Primitives: `setTimeout` vs `setInterval`

### A. `setTimeout(fn, delayMs)`
Fires callbacks once after specified elapsed milliseconds:
```javascript
const timerId = setTimeout(() => {
  console.log("Fired after 2000ms");
}, 2000);

clearTimeout(timerId); // Cancels pending execution
```

### B. `setInterval(fn, intervalMs)`
Recursively dispatches callbacks at recurring intervals:
```javascript
let count = 0;
const intervalId = setInterval(() => {
  count++;
  if (count === 5) clearInterval(intervalId);
}, 1000);
```

---

## Program: Precision Chronograph Stopwatch with Lap Recorder

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Asinkron dan Timer</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF9;
      color: #2D3748;
      padding: 32px;
      line-height: 1.5;
    }

    .container {
      max-width: 440px;
      margin: 0 auto;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.04);
      text-align: center;
    }

    h3 {
      color: #2E5B44;
      font-size: 20px;
      margin-bottom: 20px;
    }

    .time-display {
      font-family: "Courier New", Courier, monospace;
      font-size: 44px;
      font-weight: 800;
      color: #2E5B44;
      background-color: #F7FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 20px;
      letter-spacing: 2px;
    }

    .btn-row {
      display: flex;
      gap: 8px;
      justify-content: center;
      margin-bottom: 20px;
    }

    .btn {
      padding: 10px 18px;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.15s ease;
    }

    .btn-start { background-color: #2E5B44; color: white; }
    .btn-pause { background-color: #DD6B20; color: white; }
    .btn-lap { background-color: #3182CE; color: white; }
    .btn-reset { background-color: #E2E8F0; color: #4A5568; }

    .lap-list {
      list-style: none;
      max-height: 140px;
      overflow-y: auto;
      border-top: 1px solid #E2E8F0;
      padding-top: 12px;
      text-align: left;
      font-size: 13px;
    }

    .lap-item {
      display: flex;
      justify-content: space-between;
      padding: 4px 8px;
      border-radius: 4px;
    }

    .lap-item:nth-child(even) { background-color: #F7FAFC; }
  </style>
</head>
<body>

  <div class="container">
    <h3>Stopwatch Asinkron Mandiri</h3>

    <div id="display" class="time-display">00:00.00</div>

    <div class="btn-row">
      <button id="btn-toggle" class="btn btn-start" onclick="toggleStart()">Mulai</button>
      <button id="btn-lap" class="btn btn-lap" onclick="catatLap()" disabled>Lap</button>
      <button class="btn btn-reset" onclick="resetStopwatch()">Reset</button>
    </div>

    <ul id="lap-container" class="lap-list"></ul>
  </div>

  <script>
    let waktuMulai = 0;
    let waktuTertunda = 0;
    let timerInterval = null;
    let lapCount = 0;

    function formatWaktu(ms) {
      const menit = Math.floor(ms / 60000);
      const detik = Math.floor((ms % 60000) / 1000);
      const centi = Math.floor((ms % 1000) / 10);

      const mm = String(menit).padStart(2, "0");
      const ss = String(detik).padStart(2, "0");
      const cc = String(centi).padStart(2, "0");

      return `${mm}:${ss}.${cc}`;
    }

    function perbaruiTampilan() {
      const sekarang = Date.now();
      const selisih = sekarang - waktuMulai + waktuTertunda;
      document.getElementById("display").textContent = formatWaktu(selisih);
    }

    function toggleStart() {
      const btnToggle = document.getElementById("btn-toggle");
      const btnLap = document.getElementById("btn-lap");

      if (timerInterval === null) {
        // Mulai Stopwatch via setInterval
        waktuMulai = Date.now();
        timerInterval = setInterval(perbaruiTampilan, 10); // Update setiap 10ms
        btnToggle.textContent = "Jeda";
        btnToggle.className = "btn btn-pause";
        btnLap.disabled = false;
      } else {
        // Jeda Stopwatch via clearInterval
        clearInterval(timerInterval);
        timerInterval = null;
        waktuTertunda += Date.now() - waktuMulai;
        btnToggle.textContent = "Lanjut";
        btnToggle.className = "btn btn-start";
      }
    }

    function catatLap() {
      lapCount++;
      const teksWaktu = document.getElementById("display").textContent;
      const li = document.createElement("li");
      li.className = "lap-item";
      li.innerHTML = `<span>Putaran #${lapCount}</span><strong>${teksWaktu}</strong>`;
      document.getElementById("lap-container").prepend(li);
    }

    function resetStopwatch() {
      clearInterval(timerInterval);
      timerInterval = null;
      waktuMulai = 0;
      waktuTertunda = 0;
      lapCount = 0;

      document.getElementById("display").textContent = "00:00.00";
      document.getElementById("lap-container").innerHTML = "";

      const btnToggle = document.getElementById("btn-toggle");
      btnToggle.textContent = "Mulai";
      btnToggle.className = "btn btn-start";
      document.getElementById("btn-lap").disabled = true;
    }
  </script>

</body>
</html>
```

---

## Detailed Code Breakdown

- `setInterval(..., 10)`: Dispatches recurring callback execution every 10 milliseconds without blocking UI responsiveness.
- `clearInterval(timerInterval)`: Destroys pending intervals when pausing or resetting timers.
- `Date.now() - waktuMulai`: Relies on absolute system clock hardware timestamps avoiding drift from browser timer throttling.
- `String(...).padStart(2, "0")`: Formats numerical timestamps with consistent zero padding.
- Timer ID retention: Preserves interval handles inside state bindings allowing deterministic cancellation.

---

## Playground Experiments

1. Adjust variable bindings, arguments, or strings inside the Playground editor and observe live runtime output shifts.
2. Introduce new conditional branches or helper functions relevant to your scenarios.
3. Inspect the browser Developer Console (F12) to trace runtime execution telemetry.

---

## Practical Challenge

Apply Week 10 core concepts inside your project's main.js file. Verify const vs let discipline, guard against null/undefined values, and maintain descriptive variable naming.

---

## Common Pitfalls & Debugging

- Omitting clearInterval(): Causes persistent interval handlers to leak memory indefinitely.
- Counting ticks manually instead of Date.now(): System task queues introduce drift; compute true elapsed time via hardware clock timestamps.
- Stacking redundant intervals: Clicking start without clearing prior handles triggers racing concurrent intervals.
- Misinterpreting 0ms delays: setTimeout(fn, 0) still yields to existing Call Stack frames and waits in the task queue.

---

## Summary

- Week 10 (Asynchronous Programming and Timers) delivers hands-on algorithmic and practical JavaScript development proficiencies.
- All code adheres strictly to standard ECMAScript specifications, immediately runnable inside browser viewports and CodePlayground.
- In subsequent modules, we progressively expand programmatic capabilities toward a complete interactive web application.
