# Context API: Mengatasi Prop Drilling & Arsitektur State Terdistribusi

> **Kategori:** React | **Level:** Side Effects, Context & Arsitektur Reducer | **Minggu 6:** Context API: Mengatasi Prop Drilling & Arsitektur State Terdistribusi

## Tujuan Pembelajaran

- Memahami fenomena Prop Drilling (mengoper props melewati banyak level komponen yang tidak membutuhkannya)
- Membuat dan mengonfigurasi React Context menggunakan createContext() dan Provider
- Membangun Custom Provider Component yang mengkapsulasi state dan aksi mutasi
- Menulis Custom Hook (useWorkspace) untuk keamanan tipe dan validasi hierarki pohon
- Memahami batas performa Context API dan kapan saatnya memecah context menjadi beberapa bagian

---

## Program: Sistem Tema & Autentikasi Pengguna Global Workspace

```jsx
import { createContext, useContext, useState } from "react";

// 1. Buat Context dengan default value
const WorkspaceContext = createContext(null);

// 2. Provider Component: Mengisolasi state global dan menyediakan API ke seluruh anak pohon
export function WorkspaceProvider({ children }) {
  const [tema, setTema] = useState("light");
  const [penggunaAktif, setPenggunaAktif] = useState({
    nama: "Rian Hidayat",
    email: "rian@nusa.dev",
    role: "ADMIN"
  });

  const toggleTema = () => {
    setTema((prev) => (prev === "light" ? "dark" : "light"));
  };

  const logout = () => {
    setPenggunaAktif(null);
  };

  const value = {
    tema,
    toggleTema,
    penggunaAktif,
    logout
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

// 3. Custom Hook untuk mempermudah konsumsi context dan validasi provider
export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace harus digunakan di dalam <WorkspaceProvider>!");
  }
  return context;
}

// 4. Komponen Daun Terdalam (Membuktikan tidak ada Prop Drilling)
function ProfilPenggunaHeader() {
  const { penggunaAktif, tema, toggleTema, logout } = useWorkspace();

  const isDark = tema === "dark";

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 20px",
      background: isDark ? "#0f172a" : "#f8fafc",
      color: isDark ? "#f8fafc" : "#0f172a",
      borderRadius: "8px",
      border: "1px solid #cbd5e1"
    }}>
      <div>
        <strong>{penggunaAktif ? penggunaAktif.nama : "Tamu"}</strong>
        <span style={{ fontSize: "12px", marginLeft: "8px", color: isDark ? "#94a3b8" : "#64748b" }}>
          ({penggunaAktif?.role})
        </span>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={toggleTema} style={{ padding: "6px 12px", cursor: "pointer" }}>
          Mode: {isDark ? "🌙 Gelap" : "☀️ Terang"}
        </button>
        {penggunaAktif && (
          <button onClick={logout} style={{ padding: "6px 12px", background: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Keluar
          </button>
        )}
      </div>
    </div>
  );
}

export default function WorkspaceApp() {
  return (
    <WorkspaceProvider>
      <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "sans-serif" }}>
        <h2>Workspace Shell Dashboard</h2>
        <ProfilPenggunaHeader />
      </div>
    </WorkspaceProvider>
  );
}
```

---

## Konsep Kunci

### Masalah Klasik: Prop Drilling
Ketika data autentikasi pengguna atau preferensi tema berada di komponen puncak `App`, namun dibutuhkan oleh tombol kecil di dalam `Sidebar > ProfilWidget > TombolMenu`, Anda terpaksa mengoper props tersebut melalui 4-5 komponen perantara. Komponen perantara tersebut menjadi kotor oleh props yang sebenarnya tidak mereka pedulikan.

### Solusi: Context API
Context API menyediakan cara untuk berbagi nilai ke seluruh pohon komponen tanpa harus mengoper props secara manual di setiap tingkatan.
Komponen utama:
1. `createContext()`: Menciptakan saluran context.
2. `Provider`: Membungkus sub-pohon komponen dan menyuplai data `value`.
3. `useContext()`: Mengakses data dari saluran tersebut di komponen daun manapun secara langsung.

### Praktik Terbaik: Selalu Buat Custom Hook Pembungkus
Jangan pernah mengekspor context mentah. Selalu bungkus dalam custom hook seperti `useWorkspace()`.
Ini memberikan validasi otomatis: jika pengembang lupa membungkus komponen dengan `WorkspaceProvider`, sistem langsung memberikan pesan eror yang jelas, bukan error `TypeError: Cannot destructure property of null` yang membingungkan.

---

---

## Penjelasan untuk Pemula

### Analogi: Saluran Pipa Air Bersih & Radio Pemancar Kota
1. **Prop Drilling** seperti mengoper ember air dari tangan ke tangan melewati 10 orang dari sumur hingga ke kamar mandi lantai atas: jika satu orang lelah atau salah oper, ember air tumpah.
2. **Context API** seperti memasang pipa air bertekanan atau stasiun radio kota: siapa saja di rumah yang membuka keran kamar mandi langsung mendapat air mengalir, atau menyalakan radio pada gelombang yang sama langsung mendengar siaran tanpa perantara.

## Eksperimen

- Klik tombol "Mode Gelap/Terang" dan amati bagaimana warna komponen daun berubah seketika tanpa prop drilling.
- Pindahkan ProfilPenggunaHeader ke luar dari <WorkspaceProvider> dan amati pesan eror custom hook yang mendidik.
- Tambahkan fungsi ubahNamaPengguna ke dalam Provider dan panggil dari komponen anak.
- Pecahkan context menjadi ThemeContext dan UserContext untuk mencegah re-render tema memicu re-render profil pengguna.

---

## Tantangan

Buat `NotifikasiContext` global yang memiliki fungsi `tampilkanNotifikasi(pesan, tipe)`. Komponen apapun di aplikasi harus bisa memunculkan pesan toast mengambang di pojok kanan atas.

---

## Ringkasan

Kamu telah menguasai Context API, pencegahan prop drilling, dan custom consumer hooks. Minggu depan kita mempelajari useReducer untuk state kompleks.
