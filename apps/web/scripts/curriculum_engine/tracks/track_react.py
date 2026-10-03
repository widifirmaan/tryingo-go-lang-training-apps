# React Track: 10 Weeks (3 Levels)
# Final Product: Collaborative Notion-style Modular Block Editor & Workspace

LEVELS = [
    {
        'levelId': 'beginer',
        'nameId': 'Pondasi Komponen, JSX & State',
        'nameEn': 'Component Foundations, JSX & State',
        'descId': 'Paradigma deklaratif React: JSX, props unidirectional data flow, useState, list reconciliation, dan controlled forms.',
        'descEn': 'React declarative paradigm: JSX, unidirectional props flow, useState, list reconciliation, and controlled forms.',
    },
    {
        'levelId': 'intermediate',
        'nameId': 'Side Effects, Context & Arsitektur Reducer',
        'nameEn': 'Side Effects, Context & Reducer Architecture',
        'descId': 'Siklus hidup reaktif: useEffect dengan cleanup dan abort controller, Context API tanpa prop drilling, dan useReducer state machine.',
        'descEn': 'Reactive lifecycle: useEffect with cleanup and abort controllers, Context API without prop drilling, and useReducer state machines.',
    },
    {
        'levelId': 'advanced',
        'nameId': 'Optimasi Performa, Custom Hooks & Capstone Editor',
        'nameEn': 'Performance Optimization, Custom Hooks & Capstone Editor',
        'descId': 'Memoization mendalam (useMemo/useCallback/memo), pembuatan custom hooks reusable, dan proyek capstone Notion-style Block Editor.',
        'descEn': 'Deep memoization (useMemo/useCallback/memo), authoring reusable custom hooks, and the Notion-style Block Editor capstone.',
    },
]

