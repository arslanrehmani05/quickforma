import React, { useState } from 'react';
import { AlignLeft, Copy, Check } from 'lucide-react';

export const WordCounter: React.FC = () => {
  const [text, setText] = useState('QuickForma is a privacy-first web utility tools platform built for maximum speed and simplicity.');
  const [copied, setCopied] = useState(false);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s+/g, '').length;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
  const readingTime = Math.ceil(words / 200);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <AlignLeft className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Word & Character Counter</h2>
            <p className="text-slate-600 text-sm">Real-time text analyzer for words, characters, reading speed, and sentences.</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-700 block">{words}</span>
              <span className="text-xs text-indigo-900 font-semibold uppercase tracking-wider">Words</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block">{characters}</span>
              <span className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Characters</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block">{sentences}</span>
              <span className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Sentences</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block">~{readingTime}m</span>
              <span className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Reading Time</span>
            </div>
          </div>

          <div className="relative">
            <textarea
              rows={8}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste text here to analyze..."
              className="w-full p-4 rounded-2xl bg-white border border-slate-300 text-slate-900 font-sans text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 resize-none shadow-xs"
            />
            <button
              onClick={handleCopy}
              className="absolute right-4 bottom-4 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
