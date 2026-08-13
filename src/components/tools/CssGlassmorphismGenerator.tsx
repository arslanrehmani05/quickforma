import React, { useState } from 'react';
import { Sliders } from 'lucide-react';
import { CopyButton } from '../common/CopyButton';
import { ToolHeader } from '../ui/ToolHeader';

export const CssGlassmorphismGenerator: React.FC = () => {
  const [blur, setBlur] = useState(12);
  const [opacity, setOpacity] = useState(60);
  const [borderOpacity, setBorderOpacity] = useState(20);

  const cssCode = `background: rgba(255, 255, 255, ${opacity / 100});\nbackdrop-filter: blur(${blur}px);\n-webkit-backdrop-filter: blur(${blur}px);\nborder: 1px solid rgba(0, 0, 0, ${borderOpacity / 100});\nborder-radius: 1rem;`;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">CSS Glassmorphism Generator</h2>
            <p className="text-slate-600 text-sm">Visual UI sliders for modern CSS backdrop-filter glass styles.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="flex justify-between text-xs font-semibold text-slate-700 uppercase mb-2">
                <span>Blur Intensity ({blur}px)</span>
              </label>
              <input
                type="range"
                min="0"
                max="40"
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
            <div>
              <label className="flex justify-between text-xs font-semibold text-slate-700 uppercase mb-2">
                <span>Background Opacity ({opacity}%)</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
            <div>
              <label className="flex justify-between text-xs font-semibold text-slate-700 uppercase mb-2">
                <span>Border Opacity ({borderOpacity}%)</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={borderOpacity}
                onChange={(e) => setBorderOpacity(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          <div className="space-y-4">
            {/* Live Preview Card */}
            <div
              className="p-8 h-44 rounded-2xl flex items-center justify-center text-center shadow-md transition-all bg-gradient-to-tr from-indigo-500 to-purple-500 text-white"
            >
              <div
                className="p-6 rounded-xl text-slate-900 font-bold text-sm"
                style={{
                  background: `rgba(255, 255, 255, ${opacity / 100})`,
                  backdropFilter: `blur(${blur}px)`,
                  WebkitBackdropFilter: `blur(${blur}px)`,
                  border: `1px solid rgba(0, 0, 0, ${borderOpacity / 100})`,
                }}
              >
                Glass Preview Card
              </div>
            </div>

            {/* Generated CSS */}
            <div className="relative">
              <div className="flex justify-between items-center bg-slate-100 px-4 py-2 rounded-t-xl border-t border-x border-slate-200 text-xs text-slate-700 font-bold">
                <span>Generated CSS</span>
                <CopyButton textToCopy={cssCode} label="Copy CSS" variant="secondary" />
              </div>
              <pre className="p-4 bg-slate-50 text-indigo-900 font-mono text-xs rounded-b-xl border border-slate-200 overflow-x-auto">
                {cssCode}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
