import React, { useState, useMemo } from 'react';
import { Sparkles, Box } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';
import { ModePillsBar } from '../ui/ModePillsBar';

export const GeometryAreaVolumeCalculator: React.FC = () => {
  const [shape, setShape] = useState<'sphere' | 'cylinder' | 'cube' | 'cone'>('sphere');
  const [dim1, setDim1] = useState<number>(5); // radius or length
  const [dim2, setDim2] = useState<number>(10); // height or width

  const result = useMemo(() => {
    let volume = 0;
    let surfaceArea = 0;

    if (shape === 'sphere') {
      const r = dim1;
      volume = (4 / 3) * Math.PI * Math.pow(r, 3);
      surfaceArea = 4 * Math.PI * r * r;
    } else if (shape === 'cylinder') {
      const r = dim1;
      const h = dim2;
      volume = Math.PI * r * r * h;
      surfaceArea = 2 * Math.PI * r * h + 2 * Math.PI * r * r;
    } else if (shape === 'cube') {
      const s = dim1;
      volume = Math.pow(s, 3);
      surfaceArea = 6 * s * s;
    } else if (shape === 'cone') {
      const r = dim1;
      const h = dim2;
      volume = (1 / 3) * Math.PI * r * r * h;
      const l = Math.sqrt(r * r + h * h);
      surfaceArea = Math.PI * r * (r + l);
    }

    return {
      volume: Math.round(volume * 1000) / 1000,
      surfaceArea: Math.round(surfaceArea * 1000) / 1000,
    };
  }, [shape, dim1, dim2]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Box className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">2D & 3D Geometry Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate 3D volume and total surface area for spheres, cylinders, cubes, and cones.
            </p>
          </div>
        </div>

        {/* Shape Selector */}
        <div className="flex flex-wrap gap-2">
          {(['sphere', 'cylinder', 'cube', 'cone'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setShape(s)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl capitalize transition-all ${shape === s ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600'}`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {shape === 'cube' ? 'Side Length (s)' : 'Radius (r)'}
            </label>
            <input
              type="number"
              min="0"
              value={dim1}
              onChange={(e) => setDim1(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {(shape === 'cylinder' || shape === 'cone') && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Height (h)</label>
              <input
                type="number"
                min="0"
                value={dim2}
                onChange={(e) => setDim2(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold  text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> 3D Geometry Results
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Volume ($V$)</div>
            <div className="text-3xl font-extrabold text-white font-mono">{result.volume}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Total Surface Area ($A$)</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">{result.surfaceArea}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
