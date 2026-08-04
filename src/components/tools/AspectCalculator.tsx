import React, { useState } from 'react';
import { Maximize } from 'lucide-react';

export const AspectCalculator: React.FC = () => {
  const [originalWidth, setOriginalWidth] = useState<number>(1920);
  const [originalHeight, setOriginalHeight] = useState<number>(1080);
  const [targetWidth, setTargetWidth] = useState<number>(1280);

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const common = gcd(originalWidth || 1, originalHeight || 1);
  const ratioW = (originalWidth || 1) / common;
  const ratioH = (originalHeight || 1) / common;

  const calculatedHeight = (originalWidth || 0) > 0 ? Math.round(((targetWidth || 0) * (originalHeight || 0)) / originalWidth) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Maximize className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Aspect Ratio Calculator</h2>
            <p className="text-slate-400 text-sm">Calculate 16:9, 4:3, 1:1, or custom aspect ratio dimensions for images and video.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Original Width (px)</label>
                <input
                  type="number"
                  min="1"
                  value={originalWidth}
                  onChange={(e) => setOriginalWidth(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Original Height (px)</label>
                <input
                  type="number"
                  min="1"
                  value={originalHeight}
                  onChange={(e) => setOriginalHeight(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">New Target Width (px)</label>
              <input
                type="number"
                min="1"
                value={targetWidth}
                onChange={(e) => setTargetWidth(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Aspect Ratio</span>
              <div className="my-3 text-4xl sm:text-5xl font-extrabold text-indigo-400 font-mono">
                {ratioW}:{ratioH}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Calculated Target Height:</span>
                <span className="font-mono text-emerald-400 font-bold">{calculatedHeight} px</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
