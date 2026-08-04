import React, { useState } from 'react';
import { Sliders, Copy, Check } from 'lucide-react';

export const ColorPickerConverter: React.FC = () => {
  const [color, setColor] = useState('#6366f1');
  const [copied, setCopied] = useState(false);

  const hexToRgb = (hex: string) => {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16) || 0;
    return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
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
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Color Picker & HEX/RGB Converter</h2>
            <p className="text-slate-400 text-sm">Pick colors and convert between HEX and RGB color formats.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Color Picker</label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-16 h-16 rounded-xl border-0 cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm uppercase focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Converted Formats</span>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center font-mono text-sm text-slate-200">
                <span>HEX: {color.toUpperCase()}</span>
                <button onClick={() => handleCopy(color)} className="p-1.5 hover:text-indigo-400">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center font-mono text-sm text-slate-200">
                <span>RGB: rgb({hexToRgb(color)})</span>
                <button onClick={() => handleCopy(`rgb(${hexToRgb(color)})`)} className="p-1.5 hover:text-indigo-400">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
