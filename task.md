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
- [ ] <span>Scroll Atas-Bawah</span> di mobile hapus saja
- [ ] <span class="bg-[#2E5B44] text-white text-[10px] font-black px-2 py-0.5 rounded-full self-center leading-none">27 / 27</span> di mobile hapus saja
- [ ] menu expanded humbergerbar di mobile panjangkan sampai bawah sesuai tinggi layar ketika expand materi, quiz, online ide
- [ ] <button class="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#2E5B44] text-white border border-[#2E5B44] shadow-xs hover:bg-[#234735] transition-all text-xs sm:text-sm font-bold shrink-0" title="Quiz all material"><svg data-prefix="fas" data-icon="clipboard-list" class="svg-inline--fa fa-clipboard-list w-3.5 h-3.5 sm:w-4 sm:h-4" role="img" viewBox="0 0 384 512" aria-hidden="true"><path fill="currentColor" d="M311.4 32l8.6 0c35.3 0 64 28.7 64 64l0 352c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l8.6 0C83.6 12.9 104.3 0 128 0L256 0c23.7 0 44.4 12.9 55.4 32zM248 112c13.3 0 24-10.7 24-24s-10.7-24-24-24L136 64c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0zM128 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm32 0c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0c-13.3 0-24 10.7-24 24zm0 128c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0c-13.3 0-24 10.7-24 24zM96 416a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"></path></svg><span class="hidden sm:inline">Quiz</span></button> tambahkan button ide disebelahnya, baik desktop maupun mobile