MODULES = [
    # Level 1: Pondasi Komponen, JSX & State (Weeks 1-4)
    {
        'week': 1,
        'level': 'beginer',
        'topicId': 'komponen-jsx-dan-props',
        'titleId': 'Arsitektur Komponen, Aturan JSX & Unidirectional Data Flow via Props',
        'titleEn': 'Component Architecture, JSX Rules & Unidirectional Data Flow via Props',
        'programId': 'Hierarki Kartu Dokumen Workspace Interaktif',
        'programEn': 'Interactive Workspace Document Card Hierarchy',
        'levelNameId': 'Pondasi Komponen, JSX & State',
        'levelNameEn': 'Component Foundations, JSX & State',
        'language': 'jsx',
        'code': """// 1. Komponen Anak (Presentational / Pure Component)
function KartuDokumen({ judul, kategori, jumlahKata, isFavorit }) {
  return (
    <div style={{
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "12px",
      background: isFavorit ? "#f0fdf4" : "#ffffff"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, color: "#1e293b" }}>{judul}</h3>
        {isFavorit && <span style={{ color: "#16a34a", fontSize: "14px", fontWeight: "bold" }}>★ Favorit</span>}
      </div>
      <p style={{ margin: "8px 0 0", color: "#64748b", fontSize: "13px" }}>
        Kategori: <strong>{kategori}</strong> • Estimasi: {Math.ceil(jumlahKata / 200)} menit baca
      </p>
    </div>
  );
}

// 2. Komponen Utama (Parent Tree)
function WorkspaceApp() {
  const namaRuangKerja = "Engineering Core Wiki";

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: "480px", margin: "20px auto" }}>
      <header style={{ borderBottom: "2px solid #0f172a", paddingBottom: "8px", marginBottom: "16px" }}>
        <h2 style={{ margin: 0 }}>{namaRuangKerja}</h2>
        <small style={{ color: "#64748b" }}>Notion Workspace Clone • Versi 1.0</small>
      </header>

      <section>
        <KartuDokumen
          judul="Arsitektur Microfrontend 2026"
          kategori="Engineering"
          jumlahKata={1200}
          isFavorit={true}
        />
        <KartuDokumen
          judul="Panduan Onboarding Karyawan Baru"
          kategori="People Ops"
          jumlahKata={450}
          isFavorit={false}
        />
      </section>
    </div>
  );
}

// Export default komponen utama
export default WorkspaceApp;
""",
        'objectivesId': [
            'Memahami pergeseran paradigma dari imperatif DOM langsung ke deklaratif komponen React',
            'Menguasai aturan sintaksis JSX: penutupan tag, penamaan atribut (className, htmlFor), dan ekspresi kurung kurawal {}',
            'Menerapkan Unidirectional Data Flow (aliran data satu arah dari parent ke child via props)',
            'Menggunakan teknik render kondisional: ternary operator (?:) dan short-circuit evaluation (&&)',
            'Menulis komponen fungsional murni (Pure Functional Components) yang modular dan reusable',
        ],
        'objectivesEn': [
            'Understand the paradigm shift from imperative DOM manipulation to declarative React components',
            'Master JSX syntactic rules: self-closing tags, camelCase attributes, and curly brace expressions {}',
            'Implement Unidirectional Data Flow with data streaming from parent to child via props',
            'Deploy conditional rendering patterns: ternary expressions (?:) and short-circuit guards (&&)',
            'Author reusable pure functional components cleanly decoupled from side effects',
        ],
        'explanationId': """### Mengapa Deklaratif Mengalahkan Imperatif?
Pada JavaScript tradisional (DOM imperatif), Anda harus menulis instruksi langkah demi langkah: `document.createElement`, `element.appendChild`, `element.classList.add`. Kode cepat menjadi semrawut dan rawan *state desynchronization*.
Pada React yang **deklaratif**, Anda hanya mendeskripsikan bagaimana antarmuka (UI) harus terlihat berdasarkan data yang ada: **UI = f(State)**. React menangani mutasi DOM di balik layar secara optimal menggunakan algoritma rekonsiliasi.

### Apa itu JSX Sebenarnya?
JSX bukanlah HTML yang ditulis di JavaScript, melainkan *syntactic sugar* untuk fungsi `React.createElement()`.
Kode `<h1 className="title">Halo</h1>` dikompilasi oleh compiler (Babel/Vite) menjadi `React.createElement('h1', { className: 'title' }, 'Halo')`.
Itulah mengapa kita wajib menggunakan `className` bukan `class`, dan membungkus ekspresi JavaScript di dalam `{ kurung kurawal }`.

### Unidirectional Data Flow (Aliran Satu Arah)
Props hanya mengalir dari atas ke bawah (Parent -> Child). Komponen anak **tidak boleh mengubah props yang diterimanya secara langsung** (*props are read-only*). Ini membuat alur data sistem Anda sangat mudah diprediksi dan di-debug.""",
        'explanationEn': """### Declarative vs Imperative UI
In vanilla imperative JavaScript, you micromanage DOM mutations step-by-step: `createElement`, `setAttribute`, `appendChild`. As applications scale, state diverges from DOM representations.
In **declarative React**, you simply declare the UI target shape given current data: **UI = f(State)**. React orchestrates underlying DOM mutations via its reconciliation engine.

### What JSX Actually Is
JSX is not raw HTML inside JavaScript, but ergonomic syntax sugar over `React.createElement()`.
The markup `<h1 className="title">Hello</h1>` transpiles into `React.createElement('h1', { className: 'title' }, 'Hello')`.
This explains why attributes follow camelCase naming (`className`, `onClick`) and JavaScript expressions interpolate via `{ curly braces }`.

### Unidirectional Data Flow
Props cascade unidirectionally down the component tree (Parent -> Child). Child components **must treat props as immutable contracts**. This guarantees predictable data lineage across large systems.""",
        'beginnerId': """### Analogi: Resep Masakan & Cetak Biru Lego
1. **Komponen** seperti balok Lego: satu balok kecil pintu, satu balok jendela. Anda bisa menggabungkan ribuan balok kecil menjadi satu istana megah.
2. **Props** seperti instruksi pesanan makanan dari pelayan ke dapur: pelayan memberi tahu koki "Buat nasi goreng, pedas: Ya, telur: 2". Koki menerima instruksi tersebut (*read-only*) dan memasak hidangan sesuai pesanan.""",
        'beginnerEn': """### Analogy: Lego Modular Bricks & Kitchen Order Slips
1. **Components** are modular Lego bricks: individual door hinges, window frames, and wall panels combine into soaring architectural models.
2. **Props** is a restaurant order ticket passed from the waiter to the chef: "Order #42: Pad Thai, Spicy: True, Extra Lime: 2". The chef respects the immutable slip and renders the dish faithfully.""",
        'experimentsId': [
            'Ubah isFavorit pada kartu kedua menjadi true dan amati bintang favorit muncul otomatis.',
            'Coba ubah props langsung di dalam KartuDokumen (misal props.judul = "tes") dan amati erornya.',
            'Tambahkan properti baru "penulis" pada KartuDokumen dan tampilkan di bawah kategori.',
            'Gunakan ternary operator untuk menampilkan warna latar merah muda jika kategori adalah "Urgent".',
        ],
        'experimentsEn': [
            'Toggle isFavorit on the second card to true and observe the favorite badge render reactively.',
            'Attempt mutating props inside KartuDokumen (props.judul = "hack") to see read-only protections.',
            'Introduce a new "author" prop to KartuDokumen and render it beneath the category tag.',
            'Apply a ternary expression rendering a distinct background badge when category equals "Urgent".',
        ],
        'challengeId': 'Buat komponen `WorkspaceBadge` yang menerima props `status` ("AKTIF" | "DRAFT" | "ARSIP") dan render dengan warna badge berbeda (Hijau, Kuning, Abu-abu) menggunakan komponen murni.',
        'challengeEn': 'Author a `WorkspaceBadge` component accepting `status` ("ACTIVE" | "DRAFT" | "ARCHIVED") rendering colored badges (Green, Yellow, Gray) strictly as a pure component.',
        'summaryId': 'Kamu telah menguasai pola pikir deklaratif, arsitektur komponen, JSX, dan aliran props satu arah. Minggu depan kita mempelajari State reaktif dengan useState.',
        'summaryEn': 'You have mastered declarative component thinking, JSX architecture, and unidirectional props flow. Next week, we examine reactive state with useState.',
    },
    {
        'week': 2,
        'level': 'beginer',
        'topicId': 'state-usestate-dan-event-handling',
        'titleId': 'Reaktivitas State: useState, Immutability & Lifting State Up',
        'titleEn': 'State Reactivity: useState, Immutability & Lifting State Up',
        'programId': 'Penghitung Blok Konten & Editor Status Dokumen Real-Time',
        'programEn': 'Content Block Counter & Real-Time Document Status Editor',
        'levelNameId': 'Pondasi Komponen, JSX & State',
        'levelNameEn': 'Component Foundations, JSX & State',
        'language': 'jsx',
        'code': """import { useState } from "react";

function BlockEditorItem({ nomor, onHapus }) {
  const [isiTeks, setIsiTeks] = useState("");
  const [tipeBlok, setTipeBlok] = useState("PARAGRAF");

  return (
    <div style={{
      display: "flex",
      gap: "8px",
      alignItems: "center",
      padding: "8px",
      borderBottom: "1px solid #e2e8f0"
    }}>
      <span style={{ color: "#94a3b8", fontSize: "12px", width: "24px" }}>#{nomor}</span>
      
      <select
        value={tipeBlok}
        onChange={(e) => setTipeBlok(e.target.value)}
        style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #cbd5e1" }}
      >
        <option value="PARAGRAF">Teks Biasa</option>
        <option value="HEADING">Judul Besar</option>
        <option value="KODE">Blok Kode</option>
      </select>

      <input
        type="text"
        placeholder="Ketik konten dokumen di sini..."
        value={isiTeks}
        onChange={(e) => setIsiTeks(e.target.value)}
        style={{
          flex: 1,
          padding: "6px 10px",
          borderRadius: "4px",
          border: "1px solid #cbd5e1",
          fontWeight: tipeBlok === "HEADING" ? "bold" : "normal",
          fontFamily: tipeBlok === "KODE" ? "monospace" : "inherit"
        }}
      />

      <button
        onClick={onHapus}
        style={{ background: "#ef4444", color: "white", border: "none", borderRadius: "4px", padding: "6px 10px", cursor: "pointer" }}
      >
        ✕
      </button>
    </div>
  );
}

function DocumentCanvas() {
  const [blokList, setBlokList] = useState([
    { id: 1 },
    { id: 2 }
  ]);

  const tambahBlok = () => {
    // Immutability: Selalu buat array baru dengan spread operator
    setBlokList((prev) => [...prev, { id: Date.now() }]);
  };

  const hapusBlok = (idTarget) => {
    // Lifting State Up: Logika penghapusan dikelola di parent
    setBlokList((prev) => prev.filter((b) => b.id !== idTarget));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <h2>Editor Lembar Kerja ({blokList.length} Blok)</h2>
        <button
          onClick={tambahBlok}
          style={{ background: "#2563eb", color: "white", border: "none", borderRadius: "6px", padding: "8px 16px", cursor: "pointer" }}
        >
          + Tambah Blok Baru
        </button>
      </div>

      <div style={{ border: "1px solid #cbd5e1", borderRadius: "8px", background: "#f8fafc" }}>
        {blokList.map((item, index) => (
          <BlockEditorItem
            key={item.id}
            nomor={index + 1}
            onHapus={() => hapusBlok(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default DocumentCanvas;
""",
        'objectivesId': [
            'Memahami konsep State sebagai memori internal komponen yang memicu re-render otomatis saat berubah',
            'Menggunakan hook useState dengan benar termasuk updater function (prev => ...)',
            'Mematuhi prinsip Immutability mutlak pada array dan objek (tidak memutasi langsung)',
            'Menangani Synthetic Events React: onChange, onClick, onSubmit',
            'Menerapkan pola Lifting State Up saat dua atau lebih komponen perlu berbagi data',
        ],
        'objectivesEn': [
            'Understand State as internal component memory triggering reactive re-renders upon mutation',
            'Deploy the useState hook correctly utilizing functional updater forms (prev => ...)',
            'Enforce absolute immutability across array and object state (never push or direct assign)',
            'Handle React Synthetic Events seamlessly: onChange, onClick, onSubmit',
            'Architect the Lifting State Up pattern when siblings share collaborative data flows',
        ],
        'explanationId': """### Mengapa Variabel Biasa Tidak Cukup?
Jika Anda menulis `let counter = 0; function tambah() { counter++; }`, nilai angka di memori memang bertambah, tetapi **React tidak tahu bahwa perubahan itu terjadi sehingga tampilan layar tidak pernah diperbarui**.
`useState` memberikan dua hal:
1. Nilai state saat ini.
2. Fungsi setter (`setCount`) yang memberi tahu React: *"Data berubah, jadwalkan render ulang komponen ini!"*.

### Aturan Emas: Immutability (Jangan Pernah Mutasi Langsung!)
Di React, Anda **dilarang keras** melakukan mutasi langsung seperti:
`array.push(item)` atau `user.nama = 'Budi'`.
React mendeteksi perubahan state menggunakan perbandingan referensi memori (*shallow equality `===`*). Jika Anda memutasi array asli di tempat, referensi memorinya tetap sama, dan React mengira tidak ada perubahan!
Gunakan selalu spread operator atau metode non-mutating:
- Tambah item: `setList(prev => [...prev, newItem])`
- Hapus item: `setList(prev => prev.filter(item => item.id !== targetId))`
- Update item: `setList(prev => prev.map(item => item.id === targetId ? { ...item, aktif: true } : item))`

### Lifting State Up
Ketika komponen saudara (*siblings*) membutuhkan data yang sama atau perlu saling memengaruhi, pindahkan state tersebut ke komponen induk (*common parent*) terdekat, lalu alirkan state dan fungsi callback ke bawah via props.""",
        'explanationEn': """### Why Plain Variables Fail in Reactive UIs
Declaring `let count = 0; count++;` increments memory, but **React receives no notification that state mutated, leaving the DOM frozen**.
`useState` provides:
1. The current state snapshot.
2. A setter dispatcher (`setCount`) notifying React: *"State altered, schedule a reconciliation pass!"*.

### The Golden Rule: Immutability
In React, **never mutate objects or arrays in-place**:
`array.push(item)` or `user.name = 'New'` are fatal anti-patterns.
React tracks state transitions via shallow reference equality (`===`). Mutating existing array instances preserves identical pointer addresses, leading React to skip re-renders!
Always project new immutable instances:
- Insert: `setList(prev => [...prev, newItem])`
- Delete: `setList(prev => prev.filter(item => item.id !== targetId))`
- Update: `setList(prev => prev.map(item => item.id === targetId ? { ...item, active: true } : item))`

### Lifting State Up
When sibling components share state dependencies, lift ownership to their nearest mutual parent, passing state and event handler callbacks downward via props.""",
        'beginnerId': """### Analogi: Sakelar Lampu Cerdas & Papan Skor
1. **useState** seperti sakelar lampu pintar: begitu Anda menekan tombol sakelar (*setter function*), sinyal dikirim ke komputer rumah (*React Engine*), dan lampu seketika menyala terang (*re-render UI*).
2. **Immutability** seperti buku mutasi bank: jika Anda mentransfer uang, kasir tidak menghapus saldo lama dengan karet penghapus, melainkan mencetak baris transaksi baru di lembar berikutnya.""",
        'beginnerEn': """### Analogy: Smart Light Switches & Immutable Bank Ledgers
1. **useState** is a digital home automation switch: pressing the button (*setter dispatch*) transmits a bus signal to the hub (*React Reconciliation*), illuminating room lighting instantly (*DOM commit*).
2. **Immutability** is an audited banking ledger: when funds transfer, tellers never erase old ink with rubber; they strike a brand-new ledger record on a fresh line.""",
        'experimentsId': [
            'Coba ganti setBlokList([...]) dengan blokList.push({}) dan amati bahwa layar menolak me-render blok baru.',
            'Ubah tipe blok ke HEADING dan perhatikan font input otomatis menebal secara instan.',
            'Hapus semua blok hingga kosong dan amati penanganan antarmuka.',
            'Gunakan setter dengan callback function: setBlokList(prev => [...prev, { id: Date.now() }]).',
        ],
        'experimentsEn': [
            'Replace setBlokList([...]) with blokList.push({}) to observe the interface fail to re-render.',
            'Switch block type to HEADING and observe the font weight adapt reactively.',
            'Delete all canvas blocks down to zero to inspect edge-case handling.',
            'Enforce functional state updates via setBlokList(prev => [...prev, { id: Date.now() }]).',
        ],
        'challengeId': 'Tambahkan tombol "Duplikat Blok" pada `BlockEditorItem` yang menyalin isi teks dan tipe blok persis di bawah posisi blok saat ini menggunakan teknik manipulasi array immutable.',
        'challengeEn': 'Add a "Duplicate Block" action to `BlockEditorItem` that clones the current text and block type immediately below the active item via immutable array slicing.',
        'summaryId': 'Kamu telah menguasai useState reaktif, hukum immutability mutlak, dan Lifting State Up. Minggu depan kita mendalami Render List dan pentingnya reconciliation Key.',
        'summaryEn': 'You have mastered reactive useState, strict immutability, and Lifting State Up. Next week, we examine List Rendering and the critical mechanics of Keys.',
    },
    {
        'week': 3,
        'level': 'beginer',
        'topicId': 'render-list-dan-keys',
        'titleId': 'Iterasi List, Algoritma Rekonsiliasi & Bahaya Menggunakan Index Sebagai Key',
        'titleEn': 'List Iteration, Reconciliation & The Danger of Index as Key',
        'programId': 'Papan Kolom Status Kanban dengan Reordering Dinamis',
        'programEn': 'Dynamic Kanban Column Board with Item Reordering',
        'levelNameId': 'Pondasi Komponen, JSX & State',
        'levelNameEn': 'Component Foundations, JSX & State',
        'language': 'jsx',
        'code': """import { useState } from "react";

const DATA_KARTU_AWAL = [
  { id: "c-101", judul: "Setup Tailwind v4", tag: "Frontend" },
  { id: "c-102", judul: "Design Database PostgreSQL", tag: "Backend" },
  { id: "c-103", judul: "Implementasi OAuth JWT", tag: "Security" },
  { id: "c-104", judul: "Audit Aksesibilitas WCAG", tag: "QA" }
];

function KanbanTaskCard({ item, onGeserAtas, onHapus }) {
  // Local state untuk mendemonstrasikan bahaya index-as-key jika list di-reorder
  const [catatanCepat, setCatatanCepat] = useState("");

  return (
    <div style={{
      background: "white",
      padding: "12px",
      borderRadius: "6px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      marginBottom: "8px",
      borderLeft: "4px solid #3b82f6"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>{item.judul}</strong>
        <span style={{ fontSize: "11px", background: "#e0f2fe", color: "#0369a1", padding: "2px 6px", borderRadius: "4px" }}>
          {item.tag}
        </span>
      </div>

      <div style={{ marginTop: "8px" }}>
        <input
          type="text"
          placeholder="Tulis catatan internal..."
          value={catatanCepat}
          onChange={(e) => setCatatanCepat(e.target.value)}
          style={{ width: "90%", padding: "4px", fontSize: "12px", border: "1px solid #cbd5e1", borderRadius: "3px" }}
        />
      </div>

      <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
        <button onClick={onGeserAtas} style={{ fontSize: "11px", padding: "2px 6px", cursor: "pointer" }}>↑ Naik</button>
        <button onClick={onHapus} style={{ fontSize: "11px", padding: "2px 6px", background: "#fee2e2", color: "#b91c1c", border: "none", cursor: "pointer" }}>Hapus</button>
      </div>
    </div>
  );
}

function KanbanBoard() {
  const [tasks, setTasks] = useState(DATA_KARTU_AWAL);

  const geserKeAtas = (index) => {
    if (index === 0) return;
    setTasks((prev) => {
      const copy = [...prev];
      const target = copy[index];
      copy[index] = copy[index - 1];
      copy[index - 1] = target;
      return copy;
    });
  };

  const hapusTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div style={{ maxWidth: "450px", margin: "20px auto", fontFamily: "sans-serif", background: "#f1f5f9", padding: "16px", borderRadius: "8px" }}>
      <h3 style={{ margin: "0 0 12px 0", color: "#0f172a" }}>Sprint Backlog ({tasks.length})</h3>
      
      {/* SELALU gunakan ID unik stabil sebagai KEY, BUKAN index array! */}
      {tasks.map((task, index) => (
        <KanbanTaskCard
          key={task.id}
          item={task}
          onGeserAtas={() => geserKeAtas(index)}
          onHapus={() => hapusTask(task.id)}
        />
      ))}
    </div>
  );
}

export default KanbanBoard;
""",
        'objectivesId': [
            'Menggunakan Array.prototype.map() untuk me-render koleksi elemen JSX secara dinamis',
            'Memahami cara kerja Virtual DOM dan Algoritma Rekonsiliasi (Diffing) React',
            'Memahami peran krusial properti `key` sebagai identitas unik elemen antar-render',
            'Mengetahui mengapa menggunakan index array sebagai key menyebabkan bug visual dan state kebocoran mematikan',
            'Membangun antarmuka daftar dengan fitur reorder, sorting, dan delete yang stabil',
        ],
        'objectivesEn': [
            'Leverage Array.prototype.map() to project data collections into dynamic JSX elements',
            'Understand the Virtual DOM and React Reconciliation Diffing algorithm',
            'Master the vital role of the `key` prop as element identity across render passes',
            'Diagnose why using array indices as keys introduces subtle state corruption bugs',
            'Construct robust list interfaces supporting ordering, sorting, and deletions cleanly',
        ],
        'explanationId': """### Bagaimana React Me-render List?
React tidak me-refresh seluruh DOM saat data array berubah. React membandingkan pohon Virtual DOM lama dengan yang baru (*diffing*).
Untuk membedakan item mana yang baru ditambah, dihapus, atau ditukar posisinya, React membutuhkan tanda pengenal unik: **`key`**.

### Bahaya Fatal Menggunakan Index Sebagai Key (`key={index}`)
Banyak pengembang pemula tergoda menulis `tasks.map((item, index) => <Card key={index} />)`.
**Ini adalah anti-pattern berbahaya!**
Jika Anda memiliki 3 item, lalu Anda menghapus item pertama:
- Item ke-2 kini memiliki index 0.
- Item ke-3 kini memiliki index 1.
React mengira item ke-3 yang dihapus, dan item ke-1 hanya berubah props! Akibatnya: input form, animasi, dan local state anak akan tertukar secara kacau (*state leak bug*).
**Solusi Baku**: Selalu gunakan ID permanen dan stabil dari database atau UUID (`key={task.id}`).""",
        'explanationEn': """### How React Reconciles Lists
React avoids reconstructing the entire browser DOM on dataset changes. It compares virtual trees via its diffing heuristics.
To discern which elements are appended, pruned, or reordered, React relies on stable identity anchors: the **`key` prop**.

### The Peril of Index as Key (`key={index}`)
Beginners frequently resort to `items.map((item, index) => <Card key={index} />)`.
**This is a disastrous anti-pattern!**
If you delete the first of 3 items:
- Item #2 shifts to index 0.
- Item #3 shifts to index 1.
React concludes item #3 was discarded while item #1 simply received new props! Consequently, uncontrolled inputs, focus rings, and internal child state drift to incorrect elements.
**Production Rule**: Always bind a stable, unique domain identifier (`key={task.id}`).""",
        'beginnerId': """### Analogi: Label Nomor Dada Pelari Lomba
Bayangkan 100 pelari di garis start:
1. **ID Unik sebagai Key** seperti nomor dada pelari resmi (misal 'BIB-702'): meskipun pelari nomor 702 menyalip ke urutan 1 atau mundur ke urutan 5, juri tetap tahu pasti siapa orang tersebut.
2. **Index sebagai Key** seperti menunjuk 'siapa yang berdiri di baris depan': jika pelari nomor 1 tersandung dan keluar lintasan, orang di belakangnya tiba-tiba dipanggil dengan nama orang yang baru saja terjatuh!""",
        'beginnerEn': """### Analogy: Marathon Bib Numbers vs Lane Rankings
Imagine 100 runners on a marathon track:
1. **Domain ID as Key** is an official athlete bib number ('BIB-702'): whether runner 702 overtakes into 1st place or drops back to 5th, judges track identity flawlessly.
2. **Index as Key** is identifying runners by current track position: if the leader drops out, the runner behind them inherits their name and score sheet mistakenly!""",
        'experimentsId': [
            'Ketik catatan di kartu pertama, lalu klik tombol "Naik" pada kartu kedua; amati bahwa catatan tetap melekat pada kartu aslinya karena key={task.id}.',
            'Ganti key={task.id} menjadi key={index}, ketik catatan di kartu nomor 1, lalu hapus kartu nomor 1. Perhatikan catatan melompat ke kartu yang tersisa!',
            'Tambahkan filter pencarian kartu berdasarkan teks tag.',
            'Coba masukkan dua item dengan id yang persis sama dan lihat peringatan duplicate key di konsol.',
        ],
        'experimentsEn': [
            'Type a note on card 1, click "Naik" on card 2; verify the note stays pinned to card 1 thanks to key={task.id}.',
            'Temporarily revert to key={index}, enter notes into card 1, delete card 1, and witness note state leak onto card 2!',
            'Introduce real-time list filtering by category tag.',
            'Inject two items sharing identical keys to observe the duplicate key runtime console warning.',
        ],
        'challengeId': 'Implementasikan fitur "Pindahkan ke Kolom Selesai" pada KanbanTaskCard yang memindahkan item dari state `backlog` ke state `completed` dengan mempertahankan key identitas unik.',
        'challengeEn': 'Implement a "Move to Done" action on KanbanTaskCard moving items between `backlog` and `completed` array states while preserving unique identity keys.',
        'summaryId': 'Kamu telah menguasai render list, algoritma rekonsiliasi, dan integritas key. Minggu depan kita mempelajari Controlled Forms dan useRef.',
        'summaryEn': 'You have mastered list rendering, reconciliation heuristics, and key integrity. Next week, we examine Controlled Forms and useRef.',
    },
    {
        'week': 4,
        'level': 'beginer',
        'topicId': 'form-controlled-dan-uncontrolled',
        'titleId': 'Form Handling: Controlled Components, Validasi Real-Time & useRef',
        'titleEn': 'Form Handling: Controlled Components, Real-Time Validation & useRef',
        'programId': 'Formulir Pembuatan Ruang Kerja dengan Validasi Domain',
        'programEn': 'Workspace Creation Form with Domain Validation & DOM Focus via useRef',
        'levelNameId': 'Pondasi Komponen, JSX & State',
        'levelNameEn': 'Component Foundations, JSX & State',
        'language': 'jsx',
        'code': """import { useState, useRef } from "react";

function FormBuatWorkspace({ onWorkspaceDibuat }) {
  // Controlled State: React memegang single source of truth untuk input
  const [formData, setFormData] = useState({
    namaWorkspace: "",
    slugUrl: "",
    visibilitas: "PRIVAT",
    deskripsi: ""
  });

  const [errors, setErrors] = useState({});
  // useRef: Mengakses elemen DOM langsung (misal untuk auto-focus) tanpa re-render
  const inputNamaRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => {
      const update = { ...prev, [name]: value };
      // Auto-generate slug jika nama berubah
      if (name === "namaWorkspace") {
        update.slugUrl = value.toLowerCase().replace(/\\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      }
      return update;
    });

    // Reset error field saat user mengetik
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validasiForm = () => {
    const errs = {};
    if (!formData.namaWorkspace.trim()) {
      errs.namaWorkspace = "Nama workspace wajib diisi!";
    } else if (formData.namaWorkspace.length < 3) {
      errs.namaWorkspace = "Nama workspace minimal 3 karakter.";
    }

    if (!formData.slugUrl.trim()) {
      errs.slugUrl = "Slug URL tidak boleh kosong.";
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Cegah reload halaman browser standar
    const hasilValidasi = validasiForm();

    if (Object.keys(hasilValidasi).length > 0) {
      setErrors(hasilValidasi);
      inputNamaRef.current?.focus(); // Kembalikan kursor ke input bermasalah
      return;
    }

    onWorkspaceDibuat(formData);
    // Reset form
    setFormData({ namaWorkspace: "", slugUrl: "", visibilitas: "PRIVAT", deskripsi: "" });
    inputNamaRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "420px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <h3>Buat Ruang Kerja Baru</h3>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "4px" }}>Nama Workspace *</label>
        <input
          ref={inputNamaRef}
          type="text"
          name="namaWorkspace"
          value={formData.namaWorkspace}
          onChange={handleInputChange}
          placeholder="contoh: Tim Finansial Core"
          style={{ width: "100%", padding: "8px", boxSizing: "border-box", border: errors.namaWorkspace ? "1px solid red" : "1px solid #cbd5e1", borderRadius: "4px" }}
        />
        {errors.namaWorkspace && <small style={{ color: "#ef4444" }}>{errors.namaWorkspace}</small>}
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "4px" }}>Slug URL</label>
        <input
          type="text"
          name="slugUrl"
          value={formData.slugUrl}
          onChange={handleInputChange}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box", border: "1px solid #cbd5e1", borderRadius: "4px", background: "#f8fafc" }}
        />
      </div>

      <button type="submit" style={{ width: "100%", padding: "10px", background: "#0f172a", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
        Buat Workspace Sekarang
      </button>
    </form>
  );
}

export default FormBuatWorkspace;
""",
        'objectivesId': [
            'Memahami filosofi Controlled Components di mana state React menjadi sumber kebenaran tunggal',
            'Menghubungkan atribut value dan handler onChange pada elemen input, select, dan textarea',
            'Menggunakan satu fungsi handler generik untuk menangani banyak input formulir sekaligus',
            'Menerapkan validasi form real-time dan penanganan pesan eror pengguna',
            'Memanfaatkan hook useRef untuk menyimpan referensi DOM langsung tanpa memicu re-render',
        ],
        'objectivesEn': [
            'Master Controlled Components where React state serves as the single source of truth',
            'Bind value attributes and onChange dispatchers across inputs, selects, and textareas',
            'Deploy unified generic input handlers managing multiple schema fields dynamically',
            'Implement client-side real-time form validation and contextual error messaging',
            'Leverage useRef to retain imperative DOM handles without causing re-render passes',
        ],
        'explanationId': """### Controlled vs Uncontrolled Components
- **Uncontrolled Component**: Input formulir menyimpan nilainya sendiri di dalam DOM internal browser (seperti HTML tradisional). Anda harus menarik nilainya menggunakan `ref.current.value`.
- **Controlled Component**: React memegang kendali penuh. Nilai input selalu di-drive oleh state (`value={state}`) dan setiap ketukan keyboard memicu `onChange` yang memperbarui state.
Keunggulan Controlled Components: Anda dapat melakukan validasi instan, masking format (misal format nomor kartu kredit), dan menonaktifkan tombol submit secara real-time.

### Kapan Menggunakan `useRef`?
Hook `useRef` menghasilkan objek `{ current: initialValue }` yang bertahan sepanjang siklus hidup komponen.
Berbeda dengan `useState`, **mengubah `ref.current` TIDAK memicu re-render komponen**.
Gunakan `useRef` untuk:
1. Mengakses node DOM browser langsung (misal: memanggil `.focus()`, `.select()`, atau mengukur tinggi elemen).
2. Menyimpan ID timer (`setTimeout` / `setInterval`) yang tidak memengaruhi tampilan UI.""",
        'explanationEn': """### Controlled vs Uncontrolled Forms
- **Uncontrolled Components**: The browser DOM maintains native input value state internally; developers read values imperatively via `ref.current.value`.
- **Controlled Components**: React reigns as the single source of truth. Input display is strictly bound to state (`value={state}`), while keystrokes trigger `onChange` reconciling state.
Controlled forms empower instant validation, dynamic input masking (e.g. currency formatting), and conditional submit button state.

### Strategic Deployment of `useRef`
`useRef` returns a mutable `{ current: value }` container persisting across the component lifetime.
Crucially: **mutating `ref.current` NEVER triggers a re-render pass**.
Ideal applications for `useRef`:
1. Managing imperative DOM nodes (e.g., executing `.focus()`, `.scrollIntoView()`).
2. Persisting mutable runtime metadata (timers, intervals, previous state snapshots).""",
        'beginnerId': """### Analogi: Kemudi Mobil Elektrik & Buku Memo di Saku
1. **Controlled Input** seperti kemudi mobil modern berbasis *drive-by-wire*: saat Anda memutar setir, sinyal dikirim ke komputer mobil terlebih dahulu (*state*), lalu komputer menggerakkan roda (*DOM*). Komputer punya kuasa penuh membatasi belokan tajam berbahaya (*validasi*).
2. **useRef** seperti secarik kertas memo di saku sopir: sopir bisa menulis catatan nomor pintu gerbang tanpa perlu mematikan dan menyalakan ulang mesin mobil (*tanpa re-render*).""",
        'beginnerEn': """### Analogy: Drive-By-Wire Steering & Glovebox Notepads
1. **Controlled Inputs** resemble drive-by-wire automotive steering: turning the wheel transmits telemetry to the vehicle central processing unit (*state*), which directs the tires (*DOM*), validating against dangerous spinouts (*validation*).
2. **useRef** is a pencil notepad tucked in the glove compartment: the driver writes a gate passcode without restarting the vehicle engine (*zero re-renders*).""",
        'experimentsId': [
            'Ketik nama workspace dan amati slugUrl terisi secara otomatis berkat handler terpusat.',
            'Kosongkan nama workspace dan klik submit untuk mengamati kursor otomatis kembali fokus ke input nama via ref.',
            'Tambahkan input radio untuk memilih visibilitas: PUBLIK atau PRIVAT.',
            'Coba ubah state formData langsung tanpa setter dan perhatikan input terkunci tidak bisa diketik.',
        ],
        'experimentsEn': [
            'Type a workspace title and observe the slug URL slugify automatically in real-time.',
            'Submit an empty form to observe autofocus snapping back to the invalid input via ref.',
            'Add radio inputs toggling visibility between PUBLIC and PRIVATE.',
            'Attempt mutating formData without the setter to witness inputs freeze.',
        ],
        'challengeId': 'Tambahkan validasi asinkron tiruan: saat user selesai mengetik slug URL, periksa apakah slug sudah dipakai ("demo", "admin", "test"). Tampilkan pesan "Slug ini sudah dipakai!" jika cocok.',
        'challengeEn': 'Implement mock asynchronous validation: once the slug is finalized, check if it matches reserved handles ("demo", "admin", "test"), displaying an inline collision warning.',
        'summaryId': 'Kamu telah menguasai controlled forms, validasi input, dan useRef. Minggu depan kita memasuki Level 2: useEffect, siklus hidup reaktif, dan integrasi API.',
        'summaryEn': 'You have mastered controlled forms, validations, and useRef. Next week, we enter Level 2: useEffect, reactive lifecycles, and API integration.',
    },

    # Level 2: Side Effects, Context & Arsitektur Reducer (Weeks 5-7)
    {
        'week': 5,
        'level': 'intermediate',
        'topicId': 'useeffect-dan-lifecycle',
        'titleId': 'useEffect: Siklus Hidup Reaktif, Cleanup Function & AbortController',
        'titleEn': 'useEffect: Reactive Lifecycles, Cleanup Functions & AbortController',
        'programId': 'Sinkronisasi Dokumen Cloud dengan Pembatalan Race Condition',
        'programEn': 'Cloud Document Synchronization with Race Condition Cancellation',
        'levelNameId': 'Side Effects, Context & Arsitektur Reducer',
        'levelNameEn': 'Side Effects, Context & Reducer Architecture',
        'language': 'jsx',
        'code': """import { useState, useEffect } from "react";

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
""",
        'objectivesId': [
            'Memahami filosofi Side Effects dalam React (operasi yang berkomunikasi dengan dunia luar browser)',
            'Menguasai Dependency Array useEffect: [] (mount only), [dep] (on change), dan tanpa array (setiap render)',
            'Menulis Cleanup Function untuk membersihkan event listeners, intervals, dan koneksi websocket',
            'Mencegah Race Conditions pada permintaan fetch asinkron menggunakan AbortController bawaan',
            'Menghindari infinite loop re-render yang disebabkan oleh ketergantungan objek/fungsi tidak stabil',
        ],
        'objectivesEn': [
            'Understand Side Effects in React (operations synchronizing with external browser subsystems)',
            'Master the useEffect Dependency Array: [] (mount only), [deps] (on mutation), and omitted (every pass)',
            'Author Cleanup Functions pruning event listeners, intervals, and open sockets',
            'Intercept async fetch Race Conditions using native AbortController signals',
            'Prevent infinite re-render cycles caused by unstable object and function dependencies',
        ],
        'explanationId': """### Apa itu Side Effect?
Komponen React yang ideal adalah *Pure Function*: menerima props, mengembalikan JSX tanpa efek samping. Namun aplikasi nyata membutuhkan **Side Effects**: memanggil REST API, berlangganan WebSocket, memanipulasi judul tab browser (`document.title`), atau mendaftarkan event window global.
`useEffect` adalah gerbang resmi untuk mengeksekusi efek-efek ini setelah browser menyelesaikan proses render DOM.

### Tiga Variasi Dependency Array
1. `useEffect(() => { ... })`: Tanpa array dependency. Efek dijalankan **setiap kali render selesai**. Berbahaya jika ada setter state di dalamnya (menyebabkan *infinite loop*).
2. `useEffect(() => { ... }, [])`: Array kosong. Efek hanya dijalankan **sekali saat komponen pertama kali dipasang (*mount*)**.
3. `useEffect(() => { ... }, [id, query])`: Efek dijalankan saat mount dan **setiap kali salah satu variabel dalam array mengalami perubahan nilai**.

### Mengapa Cleanup Function Wajib?
Jika Anda mendaftarkan `window.addEventListener("scroll", handler)` tanpa membersihkannya di return function `window.removeEventListener`, setiap kali komponen me-render ulang, event listener baru akan ditumpuk terus-menerus. Ini menyebabkan kebocoran memori (*memory leak*) parah yang dapat membekukan browser pengguna!""",
        'explanationEn': """### Demystifying Side Effects
Ideal React components behave as Pure Functions: mapping inputs to JSX without mutations. Real applications necessitate **Side Effects**: fetching REST APIs, opening WebSockets, updating `document.title`, or listening to window events.
`useEffect` serves as the official lifecycle boundary orchestrating these operations after the DOM commits.

### The Dependency Array Matrix
1. `useEffect(() => { ... })`: Omitted dependency array. Triggers **after every render cycle**. Mutating state within triggers an infinite loop.
2. `useEffect(() => { ... }, [])`: Empty array. Executes strictly **once upon component mount**.
3. `useEffect(() => { ... }, [id, query])`: Re-executes on mount and whenever **dependencies register reference inequality**.

### The Necessity of Cleanup Functions
Registering global subscriptions via `window.addEventListener` without unbinding in a return cleanup callback causes zombie listeners to accumulate across re-renders. This induces catastrophic memory leaks and performance degradation.""",
        'beginnerId': """### Analogi: Petugas Kebersihan Hotel & Sambungan Telepon
1. **useEffect** seperti panggilan telepon resepsionis hotel: begitu tamu check-in ke kamar (*mount*), resepsionis menelepon untuk memastikan lampu menyala dan AC dingin (*fetch data*).
2. **Cleanup Function** seperti petugas kebersihan hotel: begitu tamu check-out (*unmount* atau pindah kamar), petugas wajib membersihkan sprei dan mematikan AC agar kamar siap digunakan tamu baru tanpa meninggalkan sampah lama (*memory leak*).""",
        'beginnerEn': """### Analogy: Hotel Concierge & Housekeeping Turnover
1. **useEffect** is the hotel room welcome protocol: when a guest checks in (*component mount*), the concierge activates air conditioning and serves welcome tea (*fetch data*).
2. **Cleanup Function** is housekeeping turnover: when the guest checks out (*component unmount* or room switch), staff clear linens and turn off utilities so subsequent guests enter an pristine room (*zero memory leaks*).""",
        'experimentsId': [
            'Ubah documentId dari 1 ke 2 secara cepat dan amati log konsol menunjukkan cleanup dokumen 1 sebelum dokumen 2 dimuat.',
            'Matikan koneksi WiFi laptop Anda dan amati indikator statusJaringan berubah menjadi Offline berkat window event.',
            'Hapus array dependency [] dan perhatikan log konsol meledak berulang kali.',
            'Ubah document.title browser di dalam useEffect agar menampilkan judul dokumen aktif.',
        ],
        'experimentsEn': [
            'Rapidly cycle documentId between 1 and 2 to verify cleanup cancels the previous fetch sequence.',
            'Disconnect device network connectivity to observe the reactive Offline indicator flip.',
            'Omit the dependency array to witness uncontrolled render explosions in the console.',
            'Update browser document.title dynamically within useEffect to track the active document.',
        ],
        'challengeId': 'Buat hook effect yang mendengarkan ketukan tombol keyboard `Escape`. Saat tombol Escape ditekan, tutup jendela modal aktif dan pastikan event listener dibersihkan saat modal tertutup.',
        'challengeEn': 'Author an effect hook subscribing to `Escape` key events, dismissing active dialog modals while guaranteeing flawless listener deregistration.',
        'summaryId': 'Kamu telah menguasai siklus hidup useEffect, aturan dependensi, dan cleanup function. Minggu depan kita mempelajari Context API untuk manajemen state global.',
        'summaryEn': 'You have mastered useEffect lifecycles, dependencies, and cleanup mechanics. Next week, we examine the Context API for global state management.',
    },
    {
        'week': 6,
        'level': 'intermediate',
        'topicId': 'usecontext-dan-state-management',
        'titleId': 'Context API: Mengatasi Prop Drilling & Arsitektur State Terdistribusi',
        'titleEn': 'Context API: Eliminating Prop Drilling & Distributed State Architecture',
        'programId': 'Sistem Tema & Autentikasi Pengguna Global Workspace',
        'programEn': 'Global Workspace Theme & User Authentication State Provider',
        'levelNameId': 'Side Effects, Context & Arsitektur Reducer',
        'levelNameEn': 'Side Effects, Context & Reducer Architecture',
        'language': 'jsx',
        'code': """import { createContext, useContext, useState } from "react";

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
""",
        'objectivesId': [
            'Memahami fenomena Prop Drilling (mengoper props melewati banyak level komponen yang tidak membutuhkannya)',
            'Membuat dan mengonfigurasi React Context menggunakan createContext() dan Provider',
            'Membangun Custom Provider Component yang mengkapsulasi state dan aksi mutasi',
            'Menulis Custom Hook (useWorkspace) untuk keamanan tipe dan validasi hierarki pohon',
            'Memahami batas performa Context API dan kapan saatnya memecah context menjadi beberapa bagian',
        ],
        'objectivesEn': [
            'Diagnose Prop Drilling symptoms (passing attributes down deeply unneeded layers)',
            'Instantiate and configure Context boundaries via createContext() and Provider components',
            'Author Custom Providers encapsulating internal reactive state and dispatch APIs',
            'Author ergonomics-enhancing Custom Hooks (useWorkspace) enforcing Provider parent boundaries',
            'Recognize Context re-render performance boundaries and apply structural context splitting',
        ],
        'explanationId': """### Masalah Klasik: Prop Drilling
Ketika data autentikasi pengguna atau preferensi tema berada di komponen puncak `App`, namun dibutuhkan oleh tombol kecil di dalam `Sidebar > ProfilWidget > TombolMenu`, Anda terpaksa mengoper props tersebut melalui 4-5 komponen perantara. Komponen perantara tersebut menjadi kotor oleh props yang sebenarnya tidak mereka pedulikan.

### Solusi: Context API
Context API menyediakan cara untuk berbagi nilai ke seluruh pohon komponen tanpa harus mengoper props secara manual di setiap tingkatan.
Komponen utama:
1. `createContext()`: Menciptakan saluran context.
2. `Provider`: Membungkus sub-pohon komponen dan menyuplai data `value`.
3. `useContext()`: Mengakses data dari saluran tersebut di komponen daun manapun secara langsung.

### Praktik Terbaik: Selalu Buat Custom Hook Pembungkus
Jangan pernah mengekspor context mentah. Selalu bungkus dalam custom hook seperti `useWorkspace()`.
Ini memberikan validasi otomatis: jika pengembang lupa membungkus komponen dengan `WorkspaceProvider`, sistem langsung memberikan pesan eror yang jelas, bukan error `TypeError: Cannot destructure property of null` yang membingungkan.""",
        'explanationEn': """### The Prop Drilling Bottleneck
When authentication claims or theme tokens originate at the root `App` container but are required deep down within `Sidebar > ProfileCard > MenuButton`, intermediate components must relay attributes through 5 component boundaries. This pollutes intermediate interfaces.

### The Remedy: Context API
Context enables telemetry streaming across arbitrary component subtrees without manual pass-through plumbing.
Anatomy:
1. `createContext()`: Initializes the broadcast channel.
2. `Provider`: Envelops the consumer tree, publishing the mutable `value` payload.
3. `useContext()`: Direct tap allowing any child component to consume tokens instantaneously.

### Production Pattern: Encapsulated Consumer Hooks
Never expose bare Context tokens directly across consumer modules. Always wrap consumption inside dedicated hooks (`useWorkspace()`).
This guarantees runtime verification: omitting the outer Provider triggers explicit human-readable diagnostics rather than cryptic destructuring crashes.""",
        'beginnerId': """### Analogi: Saluran Pipa Air Bersih & Radio Pemancar Kota
1. **Prop Drilling** seperti mengoper ember air dari tangan ke tangan melewati 10 orang dari sumur hingga ke kamar mandi lantai atas: jika satu orang lelah atau salah oper, ember air tumpah.
2. **Context API** seperti memasang pipa air bertekanan atau stasiun radio kota: siapa saja di rumah yang membuka keran kamar mandi langsung mendapat air mengalir, atau menyalakan radio pada gelombang yang sama langsung mendengar siaran tanpa perantara.""",
        'beginnerEn': """### Analogy: Bucket Brigades vs Municipal Water Mains
1. **Prop Drilling** is a fire bucket brigade: passing water hand-to-hand across 10 people up three flights of stairs; one dropped bucket breaks the entire pipeline.
2. **Context API** is a pressurized municipal water pipe: turning any tap in any suite flows water on-demand without burdening intermediate tenants.""",
        'experimentsId': [
            'Klik tombol "Mode Gelap/Terang" dan amati bagaimana warna komponen daun berubah seketika tanpa prop drilling.',
            'Pindahkan ProfilPenggunaHeader ke luar dari <WorkspaceProvider> dan amati pesan eror custom hook yang mendidik.',
            'Tambahkan fungsi ubahNamaPengguna ke dalam Provider dan panggil dari komponen anak.',
            'Pecahkan context menjadi ThemeContext dan UserContext untuk mencegah re-render tema memicu re-render profil pengguna.',
        ],
        'experimentsEn': [
            'Toggle Theme mode and observe the child component adapt instantaneously without prop plumbing.',
            'Relocate ProfilPenggunaHeader outside <WorkspaceProvider> to verify the defensive hook error boundary.',
            'Inject an updateUserName dispatcher into the Provider and consume from a child element.',
            'Partition state into ThemeContext and UserContext to insulate theme renders from user claims.',
        ],
        'challengeId': 'Buat `NotifikasiContext` global yang memiliki fungsi `tampilkanNotifikasi(pesan, tipe)`. Komponen apapun di aplikasi harus bisa memunculkan pesan toast mengambang di pojok kanan atas.',
        'challengeEn': 'Architect a global `NotificationContext` exposing `showNotification(message, type)` enabling any nested application component to trigger transient toast notifications.',
        'summaryId': 'Kamu telah menguasai Context API, pencegahan prop drilling, dan custom consumer hooks. Minggu depan kita mempelajari useReducer untuk state kompleks.',
        'summaryEn': 'You have mastered the Context API, prop drilling elimination, and consumer hooks. Next week, we examine useReducer for complex state machines.',
    },
    {
        'week': 7,
        'level': 'intermediate',
        'topicId': 'usereducer-dan-complex-state',
        'titleId': 'useReducer: Arsitektur State Machine & Transisi Terprediksi',
        'titleEn': 'useReducer: State Machine Architecture & Predictable Transitions',
        'programId': 'Mesin Reducer Editor Blok Dokumen Notion-Style',
        'programEn': 'Notion-Style Document Canvas Block Reducer Engine',
        'levelNameId': 'Side Effects, Context & Arsitektur Reducer',
        'levelNameEn': 'Side Effects, Context & Reducer Architecture',
        'language': 'jsx',
        'code': """import { useReducer } from "react";

// 1. Initial State
const stateAwal = {
  dokumenId: "DOC-99",
  judul: "Spesifikasi Fitur v2",
  blokList: [
    { id: "b1", tipe: "HEADING", isi: "Pendahuluan Arsitektur" },
    { id: "b2", tipe: "TEKS", isi: "Sistem menggunakan arsitektur modular terdesentralisasi." }
  ],
  riwayatUndo: []
};

// 2. Reducer Function: Pure function (State, Action) => NewState
function editorReducer(state, action) {
  switch (action.type) {
    case "TAMBAH_BLOK": {
      const blokBaru = {
        id: `b-${Date.now()}`,
        tipe: action.payload.tipe || "TEKS",
        isi: action.payload.isi || ""
      };
      return {
        ...state,
        riwayatUndo: [...state.riwayatUndo, state.blokList],
        blokList: [...state.blokList, blokBaru]
      };
    }

    case "UPDATE_ISI_BLOK": {
      return {
        ...state,
        blokList: state.blokList.map((b) =>
          b.id === action.payload.id ? { ...b, isi: action.payload.isi } : b
        )
      };
    }

    case "HAPUS_BLOK": {
      return {
        ...state,
        riwayatUndo: [...state.riwayatUndo, state.blokList],
        blokList: state.blokList.filter((b) => b.id !== action.payload.id)
      };
    }

    case "UNDO": {
      if (state.riwayatUndo.length === 0) return state;
      const snapshotSebelumnya = state.riwayatUndo[state.riwayatUndo.length - 1];
      return {
        ...state,
        blokList: snapshotSebelumnya,
        riwayatUndo: state.riwayatUndo.slice(0, -1)
      };
    }

    default:
      throw new Error(`Aksi tidak dikenali: ${action.type}`);
  }
}

// 3. Komponen Editor Kanvas
export default function CanvasReducerEditor() {
  const [state, dispatch] = useReducer(editorReducer, stateAwal);

  return (
    <div style={{ maxWidth: "550px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>{state.judul}</h3>
        <div>
          <button
            onClick={() => dispatch({ type: "UNDO" })}
            disabled={state.riwayatUndo.length === 0}
            style={{ padding: "6px 12px", cursor: state.riwayatUndo.length > 0 ? "pointer" : "not-allowed" }}
          >
            ↶ Undo ({state.riwayatUndo.length})
          </button>
          <button
            onClick={() => dispatch({ type: "TAMBAH_BLOK", payload: { tipe: "TEKS", isi: "Catatan baru..." } })}
            style={{ marginLeft: "8px", padding: "6px 12px", background: "#2563eb", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            + Blok Teks
          </button>
        </div>
      </div>

      <div style={{ marginTop: "16px", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "12px" }}>
        {state.blokList.map((blok) => (
          <div key={blok.id} style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "center" }}>
            <span style={{ fontSize: "11px", color: "#64748b", width: "60px" }}>{blok.tipe}</span>
            <input
              type="text"
              value={blok.isi}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_ISI_BLOK",
                  payload: { id: blok.id, isi: e.target.value }
                })
              }
              style={{ flex: 1, padding: "6px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
            />
            <button
              onClick={() => dispatch({ type: "HAPUS_BLOK", payload: { id: blok.id } })}
              style={{ background: "#fee2e2", color: "#b91c1c", border: "none", borderRadius: "4px", padding: "6px 10px", cursor: "pointer" }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
""",
        'objectivesId': [
            'Memahami kapan harus beralih dari useState ke useReducer untuk state kompleks',
            'Menguasai anatomi Reducer: fungsi murni (State, Action) => NewState',
            'Menstandarkan format Action Object menggunakan pola type dan payload',
            'Mengimplementasikan fitur Undo/Redo dengan menyimpan snapshot riwayat state',
            'Memisahkan logika bisnis mutasi state dari tampilan antarmuka visual secara elegan',
        ],
        'objectivesEn': [
            'Recognize inflection points favoring useReducer over multiple useState hooks',
            'Master the Reducer anatomy: deterministic pure functions (State, Action) => NewState',
            'Standardize Action Object schemas following the `{ type, payload }` convention',
            'Architect Undo/Redo functionality by capturing state snapshot history stacks',
            'Decouple business transition logic cleanly from visual UI rendering layers',
        ],
        'explanationId': """### Mengapa useReducer Mengubah Permainan?
Ketika komponen Anda memiliki:
1. State objek bersarang (*nested state*).
2. Perubahan satu nilai state bergantung pada nilai state lainnya.
3. Logika pembaruan yang kompleks (tambah, edit, hapus, susun ulang, undo, redo).
Menggunakan banyak `useState` akan membuat kode Anda berantakan dan rawan *race conditions*.
`useReducer` memisahkan **APA yang terjadi (*Action*)** dari **BAGAIMANA state diubah (*Reducer*)**.

### Prinsip Reducer Murni
Fungsi reducer **wajib merupakan pure function**:
- Tidak boleh memanggil API di dalam reducer.
- Tidak boleh memanggil `Math.random()` atau `Date.now()` di dalam reducer (masukkan via payload).
- Dilarang memutasi state asli secara langsung; selalu kembalikan salinan objek baru (`...state`).

### Pasangan Sempurna: useReducer + useContext
Ketika Anda menggabungkan `useReducer` di dalam `Context.Provider`, Anda dapat mengoper fungsi `dispatch` ke komponen anak di level berapapun. Ini adalah pondasi arsitektur state management ala Redux tanpa perlu menginstal library eksternal apapun!""",
        'explanationEn': """### Why useReducer Dominates Complex Domain Logic
When application state encompasses:
1. Deeply nested object graph topologies.
2. Interdependent state updates where one mutation pivots upon sibling keys.
3. Complex workflows (insert, prune, splice, reorder, undo, redo stacks).
Managing state via fragmented `useState` setters breeds divergence.
`useReducer` decouples **WHAT occurred (*Action Dispatch*)** from **HOW transitions execute (*Reducer Heuristics*)**.

### Pure Function Tenets
Reducers **must remain strictly deterministic pure functions**:
- Never initiate asynchronous I/O or network calls within reducers.
- Avoid nondeterministic generators (`Math.random()`, `Date.now()`) inside the transition block (pass through payloads).
- Never mutate incoming state references; project fresh immutable snapshots (`...state`).

### The Ultimate Duo: useReducer + useContext
Binding `useReducer` to a root `Context.Provider` allows distributing the `dispatch` handle down arbitrary component layers. This delivers a native lightweight Redux-style store without adding third-party dependencies.""",
        'beginnerId': """### Analogi: Akuntan Perusahaan & Formulir Transaksi
1. **useState** seperti mengambil uang langsung dari dompet: Anda bebas mengeluarkan lembaran uang kapan saja tanpa catatan resmi.
2. **useReducer** seperti kasir bank: Anda tidak boleh menyentuh brankas langsung. Anda mengisi slip setoran (*Action Object* bertipe 'SETOR_DANA'), menyerahkannya ke teller (*Dispatch*), dan petugas akuntan bank (*Reducer*) memproses pembukuan secara resmi dan rapi.""",
        'beginnerEn': """### Analogy: Petty Cash Wallets vs Banking Tellers
1. **useState** is reaching into a petty cash pocket: retrieving bills directly without structured audit slips.
2. **useReducer** is a bank teller transaction: you cannot open the vault doors directly. You complete a deposit slip (*Action Object* typed 'DEPOSIT_FUNDS'), hand it to the teller (*Dispatch*), and the head auditor (*Reducer*) processes the ledger strictly.""",
        'experimentsId': [
            'Hapus sebuah blok, lalu klik tombol "Undo" dan perhatikan blok yang terhapus kembali secara ajaib.',
            'Coba kirimkan aksi dengan tipe yang salah dispatch({ type: "AKSI_PALSU" }) dan lihat penanganan erornya.',
            'Tambahkan aksi baru "PINDAH_BLOK_ATAS" yang menukar urutan blok di dalam array.',
            'Simpan riwayat aksi (action logs) di dalam state untuk keperluan audit pengguna.',
        ],
        'experimentsEn': [
            'Delete a block, press the "Undo" trigger, and observe the discarded block restore accurately.',
            'Dispatch an unknown action type to inspect the exhaustive error throwing boundary.',
            'Author a "MOVE_BLOCK_UP" action swapping adjacent array items immutably.',
            'Record an append-only action journal in state for telemetry and auditing.',
        ],
        'challengeId': 'Tambahkan aksi "REDO" pada `editorReducer` yang memungkinkan pengguna membatalkan operasi Undo sebelumnya menggunakan stack riwayat `riwayatRedo`.',
        'challengeEn': 'Implement a "REDO" action within `editorReducer` allowing users to reverse prior Undo invocations leveraging an isolated `riwayatRedo` stack.',
        'summaryId': 'Kamu telah menguasai useReducer, arsitektur Action-Reducer terprediksi, dan snapshot state undo. Minggu depan kita memasuki Level 3: Optimasi Performa dengan useMemo dan useCallback.',
        'summaryEn': 'You have mastered useReducer, deterministic Action-Reducer architectures, and undo snapshots. Next week, we enter Level 3: Performance Optimization with useMemo and useCallback.',
    },

    # Level 3: Optimasi Performa, Custom Hooks & Capstone Editor (Weeks 8-10)
    {
        'week': 8,
        'level': 'advanced',
        'topicId': 'optimasi-usememo-usecallback-memo',
        'titleId': 'Optimasi Performa: React.memo, useMemo, useCallback & Profiling',
        'titleEn': 'Performance Optimization: React.memo, useMemo, useCallback & Profiling',
        'programId': 'Pencarian & Pemfilteran Blok Dokumen Berkecepatan Tinggi',
        'programEn': 'High-Throughput Document Block Search & Virtualized Filter Engine',
        'levelNameId': 'Optimasi Performa, Custom Hooks & Capstone Editor',
        'levelNameEn': 'Performance Optimization, Custom Hooks & Capstone Editor',
        'language': 'jsx',
        'code': """import { useState, useMemo, useCallback, memo } from "react";

// 1. React.memo: Mencegah re-render komponen anak jika props-nya tidak berubah
const BlokBarisTampilan = memo(function BlokBarisTampilan({ item, onPilih }) {
  console.log(`[Render Baris] Render item: ${item.id}`);

  return (
    <div
      onClick={() => onPilih(item.id)}
      style={{
        padding: "8px 12px",
        borderBottom: "1px solid #e2e8f0",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <span>{item.isi}</span>
      <span style={{ fontSize: "11px", color: "#64748b" }}>{item.kategori}</span>
    </div>
  );
});

export default function WorkspaceSearchOptimizer() {
  const [query, setQuery] = useState("");
  const [temaGelap, setTemaGelap] = useState(false);
  const [terpilih, setTerpilih] = useState(null);

  // Kumpulan 5000 data blok simulasi
  const semuaBlok = useMemo(() => {
    return Array.from({ length: 1000 }, (_, i) => ({
      id: `b-${i}`,
      isi: `Dokumen Catatan Teknis #${i} modul sistem`,
      kategori: i % 2 === 0 ? "Engineering" : "Operasional"
    }));
  }, []); // Hanya dibuat sekali saat mount

  // 2. useMemo: Menyimpan hasil komputasi berat (filter teks) agar tidak dihitung ulang saat state tema berubah
  const hasilFilter = useMemo(() => {
    console.log("[Komputasi Berat] Memfilter daftar blok...");
    return semuaBlok.filter((b) =>
      b.isi.toLowerCase().includes(query.toLowerCase())
    );
  }, [semuaBlok, query]);

  // 3. useCallback: Menjaga referensi fungsi tetap sama agar React.memo pada anak tidak jebol
  const handlePilihItem = useCallback((id) => {
    setTerpilih(id);
  }, []);

  return (
    <div style={{
      maxWidth: "500px",
      margin: "20px auto",
      fontFamily: "sans-serif",
      background: temaGelap ? "#1e293b" : "#ffffff",
      color: temaGelap ? "#ffffff" : "#000000",
      padding: "16px",
      borderRadius: "8px",
      border: "1px solid #cbd5e1"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
        <h3>Pencarian Blok ({hasilFilter.length} ditemukan)</h3>
        <button onClick={() => setTemaGelap(!temaGelap)}>
          Ganti Tema
        </button>
      </div>

      <input
        type="text"
        placeholder="Cari blok catatan..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: "8px", boxSizing: "border-box", marginBottom: "12px" }}
      />

      <div style={{ maxHeight: "250px", overflowY: "auto", border: "1px solid #cbd5e1" }}>
        {hasilFilter.slice(0, 10).map((item) => (
          <BlokBarisTampilan
            key={item.id}
            item={item}
            onPilih={handlePilihItem}
          />
        ))}
      </div>
    </div>
  );
}
""",
        'objectivesId': [
            'Memahami bagaimana dan kapan React melakukan re-render komponen secara mendalam',
            'Menggunakan React.memo() untuk mencegah re-render komponen presentasional murni',
            'Memanfaatkan useMemo() untuk meng-cache hasil perhitungan matematis atau pemfilteran data berat',
            'Menggunakan useCallback() untuk mempertahankan integritas referensi fungsi callback',
            'Menghindari optimasi prematur (Premature Optimization) dan mengetahui biaya komputasi memoization',
        ],
        'objectivesEn': [
            'Understand the mechanics and triggers governing React component re-render trees',
            'Deploy React.memo() to insulate pure presentational children from parent renders',
            'Leverage useMemo() to memoize expensive computations and data filtering pipelines',
            'Employ useCallback() to retain stable functional reference equality across renders',
            'Avoid Premature Optimization pitfalls and recognize overhead costs of memoization wrappers',
        ],
        'explanationId': """### Mengapa Komponen Me-render Ulang?
Secara bawaan di React: **ketika komponen induk me-render ulang, SELURUH komponen anaknya akan ikut me-render ulang**, meskipun props yang diterima anak tidak mengalami perubahan sama sekali!
Pada aplikasi kecil ini tidak terasa, namun pada aplikasi dengan ribuan baris data dokumen atau grafik kompleks, hal ini dapat menyebabkan lag antarmuka yang parah.

### Tiga Pilar Optimasi React
1. **`React.memo(Component)`**: Membungkus komponen anak. React akan melakukan perbandingan dangkal (*shallow compare*) terhadap props yang masuk. Jika props sama persis, render anak dilewati (*skipped*).
2. **`useCallback(fn, deps)`**: Mempertahankan referensi memori fungsi callback. Mengapa ini penting? Di JavaScript, `() => {} !== () => {}`. Setiap kali parent render, fungsi inline baru tercipta di memori, yang menyebabkan `React.memo` pada anak mengira props-nya berubah!
3. **`useMemo(() => compute(), deps)`**: Meng-cache hasil perhitungan data. Jika query pencarian tidak berubah, jangan lakukan filter pada 10.000 item berulang kali saat tombol ganti tema diklik.

### Peringatan: Jangan Memoize Semua Hal!
`useMemo` dan `useCallback` memiliki biaya memori dan overhead pemeriksaan dependensi. Gunakan hanya saat Anda memiliki data yang benar-benar besar atau komponen anak yang sering me-render ulang tanpa alasan.""",
        'explanationEn': """### Why React Components Re-render
Default React runtime behavior dictates: **when a parent reconciles, its ENTIRE child tree re-renders unconditionally**, regardless of whether child props changed!
In lightweight pages this is negligible, but within massive data grids, block editors, or canvas visualizations, unnecessary passes induce UI stutter.

### The Triad of React Optimization
1. **`React.memo(Component)`**: High-order component comparing props via shallow reference equality. If incoming props match previous signatures, reconciliation of the child subtree skips.
2. **`useCallback(fn, deps)`**: Pins function instance memory pointers across renders. Crucial because `(() => {}) !== (() => {})`. Inline handler definitions generate fresh references every pass, breaking `React.memo` downstream.
3. **`useMemo(() => compute(), deps)`**: Caches expensive synchronous algorithmic calculations. If the search query is unchanged, avoid re-filtering 10,000 array elements simply because a theme toggle flipped.

### Warning: Avoid Premature Optimization
Both `useMemo` and `useCallback` introduce memory allocation and dependency diffing overhead. Deploy them purposefully when Profiler snapshots indicate tangible rendering bottlenecks.""",
        'beginnerId': """### Analogi: Meja Cetak Foto & Resep Kue Terkenal
1. **React.memo** seperti penjaga pintu bioskop: jika Anda sudah memegang tiket berstempel hari ini, penjaga mempersilakan Anda langsung duduk tanpa perlu wawancara ulang dari awal.
2. **useMemo** seperti koki yang mencatat berat takaran resep adonan 500 porsi di papan tulis: saat tamu baru datang, koki membaca angka di papan alih-alih menimbang ulang 500 butir telur dari awal.
3. **useCallback** seperti stempel tanda tangan basah pimpinan: bentuk tanda tangannya tetap sah dan sama sepanjang tahun, bukan tanda tangan baru yang terus berubah-ubah setiap hari.""",
        'beginnerEn': """### Analogy: Theater Usheers & Prepared Recipe Charts
1. **React.memo** is a fast-track cinema usher: if your wristband is already stamped for today, you walk straight into the theater without full identity re-verification.
2. **useMemo** is a master baker's laminated 500-loaf conversion chart: referencing the pre-calculated flour weight avoids hand-calculating arithmetic on every customer order.
3. **useCallback** is an official corporate seal: stamping outgoing documents with a verified immutable stamp rather than scribbling a slightly divergent signature every single minute.""",
        'experimentsId': [
            'Buka konsol browser, klik tombol "Ganti Tema", dan perhatikan bahwa [Komputasi Berat] TIDAK dipanggil ulang berkat useMemo!',
            'Hapus useCallback dari handlePilihItem dan amati bahwa BlokBarisTampilan me-render ulang saat tema berganti.',
            'Ketik teks pencarian pada input dan perhatikan konsol memfilter secara reaktif hanya saat query berubah.',
            'Gunakan React DevTools Profiler untuk mengukur waktu render komponen sebelum dan sesudah optimasi.',
        ],
        'experimentsEn': [
            'Open devtools console, click "Ganti Tema", and observe [Komputasi Berat] skips thanks to useMemo!',
            'Remove useCallback from handlePilihItem and verify BlokBarisTampilan re-renders on theme toggles.',
            'Enter filter characters to witness the computational pipeline execute only when query mutations occur.',
            'Profile component render timelines before and after memoization using React DevTools.',
        ],
        'challengeId': 'Bangun hook `useDebounce(value, delay)` yang menunda pemfilteran teks selama 300ms agar useMemo tidak berjalan pada setiap ketukan huruf yang terlalu cepat.',
        'challengeEn': 'Build a `useDebounce(value, delay)` custom hook delaying text query evaluation by 300ms to throttle search computation cascades.',
        'summaryId': 'Kamu telah menguasai teknik profiling performa, React.memo, useMemo, dan useCallback. Minggu depan kita mempelajari pembuatan Custom Hooks reusable.',
        'summaryEn': 'You have mastered performance profiling, React.memo, useMemo, and useCallback. Next week, we examine authoring reusable Custom Hooks.',
    },
    {
        'week': 9,
        'level': 'advanced',
        'topicId': 'custom-hooks-dan-patterns',
        'titleId': 'Custom Hooks Modern: Enkapsulasi Logika Reusable & Compound Components',
        'titleEn': 'Modern Custom Hooks: Reusable Logic Encapsulation & Compound Components',
        'programId': 'Suite Custom Hook: useLocalStorage, useDebounce & useShortcut',
        'programEn': 'Custom Hook Suite: useLocalStorage, useDebounce & Keyboard Shortcuts',
        'levelNameId': 'Optimasi Performa, Custom Hooks & Capstone Editor',
        'levelNameEn': 'Performance Optimization, Custom Hooks & Capstone Editor',
        'language': 'jsx',
        'code': """import { useState, useEffect } from "react";

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
""",
        'objectivesId': [
            'Memahami filosofi Custom Hooks sebagai mekanisme utama ekstraksi dan reuse logika ber-state',
            'Mengetahui aturan penamaan wajib Custom Hook (harus diawali dengan kata `use`)',
            'Membangun hook useLocalStorage dengan inisialisasi lazy function untuk efisiensi I/O',
            'Membangun hook event listeners interaktif seperti shortcut keyboard global',
            'Menerapkan pola desain Compound Components untuk komponen antarmuka yang sangat modular',
        ],
        'objectivesEn': [
            'Master Custom Hooks as the primary architectural vehicle for stateful logic encapsulation',
            'Enforce fundamental hook rules (mandatory `use` naming prefix and top-level invocation)',
            'Author useLocalStorage featuring lazy state initialization for zero I/O startup overhead',
            'Construct interactive window-level event hooks handling global keyboard bindings',
            'Architect Compound Component patterns delivering highly expressive declarative APIs',
        ],
        'explanationId': """### Apa itu Custom Hook Sebenarnya?
Custom Hook adalah **fungsi JavaScript biasa yang di dalamnya memanggil satu atau lebih React Hook bawaan** (`useState`, `useEffect`, `useRef`).
Jika Anda memiliki logika sinkronisasi LocalStorage di 5 komponen berbeda, daripada menyalin-tempel baris kode `getItem`, `setItem`, dan `JSON.parse` berulang kali, Anda mengemasnya ke dalam fungsi `useLocalStorage`.

### Aturan Wajib Custom Hook
1. **Wajib diawali `use`**: Nama fungsi harus diawali dengan `use` (misal: `useAuth`, `useWindowSize`, `useFetch`). Compiler linter React mengandalkan prefiks ini untuk memeriksa kepatuhan *Rules of Hooks*.
2. **Hanya panggil di tingkat atas**: Jangan pernah memanggil hook di dalam perulangan (*loops*), pengkondisian (*if*), atau fungsi bertingkat (*nested functions*).
3. **Setiap pemanggilan independen**: Dua komponen yang memanggil `useLocalStorage` masing-masing memiliki state independen sendiri-sendiri, bukan berbagi memori state kecuali dibungkus Context.""",
        'explanationEn': """### Demystifying Custom Hooks
A Custom Hook is **a plain JavaScript function invoking one or more primitive React hooks** (`useState`, `useEffect`, `useRef`).
When LocalStorage serialization logic repeats across 5 distinct components, duplicating `getItem`, `setItem`, and `JSON.parse` blocks is an anti-pattern. Encapsulating this workflow into `useLocalStorage` achieves clean DRY architecture.

### The Inviolable Rules of Hooks
1. **Mandatory `use` Prefix**: Functions must prefix with `use` (`useAuth`, `useDebounce`, `useWindowDimensions`). The React linter analyzes this naming convention to enforce call order invariants.
2. **Top-Level Invocation Only**: Never invoke hooks inside loops, conditionals, or nested callback closures.
3. **Independent State Allocation**: Two components invoking the same custom hook maintain fully isolated internal state slices (unless explicitly unified via Context).""",
        'beginnerId': """### Analogi: Modul Power Bank & Alat Perkakas Multi-Guna
1. **Fungsi JavaScript biasa** seperti sendok makan: bisa dipakai di mana saja, tapi tidak memiliki daya listrik atau memori.
2. **Custom Hook** seperti power bank modular khusus yang bisa dicolokkan ke smartphone mana saja: power bank membawa daya listrik (*state reaktif*) dan kabel pintar (*effects*), memberi energi pada ponsel apapun yang memasangnya.""",
        'beginnerEn': """### Analogy: Modular Power Packs & Multitool Attachments
1. **Vanilla JS Functions** are stainless steel spoons: universally useful utility utensils, yet completely inert without electrical power or internal state.
2. **Custom Hooks** are modular external battery packs: plugging into any smartphone chassis supplies reactive electricity (*state*) and adaptive charging circuits (*lifecycle effects*) to whichever device anchors it.""",
        'experimentsId': [
            'Ketik teks di scratchpad, refresh browser Anda, dan buktikan bahwa teks tidak hilang karena tersimpan di LocalStorage.',
            'Tekan Ctrl+S (atau Cmd+S di Mac) dan perhatikan pesan konfirmasi muncul di pojok kanan atas.',
            'Buka Tab Application di Chrome DevTools dan periksa data key draft_workspace_catatan.',
            'Buat custom hook useWindowSize() yang mengembalikan lebar dan tinggi layar browser secara reaktif.',
        ],
        'experimentsEn': [
            'Type notes, refresh the browser window, and confirm persistence via LocalStorage.',
            'Trigger Ctrl+S (Cmd+S on macOS) to verify the keyboard shortcut hook executes reactively.',
            'Inspect Application Storage tabs in Chrome DevTools to view serialized JSON data.',
            'Author a responsive useWindowSize() hook tracking viewport width and height dynamically.',
        ],
        'challengeId': 'Bangun custom hook `useFetch(url)` yang mengembalikan `{ data, loading, error, refetch }` lengkap dengan penanganan pembatalan AbortController saat unmount.',
        'challengeEn': 'Author a custom `useFetch(url)` hook returning `{ data, loading, error, refetch }` armed with native AbortController teardown semantics.',
        'summaryId': 'Kamu telah menguasai pembuatan Custom Hooks, enkapsulasi logika bisnis, dan event keyboard. Minggu depan adalah Capstone Final: Collaborative Notion-Style Block Editor.',
        'summaryEn': 'You have mastered Custom Hook authoring, logic encapsulation, and keyboard events. Next week is our Capstone Project: Collaborative Notion-Style Block Editor.',
    },
    {
        'week': 10,
        'level': 'advanced',
        'topicId': 'capstone-notion-block-workspace',
        'titleId': 'Capstone: Editor Dokumen Modular Notion-Style & Ruang Kerja Terdistribusi',
        'titleEn': 'Capstone: Modular Notion-Style Block Document Editor & Workspace',
        'programId': 'Editor Blok Modular Interaktif dengan Markdown Preview & Autosave',
        'programEn': 'Interactive Modular Block Editor with Live Markdown Preview & Autosave',
        'levelNameId': 'Optimasi Performa, Custom Hooks & Capstone Editor',
        'levelNameEn': 'Performance Optimization, Custom Hooks & Capstone Editor',
        'language': 'jsx',
        'code': """// ============================================================================
// CAPSTONE PROJECT: NOTION-STYLE MODULAR BLOCK DOCUMENT WORKSPACE
// ============================================================================
import { useState, useReducer, useEffect, useCallback, memo } from "react";

const BLOK_AWAL = [
  { id: "b-1", tipe: "H1", teks: "Tryngo Engineering Workspace 2026" },
  { id: "b-2", tipe: "PARAGRAF", teks: "Selamat datang di editor blok modular berbasis React 19 deklaratif." },
  { id: "b-3", tipe: "KODE", teks: "const stack = ['React 19', 'Vite 6', 'Tailwind 4'];" },
  { id: "b-4", tipe: "TODO", teks: "Selesaikan kurikulum fullstack dari nol", selesai: true },
  { id: "b-5", tipe: "TODO", teks: "Deploy aplikasi ke Cloudflare Pages", selesai: false }
];

function editorReducer(state, action) {
  switch (action.type) {
    case "UPDATE_TEKS":
      return state.map((b) => (b.id === action.id ? { ...b, teks: action.teks } : b));
    case "TOGGLE_TODO":
      return state.map((b) => (b.id === action.id ? { ...b, selesai: !b.selesai } : b));
    case "TAMBAH_BLOK":
      return [...state, { id: `b-${Date.now()}`, tipe: action.tipe, teks: "", selesai: false }];
    case "HAPUS_BLOK":
      return state.filter((b) => b.id !== action.id);
    case "GESER_ATAS": {
      const idx = state.findIndex((b) => b.id === action.id);
      if (idx <= 0) return state;
      const copy = [...state];
      const target = copy[idx];
      copy[idx] = copy[idx - 1];
      copy[idx - 1] = target;
      return copy;
    }
    default:
      return state;
  }
}

const EditorBlockItem = memo(function EditorBlockItem({ blok, onUpdate, onToggle, onHapus, onGeser }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "6px 0",
      borderBottom: "1px solid #f1f5f9"
    }}>
      <button onClick={() => onGeser(blok.id)} style={{ cursor: "pointer", border: "none", background: "none", color: "#94a3b8" }}>▲</button>
      
      {blok.tipe === "TODO" && (
        <input
          type="checkbox"
          checked={blok.selesai || false}
          onChange={() => onToggle(blok.id)}
          style={{ cursor: "pointer" }}
        />
      )}

      <input
        type="text"
        value={blok.teks}
        onChange={(e) => onUpdate(blok.id, e.target.value)}
        placeholder={blok.tipe === "H1" ? "Judul Utama..." : "Ketik isi catatan..."}
        style={{
          flex: 1,
          padding: "6px 8px",
          border: "1px solid transparent",
          borderRadius: "4px",
          fontSize: blok.tipe === "H1" ? "18px" : "14px",
          fontWeight: blok.tipe === "H1" ? "bold" : "normal",
          fontFamily: blok.tipe === "KODE" ? "monospace" : "inherit",
          background: blok.tipe === "KODE" ? "#f8fafc" : "transparent",
          textDecoration: blok.selesai ? "line-through" : "none",
          color: blok.selesai ? "#94a3b8" : "inherit"
        }}
        onFocus={(e) => (e.target.style.borderColor = "#cbd5e1")}
        onBlur={(e) => (e.target.style.borderColor = "transparent")}
      />

      <span style={{ fontSize: "10px", color: "#94a3b8", background: "#f1f5f9", padding: "2px 6px", borderRadius: "3px" }}>
        {blok.tipe}
      </span>

      <button onClick={() => onHapus(blok.id)} style={{ cursor: "pointer", border: "none", background: "none", color: "#ef4444" }}>✕</button>
    </div>
  );
});

export default function NotionCapstoneApp() {
  const [blokList, dispatch] = useReducer(editorReducer, BLOK_AWAL);
  const [statusSimpan, setStatusSimpan] = useState("Tersimpan");

  // Autosave simulation effect
  useEffect(() => {
    setStatusSimpan("Menyimpan perubahan...");
    const t = setTimeout(() => {
      setStatusSimpan("Semua perubahan tersimpan di cloud.");
    }, 800);
    return () => clearTimeout(t);
  }, [blokList]);

  const handleUpdate = useCallback((id, teks) => dispatch({ type: "UPDATE_TEKS", id, teks }), []);
  const handleToggle = useCallback((id) => dispatch({ type: "TOGGLE_TODO", id }), []);
  const handleHapus = useCallback((id) => dispatch({ type: "HAPUS_BLOK", id }), []);
  const handleGeser = useCallback((id) => dispatch({ type: "GESER_ATAS", id }), []);

  return (
    <div style={{ maxWidth: "680px", margin: "24px auto", fontFamily: "system-ui, sans-serif", padding: "0 16px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px" }}>
        <div>
          <h2 style={{ margin: 0 }}>Notion Workspace Workspace</h2>
          <small style={{ color: "#64748b" }}>Status: {statusSimpan}</small>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <button onClick={() => dispatch({ type: "TAMBAH_BLOK", tipe: "PARAGRAF" })} style={{ padding: "6px 10px", cursor: "pointer" }}>+ Paragraf</button>
          <button onClick={() => dispatch({ type: "TAMBAH_BLOK", tipe: "TODO" })} style={{ padding: "6px 10px", cursor: "pointer" }}>+ To-Do</button>
          <button onClick={() => dispatch({ type: "TAMBAH_BLOK", tipe: "KODE" })} style={{ padding: "6px 10px", cursor: "pointer" }}>+ Kode</button>
        </div>
      </header>

      <main style={{ marginTop: "16px" }}>
        {blokList.map((b) => (
          <EditorBlockItem
            key={b.id}
            blok={b}
            onUpdate={handleUpdate}
            onToggle={handleToggle}
            onHapus={handleHapus}
            onGeser={handleGeser}
          />
        ))}
      </main>
    </div>
  );
}
""",
        'objectivesId': [
            'Mengintegrasikan seluruh kurikulum React 19 dalam produk editor blok modular produksi',
            'Menerapkan arsitektur state terpusat via useReducer untuk mutasi multi-tipe blok',
            'Mengoptimalkan render list blok menggunakan React.memo dan referensi useCallback stabil',
            'Membangun mekanisme autosave reaktif dengan debounced effect cleanup',
            'Menghasilkan kode frontend reaktif berstandar industri siap ekspansi ke kolaborasi WebSocket',
        ],
        'objectivesEn': [
            'Synthesize the comprehensive React 19 curriculum into a production-grade block editor application',
            'Architect centralized state mutations via useReducer orchestrating multi-variant content blocks',
            'Optimize dynamic block lists deploying React.memo coupled with stable useCallback handlers',
            'Implement reactive background autosave semantics with debounced effect cleanups',
            'Deliver production-grade frontend architecture engineered for future WebSocket collaboration',
        ],
        'explanationId': """### Arsitektur Capstone Notion-Style Editor
Aplikasi capstone ini menyatukan seluruh pilar utama pengembangan web modern dengan React:
1. **Representasi Konten Berbasis Blok Modular**: Setiap paragraf, to-do list, dan blok kode direpresentasikan sebagai node data independen dalam array state.
2. **useReducer untuk Integritas State**: Operasi seperti pengetikan teks, centang checkbox, reordering urutan ke atas, dan penambahan blok baru dikelola secara terpusat melalui fungsi reducer murni.
3. **Optimasi Render Per-Baris**: Setiap `EditorBlockItem` dibungkus dengan `React.memo` dan menerima handler stabil dari `useCallback`. Ketika pengguna mengetik di blok nomor 2, blok nomor 1, 3, 4, dan 5 sama sekali tidak me-render ulang!
4. **Autosave Reaktif**: `useEffect` memantau array `blokList` dan mensimulasikan sinkronisasi asinkron ke server cloud lengkap dengan pembatalan timer saat pengguna terus mengetik.

### Langkah Berikutnya: Ekosistem Fullstack Next.js
Dengan menyelesaikan proyek ini, Anda telah menguasai salah satu paradigma frontend paling dicari di industri teknologi global. Langkah selanjutnya adalah membawa kemampuan React ini ke framework Fullstack Next.js (App Router, Server Components, dan Server Actions).""",
        'explanationEn': """### Capstone Notion Block Editor Architecture
This capstone integrates all core tenets of modern declarative React engineering:
1. **Block-Based Content Topologies**: Paragraphs, headers, task checklists, and code snippets model as atomic data entities within an immutable state array.
2. **useReducer State Integrity**: Typing mutations, checkbox toggles, vertical reordering passes, and block additions resolve deterministically via pure reducer transitions.
3. **Per-Block Memoized Isolation**: Each `EditorBlockItem` is shielded with `React.memo` and bound to stable `useCallback` references. Typing inside block #2 incurs zero render passes across siblings #1, #3, #4, and #5!
4. **Reactive Autosave Telemetry**: `useEffect` monitors the `blokList` dependency graph, initiating background persistence timers with automatic debounce cancellations on active keystrokes.

### Next Step: Fullstack Next.js Ecosystem
Mastering these declarative foundations primes you for enterprise Next.js development (App Router, React Server Components, and Server Actions).""",
        'beginnerId': """### Analogi: Majalah Dinding Magnetik Sekolah
1. **Editor Blok** seperti majalah dinding magnetik: setiap artikel berita, foto, dan pengumuman lomba ditempel menggunakan magnet terpisah.
2. **Reordering** seperti menggeser posisi magnet foto ke atas artikel tanpa perlu merobek atau menulis ulang seluruh kertas karton mading dari nol.
3. **Autosave** seperti fotografer dokumentasi yang memotret papan mading setiap kali susunan magnet selesai dirapikan.""",
        'beginnerEn': """### Analogy: Magnetic Bulletin Board Publishing
1. **Block Editors** are magnetic editorial boards: articles, headlines, and photo clippings fasten via independent magnetic pins.
2. **Reordering** is sliding a magnetic headline above a paragraph block without tearing or reconstructing the underlying posterboard canvas.
3. **Autosave** is a documentary camera taking automated archive snapshots whenever staff finish repositioning editorial magnets.""",
        'experimentsId': [
            'Tambah blok tipe To-Do baru, centang kotak to-do, dan amati teks tercoret rapi secara reaktif.',
            'Ketik teks baru dan perhatikan status berubah menjadi "Menyimpan..." lalu "Tersimpan" otomatis.',
            'Klik tombol panah ▲ untuk menggeser blok ke atas dan perhatikan urutan array bertukar dengan mulus.',
            'Buka React DevTools Profiler, centang "Highlight updates when components render", lalu ketik teks untuk membuktikan blok lain tidak berkedip.',
        ],
        'experimentsEn': [
            'Append a new To-Do block, check the box, and verify the strikethrough styling executes reactively.',
            'Enter text and verify the autosave indicator shifts from "Menyimpan..." to "Tersimpan" seamlessly.',
            'Click the vertical ▲ button to promote an item up the stack and witness smooth array swapping.',
            'Enable "Highlight updates when components render" in React DevTools to confirm sibling blocks stay completely idle while typing.',
        ],
        'challengeId': 'Tambahkan fungsionalitas ekspor: buat tombol "Ekspor Markdown" yang mengonversi seluruh blok di layar menjadi format string Markdown murni (# untuk H1, - [ ] untuk todo, ``` untuk kode) dan menyalinnya ke clipboard.',
        'challengeEn': 'Implement an export pipeline: add an "Export Markdown" action serializing all canvas blocks into raw Markdown (# for H1, - [ ] for todos, ``` for code) and copying it to the system clipboard.',
        'summaryId': 'Selamat! Kamu telah menyelesaikan seluruh kurikulum React 19 dari konsep dasar komponen hingga capstone Notion-Style Block Editor yang lengkap dan berkinerja tinggi.',
        'summaryEn': 'Congratulations! You have completed the comprehensive React 19 curriculum, culminating in a high-performance, modular Notion-Style Block Document Workspace.',
    },
]

def get_track():
    return {
        'slug': 'react',
        'track_name': 'React',
        'levels': LEVELS,
        'modules': MODULES,
    }
