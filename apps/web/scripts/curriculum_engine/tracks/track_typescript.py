# TypeScript Track: 10 Weeks (3 Levels)
# Final Product: Strongly-Typed Financial Ledger & Portfolio Analytics Engine

LEVELS = [
    {
        'levelId': 'beginer',
        'nameId': 'Pondasi Tipe & Type Narrowing',
        'nameEn': 'Type Foundations & Narrowing',
        'descId': 'Transisi dari JavaScript ke TypeScript: tipe primitif, inference, union types, interfaces, dan narrowing aman.',
        'descEn': 'Transitioning from JavaScript to TypeScript: primitive annotations, inference, union types, interfaces, and safe narrowing.',
    },
    {
        'levelId': 'intermediate',
        'nameId': 'Generics & Utility Types Modern',
        'nameEn': 'Generics & Modern Utility Types',
        'descId': 'Menulis kode fleksibel namun ketat: fungsi generik, constraints, utility types bawaan, conditional types, dan infer.',
        'descEn': 'Writing flexible yet type-safe code: generic functions, constraints, built-in utility types, conditional types, and infer.',
    },
    {
        'levelId': 'advanced',
        'nameId': 'Sistem Tipe Lanjut & Capstone Portofolio',
        'nameEn': 'Advanced Type Systems & Portfolio Capstone',
        'descId': 'Mapped types, template literal types, ambient declarations (.d.ts), dan proyek mesin portofolio keuangan enterprise.',
        'descEn': 'Mapped types, template literal types, ambient declarations (.d.ts), and the enterprise financial portfolio engine capstone.',
    },
]

