import React, { useState } from 'react';
import { Type } from 'lucide-react';
import { CopyButton } from '../common/CopyButton';
import { ResetButton } from '../common/ResetButton';

export const WordCounter: React.FC = () => {
  const [text, setText] = useState('Type or paste your document content here to analyze total words, characters, sentences, and estimated reading time.');

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const sentenceCount = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
  const readingTimeMinutes = Math.ceil(wordCount / 200);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
              <Type className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Real-Time Word & Character Counter</h2>
              <p className="text-slate-600 text-sm">Analyze text length, sentence counts, and reading times in real time.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CopyButton textToCopy={text} />
            <ResetButton onReset={() => setText('')} label="Clear" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 text-white shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Words</span>
              <span className="text-2xl sm:text-3xl font-extrabold">{wordCount.toLocaleString()}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 text-white shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Characters</span>
              <span className="text-2xl sm:text-3xl font-extrabold">{charCount.toLocaleString()}</span>
            </div>
            <div className="p-4 rounded-2xl bg-indigo-600 text-white shadow-xs">
              <span className="text-[10px] uppercase font-bold text-indigo-200 block">Sentences</span>
              <span className="text-2xl sm:text-3xl font-extrabold">{sentenceCount.toLocaleString()}</span>
            </div>
            <div className="p-4 rounded-2xl bg-indigo-600 text-white shadow-xs">
              <span className="text-[10px] uppercase font-bold text-indigo-200 block">Reading Time</span>
              <span className="text-2xl sm:text-3xl font-extrabold">~{readingTimeMinutes} m</span>
            </div>
          </div>

          <textarea
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text content here..."
            className="w-full p-4 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 resize-none shadow-xs font-sans"
          />
        </div>
      </div>
    </div>
  );
};
