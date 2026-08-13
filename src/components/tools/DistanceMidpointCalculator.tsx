import React, { useState, useMemo } from 'react';
import { Sparkles, MapPin } from 'lucide-react';

export const DistanceMidpointCalculator: React.FC = () => {
  const [x1, setX1] = useState<number>(1);
  const [y1, setY1] = useState<number>(2);
  const [x2, setX2] = useState<number>(4);
  const [y2, setY2] = useState<number>(6);

  const calculation = useMemo(() => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const midpointX = (x1 + x2) / 2;
    const midpointY = (y1 + y2) / 2;
    const slope = dx !== 0 ? dy / dx : Infinity;

    return {
      distance: Math.round(distance * 1000) / 1000,
      midpoint: `(${midpointX}, ${midpointY})`,
      slope: slope === Infinity ? 'Undefined (Vertical)' : Math.round(slope * 1000) / 1000,
    };
  }, [x1, y1, x2, y2]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Distance & Midpoint Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate the 2D Euclidean distance, midpoint coordinates, and line slope between two points $(x_1, y_1)$ and $(x_2, y_2)$.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-slate-900">Point 1 $(x_1, y_1)$</div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={x1}
                onChange={(e) => setX1(parseFloat(e.target.value) || 0)}
                placeholder="x1"
                className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-mono text-center outline-none focus:border-indigo-600"
              />
              <input
                type="number"
                value={y1}
                onChange={(e) => setY1(parseFloat(e.target.value) || 0)}
                placeholder="y1"
                className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-mono text-center outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-slate-900">Point 2 $(x_2, y_2)$</div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={x2}
                onChange={(e) => setX2(parseFloat(e.target.value) || 0)}
                placeholder="x2"
                className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-mono text-center outline-none focus:border-indigo-600"
              />
              <input
                type="number"
                value={y2}
                onChange={(e) => setY2(parseFloat(e.target.value) || 0)}
                placeholder="y2"
                className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-mono text-center outline-none focus:border-indigo-600"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Distance & Midpoint Results
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Distance ($d$)</div>
            <div className="text-3xl font-extrabold text-white font-mono">{calculation.distance}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Midpoint Coordinates</div>
            <div className="text-3xl font-extrabold text-indigo-300 font-mono">{calculation.midpoint}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Line Slope ($m$)</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">{calculation.slope}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