MODULES = [
    # Level 1: Pondasi Tipe & Type Narrowing (Weeks 1-4)
    {
        'week': 1,
        'level': 'beginer',
        'topicId': 'tipe-primitif-dan-type-inference',
        'titleId': 'Anotasi Tipe Primitif, Type Inference & Union Types',
        'titleEn': 'Primitive Type Annotations, Inference & Union Types',
        'programId': 'Sistem Kasir & Verifikasi Tipe Data Keuangan',
        'programEn': 'Cashier Register & Financial Type Verifier',
        'levelNameId': 'Pondasi Tipe & Type Narrowing',
        'levelNameEn': 'Type Foundations & Narrowing',
        'language': 'typescript',
        'code': """// 1. Tipe Primitif & Type Inference
const tokoNama: string = "Nusa Investa";
let saldoKas: number = 5_000_000; // Numeric separator readability
const tokoAktif: boolean = true;

// 2. Union Types & Literal Types (Nilai Spesifik)
type StatusTransaksi = "PENDING" | "PAID" | "REFUNDED" | "FAILED";
type MataUang = "IDR" | "USD" | "EUR";

interface TransaksiAwal {
  id: string;
  nominal: number;
  kurs: MataUang;
  status: StatusTransaksi;
}

const tx1: TransaksiAwal = {
  id: "TX-9012",
  nominal: 1_250_000,
  kurs: "IDR",
  status: "PAID"
};

function formatRingkasan(tx: TransaksiAwal): string {
  return `[${tx.status}] ${tx.id}: ${tx.nominal.toLocaleString("id-ID")} ${tx.kurs}`;
}

console.log("=== Profil Toko ===");
console.log(`Nama: ${tokoNama} | Saldo Awal: Rp ${saldoKas.toLocaleString("id-ID")}`);
console.log("Transaksi Pertama:", formatRingkasan(tx1));
""",
        'objectivesId': [
            'Memahami filosofi TypeScript sebagai superset JavaScript dengan static type checking',
            'Menggunakan anotasi tipe eksplisit untuk string, number, boolean, bigint, dan symbol',
            'Memahami cara kerja Type Inference otomatis oleh compiler TypeScript',
            'Memanfaatkan Union Types (|) dan Literal Types untuk membatasi nilai yang valid',
            'Mencegah bug tipe data sebelum kode dijalankan di browser atau Node.js',
        ],
        'objectivesEn': [
            'Understand TypeScript as a statically-typed compile-time superset of JavaScript',
            'Declare explicit primitive annotations for string, number, boolean, bigint, and symbol',
            'Understand how the TypeScript compiler performs automatic type inference',
            'Leverage Union Types (|) and Literal Types to constrain domain values',
            'Eliminate runtime type exceptions before code executes in production',
        ],
        'explanationId': """### Mengapa TypeScript Mengubah Industri Web?
JavaScript adalah bahasa *dynamically typed*: tipe data baru diketahui saat kode dieksekusi di browser. Kesalahan ketik nama properti atau pemberian nilai `undefined` sering menyebabkan eror fatal `TypeError: Cannot read properties of undefined`. TypeScript menambahkan **lapisan verifikasi statis pada waktu kompilasi (*compile-time*)**, mendeteksi 100% ketidaksesuaian tipe sebelum kode pernah dikirim ke server.

### Type Inference vs Anotasi Eksplisit
Compiler TypeScript sangat pintar. Jika Anda menulis `let saldo = 5000000;`, TypeScript secara otomatis menyimpulkan (*inferred*) bahwa tipe variabel tersebut adalah `number`. Anda tidak perlu menganotasi setiap variabel secara berlebihan, kecuali saat mendeklarasikan parameter fungsi atau kontrak data kompleks.

### Union Types & Literal Types
Daripada menggunakan string bebas yang rentan salah ketik seperti `"lunas"` atau `"dibayar"`, kita menggunakan **Literal Union**:
```typescript
type StatusOrder = "PENDING" | "SUCCESS" | "FAILED";
```
Jika ada pengembang yang memasukkan `"PENDINGG"`, compiler akan langsung melempar eror merah seketika.""",
        'explanationEn': """### Why TypeScript Dominates Modern Engineering
JavaScript is dynamically typed: types resolve only at runtime. A typo in property names or unexpected `undefined` payloads triggers catastrophic `TypeError: Cannot read properties of undefined` failures in production. TypeScript introduces **static compile-time verification**, intercepting contract mismatches before code ever runs.

### Type Inference vs Explicit Annotations
The TypeScript type checker automatically infers types where unambiguous. Declaring `let balance = 5000000;` infers `number`. Reserve explicit annotations for function signatures, complex interfaces, and exported boundary models.

### Union Types & Literal Types
Instead of brittle arbitrary strings, declare **Literal Unions**:
```typescript
type OrderStatus = "PENDING" | "SUCCESS" | "FAILED";
```
Typing `"PENDINGG"` triggers an immediate compiler diagnostic, preventing bad inputs at development time.""",
        'beginnerId': """### Analogi: Label Tegangan Listrik
1. **JavaScript murni** seperti stopkontak tanpa label: Anda bisa mencolokkan alat 110V ke arus 220V, dan alat tersebut baru meledak saat dinyalakan (runtime crash).
2. **TypeScript** seperti colokan dengan bentuk fisik pengaman khusus (adapter tipe): jika kabel Anda memiliki colokan 110V, ia tidak akan pernah bisa ditancapkan ke soket 220V sejak awal. Anda diselamatkan sebelum arus listrik mengalir.""",
        'beginnerEn': """### Analogy: Industrial Electrical Sockets
1. **Plain JavaScript** is an unlabelled electrical outlet: you can plug a 110V appliance into a 220V line, and it only explodes once switched on (runtime crash).
2. **TypeScript** is an engineered mechanical interlocking plug: if your appliance expects 110V, it physically cannot insert into a 220V receptacle. You are protected before current flows.""",
        'experimentsId': [
            'Ubah nilai status tx1 menjadi "SUKSES" dan amati pesan eror kompilasi TypeScript.',
            'Coba masukkan string ke variabel saldoKas dan amati peringatan type assignment.',
            'Gunakan operator typeof pada JavaScript untuk melihat apakah tipe TypeScript ada saat runtime.',
            'Buat type MataUang baru yang mendukung "JPY" dan tambahkan transaksi dalam Yen.',
        ],
        'experimentsEn': [
            'Change tx1 status to "SUCCESS" and observe the TypeScript compile diagnostic.',
            'Assign a string to saldoKas and note the assignment mismatch warning.',
            'Run typeof in runtime JS to verify that TypeScript types are stripped away upon compilation.',
            'Expand MataUang union with "JPY" and instantiate a transaction in Japanese Yen.',
        ],
        'challengeId': 'Buat tipe kustom `PrioritasTiket` ("LOW" | "MEDIUM" | "HIGH" | "CRITICAL") dan interface `TiketDukungan`. Tulis fungsi validasi yang menolak pembuatan tiket jika statusnya belum ditentukan.',
        'challengeEn': 'Create a custom type `TicketPriority` ("LOW" | "MEDIUM" | "HIGH" | "CRITICAL") and interface `SupportTicket`. Write a validator that rejects ticket instantiation without priority assignment.',
        'summaryId': 'Kamu telah memahami static type checking, anotasi primitif, inference, dan union types. Minggu depan kita mempelajari Interface, Type Alias, dan Index Signatures.',
        'summaryEn': 'You have mastered static type checking, primitives, inference, and union types. Next week, we examine Interfaces, Type Aliases, and Index Signatures.',
    },
    {
        'week': 2,
        'level': 'beginer',
        'topicId': 'interface-dan-type-alias',
        'titleId': 'Interface vs Type Alias, Optional, Readonly & Index Signatures',
        'titleEn': 'Interface vs Type Alias, Optional, Readonly & Index Signatures',
        'programId': 'Kontrak Profil Akun Pengguna & Kamus Kurs Dinamis',
        'programEn': 'User Account Profile Contract & Dynamic Exchange Dictionary',
        'levelNameId': 'Pondasi Tipe & Type Narrowing',
        'levelNameEn': 'Type Foundations & Narrowing',
        'language': 'typescript',
        'code': """// 1. Interface dengan Properti Opsional (?) dan Readonly
interface ProfilPengguna {
  readonly id: string;         // Tidak bisa diubah setelah dibuat
  nama: string;
  email: string;
  nomorTelepon?: string;      // Opsional (bisa undefined)
  tanggalDaftar: Date;
}

// 2. Type Alias dengan Intersection (&)
type MetadataAudit = {
  diubahTerakhir: Date;
  versi: number;
};

type AkunMember = ProfilPengguna & MetadataAudit & {
  tier: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
};

// 3. Index Signature untuk Dictionary Dinamis
interface TabelKursMataUang {
  readonly tanggalKurs: string;
  [kodeMataUang: string]: number | string; // Dinamis menampung kode valas apapun
}

const kursHariIni: TabelKursMataUang = {
  tanggalKurs: "2026-10-03",
  USD: 16250,
  EUR: 17500,
  SGD: 12200,
  JPY: 110.5
};

const user1: AkunMember = {
  id: "USR-001",
  nama: "Budi Pratama",
  email: "budi@nusa.id",
  tanggalDaftar: new Date(),
  diubahTerakhir: new Date(),
  versi: 1,
  tier: "GOLD"
};

console.log("Pengguna Terdaftar:", user1.nama, "| Tier:", user1.tier);
console.log("Kurs USD ke IDR:", kursHariIni["USD"]);
""",
        'objectivesId': [
            'Memahami perbedaan dan kapan memilih interface vs type alias',
            'Menggunakan modifier readonly untuk menjamin data tidak bisa dimutasi sembarangan',
            'Menggunakan properti opsional (?) untuk menangani atribut yang belum tentu ada',
            'Menggabungkan kontrak data menggunakan Intersection Types (&) dan interface extends',
            'Membuat struktur kamus kunci-nilai dinamis dengan Index Signatures',
        ],
        'objectivesEn': [
            'Understand structural trade-offs between interface and type alias',
            'Apply the readonly modifier to enforce immutability at compile time',
            'Model optional attributes (?) with clean undefined tolerance',
            'Compose complex domain models via Intersection Types (&) and interface inheritance',
            'Design dynamic key-value dictionaries safely using Index Signatures',
        ],
        'explanationId': """### Interface vs Type Alias
- **`interface`**: Digunakan terutama untuk mendefinisikan bentuk objek (*shape of an object*) dan kontrak OOP. Interface mendukung *declaration merging* (dapat dideklarasikan ulang untuk menambah properti).
- **`type alias`**: Jauh lebih fleksibel. Bisa merepresentasikan union, primitif, tuples, dan fungsi selain bentuk objek.
Sebagai aturan baku industri: gunakan `interface` untuk mendefinisikan entitas objek domain, dan gunakan `type` untuk union, fungsi, dan manipulasi tipe kompleks.

### Readonly & Optional Properties
- `readonly id: string`: Mencegah *re-assignment* `user.id = "lain"`. Memberikan kepastian integritas ID.
- `nomorTelepon?: string`: Menandai bahwa properti bisa bertipe `string | undefined`.

### Index Signatures
Saat Anda tidak mengetahui semua nama kunci di muka (misalnya tabel nilai tukar valuta asing atau cache memori), gunakan *index signature*:
```typescript
interface CacheStore {
  [key: string]: string | number;
}
```""",
        'explanationEn': """### Interface vs Type Alias
- **`interface`**: Primarily designed to model object shapes and public contracts. Interfaces support declaration merging (can be reopened across modules).
- **`type alias`**: Offers broader compositional power, modeling unions, primitives, tuples, and mapped expressions.
Industry best practice: prefer `interface` for public entity schemas, and `type` for unions, function signatures, and meta-programming utilities.

### Immutability with Readonly & Optionals
- `readonly id: string`: Intercepts `user.id = "mutation"` attempts, guaranteeing identifier permanence.
- `phoneNumber?: string`: Expands domain representation to `string | undefined`.

### Index Signatures
When key names cannot be predetermined at compile time (e.g., currency rate maps, headers, or runtime caches), declare an *index signature*:
```typescript
interface CacheStore {
  [key: string]: string | number;
}
```""",
        'beginnerId': """### Analogi: Formulir Paspor & Buku Alamat
1. **Interface** seperti formulir blangko pembuatan paspor: ada kolom wajib (Nama, NIK) dan kolom opsional (Gelar, Nama Panggilan). Kolom NIK bertuliskan tinta permanen (*readonly*).
2. **Index Signature** seperti buku catatan nomor telepon kosong: Anda bebas menulis nama kontak apa saja di sisi kiri (*key*), dan nomor telepon di sisi kanan (*value*).""",
        'beginnerEn': """### Analogy: Passport Application & Phonebook
1. **Interface** is a standardized passport form: required fields (Legal Name, National ID) alongside optional ones (Middle Name, Alias). National ID is printed in indelible ink (*readonly*).
2. **Index Signature** is a blank address book: you write any contact name on the left (*key*), mapping to their phone number on the right (*value*).""",
        'experimentsId': [
            'Coba ubah user1.id = "USR-999" dan perhatikan bagaimana TypeScript menolaknya.',
            'Hapus properti email dari user1 dan baca pesan eror missing property dari compiler.',
            'Tambahkan mata uang baru seperti "GBP": 20800 ke kursHariIni.',
            'Kombinasikan dua interface menggunakan kata kunci extends.',
        ],
        'experimentsEn': [
            'Attempt user1.id = "USR-999" to witness compiler mutation prevention.',
            'Delete the email property from user1 to observe missing contract diagnostics.',
            'Append a new currency code such as "GBP": 20800 to kursHariIni.',
            'Derive a new interface using the extends keyword.',
        ],
        'challengeId': 'Rancang interface `ProdukInventaris` dengan SKU readonly, nama, harga, stok, dan tag kategori opsional. Buat interface turunan `ProdukDiskon` yang menambahkan persentase diskon dan fungsi kalkulasi harga bersih.',
        'challengeEn': 'Design interface `InventoryProduct` with readonly SKU, name, price, stock, and optional categories. Derive `DiscountedProduct` adding discount percentage and a net price calculator method.',
        'summaryId': 'Kamu telah menguasai Interface, Type Alias, Readonly, Optional, dan Index Signatures. Minggu depan kita mempelajari Type Narrowing dan Type Guards.',
        'summaryEn': 'You have mastered Interfaces, Type Aliases, Readonly, Optionals, and Index Signatures. Next week, we explore Type Narrowing and Custom Type Guards.',
    },
    {
        'week': 3,
        'level': 'beginer',
        'topicId': 'type-narrowing-dan-guards',
        'titleId': 'Type Narrowing: typeof, instanceof, in & Custom Type Guards',
        'titleEn': 'Type Narrowing: typeof, instanceof, in & Custom Type Guards',
        'programId': 'Kalkulator Luas Bentuk Geometris & Mesin Validasi Transaksi',
        'programEn': 'Geometric Shape Area Calculator & Transaction Discriminator',
        'levelNameId': 'Pondasi Tipe & Type Narrowing',
        'levelNameEn': 'Type Foundations & Narrowing',
        'language': 'typescript',
        'code': """// 1. Discriminated Union (Tagged Union)
interface Lingkaran {
  kind: "lingkaran";
  radius: number;
}

interface PersegiPanjang {
  kind: "persegi_panjang";
  panjang: number;
  lebar: number;
}

interface Segitiga {
  kind: "segitiga";
  alas: number;
  tinggi: number;
}

type BentukGeometri = Lingkaran | PersegiPanjang | Segitiga;

// 2. Type Narrowing via Discriminant Property
function hitungLuas(bentuk: BentukGeometri): number {
  switch (bentuk.kind) {
    case "lingkaran":
      return Math.PI * bentuk.radius ** 2;
    case "persegi_panjang":
      return bentuk.panjang * bentuk.lebar;
    case "segitiga":
      return 0.5 * bentuk.alas * bentuk.tinggi;
  }
}

// 3. Custom Type Guard (User-Defined Type Predicate: x is T)
interface PembayaranKredit {
  nomorKartu: string;
  cicilanBulan: number;
}

function isPembayaranKredit(item: any): item is PembayaranKredit {
  return typeof item === "object" && item !== null && "nomorKartu" in item && "cicilanBulan" in item;
}

const inputLuar: unknown = { nomorKartu: "4111-2222-3333-4444", cicilanBulan: 12 };

if (isPembayaranKredit(inputLuar)) {
  console.log("Kartu Terverifikasi. Cicilan:", inputLuar.cicilanBulan, "bulan");
}

const c: Lingkaran = { kind: "lingkaran", radius: 7 };
console.log("Luas Lingkaran (r=7):", hitungLuas(c).toFixed(2));
""",
        'objectivesId': [
            'Memahami konsep Control Flow Analysis dan Narrowing pada compiler TypeScript',
            'Menggunakan guard bawaan JavaScript: typeof, instanceof, dan in operator',
            'Merancang Discriminated Unions (Tagged Unions) menggunakan properti pembeda literal',
            'Menulis Custom Type Guard dengan sintaks predicate (parameter is T)',
            'Membedakan tipe any (tidak aman) dengan tipe unknown (tipe aman wajib dinarrowing)',
        ],
        'objectivesEn': [
            'Understand Control Flow Analysis and Narrowing mechanics in TypeScript',
            'Deploy runtime guards: typeof, instanceof, and the in operator',
            'Architect Discriminated Unions (Tagged Unions) with literal discriminant fields',
            'Author Custom Type Guards using predicate signatures (parameter is T)',
            'Distinguish unsafe any from strictly safe unknown requiring narrowing',
        ],
        'explanationId': """### Apa itu Type Narrowing?
Dalam TypeScript, variabel seringkali memiliki tipe gabungan (*Union*), misalnya `string | number` atau `BentukA | BentukB`. **Type Narrowing** adalah proses di mana compiler menganalisis cabang kode (*if/switch/guards*) dan mempersempit tipe variabel menjadi tipe spesifik yang pasti aman pada blok kode tersebut.

### Discriminated Unions (Pola Terbaik)
Discriminated Union adalah pola paling kuat dalam TypeScript untuk memodelkan *state* sistem. Setiap interface dalam union memiliki satu properti pembeda (*discriminant literal*) yang sama (misalnya `kind: "lingkaran"` atau `status: "success"`).
Saat Anda melakukan `switch (bentuk.kind)`, compiler langsung tahu 100% properti apa saja yang tersedia di dalam `case` tersebut!

### Custom Type Guards (`pet is Dog`)
Jika logika pengecekan tipe cukup rumit dan berasal dari data luar (misalnya respons API JSON), buatlah fungsi pemeriksa dengan nilai kembalian `arg is TargetType`:
```typescript
function isUser(val: unknown): val is User {
  return typeof val === 'object' && val !== null && 'id' in val;
}
```""",
        'explanationEn': """### Understanding Type Narrowing
Variables frequently hold Union types such as `string | number` or `StateA | StateB`. **Type Narrowing** is the mechanism where the compiler evaluates branching constructs (`if`, `switch`, guards) and narrows the variable's broad union down to a concrete subtype within that execution block.

### Discriminated Unions (The Industry Standard)
Discriminated Unions are the single most robust pattern for modeling complex application state. Each interface shares a common literal discriminant property (e.g. `kind: "circle"` or `status: "success"`).
When evaluating `switch (shape.kind)`, TypeScript refines shape properties automatically per branch.

### Custom Type Guards (`arg is T`)
When validating unknown runtime boundaries (e.g., untyped API payloads), define custom predicates using `parameter is TargetType`:
```typescript
function isUser(val: unknown): val is User {
  return typeof val === 'object' && val !== null && 'id' in val;
}
```""",
        'beginnerId': """### Analogi: Jalur Bagasi Bandara
1. **Union type** seperti ban berjalan bagasi di bandara: ada koper kabin, koper bagasi roda, dan kotak kardus makanan campur aduk.
2. **Type Narrowing** seperti petugas bea cukai: jika koper memiliki stempel 'Fragile' (*discriminant*), ia diarahkan ke jalur manual; jika berbentuk kardus, diarahkan ke jalur pemeriksaan khusus.""",
        'beginnerEn': """### Analogy: Airport Baggage Sorters
1. **Union type** is the arrivals baggage carousel: luggage, oversized sports gear, and cardboard parcels travel along the same belt.
2. **Type Narrowing** is the barcode scanner gate: if a parcel holds a 'Fragile' tag (*discriminant*), it diverts to manual handling; standard luggage routes directly to baggage claim.""",
        'experimentsId': [
            'Hapus salah satu case dari switch di hitungLuas dan amati apakah TypeScript memberi peringatan.',
            'Coba akses bentuk.radius di dalam case "persegi_panjang" dan lihat erornya.',
            'Ubah inputLuar menjadi angka murni dan buktikan bahwa blok if tidak dieksekusi.',
            'Tambahkan bentuk baru "trapesium" ke dalam union dan perbaiki switch statement-nya.',
        ],
        'experimentsEn': [
            'Remove one switch case from hitungLuas and observe compiler feedback.',
            'Attempt accessing shape.radius within the "persegi_panjang" branch to see compile errors.',
            'Mutate inputLuar into a scalar number and verify the guard gracefully ignores execution.',
            'Add a new shape "trapezoid" to the union and update the discriminant exhaustive switch.',
        ],
        'challengeId': 'Rancang Discriminated Union `ApiResponse<T>` yang memiliki status "SUCCESS" (membawa data dan timestamp) atau "ERROR" (membawa pesan kesalahan dan kode eror HTTP). Tulis fungsi pemroses respons yang aman.',
        'challengeEn': 'Architect a Discriminated Union `ApiResponse<T>` featuring "SUCCESS" (holding payload data and timestamp) or "ERROR" (holding error message and HTTP code). Author a type-safe consumer.',
        'summaryId': 'Kamu telah menguasai Control Flow Analysis, Discriminated Unions, dan Custom Type Guards. Minggu depan kita membahas Tuples, Const Enums, dan Exhaustive Checks dengan never.',
        'summaryEn': 'You have mastered Control Flow Analysis, Discriminated Unions, and Custom Type Guards. Next week, we examine Tuples, Const Enums, and Exhaustive Checks with never.',
    },
    {
        'week': 4,
        'level': 'beginer',
        'topicId': 'tuples-enums-dan-void-never',
        'titleId': 'Tuples, Const Enums vs As Const, serta Exhaustive Check dengan never',
        'titleEn': 'Tuples, Const Enums vs As Const & Exhaustive Checks with never',
        'programId': 'Matriks Respons HTTP & Verifikasi Kelengkapan Alur Sistem',
        'programEn': 'HTTP Response Matrix & Exhaustive State Engine with never',
        'levelNameId': 'Pondasi Tipe & Type Narrowing',
        'levelNameEn': 'Type Foundations & Narrowing',
        'language': 'typescript',
        'code': """// 1. Tuples: Array dengan Panjang & Urutan Tipe Tetap
type KoordinatGeo = [latitude: number, longitude: number];
type RekorTransaksi = [id: string, nominal: number, sukses: boolean];

const kantorPusat: KoordinatGeo = [-6.2088, 106.8456]; // Jakarta
const log1: RekorTransaksi = ["TX-100", 500000, true];

// 2. As Const Object vs Enums (Standar Modern)
export const LogLevel = {
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
  CRITICAL: "CRITICAL"
} as const;

type TipeLogLevel = typeof LogLevel[keyof typeof LogLevel];

// 3. Exhaustive Check Menggunakan Tipe never
type PembayaranKanal = "QRIS" | "VIRTUAL_ACCOUNT" | "KARTU_KREDIT" | "GERAI_TUNAI";

function prosesBiayaAdmin(kanal: PembayaranKanal): number {
  switch (kanal) {
    case "QRIS":
      return 1500;
    case "VIRTUAL_ACCOUNT":
      return 4000;
    case "KARTU_KREDIT":
      return 7500;
    case "GERAI_TUNAI":
      return 2500;
    default:
      // Jika semua case terpenuhi, kode ini mustahil tercapai (bertipe never)
      const _exhaustiveCheck: never = kanal;
      throw new Error(`Kanal tidak dikenali: ${_exhaustiveCheck}`);
  }
}

console.log("Kantor:", kantorPusat[0], kantorPusat[1]);
console.log("Biaya QRIS:", prosesBiayaAdmin("QRIS"), "IDR");
console.log("Biaya Virtual Account:", prosesBiayaAdmin("VIRTUAL_ACCOUNT"), "IDR");
""",
        'objectivesId': [
            'Menggunakan Tuples untuk memodelkan baris data terstruktur dengan tipe dan urutan kaku',
            'Mengetahui kelemahan numeric enums tradisional dan cara kerja `as const` object',
            'Memahami tipe void (fungsi tanpa return) vs tipe never (fungsi yang tidak pernah selesai/mustahil tercapai)',
            'Menerapkan pola Exhaustive Checking dengan tipe never untuk mendeteksi missing case secara compile-time',
            'Membangun sistem penanganan eror yang 100% aman dari perubahan masa depan',
        ],
        'objectivesEn': [
            'Deploy Tuples to enforce strict element positioning and fixed-length array schemas',
            'Understand legacy numeric enum caveats and adopt modern `as const` object dictionaries',
            'Distinguish void (functions without return values) from never (unreachable terminal states)',
            'Implement the Exhaustive Checking pattern with never to catch missing switch cases at compile time',
            'Build future-proof error handling resilient against unhandled union variations',
        ],
        'explanationId': """### Mengapa Komunitas Menghindari TypeScript `enum`?
`enum` tradisional di TypeScript menghasilkan kode JavaScript ekstra (*runtime overhead*) dan memiliki perilaku numeric enum yang longgar. Standar modern TypeScript lebih memilih objek biasa yang di-freeze dengan **`as const`**:
```typescript
const Role = { Admin: "ADMIN", Member: "MEMBER" } as const;
type RoleType = typeof Role[keyof typeof Role];
```
Pola ini 100% murni JavaScript dan memiliki performa kompilasi instan.

### Kekuatan Tipe `never` & Exhaustive Checking
Tipe `never` merepresentasikan nilai yang **tidak boleh ada**. Jika Anda memiliki union tipe dengan 4 opsi, dan Anda menulis `switch` untuk 4 opsi tersebut, maka di blok `default`, variabel tersebut bertipe `never`.
Jika di kemudian hari rekan tim menambahkan opsi ke-5 pada union tersebut (misal `"PAYLATER"`), compiler akan **langsung memunculkan eror kompilasi merah di blok default**, karena tipe `"PAYLATER"` tidak bisa dimasukkan ke dalam `never`!""",
        'explanationEn': """### Why Modern Teams Prefer `as const` over `enum`
Traditional numeric enums in TypeScript generate synthetic runtime boilerplate and allow reverse-lookup pitfalls. Industry consensus favors plain frozen object maps using **`as const`**:
```typescript
const Role = { Admin: "ADMIN", Member: "MEMBER" } as const;
type RoleType = typeof Role[keyof typeof Role];
```
This zero-cost pattern produces pristine JavaScript and guarantees type safety.

### The Exhaustive Check Pattern with `never`
The `never` type models states that should **never happen**. When handling a 4-variant union in a switch statement, exhausting all 4 branches leaves the `default` block with type `never`.
If a teammate later adds a 5th variant to the union (e.g., `"PAYLATER"`), TypeScript produces an immediate compile error in `default`, because `"PAYLATER"` cannot be assigned to `never`!""",
        'beginnerId': """### Analogi: Pengaman Pintu Darurat & Resep Paten
1. **Tuple** seperti resep racikan sirup: botol pertama harus 200ml gula, botol kedua harus 50ml perisa, urutan tidak boleh terbalik.
2. **Exhaustive Check dengan never** seperti alarm pintu darurat otomatis: jika ada 4 skenario kebocoran pipa dan Anda hanya menyiapkan 3 tombol penutup, alarm sistem menyala merah dan pabrik menolak dioperasikan sebelum tombol ke-4 dipasang.""",
        'beginnerEn': """### Analogy: Lab Chemical Ratios & Safety Sensors
1. **Tuple** is a precise chemical titration: element 0 must be 200ml base, element 1 must be 50ml reagent; reversing positions corrupts the mixture.
2. **Exhaustive Check with never** is an automated fire panel: if an emergency has 4 possible disaster scenarios and your software only accounts for 3, the panel sounds an alert refusing startup until all scenarios have handles.""",
        'experimentsId': [
            'Tambahkan kanal baru "PAYLATER" ke union PembayaranKanal dan amati eror merah di default switch.',
            'Coba tambahkan elemen ke-3 pada variabel kantorPusat dan perhatikan peringatan panjang tuple.',
            'Coba assign nilai string sembarangan ke variabel TipeLogLevel.',
            'Uji pemanggilan prosesBiayaAdmin dengan casting sembarangan (as any) untuk melihat runtime error default.',
        ],
        'experimentsEn': [
            'Add a new option "PAYLATER" to PembayaranKanal and observe the compile diagnostic in default.',
            'Attempt appending a 3rd coordinate element to kantorPusat to trigger tuple length violations.',
            'Assign an arbitrary string to TipeLogLevel and examine compiler rejections.',
            'Simulate unsafe casting (as any) into prosesBiayaAdmin to verify fallback runtime throwing.',
        ],
        'challengeId': 'Bangun sistem finite state machine pesanan: "CREATED" -> "PAID" -> "SHIPPED" -> "DELIVERED" atau "CANCELLED". Tulis fungsi transisi status dengan exhaustive checking yang mencegah perpindahan status ilegal.',
        'challengeEn': 'Build an order state machine: "CREATED" -> "PAID" -> "SHIPPED" -> "DELIVERED" or "CANCELLED". Write an exhaustive transition resolver preventing illegal status hops.',
        'summaryId': 'Kamu telah menguasai fondasi tipe, narrowing, discriminated unions, dan exhaustive checks. Minggu depan kita memasuki Level 2: Generics & Utility Types.',
        'summaryEn': 'You have mastered foundation types, narrowing, discriminated unions, and exhaustive checking. Next week, we enter Level 2: Generics & Utility Types.',
    },

    # Level 2: Generics & Utility Types Modern (Weeks 5-7)
    {
        'week': 5,
        'level': 'intermediate',
        'topicId': 'generics-dan-constraints',
        'titleId': 'Generics: Fungsi Generik, Interfaces & Type Constraints (extends)',
        'titleEn': 'Generics: Generic Functions, Interfaces & Constraints (extends)',
        'programId': 'Repository Data In-Memory & Pipeline Paginated Response',
        'programEn': 'Generic In-Memory Repository & Paginated Response Pipeline',
        'levelNameId': 'Generics & Utility Types Modern',
        'levelNameEn': 'Generics & Modern Utility Types',
        'language': 'typescript',
        'code': """// 1. Generic Interface untuk Kontrak Data Terpaginasi
interface ApiResponse<TData> {
  sukses: boolean;
  data: TData;
  pesan?: string;
  waktuRespon: number;
}

interface EntitasDasar {
  id: string;
  dibuatPada: Date;
}

// 2. Generic Class dengan Constraint (TData extends EntitasDasar)
class RepositoryInMemory<TEntity extends EntitasDasar> {
  private items: Map<string, TEntity> = new Map();

  simpan(item: TEntity): TEntity {
    this.items.set(item.id, item);
    return item;
  }

  cariBerdasarkanId(id: string): TEntity | undefined {
    return this.items.get(id);
  }

  ambilSemua(): TEntity[] {
    return Array.from(this.items.values());
  }
}

// 3. Implementasi Konkret
interface PortofolioSaham extends EntitasDasar {
  simbolEmiten: string;
  jumlahLembar: number;
  hargaRataRata: number;
}

const repoSaham = new RepositoryInMemory<PortofolioSaham>();

repoSaham.simpan({
  id: "PF-01",
  simbolEmiten: "BBCA",
  jumlahLembar: 2500,
  hargaRataRata: 9800,
  dibuatPada: new Date()
});

const hasil = repoSaham.cariBerdasarkanId("PF-01");
console.log("Saham Terdaftar:", hasil?.simbolEmiten, "| Lembar:", hasil?.jumlahLembar);
""",
        'objectivesId': [
            'Memahami esensi Generics sebagai parameter penampung tipe (*type variables*)',
            'Menulis fungsi dan antarmuka generik yang dapat digunakan kembali untuk berbagai tipe data',
            'Menerapkan Type Constraints menggunakan kata kunci `extends` untuk membatasi kapabilitas tipe',
            'Membangun arsitektur Repository Pattern generik dengan pemeliharaan keamanan tipe penuh',
            'Mencegah duplikasi kode tanpa mengorbankan ketelitian static checking',
        ],
        'objectivesEn': [
            'Master the purpose of Generics as parameterized type placeholders',
            'Author reusable generic functions and interfaces spanning varied domain models',
            'Enforce Type Constraints via `extends` ensuring minimum required structural contracts',
            'Construct generic Repository abstractions retaining end-to-end compile-time safety',
            'Eliminate repetitive boilerplates while preserving static type integrity',
        ],
        'explanationId': """### Mengapa Kita Membutuhkan Generics?
Tanpa generics, Anda hanya punya dua pilihan buruk:
1. Menulis fungsi duplikat untuk setiap tipe data (`simpanUser`, `simpanSaham`, `simpanProduk`).
2. Menggunakan tipe `any` yang menghancurkan semua keunggulan keamanan tipe TypeScript.
**Generics** memungkinkan Anda menulis cetak biru fungsi atau kelas yang menerima tipe data sebagai argumen (`<T>`), seperti parameter fungsi menerima nilai data.

### Generic Constraints (`<T extends EntitasDasar>`)
Seringkali kita tidak ingin tipe `T` benar-benar bebas tanpa batas. Misalnya, repository membutuhkan setiap objek yang disimpan wajib memiliki properti `id: string`.
Dengan menulis `<T extends EntitasDasar>`, kita mengunci bahwa tipe apapun yang dimasukkan **wajib memiliki properti minimal yang ada di `EntitasDasar`**, namun tetap mempertahankan identitas tipe aslinya.""",
        'explanationEn': """### Why Generics Are Indispensable
Without generics, engineers face two unsatisfactory compromises:
1. Re-authoring duplicated functions per domain entity (`saveUser`, `saveStock`, `saveProduct`).
2. Reverting to `any`, which forfeits all static validation safeguards.
**Generics** empower you to author component blueprints parameterized by types (`<T>`), just as standard functions are parameterized by runtime arguments.

### Generic Constraints (`<T extends BaseEntity>`)
Frequently, type placeholders must guarantee foundational capabilities. For example, a repository storage engine mandates that any persistable entity must hold an `id: string`.
By stating `<T extends BaseEntity>`, TypeScript guarantees that input types **possess at least the contract of BaseEntity**, while retaining their specific concrete shapes.""",
        'beginnerId': """### Analogi: Kotak Kontainer Kargo Standar ISO
1. **Fungsi biasa tanpa Generics** seperti truk khusus yang hanya bisa mengangkut kulkas tertentu: jika ingin mengangkut mesin cuci, Anda harus membeli truk baru.
2. **Generics** seperti sistem kontainer pengapalan modern (ISO shipping container): kapal pengangkut didesain memuat kotak berukuran standar. Kotak tersebut bisa diisi mobil, beras, atau elektronik, dan kapal mengangkutnya dengan keamanan sempurna tanpa perlu peduli isi spesifiknya.""",
        'beginnerEn': """### Analogy: Standardized Shipping Containers
1. **Non-generic functions** are custom delivery vans tailored strictly for a single refrigerator model: transporting dishwashers requires manufacturing a brand new vehicle.
2. **Generics** are intermodal ISO shipping containers: container ships transport standardized metal hulls regardless of whether the contents hold motor vehicles, grain, or servers, guaranteeing secure transit.""",
        'experimentsId': [
            'Coba simpan objek ke repoSaham tanpa properti id dan amati pesan eror compile-time.',
            'Buat interface baru KriptoAset (extends EntitasDasar) dan buat repository terpisah.',
            'Tulis fungsi generik sederhana balikkanArray<T>(items: T[]): T[].',
            'Uji apa yang terjadi jika Anda memanggil repoSaham.simpan({ id: "1" } as any).',
        ],
        'experimentsEn': [
            'Attempt saving an entity without an id property into repoSaham to verify constraint enforcement.',
            'Define a new CryptoAsset interface extending BaseEntity and instantiate a repository.',
            'Author a generic utility reverseArray<T>(items: T[]): T[].',
            'Investigate runtime behavior when force-casting incomplete payloads via any.',
        ],
        'challengeId': 'Buat kelas generik `StackAntrean<T>` dengan method `push(item: T)`, `pop(): T | undefined`, `peek(): T | undefined`, dan `size(): number`. Pastikan tipe data yang keluar selalu identik dengan yang masuk.',
        'challengeEn': 'Implement a generic `StackQueue<T>` with `push(item: T)`, `pop(): T | undefined`, `peek(): T | undefined`, and `size(): number`, guaranteeing strict input-output type alignment.',
        'summaryId': 'Kamu telah menguasai Generics dan Generic Constraints. Minggu depan kita mempelajari Utility Types bawaan TypeScript: Partial, Required, Pick, Omit, dan Record.',
        'summaryEn': 'You have mastered Generics and Type Constraints. Next week, we examine built-in Utility Types: Partial, Required, Pick, Omit, and Record.',
    },
    {
        'week': 6,
        'level': 'intermediate',
        'topicId': 'utility-types-built-in',
        'titleId': 'Utility Types Bawaan: Partial, Required, Pick, Omit, Record & ReturnType',
        'titleEn': 'Built-in Utility Types: Partial, Required, Pick, Omit, Record & ReturnType',
        'programId': 'Transformasi Skema Data Pengguna & Registry Konfigurasi',
        'programEn': 'User Schema Transformation Pipeline & Configuration Registry',
        'levelNameId': 'Generics & Utility Types Modern',
        'levelNameEn': 'Generics & Modern Utility Types',
        'language': 'typescript',
        'code': """interface AkunNasabah {
  id: string;
  namaLengkap: string;
  email: string;
  nomorKTP: string;
  saldoTabungan: number;
  alamatTinggal?: string;
}

// 1. Partial: Membuat semua properti menjadi opsional (Cocok untuk fitur UPDATE / PATCH)
type PayloadUpdateNasabah = Partial<AkunNasabah>;

// 2. Required: Memaksa semua properti (termasuk yang aslinya opsional) menjadi wajib
type NasabahLengkapValidasi = Required<AkunNasabah>;

// 3. Pick: Mengambil sebagian kecil properti untuk skema publik
type KartuNasabahRingkas = Pick<AkunNasabah, "id" | "namaLengkap" | "saldoTabungan">;

// 4. Omit: Membuang properti sensitif sebelum dikirim ke browser luar
type NasabahPublik = Omit<AkunNasabah, "nomorKTP" | "saldoTabungan">;

// 5. Record: Membuat peta kamus aman berbasis kunci tertentu
type RolePetugas = "SUPER_ADMIN" | "OPERATOR_KASIR" | "AUDITOR";
const izinAksesMenu: Record<RolePetugas, string[]> = {
  SUPER_ADMIN: ["DASHBOARD", "MUTASI", "SETOR", "TARIK", "HAPUS_USER"],
  OPERATOR_KASIR: ["DASHBOARD", "MUTASI", "SETOR"],
  AUDITOR: ["DASHBOARD", "MUTASI"]
};

// 6. ReturnType: Menangkap tipe nilai kembalian dari suatu fungsi
function buatSesiLogin(idUser: string) {
  return { token: "JWT-XYZ-" + idUser, kedaluwarsaDetik: 3600, waktuDibuat: Date.now() };
}
type ResponSesi = ReturnType<typeof buatSesiLogin>;

const kartu: KartuNasabahRingkas = {
  id: "NSB-99",
  namaLengkap: "Siti Rahma",
  saldoTabungan: 15_750_000
};

console.log("Ringkasan Kartu:", kartu);
console.log("Izin Petugas Kasir:", izinAksesMenu.OPERATOR_KASIR);
""",
        'objectivesId': [
            'Menggunakan Partial<T> untuk membangun payload mutasi data (HTTP PATCH)',
            'Menggunakan Required<T> untuk memastikan integritas data sebelum persistensi database',
            'Memanfaatkan Pick<T, K> dan Omit<T, K> untuk transformasi DTO (Data Transfer Object)',
            'Menggunakan Record<K, T> untuk kamus tipe ketat dengan validasi kelengkapan kunci',
            'Mengekstrak tipe fungsi secara otomatis menggunakan ReturnType<T> dan Parameters<T>',
        ],
        'objectivesEn': [
            'Apply Partial<T> to model partial mutation payloads (HTTP PATCH workflows)',
            'Leverage Required<T> to enforce schema completeness before database writes',
            'Deploy Pick<T, K> and Omit<T, K> to construct secure Data Transfer Objects (DTOs)',
            'Utilize Record<K, T> to maintain complete typed dictionaries without missed keys',
            'Extract function signatures dynamically with ReturnType<T> and Parameters<T>',
        ],
        'explanationId': """### Mengapa Utility Types Penting?
Dalam rekayasa perangkat lunak skala besar, Anda **tidak boleh mendefinisikan ulang interface yang mirip berkali-kali**. Jika model database Anda memiliki 20 kolom, Anda tidak perlu membuat `InterfaceUpdate` secara manual dengan menulis ulang 20 baris bertanda tanda tanya `?`.
TypeScript menyediakan koleksi utilitas tipe meta bawaan yang mentransformasikan bentuk interface yang ada menjadi bentuk baru secara instan.

### Ringkasan Utilitas Utama:
1. `Partial<T>`: Mengubah semua kunci menjadi `key?: type`.
2. `Required<T>`: Menghilangkan semua `?` sehingga semua wajib ada.
3. `Readonly<T>`: Mengunci semua properti agar tidak bisa dimutasi.
4. `Pick<T, K>`: Memilih subset kunci tertentu dari tipe `T`.
5. `Omit<T, K>`: Menyingkirkan kunci tertentu dari tipe `T`.
6. `Record<Keys, Values>`: Memetakan kumpulan union kunci menjadi nilai tipe tertentu.""",
        'explanationEn': """### The Architecture of Utility Types
In enterprise codebases, **never duplicate near-identical interfaces**. If an entity model comprises 20 database fields, manually creating an `UpdateDto` with 20 optional question marks is an anti-pattern prone to drift.
TypeScript ships with first-class type transformers that dynamically reshape existing schemas at compile time.

### Core Utility Index:
1. `Partial<T>`: Transforms every property into `key?: type`.
2. `Required<T>`: Strips optional markers, mandating presence of every field.
3. `Readonly<T>`: Freezes all properties against mutation.
4. `Pick<T, K>`: Extracts a selective subset of keys from `T`.
5. `Omit<T, K>`: Removes specified keys from `T`.
6. `Record<Keys, Values>`: Constructs a strict dictionary mapping keys to values.""",
        'beginnerId': """### Analogi: Mengedit Formulir & Fotokopi Sensor
1. **`Partial`** seperti formulir ubah data alamat: Anda hanya perlu mengisi kolom yang ingin diperbarui tanpa perlu menulis ulang seluruh riwayat hidup Anda.
2. **`Omit`** seperti fotokopi KTP yang bagian nomor NIK-nya disensor spidol hitam sebelum diserahkan ke pihak ketiga demi keamanan data.""",
        'beginnerEn': """### Analogy: Profile Edit Sheets & Redacted Documents
1. **`Partial`** is an address change slip: you fill only the fields you wish to modify rather than rewriting your entire birth history.
2. **`Omit`** is a government identification photocopy where confidential identifiers are redacted before sharing with external vendors.""",
        'experimentsId': [
            'Hapus salah satu peran dari objek izinAksesMenu dan lihat bagaimana Record mendeteksi properti yang kurang.',
            'Coba masukkan nomorKTP ke dalam objek bertipe NasabahPublik dan amati eror compiler.',
            'Gunakan Readonly<AkunNasabah> dan coba modifikasi saldoTabungan.',
            'Gunakan utilitas Parameters<typeof buatSesiLogin> untuk melihat tipe argumen fungsi.',
        ],
        'experimentsEn': [
            'Omit a key from izinAksesMenu to observe how Record enforces exhaustive key coverage.',
            'Inject nomorKTP into an object typed as NasabahPublik to trigger compile rejection.',
            'Wrap AkunNasabah in Readonly and attempt modifying saldoTabungan.',
            'Inspect argument parameter types using Parameters<typeof buatSesiLogin>.',
        ],
        'challengeId': 'Diberikan interface `ProdukECommerce`. Buat tipe `ProdukDraft` (semua opsional kecuali judul), tipe `ProdukDisplay` (tanpa hargaGrosir dan supplierId), dan tipe `StokPerGudang` yang memetakan id gudang ("JKT-01" | "SBY-02" | "BDG-03") ke angka stok.',
        'challengeEn': 'Given `ECommerceProduct`, author `DraftProduct` (all optional except title), `DisplayProduct` (omitting wholesalePrice and supplierId), and `StockPerWarehouse` mapping warehouse ids ("JKT-01" | "SBY-02" | "BDG-03") to numbers.',
        'summaryId': 'Kamu telah menguasai Utility Types bawaan untuk transformasi skema data. Minggu depan kita mempelajari Conditional Types dan kata kunci infer.',
        'summaryEn': 'You have mastered built-in Utility Types for schema projection. Next week, we examine Conditional Types and the infer keyword.',
    },
    {
        'week': 7,
        'level': 'intermediate',
        'topicId': 'conditional-types-dan-infer',
        'titleId': 'Conditional Types, infer Keyword & Template Literal Types',
        'titleEn': 'Conditional Types, the infer Keyword & Template Literal Types',
        'programId': 'Mesin Pembongkar Tipe Asinkron & Event Dispatcher Tipe-Ketat',
        'programEn': 'Async Unwrapper Engine & Strongly-Typed Event Dispatcher',
        'levelNameId': 'Generics & Utility Types Modern',
        'levelNameEn': 'Generics & Modern Utility Types',
        'language': 'typescript',
        'code': """// 1. Conditional Types: T extends U ? X : Y
type CekTipeData<T> = T extends string ? "Ini Teks" : "Bukan Teks";

type Uji1 = CekTipeData<string>; // "Ini Teks"
type Uji2 = CekTipeData<number>; // "Bukan Teks"

// 2. infer: Membongkar / Menembus Tipe Dalam Promise (Unwrap Promise)
type BongkarPromise<T> = T extends Promise<infer U> ? U : T;

type DataAsinkron = Promise<{ id: string; saldo: number }>;
type DataBersih = BongkarPromise<DataAsinkron>; // { id: string; saldo: number }

// 3. Template Literal Types (Membangun Format String Dinamis)
type AksiSistem = "buat" | "perbarui" | "hapus";
type EntitasSistem = "pengguna" | "transaksi" | "portofolio";

// Hasil: "buat:pengguna" | "buat:transaksi" | "perbarui:pengguna" | dst...
type NamaEventPublik = `${AksiSistem}:${EntitasSistem}`;

class EventBusKetat {
  private listener: Map<string, Function[]> = new Map();

  on(event: NamaEventPublik, handler: (payload: any) => void) {
    const list = this.listener.get(event) || [];
    list.push(handler);
    this.listener.set(event, list);
  }

  emit(event: NamaEventPublik, payload: any) {
    const list = this.listener.get(event) || [];
    list.forEach(fn => fn(payload));
  }
}

const bus = new EventBusKetat();
bus.on("buat:transaksi", (data) => {
  console.log("Event diterima:", data);
});

bus.emit("buat:transaksi", { id: "TX-77", nominal: 250000 });
""",
        'objectivesId': [
            'Memahami logika percabangan tipe dengan Conditional Types (T extends U ? X : Y)',
            'Menggunakan kata kunci `infer` untuk mengekstrak tipe elemen internal dari struktur kompleks',
            'Membangun utilitas unwrap tipe Promise dan Array kustom',
            'Menggunakan Template Literal Types untuk memvalidasi string berpola (misal event name, CSS selector)',
            'Menghindari kesalahan ketik nama event pada arsitektur sistem berbasis pub/sub',
        ],
        'objectivesEn': [
            'Grasp type branching logic using Conditional Types (T extends U ? X : Y)',
            'Leverage the `infer` keyword to deduce inner payload types within generic wrappers',
            'Construct custom unwrapper utilities for nested Promises and Arrays',
            'Deploy Template Literal Types to constrain dynamic pattern-matched string channels',
            'Prevent typos across event names within asynchronous pub/sub systems',
        ],
        'explanationId': """### Logika 'If-Else' di Level Tipe
Conditional Types membawa logika percabangan (*if-else*) ke dalam compiler TypeScript:
```typescript
type NonNullableCustom<T> = T extends null | undefined ? never : T;
```
Jika `T` adalah `null` atau `undefined`, ia dibuang (`never`), jika bukan, ia dipertahankan.

### Keajaiban Kata Kunci `infer`
Kata kunci `infer` digunakan di dalam klausa kondisional untuk **menebak atau mengekstrak tipe variabel yang berada di dalam pembungkus**.
Misalnya: jika Anda menerima `Promise<User>`, bagaimana cara mendapatkan tipe `User`-nya saja tanpa pembungkus Promise?
Dengan `T extends Promise<infer U> ? U : T`, TypeScript secara otomatis memasukkan isi tipe ke dalam variabel bayangan `U` dan mengembalikannya!

### Template Literal Types
Sejak TypeScript 4.1, Anda bisa menggabungkan union string persis seperti template string JavaScript:
```typescript
type HttpMethod = 'GET' | 'POST';
type Endpoint = '/users' | '/orders';
type Route = `${HttpMethod} ${Endpoint}`; // "GET /users" | "POST /users" | ...
```""",
        'explanationEn': """### Branching Logic at the Type Level
Conditional Types empower the compiler with structural ternary logic:
```typescript
type NonNullableCustom<T> = T extends null | undefined ? never : T;
```
If `T` satisfies `null | undefined`, it resolves to `never` (filtering it out); otherwise it returns `T`.

### The `infer` Keyword
The `infer` declaration introduces a pattern-matching variable within the conditional check, allowing you to deduce encapsulated inner types.
For example, to strip the outer container from a `Promise<User>` to extract pure `User`:
`T extends Promise<infer U> ? U : T` captures the promised payload into temporary type variable `U`.

### Template Literal Types
TypeScript enables template literal union multiplication:
```typescript
type HttpMethod = 'GET' | 'POST';
type Endpoint = '/users' | '/orders';
type Route = `${HttpMethod} ${Endpoint}`; // "GET /users" | "POST /users" | ...
```""",
        'beginnerId': """### Analogi: Pembuka Paket Hadiah & Stempel Tiket
1. **`infer`** seperti mesin pemindai sinar-X paket pos: jika paketnya berupa kardus berbungkus pita (*Promise*), mesin membongkar kardus dan mengeluarkan isi barang di dalamnya.
2. **Template Literal Types** seperti stempel kombinasi tanggal dan kota di paspor: ada bagian hari, bulan, dan negara asal yang digabungkan otomatis menjadi format baku yang tidak bisa dipalsukan.""",
        'beginnerEn': """### Analogy: Parcel Unboxers & Immigration Stamps
1. **`infer`** is an automated luggage unboxer: if a package arrives wrapped inside a sealed shipping container (*Promise*), the robotic arm extracts the core payload inside.
2. **Template Literal Types** is an immigration date stamp: combining dynamic days, months, and country codes into an uncompromising verifiable string pattern.""",
        'experimentsId': [
            'Coba panggil bus.emit("buat:barang_palsu" as any) dan lihat mengapa nama event harus sesuai pola.',
            'Uji BongkarPromise dengan tipe non-promise seperti string murni dan amati hasil kembaliannya.',
            'Buat template literal type untuk kode warna hex yang diawali dengan tanda pagar: `#${string}`.',
            'Buat utilitas EkstrakArray<T> yang meng-infer tipe isi array: T extends (infer E)[] ? E : T.',
        ],
        'experimentsEn': [
            'Attempt bus.emit("invalid:channel" as any) and observe pattern rejection.',
            'Pass a scalar type into BongkarPromise and observe fallback preservation.',
            'Construct a Template Literal Type validating CSS Hex codes starting with `#${string}`.',
            'Author an ExtractArray<T> utility leveraging T extends (infer E)[] ? E : T.',
        ],
        'challengeId': 'Tulis tipe kondisional `Flatten<T>` yang dapat membongkar array multi-dimensi (misal `number[][][]` menjadi `number`). Tambahkan penanganan untuk tipe data primitif biasa.',
        'challengeEn': 'Author a recursive conditional type `Flatten<T>` that unwraps multi-dimensional arrays (e.g. `number[][][]` into `number`), preserving primitives cleanly.',
        'summaryId': 'Kamu telah menguasai Conditional Types, infer, dan Template Literal Types. Minggu depan kita memasuki Level 3: Mapped Types, keyof, dan arsitektur State Store.',
        'summaryEn': 'You have mastered Conditional Types, infer, and Template Literal Types. Next week, we enter Level 3: Mapped Types, keyof, and Immutable State Stores.',
    },

    # Level 3: Sistem Tipe Lanjut & Capstone Portofolio (Weeks 8-10)
    {
        'week': 8,
        'level': 'advanced',
        'topicId': 'mapped-types-dan-keyof',
        'titleId': 'Mapped Types, keyof Operator & Immutable State Store',
        'titleEn': 'Mapped Types, the keyof Operator & Immutable State Store',
        'programId': 'Mesin State Store Reaktif dengan Mutasi Deep Readonly',
        'programEn': 'Reactive Immutable State Store with Deep Readonly Mapped Types',
        'levelNameId': 'Sistem Tipe Lanjut & Capstone Portofolio',
        'levelNameEn': 'Advanced Type Systems & Portfolio Capstone',
        'language': 'typescript',
        'code': """// 1. keyof Operator: Mengambil Union dari Semua Kunci Objek
interface PortofolioState {
  totalAset: number;
  simbolAktif: string[];
  sedangSinkronisasi: boolean;
}

type KunciPortofolio = keyof PortofolioState; // "totalAset" | "simbolAktif" | "sedangSinkronisasi"

// 2. Mapped Type: Mengubah Setiap Kunci Properti Menjadi Getter Method
type GetterPortofolio<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// 3. Deep Readonly: Mengunci Objek Bertingkat Sampai Kedalaman Terdalam
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

interface KonfigurasiInvestasi {
  profilRisiko: string;
  aturanBatas: {
    maksimalAlokasiSatuEmiten: number;
    stopLossPersen: number;
  };
}

const configAman: DeepReadonly<KonfigurasiInvestasi> = {
  profilRisiko: "MODERAT",
  aturanBatas: {
    maksimalAlokasiSatuEmiten: 0.20,
    stopLossPersen: 0.05
  }
};

// configAman.aturanBatas.stopLossPersen = 0.1; // COMPILE ERROR: Deeply locked!

console.log("Status Konfigurasi:", configAman.profilRisiko);
console.log("Stop Loss Terkunci:", configAman.aturanBatas.stopLossPersen * 100, "%");
""",
        'objectivesId': [
            'Menguasai operator keyof untuk mengekstrak union kunci dari interface apapun',
            'Menulis Mapped Types kustom untuk mentransformasi properti objek secara dinamis',
            'Menggunakan Key Remapping (`as`) dan fungsi intrinsik string (Capitalize, Uppercase)',
            'Membangun utilitas rekursif DeepReadonly untuk arsitektur state immutability enterprise',
            'Mencegah kecacatan data pada aplikasi manajemen aset keuangan bertaraf produksi',
        ],
        'objectivesEn': [
            'Master the keyof operator to extract property key unions from any interface',
            'Construct custom Mapped Types iterating over object keys dynamically',
            'Deploy Key Remapping (`as`) and string intrinsic primitives (Capitalize, Uppercase)',
            'Author recursive DeepReadonly utilities enforcing complete state immutability',
            'Prevent race condition state corruptions in enterprise financial asset management',
        ],
        'explanationId': """### Operator `keyof`
Operator `keyof` mengambil semua nama properti publik dari suatu tipe dan mengubahnya menjadi union tipe literal string. Ini memungkinkan Anda membuat fungsi akses properti yang 100% aman:
```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

### Mapped Types (`[K in keyof T]`)
Jika Anda ingin membuat salinan tipe tetapi mengubah semua nilainya (misalnya semua nilai dijadikan fungsi *getter* atau dijadikan *nullable*), gunakan sintaks Mapped Types:
```typescript
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};
```

### Key Remapping dengan `as`
Sejak TypeScript 4.1, Anda bisa mengubah nama kunci saat memetakan properti:
`[K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];`
Sintaks ini secara otomatis mengubah properti `nama` menjadi method `getNama()`, persis seperti generator kode di level tipe!""",
        'explanationEn': """### The `keyof` Operator
The `keyof` operator extracts all public keys of a type into a string literal union, enabling bulletproof dynamic property lookups:
```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

### Mapped Types (`[K in keyof T]`)
When you need to project an interface schema by transforming its fields (e.g. converting properties into getter methods, nullable values, or promises), deploy Mapped Types:
```typescript
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};
```

### Key Remapping via `as`
With Key Remapping, property identifiers can be reshaped during mapping:
`[K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];`
This automatically projects a `name` field into a `getName()` accessor type signature.""",
        'beginnerId': """### Analogi: Cetakan Mesin Pabrik & Stempel Segel
1. **`keyof`** seperti daftar menu di restoran: Anda hanya boleh memesan nama makanan yang tercantum di buku menu; menyebutkan makanan di luar menu langsung ditolak pramusaji.
2. **Deep Readonly** seperti melaminasi buku sertifikat tanah: bukan hanya sampul depannya yang tidak bisa dicoret, tetapi setiap halaman di lembar terdalam ikut terkunci rapat dari coretan tinta.""",
        'beginnerEn': """### Analogy: Restaurant Menus & Laminated Legal Deeds
1. **`keyof`** is an authorized restaurant menu: you can only order items printed on the menu; ordering off-menu triggers immediate rejection by the kitchen staff.
2. **Deep Readonly** is a tamper-evident laminated legal deed: not only is the outer binder sealed, but every nested sub-page is permanently shielded against alterations.""",
        'experimentsId': [
            'Buka komentar pada baris configAman.aturanBatas.stopLossPersen = 0.1 dan amati eror kompilasi.',
            'Buat Mapped Type baru yang mengubah seluruh tipe data nilai properti menjadi string.',
            'Uji operator keyof pada interface yang memiliki ratusan properti.',
            'Tambahkan properti array ke KonfigurasiInvestasi dan lihat bagaimana DeepReadonly menguncinya.',
        ],
        'experimentsEn': [
            'Uncomment the mutation line configAman.aturanBatas.stopLossPersen to see deep immutability in action.',
            'Construct a Mapped Type converting every property value into string representations.',
            'Execute keyof over an interface with dozens of properties to observe the resulting union.',
            'Append an array field to KonfigurasiInvestasi and verify DeepReadonly locks mutation methods.',
        ],
        'challengeId': 'Buat utilitas Mapped Type `ValidasiSkema<T>` yang mengubah setiap properti `T` menjadi fungsi validator: `(nilai: T[K]) => boolean | string`. Uji pada interface `ProfilUser`.',
        'challengeEn': 'Author a Mapped Type `ValidationSchema<T>` projecting every property of `T` into a validation predicate: `(value: T[K]) => boolean | string`. Verify against `UserProfile`.',
        'summaryId': 'Kamu telah menguasai keyof, Mapped Types, Key Remapping, dan Deep Readonly. Minggu depan kita mendalami Declaration Files (.d.ts) dan konfigurasi kompilasi enterprise.',
        'summaryEn': 'You have mastered keyof, Mapped Types, Key Remapping, and Deep Readonly. Next week, we examine Declaration Files (.d.ts) and enterprise compilation flags.',
    },
    {
        'week': 9,
        'level': 'advanced',
        'topicId': 'declaration-files-dan-ambient',
        'titleId': 'Declaration Files (.d.ts), Ambient Types & Module Augmentation',
        'titleEn': 'Declaration Files (.d.ts), Ambient Types & Module Augmentation',
        'programId': 'Mengetik Library Eksternal Tanpa Tipe & Augmentasi Sesi Express',
        'programEn': 'Typing Legacy Vanilla Libraries & Express Session Augmentation',
        'levelNameId': 'Sistem Tipe Lanjut & Capstone Portofolio',
        'levelNameEn': 'Advanced Type Systems & Portfolio Capstone',
        'language': 'typescript',
        'code': """// 1. Ambient Declaration untuk Library JavaScript Warisan Tanpa Tipe
declare namespace WindowSDKWarisan {
  function hitungPajakInternasional(nominal: number, negara: string): number;
  const versiEngine: string;
}

// 2. Module Augmentation (Memperluas Tipe Library Tanpa Mengubah Source-nya)
// Bayangkan ini memperluas interface Express Request atau Session bawaan
declare global {
  namespace Express {
    interface Request {
      penggunaTervalidasi?: {
        userId: string;
        tierAkun: "RETAIL" | "INSTITUSI";
        ipAddress: string;
      };
    }
  }
}

// 3. Penggunaan Nyata dalam Handler Middleware
function middlewareAutentikasi(req: any) {
  // Melalui module augmentation, properti penggunaTervalidasi kini dikenal resmi
  req.penggunaTervalidasi = {
    userId: "USR-789",
    tierAkun: "INSTITUSI",
    ipAddress: "103.11.22.33"
  };
  console.log("User terautentikasi:", req.penggunaTervalidasi.userId);
  console.log("Tier Hak Akses:", req.penggunaTervalidasi.tierAkun);
}

const reqMock: any = {};
middlewareAutentikasi(reqMock);
""",
        'objectivesId': [
            'Memahami peran file definisi tipe (.d.ts) dan bagaimana npm @types bekerja',
            'Menggunakan kata kunci `declare` untuk ambient declarations variabel global browser / Node.js',
            'Menerapkan Module Augmentation untuk memperluas interface library pihak ketiga (Express, Next.js)',
            'Memahami opsi tsconfig penting: strict, noImplicitAny, exactOptionalPropertyTypes, skipLibCheck',
            'Menulis definisi tipe mandiri untuk library open source warisan tanpa tipe bawaan',
        ],
        'objectivesEn': [
            'Understand declaration files (.d.ts) and how npm @types registries resolve dependencies',
            'Deploy the `declare` keyword for ambient definitions spanning browser globals and Node runtime',
            'Execute Module Augmentation to extend third-party vendor interfaces (Express, Next.js)',
            'Configure critical enterprise tsconfig flags: strict, noImplicitAny, exactOptionalPropertyTypes',
            'Author ambient typings for legacy JavaScript packages lacking native type definitions',
        ],
        'explanationId': """### Apa itu File `.d.ts`?
File berakhiran `.d.ts` (*Declaration File*) hanya berisi informasi tipe data tanpa implementasi logika kode. File ini bertindak sebagai **jembatan penerjemah** antara JavaScript murni dengan compiler TypeScript. Ketika Anda menginstal `@types/node` atau `@types/react`, Anda sebenarnya sedang mengunduh koleksi file `.d.ts` ini.

### Module Augmentation
Seringkali library pihak ketiga seperti Express memiliki objek `Request` standar. Namun, aplikasi Anda memiliki middleware autentikasi yang menambahkan properti `req.user`.
Daripada melakukan casting `(req as any).user`, Anda dapat memperluas interface asli library tersebut menggunakan **Declaration Merging / Module Augmentation**:
```typescript
declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthenticatedUser;
  }
}
```
Kini seluruh aplikasi Anda menikmati auto-complete dan type safety tanpa menyentuh node_modules!""",
        'explanationEn': """### Demystifying `.d.ts` Declaration Files
Files with extension `.d.ts` hold strictly type metadata without executable logic. They act as **Rosetta stones** between plain JavaScript runtimes and the TypeScript compiler. When installing `@types/node` or `@types/react`, you are acquiring declaration files.

### Module Augmentation in Enterprise Architectures
Third-party HTTP frameworks such as Express expose a baseline `Request` shape. Production systems inject credentials via auth middleware (`req.user`).
Rather than compromising with `(req as any).user`, augment the vendor contract via **Declaration Merging**:
```typescript
declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthenticatedUser;
  }
}
```
Your entire engineering org gains autocomplete and compiler guarantees without hacking `node_modules`.""",
        'beginnerId': """### Analogi: Papan Label Nama di Hotel Berbintang
1. **`.d.ts`** seperti buku panduan fasilitas hotel yang diterjemahkan ke 5 bahasa: gedungnya sendiri berbahasa lokal (*JavaScript*), namun buku panduan membantu tamu asing (*TypeScript*) mengetahui persis letak kolam renang dan nomor kamar.
2. **Module Augmentation** seperti stiker kartu akses VIP: Anda tidak mengubah bentuk fisik kartu kamar hotel, tetapi petugas menempelkan izin akses khusus lift lantai penthouse di atas kartu tersebut.""",
        'beginnerEn': """### Analogy: Multilingual Hotel Guides & VIP Access Badges
1. **`.d.ts`** is a multilingual visitor brochure: the physical building operates in the regional tongue (*JavaScript*), while the brochure instructs foreign travelers (*TypeScript*) precisely where elevators and suites reside.
2. **Module Augmentation** is a VIP badge overlay: without altering the hotel keycard's hardware, security attaches an authorization badge granting elevator access to the penthouse suites.""",
        'experimentsId': [
            'Coba deklarasikan variabel global declare const API_SECRET: string dan panggil di console.',
            'Tambahkan properti baru ke namespace Express.Request di atas dan periksa ketersediaannya.',
            'Eksplorasi file tsconfig.json dan aktifkan flag strict: true.',
            'Pelajari apa yang terjadi jika flag skipLibCheck disetel ke false pada project besar.',
        ],
        'experimentsEn': [
            'Declare an ambient variable declare const API_SECRET: string and reference it in console statements.',
            'Append an additional field to Express.Request and verify intellisense availability.',
            'Inspect tsconfig.json compiler options and enforce strict: true.',
            'Observe compilation performance when toggling skipLibCheck across large dependencies.',
        ],
        'challengeId': 'Tulis file deklarasi ambient `window-env.d.ts` yang memperluas interface `Window` browser global dengan properti `analyticsTracker: { trackEvent: (name: string, meta?: object) => void }`.',
        'challengeEn': 'Author ambient declaration `window-env.d.ts` augmenting the global browser `Window` interface with `analyticsTracker: { trackEvent: (name: string, meta?: object) => void }`.',
        'summaryId': 'Kamu telah menguasai Declaration Files dan Module Augmentation. Minggu depan adalah Capstone Final: Mesin Portofolio Keuangan Tipe-Ketat.',
        'summaryEn': 'You have mastered Declaration Files and Module Augmentation. Next week is our Capstone Project: Strongly-Typed Financial Portfolio Engine.',
    },
    {
        'week': 10,
        'level': 'advanced',
        'topicId': 'capstone-financial-ledger',
        'titleId': 'Capstone: Mesin Portofolio Keuangan & Audit Log Tipe-Ketat',
        'titleEn': 'Capstone: Strongly-Typed Financial Portfolio & Audit Engine',
        'programId': 'Mesin Manajemen Portofolio Multi-Aset dengan Validasi Kompilasi Penuh',
        'programEn': 'Multi-Asset Portfolio Engine with Immutable Auditing & Compile Verification',
        'levelNameId': 'Sistem Tipe Lanjut & Capstone Portofolio',
        'levelNameEn': 'Advanced Type Systems & Portfolio Capstone',
        'language': 'typescript',
        'code': """// ============================================================================
// CAPSTONE: MESIN ANALITIK PORTOFOLIO KEUANGAN DENGAN KESELAMATAN TIPE PENUH
// ============================================================================

type KelasAset = "SAHAM" | "OBLIGASI" | "KRIPTO" | "KAS";

interface PosisiAset {
  readonly id: string;
  readonly simbol: string;
  readonly kelas: KelasAset;
  jumlahUnit: number;
  hargaPerolehanRataRata: number;
  hargaPasarSekarang: number;
}

type AksiTransaksi = "BELI" | "JUAL" | "DIVIDEN";

interface RekorAuditTransaksi {
  readonly idTransaksi: string;
  readonly waktu: Date;
  readonly aksi: AksiTransaksi;
  readonly simbol: string;
  readonly nominalTotal: number;
}

class MesinPortofolio {
  private posisiMap: Map<string, PosisiAset> = new Map();
  private auditLog: RekorAuditTransaksi[] = [];

  tambahPosisi(aset: PosisiAset): void {
    this.posisiMap.set(aset.simbol, { ...aset });
    this.catatAudit({
      idTransaksi: `TX-${Date.now()}`,
      waktu: new Date(),
      aksi: "BELI",
      simbol: aset.simbol,
      nominalTotal: aset.jumlahUnit * aset.hargaPerolehanRataRata
    });
  }

  private catatAudit(rekor: RekorAuditTransaksi): void {
    this.auditLog.push(Object.freeze(rekor));
  }

  hitungKinerja(): { totalModal: number; nilaiPasarSekarang: number; labaRugiNominal: number; roiPersen: number } {
    let totalModal = 0;
    let nilaiPasarSekarang = 0;

    for (const p of this.posisiMap.values()) {
      totalModal += p.jumlahUnit * p.hargaPerolehanRataRata;
      nilaiPasarSekarang += p.jumlahUnit * p.hargaPasarSekarang;
    }

    const labaRugiNominal = nilaiPasarSekarang - totalModal;
    const roiPersen = totalModal > 0 ? (labaRugiNominal / totalModal) * 100 : 0;

    return { totalModal, nilaiPasarSekarang, labaRugiNominal, roiPersen };
  }

  dapatkanAuditTrail(): readonly RekorAuditTransaksi[] {
    return this.auditLog;
  }
}

// Inisialisasi Portofolio Produksi
const portofolio = new MesinPortofolio();

portofolio.tambahPosisi({
  id: "AST-01",
  simbol: "BBCA",
  kelas: "SAHAM",
  jumlahUnit: 5000,
  hargaPerolehanRataRata: 9200,
  hargaPasarSekarang: 10100
});

portofolio.tambahPosisi({
  id: "AST-02",
  simbol: "BTC",
  kelas: "KRIPTO",
  jumlahUnit: 0.15,
  hargaPerolehanRataRata: 950_000_000,
  hargaPasarSekarang: 1_050_000_000
});

const kinerja = portofolio.hitungKinerja();
console.log("=== LAPORAN KINERJA PORTOFOLIO ===");
console.log("Total Modal Investasi : Rp", kinerja.totalModal.toLocaleString("id-ID"));
console.log("Nilai Pasar Terkini   : Rp", kinerja.nilaiPasarSekarang.toLocaleString("id-ID"));
console.log("Laba / Rugi Bersih    : Rp", kinerja.labaRugiNominal.toLocaleString("id-ID"));
console.log("ROI (Return on Invest):", kinerja.roiPersen.toFixed(2), "%");
console.log("Total Riwayat Audit   :", portofolio.dapatkanAuditTrail().length, "transaksi");
""",
        'objectivesId': [
            'Mengintegrasikan seluruh konsep TypeScript dari level pemula hingga level mahir dalam satu sistem utuh',
            'Menerapkan immutability ketat pada entitas finansial menggunakan readonly dan Object.freeze',
            'Membangun audit trail transaksional yang tahan manipulasi dengan TypeScript compilation check',
            'Menghitung matriks finansial (ROI, Capital Gain, Unrealized PnL) dengan presisi matematis',
            'Menghasilkan kode produksi TypeScript yang bersih, modular, dan siap diintegrasikan ke backend',
        ],
        'objectivesEn': [
            'Synthesize all TypeScript concepts from fundamentals through advanced metaprogramming into a cohesive engine',
            'Enforce rigorous financial immutability using readonly modifiers and runtime Object.freeze',
            'Architect an immutable transactional audit ledger verified at compile time',
            'Compute critical portfolio metrics (ROI, Capital Gain, Unrealized PnL) with type precision',
            'Deliver clean, enterprise-ready TypeScript architecture ready for cloud deployment',
        ],
        'explanationId': """### Arsitektur Capstone Portofolio Keuangan
Proyek capstone ini mendemonstrasikan bagaimana TypeScript melindungi integritas data finansial bernilai tinggi:
1. **Immutability pada Riwayat Transaksi**: Rekor audit didefinisikan dengan `readonly RekorAuditTransaksi[]` dan disegel dengan `Object.freeze`. Tidak ada komponen lain yang bisa mengubah catatan sejarah transaksi masa lalu secara tidak sah.
2. **Discriminated Union & Tipe Terikat**: Kelas aset dibatasi secara ketat pada `"SAHAM" | "OBLIGASI" | "KRIPTO" | "KAS"`. Menolak masuknya instrumen yang tidak terdaftar.
3. **Pemisahan Antara State Aktif dan Audit Log**: State aset dapat dimutasi nilainya saat harga pasar berfluktuasi, namun riwayat perubahannya tercatat permanen di dalam append-only ledger.

### Transisi Menuju Frontend Frameworks
Dengan menguasai sistem tipe statis TypeScript hingga tahap ini, Anda kini memiliki fondasi terkuat untuk membangun aplikasi React, Next.js, Vue, atau backend Node.js/NestJS enterprise dengan standar industri tertinggi.""",
        'explanationEn': """### Portfolio Capstone Architecture
This capstone demonstrates how TypeScript secures mission-critical financial systems:
1. **Audit Ledger Immutability**: Historical audit records are typed as `readonly RekorAuditTransaksi[]` and sealed with `Object.freeze()`. Malicious or accidental retroactive mutations are rejected at compile and runtime.
2. **Discriminated Domain Bounds**: Asset classes are constrained strictly to `"SAHAM" | "OBLIGASI" | "KRIPTO" | "KAS"`, rejecting arbitrary unvalidated asset types.
3. **Segregation of Mutable Position and Append-Only Logs**: Market prices float dynamically while historical state mutations preserve provenance inside the append-only ledger.

### Next Step: Modern Framework Engineering
Mastering static compilation, generics, mapped types, and ambient augmentation positions you squarely at the senior engineering tier, primed for React, Next.js, Vue, and NestJS development.""",
        'beginnerId': """### Analogi: Brankas Bank Digital dengan Pembukuan Berlapis
Sistem portofolio ini seperti brankas bank modern:
1. **Posisi Aset** adalah rak penyimpanan fisik di mana nilai nominal bisa bertambah atau berkurang sesuai harga pasar emas dan valuta.
2. **Audit Trail** adalah kamera CCTV 24 jam dan buku besar akuntan bermeterai: setiap kali ada emas yang masuk atau keluar, tanggal, detik, dan paraf petugas dicatat dengan tinta permanen yang mustahil dihapus.""",
        'beginnerEn': """### Analogy: A High-Security Vault with Triple-Entry Ledgers
This portfolio engine functions like an institutional depository vault:
1. **Asset Positions** are secure shelving units where market values reflect real-time bullion and foreign reserve rates.
2. **The Audit Trail** is the tamper-proof security log and notarized ledger: every asset transfer permanently records timestamps, operator signatures, and valuations in indelible ink.""",
        'experimentsId': [
            'Coba ubah auditLog dari luar method dapatkanAuditTrail() dan perhatikan proteksi readonly.',
            'Tambahkan aset baru berupa OBLIGASI negara dengan bunga kupon tetap.',
            'Simulasikan penurunan harga pasar untuk melihat perhitungan kerugian (ROI minus).',
            'Tulis method baru untuk menghitung persentase alokasi masing-masing kelas aset terhadap total portofolio.',
        ],
        'experimentsEn': [
            'Attempt mutating auditLog outside dapatkanAuditTrail() to witness readonly compile errors.',
            'Add a new sovereign BOND position with fixed coupon interest yields.',
            'Simulate falling market valuations to observe negative PnL and drawdown ROI computations.',
            'Author an asset allocation breakdown method calculating the portfolio percentage per asset class.',
        ],
        'challengeId': 'Kembangkan MesinPortofolio dengan method `rebalancePortofolio(targetAlokasi: Record<KelasAset, number>)`: hitung berapa nominal unit yang harus dijual atau dibeli untuk mencapai target alokasi tersebut dengan type safety penuh.',
        'challengeEn': 'Expand MesinPortofolio with `rebalancePortofolio(targetAllocation: Record<KelasAset, number>)`: compute buy/sell unit deltas required to rebalance the portfolio safely.',
        'summaryId': 'Selamat! Kamu telah menyelesaikan seluruh kurikulum TypeScript dari dasar hingga mahir dengan membangun Mesin Portofolio Keuangan yang kuat dan tipe-ketat.',
        'summaryEn': 'Congratulations! You have completed the comprehensive TypeScript curriculum, culminating in an enterprise-grade, strongly-typed Financial Portfolio Analytics Engine.',
    },
]

def get_track():
    return {
        'slug': 'typescript',
        'track_name': 'TypeScript',
        'levels': LEVELS,
        'modules': MODULES,
    }
