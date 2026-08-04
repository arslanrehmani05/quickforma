import React, { useState } from 'react';
import { Copy } from 'lucide-react';

export const TextDiffChecker: React.FC = () => {
  const [text1, setText1] = useState('Original line 1\nOriginal line 2\nOriginal line 3');
  const [text2, setText2] = useState('Original line 1\nModified line 2\nOriginal line 3');

  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');
  const maxLines = Math.max(lines1.length, lines2.length);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Copy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Text Diff & Compare Tool</h2>
            <p className="text-slate-400 text-sm">Compare two text blocks line-by-line and highlight modifications.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Original Text</label>
            <textarea
              rows={6}
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-xs focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Modified Text</label>
            <textarea
              rows={6}
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-xs focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>
        </div>

        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1 font-mono text-xs">
          <span className="text-slate-500 text-[10px] uppercase block mb-2">Line Comparison Results</span>
          {Array.from({ length: maxLines }).map((_, i) => {
            const l1 = lines1[i] || '';
            const l2 = lines2[i] || '';
            const isDifferent = l1 !== l2;

            return (
              <div
                key={i}
                className={`px-3 py-1 rounded flex justify-between ${isDifferent ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' : 'text-slate-400'}`}
              >
                <span>L{i + 1}: {l2 || l1}</span>
                {isDifferent && <span className="text-[10px] text-amber-400">Modified</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
