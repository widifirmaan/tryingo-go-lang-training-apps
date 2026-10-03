import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, '../public/diagrams');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const diagrams = {
  'box-model.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360" width="100%" height="100%">
  <rect width="600" height="360" rx="16" fill="#18181b" />
  <rect x="30" y="30" width="540" height="300" rx="12" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4" />
  <text x="50" y="60" fill="#f59e0b" font-family="system-ui, sans-serif" font-weight="700" font-size="14">MARGIN (Jarak Luar Elemen)</text>
  
  <rect x="70" y="80" width="460" height="210" rx="10" fill="#ef4444" fill-opacity="0.2" stroke="#ef4444" stroke-width="2" />
  <text x="90" y="110" fill="#ef4444" font-family="system-ui, sans-serif" font-weight="700" font-size="14">BORDER (Garis Batas / Bingkai)</text>
  
  <rect x="110" y="130" width="380" height="120" rx="8" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="2" stroke-dasharray="4" />
  <text x="130" y="160" fill="#10b981" font-family="system-ui, sans-serif" font-weight="700" font-size="14">PADDING (Bantalan Ruang Dalam)</text>
  
  <rect x="150" y="180" width="300" height="50" rx="6" fill="#3b82f6" fill-opacity="0.3" stroke="#3b82f6" stroke-width="2" />
  <text x="230" y="210" fill="#60a5fa" font-family="system-ui, sans-serif" font-weight="800" font-size="15">CONTENT (Teks &amp; Media)</text>
</svg>`,

  'dom-tree.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340" width="100%" height="100%">
  <rect width="600" height="340" rx="16" fill="#18181b" />
  <g fill="#27272a" stroke="#3f3f46" stroke-width="2">
    <rect x="225" y="25" width="150" height="40" rx="8" fill="#3b82f6" stroke="#60a5fa" />
    <rect x="225" y="95" width="150" height="40" rx="8" fill="#10b981" stroke="#34d399" />
    <rect x="80" y="175" width="140" height="40" rx="8" fill="#6366f1" stroke="#818cf8" />
    <rect x="380" y="175" width="140" height="40" rx="8" fill="#f59e0b" stroke="#fbbf24" />
    <rect x="300" y="255" width="110" height="40" rx="8" fill="#ec4899" stroke="#f472b6" />
    <rect x="440" y="255" width="110" height="40" rx="8" fill="#8b5cf6" stroke="#a78bfa" />
  </g>
  <path d="M300 65 v30 M300 135 L150 175 M300 135 L450 175 M450 215 L355 255 M450 215 L495 255" stroke="#71717a" stroke-width="2" />
  <g fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="13" text-anchor="middle">
    <text x="300" y="50">DOCUMENT</text>
    <text x="300" y="120">&lt;html&gt; (Root)</text>
    <text x="150" y="200">&lt;head&gt; (Metadata)</text>
    <text x="450" y="200">&lt;body&gt; (Tampilan)</text>
    <text x="355" y="280">&lt;h1&gt; Judul</text>
    <text x="495" y="280">&lt;p&gt; Paragraf</text>
  </g>
</svg>`,

  'flexbox-axis.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320" width="100%" height="100%">
  <rect width="600" height="320" rx="16" fill="#18181b" />
  <rect x="40" y="40" width="520" height="240" rx="12" fill="#27272a" stroke="#52525b" stroke-width="2" />
  <line x1="60" y1="70" x2="540" y2="70" stroke="#3b82f6" stroke-width="3" marker-end="url(#arr-blue)" />
  <text x="70" y="62" fill="#60a5fa" font-family="system-ui, sans-serif" font-weight="700" font-size="12">MAIN AXIS (Horizontal) ➔ justify-content</text>
  <line x1="60" y1="80" x2="60" y2="260" stroke="#10b981" stroke-width="3" />
  <text x="70" y="255" fill="#34d399" font-family="system-ui, sans-serif" font-weight="700" font-size="12">CROSS AXIS ➔ align-items</text>
  <g fill="#3b82f6" fill-opacity="0.2" stroke="#60a5fa" stroke-width="2" rx="8">
    <rect x="120" y="110" width="90" height="90" rx="8" />
    <rect x="250" y="110" width="90" height="90" rx="8" />
    <rect x="380" y="110" width="90" height="90" rx="8" />
  </g>
  <g fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="16" text-anchor="middle">
    <text x="165" y="160">Item 1</text>
    <text x="295" y="160">Item 2</text>
    <text x="425" y="160">Item 3</text>
  </g>
</svg>`,

  'js-event-loop.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320" width="100%" height="100%">
  <rect width="600" height="320" rx="16" fill="#18181b" />
  <g stroke-width="2">
    <rect x="40" y="40" width="150" height="180" rx="10" fill="#1e1e24" stroke="#ef4444" />
    <text x="115" y="70" fill="#f87171" font-family="system-ui, sans-serif" font-weight="800" font-size="14" text-anchor="middle">CALL STACK</text>
    <rect x="55" y="100" width="120" height="30" rx="4" fill="#ef4444" fill-opacity="0.3" stroke="#f87171" />
    <text x="115" y="120" fill="#ffffff" font-family="monospace" font-size="11" text-anchor="middle">fn3()</text>
    <rect x="55" y="135" width="120" height="30" rx="4" fill="#ef4444" fill-opacity="0.2" stroke="#f87171" />
    <text x="115" y="155" fill="#ffffff" font-family="monospace" font-size="11" text-anchor="middle">fn2()</text>
    <rect x="55" y="170" width="120" height="30" rx="4" fill="#ef4444" fill-opacity="0.1" stroke="#f87171" />
    <text x="115" y="190" fill="#ffffff" font-family="monospace" font-size="11" text-anchor="middle">main()</text>

    <rect x="410" y="40" width="150" height="120" rx="10" fill="#1e1e24" stroke="#3b82f6" />
    <text x="485" y="70" fill="#60a5fa" font-family="system-ui, sans-serif" font-weight="800" font-size="13" text-anchor="middle">WEB APIs</text>
    <text x="485" y="95" fill="#a1a1aa" font-family="monospace" font-size="11" text-anchor="middle">fetch() / setTimeout</text>
    <text x="485" y="115" fill="#a1a1aa" font-family="monospace" font-size="11" text-anchor="middle">DOM Events</text>

    <circle cx="300" cy="130" r="45" fill="#10b981" fill-opacity="0.1" stroke="#10b981" stroke-width="3" stroke-dasharray="6" />
    <text x="300" y="125" fill="#34d399" font-family="system-ui, sans-serif" font-weight="800" font-size="13" text-anchor="middle">EVENT</text>
    <text x="300" y="145" fill="#34d399" font-family="system-ui, sans-serif" font-weight="800" font-size="13" text-anchor="middle">LOOP ↻</text>

    <rect x="40" y="245" width="520" height="50" rx="8" fill="#1e1e24" stroke="#f59e0b" />
    <text x="55" y="275" fill="#fbbf24" font-family="system-ui, sans-serif" font-weight="700" font-size="13">TASK QUEUE:</text>
    <rect x="180" y="255" width="110" height="30" rx="4" fill="#f59e0b" fill-opacity="0.2" stroke="#fbbf24" />
    <text x="235" y="275" fill="#ffffff" font-family="monospace" font-size="11" text-anchor="middle">cb_fetch()</text>
    <rect x="300" y="255" width="110" height="30" rx="4" fill="#f59e0b" fill-opacity="0.2" stroke="#fbbf24" />
    <text x="355" y="275" fill="#ffffff" font-family="monospace" font-size="11" text-anchor="middle">cb_timer()</text>
  </g>
</svg>`,

  'react-data-flow.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" height="100%">
  <rect width="600" height="300" rx="16" fill="#18181b" />
  <rect x="200" y="30" width="200" height="60" rx="10" fill="#3b82f6" fill-opacity="0.2" stroke="#60a5fa" stroke-width="2" />
  <text x="300" y="55" fill="#60a5fa" font-family="system-ui, sans-serif" font-weight="800" font-size="15" text-anchor="middle">PARENT COMPONENT</text>
  <text x="300" y="75" fill="#93c5fd" font-family="monospace" font-size="12" text-anchor="middle">State: count = 1</text>

  <rect x="80" y="180" width="180" height="60" rx="10" fill="#10b981" fill-opacity="0.2" stroke="#34d399" stroke-width="2" />
  <text x="170" y="205" fill="#34d399" font-family="system-ui, sans-serif" font-weight="800" font-size="14" text-anchor="middle">Display Child</text>
  <text x="170" y="225" fill="#a7f3d0" font-family="monospace" font-size="11" text-anchor="middle">Reads props.count</text>

  <rect x="340" y="180" width="180" height="60" rx="10" fill="#f59e0b" fill-opacity="0.2" stroke="#fbbf24" stroke-width="2" />
  <text x="430" y="205" fill="#fbbf24" font-family="system-ui, sans-serif" font-weight="800" font-size="14" text-anchor="middle">Button Child</text>
  <text x="430" y="225" fill="#fde68a" font-family="monospace" font-size="11" text-anchor="middle">Triggers onIncrement()</text>

  <path d="M250 90 L170 180" stroke="#34d399" stroke-width="2" stroke-dasharray="4" />
  <text x="170" y="130" fill="#34d399" font-family="system-ui, sans-serif" font-weight="700" font-size="11">Props Turun ⬇</text>

  <path d="M430 180 L350 90" stroke="#f59e0b" stroke-width="2" />
  <text x="410" y="130" fill="#fbbf24" font-family="system-ui, sans-serif" font-weight="700" font-size="11">Event Naik ⬆</text>
</svg>`,

  'docker-layers.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320" width="100%" height="100%">
  <rect width="600" height="320" rx="16" fill="#18181b" />
  <rect x="80" y="40" width="440" height="50" rx="8" fill="#10b981" fill-opacity="0.3" stroke="#34d399" stroke-width="2" />
  <text x="100" y="70" fill="#34d399" font-family="system-ui, sans-serif" font-weight="800" font-size="14">CONTAINER WRITABLE LAYER (Read / Write Sementara)</text>

  <rect x="80" y="100" width="440" height="45" rx="8" fill="#3b82f6" fill-opacity="0.2" stroke="#60a5fa" stroke-width="2" />
  <text x="100" y="128" fill="#60a5fa" font-family="monospace" font-size="12">CMD ["node", "server.js"]  (Read Only)</text>

  <rect x="80" y="155" width="440" height="45" rx="8" fill="#3b82f6" fill-opacity="0.2" stroke="#60a5fa" stroke-width="2" />
  <text x="100" y="183" fill="#60a5fa" font-family="monospace" font-size="12">COPY . /app  (Read Only)</text>

  <rect x="80" y="210" width="440" height="45" rx="8" fill="#3b82f6" fill-opacity="0.2" stroke="#60a5fa" stroke-width="2" />
  <text x="100" y="238" fill="#60a5fa" font-family="monospace" font-size="12">RUN npm install --production  (Cached Layer)</text>

  <rect x="80" y="265" width="440" height="40" rx="8" fill="#8b5cf6" fill-opacity="0.3" stroke="#a78bfa" stroke-width="2" />
  <text x="100" y="290" fill="#c4b5fd" font-family="monospace" font-size="12">FROM node:20-alpine  (Base Image Layer)</text>
</svg>`,

  'goroutine-channel.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 280" width="100%" height="100%">
  <rect width="600" height="280" rx="16" fill="#18181b" />
  <rect x="50" y="90" width="160" height="90" rx="10" fill="#00ADD8" fill-opacity="0.2" stroke="#00ADD8" stroke-width="2" />
  <text x="130" y="130" fill="#00ADD8" font-family="system-ui, sans-serif" font-weight="800" font-size="14" text-anchor="middle">PRODUCER</text>
  <text x="130" y="155" fill="#ffffff" font-family="monospace" font-size="11" text-anchor="middle">go producer(ch)</text>

  <rect x="240" y="110" width="120" height="50" rx="6" fill="#27272a" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4" />
  <text x="300" y="135" fill="#fbbf24" font-family="monospace" font-weight="700" font-size="12" text-anchor="middle">chan int</text>
  <text x="300" y="150" fill="#a1a1aa" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">[ Data 42 ]</text>

  <rect x="390" y="90" width="160" height="90" rx="10" fill="#10b981" fill-opacity="0.2" stroke="#34d399" stroke-width="2" />
  <text x="470" y="130" fill="#34d399" font-family="system-ui, sans-serif" font-weight="800" font-size="14" text-anchor="middle">CONSUMER</text>
  <text x="470" y="155" fill="#ffffff" font-family="monospace" font-size="11" text-anchor="middle">val := &lt;-ch</text>

  <path d="M210 135 L240 135" stroke="#00ADD8" stroke-width="3" />
  <path d="M360 135 L390 135" stroke="#34d399" stroke-width="3" />
  <text x="300" y="60" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="13" text-anchor="middle">Komunikasi Thread Ringan (CSP Paradigm) tanpa Lock / Mutex</text>
</svg>`,

  'sql-joins.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" height="100%">
  <rect width="600" height="300" rx="16" fill="#18181b" />
  <circle cx="230" cy="150" r="100" fill="#3b82f6" fill-opacity="0.3" stroke="#60a5fa" stroke-width="2" />
  <circle cx="370" cy="150" r="100" fill="#ec4899" fill-opacity="0.3" stroke="#f472b6" stroke-width="2" />
  <path d="M300 70 A100 100 0 0 0 300 230 A100 100 0 0 0 300 70" fill="#10b981" fill-opacity="0.6" stroke="#34d399" stroke-width="2" />
  <text x="170" y="155" fill="#93c5fd" font-family="system-ui, sans-serif" font-weight="700" font-size="14" text-anchor="middle">Table A Only</text>
  <text x="300" y="155" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="800" font-size="14" text-anchor="middle">INNER JOIN</text>
  <text x="430" y="155" fill="#fbcfe8" font-family="system-ui, sans-serif" font-weight="700" font-size="14" text-anchor="middle">Table B Only</text>
  <text x="300" y="280" fill="#a1a1aa" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle">SELECT * FROM users u INNER JOIN orders o ON u.id = o.user_id</text>
</svg>`,

  'rest-vs-graphql.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" height="100%">
  <rect width="600" height="300" rx="16" fill="#18181b" />
  <rect x="40" y="40" width="240" height="220" rx="10" fill="#27272a" stroke="#ef4444" stroke-width="2" />
  <text x="160" y="70" fill="#f87171" font-family="system-ui, sans-serif" font-weight="800" font-size="15" text-anchor="middle">REST (Banyak Request)</text>
  <text x="60" y="110" fill="#a1a1aa" font-family="monospace" font-size="12">1. GET /users/1</text>
  <text x="60" y="140" fill="#a1a1aa" font-family="monospace" font-size="12">2. GET /users/1/orders</text>
  <text x="60" y="170" fill="#a1a1aa" font-family="monospace" font-size="12">3. GET /products/99</text>
  <text x="160" y="230" fill="#f87171" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle">⚠️ Over-fetching &amp; Waterfalls</text>

  <rect x="320" y="40" width="240" height="220" rx="10" fill="#27272a" stroke="#e11d48" stroke-width="2" />
  <text x="440" y="70" fill="#fb7185" font-family="system-ui, sans-serif" font-weight="800" font-size="15" text-anchor="middle">GraphQL (1 Request Pas)</text>
  <text x="340" y="110" fill="#34d399" font-family="monospace" font-size="12">POST /graphql</text>
  <text x="340" y="130" fill="#ffffff" font-family="monospace" font-size="11">query {</text>
  <text x="360" y="150" fill="#ffffff" font-family="monospace" font-size="11">  user(id: 1) { name }</text>
  <text x="360" y="170" fill="#ffffff" font-family="monospace" font-size="11">  orders { id total }</text>
  <text x="340" y="190" fill="#ffffff" font-family="monospace" font-size="11">}</text>
  <text x="440" y="230" fill="#34d399" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle">✅ Zero Over-fetching</text>
</svg>`,

  'rust-ownership.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 280" width="100%" height="100%">
  <rect width="600" height="280" rx="16" fill="#18181b" />
  <rect x="60" y="60" width="200" height="150" rx="10" fill="#dea584" fill-opacity="0.1" stroke="#dea584" stroke-width="2" />
  <text x="160" y="90" fill="#dea584" font-family="system-ui, sans-serif" font-weight="800" font-size="14" text-anchor="middle">STACK (Variabel s1)</text>
  <text x="80" y="125" fill="#ffffff" font-family="monospace" font-size="11">ptr ────────────┐</text>
  <text x="80" y="150" fill="#ffffff" font-family="monospace" font-size="11">len: 5          │</text>
  <text x="80" y="175" fill="#ffffff" font-family="monospace" font-size="11">capacity: 5     │</text>

  <rect x="340" y="60" width="200" height="150" rx="10" fill="#10b981" fill-opacity="0.1" stroke="#34d399" stroke-width="2" />
  <text x="440" y="90" fill="#34d399" font-family="system-ui, sans-serif" font-weight="800" font-size="14" text-anchor="middle">HEAP (Alokasi Memori)</text>
  <text x="360" y="130" fill="#34d399" font-family="monospace" font-size="12">Index [0, 1, 2, 3, 4]</text>
  <text x="360" y="160" fill="#ffffff" font-family="monospace" font-weight="700" font-size="13">"h" "e" "l" "l" "o"</text>

  <path d="M210 120 L340 120" stroke="#dea584" stroke-width="2" marker-end="url(#arr-rust)" />
  <text x="300" y="245" fill="#f87171" font-family="system-ui, sans-serif" font-weight="700" font-size="12" text-anchor="middle">Ketika let s2 = s1 dijalankan: Kepemilikan pindah (Move). s1 menjadi invalid!</text>
</svg>`,
};

for (const [name, svg] of Object.entries(diagrams)) {
  const filePath = path.join(outDir, name);
  fs.writeFileSync(filePath, svg.trim(), 'utf8');
  console.log(`Generated diagram: ${name}`);
}
console.log('All SVG diagrams generated successfully.');
