import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPrint, faCheck, faAward, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { Language } from '../utils/translations';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackName: string;
  trackSlug: string;
  lang: Language;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  trackName,
  trackSlug,
  lang
}) => {
  const isId = lang === 'id';
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('tryngo-user-name') || 'Software Developer';
  });
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const issueDate = new Date().toLocaleDateString(isId ? 'id-ID' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const certId = `TRYNGO-${trackSlug.toUpperCase()}-${Math.abs(
    trackSlug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 1337)
  ).toString(16).toUpperCase()}-2026`;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUserName(val);
    try {
      localStorage.setItem('tryngo-user-name', val);
    } catch {}
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(
      `https://tryngo.widifirmaan.web.id/#/${trackSlug}?cert=${certId}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden my-auto print:m-0 print:border-none print:shadow-none print:w-full">
        {/* Header Bar - Hidden in print */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 print:hidden bg-zinc-50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-2 text-[#2E5B44] dark:text-emerald-400 font-bold text-sm">
            <FontAwesomeIcon icon={faAward} className="w-4 h-4" />
            <span>{isId ? 'Sertifikat Kelulusan Resmi' : 'Official Certificate of Completion'}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2E5B44] hover:bg-[#244836] text-white text-xs font-bold transition-all shadow-xs"
            >
              <FontAwesomeIcon icon={faPrint} className="w-3.5 h-3.5" />
              <span>{isId ? 'Cetak / Unduh PDF' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-xs font-bold transition-all"
            >
              <FontAwesomeIcon icon={copied ? faCheck : faShareAlt} className="w-3.5 h-3.5" />
              <span>{copied ? (isId ? 'Tersalin!' : 'Copied!') : (isId ? 'Bagikan' : 'Share')}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Body */}
        <div className="p-6 sm:p-10 bg-gradient-to-br from-amber-50/40 via-white to-emerald-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-center relative print:p-8">
          {/* Decorative Border Frame */}
          <div className="border-4 border-double border-[#2E5B44]/40 dark:border-emerald-600/40 rounded-2xl p-6 sm:p-10 relative">
            {/* Corner Accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#2E5B44] dark:border-emerald-400" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#2E5B44] dark:border-emerald-400" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#2E5B44] dark:border-emerald-400" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#2E5B44] dark:border-emerald-400" />

            {/* Platform Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E5B44]/10 dark:bg-emerald-950/60 border border-[#2E5B44]/30 text-[#2E5B44] dark:text-emerald-400 text-xs font-black tracking-widest uppercase mb-4">
              Tryngo Coding Academy
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-wide mb-1">
              {isId ? 'SERTIFIKAT KELULUSAN' : 'CERTIFICATE OF COMPLETION'}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-mono mb-6">
              Certificate ID: {certId}
            </p>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium italic mb-2">
              {isId ? 'Diberikan dengan bangga kepada:' : 'Proudly presented to:'}
            </p>

            {/* Editable Name Field */}
            <div className="max-w-md mx-auto mb-6">
              <input
                type="text"
                value={userName}
                onChange={handleNameChange}
                placeholder={isId ? 'Ketik Nama Lengkap Anda' : 'Type Your Full Name'}
                className="w-full text-center text-xl sm:text-3xl font-extrabold font-serif text-[#2E5B44] dark:text-emerald-400 bg-transparent border-b-2 border-[#2E5B44]/40 dark:border-emerald-500/40 focus:outline-hidden focus:border-[#2E5B44] py-1 transition-colors"
                title={isId ? 'Klik untuk mengganti nama' : 'Click to change name'}
              />
              <span className="block text-[10px] text-zinc-400 dark:text-zinc-500 mt-1 print:hidden">
                {isId ? '✎ Anda dapat mengubah nama di atas kapan saja' : '✎ You can edit your name directly above'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 max-w-xl mx-auto leading-relaxed mb-8">
              {isId ? (
                <>
                  Telah sukses menyelesaikan seluruh modul kurikulum interaktif, tantangan pemrograman mingguan, serta proyek akhir capstone pada spesialisasi <strong>{trackName}</strong> dengan standar rekayasa perangkat lunak modern.
                </>
              ) : (
                <>
                  Has successfully mastered all interactive curriculum modules, weekly programming challenges, and the capstone engineering project for <strong>{trackName}</strong> conforming to modern software engineering standards.
                </>
              )}
            </p>

            {/* Footer Signatures */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-left">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  {isId ? 'Tanggal Penerbitan' : 'Date of Issuance'}
                </p>
                <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">{issueDate}</p>
                <p className="text-[10px] text-zinc-500 mt-0.5 font-mono">verify: tryngo.widifirmaan.web.id</p>
              </div>
              <div className="text-right">
                <div className="inline-block text-center">
                  <div className="w-24 border-b border-zinc-400 dark:border-zinc-600 mb-1 mx-auto" />
                  <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Tryngo Academic Board</p>
                  <p className="text-[10px] text-[#2E5B44] dark:text-emerald-400 font-semibold">Verified Platform Seal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
