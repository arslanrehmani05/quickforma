import React, { useState } from 'react';
import { Palette, Copy, Check } from 'lucide-react';

export const ColorPickerConverter: React.FC = () => {
  const [hex, setHex] = useState('#4f46e5');
  const [copied, setCopied] = useState(false);

  const hexToRgb = (hexStr: string) => {
    const clean = hexStr.replace('#', '');
    if (clean.length !== 6) return 'rgb(79, 70, 229)';
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <Palette className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Color Picker & HEX to RGB Converter</h2>
            <p className="text-slate-600 text-sm">Visual color picker with instant HEX, RGB, and HSL conversions.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Select Color</label>
              <input
                type="color"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="w-full h-14 p-1 rounded-xl bg-white border border-slate-300 cursor-pointer shadow-xs"
              />
            </div>
            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">HEX Value</label>
              <input
                type="text"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4 shadow-md">
            <div className="h-20 rounded-xl shadow-inner border border-white/20" style={{ backgroundColor: hex }} />
            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div className="flex justify-between"><span>HEX:</span><span className="text-white font-bold">{hex}</span></div>
              <div className="flex justify-between"><span>RGB:</span><span className="text-white font-bold">{hexToRgb(hex)}</span></div>
            </div>
            <button
              onClick={handleCopy}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied HEX!' : 'Copy HEX Code'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
