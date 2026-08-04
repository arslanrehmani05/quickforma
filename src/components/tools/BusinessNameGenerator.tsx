import React, { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';

const PREFIXES = ['Apex', 'Nova', 'Vanguard', 'Prime', 'Hyper', 'Swift', 'Meta', 'Zenith'];
const SUFFIXES = ['Lab', 'Flow', 'Hub', 'Forma', 'Logic', 'Studio', 'Pulse', 'Craft'];

export const BusinessNameGenerator: React.FC = () => {
  const [keyword, setKeyword] = useState('Data');
  const [names, setNames] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const generateNames = () => {
    const kw = keyword.trim() || 'Brand';
    const list: string[] = [];
    PREFIXES.forEach((p) => list.push(`${p} ${kw}`));
    SUFFIXES.forEach((s) => list.push(`${kw} ${s}`));
    PREFIXES.forEach((p) => SUFFIXES.forEach((s) => list.push(`${p}${kw}${s}`)));
    setNames(list.slice(0, 16));
  };

  React.useEffect(() => {
    generateNames();
  }, [keyword]);

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Business Name Generator</h2>
            <p className="text-slate-400 text-sm">Brainstorm business and brand name ideas by combining industry keywords.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Industry Keyword</label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. Finance, Tech, Cloud..."
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {names.map((n, i) => (
              <button
                key={i}
                onClick={() => handleCopy(n)}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500 text-slate-200 font-semibold text-xs text-center transition-all flex items-center justify-between group"
              >
                <span>{n}</span>
                {copied === n ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
