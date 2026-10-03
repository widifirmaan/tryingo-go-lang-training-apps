# Custom Hooks Modern: Enkapsulasi Logika Reusable & Compound Components

> **Kategori:** React | **Level:** Optimasi Performa, Custom Hooks & Capstone Editor | **Minggu 9:** Custom Hooks Modern: Enkapsulasi Logika Reusable & Compound Components

## Tujuan Pembelajaran

- Memahami filosofi Custom Hooks sebagai mekanisme utama ekstraksi dan reuse logika ber-state
- Mengetahui aturan penamaan wajib Custom Hook (harus diawali dengan kata `use`)
- Membangun hook useLocalStorage dengan inisialisasi lazy function untuk efisiensi I/O
- Membangun hook event listeners interaktif seperti shortcut keyboard global
- Menerapkan pola desain Compound Components untuk komponen antarmuka yang sangat modular

---

## Program: Suite Custom Hook: useLocalStorage, useDebounce & useShortcut

```jsx
import { useState, useEffect } from "react";

// 1. Custom Hook: Sinkronisasi State Otomatis ke LocalStorage Browser
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// 2. Custom Hook: Shortcut Keyboard Pintas (misal: Ctrl+S untuk Save)
function useKeyboardShortcut(targetKey, callback, modifierCtrl = false) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const isKeyMatch = event.key.toLowerCase() === targetKey.toLowerCase();
      const isCtrlMatch = modifierCtrl ? event.ctrlKey || event.metaKey : true;

      if (isKeyMatch && isCtrlMatch) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [targetKey, callback, modifierCtrl]);
}

// 3. Implementasi Nyata pada Komponen Editor
export default function ScratchpadApp() {
  const [catatanDraft, setCatatanDraft] = useLocalStorage("draft_workspace_catatan", "Ketik draf di sini...");
  const [pesanStatus, setPesanStatus] = useState("Tersimpan otomatis.");

  // Daftarkan shortcut Ctrl+S
  useKeyboardShortcut("s", () => {
    setPesanStatus("Disimpan manual via shortcut (Ctrl+S)!");
    setTimeout(() => setPesanStatus("Tersimpan otomatis."), 2500);
  }, true);

  return (
    <div style={{ maxWidth: "450px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>Scratchpad Editor</h3>
        <small style={{ color: "#16a34a" }}>{pesanStatus}</small>
      </div>

      <textarea
        value={catatanDraft}
        onChange={(e) => setCatatanDraft(e.target.value)}
        rows={6}
        style={{ width: "100%", padding: "10px", boxSizing: "border-box", borderRadius: "6px", border: "1px solid #cbd5e1" }}
      />
      <small style={{ color: "#64748b" }}>* Tekan Ctrl+S untuk memicu simpan instan.</small>
    </div>
  );
}
```

---

## Konsep Kunci

### Apa itu Custom Hook Sebenarnya?
Custom Hook adalah **fungsi JavaScript biasa yang di dalamnya memanggil satu atau lebih React Hook bawaan** (`useState`, `useEffect`, `useRef`).
Jika Anda memiliki logika sinkronisasi LocalStorage di 5 komponen berbeda, daripada menyalin-tempel baris kode `getItem`, `setItem`, dan `JSON.parse` berulang kali, Anda mengemasnya ke dalam fungsi `useLocalStorage`.

### Aturan Wajib Custom Hook
1. **Wajib diawali `use`**: Nama fungsi harus diawali dengan `use` (misal: `useAuth`, `useWindowSize`, `useFetch`). Compiler linter React mengandalkan prefiks ini untuk memeriksa kepatuhan *Rules of Hooks*.
2. **Hanya panggil di tingkat atas**: Jangan pernah memanggil hook di dalam perulangan (*loops*), pengkondisian (*if*), atau fungsi bertingkat (*nested functions*).
3. **Setiap pemanggilan independen**: Dua komponen yang memanggil `useLocalStorage` masing-masing memiliki state independen sendiri-sendiri, bukan berbagi memori state kecuali dibungkus Context.

---

---

## Penjelasan untuk Pemula

### Analogi: Modul Power Bank & Alat Perkakas Multi-Guna
1. **Fungsi JavaScript biasa** seperti sendok makan: bisa dipakai di mana saja, tapi tidak memiliki daya listrik atau memori.
2. **Custom Hook** seperti power bank modular khusus yang bisa dicolokkan ke smartphone mana saja: power bank membawa daya listrik (*state reaktif*) dan kabel pintar (*effects*), memberi energi pada ponsel apapun yang memasangnya.

## Eksperimen

- Ketik teks di scratchpad, refresh browser Anda, dan buktikan bahwa teks tidak hilang karena tersimpan di LocalStorage.
- Tekan Ctrl+S (atau Cmd+S di Mac) dan perhatikan pesan konfirmasi muncul di pojok kanan atas.
- Buka Tab Application di Chrome DevTools dan periksa data key draft_workspace_catatan.
- Buat custom hook useWindowSize() yang mengembalikan lebar dan tinggi layar browser secara reaktif.

---

## Tantangan

Bangun custom hook `useFetch(url)` yang mengembalikan `{ data, loading, error, refetch }` lengkap dengan penanganan pembatalan AbortController saat unmount.

---

## Ringkasan

Kamu telah menguasai pembuatan Custom Hooks, enkapsulasi logika bisnis, dan event keyboard. Minggu depan adalah Capstone Final: Collaborative Notion-Style Block Editor.
