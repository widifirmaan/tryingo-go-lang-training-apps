import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes, faCheck, faXmark, faRotateRight, faPlay, faTrophy,
  faSpinner, faBookOpen, faChevronDown, faChevronUp, faClockRotateLeft,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { Language } from '../utils/translations';
import {
  loadQuizIndex, getTrackQuiz, flattenQuiz,
  FlatQuestion, QuizLevel, QuizQuestion, QuizIndex,
  loadBestScore, saveBestScore, loadProgress, saveProgress, clearProgress,
} from '../utils/quiz';

interface QuizModalProps {
  slug: string;
  trackName: string;
  lang: Language;
  initialLevel?: string;
  sample?: boolean;
  onClose: () => void;
}

type Phase = 'loading' | 'intro' | 'quiz' | 'result';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export const QuizModal: React.FC<QuizModalProps> = ({ slug, trackName, lang, initialLevel, sample, onClose }) => {
  const isId = lang === 'id';
  const [phase, setPhase] = useState<Phase>('loading');
  const [flat, setFlat] = useState<FlatQuestion[]>([]);
  const [error, setError] = useState(false);

  // Persistence scope: whole track by default, single level when filtered, "sample" for test quiz
  const scopeKey = useMemo(
    () => (sample ? 'sample' : initialLevel ? `${slug}.${initialLevel}` : slug),
    [sample, slug, initialLevel]
  );

  // Quiz run state
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [retryIndices, setRetryIndices] = useState<number[] | null>(null);
  const [showWrong, setShowWrong] = useState(false);

  const best = useMemo(() => loadBestScore(scopeKey, lang), [scopeKey, lang]);
  const savedProgress = useMemo(() => loadProgress(scopeKey, lang), [scopeKey, lang]);

  const activeFlat = useMemo(
    () => (retryIndices ? retryIndices.map((i) => flat[i]) : flat),
    [retryIndices, flat]
  );

  const total = activeFlat.length;
  const current: FlatQuestion | undefined = activeFlat[idx];
  const isLast = idx >= total - 1;

  useEffect(() => {
    let mounted = true;
    loadQuizIndex()
      .then((index) => {
        if (!mounted) return;
        let f = sample ? buildSampleFlat(index, lang) : flattenQuiz(getTrackQuiz(index, slug, lang));
        if (!sample) {
          const levels = getTrackQuiz(index, slug, lang);
          const levelIndex = initialLevel ? levels.findIndex((l) => l.level === initialLevel) : -1;
          if (levelIndex >= 0) f = f.filter((item) => item.levelIndex === levelIndex);
        }
        if (!f.length) {
          setError(true);
          setPhase('intro');
          return;
        }
        setFlat(f);
        setPhase('intro');
      })
      .catch(() => {
        if (!mounted) return;
        setError(true);
        setPhase('intro');
      });
    return () => {
      mounted = false;
    };
  }, [slug, lang]);

  const begin = useCallback((startAnswers?: number[], startIdx?: number) => {
    setRetryIndices(null);
    setAnswers(startAnswers || new Array(flat.length).fill(-1));
    setIdx(startIdx || 0);
    setSelected(null);
    setShowWrong(false);
    setPhase('quiz');
  }, [flat.length]);

  const beginRetryWrong = useCallback(() => {
    const wrong = activeFlat
      .map((f, i) => ({ i, f }))
      .filter(({ f, i }) => answers[i] !== f.q.answer)
      .map(({ i }) => (retryIndices ? retryIndices[i] : i));
    if (!wrong.length) return;
    setRetryIndices(wrong);
    setAnswers(new Array(wrong.length).fill(-1));
    setIdx(0);
    setSelected(null);
    setShowWrong(false);
    setPhase('quiz');
  }, [activeFlat, answers, retryIndices]);

  const selectAnswer = (optIdx: number) => {
    if (selected !== null || !current) return;
    setSelected(optIdx);
    const next = [...answers];
    next[idx] = optIdx;
    setAnswers(next);
  };

  const goNext = () => {
    if (selected === null) return;
    if (isLast) {
      // Finished the run
      const score = answers.reduce(
        (acc, a, i) => acc + (a === activeFlat[i].q.answer ? 1 : 0),
        0
      );
      if (!retryIndices) {
        saveBestScore(scopeKey, lang, score, total);
        clearProgress(scopeKey, lang);
      }
      setPhase('result');
    } else {
      const nextIdx = idx + 1;
      setIdx(nextIdx);
      setSelected(null);
      if (!retryIndices) {
        saveProgress(scopeKey, lang, { answers, idx: nextIdx, startedAt: Date.now(), total });
      }
    }
  };

  const score = useMemo(
    () => answers.reduce((acc, a, i) => acc + (a === activeFlat[i]?.q.answer ? 1 : 0), 0),
    [answers, activeFlat]
  );

  const handleClose = () => {
    if (phase === 'quiz' && !retryIndices) {
      saveProgress(scopeKey, lang, { answers, idx, startedAt: Date.now(), total });
    }
    onClose();
  };

  // Keyboard shortcuts while answering
  useEffect(() => {
    if (phase !== 'quiz' || !current) return;
    const onKey = (e: KeyboardEvent) => {
      if (selected === null) {
        const n = parseInt(e.key, 10);
        if (e.key >= '1' && e.key <= '9' && n >= 1 && n <= current.q.options.length) {
          selectAnswer(n - 1);
        } else if (e.key >= 'a' && e.key <= 'h') {
          const li = e.key.charCodeAt(0) - 97;
          if (li < current.q.options.length) selectAnswer(li);
        }
      } else if (e.key === 'Enter') {
        goNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, current, selected, idx, answers]);

  const levelBreakdown = useMemo(() => {
    const map = new Map<string, { name: string; correct: number; total: number }>();
    activeFlat.forEach((f, i) => {
      const key = f.levelName;
      const entry = map.get(key) || { name: key, correct: 0, total: 0 };
      entry.total += 1;
      if (answers[i] === f.q.answer) entry.correct += 1;
      map.set(key, entry);
    });
    return [...map.values()];
  }, [activeFlat, answers]);

  const wrongList = useMemo(
    () => activeFlat.map((f, i) => ({ f, i, user: answers[i] })).filter(({ f, i }) => answers[i] !== f.q.answer),
    [activeFlat, answers]
  );

  const pct = total ? Math.round((score / total) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="relative z-10 w-full h-full bg-white dark:bg-[#1e1e1e] shadow-2xl flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={isId ? 'Kuis' : 'Quiz'}
      >
        {phase === 'loading' && (
          <div className="flex-1 flex items-center justify-center py-24 text-zinc-400">
            <div className="flex flex-col items-center gap-3">
              <FontAwesomeIcon icon={faSpinner} spin className="w-8 h-8" />
              <span className="text-xs font-medium">{isId ? 'Memuat soal kuis...' : 'Loading quiz questions...'}</span>
            </div>
          </div>
        )}

        {phase === 'intro' && (
          <IntroScreen
            trackName={trackName}
            lang={lang}
            isId={isId}
            error={error}
            initialLevel={initialLevel}
            sample={sample}
            total={flat.length}
            best={best}
            savedProgress={savedProgress}
            onBegin={() => begin()}
            onResume={() => savedProgress && begin(savedProgress.answers, savedProgress.idx)}
            onResetProgress={() => {
              clearProgress(scopeKey, lang);
              window.location.reload();
            }}
            onClose={handleClose}
          />
        )}

        {phase === 'quiz' && current && (
          <QuizScreen
            isId={isId}
            current={current}
            idx={idx}
            total={total}
            selected={selected}
            answers={answers}
            onSelect={selectAnswer}
            onNext={goNext}
            isLast={isLast}
            onClose={handleClose}
          />
        )}

        {phase === 'result' && (
          <ResultScreen
            isId={isId}
            score={score}
            total={total}
            pct={pct}
            levelBreakdown={levelBreakdown}
            wrongList={wrongList}
            showWrong={showWrong}
            setShowWrong={setShowWrong}
            onRetryWrong={beginRetryWrong}
            onRetryAll={() => begin()}
            onClose={onClose}
          />
        )}
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

function IntroScreen({
  trackName, isId, error, initialLevel, sample, total, best, savedProgress,
  onBegin, onResume, onResetProgress, onClose,
}: {
  trackName: string; isId: boolean; error: boolean; initialLevel?: string; sample?: boolean; total: number;
  best: { score: number; total: number; date: number } | null;
  savedProgress: { answers: number[]; idx: number } | null;
  onBegin: () => void; onResume: () => void; onResetProgress: () => void; onClose: () => void;
}) {
  const canResume = savedProgress && savedProgress.answers.length === total && savedProgress.idx < total;
  const completed = savedProgress && savedProgress.idx >= total;
  const [confirmReset, setConfirmReset] = useState(false);
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#2E5B44] text-white flex items-center justify-center shadow-xs">
            <FontAwesomeIcon icon={faBookOpen} className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-sm sm:text-base leading-none">{trackName}</h2>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium mt-1">{isId ? 'Kuis Materi' : 'Material Quiz'}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors" title={isId ? 'Tutup' : 'Close'}>
          <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5">
        {error ? (
          <div className="text-center py-12 text-zinc-500 text-sm">{isId ? 'Soal kuis belum tersedia untuk modul ini.' : 'Quiz questions are not available for this module yet.'}</div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              <StatCard icon={faBookOpen} label={isId ? 'Total Soal' : 'Total Questions'} value={String(total)} />
              <StatCard
                icon={faTrophy}
                label={isId ? 'Skor Terbaik' : 'Best Score'}
                value={best ? `${best.score}/${best.total} (${Math.round((best.score / best.total) * 100)}%)` : '—'}
              />
            </div>

            {canResume && (
              <div className="mb-4 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-2">
                <FontAwesomeIcon icon={faClockRotateLeft} className="w-4 h-4 shrink-0" />
                <span>
                  {isId
                    ? `Kuis belum selesai — terakhir di soal ${savedProgress.idx + 1} dari ${total}.`
                    : `Unfinished quiz — left at question ${savedProgress.idx + 1} of ${total}.`}
                </span>
              </div>
            )}

            <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400 mb-4">
              {sample
                ? (isId
                  ? 'Kuis uji coba — beberapa contoh soal dari materi Python, JavaScript, dan Go untuk mengetes fitur kuis dengan cepat.'
                  : 'Test quiz — a few sample questions from Python, JavaScript, and Go to quickly try the quiz feature.')
                : initialLevel
                  ? (isId
                    ? `Kuis mencakup materi level ${initialLevel} pada ${trackName}. Jumlah soal tiap minggu menyesuaikan isi materinya — minggu dengan lebih banyak konsep punya lebih banyak soal.`
                    : `This quiz covers the ${initialLevel} level of ${trackName}. Question count per week scales with the material — weeks with more concepts have more questions.`)
                  : (isId
                    ? `Kuis mencakup seluruh materi ${trackName}, dari level Pemula sampai Profesional. Jumlah soal tiap minggu menyesuaikan isi materinya — minggu dengan lebih banyak konsep punya lebih banyak soal.`
                    : `This quiz covers all ${trackName} material, from Beginner to Professional. Question count per week scales with the material — weeks with more concepts have more questions.`)}
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={canResume ? onResume : onBegin}
                className="w-full flex items-center justify-center gap-2 bg-[#2E5B44] hover:bg-[#234735] text-white text-sm font-bold py-3 rounded-2xl shadow-sm hover:shadow transition-all active:scale-[0.99]"
              >
                <FontAwesomeIcon icon={canResume ? faClockRotateLeft : faPlay} className="w-4 h-4" />
                {canResume ? (isId ? 'Lanjut Kuis' : 'Continue Quiz') : (isId ? 'Mulai Kuis' : 'Start Quiz')}
              </button>

              {canResume && !completed && (
                <button
                  onClick={onBegin}
                  className="w-full flex items-center justify-center gap-2 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-bold py-2.5 rounded-2xl transition-all"
                >
                  <FontAwesomeIcon icon={faRotateRight} className="w-3.5 h-3.5" />
                  {isId ? 'Mulai Ulang dari Awal' : 'Restart from Scratch'}
                </button>
              )}

              {canResume && (
                <button
                  onClick={() => setConfirmReset(true)}
                  className="w-full text-center text-[11px] text-zinc-400 hover:text-red-500 py-1 transition-colors"
                >
                  {isId ? 'Hapus progres kuis' : 'Clear quiz progress'}
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {confirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmReset(false)} />
          <div className="relative z-10 w-full max-w-sm rounded-3xl bg-white dark:bg-[#262626] p-5 shadow-2xl border border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-950/50 text-red-500 flex items-center justify-center shrink-0">
                <FontAwesomeIcon icon={faTriangleExclamation} className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-sm">{isId ? 'Hapus Progres?' : 'Clear Progress?'}</h3>
            </div>
            <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400 mb-4">
              {isId
                ? 'Progres kuis yang belum selesai akan dihapus permanen dari perangkat ini. Skor terbaik tidak terpengaruh.'
                : 'Your unfinished quiz progress will be permanently deleted on this device. Best score is unaffected.'}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmReset(false)}
                className="flex-1 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-bold transition-colors"
              >
                {isId ? 'Batal' : 'Cancel'}
              </button>
              <button
                onClick={() => { onResetProgress(); setConfirmReset(false); }}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-colors"
              >
                {isId ? 'Hapus' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/70">
      <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 dark:text-zinc-400 font-medium mb-1">
        <FontAwesomeIcon icon={icon} className="w-3 h-3" />
        <span>{label}</span>
      </div>
      <div className="text-sm font-extrabold text-zinc-800 dark:text-zinc-100 truncate">{value}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function QuizScreen({
  isId, current, idx, total, selected, answers, onSelect, onNext, isLast, onClose,
}: {
  isId: boolean; current: FlatQuestion; idx: number; total: number;
  selected: number | null; answers: number[];
  onSelect: (i: number) => void; onNext: () => void; isLast: boolean; onClose: () => void;
}) {
  const q: QuizQuestion = current.q;
  const answeredCount = answers.filter((a) => a >= 0).length;
  const pct = total ? (answeredCount / total) * 100 : 0;
  const isMcq = q.type === 'mcq';

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="px-5 sm:px-6 py-3.5 border-b border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <span className="text-[10px] sm:text-xs font-bold text-zinc-600 dark:text-zinc-300">
            {isId ? 'Soal' : 'Question'} {idx + 1} <span className="text-zinc-400">/ {total}</span>
          </span>
          <span className="text-[10px] text-zinc-400 hidden sm:inline">
            {isId ? 'Terjawab' : 'Answered'}: {answeredCount}/{total}
          </span>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors" title={isId ? 'Tutup' : 'Close'}>
            <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
          </button>
        </div>
        <div className="h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
          <div className="h-full bg-[#2E5B44] transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5">
        {/* Topic heading */}
        <h2 className="text-base sm:text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-3 leading-snug">
          {current.topic}
        </h2>

        {/* Question */}
        <h3 className="text-sm sm:text-[15px] font-semibold text-zinc-700 dark:text-zinc-200 leading-relaxed mb-3">
          {q.q}
        </h3>

        {q.context && (
          <div className="mb-4 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-700/70 text-[11px] sm:text-xs text-zinc-700 dark:text-zinc-300 font-mono leading-relaxed whitespace-pre-wrap break-words">
            {q.context}
          </div>
        )}

        {/* Options */}
        <div className={isMcq ? 'space-y-2' : 'grid grid-cols-2 gap-2'}>
          {q.options.map((opt, i) => {
            const isCorrect = i === q.answer;
            const isChosen = i === selected;
            const showCorrect = selected !== null && isCorrect;
            const showWrong = selected !== null && isChosen && !isCorrect;
            return (
              <button
                key={i}
                disabled={selected !== null}
                onClick={() => onSelect(i)}
                className={`w-full text-left px-3.5 py-3 rounded-2xl border text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-2.5 ${
                  showCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                    : showWrong
                      ? 'bg-red-50 dark:bg-red-950/40 border-red-500 text-red-600 dark:text-red-300'
                      : selected !== null
                        ? 'bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700 text-zinc-400 dark:text-zinc-500'
                        : 'bg-white dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:border-[#2E5B44]/50 hover:bg-[#2E5B44]/5 active:scale-[0.99]'
                }`}
              >
                <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black shrink-0 ${
                  showCorrect
                    ? 'bg-emerald-500 text-white'
                    : showWrong
                      ? 'bg-red-500 text-white'
                      : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
                }`}>
                  {isMcq ? LETTERS[i] : (i === 0 ? '✓' : '✕')}
                </span>
                <span className="flex-1">{opt}</span>
                {showCorrect && <FontAwesomeIcon icon={faCheck} className="w-3.5 h-3.5 shrink-0" />}
                {showWrong && <FontAwesomeIcon icon={faXmark} className="w-3.5 h-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {selected !== null && (
          <div className={`mt-4 p-3 rounded-2xl text-[11px] sm:text-xs leading-relaxed flex items-start gap-2 ${
            selected === q.answer
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60'
              : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/60'
          }`}>
            <FontAwesomeIcon icon={selected === q.answer ? faCheck : faXmark} className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              {selected === q.answer
                ? (isId ? 'Benar! ' : 'Correct! ')
                : (isId ? `Salah. Jawaban yang benar: "${q.options[q.answer]}". ` : `Wrong. Correct answer: "${q.options[q.answer]}". `)}
              {q.type === 'tf' && isId ? 'Baca ulang pernyataan dan bandingkan dengan konsepnya.' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 sm:px-6 py-3.5 border-t border-zinc-200 dark:border-zinc-700 flex items-center justify-between gap-3">
        <span className="text-[9px] text-zinc-400 hidden sm:inline">
          {isId ? 'Pilih jawaban, lalu tekan Lanjut. (1-4 / Enter)' : 'Pick an answer, then press Next. (1-4 / Enter)'}
        </span>
        <button
          onClick={onNext}
          disabled={selected === null}
          className="ml-auto flex items-center gap-2 bg-[#2E5B44] hover:bg-[#234735] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all active:scale-[0.98]"
        >
          {isLast ? (isId ? 'Lihat Hasil' : 'See Result') : (isId ? 'Lanjut' : 'Next')}
          <FontAwesomeIcon icon={faRotateRight} className={`w-3.5 h-3.5 ${isLast ? '' : 'rotate-90'}`} />
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function ResultScreen({
  isId, score, total, pct, levelBreakdown, wrongList, showWrong, setShowWrong,
  onRetryWrong, onRetryAll, onClose,
}: {
  isId: boolean; score: number; total: number; pct: number;
  levelBreakdown: { name: string; correct: number; total: number }[];
  wrongList: { f: FlatQuestion; i: number; user: number }[];
  showWrong: boolean; setShowWrong: (b: boolean) => void;
  onRetryWrong: () => void; onRetryAll: () => void; onClose: () => void;
}) {
  const msg = isId
    ? pct === 100 ? 'Sempurna! Kamu menguasai seluruh materi.'
      : pct >= 80 ? 'Sangat bagus! Tingkatkan lagi ke sempurna.'
      : pct >= 60 ? 'Bagus! Pelajari lagi bagian yang salah.'
      : pct >= 40 ? 'Lumayan. Baca ulang materi lalu coba lagi.'
      : 'Jangan menyerah — baca kembali materi dan ulangi kuisnya.'
    : pct === 100 ? 'Perfect! You mastered the entire material.'
      : pct >= 80 ? 'Great job! Push a little more for perfect.'
      : pct >= 60 ? 'Good! Review the parts you got wrong.'
      : pct >= 40 ? 'Not bad. Reread the material and try again.'
      : 'Don\'t give up — review the material and retry the quiz.';

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 sm:px-6 py-4 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
        <h2 className="font-extrabold text-sm sm:text-base">{isId ? 'Hasil Kuis' : 'Quiz Result'}</h2>
        <button onClick={onClose} className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors" title={isId ? 'Tutup' : 'Close'}>
          <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5">
        <div className="flex flex-col items-center mb-5">
          <div className="relative w-28 h-28 rounded-full flex items-center justify-center mb-3"
            style={{ background: `conic-gradient(#2E5B44 ${pct}%, rgba(0,0,0,0.08) ${pct}%)` }}>
            <div className="absolute inset-2 rounded-full bg-white dark:bg-[#1e1e1e] flex items-center justify-center">
              <span className="text-2xl font-black text-[#2E5B44]">{pct}%</span>
            </div>
          </div>
          <div className="text-sm font-bold">{score} / {total} {isId ? 'benar' : 'correct'}</div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 text-center mt-1 max-w-xs leading-relaxed">{msg}</p>
        </div>

        {/* Per-level breakdown */}
        <div className="mb-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
            {isId ? 'Rincian per Level' : 'Breakdown by Level'}
          </div>
          <div className="space-y-2">
            {levelBreakdown.map((lv) => (
              <div key={lv.name} className="p-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/70">
                <div className="flex items-center justify-between text-[10px] font-semibold mb-1.5">
                  <span className="text-zinc-600 dark:text-zinc-300">{lv.name}</span>
                  <span className="text-zinc-500 dark:text-zinc-400">{lv.correct}/{lv.total}</span>
                </div>
                <div className="h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-[#2E5B44] transition-all duration-500" style={{ width: `${lv.total ? (lv.correct / lv.total) * 100 : 0}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wrong answers */}
        {wrongList.length > 0 && (
          <div className="mb-4">
            <button
              onClick={() => setShowWrong(!showWrong)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 text-[11px] font-bold text-red-600 dark:text-red-300"
            >
              <span>{isId ? `Soal Salah (${wrongList.length})` : `Wrong Answers (${wrongList.length})`}</span>
              <FontAwesomeIcon icon={showWrong ? faChevronUp : faChevronDown} className="w-3.5 h-3.5" />
            </button>
            {showWrong && (
              <div className="mt-2 space-y-2">
                {wrongList.map(({ f, i, user }) => (
                  <div key={i} className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/70">
                    <div className="text-[9px] text-zinc-400 mb-1">
                      {isId ? 'Level' : 'Level'} {f.levelName} · {isId ? 'Minggu' : 'Week'} {f.week}
                    </div>
                    <div className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-200 mb-1.5">{f.q.q}</div>
                    {f.q.context && <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono mb-1.5 whitespace-pre-wrap">{f.q.context}</div>}
                    <div className="text-[10px]">
                      <span className="text-red-500">{isId ? 'Jawabanmu:' : 'Your answer:'} {answersToLabel(user, f.q)}</span>
                      <span className="mx-1.5 text-zinc-400">·</span>
                      <span className="text-emerald-600 dark:text-emerald-400">{isId ? 'Benar:' : 'Correct:'} {f.q.options[f.q.answer]}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-2">
          {wrongList.length > 0 && (
            <button
              onClick={onRetryWrong}
              className="w-full flex items-center justify-center gap-2 bg-[#2E5B44] hover:bg-[#234735] text-white text-xs font-bold py-3 rounded-2xl transition-all active:scale-[0.99]"
            >
              <FontAwesomeIcon icon={faRotateRight} className="w-3.5 h-3.5" />
              {isId ? `Ulangi Soal yang Salah (${wrongList.length})` : `Retry Wrong Questions (${wrongList.length})`}
            </button>
          )}
          <button
            onClick={onRetryAll}
            className="w-full flex items-center justify-center gap-2 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-bold py-3 rounded-2xl transition-all"
          >
            <FontAwesomeIcon icon={faRotateRight} className="w-3.5 h-3.5" />
            {isId ? 'Ulangi Semua Soal' : 'Retry All Questions'}
          </button>
          <button
            onClick={onClose}
            className="w-full text-center text-[11px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 py-1 transition-colors"
          >
            {isId ? 'Tutup Kuis' : 'Close Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
}

function answersToLabel(idx: number, q: QuizQuestion): string {
  if (idx < 0 || !q.options[idx]) return '—';
  return q.options[idx];
}

// Build a short cross-track sample quiz (used by the "Test Quiz" sidebar item).
// Picks the first question of the first week of each level from a few tracks.
const SAMPLE_TRACKS = ['python', 'javascript', 'golang'];
function buildSampleFlat(index: QuizIndex, lang: Language): FlatQuestion[] {
  const picked: FlatQuestion[] = [];
  for (const slug of SAMPLE_TRACKS) {
    const levels = index.tracks?.[slug]?.[lang] || [];
    if (!levels.length) continue;
    const lv = levels[0];
    const wk = lv.weeks[0];
    const q = wk?.questions?.[0];
    if (q) picked.push({ levelIndex: 0, levelName: lv.levelName, week: wk.week, topic: wk.topic, q });
  }
  return picked;
}
