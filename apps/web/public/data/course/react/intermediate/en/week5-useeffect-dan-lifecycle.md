# useEffect: Reactive Lifecycles, Cleanup Functions & AbortController

> **Kategori:** React | **Level:** Side Effects, Context & Reducer Architecture | **Minggu 5:** useEffect: Reactive Lifecycles, Cleanup Functions & AbortController

## Learning Objectives

- Understand Side Effects in React (operations synchronizing with external browser subsystems)
- Master the useEffect Dependency Array: [] (mount only), [deps] (on mutation), and omitted (every pass)
- Author Cleanup Functions pruning event listeners, intervals, and open sockets
- Intercept async fetch Race Conditions using native AbortController signals
- Prevent infinite re-render cycles caused by unstable object and function dependencies

---

## Program: Cloud Document Synchronization with Race Condition Cancellation

```jsx
import { useState, useEffect } from "react";

function CloudDocumentSync({ documentId }) {
  const [konten, setKonten] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusJaringan, setStatusJaringan] = useState("Online");

  useEffect(() => {
    // 1. AbortController untuk mencegah race conditions saat documentId berganti cepat
    const controller = new AbortController();
    setLoading(true);

    console.log(`[Effect] Memulai pengambilan dokumen ID: ${documentId}`);

    // Simulasi pemanggilan API asinkron
    const timer = setTimeout(() => {
      setKonten({
        id: documentId,
        judul: `Dokumen Spesifikasi Teknis #${documentId}`,
        terakhirDiubah: new Date().toLocaleTimeString()
      });
      setLoading(false);
      console.log(`[Effect] Berhasil memuat dokumen ID: ${documentId}`);
    }, 1000);

    // 2. Event Listener Window dengan Cleanup
    const handleOnline = () => setStatusJaringan("Online");
    const handleOffline = () => setStatusJaringan("Offline");

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // 3. Cleanup Function: Dieksekusi sebelum effect berikutnya berjalan atau saat komponen unmount
    return () => {
      console.log(`[Cleanup] Membatalkan operasi untuk ID: ${documentId}`);
      controller.abort();
      clearTimeout(timer);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [documentId]); // Dependency Array: effect hanya dipicu ulang jika documentId berubah

  if (loading) {
    return <div style={{ padding: "16px", color: "#64748b" }}>Sedang mengambil data dokumen...</div>;
  }

  return (
    <div style={{ padding: "16px", border: "1px solid #cbd5e1", borderRadius: "8px", maxWidth: "450px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
        <h4 style={{ margin: 0 }}>{konten?.judul}</h4>
        <span style={{ fontSize: "12px", color: statusJaringan === "Online" ? "green" : "red" }}>● {statusJaringan}</span>
      </div>
      <p style={{ fontSize: "13px", color: "#475569" }}>ID: {konten?.id} • Sinkronisasi: {konten?.terakhirDiubah}</p>
    </div>
  );
}

export default CloudDocumentSync;
```

---

## Key Concepts

### Demystifying Side Effects
Ideal React components behave as Pure Functions: mapping inputs to JSX without mutations. Real applications necessitate **Side Effects**: fetching REST APIs, opening WebSockets, updating `document.title`, or listening to window events.
`useEffect` serves as the official lifecycle boundary orchestrating these operations after the DOM commits.

### The Dependency Array Matrix
1. `useEffect(() => { ... })`: Omitted dependency array. Triggers **after every render cycle**. Mutating state within triggers an infinite loop.
2. `useEffect(() => { ... }, [])`: Empty array. Executes strictly **once upon component mount**.
3. `useEffect(() => { ... }, [id, query])`: Re-executes on mount and whenever **dependencies register reference inequality**.

### The Necessity of Cleanup Functions
Registering global subscriptions via `window.addEventListener` without unbinding in a return cleanup callback causes zombie listeners to accumulate across re-renders. This induces catastrophic memory leaks and performance degradation.

---

---

## Beginner Friendly Explanation

### Analogy: Hotel Concierge & Housekeeping Turnover
1. **useEffect** is the hotel room welcome protocol: when a guest checks in (*component mount*), the concierge activates air conditioning and serves welcome tea (*fetch data*).
2. **Cleanup Function** is housekeeping turnover: when the guest checks out (*component unmount* or room switch), staff clear linens and turn off utilities so subsequent guests enter an pristine room (*zero memory leaks*).

## Experiments

- Rapidly cycle documentId between 1 and 2 to verify cleanup cancels the previous fetch sequence.
- Disconnect device network connectivity to observe the reactive Offline indicator flip.
- Omit the dependency array to witness uncontrolled render explosions in the console.
- Update browser document.title dynamically within useEffect to track the active document.

---

## Challenge

Author an effect hook subscribing to `Escape` key events, dismissing active dialog modals while guaranteeing flawless listener deregistration.

---

## Summary

You have mastered useEffect lifecycles, dependencies, and cleanup mechanics. Next week, we examine the Context API for global state management.
