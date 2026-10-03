# JavaScript Track: Level 2 (Weeks 5-8)
# DOM, Event & Arsitektur Objek

MODULES_P2 = [
    {
        'week': 5,
        'level': 'intermediate',
        'topicId': 'objek-destrukturisasi-dan-spread',
        'titleId': 'Objek Modern: Destrukturisasi, Spread/Rest & Optional Chaining',
        'titleEn': 'Modern Objects: Destructuring, Spread/Rest & Optional Chaining',
        'programId': 'Manajemen Konfigurasi Server dengan Operator Modern',
        'programEn': 'Server Configuration Management with Modern Operators',
        'levelNameId': 'DOM, Event & Arsitektur Objek',
        'levelNameEn': 'DOM, Events & Object Architecture',
        'language': 'javascript',
        'code': """// 1. Objek Konfigurasi Bersarang
const serverConfig = {
  host: "api.nusadigital.com",
  port: 8080,
  keamanan: {
    ssl: true,
    sertifikat: {
      penerbit: "DigiCert Global CA",
      kadaluarsa: "2027-12-31"
    }
  },
  database: {
    driver: "postgres",
    koneksiPool: 20
  }
};

// 2. Destrukturisasi Objek & Nilai Default
const { host, port, protocol = "https" } = serverConfig;
console.log("Server Endpoint :", protocol + "://" + host + ":" + port);

// Destrukturisasi bersarang (Nested Destructuring)
const { keamanan: { sertifikat: { penerbit } } } = serverConfig;
console.log("Penerbit SSL    :", penerbit);

// 3. Object Spread (...): Menggabungkan & Mengkloning Immutably
const konfigurasiTambahan = {
  timeoutMs: 5000,
  modeDebug: false
};

const finalRuntimeConfig = {
  ...serverConfig,
  ...konfigurasiTambahan,
  port: 9000 // Menimpa port lama dengan aman
};
console.log("\\nPort Baru Setelah Override :", finalRuntimeConfig.port);
console.log("Timeout Konfigurasi          :", finalRuntimeConfig.timeoutMs, "ms");

// 4. Optional Chaining (?.) & Nullish Coalescing (??)
const userProfile = {
  nama: "Siti Rahma",
  preferensi: {
    tema: "dark"
  }
};

// Aman: Jika objek 'kontak' tidak ada, kembalikan undefined tanpa crash!
const nomorTelepon = userProfile.kontak?.telepon;
console.log("\\nNomor Telepon Pengguna :", nomorTelepon);

// Operator Nullish Coalescing (??): Hanya fallback jika null atau undefined
const bahasaPilihan = userProfile.preferensi?.bahasa ?? "Bahasa Indonesia (Default)";
console.log("Bahasa Pengguna        :", bahasaPilihan);""",
        'objectivesId': [
            'Menguasai destrukturisasi objek dan array untuk ekstraksi properti ringkas beserta nilai default',
            'Menggunakan Object Spread (...) untuk kloning objek yang aman tanpa mutasi langsung (*shallow copy*)',
            'Menghilangkan error fatal "Cannot read property of undefined" dengan Optional Chaining (?.)',
            'Membedakan operator Nullish Coalescing (??) dengan Logical OR (||) dalam penanganan nilai falsy nol atau string kosong',
            'Memahami referensi memori objek (Reference Types) vs nilai primitif (Primitive Types)',
        ],
        'objectivesEn': [
            'Master object and array destructuring for concise property extraction with fallback defaults',
            'Deploy the Object Spread operator (...) for immutable shallow cloning and state composition',
            'Eliminate catastrophic "Cannot read properties of undefined" crashes using Optional Chaining (?.)',
            'Differentiate Nullish Coalescing (??) from Logical OR (||) when preserving zero and empty string values',
            'Internalize the memory architecture of Reference Types versus Primitive Values on the heap',
        ],
        'explanationId': """### Optional Chaining (?.) Menyelamatkan Produksi
Di masa lalu, mengakses properti bersarang `user.kontak.telepon` saat objek `kontak` tidak ada akan melempar error fatal `TypeError: Cannot read properties of undefined` yang mematikan seluruh aplikasi.
Dengan **Optional Chaining (`?.`)**:
- `user.kontak?.telepon` memeriksa apakah `user.kontak` bernilai `null` atau `undefined`. Jika ya, eksekusi langsung berhenti dan mengembalikan `undefined` tanpa melempar crash!

### Nullish Coalescing (??) vs Logical OR (||)
Operator `||` mengevaluasi semua nilai Falsy (`0`, `""`, `false`). Jika pengguna memiliki saldo 0 rupiah, `saldo || 100000` akan salah menganggap 0 sebagai ketiadaan data dan mengubah saldo menjadi 100.000!
Operator **Nullish Coalescing (`??`)** hanya melakukan fallback jika nilainya **benar-benar `null` atau `undefined`**. Nilai `0`, `""`, dan `false` tetap dipertahankan secara utuh.""",
        'explanationEn': """### Optional Chaining (?.) Eliminates Crash Loops
Accessing deeply nested properties via `user.profile.phone` when `profile` is missing throws an unhandled `TypeError: Cannot read properties of undefined`, halting JavaScript execution.
The **Optional Chaining (`?.`)** operator short-circuits evaluation upon encountering `null` or `undefined`, resolving cleanly to `undefined` rather than throwing fatal exceptions.

### Nullish Coalescing (??) vs Logical OR (||)
Logical OR (`||`) coerces all falsy primitives (`0`, `""`, `false`). If an account balance holds 0 credits, `balance || 100` incorrectly overrides 0 with 100!
**Nullish Coalescing (`??`)** restricts fallback defaults strictly to **`null` or `undefined`**, safely preserving intentional zeros and empty strings.""",
        'beginnerId': """### Analogi: Membuka Laci Rahasia Kantor
1. **Destrukturisasi** seperti mengeluarkan paspor dan dompet langsung dari saku celana ke meja tanpa harus membawa seluruh lemari pakaian Anda.
2. **Spread Operator `...`** seperti mesin fotokopi cepat: Anda memfotokopi dokumen lama, lalu mencoret dan menulis nomor telepon baru di kertas salinannya tanpa merusak dokumen aslinya.
3. **Optional Chaining `?.`** seperti mengetuk pintu sebelum masuk: Anda mengetuk pintu kamar mandi, jika pintunya terkunci Anda langsung berbalik badan pergi tanpa menabrakkan kepala ke pintu kayu.""",
        'beginnerEn': """### Analogy: Secure Office Drawers
1. **Destructuring** is pulling your keys and badge out of your bag directly onto your desk without unloading the entire backpack.
2. **The Spread Operator `...`** is a high-speed photocopier: you duplicate an existing document, scribble new margin notes on the copy, and leave the original archive untouched.
3. **Optional Chaining `?.`** is knocking gently before opening a door: if locked or vacant, you politely step back rather than smashing your head into a solid wall.""",
        'experimentsId': [
            'Hapus tanda tanya pada userProfile.kontak?.telepon dan amati pesan error TypeError yang seketika menghentikan eksekusi kode.',
            'Bandingkan hasil 0 || 50 (hasil 50) dengan 0 ?? 50 (hasil 0) untuk memahami pentingnya Nullish Coalescing dalam aplikasi keuangan.',
            'Coba kloning objek menggunakan spread, ubah salah satu propertinya, dan buktikan bahwa objek awal tetap tidak berubah (immutability).',
            'Gunakan destrukturisasi array: const [pertama, kedua, ...sisa] = [10, 20, 30, 40, 50] dan amati nilai variabel sisa.',
        ],
        'experimentsEn': [
            'Delete the question mark from userProfile.kontak?.telepon to observe the unhandled runtime TypeError crash.',
            'Compare 0 || 50 (evaluates to 50) with 0 ?? 50 (evaluates to 0) to verify financial accuracy.',
            'Clone an object via spread, mutate a property on the duplicate, and confirm that the original object remains untouched.',
            'Execute array rest destructuring: const [first, second, ...rest] = [10, 20, 30, 40] and inspect the rest collection.',
        ],
        'challengeId': 'Buat fungsi manajemen profil pengguna `normalisasiProfil(input)`: gunakan destrukturisasi dengan nilai default untuk nama, email, dan preferensi tema. Manfaatkan `?.` dan `??` untuk membaca kota domisili dengan fallback "Kota Belum Terdaftar", serta kembalikan objek baru yang bersih menggunakan spread operator.',
        'challengeEn': 'Build a user normalization engine `normalisasiProfil(input)`: use destructuring with defaults for name, email, and theme. Leverage `?.` and `??` to parse domicile city with a fallback of "Unassigned City", returning an immutable clean object via spread.',
        'summaryId': 'Kamu telah menguasai destrukturisasi objek, operator spread/rest, dan pertahanan kode dengan optional chaining. Minggu depan kita akan mempelajari manipulasi DOM browser langsung untuk menciptakan antarmuka interaktif.',
        'summaryEn': 'You have mastered object destructuring, spread/rest immutability, and defensive optional chaining. Next week, we examine direct browser DOM manipulation to engineer dynamic UIs.',
    },
    {
        'week': 6,
        'level': 'intermediate',
        'topicId': 'dom-manipulasi-dan-seleksi',
        'titleId': 'Manipulasi DOM: querySelector, Pembuatan Elemen & ClassList',
        'titleEn': 'DOM Manipulation: querySelector, Element Creation & ClassList',
        'programId': 'Aplikasi Catatan Dinamis dengan Pembuatan Elemen DOM Native',
        'programEn': 'Dynamic Note Taking App with Native DOM Element Synthesis',
        'levelNameId': 'DOM, Event & Arsitektur Objek',
        'levelNameEn': 'DOM, Events & Object Architecture',
        'language': 'html',
        'code': """<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DOM Manipulation Lab</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #F8FAFC; color: #1E293B; padding: 32px; }
    .card { background: white; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; max-width: 480px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .todo-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: #F1F5F9; border-radius: 8px; margin-bottom: 8px; }
    .completed { text-decoration: line-through; opacity: 0.6; background: #E2E8F0; }
    .btn-del { background: #EF4444; color: white; border: none; padding: 4px 10px; border-radius: 6px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="card">
    <h2>Daftar Catatan Sprint</h2>
    <div style="display: flex; gap: 8px; margin: 16px 0;">
      <input type="text" id="input-tugas" placeholder="Tulis tugas baru..." style="flex: 1; padding: 8px 12px; border-radius: 6px; border: 1px solid #CBD5E1;">
      <button id="btn-tambah" style="background: #2E5B44; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600;">+ Tambah</button>
    </div>
    <div id="daftar-tugas"></div>
  </div>

  <script>
    const inputTugas = document.getElementById("input-tugas");
    const btnTambah = document.getElementById("btn-tambah");
    const containerDaftar = document.querySelector("#daftar-tugas");

    function tambahTugasBaru(teks) {
      if (!teks.trim()) return;

      const itemDiv = document.createElement("div");
      itemDiv.classList.add("todo-item");

      const teksSpan = document.createElement("span");
      teksSpan.textContent = teks;
      teksSpan.style.cursor = "pointer";

      teksSpan.addEventListener("click", () => {
        itemDiv.classList.toggle("completed");
      });

      const btnHapus = document.createElement("button");
      btnHapus.textContent = "Hapus";
      btnHapus.classList.add("btn-del");

      btnHapus.addEventListener("click", () => {
        itemDiv.remove();
      });

      itemDiv.appendChild(teksSpan);
      itemDiv.appendChild(btnHapus);
      containerDaftar.appendChild(itemDiv);

      inputTugas.value = "";
      inputTugas.focus();
    }

    btnTambah.addEventListener("click", () => {
      tambahTugasBaru(inputTugas.value);
    });

    inputTugas.addEventListener("keydown", (e) => {
      if (e.key === "Enter") tambahTugasBaru(inputTugas.value);
    });
  </script>
</body>
</html>""",
        'objectivesId': [
            'Memahami konsep Document Object Model (DOM) sebagai representasi pohon simpul (tree of nodes) dari HTML',
            'Menggunakan document.querySelector() dan document.querySelectorAll() dengan selektor CSS standar',
            'Membuat elemen dinamis secara aman menggunakan document.createElement() dan appendChild() / append()',
            'Memahami bahaya celah keamanan XSS (Cross-Site Scripting) pada innerHTML dan selalu memilih textContent',
            'Mengelola kelas CSS secara dinamis dengan classList.add(), classList.remove(), dan classList.toggle()',
        ],
        'objectivesEn': [
            'Understand the Document Object Model (DOM) as an in-memory hierarchical node tree representing markup',
            'Select document elements precisely using document.querySelector() and document.querySelectorAll()',
            'Synthesize dynamic nodes safely using document.createElement() and appendChild() / append()',
            'Acknowledge Cross-Site Scripting (XSS) injection risks with innerHTML and prioritize textContent',
            'Manipulate CSS classes dynamically using classList.add(), classList.remove(), and classList.toggle()',
        ],
        'explanationId': """### Pohon DOM & Keamanan XSS
Browser membaca HTML dan membangun representasi pohon simpul (*DOM Tree*) di memori.
Menyuntikkan data pengguna langsung dengan `innerHTML` membuka celah serangan **Cross-Site Scripting (XSS)** di mana skrip berbahaya dapat mencuri token sesi pengguna. Selalu buat elemen terisolasi dengan `document.createElement()` dan masukkan teks dengan `textContent`.""",
        'explanationEn': """### The DOM Tree & XSS Prevention
Browsers parse markup into an in-memory node graph. Interpolating unescaped inputs via `innerHTML` invites Cross-Site Scripting (XSS) vulnerabilities. Always synthesize nodes explicitly via `document.createElement()` and bind string payloads using `textContent`.""",
        'beginnerId': """### Analogi: Pohon Keluarga Beranting
DOM seperti pohon silsilah keluarga: `<html>` adalah akar, `<body>` adalah batang pohon, dan setiap paragraf `<p>` adalah ranting kecil yang dapat dipangkas atau dipasangi buah baru oleh JavaScript.""",
        'beginnerEn': """### Analogy: A Living Oak Tree
The DOM is a living botanical tree: `<html>` is the root tap, `<body>` is the main trunk, and individual paragraphs `<p>` are branches that JavaScript can prune or sprout leaves upon at runtime.""",
        'experimentsId': [
            'Masukkan teks <strong>Tebal</strong> ke dalam input dan buktikan bahwa teks tidak diubah menjadi tebal (aman dari XSS).',
            'Klik catatan yang sudah dibuat untuk mencoret teks secara interaktif dengan classList.toggle.',
            'Ketik document.body.style.background = "#0F172A" di console DevTools untuk mengubah warna latar secara live.',
            'Periksa jumlah simpul dengan document.querySelectorAll(".todo-item").length di console.',
        ],
        'experimentsEn': [
            'Submit <strong>Bold</strong> into the input to verify that it prints literally as text rather than bold markup.',
            'Click an existing task item to toggle completion strikes through classList.',
            'Mutate document.body.style.background live from the DevTools console.',
            'Query active note counts via document.querySelectorAll(".todo-item").length.',
        ],
        'challengeId': 'Tambahkan tombol "Hapus Semua Catatan" yang mengosongkan seluruh isi container menggunakan `container.replaceChildren()` atau `container.innerHTML = ""`.',
        'challengeEn': 'Add a "Clear All Tasks" button that purges the entire task container using `container.replaceChildren()`.',
        'summaryId': 'Kamu telah menguasai manipulasi DOM aman dan pengelolaan kelas dinamis. Minggu depan kita akan mendalami event bubbling dan event delegation.',
        'summaryEn': 'You have mastered secure DOM manipulation and dynamic class management. Next week, we dive into event bubbling and event delegation.',
    },
    {
        'week': 7,
        'level': 'intermediate',
        'topicId': 'event-bubbling-dan-delegation',
        'titleId': 'Arsitektur Event: Event Bubbling, Capturing & Event Delegation',
        'titleEn': 'Event Architecture: Bubbling, Capturing & Event Delegation',
        'programId': 'Papan Filter Tag E-Commerce Menggunakan Event Delegation',
        'programEn': 'E-Commerce Filter Tag Board via Event Delegation Architecture',
        'levelNameId': 'DOM, Event & Arsitektur Objek',
        'levelNameEn': 'DOM, Events & Object Architecture',
        'language': 'html',
        'code': """<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Delegation Lab</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #F8FAFC; padding: 32px; }
    .container { max-width: 600px; margin: 0 auto; background: white; padding: 24px; border-radius: 16px; border: 1px solid #E2E8F0; }
    .tag-cloud { display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0; }
    .tag-btn { background: #E2E8F0; border: none; padding: 6px 14px; border-radius: 999px; cursor: pointer; font-size: 0.85rem; font-weight: 500; transition: all 0.2s; }
    .tag-btn.active { background: #2E5B44; color: white; }
    .log-panel { background: #0F172A; color: #38BDF8; font-family: monospace; padding: 16px; border-radius: 8px; font-size: 0.8rem; min-height: 100px; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Filter Tag Produk (Event Delegation)</h2>
    <div id="tag-container" class="tag-cloud">
      <button class="tag-btn" data-kategori="backend">Golang</button>
      <button class="tag-btn" data-kategori="backend">Rust</button>
      <button class="tag-btn" data-kategori="frontend">React</button>
      <button class="tag-btn" data-kategori="database">PostgreSQL</button>
    </div>
    <div class="log-panel" id="log-output">Klik salah satu tag di atas...</div>
  </div>

  <script>
    const tagContainer = document.getElementById("tag-container");
    const logOutput = document.getElementById("log-output");

    tagContainer.addEventListener("click", (event) => {
      const targetTombol = event.target.closest(".tag-btn");
      if (!targetTombol) return;

      targetTombol.classList.toggle("active");
      logOutput.textContent = "Tag: " + targetTombol.textContent + " | Status: " + (targetTombol.classList.contains("active") ? "AKTIF" : "NONAKTIF");
    });
  </script>
</body>
</html>""",
        'objectivesId': [
            'Memahami 3 fase Event: Capturing, Target, dan Bubbling Phase',
            'Menguasai teknik Event Delegation untuk efisiensi memori tinggi',
            'Menggunakan Element.closest() untuk deteksi target klik akurat',
            'Menghentikan perambatan event dengan event.stopPropagation()',
            'Mencegah aksi bawaan browser dengan event.preventDefault()',
        ],
        'objectivesEn': [
            'Master the three Event phases: Capturing, Target, and Bubbling',
            'Architect Event Delegation for maximal heap memory conservation',
            'Deploy Element.closest() to resolve target nodes accurately',
            'Halt event propagation using event.stopPropagation()',
            'Intercept browser defaults with event.preventDefault()',
        ],
        'explanationId': """### Event Bubbling & Delegation
Saat sebuah elemen diklik, sinyal event memantul naik (*bubbles up*) dari anak ke seluruh leluhurnya hingga `window`.
Dengan **Event Delegation**, kita hanya mendaftarkan satu listener pada elemen kontainer induk, menghemat alokasi memori secara drastis.""",
        'explanationEn': """### Event Bubbling & Delegation
Click events bubble upward from child targets through ancestral layers. Event Delegation binds a solitary listener on the parent container, conserving heap allocations while supporting dynamic children seamlessly.""",
        'beginnerId': """### Analogi: Bel Telepon Resepsionis
Event Delegation seperti bel telepon di meja resepsionis lobi: kamar hotel mana pun yang memencet tombol, deringnya berbunyi di meja resepsionis lobi utama.""",
        'beginnerEn': """### Analogy: Hotel Front Desk Switchboard
Event Delegation is a central hotel switchboard: regardless of which guest rings, the alert registers at the master reception desk.""",
        'experimentsId': [
            'Klik tombol tag dan amati teks log yang berubah seketika.',
            'Klik di celah ruang kosong antara tag dan buktikan bahwa tidak ada error yang terjadi.',
            'Tambahkan tombol baru dengan appendChild dan buktikan tombol baru langsung aktif tanpa pasang listener baru.',
            'Uji event.stopPropagation() untuk melihat pemutusan jalur gelembung event.',
        ],
        'experimentsEn': [
            'Click tags to observe dynamic log changes.',
            'Click the empty space between tags to verify safe null checks.',
            'Inject a new button and confirm it works immediately via delegation.',
            'Test event.stopPropagation() to halt event bubbling.',
        ],
        'challengeId': 'Bangun sistem tabel e-commerce di mana tombol hapus pada setiap baris ditangani hanya oleh 1 event listener di elemen `<tbody>`.',
        'challengeEn': 'Build an e-commerce table where delete buttons on all rows are managed via a single listener on `<tbody>`.',
        'summaryId': 'Kamu telah menguasai arsitektur event browser dan delegasi event. Minggu depan kita akan mempelajari pemrograman berorientasi objek dengan kelas ES6.',
        'summaryEn': 'You have mastered browser event architectures and event delegation. Next week, we examine Object-Oriented Programming with ES6 classes.',
    },
    {
        'week': 8,
        'level': 'intermediate',
        'topicId': 'oop-dan-es6-classes',
        'titleId': 'Object-Oriented JavaScript: ES6 Classes, Prototype & Pewarisan',
        'titleEn': 'Object-Oriented JavaScript: ES6 Classes, Prototypes & Inheritance',
        'programId': 'Sistem Model Rekening Perbankan Berbasis Kelas ES6',
        'programEn': 'Banking Account Domain Model System via ES6 Classes',
        'levelNameId': 'DOM, Event & Arsitektur Objek',
        'levelNameEn': 'DOM, Events & Object Architecture',
        'language': 'javascript',
        'code': """class RekeningBank {
  #saldo;
  #nomorRekening;

  constructor(pemilik, nomorRekening, saldoAwal = 0) {
    this.pemilik = pemilik;
    this.#nomorRekening = nomorRekening;
    this.#saldo = Math.max(0, saldoAwal);
  }

  get saldoSaatIni() {
    return this.#saldo;
  }

  get nomorRekeningPublik() {
    return "REK-***" + this.#nomorRekening.slice(-4);
  }

  setor(jumlah) {
    if (jumlah <= 0) throw new Error("Nominal setoran tidak valid.");
    this.#saldo += jumlah;
    return this.#saldo;
  }

  tarik(jumlah) {
    if (jumlah <= 0 || jumlah > this.#saldo) throw new Error("Saldo tidak mencukupi.");
    this.#saldo -= jumlah;
    return this.#saldo;
  }
}

class RekeningBisnis extends RekeningBank {
  constructor(pemilik, nomorRekening, saldoAwal, limitOverdraft = 5000000) {
    super(pemilik, nomorRekening, saldoAwal);
    this.limitOverdraft = limitOverdraft;
  }

  tarik(jumlah) {
    if (jumlah > (this.saldoSaatIni + this.limitOverdraft)) {
      throw new Error("Penarikan melebihi plafon limit bisnis.");
    }
    return super.tarik(jumlah);
  }
}

const akun = new RekeningBisnis("PT Nusa Digital", "1234567890", 10000000);
akun.setor(2500000);
console.log("Pemilik   :", akun.pemilik);
console.log("Rekening  :", akun.nomorRekeningPublik);
console.log("Saldo     : Rp", akun.saldoSaatIni.toLocaleString("id-ID"));""",
        'objectivesId': [
            'Memahami paradigma OOP di JavaScript: constructor, methods, getters, dan setters pada kelas ES6',
            'Menerapkan enkapsulasi data privat sejati menggunakan private fields (#saldo)',
            'Memahami mekanisme pewarisan (Inheritance) menggunakan extends dan super()',
            'Memahami Polimorfisme: meng-override method kelas induk di kelas anak',
            'Memahami keterkaitan kelas ES6 dengan arsitektur Prototypes bawaan JavaScript',
        ],
        'objectivesEn': [
            'Master Object-Oriented JavaScript: constructors, methods, getters, and setters via ES6 classes',
            'Enforce true private encapsulation using private fields (#balance)',
            'Implement class inheritance leveraging extends and super() chaining',
            'Apply Polymorphism by overriding superclass methods in child classes',
            'Understand the link between ES6 class syntax and underlying Prototype delegation',
        ],
        'explanationId': """### Kelas ES6 & Private Fields (#)
ES6 menghadirkan sintaks `class` yang bersih di atas sistem Prototype JavaScript.
Dengan **Private Fields (`#properti`)**, data diisolasi secara mutlak di tingkat engine. Mengakses `akun.#saldo` langsung dari luar kelas akan memicu SyntaxError!""",
        'explanationEn': """### ES6 Classes & Private Fields (#)
ES6 classes wrap prototypal inheritance in ergonomic syntax. Private fields (`#property`) provide hard runtime encapsulation: attempting external access throws an immediate compiler SyntaxError.""",
        'beginnerId': """### Analogi: Brankas Mesin ATM
Private field `#saldo` seperti brankas tertutup di dalam mesin ATM: pengguna hanya bisa bertransaksi melalui tombol menu `.tarik()` dan `.setor()`, bukan mencongkel brankas uangnya langsung.""",
        'beginnerEn': """### Analogy: An ATM Safe Box
Private field `#balance` is the steel safe inside an ATM: users query values through authenticated buttons (`.tarik()` / `.setor()`) rather than prying open the cash drawer.""",
        'experimentsId': [
            'Coba akses akun.#saldo langsung di konsol dan amati SyntaxError pelindung private field.',
            'Lakukan penarikan melebihi saldo untuk menguji lemparan error.',
            'Gunakan akun instanceof RekeningBank untuk membuktikan rantai pewarisan prototype.',
            'Tambahkan static method pada kelas untuk fungsi utilitas bersama.',
        ],
        'experimentsEn': [
            'Attempt to log akun.#saldo in console to witness the hard SyntaxError.',
            'Withdraw funds exceeding balance to test error throwing.',
            'Check akun instanceof RekeningBank to verify prototype chain inheritance.',
            'Declare a static helper method on the class.',
        ],
        'challengeId': 'Buat kelas induk `Kendaraan` dan kelas turunan `MobilListrik` dengan private field `#kapasitasBaterai` serta method `isiDaya()`.',
        'challengeEn': 'Build a base `Kendaraan` class and derived `MobilListrik` class with a private field `#batteryCapacity` and `isiDaya()` method.',
        'summaryId': 'Kamu telah menguasai pemrograman berorientasi objek dengan kelas ES6. Minggu depan kita memasuki Level 3: Event Loop V8 dan pemrograman asinkron.',
        'summaryEn': 'You have mastered Object-Oriented Programming with ES6 classes. Next week we enter Level 3: the V8 Event Loop and asynchronous programming.',
    },
]
