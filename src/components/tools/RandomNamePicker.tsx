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
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Random List & Winner Picker</h2>
            <p className="text-slate-600 text-sm">Paste a list of names or items and randomly pick a winner for raffles and choices.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Items / Names (One Per Line)</label>
            <textarea
              rows={6}
              value={listText}
              onChange={(e) => setListText(e.target.value)}
              className="w-full p-4 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 resize-none font-mono shadow-xs"
            />
          </div>

          <button
            onClick={handlePick}
            className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Pick Random Winner</span>
          </button>

          {winner && (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider block mb-1">Random Selection</span>
              <div className="text-3xl font-extrabold text-emerald-950">{winner}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
