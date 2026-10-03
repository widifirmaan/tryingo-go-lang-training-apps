import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPaperPlane, faLightbulb, faBug, faBolt, faKey } from '@fortawesome/free-solid-svg-icons';
import { Sparkles } from 'lucide-react';
import { Language } from '../utils/translations';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AiMentorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  trackName: string;
  topicTitle: string;
  currentCode: string;
  lang: Language;
}

export const AiMentorDrawer: React.FC<AiMentorDrawerProps> = ({
  isOpen,
  onClose,
  trackName,
  topicTitle,
  currentCode,
  lang
}) => {
  const isId = lang === 'id';
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: isId
        ? `Halo! Saya AI Mentor Tryngo untuk materi **${topicTitle}** (${trackName}). Ada bagian kode yang membingungkan atau ingin kamu diskusikan?`
        : `Hello! I am your Tryngo AI Mentor for **${topicTitle}** (${trackName}). Is there any code snippet you'd like me to explain or debug?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    try {
      return localStorage.getItem('tryngo-gemini-key') || '';
    } catch {
      return '';
    }
  });
  const [showKeyInput, setShowKeyInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSaveApiKey = (key: string) => {
    setApiKey(key.trim());
    try {
      localStorage.setItem('tryngo-gemini-key', key.trim());
    } catch {}
    setShowKeyInput(false);
  };

  const generateLocalAnswer = (prompt: string): string => {
    const p = prompt.toLowerCase();
    if (p.includes('jelaskan') || p.includes('explain')) {
      return isId
        ? `Berikut ringkasan logika kode **${topicTitle}**:\n\n1. **Inisialisasi**: Menyiapkan struktur data dan tipe dasar yang dibutuhkan.\n2. **Logika Inti**: Menjalankan alur proses secara terstruktur dengan penanganan kondisi dan error eksplisit.\n3. **Eksekusi & Output**: Mengembalikan hasil yang teruji ke layar atau pemanggil fungsi.\n\n*Tips: Cobalah ubah parameter input di playground untuk melihat bagaimana perilakunya berubah!*`
        : `Here is the logical breakdown of **${topicTitle}**:\n\n1. **Initialization**: Configures required data types and structures.\n2. **Core Logic**: Executes step-by-step algorithms with explicit edge-case handling.\n3. **Return/Output**: Surfaces structured results back to the caller.\n\n*Pro-tip: Try modifying values in the playground to observe state changes!*`;
    }
    if (p.includes('bug') || p.includes('error')) {
      return isId
        ? `**Pengecekan Potensi Bug pada ${topicTitle}**:\n- Pastikan tipe data input sudah sesuai dan variabel tidak nil/null/undefined sebelum diakses.\n- Cek batas perulangan (loop boundary / off-by-one error).\n- Pastikan error handling tidak diabaikan (handle error secara eksplisit).`
        : `**Bug Diagnosis for ${topicTitle}**:\n- Ensure inputs match expected types and objects are non-null before member access.\n- Check boundary edge cases in loops (off-by-one errors).\n- Always handle errors explicitly rather than suppressing them.`;
    }
    if (p.includes('optimasi') || p.includes('optimi')) {
      return isId
        ? `**Tips Optimasi ${trackName}**:\n- Minimalkan alokasi memori berlebih di dalam loop.\n- Gunakan struktur data yang tepat untuk kompleksitas waktu pencarian O(1) atau O(log n).\n- Manfaatkan fitur bahasa modern (konkurensi terstruktur / immutable patterns) untuk mencegah race condition.`
        : `**Optimization Tips for ${trackName}**:\n- Avoid redundant heap memory allocations inside hot loops.\n- Pick indexed data structures with O(1) or O(log n) lookup speeds.\n- Leverage modern language idioms like structured concurrency or immutability.`;
    }
    return isId
      ? `Pertanyaan yang bagus tentang **${topicTitle}**! Dalam implementasi industri pada ${trackName}, konsep ini biasa digunakan untuk memisahkan tanggung jawab (Separation of Concerns) dan memastikan performa tetap stabil saat skala pengguna bertambah.`
      : `Great question regarding **${topicTitle}**! In industry-grade ${trackName} applications, this pattern is essential for separation of concerns and maintaining low latency under high load.`;
  };

  const handleSend = async (customPrompt?: string) => {
    const text = customPrompt || input.trim();
    if (!text || isLoading) return;

    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      if (apiKey) {
        // Use Google GenAI
        const { GoogleGenAI } = await import('@google/genai');
        const ai = new GoogleGenAI({ apiKey });
        const systemInstruction = `You are Tryngo AI Mentor, an expert programming tutor helping a developer learn ${trackName}. Current lesson: ${topicTitle}. Here is the lesson code:\n\`\`\`\n${currentCode.slice(0, 2000)}\n\`\`\`\nAnswer in ${isId ? 'Indonesian' : 'English'}, keep answers concise, practical, with clear code snippets.`;
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `${systemInstruction}\n\nUser Question: ${text}`,
        });

        const reply = response.text || (isId ? 'Maaf, tidak ada balasan.' : 'No response.');
        setMessages([...newMessages, { role: 'assistant', content: reply }]);
      } else {
        // Friendly smart local mentor response
        await new Promise((r) => setTimeout(r, 600));
        const localReply = generateLocalAnswer(text);
        setMessages([...newMessages, { role: 'assistant', content: localReply }]);
      }
    } catch (err: any) {
      console.warn('AI error, using fallback:', err);
      const fallback = generateLocalAnswer(text);
      setMessages([...newMessages, { role: 'assistant', content: fallback }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 md:w-[420px] bg-white dark:bg-zinc-900 shadow-2xl border-l border-zinc-200 dark:border-zinc-800 flex flex-col">
      {/* Drawer Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-[#2E5B44]/5 dark:bg-emerald-950/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#2E5B44] text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-xs sm:text-sm text-zinc-900 dark:text-white leading-tight">
              Tryngo AI Mentor
            </h3>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium truncate max-w-[200px]">
              {trackName} • {topicTitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowKeyInput(!showKeyInput)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-xs transition-colors"
            title={isId ? 'Atur Gemini API Key' : 'Configure Gemini API Key'}
          >
            <FontAwesomeIcon icon={faKey} />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-xs transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>

      {/* Optional Gemini API Key Drawer Configuration */}
      {showKeyInput && (
        <div className="p-3 bg-zinc-100 dark:bg-zinc-800/80 border-b border-zinc-200 dark:border-zinc-700 text-xs">
          <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
            Google Gemini API Key (Opsional / Optional)
          </label>
          <div className="flex gap-2">
            <input
              type="password"
              defaultValue={apiKey}
              placeholder="AIzaSy..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveApiKey((e.target as HTMLInputElement).value);
              }}
              className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-hidden"
            />
            <button
              onClick={(e) => {
                const inputEl = (e.currentTarget.previousSibling as HTMLInputElement);
                handleSaveApiKey(inputEl.value);
              }}
              className="px-3 py-1 bg-[#2E5B44] text-white rounded-lg font-bold text-xs"
            >
              Simpan
            </button>
          </div>
          <span className="block text-[9px] text-zinc-500 mt-1">
            {isId
              ? 'Jika dikosongkan, AI Mentor akan tetap bekerja dengan mode ringkasan pintar lokal.'
              : 'If left empty, AI Mentor operates in local smart pedagogical mode.'}
          </span>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-[#2E5B44] text-white rounded-tr-xs'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/60 rounded-tl-xs'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl rounded-tl-xs px-3.5 py-2.5 text-zinc-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E5B44] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E5B44] animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E5B44] animate-bounce [animation-delay:0.4s]" />
              <span className="text-[10px] ml-1">{isId ? 'Sedang menganalisis...' : 'Analyzing...'}</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-3 py-2 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        <button
          onClick={() => handleSend(isId ? 'Jelaskan alur kode program ini langkah demi langkah.' : 'Explain this program code step by step.')}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] font-bold text-zinc-700 dark:text-zinc-300 hover:border-[#2E5B44] transition-colors shrink-0"
        >
          <FontAwesomeIcon icon={faLightbulb} className="text-amber-500 w-2.5 h-2.5" />
          <span>{isId ? 'Jelaskan Kode' : 'Explain Code'}</span>
        </button>
        <button
          onClick={() => handleSend(isId ? 'Apakah ada potensi bug atau edge-case pada kode ini?' : 'Are there any potential bugs or edge cases in this code?')}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] font-bold text-zinc-700 dark:text-zinc-300 hover:border-[#2E5B44] transition-colors shrink-0"
        >
          <FontAwesomeIcon icon={faBug} className="text-rose-500 w-2.5 h-2.5" />
          <span>{isId ? 'Cek Bug' : 'Check Bug'}</span>
        </button>
        <button
          onClick={() => handleSend(isId ? 'Bagaimana cara mengoptimasi performa kode ini?' : 'How can this code be optimized for performance?')}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] font-bold text-zinc-700 dark:text-zinc-300 hover:border-[#2E5B44] transition-colors shrink-0"
        >
          <FontAwesomeIcon icon={faBolt} className="text-sky-500 w-2.5 h-2.5" />
          <span>{isId ? 'Optimasi' : 'Optimize'}</span>
        </button>
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isId ? 'Tanya AI Mentor seputar modul ini...' : 'Ask AI Mentor about this lesson...'}
          className="flex-1 px-3 py-2 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-hidden focus:border-[#2E5B44]"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="w-8 h-8 rounded-xl bg-[#2E5B44] hover:bg-[#234735] text-white flex items-center justify-center text-xs disabled:opacity-40 transition-all shrink-0"
        >
          <FontAwesomeIcon icon={faPaperPlane} className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
};
