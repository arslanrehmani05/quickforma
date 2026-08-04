import React, { useState } from 'react';
import { Sliders, Copy, Check } from 'lucide-react';

export const CssGlassmorphismGenerator: React.FC = () => {
  const [blur, setBlur] = useState(12);
  const [opacity, setOpacity] = useState(60);
  const [borderOpacity, setBorderOpacity] = useState(20);
  const [copied, setCopied] = useState(false);

  const cssCode = `background: rgba(15, 23, 42, ${opacity / 100});\nbackdrop-filter: blur(${blur}px);\n-webkit-backdrop-filter: blur(${blur}px);\nborder: 1px solid rgba(255, 255, 255, ${borderOpacity / 100});\nborder-radius: 1rem;`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">CSS Glassmorphism Generator</h2>
            <p className="text-slate-400 text-sm">Visual UI sliders for modern CSS backdrop-filter glass styles.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="flex justify-between text-xs font-semibold text-slate-300 uppercase mb-2">
                <span>Blur Intensity ({blur}px)</span>
              </label>
              <input
                type="range"
                min="0"
                max="40"
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
            <div>
              <label className="flex justify-between text-xs font-semibold text-slate-300 uppercase mb-2">
                <span>Background Opacity ({opacity}%)</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
            <div>
              <label className="flex justify-between text-xs font-semibold text-slate-300 uppercase mb-2">
                <span>Border Opacity ({borderOpacity}%)</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={borderOpacity}
                onChange={(e) => setBorderOpacity(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            {/* Live Preview Card */}
            <div
              className="p-8 h-44 rounded-2xl flex items-center justify-center text-center shadow-xl transition-all"
              style={{
                background: `rgba(15, 23, 42, ${opacity / 100})`,
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                border: `1px solid rgba(255, 255, 255, ${borderOpacity / 100})`,
              }}
            >
              <span className="text-slate-100 font-bold text-sm">Glassmorphism Live Preview</span>
            </div>

            {/* Generated CSS */}
            <div className="relative">
              <div className="flex justify-between items-center bg-slate-950 px-4 py-2 border-t border-x border-slate-800 rounded-t-xl text-xs text-slate-400">
                <span>Generated CSS</span>
                <button onClick={handleCopy} className="hover:text-indigo-400 flex items-center gap-1">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy CSS'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-b-xl text-indigo-400 font-mono text-xs overflow-x-auto">
                {cssCode}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
