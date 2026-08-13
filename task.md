# Task Checklist

## ✅ Sudah Dikerjakan

- [x] **Hide ACTIVE TRACK card** di bottom sidebar (beserta divider-nya)
- [x] **Dukung button** → diarahkan ke https://widifirmaan.web.id (desktop + mobile)
- [x] **Konsistensi branding** — title tab (`Tryngo`), hero section, dan logo di sidebar atas konsisten `TRYNGO`; subtitle sidebar diseragamkan jadi "Playground Sidebar"
- [x] **Hapus element** `<span>Markup & DOM Standard</span>` di TrackCard
- [x] **Quiz jadi page** (bukan modal) — route `#/quiz/{slug}` / `#/quiz/sample`, dirender inline di area konten seperti CoursePage/IdeModal, dengan tombol back. Tombol "Kuis" di CoursePage juga mengarah ke halaman quiz
- [x] **Seragamkan expand/collapse submenu sidebar** — Materi / Quiz / Online IDE (desktop + mobile) semua pakai `max-h-[40vh] overflow-y-auto scrollbar-thin`, expand penuh tapi semua menu tetap kelihatan (scroll)

## 🔜 Berikutnya

- [x] Audit ulang semua playground secara detail
- [x] <span class="text-[9px] text-[#EEDBB2] uppercase tracking-widest font-bold">Playground Sidebar</span> sebaiknya di ganti tagline apa? → pakai heroTagline (bilingual)
- [x] hapus <p class="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium truncate mt-0.5">Eksplorasi modul interaktif web dev terlengkap.</p> dan besarkan <h2 class="font-extrabold text-sm sm:text-base leading-none">Bahasa &amp; Framework Pemrograman</h2> seukuran ikon
- [x] align ini <span class="bg-[#2E5B44] text-white text-[10px] font-black px-2 py-0.5 rounded-full">27 / 27</span>  agar sejajar dengan text kirinya
- [x] <p class="text-[10px] sm:text-xs leading-relaxed text-zinc-800 dark:text-zinc-300 font-medium min-h-0 overflow-hidden line-clamp-2 sm:line-clamp-3">Sintaks markup standar untuk membangun struktur dokumen web semantik, form validation, dan aksesibilitas.</p> buat align top, dan excerpt mingikuti tinggi card ya
- [x] button <button class="w-8 h-8 bg-white/80 dark:bg-zinc-700/80 hover:bg-white dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 rounded-xl flex items-center justify-center shadow-xs transition-transform hover:scale-110" title="Buka Playground"><svg data-prefix="fas" data-icon="code" class="svg-inline--fa fa-code w-3.5 h-3.5" role="img" viewBox="0 0 576 512" aria-hidden="true"><path fill="currentColor" d="M360.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm64.6 136.1c-12.5 12.5-12.5 32.8 0 45.3l73.4 73.4-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0zm-274.7 0c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 150.6 182.6c12.5-12.5 12.5-32.8 0-45.3z"></path></svg></button> masuk hke halaman ide, jangan modal dan tambahkan button ke quiz
- [x] highlight active di sidebar untuk quiz belum ada, samakan dengan materi dan ide