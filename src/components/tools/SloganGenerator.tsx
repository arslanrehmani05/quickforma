import React, { useState } from 'react';
import { Zap, Copy, Check } from 'lucide-react';

const SLOGAN_PATTERNS = [
  "The Future of {K}",
  "Simply {K}, Perfectly Done",
  "Empowering Your {K}",
  "{K} Made Effortless",
  "Next-Gen {K} Solution",
  "Think Big, Think {K}",
  "Your Trusted Partner in {K}",
  "Reinventing {K} Every Day"
];

export const SloganGenerator: React.FC = () => {
  const [topic, setTopic] = useState('Productivity');
  const [slogans, setSlogans] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  React.useEffect(() => {
    const kw = topic.trim() || 'Business';
    setSlogans(SLOGAN_PATTERNS.map(p => p.replace('{K}', kw)));
  }, [topic]);

  const handleCopy = (s: string) => {
    navigator.clipboard.writeText(s);
    setCopied(s);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Slogan & Tagline Generator</h2>
            <p className="text-slate-400 text-sm">Generate catchy marketing taglines and slogans for your product or brand.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Topic or Brand Keyword</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {slogans.map((s, i) => (
              <button
                key={i}
                onClick={() => handleCopy(s)}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500 text-slate-200 font-medium text-xs text-left transition-all flex items-center justify-between group"
              >
                <span>"{s}"</span>
                {copied === s ? <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <Copy className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
