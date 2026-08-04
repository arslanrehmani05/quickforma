import React, { useState } from 'react';
import { Users, Sparkles } from 'lucide-react';

export const RandomNamePicker: React.FC = () => {
  const [listText, setListText] = useState("Sarah Jenkins\nMark Davis\nElena Rostova\nAlex Rivera\nDavid Miller");
  const [winner, setWinner] = useState<string | null>(null);

  const handlePick = () => {
    const items = listText.split('\n').map(i => i.trim()).filter(Boolean);
    if (items.length > 0) {
      const idx = Math.floor(Math.random() * items.length);
      setWinner(items[idx]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Random List & Winner Picker</h2>
            <p className="text-slate-400 text-sm">Paste a list of names or items and randomly pick a winner for raffles and choices.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Items / Names (One Per Line)</label>
            <textarea
              rows={6}
              value={listText}
              onChange={(e) => setListText(e.target.value)}
              className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 resize-none font-mono"
            />
          </div>

          <button
            onClick={handlePick}
            className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Pick Random Winner</span>
          </button>

          {winner && (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block mb-1">Random Selection</span>
              <div className="text-3xl font-extrabold text-slate-100">{winner}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
